import type { Writing } from "@/content/site";
import { Paper } from "./frames";

const tilt = [-7, 4, -3, 6, -5, 3, -4];

/** Real first pages, fanned out like papers on a desk. Hover lifts one. */
export function Shelf({ items }: { items: Writing[] }) {
  const docs = items.filter((w) => w.cover && w.href);
  return (
    <ul className="flex snap-x snap-mandatory items-end gap-5 overflow-x-auto px-5 pb-6 pt-14 [scrollbar-width:none] sm:px-8 lg:justify-center lg:gap-0 lg:overflow-visible [&::-webkit-scrollbar]:hidden">
      {docs.map((w, i) => (
        <li
          key={w.title}
          className="group relative w-[200px] shrink-0 snap-center transition-[margin] duration-500 lg:-mx-6 lg:w-[210px] lg:hover:mx-4"
          style={{ zIndex: i }}
        >
          <a
            href={w.href}
            target="_blank"
            rel="noreferrer"
            className="block transition-transform duration-500 ease-out [transform:rotate(var(--r))] group-focus-within:[transform:translateY(-24px)_scale(1.05)] group-hover:[transform:translateY(-24px)_scale(1.05)]"
            style={
              { "--r": `${tilt[i % tilt.length]}deg` } as React.CSSProperties
            }
          >
            <Paper
              src={w.cover!}
              alt={`First page of ${w.title}`}
              sizes="210px"
            />
          </a>
          <p className="mt-5 text-center text-sm font-medium leading-snug lg:pointer-events-none lg:absolute lg:inset-x-0 lg:top-full lg:opacity-0 lg:transition-opacity lg:duration-300 lg:group-hover:opacity-100">
            {w.title.split(":")[0]}
            <span className="block font-normal text-muted">
              {w.type}, {w.year}
            </span>
          </p>
        </li>
      ))}
    </ul>
  );
}
