import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const contractPath = process.argv[2] || "docs/30_CHAPTER4_R01A_MEDIA_ZONE_CONTRACT_347A_V1.json";
const runnerPath = process.argv[3] || "chrome-test/chapter4-r01a-media-zone-contract-347a-v1.mjs";
const audioPath = process.argv[4] || "chrome-test/chapter4-r01a-audio-lifecycle-check.mjs";
const checks = [];

function record(name, pass, details = {}) {
  checks.push({ name, pass: Boolean(pass), details });
}

function sha256(bytes) {
  return crypto.createHash("sha256").update(bytes).digest("hex");
}

function fileSha(filePath) {
  return sha256(fs.readFileSync(filePath));
}

const contract = JSON.parse(fs.readFileSync(contractPath, "utf8"));
const runnerSource = fs.readFileSync(runnerPath, "utf8");
const audioSource = fs.readFileSync(audioPath, "utf8");
const appSource = fs.readFileSync("app.js", "utf8");
const states = (contract.viewports || []).flatMap((viewport) =>
  (viewport.states || []).map((state) => ({ ...state, viewportId: viewport.viewportId }))
);
const expectedStateNames = [
  "lp01-remediation-ready",
  "lp01-remediation-playing",
  "lp01-reduced-cue-ready",
  "lp02-remediation-ready",
  "lp02-reduced-cue-ready",
  "spacing-story-first",
  "reduced-motion"
];
const expectedViewportIds = [
  "ipad-1024x768-dpr1",
  "ipad-1024x768-dpr2",
  "ipad-1180x820-dpr2",
  "ipad-pro-11-1194x834-dpr2",
  "media-1280x720-dpr1",
  "large-ipad-1366x1024-dpr2"
];

const viewportStateFailures = expectedViewportIds.filter((viewportId) => {
  const viewport = contract.viewports?.find((entry) => entry.viewportId === viewportId);
  const names = (viewport?.states || []).map((state) => state.stateName).sort();
  return JSON.stringify(names) !== JSON.stringify([...expectedStateNames].sort());
});
record(
  "formal contract is an unfiltered six-viewport by seven-state capture",
  contract.captureScope === "full" && contract.expectedCaptureCount === 42 &&
    contract.actualCaptureCount === 42 && states.length === 42 &&
    Array.isArray(contract.expectedPairs) && contract.expectedPairs.length === 42 &&
    viewportStateFailures.length === 0,
  {
    captureScope: contract.captureScope,
    expectedCaptureCount: contract.expectedCaptureCount,
    actualCaptureCount: contract.actualCaptureCount,
    states: states.length,
    viewportStateFailures
  }
);

const { screenshotDir: _screenshotDir, generatedAt: _generatedAt, contractSha256: _contractSha256, status: _status, ...contractCore } = contract;
record(
  "contract core hash recomputes from the complete persisted evidence",
  typeof contract.contractSha256 === "string" &&
    sha256(JSON.stringify(contractCore)).toLowerCase() === contract.contractSha256.toLowerCase(),
  { expected: contract.contractSha256, actual: sha256(JSON.stringify(contractCore)) }
);

record(
  "zone runner reads actual DOM or isolated-fixture phase instead of injecting identity metadata",
  /chapter4Scene/.test(runnerSource) && /chapter4Panel/.test(runnerSource) &&
    /dataset\.chapter4Phase|actualPhase/.test(runnerSource) &&
    !/page\.evaluate\(\(identity\)[\s\S]{0,900}\.\.\.identity/.test(runnerSource),
  {}
);
record(
  "test fixture is a hidden identity probe rather than a visible replacement lesson",
  !/r01aIsolatedFixture[\s\S]{0,1800}(?:position\s*:\s*fixed|\.innerHTML\s*=)/.test(appSource),
  {}
);
record(
  "isolated fixture identity comes from the scheduler compose plan rather than a hardcoded state table",
  /function\s+(?:render|create)R01A\w*Fixture[\s\S]{0,9000}composeChapter4ReviewPlan/.test(appSource) &&
    !/function\s+(?:render|create)R01A\w*Fixture[\s\S]{0,600}const\s+reviewStates\s*=/.test(appSource),
  {}
);
record(
  "zone runner obtains review identity from an isolated runtime fixture",
  /__starDinoR01A(?:Fixture|TestApi)/.test(runnerSource) &&
    /identitySource/.test(runnerSource),
  {}
);
record(
  "each semantic screenshot starts in a fresh browser context so playback cannot leak into the next state",
  /async function captureOne[\s\S]{0,1200}createContext\(/.test(runnerSource) &&
    /for \(const stateName of states\)[\s\S]{0,180}captureOne\(/.test(runnerSource),
  {}
);
record(
  "reduced-motion state uses an actual reduced-motion browser context and verifies the media query",
  /reducedMotion:\s*["']reduce["']/.test(runnerSource) &&
    /prefers-reduced-motion/.test(runnerSource),
  {}
);
record(
  "runner hashes captured PNG bytes and stores each screenshot hash in the contract",
  /screenshotSha256/.test(runnerSource) &&
    states.length > 0 && states.every((state) => typeof state.screenshotSha256 === "string" && /^[a-f0-9]{64}$/i.test(state.screenshotSha256)),
  { states: states.length }
);

const stabilizationFailures = states.filter((state) =>
  state.geometry?.captureMotionFrozen !== true ||
  state.geometry?.assetsDecoded !== true ||
  !Number.isInteger(state.geometry?.decodedImageCount) || state.geometry.decodedImageCount <= 0
);
const playingEvidenceFailures = states.filter((state) =>
  state.stateName === "lp01-remediation-playing" && state.geometry?.audioTransactionStarted !== true
);
const stabilizationSource = runnerSource.match(/async function stabilizeContractCapture[\s\S]*?\n}\n\nasync function captureState/)?.[0] || "";
record(
  "capture stabilization waits for real resources without hiding or degrading evidence",
  /document\.fonts/.test(stabilizationSource) && /\.decode\(\)/.test(stabilizationSource) &&
    /requestAnimationFrame\(\(\) => requestAnimationFrame/.test(stabilizationSource) &&
    /animation:\s*none/.test(stabilizationSource) && /transition:\s*none/.test(stabilizationSource) &&
    !/(?:opacity|display|visibility|filter|clip-path|mask)\s*:/.test(stabilizationSource) &&
    stabilizationFailures.length === 0,
  { stabilizationFailures: stabilizationFailures.map((state) => `${state.viewportId}:${state.stateName}`) }
);
record(
  "every LP01 playing capture persists a real started audio transaction",
  playingEvidenceFailures.length === 0 &&
    states.filter((state) => state.stateName === "lp01-remediation-playing").length === expectedViewportIds.length,
  { playingEvidenceFailures: playingEvidenceFailures.map((state) => state.viewportId) }
);

const sourceMismatches = (contract.sourceFiles || []).filter((entry) =>
  !entry?.path || !fs.existsSync(entry.path) || fileSha(entry.path).toLowerCase() !== String(entry.sha256 || "").toLowerCase()
);
record(
  "contract source hashes match the current frozen runner and runtime files",
  sourceMismatches.length === 0,
  { sourceMismatches: sourceMismatches.map((entry) => entry?.path) }
);

const identityFailures = states.filter((state) => {
  const geometry = state.geometry || {};
  if (state.stateName === "spacing-story-first") {
    return geometry.identitySource !== "runtime-isolated-fixture" ||
      geometry.role !== "lesson" || geometry.openingReviewCount !== 0 ||
      geometry.actualPhase !== "map" || geometry.phase !== "map" ||
      geometry.mapVisible !== true || geometry.fixtureOverlayVisible !== false ||
      geometry.mapChapter4Phase !== "chapter4-complete" ||
      geometry.mapEntryVisible !== true ||
      geometry.mapEntryDisabled !== true ||
      geometry.mapEntryState !== "complete" ||
      geometry.activeBaseNodeCount !== 0 ||
      !/3\/3/.test(geometry.mapProgressText || "") ||
      !/地下回声洞/.test(geometry.mapChapterText || "") ||
      /月球基地|基地\s*0\/12/.test(`${geometry.mapChapterText || ""} ${geometry.mapProgressText || ""}`) ||
      geometry.formalStorageFixtureNonEmpty !== true || geometry.formalStorageUnchanged !== true;
  }
  return geometry.identitySource !== "runtime-isolated-fixture" ||
    typeof geometry.actualPhase !== "string" || !geometry.actualPhase || /^r01a-/.test(geometry.actualPhase) ||
    geometry.role !== "opening-review" ||
    !["remediation", "reduced-cue"].includes(geometry.reviewMode) ||
    !["guided", "check"].includes(geometry.runMode) ||
    geometry.openingReviewCount !== 1 ||
    geometry.chapter4PanelVisible !== true || geometry.fixtureOverlayVisible !== false ||
    (state.stateName.startsWith("lp01-") && geometry.bubblesVisible !== true) ||
    (state.stateName.startsWith("lp02-") && geometry.keyboardVisible !== true) ||
    geometry.formalStorageFixtureNonEmpty !== true || geometry.formalStorageUnchanged !== true;
});
record(
  "every state records actual fixture identity and preserves non-empty formal storage",
  states.length > 0 && identityFailures.length === 0,
  { identityFailures: identityFailures.map((state) => `${state.viewportId}:${state.stateName}`) }
);

const teachingStateFailures = states.filter((state) => {
  const geometry = state.geometry || {};
  if (state.stateName === "lp01-remediation-ready") {
    return geometry.actualPhase !== "lp01-model-ready" || geometry.reviewMode !== "remediation" || geometry.runMode !== "guided";
  }
  if (state.stateName === "lp01-remediation-playing") {
    return geometry.actualPhase !== "lp01-model-playing" || geometry.reviewMode !== "remediation" || geometry.runMode !== "guided";
  }
  if (state.stateName === "lp01-reduced-cue-ready") {
    return geometry.actualPhase !== "awaiting-response" || geometry.reviewMode !== "reduced-cue" ||
      geometry.runMode !== "check" || geometry.strongCueUsed !== false;
  }
  if (state.stateName === "lp02-remediation-ready") {
    return geometry.actualPhase !== "lp02-assisted" || geometry.reviewMode !== "remediation" ||
      geometry.runMode !== "guided" || geometry.strongCueUsed !== true ||
      geometry.repairStage !== "assisted" || geometry.targetHighlightVisible !== true;
  }
  if (["lp02-reduced-cue-ready", "reduced-motion"].includes(state.stateName)) {
    return geometry.actualPhase !== "lp02-guide" || geometry.reviewMode !== "reduced-cue" ||
      geometry.runMode !== "check" || geometry.strongCueUsed !== false ||
      geometry.repairStage !== "none" || geometry.targetHighlightVisible !== false;
  }
  return false;
});
record(
  "captured review surfaces preserve the real remediation and reduced-cue teaching semantics",
  states.length > 0 && teachingStateFailures.length === 0,
  { teachingStateFailures: teachingStateFailures.map((state) => `${state.viewportId}:${state.stateName}`) }
);

const screenshotMismatches = [];
for (const state of states) {
  const viewport = contract.viewports.find((entry) => entry.viewportId === state.viewportId);
  const screenshotDir = viewport?.screenshotDir || contract.screenshotDir || "screenshots/chapter4_r01a_media_zones_347a_v1";
  const screenshotPath = path.resolve(screenshotDir, state.screenshot || "");
  if (!state.screenshot || !fs.existsSync(screenshotPath) ||
      fileSha(screenshotPath).toLowerCase() !== String(state.screenshotSha256 || "").toLowerCase()) {
    screenshotMismatches.push(`${state.viewportId}:${state.stateName}`);
  }
}
record(
  "all contract screenshot hashes match current PNG bytes",
  states.length > 0 && screenshotMismatches.length === 0,
  { screenshotMismatches }
);

const stateByViewport = new Map();
for (const state of states) {
  if (!stateByViewport.has(state.viewportId)) stateByViewport.set(state.viewportId, new Map());
  stateByViewport.get(state.viewportId).set(state.stateName, state);
}
const indistinguishable = [];
const distinctPairs = [
  ["lp01-remediation-ready", "lp01-remediation-playing"],
  ["lp01-remediation-ready", "lp01-reduced-cue-ready"],
  ["lp02-remediation-ready", "lp02-reduced-cue-ready"]
];
for (const [viewportId, entries] of stateByViewport) {
  for (const [leftName, rightName] of distinctPairs) {
    const left = entries.get(leftName);
    const right = entries.get(rightName);
    if (!left || !right || !left.screenshotSha256 || left.screenshotSha256 === right.screenshotSha256) {
      indistinguishable.push(`${viewportId}:${leftName}=${rightName}`);
    }
  }
}
record(
  "semantically different review states are visually distinct at every viewport",
  stateByViewport.size > 0 && indistinguishable.length === 0,
  { indistinguishable }
);

const reducedMotionFailures = states.filter((state) =>
  state.stateName === "reduced-motion" && state.geometry?.reducedMotion !== true
);
record(
  "reduced-motion captures prove the active browser preference",
  reducedMotionFailures.length === 0 && states.some((state) => state.stateName === "reduced-motion"),
  { reducedMotionFailures: reducedMotionFailures.map((state) => state.viewportId) }
);

const audioRecordCount = (audioSource.match(/\brecord\(/g) || []).length - 1;
record(
  "dedicated R01A audio gate exercises real interactions and started-to-ended evidence",
  audioRecordCount >= 8 && /\.click\(/.test(audioSource) && /waitForFunction/.test(audioSource) &&
    /startedAt/.test(audioSource) && /endedAt/.test(audioSource),
  { audioRecordCount }
);
record(
  "dedicated audio gate covers reduced-cue no-model behavior and interruption recovery",
  /reduced-cue/.test(audioSource) && /model/i.test(audioSource) &&
    /interruptedAt|sound-paused|reload/.test(audioSource),
  {}
);

record(
  "contract has zero geometry failures and browser errors",
  Array.isArray(contract.failures) && contract.failures.length === 0 &&
    Array.isArray(contract.browserErrors) && contract.browserErrors.length === 0,
  { failures: contract.failures, browserErrors: contract.browserErrors }
);

const failed = checks.filter((check) => !check.pass);
console.log(`supervisor R01A artifact authenticity checks: ${checks.length - failed.length}/${checks.length}`);
checks.forEach((check) => console.log(`${check.pass ? "PASS" : "FAIL"} ${check.name}`));
if (failed.length) {
  failed.forEach((check) => console.log(`DETAIL ${check.name}: ${JSON.stringify(check.details)}`));
  process.exit(1);
}
