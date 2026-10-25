import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { Questions } from "@/components/Questions";

export const metadata: Metadata = {
  title: "Questions",
  description:
    "Jay Kapoor's jobs and research labs, each as the question it was about.",
};

export default function Page() {
  return (
    <>
      <PageHead
        kicker="Jobs and labs"
        title="Questions"
        aside="Other people's problems I got to work on, at four jobs and four labs."
      />
      <Questions />
    </>
  );
}
