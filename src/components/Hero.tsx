import Image from "next/image";
import Link from "next/link";
import IntroSeal from "./IntroSeal";
import Medallion from "./Medallion";
import ScrollRotate from "./ScrollRotate";
import Wordmark from "./Wordmark";
import { findDish } from "@/data/menu";
import { BLUR } from "@/data/menu-blur";

export default function Hero() {
  const heroDish = findDish("limra-platter");

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cream lg:grid lg:grid-cols-2">
      {/* Faint meander watermark — centered on mobile, right-anchored on
          desktop, turning slowly with scroll like a stone wheel */}
      <div
        aria-hidden
        className="hero-chrome pointer-events-none absolute inset-0 overflow-hidden opacity-[0.05]"
      >
        <div className="wm-120 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:-left-40 lg:translate-x-0">
          <ScrollRotate className="h-full w-full">
            <Medallion className="h-full w-full text-olive" color="currentColor" />
          </ScrollRotate>
        </div>
      </div>

      {/* Hairline frame for an architectural, "stone-set" feel */}
      <div
        aria-hidden
        className="hero-chrome pointer-events-none absolute inset-5 border border-olive/15 lg:inset-8"
      />

      {/* pt clears the absolute header on short screens (e.g. Galaxy Note 8);
          on tall screens the flex centering still rules and padding is slack */}
      <div className="relative z-10 flex flex-col items-center px-6 pb-28 pt-32 text-center text-olive lg:justify-center lg:pt-36">
        <IntroSeal className="mb-9 h-24 w-24 text-olive lg:h-28 lg:w-28" />

        {/* One h1 carrying the full descriptive heading for crawlers and
            screen readers — visually identical to the old eyebrow + mark */}
        <h1>
          <span className="anim-rise delay-1 block font-roman text-[0.7rem] font-normal uppercase tracking-[0.42em] text-terracotta lg:text-xs">
            Mediterranean Restaurant
          </span>
          <span className="anim-rise delay-2 mt-8 block">
            <span className="sr-only">
              — Limra, Holly Springs, North Carolina
            </span>
            <Wordmark
              aria-hidden
              className="w-52 text-olive sm:w-64 lg:w-80"
            />
          </span>
        </h1>

        <p className="anim-rise delay-3 mt-6 max-w-xl font-body text-lg font-light italic leading-relaxed text-ink/80 lg:text-xl">
          A modern Mediterranean table, named for an ancient city.
        </p>

        <div className="anim-rise delay-4 mt-10 flex flex-col items-center gap-4 sm:flex-row">
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
            See the menu
          </Link>
        </div>

        <p className="anim-rise delay-5 mt-9 font-roman text-[0.66rem] uppercase tracking-[0.32em] text-terracotta">
          Opening this summer
        </p>

        {/* Mobile: the signature plate right in the hero, peeking into the
            first screen. Desktop gets the full split-panel version below. */}
        {heroDish && (
          <Link
            href={`/menu/${heroDish.slug}`}
            className="anim-fade delay-5 group relative mt-10 block w-full max-w-sm overflow-hidden rounded-2xl lg:hidden"
          >
            <Image
              src={heroDish.image}
              placeholder="blur"
              blurDataURL={BLUR[heroDish.slug]}
              alt={heroDish.imageAlt}
              width={880}
              height={660}
              priority
              sizes="(max-width: 1023px) 90vw, 1px"
              className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span className="absolute right-3 top-3 rounded-full bg-terracotta px-3 py-1 font-roman text-[0.66rem] tracking-[0.12em] text-cream">
              {heroDish.price}
            </span>
            <span className="absolute bottom-3 left-3 rounded-full bg-cream/90 px-4 py-1.5 font-display text-base text-ink backdrop-blur-sm">
              {heroDish.name}
            </span>
          </Link>
        )}
      </div>

      {/* The signature plate — desktop only; mobile meets the food one
          scroll later. Hidden during the intro (hero-chrome). */}
      {heroDish && (
        <div className="hero-chrome relative z-10 hidden items-center justify-center px-12 pb-16 pt-28 lg:flex">
          <Link
            href={`/menu/${heroDish.slug}`}
            className="group relative block w-full max-w-lg overflow-hidden rounded-3xl"
          >
            <Image
              src={heroDish.image}
              placeholder="blur"
              blurDataURL={BLUR[heroDish.slug]}
              alt={heroDish.imageAlt}
              width={1320}
              height={1650}
              priority
              sizes="(min-width: 1024px) 42vw, 1px"
              className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <span className="absolute right-5 top-5 rounded-full bg-terracotta px-3.5 py-1.5 font-roman text-[0.7rem] tracking-[0.12em] text-cream">
              {heroDish.price}
            </span>
            <span className="absolute bottom-5 left-5 rounded-full bg-cream/90 px-5 py-2 font-display text-xl text-ink backdrop-blur-sm">
              {heroDish.name}
            </span>
          </Link>
        </div>
      )}

      {/* Scroll cue — kept inside the hairline frame */}
      <div className="anim-fade delay-5 absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-olive/60 lg:bottom-16">
        <span className="font-roman text-[0.6rem] uppercase tracking-[0.3em]">
          Discover
        </span>
        <span className="h-10 w-px bg-olive/30" />
      </div>
    </section>
  );
}
