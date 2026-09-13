import type { Metadata } from "next";
import Link from "next/link";
import Medallion from "@/components/Medallion";
import Reveal from "@/components/Reveal";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import Countdown from "@/components/giveaway/Countdown";
import Faq, { type FaqItem } from "@/components/giveaway/Faq";
import RulesBody, { InstagramDisclaimer } from "@/components/giveaway/RulesBody";
import { GIVEAWAY } from "@/data/giveaway.config";
import {
  CLOSES_AT_MS,
  OPENS_AT_MS,
  getGiveawayPhase,
  resolveNow,
  type GiveawayPhase,
} from "@/lib/giveaway-state";

// The page's state depends on the clock, so it renders per request rather
// than being frozen at build time.
export const dynamic = "force-dynamic";

const TITLE = "Grand Opening Giveaway: Win an iPhone 17 Pro Max · Limra Mediterranean";
const DESCRIPTION =
  "Follow, post a photo at Limra, and enter. Ten days, ten prizes, including an Apple iPhone 17 Pro Max. No purchase necessary. Holly Springs, NC.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/giveaway" },
  openGraph: {
    title: "Grand Opening Giveaway: Win an iPhone 17 Pro Max",
    description: DESCRIPTION,
    url: "/giveaway",
    type: "website",
    siteName: "Limra Mediterranean",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grand Opening Giveaway: Win an iPhone 17 Pro Max",
    description: DESCRIPTION,
  },
};

const FAQ: FaqItem[] = [
  {
    q: "My account is private. Can I still enter?",
    a: "Yes. Post as usual, then send a screenshot of your post or story to @limra_mediterranean by DM, or upload it with the entry form, so we can verify it.",
  },
  {
    q: "Can I enter with a Story instead of a Post?",
    a: "Yes. Stories disappear after 24 hours, so send us a screenshot by DM (or attach it to the entry form) before it does.",
  },
  {
    q: "Do I have to buy something?",
    a: "No. A photo taken at or in front of the restaurant is enough, and buying something does not change your chances of winning.",
  },
  {
    q: "How are winners chosen?",
    a: `By random drawing from all valid entries on ${GIVEAWAY.drawDate}. We record the drawing and share it on Instagram.`,
  },
  {
    q: "How will I know if I won?",
    a: `Winners are announced on ${GIVEAWAY.instagramHandle} on ${GIVEAWAY.announceDate}, and we contact each winner using the details from the entry form. Reply within 72 hours, or the prize passes to an alternate winner.`,
  },
  {
    q: "When and where do I get my prize?",
    a: `In person at the restaurant, within ${GIVEAWAY.claimDeadlineDays} days of the announcement. Bring a government photo ID that matches your entry, and be ready to show your post or your screenshot.`,
  },
  {
    q: "Can I enter more than once?",
    a: `One main entry per person, plus one bonus entry if your post or story includes ${GIVEAWAY.hashtag}. Extra posts do not add entries.`,
  },
  {
    q: "Do I have to live in North Carolina?",
    a: "Yes. The giveaway is open to North Carolina residents who are 18 or older.",
  },
];

const PRIMARY =
  "inline-flex items-center justify-center rounded-[2px] bg-terracotta px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-cream transition-colors hover:bg-terracotta-deep";
const SECONDARY =
  "inline-flex items-center justify-center rounded-[2px] border border-olive/40 px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-olive transition-colors hover:border-olive hover:bg-olive hover:text-cream";
const DISABLED =
  "inline-flex cursor-not-allowed items-center justify-center rounded-[2px] border border-olive/30 bg-cream-deep px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-olive";

/** The entry button in its three moods. Form opens in the same tab (QR flow). */
function EntryCta({ phase, className = "" }: { phase: GiveawayPhase; className?: string }) {
  if (phase === "before") {
    return (
      <button type="button" disabled aria-disabled="true" className={`${DISABLED} ${className}`}>
        Entries open on opening day
      </button>
    );
  }
  if (phase === "live") {
    return (
      <a href={GIVEAWAY.formUrl} className={`${PRIMARY} ${className}`}>
        Enter the giveaway →
      </a>
    );
  }
  return (
    <a
      href={GIVEAWAY.instagramUrl}
      target="_blank"
      rel="noopener"
      className={`${PRIMARY} ${className}`}
    >
      Follow {GIVEAWAY.instagramHandle} for the results
    </a>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow-lg font-roman uppercase text-terracotta-deep">{children}</p>
  );
}

export default async function GiveawayPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { now: nowParam } = await searchParams;
  const now = resolveNow(nowParam);
  const phase = getGiveawayPhase(now);
  const serverNow = now.getTime();
  const [grand, second, third] = GIVEAWAY.prizes;

  return (
    <>
      <SiteHeader />
      <main
        id="main"
        className={`flex-1 bg-cream ${phase === "live" ? "pb-24 md:pb-0" : ""}`}
      >
        {/* Hero: fits a 375px phone above the fold */}
        <section className="px-6 pb-14 pt-32 text-center text-olive lg:pt-40">
          {/* No entrance animation on the hero: this is a QR landing page and
              the countdown is the LCP element, so it paints immediately. The
              sections below still reveal on scroll like the rest of the site. */}
          <div className="flex justify-center">
            <Medallion animate variant="seal" className="h-12 w-12 lg:h-16 lg:w-16" />
          </div>
          <div>
            <p className="mt-6 font-roman text-[0.66rem] uppercase tracking-[0.3em] text-olive/85">
              {GIVEAWAY.restaurantName}
            </p>
            <p className="eyebrow-lg mt-2 font-roman uppercase text-terracotta-deep">
              Grand Opening Giveaway
            </p>
          </div>
          <div>
            <h1 className="mx-auto mt-5 max-w-2xl font-display text-[2.6rem] font-medium leading-[1.05] text-ink sm:text-6xl lg:text-7xl">
              Snap. Tag. Win an iPhone 17 Pro Max.
            </h1>
          </div>

          <div className="mt-8 flex flex-col items-center gap-6">
            {phase === "before" && (
              <>
                <p className="font-body text-lg font-light italic text-ink/70">
                  Giveaway starts {GIVEAWAY.opensLabel}
                </p>
                <Countdown target={OPENS_AT_MS} serverNow={serverNow} label="Starts in" />
              </>
            )}
            {phase === "live" && (
              <Countdown target={CLOSES_AT_MS} serverNow={serverNow} label="Entries close in" />
            )}
            {phase === "closed" && (
              <p
                role="status"
                className="max-w-md rounded-[2px] border border-olive/20 bg-cream-soft px-6 py-4 font-body text-base font-light leading-relaxed text-ink/80"
              >
                Entries are closed. Winners will be announced on Instagram on{" "}
                {GIVEAWAY.announceDate}.
              </p>
            )}
            <EntryCta phase={phase} />
            {phase === "live" && !GIVEAWAY.formConfigured && (
              <p className="font-body text-sm italic text-terracotta">
                Entry form link coming before opening day.
              </p>
            )}
          </div>
        </section>

        {/* Prizes */}
        <section aria-labelledby="prizes-h" className="px-6 pb-16">
          <div className="mx-auto max-w-3xl">
            <Reveal className="text-center">
              <Eyebrow>The prizes</Eyebrow>
              <h2 id="prizes-h" className="mt-4 font-display text-3xl font-medium text-olive lg:text-4xl">
                Ten days, ten prizes.
              </h2>
            </Reveal>
            <Reveal delay="delay-2" className="frame-inset mt-8 bg-olive-deep px-8 py-10 text-center text-cream lg:py-14">
              <p className="label font-roman uppercase text-cream/80">
                {grand.tier} · {grand.count} winner
              </p>
              <p className="mt-4 font-display text-4xl font-medium leading-tight lg:text-5xl">
                {grand.name}
              </p>
              <p className="micro mt-4 font-roman uppercase text-cream/60">
                {grand.value}
              </p>
            </Reveal>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {[second, third].map((p, i) => (
                <Reveal
                  key={p.tier}
                  delay={(["delay-3", "delay-4"] as const)[i]}
                  className="border border-olive/15 bg-cream-soft px-6 py-7 text-center"
                >
                  <p className="label font-roman uppercase text-terracotta-deep">
                    {p.tier} · {p.count} winners
                  </p>
                  <p className="mt-3 font-display text-2xl text-ink">{p.name}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* How to enter */}
        <section
          id="how-to-enter"
          aria-labelledby="enter-h"
          className="scroll-mt-24 border-y border-olive/10 bg-cream-soft px-6 py-16 lg:py-20"
        >
          <div className="mx-auto max-w-3xl">
            <Reveal className="text-center">
              <Eyebrow>How to enter</Eyebrow>
              <h2 id="enter-h" className="mt-4 font-display text-3xl font-medium text-olive lg:text-4xl">
                Three steps, one lunch.
              </h2>
            </Reveal>
            <ol className="mt-10 space-y-10">
              <li className="grid grid-cols-[3rem_1fr] gap-4 sm:grid-cols-[4rem_1fr]">
                <span aria-hidden className="font-display text-5xl leading-none text-olive/70">I</span>
                <div>
                  <h3 className="font-display text-2xl text-ink">
                    Follow {GIVEAWAY.instagramHandle}
                  </h3>
                  <p className="mt-2 font-body text-base font-light leading-relaxed text-ink/70">
                    On Instagram, from the account you will post with.
                  </p>
                  <a
                    href={GIVEAWAY.instagramUrl}
                    target="_blank"
                    rel="noopener"
                    className={`${SECONDARY} mt-4`}
                  >
                    Open Instagram
                  </a>
                </div>
              </li>
              <li className="grid grid-cols-[3rem_1fr] gap-4 sm:grid-cols-[4rem_1fr]">
                <span aria-hidden className="font-display text-5xl leading-none text-olive/70">II</span>
                <div>
                  <h3 className="font-display text-2xl text-ink">Post a photo or video</h3>
                  <p className="mt-2 font-body text-base font-light leading-relaxed text-ink/70">
                    Taken at Limra, as a Post or a Story, and tag{" "}
                    {GIVEAWAY.instagramHandle}.
                  </p>
                </div>
              </li>
              <li className="grid grid-cols-[3rem_1fr] gap-4 sm:grid-cols-[4rem_1fr]">
                <span aria-hidden className="font-display text-5xl leading-none text-olive/70">III</span>
                <div>
                  <h3 className="font-display text-2xl text-ink">Enter</h3>
                  <p className="mt-2 font-body text-base font-light leading-relaxed text-ink/70">
                    Scan the QR code at your table, or tap the button, and fill in
                    the short entry form.
                  </p>
                  <EntryCta phase={phase} className="mt-4" />
                </div>
              </li>
            </ol>
            <p className="mt-10 border-l-2 border-terracotta pl-4 font-body text-sm font-light leading-relaxed text-ink/65">
              Posted a Story? Send a screenshot to {GIVEAWAY.instagramHandle} by DM
              so we can verify it.
            </p>
          </div>
        </section>

        {/* Bonus + No purchase */}
        <section className="px-6 py-16 lg:py-20">
          <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
            <Reveal className="border border-terracotta/60 px-7 py-8">
              <Eyebrow>Bonus entry</Eyebrow>
              <p className="mt-3 font-display text-2xl leading-snug text-ink">
                Add {GIVEAWAY.hashtag} to your post or story for one extra entry.
              </p>
              <p className="mt-3 font-body text-sm font-light leading-relaxed text-ink/70">
                One main entry and one bonus entry per person, however many times
                you post.
              </p>
            </Reveal>
            <Reveal delay="delay-2" className="border border-olive/20 bg-cream-soft px-7 py-8">
              <p className="label font-roman uppercase text-olive">No purchase necessary</p>
              <p className="mt-3 font-display text-2xl leading-snug text-ink">
                You do not need to buy anything to enter.
              </p>
              <p className="mt-3 font-body text-sm font-light leading-relaxed text-ink/70">
                A photo taken at or in front of the restaurant is enough, and
                buying something does not increase your chances of winning.
              </p>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-h" className="border-t border-olive/10 px-6 py-16 lg:py-20">
          <div className="mx-auto max-w-2xl">
            <Reveal className="text-center">
              <Eyebrow>Questions</Eyebrow>
              <h2 id="faq-h" className="mt-4 font-display text-3xl font-medium text-olive lg:text-4xl">
                The short answers
              </h2>
            </Reveal>
            <div className="mt-8">
              <Faq items={FAQ} />
            </div>
          </div>
        </section>

        {/* Official rules */}
        <section id="rules" aria-labelledby="rules-h" className="scroll-mt-24 border-t border-olive/10 bg-cream-soft px-6 py-16 lg:py-20">
          <div className="mx-auto max-w-2xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Eyebrow>The fine print</Eyebrow>
                <h2 id="rules-h" className="mt-4 font-display text-3xl font-medium text-olive lg:text-4xl">
                  Official rules
                </h2>
              </div>
              <Link
                href="/giveaway/rules"
                className="label font-roman uppercase text-olive underline decoration-olive/40 underline-offset-4 transition-colors hover:text-terracotta"
              >
                Print version
              </Link>
            </div>
            <div className="mt-8">
              <RulesBody headingLevel={3} />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="frame-inset bg-olive-deep px-6 py-16 text-center text-cream lg:py-20">
          <Reveal className="flex flex-col items-center">
            <Medallion className="h-14 w-14 text-cream" />
            <p className="pull-quote mt-7 max-w-md text-cream/80">
              {phase === "closed"
                ? "Thank you for coming to the table."
                : "Come for lunch. Leave with a chance."}
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
              <EntryCta phase={phase} />
              <Link
                href="/menu"
                className="rounded-[2px] border border-cream/40 px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-cream transition-colors hover:border-cream hover:bg-cream hover:text-olive"
              >
                See the menu
              </Link>
            </div>
          </Reveal>
        </section>

        <div className="bg-cream py-8">
          <InstagramDisclaimer />
        </div>
      </main>

      {/* Sticky entry bar, phones only, while entries are open */}
      {phase === "live" && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-olive/15 bg-cream/95 p-3 backdrop-blur md:hidden">
          <a href={GIVEAWAY.formUrl} className={`${PRIMARY} w-full`}>
            Enter the giveaway →
          </a>
        </div>
      )}
      <SiteFooter />
    </>
  );
}
