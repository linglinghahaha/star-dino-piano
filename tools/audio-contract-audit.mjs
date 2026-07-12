import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const appSource = fs.readFileSync(path.join(root, "app.js"), "utf8");
const htmlSource = fs.readFileSync(path.join(root, "index.html"), "utf8");
const failures = [];
let passed = 0;

function check(condition, name) {
  if (condition) {
    passed += 1;
    return;
  }
  failures.push(name);
}

const functionMatches = [...appSource.matchAll(/^function\s+([A-Za-z0-9_]+)\s*\(/gm)];

function functionSource(name) {
  const index = functionMatches.findIndex((match) => match[1] === name);
  if (index < 0) return "";
  const start = functionMatches[index].index;
  const end = functionMatches[index + 1]?.index ?? appSource.length;
  return appSource.slice(start, end);
}

const volumeCap = Number(appSource.match(/const AUDIO_VOLUME_CAP = ([0-9.]+);/)?.[1]);
const effectGain = Number(appSource.match(/const AUDIO_EFFECT_GAIN = ([0-9.]+);/)?.[1]);
const getSfxBusSource = functionSource("getSfxBus");
const pianoSource = functionSource("playPianoNote");
const listeningSource = functionSource("playListeningPrompt");
const correctSource = functionSource("playCorrectSound");
const wrongSource = functionSource("playWrongSound");
const victorySource = functionSource("playVictorySound");

const expectedFrequencies = {
  C: 261.625565,
  D: 293.664768,
  E: 329.627557,
  F: 349.228231,
  G: 391.995436
};

for (const [note, expected] of Object.entries(expectedFrequencies)) {
  const actual = Number(appSource.match(new RegExp(`${note}:\\s*\\{[\\s\\S]*?frequency:\\s*([0-9.]+)`))?.[1]);
  const centsError = 1200 * Math.log2(actual / expected);
  check(Number.isFinite(actual) && Math.abs(centsError) < 0.1, `${note}4 playback frequency stays within 0.1 cent of A4=440 equal temperament`);
}

check(Number.isFinite(volumeCap) && volumeCap <= 0.7, "game volume cap is at most 70%");
check(Number.isFinite(effectGain) && effectGain <= 0.4, "effect bus gain is at most 40% of note bus");
check(getSfxBusSource.includes("noteBus.connect(master)"), "note bus connects separately to master");
check(getSfxBusSource.includes("effectBus.connect(master)"), "effect bus connects separately to master");
check(pianoSource.includes('options.bus === "effect" ? effectBus : noteBus'), "piano generator supports explicit note/effect routing");
check(listeningSource.includes("playPianoNote(target.frequency"), "listening prompt plays the exact target piano frequency");
check(!listeningSource.includes("playBellPing") && !listeningSource.includes("playSoftNoiseHit"), "listening prompt contains no masking feedback layer");
check(correctSource.includes("playSoftNoiseHit"), "correct feedback uses a quiet non-teaching texture");
check(!correctSource.includes("playPianoNote") && !correctSource.includes("playBellPing"), "correct feedback does not replay a pitched answer");
check(!wrongSource.includes("playPianoNote") && !wrongSource.includes("createOscillator"), "wrong feedback has no stable teaching pitch");
check((victorySource.match(/playPianoNote\(/g) || []).length === 4, "completion motif keeps four reward notes");
check((victorySource.match(/bus: "effect"/g) || []).length === 4, "all completion motif notes use the quieter effect bus");
check(htmlSource.includes('id="parentSoundToggle"'), "parent sound toggle exists");
check(htmlSource.includes('id="parentVolumeControl"'), "parent volume control exists");
check(htmlSource.includes('max="70"'), "parent volume control exposes the 70% cap");
check(appSource.includes('const AUDIO_SETTINGS_KEY = "starDinoAudioSettings"'), "audio settings use a dedicated local preference record");
check(appSource.includes('dataset.audioMix = "note-priority"'), "runtime exposes note-priority mix state for browser verification");

console.log("audio contract audit");
console.log(`checks passed: ${passed}`);

if (failures.length > 0) {
  console.error(`checks failed: ${failures.length}`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("pass");
