// The real Limra menu — items and photography provided by the owners.
// Prices and protein ladders match Limra's Toast online ordering page, which
// the owners named the source of truth (Oct 2026). Base price includes that
// item's +$0 protein.

import { ORDER_URL } from "./contact";
import { OPENING_LABEL } from "./opening";

export type DietaryTag = "V" | "VG" | "GF" | "N";

/** A build-to-order protein and what it adds to the item's base price. */
export type ProteinChoice = {
  name: string;
  /** dollars over the base price; 0 is the protein the base price buys,
   *  negative takes money off */
  upcharge: number;
  tags?: DietaryTag[];
};

// Plates, bowls, wraps and sandwiches share one ladder (Toast, Oct 2026).
const PLATE_PROTEINS: ProteinChoice[] = [
  { name: "Falafel", upcharge: 0, tags: ["VG", "GF"] },
  { name: "Chicken döner", upcharge: 2 },
  { name: "Tantuni", upcharge: 3 },
  { name: "Beef döner", upcharge: 4 },
];

/** The four house sauces offered on build-to-order dishes. */
export const SIGNATURE_SAUCES = [
  "Limra sauce",
  "Tzatziki",
  "Harissa mayo",
  "Garlic aioli",
] as const;

/** Add-on offered on the wraps and sandwiches. */
export const ADD_FRIES_PRICE = 2.99;

/** A plain priced line: fries, breads, proteins by the pound, desserts, drinks. */
export type CounterItem = {
  name: string;
  /** portion as the boards state it, e.g. "8 oz", "1 lb", "4 pieces" */
  size?: string;
  /** one short line under the name (desserts) */
  description?: string;
  price: number;
  /** true when sizes vary and `price` is the smallest ("from 4.49") */
  from?: boolean;
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
  /** priced lists for the "counter" kind: fries, breads, desserts, drinks */
  counterGroups?: CounterGroup[];
  /** small italic line under a counter course (e.g. daily availability) */
  footnote?: string;
};

export const menuIntro = {
  eyebrow: "The Table",
  title: "Menu",
  line: "Platters from the spit, wraps rolled warm, bowls for the middle of the day.",
};

export const menuClosing = {
  linePre: `The first tables are set ${OPENING_LABEL}.`,
  lineOpen: "The table is set. Come as you are.",
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
        price: 15.99,
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
          "Beef döner over butter-toasted bread with plain yogurt, finished with our warm tomato sauce.",
        price: 19.99,
        image: "/menu/iskender-platter.jpg?v=04d6950a",
        allergens: ["Wheat","Milk"],
        imageAlt:
          "İskender Platter, sliced beef döner over butter-toasted bread with plain yogurt and warm tomato sauce",
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
        proteins: PLATE_PROTEINS,
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
        proteins: PLATE_PROTEINS,
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
        proteins: PLATE_PROTEINS,
        image: "/menu/angora-sandwich.jpg?v=2794591f",
        sauces: SIGNATURE_SAUCES,
        allergens: ["Wheat (baguette)"],
        addFries: true,
        imageAlt:
          "Angora Sandwich, eight-inch baguette with lettuce, tomato, pickles, and sumac onions",
      },
    ],
  },
  {
    id: "sides",
    numeral: "V",
    title: "Sides & Extras",
    shortLabel: "Sides",
    note: "The open table by weight, fries, soup, bread, and the spit by the half pound.",
    surface: "cream",
    kind: "counter",
    items: [],
    counterGroups: [
      // Toast lists this as "Open Buffet: Bowl, $13.99/lb". On the site it is
      // the open table; never lead with the word "buffet".
      {
        title: "The open table",
        items: [
          {
            name: "Open table bowl",
            size: "per lb",
            description: "Fill a bowl from the hot and cold dishes, priced by weight.",
            price: 13.99,
          },
        ],
      },
      {
        title: "Fries",
        items: [
          { name: "Cajun seasoning", size: "8 oz", price: 4.99 },
          { name: "Classic, no salt", size: "8 oz", price: 4.99 },
        ],
      },
      {
        title: "Soup, bread & sauce",
        items: [
          { name: "Soup", price: 5 },
          { name: "Grilled pita", size: "1 piece", price: 0.99 },
          { name: "Warm lavash", size: "1 piece", price: 0.99 },
          {
            name: "Extra sauce",
            description: "Limra sauce, tzatziki, harissa mayo, or garlic aioli.",
            price: 0.99,
          },
        ],
      },
      {
        title: "By the pound",
        items: [
          { name: "Beef döner", size: "½ lb", price: 13.99 },
          { name: "Chicken döner", size: "½ lb", price: 10.99 },
          { name: "Beef tantuni", size: "½ lb", price: 12.99 },
        ],
      },
    ],
  },
  // Desserts and drinks as listed on Limra's Toast ordering page (Oct 2026).
  {
    id: "the-case",
    numeral: "VI",
    title: "The Case",
    shortLabel: "The Case",
    note: "Chef Elif's baklava and pastries, made fresh for the case.",
    surface: "cream",
    kind: "counter",
    items: [],
    footnote:
      "The case changes through the day. Ask at the counter what is out today.",
    counterGroups: [
      {
        title: "Mediterranean",
        items: [
          { name: "Pistachio baklava", description: "Flaky phyllo, pistachios, syrup.", price: 5.95, tags: ["N"] },
          { name: "Walnut baklava", description: "Flaky phyllo, walnuts, syrup.", price: 4.99, tags: ["N"] },
          { name: "Chocolate pistachio baklava", description: "Phyllo with pistachios and chocolate.", price: 3.95, tags: ["N"] },
          { name: "Pistachio kadayıf", description: "Crisp shredded pastry, pistachios, syrup.", price: 5.5, tags: ["N"] },
          { name: "Şekerpare", description: "Soft semolina cookies soaked in syrup.", price: 3.99 },
          { name: "Acıbadem", description: "Almond cookie, crisp outside, chewy within.", price: 3.99, tags: ["N"] },
          { name: "Şambali", price: 5.49 },
          { name: "Apple tart", price: 5.99 },
        ],
      },
      {
        title: "Classic",
        items: [
          { name: "Lemon cheesecake", price: 7.5 },
          { name: "Berry cheesecake", description: "Topped with mixed berry sauce.", price: 7.5 },
          { name: "Lotus cheesecake", description: "Biscoff cookie butter and crumble.", price: 7.5 },
          { name: "San Sebastián cheesecake", description: "Basque-style, burnt top, creamy center.", price: 7.99 },
          { name: "Tiramisu", price: 6.99 },
          { name: "Profiteroles", price: 7.99 },
          { name: "Karpatka", price: 7.49 },
          { name: "Dubai tart", description: "Pistachio cream, crisp kataifi, chocolate.", price: 6.49, tags: ["N"] },
          { name: "Dubai cup", price: 7.99 },
          { name: "Banana pudding", description: "Vanilla wafers and pastry cream.", price: 6.49 },
          { name: "Magnolia", description: "Strawberries, vanilla wafers, pastry cream.", price: 5.99 },
          { name: "Pavlova", description: "Crisp meringue, pastry cream, fresh fruit.", price: 5.99 },
          { name: "New York cookie", description: "Thick, soft-baked, gooey center.", price: 6.5 },
          { name: "Slatka pita", price: 5.99 },
          { name: "Chocolate espresso cake", price: 4.99 },
          { name: "Supangle", description: "Rich Turkish chocolate pudding.", price: 5.49 },
          { name: "Rice pudding", description: "Baked, with milk and cinnamon.", price: 4.99 },
        ],
      },
    ],
  },
  {
    id: "espresso-counter",
    numeral: "VII",
    title: "Limra Beverage Counter",
    shortLabel: "Beverage",
    note: "Pulled slow, worth lingering.",
    surface: "olive",
    kind: "counter",
    items: [],
    counterGroups: [
      {
        title: "Espresso",
        items: [
          { name: "Americano", price: 3.49, from: true },
          { name: "Cappuccino", price: 4.49, from: true },
          { name: "Latte", price: 4.99, from: true },
          { name: "Mocha", price: 5.99, from: true },
          { name: "Hot chocolate", price: 4.99, from: true },
        ],
      },
      {
        title: "Iced espresso",
        items: [
          { name: "Iced americano", price: 3.99, from: true },
          { name: "Iced latte", price: 4.99, from: true },
          { name: "Iced caramel latte", price: 5.49, from: true },
          { name: "Iced vanilla latte", price: 5.49, from: true },
          { name: "Iced mocha", price: 5.49, from: true },
        ],
      },
      {
        title: "Limra signatures",
        items: [
          { name: "Tea, free refills", size: "8 oz", price: 0.99 },
          { name: "Ayran", description: "Yogurt drink.", price: 2.99 },
          { name: "Şalgam", description: "Spiced turnip drink.", price: 2.99 },
          { name: "Gazoz", description: "Traditional sparkling soda.", price: 3.5 },
          { name: "Hibiscus sherbet", price: 3.5 },
        ],
      },
      {
        title: "Soft drinks & water",
        items: [
          { name: "Coca-Cola, Diet Coke, Pepsi, Fanta, Mountain Dew", price: 2.5 },
          { name: "Mexican bottled sodas", price: 3.5 },
          { name: "Orange juice", price: 3.5 },
          { name: "Orange juice, bottled", price: 2 },
          { name: "San Pellegrino", price: 3.5 },
          { name: "Sparkling water", price: 2.5 },
          { name: "Turkish sparkling water", price: 2 },
          { name: "Bottled water", price: 2 },
        ],
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
