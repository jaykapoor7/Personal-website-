"use client";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { portrait } from "@/content/site";

/** Kept for the intro copy; renders the phrase as plain text. */
export function Mark({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

type Spot = { p: number; side: "left" | "right" };

/** The intro text, with a round photo the words wrap around. */
export function Intro({ paras }: { paras: React.ReactNode[] }) {
  const [spot, setSpot] = useState<Spot>({ p: 0, side: "left" });
  const box = useRef<HTMLDivElement>(null);
  // The photo stays put; dragging it around was more UI than it was worth.
  const fine = false;

  const drop = (x: number, y: number) => {
    const ps = Array.from(
      box.current?.querySelectorAll<HTMLElement>("[data-para]") ?? [],
    );
    let p = ps.findIndex((el) => {
      const r = el.getBoundingClientRect();
      return y >= r.top - 12 && y <= r.bottom + 12;
    });
    if (p < 0)
      p = y < (ps[0]?.getBoundingClientRect().top ?? 0) ? 0 : ps.length - 1;
    const r = ps[p].getBoundingClientRect();
    setSpot({ p, side: x < r.left + r.width / 2 ? "left" : "right" });
  };

  const photo = (
    <motion.span
      layoutId="intro-photo"
      drag={fine}
      dragSnapToOrigin
      dragElastic={0.6}
      whileDrag={{ scale: 1.08, zIndex: 20, cursor: "grabbing" }}
      onDragEnd={(_, info) =>
        drop(info.point.x - window.scrollX, info.point.y - window.scrollY)
      }
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`group relative mt-1 block h-[112px] w-[112px] select-none rounded-full p-1 md:h-[132px] md:w-[132px] ${
        fine ? "cursor-grab" : ""
      } ${spot.side === "left" ? "float-left mr-5" : "float-right ml-5"}`}
      style={{ shapeOutside: "circle(50%)" }}
    >
      <span className="relative block h-full w-full overflow-hidden rounded-full">
        <Image
          src={portrait.src}
          alt={portrait.alt}
          fill
          sizes="132px"
          className="pointer-events-none object-cover object-[50%_45%]"
          priority
        />
      </span>
      {fine && (
        <span
          aria-hidden="true"
          className={`absolute top-1/2 grid h-7 w-5 -translate-y-1/2 place-items-center rounded-md bg-paper text-muted ${
            spot.side === "left" ? "-left-3" : "-right-3"
          }`}
        >
          <svg viewBox="0 0 10 16" className="h-3 w-2" fill="currentColor">
            {[2, 8].flatMap((x) =>
              [2, 8, 14].map((y) => (
                <circle key={`${x}${y}`} cx={x} cy={y} r="1.3" />
              )),
            )}
          </svg>
        </span>
      )}
    </motion.span>
  );

  return (
    <div ref={box} className="space-y-5 text-[17.5px] leading-[1.75] text-fg">
      {paras.map((para, i) => (
        <motion.p
          key={i}
          data-para
          layout="position"
          className="[&::after]:clear-both [&::after]:block [&::after]:content-['']"
        >
          {spot.p === i && photo}
          {para}
        </motion.p>
      ))}
      {fine && (
        <p className="text-[13px] font-medium text-muted">
          Drag the photo into any paragraph.
        </p>
      )}
    </div>
  );
}

/** The left-hand menu; it follows you down the page. */
export function SectionMenu({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  const [on, setOn] = useState(items[0].id);
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => {
        const v = es
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        if (v) setOn(v.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);
  return (
    <nav
      aria-label="On this page"
      className="sticky top-[40vh] hidden lg:block"
    >
      <ul className="space-y-2.5">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              aria-current={on === it.id ? "true" : undefined}
              className={`flex items-center gap-2 text-[15px] transition-colors ${on === it.id ? "text-fg" : "text-muted hover:text-fg"}`}
            >
              {it.label}
              {on === it.id && (
                <motion.span
                  layoutId="menu-dot"
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                />
              )}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
