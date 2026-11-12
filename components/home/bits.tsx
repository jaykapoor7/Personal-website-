"use client";
import Image from "next/image";

/** A square logo on a white tile. Ventures without a logo get their initial. */
export function LogoTile({
  src,
  name,
  className = "h-10 w-10 rounded-xl text-[15px]",
}: {
  src?: string;
  name: string;
  className?: string;
}) {
  return src ? (
    <span
      className={`relative grid shrink-0 place-items-center overflow-hidden bg-white ring-1 ring-line ${className}`}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="64px"
        className="object-contain p-[9%]"
      />
    </span>
  ) : (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center bg-accent font-semibold text-white ${className}`}
    >
      {name.replace(/^The /, "")[0]}
    </span>
  );
}

/**
 * A photo in the site's two tones. It shows in blue and white until `on`,
 * then in its own colours. The blue version is a baked file
 * (scripts/make-duo.mjs), so nothing is blended or filtered while you scroll.
 */
export function Duo({
  src,
  duo,
  alt,
  on,
  fit = "",
  sizes = "600px",
}: {
  src: string;
  duo: string;
  alt: string;
  on: boolean;
  fit?: string;
  sizes?: string;
}) {
  return (
    <span className="relative block h-full w-full overflow-hidden bg-accent">
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={`object-cover ${fit}`}
      />
      <Image
        src={duo}
        alt=""
        aria-hidden="true"
        fill
        sizes={sizes}
        className={`object-cover transition-opacity duration-700 ease-out ${fit} ${
          on ? "opacity-0" : "opacity-100"
        }`}
      />
    </span>
  );
}
