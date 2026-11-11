import type { Metadata } from "next";
import { Projects } from "@/components/home/Projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Tools and browser games by Jay Kapoor, all playable.",
};

export default function Page() {
  return (
    <div className="pt-[84px] md:pt-24">
      <Projects />
    </div>
  );
}
