import Image from "next/image";
import Link from "next/link";

export default function StorySection() {
  return (
    <section className="relative overflow-hidden border-y border-olive/10 bg-cream-soft">
      {/* The city itself — ink-and-wash Limyra, subject right, text left */}
      <Image
        src="/limra-city.jpg"
        alt="The rock-cut tombs of ancient Limyra, drawn in ink and wash"
        fill
        sizes="100vw"
        className="object-cover object-[72%_35%]"
      />
      {/* Parchment wash keeps the reading column clean */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-cream-soft via-cream-soft/80 to-cream-soft/10"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-28 lg:px-10 lg:py-36">
        <div className="max-w-md">
          <p className="eyebrow-lg font-roman uppercase text-terracotta">
            The name
          </p>
          <h2 className="mt-6 font-display text-5xl font-medium leading-[1.05] text-olive lg:text-6xl">
            An ancient city,
            <br />
            a modern table.
          </h2>
          <p className="mt-7 font-body text-lg font-light leading-relaxed text-ink/75">
            Limyra rose in stone on the Mediterranean coast, a city built for
            gathering, trade, and the long ritual of a shared meal. We borrow
            its name and its rhythm: honest ingredients, open fire, and a room
            made for lingering.
          </p>
          <p className="mt-5 font-body text-lg font-light leading-relaxed text-ink/75">
            It is kept by Can and Elif Engin, two chefs with fifteen years of
            professional kitchens between them, and a food truck whose line
            kept growing until it needed a room.
          </p>
          <Link
            href="/story"
            className="group mt-9 inline-flex items-center gap-3 font-roman text-[0.74rem] uppercase tracking-[0.2em] text-olive transition-colors hover:text-terracotta"
          >
            Read the story
            <span className="h-px w-10 bg-current transition-all group-hover:w-14" />
          </Link>
        </div>
      </div>
    </section>
  );
}
