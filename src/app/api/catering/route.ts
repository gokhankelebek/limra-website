// Catering inquiry endpoint. Emails each submission via Resend.
//
// To go live, set in Vercel:
//   RESEND_API_KEY   — from resend.com (free tier is plenty)
//   CATERING_INBOX   — where inquiries are delivered (the owners' address)
//   CATERING_FROM    — a verified Resend sender, e.g. "Limra <catering@limramedi.com>"
//                      (defaults to Resend's onboarding sender for testing)
//
// Until RESEND_API_KEY and CATERING_INBOX exist, the route reports itself
// disabled and the form tells the guest to call instead — nothing is lost.

export const runtime = "nodejs";

const RESEND_KEY = process.env.RESEND_API_KEY;
const INBOX = process.env.CATERING_INBOX;
const FROM = process.env.CATERING_FROM || "Limra Catering <onboarding@resend.dev>";
const ENABLED = Boolean(RESEND_KEY && INBOX);

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

  if (!ENABLED) {
    // Not wired yet — tell the client to fall back to phone.
    return Response.json(
      { error: "unconfigured", fallback: "phone" },
      { status: 503 }
    );
  }

  const lines = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
    ["Event date", eventDate],
    ["Guests", guests],
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

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [INBOX],
        reply_to: email || undefined,
        subject: `Catering inquiry: ${name}${guests ? ` (${guests})` : ""}`,
        html,
        text,
      }),
    });
    if (!res.ok) {
      return Response.json({ error: "send-failed" }, { status: 502 });
    }
  } catch {
    return Response.json({ error: "send-failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
