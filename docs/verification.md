# Release verification — 23 October 2026

## User story

A visitor understands Jay’s focus immediately, can bypass the connection scene, inspect live products and original work samples, explore bounded research, play experiments, and navigate the personal photo archive. All page content and data are statically exported. There is no new backend or privileged service dependency.

## Local release checks

- Next.js production export and TypeScript validation passed. All project, archive, and artifact-index routes were generated.
- `npm run test:browser` passed on desktop, emulated iPhone with real CDP touch input, and reduced motion.
- The suite exercises all four hero scales, disconnect/reconnect, actual archived-area counts, care stages, research themes, Juno information steps, navigation, photo comparison endpoints, company-sector filters, the government sketch, real physics dragging, keyboard physics, and orientation changes.
- WCAG 2 A/AA and 2.1 AA automated axe scans passed on the primary routes. Additional scans covered TOT Schools and the artifact index. No uncaught browser errors.
- Width checks from 360 through 1920 pixels found no horizontal overflow. JavaScript-disabled navigation and the main positioning remain accessible. Both group photographs are available fully without JavaScript.
- All 27 directly referenced local artifact/media files exist. The source résumé’s bytes are preserved exactly. The old proof index’s PDFs, spreadsheet, CSV, event images, and portrait are linked again.
- Shipped games, prototype home URLs, Crowwd, GitHub, StrayPaw, and X returned HTTP 200. LinkedIn blocks automated reads with HTTP 999; the supplied screenshots were audited. Reachability does not establish every external app’s functionality.

## Performance

The final compressed static export, measured sequentially after other browser checks:

| Mobile Lighthouse category | Score |
| -------------------------- | ----- |
| Performance                | 98    |
| Accessibility              | 100   |
| Best practices             | 100   |
| SEO                        | 100   |

FCP 1.1 s, LCP 2.3 s, total blocking time 10 ms, CLS 0. These are local lab observations using gzip to match production text compression, not field metrics. A raw Python static server does not compress resources and gives misleadingly slower transfer results; an overlapping browser run also produced CPU contention. The reported run avoided those conditions.

The connection engine omits its hidden geographic polygons until the real-system scale is selected. Source geography remains bundled and available offline; the actual project explorer is server-rendered. Photographs have optimized WebP variants; mobile personal photos and the event photograph select smaller sources. No animation library runs on the homepage. Physics loads on experiment routes.

## Production procedure

The current portfolio repository’s GitHub Vercel status confirms team `jaykapoor700-1687s-projects`, project `personal-website`. Release by fast-forwarding this repository’s `main` branch. Production is checked with `npm run test:production`: TLS-verified HTTP reads of routes, desktop/mobile interactions, photo loading, and checksum comparison of public artifact bytes against the release.

## Limits

Tests use Chromium and mobile emulation, not physical Safari devices or a human screen-reader session. Automated checks do not establish complete accessibility conformance. Publicly unavailable research data and unverified outcomes were not fabricated. Publishing the original private 2022 Juno document is excluded unless the user specifically approves it.
