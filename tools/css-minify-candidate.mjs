#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import postcss from "postcss";
import { transform } from "lightningcss";

const args = process.argv.slice(2);
const inputPath = path.resolve(
  args[0] || "screenshots/convergence_319a/quality-candidate-cascade-visible.css"
);
const outputPath = path.resolve(
  args[1] || "screenshots/convergence_319a/quality-candidate-cascade-min.css"
);
const reportPath = path.resolve(
  args[2] || "screenshots/convergence_319a/css-candidate-minify-report.json"
);

if (!fs.existsSync(inputPath)) throw new Error(`Input stylesheet not found: ${inputPath}`);
if (inputPath === outputPath) throw new Error("Refusing to overwrite the input stylesheet.");

const inventory = (source) => {
  const result = { keyframes: [], properties: [] };
  const root = postcss.parse(source);
  root.walkAtRules((atRule) => {
    const name = atRule.name.toLowerCase();
    if (name === "keyframes" || name === "-webkit-keyframes") {
      result.keyframes.push(`${name}:${atRule.params.trim()}`);
    } else if (name === "property") {
      result.properties.push(atRule.params.trim());
    }
  });
  result.keyframes.sort();
  result.properties.sort();
  return result;
};

const source = fs.readFileSync(inputPath);
const sourceText = source.toString("utf8");
const sourceInventory = inventory(sourceText);
const transformed = transform({
  filename: path.basename(inputPath),
  code: source,
  minify: true,
  sourceMap: false,
  errorRecovery: false
});
const output = transformed.code.toString("utf8");
const outputInventory = inventory(output);
const sourceUniqueKeyframes = [...new Set(sourceInventory.keyframes)].sort();
const outputUniqueKeyframes = [...new Set(outputInventory.keyframes)].sort();
const protectedRulesPreserved =
  JSON.stringify(sourceUniqueKeyframes) === JSON.stringify(outputUniqueKeyframes) &&
  JSON.stringify(sourceInventory.properties) === JSON.stringify(outputInventory.properties);

if (!protectedRulesPreserved) {
  throw new Error("Lightning CSS changed the @keyframes/@property inventory.");
}

const report = {
  inputPath,
  outputPath,
  inputBytes: source.length,
  outputBytes: transformed.code.length,
  reductionBytes: source.length - transformed.code.length,
  reductionPercent: Number((((source.length - transformed.code.length) / source.length) * 100).toFixed(2)),
  protectedRulesPreserved,
  consolidatedDuplicateKeyframes:
    sourceInventory.keyframes.length - outputInventory.keyframes.length,
  warnings: transformed.warnings
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(outputPath, transformed.code);
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify(report, null, 2));
