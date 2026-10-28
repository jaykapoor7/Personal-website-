import { Reveal } from "./motion";

/** The top of every section page: a big title and one line beside it. */
export function PageHead({
  title,
  aside,
}: {
  kicker?: string;
  title: React.ReactNode;
  aside: React.ReactNode;
}) {
  return (
    <header className="shell pt-28 md:pt-36">
      <Reveal className="flex flex-wrap items-end justify-between gap-6" y={16}>
        <h1 className="text-[clamp(56px,10vw,150px)] font-semibold leading-[0.85]">
          {title}
        </h1>
        <p className="max-w-[30ch] text-[clamp(19px,2vw,26px)] leading-snug text-muted">
          {aside}
        </p>
      </Reveal>
    </header>
  );
}
