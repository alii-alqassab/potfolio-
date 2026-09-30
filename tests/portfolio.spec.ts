import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { existsSync } from "node:fs";
import { personal, projects } from "../data/portfolio";

test("renders accurate content, metadata, and only working destinations", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const response = await page.goto("./");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle("Ali Alqassab | Full-Stack Developer");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toHaveText("AliAlqassab.");
  await expect(page.getByText("≈20 members", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Software Developer Intern" }),
  ).toBeVisible();
  await expect(
    page.getByText("Concept / Frontend project", { exact: true }),
  ).toBeVisible();
  const resume = page.getByRole("link", { name: "Download CV" });
  if (existsSync(`public${personal.resumePath}`)) {
    const homePath = new URL(page.url()).pathname;
    await expect(resume).toHaveAttribute(
      "href",
      `${homePath}${personal.resumePath.slice(1)}`,
    );
  } else {
    await expect(resume).toHaveCount(0);
  }
  if (
    !personal.socials.github &&
    !projects.some((project) => project.links?.github)
  ) {
    await expect(page.locator('a[href*="github.com"]')).toHaveCount(0);
  }
  await expect(
    page.getByRole("link", { name: `Call Ali Alqassab at ${personal.phone}` }),
  ).toHaveAttribute("href", "tel:+97334465522");
  await expect(
    page.locator('a[href="mailto:ali.alqassab01@gmail.com"]'),
  ).toBeVisible();
  expect(
    await page.locator('meta[property="og:title"]').getAttribute("content"),
  ).toBe("Ali Alqassab | Full-Stack Developer");
  expect(
    await page.locator('meta[property="og:image"]').getAttribute("content"),
  ).toContain("opengraph-image");

  const brokenAnchors = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .map((link) => link.getAttribute("href")!)
        .filter(
          (href) => href.length < 2 || !document.getElementById(href.slice(1)),
        ),
    );
  expect(brokenAnchors).toEqual([]);

  const unsafeLinks = await page
    .locator('a[target="_blank"]')
    .evaluateAll((links) =>
      links
        .filter((link) => !link.getAttribute("rel")?.includes("noopener"))
        .map((link) => link.outerHTML),
    );
  expect(unsafeLinks).toEqual([]);
  expect(errors).toEqual([]);
});

test("system nodes and project details work with keyboard input", async ({
  page,
}) => {
  await page.goto("./");
  await page.emulateMedia({ reducedMotion: "reduce" });
  const frontend = page.getByRole("button", { name: "Explore frontend layer" });
  await frontend.focus();
  await page.keyboard.press("Enter");
  await expect(frontend).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#system-node-detail")).toContainText(
    "React, Next.js",
  );
  await page.keyboard.press("Enter");
  await expect(frontend).toHaveAttribute("aria-pressed", "false");

  const cards = page.locator(".project-card");
  for (const card of await cards.all()) {
    const summary = card.locator("summary");
    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(card.locator("details")).toHaveAttribute("open", "");
    await expect(card.locator(".project-detail-content")).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(card.locator("details")).not.toHaveAttribute("open");
  }

  await page.locator(".more-builds summary").click();
  await expect(
    page.getByText("wget reimplementation", { exact: true }),
  ).toBeVisible();
});

test("navigation tracks the active section and mobile menu is dismissible", async ({
  page,
  isMobile,
}) => {
  await page.goto("./");
  await page.emulateMedia({ reducedMotion: "reduce" });
  if (isMobile) {
    const openButton = page.getByRole("button", { name: "Open navigation" });
    await openButton.click();
    await expect(
      page.getByRole("navigation", { name: "Mobile navigation" }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(openButton).toBeFocused();
    await expect(openButton).toHaveAttribute("aria-expanded", "false");
    await openButton.click();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Projects" })
      .click();
    await expect(openButton).toHaveAttribute("aria-expanded", "false");
    await expect(page.locator("#projects")).toBeFocused();
    await expect(page).toHaveURL(/#projects$/);
  } else {
    const projects = page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Projects" });
    await projects.click();
    await expect(projects).toHaveAttribute("aria-current", "location");
    await expect(page).toHaveURL(/#projects$/);
  }
  await page.getByRole("link", { name: "Let’s talk" }).click();
  await expect(page).toHaveURL(/#contact$/);
});

test("respects reduced motion and the manual animation control", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "off");
  expect(
    await page
      .locator(".connection-flow")
      .first()
      .evaluate((node) => getComputedStyle(node).animationName),
  ).toBe("none");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator("html")).toHaveAttribute("data-motion", "on");
  const toggle = page.getByRole("button", {
    name: "Pause decorative animations",
  });
  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "off");
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "on");
});

test("email copy gives truthful success and failure feedback", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("./");
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(page.getByRole("status")).toHaveText("Copied!");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "ali.alqassab01@gmail.com",
  );

  await page.evaluate(() => {
    Object.defineProperty(navigator.clipboard, "writeText", {
      value: () => Promise.reject(new Error("Permission denied")),
      configurable: true,
    });
  });
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(page.getByRole("status")).toHaveText(
    "Please select and copy the email above.",
  );
});

test("has no horizontal overflow at phone, tablet, laptop, and desktop widths", async ({
  page,
}) => {
  await page.goto("./");
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 360, 390, 540, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      `Overflow at ${width}px`,
    ).toBe(true);
    const nodes = await page
      .locator(".system-node, .core-chip")
      .evaluateAll((elements) =>
        elements.map((element) => {
          const { x, y, width, height } = element.getBoundingClientRect();
          return { x, y, width, height };
        }),
      );
    for (let i = 0; i < nodes.length; i++) {
      expect(
        nodes[i].x,
        `Node outside viewport at ${width}px`,
      ).toBeGreaterThanOrEqual(0);
      expect(nodes[i].x + nodes[i].width).toBeLessThanOrEqual(width);
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i],
          b = nodes[j];
        const overlaps =
          a.x < b.x + b.width &&
          a.x + a.width > b.x &&
          a.y < b.y + b.height &&
          a.y + a.height > b.y;
        expect(
          overlaps,
          `Diagram nodes overlap at ${width}px (${i}, ${j})`,
        ).toBe(false);
      }
    }
  }
});

test("passes WCAG AA automated checks with disclosures and navigation open", async ({
  page,
  isMobile,
}) => {
  await page.goto("./");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.evaluate(() =>
    document.querySelectorAll("details").forEach((details) => {
      details.open = true;
    }),
  );
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
  if (isMobile) {
    await page.getByRole("button", { name: "Open navigation" }).click();
    const menuResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(menuResults.violations).toEqual([]);
  }
});

test("content and native disclosures remain usable without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
  });
  const page = await context.newPage();
  await page.goto("./");
  await expect(
    page.getByRole("heading", { name: "Social Network Platform" }),
  ).toBeVisible();
  await page.locator(".project-details summary").first().click();
  await expect(page.locator(".project-detail-content").first()).toBeVisible();
  await context.close();
});

test("serves favicon, social preview, robots, sitemap, and a useful 404", async ({
  page,
  request,
  baseURL,
}) => {
  for (const route of [
    "icon.svg",
    "apple-icon.png",
    "opengraph-image.png",
    "robots.txt",
    "sitemap.xml",
  ]) {
    const response = await request.get(route);
    expect(response.status(), route).toBe(200);
    if (route.endsWith(".png"))
      expect(response.headers()["content-type"]).toContain("image/png");
  }
  const response = await page.goto("a-node-that-does-not-exist/");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("link", { name: "Back to the portfolio" }),
  ).toHaveAttribute("href", new URL(baseURL!).pathname);
  await page.getByRole("link", { name: "Back to the portfolio" }).click();
  await expect(page.locator("h1")).toHaveText("AliAlqassab.");
});

test("exported assets and SEO URLs respect the deployment path", async ({
  page,
  request,
  baseURL,
}) => {
  const failures: string[] = [];
  page.on("response", (response) => {
    if (response.status() >= 400) failures.push(response.url());
  });
  await page.goto("./", { waitUntil: "networkidle" });
  const sitePath = new URL(baseURL!).pathname;
  const assetUrls = await page
    .locator('script[src], link[rel="stylesheet"], link[rel="preload"]')
    .evaluateAll((elements) =>
      elements.map(
        (element) =>
          element.getAttribute("src") ?? element.getAttribute("href")!,
      ),
    );
  expect(assetUrls.length).toBeGreaterThan(0);
  for (const asset of assetUrls) {
    expect(
      new URL(asset, baseURL).pathname.startsWith(`${sitePath}_next/`),
      asset,
    ).toBe(true);
  }
  for (const selector of [
    'link[rel="icon"]',
    'link[rel="apple-touch-icon"]',
    'meta[property="og:image"]',
    'meta[name="twitter:image"]',
  ]) {
    const element = page.locator(selector).first();
    const asset = await element.getAttribute(
      selector.startsWith("meta") ? "content" : "href",
    );
    const pathname = new URL(asset!, baseURL).pathname;
    expect(pathname.startsWith(sitePath), asset!).toBe(true);
    const response = await request.get(new URL(pathname, baseURL).toString());
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toMatch(/^image\//);
  }
  const canonical = page.locator('link[rel="canonical"]');
  if (await canonical.count()) {
    const url = new URL((await canonical.getAttribute("href"))!);
    expect(url.pathname).toBe(sitePath);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "index, follow",
    );
    expect(await (await request.get("sitemap.xml")).text()).toContain(
      `<loc>${url.toString()}</loc>`,
    );
    expect(await (await request.get("robots.txt")).text()).toContain(
      new URL("sitemap.xml", url).toString(),
    );
  }
  expect(failures).toEqual([]);
});
