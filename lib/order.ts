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

// Lanes for the /work page — groups the long list into scannable clusters.
// Items keep their impact→recency→relevance order within each lane; anything
// not listed falls through to "Earlier" so new entries never silently vanish.
const LANES: { title: string; slugs: string[] }[] = [
  { title: "Building & Product", slugs: ["juno-ai", "juno-adhd-os", "straypaw", "tot-schools"] },
  { title: "Investing & Strategy", slugs: ["crowwd", "hdfc-bank"] },
  { title: "Academic Research", slugs: ["apodaca-lab", "pitt-sociology", "upmc-emergency-medicine"] },
  { title: "Earlier", slugs: ["tarc", "project-nidaan", "finer-things-club"] },
];

export function groupedWork(): { title: string; items: WorkItem[] }[] {
  const ordered = orderedWork();
  const assigned = new Set(LANES.flatMap((l) => l.slugs));
  const groups = LANES.map((l) => ({
    title: l.title,
    items: ordered.filter((w) => l.slugs.includes(w.slug)),
  }));
  const leftovers = ordered.filter((w) => !assigned.has(w.slug));
  if (leftovers.length) {
    const earlier = groups.find((g) => g.title === "Earlier");
    if (earlier) earlier.items.push(...leftovers);
    else groups.push({ title: "Earlier", items: leftovers });
  }
  return groups.filter((g) => g.items.length);
}
