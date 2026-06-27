import type { Metadata } from "next";
import { groupedWork } from "@/lib/order";
import { Reveal } from "@/components/Reveal";
import { WorkCard } from "@/components/WorkCard";
import { Scramble } from "@/components/Scramble";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work across fintech, healthtech, and investment research — ordered by impact, with the case study and links behind each one.",
};

export default function WorkPage() {
  const groups = groupedWork();

  return (
    <>
      <section className="shell pt-20 pb-10 sm:pt-28">
        <Reveal>
          <p className="kicker mb-6">
            <span className="text-accent">&gt;</span> work
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="display max-w-4xl text-4xl leading-tight sm:text-6xl">
            <Scramble text="The work behind the resume." />
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-muted">
            Grouped by what it is — open any project for the full case study and
            the proof behind it.
          </p>
        </Reveal>
      </section>

      <div className="pb-10">
        {groups.map((group) => (
          <section key={group.title} className="pt-10">
            <Reveal>
              <h2 className="kicker shell mb-1">
                <span className="text-accent">//</span> {group.title.toLowerCase()}
                <span className="ml-2 text-muted/50">[{group.items.length}]</span>
              </h2>
            </Reveal>
            {group.items.map((item, i) => (
              <WorkCard key={item.slug} item={item} index={i} />
            ))}
            <div className="border-t border-line" />
          </section>
        ))}
      </div>
    </>
  );
}
