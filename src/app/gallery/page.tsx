import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Medallion from "@/components/Medallion";
import Reveal from "@/components/Reveal";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { allDishes } from "@/data/menu";

export const metadata: Metadata = {
  title: {
    absolute: "Gallery | Limra Mediterranean — Holly Springs, NC",
  },
  description:
    "The plates of Limra, photographed as they leave the pass — döner platters, wraps, bowls, and more from the modern Mediterranean table in Holly Springs.",
  alternates: { canonical: "/gallery" },
};

const STAGGER = ["delay-1", "delay-2", "delay-3"] as const;

export default function GalleryPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1 bg-cream">
        {/* Masthead */}
        <div className="px-6 pb-16 pt-36 text-center text-olive">
          <Reveal delay="delay-1" className="flex justify-center">
            <Medallion className="h-14 w-14" />
          </Reveal>
          <Reveal delay="delay-2">
            <p className="mt-8 font-roman text-[0.7rem] uppercase tracking-[0.42em] text-terracotta">
              The Plates
            </p>
          </Reveal>
          <Reveal delay="delay-3">
            <h1 className="mt-5 font-display text-6xl font-medium lg:text-7xl">
              Gallery
            </h1>
          </Reveal>
          <Reveal delay="delay-4">
            <p className="mx-auto mt-6 max-w-md font-body text-lg font-light italic leading-relaxed text-ink/70">
              The plates, as they leave the pass.
            </p>
          </Reveal>
        </div>

        {/* Grid */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {allDishes.map((dish, i) => (
              <Reveal
                key={dish.slug}
                animation="anim-fade"
                delay={STAGGER[i % STAGGER.length]}
              >
                <Link href={`/menu/${dish.slug}`} className="group block">
                  <div className="overflow-hidden border border-olive/15 p-1.5">
                    <div className="overflow-hidden">
                      <Image
                        src={dish.image}
                        alt={dish.imageAlt}
                        width={880}
                        height={660}
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 370px"
                        className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <h2 className="font-display text-2xl text-ink transition-colors group-hover:text-terracotta">
                      {dish.name}
                    </h2>
                    <p className="mt-1 font-roman text-[0.62rem] uppercase tracking-[0.28em] text-olive/55">
                      {dish.category.title}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Closing */}
        <section className="bg-olive-deep px-6 py-24 text-center text-cream">
          <Reveal className="flex flex-col items-center">
            <Medallion variant="seal" className="h-16 w-16 text-cream" />
            <p className="mt-7 max-w-md font-body text-xl font-light italic leading-relaxed text-cream/80">
              Better in person.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
              <Link
                href="/menu"
                className="rounded-full bg-cream px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-olive transition-colors hover:bg-cream-deep"
              >
                View the menu
              </Link>
              <Link
                href="/visit"
                className="rounded-full border border-cream/40 px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-cream transition-colors hover:border-cream hover:bg-cream hover:text-olive"
              >
                Plan your visit
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
