"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Medallion from "./Medallion";
import { ADDRESS_LINES, CONTACT } from "@/data/contact";

const LINKS = [
  { label: "Menu", href: "/menu" },
  { label: "Story", href: "/story" },
  { label: "Gallery", href: "/gallery" },
  { label: "Visit", href: "/visit" },
  { label: "Order", href: "/order" },
  { label: "Reserve", href: "/reserve" },
];

const NUMERALS = ["I", "II", "III", "IV", "V", "VI"];

/**
 * Phone navigation — a full-screen olive overlay in the brand's ceremonial
 * register: numbered display links, the medallion watermark, contact at
 * the foot. Locks scroll while open; Escape closes.
 */
export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
        className={`relative z-[60] -mr-1 flex h-10 w-10 flex-col items-center justify-center gap-[7px] transition-colors ${
          open ? "text-cream" : "text-olive"
        }`}
      >
        <span
          className={`h-px w-6 bg-current transition-transform duration-300 ${
            open ? "translate-y-[4px] rotate-45" : ""
          }`}
        />
        <span
          className={`h-px w-6 bg-current transition-transform duration-300 ${
            open ? "-translate-y-[4px] -rotate-45" : ""
          }`}
        />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-olive-deep px-8 pb-10 pt-28 text-cream">
          {/* watermark */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 opacity-[0.06]"
          >
            <Medallion className="h-full w-full text-cream" />
          </div>

          <nav className="relative flex flex-1 flex-col justify-center gap-5">
            {LINKS.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="anim-rise group flex items-baseline gap-5"
                style={{ animationDelay: `${0.08 + i * 0.07}s` }}
              >
                <span className="w-7 shrink-0 font-roman text-[0.62rem] uppercase tracking-[0.24em] text-terracotta-soft">
                  {NUMERALS[i]}
                </span>
                <span className="font-display text-4xl font-medium leading-none text-cream transition-colors group-hover:text-terracotta-soft">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="anim-fade relative border-t border-cream/15 pt-6" style={{ animationDelay: "0.55s" }}>
            <p className="font-body text-sm font-light leading-relaxed text-cream/65">
              {ADDRESS_LINES[0]} · {ADDRESS_LINES[1]}
            </p>
            <a
              href={CONTACT.phoneHref}
              className="mt-1 inline-block font-body text-sm font-light text-cream/65 transition-colors hover:text-terracotta-soft"
            >
              {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
