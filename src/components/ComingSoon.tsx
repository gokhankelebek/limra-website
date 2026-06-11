import Link from "next/link";
import Medallion from "./Medallion";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

export default function ComingSoon({
  eyebrow,
  title,
  blurb,
}: {
  eyebrow: string;
  title: string;
  blurb: string;
}) {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center bg-cream px-6 py-40 text-center text-olive">
        <div className="flex max-w-xl flex-col items-center">
          <Medallion animate className="mb-9 h-20 w-20 text-olive" />
          <p className="font-roman text-[0.7rem] uppercase tracking-[0.4em] text-terracotta">
            {eyebrow}
          </p>
          <h1 className="mt-5 font-display text-6xl font-medium leading-[1] lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 font-body text-lg font-light leading-relaxed text-ink/75">
            {blurb}
          </p>
          <Link
            href="/"
            className="group mt-10 inline-flex items-center gap-3 font-roman text-[0.74rem] uppercase tracking-[0.2em] transition-colors hover:text-terracotta"
          >
            <span className="h-px w-10 bg-current transition-all group-hover:w-14" />
            Back home
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
