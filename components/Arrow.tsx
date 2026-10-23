export function Arrow({
  direction = "up",
}: {
  direction?: "up" | "down" | "right";
}) {
  return (
    <svg
      className={`arrow-icon arrow-${direction}`}
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 19L19 5M5 5h14v14" />
    </svg>
  );
}
