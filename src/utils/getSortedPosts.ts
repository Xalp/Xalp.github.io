import type { CollectionEntry } from "astro:content";
import { postFilter, isRoutablePost } from "./postFilter";

/**
 * Returns posts sorted by “last updated” descending (uses `modDatetime` when
 * present, otherwise `pubDatetime`).
 *
 * By default returns only *listed* posts (respecting drafts, scheduling, and
 * hiding `unlisted` translations). Pass `{ includeUnlisted: true }` to also
 * include unlisted translations — used when generating routes so every
 * language version still gets its own page.
 */
export function getSortedPosts(
  posts: CollectionEntry<"posts">[],
  { includeUnlisted = false }: { includeUnlisted?: boolean } = {}
) {
  const filter = includeUnlisted ? isRoutablePost : postFilter;
  return posts
    .filter(filter)
    .sort(
      (a, b) =>
        Math.floor(
          new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1000
        ) -
        Math.floor(
          new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1000
        )
    );
}
