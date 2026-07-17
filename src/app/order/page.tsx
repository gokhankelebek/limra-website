import type { Metadata } from "next";
import Link from "next/link";
import Medallion from "@/components/Medallion";
import Reveal from "@/components/Reveal";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { CONTACT } from "@/data/contact";

export const metadata: Metadata = {
  title: {
    absolute: "Order Online — Limra Mediterranean · Holly Springs, NC",
  },
  description:
    "Online ordering from Limra Mediterranean begins the day the doors open in Holly Springs, NC. For catering and large gatherings, call us.",
  alternates: { canonical: "/order" },
};

export default function OrderPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1 bg-cream">
        <div className="px-6 pb-28 pt-40 text-center text-olive">
          <Reveal delay="delay-1" className="flex justify-center">
            <Medallion className="h-16 w-16" />
          </Reveal>
          <Reveal delay="delay-2">
            <p className="eyebrow-lg mt-8 font-roman uppercase text-terracotta">
              Order online
            </p>
          </Reveal>
          <Reveal animation="anim-rise-lg" delay="delay-3">
            <h1 className="mt-5 font-display text-5xl font-medium lg:text-6xl">
              The counter opens this summer.
            </h1>
          </Reveal>
          <Reveal delay="delay-4">
            <p className="mx-auto mt-6 max-w-md font-body text-lg font-light italic leading-relaxed text-ink/70">
              Online ordering begins the day the doors open. For catering and
              large gatherings, call us.
            </p>
          </Reveal>
          <Reveal delay="delay-5">
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={CONTACT.phoneHref}
                className="rounded-[2px] bg-terracotta px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-cream transition-colors hover:bg-terracotta-deep"
              >
                Call us
              </a>
              <Link
                href="/menu"
                className="rounded-[2px] border border-olive/40 px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-olive transition-colors hover:border-olive hover:bg-olive hover:text-cream"
              >
                See the menu
              </Link>
            </div>
          </Reveal>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
