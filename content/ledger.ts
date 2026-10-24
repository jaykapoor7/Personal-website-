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
  /** When it resolves, for open calls. */
  due?: string;
}

export interface CoverageItem {
  id: string;
  company: string;
  tag: string;
  verdict: Verdict;
}

export const ledger = {
  intro: "Dated forecasts, probabilities, and outcomes.",
  calls: [
    {
      prediction: "Groww lists in its 2025 IPO above a $7B valuation.",
      detail: "Called Oct 2025, Listed 12 Nov 2025 at a ~$9B market cap.",
      conviction: 70,
      result: "HIT",
    },
    {
      prediction:
        "OpenEvidence raises at a $10B+ valuation within 12 months of its first priced round.",
      detail: "Called Jul 2025, $12B Series D (Thrive / DST), Jan 2026.",
      conviction: 55,
      result: "HIT",
    },
    {
      prediction:
        "CRED's next priced round is a down round below its $6.4B mark.",
      detail: "Called Mar 2025, $3.5B Series G led by GIC, Jun 2025.",
      conviction: 65,
      result: "HIT",
    },
    {
      prediction:
        "PharmEasy (API Holdings) files a DRHP and revives its IPO during 2025.",
      detail:
        "Called Jan 2025, No filing; restructuring toward FY27 breakeven continued.",
      conviction: 35,
      result: "MISS",
    },
    {
      prediction:
        "MediBuddy reports a profitable full-year FY26 when annual results are filed.",
      detail: "Called Jun 2026",
      conviction: 65,
      result: "OPEN",
      due: "FY26 results",
    },
    {
      prediction:
        "India sees its first generic semaglutide (GLP-1) launch in 2026 after the patent cliff.",
      detail: "Called Jun 2026",
      conviction: 75,
      result: "OPEN",
      due: "Dec 2026",
    },
    {
      prediction: "PharmEasy does NOT file an IPO/DRHP in 2026.",
      detail: "Called Jun 2026",
      conviction: 70,
      result: "OPEN",
      due: "Dec 2026",
    },
    {
      prediction:
        "Abridge is reported at, or raises at, an $8B+ valuation by year-end 2026.",
      detail: "Called Jun 2026",
      conviction: 55,
      result: "OPEN",
      due: "Dec 2026",
    },
    {
      prediction:
        "Healthify states its GLP-1 patient-support program is >25% of paid revenue by year-end 2026.",
      detail: "Called Jun 2026",
      conviction: 50,
      result: "OPEN",
      due: "Dec 2026",
    },
    {
      prediction:
        "Groww's market cap stays above $7B through end-2026 despite F&O regulation pressure.",
      detail: "Called Jun 2026",
      conviction: 60,
      result: "OPEN",
      due: "Dec 2026",
    },
    {
      prediction:
        "Tata 1mg closes its reported ~$200M round at a flat-to-up valuation (≥$1.25B).",
      detail: "Called Jun 2026",
      conviction: 40,
      result: "OPEN",
      due: "Open-ended",
    },
    {
      prediction: "CRED does NOT post a profitable full-year FY26.",
      detail: "Called Jun 2026",
      conviction: 55,
      result: "OPEN",
      due: "FY26 results",
    },
    {
      prediction:
        "Epic ships or announces a native competitor to ambient-scribe / clinical-search incumbents by end-2026.",
      detail: "Called Jun 2026",
      conviction: 45,
      result: "OPEN",
      due: "Dec 2026",
    },
    {
      prediction: "OpenEvidence raises again at a $20B+ valuation by Q1 2027.",
      detail: "Called Jun 2026",
      conviction: 45,
      result: "OPEN",
      due: "Mar 2027",
    },
    {
      prediction: "Qure.ai closes a Series E of $70M+ by mid-2027.",
      detail: "Called Jun 2026",
      conviction: 45,
      result: "OPEN",
      due: "Jun 2027",
    },
    {
      prediction:
        "PhonePe lists on Indian exchanges before its SEBI approval lapses in July 2027.",
      detail:
        "Called Oct 2026. SEBI approved the offer in Jan 2026 (valid 18 months); the listing was paused in March.",
      conviction: 55,
      result: "OPEN",
      due: "Jul 2027",
    },
    {
      prediction: "Zepto lists on Indian exchanges by 30 June 2027.",
      detail:
        "Called Oct 2026. Updated DRHP filed June 2026; IPO paused in July with FY26 losses of about Rs 5,900 crore.",
      conviction: 45,
      result: "OPEN",
      due: "Jun 2027",
    },
    {
      prediction:
        "UPI processes 30 billion+ transactions in a single month before the end of 2027.",
      detail:
        "Called Oct 2026. Record so far is 24.5B (Aug 2026), growing about 23% a year.",
      conviction: 70,
      result: "OPEN",
      due: "Dec 2027",
    },
    {
      prediction:
        "UPI averages 1 billion+ transactions a day across a full calendar month before the end of 2027.",
      detail: "Called Oct 2026. September 2026 averaged about 802M a day.",
      conviction: 45,
      result: "OPEN",
      due: "Dec 2027",
    },
    {
      prediction:
        "Generic semaglutide passes 50% of India's semaglutide market by value before the end of 2027.",
      detail:
        "Called Oct 2026. Generics launched 20 Mar 2026 and hold about 30% six months in.",
      conviction: 55,
      result: "OPEN",
      due: "Dec 2027",
    },
    {
      prediction:
        "Novo Nordisk cuts Ozempic's Indian starting price below Rs 4,500 a month before the end of 2027.",
      detail:
        "Called Oct 2026. Cut once in April 2026 to about Rs 5,660 as generics launched from Rs 1,300.",
      conviction: 40,
      result: "OPEN",
      due: "Dec 2027",
    },
  ] as LedgerCall[],
  scoring:
    "Hit rate counts resolved calls (a partial counts as a half). The Brier score measures calibration, the squared distance between the stated probability and the outcome, where lower is better and a coin-flip scores 0.25. The resolved calls so far score well below that.",
  coverage: [
    {
      id: "JK-2026-001",
      company: "Abridge",
      tag: "Ambient AI, Clinical Documentation",
      verdict: "BUY",
    },
    {
      id: "JK-2026-002",
      company: "OpenEvidence",
      tag: "Clinical AI, Point-of-care search",
      verdict: "PASS",
    },
    {
      id: "JK-2026-003",
      company: "Qure.ai",
      tag: "AI Diagnostics, Medical Imaging",
      verdict: "BUY",
    },
    {
      id: "JK-2026-004",
      company: "MediBuddy",
      tag: "Digital Health, B2B2C",
      verdict: "BUY",
    },
    {
      id: "JK-2026-005",
      company: "Tata 1mg",
      tag: "E-pharmacy, Diagnostics",
      verdict: "HOLD",
    },
    {
      id: "JK-2026-006",
      company: "Healthify (HealthifyMe)",
      tag: "AI Wellness, GLP-1 patient support",
      verdict: "WATCH",
    },
    {
      id: "JK-2026-007",
      company: "PharmEasy (API Holdings)",
      tag: "E-pharmacy, Turnaround",
      verdict: "PASS",
    },
    {
      id: "JK-2026-008",
      company: "Groww",
      tag: "Fintech, Retail broking (public)",
      verdict: "HOLD",
    },
    {
      id: "JK-2026-009",
      company: "CRED",
      tag: "Fintech, Affluent consumer",
      verdict: "WATCH",
    },
    {
      id: "JK-2026-010",
      company: "Innovaccer",
      tag: "Healthcare data, Agentic AI",
      verdict: "HOLD",
    },
  ] as CoverageItem[],
  disclaimer:
    "For research and discussion only. Nothing here is investment advice, a solicitation, or a recommendation to buy or sell any security; figures are drawn from public reporting that may be incomplete or out of date. The author is not a registered investment adviser. © 2026 Jay Kapoor.",
};

/** Scored only on resolved calls; open calls count toward the total. */
const resolved = ledger.calls.filter((c) => c.result !== "OPEN");
const hits = resolved.filter((c) => c.result === "HIT").length;
const brier =
  resolved.reduce(
    (sum, c) => sum + (c.conviction / 100 - (c.result === "HIT" ? 1 : 0)) ** 2,
    0,
  ) / resolved.length;

export const ledgerStats = {
  calls: ledger.calls.length,
  open: ledger.calls.length - resolved.length,
  resolved: resolved.length,
  hits,
  hitRate: Math.round((hits / resolved.length) * 100),
  brier: brier.toFixed(3),
  avgConviction: Math.round(
    ledger.calls.reduce((s, c) => s + c.conviction, 0) / ledger.calls.length,
  ),
};
