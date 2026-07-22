// Limra catering menu — transcribed verbatim from the owners' draft
// (Limra_Catering_Menu_Draft_v3.pdf). Prices and yields are theirs.
// "TBD" items carry no price until the owners set one.

export type CateringItem = {
  name: string;
  /** how the price is expressed on the sheet, e.g. "$40", "$22.99", "TBD" */
  price: string;
  /** the serving note, e.g. "Serves 10", "per lb", "10 pcs" */
  yield?: string;
};

export type CateringSection = {
  id: string;
  title: string;
  /** one line of framing for the section head */
  note: string;
  items: CateringItem[];
};

export const CATERING_MENU: CateringSection[] = [
  {
    id: "proteins",
    title: "Proteins",
    note: "From the spit and the oven, by the pound or by the tray.",
    items: [
      { name: "Beef gyro / döner", price: "$22.99", yield: "per lb" },
      { name: "Chicken gyro / döner", price: "$18.99", yield: "per lb" },
      { name: "Tantuni, slow-cooked beef", price: "$21.99", yield: "per lb" },
      { name: "Sliced roast beef", price: "$140", yield: "Serves 12" },
      { name: "Chicken piccata", price: "$80", yield: "Serves 10" },
      { name: "Grilled salmon", price: "$130", yield: "Serves 10" },
      { name: "Baked chicken leg", price: "$60", yield: "Serves 10" },
      { name: "Falafel with pita & tahini", price: "$40", yield: "Serves 10" },
      { name: "Eggplant moussaka", price: "$70", yield: "Serves 10" },
    ],
  },
  {
    id: "rice-sides",
    title: "Rice & Sides",
    note: "The foundations of the table.",
    items: [
      { name: "Rice or bulgur", price: "$20", yield: "Serves 10" },
      { name: "Mashed potatoes", price: "$30", yield: "Serves 10" },
      { name: "Green beans in tomato sauce", price: "$25", yield: "Serves 10" },
      { name: "Grilled pita bread", price: "$10", yield: "10 pieces" },
    ],
  },
  {
    id: "dips",
    title: "Mediterranean Dips",
    note: "Each served with pita.",
    items: [
      { name: "Hummus", price: "$30", yield: "Serves 10" },
      { name: "Tzatziki", price: "$30", yield: "Serves 10" },
      { name: "Baba ghanoush", price: "$35", yield: "Serves 10" },
      { name: "Spicy feta spread", price: "$30", yield: "Serves 10" },
    ],
  },
  {
    id: "salads",
    title: "Salads",
    note: "Cool, bright, made to balance the spit.",
    items: [
      { name: "Greek salad", price: "$40", yield: "Serves 10" },
      { name: "Turkish chopped salad", price: "$50", yield: "Serves 10" },
      {
        name: "Broccoli salad, Dijon dressing",
        price: "$40",
        yield: "Serves 10",
      },
      { name: "Pasta salad with mozzarella", price: "TBD" },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    note: "To finish, from Chef Elif's counter.",
    items: [
      { name: "Pistachio baklava", price: "$50", yield: "Serves 10" },
      { name: "Tiramisu", price: "$60", yield: "Serves 10" },
    ],
  },
];

/** For the inquiry form: the section titles a guest can note interest in. */
export const CATERING_INTERESTS = CATERING_MENU.map((s) => s.title);
