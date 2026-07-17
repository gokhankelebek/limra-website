import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { allDishes } from "@/data/menu";
import { BLUR } from "@/data/menu-blur";

const RAIL_SLUGS = [
  "limra-platter",
  "tantuni-wrap",
  "aspendos-bowl",
  "limra-loaded-fries",
  "medi-taco",
  "iskender-platter",
];

type Dish = (typeof allDishes)[number];

function DishCard({ dish, sizes }: { dish: Dish; sizes: string }) {
  return (
    <>
      <div className="relative overflow-hidden rounded-[2px]">
        <Image
          src={dish.image}
          placeholder="blur"
          blurDataURL={BLUR[dish.slug]}
          alt={dish.imageAlt}
          width={560}
          height={700}
          sizes={sizes}
          className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
        />
      </div>
      <h3 className="mt-4 font-display text-xl leading-tight text-ink transition-colors group-hover:text-terracotta">
        {dish.name}
      </h3>
      <p className="label mt-1 font-roman uppercase text-olive/55">
        {dish.category.title}
      </p>
    </>
  );
}

function EndCard({ className }: { className?: string }) {
  return (
    <Link
      href="/menu"
      className={`group flex flex-col items-center justify-center rounded-[2px] bg-olive-deep text-center ${className ?? ""}`}
    >
      <span className="font-display text-2xl text-cream transition-colors group-hover:text-terracotta-soft">
        The full menu
      </span>
      <span className="mt-3 h-px w-10 bg-terracotta-soft transition-all group-hover:w-16" />
    </Link>
  );
}

/**
 * Home-page signature rail — a snap-scrolling strip of dish cards on
 * phones and tablets; a settled five-column spread from lg up.
 */
export default function MenuPreview() {
  const dishes = RAIL_SLUGS.map((slug) =>
    allDishes.find((d) => d.slug === slug)
  ).filter((d): d is NonNullable<typeof d> => Boolean(d));

  return (
    <section className="overflow-hidden bg-cream py-16 lg:py-24">
      <Reveal className="px-6 text-center">
        <p className="eyebrow-lg font-roman uppercase text-terracotta">
          The Table
        </p>
        <h2 className="mt-5 font-display text-5xl font-medium text-olive lg:text-6xl">
          Come hungry.
        </h2>
      </Reveal>

      <Reveal animation="anim-fade" delay="delay-2">
        {/* Snap rail — below lg */}
        <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [scrollbar-width:none] sm:px-10 lg:hidden [&::-webkit-scrollbar]:hidden">
          {dishes.map((dish) => (
            <Link
              key={dish.slug}
              href={`/menu/${dish.slug}`}
              className="group w-[240px] shrink-0 snap-start sm:w-[270px]"
            >
              <DishCard dish={dish} sizes="270px" />
            </Link>
          ))}
          <EndCard className="w-[240px] shrink-0 snap-start sm:w-[270px]" />
        </div>

        {/* Static spread — lg and up, no horizontal scroll */}
        <div className="mx-auto mt-10 hidden max-w-6xl grid-cols-5 gap-5 px-10 lg:grid">
          {dishes.slice(0, 4).map((dish) => (
            <Link
              key={dish.slug}
              href={`/menu/${dish.slug}`}
              className="group block"
            >
              <DishCard dish={dish} sizes="(min-width: 1024px) 18vw, 270px" />
            </Link>
          ))}
          <EndCard className="aspect-[4/5]" />
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
