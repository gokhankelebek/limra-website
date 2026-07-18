// The real Limra menu — items and photography provided by the owners.
// PRICES ARE PLACEHOLDERS until Can & Elif confirm the final list.

import { ORDER_URL } from "./contact";

export type DietaryTag = "V" | "VG" | "GF" | "N";

export type MenuItem = {
  slug: string;
  name: string;
  description: string;
  /** bare number, no currency symbol — rendered quiet per design spec */
  price: number;
  image: string;
  imageAlt: string;
  /** art-directed object-position for cropped renders, e.g. "20% 65%" */
  crop?: string;
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
  /** short form for the milestone rail and tight indexes */
  shortLabel: string;
  note: string;
  surface: "cream" | "olive";
  /** "anticipation", announced at the threshold, set at opening */
  kind?: "anticipation";
  items: MenuItem[];
};

export const menuIntro = {
  eyebrow: "The Table",
  title: "Menu",
  line: "Platters from the spit, wraps rolled warm, bowls for the middle of the day.",
};

export const menuClosing = {
  line: "The first tables are set this summer.",
  primary: { label: "Order online", href: ORDER_URL },
  secondary: { label: "Plan your visit", href: "/visit" },
};

export const menu: MenuCategory[] = [
  {
    id: "platters",
    numeral: "I",
    title: "Platters",
    shortLabel: "Platters",
    note: "Built on rice, carved from the vertical spit.",
    surface: "cream",
    items: [
      {
        slug: "limra-platter",
        name: "Limra Platter",
        description:
          "Carved lamb-and-beef döner, rice, chopped salad, grilled tomato and pepper, hummus, warm flatbread.",
        price: 17,
        image: "/menu/limra-platter.jpg?v=ab0b4a83",
        imageAlt:
          "Limra Platter, carved döner over rice with salad, grilled tomato and pepper, hummus, and grilled flatbread",
        crop: "50% 50%",
        featured: true,
      },
      {
        slug: "iskender-platter",
        name: "İskender Platter",
        description:
          "Sliced from the spit over cut pide, tomato-butter sauce, strained yogurt, roasted peppers.",
        price: 16,
        image: "/menu/iskender-platter.jpg?v=3b0de7d8",
        imageAlt:
          "İskender Platter, sliced döner over cut pide under tomato-butter sauce with strained yogurt, roasted peppers, and pickles",
        crop: "50% 50%",
      },
    ],
  },
  {
    id: "wraps",
    numeral: "II",
    title: "Wraps",
    shortLabel: "Wraps",
    note: "Rolled to order in warm lavash.",
    surface: "olive",
    items: [
      {
        slug: "tantuni-wrap",
        name: "Tantuni Wrap",
        description:
          "Chopped seared beef, lettuce, tomato, red onion, rolled in thin lavash. Two house sauces.",
        price: 13,
        image: "/menu/tantuni-wrap.jpg?v=4305f3da",
        imageAlt:
          "Tantuni Wrap, chopped seared beef with lettuce, tomato, and red onion rolled in lavash, with two house sauces",
        crop: "50% 50%",
        featured: true,
      },
      {
        slug: "chicken-wrap-antakya",
        name: "Antakya Chicken Wrap",
        description:
          "Spit-roasted chicken, fries, pickles, warm spiced sauce, rolled in lavash.",
        price: 12,
        image: "/menu/chicken-wrap-antakya.jpg?v=53531061",
        imageAlt:
          "Antakya Chicken Wrap, spit-roasted chicken rolled with fries and pickles in lavash",
        crop: "50% 50%",
      },
      {
        slug: "medi-wrap",
        name: "Medi Wrap",
        description:
          "Beef döner, iceberg, red cabbage, house white sauce. Served with fries.",
        price: 12,
        image: "/menu/medi-wrap.jpg?v=89f97bc1",
        imageAlt:
          "Medi Wrap, beef döner with iceberg and red cabbage in lavash, served with fries and pickles",
        crop: "50% 50%",
      },
      {
        slug: "vegan-cig-kofte-wrap",
        name: "Vegan Çiğ Köfte Wrap",
        description:
          "Hand-kneaded bulgur köfte, crisp greens, tomato, lemon, rolled in lavash.",
        price: 11,
        image: "/menu/vegan-cig-kofte-wrap.jpg?v=aa6fad28",
        imageAlt:
          "Vegan Çiğ Köfte Wrap, hand-kneaded bulgur köfte with greens and tomato in lavash, lemon on the side",
        tags: ["VG"],
      },
    ],
  },
  {
    id: "bowls",
    numeral: "III",
    title: "Bowls",
    shortLabel: "Bowls",
    note: "The whole table, in one bowl.",
    surface: "cream",
    items: [
      {
        slug: "aspendos-bowl",
        name: "Aspendos Bowl",
        description:
          "Seared beef strips, rice, hummus, spiced chickpeas, çiğ köfte, yogurt dip, flatbread.",
        price: 15,
        image: "/menu/aspendos-bowl.jpg?v=ae8ce258",
        imageAlt:
          "Aspendos Bowl, seared beef strips over rice with hummus, spiced chickpeas, çiğ köfte, and yogurt dip",
        crop: "50% 50%",
        featured: true,
      },
      {
        slug: "hummus-bowl",
        name: "Hummus Bowl",
        description:
          "Chicken döner over hummus, crisp potatoes, slaw, olives, crispy onions.",
        price: 13,
        image: "/menu/hummus-bowl.jpg?v=01c83f6e",
        imageAlt:
          "Hummus Bowl, chicken döner over hummus with crisp potatoes, slaw, olives, and crispy onions",
        crop: "50% 50%",
      },
    ],
  },
  {
    id: "from-the-counter",
    numeral: "IV",
    title: "From the Counter",
    shortLabel: "Counter",
    note: "For one hand, or for the middle of the table.",
    surface: "olive",
    items: [
      {
        slug: "limra-loaded-fries",
        name: "Limra Loaded Fries",
        description:
          "Fries under spit-roasted chicken, crispy onions, herb cream, roasted pepper sauce.",
        price: 11,
        image: "/menu/limra-loaded-fries.jpg?v=2eba511d",
        imageAlt:
          "Limra Loaded Fries, fries loaded with chicken döner, crispy onions, herb cream, and roasted pepper sauce",
        crop: "50% 50%",
      },
      {
        slug: "amalfi-melt",
        name: "Amalfi Melt",
        description:
          "Shaved beef on a toasted roll, greens, red cabbage, herb cream.",
        price: 12,
        image: "/menu/amalfi-melt.jpg?v=2cfb6c3b",
        imageAlt:
          "Amalfi Melt, beef döner on a toasted roll with greens, red cabbage, and herb cream, pickles alongside",
        crop: "50% 50%",
        featured: true,
      },
      {
        slug: "angora-sandwich",
        name: "Angora Sandwich",
        description:
          "Spit-roasted chicken in a crisp roll, garlic yogurt, tomato, banana peppers.",
        price: 12,
        image: "/menu/angora-sandwich.jpg?v=bd57de24",
        imageAlt:
          "Angora Sandwich, chicken döner in a crisp roll with garlic yogurt and tomato, pickles alongside",
      },
      {
        slug: "medi-taco",
        name: "Medi Taco",
        description:
          "Three soft tacos, spiced chicken, slaw, tomato, herb drizzle.",
        price: 11,
        image: "/menu/medi-taco.jpg?v=081d148c",
        imageAlt:
          "Medi Taco, three soft tacos with chicken döner, slaw, tomato, and herb drizzle",
        crop: "50% 50%",
      },
    ],
  },
  {
    id: "the-case",
    numeral: "V",
    title: "The Case",
    shortLabel: "The Case",
    note: "Chef Elif's baklava and pastries, made fresh for the case.",
    surface: "cream",
    kind: "anticipation",
    items: [],
  },
  {
    id: "espresso-counter",
    numeral: "VI",
    title: "The Espresso Counter",
    shortLabel: "Espresso",
    note: "Pulled slow, worth lingering.",
    surface: "olive",
    kind: "anticipation",
    items: [],
  },
];

export const allDishes = menu.flatMap((category) =>
  category.items.map((item) => ({ ...item, category }))
);

export function findDish(slug: string) {
  return allDishes.find((d) => d.slug === slug);
}
