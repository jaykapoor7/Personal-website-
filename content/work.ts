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
  /** One short line: role or kind, then the strongest fact. */
  line: string;
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
const join = (...parts: (string | undefined)[]) =>
  parts.filter(Boolean).join(" · ");

const ventureImage: Record<string, { image: string; look: Look }> = {
  straypaw: { image: "/previews/straypaw-map-d.webp", look: "shot" },
  "juno-ai": { image: "/previews/juno-light-d.webp", look: "shot" },
};

/** Facts already stated in each role's points, short enough for one line. */
const roleFact: Record<string, string> = {
  "tot-schools": "8 centres",
  crowwd: "200+ users from organic channels",
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
      line: join(v.role, `${v.metrics[0].value} ${v.metrics[0].label}`),
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
      line: join(r.role, roleFact[r.id]),
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
    line: join(l.role, l.lead ? `with ${l.lead}` : undefined),
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
    line: "Five interactive public-health models",
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
        ? `Investment memos, ${ledgerStats.calls} dated forecasts`
        : map
          ? "36 companies across nine sectors"
          : paper
            ? "Published in IJEDR"
            : w.kind,
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
      line: join(b.kind, buildFact[b.id]),
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
