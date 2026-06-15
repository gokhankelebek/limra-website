import type { PortableTextBlock } from "@portabletext/react";
import type { Image } from "sanity";

export type PostListItem = {
  slug: string;
  title: string;
  excerpt?: string;
  publishedAt: string;
  mainImage?: Image & { alt?: string };
  author?: string;
  categories?: string[];
};

export type PostDetail = {
  title: string;
  excerpt?: string;
  publishedAt: string;
  mainImage?: Image & { alt?: string };
  body?: PortableTextBlock[];
  seo?: { metaTitle?: string; metaDescription?: string };
  author?: { name: string; title?: string; image?: Image };
  categories?: string[];
};
