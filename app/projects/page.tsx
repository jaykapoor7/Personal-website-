import type { Metadata } from "next";
import { Arrow } from "@/components/Arrow";
import { researchModels } from "@/content/site";
import { BuildsBrowser } from "@/components/BuildsBrowser";
import { Reveal } from "@/components/motion";
import { PageHead } from "@/components/PageHead";

export const metadata: Metadata = {
  title: "Projects",
  description: "Tools, browser games and interactive research by Jay Kapoor.",
};

export default function Page() {
  return (
    <>
      <PageHead
        kicker="Tools and games"
        title="Projects"
        aside="Tools, browser games and interactive public-health research."
      />
      <section aria-label="Featured project" className="shell mt-9">
        <a
          href={researchModels.workPath}
          className="group flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-y border-line py-4"
        >
          <span>
            <strong className="block text-[20px] font-semibold group-hover:text-accent">
              {researchModels.name}
            </strong>
            <span className="block text-[15px] text-muted">{researchModels.detail}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold">
            Open experiments <Arrow />
          </span>
        </a>
      </section>
      <Reveal className="shell mt-8">
        <BuildsBrowser />
      </Reveal>
    </>
  );
}
