/** Everything I have done, as one list for the index on the landing page.
 * Built from the lists in site.ts, so each item is still described once. */
import { hasPage } from "./archive";
import { ledgerStats } from "./ledger";
import { builds, labs, researchModels, roles, ventures, writing } from "./site";

export const groups = [
  "Startups",
  "Experience",
  "Research",
  "Writing",
  "Projects",
] as const;
export type Group = (typeof groups)[number];

/** How the picture is shaped, so the preview takes the right size. */
export type Look = "shot" | "doc" | "photo" | "phone" | "logo";

export type Item = {
  id: string;
  group: Group;
  name: string;
  /** The role or kind, said quietly. */
  line: string;
  /** The strongest fact, said first and loudest. */
  fact?: string;
  /** "Now", a year, or "" when there is none. */
  year: string;
  image?: string;
  logo?: string;
  look: Look;
  href: string;
  /** A plain link: a file, another site, or a static page outside the app. */
  plain?: boolean;
};

const startYear = (period: string) =>
  /present/.test(period) ? "Now" : (period.match(/\d{4}/)?.[0] ?? "");
const lastYear = (period: string) =>
  /present/.test(period) ? "Now" : (period.match(/\d{4}/g)?.slice(-1)[0] ?? "");

const ventureImage: Record<string, { image: string; look: Look }> = {
  straypaw: { image: "/previews/straypaw-map-d.webp", look: "shot" },
  "juno-ai": { image: "/previews/juno-light-d.webp", look: "shot" },
};

/** Facts already stated in each role's points, short enough for one line. */
const roleFact: Record<string, string> = {
  tarc: "Feasibility for a Gurugram housing site",
  "tot-schools": "Ran 8 centres",
  crowwd: "200+ users from organic channels",
  "hdfc-bank": "Equity research for HNI portfolios",
};
const roleName: Record<string, string> = {
  "hdfc-bank": "Wealth Management Intern",
};

/** What each lab works on, from its summary on the site. */
const labFact: Record<string, string> = {
  smarttech: "Accessible human-machine interaction",
  "3sixty": "How nonprofits adopt AI",
  upmc: "Prehospital care and EMS outcomes",
  apodaca: "Bladder cell mechanosensing",
  sociology: "Survey analysis in R and Stata",
  max: "Emergency and internal medicine",
};

const buildFact: Record<string, string> = {
  emergency: "34 emergencies",
  strike: "20 disputes, 3 endings",
  cura: "4 daily scores",
  "llm-lab": "Scores visibility in AI search",
  road360: "Runs on the phone, 194 tests",
  falls: "Playable here",
};
const buildImage: Record<string, { image: string; look: Look }> = {
  road360: { image: "/previews/road360-m.webp", look: "phone" },
  falls: { image: "/previews/falls-d.webp", look: "shot" },
};

export const items: Item[] = [
  ...ventures.map<Item>((v) => {
    const doc = v.proof.find((p) => p.cover);
    return {
      id: v.id,
      group: "Startups",
      name: v.name,
      line: v.role,
      fact: `${v.metrics[0].value} ${v.metrics[0].label}`,
      year: startYear(v.period),
      ...(ventureImage[v.id] ?? { image: doc?.cover, look: "doc" as Look }),
      href: `/work/${v.id}`,
    };
  }),
  ...roles.map<Item>((r) => {
    const doc = r.proof.find((p) => p.cover);
    const photo = r.photos?.[0];
    return {
      id: r.id,
      group: "Experience",
      name: r.org.replace(/ India$/, ""),
      line: roleName[r.id] ?? r.role,
      fact: roleFact[r.id],
      year: lastYear(r.period),
      image: photo?.src ?? doc?.cover,
      look: photo ? "photo" : "doc",
      href: hasPage(r) ? `/work/${r.id}` : (doc?.href ?? r.site?.href ?? "/"),
      plain: !hasPage(r),
    };
  }),
  ...labs.map<Item>((l) => ({
    id: l.id,
    group: "Research",
    name: l.name.replace(/, New Delhi$/, ""),
    line: l.role,
    fact: labFact[l.id],
    year: startYear(l.period),
    image: l.shot?.src,
    logo: l.logo,
    look: l.shot ? "shot" : "logo",
    href: l.site.href,
    plain: true,
  })),
  {
    id: "research-models",
    group: "Writing",
    name: "StrayPaw Research Models",
    line: "Interactive models",
    fact: "5 public-health models",
    year: "2026",
    image: "/research-models/social.png",
    look: "shot",
    href: researchModels.href.replace("https://kapoorjay.com", ""),
    plain: true,
  },
  ...writing.map<Item>((w) => {
    const ledger = w.href.includes("Memo-Library");
    const map = w.href.includes("Market-Map");
    const paper = w.href.includes("juno-ai");
    return {
      id: w.cover,
      group: "Writing",
      name: ledger
        ? "Memo Library & Forecast Ledger"
        : map
          ? "India HealthTech Market Map"
          : paper
            ? "Juno-AI research paper"
            : w.title.split(":")[0],
      line: ledger
        ? "Investment memos"
        : map
          ? "Market map"
          : paper
            ? "Paper"
            : w.kind,
      fact: ledger
        ? `${ledgerStats.calls} dated forecasts`
        : map
          ? "36 companies, nine sectors"
          : paper
            ? "Published in IJEDR"
            : undefined,
      year: w.year,
      image: w.cover,
      look: "doc",
      href: ledger ? "/ledger" : map ? "/market-map" : w.href,
      plain: !(ledger || map),
    };
  }),
  // Games first: they show best in a picture.
  ...["emergency", "strike", "cura", "llm-lab", "road360", "falls"]
    .map((id) => builds.find((b) => b.id === id)!)
    .map<Item>((b) => ({
      id: b.id,
      group: "Projects",
      name: b.name,
      line: b.kind,
      fact: buildFact[b.id],
      year: "2026",
      ...(buildImage[b.id] ?? { image: b.image, look: "shot" as Look }),
      href: b.falls ? b.href! : `/play/${b.id}`,
    })),
];

/** Current work first, then newest first; the rest keep their order. */
const rank = (y: string) => (y === "Now" ? 9999 : Number(y) || 0);
export const byGroup = groups.map((g) => ({
  group: g,
  items: items
    .filter((i) => i.group === g)
    .map((i, n) => ({ i, n }))
    .sort((a, b) => rank(b.i.year) - rank(a.i.year) || a.n - b.n)
    .map(({ i }) => i),
}));

export const slug = (g: Group) => g.toLowerCase();
