import type { Proof, ProofType } from "@/content/types";

// Label + glyph per proof type. UI is rendered dynamically from the schema so
// adding a new artifact is purely a content change.
const TYPE_META: Record<ProofType, { label: string; glyph: string }> = {
  live: { label: "Live", glyph: "↗" },
  pdf: { label: "Document", glyph: "▤" },
  file: { label: "Download", glyph: "↓" },
  image: { label: "Gallery", glyph: "▦" },
  social: { label: "Social", glyph: "✦" },
  video: { label: "Video", glyph: "▷" },
  repo: { label: "Code", glyph: "⌗" },
};

function ProofCard({ proof }: { proof: Proof }) {
  const meta = TYPE_META[proof.type];
  const available = proof.status === "available" && proof.url;

  const inner = (
    <>
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-widest text-muted">
          {meta.label}
        </span>
        <span aria-hidden className="text-muted">
          {available ? meta.glyph : "·"}
        </span>
      </div>
      <p className="mt-3 text-base text-paper">{proof.title}</p>
      {proof.note && <p className="mt-1 text-sm text-muted">{proof.note}</p>}
      <span
        className={`mt-4 inline-block text-xs ${
          available ? "text-paper" : "text-muted"
        }`}
      >
        {available
          ? proof.type === "file"
            ? "Download ↓"
            : "Open ↗"
          : "Coming soon"}
      </span>
    </>
  );

  const base =
    "block rounded-sm border border-line p-5 transition-colors duration-300";

  if (available) {
    // New tab for external links and downloadable docs; same tab for internal pages.
    const external = /^https?:\/\//.test(proof.url || "");
    const isDoc = proof.type === "pdf" || proof.type === "file";
    const newTab = external || isDoc;
    return (
      <a
        href={proof.url}
        target={newTab ? "_blank" : undefined}
        rel="noreferrer"
        className={`${base} hover:border-paper hover:bg-line/40`}
      >
        {inner}
      </a>
    );
  }

  return (
    <div
      className={`${base} border-dashed opacity-70`}
      aria-disabled="true"
      title="Coming soon"
    >
      {inner}
    </div>
  );
}

export function ProofGrid({ proof }: { proof: Proof[] }) {
  if (proof.length === 0) return null;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {proof.map((p, i) => (
        <ProofCard key={i} proof={p} />
      ))}
    </div>
  );
}

/** Compact inline proof indicators for cards. */
export function ProofTags({ proof }: { proof: Proof[] }) {
  if (proof.length === 0) return null;
  const available = proof.filter((p) => p.status === "available").length;
  return (
    <span className="text-xs text-muted">
      {proof.length} {proof.length === 1 ? "item" : "items"}
      {available > 0 && <span className="text-paper"> · {available} live</span>}
    </span>
  );
}
