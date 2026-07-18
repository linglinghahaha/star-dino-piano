import { spawnSync } from "node:child_process";

const baseUrl = process.env.STAR_DINO_BASE_URL || "http://127.0.0.1:4173/";
const suites = [
  ["AUDIO-A", "chrome-test/audio-a-m03-ls01-ls03-check.mjs"],
  ["AUDIO-B", "chrome-test/audio-b-lifecycle-check.mjs"],
  ["AUDIO-C", "chrome-test/audio-c-lifecycle-check.mjs"],
  ["LS08", "chrome-test/chapter3-ls08-listening-check.mjs"],
  ["C4 LP01-LP02", "chrome-test/chapter4-lp01-lp02-check.mjs"]
];

let failed = false;
for (const [name, script] of suites) {
  console.log(`\n== ${name} ==`);
  const result = spawnSync(process.execPath, ["tools/with-playwright-path.mjs", script, baseUrl], {
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
