// Browser checks for the static export. Serve `out/` first:
//   python -m http.server 3000 --directory out && npm run test:browser
// Set BASE_URL to test another origin, PLAYWRIGHT_CHROMIUM_PATH for a browser binary.
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { chromium, devices } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const base = (process.env.BASE_URL || "http://127.0.0.1:3000").replace(
  /\/$/,
  "",
);
const executablePath =
  process.env.PLAYWRIGHT_CHROMIUM_PATH ||
  ["/opt/pw-browsers/chromium", "/usr/bin/chromium"].find(existsSync);
const browser = await chromium.launch({
  executablePath,
  args: ["--no-sandbox"],
});

// The landing page holds everything: who I am, an index of all the work, and
// photos. Case pages, the games and the research tools are their own pages. Old
// and retired URLs are redirected by vercel.json, checked further down.
const routes = [
  "/",
  "/work/straypaw/",
  "/work/juno-ai/",
  "/work/project-nidaan/",
  "/work/finer-things-club/",
  "/work/tot-schools/",
  "/work/crowwd/",
  "/play/strike/",
  "/play/road360/",
  "/play/everything-falls/",
  "/ledger/",
  "/market-map/",
  "/artifacts/",
];
// The Research Models pages are plain HTML with their own links; they get the
// same layout and accessibility checks but are left out of the link crawl.
// Vercel serves them at clean URLs; a plain static server needs the file name.
const local = /127\.0\.0\.1|localhost/.test(base);
const miniSite = [
  "/research-models/index.html",
  "/research-models/models/the-sterilization-paradox.html",
  "/research-models/notes.html",
  "/research-models/notes/the-70-percent-paradox.html",
  "/research-models/about.html",
].map((p) =>
  local ? p : p.replace(/index\.html$/, "").replace(/\.html$/, "/"),
);
const errors = [];

try {
  for (const [name, options] of [
    // Accessibility scans run with reduced motion so scroll-revealed content is visible.
    [
      "desktop",
      { viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" },
    ],
    ["mobile", { ...devices["iPhone 13"] }],
    [
      "dark",
      {
        viewport: { width: 1280, height: 900 },
        colorScheme: "dark",
        reducedMotion: "reduce",
      },
    ],
    ["motion", { viewport: { width: 1280, height: 900 } }],
  ]) {
    const context = await browser.newContext(options);
    const page = await context.newPage();
    page.on("pageerror", (e) => errors.push(`${name}: ${e.message}`));
    page.on(
      "console",
      (m) => m.type() === "error" && errors.push(`${name}: ${m.text()}`),
    );

    for (const route of [...routes, ...miniSite]) {
      const res = await page.goto(base + route, { waitUntil: "networkidle" });
      assert.equal(res.status(), 200, route);
      assert.equal(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth > innerWidth ||
            innerWidth > screen.width,
        ),
        false,
        `Horizontal overflow on ${route} (${name})`,
      );
      assert.equal(await page.locator("h1").count(), 1, `One h1 on ${route}`);
      if (name === "desktop" || name === "dark") {
        await page.waitForTimeout(2000); // let entrance animations settle
        // Embedded live builds are separate sites with their own checks.
        const axe = await new AxeBuilder({ page })
          .exclude("iframe")
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze();
        assert.deepEqual(
          axe.violations.map((v) => `${v.id}: ${v.nodes[0]?.target}`),
          [],
          `Accessibility violations on ${route} (${name})`,
        );
      }
    }

    await page.goto(base + "/", { waitUntil: "networkidle" });
    assert.match(await page.locator("h1").innerText(), /Jay/);

    // The landing page: who I am, a short introduction, and every piece of work.
    const rows = () => page.locator("#work .work-row").count();
    assert.equal(await rows(), 27, "Every piece of work is in the index");
    assert.match(
      await page.locator("main").innerText(),
      /grew up in Bangalore/,
      "The introduction is on the landing page",
    );
    const screens = await page.evaluate(
      () => document.documentElement.scrollHeight / innerHeight,
    );
    assert.ok(
      screens < (name === "mobile" ? 11 : 8),
      `Landing page is ${screens.toFixed(1)} screens long`,
    );

    // A filter narrows the index to one kind, and the address says which.
    const filters = page.getByRole("group", { name: "Show" });
    await filters.scrollIntoViewIfNeeded();
    await filters.getByRole("button", { name: /^Projects/ }).click();
    await page.waitForTimeout(700);
    assert.equal(await rows(), 6, "Projects filter shows six");
    assert.match(page.url(), /#projects$/, "The filter is in the address");
    await filters.getByRole("button", { name: /^All/ }).click();
    await page.waitForTimeout(700);

    // With a mouse, the picture for the row you point at follows the cursor.
    if (name === "motion") {
      const row = page.locator("#work .work-row").first();
      await row.scrollIntoViewIfNeeded();
      await row.hover();
      await page.waitForTimeout(700);
      const card = page.locator("#work > [aria-hidden='true'] > div");
      assert.equal(
        await card.evaluate((el) => getComputedStyle(el).opacity),
        "1",
        "The preview shows beside the cursor",
      );
      assert.ok(
        (await card.locator("img").count()) > 0,
        "The preview holds a picture",
      );
      await page.mouse.move(5, 5);
    }

    // A photo opens in place.
    const photo = page.getByRole("button", { name: "The Trojans" });
    await photo.scrollIntoViewIfNeeded();
    await photo.click();
    assert.equal(
      await photo.getAttribute("aria-pressed"),
      "true",
      "Photo slat opens",
    );

    // The menu is one button on every screen size; Research opens the index
    // on research.
    await page.getByRole("button", { name: "Open menu" }).click();
    await page
      .locator("#menu")
      .getByRole("link", { name: /Research/ })
      .click();
    await page.waitForTimeout(1600);
    assert.match(page.url(), /#research$/, "Menu leads to research");
    assert.equal(
      await filters
        .getByRole("button", { name: /^Research/ })
        .getAttribute("aria-pressed"),
      "true",
      "Menu opens the index on research",
    );

    // A case page leads back to its part of the index.
    await page.goto(base + "/work/juno-ai/", { waitUntil: "networkidle" });
    await page.locator('article header a[href="/#startups"]').click();
    await page.waitForURL(/\/#startups$/);
    await page.waitForTimeout(900);
    assert.equal(await rows(), 4, "Back lands on the startups");

    // Bet against me: lock in odds and see mine.
    await page.goto(base + "/ledger/", { waitUntil: "networkidle" });
    const lock = page.getByRole("button", { name: "Compare with mine" });
    await lock.scrollIntoViewIfNeeded();
    await lock.click();
    assert.match(
      await page.locator("main").innerText(),
      /I said \d+%/,
      "Bet reveals my odds",
    );

    // The market map filters by sector.
    await page.goto(base + "/market-map/", { waitUntil: "networkidle" });
    const tiles = () => page.locator("main ul button[aria-pressed]").count();
    const allTiles = await tiles();
    await page
      .getByRole("group", { name: "Filter by sector" })
      .getByRole("button", { name: "Diagnostics", exact: true })
      .click();
    await page.waitForTimeout(400);
    const some = await tiles();
    assert.ok(
      some > 0 && some < allTiles,
      "Sector filter narrows the market map",
    );

    await page.goto(base + "/play/everything-falls/", {
      waitUntil: "networkidle",
    });
    assert.ok(
      (await page.locator(".falls-object").count()) > 5,
      "Physics objects render",
    );
    await context.close();
  }

  // Every local file or page linked from the site resolves.
  const page = await browser.newPage();
  const links = new Set();
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    await page.waitForLoadState("networkidle"); // let forwarding pages finish
    for (const href of await page.$$eval("a[href^='/'], img[src^='/']", (els) =>
      els.map((e) => e.getAttribute("href") || e.getAttribute("src")),
    ))
      links.add(href.split("#")[0] || "/");
  }
  for (const href of links) {
    const res = await page.request.get(base + href);
    assert.equal(res.status(), 200, `Broken local link ${href}`);
  }
  // Every redirect in vercel.json lands on something that exists.
  const { redirects } = JSON.parse(
    readFileSync(new URL("../vercel.json", import.meta.url), "utf8"),
  );
  for (const r of redirects) {
    const res = await page.request.get(base + r.destination.split("#")[0]);
    assert.equal(res.status(), 200, `Redirect target ${r.destination}`);
  }
  console.log(
    `Checked ${routes.length + miniSite.length} routes × 4 contexts, ${links.size} local links and ${redirects.length} redirects.`,
  );
  assert.deepEqual(errors, [], "Browser errors");
  console.log("All portfolio checks passed.");
} finally {
  await browser.close();
}
