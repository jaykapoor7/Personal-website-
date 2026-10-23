# Jay Kapoor

Personal site at https://kapoorjay.com. Next.js 14, React 18, TypeScript, Tailwind and framer-motion, exported as static files.

```sh
npm ci
npm run dev
npm run build   # exports to out/
```

## How it is put together

- `content/site.ts` holds the profile, projects, experience, writing and photos. House style: no em dashes and "Resume" without accents.
- `public/previews` are screenshots of the live sites (StrayPaw, the games, the side projects, Crowwd). `public/covers` are the first pages of the linked PDFs. Re-shoot them when a site changes.
- `components/Desk.tsx`: the draggable desk on the home and about pages.
- `components/Showcase.tsx`: a real site scrolls inside a browser window as the page scrolls.
- `components/WorkIndex.tsx`: the work list, with the real preview following the cursor.
- `components/LivePlay.tsx`: a screenshot that turns into the live site (iframe) when you press play. StrayPaw does not allow framing, so it is shown as a showcase instead.
- `components/Shelf.tsx`: PDF first pages fanned out like papers.

Every animation switches off with reduced motion, and pages still render without JavaScript.

## Checks

```sh
python -m http.server 3000 --directory out
npm run test:browser
```

Loads every route on desktop, mobile, dark mode and full motion; checks overflow, browser errors and WCAG 2.1 AA (axe); exercises the menu, dataset filter and physics toy; and confirms every local link resolves. `npm run test:production` runs the same checks against kapoorjay.com.
