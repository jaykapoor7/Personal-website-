/** A screenshot of a site, shown plainly: no fake window controls or address bar. */
export function BrowserFrame({
  children,
  className = "",
}: {
  url?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      {children}
    </div>
  );
}
