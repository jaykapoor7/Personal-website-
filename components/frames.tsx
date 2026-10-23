import Image from "next/image";

/** A plain browser window: grey controls and the real URL. */
export function BrowserFrame({
  url,
  children,
  className = "",
}: {
  url: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[14px] border border-black/10 bg-[#f6f5f2] dark:border-white/10 dark:bg-[#232220] ${className}`}
    >
      <div className="flex h-8 items-center gap-1.5 border-b border-black/[0.07] px-3 dark:border-white/[0.07]">
        <i className="h-2.5 w-2.5 rounded-full bg-black/15 dark:bg-white/20" />
        <i className="h-2.5 w-2.5 rounded-full bg-black/15 dark:bg-white/20" />
        <i className="h-2.5 w-2.5 rounded-full bg-black/15 dark:bg-white/20" />
        <span className="mx-auto max-w-[70%] truncate rounded-md bg-black/[0.05] px-3 py-0.5 font-mono text-[10.5px] text-black/55 dark:bg-white/10 dark:text-white/60">
          {url}
        </span>
        <span className="w-[42px]" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

/** A phone with a notch-free bezel. */
export function PhoneFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[34px] bg-[#111] p-[7px] ring-1 ring-black/40 ${className}`}
    >
      <div className="relative overflow-hidden rounded-[28px] bg-black">
        {children}
      </div>
    </div>
  );
}

export function Shot({
  src,
  alt,
  ratio,
  priority,
  sizes = "600px",
}: {
  src: string;
  alt: string;
  ratio: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className="relative w-full" style={{ aspectRatio: ratio }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        draggable={false}
        className="select-none object-cover object-top"
      />
    </div>
  );
}

/** First page of a real PDF, as a sheet of paper. */
export function Paper({
  src,
  alt,
  className = "",
  sizes = "300px",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      className={`paper-shadow relative aspect-[900/1273] overflow-hidden rounded-[3px] bg-white ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        draggable={false}
        className="select-none object-cover object-top"
      />
    </div>
  );
}

/** A printed photo with a white border and a handwritten-size caption. */
export function Polaroid({
  name,
  src,
  alt,
  caption,
  className = "",
}: {
  name?: string;
  src?: string;
  alt: string;
  caption: string;
  className?: string;
}) {
  return (
    <figure
      className={`paper-shadow bg-[#fbfaf7] p-2.5 pb-0 dark:bg-[#ece9e2] ${className}`}
    >
      <div className="relative aspect-square overflow-hidden bg-black/5">
        {name ? (
          <picture>
            <source
              media="(max-width: 640px)"
              srcSet={`/photos/${name}-640.webp`}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/photos/${name}-1280.webp`}
              alt={alt}
              draggable={false}
              loading="lazy"
              className="absolute inset-0 h-full w-full select-none object-cover"
            />
          </picture>
        ) : (
          <Image
            src={src!}
            alt={alt}
            fill
            sizes="300px"
            draggable={false}
            className="select-none object-cover"
          />
        )}
      </div>
      <figcaption className="py-2.5 text-center text-[13px] font-medium text-[#3a3833]">
        {caption}
      </figcaption>
    </figure>
  );
}
