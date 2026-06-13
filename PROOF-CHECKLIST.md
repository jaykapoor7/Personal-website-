# Proof checklist

Every item below is currently a labeled `coming_soon` placeholder on the site.
To activate one: add the file to `public/proof/` (or get a public URL), then in
the matching `content/*.ts` object set `status: "available"` and add `url`.

Nothing here is fabricated — links and metrics only go live when you provide
the real artifact.

## Already live ✅
- **X / building in public** — `@jaybuildsvx` (Juno ADHD OS + Writing)
- **LinkedIn** — `in/jay-kapoor7`
- **Email** — `jak581@pitt.edu`
- **Resume PDF** — `public/jay-kapoor-resume.pdf`

## Work (`content/work.ts`)
- [ ] **Crowwd** — live platform URL · competitive-analysis sample (PDF, redacted) · Arthavaad event photos
- [ ] **Juno-AI** — live link/archive · product screenshots
- [ ] **Juno ADHD OS** — repo URL · live product URL
- [ ] **HDFC Bank** — client-safe investment pitch deck (PDF, redacted)
- [ ] **TARC** — feasibility analysis sample (PDF, redacted)
- [ ] **Project Nidaan** — field-research write-up (PDF) · KPI dashboard screenshot
- [ ] **The Finer Things Club** — initiative page/archive · artisan & product photos

## Writing & Research (`content/writing.ts`)
- [ ] **India HealthTech Market Map** — published PDF · read-online link
- [ ] **Investment Memo Series** — one representative memo (PDF)
- [ ] **Healthcare Accessibility Research (IJEDR)** — publication link / PDF

## Portrait photo
- [ ] Add a photo at `public/jay-kapoor.jpg`, then set `portrait.available: true` in
  `content/profile.ts`. It renders (grayscale, on-brand) on the Home hero and About page;
  until then a clean "JK" placeholder shows.

## Optional polish
- [x] Favicon + 1200×630 OG share image (generated at build time via `next/og`)
- [ ] Swap `siteUrl` in `app/layout.tsx` to your final/custom domain
