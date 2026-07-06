import type { Metadata } from "next";
import Link from "next/link";
import Medallion from "@/components/Medallion";
import NotifyForm from "@/components/NotifyForm";
import Reveal from "@/components/Reveal";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: {
    absolute: "Opening Updates | Limra Mediterranean — Holly Springs, NC",
  },
  description:
    "Limra opens this summer in Holly Springs, NC. Leave your email for a quiet note when the doors open — and an invitation to the soft-opening tasting.",
  alternates: { canonical: "/updates" },
};

export default function UpdatesPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1 bg-cream">
        {/* Masthead */}
        <div className="px-6 pb-16 pt-36 text-center text-olive">
          <Reveal delay="delay-1" className="flex justify-center">
            <Medallion animate variant="seal" className="h-16 w-16" />
          </Reveal>
          <Reveal delay="delay-2">
            <p className="mt-8 font-roman text-[0.7rem] uppercase tracking-[0.42em] text-terracotta">
              Opening this summer
            </p>
          </Reveal>
          <Reveal delay="delay-3">
            <h1 className="mt-5 font-display text-6xl font-medium lg:text-7xl">
              Be among the first
            </h1>
          </Reveal>
          <Reveal delay="delay-4">
            <p className="mx-auto mt-6 max-w-md font-body text-lg font-light italic leading-relaxed text-ink/70">
              A quiet note when the doors open — and an invitation to the
              soft-opening tasting.
            </p>
          </Reveal>
        </div>

        {/* Capture */}
        <section className="px-6 pb-24">
          <Reveal>
            <NotifyForm />
          </Reveal>
        </section>

        {/* While you wait */}
        <section className="bg-olive-deep px-6 py-16 text-center text-cream lg:py-20">
          <Reveal className="flex flex-col items-center">
            <Medallion className="h-14 w-14 text-cream" />
            <p className="mt-7 max-w-md font-body text-xl font-light italic leading-relaxed text-cream/80">
              While you wait, the table is already set.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
              <Link
                href="/menu"
                className="rounded-full bg-terracotta px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-cream transition-colors hover:bg-terracotta-deep"
              >
                See the menu
              </Link>
              <Link
                href="/story"
                className="rounded-full border border-cream/40 px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-cream transition-colors hover:border-cream hover:bg-cream hover:text-olive"
              >
                Read our story
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
