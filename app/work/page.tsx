import type { Metadata } from "next";
import { orderedWork } from "@/lib/order";
import { Reveal } from "@/components/Reveal";
import { WorkCard } from "@/components/WorkCard";
import { Scramble } from "@/components/Scramble";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work across fintech, healthtech, and investment research — ordered by impact, with the case study and links behind each one.",
};

export default function WorkPage() {
  const items = orderedWork();

  return (
    <>
      <section className="shell pt-20 pb-12 sm:pt-28">
        <Reveal>
          <p className="kicker mb-6">
            <span className="text-accent">&gt;</span> work
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="display max-w-4xl text-4xl leading-tight sm:text-6xl">
            <Scramble text="Everything on my resume, with the work behind it." />
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-muted">
            Ordered by impact, then recency, then relevance — not by date. Open
            any project for the full case study and links.
          </p>
        </Reveal>
      </section>

      <section className="pb-10">
        {items.map((item, i) => (
          <WorkCard key={item.slug} item={item} index={i} />
        ))}
        <div className="border-t border-line" />
      </section>
    </>
  );
}
