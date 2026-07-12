#!/usr/bin/env node

import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import postcss from "postcss";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const args = process.argv.slice(2);
const inputPath = path.resolve(args[0] || "quality-overrides.css");
const outputPath = path.resolve(
  args[1] || "screenshots/convergence_319a/quality-candidate-dedup.css"
);
const reportPath = path.resolve(
  args[2] || "screenshots/convergence_319a/css-declaration-dedupe-report.json"
);

if (!fs.existsSync(inputPath)) {
  throw new Error(`Input stylesheet not found: ${inputPath}`);
}
if (inputPath === outputPath) {
  throw new Error("Refusing to overwrite the input stylesheet; write a candidate first.");
}

const source = fs.readFileSync(inputPath, "utf8");
const root = postcss.parse(source, { from: inputPath });
const protectedAtRules = new Set(["keyframes", "-webkit-keyframes", "property"]);
const declarationGroups = new Map();

const normalizeProperty = (property) => {
  return property.startsWith("--") ? property : property.toLowerCase();
};

const ruleIsProtected = (rule) => {
  let node = rule.parent;
  while (node && node.type !== "root") {
    if (node.type === "atrule" && protectedAtRules.has(node.name.toLowerCase())) {
      return true;
    }
    node = node.parent;
  }
  return false;
};

const ruleContext = (rule) => {
  const context = [];
  let node = rule.parent;
  while (node && node.type !== "root") {
    if (node.type === "atrule") {
      const params = node.params.trim();
      context.unshift(`@${node.name.toLowerCase()}${params ? ` ${params}` : ""}`);
    } else if (node.type === "rule") {
      context.unshift(`nested:${node.selector.trim()}`);
    }
    node = node.parent;
  }
  return context.join("\u001f");
};

let sourceStyleRuleCount = 0;
let sourceDeclarationCount = 0;

root.walkRules((rule) => {
  sourceStyleRuleCount += 1;
  if (ruleIsProtected(rule)) return;

  const selector = rule.selector.trim();
  const context = ruleContext(rule);
  rule.each((node) => {
    if (node.type !== "decl") return;
    sourceDeclarationCount += 1;
    const property = normalizeProperty(node.prop);
    const key = `${context}\u001e${selector}\u001e${property}`;
    const occurrences = declarationGroups.get(key) || [];
    occurrences.push({ node, important: Boolean(node.important) });
    declarationGroups.set(key, occurrences);
  });
});

let removedDeclarationCount = 0;
let dedupedGroupCount = 0;
let importantWinnerGroupCount = 0;

for (const occurrences of declarationGroups.values()) {
  if (occurrences.length < 2) continue;
  const importantOccurrences = occurrences.filter((occurrence) => occurrence.important);
  const winner = importantOccurrences.at(-1) || occurrences.at(-1);
  if (importantOccurrences.length) importantWinnerGroupCount += 1;

  let removedFromGroup = 0;
  for (const occurrence of occurrences) {
    if (occurrence === winner) continue;
    occurrence.node.remove();
    removedDeclarationCount += 1;
    removedFromGroup += 1;
  }
  if (removedFromGroup) dedupedGroupCount += 1;
}

const parserCandidate = root.toString();

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

const sourceProtected = protectedInventory(postcss.parse(source));

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_EXECUTABLE || undefined
});

let serialized;
let browserStats;
try {
  const page = await browser.newPage();
  ({ serialized, stats: browserStats } = await page.evaluate((candidate) => {
    const style = document.createElement("style");
    style.textContent = candidate;
    document.head.append(style);
    const sheet = style.sheet;
    if (!sheet) throw new Error("Chromium did not create a stylesheet for the candidate.");

    const stats = {
      topLevelRules: sheet.cssRules.length,
      styleRules: 0,
      groupingRules: 0,
      keyframeBlocks: 0,
      keyframeSteps: 0,
      propertyRules: 0,
      otherRules: 0
    };

    const visit = (rules, protectedContext = false) => {
      for (const rule of rules) {
        const type = rule.constructor.name;
        if (type === "CSSKeyframesRule") {
          stats.keyframeBlocks += 1;
          stats.keyframeSteps += rule.cssRules.length;
          continue;
        }
        if (type === "CSSPropertyRule") {
          stats.propertyRules += 1;
          continue;
        }
        if (type === "CSSStyleRule") {
          if (protectedContext) stats.keyframeSteps += 1;
          else stats.styleRules += 1;
          if (rule.cssRules?.length) visit(rule.cssRules, protectedContext);
          continue;
        }
        if (rule.cssRules) {
          stats.groupingRules += 1;
          visit(rule.cssRules, protectedContext);
          continue;
        }
        stats.otherRules += 1;
      }
    };

    visit(sheet.cssRules);
    return {
      serialized: `${Array.from(sheet.cssRules, (rule) => rule.cssText).join("\n\n")}\n`,
      stats
    };
  }, parserCandidate));
} finally {
  await browser.close();
}

const serializedRoot = postcss.parse(serialized, { from: outputPath });
const serializedProtected = protectedInventory(serializedRoot);
const protectedRulesPreserved =
  JSON.stringify(sourceProtected) === JSON.stringify(serializedProtected);

if (!protectedRulesPreserved) {
  throw new Error("Chromium serialization changed the @keyframes/@property inventory.");
}

const inputBytes = Buffer.byteLength(source, "utf8");
const parserCandidateBytes = Buffer.byteLength(parserCandidate, "utf8");
const outputBytes = Buffer.byteLength(serialized, "utf8");
const report = {
  inputPath,
  outputPath,
  inputBytes,
  parserCandidateBytes,
  outputBytes,
  reductionBytes: inputBytes - outputBytes,
  reductionPercent: Number((((inputBytes - outputBytes) / inputBytes) * 100).toFixed(2)),
  sourceStyleRuleCount,
  sourceDeclarationCount,
  declarationGroupCount: declarationGroups.size,
  dedupedGroupCount,
  importantWinnerGroupCount,
  removedDeclarationCount,
  protectedRulesPreserved,
  protectedInventory: sourceProtected,
  browserStats
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(outputPath, serialized, "utf8");
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

console.log(JSON.stringify(report, null, 2));

if (outputBytes >= inputBytes) {
  console.error("Candidate did not reduce the stylesheet size.");
  process.exitCode = 1;
}
