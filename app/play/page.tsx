import type { Metadata } from "next";
import { BuildsBrowser } from "@/components/BuildsBrowser";
import { Reveal } from "@/components/motion";
import { PageHead } from "@/components/PageHead";

export const metadata: Metadata = {
  title: "Play",
  description: "Tools and browser games by Jay Kapoor, playable in place.",
};

export default function Page() {
  return (
    <>
      <PageHead
        kicker="Tools and games"
        title="Play"
        aside="Tools I wanted, and games nobody asked for. They all run right here."
      />
      <Reveal className="shell mt-12">
        <BuildsBrowser />
      </Reveal>
    </>
  );
}
