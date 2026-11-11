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

// The landing page says who I am and shows the startups; the rest are their own
// pages. Old and retired URLs are redirected by vercel.json, checked further down.
const routes = [
  "/",
  "/experience/",
  "/research/",
  "/projects/",
  "/about/",
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
const miniSite = [
  "/research-models/index.html",
  "/research-models/models/the-sterilization-paradox.html",
  "/research-models/notes.html",
  "/research-models/notes/the-70-percent-paradox.html",
  "/research-models/about.html",
];
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

    // The landing page stays short: who I am and the four startups.
    assert.equal(
      await page.locator('main a[href^="/work/"]').count(),
      4,
      "Four startups on the landing page",
    );
    const screens = await page.evaluate(
      () => document.documentElement.scrollHeight / innerHeight,
    );
    assert.ok(
      screens < (name === "mobile" ? 4 : 3),
      `Landing page is ${screens.toFixed(1)} screens long`,
    );

    // The menu is one button on every screen size, and leads to every page.
    await page.getByRole("button", { name: "Open menu" }).click();
    await page
      .locator("#menu")
      .getByRole("link", { name: /Research/ })
      .click();
    await page.waitForURL(/\/research\/?$/);

    // A lab opens in place.
    const lab = page.getByRole("button", { name: /Apodaca Lab/ });
    await lab.scrollIntoViewIfNeeded();
    await lab.click();
    await page.waitForTimeout(600);
    assert.match(
      await page.locator("#lab-apodaca").innerText(),
      /PIEZO/,
      "Lab row opens in place",
    );

    // A job card turns over to show what the work was.
    // (By keyboard: with a mouse the card has already turned by the time you click.)
    await page.goto(base + "/experience/", { waitUntil: "networkidle" });
    const job = page.getByRole("button", { name: /^TARC India/ });
    await job.scrollIntoViewIfNeeded();
    await job.focus();
    await page.keyboard.press("Enter");
    assert.equal(
      await job.getAttribute("aria-expanded"),
      "true",
      "Experience card turns over",
    );

    // A photo opens in place, and a bar on the timeline leads to its page.
    await page.goto(base + "/about/", { waitUntil: "networkidle" });
    const photo = page.getByRole("button", { name: "The Trojans" });
    await photo.scrollIntoViewIfNeeded();
    await photo.click();
    assert.equal(
      await photo.getAttribute("aria-pressed"),
      "true",
      "Photo slat opens",
    );
    await page.getByRole("link", { name: /^Juno-AI, Founder/ }).click();
    await page.waitForURL(/\/work\/juno-ai\/?$/);

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
