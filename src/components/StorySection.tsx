import Link from "next/link";
import Medallion from "./Medallion";
import ScrollRotate from "./ScrollRotate";

export default function StorySection() {
  return (
    <section className="relative overflow-hidden bg-olive-deep text-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.06]"
      >
        <div className="absolute -left-32 -top-32 h-[80vh] w-[80vh]">
          <ScrollRotate speed={-0.015} className="h-full w-full">
            <Medallion className="h-full w-full text-cream" />
          </ScrollRotate>
        </div>
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-28 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-10 lg:py-36">
        <div>
          <p className="font-roman text-[0.7rem] uppercase tracking-[0.4em] text-terracotta-soft">
            The name
          </p>
          <h2 className="mt-6 font-display text-5xl font-medium leading-[1.05] text-cream lg:text-6xl">
            An ancient city,
            <br />
            a modern table.
          </h2>
          <p className="mt-7 max-w-md font-body text-lg font-light leading-relaxed text-cream/75">
            Limyra rose in stone on the Mediterranean coast — a city built for
            gathering, trade, and the long ritual of a shared meal. We borrow its
            name and its rhythm: honest ingredients, open fire, and a room made
            for lingering.
          </p>
          <Link
            href="/story"
            className="group mt-9 inline-flex items-center gap-3 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-cream transition-colors hover:text-terracotta-soft"
          >
            Read the story
            <span className="h-px w-10 bg-current transition-all group-hover:w-14" />
          </Link>
        </div>

        <div className="flex justify-center lg:justify-end">
          <Medallion
            className="h-64 w-64 text-cream/90 lg:h-80 lg:w-80"
            title="Limra meander seal"
          />
        </div>
      </div>
    </section>
  );
}
