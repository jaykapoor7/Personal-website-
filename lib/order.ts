import { work } from "@/content/work";
import { writing } from "@/content/writing";
import type { WorkItem, WritingItem } from "@/content/types";

/**
 * Work is NOT shown chronologically. Sort priority is:
 *   1. impact     (most significant work first)
 *   2. recency    (newer breaks ties)
 *   3. relevance  (closer to target roles breaks remaining ties)
 */
export function orderedWork(): WorkItem[] {
  return [...work].sort(
    (a, b) =>
      b.impact - a.impact || b.recency - a.recency || b.relevance - a.relevance,
  );
}

export function featuredWork(): WorkItem[] {
  return orderedWork().filter((w) => w.featured);
}

export function getWork(slug: string): WorkItem | undefined {
  return work.find((w) => w.slug === slug);
}

/** Writing is ordered by recency (newest first). */
export function orderedWriting(): WritingItem[] {
  return [...writing].sort((a, b) => b.recency - a.recency);
}
