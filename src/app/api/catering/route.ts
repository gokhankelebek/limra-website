// Catering inquiry endpoint. Each inquiry is emailed through Resend to
// catering@limramedi.com, laid out so the request reads at one look
// (src/lib/catering-email.ts); Reply goes straight to the guest, and the guest
// gets a confirmation with a copy of what they sent. Needs RESEND_API_KEY in
// Vercel and limramedi.com verified in Resend. Optional overrides:
// CATERING_INBOX, CATERING_FROM. Resend's dashboard keeps a log of every email.

import { CATERING_EMAIL } from "@/data/contact";
import {
  confirmationEmail,
  inquiryEmail,
  inquirySubject,
  type Inquiry,
} from "@/lib/catering-email";

export const runtime = "nodejs";

const RESEND_KEY = process.env.RESEND_API_KEY;
const INBOX = process.env.CATERING_INBOX || CATERING_EMAIL;
const FROM = process.env.CATERING_FROM || `Limra Catering <${CATERING_EMAIL}>`;
const ENABLED = Boolean(RESEND_KEY);

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

// Like clean(), but keeps the guest's line breaks.
function cleanText(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v
    .replace(/\r\n?/g, "\n")
    .replace(/[^\S\n]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, max);
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
  const message = cleanText(body.message, MAX.message);
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
    return Response.json({ error: "unavailable" }, { status: 503 });
  }

  const inquiry: Inquiry = {
    name,
    email,
    phone,
    eventDate,
    guests,
    eventType,
    serviceType,
    interests,
    message,
  };

  const send = (payload: Record<string, unknown>) =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

  // 1) The inquiry to the restaurant. This is the only copy, so a failure
  // fails the request and the guest is shown the phone number.
  try {
    const res = await send({
      from: FROM,
      to: [INBOX],
      reply_to: email || undefined,
      subject: inquirySubject(inquiry),
      ...inquiryEmail(inquiry),
    });
    if (!res.ok) {
      console.error("catering email rejected", res.status, await res.text());
      return Response.json({ error: "send-failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("catering email failed", err);
    return Response.json({ error: "send-failed" }, { status: 502 });
  }

  // 2) Confirmation to the guest. Best-effort: the restaurant already has
  // the inquiry.
  if (email) {
    try {
      await send({
        from: FROM,
        to: [email],
        reply_to: CATERING_EMAIL,
        subject: "We received your catering request · Limra Mediterranean",
        ...confirmationEmail(inquiry),
      });
    } catch {
      // swallow
    }
  }

  return Response.json({ ok: true });
}
