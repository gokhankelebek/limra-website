import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Medallion from "@/components/Medallion";
import Reveal from "@/components/Reveal";
import ScrollRotate from "@/components/ScrollRotate";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import Wordmark from "@/components/Wordmark";

export const metadata: Metadata = {
  title: {
    absolute: "Our Story · Limra Mediterranean · Holly Springs, NC",
  },
  description:
    "From a food truck window to a table worth staying for. The story of chefs Can and Elif Engin and Limra, a Mediterranean restaurant in Holly Springs, NC.",
  alternates: { canonical: "/story" },
};

// The story is the owners' own text. Wording and order are theirs and
// must not change; only punctuation was normalized (no em dashes).
// Any change to their words needs their sign-off.
function Movement({
  numeral,
  title,
  onOlive = false,
  children,
}: {
  numeral: string;
  title?: string;
  onOlive?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="relative text-center">
      {/* Ghost numeral — a watermark behind the movement head */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 -top-12 select-none font-display text-[10rem] leading-none ${
          onOlive ? "text-cream/8" : "text-olive/8"
        }`}
      >
        {numeral}
      </span>
      <div className="relative">
        <p
          className={`eyebrow-lg font-roman uppercase ${
            onOlive ? "text-terracotta-soft" : "text-terracotta"
          }`}
        >
          {numeral}
        </p>
        {title && (
          <h2
            className={`mt-5 font-display text-4xl font-medium lg:text-5xl ${
              onOlive ? "text-cream" : "text-olive"
            }`}
          >
            {title}
          </h2>
        )}
        <div
          className={`divider-draw mt-7 flex items-center justify-center gap-4 opacity-30 ${
            onOlive ? "text-cream" : "text-olive"
          }`}
        >
          <span className="divider-line h-px w-16 origin-right bg-current" />
          <Medallion className="divider-mark h-5 w-5" />
          <span className="divider-line h-px w-16 origin-left bg-current" />
        </div>
        <div
          className={`mx-auto mt-9 max-w-xl space-y-6 font-body text-lg font-light leading-relaxed ${
            onOlive ? "text-cream/75" : "text-ink/75"
          }`}
        >
          {children}
        </div>
      </div>
    </Reveal>
  );
}

export default function StoryPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1 bg-cream">
        {/* Masthead — set over the ink-and-wash drawing of Limyra */}
        <div className="relative overflow-hidden px-6 pb-24 pt-36 text-center text-olive">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-30">
            <Image
              src="/limra-city.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-[70%_30%]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-cream/70 via-cream/40 to-cream" />
          </div>
          <div className="relative">
            <Reveal delay="delay-1" className="flex justify-center">
              <Medallion animate variant="seal" className="h-16 w-16" />
            </Reveal>
            <Reveal delay="delay-2">
              <p className="mt-8 font-roman text-[0.7rem] uppercase tracking-[0.42em] text-terracotta">
                Our Story
              </p>
            </Reveal>
            <Reveal animation="anim-rise-lg" delay="delay-3">
              <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-medium leading-[1.15] lg:text-6xl">
                From a food truck window to a table worth staying for.
              </h1>
            </Reveal>
          </div>
        </div>

        {/* I — the beginning */}
        <section className="relative overflow-hidden bg-olive-deep px-6 py-16 text-cream lg:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.05]"
          >
            <div className="wm-80 absolute -right-32 -top-32">
              <ScrollRotate speed={0.015} className="h-full w-full">
                <Medallion className="h-full w-full text-cream" />
              </ScrollRotate>
            </div>
          </div>
          <div className="relative">
            <Movement numeral="I" onOlive>
              <p>
                Limra began long before these doors opened, in a small
                kitchen on wheels, where every plate had to prove itself in a
                single bite. No shortcuts. No hiding behind a menu. Just
                honest Mediterranean food, served fast, fresh, and with
                intention.
              </p>
              <p>
                As the line kept growing, so did the idea: what if we could
                keep that same energy, but give it space to breathe?
              </p>
              <p>
                And that&apos;s how Limra found its place at Peterson
                Station.
              </p>
            </Movement>
          </div>
        </section>

        {/* II — the experience */}
        <section className="bg-cream px-6 py-16 lg:py-24">
          <Movement numeral="II">
            <p>
              Here, the experience is simple, but deliberate. A buffet
              that&apos;s truly alive: constantly refreshed, built on real
              preparation, never shortcuts. Cold meze with balance. Hot
              dishes that feel like they came from a real kitchen. A döner
              turning in the background, not for show, but as a daily
              ritual.
            </p>
            <p className="pull-quote text-ink/80">
              Move the way you want to eat.
            </p>
            <p>Quick if you&apos;re in a rush. Slow if you&apos;re not.</p>
            <p>
              Behind it all is a story of starting over, and aiming higher.
            </p>
          </Movement>
        </section>

        {/* III — the chefs */}
        <section className="relative overflow-hidden bg-olive-deep px-6 py-16 text-cream lg:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.05]"
          >
            <div className="wm-80 absolute -bottom-32 -left-32">
              <ScrollRotate speed={-0.015} className="h-full w-full">
                <Medallion className="h-full w-full text-cream" />
              </ScrollRotate>
            </div>
          </div>
          <div className="relative">
            <Movement numeral="III" title="Chefs Can & Elif Engin" onOlive>
              <p>
                Before Limra, Chef Can spent over 15 years in professional
                kitchens, working in luxury hotels and preparing protocol
                meals for heads of state and world leaders. At the peak of
                that path, he chose to begin again. This time in the U.S.,
                from a small food truck, rebuilding everything from scratch.
              </p>
              <p>
                Alongside him is Chef Elif, bringing her own refined touch.
                Through Elif&apos;s Vanilla Cakery, she created cakes for
                special events, and now prepares to fill her own counter
                with pastries and desserts, made fresh for you.
              </p>
              <p>
                At Limra, you&apos;ll taste that balance: signature dishes,
                wraps, and sandwiches by Chef Can; pastries and desserts from
                Chef Elif&apos;s counter. Beyond our doors, you&apos;ll
                find us at your celebrations and gatherings, bringing the
                same care, flavor, and craftsmanship to every table we touch.
              </p>
              <p>
                Together, what started as a reset became a direction: not
                just to open a restaurant, but to build something that
                reflects the highest level of their craft.
              </p>
            </Movement>
          </div>
        </section>

        {/* IV — the close, in their words */}
        <section className="relative overflow-hidden bg-cream px-6 py-16 lg:py-24">
          <Movement numeral="IV">
            <p>
              Limra isn&apos;t trying to be traditional for the sake of
              tradition. And it isn&apos;t trying to be modern just to look
              different. It lives in between: Mediterranean food, adapted to
              real life.
            </p>
            <p>And more than that:</p>
            <p>a place to gather, to pause, to share.</p>
            <p className="pull-quote">
              More than a restaurant. A table that brings people together.
              <span className="label mt-4 block font-roman uppercase not-italic text-terracotta">
                Can &amp; Elif
              </span>
            </p>
          </Movement>
          <Reveal className="mt-14 flex flex-col items-center gap-8">
            <Medallion className="h-40 w-40 text-olive lg:h-48 lg:w-48" />
            <Wordmark className="w-40 text-olive" title="Limra" />
          </Reveal>
          <Reveal className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/menu"
              className="rounded-[2px] bg-terracotta px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-cream transition-colors hover:bg-terracotta-deep"
            >
              View the menu
            </Link>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
