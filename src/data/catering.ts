// Limra catering — menu from the owners' draft (Limra_Catering_Menu_Draft_v3.pdf)
// plus the service facts they confirmed 2026-07-19. Prices and yields are theirs.
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
  /** lead-time requirement, shown as a small emphasized line */
  lead?: string;
  items: CateringItem[];
};

export const CATERING_MENU: CateringSection[] = [
  {
    id: "by-the-pound",
    title: "By the Pound",
    note: "Carved from the vertical spit, priced by the pound.",
    lead: "Minimum 2 hours' notice",
    items: [
      { name: "Beef gyro / döner", price: "$22.99", yield: "per lb" },
      { name: "Chicken gyro / döner", price: "$18.99", yield: "per lb" },
      { name: "Tantuni, slow-cooked beef", price: "$21.99", yield: "per lb" },
    ],
  },
  {
    id: "catering-trays",
    title: "Catering Trays",
    note: "Full trays from the kitchen, sized for the table.",
    lead: "Minimum 24 hours' notice",
    items: [
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
      { name: "Pasta salad with mortadella", price: "TBD" },
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

// ── Service facts (owner-confirmed 2026-07-19) ──────────────────────────

/** Shown as the top-line promise on the catering page. */
export const CATERING_FACTS = [
  "100% Halal Mediterranean",
  "10 – 200+ guests",
  "Pickup · Delivery · Full Buffet Setup",
] as const;

/** The Triangle-area towns catering delivers to. */
export const CATERING_AREA = [
  "Apex",
  "Holly Springs",
  "Cary",
  "Fuquay-Varina",
  "Raleigh",
  "Durham",
] as const;

/** Real buffet-setup photos from the owners' events, shown on the catering
 *  page in place of the old placeholder band. Hashes bust the image cache. */
export const BUFFET_PHOTOS = [
  {
    src: "/catering/buffet-1.jpg?v=18a2faf3",
    alt: "Limra catering buffet set in a rustic barn — chafing dishes and plated appetizers down a long white-linen table",
  },
  {
    src: "/catering/buffet-2.jpg?v=377ca21b",
    alt: "A Limra catering spread up close — bulgur rice with lemon, broccoli salad, watermelon, and creamy dip in glass bowls",
  },
  {
    src: "/catering/buffet-3.jpg?v=9d999f09",
    alt: "A Limra outdoor evening catering buffet under the trees, with guests gathering at golden hour",
  },
] as const;

/** The three ways catering reaches the guest. Shared by the home teaser
 *  and the catering page so they never drift apart. */
export const CATERING_SERVICE_MODES = [
  { label: "Pickup", note: "Ready at the counter." },
  { label: "Delivery", note: "Brought to your door." },
  { label: "Full Buffet Setup", note: "Delivered and set, 60+ guests." },
] as const;

/** The two service tiers, kept deliberately clear for the guest. */
export const CATERING_TIERS = [
  {
    range: "10 – 59 guests",
    title: "Order & pick up",
    body: "Catering trays and proteins by the pound. Pickup, or standard delivery where available.",
  },
  {
    range: "60 – 200+ guests",
    title: "Delivery & full buffet setup",
    body: "We deliver and set the buffet for you. Minimum 48 hours' notice, planned around availability. Setup pricing depends on the size, the location, and the service level you need.",
  },
] as const;

/** Custom / off-menu catering — its own quiet note, since it changes the
 *  lead time and what we can promise. */
export const CATERING_CUSTOM_NOTE = {
  title: "Custom & off-menu",
  body: "Planning something that isn't on the menu? Reach us at least 48 hours ahead. These are made to order with fresh ingredients sourced for your event, so we can't guarantee last-minute requests, but we'd love to build the menu with you.",
} as const;

/** Event types offered in the quote form. */
export const EVENT_TYPES = [
  "Corporate event",
  "Office catering",
  "Birthday",
  "Wedding",
  "Private event",
  "Special event",
  "Other",
] as const;

/** Service types offered in the quote form. */
export const SERVICE_TYPES = [
  "Pickup",
  "Delivery only",
  "Delivery + buffet setup (60+ guests)",
] as const;
