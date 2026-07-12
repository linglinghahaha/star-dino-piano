#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import postcss from "postcss";

const args = process.argv.slice(2);
const inputPath = path.resolve(
  args[0] || "screenshots/convergence_319a/quality-candidate-cascade-min.css"
);
const outputDir = path.resolve(args[1] || "screenshots/convergence_319a/split-candidate");
const baseName = args[2] || "quality-overrides";
const maxBytes = Number(args[3] || 220000);

if (!fs.existsSync(inputPath)) throw new Error(`Input stylesheet not found: ${inputPath}`);
if (!Number.isFinite(maxBytes) || maxBytes <= 0) throw new Error("maxBytes must be positive.");

const source = fs.readFileSync(inputPath, "utf8");
const root = postcss.parse(source, { from: inputPath });
const chunks = [];
let current = "";

for (const node of root.nodes || []) {
  const text = node.toString();
  const candidate = current + text;
  if (current && Buffer.byteLength(candidate, "utf8") > maxBytes) {
    chunks.push(current);
    current = text;
  } else {
    current = candidate;
  }
}
if (current) chunks.push(current);

const inventory = (css) => {
  const result = { keyframes: [], properties: [] };
  const cssRoot = postcss.parse(css);
  cssRoot.walkAtRules((atRule) => {
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

for (const chunk of chunks) {
  const bytes = Buffer.byteLength(chunk, "utf8");
  if (bytes > maxBytes) {
    throw new Error(`A single top-level rule is ${bytes} bytes, above split budget ${maxBytes}.`);
  }
  postcss.parse(chunk);
}

const recombined = chunks.join("");
const protectedRulesPreserved =
  JSON.stringify(inventory(source)) === JSON.stringify(inventory(recombined));
if (!protectedRulesPreserved) {
  throw new Error("Split output changed the @keyframes/@property inventory.");
}

fs.mkdirSync(outputDir, { recursive: true });
const files = chunks.map((chunk, index) => {
  const suffix = index === 0 ? "" : `-${index + 1}`;
  const fileName = `${baseName}${suffix}.css`;
  const filePath = path.join(outputDir, fileName);
  fs.writeFileSync(filePath, chunk, "utf8");
  return {
    fileName,
    filePath,
    bytes: Buffer.byteLength(chunk, "utf8")
  };
});

const report = {
  inputPath,
  inputBytes: Buffer.byteLength(source, "utf8"),
  outputDir,
  maxBytes,
  chunkCount: files.length,
  protectedRulesPreserved,
  files
};
fs.writeFileSync(
  path.join(outputDir, `${baseName}-split-report.json`),
  `${JSON.stringify(report, null, 2)}\n`,
  "utf8"
);
console.log(JSON.stringify(report, null, 2));
