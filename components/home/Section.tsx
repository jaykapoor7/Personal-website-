import { Link } from "next-view-transitions";
import { Arrow } from "../Arrow";

/** A numbered part of the home page, headed like a printed CV. */
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
    <section
      id={id}
      aria-labelledby={`${id}-h`}
      className="col mt-12 scroll-mt-8 md:mt-14"
    >
      <div className="mb-2 flex items-center justify-between gap-4">
        <h2 id={`${id}-h`} className="flex items-center gap-2">
          <span className="num" aria-hidden="true">
            {n}
          </span>
          <span className="hatch h-[18px] w-[18px]" aria-hidden="true" />
          <span className="label ml-1 text-muted">{title}</span>
        </h2>
        {action && (
          <Link
            href={action.href}
            className="group inline-flex items-center gap-1 text-[13px] text-muted transition-colors hover:text-fg"
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
