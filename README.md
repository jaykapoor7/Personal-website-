# Jay Kapoor

Personal site at https://kapoorjay.com. Next.js 14, React 18, TypeScript, Tailwind and framer-motion, exported as static files.

```sh
npm ci
npm run dev
npm run build   # exports to out/
```

## How it is put together

- `content/site.ts` holds everything, each item once: ventures, roles, labs, writing, builds, leadership, education and personal photos. Every item links to the real organisation or product first; PDFs are listed as supporting documents.
- `app/page.tsx` is the landing page, and it is one scroll (`components/home/Scene.tsx`). It opens on one sentence about who I am, with my photo set into it. Scrolling grows that photo into a single frame, and the frame steps through the four things I started, each with its name, one line and one number. After it, four links lead to the rest. Visitors who ask for reduced motion get the same content laid out still (`Hero` and `Featured`).
- `/experience`, `/research`, `/projects` and `/about` are their own pages. Each has its own form, in `components/home/`:
  - `Experience`: four cards on a blue band. Each turns over to show what the work was, its documents and links.
  - `Research`: the labs as a short index that opens in place, beside four tiles of my own research (ledger, research models, market map, memos).
  - `Projects`: six builds in a grid of different sizes on a tinted band. The physics toy runs live in its tile.
  - `About`: every photo as a slat (folded slats are blue; the one you point at opens in full colour), then education and leadership, then `Timeline`: everything with dates on one band from 2019 to now.
- `components/Nav.tsx` is two things: my name, and one button that names the page you are on and opens a full-screen menu. `components/Footer.tsx` is the contact panel, uncovered as each page ends.
- Detail pages: `/work/[slug]` for the four startups and the jobs with enough to say (`content/archive.ts` decides), `/play/[slug]` for each build, live, plus `/ledger`, `/market-map` and `/artifacts`. Everything else opens in place on its section page.
- Old URLs (`/startups`, `/writing`, retired case pages, old project slugs) are redirected in `vercel.json`, so there are no stub pages.
- `public/research-models` is a small static site of five interactive public-health models. It shares the main site's typeface and palette (`style.css`); its chart series are four steps of the one blue, light to dark, and lines also differ by dash.
- `public/previews` are screenshots of live sites, `public/covers` first pages of the PDFs, `public/logos` organisation logos, `public/photos` personal photos.

## Design

Two tones only: one blue and white. Cards and bands are tints of that blue (tokens in `app/globals.css`); photos and product screenshots are the only other colour. One typeface, Bricolage Grotesque, set narrow and heavy for headlines (`.display`).

The landing page is driven by scroll; the other pages move when you point or tap (`components/motion.tsx` holds the shared pieces). Every animation is skipped for visitors who ask for reduced motion. No glows or soft halos: edges are a thin line and a tight shadow.

Copy rule: as few words as possible. Names, roles, dates and numbers; the work is shown, not described. No taglines, no section captions.

## Checks

```sh
python -m http.server 3000 --directory out
npm run test:browser
```

Loads every route on desktop, mobile, dark mode and full motion; checks overflow, browser errors and WCAG 2.1 AA (axe); checks the landing scene reaches its last startup; exercises the menu, a lab row, an experience card, a photo slat, a timeline bar, the forecast bet, the dataset filter and the physics toy; and confirms every local link and every redirect target resolves. `npm run test:production` runs the same checks against kapoorjay.com.

Check against the exported build, not only `npm run dev`: development mode runs effects twice and can hide ordering bugs.
