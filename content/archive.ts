/** One catalogue of everything on the site, built from the lists in site.ts.
 * The home index, the timeline and the case pages all read from here, so a
 * project is described once and shown in different ways. */
import {
  builds,
  labs,
  roles,
  ventures,
  writing,
  type Lab,
  type Role,
  type Venture,
} from "./site";

export type Verb = "Started" | "Worked" | "Researched" | "Wrote" | "Built";
export const verbs: Verb[] = [
  "Started",
  "Worked",
  "Researched",
  "Wrote",
  "Built",
];

export type Entry = {
  slug: string;
  title: string;
  verb: Verb;
  /** First year, for ordering and the timeline. */
  year: number;
  /** "2019 to 2023", "2026", "Now". */
  when: string;
  line: string;
  image?: string;
  /** How the picture should be framed. */
  look: "screen" | "photo" | "doc" | "phone";
  /** Where the row goes: a case page, a playable page, or the document. */
  href: string;
  /** Present when there is a full case page at /work/[slug]. */
  caseOf?:
    | { type: "venture"; v: Venture }
    | { type: "role"; r: Role }
    | { type: "lab"; l: Lab };
};

const firstYear = (s: string) => Number(s.match(/\d{4}/)?.[0] ?? 2026);
const span = (period: string) => {
  const years = period.match(/\d{4}/g) ?? [];
  const live = /present/.test(period);
  const a = years[0];
  const b = live ? "now" : years[years.length - 1];
  return !a ? period : a === b || !b ? a : `${a} to ${b}`;
};

/** Lab slugs keep the URLs that were shared before. */
export const labSlug: Record<string, string> = {
  smarttech: "accessible-smarttech",
  "3sixty": "sci-3sixty",
  upmc: "upmc-emergency-medicine",
  apodaca: "apodaca-lab",
  sociology: "pitt-sociology",
  max: "max-hospital",
};

const roleImage: Record<string, { src: string; look: Entry["look"] }> = {
  tarc: { src: "/covers/Development-Feasibility-Memo-2025.webp", look: "doc" },
  "tot-schools": {
    src: "/covers/TOT-Schools-Operations-Case-Study.webp",
    look: "doc",
  },
  crowwd: { src: "/work/crowwd/arthavaad-stage-640.webp", look: "photo" },
  "hdfc-bank": {
    src: "/covers/Apollo-Hospitals-Research-Note-Aug-2025.webp",
    look: "doc",
  },
};

export const entries: Entry[] = [
  ...ventures.map<Entry>((v) => ({
    slug: v.id,
    title: v.name,
    verb: "Started",
    year: firstYear(v.period),
    when: span(v.period),
    line: v.summary,
    image: v.shot?.src ?? v.proof.find((p) => p.cover)?.cover,
    look: v.shot ? "screen" : "doc",
    href: `/work/${v.id}`,
    caseOf: { type: "venture", v },
  })),
  ...roles.map<Entry>((r) => ({
    slug: r.id,
    title: r.org,
    verb: "Worked",
    year: firstYear(r.period),
    when: span(r.period),
    line: r.role,
    image: roleImage[r.id]?.src,
    look: roleImage[r.id]?.look ?? "doc",
    href: `/work/${r.id}`,
    caseOf: { type: "role", r },
  })),
  ...labs.map<Entry>((l) => ({
    slug: labSlug[l.id],
    title: l.name,
    verb: "Researched",
    year: firstYear(l.period),
    when: span(l.period),
    line: l.summary,
    image: l.shot?.src,
    look: "screen",
    href: `/work/${labSlug[l.id]}`,
    caseOf: { type: "lab", l },
  })),
  ...writing.map<Entry>((w) => ({
    slug: w.cover.split("/").pop()!.replace(".webp", "").toLowerCase(),
    title: w.title.split(":")[0],
    verb: "Wrote",
    year: Number(w.year),
    when: w.year,
    line: w.kind,
    image: w.cover,
    look: "doc",
    href: w.extra?.href ?? w.href,
  })),
  ...builds.map<Entry>((b) => ({
    slug: b.id,
    title: b.name,
    verb: "Built",
    year: 2026,
    when: "2026",
    line: b.kind === "Game" ? `Game. ${b.summary}` : b.summary,
    image: b.image,
    look: b.phone ? "phone" : "screen",
    href: b.falls ? b.href! : `/play/${b.id}`,
  })),
].sort((a, b) => b.year - a.year);

export const cases = entries.filter((e) => e.caseOf);
/** The index lists everything except the builds, which get their own playable room. */
export const indexEntries = entries.filter((e) => e.verb !== "Built");
