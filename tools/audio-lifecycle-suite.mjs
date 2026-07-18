import { spawnSync } from "node:child_process";
import path from "node:path";

const baseUrl = process.env.STAR_DINO_BASE_URL || "http://127.0.0.1:4173/";
const screenshotRoot = process.env.STAR_DINO_SCREENSHOT_ROOT || "";
const suites = [
  ["AUDIO-A", "chrome-test/audio-a-m03-ls01-ls03-check.mjs"],
  ["AUDIO-B", "chrome-test/audio-b-lifecycle-check.mjs"],
  ["AUDIO-C", "chrome-test/audio-c-lifecycle-check.mjs"],
  ["LS08", "chrome-test/chapter3-ls08-listening-check.mjs"],
  ["C4 LP01-LP02", "chrome-test/chapter4-lp01-lp02-check.mjs"],
  ["C4 LP03", "chrome-test/chapter4-lp03-check.mjs"],
  ["C4 LP03 Supervisor", "chrome-test/chapter4-lp03-supervisor-check.mjs"]
];

let failed = false;
for (const [name, script] of suites) {
  console.log(`\n== ${name} ==`);
  const args = ["tools/with-playwright-path.mjs", script, baseUrl];
  if (screenshotRoot) args.push(path.join(screenshotRoot, name.replaceAll(/[^a-z0-9]+/gi, "-").replaceAll(/(^-|-$)/g, "").toLowerCase()));
  const result = spawnSync(process.execPath, args, {
    cwd: process.cwd(),
    stdio: "inherit"
  });
  if (result.error || result.status !== 0) {
    failed = true;
    console.error(`${name} failed with ${result.status ?? "spawn error"}.`);
  }
}

if (failed) process.exitCode = 1;
else console.log("Audio lifecycle suite passed.");
