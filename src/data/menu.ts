// SAMPLE DATA — placeholder menu written in brand voice.
// Replace with Can & Elif's final menu before launch; structure stays.

export type DietaryTag = "V" | "VG" | "GF" | "N";

export type MenuItem = {
  name: string;
  description: string;
  /** bare number, no currency symbol — rendered quiet per design spec */
  price: number;
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
  line: "Meze for the middle of the table, mains from the charcoal, sweets from old recipes.",
};

export const menuClosing = {
  line: "The table is set when you are.",
  reserveLabel: "Reserve a table",
  orderLabel: "Order pickup",
};

export const menu: MenuCategory[] = [
  {
    id: "cold-and-bright",
    numeral: "I",
    title: "Cold & Bright",
    note: "Small plates, meant for the middle of the table.",
    surface: "cream",
    items: [
      {
        name: "Muhammara",
        description:
          "Roasted red pepper, walnut, pomegranate molasses, grilled flatbread.",
        price: 12,
        tags: ["VG", "N"],
        featured: true,
      },
      {
        name: "Smoked Eggplant",
        description: "Strained yogurt, brown butter, Aleppo pepper.",
        price: 13,
        tags: ["V", "GF"],
      },
      {
        name: "Whipped Feta",
        description: "Honey, black sesame, warm pide.",
        price: 11,
        tags: ["V"],
      },
      {
        name: "Vine Leaves",
        description: "Hand-rolled, sour cherry, pine nut, lemon.",
        price: 10,
        tags: ["VG", "GF", "N"],
      },
    ],
  },
  {
    id: "from-the-fire",
    numeral: "II",
    title: "From the Fire",
    note: "Charcoal and oak, cooked to order.",
    surface: "olive",
    items: [
      {
        name: "Adana Skewer",
        description:
          "Hand-minced lamb, sumac onion, charred pepper, flatbread.",
        price: 26,
        note: "GF on request",
        featured: true,
      },
      {
        name: "Half Chicken",
        description: "Lemon, oregano, garlic, charred scallion.",
        price: 22,
        tags: ["GF"],
      },
      {
        name: "Lahmacun",
        description: "Thin-crust flatbread, spiced lamb, parsley, lemon.",
        price: 16,
      },
      {
        name: "Grilled Halloumi",
        description: "Stone fruit, hot honey, mint.",
        price: 14,
        tags: ["V", "GF"],
      },
    ],
  },
  {
    id: "larger-plates",
    numeral: "III",
    title: "Larger Plates",
    note: "Built around the season, served with warm bread.",
    surface: "cream",
    items: [
      {
        name: "Whole Levrek",
        description: "Sea bass, fennel, charred lemon, olive oil.",
        price: 34,
        tags: ["GF"],
        featured: true,
      },
      {
        name: "Hünkar Beğendi",
        description: "Braised lamb shoulder, smoked eggplant purée.",
        price: 29,
        tags: ["GF"],
      },
      {
        name: "Mantı",
        description: "Handmade dumplings, garlic yogurt, Aleppo butter.",
        price: 24,
        note: "V option",
      },
      {
        name: "Roast Cauliflower",
        description: "Tahini, pomegranate, green herbs, crisped chickpeas.",
        price: 19,
        tags: ["VG", "GF"],
      },
    ],
  },
  {
    id: "to-finish",
    numeral: "IV",
    title: "To Finish",
    note: "Old recipes, lighter hands.",
    surface: "olive",
    items: [
      {
        name: "Künefe",
        description: "Shredded pastry, sweet cheese, pistachio, served warm.",
        price: 14,
        tags: ["V", "N"],
        featured: true,
      },
      {
        name: "Pistachio Baklava",
        description: "Forty layers, clotted cream.",
        price: 12,
        tags: ["V", "N"],
      },
      {
        name: "Olive Oil Cake",
        description: "Citrus, labneh cream, candied peel.",
        price: 11,
        tags: ["V"],
      },
      {
        name: "Baked Rice Pudding",
        description: "Mastic, cinnamon, caramelized top.",
        price: 9,
        tags: ["V", "GF"],
      },
    ],
  },
];
