/** Edit this file to update the public portfolio.
 * Sources: Jay's resume and LinkedIn (October 2026). Previews in /public/previews are
 * screenshots of the live sites; /public/covers are first pages of the linked PDFs.
 * House style: no em dashes, no accented spellings ("Resume").
 */
export const person = {
  name: "Jay Kapoor",
  email: "jak581@pitt.edu",
  school: "University of Pittsburgh",
  degree: "B.S. Economics & Statistics, minor in Information Sciences",
  place: "Pittsburgh, PA",
  about: [
    "I study Economics and Statistics at Pitt, with a minor in Information Sciences. Most of what I build started as something I noticed growing up in India.",
    "I started Juno-AI when I was 14 and grew it to 10,000+ rural users. Since then I have interviewed delivery riders about their medicine, run operations for eight childcare centres, worked in a fintech founder's office, and written investment memos that I score in public.",
    "These days I am building StrayPaw and doing applied AI and accessibility research at Pitt. When I am not working, I am probably playing football.",
  ],
  links: [
    { label: "Email", href: "mailto:jak581@pitt.edu" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jay-kapoor7" },
    { label: "GitHub", href: "https://github.com/jaykapoor7" },
    { label: "X", href: "https://x.com/jaybuildsvx" },
    { label: "Resume", href: "/jay-kapoor-resume.pdf" },
  ],
};

export type Link = { label: string; href: string };
export type Metric = { value: string; label: string };
export type Preview =
  | {
      type: "site";
      url: string;
      desktop: string;
      mobile?: string;
      scroll?: string;
      /** height / width of the scroll screenshot */
      scrollRatio?: number;
    }
  | { type: "doc"; cover: string; href: string };

export type Project = {
  slug: string;
  title: string;
  role: string;
  period?: string;
  category: string;
  summary: string;
  body: string[];
  highlights?: string[];
  metrics?: Metric[];
  preview?: Preview;
  gallery?: { src: string; alt: string; caption: string }[];
  links: Link[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "straypaw",
    title: "StrayPaw",
    role: "Solo founder",
    period: "2026-now",
    category: "Civic tech",
    featured: true,
    summary: "A shared record for every stray animal in India.",
    body: [
      "Feeders, rescue groups and city Animal Birth Control programmes all keep their own notebooks, WhatsApp groups and spreadsheets. StrayPaw puts every sighting, case and outcome on one record, so the people doing the work can see each other's work.",
    ],
    highlights: [
      "Built and launched a live platform with 30,000+ animal records across 28 Indian cities.",
      "Shipped NGO case workspaces, municipal ABC/ARV analytics, maps, offline field access and embeddable partner widgets.",
      "A WhatsApp bot that turns rescue-group posts into tracked cases.",
      "Contacted 40+ NGOs, feeders and government bodies. Partnering with VaccSafe (Hyderabad) on microchip-linked dog profiles.",
    ],
    metrics: [
      { value: "30,288", label: "animal records" },
      { value: "28", label: "cities" },
      { value: "40+", label: "NGOs and agencies contacted" },
    ],
    preview: {
      type: "site",
      url: "straypaw.kapoorjay.com",
      desktop: "/previews/straypaw-d.webp",
      mobile: "/previews/straypaw-map-m.webp",
      scroll: "/previews/straypaw-scroll.webp",
      scrollRatio: 5167 / 1200,
    },
    gallery: [
      {
        src: "/previews/straypaw-map-d.webp",
        alt: "StrayPaw's live map of India showing animal records by city",
        caption: "The live map",
      },
      {
        src: "/straypaw/street-dog.jpg",
        alt: "A street dog outside a cafe in Delhi",
        caption: "Delhi",
      },
    ],
    links: [
      { label: "Visit StrayPaw", href: "https://straypaw.kapoorjay.com" },
      { label: "Live map", href: "https://straypaw.kapoorjay.com/map" },
      {
        label: "Architecture",
        href: "https://github.com/jaykapoor7/Pok-mon-go-dog-/blob/main/docs/ARCHITECTURE.md",
      },
    ],
  },
  {
    slug: "juno-ai",
    title: "Juno-AI",
    role: "Founder",
    period: "2019-2024",
    category: "Healthcare access",
    featured: true,
    summary:
      "Health answers, doctors and pharmacies for rural India. Started at 14.",
    body: [
      "Juno started as a way to get reliable health information to families who lived hours from a doctor. It grew into a platform with a health assistant grounded in vetted sources, doctor discovery, pharmacy support and a personal health dashboard. I wrote up the system design as a research paper.",
    ],
    highlights: [
      "Founded at 14 and grew to 10,000+ rural users.",
      "Closed four healthcare partnerships, driving 180% user growth in 12 months.",
      "Built a retrieval-grounded health assistant, doctor discovery, pharmacy support and a health dashboard.",
      "Published the system design and evaluation as a paper.",
    ],
    metrics: [
      { value: "10,000+", label: "rural users" },
      { value: "180%", label: "user growth in a year" },
      { value: "4", label: "healthcare partners" },
    ],
    preview: {
      type: "doc",
      cover: "/covers/Juno-AI-Research-Paper.webp",
      href: "/work/juno-ai/Juno-AI-Research-Paper.pdf",
    },
    links: [
      {
        label: "Read the paper",
        href: "/work/juno-ai/Juno-AI-Research-Paper.pdf",
      },
      {
        label: "Juno today",
        href: "https://preventive-healthcare-xi.vercel.app/",
      },
    ],
  },
  {
    slug: "crowwd",
    title: "Crowwd",
    role: "Founder's Office",
    period: "2025",
    category: "Fintech",
    featured: true,
    summary:
      "Growth and research at a 20,000-user social investing app. Started the Arthavaad talks.",
    body: [
      "I worked with the founder and CEO on growth: Reddit, X, YouTube, Google Ads and generative search. I benchmarked Crowwd against seven social investing platforms, wrote the GEO playbook, and started Arthavaad, a monthly speaker series that ran in more than one city.",
    ],
    highlights: [
      "Organic channels onboarded 200+ users.",
      "Benchmarked against 7 platforms including Stocktwits and eToro.",
      "Wrote the generative search playbook for the CEO.",
      "Launched Arthavaad: speakers, brand partners and logistics.",
    ],
    metrics: [
      { value: "200+", label: "organic users" },
      { value: "7", label: "platforms benchmarked" },
    ],
    preview: {
      type: "site",
      url: "crowwd.io",
      desktop: "/previews/crowwd-d.webp",
      mobile: "/previews/crowwd-m.webp",
    },
    gallery: [
      {
        src: "/work/crowwd/arthavaad-stage-1280.webp",
        alt: "Jay at an Arthavaad event at The Circle.Work",
        caption: "Arthavaad at The Circle.Work",
      },
      {
        src: "/work/crowwd/arthavaad-audience.jpg",
        alt: "Audience at an Arthavaad talk",
        caption: "The audience",
      },
    ],
    links: [
      { label: "crowwd.io", href: "https://crowwd.io" },
      {
        label: "Fintech teardown",
        href: "/work/crowwd/Crowwd-Fintech-Teardown.pdf",
      },
      {
        label: "Research and strategy",
        href: "/work/crowwd/Crowwd-Selected-Research-and-Strategy.pdf",
      },
    ],
  },
  {
    slug: "tot-schools",
    title: "TOT Schools",
    role: "Operations Lead",
    period: "2025-2026",
    category: "Operations",
    featured: true,
    summary: "Ran six functions across eight childcare centres.",
    body: [
      "I ran the operating side of an eight-centre childcare business: technology, facilities, people, nutrition, documentation and finance. I rolled out Illumine for attendance, billing and parent messages, put CCTV in every centre, hired the staff, and wrote the handbook the centres run on.",
    ],
    highlights: [
      "Ran 6 functions across 8 centres.",
      "Rolled out Illumine and CCTV in every centre.",
      "Hired and onboarded centre heads, teachers, nurses and cleaners.",
      "Wrote a 12-document handbook and SOP suite.",
    ],
    metrics: [
      { value: "8", label: "centres" },
      { value: "6", label: "functions" },
      { value: "12", label: "SOP documents" },
    ],
    preview: {
      type: "doc",
      cover: "/covers/TOT-Schools-Operations-Case-Study.webp",
      href: "/work/tot-schools/TOT-Schools-Operations-Case-Study.pdf",
    },
    links: [
      {
        label: "Read the case study",
        href: "/work/tot-schools/TOT-Schools-Operations-Case-Study.pdf",
      },
    ],
  },
  {
    slug: "project-nidaan",
    title: "Project Nidaan",
    role: "Co-founder",
    period: "2022-2024",
    category: "Health research",
    featured: true,
    summary:
      "Why the riders who deliver our medicine struggle to get their own.",
    body: [
      "Delivery riders in Bengaluru spend all day moving medicine around the city and often cannot get their own. We sat down with them to find out where it breaks: cost, time off the road, pharmacy hours and trust.",
    ],
    highlights: [
      "Ran 55 field interviews with delivery riders.",
      "Owned the coding and analysis.",
      "Set up distribution partnerships with Zomato and Swiggy.",
    ],
    metrics: [
      { value: "55", label: "rider interviews" },
      { value: "2", label: "platform partners" },
    ],
    preview: {
      type: "doc",
      cover: "/covers/Project-Nidaan-Field-Research-Brief.webp",
      href: "/work/project-nidaan/Project-Nidaan-Field-Research-Brief.pdf",
    },
    links: [
      {
        label: "Read the brief",
        href: "/work/project-nidaan/Project-Nidaan-Field-Research-Brief.pdf",
      },
      {
        label: "KPI dashboard",
        href: "/work/project-nidaan/Project-Nidaan-KPI-Dashboard.xlsx",
      },
    ],
  },
  {
    slug: "finer-things-club",
    title: "The Finer Things Club",
    role: "Founder",
    period: "2021-2024",
    category: "Commerce",
    featured: true,
    summary: "A marketplace that got rural artisans paid properly.",
    body: [
      "I started The Finer Things Club to put rural artisans' work in front of people who would pay a fair price for it. I onboarded the artisans, ran the online sales, and built the NGO and marketplace partnerships that made distribution work.",
    ],
    highlights: [
      "Onboarded 300+ rural artisans.",
      "$8k+ in revenue through NGO and marketplace partners.",
    ],
    metrics: [
      { value: "300+", label: "artisans" },
      { value: "$8k+", label: "revenue" },
    ],
    preview: {
      type: "doc",
      cover: "/covers/Finer-Things-Marketplace-One-Pager.webp",
      href: "/work/finer-things-club/Finer-Things-Marketplace-One-Pager.pdf",
    },
    links: [
      {
        label: "Read the one-pager",
        href: "/work/finer-things-club/Finer-Things-Marketplace-One-Pager.pdf",
      },
    ],
  },
  {
    slug: "hdfc-bank",
    title: "HDFC Bank",
    role: "Wealth Management Intern",
    period: "2025",
    category: "Finance",
    featured: true,
    summary: "Equity and fund research for high-net-worth portfolio reviews.",
    body: [
      "In the HNI division I researched equities, mutual funds and macro trends for client portfolio reviews, and built the pitch decks that went in front of clients.",
    ],
    preview: {
      type: "doc",
      cover: "/covers/Apollo-Hospitals-Research-Note-Aug-2025.webp",
      href: "/work/hdfc-bank/Apollo-Hospitals-Research-Note-Aug-2025.pdf",
    },
    links: [
      {
        label: "Apollo Hospitals note",
        href: "/work/hdfc-bank/Apollo-Hospitals-Research-Note-Aug-2025.pdf",
      },
      {
        label: "Portfolio review",
        href: "/work/hdfc-bank/HNI-Portfolio-Allocation-Review.pdf",
      },
    ],
  },
  {
    slug: "tarc",
    title: "TARC",
    role: "Project and Operations Associate",
    period: "2026",
    category: "Real estate",
    summary: "Feasibility work on a housing project in Gurugram.",
    body: [
      "I researched zoning, pricing and development assumptions for a feasibility memo.",
    ],
    preview: {
      type: "doc",
      cover: "/covers/Development-Feasibility-Memo-2025.webp",
      href: "/work/tarc/Development-Feasibility-Memo-2025.pdf",
    },
    links: [
      {
        label: "Feasibility memo",
        href: "/work/tarc/Development-Feasibility-Memo-2025.pdf",
      },
    ],
  },
  {
    slug: "juno-preventive-health",
    title: "Juno",
    role: "Side project",
    period: "2026",
    category: "Prototype",
    summary: "Preventive health, explained before you need a hospital.",
    body: [
      "The next version of Juno: a site that makes the health consequences of everyday habits visible, built on the Claude API.",
    ],
    preview: {
      type: "site",
      url: "preventive-healthcare-xi.vercel.app",
      desktop: "/previews/juno-preventive-d.webp",
      mobile: "/previews/juno-preventive-m.webp",
      scroll: "/previews/juno-preventive-scroll.webp",
      scrollRatio: 3500 / 1200,
    },
    links: [
      {
        label: "Open Juno",
        href: "https://preventive-healthcare-xi.vercel.app/",
      },
    ],
  },
  {
    slug: "recovery-intelligence",
    title: "CURA",
    role: "Side project",
    period: "2026",
    category: "Prototype",
    summary: "Your wearable gives you charts. CURA gives you an answer.",
    body: [
      "Four daily scores from your own Fitbit or Google Health baseline, with the reasons behind each one.",
    ],
    preview: {
      type: "site",
      url: "explain-my-whoop-stats.vercel.app",
      desktop: "/previews/health-os-d.webp",
      mobile: "/previews/health-os-m.webp",
    },
    links: [
      {
        label: "Open CURA",
        href: "https://explain-my-whoop-stats.vercel.app/",
      },
    ],
  },
  {
    slug: "road360",
    title: "Road360",
    role: "Side project",
    period: "2026",
    category: "Prototype",
    summary:
      "How chaotic was your commute? Your phone listens for horns and feels the braking.",
    body: [
      "A phone app that scores a drive from horn noise and harsh braking. Nothing leaves the phone.",
    ],
    preview: {
      type: "site",
      url: "road360.vercel.app",
      desktop: "/previews/road360-d.webp",
      mobile: "/previews/road360-m.webp",
    },
    links: [{ label: "Open Road360", href: "https://road360.vercel.app/" }],
  },
  {
    slug: "seo-geo-optimiser",
    title: "LLM Visibility Lab",
    role: "Side project",
    period: "2026",
    category: "Prototype",
    summary:
      "See what ChatGPT, Claude and Perplexity see when they read your site.",
    body: [
      "Paste a URL and it scores how well AI search engines can find, understand, cite and recommend the site.",
    ],
    preview: {
      type: "site",
      url: "llm-ai-search-checker.vercel.app",
      desktop: "/previews/search-visibility-d.webp",
      mobile: "/previews/search-visibility-m.webp",
    },
    links: [
      {
        label: "Open the lab",
        href: "https://llm-ai-search-checker.vercel.app/",
      },
    ],
  },
  {
    slug: "juno-adhd-os",
    title: "Juno ADHD OS",
    role: "Side project",
    period: "2026",
    category: "Prototype",
    summary: "AI-assisted planning for people with ADHD.",
    body: [
      "A planning tool for people with ADHD that breaks the day into steps and nudges at the right moment.",
    ],
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/jay-kapoor7" },
    ],
  },
  {
    slug: "apodaca-lab",
    title: "Apodaca Lab",
    role: "Research Assistant, Pitt School of Medicine",
    period: "2024-2025",
    category: "Research",
    summary: "Bladder cell biology for PIEZO and TMEM63 studies.",
    body: [
      "I cultured primary bladder urothelial cells for PIEZO/TMEM63 mechanotransduction studies and made figures for manuscripts and grant submissions.",
    ],
    links: [],
  },
  {
    slug: "upmc-emergency-medicine",
    title: "UPMC Emergency Medicine",
    role: "Research Assistant",
    period: "2025-2026",
    category: "Research",
    summary: "EMR abstraction and REDCap coding for trauma studies.",
    body: [
      "I abstracted and coded medical record data into REDCap for retrospective trauma and prehospital care studies.",
    ],
    links: [],
  },
  {
    slug: "pitt-sociology",
    title: "Pitt Sociology",
    role: "Research Assistant",
    category: "Research",
    summary: "Literature reviews and survey analysis in R and Stata.",
    body: [
      "I worked on literature reviews, survey data and analysis in R and Stata.",
    ],
    links: [],
  },
  {
    slug: "max-hospital",
    title: "Max Hospital",
    role: "Clinical shadowing",
    period: "2023-2024",
    category: "Healthcare",
    summary: "Shadowed emergency and internal medicine teams in New Delhi.",
    body: ["I shadowed emergency and internal medicine teams in New Delhi."],
    links: [],
  },
];

export const allProjects = projects;
export const featuredProjects = projects.filter((p) => p.featured);

export type Role = { org: string; role: string; period: string; href?: string };

export const experience: Role[] = [
  {
    org: "StrayPaw",
    role: "Solo Founder",
    period: "2026-now",
    href: "/work/straypaw",
  },
  {
    org: "Accessible SmartTech Lab, Pitt",
    role: "Research Assistant",
    period: "2026-now",
  },
  { org: "SCI 3Sixty, Pitt", role: "3Sixty Fellow", period: "2026-now" },
  {
    org: "TOT Schools",
    role: "Operations Lead",
    period: "2025-2026",
    href: "/work/tot-schools",
  },
  {
    org: "UPMC Emergency Medicine",
    role: "Research Assistant",
    period: "2025-2026",
    href: "/work/upmc-emergency-medicine",
  },
  {
    org: "Crowwd",
    role: "Founder's Office",
    period: "2025",
    href: "/work/crowwd",
  },
  {
    org: "HDFC Bank",
    role: "Wealth Management Intern",
    period: "2025",
    href: "/work/hdfc-bank",
  },
  {
    org: "Apodaca Lab, Pitt",
    role: "Research Assistant",
    period: "2024-2025",
    href: "/work/apodaca-lab",
  },
  {
    org: "Juno-AI",
    role: "Founder",
    period: "2019-2024",
    href: "/work/juno-ai",
  },
  {
    org: "Project Nidaan",
    role: "Co-founder",
    period: "2022-2024",
    href: "/work/project-nidaan",
  },
  {
    org: "The Finer Things Club",
    role: "Founder",
    period: "2021-2024",
    href: "/work/finer-things-club",
  },
  { org: "JumpStart / AmeriCorps", role: "Team Leader", period: "Pittsburgh" },
  {
    org: "Economics research with Prof. Yasir Khan",
    role: "Kisan Rail",
    period: "Pitt",
  },
  {
    org: "International School of Bangalore",
    role: "Founded the entrepreneurship club",
    period: "2021-2023",
  },
];

export const education = [
  {
    school: "University of Pittsburgh",
    detail: "B.S. Economics & Statistics, minor in Information Sciences",
    period: "Class of 2028",
  },
  {
    school: "The International School of Bangalore",
    detail: "International Baccalaureate Diploma",
    period: "2021-2023",
  },
];

export type Writing = {
  title: string;
  description: string;
  type: string;
  year: string;
  href?: string;
  cover?: string;
  extra?: Link;
};

export const writing: Writing[] = [
  {
    title:
      "Juno AI: A Retrieval-Grounded Conversational Platform for Equitable Healthcare Information Access",
    description: "System design and evaluation.",
    type: "Paper",
    year: "2024",
    href: "/work/juno-ai/Juno-AI-Research-Paper.pdf",
    cover: "/covers/Juno-AI-Research-Paper.webp",
  },
  {
    title: "The Memo Library & Ledger",
    description:
      "Ten dated investment memos, each scored against what happened.",
    type: "Memos",
    year: "2026",
    href: "/research/Memo-Library-and-Ledger.pdf",
    cover: "/covers/Memo-Library-and-Ledger.webp",
    extra: { label: "Ledger", href: "/ledger" },
  },
  {
    title: "India HealthTech Market Map",
    description: "36 companies across nine sectors.",
    type: "Research",
    year: "2026",
    href: "/research/India-HealthTech-Market-Map.pdf",
    cover: "/covers/India-HealthTech-Market-Map.webp",
    extra: { label: "CSV", href: "/research/India-HealthTech-Companies.csv" },
  },
  {
    title: "Qure.ai: AI Diagnostics for the Global South",
    description: "Investment memo.",
    type: "Memo",
    year: "2026",
    href: "/research/Qure-AI-Investment-Memo.pdf",
    cover: "/covers/Qure-AI-Investment-Memo.webp",
  },
  {
    title: "India's GLP-1 Inflection",
    description:
      "What the semaglutide patent cliff means for metabolic care in India.",
    type: "Thesis",
    year: "2026",
    href: "/research/India-GLP1-Sector-Thesis.pdf",
    cover: "/covers/India-GLP1-Sector-Thesis.webp",
  },
  {
    title: "India's Retail-Investing Reset",
    description: "Retail broking after the F&O rules.",
    type: "Thesis",
    year: "2026",
    href: "/research/India-Fintech-Sector-Thesis.pdf",
    cover: "/covers/India-Fintech-Sector-Thesis.webp",
  },
  {
    title:
      "Ethnographic Study on Preventive Healthcare Adoption in Rural India",
    description: "Published in IJEDR.",
    type: "Paper",
    year: "2022",
  },
];

export const games = [
  {
    title: "Everybody's on Strike",
    detail: "A productivity app where everything has walked off the job.",
    href: "https://strike.kapoorjay.com",
    image: "/previews/strike-d.webp",
    url: "strike.kapoorjay.com",
  },
  {
    title: "The World's Worst Emergency Service",
    detail: "Please remain mildly concerned.",
    href: "https://emergency.kapoorjay.com",
    image: "/previews/emergency-d.webp",
    url: "emergency.kapoorjay.com",
  },
];

export const skills = [
  "SQL",
  "Excel, VBA",
  "R, Stata",
  "REDCap",
  "Regression",
  "Forecasting",
  "Next.js",
  "TypeScript",
  "Supabase",
];

export const photos = [
  {
    name: "pitt_portrait",
    alt: "Jay in a blue blazer on the Cathedral of Learning lawn at Pitt",
    caption: "Pitt",
  },
  {
    name: "01_trojans_team",
    alt: "Jay with the Trojans football team in navy kits",
    caption: "Trojans",
  },
  {
    name: "07_school_ceremony",
    alt: "Jay in a cap and gown on stage at his school graduation",
    caption: "Graduation",
  },
  {
    name: "02_childhood_running",
    alt: "Jay as a child running on a grass track at sports day",
    caption: "Sports day",
  },
  {
    name: "04_childhood_football_team",
    alt: "Jay's childhood football team on the pitch with their coach",
    caption: "First team",
  },
];
