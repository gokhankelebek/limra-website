// The real Limra menu — items and photography provided by the owners.
// PRICES ARE PLACEHOLDERS until Can & Elif confirm the final list.

export type DietaryTag = "V" | "VG" | "GF" | "N";

export type MenuItem = {
  slug: string;
  name: string;
  description: string;
  /** bare number, no currency symbol — rendered quiet per design spec */
  price: number;
  image: string;
  imageAlt: string;
  tags?: DietaryTag[];
  /** free-form qualifier, e.g. "GF on request" */
  note?: string;
  featured?: boolean;
};

export type MenuCategory = {
  id: string;
  /** roman numeral eyebrow — a nod to the ancient city */
  numeral: string;
  title: string;
  note: string;
  surface: "cream" | "olive";
  items: MenuItem[];
};

export const menuIntro = {
  eyebrow: "The Table",
  title: "Menu",
  line: "Platters from the spit, wraps rolled warm, bowls for the middle of the day.",
};

export const menuClosing = {
  line: "The first tables are set this summer.",
  primary: { label: "Get opening updates", href: "/updates" },
  secondary: { label: "Plan your visit", href: "/visit" },
};

export const menu: MenuCategory[] = [
  {
    id: "platters",
    numeral: "I",
    title: "Platters",
    note: "Built on rice, carved from the vertical spit.",
    surface: "cream",
    items: [
      {
        slug: "limra-platter",
        name: "Limra Platter",
        description:
          "Carved lamb-and-beef döner, rice, chopped salad, grilled tomato and pepper, hummus, warm flatbread.",
        price: 17,
        image: "/menu/limra-platter.jpg",
        imageAlt:
          "Limra Platter — carved döner over rice with salad, grilled tomato and pepper, hummus, and grilled flatbread",
        featured: true,
      },
      {
        slug: "iskender-platter",
        name: "İskender Platter",
        description:
          "Sliced from the spit over cut pide, tomato-butter sauce, strained yogurt, roasted peppers.",
        price: 16,
        image: "/menu/iskender-platter.jpg",
        imageAlt:
          "İskender Platter — sliced döner over cut pide under tomato-butter sauce with strained yogurt, roasted peppers, and pickles",
      },
    ],
  },
  {
    id: "wraps",
    numeral: "II",
    title: "Wraps",
    note: "Rolled to order in warm lavash.",
    surface: "olive",
    items: [
      {
        slug: "tantuni-wrap",
        name: "Tantuni Wrap",
        description:
          "Chopped seared beef, lettuce, tomato, red onion, rolled in thin lavash. Two house sauces.",
        price: 13,
        image: "/menu/tantuni-wrap.jpg",
        imageAlt:
          "Tantuni Wrap — chopped seared beef with lettuce, tomato, and red onion rolled in lavash, with two house sauces",
        featured: true,
      },
      {
        slug: "chicken-wrap-antakya",
        name: "Antakya Chicken Wrap",
        description:
          "Spit-roasted chicken, fries, pickles, warm spiced sauce, rolled in lavash.",
        price: 12,
        image: "/menu/chicken-wrap-antakya.jpg",
        imageAlt:
          "Antakya Chicken Wrap — spit-roasted chicken rolled with fries and pickles in lavash",
      },
      {
        slug: "medi-wrap",
        name: "Medi Wrap",
        description:
          "Beef döner, iceberg, red cabbage, house white sauce. Served with fries.",
        price: 12,
        image: "/menu/medi-wrap.jpg",
        imageAlt:
          "Medi Wrap — beef döner with iceberg and red cabbage in lavash, served with fries and pickles",
      },
      {
        slug: "vegan-cig-kofte-wrap",
        name: "Vegan Çiğ Köfte Wrap",
        description:
          "Hand-kneaded bulgur köfte, crisp greens, tomato, lemon, rolled in lavash.",
        price: 11,
        image: "/menu/vegan-cig-kofte-wrap.jpg",
        imageAlt:
          "Vegan Çiğ Köfte Wrap — hand-kneaded bulgur köfte with greens and tomato in lavash, lemon on the side",
        tags: ["VG"],
      },
    ],
  },
  {
    id: "bowls",
    numeral: "III",
    title: "Bowls",
    note: "The whole table, in one bowl.",
    surface: "cream",
    items: [
      {
        slug: "apendos-bowl",
        name: "Apendos Bowl",
        description:
          "Seared beef strips, rice, hummus, spiced chickpeas, çiğ köfte, yogurt dip, flatbread.",
        price: 15,
        image: "/menu/apendos-bowl.jpg",
        imageAlt:
          "Apendos Bowl — seared beef strips over rice with hummus, spiced chickpeas, çiğ köfte, and yogurt dip",
        featured: true,
      },
      {
        slug: "hummus-bowl",
        name: "Hummus Bowl",
        description:
          "Chicken döner over hummus, crisp potatoes, slaw, olives, crispy onions.",
        price: 13,
        image: "/menu/hummus-bowl.jpg",
        imageAlt:
          "Hummus Bowl — chicken döner over hummus with crisp potatoes, slaw, olives, and crispy onions",
      },
    ],
  },
  {
    id: "from-the-counter",
    numeral: "IV",
    title: "From the Counter",
    note: "For one hand, or for the middle of the table.",
    surface: "olive",
    items: [
      {
        slug: "limra-loaded-fries",
        name: "Limra Loaded Fries",
        description:
          "Fries under spit-roasted chicken, crispy onions, herb cream, roasted pepper sauce.",
        price: 11,
        image: "/menu/limra-loaded-fries.jpg",
        imageAlt:
          "Limra Loaded Fries — fries loaded with chicken döner, crispy onions, herb cream, and roasted pepper sauce",
        featured: true,
      },
      {
        slug: "amalfi-melt",
        name: "Amalfi Melt",
        description:
          "Shaved beef on a toasted roll, greens, red cabbage, herb cream.",
        price: 12,
        image: "/menu/amalfi-melt.jpg",
        imageAlt:
          "Amalfi Melt — beef döner on a toasted roll with greens, red cabbage, and herb cream, pickles alongside",
      },
      {
        slug: "angora-sandwich",
        name: "Angora Sandwich",
        description:
          "Spit-roasted chicken in a crisp roll, garlic yogurt, tomato, banana peppers.",
        price: 12,
        image: "/menu/angora-sandwich.jpg",
        imageAlt:
          "Angora Sandwich — chicken döner in a crisp roll with garlic yogurt and tomato, pickles alongside",
      },
      {
        slug: "medi-taco",
        name: "Medi Taco",
        description:
          "Three soft tacos, spiced chicken, slaw, tomato, herb drizzle.",
        price: 11,
        image: "/menu/medi-taco.jpg",
        imageAlt:
          "Medi Taco — three soft tacos with chicken döner, slaw, tomato, and herb drizzle",
      },
    ],
  },
];

export const allDishes = menu.flatMap((category) =>
  category.items.map((item) => ({ ...item, category }))
);

export function findDish(slug: string) {
  return allDishes.find((d) => d.slug === slug);
}
