# Release verification

Run after `npm run build` with `out/` served locally, then `npm run test:browser`.

Last local run (November 2026): 22 routes, including five Research Models pages, passed on desktop, iPhone 13, dark mode and full motion, with no overflow, no browser errors and no axe WCAG 2.1 AA violations. All local links and every redirect target returned 200. The landing scene ends on the last startup, and the landing page is under 8 screens.

Redirects themselves only exist on Vercel, so check a few old URLs (`/writing/`, `/work/tarc/`) on a preview deployment after changing `vercel.json`.
