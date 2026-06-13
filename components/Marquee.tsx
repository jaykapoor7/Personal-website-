"use client";

// Continuous typographic marquee — a Palmer-style accent strip. The track is
// duplicated so the CSS translateX(-50%) loop is seamless. Pauses for
// reduced-motion users via the global media query.
export function Marquee({ items }: { items: string[] }) {
  const row = (
    <div className="flex shrink-0 items-center gap-10 pr-10" aria-hidden="true">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-10">
          <span className="display text-3xl text-muted sm:text-4xl">{item}</span>
          <span className="text-muted">/</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="hr-line flex overflow-hidden border-b py-6">
      <div className="flex animate-marquee">
        {row}
        {row}
      </div>
      <span className="sr-only">{items.join(", ")}</span>
    </div>
  );
}
