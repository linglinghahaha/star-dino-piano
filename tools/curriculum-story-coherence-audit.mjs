import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const paths = {
  readme: "docs/README.md",
  roadmap: "docs/03_CONTENT_ROADMAP.md",
  wordMode: "docs/07_AG_WORD_TYPING_LATER.md",
  backlog: "docs/08_EXECUTION_BACKLOG.md",
  identity: "docs/14_NOTE_IDENTITY_MATRIX.md",
  story: "docs/17_STORY_ARC_AND_LEVEL_BEATS.md",
  historicalReview: "docs/18_CURRENT_PLANNING_REVIEW.md",
  book: "docs/24_HUMAN_STORY_AND_LESSON_BOOK.md",
  coordination: "docs/29_PROJECT_COORDINATION_AND_INDEPENDENT_AUDIT.md",
  listening: "docs/32_CHAPTER3_LISTENING_RUNTIME_CONTRACT.md",
  pacing: "docs/33_GAME_TEACHING_PACING_AND_MOTIVATION_CONTRACT.md",
  low: "docs/34_CHAPTER4_LOW_REGISTER_RUNTIME_CONTRACT.md",
  coordinationCourse: "docs/35_CHAPTER5_COORDINATION_RUNTIME_CONTRACT.md",
  artReadiness: "docs/40_CHAPTER4_5_COURSE_STORY_AND_ART_READINESS_AUDIT.md",
  app: "app.js",
  shell: "index.html"
};

const docs = Object.fromEntries(
  Object.entries(paths).map(([key, relativePath]) => [
    key,
    fs.readFileSync(path.join(root, relativePath), "utf8")
  ])
);

const canonicalIds = [
  "M01", "M02", "M03", "M04", "M05", "M06", "M07", "M08",
  "FG01", "FG02", "FG03", "FG04", "S01",
  "LS01", "LS02", "LS03", "LS04", "LS05", "LS06", "LS07", "LS08",
  "LP01", "LP02", "LP03", "LP04", "LP05", "LP06", "LP07", "LP08", "LP09", "LP10",
  "TH01", "TH02", "TH03", "TH04", "TH05", "TH06", "TH07", "TH08"
];

const lessonIdPattern = /(?<![A-Z0-9])(?:M0[1-8]|FG0[1-4]|S01|LS0[1-8]|LP(?:0[1-9]|10)|TH0[1-8])(?![A-Z0-9])/g;
const failures = [];
let passCount = 0;

function fail(message) {
  throw new Error(message);
}

function expect(condition, message) {
  if (!condition) fail(message);
}

function expectIncludes(text, snippets, label) {
  const missing = snippets.filter((snippet) => !text.includes(snippet));
  expect(missing.length === 0, `${label} missing: ${missing.join(" | ")}`);
}

function expectExcludes(text, snippets, label) {
  const present = snippets.filter((snippet) => text.includes(snippet));
  expect(present.length === 0, `${label} contains stale text: ${present.join(" | ")}`);
}

function uniqueLessonIds(text) {
  return [...new Set(text.match(lessonIdPattern) || [])];
}

function sameArray(actual, expected) {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function check(label, test) {
  try {
    test();
    passCount += 1;
    console.log(`PASS ${label}`);
  } catch (error) {
    failures.push(`${label}: ${error.message}`);
    console.error(`FAIL ${label}: ${error.message}`);
  }
}

for (const key of ["roadmap", "story", "book", "pacing"]) {
  check(`${paths[key]} covers all 39 canonical lessons`, () => {
    const actual = uniqueLessonIds(docs[key]);
    const missing = canonicalIds.filter((id) => !actual.includes(id));
    const extraCount = actual.length - canonicalIds.length;
    expect(actual.length === canonicalIds.length && missing.length === 0,
      `found ${actual.length}; missing ${missing.join(",") || "none"}; extra count ${extraCount}`);
  });
}

for (const [key, expected] of [
  ["listening", canonicalIds.filter((id) => id.startsWith("LS"))],
  ["low", canonicalIds.filter((id) => id.startsWith("LP"))],
  ["coordinationCourse", canonicalIds.filter((id) => id.startsWith("TH"))]
]) {
  check(`${paths[key]} covers its complete chapter`, () => {
    const actual = uniqueLessonIds(docs[key]);
    const missing = expected.filter((id) => !actual.includes(id));
    expect(missing.length === 0, `missing ${missing.join(",")}`);
  });
}

check("human lesson book headings follow the canonical order", () => {
  const headings = [...docs.book.matchAll(/^###\s+(M0[1-8]|FG0[1-4]|S01|LS0[1-8]|LP(?:0[1-9]|10)|TH0[1-8])\b/gm)]
    .map((match) => match[1]);
  expect(sameArray(headings, canonicalIds), `actual heading order: ${headings.join(",")}`);
});

check("all 39 human lesson sections describe action, response, repair, and learning", () => {
  const lessonHeadings = [...docs.book.matchAll(/^###\s+(M0[1-8]|FG0[1-4]|S01|LS0[1-8]|LP(?:0[1-9]|10)|TH0[1-8])\b/gm)];
  const incomplete = [];
  lessonHeadings.forEach((heading, index) => {
    const section = docs.book.slice(heading.index, lessonHeadings[index + 1]?.index ?? docs.book.length);
    const missing = [];
    if (!section.includes("**开场画面**")) missing.push("opening");
    if (!section.includes("**孩子做什么**")) missing.push("child-action");
    if (!section.includes("**真正学到什么**")) missing.push("learning");
    if (!/\*\*(?:答对时|完成时)\*\*/.test(section)) missing.push("success");
    if (!/\*\*[^*\n]*(?:答错|按错|按到另一个|没能同时|弹乱|忘记)[^*\n]*\*\*/.test(section)) missing.push("repair");
    if (missing.length) incomplete.push(`${heading[1]}:${missing.join("+")}`);
  });
  expect(incomplete.length === 0, incomplete.join(", "));
});

check("chapter names and progression remain aligned", () => {
  const names = ["月亮小家", "星星桥", "会听的小种子", "咚咚的低音星球", "会唱歌的大家园"];
  for (const key of ["roadmap", "story", "book", "pacing"]) {
    expectIncludes(docs[key], names, paths[key]);
  }
});

check("M03 remains D then C listening transfer", () => {
  expectIncludes(docs.roadmap, ["hear `Re/D`, then `Do/C`"], paths.roadmap);
  expectIncludes(docs.story, ["hear `Re/D`, then `Do/C`"], paths.story);
  expectIncludes(docs.book, ["先完整听完 D 的模型音", "随后完整听完 C 的模型音"], paths.book);
});

check("M07 and M08 keep their canonical routes", () => {
  for (const key of ["roadmap", "story", "pacing"]) {
    expectIncludes(docs[key], ["C-D-E-D-C", "C-D-E-F-G"], paths[key]);
  }
  expectIncludes(docs.book, ["依次弹 C、D、E、D、C", "依次按 C、D、E、F、G"], paths.book);
});

check("S01 keeps the six-pad staff route C-D-E-F-G-E", () => {
  const initialSequence = docs.roadmap.split("Initial sequence:")[1]?.split("Required polish:")[0] || "";
  const roadmapRoute = [...initialSequence.matchAll(/`(?:Do|Re|Mi|Fa|Sol)\/([C-G])`/g)].map((match) => match[1]);
  expect(sameArray(roadmapRoute, ["C", "D", "E", "F", "G", "E"]), `roadmap route is ${roadmapRoute.join("-")}`);
  expectIncludes(docs.story, ["`C-D-E-F-G-E`"], paths.story);
  expectIncludes(docs.book, ["依次完成 C、D、E、F、G、E"], paths.book);
});

check("LS08 keeps one guide pair and four fixed check pairs", () => {
  expectIncludes(docs.roadmap, ["`C4-D4` guide pair", "`C4-D4`, `E4-D4`, `C4-C4`, `D4-E4`"], paths.roadmap);
  expectIncludes(docs.listening, ["C-D 带路回声", "C-D、E-D、C-C、D-E"], paths.listening);
  expectIncludes(docs.book, ["`C-D` 带路回声", "`C-D`、`E-D`、`C-C`、`D-E`"], paths.book);
});

check("LP03-LP10 keep exact register-qualified music routes", () => {
  const routes = [
    "C3-D3-E3",
    "E3-D3-C3",
    "E3-F3-G3",
    "C3-G3-C3",
    "C3-D3-E3-D3-C3",
    "C3-D3-E3-F3-G3-E3"
  ];
  for (const key of ["roadmap", "low"]) {
    expectIncludes(docs[key], routes, paths[key]);
  }
  expectIncludes(docs.low, [
    "LP08 引导按 `C3-D3-E3`",
    "LP09 引导按 `E3-F3-G3`",
    "LP10 guided 和 later check 都固定为 `C3-D3-E3-F3-G3-E3`"
  ], paths.low);
});

check("Chapter 5 uses one fixed original two-bar piece", () => {
  const scoredRoutes = [
    "`C4 q, D4 q, E4 q, D4 q`",
    "`E4 q, D4 q, C4 q, C4 q`",
    "`C3 w`",
    "`G3 w`"
  ];
  expectIncludes(docs.roadmap, scoredRoutes, paths.roadmap);
  expectIncludes(docs.coordinationCourse, scoredRoutes, paths.coordinationCourse);
  expectIncludes(docs.book, [
    "| 星芽 | C | D | E | D | E | D | C | C |",
    "| 咚咚 | 低音 C，尽量保持四拍",
    "接力路线重复 TH05 的两小节；准备好的孩子重复 TH07 的合奏版"
  ], paths.book);
});

check("Chapter 5 meter and tempo are aligned and non-punitive", () => {
  expectIncludes(docs.roadmap, ["Meter is `4/4`", "`52 BPM`", "`48-56 BPM`"], paths.roadmap);
  expectIncludes(docs.coordinationCourse, ["拍号 `4/4`", "目标 52 BPM", "48-56 BPM", "不因速度失败"], paths.coordinationCourse);
  expectIncludes(docs.book, ["`4/4` 拍", "每分钟 52 拍", "48-56 BPM", "节拍不用于惩罚"], paths.book);
});

check("ordinary child surfaces use letter names and dinosaur dialogue owns solfege", () => {
  expectIncludes(docs.identity, [
    "ordinary object labels use only `C/D/E/F/G`",
    "Xingya's or Dongdong's child-facing speech and listening gestures use `Do/Re/Mi/Fa/Sol`"
  ], paths.identity);
  expectIncludes(docs.listening, ["除星芽口语/气泡外", "只显示 C/D/E/F/G", "不显示或朗读普通 `Do/C` 双标"], paths.listening);
  expectIncludes(docs.low, ["普通孩子表面、可见属性和非角色 ARIA 只使用字母音名", "唱名只出现在角色对话"], paths.low);
  expectIncludes(docs.coordinationCourse, ["只显示字母音名", "只有恐龙对话框可说 `Do/Re/Mi/Fa/Sol`"], paths.coordinationCourse);
});

check("color remains a scaffold rather than a note answer", () => {
  expectIncludes(docs.identity, ["Color is only an early scaffold", "relying on color as the answer"], paths.identity);
  expectIncludes(docs.pacing, ["是否只跟颜色/亮光", "不能把颜色或物件形状变成答案"], paths.pacing);
});

check("equipment and atmosphere continuity remain safe across chapters", () => {
  expectIncludes(docs.story, [
    "complete sealed exterior suit throughout moon-surface and S01 open-space play",
    "2-4 second automatic atmosphere-check transition opens the helmet",
    "不让无头盔角色跑到开放太空桥中央"
  ], paths.story);
  expectIncludes(docs.book, ["完整气密探索服", "头盔向后打开", "探索背带", "不把无头盔角色画在开放太空桥中央"], paths.book);
  expectIncludes(docs.listening, ["完整气密探索服", "空气检测", "头盔向后打开", "探索背带和星星背包"], paths.listening);
  expectIncludes(docs.coordinationCourse, ["星芽不无头盔返回真空月面", "不站在开放太空桥中央"], paths.coordinationCourse);
});

check("Chapter 4-5 art readiness keeps missing assets and provider gates honest", () => {
  expectIncludes(docs.artReadiness, [
    "chapter4_lp04_lp10_runtime_missing",
    "chapter5_runtime_missing",
    "provider_unverified_outputs_quarantined",
    "grok_video_hard_paused",
    "provider_unverified_rejected",
    "Grok 视频硬暂停",
    "不得生成、预检额度、重试、换号或建立新批次",
    "runtimeApproval=false / integrationAllowed=false / releaseCleared=false"
  ], paths.artReadiness);
  expectIncludes(docs.artReadiness, [
    "### A. Chapter 4 场景状态板",
    "### B. Chapter 4 教学世界状态板",
    "### C. Chapter 5 正确世界地理板",
    "### D. TH05 精确阶段板",
    "### E. 路线公平对照板"
  ], paths.artReadiness);
  expectExcludes(docs.artReadiness, ["Grok 只允许由“星龙工坊媒体候选”任务"], paths.artReadiness);
});

check("game and teaching pacing preserve short lessons and honest achievement", () => {
  expectIncludes(docs.pacing, [
    "唯一新教学轴是什么",
    "一次 3-5 分钟短课怎样走",
    "通常约 3-8 个有意义的钢琴输入",
    "每 1-2 个音乐动作就让世界前进一步",
    "永久改变世界",
    "不能变成速度得分或催促"
  ], paths.pacing);
});

check("story completion remains separate from stable and retained evidence", () => {
  expectIncludes(docs.pacing, ["故事继续不等于能力证明", "played", "stable", "retained"], paths.pacing);
  expectIncludes(docs.roadmap, ["Same-session success is immediate performance", "later-session retrieval is required"], paths.roadmap);
});

check("A-G word typing remains the explicitly locked final project", () => {
  expectIncludes(docs.readme, ["parked final optional project", "runtime-forbidden", "future supervisor explicitly dispatches"], paths.readme);
  expectIncludes(docs.wordMode, ["parked_final_project", "Chapters 1-5", "core release foundation", "future supervisor dispatch"], paths.wordMode);
  expectIncludes(docs.backlog, ["parked_final_project", "Chapters 1-5", "no unresolved core P0/P1", "future supervisor explicitly dispatches"], paths.backlog);
  expectIncludes(docs.roadmap, ["parked_final_project", "Chapters 1-5", "no unresolved core P0/P1", "future supervisor dispatch"], paths.roadmap);
  expectIncludes(docs.identity, ["Chapters 1-5", "no unresolved core P0/P1", "future supervisor dispatch explicitly reopens"], paths.identity);
  expectIncludes(docs.historicalReview, ["A-G override", "parked final optional project", "requires Chapters 1-5", "all core P0/P1"], paths.historicalReview);
  expectIncludes(docs.pacing, ["最终可选项目", "第一至第五章", "核心 P0/P1", "未来主管明确派发"], paths.pacing);
  const runtimeText = `${docs.app}\n${docs.shell}`;
  expect(!/(wordTyping|word typing|单词打字|琴键拼词)/i.test(runtimeText), "word mode leaked into runtime shell");
});

check("curriculum audit ownership is explicit and does not claim all tools", () => {
  expectIncludes(docs.readme, [
    "`tools/curriculum-story-coherence-audit.mjs`",
    "other `tools/`",
    "Its green result proves only cross-file coherence"
  ], paths.readme);
});

check("status-bearing curriculum files name the current approved browser baseline", () => {
  const match = docs.coordination.match(/最新获批浏览器教学基线为 `([^`]+)`/);
  expect(Boolean(match), "cannot derive approved baseline from docs/29");
  const baseline = match[1];
  for (const key of ["roadmap", "identity", "book", "listening", "pacing", "low"]) {
    expect(docs[key].includes(baseline), `${paths[key]} does not name ${baseline}`);
  }
});

check("obsolete implementation-status claims are absent", () => {
  expectExcludes(docs.identity, ["not current runtime targets until Chapter 4 implementation begins", "when Chapter 4 implementation starts"], paths.identity);
  expectExcludes(docs.story, ["## Future Chapter 3 Level Beats", "## Future Chapter 4 Level Beats"], paths.story);
  expectExcludes(docs.listening, ["当前 Chapter 3 运行布局尚未实现", "next_runtime_milestone", "`missing`：`LS08` 正式运行"], paths.listening);
  expectExcludes(docs.low, ["`missing`：LP01-LP10 运行"], paths.low);
});

check("Chapter 5 automatic gate list is consecutively numbered", () => {
  const section = docs.coordinationCourse.split("## 十一、必须自动验证的门禁")[1]?.split("## 十二、人工和真机证据")[0] || "";
  const numbers = [...section.matchAll(/^(\d+)\.\s/gm)].map((match) => Number(match[1]));
  const expected = Array.from({ length: 30 }, (_, index) => index + 1);
  expect(sameArray(numbers, expected), `gate numbers are ${numbers.join(",")}`);
});

check("curriculum sources contain no protected-IP or other-product markers", () => {
  const protectedPattern = /奥特曼|ultraman|琴键小队长|midiprobe|keyboard_captain|com\.dashun\.midiprobe|迪士尼|disney|漫威|marvel|宝可梦|pok[eé]mon|小猪佩奇|peppa/gi;
  const curriculumKeys = ["readme", "roadmap", "wordMode", "backlog", "identity", "story", "historicalReview", "book", "listening", "pacing", "low", "coordinationCourse", "artReadiness"];
  const hits = [];
  for (const key of curriculumKeys) {
    for (const match of docs[key].matchAll(protectedPattern)) hits.push(`${paths[key]}:${match[0]}`);
  }
  expect(hits.length === 0, hits.join(", "));
});

console.log(`\nCurriculum/story coherence: ${passCount}/${passCount + failures.length} passed`);

if (failures.length > 0) {
  console.error("\nFailures:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
}
