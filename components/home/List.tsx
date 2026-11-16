"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { useId, useState } from "react";
import { Arrow } from "../Arrow";
import { useCalm } from "../motion";
import { showPreview } from "../Preview";
import { small } from "../WorkRow";

export type Entry = {
  id: string;
  name: string;
  detail?: string;
  years?: string;
  href?: string;
  external?: boolean;
  /** A small picture on the row; it also feeds the cursor preview. */
  pic?: { src: string; shape: "wide" | "tall" | "square" };
  num?: string;
  /** Names the picture and title for the page transition into its case. */
  vt?: string;
};

function Go({
  e,
  className,
  children,
}: {
  e: Entry;
  className: string;
  children: React.ReactNode;
}) {
  if (!e.href) return <div className={className}>{children}</div>;
  if (e.external || e.href.startsWith("/research-models"))
    return (
      <a
        href={e.href}
        className={className}
        {...(e.external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {children}
      </a>
    );
  return (
    <Link href={e.href} className={className}>
      {children}
    </Link>
  );
}

const thumbBox = {
  wide: "h-[38px] w-[60px]",
  big: "h-[44px] w-[70px] lg:h-[70px] lg:w-[112px]",
  tall: "h-[38px] w-[29px]",
  square: "h-[40px] w-[40px]",
};

/**
 * A compact list in the manner of a CV. A soft highlight slides to the row
 * under the pointer or keyboard focus, rows rise in as they scroll into view,
 * and with a mouse the row's picture follows the cursor, larger.
 *
 * `one`: name, a dotted leader, then the year. `two`: name over a detail line.
 */
export function List({
  entries,
  variant = "two",
  big = false,
}: {
  entries: Entry[];
  variant?: "one" | "two";
  /** Larger pictures and names, for the selected work. */
  big?: boolean;
}) {
  const id = useId();
  const calm = useCalm();
  const [on, setOn] = useState<number | null>(null);

  return (
    <ul
      className="-mx-3"
      onPointerLeave={() => {
        setOn(null);
        showPreview(null);
      }}
    >
      {entries.map((e, i) => (
        <motion.li
          key={e.id}
          className="relative"
          initial={calm ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -5% 0px" }}
          transition={{ duration: 0.5, delay: Math.min(i, 8) * 0.04, ease: [0.16, 1, 0.3, 1] }}
          onPointerMove={(ev) => {
            if (ev.pointerType !== "mouse") return;
            if (on !== i) setOn(i);
            if (e.pic)
              showPreview({
                src: small(e.pic.src)!,
                shape: e.pic.shape === "wide" ? "wide" : "tall",
              });
          }}
          onFocus={() => setOn(i)}
          onBlur={() => setOn(null)}
        >
          {on === i && (
            <motion.span
              layoutId={`hl-${id}`}
              aria-hidden="true"
              className="absolute inset-0 rounded-lg bg-card"
              transition={
                calm
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 500, damping: 40 }
              }
            />
          )}
          <Go
            e={e}
            className={`group relative flex gap-3.5 rounded-lg px-3 focus-visible:outline-offset-0 ${
              variant === "one" ? "items-center py-2" : "items-start py-3"
            }`}
          >
            {e.num && (
              <span className="w-5 shrink-0 pt-[3px] font-mono text-[11px] tabular-nums text-faint">
                {e.num}
              </span>
            )}
            {e.pic && (
              <span
                className={`relative shrink-0 overflow-hidden rounded-[5px] bg-card ring-1 ring-inset ring-fg/[0.08] ${big && e.pic.shape === "wide" ? thumbBox.big : thumbBox[e.pic.shape]}`}
                style={e.vt ? { viewTransitionName: `shot-${e.vt}` } : undefined}
              >
                <Image
                  src={small(e.pic.src)!}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover object-top"
                />
              </span>
            )}
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2">
                <span
                  className={`truncate font-medium text-fg ${big ? "lg:text-[17px]" : ""}`}
                  style={e.vt ? { viewTransitionName: `title-${e.vt}` } : undefined}
                >
                  {e.name}
                </span>
                {e.href && (
                  <Arrow
                    direction={e.external ? "up" : "right"}
                    className="shrink-0 text-[0.8em] text-faint opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100"
                  />
                )}
                {variant === "one" && (
                  <span
                    aria-hidden="true"
                    className="mx-1 hidden h-px flex-1 border-t border-dotted border-faint/50 sm:block"
                  />
                )}
              </span>
              {variant === "two" && e.detail && (
                <span className="mt-0.5 block text-[13.5px] leading-snug text-muted">
                  {e.detail}
                </span>
              )}
            </span>
            {e.years && (
              <span
                className={`shrink-0 text-right font-mono text-[11.5px] tabular-nums text-faint ${
                  variant === "two" ? "pt-[3px]" : ""
                }`}
              >
                {e.years}
              </span>
            )}
          </Go>
        </motion.li>
      ))}
    </ul>
  );
}
