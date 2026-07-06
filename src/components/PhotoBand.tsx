import Image from "next/image";
import Link from "next/link";
import { findDish } from "@/data/menu";
import { BLUR } from "@/data/menu-blur";

const BAND_SLUGS = ["tantuni-wrap", "limra-loaded-fries", "iskender-platter"];

/**
 * Full-bleed appetite strip — three plates, edge to edge, no words.
 */
export default function PhotoBand() {
  const dishes = BAND_SLUGS.map((slug) => findDish(slug)).filter(
    (d): d is NonNullable<typeof d> => Boolean(d)
  );

  return (
    <section aria-label="From the kitchen" className="grid grid-cols-3 gap-1 bg-cream">
      {dishes.map((dish) => (
        <Link
          key={dish.slug}
          href={`/menu/${dish.slug}`}
          className="group block overflow-hidden"
        >
          <Image
            src={dish.image}
            placeholder="blur"
            blurDataURL={BLUR[dish.slug]}
            alt={dish.imageAlt}
            width={880}
            height={880}
            sizes="33vw"
            className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] md:aspect-[4/3]"
          />
        </Link>
      ))}
    </section>
  );
}
