import Link from "next/link";
import { Arrow } from "./Arrow";

export const isExternal = (href: string) =>
  href.startsWith("http") || /\.(pdf|xlsx|csv|webp|jpg)$/.test(href);

/** Internal routes use next/link; files and other sites open in a new tab. */
export function SmartLink({
  href,
  className,
  children,
  ...rest
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  "aria-label"?: string;
}) {
  if (isExternal(href))
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
        {...rest}
      >
        {children}
      </a>
    );
  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  );
}

export function SectionHeader({
  index,
  title,
  action,
}: {
  index: string;
  title: React.ReactNode;
  action?: { label: string; href: string };
}) {
  return (
    <div className="mb-10 flex items-end justify-between gap-6 border-t border-line pt-6 md:mb-14">
      <div>
        <p className="eyebrow">{index}</p>
        <h2 className="mt-3 text-3xl font-medium tracking-[-0.03em] md:text-[44px] md:leading-[1.05]">
          {title}
        </h2>
      </div>
      {action && (
        <SmartLink
          href={action.href}
          className="group hidden shrink-0 items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg sm:inline-flex"
        >
          {action.label}
          <Arrow className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </SmartLink>
      )}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="shell rise pb-16 pt-16 md:pb-20 md:pt-24">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-5 max-w-4xl text-5xl font-medium leading-[0.98] tracking-[-0.045em] md:text-7xl">
        {title}
      </h1>
      {lede && (
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
          {lede}
        </p>
      )}
      {children}
    </header>
  );
}

/** Responsive WebP photo from /public/photos with 640/1280 variants. */
export function Photo({
  name,
  alt,
  className = "",
  priority = false,
}: {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <picture>
      <source media="(max-width: 640px)" srcSet={`/photos/${name}-640.webp`} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/photos/${name}-1280.webp`}
        alt={alt}
        className={className}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </picture>
  );
}
