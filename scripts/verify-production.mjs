import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { chromium, request, devices } from "playwright";
const base = process.env.BASE_URL || "https://kapoorjay.com";
const origin = new URL(base).origin;
// API requests retain TLS verification and inherit the environment's CA trust.
// This also supports cloud executors whose browser CA database lacks that CA.
const api = await request.newContext({
  proxy: process.env.HTTPS_PROXY
    ? { server: process.env.HTTPS_PROXY }
    : undefined,
});
const browser = await chromium.launch({
  executablePath:
    process.env.PLAYWRIGHT_CHROMIUM_PATH ||
    (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined),
  args: ["--no-sandbox"],
});
const cache = new Map();
const errors = [];
const routes = [
  "/",
  "/work/",
  "/research/",
  "/about/",
  "/play/",
  "/artifacts/",
  "/work/straypaw/",
  "/work/project-nidaan/",
  "/work/juno-ai/",
  "/work/crowwd/",
  "/work/tot-schools/",
  "/contact/",
  "/experience/",
  "/writing/",
  "/ledger/",
];
try {
  for (const route of routes) {
    const res = await api.get(base + route);
    assert.equal(res.status(), 200, route);
    assert.match(await res.text(), /Email me/);
  }
  for (const [name, options] of [
    ["desktop", { viewport: { width: 1440, height: 1000 } }],
    ["mobile", devices["iPhone 13"]],
  ]) {
    const context = await browser.newContext(options);
    await context.route(origin + "/**", async (route) => {
      const url = route.request().url();
      if (!cache.has(url)) {
        const res = await api.get(url);
        const headers = { ...res.headers() };
        delete headers["content-encoding"];
        delete headers["content-length"];
        cache.set(url, {
          status: res.status(),
          headers,
          body: await res.body(),
        });
      }
      await route.fulfill(cache.get(url));
    });
    const page = await context.newPage();
    page.on("pageerror", (e) => errors.push(e.message));
    const visit = async (path) => {
      const res = await page.goto(base + path, { waitUntil: "networkidle" });
      assert.equal(res.status(), 200);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        path,
      );
    };
    await visit("/");
    assert.match(await page.locator("#hero-title").innerText(), /Jay Kapoor/);
    await page
      .getByRole("button", { name: "04 StrayPaw", exact: false })
      .click();
    assert.match(
      await page.locator(".scene-narration").innerText(),
      /Coimbatore/,
    );
    await page.getByRole("button", { name: "Vadavalli", exact: false }).click();
    assert.match(
      await page.locator(".area-detail").innerText(),
      /2 open requests/,
    );
    await page.screenshot({
      path: `/tmp/portfolio-production-${name}.png`,
      fullPage: false,
    });
    await visit("/about/");
    const slider = page.getByRole("slider");
    await slider.focus();
    await page.keyboard.press("End");
    assert.equal(await slider.inputValue(), "100");
    await page.locator(".award-photo").scrollIntoViewIfNeeded();
    await page.locator(".award-photo img").evaluate((img) => img.decode());
    await visit("/research/");
    await page
      .getByRole("button", { name: "Diagnostics", exact: true })
      .click();
    assert.match(
      await page.locator(".company-detail").innerText(),
      /Orange Health/,
    );
    await visit("/artifacts/");
    assert.ok((await page.locator(".artifact-groups a").count()) >= 20);
    await context.close();
    console.log(
      `Production ${name}: home, real-area controls, photo comparison, research filter, artifact index, and layout passed.`,
    );
  }
  const source = readFileSync("content/proof.ts", "utf8");
  const paths = [
    ...new Set(
      [
        ...source.matchAll(
          /href:\s*["'](\/[^"']+\.(?:pdf|csv|xlsx|webp|jpg))["']/g,
        ),
      ].map((m) => m[1]),
    ),
  ];
  const digest = (b) => createHash("sha256").update(b).digest("hex");
  for (const path of [...paths, "/jay-kapoor-resume.pdf"]) {
    const res = await api.get(base + path);
    assert.equal(res.status(), 200, path);
    assert.equal(
      digest(await res.body()),
      digest(readFileSync("public" + path)),
      `Artifact differs: ${path}`,
    );
  }
  assert.deepEqual(errors, []);
  console.log(
    `Production: ${routes.length} routes and ${paths.length + 1} artifact files verified; artifact bytes match the release.`,
  );
} finally {
  await browser.close();
  await api.dispose();
}
