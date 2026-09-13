"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

// prefers-reduced-motion as an external store, so honoring it never needs a
// setState inside an effect.
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
const getReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches;
const getServerReducedMotion = () => false;

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
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
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
  }, [reducedMotion]);

  const classes = shown || reducedMotion
    ? [animation, delay, className].filter(Boolean).join(" ")
    : ["opacity-0", className].filter(Boolean).join(" ");

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
}
