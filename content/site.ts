/** Everything on the site, in one place. Each item appears exactly once.
 * Sources: Jay's resume and LinkedIn (October 2026).
 * Links: `site` is the real organisation or product; `proof` holds the supporting
 * documents (PDF first pages live in /public/covers, screenshots in /public/previews).
 * House style: no em dashes, "Resume" without accents.
 */

export const person = {
  name: "Jay Kapoor",
  email: "jak581@pitt.edu",
  place: "Pittsburgh, PA",
  intro:
    "Founder of StrayPaw. I work where public health, data and operations meet, from healthcare access in rural India to emergency medicine research at Pitt.",
  about: [
    "I went to school in Bangalore, spent my summers working in Delhi, and now study Economics and Statistics at the University of Pittsburgh.",
    "Most of what I build starts with something I noticed: a dog outside a cafe that nobody was keeping track of, a delivery rider carrying medicine he could not get for himself, families hours away from the nearest doctor.",
    "Away from work I play football, make small browser games, and write down predictions so I can check how wrong I was.",
  ],
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jay-kapoor7" },
    { label: "GitHub", href: "https://github.com/jaykapoor7" },
    { label: "X", href: "https://x.com/jaybuildsvx" },
  ],
  resume: "/jay-kapoor-resume.pdf",
};

export type Link = { label: string; href: string };
export type Metric = { value: string; label: string };
export type Proof = { label: string; href: string; cover?: string };
export type Shot = {
  src: string;
  url: string;
  /** Full-page screenshot, scrollable inside the frame. */
  scroll?: string;
  ratio?: number;
};

const cover = (pdf: string) =>
  `/covers/${pdf.split("/").pop()!.replace(".pdf", ".webp")}`;
const doc = (label: string, href: string): Proof => ({
  label,
  href,
  cover: href.endsWith(".pdf") ? cover(href) : undefined,
});

/* Startups: things I started */
export type Venture = {
  id: string;
  name: string;
  role: string;
  period: string;
  summary: string;
  points: string[];
  metrics: Metric[];
  logo?: string;
  site?: Link;
  links?: Link[];
  shot?: Shot;
  proof: Proof[];
};

export const ventures: Venture[] = [
  {
    id: "straypaw",
    name: "StrayPaw",
    role: "Founder",
    period: "Jun 2026 to present",
    summary:
      "A shared record for every street animal in India, used by feeders, rescue groups and city programmes.",
    points: [
      "Grew from 50 dogs in Delhi to 30,000+ records across India in two months.",
      "Partnered with 19 NGOs, including PAWS Chennai, Pawsome People Project and The Kind Hour Foundation.",
      "NGO case workspaces, municipal ABC/ARV analytics, offline field access and embeddable partner widgets.",
      "Pilot with the Ludhiana municipality; community workshops with STRAW India and The Kind Hour Foundation.",
    ],
    metrics: [
      { value: "30,288", label: "animal records" },
      { value: "28", label: "cities" },
      { value: "19", label: "NGO partners" },
    ],
    logo: "/logos/straypaw.png",
    site: { label: "straypaw.org", href: "https://www.straypaw.org" },
    links: [
      { label: "Live map", href: "https://www.straypaw.org/map" },
      {
        label: "GitHub",
        href: "https://github.com/jaykapoor7/Pok-mon-go-dog-",
      },
    ],
    shot: {
      src: "/previews/straypaw-d.webp",
      url: "straypaw.org",
      scroll: "/previews/straypaw-scroll.webp",
      ratio: 5167 / 1200,
    },
    proof: [
      {
        label: "Architecture",
        href: "https://github.com/jaykapoor7/Pok-mon-go-dog-/blob/main/docs/ARCHITECTURE.md",
      },
    ],
  },
  {
    id: "juno-ai",
    name: "Juno-AI",
    role: "Founder",
    period: "Jun 2019 to Aug 2023",
    summary:
      "Health information and care navigation for rural India. Started at 14.",
    points: [
      "An AI health assistant grounded in vetted sources, connected to doctors, pharmacies and Practo bookings.",
      "Four healthcare partnerships drove 180% user growth in a year.",
      "System design and evaluation published in IJEDR.",
    ],
    metrics: [
      { value: "10,000+", label: "rural users" },
      { value: "180%", label: "growth in 12 months" },
    ],
    site: {
      label: "Visit Juno",
      href: "https://preventive-healthcare-xi.vercel.app/",
    },
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jaykapoor7/Preventive-healthcare-",
      },
    ],
    shot: {
      src: "/previews/juno-preventive-d.webp",
      url: "preventive-healthcare-xi.vercel.app",
      scroll: "/previews/juno-preventive-scroll.webp",
      ratio: 3500 / 1200,
    },
    proof: [
      doc("Research paper, IJEDR", "/work/juno-ai/Juno-AI-Research-Paper.pdf"),
    ],
  },
  {
    id: "project-nidaan",
    name: "Project Nidaan",
    role: "Co-founder",
    period: "May 2022 to Aug 2024",
    summary: "Medication access for gig-economy delivery riders in Bengaluru.",
    points: [
      "Ran 55 field interviews with riders and owned the coding and analysis.",
      "Partnered with Zomato and Swiggy to get medication to riders working long hours.",
    ],
    metrics: [
      { value: "55", label: "rider interviews" },
      { value: "2", label: "platform partners" },
    ],
    proof: [
      doc(
        "Field research brief",
        "/work/project-nidaan/Project-Nidaan-Field-Research-Brief.pdf",
      ),
      doc(
        "KPI dashboard (XLSX)",
        "/work/project-nidaan/Project-Nidaan-KPI-Dashboard.xlsx",
      ),
    ],
  },
  {
    id: "finer-things-club",
    name: "The Finer Things Club",
    role: "Founder",
    period: "Jul 2021 to Aug 2024",
    summary:
      "An online marketplace that brought rural artisans to buyers through NGO and marketplace partners.",
    points: ["Onboarded 300+ rural artisans and generated $8k+ in revenue."],
    metrics: [
      { value: "300+", label: "artisans" },
      { value: "$8k+", label: "revenue" },
    ],
    proof: [
      doc(
        "Marketplace one-pager",
        "/work/finer-things-club/Finer-Things-Marketplace-One-Pager.pdf",
      ),
    ],
  },
];

/* Experience: places I worked */
export type Role = {
  id: string;
  /** The question the job was really about. */
  question: string;
  org: string;
  role: string;
  period: string;
  place: string;
  context?: string;
  points: string[];
  logo?: string;
  site?: Link;
  proof: Proof[];
  photos?: { src: string; alt: string; caption: string }[];
};

export const roles: Role[] = [
  {
    id: "tarc",
    question: "What should be built on a plot of land in Gurugram?",
    org: "TARC India",
    role: "Project and Operations Associate",
    period: "Jan to Aug 2026",
    place: "New Delhi",
    context: "Real estate developer",
    points: [
      "Feasibility work on a Gurugram housing site: zoning, pricing and development assumptions.",
    ],
    logo: "/logos/tarc.png",
    site: { label: "tarc.in", href: "https://www.tarc.in" },
    proof: [
      doc(
        "Feasibility memo",
        "/work/tarc/Development-Feasibility-Memo-2025.pdf",
      ),
    ],
  },
  {
    id: "tot-schools",
    question: "How do you run eight preschools at once?",
    org: "TOT Schools",
    role: "Operations Lead",
    period: "Jun 2025 to Apr 2026",
    place: "India",
    context: "Eight-centre early childhood business",
    points: [
      "Ran technology, facilities, people, nutrition, documentation and finance across 8 centres.",
      "Rolled out Illumine for attendance, billing and parent communication, and CCTV in every centre.",
      "Hired centre heads, teachers and nurses; wrote the 12-document handbook and SOP suite.",
    ],
    logo: "/logos/tot.png",
    site: { label: "totlearning.in", href: "https://www.totlearning.in" },
    proof: [
      doc(
        "Operations case study",
        "/work/tot-schools/TOT-Schools-Operations-Case-Study.pdf",
      ),
    ],
  },
  {
    id: "crowwd",
    question: "Where does an investing app find its next users?",
    org: "Crowwd",
    role: "Founder's Office Intern",
    period: "May to Aug 2025",
    place: "New Delhi",
    context: "Social investing platform, ~20,000 users",
    points: [
      "Ran acquisition across Reddit, X, YouTube, Google Ads and generative search; organic channels brought 200+ users.",
      "Benchmarked Crowwd against 7 platforms including Stocktwits and eToro, and wrote the GEO playbook for the CEO.",
      "Launched Arthavaad, a monthly multi-city speaker series.",
    ],
    logo: "/logos/crowwd.png",
    site: { label: "crowwd.io", href: "https://crowwd.io" },
    proof: [
      doc("Fintech teardown", "/work/crowwd/Crowwd-Fintech-Teardown.pdf"),
      doc(
        "Research and strategy",
        "/work/crowwd/Crowwd-Selected-Research-and-Strategy.pdf",
      ),
    ],
    photos: [
      {
        src: "/work/crowwd/arthavaad-stage-1280.webp",
        alt: "Jay with a speaker at Arthavaad, Crowwd's speaker series, at The Circle.Work in New Delhi",
        caption: "Arthavaad, The Circle.Work",
      },
      {
        src: "/work/crowwd/arthavaad-audience-800.webp",
        alt: "Jay in the audience at an Arthavaad talk",
        caption: "In the audience",
      },
    ],
  },
  {
    id: "hdfc-bank",
    question: "What makes a stock worth putting in a client's portfolio?",
    org: "HDFC Bank",
    role: "Wealth Management Intern, HNI Division",
    period: "May to Aug 2025",
    place: "New Delhi",
    points: [
      "Researched equities, mutual funds and macro trends for HNI portfolio reviews, and built client pitch decks.",
    ],
    logo: "/logos/hdfc.png",
    site: { label: "hdfcbank.com", href: "https://www.hdfcbank.com" },
    proof: [
      doc(
        "Apollo Hospitals note",
        "/work/hdfc-bank/Apollo-Hospitals-Research-Note-Aug-2025.pdf",
      ),
      doc(
        "Portfolio allocation review",
        "/work/hdfc-bank/HNI-Portfolio-Allocation-Review.pdf",
      ),
    ],
  },
];

/* Research */
export type Lab = {
  id: string;
  question: string;
  name: string;
  role: string;
  period: string;
  lead?: string;
  summary: string;
  /** Extra detail for the answer and case page. */
  points?: string[];
  logo?: string;
  site: Link;
  shot?: Shot;
};

export const labs: Lab[] = [
  {
    id: "smarttech",
    question: "How should smart technology work for people with disabilities?",
    name: "Accessible SmartTech Lab",
    role: "Research Assistant",
    period: "Aug 2026 to present",
    lead: "Prof. Dan Ding",
    summary:
      "Human-machine interaction systems for accessible smart technologies.",
    logo: "/logos/pitt.png",
    site: {
      label: "smarttech.pitt.edu",
      href: "https://www.smarttech.pitt.edu",
    },
    shot: { src: "/previews/smarttech-d.webp", url: "smarttech.pitt.edu" },
  },
  {
    id: "3sixty",
    question: "How do nonprofits actually start using AI?",
    name: "SCI 3Sixty",
    role: "Fellow",
    period: "Sep 2026 to present",
    lead: "Prof. Rosta Farzan",
    summary:
      "Applied AI research at Pitt's School of Computing and Information, including how nonprofits adopt AI.",
    logo: "/logos/pitt.png",
    site: {
      label: "sci.pitt.edu",
      href: "https://www.sci.pitt.edu/give-sci/3sixty-program",
    },
    shot: { src: "/previews/sci-3sixty-d.webp", url: "sci.pitt.edu" },
  },
  {
    id: "upmc",
    question: "What happens to a patient before they reach the emergency room?",
    name: "UPMC Emergency Medicine",
    role: "Research Assistant",
    period: "Aug 2025 to Jan 2026",
    summary:
      "Prehospital care patterns and emergency outcomes across UPMC's regional EMS system, with EMR abstraction and REDCap coding.",
    logo: "/logos/upmc.png",
    site: {
      label: "emergencymedicine.pitt.edu",
      href: "https://www.emergencymedicine.pitt.edu",
    },
    shot: {
      src: "/previews/pitt-em-d.webp",
      url: "emergencymedicine.pitt.edu",
    },
  },
  {
    id: "apodaca",
    question: "How does a bladder cell know it is being stretched?",
    name: "Apodaca Lab",
    role: "Research Assistant",
    period: "Aug 2024 to May 2025",
    lead: "Prof. Gerard Apodaca",
    summary:
      "Urothelial mechanotransduction: primary bladder cell culture for PIEZO/TMEM63 studies, and figures for manuscripts and grants.",
    logo: "/logos/pitt.png",
    site: {
      label: "Lab page",
      href: "https://people.dom.pitt.edu/people/gerard-apodaca-phd",
    },
    shot: { src: "/previews/apodaca-d.webp", url: "people.dom.pitt.edu" },
  },
  {
    id: "sociology",
    question: "How do you turn a survey into evidence?",
    name: "Pitt Sociology",
    role: "Research Assistant",
    period: "Pitt",
    summary:
      "Social-science research in Pitt's Department of Sociology: literature reviews, survey data and analysis in R and Stata.",
    points: [
      "Worked across the research cycle: literature review, data collection and cleaning, coding, and analysis in R and Stata.",
      "Ran digital outreach and logistics for 10+ sociology workshops.",
    ],
    logo: "/logos/pitt.png",
    site: {
      label: "sociology.pitt.edu",
      href: "https://www.sociology.pitt.edu",
    },
    shot: { src: "/previews/pitt-sociology-d.webp", url: "sociology.pitt.edu" },
  },
  {
    id: "max",
    question: "What does emergency medicine look like from the inside?",
    name: "Max Hospital, New Delhi",
    role: "Clinical shadowing",
    period: "2023 to 2024",
    summary:
      "Clinical shadowing in emergency and internal medicine at Max Hospital in New Delhi.",
    site: { label: "maxhealthcare.in", href: "https://www.maxhealthcare.in" },
  },
];

export const otherResearch: { name: string; detail: string; href?: string }[] =
  [
    {
      name: "Economics research with Prof. Yasir Khan",
      detail: "India's Kisan Rail.",
    },
  ];

/* Writing */
export type Writing = {
  title: string;
  kind: string;
  year: string;
  note: string;
  href: string;
  cover: string;
  extra?: Link;
};

export const writing: Writing[] = [
  {
    title:
      "Juno AI: A Retrieval-Grounded Conversational Platform for Equitable Healthcare Information Access",
    kind: "Paper, IJEDR",
    year: "2024",
    note: "System design and evaluation of Juno-AI.",
    href: "/work/juno-ai/Juno-AI-Research-Paper.pdf",
    cover: cover("/work/juno-ai/Juno-AI-Research-Paper.pdf"),
  },
  {
    title: "The Memo Library & Ledger",
    kind: "Investment memos",
    year: "2026",
    note: "Ten dated memos on healthcare and fintech, each scored against what happened.",
    href: "/research/Memo-Library-and-Ledger.pdf",
    cover: cover("/research/Memo-Library-and-Ledger.pdf"),
    extra: { label: "Forecast ledger", href: "/ledger" },
  },
  {
    title: "India HealthTech Market Map",
    kind: "Market map",
    year: "2026",
    note: "36 companies across nine sectors, with the dataset.",
    href: "/research/India-HealthTech-Market-Map.pdf",
    cover: cover("/research/India-HealthTech-Market-Map.pdf"),
    extra: { label: "Explore the map", href: "/market-map" },
  },
  {
    title: "Qure.ai: AI Diagnostics for the Global South",
    kind: "Investment memo",
    year: "2026",
    note: "AI imaging diagnostics.",
    href: "/research/Qure-AI-Investment-Memo.pdf",
    cover: cover("/research/Qure-AI-Investment-Memo.pdf"),
  },
  {
    title: "India's GLP-1 Inflection",
    kind: "Sector thesis",
    year: "2026",
    note: "What the semaglutide patent cliff means for metabolic care in India.",
    href: "/research/India-GLP1-Sector-Thesis.pdf",
    cover: cover("/research/India-GLP1-Sector-Thesis.pdf"),
  },
  {
    title: "India's Retail-Investing Reset",
    kind: "Sector thesis",
    year: "2026",
    note: "Retail broking after the F&O rules.",
    href: "/research/India-Fintech-Sector-Thesis.pdf",
    cover: cover("/research/India-Fintech-Sector-Thesis.pdf"),
  },
];

/* Builds: tools and games I made for fun */
export type Build = {
  id: string;
  name: string;
  kind: "Tool" | "Game";
  summary: string;
  /** A few lines on what it does and how, for the Projects page. */
  points: string[];
  stack: string[];
  url?: string;
  href?: string;
  image?: string;
  phone?: boolean;
  code?: string;
  falls?: boolean;
};

export const builds: Build[] = [
  {
    id: "cura",
    name: "CURA",
    kind: "Tool",
    summary:
      "Turns Fitbit and Google Health data into four daily scores, with the reasons behind each.",
    points: [
      "Every score explains itself: what it means, what pushed it up or down, and what it changed downstream.",
      "Four daily scores (sleep, recovery, strain and energy), each with a signed ledger like “Sleep +9, late football −6”.",
      "Short heart-rate spikes from a bus sprint or a hot shower are flagged for review instead of being counted as workouts.",
      "Data comes from Google Health on demand and stays in your browser. No database and no account.",
    ],
    stack: ["Next.js", "TypeScript", "Google Health API"],
    url: "explain-my-whoop-stats.vercel.app",
    href: "https://explain-my-whoop-stats.vercel.app/",
    image: "/previews/health-os-d.webp",
    code: "https://github.com/jaykapoor7/Explain-my-whoop-stats-",
  },
  {
    id: "llm-lab",
    name: "LLM Visibility Lab",
    kind: "Tool",
    summary:
      "Scores how well ChatGPT, Claude and Perplexity can find, cite and recommend a website.",
    points: [
      "SEO tells you whether Google can find a site. This tells you whether ChatGPT, Claude and Perplexity can find it, understand it and recommend it.",
      "Crawls a page, builds an entity graph, and scores discoverability, entity strength and how likely an AI is to cite it.",
      "Simulates four real discovery prompts, such as “Would you recommend X?”, and shows the answer an AI would give.",
      "Every score shows its working, and fixes are ranked by impact over effort. Reports can be shared or compared head to head.",
    ],
    stack: ["Next.js", "TypeScript", "Server Actions"],
    url: "llm-ai-search-checker.vercel.app",
    href: "https://llm-ai-search-checker.vercel.app/",
    image: "/previews/search-visibility-d.webp",
    code: "https://github.com/jaykapoor7/LLM-AI-search-checker",
  },
  {
    id: "road360",
    name: "Road360",
    kind: "Tool",
    summary:
      "Scores a commute from horn noise and harsh braking. Nothing leaves the phone.",
    points: [
      "Spotify Wrapped for your commute. Start a drive and it measures how chaotic it really was.",
      "Uses GPS, the microphone and motion sensors to pick up horns, noise, hard braking and stop-and-go traffic.",
      "Each drive gets a 0 to 100 score, a shareable report and a replay. Streaks and a yearly wrap build up over time.",
      "Everything runs on the phone. There is no backend, and the app has 194 automated tests.",
    ],
    stack: ["Next.js", "PWA", "Web Audio", "Device sensors"],
    url: "road360.vercel.app",
    href: "https://road360.vercel.app/",
    image: "/previews/road360-m.webp",
    phone: true,
    code: "https://github.com/jaykapoor7/Road360",
  },
  {
    id: "strike",
    name: "Everybody's on Strike",
    kind: "Game",
    summary:
      "A productivity startup where every button has walked off the job.",
    points: [
      "A comedy game in which a perfectly ordinary corporate website goes on strike.",
      "The buttons walk off, the checkbox withdraws consent, the scrollbar takes a vacation and the popups become stakeholders.",
      "20 disputes, 3 endings and 4 secrets, about 5 to 8 minutes. Negotiate terms, catch falling cookies, wind a spinner by hand and sign a settlement.",
      "Runs entirely in the browser with synthesized sound, and works with mouse, touch and keyboard.",
    ],
    stack: ["React", "TypeScript", "Vite", "Web Audio"],
    url: "strike.kapoorjay.com",
    href: "https://strike.kapoorjay.com",
    image: "/previews/strike-d.webp",
    code: "https://github.com/jaykapoor7/everybodys-on-strike",
  },
  {
    id: "emergency",
    name: "The World's Worst Emergency Service",
    kind: "Game",
    summary: "Run a town's dispatch desk with the worst possible responses.",
    points: [
      "You run a town’s dispatch desk, badly. A cat needs rescuing, so you send a dinosaur. The dinosaur eats a house. You get promoted.",
      "34 emergencies and 102 possible responses. Every decision leaves a permanent mark on the town and sets up the next call.",
      "Drag vehicles, aim rescue lines, sweep cars with a giant magnet, and eventually get elected President.",
      "The town is drawn in code on a Canvas, the sounds are synthesized, and there is no backend.",
    ],
    stack: ["React", "TypeScript", "Canvas", "Web Audio"],
    url: "emergency.kapoorjay.com",
    href: "https://emergency.kapoorjay.com",
    image: "/previews/emergency-d.webp",
    code: "https://github.com/jaykapoor7/worst-emergency-service",
  },
  {
    id: "falls",
    name: "Everything Falls",
    kind: "Game",
    summary: "A small physics toy. Pick things up and throw them.",
    points: [
      "A small physics toy that lives on this site.",
      "Grab the objects, throw them around, and switch gravity off to watch them float.",
      "Works with a mouse or a finger.",
    ],
    stack: ["matter-js", "React"],
    url: "kapoorjay.com/play/everything-falls",
    href: "/play/everything-falls",
    falls: true,
  },
];

/* Leadership and education */
export const leadership = [
  {
    title: "Team Leader",
    org: "JumpStart / AmeriCorps",
    period: "Pittsburgh",
    detail:
      "Led 8 corps members delivering early-childhood literacy programmes in Pittsburgh schools.",
    logo: "/logos/jumpstart.png",
    href: "https://www.jstart.org",
  },
  {
    title: "Contingent Leader",
    org: "National Economics Fest",
    period: "2023",
    detail:
      "Led a team of six to Best Contingent out of 500+ colleges with macroeconomic models and policy proposals.",
  },
  {
    title: "Founder, Entrepreneurship Club",
    org: "The International School Bangalore",
    period: "2021 to 2023",
    detail: "Started and ran the school's entrepreneurship club.",
    logo: "/logos/tisb.png",
    href: "https://www.tisb.org",
  },
  {
    title: "Head of Vendor Acquisition",
    org: "The International School Bangalore",
    period: "2022",
    detail: "Managed 25 vendors and a $10k budget for a 4,000-attendee event.",
    logo: "/logos/tisb.png",
    href: "https://www.tisb.org",
  },
];

export const education = [
  {
    school: "University of Pittsburgh",
    detail: "B.S. Economics & Statistics, minor in Information Sciences",
    period: "Expected May 2028",
    logo: "/logos/pitt.png",
  },
  {
    school: "The International School Bangalore",
    detail: "International Baccalaureate Diploma",
    period: "2021 to 2023",
    logo: "/logos/tisb.png",
  },
];

export const skills = [
  "SQL",
  "Excel and VBA",
  "R",
  "Stata",
  "REDCap",
  "Regression",
  "Forecasting",
  "Next.js",
  "TypeScript",
  "Supabase",
];

/** Personal photos. The portrait is the hero and About photo; these four live on About. */
export const portrait = {
  src: "/photos/pitt_portrait-1280.webp",
  alt: "Jay Kapoor on the Cathedral of Learning lawn at the University of Pittsburgh",
};
export const life = [
  {
    name: "01_trojans_team",
    alt: "Jay with the Trojans football team",
    caption: "The Trojans",
  },
  {
    name: "07_school_ceremony",
    alt: "Jay on stage at his school graduation",
    caption: "Graduation, Bangalore",
  },
  {
    name: "02_childhood_running",
    alt: "Jay running at a childhood sports day",
    caption: "Sports day",
  },
  {
    name: "04_childhood_football_team",
    alt: "Jay's childhood football team with their coach",
    caption: "First team",
  },
];

/** Old project URLs that are not case pages any more, so shared links still land well. */
export const legacy: Record<string, string> = {
  "juno-preventive-health": "/work/juno-ai",
  "recovery-intelligence": "/play/cura",
  road360: "/play/road360",
  "seo-geo-optimiser": "/play/llm-lab",
  "everybodys-on-strike": "/play/strike",
  "worst-emergency-service": "/play/emergency",
  "everything-falls": "/play/everything-falls",
};
