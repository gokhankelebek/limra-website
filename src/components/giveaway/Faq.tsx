"use client";

import { useId, useState } from "react";

export type FaqItem = { q: string; a: string };

/**
 * Accessible accordion: real buttons inside headings, aria-expanded and
 * aria-controls wired, panels hidden with the `hidden` attribute so they
 * leave the tab order when closed. One item open at a time.
 */
export default function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const base = useId();

  return (
    <div className="divide-y divide-olive/15 border-y border-olive/15">
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${base}-q${i}`;
        const panelId = `${base}-a${i}`;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left font-display text-xl leading-snug text-ink transition-colors hover:text-terracotta"
              >
                <span>{item.q}</span>
                <span
                  aria-hidden
                  className={`relative block h-4 w-4 shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-terracotta" />
                  <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-terracotta" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-6 pr-10 font-body text-base font-light leading-relaxed text-ink/70"
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
