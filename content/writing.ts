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
