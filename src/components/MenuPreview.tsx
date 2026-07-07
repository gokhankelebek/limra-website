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
              className="group w-[220px] shrink-0 snap-start pb-4 text-center sm:w-[250px]"
            >
              {/* the plate — round crop ringed like the seal, price tag on the rim */}
              <div className="relative mx-auto w-full">
                <div className="rounded-full border border-olive/20 bg-cream p-1.5">
                  <div className="overflow-hidden rounded-full">
                    <Image
                      src={dish.image}
                      placeholder="blur"
                      blurDataURL={BLUR[dish.slug]}
                      alt={dish.imageAlt}
                      width={560}
                      height={560}
                      sizes="250px"
                      className="aspect-square w-full rounded-full object-cover transition-transform duration-500 group-hover:rotate-2 group-hover:scale-[1.05]"
                    />
                  </div>
                </div>
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-terracotta px-3 py-1 font-roman text-[0.64rem] tracking-[0.12em] text-cream">
                  {dish.price}
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl leading-tight text-ink transition-colors group-hover:text-terracotta">
                {dish.name}
              </h3>
              <p className="mt-1 font-roman text-[0.56rem] uppercase tracking-[0.24em] text-olive/55">
                {dish.category.title}
              </p>
            </Link>
          ))}

          {/* end plate — the invitation to keep going */}
          <Link
            href="/menu"
            className="group flex w-[220px] shrink-0 snap-start flex-col items-center justify-center pb-4 text-center sm:w-[250px]"
          >
            <span className="flex aspect-square w-full flex-col items-center justify-center rounded-full border border-olive/20 transition-colors group-hover:border-olive/40">
              <span className="font-display text-2xl text-olive transition-colors group-hover:text-terracotta">
                The full menu
              </span>
              <span className="mt-3 h-px w-10 bg-terracotta transition-all group-hover:w-16" />
            </span>
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
