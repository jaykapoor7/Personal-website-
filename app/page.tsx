import { Bet } from "@/components/Bet";
import { BuildsBrowser } from "@/components/BuildsBrowser";
import { DogMap } from "@/components/DogMap";
import { Reveal } from "@/components/motion";
import { Noticed } from "@/components/Noticed";
import { Opening } from "@/components/Opening";
import { Questions } from "@/components/Questions";
import { Reel } from "@/components/Reel";
import { Shelf } from "@/components/Shelf";
import { SmartLink } from "@/components/ui";
import { education, leadership, otherResearch, skills } from "@/content/site";

function Chapter({
  id,
  no,
  title,
  aside,
}: {
  id: string;
  no: string;
  title: React.ReactNode;
  aside: React.ReactNode;
}) {
  return (
    <Reveal className="flex flex-wrap items-end justify-between gap-6">
      <h2
        id={`${id}-h`}
        className="text-[clamp(56px,10vw,150px)] font-semibold leading-[0.85] tracking-[-0.06em]"
      >
        {title}
        <span className="sr-only">, chapter {no}</span>
      </h2>
      <p className="serif max-w-[24ch] text-[clamp(22px,2.4vw,32px)] leading-[1.05]">
        {aside}
      </p>
    </Reveal>
  );
}

export default function Home() {
  return (
    <>
      <Opening />
      <Noticed />
      <DogMap />
      <Questions />

      <section
        id="predictions"
        aria-labelledby="predictions-h"
        className="shell scroll-mt-16 pt-28 md:pt-40"
      >
        <Chapter
          id="predictions"
          no="3"
          title="Predictions"
          aside="I write down what I think will happen, with odds, then score myself. Bet against me."
        />
        <Reveal className="mt-12">
          <Bet />
        </Reveal>
        <div className="mt-20">
          <p className="label">The memos and papers behind the calls</p>
          <div className="mt-8">
            <Shelf />
          </div>
        </div>
      </section>

      <section
        id="play"
        aria-labelledby="play-h"
        className="shell scroll-mt-16 pb-28 pt-28 md:pb-40 md:pt-40"
      >
        <Chapter
          id="play"
          no="4"
          title="Play"
          aside="Tools I wanted, and games nobody asked for. They all run right here."
        />
        <Reveal className="mt-10">
          <BuildsBrowser />
        </Reveal>
      </section>

      <Reel />

      <section aria-label="Fine print" className="shell pt-20">
        <Reveal className="grid gap-10 border-t border-fg pt-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="label">School</p>
            <ul className="mt-4 space-y-4">
              {education.map((e) => (
                <li key={e.school}>
                  <p className="text-[17px] font-semibold leading-tight tracking-[-0.02em]">
                    {e.school}
                  </p>
                  <p className="mt-1 text-[14px] text-muted">{e.detail}</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
                    {e.period}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <p className="label">Led</p>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {leadership.map((l) => (
                <li key={l.title + l.org}>
                  <p className="text-[17px] font-semibold leading-tight tracking-[-0.02em]">
                    {l.href ? (
                      <SmartLink href={l.href} className="hover:text-accent">
                        {l.org}
                      </SmartLink>
                    ) : (
                      l.org
                    )}
                  </p>
                  <p className="mt-1 text-[14px] text-muted">
                    {l.title}. {l.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label">Also</p>
            <ul className="mt-4 space-y-4">
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
                  <p className="mt-1 text-[14px] text-muted">{o.detail}</p>
                </li>
              ))}
            </ul>
            <p className="label mt-8">Tools</p>
            <p className="mt-3 text-[14px] leading-relaxed text-muted">
              {skills.join(", ")}
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
