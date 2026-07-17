import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project so a stray lockfile elsewhere
  // (e.g. one left in the home directory) can't be mistaken for the root.
  turbopack: {
    root: __dirname,
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
