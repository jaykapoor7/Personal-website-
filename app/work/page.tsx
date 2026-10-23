import type { Metadata } from "next";
import { ProjectBrowser } from "@/components/ProjectBrowser";
import { Reveal } from "@/components/motion";
import { PageHeader } from "@/components/ui";
import { projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Companies Jay Kapoor started, places he worked, research, side projects and games.",
};

export default function Work() {
  return (
    <div className="bg-mesh">
      <PageHeader
        title="Work"
        lede="Everything I've started, worked on and built, sorted into shelves. Every tab shows the real thing."
      />
      <section className="shell">
        <Reveal>
          <ProjectBrowser
            items={projects}
            groups={["started", "worked", "research", "side", "game"]}
          />
        </Reveal>
      </section>
    </div>
  );
}
