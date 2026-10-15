// Real NAP details — keep identical everywhere (site, GBP, Yelp, maps)
// for local-SEO consistency.
import { OPENING_LABEL, isOpen } from "./opening";

export const CONTACT = {
  streetAddress: "3109 McChesney Hill Loop",
  locality: "Holly Springs",
  region: "NC",
  postalCode: "27539",
  phoneDisplay: "(919) 446-6060",
  phoneHref: "tel:+19194466060",
  // schema.org telephone (Restaurant / FoodEstablishment JSON-LD)
  phoneSchema: "+1-919-446-6060",
} as const;

// Hours as published on limramedi.com: 11am — 9pm, daily.
export const HOURS = [
  {
    days: "Every day",
    time: "11 am – 9 pm",
    schemaDays: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "11:00",
    closes: "21:00",
  },
] as const;

// Footer hours line, before and after opening day.
export function getHoursSummary(open: boolean = isOpen()): string {
  return open ? "Open daily · 11 am – 9 pm" : `From ${OPENING_LABEL} · 11 am – 9 pm`;
}

// Every "Order online" button points here — swap for the real ordering
// platform URL the day it exists.
export const ORDER_URL = "/order";

export const SERVICE_LINE = "Dine-in · Takeout · Delivery";

// Public catering address. limramedi.com has no mailbox yet (no MX records,
// Oct 2026), so nothing is shown until NEXT_PUBLIC_CATERING_EMAIL is set in
// Vercel to an address that really receives mail. Until then the site points
// guests to the catering form and the phone.
export const CATERING_EMAIL: string | null =
  process.env.NEXT_PUBLIC_CATERING_EMAIL || null;
export const CATERING_EMAIL_HREF: string | null = CATERING_EMAIL
  ? `mailto:${CATERING_EMAIL}`
  : null;

// From limramedi.com — used in the footer and Restaurant schema sameAs.
export const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/limra_mediterranean/" },
  { label: "Facebook", href: "https://www.facebook.com/limramediterranean/" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCKFsf848BAsKtnWZyG56Qsw" },
  { label: "Yelp", href: "https://www.yelp.com/biz/limra-mediterranean-restaurant-and-cafe-holly-springs" },
] as const;

export const ADDRESS_LINES = [
  CONTACT.streetAddress,
  `${CONTACT.locality}, ${CONTACT.region} ${CONTACT.postalCode}`,
] as const;

const FULL_ADDRESS = `${CONTACT.streetAddress}, ${CONTACT.locality}, ${CONTACT.region} ${CONTACT.postalCode}`;

export const DIRECTIONS_URL = `https://maps.google.com/?q=${encodeURIComponent(
  `Limra Mediterranean Restaurant, ${FULL_ADDRESS}`
)}`;

export const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  FULL_ADDRESS
)}&output=embed`;
