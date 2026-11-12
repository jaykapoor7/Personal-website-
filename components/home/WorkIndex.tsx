"use client";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  byGroup,
  groups,
  items,
  slug,
  type Group,
  type Item,
  type Look,
} from "@/content/work";
import { scrollToEl } from "@/lib/jump";
import { Arrow } from "../Arrow";
import { ease, useMedia } from "../motion";
import { LogoTile } from "./bits";

type Filter = "All" | Group;

/** The preview's size for each kind of picture. */
const size: Record<Look, { w: number; h: number }> = {
  shot: { w: 420, h: 262 },
  doc: { w: 250, h: 340 },
  photo: { w: 260, h: 340 },
  phone: { w: 176, h: 360 },
  logo: { w: 220, h: 220 },
};

/** The picture for one item: an image, or its logo on a tint. */
function Picture({ it, sizes }: { it: Item; sizes: string }) {
  if (it.image)
    return (
      <Image
        src={it.image}
        alt=""
        fill
        sizes={sizes}
        className={`object-cover ${it.look === "photo" ? "object-[50%_40%]" : "object-top"}`}
      />
    );
  return (
    <span className="absolute inset-0 grid place-items-center bg-card">
      <LogoTile
        src={it.logo}
        name={it.name}
        className="h-1/2 w-1/2 rounded-[22%] text-[28px]"
      />
    </span>
  );
}

/** A link to an item: in-app pages move without a reload; files and other sites open plainly. */
function Go({
  it,
  className,
  children,
  ...rest
}: {
  it: Item;
  className: string;
  children: React.ReactNode;
  onPointerMove?: (e: React.PointerEvent) => void;
  onFocus?: () => void;
}) {
  if (!it.plain)
    return (
      <Link href={it.href} className={className} {...rest}>
        {children}
      </Link>
    );
  const away = it.href.startsWith("http") || /\.\w+$/.test(it.href);
  return (
    <a
      href={it.href}
      className={className}
      {...(away ? { target: "_blank", rel: "noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}

const Row = memo(function Row({
  it,
  onShow,
  fine,
}: {
  it: Item;
  onShow: (it: Item) => void;
  fine: boolean;
}) {
  return (
    <Go
      it={it}
      onPointerMove={
        fine ? (e) => e.pointerType === "mouse" && onShow(it) : undefined
      }
      onFocus={fine ? () => onShow(it) : undefined}
      className="work-row group grid grid-cols-[52px_minmax(0,1fr)_auto] items-center gap-x-4 border-b border-line py-3.5 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)_64px_28px] md:gap-x-8 md:py-[18px]"
    >
      <span className="relative block h-[52px] w-[52px] self-start overflow-hidden rounded-xl bg-card ring-1 ring-line md:hidden">
        <Picture it={it} sizes="52px" />
      </span>
      <span className="min-w-0">
        <span className="block text-[clamp(20px,2.2vw,32px)] md:truncate font-semibold leading-tight tracking-[-0.025em] transition-[transform,color] duration-500 ease-out group-hover:translate-x-1.5 group-hover:text-accent">
          {it.name}
        </span>
        <span className="mt-0.5 block text-[14.5px] leading-snug text-muted md:hidden">
          {it.line}
        </span>
      </span>
      <span className="hidden truncate text-[16px] text-muted md:block">
        {it.line}
      </span>
      <span className="self-start pt-1 text-right text-[14px] font-medium tabular-nums text-muted md:self-auto md:pt-0">
        {it.year}
      </span>
      <Arrow
        direction="right"
        className="hidden justify-self-end text-[20px] opacity-0 transition-[opacity,transform] duration-500 ease-out group-hover:translate-x-1 group-hover:opacity-100 md:block"
      />
    </Go>
  );
});

type Show = (it: Item | null) => void;

/**
 * The picture for the row under the cursor, eased after it and leaning with
 * its speed. It keeps its own state, so pointing at rows never redraws the list.
 */
function Preview({ bind }: { bind: React.MutableRefObject<Show> }) {
  const [shown, setShown] = useState<Item | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 320, damping: 32, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 320, damping: 32, mass: 0.5 });
  const rotate = useTransform(useVelocity(sx), [-2000, 0, 2000], [-7, 0, 7], {
    clamp: true,
  });
  const box = shown ? size[shown.look] : size.shot;
  const last = useRef<Item | null>(null);
  const boxRef = useRef(box);
  boxRef.current = box;

  useEffect(() => {
    bind.current = (it) => {
      if (it === last.current) return;
      last.current = it;
      setShown(it);
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const { w, h } = boxRef.current;
      const right = e.clientX + 28 + w < window.innerWidth - 16;
      x.set(right ? e.clientX + 28 : e.clientX - 28 - w);
      y.set(
        Math.min(Math.max(e.clientY - h / 2, 16), window.innerHeight - h - 16),
      );
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [bind, x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-40"
      style={{ x: sx, y: sy, rotate }}
    >
      <motion.div
        className="deep-shadow relative overflow-hidden rounded-2xl bg-card"
        initial={false}
        animate={{
          width: box.w,
          height: box.h,
          opacity: shown ? 1 : 0,
          scale: shown ? 1 : 0.6,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 32 }}
      >
        <AnimatePresence initial={false}>
          {shown && (
            <motion.div
              key={shown.id}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease }}
            >
              <Picture it={shown} sizes="420px" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/**
 * Everything I have done, as one short list. Filters narrow it to one kind;
 * with a mouse, the picture for the row you point at follows the cursor.
 */
export function WorkIndex() {
  const reduce = useReducedMotion();
  const fine = useMedia("(hover: hover) and (pointer: fine)");
  const preview = fine && !reduce;
  const [filter, setFilter] = useState<Filter>("All");
  const section = useRef<HTMLElement>(null);
  const show = useRef<Show>(() => {});
  const onShow = useCallback((it: Item | null) => show.current(it), []);

  // Filters live in the address, so /#research opens on research.
  useEffect(() => {
    const read = () => {
      const h = window.location.hash.slice(1);
      const g = groups.find((x) => slug(x) === h);
      if (!g) return;
      setFilter(g);
      show.current(null);
      if (section.current) scrollToEl(section.current);
    };
    // The page settles its height after mount; place the list once it has.
    const timers = [80, 450].map((ms) => setTimeout(read, ms));
    const on = () => setTimeout(read, 60);
    window.addEventListener("hashchange", on);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("hashchange", on);
    };
  }, []);
  const pick = (f: Filter) => {
    setFilter(f);
    show.current(null);
    history.replaceState(
      null,
      "",
      f === "All" ? window.location.pathname : `#${slug(f)}`,
    );
  };

  const visible = byGroup.filter((g) => filter === "All" || g.group === filter);
  const count = (f: Filter) =>
    f === "All" ? items.length : items.filter((i) => i.group === f).length;

  return (
    <section
      ref={section}
      id="work"
      aria-labelledby="work-h"
      className="shell mt-20 md:mt-28"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
        <h2 id="work-h" className="hero-title text-[clamp(40px,5.4vw,80px)]">
          Work
        </h2>
        <LayoutGroup>
          <div
            role="group"
            aria-label="Show"
            className="no-bar -mx-5 flex gap-1 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0"
          >
            {(["All", ...groups] as Filter[]).map((f) => {
              const on = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={on}
                  onClick={() => pick(f)}
                  className={`relative shrink-0 rounded-full px-4 py-2 text-[14.5px] font-semibold transition-colors duration-300 ${
                    on ? "text-white" : "text-muted hover:text-fg"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="work-filter"
                      className="absolute inset-0 rounded-full bg-fg"
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 420, damping: 34 }
                      }
                    />
                  )}
                  <span className="relative">
                    {f}{" "}
                    <span
                      className={`text-[12px] tabular-nums ${on ? "text-white/80" : "text-muted"}`}
                    >
                      {count(f)}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </div>

      <div className="mt-6 md:mt-10" onPointerLeave={() => show.current(null)}>
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map(({ group, items: list }) => (
            <motion.div
              key={group}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease }}
              className="mb-9 last:mb-0 md:mb-11"
            >
              {filter === "All" && (
                <h3 className="flex items-baseline gap-2 border-b border-fg pb-2.5 text-[15px] font-semibold">
                  {group}
                  <span className="text-[12px] font-medium tabular-nums text-muted">
                    {list.length}
                  </span>
                </h3>
              )}
              <ul
                className={`work-list ${filter === "All" ? "" : "border-t border-fg"}`}
              >
                {list.map((it, n) => (
                  <motion.li
                    key={it.id}
                    initial={reduce ? false : { opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -6% 0px" }}
                    transition={{ duration: 0.5, ease, delay: n * 0.03 }}
                  >
                    <Row it={it} onShow={onShow} fine={preview} />
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* The picture for the row under the cursor. Mouse only; decoration. */}
      {preview && <Preview bind={show} />}
    </section>
  );
}
