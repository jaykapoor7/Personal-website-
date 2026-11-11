"use client";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { ventures, type Venture } from "@/content/site";
import { Stagger, StaggerItem } from "../motion";
import { Paper } from "./bits";
import { MiniMap } from "./MiniMap";

const year = (v: Venture) => v.period.match(/\d{4}/)?.[0] ?? "";

/** One picture per venture: its map, its site, or its document. */
function Visual({ v }: { v: Venture }) {
  if (v.id === "straypaw")
    return (
      <span className="absolute inset-0 grid place-items-center bg-accent">
        <MiniMap className="h-[92%] w-auto" />
      </span>
    );
  if (v.shot)
    return (
      <Image
        src={v.id === "juno-ai" ? "/previews/juno-light-d.webp" : v.shot.src}
        alt={`${v.name} home page`}
        fill
        sizes="(max-width: 1024px) 46vw, 300px"
        className="object-cover object-top"
      />
    );
  const doc = v.proof.find((p) => p.cover);
  return (
    <span className="absolute inset-0 grid place-items-center bg-card">
      {doc && (
        <span className="block h-[86%] -rotate-3">
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

/** The four things I started, each one line and one number. */
export function Featured() {
  return (
    <section aria-labelledby="featured-h" className="shell mt-10 md:mt-12">
      <h2 id="featured-h" className="text-[15px] font-medium text-muted">
        Startups
      </h2>
      <Stagger
        as="ul"
        gap={0.06}
        className="mt-4 grid grid-cols-2 gap-x-4 gap-y-9 lg:grid-cols-4 lg:gap-x-5"
      >
        {ventures.map((v) => (
          <StaggerItem as="li" key={v.id}>
            <Link href={`/work/${v.id}`} className="group block">
              <span
                className="relative block aspect-[16/11] overflow-hidden rounded-2xl ring-1 ring-line transition-transform duration-500 ease-out group-hover:-translate-y-1.5"
                style={{ viewTransitionName: `shot-${v.id}` }}
              >
                <Visual v={v} />
              </span>
              <span className="mt-4 flex items-baseline justify-between gap-3">
                <span className="display text-[clamp(22px,2.1vw,30px)] group-hover:text-accent">
                  {v.name}
                </span>
                <span className="shrink-0 text-[14px] font-medium tabular-nums text-muted">
                  {year(v)}
                </span>
              </span>
              <span className="mt-1.5 block text-[15px] leading-snug text-muted">
                {v.short}
              </span>
              <span className="mt-2 block text-[15px] font-semibold">
                {v.metrics[0].value} {v.metrics[0].label}
              </span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
