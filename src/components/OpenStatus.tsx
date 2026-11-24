"use client";

import { useSyncExternalStore } from "react";
import { CLOSED_DAY, HOURS } from "@/data/contact";

// Live "open now" badge for the hero. The page itself is cached for up to an
// hour, so the open/closed call is made in the visitor's browser against the
// restaurant's own clock (Eastern), and re-checked every half minute.

const TZ = "America/New_York";
const { opens, closes } = HOURS[0];

type State = "open" | "before" | "after" | "afterBeforeClosed" | "closedToday";

function minutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function label(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const hour = h % 12 || 12;
  return `${hour}${m ? `:${String(m).padStart(2, "0")}` : ""} ${h < 12 ? "am" : "pm"}`;
}

// Day of week and minutes since midnight, on the restaurant's clock.
function nowInEastern(): { day: string; t: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return { day: get("weekday"), t: Number(get("hour")) * 60 + Number(get("minute")) };
}

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const nextDay = (day: string) => DAYS[(DAYS.indexOf(day) + 1) % 7];

function getState(): State {
  const { day, t } = nowInEastern();
  if (day === CLOSED_DAY) return "closedToday";
  if (t < minutes(opens)) return "before";
  if (t < minutes(closes)) return "open";
  return nextDay(day) === CLOSED_DAY ? "afterBeforeClosed" : "after";
}

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 30_000);
  document.addEventListener("visibilitychange", onChange);
  return () => {
    window.clearInterval(id);
    document.removeEventListener("visibilitychange", onChange);
  };
}

const reopenDay = nextDay(CLOSED_DAY);

const COPY: Record<State, { lead: string; detail: string }> = {
  open: { lead: "Open now", detail: `until ${label(closes)}` },
  before: { lead: "Opens today", detail: `at ${label(opens)}` },
  after: { lead: "Closed now", detail: `opens ${label(opens)} tomorrow` },
  afterBeforeClosed: {
    lead: "Closed now",
    detail: `opens ${reopenDay} at ${label(opens)}`,
  },
  closedToday: {
    lead: `Closed ${CLOSED_DAY}s`,
    detail: `opens ${reopenDay} at ${label(opens)}`,
  },
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
          <span className="text-olive/60"> · {label(opens)} – {label(closes)} · Closed Tue</span>
        </span>
      )}
    </p>
  );
}
