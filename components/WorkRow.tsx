import Image from "next/image";
import { Link } from "next-view-transitions";
import { Arrow } from "./Arrow";

/** The small copy of a screenshot or cover (scripts/make-thumbs.mjs). */
export const small = (src?: string) =>
  src && /^\/(previews|covers)\//.test(src)
    ? `/thumbs/${src.split("/").pop()!.replace(/\.(png|jpg)$/, ".webp")}`
    : src;

/** A picture for a list: a screenshot, a document's first page, or a logo. */
export function Thumb({
  src,
  logo,
  name,
  className = "",
  sizes = "180px",
}: {
  src?: string;
  logo?: string;
  name: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <span
      className={`relative block overflow-hidden rounded-md bg-card ring-1 ring-inset ring-fg/[0.08] ${className}`}
    >
      {src ? (
        <Image
          src={small(src)!}
          alt=""
          fill
          sizes={sizes}
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      ) : logo ? (
        <Image
          src={logo}
          alt=""
          fill
          sizes="80px"
          className="object-contain p-[22%]"
        />
      ) : (
        <span
          aria-hidden="true"
          className="absolute inset-0 grid place-items-center font-serif text-[22px] text-muted"
        >
          {name.replace(/^The /, "")[0]}
        </span>
      )}
    </span>
  );
}

/** "Live" or "Published", said quietly. */
export function Status({ status }: { status?: string }) {
  if (!status) return null;
  return (
    <span className="inline-flex items-center gap-1.5 text-accent">
      {status === "Live" && <span className="live" aria-hidden="true" />}
      {status}
    </span>
  );
}

export type Row = {
  n: number;
  name: string;
  line: string;
  meta: string;
  years: string;
  status?: string;
  image?: string;
  logo?: string;
  href: string;
  external?: boolean;
  /** The strongest numbers, shown under the line on the home page. */
  facts?: { value: string; label: string }[];
};

/**
 * One piece of work: its number, picture, role and years, name and one line.
 * The whole row is the link, with the picture always shown.
 */
export function WorkRow({ row, big = false }: { row: Row; big?: boolean }) {
  const num = String(row.n).padStart(2, "0");
  const body = (
    <>
      <span
        aria-hidden="true"
        className="hidden pt-[3px] font-mono text-[11.5px] tabular-nums text-faint sm:block"
      >
        {num}
      </span>
      <Thumb
        src={row.image}
        logo={row.logo}
        name={row.name}
        className="aspect-[3/2] w-full sm:aspect-[16/10]"
        sizes={big ? "(max-width: 640px) 96px, 168px" : "(max-width: 640px) 96px, 140px"}
      />
      <span className="min-w-0">
        <span className="label flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <span className="tabular-nums sm:hidden">{num}</span>
          <span className="sm:hidden" aria-hidden="true">·</span>
          <span>{row.meta}</span>
          {row.years && (
            <>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{row.years}</span>
            </>
          )}
          {row.status && (
            <>
              <span aria-hidden="true">·</span>
              <Status status={row.status} />
            </>
          )}
        </span>
        <span
          className={`mt-1.5 flex items-baseline gap-2 font-serif leading-tight tracking-[-0.01em] transition-colors duration-200 group-hover:text-accent ${
            big ? "text-[22px] sm:text-[25px]" : "text-[20px] sm:text-[22px]"
          }`}
        >
          {row.name}
          {row.href && (
            <Arrow
              direction={row.external ? "up" : "right"}
              className="translate-y-[1px] text-[0.7em] text-faint opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent group-hover:opacity-100 group-focus-visible:opacity-100"
            />
          )}
        </span>
        <span className="mt-1 block text-[14.5px] leading-snug text-muted sm:text-[15px]">
          {row.line}
        </span>
        {row.facts && row.facts.length > 0 && (
          <span className="mt-2 flex flex-wrap gap-x-4 gap-y-0.5 text-[13px] text-muted">
            {row.facts.map((f) => (
              <span key={f.label}>
                <span className="font-medium tabular-nums text-fg">{f.value}</span>{" "}
                {f.label}
              </span>
            ))}
          </span>
        )}
      </span>
    </>
  );
  const cls = `group grid gap-x-4 py-5 sm:gap-x-6 ${
    big
      ? "grid-cols-[96px_minmax(0,1fr)] sm:grid-cols-[22px_168px_minmax(0,1fr)]"
      : "grid-cols-[96px_minmax(0,1fr)] sm:grid-cols-[22px_140px_minmax(0,1fr)]"
  }`;
  if (!row.href)
    return <div className={cls}>{body}</div>;
  if (row.external)
    return (
      <a href={row.href} target="_blank" rel="noreferrer" className={cls}>
        {body}
      </a>
    );
  return (
    <Link href={row.href} className={cls}>
      {body}
    </Link>
  );
}
