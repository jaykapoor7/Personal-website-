"use client";
import { useInView } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { useRef } from "react";
import { builds, type Build } from "@/content/site";
import { Stagger, StaggerItem } from "../motion";
import { SectionHead } from "./bits";

const EverythingFalls = dynamic(
  () => import("../EverythingFalls").then((m) => m.EverythingFalls),
  { ssr: false, loading: () => <div className="h-full w-full bg-paper" /> },
);

const order = ["emergency", "strike", "cura", "llm-lab", "road360", "falls"];
const phones: Record<string, string> = {
  emergency: "/previews/emergency-m.webp",
  strike: "/previews/strike-m.webp",
  cura: "/previews/health-os-m.webp",
  "llm-lab": "/previews/search-visibility-m.webp",
  road360: "/previews/road360-m.webp",
};
const desktops: Record<string, string> = {
  road360: "/previews/road360-d.webp",
};
const list = order.map((id) => builds.find((b) => b.id === id)!);
const hrefOf = (b: Build) => (b.falls ? b.href! : `/play/${b.id}`);

/** The physics toy runs right in its card, but only while the card is on screen. */
function Toy() {
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { margin: "200px" });
  return (
    <div
      ref={ref}
      className="h-full [&_.falls-caption]:hidden [&_.falls-stage]:!h-[calc(100%-52px)] [&_.falls]:h-full [&_.falls]:rounded-none"
    >
      {near && <EverythingFalls compact />}
    </div>
  );
}

function Card({ b }: { b: Build }) {
  const frame =
    "relative block aspect-[16/10] overflow-hidden rounded-[24px] bg-card ring-1 ring-line";
  const text = (
    <span className="mt-3.5 block px-1">
      <span className="flex items-baseline justify-between gap-3">
        <span className="text-[19px] font-semibold leading-tight group-hover:text-accent">
          {b.name}
        </span>
        <span className="shrink-0 text-[14px] font-medium text-muted">
          {b.kind}
        </span>
      </span>
      <span className="mt-1 block text-[15px] leading-snug text-muted">
        {b.summary}
      </span>
    </span>
  );
  if (b.falls)
    return (
      <>
        <div className={frame}>
          <Toy />
        </div>
        <Link href={hrefOf(b)} className="group block">
          {text}
        </Link>
      </>
    );
  return (
    <Link href={hrefOf(b)} className="group block">
      <span className={frame} data-cursor={b.kind === "Game" ? "Play" : "Try"}>
        <Image
          src={desktops[b.id] ?? b.image!}
          alt={`${b.name} home page`}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 420px"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        {phones[b.id] && (
          <span className="deep-shadow absolute bottom-0 right-[6%] block aspect-[390/800] w-[21%] translate-y-[104%] overflow-hidden rounded-[16px] ring-4 ring-white transition-transform duration-500 ease-out group-hover:translate-y-[34%]">
            <Image
              src={phones[b.id]}
              alt=""
              fill
              sizes="120px"
              className="object-cover object-top"
            />
          </span>
        )}
      </span>
      {text}
    </Link>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      data-tone="light"
      aria-labelledby="projects-h"
      className="shell scroll-mt-20"
    >
      <SectionHead
        id="projects-h"
        title="Projects"
        note="Tools and games, all playable"
      />
      {/* A swipe row on a phone, a grid from there up. */}
      <Stagger
        as="ul"
        gap={0.05}
        className="no-bar -mx-5 mt-7 flex snap-x scroll-px-5 gap-4 overflow-x-auto px-5 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-8 sm:overflow-visible sm:px-0 md:mt-9 lg:grid-cols-3"
      >
        {list.map((b) => (
          <StaggerItem
            as="li"
            key={b.id}
            className="w-[80vw] shrink-0 snap-start sm:w-auto"
          >
            <Card b={b} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
