// Catering inquiry endpoint.
//
// 1) Every inquiry is stored in the "Limra Catering Inquiries" Google Form and
//    its response Sheet (src/data/catering-form.ts); Google emails the form
//    owner for each new row. This is what makes the form work today.
// 2) Optional email path via Resend, once these exist in Vercel:
//      RESEND_API_KEY  from resend.com
//      CATERING_INBOX  where inquiries are emailed (an inbox the owners read)
//      CATERING_FROM   a verified Resend sender, e.g. "Limra <catering@limramedi.com>"
//    With it, the owners also get a formatted email and the guest a confirmation.
// The request succeeds if either path stored the inquiry.

import { CATERING_FORM_ENTRIES, CATERING_FORM_POST_URL } from "@/data/catering-form";

export const runtime = "nodejs";

const RESEND_KEY = process.env.RESEND_API_KEY;
const INBOX = process.env.CATERING_INBOX;
const FROM = process.env.CATERING_FROM || "Limra Catering <onboarding@resend.dev>";
const EMAIL_ENABLED = Boolean(RESEND_KEY && INBOX);
const ENABLED = true;

const MAX = { name: 120, contact: 160, message: 1200, generic: 200 };

// Best-effort per-instance rate limit, same shape as the concierge route.
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => t > now - 60_000);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 1000) hits.clear();
  return list.length > 5;
}

export async function GET() {
  return Response.json({ enabled: ENABLED });
}

type Payload = {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  guests: string;
  eventType: string;
  serviceType: string;
  interests: string[];
  message: string;
  /** honeypot — real people leave it empty */
  company?: string;
};

function clean(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.replace(/\s+/g, " ").trim().slice(0, max);
}

function esc(s: string): string {
  return s.replace(/[<>&]/g, (c) =>
    c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&amp;"
  );
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return Response.json({ error: "Too many requests." }, { status: 429 });
  }

  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Bad request." }, { status: 400 });
  }

  // Honeypot: a filled "company" field means a bot. Pretend success.
  if (clean(body.company, 50)) return Response.json({ ok: true });

  const name = clean(body.name, MAX.name);
  const email = clean(body.email, MAX.contact);
  const phone = clean(body.phone, MAX.generic);
  const eventDate = clean(body.eventDate, MAX.generic);
  const guests = clean(body.guests, MAX.generic);
  const eventType = clean(body.eventType, MAX.generic);
  const serviceType = clean(body.serviceType, MAX.generic);
  const message = clean(body.message, MAX.message);
  const interests = Array.isArray(body.interests)
    ? body.interests.map((i) => clean(i, 60)).filter(Boolean).slice(0, 12)
    : [];

  if (!name || (!email && !phone)) {
    return Response.json(
      { error: "Please include your name and a way to reach you." },
      { status: 422 }
    );
  }

  // 1) Store in the Google Sheet. Google answers a good submission with its
  // confirmation page; a rejected one re-renders the form fields, and a closed
  // form says so. Both count as not stored.
  const E = CATERING_FORM_ENTRIES;
  const form = new URLSearchParams();
  form.set(`entry.${E.name}`, name);
  form.set(`entry.${E.email}`, email || "-");
  form.set(`entry.${E.phone}`, phone || "-");
  form.set(`entry.${E.eventDate}`, eventDate || "-");
  form.set(`entry.${E.guests}`, guests || "-");
  form.set(`entry.${E.eventType}`, eventType || "-");
  form.set(`entry.${E.serviceType}`, serviceType || "-");
  form.set(`entry.${E.interests}`, interests.join(", ") || "-");
  form.set(`entry.${E.message}`, message || "-");
  form.set("fvv", "1");
  form.set("pageHistory", "0");

  let stored = false;
  try {
    const res = await fetch(CATERING_FORM_POST_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form.toString(),
      redirect: "manual",
    });
    const page = res.status === 200 ? await res.text() : "";
    stored =
      (res.status >= 300 && res.status < 400) ||
      (res.status === 200 &&
        !/name="entry\.\d+"/.test(page) &&
        !/no longer accepting/i.test(page));
    if (!stored) {
      console.error("catering sheet rejected", res.status, page.slice(0, 200).replace(/\s+/g, " "));
    }
  } catch (err) {
    console.error("catering sheet failed", err);
  }

  if (!EMAIL_ENABLED) {
    return stored
      ? Response.json({ ok: true })
      : Response.json({ error: "store-failed" }, { status: 502 });
  }

  const lines = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
    ["Event date", eventDate],
    ["Guests", guests],
    ["Event type", eventType],
    ["Service type", serviceType],
    ["Interested in", interests.join(", ")],
  ].filter(([, v]) => v);

  const html = `
    <h2>New catering inquiry</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      ${lines
        .map(
          ([k, v]) =>
            `<tr><td style="color:#2d5b14"><strong>${k}</strong></td><td>${esc(v)}</td></tr>`
        )
        .join("")}
    </table>
    ${message ? `<p><strong>Message</strong><br>${esc(message).replace(/\n/g, "<br>")}</p>` : ""}
  `;

  const text = [
    ...lines.map(([k, v]) => `${k}: ${v}`),
    message ? `\nMessage:\n${message}` : "",
  ].join("\n");

  const send = (payload: Record<string, unknown>) =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

  // 2) Email the owners. Required only when the Sheet store failed.
  let emailed = false;
  try {
    const res = await send({
      from: FROM,
      to: [INBOX],
      reply_to: email || undefined,
      subject: `Catering inquiry: ${name}${guests ? ` (${guests})` : ""}`,
      html,
      text,
    });
    emailed = res.ok;
  } catch {
    emailed = false;
  }
  if (!stored && !emailed) {
    return Response.json({ error: "store-failed" }, { status: 502 });
  }

  // 3) Auto-confirmation to the guest. Best-effort — a failure here must not
  // fail the request, since the owners already have the inquiry.
  if (email) {
    const confirmText =
      "Thank you for your interest in Limra Catering!\n\n" +
      "We've received your catering request and our team will review the details. " +
      "We'll get back to you as soon as possible to discuss availability, menu options, and the next steps.\n\n" +
      "Thank you for considering Limra for your event.\n\nLimra Mediterranean";
    try {
      await send({
        from: FROM,
        to: [email],
        subject: "We received your catering request · Limra Mediterranean",
        text: confirmText,
        html: `<p>Thank you for your interest in <strong>Limra Catering</strong>.</p>
          <p>We've received your catering request and our team will review the details.
          We'll get back to you as soon as possible to discuss availability, menu
          options, and the next steps.</p>
          <p>Thank you for considering Limra for your event.</p>
          <p style="color:#2d5b14">Limra Mediterranean</p>`,
      });
    } catch {
      // swallow — the owners still got the inquiry
    }
  }

  return Response.json({ ok: true });
}
