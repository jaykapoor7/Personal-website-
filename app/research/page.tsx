import type { Metadata } from "next";
import { HealthTechMap } from "@/components/HealthTechMap";
import { ProjectBrowser } from "@/components/ProjectBrowser";
import { Reveal } from "@/components/motion";
import { PageHeader } from "@/components/ui";
import { projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Jay Kapoor's research at Pitt and UPMC, and a dataset of Indian healthtech companies.",
};

export default function Research() {
  return (
    <div className="bg-mesh">
      <PageHeader
        title="Research"
        lede="Labs at Pitt and UPMC, and a dataset I built of India's healthtech companies."
      />
      <section className="shell">
        <Reveal>
          <ProjectBrowser items={projects} groups={["research"]} />
        </Reveal>
      </section>
      <section id="landscape" className="shell pt-20">
        <Reveal>
          <h2 className="display mb-6 text-[clamp(36px,4.5vw,64px)]">
            India healthtech, mapped
          </h2>
          <HealthTechMap />
        </Reveal>
      </section>
    </div>
  );
}
