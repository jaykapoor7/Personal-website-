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
        aside="Four jobs, each written as the question it was really about."
      />
      <Questions kind="Job" />
    </>
  );
}
