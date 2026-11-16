"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { useState } from "react";
import { useCalm } from "../motion";
import { small } from "../WorkRow";

export type Tile = {
  label: string;
  count: string;
  href: string;
  pics: string[];
  /** Documents and photos stand up; screenshots lie down. */
  tall?: boolean;
};

/** Where each picture in a stack rests, and where it goes when the stack fans out. */
const rest = [
  { x: -7, y: 2, rotate: -8 },
  { x: 7, y: 2, rotate: 7 },
  { x: 0, y: 0, rotate: -1 },
];
const open = [
  { x: -30, y: -2, rotate: -16 },
  { x: 30, y: -2, rotate: 14 },
  { x: 0, y: -8, rotate: 0 },
];

/**
 * The ways into the site, one cell each: a small stack of what is inside,
 * which fans out when you point at it or tab to it.
 */
export function Tiles({ tiles }: { tiles: Tile[] }) {
  const calm = useCalm();
  const [fan, setFan] = useState<number | null>(null);
  return (
    <nav aria-label="Sections">
      <ul className="grid grid-cols-2 gap-px border-y border-line bg-line sm:grid-cols-4 lg:grid-cols-2">
        {tiles.map((t, i) => (
          <li
            key={t.label}
            className="bg-bg"
            onPointerEnter={(e) => e.pointerType === "mouse" && setFan(i)}
            onPointerLeave={() => setFan(null)}
            onFocus={() => setFan(i)}
            onBlur={() => setFan(null)}
          >
            <motion.div
              initial={false}
              animate={!calm && fan === i ? "open" : "rest"}
              className="h-full"
            >
              <Link
                href={t.href}
                className="group flex h-full flex-col items-center px-3 pb-4 pt-6 text-center transition-colors duration-300 hover:bg-card/60 focus-visible:outline-offset-[-2px]"
              >
                <span className="relative grid h-[64px] w-[88px] place-items-center" aria-hidden="true">
                  {t.pics.slice(0, 3).map((src, k) => (
                    <motion.span
                      key={src}
                      variants={{ rest: rest[k], open: open[k] }}
                      transition={{ type: "spring", stiffness: 320, damping: 20 }}
                      className={`absolute overflow-hidden rounded-[4px] bg-white shadow-[0_0_0_1px_rgb(var(--fg)/0.1),0_4px_10px_-6px_rgb(var(--fg)/0.35)] ${
                        t.tall ? "h-[56px] w-[42px]" : "h-[40px] w-[60px]"
                      }`}
                      style={{ zIndex: k }}
                    >
                      <Image
                        src={small(src)!}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-cover object-top"
                      />
                    </motion.span>
                  ))}
                </span>
                <span className="mt-3 text-[14px] font-medium">{t.label}</span>
                <span className="text-[12.5px] text-muted">{t.count}</span>
              </Link>
            </motion.div>
          </li>
        ))}
      </ul>
    </nav>
  );
}
