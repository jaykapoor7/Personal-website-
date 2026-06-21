import type { WritingItem } from "./types";

// Research, publications, and venture-style writing. Same proof discipline:
// real artifacts link out; everything else is an explicit "coming_soon" slot.
export const writing: WritingItem[] = [
  {
    slug: "india-healthtech-market-map",
    title: "India HealthTech Market Map",
    kind: "Research",
    year: "2025",
    recency: 2025,
    summary:
      "Mapped Indian health-tech companies across nine sectors — telemedicine, diagnostics, pharmacy, AI healthcare, insurance, rural health, mental health, women's health, and hospital infrastructure — into an ecosystem landscape of positioning, funding, stage, investors, and competitive edge.",
    metrics: [
      { value: "36", label: "companies mapped", source: "published" },
      { value: "9", label: "sectors covered", source: "published" },
    ],
    proof: [
      {
        type: "pdf",
        status: "available",
        title: "Market map (PDF)",
        url: "/research/India-HealthTech-Market-Map.pdf",
        note: "Ecosystem landscape grouped by sector.",
      },
      {
        type: "file",
        status: "available",
        title: "Raw dataset (CSV)",
        url: "/research/India-HealthTech-Companies.csv",
        note: "Positioning, funding, stage, investors, and edge for each company.",
      },
    ],
  },
  {
    slug: "investment-memo-series",
    title: "The Memo Library & Ledger",
    kind: "Memo series",
    year: "2025 — Present",
    recency: 2026,
    summary:
      "Ten investment memos on healthcare and fintech companies across India and global markets — each a dated thesis, versioned over time, and scored against what actually happens. A calibration ledger attaches a conviction level and resolution date to every call.",
    metrics: [
      { value: "10", label: "investment memos", source: "published" },
      { value: "15", label: "calls tracked (11 open · 4 resolved)", source: "published" },
      { value: "75%", label: "hit rate on resolved calls", source: "published" },
      { value: "0.134", label: "avg Brier score (lower is better)", source: "published" },
    ],
    proof: [
      {
        type: "live",
        status: "available",
        title: "Live calibration ledger",
        url: "/ledger",
        note: "15 dated calls, scored — 75% hit rate.",
      },
      {
        type: "pdf",
        status: "available",
        title: "The Memo Library & Ledger (PDF)",
        url: "/research/Memo-Library-and-Ledger.pdf",
        note: "Ten memos plus the calibration ledger.",
      },
      {
        type: "pdf",
        status: "available",
        title: "Sample memo — Qure.ai (PDF)",
        url: "/research/Qure-AI-Investment-Memo.pdf",
        note: "A single full investment memo on Qure.ai (radiology AI).",
      },
    ],
  },
  {
    slug: "india-glp1-sector-thesis",
    title: "India's GLP-1 Inflection",
    kind: "Research",
    year: "2026",
    recency: 2026,
    summary:
      "A top-down sector thesis on India's metabolic-health wave after the March 2026 semaglutide patent cliff — arguing the durable value sits around the molecule (adherence, patient data, pen manufacturing), not in the commoditising generic drug.",
    metrics: [
      { value: "~$1B", label: "domestic TAM", source: "published" },
      { value: "~34%", label: "India CAGR to 2030", source: "published" },
      { value: "50+", label: "generic brands at launch", source: "published" },
    ],
    proof: [
      {
        type: "pdf",
        status: "available",
        title: "India's GLP-1 Inflection (PDF)",
        url: "/research/India-GLP1-Sector-Thesis.pdf",
        note: "Top-down value-capture analysis, layer by layer.",
      },
    ],
  },
  {
    slug: "india-fintech-sector-thesis",
    title: "India's Retail-Investing Reset",
    kind: "Research",
    year: "2026",
    recency: 2026,
    summary:
      "A top-down thesis on the next phase of Indian fintech: SEBI's F&O clampdown and the maxing-out of the broking model push value from the commoditising trade to the durable relationship — advice, wealth, and engagement (AUM over per-trade revenue).",
    metrics: [
      { value: "91%", label: "of F&O traders lost money (FY25)", source: "published" },
      { value: "~21 cr", label: "demat accounts, only ~4.8 cr active", source: "published" },
      { value: "~₹80 L cr", label: "mutual-fund AUM", source: "published" },
    ],
    proof: [
      {
        type: "pdf",
        status: "available",
        title: "India's Retail-Investing Reset (PDF)",
        url: "/research/India-Fintech-Sector-Thesis.pdf",
        note: "Top-down thesis — trade to advice, layer by layer.",
      },
    ],
  },
  {
    slug: "healthcare-accessibility-ijedr",
    title:
      "Juno AI: A Retrieval-Grounded Conversational Platform for Equitable Healthcare Information Access",
    kind: "Publication",
    year: "2022",
    recency: 2022,
    summary:
      "A research paper presenting Juno AI — combining a large language model with retrieval-augmented generation over a curated corpus of authoritative sources, so health guidance stays grounded in vetted content for users in low-resource, low-literacy settings.",
    proof: [
      {
        type: "pdf",
        status: "available",
        title: "Read the paper (PDF)",
        url: "/work/juno-ai/Juno-AI-Research-Paper.pdf",
        note: "Published in the Int'l Journal of Engineering Development & Research (IJEDR).",
      },
    ],
  },
  {
    slug: "building-in-public",
    title: "Building in Public",
    kind: "Building in public",
    year: "Ongoing",
    recency: 2026,
    summary:
      "Documenting the Juno ADHD OS build and other experiments openly at @jaybuildsvx.",
    proof: [
      {
        type: "social",
        status: "available",
        title: "@jaybuildsvx on X",
        url: "https://x.com/jaybuildsvx",
        note: "Live feed of the work.",
      },
    ],
  },
];
