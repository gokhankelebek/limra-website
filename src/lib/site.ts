// Canonical site origin — used for metadataBase, schema URLs, sitemaps.
// Priority:
//   1. NEXT_PUBLIC_SITE_URL  — explicit, set this once a custom domain exists
//   2. VERCEL_PROJECT_PRODUCTION_URL — auto-set by Vercel to the prod domain,
//      so canonicals are correct on deploy without any manual config
//   3. localhost — local dev
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();
