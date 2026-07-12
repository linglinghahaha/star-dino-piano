#!/usr/bin/env node

import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const args = process.argv.slice(2);
const rootUrl = args[0] || "http://127.0.0.1:4173/";
const candidatePath = path.resolve(
  args[1] || "screenshots/convergence_319a/quality-candidate-243-dedup.css"
);
const query = args[2] || "?level=M01&check=css-computed-diff";
const outputPath = path.resolve(
  args[3] || "screenshots/convergence_319a/css-computed-diff.json"
);

if (!fs.existsSync(candidatePath)) {
  throw new Error(`Candidate stylesheet not found: ${candidatePath}`);
}

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_EXECUTABLE || undefined
});

const makeUrl = () => {
  const url = new URL(rootUrl);
  url.search = query;
  return url.toString();
};

const createPage = async (useCandidate) => {
  const page = await browser.newPage({
    viewport: { width: 1024, height: 768 },
    deviceScaleFactor: 1
  });
  await page.addInitScript(() => {
    localStorage.removeItem("starDinoCompletedLevels");
    localStorage.removeItem("starDinoLearningStats");
    sessionStorage.clear();
  });
  if (useCandidate) {
    await page.route(/quality-overrides\.css(?:\?.*)?$/, (route) => route.fulfill({
      path: candidatePath,
      contentType: "text/css"
    }));
  }
  await page.goto(makeUrl(), { waitUntil: "domcontentloaded", timeout: 12000 });
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 12000 });
  await page.waitForSelector("#appShell", { state: "visible", timeout: 8000 });
  await page.addStyleTag({
    content: "*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}"
  });
  await page.waitForTimeout(100);
  return page;
};

const snapshot = async (page) => page.evaluate(() => {
  const properties = [
    "display",
    "visibility",
    "opacity",
    "position",
    "inset",
    "top",
    "right",
    "bottom",
    "left",
    "width",
    "height",
    "minWidth",
    "minHeight",
    "maxWidth",
    "maxHeight",
    "margin",
    "padding",
    "transform",
    "transformOrigin",
    "zIndex",
    "overflow",
    "backgroundColor",
    "backgroundImage",
    "border",
    "borderRadius",
    "boxShadow",
    "color",
    "fontSize",
    "fontWeight",
    "lineHeight",
    "gridTemplateRows",
    "gridTemplateColumns",
    "gap",
    "alignItems",
    "justifyContent"
  ];

  const readStyle = (style) => Object.fromEntries(
    properties.map((property) => [property, style[property]])
  );

  const readPseudo = (element, pseudo) => {
    const style = getComputedStyle(element, pseudo);
    if (style.content === "none" && style.display === "inline") return null;
    return {
      content: style.content,
      ...readStyle(style)
    };
  };

  return [...document.querySelectorAll("#appShell, #appShell *")].map((element, index) => {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    const visible = style.display !== "none" &&
      style.visibility !== "hidden" &&
      Number(style.opacity) > 0 &&
      rect.width > 0 &&
      rect.height > 0;
    return {
      index,
      tag: element.tagName.toLowerCase(),
      id: element.id,
      className: typeof element.className === "string" ? element.className : "",
      text: element.children.length === 0
        ? element.textContent.trim().replace(/\s+/g, " ").slice(0, 100)
        : "",
      visible,
      rect: {
        x: Number(rect.x.toFixed(2)),
        y: Number(rect.y.toFixed(2)),
        width: Number(rect.width.toFixed(2)),
        height: Number(rect.height.toFixed(2))
      },
      style: readStyle(style),
      before: readPseudo(element, "::before"),
      after: readPseudo(element, "::after")
    };
  });
});

const propertyDiff = (baseline, candidate) => {
  const changes = {};
  const keys = new Set([
    ...Object.keys(baseline || {}),
    ...Object.keys(candidate || {})
  ]);
  for (const key of keys) {
    if (baseline?.[key] !== candidate?.[key]) {
      changes[key] = { baseline: baseline?.[key], candidate: candidate?.[key] };
    }
  }
  return changes;
};

const rectDiff = (baseline, candidate) => {
  const changes = {};
  for (const key of ["x", "y", "width", "height"]) {
    if (Math.abs(baseline[key] - candidate[key]) > 1) {
      changes[key] = { baseline: baseline[key], candidate: candidate[key] };
    }
  }
  return changes;
};

try {
  const baselinePage = await createPage(false);
  const candidatePage = await createPage(true);
  const [baseline, candidate] = await Promise.all([
    snapshot(baselinePage),
    snapshot(candidatePage)
  ]);

  const differences = [];
  const count = Math.max(baseline.length, candidate.length);
  for (let index = 0; index < count; index += 1) {
    const before = baseline[index];
    const after = candidate[index];
    if (!before || !after) {
      differences.push({ index, kind: "missing-node", baseline: before, candidate: after });
      continue;
    }
    const identityChanged = before.tag !== after.tag ||
      before.id !== after.id ||
      before.className !== after.className;
    const visibilityChanged = before.visible !== after.visible;
    if (!before.visible && !after.visible && !visibilityChanged && !identityChanged) continue;

    const geometry = rectDiff(before.rect, after.rect);
    const style = propertyDiff(before.style, after.style);
    const beforePseudo = propertyDiff(before.before, after.before);
    const afterPseudo = propertyDiff(before.after, after.after);
    if (
      !identityChanged &&
      !visibilityChanged &&
      Object.keys(geometry).length === 0 &&
      Object.keys(style).length === 0 &&
      Object.keys(beforePseudo).length === 0 &&
      Object.keys(afterPseudo).length === 0
    ) {
      continue;
    }

    differences.push({
      index,
      identityChanged,
      visibilityChanged,
      element: {
        tag: before.tag,
        id: before.id,
        className: before.className,
        text: before.text || after.text
      },
      baselineVisible: before.visible,
      candidateVisible: after.visible,
      geometry,
      style,
      before: beforePseudo,
      after: afterPseudo
    });
  }

  const result = {
    url: makeUrl(),
    candidatePath,
    baselineNodeCount: baseline.length,
    candidateNodeCount: candidate.length,
    differenceCount: differences.length,
    visibilityDifferenceCount: differences.filter((item) => item.visibilityChanged).length,
    geometryDifferenceCount: differences.filter((item) => Object.keys(item.geometry || {}).length).length,
    differences
  };

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
  console.log(JSON.stringify({
    url: result.url,
    baselineNodeCount: result.baselineNodeCount,
    candidateNodeCount: result.candidateNodeCount,
    differenceCount: result.differenceCount,
    visibilityDifferenceCount: result.visibilityDifferenceCount,
    geometryDifferenceCount: result.geometryDifferenceCount,
    outputPath,
    firstDifferences: differences.slice(0, 20)
  }, null, 2));
} finally {
  await browser.close();
}
