import { Reveal } from "./motion";

/** The top of every section page: a big title and one line beside it. */
export function PageHead({
  kicker,
  title,
  aside,
}: {
  kicker: string;
  title: React.ReactNode;
  aside: React.ReactNode;
}) {
  return (
    <header className="shell pt-24 md:pt-28">
      <p className="text-[13px] font-medium text-muted">{kicker}</p>
      <Reveal
        className="mt-4 flex flex-wrap items-end justify-between gap-6 border-t border-fg pt-4"
        y={16}
      >
        <h1 className="text-[clamp(56px,10vw,150px)] font-semibold leading-[0.85] tracking-[-0.06em]">
          {title}
        </h1>
        <p className="serif max-w-[26ch] text-[clamp(22px,2.4vw,32px)] leading-[1.05]">
          {aside}
        </p>
      </Reveal>
    </header>
  );
}
