import { defineField, defineType } from "sanity";

export const dish = defineType({
  name: "dish",
  title: "Dish",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "menuCategory" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      description: "Ingredient-led, short (under ~14 words)",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      description: "Bare number, no currency symbol",
    }),
    defineField({
      name: "tags",
      title: "Dietary tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Vegetarian (V)", value: "V" },
          { title: "Vegan (VG)", value: "VG" },
          { title: "Gluten-free (GF)", value: "GF" },
          { title: "Contains nuts (N)", value: "N" },
        ],
      },
    }),
    defineField({
      name: "note",
      title: "Note",
      type: "string",
      description: 'Free qualifier, e.g. "GF on request"',
    }),
    defineField({
      name: "featured",
      title: "Signature dish",
      type: "boolean",
      description: "Highlight as the category's featured plate",
      initialValue: false,
    }),
    defineField({
      name: "soldOut",
      title: "Sold out",
      type: "boolean",
      description: "Dim and mark as sold out for the day",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first within the category",
    }),
  ],
  orderings: [
    {
      title: "Menu order",
      name: "order",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "category.title" },
  },
});
