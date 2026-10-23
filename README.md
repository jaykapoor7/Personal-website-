# Jay Kapoor

Personal site at https://kapoorjay.com. Next.js 14, React 18, TypeScript, Tailwind and framer-motion, exported as static files.

```sh
npm ci
npm run dev
npm run build   # exports to out/
```

## How it is put together

- `content/site.ts` holds everything: projects (each in a group: started, worked, research, side, game), the dated timeline, photos and writing. House style: no em dashes, "Resume" without accents.
- `public/previews` are screenshots of the live sites and lab pages; `public/covers` are first pages of the PDFs.
- `components/ProjectBrowser.tsx`: a browser with a tab per project. Sites that allow embedding run live in the tab; others show the real page or PDF, scrollable inside the window.
- `components/Timeline.tsx`: everything on one stretched timeline, with photos pinned where the year is known. Tap a bar for the outcome.
- `components/PhotoStack.tsx`: the swipeable photo pile on the home page. `components/Desk.tsx`: draggable polaroids on About.
- `components/Shelf.tsx`: PDF first pages fanned out. `components/EverythingFalls.tsx`: the physics toy.

Light only: white, indigo and soft mesh backgrounds. Every animation switches off with reduced motion.

## Checks

```sh
python -m http.server 3000 --directory out
npm run test:browser
```

Loads every route on desktop, mobile, dark mode and full motion; checks overflow, browser errors and WCAG 2.1 AA (axe); exercises the menu, dataset filter and physics toy; and confirms every local link resolves. `npm run test:production` runs the same checks against kapoorjay.com.
