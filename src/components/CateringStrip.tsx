import Link from "next/link";
import Medallion from "./Medallion";
import Reveal from "./Reveal";
import { CATERING_SERVICE_MODES } from "@/data/catering";

/**
 * Home-page catering teaser — an invitation, not the full menu. The left
 * makes the offer in the brand's voice; the right is a stone-set card that
 * lists how it reaches you, then hands off to /catering.
 */
export default function CateringStrip() {
  return (
    <section className="relative overflow-hidden border-y border-olive/10 bg-cream-deep">
      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-24 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-10 lg:py-32">
        {/* The offer */}
        <Reveal>
          <p className="eyebrow-lg font-roman uppercase text-terracotta">
            Catering
          </p>
          <h2 className="mt-6 font-display text-5xl font-medium leading-[1.05] text-olive lg:text-6xl">
            The table travels.
          </h2>
          <p className="mt-7 max-w-md font-body text-lg font-light leading-relaxed text-ink/70">
            100% halal Mediterranean, for ten guests or two hundred. We bring
            the spit to your gathering, and set the buffet when you want one.
          </p>
          <Link
            href="/catering"
            className="group mt-9 inline-flex items-center gap-3 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-olive transition-colors hover:text-terracotta"
          >
            Explore catering
            <span className="h-px w-10 bg-current transition-all group-hover:w-14" />
          </Link>
        </Reveal>

        {/* The invitation card — stone-set, listing how it reaches you */}
        <Reveal animation="anim-fade" delay="delay-2">
          <div className="border border-olive/20 bg-cream p-8 shadow-[0_2px_20px_rgba(26,26,23,0.06)] lg:p-10">
            <div className="flex justify-center">
              <Medallion className="h-12 w-12 text-olive" />
            </div>
            <ul className="mt-8 border-t border-olive/[0.12]">
              {CATERING_SERVICE_MODES.map((mode) => (
                <li
                  key={mode.label}
                  className="flex items-baseline justify-between gap-4 border-b border-olive/[0.12] py-4"
                >
                  <span className="font-display text-xl leading-tight text-ink">
                    {mode.label}
                  </span>
                  <span className="text-right font-body text-sm font-light text-ink/55">
                    {mode.note}
                  </span>
                </li>
              ))}
            </ul>
            <p className="label mt-6 text-center font-roman uppercase text-terracotta">
              100% Halal · 10–200+ Guests
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
