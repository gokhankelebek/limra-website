import type { StructureResolver } from "sanity/structure";

// Custom desk: a single editable Site settings doc, then the content lists.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Limra")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.divider(),
      S.documentTypeListItem("menuCategory").title("Menu categories"),
      S.documentTypeListItem("dish").title("Dishes"),
      S.divider(),
      S.documentTypeListItem("post").title("Blog posts"),
      S.documentTypeListItem("author").title("Authors"),
      S.documentTypeListItem("blogCategory").title("Blog categories"),
    ]);
