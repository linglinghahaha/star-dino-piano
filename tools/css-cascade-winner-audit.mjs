#!/usr/bin/env node

import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import postcss from "postcss";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const args = process.argv.slice(2);
const baseUrl = args[0] || "http://127.0.0.1:4173/";
const targetFile = args[1] || "quality-overrides.css";
const outputPath = path.resolve(
  args[2] || "screenshots/convergence_319a/quality-candidate-cascade.css"
);
const reportPath = path.resolve(
  args[3] || "screenshots/convergence_319a/css-cascade-winner-report.json"
);
const rootDir = process.cwd();

const indexHtml = fs.readFileSync(path.join(rootDir, "index.html"), "utf8");
const stylesheetFiles = [...indexHtml.matchAll(/<link\b[^>]*>/gi)]
  .map(([tag]) => {
    if (!/\brel=["']stylesheet["']/i.test(tag)) return "";
    const href = tag.match(/\bhref=["']([^"']+)["']/i)?.[1] || "";
    return href.split(/[?#]/, 1)[0].replace(/^\.\//, "");
  })
  .filter((file) => file && !/^[a-z]+:/i.test(file));

if (!stylesheetFiles.includes(targetFile)) {
  throw new Error(`${targetFile} is not linked by index.html.`);
}

const roots = new Map();
for (const file of stylesheetFiles) {
  const filePath = path.join(rootDir, file);
  roots.set(file, postcss.parse(fs.readFileSync(filePath, "utf8"), { from: filePath }));
}

const protectedAtRules = new Set(["keyframes", "-webkit-keyframes", "property"]);
const declarationIsEligible = (declaration) => {
  if (declaration.parent?.type !== "rule") return false;
  let node = declaration.parent.parent;
  while (node && node.type !== "root") {
    if (node.type === "atrule" && protectedAtRules.has(node.name.toLowerCase())) {
      return false;
    }
    node = node.parent;
  }
  return true;
};

const eligibleDeclarations = (root) => {
  const declarations = [];
  root.walkDecls((declaration) => {
    if (declarationIsEligible(declaration)) declarations.push(declaration);
  });
  return declarations;
};

const declarationKey = (declaration) => {
  return `${declaration.prop}\u0000${declaration.value}\u0000${declaration.important ? "1" : "0"}`;
};

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_EXECUTABLE || undefined
});

const expansionPage = await browser.newPage();
const expansionCache = new Map();
const uniqueDeclarations = new Map();
for (const root of roots.values()) {
  for (const declaration of eligibleDeclarations(root)) {
    const key = declarationKey(declaration);
    if (!uniqueDeclarations.has(key)) {
      uniqueDeclarations.set(key, {
        key,
        prop: declaration.prop,
        value: declaration.value,
        important: declaration.important
      });
    }
  }
}

const uniqueList = [...uniqueDeclarations.values()];
for (let offset = 0; offset < uniqueList.length; offset += 700) {
  const batch = uniqueList.slice(offset, offset + 700);
  const expanded = await expansionPage.evaluate((items) => items.map((item) => {
    const style = document.createElement("div").style;
    try {
      style.setProperty(item.prop, item.value, item.important ? "important" : "");
    } catch {
      return [item.prop];
    }
    const properties = Array.from(style);
    if (item.prop.startsWith("--") && !properties.includes(item.prop)) {
      properties.push(item.prop);
    }
    return properties.length ? properties : [item.prop];
  }), batch);
  for (let index = 0; index < batch.length; index += 1) {
    expansionCache.set(batch[index].key, [...new Set(expanded[index])]);
  }
}
await expansionPage.close();

const targetRoot = roots.get(targetFile);
const targetDeclarations = eligibleDeclarations(targetRoot);
const targetProperties = new Set();
for (const declaration of targetDeclarations) {
  for (const property of expansionCache.get(declarationKey(declaration)) || [declaration.prop]) {
    targetProperties.add(property);
  }
}

const markerByProperty = new Map(
  [...targetProperties].sort().map((property, index) => [property, `--qa-${index.toString(36)}`])
);

const instrumentedStylesheets = new Map();
for (const file of stylesheetFiles) {
  const instrumentedRoot = roots.get(file).clone();
  const declarations = eligibleDeclarations(instrumentedRoot);
  for (let index = 0; index < declarations.length; index += 1) {
    const declaration = declarations[index];
    const value = file === targetFile ? `q${index}` : "o";
    const properties = expansionCache.get(declarationKey(declaration)) || [declaration.prop];
    let anchor = declaration;
    for (const property of properties) {
      const marker = markerByProperty.get(property);
      if (!marker) continue;
      const markerDeclaration = postcss.decl({
        prop: marker,
        value,
        important: declaration.important
      });
      declaration.parent.insertAfter(anchor, markerDeclaration);
      anchor = markerDeclaration;
    }
  }
  instrumentedStylesheets.set(file, instrumentedRoot.toString());
}

const page = await browser.newPage({
  viewport: { width: 1024, height: 768 },
  deviceScaleFactor: 1
});

for (const [file, css] of instrumentedStylesheets) {
  await page.route((url) => {
    try {
      return decodeURIComponent(new URL(url).pathname).endsWith(`/${file}`);
    } catch {
      return false;
    }
  }, (route) => route.fulfill({ body: css, contentType: "text/css" }));
}

await page.addInitScript(() => {
  localStorage.removeItem("starDinoCompletedLevels");
  localStorage.removeItem("starDinoLearningStats");
  sessionStorage.clear();
});

const browserErrors = [];
page.on("console", (message) => {
  if (["error", "warning"].includes(message.type())) {
    browserErrors.push({ type: message.type(), text: message.text(), url: page.url() });
  }
});
page.on("pageerror", (error) => {
  browserErrors.push({ type: "pageerror", text: error.message, url: page.url() });
});

const markerNames = [...markerByProperty.values()];
const activeDeclarationIds = new Set();
const visitedStates = [];

const makeUrl = (query) => {
  const url = new URL(baseUrl);
  url.search = query;
  return url.toString();
};

const waitReady = async (selector) => {
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 15000 });
  await page.waitForSelector(selector, { state: "visible", timeout: 10000 });
  await page.waitForTimeout(180);
};

const collectWinners = async (state) => {
  const values = await page.evaluate((markers) => {
    const found = new Set();
    const elements = [...document.querySelectorAll("*")];
    for (const element of elements) {
      const elementStyle = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      const elementVisible = elementStyle.display !== "none" &&
        elementStyle.visibility !== "hidden" &&
        Number(elementStyle.opacity) > 0 &&
        rect.width > 0 &&
        rect.height > 0;
      if (!elementVisible) continue;

      for (const pseudo of [null, "::before", "::after"]) {
        const style = pseudo ? getComputedStyle(element, pseudo) : elementStyle;
        if (pseudo && (
          style.display === "none" ||
          style.visibility === "hidden" ||
          Number(style.opacity) <= 0 ||
          style.content === "none"
        )) continue;
        for (const marker of markers) {
          const value = style.getPropertyValue(marker).trim();
          if (/^q\d+$/.test(value)) found.add(value);
        }
      }
    }
    return [...found];
  }, markerNames);

  for (const value of values) activeDeclarationIds.add(Number(value.slice(1)));
  visitedStates.push({ state, url: page.url(), activeDeclarationCount: values.length });
};

const gotoState = async (state, query, selector = ".moon-yard") => {
  await page.goto(makeUrl(query), { waitUntil: "domcontentloaded", timeout: 15000 });
  await waitReady(selector);
  await collectWinners(state);
};

const tapMidi = async (midi, delay = 420) => {
  await page.locator(`.key.white-key[data-midi="${midi}"]`).click({ timeout: 6000 });
  await page.waitForTimeout(delay);
};

const waitResult = async () => {
  await page.waitForFunction(() => !document.querySelector("#resultModal")?.hidden, null, {
    timeout: 10000
  });
  await page.waitForTimeout(120);
};

const enterCheckReplay = async (selector = ".moon-yard") => {
  await page.evaluate(() => document.querySelector("#modalNext")?.click());
  await waitReady(selector);
};

try {
  for (const level of ["M01", "M02", "M03", "M04", "M05", "M06", "M07", "M08"]) {
    await gotoState(`${level} initial`, `?level=${level}&check=cascade-${level.toLowerCase()}`);
  }
  for (const level of ["FG01", "FG02", "FG03", "FG04"]) {
    await gotoState(`${level} initial`, `?level=${level}&check=cascade-${level.toLowerCase()}`);
  }

  await gotoState("map entry source", "?level=M01&check=cascade-map");
  await page.locator("#mapReturn").click({ timeout: 6000 });
  await page.waitForSelector(".map-shell", { state: "visible", timeout: 8000 });
  await page.waitForTimeout(140);
  await collectWinners("map visible");

  await gotoState("parent source", "?level=M01&check=cascade-parent");
  await page.locator("#playParentGate").click({ timeout: 6000 });
  await page.waitForSelector("#parentModal:not([hidden])", { timeout: 8000 });
  await collectWinners("parent modal visible");

  await gotoState("M03 flow", "?level=M03&check=cascade-m03-flow");
  await tapMidi(62, 90);
  await collectWinners("M03 first correct transient");
  await page.waitForTimeout(420);
  await tapMidi(60, 90);
  await collectWinners("M03 second correct transient");
  await waitResult();
  await collectWinners("M03 result");

  await gotoState("M07 flow", "?level=M07&check=cascade-m07-flow");
  for (const midi of [60, 62, 64, 62, 60]) await tapMidi(midi, 360);
  await waitResult();
  await collectWinners("M07 guided result");
  await enterCheckReplay();
  await collectWinners("M07 check initial");

  await gotoState("M08 flow", "?level=M08&check=cascade-m08-flow");
  await tapMidi(62, 90);
  await collectWinners("M08 wrong transient");
  await page.waitForTimeout(420);
  for (const midi of [60, 62, 64, 65, 67]) await tapMidi(midi, 360);
  await waitResult();
  await collectWinners("M08 guided result");
  await enterCheckReplay();
  await collectWinners("M08 check initial");

  await gotoState("FG03 flow", "?level=FG03&check=cascade-fg03-flow");
  await tapMidi(60, 90);
  await collectWinners("FG03 wrong transient");
  await page.waitForTimeout(420);
  for (const midi of [64, 65, 67]) await tapMidi(midi, 360);
  await waitResult();
  await collectWinners("FG03 guided result");
  await enterCheckReplay();
  await collectWinners("FG03 check initial");

  await gotoState("S01 flow", "?mode=staff&check=cascade-s01", ".staff-stage");
  await tapMidi(62, 90);
  await collectWinners("S01 wrong transient");
  await page.waitForTimeout(440);
  await tapMidi(60, 90);
  await collectWinners("S01 first landing transient");
  await page.waitForTimeout(440);
  for (const midi of [62, 64, 65, 67, 64]) await tapMidi(midi, 380);
  await waitResult();
  await collectWinners("S01 guided result");
  await enterCheckReplay(".staff-stage");
  await collectWinners("S01 check initial");
  for (const midi of [60, 62, 64, 65, 67, 64]) await tapMidi(midi, 340);
  await waitResult();
  await collectWinners("S01 check result");

  await gotoState(
    "S01 mini initial",
    "?mode=staff&session=mini&check=cascade-s01-mini",
    ".staff-stage"
  );
  await tapMidi(62, 90);
  await collectWinners("S01 mini wrong transient");
  await page.waitForTimeout(420);
  for (const midi of [60, 62, 64]) await tapMidi(midi, 380);
  await waitResult();
  await collectWinners("S01 mini result");

  await gotoState("M03 no-reading", "?level=M03&audit=no-reading&check=cascade-nr-m03");
  await gotoState("FG03 no-reading", "?level=FG03&audit=no-reading&check=cascade-nr-fg03");
  await gotoState(
    "S01 no-reading",
    "?mode=staff&audit=no-reading&check=cascade-nr-s01",
    ".staff-stage"
  );

  await gotoState("hover source", "?level=M01&check=cascade-hover");
  await page.locator('.key.white-key[data-midi="60"]').hover();
  await collectWinners("M01 target hover");
  await page.locator("#playParentGate").focus();
  await collectWinners("topbar focus");

  await page.setViewportSize({ width: 760, height: 820 });
  await gotoState("M01 narrow", "?level=M01&check=cascade-narrow-m01");
  await gotoState("M08 narrow", "?level=M08&check=cascade-narrow-m08");
  await gotoState(
    "S01 narrow",
    "?mode=staff&check=cascade-narrow-s01",
    ".staff-stage"
  );
} finally {
  await page.close();
}

const transientSelectorPattern = /(?:^|[.:[\s-])(?:hover|active|focus|focus-visible|focus-within|pressed|program-press|hit-wrong|wrong|just-added|just-locked|is-jumping|is-stumbling|is-landing|is-leaving|drop-hint|celebrating|booting)(?:\b|[-_])/i;
const protectedMediaPattern = /prefers-reduced-motion/i;

const declarationMustStay = (declaration) => {
  if (transientSelectorPattern.test(declaration.parent?.selector || "")) return true;
  let node = declaration.parent?.parent;
  while (node && node.type !== "root") {
    if (node.type === "atrule" && protectedMediaPattern.test(`${node.name} ${node.params}`)) {
      return true;
    }
    node = node.parent;
  }
  return false;
};

const prunedRoot = roots.get(targetFile).clone();
const prunedDeclarations = eligibleDeclarations(prunedRoot);
let protectedDeclarationCount = 0;
let removedDeclarationCount = 0;
for (let index = 0; index < prunedDeclarations.length; index += 1) {
  const declaration = prunedDeclarations[index];
  if (activeDeclarationIds.has(index)) continue;
  if (declarationMustStay(declaration)) {
    protectedDeclarationCount += 1;
    continue;
  }
  declaration.remove();
  removedDeclarationCount += 1;
}

let changed = true;
while (changed) {
  changed = false;
  prunedRoot.walkRules((rule) => {
    if (!rule.nodes?.length) {
      rule.remove();
      changed = true;
    }
  });
  prunedRoot.walkAtRules((atRule) => {
    if (atRule.nodes && atRule.nodes.length === 0) {
      atRule.remove();
      changed = true;
    }
  });
}

prunedRoot.append(postcss.rule({
  selector: '#appShell.app-shell.staff-mode .staff-steps .staff-step.current[data-lane]:not(.hint):not([data-revealed="true"]) > .staff-place',
  nodes: [postcss.decl({ prop: "display", value: "none", important: true })]
}));

const protectedInventory = (cssRoot) => {
  const inventory = { keyframes: [], properties: [] };
  cssRoot.walkAtRules((atRule) => {
    const name = atRule.name.toLowerCase();
    if (name === "keyframes" || name === "-webkit-keyframes") {
      inventory.keyframes.push(`${name}:${atRule.params.trim()}`);
    } else if (name === "property") {
      inventory.properties.push(atRule.params.trim());
    }
  });
  inventory.keyframes.sort();
  inventory.properties.sort();
  return inventory;
};

const sourceProtected = protectedInventory(roots.get(targetFile));
const parserCandidate = prunedRoot.toString();
const serializationPage = await browser.newPage();
const serialized = await serializationPage.evaluate((candidate) => {
  const style = document.createElement("style");
  style.textContent = candidate;
  document.head.append(style);
  if (!style.sheet) throw new Error("Chromium could not parse the pruned stylesheet.");
  return `${Array.from(style.sheet.cssRules, (rule) => rule.cssText).join("\n\n")}\n`;
}, parserCandidate);
await serializationPage.close();
await browser.close();

const serializedRoot = postcss.parse(serialized, { from: outputPath });
const serializedProtected = protectedInventory(serializedRoot);
const protectedRulesPreserved =
  JSON.stringify(sourceProtected) === JSON.stringify(serializedProtected);
if (!protectedRulesPreserved) {
  throw new Error("Cascade pruning changed the @keyframes/@property inventory.");
}

const inputBytes = Buffer.byteLength(fs.readFileSync(path.join(rootDir, targetFile)), "utf8");
const parserCandidateBytes = Buffer.byteLength(parserCandidate, "utf8");
const outputBytes = Buffer.byteLength(serialized, "utf8");
const report = {
  baseUrl,
  targetFile,
  stylesheetFiles,
  inputBytes,
  parserCandidateBytes,
  outputBytes,
  reductionBytes: inputBytes - outputBytes,
  reductionPercent: Number((((inputBytes - outputBytes) / inputBytes) * 100).toFixed(2)),
  targetDeclarationCount: targetDeclarations.length,
  targetPropertyCount: targetProperties.size,
  activeDeclarationCount: activeDeclarationIds.size,
  protectedDeclarationCount,
  removedDeclarationCount,
  visitedStateCount: visitedStates.length,
  visitedStates,
  protectedRulesPreserved,
  browserErrors
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(outputPath, serialized, "utf8");
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify(report, null, 2));

if (browserErrors.length) process.exitCode = 1;
