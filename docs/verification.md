# Release verification

Run after `npm run build` with `out/` served locally, then `npm run test:browser`.

Last local run (November 2026), after the CV-style redesign:

- **Routes:** 22 routes passed on desktop, iPhone 13, dark mode and full motion: the home page, the work index, nine case pages, three play pages, the ledger, the market map, the documents page and five Research Models pages. No overflow, no browser errors and no axe WCAG 2.1 AA violations.
- **Links:** all 99 local links and documents, and all 17 redirect targets, returned 200.
- **External links:** every external link was checked. All returned 200, except sites that refuse automated requests: LinkedIn (999); GitHub's profile page, Max Healthcare, the CDC and one DOI (403). These open normally in a browser.
- **Home page:** the five selected projects show their pictures without hover. The first one starts on a 1440×900 laptop's first screen.
- **Weight:** the home page loads about 1.2 MB before compression, in 35 requests. Lists use 400px thumbnails from `public/thumbs`.

Redirects only exist on Vercel. After changing `vercel.json`, check a few old URLs (`/research/`, `/projects/`, `/startups/`) on a preview deployment.
