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
  // General inbox (Google Workspace on limramedi.com since Oct 2026)
  email: "info@limramedi.com",
  emailHref: "mailto:info@limramedi.com",
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

// Online ordering (pickup and delivery) runs on Toast. Every "Order online"
// button links here directly; limramedi.com/order redirects here too
// (next.config.ts), for printed materials and short links.
export const ORDER_URL =
  "https://order.toasttab.com/online/limra-mediterranean-restaurant";

export const SERVICE_LINE = "Dine-in · Takeout · Delivery";

// Catering inbox (Google Workspace). The /catering form still files every
// inquiry in the Google Sheet; this is for guests who would rather write.
export const CATERING_EMAIL = "catering@limramedi.com";
export const CATERING_EMAIL_HREF = `mailto:${CATERING_EMAIL}`;

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
