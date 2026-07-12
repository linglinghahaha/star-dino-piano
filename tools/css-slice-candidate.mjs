#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import postcss from "postcss";

const args = process.argv.slice(2);
const inputPath = path.resolve(args[0] || "quality-overrides.css");
const outputPath = path.resolve(
  args[1] || "screenshots/convergence_319a/quality-candidate-slice.css"
);

if (!fs.existsSync(inputPath)) {
  throw new Error(`Input stylesheet not found: ${inputPath}`);
}
if (inputPath === outputPath) {
  throw new Error("Refusing to overwrite the input stylesheet.");
}

const source = fs.readFileSync(inputPath, "utf8");
const root = postcss.parse(source, { from: inputPath });
const nodes = root.nodes || [];

const markerIndex = (version) => {
  const pattern = new RegExp(`^\\s*Overhaul ${version}(?:\\D|$)`, "i");
  const index = nodes.findIndex((node) => node.type === "comment" && pattern.test(node.text));
  if (index < 0) throw new Error(`Cannot find Overhaul ${version} marker.`);
  return index;
};

const firstOverhaul = nodes.findIndex((node) => {
  return node.type === "comment" && /^\s*Overhaul\s+/i.test(node.text);
});
const overhaul180 = markerIndex("180");
const overhaul243 = markerIndex("243");

const selected = [
  ...nodes.slice(0, firstOverhaul),
  ...nodes.slice(overhaul180, overhaul243),
  ...nodes.slice(overhaul243)
].map((node) => node.clone());

const candidateRoot = postcss.root({ nodes: selected });
candidateRoot.append(postcss.comment({
  text: "Convergence 319a: keep duplicate instruction surfaces out of ordinary play."
}));
candidateRoot.append(postcss.rule({
  selector: [
    ".app-shell:not(.staff-mode) .build-panel .panel-head",
    ".app-shell:not(.staff-mode) .level-intro-card"
  ].join(",\n"),
  nodes: [postcss.decl({ prop: "display", value: "none", important: true })]
}));

const candidate = `${candidateRoot.toString()}\n`;
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, candidate, "utf8");

console.log(JSON.stringify({
  inputPath,
  outputPath,
  inputBytes: Buffer.byteLength(source, "utf8"),
  outputBytes: Buffer.byteLength(candidate, "utf8"),
  selectedTopLevelNodes: selected.length + 2,
  ranges: [
    "preamble before first Overhaul marker",
    "Overhaul 180-242",
    "Overhaul 243 through current tail",
    "Convergence 319a duplicate-instruction lock"
  ]
}, null, 2));
