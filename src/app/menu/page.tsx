import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Medallion from "@/components/Medallion";
import MenuRail from "@/components/MenuRail";
import Reveal from "@/components/Reveal";
import ScrollRotate from "@/components/ScrollRotate";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import {
  menu,
  menuClosing,
  menuIntro,
  type MenuCategory,
  type MenuItem,
} from "@/data/menu";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Menu | Limra Mediterranean — Platters, Wraps & Bowls",
  },
  description:
    "Mediterranean cooking in Holly Springs, NC — döner platters, wraps rolled warm, and bowls built to order. View the menu and reserve at Limra.",
  alternates: { canonical: "/menu" },
};

const DIET_MAP: Record<string, string> = {
  V: "https://schema.org/VegetarianDiet",
  VG: "https://schema.org/VeganDiet",
  GF: "https://schema.org/GlutenFreeDiet",
};

// Menu structured data generated from the live menu model — updates
// automatically when the sample data is swapped for the real menu.
function buildMenuSchema(categories: MenuCategory[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "Limra Menu",
    description:
      "Platters from the spit, wraps rolled warm, bowls for the middle of the day.",
    hasMenuSection: categories.map((category) => ({
      "@type": "MenuSection",
      name: category.title,
      description: category.note,
      hasMenuItem: category.items.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        description: item.description,
        image: `${SITE_URL}${item.image}`,
        url: `${SITE_URL}/menu/${item.slug}`,
        offers: {
          "@type": "Offer",
          price: (item.price ?? 0).toFixed(2),
          priceCurrency: "USD",
        },
        ...(item.tags?.some((t) => DIET_MAP[t])
          ? {
              suitableForDiet: item.tags
                .filter((t) => DIET_MAP[t])
                .map((t) => DIET_MAP[t]),
            }
          : {}),
      })),
    })),
  };
}

const STAGGER = ["delay-1", "delay-2", "delay-3", "delay-4"] as const;

function DishTags({ item, onOlive }: { item: MenuItem; onOlive: boolean }) {
  const parts = [...(item.tags ?? []), ...(item.note ? [item.note] : [])];
  if (!parts.length) return null;
  return (
    <p className="mt-3 flex flex-wrap gap-1.5">
      {parts.map((part) => (
        <span
          key={part}
          className={`rounded-full border px-2.5 py-0.5 font-roman text-[0.55rem] uppercase tracking-[0.18em] ${
            onOlive
              ? "border-cream/25 text-cream/60"
              : "border-olive/25 text-olive/60"
          }`}
        >
          {part}
        </span>
      ))}
    </p>
  );
}

/**
 * Photo-forward dish card — every dish set identically, appetite first.
 */
function Dish({
  item,
  onOlive,
  delay,
}: {
  item: MenuItem;
  onOlive: boolean;
  delay: (typeof STAGGER)[number];
}) {
  return (
    <Reveal animation="anim-fade" delay={delay}>
      <Link href={`/menu/${item.slug}`} className="group block">
        <div
          className={`overflow-hidden border p-1.5 ${
            onOlive ? "border-cream/15" : "border-olive/15"
          }`}
        >
          <div className="overflow-hidden">
            <Image
              src={item.image}
              alt={item.imageAlt}
              width={880}
              height={660}
              sizes="(max-width: 640px) 90vw, 400px"
              className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>
        </div>
        <div className="mt-4 flex items-start justify-between gap-3">
          <h3
            className={`font-display text-2xl leading-tight ${
              onOlive ? "text-cream" : "text-ink"
            } transition-colors ${
              onOlive
                ? "group-hover:text-terracotta-soft"
                : "group-hover:text-terracotta"
            }`}
          >
            {item.name}
          </h3>
          <span className="mt-0.5 shrink-0 rounded-full bg-terracotta px-3 py-1 font-roman text-[0.68rem] tracking-[0.12em] text-cream">
            {item.price}
          </span>
        </div>
        <p
          className={`mt-2 font-body text-[0.95rem] font-light leading-relaxed ${
            onOlive ? "text-cream/65" : "text-ink/65"
          }`}
        >
          {item.description}
        </p>
        <DishTags item={item} onOlive={onOlive} />
      </Link>
    </Reveal>
  );
}

function CategorySection({
  category,
  index,
}: {
  category: MenuCategory;
  index: number;
}) {
  const onOlive = category.surface === "olive";

  return (
    <section
      id={category.id}
      className={`relative scroll-mt-24 overflow-hidden py-16 sm:scroll-mt-16 lg:py-24 ${
        onOlive ? "bg-olive-deep text-cream" : "bg-cream text-ink"
      }`}
    >
      {onOlive && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.05]"
        >
          <div
            className={`wm-70 absolute ${
              index % 4 === 1 ? "-right-32 -top-32" : "-bottom-32 -left-32"
            }`}
          >
            <ScrollRotate
              speed={index % 4 === 1 ? 0.015 : -0.015}
              className="h-full w-full"
            >
              <Medallion className="h-full w-full text-cream" />
            </ScrollRotate>
          </div>
        </div>
      )}

      <div className="relative mx-auto max-w-4xl px-6">
        <Reveal className="text-center">
          <p
            className={`font-roman text-[0.7rem] uppercase tracking-[0.4em] ${
              onOlive ? "text-terracotta-soft" : "text-terracotta"
            }`}
          >
            {category.numeral}
          </p>
          <h2 className="mt-5 font-display text-5xl font-medium">
            {category.title}
          </h2>
          <div className="mt-7 flex items-center justify-center gap-4 opacity-30">
            <span className="h-px w-16 bg-current" />
            <Medallion className="h-5 w-5" />
            <span className="h-px w-16 bg-current" />
          </div>
          <p
            className={`mt-6 font-body text-base font-light italic ${
              onOlive ? "text-cream/60" : "text-ink/60"
            }`}
          >
            {category.note}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {category.items.map((item, i) => (
            <Dish
              key={item.slug}
              item={item}
              onOlive={onOlive}
              delay={STAGGER[i % STAGGER.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function MenuPage() {
  const categories = menu;

  return (
    <>
      <JsonLd data={buildMenuSchema(categories)} />
      <SiteHeader />
      <main id="main" className="flex-1 bg-cream">
        {/* Masthead */}
        <div className="px-6 pb-20 pt-36 text-center text-olive">
          <Reveal delay="delay-1" className="flex justify-center">
            <Medallion className="h-14 w-14" />
          </Reveal>
          <Reveal delay="delay-2">
            <p className="mt-8 font-roman text-[0.7rem] uppercase tracking-[0.42em] text-terracotta">
              {menuIntro.eyebrow}
            </p>
          </Reveal>
          <Reveal delay="delay-3">
            <h1 className="mt-5 font-display text-6xl font-medium lg:text-7xl">
              {menuIntro.title}
            </h1>
          </Reveal>
          <Reveal delay="delay-4">
            <p className="mx-auto mt-6 max-w-md font-body text-lg font-light italic leading-relaxed text-ink/70">
              {menuIntro.line}
            </p>
          </Reveal>
        </div>

        <MenuRail items={categories.map((c) => ({ id: c.id, label: c.title }))} />

        {categories.map((category, i) => (
          <CategorySection key={category.id} category={category} index={i} />
        ))}

        {/* Closing CTA */}
        <section className="bg-cream px-6 py-20 text-center text-olive">
          <Reveal className="flex flex-col items-center">
            <Medallion variant="seal" className="h-20 w-20" />
            <p className="mt-8 max-w-md font-body text-xl font-light italic leading-relaxed text-ink/75">
              {menuClosing.line}
            </p>
            <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
              <Link
                href={menuClosing.primary.href}
                className="rounded-full bg-terracotta px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-cream transition-colors hover:bg-terracotta-deep"
              >
                {menuClosing.primary.label}
              </Link>
              <Link
                href={menuClosing.secondary.href}
                className="rounded-full border border-olive/40 px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-olive transition-colors hover:border-olive hover:bg-olive hover:text-cream"
              >
                {menuClosing.secondary.label}
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
