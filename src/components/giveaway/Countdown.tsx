"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  /** Target instant, ms since epoch */
  target: number;
  /** Server clock at render, so the first client render matches the HTML */
  serverNow: number;
  label: string;
};

function split(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Ticking countdown. The server decides which instant we count toward; the
 * client only keeps the digits moving. When it reaches zero it asks the
 * server to re-render once, so the page flips phase without a reload.
 */
export default function Countdown({ target, serverNow, label }: Props) {
  const [remaining, setRemaining] = useState(target - serverNow);
  const router = useRouter();
  const refreshed = useRef(false);

  // The first paint uses the server's clock; the interval takes over from
  // there (no synchronous setState inside the effect).
  useEffect(() => {
    const id = window.setInterval(
      () => setRemaining(target - Date.now()),
      1000
    );
    return () => window.clearInterval(id);
  }, [target]);

  useEffect(() => {
    if (remaining <= 0 && !refreshed.current) {
      refreshed.current = true;
      router.refresh();
    }
  }, [remaining, router]);

  const t = split(remaining);
  const cells = [
    { n: t.days, unit: "days" },
    { n: t.hours, unit: "hours" },
    { n: t.minutes, unit: "min" },
    { n: t.seconds, unit: "sec" },
  ];

  return (
    <div
      role="timer"
      aria-live="off"
      aria-label={`${label}: ${t.days} days, ${t.hours} hours, ${t.minutes} minutes`}
      className="inline-flex flex-col items-center"
    >
      <p className="label font-roman uppercase text-terracotta-deep">{label}</p>
      <div className="mt-3 flex items-start gap-3 sm:gap-5">
        {cells.map((c, i) => (
          <div key={c.unit} className="flex items-start gap-3 sm:gap-5">
            <div className="flex w-14 flex-col items-center sm:w-16">
              <span className="font-display text-4xl tabular-nums leading-none text-ink sm:text-5xl">
                {pad(c.n)}
              </span>
              <span className="micro mt-2 font-roman uppercase text-olive/85">
                {c.unit}
              </span>
            </div>
            {i < cells.length - 1 && (
              <span
                aria-hidden
                className="mt-1 font-display text-3xl leading-none text-olive/30 sm:text-4xl"
              >
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
