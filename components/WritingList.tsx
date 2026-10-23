import { SmartLink } from "./ui";
import type { Writing } from "@/content/site";

export function WritingList({ items }: { items: Writing[] }) {
  return (
    <ul className="border-t border-line">
      {items.map((w) => (
        <li
          key={w.title}
          className="grid gap-3 border-b border-line py-6 sm:grid-cols-[100px_1fr_auto] sm:items-start sm:gap-8"
        >
          <span className="chip w-fit">{w.type}</span>
          <div>
            {w.href ? (
              <SmartLink
                href={w.href}
                className="text-lg font-medium leading-snug tracking-tight hover:text-accent"
              >
                {w.title}
              </SmartLink>
            ) : (
              <p className="text-lg font-medium leading-snug tracking-tight">
                {w.title}
              </p>
            )}
            <p className="mt-1 text-[15px] text-muted">{w.description}</p>
          </div>
          <div className="flex items-center gap-4 font-mono text-xs text-faint">
            {w.extra && (
              <SmartLink href={w.extra.href} className="link text-muted">
                {w.extra.label}
              </SmartLink>
            )}
            <span>{w.year}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
