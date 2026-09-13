import type { Metadata } from "next";
import Link from "next/link";
import Medallion from "@/components/Medallion";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import RulesBody, { InstagramDisclaimer } from "@/components/giveaway/RulesBody";

export const metadata: Metadata = {
  title: { absolute: "Official Rules · Grand Opening Giveaway · Limra Mediterranean" },
  description:
    "Official rules for the Limra Mediterranean Restaurant Grand Opening Giveaway, September 27 to October 6, 2026. No purchase necessary.",
  alternates: { canonical: "/giveaway/rules" },
};

/** Rules only: plain, printable, no marketing sections. */
export default function GiveawayRulesPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1 bg-cream">
        <article className="mx-auto max-w-2xl px-6 pb-24 pt-32 lg:pt-40">
          <div className="no-print flex items-center justify-between">
            <Medallion className="h-10 w-10 text-olive" />
            <Link
              href="/giveaway"
              className="label font-roman uppercase text-olive underline decoration-olive/40 underline-offset-4 transition-colors hover:text-terracotta"
            >
              Back to the giveaway
            </Link>
          </div>
          <div className="mt-10">
            <RulesBody headingLevel={2} />
          </div>
        </article>
        <div className="bg-cream pb-10">
          <InstagramDisclaimer />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
