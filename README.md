# Jay Kapoor

Personal site at https://kapoorjay.com. Next.js 14, React 18, TypeScript, Tailwind and framer-motion, exported as static files.

```sh
npm ci
npm run dev
npm run build   # exports to out/
```

## How it is put together

- `content/site.ts` holds everything, each item once: ventures, roles, labs, writing, builds, leadership, education and personal photos. Every item links to the real organisation or product first; PDFs are listed as supporting documents.
- `app/page.tsx` is the whole portfolio in one scroll. Each part lives in `components/home/`:
  - `Hero`: who I am, with three photo prints you can drag.
  - `StrayPaw`: a pinned scene. The photo of one dog shrinks to a dot on Delhi, then the record spreads across the map of India while the count climbs to 30,288.
  - `Ventures`: the three things founded before StrayPaw, as cards that stack while you scroll.
  - `Experience`: four jobs, each as the question it was about.
  - `Research`: labs, the forecast ledger, the research models, the market map and the papers.
  - `Projects`: tools and games. On a wide screen the page scrolls them past sideways.
  - `Life`: a strip of photos, oldest first, then education and leadership.
- `components/Footer.tsx` is the contact panel. It waits under the page and is uncovered as the page ends.
- Detail pages stay as they were: `/work/[slug]` (case studies), `/play/[slug]` (each build, live), `/ledger`, `/market-map` and `/artifacts`.
- Old section URLs (`/startups`, `/research`, `/about`, ...) forward to the matching anchor on the home page.
- `public/previews` are screenshots of live sites and lab pages, `public/covers` first pages of the PDFs, `public/logos` organisation logos, `public/photos` personal photos.

## Design

Two tones only: one blue and white. Cards and bands are tints of that blue (tokens in `app/globals.css`); photos and product screenshots are the only other colour. One typeface, Bricolage Grotesque, set narrow and heavy for headlines (`.display`).

Motion is scroll-led (`components/motion.tsx`). Every scene has a still layout for visitors who ask for reduced motion, and the pinned scenes only pin where the screen is large enough.

## Checks

```sh
python -m http.server 3000 --directory out
npm run test:browser
```

Loads every route on desktop, mobile, dark mode and full motion; checks overflow, browser errors and WCAG 2.1 AA (axe); exercises the menu, the StrayPaw scene, a case page, the forecast bet, the dataset filter and the physics toy; and confirms every local link resolves. `npm run test:production` runs the same checks against kapoorjay.com.

Check against the exported build, not only `npm run dev`: development mode runs effects twice and can hide ordering bugs in the scroll scenes.
