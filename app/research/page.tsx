import type { Metadata } from "next";
import { Research } from "@/components/home/Research";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Jay Kapoor's research: labs at Pitt and UPMC, a forecast ledger, models and memos.",
};

export default function Page() {
  return (
    <div className="pt-[84px] md:pt-24">
      <Research />
    </div>
  );
}
