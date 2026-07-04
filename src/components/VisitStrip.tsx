import Link from "next/link";
import Reveal from "./Reveal";
import { ADDRESS_LINES, CONTACT, DIRECTIONS_URL } from "@/data/contact";

/**
 * Home-page closing strip — where to find us and the two actions that
 * matter, on the deep olive ground.
 */
export default function VisitStrip() {
  return (
    <section className="bg-olive-deep px-6 py-24 text-center text-cream lg:py-28">
      <Reveal className="flex flex-col items-center">
        <p className="font-roman text-[0.7rem] uppercase tracking-[0.4em] text-terracotta-soft">
          Find us
        </p>
        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 inline-block"
        >
          <p className="font-display text-3xl font-medium leading-snug text-cream transition-colors group-hover:text-terracotta-soft sm:text-4xl">
            {ADDRESS_LINES[0]}
            <br />
            {ADDRESS_LINES[1]}
          </p>
        </a>
        <a
          href={CONTACT.phoneHref}
          className="mt-4 font-body text-lg font-light text-cream/75 transition-colors hover:text-terracotta-soft"
        >
          {CONTACT.phoneDisplay}
        </a>
        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/updates"
            className="rounded-full bg-cream px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-olive transition-colors hover:bg-cream-deep"
          >
            Get opening updates
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
  );
}
