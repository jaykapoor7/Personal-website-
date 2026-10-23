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
    "I went to school in Bangalore, spent my summers working in Delhi, and now live in Pittsburgh, where I study Economics and Statistics at Pitt.",
    "Most of what I build starts with something I noticed. A dog outside a cafe with no one keeping track of it. A delivery rider carrying medicine he could not get for himself. Families hours away from the nearest doctor.",
    "When I am not building, I am playing football, making silly browser games, or writing down predictions so I can find out exactly how wrong I was.",
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
      /** The site allows embedding, so it can run live inside the page. */
      live?: boolean;
      /** Show it in a phone instead of a browser. */
      phone?: boolean;
    }
  | { type: "falls" }
  | { type: "doc"; cover: string; href: string };

export type Group = "started" | "worked" | "research" | "side" | "game";

export const groupLabels: Record<Group, string> = {
  started: "Things I started",
  worked: "Places I worked",
  research: "Research",
  side: "Side projects",
  game: "Games",
};

export type Project = {
  slug: string;
  group: Group;
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
    group: "started",
    title: "StrayPaw",
    role: "Founder",
    period: "2026-now",
    category: "Civic tech",
    featured: true,
    summary: "A shared record for every stray animal in India.",
    body: [
      "It started as a small Delhi dataset of 50 dogs, about half of them reported by me, before the domain was even registered. Two months later it held 30,000+ animal records across India. The map goes from city-wide coverage down to individual animals, showing open cases, response times, treatment outcomes and the localities nobody is covering.",
    ],
    highlights: [
      "30,000+ animal records across 28 Indian cities, grown from 50 dogs in two months.",
      "Partnered with 19 NGOs, including PAWS Chennai, Pawsome People Project and The Kind Hour Foundation.",
      "Rebuilt the dashboard after NGO pilots so teams can follow a case from first report to treatment and closure, import their old records, and reuse the data for reports and their own websites.",
      "Starting a pilot with the Ludhiana municipality.",
      "Running community animal workshops with STRAW India and The Kind Hour Foundation, with the material free online for schools and volunteers.",
    ],
    metrics: [
      { value: "30,288", label: "animal records" },
      { value: "28", label: "cities" },
      { value: "19", label: "NGO partners" },
    ],
    preview: {
      type: "site",
      url: "straypaw.org",
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
        caption: "Where it started: Delhi",
      },
    ],
    links: [
      { label: "StrayPaw.org", href: "https://www.straypaw.org" },
      { label: "Live map", href: "https://www.straypaw.org/map" },
      {
        label: "Architecture",
        href: "https://github.com/jaykapoor7/Pok-mon-go-dog-/blob/main/docs/ARCHITECTURE.md",
      },
      { label: "Code", href: "https://github.com/jaykapoor7/Pok-mon-go-dog-" },
    ],
  },
  {
    slug: "juno-ai",
    group: "started",
    title: "Juno-AI",
    role: "Founder",
    period: "2019-2023",
    category: "Healthcare access",
    featured: true,
    summary:
      "Health answers, doctors and pharmacies for rural India. Started at 14.",
    body: [
      "Juno started as a way to get reliable health information to families who lived hours from a doctor. It grew into an AI health assistant grounded in vetted sources and connected to doctors, pharmacies and Practo bookings, so people could get a remote consultation without the trip. I wrote up the system design as a research paper.",
    ],
    highlights: [
      "Founded at 14 and grew to 10,000+ rural users.",
      "Closed four healthcare partnerships, driving 180% user growth in 12 months.",
      "Built a retrieval-grounded health assistant integrated with doctors, pharmacies and Practo bookings.",
      "Published the system design and evaluation as a paper in IJEDR.",
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
    group: "worked",
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
    group: "worked",
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
    group: "started",
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
    group: "started",
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
    group: "worked",
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
    group: "worked",
    title: "TARC",
    role: "Project and Operations Associate",
    period: "Jan-Aug 2026",
    category: "Real estate",
    summary: "Project and operations work at a Delhi real estate developer.",
    body: [
      "An internship in New Delhi on the project and operations side. I researched zoning, pricing and development assumptions for a feasibility memo on a Gurugram housing site.",
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
      { label: "TARC", href: "https://www.tarc.in" },
    ],
  },
  {
    slug: "juno-preventive-health",
    group: "side",
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
      live: true,
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
      {
        label: "Code",
        href: "https://github.com/jaykapoor7/Preventive-healthcare-",
      },
    ],
  },
  {
    slug: "recovery-intelligence",
    group: "side",
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
      live: true,
      desktop: "/previews/health-os-d.webp",
      mobile: "/previews/health-os-m.webp",
    },
    links: [
      {
        label: "Open CURA",
        href: "https://explain-my-whoop-stats.vercel.app/",
      },
      {
        label: "Code",
        href: "https://github.com/jaykapoor7/Explain-my-whoop-stats-",
      },
    ],
  },
  {
    slug: "road360",
    group: "side",
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
      live: true,
      phone: true,
      desktop: "/previews/road360-d.webp",
      mobile: "/previews/road360-m.webp",
    },
    links: [
      { label: "Open Road360", href: "https://road360.vercel.app/" },
      { label: "Code", href: "https://github.com/jaykapoor7/Road360" },
    ],
  },
  {
    slug: "seo-geo-optimiser",
    group: "side",
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
      live: true,
      desktop: "/previews/search-visibility-d.webp",
      mobile: "/previews/search-visibility-m.webp",
    },
    links: [
      {
        label: "Open the lab",
        href: "https://llm-ai-search-checker.vercel.app/",
      },
      {
        label: "Code",
        href: "https://github.com/jaykapoor7/LLM-AI-search-checker",
      },
    ],
  },
  {
    slug: "accessible-smarttech",
    group: "research",
    title: "Accessible SmartTech Lab",
    role: "Research Assistant",
    period: "2026-now",
    category: "Research",
    summary:
      "Human-machine interaction for accessible smart technology, with Prof. Dan Ding.",
    body: [
      "I am developing human-machine interaction systems for accessible smart technologies under Professor Dan Ding.",
    ],
    preview: {
      type: "site",
      url: "smarttech.pitt.edu",
      desktop: "/previews/smarttech-d.webp",
    },
    links: [{ label: "The lab", href: "https://www.smarttech.pitt.edu" }],
  },
  {
    slug: "sci-3sixty",
    group: "research",
    title: "SCI 3Sixty",
    role: "3Sixty Fellow",
    period: "2026-now",
    category: "Research",
    summary:
      "Applied AI research with Prof. Rosta Farzan, including how nonprofits adopt AI.",
    body: [
      "Selected as a 3Sixty Fellow at Pitt's School of Computing and Information to do applied AI research under Professor Rosta Farzan.",
    ],
    preview: {
      type: "site",
      url: "sci.pitt.edu",
      desktop: "/previews/sci-3sixty-d.webp",
    },
    links: [
      {
        label: "3Sixty",
        href: "https://www.sci.pitt.edu/give-sci/3sixty-program",
      },
    ],
  },
  {
    slug: "apodaca-lab",
    group: "research",
    title: "Apodaca Lab",
    role: "Research Assistant, Pitt",
    period: "2024-2025",
    category: "Research",
    summary:
      "Urothelial mechanotransduction and urinary health, with Prof. Gerard Apodaca.",
    body: [
      "I researched urothelial mechanotransduction and what it means for urinary health under Professor Gerard Apodaca. I cultured primary bladder urothelial cells for PIEZO/TMEM63 studies and made figures for manuscripts and grant submissions.",
    ],
    preview: {
      type: "site",
      url: "people.dom.pitt.edu",
      desktop: "/previews/apodaca-d.webp",
    },
    links: [
      {
        label: "Apodaca Lab",
        href: "https://people.dom.pitt.edu/people/gerard-apodaca-phd",
      },
    ],
  },
  {
    slug: "upmc-emergency-medicine",
    group: "research",
    title: "UPMC Emergency Medicine",
    role: "Research Assistant",
    period: "2025-2026",
    category: "Research",
    summary:
      "Prehospital care patterns and emergency outcomes across UPMC's regional EMS system.",
    body: [
      "I analysed prehospital care patterns and emergency outcomes across UPMC's regional EMS system, abstracting and coding medical record data into REDCap.",
    ],
    preview: {
      type: "site",
      url: "emergencymedicine.pitt.edu",
      desktop: "/previews/pitt-em-d.webp",
    },
    links: [
      {
        label: "Pitt Emergency Medicine",
        href: "https://www.emergencymedicine.pitt.edu",
      },
    ],
  },
  {
    slug: "pitt-sociology",
    group: "research",
    title: "Pitt Sociology",
    role: "Research Assistant",
    category: "Research",
    summary: "Literature reviews and survey analysis in R and Stata.",
    body: [
      "I worked on literature reviews, survey data and analysis in R and Stata.",
    ],
    links: [
      { label: "Pitt Sociology", href: "https://www.sociology.pitt.edu" },
    ],
  },
  {
    slug: "max-hospital",
    group: "research",
    title: "Max Hospital",
    role: "Clinical shadowing",
    period: "2023-2024",
    category: "Healthcare",
    summary: "Shadowed emergency and internal medicine teams in New Delhi.",
    body: ["I shadowed emergency and internal medicine teams in New Delhi."],
    links: [{ label: "Max Healthcare", href: "https://www.maxhealthcare.in" }],
  },
  {
    slug: "everybodys-on-strike",
    group: "game",
    title: "Everybody's on Strike",
    role: "Game",
    period: "2026",
    category: "Game",
    summary: "A productivity app where every button has walked off the job.",
    body: [
      "A browser comedy dressed up as a slick productivity startup. Everything you click is on strike.",
    ],
    preview: {
      type: "site",
      url: "strike.kapoorjay.com",
      desktop: "/previews/strike-d.webp",
      live: true,
    },
    links: [
      { label: "Play", href: "https://strike.kapoorjay.com" },
      {
        label: "Code",
        href: "https://github.com/jaykapoor7/everybodys-on-strike",
      },
    ],
  },
  {
    slug: "worst-emergency-service",
    group: "game",
    title: "The World's Worst Emergency Service",
    role: "Game",
    period: "2026",
    category: "Game",
    summary: "You run the dispatch desk. Please remain mildly concerned.",
    body: [
      "An illustrated game where you answer the town's emergencies with the worst possible response, and every choice leaves a mark on the map.",
    ],
    preview: {
      type: "site",
      url: "emergency.kapoorjay.com",
      desktop: "/previews/emergency-d.webp",
      live: true,
    },
    links: [
      { label: "Play", href: "https://emergency.kapoorjay.com" },
      {
        label: "Code",
        href: "https://github.com/jaykapoor7/worst-emergency-service",
      },
    ],
  },
  {
    slug: "everything-falls",
    group: "game",
    title: "Everything Falls",
    role: "Toy",
    period: "2026",
    category: "Game",
    summary: "Pick things up and throw them. Turn gravity off if you like.",
    body: ["A small physics toy built on Matter.js."],
    preview: { type: "falls" },
    links: [{ label: "Full screen", href: "/play/everything-falls" }],
  },
];

export const allProjects = projects;
export const featuredProjects = projects.filter((p) => p.featured);

export type Role = { org: string; role: string; period: string; href?: string };

export const experience: Role[] = [
  {
    org: "StrayPaw",
    role: "Founder",
    period: "2026-now",
    href: "/work/straypaw",
  },
  {
    org: "SCI 3Sixty, Pitt",
    role: "3Sixty Fellow, applied AI with Prof. Rosta Farzan",
    period: "2026-now",
    href: "https://www.sci.pitt.edu/give-sci/3sixty-program",
  },
  {
    org: "Accessible SmartTech Lab, Pitt",
    role: "Research Assistant with Prof. Dan Ding",
    period: "2026-now",
    href: "https://www.smarttech.pitt.edu",
  },
  {
    org: "Investment Memo Series",
    role: "Theses on Indian healthtech and fintech",
    period: "2026-now",
    href: "/ledger",
  },
  {
    org: "TARC India",
    role: "Project and Operations Associate",
    period: "2026",
    href: "/work/tarc",
  },
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
    role: "Founder's Office Intern",
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
  {
    org: "Juno-AI",
    role: "Founder",
    period: "2019-2023",
    href: "/work/juno-ai",
  },
  {
    org: "National Economics Fest",
    role: "Contingent Leader, Best Contingent out of 500+ colleges",
    period: "2023",
  },
  {
    org: "International School of Bangalore",
    role: "Founder, Entrepreneurship Club",
    period: "2021-2023",
    href: "https://www.tisb.org",
  },
  {
    org: "International School of Bangalore",
    role: "Head of Vendor Acquisition: 25 vendors, a $10k budget, a 4,000-person event",
    period: "2022",
    href: "https://www.tisb.org",
  },
  {
    org: "JumpStart / AmeriCorps",
    role: "Team Leader",
    period: "Pittsburgh",
    href: "https://www.jstart.org",
  },
  {
    org: "Economics research with Prof. Yasir Khan",
    role: "Kisan Rail",
    period: "Pitt",
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
    description: "System design and evaluation. Published in IJEDR.",
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

/** Dates as decimal years (2025.33 = May 2025). `end: null` means still going. */
export type Lane = "started" | "worked" | "research" | "school";
export type Stint = {
  id: string;
  title: string;
  role: string;
  lane: Lane;
  start: number;
  end: number | null;
  when: string;
  line: string;
  href?: string;
  link?: string;
};

const m = (year: number, month: number) => year + (month - 1) / 12;

export const now = m(2026, 10);

export const timeline: Stint[] = [
  {
    id: "juno-ai",
    title: "Juno-AI",
    role: "Founder",
    lane: "started",
    start: m(2019, 6),
    end: m(2023, 8),
    when: "Jun 2019 to Aug 2023",
    line: "Started at 14. An AI health assistant wired to doctors, pharmacies and Practo bookings, used by 10,000+ rural users.",
    href: "/work/juno-ai",
    link: "See Juno-AI",
  },
  {
    id: "finer-things-club",
    title: "Finer Things Club",
    role: "Founder",
    lane: "started",
    start: m(2021, 7),
    end: m(2024, 8),
    when: "Jul 2021 to Aug 2024",
    line: "Got 300+ rural artisans selling online. $8k+ in revenue through NGO and marketplace partners.",
    href: "/work/finer-things-club",
    link: "See the club",
  },
  {
    id: "project-nidaan",
    title: "Project Nidaan",
    role: "Co-founder",
    lane: "started",
    start: m(2022, 5),
    end: m(2024, 8),
    when: "May 2022 to Aug 2024",
    line: "55 interviews with delivery riders about getting their own medicine. Zomato and Swiggy came on as partners.",
    href: "/work/project-nidaan",
    link: "See Nidaan",
  },
  {
    id: "straypaw",
    title: "StrayPaw",
    role: "Founder",
    lane: "started",
    start: m(2026, 6),
    end: null,
    when: "Jun 2026 to now",
    line: "From 50 Delhi dogs to 30,288 animal records and 19 NGO partners in two months.",
    href: "/work/straypaw",
    link: "See StrayPaw",
  },
  {
    id: "crowwd",
    title: "Crowwd",
    role: "Founder's Office Intern",
    lane: "worked",
    start: m(2025, 5),
    end: m(2025, 8),
    when: "May to Aug 2025, New Delhi",
    line: "Growth for a 20,000-user investing app, a seven-platform teardown, and the Arthavaad speaker series.",
    href: "/work/crowwd",
    link: "See Crowwd",
  },
  {
    id: "hdfc-bank",
    title: "HDFC Bank",
    role: "Wealth Management Intern",
    lane: "worked",
    start: m(2025, 5),
    end: m(2025, 8),
    when: "May to Aug 2025, New Delhi",
    line: "Equity and fund research for HNI portfolio reviews.",
    href: "/work/hdfc-bank/Apollo-Hospitals-Research-Note-Aug-2025.pdf",
    link: "Read the Apollo note",
  },
  {
    id: "tot-schools",
    title: "TOT Schools",
    role: "Operations Lead",
    lane: "worked",
    start: m(2025, 6),
    end: m(2026, 4),
    when: "Jun 2025 to Apr 2026",
    line: "Ran six functions across eight childcare centres and wrote the 12-document handbook they run on.",
    href: "/work/tot-schools/TOT-Schools-Operations-Case-Study.pdf",
    link: "Read the case study",
  },
  {
    id: "tarc",
    title: "TARC India",
    role: "Project and Operations Associate",
    lane: "worked",
    start: m(2026, 1),
    end: m(2026, 8),
    when: "Jan to Aug 2026, New Delhi",
    line: "Project and operations work at a real estate developer, including a feasibility memo.",
    href: "/work/tarc/Development-Feasibility-Memo-2025.pdf",
    link: "Read the memo",
  },
  {
    id: "apodaca-lab",
    title: "Apodaca Lab",
    role: "Research Assistant",
    lane: "research",
    start: m(2024, 8),
    end: m(2025, 5),
    when: "Aug 2024 to May 2025",
    line: "Urothelial mechanotransduction and urinary health with Prof. Gerard Apodaca.",
    href: "https://people.dom.pitt.edu/people/gerard-apodaca-phd",
    link: "The lab",
  },
  {
    id: "upmc",
    title: "UPMC EM",
    role: "Research Assistant",
    lane: "research",
    start: m(2025, 8),
    end: m(2026, 1),
    when: "Aug 2025 to Jan 2026",
    line: "Prehospital care patterns and emergency outcomes across UPMC's regional EMS system.",
    href: "https://www.emergencymedicine.pitt.edu",
    link: "The department",
  },
  {
    id: "memos",
    title: "Investment memos",
    role: "Independent",
    lane: "research",
    start: m(2026, 5),
    end: null,
    when: "May 2026 to now",
    line: "Dated theses on Indian healthtech and fintech, scored in public.",
    href: "/ledger",
    link: "See the ledger",
  },
  {
    id: "smarttech",
    title: "SmartTech Lab",
    role: "Research Assistant",
    lane: "research",
    start: m(2026, 8),
    end: null,
    when: "Aug 2026 to now",
    line: "Human-machine interaction for accessible smart technology, with Prof. Dan Ding.",
    href: "https://www.smarttech.pitt.edu",
    link: "The lab",
  },
  {
    id: "3sixty",
    title: "SCI 3Sixty",
    role: "Fellow",
    lane: "research",
    start: m(2026, 9),
    end: null,
    when: "Sep 2026 to now",
    line: "Applied AI research with Prof. Rosta Farzan.",
    href: "https://www.sci.pitt.edu/give-sci/3sixty-program",
    link: "3Sixty",
  },
  {
    id: "tisb",
    title: "TISB",
    role: "IB Diploma, entrepreneurship club founder",
    lane: "school",
    start: m(2021, 8),
    end: m(2023, 8),
    when: "Aug 2021 to Aug 2023, Bangalore",
    line: "Founded the entrepreneurship club. Ran vendors for a 4,000-person event: 25 vendors, a $10k budget. Led the team that won Best Contingent at the National Economics Fest against 500+ colleges.",
    href: "https://www.tisb.org",
    link: "TISB",
  },
  {
    id: "pitt",
    title: "Pitt",
    role: "Economics & Statistics",
    lane: "school",
    start: m(2024, 8),
    end: null,
    when: "Aug 2024 to May 2028",
    line: "B.S. Economics & Statistics, minor in Information Sciences. Also: JumpStart team leader, sociology research, and economics research on Kisan Rail.",
    href: "/jay-kapoor-resume.pdf",
    link: "Resume",
  },
];

export const laneLabels: Record<Lane, string> = {
  started: "Started",
  worked: "Worked",
  research: "Researched",
  school: "School",
};

/** Photos pinned to the timeline, only where the year is certain. */
export const moments = [
  { name: "02_childhood_running", caption: "Little me", at: 2018.6 },
  { name: "07_school_ceremony", caption: "Graduation", at: m(2023, 6) },
  { name: "pitt_portrait", caption: "Pitt", at: m(2025, 4) },
];
