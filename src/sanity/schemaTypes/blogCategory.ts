import { defineField, defineType } from "sanity";

export const blogCategory = defineType({
  name: "blogCategory",
  title: "Blog category",
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
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 40 },
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "title" } },
});
