"use client";

import type { MouseEvent } from "react";
import { glideTo } from "@/lib/menu-nav";

type IndexItem = {
  id: string;
  numeral: string;
  title: string;
  anticipation?: boolean;
};

/**
 * The tabula — a carved index of the six courses set into the masthead.
 * Cells glide to their sections; V and VI carry a quiet "At opening".
 */
export default function MenuIndex({ items }: { items: IndexItem[] }) {
  const handleClick = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    // 48px clears the sticky milestone rail
    const targetY = el.getBoundingClientRect().top + window.scrollY - 48;
    const finish = () => history.replaceState(null, "", `#${id}`);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo(0, targetY);
      finish();
      return;
    }
    glideTo(targetY, finish);
  };

  return (
    <>
      {/* Carved grid — 1px mortar joints between cells */}
      <div className="hidden border-y border-olive/20 sm:block">
        <div className="grid grid-cols-3 gap-px bg-olive/15 lg:grid-cols-6">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={handleClick(item.id)}
              className="group flex flex-col items-center justify-start bg-cream px-4 py-8 text-center transition-colors hover:bg-cream-deep/60"
            >
              <span className="block font-display text-5xl leading-none text-olive transition-colors group-hover:text-terracotta lg:text-6xl">
                {item.numeral}
              </span>
              <span className="label mt-3 block font-roman uppercase text-olive/60">
                {item.title}
              </span>
              {item.anticipation && (
                <span className="micro mt-2 block font-roman uppercase text-terracotta">
                  At opening
                </span>
              )}
            </a>
          ))}
        </div>
      </div>

      {/* Vertical index — phones */}
      <div className="divide-y divide-olive/15 border-y border-olive/20 sm:hidden">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={handleClick(item.id)}
            className="flex items-baseline gap-4 px-1 py-4"
          >
            <span className="w-10 shrink-0 font-display text-3xl leading-none text-olive">
              {item.numeral}
            </span>
            <span className="label flex-1 font-roman uppercase text-olive/70">
              {item.title}
            </span>
            {item.anticipation && (
              <span className="micro shrink-0 font-roman uppercase text-terracotta">
                At opening
              </span>
            )}
          </a>
        ))}
      </div>
    </>
  );
}
