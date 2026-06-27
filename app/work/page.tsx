import type { Metadata } from "next";
import { groupedWork } from "@/lib/order";
import { Reveal } from "@/components/Reveal";
import { WorkBrowser } from "@/components/WorkBrowser";
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
        <WorkBrowser groups={groups} />
      </div>
    </>
  );
}
