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

// PLACEHOLDER HOURS — plausible until Can & Elif confirm the real ones.
export const HOURS = [
  { days: "Monday – Thursday", time: "11 am – 9 pm", schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "11:00", closes: "21:00" },
  { days: "Friday – Saturday", time: "11 am – 10 pm", schemaDays: ["Friday", "Saturday"], opens: "11:00", closes: "22:00" },
  { days: "Sunday", time: "11 am – 8 pm", schemaDays: ["Sunday"], opens: "11:00", closes: "20:00" },
] as const;

export const HOURS_SUMMARY = "Open daily from 11 am";

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
