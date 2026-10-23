# Jay Kapoor — systems for real-world problems

Personal portfolio at https://kapoorjay.com. Next.js 14 / React 18 / TypeScript, exported as static files. This repository and Vercel’s `personal-website` project are the only release targets.

```sh
npm ci
npm run dev
npm run build
```

No API keys, database, or server runtime are required. The build exports to `out/`.

## Design

- Tailwind with a small token layer in `app/globals.css` (light and dark via `prefers-color-scheme`). Inter Tight for text, Instrument Serif italics for accents, JetBrains Mono for labels.
- `app/page.tsx`: hero, highlight stats, StrayPaw feature (with the archived Coimbatore area map), selected work, experience, research & forecast ledger, side projects, and photos.
- `/work/[slug]`: one template for every project — metrics, overview, what I did, artifacts, gallery.
- `components/ProjectVisual.tsx`: photos where they exist; unit charts (one mark per centre, interview, or artisan) where they don’t.
- `/research`, `/ledger`, `/about`, `/experience`, `/play`, `/artifacts`, `/contact`, plus the older `/writing` and `/thesis` routes.

## Evidence

`content/site.ts` holds the profile, projects, experience, writing, and photos; `content/proof.ts` holds the artifact index. `docs/master-redesign-audit.md` records claim limits, source conflicts, photography, and dataset provenance. Keep records distinct from outcomes, formative evaluations distinct from clinical validation, and sketches distinct from shipped products.

## Verification

```sh
python -m http.server 3000 --directory out
npm run test:browser
```

The browser suite loads every route on desktop, mobile, and dark mode; checks for horizontal overflow, browser errors, and WCAG 2.1 A/AA (axe); exercises the mobile menu, dataset filter, and physics toy; and confirms every local link resolves. Set `BASE_URL` for another origin (`npm run test:production` targets kapoorjay.com) or `PLAYWRIGHT_CHROMIUM_PATH` for a browser binary.

Do not modify or deploy to StrayPaw or unrelated game projects.
