import type { WorkItem } from "./types";

// Experience and builds, expressed as case studies. Content is faithful to the
// resume; no metric or proof link is invented. Items without a public artifact
// yet carry a "coming_soon" proof slot so the placeholder is explicit.
//
// NOTE: array order here is authoring order only. Display order is computed by
// lib/order.ts using impact → recency → relevance.
export const work: WorkItem[] = [
  {
    slug: "crowwd",
    title: "Crowwd",
    role: "Founder's Office Intern",
    category: "Fintech",
    location: "New Delhi, India",
    period: "May 2025 — May 2026",
    impact: 9,
    recency: 2026,
    relevance: 10,
    featured: true,
    summary:
      "Founder's-office intern at a 20,000-user fintech & investing-insights platform, working across growth, strategy, and investment research.",
    context: [
      "Crowwd is a fintech and investing-insights platform with roughly 20,000 users. I operated inside the founder's office, reporting directly to the Founder & CEO.",
      "My remit spanned growth, strategy, business development, and operations — the work that decides how a young platform finds and keeps its audience.",
    ],
    contributions: [
      "Reported directly to the Founder & CEO across growth, strategy, business development, and operations.",
      "Owned organic user acquisition across Reddit, YouTube, Google Ads, and Generative Engine Optimization (GEO), building the platform's multi-channel distribution strategy.",
      "Launched and operated Arthavaad, a multi-city monthly speaker series — owning speaker outreach, brand partnerships, logistics, and event execution end-to-end.",
      "Produced competitive analysis and investment research across Indian fintech platforms to inform founder-level strategic planning.",
    ],
    outcomes: [
      "Built the platform's multi-channel organic distribution strategy.",
      "Stood up a recurring, multi-city speaker series from scratch.",
    ],
    metrics: [
      { value: "20K", label: "platform users", source: "resume" },
      { value: "4+", label: "acquisition channels owned", source: "resume" },
    ],
    proof: [
      { type: "live", status: "coming_soon", title: "Crowwd platform", note: "Public link to add." },
      {
        type: "pdf",
        status: "coming_soon",
        title: "Competitive analysis sample",
        note: "Redacted research excerpt to add.",
      },
      {
        type: "image",
        status: "coming_soon",
        title: "Arthavaad speaker series",
        note: "Event photos to add.",
      },
    ],
    tags: ["Growth", "Investment Research", "GEO", "Events"],
  },
  {
    slug: "juno-ai",
    title: "Juno-AI",
    role: "Founder",
    category: "Healthcare",
    location: "Bengaluru, India",
    period: "Jun 2019 — Jul 2024",
    impact: 10,
    recency: 2024,
    relevance: 8,
    featured: true,
    summary:
      "Founded and scaled a healthcare-access platform to 10,000+ rural users, connecting patients with doctors, pharmacies, and booking services.",
    context: [
      "Juno-AI is a healthcare-access platform I founded to connect patients in underserved communities with doctors, pharmacies, and booking services.",
      "I led it end-to-end across the full lifecycle — product, user outreach, partnerships, and operations.",
    ],
    contributions: [
      "Founded and scaled the platform to 10,000+ rural users across underserved communities.",
      "Negotiated partnerships with four healthcare organizations, driving 180% user growth within 12 months.",
      "Led product development, user outreach, and operations end-to-end across the full platform lifecycle.",
    ],
    outcomes: [
      "Reached 10,000+ rural users.",
      "Drove 180% user growth in a 12-month window via healthcare partnerships.",
    ],
    metrics: [
      { value: "10K+", label: "rural users", source: "resume" },
      { value: "180%", label: "user growth in 12 months", source: "resume" },
      { value: "4", label: "healthcare partnerships", source: "resume" },
    ],
    proof: [
      { type: "live", status: "coming_soon", title: "Juno-AI", note: "Public link / archive to add." },
      {
        type: "image",
        status: "coming_soon",
        title: "Product screenshots",
        note: "App / platform screenshots to add.",
      },
    ],
    tags: ["Founder", "Product", "Healthcare Access", "Partnerships"],
  },
  {
    slug: "juno-adhd-os",
    title: "Juno ADHD OS",
    role: "Builder",
    category: "AI / Product",
    location: "Remote",
    period: "Jan 2026 — Present",
    impact: 7,
    recency: 2026,
    relevance: 9,
    featured: true,
    summary:
      "Building an AI-powered productivity and behavioral operating system for ADHD users — documented publicly as I build.",
    context: [
      "Juno ADHD OS is an AI-powered productivity and behavioral operating system for people with ADHD, built on the Claude API.",
      "I'm documenting the full product build in public at @jaybuildsvx, so the process itself is the proof.",
    ],
    contributions: [
      "Designing and building an AI productivity/behavioral OS for ADHD users on the Claude API.",
      "Documenting the full product build publicly at @jaybuildsvx.",
    ],
    outcomes: [
      "Active build — progress is shared openly as it happens.",
    ],
    metrics: [],
    proof: [
      {
        type: "social",
        status: "available",
        title: "Build updates on X",
        url: "https://x.com/jaybuildsvx",
        note: "Building in public at @jaybuildsvx.",
      },
      { type: "repo", status: "coming_soon", title: "Source / repo", note: "Link to add." },
      { type: "live", status: "coming_soon", title: "Live product", note: "Link to add." },
    ],
    tags: ["AI", "Claude API", "Product", "Building in public"],
  },
  {
    slug: "hdfc-bank",
    title: "HDFC Bank",
    role: "Wealth Management Intern, HNI Division",
    category: "Investing",
    location: "India",
    period: "Jun 2025 — Aug 2025",
    impact: 7,
    recency: 2025,
    relevance: 9,
    featured: false,
    summary:
      "Conducted investment research for High-Net-Worth Individual portfolio reviews under the Head of Wealth Management.",
    context: [
      "I interned in HDFC Bank's HNI (High-Net-Worth Individual) wealth management division, working under the Head of Wealth Management.",
      "The work was investment research feeding directly into client-facing portfolio reviews.",
    ],
    contributions: [
      "Conducted investment research analyzing equities, mutual funds, and investment products for HNI portfolio reviews.",
      "Produced client-facing investment pitch decks and research summaries used directly in portfolio reviews and client meetings.",
      "Researched macroeconomic, sector, and company-level trends to inform asset allocation and portfolio construction recommendations.",
    ],
    outcomes: [
      "Research summaries and decks used directly in client portfolio reviews and meetings.",
    ],
    metrics: [],
    proof: [
      {
        type: "pdf",
        status: "coming_soon",
        title: "Investment pitch deck (redacted)",
        note: "Client-safe sample to add.",
      },
    ],
    tags: ["Investment Research", "Equities", "Portfolio Construction"],
  },
  {
    slug: "tarc",
    title: "TARC",
    role: "Project & Operations Associate",
    category: "Real Estate",
    location: "New Delhi, India",
    period: "Jan 2025 — Apr 2025",
    impact: 6,
    recency: 2025,
    relevance: 5,
    featured: false,
    summary:
      "Evaluated residential and mixed-use development viability and produced feasibility analyses used in leadership go/no-go decisions.",
    context: [
      "TARC operates in real estate development and architecture. I sat on the project & operations side, assessing whether prospective developments were worth pursuing.",
    ],
    contributions: [
      "Evaluated the viability of residential and mixed-use developments — researching zoning regulations, housing laws, pricing assumptions, and land opportunities to drive go/no-go decisions.",
      "Produced feasibility analyses and operational reports used in leadership decision-making for prospective developments.",
    ],
    outcomes: [
      "Feasibility analyses informed leadership go/no-go decisions on prospective developments.",
    ],
    metrics: [],
    proof: [
      {
        type: "pdf",
        status: "coming_soon",
        title: "Feasibility analysis (sample)",
        note: "Redacted sample to add.",
      },
    ],
    tags: ["Feasibility Analysis", "Operations", "Research"],
  },
  {
    slug: "project-nidaan",
    title: "Project Nidaan",
    role: "Healthcare Access Coordinator",
    category: "Healthcare",
    location: "Bengaluru, India",
    period: "May 2022 — Aug 2024",
    impact: 5,
    recency: 2024,
    relevance: 6,
    featured: false,
    summary:
      "Mapped healthcare-access barriers for gig-economy delivery workers through 50+ field interviews and partnership distribution.",
    context: [
      "Project Nidaan focused on healthcare access for gig-economy delivery workers — an underserved group with real medication-access barriers.",
    ],
    contributions: [
      "Conducted 50+ field interviews with gig-economy delivery workers to map medication and healthcare-access barriers.",
      "Coordinated distribution partnerships with Zomato and Swiggy to reach underserved riders.",
      "Built Excel KPI dashboards tracking delivery performance and program outcomes.",
    ],
    outcomes: [
      "Field research mapped real medication-access barriers for delivery riders.",
      "Distribution partnerships with Zomato and Swiggy extended reach to underserved riders.",
    ],
    metrics: [{ value: "50+", label: "field interviews conducted", source: "resume" }],
    proof: [
      {
        type: "pdf",
        status: "coming_soon",
        title: "Field research summary",
        note: "Write-up to add.",
      },
      {
        type: "image",
        status: "coming_soon",
        title: "KPI dashboard",
        note: "Excel dashboard screenshot to add.",
      },
    ],
    tags: ["Field Research", "Operations", "Partnerships"],
  },
  {
    slug: "finer-things-club",
    title: "The Finer Things Club",
    role: "Founder",
    category: "Commerce",
    location: "India",
    period: "2021 — 2024",
    impact: 5,
    recency: 2024,
    relevance: 5,
    featured: false,
    summary:
      "Founded an artisan-commerce initiative onboarding 300+ rural artisans and generating $8k+ in revenue.",
    context: [
      "The Finer Things Club was an artisan-commerce initiative connecting rural artisans to buyers through NGO and marketplace partnerships.",
    ],
    contributions: [
      "Founded the initiative and onboarded 300+ rural artisans.",
      "Generated $8k+ in revenue through NGO and marketplace partnerships.",
    ],
    outcomes: [
      "Onboarded 300+ rural artisans and generated $8k+ in revenue.",
    ],
    metrics: [
      { value: "300+", label: "rural artisans onboarded", source: "resume" },
      { value: "$8k+", label: "revenue generated", source: "resume" },
    ],
    proof: [
      { type: "live", status: "coming_soon", title: "Initiative page", note: "Link / archive to add." },
      { type: "image", status: "coming_soon", title: "Artisan & product photos", note: "Images to add." },
    ],
    tags: ["Founder", "Commerce", "Partnerships"],
  },
];
