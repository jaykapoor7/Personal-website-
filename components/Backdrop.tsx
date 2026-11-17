/** A plotted ribbon: fine blue contours give the page a recognisable signature. */
export function HeroBackdrop() {
  return <div aria-hidden="true" className="contour-backdrop pointer-events-none absolute inset-0 overflow-hidden">
    <svg className="contour-ribbon" viewBox="0 0 1400 1000" fill="none" preserveAspectRatio="xMidYMid slice">
      {Array.from({ length: 24 }, (_, i) => <path key={i} d={`M ${480 + i * 19} -100 C ${1400 + i * 6} 100, ${230 - i * 9} 430, ${780 + i * 13} 660 S ${1620 + i * 10} 900, ${900 + i * 20} 1150`} />)}
    </svg>
    <div className="hero-axis" />
  </div>;
}
export function SheetBackdrop() {
  return <div aria-hidden="true" className="sheet-rules pointer-events-none absolute inset-0 overflow-hidden rounded-t-[inherit]" />;
}
