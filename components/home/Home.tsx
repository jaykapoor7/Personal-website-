import { Link } from "next-view-transitions";
import { selected } from "@/content/cases";
import { experience, items } from "@/content/work";
import { Thumb, WorkRow } from "../WorkRow";
import { About } from "./About";
import { Contact } from "./Contact";
import { Intro } from "./Intro";
import { Line, Section } from "./Section";

const tools = items.filter((i) => i.group === "Projects");
const research = items.filter(
  (i) => i.group === "Research" && i.id !== "straypaw-research-models",
);
const papers = items.filter((i) => i.group === "Writing");

/** The tools in a few words each, for the line under the selected work. */
const also: Record<string, string> = {
  cura: "which explains your Fitbit data as four daily scores",
  "llm-lab": "which scores how well AI search can find and cite a website",
  road360: "which scores a commute on the phone, with nothing sent anywhere",
};

/**
 * The home page reads like a CV that opens into a portfolio: who I am, the
 * work I would show first, where I have worked, what I have written, and the
 * rest of me.
 */
export function Home() {
  return (
    <>
      <Intro />

      <Section
        id="work"
        n="01"
        title="Selected work"
        action={{ label: `All work (${items.length})`, href: "/work/" }}
      >
        <ol>
          {selected.map((c, i) => (
            <li key={c.slug} className="border-b border-line">
              <WorkRow
                big
                row={{
                  n: i + 1,
                  name: c.name,
                  line: c.line,
                  meta: c.role,
                  years: c.years,
                  status: c.status,
                  image: c.image,
                  logo: c.logo,
                  href: `/work/${c.slug}/`,
                  facts: c.metrics.slice(0, 3),
                }}
              />
            </li>
          ))}
        </ol>
        <p className="border-t border-line pt-4 text-[14.5px] leading-relaxed text-muted">
          Also built:{" "}
          {tools.map((t, i) => (
            <span key={t.id}>
              <Link href={t.href} className="link text-fg">
                {t.name}
              </Link>
              , {also[t.id]}
              {i < tools.length - 2 ? "; " : i === tools.length - 2 ? "; and " : "."}
            </span>
          ))}
        </p>
      </Section>

      <Section id="experience" n="02" title="Experience">
        <ul>
          {experience.map((e) => (
            <li key={e.id}>
              <Line name={e.name} detail={e.role} years={e.years} href={e.href} />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="writing" n="03" title="Research and writing">
        <h3 className="label mt-6">Labs</h3>
        <ul className="mt-1">
          {research.map((r) => (
            <li key={r.id}>
              <Line
                name={r.name}
                detail={
                  <>
                    <span className="text-fg/80">{r.meta}.</span> {r.line}
                  </>
                }
                years={r.years}
                href={r.href || undefined}
                external={r.external}
              />
            </li>
          ))}
        </ul>
        <h3 className="label mt-10">Papers, models and memos</h3>
        <ul className="mt-1">
          {[items.find((i) => i.id === "straypaw-research-models")!, ...papers].map(
            (w) => (
              <li key={w.id}>
                <Line
                  name={w.name}
                  detail={
                    <>
                      <span className="text-fg/80">{w.meta}.</span> {w.line}
                    </>
                  }
                  years={w.years}
                  href={w.href}
                  external={w.external}
                  thumb={
                    <Thumb
                      src={w.image}
                      name={w.name}
                      sizes="44px"
                      className="aspect-[3/4] w-[44px] rounded-[3px]"
                    />
                  }
                />
              </li>
            ),
          )}
        </ul>
      </Section>

      <About />
      <Contact />
    </>
  );
}
