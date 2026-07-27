import type { CollectionEntry } from "astro:content";
import config from "@/config";

/**
 * Determines whether a post's page should be *built/routed* at all.
 *
 * - Excludes drafts always
 * - In production, excludes scheduled posts until `pubDatetime` minus the configured margin
 * - In dev, always shows non-draft posts to make authoring easier
 *
 * Note: this intentionally ignores `unlisted`, so secondary-language
 * translations still get their own page (reachable via the language toggle).
 */
export function isRoutablePost({ data }: CollectionEntry<"posts">) {
  const isPublishTimePassed =
    Date.now() >
    new Date(data.pubDatetime).getTime() - config.posts.scheduledPostMargin;
  return !data.draft && (import.meta.env.DEV || isPublishTimePassed);
}

/**
 * Determines whether a post is eligible to appear in *listings* (home, blog
 * index, tags, archives, RSS, research). Same as routable, but additionally
 * hides `unlisted` translations so each logical post is listed only once.
 */
export function postFilter(entry: CollectionEntry<"posts">) {
  return isRoutablePost(entry) && !entry.data.unlisted;
}
