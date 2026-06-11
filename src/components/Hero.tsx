import Link from "next/link";
import Medallion from "./Medallion";
import Wordmark from "./Wordmark";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cream">
      {/* Faint meander watermark — stands in for the DOKU texture / future hero film */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
      >
        <Medallion
          className="absolute -right-40 top-1/2 h-[120vh] w-[120vh] -translate-y-1/2 text-olive"
          color="currentColor"
        />
      </div>

      {/* Hairline frame for an architectural, "stone-set" feel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-5 border border-olive/15 lg:inset-8"
      />

      <div className="relative z-10 flex flex-col items-center px-6 text-center text-olive">
        <Medallion
          animate
          variant="seal"
          className="mb-9 h-24 w-24 text-olive lg:h-28 lg:w-28"
          title="Limra meander seal"
        />

        <p className="anim-rise delay-1 font-roman text-[0.7rem] uppercase tracking-[0.42em] text-terracotta lg:text-xs">
          Mediterranean Restaurant
        </p>

        <h1 className="anim-rise delay-2 mt-8">
          <span className="sr-only">Limra</span>
          <Wordmark
            aria-hidden
            className="w-52 text-olive sm:w-64 lg:w-80"
          />
        </h1>

        <p className="anim-rise delay-3 mt-6 max-w-xl font-body text-lg font-light italic leading-relaxed text-ink/80 lg:text-xl">
          A modern Mediterranean table, named for an ancient city.
        </p>

        <div className="anim-rise delay-4 mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/reserve"
            className="rounded-full bg-olive px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-cream transition-colors hover:bg-olive-deep"
          >
            Reserve a table
          </Link>
          <Link
            href="/order"
            className="rounded-full border border-olive/40 px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-olive transition-colors hover:border-olive hover:bg-olive hover:text-cream"
          >
            Order online
          </Link>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="anim-fade delay-5 absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-olive/60">
        <span className="font-roman text-[0.6rem] uppercase tracking-[0.3em]">
          Discover
        </span>
        <span className="h-10 w-px bg-olive/30" />
      </div>
    </section>
  );
}
