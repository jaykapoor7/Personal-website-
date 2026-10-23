import type { Metadata } from "next";
import { Arrow } from "@/components/Arrow";
import { PageHeader } from "@/components/ui";
import { person } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Jay Kapoor.",
};

export default function Contact() {
  return (
    <>
      <PageHeader title="Say hi" lede="Email is the fastest way to reach me." />
      <section className="shell">
        <a
          href={`mailto:${person.email}`}
          className="display block break-all text-[clamp(40px,8vw,128px)] transition-colors hover:text-accent"
        >
          {person.email}
        </a>
        <ul className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {person.links
            .filter((l) => l.label !== "Email")
            .map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-line p-6 transition-colors hover:border-fg/40"
                >
                  <span className="text-lg font-semibold tracking-tight">
                    {l.label}
                  </span>
                  <Arrow className="text-faint group-hover:text-accent" />
                </a>
              </li>
            ))}
        </ul>
      </section>
    </>
  );
}
