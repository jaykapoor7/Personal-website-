# Jay Kapoor — systems for real-world problems

Personal portfolio at https://kapoorjay.com. Next.js 14 / React 18 / TypeScript, exported as static files. This repository and Vercel’s `personal-website` project are the only release targets.

```sh
npm ci
npm run dev
npm run build
```

No API keys, database, or server runtime are required. The build exports to `out/`.

## The experience

- `app/experience.css`: new responsive design system. Previous UI stylesheets have been removed.
- `components/LivingSystem.tsx`: one point → records → network → actual StrayPaw geography, controlled by scroll or direct buttons. Reduced motion disables automatic progression.
- `components/StrayPawExplorer.tsx`: archived Coimbatore area geometry and aggregate request counts, with provenance and a link to the real map.
- `components/PhotoTimeline.tsx`: personal archive, full-team comparison, and track-to-pitch transition. Faces are unchanged.
- `components/HealthTechMap.tsx`: interactive view of the actual downloadable company dataset.
- `/artifacts`: all the historical PDFs, spreadsheets, research files, and shipped builds in one inspectable index.
- `/play`: two shipped games, the gravity desk, a labelled miniature sketch, and utility prototypes.

Routes `/work`, `/research`, `/about`, `/play`, `/contact`, `/experience`, `/writing`, `/ledger`, `/thesis`, and historical project detail URLs are preserved. All old local artifact paths remain available.

## Evidence

`content/site.ts` holds project contributions and sources; `content/proof.ts` holds the artifact index. `docs/master-redesign-audit.md` records claim limits, source conflicts, photography, and dataset provenance. Keep records distinct from outcomes, formative evaluations distinct from clinical validation, and sketches distinct from shipped products.

## Verification

```sh
python -m http.server 3000 --directory out
npm run test:browser
```

The browser suite exercises desktop/touch/reduced motion, navigation, real area-data controls, research filters, photo comparison, game sketch, physics, route availability, no-JavaScript navigation, and WCAG A/AA scans. Set `BASE_URL` for another origin or `PLAYWRIGHT_CHROMIUM_PATH` for a browser binary. See `docs/verification.md` for measured results and limits.

Do not modify or deploy to StrayPaw or unrelated game projects.
