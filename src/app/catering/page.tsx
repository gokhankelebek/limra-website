import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CateringForm from "@/components/CateringForm";
import JsonLd from "@/components/JsonLd";
import Medallion from "@/components/Medallion";
import Reveal from "@/components/Reveal";
import ScrollRotate from "@/components/ScrollRotate";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import {
  CATERING_AREA,
  CATERING_CUSTOM_NOTE,
  CATERING_FACTS,
  CATERING_MENU,
  CATERING_SERVICE_MODES,
  CATERING_TIERS,
} from "@/data/catering";
import { CATERING_EMAIL, CATERING_EMAIL_HREF } from "@/data/contact";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Catering · 100% Halal Mediterranean · Holly Springs & the Triangle",
  },
  description:
    "100% halal Mediterranean catering for 10 to 200+ guests across Holly Springs, Apex, Cary, Raleigh, Durham and the Triangle. Pickup, delivery, and full buffet setup. Request a quote from Limra.",
  alternates: { canonical: "/catering" },
};

const CATERING_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  name: "Limra Mediterranean Catering",
  servesCuisine: "Mediterranean",
  url: `${SITE_URL}/catering`,
  telephone: "+1-984-999-5388",
  email: CATERING_EMAIL,
  areaServed: CATERING_AREA.map((name) => ({
    "@type": "City",
    name: `${name}, NC`,
  })),
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      serviceType: "Halal Mediterranean catering",
      description:
        "Halal catering for 10 to 200+ guests. Pickup, delivery, and full buffet setup for events of 60 or more.",
    },
  },
};

/** Kept from the original, tightened to one line each. */
const STEPS = [
  { h: "Tell us the table", p: "The occasion, the head count, the date." },
  { h: "We shape the menu", p: "By the pound and by the tray, to fit the room." },
  { h: "We set the table", p: "Pickup, delivery, or a full buffet, set for you." },
];

/** The three service levels — photos land here (WeTransfer). */
const SERVICE_BAND = CATERING_SERVICE_MODES;

export default function CateringPage() {
  return (
    <>
      <JsonLd data={CATERING_SCHEMA} />
      <SiteHeader />
      <main id="main" className="flex-1 bg-cream">
        {/* Masthead over the ink-and-wash city */}
        <div className="relative overflow-hidden px-6 pb-16 pt-36 text-center text-olive">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-25">
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
              <Medallion className="h-14 w-14" />
            </Reveal>
            <Reveal delay="delay-2">
              <p className="eyebrow-lg mt-8 font-roman uppercase text-terracotta">
                Catering
              </p>
            </Reveal>
            <Reveal animation="anim-rise-lg" delay="delay-3">
              <h1 className="mx-auto mt-5 max-w-2xl font-display text-5xl font-medium leading-[1.1] lg:text-7xl">
                The same kitchen, at your table.
              </h1>
            </Reveal>
            <Reveal delay="delay-4">
              <p className="mx-auto mt-6 max-w-xl font-body text-lg font-light italic leading-relaxed text-ink/70">
                Beyond our doors, the spit travels. Celebrations, gatherings,
                the long shared meal, brought to your table.
              </p>
            </Reveal>

            {/* The promise, said plainly and up front */}
            <Reveal delay="delay-5">
              <ul className="mx-auto mt-9 flex max-w-2xl flex-col items-center justify-center gap-x-6 gap-y-2 sm:flex-row sm:flex-wrap">
                {CATERING_FACTS.map((fact) => (
                  <li
                    key={fact}
                    className="label flex items-center gap-2 font-roman uppercase text-olive"
                  >
                    <span aria-hidden className="text-terracotta">
                      ◆
                    </span>
                    {fact}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay="delay-5">
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="#quote"
                  className="rounded-[2px] bg-terracotta px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-cream transition-colors hover:bg-terracotta-deep"
                >
                  Request a quote
                </Link>
                <a
                  href={CATERING_EMAIL_HREF}
                  className="rounded-[2px] border border-olive/40 px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-olive transition-colors hover:border-olive hover:bg-olive hover:text-cream"
                >
                  Email us
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Pickup → Delivery → Full Buffet Setup — the visual band.
            Placeholders now; drop the WeTransfer photos in when they arrive. */}
        <section className="bg-cream px-6 pb-4 pt-4">
          <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-3">
            {SERVICE_BAND.map((s, i) => (
              <Reveal
                key={s.label}
                animation="anim-fade"
                delay={(["delay-1", "delay-2", "delay-3"] as const)[i]}
              >
                <div className="group relative aspect-[4/3] overflow-hidden rounded-[2px] border border-olive/20 bg-olive-deep">
                  {/* medallion watermark stands in until the photo lands */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.08]"
                  >
                    <Medallion className="h-28 w-28 text-cream" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4 text-center">
                    <p className="label font-roman uppercase text-cream">
                      {s.label}
                    </p>
                    <p className="mt-1 font-body text-xs font-light text-cream/60">
                      {s.note}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Compact process line — brand language, one row */}
        <section className="bg-cream px-6 pb-16 pt-10 lg:pb-20">
          <div className="mx-auto grid max-w-3xl gap-6 text-center sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal
                key={s.h}
                delay={(["delay-1", "delay-2", "delay-3"] as const)[i]}
              >
                <p className="font-display text-3xl text-olive/25">
                  {["I", "II", "III"][i]}
                </p>
                <h2 className="mt-1 font-display text-xl text-ink">{s.h}</h2>
                <p className="mx-auto mt-1 max-w-[16rem] font-body text-sm font-light leading-relaxed text-ink/55">
                  {s.p}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Service levels by guest count */}
        <section className="border-y border-olive/10 bg-cream-soft px-6 py-16 lg:py-20">
          <Reveal className="text-center">
            <p className="eyebrow-lg font-roman uppercase text-terracotta">
              How it scales
            </p>
            <h2 className="mt-5 font-display text-3xl font-medium text-olive lg:text-4xl">
              Ten guests, or two hundred.
            </h2>
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            {CATERING_TIERS.map((tier, i) => (
              <Reveal
                key={tier.range}
                animation="anim-fade"
                delay={(["delay-1", "delay-2"] as const)[i]}
                className="rounded-[2px] border border-olive/20 bg-cream p-7"
              >
                <p className="label font-roman uppercase text-terracotta">
                  {tier.range}
                </p>
                <h3 className="mt-3 font-display text-2xl text-ink">
                  {tier.title}
                </h3>
                <p className="mt-3 font-body text-[0.95rem] font-light leading-relaxed text-ink/65">
                  {tier.body}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* The menu — sections as inscribed columns, priced */}
        <section className="bg-cream px-6 py-20 lg:py-28">
          <Reveal className="text-center">
            <p className="eyebrow-lg font-roman uppercase text-terracotta">
              The catering table
            </p>
            <h2 className="mt-5 font-display text-4xl font-medium text-olive lg:text-5xl">
              By the pound, by the tray.
            </h2>
            <p className="mx-auto mt-5 max-w-lg font-body text-base font-light italic leading-relaxed text-ink/55">
              Trays serve ten unless noted. Build a spread from any section.
            </p>
          </Reveal>

          <div className="mx-auto mt-16 grid max-w-4xl gap-x-14 gap-y-14 sm:grid-cols-2">
            {CATERING_MENU.map((section, i) => (
              <Reveal
                key={section.id}
                animation="anim-fade"
                delay={(["delay-1", "delay-2", "delay-3", "delay-4"] as const)[i % 4]}
              >
                <div className="flex items-center gap-4">
                  <h3 className="eyebrow-lg font-roman uppercase text-terracotta">
                    {section.title}
                  </h3>
                  <span className="h-px flex-1 bg-olive/15" />
                </div>
                <p className="mt-3 font-body text-sm font-light italic leading-relaxed text-ink/50">
                  {section.note}
                </p>
                {section.lead && (
                  <p className="micro mt-2 inline-flex items-center gap-1.5 font-roman uppercase text-terracotta">
                    <span aria-hidden>◆</span>
                    {section.lead}
                  </p>
                )}
                <ul className="mt-5 border-t border-ink/10">
                  {section.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-baseline gap-3 border-b border-ink/10 py-3"
                    >
                      <span className="font-display text-lg leading-tight text-ink">
                        {item.name}
                      </span>
                      {item.yield && (
                        <span className="micro shrink-0 font-roman uppercase text-olive/45">
                          {item.yield}
                        </span>
                      )}
                      <span aria-hidden className="min-w-[1rem] flex-1">
                        <span className="block w-full border-b border-current opacity-15" />
                      </span>
                      <span className="shrink-0 font-roman text-sm tracking-[0.12em] text-olive/70">
                        {item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          {/* Service area */}
          <Reveal className="mx-auto mt-16 max-w-3xl text-center">
            <p className="eyebrow-lg font-roman uppercase text-terracotta">
              Where we deliver
            </p>
            <p className="mt-4 font-display text-xl leading-relaxed text-ink/80">
              {CATERING_AREA.join(" · ")}
            </p>
            <p className="mx-auto mt-3 max-w-xl font-body text-sm font-light leading-relaxed text-ink/50">
              And the surrounding Triangle. Delivery fees depend on distance and
              order size, and are confirmed with your quote.
            </p>
          </Reveal>

          {/* Custom / off-menu catering */}
          <Reveal className="mx-auto mt-16 max-w-2xl rounded-[2px] border border-olive/20 bg-cream-soft p-7 text-center sm:p-9">
            <p className="eyebrow-lg font-roman uppercase text-terracotta">
              {CATERING_CUSTOM_NOTE.title}
            </p>
            <p className="mx-auto mt-4 max-w-xl font-body text-[0.95rem] font-light leading-relaxed text-ink/65">
              {CATERING_CUSTOM_NOTE.body}
            </p>
          </Reveal>
        </section>

        {/* The inquiry — on olive, framed */}
        <section
          id="quote"
          className="frame-inset relative scroll-mt-16 overflow-hidden bg-olive-deep px-6 py-20 text-cream lg:py-28"
        >
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

          <div className="relative mx-auto max-w-2xl">
            <Reveal className="text-center">
              <p className="eyebrow-lg font-roman uppercase text-terracotta-soft">
                Request a quote
              </p>
              <h2 className="mt-5 font-display text-4xl font-medium text-cream lg:text-5xl">
                Let&apos;s set the table.
              </h2>
              <p className="mx-auto mt-5 max-w-md font-body text-base font-light leading-relaxed text-cream/70">
                Tell us about your event and we will build a menu and a quote
                around it. Prefer email? Reach us at {CATERING_EMAIL}.
              </p>
            </Reveal>

            <Reveal className="mt-12 rounded-[3px] bg-cream p-6 text-ink sm:p-9">
              <CateringForm />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
