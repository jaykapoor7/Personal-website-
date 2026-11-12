# Jay Kapoor

Personal site at https://kapoorjay.com. Next.js 14, React 18, TypeScript, Tailwind and framer-motion, exported as static files.

```sh
npm ci
npm run dev
npm run build   # exports to out/
```

## How it is put together

- `content/site.ts` holds everything, each item once: ventures, roles, labs, writing, builds, leadership, education and personal photos. Every item links to the real organisation or product first; PDFs are listed as supporting documents.
- `app/page.tsx` is the landing page (`components/home/Home.tsx`). The hero (`Hero`) is one sentence about what I do, with my photo set into it; it stays put while one white sheet slides up over it. On the sheet: a three-sentence introduction that fills in word by word as you scroll (`Intro`), then what I started, oldest first, each as what was broken and what I built (`Work`), with one picture beside the list that follows the row at the middle of the screen. Four rows at the end lead to the rest.
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

Two tones only: one calm blue and white. Cards and bands are tints of that blue (tokens in `app/globals.css`; the Research Models site repeats them in its `style.css`); photos and product screenshots are the only other colour. One typeface, Bricolage Grotesque, set narrow and heavy for headlines (`.display`). No glows or soft halos: edges are a thin line and a tight shadow.

Scrolling is the main motion, so it has to be smooth:

- `components/SmoothScroll.tsx` eases mouse-wheel scrolling with Lenis, so the whole page moves as one. Touch screens scroll natively, and visitors who ask for reduced motion are left alone.
- Anything tied to scroll changes only `opacity` or `transform`, and follows the scroll position directly. Nothing animates size or position in layout, and nothing re-renders while scrolling.
- The landing page pins nothing except with `position: sticky`, which the browser handles itself.

Copy rule: as few words as possible. Names, roles, dates and numbers; the work is shown, not described. No taglines, no section captions.

## Checks

```sh
python -m http.server 3000 --directory out
npm run test:browser
```

Loads every route on desktop, mobile, dark mode and full motion; checks overflow, browser errors and WCAG 2.1 AA (axe); checks the landing page has the introduction and the four startups, and that its picture follows the list; exercises the menu, a lab row, an experience card, a photo slat, a timeline bar, the forecast bet, the dataset filter and the physics toy; and confirms every local link and every redirect target resolves. `npm run test:production` runs the same checks against kapoorjay.com.

Check against the exported build, not only `npm run dev`: development mode runs effects twice and can hide ordering bugs.
