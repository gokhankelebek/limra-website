"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { glideTo, useScrollSpy } from "@/lib/menu-nav";

type PlumbItem = {
  id: string;
  numeral: string;
  title: string;
  surface: "cream" | "olive";
};

/**
 * Desktop plumb line — a fixed vertical track at the left margin with a
 * terracotta fill driven by scroll progress and the six numerals as
 * stations. Hidden below xl so it never crowds the text column.
 */
export default function MenuPlumbRail({ items }: { items: PlumbItem[] }) {
  const { active, setActive, gliding } = useScrollSpy(items);
  const fillRef = useRef<HTMLSpanElement>(null);

  // Scroll-progress fill — direct rAF-driven transform, no transition.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (fillRef.current) fillRef.current.style.transform = `scaleY(${p})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handleClick = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    setActive(id);
    const targetY = el.getBoundingClientRect().top + window.scrollY - 48;
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

  // Numerals adapt to the surface currently behind the rail.
  const activeSurface =
    items.find((i) => i.id === active)?.surface ?? "cream";

  return (
    <div
      className={`fixed left-8 top-1/2 z-30 hidden -translate-y-1/2 transition-colors duration-500 xl:block ${
        activeSurface === "olive" ? "text-cream" : "text-olive"
      }`}
    >
      <nav aria-label="Menu progress" className="flex h-[300px] gap-3">
        {/* track + fill */}
        <span aria-hidden className="relative block h-full w-px">
          <span className="absolute inset-0 bg-current opacity-20" />
          <span
            ref={fillRef}
            className="absolute inset-0 origin-top bg-terracotta"
            style={{ transform: "scaleY(0)" }}
          />
        </span>
        {/* stations */}
        <div className="flex h-full flex-col justify-between">
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={handleClick(item.id)}
                aria-current={isActive ? "true" : undefined}
                aria-label={item.title}
                className={`font-roman text-[0.66rem] leading-none tracking-[0.2em] transition-colors ${
                  isActive
                    ? "text-terracotta"
                    : "opacity-50 hover:opacity-90"
                }`}
              >
                {item.numeral}
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
