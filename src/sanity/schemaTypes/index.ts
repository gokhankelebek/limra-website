import type { SchemaTypeDefinition } from "sanity";
import { author } from "./author";
import { blogCategory } from "./blogCategory";
import { dish } from "./dish";
import { menuCategory } from "./menuCategory";
import { post } from "./post";
import { siteSettings } from "./siteSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [menuCategory, dish, post, author, blogCategory, siteSettings],
};
