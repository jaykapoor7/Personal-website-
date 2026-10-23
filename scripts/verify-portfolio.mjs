import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { chromium, devices } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const base = process.env.BASE_URL || "http://127.0.0.1:3000";
const executablePath =
  process.env.PLAYWRIGHT_CHROMIUM_PATH ||
  (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined);
const browser = await chromium.launch({
  executablePath,
  args: ["--no-sandbox"],
});
const errors = [];
const routes = [
  "/",
  "/work/",
  "/research/",
  "/about/",
  "/play/",
  "/work/straypaw/",
  "/work/project-nidaan/",
  "/work/juno-ai/",
  "/contact/",
  "/artifacts/",
  "/experience/",
  "/writing/",
  "/ledger/",
  "/thesis/",
  "/play/everything-falls/",
];
const visit = async (page, route) => {
  const response = await page.goto(base + route, { waitUntil: "networkidle" });
  assert.equal(response.status(), 200, route);
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
    `Overflow: ${route}`,
  );
};
try {
  for (const [name, options] of [
    ["desktop", { viewport: { width: 1440, height: 1000 } }],
    ["touch", { ...devices["iPhone 13"] }],
    [
      "reduced",
      { viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" },
    ],
  ]) {
    const context = await browser.newContext(options);
    const page = await context.newPage();
    page.on("pageerror", (error) => errors.push(error.message));
    await visit(page, "/");
    const activate = async (locator) =>
      name === "touch" ? locator.tap() : locator.click();
    assert.match(await page.locator("#hero-title").innerText(), /Jay Kapoor/);
    await activate(
      page.getByRole("button", { name: "02 Record", exact: false }),
    );
    assert.match(
      await page.locator(".scene-narration").innerText(),
      /shared record/,
    );
    await activate(
      page.getByRole("button", { name: "03 Network", exact: false }),
    );
    await activate(page.getByRole("switch"));
    assert.equal(
      await page.getByRole("switch").getAttribute("aria-checked"),
      "false",
    );
    await activate(page.getByRole("switch"));
    await activate(
      page.getByRole("button", { name: "04 StrayPaw", exact: false }),
    );
    assert.match(
      await page.locator(".scene-narration").innerText(),
      /Coimbatore/,
    );
    assert.ok(
      await page
        .getByRole("link", { name: "Explore the real StrayPaw map" })
        .isVisible(),
    );
    await activate(
      page.getByRole("button", { name: "Vadavalli", exact: false }),
    );
    assert.match(await page.locator(".area-detail").innerText(), /Vadavalli/);
    assert.match(
      await page.locator(".area-detail").innerText(),
      /2 open requests/,
    );
    if (name === "reduced")
      assert.equal(
        await page
          .locator(".system-node")
          .first()
          .evaluate((n) => getComputedStyle(n).transitionDuration),
        "0s",
      );
    await activate(
      page.getByRole("button", { name: "03 / Coordinate", exact: false }),
    );
    assert.match(
      await page.locator(".care-description").innerText(),
      /Case follow-up/,
    );
    await activate(page.getByRole("button", { name: "◷ Time", exact: true }));
    assert.match(
      await page.locator(".field-finding").innerText(),
      /lost income/,
    );
    await activate(page.getByRole("button", { name: "Sources", exact: false }));
    assert.match(
      await page.locator(".juno-path>p").innerText(),
      /Curated information/,
    );
    if (name === "touch") {
      await page.getByRole("button", { name: "Menu +" }).tap();
      await page.keyboard.press("Escape");
      assert.equal(
        await page.getByRole("button", { name: "Menu +" }).isVisible(),
        true,
      );
      await page.getByRole("button", { name: "Menu +" }).tap();
      await page
        .getByRole("navigation", { name: "Mobile navigation" })
        .locator('a[href^="/work"]')
        .first()
        .tap();
      await page.waitForURL("**/work/");
    }
    for (const route of routes) {
      await visit(page, route);
      if (
        name === "desktop" &&
        !["/ledger/", "/thesis/", "/writing/", "/experience/"].includes(route)
      ) {
        const accessibility = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze();
        assert.deepEqual(
          accessibility.violations.map((v) => ({
            id: v.id,
            targets: v.nodes.map((n) => n.target),
          })),
          [],
          `Accessibility: ${route}`,
        );
      }
    }
    await visit(page, "/about/");
    const slider = page.getByRole("slider", {
      name: "Compare childhood and Trojans football teams",
    });
    await slider.focus();
    await page.keyboard.press("End");
    assert.equal(await slider.inputValue(), "100");
    await page.keyboard.press("Home");
    assert.equal(await slider.inputValue(), "0");
    await visit(page, "/research/");
    await activate(
      page.getByRole("button", { name: "Diagnostics", exact: true }),
    );
    assert.match(
      await page.locator(".company-detail").innerText(),
      /Orange Health/,
    );
    await visit(page, "/play/");
    await activate(
      page.getByRole("button", { name: "Approve one small park", exact: true }),
    );
    assert.match(
      await page.locator(".government-desk").innerText(),
      /form a committee/,
    );
    await visit(page, "/play/everything-falls/");
    const coffee = page.getByRole("button", { name: "Drag Coffee cup" });
    await coffee.scrollIntoViewIfNeeded();
    const before = await coffee.getAttribute("style");
    if (name === "touch") {
      const box = await coffee.boundingBox();
      const cdp = await context.newCDPSession(page);
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchStart",
        touchPoints: [{ x: box.x + box.width / 2, y: box.y + box.height / 2 }],
      });
      for (let i = 1; i <= 8; i++)
        await cdp.send("Input.dispatchTouchEvent", {
          type: "touchMove",
          touchPoints: [
            {
              x: box.x + box.width / 2 + i * 10,
              y: box.y + box.height / 2 + i * 9,
            },
          ],
        });
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchEnd",
        touchPoints: [],
      });
    } else {
      const box = await coffee.boundingBox();
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
      await page.mouse.move(box.x + 90, box.y + 120, { steps: 8 });
      await page.mouse.up();
    }
    await page.waitForTimeout(400);
    assert.notEqual(
      await coffee.getAttribute("style"),
      before,
      `${name} physics dragging`,
    );
    await page.getByRole("button", { name: "Reset ↺" }).click();
    await coffee.focus();
    await page.keyboard.press("ArrowUp");
    assert.match(
      await page.locator(".falls-toolbar").innerText(),
      /things in motion/,
    );
    if (name === "touch") {
      await page.setViewportSize({ width: 844, height: 390 });
      await page.waitForTimeout(250);
      assert.equal(
        await page.evaluate(() => {
          const stage = document
            .querySelector(".falls-stage")
            .getBoundingClientRect();
          return [...document.querySelectorAll(".falls-object")].every((n) => {
            const box = n.getBoundingClientRect();
            return box.left >= stage.left - 1 && box.right <= stage.right + 1;
          });
        }),
        true,
        "Orientation resize",
      );
    }
    await context.close();
    console.log(
      `Passed: ${name} navigation, project interactions, physics, routes, and layout`,
    );
  }
  const context = await browser.newContext();
  const page = await context.newPage();
  for (const width of [360, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    await visit(page, "/");
  }
  await context.close();
  const plain = await browser.newContext({ javaScriptEnabled: false });
  const pagePlain = await plain.newPage();
  await visit(pagePlain, "/");
  assert.equal(await pagePlain.locator("#hero-title").isVisible(), true);
  assert.equal(await pagePlain.locator(".scale-control").isVisible(), false);
  await pagePlain.locator(".hero-work-link").click();
  assert.ok(pagePlain.url().endsWith("/#selected"));
  await plain.close();
  assert.deepEqual(errors, [], "Uncaught browser errors");
  console.log(
    "Passed: 360–1920px widths, no-JavaScript navigation, accessibility scans, and zero uncaught browser errors",
  );
} finally {
  await browser.close();
}
