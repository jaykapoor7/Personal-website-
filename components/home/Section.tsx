import { Link } from "next-view-transitions";
import { Arrow } from "../Arrow";

/** A numbered part of the home page: a small mono heading, then its content. */
export function Section({
  id,
  n,
  title,
  action,
  children,
}: {
  id: string;
  n: string;
  title: string;
  action?: { label: string; href: string };
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="col mt-16 scroll-mt-6 md:mt-20">
      <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
        <h2 id={`${id}-h`} className="flex items-center gap-2.5">
          <span className="num" aria-hidden="true">
            {n}
          </span>
          <span className="label text-muted">{title}</span>
        </h2>
        {action && (
          <Link
            href={action.href}
            className="group inline-flex items-center gap-1 text-[13.5px] text-muted transition-colors hover:text-fg"
          >
            {action.label}
            <Arrow
              direction="right"
              className="text-[0.9em] transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

/** A compact row for the CV-style lists: name and detail, years on the right. */
export function Line({
  name,
  detail,
  years,
  href,
  external,
  thumb,
}: {
  name: string;
  detail?: React.ReactNode;
  years?: string;
  href?: string;
  external?: boolean;
  thumb?: React.ReactNode;
}) {
  const body = (
    <>
      {thumb}
      <span className="min-w-0">
        <span className="flex items-baseline gap-1.5 font-medium transition-colors duration-200 group-hover:text-accent">
          {name}
          {href && (
            <Arrow
              direction={external ? "up" : "right"}
              className="text-[0.8em] text-faint opacity-0 transition-all duration-200 group-hover:text-accent group-hover:opacity-100 group-focus-visible:opacity-100"
            />
          )}
        </span>
        {detail && (
          <span className="mt-0.5 block text-[14px] leading-snug text-muted">
            {detail}
          </span>
        )}
      </span>
      <span className="shrink-0 pt-[3px] text-right font-mono text-[11.5px] tabular-nums text-faint">
        {years}
      </span>
    </>
  );
  const cls = `group grid items-start gap-x-4 border-b border-line py-3.5 ${
    thumb
      ? "grid-cols-[44px_minmax(0,1fr)_auto]"
      : "grid-cols-[minmax(0,1fr)_auto]"
  }`;
  if (!href) return <div className={cls}>{body}</div>;
  if (external)
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {body}
      </a>
    );
  return (
    <Link href={href} className={cls}>
      {body}
    </Link>
  );
}
