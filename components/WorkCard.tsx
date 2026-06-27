import Link from "next/link";
import type { WorkItem } from "@/content/types";
import { ProofTags } from "./Proof";

// Slim list card — title, role/category, period and proof only. The full
// summary lives on the case-study page (progressive disclosure keeps the list
// scannable).
export function WorkCard({ item, index }: { item: WorkItem; index: number }) {
  return (
    <Link
      href={`/work/${item.slug}`}
      className="group block border-t border-line py-6 transition-colors duration-300 hover:bg-line/30"
    >
      <div className="shell flex items-baseline justify-between gap-6">
        <div className="flex items-baseline gap-4 sm:gap-5">
          <span className="font-mono text-sm text-accent">
            [{String(index + 1).padStart(2, "0")}]
          </span>
          <div>
            <h3 className="display text-2xl lowercase leading-tight tracking-tighter2 transition-transform duration-300 ease-out-expo group-hover:translate-x-1 sm:text-3xl">
              {item.title}
            </h3>
            <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted">
              {item.role} · {item.category}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3 font-mono text-xs text-muted">
          <span className="hidden sm:inline">{item.period}</span>
          {item.proof.length > 0 && (
            <>
              <span aria-hidden className="hidden sm:inline">·</span>
              <ProofTags proof={item.proof} />
            </>
          )}
          <span
            aria-hidden
            className="text-base transition-transform duration-300 ease-out-expo group-hover:translate-x-1 group-hover:text-accent"
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
