// User-approved A-G visual cycle: C purple, D orange, E green, F magenta, G blue, A pink, B teal.
const noteIdentityMatrix = {
  C: {
    solfege: "Do",
    midi: 60,
    frequency: 261.63,
    dino: "星芽",
    color: "#CB84FA",
    locator: "两黑键左边",
    keyShort: "2黑左",
    staffPosition: "下加一线",
    staffShort: "下方小线",
    storyRole: "第一块地板 / 起点跳台",
    block: "基地地板",
    courseStatus: "core",
    colorRole: "早期脚手架",
    commonConfusion: "D",
    repairFocus: "比较两黑键左边和中间"
  },
  D: {
    solfege: "Re",
    midi: 62,
    frequency: 293.66,
    dino: "星芽",
    color: "#FB9608",
    locator: "两黑键中间",
    keyShort: "2黑中",
    staffPosition: "谱线下面",
    staffShort: "线下面",
    storyRole: "车轮 / 中间小灯",
    block: "车轮",
    courseStatus: "core",
    colorRole: "早期脚手架",
    commonConfusion: "C/E",
    repairFocus: "看它夹在 Do 和 Mi 中间"
  },
  E: {
    solfege: "Mi",
    midi: 64,
    frequency: 329.63,
    dino: "星芽",
    color: "#62C60C",
    locator: "两黑键右边",
    keyShort: "2黑右",
    staffPosition: "第一线",
    staffShort: "第一线",
    storyRole: "灯 / 低星",
    block: "长桥",
    courseStatus: "core",
    colorRole: "早期脚手架",
    commonConfusion: "D/F",
    repairFocus: "比较两黑键右边和三黑键左边"
  },
  F: {
    solfege: "Fa",
    midi: 65,
    frequency: 349.23,
    dino: "星芽",
    color: "#CC338D",
    locator: "三黑键左边",
    keyShort: "3黑左",
    staffPosition: "第一间",
    staffShort: "第一间",
    storyRole: "登陆垫",
    block: "机翼",
    courseStatus: "core",
    colorRole: "早期脚手架",
    commonConfusion: "E/G",
    repairFocus: "看它是三黑键前的第一个白键"
  },
  G: {
    solfege: "Sol",
    midi: 67,
    frequency: 392.0,
    dino: "星芽",
    color: "#6F8FFE",
    locator: "三黑键左中",
    keyShort: "3黑左中",
    staffPosition: "第二线",
    staffShort: "第二线",
    storyRole: "星门",
    block: "防护盾",
    courseStatus: "core",
    colorRole: "早期脚手架",
    commonConfusion: "F/C大跳",
    repairFocus: "比较三黑键左边和左中"
  },
  A: {
    solfege: "La",
    midi: 69,
    frequency: 440.0,
    dino: "星芽",
    color: "#F78ACD",
    locator: "三黑键正中",
    keyShort: "3黑中",
    staffPosition: "",
    staffShort: "",
    storyRole: "后续扩展",
    block: "星星灯",
    courseStatus: "reserved",
    colorRole: "后续脚手架",
    commonConfusion: "",
    repairFocus: "后续章节再定义"
  },
  B: {
    solfege: "Si",
    midi: 71,
    frequency: 493.88,
    dino: "星芽",
    color: "#11D19E",
    locator: "三黑键右边",
    keyShort: "3黑右",
    staffPosition: "",
    staffShort: "",
    storyRole: "后续扩展",
    block: "屋顶板",
    courseStatus: "reserved",
    colorRole: "后续脚手架",
    commonConfusion: "",
    repairFocus: "后续章节再定义"
  }
};

const notes = Object.entries(noteIdentityMatrix).map(([name, identity]) => ({ name, ...identity }));

function isReservedNote(note) {
  return note?.courseStatus === "reserved";
}

const levels = [
  {
    id: "M01",
    scene: "floor",
    phase: "explore",
    focus: ["C"],
    concepts: ["solfege", "letter", "keyboard-locator"],
    scaffold: "strong",
    title: "第一块月亮地板",
    storyNeed: "星芽脚下还空着，需要第一块地板。",
    prompt: "找 C，把第一块地板落下来。",
    reward: "月亮地板",
    parts: [{ midi: 60, label: "C 地板", colorName: "星紫", color: "#CB84FA", shape: "floor", action: "铺上" }]
  },
  {
    id: "M02",
    scene: "lights",
    phase: "follow",
    focus: ["C", "D", "E"],
    concepts: ["solfege", "letter", "keyboard-locator"],
    scaffold: "strong",
    title: "三颗小灯醒醒",
    storyNeed: "小屋墙上的三颗灯睡着了。",
    prompt: "按 C-D-E，叫醒三颗小灯。",
    reward: "醒来的小灯",
    parts: [
      { midi: 60, label: "C 小灯", colorName: "星紫", color: "#CB84FA", shape: "light", action: "点亮" },
      { midi: 62, label: "D 小灯", colorName: "亮橙", color: "#FB9608", shape: "light", action: "点亮" },
      { midi: 64, label: "E 小灯", colorName: "嫩绿", color: "#62C60C", shape: "light", action: "点亮" }
    ]
  },
  {
    id: "M03",
    scene: "wheel",
    phase: "listen",
    focus: ["D", "C"],
    concepts: ["heard-sound", "letter", "keyboard-locator"],
    scaffold: "listen",
    title: "会唱小车轮",
    storyNeed: "月亮小车的轮子会唱两声。",
    prompt: "先听声音，再找同样的琴键。",
    reward: "会唱小车轮",
    parts: [
      { midi: 62, label: "D 车轮", colorName: "亮橙", color: "#FB9608", shape: "wheel", action: "听一听" },
      { midi: 60, label: "C 回声", colorName: "星紫", color: "#CB84FA", shape: "wheel", action: "找回声" }
    ]
  },
  {
    id: "M04",
    scene: "bridge",
    phase: "follow",
    focus: ["C", "D", "E"],
    concepts: ["solfege", "letter", "keyboard-direction"],
    scaffold: "medium",
    title: "咔哒小桥",
    storyNeed: "门口缺三块短桥板。",
    prompt: "按 C-D-E，从左到右接上小桥。",
    reward: "咔哒小桥",
    parts: [
      { midi: 60, label: "C 桥板", colorName: "星紫", color: "#CB84FA", shape: "bridge", action: "接上" },
      { midi: 62, label: "D 桥板", colorName: "亮橙", color: "#FB9608", shape: "bridge", action: "接上" },
      { midi: 64, label: "E 桥板", colorName: "嫩绿", color: "#62C60C", shape: "bridge", action: "接上" }
    ]
  },
  {
    id: "M05",
    scene: "rocket",
    phase: "direction",
    focus: ["E", "D", "C"],
    concepts: ["descending", "keyboard-direction"],
    scaffold: "medium",
    title: "火箭倒数灯",
    storyNeed: "小火箭要从高到低倒数。",
    prompt: "按 E-D-C，让倒数灯往下亮。",
    reward: "火箭倒数灯",
    parts: [
      { midi: 64, label: "E 倒数灯", colorName: "嫩绿", color: "#62C60C", shape: "light", action: "点亮" },
      { midi: 62, label: "D 倒数灯", colorName: "亮橙", color: "#FB9608", shape: "light", action: "点亮" },
      { midi: 60, label: "C 倒数灯", colorName: "星紫", color: "#CB84FA", shape: "light", action: "点亮" }
    ]
  },
  {
    id: "M06",
    scene: "wall",
    phase: "leap",
    focus: ["C", "G"],
    concepts: ["keyboard-locator", "interval-leap"],
    scaffold: "medium",
    title: "大跳墙",
    storyNeed: "高墙太远，需要一个大跳音。",
    prompt: "按 C-G-C，让墙板一块块立起来。",
    reward: "大跳墙",
    parts: [
      { midi: 60, label: "C 起跳墙", colorName: "星紫", color: "#CB84FA", shape: "wall", action: "立起" },
      { midi: 67, label: "G 高墙", colorName: "星蓝", color: "#6F8FFE", shape: "wall", action: "立起" },
      { midi: 60, label: "C 回家墙", colorName: "星紫", color: "#CB84FA", shape: "wall", action: "立起" }
    ]
  },
  {
    id: "M07",
    scene: "stars",
    phase: "check",
    focus: ["C", "D", "E"],
    concepts: ["memory", "solfege", "keyboard-locator"],
    scaffold: "light",
    title: "星星记忆串",
    storyNeed: "星芽想把五颗星灯按顺序挂好。",
    prompt: "少看提示，按 C-D-E-D-C。",
    reward: "星星灯串",
    parts: [
      { midi: 60, label: "C 星灯", colorName: "星紫", color: "#CB84FA", shape: "star", action: "点亮" },
      { midi: 62, label: "D 星灯", colorName: "亮橙", color: "#FB9608", shape: "star", action: "点亮" },
      { midi: 64, label: "E 星灯", colorName: "嫩绿", color: "#62C60C", shape: "star", action: "点亮" },
      { midi: 62, label: "D 星灯", colorName: "亮橙", color: "#FB9608", shape: "star", action: "点亮" },
      { midi: 60, label: "C 星灯", colorName: "星紫", color: "#CB84FA", shape: "star", action: "点亮" }
    ]
  },
  {
    id: "M08",
    scene: "roof",
    phase: "climb",
    focus: ["C", "D", "E", "F", "G"],
    concepts: ["five-note-scale", "keyboard-locator"],
    scaffold: "medium",
    title: "合上月亮屋顶",
    storyNeed: "屋顶要沿着五个音一步步爬上去。",
    prompt: "按 C-D-E-F-G，合上月亮屋顶。",
    reward: "月亮屋顶",
    parts: [
      { midi: 60, label: "C 屋顶", colorName: "星紫", color: "#CB84FA", shape: "roof", action: "盖上" },
      { midi: 62, label: "D 屋顶", colorName: "亮橙", color: "#FB9608", shape: "roof", action: "盖上" },
      { midi: 64, label: "E 屋顶", colorName: "嫩绿", color: "#62C60C", shape: "roof", action: "盖上" },
      { midi: 65, label: "F 屋顶", colorName: "洋红", color: "#CC338D", shape: "roof", action: "盖上" },
      { midi: 67, label: "G 屋顶", colorName: "星蓝", color: "#6F8FFE", shape: "roof", action: "盖上" }
    ]
  },
  {
    id: "FG01",
    scene: "bridge",
    phase: "match",
    focus: ["F"],
    concepts: ["letter", "keyboard-locator"],
    scaffold: "medium",
    title: "F 落脚垫",
    storyNeed: "新桥缺第一块三黑键旁的垫子。",
    prompt: "找 F，在三黑键左边放落脚垫。",
    reward: "F 登陆垫",
    parts: [{ midi: 65, label: "F 落脚垫", colorName: "洋红", color: "#CC338D", shape: "bridge", action: "放好" }]
  },
  {
    id: "FG02",
    scene: "wall",
    phase: "match",
    focus: ["G"],
    concepts: ["letter", "keyboard-locator"],
    scaffold: "medium",
    title: "G 星门",
    storyNeed: "星门需要三黑键旁的第二个声音。",
    prompt: "找 G，在三黑键左中打开星门。",
    reward: "G 星门",
    parts: [{ midi: 67, label: "G 星门", colorName: "星蓝", color: "#6F8FFE", shape: "wall", action: "打开" }]
  },
  {
    id: "FG03",
    scene: "stars",
    phase: "check",
    focus: ["E", "F", "G"],
    concepts: ["memory", "keyboard-locator"],
    scaffold: "light",
    title: "三颗近邻星",
    storyNeed: "三颗近邻星要排成小梯子。",
    prompt: "分清 E-F-G，少看提示也能找到。",
    reward: "三颗预备星",
    parts: [
      { midi: 64, label: "E 近邻星", colorName: "嫩绿", color: "#62C60C", shape: "star", action: "排好" },
      { midi: 65, label: "F 近邻星", colorName: "洋红", color: "#CC338D", shape: "star", action: "排好" },
      { midi: 67, label: "G 近邻星", colorName: "星蓝", color: "#6F8FFE", shape: "star", action: "排好" }
    ]
  },
  {
    id: "FG04",
    scene: "bridge",
    phase: "staffPrep",
    focus: ["F", "G"],
    concepts: ["staff-position", "keyboard-locator"],
    scaffold: "medium",
    title: "桥前小地图",
    storyNeed: "星芽看见星桥前两格谱位。",
    prompt: "F 在第一间，G 在第二线，先铺小地图。",
    reward: "桥前小地图",
    parts: [
      { midi: 65, label: "F 第一间", colorName: "洋红", color: "#CC338D", shape: "bridge", action: "铺好" },
      { midi: 67, label: "G 第二线", colorName: "星蓝", color: "#6F8FFE", shape: "bridge", action: "铺好" }
    ]
  }
];

const runtimeAsset = (file) => `assets/runtime/${file}`;

const partImages = {
  floor: runtimeAsset("part-floor.webp"),
  light: runtimeAsset("part-light.webp"),
  wheel: runtimeAsset("part-wheel.webp"),
  bridge: runtimeAsset("part-bridge.webp"),
  wall: runtimeAsset("part-wall.webp"),
  star: runtimeAsset("part-star.webp"),
  roof: runtimeAsset("part-roof.webp"),
  brick: runtimeAsset("part-floor.webp")
};

const dinoImages = {
  point: runtimeAsset("xingya-suit-point.webp"),
  listen: runtimeAsset("xingya-suit-listen.webp"),
  good: runtimeAsset("xingya-suit-good.webp"),
  bad: runtimeAsset("xingya-suit-try-again.webp"),
  celebrate: runtimeAsset("xingya-suit-celebrate.webp"),
  jump: runtimeAsset("xingya-suit-jump.webp")
};

const gardenCharacterAssets = {
  sealed: dinoImages.point,
  scanning: dinoImages.point,
  safeOpen: runtimeAsset("xingya-garden-invite-v1.webp")
};

const effectImages = {
  correct: runtimeAsset("fx-correct-sparkle.webp"),
  wrong: runtimeAsset("fx-try-again-puff.webp"),
  complete: runtimeAsset("fx-level-confetti.webp")
};

const startupAssets = [
  runtimeAsset("app-icon.webp"),
  runtimeAsset("scale-island-map-bg.webp"),
  runtimeAsset("moon-workshop-bg.webp"),
  runtimeAsset("success-badge.webp"),
  ...Object.values(partImages),
  ...Object.values(dinoImages),
  gardenCharacterAssets.safeOpen,
  ...Object.values(effectImages)
];

const mapNodes = [
  { levelId: "M01", title: "月亮地板" },
  { levelId: "M02", title: "小灯醒醒" },
  { levelId: "M03", title: "听小车轮" },
  { levelId: "M04", title: "咔哒小桥" },
  { levelId: "M05", title: "倒数灯" },
  { levelId: "M06", title: "大跳墙" },
  { levelId: "M07", title: "星星串" },
  { levelId: "M08", title: "月亮屋顶" },
  { levelId: "FG01", title: "F 垫子" },
  { levelId: "FG02", title: "G 星门" },
  { levelId: "FG03", title: "近邻星" },
  { levelId: "FG04", title: "桥前地图" }
];

const staffCourse = {
  id: "S01",
  title: "星星桥第一跳",
  reward: "谱线星星",
  prompt: "看五线谱上的音符垫，按同名琴键，星芽就跳到对面星球。",
  steps: [
    { midi: 60, label: "第1颗星", lane: "middle-c", x: 30.2, staffHint: "下加一线" },
    { midi: 62, label: "第2颗星", lane: "d", x: 39.3, staffHint: "谱线下面" },
    { midi: 64, label: "第3颗星", lane: "e", x: 48.4, staffHint: "第一线" },
    { midi: 65, label: "第4颗星", lane: "f", x: 57.5, staffHint: "第一间" },
    { midi: 67, label: "第5颗星", lane: "g", x: 66.7, staffHint: "第二线" },
    { midi: 64, label: "回到星桥", lane: "e", x: 76.2, staffHint: "第一线" }
  ]
};

const SESSION_RUNTIME_KEY = "starDinoSessionRuntime";
const SESSION_RUNTIME_VERSION = 1;
const LEARNING_STATS_VERSION = 3;
const RETENTION_THRESHOLD_VERSION = "preschool-v1-2026-07-11";
const RETENTION_MIN_INTERVAL_MS = 8 * 60 * 60 * 1000;
const CH3_ENTRY_AIR_CHECK = "CH3_ENTRY_AIR_CHECK";
const CH3_ASSISTED_WAIT_MS = 5200;
const CH3_LONG_WAIT_MS = 20000;
const LS04_TARGET_PLAY_MS = 760;
const LS04_ASSISTED_WAIT_MS = 5200;
const chapter3Lessons = {
  LS01: { id: "LS01", midi: 60, letter: "C", solfege: "Do", locator: "两黑键左侧", leaf: 1, prompt: "打开第一片叶" },
  LS02: { id: "LS02", midi: 62, letter: "D", solfege: "Re", locator: "两黑键中间", leaf: 2, prompt: "伸直第二片叶" },
  LS03: { id: "LS03", midi: 64, letter: "E", solfege: "Mi", locator: "两黑键右侧", leaf: 3, prompt: "唤醒第三片叶", requiredInputs: 2 }
};

const preschoolSessionBundles = [
  {
    bundleId: "C1-01",
    allowOpeningReview: false,
    actions: [
      { actionId: "M01-intro", kind: "level", targetId: "M01", runMode: "guided" },
      { actionId: "M01-do-revisit", kind: "level", targetId: "M01", runMode: "check", forceReducedCue: true }
    ]
  },
  { bundleId: "C1-02", actions: [{ actionId: "M02-guided", kind: "level", targetId: "M02", runMode: "guided" }] },
  { bundleId: "C1-03", actions: [{ actionId: "M03-listen", kind: "level", targetId: "M03", runMode: "guided" }] },
  {
    bundleId: "C1-04",
    actions: [
      { actionId: "M04-up", kind: "level", targetId: "M04", runMode: "guided" },
      { actionId: "M05-down", kind: "level", targetId: "M05", runMode: "guided" }
    ]
  },
  { bundleId: "C1-05", actions: [{ actionId: "M06-leap", kind: "level", targetId: "M06", runMode: "guided" }] },
  {
    bundleId: "C1-06",
    actions: [
      { actionId: "M07-guided", kind: "level", targetId: "M07", runMode: "guided" },
      { actionId: "M07-check", kind: "level", targetId: "M07", runMode: "check" }
    ]
  },
  {
    bundleId: "C1-07",
    actions: [
      { actionId: "M08-guided", kind: "level", targetId: "M08", runMode: "guided" },
      { actionId: "M08-check", kind: "level", targetId: "M08", runMode: "check" }
    ]
  },
  {
    bundleId: "C1-08",
    actions: [
      { actionId: "FG01-guided", kind: "level", targetId: "FG01", runMode: "guided" },
      { actionId: "FG02-guided", kind: "level", targetId: "FG02", runMode: "guided" }
    ]
  },
  {
    bundleId: "C1-09",
    actions: [
      { actionId: "FG03-guided", kind: "level", targetId: "FG03", runMode: "guided" },
      { actionId: "FG03-check", kind: "level", targetId: "FG03", runMode: "check" }
    ]
  },
  {
    bundleId: "C1-10",
    actions: [
      { actionId: "FG04-guided", kind: "level", targetId: "FG04", runMode: "guided" },
      { actionId: "FG04-check", kind: "level", targetId: "FG04", runMode: "check" }
    ]
  },
  {
    bundleId: "C2-01",
    allowOpeningReview: false,
    actions: [{ actionId: "S01-mini", kind: "staff", targetId: "S01", runMode: "guided", sessionMode: "mini" }]
  },
  {
    bundleId: "C2-02",
    allowOpeningReview: false,
    actions: [{ actionId: "S01-guided", kind: "staff", targetId: "S01", runMode: "guided", sessionMode: "full" }]
  },
  {
    bundleId: "C2-03",
    allowOpeningReview: false,
    actions: [{ actionId: "S01-check", kind: "staff", targetId: "S01", runMode: "check", sessionMode: "full" }]
  },
  {
    bundleId: "C3-01",
    allowOpeningReview: false,
    actions: [
      { actionId: "LS01-visible", kind: "garden", targetId: "LS01", runMode: "guided", reviewableForMastery: false },
      { actionId: "LS02-visible", kind: "garden", targetId: "LS02", runMode: "guided", reviewableForMastery: false }
    ]
  },
  {
    bundleId: "C3-02",
    allowOpeningReview: false,
    actions: [
      { actionId: "LS03-visible", kind: "garden", targetId: "LS03", runMode: "guided", reviewableForMastery: false }
    ]
  },
  {
    bundleId: "C3-03",
    allowOpeningReview: false,
    actions: [
      { actionId: "LS04-listening", kind: "garden-listening", targetId: "LS04", runMode: "check", reviewableForMastery: true }
    ]
  }
];

const sessionBundleById = new Map(preschoolSessionBundles.map((bundle) => [bundle.bundleId, bundle]));

function sessionBundleForLevel(levelId) {
  return preschoolSessionBundles.find((bundle) => bundle.actions.some((action) => action.kind === "level" && action.targetId === levelId)) || null;
}

function validateCourseTargets() {
  const targetRows = [];
  levels.forEach((level) => {
    (level.focus || []).forEach((noteName) => {
      targetRows.push({ source: `${level.id}:focus`, noteName });
    });
    level.parts.forEach((part) => {
      targetRows.push({ source: level.id, midi: part.midi });
    });
  });
  staffCourse.steps.forEach((step, index) => {
    targetRows.push({ source: `${staffCourse.id}:${index + 1}`, midi: step.midi });
  });

  const resolvedTargets = targetRows.map((row) => ({
    ...row,
    note: row.noteName ? notes.find((note) => note.name === row.noteName) : notes.find((note) => note.midi === row.midi)
  }));
  const unknownTargets = resolvedTargets.filter((row) => !row.note);
  const reservedTargets = resolvedTargets
    .filter((row) => isReservedNote(row.note));

  if (unknownTargets.length || reservedTargets.length) {
    const issues = [];
    if (unknownTargets.length) {
      issues.push(`unknown targets: ${unknownTargets.map((row) => `${row.source}:${row.noteName || row.midi}`).join(", ")}`);
    }
    if (reservedTargets.length) {
      issues.push(`reserved targets: ${reservedTargets.map((row) => `${row.source}:${row.note.name}`).join(", ")}`);
    }
    throw new Error(`Invalid course target list. ${issues.join(" | ")}`);
  }
}

validateCourseTargets();

const learningPhases = {
  explore: {
    label: "认识音符",
    short: "认识",
    prompt: "看名字，也看黑键位置。",
    coach: "先找这个音"
  },
  follow: {
    label: "跟弹旋律",
    short: "跟弹",
    prompt: "按顺序读音，再找琴键。",
    coach: "读音找键"
  },
  match: {
    label: "找键小考",
    short: "小考",
    prompt: "先想位置，再按琴键。",
    coach: "自己找找"
  },
  direction: {
    label: "方向练习",
    short: "方向",
    prompt: "听旋律往上还是往下走。",
    coach: "看音往哪走"
  },
  leap: {
    label: "跳音练习",
    short: "跳音",
    prompt: "从近处跳到远处，记住两个键位。",
    coach: "大跳也能找"
  },
  check: {
    label: "记忆小考",
    short: "记忆",
    prompt: "少看颜色，多看音名和键位。",
    coach: "考一考"
  },
  climb: {
    label: "五音爬梯",
    short: "爬梯",
    prompt: "从 C 一路爬到 G。",
    coach: "一路往上"
  },
  staffPrep: {
    label: "谱位预备",
    short: "预备",
    prompt: "把键位和谱位放在一起看。",
    coach: "先认谱位"
  },
  listen: {
    label: "听小车轮",
    short: "听音",
    prompt: "先听声音，再在琴键上找同一个音。",
    coach: "听一听"
  },
  staff: {
    label: "看谱跳桥",
    short: "看谱",
    prompt: "看谱位，读音名，再找键。",
    coach: "看谱找键"
  }
};

const scaffoldLabels = {
  strong: "强提示",
  medium: "半提示",
  light: "少提示",
  listen: "听音",
  staff: "看谱"
};

const staffLaneY = {
  // Treble staff positions for C4-G4 on the short, wider-spaced staff.
  "middle-c": 89.5,
  d: 82,
  e: 74.5,
  f: 67,
  g: 59.5
};

const roofCarrySlots = [
  { left: 37.2, top: 134 },
  { left: 43.6, top: 126 },
  { left: 50.0, top: 121 },
  { left: 56.4, top: 126 },
  { left: 62.8, top: 134 }
];
const floorCarrySlot = { left: 50.0, top: 124 };
const lightCarrySlots = [
  { left: 38.8, top: 96 },
  { left: 50.0, top: 96 },
  { left: 61.2, top: 96 }
];
const rocketCarrySlots = [
  { left: 57.8, top: 183 },
  { left: 51.4, top: 190 },
  { left: 44.9, top: 197 }
];
const bridgeCarrySlots = [
  { left: 36.7, top: 145 },
  { left: 50.0, top: 128 },
  { left: 63.3, top: 145 }
];
const wheelCarrySlot = { left: 57.3, top: 98 };
const starCarrySlots = [
  { left: 35.7, top: 164 },
  { left: 42.5, top: 138 },
  { left: 50.0, top: 152 },
  { left: 57.5, top: 138 },
  { left: 64.3, top: 164 }
];
const wallCarrySlots = [
  { left: 41.8, top: 46, height: 118 },
  { left: 50.0, top: 24, height: 154 },
  { left: 58.2, top: 46, height: 118 }
];

function initialLevelIndex() {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("level") || window.location.hash.replace("#", "");
  const index = levels.findIndex((level) => level.id.toLowerCase() === requested.toLowerCase());
  return index >= 0 ? index : nextPlayableLevelIndex();
}

function nextPlayableLevelIndex(completed = loadCompletedLevels()) {
  const nextIndex = levels.findIndex((level) => !completed.has(level.id));
  return nextIndex >= 0 ? nextIndex : Math.max(0, levels.length - 1);
}

function initialScreen() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("mode") === "staff") return "staff";
  if (params.get("screen") === "map") return "map";
  if (!params.get("level") && !window.location.hash) return "map";
  return "play";
}

function initialAuditMode() {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get("audit") || params.get("checkMode") || "";
  return ["no-reading", "color-reduced"].includes(mode) ? mode : "";
}

function initialStaffSessionMode() {
  const params = new URLSearchParams(window.location.search);
  return params.get("session") === "mini" ? "mini" : "full";
}

function localDateKeyAt(value = new Date()) {
  const date = value instanceof Date ? value : new Date(value);
  if (!Number.isFinite(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isoTimeMs(value) {
  if (typeof value !== "string" || !value) return NaN;
  return Date.parse(value);
}

function createSessionId(bundleId) {
  const random = window.crypto?.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  return `${bundleId}-${random}`;
}

function loadSessionRuntime() {
  try {
    const parsed = JSON.parse(localStorage.getItem(SESSION_RUNTIME_KEY) || "{}");
    const lessonEvidence = parsed.chapter3?.lessonEvidence && typeof parsed.chapter3.lessonEvidence === "object"
      ? parsed.chapter3.lessonEvidence
      : {};
    const ls04Completed = Boolean(lessonEvidence.LS04?.completedAt);
    return {
      version: SESSION_RUNTIME_VERSION,
      active: parsed.active && parsed.active.status === "active" ? parsed.active : null,
      history: Array.isArray(parsed.history) ? parsed.history : [],
      lastRest: parsed.lastRest || null,
      chapter3: {
        entryEventId: parsed.chapter3?.entryEventId || CH3_ENTRY_AIR_CHECK,
        equipmentState: parsed.chapter3?.equipmentState || "sealed",
        airCheckComplete: Boolean(parsed.chapter3?.airCheckComplete),
        leaves: [1, 2, 3].map((leaf) => Boolean(parsed.chapter3?.leaves?.[leaf - 1])),
        lessonEvidence,
        resume: parsed.chapter3?.resume && typeof parsed.chapter3.resume === "object" ? parsed.chapter3.resume : null,
        ls03QualifiedInputs: Math.max(0, Math.min(2, Number(parsed.chapter3?.ls03QualifiedInputs) || 0)),
        completed: false,
        ls04Completed,
        visibleSliceCompleted: Boolean(parsed.chapter3?.visibleSliceCompleted || parsed.chapter3?.completed || lessonEvidence.LS03?.completedAt),
        ls04Attempts: Array.isArray(parsed.chapter3?.ls04Attempts) ? parsed.chapter3.ls04Attempts : []
      }
    };
  } catch (error) {
    return {
      version: SESSION_RUNTIME_VERSION,
      active: null,
      history: [],
      lastRest: null,
      chapter3: { entryEventId: CH3_ENTRY_AIR_CHECK, equipmentState: "sealed", airCheckComplete: false, leaves: [false, false, false], lessonEvidence: {}, resume: null, ls03QualifiedInputs: 0, completed: false, ls04Completed: false, visibleSliceCompleted: false, ls04Attempts: [] }
    };
  }
}

function saveSessionRuntime(runtime) {
  localStorage.setItem(SESSION_RUNTIME_KEY, JSON.stringify(runtime));
}

function isMapResumeLocation(params = new URLSearchParams(window.location.search)) {
  return !params.get("level") && !params.get("mode") &&
    (!params.get("screen") || params.get("screen") === "map");
}

function activeSessionFromUrl(runtime) {
  const params = new URLSearchParams(window.location.search);
  const bundleId = params.get("bundle") || "";
  const sessionId = params.get("sessionId") || "";
  const active = runtime?.active;
  if (!active || active.status !== "active") return null;
  if (!sessionBundleById.has(active.bundleId) || !Array.isArray(active.actions)) return null;
  const hasExplicitSessionIdentity = Boolean(bundleId || sessionId);
  if (hasExplicitSessionIdentity) {
    if (!bundleId || !sessionId) return null;
    if (active.bundleId !== bundleId || active.sessionId !== sessionId) return null;
    return active;
  }
  // A root or map restore continues the saved session from the map. Direct level/staff links stay debug-only.
  if (!isMapResumeLocation(params)) return null;
  return active;
}

function loadCompletedLevels() {
  try {
    return new Set(JSON.parse(localStorage.getItem("starDinoCompletedLevels") || "[]"));
  } catch (error) {
    return new Set();
  }
}

function saveCompletedLevels() {
  localStorage.setItem("starDinoCompletedLevels", JSON.stringify([...state.completed]));
}

function migrateLegacyFormalCompletions(records, sourceVersion) {
  if (!records || typeof records !== "object" || !Number.isFinite(sourceVersion) || sourceVersion >= 3) {
    return records || {};
  }
  return Object.fromEntries(Object.entries(records).map(([id, stored]) => {
    if (!stored || typeof stored !== "object" || Object.hasOwn(stored, "formalCompletions")) {
      return [id, stored];
    }
    return [id, {
      ...stored,
      // v2 completions predate debug-only deep links, so retain them as reviewable formal play.
      formalCompletions: Math.max(0, Number(stored.completions) || 0),
      formalCompletionSource: "legacy-v2",
      lastFormalCompletedAt: stored.lastFormalCompletedAt || stored.lastCompletedAt || null
    }];
  }));
}

function loadLearningStats() {
  try {
    const parsed = JSON.parse(localStorage.getItem("starDinoLearningStats") || "{}");
    const sourceVersion = Number(parsed.version);
    return {
      ...parsed,
      version: LEARNING_STATS_VERSION,
      levels: migrateLegacyFormalCompletions(parsed.levels, sourceVersion),
      notes: parsed.notes || {},
      staff: migrateLegacyFormalCompletions(parsed.staff, sourceVersion),
      retention: {
        stableEvents: Array.isArray(parsed.retention?.stableEvents) ? parsed.retention.stableEvents : [],
        retainedEvents: Array.isArray(parsed.retention?.retainedEvents) ? parsed.retention.retainedEvents : [],
        observationEvents: Array.isArray(parsed.retention?.observationEvents) ? parsed.retention.observationEvents : [],
        clockInvalidEvents: Array.isArray(parsed.retention?.clockInvalidEvents) ? parsed.retention.clockInvalidEvents : [],
        lastWallClockAt: parsed.retention?.lastWallClockAt || null,
        lastWallClockSessionId: parsed.retention?.lastWallClockSessionId || null
      }
    };
  } catch (error) {
    return {
      version: LEARNING_STATS_VERSION,
      levels: {},
      notes: {},
      staff: {},
      retention: { stableEvents: [], retainedEvents: [], observationEvents: [], clockInvalidEvents: [], lastWallClockAt: null, lastWallClockSessionId: null }
    };
  }
}

function saveLearningStats() {
  localStorage.setItem("starDinoLearningStats", JSON.stringify(state.learningStats));
}

const AUDIO_SETTINGS_KEY = "starDinoAudioSettings";
const AUDIO_VOLUME_CAP = 0.7;
const AUDIO_DEFAULT_VOLUME = 0.6;
const AUDIO_EFFECT_GAIN = 0.36;
const MOTION_SETTINGS_KEY = "starDinoMotionSettings";
const WORKSHOP_IDLE_IDENTITY_MS = 4800;
const WORKSHOP_IDLE_LOCATOR_MS = 8800;
const LEVEL_INTRO_RESPONSE_DELAY_MS = 1770;
const LISTENING_IDENTITY_NEUTRAL = "#5F7286";

function normalizeAudioSettings(settings = {}) {
  const rawVolume = Number(settings.volume);
  const volume = Number.isFinite(rawVolume)
    ? Math.min(AUDIO_VOLUME_CAP, Math.max(0, rawVolume))
    : AUDIO_DEFAULT_VOLUME;
  return {
    enabled: settings.enabled !== false,
    volume
  };
}

function loadAudioSettings() {
  try {
    return normalizeAudioSettings(JSON.parse(localStorage.getItem(AUDIO_SETTINGS_KEY) || "{}"));
  } catch (error) {
    return normalizeAudioSettings();
  }
}

function saveAudioSettings() {
  try {
    localStorage.setItem(AUDIO_SETTINGS_KEY, JSON.stringify(state.audioSettings));
  } catch (error) {
    // Audio preferences remain usable for the current session when storage is unavailable.
  }
}

function normalizeMotionSettings(settings = {}) {
  return {
    reduced: settings.reduced === true
  };
}

function loadMotionSettings() {
  try {
    return normalizeMotionSettings(JSON.parse(localStorage.getItem(MOTION_SETTINGS_KEY) || "{}"));
  } catch (error) {
    return normalizeMotionSettings();
  }
}

function saveMotionSettings() {
  try {
    localStorage.setItem(MOTION_SETTINGS_KEY, JSON.stringify(state.motionSettings));
  } catch (error) {
    // Motion comfort remains usable for the current session when storage is unavailable.
  }
}

function createPracticeAttempt(kind, id, runMode = "") {
  return {
    kind,
    id,
    runMode,
    wrongs: 0,
    corrects: 0,
    wrongTargets: {},
    cueStrength: "none",
    strongCueFrames: 0,
    softCueFrames: 0,
    inputRoutes: {},
    hasExperimentalInput: false,
    lastWrong: "",
    stepRecords: [],
    activeStepRecord: null,
    idleIdentityHints: 0,
    idleLocatorHints: 0,
    idleListenReplays: 0,
    assistedSuccesses: 0,
    modeledSuccesses: 0,
    modeledInputs: [],
    sessionId: null,
    bundleId: null,
    sessionActionId: null,
    formalSession: false,
    localDateKey: null,
    reviewSkillKey: null,
    sessionRole: null,
    sessionStartedAt: null,
    voluntaryReplay: false,
    requiredReview: false,
    assistedMode: false
  };
}

const initialSessionRuntime = loadSessionRuntime();
const initialActiveSession = activeSessionFromUrl(initialSessionRuntime);
const initialActiveAction = initialActiveSession?.actions?.[initialActiveSession.actionIndex] || null;
const initialActiveSessionStartsOnMap = Boolean(initialActiveSession && isMapResumeLocation());

const state = {
  screen: initialActiveAction && !initialActiveSessionStartsOnMap
    ? (initialActiveAction.kind === "staff" ? "staff" : (["garden", "garden-listening"].includes(initialActiveAction.kind) ? "garden" : "play"))
    : initialScreen(),
  auditMode: initialAuditMode(),
  levelIndex: initialActiveAction?.kind === "level"
    ? Math.max(0, levels.findIndex((level) => level.id === initialActiveAction.targetId))
    : initialLevelIndex(),
  stepIndex: 0,
  staffStepIndex: 0,
  staffComplete: false,
  levelRunMode: initialActiveAction?.kind === "level" ? (initialActiveAction.runMode || "guided") : "guided",
  staffRunMode: initialActiveAction?.kind === "staff" ? (initialActiveAction.runMode || "guided") : "guided",
  staffSessionMode: initialActiveAction?.kind === "staff" ? (initialActiveAction.sessionMode || "full") : initialStaffSessionMode(),
  earned: [],
  completed: loadCompletedLevels(),
  learningStats: loadLearningStats(),
  sessionRuntime: initialSessionRuntime,
  activeSession: initialActiveSession,
  audioSettings: loadAudioSettings(),
  motionSettings: loadMotionSettings(),
  practiceAttempt: null,
  stepHadWrong: false,
  lastInputMidi: null,
  lastInputResult: null,
  audio: null,
  sfx: null,
  audioUnlocked: false,
  midiAccess: null,
  autoAdvanceTimer: null,
  dinoMoodTimer: null,
  staffMoodTimer: null,
  levelIntroTimer: null,
  staffMotionTimer: null,
  staffInputMarkerSerial: 0,
  assistedSuccessTimer: null,
  assistedSuccessPending: false,
  listenPromptTimer: null,
  routeJustLockedIndex: null,
  routeLockTimer: null,
  workshopIdleStage: "none",
  workshopIdleIdentityTimer: null,
  workshopIdleLocatorTimer: null,
  chapter3: initialSessionRuntime.chapter3,
  gardenWrongCount: 0,
  gardenChildCorrectCount: 0,
  gardenChildInputs: [],
  gardenInputRoutes: {},
  gardenRepairStage: "none",
  gardenAssistedTimer: null,
  gardenLongWaitTimer: null,
  gardenModeledInputs: [],
  gardenInputArmed: true,
  gardenAirTimer: null,
  gardenCompletionTimer: null,
  ls04Timer: null,
  ls04FeedbackTimer: null
};

function persistLearningStatsSchemaUpgrade() {
  try {
    const raw = localStorage.getItem("starDinoLearningStats");
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed?.version === LEARNING_STATS_VERSION) return;
    localStorage.setItem("starDinoLearningStats", JSON.stringify(state.learningStats));
  } catch (error) {
    // Keep the in-memory v3 view when legacy storage cannot be rewritten.
  }
}

persistLearningStatsSchemaUpgrade();

function persistSessionRuntimeSchemaUpgrade() {
  try {
    const raw = localStorage.getItem(SESSION_RUNTIME_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    const normalized = state.sessionRuntime;
    const staleChapterCompletion = Boolean(parsed.chapter3?.completed);
    if (staleChapterCompletion || !Array.isArray(parsed.chapter3?.ls04Attempts) || !Object.hasOwn(parsed.chapter3 || {}, "visibleSliceCompleted") || !Object.hasOwn(parsed.chapter3 || {}, "ls04Completed")) {
      saveSessionRuntime(normalized);
    }
  } catch (error) {
    // Keep the normalized in-memory Chapter 3 view if legacy storage cannot be rewritten.
  }
}

persistSessionRuntimeSchemaUpgrade();

function currentSessionAction(session = state.activeSession) {
  if (!session || !Array.isArray(session.actions)) return null;
  return session.actions[session.actionIndex] || null;
}

function stampPracticeAttemptSession(attempt) {
  if (!attempt) return attempt;
  const session = state.activeSession;
  const action = currentSessionAction(session);
  if (!session || !action || session.status !== "active") return attempt;
  attempt.sessionId = session.sessionId;
  attempt.bundleId = session.bundleId;
  attempt.sessionActionId = action.actionId;
  attempt.formalSession = true;
  attempt.localDateKey = session.localDateKey;
  attempt.reviewSkillKey = action.reviewSkillKey || null;
  attempt.sessionRole = action.role || "lesson";
  attempt.sessionStartedAt = session.startedAt;
  attempt.voluntaryReplay = Boolean(session.voluntaryReplay);
  attempt.requiredReview = Boolean(action.requiredReview);
  return attempt;
}

state.practiceAttempt = createPracticeAttempt(
  state.screen === "staff" ? "staff" : "level",
  state.screen === "staff" ? staffCourse.id : activeLevel()?.id || "M01",
  state.screen === "staff" ? state.staffRunMode : state.levelRunMode
);
stampPracticeAttemptSession(state.practiceAttempt);

const els = {
  bootLoader: document.querySelector("#bootLoader"),
  bootProgress: document.querySelector("#bootProgress"),
  mapShell: document.querySelector("#mapShell"),
  appShell: document.querySelector("#appShell"),
  mapStarCount: document.querySelector("#mapStarCount"),
  mapChapterLabel: document.querySelector("#mapChapterLabel"),
  mapSessionStatus: document.querySelector("#mapSessionStatus"),
  mapSessionTitle: document.querySelector("#mapSessionTitle"),
  mapSessionDetail: document.querySelector("#mapSessionDetail"),
  gardenRestMarker: document.querySelector("#gardenRestMarker"),
  gardenPanel: document.querySelector("#gardenPanel"),
  gardenScene: document.querySelector("#gardenScene"),
  gardenAirCheck: document.querySelector("#gardenAirCheck"),
  gardenAirCheckTitle: document.querySelector("#gardenAirCheckTitle"),
  gardenAirCheckDetail: document.querySelector("#gardenAirCheckDetail"),
  gardenPlant: document.querySelector("#gardenPlant"),
  gardenXingya: document.querySelector("#gardenXingya"),
  gardenXingyaImage: document.querySelector("#gardenXingyaImage"),
  gardenSpeech: document.querySelector("#gardenSpeech"),
  gardenSpeechKicker: document.querySelector("#gardenSpeechKicker"),
  gardenSpeechMain: document.querySelector("#gardenSpeechMain"),
  gardenSpeechSupport: document.querySelector("#gardenSpeechSupport"),
  gardenProgress: document.querySelector("#gardenProgress"),
  gardenListening: document.querySelector("#gardenListening"),
  listeningSource: document.querySelector("#listeningSource"),
  listeningCandidates: document.querySelector("#listeningCandidates"),
  listeningReplay: document.querySelector("#listeningReplay"),
  listeningCallProgress: document.querySelector("#listeningCallProgress"),
  listeningResult: document.querySelector("#listeningResult"),
  mapReturn: document.querySelector("#mapReturn"),
  mapParentGate: document.querySelector("#mapParentGate"),
  playParentGate: document.querySelector("#playParentGate"),
  staffModeButton: document.querySelector("#staffModeButton"),
  mainTitle: document.querySelector("#mainTitle"),
  levelBadge: document.querySelector("#levelBadge"),
  levelMap: document.querySelector("#levelMap"),
  stageTitle: document.querySelector("#stageTitle"),
  chapterTitle: document.querySelector("#chapterTitle"),
  levelTitle: document.querySelector("#levelTitle"),
  levelPrompt: document.querySelector("#levelPrompt"),
  feedback: document.querySelector("#feedback"),
  targetNote: document.querySelector("#targetNote"),
  rewardCard: document.querySelector("#rewardCard"),
  inputStatus: document.querySelector("#inputStatus"),
  heardStatus: document.querySelector("#heardStatus"),
  nextAction: document.querySelector("#nextAction"),
  stepStrip: document.querySelector("#stepStrip"),
  keyboard: document.querySelector("#keyboard"),
  earnedList: document.querySelector("#earnedList"),
  baseBuild: document.querySelector("#baseBuild"),
  roofWorldBuild: document.querySelector("#roofWorldBuild"),
  buildBlueprint: document.querySelector("#buildBlueprint"),
  m03WheelReplay: document.querySelector("#m03WheelReplay"),
  m03InstructionStatus: document.querySelector("#m03InstructionStatus"),
  memoryStarRoute: document.querySelector("#memoryStarRoute"),
  fgStarRoute: document.querySelector("#fgStarRoute"),
  roofScaleRoute: document.querySelector("#roofScaleRoute"),
  moonYard: document.querySelector(".moon-yard"),
  hangingPart: document.querySelector("#hangingPart"),
  hangingPartArt: document.querySelector("#hangingPartArt"),
  hangingPartBadge: document.querySelector("#hangingPartBadge"),
  hangingPartLabel: document.querySelector("#hangingPartLabel"),
  stageStoryRibbon: document.querySelector("#stageStoryRibbon"),
  stageSignalTrail: document.querySelector("#stageSignalTrail"),
  stageEnergyPath: document.querySelector("#stageEnergyPath"),
  stageEnergyPathSoft: document.querySelector("#stageEnergyPathSoft"),
  stageNoteOrb: document.querySelector("#stageNoteOrb"),
  stageNoteText: document.querySelector("#stageNoteText"),
  stageNoteName: document.querySelector("#stageNoteName"),
  coachDino: document.querySelector("#coachDino"),
  coachNote: document.querySelector("#coachNote"),
  coachBubble: document.querySelector("#coachBubble"),
  dinoSvg: document.querySelector("#dinoSvg"),
  dinoName: document.querySelector("#dinoName"),
  dinoHint: document.querySelector("#dinoHint"),
  modeHint: document.querySelector("#modeHint"),
  micButton: document.querySelector("#micButton"),
  midiButton: document.querySelector("#midiButton"),
  prevLevel: document.querySelector("#prevLevel"),
  resetLevel: document.querySelector("#resetLevel"),
  nextLevel: document.querySelector("#nextLevel"),
  resultModal: document.querySelector("#resultModal"),
  resultText: document.querySelector("#resultText"),
  modalNext: document.querySelector("#modalNext"),
  parentModal: document.querySelector("#parentModal"),
  parentClose: document.querySelector("#parentClose"),
  parentProgressText: document.querySelector("#parentProgressText"),
  parentStaffState: document.querySelector("#parentStaffState"),
  parentInputMode: document.querySelector("#parentInputMode"),
  parentHeardState: document.querySelector("#parentHeardState"),
  parentResponseRecord: document.querySelector("#parentResponseRecord"),
  parentLearningFocus: document.querySelector("#parentLearningFocus"),
  parentLearningDetail: document.querySelector("#parentLearningDetail"),
  parentMasteryStatus: document.querySelector("#parentMasteryStatus"),
  parentMasteryDetail: document.querySelector("#parentMasteryDetail"),
  parentEvidenceList: document.querySelector("#parentEvidenceList"),
  parentSoundToggle: document.querySelector("#parentSoundToggle"),
  parentSoundState: document.querySelector("#parentSoundState"),
  parentVolumeControl: document.querySelector("#parentVolumeControl"),
  parentVolumeValue: document.querySelector("#parentVolumeValue"),
  parentMotionToggle: document.querySelector("#parentMotionToggle"),
  parentMotionState: document.querySelector("#parentMotionState"),
  parentMicButton: document.querySelector("#parentMicButton"),
  parentMidiButton: document.querySelector("#parentMidiButton")
};

Object.assign(els, {
  staffPanel: document.querySelector("#staffPanel"),
  staffPrompt: document.querySelector("#staffPrompt"),
  staffNoteCard: document.querySelector("#staffNoteCard"),
  staffStage: document.querySelector("#staffStage"),
  staffJumpGuide: document.querySelector("#staffJumpGuide"),
  staffJumpGuidePath: document.querySelector("#staffJumpGuidePath"),
  staffJumpGuideShadow: document.querySelector("#staffJumpGuideShadow"),
  staffJumpFootprints: document.querySelector("#staffJumpFootprints"),
  staffVisualCue: document.querySelector("#staffVisualCue"),
  staffSteps: document.querySelector("#staffSteps"),
  staffDinoWrap: document.querySelector("#staffDinoWrap"),
  staffDino: document.querySelector("#staffDino"),
  staffProgress: document.querySelector("#staffProgress"),
  staffFeedback: document.querySelector("#staffFeedback")
});

function activeLevel() {
  return levels[state.levelIndex];
}

function activeTargetMidi() {
  if (state.screen === "staff") return activeStaffStep()?.midi ?? null;
  return activePart()?.midi ?? null;
}

function activePart(level = activeLevel()) {
  return level.parts?.[state.stepIndex] || null;
}

function noteForMidi(midi) {
  return notes.find((note) => note.midi === midi) || null;
}

function isMiniStaffSession() {
  return state.staffSessionMode === "mini";
}

function activeStaffSteps() {
  return isMiniStaffSession() ? staffCourse.steps.slice(0, 3) : staffCourse.steps;
}

function activeStaffStepCount() {
  return activeStaffSteps().length;
}

function activeStaffStep() {
  return activeStaffSteps()[state.staffStepIndex] || null;
}

function isListeningLevel(level = activeLevel()) {
  return Boolean(level && (level.phase === "listen" || level.scaffold === "listen"));
}

function shouldRevealListeningTarget(level = activeLevel()) {
  return isListeningLevel(level) && state.lastInputResult === "wrong";
}

function shouldHideListeningIdentity(level = activeLevel()) {
  return Boolean(
    isListeningLevel(level) &&
    state.stepIndex < (level?.parts?.length || 0) &&
    !shouldRevealListeningTarget(level)
  );
}

function shouldSuppressListeningObjectIdentity(level = activeLevel()) {
  return Boolean(isListeningLevel(level) && state.stepIndex < (level?.parts?.length || 0));
}

function friendlyStaffHint(step) {
  const hint = step?.staffHint || "谱面";
  if (hint === "下加一线") return "下方小线";
  if (hint === "谱线下面") return "线下面";
  return hint;
}

function friendlyKeyLocator(note) {
  const locatorMap = {
    两黑键左边: "2黑左",
    两黑键中间: "2黑中",
    两黑键右边: "2黑右",
    三黑键左边: "3黑左",
    三黑键左中: "3黑左中",
    三黑键正中: "3黑中",
    三黑键右边: "3黑右"
  };
  return locatorMap[note?.locator] || note?.locator || "";
}

function locatorVisualData(note) {
  const short = friendlyKeyLocator(note);
  const group = short.startsWith("2黑") ? 2 : short.startsWith("3黑") ? 3 : 0;
  const slotMap = {
    "2黑左": "left",
    "2黑中": "middle",
    "2黑右": "right",
    "3黑左": "left",
    "3黑左中": "left-middle",
    "3黑中": "middle",
    "3黑右": "right"
  };

  return {
    group,
    short,
    slot: slotMap[short] || "middle"
  };
}

function locatorVisualHtml(note, label = "黑键位置", extraClass = "") {
  const data = locatorVisualData(note);
  if (!data.group) return "";
  const dots = Array.from({ length: data.group }, () => '<i class="locator-dot"></i>').join("");
  return `
    <span class="locator-cue cue-${data.group} slot-${data.slot} ${extraClass}" aria-hidden="true">
      <span class="locator-dots">${dots}</span>
      <span class="locator-finder"></span>
      <span class="locator-copy"><small>${label}</small><strong>${data.short}</strong></span>
    </span>
  `;
}

function phaseForLevel(level = activeLevel()) {
  return learningPhases[level?.phase] || learningPhases.explore;
}

function noteIdentity(note, staffStep = null) {
  const target = note || notes[0];
  const staffHint = staffStep ? friendlyStaffHint(staffStep) : "";
  const staffPrep = staffHint || staffHintForNote(target);
  return {
    full: `${target.solfege}/${target.name}`,
    solfege: target.solfege,
    letter: target.name,
    keyShort: friendlyKeyLocator(target),
    keyLong: target.locator,
    staffHint,
    staffPrep,
    compact: staffHint
      ? `${target.solfege}/${target.name} · ${staffHint} · ${friendlyKeyLocator(target)}`
      : `${target.solfege}/${target.name} · ${friendlyKeyLocator(target)}`
  };
}

function partObjectLabel(part, note = noteForMidi(part?.midi)) {
  if (!part?.label) return "零件";
  const prefixes = [note?.solfege, note?.name].filter(Boolean).map((value) => `${value} `);
  const prefix = prefixes.find((value) => part.label.startsWith(value));
  return prefix ? part.label.slice(prefix.length) : part.label;
}

function currentAttemptStepKey() {
  if (state.screen === "staff") return `staff:${state.staffStepIndex}`;
  const level = activeLevel();
  return level ? `${level.id}:${state.stepIndex}` : "";
}

function beginPracticeStepClock(delayMs = 0) {
  const attempt = state.practiceAttempt;
  if (!attempt) return;
  const targetMidi = state.screen === "staff" ? activeStaffStep()?.midi : activeTargetMidi();
  const target = noteForMidi(targetMidi);
  const stepKey = currentAttemptStepKey();
  if (!target || !stepKey) {
    attempt.activeStepRecord = null;
    return;
  }
  attempt.activeStepRecord = {
    key: stepKey,
    index: state.screen === "staff" ? state.staffStepIndex : state.stepIndex,
    target: target.name,
    midi: target.midi,
    startedAt: performance.now() + Math.max(0, delayMs),
    firstResponseMs: null,
    correctResponseMs: null,
    firstInputCorrect: null,
    inputs: 0,
    wrongs: 0,
    inputRoutes: {}
  };
}

function recordStepResponse({ correct, target, source }) {
  const attempt = state.practiceAttempt;
  if (!attempt || !target) return;
  const stepKey = currentAttemptStepKey();
  if (!attempt.activeStepRecord || attempt.activeStepRecord.key !== stepKey) {
    beginPracticeStepClock();
  }
  const record = attempt.activeStepRecord;
  if (!record) return;
  const elapsedMs = Math.max(0, Math.round(performance.now() - record.startedAt));
  record.inputs += 1;
  record.inputRoutes[source] = (record.inputRoutes[source] || 0) + 1;
  if (record.firstResponseMs === null) {
    record.firstResponseMs = elapsedMs;
    record.firstInputCorrect = Boolean(correct);
  }
  if (!correct) {
    record.wrongs += 1;
    return;
  }
  record.correctResponseMs = elapsedMs;
  attempt.stepRecords.push({ ...record, inputRoutes: { ...record.inputRoutes } });
  attempt.activeStepRecord = null;
}

function median(values) {
  if (!values.length) return 0;
  const sorted = [...values].sort((left, right) => left - right);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[middle]
    : Math.round((sorted[middle - 1] + sorted[middle]) / 2);
}

function summarizeAttemptResponse(attempt = state.practiceAttempt) {
  if (!attempt) return null;
  const records = [...(attempt.stepRecords || [])];
  const active = attempt.activeStepRecord;
  if (active && active.firstResponseMs !== null) records.push(active);
  const answered = records.filter((record) => Number.isFinite(record.firstResponseMs));
  if (!answered.length) return null;
  const firstResponseTimes = answered.map((record) => Math.max(0, record.firstResponseMs));
  const firstTryCorrect = answered.filter((record) => record.firstInputCorrect).length;
  const totalInputs = answered.reduce((sum, record) => sum + (record.inputs || 0), 0);
  const wrongInputs = answered.reduce((sum, record) => sum + (record.wrongs || 0), 0);
  return {
    version: 1,
    stepCount: answered.length,
    firstTryCorrect,
    firstTryAccuracy: firstTryCorrect / answered.length,
    averageFirstResponseMs: Math.round(firstResponseTimes.reduce((sum, value) => sum + value, 0) / firstResponseTimes.length),
    medianFirstResponseMs: median(firstResponseTimes),
    totalInputs,
    wrongInputs,
    idleIdentityHints: attempt.idleIdentityHints || 0,
    idleLocatorHints: attempt.idleLocatorHints || 0,
    idleListenReplays: attempt.idleListenReplays || 0,
    timingUsedForMastery: false
  };
}

function formatResponseTime(milliseconds) {
  if (!Number.isFinite(milliseconds)) return "--";
  const seconds = milliseconds / 1000;
  return `${seconds < 10 ? seconds.toFixed(1) : Math.round(seconds)} 秒`;
}

function currentResponseRecordText() {
  const live = summarizeAttemptResponse();
  const stored = state.screen === "staff"
    ? state.learningStats.staff[staffCourse.id]?.lastResponse
    : state.learningStats.levels[activeLevel()?.id]?.lastResponse;
  const summary = live || stored;
  if (!summary) return "本轮未按键 · 只记录不限时";
  const prefix = live ? "本轮" : "上次";
  const hintCount = (summary.idleIdentityHints || 0) + (summary.idleLocatorHints || 0) + (summary.idleListenReplays || 0);
  return `${prefix}首答中位 ${formatResponseTime(summary.medianFirstResponseMs)} · 首答 ${summary.firstTryCorrect}/${summary.stepCount} · 提示 ${hintCount} · 不限时`;
}

function staffHintForNote(note) {
  const step = staffCourse.steps.find((item) => item.midi === note?.midi);
  return step ? friendlyStaffHint(step) : "";
}

function shouldShowKeyboardTarget(level, options = {}) {
  if (options.disableTarget) return false;
  if (typeof options.showTarget === "boolean") return options.showTarget;
  if (isListeningLevel(level)) return shouldRevealListeningTarget(level);
  if (level?.scaffold !== "light") return true;
  return state.lastInputResult === "wrong";
}

function markAttemptCue(strength) {
  if (!state.practiceAttempt || !strength || strength === "none") return;
  if (strength === "strong") {
    state.practiceAttempt.strongCueFrames = (state.practiceAttempt.strongCueFrames || 0) + 1;
    state.practiceAttempt.cueStrength = "strong";
    return;
  }
  state.practiceAttempt.softCueFrames = (state.practiceAttempt.softCueFrames || 0) + 1;
  if (state.practiceAttempt.cueStrength !== "strong") {
    state.practiceAttempt.cueStrength = "soft";
  }
}

function actionTextForPart(part) {
  if (!part) return "完成任务";
  return `${actionForPart(part)} ${part.label}`;
}

function storyRibbonCopyFor(level, part, target, options = {}) {
  const id = noteIdentity(target);
  const noteText = target.name;
  const shortLines = {
    M01: "地板还没落下",
    M02: "三颗灯睡着了",
    M03: "小车轮在找声音伙伴",
    M04: "短桥板要接上",
    M05: "火箭灯往下亮",
    M06: "大跳墙等 G",
    M07: "星灯要记顺序",
    M08: "屋顶一步步合上",
    FG01: "F 垫子等落下",
    FG02: "G 星门等打开",
    FG03: "三颗星排成梯",
    FG04: "先看星桥谱位"
  };
  if (options.levelComplete) {
    return {
      kicker: "完成",
      line: `${level.reward}亮了`,
      note: noteText,
      key: id.keyShort,
      staff: id.staffPrep
    };
  }
  if (options.isListening) {
    return {
      kicker: level.title,
      line: options.revealListeningTarget ? "小车轮再唱一次" : (shortLines[level.id] || "听一声"),
      note: options.revealListeningTarget ? noteText : "♪",
      key: options.revealListeningTarget ? id.keyShort : "",
      staff: ""
    };
  }
  if (options.isLevelCheckRun) {
    return {
      kicker: "少提示",
      line: "自己找这一音",
      note: noteText,
      key: id.keyShort,
      staff: id.staffPrep
    };
  }
  return {
    kicker: level.title,
    line: shortLines[level.id] || level.storyNeed || "帮星芽完成",
    note: noteText,
    key: id.keyShort,
    staff: id.staffPrep
  };
}

function roofBlueprintMode(level = activeLevel()) {
  if (level?.id !== "M08") return "";
  return isLevelReducedCueRun(level) ? "seal" : "install";
}

function successStoryFor(level, part, note, nextNote) {
  const id = noteIdentity(note);
  const nextId = nextNote ? noteIdentity(nextNote) : null;
  if (isListeningLevel(level)) {
    return {
      title: `${id.letter} 找到了`,
      subtitle: nextId ? `${partObjectLabel(part, note)}装好了 · 下一声先听再找` : `${partObjectLabel(part, note)}装好了`
    };
  }
  if (level?.id === "M06") {
    return {
      title: note?.name === "G" ? "G 高墙站起来" : `${id.letter} 墙板站稳`,
      subtitle: nextId ? `下一跳 ${nextId.letter} · ${nextId.keyShort}` : "大跳墙完成"
    };
  }
  if (level?.phase === "listen") {
    return {
      title: "听出来了",
      subtitle: `${id.letter} 找到小车轮的声音`
    };
  }
  if (level?.phase === "staffPrep") {
    return {
      title: `${id.letter} 铺到星桥前`,
      subtitle: nextId ? `下一格 ${nextId.letter} · ${nextId.keyShort}` : "桥前小地图完成"
    };
  }
  return {
    title: `${id.letter} 找到了`,
    subtitle: nextId ? `${actionTextForPart(part)} · 下一步 ${nextId.letter}` : actionTextForPart(part)
  };
}

function wrongStoryFor(level, target, heard) {
  const targetId = noteIdentity(target);
  const heardText = heard ? `刚才是 ${heard.name}` : "刚才还没听清";
  if (isReservedNote(heard)) {
    return {
      title: "这颗琴键后面学",
      subtitle: `先回到 ${targetId.letter} · ${targetId.keyShort}`
    };
  }
  if (level?.id === "M06") {
    return {
      title: "墙板还没站稳",
      subtitle: `${heardText}，大跳要找 ${targetId.letter} · ${targetId.keyShort}`
    };
  }
  if (isListeningLevel(level)) {
    return {
      title: "小车轮再唱一次",
      subtitle: `听声音，再找 ${targetId.letter} · ${targetId.keyShort}`
    };
  }
  return {
    title: "星芽指给你看",
    subtitle: `${heardText}，目标是 ${targetId.letter} · ${targetId.keyShort}`
  };
}

function playPromptFor(level, part, target) {
  const phase = phaseForLevel(level);
  const id = noteIdentity(target);
  const action = actionTextForPart(part);
  const need = level?.storyNeed || level?.prompt || phase.label;
  if (isListeningLevel(level)) {
    return `${need} 听一声，再点同样的琴键。`;
  }
  if (level?.phase === "check") {
    return `${need} 先读 ${id.letter}，再找 ${id.keyLong}。`;
  }
  if (level?.phase === "climb") {
    return `${need} ${id.letter} 在 ${id.keyLong}。`;
  }
  if (level?.phase === "leap") {
    return `${need} ${id.letter} 在 ${id.keyLong}。`;
  }
  if (level?.phase === "direction") {
    return `${need} 读 ${id.letter}，找 ${id.keyLong}。`;
  }
  return `${need} 读 ${id.letter}，找 ${id.keyLong}，${action}。`;
}

function instructionFeedbackFor(level, part, target) {
  const id = noteIdentity(target);
  if (isListeningLevel(level)) {
    return "听一声，找同样键。";
  }
  if (isLevelReducedCueRun(level)) {
    return `少提示：找 ${id.letter}。`;
  }
  if (id.staffPrep) {
    return `找 ${id.letter}：${id.keyShort} · ${id.staffPrep}。`;
  }
  return `${id.letter} · ${id.keyShort}，${actionTextForPart(part)}。`;
}

function wrongFeedbackFor(heard, target, staffStep = null) {
  const targetId = noteIdentity(target, staffStep);
  if (isReservedNote(heard)) {
    return `${heard.name} 后面学。先找 ${targetId.letter}：${targetId.keyShort}。`;
  }
  const heardText = heard ? `这是 ${heard.name}。` : "";
  const staffText = targetId.staffHint ? `${targetId.staffHint}，` : "";
  if (!staffStep && isListeningLevel()) {
    return `${heardText}再听一次，找 ${targetId.letter}：${targetId.keyShort}。`;
  }
  return `${heardText}要 ${targetId.letter}：${staffText}${targetId.keyShort}。`;
}

function staffSuccessStoryFor(target, targetStep, nextStep) {
  const targetId = noteIdentity(target, targetStep);
  const nextNote = nextStep ? noteForMidi(nextStep.midi) : null;
  const nextId = nextNote ? noteIdentity(nextNote, nextStep) : null;
  return {
    title: "落稳",
    subtitle: nextId ? `下一跳 ${nextId.letter}` : "到星门",
    feedback: `${targetId.letter} · ${targetId.staffHint}${nextId ? ` -> ${nextId.staffHint}` : " -> 星星门"}`,
    tip: nextId ? "下一跳" : "到星门"
  };
}

function staffWrongStoryFor(target, targetStep, heard) {
  const targetId = noteIdentity(target, targetStep);
  if (isReservedNote(heard)) {
    return {
      title: "后面学",
      subtitle: `先跳 ${targetId.letter}`,
      feedback: `${heard.name}后面 · ${targetId.letter} · ${targetId.staffHint} · ${targetId.keyShort}`,
      tip: "看亮垫"
    };
  }
  const heardText = heard ? `${heard.name} -> ` : "";
  return {
    title: "看落点",
    subtitle: `亮垫 ${targetId.letter}`,
    feedback: `${heardText}${targetId.letter} · ${targetId.staffHint} · ${targetId.keyShort}`,
    tip: "看落点"
  };
}

function ensureNoteStats(note) {
  const key = note?.name || "unknown";
  if (!state.learningStats.notes[key]) {
    state.learningStats.notes[key] = {
      attempts: 0,
      correct: 0,
      wrong: 0,
      firstTryCorrect: 0,
      firstTryMiss: 0,
      lastWrongHeard: ""
    };
  }
  return state.learningStats.notes[key];
}

function recordPracticeInput({ correct, target, heard, source = "屏幕" }) {
  if (!target) return;
  if (!state.practiceAttempt) {
    state.practiceAttempt = createPracticeAttempt(
      state.screen === "staff" ? "staff" : "level",
      state.screen === "staff" ? staffCourse.id : activeLevel().id,
      state.screen === "staff" ? state.staffRunMode : state.levelRunMode
    );
  }

  recordStepResponse({ correct, target, source });

  state.practiceAttempt.inputRoutes[source] = (state.practiceAttempt.inputRoutes[source] || 0) + 1;
  if (source === "麦克风") {
    state.practiceAttempt.hasExperimentalInput = true;
  }

  const noteStats = ensureNoteStats(target);
  noteStats.attempts += 1;
  if (correct) {
    noteStats.correct += 1;
    state.practiceAttempt.corrects += 1;
    if (!state.stepHadWrong) noteStats.firstTryCorrect += 1;
    return;
  }

  noteStats.wrong += 1;
  if (!state.stepHadWrong) noteStats.firstTryMiss += 1;
  noteStats.lastWrongHeard = heard ? `${heard.solfege}/${heard.name}` : "未知输入";
  state.practiceAttempt.wrongs += 1;
  state.practiceAttempt.wrongTargets[target.name] = (state.practiceAttempt.wrongTargets[target.name] || 0) + 1;
  state.practiceAttempt.lastWrong = heard
    ? `${target.solfege}/${target.name} 被按成 ${heard.solfege}/${heard.name}`
    : `${target.solfege}/${target.name} 没找到`;
  state.stepHadWrong = true;
}

function levelNeedsReducedCueReplay(level) {
  if (!level) return false;
  if (level.scaffold === "light") return true;
  if (level.phase === "staffPrep") return true;
  if (["M08", "FG01", "FG02", "FG03", "FG04"].includes(level.id)) return true;
  return false;
}

function levelSupportsReducedCueEvidence(level) {
  if (!level || level.id === "M01") return false;
  if (["M02", "M04", "M05", "M06"].includes(level.id)) return true;
  return levelNeedsReducedCueReplay(level);
}

function isLevelReducedCueRun(level, runMode = state.levelRunMode) {
  if (runMode !== "check") return false;
  const action = currentSessionAction();
  return levelSupportsReducedCueEvidence(level) || Boolean(action?.forceReducedCue && action.targetId === level?.id);
}

function hasVerifiedStableLevel(level, stored) {
  if (!level || level.id === "M01") return false;
  const skillKey = evidenceSkillKey("level", level.id);
  const hasEvent = state.learningStats.retention.stableEvents.some((event) => event.skillKey === skillKey);
  if (hasEvent) return true;
  const legacyStableCount = Number(stored?.stableCompletions) || 0;
  return isListeningLevel(level) ? legacyStableCount >= 2 : legacyStableCount > 0;
}

function isStableLevelAttempt(level, attempt = state.practiceAttempt) {
  if (!level || !attempt) return false;
  if (attempt.hasExperimentalInput) return false;
  if (level.id === "M01") {
    return false;
  }
  if (isListeningLevel(level)) {
    return attempt.wrongs === 0 && (attempt.strongCueFrames || 0) === 0;
  }
  if (!levelSupportsReducedCueEvidence(level)) return false;
  return attempt.runMode === "check" &&
    attempt.wrongs <= 1 &&
    (attempt.strongCueFrames || 0) === 0;
}

function isStableStaffAttempt(attempt = state.practiceAttempt) {
  return Boolean(
    attempt?.kind === "staff" &&
    !isMiniStaffSession() &&
    !attempt.hasExperimentalInput &&
    attempt.runMode === "check" &&
    attempt.wrongs <= 2 &&
    (attempt.strongCueFrames || 0) === 0 &&
    !staffRemediationPlan(attempt)
  );
}

function evidenceEventId(prefix) {
  const random = window.crypto?.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  return `${prefix}-${random}`;
}

function evidenceSkillKey(kind, id) {
  return `${kind}:${id}`;
}

function validFormalEvidenceAttempt(attempt) {
  return Boolean(
    attempt?.formalSession &&
    attempt.sessionId &&
    attempt.localDateKey &&
    /^\d{4}-\d{2}-\d{2}$/.test(attempt.localDateKey) &&
    attempt.sessionStartedAt &&
    Number.isFinite(isoTimeMs(attempt.sessionStartedAt))
  );
}

function recordClockInvalidEvent(attempt, completedAt, reason) {
  const retention = state.learningStats.retention;
  retention.clockInvalidEvents.push({
    eventId: evidenceEventId("clock-invalid"),
    evidenceType: "clock-invalid",
    sessionId: attempt?.sessionId || null,
    bundleId: attempt?.bundleId || null,
    sessionActionId: attempt?.sessionActionId || null,
    sessionStartedAt: attempt?.sessionStartedAt || null,
    completedAt: completedAt || null,
    reason,
    recordedAt: new Date().toISOString()
  });
  retention.clockInvalidEvents = retention.clockInvalidEvents.slice(-80);
}

function advanceRetentionWallClock(completedAt, attempt) {
  const retention = state.learningStats.retention;
  const completedMs = isoTimeMs(completedAt);
  const sessionStartedMs = isoTimeMs(attempt?.sessionStartedAt);
  if (!Number.isFinite(completedMs)) {
    recordClockInvalidEvent(attempt, completedAt, "invalid-completed-at");
    return false;
  }
  if (!Number.isFinite(sessionStartedMs)) {
    recordClockInvalidEvent(attempt, completedAt, "invalid-session-started-at");
    return false;
  }
  if (completedMs < sessionStartedMs) {
    recordClockInvalidEvent(attempt, completedAt, "completion-before-session-start");
    return false;
  }
  if (retention.lastWallClockAt) {
    const previousMs = isoTimeMs(retention.lastWallClockAt);
    if (!Number.isFinite(previousMs)) {
      recordClockInvalidEvent(attempt, completedAt, "invalid-last-wall-clock");
      return false;
    }
    const sameSessionWallClock = retention.lastWallClockSessionId === attempt?.sessionId;
    if (!sameSessionWallClock && sessionStartedMs < previousMs) {
      recordClockInvalidEvent(attempt, completedAt, "session-start-before-last-wall-clock");
      return false;
    }
    if (completedMs < previousMs) {
      recordClockInvalidEvent(attempt, completedAt, "wall-clock-rollback");
      return false;
    }
  }
  retention.lastWallClockAt = completedAt;
  retention.lastWallClockSessionId = attempt?.sessionId || null;
  return true;
}

function latestEligibleStableAnchor(skillKey, attempt, completedAt) {
  const completedMs = isoTimeMs(completedAt);
  const sessionStartedMs = isoTimeMs(attempt?.sessionStartedAt);
  if (!Number.isFinite(completedMs) || !Number.isFinite(sessionStartedMs)) return null;
  return state.learningStats.retention.stableEvents
    .filter((event) => {
      const stableMs = isoTimeMs(event.completedAt);
      return event.skillKey === skillKey &&
        event.sessionId &&
        event.sessionId !== attempt.sessionId &&
        event.localDateKey &&
        /^\d{4}-\d{2}-\d{2}$/.test(event.localDateKey) &&
        event.localDateKey !== attempt.localDateKey &&
        Number.isFinite(stableMs) &&
        stableMs <= sessionStartedMs &&
        completedMs >= stableMs &&
        completedMs - stableMs >= RETENTION_MIN_INTERVAL_MS;
    })
    .sort((a, b) => isoTimeMs(b.completedAt) - isoTimeMs(a.completedAt))[0] || null;
}

function baseEvidenceEvent({ skillKey, kind, id, attempt, completedAt }) {
  return {
    skillKey,
    levelId: kind === "level" ? id : null,
    staffCourseId: kind === "staff" ? id : null,
    sessionId: attempt.sessionId,
    bundleId: attempt.bundleId,
    sessionActionId: attempt.sessionActionId,
    sessionRole: attempt.sessionRole,
    reviewSkillKey: attempt.reviewSkillKey,
    completedAt,
    localDateKey: attempt.localDateKey,
    runMode: attempt.runMode,
    wrongCount: attempt.wrongs || 0,
    cueStrength: attempt.cueStrength || "none",
    strongCueFrames: attempt.strongCueFrames || 0,
    inputRoutes: { ...(attempt.inputRoutes || {}) },
    experimentalInput: Boolean(attempt.hasExperimentalInput),
    thresholdVersion: RETENTION_THRESHOLD_VERSION
  };
}

function isEligibleOpeningReviewAttempt(attempt, skillKey) {
  const session = state.activeSession;
  const action = currentSessionAction(session);
  if (!session || !action || session.status !== "active") return false;
  const reviewActions = session.actions.filter((item) => item.role === "opening-review");
  return attempt.sessionRole === "opening-review" &&
    attempt.requiredReview === true &&
    attempt.reviewSkillKey === skillKey &&
    action.role === "opening-review" &&
    action.reviewSkillKey === skillKey &&
    session.reviewSkillKey === skillKey &&
    session.voluntaryReplay !== true &&
    session.actionIndex === 0 &&
    session.completedActions.length === 0 &&
    reviewActions.length === 1;
}

function recordRetentionEvidence({ kind, id, attempt, stable, priorStableCompletions, completedAt }) {
  if (!attempt?.formalSession) return { stableEvent: null, retainedEvent: null, clockValid: null };
  if (!validFormalEvidenceAttempt(attempt)) {
    recordClockInvalidEvent(attempt, completedAt, "invalid-formal-evidence-fields");
    return { stableEvent: null, retainedEvent: null, clockValid: false };
  }
  const clockValid = advanceRetentionWallClock(completedAt, attempt);
  if (!clockValid) return { stableEvent: null, retainedEvent: null, clockValid: false };

  const skillKey = evidenceSkillKey(kind, id);
  const reducedCuePass = stable &&
    attempt.cueStrength !== "strong" &&
    (attempt.strongCueFrames || 0) === 0;
  const m03ThresholdMet = id !== "M03" || (Number(priorStableCompletions) || 0) + 1 >= 2;
  const qualifyingStable = reducedCuePass && m03ThresholdMet;
  const baseEvent = baseEvidenceEvent({ skillKey, kind, id, attempt, completedAt });
  let retainedEvent = null;
  let stableEvent = null;

  if (qualifyingStable) {
    const anchor = latestEligibleStableAnchor(skillKey, attempt, completedAt);
    const openingReviewEligible = isEligibleOpeningReviewAttempt(attempt, skillKey);
    if (openingReviewEligible && anchor && !state.learningStats.retention.retainedEvents.some((event) => event.skillKey === skillKey && event.sessionId === attempt.sessionId)) {
      retainedEvent = {
        ...baseEvent,
        eventId: evidenceEventId("retained"),
        evidenceType: "retained",
        anchorStableEventId: anchor.eventId,
        elapsedFromStableMs: isoTimeMs(completedAt) - isoTimeMs(anchor.completedAt)
      };
      state.learningStats.retention.retainedEvents.push(retainedEvent);
    }

    stableEvent = {
      ...baseEvent,
      eventId: evidenceEventId("stable"),
      evidenceType: "stable"
    };
    state.learningStats.retention.stableEvents.push(stableEvent);
  }

  return { stableEvent, retainedEvent, clockValid: true };
}

function shouldUpdatePracticeNeed(attempt) {
  return Boolean(attempt?.requiredReview || attempt?.runMode === "check");
}

function updatePracticeNeed(existing, attempt, stable, completedAt) {
  const repairNeedsPractice = (attempt?.assistedSuccesses || 0) > 0 || (attempt?.wrongs || 0) >= 3;
  if (repairNeedsPractice) {
    existing.needsPractice = true;
    existing.todayNeedsPractice = true;
    existing.todayNeedsPracticeDate = localDateKeyAt(completedAt);
    return;
  }
  if (!shouldUpdatePracticeNeed(attempt)) return;
  existing.needsPractice = !stable;
  existing.todayNeedsPractice = !stable;
  existing.todayNeedsPracticeDate = localDateKeyAt(completedAt);
}

function finalizeLevelStats(level) {
  if (!level) return;
  const attempt = state.practiceAttempt || createPracticeAttempt("level", level.id, state.levelRunMode);
  const stable = isStableLevelAttempt(level, attempt);
  const existing = state.learningStats.levels[level.id] || {
    completions: 0,
    stableCompletions: 0,
    lastWrongCount: 0,
    lastWrong: "",
    lastCueStrength: "none",
    lastStrongCueFrames: 0,
    lastRunMode: "guided",
    needsPractice: false
  };
  existing.completions += 1;
  existing.lastWrongCount = attempt.wrongs;
  existing.lastWrong = attempt.lastWrong;
  existing.lastCueStrength = attempt.cueStrength || "none";
  existing.lastStrongCueFrames = attempt.strongCueFrames || 0;
  existing.lastRunMode = attempt.runMode || state.levelRunMode || "guided";
  existing.lastInputRoutes = attempt.inputRoutes || {};
  existing.lastExperimentalInput = !!attempt.hasExperimentalInput;
  existing.lastResponse = summarizeAttemptResponse(attempt);
  const completedAt = new Date().toISOString();
  existing.lastCompletedAt = completedAt;
  existing.lastAttempt = {
    completedAt,
    runMode: attempt.runMode || state.levelRunMode || "guided",
    wrongCount: attempt.wrongs || 0,
    correctCount: attempt.corrects || 0,
    strongCueFrames: attempt.strongCueFrames || 0,
    requiredReview: Boolean(attempt.requiredReview),
    assistedSuccesses: attempt.assistedSuccesses || 0,
    modeledSuccesses: attempt.modeledSuccesses || 0,
    modeledInputs: [...(attempt.modeledInputs || [])],
    inputRoutes: { ...(attempt.inputRoutes || {}) }
  };
  if (attempt.formalSession) {
    existing.formalCompletions = (Number(existing.formalCompletions) || 0) + 1;
    existing.lastFormalCompletedAt = completedAt;
  }
  state.learningStats.levels[level.id] = existing;
  const evidence = recordRetentionEvidence({
    kind: "level",
    id: level.id,
    attempt,
    stable,
    priorStableCompletions: existing.stableCompletions,
    completedAt
  });
  const stableEvidenceAccepted = stable && evidence.clockValid === true;
  if (stableEvidenceAccepted) existing.stableCompletions += 1;
  if (attempt.formalSession) updatePracticeNeed(existing, attempt, stableEvidenceAccepted, completedAt);
  saveLearningStats();
}

function finalizeStaffStats() {
  const attempt = state.practiceAttempt || createPracticeAttempt("staff", staffCourse.id, state.staffRunMode);
  const stable = isStableStaffAttempt(attempt);
  const existing = state.learningStats.staff[staffCourse.id] || {
    completions: 0,
    stableCompletions: 0,
    lastWrongCount: 0,
    lastWrong: "",
    lastCueStrength: "none",
    lastStrongCueFrames: 0,
    lastRunMode: "guided",
    needsPractice: false
  };
  existing.completions += 1;
  existing.lastWrongCount = attempt.wrongs;
  existing.lastWrong = attempt.lastWrong;
  existing.lastCueStrength = attempt.cueStrength || "none";
  existing.lastStrongCueFrames = attempt.strongCueFrames || 0;
  existing.lastRunMode = attempt.runMode || state.staffRunMode || "guided";
  existing.lastInputRoutes = attempt.inputRoutes || {};
  existing.lastExperimentalInput = !!attempt.hasExperimentalInput;
  existing.lastResponse = summarizeAttemptResponse(attempt);
  const completedAt = new Date().toISOString();
  existing.lastCompletedAt = completedAt;
  existing.lastAttempt = {
    completedAt,
    runMode: attempt.runMode || state.staffRunMode || "guided",
    wrongCount: attempt.wrongs || 0,
    correctCount: attempt.corrects || 0,
    strongCueFrames: attempt.strongCueFrames || 0,
    requiredReview: Boolean(attempt.requiredReview),
    assistedSuccesses: attempt.assistedSuccesses || 0,
    modeledSuccesses: attempt.modeledSuccesses || 0,
    modeledInputs: [...(attempt.modeledInputs || [])],
    inputRoutes: { ...(attempt.inputRoutes || {}) }
  };
  if (attempt.formalSession) {
    existing.formalCompletions = (Number(existing.formalCompletions) || 0) + 1;
    existing.lastFormalCompletedAt = completedAt;
  }
  state.learningStats.staff[staffCourse.id] = existing;
  const evidence = recordRetentionEvidence({
    kind: "staff",
    id: staffCourse.id,
    attempt,
    stable,
    priorStableCompletions: existing.stableCompletions,
    completedAt
  });
  const stableEvidenceAccepted = stable && evidence.clockValid === true;
  if (stableEvidenceAccepted) existing.stableCompletions += 1;
  if (attempt.formalSession) updatePracticeNeed(existing, attempt, stableEvidenceAccepted, completedAt);
  saveLearningStats();
}

function hasVerifiedStableStaff(stored = state.learningStats.staff[staffCourse.id]) {
  const hasEvent = state.learningStats.retention.stableEvents.some((event) => event.skillKey === evidenceSkillKey("staff", staffCourse.id));
  return hasEvent || (Number(stored?.stableCompletions) || 0) > 0;
}

function retainedEvidenceForSkill(skillKey) {
  return state.learningStats.retention.retainedEvents.some((event) => event.skillKey === skillKey);
}

function usesLs04ParentEvidence() {
  if (currentListeningAction()) return true;
  return state.screen === "map" && Boolean(
    state.chapter3.lessonEvidence.LS04?.completedAt ||
    state.chapter3.ls04Attempts?.length
  );
}

function currentEvidenceState() {
  if (usesLs04ParentEvidence()) {
    const stored = state.learningStats.levels.LS04 || {};
    const skillKey = evidenceSkillKey("level", "LS04");
    return {
      played: (Number(stored.completions) || 0) > 0,
      stable: (Number(stored.stableCompletions) || 0) > 0 || state.learningStats.retention.stableEvents.some((event) => event.skillKey === skillKey),
      retained: retainedEvidenceForSkill(skillKey),
      todayNeedsPractice: stored.todayNeedsPractice === true && stored.todayNeedsPracticeDate === localDateKeyAt(),
      lastWrongCount: Number(stored.lastWrongCount) || 0,
      mini: false,
      ls04: true
    };
  }
  if (state.screen === "garden") {
    const lesson = currentGardenLesson();
    return {
      played: Boolean(lesson && state.chapter3.lessonEvidence[lesson.id]?.completedAt),
      stable: false,
      retained: false,
      todayNeedsPractice: false,
      lastWrongCount: state.gardenWrongCount,
      mini: true
    };
  }
  if (state.screen === "staff") {
    const stored = state.learningStats.staff[staffCourse.id] || {};
    const mini = isMiniStaffSession();
    return {
      played: mini ? state.learningStats.retention.observationEvents.some((event) => event.skillKey === "staff:S01-mini") : (Number(stored.completions) || 0) > 0,
      stable: mini ? false : hasVerifiedStableStaff(stored),
      retained: mini ? false : retainedEvidenceForSkill(evidenceSkillKey("staff", staffCourse.id)),
      todayNeedsPractice: !mini && stored.todayNeedsPractice === true && stored.todayNeedsPracticeDate === localDateKeyAt(),
      lastWrongCount: Number(stored.lastWrongCount) || 0,
      mini
    };
  }

  const level = activeLevel();
  const stored = state.learningStats.levels[level?.id] || {};
  return {
    played: (Number(stored.completions) || 0) > 0,
    stable: hasVerifiedStableLevel(level, stored),
    retained: retainedEvidenceForSkill(evidenceSkillKey("level", level?.id || "")),
    todayNeedsPractice: stored.todayNeedsPractice === true && stored.todayNeedsPracticeDate === localDateKeyAt(),
    lastWrongCount: Number(stored.lastWrongCount) || 0,
    mini: false
  };
}

function currentMasterySummary() {
  const evidence = currentEvidenceState();
  if (state.screen === "garden" && !evidence.ls04) {
    return {
      ...evidence,
      status: evidence.played ? "完成本片叶的可见练习" : "正在认识名称与键位",
      detail: "本切片只记录可见提示下的学习过程，不写入稳定或隔日保留。"
    };
  }
  if (evidence.retained) {
    return {
      ...evidence,
      status: "隔日再次减提示完成",
      detail: evidence.todayNeedsPractice
        ? "历史记录保留；今天需要提示，下次再找一次。"
        : "在另一次、另一天的短课里再次完成。"
    };
  }
  if (evidence.stable) {
    return {
      ...evidence,
      status: "本次减提示完成",
      detail: evidence.todayNeedsPractice
        ? "减提示记录保留；今天需要提示，下次再找一次。"
        : "这次是在较少提示下完成的。"
    };
  }
  if (evidence.played) {
    return {
      ...evidence,
      status: "在故事帮助下玩过",
      detail: evidence.todayNeedsPractice
        ? "今天需要提示，下次再找一次。"
        : (evidence.mini ? "这是前三跳观察小段，不写入完整谱桥记录。" : "后面会在更少提示下再找一次。")
    };
  }
  return {
    ...evidence,
    status: "还没有完成记录",
    detail: "先跟着故事完成这一小段。"
  };
}

const fgBridgeGateLevelIds = ["FG01", "FG02", "FG03", "FG04"];

function fgBridgeReadiness() {
  const weak = fgBridgeGateLevelIds.filter((levelId) => {
    const stored = state.learningStats.levels[levelId];
    return !(stored?.stableCompletions > 0);
  });
  const nextLevelId = weak[0] || null;
  const nextLevel = levels.find((level) => level.id === nextLevelId) || null;
  return {
    ready: weak.length === 0,
    weak,
    nextLevelId,
    nextLevel,
    message: nextLevel
      ? `先把 ${nextLevel.title} 练稳，再跳谱线星桥。`
      : "F/G 已准备好，可以跳谱线星桥。"
  };
}

function staffFgSupportInfo(step = activeStaffStep()) {
  const note = noteForMidi(step?.midi);
  if (!note || !["F", "G"].includes(note.name)) {
    return { needed: false, note: null, weak: [], source: "" };
  }

  const readiness = fgBridgeReadiness();
  const weakForNote = readiness.weak.filter((levelId) => {
    if (levelId === "FG03" || levelId === "FG04") return true;
    if (note.name === "F") return levelId === "FG01";
    if (note.name === "G") return levelId === "FG02";
    return false;
  });
  const currentMisses = state.practiceAttempt?.wrongTargets?.[note.name] || 0;
  const needed = weakForNote.length > 0 || currentMisses > 0;
  return {
    needed,
    note,
    weak: weakForNote,
    source: currentMisses > 0 ? "missed-in-bridge" : weakForNote.length ? "weak-prep" : "",
    label: note.name === "F" ? "F 加固" : "G 加固"
  };
}

function routeToFgPrep(readiness = fgBridgeReadiness()) {
  if (readiness.ready || !readiness.nextLevelId) return false;
  goToLevelId(readiness.nextLevelId);
  els.feedback.classList.remove("good");
  els.feedback.classList.add("bad");
  els.feedback.textContent = readiness.message;
  if (els.dinoHint) els.dinoHint.textContent = "先练稳 F/G，再去星桥。";
  if (els.modeHint) els.modeHint.textContent = "谱桥入口会等 F/G 稳定后打开。";
  return true;
}

function staffRemediationPlan(attempt = state.practiceAttempt) {
  if (!attempt || attempt.kind !== "staff") return null;
  const fWrongs = attempt.wrongTargets?.F || 0;
  const gWrongs = attempt.wrongTargets?.G || 0;
  const fgWrongs = fWrongs + gWrongs;
  if (fgWrongs < 2) return null;

  let levelId = "FG03";
  if (fWrongs >= 2 && gWrongs < 2) levelId = "FG01";
  if (gWrongs >= 2 && fWrongs < 2) levelId = "FG02";
  const level = levels.find((item) => item.id === levelId) || levels.find((item) => item.id === "FG03");
  const focus = fWrongs >= 2 && gWrongs >= 2
    ? "F 和 G"
    : fWrongs >= 2
    ? "F"
    : gWrongs >= 2
    ? "G"
    : "F/G";
  return {
    levelId: level?.id || "FG03",
    level,
    focus,
    fWrongs,
    gWrongs,
    message: `${focus} 在星桥上晃了两次，先回预备关加固一下。`
  };
}

function routeToStaffRemediation(plan = staffRemediationPlan()) {
  if (!plan?.levelId) return false;
  state.staffComplete = false;
  state.staffRunMode = "guided";
  goToLevelId(plan.levelId);
  els.feedback.classList.remove("good");
  els.feedback.classList.add("bad");
  els.feedback.textContent = plan.message;
  if (els.dinoHint) els.dinoHint.textContent = `${plan.focus} 先站稳，再回来跳星桥。`;
  if (els.modeHint) els.modeHint.textContent = "这是星桥回来的小练习，不是惩罚。";
  return true;
}

function currentLearningSummary() {
  if (usesLs04ParentEvidence()) {
    return {
      focus: "C/D 小音组 · 听后找键",
      detail: "C = Do，D = Re；比较两个声音并在琴键上找同一个音，不是绝对音感测试。"
    };
  }
  if (state.screen === "garden") {
    const lesson = currentGardenLesson();
    return lesson
      ? {
        focus: `${lesson.letter} / ${lesson.solfege} · ${lesson.locator}`,
        detail: `${lesson.id} 可见名称与键位教学 · 不进入 mastery 复习队列`
      }
      : {
        focus: "C-D-E 三片音符叶",
        detail: "花园可见切片完成 · 不进入 mastery 复习队列"
      };
  }
  if (state.screen === "staff") {
    if (isMiniStaffSession()) {
      const step = activeStaffStep() || activeStaffSteps()[activeStaffStepCount() - 1];
      const note = noteForMidi(step?.midi) || notes[0];
      const id = noteIdentity(note, step);
      return state.staffComplete
        ? {
          focus: "星桥前三跳观察 · 小休息星",
          detail: "只验证 Do-Re-Mi 谱桥跳跃理解，不写入完整 C-G 谱桥稳定。"
        }
        : {
          focus: `前三跳 · ${id.full}`,
          detail: `看亮垫跳到小休息星 · ${id.keyLong}`
        };
    }
    const stored = state.learningStats.staff[staffCourse.id];
    if (hasVerifiedStableStaff(stored)) {
      return {
        focus: "星桥 C-G 谱位 · 已稳定",
        detail: "Do/Re/Mi/Fa/Sol：谱位、唱名、键位已完成少提示复读。"
      };
    }
    if (state.practiceAttempt?.runMode === "check") {
      return {
        focus: "星桥 C-G 谱位 · 少提示复读",
        detail: "看谱位和唱名自己找 C-D-E-F-G，不亮目标键。"
      };
    }
    if (state.staffComplete || stored?.completions > 0) {
      return {
        focus: "星桥 C-G 谱位",
        detail: "已跳到终点；下一遍少提示复读才算稳定。"
      };
    }
    const step = activeStaffStep() || activeStaffSteps()[activeStaffStepCount() - 1];
    const note = noteForMidi(step?.midi) || notes[0];
    const id = noteIdentity(note, step);
    return {
      focus: `${id.full} · ${id.keyLong}`,
      detail: `看谱跳桥 · 谱位${id.staffHint || id.staffPrep} · ${scaffoldLabels.staff}`
    };
  }

  const level = activeLevel();
  const target = noteForMidi(activeTargetMidi()) || notes[0];
  const id = noteIdentity(target);
  const phase = phaseForLevel(level);
  const scaffold = scaffoldLabels[level?.scaffold] || "提示";
  if (isListeningLevel(level)) {
    return {
      focus: `${id.full} · 听声音找键`,
      detail: `会唱小车轮 · 不靠麦克风 · ${id.keyLong}`
    };
  }
  if (state.levelRunMode === "check") {
    return {
      focus: `${id.full} · 少提示找键`,
      detail: `${phase.label} · 少提示复练${id.staffPrep ? ` · 谱位${id.staffPrep}` : ""}`
    };
  }
  return {
    focus: `${id.full} · ${id.keyLong}`,
    detail: `${phase.label} · ${scaffold}${id.staffPrep ? ` · 谱位${id.staffPrep}` : ""}`
  };
}

function staffDinoTipForStep(step) {
  if (!step) return "跳亮垫";
  if (state.lastInputResult === "wrong") return "看落点";
  if (state.staffRunMode === "check") return "自己找";
  return "跳亮垫";
}

function render() {
  renderShellMode();
  if (state.screen === "map") {
    renderMapScreen();
    refreshParentPanelIfOpen();
    return;
  }

  if (state.screen === "staff") {
    renderStaffScreen();
    refreshParentPanelIfOpen();
    return;
  }

  if (state.screen === "garden") {
    renderGardenScreen();
    refreshParentPanelIfOpen();
    return;
  }

  const level = activeLevel();
  const target = noteForMidi(activeTargetMidi()) || notes[0];
  const part = activePart(level);
  const phase = phaseForLevel(level);
  const targetId = noteIdentity(target);
  const visualPart = part || level.parts[level.parts.length - 1] || null;
  const visualPartNote = noteForMidi(visualPart?.midi) || target;
  const stepLabel = activeStepLabel(level);
  const rawPartColor = part?.color || target.color;
  const partImage = imageForPart(visualPart);
  const levelComplete = state.stepIndex >= level.parts.length;
  const isLevelCheckRun = isLevelReducedCueRun(level);
  const isListening = isListeningLevel(level);
  const revealListeningTarget = shouldRevealListeningTarget(level);
  const hideListeningIdentity = shouldHideListeningIdentity(level);
  const suppressListeningObjectIdentity = shouldSuppressListeningObjectIdentity(level);
  const partColor = hideListeningIdentity ? LISTENING_IDENTITY_NEUTRAL : rawPartColor;
  const objectPartColor = suppressListeningObjectIdentity ? LISTENING_IDENTITY_NEUTRAL : partColor;
  const displayStepLabel = suppressListeningObjectIdentity ? "听声音找琴键" : stepLabel;
  const showLevelTarget = !levelComplete && (!isLevelCheckRun || state.lastInputResult === "wrong");
  const targetIndex = Math.max(0, notes.findIndex((note) => note.midi === target.midi));
  const targetCenterNumber = ((targetIndex + 0.5) / notes.length) * 100;
  const targetCenter = `${targetCenterNumber.toFixed(3)}%`;
  const energyEndX = 57;
  const energyEndY = 43;
  const energyControlX = targetCenterNumber < energyEndX
    ? targetCenterNumber + (energyEndX - targetCenterNumber) * 0.52
    : energyEndX + (targetCenterNumber - energyEndX) * 0.36;
  const energyControlY = targetCenterNumber < energyEndX ? 55 : 50;
  const energyPath = `M ${targetCenterNumber.toFixed(2)} 91 Q ${energyControlX.toFixed(2)} ${energyControlY} ${energyEndX} ${energyEndY}`;

  const roofMode = roofBlueprintMode(level);
  if (els.mainTitle) {
    els.mainTitle.textContent = isListening
      ? "会唱小车轮"
      : roofMode === "seal"
      ? "月亮屋顶检查"
      : (isLevelCheckRun ? "少提示练习" : "月球基地");
  }
  els.levelBadge.textContent = isLevelCheckRun ? `${level.id}·复` : level.id;
  if (els.appShell) {
    els.appShell.dataset.phase = level.phase || "explore";
    els.appShell.dataset.scaffold = isLevelCheckRun ? "level-check" : (level.scaffold || "strong");
    els.appShell.dataset.levelId = level.id;
    els.appShell.dataset.levelRunMode = state.levelRunMode;
    els.appShell.dataset.listeningIdentityHidden = hideListeningIdentity ? "true" : "false";
    els.appShell.dataset.levelComplete = levelComplete ? "true" : "false";
    if (roofMode) els.appShell.dataset.roofMode = roofMode;
    else delete els.appShell.dataset.roofMode;
  }
  if (els.moonYard) {
    els.moonYard.dataset.phase = level.phase || "explore";
    els.moonYard.dataset.scaffold = isLevelCheckRun ? "level-check" : (level.scaffold || "strong");
    els.moonYard.dataset.levelId = level.id;
    els.moonYard.dataset.levelRunMode = state.levelRunMode;
    els.moonYard.dataset.listeningIdentityHidden = hideListeningIdentity ? "true" : "false";
    els.moonYard.dataset.levelComplete = levelComplete ? "true" : "false";
    if (roofMode) els.moonYard.dataset.roofMode = roofMode;
    else delete els.moonYard.dataset.roofMode;
  }
  if (els.m03WheelReplay) els.m03WheelReplay.hidden = level.id !== "M03" || levelComplete;
  if (els.m03InstructionStatus) {
    els.m03InstructionStatus.hidden = level.id !== "M03";
    els.m03InstructionStatus.textContent = levelComplete
      ? "两个车轮都找到了声音，小车准备好了。"
      : "小车轮先唱，你弹同样的琴键。";
  }
  els.stageTitle.textContent = levelComplete ? `${level.reward}完成` : displayStepLabel;
  if (els.chapterTitle) els.chapterTitle.textContent = isListening
    ? "听小车轮 · 声音配对"
    : (isLevelCheckRun ? "少提示复练 · 自己找键" : `${phase.label} · ${scaffoldLabels[level.scaffold] || "提示"}`);
  els.levelTitle.textContent = levelComplete ? `${level.reward}完成` : level.title;
  els.levelPrompt.textContent = levelComplete
    ? "自动去下一步。"
    : isListening
    ? "小车轮在找声音伙伴。"
    : isLevelCheckRun
    ? `读 ${targetId.letter}，自己找键。`
    : (level.prompt || playPromptFor(level, part, target));
  els.rewardCard.querySelector("strong").textContent = displayStepLabel;
  els.rewardCard.querySelector("small").textContent = "这一步要帮忙";
  els.rewardCard.style.setProperty("--part-color", objectPartColor);
  els.rewardCard.style.setProperty("--part-color-soft", alpha(objectPartColor, 0.18));
  els.rewardCard.querySelector(".reward-brick").style.setProperty("--part-image", imageCssUrl(partImage));
  els.hangingPart.querySelector("strong").textContent = displayStepLabel;
  els.hangingPart.style.setProperty("--part-color", objectPartColor);
  els.hangingPart.style.setProperty("--part-color-soft", alpha(objectPartColor, 0.18));
  els.hangingPart.style.setProperty("--part-image", imageCssUrl(partImage));
  els.hangingPart.dataset.shape = visualPart?.shape || part?.shape || "brick";
  if (suppressListeningObjectIdentity) {
    delete els.hangingPart.dataset.noteName;
    delete els.hangingPart.dataset.solfege;
  } else {
    els.hangingPart.dataset.noteName = visualPartNote.name;
    els.hangingPart.dataset.solfege = visualPartNote.solfege;
  }
  els.hangingPart.dataset.identityHidden = suppressListeningObjectIdentity ? "true" : "false";
  if (level.id === "M08") {
    els.hangingPart.dataset.blueprintStep = String(Math.min(level.parts.length, state.stepIndex + 1));
    els.hangingPart.dataset.roofMode = roofMode;
  } else {
    delete els.hangingPart.dataset.blueprintStep;
    delete els.hangingPart.dataset.roofMode;
  }
  els.hangingPart.classList.add("drop-hint");
  if (els.hangingPartArt) els.hangingPartArt.style.setProperty("--part-image", imageCssUrl(partImage));
  if (els.hangingPartBadge) {
    els.hangingPartBadge.hidden = suppressListeningObjectIdentity;
    els.hangingPartBadge.innerHTML = suppressListeningObjectIdentity
      ? ""
      : `<b>${visualPartNote.name}</b>`;
    els.hangingPartBadge.style.setProperty("--note-color", suppressListeningObjectIdentity ? LISTENING_IDENTITY_NEUTRAL : visualPartNote.color);
  }
  if (els.hangingPartLabel) els.hangingPartLabel.textContent = partObjectLabel(visualPart, visualPartNote);
  if (els.moonYard) {
    [...els.moonYard.classList]
      .filter((className) => className.startsWith("yard-scene-"))
      .forEach((className) => els.moonYard.classList.remove(className));
    els.moonYard.classList.add(`yard-scene-${level.scene || "blocks"}`);
    els.moonYard.style.setProperty("--target-color", partColor);
    els.moonYard.style.setProperty("--target-soft", alpha(partColor, 0.16));
    els.moonYard.style.setProperty("--target-glow", alpha(partColor, 0.28));
    els.moonYard.style.setProperty("--target-key-center", targetCenter);
    if (level.scene === "floor") {
      els.moonYard.style.setProperty("--floor-carry-left", `${floorCarrySlot.left}%`);
      els.moonYard.style.setProperty("--floor-carry-top", state.stepIndex >= level.parts.length ? "142px" : `${floorCarrySlot.top}px`);
    } else {
      els.moonYard.style.removeProperty("--floor-carry-left");
      els.moonYard.style.removeProperty("--floor-carry-top");
    }
    if (level.scene === "roof") {
      const slotIndex = Math.min(state.stepIndex, roofCarrySlots.length - 1);
      const slot = roofCarrySlots[Math.max(0, slotIndex)];
      els.moonYard.style.setProperty("--roof-carry-left", `${slot.left}%`);
      els.moonYard.style.setProperty("--roof-carry-top", state.stepIndex >= level.parts.length ? "130px" : `${slot.top}px`);
    } else {
      els.moonYard.style.removeProperty("--roof-carry-left");
      els.moonYard.style.removeProperty("--roof-carry-top");
    }
    if (level.scene === "lights") {
      const slotIndex = Math.max(0, Math.min(state.stepIndex, lightCarrySlots.length - 1));
      const slot = lightCarrySlots[slotIndex];
      els.moonYard.style.setProperty("--light-carry-left", `${slot.left}%`);
      els.moonYard.style.setProperty("--light-carry-top", state.stepIndex >= level.parts.length ? "78px" : `${slot.top}px`);
    } else {
      els.moonYard.style.removeProperty("--light-carry-left");
      els.moonYard.style.removeProperty("--light-carry-top");
    }
    if (level.scene === "rocket") {
      const slotIndex = Math.max(0, Math.min(state.stepIndex, rocketCarrySlots.length - 1));
      const slot = rocketCarrySlots[slotIndex];
      els.moonYard.style.setProperty("--rocket-carry-left", `${slot.left}%`);
      els.moonYard.style.setProperty("--rocket-carry-top", state.stepIndex >= level.parts.length ? "148px" : `${slot.top}px`);
    } else {
      els.moonYard.style.removeProperty("--rocket-carry-left");
      els.moonYard.style.removeProperty("--rocket-carry-top");
    }
    if (level.scene === "bridge") {
      const slotIndex = Math.max(0, Math.min(state.stepIndex, bridgeCarrySlots.length - 1));
      const slot = bridgeCarrySlots[slotIndex];
      els.moonYard.style.setProperty("--bridge-carry-left", `${slot.left}%`);
      els.moonYard.style.setProperty("--bridge-carry-top", state.stepIndex >= level.parts.length ? "138px" : `${slot.top}px`);
    } else {
      els.moonYard.style.removeProperty("--bridge-carry-left");
      els.moonYard.style.removeProperty("--bridge-carry-top");
    }
    if (level.scene === "wheel") {
      els.moonYard.style.setProperty("--wheel-carry-left", `${wheelCarrySlot.left}%`);
      els.moonYard.style.setProperty("--wheel-carry-top", state.stepIndex >= level.parts.length ? "112px" : `${wheelCarrySlot.top}px`);
    } else {
      els.moonYard.style.removeProperty("--wheel-carry-left");
      els.moonYard.style.removeProperty("--wheel-carry-top");
    }
    if (level.scene === "stars") {
      const slotIndex = Math.max(0, Math.min(state.stepIndex, starCarrySlots.length - 1));
      const slot = starCarrySlots[slotIndex];
      els.moonYard.style.setProperty("--star-carry-left", `${slot.left}%`);
      els.moonYard.style.setProperty("--star-carry-top", state.stepIndex >= level.parts.length ? "118px" : `${slot.top}px`);
    } else {
      els.moonYard.style.removeProperty("--star-carry-left");
      els.moonYard.style.removeProperty("--star-carry-top");
    }
    if (level.scene === "wall") {
      const slotIndex = Math.max(0, Math.min(state.stepIndex, wallCarrySlots.length - 1));
      const slot = wallCarrySlots[slotIndex];
      els.moonYard.style.setProperty("--wall-carry-left", `${slot.left}%`);
      els.moonYard.style.setProperty("--wall-carry-top", state.stepIndex >= level.parts.length ? "72px" : `${slot.top}px`);
      els.moonYard.style.setProperty("--wall-carry-height", `${slot.height || 124}px`);
    } else {
      els.moonYard.style.removeProperty("--wall-carry-left");
      els.moonYard.style.removeProperty("--wall-carry-top");
      els.moonYard.style.removeProperty("--wall-carry-height");
    }
  }
  const listeningPromptOnly = isListening && !revealListeningTarget;
  if (els.stageNoteText) els.stageNoteText.textContent = listeningPromptOnly ? "♪" : target.name;
  if (els.stageNoteName) els.stageNoteName.textContent = "";
  if (els.stageNoteOrb) {
    els.stageNoteOrb.dataset.promptOnly = listeningPromptOnly ? "true" : "false";
    els.stageNoteOrb.style.setProperty("--target-color", partColor);
    els.stageNoteOrb.style.setProperty("--target-soft", alpha(partColor, 0.16));
    els.stageNoteOrb.style.setProperty("--target-glow", alpha(partColor, 0.28));
  }
  if (els.stageStoryRibbon) {
    els.stageStoryRibbon.hidden = level.id === "M08" || level.id === "M03";
    const storyCopy = storyRibbonCopyFor(level, part, target, {
      levelComplete,
      isListening,
      revealListeningTarget,
      isLevelCheckRun
    });
    const partImage = imageForPart(part);
    const suppressM01StoryIdentity = level.id === "M01" && !isListening && !levelComplete;
    els.stageStoryRibbon.dataset.identitySuppressed = suppressM01StoryIdentity ? "true" : "false";
    els.stageStoryRibbon.innerHTML = `
      <div class="story-ribbon-main">
        <span class="story-part-icon" style="--part-image:${imageCssUrl(partImage)}; --part-color:${partColor}; --part-soft:${alpha(partColor, 0.18)}"></span>
        <span class="story-copy">
          <small>${storyCopy.kicker}</small>
          <strong>${storyCopy.line}</strong>
        </span>
      </div>
      ${suppressM01StoryIdentity ? "" : `
        <div class="story-cue-row">
          <span class="story-note-pill"><b>${storyCopy.note}</b>${isListening && !revealListeningTarget ? `<em>${storyCopy.key}</em>` : ""}</span>
          ${(!levelComplete && (!isListening || revealListeningTarget)) ? locatorVisualHtml(target, "黑键", "story-locator") : ""}
          ${storyCopy.staff ? `<span class="story-staff-chip">${storyCopy.staff}</span>` : ""}
        </div>
      `}
    `;
    els.stageStoryRibbon.style.setProperty("--story-color", partColor);
    els.stageStoryRibbon.style.setProperty("--story-soft", alpha(partColor, 0.18));
  }
  if (els.stageEnergyPath) els.stageEnergyPath.setAttribute("d", energyPath);
  if (els.stageEnergyPathSoft) els.stageEnergyPathSoft.setAttribute("d", energyPath);
  els.targetNote.classList.toggle("listen-card", isListening);
  els.targetNote.classList.toggle("note-chip-card", !isListening);
  els.targetNote.classList.toggle("check-note-card", isLevelCheckRun);
  const targetMainLabel = target.name;
  if (isListening) {
    els.targetNote.tabIndex = 0;
    els.targetNote.setAttribute("role", "button");
    els.targetNote.setAttribute("aria-label", "再听一次小车轮唱的音");
  } else {
    els.targetNote.removeAttribute("tabindex");
    els.targetNote.removeAttribute("role");
    els.targetNote.removeAttribute("aria-label");
  }
  els.targetNote.innerHTML = isListening
    ? `<small>${revealListeningTarget ? "再听车轮" : "听小车轮"}</small><strong>${revealListeningTarget ? target.name : "♪"}</strong><span>${revealListeningTarget ? `${target.name} · ${targetId.keyShort}` : "点这里重播"}</span>${revealListeningTarget ? locatorVisualHtml(target, "找这格", "card-locator") : ""}<em>${revealListeningTarget ? targetId.keyLong : "会唱的小车轮"}</em>`
    : isLevelCheckRun
    ? `<small>当前音</small><strong>${targetMainLabel}</strong><span>${targetId.staffPrep || "少提示"}</span>${locatorVisualHtml(target, "自己找", "card-locator")}<em>错了再亮</em>`
    : `<small>当前音</small><strong>${targetMainLabel}</strong><span>${targetId.keyShort}</span>${locatorVisualHtml(target, "住这里", "card-locator")}<em>${targetId.keyShort}</em>`;
  els.targetNote.style.color = partColor;
  els.targetNote.style.setProperty("--target-color", partColor);
  els.targetNote.style.setProperty("--target-soft", alpha(partColor, 0.14));
  els.targetNote.style.setProperty("--target-glow", alpha(partColor, 0.20));
  els.targetNote.style.removeProperty("background");
  els.targetNote.style.removeProperty("border-color");
  if (els.coachNote) els.coachNote.textContent = listeningPromptOnly ? "♪" : target.solfege;
  if (els.coachBubble) {
    els.coachBubble.style.setProperty("--target-color", partColor);
    els.coachBubble.style.setProperty("--target-soft", alpha(partColor, 0.16));
  }
  if (els.coachDino) {
    els.coachDino.src = isListening ? dinoImages.listen : dinoImages.point;
    els.coachDino.style.setProperty("--red", partColor);
  }
  els.dinoName.textContent = target.dino || "星芽";
  els.dinoHint.textContent = isLevelCheckRun
    ? `少提示：找 ${targetId.letter}。`
    : isListening
    ? (revealListeningTarget ? `听轮子的声音，你来弹 ${targetId.letter}。` : "我陪你听小车轮。")
    : `找 ${targetId.letter}。`;
  if (els.modeHint) {
    els.modeHint.textContent = isLevelCheckRun
      ? "自己找；错了我再提示。"
      : isListening
      ? ""
      : targetId.staffPrep
      ? `谱位：${targetId.staffPrep}。`
      : "看黑键小地图。";
  }
  els.dinoSvg.style.setProperty("--red", partColor);
  renderActionCue(part, target);
  renderLevelMap();

  renderKeyboard(target, isListening
    ? { level, scaffold: "listen", showTarget: revealListeningTarget }
    : isLevelCheckRun
    ? { level, scaffold: "light", showTarget: showLevelTarget }
    : { level });
  renderStepStrip(level);
  renderBuildScene(level);
  renderWorkshopIdleHint(level, target);
  renderListeningGuide(level, target, revealListeningTarget);
  renderEarned();
  renderMapScreen();
  refreshParentPanelIfOpen();
}

function renderShellMode() {
  document.body.classList.toggle("screen-map", state.screen === "map");
  document.body.classList.toggle("screen-play", state.screen === "play");
  document.body.classList.toggle("screen-staff", state.screen === "staff");
  document.body.classList.toggle("screen-garden", state.screen === "garden");
  if (state.auditMode) {
    document.body.dataset.audit = state.auditMode;
  } else {
    document.body.removeAttribute("data-audit");
  }
  if (els.mapShell) els.mapShell.hidden = state.screen !== "map";
  if (els.appShell) {
    els.appShell.hidden = state.screen === "map";
    els.appShell.classList.toggle("staff-mode", state.screen === "staff");
    if (state.screen !== "garden") delete els.appShell.dataset.chapter3;
    if (state.auditMode) {
      els.appShell.dataset.audit = state.auditMode;
    } else {
      delete els.appShell.dataset.audit;
    }
  }
  if (els.staffPanel) els.staffPanel.hidden = state.screen !== "staff";
  if (els.gardenPanel) els.gardenPanel.hidden = state.screen !== "garden";
  document.querySelector(".build-panel")?.toggleAttribute("hidden", state.screen !== "play");
  document.querySelector(".practice-panel")?.toggleAttribute("hidden", state.screen !== "play");
  if (els.staffModeButton) {
    els.staffModeButton.textContent = state.screen === "staff" ? "月球基地" : "小恐龙跳";
  }
}

function renderMapScreen() {
  if (!els.mapShell) return;
  const gardenReached = hasReachedGardenEntrance();
  const baseComplete = levels.every((level) => state.completed.has(level.id));
  const staffReadiness = fgBridgeReadiness();
  const shouldFocusStaff = !gardenReached && state.screen === "map" && baseComplete && !state.staffComplete && staffReadiness.ready;
  if (els.mapChapterLabel) {
    els.mapChapterLabel.textContent = gardenReached ? "当前章节：呼吸花园" : "当前章节：月球基地";
  }
  if (els.mapStarCount) {
    if (gardenReached) {
      const leafCount = state.chapter3.leaves.filter(Boolean).length;
      const activeGarden = state.activeSession?.status === "active" && state.activeSession.bundleId.startsWith("C3-");
      const ls03Done = Boolean(state.chapter3.lessonEvidence.LS03?.completedAt);
      const listeningAttempt = activeGarden && currentSessionAction()?.kind === "garden-listening"
        ? currentSessionAction().listeningAttempt
        : null;
      if (ls03Done) {
        const ls04Done = Boolean(state.chapter3.ls04Completed || state.chapter3.lessonEvidence.LS04?.completedAt);
        const callCount = ls04Done ? 4 : Math.min(4, listeningAttempt?.scoredCalls?.length || 0);
        const listeningState = ls04Done ? "休息" : (activeGarden ? "正在听" : "准备");
        els.mapStarCount.textContent = `找朋友 ${callCount}/4 · ${listeningState}`;
        els.mapStarCount.setAttribute("aria-label", `呼吸花园声音配对进度：四个声音已完成 ${callCount} 个，${listeningState}`);
      } else {
        const gardenState = activeGarden ? "正在照顾" : (leafCount ? "休息" : "入口");
        els.mapStarCount.textContent = `嫩芽 ${leafCount}/3 · ${gardenState}`;
        els.mapStarCount.setAttribute("aria-label", `呼吸花园进度：三片嫩芽已完成 ${leafCount} 片，${gardenState}`);
      }
    } else {
      const staffStatus = state.staffComplete ? "小恐龙完成" : (staffReadiness.ready ? "小恐龙待跳" : "F/G待稳");
      els.mapStarCount.textContent = `基地 ${state.completed.size}/${levels.length} · ${staffStatus}`;
      els.mapStarCount.setAttribute("aria-label", `月球基地进度：${state.completed.size}/${levels.length}，${staffStatus}`);
    }
  }
  if (els.gardenRestMarker) {
    els.gardenRestMarker.hidden = !gardenReached;
    const chapter3Done = Boolean(state.chapter3.ls04Completed || state.chapter3.lessonEvidence.LS04?.completedAt);
    const activeGarden = state.activeSession?.status === "active" && state.activeSession.bundleId.startsWith("C3-");
    const waitingResume = Boolean(state.chapter3.resume?.nextTargetId);
    const markerCopy = gardenMapMarkerCopy({ chapter3Done, activeGarden, leafCount: state.chapter3.leaves.filter(Boolean).length });
    els.gardenRestMarker.disabled = chapter3Done;
    els.gardenRestMarker.dataset.chapter3State = chapter3Done ? "complete" : ((activeGarden || waitingResume) ? "resume" : "ready");
    els.gardenRestMarker.setAttribute("aria-label", `${markerCopy.strong}，${markerCopy.small}`);
    const markerStrong = els.gardenRestMarker.querySelector("strong");
    const markerSmall = els.gardenRestMarker.querySelector("small");
    if (markerStrong) markerStrong.textContent = markerCopy.strong;
    if (markerSmall) markerSmall.textContent = markerCopy.small;
    if (gardenReached) els.gardenRestMarker.setAttribute("aria-current", "location");
    else els.gardenRestMarker.removeAttribute("aria-current");
  }
  els.mapShell.querySelectorAll(".garden-branch").forEach((path) => {
    path.hidden = !gardenReached;
  });
  if (els.mapSessionStatus) {
    const active = state.activeSession?.status === "active" ? state.activeSession : null;
    const rest = !active ? state.sessionRuntime.lastRest : null;
    els.mapSessionStatus.hidden = !(active || rest);
    els.mapSessionStatus.dataset.state = active ? "active" : "rest";
    if (els.mapSessionTitle) {
      els.mapSessionTitle.textContent = active ? "星芽还在这段旅程里" : "星芽在这里歇一歇";
    }
    if (els.mapSessionDetail) {
      els.mapSessionDetail.textContent = active
        ? "点亮着的地点，继续刚才的小任务。"
        : `${rest?.reward || "这一小段"}已经安顿好，地图可以慢慢选。`;
    }
  }

  for (const node of els.mapShell.querySelectorAll(".map-node")) {
    node.querySelector(".node-action-badge")?.remove();
    const levelId = node.dataset.level;
    const index = levels.findIndex((level) => level.id === levelId);
    node.classList.toggle("done", state.completed.has(levelId));
    node.classList.toggle("active", !gardenReached && !shouldFocusStaff && index === state.levelIndex && state.screen !== "staff");
    if (node.dataset.screen === "staff") {
      node.classList.toggle("done", state.staffComplete);
      node.classList.toggle("active", !gardenReached && (state.screen === "staff" || shouldFocusStaff));
      node.classList.toggle("needs-practice", baseComplete && !state.staffComplete && !staffReadiness.ready);
      node.setAttribute("aria-label", `${node.textContent.trim()} ${state.staffComplete ? "已完成" : (staffReadiness.ready ? "未完成" : "F/G 还需练稳")}`);
    } else {
      node.setAttribute("aria-label", `${node.textContent.trim()} ${state.completed.has(levelId) ? "已完成" : "未完成"}`);
    }

    if (node.classList.contains("active")) {
      node.setAttribute("aria-current", "step");
      const badge = document.createElement("span");
      badge.className = "node-action-badge";
      badge.textContent = node.dataset.screen === "staff" ? "跳" : "出发";
      node.appendChild(badge);
      node.setAttribute("aria-label", `${node.textContent.trim()} 当前地点，点击开始`);
    } else {
      node.removeAttribute("aria-current");
    }
  }
  renderParentPanel();
}

function gardenMapMarkerCopy({ chapter3Done, activeGarden, leafCount }) {
  if (chapter3Done) return { strong: "C/D 找朋友", small: "两边叶子握住啦" };
  const activeTargetId = activeGarden ? currentSessionAction(state.activeSession)?.targetId : null;
  const resumeTargetId = state.chapter3.resume?.nextTargetId || null;
  const targetId = activeTargetId || resumeTargetId || (state.chapter3.lessonEvidence.LS03?.completedAt ? "LS04" : (leafCount >= 2 ? "LS03" : (leafCount >= 1 ? "LS02" : null)));
  if (targetId === "LS01") return { strong: "第一片叶", small: "继续第一片叶" };
  if (targetId === "LS02") return { strong: "第二片叶", small: "继续第二片叶" };
  if (targetId === "LS03") {
    return { strong: "第三片叶", small: activeGarden ? "继续第三片叶" : "点这里唤醒第三片叶" };
  }
  if (targetId === "LS04") {
    return { strong: "C/D 找朋友", small: activeGarden ? "继续听声音" : "点这里听种核" };
  }
  return { strong: "花园入口", small: "点这里走进花园" };
}

function currentInputModeLabel() {
  if (state.audio?.running) return "麦克风听音中";
  if (state.midiAccess) return "MIDI 已连接";
  return "屏幕琴键";
}

function audioVolumePercent() {
  return Math.round(state.audioSettings.volume * 100);
}

function syncAudioSettingsUi() {
  const enabled = state.audioSettings.enabled;
  const volumePercent = audioVolumePercent();
  document.documentElement.dataset.soundEnabled = String(enabled);
  document.documentElement.dataset.soundVolume = String(volumePercent);
  document.documentElement.dataset.audioMix = "note-priority";
  if (els.parentSoundToggle) {
    els.parentSoundToggle.setAttribute("aria-pressed", String(enabled));
    els.parentSoundToggle.closest(".parent-audio-setting")?.classList.toggle("sound-off", !enabled);
  }
  if (els.parentSoundState) els.parentSoundState.textContent = enabled ? "开" : "关";
  if (els.parentVolumeControl) {
    els.parentVolumeControl.value = String(volumePercent);
    els.parentVolumeControl.disabled = !enabled;
  }
  if (els.parentVolumeValue) els.parentVolumeValue.textContent = `${volumePercent}%`;
}

function applyAudioSettings() {
  const enabledGain = state.audioSettings.enabled ? state.audioSettings.volume : 0;
  if (state.sfx) {
    const { ctx, master, noteBus, effectBus } = state.sfx;
    const now = ctx.currentTime;
    noteBus.gain.setValueAtTime(1, now);
    effectBus.gain.setValueAtTime(AUDIO_EFFECT_GAIN, now);
    master.gain.cancelScheduledValues(now);
    master.gain.setTargetAtTime(enabledGain, now, 0.015);
  }
  syncAudioSettingsUi();
}

function setGameSoundEnabled(enabled) {
  state.audioSettings.enabled = Boolean(enabled);
  saveAudioSettings();
  applyAudioSettings();
}

function setGameSoundVolume(percent) {
  const normalized = Number(percent) / 100;
  if (!Number.isFinite(normalized)) return;
  state.audioSettings.volume = Math.min(AUDIO_VOLUME_CAP, Math.max(0, normalized));
  saveAudioSettings();
  applyAudioSettings();
}

function systemPrefersReducedMotion() {
  return Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
}

function effectiveReducedMotion() {
  return state.motionSettings.reduced || systemPrefersReducedMotion();
}

function syncMotionSettingsUi() {
  const systemReduced = systemPrefersReducedMotion();
  const reduced = effectiveReducedMotion();
  document.documentElement.dataset.motion = reduced ? "reduced" : "full";
  document.documentElement.dataset.motionSource = systemReduced
    ? "system"
    : (state.motionSettings.reduced ? "parent" : "default");
  if (els.parentMotionToggle) {
    els.parentMotionToggle.setAttribute("aria-pressed", String(reduced));
    els.parentMotionToggle.disabled = systemReduced;
    els.parentMotionToggle.setAttribute(
      "aria-label",
      systemReduced ? "设备已启用减少动态效果" : "开关减少动态效果"
    );
    els.parentMotionToggle.closest(".parent-motion-setting")?.classList.toggle("motion-reduced", reduced);
  }
  if (els.parentMotionState) {
    els.parentMotionState.textContent = systemReduced ? "设备" : (reduced ? "开" : "关");
  }
}

function applyMotionSettings() {
  syncMotionSettingsUi();
}

function setParentReducedMotion(reduced) {
  state.motionSettings.reduced = Boolean(reduced);
  saveMotionSettings();
  applyMotionSettings();
}

function initMotionPreferenceListener() {
  const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  if (!media) return;
  const handleChange = () => applyMotionSettings();
  if (media.addEventListener) media.addEventListener("change", handleChange);
  else media.addListener?.(handleChange);
}

function systemPrefersHighContrast() {
  return Boolean(window.matchMedia?.("(prefers-contrast: more)").matches);
}

function applyContrastPreference() {
  const highContrast = systemPrefersHighContrast();
  document.documentElement.dataset.contrast = highContrast ? "more" : "normal";
  document.documentElement.dataset.contrastSource = highContrast ? "system" : "default";
}

function initContrastPreferenceListener() {
  const media = window.matchMedia?.("(prefers-contrast: more)");
  if (!media) return;
  const handleChange = () => applyContrastPreference();
  if (media.addEventListener) media.addEventListener("change", handleChange);
  else media.addListener?.(handleChange);
}

function renderParentPanel() {
  if (!els.parentModal) return;
  const learning = currentLearningSummary();
  const mastery = currentMasterySummary();
  if (els.parentLearningFocus) {
    els.parentLearningFocus.textContent = learning.focus;
  }
  if (els.parentLearningDetail) {
    els.parentLearningDetail.textContent = learning.detail;
  }
  if (els.parentMasteryStatus) {
    els.parentMasteryStatus.textContent = mastery.status;
  }
  if (els.parentMasteryDetail) {
    els.parentMasteryDetail.textContent = mastery.detail;
  }
  if (els.parentEvidenceList) {
    const rows = state.screen === "garden" && !mastery.ls04
      ? [
        ["可见提示下练过", mastery.played],
        ["不计稳定", false],
        ["不计隔日保留", false]
      ]
      : [
        ["在故事帮助下玩过", mastery.played],
        ["本次减提示完成", mastery.stable],
        ["隔日再次减提示完成", mastery.retained],
        ["今天需要提示", mastery.todayNeedsPractice]
      ];
    els.parentEvidenceList.innerHTML = rows
      .map(([label, active]) => `<span class="parent-evidence-chip${active ? " is-active" : ""}"><i aria-hidden="true">${active ? "✓" : "·"}</i>${label}</span>`)
      .join("");
  }
  if (els.parentProgressText) {
    if (usesLs04ParentEvidence()) {
      const activeAttempt = currentListeningAction()?.listeningAttempt;
      const lastAttempt = state.chapter3.ls04Attempts?.[state.chapter3.ls04Attempts.length - 1];
      const count = state.chapter3.lessonEvidence.LS04?.completedAt
        ? 4
        : Math.min(4, activeAttempt?.scoredCalls?.length || lastAttempt?.scoredCalls?.length || 0);
      els.parentProgressText.textContent = `C/D 找朋友 ${count}/4`;
    } else {
      els.parentProgressText.textContent = `基地 ${state.completed.size}/${levels.length}`;
    }
  }
  if (els.parentStaffState) {
    els.parentStaffState.textContent = usesLs04ParentEvidence()
      ? (state.chapter3.lessonEvidence.LS04?.completedAt ? "当前切片休息" : "正在听声音")
      : state.screen === "staff" && state.staffRunMode === "check"
      ? "少提示复读中"
      : (state.staffComplete ? "小恐龙跳已完成" : "小恐龙跳待玩");
  }
  if (els.parentInputMode) {
    els.parentInputMode.textContent = currentInputModeLabel();
  }
  if (els.parentHeardState && els.heardStatus) {
    els.parentHeardState.textContent = els.heardStatus.textContent || "听到：--";
  }
  if (els.parentResponseRecord) {
    els.parentResponseRecord.textContent = currentResponseRecordText();
  }
  syncAudioSettingsUi();
  syncMotionSettingsUi();
  if (els.parentMicButton) {
    els.parentMicButton.classList.toggle("active", !!state.audio?.running);
    els.parentMicButton.querySelector("strong").textContent = state.audio?.running ? "暂停听音" : "听钢琴声音";
  }
  if (els.parentMidiButton) {
    els.parentMidiButton.classList.toggle("active", !!state.midiAccess);
    els.parentMidiButton.toggleAttribute("disabled", !navigator.requestMIDIAccess);
    els.parentMidiButton.querySelector("small").textContent = navigator.requestMIDIAccess
      ? "仅部分浏览器可连接；iPad 网页先用屏幕琴键。"
      : "当前浏览器不支持 Web MIDI；直接点屏幕琴键。";
  }
}

function refreshParentPanelIfOpen() {
  if (els.parentModal && !els.parentModal.hidden) renderParentPanel();
}

const transientFeedbackSelector = [
  ".key-press-label",
  ".key-touch-ripple",
  ".sprite-effect",
  ".note-feedback-burst",
  ".music-flight",
  ".music-flight-landing",
  ".stage-input-toast",
  ".staff-stage-toast",
  ".stage-confetti-effect",
  ".staff-confetti-effect",
  ".staff-landing-ripple",
  ".flying-part"
].join(", ");

function clearTransientFeedback() {
  document.querySelectorAll(transientFeedbackSelector).forEach((element) => element.remove());
}

function pauseMicrophoneInputForModal() {
  const gate = state.audio?.microphoneGate;
  if (!gate) return;
  resetMicrophoneCandidate(gate);
  gate.armed = false;
  gate.acceptedMidi = null;
  gate.quietSince = 0;
}

function gameplayInputIsBlocked() {
  return Boolean(!els.parentModal?.hidden || !els.resultModal?.hidden);
}

function openParentPanel() {
  parentReturnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  clearTransientFeedback();
  pauseMicrophoneInputForModal();
  renderParentPanel();
  els.parentModal.hidden = false;
  document.body.classList.add("parent-panel-open");
  syncModalBackgroundInert();
  requestAnimationFrame(() => els.parentClose?.focus({ preventScroll: true }));
}

function closeParentPanel() {
  els.parentModal.hidden = true;
  document.body.classList.remove("parent-panel-open");
  syncModalBackgroundInert();
  const returnTarget = parentReturnFocus;
  parentReturnFocus = null;
  if (returnTarget?.isConnected) returnTarget.focus({ preventScroll: true });
}

let parentReturnFocus = null;

function syncModalBackgroundInert() {
  const modalOpen = !els.parentModal.hidden || !els.resultModal.hidden;
  if (els.mapShell) els.mapShell.inert = modalOpen;
  if (els.appShell) els.appShell.inert = modalOpen;
}

function modalFocusableElements(modal) {
  if (!modal) return [];
  return [...modal.querySelectorAll("button:not([disabled]), input:not([disabled]), summary, a[href], [tabindex]:not([tabindex='-1'])")]
    .filter((element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";
    });
}

function trapModalFocus(modal, event) {
  const focusable = modalFocusableElements(modal);
  if (focusable.length === 0) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;
  if (!modal.contains(active)) {
    event.preventDefault();
    first.focus({ preventScroll: true });
    return;
  }
  if (event.shiftKey && active === first) {
    event.preventDefault();
    last.focus({ preventScroll: true });
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus({ preventScroll: true });
  }
}

function renderLevelMap() {
  if (!els.levelMap) return;
  els.levelMap.innerHTML = "";
  const currentLevel = activeLevel();
  els.levelMap.setAttribute(
    "aria-label",
    state.screen === "staff"
      ? "关卡进度，当前小恐龙跳"
      : `关卡进度，当前第 ${state.levelIndex + 1} 关，${currentLevel?.title || "月球基地"}`
  );

  const progress = document.createElement("span");
  progress.className = "progress-compact";
  progress.setAttribute("aria-hidden", "true");
  if (state.screen === "staff") {
    progress.innerHTML = `<b>星桥</b><small>${isMiniStaffSession() ? "前三跳" : "五线谱"}</small>`;
  } else {
    progress.innerHTML = `<b>${state.levelIndex + 1}</b><small>/ ${levels.length}</small>`;
  }
  els.levelMap.appendChild(progress);
}

function activeStepLabel(level = activeLevel()) {
  return activePart(level)?.label || level.reward;
}

function actionForPart(part) {
  return part?.action || "装上";
}

function imageForPart(part) {
  return partImages[part?.shape] || partImages.brick;
}

function imageCssUrl(src) {
  return `url('${src}')`;
}

function renderActionCue(part, target) {
  const rawColor = part?.color || target.color;
  const partImage = imageForPart(part);
  const level = activeLevel();
  const phase = phaseForLevel(level);
  const id = noteIdentity(target);
  const noteText = id.letter;
  const isLevelCheckRun = isLevelReducedCueRun(level);
  const isRoofBlueprint = level?.id === "M08";
  const roofMode = roofBlueprintMode(level);
  const levelComplete = state.stepIndex >= (level?.parts?.length || 0);
  const roofStep = Math.min(level?.parts?.length || 5, state.stepIndex + 1);
  const wrongRoofHeard = isRoofBlueprint && state.lastInputResult === "wrong" ? noteForMidi(state.lastInputMidi) : null;
  const wrongRoofHeardId = wrongRoofHeard ? noteIdentity(wrongRoofHeard) : null;
  const isListening = isListeningLevel(level);
  const revealListeningTarget = shouldRevealListeningTarget(level);
  const hideListeningIdentity = shouldHideListeningIdentity(level);
  const color = hideListeningIdentity ? LISTENING_IDENTITY_NEUTRAL : rawColor;
  const action = hideListeningIdentity
    ? `${actionForPart(part)}${partObjectLabel(part, noteForMidi(part?.midi))}`
    : actionTextForPart(part);
  els.nextAction.dataset.listeningIdentityHidden = hideListeningIdentity ? "true" : "false";
  els.nextAction.style.setProperty("--part-color", color);
  els.nextAction.style.setProperty("--part-color-soft", alpha(color, 0.16));
  els.nextAction.innerHTML = isListening
    ? `
      <span class="cue-brick" style="--part-image:${imageCssUrl(partImage)}; --part-color:${color}; --part-color-soft:${alpha(color, 0.18)}"></span>
      <span class="cue-text strong">小车轮正在唱</span>
    `
    : isLevelCheckRun
    ? `
      <span class="cue-brick" style="--part-image:${imageCssUrl(partImage)}; --part-color:${color}; --part-color-soft:${alpha(color, 0.18)}"></span>
      <span class="cue-text">少提示</span>
      <span class="cue-arrow">→</span>
      <span class="cue-key" style="--cue-color:${color}">${noteText}</span>
      <span class="cue-text">自己找键</span>
      <span class="cue-arrow">→</span>
      <span class="cue-text strong">${action}</span>
    `
    : `
      <span class="cue-brick" style="--part-image:${imageCssUrl(partImage)}; --part-color:${color}; --part-color-soft:${alpha(color, 0.18)}"></span>
      <span class="cue-text">${phase.short}</span>
      <span class="cue-arrow">→</span>
      <span class="cue-key" style="--cue-color:${color}">${noteText}</span>
      <span class="cue-text">${id.keyShort}</span>
      <span class="cue-arrow">→</span>
      <span class="cue-text strong">${action}</span>
    `;
  if (els.coachBubble) {
    els.coachBubble.innerHTML = isRoofBlueprint
      ? levelComplete
        ? roofMode === "seal"
          ? `<span class="roof-coach-copy">五个气密点都亮了，</span><strong>安全啦！</strong>`
          : `<span class="roof-coach-copy">屋顶安装完成，</span><strong>合上啦！</strong>`
        : state.lastInputResult === "wrong" && wrongRoofHeardId
        ? `<span class="roof-coach-copy">刚按 ${wrongRoofHeardId.letter}（${wrongRoofHeardId.solfege}），目标 ${id.letter}，唱</span><strong>${id.solfege}！</strong>`
        : roofMode === "seal"
        ? `<span class="roof-coach-copy">检查第 ${roofStep} 处，请按唱名：</span><strong>${id.solfege}！</strong>`
        : `<span class="roof-coach-copy">接下来，请按唱名：</span><strong>${id.solfege}！</strong>`
      : isListening
      ? levelComplete
        ? `<small>两个车轮扣好啦</small><strong>小车准备好了！</strong><span>星芽和你一起庆祝</span>`
        : revealListeningTarget
        ? `<small>小车轮再唱</small><strong>轮子唱 ${id.solfege}</strong><span>你来弹 ${id.letter}</span>`
        : `<small>小车轮先唱</small><strong>♪</strong><span>你弹同样的键</span>`
    : isLevelCheckRun
    ? `<small>少提示</small><strong>${noteText}</strong>${locatorVisualHtml(target, "黑键", "coach-locator")}<span>自己找</span>`
    : level?.id === "M08"
      ? `<small>星芽说</small><strong>唱 ${id.solfege}</strong><span>把这块装进蓝图</span>`
    : level?.id === "M01"
      ? `<small>星芽说</small><strong>唱 ${id.solfege}</strong><span>地板该落下啦</span>`
      : `<small>星芽说</small><strong>唱 ${id.solfege}</strong>${locatorVisualHtml(target, "黑键", "coach-locator")}<span>${id.letter} · ${id.keyShort}</span>`;
    els.coachBubble.style.setProperty("--target-color", color);
    els.coachBubble.style.setProperty("--target-soft", alpha(color, 0.16));
  }
}

function clearWorkshopIdleHints({ resetStage = true } = {}) {
  if (state.workshopIdleIdentityTimer) {
    clearTimeout(state.workshopIdleIdentityTimer);
    state.workshopIdleIdentityTimer = null;
  }
  if (state.workshopIdleLocatorTimer) {
    clearTimeout(state.workshopIdleLocatorTimer);
    state.workshopIdleLocatorTimer = null;
  }
  if (resetStage) state.workshopIdleStage = "none";
}

function scheduleWorkshopIdleHints(initialDelayMs = 0) {
  clearWorkshopIdleHints();
  if (state.screen !== "play" || state.stepIndex >= activeLevel().parts.length) return;
  const delay = Math.max(0, initialDelayMs);
  state.workshopIdleIdentityTimer = setTimeout(() => {
    state.workshopIdleIdentityTimer = null;
    showWorkshopIdleHint("identity");
  }, delay + WORKSHOP_IDLE_IDENTITY_MS);
  state.workshopIdleLocatorTimer = setTimeout(() => {
    state.workshopIdleLocatorTimer = null;
    showWorkshopIdleHint("locator");
  }, delay + WORKSHOP_IDLE_LOCATOR_MS);
}

function showWorkshopIdleHint(stage) {
  const level = activeLevel();
  if (state.screen !== "play" || !level || state.stepIndex >= level.parts.length || !els.resultModal.hidden) return;
  const targetMidi = activeTargetMidi();
  const target = noteForMidi(targetMidi);
  if (!target) return;
  if (!state.practiceAttempt) {
    state.practiceAttempt = createPracticeAttempt("level", level.id, state.levelRunMode);
    beginPracticeStepClock();
  }

  state.workshopIdleStage = stage;
  if (isListeningLevel(level)) {
    state.practiceAttempt.idleListenReplays = (state.practiceAttempt.idleListenReplays || 0) + 1;
    markAttemptCue("soft");
    playListeningPrompt();
  } else if (stage === "identity") {
    state.practiceAttempt.idleIdentityHints = (state.practiceAttempt.idleIdentityHints || 0) + 1;
    markAttemptCue("soft");
  } else {
    state.practiceAttempt.idleLocatorHints = (state.practiceAttempt.idleLocatorHints || 0) + 1;
    markAttemptCue("strong");
    showInputEffect(targetMidi, "hint");
    showNoteBurst(targetMidi, "hint", target);
  }

  renderWorkshopIdleHint(level, target);
  refreshParentPanelIfOpen();
}

function renderRouteIdleDialog(level, target, stage) {
  document.querySelectorAll(".route-idle-dialog:not(.route-action-dialog)").forEach((dialog) => dialog.remove());
  if (stage === "none" || !level || !target) return;
  document.querySelectorAll(".route-action-dialog").forEach((dialog) => dialog.remove());
  const config = level.id === "M07"
    ? { host: els.memoryStarRoute, dino: ".memory-route-dino" }
    : level.id === "M08"
    ? { host: els.roofScaleRoute, dino: ".roof-route-dino" }
    : level.id === "FG03"
    ? { host: els.fgStarRoute, dino: ".fg-route-dino" }
    : null;
  if (!config?.host || config.host.hidden) return;
  const dino = config.host.querySelector(config.dino);
  if (!dino) return;
  const id = noteIdentity(target);
  const dialog = document.createElement("span");
  dialog.className = `route-idle-dialog route-idle-${stage}`;
  dialog.dataset.levelId = level.id;
  dialog.dataset.idleStage = stage;
  dialog.style.setProperty("--dialog-color", target.color);
  dialog.style.setProperty("--dialog-soft", alpha(target.color, 0.20));
  dialog.innerHTML = stage === "identity"
    ? `<small>星芽提醒</small><strong>先唱 ${id.solfege}</strong><em>再看 ${id.letter}</em>`
    : `<small>${id.full} 的家</small><strong>${id.keyLong}</strong><em>慢慢找</em>`;
  config.host.appendChild(dialog);
  requestAnimationFrame(() => {
    if (!dialog.isConnected || !dino.isConnected) return;
    const hostRect = config.host.getBoundingClientRect();
    const dinoRect = dino.getBoundingClientRect();
    const offset = level.id === "M08" ? { x: 38, y: -22 } : { x: 0, y: 0 };
    const minimumTop = level.id === "M08" ? 12 : 20;
    const left = Math.max(82, Math.min(hostRect.width - 82, dinoRect.left - hostRect.left + dinoRect.width / 2 + offset.x));
    const top = Math.max(minimumTop, dinoRect.top - hostRect.top - 8 + offset.y);
    dialog.style.left = `${left}px`;
    dialog.style.top = `${top}px`;
  });
}

function renderWorkshopIdleHint(level = activeLevel(), target = noteForMidi(activeTargetMidi())) {
  const stage = state.workshopIdleStage || "none";
  if (els.appShell) els.appShell.dataset.idleHint = stage;
  if (els.moonYard) els.moonYard.dataset.idleHint = stage;
  if (els.hangingPart) els.hangingPart.classList.toggle("identity-reminder", stage !== "none");
  renderRouteIdleDialog(level, target, stage);
  if (stage === "none" || !level || !target || !els.coachBubble) {
    if (els.coachBubble) delete els.coachBubble.dataset.idleHint;
    return;
  }

  const id = noteIdentity(target);
  els.coachBubble.dataset.idleHint = stage;
  if (isListeningLevel(level)) {
    els.coachBubble.innerHTML = `<small>小车轮再唱</small><strong>♪</strong><span>你弹同样的键</span>`;
    if (els.dinoHint) els.dinoHint.textContent = "我陪你再听一次。";
    if (els.modeHint) els.modeHint.textContent = "";
    if (els.coachDino) els.coachDino.src = dinoImages.listen;
    return;
  }

  if (level.id === "M08") {
    els.coachBubble.innerHTML = stage === "identity"
      ? `<small>想一想</small><strong>${id.solfege}</strong><span>蓝图里找 ${id.letter}</span>`
      : `<small>再给一点提示</small><strong>${id.solfege}</strong><span>${id.letter} · ${id.keyShort}</span>`;
    if (els.dinoHint) {
      els.dinoHint.textContent = stage === "identity"
        ? `蓝图里找 ${id.letter}。`
        : `${id.letter} 在${id.keyLong}。`;
    }
    if (els.modeHint) {
      els.modeHint.textContent = stage === "identity"
        ? "先看蓝图里的音名。"
        : "慢慢找；这次位置提示会被记录。";
    }
    return;
  }

  els.coachBubble.innerHTML = stage === "identity"
    ? `<small>先读名字</small><strong>${id.full}</strong><span>零件上也有 ${id.letter}</span>`
    : `<small>星芽提示</small><strong>${id.full}</strong>${locatorVisualHtml(target, "住这里", "coach-locator")}<span>${id.keyShort}</span>`;
  if (els.dinoHint) {
    els.dinoHint.textContent = stage === "identity"
      ? `找字母 ${id.letter}。`
      : `${id.letter} 住在${id.keyLong}。`;
  }
  if (els.modeHint) {
    els.modeHint.textContent = stage === "identity"
      ? "先看音名，再找琴键。"
      : "不用快，慢慢找；这次提示会被记录。";
  }
}

function renderBuildScene(level) {
  els.baseBuild.className = `base scene-${level.scene || "blocks"}`;
  const isLevelCheckRun = isLevelReducedCueRun(level);
  const suppressListeningObjectIdentity = shouldSuppressListeningObjectIdentity(level);
  const scaffold = isLevelCheckRun ? "level-check" : (level.scaffold || "strong");
  const showTargetCue = isLevelCheckRun ? state.lastInputResult === "wrong" : shouldShowKeyboardTarget(level);
  els.baseBuild.dataset.scaffold = scaffold;
  els.baseBuild.dataset.targetVisible = showTargetCue ? "true" : "false";
  els.baseBuild.innerHTML = "";

  level.parts.forEach((part, index) => {
    const partNote = noteForMidi(part.midi);
    const hideSlotIdentity = suppressListeningObjectIdentity && index >= state.stepIndex;
    const slotColor = hideSlotIdentity ? LISTENING_IDENTITY_NEUTRAL : part.color;
    const slot = document.createElement("span");
    slot.className = `build-slot shape-${part.shape || "brick"}`;
    slot.dataset.scaffold = scaffold;
    slot.dataset.identityHidden = hideSlotIdentity ? "true" : "false";
    if (partNote && !hideSlotIdentity) {
      slot.dataset.noteLabel = partNote.solfege;
      slot.dataset.noteName = partNote.name;
    }
    slot.style.setProperty("--part-color", slotColor);
    slot.style.setProperty("--part-color-soft", alpha(slotColor, 0.24));

    const art = document.createElement("span");
    art.className = "slot-art";
    art.style.setProperty("--part-image", imageCssUrl(imageForPart(part)));
    if (hideSlotIdentity) {
      art.style.setProperty("filter", "grayscale(1) saturate(0.04) contrast(0.92)", "important");
    }
    art.setAttribute("aria-hidden", "true");

    const noteLetter = document.createElement("span");
    noteLetter.className = "slot-note-letter";
    noteLetter.textContent = hideSlotIdentity ? "" : (partNote?.name || "");
    noteLetter.style.setProperty("--note-color", hideSlotIdentity ? LISTENING_IDENTITY_NEUTRAL : (partNote?.color || part.color));
    noteLetter.hidden = hideSlotIdentity;
    noteLetter.setAttribute("aria-hidden", "true");

    if (index < state.stepIndex) slot.classList.add("placed");
    if (index === state.stepIndex) {
      slot.classList.add("current");
      slot.classList.add(showTargetCue ? "current-hint" : "current-muted");
      slot.dataset.targetVisible = showTargetCue ? "true" : "false";
    }

    const label = document.createElement("span");
    label.className = "slot-label";
    if (partNote && !hideSlotIdentity) {
      label.dataset.noteLabel = partNote.solfege;
      label.dataset.noteName = partNote.name;
    }
    if (index <= state.stepIndex || state.stepIndex >= level.parts.length) {
      label.textContent = hideSlotIdentity ? partObjectLabel(part, partNote) : part.label;
    }
    slot.appendChild(art);
    slot.appendChild(noteLetter);
    slot.appendChild(label);
    els.baseBuild.appendChild(slot);
  });

  renderSceneFixture(level.scene, level.parts.length);
  renderBuildBlueprint(level);
  renderMemoryStarRoute(level);
  renderFgStarRoute(level);
  renderRoofScaleRoute(level);
  applyGroundedAssemblyGeometry(level);
}

function blueprintOutlineSvg(scene = "blocks") {
  const common = 'fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="5 5"';
  const outlines = {
    floor: `<path ${common} d="M26 64 50 47 76 64 50 82Z"/><path ${common} d="M35 57 50 67 67 57"/>`,
    lights: `<path ${common} d="M18 75H82"/><path ${common} d="M28 75V58M50 75V43M72 75V58"/><circle ${common} cx="28" cy="52" r="7"/><circle ${common} cx="50" cy="36" r="8"/><circle ${common} cx="72" cy="52" r="7"/>`,
    wheel: `<path ${common} d="M24 70H76L68 50H32Z"/><circle ${common} cx="38" cy="73" r="8"/><circle ${common} cx="62" cy="73" r="8"/>`,
    bridge: `<path ${common} d="M15 70H85"/><path ${common} d="M22 70 31 48 40 70 50 42 60 70 69 48 78 70"/>`,
    wall: `<path ${common} d="M24 78V48H76V78"/><path ${common} d="M24 59H76M41 48V59M59 48V59M41 59V78M59 59V78"/>`,
    stars: `<path ${common} d="M50 24 58 43 79 44 63 58 68 79 50 67 32 79 37 58 21 44 42 43Z"/>`,
    roof: `
      <path ${common} d="M22 80V43L50 23 78 43V80Z"/>
      <path ${common} d="M32 80V51H68V80"/>
      <path ${common} d="M44 80V63H56V80"/>
      <path ${common} d="M28 84H72"/>
    `
  };
  return `<svg class="blueprint-outline blueprint-outline-${scene}" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${outlines[scene] || outlines.wall}</svg>`;
}

function blueprintPositions(scene = "blocks", count = 1) {
  const presets = {
    floor: [[50, 66]],
    lights: [[28, 60], [50, 40], [72, 60]],
    wheel: [[38, 69], [62, 69]],
    bridge: [[22, 59], [40, 47], [60, 47], [78, 59]],
    wall: [[34, 67], [50, 49], [66, 67]],
    stars: [[27, 61], [40, 42], [60, 42], [73, 61]],
    roof: [[22, 34], [42, 68], [57, 34], [73, 34], [84, 68]]
  };
  const preset = presets[scene] || presets.wall;
  if (count <= preset.length) return preset.slice(0, count);
  return Array.from({ length: count }, (_, index) => [14 + (72 * index) / Math.max(1, count - 1), 62]);
}

function renderRoofWorldBuild(level) {
  if (!els.roofWorldBuild) return;
  if (!level || level.id !== "M08") {
    els.roofWorldBuild.replaceChildren();
    delete els.roofWorldBuild.dataset.mode;
    delete els.roofWorldBuild.dataset.installedCount;
    delete els.roofWorldBuild.dataset.checkedCount;
    delete els.roofWorldBuild.dataset.pressureState;
    return;
  }

  const panelCount = level.parts.length;
  const isSeal = roofBlueprintMode(level) === "seal";
  const installedCount = isSeal ? panelCount : Math.min(state.stepIndex, panelCount);
  const checkedCount = isSeal ? Math.min(state.stepIndex, panelCount) : 0;
  const pressureSafe = isSeal && checkedCount >= panelCount;

  els.roofWorldBuild.dataset.mode = isSeal ? "seal" : "install";
  els.roofWorldBuild.dataset.installedCount = String(installedCount);
  els.roofWorldBuild.dataset.checkedCount = String(checkedCount);
  els.roofWorldBuild.dataset.pressureState = pressureSafe ? "safe" : "waiting";
  els.roofWorldBuild.innerHTML = `
    <div class="roof-world-cabin" aria-hidden="true">
      <span class="roof-world-window"></span>
      <span class="roof-world-door"></span>
      <span class="roof-world-pressure"></span>
    </div>
    <div class="roof-world-frame" aria-hidden="true">
      <span class="roof-world-beam"></span>
      ${level.parts.map((part, index) => {
        const note = noteForMidi(part.midi) || notes[index] || notes[0];
        const installed = index < installedCount;
        const installCurrent = !isSeal && index === installedCount && installedCount < panelCount;
        const sealState = !isSeal
          ? ""
          : index < checkedCount
          ? " seal-checked"
          : index === checkedCount && checkedCount < panelCount
          ? " seal-current"
          : " seal-waiting";
        const justInstalled = !isSeal && installed && index === state.routeJustLockedIndex ? " just-installed" : "";
        return `<span class="roof-world-panel ${installed ? "installed" : "empty"}${installCurrent ? " install-current" : ""}${sealState}${justInstalled}" data-index="${index}" data-installed="${installed ? "true" : "false"}" data-seal-state="${isSeal ? (index < checkedCount ? "checked" : index === checkedCount && checkedCount < panelCount ? "current" : "waiting") : "inactive"}" style="--roof-color:${note.color};--roof-soft:${alpha(note.color, 0.22)}"><i class="roof-world-seal-light"></i></span>`;
      }).join("")}
      <span class="roof-world-skylight${installedCount === panelCount ? " is-closed" : ""}"></span>
    </div>
  `;
}

function usesBuildBlueprint(level) {
  return level?.id === "M08";
}

function renderBuildBlueprint(level) {
  if (!els.buildBlueprint) return;

  renderRoofWorldBuild(level);

  if (!usesBuildBlueprint(level)) {
    els.buildBlueprint.hidden = true;
    els.buildBlueprint.className = "build-blueprint";
    els.buildBlueprint.replaceChildren();
    delete els.buildBlueprint.dataset.identityHidden;
    delete els.buildBlueprint.dataset.stepCount;
    delete els.buildBlueprint.dataset.blueprintMode;
    delete els.buildBlueprint.dataset.progress;
    return;
  }

  els.buildBlueprint.hidden = false;

  const isListening = isListeningLevel(level);
  const isReducedCue = isLevelReducedCueRun(level);
  const isRoofBlueprint = level.id === "M08";
  const isRoofSeal = isRoofBlueprint && isReducedCue;
  // A listening/check blueprint may set the scene, but it must never become an answer key.
  const neutralPlan = isListening || isReducedCue;
  const positions = blueprintPositions(level.scene, level.parts.length);
  const progress = Math.min(state.stepIndex, level.parts.length);

  els.buildBlueprint.className = `build-blueprint blueprint-scene-${level.scene || "blocks"}`;
  els.buildBlueprint.dataset.identityHidden = neutralPlan ? "true" : "false";
  els.buildBlueprint.dataset.stepCount = String(level.parts.length);
  els.buildBlueprint.dataset.blueprintMode = isRoofSeal ? "seal" : (isRoofBlueprint ? "install" : "assembly");
  els.buildBlueprint.dataset.progress = String(progress);
  const blueprintTitle = isListening
    ? (progress >= level.parts.length ? "小车准备好了" : "会唱小车轮")
    : (isRoofSeal ? "气密检查" : (isRoofBlueprint ? "屋顶蓝图" : "施工蓝图"));
  const blueprintSubtitle = isRoofSeal
    ? (progress >= level.parts.length ? "5 / 5 · 安全压力光已亮" : `${progress} / 5 · 依次点亮检查点`)
    : isRoofBlueprint
    ? (progress >= level.parts.length ? "5 / 5 · 屋顶已经合拢" : `还差 ${level.parts.length - progress} 块 · 按 1 → 5 安装`)
    : isListening
    ? (progress >= level.parts.length ? "两个车轮已经咔哒扣好" : "小车轮在找声音伙伴")
    : (neutralPlan ? "听到声音再安装" : "完成后的样子");
  els.buildBlueprint.innerHTML = `
    <div class="blueprint-title"><span>${blueprintTitle}</span><i>${blueprintSubtitle}</i></div>
    <div class="blueprint-draft" data-scene="${level.scene || "blocks"}">
      ${blueprintOutlineSvg(level.scene)}
      ${isRoofBlueprint ? `
        <svg class="blueprint-sequence-line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <marker id="roof-blueprint-arrow" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="2.25" markerHeight="2.25" orient="auto">
              <polygon class="blueprint-arrow-head" points="0,0 6,3 0,6"></polygon>
            </marker>
          </defs>
          <path d="M22 52H39" marker-end="url(#roof-blueprint-arrow)"></path>
          <path d="M44 52H54" marker-end="url(#roof-blueprint-arrow)"></path>
          <path d="M59 52H70" marker-end="url(#roof-blueprint-arrow)"></path>
          <path d="M75 52H81" marker-end="url(#roof-blueprint-arrow)"></path>
          <circle cx="22" cy="52" r="1.7"></circle>
          <circle cx="42" cy="52" r="1.7"></circle>
          <circle cx="57" cy="52" r="1.7"></circle>
          <circle cx="73" cy="52" r="1.7"></circle>
          <circle cx="84" cy="52" r="1.7"></circle>
        </svg>
      ` : ""}
      ${level.parts.map((part, index) => {
        const note = noteForMidi(part.midi);
        const [x, y] = positions[index] || [50, 58];
        const status = index < progress ? "placed" : (index === progress ? "current" : "future");
        const identityHidden = isRoofSeal || (neutralPlan && index >= progress);
        const letter = isRoofSeal ? "" : (identityHidden ? "?" : (note?.name || "?"));
        const number = isRoofSeal || !neutralPlan ? String(index + 1) : "";
        const color = isRoofSeal || identityHidden || state.auditMode === "color-reduced"
          ? LISTENING_IDENTITY_NEUTRAL
          : (note?.color || part.color);
        const justPlaced = level.id === "M08" && index === state.routeJustLockedIndex ? " just-placed" : "";
        const roofDetails = isRoofBlueprint
          ? `<i class="blueprint-roof-panel" aria-hidden="true"></i><i class="blueprint-seal-point" aria-hidden="true"></i>`
          : "";
        return `<span class="blueprint-part ${status}${justPlaced}" data-index="${index}" data-note="${identityHidden ? "" : (note?.name || "")}" data-identity-hidden="${identityHidden ? "true" : "false"}" style="--blueprint-x:${x}%;--blueprint-y:${y}%;--part-color:${color};--part-color-soft:${alpha(color, 0.22)}">${roofDetails}<em>${number}</em><b>${letter}</b></span>`;
      }).join("")}
    </div>
  `;
}

function applyGroundedAssemblyGeometry(level) {
  const partProperties = ["top", "right", "bottom", "left", "width", "height", "min-height", "transform"];
  const baseProperties = ["bottom", "left", "width", "height", "transform"];
  const slotProperties = ["top", "right", "bottom", "left", "width", "height", "min-height", "transform"];
  const clear = (element, properties) => properties.forEach((property) => element?.style.removeProperty(property));

  clear(els.hangingPart, partProperties);
  clear(els.baseBuild, baseProperties);
  for (const slot of els.baseBuild.querySelectorAll(".build-slot")) clear(slot, slotProperties);
}

function renderListeningGuide(level, target, revealTarget) {
  els.moonYard?.querySelector(".listen-guide")?.remove();
  if (!els.moonYard || level?.id === "M03" || !isListeningLevel(level) || state.stepIndex >= level.parts.length || revealTarget) return;

  const id = noteIdentity(target);
  const color = revealTarget ? target.color : LISTENING_IDENTITY_NEUTRAL;
  const guide = document.createElement("div");
  guide.className = "listen-guide";
  guide.dataset.reveal = revealTarget ? "true" : "false";
  guide.style.setProperty("--listen-color", color);
  guide.style.setProperty("--listen-soft", alpha(color, 0.16));
  guide.innerHTML = `
    <span class="listen-guide-step listen-sound-step">
      <span class="listen-wave-icon" aria-hidden="true">
        <i></i><i></i><i></i>
      </span>
      <strong>${revealTarget ? id.full : "听一声"}</strong>
    </span>
    <span class="listen-guide-arrow" aria-hidden="true">→</span>
    <span class="listen-guide-step listen-key-step">
      <span class="listen-key-icon" aria-hidden="true"></span>
      <strong>${revealTarget ? id.keyShort : "找同样键"}</strong>
    </span>
  `;
  els.moonYard.appendChild(guide);
}

function renderFgStarRoute(level) {
  if (!els.fgStarRoute) return;
  const isFgRoute = level?.id === "FG03";
  els.fgStarRoute.hidden = !isFgRoute;
  els.fgStarRoute.innerHTML = "";
  if (!isFgRoute) {
    els.fgStarRoute.setAttribute("aria-hidden", "true");
    els.fgStarRoute.removeAttribute("role");
    els.fgStarRoute.removeAttribute("aria-label");
    return;
  }
  els.fgStarRoute.removeAttribute("aria-hidden");
  els.fgStarRoute.setAttribute("role", "img");
  els.fgStarRoute.setAttribute("aria-label", "星星路线 E F G");

  const points = [
    { x: 18, y: 68 },
    { x: 50, y: 62 },
    { x: 82, y: 68 }
  ];
  const parts = level.parts || [];
  const isLevelCheckRun = isLevelReducedCueRun(level);
  const showLocator = !isLevelCheckRun || state.lastInputResult === "wrong";
  const path = `M ${points[0].x} ${points[0].y} Q 50 57 ${points[2].x} ${points[2].y}`;
  const dinoIndex = Math.min(Math.max(state.stepIndex, 0), points.length - 1);
  const dinoPoint = points[dinoIndex] || points[0];
  const currentNote = noteForMidi(parts[Math.min(dinoIndex, parts.length - 1)]?.midi) || notes[0];
  els.fgStarRoute.innerHTML = `
    <div class="fg-route-title">
      <small>${isLevelCheckRun ? "少提示" : "三颗星"}</small>
      <strong>${isLevelCheckRun ? "看星垫跳" : "排成梯"}</strong>
    </div>
    <svg class="fg-route-line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path class="fg-route-glow" d="${path}"></path>
      <path class="fg-route-main" d="${path}"></path>
    </svg>
    <span class="fg-route-dino" style="left:${dinoPoint.x}%; top:${dinoPoint.y}%;" aria-hidden="true"></span>
    <span class="route-idle-dialog route-action-dialog" style="left:${dinoPoint.x}%; top:calc(${dinoPoint.y}% - 62px); --dialog-color:${currentNote.color}; --dialog-soft:${alpha(currentNote.color, 0.20)}">
      <small>星芽说</small><strong>唱 ${currentNote.solfege}</strong><em>找 ${currentNote.name}</em>
    </span>
  `;

  parts.forEach((part, index) => {
    const note = noteForMidi(part.midi) || notes[0];
    const id = noteIdentity(note);
    const point = points[index] || points[0];
    const isDone = index < state.stepIndex;
    const isCurrent = index === state.stepIndex;
    const isUpcoming = index > state.stepIndex;
    const currentLabel = note.name;
    const primaryLabel = currentLabel;
    const secondaryLabel = isCurrent
      ? (showLocator ? id.keyShort : "自己找")
      : (isDone ? "亮了" : "");
    const node = document.createElement("span");
    node.className = "fg-route-node";
    if (isDone) node.classList.add("done");
    if (isCurrent) node.classList.add("current");
    if (isUpcoming) node.classList.add("upcoming");
    node.dataset.note = note.name;
    node.dataset.solfege = note.solfege;
    node.style.left = `${point.x}%`;
    node.style.top = `${point.y}%`;
    node.style.setProperty("--route-note-color", note.color);
    node.style.setProperty("--route-note-soft", alpha(note.color, 0.24));
    node.innerHTML = `
      <span class="fg-route-pad-ring" aria-hidden="true"></span>
      <span class="fg-route-star" aria-hidden="true"></span>
      <span class="fg-route-label">
        <strong>${primaryLabel}</strong>
        ${secondaryLabel ? `<em>${secondaryLabel}</em>` : ""}
      </span>
    `;
    els.fgStarRoute.appendChild(node);
  });
}

function renderMemoryStarRoute(level) {
  if (!els.memoryStarRoute) return;
  const isMemoryRoute = level?.id === "M07";
  els.memoryStarRoute.hidden = !isMemoryRoute;
  els.memoryStarRoute.innerHTML = "";
  if (!isMemoryRoute) {
    els.memoryStarRoute.setAttribute("aria-hidden", "true");
    els.memoryStarRoute.removeAttribute("role");
    els.memoryStarRoute.removeAttribute("aria-label");
    return;
  }
  els.memoryStarRoute.removeAttribute("aria-hidden");
  els.memoryStarRoute.setAttribute("role", "img");
  els.memoryStarRoute.setAttribute("aria-label", "星星路线 C D E D C");

  const points = [
    { x: 10, y: 68 },
    { x: 30, y: 64 },
    { x: 50, y: 61 },
    { x: 70, y: 64 },
    { x: 90, y: 68 }
  ];
  const parts = level.parts || [];
  const isLevelCheckRun = isLevelReducedCueRun(level);
  const showLocator = !isLevelCheckRun || state.lastInputResult === "wrong";
  const path = `M ${points[0].x} ${points[0].y} C 26 66, 38 61, ${points[2].x} ${points[2].y} S 76 66, ${points[4].x} ${points[4].y}`;
  const dinoIndex = Math.min(Math.max(state.stepIndex, 0), points.length - 1);
  const dinoPoint = points[dinoIndex] || points[0];
  const currentNote = noteForMidi(parts[Math.min(dinoIndex, parts.length - 1)]?.midi) || notes[0];
  els.memoryStarRoute.innerHTML = `
    <div class="memory-route-title">
      <small>${isLevelCheckRun ? "少提示" : "记忆串"}</small>
      <strong>${isLevelCheckRun ? "自己接亮" : "按顺序亮星"}</strong>
    </div>
    <svg class="memory-route-line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path class="memory-route-glow" d="${path}"></path>
      <path class="memory-route-main" d="${path}"></path>
    </svg>
    <span class="memory-route-dino" style="left:${dinoPoint.x}%; top:${dinoPoint.y}%;" aria-hidden="true"></span>
    <span class="route-idle-dialog route-action-dialog" style="left:${dinoPoint.x}%; top:calc(${dinoPoint.y}% - 62px); --dialog-color:${currentNote.color}; --dialog-soft:${alpha(currentNote.color, 0.20)}">
      <small>星芽说</small><strong>唱 ${currentNote.solfege}</strong><em>找 ${currentNote.name}</em>
    </span>
  `;

  parts.forEach((part, index) => {
    const note = noteForMidi(part.midi) || notes[0];
    const id = noteIdentity(note);
    const point = points[index] || points[0];
    const isDone = index < state.stepIndex;
    const isCurrent = index === state.stepIndex;
    const isUpcoming = index > state.stepIndex;
    const currentLabel = note.name;
    const primaryLabel = currentLabel;
    const secondaryLabel = isCurrent
      ? (showLocator ? id.keyShort : "自己找")
      : (isDone ? "亮了" : "");
    const node = document.createElement("span");
    node.className = "memory-route-node";
    if (isDone) node.classList.add("done");
    if (isCurrent) node.classList.add("current");
    if (isUpcoming) node.classList.add("upcoming");
    node.dataset.note = note.name;
    node.dataset.solfege = note.solfege;
    node.dataset.step = String(index + 1);
    node.style.left = `${point.x}%`;
    node.style.top = `${point.y}%`;
    node.style.setProperty("--route-note-color", note.color);
    node.style.setProperty("--route-note-soft", alpha(note.color, 0.24));
    node.innerHTML = `
      <span class="memory-route-pad-ring" aria-hidden="true"></span>
      <span class="memory-route-star" aria-hidden="true"></span>
      <span class="memory-route-label">
        <strong>${primaryLabel}</strong>
        ${secondaryLabel ? `<em>${secondaryLabel}</em>` : ""}
      </span>
    `;
    els.memoryStarRoute.appendChild(node);
  });
}

function renderRoofScaleRoute(level) {
  if (!els.roofScaleRoute) return;
  const isRoofRoute = level?.id === "M08";
  els.roofScaleRoute.hidden = !isRoofRoute;
  els.roofScaleRoute.innerHTML = "";
  if (!isRoofRoute) return;

  const points = [
    { x: 16, y: 72 },
    { x: 33, y: 64 },
    { x: 50, y: 56 },
    { x: 67, y: 48 },
    { x: 84, y: 40 }
  ];
  const parts = level.parts || [];
  const isLevelCheckRun = isLevelReducedCueRun(level);
  const showLocator = !isLevelCheckRun || state.lastInputResult === "wrong";
  const path = `M ${points[0].x} ${points[0].y} C 30 67, 39 60, ${points[2].x} ${points[2].y} S 73 46, ${points[4].x} ${points[4].y}`;
  const dinoIndex = Math.min(Math.max(state.stepIndex, 0), points.length - 1);
  const dinoPoint = points[dinoIndex] || points[0];
  els.roofScaleRoute.innerHTML = `
    <div class="roof-route-title">
      <small>${isLevelCheckRun ? "少提示" : "屋顶梯"}</small>
      <strong>${isLevelCheckRun ? "看屋顶垫" : "从低到高盖上"}</strong>
    </div>
    <svg class="roof-route-line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path class="roof-route-glow" d="${path}"></path>
      <path class="roof-route-main" d="${path}"></path>
    </svg>
    <span class="roof-route-dino" style="left:${dinoPoint.x}%; top:${dinoPoint.y}%;" aria-hidden="true"></span>
  `;

  parts.forEach((part, index) => {
    const note = noteForMidi(part.midi) || notes[0];
    const id = noteIdentity(note);
    const point = points[index] || points[0];
    const isDone = index < state.stepIndex;
    const isCurrent = index === state.stepIndex;
    const isUpcoming = index > state.stepIndex;
    const justLocked = isDone && index === state.routeJustLockedIndex;
    const currentLabel = note.name;
    const primaryLabel = isDone ? "✓" : (isCurrent ? currentLabel : "");
    const secondaryLabel = isCurrent
      ? (showLocator ? id.keyShort : "自己找")
      : (isDone ? note.name : "");
    const node = document.createElement("span");
    node.className = "roof-route-node";
    if (isDone) node.classList.add("done");
    if (isCurrent) node.classList.add("current");
    if (isUpcoming) node.classList.add("upcoming");
    if (justLocked) node.classList.add("just-locked");
    node.dataset.routeState = justLocked ? "just-locked" : isDone ? "done" : isCurrent ? "current" : "upcoming";
    node.dataset.note = note.name;
    node.dataset.solfege = note.solfege;
    node.style.left = `${point.x}%`;
    node.style.top = `${point.y}%`;
    node.style.setProperty("--roof-step", index);
    node.style.setProperty("--route-note-color", note.color);
    node.style.setProperty("--route-note-soft", alpha(note.color, 0.22));
    node.innerHTML = `
      <span class="roof-route-pad-ring" aria-hidden="true"></span>
      <span class="roof-route-roof" aria-hidden="true"></span>
      <span class="roof-route-lock" aria-hidden="true"></span>
      <span class="roof-route-label">
        <strong>${primaryLabel}</strong>
        <em>${secondaryLabel}</em>
      </span>
    `;
    els.roofScaleRoute.appendChild(node);
  });
}

function renderSceneFixture(scene, partCount = 0) {
  const fixtureCounts = {
    lights: 3,
    wheel: 2,
    bridge: 4,
    rocket: 3,
    stars: 5,
    roof: 5
  };
  const count = scene === "stars" && partCount > 0 ? partCount : fixtureCounts[scene];
  if (!count) return;

  const fixture = document.createElement("span");
  fixture.className = `scene-fixture scene-fixture-${scene}`;
  fixture.setAttribute("aria-hidden", "true");
  for (let index = 0; index < count; index += 1) {
    const marker = document.createElement("span");
    marker.className = "scene-fixture-mark";
    fixture.appendChild(marker);
  }
  els.baseBuild.appendChild(fixture);
  if (scene === "wheel" && activeLevel()?.id === "M03" && state.stepIndex >= activeLevel().parts.length) {
    els.baseBuild.insertAdjacentHTML("beforeend", `
      <span class="m03-wheel-complete" aria-hidden="true">
        <i class="m03-cart-body"></i>
        <i class="m03-cart-wheel wheel-left"></i>
        <i class="m03-cart-wheel wheel-right"></i>
        <i class="m03-cart-spark">✓</i>
      </span>
    `);
  }
}

function setInstructionFeedback() {
  els.feedback.classList.remove("good", "bad");
  const part = activePart();
  const target = noteForMidi(activeTargetMidi()) || notes[0];
  els.feedback.textContent = instructionFeedbackFor(activeLevel(), part, target);
}

function renderStepStrip(level) {
  els.stepStrip.innerHTML = "";
  const parts = level.parts || [];
  const suppressListeningObjectIdentity = shouldSuppressListeningObjectIdentity(level);
  parts.forEach((part, index) => {
    const hideChipIdentity = suppressListeningObjectIdentity && index >= state.stepIndex;
    const chip = document.createElement("span");
    chip.className = "step-chip";
    chip.dataset.identityHidden = hideChipIdentity ? "true" : "false";
    if (index < state.stepIndex) chip.classList.add("done");
    if (index === state.stepIndex) chip.classList.add("active");
    chip.textContent = hideChipIdentity
      ? (index === state.stepIndex ? `听第 ${index + 1} 声` : `第 ${index + 1} 声`)
      : part.label;
    chip.style.color = hideChipIdentity ? LISTENING_IDENTITY_NEUTRAL : part.color;
    els.stepStrip.appendChild(chip);
  });
}

function setStaffDinoTip(message, color, tone = "ready") {
  if (!els.staffDinoWrap) return;
  els.staffDinoWrap.dataset.tip = message;
  els.staffDinoWrap.dataset.tipTone = tone;
  if (color) {
    els.staffDinoWrap.style.setProperty("--tip-color", color);
    els.staffDinoWrap.style.setProperty("--tip-glow", alpha(color, 0.22));
  }
}

function syncStaffFallbackCopy({ target, targetId, staffHint, isCheckRun, finished }) {
  const title = finished ? "星桥到达" : (isCheckRun ? "少提示星桥" : staffCourse.title);
  const prompt = finished
    ? "星芽跳到对面星球。"
    : isCheckRun
    ? `看${staffHint}，读 ${targetId.letter}，自己找键。`
    : `看${staffHint}，读 ${targetId.letter}，找${targetId.keyLong}。`;
  const cueText = finished ? "星桥完成" : `${targetId.full} · ${staffHint} · ${targetId.keyShort}`;

  if (els.levelTitle) els.levelTitle.textContent = title;
  if (els.levelPrompt) els.levelPrompt.textContent = prompt;
  if (els.stageTitle) els.stageTitle.textContent = finished ? "星桥终点" : `${target.name} 星垫`;
  if (els.feedback) {
    els.feedback.classList.remove("good", "bad");
    els.feedback.textContent = finished ? "谱线星桥读完啦。" : "看谱位、读音名、找琴键。";
  }
  if (els.hangingPart) {
    const hangingLabel = els.hangingPart.querySelector("strong");
    if (hangingLabel) hangingLabel.textContent = finished ? "终点星球" : `${target.name} 星垫`;
  }
  if (els.rewardCard) {
    const brick = els.rewardCard.querySelector(".reward-brick");
    const strong = els.rewardCard.querySelector("strong");
    const small = els.rewardCard.querySelector("small");
    els.rewardCard.style.setProperty("--part-color", target.color);
    els.rewardCard.style.setProperty("--part-color-soft", alpha(target.color, 0.18));
    if (brick) brick.style.setProperty("--part-image", imageCssUrl(partImages.star));
    if (strong) strong.textContent = finished ? "星桥完成" : `${target.name} 星垫`;
    if (small) small.textContent = isCheckRun ? "少提示复读" : "看谱跳桥";
  }
  if (els.targetNote) {
    els.targetNote.classList.remove("listen-card", "check-note-card");
    els.targetNote.classList.add("note-chip-card");
    els.targetNote.removeAttribute("tabindex");
    els.targetNote.removeAttribute("role");
    els.targetNote.removeAttribute("aria-label");
    els.targetNote.style.color = target.color;
    els.targetNote.style.setProperty("--target-color", target.color);
    els.targetNote.style.setProperty("--target-soft", alpha(target.color, 0.14));
    els.targetNote.style.setProperty("--target-glow", alpha(target.color, 0.20));
    els.targetNote.innerHTML = finished
      ? `<small>完成</small><strong>✓</strong><span>对面星球</span><em>星桥完成</em>`
      : `<small>${isCheckRun ? "少提示" : "下一跳"}</small><strong>${target.name}</strong><span>${targetId.keyShort}</span><em>${staffHint}</em>`;
  }
  if (els.stageStoryRibbon) {
    els.stageStoryRibbon.style.setProperty("--story-color", target.color);
    els.stageStoryRibbon.style.setProperty("--story-soft", alpha(target.color, 0.18));
    els.stageStoryRibbon.innerHTML = `
      <span class="story-part-icon" style="--part-image:${imageCssUrl(partImages.star)}"></span>
      <span class="story-problem">${finished ? "星桥已经连到对面" : "星芽要跳到谱线星垫"}</span>
      <span class="story-note-pill" style="--note-color:${target.color}">${finished ? "✓" : target.name}</span>
      <span class="locator-mini" aria-hidden="true">${finished ? "终点" : locatorVisualHtml(target, "", "story-locator")}</span>
      <span class="story-staff-chip">${finished ? "完成" : staffHint}</span>
    `;
  }
  if (els.stageNoteText) els.stageNoteText.textContent = finished ? "✓" : target.name;
  if (els.stageNoteName) els.stageNoteName.textContent = finished ? "完成" : "";
  if (els.coachNote) els.coachNote.textContent = finished ? "星桥完成" : target.solfege;
  if (els.coachBubble) els.coachBubble.textContent = cueText;
}

function renderStaffScreen() {
  const steps = activeStaffSteps();
  const targetStep = activeStaffStep();
  const finalStep = steps[steps.length - 1] || staffCourse.steps[staffCourse.steps.length - 1];
  const target = noteForMidi((targetStep || finalStep)?.midi) || notes[0];
  const targetColor = target.color;
  const staffHint = friendlyStaffHint(targetStep || finalStep);
  const targetId = noteIdentity(target, targetStep || finalStep);
  const phase = learningPhases.staff;
  const finished = state.staffStepIndex >= steps.length;
  const isCheckRun = state.staffRunMode === "check";
  const isMini = isMiniStaffSession();
  const isRepairState = !finished && state.lastInputResult === "wrong";
  const showStaffTarget = !finished && (!isCheckRun || isRepairState);

  if (els.mainTitle) els.mainTitle.textContent = isMini ? "星桥前三跳" : (isCheckRun ? "少提示星桥" : staffCourse.title);
  els.levelBadge.textContent = isMini ? "S01·短" : (isCheckRun ? "S01·复" : staffCourse.id);
  syncStaffFallbackCopy({ target, targetId, staffHint, isCheckRun, finished });
  if (els.appShell) {
    els.appShell.dataset.phase = "staff";
    els.appShell.dataset.scaffold = isCheckRun ? "staff-check" : "staff";
    els.appShell.dataset.levelId = staffCourse.id;
    els.appShell.dataset.staffRunMode = state.staffRunMode;
    els.appShell.dataset.staffSession = state.staffSessionMode;
    els.appShell.dataset.staffRepairState = isRepairState ? "repair" : "idle";
  }
  if (els.moonYard) {
    els.moonYard.dataset.phase = "staff";
    els.moonYard.dataset.scaffold = isCheckRun ? "staff-check" : "staff";
    els.moonYard.dataset.levelId = staffCourse.id;
    els.moonYard.dataset.staffRunMode = state.staffRunMode;
    els.moonYard.dataset.staffSession = state.staffSessionMode;
    els.moonYard.dataset.staffRepairState = isRepairState ? "repair" : "idle";
  }
  if (els.chapterTitle) els.chapterTitle.textContent = isMini ? "观察小段 · 到休息星" : (isCheckRun ? "少提示复读 · 自己找键" : `${phase.label} · ${scaffoldLabels.staff}`);
  els.staffPrompt.textContent = finished
    ? isMini
      ? "前三跳完成，到小休息星先停一下。"
      : "全读对了，小恐龙跳到对面星球啦。"
    : isCheckRun
    ? `看${targetId.staffHint}，读 ${targetId.letter}，自己找键。`
    : isMini
    ? `看亮垫，听一声，帮星芽跳前三颗星。`
    : `看${targetId.staffHint}，读 ${targetId.letter}，找${targetId.keyLong}。`;
  if (els.staffDino && !els.staffDino.classList.contains("mood-bad")) {
    els.staffDino.src = finished ? dinoImages.celebrate : dinoImages.point;
  }
  els.staffFeedback.classList.remove("good", "bad");
  els.staffFeedback.textContent = "";
  if (els.staffStage) {
    const targetStageStep = targetStep || finalStep;
    const targetX = targetStageStep?.x ?? finalStep.x;
    const targetY = staffLaneY[targetStageStep?.lane] || staffLaneY[finalStep.lane] || 60;
    els.staffStage.style.setProperty("--staff-target-x", `${targetX}%`);
    els.staffStage.style.setProperty("--staff-target-y", `${targetY}%`);
    els.staffStage.style.setProperty("--staff-target-color", targetColor);
    els.staffStage.style.setProperty("--staff-target-soft", alpha(targetColor, 0.22));
    els.staffStage.dataset.targetLane = targetStageStep?.lane || "";
    els.staffStage.dataset.targetDone = finished ? "true" : "false";
    els.staffStage.dataset.repairState = isRepairState ? "repair" : "idle";
  }
  els.nextAction.style.setProperty("--part-color", targetColor);
  els.nextAction.style.setProperty("--part-color-soft", alpha(targetColor, 0.16));
  els.nextAction.innerHTML = isMini
    ? `
      <span class="cue-chip cue-pos"><small>亮垫</small><strong>${target.name}</strong></span>
      <span class="cue-connector" aria-hidden="true"></span>
      <span class="cue-chip cue-key-place"><small>找键</small><strong>${targetId.keyShort}</strong></span>
    `
    : `
      <span class="cue-chip cue-pos"><small>看谱</small><strong>${staffHint}</strong></span>
      <span class="cue-connector" aria-hidden="true"></span>
      <span class="cue-chip cue-note" style="--cue-color:${targetColor}"><small>读音</small><strong>${target.name}</strong></span>
      <span class="cue-connector" aria-hidden="true"></span>
      <span class="cue-chip cue-key-place"><small>找键</small><strong>${targetId.keyShort}</strong></span>
    `;
  if (els.staffVisualCue) {
    const fgSupport = staffFgSupportInfo(targetStep || finalStep);
    els.staffVisualCue.hidden = isRepairState;
    els.staffVisualCue.style.setProperty("--target-color", targetColor);
    els.staffVisualCue.style.setProperty("--target-soft", alpha(targetColor, 0.22));
    els.staffVisualCue.dataset.cueState = finished ? "done" : state.lastInputResult === "wrong" ? "wrong" : "ready";
    els.staffVisualCue.dataset.fgSupport = !finished && fgSupport.needed ? "true" : "false";
    els.staffVisualCue.dataset.fgSupportSource = !finished && fgSupport.needed ? fgSupport.source : "";
    els.staffVisualCue.innerHTML = finished
      ? `<span class="staff-cue-success" aria-hidden="true">✓</span><span class="staff-cue-flow" aria-hidden="true"></span><span class="staff-cue-finish-orb" aria-hidden="true"></span>`
      : `<span class="staff-cue-pad-icon" aria-hidden="true"><i></i></span><span class="staff-cue-flow" aria-hidden="true"></span>${fgSupport.needed ? `<span class="staff-cue-fg-support" aria-hidden="true"><i></i><b>${fgSupport.label}</b></span>` : ""}${locatorVisualHtml(target, "找这格", "staff-cue-locator")}`;
  }
  els.staffNoteCard.hidden = isRepairState;
  els.staffNoteCard.style.setProperty("--target-color", targetColor);
  els.staffNoteCard.style.setProperty("--target-soft", alpha(targetColor, 0.16));
  els.staffNoteCard.style.setProperty("--target-glow", alpha(targetColor, 0.22));
  els.staffNoteCard.innerHTML = finished
    ? isMini
      ? `<small>小休息星</small><strong>✓</strong><span>前三跳完成</span>`
      : `<small>全部读完</small><strong>✓</strong><span>对面星球</span>`
    : isCheckRun
    ? `<small>少提示</small><strong>${target.name}</strong><span>${staffHint}</span>`
    : isMini
    ? `<small>亮垫</small><strong>${target.name}</strong><span>${targetId.keyShort}</span>`
    : `<small>下一跳</small><strong>${target.name}</strong><span>${staffHint} · ${targetId.keyShort}</span>`;
  setStaffDinoTip(
    finished ? (isMini ? "休息星" : "到星门") : staffDinoTipForStep(targetStep || finalStep),
    targetColor,
    finished ? "done" : state.lastInputResult === "wrong" ? "wrong" : "ready"
  );
  els.dinoName.textContent = "星芽";
  els.dinoHint.textContent = finished
    ? isMini ? "休息星" : "到星门"
    : state.lastInputResult === "wrong"
    ? "看亮垫"
    : isCheckRun
    ? "自己找"
    : "跳亮垫";
  if (els.modeHint) els.modeHint.textContent = isMini ? "观察小段：只跳前三颗，看看孩子能不能理解谱桥。" : (isCheckRun ? "少提示复读：先不亮目标键，错了再提示。" : "五线谱星桥：看谱位、读音名、找琴键。");
  els.heardStatus.textContent = "听到：--";
  els.inputStatus.textContent = "输入：屏幕琴键";

  renderLevelMap();
  renderStaffSteps();
  renderStaffProgress();
  positionStaffDino();
  updateStaffJumpGuide();
  renderKeyboard(target, { targetColor, disableTarget: finished, scaffold: isCheckRun ? "staff-check" : "staff", showTarget: showStaffTarget });
  renderMapScreen();
}

function renderStaffSteps() {
  els.staffSteps.innerHTML = "";
  const steps = activeStaffSteps();
  const miniFinalIndex = isMiniStaffSession() ? steps.length - 1 : -1;
  steps.forEach((step, index) => {
    const note = noteForMidi(step.midi) || notes[0];
    const isDone = index < state.staffStepIndex || state.staffComplete;
    const isCurrent = index === state.staffStepIndex && !state.staffComplete;
    const isFuture = !isDone && !isCurrent;
    const isHint = state.lastInputResult === "wrong" && index === state.staffStepIndex;
    const isMiniRest = index === miniFinalIndex;
    const fgSupport = isCurrent ? staffFgSupportInfo(step) : { needed: false, source: "" };
    const noteLabel = `<strong>${note.name}</strong>`;
    const pad = document.createElement("button");
    pad.className = "staff-step";
    pad.type = "button";
    pad.disabled = true;
    pad.style.left = `${step.x}%`;
    pad.style.top = `${staffLaneY[step.lane] || 60}%`;
    pad.style.setProperty("--note-color", note.color);
    pad.style.setProperty("--note-soft", alpha(note.color, 0.18));
    pad.style.setProperty("--note-glow", alpha(note.color, 0.26));
    pad.dataset.midi = String(step.midi);
    pad.dataset.lane = step.lane || "";
    pad.dataset.index = String(index + 1);
    pad.dataset.staffHint = step.staffHint || "";
    pad.dataset.stepState = isDone ? "done" : isCurrent ? "current" : "locked";
    pad.dataset.revealed = isHint ? "true" : "false";
    pad.dataset.fgSupport = fgSupport.needed ? "true" : "false";
    pad.dataset.fgSupportSource = fgSupport.needed ? fgSupport.source : "";
    pad.dataset.miniRest = isMiniRest ? "true" : "false";
    pad.setAttribute("aria-label", `${step.label}，谱位${step.staffHint || ""}，${note.solfege}，${note.name}`);
    if (isDone) pad.classList.add("done");
    if (isCurrent) pad.classList.add("current");
    if (isFuture) pad.classList.add("locked");
    if (isHint) pad.classList.add("hint");
    if (fgSupport.needed) pad.classList.add("fg-support");
    if (isMiniRest) pad.classList.add("mini-rest");
    pad.innerHTML = `
      <span class="staff-note-aura" aria-hidden="true"></span>
      <span class="staff-note-head" aria-hidden="true"><i></i></span>
      ${fgSupport.needed ? `<span class="staff-fg-support-mark" aria-hidden="true"><i></i></span>` : ""}
      ${isMiniRest ? `<span class="staff-mini-rest-mark" aria-hidden="true">休</span>` : ""}
      <span class="staff-note-label">
        ${noteLabel}
      </span>
      <em class="staff-place">${step.staffHint || ""}</em>
    `;
    els.staffSteps.appendChild(pad);
  });
}

function renderStaffProgress() {
  els.staffProgress.innerHTML = "";
  activeStaffSteps().forEach((step, index) => {
    const dot = document.createElement("span");
    dot.className = "staff-dot";
    if (index < state.staffStepIndex) dot.classList.add("done");
    if (index === state.staffStepIndex && !state.staffComplete) dot.classList.add("active");
    els.staffProgress.appendChild(dot);
  });
}

function positionStaffDino() {
  const { x, y, place } = staffDinoPosition();
  els.staffDinoWrap.style.left = `${x}%`;
  els.staffDinoWrap.style.top = `${y}%`;
  els.staffDinoWrap.dataset.place = place;
  positionStaffDinoTip({ x, place });
}

function positionStaffDinoTip({ x, place }) {
  if (!els.staffDinoWrap) return;
  const wrap = els.staffDinoWrap;
  let side = "center";
  let vars = {
    "--tip-left": "58%",
    "--tip-top": "-56px",
    "--tip-min": "148px",
    "--tip-max": "190px",
    "--tip-transform": "translateX(-16%)",
    "--tip-radius": "18px 18px 18px 7px",
    "--tip-tail-left": "58%",
    "--tip-tail-top": "-10px"
  };

  if (place === "start" || x < 34) {
    side = "right";
    vars = {
      "--tip-left": "78%",
      "--tip-top": "-76px",
      "--tip-min": "174px",
      "--tip-max": "220px",
      "--tip-transform": "none",
      "--tip-radius": "18px 18px 18px 8px",
      "--tip-tail-left": "76%",
      "--tip-tail-top": "-23px"
    };
  } else if (place === "finish" || x > 72) {
    side = "left";
    vars = {
      "--tip-left": "-94%",
      "--tip-top": "-46px",
      "--tip-min": "150px",
      "--tip-max": "190px",
      "--tip-transform": "none",
      "--tip-radius": "18px 18px 7px 18px",
      "--tip-tail-left": "10%",
      "--tip-tail-top": "-3px"
    };
  }

  wrap.dataset.tipSide = side;
  Object.entries(vars).forEach(([name, value]) => {
    wrap.style.setProperty(name, value);
  });
}

function updateStaffJumpGuide() {
  if (!els.staffJumpGuide || !els.staffJumpGuidePath || !els.staffJumpGuideShadow) return;

  const targetStep = activeStaffStep();
  if (!targetStep || state.staffComplete || state.lastInputResult === "wrong") {
    els.staffJumpGuide.hidden = true;
    if (els.staffJumpFootprints) els.staffJumpFootprints.innerHTML = "";
    return;
  }

  const note = noteForMidi(targetStep.midi) || notes[0];
  const from = staffDinoPosition();
  const to = {
    x: targetStep.x,
    y: staffLaneY[targetStep.lane] || 60
  };
  const distance = Math.hypot(to.x - from.x, to.y - from.y);
  const lift = Math.min(46, Math.max(34, distance * 0.72));
  const control = {
    x: (from.x + to.x) / 2,
    y: Math.max(8, Math.min(from.y, to.y) - lift)
  };
  const path = `M ${from.x.toFixed(1)} ${from.y.toFixed(1)} Q ${control.x.toFixed(1)} ${control.y.toFixed(1)} ${to.x.toFixed(1)} ${to.y.toFixed(1)}`;

  els.staffJumpGuide.hidden = false;
  els.staffJumpGuide.style.setProperty("--guide-color", note.color);
  els.staffJumpGuide.style.setProperty("--guide-soft", alpha(note.color, 0.24));
  els.staffJumpGuidePath.setAttribute("d", path);
  els.staffJumpGuideShadow.setAttribute("d", path);

  if (!els.staffJumpFootprints) return;
  els.staffJumpFootprints.style.setProperty("--guide-color", note.color);
  els.staffJumpFootprints.style.setProperty("--guide-soft", alpha(note.color, 0.22));
  els.staffJumpFootprints.innerHTML = [0.18, 0.38, 0.58, 0.78].map((ratio, index) => {
    const x = (1 - ratio) * (1 - ratio) * from.x + 2 * (1 - ratio) * ratio * control.x + ratio * ratio * to.x;
    const y = (1 - ratio) * (1 - ratio) * from.y + 2 * (1 - ratio) * ratio * control.y + ratio * ratio * to.y;
    const rotation = Math.atan2(to.y - from.y, to.x - from.x) * 180 / Math.PI;
    return `<span style="left:${x.toFixed(2)}%; top:${y.toFixed(2)}%; --foot-rotation:${rotation.toFixed(1)}deg; --foot-delay:${index * 130}ms"></span>`;
  }).join("");
}

function staffDinoPosition() {
  if (state.staffComplete) {
    if (isMiniStaffSession()) {
      const restStep = activeStaffSteps()[activeStaffStepCount() - 1];
      if (restStep) {
        return {
          x: restStep.x,
          y: (staffLaneY[restStep.lane] || 60) - 7.5,
          place: "mini-rest"
        };
      }
    }
    return { x: 88, y: 55.5, place: "finish" };
  }

  const lastStep = activeStaffSteps()[Math.max(0, state.staffStepIndex - 1)];
  if (state.staffStepIndex > 0 && lastStep) {
    return {
      x: lastStep.x,
      y: staffLaneY[lastStep.lane] || 60,
      place: "pad"
    };
  }

  return { x: 11.4, y: 83.5, place: "start" };
}

function renderKeyboard(target, options = {}) {
  els.keyboard.innerHTML = "";
  els.keyboard.classList.add("real-piano");
  els.keyboard.classList.remove("is-playing", "is-releasing");
  const level = options.level || (state.screen === "play" ? activeLevel() : null);
  const scaffold = options.scaffold || level?.scaffold || (state.screen === "staff" ? "staff" : "strong");
  const showTargetCue = shouldShowKeyboardTarget(level, options);
  const concealTargetIdentity = Boolean(options.concealTargetIdentity);
  markAttemptCue(options.disableTarget ? "none" : (showTargetCue ? "strong" : "soft"));
  els.keyboard.dataset.scaffold = scaffold;
  els.keyboard.dataset.targetVisible = showTargetCue ? "true" : "false";

  const guideLayer = document.createElement("div");
  guideLayer.className = "keyboard-guide-layer";
  guideLayer.setAttribute("aria-hidden", "true");
  guideLayer.innerHTML = `
    <span class="keyboard-guide-band guide-two-black"><span>2 个黑键</span></span>
    <span class="keyboard-guide-band guide-three-black"><span>3 个黑键</span></span>
  `;
  els.keyboard.appendChild(guideLayer);

  const locatorShort = ["2黑左", "2黑中", "2黑右", "3黑左", "3黑左中", "3黑正中", "3黑右"];

  notes.forEach((note, index) => {
    const key = document.createElement("button");
    key.className = "key white-key";
    key.type = "button";
    key.dataset.midi = String(note.midi);
    key.dataset.note = note.name;
    key.dataset.locator = note.locator;
    key.dataset.scaffold = scaffold;
    key.dataset.courseStatus = note.courseStatus || "core";
    const reserved = isReservedNote(note);
    if (reserved) key.classList.add("reserved-key");
    key.setAttribute("aria-label", reserved ? `${note.name} 后面再学的琴键` : `${note.name} ${note.solfege} ${note.locator}`);
    key.style.setProperty("--key-index", index + 1);
    const part = activePart();
    const targetColor = options.targetColor || part?.color || note.color;
    const isTargetNote = !concealTargetIdentity && note.midi === target.midi;
    const isTargetKey = showTargetCue && isTargetNote;
    key.style.borderColor = isTargetKey ? targetColor : "rgba(23,32,51,0.14)";
    if (isTargetNote) {
      key.dataset.targetNote = "true";
      key.style.setProperty("--target-color", targetColor);
      key.style.setProperty("--target-glow", alpha(targetColor, isTargetKey ? 0.18 : 0.08));
      key.style.setProperty("--target-soft", alpha(targetColor, isTargetKey ? 0.14 : 0.06));
    }
    key.style.setProperty("--note-color", note.color);
    key.style.setProperty("--press-glow", alpha(note.color, 0.22));
    if (isTargetKey) key.classList.add("target");
    if (isTargetNote && !isTargetKey) key.classList.add("target-muted");
    if (note.midi === state.lastInputMidi) {
      key.classList.add("hit");
      if (state.lastInputResult) key.classList.add(`hit-${state.lastInputResult}`);
    }
    const tapBadge = isTargetKey ? `<span class="tap-badge" aria-hidden="true"></span><span class="tap-finger" aria-hidden="true"><i></i></span>` : "";
    const keyLabel = reserved
      ? `<strong>${note.name}</strong><span>后面</span>`
      : `<strong>${note.name}</strong>`;
    const keyTag = reserved ? "后面学" : (friendlyKeyLocator(note) || locatorShort[index]);
    const keyFindTag = reserved ? `<span class="key-find-tag">${keyTag}</span>` : "";
    const keyLocatorVisual = !reserved && isTargetKey
      ? locatorVisualHtml(note, "住这里", "key-locator-mini")
      : "";
    key.innerHTML = `${tapBadge}${keyFindTag}${keyLocatorVisual}<span class="key-color-dot" aria-hidden="true"></span><div class="key-content">${keyLabel}</div>`;
    key.addEventListener("pointerdown", (event) => {
      beginKeyboardPress(key);
      showKeyPressRipple(key);
      playPianoNote(note.frequency, { gain: 0.10, duration: 0.42 });
      if (state.screen === "play" && !isListeningLevel() && activeLevel()?.id !== "M08") showKeyPressLabel(key, note);
      key.setPointerCapture?.(event.pointerId);
    });
    key.addEventListener("pointerup", () => {
      releaseKeyboardPress(key);
      releaseGardenInput(note.midi, "屏幕");
    });
    key.addEventListener("pointerleave", () => releaseKeyboardPress(key));
    key.addEventListener("pointercancel", () => {
      releaseKeyboardPress(key);
      releaseGardenInput(note.midi, "屏幕");
    });
    key.addEventListener("click", () => handleInput(note.midi, "屏幕"));
    els.keyboard.appendChild(key);
  });

  for (const keyDef of [
    ["black-cs", "C#", "14.285714%"],
    ["black-ds", "D#", "28.571429%"],
    ["black-fs", "F#", "57.142857%"],
    ["black-gs", "G#", "71.428571%"],
    ["black-as", "A#", "85.714286%"]
  ]) {
    const blackKey = document.createElement("button");
    blackKey.className = `black-key ${keyDef[0]}`;
    blackKey.type = "button";
    blackKey.setAttribute("aria-label", keyDef[1]);
    blackKey.style.setProperty("--black-center", keyDef[2]);
    blackKey.addEventListener("pointerdown", (event) => {
      beginKeyboardPress(blackKey);
      blackKey.setPointerCapture?.(event.pointerId);
      showKeyPressRipple(blackKey);
      playBlackKeyTick();
    });
    blackKey.addEventListener("pointerup", () => releaseKeyboardPress(blackKey));
    blackKey.addEventListener("pointerleave", () => releaseKeyboardPress(blackKey));
    blackKey.addEventListener("pointercancel", () => releaseKeyboardPress(blackKey));
    blackKey.addEventListener("click", () => showBlackKeyMarker(blackKey));
    els.keyboard.appendChild(blackKey);
  }
}

function beginKeyboardPress(key) {
  key.classList.add("pressed");
  els.keyboard.classList.remove("is-releasing");
  els.keyboard.classList.add("is-playing");
}

function releaseKeyboardPress(key) {
  key?.classList.remove("pressed");
  if (!els.keyboard?.classList.contains("is-playing")) return;
  els.keyboard.classList.remove("is-playing");
  els.keyboard.classList.add("is-releasing");
  clearTimeout(els.keyboard.releaseTimer);
  els.keyboard.releaseTimer = setTimeout(() => {
    els.keyboard?.classList.remove("is-releasing");
    els.keyboard.releaseTimer = null;
  }, 180);
}

function showBlackKeyMarker(key) {
  key.classList.remove("black-tapped");
  void key.offsetWidth;
  key.classList.add("black-tapped");
  setTimeout(() => key.classList.remove("black-tapped"), 680);
}

function showKeyPressRipple(key, result = "press") {
  const ripple = document.createElement("span");
  ripple.className = `key-touch-ripple ripple-${result}`;
  ripple.setAttribute("aria-hidden", "true");
  key.appendChild(ripple);
  setTimeout(() => ripple.remove(), 560);
}

function pulseKeyboardKey(key, note, result = "press", options = {}) {
  if (!key) return;
  if (key.pressTimer) clearTimeout(key.pressTimer);
  key.classList.remove("program-press", "program-correct", "program-wrong", "program-hint");
  beginKeyboardPress(key);
  key.classList.add("program-press", `program-${result}`);
  showKeyPressRipple(key, result);
  if (note && options.showLabel !== false) showKeyPressLabel(key, note, result);
  const hold = result === "hint" ? 520 : 340;
  key.pressTimer = setTimeout(() => {
    releaseKeyboardPress(key);
    key.classList.remove("program-press", `program-${result}`);
    key.pressTimer = null;
  }, hold);
}

function showKeyPressLabel(key, note, result = "press") {
  const rect = key.getBoundingClientRect();
  const label = document.createElement("span");
  const staffClass = state.screen === "staff" ? " staff-key-label" : "";
  label.className = `key-press-label label-${result}${staffClass}`;
  label.innerHTML = `<strong>${note.name}</strong>`;
  label.setAttribute("aria-hidden", "true");
  label.style.left = `${rect.left + rect.width / 2}px`;
  label.style.top = `${rect.top + Math.max(26, rect.height * 0.24)}px`;
  label.style.setProperty("--note-color", note.color);
  label.style.setProperty("--note-soft", alpha(note.color, 0.20));
  document.body.appendChild(label);
  setTimeout(() => label.remove(), 680);
}

function renderEarned() {
  els.earnedList.innerHTML = "";
  if (state.earned.length === 0) {
    els.earnedList.closest(".earned").hidden = true;
  } else {
    els.earnedList.closest(".earned").hidden = false;
    for (const block of state.earned) {
      const li = document.createElement("li");
      li.textContent = block;
      els.earnedList.appendChild(li);
    }
  }

}

function clearAssistedRepairState() {
  if (state.assistedSuccessTimer) {
    clearTimeout(state.assistedSuccessTimer);
    state.assistedSuccessTimer = null;
  }
  state.assistedSuccessPending = false;
  if (state.practiceAttempt) state.practiceAttempt.assistedMode = false;
}

function beginAssistedRepair(targetMidi) {
  const attempt = state.practiceAttempt;
  const stepWrongs = attempt?.activeStepRecord?.wrongs || 0;
  if (!attempt?.formalSession || stepWrongs < 3) return false;
  if (state.assistedSuccessPending) {
    if (stepWrongs >= 4) completeModeledSuccess(targetMidi, "assisted-retry-wrong");
    return true;
  }
  state.assistedSuccessPending = true;
  attempt.assistedMode = true;
  markAttemptCue("strong");
  if (state.activeSession) {
    state.activeSession.restAfterCurrentLevel = true;
    persistActiveSession();
  }
  const target = noteForMidi(targetMidi);
  const id = noteIdentity(target, state.screen === "staff" ? activeStaffStep() : null);
  if (state.screen === "staff") {
    els.staffFeedback.classList.remove("good", "bad");
    els.staffFeedback.textContent = `星芽先示范 ${id.letter}，再按亮起的琴键。`;
    setStaffDinoTip(`${id.solfege}/${id.letter} · 跟着亮键`, target?.color || "#FFD166", "wrong");
  } else {
    els.feedback.classList.remove("good", "bad");
    els.feedback.textContent = `星芽先示范 ${id.letter}，再按亮起的琴键。`;
    if (els.dinoHint) els.dinoHint.textContent = `跟星芽一起按 ${id.letter}`;
  }
  state.assistedSuccessTimer = setTimeout(() => {
    playPianoNote(target?.frequency || 261.63, { gain: 0.10, duration: 0.52 });
    showInputEffect(targetMidi, "hint");
    state.assistedSuccessTimer = setTimeout(() => {
      state.assistedSuccessTimer = null;
      if (state.assistedSuccessPending) completeModeledSuccess(targetMidi, "assisted-retry-timeout");
    }, 5200);
  }, 260);
  return true;
}

function completeModeledSuccess(targetMidi, reason) {
  const attempt = state.practiceAttempt;
  if (!state.assistedSuccessPending || !attempt?.assistedMode) return false;
  if (state.assistedSuccessTimer) {
    clearTimeout(state.assistedSuccessTimer);
    state.assistedSuccessTimer = null;
  }
  state.assistedSuccessPending = false;
  attempt.assistedMode = false;
  attempt.assistedSuccesses = (attempt.assistedSuccesses || 0) + 1;
  attempt.modeledSuccesses = (attempt.modeledSuccesses || 0) + 1;
  attempt.modeledInputs.push({
    source: "model",
    reason,
    targetMidi,
    stepKey: currentAttemptStepKey(),
    completedAt: new Date().toISOString()
  });
  if (attempt.activeStepRecord) {
    attempt.stepRecords.push({
      ...attempt.activeStepRecord,
      inputRoutes: { ...attempt.activeStepRecord.inputRoutes },
      correctResponseMs: null,
      modeledSuccess: true
    });
    attempt.activeStepRecord = null;
  }

  const target = noteForMidi(targetMidi);
  state.lastInputMidi = targetMidi;
  state.lastInputResult = "correct";
  state.stepHadWrong = false;
  playPianoNote(target?.frequency || 261.63, { gain: 0.10, duration: 0.56 });
  playCorrectSound();

  if (state.screen === "staff") {
    state.staffStepIndex = activeStaffStepCount();
    render();
    els.staffFeedback.classList.remove("bad");
    els.staffFeedback.classList.add("good");
    els.staffFeedback.textContent = "星芽和你一起走到安全点，现在歇一歇。";
    setStaffDinoTip("一起到休息点", target?.color || "#FFD166", "done");
    completeStaffCourse();
    return true;
  }

  const level = activeLevel();
  state.stepIndex = level.parts.length;
  render();
  flashBuildArea(level.parts.length - 1, true);
  els.feedback.classList.remove("bad");
  els.feedback.classList.add("good");
  els.feedback.textContent = "星芽和你一起把这一小段安顿好，现在歇一歇。";
  completeLevel("model");
  return true;
}

function markAssistedRepairSuccess() {
  if (!state.assistedSuccessPending || !state.practiceAttempt?.assistedMode) return false;
  state.practiceAttempt.assistedSuccesses = (state.practiceAttempt.assistedSuccesses || 0) + 1;
  clearAssistedRepairState();
  return true;
}

function handleInput(midi, source) {
  if (gameplayInputIsBlocked()) return;
  if (state.screen === "garden") {
    if (currentListeningAction()) handleLs04Input(midi, source);
    else handleGardenInput(midi, source);
    return;
  }
  if (state.screen === "staff") {
    handleStaffInput(midi, source);
    return;
  }
  clearWorkshopIdleHints();
  clearLevelIntro();

  const targetMidi = activeTargetMidi();
  const heard = noteForMidi(midi);
  const target = noteForMidi(targetMidi);
  const inputLevel = activeLevel();
  const usesBlueprintLock = inputLevel?.id === "M08";
  state.lastInputMidi = midi;

  els.heardStatus.textContent = `听到：${heard ? heard.name : midi}`;
  els.inputStatus.textContent = `输入：${source}`;

  if (midi === targetMidi) {
    recordPracticeInput({ correct: true, target, heard: heard || target, source });
    const assistedRepair = markAssistedRepairSuccess();
    state.lastInputResult = "correct";
    const correctMidi = midi;
    const droppedPart = activePart();
    const level = inputLevel;
    const suppressListeningCompletionEffects = level?.id === "M03" && state.stepIndex === level.parts.length - 1;
    if (!usesBlueprintLock && !suppressListeningCompletionEffects) showFlyingPart(droppedPart);
    pulseBuildStage("correct");
    playCorrectSound();
    state.stepIndex += 1;
    state.stepHadWrong = false;
    setRouteJustLocked(level, state.stepIndex - 1);
    render();
    const levelFinished = state.stepIndex >= activeLevel().parts.length;
    if (!levelFinished) {
      beginPracticeStepClock();
      scheduleWorkshopIdleHints();
    }
    flashBuildArea(state.stepIndex - 1, levelFinished);
    if (levelFinished) {
      completeLevel(source);
    } else {
      const correctId = noteIdentity(heard || target);
      const nextTarget = noteForMidi(activeTargetMidi()) || target;
      const nextId = noteIdentity(nextTarget);
      const story = successStoryFor(activeLevel(), droppedPart, heard || target, nextTarget);
      els.feedback.classList.remove("bad");
      els.feedback.classList.add("good");
      els.feedback.textContent = assistedRepair
        ? `${correctId.letter} 跟着星芽修好了，完成这一小段后休息。`
        : `${correctId.letter} 找到了，${story.subtitle}。`;
      // A correct input changes the plan, crane card, character and piano immediately.
      // Keep the large scene toast for repair only so it cannot cover the next blueprint step.
      setDinoMood("good");
      if (isListeningLevel(activeLevel())) {
        scheduleListeningPrompt(560);
      }
    }
    showInputEffect(correctMidi, "correct", { showLabel: !usesBlueprintLock && !suppressListeningCompletionEffects });
    if (!usesBlueprintLock && !suppressListeningCompletionEffects) {
      showKeySpriteEffect(correctMidi, "correct");
      showNoteBurst(correctMidi, "correct", heard || target);
      showMusicFlight(correctMidi, heard || target, getPlayFlightTarget(state.stepIndex - 1), "correct");
    }
  } else {
    recordPracticeInput({ correct: false, target, heard, source });
    state.lastInputResult = "wrong";
    pulseBuildStage("wrong");
    playWrongSound();
    render();
    els.feedback.classList.remove("good");
    els.feedback.classList.add("bad");
    const listeningRepair = isListeningLevel(activeLevel());
    els.feedback.textContent = wrongFeedbackFor(heard, target);
    if (!listeningRepair && !usesBlueprintLock) {
      const story = wrongStoryFor(activeLevel(), target, heard);
      showStageInputToast("wrong", {
        title: story.title,
        note: isReservedNote(heard) ? heard : target,
        subtitle: story.subtitle
      });
    }
    setDinoMood("bad");
    showInputEffect(midi, "wrong", { showLabel: !usesBlueprintLock });
    if (!listeningRepair && !usesBlueprintLock) showNoteBurst(midi, "wrong", heard);
    if (listeningRepair) {
      setTimeout(() => playListeningPrompt(), 220);
    }
    setTimeout(() => {
      showInputEffect(targetMidi, "hint", { showLabel: !usesBlueprintLock });
      if (!listeningRepair && !usesBlueprintLock) {
        showNoteBurst(targetMidi, "hint", target);
        showMusicFlight(targetMidi, target, getPlayFlightTarget(state.stepIndex), "hint");
      }
    }, 90);
    if (!listeningRepair && !usesBlueprintLock) showKeySpriteEffect(midi, "wrong");
    beginAssistedRepair(targetMidi);
  }
}

function releaseGardenInput(midi, source) {
  if (state.screen !== "garden") return;
  if (currentListeningAction()) return;
  const lesson = currentGardenLesson();
  if (!lesson || lesson.midi !== midi) return;
  state.gardenInputArmed = true;
  if (els.gardenScene) els.gardenScene.dataset.inputArmed = "true";
}

function ls04FormalAttempt(attempt) {
  const session = state.activeSession;
  const action = currentListeningAction();
  return {
    kind: "level",
    id: "LS04",
    runMode: "check",
    corrects: attempt.correctCount,
    wrongs: attempt.totalWrongCount,
    cueStrength: attempt.strongCueUsed ? "strong" : "soft",
    strongCueFrames: attempt.strongCueUsed ? 1 : 0,
    inputRoutes: { ...attempt.inputRoutes },
    hasExperimentalInput: attempt.hasExperimentalInput,
    assistedSuccesses: attempt.strongCueUsed ? 1 : 0,
    modeledSuccesses: attempt.modeled ? 1 : 0,
    modeledInputs: attempt.modeledInputs.map((input) => ({ ...input })),
    formalSession: true,
    sessionId: session?.sessionId || null,
    bundleId: session?.bundleId || null,
    sessionActionId: action?.actionId || null,
    localDateKey: session?.localDateKey || null,
    sessionRole: action?.role || "lesson",
    reviewSkillKey: null,
    requiredReview: false,
    sessionStartedAt: session?.startedAt || null,
    voluntaryReplay: false
  };
}

function recordLs04Outcome({ completed, reason }) {
  const session = state.activeSession;
  const action = currentListeningAction();
  const attempt = ensureLs04Attempt();
  if (!session || !action || !attempt) return null;
  const completedAt = new Date().toISOString();
  const stable = completed && attempt.correctCount >= 3 &&
    !attempt.targetRevealedBeforeResponse && !attempt.strongCueUsed &&
    !attempt.modeled && !attempt.hasExperimentalInput;
  const formalAttempt = ls04FormalAttempt(attempt);
  const existing = state.learningStats.levels.LS04 || {
    completions: 0,
    formalCompletions: 0,
    stableCompletions: 0,
    needsPractice: false
  };
  existing.completions = (Number(existing.completions) || 0) + 1;
  existing.formalCompletions = (Number(existing.formalCompletions) || 0) + 1;
  existing.lastCompletedAt = completedAt;
  existing.lastFormalCompletedAt = completedAt;
  existing.lastWrongCount = attempt.totalWrongCount;
  existing.lastRunMode = "check";
  existing.lastCueStrength = formalAttempt.cueStrength;
  existing.lastStrongCueFrames = formalAttempt.strongCueFrames;
  existing.lastInputRoutes = { ...attempt.inputRoutes };
  existing.lastExperimentalInput = attempt.hasExperimentalInput;
  existing.lastAttempt = {
    completedAt,
    completed,
    reason,
    correctCount: attempt.correctCount,
    wrongCount: attempt.totalWrongCount,
    strongCueUsed: attempt.strongCueUsed,
    modeled: attempt.modeled,
    inputRoutes: { ...attempt.inputRoutes }
  };
  const evidence = recordRetentionEvidence({
    kind: "level",
    id: "LS04",
    attempt: formalAttempt,
    stable,
    priorStableCompletions: existing.stableCompletions,
    completedAt
  });
  if (stable && evidence.clockValid === true) existing.stableCompletions += 1;
  existing.needsPractice = !stable;
  existing.todayNeedsPractice = !stable;
  existing.todayNeedsPracticeDate = localDateKeyAt(completedAt);
  state.learningStats.levels.LS04 = existing;
  saveLearningStats();

  const completion = {
    actionId: action.actionId,
    kind: "garden-listening",
    targetId: "LS04",
    runMode: "check",
    reviewableForMastery: true,
    completedAt,
    completed,
    reason,
    correctCount: attempt.correctCount,
    wrongCount: attempt.totalWrongCount,
    stable: Boolean(evidence.stableEvent),
    retained: false,
    strongCueUsed: attempt.strongCueUsed,
    modeled: attempt.modeled,
    hasExperimentalInput: attempt.hasExperimentalInput,
    inputRoutes: { ...attempt.inputRoutes },
    sequence: attempt.sequence.slice(),
    scoredCalls: attempt.scoredCalls.map((call) => ({ ...call }))
  };
  session.completedActions.push(completion);
  state.chapter3.ls04Attempts.push({ ...completion, sessionId: session.sessionId });
  state.chapter3.ls04Attempts = state.chapter3.ls04Attempts.slice(-20);
  if (completed) {
    state.chapter3.completed = false;
    state.chapter3.ls04Completed = true;
    state.chapter3.lessonEvidence.LS04 = {
      completedAt,
      sessionId: session.sessionId,
      bundleId: session.bundleId,
      correctCount: attempt.correctCount,
      wrongCount: attempt.totalWrongCount,
      stable: completion.stable,
      retained: false,
      reviewableForMastery: true
    };
  }
  persistChapter3Progress();
  return completion;
}

function finishLs04Session({ completed, reason }) {
  const attempt = ensureLs04Attempt();
  if (!attempt) return;
  clearLs04Timers();
  if (completed) attempt.phase = "complete";
  persistLs04Attempt();
  recordLs04Outcome({ completed, reason });
  if (completed) renderGardenScreen();
  finishActiveSessionAtRest({ reward: completed ? "握手音符叶" : "听到这里", reason });
  state.ls04FeedbackTimer = setTimeout(() => {
    state.ls04FeedbackTimer = null;
    showMapScreen();
  }, completed ? 1450 : 850);
}

function scheduleLs04AssistedTimeout() {
  if (state.ls04Timer) clearTimeout(state.ls04Timer);
  state.ls04Timer = setTimeout(() => {
    state.ls04Timer = null;
    completeLs04Modeled("assisted-timeout");
  }, LS04_ASSISTED_WAIT_MS);
}

function completeLs04Modeled(reason) {
  const attempt = ensureLs04Attempt();
  const targetMidi = ls04Target(attempt);
  if (!attempt || targetMidi === null) return;
  clearLs04Timers();
  attempt.modeled = true;
  attempt.strongCueUsed = true;
  attempt.phase = "modeled-success";
  attempt.modeledInputs.push({ source: "model", targetMidi, callIndex: attempt.callIndex, reason, completedAt: new Date().toISOString() });
  attempt.scoredCalls.push({ callIndex: attempt.callIndex, targetMidi, correct: false, modeled: true, wrongCount: attempt.callWrongCount });
  const played = playPianoNote(noteForMidi(targetMidi).frequency, { gain: 0.13, duration: 0.72 });
  if (!played) {
    attempt.modeled = false;
    attempt.modeledInputs.pop();
    attempt.scoredCalls.pop();
    attempt.phase = "sound-paused";
    traceLs04Audio(attempt, "audio-unavailable", null, { reason: "modeled" });
    persistLs04Attempt();
    renderGardenScreen();
    return;
  }
  traceLs04Audio(attempt, "modeled", targetMidi, { reason, callIndex: attempt.callIndex });
  persistLs04Attempt();
  renderGardenScreen();
  finishLs04Session({ completed: false, reason: "modeled-safe-rest" });
}

function handleLs04Input(midi, source) {
  const attempt = ensureLs04Attempt();
  if (!attempt || state.chapter3.equipmentState !== "safe-open") return;
  const now = new Date().toISOString();
  if (["reference", "target-playing", "reference-ready", "replay-ready", "sound-paused", "correct-feedback"].includes(attempt.phase)) {
    attempt.earlyInputs.push({ midi, source, phase: attempt.phase, occurredAt: now });
    persistLs04Attempt();
    return;
  }
  if (!["awaiting-response", "assisted"].includes(attempt.phase)) return;
  clearLs04Timers();
  const targetMidi = ls04Target(attempt);
  const correct = midi === targetMidi;
  attempt.inputRoutes[source] = (attempt.inputRoutes[source] || 0) + 1;
  if (source === "麦克风") attempt.hasExperimentalInput = true;
  attempt.childInputs.push({ midi, source, targetMidi, correct, callIndex: attempt.callIndex, occurredAt: now });
  state.lastInputMidi = midi;
  state.lastInputResult = correct ? "correct" : "wrong";
  els.inputStatus.textContent = `输入：${source}`;
  els.heardStatus.textContent = `听到：${noteForMidi(midi)?.name || midi}`;

  if (correct) {
    const firstAttemptCorrect = attempt.callWrongCount === 0;
    if (firstAttemptCorrect) attempt.correctCount += 1;
    attempt.scoredCalls.push({ callIndex: attempt.callIndex, targetMidi, inputMidi: midi, correct: firstAttemptCorrect, wrongCount: attempt.callWrongCount, source });
    attempt.callIndex += 1;
    attempt.callWrongCount = 0;
    attempt.supportStage = "none";
    attempt.phase = attempt.callIndex >= attempt.sequence.length ? "complete" : "correct-feedback";
    persistLs04Attempt();
    renderGardenScreen();
    if (attempt.callIndex >= attempt.sequence.length) {
      finishLs04Session({ completed: true, reason: "natural-rest" });
      return;
    }
    state.ls04FeedbackTimer = setTimeout(() => {
      state.ls04FeedbackTimer = null;
      playLs04Target("system-next");
    }, 620);
    return;
  }

  attempt.callWrongCount += 1;
  attempt.totalWrongCount += 1;
  if (attempt.callWrongCount >= 3) {
    attempt.strongCueUsed = true;
    attempt.supportStage = "assisted";
    attempt.targetRevealedBeforeResponse = true;
  }
  if (attempt.callWrongCount >= 4) {
    persistLs04Attempt();
    completeLs04Modeled("assisted-retry-wrong");
    return;
  }
  attempt.phase = "wrong-feedback";
  traceLs04Audio(attempt, "child-input", midi, { callIndex: attempt.callIndex });
  persistLs04Attempt();
  renderGardenScreen();
  if (source !== "屏幕") playPianoNote(noteForMidi(midi)?.frequency || 261.63, { gain: 0.10, duration: 0.42 });
  const replayed = playPianoNote(noteForMidi(targetMidi).frequency, { gain: 0.13, duration: 0.72, delay: 0.46 });
  if (!replayed) {
    attempt.phase = "sound-paused";
    traceLs04Audio(attempt, "audio-unavailable", null, { reason: "wrong-replay", callIndex: attempt.callIndex });
    persistLs04Attempt();
    renderGardenScreen();
    return;
  }
  traceLs04Audio(attempt, "target-replay", targetMidi, { callIndex: attempt.callIndex });
  persistLs04Attempt();
  state.ls04FeedbackTimer = setTimeout(() => {
    state.ls04FeedbackTimer = null;
    attempt.phase = attempt.supportStage === "assisted" ? "assisted" : "awaiting-response";
    persistLs04Attempt();
    renderGardenScreen();
    if (attempt.supportStage === "assisted") scheduleLs04AssistedTimeout();
  }, 1250);
}

function handleGardenInput(midi, source) {
  const lesson = currentGardenLesson();
  if (!lesson || state.chapter3.equipmentState !== "safe-open") return;
  const heard = noteForMidi(midi);
  state.lastInputMidi = midi;
  els.inputStatus.textContent = `输入：${source}`;
  els.heardStatus.textContent = `听到：${heard?.name || midi}`;
  if (midi !== lesson.midi) {
    state.gardenInputRoutes[source] = (state.gardenInputRoutes[source] || 0) + 1;
    state.gardenChildInputs.push({ midi, source, result: "wrong", occurredAt: new Date().toISOString() });
    state.lastInputResult = "wrong";
    state.gardenWrongCount += 1;
    persistGardenPendingAttempt();
    els.gardenScene.classList.remove("garden-correct-pulse", "garden-wrong-pulse");
    void els.gardenScene.offsetWidth;
    els.gardenScene.classList.add("garden-wrong-pulse");
    renderGardenScreen();
    showInputEffect(midi, "wrong", { showLabel: false });
    if (lesson.id === "LS01" && state.gardenRepairStage === "assisted") {
      completeGardenModeledSuccess("assisted-retry-wrong");
      return;
    }
    if (lesson.id === "LS01" && state.gardenWrongCount >= 2) beginGardenAssistedRepair();
    else scheduleGardenLongWait();
    return;
  }
  if (!state.gardenInputArmed) return;
  state.gardenInputRoutes[source] = (state.gardenInputRoutes[source] || 0) + 1;
  state.gardenChildCorrectCount += 1;
  state.gardenChildInputs.push({ midi, source, result: "correct", occurredAt: new Date().toISOString() });
  state.gardenInputArmed = false;
  els.gardenScene.dataset.inputArmed = "false";
  state.lastInputResult = "correct";
  persistGardenPendingAttempt();
  els.gardenScene.classList.remove("garden-correct-pulse", "garden-wrong-pulse");
  void els.gardenScene.offsetWidth;
  els.gardenScene.classList.add("garden-correct-pulse");
  showInputEffect(midi, "correct", { showLabel: false });
  const assisted = state.gardenRepairStage === "assisted";
  if (assisted) {
    clearGardenTimers();
  } else if (state.gardenLongWaitTimer) {
    clearTimeout(state.gardenLongWaitTimer);
    state.gardenLongWaitTimer = null;
  }
  if (lesson.id === "LS03") {
    state.chapter3.ls03QualifiedInputs = Math.min(2, state.chapter3.ls03QualifiedInputs + 1);
    persistChapter3Progress();
    if (state.chapter3.ls03QualifiedInputs < 2) {
      renderGardenScreen();
      return;
    }
  }
  completeGardenLesson(lesson, {
    childCorrectCount: state.gardenChildCorrectCount,
    assisted,
    needsPractice: assisted,
    completionSource: "child",
    earlyRest: lesson.id === "LS01" && assisted,
    earlyRestReason: assisted ? "assisted-repair" : ""
  });
}

function setRouteJustLocked(level, index) {
  if (state.routeLockTimer) {
    clearTimeout(state.routeLockTimer);
    state.routeLockTimer = null;
  }
  if (level?.id !== "M08" || index < 0) {
    state.routeJustLockedIndex = null;
    return;
  }
  state.routeJustLockedIndex = index;
  state.routeLockTimer = setTimeout(() => {
    state.routeJustLockedIndex = null;
    state.routeLockTimer = null;
    if (state.screen === "play" && activeLevel()?.id === "M08") {
      renderBuildBlueprint(activeLevel());
      renderRoofScaleRoute(activeLevel());
    }
  }, 920);
}

function handleStaffInput(midi, source) {
  if (state.staffComplete) return;

  const inputMarkerSerial = ++state.staffInputMarkerSerial;
  const targetStep = activeStaffStep();
  const targetMidi = targetStep?.midi;
  const heard = noteForMidi(midi);
  const target = noteForMidi(targetMidi) || notes[0];
  state.lastInputMidi = midi;
  els.heardStatus.textContent = `听到：${heard ? heard.name : midi}`;
  els.inputStatus.textContent = `输入：${source}`;

  if (midi === targetMidi) {
    recordPracticeInput({ correct: true, target, heard: heard || target, source });
    const assistedRepair = markAssistedRepairSuccess();
    state.lastInputResult = "correct";
    const fromPosition = staffDinoPosition();
    const toPosition = {
      x: targetStep.x,
      y: staffLaneY[targetStep.lane] || 60,
      place: "pad"
    };
    playCorrectSound();
    state.staffStepIndex += 1;
    state.stepHadWrong = false;
    render();
    if (state.staffStepIndex < activeStaffStepCount()) beginPracticeStepClock();
    els.inputStatus.textContent = `输入：${source}`;
    els.heardStatus.textContent = `听到：${target.name}`;
    els.staffFeedback.classList.remove("good", "bad");
    const nextStep = activeStaffStep();
    const successStory = staffSuccessStoryFor(target, targetStep, nextStep);
    els.staffFeedback.classList.add("good");
    els.staffFeedback.textContent = assistedRepair
      ? `${target.name} 跟着星芽落稳，走到安全点就休息。`
      : successStory.feedback;
    setStaffDinoTip(successStory.tip, target.color, nextStep ? "correct" : "done");
    showStaffStageToast("correct", {
      title: successStory.title,
      note: target,
      subtitle: successStory.subtitle
    });
    setStaffDinoMood("good");
    triggerStaffDinoMotion("jump", fromPosition, toPosition);
    showInputEffect(midi, "correct");
    showKeySpriteEffect(midi, "correct");
    showNoteBurst(midi, "correct", target);
    showStaffPadEffect(state.staffStepIndex - 1, "correct");
    showStaffLandingRipple(state.staffStepIndex - 1, target, "correct");
    showStaffDinoLeapTrail(fromPosition, toPosition, target);
    showMusicFlight(midi, target, getStaffFlightTarget(state.staffStepIndex - 1), "staff");

    if (state.staffStepIndex >= activeStaffStepCount()) {
      completeStaffCourse();
    }
  } else {
    recordPracticeInput({ correct: false, target, heard, source });
    state.lastInputResult = "wrong";
    playWrongSound();
    render();
    els.inputStatus.textContent = `输入：${source}`;
    els.heardStatus.textContent = `听到：${heard ? heard.name : midi}`;
    els.staffFeedback.classList.remove("good", "bad");
    els.staffFeedback.classList.add("bad");
    const wrongStory = staffWrongStoryFor(target, targetStep, heard);
    els.staffFeedback.textContent = wrongStory.feedback;
    setStaffDinoTip(`${target.solfege}/${target.name} \u00b7 \u770b\u843d\u70b9`, target.color, "wrong");
    setStaffDinoMood("bad");
    triggerStaffDinoMotion("stumble");
    showInputEffect(midi, "wrong");
    setTimeout(() => {
      if (state.staffInputMarkerSerial !== inputMarkerSerial || state.screen !== "staff") return;
      if (state.lastInputMidi === midi && state.lastInputResult === "wrong") state.lastInputMidi = null;
      const wrongKey = els.keyboard?.querySelector(`[data-midi="${midi}"]`);
      wrongKey?.classList.remove("hit", "hit-wrong", "wrong", "pressed");
    }, 940);
    beginAssistedRepair(targetMidi);
  }
}

function triggerStaffDinoMotion(type, fromPosition, toPosition) {
  if (!els.staffDinoWrap) return;
  const className = type === "stumble" ? "is-stumbling" : "is-jumping";
  els.staffDinoWrap.classList.remove("is-jumping", "is-stumbling");
  if (state.staffMotionTimer) clearTimeout(state.staffMotionTimer);
  clearStaffDinoMoodTimer();
  if (els.staffDino) {
    els.staffDino.src = type === "jump" ? dinoImages.jump : dinoImages.bad;
  }
  if (type === "jump" && fromPosition && toPosition && els.staffStage) {
    const stageRect = els.staffStage.getBoundingClientRect();
    els.staffDinoWrap.style.setProperty("--hop-from-x", `${((fromPosition.x - toPosition.x) / 100) * stageRect.width}px`);
    els.staffDinoWrap.style.setProperty("--hop-from-y", `${((fromPosition.y - toPosition.y) / 100) * stageRect.height}px`);
  } else {
    els.staffDinoWrap.style.setProperty("--hop-from-x", "0px");
    els.staffDinoWrap.style.setProperty("--hop-from-y", "0px");
  }
  void els.staffDinoWrap.offsetWidth;
  els.staffDinoWrap.classList.add(className);
  state.staffMotionTimer = setTimeout(() => {
    els.staffDinoWrap.classList.remove(className);
    state.staffMotionTimer = null;
    if (!els.staffDino || state.screen !== "staff") return;
    els.staffDino.src = state.staffComplete
      ? dinoImages.celebrate
      : type === "jump"
      ? dinoImages.good
      : dinoImages.point;
    if (type === "jump" && !state.staffComplete) {
      state.staffMoodTimer = setTimeout(() => {
        if (state.screen === "staff" && !state.staffComplete && els.staffDino) {
          els.staffDino.src = dinoImages.point;
        }
        state.staffMoodTimer = null;
      }, 460);
    }
  }, type === "stumble" ? 920 : 1080);
}

function setStaffDinoMood(mood, duration = 760) {
  if (!els.staffDino) return;
  clearStaffDinoMoodTimer();
  els.staffDino.src = dinoImages[mood] || dinoImages.point;
  els.staffDino.classList.remove("mood-good", "mood-bad", "mood-celebrate", "mood-point");
  void els.staffDino.getBoundingClientRect();
  els.staffDino.classList.add(`mood-${mood}`);
  state.staffMoodTimer = setTimeout(() => {
    state.staffMoodTimer = null;
    if (state.screen !== "staff") return;
    els.staffDino.classList.remove(`mood-${mood}`);
    els.staffDino.classList.add("mood-point");
    els.staffDino.src = state.staffComplete ? dinoImages.celebrate : dinoImages.point;
  }, duration);
}

function clearStaffDinoMoodTimer() {
  if (!state.staffMoodTimer) return;
  clearTimeout(state.staffMoodTimer);
  state.staffMoodTimer = null;
}

function showStaffPadEffect(index, effectName) {
  requestAnimationFrame(() => {
    const pad = els.staffSteps.querySelectorAll(".staff-step")[index];
    if (!pad) return;
    pad.classList.remove("correct", "wrong");
    void pad.offsetWidth;
    pad.classList.add(effectName);
    setTimeout(() => pad.classList.remove(effectName), effectName === "correct" ? 900 : 760);
  });
}

function showStaffLandingRipple(index, note, type = "correct") {
  if (!els.staffStage) return;
  const step = activeStaffSteps()[index];
  if (!step) return;
  const ripple = document.createElement("span");
  ripple.className = `staff-landing-ripple ripple-${type}`;
  ripple.setAttribute("aria-hidden", "true");
  ripple.style.left = `${step.x}%`;
  ripple.style.top = `${staffLaneY[step.lane] || 60}%`;
  ripple.style.setProperty("--ripple-color", note?.color || "#6F8FFE");
  ripple.style.setProperty("--ripple-soft", alpha(note?.color || "#6F8FFE", 0.24));
  els.staffStage.appendChild(ripple);
  setTimeout(() => ripple.remove(), type === "correct" ? 1080 : 760);
}

function showStaffDinoLeapTrail(fromPosition, toPosition, note) {
  if (!els.staffStage || !fromPosition || !toPosition) return;
  const stageRect = els.staffStage.getBoundingClientRect();
  if (!stageRect.width || !stageRect.height) return;

  const startX = (fromPosition.x / 100) * stageRect.width;
  const startY = (fromPosition.y / 100) * stageRect.height;
  const endX = (toPosition.x / 100) * stageRect.width;
  const endY = (toPosition.y / 100) * stageRect.height;
  const dx = endX - startX;
  const dy = endY - startY;
  const distance = Math.max(1, Math.hypot(dx, dy));
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  const lift = Math.min(112, Math.max(48, distance * 0.18));
  const color = note?.color || "#6F8FFE";
  const soft = alpha(color, 0.24);

  const arc = document.createElement("span");
  arc.className = "staff-hop-arc";
  arc.setAttribute("aria-hidden", "true");
  arc.style.left = `${startX}px`;
  arc.style.top = `${startY}px`;
  arc.style.width = `${distance}px`;
  arc.style.height = `${lift}px`;
  arc.style.setProperty("--hop-angle", `${angle}deg`);
  arc.style.setProperty("--hop-color", color);
  arc.style.setProperty("--hop-soft", soft);
  els.staffStage.appendChild(arc);

  [0.34, 0.62, 0.84].forEach((ratio, index) => {
    const spark = document.createElement("span");
    spark.className = "staff-hop-spark";
    spark.setAttribute("aria-hidden", "true");
    spark.style.left = `${startX + dx * ratio}px`;
    spark.style.top = `${startY + dy * ratio - Math.sin(Math.PI * ratio) * lift * 0.58}px`;
    spark.style.setProperty("--spark-color", color);
    spark.style.setProperty("--spark-soft", soft);
    spark.style.animationDelay = `${index * 70}ms`;
    els.staffStage.appendChild(spark);
    setTimeout(() => spark.remove(), 920);
  });

  setTimeout(() => arc.remove(), 1080);
}

function showStaffStageToast(type, { title, note, subtitle }) {
  if (!els.staffStage) return;
  els.staffStage.querySelectorAll(".staff-stage-toast").forEach((toast) => toast.remove());
  const toast = document.createElement("div");
  toast.className = `staff-stage-toast toast-${type}`;
  toast.setAttribute("aria-live", "polite");
  const color = note?.color || "#6F8FFE";
  toast.style.setProperty("--staff-toast-color", color);
  toast.style.setProperty("--staff-toast-soft", alpha(color, 0.18));
  const noReadingAudit = state.auditMode === "no-reading";
  if (!noReadingAudit) toast.dataset.toastStyle = "event";
  toast.innerHTML = noReadingAudit
    ? `
      <span class="staff-toast-note">${note?.name || "C"}</span>
      <span class="staff-toast-visual" aria-hidden="true">
        <i class="toast-gesture ${type === "wrong" ? "gesture-repair" : "gesture-jump"}"></i>
        ${note ? locatorVisualHtml(note, "", "toast-locator") : ""}
      </span>
    `
    : `
      <span class="staff-toast-note">${note?.name || "C"}</span>
      <span class="staff-toast-visual" aria-hidden="true">
        <i class="toast-gesture ${type === "wrong" ? "gesture-repair" : "gesture-jump"}"></i>
      </span>
      <span class="staff-toast-copy">
        <strong>${title}</strong>
        <small>${subtitle}</small>
      </span>
    `;
  els.staffStage.appendChild(toast);
  setTimeout(() => toast.classList.add("is-leaving"), 1120);
  setTimeout(() => toast.remove(), 1460);
}

function completeStaffCourse() {
  const isMini = isMiniStaffSession();
  if (!isMini) finalizeStaffStats();
  refreshParentPanelIfOpen();
  state.staffComplete = true;
  playVictorySound();
  render();
  els.staffFeedback.classList.remove("good", "bad");
  els.staffFeedback.textContent = "";
  setStaffDinoTip(isMini ? "休息星" : "到星门", "#24a865", "done");
  els.nextAction.innerHTML = isMini
    ? `<span class="cue-success">✓</span><span class="cue-text strong">前三跳到休息星</span>`
    : `<span class="cue-success">✓</span><span class="cue-text strong">谱线星桥读完啦</span>`;
  setStaffDinoMood("celebrate", 1400);
  showStaffCelebration();
  if (!showSessionCompletion({ kind: "staff", id: staffCourse.id, reward: isMini ? "小休息星" : staffCourse.reward })) {
    showStaffResultModal();
  }
}

function completeLevel(source) {
  const level = activeLevel();
  const wasListening = isListeningLevel(level);
  if (wasListening) clearTransientFeedback();
  clearWorkshopIdleHints();
  clearListeningPrompt();
  if (!state.earned.includes(level.reward)) state.earned.push(level.reward);
  state.completed.add(level.id);
  saveCompletedLevels();
  finalizeLevelStats(level);
  refreshParentPanelIfOpen();
  playVictorySound();
  els.feedback.classList.remove("bad");
  els.feedback.classList.add("good");
  els.feedback.textContent = wasListening ? "听出来了，小车轮醒啦。" : `${level.reward}完成，星芽的小家又亮了一点。`;
  els.nextAction.innerHTML = wasListening
    ? `<span class="cue-success">✓</span><span class="cue-text strong">听音找键成功</span>`
    : `<span class="cue-success">✓</span><span class="cue-text strong">${level.reward}亮起来</span>`;
  setDinoMood("celebrate", 1400);
  if (!wasListening) showStageCelebration();
  if (!showSessionCompletion({ kind: "level", id: level.id, reward: level.reward })) {
    if (wasListening) {
      hideResultModal();
      clearAutoAdvance();
      state.autoAdvanceTimer = setTimeout(() => goLevel(1), 1750);
    } else {
      showResultModal(level);
    }
  }
}

function setDinoMood(mood, duration = 760) {
  if (!els.dinoSvg) return;
  clearDinoMoodTimer();
  els.dinoSvg.src = dinoImages[mood] || dinoImages.point;
  if (els.coachDino) els.coachDino.src = dinoImages[mood] || dinoImages.point;
  els.dinoSvg.classList.remove("mood-good", "mood-bad", "mood-celebrate", "mood-point", "mood-listen");
  els.coachDino?.classList.remove("mood-good", "mood-bad", "mood-celebrate", "mood-point", "mood-listen");
  void els.dinoSvg.getBoundingClientRect();
  void els.coachDino?.getBoundingClientRect();
  els.dinoSvg.classList.add(`mood-${mood}`);
  els.coachDino?.classList.add(`mood-${mood}`);
  state.dinoMoodTimer = setTimeout(() => {
    els.dinoSvg.classList.remove(`mood-${mood}`);
    els.dinoSvg.classList.add("mood-point");
    els.dinoSvg.src = dinoImages.point;
    els.coachDino?.classList.remove(`mood-${mood}`);
    els.coachDino?.classList.add("mood-point");
    if (els.coachDino) els.coachDino.src = dinoImages.point;
    state.dinoMoodTimer = null;
  }, duration);
}

function clearDinoMoodTimer() {
  if (state.dinoMoodTimer) {
    clearTimeout(state.dinoMoodTimer);
    state.dinoMoodTimer = null;
  }
}

function showInputEffect(midi, className, options = {}) {
  requestAnimationFrame(() => {
    const key = els.keyboard.querySelector(`[data-midi="${midi}"]`);
    if (!key) return;
    const note = noteForMidi(midi);
    pulseKeyboardKey(key, note, className, options);
    key.classList.remove("correct", "wrong", "hint");
    void key.offsetWidth;
    key.classList.add(className);
    const duration = className === "hint" ? 1120 : 920;
    setTimeout(() => key.classList.remove(className), duration);
  });
}

function showKeySpriteEffect(midi, effectName) {
  requestAnimationFrame(() => {
    const key = els.keyboard.querySelector(`[data-midi="${midi}"]`);
    const image = effectImages[effectName];
    if (!key || !image) return;

    const rect = key.getBoundingClientRect();
    const effect = document.createElement("img");
    const staffClass = state.screen === "staff" ? " staff-sprite-effect" : "";
    effect.className = `sprite-effect effect-${effectName}${staffClass}`;
    effect.src = image;
    effect.alt = "";
    effect.setAttribute("aria-hidden", "true");
    effect.style.left = `${rect.left + rect.width / 2}px`;
    effect.style.top = `${rect.top + rect.height * 0.38}px`;
    document.body.appendChild(effect);
    setTimeout(() => effect.remove(), effectName === "correct" ? 980 : 820);
  });
}

function showNoteBurst(midi, result, note) {
  requestAnimationFrame(() => {
    const key = els.keyboard.querySelector(`[data-midi="${midi}"]`);
    if (!key) return;

    const rect = key.getBoundingClientRect();
    const burst = document.createElement("span");
    const isStaffBurst = state.screen === "staff";
    burst.className = `note-feedback-burst note-burst-${result}${isStaffBurst ? " staff-note-burst" : ""}`;
    burst.setAttribute("aria-hidden", "true");
    burst.style.left = `${rect.left + rect.width / 2}px`;
    burst.style.top = `${rect.top + rect.height * 0.26}px`;
    const color = note?.color || "#6F8FFE";
    burst.style.setProperty("--note-color", color);
    burst.style.setProperty("--note-soft", alpha(color, 0.20));

    const symbols = isStaffBurst
      ? result === "correct"
        ? [note?.name || "C", "✓"]
        : result === "hint"
          ? [note?.name || "C"]
          : ["?", note?.name || "C"]
      : result === "correct"
        ? [note?.name || "C", "♪", "★", "✓", note?.name || "C", "♪"]
        : result === "hint"
          ? [note?.name || "C", "•", "•"]
          : ["?", "•", note?.name || "C"];
    const paths = isStaffBurst
      ? result === "correct"
        ? [[-24, -44, -8], [24, -42, 8]]
        : result === "hint"
          ? [[0, -52, 0]]
          : [[-18, -36, -6], [18, -36, 7]]
      : result === "correct"
        ? [[-70, -82, -18], [-34, -114, 12], [8, -98, -8], [48, -84, 19], [78, -54, 10], [-86, -34, -14]]
        : result === "hint"
          ? [[-36, -68, -8], [28, -72, 10], [0, -104, 0]]
          : [[-28, -50, -8], [26, -46, 9], [0, -76, 0]];

    symbols.forEach((symbol, index) => {
      const particle = document.createElement("span");
      particle.className = "note-feedback-particle";
      particle.textContent = symbol;
      const [dx, dy, rot] = paths[index] || [0, -68, 0];
      particle.style.setProperty("--dx", `${dx}px`);
      particle.style.setProperty("--dy", `${dy}px`);
      particle.style.setProperty("--rot", `${rot}deg`);
      particle.style.setProperty("--delay", `${index * 34}ms`);
      burst.appendChild(particle);
    });

    document.body.appendChild(burst);
    setTimeout(() => burst.remove(), result === "correct" ? 1180 : 980);
  });
}

function getPlayFlightTarget(partIndex = state.stepIndex) {
  const blueprintParts = [...(els.buildBlueprint?.querySelectorAll(".blueprint-part") || [])];
  const blueprintTarget = blueprintParts[Math.max(0, Math.min(partIndex, blueprintParts.length - 1))];
  if (blueprintTarget) return blueprintTarget;
  if (activeLevel()?.id === "M08" && els.roofScaleRoute && !els.roofScaleRoute.hidden) {
    const routeNodes = [...els.roofScaleRoute.querySelectorAll(".roof-route-node")];
    const boundedRouteIndex = Math.max(0, Math.min(partIndex, routeNodes.length - 1));
    if (routeNodes[boundedRouteIndex]) return routeNodes[boundedRouteIndex];
  }
  const slots = [...(els.baseBuild?.querySelectorAll(".build-slot") || [])];
  const boundedIndex = Math.max(0, Math.min(partIndex, slots.length - 1));
  return slots[boundedIndex] || els.hangingPart || els.moonYard;
}

function getStaffFlightTarget(stepIndex = state.staffStepIndex) {
  const pads = [...(els.staffSteps?.querySelectorAll(".staff-step") || [])];
  const boundedIndex = Math.max(0, Math.min(stepIndex, pads.length - 1));
  return pads[boundedIndex] || els.staffStage;
}

function elementCenter(element, xRatio = 0.5, yRatio = 0.5) {
  if (!element) return null;
  const rect = element.getBoundingClientRect();
  if (!rect.width || !rect.height) return null;
  return {
    x: rect.left + rect.width * xRatio,
    y: rect.top + rect.height * yRatio
  };
}

function showMusicFlight(midi, note, targetElement, type = "correct") {
  requestAnimationFrame(() => {
    const key = els.keyboard?.querySelector(`[data-midi="${midi}"]`);
    const target = targetElement || (state.screen === "staff" ? els.staffStage : els.moonYard);
    const start = elementCenter(key, 0.5, type === "hint" ? 0.30 : 0.24);
    const end = elementCenter(target, 0.5, 0.50);
    if (!start || !end) return;

    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const arc = Math.min(-78, -Math.abs(dx) * 0.18 - 58);
    const color = note?.color || "#6F8FFE";
    const soft = alpha(color, type === "hint" ? 0.18 : 0.24);
    const flight = document.createElement("div");
    flight.className = `music-flight music-flight-${type}`;
    flight.setAttribute("aria-hidden", "true");
    flight.style.left = `${start.x}px`;
    flight.style.top = `${start.y}px`;
    flight.style.setProperty("--flight-color", color);
    flight.style.setProperty("--flight-soft", soft);
    flight.style.setProperty("--mid-x", `${dx * 0.52}px`);
    flight.style.setProperty("--mid-y", `${dy * 0.52 + arc}px`);
    flight.style.setProperty("--end-x", `${dx}px`);
    flight.style.setProperty("--end-y", `${dy}px`);

    const notePill = document.createElement("span");
    notePill.className = "music-flight-note";
    notePill.textContent = note?.name || "";
    flight.appendChild(notePill);

    const sparkPaths = [
      [-22, -12, 0],
      [18, -18, 60],
      [-14, 18, 120],
      [23, 12, 180],
      [0, -28, 240]
    ];
    sparkPaths.forEach(([sx, sy, angle], index) => {
      const spark = document.createElement("span");
      spark.className = "music-flight-spark";
      spark.style.setProperty("--spark-x", `${sx}px`);
      spark.style.setProperty("--spark-y", `${sy}px`);
      spark.style.setProperty("--spark-angle", `${angle}deg`);
      spark.style.setProperty("--spark-delay", `${index * 42}ms`);
      flight.appendChild(spark);
    });

    const landing = document.createElement("span");
    landing.className = `music-flight-landing landing-${type}`;
    landing.setAttribute("aria-hidden", "true");
    landing.style.left = `${end.x}px`;
    landing.style.top = `${end.y}px`;
    landing.style.setProperty("--flight-color", color);
    landing.style.setProperty("--flight-soft", soft);

    document.body.appendChild(flight);
    document.body.appendChild(landing);
    setTimeout(() => flight.remove(), type === "hint" ? 780 : 960);
    setTimeout(() => landing.remove(), type === "hint" ? 980 : 1120);
  });
}

function usesRouteRepairToast(level = activeLevel()) {
  return ["M07", "M08", "FG03"].includes(level?.id);
}

function routeRepairToastHtml(type, note) {
  if (type !== "wrong" || !note || !usesRouteRepairToast()) return "";
  return `
    <span class="route-toast-visual" aria-hidden="true">
      <span class="route-toast-gesture gesture-repair"></span>
      ${locatorVisualHtml(note, "", "toast-locator route-toast-locator")}
    </span>
  `;
}

function showStageInputToast(type, { title, note, subtitle }) {
  if (!els.moonYard) return;
  els.moonYard.querySelectorAll(".stage-input-toast").forEach((toast) => toast.remove());
  const toast = document.createElement("div");
  const routeVisual = routeRepairToastHtml(type, note);
  toast.className = `stage-input-toast toast-${type}${routeVisual ? " toast-route-repair" : ""}`;
  toast.setAttribute("aria-live", "polite");
  if (note?.color) {
    toast.style.setProperty("--toast-note-color", note.color);
    toast.style.setProperty("--toast-note-soft", alpha(note.color, 0.22));
  }
  const noteLabel = note?.name || "";
  toast.innerHTML = `
    <span class="toast-note">${noteLabel}</span>
    ${routeVisual}
    <span class="toast-copy">
      <strong>${title}</strong>
      <small>${subtitle}</small>
    </span>
  `;
  els.moonYard.appendChild(toast);
  setTimeout(() => toast.classList.add("is-leaving"), 1550);
  setTimeout(() => toast.remove(), 1900);
}

function pulseBuildStage(type) {
  if (!els.moonYard) return;
  els.moonYard.classList.remove("stage-result-correct", "stage-result-wrong");
  void els.moonYard.offsetWidth;
  els.moonYard.classList.add(`stage-result-${type}`);
  setTimeout(() => {
    els.moonYard?.classList.remove(`stage-result-${type}`);
  }, type === "correct" ? 900 : 720);
}

function clearLevelIntro() {
  if (state.levelIntroTimer) {
    clearTimeout(state.levelIntroTimer);
    state.levelIntroTimer = null;
  }
  els.moonYard?.querySelectorAll(".level-intro-card").forEach((card) => card.remove());
}

function showLevelIntro() {
  if (state.screen !== "play" || !els.moonYard) return;
  const level = activeLevel();
  const part = activePart(level) || level.parts[0];
  const note = noteForMidi(part?.midi) || notes[0];
  const id = noteIdentity(note);
  const phase = phaseForLevel(level);
  const isListening = isListeningLevel(level);
  const hideListeningIdentity = shouldHideListeningIdentity(level);
  const introColor = hideListeningIdentity ? LISTENING_IDENTITY_NEUTRAL : (part?.color || note.color);
  clearLevelIntro();

  const card = document.createElement("div");
  card.className = "level-intro-card";
  card.dataset.identityHidden = hideListeningIdentity ? "true" : "false";
  card.setAttribute("aria-live", "polite");
  card.style.setProperty("--intro-color", introColor);
  card.style.setProperty("--intro-soft", alpha(introColor, 0.18));
  card.style.setProperty("--intro-image", imageCssUrl(imageForPart(part)));
  card.innerHTML = `
    <span class="intro-part"></span>
    <span class="intro-copy">
      <small>${level.id} · ${level.title}</small>
      <strong>${level.title}</strong>
      <em>${isListening ? "听一声，找同样的键" : `${level.storyNeed || `${phase.short} ${id.letter} · ${id.keyShort}`}`}</em>
    </span>
  `;
  els.moonYard.appendChild(card);
  state.levelIntroTimer = setTimeout(() => {
    card.classList.add("is-leaving");
    state.levelIntroTimer = setTimeout(() => {
      card.remove();
      state.levelIntroTimer = null;
    }, 320);
  }, 1450);
}

function showStageCelebration() {
  if (activeLevel()?.id === "M08" && els.buildBlueprint) {
    els.buildBlueprint.classList.remove("blueprint-payoff");
    els.roofWorldBuild?.classList.remove("roof-world-payoff");
    void els.buildBlueprint.offsetWidth;
    void els.roofWorldBuild?.offsetWidth;
    els.buildBlueprint.classList.add("blueprint-payoff");
    els.roofWorldBuild?.classList.add("roof-world-payoff");
    setTimeout(() => els.buildBlueprint?.classList.remove("blueprint-payoff"), 1400);
    setTimeout(() => els.roofWorldBuild?.classList.remove("roof-world-payoff"), 1400);
    return;
  }
  const confetti = document.createElement("img");
  confetti.className = "stage-confetti-effect";
  confetti.src = effectImages.complete;
  confetti.alt = "";
  confetti.setAttribute("aria-hidden", "true");
  els.moonYard.appendChild(confetti);
  setTimeout(() => confetti.remove(), 1500);
}

function showStaffCelebration() {
  const confetti = document.createElement("img");
  confetti.className = "staff-confetti-effect";
  confetti.src = effectImages.complete;
  confetti.alt = "";
  confetti.setAttribute("aria-hidden", "true");
  els.staffStage.appendChild(confetti);
  setTimeout(() => confetti.remove(), 1500);
}

function showFlyingPart(part) {
  if (!part) return;
  const note = noteForMidi(part.midi);
  const flying = document.createElement("div");
  flying.className = `flying-part shape-${part.shape || "brick"}`;
  flying.style.setProperty("--part-color", part.color);
  flying.style.setProperty("--part-color-soft", alpha(part.color, 0.20));
  flying.style.setProperty("--part-image", imageCssUrl(imageForPart(part)));

  const art = document.createElement("span");
  art.className = "flying-part-art";
  art.style.setProperty("--part-image", imageCssUrl(imageForPart(part)));
  art.setAttribute("aria-hidden", "true");

  const badge = document.createElement("span");
  badge.className = "part-note-badge flying-part-badge";
  badge.innerHTML = note ? `<b>${note.name}</b>` : "";
  badge.style.setProperty("--note-color", note?.color || part.color);
  badge.setAttribute("aria-hidden", "true");

  const label = document.createElement("span");
  label.className = "flying-part-label";
  label.textContent = partObjectLabel(part, note);

  flying.appendChild(art);
  flying.appendChild(badge);
  flying.appendChild(label);
  els.moonYard.appendChild(flying);
  setTimeout(() => flying.remove(), 720);
}

function flashBuildArea(partIndex, isLevelComplete = false) {
  requestAnimationFrame(() => {
    els.moonYard.classList.remove("success-flash");
    void els.moonYard.offsetWidth;
    if (isLevelComplete) els.moonYard.classList.add("success-flash");

    const slots = [...els.baseBuild.querySelectorAll(".build-slot")];
    const added = slots[Math.max(0, partIndex)];
    if (added) {
      added.classList.remove("just-added");
      void added.offsetWidth;
      added.classList.add("just-added");
    }
  });
}

function showResultModal(level) {
  const isFinalLevel = state.levelIndex >= levels.length - 1;
  const needsLevelCheckReplay = levelNeedsReducedCueReplay(level) && !isStableLevelAttempt(level);
  const isListening = isListeningLevel(level);
  const staffReadiness = fgBridgeReadiness();
  const shouldPracticeFgBeforeStaff = !needsLevelCheckReplay && isFinalLevel && !state.staffComplete && !staffReadiness.ready;
  const shouldGoStaffAfterBase = !needsLevelCheckReplay && isFinalLevel && !state.staffComplete && staffReadiness.ready;
  const rewardPart = level.parts[level.parts.length - 1] || level.parts[0];
  const nextLevel = levels[state.levelIndex + 1];
  els.resultModal.dataset.result = needsLevelCheckReplay
    ? "level-check"
    : shouldPracticeFgBeforeStaff
    ? "final-practice"
    : (shouldGoStaffAfterBase ? "final-staff" : (isFinalLevel ? "final" : "level"));
  els.resultModal.querySelector("h2").textContent = needsLevelCheckReplay
    ? "亮起来了，再自己找一次！"
    : isListening
    ? "听出来了！"
    : isFinalLevel
    ? (shouldPracticeFgBeforeStaff ? "再稳一点！" : "基地完成！")
    : "星芽修好一块！";
  els.resultModal.querySelector(".auto-next span").textContent = needsLevelCheckReplay
    ? "自动开始少提示复练"
    : isListening
    ? "自动去下一关"
    : shouldPracticeFgBeforeStaff
    ? "自动回到预备练习"
    : shouldGoStaffAfterBase
    ? "小恐龙自动出发"
    : (isFinalLevel ? "基地亮起来" : "自动出发");
  els.modalNext.textContent = needsLevelCheckReplay ? "少提示复练" : (shouldPracticeFgBeforeStaff ? "继续练" : (shouldGoStaffAfterBase ? "小恐龙跳" : (isFinalLevel ? "继续看基地" : "继续")));
  els.resultText.textContent = needsLevelCheckReplay
    ? `${level.reward}已经亮起来。下一遍不亮目标键，自己读音名找琴键。`
    : isListening
    ? "你先听声音，再找到同一个琴键，小车轮醒啦。"
    : isFinalLevel
    ? (shouldPracticeFgBeforeStaff ? staffReadiness.message : (shouldGoStaffAfterBase ? `${level.reward}完成，星芽要去跳星星桥。` : `${level.reward}完成，月亮小家亮起来。`))
    : `${level.reward}完成，下一站亮起。`;
  updateResultSummary({
    prizeName: level.reward,
    prizeImage: imageForPart(rewardPart),
    prizeColor: rewardPart.color,
    nextName: needsLevelCheckReplay
      ? `${level.id} · 少提示复练`
      : isListening
      ? `${nextLevel?.id || "下一关"} · ${nextLevel?.title || "继续"}`
      : shouldPracticeFgBeforeStaff
      ? `${staffReadiness.nextLevel?.id || "FG"} · ${staffReadiness.nextLevel?.title || "F/G 预备"}`
      : shouldGoStaffAfterBase
      ? "小恐龙跳"
      : (isFinalLevel ? "月球基地" : `${nextLevel.id} · ${nextLevel.title}`),
    nextHint: needsLevelCheckReplay ? "不亮目标键" : (isListening ? "继续修月亮小家" : (shouldPracticeFgBeforeStaff ? "先稳住 F/G" : (shouldGoStaffAfterBase ? "马上开始" : (isFinalLevel ? "全部关卡完成" : "已亮起"))))
  });
  openResultModal();
  restartResultMeter();
  showResultConfetti();
  clearAutoAdvance();
  state.autoAdvanceTimer = setTimeout(() => {
    hideResultModal();
    if (needsLevelCheckReplay) {
      startLevelCheckReplay();
    } else if (!isFinalLevel) {
      goLevel(1);
    } else if (shouldPracticeFgBeforeStaff) {
      routeToFgPrep(staffReadiness);
    } else if (shouldGoStaffAfterBase) {
      showStaffScreen();
    } else {
      els.feedback.textContent = "月球基地完成了！";
      els.nextAction.textContent = "全部完成，可以重来";
    }
  }, (isFinalLevel || needsLevelCheckReplay) ? 3200 : 2700);
}

function showStaffResultModal() {
  if (isMiniStaffSession()) {
    els.resultModal.dataset.result = "staff-mini";
    els.resultModal.querySelector("h2").textContent = "跳到小休息星！";
    els.resultModal.querySelector(".auto-next span").textContent = "观察到这里就够了";
    els.modalNext.textContent = "再跳一次";
    els.resultText.textContent = "星芽跳过前三个谱垫，可以停一下。这个小段只看孩子懂不懂谱桥，不算完整星桥掌握。";
    updateResultSummary({
      prizeName: "小休息星",
      prizeImage: partImages.star,
      prizeColor: "#FFD166",
      nextName: "再跳",
      nextHint: "不进入复读"
    });
    openResultModal();
    restartResultMeter();
    showResultConfetti();
    clearAutoAdvance();
    return;
  }

  const remediation = staffRemediationPlan();
  const stable = isStableStaffAttempt();
  const needsCheckReplay = !remediation && !stable;
  els.resultModal.dataset.result = remediation ? "staff-practice" : (needsCheckReplay ? "staff-check" : "staff");
  els.resultModal.querySelector("h2").textContent = remediation
    ? "到达了，再加固一下！"
    : needsCheckReplay
    ? "到达了，再自己跳一次！"
    : "星桥读稳了！";
  els.resultModal.querySelector(".auto-next span").textContent = remediation
    ? "自动回预备练习"
    : needsCheckReplay
    ? "自动开始少提示复读"
    : "谱线星桥稳定";
  els.modalNext.textContent = remediation ? "去加固" : (needsCheckReplay ? "少提示复读" : "再读一次");
  els.resultText.textContent = remediation
    ? `${remediation.message} 小恐龙会带你回去练一小段。`
    : needsCheckReplay
    ? "第一遍小恐龙已经带路。下一遍不亮目标键，自己看谱位找琴键。"
    : "看谱位、读音名、自己找到琴键，这次真的稳了。";
  updateResultSummary({
    prizeName: remediation ? "星桥加固任务" : (needsCheckReplay ? "少提示复读" : staffCourse.reward),
    prizeImage: partImages.star,
    prizeColor: remediation?.level?.parts?.[0]?.color || "#FFD166",
    nextName: remediation
      ? `${remediation.level?.id || "FG"} · ${remediation.level?.title || "F/G 预备"}`
      : needsCheckReplay
      ? "S01 · 少提示复读"
      : "再练一次",
    nextHint: remediation ? "不是惩罚，是修桥" : (needsCheckReplay ? "不亮目标键" : "已稳定")
  });
  openResultModal();
  restartResultMeter();
  showResultConfetti();
  clearAutoAdvance();
  state.autoAdvanceTimer = setTimeout(() => {
    hideResultModal();
    if (remediation) {
      routeToStaffRemediation(remediation);
    } else if (needsCheckReplay) {
      startStaffCheckReplay();
    }
  }, remediation || needsCheckReplay ? 3400 : 2700);
}

function updateResultSummary({ prizeName, prizeImage, prizeColor, nextName, nextHint }) {
  const prizeArt = els.resultModal.querySelector(".result-prize-art");
  const prizeLabel = els.resultModal.querySelector("#resultPrizeName");
  const nextLabel = els.resultModal.querySelector("#resultNextName");
  const nextHintLabel = els.resultModal.querySelector("#resultNextHint");
  if (prizeArt) {
    const color = prizeColor || "#FFD166";
    prizeArt.style.setProperty("--result-prize-image", imageCssUrl(prizeImage || partImages.brick));
    prizeArt.style.setProperty("--result-prize-color", color);
    prizeArt.style.setProperty("--result-prize-soft", alpha(color, 0.22));
    prizeArt.style.setProperty("--result-prize-glow", alpha(color, 0.34));
  }
  if (prizeLabel) prizeLabel.textContent = prizeName || "基地零件";
  if (nextLabel) nextLabel.textContent = nextName || "下一关";
  if (nextHintLabel) nextHintLabel.textContent = nextHint || "自动出发";
}

function openResultModal() {
  els.resultModal.hidden = false;
  syncModalBackgroundInert();
}

function hideResultModal() {
  els.resultModal.hidden = true;
  syncModalBackgroundInert();
  delete els.resultModal.dataset.result;
  els.modalNext.hidden = false;
  els.resultModal.querySelector(".auto-next")?.removeAttribute("hidden");
  els.resultModal.querySelectorAll(".result-confetti-effect").forEach((effect) => effect.remove());
}

function restartResultMeter() {
  const meter = els.resultModal.querySelector(".auto-next i");
  if (!meter) return;
  meter.style.animation = "none";
  void meter.offsetWidth;
  meter.style.animation = "";
}

function showResultConfetti() {
  const card = els.resultModal.querySelector(".result-card");
  if (!card) return;
  card.querySelectorAll(".result-confetti-effect").forEach((effect) => effect.remove());
  const confetti = document.createElement("img");
  confetti.className = "result-confetti-effect";
  confetti.src = effectImages.complete;
  confetti.alt = "";
  confetti.setAttribute("aria-hidden", "true");
  card.prepend(confetti);
}

function clearAutoAdvance() {
  if (state.autoAdvanceTimer) {
    clearTimeout(state.autoAdvanceTimer);
    state.autoAdvanceTimer = null;
  }
}

function preloadImage(src, timeoutMs = 4800) {
  return new Promise((resolve) => {
    const image = new Image();
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      resolve(src);
    };
    image.onload = finish;
    image.onerror = finish;
    image.src = src;
    if (image.complete) finish();
    setTimeout(finish, timeoutMs);
  });
}

function startBootSequence() {
  const loader = els.bootLoader;
  if (!loader) return;

  const uniqueAssets = [...new Set(startupAssets)];
  const total = Math.max(1, uniqueAssets.length);
  let loaded = 0;
  let released = false;
  const release = () => {
    if (released) return;
    released = true;
    if (els.bootProgress) els.bootProgress.style.transform = "scaleX(1)";
    setTimeout(() => {
      loader.classList.add("is-done");
      document.body.classList.remove("booting");
    }, 80);
    setTimeout(() => {
      loader.hidden = true;
      if (state.screen === "play") {
        showLevelIntro();
        beginPracticeStepClock();
        scheduleWorkshopIdleHints(LEVEL_INTRO_RESPONSE_DELAY_MS);
        if (isListeningLevel()) playListeningPrompt();
      } else if (state.screen === "staff") {
        beginPracticeStepClock();
      } else if (state.screen === "garden") {
        recoverGardenEquipmentState();
      }
    }, 300);
  };
  const update = () => {
    loaded += 1;
    const ratio = Math.max(0.08, Math.min(1, loaded / total));
    if (els.bootProgress) els.bootProgress.style.transform = `scaleX(${ratio.toFixed(3)})`;
    if (loaded >= total) release();
  };

  uniqueAssets.forEach((src) => preloadImage(src).then(update));
  setTimeout(release, 2200);
}

function currentGardenLesson() {
  const action = currentSessionAction();
  return action?.kind === "garden" ? chapter3Lessons[action.targetId] || null : null;
}

function currentListeningAction() {
  const action = currentSessionAction();
  return action?.kind === "garden-listening" && action.targetId === "LS04" ? action : null;
}

function ls04SequenceForSession(sessionId) {
  const sequences = [
    [60, 62, 60, 62],
    [62, 60, 62, 60],
    [60, 62, 62, 60],
    [62, 60, 60, 62],
    [60, 60, 62, 62],
    [62, 62, 60, 60]
  ];
  let hash = 2166136261;
  for (const character of String(sessionId || "C3-03")) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return sequences[Math.abs(hash >>> 0) % sequences.length].slice();
}

function createLs04Attempt(session = state.activeSession) {
  const sequence = ls04SequenceForSession(session?.sessionId);
  return {
    version: 1,
    seed: session?.sessionId || "",
    sequence,
    phase: "reference-ready",
    referencePlayed: false,
    callIndex: 0,
    callWrongCount: 0,
    totalWrongCount: 0,
    correctCount: 0,
    scoredCalls: [],
    earlyInputs: [],
    childInputs: [],
    inputRoutes: {},
    replayCountChild: 0,
    replayCountSystem: 0,
    strongCueUsed: false,
    supportStage: "none",
    modeled: false,
    modeledInputs: [],
    hasExperimentalInput: false,
    targetRevealedBeforeResponse: false,
    audioTrace: []
  };
}

function ensureLs04Attempt() {
  const action = currentListeningAction();
  if (!action) return null;
  if (!action.listeningAttempt || action.listeningAttempt.version !== 1) {
    action.listeningAttempt = createLs04Attempt(state.activeSession);
    persistActiveSession();
  }
  return action.listeningAttempt;
}

function clearLs04Timers() {
  if (state.ls04Timer) clearTimeout(state.ls04Timer);
  if (state.ls04FeedbackTimer) clearTimeout(state.ls04FeedbackTimer);
  state.ls04Timer = null;
  state.ls04FeedbackTimer = null;
}

function persistLs04Attempt() {
  if (!currentListeningAction()) return;
  persistActiveSession();
}

function ls04Target(attempt = ensureLs04Attempt()) {
  return attempt ? attempt.sequence[attempt.callIndex] ?? null : null;
}

function traceLs04Audio(attempt, kind, midi, extra = {}) {
  attempt.audioTrace.push({ kind, midi, at: new Date().toISOString(), ...extra });
  attempt.audioTrace = attempt.audioTrace.slice(-40);
}

function playLs04Reference() {
  const attempt = ensureLs04Attempt();
  if (!attempt || state.screen !== "garden") return;
  clearLs04Timers();
  attempt.phase = "reference";
  persistLs04Attempt();
  renderGardenScreen();
  const played = playPianoNote(noteForMidi(60).frequency, { gain: 0.13, duration: 0.72 });
  if (!played) {
    attempt.referencePlayed = false;
    attempt.phase = "sound-paused";
    traceLs04Audio(attempt, "audio-unavailable", null, { reason: "reference" });
    persistLs04Attempt();
    renderGardenScreen();
    return;
  }
  attempt.referencePlayed = true;
  traceLs04Audio(attempt, "reference", 60);
  persistLs04Attempt();
  state.ls04Timer = setTimeout(() => {
    state.ls04Timer = null;
    playLs04Target("system-first");
  }, 900);
}

function playLs04Target(reason = "system") {
  const attempt = ensureLs04Attempt();
  const targetMidi = ls04Target(attempt);
  if (!attempt || targetMidi === null || state.screen !== "garden") return;
  clearLs04Timers();
  attempt.phase = "target-playing";
  if (reason === "child-replay") attempt.replayCountChild += 1;
  else if (reason !== "system-first") attempt.replayCountSystem += 1;
  persistLs04Attempt();
  renderGardenScreen();
  const played = playPianoNote(noteForMidi(targetMidi).frequency, { gain: 0.13, duration: 0.72 });
  if (!played) {
    attempt.phase = "sound-paused";
    traceLs04Audio(attempt, "audio-unavailable", null, { reason, callIndex: attempt.callIndex });
    persistLs04Attempt();
    renderGardenScreen();
    return;
  }
  traceLs04Audio(attempt, "target", targetMidi, { reason, callIndex: attempt.callIndex });
  persistLs04Attempt();
  state.ls04Timer = setTimeout(() => {
    state.ls04Timer = null;
    attempt.phase = attempt.supportStage === "assisted" ? "assisted" : "awaiting-response";
    persistLs04Attempt();
    renderGardenScreen();
    if (attempt.supportStage === "assisted") scheduleLs04AssistedTimeout();
  }, LS04_TARGET_PLAY_MS);
}

function resumeLs04Flow() {
  const attempt = ensureLs04Attempt();
  if (!attempt || state.screen !== "garden") return;
  clearLs04Timers();
  if (!state.audioUnlocked) {
    attempt.phase = attempt.referencePlayed ? "replay-ready" : "reference-ready";
    persistLs04Attempt();
    renderGardenScreen();
    return;
  }
  if (!attempt.referencePlayed) {
    playLs04Reference();
    return;
  }
  playLs04Target("resume");
}

function persistChapter3Progress() {
  state.sessionRuntime.chapter3 = state.chapter3;
  saveSessionRuntime(state.sessionRuntime);
}

function clearGardenTimers() {
  if (state.gardenAirTimer) clearTimeout(state.gardenAirTimer);
  if (state.gardenCompletionTimer) clearTimeout(state.gardenCompletionTimer);
  if (state.gardenAssistedTimer) clearTimeout(state.gardenAssistedTimer);
  if (state.gardenLongWaitTimer) clearTimeout(state.gardenLongWaitTimer);
  state.gardenAirTimer = null;
  state.gardenCompletionTimer = null;
  state.gardenAssistedTimer = null;
  state.gardenLongWaitTimer = null;
  clearLs04Timers();
}

function persistGardenPendingAttempt() {
  const action = currentSessionAction();
  if (!action || action.kind !== "garden") return;
  action.gardenAttempt = {
    version: 1,
    targetId: action.targetId,
    wrongCount: state.gardenWrongCount,
    childCorrectCount: state.gardenChildCorrectCount,
    childInputs: state.gardenChildInputs.map((input) => ({ ...input })),
    inputRoutes: { ...state.gardenInputRoutes },
    repairStage: state.gardenRepairStage,
    modeledInputs: state.gardenModeledInputs.map((input) => ({ ...input }))
  };
  persistActiveSession();
}

function restoreGardenPendingAttempt() {
  const action = currentSessionAction();
  const pending = action?.kind === "garden" && action.gardenAttempt?.targetId === action.targetId
    ? action.gardenAttempt
    : null;
  state.gardenWrongCount = Math.max(0, Number(pending?.wrongCount) || 0);
  state.gardenChildCorrectCount = Math.max(0, Number(pending?.childCorrectCount) || 0);
  state.gardenChildInputs = Array.isArray(pending?.childInputs) ? pending.childInputs.map((input) => ({ ...input })) : [];
  state.gardenInputRoutes = pending?.inputRoutes && typeof pending.inputRoutes === "object" ? { ...pending.inputRoutes } : {};
  state.gardenRepairStage = pending?.repairStage === "assisted" ? "assisted" : "none";
  state.gardenModeledInputs = Array.isArray(pending?.modeledInputs) ? pending.modeledInputs.map((input) => ({ ...input })) : [];
}

function clearGardenPendingAttempt(action = currentSessionAction()) {
  if (!action?.gardenAttempt) return;
  delete action.gardenAttempt;
}

function setGardenEquipmentState(equipmentState, { persist = true } = {}) {
  state.chapter3.equipmentState = equipmentState;
  if (equipmentState === "safe-open") state.chapter3.airCheckComplete = true;
  if (persist) persistChapter3Progress();
  renderGardenScreen();
  if (equipmentState === "safe-open") {
    if (state.gardenRepairStage === "assisted") scheduleGardenAssistedTimer();
    else scheduleGardenLongWait();
  }
}

function beginGardenAirCheck({ recovery = false } = {}) {
  clearGardenTimers();
  if (state.chapter3.airCheckComplete || recovery || state.motionSettings.reduced) {
    setGardenEquipmentState("safe-open");
    return;
  }
  setGardenEquipmentState("sealed");
  state.gardenAirTimer = setTimeout(() => {
    setGardenEquipmentState("scanning");
    state.gardenAirTimer = setTimeout(() => {
      setGardenEquipmentState("safe-open");
      state.gardenAirTimer = null;
    }, 760);
  }, 420);
}

function recoverGardenEquipmentState() {
  if (state.screen !== "garden") return;
  const recovery = state.chapter3.equipmentState === "scanning" || state.chapter3.airCheckComplete;
  beginGardenAirCheck({ recovery });
}

function scheduleGardenLongWait() {
  if (state.gardenLongWaitTimer) clearTimeout(state.gardenLongWaitTimer);
  state.gardenLongWaitTimer = null;
  const lesson = currentGardenLesson();
  if (state.screen !== "garden" || lesson?.id !== "LS01" || state.chapter3.leaves[0]) return;
  state.gardenLongWaitTimer = setTimeout(() => {
    state.gardenLongWaitTimer = null;
    completeGardenModeledSuccess("long-wait");
  }, CH3_LONG_WAIT_MS);
}

function gardenLessonCopy(lesson) {
  const count = lesson?.id === "LS03" ? state.chapter3.ls03QualifiedInputs : 0;
  if (!lesson) return { kicker: "花园休息", main: "三片叶长好啦", support: "星芽在新家园里休息。" };
  if (state.gardenRepairStage === "assisted") {
    return {
      kicker: "星芽陪你再试一次",
      main: `一起找琴键 ${lesson.letter}`,
      support: `我唱 ${lesson.solfege}，看${lesson.locator}。`
    };
  }
  if (state.lastInputResult === "wrong") {
    const heard = noteForMidi(state.lastInputMidi);
    return {
      kicker: "再找一次",
      main: `刚按 ${heard?.name || "别的键"}，目标是 ${lesson.letter}`,
      support: `我唱 ${lesson.solfege}，它在${lesson.locator}。`
    };
  }
  if (lesson.id === "LS03" && count === 1) {
    return { kicker: "第三片叶醒了一半", main: "再弹一次 E", support: "我唱 Mi，这次自己看两黑键右侧。" };
  }
  return {
    kicker: lesson.leaf === 1 ? "第一片叶" : (lesson.leaf === 2 ? "第二片叶" : "第三片叶"),
    main: `找琴键 ${lesson.letter}`,
    support: `我唱 ${lesson.solfege}，它在${lesson.locator}。`
  };
}

function ls04Copy(attempt) {
  if (!attempt) return { kicker: "听声音", main: "准备好耳朵", support: "按扬声器开始。" };
  if (attempt.phase === "reference-ready") return { kicker: "先认识一个声音", main: "按一下，听 C", support: "星芽把它唱作 Do。" };
  if (attempt.phase === "reference") return { kicker: "声音参照", main: "这是 C", support: "星芽唱 Do；这一声不计题。" };
  if (attempt.phase === "replay-ready") return { kicker: "回到这一声", main: "按一下继续听", support: "题目和刚才一样。" };
  if (attempt.phase === "sound-paused") return { kicker: "声音先休息", main: "请先把声音打开", support: "打开后，按扬声器重听同一声。" };
  if (attempt.phase === "target-playing") return { kicker: `第 ${attempt.callIndex + 1} 声`, main: "先听", support: "声音停下后，再弹同样的键。" };
  if (attempt.phase === "assisted") return { kicker: "星芽陪你找", main: "看一下琴键提示", support: "听完，再弹同样的键。" };
  if (attempt.phase === "wrong-feedback") {
    const last = attempt.childInputs[attempt.childInputs.length - 1];
    const heard = noteForMidi(last?.midi);
    return { kicker: "再听一次", main: `刚按了 ${heard?.name || "别的键"}`, support: "先听刚才的键，再听种核的声音。" };
  }
  if (attempt.phase === "correct-feedback") return { kicker: "找到了", main: "两边叶子靠近一点", support: "下一声会自己响起。" };
  if (attempt.phase === "complete") return { kicker: "声音朋友找到啦", main: "两边叶子握住了", support: "今天先在花园歇一歇。" };
  return { kicker: `第 ${attempt.callIndex + 1} 声`, main: "弹同样的声音", support: "可以按扬声器重听。" };
}

function renderLs04Screen() {
  const attempt = ensureLs04Attempt();
  const equipmentState = "safe-open";
  const copy = ls04Copy(attempt);
  els.mainTitle.textContent = "呼吸花园";
  els.levelBadge.textContent = "LS04";
  els.appShell.dataset.levelId = "LS04";
  els.appShell.dataset.phase = "garden-listening";
  els.appShell.dataset.chapter3 = "listening-slice";
  els.gardenScene.dataset.airState = equipmentState;
  els.gardenScene.dataset.lesson = "LS04";
  els.gardenScene.dataset.listeningPhase = attempt?.phase || "reference-ready";
  els.gardenScene.dataset.reviewableForMastery = "true";
  els.gardenScene.dataset.repairStage = attempt?.supportStage || "none";
  els.gardenXingya.dataset.equipment = equipmentState;
  renderGardenCharacterAsset(equipmentState);
  els.gardenAirCheck.hidden = true;
  els.gardenPlant.hidden = true;
  els.gardenListening.hidden = false;
  els.gardenSpeech.hidden = false;
  els.gardenSpeechKicker.textContent = copy.kicker;
  els.gardenSpeechMain.textContent = copy.main;
  els.gardenSpeechSupport.textContent = copy.support;
  const playing = ["reference", "target-playing", "wrong-feedback"].includes(attempt?.phase);
  els.listeningSource.classList.toggle("is-playing", playing);
  els.listeningSource.classList.toggle("is-sound-paused", attempt?.phase === "sound-paused");
  els.listeningCandidates.classList.toggle("is-scored", ["correct-feedback", "complete"].includes(attempt?.phase));
  els.listeningCandidates.classList.toggle("is-complete", attempt?.phase === "complete" || state.chapter3.ls04Completed || Boolean(state.chapter3.lessonEvidence.LS04?.completedAt));
  els.listeningResult.classList.remove("is-complete");
  els.listeningReplay.disabled = playing || attempt?.phase === "correct-feedback" || attempt?.phase === "complete";
  els.listeningReplay.hidden = attempt?.phase === "complete";
  els.listeningCallProgress.innerHTML = [0, 1, 2, 3].map((index) => {
    const done = index < (attempt?.scoredCalls?.length || 0);
    const active = index === (attempt?.callIndex || 0) && attempt?.phase !== "complete";
    return `<span class="${done ? "done" : ""}${active ? " active" : ""}" aria-hidden="true"></span>`;
  }).join("");
  els.listeningCallProgress.setAttribute("aria-label", `四个声音已完成 ${attempt?.scoredCalls?.length || 0} 个`);
  els.gardenProgress.innerHTML = "";
  els.gardenProgress.hidden = true;
  els.nextAction.textContent = attempt?.phase === "reference-ready" || attempt?.phase === "reference"
    ? "先听 C 的参照音"
    : (attempt?.phase === "complete" ? "两边叶子已经握住" : `声音 ${Math.min(4, (attempt?.callIndex || 0) + 1)}/4`);
  els.inputStatus.textContent = "输入：屏幕琴键";
  els.heardStatus.textContent = "听到：-";
  const targetMidi = ls04Target(attempt) ?? 60;
  const assisted = attempt?.supportStage === "assisted" && attempt?.phase === "assisted";
  renderKeyboard(noteForMidi(targetMidi), {
    scaffold: assisted ? "garden-listening-assisted" : "garden-listening",
    disableTarget: !assisted,
    showTarget: assisted,
    concealTargetIdentity: !assisted
  });
}

function renderGardenScreen() {
  if (!els.gardenPanel || state.screen !== "garden") return;
  if (currentListeningAction()) {
    renderLs04Screen();
    return;
  }
  const lesson = currentGardenLesson();
  const equipmentState = state.chapter3.equipmentState || "sealed";
  const copy = gardenLessonCopy(lesson);
  els.mainTitle.textContent = "呼吸花园";
  els.levelBadge.textContent = lesson?.id || "花园";
  if (els.appShell) {
    els.appShell.dataset.levelId = lesson?.id || "CH3";
    els.appShell.dataset.phase = "garden-visible";
    els.appShell.dataset.chapter3 = "visible-slice";
  }
  els.gardenScene.dataset.airState = equipmentState;
  els.gardenScene.dataset.lesson = lesson?.id || "complete";
  els.gardenScene.dataset.reviewableForMastery = "false";
  els.gardenScene.dataset.repairStage = state.gardenRepairStage;
  els.gardenXingya.dataset.equipment = equipmentState;
  renderGardenCharacterAsset(equipmentState);
  els.gardenAirCheck.hidden = equipmentState === "safe-open";
  els.gardenPlant.hidden = false;
  els.gardenListening.hidden = true;
  els.gardenProgress.hidden = false;
  els.gardenAirCheckTitle.textContent = equipmentState === "scanning" ? "空气检测中" : "密封抵达";
  els.gardenAirCheckDetail.textContent = equipmentState === "scanning" ? "背包确认这里可以呼吸" : "背包正在检查花园空气";
  els.gardenSpeechKicker.textContent = copy.kicker;
  els.gardenSpeechMain.textContent = copy.main;
  els.gardenSpeechSupport.textContent = copy.support;
  els.gardenSpeech.hidden = equipmentState !== "safe-open";
  [1, 2, 3].forEach((leaf) => {
    const element = els.gardenPlant.querySelector(`[data-leaf="${leaf}"]`);
    element?.classList.toggle("grown", Boolean(state.chapter3.leaves[leaf - 1]));
    element?.classList.toggle("current", lesson?.leaf === leaf && !state.chapter3.leaves[leaf - 1]);
  });
  const ls03Count = Math.max(0, Math.min(2, state.chapter3.ls03QualifiedInputs));
  els.gardenProgress.innerHTML = [1, 2, 3].map((leaf) => {
    const complete = state.chapter3.leaves[leaf - 1];
    const active = lesson?.leaf === leaf;
    const detail = leaf === 3 && active && !complete ? `${ls03Count}/2` : (complete ? "✓" : String(leaf));
    return `<span class="${complete ? "done" : ""}${active ? " active" : ""}" aria-label="第${leaf}片叶${complete ? "完成" : (active ? "进行中" : "未开始")}">${detail}</span>`;
  }).join("");
  els.nextAction.textContent = equipmentState !== "safe-open"
    ? "背包检查空气"
    : (lesson ? `${lesson.letter} · ${lesson.locator} · ${lesson.prompt}` : "三片叶长好啦");
  els.inputStatus.textContent = "输入：屏幕琴键";
  renderKeyboard(noteForMidi(lesson?.midi ?? 60) || notes[0], {
    scaffold: lesson?.id === "LS03" && ls03Count === 1 ? "garden-weaker" : "garden-visible",
    targetColor: noteForMidi(lesson?.midi ?? 60)?.color,
    disableTarget: equipmentState !== "safe-open" || !lesson,
    showTarget: equipmentState === "safe-open" && Boolean(lesson) && !(lesson.id === "LS03" && ls03Count === 1)
  });
}

function renderGardenCharacterAsset(equipmentState) {
  if (!els.gardenXingyaImage || !els.gardenXingya) return;
  const approvedSource = equipmentState === "safe-open"
    ? gardenCharacterAssets.safeOpen
    : gardenCharacterAssets[equipmentState] || gardenCharacterAssets.sealed;
  if (approvedSource) {
    if (els.gardenXingyaImage.getAttribute("src") !== approvedSource) {
      els.gardenXingyaImage.setAttribute("src", approvedSource);
    }
    els.gardenXingya.dataset.assetState = equipmentState === "safe-open" ? "garden-mode" : "sealed-suit";
    return;
  }
  if (els.gardenXingyaImage.getAttribute("src") !== gardenCharacterAssets.sealed) {
    els.gardenXingyaImage.setAttribute("src", gardenCharacterAssets.sealed);
  }
  els.gardenXingya.dataset.assetState = "awaiting-approved-garden-mode";
}

function completedTargetForAction(action) {
  if (!action) return false;
  if (action.kind === "garden") return Boolean(state.chapter3.lessonEvidence[action.targetId]?.completedAt);
  if (action.kind === "garden-listening") return Boolean(state.chapter3.lessonEvidence[action.targetId]?.completedAt);
  if (action.kind === "staff") {
    if (action.sessionMode === "mini") return false;
    if (action.runMode === "check") return hasVerifiedStableStaff();
    return Boolean(state.learningStats.staff[staffCourse.id]?.completions);
  }
  if (action.runMode === "check") return hasVerifiedStableLevel(levels.find((level) => level.id === action.targetId), state.learningStats.levels[action.targetId]);
  return state.completed.has(action.targetId);
}

function retainedSkillKeys() {
  return new Set(state.learningStats.retention.retainedEvents.map((event) => event.skillKey));
}

function completedSessionBundle(bundleId) {
  return state.sessionRuntime.history.some((session) => session.bundleId === bundleId && session.status === "ended");
}

function hasReachedGardenEntrance() {
  return state.sessionRuntime.history.some((session) =>
    session?.bundleId === "C2-03" &&
    session?.status === "ended" &&
    Array.isArray(session.completedActions) &&
    session.completedActions.some((action) =>
      action?.actionId === "S01-check" && action?.kind === "staff" && action?.targetId === staffCourse.id
    )
  );
}

function hasReviewableFormalHistory(stored) {
  return (Number(stored?.formalCompletions) || 0) > 0 || (Number(stored?.stableCompletions) || 0) > 0;
}

function selectOpeningReview(bundle, sessionIdentity) {
  if (bundle.allowOpeningReview === false) return null;
  const baseLevelIds = new Set(bundle.actions.filter((action) => action.kind === "level").map((action) => action.targetId));
  const retained = retainedSkillKeys();
  const levelCandidates = levels
    .filter((level) => level.id !== "M01" && !baseLevelIds.has(level.id))
    .map((level) => {
      const stored = state.learningStats.levels[level.id];
      if (!hasReviewableFormalHistory(stored)) return null;
      const skillKey = evidenceSkillKey("level", level.id);
      const stable = hasVerifiedStableLevel(level, stored);
      const stableEvents = state.learningStats.retention.stableEvents.filter((event) => event.skillKey === skillKey);
      const lastCompletedMs = isoTimeMs(stored.lastFormalCompletedAt);
      let priority = 3;
      if (stored.needsPractice) priority = 0;
      else if (!stable) priority = 1;
      else if (stable && !retained.has(skillKey)) priority = 2;
      if (priority === 3) return null;
      return { kind: "level", targetId: level.id, level, stored, skillKey, priority, lastCompletedMs: Number.isFinite(lastCompletedMs) ? lastCompletedMs : 0 };
    })
    .filter(Boolean);

  const staffStored = state.learningStats.staff[staffCourse.id];
  const staffSkillKey = evidenceSkillKey("staff", staffCourse.id);
  const staffStableEvents = state.learningStats.retention.stableEvents.filter((event) => event.skillKey === staffSkillKey);
  const staffStable = hasVerifiedStableStaff(staffStored);
  let staffCandidate = null;
  if (hasReviewableFormalHistory(staffStored) && !bundle.actions.some((action) => action.kind === "staff")) {
    let priority = 3;
    if (staffStored.needsPractice) priority = 0;
    else if (!staffStable) priority = 1;
    else if (staffStable && !retained.has(staffSkillKey)) priority = 2;
    if (priority < 3) {
      const lastCompletedMs = isoTimeMs(staffStored.lastFormalCompletedAt);
      staffCandidate = {
        kind: "staff",
        targetId: staffCourse.id,
        stored: staffStored,
        skillKey: staffSkillKey,
        priority,
        lastCompletedMs: Number.isFinite(lastCompletedMs) ? lastCompletedMs : 0
      };
    }
  }

  const candidates = [...levelCandidates, ...(staffCandidate ? [staffCandidate] : [])]
    .sort((a, b) => a.priority - b.priority || a.lastCompletedMs - b.lastCompletedMs);

  const candidate = candidates[0];
  if (!candidate) return null;
  const listening = candidate.kind === "level" && candidate.level.id === "M03";
  return {
    actionId: `review-${candidate.targetId}-${sessionIdentity.sessionId}`,
    kind: candidate.kind,
    targetId: candidate.targetId,
    runMode: listening ? "guided" : "check",
    sessionMode: candidate.kind === "staff" ? "full" : undefined,
    forceReducedCue: !listening,
    requiredReview: true,
    role: "opening-review",
    reviewSkillKey: candidate.skillKey,
    reviewPriority: candidate.priority
  };
}

function baseStartIndexForBundle(bundle, requestedTargetId, voluntaryReplay) {
  if (!voluntaryReplay || !requestedTargetId || bundle.bundleId === "C1-01") return 0;
  const requestedIndex = bundle.actions.findIndex((action) => action.targetId === requestedTargetId);
  if (requestedIndex >= 0) return requestedIndex;
  return 0;
}

function createActiveSession(bundle, requestedTargetId = null) {
  const now = new Date();
  const identity = {
    sessionId: createSessionId(bundle.bundleId),
    bundleId: bundle.bundleId,
    startedAt: now.toISOString(),
    localDateKey: localDateKeyAt(now)
  };
  const voluntaryReplay = completedSessionBundle(bundle.bundleId);
  const baseStartIndex = baseStartIndexForBundle(bundle, requestedTargetId, voluntaryReplay);
  const baseActions = bundle.actions.slice(baseStartIndex).map((action) => ({
    ...action,
    role: voluntaryReplay ? "voluntary-replay" : "lesson",
    requiredReview: false,
    reviewSkillKey: null
  }));
  const review = voluntaryReplay ? null : selectOpeningReview(bundle, identity);
  const actions = review ? [review, ...baseActions] : baseActions;
  return {
    ...identity,
    reviewSkillKey: review?.reviewSkillKey || null,
    voluntaryReplay,
    status: "active",
    actionIndex: 0,
    actions,
    completedActions: [],
    restAfterCurrentLevel: false
  };
}

function persistActiveSession() {
  state.sessionRuntime.active = state.activeSession;
  saveSessionRuntime(state.sessionRuntime);
}

function sessionUrlSuffix() {
  const session = state.activeSession;
  if (!session) return "";
  return `&bundle=${encodeURIComponent(session.bundleId)}&sessionId=${encodeURIComponent(session.sessionId)}`;
}

function startActiveSessionAction(actionIndex = state.activeSession?.actionIndex || 0) {
  const session = state.activeSession;
  if (!session || session.status !== "active") return;
  session.actionIndex = Math.max(0, Math.min(actionIndex, session.actions.length - 1));
  session.actionStartedAt = new Date().toISOString();
  persistActiveSession();
  const action = currentSessionAction(session);
  if (!action) return;

  if (action.kind === "staff") {
    showStaffScreen({ sessionMode: action.sessionMode || "full", runMode: action.runMode || "guided" });
    return;
  }

  if (action.kind === "garden" || action.kind === "garden-listening") {
    showGardenScreen({ recovery: state.chapter3.airCheckComplete || state.chapter3.equipmentState === "scanning" });
    return;
  }

  const index = levels.findIndex((level) => level.id === action.targetId);
  if (index < 0) return;
  clearAutoAdvance();
  state.levelIndex = index;
  state.screen = "play";
  state.levelRunMode = action.runMode || "guided";
  updateUrlForLevel();
  resetLevel(state.levelRunMode);
}

function startSessionBundleFromMap(bundleId, requestedTargetId = null) {
  if (state.activeSession?.status === "active") {
    startActiveSessionAction(state.activeSession.actionIndex);
    return;
  }
  const bundle = sessionBundleById.get(bundleId);
  if (!bundle) return;
  if (bundle.actions.some((action) => action.kind === "staff")) {
    const readiness = fgBridgeReadiness();
    if (!readiness.ready) {
      routeToFgPrep(readiness);
      return;
    }
  }
  state.activeSession = createActiveSession(bundle, requestedTargetId);
  persistActiveSession();
  startActiveSessionAction(0);
}

function nextGardenSessionPlan() {
  if (!state.chapter3.lessonEvidence.LS01?.completedAt) {
    return { bundleId: "C3-01", actionIds: ["LS01-visible", "LS02-visible"], resumeOfSessionId: null };
  }
  if (!state.chapter3.lessonEvidence.LS02?.completedAt) {
    return {
      bundleId: "C3-01",
      actionIds: ["LS02-visible"],
      resumeOfSessionId: state.chapter3.resume?.endedSessionId || null
    };
  }
  if (!state.chapter3.lessonEvidence.LS03?.completedAt) {
    return { bundleId: "C3-02", actionIds: ["LS03-visible"], resumeOfSessionId: null };
  }
  if (!state.chapter3.lessonEvidence.LS04?.completedAt) {
    return { bundleId: "C3-03", actionIds: ["LS04-listening"], resumeOfSessionId: null };
  }
  return null;
}

function createGardenActiveSession(plan) {
  const bundle = sessionBundleById.get(plan.bundleId);
  if (!bundle) return null;
  const selected = bundle.actions.filter((action) => plan.actionIds.includes(action.actionId));
  const now = new Date();
  const session = {
    sessionId: createSessionId(plan.bundleId),
    bundleId: plan.bundleId,
    startedAt: now.toISOString(),
    localDateKey: localDateKeyAt(now),
    reviewSkillKey: null,
    voluntaryReplay: false,
    status: "active",
    actionIndex: 0,
    actions: selected.map((action) => ({
      ...action,
      role: plan.resumeOfSessionId ? "lesson-resume" : "lesson",
      requiredReview: false,
      reviewSkillKey: null
    })),
    completedActions: [],
    restAfterCurrentLevel: false,
    resumeOfSessionId: plan.resumeOfSessionId || null
  };
  const listeningAction = session.actions.find((action) => action.kind === "garden-listening");
  if (listeningAction) listeningAction.listeningAttempt = createLs04Attempt(session);
  return session;
}

function unlockChapter3AudioFromGesture() {
  unlockAudioFromGesture();
  try {
    const bus = getSfxBus();
    if (bus?.ctx?.state === "suspended") bus.ctx.resume().catch(() => {});
    document.documentElement.dataset.chapter3AudioGesture = bus ? "unlocked" : "unavailable";
  } catch (error) {
    document.documentElement.dataset.chapter3AudioGesture = "unavailable";
  }
}

function startGardenFromMap() {
  if (!hasReachedGardenEntrance()) return;
  unlockChapter3AudioFromGesture();
  if (state.activeSession?.status === "active") {
    if (state.activeSession.bundleId.startsWith("C3-")) startActiveSessionAction(state.activeSession.actionIndex);
    return;
  }
  const plan = nextGardenSessionPlan();
  if (!plan) return;
  state.activeSession = createGardenActiveSession(plan);
  if (!state.activeSession) return;
  if (plan.resumeOfSessionId) state.chapter3.resume = null;
  persistChapter3Progress();
  persistActiveSession();
  startActiveSessionAction(0);
}

function nextStaffBundleId() {
  if (!state.sessionRuntime.history.some((session) => session.bundleId === "C2-01" && session.status === "ended")) return "C2-01";
  if (!state.learningStats.staff[staffCourse.id]?.completions) return "C2-02";
  if (!hasVerifiedStableStaff()) return "C2-03";
  return "C2-03";
}

function recordSessionActionCompletion({ kind, id, reward }) {
  const session = state.activeSession;
  const action = currentSessionAction(session);
  if (!session || !action) return null;
  const attempt = state.practiceAttempt;
  const stable = kind === "staff" ? isStableStaffAttempt(attempt) : isStableLevelAttempt(levels.find((level) => level.id === id), attempt);
  const completion = {
    actionId: action.actionId,
    kind,
    targetId: id,
    runMode: action.runMode,
    requiredReview: Boolean(action.requiredReview),
    reviewSkillKey: action.reviewSkillKey || null,
    completedAt: new Date().toISOString(),
    wrongCount: attempt?.wrongs || 0,
    strongCueFrames: attempt?.strongCueFrames || 0,
    stable,
    assistedSuccesses: attempt?.assistedSuccesses || 0,
    modeledSuccesses: attempt?.modeledSuccesses || 0,
    idleIdentityHints: attempt?.idleIdentityHints || 0,
    idleLocatorHints: attempt?.idleLocatorHints || 0,
    reward: reward || ""
  };
  session.completedActions.push(completion);
  return completion;
}

function recordGardenActionCompletion(lesson, {
  childCorrectCount = 1,
  modeled = false,
  assisted = false,
  needsPractice = false,
  completionSource = "child"
} = {}) {
  const session = state.activeSession;
  const action = currentSessionAction(session);
  if (!session || action?.kind !== "garden" || action.targetId !== lesson.id) return null;
  const completion = {
    actionId: action.actionId,
    kind: "garden",
    targetId: lesson.id,
    runMode: "guided",
    reviewableForMastery: false,
    stable: false,
    retained: false,
    completedAt: new Date().toISOString(),
    wrongCount: state.gardenWrongCount,
    childCorrectCount,
    childInputs: state.gardenChildInputs.map((input) => ({ ...input })),
    inputRoutes: { ...state.gardenInputRoutes },
    assisted,
    strongCueUsed: assisted || modeled,
    modeled,
    modeledInputs: modeled ? [...state.gardenModeledInputs] : [],
    needsPractice,
    completionSource,
    reward: `${lesson.letter} 音符叶`
  };
  session.completedActions.push(completion);
  state.chapter3.lessonEvidence[lesson.id] = {
    completedAt: completion.completedAt,
    sessionId: session.sessionId,
    bundleId: session.bundleId,
    wrongCount: completion.wrongCount,
    childCorrectCount,
    childInputs: completion.childInputs.map((input) => ({ ...input })),
    inputRoutes: { ...completion.inputRoutes },
    assisted,
    strongCueUsed: completion.strongCueUsed,
    modeled,
    modeledInputs: [...completion.modeledInputs],
    needsPractice,
    completionSource,
    reviewableForMastery: false
  };
  clearGardenPendingAttempt(action);
  persistChapter3Progress();
  return completion;
}

function finishGardenEarlyRest(reason = "early-rest") {
  const session = state.activeSession;
  if (!session || session.bundleId !== "C3-01") return null;
  const endedSessionId = session.sessionId;
  state.chapter3.resume = {
    bundleId: "C3-01",
    nextTargetId: "LS02",
    endedSessionId,
    reason,
    createdAt: new Date().toISOString()
  };
  persistChapter3Progress();
  const ended = finishActiveSessionAtRest({ reward: "第一片音符叶", reason: "early-rest" });
  renderGardenScreen();
  clearGardenTimers();
  state.gardenCompletionTimer = setTimeout(() => showMapScreen(), 1050);
  return ended;
}

function finishGardenBundle(reason = "natural-rest") {
  const session = state.activeSession;
  if (!session) return;
  const bundleId = session.bundleId;
  finishActiveSessionAtRest({ reward: bundleId === "C3-02" ? "三片音符叶" : "两片音符叶", reason });
  if (bundleId === "C3-02") {
    state.chapter3.visibleSliceCompleted = true;
    state.chapter3.completed = false;
    persistChapter3Progress();
  }
  renderGardenScreen();
  clearGardenTimers();
  state.gardenCompletionTimer = setTimeout(() => showMapScreen(), 1450);
}

function completeGardenLesson(lesson, options = {}) {
  const completion = recordGardenActionCompletion(lesson, {
    childCorrectCount: options.childCorrectCount ?? (lesson.requiredInputs || 1),
    modeled: Boolean(options.modeled),
    assisted: Boolean(options.assisted),
    needsPractice: Boolean(options.needsPractice),
    completionSource: options.completionSource || "child"
  });
  if (!completion) return;
  state.chapter3.leaves[lesson.leaf - 1] = true;
  persistChapter3Progress();
  renderGardenScreen();
  const session = state.activeSession;
  if (lesson.id === "LS01" && options.earlyRest) {
    finishGardenEarlyRest(options.earlyRestReason || "early-rest");
    return;
  }
  const hasNext = session.actionIndex + 1 < session.actions.length;
  if (!hasNext) {
    finishGardenBundle("natural-rest");
    return;
  }
  session.actionIndex += 1;
  persistActiveSession();
  state.gardenCompletionTimer = setTimeout(() => startActiveSessionAction(session.actionIndex), 900);
}

function beginGardenAssistedRepair() {
  if (state.gardenRepairStage === "assisted") return;
  state.gardenRepairStage = "assisted";
  persistGardenPendingAttempt();
  renderGardenScreen();
  scheduleGardenAssistedTimer();
}

function scheduleGardenAssistedTimer() {
  if (state.gardenLongWaitTimer) clearTimeout(state.gardenLongWaitTimer);
  if (state.gardenAssistedTimer) clearTimeout(state.gardenAssistedTimer);
  state.gardenLongWaitTimer = null;
  state.gardenAssistedTimer = setTimeout(() => {
    state.gardenAssistedTimer = null;
    completeGardenModeledSuccess("assisted-timeout");
  }, CH3_ASSISTED_WAIT_MS);
}

function completeGardenModeledSuccess(reason) {
  const lesson = currentGardenLesson();
  if (state.screen !== "garden" || lesson?.id !== "LS01" || state.chapter3.leaves[0]) return false;
  clearGardenTimers();
  state.gardenModeledInputs.push({
    source: "model",
    reason,
    targetMidi: lesson.midi,
    completedAt: new Date().toISOString()
  });
  persistGardenPendingAttempt();
  state.lastInputMidi = lesson.midi;
  state.lastInputResult = "correct";
  completeGardenLesson(lesson, {
    childCorrectCount: 0,
    modeled: true,
    assisted: state.gardenRepairStage === "assisted",
    needsPractice: true,
    completionSource: "model",
    earlyRest: true,
    earlyRestReason: reason
  });
  return true;
}

function showGardenScreen({ recovery = false } = {}) {
  clearAutoAdvance();
  clearGardenTimers();
  hideResultModal();
  state.screen = "garden";
  state.lastInputMidi = null;
  state.lastInputResult = null;
  if (currentListeningAction()) ensureLs04Attempt();
  else restoreGardenPendingAttempt();
  state.gardenInputArmed = true;
  history.replaceState(null, "", `?mode=garden${sessionUrlSuffix()}`);
  render();
  if (currentListeningAction()) {
    setGardenEquipmentState("safe-open");
    resumeLs04Flow();
  } else {
    beginGardenAirCheck({ recovery });
  }
}

function shouldDeferSessionCheck(session, completion) {
  const nextAction = session?.actions?.[session.actionIndex + 1];
  if (!nextAction || nextAction.runMode !== "check" || nextAction.targetId !== completion?.targetId) return false;
  const requiresM08RoofRest = completion.targetId === "M08" && (
    completion.wrongCount >= 2 ||
    completion.assistedSuccesses > 0 ||
    completion.modeledSuccesses > 0 ||
    completion.idleIdentityHints > 0 ||
    completion.idleLocatorHints > 0
  );
  return requiresM08RoofRest || completion.wrongCount >= 2 || completion.assistedSuccesses > 0 || (state.practiceAttempt?.idleLocatorHints || 0) > 0;
}

function finishActiveSessionAtRest({ reward = "", reason = "natural-rest" } = {}) {
  const session = state.activeSession;
  if (!session) return null;
  if (session.bundleId.startsWith("C3-")) {
    session.actions.forEach((action) => {
      clearGardenPendingAttempt(action);
      delete action.listeningAttempt;
    });
  }
  const endedAt = new Date().toISOString();
  const ended = { ...session, status: "ended", endedAt, endReason: reason };
  state.sessionRuntime.history.push(ended);
  state.sessionRuntime.history = state.sessionRuntime.history.slice(-80);
  state.sessionRuntime.lastRest = {
    sessionId: session.sessionId,
    bundleId: session.bundleId,
    endedAt,
    localDateKey: session.localDateKey,
    reward
  };
  state.sessionRuntime.active = null;
  state.activeSession = null;
  saveSessionRuntime(state.sessionRuntime);
  return ended;
}

function recordMiniObservationEvent() {
  const attempt = state.practiceAttempt;
  if (!attempt?.formalSession || !attempt.sessionId || !attempt.localDateKey) return;
  state.learningStats.retention.observationEvents.push({
    eventId: evidenceEventId("observation"),
    evidenceType: "observation",
    skillKey: "staff:S01-mini",
    staffCourseId: staffCourse.id,
    sessionId: attempt.sessionId,
    bundleId: attempt.bundleId,
    completedAt: new Date().toISOString(),
    localDateKey: attempt.localDateKey,
    wrongCount: attempt.wrongs || 0,
    thresholdVersion: RETENTION_THRESHOLD_VERSION
  });
  saveLearningStats();
}

function showSessionCompletion({ kind, id, reward }) {
  const session = state.activeSession;
  if (!session) return false;
  if (kind === "staff" && isMiniStaffSession()) recordMiniObservationEvent();
  const completion = recordSessionActionCompletion({ kind, id, reward });
  if (!completion) return false;
  const deferCheck = shouldDeferSessionCheck(session, completion);
  const hasNext = !deferCheck && !session.restAfterCurrentLevel && session.actionIndex + 1 < session.actions.length;
  const nextAction = hasNext ? session.actions[session.actionIndex + 1] : null;
  if (hasNext) {
    session.actionIndex += 1;
    persistActiveSession();
  } else {
    finishActiveSessionAtRest({ reward, reason: deferCheck ? "review-deferred" : (session.restAfterCurrentLevel ? "assisted-safe-rest" : "natural-rest") });
  }

  hideResultModal();
  clearAutoAdvance();
  if (hasNext) {
    els.nextAction.innerHTML = `<span class="cue-success">✓</span><span class="cue-text strong">星芽继续出发</span>`;
  }
  state.autoAdvanceTimer = setTimeout(() => {
    if (hasNext) startActiveSessionAction(state.activeSession?.actionIndex || 0);
    else showMapScreen();
  }, hasNext ? 1450 : 1750);
  return true;
}

function showMapScreen() {
  if (state.screen === "garden" && state.activeSession?.bundleId === "C3-01") {
    if (!state.chapter3.lessonEvidence.LS01?.completedAt) {
      clearGardenTimers();
    }
    if (state.chapter3.lessonEvidence.LS01?.completedAt && !state.chapter3.lessonEvidence.LS02?.completedAt) {
      finishGardenEarlyRest("voluntary-rest");
      return;
    }
  }
  clearAutoAdvance();
  clearGardenTimers();
  clearAssistedRepairState();
  clearWorkshopIdleHints();
  clearLevelIntro();
  clearListeningPrompt();
  hideResultModal();
  state.screen = "map";
  history.replaceState(null, "", `?screen=map${sessionUrlSuffix()}`);
  render();
}

function showStaffScreen({ sessionMode = "full", runMode = "guided" } = {}) {
  const readiness = fgBridgeReadiness();
  if (!readiness.ready) {
    routeToFgPrep(readiness);
    return;
  }
  clearAutoAdvance();
  clearWorkshopIdleHints();
  clearLevelIntro();
  clearListeningPrompt();
  hideResultModal();
  state.screen = "staff";
  state.staffSessionMode = sessionMode === "mini" ? "mini" : "full";
  state.staffRunMode = runMode || "guided";
  updateUrlForStaff();
  resetStaffCourse(state.staffRunMode);
}

function getSfxBus() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext || !state.audioUnlocked || !state.audioSettings.enabled || state.audioSettings.volume <= 0) return null;

  if (!state.sfx || state.sfx.ctx.state === "closed") {
    const ctx = new AudioContext();
    const master = ctx.createGain();
    const noteBus = ctx.createGain();
    const effectBus = ctx.createGain();
    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -24;
    compressor.knee.value = 20;
    compressor.ratio.value = 8;
    compressor.attack.value = 0.006;
    compressor.release.value = 0.18;
    master.gain.value = 0.0001;
    noteBus.gain.value = 1;
    effectBus.gain.value = AUDIO_EFFECT_GAIN;
    noteBus.connect(master);
    effectBus.connect(master);
    master.connect(compressor);
    compressor.connect(ctx.destination);
    state.sfx = { ctx, master, noteBus, effectBus };
    applyAudioSettings();
  }

  if (state.sfx.ctx.state === "suspended") {
    state.sfx.ctx.resume().catch(() => {});
  }

  return state.sfx;
}

function envelopeParam(param, start, duration, peak, attack = 0.012, decay = 0.12, sustain = 0.18) {
  const sustainValue = Math.max(0.0001, peak * sustain);
  param.cancelScheduledValues(start);
  param.setValueAtTime(0.0001, start);
  param.linearRampToValueAtTime(peak, start + attack);
  param.exponentialRampToValueAtTime(sustainValue, start + attack + decay);
  param.exponentialRampToValueAtTime(0.0001, start + duration);
}

function playPianoNote(frequency, options = {}) {
  let sfx = null;
  try {
    sfx = getSfxBus();
  } catch (error) {
    return false;
  }
  if (!sfx) return false;
  const { ctx, noteBus, effectBus } = sfx;
  const start = ctx.currentTime + (options.delay || 0);
  const duration = options.duration || 0.46;
  const gainValue = options.gain || 0.12;
  const output = ctx.createGain();
  const toneFilter = ctx.createBiquadFilter();
  toneFilter.type = "lowpass";
  toneFilter.frequency.setValueAtTime(4200, start);
  toneFilter.frequency.exponentialRampToValueAtTime(1800, start + duration);
  toneFilter.Q.value = 0.6;
  envelopeParam(output.gain, start, duration, gainValue, 0.008, 0.13, 0.28);
  toneFilter.connect(output);
  output.connect(options.bus === "effect" ? effectBus : noteBus);

  const partials = [
    { ratio: 1, gain: 0.78, type: "triangle", detune: -2 },
    { ratio: 2, gain: 0.20, type: "sine", detune: 3 },
    { ratio: 3, gain: 0.10, type: "sine", detune: -5 },
    { ratio: 4, gain: 0.045, type: "sine", detune: 0 }
  ];

  partials.forEach((partial) => {
    const osc = ctx.createOscillator();
    const partialGain = ctx.createGain();
    osc.type = partial.type;
    osc.frequency.setValueAtTime(frequency * partial.ratio, start);
    osc.detune.value = (options.detune || 0) + partial.detune;
    partialGain.gain.value = partial.gain;
    osc.connect(partialGain);
    partialGain.connect(toneFilter);
    osc.start(start);
    osc.stop(start + duration + 0.04);
  });
  return true;
}

function playBellPing(frequency, options = {}) {
  const sfx = getSfxBus();
  if (!sfx) return;
  const { ctx, effectBus } = sfx;
  const start = ctx.currentTime + (options.delay || 0);
  const duration = options.duration || 0.34;
  const output = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(Math.min(6200, frequency * 1.45), start);
  filter.Q.value = 1.25;
  envelopeParam(output.gain, start, duration, options.gain || 0.026, 0.004, 0.09, 0.10);
  filter.connect(output);
  output.connect(effectBus);

  [
    { ratio: 1, gain: 0.72, detune: -3 },
    { ratio: 2.01, gain: 0.20, detune: 4 },
    { ratio: 3.02, gain: 0.08, detune: -7 }
  ].forEach((partial) => {
    const osc = ctx.createOscillator();
    const partialGain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency * partial.ratio, start);
    osc.detune.value = partial.detune;
    partialGain.gain.value = partial.gain;
    osc.connect(partialGain);
    partialGain.connect(filter);
    osc.start(start);
    osc.stop(start + duration + 0.04);
  });
}

function playSoftNoiseHit(options = {}) {
  const sfx = getSfxBus();
  if (!sfx) return;
  const { ctx, effectBus } = sfx;
  const start = ctx.currentTime + (options.delay || 0);
  const duration = options.duration || 0.16;
  const sampleCount = Math.max(1, Math.floor(ctx.sampleRate * duration));
  const buffer = ctx.createBuffer(1, sampleCount, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let index = 0; index < sampleCount; index += 1) {
    const fade = 1 - index / sampleCount;
    data[index] = (Math.random() * 2 - 1) * fade;
  }

  const source = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const output = ctx.createGain();
  filter.type = options.filterType || "bandpass";
  filter.frequency.setValueAtTime(options.frequency || 2400, start);
  filter.Q.value = options.q || 0.85;
  output.gain.setValueAtTime(0.0001, start);
  output.gain.linearRampToValueAtTime(options.gain || 0.012, start + 0.01);
  output.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  source.buffer = buffer;
  source.connect(filter);
  filter.connect(output);
  output.connect(effectBus);
  source.start(start);
  source.stop(start + duration + 0.02);
}

function playCorrectSound() {
  playSoftNoiseHit({ gain: 0.014, duration: 0.16, frequency: 2600, q: 1.1, delay: 0.12 });
  playSoftNoiseHit({ gain: 0.010, duration: 0.18, frequency: 4300, q: 1.25, delay: 0.21 });
}

function playWrongSound() {
  playSoftNoiseHit({ gain: 0.018, duration: 0.20, frequency: 520, filterType: "lowpass", q: 0.5 });
  playSoftNoiseHit({ gain: 0.008, duration: 0.14, frequency: 920, filterType: "bandpass", q: 0.65, delay: 0.07 });
}

function clearListeningPrompt() {
  if (state.listenPromptTimer) {
    clearTimeout(state.listenPromptTimer);
    state.listenPromptTimer = null;
  }
}

function playListeningPrompt() {
  if (state.screen !== "play" || !isListeningLevel()) return;
  const target = noteForMidi(activeTargetMidi());
  if (!target) return;
  clearListeningPrompt();
  playPianoNote(target.frequency, { gain: 0.13, duration: 0.72 });
  if (els.heardStatus) els.heardStatus.textContent = "听到：小车轮唱了一声";
  if (els.feedback) {
    els.feedback.classList.remove("good", "bad");
    els.feedback.textContent = "听一听，点下方同样的琴键。";
  }
  els.moonYard?.classList.remove("listening-pulse");
  void els.moonYard?.offsetWidth;
  els.moonYard?.classList.add("listening-pulse");
  setTimeout(() => els.moonYard?.classList.remove("listening-pulse"), 900);
  setDinoMood("listen", 980);
}

function scheduleListeningPrompt(delay = 520) {
  clearListeningPrompt();
  if (state.screen !== "play" || !isListeningLevel()) return;
  state.listenPromptTimer = setTimeout(() => {
    state.listenPromptTimer = null;
    playListeningPrompt();
  }, delay);
}

function playBlackKeyTick() {
  playSoftNoiseHit({ gain: 0.010, duration: 0.08, frequency: 1450, filterType: "bandpass", q: 0.85 });
}

function playVictorySound() {
  playPianoNote(523.25, { gain: 0.070, duration: 0.48, bus: "effect" });
  playPianoNote(659.25, { gain: 0.064, duration: 0.50, delay: 0.10, bus: "effect" });
  playPianoNote(783.99, { gain: 0.070, duration: 0.62, delay: 0.22, bus: "effect" });
  playPianoNote(1046.5, { gain: 0.034, duration: 0.56, delay: 0.34, bus: "effect" });
  playBellPing(1318.51, { gain: 0.018, duration: 0.30, delay: 0.18 });
  playBellPing(1567.98, { gain: 0.016, duration: 0.34, delay: 0.36 });
  playSoftNoiseHit({ gain: 0.010, duration: 0.24, frequency: 3600, delay: 0.20 });
}

function playTone(frequency, duration, type = "sine", gainValue = 0.08) {
  const sfx = getSfxBus();
  if (!sfx) return;
  const { ctx, effectBus } = sfx;
  const start = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = frequency;
  envelopeParam(gain.gain, start, duration, gainValue, 0.006, Math.max(0.025, duration * 0.25), 0.18);
  osc.connect(gain);
  gain.connect(effectBus);
  osc.start(start);
  osc.stop(start + duration + 0.03);
}

function resetLevel(runMode = "guided") {
  if (state.screen === "staff") {
    resetStaffCourse();
    return;
  }

  state.levelRunMode = runMode;
  state.stepIndex = 0;
  state.lastInputMidi = null;
  state.lastInputResult = null;
  state.staffInputMarkerSerial += 1;
  state.stepHadWrong = false;
  state.practiceAttempt = stampPracticeAttemptSession(createPracticeAttempt("level", activeLevel().id, state.levelRunMode));
  clearAssistedRepairState();
  clearAutoAdvance();
  clearWorkshopIdleHints();
  clearDinoMoodTimer();
  clearLevelIntro();
  clearListeningPrompt();
  if (els.dinoSvg) {
    els.dinoSvg.classList.remove("mood-good", "mood-bad", "mood-celebrate", "mood-listen");
    els.dinoSvg.classList.add("mood-point");
    els.dinoSvg.src = dinoImages.point;
  }
  if (els.coachDino) {
    els.coachDino.classList.remove("mood-good", "mood-bad", "mood-celebrate", "mood-listen");
    els.coachDino.classList.add("mood-point");
    els.coachDino.src = dinoImages.point;
  }
  hideResultModal();
  setInstructionFeedback();
  render();
  beginPracticeStepClock();
  showLevelIntro();
  scheduleWorkshopIdleHints(LEVEL_INTRO_RESPONSE_DELAY_MS);
  scheduleListeningPrompt(720);
}

function startLevelCheckReplay() {
  resetLevel("check");
  els.feedback.classList.remove("good", "bad");
  els.feedback.textContent = "这次不亮目标键，自己读音名找键。";
  if (els.dinoHint) els.dinoHint.textContent = "少提示复练：读音名，自己找键。";
  if (els.modeHint) els.modeHint.textContent = "少提示复练：错了才会临时亮目标。";
}

function resetStaffCourse(runMode = state.staffRunMode || "guided") {
  if (isMiniStaffSession() && runMode === "check") runMode = "guided";
  state.staffRunMode = runMode;
  state.staffStepIndex = 0;
  state.staffComplete = false;
  state.lastInputMidi = null;
  state.lastInputResult = null;
  state.staffInputMarkerSerial += 1;
  state.stepHadWrong = false;
  state.practiceAttempt = stampPracticeAttemptSession(createPracticeAttempt("staff", staffCourse.id, state.staffRunMode));
  clearAssistedRepairState();
  clearAutoAdvance();
  clearWorkshopIdleHints();
  clearDinoMoodTimer();
  clearStaffDinoMoodTimer();
  if (state.staffMotionTimer) {
    clearTimeout(state.staffMotionTimer);
    state.staffMotionTimer = null;
  }
  clearLevelIntro();
  clearListeningPrompt();
  hideResultModal();
  if (els.staffDino) {
    els.staffDino.classList.remove("mood-good", "mood-bad", "mood-celebrate", "mood-point");
    els.staffDino.classList.add("mood-point");
    els.staffDino.src = dinoImages.point;
  }
  render();
  beginPracticeStepClock();
}

function startStaffCheckReplay() {
  state.staffSessionMode = "full";
  updateUrlForStaff();
  resetStaffCourse("check");
  if (els.staffFeedback) {
    els.staffFeedback.classList.remove("good", "bad");
    els.staffFeedback.textContent = "这次不亮目标键，自己看谱跳过去。";
  }
  if (els.dinoHint) els.dinoHint.textContent = "少提示复读：看谱位、读音名、自己找键。";
  if (els.modeHint) els.modeHint.textContent = "少提示复读：错了才会临时亮目标。";
}

function goLevel(delta) {
  clearAutoAdvance();
  state.levelIndex = Math.max(0, Math.min(levels.length - 1, state.levelIndex + delta));
  state.screen = "play";
  state.levelRunMode = "guided";
  updateUrlForLevel();
  resetLevel();
}

function goToLevelId(levelId) {
  const index = levels.findIndex((level) => level.id === levelId);
  if (index < 0) return;
  clearAutoAdvance();
  state.levelIndex = index;
  state.screen = "play";
  state.levelRunMode = "guided";
  updateUrlForLevel();
  resetLevel();
}

function updateUrlForLevel() {
  const level = activeLevel();
  history.replaceState(null, "", `?level=${level.id}${sessionUrlSuffix()}`);
}

function updateUrlForStaff() {
  const suffix = isMiniStaffSession() ? "&session=mini" : "";
  history.replaceState(null, "", `?mode=staff${suffix}${sessionUrlSuffix()}`);
}

function alpha(hex, opacity) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function brickGradient(hex) {
  return `linear-gradient(180deg, ${alpha(hex, 0.76)}, ${hex})`;
}

const MIC_DETECT_CONFIDENCE = 0.38;
const MIC_ACCEPT_CONFIDENCE = 0.52;
const MIC_ACCEPT_CENTS = 42;
const MIC_ANALYSIS_INTERVAL_MS = 48;
const MIC_STABLE_WINDOW_MS = 180;
const MIC_MIN_STABLE_FRAMES = 3;
const MIC_SIGNAL_RMS = 0.012;
const MIC_SILENCE_RMS = 0.008;
const MIC_SILENCE_REARM_MS = 140;

function createMicrophoneGate() {
  return {
    candidateMidi: null,
    candidateStartedAt: 0,
    candidateFrames: 0,
    lastAnalysisAt: 0,
    quietSince: 0,
    armed: true,
    acceptedMidi: null,
    lastUiKey: ""
  };
}

function resetMicrophoneCandidate(gate) {
  gate.candidateMidi = null;
  gate.candidateStartedAt = 0;
  gate.candidateFrames = 0;
}

function updateMicrophoneGate(audio, { now, rmsValue, detectedPitch }) {
  const gate = audio?.microphoneGate;
  if (!gate) return { state: "unavailable" };

  if (rmsValue < MIC_SILENCE_RMS) {
    if (!gate.quietSince) gate.quietSince = now;
    resetMicrophoneCandidate(gate);
    if (!gate.armed && now - gate.quietSince >= MIC_SILENCE_REARM_MS) {
      gate.armed = true;
      gate.acceptedMidi = null;
    }
    return { state: gate.armed ? "quiet" : "releasing" };
  }

  gate.quietSince = 0;
  if (!detectedPitch) {
    resetMicrophoneCandidate(gate);
    return { state: "uncertain" };
  }

  if (gate.candidateMidi !== detectedPitch.midi) {
    gate.candidateMidi = detectedPitch.midi;
    gate.candidateStartedAt = now;
    gate.candidateFrames = 1;
    return { state: "settling", detectedPitch };
  }

  gate.candidateFrames += 1;
  const stable =
    gate.candidateFrames >= MIC_MIN_STABLE_FRAMES &&
    now - gate.candidateStartedAt >= MIC_STABLE_WINDOW_MS;

  if (!gate.armed) return { state: "held", detectedPitch };
  if (!stable) return { state: "settling", detectedPitch };

  gate.armed = false;
  gate.acceptedMidi = detectedPitch.midi;
  resetMicrophoneCandidate(gate);
  return { state: "accepted", detectedPitch };
}

function setMicrophoneUi(audio, inputText, heardText) {
  const gate = audio?.microphoneGate;
  const uiKey = `${inputText}\u001f${heardText}`;
  if (gate?.lastUiKey === uiKey) return;
  if (gate) gate.lastUiKey = uiKey;
  if (els.inputStatus) els.inputStatus.textContent = inputText;
  if (els.heardStatus) els.heardStatus.textContent = heardText;
  refreshParentPanelIfOpen();
}

function microphonePitchFromFrequency(frequency, confidence) {
  if (confidence < MIC_ACCEPT_CONFIDENCE) return null;
  const pitch = frequencyToPitch(frequency);
  if (!pitch || Math.abs(pitch.cents) > MIC_ACCEPT_CENTS) return null;
  const note = noteForMidi(pitch.midi);
  return note && !isReservedNote(note) ? { ...pitch, note, confidence } : null;
}

async function toggleMicrophone() {
  if (state.audio?.running) {
    stopMicrophone();
    return;
  }

  if (!navigator.mediaDevices?.getUserMedia) {
    els.feedback.textContent = "这个浏览器不能打开麦克风。";
    return;
  }

  let stream = null;
  let ctx = null;
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false
      }
    });

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) throw new Error("AudioContext unavailable");
    ctx = new AudioContext();
    if (ctx.state === "suspended") await ctx.resume();
    const source = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 4096;
    analyser.smoothingTimeConstant = 0;
    source.connect(analyser);

    const samples = new Float32Array(analyser.fftSize);
    state.audio = {
      ctx,
      stream,
      analyser,
      samples,
      running: true,
      raf: null,
      microphoneGate: createMicrophoneGate()
    };
    els.micButton.classList.add("active");
    els.micButton.querySelector("span:last-child").textContent = "暂停听音";
    setMicrophoneUi(state.audio, "输入：麦克风听音", "听到：等待清楚单音");
    renderParentPanel();
    listenLoop();
  } catch (error) {
    stream?.getTracks?.().forEach((track) => track.stop());
    ctx?.close?.();
    els.feedback.textContent = "麦克风没有打开，检查浏览器权限。";
    renderParentPanel();
  }
}

function stopMicrophone() {
  if (!state.audio) return;
  const audio = state.audio;
  cancelAnimationFrame(audio.raf);
  audio.stream.getTracks().forEach((track) => track.stop());
  audio.ctx.close();
  state.audio.running = false;
  state.audio = null;
  els.micButton.classList.remove("active");
  els.micButton.querySelector("span:last-child").textContent = "开始听音";
  els.inputStatus.textContent = state.midiAccess ? "输入：MIDI" : "输入：屏幕琴键";
  els.heardStatus.textContent = "听到：-";
  renderParentPanel();
}

function listenLoop() {
  const audio = state.audio;
  if (!audio?.running) return;

  const now = performance.now();
  const gate = audio.microphoneGate;
  if (now - gate.lastAnalysisAt < MIC_ANALYSIS_INTERVAL_MS) {
    audio.raf = requestAnimationFrame(listenLoop);
    return;
  }
  gate.lastAnalysisAt = now;

  audio.analyser.getFloatTimeDomainData(audio.samples);
  const rmsValue = rms(audio.samples);
  if (rmsValue < MIC_SIGNAL_RMS) {
    const gateResult = updateMicrophoneGate(audio, { now, rmsValue, detectedPitch: null });
    if (state.screen === "garden" && gateResult.state !== "releasing") {
      const lesson = currentGardenLesson();
      if (lesson) releaseGardenInput(lesson.midi, "麦克风");
    }
    setMicrophoneUi(
      audio,
      "输入：麦克风听音",
      gateResult.state === "releasing" ? "听到：等琴音停一下" : "听到：等待清楚单音"
    );
    audio.raf = requestAnimationFrame(listenLoop);
    return;
  }

  const pitch = estimatePitch(audio.samples, audio.ctx.sampleRate);
  const detectedPitch = pitch
    ? microphonePitchFromFrequency(pitch.frequency, pitch.confidence)
    : null;
  const gateResult = updateMicrophoneGate(audio, { now, rmsValue, detectedPitch });

  if (!detectedPitch) {
    setMicrophoneUi(audio, "输入：麦克风试听", "听到：再弹清楚一点");
  } else if (gateResult.state === "accepted") {
    setMicrophoneUi(audio, "输入：麦克风", `听到：${detectedPitch.note.name}`);
    handleInput(detectedPitch.note.midi, "麦克风");
  } else if (gateResult.state === "held") {
    setMicrophoneUi(audio, "输入：麦克风听音", `听到：${detectedPitch.note.name} · 等琴音停一下`);
  } else {
    setMicrophoneUi(audio, "输入：麦克风试听", `听到：${detectedPitch.note.name} · 稳一稳`);
  }

  audio.raf = requestAnimationFrame(listenLoop);
}

function rms(samples) {
  let sum = 0;
  for (let index = 0; index < samples.length; index += 1) {
    sum += samples[index] * samples[index];
  }
  return Math.sqrt(sum / samples.length);
}

function estimatePitch(samples, sampleRate) {
  const minFrequency = 180;
  const maxFrequency = 540;
  const minLag = Math.max(1, Math.floor(sampleRate / maxFrequency));
  const maxLag = Math.min(Math.floor(samples.length / 2), Math.floor(sampleRate / minFrequency));
  let bestLag = 0;
  let bestScore = 0;

  for (let lag = minLag; lag <= maxLag; lag += 1) {
    let dot = 0;
    let leftEnergy = 0;
    let rightEnergy = 0;
    const limit = samples.length - lag;

    for (let index = 0; index < limit; index += 1) {
      const left = samples[index];
      const right = samples[index + lag];
      dot += left * right;
      leftEnergy += left * left;
      rightEnergy += right * right;
    }

    const denom = Math.sqrt(leftEnergy * rightEnergy);
    if (denom <= 0) continue;
    const score = dot / denom;
    if (score > bestScore) {
      bestScore = score;
      bestLag = lag;
    }
  }

  if (bestScore < MIC_DETECT_CONFIDENCE || bestLag <= 0) return null;
  return {
    frequency: sampleRate / bestLag,
    confidence: bestScore
  };
}

function frequencyToPitch(frequency) {
  if (!Number.isFinite(frequency) || frequency <= 0) return null;
  const midiFloat = 69 + 12 * Math.log2(frequency / 440);
  const midi = Math.round(midiFloat);
  return { midi, cents: (midiFloat - midi) * 100 };
}

function frequencyToMidi(frequency) {
  return frequencyToPitch(frequency)?.midi ?? null;
}

async function connectMIDI() {
  if (!navigator.requestMIDIAccess) {
    els.feedback.textContent = "这里还听不到 MIDI，先用屏幕琴键；麦克风只是可选试听。";
    els.midiButton.disabled = true;
    renderParentPanel();
    return;
  }

  try {
    const access = await navigator.requestMIDIAccess({ sysex: false });
    state.midiAccess = access;
    bindMIDIInputs(access);
    access.onstatechange = () => bindMIDIInputs(access);
    els.midiButton.classList.add("active");
    els.inputStatus.textContent = "输入：MIDI";
    els.feedback.textContent = "MIDI 准备好了，弹一个音。";
    renderParentPanel();
  } catch (error) {
    els.feedback.textContent = "MIDI 没有连接成功，检查浏览器权限或键盘连接。";
    renderParentPanel();
  }
}

function bindMIDIInputs(access) {
  const inputs = [...access.inputs.values()];
  if (inputs.length === 0) {
    els.feedback.textContent = "没有发现 MIDI 输入设备。";
    renderParentPanel();
    return;
  }

  for (const input of inputs) {
    input.onmidimessage = (message) => {
      const [status, note, velocity] = message.data;
      const command = status & 0xf0;
      const isNoteOn = command === 0x90 && velocity > 0;
      const isNoteOff = command === 0x80 || (command === 0x90 && velocity === 0);
      if (isNoteOn) handleInput(note, "MIDI");
      if (isNoteOff) releaseGardenInput(note, "MIDI");
    };
  }
}

function initSupportState() {
  if (!navigator.requestMIDIAccess) {
    els.midiButton.title = "当前浏览器不支持 Web MIDI";
  }
  renderParentPanel();
}

function unlockAudioFromGesture() {
  state.audioUnlocked = true;
}

function registerPwaShell() {
  if (!("serviceWorker" in navigator) || !window.isSecureContext) return;
  const register = () => {
    navigator.serviceWorker.register("./service-worker.js", { scope: "./" }).catch(() => {
      // The touch-first prototype remains playable when a browser disallows service workers.
    });
  };
  if (document.readyState === "complete") {
    register();
  } else {
    window.addEventListener("load", register, { once: true });
  }
}

document.addEventListener("pointerdown", unlockAudioFromGesture, { capture: true, passive: true });
document.addEventListener("keydown", (event) => {
  if (!event.metaKey && !event.ctrlKey && !event.altKey) unlockAudioFromGesture();
}, { capture: true });
els.micButton.addEventListener("click", toggleMicrophone);
els.midiButton.addEventListener("click", connectMIDI);
els.mapReturn.addEventListener("click", showMapScreen);
els.staffModeButton.addEventListener("click", () => {
  if (state.screen === "staff") {
    state.screen = "play";
    updateUrlForLevel();
    resetLevel();
  } else {
    showStaffScreen();
  }
});
els.mapShell.querySelectorAll(".map-node").forEach((node) => {
  node.addEventListener("click", () => {
    if (node.dataset.screen === "staff") {
      startSessionBundleFromMap(nextStaffBundleId(), staffCourse.id);
      return;
    }
    const bundle = sessionBundleForLevel(node.dataset.level);
    if (bundle) startSessionBundleFromMap(bundle.bundleId, node.dataset.level);
  });
});
els.gardenRestMarker?.addEventListener("click", startGardenFromMap);
els.listeningReplay?.addEventListener("click", () => {
  unlockChapter3AudioFromGesture();
  const attempt = ensureLs04Attempt();
  if (!attempt) return;
  if (!attempt.referencePlayed || attempt.phase === "reference-ready") playLs04Reference();
  else playLs04Target("child-replay");
});
els.mapParentGate.addEventListener("click", () => {
  openParentPanel();
});
els.playParentGate?.addEventListener("click", () => {
  openParentPanel();
});
els.parentClose.addEventListener("click", closeParentPanel);
els.parentModal.addEventListener("click", (event) => {
  if (event.target === els.parentModal) closeParentPanel();
});
els.parentMicButton.addEventListener("click", async () => {
  await toggleMicrophone();
  renderParentPanel();
});
els.parentMidiButton.addEventListener("click", async () => {
  await connectMIDI();
  renderParentPanel();
});
els.parentSoundToggle?.addEventListener("click", () => {
  const wasEnabled = state.audioSettings.enabled;
  setGameSoundEnabled(!wasEnabled);
  if (!wasEnabled) {
    playSoftNoiseHit({ gain: 0.009, duration: 0.12, frequency: 2800, q: 1.1 });
  }
});
els.parentVolumeControl?.addEventListener("input", (event) => {
  setGameSoundVolume(event.currentTarget.value);
});
els.parentVolumeControl?.addEventListener("change", () => {
  playSoftNoiseHit({ gain: 0.008, duration: 0.12, frequency: 3200, q: 1.15 });
});
els.parentMotionToggle?.addEventListener("click", () => {
  setParentReducedMotion(!state.motionSettings.reduced);
});
document.addEventListener("keydown", (event) => {
  if (!els.parentModal.hidden) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeParentPanel();
    } else if (event.key === "Tab") {
      trapModalFocus(els.parentModal, event);
    }
    return;
  }
  if (!els.resultModal.hidden) {
    if (event.key === "Escape") {
      event.preventDefault();
      els.modalNext.click();
    }
  }
});
els.targetNote.addEventListener("click", () => {
  if (isListeningLevel()) playListeningPrompt();
});
els.m03WheelReplay?.addEventListener("click", () => {
  if (isListeningLevel()) playListeningPrompt();
});
els.targetNote.addEventListener("keydown", (event) => {
  if (!isListeningLevel()) return;
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    playListeningPrompt();
  }
});
els.prevLevel.addEventListener("click", () => goLevel(-1));
els.resetLevel.addEventListener("click", resetLevel);
els.nextLevel.addEventListener("click", () => goLevel(1));
els.modalNext.addEventListener("click", () => {
  const resultKind = els.resultModal.dataset.result;
  clearAutoAdvance();
  hideResultModal();
  if (resultKind === "final") {
    els.feedback.textContent = "月球基地完成了！";
    els.nextAction.textContent = "全部完成，可以重来";
    return;
  }
  if (resultKind === "final-practice") {
    routeToFgPrep();
    return;
  }
  if (resultKind === "final-staff") {
    showStaffScreen();
    return;
  }
  if (resultKind === "level-check") {
    startLevelCheckReplay();
    return;
  }
  if (resultKind === "staff-practice") {
    routeToStaffRemediation();
    return;
  }
  if (resultKind === "staff-check") {
    startStaffCheckReplay();
    return;
  }
  if (resultKind === "staff-mini") {
    resetStaffCourse("guided");
    return;
  }
  if (resultKind === "staff" || state.screen === "staff") {
    resetStaffCourse("check");
    return;
  }
  goLevel(1);
});
els.resultModal.addEventListener("click", (event) => {
  if (event.target === els.resultModal) {
    event.preventDefault();
  }
});

initMotionPreferenceListener();
initContrastPreferenceListener();
applyMotionSettings();
applyContrastPreference();
initSupportState();
applyAudioSettings();
if (state.screen === "garden") {
  if (currentListeningAction()) {
    const attempt = ensureLs04Attempt();
    attempt.phase = attempt.referencePlayed ? "replay-ready" : "reference-ready";
    persistLs04Attempt();
  } else {
    restoreGardenPendingAttempt();
  }
}
render();
setInstructionFeedback();
startBootSequence();
registerPwaShell();
