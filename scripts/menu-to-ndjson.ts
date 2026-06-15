// Generates an NDJSON import file from the local sample menu, so the same
// content the site shipped with becomes editable documents in Sanity.
// Run: npx tsx scripts/menu-to-ndjson.ts  →  writes seed/menu.ndjson
import { mkdirSync, writeFileSync } from "node:fs";
import { menu } from "../src/data/menu";

const docs: Record<string, unknown>[] = [];

menu.forEach((cat, ci) => {
  const catId = `menuCategory-${cat.id}`;
  docs.push({
    _id: catId,
    _type: "menuCategory",
    title: cat.title,
    slug: { _type: "slug", current: cat.id },
    numeral: cat.numeral,
    note: cat.note,
    surface: cat.surface,
    order: ci,
  });
  cat.items.forEach((item, ii) => {
    docs.push({
      _id: `dish-${cat.id}-${ii}`,
      _type: "dish",
      name: item.name,
      category: { _type: "reference", _ref: catId },
      description: item.description,
      price: item.price,
      tags: item.tags ?? [],
      ...(item.note ? { note: item.note } : {}),
      featured: !!item.featured,
      soldOut: false,
      order: ii,
    });
  });
});

mkdirSync("seed", { recursive: true });
const ndjson = docs.map((d) => JSON.stringify(d)).join("\n") + "\n";
writeFileSync("seed/menu.ndjson", ndjson);
console.log(`Wrote seed/menu.ndjson — ${docs.length} documents`);
