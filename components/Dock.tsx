"use client";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { person, portrait } from "@/content/site";
import { useCalm, useMedia } from "./motion";

const icon = {
  work: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </>
  ),
  writing: (
    <>
      <path d="M7 3.5h7l4 4V20a.5.5 0 0 1-.5.5h-10A.5.5 0 0 1 7 20z" />
      <path d="M14 3.5V8h4M10 12h5M10 15.5h5" />
    </>
  ),
  photos: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="2" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m4 17 5-4.5 3.5 3 3-2.5L20 17" />
    </>
  ),
  play: (
    <>
      <rect x="3" y="7" width="18" height="11" rx="5" />
      <path d="M8 10.5v4M6 12.5h4" />
      <circle cx="15.5" cy="11.5" r=".9" fill="currentColor" />
      <circle cx="17.5" cy="13.5" r=".9" fill="currentColor" />
    </>
  ),
  resume: (
    <>
      <path d="M7 3.5h7l4 4V20a.5.5 0 0 1-.5.5h-10A.5.5 0 0 1 7 20z" />
      <path d="M12.5 11v6M10 14.5l2.5 2.5 2.5-2.5" />
    </>
  ),
  email: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
};

type Item = {
  label: string;
  href: string;
  glyph?: keyof typeof icon;
  external?: boolean;
  avatar?: boolean;
};

const items: Item[] = [
  { label: "Home", href: "/", avatar: true },
  { label: "All work", href: "/work/", glyph: "work" },
  { label: "Writing", href: "/#writing", glyph: "writing" },
  { label: "Photos", href: "/#photos", glyph: "photos" },
  { label: "Play", href: "/#play", glyph: "play" },
];
const contact: Item[] = [
  { label: "Resume", href: person.resume, glyph: "resume", external: true },
  { label: "Email", href: `mailto:${person.email}`, glyph: "email", external: true },
];

/** One icon. With a mouse it grows as the pointer comes near, like a dock. */
function DockItem({
  item,
  mouseX,
  grow,
  here,
}: {
  item: Item;
  mouseX: MotionValue<number>;
  grow: boolean;
  here: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const distance = useTransform(mouseX, (x) => {
    const b = ref.current?.getBoundingClientRect();
    return b ? x - b.x - b.width / 2 : Infinity;
  });
  const target = useTransform(distance, [-120, 0, 120], [40, 54, 40]);
  const size = useSpring(target, { mass: 0.1, stiffness: 200, damping: 14 });

  const face = (
    <motion.span
      ref={ref}
      style={grow ? { width: size, height: size } : { width: 40, height: 40 }}
      className={`relative grid place-items-center rounded-full transition-colors duration-200 ${
        item.avatar ? "" : "text-muted group-hover:bg-card group-hover:text-fg"
      } ${here && !item.avatar ? "bg-card text-fg" : ""}`}
    >
      {item.avatar ? (
        <span className="relative block h-[78%] w-[78%] overflow-hidden rounded-full ring-1 ring-fg/10">
          <Image
            src={portrait.src.replace("-1280", "-400")}
            alt=""
            fill
            sizes="48px"
            className="object-cover object-[50%_58%]"
          />
        </span>
      ) : (
        <svg
          viewBox="0 0 24 24"
          className="h-[46%] w-[46%]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {icon[item.glyph!]}
        </svg>
      )}
    </motion.span>
  );

  const tip = (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-fg px-2 py-1 text-[12px] font-medium text-bg opacity-0 transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
    >
      {item.label}
    </span>
  );
  const cls = "group relative flex flex-col items-center";
  return (
    <li className="flex items-end">
      {item.external ? (
        <a
          href={item.href}
          aria-label={item.label}
          className={cls}
          {...(item.href.startsWith("http") || item.href.endsWith(".pdf")
            ? { target: "_blank", rel: "noreferrer" }
            : {})}
        >
          {tip}
          {face}
        </a>
      ) : (
        <Link
          href={item.href}
          aria-label={item.label}
          aria-current={here ? "page" : undefined}
          className={cls}
        >
          {tip}
          {face}
          {here && (
            <span
              aria-hidden="true"
              className="absolute -bottom-[5px] h-1 w-1 rounded-full bg-fg/60"
            />
          )}
        </Link>
      )}
    </li>
  );
}

/**
 * The way around the site: a small dock at the bottom of every page.
 * The places in the site, a divider, then the resume and email.
 */
export function Dock() {
  const path = usePathname() ?? "/";
  const fine = useMedia("(hover: hover) and (pointer: fine)");
  const calm = useCalm();
  const grow = fine && !calm;
  const mouseX = useMotionValue(Infinity);
  const isHere = (href: string) =>
    href === "/" ? path === "/" : !href.includes("#") && path.startsWith(href.replace(/\/$/, ""));

  return (
    <motion.nav
      aria-label="Main"
      initial={calm ? false : { y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.6 }}
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed inset-x-0 bottom-[max(12px,env(safe-area-inset-bottom))] z-50 mx-auto w-fit"
    >
      <ul className="flex h-[54px] items-end gap-1 rounded-2xl bg-bg/85 px-2 pb-[7px] shadow-[0_0_0_1px_rgb(var(--fg)/0.08),0_12px_32px_-12px_rgb(var(--fg)/0.35)] backdrop-blur-md">
        {items.map((it) => (
          <DockItem key={it.label} item={it} mouseX={mouseX} grow={grow} here={isHere(it.href)} />
        ))}
        <li aria-hidden="true" className="mx-1 mb-[9px] h-6 w-px self-end bg-line" />
        {contact.map((it) => (
          <DockItem key={it.label} item={it} mouseX={mouseX} grow={grow} here={false} />
        ))}
      </ul>
    </motion.nav>
  );
}
