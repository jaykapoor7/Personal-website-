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
