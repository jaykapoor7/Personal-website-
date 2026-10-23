import type { Metadata } from "next";
import { Arrow } from "@/components/Arrow";
import { Desk, DeskRow, type DeskItem } from "@/components/Desk";
import { Polaroid } from "@/components/frames";
import { Reveal } from "@/components/motion";
import { PageHeader } from "@/components/ui";
import { education, person, photos, skills } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Jay Kapoor: founder, Economics and Statistics student at Pitt, footballer.",
};

const items: DeskItem[] = photos.map((p, i) => ({
  id: p.name,
  label: p.caption,
  x: [2, 22, 44, 63, 80][i],
  y: [10, 34, 6, 30, 8][i],
  rotate: [-5, 4, -3, 6, -7][i],
  width: [250, 230, 240, 230, 220][i],
  node: <Polaroid name={p.name} alt={p.alt} caption={p.caption} />,
}));

export default function About() {
  return (
    <>
      <PageHeader title="Hi, I'm Jay" />
      <div className="shell">
        <Desk items={items} className="hidden h-[560px] lg:block" />
      </div>
      <div className="lg:hidden">
        <DeskRow items={items} />
      </div>
      <section className="shell grid gap-16 pt-20 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-6 text-[clamp(20px,2vw,26px)] leading-[1.4] tracking-[-0.01em]">
          {person.about.map((p) => (
            <Reveal key={p}>
              <p>{p}</p>
            </Reveal>
          ))}
          <Reveal className="flex flex-wrap gap-3 pt-4">
            <a href={`mailto:${person.email}`} className="btn-primary">
              Email me <Arrow />
            </a>
            <a
              href="/jay-kapoor-resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              Resume
            </a>
          </Reveal>
        </div>
        <div className="space-y-12">
          <div>
            <p className="label">Education</p>
            <ul className="mt-4 border-t border-line">
              {education.map((e) => (
                <li key={e.school} className="border-b border-line py-4">
                  <p className="font-semibold tracking-tight">{e.school}</p>
                  <p className="text-[15px] text-muted">
                    {e.detail}, {e.period}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label">Tools</p>
            <p className="mt-4 text-[17px] leading-relaxed">
              {skills.join(", ")}. English and Hindi.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
