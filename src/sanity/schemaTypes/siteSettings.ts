import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal label",
      type: "string",
      initialValue: "Site settings",
      readOnly: true,
    }),
    defineField({
      name: "announcement",
      title: "Announcement bar",
      type: "string",
      description: "Optional site-wide notice (leave empty to hide)",
    }),
    defineField({
      name: "hours",
      title: "Opening hours",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "days", title: "Days", type: "string" }),
            defineField({ name: "time", title: "Hours", type: "string" }),
          ],
          preview: {
            select: { title: "days", subtitle: "time" },
          },
        },
      ],
    }),
  ],
  preview: { select: { title: "title" } },
});
