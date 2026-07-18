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

// The story follows the owners' telling from limramedi.com: same facts,
// same order, same beats. The prose was rewritten to read plainer and
// less machine-written. Needs Can & Elif's sign-off before launch.
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
                Limra started in a food truck, years before this room
                existed. A truck gives you nowhere to hide. There is no long
                menu to distract anyone and no dining room to soften a plate
                that isn&apos;t right. People either come back or they
                don&apos;t.
              </p>
              <p>
                They kept coming back, and the line kept getting longer. The
                same thought kept surfacing: this works, it just needs more
                room.
              </p>
              <p>
                The room turned out to be Peterson Station.
              </p>
            </Movement>
          </div>
        </section>

        {/* II — the experience */}
        <section className="bg-cream px-6 py-16 lg:py-24">
          <Movement numeral="II">
            <p>
              The room is simple on purpose. The buffet runs hot and cold and
              gets refilled through the day, so nothing sits long enough to go
              tired. Cold meze at one end, hot dishes at the other, cooked
              properly instead of held under a lamp. The döner turns by the
              counter from open to close.
            </p>
            <p className="pull-quote text-ink/80">
              Move the way you want to eat.
            </p>
            <p>Quick if you&apos;re in a rush. Slow if you&apos;re not.</p>
            <p>
              All of it comes from having started over once already.
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
                Can cooked for fifteen years before Limra. Luxury hotels
                first, then protocol dinners for heads of state. He left all
                of it, moved to the States, and started again out of a food
                truck.
              </p>
              <p>
                Elif ran Elif&apos;s Vanilla Cakery, making cakes for
                weddings and celebrations. At Limra the pastry counter is
                hers, made fresh for the case.
              </p>
              <p>
                So the platters, wraps, and sandwiches come from Can, and the
                baklava and desserts come from Elif. We cater as well, if
                you&apos;re feeding people somewhere other than here.
              </p>
              <p>
                Neither of them planned on starting over. It turned into the
                work they actually wanted to be doing.
              </p>
            </Movement>
          </div>
        </section>

        {/* IV — the close, in their words */}
        <section className="relative overflow-hidden bg-cream px-6 py-16 lg:py-24">
          <Movement numeral="IV">
            <p>
              We aren&apos;t trying to run a traditional restaurant, and
              we aren&apos;t chasing a trend either. It&apos;s Mediterranean
              food, cooked for the way people actually eat now.
            </p>
            <p>
              Mostly we wanted a room where people sit down together and stay
              a while.
            </p>
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
