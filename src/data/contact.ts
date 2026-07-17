// Real NAP details — keep identical everywhere (site, GBP, Yelp, maps)
// for local-SEO consistency.

export const CONTACT = {
  streetAddress: "3109 McChesney Hill Loop",
  locality: "Holly Springs",
  region: "NC",
  postalCode: "27539",
  phoneDisplay: "(984) 999-5388",
  phoneHref: "tel:+19849995388",
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

export const HOURS_SUMMARY = "From opening day · 11 am – 9 pm";

// Every "Order online" button points here — swap for the real ordering
// platform URL the day it exists.
export const ORDER_URL = "/order";

export const SERVICE_LINE = "Dine-in · Takeout · Delivery";

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
