import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Medallion from "@/components/Medallion";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Off the map",
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1 bg-cream">
        <div className="relative overflow-hidden px-6 pb-28 pt-40 text-center text-olive">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-25">
            <Image
              src="/limra-city.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-[70%_35%]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-cream/60 via-cream/30 to-cream" />
          </div>
          <div className="relative">
          <div className="flex justify-center">
            <Medallion className="h-16 w-16" />
          </div>
          <p className="eyebrow-lg mt-8 font-roman uppercase text-terracotta">
            Off the map
          </p>
          <h1 className="mt-5 font-display text-5xl font-medium lg:text-6xl">
            This page isn&apos;t on the map.
          </h1>
          <p className="mx-auto mt-6 max-w-md font-body text-lg font-light italic leading-relaxed text-ink/70">
            Roads change. The table doesn&apos;t.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="rounded-[2px] bg-terracotta px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-cream transition-colors hover:bg-terracotta-deep"
            >
              Back to the table
            </Link>
            <Link
              href="/menu"
              className="rounded-[2px] border border-olive/40 px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-olive transition-colors hover:border-olive hover:bg-olive hover:text-cream"
            >
              See the menu
            </Link>
          </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
