import Link from "next/link";
import type { WorkItem } from "@/content/types";
import { ProofTags } from "./Proof";

export function WorkCard({ item, index }: { item: WorkItem; index: number }) {
  return (
    <Link
      href={`/work/${item.slug}`}
      className="group block border-t border-line py-8 transition-colors duration-300 hover:bg-line/30"
    >
      <div className="shell flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between">
        <div className="flex items-baseline gap-5">
          <span className="font-mono text-sm text-accent">
            [{String(index + 1).padStart(2, "0")}]
          </span>
          <div>
            <h3 className="display text-3xl lowercase leading-tight tracking-tighter2 transition-transform duration-300 ease-out-expo group-hover:translate-x-1 sm:text-4xl">
              {item.title}
            </h3>
            <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted">
              {item.role} · {item.category}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:items-end">
          <span className="max-w-md text-sm text-muted md:text-right">
            {item.summary}
          </span>
          <div className="flex items-center gap-3 font-mono text-xs text-muted">
            <span>{item.period}</span>
            {item.proof.length > 0 && (
              <>
                <span aria-hidden>·</span>
                <ProofTags proof={item.proof} />
              </>
            )}
            <span aria-hidden>·</span>
            <span
              aria-hidden
              className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1 group-hover:text-accent"
            >
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
