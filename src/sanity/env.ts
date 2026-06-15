// Sanity connection config. Until a project is created (see SANITY_SETUP.md)
// projectId is empty and `isSanityConfigured` is false — the app then falls
// back to local data so nothing breaks.

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

export const isSanityConfigured = projectId.length > 0;
