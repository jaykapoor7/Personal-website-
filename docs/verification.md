# Release verification

Run after `npm run build` with `out/` served locally, then `npm run test:browser`.

Last local run (October 2026): 20 routes passed on desktop, iPhone 13, dark mode and full motion, with no overflow, no browser errors and no axe WCAG 2.1 AA violations. All 79 local links and images returned 200. Dragging a desk item does not open it; clicking does.
