import type { Metadata } from "next";
import { Cormorant_Garamond, Marcellus, Spectral } from "next/font/google";
import "./globals.css";

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
  title: {
    default: "Limra — Mediterranean Restaurant",
    template: "%s — Limra",
  },
  description:
    "A modern Mediterranean table, named for an ancient city. Limra brings the warmth and rhythm of the Mediterranean to a contemporary restaurant and café.",
  openGraph: {
    title: "Limra — Mediterranean Restaurant",
    description: "A modern Mediterranean table, named for an ancient city.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${roman.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-body">
        {children}
      </body>
    </html>
  );
}
