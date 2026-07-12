#!/usr/bin/env node

import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const require = createRequire(import.meta.url);
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("Usage: node tools/with-playwright-path.mjs <script.mjs> [...args]");
  process.exit(2);
}

const candidateNodeModules = [
  path.resolve(process.cwd(), "node_modules"),
  path.join(
    os.homedir(),
    ".cache",
    "codex-runtimes",
    "codex-primary-runtime",
    "dependencies",
    "node",
    "node_modules"
  )
];

function moduleRootsFor(nodeModulesPath) {
  return [
    nodeModulesPath,
    path.join(nodeModulesPath, ".pnpm", "node_modules")
  ].filter((root) => fs.existsSync(root));
}

function hasCompletePlaywright(roots) {
  if (roots.length === 0) return false;
  try {
    require.resolve("playwright", { paths: roots });
    require.resolve("playwright-core", { paths: roots });
    return true;
  } catch {
    return false;
  }
}

const playwrightNodeModules = candidateNodeModules
  .map(moduleRootsFor)
  .filter(hasCompletePlaywright)
  .flat();

if (playwrightNodeModules.length === 0) {
  console.error("Cannot resolve a complete Playwright install. Run npm install, or use the Codex bundled runtime with playwright and playwright-core available.");
  process.exit(1);
}

const env = { ...process.env };
const nodePathParts = [
  ...playwrightNodeModules,
  ...(env.NODE_PATH ? env.NODE_PATH.split(path.delimiter).filter(Boolean) : [])
];
env.NODE_PATH = [...new Set(nodePathParts)].join(path.delimiter);

if (!env.CHROME_EXECUTABLE) {
  const chromeCandidates = [
    path.join(env.ProgramFiles || "", "Google", "Chrome", "Application", "chrome.exe"),
    path.join(env["ProgramFiles(x86)"] || "", "Google", "Chrome", "Application", "chrome.exe"),
    path.join(env.LOCALAPPDATA || "", "Google", "Chrome", "Application", "chrome.exe"),
    path.join(env.ProgramFiles || "", "Microsoft", "Edge", "Application", "msedge.exe"),
    path.join(env["ProgramFiles(x86)"] || "", "Microsoft", "Edge", "Application", "msedge.exe")
  ];
  const browserPath = chromeCandidates.find((candidate) => candidate && fs.existsSync(candidate));
  if (browserPath) env.CHROME_EXECUTABLE = browserPath;
}

const child = spawn(process.execPath, args, {
  cwd: process.cwd(),
  env,
  stdio: "inherit"
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});
