import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const target = process.argv[2] || "http://127.0.0.1:4197/audio/review/";
const outputDir = path.resolve(process.cwd(), process.argv[3] || "screenshots/audio_review_latest");
fs.mkdirSync(outputDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: process.env.CHROME_EXECUTABLE || undefined,
  headless: true
});

const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
const page = await context.newPage();
const failures = [];
const browserErrors = [];

page.on("console", (message) => {
  if (message.type() === "error") browserErrors.push(`console: ${message.text()}`);
});
page.on("pageerror", (error) => browserErrors.push(`pageerror: ${error.message}`));
page.on("requestfailed", (request) => browserErrors.push(`requestfailed: ${request.url()} (${request.failure()?.errorText})`));

function check(condition, message) {
  if (!condition) failures.push(message);
}

await page.goto(target, { waitUntil: "networkidle" });
const reviewIdentity = await page.evaluate(() => ({
  batchId: window.AUDIO_REVIEW_DATA?.batch_id || null,
  protocol: window.AUDIO_REVIEW_DATA?.review_protocol || null
}));
const reviewProtocol = reviewIdentity.protocol;
check(reviewProtocol?.id === "ls04-c4-d4-offline-ab", "review page exposes the LS04 A/B protocol id");
check(reviewProtocol?.revision === "r1", "review page exposes review protocol revision r1");
const reviewStorageKey = `starDinoAudioReview:${reviewIdentity.batchId}:${reviewProtocol?.revision}`;
const legacyStorageKey = `starDinoAudioReview:${reviewIdentity.batchId}`;

async function assertPendingReviewState(phase) {
  check(await page.locator(".status-badge").filter({ hasText: "未审核候选" }).count() === 3, `${phase}: all three badges are pending`);
  const verdicts = await page.locator(".verdict").evaluateAll((elements) => elements.map((select) => select.value));
  check(verdicts.length === 3 && verdicts.every((value) => value === "pending"), `${phase}: all three verdict controls are pending`);
}

// A legacy batch-only verdict must not bleed into the C4/D4 LS04 review protocol.
await page.evaluate(({ legacyKey, currentKey }) => {
  localStorage.setItem(legacyKey, JSON.stringify({
    "SFX-FOLEY-004": { verdict: "pass", notes: "synthetic legacy record" }
  }));
  localStorage.removeItem(currentKey);
}, { legacyKey: legacyStorageKey, currentKey: reviewStorageKey });
await page.reload({ waitUntil: "networkidle" });

check(await page.locator(".asset-item").count() === 3, "review page renders the three LS04 asset rows");
check(await page.locator(".reference-player").count() === 2, "review page renders C4 and D4 teaching references");
check(await page.locator(".asset-item audio").count() === 18, "review page renders six players for each LS04 asset");
check(await page.locator("audio").count() === 20, "review page renders two references plus eighteen LS04 players");
await assertPendingReviewState("initial state");
check(await page.locator("audio[data-missing-mix]").count() === 0, "every C4/D4 A/B mix path is present");

const media = await page.locator("audio").evaluateAll(async (elements) => {
  await Promise.all(elements.map((audio) => new Promise((resolve) => {
    if (audio.readyState >= 1) {
      resolve();
      return;
    }
    const finish = () => resolve();
    audio.addEventListener("loadedmetadata", finish, { once: true });
    audio.addEventListener("error", finish, { once: true });
    setTimeout(finish, 5000);
    audio.load();
  })));
  return elements.map((audio) => ({
    source: audio.currentSrc,
    readyState: audio.readyState,
    duration: audio.duration,
    error: audio.error?.message || null
  }));
});

for (const item of media) {
  check(item.readyState >= 1, `media metadata loaded: ${item.source}`);
  check(Number.isFinite(item.duration) && item.duration > 0, `media duration is valid: ${item.source}`);
  check(!item.error, `media has no decode error: ${item.source}`);
}

const desktopOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
check(desktopOverflow <= 1, "desktop page has no horizontal overflow");
await page.screenshot({ path: path.join(outputDir, "desktop.png"), fullPage: true });

const downloadPromise = page.waitForEvent("download");
await page.locator("#exportReview").click();
const download = await downloadPromise;
const exportStream = await download.createReadStream();
let exportedText = "";
for await (const chunk of exportStream) exportedText += chunk.toString();
await download.delete();
const exportedReview = JSON.parse(exportedText);
check(exportedReview.review_protocol_id === reviewProtocol.id, "export records the current review protocol id");
check(exportedReview.review_protocol_revision === reviewProtocol.revision, "export records the current review protocol revision");

await page.locator(".asset-item").first().locator(".verdict").selectOption("pass");
check(await page.evaluate(({ key }) => {
  const review = JSON.parse(localStorage.getItem(key) || "{}");
  return review["SFX-FOLEY-004"]?.verdict === "pass";
}, { key: reviewStorageKey }), "current protocol localStorage records a review decision");
await page.locator("#statusFilter").selectOption("pass");
check(await page.locator(".asset-item:visible").count() === 1, "status filter shows the locally approved review row");

// The filter exercise is synthetic. Remove its local state and reload before
// the mobile evidence is captured, so no test action resembles a human verdict.
await page.evaluate(({ legacyKey, currentKey }) => {
  localStorage.removeItem(legacyKey);
  localStorage.removeItem(currentKey);
}, { legacyKey: legacyStorageKey, currentKey: reviewStorageKey });
await page.reload({ waitUntil: "networkidle" });
await assertPendingReviewState("after synthetic filter cleanup");
check(await page.evaluate(({ legacyKey, currentKey }) => (
  localStorage.getItem(legacyKey) === null && localStorage.getItem(currentKey) === null
), { legacyKey: legacyStorageKey, currentKey: reviewStorageKey }), "synthetic filter leaves no legacy or current-protocol localStorage record");

await page.setViewportSize({ width: 390, height: 844 });
const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
check(mobileOverflow <= 1, "mobile page has no horizontal overflow");
await page.screenshot({ path: path.join(outputDir, "mobile.png"), fullPage: true });

await assertPendingReviewState("before audit completion");
check(await page.evaluate(({ legacyKey, currentKey }) => (
  localStorage.getItem(legacyKey) === null && localStorage.getItem(currentKey) === null
), { legacyKey: legacyStorageKey, currentKey: reviewStorageKey }), "audit completion leaves no automated human-review decision");
check(browserErrors.length === 0, `browser has no errors (${browserErrors.join(" | ")})`);
await browser.close();

if (failures.length > 0) {
  console.error(`audio review audit failed: ${failures.length}`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("audio review audit passed");
console.log(`asset rows: 3; audio players: ${media.length}`);
console.log(`screenshots: ${outputDir}`);
