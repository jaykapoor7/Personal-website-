# Jay Kapoor

Personal site at https://kapoorjay.com. Next.js 14, React 18, TypeScript, Tailwind and framer-motion, exported as static files.

```sh
npm ci
npm run dev
npm run build   # exports to out/
```

## How it is put together

- `content/site.ts` holds everything, each item once: ventures, roles, labs, writing, builds, leadership, education and personal photos. Every item links to the real organisation or product first; PDFs are listed as supporting documents.
- `app/page.tsx` is the whole portfolio on one short page, about six screens. Nothing is pinned to the scroll; each section fits in a view and is explored by pointing or tapping. Each part lives in `components/home/`:
  - `Hero`: one sentence about me, with my photo and the logos of each section set into the text. The underlined words jump to their section.
  - `Startups`: four panels side by side. The one you point at opens with its numbers and its picture; the rest fold to a spine. On a phone it is an accordion.
  - `Experience` and `Research`: a list on the left and a live preview on the right (`ListPreview`), showing the documents, photos or lab site of the row you point at. Research adds four tiles: forecast ledger, market map, research models and papers.
  - `Projects`: six tools and games in a grid (a swipe row on a phone). The physics toy runs live in its card.
  - `About`: every photo as a slat. Folded slats are blue; the one you point at opens in full colour. Then education and leadership.
- `components/Footer.tsx` is the contact panel, uncovered as the page ends. `components/Cursor.tsx` is the small label that follows the mouse over anything with `data-cursor`.
- Detail pages stay as they were: `/work/[slug]` (case studies), `/play/[slug]` (each build, live), `/ledger`, `/market-map` and `/artifacts`.
- Old section URLs (`/startups`, `/research`, `/about`, ...) forward to the matching anchor on the home page.
- `public/previews` are screenshots of live sites and lab pages, `public/covers` first pages of the PDFs, `public/logos` organisation logos, `public/photos` personal photos.

## Design

Two tones only: one blue and white. Cards and bands are tints of that blue (tokens in `app/globals.css`); photos and product screenshots are the only other colour. One typeface, Bricolage Grotesque, set narrow and heavy for headlines (`.display`).

Motion comes from pointing and tapping, not from scrolling (`components/motion.tsx` holds the shared pieces). Every animation is skipped for visitors who ask for reduced motion.

Copy rule: plain and short. Names, roles, dates and numbers; the work is shown, not described.

## Checks

```sh
python -m http.server 3000 --directory out
npm run test:browser
```

Loads every route on desktop, mobile, dark mode and full motion; checks overflow, browser errors and WCAG 2.1 AA (axe); checks the home page stays short; exercises the menu, a startup panel, a photo slat, a case page, the forecast bet, the dataset filter and the physics toy; and confirms every local link resolves. `npm run test:production` runs the same checks against kapoorjay.com.

Check against the exported build, not only `npm run dev`: development mode runs effects twice and can hide ordering bugs.
