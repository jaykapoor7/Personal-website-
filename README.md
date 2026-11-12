# Jay Kapoor

Personal site at https://kapoorjay.com. Next.js 14, React 18, TypeScript, Tailwind and framer-motion, exported as static files.

```sh
npm ci
npm run dev
npm run build   # exports to out/
```

## How it is put together

- `content/site.ts` holds everything, each item once: ventures, roles, labs, writing, builds, leadership, education and personal photos. Every item links to the real organisation or product first; PDFs are listed as supporting documents.
- `app/page.tsx` is the whole site on one page (`components/home/Home.tsx`). The hero (`Hero`) is one sentence about what I do, with my photo set into it; it stays put while one white sheet slides up over it. On the sheet:
  - `Intro`: a three-sentence introduction that fills in word by word as you scroll.
  - `WorkIndex`: everything I have done as one list (startups, experience, research, writing, projects), built in `content/work.ts`. Each row is a name, one line with the strongest fact, and a year. Filters narrow it to one kind and live in the address (`/#research`). With a mouse, the picture for the row you point at follows the cursor and leans with its speed; on phones each row carries a thumbnail.
  - `Photos`: every photo as a slat (folded slats are blue; the one you point at opens in full colour), then school and leadership in one line each. The blue versions are baked files in `public/photos/duo` (`node scripts/make-duo.mjs`).
- `components/Nav.tsx` is two things: my name, and one button that opens a full-screen menu of the parts of the landing page. `components/Footer.tsx` is the contact panel, uncovered as each page ends.
- Detail pages: `/work/[slug]` for the four startups and the jobs with enough to say (`content/archive.ts` decides), `/play/[slug]` for each build, live, plus `/ledger`, `/market-map` and `/artifacts`. Labs link to the lab; papers and memos open as PDFs.
- Old URLs (`/experience`, `/research`, `/projects`, `/about`, `/startups`, `/writing`, retired case pages, old project slugs) are redirected in `vercel.json` to their part of the landing page, so there are no stub pages.
- `public/research-models` is a small static site of five interactive public-health models. It shares the main site's typeface and palette (`style.css`); its chart series are four steps of the one blue, light to dark, and lines also differ by dash.
- `public/previews` are screenshots of live sites, `public/covers` first pages of the PDFs, `public/logos` organisation logos, `public/photos` personal photos.

## Design

Two tones only: one calm blue and white. Cards and bands are tints of that blue (tokens in `app/globals.css`; the Research Models site repeats them in its `style.css`); photos and product screenshots are the only other colour. One typeface, Bricolage Grotesque, set narrow and heavy for headlines (`.display`). No glows or soft halos: edges are a thin line and a tight shadow.

Scrolling is the main motion, so it has to be smooth:

- `components/SmoothScroll.tsx` eases mouse-wheel scrolling with Lenis, so the whole page moves as one. Touch screens scroll natively, and visitors who ask for reduced motion are left alone.
- Anything tied to scroll changes only `opacity` or `transform`, and follows the scroll position directly. Nothing animates size or position in layout, and nothing re-renders while scrolling.
- Hover effects wait for real mouse movement, so rows and photos that slide under a still cursor while you scroll do nothing. The index's cursor picture keeps its own state, so pointing at rows never redraws the list.
- The landing page pins nothing except with `position: sticky`, which the browser handles itself.

Copy rule: as few words as possible. Names, roles, dates and numbers; the work is shown, not described. No taglines, no section captions.

## Checks

```sh
python -m http.server 3000 --directory out
npm run test:browser
```

Loads every route on desktop, mobile, dark mode and full motion; checks overflow, browser errors and WCAG 2.1 AA (axe); checks the landing page has the introduction and all 27 pieces of work; exercises the index filters, the cursor picture, a photo slat, the menu (which opens the index on research), a case page's way back, the forecast bet, the dataset filter and the physics toy; and confirms every local link and every redirect target resolves. `npm run test:production` runs the same checks against kapoorjay.com.

Check against the exported build, not only `npm run dev`: development mode runs effects twice and can hide ordering bugs.
