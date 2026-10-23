import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/Arrow";
import { PageHeader, Photo } from "@/components/ui";
import { education, person, photos, skills } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Jay Kapoor — founder, Economics & Statistics student at Pitt, and lifelong footballer.",
};

export default function About() {
  const [portrait, ...rest] = photos;
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={
          <>
            Hi, I’m Jay.{" "}
            <span className="font-serif font-normal italic text-muted">
              Nice to meet you.
            </span>
          </>
        }
      />
      <section className="shell grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-line bg-card">
            <Photo
              name={portrait.name}
              alt={portrait.alt}
              priority
              className="h-full w-full object-cover object-[50%_62%]"
            />
          </div>
        </div>
        <div>
          <div className="space-y-6 text-xl leading-relaxed text-fg/85">
            {person.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={`mailto:${person.email}`} className="btn-primary">
              Say hello <Arrow />
            </a>
            <a
              href="/jay-kapoor-resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              Résumé
            </a>
          </div>

          <div className="mt-20">
            <p className="eyebrow">Education</p>
            <ul className="mt-5 border-t border-line">
              {education.map((e) => (
                <li
                  key={e.school}
                  className="grid gap-1 border-b border-line py-5 sm:grid-cols-[1fr_auto] sm:gap-6"
                >
                  <div>
                    <p className="text-lg font-medium tracking-tight">
                      {e.school}
                    </p>
                    <p className="text-[15px] text-muted">{e.detail}</p>
                  </div>
                  <span className="font-mono text-xs uppercase tracking-wider text-faint sm:pt-1.5">
                    {e.period}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16">
            <p className="eyebrow">Toolkit</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {skills.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-line px-3.5 py-1.5 text-sm text-muted"
                >
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">
              Languages: English, Hindi.
            </p>
          </div>
        </div>
      </section>

      <section className="shell pt-28" aria-labelledby="photos">
        <div className="mb-8 flex items-end justify-between border-t border-line pt-6">
          <h2
            id="photos"
            className="text-3xl font-medium tracking-[-0.03em] md:text-[44px]"
          >
            Photos
          </h2>
          <span className="eyebrow">Mostly football</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {rest.map((p) => (
            <figure key={p.name}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-card">
                <Photo
                  name={p.name}
                  alt={p.alt}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 text-sm text-muted">
                {p.caption}
              </figcaption>
            </figure>
          ))}
        </div>
        <Link
          href="/work"
          className="mt-16 inline-flex items-center gap-2 text-lg font-medium tracking-tight hover:text-accent"
        >
          See my work <Arrow direction="right" />
        </Link>
      </section>
    </>
  );
}
