import type { Metadata } from "next";
import Link from "next/link";
import Medallion from "@/components/Medallion";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import EntryForm from "@/components/giveaway/EntryForm";
import { InstagramDisclaimer } from "@/components/giveaway/RulesBody";
import { GIVEAWAY, GOOGLE_FORM_VIEW_URL } from "@/data/giveaway.config";
import { getGiveawayPhase, isPreview, resolveNow } from "@/lib/giveaway-state";

export const dynamic = "force-dynamic";

const OG_TITLE = "Enter the Grand Opening Giveaway · Limra Mediterranean";
const DESCRIPTION =
  "Enter the Limra Mediterranean Grand Opening Giveaway: follow, post a photo at Limra, and fill in this short form. No purchase necessary.";

export const metadata: Metadata = {
  title: { absolute: "Enter the Giveaway · Limra Mediterranean · Holly Springs, NC" },
  description: DESCRIPTION,
  alternates: { canonical: "/giveaway/enter" },
  robots: { index: false, follow: true },
  openGraph: { title: OG_TITLE, description: DESCRIPTION, url: "/giveaway/enter", type: "website", siteName: "Limra Mediterranean" },
  twitter: { card: "summary_large_image", title: OG_TITLE, description: DESCRIPTION },
};

const PRIMARY =
  "inline-flex items-center justify-center rounded-[2px] bg-terracotta px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-cream transition-colors hover:bg-terracotta-deep";

export default async function GiveawayEnterPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { now, preview } = await searchParams;
  const dryRun = isPreview(preview);
  const phase = dryRun ? "live" : getGiveawayPhase(resolveNow(now));

  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1 bg-cream">
        <section className="px-6 pb-10 pt-32 text-center text-olive lg:pt-40">
          <div className="flex justify-center">
            <Medallion variant="seal" className="h-12 w-12 lg:h-14 lg:w-14" />
          </div>
          <p className="eyebrow-lg mt-6 font-roman uppercase text-terracotta">Grand Opening Giveaway</p>
          <h1 className="mx-auto mt-4 max-w-xl font-display text-4xl font-medium leading-[1.05] text-ink sm:text-5xl">
            {phase === "live" ? "Enter the giveaway" : phase === "before" ? "Entries open on opening day" : "Entries are closed"}
          </h1>
          <p className="mx-auto mt-5 max-w-md font-body text-lg font-light italic leading-relaxed text-ink/70">
            {phase === "live"
              ? "Two minutes, one form. Have your Instagram handle ready."
              : phase === "before"
                ? `Come back on ${GIVEAWAY.opensLabel}. Until then, follow ${GIVEAWAY.instagramHandle}.`
                : `Winners will be announced on Instagram on ${GIVEAWAY.announceDate}.`}
          </p>
        </section>

        <section className="mx-auto max-w-2xl px-6 pb-20">
          {phase === "live" ? (
            <>
              <ol className="mb-8 grid gap-3 border-y border-olive/15 py-5 font-body text-sm text-ink/70 sm:grid-cols-3">
                <li><span className="font-display text-lg text-olive/40">I </span>Follow {GIVEAWAY.instagramHandle}</li>
                <li><span className="font-display text-lg text-olive/40">II </span>Post a photo at Limra and tag us</li>
                <li><span className="font-display text-lg text-olive/40">III </span>Fill in this form</li>
              </ol>
              {dryRun && (
                <p className="mb-6 rounded-[2px] border border-terracotta/50 bg-cream-soft px-4 py-3 text-center font-roman text-[0.66rem] uppercase tracking-[0.2em] text-terracotta">
                  Test mode: entries are tagged TEST
                </p>
              )}
              <EntryForm googleFormUrl={GOOGLE_FORM_VIEW_URL} previewKey={dryRun ? String(preview) : undefined} />
              <p className="mt-8 text-center font-body text-xs font-light italic text-ink/50">
                No purchase necessary. One main entry and one bonus entry per person.{" "}
                <Link href="/giveaway/rules" className="underline underline-offset-4 hover:text-terracotta">Official rules</Link>
              </p>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a href={GIVEAWAY.instagramUrl} target="_blank" rel="noopener" className={PRIMARY}>
                Follow {GIVEAWAY.instagramHandle}
              </a>
              <Link
                href="/giveaway"
                className="inline-flex items-center justify-center rounded-[2px] border border-olive/40 px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-olive transition-colors hover:border-olive hover:bg-olive hover:text-cream"
              >
                About the giveaway
              </Link>
            </div>
          )}
        </section>

        <div className="bg-cream pb-10">
          <InstagramDisclaimer />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
