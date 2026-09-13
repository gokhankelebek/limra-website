import { GOOGLE_FORM_ENTRIES, GOOGLE_FORM_POST_URL } from "@/data/giveaway.config";
import { getGiveawayPhase, resolveNow } from "@/lib/giveaway-state";

// Giveaway entry endpoint. Each entry is stored two ways:
//   1. mirrored into the Google Form (feeds the owners' response Sheet),
//   2. emailed via Resend with the screenshot attached (same env as
//      catering: RESEND_API_KEY, CATERING_FROM; inbox = GIVEAWAY_INBOX or
//      CATERING_INBOX).
// Success requires at least one of the two to land. GET reports readiness.

export const runtime = "nodejs";

const RESEND_KEY = process.env.RESEND_API_KEY;
const INBOX = process.env.GIVEAWAY_INBOX || process.env.CATERING_INBOX;
const FROM = process.env.CATERING_FROM || "Limra Giveaway <onboarding@resend.dev>";
const EMAIL_ENABLED = Boolean(RESEND_KEY && INBOX);
const MIRROR_ENABLED = Boolean(GOOGLE_FORM_ENTRIES.name && GOOGLE_FORM_ENTRIES.handle);

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const MAX = { name: 120, handle: 60, email: 160, phone: 40, url: 300 };

const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => t > now - 60_000);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 1000) hits.clear();
  return list.length > 5;
}

function clean(v: FormDataEntryValue | null, max: number): string {
  if (typeof v !== "string") return "";
  return v.replace(/\s+/g, " ").trim().slice(0, max);
}

function esc(s: string): string {
  return s.replace(/[<>&]/g, (c) => (c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&amp;"));
}

export async function GET() {
  return Response.json({
    enabled: EMAIL_ENABLED || MIRROR_ENABLED,
    email: EMAIL_ENABLED,
    mirror: MIRROR_ENABLED,
  });
}

export async function POST(req: Request) {
  // ?now= is honoured outside production only (see resolveNow), for testing.
  const now = resolveNow(new URL(req.url).searchParams.get("now") ?? undefined);
  if (getGiveawayPhase(now) !== "live") {
    return Response.json({ error: "closed" }, { status: 409 });
  }
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return Response.json({ error: "Too many requests." }, { status: 429 });
  }

  let data: FormData;
  try {
    data = await req.formData();
  } catch {
    return Response.json({ error: "Bad request." }, { status: 400 });
  }

  // Honeypot: bots fill "company"; pretend success.
  if (clean(data.get("company"), 50)) return Response.json({ ok: true });

  const name = clean(data.get("name"), MAX.name);
  const handle = clean(data.get("handle"), MAX.handle).replace(/^@+/, "");
  const email = clean(data.get("email"), MAX.email);
  const phone = clean(data.get("phone"), MAX.phone);
  const postType = clean(data.get("postType"), 10) === "Story" ? "Story" : "Post";
  const postUrl = clean(data.get("postUrl"), MAX.url);
  const hashtag = clean(data.get("hashtag"), 3) === "Yes" ? "Yes" : "No";
  const eligible = clean(data.get("eligible"), 5) === "yes";

  if (!name || !handle || !email || !phone || !eligible) {
    return Response.json(
      { error: "Please fill in your name, Instagram handle, email, phone, and confirm eligibility." },
      { status: 422 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "That email address does not look right." }, { status: 422 });
  }

  const shot = data.get("screenshot");
  let attachment: { filename: string; content: string } | null = null;
  if (shot instanceof File && shot.size > 0) {
    if (!shot.type.startsWith("image/")) {
      return Response.json({ error: "The screenshot must be an image." }, { status: 422 });
    }
    if (shot.size > MAX_IMAGE_BYTES) {
      return Response.json({ error: "The screenshot must be under 8 MB." }, { status: 422 });
    }
    const ext = (shot.name.split(".").pop() || "png").toLowerCase().replace(/[^a-z0-9]/g, "") || "png";
    attachment = {
      filename: `${handle.replace(/[^a-z0-9_.]/gi, "_")}-screenshot.${ext}`,
      content: Buffer.from(await shot.arrayBuffer()).toString("base64"),
    };
  }

  if (!EMAIL_ENABLED && !MIRROR_ENABLED) {
    return Response.json({ error: "unconfigured" }, { status: 503 });
  }

  const submittedAt = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
  const results = { mirror: false, email: false };

  // 1) Mirror into the Google Form (text fields only).
  if (MIRROR_ENABLED) {
    const body = new URLSearchParams();
    const E = GOOGLE_FORM_ENTRIES;
    body.set(`entry.${E.name}`, name);
    body.set(`entry.${E.handle}`, `@${handle}`);
    if (E.email) body.set(`entry.${E.email}`, email);
    if (E.phone) body.set(`entry.${E.phone}`, phone);
    if (E.postType) body.set(`entry.${E.postType}`, postType);
    if (E.postUrl && postUrl) body.set(`entry.${E.postUrl}`, postUrl);
    if (E.hashtag) body.set(`entry.${E.hashtag}`, hashtag);
    if (E.screenshot) body.set(`entry.${E.screenshot}`, attachment ? "Yes (emailed)" : "No");
    if (E.eligibility) body.set(`entry.${E.eligibility}`, "I am a North Carolina resident, 18 or older, and I have read the Official Rules at limramedi.com/giveaway/rules");
    body.set("fvv", "1");
    body.set("pageHistory", "0");
    try {
      const res = await fetch(GOOGLE_FORM_POST_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
        redirect: "manual",
      });
      // Google answers 200 (confirmation page) or a 3xx to it on success;
      // a 4xx means the field ids or settings are wrong.
      results.mirror = res.status < 400;
      if (!results.mirror) console.error("giveaway mirror rejected", res.status);
    } catch (err) {
      console.error("giveaway mirror failed", err);
    }
  }

  // 2) Email the owners, screenshot attached.
  if (EMAIL_ENABLED) {
    const rows = [
      ["Name", name],
      ["Instagram", `@${handle}`],
      ["Email", email],
      ["Phone", phone],
      ["Posted as", postType],
      ["Post link", postUrl],
      ["Used #LimraMediterranean", hashtag],
      ["Screenshot", attachment ? "attached" : "none (check DMs)"],
      ["Submitted", `${submittedAt} ET`],
    ].filter(([, v]) => v);
    const html = `<h2>Giveaway entry: ${esc(name)}</h2><table cellpadding="6" style="border-collapse:collapse">${rows
      .map(([k, v]) => `<tr><td style="color:#2d5b14"><strong>${k}</strong></td><td>${esc(v)}</td></tr>`)
      .join("")}</table>`;
    const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: FROM,
          to: [INBOX],
          reply_to: email,
          subject: `Giveaway entry: ${name} (@${handle})${hashtag === "Yes" ? " +bonus" : ""}`,
          html,
          text,
          attachments: attachment ? [attachment] : undefined,
        }),
      });
      results.email = res.ok;
      if (!res.ok) console.error("giveaway email rejected", res.status);
    } catch (err) {
      console.error("giveaway email failed", err);
    }
  }

  if (!results.mirror && !results.email) {
    return Response.json({ error: "store-failed" }, { status: 502 });
  }
  // If the screenshot could not travel (no email path), tell the guest to DM it.
  return Response.json({ ok: true, screenshotDelivered: Boolean(attachment && results.email) });
}
