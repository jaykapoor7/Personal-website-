"use client";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Project } from "@/content/site";
import { BrowserFrame, Paper } from "./frames";
import { Arrow } from "./Arrow";

function PreviewCard({ p }: { p: Project }) {
  if (!p.preview) return null;
  if (p.preview.type === "doc")
    return (
      <Paper src={p.preview.cover} alt="" className="w-[250px]" sizes="250px" />
    );
  return (
    <BrowserFrame url={p.preview.url} className="deep-shadow w-[420px]">
      <div className="relative aspect-[16/10]">
        <Image
          src={p.preview.desktop}
          alt=""
          fill
          sizes="420px"
          className="object-cover object-top"
        />
      </div>
    </BrowserFrame>
  );
}

function Thumb({ p }: { p: Project }) {
  if (!p.preview) return null;
  const src =
    p.preview.type === "doc"
      ? p.preview.cover
      : (p.preview.mobile ?? p.preview.desktop);
  return (
    <span className="relative block h-16 w-12 shrink-0 overflow-hidden rounded-md border border-line bg-paper">
      <Image
        src={src}
        alt=""
        fill
        sizes="48px"
        className="object-cover object-top"
      />
    </span>
  );
}

/** A big list of work. On desktop the real preview follows the cursor. */
export function WorkIndex({ items }: { items: Project[] }) {
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();
  // Only mount the floating preview on the client, and never with reduced motion.
  const [follow, setFollow] = useState(false);
  useEffect(() => setFollow(!reduce), [reduce]);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 28, mass: 0.6 });
  const y = useSpring(my, { stiffness: 260, damping: 28, mass: 0.6 });
  const vx = useVelocity(x);
  const tilt = useTransform(vx, [-1500, 1500], [-10, 10], { clamp: true });

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        mx.set(e.clientX);
        my.set(e.clientY);
      }}
      onPointerLeave={() => setActive(null)}
    >
      <ul className="border-t border-line">
        {items.map((p, i) => (
          <li key={p.slug}>
            <Link
              href={`/work/${p.slug}`}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(null)}
              className={`group flex items-center gap-5 border-b border-line py-5 transition-opacity duration-300 md:py-7 ${
                active !== null && active !== i ? "md:opacity-30" : ""
              }`}
            >
              <span className="md:hidden">
                <Thumb p={p} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="display block text-[clamp(34px,6.6vw,96px)] transition-transform duration-500 ease-out md:group-hover:translate-x-4">
                  {p.title}
                </span>
                <span className="mt-1 block text-[15px] text-muted md:hidden">
                  {p.role}, {p.period}
                </span>
              </span>
              <span className="hidden shrink-0 text-right md:block">
                <span className="block text-[15px] font-medium">{p.role}</span>
                <span className="block text-[15px] text-muted">{p.period}</span>
              </span>
              <Arrow className="hidden shrink-0 text-xl text-muted transition-all duration-300 group-hover:rotate-45 group-hover:text-accent md:block" />
            </Link>
          </li>
        ))}
      </ul>
      {follow && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
          style={{ x, y, rotate: tilt }}
        >
          {items.map((p, i) => (
            <motion.div
              key={p.slug}
              className="absolute left-8 -translate-y-1/2"
              initial={false}
              animate={{
                opacity: active === i ? 1 : 0,
                scale: active === i ? 1 : 0.85,
              }}
              transition={{ duration: 0.25 }}
            >
              <PreviewCard p={p} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
