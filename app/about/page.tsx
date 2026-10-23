import type { Metadata } from "next";
import { Desk, DeskRow, type DeskItem } from "@/components/Desk";
import { Polaroid } from "@/components/frames";
import { Reveal } from "@/components/motion";
import { PageHeader } from "@/components/ui";
import { person, photos, skills } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Jay Kapoor: Bangalore, Delhi, Pittsburgh. Builder, footballer, forecaster.",
};

const items: DeskItem[] = [
  ...photos.map((p) => ({ name: p.name, alt: p.alt, caption: p.caption })),
].map((p, i) => ({
  id: p.name,
  label: p.caption,
  x: [3, 23, 44, 63, 80][i],
  y: [8, 30, 4, 28, 6][i],
  rotate: [-5, 4, -3, 6, -7][i],
  width: [240, 220, 230, 220, 210][i],
  node: <Polaroid name={p.name} alt={p.alt} caption={p.caption} />,
}));

export default function About() {
  return (
    <>
      <PageHeader title="Hi, I'm Jay" />
      <section className="shell grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div className="space-y-5 text-[clamp(19px,1.8vw,23px)] leading-[1.5]">
          {person.about.map((p) => (
            <Reveal key={p}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div
            className="rounded-[24px] bg-white/80 p-6 ring-1 ring-line backdrop-blur"
            style={{ rotate: "1deg" }}
          >
            <p className="hand text-[28px] text-accent">the toolbox</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {skills.map((s) => (
                <li
                  key={s}
                  className="rounded-full bg-card px-3 py-1.5 text-[14px] font-medium ring-1 ring-line"
                >
                  {s}
                </li>
              ))}
              <li className="rounded-full bg-card px-3 py-1.5 text-[14px] font-medium ring-1 ring-line">
                English and Hindi
              </li>
            </ul>
          </div>
        </Reveal>
      </section>
      <section aria-label="Photos" className="pt-12">
        <p className="hand shell hidden text-[26px] text-accent lg:block">
          drag the photos around
        </p>
        <div className="shell">
          <Desk items={items} className="hidden h-[520px] lg:block" />
        </div>
        <div className="lg:hidden">
          <DeskRow items={items} />
        </div>
      </section>
    </>
  );
}
