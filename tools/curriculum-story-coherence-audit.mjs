#!/usr/bin/env node
import fs from "node:fs";

const canonicalIds = [
  "M01", "M02", "M03", "M04", "M05", "M06", "M07", "M08",
  "FG01", "FG02", "FG03", "FG04", "S01",
  "LS01", "LS02", "LS03", "LS04", "LS05", "LS06", "LS07", "LS08",
  "LP01", "LP02", "LP03", "LP04", "LP05", "LP06", "LP07", "LP08", "LP09", "LP10",
  "TH01", "TH02", "TH03", "TH04", "TH05", "TH06", "TH07", "TH08"
];

const chapterIds = {
  "docs/32_CHAPTER3_LISTENING_RUNTIME_CONTRACT.md": canonicalIds.filter((id) => id.startsWith("LS")),
  "docs/34_CHAPTER4_LOW_REGISTER_RUNTIME_CONTRACT.md": canonicalIds.filter((id) => id.startsWith("LP")),
  "docs/35_CHAPTER5_COORDINATION_RUNTIME_CONTRACT.md": canonicalIds.filter((id) => id.startsWith("TH"))
};

const canonicalDocs = [
  "docs/03_CONTENT_ROADMAP.md",
  "docs/17_STORY_ARC_AND_LEVEL_BEATS.md",
  "docs/24_HUMAN_STORY_AND_LESSON_BOOK.md",
  "docs/33_GAME_TEACHING_PACING_AND_MOTIVATION_CONTRACT.md"
];

const read = (file) => fs.readFileSync(file, "utf8");
const lessonPattern = /(?<![A-Z0-9])(?:M0[1-8]|FG0[1-4]|S01|LS0[1-8]|LP(?:0[1-9]|10)|TH0[1-8])(?![A-Z0-9])/g;
const failures = [];
let passed = 0;

function uniqueLessonIds(text) {
  return [...new Set(text.match(lessonPattern) || [])];
}

function check(label, condition, detail = "") {
  if (condition) {
    passed += 1;
    console.log(`PASS ${label}`);
  } else {
    failures.push(`${label}${detail ? `: ${detail}` : ""}`);
    console.error(`FAIL ${label}${detail ? `: ${detail}` : ""}`);
  }
}

for (const file of canonicalDocs) {
  const found = new Set(uniqueLessonIds(read(file)));
  const missing = canonicalIds.filter((id) => !found.has(id));
  check(`${file} covers all 39 canonical lessons`, missing.length === 0, `missing ${missing.join(", ")}`);
}

for (const [file, expected] of Object.entries(chapterIds)) {
  const found = new Set(uniqueLessonIds(read(file)));
  const missing = expected.filter((id) => !found.has(id));
  check(`${file} covers its complete chapter`, missing.length === 0, `missing ${missing.join(", ")}`);
}

const lessonBook = read("docs/24_HUMAN_STORY_AND_LESSON_BOOK.md");
const headings = [...lessonBook.matchAll(/^### (M0[1-8]|FG0[1-4]|S01|LS0[1-8]|LP(?:0[1-9]|10)|TH0[1-8])\s+(.+)$/gm)];
check("human lesson book has exactly 39 canonical headings", headings.length === 39, String(headings.length));
check("human lesson book headings follow canonical order", JSON.stringify(headings.map((match) => match[1])) === JSON.stringify(canonicalIds));

const malformedSections = headings.flatMap((match, index) => {
  const start = match.index;
  const end = headings[index + 1]?.index ?? lessonBook.length;
  const section = lessonBook.slice(start, end);
  const required = ["**孩子做什么**", "**真正学到什么**"];
  const hasSuccess = /\*\*[^*]*(?:答对|完成时)[^*]*\*\*/.test(section);
  const hasRepair = /\*\*[^*]*(?:错|没|忘|乱|难|帮助|累)[^*]*\*\*/.test(section);
  const missing = required.filter((heading) => !section.includes(heading));
  if (!hasSuccess) missing.push("success heading");
  if (!hasRepair) missing.push("repair heading");
  return missing.length ? [`${match[1]}: ${missing.join(", ")}`] : [];
});
check("all 39 lesson sections contain action, success, repair and learning", malformedSections.length === 0, malformedSections.join(" | "));

const voiceAudit = read("docs/93_FULL_COURSE_VOICE_RECORDING_READINESS_AUDIT.md");
const audioPlan = read("docs/108_FINAL_AUDIO_MEDIA_RELEASE_EXECUTION_PLAN.md");
check(
  "TH07 keeps the approved line and non-answer timing boundary",
  lessonBook.includes("咚咚托稳大地。花朵——等你叫醒。") &&
    lessonBook.includes("每个 TH07 小节开始前最多说一次") &&
    voiceAudit.includes("Wrong repair, replay and later TH08 together-encore do not repeat it") &&
    audioPlan.includes("TH07 固定台词为“咚咚托稳大地。花朵——等你叫醒。”") &&
    audioPlan.includes("它仍为 `teacher_gated_provisional`")
);
check(
  "voice inventory remains complete and fail-closed",
  voiceAudit.includes("| `recording_ready_unrecorded` lessons | 25 |") &&
    voiceAudit.includes("| `teacher_gated_provisional` lessons | 14 |") &&
    voiceAudit.includes("| `copy_missing` lessons | 0 |") &&
    voiceAudit.includes("| Voice authorization, recording, human listening | 0 / 0 / 0 |")
);

const packageJson = JSON.parse(read("package.json"));
check(
  "curriculum audit is a named quick gate",
  packageJson.scripts?.["check:curriculum-story"] === "node tools/curriculum-story-coherence-audit.mjs" &&
    packageJson.scripts?.["check:quick"]?.includes("npm run check:curriculum-story")
);

const protectedPattern = /奥特曼|ultraman|琴键小队长|midiprobe|keyboard_captain|com\.dashun\.midiprobe|迪士尼|disney|漫威|marvel|宝可梦|pok[eé]mon|小猪佩奇|peppa/gi;
const protectedHits = [...new Set([...canonicalDocs, ...Object.keys(chapterIds), "docs/93_FULL_COURSE_VOICE_RECORDING_READINESS_AUDIT.md"])]
  .flatMap((file) => [...read(file).matchAll(protectedPattern)].map((match) => `${file}:${match[0]}`));
check("curriculum sources contain no protected-IP or other-product markers", protectedHits.length === 0, protectedHits.join(", "));

if (failures.length) {
  console.error(`\nCurriculum/story coherence: ${passed}/${passed + failures.length} passed`);
  process.exit(1);
}

console.log(`\nCurriculum/story coherence: ${passed}/${passed} passed`);
