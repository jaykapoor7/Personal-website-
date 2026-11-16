# Jay Kapoor

Personal site at https://kapoorjay.com. Next.js 14, React 18, TypeScript, Tailwind and framer-motion, exported as static files.

```sh
npm ci
npm run dev
npm run build   # exports to out/
```

## How it is put together

- `content/site.ts` holds the facts, each once: ventures, roles, labs, writing, builds, leadership, education and photos.
- `content/cases.ts` is the editorial layer for each case page: one line, context, problem, what I did, and outcomes. Every outcome is labelled as Measured, Shipped, Partnership, Pilot or Published. Every sentence restates a fact from `site.ts`, a linked document or the Research Models site.
- `content/work.ts` builds the complete index and the experience list from those two files.
- The home page (`components/home/`) is a short CV, after cali.so:
  - `Intro`: one statement, "Jay Kapoor [face]. I find broken systems and try to find solutions.", then four short paragraphs ending in where to find me.
  - `Tiles`: Work, Writing, Photos and Play. Each shows a small stack of what is inside, which fans out on hover or focus.
  - Six numbered sections, each a compact `List`: 01 Selected work, 02 Experience (with education and leadership), 03 Research, 04 Writing, 05 Photos (a shelf of prints; a strip on phones) and 06 Play.
  - `List` slides a soft highlight to the row under the pointer or focus and reveals rows as they scroll in. Every row shows its own small picture.
  - `components/Preview.tsx` shows a larger copy of the picture beside a mouse pointer. It keeps its own state, so lists never redraw for it.
- `components/Dock.tsx` is the way around every page: a dock at the bottom whose icons grow as the pointer nears, with labels on hover and focus. `components/Footer.tsx` holds contact and an index.
- Opening a project from a list, its picture and title grow into the case page's own. They share a `view-transition-name`; browsers without view transitions just change page.
- `/work/` is the complete index, every entry numbered and grouped: startups, experience, research, writing, projects, play.
- Each case page at `/work/[slug]` follows one structure: kind, years and status, name, one line, role, when and links, key numbers, the picture, then context, problem, what I did, outcomes and documents. Shorter entries simply leave parts out.
- Each tool and game has a page at `/play/[slug]`, running live. `/ledger`, `/market-map` and `/artifacts` are unchanged.
- `vercel.json` redirects old URLs to their part of the site, so there are no stub pages.
- `public/research-models` is a small static site of five interactive public-health models. It keeps its own design.
- Images:
  - `public/previews` holds screenshots of live sites.
  - `public/covers` holds the first pages of the PDFs.
  - `public/thumbs` holds small copies of both, for lists. Run `node scripts/make-thumbs.mjs` after adding either.
  - `public/photos` holds personal photos.

## Design

Read `docs/design.md` before changing type, colour or copy.

- Ink on warm paper, mostly monochrome. Blue (`--accent`) is the only accent: links on hover, focus rings, the live dot and measured outcomes.
- Three typefaces:
  - Newsreader (serif) for names and headings.
  - Inter for reading.
  - JetBrains Mono, small and uppercase, for section numbers, dates and labels.
- One frame, 1120px wide on desktop, with dashed hairlines down both sides. The opening statement runs across it; the bio sits beside the tiles; each section has its label in a sticky left column and its list on the right. Prose keeps its own measure (about 560–640px). Phones get one column.
- Rows, not cards. Thin dividers, no gradients, no glows.
- Motion is small and never needed to read anything:
  - A picture zooms slightly on hover.
  - An arrow appears on hover or keyboard focus.
  - Pages fade into each other.
  - Mouse-wheel scrolling is eased with Lenis; touch screens scroll natively, and reduced motion turns all of it off.

## Checks

```sh
python -m http.server 3000 --directory out
npm run test:browser
```

The script runs these checks:
- It loads every route on desktop, mobile, dark mode and full motion.
- On each route it checks for horizontal overflow, browser errors and WCAG 2.1 AA problems (with axe).
- On the home page it checks the sentence, that the sections are in order, and the five selected projects, with pictures showing without hover. It checks that the first project is on a laptop's first screen and that the experience list is there.
- It opens a project with the keyboard and checks the case page has context, problem, what I did and labelled outcomes.
- It follows the top bar to the complete index.
- It checks the photos, the forecast bet, the dataset filter and the physics toy.
- It confirms every local link and every redirect target resolves. `npm run test:production` runs the same checks against kapoorjay.com.

Check against the exported build, not only `npm run dev`: development mode runs effects twice and can hide ordering bugs.
