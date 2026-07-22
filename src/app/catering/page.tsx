import type { Metadata } from "next";
import Image from "next/image";
import CateringForm from "@/components/CateringForm";
import JsonLd from "@/components/JsonLd";
import Medallion from "@/components/Medallion";
import Reveal from "@/components/Reveal";
import ScrollRotate from "@/components/ScrollRotate";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { CATERING_MENU } from "@/data/catering";
import { CONTACT } from "@/data/contact";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Catering · Limra Mediterranean · Holly Springs, NC",
  },
  description:
    "Mediterranean catering in Holly Springs, NC. Beef and chicken döner by the pound, mezze, salads, and dessert for gatherings of ten and up. Request a quote from Limra.",
  alternates: { canonical: "/catering" },
};

const CATERING_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Catering",
  name: "Limra Mediterranean Catering",
  areaServed: "Holly Springs, North Carolina",
  provider: {
    "@type": "Restaurant",
    name: "Limra Mediterranean Restaurant",
    telephone: "+1-984-999-5388",
    url: SITE_URL,
  },
  url: `${SITE_URL}/catering`,
};

/** How the three how-it-works steps read. */
const STEPS = [
  {
    n: "I",
    h: "Tell us the table",
    p: "The occasion, the head count, the date. Ten guests or two hundred.",
  },
  {
    n: "II",
    h: "We shape the menu",
    p: "Proteins by the pound, mezze and salads by the tray, dessert to finish.",
  },
  {
    n: "III",
    h: "We bring it",
    p: "Cooked the day of and delivered to your table, ready to serve.",
  },
];

export default function CateringPage() {
  return (
    <>
      <JsonLd data={CATERING_SCHEMA} />
      <SiteHeader />
      <main id="main" className="flex-1 bg-cream">
        {/* Masthead over the ink-and-wash city */}
        <div className="relative overflow-hidden px-6 pb-20 pt-36 text-center text-olive">
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
              <p className="mx-auto mt-6 max-w-md font-body text-lg font-light italic leading-relaxed text-ink/70">
                Beyond our doors, the spit travels. Celebrations, gatherings,
                the long shared meal, brought to your table.
              </p>
            </Reveal>
          </div>
        </div>

        {/* How it works */}
        <section className="bg-cream px-6 pb-8">
          <div className="mx-auto grid max-w-4xl gap-10 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal
                key={s.n}
                delay={(["delay-1", "delay-2", "delay-3"] as const)[i]}
                className="text-center"
              >
                <p className="font-display text-4xl text-olive/25">{s.n}</p>
                <h2 className="mt-3 font-display text-2xl text-ink">{s.h}</h2>
                <p className="mx-auto mt-2 max-w-xs font-body text-[0.95rem] font-light leading-relaxed text-ink/60">
                  {s.p}
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
        </section>

        {/* The inquiry — on olive, framed */}
        <section className="frame-inset relative overflow-hidden bg-olive-deep px-6 py-20 text-cream lg:py-28">
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
                around it. For the soonest reply, call {CONTACT.phoneDisplay}.
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
