"use client";
import Image from "next/image";
import { Reveal } from "../motion";

/** Keeps a hidden panel out of the tab order and the accessibility tree. */
export const inertIf = (hidden: boolean) =>
  hidden ? ({ inert: "", "aria-hidden": true } as object) : {};

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

/** The first page of a document. */
export function Paper({
  src,
  alt,
  className = "",
  ratio = "aspect-[900/1273]",
  sizes = "240px",
}: {
  src: string;
  alt: string;
  className?: string;
  ratio?: string;
  sizes?: string;
}) {
  return (
    <span
      className={`paper-shadow relative block overflow-hidden bg-white ${ratio} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover object-top"
      />
    </span>
  );
}

/**
 * A photo in the site's two tones. It shows in blue and white until `on`,
 * then in its own colours.
 */
export function Duo({
  src,
  alt,
  on,
  fit = "",
  sizes = "600px",
}: {
  src: string;
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
      <span
        aria-hidden="true"
        className={`absolute inset-0 isolate bg-accent transition-opacity duration-700 ease-out ${
          on ? "opacity-0" : "opacity-100"
        }`}
      >
        <Image
          src={src}
          alt=""
          fill
          sizes={sizes}
          className={`object-cover mix-blend-screen brightness-90 contrast-125 grayscale ${fit}`}
        />
      </span>
    </span>
  );
}

/** The title of a page. */
export function PageTitle({ id, title }: { id: string; title: string }) {
  return (
    <Reveal y={18}>
      <h1 id={id} className="display text-[clamp(52px,8.4vw,128px)]">
        {title}
      </h1>
    </Reveal>
  );
}
