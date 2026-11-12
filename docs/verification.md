# Release verification

Run after `npm run build` with `out/` served locally, then `npm run test:browser`.

Last local run (November 2026): 22 routes, including five Research Models pages, passed on desktop, iPhone 13, dark mode and full motion, with no overflow, no browser errors and no axe WCAG 2.1 AA violations. All local links and every redirect target returned 200. The landing page carries the introduction and the four startups and is under 8 screens.

Scrolling the landing page with a mouse wheel in headless Chromium held 60 frames a second (median frame 16.7 ms, 95th percentile 16.8 ms). That says nothing about Safari or a real phone; check those by hand after changing anything tied to scroll.

Redirects themselves only exist on Vercel, so check a few old URLs (`/writing/`, `/work/tarc/`) on a preview deployment after changing `vercel.json`.
