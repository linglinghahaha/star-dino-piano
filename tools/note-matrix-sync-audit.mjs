#!/usr/bin/env node

import fs from "node:fs";
import vm from "node:vm";

const appSource = fs.readFileSync("app.js", "utf8");
const docSource = fs.readFileSync("docs/14_NOTE_IDENTITY_MATRIX.md", "utf8");

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
    staffPosition: "谱线下面",
    color: "#FB9608",
    courseStatus: "core",
    docLocator: "two-black middle",
    docStaff: "below staff"
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

const matrix = parseLiteral("noteIdentityMatrix");
const levels = parseLiteral("levels");
const staffCourse = parseLiteral("staffCourse");
const docRows = parseDocRows();
const issues = [];

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

if (issues.length) {
  console.error("note matrix sync audit");
  for (const issue of issues) console.error(`FAIL ${issue}`);
  process.exit(1);
}

console.log("note matrix sync audit");
console.log(`core rows checked: ${Object.keys(expected).length}`);
console.log(`reserved rows checked: 2`);
console.log("A-G palette checked: 7");
console.log(`level/staff targets checked: ${targetRows.length}`);
console.log("pass");
