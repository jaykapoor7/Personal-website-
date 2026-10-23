/** Edit this file to update the public portfolio. Keep dates and claims tied to a source.
 * Primary sources: supplied résumé and LinkedIn screenshots (23 October 2026).
 * Where the two conflict on month-level dates, the coarser date is shown.
 * Reported figures (users, artisans, revenue) come from Jay’s résumé; they are
 * not independently audited. Illustrative figures in work samples stay labelled.
 * See docs/master-redesign-audit.md for claim limits.
 */
export const person = {
  name: "Jay Kapoor",
  email: "jak581@pitt.edu",
  school: "University of Pittsburgh",
  degree: "B.S. Economics & Statistics, minor in Information Sciences",
  gradYear: "2028",
  place: "Pittsburgh, PA",
  headline:
    "I build software for messy, real-world systems — animal welfare, healthcare access, and the operations behind them.",
  intro:
    "Founder of StrayPaw. Economics & Statistics at the University of Pittsburgh. I started my first company, Juno-AI, at 14.",
  about: [
    "Economics & Statistics at Pitt, minor in Information Sciences. Most of what I build starts with something I saw growing up in India.",
    "I started Juno-AI at 14 and grew it to 10,000+ rural users. Since then: fieldwork with delivery riders, operations across eight childcare centres, a fintech founder’s office, and investment memos I score in public.",
    "Now I’m building StrayPaw and doing applied AI and accessibility research at Pitt. Off the clock, it’s football.",
  ],
  links: [
    { label: "Email", href: "mailto:jak581@pitt.edu" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jay-kapoor7" },
    { label: "GitHub", href: "https://github.com/jaykapoor7" },
    { label: "X", href: "https://x.com/jaybuildsvx" },
    { label: "Résumé", href: "/jay-kapoor-resume.pdf" },
  ],
};

export const stats = [
  { value: "30,000+", label: "animal records on StrayPaw" },
  { value: "28", label: "Indian cities covered" },
  { value: "10,000+", label: "rural users reached by Juno-AI" },
  { value: "0.134", label: "Brier score across 15 public forecasts" },
];

export type Link = { label: string; href: string };
export type Metric = { value: string; label: string };

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
  image?: string;
  imageAlt?: string;
  imageFit?: "cover" | "contain";
  imagePosition?: string;
  gallery?: { src: string; alt: string; caption: string }[];
  links: Link[];
  note?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "straypaw",
    title: "StrayPaw",
    role: "Solo founder",
    period: "2026 – present",
    category: "Civic tech",
    featured: true,
    summary:
      "Records, maps, and reporting infrastructure for the people who care for India’s street animals.",
    body: [
      "India has tens of millions of street dogs and no shared record of them. Feeders, rescue NGOs, and municipal Animal Birth Control programmes each keep their own notebooks, WhatsApp groups, and spreadsheets — so sterilisation and vaccination work is hard to coordinate and harder to report.",
      "StrayPaw gives every animal a profile and every case a workspace. Residents report, NGOs track cases from intake to release, and municipalities get audit-ready ABC/ARV analytics structured to the ABC Rules 2023.",
    ],
    highlights: [
      "Built and launched a live platform with 30,000+ animal records across 28 Indian cities.",
      "Shipped NGO case workspaces, municipal ABC/ARV analytics, maps, offline field access, and embeddable partner widgets.",
      "Structures partner-NGO and public datasets into audit-ready sterilisation and vaccination reports.",
      "Contacted 40+ NGOs, feeders, and government bodies; partnering with VaccSafe (Hyderabad) on microchip-linked dog profiles.",
    ],
    metrics: [
      { value: "30k+", label: "animal records" },
      { value: "28", label: "cities" },
      { value: "40+", label: "NGOs & agencies contacted" },
    ],
    image: "/straypaw/field-observation.webp",
    imageAlt: "A street dog standing at a sunlit intersection, seen from above",
    imagePosition: "center 50%",
    gallery: [
      {
        src: "/straypaw/skyline-dog.webp",
        alt: "StrayPaw artwork: a dog overlooking a city with mapped care points",
        caption: "StrayPaw",
      },
      {
        src: "/straypaw/street-dog.jpg",
        alt: "Street dog documented in Delhi",
        caption: "Field photograph, Delhi",
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
    note: "Record counts describe the platform’s data, not care outcomes.",
  },
  {
    slug: "juno-ai",
    title: "Juno-AI",
    role: "Founder",
    period: "2019 – 2024",
    category: "Healthcare access",
    featured: true,
    summary:
      "A healthcare-access platform I started at 14 — grounded health answers, doctor discovery, and pharmacy support for rural India.",
    body: [
      "Juno started as a way to get reliable health information to families who were hours from a doctor. It grew into a platform: a retrieval-augmented health assistant grounded in vetted sources, plus doctor discovery, pharmacy support, and a personal health dashboard.",
      "I later wrote up the system design and a formative evaluation as a research paper. It describes a prototype and early evaluation — it is not clinical validation.",
    ],
    highlights: [
      "Founded at 14 and grew to 10,000+ rural users.",
      "Closed four healthcare partnerships, driving 180% user growth in 12 months.",
      "Built a retrieval-grounded health assistant, doctor discovery, pharmacy support, and a health dashboard.",
      "Published the system design and formative evaluation as a paper.",
    ],
    metrics: [
      { value: "10k+", label: "rural users" },
      { value: "180%", label: "user growth in 12 months" },
      { value: "4", label: "healthcare partnerships" },
    ],
    image: "/work/juno-ai/juno-product-dashboard.webp",
    imageAlt:
      "Juno-AI product screens: home, chat assistant, doctor finder, pharmacy and admin dashboards",
    imageFit: "contain",
    links: [
      {
        label: "Research paper",
        href: "/work/juno-ai/Juno-AI-Research-Paper.pdf",
      },
      {
        label: "Product screens",
        href: "/work/juno-ai/juno-product-dashboard.webp",
      },
    ],
    note: "Product screens are an archived interface mockup with illustrative figures.",
  },
  {
    slug: "crowwd",
    title: "Crowwd",
    role: "Founder’s Office",
    period: "2025",
    category: "Fintech",
    featured: true,
    summary:
      "Growth, competitive research, and Arthavaad — a multi-city speaker series — at a ~20,000-user social-investing platform.",
    body: [
      "I worked directly with the founder and CEO on growth. I ran multi-channel acquisition across Reddit, X, YouTube, Google Ads, and generative-engine optimisation, and wrote the GEO playbook the team now uses.",
      "I benchmarked Crowwd against seven social-investing platforms, including Stocktwits and eToro, and launched Arthavaad, a monthly speaker series — running speaker outreach, brand partnerships, and logistics.",
    ],
    highlights: [
      "Organic channels onboarded 200+ users.",
      "Benchmarked against 7 social-investing platforms; wrote the GEO playbook for the CEO.",
      "Launched Arthavaad, a multi-city monthly speaker series.",
    ],
    metrics: [
      { value: "200+", label: "users via organic channels" },
      { value: "7", label: "platforms benchmarked" },
    ],
    image: "/work/crowwd/arthavaad-stage-1280.webp",
    imageAlt: "Jay at an Arthavaad event at The Circle.Work",
    imagePosition: "center 35%",
    gallery: [
      {
        src: "/work/crowwd/arthavaad-audience.jpg",
        alt: "Audience at an Arthavaad event",
        caption: "Arthavaad speaker series",
      },
    ],
    links: [
      { label: "Crowwd", href: "https://crowwd.io" },
      {
        label: "Fintech teardown",
        href: "/work/crowwd/Crowwd-Fintech-Teardown.pdf",
      },
      {
        label: "Research & strategy",
        href: "/work/crowwd/Crowwd-Selected-Research-and-Strategy.pdf",
      },
    ],
  },
  {
    slug: "tot-schools",
    title: "TOT Schools",
    role: "Operations Lead",
    period: "Jun 2025 – Apr 2026",
    category: "Operations",
    featured: true,
    summary:
      "Ran six functions across an eight-centre early-childhood business in India.",
    body: [
      "I owned the operating backbone of an eight-centre childcare business: technology, facilities, people, nutrition, documentation, and finance.",
      "I rolled out Illumine for attendance, billing, and parent communication, put CCTV in every centre, hired and onboarded centre heads, teachers, nurses and cleaners, and wrote the 12-document handbook and SOP suite the centres run on.",
    ],
    highlights: [
      "Ran 6 functions across 8 centres.",
      "Rolled out Illumine (attendance, billing, parent comms) and CCTV in every centre.",
      "Hired and onboarded centre heads, teachers, nurses, and cleaners.",
      "Wrote a 12-document handbook and SOP suite.",
    ],
    metrics: [
      { value: "8", label: "centres" },
      { value: "6", label: "functions owned" },
      { value: "12", label: "SOP documents" },
    ],
    links: [
      {
        label: "Operations case study",
        href: "/work/tot-schools/TOT-Schools-Operations-Case-Study.pdf",
      },
    ],
  },
  {
    slug: "project-nidaan",
    title: "Project Nidaan",
    role: "Co-founder & Research Coordinator",
    period: "2022 – 2024",
    category: "Health research",
    featured: true,
    summary:
      "Field research on why gig-economy delivery riders in Bengaluru struggle to get their medication.",
    body: [
      "Delivery riders spend their days moving medicine around the city and often can’t get their own. We interviewed riders across Bengaluru to understand where access breaks: cost, time off the road, pharmacy hours, and trust.",
      "I ran the interviews, owned coding and analysis, and set up distribution partnerships with Zomato and Swiggy.",
    ],
    highlights: [
      "Ran 55 field interviews with delivery riders.",
      "Owned qualitative coding and analysis.",
      "Set up Zomato and Swiggy distribution partnerships.",
    ],
    metrics: [
      { value: "55", label: "field interviews" },
      { value: "2", label: "platform partnerships" },
    ],
    links: [
      {
        label: "Field research brief",
        href: "/work/project-nidaan/Project-Nidaan-Field-Research-Brief.pdf",
      },
      {
        label: "KPI dashboard",
        href: "/work/project-nidaan/Project-Nidaan-KPI-Dashboard.xlsx",
      },
    ],
    note: "Percentages in the brief and dashboard are illustrative.",
  },
  {
    slug: "finer-things-club",
    title: "The Finer Things Club",
    role: "Founder",
    period: "2021 – 2024",
    category: "Commerce",
    featured: true,
    summary: "A marketplace connecting rural Indian artisans to online buyers.",
    body: [
      "I started The Finer Things Club to get rural artisans’ work in front of buyers who would pay a fair price for it. I handled artisan onboarding, online sales, and the NGO and marketplace partnerships that made distribution work.",
    ],
    highlights: [
      "Onboarded 300+ rural artisans.",
      "$8k+ revenue through NGO and marketplace partnerships.",
    ],
    metrics: [
      { value: "300+", label: "artisans onboarded" },
      { value: "$8k+", label: "revenue" },
    ],
    links: [
      {
        label: "Marketplace one-pager",
        href: "/work/finer-things-club/Finer-Things-Marketplace-One-Pager.pdf",
      },
    ],
  },
  {
    slug: "hdfc-bank",
    title: "HDFC Bank",
    role: "Wealth Management Intern, HNI Division",
    period: "Summer 2025",
    category: "Finance",
    summary:
      "Equity, fund, and macro research for high-net-worth portfolio reviews.",
    body: [
      "I researched equities, mutual funds, and macro trends for HNI client portfolio reviews and built client-facing pitch decks.",
    ],
    links: [
      {
        label: "Apollo Hospitals note",
        href: "/work/hdfc-bank/Apollo-Hospitals-Research-Note-Aug-2025.pdf",
      },
      {
        label: "Portfolio allocation review",
        href: "/work/hdfc-bank/HNI-Portfolio-Allocation-Review.pdf",
      },
    ],
  },
  {
    slug: "tarc",
    title: "TARC",
    role: "Project & Operations Associate",
    period: "2026",
    category: "Real estate",
    summary:
      "Development feasibility research: zoning, pricing, and assumptions.",
    body: [
      "I researched zoning, pricing, and development assumptions for feasibility work.",
    ],
    links: [
      {
        label: "Feasibility memo",
        href: "/work/tarc/Development-Feasibility-Memo-2025.pdf",
      },
    ],
  },
  {
    slug: "apodaca-lab",
    title: "Apodaca Lab",
    role: "Research Assistant, Pitt School of Medicine",
    period: "2024 – 2025",
    category: "Research",
    summary: "Cell-biology research on mechanotransduction in the bladder.",
    body: [
      "I cultured primary bladder urothelial cells for PIEZO/TMEM63 mechanotransduction studies and contributed figures to manuscripts and grant submissions.",
    ],
    links: [],
  },
  {
    slug: "upmc-emergency-medicine",
    title: "UPMC Emergency Medicine",
    role: "Research Assistant",
    period: "2025 – 2026",
    category: "Research",
    summary:
      "EMR abstraction and REDCap coding for retrospective trauma studies.",
    body: [
      "I abstracted and coded electronic medical record data into REDCap for retrospective trauma and prehospital-care studies.",
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
      "I worked on literature reviews, survey data, and analysis in R and Stata.",
    ],
    links: [],
  },
  {
    slug: "max-hospital",
    title: "Max Hospital",
    role: "Clinical shadowing",
    period: "2023 – 2024",
    category: "Healthcare",
    summary: "Shadowed emergency and internal-medicine teams in New Delhi.",
    body: ["I shadowed emergency and internal-medicine teams in New Delhi."],
    links: [],
  },
  {
    slug: "juno-adhd-os",
    title: "Juno ADHD OS",
    role: "Prototype",
    period: "2026",
    category: "Prototype",
    summary: "An AI-assisted productivity and behavioural-planning prototype.",
    body: [
      "A prototype for AI-assisted productivity and behavioural planning for people with ADHD.",
    ],
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/jay-kapoor7" },
    ],
  },
  {
    slug: "juno-preventive-health",
    title: "Juno Preventive Health",
    role: "Prototype",
    period: "2026",
    category: "Prototype",
    summary: "A preventive-health information tool built on the Claude API.",
    body: [
      "An early preventive-health information tool built on the Claude API.",
    ],
    links: [
      {
        label: "Open prototype",
        href: "https://preventive-healthcare-xi.vercel.app/",
      },
    ],
  },
  {
    slug: "recovery-intelligence",
    title: "Health OS",
    role: "Prototype",
    period: "2026",
    category: "Prototype",
    summary: "A browser interface that explains wearable recovery data.",
    body: [
      "A browser-based interface that explains wearable health data. Its scores are placeholders, not validated health measures.",
    ],
    links: [
      {
        label: "Open prototype",
        href: "https://explain-my-whoop-stats.vercel.app/",
      },
    ],
  },
  {
    slug: "road360",
    title: "Road360",
    role: "Prototype",
    period: "2026",
    category: "Prototype",
    summary: "Horn noise and harsh braking as signals of road conditions.",
    body: [
      "An experiment using horn noise and harsh braking as signals of road conditions.",
    ],
    links: [{ label: "Open prototype", href: "https://road360.vercel.app/" }],
  },
  {
    slug: "seo-geo-optimiser",
    title: "Search visibility checker",
    role: "Prototype",
    period: "2026",
    category: "Prototype",
    summary: "Checks how visible a website is in classic and AI search.",
    body: [
      "A tool for checking a website’s visibility in conventional search and AI answer engines.",
    ],
    links: [
      {
        label: "Open prototype",
        href: "https://llm-ai-search-checker.vercel.app/",
      },
    ],
  },
];

export const allProjects = projects;
export const featuredProjects = projects.filter((p) => p.featured);

export type Role = {
  org: string;
  role: string;
  period: string;
  detail: string;
  href?: string;
};

export const experience: Role[] = [
  {
    org: "StrayPaw",
    role: "Solo Founder",
    period: "2026 – now",
    detail:
      "Civic-tech records platform for India’s street animals. 30,000+ records, 28 cities.",
    href: "/work/straypaw",
  },
  {
    org: "Accessible SmartTech Lab, Pitt",
    role: "Research Assistant",
    period: "2026 – now",
    detail:
      "Human–machine interaction systems for accessible smart technologies, with Prof. Dan Ding.",
  },
  {
    org: "SCI 3Sixty, Pitt",
    role: "3Sixty Fellow",
    period: "2026 – now",
    detail:
      "Selected to conduct applied AI research with Prof. Rosta Farzan, including AI adoption among nonprofits.",
  },
  {
    org: "Crowwd",
    role: "Founder’s Office",
    period: "2025",
    detail: "Growth, competitive research, and the Arthavaad speaker series.",
    href: "/work/crowwd",
  },
  {
    org: "TOT Schools",
    role: "Operations Lead",
    period: "2025 – 2026",
    detail: "Six functions across eight early-childhood centres.",
    href: "/work/tot-schools",
  },
  {
    org: "HDFC Bank",
    role: "Wealth Management Intern",
    period: "2025",
    detail: "Research for HNI portfolio reviews; client-facing pitch decks.",
    href: "/work/hdfc-bank",
  },
  {
    org: "Apodaca Lab, Pitt School of Medicine",
    role: "Research Assistant",
    period: "2024 – 2025",
    detail: "Bladder urothelial cell culture for PIEZO/TMEM63 studies.",
    href: "/work/apodaca-lab",
  },
  {
    org: "UPMC Emergency Medicine",
    role: "Research Assistant",
    period: "2025 – 2026",
    detail:
      "EMR abstraction and REDCap coding for retrospective trauma studies.",
    href: "/work/upmc-emergency-medicine",
  },
  {
    org: "JumpStart / AmeriCorps",
    role: "Team Leader",
    period: "Pittsburgh",
    detail:
      "Led eight corps members delivering early-childhood literacy programmes in Pittsburgh schools.",
  },
  {
    org: "Juno-AI",
    role: "Founder",
    period: "2019 – 2024",
    detail: "Healthcare-access platform; 10,000+ rural users.",
    href: "/work/juno-ai",
  },
  {
    org: "Project Nidaan",
    role: "Co-founder & Research Coordinator",
    period: "2022 – 2024",
    detail: "Medication-access fieldwork with delivery riders in Bengaluru.",
    href: "/work/project-nidaan",
  },
  {
    org: "The Finer Things Club",
    role: "Founder",
    period: "2021 – 2024",
    detail: "Artisan marketplace; 300+ artisans onboarded.",
    href: "/work/finer-things-club",
  },
  {
    org: "Economics research",
    role: "with Prof. Yasir Khan",
    period: "Pitt",
    detail: "Economics research on India’s Kisan Rail.",
  },
  {
    org: "The International School of Bangalore",
    role: "Founder, Entrepreneurship Club",
    period: "2021 – 2023",
    detail:
      "Founded the school’s entrepreneurship club; led a six-person team at the National Economics Fest.",
  },
];

export const education = [
  {
    school: "University of Pittsburgh",
    detail: "B.S. Economics & Statistics · Minor in Information Sciences",
    period: "Expected May 2028",
  },
  {
    school: "The International School of Bangalore",
    detail: "International Baccalaureate Diploma",
    period: "2021 – 2023",
  },
];

export type Writing = {
  title: string;
  description: string;
  type: string;
  year: string;
  href?: string;
  extra?: Link;
};

export const writing: Writing[] = [
  {
    title: "Memo Library & Forecast Ledger",
    description:
      "Ten dated investment memos on healthcare and fintech, each scored against outcomes.",
    type: "Memos",
    year: "2025 –",
    href: "/ledger",
    extra: { label: "PDF", href: "/research/Memo-Library-and-Ledger.pdf" },
  },
  {
    title:
      "Juno AI: A Retrieval-Grounded Conversational Platform for Equitable Healthcare Information Access",
    description: "System design and formative evaluation.",
    type: "Paper",
    year: "2024",
    href: "/work/juno-ai/Juno-AI-Research-Paper.pdf",
  },
  {
    title: "India HealthTech Market Map",
    description:
      "A landscape of Indian healthtech: funding, stage, and competitive edge.",
    type: "Research",
    year: "2026",
    href: "/research/India-HealthTech-Market-Map.pdf",
    extra: { label: "CSV", href: "/research/India-HealthTech-Companies.csv" },
  },
  {
    title: "Qure.ai — investment memo",
    description: "AI diagnostics for medical imaging.",
    type: "Memo",
    year: "2026",
    href: "/research/Qure-AI-Investment-Memo.pdf",
  },
  {
    title: "India’s GLP-1 Inflection",
    description:
      "What the semaglutide patent cliff means for metabolic care in India.",
    type: "Thesis",
    year: "2026",
    href: "/research/India-GLP1-Sector-Thesis.pdf",
  },
  {
    title: "India’s Retail-Investing Reset",
    description: "Retail broking after F&O regulation.",
    type: "Thesis",
    year: "2026",
    href: "/research/India-Fintech-Sector-Thesis.pdf",
  },
  {
    title:
      "Ethnographic Study on Preventive Healthcare Adoption in Rural India",
    description: "Published in IJEDR.",
    type: "Paper",
    year: "2022",
  },
];

export const builds = [
  {
    title: "Everybody’s on Strike",
    detail: "A browser comedy about an interface on strike.",
    kind: "Game",
    href: "https://strike.kapoorjay.com",
  },
  {
    title: "The World’s Worst Emergency Service",
    detail: "An illustrated game about running a terrible dispatch centre.",
    kind: "Game",
    href: "https://emergency.kapoorjay.com",
  },
  {
    title: "Health OS",
    detail: "Wearable recovery data, explained.",
    kind: "Prototype",
    href: "/work/recovery-intelligence",
  },
  {
    title: "Juno Preventive Health",
    detail: "Preventive-health information on the Claude API.",
    kind: "Prototype",
    href: "/work/juno-preventive-health",
  },
  {
    title: "Road360",
    detail: "Road conditions from horns and harsh braking.",
    kind: "Prototype",
    href: "/work/road360",
  },
  {
    title: "Search visibility checker",
    detail: "Visibility in classic and AI search.",
    kind: "Prototype",
    href: "/work/seo-geo-optimiser",
  },
  {
    title: "Juno ADHD OS",
    detail: "AI-assisted planning for ADHD.",
    kind: "Prototype",
    href: "/work/juno-adhd-os",
  },
  {
    title: "Everything Falls",
    detail: "A small physics toy. Drag things; turn gravity off.",
    kind: "Experiment",
    href: "/play/everything-falls",
  },
];

export const skills = [
  "SQL",
  "Excel modelling & VBA",
  "R & Stata",
  "REDCap",
  "Regression",
  "Probabilistic forecasting",
  "Next.js",
  "TypeScript",
  "Supabase",
  "AI coding tools",
];

export const photos = [
  {
    name: "pitt_portrait",
    alt: "Jay in a blue blazer on the Cathedral of Learning lawn at Pitt",
    caption: "Pittsburgh",
  },
  {
    name: "01_trojans_team",
    alt: "Jay with the Trojans football team in navy kits",
    caption: "The Trojans",
  },
  {
    name: "07_school_ceremony",
    alt: "Jay in a cap and gown on stage at his school ceremony",
    caption: "Graduation, Bangalore",
  },
  {
    name: "02_childhood_running",
    alt: "Jay as a child running on a grass track at sports day",
    caption: "Sports day",
  },
  {
    name: "04_childhood_football_team",
    alt: "Jay’s childhood football team on the pitch with their coach",
    caption: "First team",
  },
];
