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

        <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {signatures.map((dish, i) => (
            <Reveal
              key={dish.name}
              animation="anim-fade"
              delay={STAGGER[i % STAGGER.length]}
            >
              <div className="border-t border-olive/15 pt-6">
                <div className="flex items-baseline justify-between gap-6">
                  <h3 className="font-display text-2xl text-ink">
                    {dish.name}
                  </h3>
                  <p className="shrink-0 font-roman text-sm tracking-[0.12em] text-olive/70">
                    {dish.price}
                  </p>
                </div>
                <p className="mt-2 font-body text-[0.95rem] font-light leading-relaxed text-ink/65">
                  {dish.description}
                </p>
                <p className="mt-3 font-roman text-[0.6rem] uppercase tracking-[0.3em] text-olive/50">
                  {dish.category}
                </p>
              </div>
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
