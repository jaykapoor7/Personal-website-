import type { ElementType } from "react";

// Kept as a plain passthrough (the decode animation was removed for a calmer,
// minimal feel). Renders the text directly.
export function Scramble({
  text,
  as,
  className,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  speed?: number;
}) {
  const Tag: ElementType = as ?? "span";
  return <Tag className={className}>{text}</Tag>;
}
