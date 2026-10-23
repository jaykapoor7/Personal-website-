import { person } from "@/content/site";
import { Arrow } from "./Arrow";
import { Reveal } from "./motion";

export function Footer() {
  return (
    <footer className="mt-40 overflow-hidden">
      <div className="shell pb-16 text-center">
        <Reveal>
          <h2 className="text-[clamp(56px,13vw,184px)] font-medium leading-[0.9] tracking-[-0.06em]">
            Let’s{" "}
            <span className="font-serif font-normal italic tracking-[-0.03em]">
              build.
            </span>
          </h2>
        </Reveal>
        <Reveal
          delay={0.15}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          <a
            href={`mailto:${person.email}`}
            className="btn-primary h-12 px-7 text-[15px]"
          >
            {person.email} <Arrow />
          </a>
          <a
            href="/jay-kapoor-resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost h-12 px-7 text-[15px]"
          >
            Résumé
          </a>
        </Reveal>
      </div>
      <div className="border-t border-line">
        <div className="shell flex flex-col items-center gap-4 py-8 text-sm text-muted md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Jay Kapoor</p>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {person.links
              .filter((l) => !["Email", "Résumé"].includes(l.label))
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
              <a href="/artifacts/" className="transition-colors hover:text-fg">
                Files
              </a>
            </li>
            <li>
              <a href="/play/" className="transition-colors hover:text-fg">
                Play
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
