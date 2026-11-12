# Release verification

Run after `npm run build` with `out/` served locally, then `npm run test:browser`.

Last local run (November 2026): 18 routes, including five Research Models pages, passed on desktop, iPhone 13, dark mode and full motion, with no overflow, no browser errors and no axe WCAG 2.1 AA violations. All local links and every redirect target returned 200. The landing page carries the introduction and the short index (16 of 27 pieces of work, the rest one click away), and is about 5½ screens on a laptop and 7 on a phone.

Scrolling the whole landing page with a mouse wheel in headless Chromium, cursor resting over the content, held 60 frames a second in three runs (median frame 16.7 ms, 95th percentile 16.8 ms, at most one frame over 34 ms in a run). That says nothing about Safari or a real phone; check those by hand after changing anything tied to scroll.

Redirects themselves only exist on Vercel, so check a few old URLs (`/research/`, `/writing/`, `/work/tarc/`) on a preview deployment after changing `vercel.json`.
