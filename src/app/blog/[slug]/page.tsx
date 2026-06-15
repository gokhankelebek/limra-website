import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import Medallion from "@/components/Medallion";
import PortableBody from "@/components/PortableBody";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { SITE_URL } from "@/lib/site";
import { client, isSanityConfigured } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { POST_QUERY, POST_SLUGS_QUERY } from "@/sanity/lib/queries";
import type { PostDetail } from "@/sanity/lib/types";

export const revalidate = 60;

async function getPost(slug: string): Promise<PostDetail | null> {
  if (!isSanityConfigured) return null;
  try {
    return await client.fetch<PostDetail | null>(
      POST_QUERY,
      { slug },
      { next: { revalidate: 60, tags: ["post"] } }
    );
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  if (!isSanityConfigured) return [];
  try {
    const slugs = await client.fetch<string[]>(POST_SLUGS_QUERY);
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Journal" };
  const title = post.seo?.metaTitle || post.title;
  const description = post.seo?.metaDescription || post.excerpt;
  return {
    title: { absolute: `${title} — Limra Journal` },
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      ...(post.mainImage
        ? { images: [urlForImage(post.mainImage).width(1200).height(630).fit("crop").url()] }
        : {}),
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    ...(post.author ? { author: { "@type": "Person", name: post.author.name } } : {}),
    ...(post.mainImage
      ? { image: urlForImage(post.mainImage).width(1200).height(630).fit("crop").url() }
      : {}),
    publisher: {
      "@type": "Organization",
      name: "Limra Mediterranean Restaurant",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <SiteHeader />
      <main className="flex-1 bg-cream">
        <article className="mx-auto max-w-2xl px-6 pb-24 pt-36">
          <div className="text-center text-olive">
            {post.categories?.[0] && (
              <p className="font-roman text-[0.7rem] uppercase tracking-[0.4em] text-terracotta">
                {post.categories[0]}
              </p>
            )}
            <h1 className="mt-5 font-display text-5xl font-medium leading-[1.05] text-ink lg:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 font-roman text-[0.66rem] uppercase tracking-[0.22em] text-olive/55">
              {post.author?.name ? `${post.author.name} · ` : ""}
              {formatDate(post.publishedAt)}
            </p>
          </div>

          {post.mainImage && (
            <div className="mt-12 border border-olive/15 p-2">
              <Image
                src={urlForImage(post.mainImage).width(1400).height(933).fit("crop").url()}
                alt={post.mainImage.alt || post.title}
                width={1400}
                height={933}
                priority
                className="h-auto w-full"
              />
            </div>
          )}

          <div className="mt-4">
            {post.body && <PortableBody value={post.body} />}
          </div>

          <div className="mt-16 flex justify-center border-t border-olive/15 pt-10">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-3 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-olive transition-colors hover:text-terracotta"
            >
              <span className="h-px w-10 bg-current transition-all group-hover:w-14" />
              All stories
            </Link>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
