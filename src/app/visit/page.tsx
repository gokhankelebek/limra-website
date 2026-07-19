import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import Medallion from "@/components/Medallion";
import Reveal from "@/components/Reveal";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import {
  ADDRESS_LINES,
  CONTACT,
  DIRECTIONS_URL,
  HOURS,
  MAP_EMBED_URL,
  SERVICE_LINE,
} from "@/data/contact";
import { FAQ, FAQ_SCHEMA } from "@/data/faq";

export const metadata: Metadata = {
  title: {
    absolute: "Visit Limra · Mediterranean Restaurant in Holly Springs, NC",
  },
  description:
    "Find Limra at 3109 McChesney Hill Loop, Holly Springs, NC 27539. Directions, hours, and contact. Counter service, no reservations needed.",
  alternates: { canonical: "/visit" },
};

export default function VisitPage() {
  return (
    <>
      <JsonLd data={FAQ_SCHEMA} />
      <SiteHeader />
      <main id="main" className="flex-1 bg-cream">
        {/* Masthead */}
        <div className="px-6 pb-16 pt-36 text-center text-olive">
          <Reveal delay="delay-1" className="flex justify-center">
            <Medallion className="h-14 w-14" />
          </Reveal>
          <Reveal delay="delay-2">
            <p className="eyebrow-lg mt-8 font-roman uppercase text-terracotta">
              Find us
            </p>
          </Reveal>
          <Reveal animation="anim-rise-lg" delay="delay-3">
            <h1 className="mt-5 font-display text-6xl font-medium lg:text-7xl">
              Visit
            </h1>
          </Reveal>
          <Reveal delay="delay-4">
            <p className="mx-auto mt-6 max-w-md font-body text-lg font-light italic leading-relaxed text-ink/70">
              Opening this summer. A seat at the table is closer than you
              think.
            </p>
          </Reveal>
        </div>

        {/* Address & contact */}
        <section className="px-6 pb-20 text-center text-olive">
          <Reveal>
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-block"
            >
              <p className="font-display text-3xl font-medium leading-snug text-ink transition-colors group-hover:text-terracotta sm:text-4xl">
                {ADDRESS_LINES[0]}
                <br />
                {ADDRESS_LINES[1]}
              </p>
              <span className="label mt-4 inline-flex items-center gap-3 font-roman uppercase text-terracotta">
                Get directions
                <span className="h-px w-10 bg-current transition-all group-hover:w-14" />
              </span>
            </a>
            <p className="mt-8">
              <a
                href={CONTACT.phoneHref}
                className="font-body text-xl font-light text-ink/80 transition-colors hover:text-terracotta"
              >
                {CONTACT.phoneDisplay}
              </a>
            </p>
          </Reveal>
        </section>

        {/* Hours */}
        <section className="px-6 pb-20">
          <Reveal className="mx-auto max-w-md text-center">
            <p className="eyebrow-lg font-roman uppercase text-terracotta">
              Hours, from opening day
            </p>
            <div className="mt-7">
              {HOURS.map((h) => (
                <div
                  key={h.days}
                  className="flex items-baseline justify-between gap-6 border-t border-olive/15 py-4"
                >
                  <p className="font-body text-base font-light text-ink/75">
                    {h.days}
                  </p>
                  <p className="shrink-0 font-roman text-sm tracking-[0.14em] text-olive/80">
                    {h.time}
                  </p>
                </div>
              ))}
            </div>
            <p className="label mt-6 font-roman uppercase text-olive/60">
              {SERVICE_LINE}
            </p>
            <p className="mt-4 font-body text-sm font-light italic text-ink/50">
              Holiday hours may differ.
            </p>
          </Reveal>
        </section>

        {/* Map — framed like the hero, hairline border */}
        <section className="px-6 pb-24">
          <Reveal className="mx-auto max-w-4xl border border-olive/15 p-2">
            <iframe
              title="Map to Limra Mediterranean Restaurant"
              src={MAP_EMBED_URL}
              className="map-tint h-[420px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Reveal>
        </section>

        {/* Questions we get asked — also the FAQPage schema below */}
        <section className="px-6 pb-24">
          <Reveal className="mx-auto max-w-2xl">
            <h2 className="eyebrow-lg text-center font-roman uppercase text-terracotta">
              Before you come
            </h2>
            <dl className="mt-9 border-t border-olive/15">
              {FAQ.map(({ q, a }) => (
                <div key={q} className="border-b border-olive/15 py-6">
                  <dt className="font-display text-xl leading-tight text-ink">
                    {q}
                  </dt>
                  <dd className="mt-2 font-body text-base font-light leading-relaxed text-ink/65">
                    {a}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        {/* Closing CTA */}
        <section className="frame-inset bg-olive-deep px-6 py-16 text-center text-cream lg:py-20">
          <Reveal className="flex flex-col items-center">
            <Medallion variant="seal" className="h-16 w-16 text-cream" />
            <p className="pull-quote mt-7 max-w-md text-cream/80">
              The doors open this summer. The directions already work.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[2px] bg-terracotta px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-cream transition-colors hover:bg-terracotta-deep"
              >
                Get directions
              </a>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
