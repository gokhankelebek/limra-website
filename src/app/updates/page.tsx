import type { Metadata } from "next";
import Link from "next/link";
import Medallion from "@/components/Medallion";
import NotifyForm from "@/components/NotifyForm";
import Reveal from "@/components/Reveal";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: {
    absolute: "Opening Updates · Limra Mediterranean · Holly Springs, NC",
  },
  description:
    "Limra opens this summer in Holly Springs, NC. Leave your email for a quiet note when the doors open, plus an invitation to the soft-opening tasting.",
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
            <p className="eyebrow-lg mt-8 font-roman uppercase text-terracotta">
              Opening this summer
            </p>
          </Reveal>
          <Reveal animation="anim-rise-lg" delay="delay-3">
            <h1 className="mt-5 font-display text-6xl font-medium lg:text-7xl">
              Be among the first
            </h1>
          </Reveal>
          <Reveal delay="delay-4">
            <p className="mx-auto mt-6 max-w-md font-body text-lg font-light italic leading-relaxed text-ink/70">
              The soft-opening tasting is invitation-only. Invitations come
              from this list, then a quiet note when the doors open.
            </p>
          </Reveal>
          <Reveal delay="delay-5">
            <p className="mx-auto mt-4 max-w-md font-body text-sm font-light leading-relaxed text-ink/55">
              Online ordering and reservations open with the doors. The list
              hears first.
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
        <section className="frame-inset bg-olive-deep px-6 py-16 text-center text-cream lg:py-20">
          <Reveal className="flex flex-col items-center">
            <Medallion className="h-14 w-14 text-cream" />
            <p className="pull-quote mt-7 max-w-md text-cream/80">
              The wait is short. The story is long.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
              <Link
                href="/menu"
                className="rounded-[2px] bg-terracotta px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-cream transition-colors hover:bg-terracotta-deep"
              >
                See the menu
              </Link>
              <Link
                href="/story"
                className="rounded-[2px] border border-cream/40 px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-cream transition-colors hover:border-cream hover:bg-cream hover:text-olive"
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
