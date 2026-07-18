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
    ];
  },
};

export default nextConfig;
