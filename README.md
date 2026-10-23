# Jay Kapoor — The Living System

Personal portfolio at https://kapoorjay.com. Static Next.js 14 App Router export, React 18, TypeScript. This repository and Vercel's `personal-website` project are the only deployment targets for this site.

```sh
npm ci
npm run dev
npm run build
```

The build exports every route and artifact to `out/`. No API keys, database, CMS, or server runtime are required.

## Experience

The homepage follows one observation into a shared record and a wider care workflow. Three scale controls and the map markers offer direct navigation. At system scale, toggle shared records to see the handoffs disappear and reconnect. CSS drives camera movement; reduced motion disables transitions and ambient pulses. This is an illustrated system, not a map of live StrayPaw data.

Main routes: `/`, `/work`, `/research`, `/play`, `/about`. Existing `/experience`, `/writing`, `/contact`, `/ledger`, `/thesis`, project detail routes, PDFs, and résumé remain available.

## Content and source integrity

- `content/site.ts`: projects, role dates, documents, links. Major projects are curated in `app/work/page.tsx`.
- `components/LivingSystem.tsx`: illustrated neighborhood and causal shared-record interaction.
- `components/ProjectInteractions.tsx`: care workflow, Nidaan qualitative themes, Juno information pathway.
- `components/EverythingFalls.tsx`: pointer, touch, and keyboard physics experiment.
- `app/globals.css`: full responsive design system; original CSS is no longer imported.
- `docs/portfolio-evidence-audit.md`: positioning, source hierarchy, verification limits.
- `public/`: original project artifacts and photography.

Preserve distinctions between data records and outcomes, research contributions and ownership, prototypes and deployed clinical products, and illustrative analysis and measured findings. LinkedIn was inaccessible directly during this redesign; dates rely on the documented existing portfolio record and résumé.

StrayPaw and all other project repositories/deployments are outside this repository's scope. Do not deploy this portfolio to their Vercel projects.

## Browser verification

After building, serve the export and run the browser suite in another terminal:

```sh
python -m http.server 3000 --directory out
npm run test:browser
```

The suite uses system Chromium when available, or Playwright's installed browser. Set `PLAYWRIGHT_CHROMIUM_PATH` for a custom binary and `BASE_URL` to verify another origin. It checks the causal map interaction, project controls, keyboard and touch physics, responsive layouts, reduced motion, accessibility, route availability, and navigation without JavaScript.
