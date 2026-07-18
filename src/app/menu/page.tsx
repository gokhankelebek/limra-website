import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Medallion from "@/components/Medallion";
import MenuIndex from "@/components/MenuIndex";
import MenuPlumbRail from "@/components/MenuPlumbRail";
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
import { BLUR } from "@/data/menu-blur";
import { DIRECTIONS_URL } from "@/data/contact";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Menu · Limra Mediterranean Restaurant · Holly Springs, NC",
  },
  description:
    "Mediterranean cooking in Holly Springs, NC. Döner platters, wraps rolled warm, bowls built to order. See what's on the table at Limra.",
  alternates: { canonical: "/menu" },
};

const DIET_MAP: Record<string, string> = {
  V: "https://schema.org/VegetarianDiet",
  VG: "https://schema.org/VeganDiet",
  GF: "https://schema.org/GlutenFreeDiet",
};

// Menu structured data generated from the live menu model — updates
// automatically when the sample data is swapped for the real menu.
// Anticipation courses (no items yet) stay out of the schema.
function buildMenuSchema(categories: MenuCategory[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "Limra Menu",
    description:
      "Platters from the spit, wraps rolled warm, bowls for the middle of the day.",
    hasMenuSection: categories
      .filter((category) => category.items.length > 0)
      .map((category) => ({
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

/**
 * Signature-scale art direction that object-position alone can't do.
 * tantuni: the wrap paper's printed slogans must stay out of frame —
 * a tight window over the cut face, stone ground above (window
 * x 36–84%, y 3–51% of the source). Aspect pinned to 4:5 so the
 * window holds on every breakpoint.
 */
const SIGNATURE_ART: Record<string, { zoom: string; aspect?: string }> = {
  "tantuni-wrap": {
    zoom: "scale-[2.08] origin-[69%_6%]",
    aspect: "aspect-[4/5]",
  },
};

function DishTags({ item, onOlive }: { item: MenuItem; onOlive: boolean }) {
  const parts = [...(item.tags ?? []), ...(item.note ? [item.note] : [])];
  if (!parts.length) return null;
  return (
    <span className="mt-3 flex flex-wrap gap-1.5">
      {parts.map((part) => (
        <span
          key={part}
          className={`micro rounded-[2px] border px-2.5 py-0.5 font-roman uppercase ${
            onOlive
              ? "border-cream/25 text-cream/60"
              : "border-olive/25 text-olive/60"
          }`}
        >
          {part}
        </span>
      ))}
    </span>
  );
}

/** One graded, matted photo — the treatment every menu image shares. */
function PlatePhoto({
  item,
  onOlive,
  sizes,
  aspect,
  width,
  height,
  uniform = false,
}: {
  item: MenuItem;
  onOlive: boolean;
  sizes: string;
  aspect: string;
  width: number;
  height: number;
  uniform?: boolean;
}) {
  // In the uniform grid every plate is framed identically — no per-dish
  // art-direction that would change one card's crop or proportions.
  const art = uniform ? undefined : SIGNATURE_ART[item.slug];
  return (
    <div
      className={`relative overflow-hidden rounded-[2px] ${
        onOlive ? "bg-cream p-1.5" : "border border-olive/20 bg-cream-soft p-2"
      }`}
    >
      <div className={`overflow-hidden ${art?.aspect ?? aspect}`}>
        <div className={`h-full w-full ${art?.zoom ?? ""}`}>
          <Image
            src={item.image}
            placeholder="blur"
            blurDataURL={BLUR[item.slug]}
            alt={item.imageAlt}
            width={width}
            height={height}
            sizes={sizes}
            className="photo-grade h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            style={
              art
                ? undefined
                : item.crop
                  ? { objectPosition: item.crop }
                  : undefined
            }
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Dish card — every plate in a course set identically: a matted photo,
 * the name drawn out to a quiet price, description, tags. No dish is
 * featured; each carries the same size and weight in the grid.
 */
function DishCard({
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
        <PlatePhoto
          item={item}
          onOlive={onOlive}
          uniform
          sizes="(max-width: 640px) 90vw, 360px"
          aspect="aspect-[4/3]"
          width={880}
          height={660}
        />
        <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3
            className={`font-display text-2xl leading-tight transition-colors ${
              onOlive
                ? "text-cream group-hover:text-terracotta-soft"
                : "text-ink group-hover:text-terracotta"
            }`}
          >
            {item.name}
          </h3>
          <span aria-hidden className="min-w-[2.5rem] flex-1 -translate-y-[0.3em]">
            <span className="divider-line block w-full origin-left border-b border-current opacity-20 group-hover:opacity-40" />
          </span>
          <span
            className={`shrink-0 font-roman text-sm tracking-[0.12em] ${
              onOlive ? "text-cream/70" : "text-olive/70"
            }`}
          >
            {item.price}
          </span>
        </div>
        <p
          className={`mt-2 font-body text-[0.95rem] font-light leading-relaxed ${
            onOlive ? "text-cream/60" : "text-ink/60"
          }`}
        >
          {item.description}
        </p>
        <DishTags item={item} onOlive={onOlive} />
      </Link>
    </Reveal>
  );
}

/**
 * Course threshold — plumb line, ghost numeral, bare numeral, title,
 * note. The stone-door moment at the head of every course.
 */
function Threshold({
  category,
  onOlive,
  hideNote = false,
}: {
  category: MenuCategory;
  onOlive: boolean;
  hideNote?: boolean;
}) {
  return (
    <Reveal className="relative text-center">
      {/* Ghost numeral, centred behind the title. */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 select-none font-display text-[7rem] leading-none lg:-top-6 lg:text-[10rem] ${
          onOlive ? "text-cream/[0.07]" : "text-olive/[0.07]"
        }`}
      >
        {category.numeral}
      </span>
      <div className="relative">
        <p
          className={`eyebrow-lg font-roman uppercase ${
            onOlive ? "text-terracotta-soft" : "text-terracotta"
          }`}
        >
          {category.numeral}
        </p>
        <h2 className="mt-4 font-display text-5xl font-medium">
          {category.title}
        </h2>
        {!hideNote && (
          <p className="mt-5 font-body text-base font-light italic opacity-60">
            {category.note}
          </p>
        )}
      </div>
    </Reveal>
  );
}

/** Watermark medallion for the deep-olive courses. */
function OliveWatermark({ flip }: { flip?: boolean }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.05]"
    >
      <div
        className={`wm-70 absolute ${
          flip ? "-right-32 -top-32" : "-bottom-32 -left-32"
        }`}
      >
        <ScrollRotate speed={flip ? 0.015 : -0.015} className="h-full w-full">
          <Medallion className="h-full w-full text-cream" />
        </ScrollRotate>
      </div>
    </div>
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
      className={`relative scroll-mt-12 overflow-hidden py-24 lg:py-32 ${
        onOlive ? "frame-inset bg-olive-deep text-cream" : "bg-cream text-ink"
      }`}
    >
      {onOlive && <OliveWatermark flip={index % 4 === 1} />}

      <div className="relative mx-auto max-w-4xl px-6">
        <Threshold category={category} onOlive={onOlive} />

        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2">
          {category.items.map((item, i) => (
            <DishCard
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

/** V — The Case. An empty vitrine, announced, not invented. */
function CaseSection({ category }: { category: MenuCategory }) {
  return (
    <section
      id={category.id}
      className="relative scroll-mt-12 overflow-hidden border-y border-olive/15 bg-cream-deep py-24 text-ink lg:py-32"
    >
      <div className="mx-auto max-w-4xl px-6">
        <Threshold category={category} onOlive={false} />

        {/* The vitrine — six empty panes waiting for opening day */}
        <Reveal
          animation="anim-fade"
          className="stagger-fade mx-auto mt-12 max-w-3xl"
        >
          <div className="grid grid-cols-3 gap-px bg-olive/25 p-px sm:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="stagger-item flex aspect-square items-center justify-center bg-cream-deep"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span
                  className="stagger-item"
                  style={{ transitionDelay: `${i * 60 + 150}ms` }}
                >
                  <Medallion className="h-6 w-6 text-olive opacity-[0.15]" />
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-10 flex items-center justify-center gap-4">
          <span aria-hidden className="h-px w-10 bg-olive/25" />
          <p className="font-roman text-[0.6rem] uppercase tracking-[0.3em] text-terracotta">
            Set at opening
          </p>
          <span aria-hidden className="h-px w-10 bg-olive/25" />
        </Reveal>
      </div>
    </section>
  );
}

/** VI — The Espresso Counter. The pour, the couplet, the seal. */
function EspressoSection({ category }: { category: MenuCategory }) {
  return (
    <section
      id={category.id}
      className="frame-inset relative scroll-mt-12 overflow-hidden bg-olive-deep py-24 text-cream lg:py-32"
    >
      <OliveWatermark flip />
      <div className="relative mx-auto max-w-4xl px-6">
        {/* the couplet carries the note at centerpiece scale */}
        <Threshold category={category} onOlive hideNote />

        <Reveal className="mt-12 flex flex-col items-center text-center">
          <span
            aria-hidden
            className="line-draw-y block h-16 w-px bg-terracotta-soft sm:h-24"
            style={{ transitionDelay: "0.2s" }}
          />
          <p className="mt-8 max-w-xl font-display text-3xl italic leading-[1.3] sm:text-4xl lg:text-5xl">
            Pulled slow,
            <br />
            worth lingering.
          </p>
          <Medallion
            variant="seal"
            className="mt-10 h-12 w-12 text-cream opacity-[0.18] sm:h-16 sm:w-16"
          />
          <p className="mt-8 font-roman text-[0.6rem] uppercase tracking-[0.3em] text-cream/50">
            The counter opens with the room
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default function MenuPage() {
  const categories = menu;

  const navItems = categories.map((c) => ({
    id: c.id,
    numeral: c.numeral,
    title: c.title,
    shortLabel: c.shortLabel,
    surface: c.surface,
    anticipation: c.kind === "anticipation",
  }));

  return (
    <>
      <JsonLd data={buildMenuSchema(categories)} />
      <SiteHeader />
      <main id="main" className="flex-1 bg-cream">
        {/* Masthead — the tabula */}
        <header className="mx-auto max-w-6xl px-6 pb-14 pt-32 lg:pt-36">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Reveal delay="delay-1">
                <p className="eyebrow-lg font-roman uppercase text-terracotta">
                  {menuIntro.eyebrow}
                </p>
              </Reveal>
              <Reveal animation="anim-rise-lg" delay="delay-2">
                <h1 className="mt-4 font-display text-7xl font-medium leading-[0.95] text-olive lg:text-8xl">
                  {menuIntro.title}
                </h1>
              </Reveal>
            </div>
            <Reveal delay="delay-3" className="hidden lg:block">
              <p className="ml-auto max-w-sm text-right font-body text-lg font-light italic leading-relaxed text-ink/70">
                {menuIntro.line}
              </p>
            </Reveal>
          </div>

          <Reveal delay="delay-4" className="mt-14">
            <MenuIndex items={navItems} />
          </Reveal>
        </header>

        <MenuRail items={navItems} />

        {categories.map((category, i) =>
          category.kind === "anticipation" ? (
            category.id === "the-case" ? (
              <CaseSection key={category.id} category={category} />
            ) : (
              <EspressoSection key={category.id} category={category} />
            )
          ) : (
            <CategorySection key={category.id} category={category} index={i} />
          )
        )}

        {/* Closing — the seal */}
        <section className="bg-cream px-6 py-24 text-center text-olive">
          <Reveal className="flex flex-col items-center">
            <Medallion animate variant="seal" className="h-20 w-20" />
            <p className="pull-quote mt-8 max-w-md text-ink/75">
              {menuClosing.line}
            </p>
            <div className="mt-9 flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
              <Link
                href={menuClosing.primary.href}
                className="label w-full max-w-xs rounded-[2px] bg-terracotta px-10 py-4 text-center font-roman uppercase text-cream transition-colors hover:bg-terracotta-deep sm:w-auto"
              >
                {menuClosing.primary.label}
              </Link>
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="label font-roman uppercase text-olive/60 underline-offset-4 transition-colors hover:text-olive hover:underline"
              >
                Directions
              </a>
            </div>
          </Reveal>
        </section>

        <MenuPlumbRail items={navItems} />
      </main>
      <SiteFooter />
    </>
  );
}
