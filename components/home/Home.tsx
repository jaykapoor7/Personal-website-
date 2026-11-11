import { Link } from "next-view-transitions";
import { Arrow } from "../Arrow";
import { Featured } from "./Featured";
import { Hero } from "./Hero";

const more = ["Experience", "Research", "Projects", "About"];

/** The landing page: who I am, the four things I started, and where the rest is. */
export function Home() {
  return (
    <>
      <Hero />
      <Featured />
      <nav
        aria-label="More"
        className="shell mt-14 flex flex-wrap gap-x-9 gap-y-3 text-[clamp(20px,2vw,26px)] font-semibold md:mt-16"
      >
        {more.map((m) => (
          <Link
            key={m}
            href={`/${m.toLowerCase()}/`}
            className="group inline-flex items-center gap-2 underline decoration-line decoration-2 underline-offset-[7px] transition-colors hover:decoration-accent"
          >
            {m}
            <Arrow
              direction="right"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        ))}
      </nav>
    </>
  );
}
