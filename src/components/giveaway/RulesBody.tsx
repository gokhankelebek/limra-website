import {
  INSTAGRAM_DISCLAIMER,
  RULES,
  RULES_HEADLINE,
  RULES_LEAD,
} from "@/data/giveaway-rules";

/**
 * The official rules, rendered identically on /giveaway#rules and
 * /giveaway/rules. Content comes from giveaway-rules.ts and is never
 * paraphrased here.
 */
export default function RulesBody({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const Sub = headingLevel === 2 ? "h3" : "h4";
  return (
    <div className="policy-prose">
      <H className="font-display text-2xl font-medium text-ink">{RULES_HEADLINE}</H>
      <p className="mt-4 font-medium text-ink">{RULES_LEAD}</p>
      <ol className="mt-8 list-none space-y-7 p-0">
        {RULES.map((rule, i) => (
          <li key={rule.title}>
            <Sub className="font-display text-xl font-medium text-ink">
              {i + 1}. {rule.title}.
            </Sub>
            {rule.paragraphs?.map((p) => (
              <p key={p} className="mt-2">
                {p}
              </p>
            ))}
            {rule.list && (
              <ul className="mt-2 list-none space-y-1.5 p-0">
                {rule.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {rule.after?.map((p) => (
              <p key={p} className="mt-2">
                {p}
              </p>
            ))}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function InstagramDisclaimer() {
  return (
    <p className="micro mx-auto max-w-xl px-6 text-center font-roman uppercase leading-relaxed text-olive/85">
      {INSTAGRAM_DISCLAIMER}
    </p>
  );
}
