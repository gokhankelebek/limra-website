import { GIVEAWAY } from "@/data/giveaway.config";

export type GiveawayPhase = "before" | "live" | "closed";

// Exact instants: the config strings carry explicit -04:00 offsets, so the
// cutoff does not depend on the server's or the visitor's time zone.
export const OPENS_AT_MS = Date.parse(GIVEAWAY.opensAt);
export const CLOSES_AT_MS = Date.parse(GIVEAWAY.closesAt);

export function getGiveawayPhase(now: Date = new Date()): GiveawayPhase {
  const t = now.getTime();
  if (t < OPENS_AT_MS) return "before";
  if (t <= CLOSES_AT_MS) return "live";
  return "closed";
}

// Outside production, `?now=2026-09-25T12:00:00Z` previews any phase without
// touching the clock. Production ignores the parameter entirely.
export function resolveNow(param: string | string[] | undefined): Date {
  if (process.env.NODE_ENV !== "production" && typeof param === "string") {
    const t = Date.parse(param);
    if (!Number.isNaN(t)) return new Date(t);
  }
  return new Date();
}
