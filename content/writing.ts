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
      "Mapped 50+ Indian health tech startups across 8 sectors and published an ecosystem landscape on market trends, funding activity, and investment opportunities.",
    metrics: [
      { value: "50+", label: "startups mapped", source: "published" },
      { value: "8", label: "sectors covered", source: "published" },
    ],
    proof: [
      {
        type: "pdf",
        status: "coming_soon",
        title: "Market map (PDF)",
        note: "Published landscape to add.",
      },
      { type: "live", status: "coming_soon", title: "Read online", note: "Link to add." },
    ],
  },
  {
    slug: "investment-memo-series",
    title: "Investment Memo Series",
    kind: "Memo series",
    year: "2025 — Present",
    recency: 2026,
    summary:
      "Venture-style investment theses on Indian health tech and fintech startups, applying market and competitive analysis.",
    proof: [
      {
        type: "pdf",
        status: "coming_soon",
        title: "Sample memo",
        note: "Representative thesis to add.",
      },
    ],
  },
  {
    slug: "healthcare-accessibility-ijedr",
    title: "Healthcare Accessibility Research",
    kind: "Publication",
    year: "2022",
    recency: 2022,
    summary:
      "Ethnographic study on preventive healthcare adoption in rural India, published in the Int'l Journal of Engineering Development & Research (IJEDR).",
    proof: [
      {
        type: "pdf",
        status: "coming_soon",
        title: "IJEDR paper",
        note: "Publication link / PDF to add.",
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
