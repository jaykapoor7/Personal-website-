/** Where a home-page anchor really is. The hero and the contact panel are pinned, so they need their own answers. */
function place(id: string) {
  if (id === "top") window.scrollTo({ top: 0, behavior: "instant" });
  else if (id === "contact")
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "instant",
    });
  else
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "instant", block: "start" });
}

/**
 * Go to a section of the home page. Near jumps glide; far ones cut with the same
 * fade as a page change, so the pinned scenes in between do not flash past.
 */
export function jumpTo(id: string, { glide = false } = {}) {
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  history.pushState(
    null,
    "",
    id === "top" ? window.location.pathname : `#${id}`,
  );
  if (glide && !calm) {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => { finished: Promise<unknown> };
  };
  if (!calm && doc.startViewTransition) {
    // Nothing can be measured mid-transition, so tell scroll listeners again after it.
    const after = () => window.dispatchEvent(new Event("scroll"));
    doc.startViewTransition(() => place(id)).finished.then(after, after);
  } else place(id);
}
