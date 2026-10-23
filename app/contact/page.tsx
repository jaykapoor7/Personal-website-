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
      <PageHeader
        eyebrow={`Contact · ${person.place}`}
        title={
          <>
            Let’s <span className="font-serif font-normal italic">talk.</span>
          </>
        }
        lede="I’m always up for a conversation about civic tech, healthcare access, fintech in India, or a problem you think nobody’s solving. Email is fastest."
      />
      <section className="shell">
        <a
          href={`mailto:${person.email}`}
          className="group flex items-center justify-between gap-6 rounded-[24px] bg-fg p-6 text-bg transition-opacity hover:opacity-90 sm:p-10"
        >
          <span className="break-all text-2xl font-medium tracking-[-0.03em] sm:text-4xl md:text-5xl">
            {person.email}
          </span>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-bg text-fg transition-transform group-hover:rotate-45">
            <Arrow />
          </span>
        </a>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {person.links
            .filter((l) => l.label !== "Email")
            .map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-line p-6 transition-colors hover:border-fg/30 hover:bg-card"
                >
                  <span className="text-lg font-medium tracking-tight">
                    {l.label}
                  </span>
                  <Arrow className="text-faint transition-colors group-hover:text-fg" />
                </a>
              </li>
            ))}
        </ul>
      </section>
    </>
  );
}
