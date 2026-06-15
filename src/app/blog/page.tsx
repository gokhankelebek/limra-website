import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Medallion from "@/components/Medallion";
import Reveal from "@/components/Reveal";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { urlForImage } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import type { PostListItem } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: {
    absolute: "Journal | Limra Mediterranean — Holly Springs, NC",
  },
  description:
    "Stories from the Limra table — seasonal Mediterranean cooking, the people, and the place in Holly Springs, North Carolina.",
  alternates: { canonical: "/blog" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogIndex() {
  const { data: posts } = await sanityFetch<PostListItem[]>(
    POSTS_QUERY,
    {},
    [],
    "post"
  );

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-cream">
        {/* Masthead */}
        <div className="px-6 pb-16 pt-36 text-center text-olive">
          <Reveal delay="delay-1" className="flex justify-center">
            <Medallion className="h-14 w-14" />
          </Reveal>
          <Reveal delay="delay-2">
            <p className="mt-8 font-roman text-[0.7rem] uppercase tracking-[0.42em] text-terracotta">
              From the table
            </p>
          </Reveal>
          <Reveal delay="delay-3">
            <h1 className="mt-5 font-display text-6xl font-medium lg:text-7xl">
              Journal
            </h1>
          </Reveal>
        </div>

        <section className="mx-auto max-w-5xl px-6 pb-28">
          {posts.length === 0 ? (
            <Reveal className="py-16 text-center">
              <p className="font-body text-lg font-light italic text-ink/60">
                The first stories are being written. Check back soon.
              </p>
            </Reveal>
          ) : (
            <div className="grid gap-x-10 gap-y-16 sm:grid-cols-2">
              {posts.map((post, i) => (
                <Reveal
                  key={post.slug}
                  delay={
                    (["delay-1", "delay-2", "delay-3", "delay-4"] as const)[
                      i % 4
                    ]
                  }
                >
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="overflow-hidden border border-olive/15">
                      {post.mainImage ? (
                        <Image
                          src={urlForImage(post.mainImage)
                            .width(900)
                            .height(600)
                            .fit("crop")
                            .url()}
                          alt={post.mainImage.alt || post.title}
                          width={900}
                          height={600}
                          className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex aspect-[3/2] w-full items-center justify-center bg-cream-soft">
                          <Medallion className="h-16 w-16 text-olive/30" />
                        </div>
                      )}
                    </div>
                    <p className="mt-5 font-roman text-[0.62rem] uppercase tracking-[0.24em] text-terracotta">
                      {formatDate(post.publishedAt)}
                    </p>
                    <h2 className="mt-3 font-display text-3xl font-medium leading-snug text-ink transition-colors group-hover:text-terracotta">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-3 font-body text-base font-light leading-relaxed text-ink/65">
                        {post.excerpt}
                      </p>
                    )}
                    {post.author && (
                      <p className="mt-4 font-roman text-[0.6rem] uppercase tracking-[0.22em] text-olive/55">
                        {post.author}
                      </p>
                    )}
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
