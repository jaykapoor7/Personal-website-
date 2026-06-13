import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/Reveal";

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
        <Reveal delay={0.05}>
          <div className="max-w-3xl space-y-6 text-2xl leading-snug sm:text-3xl">
            {profile.bio.map((p, i) => (
              <p key={i} className={i === 0 ? "display" : "text-muted"}>
                {p}
              </p>
            ))}
          </div>
        </Reveal>
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

      {/* Leadership */}
      <section className="shell hr-line grid gap-10 border-t py-12 md:grid-cols-[1fr_2fr]">
        <Reveal>
          <h2 className="text-sm uppercase tracking-widest text-muted">
            Leadership
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <ul className="space-y-4">
            {profile.leadership.map((l, i) => (
              <li key={i} className="flex gap-4 text-lg leading-relaxed">
                <span className="text-muted">—</span>
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>
    </>
  );
}
