// The real Limra menu — items and photography provided by the owners.
// Prices and protein ladders transcribed from the owners' menu boards
// (limra-screens.vercel.app). Base price includes that item's +$0 protein.

import { ORDER_URL } from "./contact";

export type DietaryTag = "V" | "VG" | "GF" | "N";

/** A build-to-order protein and what it adds to the item's base price. */
export type ProteinChoice = {
  name: string;
  /** dollars over the base price; 0 is the protein the base price buys */
  upcharge: number;
  tags?: DietaryTag[];
};

// Plates and bowls carry the wider ladder; handhelds a shorter one.
const PLATE_PROTEINS: ProteinChoice[] = [
  { name: "Falafel", upcharge: 0, tags: ["VG", "GF"] },
  { name: "Chicken döner", upcharge: 2 },
  { name: "Tantuni", upcharge: 3 },
  { name: "Beef döner", upcharge: 4 },
];

const HANDHELD_PROTEINS: ProteinChoice[] = [
  { name: "Falafel", upcharge: 0, tags: ["VG", "GF"] },
  { name: "Chicken döner", upcharge: 1.5 },
  { name: "Tantuni", upcharge: 2.5 },
  { name: "Beef döner", upcharge: 3 },
];

// No falafel option on these two.
const MEAT_PROTEINS: ProteinChoice[] = [
  { name: "Chicken döner", upcharge: 0 },
  { name: "Tantuni", upcharge: 2.5 },
  { name: "Beef döner", upcharge: 3 },
];

const ISKENDER_PROTEINS: ProteinChoice[] = [
  { name: "Chicken döner", upcharge: 0 },
  { name: "Beef döner", upcharge: 4 },
];

export type MenuItem = {
  slug: string;
  name: string;
  description: string;
  /** base price, no currency symbol — rendered quiet per design spec */
  price: number;
  /** set when the dish is built to order from a protein ladder */
  proteins?: ProteinChoice[];
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
        price: 14.99,
        proteins: PLATE_PROTEINS,
        image: "/menu/limra-platter.jpg?v=69cce1d9",
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
        price: 16.99,
        proteins: ISKENDER_PROTEINS,
        image: "/menu/iskender-platter.jpg?v=04d6950a",
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
        price: 14.5,
        image: "/menu/tantuni-wrap.jpg?v=c2bc7070",
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
        price: 14.5,
        image: "/menu/chicken-wrap-antakya.jpg?v=f60c7ff8",
        imageAlt:
          "Antakya Chicken Wrap, spit-roasted chicken rolled with fries and pickles in lavash",
        crop: "50% 50%",
      },
      {
        slug: "medi-wrap",
        name: "Medi Wrap",
        description:
          "Beef döner, iceberg, red cabbage, house white sauce. Served with fries.",
        price: 11.99,
        proteins: HANDHELD_PROTEINS,
        image: "/menu/medi-wrap.jpg?v=c313a459",
        imageAlt:
          "Medi Wrap, beef döner with iceberg and red cabbage in lavash, served with fries and pickles",
        crop: "50% 50%",
      },
      {
        slug: "vegan-cig-kofte-wrap",
        name: "Vegan Çiğ Köfte Wrap",
        description:
          "Hand-kneaded bulgur köfte, crisp greens, tomato, lemon, rolled in lavash.",
        price: 10.99,
        image: "/menu/vegan-cig-kofte-wrap.jpg?v=f18ab94d",
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
        price: 15.99,
        proteins: PLATE_PROTEINS,
        image: "/menu/aspendos-bowl.jpg?v=a4bbe358",
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
        price: 14.99,
        proteins: PLATE_PROTEINS,
        image: "/menu/hummus-bowl.jpg?v=5d427352",
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
        price: 14.99,
        proteins: PLATE_PROTEINS,
        image: "/menu/limra-loaded-fries.jpg?v=338102e7",
        imageAlt:
          "Limra Loaded Fries, fries loaded with chicken döner, crispy onions, herb cream, and roasted pepper sauce",
        crop: "50% 50%",
      },
      {
        slug: "amalfi-melt",
        name: "Amalfi Melt",
        description:
          "Shaved beef on a toasted roll, greens, red cabbage, herb cream.",
        price: 14.49,
        proteins: MEAT_PROTEINS,
        image: "/menu/amalfi-melt.jpg?v=a75c43b6",
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
        price: 11.99,
        proteins: HANDHELD_PROTEINS,
        image: "/menu/angora-sandwich.jpg?v=2794591f",
        imageAlt:
          "Angora Sandwich, chicken döner in a crisp roll with garlic yogurt and tomato, pickles alongside",
      },
      {
        slug: "medi-taco",
        name: "Medi Taco",
        description:
          "Three soft tacos, spiced chicken, slaw, tomato, herb drizzle.",
        price: 12.99,
        proteins: MEAT_PROTEINS,
        image: "/menu/medi-taco.jpg?v=917d091e",
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
    title: "Limra Beverage Counter",
    shortLabel: "Beverage",
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
