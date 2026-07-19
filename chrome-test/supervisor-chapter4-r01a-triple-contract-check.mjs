import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const defaultContracts = [1, 2, 3].map((round) =>
  `docs/30_CHAPTER4_R01A_MEDIA_ZONE_CONTRACT_347A_V1_full_round${round}.json`
);
const contractPaths = process.argv.length > 2 ? process.argv.slice(2) : defaultContracts;
if (contractPaths.length !== 3) throw new Error("Expected exactly three full R01A contract paths.");

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
const expectedPairs = expectedViewportIds
  .flatMap((viewportId) => expectedStateNames.map((stateName) => `${viewportId}:${stateName}`))
  .sort();
const foreignMarkers = /MidiInputProbe|keyboard_captain|MatePad|com\.dashun\.midiprobe/i;
const checks = [];

function sha256(bytes) {
  return crypto.createHash("sha256").update(bytes).digest("hex");
}

function record(name, pass, details = {}) {
  checks.push({ name, pass: Boolean(pass), details });
}

function stateRecords(contract) {
  return (contract.viewports || []).flatMap((viewport) =>
    (viewport.states || []).map((state) => ({
      ...state,
      viewportId: viewport.viewportId,
      key: `${viewport.viewportId}:${state.stateName}`
    }))
  ).sort((left, right) => left.key.localeCompare(right.key));
}

const rounds = contractPaths.map((contractPath, index) => {
  const bytes = fs.readFileSync(contractPath);
  const contract = JSON.parse(bytes.toString("utf8"));
  const states = stateRecords(contract);
  const { screenshotDir, generatedAt, contractSha256, status, ...core } = contract;
  const recomputedCoreSha256 = sha256(JSON.stringify(core));
  const screenshotFiles = fs.existsSync(screenshotDir)
    ? fs.readdirSync(screenshotDir).filter((file) => file.toLowerCase().endsWith(".png")).sort()
    : [];
  const screenshotFailures = states.filter((state) => {
    const filePath = path.join(screenshotDir || "", state.screenshot || "");
    return !state.screenshot || !fs.existsSync(filePath) ||
      sha256(fs.readFileSync(filePath)).toLowerCase() !== String(state.screenshotSha256 || "").toLowerCase();
  });
  const sourceFailures = (contract.sourceFiles || []).filter((source) =>
    !source?.path || !fs.existsSync(source.path) ||
    sha256(fs.readFileSync(source.path)).toLowerCase() !== String(source.sha256 || "").toLowerCase()
  );
  const stabilizationFailures = states.filter((state) =>
    state.geometry?.captureMotionFrozen !== true ||
    state.geometry?.assetsDecoded !== true ||
    !Number.isInteger(state.geometry?.decodedImageCount) || state.geometry.decodedImageCount <= 0
  );
  const audioFailures = states.filter((state) =>
    state.stateName === "lp01-remediation-playing" && state.geometry?.audioTransactionStarted !== true
  );
  const pairVector = states.map((state) => `${state.key}=${state.screenshotSha256}`);
  const sourceVector = (contract.sourceFiles || [])
    .map((source) => `${source.path}=${source.sha256}`)
    .sort();
  const persistedPairs = Array.isArray(contract.expectedPairs) ? [...contract.expectedPairs].sort() : [];

  record(
    `round ${index + 1} is a complete full-scope 42-state contract`,
    contract.captureScope === "full" && contract.expectedCaptureCount === 42 &&
      contract.actualCaptureCount === 42 && states.length === 42 &&
      JSON.stringify(persistedPairs) === JSON.stringify(expectedPairs) &&
      JSON.stringify(states.map((state) => state.key)) === JSON.stringify(expectedPairs),
    { contractPath, captureScope: contract.captureScope, expected: contract.expectedCaptureCount, actual: contract.actualCaptureCount }
  );
  record(
    `round ${index + 1} core hash and source hashes are authentic`,
    recomputedCoreSha256 === contract.contractSha256 && sourceFailures.length === 0,
    { contractPath, persisted: contract.contractSha256, recomputed: recomputedCoreSha256, sourceFailures: sourceFailures.map((source) => source.path) }
  );
  record(
    `round ${index + 1} has exactly 42 matching PNG files`,
    screenshotFiles.length === 42 && screenshotFailures.length === 0,
    { contractPath, screenshotFiles: screenshotFiles.length, screenshotFailures: screenshotFailures.map((state) => state.key) }
  );
  record(
    `round ${index + 1} persists stabilization and real playing evidence`,
    stabilizationFailures.length === 0 && audioFailures.length === 0 &&
      states.filter((state) => state.stateName === "lp01-remediation-playing").length === expectedViewportIds.length,
    { stabilizationFailures: stabilizationFailures.map((state) => state.key), audioFailures: audioFailures.map((state) => state.key) }
  );
  record(
    `round ${index + 1} is error-free and isolated to Star Dino Workshop`,
    contract.status === "browser_coordinate_contract_passed_device_unverified" &&
      Array.isArray(contract.failures) && contract.failures.length === 0 &&
      Array.isArray(contract.browserErrors) && contract.browserErrors.length === 0 &&
      !foreignMarkers.test(`${contractPath}\n${JSON.stringify(contract)}`),
    { contractPath, failures: contract.failures, browserErrors: contract.browserErrors }
  );

  return {
    contractPath,
    screenshotDir,
    contractSha256,
    pairVector,
    sourceVector,
    jsonSha256: sha256(bytes)
  };
});

record(
  "all three rounds use distinct evidence paths",
  new Set(rounds.map((round) => path.resolve(round.contractPath))).size === 3 &&
    new Set(rounds.map((round) => path.resolve(round.screenshotDir))).size === 3,
  { contracts: rounds.map((round) => round.contractPath), screenshotDirs: rounds.map((round) => round.screenshotDir) }
);
record(
  "all three core hashes are byte-identical",
  new Set(rounds.map((round) => round.contractSha256)).size === 1,
  { hashes: rounds.map((round) => round.contractSha256) }
);
record(
  "all 42 state PNG hashes are byte-identical across three rounds",
  rounds.slice(1).every((round) => JSON.stringify(round.pairVector) === JSON.stringify(rounds[0].pairVector)),
  { stateCount: rounds[0].pairVector.length }
);
record(
  "all three rounds bind the same frozen source set",
  rounds.slice(1).every((round) => JSON.stringify(round.sourceVector) === JSON.stringify(rounds[0].sourceVector)),
  { sources: rounds[0].sourceVector }
);

const failed = checks.filter((check) => !check.pass);
console.log(`supervisor R01A triple contract checks: ${checks.length - failed.length}/${checks.length}`);
checks.forEach((check) => console.log(`${check.pass ? "PASS" : "FAIL"} ${check.name}`));
console.log(`core SHA-256: ${rounds[0].contractSha256}`);
rounds.forEach((round, index) => console.log(`round ${index + 1} JSON SHA-256: ${round.jsonSha256}`));
if (failed.length) {
  failed.forEach((check) => console.log(`DETAIL ${check.name}: ${JSON.stringify(check.details)}`));
  process.exit(1);
}
