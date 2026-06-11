import Link from "next/link";
import Medallion from "./Medallion";
import Wordmark from "./Wordmark";

const COLS = [
  {
    title: "Explore",
    links: [
      { label: "Menu", href: "/menu" },
      { label: "Our story", href: "/story" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Visit",
    links: [
      { label: "Find us", href: "/visit" },
      { label: "Reserve a table", href: "/reserve" },
      { label: "Order online", href: "/order" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="bg-cream-soft text-olive">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 text-olive">
              <Medallion className="h-11 w-11" />
              <span className="sr-only">Limra — home</span>
              <Wordmark aria-hidden className="w-[5.5rem]" />
            </Link>
            <p className="mt-5 max-w-xs font-body text-base font-light leading-relaxed text-ink/70">
              A modern Mediterranean table, named for an ancient city.
            </p>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <p className="font-roman text-[0.7rem] uppercase tracking-[0.24em] text-terracotta">
                {col.title}
              </p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="font-body text-base text-ink/75 transition-colors hover:text-terracotta"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact placeholder */}
          <div>
            <p className="font-roman text-[0.7rem] uppercase tracking-[0.24em] text-terracotta">
              Hours &amp; place
            </p>
            <p className="mt-5 font-body text-base font-light leading-relaxed text-ink/70">
              Address coming soon
              <br />
              Open daily · 12:00 – 23:00
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-olive/15 pt-8 text-ink/55 md:flex-row md:items-center">
          <p className="font-body text-sm">
            © {new Date().getFullYear()} Limra Mediterranean Restaurant
          </p>
          <p className="font-roman text-[0.62rem] uppercase tracking-[0.22em]">
            Limra · Can &amp; Elif
          </p>
        </div>
      </div>
    </footer>
  );
}
