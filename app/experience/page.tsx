import type { Metadata } from "next";
import { Experience } from "@/components/home/Experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Where Jay Kapoor has worked: TARC, TOT Schools, Crowwd and HDFC Bank.",
};

export default function Page() {
  return (
    <div className="pt-[84px] md:pt-24">
      <Experience />
    </div>
  );
}
