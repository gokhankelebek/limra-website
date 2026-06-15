import { groq } from "next-sanity";

// Menu: every category in order, each with its dishes (sold-out excluded
// from the rendered list happens in the page; here we keep all).
export const MENU_QUERY = groq`
*[_type == "menuCategory"] | order(order asc) {
  "id": slug.current,
  numeral,
  title,
  note,
  surface,
  "items": *[_type == "dish" && references(^._id)] | order(order asc) {
    name,
    description,
    price,
    tags,
    note,
    featured,
    soldOut
  }
}`;

export const POSTS_QUERY = groq`
*[_type == "post" && defined(slug.current) && publishedAt <= now()]
  | order(publishedAt desc) {
    "slug": slug.current,
    title,
    excerpt,
    publishedAt,
    mainImage,
    "author": author->name,
    "categories": categories[]->title
  }`;

export const POST_QUERY = groq`
*[_type == "post" && slug.current == $slug][0] {
  title,
  excerpt,
  publishedAt,
  mainImage,
  body,
  seo,
  "author": author->{name, title, image},
  "categories": categories[]->title
}`;

export const POST_SLUGS_QUERY = groq`
*[_type == "post" && defined(slug.current)].slug.current`;

export const SETTINGS_QUERY = groq`
*[_type == "siteSettings"][0]{ announcement, hours }`;
