import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const rootUrl = process.argv[2] || "http://127.0.0.1:4173/";
const screenshotPrefix = process.argv[3] || "screenshots/input_reliability_latest";
fs.mkdirSync(path.dirname(screenshotPrefix), { recursive: true });

const checks = [];
const browserErrors = [];

function record(name, pass, details = {}) {
  checks.push({ name, pass, details });
}

function levelUrl(check) {
  const url = new URL(rootUrl);
  url.search = `?level=M08&check=${check}`;
  return url.toString();
}

async function waitReady(page) {
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 12000 });
  await page.waitForSelector("#appShell", { state: "visible", timeout: 8000 });
}

async function currentTarget(page) {
  return page.evaluate(() => Number(document.querySelector(".key.target")?.dataset.midi || NaN));
}

function installMicMock(page) {
  return page.addInitScript(() => {
    localStorage.setItem("starDinoAudioSettings", JSON.stringify({ enabled: false, volume: 0.6 }));
    const state = {
      constraints: null,
      tone: { frequency: 261.625565, amplitude: 0.09 },
      tracksStopped: 0,
      resumeCalls: 0,
      closeCalls: 0,
      contexts: 0
    };
    window.__inputReliabilityMic = state;

    const track = { stop: () => { state.tracksStopped += 1; } };
    const stream = { getTracks: () => [track] };
    Object.defineProperty(navigator, "mediaDevices", {
      configurable: true,
      value: {
        getUserMedia: async (constraints) => {
          state.constraints = constraints;
          return stream;
        }
      }
    });

    class FakeAudioContext {
      constructor() {
        this.sampleRate = 44100;
        this.state = "suspended";
        state.contexts += 1;
      }

      async resume() {
        this.state = "running";
        state.resumeCalls += 1;
      }

      createMediaStreamSource() {
        return { connect: () => {} };
      }

      createAnalyser() {
        return {
          fftSize: 2048,
          smoothingTimeConstant: 0,
          getFloatTimeDomainData(samples) {
            const { frequency, amplitude } = state.tone;
            for (let index = 0; index < samples.length; index += 1) {
              samples[index] = amplitude * Math.sin((2 * Math.PI * frequency * index) / 44100);
            }
          }
        };
      }

      close() {
        state.closeCalls += 1;
        return Promise.resolve();
      }
    }

    Object.defineProperty(window, "AudioContext", {
      configurable: true,
      writable: true,
      value: FakeAudioContext
    });
  });
}

function installMidiMock(page) {
  return page.addInitScript(() => {
    localStorage.setItem("starDinoAudioSettings", JSON.stringify({ enabled: false, volume: 0.6 }));
    const input = { onmidimessage: null };
    const access = { inputs: new Map([["mock-child-keyboard", input]]), onstatechange: null };
    window.__inputReliabilityMidi = { access, input, requestCount: 0 };
    Object.defineProperty(navigator, "requestMIDIAccess", {
      configurable: true,
      value: async () => {
        window.__inputReliabilityMidi.requestCount += 1;
        return access;
      }
    });
  });
}

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_EXECUTABLE || undefined
});

async function createPage(init) {
  const context = await browser.newContext({
    viewport: { width: 1024, height: 768 },
    deviceScaleFactor: 1
  });
  const page = await context.newPage();
  await init(page);
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) {
      browserErrors.push({ type: message.type(), text: message.text(), url: page.url() });
    }
  });
  page.on("pageerror", (error) => {
    browserErrors.push({ type: "pageerror", text: error.message, url: page.url() });
  });
  return { context, page };
}

try {
  const microphone = await createPage(installMicMock);
  const micPage = microphone.page;
  await micPage.goto(levelUrl("input-reliability-microphone"), { waitUntil: "domcontentloaded", timeout: 12000 });
  await waitReady(micPage);

  const micApi = await micPage.evaluate(() => ({
    createGate: typeof window.createMicrophoneGate,
    updateGate: typeof window.updateMicrophoneGate,
    pitch: typeof window.microphonePitchFromFrequency,
    input: typeof window.handleInput
  }));
  record(
    "microphone gate helpers are available to the runtime",
    Object.values(micApi).every((value) => value === "function"),
    micApi
  );

  const pitchContract = await micPage.evaluate(() => {
    const c4 = window.microphonePitchFromFrequency(261.625565, 0.9);
    const tooSharp = window.microphonePitchFromFrequency(261.625565 * 2 ** (50 / 1200), 0.9);
    const outsideRange = window.microphonePitchFromFrequency(440, 0.9);
    const lowConfidence = window.microphonePitchFromFrequency(261.625565, 0.3);
    return {
      c4: c4 ? { midi: c4.midi, note: c4.note.name, cents: Math.round(c4.cents) } : null,
      tooSharp,
      outsideRange,
      lowConfidence
    };
  });
  record(
    "microphone accepts only tuned C4-G4 single-note candidates",
    pitchContract.c4?.midi === 60 && pitchContract.c4?.note === "C" &&
      pitchContract.tooSharp === null && pitchContract.outsideRange === null && pitchContract.lowConfidence === null,
    pitchContract
  );

  await micPage.locator("#micButton").evaluate((button) => button.click());
  await micPage.waitForFunction(() => document.querySelector("#inputStatus")?.textContent?.includes("麦克风"), null, { timeout: 5000 });
  await micPage.waitForFunction(() => document.querySelector(".key.target")?.dataset.midi === "62", null, { timeout: 5000 });
  await micPage.waitForTimeout(900);
  const heldTone = await micPage.evaluate(() => ({
    targetMidi: Number(document.querySelector(".key.target")?.dataset.midi || NaN),
    feedbackBad: document.querySelector("#feedback")?.classList.contains("bad"),
    inputStatus: document.querySelector("#inputStatus")?.textContent,
    heardStatus: document.querySelector("#heardStatus")?.textContent,
    mic: window.__inputReliabilityMic
  }));
  record(
    "one held C4 tone advances M08 once without a duplicate wrong input",
    heldTone.targetMidi === 62 && heldTone.feedbackBad === false && heldTone.mic.resumeCalls === 1 && heldTone.mic.contexts === 1,
    heldTone
  );
  record(
    "microphone requests raw local audio without speech processing",
    heldTone.mic.constraints?.audio?.echoCancellation === false &&
      heldTone.mic.constraints?.audio?.noiseSuppression === false &&
      heldTone.mic.constraints?.audio?.autoGainControl === false,
    heldTone.mic.constraints
  );

  await micPage.evaluate(() => { window.__inputReliabilityMic.tone.amplitude = 0; });
  await micPage.waitForTimeout(260);
  await micPage.evaluate(() => {
    window.__inputReliabilityMic.tone.frequency = 293.664768;
    window.__inputReliabilityMic.tone.amplitude = 0.09;
  });
  await micPage.waitForFunction(() => document.querySelector(".key.target")?.dataset.midi === "64", null, { timeout: 5000 });
  const rearmedTone = await micPage.evaluate(() => ({
    targetMidi: Number(document.querySelector(".key.target")?.dataset.midi || NaN),
    feedbackBad: document.querySelector("#feedback")?.classList.contains("bad"),
    heardStatus: document.querySelector("#heardStatus")?.textContent
  }));
  record(
    "microphone re-arms after silence and accepts the next D4 tone once",
    rearmedTone.targetMidi === 64 && rearmedTone.feedbackBad === false,
    rearmedTone
  );
  const microphonePrivacyCopy = await micPage.evaluate(() => {
    return document.querySelector("#parentMicButton small")?.textContent?.replace(/\s+/g, " ").trim() || "";
  });
  record(
    "parent microphone copy states local-only analysis and no upload or recording",
    microphonePrivacyCopy.includes("本机") && microphonePrivacyCopy.includes("不上传") && microphonePrivacyCopy.includes("不保存"),
    { microphonePrivacyCopy }
  );
  await micPage.locator("#playParentGate").click();
  await micPage.waitForSelector("#parentModal", { state: "visible", timeout: 4000 });
  const parentMicState = await micPage.evaluate(() => ({
    inputMode: document.querySelector("#parentInputMode")?.textContent,
    heardState: document.querySelector("#parentHeardState")?.textContent,
    privacyCopy: document.querySelector("#parentMicButton small")?.textContent?.replace(/\s+/g, " ").trim() || ""
  }));
  record(
    "parent panel exposes live microphone input without child-facing assessment language",
    parentMicState.inputMode?.includes("麦克风") && parentMicState.heardState?.includes("D") && !parentMicState.heardState?.includes("Re") &&
      parentMicState.privacyCopy.includes("本机") && parentMicState.privacyCopy.includes("不上传"),
    parentMicState
  );
  const parentModalInputBoundary = await micPage.evaluate(() => {
    const targetBefore = Number(document.querySelector(".key.target")?.dataset.midi || NaN);
    window.handleInput(targetBefore, "麦克风");
    const transientEffects = [...document.querySelectorAll(
      ".key-press-label, .key-touch-ripple, .sprite-effect, .note-feedback-burst, .music-flight, .music-flight-landing, .stage-input-toast, .staff-stage-toast, .stage-confetti-effect, .staff-confetti-effect, .staff-landing-ripple, .flying-part"
    )].filter((element) => {
      const style = getComputedStyle(element);
      return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) > 0;
    }).length;
    return {
      targetBefore,
      targetAfter: Number(document.querySelector(".key.target")?.dataset.midi || NaN),
      transientEffects
    };
  });
  record(
    "parent panel clears transient feedback and blocks background game input",
    parentModalInputBoundary.targetBefore === 64 && parentModalInputBoundary.targetAfter === 64 &&
      parentModalInputBoundary.transientEffects === 0,
    parentModalInputBoundary
  );
  await micPage.screenshot({ path: `${screenshotPrefix}_microphone-parent.png`, fullPage: false });
  await micPage.locator("#parentClose").click();
  await micPage.screenshot({ path: `${screenshotPrefix}_microphone-live.png`, fullPage: false });

  await micPage.locator("#micButton").evaluate((button) => button.click());
  const stoppedMic = await micPage.evaluate(() => ({
    inputStatus: document.querySelector("#inputStatus")?.textContent,
    heardStatus: document.querySelector("#heardStatus")?.textContent,
    mic: window.__inputReliabilityMic
  }));
  record(
    "stopping microphone closes the local stream and returns to touch input",
    stoppedMic.mic.tracksStopped === 1 && stoppedMic.mic.closeCalls === 1 &&
      stoppedMic.inputStatus === "输入：屏幕琴键" && stoppedMic.heardStatus === "听到：-",
    stoppedMic
  );

  await micPage.evaluate(() => {
    window.handleInput(64, "麦克风");
    window.handleInput(65, "麦克风");
    window.handleInput(67, "麦克风");
  });
  await micPage.waitForSelector("#resultModal:not([hidden])", { timeout: 8000 });
  await micPage.evaluate(() => window.startLevelCheckReplay());
  await micPage.waitForSelector("#resultModal", { state: "hidden", timeout: 4000 });
  await micPage.waitForTimeout(120);
  await micPage.evaluate(() => {
    for (const midi of [60, 62, 64, 65, 67]) window.handleInput(midi, "麦克风");
  });
  await micPage.waitForSelector("#resultModal:not([hidden])", { timeout: 8000 });
  const experimentalEvidence = await micPage.evaluate(() => {
    const level = JSON.parse(localStorage.getItem("starDinoLearningStats") || "{}").levels?.M08 || {};
    return {
      stableCompletions: level.stableCompletions,
      lastExperimentalInput: level.lastExperimentalInput,
      microphoneInputs: level.lastInputRoutes?.["麦克风"],
      runMode: level.lastRunMode
    };
  });
  record(
    "microphone-assisted reduced-cue completion cannot create stable evidence",
    experimentalEvidence.stableCompletions === 0 && experimentalEvidence.lastExperimentalInput === true &&
      experimentalEvidence.microphoneInputs === 5 && experimentalEvidence.runMode === "check",
    experimentalEvidence
  );
  await micPage.screenshot({ path: `${screenshotPrefix}_microphone.png`, fullPage: false });
  await microphone.context.close();

  const midi = await createPage(installMidiMock);
  const midiPage = midi.page;
  await midiPage.goto(levelUrl("input-reliability-midi"), { waitUntil: "domcontentloaded", timeout: 12000 });
  await waitReady(midiPage);
  await midiPage.locator("#midiButton").evaluate((button) => button.click());
  await midiPage.waitForFunction(() => Boolean(window.__inputReliabilityMidi?.input?.onmidimessage), null, { timeout: 5000 });
  await midiPage.evaluate(() => window.__inputReliabilityMidi.input.onmidimessage({ data: [0x90, 60, 0] }));
  await midiPage.waitForTimeout(220);
  const midiOff = await currentTarget(midiPage);
  await midiPage.evaluate(() => window.__inputReliabilityMidi.input.onmidimessage({ data: [0x90, 60, 88] }));
  await midiPage.waitForFunction(() => document.querySelector(".key.target")?.dataset.midi === "62", null, { timeout: 5000 });
  await midiPage.evaluate(() => window.__inputReliabilityMidi.input.onmidimessage({ data: [0x90, 62, 90] }));
  await midiPage.waitForFunction(() => document.querySelector(".key.target")?.dataset.midi === "64", null, { timeout: 5000 });
  const midiState = await midiPage.evaluate(() => ({
    requestCount: window.__inputReliabilityMidi.requestCount,
    targetMidi: Number(document.querySelector(".key.target")?.dataset.midi || NaN),
    inputStatus: document.querySelector("#inputStatus")?.textContent,
    feedbackBad: document.querySelector("#feedback")?.classList.contains("bad")
  }));
  record(
    "MIDI ignores note-on velocity zero and accepts ordinary note-on events",
    midiOff === 60 && midiState.requestCount === 1 && midiState.targetMidi === 64 &&
      midiState.inputStatus === "输入：MIDI" && midiState.feedbackBad === false,
    { midiOff, ...midiState }
  );
  await midiPage.screenshot({ path: `${screenshotPrefix}_midi.png`, fullPage: false });
  await midi.context.close();

  record("browser console is clean", browserErrors.length === 0, { browserErrors });
} finally {
  await browser.close();
}

const failed = checks.filter((check) => !check.pass);
checks.forEach((check) => {
  console.log(`${check.pass ? "PASS" : "FAIL"} ${check.name}`);
});
console.log(`input reliability checks: ${checks.length - failed.length} passed, ${failed.length} failed`);

if (failed.length > 0) {
  console.error(JSON.stringify({ failed, browserErrors }, null, 2));
  process.exit(1);
}
