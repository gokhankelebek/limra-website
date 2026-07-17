// Shared navigation mechanics for the menu page — the weighted glide
// and the scrollspy that the milestone rail, tabula index, and plumb
// rail all key off.

import { useEffect, useRef, useState, type RefObject } from "react";

/** weighted glide — easeInOutCubic, duration scaled by distance */
export function glideTo(targetY: number, onDone?: () => void) {
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
 * Scrollspy over the menu sections. `items` must be referentially
 * stable (RSC props are). While a click-glide is in flight the spy
 * stays quiet so the active state doesn't flicker en route.
 */
export function useScrollSpy<T extends { id: string }>(
  items: T[]
): {
  active: string | undefined;
  setActive: (id: string) => void;
  gliding: RefObject<boolean>;
} {
  const [active, setActive] = useState(items[0]?.id);
  const gliding = useRef(false);

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

  return { active, setActive, gliding };
}
