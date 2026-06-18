// Data for the on-site Calibration Ledger (/ledger), transcribed from
// "The Memo Library & Ledger" PDF. Figures reflect public reporting at each
// memo's update date; see the disclaimer on the page.

export type CallResult = "HIT" | "MISS" | "OPEN";
export type Verdict = "BUY" | "HOLD" | "WATCH" | "PASS";

export interface LedgerCall {
  prediction: string;
  /** When called + how it resolved (resolved calls only). */
  detail: string;
  /** Stated conviction at call time, percent. */
  conviction: number;
  result: CallResult;
}

export interface CoverageItem {
  id: string;
  company: string;
  tag: string;
  verdict: Verdict;
}

export const ledger = {
  intro:
    "Anyone can write a confident memo. The harder thing is to date the call, attach a probability, and let reality grade it. Every prediction below carries a conviction level and a resolution date.",
  stats: [
    { value: "15", label: "calls tracked", source: "published" as const },
    { value: "75%", label: "hit rate on resolved calls", source: "published" as const },
    { value: "0.134", label: "avg Brier score (lower is better)", source: "published" as const },
    { value: "55%", label: "avg conviction", source: "published" as const },
  ],
  calls: [
    { prediction: "Groww lists in its 2025 IPO above a $7B valuation.", detail: "Called Oct 2025 · Listed 12 Nov 2025 at a ~$9B market cap.", conviction: 70, result: "HIT" },
    { prediction: "OpenEvidence raises at a $10B+ valuation within 12 months of its first priced round.", detail: "Called Jul 2025 · $12B Series D (Thrive / DST), Jan 2026.", conviction: 55, result: "HIT" },
    { prediction: "CRED's next priced round is a down round below its $6.4B mark.", detail: "Called Mar 2025 · $3.5B Series G led by GIC, Jun 2025.", conviction: 65, result: "HIT" },
    { prediction: "PharmEasy (API Holdings) files a DRHP and revives its IPO during 2025.", detail: "Called Jan 2025 · No filing; restructuring toward FY27 breakeven continued.", conviction: 35, result: "MISS" },
    { prediction: "MediBuddy reports a profitable full-year FY26 when annual results are filed.", detail: "Called Jun 2026", conviction: 65, result: "OPEN" },
    { prediction: "India sees its first generic semaglutide (GLP-1) launch in 2026 after the patent cliff.", detail: "Called Jun 2026", conviction: 75, result: "OPEN" },
    { prediction: "PharmEasy does NOT file an IPO/DRHP in 2026.", detail: "Called Jun 2026", conviction: 70, result: "OPEN" },
    { prediction: "Abridge is reported at, or raises at, an $8B+ valuation by year-end 2026.", detail: "Called Jun 2026", conviction: 55, result: "OPEN" },
    { prediction: "Healthify states its GLP-1 patient-support program is >25% of paid revenue by year-end 2026.", detail: "Called Jun 2026", conviction: 50, result: "OPEN" },
    { prediction: "Groww's market cap stays above $7B through end-2026 despite F&O regulation pressure.", detail: "Called Jun 2026", conviction: 60, result: "OPEN" },
    { prediction: "Tata 1mg closes its reported ~$200M round at a flat-to-up valuation (≥$1.25B).", detail: "Called Jun 2026", conviction: 40, result: "OPEN" },
    { prediction: "CRED does NOT post a profitable full-year FY26.", detail: "Called Jun 2026", conviction: 55, result: "OPEN" },
    { prediction: "Epic ships or announces a native competitor to ambient-scribe / clinical-search incumbents by end-2026.", detail: "Called Jun 2026", conviction: 45, result: "OPEN" },
    { prediction: "OpenEvidence raises again at a $20B+ valuation by Q1 2027.", detail: "Called Jun 2026", conviction: 45, result: "OPEN" },
    { prediction: "Qure.ai closes a Series E of $70M+ by mid-2027.", detail: "Called Jun 2026", conviction: 45, result: "OPEN" },
  ] as LedgerCall[],
  scoring:
    "Hit rate counts resolved calls (a partial counts as a half). The Brier score measures calibration — the squared distance between the stated probability and the outcome, where lower is better and a coin-flip scores 0.25. At 0.134 across the book, the calls are meaningfully better-calibrated than chance.",
  coverage: [
    { id: "JK-2026-001", company: "Abridge", tag: "Ambient AI · Clinical Documentation", verdict: "BUY" },
    { id: "JK-2026-002", company: "OpenEvidence", tag: "Clinical AI · Point-of-care search", verdict: "PASS" },
    { id: "JK-2026-003", company: "Qure.ai", tag: "AI Diagnostics · Medical Imaging", verdict: "BUY" },
    { id: "JK-2026-004", company: "MediBuddy", tag: "Digital Health · B2B2C", verdict: "BUY" },
    { id: "JK-2026-005", company: "Tata 1mg", tag: "E-pharmacy · Diagnostics", verdict: "HOLD" },
    { id: "JK-2026-006", company: "Healthify (HealthifyMe)", tag: "AI Wellness · GLP-1 patient support", verdict: "WATCH" },
    { id: "JK-2026-007", company: "PharmEasy (API Holdings)", tag: "E-pharmacy · Turnaround", verdict: "PASS" },
    { id: "JK-2026-008", company: "Groww", tag: "Fintech · Retail broking (public)", verdict: "HOLD" },
    { id: "JK-2026-009", company: "CRED", tag: "Fintech · Affluent consumer", verdict: "WATCH" },
    { id: "JK-2026-010", company: "Innovaccer", tag: "Healthcare data · Agentic AI", verdict: "HOLD" },
  ] as CoverageItem[],
  disclaimer:
    "For research and discussion only. Nothing here is investment advice, a solicitation, or a recommendation to buy or sell any security; figures are drawn from public reporting that may be incomplete or out of date. The author is not a registered investment adviser. © 2026 Jay Kapoor.",
};
