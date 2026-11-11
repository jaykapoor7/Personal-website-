# Jay Kapoor

Personal site at https://kapoorjay.com. Next.js 14, React 18, TypeScript, Tailwind and framer-motion, exported as static files.

```sh
npm ci
npm run dev
npm run build   # exports to out/
```

## How it is put together

- `content/site.ts` holds everything, each item once: ventures, roles, labs, writing, builds, leadership, education and personal photos. Every item links to the real organisation or product first; PDFs are listed as supporting documents.
- `app/page.tsx` is the whole portfolio on one short page, under seven screens. Nothing is pinned to the scroll. Each section has its own form, in `components/home/`:
  - `Hero`: one sentence about me with my photo set into it. The underlined words jump to their section. Under it, `Timeline`: everything with dates on one band from 2019 to now (solid bars are startups, tinted ones jobs, outlined ones research). A bar jumps to its entry and opens it.
  - `Startups`: four panels side by side. The one you point at opens with its numbers and picture; the rest fold to a spine. An accordion on a phone.
  - `Experience`: four cards on a blue band. Each turns over to show what the work was, its documents and links.
  - `Research`: the labs as a short index that opens in place, beside four tiles of my own research (ledger, research models, market map, memos).
  - `Projects`: six builds in a grid of different sizes on a tinted band. The physics toy runs live in its tile.
  - `About`: every photo as a slat. Folded slats are blue; the one you point at opens in full colour. Then education and leadership.
- `components/Nav.tsx` is two things: my name, and one button that names the section you are in and opens a full-screen menu. `components/Footer.tsx` is the contact panel, uncovered as the page ends. `components/Cursor.tsx` is the small label that follows the mouse over anything with `data-cursor`.
- Detail pages: `/work/[slug]` for the four startups and the jobs with enough to say (`content/archive.ts` decides), `/play/[slug]` for each build, live, plus `/ledger`, `/market-map` and `/artifacts`. Everything else opens in place on the home page.
- Old URLs (`/startups`, `/about`, retired case pages, old project slugs) are redirected in `vercel.json`, so there are no stub pages.
- `public/research-models` is a small static site of five interactive public-health models. It shares the main site's typeface and palette (`style.css`); its chart series are four steps of the one blue, light to dark, and lines also differ by dash.
- `public/previews` are screenshots of live sites, `public/covers` first pages of the PDFs, `public/logos` organisation logos, `public/photos` personal photos.

## Design

Two tones only: one blue and white. Cards and bands are tints of that blue (tokens in `app/globals.css`); photos and product screenshots are the only other colour. One typeface, Bricolage Grotesque, set narrow and heavy for headlines (`.display`).

Motion comes from pointing and tapping, not from scrolling (`components/motion.tsx` holds the shared pieces). Every animation is skipped for visitors who ask for reduced motion.

Copy rule: plain and short. Names, roles, dates and numbers; the work is shown, not described.

## Checks

```sh
python -m http.server 3000 --directory out
npm run test:browser
```

Loads every route on desktop, mobile, dark mode and full motion; checks overflow, browser errors and WCAG 2.1 AA (axe); checks the home page stays short; exercises the menu, a timeline bar, a startup panel, an experience card, a lab row, a photo slat, the forecast bet, the dataset filter and the physics toy; and confirms every local link and every redirect target resolves. `npm run test:production` runs the same checks against kapoorjay.com.

Check against the exported build, not only `npm run dev`: development mode runs effects twice and can hide ordering bugs.
