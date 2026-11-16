/**
 * Everything I have done, for the complete index at /work and the lists on the
 * home page. Built from site.ts and cases.ts, so each fact is written once.
 *
 * Microcopy:
 *   name   the proper name, nothing added
 *   line   one specific sentence: what it is or what I did, with the strongest fact
 *   meta   the role, or the kind of thing it is
 *   years  "2019–2023", "2026–now" or a single year
 */
import { caseStudies } from "./cases";
import { builds, labs, otherResearch, writing } from "./site";

export const groups = [
  "Startups",
  "Experience",
  "Research",
  "Writing",
  "Projects",
  "Play",
] as const;
export type Group = (typeof groups)[number];

export type Item = {
  id: string;
  group: Group;
  name: string;
  line: string;
  meta: string;
  years: string;
  status?: "Live" | "Published";
  image?: string;
  logo?: string;
  /** Empty when there is nothing to open. */
  href: string;
  /** Opens a file or another site, in a new tab. */
  external?: boolean;
};

export const slug = (g: Group) => g.toLowerCase();

const fromCase = (group: Group) => (slugs: string[]) =>
  slugs.map<Item>((s) => {
    const c = caseStudies.find((x) => x.slug === s)!;
    return {
      id: c.slug,
      group,
      name: c.name,
      line: c.line,
      meta: c.role,
      years: c.years,
      status: c.status,
      image: c.image,
      logo: c.logo,
      href: `/work/${c.slug}/`,
    };
  });

/** One line per lab, from its summary, and the years from its period. */
const labLine: Record<string, string> = {
  smarttech:
    "Human-machine interaction for accessible smart technology, with Prof. Dan Ding.",
  "3sixty":
    "Applied AI at Pitt's School of Computing and Information, including how nonprofits adopt AI.",
  upmc: "Prehospital care and emergency outcomes across UPMC's regional EMS system.",
  apodaca:
    "How bladder cells sense stretch: primary cell culture for PIEZO and TMEM63 studies.",
  sociology: "Literature reviews, survey data and analysis in R and Stata.",
  max: "Emergency and internal medicine, in New Delhi.",
};
const labYears: Record<string, string> = {
  smarttech: "2026–now",
  "3sixty": "2026–now",
  upmc: "2025–2026",
  apodaca: "2024–2025",
  sociology: "",
  max: "2023–2024",
};

const writingCopy: Record<
  string,
  { name: string; line: string; href?: string; external?: boolean }
> = {
  "/work/juno-ai/Juno-AI-Research-Paper.pdf": {
    name: "Juno-AI research paper",
    line: "A retrieval-grounded conversational platform for equitable healthcare information access. Published in IJEDR.",
    external: true,
  },
  "/research/Memo-Library-and-Ledger.pdf": {
    name: "Memo Library and Forecast Ledger",
    line: "Ten dated memos on healthcare and fintech, each scored against what happened.",
    href: "/ledger/",
  },
  "/research/India-HealthTech-Market-Map.pdf": {
    name: "India HealthTech Market Map",
    line: "36 companies across nine sectors, with the dataset.",
    href: "/market-map/",
  },
  "/research/Qure-AI-Investment-Memo.pdf": {
    name: "Qure.ai",
    line: "An investment memo on AI imaging diagnostics for the Global South.",
    external: true,
  },
  "/research/India-GLP1-Sector-Thesis.pdf": {
    name: "India's GLP-1 Inflection",
    line: "What the semaglutide patent cliff means for metabolic care in India.",
    external: true,
  },
  "/research/India-Fintech-Sector-Thesis.pdf": {
    name: "India's Retail-Investing Reset",
    line: "Retail broking in India after the new F&O rules.",
    external: true,
  },
};

const buildImage: Record<string, string> = {
  falls: "/previews/falls-d.webp",
};

export const items: Item[] = [
  ...fromCase("Startups")([
    "straypaw",
    "juno-ai",
    "project-nidaan",
    "finer-things-club",
  ]),
  ...fromCase("Experience")(["tarc", "tot-schools", "crowwd", "hdfc-bank"]),
  ...fromCase("Research")(["straypaw-research-models"]),
  ...labs.map<Item>((l) => ({
    id: l.id,
    group: "Research",
    name: l.name.replace(/, New Delhi$/, ""),
    line: labLine[l.id] ?? l.summary,
    meta: l.role,
    years: labYears[l.id] ?? "",
    image: l.shot?.src,
    logo: l.logo,
    href: l.site.href,
    external: true,
  })),
  ...otherResearch
    .filter((o) => !o.href)
    .map<Item>((o) => ({
      id: "kisan-rail",
      group: "Research",
      name: "India's Kisan Rail",
      line: `Economics research with Prof. Yasir Khan.`,
      meta: "Research",
      years: "",
      href: "",
    })),
  ...writing.map<Item>((w) => {
    const c = writingCopy[w.href];
    return {
      id: w.cover,
      group: "Writing",
      name: c?.name ?? w.title,
      line: c?.line ?? w.note,
      meta: w.kind,
      years: w.year,
      status: "Published",
      image: w.cover,
      href: c?.href ?? w.href,
      external: c?.external ?? !c?.href,
    };
  }),
  ...builds.map<Item>((b) => ({
    id: b.id,
    group: b.kind === "Tool" ? "Projects" : "Play",
    name: b.name,
    line: b.summary,
    meta: b.falls ? "Toy" : b.kind,
    years: "2026",
    status: "Live",
    image: buildImage[b.id] ?? b.image,
    href: b.falls ? b.href! : `/play/${b.id}/`,
  })),
];

export const byGroup = groups.map((g) => ({
  group: g,
  items: items.filter((i) => i.group === g),
}));

/** Places I have worked, newest first, for the CV on the home page. */
export const experience = caseStudies
  .filter((c) => c.slug !== "straypaw-research-models")
  .map((c) => ({
    id: c.slug,
    name: c.name,
    role: c.role,
    years: c.years,
    href: `/work/${c.slug}/`,
    start: Number(c.years.slice(0, 4)),
  }))
  .sort((a, b) => b.start - a.start);
