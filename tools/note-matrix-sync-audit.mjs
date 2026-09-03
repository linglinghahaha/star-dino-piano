#!/usr/bin/env node

import fs from "node:fs";
import vm from "node:vm";

const appSource = fs.readFileSync("app.js", "utf8");
const docSource = fs.readFileSync("docs/14_NOTE_IDENTITY_MATRIX.md", "utf8");
const staffReferenceRequirements = {
  "docs/03_CONTENT_ROADMAP.md": [
    "guided `C3` second space -> `D3` third line -> `E3` third space",
    "F3 fourth line and G3 fourth space",
    "bass-staff second-space `C3`, then treble-staff ledger-line-below `C4`"
  ],
  "docs/24_HUMAN_STORY_AND_LESSON_BOOK.md": [
    "C 脚印先落进低音谱表第二间，D 再落到第三线，E 最后落到第三间",
    "F 在第四线",
    "G 在第四间",
    "高音谱表下加一线的中央 C"
  ],
  "docs/34_CHAPTER4_LOW_REGISTER_RUNTIME_CONTRACT.md": [
    "| `C3 / 低音 Do` | 48 | 第二间 | 两黑左 |",
    "| `D3 / 低音 Re` | 50 | 第三线/中间线 | 两黑中 |",
    "| `E3 / 低音 Mi` | 52 | 第三间 | 两黑右 |",
    "| `F3 / 低音 Fa` | 53 | 第四线 | 三黑左 |",
    "| `G3 / 低音 Sol` | 55 | 第四间 | 三黑第一、第二之间 |",
    "LP08+ 低音谱表仍未实现、未验证"
  ],
  "docs/35_CHAPTER5_COORDINATION_RUNTIME_CONTRACT.md": [
    "bass-staff second-space `C3/48`",
    "treble-staff ledger-line-below `C4/60`"
  ],
  "docs/57_SOUND_TO_STAFF_CROSS_REPRESENTATION_LESSON_SPEC.md": [
    "| `C` | `Do` | 下加一线 |",
    "| `D` | `Re` | 下加一间",
    "| `E` | `Mi` | 第一线 |"
  ],
  "docs/68_CHAPTER5_TH03_TH04_SUPERVISOR_ACCEPTANCE_CHECKLIST.md": [
    "低音谱表第二间",
    "高音谱表下加一线",
    "C3 bass second space 与 C4 treble ledger line below"
  ],
  "docs/29_PROJECT_COORDINATION_AND_INDEPENDENT_AUDIT.md": [
    "treble_c4_g4_runtime_geometry_passed_browser",
    "bass_c3_g3_theory_and_contract_passed_runtime_missing",
    "docs/110_STAFF_POSITION_CANONICAL_AUDIT.md"
  ]
};
const staffAuditPath = "docs/110_STAFF_POSITION_CANONICAL_AUDIT.md";

const expected = {
  C: {
    solfege: "Do",
    midi: 60,
    locator: "两黑键左边",
    keyShort: "2黑左",
    staffPosition: "下加一线",
    color: "#CB84FA",
    courseStatus: "core",
    docLocator: "two-black left",
    docStaff: "ledger line below staff"
  },
  D: {
    solfege: "Re",
    midi: 62,
    locator: "两黑键中间",
    keyShort: "2黑中",
    staffPosition: "下加一间",
    color: "#FB9608",
    courseStatus: "core",
    docLocator: "two-black middle",
    docStaff: "space below staff"
  },
  E: {
    solfege: "Mi",
    midi: 64,
    locator: "两黑键右边",
    keyShort: "2黑右",
    staffPosition: "第一线",
    color: "#62C60C",
    courseStatus: "core",
    docLocator: "two-black right",
    docStaff: "first line"
  },
  F: {
    solfege: "Fa",
    midi: 65,
    locator: "三黑键左边",
    keyShort: "3黑左",
    staffPosition: "第一间",
    color: "#CC338D",
    courseStatus: "core",
    docLocator: "three-black left",
    docStaff: "first space"
  },
  G: {
    solfege: "Sol",
    midi: 67,
    locator: "三黑键左中",
    keyShort: "3黑左中",
    staffPosition: "第二线",
    color: "#6F8FFE",
    courseStatus: "core",
    docLocator: "three-black left-middle",
    docStaff: "second line"
  }
};

const expectedLowRegister = {
  C3: {
    childLabel: "低音 C",
    midi: 48,
    frequency: 130.81,
    locator: "lower two-black left",
    staffPosition: "second space"
  },
  D3: {
    childLabel: "低音 D",
    midi: 50,
    frequency: 146.83,
    locator: "lower two-black middle",
    staffPosition: "third line (middle line)"
  },
  E3: {
    childLabel: "低音 E",
    midi: 52,
    frequency: 164.81,
    locator: "lower two-black right",
    staffPosition: "third space"
  },
  F3: {
    childLabel: "低音 F",
    midi: 53,
    frequency: 174.61,
    locator: "lower three-black left",
    staffPosition: "fourth line"
  },
  G3: {
    childLabel: "低音 G",
    midi: 55,
    frequency: 196.0,
    locator: "lower three-black left-middle",
    staffPosition: "fourth space"
  }
};

const pitchClassSemitones = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const diatonicLetters = ["C", "D", "E", "F", "G", "A", "B"];

function parsePitch(pitch) {
  const match = /^([A-G])(\d+)$/.exec(pitch);
  if (!match) throw new Error(`Invalid pitch ${pitch}`);
  return { letter: match[1], octave: Number(match[2]) };
}

function midiForPitch(pitch) {
  const { letter, octave } = parsePitch(pitch);
  return 12 * (octave + 1) + pitchClassSemitones[letter];
}

function diatonicIndex(pitch) {
  const { letter, octave } = parsePitch(pitch);
  return octave * 7 + diatonicLetters.indexOf(letter);
}

function ordinal(value) {
  return ["zeroth", "first", "second", "third", "fourth", "fifth"][value] || `${value}th`;
}

function staffPositionForPitch(clef, pitch) {
  const bottomLine = clef === "treble" ? "E4" : clef === "bass" ? "G2" : null;
  if (!bottomLine) throw new Error(`Unsupported clef ${clef}`);
  const step = diatonicIndex(pitch) - diatonicIndex(bottomLine);
  if (step % 2 === 0) {
    const line = step / 2 + 1;
    if (line === 0) return "ledger line below staff";
    return `${ordinal(line)} line`;
  }
  const space = (step + 1) / 2;
  if (space === 0) return "space below staff";
  return `${ordinal(space)} space`;
}

function findLiteralEnd(source, start) {
  const open = source[start];
  const close = open === "{" ? "}" : open === "[" ? "]" : null;
  if (!close) throw new Error(`Expected object or array literal at offset ${start}`);

  let depth = 0;
  let quote = "";
  let escaped = false;
  let lineComment = false;
  let blockComment = false;

  for (let i = start; i < source.length; i += 1) {
    const ch = source[i];
    const next = source[i + 1];

    if (lineComment) {
      if (ch === "\n") lineComment = false;
      continue;
    }

    if (blockComment) {
      if (ch === "*" && next === "/") {
        blockComment = false;
        i += 1;
      }
      continue;
    }

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === quote) {
        quote = "";
      }
      continue;
    }

    if (ch === "/" && next === "/") {
      lineComment = true;
      i += 1;
      continue;
    }

    if (ch === "/" && next === "*") {
      blockComment = true;
      i += 1;
      continue;
    }

    if (ch === "\"" || ch === "'" || ch === "`") {
      quote = ch;
      continue;
    }

    if (ch === open) depth += 1;
    if (ch === close) {
      depth -= 1;
      if (depth === 0) return i + 1;
    }
  }

  throw new Error("Could not find literal end");
}

function extractConstLiteral(source, name) {
  const marker = `const ${name} =`;
  const markerIndex = source.indexOf(marker);
  if (markerIndex < 0) throw new Error(`Missing ${marker}`);
  let start = markerIndex + marker.length;
  while (/\s/.test(source[start])) start += 1;
  const end = findLiteralEnd(source, start);
  return source.slice(start, end);
}

function parseLiteral(name) {
  const literal = extractConstLiteral(appSource, name);
  return vm.runInNewContext(`(${literal})`, Object.create(null), { timeout: 1000 });
}

function parseDocRows() {
  const rows = new Map();
  for (const line of docSource.split(/\r?\n/)) {
    if (!/^\|\s*[A-G]\s*\|/.test(line)) continue;
    const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
    const [letter, solfege, midi, locator, staffPosition] = cells;
    rows.set(letter, { letter, solfege, midi: Number(midi), locator, staffPosition });
  }
  return rows;
}

function parseLowRegisterDocRows() {
  const rows = new Map();
  for (const line of docSource.split(/\r?\n/)) {
    if (!/^\|\s*[C-G]3\s*\|/.test(line)) continue;
    const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
    const [pitch, childLabel, midiAndFrequency, locator, staffPosition] = cells;
    const [midi, frequency] = midiAndFrequency.replaceAll("`", "").split("/").map((value) => Number(value.trim()));
    rows.set(pitch, { pitch, childLabel, midi, frequency, locator, staffPosition });
  }
  return rows;
}

const matrix = parseLiteral("noteIdentityMatrix");
const levels = parseLiteral("levels");
const staffCourse = parseLiteral("staffCourse");
const chapter4Config = parseLiteral("chapter4Config");
const preschoolSessionBundles = parseLiteral("preschoolSessionBundles");
const docRows = parseDocRows();
const lowRegisterDocRows = parseLowRegisterDocRows();
const issues = [];

function requireSameArray(actual, expectedRows, label) {
  if (actual.length !== expectedRows.length || actual.some((value, index) => value !== expectedRows[index])) {
    issues.push(`${label}: expected ${expectedRows.join(",")}, got ${actual.join(",")}`);
  }
}

function requireFragments(filePath, fragments) {
  if (!fs.existsSync(filePath)) {
    issues.push(`missing staff reference ${filePath}`);
    return;
  }
  const source = fs.readFileSync(filePath, "utf8");
  for (const fragment of fragments) {
    if (!source.includes(fragment)) issues.push(`${filePath} missing staff fact: ${fragment}`);
  }
}

for (const [letter, expectedRow] of Object.entries(expected)) {
  const runtime = matrix[letter];
  const doc = docRows.get(letter);

  if (!runtime) {
    issues.push(`runtime matrix missing ${letter}`);
    continue;
  }
  if (!doc) {
    issues.push(`docs/14 locked mapping missing ${letter}`);
    continue;
  }

  for (const field of ["solfege", "midi", "locator", "keyShort", "staffPosition", "color", "courseStatus"]) {
    if (runtime[field] !== expectedRow[field]) {
      issues.push(`${letter} runtime ${field}: expected ${expectedRow[field]}, got ${runtime[field]}`);
    }
  }

  if (doc.solfege !== expectedRow.solfege) {
    issues.push(`${letter} doc solfege: expected ${expectedRow.solfege}, got ${doc.solfege}`);
  }
  if (doc.midi !== expectedRow.midi) {
    issues.push(`${letter} doc MIDI: expected ${expectedRow.midi}, got ${doc.midi}`);
  }
  if (doc.locator !== expectedRow.docLocator) {
    issues.push(`${letter} doc locator: expected ${expectedRow.docLocator}, got ${doc.locator}`);
  }
  if (doc.staffPosition !== expectedRow.docStaff) {
    issues.push(`${letter} doc staff position: expected ${expectedRow.docStaff}, got ${doc.staffPosition}`);
  }
}

for (const [filePath, fragments] of Object.entries(staffReferenceRequirements)) {
  requireFragments(filePath, fragments);
}

requireFragments(staffAuditPath, [
  "treble_c4_g4_runtime_geometry_passed_browser",
  "bass_c3_g3_theory_and_contract_passed_runtime_missing",
  "C4 | 高音谱表 | 下加一线",
  "D4 | 高音谱表 | 下加一间",
  "E4 | 高音谱表 | 第一线",
  "F4 | 高音谱表 | 第一间",
  "G4 | 高音谱表 | 第二线",
  "C3 | 低音谱表 | 第二间",
  "D3 | 低音谱表 | 第三线（中间线）",
  "E3 | 低音谱表 | 第三间",
  "F3 | 低音谱表 | 第四线",
  "G3 | 低音谱表 | 第四间",
  "LP08-LP10 的低音谱表运行实现仍为 missing"
]);

requireFragments("docs/README.md", [
  "`110_STAFF_POSITION_CANONICAL_AUDIT.md`",
  "高音 C4-G4 浏览器几何",
  "低音 C3-G3 规格"
]);

for (const [pitch, expectedRow] of Object.entries(expectedLowRegister)) {
  const doc = lowRegisterDocRows.get(pitch);
  if (!doc) {
    issues.push(`docs/14 low-register mapping missing ${pitch}`);
    continue;
  }
  if (doc.childLabel !== expectedRow.childLabel) {
    issues.push(`${pitch} doc child label: expected ${expectedRow.childLabel}, got ${doc.childLabel}`);
  }
  if (doc.midi !== expectedRow.midi || midiForPitch(pitch) !== expectedRow.midi) {
    issues.push(`${pitch} MIDI: expected ${expectedRow.midi}, got ${doc.midi}`);
  }
  if (Math.abs(doc.frequency - expectedRow.frequency) > 0.01) {
    issues.push(`${pitch} frequency: expected ${expectedRow.frequency}, got ${doc.frequency}`);
  }
  if (doc.locator !== expectedRow.locator) {
    issues.push(`${pitch} doc locator: expected ${expectedRow.locator}, got ${doc.locator}`);
  }
  if (doc.staffPosition !== expectedRow.staffPosition) {
    issues.push(`${pitch} doc staff position: expected ${expectedRow.staffPosition}, got ${doc.staffPosition}`);
  }
  const derivedStaffPosition = staffPositionForPitch("bass", pitch);
  const normalizedExpected = expectedRow.staffPosition.replace(" (middle line)", "");
  if (derivedStaffPosition !== normalizedExpected) {
    issues.push(`${pitch} derived bass-staff position: expected ${normalizedExpected}, got ${derivedStaffPosition}`);
  }
}

for (const [letter, expectedRow] of Object.entries(expected)) {
  const pitch = `${letter}4`;
  if (midiForPitch(pitch) !== expectedRow.midi) {
    issues.push(`${pitch} derived MIDI: expected ${expectedRow.midi}, got ${midiForPitch(pitch)}`);
  }
  if (staffPositionForPitch("treble", pitch) !== expectedRow.docStaff) {
    issues.push(`${pitch} derived treble-staff position: expected ${expectedRow.docStaff}, got ${staffPositionForPitch("treble", pitch)}`);
  }
}

const reservedColors = { A: "#F78ACD", B: "#11D19E" };

for (const letter of ["A", "B"]) {
  const runtime = matrix[letter];
  if (!runtime) {
    issues.push(`runtime matrix missing reserved note ${letter}`);
    continue;
  }
  if (runtime.courseStatus !== "reserved") {
    issues.push(`${letter} must remain reserved, got ${runtime.courseStatus}`);
  }
  if (runtime.staffPosition || runtime.staffShort) {
    issues.push(`${letter} reserved row should not define first-course staff positions`);
  }
  if (runtime.color !== reservedColors[letter]) {
    issues.push(`${letter} runtime color: expected ${reservedColors[letter]}, got ${runtime.color}`);
  }
}

const noteByMidi = new Map(Object.entries(matrix).map(([letter, row]) => [row.midi, { letter, ...row }]));
const targetRows = [];

for (const level of levels) {
  for (const part of level.parts || []) {
    targetRows.push({ source: level.id, midi: part.midi, color: part.color });
  }
}

for (const [index, step] of (staffCourse.steps || []).entries()) {
  targetRows.push({ source: `${staffCourse.id}:${index + 1}`, midi: step.midi });
}

for (const target of targetRows) {
  const note = noteByMidi.get(target.midi);
  if (!note) {
    issues.push(`${target.source} targets unknown MIDI ${target.midi}`);
  } else if (note.courseStatus === "reserved") {
    issues.push(`${target.source} targets reserved note ${note.letter}`);
  } else if (target.color && target.color !== note.color) {
    issues.push(`${target.source} color mismatch for ${note.letter}: expected ${note.color}, got ${target.color}`);
  }
}

requireSameArray(chapter4Config.lp01.candidates, [48, 60], "LP01 high-low C route");
if (chapter4Config.lp02.targetMidi !== 48) {
  issues.push(`LP02 low-C target: expected 48, got ${chapter4Config.lp02.targetMidi}`);
}
requireSameArray(
  chapter4Config.lp03.steps.map((step) => step.midi),
  [48, 50, 52],
  "LP03 low-register foundation route"
);
requireSameArray(
  chapter4Config.lp04.steps.map((step) => step.midi),
  [52, 50, 48],
  "LP04 descending echo route"
);
requireSameArray(
  chapter4Config.lp03.actionIds,
  ["LP03-c-awake", "LP03-d-place", "LP03-e-place"],
  "LP03 configured action IDs"
);
requireSameArray(
  chapter4Config.lp03.steps.map((step) => step.id),
  ["C", "D", "E"],
  "LP03 configured step letters"
);
requireSameArray(
  chapter4Config.lp04.actionIds,
  ["LP04-e-echo", "LP04-d-echo", "LP04-c-echo"],
  "LP04 configured action IDs"
);
requireSameArray(
  chapter4Config.lp04.steps.map((step) => step.id),
  ["E", "D", "C"],
  "LP04 configured step letters"
);

const chapter4BundleExpectations = {
  "C4-01": {
    actionIds: ["LP01-register-listening", "LP02-low-c-home"],
    targetIds: ["LP01", "LP02"]
  },
  "C4-02": {
    actionIds: ["LP03-c-awake", "LP03-d-place", "LP03-e-place"],
    targetIds: ["LP03", "LP03", "LP03"],
    stepField: "lp03Step",
    steps: ["C", "D", "E"]
  },
  "C4-03": {
    actionIds: ["LP04-e-echo", "LP04-d-echo", "LP04-c-echo"],
    targetIds: ["LP04", "LP04", "LP04"],
    stepField: "lp04Step",
    steps: ["E", "D", "C"]
  }
};

for (const [bundleId, expectedBundle] of Object.entries(chapter4BundleExpectations)) {
  const bundle = preschoolSessionBundles.find((candidate) => candidate.bundleId === bundleId);
  if (!bundle) {
    issues.push(`runtime session bundle missing ${bundleId}`);
    continue;
  }
  requireSameArray(bundle.actions.map((action) => action.actionId), expectedBundle.actionIds,
    `${bundleId} runtime action IDs`);
  requireSameArray(bundle.actions.map((action) => action.targetId), expectedBundle.targetIds,
    `${bundleId} runtime target IDs`);
  if (expectedBundle.stepField) {
    requireSameArray(bundle.actions.map((action) => action[expectedBundle.stepField]), expectedBundle.steps,
      `${bundleId} runtime step letters`);
  }
}

const currentRuntimeBundleText = JSON.stringify(preschoolSessionBundles);
const futureLessonIds = [
  "LP05", "LP06", "LP07", "LP08", "LP09", "LP10",
  "TH01", "TH02", "TH03", "TH04", "TH05", "TH06", "TH07", "TH08"
];
const leakedFutureLessonIds = futureLessonIds.filter((id) => currentRuntimeBundleText.includes(`\"${id}\"`));
if (leakedFutureLessonIds.length) {
  issues.push(`future lesson IDs leaked into current runtime bundles: ${leakedFutureLessonIds.join(",")}`);
}
const leakedTeacherGatedIds = ["C3-X01", "NP-CDE", "NP-FG"]
  .filter((id) => currentRuntimeBundleText.includes(id));
if (leakedTeacherGatedIds.length) {
  issues.push(`teacher-gated IDs leaked into current runtime bundles: ${leakedTeacherGatedIds.join(",")}`);
}

if (issues.length) {
  console.error("note matrix sync audit");
  for (const issue of issues) console.error(`FAIL ${issue}`);
  process.exit(1);
}

console.log("note matrix sync audit");
console.log(`core rows checked: ${Object.keys(expected).length}`);
console.log(`low-register rows checked: ${Object.keys(expectedLowRegister).length}`);
console.log(`staff reference files checked: ${Object.keys(staffReferenceRequirements).length + 2}`);
console.log(`reserved rows checked: 2`);
console.log("A-G palette checked: 7");
console.log(`level/staff targets checked: ${targetRows.length}`);
console.log("Chapter 4 runtime routes checked: LP01-LP04 / C4-01-C4-03");
console.log("future runtime lesson targets rejected: 14 + 3 teacher-gated inserts");
console.log("pass");
