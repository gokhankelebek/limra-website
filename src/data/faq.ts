import { ADDRESS_LINES, CONTACT, SERVICE_LINE } from "./contact";

/**
 * Questions people actually search before a restaurant opens. Every answer
 * is grounded in the owners' own facts: the boards, the story page, or the
 * contact details. Nothing here is inferred.
 *
 * Deliberately absent until Can & Elif confirm: halal sourcing, the exact
 * opening date, and parking.
 */
export const FAQ: { q: string; a: string }[] = [
  {
    q: "When does Limra open?",
    a: "Limra opens this summer in Holly Springs. The mailing list hears the date first, along with an invitation to the soft-opening tasting.",
  },
  {
    q: "Where is Limra?",
    a: `${ADDRESS_LINES[0]}, ${ADDRESS_LINES[1]}. It sits at Peterson Station.`,
  },
  {
    q: "Do you take reservations?",
    a: `No. Limra is counter service: you order at the counter and take a table. For large gatherings and catering, call ${CONTACT.phoneDisplay}.`,
  },
  {
    q: "Is there anything for vegans?",
    a: "Yes. Falafel is the base protein on the platters, bowls, wraps and sandwiches at no extra charge, so most of the menu can be built vegan. The Çiğ Köfte Wrap is vegan as it comes.",
  },
  {
    q: "What can I choose from?",
    a: "Most dishes are built to order. You pick a protein — falafel, chicken döner, tantuni or beef döner — and one of four house sauces: Limra sauce, tzatziki, harissa mayo or garlic aioli. Each dish page lists its own prices.",
  },
  {
    q: "Do you cater?",
    a: `Yes. The same kitchen travels for celebrations and gatherings. Call ${CONTACT.phoneDisplay} to arrange it.`,
  },
  {
    q: "Can I order online, or get delivery?",
    a: `Online ordering opens with the doors. ${SERVICE_LINE} once we are open.`,
  },
  {
    q: "How do you handle food allergies?",
    a: "Every dish page lists its allergens. Everything is prepared in a shared kitchen, so please tell us about any allergy before you order.",
  },
];

export const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};
