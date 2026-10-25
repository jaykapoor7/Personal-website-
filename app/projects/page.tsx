import type { Metadata } from "next";
import { BuildsBrowser } from "@/components/BuildsBrowser";
import { Reveal } from "@/components/motion";
import { PageHead } from "@/components/PageHead";

export const metadata: Metadata = {
  title: "Projects",
  description: "Tools and browser games by Jay Kapoor, playable in place.",
};

export default function Page() {
  return (
    <>
      <PageHead
        kicker="Tools and games"
        title="Projects"
        aside="Three tools and three browser games, each playable on this page."
      />
      <Reveal className="shell mt-12">
        <BuildsBrowser />
      </Reveal>
    </>
  );
}
