import { createRequire } from "node:module";
import fs from "node:fs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const baseUrl = process.argv[2] || "http://127.0.0.1:4173/";
const checks = [];
const errors = [];
const source = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8");
const runtimeBytes = JSON.stringify({ version: 1, active: null, history: [{ sessionId: "r01a-audio-history", formalSession: true, status: "ended", actions: [], completedActions: [] }], chapter3: { lessonEvidence: {}, leaves: [true, true, true] }, chapter4: { lessonEvidence: { LP01: { played: true } }, openingReviewQueue: ["LP01"], lp03Progress: { foundationCAnchored: true, routeEvents: [], seamChecks: [] } } });
const statsBytes = JSON.stringify({ version: 3, levels: { LP01: { formalCompletions: 1 } }, notes: {}, staff: {}, retention: { stableEvents: [], retainedEvents: [], observationEvents: [], clockInvalidEvents: [] } });

function record(name, pass, details = {}) { checks.push({ name, pass: Boolean(pass), details }); }

record("Chapter 4 teaching sequences delegate to the shared piano lifecycle primitive", /function startChapter4TeachingSequence[\s\S]*?playTeachingPianoSequence/.test(source));
record("R01A test mode blocks startup schema persistence before fixture execution", /function saveSessionRuntime[\s\S]{0,260}__STAR_DINO_R01A_TEST__/.test(source) && /function persistSessionRuntimeSchemaUpgrade[\s\S]{0,160}__STAR_DINO_R01A_TEST__/.test(source));
record("R01A does not create a second local AudioContext or C4-03 review session", !/R01A[\s\S]{0,400}new\s+(?:window\.)?AudioContext/.test(source) && !/opening-review[\s\S]{0,200}bundleId:\s*["']C4-03/.test(source));

let browser;
let context;
try {
  browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_EXECUTABLE || undefined });
  context = await browser.newContext({ serviceWorkers: "block" });
  await context.addInitScript(({ runtime, stats }) => {
    window.__STAR_DINO_R01A_TEST__ = true;
    window.__r01aAudioSeed = { runtime, stats };
    localStorage.setItem("starDinoSessionRuntime", runtime);
    localStorage.setItem("starDinoLearningStats", stats);
  }, { runtime: runtimeBytes, stats: statsBytes });
  const page = await context.newPage();
  page.on("pageerror", (error) => errors.push(String(error)));
  await page.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForFunction(() => Boolean(window.__starDinoR01ATestApi), null, { timeout: 15000 });

  const ready = await page.evaluate(() => {
    const identity = window.__starDinoR01ATestApi.createR01AFixture("lp01-remediation-ready");
    return { identity, phase: document.querySelector("#chapter4Scene")?.dataset.chapter4Phase, storage: { runtime: localStorage.getItem("starDinoSessionRuntime"), stats: localStorage.getItem("starDinoLearningStats") } };
  });
  record("LP01 remediation fixture renders the real bubble scene before the model gesture", ready.identity.role === "opening-review" && ready.identity.reviewMode === "remediation" && ready.phase === "lp01-model-ready", ready);
  record("non-empty formal storage remains byte-identical through fixture startup", ready.storage.runtime === runtimeBytes && ready.storage.stats === statsBytes, ready.storage);

  await page.locator("#chapter4StartCheck").click();
  await page.waitForFunction(() => Boolean(ensureChapter4Attempt()?.audioTransaction?.startedAt) && document.querySelector("#chapter4Scene")?.dataset.chapter4Phase === "lp01-model-playing", null, { timeout: 10000 });
  const started = await page.evaluate(() => {
    const attempt = ensureChapter4Attempt();
    return { startedAt: attempt?.audioTransaction?.startedAt || null, context: attempt?.audioTransaction?.context || null, phase: document.querySelector("#chapter4Scene")?.dataset.chapter4Phase, trace: attempt?.audioTrace || [] };
  });
  record("LP01 remediation click starts a real shared piano model transaction", Boolean(started.startedAt) && started.context === "lp01-model" && started.trace.some((event) => event.kind === "model-note"), started);
  await page.waitForFunction(() => (ensureChapter4Attempt()?.audioTrace || []).some((event) => event.kind === "transaction-ended"), null, { timeout: 10000 });
  const ended = await page.evaluate(() => ({ endedAt: (ensureChapter4Attempt()?.audioTrace || []).find((event) => event.kind === "transaction-ended")?.at || null, storage: { runtime: localStorage.getItem("starDinoSessionRuntime"), stats: localStorage.getItem("starDinoLearningStats") } }));
  record("LP01 remediation records real started-to-ended evidence without writing formal storage", Boolean(ended.endedAt) && ended.storage.runtime === runtimeBytes && ended.storage.stats === statsBytes, ended);

  const reduced = await page.evaluate(() => {
    const identity = window.__starDinoR01ATestApi.createR01AFixture("lp01-reduced-cue-ready");
    const attempt = ensureChapter4Attempt();
    return { identity, phase: document.querySelector("#chapter4Scene")?.dataset.chapter4Phase, modelEvents: attempt?.modelEvents?.length || 0, modelTrace: (attempt?.audioTrace || []).filter((event) => event.context === "lp01-model").length };
  });
  record("reduced-cue fixture enters the real waiting surface without a remediation model", reduced.identity.reviewMode === "reduced-cue" && reduced.identity.runMode === "check" && reduced.phase === "awaiting-response" && reduced.modelEvents === 0 && reduced.modelTrace === 0, reduced);
  await page.locator("#chapter4Replay").click();
  await page.waitForFunction(() => ensureChapter4Attempt()?.audioTransaction?.context === "lp01-target" && Boolean(ensureChapter4Attempt()?.audioTransaction?.startedAt), null, { timeout: 10000 });
  await page.waitForFunction(() => (ensureChapter4Attempt()?.audioTrace || []).some((event) => event.kind === "transaction-ended" && event.context === "lp01-target"), null, { timeout: 10000 });
  const reducedCue = await page.evaluate(() => {
    const attempt = ensureChapter4Attempt();
    return { context: attempt?.audioTransaction?.context, startedAt: attempt?.audioTransaction?.startedAt || null, targetEnded: (attempt?.audioTrace || []).some((event) => event.kind === "transaction-ended" && event.context === "lp01-target"), modelTrace: (attempt?.audioTrace || []).filter((event) => event.context === "lp01-model").length };
  });
  record("reduced-cue replay is a started-to-ended target cue, not a full two-note remediation model", reducedCue.context === "lp01-target" && Boolean(reducedCue.startedAt) && reducedCue.targetEnded && reducedCue.modelTrace === 0, reducedCue);

  await page.evaluate(() => window.__starDinoR01ATestApi.createR01AFixture("lp01-remediation-ready"));
  await page.locator("#chapter4StartCheck").click();
  await page.waitForFunction(() => Boolean(ensureChapter4Attempt()?.audioTransaction?.startedAt), null, { timeout: 10000 });
  await page.evaluate(() => window.__starDinoR01ATestApi.interruptR01AFixtureAudio());
  await page.waitForFunction(() => document.querySelector("#chapter4Scene")?.dataset.chapter4Phase === "sound-paused" && Boolean(ensureChapter4Attempt()?.audioTransaction?.interruptedAt), null, { timeout: 10000 });
  const paused = await page.evaluate(() => ({ phase: document.querySelector("#chapter4Scene")?.dataset.chapter4Phase, interruptedAt: ensureChapter4Attempt()?.audioTransaction?.interruptedAt || null }));
  record("actual teaching interruption reaches sound-paused with transaction evidence", paused.phase === "sound-paused" && Boolean(paused.interruptedAt), paused);
  await page.locator("#chapter4Replay").click();
  const recoveredStarted = await page.waitForFunction(() => ensureChapter4Attempt()?.audioTransaction?.context === "lp01-model" && Boolean(ensureChapter4Attempt()?.audioTransaction?.startedAt), null, { timeout: 2500 }).then(() => true).catch(() => false);
  const recovered = await page.evaluate(() => { const attempt = ensureChapter4Attempt(); return { phase: document.querySelector("#chapter4Scene")?.dataset.chapter4Phase, startedAt: attempt?.audioTransaction?.startedAt || null, transaction: attempt?.audioTransaction || null, trace: attempt?.audioTrace || [], storage: { runtime: localStorage.getItem("starDinoSessionRuntime"), stats: localStorage.getItem("starDinoLearningStats") } }; });
  record("sound-paused recovery restarts the interrupted real model without formal persistence", recoveredStarted && recovered.phase === "lp01-model-playing" && Boolean(recovered.startedAt) && recovered.storage.runtime === runtimeBytes && recovered.storage.stats === statsBytes, recovered);

  await page.reload({ waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForFunction(() => Boolean(window.__starDinoR01ATestApi), null, { timeout: 15000 });
  const reload = await page.evaluate(() => ({ storage: { runtime: localStorage.getItem("starDinoSessionRuntime"), stats: localStorage.getItem("starDinoLearningStats") }, phase: document.querySelector("#chapter4Scene")?.dataset.chapter4Phase || null }));
  record("fixture reload leaves formal storage byte-identical and creates no persisted review session", reload.storage.runtime === runtimeBytes && reload.storage.stats === statsBytes && reload.phase !== "lp01-complete", reload);
} finally {
  await context?.close();
  await browser?.close();
}

const failed = checks.filter((check) => !check.pass);
console.log(`chapter4 R01A audio lifecycle checks: ${checks.length - failed.length}/${checks.length}`);
checks.forEach((check) => console.log(`${check.pass ? "PASS" : "FAIL"} ${check.name}${check.pass ? "" : ` ${JSON.stringify(check.details)}`}`));
if (errors.length) console.log(`browser diagnostics: ${JSON.stringify(errors)}`);
process.exitCode = failed.length || errors.length ? 1 : 0;
