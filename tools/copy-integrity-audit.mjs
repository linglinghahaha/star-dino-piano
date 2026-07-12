#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();

const defaultFiles = [
  "index.html",
  "manifest.webmanifest",
  "app.js",
  "styles.css",
  "staff-overrides.css",
  "play-overrides.css",
  "keyboard-overrides.css",
  "map-overrides.css",
  "quality-overrides.css"
];

const mojibakeTokens = [
  "涓",
  "榛",
  "鏄",
  "鍚",
  "绋",
  "鐪",
  "闂",
  "杈",
  "楹",
  "惧",
  "€?",
  "锛?",
  "銆?"
];

const placeholderPatterns = [
  /\bTODO\b/i,
  /\bFIXME\b/i,
  /\bPLACEHOLDER\b/i,
  /lorem ipsum/i,
  /待补/,
  /测试文案/,
  /占位/
];

const ipRiskPatterns = [
  /奥特曼/,
  /迪迦/,
  /戴拿/,
  /\bM78\b/i,
  /\bUltraman\b/i,
  /\bTiga\b/i,
  /\bDyna\b/i
];

const sourceAllowlist = new Map([
  ["tools/copy-integrity-audit.mjs", [...mojibakeTokens, ...ipRiskPatterns.map((item) => item.source)]]
]);

function normalizeRelative(value) {
  return value.split(path.sep).join("/").replace(/^\.\//, "");
}

async function pathExists(relativePath) {
  try {
    await fs.access(path.join(root, relativePath));
    return true;
  } catch {
    return false;
  }
}

function lineAndColumn(content, index) {
  const before = content.slice(0, index);
  const lines = before.split(/\r?\n/);
  return {
    line: lines.length,
    column: lines[lines.length - 1].length + 1
  };
}

function addFailure(failures, file, content, index, message) {
  const location = lineAndColumn(content, index);
  failures.push(`${file}:${location.line}:${location.column} ${message}`);
}

function isAllowed(file, token) {
  const allowed = sourceAllowlist.get(file) || [];
  return allowed.includes(token);
}

async function scanFile(file) {
  const content = await fs.readFile(path.join(root, file), "utf8");
  const failures = [];

  for (const token of mojibakeTokens) {
    if (isAllowed(file, token)) continue;
    let index = content.indexOf(token);
    while (index >= 0) {
      addFailure(failures, file, content, index, `possible mojibake token: ${JSON.stringify(token)}`);
      index = content.indexOf(token, index + token.length);
    }
  }

  for (const pattern of placeholderPatterns) {
    if (file.endsWith(".css")) break;
    const match = content.match(pattern);
    if (match?.index !== undefined) {
      addFailure(failures, file, content, match.index, `placeholder or unfinished copy: ${pattern}`);
    }
  }

  for (const pattern of ipRiskPatterns) {
    const match = content.match(pattern);
    if (match?.index !== undefined) {
      addFailure(failures, file, content, match.index, `copyright/IP-risk copy in publishable text: ${pattern}`);
    }
  }

  return failures;
}

const files = process.argv.slice(2).length
  ? process.argv.slice(2).map(normalizeRelative)
  : defaultFiles;

const missing = [];
const failures = [];

for (const file of files) {
  if (!await pathExists(file)) {
    missing.push(file);
    continue;
  }
  failures.push(...await scanFile(file));
}

console.log("copy integrity audit");
console.log(`files checked: ${files.length - missing.length}`);

for (const file of missing) {
  console.error(`FAIL missing file: ${file}`);
}

for (const failure of failures) {
  console.error(`FAIL ${failure}`);
}

if (missing.length || failures.length) {
  process.exitCode = 1;
} else {
  console.log("pass");
}
