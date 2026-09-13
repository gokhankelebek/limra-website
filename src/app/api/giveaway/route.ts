import { GOOGLE_FORM_ENTRIES, GOOGLE_FORM_POST_URL } from "@/data/giveaway.config";
import { getGiveawayPhase, isPreview, resolveNow } from "@/lib/giveaway-state";

// Giveaway entry endpoint. Every entry is mirrored into the owners' Google
// Form, whose response Sheet is the single list used for the drawing.
// Screenshots never pass through here: guests send them by Instagram DM.
// GET reports readiness; `?preview=<GIVEAWAY_PREVIEW_KEY>` allows dry runs
// before opening day (entries are tagged TEST in the Notes column).

export const runtime = "nodejs";

const MIRROR_ENABLED = Boolean(GOOGLE_FORM_ENTRIES.name && GOOGLE_FORM_ENTRIES.handle);
const ELIGIBILITY_TEXT =
  "I am a North Carolina resident, 18 or older, and I have read the Official Rules at limramedi.com/giveaway/rules";
const MAX = { name: 120, handle: 31, email: 160, phone: 40, url: 300 };
const HANDLE_RE = /^@?[A-Za-z0-9._]{1,30}$/;

const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => t > now - 60_000);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 1000) hits.clear();
  return list.length > 6;
}

function clean(v: FormDataEntryValue | null, max: number): string {
  if (typeof v !== "string") return "";
  return v.replace(/\s+/g, " ").trim().slice(0, max);
}

/** US phone: 10 digits, or 11 starting with 1. Returns formatted or null. */
function normalizePhone(raw: string): string | null {
  const d = raw.replace(/\D/g, "");
  const ten = d.length === 11 && d.startsWith("1") ? d.slice(1) : d;
  if (ten.length !== 10 || ten[0] === "0" || ten[0] === "1") return null;
  return `(${ten.slice(0, 3)}) ${ten.slice(3, 6)}-${ten.slice(6)}`;
}

export async function GET() {
  return Response.json({ enabled: MIRROR_ENABLED });
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  const preview = isPreview(url.searchParams.get("preview") ?? undefined);
  const now = resolveNow(url.searchParams.get("now") ?? undefined);
  if (!preview && getGiveawayPhase(now) !== "live") {
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
  const handleRaw = clean(data.get("handle"), MAX.handle);
  const handle = handleRaw.replace(/^@+/, "").toLowerCase();
  const email = clean(data.get("email"), MAX.email);
  const phone = normalizePhone(clean(data.get("phone"), MAX.phone));
  const postType = clean(data.get("postType"), 10) === "Story" ? "Story" : "Post";
  const postUrl = clean(data.get("postUrl"), MAX.url);
  const hashtag = clean(data.get("hashtag"), 3) === "Yes" ? "Yes" : "No";
  const isPrivate = clean(data.get("privateAccount"), 5) === "yes";
  const repeat = clean(data.get("repeat"), 5) === "yes";
  const adult = clean(data.get("adult"), 5) === "yes";
  const resident = clean(data.get("resident"), 5) === "yes";
  const rulesRead = clean(data.get("rules"), 5) === "yes";
  const notSponsored = clean(data.get("notSponsored"), 5) === "yes";

  if (!name || !handleRaw || !adult || !resident || !rulesRead || !notSponsored) {
    return Response.json(
      { error: "Please fill in your name and Instagram username, and tick all four confirmations." },
      { status: 422 }
    );
  }
  if (!HANDLE_RE.test(handleRaw)) {
    return Response.json({ error: "That Instagram username does not look right (letters, numbers, dots and underscores only)." }, { status: 422 });
  }
  if (!phone) {
    return Response.json({ error: "Please enter a 10-digit US phone number." }, { status: 422 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "That email address does not look right." }, { status: 422 });
  }
  if (postType === "Post" && !/instagram\.com\//i.test(postUrl)) {
    return Response.json({ error: "For a Post, paste the link to it (it should contain instagram.com/)." }, { status: 422 });
  }

  if (!MIRROR_ENABLED) {
    return Response.json({ error: "unconfigured" }, { status: 503 });
  }

  const notes = [
    preview ? "TEST" : "",
    isPrivate ? "private account" : "",
    repeat ? "repeat submission (same device)" : "",
    postType === "Story" ? "story: screenshot by DM" : "",
  ].filter(Boolean).join("; ");

  const E = GOOGLE_FORM_ENTRIES;
  const body = new URLSearchParams();
  body.set(`entry.${E.name}`, preview ? `TEST ${name}` : name);
  body.set(`entry.${E.handle}`, `@${handle}`);
  if (E.email && email) body.set(`entry.${E.email}`, email);
  if (E.phone) body.set(`entry.${E.phone}`, phone);
  if (E.postType) body.set(`entry.${E.postType}`, postType);
  if (E.postUrl && postType === "Post") body.set(`entry.${E.postUrl}`, postUrl);
  if (E.hashtag) body.set(`entry.${E.hashtag}`, hashtag);
  if (E.notes) body.set(`entry.${E.notes}`, notes || "-");
  if (E.eligibility) body.set(`entry.${E.eligibility}`, ELIGIBILITY_TEXT);
  body.set("fvv", "1");
  body.set("pageHistory", "0");

  try {
    const res = await fetch(GOOGLE_FORM_POST_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      redirect: "manual",
    });
    // Google returns the confirmation page (200) on success. A validation
    // failure re-renders the form (also 200) but with the field inputs, and
    // a closed form says so; both count as a failed store.
    const text = res.status === 200 ? await res.text() : "";
    const stored =
      (res.status >= 300 && res.status < 400) ||
      (res.status === 200 && !/name="entry\.\d+"/.test(text) && !/no longer accepting/i.test(text));
    if (!stored) {
      console.error("giveaway mirror rejected", res.status, text.slice(0, 200).replace(/\s+/g, " "));
      return Response.json({ error: "store-failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("giveaway mirror failed", err);
    return Response.json({ error: "store-failed" }, { status: 502 });
  }

  return Response.json({ ok: true, preview });
}
