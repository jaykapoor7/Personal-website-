"use client";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { builds, type Build } from "@/content/site";
import { Arrow } from "./Arrow";
import { SmartLink } from "./ui";

const EverythingFalls = dynamic(
  () => import("./EverythingFalls").then((m) => m.EverythingFalls),
  { ssr: false, loading: () => <div className="h-full w-full bg-paper" /> },
);

function Play({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group absolute inset-0 grid place-items-center"
    >
      <span className="btn-primary">
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

function View({
  b,
  live,
  goLive,
}: {
  b: Build;
  live: boolean;
  goLive: () => void;
}) {
  if (b.falls)
    return (
      <div className="h-full overflow-hidden [&_.falls]:h-full [&_.falls]:rounded-none [&_.falls]:border-0 [&_.falls-stage]:!h-[calc(100%-90px)]">
        <EverythingFalls compact />
      </div>
    );
  const label = b.kind === "Game" ? "Play it here" : "Try it here";
  if (b.phone)
    return (
      <div className="bg-dots flex h-full items-center justify-center bg-card py-5">
        <div className="h-full rounded-[34px] bg-[#111] p-1.5 shadow-2xl">
          <div
            className="relative h-full overflow-hidden rounded-[28px] bg-black"
            style={{ aspectRatio: "390 / 844" }}
          >
            {live ? (
              <iframe
                src={b.href}
                title={b.name}
                className="absolute inset-0 h-full w-full bg-white"
              />
            ) : (
              <>
                <Image
                  src={b.image!}
                  alt={`${b.name} on a phone`}
                  fill
                  sizes="260px"
                  className="object-cover object-top"
                />
                <Play onClick={goLive} label={label} />
              </>
            )}
          </div>
        </div>
      </div>
    );
  if (live)
    return (
      <iframe
        src={b.href}
        title={b.name}
        className="h-full w-full bg-white"
        allow="fullscreen; autoplay; microphone"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    );
  return (
    <div className="relative h-full">
      <Image
        src={b.image!}
        alt={`${b.name} home page`}
        fill
        sizes="(max-width: 1024px) 100vw, 760px"
        className="object-cover object-top"
      />
      <Play onClick={goLive} label={label} />
    </div>
  );
}

/** Tools and games, each runnable right on the page. */
export function BuildsBrowser() {
  const [id, setId] = useState(builds[0].id);
  const [live, setLive] = useState<string | null>(null);
  const b = builds.find((x) => x.id === id)!;
  const kinds = ["Tool", "Game"] as const;

  return (
    <div className="card grid overflow-hidden lg:grid-cols-[300px_1fr]">
      <div className="p-3">
        {kinds.map((k) => (
          <div key={k} className="mb-2">
            <p className="px-3 pb-1.5 pt-2 text-[13px] font-medium text-muted">
              {k}s
            </p>
            <ul
              role="tablist"
              aria-label={`${k}s`}
              className="flex gap-1 overflow-x-auto lg:flex-col"
            >
              {builds
                .filter((x) => x.kind === k)
                .map((x) => (
                  <li key={x.id} role="presentation" className="shrink-0">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={x.id === id}
                      onClick={() => {
                        setId(x.id);
                        setLive(null);
                      }}
                      className={`w-full rounded-xl px-3 py-2.5 text-left transition-colors ${
                        x.id === id ? "text-accent" : "hover:text-accent"
                      }`}
                    >
                      <span className="block text-[14.5px] font-semibold">
                        {x.name}
                      </span>
                      <span
                        className={`hidden text-[13px] leading-snug lg:block text-muted`}
                      >
                        {x.summary}
                      </span>
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex min-w-0 flex-col">
        <div className="relative h-[60vh] max-h-[540px] min-h-[380px] bg-paper">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={b.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <View b={b} live={live === b.id} goLive={() => setLive(b.id)} />
            </motion.div>
          </AnimatePresence>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid gap-6 p-5 md:grid-cols-[1fr_200px] md:p-7"
          >
            <div>
              <h3 className="text-[24px] font-semibold leading-tight">
                {b.name}
              </h3>
              <p className="mt-2 text-[16px] leading-relaxed">{b.points[0]}</p>
              <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-muted">
                {b.points.slice(1).map((p) => (
                  <li key={p} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:pl-6">
              <p className="label">
                {b.kind === "Game" ? "Game" : "Tool"}, built with
              </p>
              <p className="mt-1 text-[15px]">{b.stack.join(", ")}</p>
              {!b.falls && (
                <div className="mt-5 flex flex-col gap-2 text-[14px] font-medium">
                  <SmartLink
                    href={b.href!}
                    className="inline-flex items-center gap-1.5 hover:text-accent"
                  >
                    Open {b.url} <Arrow />
                  </SmartLink>
                  {b.code && (
                    <SmartLink
                      href={b.code}
                      className="inline-flex items-center gap-1.5 hover:text-accent"
                    >
                      Source on GitHub <Arrow />
                    </SmartLink>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
