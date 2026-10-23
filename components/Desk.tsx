"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export type DeskItem = {
  id: string;
  label: string;
  /** Where a tap goes; leave out for things that are only for moving around. */
  href?: string;
  /** Position on the desk, as percentages of its width and height. */
  x: number;
  y: number;
  rotate: number;
  width: number;
  node: React.ReactNode;
};

/** A desk of real things. Drag them around; tap one to open it. */
export function Desk({
  items,
  className = "",
  children,
}: {
  items: DeskItem[];
  className?: string;
  children?: React.ReactNode;
}) {
  const desk = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const reduce = useReducedMotion();
  const [order, setOrder] = useState(items.map((i) => i.id));
  // A drag should never count as a click.
  const dragged = useRef(false);

  const raise = (id: string) =>
    setOrder((o) => [...o.filter((x) => x !== id), id]);
  const open = (href: string) =>
    href.startsWith("http") || href.endsWith(".pdf")
      ? window.open(href, "_blank", "noopener")
      : router.push(href);

  return (
    <div ref={desk} className={`relative ${className}`}>
      {children}
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          role={item.href ? "link" : undefined}
          tabIndex={item.href ? 0 : undefined}
          aria-label={item.href ? `Open ${item.label}` : undefined}
          className="absolute cursor-grab touch-none outline-none active:cursor-grabbing"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            width: item.width,
            zIndex: 10 + order.indexOf(item.id),
          }}
          initial={
            reduce
              ? false
              : { opacity: 0, y: 160, rotate: item.rotate * 3, scale: 0.85 }
          }
          animate={{ opacity: 1, y: 0, rotate: item.rotate, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 90,
            damping: 16,
            delay: 0.25 + i * 0.09,
          }}
          drag
          dragConstraints={desk}
          dragElastic={0.12}
          dragTransition={{ power: 0.25, timeConstant: 260 }}
          whileHover={{ scale: 1.025 }}
          whileDrag={{ scale: 1.06, rotate: 0, cursor: "grabbing" }}
          onPointerDown={() => {
            dragged.current = false;
            raise(item.id);
          }}
          onDragStart={() => (dragged.current = true)}
          onTap={() => !dragged.current && item.href && open(item.href)}
          onKeyDown={(e) => e.key === "Enter" && item.href && open(item.href)}
        >
          <div className="pointer-events-none">{item.node}</div>
        </motion.div>
      ))}
    </div>
  );
}

/** The same items as a swipeable row, for touch screens. */
export function DeskRow({ items }: { items: DeskItem[] }) {
  return (
    <div className="flex snap-x snap-mandatory items-center gap-6 overflow-x-auto px-6 py-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {items.map((item) => {
        const style = {
          width: Math.min(item.width, 300),
          transform: `rotate(${item.rotate * 0.6}deg)`,
        };
        return item.href ? (
          <a
            key={item.id}
            href={item.href}
            target={
              item.href.startsWith("http") || item.href.endsWith(".pdf")
                ? "_blank"
                : undefined
            }
            rel="noreferrer"
            aria-label={item.label}
            className="shrink-0 snap-center"
            style={style}
          >
            {item.node}
          </a>
        ) : (
          <div key={item.id} className="shrink-0 snap-center" style={style}>
            {item.node}
          </div>
        );
      })}
    </div>
  );
}
