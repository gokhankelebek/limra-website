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
    <section
      aria-label="From the kitchen"
      className="grid grid-cols-3 gap-3 bg-cream px-4 py-10 sm:gap-5 sm:px-8 lg:gap-8 lg:px-16 lg:py-14"
    >
      {/* three arched windows — thresholds into the kitchen */}
      {dishes.map((dish) => (
        <Link
          key={dish.slug}
          href={`/menu/${dish.slug}`}
          className="group block"
        >
          <div className="rounded-t-full border border-olive/15 bg-cream p-1 sm:p-1.5">
            <div className="overflow-hidden rounded-t-full">
              <Image
                src={dish.image}
                placeholder="blur"
                blurDataURL={BLUR[dish.slug]}
                alt={dish.imageAlt}
                width={880}
                height={1170}
                sizes="33vw"
                className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}
