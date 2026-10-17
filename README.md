# Jay Kapoor’s website

A personal site built with Next.js and TypeScript. The site exports static HTML to `out/`.

```bash
npm install
npm run dev
npm run build
```

## Updating content

Edit `content/site.ts` for the introduction, projects, experience, links, and writing list. Large projects go in `projects`; older work goes in `archiveProjects`. Project pages and the sitemap are generated from those arrays. Existing research PDFs and project images live in `public/`.

Keep claims, dates, and job titles grounded in a public source or résumé. Recent roles without verified dates intentionally omit them. The résumé PDF is an older document and should be replaced when an updated copy is available.

## Design

The visual system uses warm paper, dark green, and a restrained rust accent. Display type is DM Serif Display; body type is Inter. Motion uses Framer Motion for scroll entry and depth, with CSS transitions for hover states. `prefers-reduced-motion` removes movement.

## Routes

Home, work, project details, writing, ledger, about, contact, and an older research archive are statically generated. Older project URLs remain available.
