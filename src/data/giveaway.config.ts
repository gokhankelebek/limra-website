import { ADDRESS_LINES, CATERING_EMAIL } from "./contact";

// Grand Opening Giveaway: every date, prize, link and name in one place.
//
// The entry form: a Google Form owned by prodigitalstrategy@gmail.com
// ("Limra Grand Opening Giveaway (entries)"). NEXT_PUBLIC_GIVEAWAY_FORM_URL
// overrides it without a code change; the /g/enter route reads the same
// constant so the printed QR codes follow along.
export const DEFAULT_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdvYTDGT7f1JviOttZn-1E7RvyIneyMYzTmDHIlh2EvG6wQeA/viewform";
const FORM_URL = process.env.NEXT_PUBLIC_GIVEAWAY_FORM_URL || DEFAULT_FORM_URL;

export const GIVEAWAY = {
  instagramHandle: "@limra_mediterranean",
  instagramUrl: "https://www.instagram.com/limra_mediterranean/",
  hashtag: "#LimraMediterranean",
  formUrl: FORM_URL,
  formConfigured: true,
  // Both instants are Eastern Daylight Time (-04:00); the offsets make them
  // exact regardless of the server's or the visitor's time zone.
  opensAt: "2026-09-27T00:00:00-04:00",
  closesAt: "2026-10-06T23:59:59-04:00",
  opensLabel: "September 27, 2026",
  closesLabel: "October 6, 2026",
  drawDate: "October 8, 2026",
  announceDate: "October 9, 2026",
  claimDeadlineDays: 30,
  restaurantName: "Limra Mediterranean Restaurant",
  restaurantAddress: `${ADDRESS_LINES[0]}, ${ADDRESS_LINES[1]}`,
  // CONFIRM with the owners; falls back to the catering address.
  contactEmail: process.env.NEXT_PUBLIC_GIVEAWAY_EMAIL || CATERING_EMAIL,
  prizes: [
    {
      tier: "Grand Prize",
      count: 1,
      name: "Apple iPhone 17 Pro Max",
      value: "approx. $1,000",
    },
    { tier: "Second Prize", count: 3, name: "$100 Limra Gift Card" },
    { tier: "Third Prize", count: 6, name: "$50 Limra Gift Card" },
  ],
} as const;

export type Prize = (typeof GIVEAWAY.prizes)[number];
