# Jay Kapoor’s website

A static Next.js site with two connected areas: a Playground of existing interactive builds and a straightforward portfolio. `npm run build` exports the site to `out/`.

```bash
npm install
npm run dev
npm run build
```

## Updating content

- `content/site.ts`: introduction, professional projects, experience, writing, and links. Project pages and their sitemap entries come from these arrays.
- `content/play.ts`: the Playground collection. Add an item only when a working experiment exists. Each item gets `/play/[slug]` and a live embedded preview with an external fallback.
- `components/ProjectMorph.tsx`: the five featured projects share one SVG composition. Each scene has five paths with matching command types; keep that structure when adding another composition so the shapes interpolate cleanly.
- `public/`: project images, source documents, and the current résumé PDF.

Keep titles, dates, and claims tied to a source. Some organizations Jay named have no verified dates, so the site omits those dates.

## Design and motion

The Playground uses warm paper, navy, and distinct colors for each build. The professional side keeps the quieter green palette. The mode switch uses the browser View Transitions API when available; normal navigation remains available without it. The project navigator uses Framer Motion to interpolate SVG paths. Reduced motion removes these transitions.

## Routes

`/` and `/play` are the Playground. `/play/[slug]` contains live projects. `/about`, `/work`, `/work/[slug]`, `/experience`, `/writing`, and `/contact` form the portfolio. Older research routes and project URLs remain available.
