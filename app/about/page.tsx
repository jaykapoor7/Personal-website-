import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/Reveal";
import { Portrait } from "@/components/Portrait";

export const metadata: Metadata = {
  title: "About",
  description: profile.tagline,
};

export default function AboutPage() {
  return (
    <>
      <section className="shell pt-20 pb-12 sm:pt-28">
        <Reveal>
          <p className="mb-6 text-sm uppercase tracking-widest text-muted">
            About
          </p>
        </Reveal>
        <div className="grid gap-10 md:grid-cols-[300px_1fr] md:items-start lg:gap-16">
          <Reveal delay={0.05}>
            <Portrait className="max-w-xs" />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-6 text-2xl leading-snug sm:text-3xl">
              {profile.bio.map((p, i) =>
                i === 0 ? (
                  <h1 key={i} className="display">
                    {p}
                  </h1>
                ) : (
                  <p key={i} className="text-muted">
                    {p}
                  </p>
                ),
              )}
              <p className="inline-flex items-center gap-2 text-base text-muted sm:text-lg">
                <span className="h-1.5 w-1.5 rounded-full bg-paper" aria-hidden />
                {profile.seeking}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Education */}
      <section className="shell hr-line grid gap-10 border-t py-12 md:grid-cols-[1fr_2fr]">
        <Reveal>
          <h2 className="text-sm uppercase tracking-widest text-muted">
            Education
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <ul className="space-y-8">
            {profile.education.map((e) => (
              <li key={e.school}>
                <p className="display text-2xl">{e.school}</p>
                <p className="mt-1 text-muted">{e.credential}</p>
                <p className="mt-1 text-sm text-muted">
                  {e.location} · {e.period}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Skills */}
      <section className="shell hr-line grid gap-10 border-t py-12 md:grid-cols-[1fr_2fr]">
        <Reveal>
          <h2 className="text-sm uppercase tracking-widest text-muted">
            Skills
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="space-y-8">
            <div>
              <p className="mb-3 text-sm text-muted">Technical</p>
              <ul className="flex flex-wrap gap-3">
                {profile.skills.technical.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-line px-4 py-2 text-sm"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-sm text-muted">Domain</p>
              <ul className="flex flex-wrap gap-3">
                {profile.skills.domain.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-line px-4 py-2 text-sm"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

    </>
  );
}
