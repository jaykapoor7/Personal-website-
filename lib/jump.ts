const calm = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Scroll so an element sits just under the bar at the top. */
export function scrollToEl(el: Element) {
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  if (window.__lenis) window.__lenis.scrollTo(top, { duration: 1.1 });
  else window.scrollTo({ top, behavior: calm() ? "instant" : "smooth" });
}

/**
 * Move to a part of the landing page. The work index listens for the hash,
 * so /#research also opens the index on research.
 */
export function goToSection(id: string) {
  history.pushState(null, "", `#${id}`);
  const el = document.getElementById(id);
  if (el) scrollToEl(el);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

/** Scroll to the contact panel, which waits at the very end of every page. */
export function goToContact() {
  history.pushState(null, "", "#contact");
  if (window.__lenis) window.__lenis.scrollTo("bottom", { duration: 1.2 });
  else
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: calm() ? "instant" : "smooth",
    });
}
