# Release verification

Run after `npm run build` with `out/` served locally, then `npm run test:browser`.

Last local run (November 2026, after the compact one-page redesign): 35 routes passed on desktop, iPhone 13, dark mode and full motion, with no overflow, no browser errors and no axe WCAG 2.1 AA violations. All local links and images returned 200. The home page is under 8 screens on desktop and under 12 on a phone; a startup panel and a photo slat open, a lab link opens its case page, and the forecast bet reveals its odds.
