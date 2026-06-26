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
      "Founder's-office intern at a ~20,000-user fintech & investing-insights platform, owning user acquisition, the Arthavaad speaker series, and competitive/investment research.",
    context: [
      "As a Founder's-Office Intern at Crowwd — a fintech and investing-insights platform with ~20,000 users (“Mute the chaos. Invest with clarity.”) — I reported directly to the Founder & CEO across growth, strategy, business development, and operations, from May 2025 to May 2026 in New Delhi.",
      "I owned Crowwd's user acquisition end-to-end, building a multi-channel distribution strategy across Reddit, X, YouTube, Google Ads, and Generative Engine Optimization (GEO) — organic and paid — while managing a small team of interns; our organic channels onboarded 200+ users. Supporting that, I authored Crowwd's GEO playbook and a channel analysis of unconventional ad platforms with CPM/CTR benchmarks.",
      "I also launched and ran Arthavaad, a multi-city monthly speaker series, owning speaker outreach, brand partnerships, logistics, and event execution end-to-end.",
      "On research, I produced competitive analysis and investment research across Indian fintech, benchmarking Crowwd against seven social-investing platforms (OpiGo, Liquide, Stocktwits, eToro, and others) to inform founder-level strategy.",
    ],
    contributions: [
      "Reported directly to the Founder & CEO across growth, strategy, business development, and operations.",
      "Owned multi-channel user acquisition (Reddit, X, YouTube, Google Ads, GEO) and managed a small intern team; organic channels onboarded 200+ users.",
      "Launched and ran Arthavaad, a multi-city monthly speaker series — speaker outreach, partnerships, logistics, and execution end-to-end.",
      "Produced competitive analysis and investment research across Indian fintech to inform founder-level strategy.",
    ],
    outcomes: [],
    metrics: [
      { value: "~20K", label: "platform users", source: "resume" },
      { value: "200+", label: "users onboarded via organic channels", source: "analytics" },
      { value: "7", label: "social-investing platforms benchmarked", source: "published" },
    ],
    proof: [
      {
        type: "live",
        status: "available",
        title: "Visit Crowwd",
        url: "https://crowwd.io",
        note: "Mute the chaos. Invest with clarity.",
      },
      {
        type: "pdf",
        status: "available",
        title: "Selected Research & Strategy (PDF)",
        url: "/work/crowwd/Crowwd-Selected-Research-and-Strategy.pdf",
        note: "Competitive analysis, GEO playbook, and channel strategy.",
      },
      {
        type: "pdf",
        status: "available",
        title: "Fintech teardown (PDF)",
        url: "/work/crowwd/Crowwd-Fintech-Teardown.pdf",
        note: "Benchmarking Crowwd against social-investing platforms.",
      },
      {
        type: "image",
        status: "available",
        title: "Photos from Arthavaad",
        url: "/work/crowwd/arthavaad-stage.jpg",
        note: "Crowwd's speaker series at The Circle.Work.",
      },
    ],
    gallery: [
      {
        src: "/work/crowwd/arthavaad-stage.jpg",
        alt: "Arthavaad — Crowwd's speaker series at The Circle.Work",
        caption: "Arthavaad — Crowwd's speaker series at The Circle.Work",
      },
      {
        src: "/work/crowwd/arthavaad-audience.jpg",
        alt: "Attendees at Arthavaad",
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
      "Founded and scaled a healthcare-access platform to 10,000+ rural users — a retrieval-grounded conversational health assistant with doctor discovery, pharmacy support, and a health dashboard.",
    context: [
      "Juno-AI is a healthcare-access platform I founded to help people — especially in underserved and rural communities — find trustworthy health information and navigate fragmented care. Access to reliable guidance is uneven for users in low-resource, low-literacy settings, who often have to interpret symptoms, judge urgency, and locate appropriate care with little support.",
      "I designed Juno as a product-first healthcare experience rather than a generic chatbot: a conversational assistant that grounds every response in vetted, authoritative sources using retrieval-augmented generation, paired with doctor discovery, pharmacy support, intelligent next-step recommendations, and a personalized health dashboard.",
      "I led the platform end-to-end — product, user outreach, partnerships, and operations — scaling it to 10,000+ rural users and documenting the approach in a research paper, “Juno AI: A Retrieval-Grounded Conversational Platform for Equitable Healthcare Information Access and Navigation.”",
    ],
    contributions: [
      "Founded and scaled the platform to 10,000+ rural users across underserved communities.",
      "Designed a conversational health assistant that grounds answers in a curated corpus of authoritative sources (retrieval-augmented generation) rather than unvetted content.",
      "Built the core product surfaces — doctor discovery, pharmacy support, a personalized health dashboard, and intelligent next-step recommendations.",
      "Negotiated partnerships with four healthcare organizations, driving 180% user growth within 12 months.",
      "Led product development, user outreach, and operations end-to-end, and documented the work in a research paper.",
    ],
    outcomes: [
      "Reached 10,000+ rural users.",
      "Drove 180% user growth in a 12-month window via healthcare partnerships.",
      "Documented the platform and its retrieval-grounded approach in a research paper.",
    ],
    metrics: [
      { value: "10K+", label: "rural users", source: "resume" },
      { value: "180%", label: "user growth in 12 months", source: "resume" },
      { value: "4", label: "healthcare partnerships", source: "resume" },
    ],
    proof: [
      {
        type: "pdf",
        status: "available",
        title: "Juno-AI research paper (PDF)",
        url: "/work/juno-ai/Juno-AI-Research-Paper.pdf",
        note: "A Retrieval-Grounded Conversational Platform for Equitable Healthcare Information Access.",
      },
      {
        type: "image",
        status: "available",
        title: "Product & impact dashboard",
        url: "/work/juno-ai/juno-product-dashboard.webp",
        note: "Patient app, AI assistant, find-a-doctor, pharmacy, and impact dashboard.",
      },
    ],
    gallery: [
      {
        src: "/work/juno-ai/juno-product-dashboard.webp",
        alt: "Juno-AI product screens — patient dashboard, AI symptom assistant, find-a-doctor, nearby pharmacy, and the admin impact dashboard",
        caption:
          "Juno-AI — patient app, AI assistant, doctor & pharmacy discovery, and the impact dashboard.",
        color: true,
      },
    ],
    tags: ["Founder", "Product", "AI / RAG", "Healthcare Access", "Partnerships"],
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
    featured: false,
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
    ],
    tags: ["AI", "Claude API", "Product", "Building in public"],
  },
  {
    slug: "tot-schools",
    title: "TOT Schools",
    role: "Operations Lead",
    category: "Startup Operations",
    period: "2025 — Present",
    impact: 7,
    recency: 2026,
    relevance: 8,
    featured: true,
    summary:
      "End-to-end operations for a multi-centre early-childhood business — software, facilities, hiring, nutrition, compliance and documentation — run lean by one operator using AI as the team.",
    context: [
      "Running a childcare chain, AI-first. TOT Schools Learning Solutions Pvt. Ltd. is a multi-centre early-childhood business, and I run its operations end-to-end as Operations Lead — across software, facilities, hiring, nutrition, compliance, and documentation.",
      "I run it lean: one operator using AI as a force-multiplier to do the work of a team. Across 8 centres I own six operating domains — technology, facilities, people, nutrition, documentation, and finance.",
    ],
    contributions: [
      "Owned 6 operating domains across 8 centres: technology, facilities, people, nutrition, documentation, finance.",
      "Rolled out Illumine (attendance, billing, parent comms, records) and CCTV across all centres; set up centres in person — custom furniture via carpenters, civil work, layout and safety.",
      "Hired and onboarded centre heads, teachers, nurses and cleaners; stood up a nutrition programme with onboarded nutritionists.",
      "Produced a 12-document branded handbook & SOP suite and automated IDIGI invoicing — using AI as a force-multiplier to do the work of a team.",
    ],
    outcomes: [],
    metrics: [
      { value: "8", label: "centres operated", source: "published" },
      { value: "6", label: "operating domains owned", source: "published" },
      { value: "12", label: "handbook & SOP documents produced", source: "published" },
    ],
    proof: [
      {
        type: "pdf",
        status: "available",
        title: "Operations case study (PDF)",
        url: "/work/tot-schools/TOT-Schools-Operations-Case-Study.pdf",
        note: "How one operator runs a multi-centre childcare chain, AI-first.",
      },
    ],
    tags: ["Operations", "AI-First", "People & Hiring", "SOPs"],
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
        status: "available",
        title: "Apollo Hospitals research note (PDF)",
        url: "/work/hdfc-bank/Apollo-Hospitals-Research-Note-Aug-2025.pdf",
        note: "Company research note, August 2025.",
      },
      {
        type: "pdf",
        status: "available",
        title: "HNI portfolio allocation review (PDF)",
        url: "/work/hdfc-bank/HNI-Portfolio-Allocation-Review.pdf",
        note: "Asset-allocation review for an HNI portfolio.",
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
        status: "available",
        title: "Development feasibility memo (PDF)",
        url: "/work/tarc/Development-Feasibility-Memo-2025.pdf",
        note: "Feasibility memo for a prospective development, 2025.",
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
        status: "available",
        title: "Field research brief (PDF)",
        url: "/work/project-nidaan/Project-Nidaan-Field-Research-Brief.pdf",
        note: "Findings from 50+ delivery-worker interviews.",
      },
      {
        type: "file",
        status: "available",
        title: "KPI dashboard (Excel)",
        url: "/work/project-nidaan/Project-Nidaan-KPI-Dashboard.xlsx",
        note: "Delivery-performance and program-outcome tracker.",
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
      {
        type: "pdf",
        status: "available",
        title: "Marketplace one-pager (PDF)",
        url: "/work/finer-things-club/Finer-Things-Marketplace-One-Pager.pdf",
        note: "Overview of the artisan-commerce initiative.",
      },
    ],
    tags: ["Founder", "Commerce", "Partnerships"],
  },
  {
    slug: "straypaw",
    title: "StrayPaw",
    role: "Founder",
    category: "Social Impact",
    location: "India",
    period: "2026 — Present",
    impact: 5,
    recency: 2026,
    relevance: 6,
    featured: false,
    summary:
      "A side project for street-animal welfare — partnering with NGOs and onboarding an early user base.",
    context: [
      "StrayPaw is a side project I'm building for street-animal welfare, partnering with NGOs and growing an early user base.",
    ],
    contributions: [
      "Partnering with NGOs to support street-animal welfare on the ground.",
      "Building the product and onboarding early users.",
    ],
    outcomes: [],
    metrics: [],
    proof: [
      {
        type: "live",
        status: "available",
        title: "Visit StrayPaw",
        url: "https://straypaw.kapoorjay.com",
        note: "Live — onboarding users now.",
      },
    ],
    tags: ["Founder", "Side Project", "Social Impact", "NGO Partnerships"],
  },
  {
    slug: "apodaca-lab",
    title: "Apodaca Lab",
    role: "Research Assistant",
    category: "Research",
    location: "University of Pittsburgh",
    period: "Jan 2025 — Present",
    impact: 6,
    recency: 2026,
    relevance: 6,
    featured: false,
    summary:
      "Cell-biology research in the Apodaca Lab (Dept. of Medicine, Pitt) — epithelial / urothelial physiology in rat models, bench work bridging mechanisms to clinical outcomes.",
    context: [
      "The Apodaca Lab (PI: Gerard Apodaca, Department of Medicine) studies urothelial biology and lower-urinary-tract function — mechanotransduction, membrane trafficking, and epithelial physiology — using rat epithelial models.",
      "I run bench experiments and the analysis behind them, thinking translationally about how fundamental mechanisms connect to clinical outcomes and evidence-based care.",
    ],
    contributions: [
      "Ran 30+ epithelial / tissue assays on rat models — sample prep, immunofluorescence and confocal microscopy, and Western blots — probing transport and membrane trafficking.",
      "Standardized experimental protocols across the lab, improving reproducibility ~20%.",
      "Analyzed imaging and transport data (ImageJ, GraphPad Prism, Excel) and contributed figures toward lab publications and grant submissions.",
      "Built automated Excel templates that cut data-processing time ~40%; kept rigorous documentation and presented in lab meetings.",
    ],
    outcomes: [],
    metrics: [
      { value: "30+", label: "assays on rat epithelial models", source: "resume" },
      { value: "~20%", label: "reproducibility improvement", source: "resume" },
      { value: "~40%", label: "faster data processing", source: "resume" },
    ],
    proof: [],
    tags: ["Cell Biology", "Microscopy", "Wet Lab", "Data Analysis"],
  },
  {
    slug: "pitt-sociology",
    title: "Pitt Sociology",
    role: "Research Assistant",
    category: "Research",
    location: "University of Pittsburgh",
    period: "Aug 2024 — Present",
    impact: 5,
    recency: 2026,
    relevance: 6,
    featured: false,
    summary:
      "Social-science research in Pitt's Department of Sociology — literature review, survey data, and analysis in R and Stata.",
    context: [
      "In the University of Pittsburgh Department of Sociology, I work across the research lifecycle — literature review, data collection and cleaning, coding, analysis, and dissemination.",
      "The role is about turning findings into accessible insight, and seeing how research can influence policy and institutions beyond individual-level interventions.",
    ],
    contributions: [
      "Reviewed and synthesized 100+ academic sources to frame ongoing studies.",
      "Cleaned and analyzed survey and observational datasets in R, Stata, and Excel; supported coding and interpretation.",
      "Supported survey design and research administration / project coordination.",
      "Ran digital outreach for 10+ research workshops and prepared materials for presentations.",
    ],
    outcomes: [],
    metrics: [
      { value: "100+", label: "academic sources reviewed", source: "estimated" },
      { value: "10+", label: "research workshops supported", source: "resume" },
    ],
    proof: [],
    tags: ["Social Science", "R / Stata", "Survey Design", "Academic Writing"],
  },
  {
    slug: "upmc-emergency-medicine",
    title: "UPMC Emergency Medicine",
    role: "Research Assistant",
    category: "Research",
    location: "UPMC · Pittsburgh, PA",
    period: "Aug 2024 — Jan 2025",
    impact: 5,
    recency: 2025,
    relevance: 6,
    featured: false,
    summary:
      "Clinical research in UPMC Emergency Medicine — IRB-approved chart review, REDCap data, and study operations in a fast-paced ED.",
    context: [
      "At UPMC I supported clinical research in the Emergency Medicine department, working with physicians and clinical teams in a fast-paced environment.",
      "It showed me how research translates directly into patient-care decisions and healthcare delivery.",
    ],
    contributions: [
      "Ran a retrospective chart review of 200+ trauma / emergency case records, extracting and coding data in REDCap and Excel.",
      "Supported an IRB-approved study — patient recruitment, participant communication, and records compliance (human-subjects research).",
      "Synthesized patient-outcome and operational data to inform emergency-care protocol and readmission analyses.",
      "Coordinated across disciplines with clinical teams, building data-integrity practice.",
    ],
    outcomes: [],
    metrics: [
      { value: "200+", label: "case records reviewed (REDCap)", source: "resume" },
      { value: "IRB", label: "human-subjects study", source: "resume" },
    ],
    proof: [],
    tags: ["Clinical Research", "REDCap", "Chart Review", "Human Subjects"],
  },
];
