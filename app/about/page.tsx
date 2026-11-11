import type { Metadata } from "next";
import { About } from "@/components/home/About";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Jay Kapoor: photos, education, leadership and a timeline.",
};

export default function Page() {
  return (
    <div className="pt-[84px] md:pt-24">
      <About />
    </div>
  );
}
