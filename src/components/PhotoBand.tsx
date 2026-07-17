import Image from "next/image";
import Link from "next/link";
import Medallion from "./Medallion";
import Reveal from "./Reveal";
import { findDish } from "@/data/menu";
import { BLUR } from "@/data/menu-blur";

const BAND_SLUGS = ["tantuni-wrap", "iskender-platter"];

/**
 * Full-bleed appetite strip — two plates flanking a quiet typographic
 * tile, edge to edge.
 */
export default function PhotoBand() {
  const dishes = BAND_SLUGS.map((slug) => findDish(slug)).filter(
    (d): d is NonNullable<typeof d> => Boolean(d)
  );
  const [first, second] = dishes;

  const photo = (dish: NonNullable<typeof first>) => (
    <Reveal animation="anim-unveil">
      <Link href={`/menu/${dish.slug}`} className="group block overflow-hidden">
        <Image
          src={dish.image}
          placeholder="blur"
          blurDataURL={BLUR[dish.slug]}
          alt={dish.imageAlt}
          width={880}
          height={880}
          sizes="33vw"
          className="aspect-square w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04] md:aspect-[4/3]"
        />
      </Link>
    </Reveal>
  );

  return (
    <section
      aria-label="From the kitchen"
      className="grid grid-cols-3 gap-1 bg-cream"
    >
      {first && photo(first)}

      {/* Editorial break — the band takes a breath between plates */}
      <Reveal animation="anim-fade">
        <div className="flex aspect-square w-full flex-col items-center justify-center gap-3 bg-cream-deep px-3 text-center text-olive sm:gap-4 md:aspect-[4/3]">
          <Medallion className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10" />
          <p className="font-display text-base italic leading-snug sm:text-2xl lg:text-3xl">
            From the spit, all day.
          </p>
        </div>
      </Reveal>

      {second && photo(second)}
    </section>
  );
}
