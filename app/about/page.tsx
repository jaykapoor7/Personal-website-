import type { Metadata } from "next";
import { FinePrint } from "@/components/FinePrint";
import { PageHead } from "@/components/PageHead";
import { Reel } from "@/components/Reel";
import { SmartLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "Jay Kapoor off the clock: school in Bangalore, football, and Pittsburgh.",
};

export default function Page() {
  return (
    <>
      <PageHead
        kicker="Off the clock"
        title="About"
        aside="Bangalore, then Pittsburgh. A lot of football in between."
      />
      <div className="shell mt-10 grid gap-5 text-[clamp(19px,1.7vw,23px)] leading-[1.35] tracking-[-0.01em] md:grid-cols-3">
        <p>
          School in Bangalore. Summers working in Delhi. Now Economics and
          Statistics at Pitt.
        </p>
        <p className="text-muted">
          Most of what I make starts with something I noticed: a dog outside a
          cafe, a rider who could not get his own medicine, families hours from
          a doctor.
        </p>
        <p className="text-muted">
          I also write down predictions, so I can check{" "}
          <SmartLink
            href="/predictions"
            className="serif text-fg underline decoration-1 underline-offset-4 hover:text-accent"
          >
            how wrong I was
          </SmartLink>
          .
        </p>
      </div>
      <Reel />
      <FinePrint />
    </>
  );
}
