import { defineField, defineType } from "sanity";

export const menuCategory = defineType({
  name: "menuCategory",
  title: "Menu category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (anchor id)",
      type: "slug",
      options: { source: "title", maxLength: 40 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "numeral",
      title: "Roman numeral",
      type: "string",
      description: "Shown as the eyebrow, e.g. I, II, III, IV",
    }),
    defineField({
      name: "note",
      title: "Category note",
      type: "string",
      description: "One short line under the heading",
    }),
    defineField({
      name: "surface",
      title: "Surface",
      type: "string",
      options: {
        list: [
          { title: "Cream", value: "cream" },
          { title: "Olive", value: "olive" },
        ],
        layout: "radio",
      },
      initialValue: "cream",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first",
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
    select: { title: "title", subtitle: "numeral" },
  },
});
