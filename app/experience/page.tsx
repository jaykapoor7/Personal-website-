import type { Metadata } from "next";
import { Arrow } from "@/components/Arrow";
import { Reveal } from "@/components/motion";
import { Timeline } from "@/components/Timeline";
import { PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Everything Jay Kapoor has started, worked on, researched and studied, on one timeline.",
};

export default function Experience() {
  return (
    <div className="bg-dots">
      <PageHeader
        title="Experience"
        lede="Seven years on one line. Tap anything to see what came out of it."
      >
        <a
          href="/jay-kapoor-resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="btn-primary mt-8"
        >
          Resume <Arrow />
        </a>
      </PageHeader>
      <section className="shell">
        <Reveal>
          <Timeline />
        </Reveal>
      </section>
    </div>
  );
}
