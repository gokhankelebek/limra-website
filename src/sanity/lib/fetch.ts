import { client, isSanityConfigured } from "./client";

/**
 * Fetch from Sanity, but return a fallback when the project isn't connected
 * yet (or on any error) so the site never breaks mid-setup. Cached/revalidated
 * via Next's fetch tags.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  fallback: T,
  tag = "content"
): Promise<{ data: T; live: boolean }> {
  if (!isSanityConfigured) return { data: fallback, live: false };
  try {
    const data = await client.fetch<T>(query, params, {
      next: { revalidate: 60, tags: [tag] },
    });
    const empty =
      data == null || (Array.isArray(data) && data.length === 0);
    return empty ? { data: fallback, live: false } : { data, live: true };
  } catch {
    return { data: fallback, live: false };
  }
}
