"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Plays one of the existing entrance animations when the element first
 * scrolls into view. Reduced-motion users see content immediately.
 */
export default function Reveal({
  children,
  animation = "anim-rise",
  delay,
  className,
}: {
  children: ReactNode;
  animation?: "anim-rise" | "anim-rise-lg" | "anim-rise-sm" | "anim-fade" | "anim-unveil";
  delay?: "delay-1" | "delay-2" | "delay-3" | "delay-4" | "delay-5";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const classes = shown
    ? [animation, delay, className].filter(Boolean).join(" ")
    : ["opacity-0", className].filter(Boolean).join(" ");

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
}
