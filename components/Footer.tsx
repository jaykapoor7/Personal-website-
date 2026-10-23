import { person } from "@/content/site";
import { Reveal } from "./motion";

export function Footer() {
  return (
    <footer className="mt-40 border-t border-line">
      <div className="shell py-20 md:py-28">
        <Reveal>
          <p className="label">Say hi</p>
          <a
            href={`mailto:${person.email}`}
            className="display mt-4 block break-all text-[clamp(44px,10vw,168px)] transition-colors duration-300 hover:text-accent"
          >
            {person.email}
          </a>
        </Reveal>
      </div>
      <div className="shell flex flex-col gap-4 border-t border-line py-8 text-[15px] text-muted md:flex-row md:items-center md:justify-between">
        <p>Jay Kapoor, {person.place}</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
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
            <a href="/artifacts/" className="transition-colors hover:text-fg">
              Files
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
