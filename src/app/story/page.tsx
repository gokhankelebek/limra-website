import type { Metadata } from "next";
import Link from "next/link";
import Medallion from "@/components/Medallion";
import Reveal from "@/components/Reveal";
import ScrollRotate from "@/components/ScrollRotate";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import Wordmark from "@/components/Wordmark";

export const metadata: Metadata = {
  title: {
    absolute: "Our Story | Limra Mediterranean — Holly Springs, NC",
  },
  description:
    "Before it was a restaurant, Limra was a city. The ancient name, the seal, and the husband and wife behind the modern Mediterranean table in Holly Springs.",
  alternates: { canonical: "/story" },
};

function Movement({
  numeral,
  title,
  onOlive = false,
  children,
}: {
  numeral: string;
  title: string;
  onOlive?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="text-center">
      <p
        className={`font-roman text-[0.7rem] uppercase tracking-[0.4em] ${
          onOlive ? "text-terracotta-soft" : "text-terracotta"
        }`}
      >
        {numeral}
      </p>
      <h2
        className={`mt-5 font-display text-5xl font-medium lg:text-6xl ${
          onOlive ? "text-cream" : "text-olive"
        }`}
      >
        {title}
      </h2>
      <div
        className={`mt-7 flex items-center justify-center gap-4 opacity-30 ${
          onOlive ? "text-cream" : "text-olive"
        }`}
      >
        <span className="h-px w-16 bg-current" />
        <Medallion className="h-5 w-5" />
        <span className="h-px w-16 bg-current" />
      </div>
      <div
        className={`mx-auto mt-9 max-w-xl space-y-6 font-body text-lg font-light leading-relaxed ${
          onOlive ? "text-cream/75" : "text-ink/75"
        }`}
      >
        {children}
      </div>
    </Reveal>
  );
}

export default function StoryPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1 bg-cream">
        {/* Masthead */}
        <div className="px-6 pb-24 pt-36 text-center text-olive">
          <Reveal delay="delay-1" className="flex justify-center">
            <Medallion animate variant="seal" className="h-16 w-16" />
          </Reveal>
          <Reveal delay="delay-2">
            <p className="mt-8 font-roman text-[0.7rem] uppercase tracking-[0.42em] text-terracotta">
              The Name
            </p>
          </Reveal>
          <Reveal delay="delay-3">
            <h1 className="mt-5 font-display text-6xl font-medium lg:text-7xl">
              Our Story
            </h1>
          </Reveal>
          <Reveal delay="delay-4">
            <p className="mx-auto mt-6 max-w-md font-body text-lg font-light italic leading-relaxed text-ink/70">
              Before it was a restaurant, Limra was a city.
            </p>
          </Reveal>
        </div>

        {/* I — The City */}
        <section className="relative overflow-hidden bg-olive-deep px-6 py-24 text-cream lg:py-32">
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
            <Movement numeral="I" title="The City" onOlive>
              <p>
                Limyra rose in stone in ancient Lycia, where the mountains
                meet the Mediterranean. A city of builders and traders,
                theaters and long roads — laid out, above all, around places
                to gather.
              </p>
              <p>
                Meals there were not private things. They happened in the
                open: in courtyards, in market squares, at tables held in
                common. The city is quiet now. The idea is not.
              </p>
            </Movement>
          </div>
        </section>

        {/* II — The Seal */}
        <section className="bg-cream px-6 py-24 lg:py-32">
          <Movement numeral="II" title="The Seal">
            <p>
              Our seal is drawn from the name itself. The letters of LIMRA,
              turned and repeated, close into a circle — the way stones form
              an arch, the way chairs form a table.
            </p>
            <p>
              Ancient masons cut patterns like this into doorways and
              thresholds: order, rhythm, welcome. We put ours on the door for
              the same reason.
            </p>
          </Movement>
          <Reveal className="mt-14 flex flex-col items-center gap-8">
            <Medallion className="h-44 w-44 text-olive lg:h-52 lg:w-52" />
            <Wordmark className="w-40 text-olive" title="Limra" />
          </Reveal>
        </section>

        {/* III — The Couple */}
        <section className="relative overflow-hidden bg-olive-deep px-6 py-24 text-cream lg:py-32">
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
            <Movement numeral="III" title="Can &amp; Elif" onOlive>
              <p>
                Limra is kept by Can and Elif — husband and wife. One name
                over the door, two pairs of hands behind it.
              </p>
              <p>
                They built Limra around the food they grew up sharing: bread
                warm from the fire, meat carved from the spit, vegetables in
                season, sauces made in the kitchen each morning. Nothing
                leaves the counter that they would not set on their own
                table.
              </p>
            </Movement>
          </div>
        </section>

        {/* IV — The Table */}
        <section className="bg-cream px-6 py-24 lg:py-32">
          <Movement numeral="IV" title="The Table">
            <p>
              A modern Mediterranean table. You order at the counter; the
              rest is done the old way — over fire, by hand, without hurry.
            </p>
          </Movement>
          <Reveal className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/menu"
              className="rounded-full bg-olive px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-cream transition-colors hover:bg-olive-deep"
            >
              View the menu
            </Link>
            <Link
              href="/visit"
              className="rounded-full border border-olive/40 px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-olive transition-colors hover:border-olive hover:bg-olive hover:text-cream"
            >
              Plan your visit
            </Link>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
