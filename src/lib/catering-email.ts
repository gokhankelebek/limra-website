// The two catering emails: the inquiry the restaurant reads, built so the
// whole request is clear at one look (when, how many, how it's served, who to
// call back), and the guest's confirmation with a copy of what they sent.
// Email-client-safe HTML: tables and inline styles only.

import { CONTACT } from "@/data/contact";

export type Inquiry = {
  name: string;
  email: string;
  phone: string;
  eventDate: string; // YYYY-MM-DD from <input type="date">, or ""
  guests: string;
  eventType: string;
  serviceType: string;
  interests: string[];
  message: string;
};

const TZ = "America/New_York";
const OLIVE = "#2d5b14";
const OLIVE_DEEP = "#1c3c0d";
const TERRACOTTA = "#ab5c0c";
const CREAM = "#feebcb";
const CREAM_SOFT = "#fbf3e2";
const INK = "#2b2a26";
const MUTED = "#8a8578";
const FONT = "Helvetica, Arial, sans-serif";

function esc(s: string): string {
  return s.replace(/[<>&"]/g, (c) =>
    c === "<" ? "&lt;" : c === ">" ? "&gt;" : c === "&" ? "&amp;" : "&quot;"
  );
}

// "2026-11-08" → { long: "Saturday, November 8, 2026", short: "Sat, Nov 8",
// daysAway: 20 }. Days are counted against today in Holly Springs.
function eventDay(iso: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  const day = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  const today = new Date(
    new Date().toLocaleDateString("en-CA", { timeZone: TZ }) + "T00:00:00Z"
  );
  const fmt = (o: Intl.DateTimeFormatOptions) =>
    day.toLocaleDateString("en-US", { timeZone: "UTC", ...o });
  return {
    long: fmt({ weekday: "long", month: "long", day: "numeric", year: "numeric" }),
    short: fmt({ weekday: "short", month: "short", day: "numeric" }),
    daysAway: Math.round((day.getTime() - today.getTime()) / 86_400_000),
  };
}

function whenNote(daysAway: number): string {
  if (daysAway < 0) return "This date has already passed";
  if (daysAway === 0) return "Today";
  if (daysAway === 1) return "Tomorrow";
  return `In ${daysAway} days`;
}

// Things the team should catch before quoting: short notice (custom and
// setup orders need 48 hours) and a buffet setup below its 60-guest minimum.
function flags(q: Inquiry, daysAway: number | null): string[] {
  const out: string[] = [];
  if (daysAway !== null && daysAway >= 0 && daysAway <= 2) {
    out.push("Short notice: the event is within 48 hours.");
  }
  const guests = parseInt(q.guests.replace(/[^\d]/g, ""), 10);
  if (/buffet/i.test(q.serviceType) && guests > 0 && guests < 60) {
    out.push(`Buffet setup is for 60+ guests; this request is for ${guests}.`);
  }
  return out;
}

const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

// "Delivery + buffet setup (60+ guests)" → "Delivery + buffet setup"
const shortService = (s: string) => s.replace(/\s*\(.*\)$/, "");

export function inquirySubject(q: Inquiry): string {
  const day = eventDay(q.eventDate);
  const parts = [
    q.guests && `${q.guests} guests`,
    day?.short,
    shortService(q.serviceType),
  ].filter(Boolean);
  return `Catering request: ${q.name}${parts.length ? ` · ${parts.join(" · ")}` : ""}`;
}

export function inquiryEmail(q: Inquiry): { html: string; text: string } {
  const day = eventDay(q.eventDate);
  const warn = flags(q, day?.daysAway ?? null);
  const received = new Date().toLocaleString("en-US", {
    timeZone: TZ,
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  const notGiven = `<span style="color:${MUTED};font-weight:400">Not given</span>`;

  const tile = (label: string, value: string, note = "") => `
    <td width="50%" valign="top" style="padding:6px">
      <div style="background:#ffffff;border:1px solid #e8dcc3;border-radius:4px;padding:14px 16px">
        <div style="font:600 11px/1 ${FONT};letter-spacing:1.5px;text-transform:uppercase;color:${TERRACOTTA}">${label}</div>
        <div style="font:700 20px/1.3 ${FONT};color:${INK};margin-top:8px">${value}</div>
        ${note ? `<div style="font:13px/1.4 ${FONT};color:${MUTED};margin-top:4px">${note}</div>` : ""}
      </div>
    </td>`;

  const button = (href: string, label: string, primary: boolean) => `
    <a href="${esc(href)}" style="display:inline-block;margin:0 8px 8px 0;padding:12px 20px;border-radius:3px;font:700 14px/1 ${FONT};text-decoration:none;${
      primary
        ? `background:${OLIVE};color:#ffffff`
        : `background:#ffffff;color:${OLIVE};border:1px solid ${OLIVE}`
    }">${label}</a>`;

  const replySubject = encodeURIComponent(
    `Your Limra catering request${day ? ` for ${day.short}` : ""}`
  );

  const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:${CREAM_SOFT}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CREAM_SOFT}">
<tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px">

  <tr><td style="background:${OLIVE_DEEP};border-radius:6px 6px 0 0;padding:22px 24px">
    <div style="font:600 11px/1 ${FONT};letter-spacing:2px;text-transform:uppercase;color:${CREAM};opacity:.75">New catering request</div>
    <div style="font:700 26px/1.25 ${FONT};color:#ffffff;margin-top:8px">${esc(q.name)}</div>
    <div style="font:16px/1.5 ${FONT};color:${CREAM};margin-top:6px">${[
      q.phone && `<a href="${esc(telHref(q.phone))}" style="color:${CREAM};text-decoration:none">${esc(q.phone)}</a>`,
      q.email && `<a href="mailto:${esc(q.email)}" style="color:${CREAM};text-decoration:none">${esc(q.email)}</a>`,
    ]
      .filter(Boolean)
      .join(" &nbsp;·&nbsp; ")}</div>
  </td></tr>

  <tr><td style="background:${CREAM};padding:12px 18px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        ${tile("When", day ? esc(day.long) : notGiven, day ? whenNote(day.daysAway) : "")}
        ${tile("Guests", q.guests ? esc(q.guests) : notGiven)}
      </tr>
      <tr>
        ${tile("Service", q.serviceType ? esc(shortService(q.serviceType)) : notGiven)}
        ${tile("Occasion", q.eventType ? esc(q.eventType) : notGiven)}
      </tr>
    </table>
  </td></tr>

  ${
    warn.length
      ? `<tr><td style="background:#fff4e0;border-left:4px solid ${TERRACOTTA};padding:12px 20px;font:600 14px/1.5 ${FONT};color:${TERRACOTTA}">
          ${warn.map(esc).join("<br>")}
        </td></tr>`
      : ""
  }

  <tr><td style="background:#ffffff;padding:22px 24px">
    <div style="font:600 11px/1 ${FONT};letter-spacing:1.5px;text-transform:uppercase;color:${TERRACOTTA}">Interested in</div>
    <div style="margin-top:10px">${
      q.interests.length
        ? q.interests
            .map(
              (i) =>
                `<span style="display:inline-block;margin:0 6px 6px 0;padding:6px 12px;border-radius:999px;background:${CREAM_SOFT};border:1px solid #e8dcc3;font:14px/1 ${FONT};color:${INK}">${esc(i)}</span>`
            )
            .join("")
        : `<span style="font:14px/1.5 ${FONT};color:${MUTED}">Nothing picked</span>`
    }</div>

    <div style="font:600 11px/1 ${FONT};letter-spacing:1.5px;text-transform:uppercase;color:${TERRACOTTA};margin-top:22px">Their message</div>
    ${
      q.message
        ? `<div style="margin-top:10px;padding:14px 16px;background:${CREAM_SOFT};border-left:3px solid ${OLIVE};font:15px/1.6 ${FONT};color:${INK};white-space:pre-wrap">${esc(q.message)}</div>`
        : `<div style="margin-top:10px;font:14px/1.5 ${FONT};color:${MUTED}">No message</div>`
    }
  </td></tr>

  <tr><td style="background:#ffffff;border-top:1px solid #efe6d3;padding:22px 24px">
    <div style="font:600 11px/1 ${FONT};letter-spacing:1.5px;text-transform:uppercase;color:${TERRACOTTA}">Get back to ${esc(q.name.split(" ")[0])}</div>
    <div style="font:16px/1.7 ${FONT};color:${INK};margin-top:10px">
      ${q.phone ? `Phone: <a href="${esc(telHref(q.phone))}" style="color:${OLIVE};font-weight:700">${esc(q.phone)}</a><br>` : ""}
      ${q.email ? `Email: <a href="mailto:${esc(q.email)}" style="color:${OLIVE};font-weight:700">${esc(q.email)}</a>` : ""}
    </div>
    <div style="margin-top:16px">
      ${q.email ? button(`mailto:${q.email}?subject=${replySubject}`, "Reply by email", true) : ""}
      ${q.phone ? button(telHref(q.phone), `Call ${q.phone}`, !q.email) : ""}
    </div>
  </td></tr>

  <tr><td style="padding:14px 24px;font:12px/1.5 ${FONT};color:${MUTED};text-align:center">
    Received ${esc(received)} from the catering form on limramedi.com.${q.email ? " Hitting Reply answers the guest directly." : ""}
  </td></tr>

</table>
</td></tr>
</table>
</body></html>`;

  const text = [
    `NEW CATERING REQUEST: ${q.name}`,
    "",
    `When:     ${day ? `${day.long} (${whenNote(day.daysAway)})` : "Not given"}`,
    `Guests:   ${q.guests || "Not given"}`,
    `Service:  ${q.serviceType || "Not given"}`,
    `Occasion: ${q.eventType || "Not given"}`,
    ...(warn.length ? ["", ...warn.map((w) => `! ${w}`)] : []),
    "",
    `Interested in: ${q.interests.join(", ") || "Nothing picked"}`,
    "",
    "Their message:",
    q.message || "No message",
    "",
    "Get back to them:",
    ...(q.phone ? [`Phone: ${q.phone}`] : []),
    ...(q.email ? [`Email: ${q.email}`] : []),
    "",
    `Received ${received} from the catering form on limramedi.com.`,
  ].join("\n");

  return { html, text };
}

export function confirmationEmail(q: Inquiry): { html: string; text: string } {
  const day = eventDay(q.eventDate);
  const first = q.name.split(" ")[0];
  const rows: [string, string][] = (
    [
      ["Date", day?.long ?? ""],
      ["Guests", q.guests],
      ["Service", q.serviceType],
      ["Occasion", q.eventType],
      ["Interested in", q.interests.join(", ")],
    ] as [string, string][]
  ).filter(([, v]) => v);

  const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:${CREAM_SOFT}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CREAM_SOFT}">
<tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:6px">
  <tr><td style="padding:28px 28px 8px;font:16px/1.6 ${FONT};color:${INK}">
    <div style="font:700 22px/1.3 ${FONT};color:${OLIVE}">Thank you, ${esc(first)}.</div>
    <p style="margin:14px 0 0">We've received your catering request. Our team will review the details and get back to you as soon as possible about availability, menu options, and next steps.</p>
  </td></tr>
  ${
    rows.length
      ? `<tr><td style="padding:16px 28px 0">
          <div style="font:600 11px/1 ${FONT};letter-spacing:1.5px;text-transform:uppercase;color:${TERRACOTTA}">Your request</div>
          <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:10px;font:15px/1.5 ${FONT};color:${INK}">
            ${rows
              .map(
                ([k, v]) =>
                  `<tr><td style="padding:3px 16px 3px 0;color:${MUTED};white-space:nowrap" valign="top">${k}</td><td style="padding:3px 0">${esc(v)}</td></tr>`
              )
              .join("")}
          </table>
        </td></tr>`
      : ""
  }
  <tr><td style="padding:20px 28px 28px;font:15px/1.6 ${FONT};color:${INK}">
    Need to add something? Just reply to this email, or call us at <a href="${CONTACT.phoneHref}" style="color:${OLIVE};font-weight:700;white-space:nowrap">${CONTACT.phoneDisplay}</a>.
    <div style="margin-top:18px;color:${OLIVE};font-weight:700">Limra Mediterranean</div>
    <div style="color:${MUTED};font-size:13px">${CONTACT.streetAddress}, ${CONTACT.locality}, ${CONTACT.region}</div>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;

  const text = [
    `Thank you, ${first}.`,
    "",
    "We've received your catering request. Our team will review the details and get back to you as soon as possible about availability, menu options, and next steps.",
    ...(rows.length ? ["", "Your request:", ...rows.map(([k, v]) => `${k}: ${v}`)] : []),
    "",
    `Need to add something? Just reply to this email, or call us at ${CONTACT.phoneDisplay}.`,
    "",
    "Limra Mediterranean",
    `${CONTACT.streetAddress}, ${CONTACT.locality}, ${CONTACT.region}`,
  ].join("\n");

  return { html, text };
}
