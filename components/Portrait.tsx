import { profile } from "@/content/profile";

// Portrait with a graceful fallback. Until a real photo is dropped at
// public/jay-kapoor.jpg (and profile.portrait.available flipped to true), an
// on-brand placeholder renders instead of a broken image.
export function Portrait({
  className = "",
  aspect = "aspect-[4/5]",
}: {
  className?: string;
  aspect?: string;
}) {
  const { src, alt, available } = profile.portrait;

  if (available) {
    // Plain <img>: the static export runs with unoptimized images.
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={alt}
        className={`${aspect} w-full rounded-sm border border-line object-cover grayscale ${className}`}
      />
    );
  }

  return (
    <div
      className={`${aspect} flex w-full flex-col items-center justify-center gap-3 rounded-sm border border-dashed border-line bg-line/20 ${className}`}
      role="img"
      aria-label={`${alt} — portrait coming soon`}
    >
      <span className="display text-5xl text-muted">JK</span>
      <span className="text-xs uppercase tracking-widest text-muted/70">
        Portrait — add photo
      </span>
    </div>
  );
}
