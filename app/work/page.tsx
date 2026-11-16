import type { Metadata } from "next";
import { WorkRow } from "@/components/WorkRow";
import { byGroup, items, slug } from "@/content/work";

export const metadata: Metadata = {
  title: "All work",
  description:
    "Everything Jay Kapoor has started, worked on, researched, written and built, in one numbered list.",
};

/** What each part of the index holds, in one line. */
const intro: Record<string, string> = {
  Startups: "Companies I started.",
  Experience: "Places I have worked.",
  Research: "Labs, and research of my own.",
  Writing: "Papers, memos and market research.",
  Projects: "Tools I built on my own.",
  Play: "Games and toys.",
};

/** The complete index: every entry on the site, numbered, with its picture. */
export default function WorkIndex() {
  let n = 0;
  return (
    <div className="col pt-4 md:pt-8">
      <header>
        <h1 className="display text-[clamp(38px,6.4vw,54px)]">All work</h1>
        <p className="mt-3 max-w-[540px] text-[16px] leading-[1.6] text-muted">
          Everything I have started, worked on, researched, written and built:{" "}
          {items.length} entries. Each one opens a case study, the document
          itself or the live site.
        </p>
        <nav aria-label="Parts of the index" className="mt-6">
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-[14px]">
            {byGroup.map(({ group, items: list }) => (
              <li key={group}>
                <a href={`#${slug(group)}`} className="link text-muted hover:text-fg">
                  {group}{" "}
                  <span className="font-mono text-[11.5px] tabular-nums text-faint">
                    {list.length}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {byGroup.map(({ group, items: list }) => (
        <section
          key={group}
          id={slug(group)}
          aria-labelledby={`${slug(group)}-h`}
          className="mt-14 scroll-mt-6"
        >
          <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
            <h2 id={`${slug(group)}-h`} className="label text-muted">
              {group}
            </h2>
            <p className="text-[13px] text-faint">{intro[group]}</p>
          </div>
          <ol>
            {list.map((it) => {
              n += 1;
              return (
                <li key={it.id} className="border-b border-line">
                  <WorkRow
                    row={{
                      n,
                      name: it.name,
                      line: it.line,
                      meta: it.meta,
                      years: it.years,
                      status: it.status,
                      image: it.image,
                      logo: it.logo,
                      href: it.href,
                      external: it.external,
                      vt: it.href.startsWith("/work/") ? it.id : undefined,
                    }}
                  />
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}
