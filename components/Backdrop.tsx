/**
 * The backgrounds behind the hero and the page: drifting blue washes over a
 * faint grid. Decoration only; hidden from assistive technology.
 */
export function HeroBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(160deg,#e9efff_0%,#f4f7ff_45%,#ffffff_100%)]" />
      <div className="grid-lines" />
      <span
        className="wash-lo wash-lo-a left-[23%] top-[38%]"
        style={{ ["--wash-a" as string]: 0.26 }}
      />
      <span
        className="wash-lo wash-lo-b left-[87%] top-[57%]"
        style={{
          ["--wash" as string]: "96 140 255",
          ["--wash-a" as string]: 0.3,
        }}
      />
      <span
        className="wash-lo wash-lo-c left-[52%] top-[86%]"
        style={{
          ["--wash" as string]: "30 58 138",
          ["--wash-a" as string]: 0.16,
        }}
      />
    </div>
  );
}

/**
 * Behind the white sheet: a dot grid and soft blue washes down its length.
 * The washes are painted once into the background, so scrolling past them
 * costs nothing.
 */
export function SheetBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-t-[inherit]"
      style={{
        backgroundImage: [
          "radial-gradient(900px 700px at 100% 2%, rgb(35 70 168 / 0.12), transparent 70%)",
          "radial-gradient(1000px 800px at 0% 26%, rgb(96 140 255 / 0.13), transparent 70%)",
          "radial-gradient(900px 700px at 100% 54%, rgb(35 70 168 / 0.1), transparent 70%)",
          "radial-gradient(1000px 800px at 0% 80%, rgb(96 140 255 / 0.12), transparent 70%)",
        ].join(","),
      }}
    >
      <div className="grid-dots [mask-image:linear-gradient(to_bottom,#000,rgba(0,0,0,0.35)_40%,#000_100%)]" />
    </div>
  );
}
