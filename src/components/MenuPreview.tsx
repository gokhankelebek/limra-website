import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { allDishes } from "@/data/menu";
import { BLUR } from "@/data/menu-blur";

const RAIL_SLUGS = [
  "limra-platter",
  "tantuni-wrap",
  "apendos-bowl",
  "limra-loaded-fries",
  "medi-taco",
  "iskender-platter",
];

/**
 * Home-page signature rail — a snap-scrolling strip of dish cards.
 * Appetite first; flick through on a phone like a counter display.
 */
export default function MenuPreview() {
  const dishes = RAIL_SLUGS.map((slug) =>
    allDishes.find((d) => d.slug === slug)
  ).filter((d): d is NonNullable<typeof d> => Boolean(d));

  return (
    <section className="overflow-hidden bg-cream py-16 lg:py-24">
      <Reveal className="px-6 text-center">
        <p className="font-roman text-[0.7rem] uppercase tracking-[0.4em] text-terracotta">
          The Table
        </p>
        <h2 className="mt-5 font-display text-5xl font-medium text-olive lg:text-6xl">
          Come hungry.
        </h2>
      </Reveal>

      <Reveal animation="anim-fade" delay="delay-2">
        <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [scrollbar-width:none] sm:px-10 lg:px-16 [&::-webkit-scrollbar]:hidden">
          {dishes.map((dish) => (
            <Link
              key={dish.slug}
              href={`/menu/${dish.slug}`}
              className="group w-[240px] shrink-0 snap-start sm:w-[270px]"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src={dish.image}
                  placeholder="blur"
                  blurDataURL={BLUR[dish.slug]}
                  alt={dish.imageAlt}
                  width={560}
                  height={700}
                  sizes="270px"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
                <span className="absolute right-3 top-3 rounded-full bg-terracotta px-3 py-1 font-roman text-[0.64rem] tracking-[0.12em] text-cream">
                  {dish.price}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl leading-tight text-ink transition-colors group-hover:text-terracotta">
                {dish.name}
              </h3>
              <p className="mt-1 font-roman text-[0.56rem] uppercase tracking-[0.24em] text-olive/55">
                {dish.category.title}
              </p>
            </Link>
          ))}

          {/* end card — the invitation to keep going */}
          <Link
            href="/menu"
            className="group flex w-[240px] shrink-0 snap-start flex-col items-center justify-center rounded-2xl bg-olive-deep text-center sm:w-[270px]"
          >
            <span className="font-display text-2xl text-cream transition-colors group-hover:text-terracotta-soft">
              The full menu
            </span>
            <span className="mt-3 h-px w-10 bg-terracotta-soft transition-all group-hover:w-16" />
          </Link>
        </div>
      </Reveal>

      <Reveal className="mt-8 px-6 text-center">
        <Link
          href="/menu"
          className="group inline-flex items-center gap-3 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-olive transition-colors hover:text-terracotta"
        >
          View the full menu
          <span className="h-px w-10 bg-current transition-all group-hover:w-14" />
        </Link>
      </Reveal>
    </section>
  );
}
