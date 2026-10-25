import type { Metadata } from "next";
import { DogMap } from "@/components/DogMap";
import { Noticed } from "@/components/Noticed";
import { PageHead } from "@/components/PageHead";

export const metadata: Metadata = {
  title: "Startups",
  description:
    "Juno-AI, The Finer Things Club, Project Nidaan and StrayPaw, and what started each one.",
};

export default function Page() {
  return (
    <>
      <PageHead
        kicker="Founded"
        title="Startups"
        aside="Four things I founded, from 2019 to now."
      />
      <div className="mt-14">
        <Noticed />
      </div>
      <DogMap />
    </>
  );
}
