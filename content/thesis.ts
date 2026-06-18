// Content for the Investing Thesis page (/thesis).
// DRAFTED from patterns visible in Jay's own work — the memo verdicts, the
// calibration ledger, and the market-map "competitive edge" notes. These are
// opinions in his voice and meant to be reviewed/edited freely.

export type Verdict = "BUY" | "HOLD" | "WATCH" | "PASS";

export const thesis = {
  intro:
    "A lens, not a list of tips. These are the patterns I keep returning to across the memos — how I decide what's worth backing in health-tech and fintech, mostly across India and the US. Verdicts are moment-in-time; the ledger keeps the conviction honest.",

  lookFor: [
    {
      title: "Distribution decides it",
      body: "In health-tech and fintech the winner is usually whoever reaches users cheapest — owned networks, enterprise channels, cross-sell. I weight distribution and CAC over feature lists.",
    },
    {
      title: "Underwrite the unit economics, not the GMV",
      body: "I reward durable margins over scale bought with cash. PharmEasy's roll-up is the cautionary case; the profitable players are the counter-example.",
    },
    {
      title: "In health AI, clearances are the moat",
      body: "Regulatory approval and clinical validation are harder to copy than models — it's why a cleared diagnostics company screens differently than a wrapper.",
    },
    {
      title: "Embedded beats standalone",
      body: "Products that live inside the clinician or user workflow — and compound data as they run — are stickier than destinations you have to remember to visit.",
    },
    {
      title: "Reach the underserved without burning the model",
      body: "I'm drawn to businesses that extend care or capital to rural and low-resource users while keeping unit economics intact — the problem I worked on directly at Juno.",
    },
    {
      title: "Price is part of the thesis",
      body: "A company I admire can still be a PASS at the wrong valuation. Quality and entry price are separate decisions.",
    },
  ],

  ladder: [
    {
      verdict: "BUY" as Verdict,
      meaning: "A clear distribution or regulatory moat, a credible path to durable economics, and workflow lock-in.",
      examples: "Abridge · Qure.ai · MediBuddy",
    },
    {
      verdict: "HOLD" as Verdict,
      meaning: "A strong asset where price or near-term execution caps the upside.",
      examples: "Tata 1mg · Groww · Innovaccer",
    },
    {
      verdict: "WATCH" as Verdict,
      meaning: "A thesis I find interesting but can't underwrite yet — unproven monetization or a catalyst not in hand.",
      examples: "Healthify · CRED",
    },
    {
      verdict: "PASS" as Verdict,
      meaning: "A company I respect but can't underwrite at the current price or structure.",
      examples: "OpenEvidence · PharmEasy",
    },
  ],

  focus: {
    markets: "India and the US.",
    sectors: [
      "Telemedicine",
      "Diagnostics",
      "E-pharmacy",
      "AI healthcare",
      "Health insurance",
      "Rural healthcare",
      "Mental health",
      "Women's health",
      "Hospital infrastructure",
      "Consumer fintech",
    ],
  },

  principles: [
    {
      title: "Date the call",
      body: "Every prediction gets a probability and a resolution date, then reality grades it. No after-the-fact narrative.",
    },
    {
      title: "Score, don't assert",
      body: "Memos rate five dimensions on a five-point scale, and the calibration ledger (0.134 Brier) keeps conviction from drifting into bravado.",
    },
    {
      title: "Verdicts are moment-in-time",
      body: "Buy / Hold / Watch / Pass describe the call at today's price and moment — not a permanent judgment of the company.",
    },
  ],
};
