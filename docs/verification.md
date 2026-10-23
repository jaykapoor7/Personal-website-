# Release verification

Run after `npm run build` with `out/` served locally:

```sh
python -m http.server 3000 --directory out
npm run test:browser
```

Last local run (October 2026 redesign): 20 routes passed on desktop (1440px), emulated iPhone 13, dark mode, and full-motion desktop with no horizontal overflow, no browser errors, and no axe WCAG 2.1 A/AA violations on desktop and dark. All 56 local links and images referenced by those routes returned HTTP 200. The mobile menu, healthtech sector filter, and physics toy were exercised.

External sites (StrayPaw, games, prototypes, LinkedIn) are linked but not tested by the suite.
