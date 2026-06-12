import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/menu`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/reserve`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/order`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/story`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/visit`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
}
