#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const args = process.argv.slice(2);
const scanIndex = args.indexOf("--scan");
const strict = args.includes("--strict");
const policyPath = path.join(root, "release-bundle-policy.json");

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function normalizeRelative(value) {
  return toPosix(value).replace(/^\.\//, "");
}

function globToRegExp(glob) {
  const normalized = normalizeRelative(glob);
  let out = "^";
  for (let index = 0; index < normalized.length; index += 1) {
    const char = normalized[index];
    const next = normalized[index + 1];
    if (char === "*" && next === "*") {
      out += ".*";
      index += 1;
    } else if (char === "*") {
      out += "[^/]*";
    } else if ("\\^$+?.()|{}[]".includes(char)) {
      out += `\\${char}`;
    } else {
      out += char;
    }
  }
  out += "$";
  return new RegExp(out);
}

function matchesAny(relativePath, patterns) {
  return patterns.some((pattern) => globToRegExp(pattern).test(relativePath));
}

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir, base = dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(fullPath, base));
    } else if (entry.isFile()) {
      files.push(normalizeRelative(path.relative(base, fullPath)));
    }
  }
  return files;
}

async function expandInclude(pattern) {
  if (!pattern.endsWith("/**")) {
    const fullPath = path.join(root, pattern);
    return await pathExists(fullPath) ? [normalizeRelative(pattern)] : [];
  }

  const dir = pattern.slice(0, -3);
  const fullDir = path.join(root, dir);
  if (!await pathExists(fullDir)) return [];
  const files = await walk(fullDir, root);
  return files;
}

async function loadPolicy() {
  const raw = await fs.readFile(policyPath, "utf8");
  return JSON.parse(raw);
}

async function readIfExists(relativePath) {
  const fullPath = path.join(root, relativePath);
  if (!await pathExists(fullPath)) return "";
  return fs.readFile(fullPath, "utf8");
}

function canScanReferences(relativePath) {
  const extension = path.extname(relativePath);
  return [".css", ".html", ".js", ".json", ".md", ".txt", ".webmanifest"].includes(extension);
}

async function auditReferences(files, policy, readFile) {
  const failures = [];
  for (const file of files) {
    if (!canScanReferences(file)) continue;
    const content = await readFile(file);
    for (const forbidden of policy.referenceDeny) {
      if (content.includes(forbidden)) {
        failures.push(`${file} references forbidden release path: ${forbidden}`);
      }
    }
  }
  return failures;
}

function localEntryReference(value) {
  const candidate = String(value || "").trim();
  if (!candidate || candidate.startsWith("#") || /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(candidate)) return null;
  const pathname = candidate.split(/[?#]/, 1)[0].replace(/^\/+/, "");
  return pathname ? normalizeRelative(pathname) : null;
}

async function auditEntryPointReferences(files) {
  const failures = [];
  const included = new Set(files);
  const html = await readIfExists("index.html");
  const attributePattern = /<(?:link|script)\b[^>]*?\b(?:href|src)\s*=\s*(["'])(.*?)\1/gi;
  for (const match of html.matchAll(attributePattern)) {
    const reference = localEntryReference(match[2]);
    if (reference && !included.has(reference)) {
      failures.push(`index.html local dependency is absent from release include: ${reference}`);
    }
  }
  return failures;
}

async function auditPolicy(policy) {
  const failures = [];
  const warnings = [];
  const includes = new Set();

  for (const pattern of policy.include) {
    const expanded = await expandInclude(pattern);
    if (!expanded.length) failures.push(`include path not found: ${pattern}`);
    expanded.forEach((file) => includes.add(file));
  }

  for (const file of includes) {
    if (matchesAny(file, policy.deny)) {
      failures.push(`release include matches deny pattern: ${file}`);
    }
  }

  failures.push(...await auditReferences(includes, policy, readIfExists));
  failures.push(...await auditEntryPointReferences(includes));

  const cssBudget = policy.budgets?.maxCssBytes ?? Number.POSITIVE_INFINITY;
  const exceptions = new Map((policy.temporaryExceptions || []).map((item) => [item.path, item]));
  for (const file of includes) {
    if (!file.endsWith(".css")) continue;
    const stat = await fs.stat(path.join(root, file));
    const exception = exceptions.get(file);
    if (stat.size > cssBudget) {
      const message = `${file} is ${stat.size} bytes, above CSS budget ${cssBudget}`;
      if (exception && !strict) {
        warnings.push(`${message}; temporary exception: ${exception.reason}`);
      } else {
        failures.push(message);
      }
    }
  }

  const runtimeFiles = [...includes].filter((file) => file.startsWith("assets/runtime/"));
  let runtimeBytes = 0;
  for (const file of runtimeFiles) {
    const stat = await fs.stat(path.join(root, file));
    runtimeBytes += stat.size;
  }
  const runtimeBudget = policy.budgets?.maxInitialRuntimeAssetBytes ?? Number.POSITIVE_INFINITY;
  if (runtimeBytes > runtimeBudget) {
    failures.push(`assets/runtime total is ${runtimeBytes} bytes, above startup budget ${runtimeBudget}`);
  }

  return {
    mode: strict ? "policy strict" : "policy prototype",
    includeCount: includes.size,
    runtimeBytes,
    failures,
    warnings
  };
}

async function auditScan(policy, scanRoot) {
  const fullScanRoot = path.resolve(root, scanRoot);
  const files = await walk(fullScanRoot, fullScanRoot);
  const failures = [];
  const warnings = [];

  for (const file of files) {
    if (matchesAny(file, policy.deny)) {
      failures.push(`scanned bundle contains denied file: ${file}`);
    }
  }

  failures.push(...await auditReferences(files, policy, (file) => {
    return fs.readFile(path.join(fullScanRoot, file), "utf8");
  }));

  const cssBudget = policy.budgets?.maxCssBytes ?? Number.POSITIVE_INFINITY;
  for (const file of files) {
    if (!file.endsWith(".css")) continue;
    const stat = await fs.stat(path.join(fullScanRoot, file));
    if (stat.size > cssBudget) {
      failures.push(`scanned bundle CSS exceeds budget: ${file} (${stat.size} bytes)`);
    }
  }

  return {
    mode: `scan ${normalizeRelative(scanRoot)}`,
    includeCount: files.length,
    runtimeBytes: null,
    failures,
    warnings
  };
}

function printResult(result) {
  console.log(`production bundle audit: ${result.mode}`);
  console.log(`files checked: ${result.includeCount}`);
  if (typeof result.runtimeBytes === "number") {
    console.log(`runtime asset bytes: ${result.runtimeBytes}`);
  }
  for (const warning of result.warnings) {
    console.warn(`WARN ${warning}`);
  }
  for (const failure of result.failures) {
    console.error(`FAIL ${failure}`);
  }
}

const policy = await loadPolicy();
const result = scanIndex >= 0
  ? await auditScan(policy, args[scanIndex + 1] || ".")
  : await auditPolicy(policy);

printResult(result);
if (result.failures.length) {
  process.exitCode = 1;
}
