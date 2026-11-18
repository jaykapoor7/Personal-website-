"use client";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Link } from "next-view-transitions";
import { Fragment, useRef } from "react";
import { useCalm } from "../motion";
import { showPreview } from "../Preview";

/** Plain words, a link, or a small picture set into the line. */
export type Part =
  | string
  | { text: string; href: string; ext?: boolean }
  | { pic: string; big?: string };
export type Para = { parts: Part[]; muted?: boolean };

/** One word, which goes from faint to full as the reader scrolls past it. */
function W({
  p,
  from,
  to,
  children,
}: {
  p: MotionValue<number>;
  from: number;
  to: number;
  children: string;
}) {
  const opacity = useTransform(p, [from, to], [0.16, 1]);
  return (
    <motion.span data-reveal style={{ opacity }}>
      {children}
    </motion.span>
  );
}

/**
 * A small real photo set into the sentence. It grows into place as the reader
 * reaches it; pointing at it lifts it and shows it larger beside the cursor.
 */
function Pic({
  p,
  from,
  to,
  src,
  big,
  calm,
}: {
  p: MotionValue<number>;
  from: number;
  to: number;
  src: string;
  big?: string;
  calm: boolean;
}) {
  const opacity = useTransform(p, [from, to], [0.16, 1]);
  const scale = useTransform(p, [from, to], [0.4, 1]);
  return (
    <motion.span
      aria-hidden="true"
      className="relative -top-[0.07em] mx-[0.02em] inline-block align-middle"
      style={calm ? undefined : { opacity, scale }}
      onPointerEnter={(e) =>
        e.pointerType === "mouse" &&
        showPreview({ src: big ?? src, shape: "wide" })
      }
      onPointerLeave={() => showPreview(null)}
    >
      <span className="block h-[1.05em] w-[2.1em] overflow-hidden rounded-full bg-card shadow-[0_8px_18px_-10px_rgb(var(--fg)/0.7)] ring-2 ring-white transition-transform duration-300 ease-out hover:-rotate-3 hover:scale-110">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </span>
    </motion.span>
  );
}

/**
 * Paragraphs that fill in, word by word, as you scroll through them. Links
 * stay links. With reduced motion (or no JavaScript) they are simply there.
 */
export function Fill({
  paras,
  className = "",
}: {
  paras: Para[];
  className?: string;
}) {
  const calm = useCalm();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  });

  // Number every word so each knows where it falls in the whole.
  let total = 0;
  for (const para of paras)
    for (const part of para.parts)
      total +=
        typeof part === "object" && "pic" in part
          ? 1
          : (typeof part === "string" ? part : part.text)
              .split(/\s+/)
              .filter(Boolean).length;
  let n = 0;
  const words = (text: string) =>
    text.split(/(\s+)/).map((w, i) => {
      if (!w.trim()) return <Fragment key={i}>{w}</Fragment>;
      if (calm) return <Fragment key={i}>{w}</Fragment>;
      const at = n++ / total;
      return (
        <W key={i} p={scrollYProgress} from={at * 0.88} to={at * 0.88 + 0.12}>
          {w}
        </W>
      );
    });

  return (
    <div ref={ref} className={className}>
      {paras.map((para, i) => (
        <p key={i} className={para.muted ? "text-muted" : undefined}>
          {para.parts.map((part, j) =>
            typeof part === "string" ? (
              <Fragment key={j}>{words(part)}</Fragment>
            ) : "pic" in part ? (
              <Pic
                key={j}
                p={scrollYProgress}
                from={(n / total) * 0.88}
                to={(n++ / total) * 0.88 + 0.12}
                src={part.pic}
                big={part.big}
                calm={calm}
              />
            ) : part.ext ? (
              <a
                key={j}
                href={part.href}
                className="link whitespace-nowrap text-fg"
                {...(part.href.startsWith("http") || part.href.endsWith(".pdf")
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                {words(part.text)}
              </a>
            ) : (
              <Link key={j} href={part.href} className="link whitespace-nowrap text-fg">
                {words(part.text)}
              </Link>
            ),
          )}
        </p>
      ))}
    </div>
  );
}
