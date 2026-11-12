/** Scroll to the contact panel, which waits at the very end of every page. */
export function goToContact() {
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  history.pushState(null, "", "#contact");
  if (window.__lenis) window.__lenis.scrollTo("bottom", { duration: 1.2 });
  else
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: calm ? "instant" : "smooth",
    });
}
