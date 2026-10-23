"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const things = [
  { name: "Coffee cup", icon: "☕", color: "#e7a86c", x: 0.13, y: 0.2, r: -12 },
  { name: "Tennis ball", icon: "●", color: "#d7e76e", x: 0.28, y: 0.14, r: 7 },
  { name: "House keys", icon: "⚿", color: "#bbc4c0", x: 0.45, y: 0.25, r: 18 },
  { name: "Notebook", icon: "▤", color: "#a8c3e3", x: 0.63, y: 0.13, r: -8 },
  { name: "Flower", icon: "✿", color: "#f08d91", x: 0.83, y: 0.22, r: 15 },
  { name: "Orange", icon: "●", color: "#efa866", x: 0.18, y: 0.47, r: 9 },
  { name: "Envelope", icon: "✉", color: "#e5dec6", x: 0.38, y: 0.45, r: -11 },
  { name: "Music", icon: "♫", color: "#c7b2de", x: 0.56, y: 0.39, r: 10 },
  { name: "Camera", icon: "▣", color: "#727f8b", x: 0.78, y: 0.48, r: -13 },
  { name: "Star", icon: "★", color: "#f0c968", x: 0.11, y: 0.75, r: 14 },
  { name: "Book", icon: "▥", color: "#9ac2ad", x: 0.3, y: 0.69, r: -9 },
  { name: "Heart", icon: "♥", color: "#ea897e", x: 0.51, y: 0.76, r: 9 },
  { name: "Pencil", icon: "✎", color: "#e8b26d", x: 0.7, y: 0.69, r: 25 },
  { name: "Glasses", icon: "◉", color: "#ada6c8", x: 0.89, y: 0.76, r: -12 },
];

function ObjectDrawing({ index }: { index: number }) {
  const paths = [
    <>
      <path d="M7 10h18v18a6 6 0 0 1-6 6h-6a6 6 0 0 1-6-6z M25 13h3a5 5 0 0 1 0 10h-3 M11 6c0-3 3-3 3-6 M19 6c0-3 3-3 3-6" />
    </>,
    <>
      <circle cx="20" cy="20" r="16" />
      <path d="M5 17c10 0 11 7 13 17 M27 7c-1 10 5 15 10 15" />
    </>,
    <>
      <circle cx="13" cy="24" r="7" />
      <path d="M20 24h18 M28 24v6 M34 24v5" />
    </>,
    <>
      <rect x="7" y="4" width="27" height="33" rx="2" />
      <path d="M13 4v33 M18 13h11 M18 19h11 M18 25h9" />
    </>,
    <>
      <circle cx="20" cy="20" r="5" />
      <circle cx="20" cy="8" r="5" />
      <circle cx="31" cy="15" r="5" />
      <circle cx="27" cy="30" r="5" />
      <circle cx="13" cy="30" r="5" />
      <circle cx="9" cy="15" r="5" />
    </>,
    <>
      <circle cx="20" cy="22" r="15" />
      <path d="M20 7c0-4 3-6 6-6 M20 8c-4-5-7-5-10-3" />
    </>,
    <>
      <rect x="3" y="10" width="34" height="22" rx="2" />
      <path d="M4 12l16 13 16-13" />
    </>,
    <>
      <path d="M18 7v22a5 5 0 1 1-3-5 M18 9l15-3v20a5 5 0 1 1-3-5 M18 14l15-3" />
    </>,
    <>
      <rect x="4" y="12" width="32" height="23" rx="3" />
      <circle cx="20" cy="23" r="7" />
      <path d="M10 12l3-5h14l3 5 M31 17h1" />
    </>,
    <>
      <path d="M20 2l5 12 13 1-10 9 3 13-11-7-11 7 3-13-10-9 13-1z" />
    </>,
    <>
      <path d="M5 6h15c4 0 6 2 6 5v26c-2-3-4-4-7-4H5z M26 11c2-3 4-5 9-5v27c-4 0-7 1-9 4 M9 13h10 M9 18h10" />
    </>,
    <>
      <path d="M20 35C10 29 4 22 4 15a8 8 0 0 1 16-2 8 8 0 0 1 16 2c0 7-6 14-16 20z" />
    </>,
    <>
      <path d="M9 29l19-22 6 5-19 22-9 2z M24 11l6 5 M9 29l6 5" />
    </>,
    <>
      <circle cx="11" cy="21" r="7" />
      <circle cx="29" cy="21" r="7" />
      <path d="M18 20h4 M4 19l-2-3 M36 19l2-3" />
    </>,
  ];
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      {paths[index]}
    </svg>
  );
}

export function EverythingFalls({ compact = false }: { compact?: boolean }) {
  const stage = useRef<HTMLDivElement>(null),
    engine = useRef<Matter.Engine | null>(null),
    bodies = useRef<Matter.Body[]>([]),
    frame = useRef(0),
    drag = useRef<{
      body: Matter.Body;
      id: number;
      lastX: number;
      lastY: number;
      lastT: number;
      vx: number;
      vy: number;
    } | null>(null);
  const [zero, setZero] = useState(false),
    [round, setRound] = useState(0),
    [started, setStarted] = useState(false);
  const reset = useCallback(() => {
    setRound((n) => n + 1);
    setStarted(false);
  }, []);
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    let width = el.clientWidth;
    const observer = new ResizeObserver(() => {
      if (Math.abs(el.clientWidth - width) > 10) {
        width = el.clientWidth;
        drag.current = null;
        setRound((n) => n + 1);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const width = el.clientWidth,
      height = el.clientHeight;
    if (!width || !height) return;
    const e = Matter.Engine.create({ gravity: { x: 0, y: zero ? 0 : 1.15 } });
    engine.current = e;
    const size = Math.max(50, Math.min(78, width / 8.5));
    const items = things.map((item, i) =>
      Matter.Bodies.rectangle(item.x * width, item.y * height, size, size, {
        friction: 0.42,
        restitution: 0.48,
        frictionAir: 0.013,
        angle: (item.r * Math.PI) / 180,
        label: item.name,
        isStatic: true,
      }),
    );
    bodies.current = items;
    const walls = [
      Matter.Bodies.rectangle(width / 2, height + 28, width + 100, 56, {
        isStatic: true,
      }),
      Matter.Bodies.rectangle(-28, height / 2, 56, height * 2, {
        isStatic: true,
      }),
      Matter.Bodies.rectangle(width + 28, height / 2, 56, height * 2, {
        isStatic: true,
      }),
    ];
    Matter.Composite.add(e.world, [...items, ...walls]);
    let previous = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - previous, 33);
      previous = now;
      Matter.Engine.update(e, dt);
      items.forEach((b, i) => {
        const node = el.querySelector<HTMLElement>(`[data-object="${i}"]`);
        if (node)
          node.style.transform = `translate3d(${b.position.x - size / 2}px,${b.position.y - size / 2}px,0) rotate(${b.angle}rad)`;
      });
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame.current);
      Matter.Composite.clear(e.world, false);
      Matter.Engine.clear(e);
      engine.current = null;
    };
  }, [round]);
  useEffect(() => {
    if (engine.current) engine.current.gravity.y = zero ? 0 : 1.15;
  }, [zero]);
  const releaseAll = () => {
    bodies.current.forEach((b) => {
      if (b.isStatic) Matter.Body.setStatic(b, false);
    });
    setStarted(true);
  };
  const point = (event: React.PointerEvent) => {
    const rect = stage.current!.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };
  const down = (event: React.PointerEvent<HTMLButtonElement>, i: number) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    releaseAll();
    const p = point(event);
    const b = bodies.current[i];
    Matter.Body.setStatic(b, true);
    drag.current = {
      body: b,
      id: event.pointerId,
      lastX: p.x,
      lastY: p.y,
      lastT: performance.now(),
      vx: 0,
      vy: 0,
    };
  };
  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== event.pointerId) return;
    const p = point(event);
    const now = performance.now(),
      dt = Math.max(8, now - d.lastT);
    d.vx = ((p.x - d.lastX) / dt) * 16;
    d.vy = ((p.y - d.lastY) / dt) * 16;
    Matter.Body.setPosition(d.body, p);
    d.lastX = p.x;
    d.lastY = p.y;
    d.lastT = now;
  };
  const up = (event: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== event.pointerId) return;
    Matter.Body.setStatic(d.body, false);
    Matter.Body.setVelocity(d.body, { x: d.vx * 0.65, y: d.vy * 0.65 });
    drag.current = null;
  };
  return (
    <div className={`falls ${compact ? "falls-compact" : ""}`}>
      <div className="falls-toolbar">
        <span>
          <i className="live-dot" />{" "}
          {started ? "things in motion" : "pick something up"}
        </span>
        <div>
          <button
            type="button"
            aria-pressed={zero}
            onClick={() => setZero((v) => !v)}
          >
            {zero ? "Gravity off" : "Gravity on"}
          </button>
          <button type="button" onClick={reset}>
            Reset ↺
          </button>
        </div>
      </div>
      <div
        ref={stage}
        className="falls-stage"
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        aria-label="Drag the illustrated objects to make them fall"
      >
        {things.map((item, i) => (
          <button
            type="button"
            data-object={i}
            className="falls-object"
            key={item.name}
            aria-label={`Drag ${item.name}`}
            onClick={releaseAll}
            onKeyDown={(e) => {
              if (
                ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(
                  e.key,
                )
              ) {
                e.preventDefault();
                releaseAll();
                const b = bodies.current[i];
                if (b) {
                  Matter.Body.setStatic(b, false);
                  Matter.Body.setVelocity(b, {
                    x:
                      e.key === "ArrowLeft"
                        ? -8
                        : e.key === "ArrowRight"
                          ? 8
                          : 0,
                    y: e.key === "ArrowUp" ? -12 : 3,
                  });
                }
              }
            }}
            onPointerDown={(e) => down(e, i)}
            style={{ background: item.color }}
          >
            <ObjectDrawing index={i} />
          </button>
        ))}
      </div>
      <p className="falls-caption">
        Drag and release. Keyboard: Enter or arrow keys.
      </p>
    </div>
  );
}
