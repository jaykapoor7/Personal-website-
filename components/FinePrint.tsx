import { Reveal } from "./motion";
import { SmartLink } from "./ui";
import { education, leadership, otherResearch, skills } from "@/content/site";

/** School, teams I led, smaller research and tools. */
export function FinePrint() {
  return (
    <section aria-label="Fine print" className="shell pt-20">
      <Reveal className="grid gap-10 border-t border-fg pt-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="label">School</p>
          <ul className="mt-4 space-y-4">
            {education.map((e) => (
              <li key={e.school}>
                <p className="text-[17px] font-semibold leading-tight tracking-[-0.02em]">
                  {e.school}
                </p>
                <p className="mt-1 text-[14px] text-muted">{e.detail}</p>
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
                  {e.period}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-2">
          <p className="label">Led</p>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {leadership.map((l) => (
              <li key={l.title + l.org}>
                <p className="text-[17px] font-semibold leading-tight tracking-[-0.02em]">
                  {l.href ? (
                    <SmartLink href={l.href} className="hover:text-accent">
                      {l.org}
                    </SmartLink>
                  ) : (
                    l.org
                  )}
                </p>
                <p className="mt-1 text-[14px] text-muted">
                  {l.title}. {l.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label">Also</p>
          <ul className="mt-4 space-y-4">
            {otherResearch.map((o) => (
              <li key={o.name}>
                <p className="text-[17px] font-semibold leading-tight tracking-[-0.02em]">
                  {o.href ? (
                    <SmartLink href={o.href} className="hover:text-accent">
                      {o.name}
                    </SmartLink>
                  ) : (
                    o.name
                  )}
                </p>
                <p className="mt-1 text-[14px] text-muted">{o.detail}</p>
              </li>
            ))}
          </ul>
          <p className="label mt-8">Tools</p>
          <p className="mt-3 text-[14px] leading-relaxed text-muted">
            {skills.join(", ")}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
