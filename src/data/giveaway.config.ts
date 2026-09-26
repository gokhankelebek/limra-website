import { ADDRESS_LINES } from "./contact";

// Grand Opening Giveaway: every date, prize, link and name in one place.
//
// Entries are taken on the site itself (/giveaway/enter); /api/giveaway
// mirrors each one into the Google Form below, which feeds the owners'
// response Sheet (the single list used for the drawing). Verification
// screenshots travel by Instagram DM, never through the site.
// NEXT_PUBLIC_GIVEAWAY_FORM_URL overrides the entry URL without a code
// change (e.g. to fall back to the Google Form directly); /g/enter follows.
export const GOOGLE_FORM_ID =
  "1FAIpQLSdvYTDGT7f1JviOttZn-1E7RvyIneyMYzTmDHIlh2EvG6wQeA";
export const GOOGLE_FORM_VIEW_URL = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/viewform`;
export const GOOGLE_FORM_POST_URL = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;
// Google Form field ids (entry.NNN) for the mirror, filled from the live form.
export const GOOGLE_FORM_ENTRIES: Record<
  "name" | "handle" | "email" | "phone" | "postType" | "postUrl" | "hashtag" | "notes" | "eligibility",
  string
> = {
  name: "2013828823",
  handle: "994683946",
  email: "2009953304",
  phone: "766307150",
  postType: "1531223617",
  postUrl: "1484922715",
  hashtag: "282567240",
  notes: "1421246941",
  eligibility: "1863800969",
};
const FORM_URL = process.env.NEXT_PUBLIC_GIVEAWAY_FORM_URL || "/giveaway/enter";

export const GIVEAWAY = {
  instagramHandle: "@limra_mediterranean",
  instagramUrl: "https://www.instagram.com/limra_mediterranean/",
  hashtag: "#LimraMediterranean",
  formUrl: FORM_URL,
  formConfigured: true,
  // Both instants are Eastern Daylight Time (-04:00); the offsets make them
  // exact regardless of the server's or the visitor's time zone.
  opensAt: "2026-10-02T00:00:00-04:00",
  closesAt: "2026-10-11T23:59:59-04:00",
  opensLabel: "October 2, 2026",
  closesLabel: "October 11, 2026",
  opensLabelLong: "October 2, 2026",
  closesLabelLong: "October 11, 2026",
  opensLabelShort: "October 2",
  drawDate: "October 13, 2026",
  announceDate: "October 14, 2026",
  claimDeadlineDays: 30,
  restaurantName: "Limra Mediterranean Restaurant",
  restaurantAddress: `${ADDRESS_LINES[0]}, ${ADDRESS_LINES[1]}`,
  // Owners' decision (13 Sept 2026): Instagram DM is the giveaway's only
  // contact channel. No email appears in giveaway copy or rules.
  contactLine: "send a direct message to @limra_mediterranean on Instagram",
  prizes: [
    {
      tier: "Grand Prize",
      count: 1,
      name: "Apple iPhone 18 Pro",
      value: "Burgundy · approx. $1,200",
    },
    { tier: "Second Prize", count: 3, name: "$100 Limra Gift Card" },
    { tier: "Third Prize", count: 6, name: "$50 Limra Gift Card" },
  ],
} as const;

export type Prize = (typeof GIVEAWAY.prizes)[number];
