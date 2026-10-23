# Portfolio verification — 23 October 2026

## User story

A visitor can explore the relationship between an observation, a shared record, and a care workflow; bypass the illustration to inspect work; read bounded research contributions; open original artifacts; and try a creative experiment. The portfolio is statically generated. No backend, CMS, authentication, or external data service is involved in that flow.

## Checks performed

- Production Next.js build: 34 static pages generated, TypeScript validation passed.
- Local link crawl: 40 distinct local destinations; no missing pages or artifacts.
- Browser routes: homepage, work, research, about, experiments, all three major project details, contact, experience, writing, ledger, thesis, and physics detail returned HTTP 200.
- Desktop, mobile emulation, and reduced-motion profiles exercised both directions of the shared-record switch and project controls. No uncaught browser errors were observed.
- Touch events exercised the system controls and an actual physics drag. Keyboard events started and moved physics objects. Resizing a phone viewport to landscape safely reset the simulation within its bounds.
- Responsive homepage widths: 360, 390, 768, 1024, 1440, and 1920 pixels; no horizontal overflow. Main document routes also checked for overflow on desktop and phone.
- Reduced motion: camera transition computed to `0s`; ambient pulse is disabled by CSS.
- JavaScript-disabled browser: main copy and work navigation remain available; inactive interaction controls are hidden.
- Axe WCAG 2 A/AA and 2.1 AA scans on the main pages found no violations after fixes. Vector arrows avoid platform-specific missing glyphs. Text contrast and visible/accessibility-label mismatches were corrected.
- Mobile Lighthouse on the compressed static export: Performance 97, Accessibility 100, Best Practices 100, SEO 100. Observed FCP 1.4 seconds, LCP 2.5 seconds, total blocking time 30 ms, CLS 0. These are lab measurements, not field metrics.
- Homepage first-load JS reported by Next.js: 106 kB, reduced from the intermediate animation-library implementation's 142 kB. The homepage's camera uses native CSS/SVG. Physics loads on the experiments routes.
- External game/prototype/Crowwd links were checked for reachability and returned HTTP 200. Their individual application flows were not retested or modified.

## Repeatable suite

`npm run test:browser` runs `scripts/verify-portfolio.mjs` against the served export. The suite asserts behavior rather than only collecting screenshots. See the README for serving and browser selection.

## Limits

Testing used system Chromium, including an emulated iPhone viewport and CDP touch events. Physical iOS/Safari devices, a screen-reader session, and long-term production telemetry were not tested. Automated accessibility checks do not establish complete accessibility conformance. Source limitations, including the inaccessible LinkedIn profile, are documented in `portfolio-evidence-audit.md`.
