# Jay Kapoor — Proof-of-Work Portfolio

A dark, minimal, editorial portfolio that acts as a **proof layer for my
resume**: every claim links to something you can open, read, or try.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion**,
statically exported so it can be hosted anywhere.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build (static export)

```bash
npm run build    # outputs a fully static site to ./out
```

## Deploy

The site is a static export (`output: "export"` in `next.config.mjs`).

- **Vercel** (recommended): import the repo; framework preset "Next.js" works
  out of the box. The resulting URL is what goes on the resume.
- **Any static host** (GitHub Pages, Netlify, S3): serve the contents of `./out`.

## How it's organized

```
app/                 Routes (Home, Work, Work/[slug], Writing, About, Contact)
components/           UI: Nav, Footer, Reveal (motion), Metric, Proof, WorkCard…
content/             Single source of truth — edit these, not the components
  ├─ types.ts        Shared schema (Metric, Proof, WorkItem, …)
  ├─ work.ts         Experience + builds, as case studies
  ├─ writing.ts      Research, publications, building-in-public
  ├─ profile.ts      Identity, education, skills, headline stats
  └─ socials.ts      External links
lib/order.ts         Display ordering (impact → recency → relevance)
public/              Resume PDF + /proof assets
```

### Editing content

All copy and data live in `content/*.ts`. Components never hard-code content.

**Metrics** must declare a `source` (`"resume" | "analytics" | "published" |
"estimated"`). The source is shown in the UI, so nothing reads as an
unverifiable fact. If there's no evidence for a number, omit it.

**Proof** objects drive the evidence UI dynamically:

```ts
proof: {
  type: "live" | "pdf" | "image" | "social" | "video" | "repo",
  status: "available" | "coming_soon",
  title: string,
  url?: string,   // only when available
  note?: string,
}
```

`coming_soon` slots render as labeled placeholders and are intentionally kept —
they show recruiters exactly what proof is on the way.

**Ordering**: work is sorted by `impact → recency → relevance`, not by date
(`lib/order.ts`).

## Supplying proof assets

See [`PROOF-CHECKLIST.md`](./PROOF-CHECKLIST.md) for the exact list of links and
files to drop in. To activate a placeholder: add the file to `public/proof/`
(or get a URL), then set the matching proof object's `status` to `"available"`
and fill in `url`.
