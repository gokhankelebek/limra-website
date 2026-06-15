import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";

// Brand-styled rendering of a post body. Authors write content; the look
// stays elite and on-brand — they can't break the design.
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-6 font-body text-lg font-light leading-relaxed text-ink/80">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-14 font-display text-4xl font-medium text-olive">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 font-display text-2xl font-medium text-olive">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-10 border-l-2 border-terracotta/50 pl-6 font-body text-xl font-light italic leading-relaxed text-ink/75">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-medium text-ink">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-terracotta underline decoration-terracotta/30 underline-offset-4 transition-colors hover:decoration-terracotta"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const url = urlForImage(value).width(1400).fit("max").url();
      return (
        <span className="my-12 block border border-olive/15 p-2">
          <Image
            src={url}
            alt={value.alt || ""}
            width={1400}
            height={933}
            className="h-auto w-full"
          />
        </span>
      );
    },
  },
};

export default function PortableBody({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
