"use client";

import { useState } from "react";
import type { WorkItem } from "@/content/types";
import { Reveal } from "@/components/Reveal";
import { WorkCard } from "@/components/WorkCard";

type Group = { title: string; items: WorkItem[] };

// Filter chips (All + lane) over the grouped work list. Selecting a chip shows
// just that lane; "All" shows every lane with its header.
export function WorkBrowser({ groups }: { groups: Group[] }) {
  const [active, setActive] = useState("All");
  const chips = ["All", ...groups.map((g) => g.title)];
  const shown = active === "All" ? groups : groups.filter((g) => g.title === active);

  return (
    <>
      <div className="shell flex flex-wrap gap-2 pb-2">
        {chips.map((c) => {
          const isActive = c === active;
          const count =
            c === "All"
              ? groups.reduce((n, g) => n + g.items.length, 0)
              : (groups.find((g) => g.title === c)?.items.length ?? 0);
          return (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors duration-200 ${
                isActive
                  ? "border-accent text-accent"
                  : "border-line text-muted hover:border-paper hover:text-paper"
              }`}
            >
              {c === "All" ? "all" : c.toLowerCase()}
              <span className="ml-1.5 text-muted/50">{count}</span>
            </button>
          );
        })}
      </div>

      {shown.map((group) => (
        <section key={group.title} className="pt-8">
          {active === "All" && (
            <Reveal>
              <h2 className="kicker shell mb-1">
                <span className="text-accent">//</span> {group.title.toLowerCase()}
              </h2>
            </Reveal>
          )}
          {group.items.map((item, i) => (
            <WorkCard key={item.slug} item={item} index={i} />
          ))}
          <div className="border-t border-line" />
        </section>
      ))}
    </>
  );
}
