import Link from "next/link";
import Medallion from "./Medallion";
import Wordmark from "./Wordmark";

const NAV = [
  { label: "Menu", href: "/menu" },
  { label: "Story", href: "/story" },
  { label: "Gallery", href: "/gallery" },
  { label: "Visit", href: "/visit" },
];

export default function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        {/* Brand lockup */}
        <Link href="/" className="flex items-center gap-3 text-olive">
          <Medallion className="h-10 w-10" />
          <span className="sr-only">Limra — home</span>
          <Wordmark aria-hidden className="w-20" />
        </Link>

        {/* Primary nav */}
        <nav className="hidden items-center gap-9 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-roman text-[0.78rem] uppercase tracking-[0.2em] text-olive/80 transition-colors hover:text-terracotta"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/order"
            className="hidden font-roman text-[0.72rem] uppercase tracking-[0.18em] text-olive/80 transition-colors hover:text-terracotta sm:inline"
          >
            Order
          </Link>
          <Link
            href="/reserve"
            className="rounded-full border border-olive px-5 py-2 font-roman text-[0.72rem] uppercase tracking-[0.18em] text-olive transition-colors hover:bg-olive hover:text-cream"
          >
            Reserve
          </Link>
        </div>
      </div>
    </header>
  );
}
