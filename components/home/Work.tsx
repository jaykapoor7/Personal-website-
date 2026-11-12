"use client";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { useEffect, useRef, useState } from "react";
import { ventures, type Venture } from "@/content/site";
import { Arrow } from "../Arrow";
import { Reveal } from "../motion";
import { Paper } from "./bits";
import { MiniMap } from "./MiniMap";

const year = (v: Venture) => Number(v.period.match(/\d{4}/)?.[0] ?? 0);
/** Oldest first: the list reads from the first thing I started to the latest. */
const list = [...ventures].sort((a, b) => year(a) - year(b));

/** One picture per venture: its map, its site, or its document. */
function Visual({ v, play }: { v: Venture; play?: boolean }) {
  if (v.id === "straypaw")
    return (
      <span className="absolute inset-0 grid place-items-center bg-accent">
        <MiniMap play={play} className="h-[90%]" />
      </span>
    );
  if (v.shot)
    return (
      <Image
        src={v.id === "juno-ai" ? "/previews/juno-light-d.webp" : v.shot.src}
        alt={`${v.name} home page`}
        fill
        sizes="(max-width: 1024px) 92vw, 620px"
        className="object-cover object-top"
      />
    );
  const doc = v.proof.find((p) => p.cover);
  return (
    <span className="absolute inset-0 grid place-items-center bg-card">
      {doc && (
        <span className="block h-[84%] -rotate-3">
          <Paper
            src={doc.cover!}
            alt={`First page of ${doc.label}`}
            className="h-full w-auto"
          />
        </span>
      )}
    </span>
  );
}

/**
 * What I started, oldest first: what was broken, then what I built.
 * On a wide screen one picture stays beside the list and changes with the row
 * at the middle of the screen.
 */
export function Work() {
  const [active, setActive] = useState(0);
  const rows = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    // A row is active while it crosses the middle of the screen.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting)
            setActive(rows.current.indexOf(e.target as HTMLLIElement));
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    rows.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section aria-labelledby="startups-h" className="shell mt-20 md:mt-32">
      <h2 id="startups-h" className="text-[15px] font-medium text-muted">
        Startups
      </h2>
      <div className="mt-4 lg:grid lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        <ol>
          {list.map((v, i) => (
            <li
              key={v.id}
              ref={(el) => {
                rows.current[i] = el;
              }}
              className="relative border-t border-line"
            >
              {/* The rule above the row at the middle of the screen fills in. */}
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 -top-px hidden h-[2px] origin-left bg-fg transition-transform duration-700 ease-out lg:block ${
                  active === i ? "scale-x-100" : "scale-x-0"
                }`}
              />
              <Link
                href={`/work/${v.id}`}
                className="group block py-9 lg:flex lg:min-h-[40svh] lg:flex-col lg:justify-center lg:py-10"
              >
                <Reveal y={20} className="lg:hidden">
                  <span className="relative mb-6 block aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-line">
                    <Visual v={v} />
                  </span>
                </Reveal>
                <span className="flex items-baseline justify-between gap-6 text-[15px] font-medium text-muted">
                  <span className="max-w-[40ch] text-[clamp(16px,1.35vw,19px)] leading-snug">
                    {v.broken}
                  </span>
                  <span className="shrink-0 tabular-nums">{year(v)}</span>
                </span>
                <span className="display mt-3 flex items-center gap-4 text-[clamp(44px,6vw,92px)]">
                  <span className="transition-transform duration-500 ease-out group-hover:translate-x-2">
                    {v.name}
                  </span>
                  <Arrow
                    direction="right"
                    className="text-[0.42em] opacity-0 transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:opacity-100"
                  />
                </span>
                <span className="mt-3 block max-w-[46ch] text-[clamp(16px,1.35vw,19px)] font-medium leading-snug">
                  {v.short}{" "}
                  <span className="text-muted">
                    {v.metrics.map((m) => `${m.value} ${m.label}`).join(", ")}.
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>

        {/* The picture for whichever row is at the middle of the screen. */}
        <div className="hidden lg:block" aria-hidden="true">
          {/* It sticks at the middle of the screen for as long as the list runs. */}
          <div className="sticky top-[calc(50svh-min(29svh,240px))] h-[min(58svh,480px)] overflow-hidden rounded-[28px] bg-card ring-1 ring-line">
            {list.map((v, i) => (
              <div
                key={v.id}
                className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-out ${
                  active === i
                    ? "opacity-100"
                    : "pointer-events-none scale-[1.03] opacity-0"
                }`}
              >
                <Visual v={v} play={active === i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
