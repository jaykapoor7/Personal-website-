// Shared content types. One schema, enforced across every domain file
// (work / writing / profile / socials) so components never invent structure.

/**
 * Where a displayed number comes from. Metrics MUST declare a source so the
 * site never presents an unverifiable figure as fact.
 * - "resume"    → stated on the resume
 * - "analytics" → measured (product/site analytics)
 * - "published" → from a published artifact (paper, report, public post)
 * - "estimated" → an honest estimate; label it as such in the UI
 */
export type MetricSource = "resume" | "analytics" | "published" | "estimated";

export interface Metric {
  value: string;
  label: string;
  source: MetricSource;
}

/** Kinds of evidence a recruiter can click through to. */
export type ProofType = "live" | "pdf" | "image" | "social" | "video" | "repo";

/** Whether the proof artifact exists yet. Placeholders are never removed. */
export type ProofStatus = "available" | "coming_soon";

export interface Proof {
  type: ProofType;
  status: ProofStatus;
  title: string;
  /** Present only when status === "available". */
  url?: string;
  /** Optional one-line description shown under the proof title. */
  note?: string;
}

export interface WorkItem {
  slug: string;
  /** Organization or project name. */
  title: string;
  role: string;
  /** Short domain label, e.g. "Fintech", "Healthcare", "AI / Product". */
  category: string;
  location?: string;
  /** Human-readable period, e.g. "May 2025 — May 2026". */
  period: string;

  // --- Ordering signals (NOT chronological) -----------------------------
  // Sort priority is impact → recency → relevance. See lib/order.ts.
  /** 1–10. How significant the work / ownership was. */
  impact: number;
  /** Numeric recency key (end year; "present" → current year). Higher = newer. */
  recency: number;
  /** 1–10. Relevance to the roles this site targets (investing / product). */
  relevance: number;

  featured?: boolean;

  /** One-liner used on cards. */
  summary: string;
  /** Case-study context paragraphs. */
  context: string[];
  /** What I did — verbatim-faithful to the resume. */
  contributions: string[];
  /** Outcomes / results, as prose bullets. */
  outcomes: string[];

  metrics: Metric[];
  proof: Proof[];
  tags: string[];
}

export type WritingKind =
  | "Publication"
  | "Research"
  | "Memo series"
  | "Building in public";

export interface WritingItem {
  slug: string;
  title: string;
  kind: WritingKind;
  /** e.g. "2022", "2025 — Present". */
  year: string;
  /** Numeric recency key for ordering. */
  recency: number;
  summary: string;
  metrics?: Metric[];
  proof: Proof[];
}

export interface EducationEntry {
  school: string;
  credential: string;
  location: string;
  period: string;
}

export interface Profile {
  name: string;
  /** Short positioning line under the name. */
  tagline: string;
  location: string;
  email: string;
  /** A few sentences of bio for the About page. */
  bio: string[];
  education: EducationEntry[];
  skills: {
    technical: string[];
    domain: string[];
  };
  leadership: string[];
  /** Headline stats for the home page (all carry a source). */
  highlights: Metric[];
  /** Path to the resume file in /public. */
  resumeUrl: string;
}

export type SocialType = "email" | "linkedin" | "x" | "youtube" | "github";

export interface Social {
  label: string;
  handle: string;
  url: string;
  type: SocialType;
  /** Whether the destination is live yet. */
  status: ProofStatus;
}
