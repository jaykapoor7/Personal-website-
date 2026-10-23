// Browser checks for the static export. Serve `out/` first:
//   python -m http.server 3000 --directory out && npm run test:browser
// Set BASE_URL to test another origin, PLAYWRIGHT_CHROMIUM_PATH for a browser binary.
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
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

const routes = [
  "/",
  "/work/",
  "/work/straypaw/",
  "/work/juno-ai/",
  "/work/crowwd/",
  "/work/tot-schools/",
  "/work/project-nidaan/",
  "/work/finer-things-club/",
  "/work/hdfc-bank/",
  "/work/upmc-emergency-medicine/",
  "/research/",
  "/ledger/",
  "/about/",
  "/experience/",
  "/writing/",
  "/thesis/",
  "/play/",
  "/play/everything-falls/",
  "/contact/",
  "/artifacts/",
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

    for (const route of routes) {
      const res = await page.goto(base + route, { waitUntil: "networkidle" });
      assert.equal(res.status(), 200, route);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        `Horizontal overflow on ${route} (${name})`,
      );
      assert.equal(await page.locator("h1").count(), 1, `One h1 on ${route}`);
      if (name === "desktop" || name === "dark") {
        await page.waitForTimeout(2000); // let entrance animations settle
        const axe = await new AxeBuilder({ page })
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
    assert.match(await page.locator("h1").innerText(), /Jay Kapoor/);
    if (name === "mobile") {
      await page.getByRole("button", { name: "Open menu" }).tap();
      await page
        .locator("#mobile-menu")
        .getByRole("link", { name: "Research" })
        .tap();
      await page.waitForURL(/\/research\/$/);
    }

    await page.goto(base + "/research/", { waitUntil: "networkidle" });
    const all = await page.locator("#landscape li").count();
    await page
      .getByRole("button", { name: "Diagnostics", exact: true })
      .click();
    const filtered = await page.locator("#landscape li").count();
    assert.ok(
      filtered > 0 && filtered < all,
      "Sector filter narrows the dataset",
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
    await page.goto(base + route, { waitUntil: "domcontentloaded" });
    for (const href of await page.$$eval("a[href^='/'], img[src^='/']", (els) =>
      els.map((e) => e.getAttribute("href") || e.getAttribute("src")),
    ))
      links.add(href.split("#")[0]);
  }
  for (const href of links) {
    const res = await page.request.get(base + href);
    assert.equal(res.status(), 200, `Broken local link ${href}`);
  }
  console.log(
    `Checked ${routes.length} routes × 4 contexts and ${links.size} local links.`,
  );
  assert.deepEqual(errors, [], "Browser errors");
  console.log("All portfolio checks passed.");
} finally {
  await browser.close();
}
