import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import Medallion from "@/components/Medallion";
import Reveal from "@/components/Reveal";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { allDishes, findDish } from "@/data/menu";
import { BLUR } from "@/data/menu-blur";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return allDishes.map((dish) => ({ slug: dish.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dish = findDish(slug);
  if (!dish) return { title: "Menu" };
  return {
    title: { absolute: `${dish.name} | Limra Mediterranean — Holly Springs, NC` },
    description: dish.description,
    alternates: { canonical: `/menu/${dish.slug}` },
    openGraph: {
      title: dish.name,
      description: dish.description,
      type: "article",
      images: [`${SITE_URL}${dish.image}`],
    },
  };
}

const TAG_LABELS: Record<string, string> = {
  V: "Vegetarian",
  VG: "Vegan",
  GF: "Gluten-free",
  N: "Contains nuts",
};

export default async function DishPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dish = findDish(slug);
  if (!dish) notFound();

  const siblings = dish.category.items
    .filter((i) => i.slug !== dish.slug)
    .slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.description,
    image: `${SITE_URL}${dish.image}`,
    url: `${SITE_URL}/menu/${dish.slug}`,
    offers: {
      "@type": "Offer",
      price: dish.price.toFixed(2),
      priceCurrency: "USD",
    },
  };

  const tagParts = [
    ...(dish.tags ?? []).map((t) => TAG_LABELS[t] ?? t),
    ...(dish.note ? [dish.note] : []),
  ];

  return (
    <>
      <JsonLd data={schema} />
      <SiteHeader />
      <main id="main" className="flex-1 bg-cream">
        <article className="mx-auto max-w-3xl px-6 pb-24 pt-36">
          {/* Masthead */}
          <div className="text-center text-olive">
            <Reveal delay="delay-1">
              <p className="font-roman text-[0.7rem] uppercase tracking-[0.42em] text-terracotta">
                {dish.category.title}
              </p>
            </Reveal>
            <Reveal delay="delay-2">
              <h1 className="mt-5 font-display text-5xl font-medium leading-[1.05] text-ink lg:text-6xl">
                {dish.name}
              </h1>
            </Reveal>
            <Reveal delay="delay-3">
              <p className="mx-auto mt-5 max-w-xl font-body text-lg font-light italic leading-relaxed text-ink/70">
                {dish.description}
              </p>
            </Reveal>
            <Reveal delay="delay-4">
              <p className="mt-5 font-roman text-lg tracking-[0.12em] text-olive/80">
                {dish.price}
              </p>
              {tagParts.length > 0 && (
                <p className="mt-2 font-roman text-[0.62rem] uppercase tracking-[0.3em] text-olive/50">
                  {tagParts.join(" · ")}
                </p>
              )}
            </Reveal>
          </div>

          {/* Photo — the vault: a soft wide arch, sealed by the house */}
          <Reveal delay="delay-4" className="relative mt-12">
            <div className="rounded-t-[10rem] border border-olive/15 bg-cream p-2">
              <div className="overflow-hidden rounded-t-[9.5rem]">
                <Image
                  src={dish.image}
                  placeholder="blur"
                  blurDataURL={BLUR[dish.slug]}
                  alt={dish.imageAlt}
                  width={1320}
                  height={990}
                  priority
                  sizes="(max-width: 768px) 100vw, 720px"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
            <span className="absolute -bottom-5 right-10 flex h-12 w-12 items-center justify-center rounded-full border border-olive/20 bg-cream">
              <Medallion className="h-8 w-8 text-olive" />
            </span>
          </Reveal>

          {/* Actions */}
          <Reveal className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/updates"
              className="rounded-full bg-terracotta px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-cream transition-colors hover:bg-terracotta-deep"
            >
              Get opening updates
            </Link>
            <Link
              href="/menu"
              className="rounded-full border border-olive/40 px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-olive transition-colors hover:border-olive hover:bg-olive hover:text-cream"
            >
              Full menu
            </Link>
          </Reveal>

          {/* More from this category */}
          {siblings.length > 0 && (
            <section className="mt-20 border-t border-olive/15 pt-12">
              <Reveal className="text-center">
                <p className="font-roman text-[0.65rem] uppercase tracking-[0.4em] text-terracotta">
                  More from {dish.category.title}
                </p>
              </Reveal>
              <div className="mt-9 grid gap-8 sm:grid-cols-3">
                {siblings.map((sib, i) => (
                  <Reveal
                    key={sib.slug}
                    animation="anim-fade"
                    delay={(["delay-1", "delay-2", "delay-3"] as const)[i]}
                  >
                    <Link href={`/menu/${sib.slug}`} className="group block">
                      <div className="rounded-t-full border border-olive/15 bg-cream p-1">
                        <div className="overflow-hidden rounded-t-full">
                          <Image
                            src={sib.image}
                            placeholder="blur"
                            blurDataURL={BLUR[sib.slug]}
                            alt={sib.imageAlt}
                            width={440}
                            height={550}
                            sizes="(max-width: 640px) 90vw, 220px"
                            className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          />
                        </div>
                      </div>
                      <div className="mt-4 flex items-baseline justify-between gap-3">
                        <h3 className="font-display text-xl text-ink transition-colors group-hover:text-terracotta">
                          {sib.name}
                        </h3>
                        <p className="shrink-0 font-roman text-sm tracking-[0.12em] text-olive/70">
                          {sib.price}
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
