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
      className={`overflow-hidden rounded-[14px] border border-black/10 bg-[#f6f5f2] ${className}`}
    >
      <div className="flex h-8 items-center gap-1.5 border-b border-black/[0.07] px-3">
        <i className="h-2.5 w-2.5 rounded-full bg-black/15" />
        <i className="h-2.5 w-2.5 rounded-full bg-black/15" />
        <i className="h-2.5 w-2.5 rounded-full bg-black/15" />
        <span className="mx-auto max-w-[70%] truncate rounded-md bg-black/[0.05] px-3 py-0.5 text-[10.5px] text-black/55">
          {url}
        </span>
        <span className="w-[42px]" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
