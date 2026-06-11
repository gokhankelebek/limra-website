"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Rotates its child in proportion to page scroll — the medallion as a
 * slow stone wheel. Degrees per scrolled pixel is deliberately tiny;
 * the motion should be felt more than noticed.
 */
export default function ScrollRotate({
  children,
  speed = 0.02,
  className,
}: {
  children: ReactNode;
  /** degrees of rotation per scrolled pixel (negative = counter-clockwise) */
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `rotate(${window.scrollY * speed}deg)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
