import type { Metadata } from "next";
import { DogMap } from "@/components/DogMap";
import { Noticed } from "@/components/Noticed";
import { PageHead } from "@/components/PageHead";

export const metadata: Metadata = {
  title: "Started",
  description:
    "Juno-AI, The Finer Things Club, Project Nidaan and StrayPaw, and what started each one.",
};

export default function Page() {
  return (
    <>
      <PageHead
        kicker="Things I started"
        title="Started"
        aside="Each one began with something I noticed."
      />
      <div className="mt-14">
        <Noticed />
      </div>
      <DogMap />
    </>
  );
}
