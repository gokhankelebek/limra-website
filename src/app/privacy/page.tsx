import type { Metadata } from "next";
import Link from "next/link";
import Medallion from "@/components/Medallion";
import Reveal from "@/components/Reveal";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { ADDRESS_LINES, CATERING_EMAIL, CATERING_EMAIL_HREF, CONTACT } from "@/data/contact";

export const metadata: Metadata = {
  title: { absolute: "Privacy · Limra Mediterranean · Holly Springs, NC" },
  description:
    "How Limra Mediterranean Restaurant handles the information this website collects: opening-updates emails, catering inquiries, giveaway entries, questions asked of the menu concierge, the Meta Pixel, and basic technical data.",
  alternates: { canonical: "/privacy" },
};

const EFFECTIVE = "September 26, 2026";

// Plain-English policy. Keep each section honest to what the code does:
// NotifyForm (email list), /api/catering (Resend), /api/ask (Anthropic),
// /go (scan log), IntroContext (sessionStorage), Visit page (Maps embed),
// MetaPixel (Meta Pixel: PageView, plus Lead on a giveaway entry).
const SECTIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: "The short version",
    body: (
      <p>
        This website collects very little. If you sign up for opening updates,
        we keep your email address. If you send a catering inquiry, it is
        emailed to the restaurant. If you ask our menu concierge a question,
        the words you type are sent to the service that answers them. Our
        hosting provider records ordinary technical data, as every
        website&apos;s does. We use the Meta Pixel to measure visits from our
        Facebook and Instagram posts and ads. We do not sell personal
        information.
      </p>
    ),
  },
  {
    title: "What we collect, and why",
    body: (
      <>
        <p>
          <strong>Opening updates.</strong>{" "}When you join the updates list, we
          collect your email address so we can write to you when the doors
          open and, now and then, about what is happening at Limra. Nothing
          else is required. Every email we send includes a one-click
          unsubscribe.
        </p>
        <p>
          <strong>Catering inquiries.</strong>{" "}The catering form asks for your
          name, a way to reach you (email or phone), and details about your
          event: date, guest count, occasion, service style, and anything you
          choose to tell us. We use this only to answer your inquiry and plan
          your event. The form delivers your message to the restaurant by
          email and, if you gave an address, sends you a short confirmation.
          This website does not keep a database of inquiries; the copy lives
          in the restaurant&apos;s inbox.
        </p>
        <p>
          <strong>Giveaway entries.</strong>{" "}During a giveaway, the entry form
          on this site asks for your name, phone, Instagram username, how you
          posted, and a few confirmations (email is optional). The entry is
          recorded in a Google Form owned by the restaurant, which is how we
          keep the list for the drawing; verification screenshots reach us by
          Instagram direct message and stay in that conversation. We use all of
          it only to verify entries, draw winners, and deliver prizes, as the
          official rules describe.
        </p>
        <p>
          <strong>Ask Limra.</strong>{" "}Our website includes a concierge that
          answers questions about the menu, hours, and the restaurant. The
          questions you type, and the conversation so far in that window, are
          sent to our AI provider to generate a reply. We do not store the
          conversations. Please do not type sensitive personal details into it;
          it only needs to know what you would like to eat.
        </p>
        <p>
          <strong>Technical data.</strong>{" "}Like all websites, ours is served by
          a hosting provider that records standard server information, such as
          IP address, browser type, pages requested, and timestamps, for
          security and reliability. Our forms and the concierge apply a light
          rate limit that briefly notes request counts per connection to
          prevent abuse. If you arrive by scanning one of our QR codes, the
          redirect notes the browser type and the page that sent you, so we can
          tell which signs people actually use.
        </p>
        <p>
          <strong>Calls and visits.</strong>{" "}If you call or visit us, we may
          note what is needed to serve you, such as a name for an order. That
          stays with the restaurant.
        </p>
      </>
    ),
  },
  {
    title: "Cookies and storage",
    body: (
      <>
        <p>
          The website uses your browser&apos;s session storage for one small
          thing: to remember that you have already seen the opening animation,
          so it does not replay on every page. That note lives only in your
          browser and clears when you close it.
        </p>
        <p>
          <strong>Meta Pixel.</strong>{" "}Our pages include the Meta Pixel, a
          small piece of code from Meta Platforms (the company behind Facebook
          and Instagram). It tells Meta which of our pages were viewed, along
          with standard browser details and cookies Meta sets, so we can see how
          many people reach us from our posts and ads and show our ads to people
          likely to be nearby. We send Meta page views and, when you enter a
          giveaway, a note that an entry was made; nothing you type into our
          forms is shared with it. Meta may link these visits to your
          Facebook or Instagram account under its own privacy policy. You can
          control this in your Facebook or Instagram ad settings (look for
          &quot;Activity information from ad partners&quot;), or block
          third-party cookies in your browser.
        </p>
        <p>
          The map on our Visit page is embedded from Google Maps, and the social
          links lead to third-party platforms. Those services follow their own
          privacy policies once you interact with them.
        </p>
      </>
    ),
  },
  {
    title: "Who else sees it",
    body: (
      <>
        <p>
          We work with a small number of service providers who process data on
          our behalf and may not use it for their own purposes:
        </p>
        <ul>
          <li>
            <strong>Email list provider</strong>: stores the addresses on the
            opening-updates list and sends our emails.
          </li>
          <li>
            <strong>Resend</strong>: delivers catering inquiries to the
            restaurant and the confirmation email to you.
          </li>
          <li>
            <strong>Anthropic</strong>: provides the AI model behind Ask Limra
            and processes the questions you type in order to answer them.
          </li>
          <li>
            <strong>Vercel</strong>: hosts this website and handles the
            technical data described above.
          </li>
          <li>
            <strong>Google Maps</strong>: powers the embedded map on the Visit
            page.
          </li>
          <li>
            <strong>Google Forms</strong>: stores giveaway entries on our
            behalf while a giveaway runs.
          </li>
          <li>
            <strong>Meta</strong>: receives page views and giveaway-entry
            counts through the Meta Pixel, as described above, to measure and
            target our ads.
          </li>
        </ul>
        <p>
          We may also disclose information if the law requires it, or to
          protect the safety of our guests and staff.
        </p>
      </>
    ),
  },
  {
    title: "Your choices",
    body: (
      <p>
        You can unsubscribe from opening updates at any time using the link in
        any email, or by asking us. You can ask what information we hold about
        you, ask us to correct it, or ask us to delete it, and we will do so
        unless we are required to keep it. For the Meta Pixel, use your
        Facebook or Instagram ad settings or your browser&apos;s cookie
        controls. There is no account to manage.
      </p>
    ),
  },
  {
    title: "Children",
    body: (
      <p>
        This website is not directed at children under 13, and we do not
        knowingly collect their information. If you believe a child has given
        us an email address, let us know and we will remove it.
      </p>
    ),
  },
  {
    title: "Changes",
    body: (
      <p>
        If what we collect changes, for instance when online ordering arrives,
        we will update this page and the date at the top. We will not quietly
        widen what we do with your information.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1 bg-cream">
        {/* Masthead */}
        <div className="px-6 pb-14 pt-36 text-center text-olive">
          <Reveal delay="delay-1" className="flex justify-center">
            <Medallion animate variant="seal" className="h-16 w-16" />
          </Reveal>
          <Reveal delay="delay-2">
            <p className="eyebrow-lg mt-8 font-roman uppercase text-terracotta">
              House rules
            </p>
          </Reveal>
          <Reveal animation="anim-rise-lg" delay="delay-3">
            <h1 className="mt-5 font-display text-6xl font-medium lg:text-7xl">
              Privacy
            </h1>
          </Reveal>
          <Reveal delay="delay-4">
            <p className="mx-auto mt-6 max-w-md font-body text-lg font-light italic leading-relaxed text-ink/70">
              What we keep, and why. In plain words.
            </p>
            <p className="micro mt-4 font-roman uppercase text-olive/50">
              Effective {EFFECTIVE}
            </p>
          </Reveal>
        </div>

        {/* Policy */}
        <article className="mx-auto max-w-2xl px-6 pb-24">
          {SECTIONS.map((section, i) => (
            <Reveal
              key={section.title}
              animation="anim-fade"
              className={i === 0 ? "" : "mt-14 border-t border-olive/15 pt-12"}
            >
              <h2 className="font-display text-3xl font-medium text-ink">
                {section.title}
              </h2>
              <div className="policy-prose mt-5">{section.body}</div>
            </Reveal>
          ))}

          {/* Contact */}
          <Reveal className="mt-14 border-t border-olive/15 pt-12">
            <h2 className="font-display text-3xl font-medium text-ink">
              Questions
            </h2>
            <div className="policy-prose mt-5">
              <p>Ask us in person, or reach the restaurant directly:</p>
              <p>
                Limra Mediterranean Restaurant
                <br />
                {ADDRESS_LINES[0]}
                <br />
                {ADDRESS_LINES[1]}
                <br />
                <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
                <br />
                <a href={CATERING_EMAIL_HREF}>{CATERING_EMAIL}</a>
              </p>
            </div>
          </Reveal>
        </article>

        {/* Closing */}
        <section className="frame-inset bg-olive-deep px-6 py-16 text-center text-cream lg:py-20">
          <Reveal className="flex flex-col items-center">
            <Medallion className="h-14 w-14 text-cream" />
            <p className="pull-quote mt-7 max-w-md text-cream/80">
              That is the whole of it. Now, about lunch.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
              <Link
                href="/menu"
                className="rounded-[2px] bg-terracotta px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-cream transition-colors hover:bg-terracotta-deep"
              >
                See the menu
              </Link>
              <Link
                href="/"
                className="rounded-[2px] border border-cream/40 px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-cream transition-colors hover:border-cream hover:bg-cream hover:text-olive"
              >
                Back home
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
