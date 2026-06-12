"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";

type RailItem = { id: string; label: string };

/** weighted glide — easeInOutCubic, duration scaled by distance */
function glideTo(targetY: number, onDone?: () => void) {
  const startY = window.scrollY;
  const dist = targetY - startY;
  if (Math.abs(dist) < 2) return onDone?.();
  const duration = Math.min(1100, Math.max(650, Math.abs(dist) * 0.35));
  const ease = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  let start: number | null = null;
  const step = (ts: number) => {
    if (start === null) start = ts;
    const p = Math.min(1, (ts - start) / duration);
    window.scrollTo(0, startY + dist * ease(p));
    if (p < 1) requestAnimationFrame(step);
    else onDone?.();
  };
  requestAnimationFrame(step);
}

/**
 * Sticky category rail with scrollspy — anchors to menu sections,
 * marks the section currently in view.
 */
export default function MenuRail({ items }: { items: RailItem[] }) {
  const [active, setActive] = useState(items[0]?.id);
  // while a click-glide is in flight, the scrollspy stays quiet so the
  // active state doesn't flicker through every category passed en route
  const gliding = useRef(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (gliding.current) return;
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

  const handleClick = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    setActive(id);
    const railHeight = navRef.current?.offsetHeight ?? 56;
    const targetY = el.getBoundingClientRect().top + window.scrollY - railHeight;
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

  return (
    <nav
      ref={navRef}
      aria-label="Menu categories"
      className="sticky top-0 z-30 border-b border-olive/15 bg-cream/90 backdrop-blur"
    >
      {/* wraps to two centered rows on phones; single 56px line from sm up */}
      <div className="flex flex-wrap items-center justify-center gap-x-7 px-4 py-2 sm:h-14 sm:flex-nowrap sm:gap-10 sm:px-6 sm:py-0">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={handleClick(item.id)}
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
