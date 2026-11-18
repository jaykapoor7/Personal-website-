"use client";
import { useEffect, useRef } from "react";

/**
 * The hero's background: a quiet network in the site's blue, like a map of a
 * system. Some links are broken (dashed, with a gap). Every couple of seconds
 * one of them is repaired: the gap closes and a light runs along it, and
 * somewhere else another link gives way. With a mouse, the points near the
 * pointer connect to it.
 *
 * It draws only while the hero is on screen and the page is still. People who
 * ask for reduced motion get one still frame.
 */

type Node = { x: number; y: number; hub: boolean };
type Edge = {
  a: number;
  b: number;
  broken: boolean;
  /** 0 to 1 while being repaired or breaking; -1 when settled. */
  t: number;
  mode: "repair" | "break" | null;
};

/** Line and point colours: blue on white, or white on the blue panel. */
const tones = {
  light: { ink: "35, 70, 168", soft: "96, 140, 255", k: 1 },
  dark: { ink: "255, 255, 255", soft: "200, 215, 255", k: 1.1 },
};

/** A small seeded random, so the network is the same on every visit. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

function build(w: number, h: number) {
  const rnd = seeded(7);
  const sp = w < 640 ? 74 : 92;
  const cols = Math.ceil(w / sp) + 2;
  const rows = Math.ceil(h / sp) + 2;
  const grid: (number | null)[][] = [];
  const nodes: Node[] = [];
  for (let r = 0; r < rows; r++) {
    grid[r] = [];
    for (let c = 0; c < cols; c++) {
      if (rnd() < 0.14) {
        grid[r][c] = null;
        continue;
      }
      const j = sp * 0.34;
      nodes.push({
        x: (c - 0.5) * sp + (rnd() * 2 - 1) * j,
        y: (r - 0.5) * sp + (rnd() * 2 - 1) * j,
        hub: rnd() < 0.07,
      });
      grid[r][c] = nodes.length - 1;
    }
  }
  const edges: Edge[] = [];
  const link = (a: number | null, b: number | null) => {
    if (a == null || b == null) return;
    edges.push({ a, b, broken: rnd() < 0.16, t: -1, mode: null });
  };
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const n = grid[r][c];
      if (rnd() < 0.82) link(n, grid[r]?.[c + 1] ?? null);
      if (rnd() < 0.82) link(n, grid[r + 1]?.[c] ?? null);
      if (rnd() < 0.18) link(n, grid[r + 1]?.[c + 1] ?? null);
    }
  return { nodes, edges };
}

const ease = (t: number) => 1 - Math.pow(1 - t, 3);

export function SystemsField({
  active,
  tone = "light",
  fade = "left",
  className = "max-md:opacity-60",
}: {
  /** Draw only while true. Left out, the field watches its own visibility. */
  active?: boolean;
  tone?: "light" | "dark";
  /** Which side fades out, drawn into the canvas (cheaper than a CSS mask). */
  fade?: "left" | "top";
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active ?? false);
  if (active !== undefined) activeRef.current = active;
  const watch = active === undefined;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { ink: BLUE, soft: SKY } = tones[tone];
    let io: IntersectionObserver | undefined;
    if (watch) {
      io = new IntersectionObserver(([e]) => {
        activeRef.current = e.isIntersecting;
        if (e.isIntersecting) loop();
      });
      io.observe(canvas);
    }
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let w = 0;
    let h = 0;
    let net = build(1, 1);
    let raf = 0;
    let last = 0;
    let nextEvent = 0;
    let scrolling = false;
    let scrollTimer: ReturnType<typeof setTimeout> | undefined;
    const mouse = { x: -9999, y: -9999, on: false };

    const size = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      net = build(w, h);
    };

    const draw = (now: number) => {
      const { nodes, edges } = net;
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round";

      // Whole links, in one stroke.
      ctx.beginPath();
      for (const e of edges) {
        if (e.broken || e.mode) continue;
        const a = nodes[e.a];
        const b = nodes[e.b];
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
      }
      ctx.strokeStyle = `rgba(${BLUE}, 0.13)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Broken links: dashed, with a gap in the middle.
      ctx.beginPath();
      for (const e of edges) {
        if (!e.broken || e.mode) continue;
        const a = nodes[e.a];
        const b = nodes[e.b];
        const mx = a.x + (b.x - a.x) * 0.38;
        const my = a.y + (b.y - a.y) * 0.38;
        const nx = a.x + (b.x - a.x) * 0.62;
        const ny = a.y + (b.y - a.y) * 0.62;
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(mx, my);
        ctx.moveTo(nx, ny);
        ctx.lineTo(b.x, b.y);
      }
      ctx.setLineDash([3, 4]);
      ctx.strokeStyle = `rgba(${SKY}, 0.32)`;
      ctx.stroke();
      ctx.setLineDash([]);

      // Links being repaired or breaking right now.
      for (const e of edges) {
        if (!e.mode) continue;
        const a = nodes[e.a];
        const b = nodes[e.b];
        const k = ease(Math.min(e.t, 1));
        const gap = e.mode === "repair" ? 0.12 * (1 - k) : 0.12 * k;
        const g0 = 0.5 - gap;
        const g1 = 0.5 + gap;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(a.x + (b.x - a.x) * g0, a.y + (b.y - a.y) * g0);
        ctx.moveTo(a.x + (b.x - a.x) * g1, a.y + (b.y - a.y) * g1);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle =
          e.mode === "repair"
            ? `rgba(${BLUE}, ${0.13 + 0.5 * (1 - k)})`
            : `rgba(${SKY}, ${0.13 + 0.2 * k})`;
        ctx.lineWidth = e.mode === "repair" ? 1.6 : 1;
        ctx.stroke();
        if (e.mode === "repair") {
          // A light runs along the mended link.
          const px = a.x + (b.x - a.x) * k;
          const py = a.y + (b.y - a.y) * k;
          ctx.beginPath();
          ctx.arc(px, py, 6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${SKY}, ${0.22 * (1 - k)})`;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(px, py, 2.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${BLUE}, ${0.9 * (1 - k * 0.6)})`;
          ctx.fill();
        }
        ctx.lineWidth = 1;
      }

      // Points, and hubs as small rings.
      ctx.beginPath();
      for (const n of nodes) {
        if (n.hub) continue;
        ctx.rect(n.x - 1.1, n.y - 1.1, 2.2, 2.2);
      }
      ctx.fillStyle = `rgba(${BLUE}, 0.3)`;
      ctx.fill();
      ctx.beginPath();
      for (const n of nodes) {
        if (!n.hub) continue;
        ctx.moveTo(n.x + 4, n.y);
        ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
      }
      ctx.strokeStyle = `rgba(${BLUE}, 0.4)`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.lineWidth = 1;

      // The pointer joins the points near it.
      if (mouse.on) {
        const R = 170;
        for (const n of nodes) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d > R) continue;
          const f = 1 - d / R;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(n.x, n.y);
          ctx.strokeStyle = `rgba(${BLUE}, ${0.28 * f})`;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(n.x, n.y, 1.6 + 1.8 * f, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${BLUE}, ${0.35 + 0.5 * f})`;
          ctx.fill();
        }
      }
      // Fade one side out, so the network sits behind the words quietly.
      const g =
        fade === "left"
          ? ctx.createLinearGradient(0, 0, w * 0.65, 0)
          : ctx.createLinearGradient(0, 0, 0, h * 0.6);
      g.addColorStop(0, "rgba(0,0,0,0.72)");
      g.addColorStop(0.6, "rgba(0,0,0,0.45)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
      void now;
    };

    const step = (now: number) => {
      raf = 0;
      const dt = last ? Math.min(now - last, 50) : 16;
      last = now;
      const { edges } = net;
      // Move the repairs and breaks along.
      for (const e of edges) {
        if (!e.mode) continue;
        e.t += dt / (e.mode === "repair" ? 1300 : 900);
        if (e.t >= 1) {
          e.broken = e.mode === "break";
          e.mode = null;
          e.t = -1;
        }
      }
      // Every so often, mend one link and let another go.
      if (now > nextEvent) {
        nextEvent = now + 1100 + Math.random() * 900;
        const broken = edges.filter((e) => e.broken && !e.mode);
        const whole = edges.filter((e) => !e.broken && !e.mode);
        const fix = broken[Math.floor(Math.random() * broken.length)];
        if (fix) {
          fix.mode = "repair";
          fix.t = 0;
        }
        const brk = whole[Math.floor(Math.random() * whole.length)];
        if (brk && Math.random() < 0.9) {
          brk.mode = "break";
          brk.t = 0;
        }
      }
      draw(now);
      loop();
    };

    const loop = () => {
      if (raf || calm || scrolling || !activeRef.current || document.hidden)
        return;
      raf = requestAnimationFrame(step);
    };

    const onScroll = () => {
      scrolling = true;
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        scrolling = false;
        last = 0;
        loop();
      }, 180);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.on = mouse.x >= 0 && mouse.y >= 0 && mouse.x <= w && mouse.y <= h;
    };
    const onLeave = () => (mouse.on = false);
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        size();
        draw(performance.now());
      }, 150);
    };
    const onVisible = () => {
      last = 0;
      loop();
    };

    size();
    draw(0);
    loop();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisible);
    if (fine) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }
    const poll = setInterval(loop, 500); // picks up `active` changes
    return () => {
      io?.disconnect();
      cancelAnimationFrame(raf);
      clearInterval(poll);
      clearTimeout(scrollTimer);
      clearTimeout(resizeTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tone, fade]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
