import Link from "next/link";
import Reveal from "./Reveal";
import { menu } from "@/data/menu";

const STAGGER = ["delay-1", "delay-2", "delay-3", "delay-4"] as const;

/**
 * Home-page taste of the menu — the signature dish from each category,
 * linking through to the full editorial menu.
 */
export default function MenuPreview() {
  const signatures = menu.flatMap((category) =>
    category.items
      .filter((item) => item.featured)
      .map((item) => ({ ...item, category: category.title }))
  );

  return (
    <section className="bg-cream px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-4xl">
        <Reveal className="text-center">
          <p className="font-roman text-[0.7rem] uppercase tracking-[0.4em] text-terracotta">
            The table
          </p>
          <h2 className="mt-5 font-display text-5xl font-medium text-olive lg:text-6xl">
            A first taste.
          </h2>
        </Reveal>

        <div className="mx-auto mt-10 max-w-xl">
          {signatures.map((dish, i) => (
            <Reveal
              key={dish.slug}
              animation="anim-fade"
              delay={STAGGER[i % STAGGER.length]}
            >
              <Link
                href={`/menu/${dish.slug}`}
                className="group block px-4 py-8 text-center"
              >
                <p className="font-roman text-[0.6rem] uppercase tracking-[0.3em] text-olive/50">
                  {dish.category}
                </p>
                <h3 className="mt-3 font-display text-3xl text-ink transition-colors group-hover:text-terracotta">
                  {dish.name}
                </h3>
                <p className="mx-auto mt-3 max-w-md font-body text-base font-light italic leading-relaxed text-ink/65">
                  {dish.description}
                </p>
                <p className="mt-4 font-roman text-sm tracking-[0.18em] text-olive/60">
                  {dish.price}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 text-center">
          <Link
            href="/menu"
            className="group inline-flex items-center gap-3 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-olive transition-colors hover:text-terracotta"
          >
            View the full menu
            <span className="h-px w-10 bg-current transition-all group-hover:w-14" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
