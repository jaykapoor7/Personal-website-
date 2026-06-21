import { ledger, type Verdict } from "@/content/ledger";

// A terminal-style ticker tape sourced from the calibration ledger. Pure CSS
// marquee (reuses the `marquee` keyframe); paused under reduced-motion via the
// global media query. The full text is exposed to screen readers once.
const VERDICT_TONE: Record<Verdict, string> = {
  BUY: "text-accent",
  HOLD: "text-paper",
  WATCH: "text-muted",
  PASS: "text-muted",
};

type Item = { label: string; tag?: string; tone?: string };

const items: Item[] = [
  { label: "HIT RATE", tag: "75%", tone: "text-accent" },
  { label: "BRIER", tag: "0.134", tone: "text-paper" },
  { label: "CALLS TRACKED", tag: "15", tone: "text-paper" },
  { label: "MEMOS", tag: "10", tone: "text-paper" },
  ...ledger.coverage.map((c) => ({
    label: c.company.toUpperCase(),
    tag: c.verdict,
    tone: VERDICT_TONE[c.verdict],
  })),
];

function Track() {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8" aria-hidden>
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-2 whitespace-nowrap text-xs">
          <span className="text-muted">{it.label}</span>
          {it.tag && <span className={it.tone ?? "text-paper"}>{it.tag}</span>}
          <span className="text-muted/40">·</span>
        </span>
      ))}
    </div>
  );
}

export function Ticker() {
  return (
    <div className="hr-line flex items-stretch overflow-hidden border-y font-mono">
      <span className="flex shrink-0 items-center gap-2 border-r border-line bg-ink px-4 text-xs uppercase tracking-widest text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
        Ledger
      </span>
      <div className="flex animate-marquee py-3">
        <Track />
        <Track />
      </div>
      <span className="sr-only">
        Calibration ledger: 75% hit rate, Brier 0.134 across 15 tracked calls.
        Coverage:{" "}
        {ledger.coverage.map((c) => `${c.company} ${c.verdict}`).join(", ")}.
      </span>
    </div>
  );
}
