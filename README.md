# Jay Kapoor

Personal portfolio: [kapoorjay.com](https://kapoorjay.com). Built with Next.js 14, TypeScript, Tailwind and React. Exported as static files for Vercel.

```bash
npm ci
npm run dev
npm run build # generates out/
```

## Homepage

The homepage is a calm, single-column portfolio inspired by the clarity of classic personal websites. The goal: let visitors understand who Jay is and open real work almost immediately.

- `components/home/Home.tsx` is the homepage: a personal introduction and photo, four numbered case studies with visible preview images, compact experience rows, research and writing links, small projects, a complete expandable work archive, and a personal photo/education section.
- `components/Nav.tsx` provides direct section anchors and resume access. It does not hide the work behind a full-screen menu.
- `components/Footer.tsx` holds a compact contact block with email, copy action, social links, and local time.
- `app/globals.css` has neutral ink/white tokens and a restrained blue accent. Images are the source of expressive color.
- `app/layout.tsx` provides the site shell, metadata, skip link, and smooth-scrolling preference handling.

Existing individual pages remain intact: `/work/[slug]` for full case studies, `/play/[slug]` for interactive projects, `/ledger`, `/market-map`, `/artifacts`, and the standalone static site in `public/research-models`.

## Content

`content/site.ts` is the source for ventures, roles, labs, research, writing, builds, education, and personal photos. `content/work.ts` composes the full index and links, reused by the homepage's selected work and expandable archive. Add or correct actual work there rather than duplicating claims.

The best project pages show a problem, what was done, artifacts or screenshots, what changed, and direct proof links. Keep numbers honest and distinguish shipped work from research, prototypes and plans.

## Checks

```bash
npm run build
python -m http.server 3000 --directory out
npm run test:browser
```

`scripts/verify-portfolio.mjs` checks desktop and mobile routes, accessibility (axe WCAG 2.1 AA), horizontal overflow, the selected case studies, the complete work archive, anchor links, back links, live experiments, local assets, and redirects. Preview builds must pass before merging to the production branch.

## Design notes

Short, natural first-person writing; a single readable column; work accessible without menus; numbered projects with one-line explanations; semantic headings; real links, documents, and visual proof. Keep motion subtle and honor reduced-motion preferences. Avoid decorative cards, gratuitous hover effects, or copying another portfolio's code, wording, or distinctive visual identity.
