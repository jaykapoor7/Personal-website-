import { Link } from "next-view-transitions";
import { builds, roles } from "@/content/site";
import { Arrow } from "../Arrow";
import { Reveal } from "../motion";
import { Hero } from "./Hero";
import { Intro } from "./Intro";
import { Work } from "./Work";

const count = (kind: string) => builds.filter((b) => b.kind === kind).length;

/** The rest of the site, each with what is behind the link. */
const more = [
  {
    name: "Experience",
    line: roles.map((r) => r.org.replace(/ India$/, "")).join(", "),
  },
  {
    name: "Research",
    line: "Labs at Pitt and UPMC, forecasts, models and memos",
  },
  { name: "Projects", line: `${count("Tool")} tools, ${count("Game")} games` },
  { name: "About", line: "Photos, education and a timeline" },
];

/**
 * The landing page. The hero stays put while one white sheet slides up over
 * it; on the sheet are a short introduction, what I started, and the way to
 * everything else.
 */
export function Home() {
  return (
    <div className="relative">
      <Hero />
      <div className="relative z-10 -mt-14 rounded-t-[28px] bg-bg md:rounded-t-[44px]">
        <Intro />
        <Work />
        <nav aria-label="More" className="shell mt-20 md:mt-28">
          <ul className="border-t border-line">
            {more.map((m) => (
              <li key={m.name} className="border-b border-line">
                <Reveal y={16}>
                  <Link
                    href={`/${m.name.toLowerCase()}/`}
                    className="group flex flex-col gap-x-8 gap-y-1 py-5 md:flex-row md:items-baseline md:py-6"
                  >
                    <span className="display text-[clamp(40px,6vw,92px)] transition-transform duration-500 ease-out group-hover:translate-x-2">
                      {m.name}
                    </span>
                    <span className="flex-1 text-[clamp(16px,1.35vw,19px)] font-medium text-muted md:text-right">
                      {m.line}
                    </span>
                    <Arrow
                      direction="right"
                      className="hidden self-center text-[clamp(26px,2.6vw,40px)] transition-transform duration-500 ease-out group-hover:translate-x-2 md:block"
                    />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
