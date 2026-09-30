import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { readFileSync } from "node:fs";

const { basePath = "" } = JSON.parse(
  readFileSync(".next/routes-manifest.json", "utf8"),
);
const previewUrl =
  process.env.PREVIEW_URL ?? `http://127.0.0.1:3000${basePath}/`;

const output = "test-results/visual-review";
await mkdir(output, { recursive: true });
const browser = await chromium.launch();

try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1050 },
    reducedMotion: "reduce",
    deviceScaleFactor: 1,
  });
  await page.goto(previewUrl, { waitUntil: "networkidle" });
  await page.screenshot({ path: `${output}/desktop-hero.png` });
  await page.screenshot({ path: `${output}/desktop-full.png`, fullPage: true });
  // Hide fixed chrome only for section exports; it remains in full-page captures.
  await page.addStyleTag({
    content: ".site-header, .skip-link { visibility: hidden !important; }",
  });
  for (const id of ["experience", "projects", "contact"]) {
    await page
      .locator(`#${id}`)
      .screenshot({ path: `${output}/desktop-${id}.png` });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(previewUrl, { waitUntil: "networkidle" });
  await page.screenshot({ path: `${output}/mobile-hero.png` });
  await page.screenshot({ path: `${output}/mobile-full.png`, fullPage: true });
  await page.addStyleTag({
    content: ".site-header, .skip-link { visibility: hidden !important; }",
  });
  await page
    .locator(".system-visual")
    .screenshot({ path: `${output}/mobile-system.png` });
  await page
    .locator("#projects")
    .screenshot({ path: `${output}/mobile-projects.png` });
  await page
    .locator("#contact")
    .screenshot({ path: `${output}/mobile-contact.png` });
  console.log(`Visual review screenshots saved in ${output}`);
} finally {
  await browser.close();
}
