import Image from "next/image";
import Link from "next/link";
import IntroSeal from "./IntroSeal";
import Medallion from "./Medallion";
import ScrollRotate from "./ScrollRotate";
import Wordmark from "./Wordmark";
import { ORDER_URL } from "@/data/contact";
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
            href={ORDER_URL}
            className="rounded-[2px] bg-terracotta px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-cream transition-colors hover:bg-terracotta-deep"
          >
            Order online
          </Link>
          <Link
            href="/menu"
            className="rounded-[2px] border border-olive/40 px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-olive transition-colors hover:border-olive hover:bg-olive hover:text-cream"
          >
            See the menu
          </Link>
        </div>

        <p className="label anim-rise delay-5 mt-9 font-roman uppercase text-terracotta">
          Opening this summer
        </p>
        <p className="anim-rise delay-5 mt-3">
          <Link
            href="/updates"
            className="font-body text-sm font-light italic text-ink/60 underline-offset-4 hover:underline"
          >
            Invitations to the soft-opening tasting go to the list first.
          </Link>
        </p>

        {/* Mobile: the signature plate as a small matted plaque — an object
            in the composition, not a banner. Desktop version below. */}
        {heroDish && (
          <Link
            href={`/menu/${heroDish.slug}`}
            className="anim-fade delay-5 group mt-12 block w-full max-w-xs lg:hidden"
          >
            <span className="block border border-olive/20 bg-cream-soft p-1.5">
              <span className="block overflow-hidden">
                <Image
                  src={heroDish.image}
                  placeholder="blur"
                  blurDataURL={BLUR[heroDish.slug]}
                  alt={heroDish.imageAlt}
                  width={880}
                  height={660}
                  priority
                  sizes="(max-width: 1023px) 20rem, 1px"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                />
              </span>
            </span>
            <span className="micro mt-4 flex items-center justify-center gap-3 font-roman uppercase text-olive/70 transition-colors group-hover:text-terracotta">
              <span className="h-px w-6 bg-current opacity-40" />
              The {heroDish.name}
              <span className="h-px w-6 bg-current opacity-40" />
            </span>
          </Link>
        )}
      </div>

      {/* The signature plate — desktop only: a matted plaque hung inside
          the stone frame, captioned in roman caps. Hidden during the intro. */}
      {heroDish && (
        <div className="hero-chrome relative z-10 hidden items-center justify-center px-12 pb-16 pt-28 lg:flex">
          <Link href={`/menu/${heroDish.slug}`} className="group block w-full max-w-sm">
            <span className="block border border-olive/20 bg-cream-soft p-2">
              <span className="block overflow-hidden">
                <Image
                  src={heroDish.image}
                  placeholder="blur"
                  blurDataURL={BLUR[heroDish.slug]}
                  alt={heroDish.imageAlt}
                  width={1040}
                  height={1300}
                  priority
                  sizes="(min-width: 1024px) 24rem, 1px"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                />
              </span>
            </span>
            <span className="label mt-5 flex items-center justify-center gap-3 font-roman uppercase text-olive/70 transition-colors group-hover:text-terracotta">
              <span className="h-px w-8 bg-current opacity-40" />
              The {heroDish.name}
              <span className="h-px w-8 bg-current opacity-40" />
            </span>
          </Link>
        </div>
      )}

      {/* Scroll cue — kept inside the hairline frame */}
      <div className="anim-fade delay-5 absolute bottom-12 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-olive/60 lg:bottom-16 lg:flex">
        <span className="micro font-roman uppercase">
          Discover
        </span>
        <span className="h-10 w-px bg-olive/30" />
      </div>
    </section>
  );
}
