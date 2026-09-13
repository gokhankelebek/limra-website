import { GIVEAWAY } from "./giveaway.config";

// Official rules: the single source of truth rendered by /giveaway#rules and
// /giveaway/rules. Text is verbatim from the approved rules; only the
// structure (headings, lists) is ours. Do not paraphrase.

export const RULES_HEADLINE =
  "Limra Mediterranean Restaurant — Grand Opening Giveaway — Official Rules";

export const RULES_LEAD =
  "NO PURCHASE NECESSARY TO ENTER OR WIN. A PURCHASE DOES NOT INCREASE YOUR CHANCES OF WINNING.";

export type Rule = {
  title: string;
  paragraphs?: string[];
  list?: string[];
  after?: string[];
};

export const RULES: Rule[] = [
  {
    title: "Promotion period",
    paragraphs: [
      `The giveaway begins on ${GIVEAWAY.opensLabelLong} (grand opening day) and ends on ${GIVEAWAY.closesLabelLong} at 11:59 PM Eastern Time.`,
    ],
  },
  {
    title: "Eligibility",
    paragraphs: [
      "Open to legal residents of North Carolina who are 18 years of age or older at the time of entry. Employees of Limra Mediterranean Restaurant and their immediate family members are not eligible.",
    ],
  },
  {
    title: "How to enter",
    list: [
      "(a) Follow @limra_mediterranean on Instagram;",
      "(b) during the promotion period, share a photo or video taken at or in front of Limra Mediterranean Restaurant on your own Instagram account as a Post or Story and tag @limra_mediterranean;",
      "(c) complete the entry form via the QR code available at the restaurant or at limramedi.com/giveaway.",
    ],
    after: [
      "Entries via Story must be verifiable by screenshot sent to @limra_mediterranean by direct message or uploaded with the entry form. Private accounts may enter; a screenshot of the post is required. No purchase is necessary; a photo taken at or in front of the restaurant is sufficient.",
    ],
  },
  {
    title: "Bonus entry",
    paragraphs: [
      "Entrants who include the hashtag #LimraMediterranean in their post or story receive one (1) additional entry. Limit one (1) main entry and one (1) bonus entry per person, regardless of the number of posts.",
    ],
  },
  {
    title: "Prizes",
    list: [
      "One (1) Grand Prize: Apple iPhone 17 Pro Max (approximate retail value $1,000).",
      "Three (3) Second Prizes: $100 Limra Mediterranean gift card each.",
      "Six (6) Third Prizes: $50 Limra Mediterranean gift card each.",
    ],
    after: [
      "Total approximate retail value of all prizes: $1,600. Prizes are non-transferable and may not be redeemed for cash. Limit one prize per person.",
    ],
  },
  {
    title: "Winner selection",
    paragraphs: [
      `Winners will be selected by random drawing from all valid entries on ${GIVEAWAY.drawDate}. The drawing will be recorded and shared on Instagram. Winners will be announced on @limra_mediterranean on ${GIVEAWAY.announceDate} and notified using the contact information provided in the entry form. A winner who does not respond within 72 hours of notification forfeits the prize, and an alternate winner will be selected.`,
    ],
  },
  {
    title: "Prize claim",
    paragraphs: [
      "Prizes must be claimed in person at Limra Mediterranean Restaurant within 30 days of the announcement. To claim a prize, the winner must present valid government-issued photo ID matching the name on the entry, must still be following @limra_mediterranean from the account used to enter, and must be able to verify the original post or story (via the post, Story archive, or the screenshot submitted). Unclaimed prizes may be awarded to an alternate winner.",
    ],
  },
  {
    title: "Taxes",
    paragraphs: [
      "Prizes may be considered taxable income. The Grand Prize winner agrees to complete IRS Form W-9 before receiving the prize; the prize value will be reported on Form 1099-MISC. All taxes are the sole responsibility of the winner.",
    ],
  },
  {
    title: "Publicity",
    paragraphs: [
      "The Grand Prize winner agrees to be photographed and/or recorded on video at prize delivery and consents to the use of that content by Limra Mediterranean Restaurant on social media, its website, and other promotional materials. All entrants consent to their tagged post or story being re-shared by @limra_mediterranean.",
    ],
  },
  {
    title: "General conditions",
    paragraphs: [
      "Entries and the Instagram follow must remain in place until prizes are delivered. Entries containing false, incomplete, or misleading information are void. Entries from fake, spam, or duplicate accounts will be disqualified. Limra Mediterranean Restaurant reserves the right to verify eligibility and to disqualify any entrant who tampers with the entry process. Limra Mediterranean Restaurant may amend these rules with prior notice posted on @limra_mediterranean. Personal information collected is used solely to administer this giveaway and will not be shared with third parties. Void where prohibited. This giveaway is subject to all applicable federal, state, and local laws.",
    ],
  },
  {
    title: "Instagram",
    paragraphs: [
      "This promotion is in no way sponsored, endorsed, administered by, or associated with Instagram or Meta Platforms, Inc. Entrants release Instagram from any and all liability.",
    ],
  },
  {
    title: "Sponsor",
    paragraphs: [
      `Limra Mediterranean Restaurant, ${GIVEAWAY.restaurantAddress}. Questions: ${GIVEAWAY.contactLine}.`,
    ],
  },
];

// Must appear verbatim on both giveaway routes.
export const INSTAGRAM_DISCLAIMER =
  "This promotion is in no way sponsored, endorsed, administered by, or associated with Instagram or Meta Platforms, Inc.";
