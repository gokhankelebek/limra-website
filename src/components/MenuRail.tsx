"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { glideTo, useScrollSpy } from "@/lib/menu-nav";

type RailItem = {
  id: string;
  numeral: string;
  title: string;
  shortLabel: string;
};

/**
 * Milestone rail — a slim sticky course marker. The active category's
 * short name sits at the left; the six numerals wait at the right under
 * a sliding terracotta underline.
 */
export default function MenuRail({ items }: { items: RailItem[] }) {
  const { active, setActive, gliding } = useScrollSpy(items);
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const barRef = useRef<HTMLSpanElement>(null);

  // Slide the underline to the active numeral. DOM-driven so the CSS
  // transition carries the motion; re-placed on resize.
  useEffect(() => {
    const place = () => {
      const el = active ? linkRefs.current[active] : null;
      const bar = barRef.current;
      if (!el || !bar) return;
      bar.style.left = `${el.offsetLeft}px`;
      bar.style.width = `${el.offsetWidth}px`;
      bar.style.opacity = "1";
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  const handleClick = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    setActive(id);
    const railHeight = navRef.current?.offsetHeight ?? 48;
    const targetY =
      el.getBoundingClientRect().top + window.scrollY - railHeight;
    const finish = () => {
      history.replaceState(null, "", `#${id}`);
      gliding.current = false;
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo(0, targetY);
      finish();
      return;
    }
    gliding.current = true;
    glideTo(targetY, finish);
  };

  const activeItem = items.find((i) => i.id === active);

  return (
    <nav
      ref={navRef}
      aria-label="Menu categories"
      className="sticky top-0 z-30 h-12 border-b border-olive/15 bg-cream/90 backdrop-blur"
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Active course — crossfades on change */}
        <span
          key={active}
          className="label anim-fade font-roman uppercase text-olive"
          style={{ animationDuration: "300ms" }}
        >
          {activeItem?.shortLabel}
        </span>

        {/* Numerals + sliding underline */}
        <div className="relative flex items-center gap-5 sm:gap-7">
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                ref={(el) => {
                  linkRefs.current[item.id] = el;
                }}
                href={`#${item.id}`}
                onClick={handleClick(item.id)}
                aria-current={isActive ? "true" : undefined}
                aria-label={item.title}
                className={`py-3.5 font-roman text-[0.7rem] tracking-[0.2em] transition-colors ${
                  isActive ? "text-terracotta" : "text-olive/45 hover:text-olive"
                }`}
              >
                {item.numeral}
              </a>
            );
          })}
          <span
            ref={barRef}
            aria-hidden
            className="absolute bottom-0 left-0 h-px w-0 bg-terracotta opacity-0 transition-[left,width] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          />
        </div>
      </div>
    </nav>
  );
}
