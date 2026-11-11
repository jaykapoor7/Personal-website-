"use client";
import { useInView } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { useRef } from "react";
import { builds, type Build } from "@/content/site";
import { Arrow } from "../Arrow";
import { Stagger, StaggerItem } from "../motion";
import { SectionHead } from "./bits";

const EverythingFalls = dynamic(
  () => import("../EverythingFalls").then((m) => m.EverythingFalls),
  { ssr: false, loading: () => <div className="h-full w-full bg-paper" /> },
);

/** Where each build sits in the grid: one large, one tall, the rest small or wide. */
const layout: { id: string; cell: string; image?: string; fit?: string }[] = [
  {
    id: "emergency",
    cell: "col-span-2 aspect-[16/10] lg:row-span-2 lg:aspect-auto",
  },
  { id: "strike", cell: "aspect-[4/3] lg:aspect-auto" },
  {
    id: "road360",
    cell: "row-span-2 lg:col-start-4 lg:row-start-1",
    image: "/previews/road360-m.webp",
  },
  { id: "cura", cell: "aspect-[4/3] lg:aspect-auto" },
  { id: "falls", cell: "col-span-2 h-[260px] lg:h-auto" },
  {
    id: "llm-lab",
    cell: "col-span-2 aspect-[16/8] lg:aspect-auto",
  },
];
const find = (id: string) => builds.find((b) => b.id === id)!;
const hrefOf = (b: Build) => (b.falls ? b.href! : `/play/${b.id}`);

/** The physics toy runs right in its tile, but only while the tile is on screen. */
function Toy() {
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { margin: "200px" });
  return (
    <div
      ref={ref}
      className="h-full [&_.falls-caption]:hidden [&_.falls-stage]:!h-[calc(100%-52px)] [&_.falls]:h-full [&_.falls]:rounded-none [&_.falls]:bg-white"
    >
      {near && <EverythingFalls compact />}
    </div>
  );
}

function Tile({ b, image }: { b: Build; image?: string }) {
  const name = (
    <span className="absolute inset-x-0 bottom-0 flex h-[46px] items-center justify-between gap-3 bg-white px-4">
      <span className="truncate text-[16px] font-semibold leading-tight">
        {b.name}
      </span>
      <span className="shrink-0 text-[13px] font-medium text-muted">
        {b.kind}
      </span>
    </span>
  );
  if (b.falls)
    return (
      <div className="relative h-full overflow-hidden rounded-[24px] bg-white">
        <Toy />
        <Link
          href={hrefOf(b)}
          className="absolute bottom-3 right-3 inline-flex h-9 items-center gap-1.5 rounded-full bg-fg px-3.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-accent"
        >
          {b.name} <Arrow direction="right" />
        </Link>
      </div>
    );
  return (
    <Link
      href={hrefOf(b)}
      data-cursor={b.kind === "Game" ? "Play" : "Try"}
      className="group relative block h-full overflow-hidden rounded-[24px] bg-white"
    >
      <span className="absolute inset-x-0 bottom-[46px] top-0 overflow-hidden">
        <Image
          src={image ?? b.image!}
          alt={`${b.name} screenshot`}
          fill
          sizes="(max-width: 1024px) 92vw, 620px"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
      </span>
      {name}
      {/* What it is, laid over the picture when pointed at or focused. */}
      <span className="absolute inset-0 flex translate-y-3 flex-col justify-end gap-3 bg-accent p-5 text-white opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
        <span className="display block text-[clamp(24px,2.2vw,34px)]">
          {b.name}
        </span>
        <span className="block text-[15px] leading-snug text-white/85">
          {b.summary}
        </span>
        <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold">
          {b.kind === "Game" ? "Play it" : "Try it"} <Arrow direction="right" />
        </span>
      </span>
    </Link>
  );
}

/** Six builds in a grid of different sizes, on a tinted band. */
export function Projects() {
  return (
    <section
      id="projects"
      data-tone="light"
      aria-labelledby="projects-h"
      className="mx-2 scroll-mt-3 rounded-[32px] bg-card py-14 md:mx-4 md:rounded-[44px] md:py-20"
    >
      <div className="shell">
        <SectionHead
          id="projects-h"
          title="Projects"
          note="Tools and games, all playable"
        />
        <Stagger
          as="ul"
          gap={0.05}
          className="mt-7 grid grid-cols-2 gap-3 md:mt-9 lg:h-[min(660px,calc(100svh-150px))] lg:min-h-[560px] lg:grid-cols-4 lg:grid-rows-3"
        >
          {layout.map((l) => (
            <StaggerItem as="li" key={l.id} className={l.cell}>
              <Tile b={find(l.id)} image={l.image} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
