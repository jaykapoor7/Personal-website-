# Jay Kapoor

Personal site at https://kapoorjay.com. Next.js 14, React 18, TypeScript, Tailwind and framer-motion, exported as static files.

```sh
npm ci
npm run dev
npm run build   # exports to out/
```

## How it is put together

- `content/site.ts` holds everything, each item once: ventures, roles, labs, writing, builds, leadership, education and personal photos. Every item links to the real organisation or product first; PDFs are listed as supporting documents.
- `app/page.tsx` is the whole portfolio: an introduction, then sections (Ventures, Experience, Research, Writing, Builds, Education & leadership) that switch in place, then About. `/#research` and friends open a section directly; old URLs like `/work` forward there.
- `components/Sections.tsx` renders each section. `components/BuildsBrowser.tsx` runs the tools and games live in the page. `components/PortfolioTabs.tsx` handles the section switcher.
- `public/previews` are screenshots of live sites and lab pages, `public/covers` first pages of the PDFs, `public/logos` organisation logos.

Light only: white and indigo, one typeface (Inter Tight). Animations switch off with reduced motion.

## Checks

```sh
python -m http.server 3000 --directory out
npm run test:browser
```

Loads every route on desktop, mobile, dark mode and full motion; checks overflow, browser errors and WCAG 2.1 AA (axe); exercises the menu, dataset filter and physics toy; and confirms every local link resolves. `npm run test:production` runs the same checks against kapoorjay.com.
