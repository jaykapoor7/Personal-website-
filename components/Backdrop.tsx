import { SystemsField } from "./home/SystemsField";

/**
 * The backgrounds behind the hero and the page: drifting blue washes over a
 * faint grid. Decoration only; hidden from assistive technology.
 */
export function HeroBackdrop({ active = true }: { active?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(160deg,#e6edff_0%,#f3f6ff_45%,#ffffff_100%)]" />
      <span
        className="wash-lo wash-lo-a left-[20%] top-[30%]"
        style={{ ["--wash-a" as string]: 0.22 }}
      />
      <span
        className="wash-lo wash-lo-b left-[88%] top-[62%]"
        style={{
          ["--wash" as string]: "96 140 255",
          ["--wash-a" as string]: 0.26,
        }}
      />
      <SystemsField active={active} />
    </div>
  );
}

/**
 * Behind the white sheet: a dot grid and soft blue washes, painted once so
 * scrolling past them costs nothing. (A drifting version cost frames.)
 */
export function SheetBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-t-[inherit]"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(900px 700px at 100% 4%, rgb(35 70 168 / 0.13), transparent 70%)",
            "radial-gradient(1000px 800px at 0% 26%, rgb(96 140 255 / 0.15), transparent 70%)",
            "radial-gradient(900px 700px at 100% 50%, rgb(35 70 168 / 0.11), transparent 70%)",
            "radial-gradient(1000px 800px at 0% 74%, rgb(96 140 255 / 0.13), transparent 70%)",
          ].join(","),
        }}
      />
      <div className="grid-dots [mask-image:linear-gradient(to_bottom,#000,rgba(0,0,0,0.35)_40%,#000_100%)]" />
    </div>
  );
}
