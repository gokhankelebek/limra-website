import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project so a stray lockfile elsewhere
  // (e.g. one left in the home directory) can't be mistaken for the root.
  turbopack: {
    root: __dirname,
  },
  images: {
    // Dish photos carry a ?v=<content hash> so a re-crop gets a new URL and
    // never serves from a stale browser or optimizer cache. Omitting `search`
    // here is what permits that query; the default pattern forbids it.
    localPatterns: [{ pathname: "/**" }],
  },
  async redirects() {
    return [
      // The bowl was briefly published under a misspelled slug.
      {
        source: "/menu/apendos-bowl",
        destination: "/menu/aspendos-bowl",
        permanent: true,
      },
      // Short link for online ordering (Toast). Temporary, so the target can
      // change if the ordering platform does.
      {
        source: "/order",
        destination:
          "https://order.toasttab.com/online/limra-mediterranean-restaurant",
        permanent: false,
      },
      // The grand opening giveaway (Oct 2026) is over and its code removed.
      // Old links and the printed QR codes (/g, /g/enter) land on the home page.
      { source: "/giveaway", destination: "/", permanent: true },
      { source: "/giveaway/:path*", destination: "/", permanent: true },
      { source: "/g", destination: "/", permanent: true },
      { source: "/g/:path*", destination: "/", permanent: true },
      // Off the menu for now (owners, Oct 2026); temporary so it can return.
      {
        source: "/menu/medi-taco",
        destination: "/menu",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
