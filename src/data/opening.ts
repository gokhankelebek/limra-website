// Opening day: the one date the whole site keys off. Before this instant the
// site speaks in the future tense ("Opening October 2"); from it onward,
// the open-state copy takes over. Pages re-render on a schedule (see the
// root layout's `revalidate`), so the flip happens on its own that morning.

export const OPENING_DAY_ISO = "2026-10-02";
export const OPENING_LABEL = "October 2";
export const OPENING_LABEL_LONG = "October 2, 2026";

// Midnight Eastern on opening day (EDT, -04:00): the doors open at 11 am,
// but the site can speak in the present tense from the start of the day.
export const OPENING_AT_MS = Date.parse("2026-10-02T00:00:00-04:00");

export function isOpen(now: Date = new Date()): boolean {
  // Outside production, LIMRA_OPEN_OVERRIDE=1|0 previews either state.
  if (process.env.NODE_ENV !== "production") {
    const o = process.env.LIMRA_OPEN_OVERRIDE;
    if (o === "1") return true;
    if (o === "0") return false;
  }
  return now.getTime() >= OPENING_AT_MS;
}

/** "Opening <date>" before the day; "Open daily" after. */
export function statusLine(open: boolean = isOpen()): string {
  return open ? "Open daily" : `Opening ${OPENING_LABEL}`;
}
