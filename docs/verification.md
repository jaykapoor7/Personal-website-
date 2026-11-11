# Release verification

Run after `npm run build` with `out/` served locally, then `npm run test:browser`.

Last local run (November 2026): 18 routes, including five Research Models pages, passed on desktop, iPhone 13, dark mode and full motion, with no overflow, no browser errors and no axe WCAG 2.1 AA violations. 82 local links and the targets of all 16 redirects returned 200. The home page is under 8 screens on desktop and under 12 on a phone.

Redirects themselves only exist on Vercel, so check a few old URLs (`/about/`, `/work/tarc/`) on a preview deployment after changing `vercel.json`.
