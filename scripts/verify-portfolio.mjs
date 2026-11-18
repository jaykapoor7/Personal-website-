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

// The home page is a CV that leads into the work: an introduction, five
// selected projects, experience, research and writing, the personal section and
// contact. /work/ indexes everything; each project has a case page. Old URLs
// are redirected by vercel.json, checked further down.
const routes = [
  "/",
  "/work/",
  "/work/straypaw/",
  "/work/juno-ai/",
  "/work/project-nidaan/",
  "/work/straypaw-research-models/",
  "/work/finer-things-club/",
  "/work/tot-schools/",
  "/work/crowwd/",
  "/work/tarc/",
  "/work/hdfc-bank/",
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
    // What a screen reader hears.
    assert.equal(
      await page.locator("h1").getAttribute("aria-label"),
      "Hi, I'm Jay Kapoor. I find broken systems and try to find solutions.",
    );

    // Every part of the home page is there, in order.
    const order = await page.evaluate(() =>
      ["work", "experience", "research", "writing", "photos", "play", "contact"].map(
        (id) => document.getElementById(id)?.getBoundingClientRect().top ?? -1,
      ),
    );
    assert.ok(
      order.every((y, i) => y > 0 && (i === 0 || y > order[i - 1])),
      `Home sections in order: ${order}`,
    );

    // Five selected projects, each a link with its picture always visible.
    const picks = page.locator("#work ul > li > a");
    assert.equal(await picks.count(), 5, "Five selected projects");
    assert.deepEqual(
      await picks.evaluateAll((els) => els.map((e) => e.getAttribute("href"))),
      [
        "/work/straypaw/",
        "/work/juno-ai/",
        "/work/project-nidaan/",
        "/work/straypaw-research-models/",
        "/work/finer-things-club/",
      ],
      "Selected work, in order",
    );
    assert.ok(
      await picks.first().locator("img").isVisible(),
      "Project pictures show without hovering",
    );
    assert.equal(
      await page.locator("#experience ul").first().locator("> li").count(),
      8,
      "Experience lists every place I have worked",
    );
    // The tiles lead into the site, and the dock is on every page.
    assert.equal(
      await page.getByRole("navigation", { name: "Sections" }).getByRole("link").count(),
      4,
      "Four tiles",
    );

    // On a laptop the hero fills the first screen; the ways in follow right
    // after it, and the selected work within two screens.
    if (name !== "mobile") {
      const tile = page
        .getByRole("navigation", { name: "Sections" })
        .getByRole("link", { name: /Work/ });
      assert.ok((await tile.boundingBox()).y < 1150, "Work tile right after the hero");
      assert.ok(
        (await picks.first().boundingBox()).y < 1800,
        "Selected work starts within two screens",
      );
    }

    // A row opens by keyboard.
    await picks.first().focus();
    await page.keyboard.press("Enter");
    await page.waitForURL(/\/work\/straypaw\/?$/);
    for (const part of ["Context", "Problem", "What I did", "Outcomes"])
      assert.ok(
        await page.getByRole("heading", { name: part }).isVisible(),
        `Case study has ${part}`,
      );
    assert.match(
      await page.locator("main").innerText(),
      /MEASURED[\s\S]*30,288 animal records/i,
      "Outcomes say what kind of evidence they are",
    );

    // The menu leads to the complete index.
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.locator("#menu").getByRole("link", { name: "All work" }).click();
    await page.waitForURL(/\/work\/?$/);
    assert.equal(
      await page.locator("main ol > li").count(),
      28,
      "The index lists every entry",
    );

    // Photos: a grid on wider screens, a strip to swipe on a phone.
    await page.goto(base + "/", { waitUntil: "networkidle" });
    assert.ok(
      await page.getByRole("list", { name: "Photos" }).isVisible(),
      "Photos are on the home page",
    );

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
