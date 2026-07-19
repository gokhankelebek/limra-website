import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { ORDER_URL } from "@/data/contact";
import { ADD_FRIES_PRICE, allDishes, findDish } from "@/data/menu";
import { BLUR } from "@/data/menu-blur";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return allDishes.map((dish) => ({ slug: dish.slug }));
}

const money = (n: number) => n.toFixed(2);
const upcharge = (n: number) => (n % 1 === 0 ? `+$${n}` : `+$${n.toFixed(2)}`);

/**
 * A search description distinct from the on-page copy: leads with price and
 * locality, then what the dish is, then the protein range if there is one.
 */
function searchDescription(dish: NonNullable<ReturnType<typeof findDish>>) {
  const where = "Limra Mediterranean in Holly Springs, NC";
  const opener = `${dish.name}, $${money(dish.price)} at ${where}.`;
  const body = dish.description.replace(/\s+/g, " ").trim();
  if (!dish.proteins?.length) return `${opener} ${body}`;
  const names = dish.proteins.map((p) => p.name.toLowerCase()).join(", ");
  return `${opener} Choose ${names}. ${body}`.slice(0, 300);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dish = findDish(slug);
  if (!dish) return { title: "Menu" };
  const description = searchDescription(dish);
  return {
    title: {
      absolute: `${dish.name} · ${dish.category.title} · Limra Mediterranean, Holly Springs NC`,
    },
    description,
    alternates: { canonical: `/menu/${dish.slug}` },
    openGraph: {
      title: `${dish.name} · Limra Mediterranean`,
      description,
      type: "article",
      url: `${SITE_URL}/menu/${dish.slug}`,
      images: [`${SITE_URL}${dish.image}`],
    },
  };
}

const TAG_LABELS: Record<string, string> = {
  V: "Vegetarian",
  VG: "Vegan",
  GF: "Gluten-free",
  N: "Contains nuts",
};

export default async function DishPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dish = findDish(slug);
  if (!dish) notFound();

  const siblings = dish.category.items
    .filter((i) => i.slug !== dish.slug)
    .slice(0, 3);

  const url = `${SITE_URL}/menu/${dish.slug}`;

  // One Offer per protein so the price range is explicit, otherwise a single
  // Offer at the listed price.
  const offers = dish.proteins?.length
    ? dish.proteins.map((p) => ({
        "@type": "Offer",
        name: `${dish.name} with ${p.name}`,
        price: money(dish.price + p.upcharge),
        priceCurrency: "USD",
        availability: "https://schema.org/PreOrder",
      }))
    : {
        "@type": "Offer",
        price: money(dish.price),
        priceCurrency: "USD",
        availability: "https://schema.org/PreOrder",
      };

  const diets = new Set<string>();
  for (const t of dish.tags ?? []) {
    if (t === "VG") diets.add("https://schema.org/VeganDiet");
    if (t === "V") diets.add("https://schema.org/VegetarianDiet");
    if (t === "GF") diets.add("https://schema.org/GlutenFreeDiet");
  }
  // A falafel option makes the dish orderable vegan.
  if (dish.proteins?.some((p) => p.tags?.includes("VG"))) {
    diets.add("https://schema.org/VeganDiet");
  }

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MenuItem",
        "@id": `${url}#item`,
        name: dish.name,
        description: dish.description,
        image: `${SITE_URL}${dish.image}`,
        url,
        offers,
        ...(diets.size ? { suitableForDiet: [...diets] } : {}),
        ...(dish.allergens?.length
          ? { hasAllergen: dish.allergens.join(", ") }
          : {}),
        menuAddOn: dish.addFries
          ? [
              {
                "@type": "MenuItem",
                name: "Add fries",
                offers: {
                  "@type": "Offer",
                  price: money(ADD_FRIES_PRICE),
                  priceCurrency: "USD",
                },
              },
            ]
          : undefined,
        isPartOf: {
          "@type": "MenuSection",
          name: dish.category.title,
          url: `${SITE_URL}/menu#${dish.category.id}`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Menu", item: `${SITE_URL}/menu` },
          {
            "@type": "ListItem",
            position: 3,
            name: dish.category.title,
            item: `${SITE_URL}/menu#${dish.category.id}`,
          },
          { "@type": "ListItem", position: 4, name: dish.name, item: url },
        ],
      },
    ],
  };

  const tagParts = [
    ...(dish.tags ?? []).map((t) => TAG_LABELS[t] ?? t),
    ...(dish.note ? [dish.note] : []),
  ];

  return (
    <>
      <JsonLd data={schema} />
      <SiteHeader />
      <main id="main" className="flex-1 bg-cream">
        <article className="mx-auto max-w-3xl px-6 pb-24 pt-36">
          {/* Breadcrumb — matches the BreadcrumbList in the schema above */}
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="micro flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-roman uppercase text-olive/50">
              <li>
                <Link href="/menu" className="transition-colors hover:text-terracotta">
                  Menu
                </Link>
              </li>
              <li aria-hidden>·</li>
              <li>
                <Link
                  href={`/menu#${dish.category.id}`}
                  className="transition-colors hover:text-terracotta"
                >
                  {dish.category.title}
                </Link>
              </li>
              <li aria-hidden>·</li>
              <li aria-current="page" className="text-olive/70">
                {dish.name}
              </li>
            </ol>
          </nav>

          {/* Masthead */}
          <div className="text-center text-olive">
            <Reveal delay="delay-1">
              <p className="eyebrow-lg font-roman uppercase text-terracotta">
                {dish.category.title}
              </p>
            </Reveal>
            <Reveal delay="delay-2">
              <h1 className="mt-5 font-display text-5xl font-medium leading-[1.05] text-ink lg:text-6xl">
                {dish.name}
              </h1>
            </Reveal>
            <Reveal delay="delay-3">
              <p className="mx-auto mt-5 max-w-xl font-body text-lg font-light italic leading-relaxed text-ink/70">
                {dish.description}
              </p>
            </Reveal>
            {tagParts.length > 0 && (
              <Reveal delay="delay-4">
                <p className="micro mt-5 font-roman uppercase text-olive/50">
                  {tagParts.join(" · ")}
                </p>
              </Reveal>
            )}
          </div>

          {/* Photo — a matted plaque, same hanging as the hero and menu */}
          <Reveal
            animation="anim-unveil"
            delay="delay-4"
            className="mt-12 border border-olive/20 bg-cream-soft p-2"
          >
            <div className="overflow-hidden">
              <Image
                src={dish.image}
                placeholder="blur"
                blurDataURL={BLUR[dish.slug]}
                alt={dish.imageAlt}
                width={1320}
                height={990}
                priority
                sizes="(max-width: 768px) 100vw, 720px"
                className="aspect-[4/3] w-full object-cover"
                style={dish.crop ? { objectPosition: dish.crop } : undefined}
              />
            </div>
          </Reveal>

          {/* What it costs, and what it's built from */}
          <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            <Reveal delay="delay-1">
              <h2 className="eyebrow-lg font-roman uppercase text-terracotta">
                {dish.proteins?.length ? "Choose your protein" : "Price"}
              </h2>
              {dish.proteins?.length ? (
                <ul className="mt-5 border-t border-olive/15">
                  {dish.proteins.map((p) => (
                    <li
                      key={p.name}
                      className="flex items-baseline gap-3 border-b border-olive/15 py-3"
                    >
                      <span className="font-display text-lg text-ink">
                        {p.name}
                      </span>
                      {p.tags?.includes("VG") && (
                        <span className="micro shrink-0 rounded-[2px] border border-olive/25 px-1.5 py-0.5 font-roman uppercase text-olive/60">
                          Vegan
                        </span>
                      )}
                      <span aria-hidden className="min-w-[1rem] flex-1">
                        <span className="block w-full border-b border-current opacity-15" />
                      </span>
                      <span className="shrink-0 font-roman text-sm tracking-[0.12em] text-olive/70">
                        {p.upcharge === 0
                          ? `$${money(dish.price)}`
                          : upcharge(p.upcharge)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-5 font-display text-3xl text-ink">
                  ${money(dish.price)}
                </p>
              )}
              {dish.addFries && (
                <p className="mt-4 font-body text-sm font-light text-ink/55">
                  Add fries for ${money(ADD_FRIES_PRICE)}.
                </p>
              )}
            </Reveal>

            <Reveal delay="delay-2">
              {dish.sauces?.length ? (
                <>
                  <h2 className="eyebrow-lg font-roman uppercase text-terracotta">
                    Choose your sauce
                  </h2>
                  <ul className="mt-5 space-y-2">
                    {dish.sauces.map((s) => (
                      <li
                        key={s}
                        className="font-body text-base font-light text-ink/70"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}

              {dish.allergens?.length ? (
                <div className={dish.sauces?.length ? "mt-9" : ""}>
                  <h2 className="eyebrow-lg font-roman uppercase text-terracotta">
                    Allergens
                  </h2>
                  <p className="mt-4 font-body text-base font-light leading-relaxed text-ink/70">
                    {dish.allergens.join(" · ")}
                  </p>
                  <p className="mt-3 font-body text-sm font-light italic leading-relaxed text-ink/45">
                    Prepared in a shared kitchen. Please tell us about any
                    allergy before you order.
                  </p>
                </div>
              ) : null}
            </Reveal>
          </div>

          {/* Actions */}
          <Reveal className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href={ORDER_URL}
              className="rounded-[2px] bg-terracotta px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-cream transition-colors hover:bg-terracotta-deep"
            >
              Order online
            </Link>
            <Link
              href="/menu"
              className="rounded-[2px] border border-olive/40 px-8 py-3.5 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-olive transition-colors hover:border-olive hover:bg-olive hover:text-cream"
            >
              Full menu
            </Link>
          </Reveal>

          {/* More from this category */}
          {siblings.length > 0 && (
            <section className="mt-20 border-t border-olive/15 pt-12">
              <Reveal className="text-center">
                <p className="eyebrow-lg font-roman uppercase text-terracotta">
                  More from {dish.category.title}
                </p>
              </Reveal>
              <div className="mt-9 grid gap-8 sm:grid-cols-3">
                {siblings.map((sib, i) => (
                  <Reveal
                    key={sib.slug}
                    animation="anim-fade"
                    delay={(["delay-1", "delay-2", "delay-3"] as const)[i]}
                  >
                    <Link href={`/menu/${sib.slug}`} className="group block">
                      <div className="border border-olive/20 bg-cream-soft p-1.5">
                        <div className="overflow-hidden">
                          <Image
                          src={sib.image}
                          placeholder="blur"
                          blurDataURL={BLUR[sib.slug]}
                          alt={sib.imageAlt}
                          width={440}
                          height={330}
                          sizes="(max-width: 640px) 90vw, 220px"
                          className="aspect-[4/3] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                          style={sib.crop ? { objectPosition: sib.crop } : undefined}
                        />
                        </div>
                      </div>
                      <h3 className="mt-3 font-display text-xl text-ink transition-colors group-hover:text-terracotta">
                        {sib.name}
                      </h3>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
