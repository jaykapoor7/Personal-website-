export function Arrow({
  className = "",
  direction = "up",
}: {
  className?: string;
  direction?: "up" | "right" | "left";
}) {
  const d =
    direction === "right"
      ? "M4 12h16M14 6l6 6-6 6"
      : direction === "left"
        ? "M20 12H4M10 6l-6 6 6 6"
        : "M7 17L17 7M8 7h9v9";
  return (
    <svg
      className={`h-[1em] w-[1em] shrink-0 ${className}`}
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}
