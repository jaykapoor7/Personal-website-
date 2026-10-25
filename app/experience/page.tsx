import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { Questions } from "@/components/Questions";

export const metadata: Metadata = {
  title: "Experience",
  description: "Jay Kapoor's work at TARC, TOT Schools, Crowwd and HDFC Bank.",
};

export default function Page() {
  return (
    <>
      <PageHead
        kicker="Jobs and internships"
        title="Experience"
        aside="Real estate, early education, fintech and banking, 2025 to 2026."
      />
      <Questions kind="Job" />
    </>
  );
}
