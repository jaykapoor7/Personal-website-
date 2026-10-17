# Creative direction audit — October 17, 2026

This audit is for the isolated concept branch. Production remains at commit `ba21347` while concepts are reviewed.

## Current deployment and code

- `/` is a standard hero → four-card grid → selected projects → about CTA → footer. The layout remains a portfolio even though its labels say Playground.
- `content/play.ts` lists Road360, Recovery Intelligence, Search Visibility Checker, and Juno Preventive Health. These are real builds, but none establishes the original experiment collection Jay described. Their dedicated routes largely frame external products. Remove this collection from the eventual Playground until a genuinely interactive experiment is ready.
- `components/ModeLink.tsx` changes routes through `NavigationMotion.tsx`; CSS applies a circular root reveal. The decorative dots do not participate in a shared spatial transformation.
- `components/ProjectMorph.tsx` interpolates five related polygon outlines. The scenes are nearly the same loose pentagon, with palette changes and a photograph whose URL changes. The visual does not encode a paw/map, health interface, or Crowwd work.
- `app/work/page.tsx` repeats every item in the `experience` array even though `/experience` has the same list. Keep Work for projects and Experience for roles.
- Home wording includes the phrases Jay explicitly rejected. The copy should be brief and literal.
- `content/site.ts` combines the SCI 3Sixty fellowship and nonprofit AI adoption work under Prof. Farzan. Jay has clarified these are distinct workstreams. Keep them separate until an appointment is verified.
- Existing project images, PDFs, résumé, writing pages, and verified role dates remain useful. The currently deployed résumé is a concise regenerated version based on screenshots; a user-supplied current résumé would be a stronger source.

## Reference inspection

- Neal.fun (live browser): the gateway is visually simple and gives each completed experience a distinct identity. The projects themselves supply the play. The current portfolio fails because it presents tools as experiments.
- A Number From the Ghost (live browser): dark immersive full-window stage, sparse interface, and scene-first presentation. Initial automated capture remained on its loading state, so this reference is used for composition and stated principles rather than claimed animation details.
- Species in Pieces: the HTTPS origin returned HTTP 503. The HTTP version returned its page and title but remained on its generating screen during automated inspection. Its 30-piece premise and the brief inform the morph study; no claim of reproducing the live transition mechanics.
- Pointer Pointer (live browser): one instruction and one action fill the entire screen. The current homepage has too many explanatory sections for that simplicity.
- Bruno Simon (live browser): a world first, navigation second. This informs tactile exploration, without compulsory 3D.
- Paco and Rauno (live browser): economical editorial presentation for professional content.

## Prototype criteria

1. Each concept has a recognizable visual grammar and a two-way mode switch that reorganizes the same elements.
2. The default state shows Jay, StrayPaw, a direct professional route, and a small honest space for future experiments. No existing utility is relabeled as an original Playground experiment.
3. The project navigator must visibly form different subjects from the same constituent shapes across at least StrayPaw, Juno-AI, and Crowwd.
4. Review all four prototypes on desktop and mobile. Test keyboard, back/forward, reduced motion, and direct links. Do not merge to main before approval.
