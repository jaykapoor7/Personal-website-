import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { Questions } from "@/components/Questions";
import { SmartLink } from "@/components/ui";
import { otherResearch } from "@/content/site";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Jay Kapoor's research at the University of Pittsburgh and UPMC.",
};

export default function Page() {
  return (
    <>
      <PageHead
        kicker="Labs at Pitt and UPMC"
        title="Research"
        aside="From bladder cells to emergency medicine to accessible tech."
      />
      <Questions kind="Lab" />
      <section aria-label="Other research" className="shell mt-16">
        <p className="label">Also</p>
        <ul className="mt-5 grid gap-6 border-t border-line pt-5 md:grid-cols-3">
          {otherResearch.map((o) => (
            <li key={o.name}>
              <p className="text-[17px] font-semibold leading-tight tracking-[-0.02em]">
                {o.href ? (
                  <SmartLink href={o.href} className="hover:text-accent">
                    {o.name}
                  </SmartLink>
                ) : (
                  o.name
                )}
              </p>
              <p className="mt-1 text-[14.5px] text-muted">{o.detail}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
