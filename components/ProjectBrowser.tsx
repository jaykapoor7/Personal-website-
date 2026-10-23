"use client";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { groupLabels, type Group, type Project } from "@/content/site";
import { Arrow } from "./Arrow";
import { Counter } from "./motion";
import { SmartLink } from "./ui";

const EverythingFalls = dynamic(
  () => import("./EverythingFalls").then((m) => m.EverythingFalls),
  { ssr: false, loading: () => <div className="h-full w-full bg-paper" /> },
);

const tint: Record<Group, string> = {
  started: "bg-indigo-600",
  worked: "bg-sky-600",
  research: "bg-violet-600",
  side: "bg-emerald-600",
  game: "bg-orange-500",
};

function addressOf(p: Project) {
  const v = p.preview;
  if (!v) return "kapoorjay.com/work/" + p.slug;
  if (v.type === "site") return v.url;
  if (v.type === "doc") return "kapoorjay.com" + v.href;
  return "kapoorjay.com/play/everything-falls";
}

function openHref(p: Project) {
  const v = p.preview;
  if (v?.type === "site") return p.links[0]?.href ?? "https://" + v.url;
  if (v?.type === "doc") return v.href;
  return p.links[0]?.href ?? `/work/${p.slug}`;
}

/** What shows inside the window for one project. Everything here is the real thing. */
function Viewport({
  p,
  live,
  goLive,
}: {
  p: Project;
  live: boolean;
  goLive: () => void;
}) {
  const v = p.preview;
  if (!v)
    return (
      <div className="bg-mesh flex h-full flex-col justify-end p-8">
        <p className="display text-[clamp(40px,5vw,72px)]">{p.title}</p>
        <p className="mt-3 max-w-md text-lg text-muted">{p.body[0]}</p>
      </div>
    );
  if (v.type === "falls")
    return (
      <div className="h-full overflow-hidden [&_.falls]:h-full [&_.falls]:rounded-none [&_.falls]:border-0 [&_.falls-stage]:!h-[calc(100%-90px)]">
        <EverythingFalls compact />
      </div>
    );
  if (v.type === "doc")
    return (
      <div
        className="bg-dots h-full overflow-y-auto bg-[#eceefb] px-4 py-8"
        tabIndex={0}
        aria-label={`${p.title}, first page`}
      >
        <div className="relative mx-auto aspect-[900/1273] w-[min(560px,100%)] overflow-hidden rounded-[3px] bg-white shadow-[0_20px_50px_-20px_rgba(30,27,75,0.45)]">
          <Image
            src={v.cover}
            alt={`First page of ${p.title}`}
            fill
            sizes="560px"
            className="object-cover object-top"
          />
        </div>
        <p className="mt-6 text-center text-sm text-muted">
          First page shown.{" "}
          <a
            href={v.href}
            target="_blank"
            rel="noreferrer"
            className="link text-fg"
          >
            Open the full PDF
          </a>
        </p>
      </div>
    );
  if (v.phone)
    return (
      <div className="bg-mesh flex h-full items-center justify-center py-6">
        <div className="h-full max-h-[600px] rounded-[38px] bg-[#111] p-2 shadow-2xl">
          <div
            className="relative h-full overflow-hidden rounded-[30px] bg-black"
            style={{ aspectRatio: "390 / 844" }}
          >
            {live ? (
              <iframe
                src={openHref(p)}
                title={p.title}
                className="absolute inset-0 h-full w-full bg-white"
              />
            ) : (
              <>
                <Image
                  src={v.mobile ?? v.desktop}
                  alt={`${p.title} on a phone`}
                  fill
                  sizes="300px"
                  className="object-cover object-top"
                />
                <PlayButton onClick={goLive} label="Try it" />
              </>
            )}
          </div>
        </div>
      </div>
    );
  if (live && v.live)
    return (
      <iframe
        src={openHref(p)}
        title={p.title}
        className="h-full w-full bg-white"
        allow="fullscreen; autoplay; microphone; geolocation"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    );
  if (v.scroll)
    return (
      <div
        className="h-full overflow-y-auto"
        tabIndex={0}
        aria-label={`${p.title}, scroll to see the whole page`}
      >
        <Image
          src={v.scroll}
          alt={`${p.title}, the whole home page`}
          width={1200}
          height={Math.round(1200 * (v.scrollRatio ?? 3))}
          sizes="(max-width: 1024px) 100vw, 800px"
          className="w-full"
        />
      </div>
    );
  return (
    <div className="relative h-full">
      <Image
        src={v.desktop}
        alt={`${p.title} home page`}
        fill
        sizes="(max-width: 1024px) 100vw, 800px"
        className="object-cover object-top"
      />
      {v.live && (
        <PlayButton
          onClick={goLive}
          label={p.group === "game" ? "Play it here" : "Use it here"}
        />
      )}
    </div>
  );
}

function PlayButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group absolute inset-0 grid place-items-center bg-indigo-950/0 transition-colors hover:bg-indigo-950/20"
    >
      <span className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-[15px] font-semibold text-white shadow-[0_12px_30px_-8px_rgba(79,70,229,0.7)] transition-transform group-hover:scale-105">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 fill-current"
          aria-hidden="true"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
        {label}
      </span>
    </button>
  );
}

/** A browser with a tab for every project. Pick a shelf, click a tab, use the real thing. */
export function ProjectBrowser({
  items,
  groups,
  initial,
}: {
  items: Project[];
  groups: Group[];
  initial?: Group;
}) {
  const [group, setGroup] = useState<Group>(initial ?? groups[0]);
  const shelf = items.filter((p) => p.group === group);
  const [picked, setPicked] = useState<Record<string, string>>({});
  const active = shelf.find((p) => p.slug === picked[group]) ?? shelf[0];
  const [live, setLive] = useState<string | null>(null);

  const pick = (slug: string) => {
    setPicked((x) => ({ ...x, [group]: slug }));
    setLive(null);
  };

  return (
    <div>
      {groups.length > 1 && (
        <div
          role="tablist"
          aria-label="Kinds of work"
          className="mb-5 flex flex-wrap gap-2"
        >
          {groups.map((g) => (
            <button
              key={g}
              role="tab"
              aria-selected={g === group}
              onClick={() => {
                setGroup(g);
                setLive(null);
              }}
              className={`rounded-full px-4 py-2 text-[15px] font-medium transition-all ${
                g === group
                  ? "bg-fg text-white shadow-lg shadow-indigo-900/20"
                  : "bg-white/80 text-muted ring-1 ring-line hover:text-fg"
              }`}
            >
              {groupLabels[g]}
              <span
                className={`ml-2 text-[13px] ${g === group ? "text-white/60" : "text-faint"}`}
              >
                {items.filter((p) => p.group === g).length}
              </span>
            </button>
          ))}
        </div>
      )}

      <div className="overflow-hidden rounded-[22px] bg-white shadow-[0_30px_80px_-30px_rgba(30,27,75,0.45)] ring-1 ring-indigo-950/10">
        {/* Tabs */}
        <div
          role="tablist"
          aria-label={groupLabels[group]}
          className="flex gap-1 overflow-x-auto bg-[#e9ebfb] px-2 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {shelf.map((p) => (
            <button
              key={p.slug}
              role="tab"
              aria-selected={p.slug === active.slug}
              onClick={() => pick(p.slug)}
              className={`flex h-10 max-w-[220px] shrink-0 items-center gap-2 rounded-t-xl px-3.5 text-[13.5px] transition-colors ${
                p.slug === active.slug
                  ? "bg-white font-semibold text-fg"
                  : "text-muted hover:bg-white/60"
              }`}
            >
              <span
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-md text-[11px] font-bold text-white ${tint[p.group]}`}
              >
                {p.title[0]}
              </span>
              <span className="truncate">{p.title}</span>
            </button>
          ))}
        </div>
        {/* Address bar */}
        <div className="flex h-11 items-center gap-3 border-b border-line px-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="min-w-0 flex-1 truncate rounded-lg bg-[#f2f3fd] px-3 py-1.5 font-mono text-[12px] text-muted">
            {addressOf(active)}
          </span>
          <SmartLink
            href={openHref(active)}
            className="inline-flex shrink-0 items-center gap-1 text-[13px] font-medium text-accent hover:underline"
          >
            Open <Arrow />
          </SmartLink>
        </div>
        {/* Page + notes */}
        <div className="grid lg:grid-cols-[1fr_320px]">
          <div className="relative h-[58vh] max-h-[560px] min-h-[380px] overflow-hidden bg-paper">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.slug}
                className="absolute inset-0"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <Viewport
                  p={active}
                  live={live === active.slug}
                  goLive={() => setLive(active.slug)}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <aside className="flex flex-col border-t border-line p-6 lg:border-l lg:border-t-0">
            <p className="text-[13px] font-medium text-accent">
              {active.role}
              {active.period && `, ${active.period}`}
            </p>
            <h3 className="display mt-2 text-[34px] leading-[0.95]">
              {active.title}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              {active.summary}
            </p>
            {active.metrics && (
              <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4">
                {active.metrics.slice(0, 4).map((m) => (
                  <div key={m.label}>
                    <dd className="display text-[30px]">
                      <Counter value={m.value} />
                    </dd>
                    <dt className="text-[13px] leading-snug text-muted">
                      {m.label}
                    </dt>
                  </div>
                ))}
              </dl>
            )}
            <div className="mt-auto flex flex-wrap gap-2 pt-6">
              {active.links.slice(0, 3).map((l, i) => (
                <SmartLink
                  key={l.href}
                  href={l.href}
                  className={`inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-[13.5px] font-medium transition-colors ${
                    i === 0
                      ? "bg-accent text-white hover:bg-indigo-700"
                      : "bg-card text-fg ring-1 ring-line hover:ring-accent/40"
                  }`}
                >
                  {l.label} <Arrow />
                </SmartLink>
              ))}
              <Link
                href={`/work/${active.slug}`}
                className="inline-flex h-9 items-center px-2 text-[13.5px] font-medium text-muted hover:text-fg"
              >
                The story
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
