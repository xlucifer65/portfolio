import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", ".qa-screenshots");
fs.mkdirSync(outDir, { recursive: true });

const baseUrl = process.env.QA_BASE_URL ?? "http://localhost:3100";

const viewports = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 834, height: 1112 },
  mobile: { width: 390, height: 844 },
};

const pages = [
  { path: "/", name: "home" },
  { path: "/projects", name: "projects" },
];

const browser = await chromium.launch();

for (const [vpName, vp] of Object.entries(viewports)) {
  const context = await browser.newContext({ viewport: vp, deviceScaleFactor: 2 });
  const page = await context.newPage();
  for (const p of pages) {
    await page.goto(`${baseUrl}${p.path}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(300);
    const file = `${outDir}/${p.name}-${vpName}.png`;
    await page.screenshot({ path: file, fullPage: true });
    console.log("saved", file);
  }
  await context.close();
}

await browser.close();
