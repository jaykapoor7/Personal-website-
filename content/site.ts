/** Edit this file to update the public portfolio. Keep dates and claims tied to a source.
 * Primary sources: supplied résumé and LinkedIn screenshots (23 October 2026).
 * Month-level dates omitted where these sources conflict. LinkedIn roles include:
 * Crowwd, HDFC, Apodaca Lab, Project Nidaan, Finer Things Club, Juno-AI,
 * SCI 3Sixty, Accessible SmartTech Lab, TARC, and UPMC Emergency Medicine.
 * StrayPaw records and partner count come from Jay’s LinkedIn update and live site.
 * Other recent organizations were named by Jay; dates are omitted where unverified.
 */
export const person = {
  name: "Jay Kapoor",
  email: "jak581@pitt.edu",
  school: "University of Pittsburgh",
  course: "Economics & Statistics",
  place: "Pittsburgh, PA",
  intro:
    "I study Economics and Statistics at Pitt. I’m interested in software, data, and public health.",
  about: [
    "I study Economics and Statistics at Pitt, with a minor in Information Sciences.",
    "I like software, public health, and football.",
  ],
  links: [
    {
      label: "Email",
      href: "mailto:jak581@pitt.edu",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/jay-kapoor7",
    },
    {
      label: "GitHub",
      href: "https://github.com/jaykapoor7",
    },
    {
      label: "X",
      href: "https://x.com/jaybuildsvx",
    },
    {
      label: "Résumé",
      href: "/jay-kapoor-resume.pdf",
    },
  ],
};

export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  period?: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  tone: string;
  body: string[];
  did?: string[];
  gallery?: { src: string; alt: string; caption: string }[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "straypaw",
    title: "StrayPaw",
    eyebrow: "Founder · Current",
    period: "Current",
    summary: "Animal records and care coordination in India.",
    image: "/straypaw/field-observation.webp",
    imageAlt: "Street dog photographed for StrayPaw’s field observation atlas",
    imagePosition: "center 54%",
    tone: "forest",
    body: [
      "I built animal profiles, case tracking, maps, and reporting tools for residents, rescue teams, and municipalities in India.",
    ],
    gallery: [
      {
        src: "/straypaw/field-observation.webp",
        alt: "Field-observation photographs from the StrayPaw project",
        caption: "Field photographs",
      },
      {
        src: "/straypaw/street-dog.jpg",
        alt: "Street dog documented in Delhi",
        caption: "Field photograph",
      },
      {
        src: "/straypaw/skyline-dog.webp",
        alt: "StrayPaw’s city and street dog image",
        caption: "StrayPaw",
      },
    ],
    links: [
      {
        label: "Website",
        href: "https://straypaw.kapoorjay.com",
      },
      {
        label: "Map",
        href: "https://straypaw.kapoorjay.com/map",
      },
    ],
  },
  {
    slug: "juno-ai",
    title: "Juno-AI",
    eyebrow: "Founder · Healthcare",
    period: "Founded 2019",
    summary: "Health information and care navigation.",
    image: "/work/juno-ai/juno-product-dashboard.webp",
    imageAlt: "Juno-AI product screens and dashboard",
    tone: "lilac",
    body: [
      "I built health-information and care-navigation tools. The paper describes a prototype and formative evaluation; it is not clinically validated.",
    ],
    links: [
      {
        label: "Paper",
        href: "/work/juno-ai/Juno-AI-Research-Paper.pdf",
      },
      {
        label: "Interface mockup · illustrative data",
        href: "/work/juno-ai/juno-product-dashboard.webp",
      },
    ],
  },
  {
    slug: "crowwd",
    title: "Crowwd",
    eyebrow: "Founder’s Office Intern · Fintech",
    period: "2025",
    summary: "Growth, research, and the Arthavaad speaker series.",
    image: "/work/crowwd/arthavaad-stage.jpg",
    imageAlt: "Arthavaad event at The Circle.Work",
    tone: "clay",
    body: [
      "I worked on user acquisition, competitive research, and the Arthavaad speaker series.",
    ],
    gallery: [
      {
        src: "/work/crowwd/arthavaad-audience.jpg",
        alt: "Audience at an Arthavaad event",
        caption: "Arthavaad speaker series",
      },
    ],
    links: [
      {
        label: "Website",
        href: "https://crowwd.io",
      },
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
    slug: "project-nidaan",
    title: "Project Nidaan",
    eyebrow: "Co-founder · Health research",
    period: "May 2022–Aug 2024",
    summary: "Medication-access fieldwork with delivery riders.",
    tone: "sand",
    body: [
      "I interviewed 55 delivery riders in Bengaluru and analyzed medication-access barriers. Percentages in the field brief are illustrative.",
    ],
    links: [
      {
        label: "Field brief",
        href: "/work/project-nidaan/Project-Nidaan-Field-Research-Brief.pdf",
      },
      {
        label: "KPI dashboard · illustrative",
        href: "/work/project-nidaan/Project-Nidaan-KPI-Dashboard.xlsx",
      },
    ],
  },
  {
    slug: "finer-things-club",
    title: "The Finer Things Club",
    eyebrow: "Founder · Commerce",
    period: "Jul 2021–Aug 2024",
    summary: "An artisan marketplace in India.",
    tone: "peach",
    body: [
      "I worked on artisan onboarding, online sales, and NGO partnerships.",
    ],
    links: [
      {
        label: "Project summary",
        href: "/work/finer-things-club/Finer-Things-Marketplace-One-Pager.pdf",
      },
    ],
  },
  {
    slug: "tot-schools",
    title: "TOT Schools",
    eyebrow: "Operations Lead",
    period: "Jun 2025–Apr 2026",
    summary: "Operations across eight childcare centres.",
    tone: "blue",
    body: [
      "I managed technology, staffing, facilities, nutrition, documentation, and finance across eight childcare centres.",
    ],
    links: [
      {
        label: "Case study",
        href: "/work/tot-schools/TOT-Schools-Operations-Case-Study.pdf",
      },
    ],
  },
  {
    slug: "hdfc-bank",
    title: "HDFC Bank",
    eyebrow: "Wealth Management Intern",
    period: "2025",
    summary: "Investment research for portfolio reviews.",
    tone: "sand",
    body: [
      "I researched equities, mutual funds, and market trends for HNI portfolio reviews.",
    ],
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
];

export const experience = [
  {
    name: "StrayPaw",
    detail: "Founder",
    href: "/work/straypaw",
  },
  {
    name: "Accessible SmartTech Lab",
    detail: "Research Assistant · Aug 2026–present",
    description:
      "Developing human–machine interaction systems for accessible smart technologies under Prof. Dan Ding.",
  },
  {
    name: "SCI 3Sixty",
    detail: "3Sixty Fellow · Sep 2026–present",
    description: "Applied AI research under Prof. Rosta Farzan.",
  },
  {
    name: "Research with Prof. Rosta Farzan",
    detail: "AI adoption among nonprofits",
  },
  {
    name: "Prof. Yasir Khan",
    detail: "Economics research on Kisan Rail",
  },
  {
    name: "JumpStart / AmeriCorps",
    detail: "Team Leader",
    description:
      "Led eight corps members delivering early-childhood literacy programming in Pittsburgh schools.",
  },
  {
    name: "TOT Schools",
    detail: "Operations Lead · Jun 2025–Apr 2026",
    href: "/work/tot-schools",
  },
  {
    name: "Crowwd",
    detail: "Founder’s Office Intern · 2025",
    href: "/work/crowwd",
  },
  {
    name: "HDFC Bank",
    detail: "Wealth Management Intern · 2025",
    href: "/work/hdfc-bank",
  },
  {
    name: "The International School of Bangalore",
    detail: "Founder, Entrepreneurship Club · 2021–2023",
    description: "Founded the school entrepreneurship club.",
  },
  {
    name: "School event operations",
    detail: "Head of Vendor Acquisition · 2022",
    description:
      "Vendor coordination and budgeting for the school’s event, recorded on LinkedIn.",
  },
  {
    name: "National Economics Fest",
    detail: "Contingent Leader · 2023",
    description:
      "Led a team of six developing macroeconomic models and policy proposals.",
  },
];

export const writingItems = [
  {
    title: "India HealthTech Market Map",
    description: "Company research and dataset.",
    type: "Research",
    links: [
      {
        label: "Open PDF",
        href: "/research/India-HealthTech-Market-Map.pdf",
      },
      {
        label: "Download CSV",
        href: "/research/India-HealthTech-Companies.csv",
      },
    ],
  },
  {
    title: "Memo Library & Calibration Ledger",
    description: "Investment memos and dated forecasts.",
    type: "Memos",
    links: [
      {
        label: "See the ledger",
        href: "/ledger",
      },
      {
        label: "Open PDF",
        href: "/research/Memo-Library-and-Ledger.pdf",
      },
    ],
  },
  {
    title: "India’s GLP-1 Inflection",
    description: "Notes on metabolic care in India.",
    type: "Research",
    links: [
      {
        label: "Open PDF",
        href: "/research/India-GLP1-Sector-Thesis.pdf",
      },
    ],
  },
  {
    title: "India’s Retail-Investing Reset",
    description: "Notes on retail investing in India.",
    type: "Research",
    links: [
      {
        label: "Open PDF",
        href: "/research/India-Fintech-Sector-Thesis.pdf",
      },
    ],
  },
  {
    title: "Juno-AI research paper",
    description: "System design and formative evaluation.",
    type: "Paper",
    links: [
      {
        label: "Open PDF",
        href: "/work/juno-ai/Juno-AI-Research-Paper.pdf",
      },
    ],
  },
];

export const archiveProjects: Project[] = [
  {
    slug: "juno-adhd-os",
    title: "Juno ADHD OS",
    eyebrow: "Prototype · Productivity",
    period: "Jan–May 2026",
    summary: "An ADHD productivity prototype.",
    tone: "blue",
    body: [
      "A prototype for AI-assisted productivity and behavioral planning, documented on LinkedIn.",
    ],
    links: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/jay-kapoor7",
      },
    ],
  },
  {
    slug: "juno-preventive-health",
    title: "Juno Preventive Health",
    eyebrow: "Prototype · Healthcare",
    period: "2026",
    summary: "A preventive-health information prototype.",
    tone: "lilac",
    body: [
      "I built an early preventive-health information tool using the Claude API.",
    ],
    links: [
      {
        label: "Prototype",
        href: "https://preventive-healthcare-xi.vercel.app/",
      },
    ],
  },
  {
    slug: "tarc",
    title: "TARC",
    eyebrow: "Project and Operations Associate",
    period: "Jan–Aug 2026",
    summary: "Real-estate feasibility research.",
    tone: "sand",
    body: ["I researched zoning, pricing, and development assumptions."],
    links: [
      {
        label: "Feasibility memo",
        href: "/work/tarc/Development-Feasibility-Memo-2025.pdf",
      },
    ],
  },
  {
    slug: "seo-geo-optimiser",
    title: "Search visibility checker",
    eyebrow: "Prototype · Search",
    period: "2026",
    summary: "A search-visibility checker.",
    tone: "blue",
    body: [
      "I built a tool for checking website visibility in conventional and AI search.",
    ],
    links: [
      {
        label: "Prototype",
        href: "https://llm-ai-search-checker.vercel.app/",
      },
    ],
  },
  {
    slug: "recovery-intelligence",
    title: "Health OS",
    eyebrow: "Prototype · Health data",
    period: "2026",
    summary: "A wearable-data interface prototype.",
    tone: "peach",
    body: [
      "A browser-based health-data interface. Its scores are placeholders, not validated health measures.",
    ],
    links: [
      {
        label: "Prototype",
        href: "https://explain-my-whoop-stats.vercel.app/",
      },
    ],
  },
  {
    slug: "road360",
    title: "Road360",
    eyebrow: "Prototype · Transport",
    period: "2026",
    summary: "A driving-data experiment.",
    tone: "clay",
    body: [
      "I explored horn noise and harsh braking as signals of road conditions.",
    ],
    links: [
      {
        label: "Prototype",
        href: "https://road360.vercel.app/",
      },
    ],
  },
  {
    slug: "apodaca-lab",
    title: "Apodaca Lab",
    eyebrow: "Research Assistant · Pitt",
    period: "2024–2025",
    summary: "Cell-biology research at Pitt.",
    tone: "sand",
    body: [
      "I cultured bladder urothelial cells for PIEZO/TMEM63 studies and prepared research figures.",
    ],
    links: [],
  },
  {
    slug: "pitt-sociology",
    title: "Pitt Sociology",
    eyebrow: "Research assistant · Pitt",
    summary: "Literature reviews and survey analysis.",
    tone: "blue",
    body: [
      "I worked on literature reviews, survey data, and analysis in R and Stata.",
    ],
    links: [],
  },
  {
    slug: "upmc-emergency-medicine",
    title: "UPMC Emergency Medicine",
    eyebrow: "Research Assistant",
    period: "Aug 2025–Jan 2026",
    summary: "Clinical data and prehospital-care research.",
    tone: "lilac",
    body: [
      "I abstracted EMR data, coded records in REDCap, and analyzed prehospital care patterns.",
    ],
    links: [],
  },
  {
    slug: "max-hospital",
    title: "Max Hospital",
    eyebrow: "Clinical shadowing",
    period: "2023–2024",
    summary: "Clinical shadowing in New Delhi.",
    tone: "peach",
    body: ["I shadowed emergency and internal-medicine teams."],
    links: [],
  },
];

export const allProjects = [...projects, ...archiveProjects];
