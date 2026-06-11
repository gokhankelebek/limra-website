"use client";

import { useEffect, useState } from "react";

type RailItem = { id: string; label: string };

/**
 * Sticky category rail with scrollspy — anchors to menu sections,
 * marks the section currently in view.
 */
export default function MenuRail({ items }: { items: RailItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // pick the entry nearest the top band of the viewport
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Menu categories"
      className="sticky top-0 z-30 border-b border-olive/15 bg-cream/90 backdrop-blur"
    >
      <div className="flex h-14 items-center justify-start gap-7 overflow-x-auto px-6 [scrollbar-width:none] sm:justify-center sm:gap-10 [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={isActive ? "true" : undefined}
              className={`relative shrink-0 whitespace-nowrap py-2 font-roman text-[0.68rem] uppercase tracking-[0.28em] transition-colors ${
                isActive
                  ? "text-terracotta"
                  : "text-olive/55 hover:text-olive"
              }`}
            >
              {item.label}
              <span
                aria-hidden
                className={`absolute -bottom-px left-0 h-px w-full bg-terracotta transition-opacity ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />
            </a>
          );
        })}
      </div>
    </nav>
  );
}
