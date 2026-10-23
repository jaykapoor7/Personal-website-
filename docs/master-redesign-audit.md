# Master portfolio redesign — 23 October 2026

## Scope and sources

Only `jaykapoor7/Personal-website-` and its existing `personal-website` Vercel project are release targets. StrayPaw and the game repositories were read for evidence; none were modified.

Reviewed the live portfolio, its Git history (especially `0f18bb8`, before the two recent redesigns), all linked local artifacts, the newly supplied résumé, and seven supplied LinkedIn screenshots. The direct LinkedIn URL returns HTTP 999; the supplied screenshots are the profile source for this revision. The source résumé replaces the previous generated résumé at its existing URL.

The Drive search found older résumés and an original Juno research document. The original Juno document is private, and publishing its exported PDF requires the specific user approval requested during this session. It is excluded from the public release unless that approval arrives. Private Drive links and unrelated documents are not published.

## What leads and why

- **StrayPaw:** live product and public code; 30k+ animal records and 28 cities are supported by the public README and supplied résumé. The supplied LinkedIn update reports 19 NGO partnerships and names partners. Record counts are not care outcomes. No rescue, response-time, or clinical-success metric was inferred.
- **Nidaan:** direct fieldwork, a public brief, and an XLSX work sample. The brief specifies 55 interviews but calls coded frequencies illustrative; display qualitative themes and the interview count, never a population percentage.
- **Juno:** historical platform plus a later system-design paper. The user’s résumé/profile report 10k+ rural users. The existing paper does not independently audit that count. Its formative evaluation is not clinical validation. The existing dashboard image is an archived interface mockup with illustrative figures, not audited outcome evidence.
- **Crowwd:** speaker-series photographs and research/strategy PDFs give inspectable evidence of operating work. Wider platform traction is not attributed to Jay.
- **TOT Schools:** résumé and case study document six functions across eight centres, software rollout, staffing, and a 12-document SOP suite. The case study is an author-reported work sample.
- **Research:** accessible human–machine interaction, applied AI, clinical data abstraction, and cell-culture contributions are bounded descriptions. No inferred publication authorship or institutional outcomes.
- **Market research:** the downloadable CSV actually contains 36 companies in nine source categories. Display exactly that dataset. The broader 55-organization landscape described in the résumé is not substituted for the file’s row count.
- **Other operating work:** HDFC, TARC, Finer Things Club, and earlier research remain accessible. Artisan counts and revenue are reported in the supplied résumé and LinkedIn screenshot; not independently audited sales data.

## Conflicting dates

The supplied résumé differs from LinkedIn on Crowwd, HDFC, Juno, Apodaca, and UPMC. Avoid unsupported month precision: Crowwd/HDFC use 2025, Juno uses “Founded 2019,” Apodaca uses 2024–2025. UPMC uses the supplied current LinkedIn screenshot’s Aug 2025–Jan 2026 dates. Original résumé bytes remain unmodified. No attempt was made to silently reconcile source documents.

## Complete artifact restoration

The old proof index’s local artifact paths were compared with current source references. All remain on disk and are linked in project pages, galleries, writing pages, or `/artifacts`, including the previously orphaned Crowwd teardown, Nidaan dashboard, Qure.ai memo, and Juno mockup. The original portrait remains accessible and linked; it is the same photograph as the supplied Pitt portrait. Old project and archive routes remain available. Juno ADHD OS is listed as a documented prototype from the supplied LinkedIn project screenshot. School leadership and the economics-fest contribution remain in the broader experience index.

## Photography

Five supplied photographs are used: childhood running, childhood football, Trojans, school ceremony, and the Pitt portrait. They are encoded to 640/1280 WebP variants without changing faces. Group photographs use `contain`; the comparison supports revealing either full image. The award’s exact title and date are not asserted, and the event is not labelled a Pitt graduation. Existing StrayPaw and Arthavaad photographs remain with their projects. The three absent personal memories were explicitly deferred by the user.

## Data and experiments

The connection engine’s first three scales are illustrative. The final scale and project explorer use the 254 geographic area aggregates in StrayPaw’s public `landing-area-archive.json`, retrieved 23 October 2026. The map is labelled as an archive, not live data, and links to its exact source and the actual product. No live API dependency or privileged data is used.

Everybody’s on Strike and The World’s Worst Emergency Service are shipped external games. The existing gravity desk is presented as a portfolio experiment, “Permission to Fall.” A Very Small Government is explicitly a new miniature portfolio sketch, not an independently shipped product. Utility builds remain labelled prototypes.

## Visual direction

The previous cream/green/serif interface is removed from the root imports. `app/experience.css` is a new, self-contained design system: Space Grotesk, black/cobalt, wide editorial grids, a full-width dark connection engine, distinct project exhibits, an interactive personal archive, and a cobalt contact ending. The previous CSS remains in Git for history but is not bundled.
