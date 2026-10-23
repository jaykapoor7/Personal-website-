import Image from "next/image";
import type { Project } from "@/content/site";

/** Unit charts for projects without photography: one mark per real unit. */
function Units({
  count,
  cols,
  size,
  gap,
  shape = "dot",
}: {
  count: number;
  cols: number;
  size: number;
  gap: number;
  shape?: "dot" | "square";
}) {
  return (
    <div
      aria-hidden="true"
      className="grid"
      style={{ gridTemplateColumns: `repeat(${cols}, ${size}px)`, gap }}
    >
      {Array.from({ length: count }, (_, i) => (
        <i
          key={i}
          className={`block bg-current ${shape === "dot" ? "rounded-full" : "rounded-[3px]"}`}
          style={{
            width: size,
            height: size,
            opacity: 0.35 + (0.65 * ((i * 37) % 11)) / 10,
          }}
        />
      ))}
    </div>
  );
}

const unitArt: Record<
  string,
  { tint: string; fg: string; caption: string; node: React.ReactNode }
> = {
  "project-nidaan": {
    tint: "bg-[#f3e8d3] dark:bg-[#2a2216]",
    fg: "text-[#7a4609] dark:text-[#f0b46a]",
    caption: "55 rider interviews · Bengaluru",
    node: <Units count={55} cols={11} size={14} gap={10} />,
  },
  "tot-schools": {
    tint: "bg-[#e3e9f6] dark:bg-[#161c2a]",
    fg: "text-[#2a46a3] dark:text-[#93abf5]",
    caption: "8 centres · 6 functions",
    node: (
      <div aria-hidden="true" className="grid grid-cols-4 gap-2.5">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="flex h-14 w-14 flex-col justify-between rounded-xl border p-2 sm:h-16 sm:w-16"
            style={{
              borderColor: "color-mix(in srgb, currentColor 30%, transparent)",
              background: "color-mix(in srgb, currentColor 7%, transparent)",
            }}
          >
            <span className="font-mono text-[10px]">0{i + 1}</span>
            <span className="grid grid-cols-3 gap-1">
              {Array.from({ length: 6 }, (_, j) => (
                <i
                  key={j}
                  className="h-1.5 rounded-full bg-current opacity-60"
                />
              ))}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  "finer-things-club": {
    tint: "bg-[#f4e1dc] dark:bg-[#2a1915]",
    fg: "text-[#8a3320] dark:text-[#f29a84]",
    caption: "300+ artisans onboarded",
    node: <Units count={300} cols={25} size={6} gap={6} />,
  },
};

export function ProjectVisual({
  project,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  project: Project;
  priority?: boolean;
  sizes?: string;
}) {
  if (project.image)
    return (
      <div
        className={`relative h-full w-full ${project.imageFit === "contain" ? "bg-white" : "bg-card"}`}
      >
        <Image
          src={project.image}
          alt={project.imageAlt || ""}
          fill
          priority={priority}
          sizes={sizes}
          className={`transition-transform duration-700 ease-out group-hover:scale-[1.03] ${
            project.imageFit === "contain"
              ? "object-contain p-4"
              : "object-cover"
          }`}
          style={{ objectPosition: project.imagePosition }}
        />
      </div>
    );
  const art = unitArt[project.slug];
  if (art)
    return (
      <div
        className={`relative flex h-full w-full flex-col items-center justify-center gap-6 ${art.tint} ${art.fg}`}
      >
        <div className="transition-transform duration-700 ease-out group-hover:scale-[1.03]">
          {art.node}
        </div>
        <p className="absolute bottom-4 left-5 font-mono text-[10.5px] uppercase tracking-[0.12em]">
          {art.caption}
        </p>
      </div>
    );
  return (
    <div className="flex h-full w-full items-end bg-card p-6">
      <span className="font-serif text-5xl italic text-muted">
        {project.title}
      </span>
    </div>
  );
}
