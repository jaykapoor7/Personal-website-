/**
 * The editorial layer for every case page: what it is in one line, the
 * context, the problem, what I did, and what came of it.
 *
 * Rule: every sentence here restates a fact already on the site (site.ts, the
 * documents it links, or the Research Models site). Nothing is estimated or
 * rounded up. Each outcome says what kind of evidence it is:
 *   Measured     a number that was counted
 *   Shipped      something built and in use
 *   Partnership  an agreement with a named organisation
 *   Pilot        a trial, not yet a programme
 *   Published    a paper, note or public release
 */
import {
  researchModels,
  roles,
  ventures,
  type Link,
  type Metric,
  type Proof,
  type Shot,
} from "./site";

export type OutcomeKind =
  | "Measured"
  | "Shipped"
  | "Partnership"
  | "Pilot"
  | "Published";
export type Outcome = { kind: OutcomeKind; text: string };

export type CaseStudy = {
  slug: string;
  name: string;
  /** One specific line: what it is, for whom. */
  line: string;
  /** Shorter still, with the strongest fact: for the home page list. */
  short?: string;
  role: string;
  /** "2019–2023", "2026–now". */
  years: string;
  /** What kind of work, for the index and the meta line. */
  kind: string;
  place?: string;
  status?: "Live" | "Published";
  context?: string;
  problem?: string;
  did: string[];
  outcomes: Outcome[];
  metrics: Metric[];
  logo?: string;
  site?: Link;
  links: Link[];
  docs: Proof[];
  shot?: Shot;
  photos?: { src: string; alt: string; caption: string }[];
  /** The picture for lists: a screenshot, photo or first page of a document. */
  image?: string;
};

const venture = (id: string) => ventures.find((v) => v.id === id)!;
const role = (id: string) => roles.find((r) => r.id === id)!;
const cover = (p: Proof[]) => p.find((d) => d.cover)?.cover;

const straypaw = venture("straypaw");
const juno = venture("juno-ai");
const nidaan = venture("project-nidaan");
const finer = venture("finer-things-club");
const tarc = role("tarc");
const tot = role("tot-schools");
const crowwd = role("crowwd");
const hdfc = role("hdfc-bank");

export const caseStudies: CaseStudy[] = [
  {
    slug: "straypaw",
    name: straypaw.name,
    line: "A shared record of India's street animals, used by feeders, rescue groups and city programmes.",
    short: "A shared record of India's street animals. 30,288 records in 28 cities.",
    role: "Founder",
    years: "2026–now",
    kind: "Startup",
    status: "Live",
    context:
      "Street dogs in Indian cities are fed, rescued, sterilised and vaccinated by many different people: neighbourhood feeders, NGOs, and municipal animal birth control (ABC) and anti-rabies vaccination (ARV) programmes.",
    problem:
      "Nobody kept a shared record of the animals themselves, so ABC and vaccination work was hard to verify: which dog is which, where it lives, and what has already been done for it.",
    did: [
      "Started StrayPaw and built the product: a public map and register where every animal has its own profile.",
      "Built the tools partners work in: NGO case workspaces, municipal ABC/ARV analytics, offline access for field work, and widgets partners can embed on their own sites.",
      "Brought on 19 NGO partners, and ran community workshops with STRAW India and The Kind Hour Foundation.",
    ],
    outcomes: [
      {
        kind: "Measured",
        text: "30,288 animal records across 28 cities. The register started with 50 dogs in Delhi and passed 30,000 within two months.",
      },
      {
        kind: "Partnership",
        text: "19 NGO partners, including PAWS Chennai, Pawsome People Project and The Kind Hour Foundation.",
      },
      {
        kind: "Pilot",
        text: "A pilot with the Ludhiana municipality.",
      },
      {
        kind: "Shipped",
        text: "NGO case workspaces, ABC/ARV analytics, offline field access and embeddable partner widgets.",
      },
    ],
    metrics: straypaw.metrics,
    logo: straypaw.logo,
    site: straypaw.site,
    links: [
      { label: "Live map", href: "https://www.straypaw.org/map" },
      { label: "Research Models", href: "/work/straypaw-research-models/" },
      { label: "Code on GitHub", href: "https://github.com/jaykapoor7/Pok-mon-go-dog-" },
    ],
    docs: straypaw.proof,
    shot: straypaw.shot,
    image: "/previews/straypaw-map-d.webp",
  },
  {
    slug: "juno-ai",
    name: juno.name,
    line: "An AI health assistant for families in rural India, grounded in vetted sources and linked to doctors and pharmacies.",
    short: "AI health information for rural India. 10,000+ users, published in IJEDR.",
    role: "Founder",
    years: "2019–2023",
    kind: "Startup",
    context: "I started Juno-AI at 14 and ran it for four years.",
    problem: "Families in rural India lived hours from the nearest doctor.",
    did: [
      "Built an AI health assistant that answers from vetted sources, and connects people to doctors, pharmacies and Practo bookings.",
      "Set up four healthcare partnerships.",
      "Wrote up the system's design and evaluation as a research paper.",
    ],
    outcomes: [
      { kind: "Measured", text: "10,000+ users in rural India." },
      {
        kind: "Measured",
        text: "180% user growth in 12 months, driven by the four healthcare partnerships.",
      },
      {
        kind: "Published",
        text: "System design and evaluation published in IJEDR (2024).",
      },
    ],
    metrics: juno.metrics,
    logo: juno.logo,
    site: juno.site,
    links: juno.links ?? [],
    docs: juno.proof,
    shot: {
      src: "/previews/juno-light-d.webp",
      url: "preventive-healthcare-xi.vercel.app",
    },
    image: "/previews/juno-light-d.webp",
  },
  {
    slug: "project-nidaan",
    name: nidaan.name,
    line: "Medication access for gig-economy delivery riders in Bengaluru.",
    short: "Medication access for delivery riders. 55 interviews, with Zomato and Swiggy.",
    role: "Co-founder",
    years: "2022–2024",
    kind: "Startup",
    context:
      "Bengaluru's delivery riders work long hours for platforms like Zomato and Swiggy.",
    problem: nidaan.broken,
    did: [
      "Co-founded the project and ran 55 field interviews with riders.",
      "Owned the coding and analysis of those interviews.",
      "Worked with Zomato and Swiggy to get medication to riders working long hours.",
    ],
    outcomes: [
      { kind: "Measured", text: "55 rider interviews, coded and analysed." },
      {
        kind: "Partnership",
        text: "Zomato and Swiggy, to get medication to their riders.",
      },
    ],
    metrics: nidaan.metrics,
    logo: nidaan.logo,
    links: [],
    docs: nidaan.proof,
    image: cover(nidaan.proof),
  },
  {
    slug: "straypaw-research-models",
    name: researchModels.name,
    line: "Five interactive models of public-health paradoxes, each with a research note.",
    short: "Five interactive public-health models, each with a research note.",
    role: "Author",
    years: "2026",
    kind: "Research",
    status: "Published",
    context:
      "StrayPaw works on making animal birth control and rabies vaccination records easier to verify. Building that software raises questions a register alone cannot answer.",
    problem:
      "Where did a campaign miss dogs? When does a change in reporting look like a change in cases? How would you tell whether an intervention made a difference?",
    did: [
      "Built five experiments you can change by hand: vaccine coverage, case reporting, case mix, sterilisation and prevention.",
      "Started each model from an aggregate in StrayPaw's register. The 70% Paradox, for example, uses 6,462 historical vaccination records from the Mission Rabies campaign.",
      "Wrote a research note for each: how the inputs are calculated, where hypothetical assumptions enter, and what evidence a real estimate would need.",
    ],
    outcomes: [
      {
        kind: "Published",
        text: "Five interactive models and five research notes, open to anyone.",
      },
    ],
    metrics: [
      { value: "5", label: "interactive models" },
      { value: "5", label: "research notes" },
      { value: "6,462", label: "vaccination records behind model 01" },
    ],
    logo: "/logos/straypaw.png",
    site: { label: "Open the models", href: researchModels.workPath },
    links: [{ label: "StrayPaw", href: "/work/straypaw/" }],
    docs: [],
    shot: {
      src: "/previews/research-models-d.webp",
      url: "kapoorjay.com/research-models",
    },
    image: "/previews/research-models-d.webp",
  },
  {
    slug: "finer-things-club",
    name: finer.name,
    line: "An online marketplace that brought rural artisans to buyers through NGO and marketplace partners.",
    short: "A marketplace for rural artisans. 300+ artisans, $8k+ in sales.",
    role: "Founder",
    years: "2021–2024",
    kind: "Startup",
    problem: finer.broken,
    did: [
      "Started the marketplace and brought artisans onto it through NGO and marketplace partners.",
    ],
    outcomes: [
      { kind: "Measured", text: "300+ rural artisans onboarded." },
      { kind: "Measured", text: "$8k+ in revenue." },
    ],
    metrics: finer.metrics,
    logo: finer.logo,
    links: [],
    docs: finer.proof,
    image: cover(finer.proof),
  },
  {
    slug: "tot-schools",
    name: tot.org,
    line: "Operations for an early childhood business with eight centres.",
    role: tot.role,
    years: "2025–2026",
    kind: "Early education",
    place: tot.place,
    problem: tot.question,
    did: tot.points,
    outcomes: [
      {
        kind: "Shipped",
        text: "Illumine for attendance, billing and parent communication, and CCTV, in every centre.",
      },
      { kind: "Shipped", text: "A 12-document handbook and SOP suite." },
    ],
    metrics: [{ value: "8", label: "centres" }],
    logo: tot.logo,
    site: tot.site,
    links: [],
    docs: tot.proof,
    image: cover(tot.proof),
  },
  {
    slug: "crowwd",
    name: crowwd.org,
    line: "Growth work for a social investing platform with about 20,000 users.",
    role: crowwd.role,
    years: "2025",
    kind: "Fintech",
    place: crowwd.place,
    problem: crowwd.question,
    did: crowwd.points,
    outcomes: [
      { kind: "Measured", text: "200+ users from organic channels." },
      {
        kind: "Shipped",
        text: "Arthavaad, a monthly speaker series across cities.",
      },
    ],
    metrics: [
      { value: "200+", label: "users from organic channels" },
      { value: "7", label: "platforms benchmarked" },
    ],
    logo: crowwd.logo,
    site: crowwd.site,
    links: [],
    docs: crowwd.proof,
    photos: crowwd.photos,
    image: crowwd.photos?.[0]?.src,
  },
  {
    slug: "tarc",
    name: "TARC",
    line: "Feasibility work on a housing site in Gurugram for a real estate developer.",
    role: tarc.role,
    years: "2026",
    kind: "Real estate",
    place: tarc.place,
    problem: tarc.question,
    did: tarc.points,
    outcomes: [],
    metrics: [],
    logo: tarc.logo,
    site: tarc.site,
    links: [],
    docs: tarc.proof,
    image: cover(tarc.proof),
  },
  {
    slug: "hdfc-bank",
    name: hdfc.org,
    line: "Equity and fund research for high-net-worth client portfolios.",
    role: "Wealth Management Intern",
    years: "2025",
    kind: "Banking",
    place: hdfc.place,
    problem: hdfc.question,
    did: hdfc.points,
    outcomes: [],
    metrics: [],
    logo: hdfc.logo,
    site: hdfc.site,
    links: [],
    docs: hdfc.proof,
    image: cover(hdfc.proof),
  },
];

export const caseBySlug = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);

/** The five on the home page, in order. */
export const selected = [
  "straypaw",
  "juno-ai",
  "project-nidaan",
  "straypaw-research-models",
  "finer-things-club",
].map((s) => caseBySlug(s)!);
