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
