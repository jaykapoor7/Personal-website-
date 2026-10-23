import Link from "next/link";
import { person } from "@/content/site";
import { Arrow } from "./Arrow";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-line">
      <div className="shell py-20 md:py-28">
        <p className="eyebrow">Contact</p>
        <h2 className="mt-5 max-w-3xl text-4xl font-medium leading-[1.05] tracking-[-0.035em] md:text-6xl">
          Building something in health, civic tech, or{" "}
          <span className="font-serif font-normal italic">messy markets?</span>{" "}
          Let’s talk.
        </h2>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a href={`mailto:${person.email}`} className="btn-primary">
            {person.email}
            <Arrow />
          </a>
          <a
            href="https://www.linkedin.com/in/jay-kapoor7"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
          >
            LinkedIn <Arrow />
          </a>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="shell flex flex-col gap-4 py-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Jay Kapoor · {person.place}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {person.links
              .filter((l) => l.label !== "Email")
              .map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-fg"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            <li>
              <Link
                href="/artifacts"
                className="transition-colors hover:text-fg"
              >
                Files
              </Link>
            </li>
            <li>
              <Link href="/play" className="transition-colors hover:text-fg">
                Play
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
