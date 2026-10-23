import type { Metadata } from "next";
import { ProjectBrowser } from "@/components/ProjectBrowser";
import { Reveal } from "@/components/motion";
import { PageHeader } from "@/components/ui";
import { projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Play",
  description:
    "Browser games and side projects by Jay Kapoor. Play them right here.",
};

export default function Play() {
  return (
    <div className="bg-mesh">
      <PageHeader
        title="Play"
        lede="Games and weekend projects. Hit play and they run right here."
      />
      <section className="shell">
        <Reveal>
          <ProjectBrowser items={projects} groups={["game", "side"]} />
        </Reveal>
      </section>
    </div>
  );
}
