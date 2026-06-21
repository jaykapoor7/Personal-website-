import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { socials } from "@/content/socials";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name}.`,
};

export default function ContactPage() {
  return (
    <section className="shell flex min-h-[70vh] flex-col justify-center py-20">
      <Reveal>
        <p className="kicker mb-6">
          <span className="text-accent">&gt;</span> contact
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <h1 className="display text-5xl leading-tight sm:text-7xl">
          Let&rsquo;s build something.
        </h1>
      </Reveal>
      <Reveal delay={0.1}>
        <a
          href={`mailto:${profile.email}`}
          className="link-underline mt-8 inline-block text-2xl text-muted sm:text-3xl"
        >
          {profile.email}
        </a>
      </Reveal>

      <Reveal delay={0.15}>
        <ul className="mt-16 grid gap-px overflow-hidden rounded-sm border border-line sm:grid-cols-2">
          {socials.map((s) => (
            <li key={s.type}>
              <a
                href={s.url}
                target={s.type === "email" ? undefined : "_blank"}
                rel="noreferrer"
                className="flex items-center justify-between bg-ink p-6 transition-colors hover:bg-line/40"
              >
                <span>
                  <span className="block text-sm text-muted">{s.label}</span>
                  <span className="block text-lg">{s.handle}</span>
                </span>
                <span aria-hidden className="text-muted">
                  ↗
                </span>
              </a>
            </li>
          ))}
          <li>
            <a
              href={profile.resumeUrl}
              className="flex items-center justify-between bg-ink p-6 transition-colors hover:bg-line/40"
            >
              <span>
                <span className="block text-sm text-muted">Resume</span>
                <span className="block text-lg">Download PDF</span>
              </span>
              <span aria-hidden className="text-muted">
                ↓
              </span>
            </a>
          </li>
        </ul>
      </Reveal>
    </section>
  );
}
