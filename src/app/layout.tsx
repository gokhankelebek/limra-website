import type { Metadata } from "next";
import { Cormorant_Garamond, Marcellus, Spectral } from "next/font/google";
import Script from "next/script";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";
import { HOURS } from "@/data/contact";
import "./globals.css";

// Pre-paint gate for the home-page entrance: hold the page (CSS does the
// hiding) before first paint so the medallion can build alone. Skipped on
// repeat visits this session and for reduced-motion users.
const INTRO_GATE = `try{var d=document.documentElement;if(location.pathname==="/"&&!sessionStorage.getItem("limra-intro")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("intro-pending");setTimeout(function(){d.classList.remove("intro-pending")},4500)}}catch(e){}`;

// Display headlines — refined, high-contrast serif standing in for the brand's Fiona.
const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// Roman inscriptional caps — for the wordmark and eyebrow labels (ties to the ancient city).
const roman = Marcellus({
  variable: "--font-roman",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

// Body / subheads — a calm text serif standing in for the brand's Kepler.
const body = Spectral({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Limra — Mediterranean Restaurant · Holly Springs, NC",
    template: "%s — Limra",
  },
  description:
    "A modern Mediterranean table, named for an ancient city. Mediterranean restaurant and café in Holly Springs, North Carolina.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Limra — Mediterranean Restaurant · Holly Springs, NC",
    description: "A modern Mediterranean table, named for an ancient city.",
    type: "website",
    siteName: "Limra Mediterranean Restaurant",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Limra — Mediterranean Restaurant · Holly Springs, NC",
    description: "A modern Mediterranean table, named for an ancient city.",
  },
};

// Site-wide Restaurant schema. Hours are placeholders pending owner
// confirmation. TODO: add geo coordinates once GBP is live.
const RESTAURANT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Limra Mediterranean Restaurant",
  alternateName: "Limra",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  image: `${SITE_URL}/opengraph-image`,
  servesCuisine: "Mediterranean",
  slogan: "A modern Mediterranean table, named for an ancient city.",
  acceptsReservations: "True",
  hasMenu: `${SITE_URL}/menu`,
  telephone: "+1-984-999-5388",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "3109 McChesney Hill Loop",
    addressLocality: "Holly Springs",
    addressRegion: "NC",
    postalCode: "27539",
    addressCountry: "US",
  },
  openingHoursSpecification: HOURS.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [...h.schemaDays],
    opens: h.opens,
    closes: h.closes,
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${roman.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-body">
        <Script
          id="limra-intro-gate"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: INTRO_GATE }}
        />
        <JsonLd data={RESTAURANT_SCHEMA} />
        {children}
      </body>
    </html>
  );
}
