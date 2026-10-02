"use client";

import { useSyncExternalStore } from "react";
import { HOURS } from "@/data/contact";

// Live "open now" badge for the hero. The page itself is cached for up to an
// hour, so the open/closed call is made in the visitor's browser against the
// restaurant's own clock (Eastern), and re-checked every half minute.

const TZ = "America/New_York";
const { opens, closes } = HOURS[0];

type State = "open" | "before" | "after";

function minutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function label(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const hour = h % 12 || 12;
  return `${hour}${m ? `:${String(m).padStart(2, "0")}` : ""} ${h < 12 ? "am" : "pm"}`;
}

function nowInEastern(): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  return get("hour") * 60 + get("minute");
}

function getState(): State {
  const t = nowInEastern();
  if (t < minutes(opens)) return "before";
  if (t < minutes(closes)) return "open";
  return "after";
}

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 30_000);
  document.addEventListener("visibilitychange", onChange);
  return () => {
    window.clearInterval(id);
    document.removeEventListener("visibilitychange", onChange);
  };
}

const COPY: Record<State, { lead: string; detail: string }> = {
  open: { lead: "Open now", detail: `until ${label(closes)}` },
  before: { lead: "Opens today", detail: `at ${label(opens)}` },
  after: { lead: "Closed now", detail: `opens ${label(opens)} tomorrow` },
};

export default function OpenStatus({ className = "" }: { className?: string }) {
  // null on the server and during hydration: render the static hours line,
  // which is also what visitors without JavaScript see.
  const state = useSyncExternalStore<State | null>(subscribe, getState, () => null);
  const copy = state ? COPY[state] : null;
  const live = state === "open";

  return (
    <p
      role="status"
      className={`inline-flex items-center gap-3 border border-olive/25 bg-cream-soft/80 px-5 py-2.5 font-roman text-[0.72rem] uppercase tracking-[0.2em] text-olive ${className}`}
    >
      <span aria-hidden className="relative flex h-2 w-2">
        {live && (
          <span className="absolute inline-flex h-full w-full rounded-full bg-olive-soft opacity-60 motion-safe:animate-ping" />
        )}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${
            state === null || live ? "bg-olive-soft" : "bg-terracotta"
          }`}
        />
      </span>
      {copy ? (
        <span>
          {copy.lead}
          <span className="text-olive/60"> · {copy.detail}</span>
        </span>
      ) : (
        <span>
          Now open
          <span className="text-olive/60"> · daily {label(opens)} – {label(closes)}</span>
        </span>
      )}
    </p>
  );
}
