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
    "I’m a student at the University of Pittsburgh. I’m working on StrayPaw and a few research projects. Here’s some of what I’ve been working on.",
  about: [
    "I’m Jay. I study Economics and Statistics at the University of Pittsburgh, with a minor in Information Sciences.",
    "Lately, most of my time outside class has gone into StrayPaw, a way to keep better records for street animals in India. I also work on research with people at Pitt and spend time reading about healthcare, technology, and investing.",
    "Before this, I worked on a healthcare project called Juno-AI, helped run projects at Crowwd, and did a mix of research and operations work. The work page has the details.",
  ],
  links: [
    { label: "Email", href: "mailto:jak581@pitt.edu" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jay-kapoor7" },
    { label: "GitHub", href: "https://github.com/jaykapoor7" },
    { label: "X", href: "https://x.com/jaybuildsvx" },
    { label: "Résumé", href: "/jay-kapoor-resume.pdf" },
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
    eyebrow: "Founder · Current project",
    period: "Current",
    summary:
      "A shared record for street animals in India, from the first sighting to the care they receive.",
    image: "/straypaw/field-observation.webp",
    imageAlt: "Street dog photographed for StrayPaw’s field observation atlas",
    imagePosition: "center 54%",
    tone: "forest",
    body: [
      "StrayPaw gives residents, rescue teams, and local governments a way to work from the same record. Someone can report an animal; a field team can follow the case; a city can see where care is happening and where it is missing.",
      "I started it because much of this work already happens through feeders, rescuers, and NGOs, but the records are often scattered. The product now includes animal profiles, case tracking, and a live map. The project register contains over 30,000 animal records across 28 Indian cities. My October LinkedIn update reports 19 NGO partnerships, including PAWS Chennai, Pawsome People Project, and The Kind Hour Foundation. A record count is not a count of animals rescued or treated.",
    ],
    did: [
      "Product design and development",
      "Field workflows for reports and case follow-up",
      "Outreach to feeder networks and NGOs",
      "NGO case workspaces, maps, field access, and municipal ABC/ARV reporting",
    ],
    gallery: [
      {
        src: "/straypaw/field-observation.webp",
        alt: "Field-observation photographs from the StrayPaw project",
        caption: "The field-observation archive",
      },
      {
        src: "/straypaw/street-dog.jpg",
        alt: "Street dog documented in Delhi",
        caption: "From StrayPaw’s field photographs",
      },
      {
        src: "/straypaw/skyline-dog.webp",
        alt: "StrayPaw’s city and street dog image",
        caption: "StrayPaw, from the street up",
      },
    ],
    links: [
      { label: "Visit StrayPaw", href: "https://straypaw.kapoorjay.com" },
      {
        label: "Explore the live map",
        href: "https://straypaw.kapoorjay.com/map",
      },
    ],
  },
  {
    slug: "juno-ai",
    title: "Juno-AI",
    eyebrow: "Founder · Healthcare",
    period: "Founded 2019",
    summary:
      "A healthcare access project I started to help people find information, doctors, and pharmacies.",
    image: "/work/juno-ai/juno-product-dashboard.webp",
    imageAlt: "Juno-AI product screens and dashboard",
    tone: "lilac",
    body: [
      "I started Juno-AI as a teenager in India. It combined health information with tools for finding care, especially for people in places where reliable guidance can be hard to get.",
      "I built the product, led outreach, and developed healthcare partnerships. My résumé and LinkedIn report 10,000+ rural users. The linked paper documents the retrieval-grounded information and care-navigation prototype; it does not independently audit that historical user count.",
      "The paper reports a small formative evaluation, not clinical effectiveness. The historical platform and the more recent preventive-health experiment are listed separately.",
    ],
    did: [
      "Health information and care navigation",
      "Doctor and pharmacy discovery",
      "Research paper on the approach",
    ],
    links: [
      {
        label: "Read the paper",
        href: "/work/juno-ai/Juno-AI-Research-Paper.pdf",
      },
      {
        label: "Archived interface mockup · illustrative figures",
        href: "/work/juno-ai/juno-product-dashboard.webp",
      },
    ],
  },
  {
    slug: "crowwd",
    title: "Crowwd",
    eyebrow: "Founder’s Office Intern · Fintech",
    period: "2025",
    summary: "Growth, events, and research at an investing platform in India.",
    image: "/work/crowwd/arthavaad-stage.jpg",
    imageAlt: "Arthavaad event at The Circle.Work",
    tone: "clay",
    body: [
      "In Crowwd’s founder’s office, I ran multi-channel user acquisition, benchmarked seven social-investing platforms, and wrote a GEO playbook for the founder.",
      "I launched Arthavaad, a multi-city monthly speaker series, and handled speaker outreach, brand partnerships, logistics, and execution. Event photographs and selected strategy work are linked below.",
      "The work ranged from looking at acquisition channels to finding speakers and running events. I also wrote research notes on fintech products.",
    ],
    did: [
      "Arthavaad speaker series",
      "Research on investing products",
      "User acquisition experiments",
    ],
    gallery: [
      {
        src: "/work/crowwd/arthavaad-audience.jpg",
        alt: "Audience at an Arthavaad event",
        caption: "Arthavaad speaker series",
      },
    ],
    links: [
      { label: "Visit Crowwd", href: "https://crowwd.io" },
      {
        label: "Fintech teardown",
        href: "/work/crowwd/Crowwd-Fintech-Teardown.pdf",
      },
      {
        label: "Selected research",
        href: "/work/crowwd/Crowwd-Selected-Research-and-Strategy.pdf",
      },
    ],
  },
  {
    slug: "project-nidaan",
    title: "Project Nidaan",
    eyebrow: "Co-founder · Health research",
    period: "May 2022–Aug 2024",
    summary:
      "Research into medication access for delivery riders in Bengaluru.",
    tone: "sand",
    body: [
      "I interviewed 55 delivery riders in Bengaluru about medication and care access, then organized and analyzed the responses. The project looked at barriers that do not always show up in formal healthcare data.",
      "Cost, time away from paid work, and fragmented care emerged as recurring themes. The work points toward care that fits riders’ schedules and reduces the cost of seeking help.",
      "This is qualitative work in one city. The field brief preserves the project’s interview count, but its coded percentages are illustrative. They should not be read as measured population estimates.",
    ],
    links: [
      {
        label: "Field research brief",
        href: "/work/project-nidaan/Project-Nidaan-Field-Research-Brief.pdf",
      },
      {
        label: "KPI dashboard · illustrative work sample",
        href: "/work/project-nidaan/Project-Nidaan-KPI-Dashboard.xlsx",
      },
    ],
  },
  {
    slug: "finer-things-club",
    title: "The Finer Things Club",
    eyebrow: "Founder · Commerce",
    period: "Jul 2021–Aug 2024",
    summary: "An artisan marketplace: 300+ rural artisans, $8k+ in revenue.",
    tone: "peach",
    body: [
      "I founded an artisan-commerce initiative and worked on onboarding, distribution, and operations through NGO and marketplace partnerships. My résumé and LinkedIn record report 300+ rural artisans onboarded and $8k+ in revenue; the one-pager preserves the project account.",
    ],
    links: [
      {
        label: "Project one-pager",
        href: "/work/finer-things-club/Finer-Things-Marketplace-One-Pager.pdf",
      },
    ],
  },
  {
    slug: "tot-schools",
    title: "TOT Schools",
    eyebrow: "Operations Lead",
    period: "Jun 2025–Apr 2026",
    summary: "Six operating functions. Eight early-childhood centres.",
    tone: "blue",
    body: [
      "I ran technology, facilities, people, nutrition, documentation, and finance across eight centres. I rolled out Illumine for attendance, billing, and parent communications, and CCTV across the centres.",
      "I hired and onboarded staff and wrote a 12-document handbook and SOP suite. The linked case study documents the scope and work delivered, as reported by me.",
    ],
    links: [
      {
        label: "Operations case study",
        href: "/work/tot-schools/TOT-Schools-Operations-Case-Study.pdf",
      },
    ],
  },
  {
    slug: "hdfc-bank",
    title: "HDFC Bank",
    eyebrow: "Wealth Management Intern",
    period: "2025",
    summary: "Investment research for the wealth management team.",
    tone: "sand",
    body: [
      "I researched equities, mutual funds, and other products for portfolio reviews. These are two examples of the work.",
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
  { name: "StrayPaw", detail: "Founder", href: "/work/straypaw" },
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
  { name: "Prof. Yasir Khan", detail: "Economics research on Kisan Rail" },
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
    description:
      "A map of companies working across healthcare in India, with the underlying data.",
    type: "Research",
    links: [
      { label: "Open PDF", href: "/research/India-HealthTech-Market-Map.pdf" },
      {
        label: "Download CSV",
        href: "/research/India-HealthTech-Companies.csv",
      },
    ],
  },
  {
    title: "Memo Library & Calibration Ledger",
    description:
      "Investment memos and a dated list of forecasts. I keep the calls and their outcomes together.",
    type: "Memos",
    links: [
      { label: "See the ledger", href: "/ledger" },
      { label: "Open PDF", href: "/research/Memo-Library-and-Ledger.pdf" },
    ],
  },
  {
    title: "India’s GLP-1 Inflection",
    description:
      "Notes on the companies and products around metabolic care in India.",
    type: "Research",
    links: [
      { label: "Open PDF", href: "/research/India-GLP1-Sector-Thesis.pdf" },
    ],
  },
  {
    title: "India’s Retail-Investing Reset",
    description: "A look at where India’s retail investing market may go next.",
    type: "Research",
    links: [
      { label: "Open PDF", href: "/research/India-Fintech-Sector-Thesis.pdf" },
    ],
  },
  {
    title: "Juno-AI research paper",
    description: "The research behind the healthcare access project.",
    type: "Paper",
    links: [
      { label: "Open PDF", href: "/work/juno-ai/Juno-AI-Research-Paper.pdf" },
    ],
  },
];

/** Smaller projects remain accessible without taking over the main work page. */
export const archiveProjects: Project[] = [
  {
    slug: "juno-adhd-os",
    title: "Juno ADHD OS",
    eyebrow: "Documented prototype · Productivity",
    period: "Jan–May 2026",
    summary: "A productivity and behavioral-planning prototype for ADHD users.",
    tone: "blue",
    body: [
      "My LinkedIn project record describes a prototype exploring AI-assisted productivity and behavioral planning for ADHD users. It is separate from Juno’s healthcare-access platform and the preventive-health experiment.",
    ],
    links: [
      {
        label: "LinkedIn project record",
        href: "https://www.linkedin.com/in/jay-kapoor7",
      },
    ],
  },

  {
    slug: "juno-preventive-health",
    title: "Juno Preventive Health",
    eyebrow: "Small build · Healthcare",
    period: "2026",
    summary: "An experiment with AI and preventive health information.",
    tone: "lilac",
    body: [
      "I built an early version using the Claude API to explore how people might make sense of preventive care.",
    ],
    links: [
      {
        label: "Open the build",
        href: "https://preventive-healthcare-xi.vercel.app/",
      },
    ],
  },
  {
    slug: "tarc",
    title: "TARC",
    eyebrow: "Project and Operations Associate",
    period: "Jan–Aug 2026",
    summary: "Feasibility research for potential real estate projects.",
    tone: "sand",
    body: [
      "I looked at regulations, pricing, and project assumptions for possible developments.",
    ],
    links: [
      {
        label: "Read a feasibility memo",
        href: "/work/tarc/Development-Feasibility-Memo-2025.pdf",
      },
    ],
  },
  {
    slug: "seo-geo-optimiser",
    title: "Search visibility checker",
    eyebrow: "Small build · Search",
    period: "2026",
    summary:
      "A tool that reviews a site’s search visibility and produces a report.",
    tone: "blue",
    body: [
      "I made this after working on search distribution at Crowwd. It looks at conventional search and AI search results.",
    ],
    links: [
      {
        label: "Open the tool",
        href: "https://llm-ai-search-checker.vercel.app/",
      },
    ],
  },
  {
    slug: "recovery-intelligence",
    title: "Health OS",
    eyebrow: "Small build · Health data",
    period: "2026",
    summary:
      "A browser-based prototype that explains wearable data and personal patterns.",
    tone: "peach",
    body: [
      "The current repository describes Health OS: a personal health-data interface with recovery, sleep, activity, and trend explanations. Health records are stored in the browser.",
      "Its current scoring calculators are deterministic placeholders, not validated health algorithms. I treat it as an interface and data-explanation prototype.",
    ],
    links: [
      {
        label: "Open the tool",
        href: "https://explain-my-whoop-stats.vercel.app/",
      },
    ],
  },
  {
    slug: "road360",
    title: "Road360",
    eyebrow: "Small build · Transport",
    period: "2026",
    summary: "A driving experiment built around Delhi’s road conditions.",
    tone: "clay",
    body: [
      "I explored whether horn noise and harsh braking could help describe a drive.",
    ],
    links: [{ label: "Open the tool", href: "https://road360.vercel.app/" }],
  },
  {
    slug: "apodaca-lab",
    title: "Apodaca Lab",
    eyebrow: "Research Assistant · Pitt",
    period: "2024–2025",
    summary: "Cell biology research at the Pitt School of Medicine.",
    tone: "sand",
    body: [
      "I cultured primary bladder urothelial cells for PIEZO/TMEM63 mechanotransduction studies under Prof. Gerard Apodaca and contributed figures toward manuscripts and grant submissions. This describes a research-assistant contribution, not authorship of a published finding.",
    ],
    links: [],
  },
  {
    slug: "pitt-sociology",
    title: "Pitt Sociology",
    eyebrow: "Research assistant · Pitt",
    summary: "Literature review and data work in Pitt’s sociology department.",
    tone: "blue",
    body: [
      "The work involved reading studies, working with surveys, and analysis in R and Stata.",
    ],
    links: [],
  },
  {
    slug: "upmc-emergency-medicine",
    title: "UPMC Emergency Medicine",
    eyebrow: "Research Assistant",
    period: "Aug 2025–Jan 2026",
    summary: "Research on prehospital care and emergency outcomes.",
    tone: "lilac",
    body: [
      "My work included abstracting and coding EMR data in REDCap for retrospective trauma studies, and analysis of prehospital care patterns and emergency outcomes. Patient-level research data are not published here.",
    ],
    links: [],
  },
  {
    slug: "max-hospital",
    title: "Max Hospital",
    eyebrow: "Clinical shadowing",
    period: "2023–2024",
    summary: "Clinical shadowing in emergency and internal medicine.",
    tone: "peach",
    body: ["I observed care at a hospital in New Delhi."],
    links: [],
  },
];
export const allProjects = [...projects, ...archiveProjects];
