import type { Metadata } from "next";
import Link from "next/link";
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

export const metadata: Metadata = {
  title: {
    absolute: "Menu | Limra Mediterranean — Meze, Grill, Mains & Sweets",
  },
  description:
    "Seasonal Mediterranean cooking with Anatolian roots — cold meze, the charcoal grill, larger plates, and sweets. View the menu and reserve at Limra.",
};

const STAGGER = ["delay-1", "delay-2", "delay-3", "delay-4"] as const;

function DishTags({ item, onOlive }: { item: MenuItem; onOlive: boolean }) {
  const parts = [...(item.tags ?? []), ...(item.note ? [item.note] : [])];
  if (!parts.length) return null;
  return (
    <p
      className={`mt-2 font-roman text-[0.6rem] uppercase tracking-[0.3em] ${
        onOlive ? "text-cream/50" : "text-olive/50"
      }`}
    >
      {parts.join(" · ")}
    </p>
  );
}

function FeaturedDish({ item, onOlive }: { item: MenuItem; onOlive: boolean }) {
  return (
    <Reveal className="my-10 border-y border-terracotta/30 py-12 text-center">
      <p
        className={`font-roman text-[0.65rem] uppercase tracking-[0.4em] ${
          onOlive ? "text-terracotta-soft" : "text-terracotta"
        }`}
      >
        Signature
      </p>
      <h3
        className={`mt-4 font-display text-4xl font-medium lg:text-5xl ${
          onOlive ? "text-cream" : "text-ink"
        }`}
      >
        {item.name}
      </h3>
      <p
        className={`mx-auto mt-3 max-w-md font-body text-[0.95rem] font-light leading-relaxed ${
          onOlive ? "text-cream/65" : "text-ink/65"
        }`}
      >
        {item.description}
      </p>
      <p
        className={`mt-4 font-roman text-sm tracking-[0.12em] ${
          onOlive ? "text-cream/70" : "text-olive/70"
        }`}
      >
        {item.price}
      </p>
      <DishTags item={item} onOlive={onOlive} />
    </Reveal>
  );
}

function DishRow({
  item,
  onOlive,
  delay,
}: {
  item: MenuItem;
  onOlive: boolean;
  delay: (typeof STAGGER)[number];
}) {
  return (
    <Reveal
      animation="anim-fade"
      delay={delay}
      className={`border-t py-7 ${onOlive ? "border-cream/15" : "border-olive/15"}`}
    >
      <div className="flex items-baseline justify-between gap-6">
        <h3
          className={`font-display text-2xl lg:text-[1.75rem] ${
            onOlive ? "text-cream" : "text-ink"
          }`}
        >
          {item.name}
        </h3>
        <p
          className={`shrink-0 font-roman text-sm tracking-[0.12em] ${
            onOlive ? "text-cream/70" : "text-olive/70"
          }`}
        >
          {item.price}
        </p>
      </div>
      <p
        className={`mt-2 max-w-lg font-body text-[0.95rem] font-light leading-relaxed ${
          onOlive ? "text-cream/65" : "text-ink/65"
        }`}
      >
        {item.description}
      </p>
      <DishTags item={item} onOlive={onOlive} />
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
  const featured = category.items.find((i) => i.featured);
  const rest = category.items.filter((i) => !i.featured);

  return (
    <section
      id={category.id}
      className={`relative scroll-mt-16 overflow-hidden py-24 lg:py-32 ${
        onOlive ? "bg-olive-deep text-cream" : "bg-cream text-ink"
      }`}
    >
      {onOlive && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.05]"
        >
          <div
            className={`absolute h-[70vh] w-[70vh] ${
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

      <div className="relative mx-auto max-w-2xl px-6">
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

        <div className="mt-12">
          {featured && <FeaturedDish item={featured} onOlive={onOlive} />}
          {rest.map((item, i) => (
            <DishRow
              key={item.name}
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
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-cream">
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

        <MenuRail items={menu.map((c) => ({ id: c.id, label: c.title }))} />

        {menu.map((category, i) => (
          <CategorySection key={category.id} category={category} index={i} />
        ))}

        {/* Closing CTA */}
        <section className="bg-cream px-6 py-28 text-center text-olive">
          <Reveal className="flex flex-col items-center">
            <Medallion variant="seal" className="h-20 w-20" />
            <p className="mt-8 max-w-md font-body text-xl font-light italic leading-relaxed text-ink/75">
              {menuClosing.line}
            </p>
            <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
              <Link
                href="/reserve"
                className="rounded-full bg-olive px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-cream transition-colors hover:bg-olive-deep"
              >
                {menuClosing.reserveLabel}
              </Link>
              <Link
                href="/order"
                className="rounded-full border border-olive/40 px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-olive transition-colors hover:border-olive hover:bg-olive hover:text-cream"
              >
                {menuClosing.orderLabel}
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
