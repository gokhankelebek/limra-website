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

/** The four house sauces offered on build-to-order dishes. */
export const SIGNATURE_SAUCES = [
  "Limra sauce",
  "Tzatziki",
  "Harissa mayo",
  "Garlic aioli",
] as const;

/** Add-on offered on the wraps, sandwiches and tacos. */
export const ADD_FRIES_PRICE = 2.99;

/** A plain priced line: fries, breads, sides, proteins by the pound. */
export type CounterItem = {
  name: string;
  /** portion as the boards state it, e.g. "8 oz", "1 lb", "4 pieces" */
  size?: string;
  price: number;
  tags?: DietaryTag[];
};

export type CounterGroup = {
  title: string;
  items: CounterItem[];
};

export type MenuItem = {
  slug: string;
  name: string;
  description: string;
  /** base price, no currency symbol — rendered quiet per design spec */
  price: number;
  /** set when the dish is built to order from a protein ladder */
  proteins?: ProteinChoice[];
  /** house sauces the guest chooses from; omitted when the sauce is fixed */
  sauces?: readonly string[];
  /** allergens as the boards state them, e.g. "Wheat (lavash)" */
  allergens?: string[];
  /** true when fries can be added for ADD_FRIES_PRICE */
  addFries?: boolean;
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
  kind?: "anticipation" | "counter";
  items: MenuItem[];
  /** priced lists for the "counter" kind: fries, breads, sides, proteins */
  counterGroups?: CounterGroup[];
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
          "Mediterranean salad, hummus, seasoned rice, grilled pita, grilled peppers, roasted tomato. Your choice of protein and sauce.",
        price: 14.99,
        proteins: PLATE_PROTEINS,
        image: "/menu/limra-platter.jpg?v=69cce1d9",
        sauces: SIGNATURE_SAUCES,
        allergens: ["Wheat (pita bread)","Sesame (hummus)"],
        imageAlt:
          "Limra Platter, carved döner with seasoned rice, Mediterranean salad, hummus, grilled peppers, roasted tomato, and grilled pita",
        crop: "50% 50%",
        featured: true,
      },
      {
        slug: "iskender-platter",
        name: "İskender Platter",
        description:
          "Döner over butter-toasted bread with plain yogurt, finished with our warm tomato sauce.",
        price: 16.99,
        proteins: ISKENDER_PROTEINS,
        image: "/menu/iskender-platter.jpg?v=04d6950a",
        allergens: ["Wheat","Milk"],
        imageAlt:
          "İskender Platter, sliced döner over butter-toasted bread with plain yogurt and warm tomato sauce",
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
          "Butter-sautéed seasoned beef tantuni rolled in lavash with tomato, parsley, lettuce, and sumac onions. Garlic aioli.",
        price: 14.5,
        image: "/menu/tantuni-wrap.jpg?v=c2bc7070",
        allergens: ["Wheat (lavash)","Milk","Egg"],
        addFries: true,
        imageAlt:
          "Tantuni Wrap, butter-sautéed seasoned beef with tomato, parsley, lettuce, and sumac onions rolled in lavash",
        crop: "50% 50%",
        featured: true,
      },
      {
        slug: "chicken-wrap-antakya",
        name: "Antakya Chicken Wrap",
        description:
          "Chicken döner rolled in lavash with crispy fries, pickles, lettuce, tomato, sumac onions, and parsley. Garlic aioli and warm tomato sauce.",
        price: 14.5,
        image: "/menu/chicken-wrap-antakya.jpg?v=f60c7ff8",
        allergens: ["Wheat (lavash)","Egg"],
        addFries: true,
        imageAlt:
          "Antakya Chicken Wrap, chicken döner rolled in lavash with crispy fries, pickles, lettuce, tomato, and sumac onions",
        crop: "50% 50%",
      },
      {
        slug: "medi-wrap",
        name: "Medi Wrap",
        description:
          "Lavash rolled with lettuce, red cabbage, pickles, tomato, and sumac onions. Your choice of protein and sauce.",
        price: 11.99,
        proteins: HANDHELD_PROTEINS,
        image: "/menu/medi-wrap.jpg?v=c313a459",
        sauces: SIGNATURE_SAUCES,
        allergens: ["Wheat (lavash)"],
        addFries: true,
        imageAlt:
          "Medi Wrap, döner with lettuce, red cabbage, pickles, tomato, and sumac onions rolled in lavash",
        crop: "50% 50%",
      },
      {
        slug: "vegan-cig-kofte-wrap",
        name: "Vegan Çiğ Köfte Wrap",
        description:
          "Spicy bulgur blended with fresh herbs, rolled in lavash with lettuce, tomato, crispy onions, pickles, and pomegranate molasses. Mild or spicy.",
        price: 10.99,
        image: "/menu/vegan-cig-kofte-wrap.jpg?v=f18ab94d",
        allergens: ["Wheat (bulgur)"],
        imageAlt:
          "Vegan Çiğ Köfte Wrap, spicy bulgur with fresh herbs, lettuce, tomato, crispy onions, and pickles rolled in lavash",
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
          "Seasoned rice under mixed greens, hummus, smoky baba ghanoush, bulgur ball, red cabbage, sumac onions, tomato, and olives. Your choice of protein and sauce.",
        price: 15.99,
        proteins: PLATE_PROTEINS,
        image: "/menu/aspendos-bowl.jpg?v=a4bbe358",
        sauces: SIGNATURE_SAUCES,
        allergens: ["Wheat (bulgur ball)","Sesame (hummus)"],
        imageAlt:
          "Aspendos Bowl, seasoned rice with mixed greens, hummus, baba ghanoush, bulgur ball, red cabbage, sumac onions, tomato, and olives",
        crop: "50% 50%",
        featured: true,
      },
      {
        slug: "hummus-bowl",
        name: "Hummus Bowl",
        description:
          "Hummus under lettuce, tomato, bulgur ball, red cabbage, pickles, olives, and crispy onions. Your choice of protein and sauce.",
        price: 14.99,
        proteins: PLATE_PROTEINS,
        image: "/menu/hummus-bowl.jpg?v=5d427352",
        sauces: SIGNATURE_SAUCES,
        allergens: ["Wheat (bulgur ball)","Sesame (hummus)"],
        imageAlt:
          "Hummus Bowl, hummus topped with lettuce, tomato, bulgur ball, red cabbage, pickles, olives, and crispy onions",
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
          "Crispy Cajun fries under mozzarella, tomato, red cabbage, pickles, and olives. Your choice of protein and sauce.",
        price: 14.99,
        proteins: PLATE_PROTEINS,
        image: "/menu/limra-loaded-fries.jpg?v=338102e7",
        sauces: SIGNATURE_SAUCES,
        allergens: ["Milk (mozzarella)"],
        imageAlt:
          "Limra Loaded Fries, crispy Cajun fries with mozzarella, tomato, red cabbage, pickles, and olives",
        crop: "50% 50%",
      },
      {
        slug: "amalfi-melt",
        name: "Amalfi Melt",
        description:
          "Fresh-baked eight-inch bread layered with arugula, mozzarella, crispy onions, tomato, and banana peppers. Your choice of protein and sauce.",
        price: 14.49,
        proteins: MEAT_PROTEINS,
        image: "/menu/amalfi-melt.jpg?v=a75c43b6",
        sauces: SIGNATURE_SAUCES,
        allergens: ["Wheat (bread)","Milk (mozzarella)"],
        addFries: true,
        imageAlt:
          "Amalfi Melt, eight-inch bread layered with arugula, mozzarella, crispy onions, tomato, and banana peppers",
        crop: "50% 50%",
        featured: true,
      },
      {
        slug: "angora-sandwich",
        name: "Angora Sandwich",
        description:
          "Eight-inch baguette with lettuce, tomato, pickles, and sumac onions. Your choice of protein and sauce.",
        price: 11.99,
        proteins: HANDHELD_PROTEINS,
        image: "/menu/angora-sandwich.jpg?v=2794591f",
        sauces: SIGNATURE_SAUCES,
        allergens: ["Wheat (baguette)"],
        addFries: true,
        imageAlt:
          "Angora Sandwich, eight-inch baguette with lettuce, tomato, pickles, and sumac onions",
      },
      {
        slug: "medi-taco",
        name: "Medi Taco",
        description:
          "Three soft tacos with lettuce, tomato, red cabbage, and parsley. Your choice of protein, with Limra sauce.",
        price: 12.99,
        proteins: MEAT_PROTEINS,
        image: "/menu/medi-taco.jpg?v=917d091e",
        allergens: ["Wheat (tortilla)"],
        addFries: true,
        imageAlt:
          "Medi Taco, three soft tacos with lettuce, tomato, red cabbage, and parsley",
        crop: "50% 50%",
      },
    ],
  },
  {
    id: "sides",
    numeral: "V",
    title: "Sides & Extras",
    shortLabel: "Sides",
    note: "Fries, breads, and the counter by the pound.",
    surface: "cream",
    kind: "counter",
    items: [],
    counterGroups: [
      {
        title: "Fries",
        items: [
          { name: "Cajun seasoning", size: "8 oz", price: 4.99 },
          { name: "Parmesan garlic", size: "8 oz", price: 5.99 },
          { name: "Classic, no salt", size: "8 oz", price: 4.99 },
        ],
      },
      {
        title: "Breads",
        items: [
          { name: "Grilled pita", size: "1 piece", price: 0.99 },
          { name: "Warm lavash", size: "1 piece", price: 0.99 },
        ],
      },
      {
        title: "Sides",
        items: [
          { name: "Rice", size: "8 oz", price: 4.5 },
          { name: "Hummus", size: "8 oz", price: 6.99 },
          { name: "Baba ganoush", size: "8 oz", price: 6.99 },
          { name: "Çiğ köfte", size: "8 oz", price: 7.99 },
          { name: "Mediterranean salad", size: "250 g", price: 7.99 },
        ],
      },
      {
        title: "By the pound",
        items: [
          { name: "Beef döner", size: "1 lb", price: 23.99 },
          { name: "Chicken döner", size: "1 lb", price: 17.99 },
          { name: "Beef tantuni", size: "1 lb", price: 21.99 },
          { name: "Falafel", size: "4 pieces", price: 5.99, tags: ["VG", "GF"] },
        ],
      },
    ],
  },
  {
    id: "the-case",
    numeral: "VI",
    title: "The Case",
    shortLabel: "The Case",
    note: "Chef Elif's baklava and pastries, made fresh for the case.",
    surface: "cream",
    kind: "anticipation",
    items: [],
  },
  {
    id: "espresso-counter",
    numeral: "VII",
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
