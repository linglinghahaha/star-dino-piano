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
const chapter4WhiteMidis = [48, 50, 52, 53, 55, 57, 59, 60, 62, 64, 65, 67, 69, 71];
const chapter4BlackMidis = [49, 51, 54, 56, 58, 61, 63, 66, 68, 70];
const chapter4PitchNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const chapter4WhiteLocators = {
  C: "两黑键左边",
  D: "两黑键中间",
  E: "两黑键右边",
  F: "三黑键左边",
  G: "三黑键左中",
  A: "三黑键中间",
  B: "三黑键右边"
};

function chapter4NoteForMidi(midi) {
  const numeric = Number(midi);
  if (!Number.isInteger(numeric) || numeric < 48 || numeric > 71) return null;
  const pitchName = chapter4PitchNames[((numeric % 12) + 12) % 12];
  const isBlack = pitchName.includes("#");
  const name = isBlack ? null : pitchName;
  const octave = Math.floor(numeric / 12) - 1;
  return {
    midi: numeric,
    pitchName,
    name,
    octave,
    isBlack,
    frequency: 440 * (2 ** ((numeric - 69) / 12)),
    locator: isBlack ? `${octave === 3 ? "下面" : "上面"}一组黑键` : chapter4WhiteLocators[name]
  };
}

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

const chapter4CharacterAsset = gardenCharacterAssets.safeOpen;

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
const LS04_ASSISTED_WAIT_MS = 5200;
const LS05_ASSISTED_WAIT_MS = 5200;
const PAIRED_LISTENING_TARGET_PLAY_MS = 760;
const PAIRED_LISTENING_ASSISTED_WAIT_MS = 5200;
const PAIRED_LISTENING_GUIDE_WAIT_MS = 12000;
const LS08_PAIR_GAP_MS = 560;
const LS08_PAIR_PLAY_MS = 1320;
const LS08_NOTE_DURATION_MS = 500;
const LS08_REPAIR_GAP_MS = 180;
const LS08_ASSISTED_WAIT_MS = 5200;
const LS08_GUIDE_WAIT_MS = 12000;
const LP01_TARGET_PLAY_MS = 760;
const LP01_NOTE_DURATION_MS = 500;
const LP01_REPAIR_GAP_MS = 180;
const LP01_ASSISTED_WAIT_MS = 5200;
const LP01_LONG_WAIT_MS = 20000;
const LP02_ASSISTED_WAIT_MS = 5200;
const LP02_LONG_WAIT_MS = 20000;
const LP02_CHILD_NOTE_DURATION_MS = 440;
const LP02_EXTERNAL_INPUT_MAX_MS = 2400;
const chapter3Lessons = {
  LS01: { id: "LS01", midi: 60, letter: "C", solfege: "Do", locator: "两黑键左侧", leaf: 1, prompt: "打开第一片叶" },
  LS02: { id: "LS02", midi: 62, letter: "D", solfege: "Re", locator: "两黑键中间", leaf: 2, prompt: "伸直第二片叶" },
  LS03: { id: "LS03", midi: 64, letter: "E", solfege: "Mi", locator: "两黑键右侧", leaf: 3, prompt: "唤醒第三片叶", requiredInputs: 2 }
};

const pairedListeningConfigs = {
  LS06: {
    levelId: "LS06",
    bundleId: "C3-05",
    actionId: "LS06-listening",
    candidates: [60, 67],
    letters: ["C", "G"],
    solfege: ["Do", "Sol"],
    chapterKey: "ls06",
    chapterMode: "listening-echo",
    mapStrong: "回声藤",
    mapReady: "点这里听远远的回声",
    mapResume: "继续回声藤",
    progressLabel: "回声藤",
    reward: "回声藤拱门",
    parentFocus: "C/G 大距离声音比较 · 听后找键"
  },
  LS07: {
    levelId: "LS07",
    bundleId: "C3-06",
    actionId: "LS07-listening",
    candidates: [64, 65],
    letters: ["E", "F"],
    solfege: ["Mi", "Fa"],
    chapterKey: "ls07",
    chapterMode: "listening-boundary",
    mapStrong: "E/F 边界花",
    mapReady: "点这里听挨着的 E 和 F",
    mapResume: "继续解开边界花",
    progressLabel: "边界花",
    reward: "两株边界花",
    parentFocus: "E/F 相邻声音比较 · 键盘边界"
  }
};

const ls08Config = {
  levelId: "LS08",
  bundleId: "C3-07",
  actionId: "LS08-listening",
  candidates: [60, 62, 64],
  guideMidis: [60, 62],
  pairs: [[60, 62], [64, 62], [60, 60], [62, 64]],
  reward: "地底根系",
  parentFocus: "两个声音的先后记忆"
};

const chapter4Config = {
  bundleId: "C4-01",
  lp01: {
    levelId: "LP01",
    actionId: "LP01-register-listening",
    candidates: [48, 60],
    callCount: 4,
    parentFocus: "高低 C 声音比较"
  },
  lp02: {
    levelId: "LP02",
    actionId: "LP02-low-c-home",
    targetMidi: 48,
    parentFocus: "低音 C 键位"
  }
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
  },
  {
    bundleId: "C3-04",
    allowOpeningReview: false,
    actions: [
      { actionId: "LS05-listening", kind: "garden-listening", targetId: "LS05", runMode: "check", reviewableForMastery: true }
    ]
  },
  {
    bundleId: "C3-05",
    allowOpeningReview: false,
    actions: [
      { actionId: "LS06-listening", kind: "garden-listening", targetId: "LS06", runMode: "check", reviewableForMastery: true }
    ]
  },
  {
    bundleId: "C3-06",
    allowOpeningReview: false,
    actions: [
      { actionId: "LS07-listening", kind: "garden-listening", targetId: "LS07", runMode: "check", reviewableForMastery: true }
    ]
  },
  {
    bundleId: "C3-07",
    allowOpeningReview: false,
    actions: [
      { actionId: "LS08-listening", kind: "garden-listening", targetId: "LS08", runMode: "check", reviewableForMastery: true }
    ]
  },
  {
    bundleId: "C4-01",
    allowOpeningReview: false,
    actions: [
      { actionId: "LP01-register-listening", kind: "chapter4-listening", targetId: "LP01", runMode: "check", reviewableForMastery: true },
      { actionId: "LP02-low-c-home", kind: "chapter4-keyboard", targetId: "LP02", runMode: "guided", reviewableForMastery: false }
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
  if (isExplicitChapter4DirectMode(params)) return "chapter4";
  if (params.get("mode") === "staff") return "staff";
  if (params.get("screen") === "map") return "map";
  if (!params.get("level") && !window.location.hash) return "map";
  return "play";
}

function isExplicitChapter4DirectMode(params = new URLSearchParams(window.location.search)) {
  return params.get("mode") === "chapter4" &&
    params.get("directMode") === "true" &&
    params.get("formalSession") === "false" &&
    ["LP01", "LP02"].includes(params.get("lesson") || "LP01");
}

function initialChapter4DirectLesson() {
  const params = new URLSearchParams(window.location.search);
  return isExplicitChapter4DirectMode(params) ? (params.get("lesson") || "LP01") : null;
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

function normalizeChapter4Runtime(source = {}) {
  const lessonEvidence = source.lessonEvidence && typeof source.lessonEvidence === "object" ? source.lessonEvidence : {};
  return {
    completedSlice: Boolean(source.completedSlice && lessonEvidence.LP02?.completedAt),
    lessonEvidence,
    resume: source.resume && typeof source.resume === "object" ? source.resume : null,
    openingReviewQueue: Array.isArray(source.openingReviewQueue) ? source.openingReviewQueue : [],
    lp01Attempts: Array.isArray(source.lp01Attempts) ? source.lp01Attempts : [],
    lp02Attempts: Array.isArray(source.lp02Attempts) ? source.lp02Attempts : []
  };
}

function loadSessionRuntime() {
  try {
    const parsed = JSON.parse(localStorage.getItem(SESSION_RUNTIME_KEY) || "{}");
    const lessonEvidence = parsed.chapter3?.lessonEvidence && typeof parsed.chapter3.lessonEvidence === "object"
      ? parsed.chapter3.lessonEvidence
      : {};
    const ls04Completed = Boolean(lessonEvidence.LS04?.completedAt);
    const ls05Completed = Boolean(lessonEvidence.LS05?.completedAt);
    const ls06Completed = Boolean(lessonEvidence.LS06?.completedAt);
    const ls07Completed = Boolean(lessonEvidence.LS07?.completedAt);
    const ls08Completed = Boolean(lessonEvidence.LS08?.completedAt);
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
        completed: Boolean(parsed.chapter3?.completed && ls08Completed),
        ls04Completed,
        ls05Completed,
        ls05PartialRest: parsed.chapter3?.ls05PartialRest && typeof parsed.chapter3.ls05PartialRest === "object" ? parsed.chapter3.ls05PartialRest : null,
        ls06Completed,
        ls07Completed,
        ls08Completed,
        ls06PartialRest: parsed.chapter3?.ls06PartialRest && typeof parsed.chapter3.ls06PartialRest === "object" ? parsed.chapter3.ls06PartialRest : null,
        ls07PartialRest: parsed.chapter3?.ls07PartialRest && typeof parsed.chapter3.ls07PartialRest === "object" ? parsed.chapter3.ls07PartialRest : null,
        ls08PartialRest: parsed.chapter3?.ls08PartialRest && typeof parsed.chapter3.ls08PartialRest === "object" ? parsed.chapter3.ls08PartialRest : null,
        ls08GuideDifficultyStreak: Math.max(0, Number(parsed.chapter3?.ls08GuideDifficultyStreak) || 0),
        ls08RemediationRequired: Boolean(parsed.chapter3?.ls08RemediationRequired),
        visibleSliceCompleted: Boolean(parsed.chapter3?.visibleSliceCompleted || parsed.chapter3?.completed || lessonEvidence.LS03?.completedAt),
        ls04Attempts: Array.isArray(parsed.chapter3?.ls04Attempts) ? parsed.chapter3.ls04Attempts : [],
        ls05Attempts: Array.isArray(parsed.chapter3?.ls05Attempts) ? parsed.chapter3.ls05Attempts : [],
        ls06Attempts: Array.isArray(parsed.chapter3?.ls06Attempts) ? parsed.chapter3.ls06Attempts : [],
        ls07Attempts: Array.isArray(parsed.chapter3?.ls07Attempts) ? parsed.chapter3.ls07Attempts : [],
        ls08Attempts: Array.isArray(parsed.chapter3?.ls08Attempts) ? parsed.chapter3.ls08Attempts : []
      },
      chapter4: normalizeChapter4Runtime(parsed.chapter4)
    };
  } catch (error) {
    return {
      version: SESSION_RUNTIME_VERSION,
      active: null,
      history: [],
      lastRest: null,
      chapter3: { entryEventId: CH3_ENTRY_AIR_CHECK, equipmentState: "sealed", airCheckComplete: false, leaves: [false, false, false], lessonEvidence: {}, resume: null, ls03QualifiedInputs: 0, completed: false, ls04Completed: false, ls05Completed: false, ls06Completed: false, ls07Completed: false, ls08Completed: false, ls05PartialRest: null, ls06PartialRest: null, ls07PartialRest: null, ls08PartialRest: null, ls08GuideDifficultyStreak: 0, ls08RemediationRequired: false, visibleSliceCompleted: false, ls04Attempts: [], ls05Attempts: [], ls06Attempts: [], ls07Attempts: [], ls08Attempts: [] },
      chapter4: normalizeChapter4Runtime()
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
    assistedMode: false,
    audioAttempt: null
  };
}

const initialSessionRuntime = loadSessionRuntime();
const initialActiveSession = activeSessionFromUrl(initialSessionRuntime);
const initialActiveAction = initialActiveSession?.actions?.[initialActiveSession.actionIndex] || null;
const initialActiveSessionStartsOnMap = Boolean(initialActiveSession && isMapResumeLocation());
const initialDirectChapter4Lesson = initialChapter4DirectLesson();

const state = {
  screen: initialActiveAction && !initialActiveSessionStartsOnMap
    ? (initialActiveAction.kind === "staff"
      ? "staff"
      : (["garden", "garden-listening"].includes(initialActiveAction.kind)
        ? "garden"
        : (initialActiveAction.kind.startsWith("chapter4") ? "chapter4" : "play")))
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
  chapter4: initialSessionRuntime.chapter4,
  chapter4DirectMode: Boolean(initialDirectChapter4Lesson),
  chapter4DirectAction: null,
  chapter4RestView: null,
  gardenWrongCount: 0,
  gardenChildCorrectCount: 0,
  gardenChildInputs: [],
  gardenInputRoutes: {},
  gardenRepairStage: "none",
  gardenAssistedTimer: null,
  gardenLongWaitTimer: null,
  gardenModeledInputs: [],
  gardenAudioAttempt: null,
  gardenInputArmed: true,
  gardenAirTimer: null,
  gardenCompletionTimer: null,
  ls04Timer: null,
  ls04FeedbackTimer: null,
  ls05Timer: null,
  ls05FeedbackTimer: null,
  pairedListeningTimer: null,
  pairedListeningFeedbackTimer: null,
  ls08Timer: null,
  ls08FeedbackTimer: null,
  chapter4Timer: null,
  chapter4FeedbackTimer: null,
  teachingPlayback: null
};

if (initialDirectChapter4Lesson) {
  state.chapter4DirectAction = createDirectChapter4Action(initialDirectChapter4Lesson);
}

function persistLearningStatsSchemaUpgrade() {
  if (state.chapter4DirectMode) return;
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
  if (state.chapter4DirectMode) return;
  try {
    const raw = localStorage.getItem(SESSION_RUNTIME_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    const normalized = state.sessionRuntime;
    const staleChapterCompletion = Boolean(parsed.chapter3?.completed);
    if (staleChapterCompletion || !Array.isArray(parsed.chapter3?.ls04Attempts) || !Array.isArray(parsed.chapter3?.ls05Attempts) || !Array.isArray(parsed.chapter3?.ls06Attempts) || !Array.isArray(parsed.chapter3?.ls07Attempts) || !Array.isArray(parsed.chapter3?.ls08Attempts) || !Object.hasOwn(parsed.chapter3 || {}, "visibleSliceCompleted") || !Object.hasOwn(parsed.chapter3 || {}, "ls04Completed") || !Object.hasOwn(parsed.chapter3 || {}, "ls05Completed") || !Object.hasOwn(parsed.chapter3 || {}, "ls06Completed") || !Object.hasOwn(parsed.chapter3 || {}, "ls07Completed") || !Object.hasOwn(parsed.chapter3 || {}, "ls08Completed") || !Object.hasOwn(parsed.chapter3 || {}, "ls05PartialRest") || !Object.hasOwn(parsed.chapter3 || {}, "ls06PartialRest") || !Object.hasOwn(parsed.chapter3 || {}, "ls07PartialRest") || !Object.hasOwn(parsed.chapter3 || {}, "ls08PartialRest") || !parsed.chapter4 || !Array.isArray(parsed.chapter4.lp01Attempts) || !Array.isArray(parsed.chapter4.lp02Attempts)) {
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
  chapter4Panel: document.querySelector("#chapter4Panel"),
  chapter4Scene: document.querySelector("#chapter4Scene"),
  chapter4CaveRings: document.querySelector("#chapter4CaveRings"),
  chapter4SoundSource: document.querySelector("#chapter4SoundSource"),
  chapter4Bubbles: document.querySelector("#chapter4Bubbles"),
  chapter4Foundation: document.querySelector("#chapter4Foundation"),
  chapter4XingyaImage: document.querySelector("#chapter4XingyaImage"),
  chapter4Speech: document.querySelector("#chapter4Speech"),
  chapter4SpeechKicker: document.querySelector("#chapter4SpeechKicker"),
  chapter4SpeechMain: document.querySelector("#chapter4SpeechMain"),
  chapter4SpeechSupport: document.querySelector("#chapter4SpeechSupport"),
  chapter4Replay: document.querySelector("#chapter4Replay"),
  chapter4StartCheck: document.querySelector("#chapter4StartCheck"),
  chapter4VisualAssist: document.querySelector("#chapter4VisualAssist"),
  chapter4CallProgress: document.querySelector("#chapter4CallProgress"),
  chapter4Status: document.querySelector("#chapter4Status"),
  keyboardPanel: document.querySelector("#keyboardPanel"),
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
  ls05FlowerArc: document.querySelector("#ls05FlowerArc"),
  pairedListeningWorld: document.querySelector("#pairedListeningWorld"),
  pairedListeningLeft: document.querySelector("#pairedListeningLeft"),
  pairedListeningRight: document.querySelector("#pairedListeningRight"),
  pairedListeningLink: document.querySelector("#pairedListeningLink"),
  ls05Compare: document.querySelector("#ls05Compare"),
  listeningReplay: document.querySelector("#listeningReplay"),
  ls05VisualAssist: document.querySelector("#ls05VisualAssist"),
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

function midiFrequency(midi) {
  const normalized = Math.max(0, Math.min(127, Number(midi)));
  return 440 * (2 ** ((normalized - 69) / 12));
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
  const chapter4Level = currentChapter4ParentLevel();
  if (chapter4Level === "LP01") {
    const active = currentChapter4Action("LP01")?.chapter4Attempt;
    const stored = state.chapter4.lessonEvidence.LP01 || state.chapter4.lp01Attempts.at(-1);
    const summary = active || stored;
    return summary ? `声音首答 ${Number(summary.correctCount) || 0}/4 · 主动重听 ${Number(summary.replayCountChild) || 0} · 不限时` : "本轮未点泡泡 · 只记录不限时";
  }
  if (chapter4Level === "LP02") {
    const active = currentChapter4Action("LP02")?.chapter4Attempt;
    const stored = state.chapter4.lessonEvidence.LP02 || state.chapter4.lp02Attempts.at(-1);
    const summary = active || stored;
    return summary ? `低音 C 找家 · 路线 ${summary.firstInputRoute || summary.inputRoute || "未记录"} · 不限时` : "本轮未按键 · 只记录不限时";
  }
  const listeningLevel = currentListeningParentLevel();
  if (listeningLevel === "LS08") {
    const active = currentLs08Action()?.listeningAttempt;
    const stored = state.learningStats.levels.LS08?.lastAttempt;
    const summary = active || stored;
    return summary ? `首次完整回答 ${Number(summary.correctCount) || 0}/4 · 整组重听 ${Number(summary.replayCountChild) || 0} · 不限时` : "本轮未按键 · 只记录不限时";
  }
  if (["LS06", "LS07"].includes(listeningLevel)) {
    const config = pairedListeningConfig(listeningLevel);
    const active = currentPairedListeningAction(listeningLevel)?.listeningAttempt;
    const stored = state.learningStats.levels[listeningLevel]?.lastAttempt;
    const summary = active || stored;
    if (!summary) return "本轮未按键 · 只记录不限时";
    const correct = Number(summary.correctCount) || 0;
    const calls = active?.neutralProgress ?? summary.scoredCalls?.length ?? (summary.completed ? 4 : 0);
    return `首答 ${correct}/${Math.max(calls, active ? 4 : calls)} · 主动重听 ${Number(summary.replayCountChild) || 0} · ${config.letters.join("/")} 不限时`;
  }
  if (listeningLevel === "LS05") {
    const active = currentListeningAction("LS05")?.listeningAttempt;
    const stored = state.learningStats.levels.LS05?.lastAttempt;
    const summary = active || stored;
    if (!summary) return "本轮未按键 · 只记录不限时";
    const correct = Number(summary.correctCount) || 0;
    const calls = active?.neutralProgress ?? summary.scoredCalls?.length ?? (summary.completed ? 5 : 0);
    const replays = Number(summary.replayCountChild) || 0;
    return `首答 ${correct}/${Math.max(calls, active ? 5 : calls)} · 主动重听 ${replays} · 不限时`;
  }
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

function currentListeningParentLevel() {
  const active = currentListeningAction();
  if (active?.targetId === "LS08") return "LS08";
  if (active?.targetId === "LS07") return "LS07";
  if (active?.targetId === "LS06") return "LS06";
  if (active?.targetId === "LS05") return "LS05";
  if (active?.targetId === "LS04") return "LS04";
  if (state.screen !== "map") return null;
  if (state.chapter3.lessonEvidence.LS08?.completedAt || state.chapter3.ls08Attempts?.length || state.chapter3.resume?.nextTargetId === "LS08") return "LS08";
  if (state.chapter3.lessonEvidence.LS07?.completedAt || state.chapter3.ls07Attempts?.length || state.chapter3.resume?.nextTargetId === "LS07") return "LS07";
  if (state.chapter3.lessonEvidence.LS06?.completedAt || state.chapter3.ls06Attempts?.length || state.chapter3.resume?.nextTargetId === "LS06") return "LS06";
  if (state.chapter3.lessonEvidence.LS05?.completedAt || state.chapter3.ls05Attempts?.length || state.chapter3.resume?.nextTargetId === "LS05") return "LS05";
  if (state.chapter3.lessonEvidence.LS04?.completedAt || state.chapter3.ls04Attempts?.length) return "LS04";
  return null;
}

function usesLs04ParentEvidence() {
  return currentListeningParentLevel() === "LS04";
}

function usesLs05ParentEvidence() {
  return currentListeningParentLevel() === "LS05";
}

function usesPairedListeningParentEvidence() {
  return ["LS06", "LS07"].includes(currentListeningParentLevel());
}

function usesLs08ParentEvidence() {
  return currentListeningParentLevel() === "LS08";
}

function chapter4HasPendingLp01Review() {
  return state.chapter4.openingReviewQueue.includes("LP01");
}

function currentChapter4ParentLevel() {
  const active = currentChapter4Action();
  if (active?.targetId) return active.targetId;
  if (state.screen !== "map") return null;
  if (chapter4HasPendingLp01Review()) return "LP01";
  if (state.chapter4.resume?.nextTargetId === "LP02" || state.chapter4.lessonEvidence.LP02?.completedAt || state.chapter4.lp02Attempts.length) return "LP02";
  if (state.chapter4.lessonEvidence.LP01?.completedAt || state.chapter4.lp01Attempts.length) return "LP01";
  return null;
}

function currentEvidenceState() {
  const chapter4Level = currentChapter4ParentLevel();
  if (chapter4Level) {
    const stored = state.learningStats.levels[chapter4Level] || {};
    const skillKey = evidenceSkillKey("level", chapter4Level);
    const partial = chapter4Level === "LP01" ? state.chapter4.lessonEvidence.LP01 : null;
    return {
      played: (Number(stored.completions) || 0) > 0,
      stable: chapter4Level === "LP01" && ((Number(stored.stableCompletions) || 0) > 0 || state.learningStats.retention.stableEvents.some((event) => event.skillKey === skillKey)),
      retained: retainedEvidenceForSkill(skillKey),
      todayNeedsPractice: stored.todayNeedsPractice === true && stored.todayNeedsPracticeDate === localDateKeyAt(),
      lastWrongCount: Number(stored.lastWrongCount) || 0,
      mini: false,
      chapter4: true,
      chapter4Level,
      partial
    };
  }
  const listeningLevel = currentListeningParentLevel();
  if (listeningLevel) {
    const stored = state.learningStats.levels[listeningLevel] || {};
    const skillKey = evidenceSkillKey("level", listeningLevel);
    return {
      played: (Number(stored.completions) || 0) > 0,
      stable: (Number(stored.stableCompletions) || 0) > 0 || state.learningStats.retention.stableEvents.some((event) => event.skillKey === skillKey),
      retained: retainedEvidenceForSkill(skillKey),
      todayNeedsPractice: stored.todayNeedsPractice === true && stored.todayNeedsPracticeDate === localDateKeyAt(),
      lastWrongCount: Number(stored.lastWrongCount) || 0,
      mini: false,
      listening: true,
      ls04: listeningLevel === "LS04",
      ls05: listeningLevel === "LS05",
      ls08: listeningLevel === "LS08",
      paired: ["LS06", "LS07"].includes(listeningLevel),
      partialRest: listeningLevel === "LS05"
        ? state.chapter3.ls05PartialRest
        : (listeningLevel === "LS06" ? state.chapter3.ls06PartialRest : (listeningLevel === "LS07" ? state.chapter3.ls07PartialRest : (listeningLevel === "LS08" ? state.chapter3.ls08PartialRest : null)))
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
  if (evidence.chapter4Level === "LP01" && evidence.partial?.played === false) {
    return {
      ...evidence,
      status: "本次做到这里",
      detail: `本次真实完成 ${evidence.partial.resolvedCallCount || 0}/4；洞口由星芽帮助打开，高低比较待复习。不是绝对音感测试。`
    };
  }
  if (evidence.chapter4Level === "LP02") {
    return {
      ...evidence,
      status: evidence.played ? "在可见找家里玩过" : "正在找低音 C 的家",
      detail: evidence.played
        ? "低音 C 已在可见引导中找到家；之后还会在更少提示下再找一次。"
        : "低音 C 还要找家；先跟着可见引导完成这一步。"
    };
  }
  if (state.screen === "garden" && !evidence.listening) {
    return {
      ...evidence,
      status: evidence.played ? "完成本片叶的可见练习" : "正在认识名称与键位",
      detail: "本切片只记录可见提示下的学习过程，不写入稳定或隔日保留。"
    };
  }
  if (evidence.paired && evidence.partialRest) {
    return {
      ...evidence,
      status: "本次做到这里",
      detail: `保留 ${evidence.partialRest.neutralProgress || 0}/4 个中性故事格；今天需要提示。历史稳定与隔日保留记录不会被删除。`
    };
  }
  if (evidence.ls08 && evidence.partialRest) {
    return {
      ...evidence,
      status: "本次做到这里",
      detail: `保留 ${evidence.partialRest.neutralProgress || 0}/4 个中性根结；今天需要提示。历史稳定与隔日保留记录不会被删除。`
    };
  }
  if (evidence.ls05 && evidence.partialRest) {
    return {
      ...evidence,
      status: "本次做到这里",
      detail: `花粉环保留 ${evidence.partialRest.neutralProgress || 0}/5；今天需要提示。历史稳定与隔日保留记录不会被删除。`
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
  const chapter4Level = currentChapter4ParentLevel();
  if (chapter4Level === "LP01") {
    const active = currentChapter4Action("LP01")?.chapter4Attempt;
    const evidence = active || state.chapter4.lessonEvidence.LP01 || state.chapter4.lp01Attempts.at(-1) || {};
    const pendingReview = chapter4HasPendingLp01Review();
    const lp02Status = state.chapter4.lessonEvidence.LP02?.completedAt
      ? "低音 C 已在可见引导中找到家；这不会把高低 C 比较自动算作会了。"
      : state.chapter4.resume?.nextTargetId === "LP02"
      ? "低音 C 还要找家；高低 C 比较也会在以后再复习。"
      : "";
    return {
      focus: chapter4Config.lp01.parentFocus,
      detail: `四次首次泡泡选择 ${Number(evidence.correctCount) || 0}/4，真实呈现 ${Number(evidence.presentedCallCount) || 0}/4，真实解决 ${Number(evidence.resolvedCallCount) || 0}/4，孩子重听 ${Number(evidence.replayCountChild) || 0}，系统重播 ${Number(evidence.replayCountSystem) || 0}，强提示 ${evidence.strongCueUsed ? "有" : "无"}，示范带做 ${evidence.modeled ? "有" : "无"}，视觉帮助 ${evidence.accessibilityVisualAssist ? "有" : "无"}。${evidence.storyResolvedBySupport ? "洞口由星芽帮助打开，高低比较保留待复习。" : "这是已知两个 C 的高低比较，不是绝对音感测试。"}${pendingReview && lp02Status ? ` ${lp02Status}` : ""}`
    };
  }
  if (chapter4Level === "LP02") {
    const active = currentChapter4Action("LP02")?.chapter4Attempt;
    const evidence = active || state.chapter4.lessonEvidence.LP02 || state.chapter4.lp02Attempts.at(-1) || {};
    const reviewNote = chapter4HasPendingLp01Review()
      ? "高低 C 比较仍会在以后复习，不会因为这次找家自动算作会了。"
      : "这次是可见引导找家，之后还会在更少提示下再找一次。";
    return {
      focus: chapter4Config.lp02.parentFocus,
      detail: `要找的是低音 C；第一次按到 ${evidence.firstPitchName || evidence.firstChildMidi || "暂无"}，输入方式 ${evidence.firstInputRoute || evidence.inputRoute || "暂无"}，音名字母正确 ${evidence.noteNameCorrect ? "是" : "否"}，高低位置正确 ${evidence.registerCorrect ? "是" : "否"}，是否按到另一个 C ${evidence.wrongOctave ? "是" : "否"}，强提示 ${evidence.strongCueUsed ? "有" : "无"}，示范带做 ${evidence.modeled ? "有" : "无"}，麦克风尝试 ${evidence.experimentalInput ? evidence.microphoneConfidence || "有" : "无"}。${reviewNote}`
    };
  }
  if (usesLs08ParentEvidence()) {
    const active = currentLs08Action()?.listeningAttempt;
    const resume = state.chapter3.resume?.nextTargetId === "LS08" ? state.chapter3.resume.ls08Attempt : null;
    const last = state.learningStats.levels.LS08?.lastAttempt || state.chapter3.ls08Attempts?.at(-1) || {};
    const evidence = active || resume || last;
    const wrongPair = evidence.scoredPairs?.find((pair) => pair.firstCompleteChildResponse && !pair.qualifyingCorrect);
    const pairText = (midis) => (midis || []).map((midi) => noteForMidi(midi)?.name || midi).join("-");
    return {
      focus: ls08Config.parentFocus,
      detail: `四组首次完整回答 ${Number(evidence.correctCount) || 0}/4，孩子整组重听 ${Number(evidence.replayCountChild) || 0}，系统重播 ${Number(evidence.replayCountSystem) || 0}，分音重听 ${evidence.separateNoteReplayUsed ? "有" : "无"}，strong ${evidence.strongCueUsed ? "有" : "无"}，modeled ${evidence.modeled ? "有" : "无"}，麦克风 ${evidence.hasExperimentalInput ? "有" : "无"}，视觉帮助 ${evidence.accessibilityVisualAssist ? "有" : "无"}，主要错序 ${wrongPair ? `${pairText(wrongPair.targetMidis)} -> ${pairText(wrongPair.firstCompleteChildResponse)}` : "暂无"}。带路 ${evidence.guideRuns?.some((run) => run.completed) ? "完成" : "未完成"}，跨 session ${evidence.crossedSessionBoundary ? "是" : "否"}。这是两个声音的先后记忆，不是节奏、速度、低音或绝对音感。`
    };
  }
  if (usesPairedListeningParentEvidence()) {
    const levelId = currentListeningParentLevel();
    const config = pairedListeningConfig(levelId);
    const active = currentPairedListeningAction(levelId)?.listeningAttempt;
    const resume = state.chapter3.resume?.nextTargetId === levelId ? state.chapter3.resume.pairedAttempt : null;
    const attempts = state.chapter3[`${config.chapterKey}Attempts`] || [];
    const last = state.learningStats.levels[levelId]?.lastAttempt || attempts[attempts.length - 1] || {};
    const evidence = active || resume || last;
    const coverage = evidence.eligibleCoverage || {};
    const coverageText = config.letters.filter((name) => coverage[name]).join("/") || "暂无";
    const confusions = Object.entries(evidence.confusionCounts || {}).sort((a, b) => b[1] - a[1]);
    const mainConfusion = confusions[0]?.[0]?.split("-").map((midi) => noteForMidi(Number(midi))?.name).filter(Boolean).join("/") || "暂无";
    const identity = config.letters.map((letter, index) => `${letter} = ${config.solfege[index]}`).join("，");
    const boundary = levelId === "LS07"
      ? `本次先做过 E/F 可见边界带路 ${evidence.openingBoundaryGuideCompleted ? "是" : "否"}，隐藏作答后边界强帮助 ${evidence.postPromptBoundaryStrongHelpUsed ? "有" : "无"}，`
      : "";
    return {
      focus: config.parentFocus,
      detail: `${identity}；声音首答 ${Number(evidence.correctCount) || 0}/4，覆盖 ${coverageText}，孩子主动重听 ${Number(evidence.replayCountChild) || 0}，系统重听 ${Number(evidence.replayCountSystem) || 0}，主要混淆 ${mainConfusion}，${boundary}strong ${evidence.strongCueUsed ? "有" : "无"}，modeled ${evidence.modeled ? "有" : "无"}，麦克风 ${evidence.hasExperimentalInput ? "有" : "无"}，视觉帮助 ${evidence.accessibilityVisualAssist ? "有" : "无"}。${levelId === "LS06" ? "这是 C/G 已知声音比较，不是绝对音感或音区掌握。" : "可见黑键边界帮助与隐藏声音证据分开记录。"}`
    };
  }
  if (usesLs05ParentEvidence()) {
    const active = currentListeningAction("LS05")?.listeningAttempt;
    const resume = state.chapter3.resume?.nextTargetId === "LS05" ? state.chapter3.resume.ls05Attempt : null;
    const last = state.learningStats.levels.LS05?.lastAttempt || state.chapter3.ls05Attempts?.[state.chapter3.ls05Attempts.length - 1] || {};
    const evidence = active || resume || last;
    const coverage = evidence.eligibleCoverage || {};
    const coverageText = ["C", "D", "E"].filter((name) => coverage[name]).join("/") || "暂无";
    const confusions = Object.entries(evidence.confusionCounts || {}).sort((a, b) => b[1] - a[1]);
    const mainConfusion = confusions[0]?.[0]?.split("-").map((midi) => noteForMidi(Number(midi))?.name).filter(Boolean).join("/") || "暂无";
    return {
      focus: "C/D/E 小音组 · 听后找键",
      detail: `C = Do，D = Re，E = Mi；首答 ${Number(evidence.correctCount) || 0}/5，覆盖 ${coverageText}，孩子主动重听 ${Number(evidence.replayCountChild) || 0}，系统重听 ${Number(evidence.replayCountSystem) || 0}，主要混淆 ${mainConfusion}；strong ${evidence.strongCueUsed ? "有" : "无"}，modeled ${evidence.modeled ? "有" : "无"}，麦克风 ${evidence.hasExperimentalInput ? "有" : "无"}，视觉帮助 ${evidence.accessibilityVisualAssist ? "有" : "无"}。这是小音组听后找键，不是绝对音感测试。`
    };
  }
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

  if (state.screen === "chapter4") {
    renderChapter4Screen();
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
  document.body.classList.toggle("screen-chapter4", state.screen === "chapter4");
  if (state.auditMode) {
    document.body.dataset.audit = state.auditMode;
  } else {
    document.body.removeAttribute("data-audit");
  }
  if (els.mapShell) els.mapShell.hidden = state.screen !== "map";
  if (els.appShell) {
    els.appShell.hidden = state.screen === "map";
    els.appShell.classList.toggle("staff-mode", state.screen === "staff");
    els.appShell.classList.toggle("chapter4-mode", state.screen === "chapter4");
    if (state.screen !== "garden") delete els.appShell.dataset.chapter3;
    if (state.screen !== "chapter4") {
      delete els.appShell.dataset.chapter4Lesson;
      delete els.appShell.dataset.chapter4Phase;
      delete els.appShell.dataset.chapter4Formal;
    }
    if (state.auditMode) {
      els.appShell.dataset.audit = state.auditMode;
    } else {
      delete els.appShell.dataset.audit;
    }
  }
  if (els.staffPanel) els.staffPanel.hidden = state.screen !== "staff";
  if (els.gardenPanel) els.gardenPanel.hidden = state.screen !== "garden";
  if (els.chapter4Panel) els.chapter4Panel.hidden = state.screen !== "chapter4";
  document.querySelector(".build-panel")?.toggleAttribute("hidden", state.screen !== "play");
  document.querySelector(".practice-panel")?.toggleAttribute("hidden", state.screen !== "play");
  if (els.staffModeButton) {
    els.staffModeButton.textContent = state.screen === "staff" ? "月球基地" : "小恐龙跳";
  }
}

function renderMapScreen() {
  if (!els.mapShell) return;
  const gardenReached = hasReachedGardenEntrance();
  const chapter4Entrance = hasFormalChapter4EntranceEvidence();
  const activeChapter4 = state.activeSession?.status === "active" && state.activeSession.bundleId === chapter4Config.bundleId;
  const baseComplete = levels.every((level) => state.completed.has(level.id));
  const staffReadiness = fgBridgeReadiness();
  const shouldFocusStaff = !gardenReached && state.screen === "map" && baseComplete && !state.staffComplete && staffReadiness.ready;
  if (els.mapChapterLabel) {
    els.mapChapterLabel.textContent = chapter4Entrance ? "当前章节：地下回声洞" : (gardenReached ? "当前章节：呼吸花园" : "当前章节：月球基地");
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
        const ls05Done = Boolean(state.chapter3.ls05Completed || state.chapter3.lessonEvidence.LS05?.completedAt);
        if (!ls04Done) {
          const callCount = Math.min(4, listeningAttempt?.scoredCalls?.length || 0);
          const listeningState = activeGarden ? "正在听" : "准备";
          els.mapStarCount.textContent = `找朋友 ${callCount}/4 · ${listeningState}`;
          els.mapStarCount.setAttribute("aria-label", `呼吸花园声音配对进度：四个声音已完成 ${callCount} 个，${listeningState}`);
        } else {
          const lastLs05 = state.chapter3.resume?.ls05Attempt || state.chapter3.ls05Attempts?.[state.chapter3.ls05Attempts.length - 1];
          const callCount = ls05Done ? 5 : Math.min(5, listeningAttempt?.neutralProgress ?? lastLs05?.neutralProgress ?? lastLs05?.scoredCalls?.length ?? 0);
          const listeningState = ls05Done ? "休息" : (activeGarden ? "正在听" : (state.chapter3.resume?.nextTargetId === "LS05" ? "继续" : "准备"));
          els.mapStarCount.textContent = `花粉环 ${callCount}/5 · ${listeningState}`;
          els.mapStarCount.setAttribute("aria-label", `呼吸花园三音小集合进度：五个花粉格已完成 ${callCount} 个，${listeningState}`);
        }
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
  if (els.mapStarCount && gardenReached && state.chapter3.lessonEvidence.LS05?.completedAt) {
    const ls06Done = Boolean(state.chapter3.ls06Completed || state.chapter3.lessonEvidence.LS06?.completedAt);
    const ls07Done = Boolean(state.chapter3.ls07Completed || state.chapter3.lessonEvidence.LS07?.completedAt);
    const levelId = !ls06Done ? "LS06" : "LS07";
    const config = pairedListeningConfig(levelId);
    const listeningAttempt = currentPairedListeningAction(levelId)?.listeningAttempt;
    const attempts = state.chapter3[`${config.chapterKey}Attempts`] || [];
    const resumeAttempt = state.chapter3.resume?.nextTargetId === levelId ? state.chapter3.resume.pairedAttempt : null;
    const lastAttempt = attempts[attempts.length - 1];
    const done = levelId === "LS06" ? ls06Done : ls07Done;
    const callCount = done ? 4 : Math.min(4, listeningAttempt?.neutralProgress ?? resumeAttempt?.neutralProgress ?? lastAttempt?.scoredCalls?.length ?? 0);
    const listeningState = done ? "休息" : (listeningAttempt ? "正在听" : (state.chapter3.resume?.nextTargetId === levelId ? "继续" : "准备"));
    els.mapStarCount.textContent = `${config.progressLabel} ${callCount}/4 · ${listeningState}`;
    els.mapStarCount.setAttribute("aria-label", `${config.parentFocus}进度：四个故事格已完成 ${callCount} 个，${listeningState}`);
  }
  if (els.mapStarCount && gardenReached && state.chapter3.lessonEvidence.LS07?.completedAt) {
    const done = Boolean(state.chapter3.ls08Completed || state.chapter3.lessonEvidence.LS08?.completedAt);
    const activeAttempt = currentLs08Action()?.listeningAttempt;
    const resumeAttempt = state.chapter3.resume?.nextTargetId === "LS08" ? state.chapter3.resume.ls08Attempt : null;
    const lastAttempt = state.chapter3.ls08Attempts?.[state.chapter3.ls08Attempts.length - 1];
    const count = done ? 4 : Math.min(4, activeAttempt?.neutralProgress ?? resumeAttempt?.neutralProgress ?? lastAttempt?.scoredPairs?.length ?? 0);
    const listeningState = done ? "休息" : (activeAttempt ? "正在听" : (state.chapter3.resume?.nextTargetId === "LS08" ? "继续" : "准备"));
    els.mapStarCount.textContent = `两声根须 ${count}/4 · ${listeningState}`;
    els.mapStarCount.setAttribute("aria-label", `两个声音先后记忆进度：四个中性根结已完成 ${count} 个，${listeningState}`);
  }
  if (els.mapStarCount && chapter4Entrance) {
    const lp01Done = Boolean(state.chapter4.lessonEvidence.LP01?.completedAt || state.chapter4.lessonEvidence.LP01?.storyResolvedBySupport);
    const lp02Done = Boolean(state.chapter4.lessonEvidence.LP02?.completedAt);
    const action = activeChapter4 ? currentSessionAction(state.activeSession) : null;
    const attempt = action?.chapter4Attempt || state.chapter4.resume?.lp01Summary || state.chapter4.lp01Attempts.at(-1) || null;
    if (!lp01Done || action?.targetId === "LP01") {
      const resolved = Math.min(4, attempt?.resolvedCallCount ?? attempt?.scoredCalls?.length ?? 0);
      const listeningState = activeChapter4 ? "正在听" : (state.chapter4.resume ? "继续" : "准备");
      els.mapStarCount.textContent = `四次回声 ${resolved}/4 · ${listeningState}`;
      els.mapStarCount.setAttribute("aria-label", `地下回声洞进度：四次声音比较已解决 ${resolved} 次，${listeningState}`);
    } else {
      const homeState = lp02Done ? "休息" : (activeChapter4 ? "正在找" : (state.chapter4.resume ? "继续" : "准备"));
      els.mapStarCount.textContent = `低音 C 的家 · ${homeState}`;
      els.mapStarCount.setAttribute("aria-label", `地下回声洞低音 C 找家，${homeState}`);
    }
  }
  if (els.gardenRestMarker) {
    els.gardenRestMarker.hidden = !gardenReached;
    const chapter3Done = Boolean(state.chapter3.ls08Completed || state.chapter3.lessonEvidence.LS08?.completedAt);
    const activeGarden = state.activeSession?.status === "active" && state.activeSession.bundleId.startsWith("C3-");
    const waitingResume = Boolean(state.chapter3.resume?.nextTargetId);
    const markerCopy = chapter4Entrance
      ? chapter4MapMarkerCopy({ activeChapter4 })
      : gardenMapMarkerCopy({ chapter3Done, activeGarden, leafCount: state.chapter3.leaves.filter(Boolean).length });
    els.gardenRestMarker.disabled = chapter4Entrance ? Boolean(state.chapter4.completedSlice && !activeChapter4 && !state.chapter4.resume) : chapter3Done;
    els.gardenRestMarker.dataset.chapter3State = chapter3Done ? "complete" : ((activeGarden || waitingResume) ? "resume" : "ready");
    els.gardenRestMarker.dataset.chapter4State = chapter4Entrance
      ? (state.chapter4.completedSlice ? "complete" : ((activeChapter4 || state.chapter4.resume) ? "resume" : "entry"))
      : "locked";
    els.gardenRestMarker.setAttribute("aria-label", `${markerCopy.strong}，${markerCopy.small}`);
    const markerStrong = els.gardenRestMarker.querySelector("strong");
    const markerSmall = els.gardenRestMarker.querySelector("small");
    if (markerStrong) markerStrong.textContent = markerCopy.strong;
    if (markerSmall) markerSmall.textContent = markerCopy.small;
    if (gardenReached) els.gardenRestMarker.setAttribute("aria-current", "location");
    else els.gardenRestMarker.removeAttribute("aria-current");
  }
  els.mapShell.dataset.chapter4Phase = chapter4Entrance && !state.chapter4.completedSlice ? "chapter4-entry" : "locked";
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
        : mapRestDetailCopy(rest);
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

function chapter4MapMarkerCopy({ activeChapter4 = false } = {}) {
  if (state.chapter4.completedSlice) return { strong: "第一块地基", small: "低音 C 已经找到家" };
  if (activeChapter4) return { strong: "地下回声洞", small: "继续刚才的声音" };
  if (state.chapter4.resume?.nextTargetId === "LP02") return { strong: "低音 C 的家", small: "点这里继续找家" };
  return { strong: "地下入口", small: "点这里听两个声音泡泡" };
}

function mapRestDetailCopy(rest) {
  if (!rest) return "这一小段已经安顿好，地图可以慢慢选。";
  const completedReward = rest.bundleId === "C3-05"
    ? rest.reward === pairedListeningConfigs.LS06.reward
    : rest.bundleId === "C3-06" && rest.reward === pairedListeningConfigs.LS07.reward;
  if (completedReward && rest.bundleId === "C3-05") return "回声藤拱门已经搭好，边界花在等你。";
  if (completedReward && rest.bundleId === "C3-06") return "两株边界花已经安顿好，今天先歇一歇。";
  if (rest.bundleId === "C3-05") return "回声藤先歇一歇，刚才找到的声音都留着。";
  if (rest.bundleId === "C3-06") return "边界花先歇一歇，刚才找到的声音都留着。";
  if (rest.bundleId === "C3-07" && rest.reward === ls08Config.reward) return "根须已经连到地下，今天在入口歇一歇。";
  if (rest.bundleId === "C3-07") return "两声根须先歇一歇，已经长出的根结都留着。";
  if (rest.bundleId === "C4-01" && rest.reward === "第一块地基") return "低音 C 已经找到家，第一块地基稳稳落下。";
  if (rest.bundleId === "C4-01") return "发光洞口先歇一歇，已经听过的声音都留着。";
  return `${rest.reward || "这一小段"}已经安顿好，地图可以慢慢选。`;
}

function gardenMapMarkerCopy({ chapter3Done, activeGarden, leafCount }) {
  if (chapter3Done && state.chapter3.lessonEvidence.LS08?.completedAt) return { strong: "根须休息", small: "地底回声还没有完整安顿" };
  if (chapter3Done) return { strong: "三朵花", small: "花粉铃叫醒三朵花啦" };
  const activeTargetId = activeGarden ? currentSessionAction(state.activeSession)?.targetId : null;
  const resumeTargetId = state.chapter3.resume?.nextTargetId || null;
  const targetId = activeTargetId || resumeTargetId || (state.chapter3.lessonEvidence.LS07?.completedAt ? "LS08" : (state.chapter3.lessonEvidence.LS06?.completedAt ? "LS07" : (state.chapter3.lessonEvidence.LS05?.completedAt ? "LS06" : (state.chapter3.lessonEvidence.LS04?.completedAt ? "LS05" : (state.chapter3.lessonEvidence.LS03?.completedAt ? "LS04" : (leafCount >= 2 ? "LS03" : (leafCount >= 1 ? "LS02" : null)))))));
  if (targetId === "LS01") return { strong: "第一片叶", small: "继续第一片叶" };
  if (targetId === "LS02") return { strong: "第二片叶", small: "继续第二片叶" };
  if (targetId === "LS03") {
    return { strong: "第三片叶", small: activeGarden ? "继续第三片叶" : "点这里唤醒第三片叶" };
  }
  if (targetId === "LS04") {
    return { strong: "C/D 找朋友", small: activeGarden ? "继续听声音" : "点这里听种核" };
  }
  if (targetId === "LS06" || targetId === "LS07") {
    const config = pairedListeningConfig(targetId);
    return { strong: config.mapStrong, small: activeGarden || resumeTargetId === targetId ? config.mapResume : config.mapReady };
  }
  if (targetId === "LS08") {
    if (state.chapter3.ls08RemediationRequired) return { strong: "C/D 单音补教", small: "先把两个声音分别找稳" };
    return { strong: "两声根须", small: activeGarden || resumeTargetId === "LS08" ? "继续记两声" : "点这里听两声先后" };
  }
  if (targetId === "LS05") {
    return { strong: "三朵花", small: activeGarden || resumeTargetId === "LS05" ? "继续花粉铃" : "点这里叫醒三朵花" };
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
  if (!state.audioSettings.enabled) {
    interruptTeachingPianoSequence("audio-disabled");
    interruptActiveAudioAExternalInput("audio-disabled");
  }
}

function setGameSoundVolume(percent) {
  const normalized = Number(percent) / 100;
  if (!Number.isFinite(normalized)) return;
  state.audioSettings.volume = Math.min(AUDIO_VOLUME_CAP, Math.max(0, normalized));
  saveAudioSettings();
  applyAudioSettings();
  if (state.audioSettings.volume <= 0) {
    interruptTeachingPianoSequence("volume-muted");
    interruptActiveAudioAExternalInput("volume-muted");
  }
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
    const rows = state.screen === "garden" && !mastery.listening
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
    const chapter4Level = currentChapter4ParentLevel();
    if (chapter4Level === "LP01") {
      const activeAttempt = currentChapter4Action("LP01")?.chapter4Attempt;
      const stored = state.chapter4.lessonEvidence.LP01 || state.chapter4.lp01Attempts.at(-1);
      const count = Math.min(4, activeAttempt?.resolvedCallCount ?? stored?.resolvedCallCount ?? 0);
      els.parentProgressText.textContent = chapter4HasPendingLp01Review()
        ? `四次声音比较 ${count}/4 · 高低 C 待复习`
        : `四次声音比较 ${count}/4`;
    } else if (chapter4Level === "LP02") {
      els.parentProgressText.textContent = state.chapter4.lessonEvidence.LP02?.completedAt ? "低音 C 已找家" : "低音 C 找家中";
    } else if (usesLs08ParentEvidence()) {
      const activeAttempt = currentLs08Action()?.listeningAttempt;
      const resumeAttempt = state.chapter3.resume?.nextTargetId === "LS08" ? state.chapter3.resume.ls08Attempt : null;
      const lastAttempt = state.chapter3.ls08Attempts?.at(-1);
      const count = state.chapter3.lessonEvidence.LS08?.completedAt ? 4 : Math.min(4, activeAttempt?.neutralProgress ?? resumeAttempt?.neutralProgress ?? lastAttempt?.scoredPairs?.length ?? 0);
      els.parentProgressText.textContent = `两声根须 ${count}/4`;
    } else if (usesPairedListeningParentEvidence()) {
      const levelId = currentListeningParentLevel();
      const config = pairedListeningConfig(levelId);
      const activeAttempt = currentPairedListeningAction(levelId)?.listeningAttempt;
      const resumeAttempt = state.chapter3.resume?.nextTargetId === levelId ? state.chapter3.resume.pairedAttempt : null;
      const attempts = state.chapter3[`${config.chapterKey}Attempts`] || [];
      const lastAttempt = attempts[attempts.length - 1];
      const count = state.chapter3.lessonEvidence[levelId]?.completedAt
        ? 4
        : Math.min(4, activeAttempt?.neutralProgress ?? resumeAttempt?.neutralProgress ?? lastAttempt?.scoredCalls?.length ?? 0);
      els.parentProgressText.textContent = `${config.progressLabel} ${count}/4`;
    } else if (usesLs05ParentEvidence()) {
      const activeAttempt = currentListeningAction("LS05")?.listeningAttempt;
      const resumeAttempt = state.chapter3.resume?.nextTargetId === "LS05" ? state.chapter3.resume.ls05Attempt : null;
      const lastAttempt = state.chapter3.ls05Attempts?.[state.chapter3.ls05Attempts.length - 1];
      const count = state.chapter3.lessonEvidence.LS05?.completedAt
        ? 5
        : Math.min(5, activeAttempt?.neutralProgress ?? resumeAttempt?.neutralProgress ?? lastAttempt?.scoredCalls?.length ?? 0);
      els.parentProgressText.textContent = `C/D/E 三朵花 ${count}/5`;
    } else if (usesLs04ParentEvidence()) {
      const activeAttempt = currentListeningAction("LS04")?.listeningAttempt;
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
    const chapter4Level = currentChapter4ParentLevel();
    els.parentStaffState.textContent = chapter4Level === "LP01"
      ? (chapter4HasPendingLp01Review() ? "高低 C 比较待复习" : (state.chapter4.lessonEvidence.LP01?.played ? "四次声音比较已完成" : "四次声音比较进行中"))
      : chapter4Level === "LP02"
      ? (state.chapter4.lessonEvidence.LP02?.completedAt ? "第一块地基休息" : "低音 C 找家中")
      : usesLs08ParentEvidence()
      ? (state.chapter3.lessonEvidence.LS08?.completedAt ? "第三章故事休息" : "两声先后进行中")
      : usesPairedListeningParentEvidence()
      ? (state.chapter3.lessonEvidence[currentListeningParentLevel()]?.completedAt ? "当前切片休息" : "四次声音进行中")
      : usesLs05ParentEvidence()
      ? (state.chapter3.lessonEvidence.LS05?.completedAt ? "当前切片休息" : "花粉铃进行中")
      : usesLs04ParentEvidence()
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
    if (isAudioAM03Active()) {
      const attempt = ensureM03AudioAttempt();
      if (attempt?.phase === "awaiting-response") startM03Model(attempt, `idle-${stage}`);
      else if (attempt?.phase === "sound-paused") recoverAudioAAttempt();
    } else {
      playListeningPrompt();
    }
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
    pad.setAttribute("aria-label", `${step.label}，谱位${step.staffHint || ""}，音名 ${note.name}`);
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

const LS08_POINTER_CLICK_SUPPRESSION_MS = 1200;
const ls08PointerActivations = new Map();
const ls08PointerMidiByToken = new Map();
const ls08DocumentReleaseEvents = new WeakSet();
let ls08FallbackPointerToken = 0;

function ls08PointerToken(event, { createFallback = false } = {}) {
  const pointerId = Number(event?.pointerId);
  if (Number.isInteger(pointerId) && pointerId >= 0) return `pointer:${pointerId}`;
  if (!createFallback) return null;
  ls08FallbackPointerToken += 1;
  return `fallback:${ls08FallbackPointerToken}`;
}

function ensureLs08PointerActivation(midi) {
  let activation = ls08PointerActivations.get(midi);
  if (!activation) {
    activation = {
      activePointers: new Set(),
      pendingClicks: new Set(),
      cleanupTimer: null
    };
    ls08PointerActivations.set(midi, activation);
  }
  return activation;
}

function scheduleLs08PointerCleanup(midi, activation) {
  clearTimeout(activation.cleanupTimer);
  activation.cleanupTimer = setTimeout(() => {
    if (activation.activePointers.size) {
      scheduleLs08PointerCleanup(midi, activation);
      return;
    }
    activation.pendingClicks.clear();
    ls08PointerActivations.delete(midi);
  }, LS08_POINTER_CLICK_SUPPRESSION_MS);
}

function beginLs08PointerActivation(midi, event) {
  const activation = ensureLs08PointerActivation(midi);
  const token = ls08PointerToken(event, { createFallback: true });
  const startsNewKeyPress = activation.activePointers.size === 0;
  activation.activePointers.add(token);
  activation.pendingClicks.add(token);
  ls08PointerMidiByToken.set(token, midi);
  scheduleLs08PointerCleanup(midi, activation);
  return startsNewKeyPress;
}

function endLs08PointerActivation(midi, event) {
  const activation = ls08PointerActivations.get(midi);
  if (!activation) return { tracked: false, shouldRelease: false };
  const token = ls08PointerToken(event);
  if (!token || !activation.activePointers.delete(token)) {
    return { tracked: false, removed: false, shouldRelease: false };
  }
  ls08PointerMidiByToken.delete(token);
  scheduleLs08PointerCleanup(midi, activation);
  return { tracked: true, removed: true, shouldRelease: activation.activePointers.size === 0 };
}

function consumeLs08PointerClick(midi, event) {
  const activation = ls08PointerActivations.get(midi);
  if (!activation?.pendingClicks.size) return false;
  const token = ls08PointerToken(event);
  let pendingToken = null;
  if (token) {
    if (!activation.pendingClicks.has(token)) return false;
    pendingToken = token;
  } else if (Number(event?.detail) > 0) {
    pendingToken = activation.pendingClicks.values().next().value;
  }
  if (!pendingToken) return false;
  activation.pendingClicks.delete(pendingToken);
  scheduleLs08PointerCleanup(midi, activation);
  return true;
}

function clearAllLs08PointerActivations() {
  const activeMidis = [];
  for (const [midi, activation] of ls08PointerActivations) {
    if (activation.activePointers.size) activeMidis.push(midi);
    activation.activePointers.forEach((token) => ls08PointerMidiByToken.delete(token));
    activation.activePointers.clear();
    scheduleLs08PointerCleanup(midi, activation);
  }
  syncLs08RenderedPointerState();
  activeMidis.forEach((midi) => releaseGardenInput(midi, "屏幕"));
}

function releaseLs08PointerFromDocument(event) {
  const token = ls08PointerToken(event);
  const midi = token ? ls08PointerMidiByToken.get(token) : null;
  if (!Number.isFinite(midi)) return;
  const activation = endLs08PointerActivation(midi, event);
  if (!activation.removed) return;
  ls08DocumentReleaseEvents.add(event);
  syncLs08RenderedPointerState();
  if (activation.shouldRelease) releaseGardenInput(midi, "屏幕");
}

function ls08MidiHasActivePointer(midi) {
  return Boolean(ls08PointerActivations.get(midi)?.activePointers.size);
}

function syncLs08RenderedPointerState() {
  if (!els.keyboard) return;
  let hasActivePointer = false;
  els.keyboard.querySelectorAll(".white-key[data-midi], .black-key[data-midi]").forEach((key) => {
    const active = ls08MidiHasActivePointer(Number(key.dataset.midi));
    key.classList.toggle("pressed", active);
    hasActivePointer ||= active;
  });
  if (hasActivePointer) {
    els.keyboard.classList.remove("is-releasing");
    els.keyboard.classList.add("is-playing");
    return;
  }
  if (!els.keyboard.classList.contains("is-playing")) return;
  els.keyboard.classList.remove("is-playing");
  els.keyboard.classList.add("is-releasing");
  setTimeout(() => els.keyboard?.classList.remove("is-releasing"), 160);
}

const chapter4BubblePointerActivations = new Map();
const chapter4BubbleByPointerToken = new Map();
const chapter4BubbleDocumentReleaseEvents = new WeakSet();

function ensureChapter4BubblePointerActivation(bubbleId) {
  let activation = chapter4BubblePointerActivations.get(bubbleId);
  if (!activation) {
    activation = { activePointers: new Set(), pendingClicks: new Set(), cleanupTimer: null };
    chapter4BubblePointerActivations.set(bubbleId, activation);
  }
  return activation;
}

function scheduleChapter4BubblePointerCleanup(bubbleId, activation) {
  clearTimeout(activation.cleanupTimer);
  activation.cleanupTimer = setTimeout(() => {
    if (activation.activePointers.size) {
      scheduleChapter4BubblePointerCleanup(bubbleId, activation);
      return;
    }
    activation.pendingClicks.clear();
    chapter4BubblePointerActivations.delete(bubbleId);
  }, LS08_POINTER_CLICK_SUPPRESSION_MS);
}

function beginChapter4BubblePointerActivation(bubbleId, event) {
  const activation = ensureChapter4BubblePointerActivation(bubbleId);
  const token = ls08PointerToken(event, { createFallback: true });
  const startsNewPress = activation.activePointers.size === 0;
  activation.activePointers.add(token);
  activation.pendingClicks.add(token);
  chapter4BubbleByPointerToken.set(token, bubbleId);
  scheduleChapter4BubblePointerCleanup(bubbleId, activation);
  syncChapter4BubblePointerState();
  return startsNewPress;
}

function endChapter4BubblePointerActivation(bubbleId, event) {
  const activation = chapter4BubblePointerActivations.get(bubbleId);
  if (!activation) return { tracked: false, removed: false };
  const token = ls08PointerToken(event);
  if (!token || !activation.activePointers.delete(token)) return { tracked: false, removed: false };
  chapter4BubbleByPointerToken.delete(token);
  scheduleChapter4BubblePointerCleanup(bubbleId, activation);
  syncChapter4BubblePointerState();
  return { tracked: true, removed: true };
}

function consumeChapter4BubblePointerClick(bubbleId, event) {
  const activation = chapter4BubblePointerActivations.get(bubbleId);
  if (!activation?.pendingClicks.size) return false;
  const token = ls08PointerToken(event);
  let pendingToken = null;
  if (token && activation.pendingClicks.has(token)) pendingToken = token;
  else if (Number(event?.detail) > 0) pendingToken = activation.pendingClicks.values().next().value;
  if (!pendingToken) return false;
  activation.pendingClicks.delete(pendingToken);
  scheduleChapter4BubblePointerCleanup(bubbleId, activation);
  return true;
}

function syncChapter4BubblePointerState() {
  els.chapter4Bubbles?.querySelectorAll(".chapter4-bubble[data-bubble-id]").forEach((bubble) => {
    bubble.classList.toggle("pressed", Boolean(chapter4BubblePointerActivations.get(bubble.dataset.bubbleId)?.activePointers.size));
  });
}

function releaseChapter4BubblePointerFromDocument(event) {
  const token = ls08PointerToken(event);
  const bubbleId = token ? chapter4BubbleByPointerToken.get(token) : null;
  if (!bubbleId) return;
  const result = endChapter4BubblePointerActivation(bubbleId, event);
  if (result.removed) chapter4BubbleDocumentReleaseEvents.add(event);
}

function clearAllChapter4BubblePointerActivations() {
  for (const [bubbleId, activation] of chapter4BubblePointerActivations) {
    activation.activePointers.forEach((token) => chapter4BubbleByPointerToken.delete(token));
    activation.activePointers.clear();
    scheduleChapter4BubblePointerCleanup(bubbleId, activation);
  }
  syncChapter4BubblePointerState();
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
    key.setAttribute("aria-label", reserved ? `${note.name} 后面再学的琴键` : `${note.name}，${note.locator}`);
    key.style.setProperty("--key-index", index + 1);
    const part = activePart();
    const targetColor = options.targetColor || part?.color || note.color;
    const isTargetNote = Boolean(target) && !concealTargetIdentity && note.midi === target.midi;
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
      const isLs08Pointer = state.screen === "garden" && Boolean(currentLs08Action());
      const startsNewKeyPress = isLs08Pointer ? beginLs08PointerActivation(note.midi, event) : true;
      key.setPointerCapture?.(event.pointerId);
      let played = false;
      if (startsNewKeyPress) {
        beginKeyboardPress(key);
        showKeyPressRipple(key);
        // AUDIO-A owns the child echo so a screen press cannot schedule a raw note
        // before its verified input transaction begins on click/keyboard activation.
        if (!audioATeachingSurfaceIsActive() && !audioBTeachingSurfaceIsActive() && !audioCTeachingSurfaceIsActive()) {
          played = playPianoNote(note.frequency, { gain: 0.10, duration: 0.42 });
        }
      }
      if (isLs08Pointer) {
        if (played) traceLs08(ensureLs08Attempt(), "child-key", { reason: "pointer", midis: [note.midi], pairIndex: ensureLs08Attempt()?.pairIndex });
        handleInput(note.midi, "屏幕");
      }
      if (state.screen === "play" && !isListeningLevel() && activeLevel()?.id !== "M08") showKeyPressLabel(key, note);
    });
    key.addEventListener("pointerup", (event) => {
      if (ls08DocumentReleaseEvents.has(event)) return;
      const activation = endLs08PointerActivation(note.midi, event);
      if (activation.tracked && activation.removed) {
        syncLs08RenderedPointerState();
        if (activation.shouldRelease) releaseGardenInput(note.midi, "屏幕");
      } else if (!activation.tracked) {
        releaseKeyboardPress(key);
        releaseGardenInput(note.midi, "屏幕");
      }
    });
    key.addEventListener("pointerleave", () => {
      if (!ls08MidiHasActivePointer(note.midi)) releaseKeyboardPress(key);
    });
    key.addEventListener("pointercancel", (event) => {
      if (ls08DocumentReleaseEvents.has(event)) return;
      const activation = endLs08PointerActivation(note.midi, event);
      if (activation.tracked && activation.removed) {
        syncLs08RenderedPointerState();
        if (activation.shouldRelease) releaseGardenInput(note.midi, "屏幕");
      } else if (!activation.tracked) {
        releaseKeyboardPress(key);
        releaseGardenInput(note.midi, "屏幕");
      }
    });
    key.addEventListener("click", (event) => {
      if (consumeLs08PointerClick(note.midi, event)) return;
      if (state.screen === "garden" && currentLs08Action()) {
        beginKeyboardPress(key);
        showKeyPressRipple(key);
        const played = playPianoNote(note.frequency, { gain: 0.10, duration: 0.42 });
        if (played) traceLs08(ensureLs08Attempt(), "child-key", { reason: "accessible-click", midis: [note.midi], pairIndex: ensureLs08Attempt()?.pairIndex });
        handleInput(note.midi, "屏幕");
        releaseGardenInput(note.midi, "屏幕");
        releaseKeyboardPress(key);
        return;
      }
      handleInput(note.midi, "屏幕");
      if (state.screen === "garden" && currentPairedListeningAction()) {
        releaseGardenInput(note.midi, "屏幕");
      }
    });
    key.addEventListener("blur", () => {
      key.classList.remove("pressed");
      if (ls08PointerActivations.has(note.midi)) syncLs08RenderedPointerState();
      else releaseKeyboardPress(key);
    });
    els.keyboard.appendChild(key);
  });

  if (state.screen === "garden" && (currentLs08Action() || ls08PointerActivations.size)) syncLs08RenderedPointerState();

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
  if (state.screen === "chapter4") {
    handleChapter4Input(midi, source);
    return;
  }
  if (state.screen === "garden") {
    if (currentLs08Action()) handleLs08Input(midi, source);
    else if (currentListeningAction("LS04")) handleLs04Input(midi, source);
    else if (currentListeningAction("LS05")) handleLs05Input(midi, source);
    else if (currentPairedListeningAction()) handleAudioCPairedListeningInput(midi, source);
    else handleGardenInput(midi, source);
    return;
  }
  if (state.screen === "staff") {
    handleStaffInput(midi, source);
    return;
  }
  if (isAudioAM03Active()) {
    handleM03AudioInput(midi, source);
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
  if (state.screen === "chapter4") {
    releaseChapter4Input(midi, source);
    return;
  }
  if (isAudioAM03Active()) {
    releaseM03AudioInput(midi, source);
    return;
  }
  if (state.screen !== "garden") return;
  if (currentLs08Action()) {
    releaseLs08Input(midi, source);
    return;
  }
  if (currentListeningAction("LS04") || currentListeningAction("LS05")) {
    releaseAudioBInput(midi, source);
    return;
  }
  if (currentPairedListeningAction()) {
    releaseAudioCInput(midi, source);
    return;
  }
  if (currentListeningAction()) return;
  if (isAudioAGardenActive()) {
    releaseGardenAudioAInput(midi, source);
    return;
  }
  const lesson = currentGardenLesson();
  if (!lesson || lesson.midi !== midi) return;
  state.gardenInputArmed = true;
  if (els.gardenScene) els.gardenScene.dataset.inputArmed = "true";
}

function ls04FormalAttempt(attempt) {
  const session = state.activeSession;
  const action = currentListeningAction("LS04");
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
  const action = currentListeningAction("LS04");
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

function finishLs04Session({ completed, reason, returnQueued = false }) {
  const attempt = ensureLs04Attempt();
  if (!attempt) return;
  clearLs04Timers();
  if (completed) attempt.phase = "complete";
  if (returnQueued) markAudioBQueuedReturnConsumed(attempt, attempt.audioTransaction);
  persistLs04Attempt();
  recordLs04Outcome({ completed, reason });
  if (completed) renderGardenScreen();
  finishActiveSessionAtRest({ reward: completed ? "握手音符叶" : "听到这里", reason });
  state.ls04FeedbackTimer = setTimeout(() => {
    state.ls04FeedbackTimer = null;
    showMapScreen();
  }, returnQueued ? 0 : (completed ? 1450 : 850));
}

function scheduleLs04AssistedTimeout() {
  if (state.ls04Timer) clearTimeout(state.ls04Timer);
  state.ls04Timer = setTimeout(() => {
    state.ls04Timer = null;
    completeLs04Modeled("assisted-timeout");
  }, LS04_ASSISTED_WAIT_MS);
}

function settleLs04Modeled(attempt, targetMidi, reason, { targetAlreadyPlayed = false, returnQueued = false } = {}) {
  if (!audioBAttemptIsCurrent(attempt) || attempt.modeledInputs.some((input) => input.callIndex === attempt.callIndex)) return false;
  attempt.modeled = true;
  attempt.strongCueUsed = true;
  attempt.pendingModeled = null;
  attempt.phase = "modeled-success";
  attempt.modeledInputs.push({ source: "model", targetMidi, callIndex: attempt.callIndex, reason, completedAt: new Date().toISOString() });
  attempt.scoredCalls.push({ callIndex: attempt.callIndex, targetMidi, correct: false, modeled: true, wrongCount: attempt.callWrongCount });
  traceLs04Audio(attempt, "modeled", targetMidi, { reason, callIndex: attempt.callIndex, targetAlreadyPlayed });
  persistLs04Attempt();
  renderGardenScreen();
  finishLs04Session({ completed: false, reason: "modeled-safe-rest", returnQueued });
  return true;
}

function completeLs04Modeled(reason, { targetAlreadyPlayed = false, returnQueued = false } = {}) {
  const attempt = ensureLs04Attempt();
  const targetMidi = ls04Target(attempt);
  if (!attempt || targetMidi === null) return;
  if (attempt.modeledInputs.some((input) => input.callIndex === attempt.callIndex)) return;
  clearLs04Timers();
  if (targetAlreadyPlayed) {
    return settleLs04Modeled(attempt, targetMidi, reason, { targetAlreadyPlayed: true, returnQueued });
  }
  attempt.pendingModeled = { targetMidi, callIndex: attempt.callIndex, reason };
  return startAudioBTeachingSequence(attempt, {
    context: "modeled",
    kind: "modeled",
    reason,
    notes: [{ midi: targetMidi, durationMs: 720, delayMs: 0 }],
    payload: { targetMidi, callIndex: attempt.callIndex, reason },
    scheduledPhase: "modeled-scheduled",
    playingPhase: "modeled-playing",
    onEnded: (transaction, playback, { returnQueued: queued }) => {
      if (transaction.outcomeRecorded) return;
      transaction.outcomeRecorded = true;
      settleLs04Modeled(attempt, targetMidi, reason, { returnQueued: queued });
    }
  });
}

function commitLs04AudioBInput(attempt, pending, transaction, { returnQueued = false, external = false } = {}) {
  if (!audioBAttemptIsCurrent(attempt) || !audioBPendingMatchesCurrentCall(attempt, pending)) return false;
  const targetMidi = pending.targetMidi;
  const correct = pending.midi === targetMidi;
  clearLs04Timers();
  attempt.inputRoutes[pending.source] = (attempt.inputRoutes[pending.source] || 0) + 1;
  if (external) attempt.hasExperimentalInput = true;
  attempt.childInputs.push({
    midi: pending.midi,
    source: pending.source,
    targetMidi,
    correct,
    callIndex: pending.callIndex,
    occurredAt: pending.occurredAt,
    committedAt: new Date().toISOString(),
    external
  });
  recordAudioBInputPresentation(pending.midi, pending.source, correct);
  traceLs04Audio(attempt, "child-input", pending.midi, {
    callIndex: pending.callIndex,
    targetMidi,
    source: pending.source,
    frequency: noteForMidi(pending.midi)?.frequency || midiFrequency(pending.midi),
    external,
    playbackId: transaction?.playbackId || null
  });

  if (correct) {
    const firstAttemptCorrect = attempt.callWrongCount === 0;
    if (firstAttemptCorrect) attempt.correctCount += 1;
    attempt.scoredCalls.push({ callIndex: attempt.callIndex, targetMidi, inputMidi: pending.midi, correct: firstAttemptCorrect, wrongCount: attempt.callWrongCount, source: pending.source });
    attempt.callIndex += 1;
    attempt.callWrongCount = 0;
    attempt.supportStage = "none";
    attempt.phase = attempt.callIndex >= attempt.sequence.length ? "complete" : "correct-feedback";
    persistLs04Attempt();
    renderGardenScreen();
    if (attempt.callIndex >= attempt.sequence.length) {
      finishLs04Session({ completed: true, reason: "natural-rest", returnQueued });
      return true;
    }
    if (!returnQueued) {
      state.ls04FeedbackTimer = setTimeout(() => {
        state.ls04FeedbackTimer = null;
        if (audioBAttemptIsCurrent(attempt) && attempt.phase === "correct-feedback") playLs04Target("system-next");
      }, 620);
    }
    return true;
  }

  attempt.callWrongCount += 1;
  attempt.totalWrongCount += 1;
  if (attempt.callWrongCount >= 3) {
    attempt.strongCueUsed = true;
    attempt.supportStage = "assisted";
    attempt.targetRevealedBeforeResponse = true;
  }
  attempt.phase = attempt.supportStage === "assisted" ? "assisted" : "wrong-feedback";
  showInputEffect(pending.midi, "wrong", { showLabel: false });
  persistLs04Attempt();
  renderGardenScreen();
  const repair = startAudioBWrongRepair(attempt, pending);
  if (returnQueued && repair) handoffAudioBQueuedReturn(attempt, transaction);
  return Boolean(repair);
}

function handleLs04Input(midi, source) {
  const attempt = ensureLs04Attempt();
  if (!attempt || state.chapter3.equipmentState !== "safe-open") return;
  const retryingInterruptedExternalInput = attempt.phase === "sound-paused" &&
    (attempt.soundPauseContext || attempt.audioTransaction?.context) === "external-input";
  if (attempt.phase === "sound-paused") {
    if (!retryingInterruptedExternalInput || !recoverAudioBAttempt()) {
      if (source === "MIDI") recordAudioBMidiNoteOn(attempt, midi);
      recordAudioBObservation(attempt, midi, source);
      return;
    }
  }
  if (source === "MIDI") {
    const midiState = recordAudioBMidiNoteOn(attempt, midi);
    if (midiState.blocked) {
      recordAudioBObservation(attempt, midi, source, "held-midi");
      return;
    }
  }
  if (!audioBInputPhaseAllows(attempt) || !attempt.inputArmed) {
    recordAudioBObservation(attempt, midi, source);
    return;
  }
  beginAudioBInput(attempt, midi, source);
}

function ls05FormalAttempt(attempt) {
  const session = state.activeSession;
  const action = currentListeningAction("LS05");
  return {
    kind: "level",
    id: "LS05",
    runMode: "check",
    corrects: attempt.correctCount,
    wrongs: attempt.totalWrongCount,
    cueStrength: attempt.strongCueUsed || attempt.accessibilityVisualAssist ? "strong" : "soft",
    strongCueFrames: attempt.strongCueUsed || attempt.accessibilityVisualAssist ? 1 : 0,
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
    voluntaryReplay: attempt.replayCountChild > 0
  };
}

function ls05StableEligible(attempt, completed) {
  const coverage = attempt.eligibleCoverage || {};
  return Boolean(completed && attempt.correctCount >= 4 && coverage.C && coverage.D && coverage.E &&
    attempt.replayCountChild <= 1 && !attempt.targetRevealedBeforeResponse && !attempt.strongCueUsed &&
    !attempt.modeled && !attempt.hasExperimentalInput && !attempt.accessibilityVisualAssist &&
    !attempt.crossedSessionBoundary);
}

function recordLs05Outcome({ completed, reason }) {
  const session = state.activeSession;
  const action = currentListeningAction("LS05");
  const attempt = ensureLs05Attempt();
  if (!session || !action || !attempt || attempt.outcomeRecorded) return null;
  const completedAt = new Date().toISOString();
  const stable = ls05StableEligible(attempt, completed);
  const formalAttempt = ls05FormalAttempt(attempt);
  let stableAccepted = false;
  if (completed) {
    const existing = state.learningStats.levels.LS05 || {
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
    existing.lastResponse = `${attempt.correctCount}/5 首答正确`;
    existing.lastAttempt = {
      completedAt,
      completed,
      reason,
      correctCount: attempt.correctCount,
      wrongCount: attempt.totalWrongCount,
      eligibleCoverage: { ...attempt.eligibleCoverage },
      replayCountChild: attempt.replayCountChild,
      replayCountSystem: attempt.replayCountSystem,
      strongCueUsed: attempt.strongCueUsed,
      modeled: attempt.modeled,
      hasExperimentalInput: attempt.hasExperimentalInput,
      accessibilityVisualAssist: attempt.accessibilityVisualAssist,
      crossedSessionBoundary: attempt.crossedSessionBoundary,
      confusionCounts: { ...attempt.confusionCounts },
      inputRoutes: { ...attempt.inputRoutes }
    };
    const evidence = recordRetentionEvidence({
      kind: "level",
      id: "LS05",
      attempt: formalAttempt,
      stable,
      priorStableCompletions: 0,
      completedAt
    });
    stableAccepted = stable && evidence.clockValid === true;
    if (stableAccepted) existing.stableCompletions += 1;
    existing.needsPractice = !stableAccepted;
    existing.todayNeedsPractice = !stableAccepted;
    existing.todayNeedsPracticeDate = localDateKeyAt(completedAt);
    state.learningStats.levels.LS05 = existing;
    saveLearningStats();
  } else {
    const existing = state.learningStats.levels.LS05 || {
      completions: 0,
      formalCompletions: 0,
      stableCompletions: 0,
      needsPractice: false
    };
    existing.lastWrongCount = attempt.totalWrongCount;
    existing.lastRunMode = "check";
    existing.lastCueStrength = formalAttempt.cueStrength;
    existing.lastStrongCueFrames = formalAttempt.strongCueFrames;
    existing.lastInputRoutes = { ...attempt.inputRoutes };
    existing.lastExperimentalInput = attempt.hasExperimentalInput;
    existing.needsPractice = true;
    existing.todayNeedsPractice = true;
    existing.todayNeedsPracticeDate = localDateKeyAt(completedAt);
    existing.lastAttempt = {
      completedAt,
      completed: false,
      partialRest: true,
      reason,
      neutralProgress: attempt.neutralProgress,
      correctCount: attempt.correctCount,
      wrongCount: attempt.totalWrongCount,
      eligibleCoverage: { ...attempt.eligibleCoverage },
      replayCountChild: attempt.replayCountChild,
      replayCountSystem: attempt.replayCountSystem,
      strongCueUsed: attempt.strongCueUsed,
      modeled: attempt.modeled,
      hasExperimentalInput: attempt.hasExperimentalInput,
      accessibilityVisualAssist: attempt.accessibilityVisualAssist,
      crossedSessionBoundary: attempt.crossedSessionBoundary,
      confusionCounts: { ...attempt.confusionCounts },
      inputRoutes: { ...attempt.inputRoutes }
    };
    state.learningStats.levels.LS05 = existing;
    saveLearningStats();
    state.chapter3.ls05PartialRest = {
      createdAt: completedAt,
      sessionId: session.sessionId,
      reason,
      neutralProgress: attempt.neutralProgress,
      wrongCount: attempt.totalWrongCount,
      modeled: attempt.modeled,
      strongCueUsed: attempt.strongCueUsed,
      needsPractice: true
    };
  }

  const completion = {
    actionId: action.actionId,
    kind: "garden-listening",
    targetId: "LS05",
    runMode: "check",
    reviewableForMastery: true,
    completedAt,
    completed,
    reason,
    correctCount: attempt.correctCount,
    wrongCount: attempt.totalWrongCount,
    eligibleCoverage: { ...attempt.eligibleCoverage },
    stable: stableAccepted,
    retained: false,
    replayCountChild: attempt.replayCountChild,
    replayCountSystem: attempt.replayCountSystem,
    strongCueUsed: attempt.strongCueUsed,
    modeled: attempt.modeled,
    hasExperimentalInput: attempt.hasExperimentalInput,
    accessibilityVisualAssist: attempt.accessibilityVisualAssist,
    crossedSessionBoundary: attempt.crossedSessionBoundary,
    confusionCounts: { ...attempt.confusionCounts },
    inputRoutes: { ...attempt.inputRoutes },
    sequence: attempt.sequence.slice(),
    scoredCalls: attempt.scoredCalls.map((call) => ({ ...call }))
  };
  attempt.outcomeRecorded = true;
  session.completedActions.push(completion);
  state.chapter3.ls05Attempts.push({ ...completion, sessionId: session.sessionId });
  state.chapter3.ls05Attempts = state.chapter3.ls05Attempts.slice(-20);
  if (completed) {
    state.chapter3.completed = false;
    state.chapter3.ls05Completed = true;
    state.chapter3.ls05PartialRest = null;
    state.chapter3.resume = null;
    state.chapter3.lessonEvidence.LS05 = {
      completedAt,
      sessionId: session.sessionId,
      bundleId: session.bundleId,
      correctCount: attempt.correctCount,
      wrongCount: attempt.totalWrongCount,
      eligibleCoverage: { ...attempt.eligibleCoverage },
      stable: completion.stable,
      retained: false,
      strongCueUsed: attempt.strongCueUsed,
      modeled: attempt.modeled,
      hasExperimentalInput: attempt.hasExperimentalInput,
      accessibilityVisualAssist: attempt.accessibilityVisualAssist,
      crossedSessionBoundary: attempt.crossedSessionBoundary,
      reviewableForMastery: true
    };
  }
  persistChapter3Progress();
  persistLs05Attempt();
  return completion;
}

function finishLs05Session({ completed, reason, returnQueued = false }) {
  const attempt = ensureLs05Attempt();
  if (!attempt) return;
  clearLs05Timers();
  if (completed) attempt.phase = "complete";
  if (returnQueued) markAudioBQueuedReturnConsumed(attempt, attempt.audioTransaction);
  persistLs05Attempt();
  recordLs05Outcome({ completed, reason });
  if (completed) renderGardenScreen();
  finishActiveSessionAtRest({ reward: completed ? "三朵花开放" : "花粉环休息", reason });
  state.ls05FeedbackTimer = setTimeout(() => {
    state.ls05FeedbackTimer = null;
    showMapScreen();
  }, returnQueued ? 0 : (completed ? 1550 : 900));
}

function storeLs05Resume(attempt, reason) {
  const session = state.activeSession;
  state.chapter3.resume = {
    bundleId: "C3-04",
    nextTargetId: "LS05",
    endedSessionId: session?.sessionId || null,
    reason,
    createdAt: new Date().toISOString(),
    ls05Attempt: cloneLs05Attempt(attempt)
  };
  persistChapter3Progress();
}

function settleLs05Modeled(attempt, targetMidi, reason, { targetAlreadyPlayed = false, returnQueued = false } = {}) {
  if (!audioBAttemptIsCurrent(attempt) || attempt.modeledInputs.some((input) => input.callIndex === attempt.callIndex)) return false;
  attempt.modeled = true;
  attempt.strongCueUsed = true;
  attempt.targetRevealedBeforeResponse = true;
  attempt.callStrongCueUsed = true;
  attempt.callTargetRevealedBeforeResponse = true;
  attempt.pendingModeled = null;
  attempt.scoredCalls.push(ls05CallRecord(attempt, { targetMidi, modeled: true }));
  attempt.callIndex += 1;
  attempt.neutralProgress = attempt.callIndex;
  attempt.phase = "modeled-success";
  attempt.modeledInputs.push({ source: "model", targetMidi, callIndex: attempt.callIndex - 1, reason, completedAt: new Date().toISOString() });
  traceLs05Audio(attempt, "modeled", targetMidi, { reason, callIndex: attempt.callIndex - 1, targetAlreadyPlayed });
  persistLs05Attempt();
  renderGardenScreen();
  if (attempt.callIndex >= attempt.sequence.length) {
    finishLs05Session({ completed: true, reason: "modeled-final-safe-rest", returnQueued });
    return true;
  }
  storeLs05Resume(attempt, reason);
  finishLs05Session({ completed: false, reason: "modeled-safe-rest", returnQueued });
  return true;
}

function completeLs05Modeled(reason, { targetAlreadyPlayed = false, returnQueued = false } = {}) {
  const attempt = ensureLs05Attempt();
  const targetMidi = ls05Target(attempt);
  if (!attempt || targetMidi === null) return;
  if (attempt.modeledInputs.some((input) => input.callIndex === attempt.callIndex)) return;
  clearLs05Timers();
  if (targetAlreadyPlayed) {
    return settleLs05Modeled(attempt, targetMidi, reason, { targetAlreadyPlayed: true, returnQueued });
  }
  attempt.pendingModeled = { targetMidi, callIndex: attempt.callIndex, reason };
  return startAudioBTeachingSequence(attempt, {
    context: "modeled",
    kind: "modeled",
    reason,
    notes: [{ midi: targetMidi, durationMs: 720, delayMs: 0 }],
    payload: { targetMidi, callIndex: attempt.callIndex, reason },
    scheduledPhase: "modeled-scheduled",
    playingPhase: "modeled-playing",
    onEnded: (transaction, playback, { returnQueued: queued }) => {
      if (transaction.outcomeRecorded) return;
      transaction.outcomeRecorded = true;
      settleLs05Modeled(attempt, targetMidi, reason, { returnQueued: queued });
    }
  });
}

function resetLs05CallRepair(attempt) {
  attempt.callWrongCount = 0;
  attempt.callRepairStage = "none";
  attempt.callConfusionPair = [];
  attempt.assistedCueVisible = false;
  attempt.callFirstValidInput = null;
  attempt.callReplayCountChild = 0;
  attempt.callReplayCountSystem = 0;
  attempt.callTargetRevealedBeforeResponse = false;
  attempt.callStrongCueUsed = false;
  attempt.callExperimentalInput = false;
  attempt.callAccessibilityVisualAssist = false;
  attempt.callResponseStartedAt = null;
  attempt.callTimingInterrupted = false;
  attempt.callOutOfCandidateRepair = false;
  attempt.respondingFlower = null;
}

function ls05CallRecord(attempt, {
  targetMidi,
  inputMidi = null,
  source = null,
  firstResponseCorrect = false,
  modeled = false,
  visualAssist = false
} = {}) {
  const session = state.activeSession;
  return {
    levelId: "LS05",
    sessionId: session?.sessionId || null,
    bundleId: session?.bundleId || "C3-04",
    callIndex: attempt.callIndex,
    targetMidi,
    candidateMidis: [60, 62, 64],
    firstValidInput: attempt.callFirstValidInput ? { ...attempt.callFirstValidInput } : null,
    firstInputMidi: attempt.callFirstValidInput?.midi ?? null,
    firstInputRoute: attempt.callFirstValidInput?.source ?? null,
    inputRoute: attempt.callFirstValidInput?.source ?? source ?? null,
    inputMidi,
    source,
    qualifyingCorrect: Boolean(firstResponseCorrect),
    correct: Boolean(firstResponseCorrect),
    wrongCount: attempt.callWrongCount,
    repairStage: attempt.callRepairStage,
    childReplayCount: attempt.callReplayCountChild,
    systemReplayCount: attempt.callReplayCountSystem,
    targetRevealedBeforeResponse: Boolean(attempt.callTargetRevealedBeforeResponse),
    strongCueUsed: Boolean(attempt.callStrongCueUsed),
    modeled: Boolean(modeled),
    visualAssist: Boolean(visualAssist || attempt.callAccessibilityVisualAssist),
    accessibilityVisualAssist: Boolean(visualAssist || attempt.callAccessibilityVisualAssist),
    hasExperimentalInput: Boolean(attempt.callExperimentalInput),
    experimentalInput: Boolean(attempt.callExperimentalInput),
    microphoneConfidence: attempt.callExperimentalInput ? "confirmed" : null,
    responseMs: Number.isFinite(attempt.callFirstValidInput?.responseMs) ? attempt.callFirstValidInput.responseMs : null,
    timingInterrupted: Boolean(attempt.callTimingInterrupted),
    timingUsedForMastery: false
  };
}

function advanceLs05Call(attempt, { targetMidi, inputMidi, source, firstResponseCorrect, visualAssist = false, returnQueued = false }) {
  const targetName = noteForMidi(targetMidi)?.name;
  if (firstResponseCorrect) {
    attempt.correctCount += 1;
    if (source !== "麦克风" && attempt.callRepairStage === "none" && !visualAssist && targetName) {
      attempt.eligibleCoverage[targetName] = true;
    }
  }
  attempt.scoredCalls.push(ls05CallRecord(attempt, { targetMidi, inputMidi, source, firstResponseCorrect, visualAssist }));
  attempt.respondingFlower = targetName || null;
  attempt.callIndex += 1;
  attempt.neutralProgress = attempt.callIndex;
  attempt.phase = attempt.callIndex >= attempt.sequence.length ? "complete" : "correct-feedback";
  persistLs05Attempt();
  renderGardenScreen();
  if (attempt.callIndex >= attempt.sequence.length) {
    finishLs05Session({ completed: true, reason: visualAssist ? "visual-assist-complete" : "natural-rest", returnQueued });
    return;
  }
  resetLs05CallRepair(attempt);
  persistLs05Attempt();
  if (!returnQueued) {
    state.ls05FeedbackTimer = setTimeout(() => {
      state.ls05FeedbackTimer = null;
      if (audioBAttemptIsCurrent(attempt) && attempt.phase === "correct-feedback") playLs05Target("system-next");
    }, 720);
  }
}

function commitLs05AudioBInput(attempt, pending, transaction, { returnQueued = false, external = false } = {}) {
  if (!audioBAttemptIsCurrent(attempt) || !audioBPendingMatchesCurrentCall(attempt, pending)) return false;
  const targetMidi = pending.targetMidi;
  const visualAssist = pending.visualAssist === true;
  const correct = pending.midi === targetMidi;
  clearLs05Timers();
  attempt.inputRoutes[pending.source] = (attempt.inputRoutes[pending.source] || 0) + 1;
  if (!attempt.callFirstValidInput) {
    const responseStart = Date.parse(attempt.callResponseStartedAt || "");
    const responseMs = !attempt.callTimingInterrupted && Number.isFinite(responseStart) ? Math.max(0, Date.now() - responseStart) : null;
    attempt.callFirstValidInput = { midi: pending.midi, source: pending.source, occurredAt: pending.occurredAt, responseMs };
  }
  if (external) {
    attempt.hasExperimentalInput = true;
    attempt.callExperimentalInput = true;
  }
  attempt.childInputs.push({
    midi: pending.midi,
    source: pending.source,
    targetMidi,
    correct,
    scored: !visualAssist,
    callIndex: pending.callIndex,
    occurredAt: pending.occurredAt,
    committedAt: new Date().toISOString(),
    external
  });
  recordAudioBInputPresentation(pending.midi, pending.source, correct);
  traceLs05Audio(attempt, "child-input", pending.midi, {
    callIndex: pending.callIndex,
    targetMidi,
    source: pending.source,
    frequency: noteForMidi(pending.midi)?.frequency || midiFrequency(pending.midi),
    external,
    playbackId: transaction?.playbackId || null
  });

  if (visualAssist) {
    attempt.accessibilityVisualAssist = true;
    attempt.callAccessibilityVisualAssist = true;
    if (!correct) {
      persistLs05Attempt();
      renderGardenScreen();
      if (!returnQueued) armAudioBResponse(attempt);
      return true;
    }
    advanceLs05Call(attempt, {
      targetMidi,
      inputMidi: pending.midi,
      source: pending.source,
      firstResponseCorrect: false,
      visualAssist: true,
      returnQueued
    });
    return true;
  }

  if (correct) {
    const firstResponseCorrect = attempt.callWrongCount === 0;
    advanceLs05Call(attempt, {
      targetMidi,
      inputMidi: pending.midi,
      source: pending.source,
      firstResponseCorrect,
      returnQueued
    });
    return true;
  }

  attempt.callWrongCount += 1;
  attempt.totalWrongCount += 1;
  const confusionKey = [pending.midi, targetMidi].sort((a, b) => a - b).join("-");
  attempt.confusionCounts[confusionKey] = (attempt.confusionCounts[confusionKey] || 0) + 1;
  attempt.callConfusionPair = [pending.midi, targetMidi];
  const canShowChildPair = [60, 62, 64].includes(pending.midi) && pending.midi !== targetMidi;
  if (attempt.callWrongCount >= 4) {
    attempt.callRepairStage = "modeled";
    attempt.phase = "modeled-playing";
    attempt.pendingModeled = { callIndex: attempt.callIndex, targetMidi, reason: "assisted-retry-wrong", targetAlreadyPlayed: true };
  } else if (attempt.callWrongCount >= 2 && !canShowChildPair) {
    attempt.strongCueUsed = true;
    attempt.targetRevealedBeforeResponse = true;
    attempt.callStrongCueUsed = true;
    attempt.callTargetRevealedBeforeResponse = true;
    attempt.callOutOfCandidateRepair = true;
    attempt.callRepairStage = "candidate-outside";
    attempt.assistedCueVisible = true;
    attempt.phase = "assisted-retry";
  } else if (attempt.callWrongCount >= 3) {
    attempt.strongCueUsed = true;
    attempt.targetRevealedBeforeResponse = true;
    attempt.callStrongCueUsed = true;
    attempt.callTargetRevealedBeforeResponse = true;
    attempt.callRepairStage = "assisted";
    attempt.assistedCueVisible = true;
    attempt.phase = "assisted-retry";
  } else if (attempt.callWrongCount === 2) {
    attempt.callRepairStage = "pair-compare";
    attempt.phase = "pair-compare";
  } else {
    attempt.callRepairStage = "wrong-known";
    attempt.phase = "wrong-known";
  }
  showInputEffect(pending.midi, "wrong", { showLabel: false });
  persistLs05Attempt();
  renderGardenScreen();
  const repair = startAudioBWrongRepair(attempt, pending);
  if (returnQueued && repair) handoffAudioBQueuedReturn(attempt, transaction);
  return Boolean(repair);
}

function handleLs05Input(midi, source) {
  const attempt = ensureLs05Attempt();
  if (!attempt || state.chapter3.equipmentState !== "safe-open") return;
  const retryingInterruptedExternalInput = attempt.phase === "sound-paused" &&
    (attempt.soundPauseContext || attempt.audioTransaction?.context) === "external-input";
  if (attempt.phase === "sound-paused") {
    if (!retryingInterruptedExternalInput || !recoverAudioBAttempt()) {
      if (source === "MIDI") recordAudioBMidiNoteOn(attempt, midi);
      recordAudioBObservation(attempt, midi, source);
      return;
    }
  }
  if (source === "MIDI") {
    const midiState = recordAudioBMidiNoteOn(attempt, midi);
    if (midiState.blocked) {
      recordAudioBObservation(attempt, midi, source, "held-midi");
      return;
    }
  }
  if (!audioBInputPhaseAllows(attempt) || !attempt.inputArmed) {
    recordAudioBObservation(attempt, midi, source);
    return;
  }
  beginAudioBInput(attempt, midi, source);
}

function enableLs05VisualAssist() {
  const attempt = ensureLs05Attempt();
  if (!attempt) return;
  const responseReady = attempt.phase === "assisted-retry" && attempt.inputArmed &&
    !audioBPlaybackIsActive(attempt) && !audioBExternalInputIsActive(attempt);
  const allowed = responseReady || (attempt.phase === "sound-paused" && attempt.soundPauseCount >= 2);
  if (!allowed) return;
  clearLs05Timers();
  attempt.accessibilityVisualAssist = true;
  attempt.targetRevealedBeforeResponse = true;
  attempt.callAccessibilityVisualAssist = true;
  attempt.callTargetRevealedBeforeResponse = true;
  attempt.phase = "visual-assist";
  persistLs05Attempt();
  renderGardenScreen();
}

function currentPairedListeningAction(levelId = null) {
  const action = currentListeningAction(levelId);
  return action && pairedListeningConfigs[action.targetId] ? action : null;
}

function currentLs08Action() {
  const action = currentListeningAction("LS08");
  return action?.targetId === "LS08" ? action : null;
}

function pairedListeningConfig(levelId = currentPairedListeningAction()?.targetId) {
  return pairedListeningConfigs[levelId] || null;
}

function pairedSequenceForSeed(config, seed) {
  const [first, second] = config.candidates;
  const tables = [
    [first, second, first, second],
    [second, first, second, first],
    [first, first, second, second],
    [second, second, first, first]
  ];
  return tables[hashSessionSeed(seed) % tables.length].slice();
}

function clonePairedListeningAttempt(attempt) {
  return JSON.parse(JSON.stringify(attempt));
}

function resetPairedListeningCall(attempt) {
  attempt.callWrongCount = 0;
  attempt.callRepairStage = "none";
  attempt.callConfusionPair = [];
  attempt.assistedCueVisible = false;
  attempt.callFirstValidInput = null;
  attempt.callReplayCountChild = 0;
  attempt.callReplayCountSystem = 0;
  attempt.callTargetRevealedBeforeResponse = false;
  attempt.callStrongCueUsed = false;
  attempt.callExperimentalInput = false;
  attempt.callAccessibilityVisualAssist = false;
  attempt.callResponseStartedAt = null;
  attempt.callTimingInterrupted = false;
  attempt.callOutOfCandidateRepair = false;
  attempt.respondingCandidate = null;
  attempt.pendingInput = null;
  attempt.inputArmed = false;
  attempt.screenInputHeld = false;
}

function createPairedListeningAttempt(session = state.activeSession, resumeAttempt = null) {
  const action = session?.actions?.find((item) => pairedListeningConfigs[item.targetId]);
  const config = pairedListeningConfig(action?.targetId);
  if (!config) return null;
  if (resumeAttempt?.version === 1 && resumeAttempt.levelId === config.levelId && Array.isArray(resumeAttempt.sequence)) {
    const resumed = clonePairedListeningAttempt(resumeAttempt);
    resumed.phase = "guide-ready";
    resumed.guidePlayed = false;
    resumed.guideIndex = 0;
    resumed.guideWrongCount = 0;
    resumed.guideRepairStage = "none";
    resumed.pendingGuidePresentation = null;
    resumed.guideEvidence = [];
    resumed.openingBoundaryGuideCompleted = false;
    resumed.soundPauseContext = null;
    delete resumed.outcomeRecorded;
    resumed.originSessionId = resumed.originSessionId || resumed.seed || session?.resumeOfSessionId || "";
    resumed.resumedFromSessionId = session?.resumeOfSessionId || null;
    resumed.crossedSessionBoundary = true;
    resetPairedListeningCall(resumed);
    return resumed;
  }
  const seed = session?.sessionId || config.bundleId;
  return {
    version: 1,
    levelId: config.levelId,
    seed,
    originSessionId: seed,
    resumedFromSessionId: null,
    crossedSessionBoundary: false,
    sequence: pairedSequenceForSeed(config, seed),
    phase: "guide-ready",
    guidePlayed: false,
    guideIndex: 0,
    guideWrongCount: 0,
    guideRepairStage: "none",
    pendingGuidePresentation: null,
    guidedInputs: [],
    guideEvidence: [],
    guideRuns: [],
    guidedAudioTrace: [],
    openingBoundaryGuideCompleted: false,
    postPromptBoundaryStrongHelpUsed: false,
    soundPauseContext: null,
    soundPauseCount: 0,
    audioTransaction: null,
    pendingInput: null,
    inputArmed: false,
    guideInputArmed: false,
    screenInputHeld: false,
    midiHeldMidis: [],
    observations: [],
    audioLifecycle: [],
    callIndex: 0,
    scoredCalls: [],
    neutralProgress: 0,
    correctCount: 0,
    eligibleCoverage: Object.fromEntries(config.letters.map((letter) => [letter, false])),
    callWrongCount: 0,
    callRepairStage: "none",
    callConfusionPair: [],
    assistedCueVisible: false,
    callFirstValidInput: null,
    callReplayCountChild: 0,
    callReplayCountSystem: 0,
    callTargetRevealedBeforeResponse: false,
    callStrongCueUsed: false,
    callExperimentalInput: false,
    callAccessibilityVisualAssist: false,
    callResponseStartedAt: null,
    callTimingInterrupted: false,
    callOutOfCandidateRepair: false,
    totalWrongCount: 0,
    confusionCounts: {},
    childInputs: [],
    earlyInputs: [],
    inputRoutes: {},
    replayCountChild: 0,
    replayCountSystem: 0,
    soundPauseCount: 0,
    strongCueUsed: false,
    modeled: false,
    modeledInputs: [],
    hasExperimentalInput: false,
    accessibilityVisualAssist: false,
    targetRevealedBeforeResponse: false,
    respondingCandidate: null,
    audioTrace: []
  };
}

function ensurePairedListeningAttempt() {
  const action = currentPairedListeningAction();
  if (!action) return null;
  if (!action.listeningAttempt || action.listeningAttempt.version !== 1 || action.listeningAttempt.levelId !== action.targetId) {
    action.listeningAttempt = createPairedListeningAttempt(state.activeSession);
    persistActiveSession();
  }
  return ensureAudioCPairedAttemptState(action.listeningAttempt);
}

function persistPairedListeningAttempt() {
  if (currentPairedListeningAction()) persistActiveSession();
}

function clearPairedListeningTimers() {
  if (state.pairedListeningTimer) clearTimeout(state.pairedListeningTimer);
  if (state.pairedListeningFeedbackTimer) clearTimeout(state.pairedListeningFeedbackTimer);
  state.pairedListeningTimer = null;
  state.pairedListeningFeedbackTimer = null;
}

function ensureAudioCPairedAttemptState(attempt) {
  if (!attempt) return attempt;
  if (!Object.hasOwn(attempt, "audioTransaction")) attempt.audioTransaction = null;
  if (!Object.hasOwn(attempt, "guideTargetTransition")) attempt.guideTargetTransition = null;
  if (!Object.hasOwn(attempt, "pendingGuidePresentation")) attempt.pendingGuidePresentation = null;
  if (!Object.hasOwn(attempt, "pendingInput")) attempt.pendingInput = null;
  if (!Object.hasOwn(attempt, "inputArmed")) attempt.inputArmed = false;
  if (!Object.hasOwn(attempt, "guideInputArmed")) attempt.guideInputArmed = false;
  if (!Object.hasOwn(attempt, "screenInputHeld")) attempt.screenInputHeld = false;
  if (!Array.isArray(attempt.midiHeldMidis)) attempt.midiHeldMidis = [];
  if (!Array.isArray(attempt.observations)) attempt.observations = [];
  if (!Array.isArray(attempt.audioLifecycle)) attempt.audioLifecycle = [];
  if (!Object.hasOwn(attempt, "soundPauseCount")) attempt.soundPauseCount = 0;
  return attempt;
}

function currentAudioCAttempt() {
  const action = currentPairedListeningAction();
  return ensureAudioCPairedAttemptState(action?.listeningAttempt || null);
}

function audioCAttemptIsCurrent(attempt) {
  const action = currentPairedListeningAction();
  return Boolean(
    state.screen === "garden" &&
    action &&
    ["LS06", "LS07"].includes(action.targetId) &&
    action.listeningAttempt === attempt
  );
}

function audioCTeachingSurfaceIsActive() {
  return state.screen === "garden" && Boolean(currentPairedListeningAction());
}

function persistAudioCAttempt(attempt) {
  if (!audioCAttemptIsCurrent(attempt)) return;
  persistPairedListeningAttempt();
}

function renderAudioCAttempt(attempt) {
  if (!audioCAttemptIsCurrent(attempt)) return;
  renderGardenScreen();
}

function traceAudioCLifecycle(attempt, kind, transaction, extra = {}) {
  if (!attempt) return;
  attempt.audioLifecycle.push({
    kind,
    context: transaction?.context || null,
    sequenceKind: transaction?.kind || null,
    reason: transaction?.reason || null,
    midis: Array.isArray(transaction?.notes)
      ? transaction.notes.map((note) => note.midi).filter(Number.isFinite)
      : (Number.isFinite(transaction?.payload?.midi) ? [transaction.payload.midi] : []),
    playbackId: transaction?.playbackId || null,
    scheduledAt: transaction?.scheduledAt || null,
    startedAt: transaction?.startedAt || null,
    endedAt: transaction?.endedAt || null,
    interruptedAt: transaction?.interruptedAt || null,
    startAudioTime: transaction?.startAudioTime ?? null,
    endAudioTime: transaction?.endAudioTime ?? null,
    interruptedAudioTime: transaction?.interruptedAudioTime ?? null,
    contextState: transaction?.contextState || null,
    ...extra
  });
  attempt.audioLifecycle = attempt.audioLifecycle.slice(-96);
}

function audioCHeldMidiNotes(attempt) {
  if (!attempt) return [];
  const held = [...new Set((attempt.midiHeldMidis || [])
    .map((midi) => Number(midi))
    .filter(Number.isFinite))];
  attempt.midiHeldMidis = held;
  return held;
}

function recordAudioCMidiNoteOn(attempt, midi) {
  const note = Number(midi);
  const held = audioCHeldMidiNotes(attempt);
  if (!Number.isFinite(note)) return { blocked: false, wasHeld: false, hadHeld: held.length > 0 };
  const wasHeld = held.includes(note);
  const hadHeld = held.length > 0;
  if (!wasHeld) held.push(note);
  attempt.midiHeldMidis = held;
  return { blocked: wasHeld || hadHeld, wasHeld, hadHeld };
}

function releaseAudioCMidiNote(attempt, midi) {
  const note = Number(midi);
  if (!Number.isFinite(note)) return false;
  const held = audioCHeldMidiNotes(attempt);
  if (!held.includes(note)) return false;
  attempt.midiHeldMidis = held.filter((heldMidi) => heldMidi !== note);
  return true;
}

function clearAudioCStaleInputHolds(attempt) {
  if (!attempt) return false;
  const hadHeld = audioCHeldMidiNotes(attempt).length > 0 || attempt.screenInputHeld === true;
  attempt.midiHeldMidis = [];
  attempt.screenInputHeld = false;
  return hadHeld;
}

function audioCExternalInputIsActive(attempt) {
  const transaction = attempt?.audioTransaction;
  return Boolean(
    transaction?.context === "external-input" &&
    !transaction.endedAt &&
    !transaction.interruptedAt
  );
}

function audioCPlaybackIsActive(attempt) {
  const transaction = attempt?.audioTransaction;
  const playback = state.teachingPlayback;
  return Boolean(
    transaction &&
    !transaction.endedAt &&
    !transaction.interruptedAt &&
    transaction.playbackId &&
    playback?.id === transaction.playbackId &&
    ["scheduled", "playing"].includes(playback.status)
  );
}

function audioCResponsePhaseAllows(attempt) {
  return ["awaiting-response", "assisted-retry", "visual-assist"].includes(attempt?.phase);
}

function audioCInputCanBeArmed(attempt) {
  const transaction = attempt?.audioTransaction;
  return Boolean(
    audioCAttemptIsCurrent(attempt) &&
    audioCResponsePhaseAllows(attempt) &&
    !audioCExternalInputIsActive(attempt) &&
    !attempt.screenInputHeld &&
    audioCHeldMidiNotes(attempt).length === 0 &&
    (!transaction || Boolean(transaction.endedAt || transaction.interruptedAt))
  );
}

function audioCGuideInputCanBeArmed(attempt) {
  const transaction = attempt?.audioTransaction;
  return Boolean(
    audioCAttemptIsCurrent(attempt) &&
    attempt.phase === "visible-guide" &&
    !audioCExternalInputIsActive(attempt) &&
    !attempt.screenInputHeld &&
    audioCHeldMidiNotes(attempt).length === 0 &&
    Boolean(transaction?.endedAt)
  );
}

function setAudioCInputArmed(attempt, armed) {
  if (!attempt) return false;
  const next = Boolean(armed) && audioCInputCanBeArmed(attempt);
  attempt.inputArmed = next;
  if (audioCAttemptIsCurrent(attempt)) {
    state.gardenInputArmed = next;
    if (els.gardenScene) els.gardenScene.dataset.inputArmed = next ? "true" : "false";
  }
  return next;
}

function setAudioCGuideInputArmed(attempt, armed) {
  if (!attempt) return false;
  const next = Boolean(armed) && audioCGuideInputCanBeArmed(attempt);
  attempt.guideInputArmed = next;
  if (audioCAttemptIsCurrent(attempt)) {
    state.gardenInputArmed = next;
    if (els.gardenScene) els.gardenScene.dataset.inputArmed = next ? "true" : "false";
  }
  return next;
}

function armAudioCResponse(attempt) {
  const wasArmed = attempt?.inputArmed === true;
  const armed = setAudioCInputArmed(attempt, true);
  if (armed && wasArmed) return true;
  if (!armed) {
    persistAudioCAttempt(attempt);
    renderAudioCAttempt(attempt);
    return false;
  }
  if (attempt.phase === "assisted-retry") schedulePairedListeningAssistedTimeout();
  else schedulePairedListeningResponseTimeout();
  persistAudioCAttempt(attempt);
  renderAudioCAttempt(attempt);
  return true;
}

function armAudioCGuideInput(attempt) {
  const wasArmed = attempt?.guideInputArmed === true;
  const armed = setAudioCGuideInputArmed(attempt, true);
  if (armed && wasArmed) return true;
  if (!armed) {
    persistAudioCAttempt(attempt);
    renderAudioCAttempt(attempt);
    return false;
  }
  schedulePairedGuideTimeout();
  persistAudioCAttempt(attempt);
  renderAudioCAttempt(attempt);
  return true;
}

function recordAudioCObservation(attempt, midi, source, phase = attempt?.phase, extra = {}) {
  if (!attempt) return;
  attempt.observations.push({ midi, source, phase, occurredAt: new Date().toISOString(), ...extra });
  attempt.observations = attempt.observations.slice(-40);
  attempt.earlyInputs.push({ midi, source, phase, occurredAt: new Date().toISOString(), observation: true, ...extra });
  attempt.earlyInputs = attempt.earlyInputs.slice(-40);
  persistAudioCAttempt(attempt);
}

function writeAudioCTransaction(transaction, playback, field) {
  transaction.playbackId = playback.id;
  transaction.scheduledAt = playback.scheduledAt;
  transaction.startedAt = playback.startedAt;
  transaction.endedAt = playback.endedAt;
  transaction.interruptedAt = playback.interruptedAt;
  transaction.startAudioTime = playback.startAudioTime;
  transaction.endAudioTime = playback.endAudioTime;
  transaction.interruptedAudioTime = playback.interruptedAudioTime;
  transaction.contextState = playback.contextState;
  transaction.status = playback.status;
  if (field) transaction.lastLifecycleField = field;
}

function queueAudioCMapReturn(attempt) {
  if (!audioCPlaybackIsActive(attempt)) return false;
  attempt.audioTransaction.returnQueued = true;
  persistAudioCAttempt(attempt);
  renderAudioCAttempt(attempt);
  return true;
}

function markAudioCQueuedReturnConsumed(attempt, transaction = attempt?.audioTransaction) {
  if (!transaction?.returnQueued || transaction.returnQueuedConsumedAt) return false;
  transaction.returnQueued = false;
  transaction.returnQueuedConsumedAt = new Date().toISOString();
  traceAudioCLifecycle(attempt, "queued-return-consumed", transaction, {
    interruption: Boolean(transaction.interruptedAt)
  });
  persistAudioCAttempt(attempt);
  return true;
}

function consumeAudioCQueuedReturn(attempt, transaction = attempt?.audioTransaction) {
  if (!markAudioCQueuedReturnConsumed(attempt, transaction)) return false;
  setTimeout(() => {
    if (state.screen === "garden") showMapScreen();
  }, 0);
  return true;
}

function handoffAudioCQueuedReturn(attempt, transaction) {
  const successor = attempt?.audioTransaction;
  if (!transaction?.returnQueued || !successor || successor === transaction) return false;
  transaction.returnQueued = false;
  transaction.returnQueuedHandedOffAt = new Date().toISOString();
  successor.returnQueued = true;
  successor.returnQueuedFromPlaybackId = transaction.playbackId || null;
  persistAudioCAttempt(attempt);
  if (successor.interruptedAt) consumeAudioCQueuedReturn(attempt, successor);
  return true;
}

function enterAudioCSoundPause(attempt, context, reason = "audio-unavailable", { increment = true } = {}) {
  if (!attempt) return;
  clearPairedListeningTimers();
  const transaction = attempt.audioTransaction;
  const returnQueued = transaction?.returnQueued === true;
  if (increment) attempt.soundPauseCount += 1;
  if (transaction && !transaction.endedAt && !transaction.interruptedAt) {
    transaction.interruptedAt = new Date().toISOString();
    transaction.status = "interrupted";
  }
  attempt.soundPauseContext = context;
  attempt.phase = "sound-paused";
  setAudioCInputArmed(attempt, false);
  setAudioCGuideInputArmed(attempt, false);
  traceAudioCLifecycle(attempt, "interrupted", transaction, { interruptionReason: reason });
  persistAudioCAttempt(attempt);
  renderAudioCAttempt(attempt);
  if (returnQueued) consumeAudioCQueuedReturn(attempt, transaction);
}

function startAudioCTeachingSequence(attempt, {
  context,
  kind,
  reason,
  notes,
  payload = null,
  scheduledPhase,
  playingPhase,
  onStarted,
  onEnded,
  onInterrupted
} = {}) {
  if (!audioCAttemptIsCurrent(attempt) || !Array.isArray(notes) || notes.length === 0) return null;
  const normalizedNotes = notes
    .filter((note) => Number.isFinite(note?.midi))
    .map((note) => ({
      midi: Number(note.midi),
      delayMs: Math.max(0, Number(note.delayMs) || 0),
      durationMs: Math.max(1, Number(note.durationMs) || 720),
      child: Boolean(note.child)
    }));
  if (normalizedNotes.length === 0) return null;
  const transaction = {
    context,
    kind,
    reason,
    payload: payload ? JSON.parse(JSON.stringify(payload)) : null,
    notes: normalizedNotes,
    playbackId: null,
    scheduledAt: new Date().toISOString(),
    startedAt: null,
    endedAt: null,
    interruptedAt: null,
    startAudioTime: null,
    endAudioTime: null,
    interruptedAudioTime: null,
    contextState: "scheduled",
    status: "scheduled",
    returnQueued: false,
    returnQueuedConsumedAt: null,
    outcomeRecorded: false
  };
  attempt.audioTransaction = transaction;
  attempt.soundPauseContext = null;
  attempt.phase = scheduledPhase || `${context}-scheduled`;
  setAudioCInputArmed(attempt, false);
  setAudioCGuideInputArmed(attempt, false);
  persistAudioCAttempt(attempt);
  renderAudioCAttempt(attempt);

  const playback = playTeachingPianoSequence({
    reason: `audio-c-${context}:${reason}`,
    notes: normalizedNotes.map((note) => ({
      frequency: noteForMidi(note.midi)?.frequency || midiFrequency(note.midi),
      gain: note.child ? 0.10 : 0.13,
      durationMs: note.durationMs,
      delayMs: note.delayMs
    })),
    onStarted: (handle) => {
      if (!audioCAttemptIsCurrent(attempt) || attempt.audioTransaction !== transaction) return;
      writeAudioCTransaction(transaction, handle, "started");
      attempt.phase = playingPhase || scheduledPhase || `${context}-playing`;
      traceAudioCLifecycle(attempt, "started", transaction);
      onStarted?.(transaction, handle);
      persistAudioCAttempt(attempt);
      renderAudioCAttempt(attempt);
    },
    onEnded: (handle) => {
      if (!audioCAttemptIsCurrent(attempt) || attempt.audioTransaction !== transaction) return;
      writeAudioCTransaction(transaction, handle, "ended");
      traceAudioCLifecycle(attempt, "ended", transaction);
      persistAudioCAttempt(attempt);
      onEnded?.(transaction, handle, { returnQueued: transaction.returnQueued === true });
      if (!audioCAttemptIsCurrent(attempt) || attempt.audioTransaction !== transaction) return;
      persistAudioCAttempt(attempt);
      renderAudioCAttempt(attempt);
      consumeAudioCQueuedReturn(attempt, transaction);
    },
    onInterrupted: (handle, interruptionReason) => {
      if (!audioCAttemptIsCurrent(attempt) || attempt.audioTransaction !== transaction || transaction.endedAt) return;
      writeAudioCTransaction(transaction, handle, "interrupted");
      onInterrupted?.(transaction, handle, interruptionReason);
      enterAudioCSoundPause(attempt, context, `teaching-${interruptionReason}`);
    }
  });
  if (audioCAttemptIsCurrent(attempt) && attempt.audioTransaction === transaction) {
    transaction.playbackId ||= playback.id;
    transaction.scheduledAt = playback.scheduledAt || transaction.scheduledAt;
    transaction.status = playback.status;
    transaction.contextState = playback.contextState || transaction.contextState;
    persistAudioCAttempt(attempt);
  }
  return { playback, transaction };
}

function beginAudioCExternalInput(attempt, pending) {
  if (!audioCAttemptIsCurrent(attempt) || !pending) return false;
  clearPairedListeningTimers();
  const now = new Date().toISOString();
  attempt.pendingInput = { ...pending, acceptedAt: now };
  attempt.audioTransaction = {
    context: "external-input",
    kind: "external-input",
    reason: "microphone-onset",
    payload: { ...attempt.pendingInput },
    notes: [{ midi: pending.midi, delayMs: 0, durationMs: 0 }],
    playbackId: null,
    scheduledAt: now,
    startedAt: now,
    endedAt: null,
    interruptedAt: null,
    startAudioTime: null,
    endAudioTime: null,
    interruptedAudioTime: null,
    contextState: "external-input",
    status: "playing",
    returnQueued: false,
    returnQueuedConsumedAt: null,
    outcomeRecorded: false
  };
  attempt.soundPauseContext = null;
  attempt.phase = "external-input";
  setAudioCInputArmed(attempt, false);
  setAudioCGuideInputArmed(attempt, false);
  traceAudioCLifecycle(attempt, "started", attempt.audioTransaction, { external: true });
  persistAudioCAttempt(attempt);
  renderAudioCAttempt(attempt);
  return true;
}

function finishAudioCExternalInput(attempt, midi, source, commit) {
  const transaction = attempt?.audioTransaction;
  const pending = attempt?.pendingInput;
  if (!audioCAttemptIsCurrent(attempt) || attempt.phase !== "external-input" || !transaction || !pending) return false;
  if (pending.source !== source || (Number.isFinite(midi) && pending.midi !== midi)) return false;
  transaction.endedAt = new Date().toISOString();
  transaction.contextState = "external-input-quiet";
  transaction.status = "ended";
  transaction.outcomeRecorded = true;
  traceAudioCLifecycle(attempt, "ended", transaction, { external: true });
  commit(pending, transaction, { returnQueued: transaction.returnQueued === true, external: true });
  if (!audioCAttemptIsCurrent(attempt) || attempt.audioTransaction !== transaction) return true;
  persistAudioCAttempt(attempt);
  renderAudioCAttempt(attempt);
  consumeAudioCQueuedReturn(attempt, transaction);
  return true;
}

function interruptAudioCExternalInput(attempt, reason = "external-interrupted") {
  if (!audioCAttemptIsCurrent(attempt) || !audioCExternalInputIsActive(attempt)) return false;
  const transaction = attempt.audioTransaction;
  transaction.interruptedAt = new Date().toISOString();
  transaction.contextState = "external-input-interrupted";
  transaction.status = "interrupted";
  transaction.interruptReason = reason;
  enterAudioCSoundPause(attempt, "external-input", reason);
  return true;
}

function interruptActiveAudioCExternalInput(reason) {
  return interruptAudioCExternalInput(currentAudioCAttempt(), reason);
}

function normalizeAudioCAttemptForRecovery(attempt, { clearHeldInput = true } = {}) {
  if (!attempt) return attempt;
  if (clearHeldInput) clearAudioCStaleInputHolds(attempt);
  const transaction = attempt.audioTransaction;
  if (!transaction || transaction.endedAt || transaction.interruptedAt) return attempt;
  transaction.interruptedAt = new Date().toISOString();
  transaction.contextState = "recovered-without-active-playback";
  transaction.status = "interrupted";
  attempt.soundPauseContext = transaction.context || null;
  attempt.phase = "sound-paused";
  setAudioCInputArmed(attempt, false);
  setAudioCGuideInputArmed(attempt, false);
  traceAudioCLifecycle(attempt, "interrupted", transaction, { interruptionReason: "reload-without-active-playback" });
  return attempt;
}

function pairedListeningTarget(attempt = ensurePairedListeningAttempt()) {
  return attempt ? attempt.sequence[attempt.callIndex] ?? null : null;
}

function tracePairedListeningAudio(attempt, kind, midi, extra = {}) {
  attempt.audioTrace.push({ kind, midi, at: new Date().toISOString(), ...extra });
  attempt.audioTrace = attempt.audioTrace.slice(-60);
}

function pairedListeningFormalAttempt(attempt, config) {
  const session = state.activeSession;
  const action = currentPairedListeningAction(config.levelId);
  return {
    kind: "level",
    id: config.levelId,
    runMode: "check",
    corrects: attempt.correctCount,
    wrongs: attempt.totalWrongCount,
    cueStrength: attempt.strongCueUsed || attempt.accessibilityVisualAssist ? "strong" : "soft",
    strongCueFrames: attempt.strongCueUsed || attempt.accessibilityVisualAssist ? 1 : 0,
    inputRoutes: { ...attempt.inputRoutes },
    hasExperimentalInput: attempt.hasExperimentalInput,
    assistedSuccesses: attempt.strongCueUsed ? 1 : 0,
    modeledSuccesses: attempt.modeled ? 1 : 0,
    modeledInputs: attempt.modeledInputs.map((input) => ({ ...input })),
    formalSession: true,
    sessionId: session?.sessionId || null,
    bundleId: session?.bundleId || config.bundleId,
    sessionActionId: action?.actionId || config.actionId,
    localDateKey: session?.localDateKey || null,
    sessionRole: action?.role || "lesson",
    reviewSkillKey: null,
    requiredReview: false,
    sessionStartedAt: session?.startedAt || null,
    voluntaryReplay: attempt.replayCountChild > 0
  };
}

function pairedListeningStableEligible(attempt, config, completed) {
  const currentSessionGuide = attempt.guideRuns?.some((run) => run.completed && run.sessionId === state.activeSession?.sessionId);
  return Boolean(completed && currentSessionGuide && attempt.correctCount >= 3 && config.letters.every((letter) => attempt.eligibleCoverage?.[letter]) &&
    !attempt.targetRevealedBeforeResponse && !attempt.strongCueUsed && !attempt.modeled &&
    !attempt.hasExperimentalInput && !attempt.accessibilityVisualAssist && !attempt.crossedSessionBoundary);
}

function pairedListeningCallRecord(attempt, config, {
  targetMidi,
  inputMidi = null,
  source = null,
  firstResponseCorrect = false,
  modeled = false,
  visualAssist = false
} = {}) {
  const session = state.activeSession;
  return {
    levelId: config.levelId,
    phaseRole: "check",
    sessionId: session?.sessionId || null,
    bundleId: session?.bundleId || config.bundleId,
    callIndex: attempt.callIndex,
    targetMidi,
    candidateMidis: config.candidates.slice(),
    firstValidInput: attempt.callFirstValidInput ? { ...attempt.callFirstValidInput } : null,
    firstChildInputMidi: attempt.callFirstValidInput?.midi ?? null,
    firstInputMidi: attempt.callFirstValidInput?.midi ?? null,
    firstInputRoute: attempt.callFirstValidInput?.source ?? null,
    inputRoute: attempt.callFirstValidInput?.source ?? source ?? null,
    inputMidi,
    source,
    qualifyingCorrect: Boolean(firstResponseCorrect),
    correct: Boolean(firstResponseCorrect),
    wrongCount: attempt.callWrongCount,
    repairStage: attempt.callRepairStage,
    childReplayCount: attempt.callReplayCountChild,
    systemReplayCount: attempt.callReplayCountSystem,
    targetRevealedBeforeResponse: Boolean(attempt.callTargetRevealedBeforeResponse),
    strongCueUsed: Boolean(attempt.callStrongCueUsed),
    modeled: Boolean(modeled),
    accessibilityVisualAssist: Boolean(visualAssist || attempt.callAccessibilityVisualAssist),
    openingBoundaryGuideCompleted: config.levelId === "LS07" && Boolean(attempt.openingBoundaryGuideCompleted),
    postPromptBoundaryStrongHelpUsed: config.levelId === "LS07" && Boolean(attempt.callStrongCueUsed || visualAssist),
    experimentalInput: Boolean(attempt.callExperimentalInput),
    microphoneConfidence: attempt.callExperimentalInput ? "confirmed" : null,
    responseMs: Number.isFinite(attempt.callFirstValidInput?.responseMs) ? attempt.callFirstValidInput.responseMs : null,
    timingInterrupted: Boolean(attempt.callTimingInterrupted),
    timingUsedForMastery: false
  };
}

function recordPairedListeningOutcome({ completed, reason }) {
  const session = state.activeSession;
  const action = currentPairedListeningAction();
  const config = pairedListeningConfig(action?.targetId);
  const attempt = ensurePairedListeningAttempt();
  if (!session || !action || !config || !attempt || attempt.outcomeRecorded) return null;
  const completedAt = new Date().toISOString();
  const stable = pairedListeningStableEligible(attempt, config, completed);
  const formalAttempt = pairedListeningFormalAttempt(attempt, config);
  const existing = state.learningStats.levels[config.levelId] || { completions: 0, formalCompletions: 0, stableCompletions: 0, needsPractice: false };
  let stableAccepted = false;
  if (completed) {
    existing.completions = (Number(existing.completions) || 0) + 1;
    existing.formalCompletions = (Number(existing.formalCompletions) || 0) + 1;
    existing.lastCompletedAt = completedAt;
    existing.lastFormalCompletedAt = completedAt;
    const retention = recordRetentionEvidence({ kind: "level", id: config.levelId, attempt: formalAttempt, stable, priorStableCompletions: 0, completedAt });
    stableAccepted = stable && retention.clockValid === true;
    if (stableAccepted) existing.stableCompletions = (Number(existing.stableCompletions) || 0) + 1;
  }
  existing.lastWrongCount = attempt.totalWrongCount;
  existing.lastRunMode = "check";
  existing.lastCueStrength = formalAttempt.cueStrength;
  existing.lastStrongCueFrames = formalAttempt.strongCueFrames;
  existing.lastInputRoutes = { ...attempt.inputRoutes };
  existing.lastExperimentalInput = attempt.hasExperimentalInput;
  existing.needsPractice = completed ? !stableAccepted : true;
  existing.todayNeedsPractice = completed ? !stableAccepted : true;
  existing.todayNeedsPracticeDate = localDateKeyAt(completedAt);
  existing.lastResponse = `${attempt.correctCount}/4 首答正确`;
  existing.lastAttempt = {
    completedAt,
    completed,
    partialRest: !completed,
    reason,
    neutralProgress: attempt.neutralProgress,
    correctCount: attempt.correctCount,
    wrongCount: attempt.totalWrongCount,
    eligibleCoverage: { ...attempt.eligibleCoverage },
    replayCountChild: attempt.replayCountChild,
    replayCountSystem: attempt.replayCountSystem,
    strongCueUsed: attempt.strongCueUsed,
    modeled: attempt.modeled,
    hasExperimentalInput: attempt.hasExperimentalInput,
    accessibilityVisualAssist: attempt.accessibilityVisualAssist,
    guideRuns: attempt.guideRuns.map((run) => ({ ...run, evidence: run.evidence?.map((item) => ({ ...item })) || [] })),
    openingBoundaryGuideCompleted: attempt.openingBoundaryGuideCompleted,
    postPromptBoundaryStrongHelpUsed: attempt.postPromptBoundaryStrongHelpUsed,
    crossedSessionBoundary: attempt.crossedSessionBoundary,
    confusionCounts: { ...attempt.confusionCounts },
    inputRoutes: { ...attempt.inputRoutes }
  };
  state.learningStats.levels[config.levelId] = existing;
  saveLearningStats();

  const completion = {
    actionId: action.actionId,
    kind: "garden-listening",
    targetId: config.levelId,
    runMode: "check",
    reviewableForMastery: true,
    completedAt,
    completed,
    reason,
    correctCount: attempt.correctCount,
    wrongCount: attempt.totalWrongCount,
    eligibleCoverage: { ...attempt.eligibleCoverage },
    stable: stableAccepted,
    retained: false,
    replayCountChild: attempt.replayCountChild,
    replayCountSystem: attempt.replayCountSystem,
    strongCueUsed: attempt.strongCueUsed,
    modeled: attempt.modeled,
    hasExperimentalInput: attempt.hasExperimentalInput,
    accessibilityVisualAssist: attempt.accessibilityVisualAssist,
    guideRuns: attempt.guideRuns.map((run) => ({ ...run, evidence: run.evidence?.map((item) => ({ ...item })) || [] })),
    openingBoundaryGuideCompleted: attempt.openingBoundaryGuideCompleted,
    postPromptBoundaryStrongHelpUsed: attempt.postPromptBoundaryStrongHelpUsed,
    crossedSessionBoundary: attempt.crossedSessionBoundary,
    confusionCounts: { ...attempt.confusionCounts },
    inputRoutes: { ...attempt.inputRoutes },
    sequence: attempt.sequence.slice(),
    scoredCalls: attempt.scoredCalls.map((call) => ({ ...call }))
  };
  attempt.outcomeRecorded = true;
  session.completedActions.push(completion);
  const attemptsKey = `${config.chapterKey}Attempts`;
  state.chapter3[attemptsKey].push({ ...completion, sessionId: session.sessionId });
  state.chapter3[attemptsKey] = state.chapter3[attemptsKey].slice(-20);
  if (completed) {
    state.chapter3.completed = false;
    state.chapter3[`${config.chapterKey}Completed`] = true;
    state.chapter3[`${config.chapterKey}PartialRest`] = null;
    state.chapter3.resume = null;
    state.chapter3.lessonEvidence[config.levelId] = {
      completedAt,
      sessionId: session.sessionId,
      bundleId: session.bundleId,
      correctCount: attempt.correctCount,
      wrongCount: attempt.totalWrongCount,
      eligibleCoverage: { ...attempt.eligibleCoverage },
      stable: stableAccepted,
      retained: false,
      strongCueUsed: attempt.strongCueUsed,
      modeled: attempt.modeled,
      hasExperimentalInput: attempt.hasExperimentalInput,
      accessibilityVisualAssist: attempt.accessibilityVisualAssist,
      guideRuns: attempt.guideRuns.map((run) => ({ ...run, evidence: run.evidence?.map((item) => ({ ...item })) || [] })),
      openingBoundaryGuideCompleted: attempt.openingBoundaryGuideCompleted,
      postPromptBoundaryStrongHelpUsed: attempt.postPromptBoundaryStrongHelpUsed,
      crossedSessionBoundary: attempt.crossedSessionBoundary,
      reviewableForMastery: true
    };
  } else {
    state.chapter3[`${config.chapterKey}PartialRest`] = {
      createdAt: completedAt,
      sessionId: session.sessionId,
      reason,
      neutralProgress: attempt.neutralProgress,
      wrongCount: attempt.totalWrongCount,
      modeled: attempt.modeled,
      strongCueUsed: attempt.strongCueUsed,
      guideRuns: attempt.guideRuns.map((run) => ({ ...run, evidence: run.evidence?.map((item) => ({ ...item })) || [] })),
      openingBoundaryGuideCompleted: attempt.openingBoundaryGuideCompleted,
      postPromptBoundaryStrongHelpUsed: attempt.postPromptBoundaryStrongHelpUsed,
      needsPractice: true
    };
  }
  persistChapter3Progress();
  persistPairedListeningAttempt();
  return completion;
}

function storePairedListeningResume(attempt, config, reason) {
  const session = state.activeSession;
  state.chapter3.resume = {
    bundleId: config.bundleId,
    nextTargetId: config.levelId,
    endedSessionId: session?.sessionId || null,
    reason,
    createdAt: new Date().toISOString(),
    pairedAttempt: clonePairedListeningAttempt(attempt)
  };
  persistChapter3Progress();
}

function finishPairedListeningSession({ completed, reason, returnQueued = false } = {}) {
  const attempt = ensurePairedListeningAttempt();
  const config = pairedListeningConfig(attempt?.levelId);
  if (!attempt || !config) return;
  clearPairedListeningTimers();
  if (completed) {
    attempt.phase = "complete";
    state.lastInputMidi = null;
    state.lastInputResult = null;
  }
  persistPairedListeningAttempt();
  recordPairedListeningOutcome({ completed, reason });
  if (returnQueued) markAudioCQueuedReturnConsumed(attempt, attempt.audioTransaction);
  if (completed) renderGardenScreen();
  finishActiveSessionAtRest({ reward: completed ? config.reward : `${config.progressLabel}休息`, reason });
  state.pairedListeningFeedbackTimer = setTimeout(() => {
    state.pairedListeningFeedbackTimer = null;
    showMapScreen();
  }, returnQueued ? 0 : (completed ? 1550 : 900));
}

function settlePairedListeningModeled(attempt, config, targetMidi, reason, { targetAlreadyPlayed = false, returnQueued = false } = {}) {
  if (!audioCAttemptIsCurrent(attempt) || !config || targetMidi === null || attempt.modeledInputs.some((input) => input.callIndex === attempt.callIndex)) return false;
  clearPairedListeningTimers();
  attempt.modeled = true;
  attempt.strongCueUsed = true;
  attempt.targetRevealedBeforeResponse = true;
  attempt.callStrongCueUsed = true;
  attempt.callTargetRevealedBeforeResponse = true;
  attempt.modeledInputs.push({ source: "model", targetMidi, callIndex: attempt.callIndex, reason, completedAt: new Date().toISOString() });
  attempt.pendingModeled = null;
  attempt.scoredCalls.push(pairedListeningCallRecord(attempt, config, { targetMidi, modeled: true }));
  attempt.callIndex += 1;
  attempt.neutralProgress = attempt.callIndex;
  attempt.phase = "modeled-success";
  tracePairedListeningAudio(attempt, "modeled", targetMidi, { reason, callIndex: attempt.callIndex - 1, targetAlreadyPlayed });
  persistPairedListeningAttempt();
  renderGardenScreen();
  if (attempt.callIndex >= attempt.sequence.length) {
    finishPairedListeningSession({ completed: true, reason: "modeled-final-safe-rest", returnQueued });
    return true;
  }
  storePairedListeningResume(attempt, config, reason);
  finishPairedListeningSession({ completed: false, reason: "modeled-safe-rest", returnQueued });
  return true;
}

function completePairedListeningModeled(reason, { targetAlreadyPlayed = false, returnQueued = false } = {}) {
  const attempt = ensurePairedListeningAttempt();
  const config = pairedListeningConfig(attempt?.levelId);
  const targetMidi = pairedListeningTarget(attempt);
  if (!attempt || !config || targetMidi === null || attempt.modeledInputs.some((input) => input.callIndex === attempt.callIndex)) return null;
  clearPairedListeningTimers();
  if (targetAlreadyPlayed) {
    return settlePairedListeningModeled(attempt, config, targetMidi, reason, { targetAlreadyPlayed: true, returnQueued });
  }
  attempt.pendingModeled = { targetMidi, callIndex: attempt.callIndex, reason };
  return startAudioCTeachingSequence(attempt, {
    context: "modeled",
    kind: "modeled",
    reason,
    notes: [{ midi: targetMidi, durationMs: 720, delayMs: 0 }],
    payload: { targetMidi, callIndex: attempt.callIndex, reason },
    scheduledPhase: "modeled-playing",
    playingPhase: "modeled-playing",
    onStarted: () => tracePairedListeningAudio(attempt, "modeled-started", targetMidi, { reason, callIndex: attempt.callIndex }),
    onEnded: (transaction, playback, options) => {
      if (transaction.outcomeRecorded) return;
      transaction.outcomeRecorded = true;
      settlePairedListeningModeled(attempt, config, targetMidi, reason, { returnQueued: options.returnQueued });
    }
  });
}

function schedulePairedListeningResponseTimeout() {
  if (state.pairedListeningTimer) clearTimeout(state.pairedListeningTimer);
  state.pairedListeningTimer = setTimeout(() => {
    state.pairedListeningTimer = null;
    const attempt = ensurePairedListeningAttempt();
    if (!attempt || attempt.phase !== "awaiting-response") return;
    attempt.strongCueUsed = true;
    attempt.targetRevealedBeforeResponse = true;
    attempt.callStrongCueUsed = true;
    attempt.callTargetRevealedBeforeResponse = true;
    attempt.callRepairStage = "assisted";
    attempt.assistedCueVisible = true;
    if (attempt.levelId === "LS07") attempt.postPromptBoundaryStrongHelpUsed = true;
    attempt.phase = "assisted-retry";
    persistPairedListeningAttempt();
    renderGardenScreen();
    state.pairedListeningFeedbackTimer = setTimeout(() => {
      state.pairedListeningFeedbackTimer = null;
      if (attempt.phase !== "assisted-retry") return;
      attempt.assistedCueVisible = false;
      persistPairedListeningAttempt();
      renderGardenScreen();
    }, 1250);
    schedulePairedListeningAssistedTimeout();
  }, CH3_LONG_WAIT_MS);
}

function schedulePairedListeningAssistedTimeout() {
  if (state.pairedListeningTimer) clearTimeout(state.pairedListeningTimer);
  state.pairedListeningTimer = setTimeout(() => {
    state.pairedListeningTimer = null;
    completePairedListeningModeled("assisted-timeout");
  }, PAIRED_LISTENING_ASSISTED_WAIT_MS);
}

function storePairedGuideRun(attempt, config, { completed, reason }) {
  const session = state.activeSession;
  const run = {
    levelId: config.levelId,
    bundleId: session?.bundleId || config.bundleId,
    sessionId: session?.sessionId || null,
    phaseRole: "guide",
    completed,
    reason,
    startedAt: attempt.guideEvidence[0]?.playedAt || new Date().toISOString(),
    completedAt: new Date().toISOString(),
    evidence: attempt.guideEvidence.map((item) => ({ ...item }))
  };
  attempt.guideRuns.push(run);
  return run;
}

function finishPairedGuideRest(reason, { returnQueued = false } = {}) {
  const attempt = ensurePairedListeningAttempt();
  const config = pairedListeningConfig(attempt?.levelId);
  if (!attempt || !config) return;
  clearPairedListeningTimers();
  storePairedGuideRun(attempt, config, { completed: false, reason });
  attempt.phase = "guide-rest";
  state.lastInputMidi = null;
  state.lastInputResult = null;
  storePairedListeningResume(attempt, config, reason);
  persistPairedListeningAttempt();
  renderGardenScreen();
  finishPairedListeningSession({ completed: false, reason: "guide-rest", returnQueued });
}

function schedulePairedGuideTimeout() {
  if (state.pairedListeningTimer) clearTimeout(state.pairedListeningTimer);
  state.pairedListeningTimer = setTimeout(() => {
    state.pairedListeningTimer = null;
    const attempt = ensurePairedListeningAttempt();
    if (attempt?.phase === "visible-guide") finishPairedGuideRest("guide-timeout");
  }, PAIRED_LISTENING_GUIDE_WAIT_MS);
}

function playPairedListeningGuide({ reset = false, recovery = false } = {}) {
  const attempt = ensurePairedListeningAttempt();
  const config = pairedListeningConfig(attempt?.levelId);
  if (!attempt || !config || state.screen !== "garden") return;
  clearPairedListeningTimers();
  if (reset) {
    attempt.guideIndex = 0;
    attempt.guideWrongCount = 0;
    attempt.guideRepairStage = "none";
    attempt.pendingGuidePresentation = null;
    attempt.guideEvidence = [];
  }
  // A queued map return may leave the next visible guide unpresented. Starting
  // this controlled sequence is the only point that consumes that marker.
  attempt.pendingGuidePresentation = null;
  const midi = config.candidates[attempt.guideIndex];
  return startAudioCTeachingSequence(attempt, {
    context: "guide",
    kind: "guide",
    reason: recovery ? "recovery" : "guide",
    notes: [{ midi, durationMs: 720, delayMs: 0 }],
    payload: { midi, guideIndex: attempt.guideIndex, recovery },
    scheduledPhase: "visible-guide",
    playingPhase: "visible-guide",
    onStarted: () => {
      attempt.guidedAudioTrace.push({ midi, guideIndex: attempt.guideIndex, at: new Date().toISOString(), phaseRole: "guide", recovery });
      attempt.guidedAudioTrace = attempt.guidedAudioTrace.slice(-32);
      tracePairedListeningAudio(attempt, "guide", midi, { guideIndex: attempt.guideIndex, recovery });
    },
    onEnded: (transaction, playback, { returnQueued }) => {
      if (returnQueued) return;
      armAudioCGuideInput(attempt);
    }
  });
}

function playPairedListeningTarget(reason = "system", { recovery = false, presentationCounted = false, guideTransition = null } = {}) {
  const attempt = ensurePairedListeningAttempt();
  const targetMidi = pairedListeningTarget(attempt);
  if (!attempt || targetMidi === null || state.screen !== "garden") return;
  if (guideTransition) {
    const transition = attempt.guideTargetTransition;
    if (reason !== "system-first" || attempt.phase !== "guide-target-pending" ||
      transition?.token !== guideTransition.token ||
      transition?.playbackId !== guideTransition.transaction?.playbackId ||
      attempt.audioTransaction !== guideTransition.transaction ||
      !guideTransition.transaction?.endedAt || guideTransition.transaction.interruptedAt) return null;
    attempt.guideTargetTransition = null;
  } else if (attempt.phase === "guide-target-pending") {
    if (reason !== "resume") return null;
    attempt.guideTargetTransition = null;
  }
  clearPairedListeningTimers();
  attempt.respondingCandidate = null;
  state.lastInputMidi = null;
  state.lastInputResult = null;
  return startAudioCTeachingSequence(attempt, {
    context: "target",
    kind: "target",
    reason,
    notes: [{ midi: targetMidi, durationMs: 720, delayMs: 0 }],
    payload: { targetMidi, callIndex: attempt.callIndex, originalReason: reason, recovery, presentationCounted },
    scheduledPhase: "target-playing",
    playingPhase: "target-playing",
    onStarted: (transaction) => {
      if (!transaction.payload?.presentationCounted) {
        if (reason === "child-replay") {
          attempt.replayCountChild += 1;
          attempt.callReplayCountChild += 1;
        } else if (["resume", "system-replay"].includes(reason)) {
          attempt.replayCountSystem += 1;
          attempt.callReplayCountSystem += 1;
        }
        if (transaction.payload) transaction.payload.presentationCounted = true;
      }
      tracePairedListeningAudio(attempt, "target", targetMidi, { reason, callIndex: attempt.callIndex, recovery });
    },
    onEnded: (transaction, playback, { returnQueued }) => {
      attempt.phase = ["assisted", "candidate-outside"].includes(attempt.callRepairStage) ? "assisted-retry" : "awaiting-response";
      if (attempt.phase === "awaiting-response" && !attempt.callFirstValidInput) attempt.callResponseStartedAt = new Date().toISOString();
      persistPairedListeningAttempt();
      renderGardenScreen();
      if (!returnQueued) armAudioCResponse(attempt);
    }
  });
}

function playPairedListeningWholePairReplay({ recovery = false, presentationCounted = false } = {}) {
  const attempt = ensurePairedListeningAttempt();
  const config = pairedListeningConfig(attempt?.levelId);
  const targetMidi = pairedListeningTarget(attempt);
  if (!attempt || !config || targetMidi === null || state.screen !== "garden" || (!recovery && !audioCResponsePhaseAllows(attempt))) return null;
  clearPairedListeningTimers();
  attempt.respondingCandidate = null;
  state.lastInputMidi = null;
  state.lastInputResult = null;
  return startAudioCTeachingSequence(attempt, {
    context: "whole-pair-replay",
    kind: "whole-pair-replay",
    reason: "child-replay",
    notes: config.candidates.map((midi, index) => ({
      midi,
      durationMs: 720,
      delayMs: index * 840
    })),
    payload: {
      targetMidi,
      callIndex: attempt.callIndex,
      originalReason: "child-replay",
      pairMidis: config.candidates.slice(),
      recovery,
      presentationCounted
    },
    scheduledPhase: "target-playing",
    playingPhase: "target-playing",
    onStarted: (transaction) => {
      if (!transaction.payload?.presentationCounted) {
        attempt.replayCountChild += 1;
        attempt.callReplayCountChild += 1;
        if (transaction.payload) transaction.payload.presentationCounted = true;
      }
      tracePairedListeningAudio(attempt, "whole-pair-replay", targetMidi, {
        callIndex: attempt.callIndex,
        pairMidis: config.candidates.slice(),
        recovery,
        playbackId: transaction.playbackId || null
      });
    },
    onEnded: (transaction, playback, { returnQueued }) => {
      attempt.phase = ["assisted", "candidate-outside"].includes(attempt.callRepairStage) ? "assisted-retry" : "awaiting-response";
      if (attempt.phase === "awaiting-response" && !attempt.callFirstValidInput) attempt.callResponseStartedAt = new Date().toISOString();
      persistAudioCAttempt(attempt);
      renderAudioCAttempt(attempt);
      if (!returnQueued) armAudioCResponse(attempt);
    }
  });
}

function advancePairedListeningCall(attempt, config, { targetMidi, inputMidi, source, firstResponseCorrect, visualAssist = false, returnQueued = false }) {
  const targetName = noteForMidi(targetMidi)?.name;
  if (firstResponseCorrect) {
    attempt.correctCount += 1;
    if (source !== "麦克风" && attempt.callRepairStage === "none" && !visualAssist && targetName) attempt.eligibleCoverage[targetName] = true;
  }
  attempt.scoredCalls.push(pairedListeningCallRecord(attempt, config, { targetMidi, inputMidi, source, firstResponseCorrect, visualAssist }));
  attempt.respondingCandidate = targetName || null;
  attempt.callIndex += 1;
  attempt.neutralProgress = attempt.callIndex;
  attempt.phase = attempt.callIndex >= attempt.sequence.length ? "complete" : "correct-feedback";
  persistPairedListeningAttempt();
  renderGardenScreen();
  if (attempt.callIndex >= attempt.sequence.length) {
    finishPairedListeningSession({ completed: true, reason: visualAssist ? "visual-assist-complete" : "natural-rest", returnQueued });
    return true;
  }
  resetPairedListeningCall(attempt);
  persistPairedListeningAttempt();
  if (!returnQueued) {
    state.pairedListeningFeedbackTimer = setTimeout(() => {
      state.pairedListeningFeedbackTimer = null;
      if (audioCAttemptIsCurrent(attempt) && attempt.phase === "correct-feedback") playPairedListeningTarget("system-next");
    }, 720);
  }
  return true;
}

function audioCPendingMatchesCurrentState(attempt, pending) {
  const config = pairedListeningConfig(attempt?.levelId);
  if (!attempt || !pending || !config) return false;
  if (pending.phaseRole === "guide") {
    return pending.guideIndex === attempt.guideIndex && pending.targetMidi === config.candidates[attempt.guideIndex];
  }
  return pending.callIndex === attempt.callIndex && pending.targetMidi === pairedListeningTarget(attempt);
}

function recordAudioCInputPresentation(midi, source, correct) {
  state.lastInputMidi = midi;
  state.lastInputResult = correct ? "correct" : "wrong";
  if (els.inputStatus) els.inputStatus.textContent = `输入：${source}`;
  if (els.heardStatus) els.heardStatus.textContent = `听到：${noteForMidi(midi)?.name || midi}`;
}

function traceAudioCChildEchoStarted(attempt, pending, transaction, extra = {}) {
  tracePairedListeningAudio(attempt, "child-input", pending.midi, {
    phaseRole: pending.phaseRole,
    callIndex: pending.callIndex ?? null,
    guideIndex: pending.guideIndex ?? null,
    targetMidi: pending.targetMidi,
    source: pending.source,
    frequency: noteForMidi(pending.midi)?.frequency || midiFrequency(pending.midi),
    playbackId: transaction?.playbackId || null,
    ...extra
  });
}

function startAudioCChildEcho(attempt, pending, { recovery = false } = {}) {
  if (!audioCAttemptIsCurrent(attempt) || !audioCPendingMatchesCurrentState(attempt, pending)) return null;
  attempt.pendingInput = { ...pending };
  return startAudioCTeachingSequence(attempt, {
    context: "child-echo",
    kind: "child-echo",
    reason: recovery ? "recovery" : "child-input",
    notes: [{ midi: pending.midi, durationMs: 420, delayMs: 0, child: true }],
    payload: { ...pending, recovery },
    scheduledPhase: "child-echo-playing",
    playingPhase: "child-echo-playing",
    onStarted: (transaction) => traceAudioCChildEchoStarted(attempt, pending, transaction, { recovery }),
    onEnded: (transaction, playback, options) => {
      if (transaction.outcomeRecorded) return;
      transaction.outcomeRecorded = true;
      if (pending.phaseRole === "guide") {
        commitAudioCGuideInput(attempt, pending, transaction, options);
      } else {
        commitAudioCInput(attempt, pending, transaction, { ...options, external: false });
      }
    }
  });
}

function beginAudioCGuideInput(attempt, midi, source) {
  const config = pairedListeningConfig(attempt?.levelId);
  const targetMidi = config?.candidates?.[attempt.guideIndex];
  if (!Number.isFinite(targetMidi)) return false;
  clearPairedListeningTimers();
  const pending = {
    phaseRole: "guide",
    midi,
    source,
    targetMidi,
    guideIndex: attempt.guideIndex,
    occurredAt: new Date().toISOString(),
    correct: midi === targetMidi
  };
  if (source === "屏幕") attempt.screenInputHeld = true;
  if (isMicrophoneSource(source)) return beginAudioCExternalInput(attempt, pending);
  return Boolean(startAudioCChildEcho(attempt, pending));
}

function beginAudioCInput(attempt, midi, source) {
  const targetMidi = pairedListeningTarget(attempt);
  if (!Number.isFinite(targetMidi)) return false;
  clearPairedListeningTimers();
  const pending = {
    phaseRole: "check",
    midi,
    source,
    targetMidi,
    callIndex: attempt.callIndex,
    occurredAt: new Date().toISOString(),
    correct: midi === targetMidi,
    visualAssist: attempt.phase === "visual-assist"
  };
  if (source === "屏幕") attempt.screenInputHeld = true;
  if (isMicrophoneSource(source)) return beginAudioCExternalInput(attempt, pending);
  return Boolean(startAudioCChildEcho(attempt, pending));
}

function scheduleAudioCFeedbackTransition(attempt, transaction, phase, delayMs) {
  state.pairedListeningFeedbackTimer = setTimeout(() => {
    state.pairedListeningFeedbackTimer = null;
    if (!audioCAttemptIsCurrent(attempt) || attempt.audioTransaction !== transaction) return;
    if (attempt.phase !== phase || transaction.endedAt === null || transaction.interruptedAt) return;
    attempt.phase = "awaiting-response";
    attempt.callResponseStartedAt = new Date().toISOString();
    persistAudioCAttempt(attempt);
    renderAudioCAttempt(attempt);
    armAudioCResponse(attempt);
  }, delayMs);
}

function scheduleAudioCSystemFirstTarget(attempt, transaction) {
  if (!audioCAttemptIsCurrent(attempt) || attempt.audioTransaction !== transaction || !transaction?.endedAt || transaction.interruptedAt) return false;
  const token = `${transaction.playbackId || "guide"}:${transaction.endedAt}`;
  attempt.guideTargetTransition = {
    token,
    playbackId: transaction.playbackId || null,
    scheduledAt: new Date().toISOString()
  };
  attempt.phase = "guide-target-pending";
  persistAudioCAttempt(attempt);
  renderAudioCAttempt(attempt);
  state.pairedListeningFeedbackTimer = setTimeout(() => {
    state.pairedListeningFeedbackTimer = null;
    const transition = attempt.guideTargetTransition;
    if (!audioCAttemptIsCurrent(attempt) || attempt.phase !== "guide-target-pending" ||
      transition?.token !== token || transition.playbackId !== transaction.playbackId ||
      attempt.audioTransaction !== transaction || !transaction.endedAt || transaction.interruptedAt) return;
    playPairedListeningTarget("system-first", { guideTransition: { token, transaction } });
  }, 720);
  return true;
}

function startAudioCGuideRepair(attempt, pending, { recovery = false, finishRest = false } = {}) {
  if (!audioCAttemptIsCurrent(attempt) || !audioCPendingMatchesCurrentState(attempt, pending)) return null;
  const targetMidi = pending.targetMidi;
  attempt.pendingInput = null;
  return startAudioCTeachingSequence(attempt, {
    context: "guide-repair",
    kind: "guide-repair",
    reason: "guide-repair",
    notes: [{ midi: targetMidi, durationMs: 720, delayMs: 0 }],
    payload: { ...pending, recovery, finishRest },
    scheduledPhase: "visible-guide",
    playingPhase: "visible-guide",
    onStarted: (transaction) => tracePairedListeningAudio(attempt, "target-replay", targetMidi, {
      phaseRole: "guide",
      guideIndex: pending.guideIndex,
      recovery,
      playbackId: transaction.playbackId || null
    }),
    onEnded: (transaction, playback, { returnQueued }) => {
      if (finishRest) {
        finishPairedGuideRest("guide-repeated-wrong", { returnQueued });
        return;
      }
      attempt.guideRepairStage = "none";
      persistAudioCAttempt(attempt);
      renderAudioCAttempt(attempt);
      if (!returnQueued) armAudioCGuideInput(attempt);
    }
  });
}

function commitAudioCGuideInput(attempt, pending, transaction, { returnQueued = false, external = false } = {}) {
  if (!audioCAttemptIsCurrent(attempt) || !audioCPendingMatchesCurrentState(attempt, pending)) return false;
  const config = pairedListeningConfig(attempt.levelId);
  clearPairedListeningTimers();
  if (attempt.pendingInput?.occurredAt === pending.occurredAt) attempt.pendingInput = null;
  attempt.guideInputArmed = false;
  const now = new Date().toISOString();
  const correct = pending.midi === pending.targetMidi;
  const session = state.activeSession;
  const evidence = {
    levelId: config.levelId,
    bundleId: session?.bundleId || config.bundleId,
    sessionId: session?.sessionId || null,
    phaseRole: "guide",
    guideIndex: pending.guideIndex,
    targetMidi: pending.targetMidi,
    inputRoute: pending.source,
    childInput: pending.midi,
    correct,
    repair: attempt.guideRepairStage,
    playedAt: pending.occurredAt,
    committedAt: now,
    external,
    timingUsedForMastery: false
  };
  attempt.guidedInputs.push({ midi: pending.midi, source: pending.source, targetMidi: pending.targetMidi, correct, phaseRole: "guide", scored: false, occurredAt: pending.occurredAt, committedAt: now, external });
  attempt.guideEvidence.push(evidence);
  recordAudioCInputPresentation(pending.midi, pending.source, correct);
  if (correct) {
    attempt.guideWrongCount = 0;
    attempt.guideRepairStage = "none";
    if (pending.guideIndex < config.candidates.length - 1) {
      attempt.guideIndex += 1;
      if (returnQueued) {
        attempt.phase = "guide-next-pending";
        attempt.pendingGuidePresentation = {
          guideIndex: attempt.guideIndex,
          sourcePlaybackId: transaction?.playbackId || null,
          source: "map-return",
          queuedAt: now,
          requiresExplicitGesture: false
        };
        setAudioCInputArmed(attempt, false);
        setAudioCGuideInputArmed(attempt, false);
        persistAudioCAttempt(attempt);
        renderAudioCAttempt(attempt);
        return true;
      }
      attempt.pendingGuidePresentation = null;
      attempt.phase = "visible-guide";
      persistAudioCAttempt(attempt);
      renderAudioCAttempt(attempt);
      state.pairedListeningFeedbackTimer = setTimeout(() => {
        state.pairedListeningFeedbackTimer = null;
        if (audioCAttemptIsCurrent(attempt) && attempt.phase === "visible-guide") playPairedListeningGuide();
      }, 520);
      return true;
    }
    attempt.guidePlayed = true;
    attempt.openingBoundaryGuideCompleted = config.levelId === "LS07";
    storePairedGuideRun(attempt, config, { completed: true, reason: "child-guide-complete" });
    if (!returnQueued) scheduleAudioCSystemFirstTarget(attempt, transaction);
    else {
      attempt.guideTargetTransition = null;
      persistAudioCAttempt(attempt);
      renderAudioCAttempt(attempt);
    }
    return true;
  }
  attempt.guideWrongCount += 1;
  attempt.guideRepairStage = "soft-replay";
  const repair = startAudioCGuideRepair(attempt, pending, { finishRest: attempt.guideWrongCount >= 2 });
  if (returnQueued && repair) handoffAudioCQueuedReturn(attempt, transaction);
  return Boolean(repair);
}

function startAudioCWrongRepair(attempt, pending, { recovery = false, presentationCounted = false } = {}) {
  if (!audioCAttemptIsCurrent(attempt) || !audioCPendingMatchesCurrentState(attempt, pending)) return null;
  const targetMidi = pending.targetMidi;
  const modeledAfterRepair = attempt.callWrongCount >= 4;
  const presentationPhase = modeledAfterRepair
    ? "modeled-playing"
    : (attempt.callRepairStage === "pair-compare"
      ? "pair-compare"
      : (attempt.callRepairStage === "wrong-known" ? "wrong-known" : "assisted-retry"));
  const responsePhase = ["assisted", "candidate-outside"].includes(attempt.callRepairStage)
    ? "assisted-retry"
    : "awaiting-response";
  attempt.pendingInput = null;
  return startAudioCTeachingSequence(attempt, {
    context: "wrong-repair",
    kind: "wrong-repair",
    reason: "wrong-repair",
    notes: [{ midi: targetMidi, durationMs: 720, delayMs: 0 }],
    payload: {
      ...pending,
      originalReason: "wrong-repair",
      responsePhase,
      presentationPhase,
      modeledAfterRepair,
      recovery,
      presentationCounted
    },
    scheduledPhase: presentationPhase,
    playingPhase: presentationPhase,
    onStarted: (transaction) => {
      if (!transaction.payload?.presentationCounted) {
        attempt.replayCountSystem += 1;
        attempt.callReplayCountSystem += 1;
        if (transaction.payload) transaction.payload.presentationCounted = true;
      }
      tracePairedListeningAudio(attempt, "target-replay", targetMidi, {
        callIndex: pending.callIndex,
        childMidi: pending.midi,
        source: pending.source,
        recovery,
        playbackId: transaction.playbackId || null
      });
    },
    onEnded: (transaction, playback, { returnQueued }) => {
      tracePairedListeningAudio(attempt, "wrong-repair-ended", targetMidi, {
        callIndex: pending.callIndex,
        childMidi: pending.midi,
        source: pending.source,
        recovery,
        playbackId: transaction.playbackId || null
      });
      if (transaction.payload?.modeledAfterRepair) {
        completePairedListeningModeled("assisted-retry-wrong", { targetAlreadyPlayed: true, returnQueued });
        return;
      }
      if (returnQueued) return;
      const nextPhase = transaction.payload?.responsePhase || "awaiting-response";
      if (["wrong-known", "pair-compare"].includes(transaction.payload?.presentationPhase)) {
        scheduleAudioCFeedbackTransition(
          attempt,
          transaction,
          transaction.payload.presentationPhase,
          attempt.callWrongCount === 2 ? 1500 : 1250
        );
        return;
      }
      attempt.phase = nextPhase;
      if (nextPhase === "assisted-retry") attempt.assistedCueVisible = false;
      if (nextPhase === "awaiting-response") attempt.callResponseStartedAt = new Date().toISOString();
      persistAudioCAttempt(attempt);
      renderAudioCAttempt(attempt);
      armAudioCResponse(attempt);
    }
  });
}

function commitAudioCInput(attempt, pending, transaction, { returnQueued = false, external = false } = {}) {
  if (!audioCAttemptIsCurrent(attempt) || !audioCPendingMatchesCurrentState(attempt, pending)) return false;
  const config = pairedListeningConfig(attempt.levelId);
  clearPairedListeningTimers();
  if (attempt.pendingInput?.occurredAt === pending.occurredAt) attempt.pendingInput = null;
  attempt.inputArmed = false;
  const correct = pending.midi === pending.targetMidi;
  attempt.inputRoutes[pending.source] = (attempt.inputRoutes[pending.source] || 0) + 1;
  if (!attempt.callFirstValidInput) {
    const responseStart = Date.parse(attempt.callResponseStartedAt || "");
    const responseMs = !attempt.callTimingInterrupted && Number.isFinite(responseStart) ? Math.max(0, Date.now() - responseStart) : null;
    attempt.callFirstValidInput = { midi: pending.midi, source: pending.source, occurredAt: pending.occurredAt, responseMs };
  }
  if (external) {
    attempt.hasExperimentalInput = true;
    attempt.callExperimentalInput = true;
  }
  attempt.childInputs.push({
    midi: pending.midi,
    source: pending.source,
    targetMidi: pending.targetMidi,
    correct,
    scored: !pending.visualAssist,
    callIndex: pending.callIndex,
    occurredAt: pending.occurredAt,
    committedAt: new Date().toISOString(),
    external
  });
  recordAudioCInputPresentation(pending.midi, pending.source, correct);
  if (pending.visualAssist) {
    attempt.accessibilityVisualAssist = true;
    attempt.callAccessibilityVisualAssist = true;
    if (attempt.levelId === "LS07") attempt.postPromptBoundaryStrongHelpUsed = true;
    if (!correct) {
      attempt.phase = "visual-assist";
      persistAudioCAttempt(attempt);
      renderAudioCAttempt(attempt);
      if (!returnQueued) armAudioCResponse(attempt);
      return true;
    }
    return advancePairedListeningCall(attempt, config, {
      targetMidi: pending.targetMidi,
      inputMidi: pending.midi,
      source: pending.source,
      firstResponseCorrect: false,
      visualAssist: true,
      returnQueued
    });
  }
  if (correct) {
    return advancePairedListeningCall(attempt, config, {
      targetMidi: pending.targetMidi,
      inputMidi: pending.midi,
      source: pending.source,
      firstResponseCorrect: attempt.callWrongCount === 0,
      returnQueued
    });
  }
  attempt.callWrongCount += 1;
  attempt.totalWrongCount += 1;
  const confusionKey = [pending.midi, pending.targetMidi].sort((a, b) => a - b).join("-");
  attempt.confusionCounts[confusionKey] = (attempt.confusionCounts[confusionKey] || 0) + 1;
  attempt.callConfusionPair = [pending.midi, pending.targetMidi];
  const canShowPair = config.candidates.includes(pending.midi) && pending.midi !== pending.targetMidi;
  if (attempt.callWrongCount >= 4) {
    attempt.pendingModeled = { callIndex: attempt.callIndex, targetMidi: pending.targetMidi, reason: "assisted-retry-wrong", targetAlreadyPlayed: true };
  } else if (attempt.callWrongCount >= 2 && !canShowPair) {
    attempt.strongCueUsed = true;
    attempt.targetRevealedBeforeResponse = true;
    attempt.callStrongCueUsed = true;
    attempt.callTargetRevealedBeforeResponse = true;
    attempt.callOutOfCandidateRepair = true;
    attempt.callRepairStage = "candidate-outside";
    attempt.assistedCueVisible = true;
    if (attempt.levelId === "LS07") attempt.postPromptBoundaryStrongHelpUsed = true;
  } else if (attempt.callWrongCount >= 3) {
    attempt.strongCueUsed = true;
    attempt.targetRevealedBeforeResponse = true;
    attempt.callStrongCueUsed = true;
    attempt.callTargetRevealedBeforeResponse = true;
    attempt.callRepairStage = "assisted";
    attempt.assistedCueVisible = true;
    if (attempt.levelId === "LS07") attempt.postPromptBoundaryStrongHelpUsed = true;
  } else if (attempt.callWrongCount === 2) {
    attempt.callRepairStage = "pair-compare";
  } else {
    attempt.callRepairStage = "wrong-known";
  }
  const repair = startAudioCWrongRepair(attempt, pending);
  if (returnQueued && repair) handoffAudioCQueuedReturn(attempt, transaction);
  return Boolean(repair);
}

function handleAudioCPairedListeningInput(midi, source) {
  const attempt = currentAudioCAttempt();
  const config = pairedListeningConfig(attempt?.levelId);
  if (!attempt || !config || state.chapter3.equipmentState !== "safe-open") return;
  const retryingInterruptedExternalInput = attempt.phase === "sound-paused" &&
    (attempt.soundPauseContext || attempt.audioTransaction?.context) === "external-input";
  if (attempt.phase === "sound-paused") {
    if (!retryingInterruptedExternalInput || !recoverAudioCAttempt()) {
      if (source === "MIDI") recordAudioCMidiNoteOn(attempt, midi);
      recordAudioCObservation(attempt, midi, source);
      return;
    }
  }
  if (source === "MIDI") {
    const midiState = recordAudioCMidiNoteOn(attempt, midi);
    if (midiState.blocked) {
      recordAudioCObservation(attempt, midi, source, attempt.phase, { reason: "held-midi" });
      return;
    }
  }
  if (attempt.phase === "guide-ready") {
    recordAudioCObservation(attempt, midi, source);
    return;
  }
  if (attempt.phase === "visible-guide") {
    if (!attempt.guideInputArmed) {
      recordAudioCObservation(attempt, midi, source);
      return;
    }
    beginAudioCGuideInput(attempt, midi, source);
    return;
  }
  if (!audioCResponsePhaseAllows(attempt) || !attempt.inputArmed) {
    recordAudioCObservation(attempt, midi, source);
    return;
  }
  beginAudioCInput(attempt, midi, source);
}

function recoverAudioCAttempt() {
  const attempt = currentAudioCAttempt();
  if (!attempt || attempt.phase !== "sound-paused") return false;
  clearPairedListeningTimers();
  clearAudioCStaleInputHolds(attempt);
  const transaction = attempt.audioTransaction;
  const context = attempt.soundPauseContext || transaction?.context;
  const payload = transaction?.payload || attempt.pendingInput || {};
  const reason = payload.originalReason || transaction?.reason || "resume";
  if (context === "external-input") {
    attempt.pendingInput = null;
    attempt.soundPauseContext = null;
    if (payload.phaseRole === "guide") {
      attempt.phase = "visible-guide";
      setAudioCGuideInputArmed(attempt, true);
    } else {
      attempt.phase = ["assisted", "candidate-outside"].includes(attempt.callRepairStage) ? "assisted-retry" : "awaiting-response";
      if (attempt.phase === "awaiting-response") attempt.callResponseStartedAt = new Date().toISOString();
      setAudioCInputArmed(attempt, true);
    }
    persistAudioCAttempt(attempt);
    renderAudioCAttempt(attempt);
    return true;
  }
  if (context === "guide") return Boolean(playPairedListeningGuide({ recovery: true }));
  if (context === "target") {
    return Boolean(playPairedListeningTarget(reason, {
      recovery: true,
      presentationCounted: payload.presentationCounted === true
    }));
  }
  if (context === "whole-pair-replay") {
    return Boolean(playPairedListeningWholePairReplay({
      recovery: true,
      presentationCounted: payload.presentationCounted === true
    }));
  }
  if (context === "child-echo" && audioCPendingMatchesCurrentState(attempt, payload)) {
    return Boolean(startAudioCChildEcho(attempt, payload, { recovery: true }));
  }
  if (context === "guide-repair" && audioCPendingMatchesCurrentState(attempt, payload)) {
    return Boolean(startAudioCGuideRepair(attempt, payload, {
      recovery: true,
      finishRest: payload.finishRest === true
    }));
  }
  if (context === "wrong-repair" && audioCPendingMatchesCurrentState(attempt, payload)) {
    return Boolean(startAudioCWrongRepair(attempt, payload, {
      recovery: true,
      presentationCounted: payload.presentationCounted === true
    }));
  }
  if (context === "modeled") return Boolean(completePairedListeningModeled(payload.reason || "modeled-recovery"));
  attempt.phase = attempt.guidePlayed ? "replay-ready" : "guide-ready";
  attempt.soundPauseContext = null;
  setAudioCInputArmed(attempt, false);
  setAudioCGuideInputArmed(attempt, false);
  persistAudioCAttempt(attempt);
  renderAudioCAttempt(attempt);
  return true;
}

function releaseAudioCInput(midi, source) {
  const attempt = currentAudioCAttempt();
  if (!attempt) return false;
  if (source === "MIDI") {
    if (!releaseAudioCMidiNote(attempt, midi)) return false;
  } else if (source === "屏幕") {
    if (!attempt.screenInputHeld) return false;
    attempt.screenInputHeld = false;
  } else if (isMicrophoneSource(source)) {
    return finishAudioCExternalInput(attempt, midi, source, (pending, transaction, options) => {
      if (pending.phaseRole === "guide") commitAudioCGuideInput(attempt, pending, transaction, options);
      else commitAudioCInput(attempt, pending, transaction, { ...options, external: true });
    });
  } else {
    return false;
  }
  if (attempt.phase === "visible-guide") {
    if (!armAudioCGuideInput(attempt)) {
      persistAudioCAttempt(attempt);
      renderAudioCAttempt(attempt);
    }
  } else if (!armAudioCResponse(attempt)) {
    persistAudioCAttempt(attempt);
    renderAudioCAttempt(attempt);
  }
  return true;
}

function resumeAudioCPairedListeningFlow({ fromReload = false } = {}) {
  const attempt = currentAudioCAttempt();
  if (!attempt || state.screen !== "garden") return;
  clearPairedListeningTimers();
  if (fromReload) {
    attempt.guideTargetTransition = null;
    if (!["guide-ready", "visible-guide", "guide-next-pending"].includes(attempt.phase)) {
      attempt.callTimingInterrupted = true;
      attempt.callResponseStartedAt = null;
    }
    normalizeAudioCAttemptForRecovery(attempt);
  }
  if (attempt.phase === "sound-paused") {
    persistAudioCAttempt(attempt);
    renderAudioCAttempt(attempt);
    return;
  }
  if (attempt.phase === "guide-next-pending") {
    const pending = attempt.pendingGuidePresentation;
    const config = pairedListeningConfig(attempt.levelId);
    const pendingMatchesGuide = Boolean(
      pending &&
      Number.isInteger(pending.guideIndex) &&
      pending.guideIndex === attempt.guideIndex &&
      pending.guideIndex > 0 &&
      pending.guideIndex < (config?.candidates?.length || 0)
    );
    if (!pendingMatchesGuide) {
      attempt.pendingGuidePresentation = null;
      attempt.phase = "guide-ready";
      setAudioCInputArmed(attempt, false);
      setAudioCGuideInputArmed(attempt, false);
      persistAudioCAttempt(attempt);
      renderAudioCAttempt(attempt);
      return;
    }
    if (fromReload || !state.audioUnlocked) {
      pending.requiresExplicitGesture = true;
      pending.recoveryReadyAt ||= new Date().toISOString();
      setAudioCInputArmed(attempt, false);
      setAudioCGuideInputArmed(attempt, false);
      persistAudioCAttempt(attempt);
      renderAudioCAttempt(attempt);
      return;
    }
    pending.requiresExplicitGesture = false;
    playPairedListeningGuide({ recovery: true });
    return;
  }
  if (attempt.phase === "visual-assist") {
    armAudioCResponse(attempt);
    return;
  }
  if (attempt.phase === "visible-guide") {
    armAudioCGuideInput(attempt);
    return;
  }
  if (["wrong-known", "pair-compare"].includes(attempt.phase)) {
    const transaction = attempt.audioTransaction;
    if (transaction?.endedAt && !transaction.interruptedAt) {
      scheduleAudioCFeedbackTransition(attempt, transaction, attempt.phase, attempt.phase === "pair-compare" ? 1500 : 1250);
    }
    persistAudioCAttempt(attempt);
    renderAudioCAttempt(attempt);
    return;
  }
  if (attempt.phase === "assisted-retry") {
    armAudioCResponse(attempt);
    return;
  }
  if (["awaiting-response"].includes(attempt.phase)) {
    armAudioCResponse(attempt);
    return;
  }
  if (attempt.phase === "modeled-playing" && attempt.pendingModeled) {
    completePairedListeningModeled(attempt.pendingModeled.reason, { targetAlreadyPlayed: true });
    return;
  }
  if (fromReload || !state.audioUnlocked) {
    attempt.phase = attempt.guidePlayed ? "replay-ready" : "guide-ready";
    setAudioCInputArmed(attempt, false);
    setAudioCGuideInputArmed(attempt, false);
    persistAudioCAttempt(attempt);
    renderAudioCAttempt(attempt);
    return;
  }
  if (!attempt.guidePlayed) playPairedListeningGuide();
  else playPairedListeningTarget("resume");
}

function enablePairedListeningVisualAssist() {
  const attempt = ensurePairedListeningAttempt();
  if (!attempt) return;
  const allowed = attempt.phase === "assisted-retry" || (attempt.phase === "sound-paused" && attempt.soundPauseCount >= 2);
  if (!allowed) return;
  clearPairedListeningTimers();
  attempt.accessibilityVisualAssist = true;
  attempt.targetRevealedBeforeResponse = true;
  attempt.callAccessibilityVisualAssist = true;
  attempt.callTargetRevealedBeforeResponse = true;
  if (attempt.levelId === "LS07") attempt.postPromptBoundaryStrongHelpUsed = true;
  attempt.phase = "visual-assist";
  persistPairedListeningAttempt();
  renderGardenScreen();
}

function ls08SequenceForSeed(seed) {
  const pairs = ls08Config.pairs.map((pair) => pair.slice());
  const offset = hashSessionSeed(seed) % pairs.length;
  return [...pairs.slice(offset), ...pairs.slice(0, offset)];
}

function cloneLs08Attempt(attempt) {
  return JSON.parse(JSON.stringify(attempt));
}

function resetLs08Pair(attempt) {
  attempt.pairInputs = [];
  attempt.pairInputEvents = [];
  attempt.pairFirstCompleteResponse = null;
  attempt.pairFirstCompleteRoute = null;
  attempt.pairFirstCompleteAt = null;
  attempt.pairFirstCompleteResponseMs = null;
  attempt.pairCurrentResponseRoute = null;
  attempt.pairDiscreteOnsets = [];
  attempt.pairWrongCount = 0;
  attempt.pairRepairStage = "none";
  attempt.pairConfusion = [];
  attempt.pairChildReplayCount = 0;
  attempt.pairSystemReplayCount = 0;
  attempt.pairStrongCueUsed = false;
  attempt.pairTargetRevealedBeforeResponse = false;
  attempt.pairAccessibilityVisualAssist = false;
  attempt.assistedCueVisible = false;
  attempt.pairExperimentalInput = false;
  attempt.pairResponseStartedAt = null;
  attempt.pairTimingInterrupted = false;
  attempt.secondOnsetRequiresFreshRearm = false;
  attempt.repairAudioPlaying = false;
  attempt.repairReturnQueued = false;
  attempt.pendingRepairReplayCounted = false;
  attempt.pendingWrongAt = null;
  attempt.pendingWrongRoute = null;
  attempt.pendingModeledTargetPlayed = false;
  attempt.pairAudioPlaying = false;
  attempt.pairReturnQueued = false;
  attempt.pendingPairReplayReason = null;
  attempt.modeledAudioPlaying = false;
  attempt.pendingModeledReason = null;
  attempt.routeArmed = { "屏幕": true, MIDI: true, "麦克风": true };
  attempt.routeHeldMidi = { "屏幕": null, MIDI: null, "麦克风": null };
}

function createLs08Attempt(session = state.activeSession, resumeAttempt = null) {
  if (resumeAttempt?.version === 1 && Array.isArray(resumeAttempt.sequence)) {
    const resumed = cloneLs08Attempt(resumeAttempt);
    resumed.phase = "guide-ready";
    resumed.guideIndex = 0;
    resumed.guideEvidence = [];
    resumed.guideRepairStage = "none";
    resumed.guideWrongCount = 0;
    resumed.guideCompleted = false;
    resumed.guideAudioPlaying = false;
    resumed.guideAwaitingInput = false;
    resumed.guideReturnQueued = false;
    resumed.pendingGuideReplay = false;
    resumed.pendingGuideWrongMidi = null;
    resumed.guideMode = "short";
    resumed.remediationGuide = Boolean(state.chapter3.ls08RemediationRequired);
    resumed.resumedFromSessionId = session?.resumeOfSessionId || null;
    resumed.crossedSessionBoundary = true;
    resumed.soundPauseContext = null;
    resumed.audioTransaction = null;
    delete resumed.outcomeRecorded;
    resetLs08Pair(resumed);
    return resumed;
  }
  const seed = session?.sessionId || ls08Config.bundleId;
  const attempt = {
    version: 1,
    levelId: "LS08",
    seed,
    originSessionId: seed,
    resumedFromSessionId: null,
    crossedSessionBoundary: false,
    sequence: ls08SequenceForSeed(seed),
    phase: "guide-ready",
    guideMode: "full",
    guideIndex: 0,
    guideWrongCount: 0,
    guideRepairStage: "none",
    guideCompleted: false,
    guideAudioPlaying: false,
    guideAwaitingInput: false,
    guideReturnQueued: false,
    pendingGuideReplay: false,
    pendingGuideWrongMidi: null,
    guideEvidence: [],
    guideRuns: [],
    guideReplayCount: 0,
    checkEntered: false,
    pairIndex: 0,
    scoredPairs: [],
    neutralProgress: 0,
    correctCount: 0,
    totalWrongCount: 0,
    inputRoutes: {},
    childInputs: [],
    observations: [],
    audioTrace: [],
    replayCountChild: 0,
    replayCountSystem: 0,
    separateNoteReplayUsed: false,
    strongCueUsed: false,
    modeled: false,
    modeledInputs: [],
    accessibilityVisualAssist: false,
    hasExperimentalInput: false,
    targetRevealedBeforeResponse: false,
    soundPauseCount: 0,
    soundPauseContext: null,
    audioTransaction: null,
    storyEvents: [],
    lowEchoStarted: false,
    lowEchoCompleted: false,
    lowEchoEndedAt: null,
    lowEchoReturnQueued: false,
    remediationGuide: Boolean(state.chapter3.ls08RemediationRequired)
  };
  resetLs08Pair(attempt);
  return attempt;
}

function ensureLs08Attempt() {
  const action = currentLs08Action();
  if (!action) return null;
  if (!action.listeningAttempt || action.listeningAttempt.version !== 1) {
    action.listeningAttempt = createLs08Attempt(state.activeSession);
    persistActiveSession();
  }
  return action.listeningAttempt;
}

function persistLs08Attempt() {
  if (currentLs08Action()) persistActiveSession();
}

function clearLs08Timers() {
  if (state.ls08Timer) clearTimeout(state.ls08Timer);
  if (state.ls08FeedbackTimer) clearTimeout(state.ls08FeedbackTimer);
  state.ls08Timer = null;
  state.ls08FeedbackTimer = null;
}

function ls08TargetPair(attempt = ensureLs08Attempt()) {
  return attempt?.sequence?.[attempt.pairIndex]?.slice() || null;
}

function traceLs08(attempt, kind, extra = {}) {
  attempt.audioTrace.push({ kind, at: new Date().toISOString(), ...extra });
  attempt.audioTrace = attempt.audioTrace.slice(-100);
}

function ls08SequenceDurationMs(midis) {
  return LS08_NOTE_DURATION_MS + (Math.max(0, (midis?.length || 1) - 1) * LS08_PAIR_GAP_MS);
}

function beginLs08AudioTransaction(attempt, { context, kind, reason, notes, payload = null, phase = null, scheduledAt = new Date().toISOString() } = {}) {
  if (!attempt) return null;
  attempt.audioTransaction = {
    context,
    kind,
    reason,
    midis: notes.map((note) => note.midi),
    scheduledAt,
    startedAt: null,
    endedAt: null,
    interruptedAt: null,
    playbackId: null,
    startAudioTime: null,
    endAudioTime: null,
    interruptedAudioTime: null,
    contextState: state.sfx?.ctx?.state || "unavailable",
    payload,
    returnQueued: false,
    returnQueuedConsumedAt: null
  };
  if (phase) attempt.phase = phase;
  persistLs08Attempt();
  renderGardenScreen();
  return attempt.audioTransaction;
}

function queueLs08MapReturn(attempt) {
  if (!attempt) return false;
  const transaction = attempt.audioTransaction;
  if (transaction && !transaction.endedAt && !transaction.interruptedAt) transaction.returnQueued = true;
  const context = transaction?.context;
  if (context === "guide" || context === "guide-repair") attempt.guideReturnQueued = true;
  else if (context === "pair") {
    attempt.pairReturnQueued = true;
    attempt.pairTimingInterrupted = true;
  } else if (context === "wrong-repair") {
    attempt.repairReturnQueued = true;
    attempt.pairTimingInterrupted = true;
  } else if (context === "modeled") {
    attempt.pairTimingInterrupted = true;
  } else if (context === "low-echo") {
    attempt.lowEchoReturnQueued = true;
  }
  traceLs08(attempt, "return-queued", { context: context || "unknown" });
  persistLs08Attempt();
  renderGardenScreen();
  return true;
}

function consumeLs08QueuedReturn(attempt, transaction = attempt?.audioTransaction) {
  const queued = transaction?.returnQueued === true || attempt?.guideReturnQueued === true || attempt?.pairReturnQueued === true || attempt?.repairReturnQueued === true || attempt?.lowEchoReturnQueued === true;
  if (!queued || transaction?.returnQueuedConsumedAt) return false;
  if (transaction) {
    transaction.returnQueued = false;
    transaction.returnQueuedConsumedAt = new Date().toISOString();
  }
  attempt.guideReturnQueued = false;
  attempt.pairReturnQueued = false;
  attempt.repairReturnQueued = false;
  attempt.lowEchoReturnQueued = false;
  traceLs08(attempt, "queued-return-consumed", {
    context: transaction?.context || "unknown",
    interruption: Boolean(transaction?.interruptedAt)
  });
  persistLs08Attempt();
  if (state.screen === "garden") showMapScreen();
  return true;
}

function finishLs08AudioTransaction(attempt, onEnded, endedAt = null) {
  const transaction = attempt?.audioTransaction;
  if (!transaction || transaction.endedAt || transaction.interruptedAt) return;
  transaction.endedAt = endedAt || new Date().toISOString();
  traceLs08(attempt, "transaction-ended", { context: transaction.context, sequenceKind: transaction.kind });
  persistLs08Attempt();
  const returnQueued = transaction.returnQueued === true;
  onEnded?.(transaction);
  if (returnQueued) consumeLs08QueuedReturn(attempt, transaction);
}

function enterLs08SoundPause(attempt, context, reason = "audio-unavailable", { increment = true } = {}) {
  if (!attempt) return;
  const transaction = attempt.audioTransaction;
  const returnQueued = transaction?.returnQueued === true;
  if (increment) attempt.soundPauseCount += 1;
  if (attempt.audioTransaction && !attempt.audioTransaction.endedAt && !attempt.audioTransaction.interruptedAt) {
    attempt.audioTransaction.interruptedAt = new Date().toISOString();
  }
  attempt.soundPauseContext = context;
  attempt.phase = "sound-paused";
  traceLs08(attempt, "audio-paused", { context, reason });
  persistLs08Attempt();
  renderGardenScreen();
  if (returnQueued) consumeLs08QueuedReturn(attempt, transaction);
}

function startLs08TeachingSequence(attempt, {
  context,
  kind,
  reason,
  notes,
  payload = null,
  phase = null,
  onStarted,
  onEnded,
  onInterrupted
} = {}) {
  if (!attempt || !Array.isArray(notes) || notes.length === 0) return null;
  const normalizedNotes = notes
    .filter((note) => Number.isFinite(note?.midi))
    .map((note) => ({
      midi: note.midi,
      delayMs: Number(note.delayMs) || 0,
      child: Boolean(note.child)
    }));
  if (normalizedNotes.length === 0) return null;
  const transaction = beginLs08AudioTransaction(attempt, { context, kind, reason, notes: normalizedNotes, payload, phase });
  const playback = playTeachingPianoSequence({
    reason: `${context}:${reason}`,
    notes: normalizedNotes.map((note) => ({
      frequency: midiFrequency(note.midi),
      gain: note.child ? 0.10 : 0.13,
      durationMs: LS08_NOTE_DURATION_MS,
      delayMs: note.delayMs
    })),
    onStarted: (handle) => {
      if (attempt.audioTransaction !== transaction || transaction.endedAt || transaction.interruptedAt) return;
      transaction.scheduledAt = handle.scheduledAt || transaction.scheduledAt;
      transaction.startedAt = handle.startedAt;
      transaction.playbackId = handle.id;
      transaction.startAudioTime = handle.startAudioTime;
      transaction.contextState = handle.contextState;
      traceLs08(attempt, kind || "pair", {
        reason,
        midis: normalizedNotes.map((note) => note.midi),
        scheduledDelaysMs: normalizedNotes.map((note) => note.delayMs),
        scheduledAt: transaction.scheduledAt,
        startedAt: transaction.startedAt,
        pairIndex: attempt.pairIndex
      });
      onStarted?.(transaction, handle);
      persistLs08Attempt();
      renderGardenScreen();
    },
    onEnded: (handle) => {
      if (attempt.audioTransaction !== transaction) return;
      transaction.scheduledAt = handle.scheduledAt || transaction.scheduledAt;
      transaction.endAudioTime = handle.endAudioTime;
      transaction.contextState = handle.contextState;
      finishLs08AudioTransaction(attempt, onEnded, handle.endedAt);
    },
    onInterrupted: (handle, interruptionReason) => {
      if (attempt.audioTransaction !== transaction || transaction.endedAt) return;
      transaction.scheduledAt = handle.scheduledAt || transaction.scheduledAt;
      transaction.interruptedAt = handle.interruptedAt || new Date().toISOString();
      transaction.playbackId = handle.id;
      transaction.interruptedAudioTime = handle.interruptedAudioTime;
      transaction.contextState = handle.contextState;
      onInterrupted?.(transaction, handle, interruptionReason);
      enterLs08SoundPause(attempt, context, `teaching-${interruptionReason}`);
    }
  });
  transaction.playbackId = playback.id;
  return { playback, transaction };
}

function playLs08Guide({ replay = false } = {}) {
  const attempt = ensureLs08Attempt();
  if (!attempt || state.screen !== "garden") return;
  clearLs08Timers();
  attempt.phase = attempt.guideIndex === 0 ? "guide-first" : "guide-second";
  attempt.guideAudioPlaying = true;
  attempt.guideAwaitingInput = false;
  attempt.pendingGuideReplay = replay;
  attempt.soundPauseContext = null;
  persistLs08Attempt();
  renderGardenScreen();
  const midi = ls08Config.guideMidis[attempt.guideIndex];
  startLs08TeachingSequence(attempt, {
    context: "guide",
    kind: "guide-note",
    reason: replay ? "child-guide-replay" : "guide",
    notes: [{ midi, delayMs: 0 }],
    phase: attempt.phase,
    payload: { replay, guideIndex: attempt.guideIndex },
    onEnded: () => {
      if (!attempt || !["guide-first", "guide-second"].includes(attempt.phase)) return;
      attempt.guideAudioPlaying = false;
      attempt.guideAwaitingInput = true;
      if (attempt.pendingGuideReplay) attempt.guideReplayCount += 1;
      attempt.pendingGuideReplay = false;
      persistLs08Attempt();
      renderGardenScreen();
      state.ls08Timer = setTimeout(() => finishLs08GuideRest("guide-timeout"), LS08_GUIDE_WAIT_MS);
    },
    onInterrupted: () => {
      attempt.guideAudioPlaying = false;
      attempt.guideAwaitingInput = false;
    }
  });
}

function startLs08GuideRepairPlayback(attempt) {
  const targetMidi = ls08Config.guideMidis[attempt?.guideIndex];
  const childMidi = attempt?.pendingGuideWrongMidi;
  if (!attempt || !Number.isFinite(childMidi) || !Number.isFinite(targetMidi)) return false;
  clearLs08Timers();
  attempt.guideAudioPlaying = true;
  attempt.guideAwaitingInput = false;
  attempt.soundPauseContext = null;
  const targetStartMs = ls08SequenceDurationMs([childMidi]) + LS08_REPAIR_GAP_MS;
  const playback = startLs08TeachingSequence(attempt, {
    context: "guide-repair",
    kind: "guide-repair",
    reason: "guide-wrong-then-target",
    notes: [
      { midi: childMidi, delayMs: 0, child: true },
      { midi: targetMidi, delayMs: targetStartMs }
    ],
    phase: attempt.phase,
    payload: { childMidi, targetMidi, guideIndex: attempt.guideIndex },
    onEnded: () => {
      if (!attempt || !["guide-first", "guide-second"].includes(attempt.phase)) return;
      attempt.guideAudioPlaying = false;
      attempt.guideAwaitingInput = true;
      attempt.pendingGuideWrongMidi = null;
      persistLs08Attempt();
      renderGardenScreen();
      state.ls08Timer = setTimeout(() => finishLs08GuideRest("guide-timeout"), LS08_GUIDE_WAIT_MS);
    },
    onInterrupted: () => {
      attempt.guideAudioPlaying = false;
      attempt.guideAwaitingInput = false;
    }
  });
  return Boolean(playback);
}

function storeLs08GuideRun(attempt, { completed, reason }) {
  const session = state.activeSession;
  attempt.guideRuns.push({
    levelId: "LS08",
    bundleId: session?.bundleId || "C3-07",
    sessionId: session?.sessionId || null,
    phaseRole: "guide",
    completed,
    reason,
    guideMode: attempt.guideMode,
    remediationGuide: attempt.remediationGuide,
    evidence: attempt.guideEvidence.map((item) => ({ ...item })),
    completedAt: new Date().toISOString()
  });
}

function storeLs08Resume(attempt, reason) {
  state.chapter3.resume = {
    bundleId: "C3-07",
    nextTargetId: "LS08",
    endedSessionId: state.activeSession?.sessionId || null,
    reason,
    createdAt: new Date().toISOString(),
    ls08Attempt: cloneLs08Attempt(attempt)
  };
  persistChapter3Progress();
}

function finishLs08GuideRest(reason) {
  const attempt = ensureLs08Attempt();
  if (!attempt) return;
  clearLs08Timers();
  storeLs08GuideRun(attempt, { completed: false, reason });
  attempt.phase = "guide-rest";
  state.chapter3.ls08GuideDifficultyStreak = (Number(state.chapter3.ls08GuideDifficultyStreak) || 0) + 1;
  if (state.chapter3.ls08GuideDifficultyStreak >= 2) state.chapter3.ls08RemediationRequired = true;
  storeLs08Resume(attempt, reason);
  recordLs08Outcome({ completed: false, reason: "guide-rest" });
  persistLs08Attempt();
  finishActiveSessionAtRest({ reward: "一个中性根芽", reason: "guide-rest" });
  renderGardenScreen();
  state.ls08FeedbackTimer = setTimeout(() => showMapScreen(), 900);
}

function playLs08Pair(reason = "system-first") {
  const attempt = ensureLs08Attempt();
  const pair = ls08TargetPair(attempt);
  if (!attempt || !pair || state.screen !== "garden") return;
  clearLs08Timers();
  attempt.phase = "pair-playing";
  attempt.pairAudioPlaying = true;
  attempt.pendingPairReplayReason = reason;
  attempt.soundPauseContext = null;
  state.lastInputMidi = null;
  state.lastInputResult = null;
  persistLs08Attempt();
  renderGardenScreen();
  startLs08TeachingSequence(attempt, {
    context: "pair",
    kind: "target-pair",
    reason,
    notes: pair.map((midi, index) => ({ midi, delayMs: index * LS08_PAIR_GAP_MS })),
    phase: "pair-playing",
    payload: { replayReason: reason, pairIndex: attempt.pairIndex },
    onEnded: () => {
      attempt.pairAudioPlaying = false;
      if (attempt.pendingPairReplayReason === "child-replay") {
        attempt.replayCountChild += 1;
        attempt.pairChildReplayCount += 1;
      } else if (["system-replay", "sound-recovery"].includes(attempt.pendingPairReplayReason)) {
        attempt.replayCountSystem += 1;
        attempt.pairSystemReplayCount += 1;
      }
      attempt.pendingPairReplayReason = null;
      attempt.phase = attempt.pairInputs.length === 1 ? "awaiting-second" : "awaiting-first";
      if (!attempt.pairResponseStartedAt) attempt.pairResponseStartedAt = new Date().toISOString();
      persistLs08Attempt();
      renderGardenScreen();
      scheduleLs08ResponseTimeout();
    },
    onInterrupted: () => {
      attempt.pairAudioPlaying = false;
      attempt.pairTimingInterrupted = true;
    }
  });
}

function scheduleLs08ResponseTimeout() {
  if (state.ls08Timer) clearTimeout(state.ls08Timer);
  state.ls08Timer = setTimeout(() => {
    state.ls08Timer = null;
    const attempt = ensureLs08Attempt();
    if (!attempt || !["awaiting-first", "awaiting-second"].includes(attempt.phase)) return;
    attempt.strongCueUsed = true;
    attempt.pairStrongCueUsed = true;
    attempt.targetRevealedBeforeResponse = true;
    attempt.pairTargetRevealedBeforeResponse = true;
    attempt.pairRepairStage = "assisted";
    attempt.assistedCueVisible = true;
    attempt.phase = "assisted";
    persistLs08Attempt();
    renderGardenScreen();
    state.ls08FeedbackTimer = setTimeout(() => {
      state.ls08FeedbackTimer = null;
      if (attempt.phase !== "assisted") return;
      attempt.assistedCueVisible = false;
      persistLs08Attempt();
      renderGardenScreen();
    }, 1250);
    scheduleLs08AssistedTimeout();
  }, CH3_LONG_WAIT_MS);
}

function scheduleLs08AssistedTimeout() {
  if (state.ls08Timer) clearTimeout(state.ls08Timer);
  state.ls08Timer = setTimeout(() => completeLs08Modeled("assisted-timeout"), LS08_ASSISTED_WAIT_MS);
}

function ls08PairRecord(attempt, { modeled = false, visualAssist = false } = {}) {
  const session = state.activeSession;
  return {
    levelId: "LS08",
    bundleId: session?.bundleId || "C3-07",
    sessionId: session?.sessionId || null,
    phaseRole: "check",
    pairIndex: attempt.pairIndex,
    targetMidis: ls08TargetPair(attempt),
    firstCompleteChildResponse: attempt.pairFirstCompleteResponse?.slice() || null,
    inputRoute: attempt.pairFirstCompleteRoute,
    discreteOnsets: attempt.pairDiscreteOnsets.slice(0, 2),
    qualifyingCorrect: Boolean(!modeled && !visualAssist && attempt.pairFirstCompleteResponse && attempt.pairWrongCount === 0 && attempt.pairFirstCompleteResponse.every((midi, index) => midi === ls08TargetPair(attempt)[index])),
    childWholePairReplayCount: attempt.pairChildReplayCount,
    systemWholePairReplayCount: attempt.pairSystemReplayCount,
    separateNoteReplayUsed: false,
    targetRevealedBeforeResponse: Boolean(attempt.pairTargetRevealedBeforeResponse),
    strongCueUsed: Boolean(attempt.pairStrongCueUsed),
    modeled: Boolean(modeled),
    accessibilityVisualAssist: Boolean(visualAssist || attempt.pairAccessibilityVisualAssist),
    experimentalInput: Boolean(attempt.pairExperimentalInput),
    responseMs: !attempt.pairTimingInterrupted && Number.isFinite(attempt.pairFirstCompleteResponseMs) ? attempt.pairFirstCompleteResponseMs : null,
    timingInterrupted: Boolean(attempt.pairTimingInterrupted),
    timingUsedForMastery: false,
    inputEvents: attempt.pairInputEvents.map((event) => ({ ...event }))
  };
}

function ls08StableEligible(attempt) {
  const currentGuide = attempt.guideRuns.some((run) => run.completed && run.sessionId === state.activeSession?.sessionId && !run.remediationGuide);
  return Boolean(attempt.correctCount >= 3 && currentGuide && attempt.replayCountChild <= 1 && !attempt.separateNoteReplayUsed &&
    !attempt.strongCueUsed && !attempt.modeled && !attempt.accessibilityVisualAssist && !attempt.hasExperimentalInput &&
    !attempt.targetRevealedBeforeResponse && !attempt.crossedSessionBoundary);
}

function recordLs08Outcome({ completed, reason }) {
  const attempt = ensureLs08Attempt();
  const session = state.activeSession;
  const action = currentLs08Action();
  if (!attempt || !session || !action || attempt.outcomeRecorded) return null;
  const completedAt = new Date().toISOString();
  const stableCandidate = completed && attempt.lowEchoCompleted && ls08StableEligible(attempt);
  const formalAttempt = {
    kind: "level", id: "LS08", runMode: "check", corrects: attempt.correctCount, wrongs: attempt.totalWrongCount,
    cueStrength: attempt.strongCueUsed || attempt.accessibilityVisualAssist ? "strong" : "soft",
    strongCueFrames: attempt.strongCueUsed || attempt.accessibilityVisualAssist ? 1 : 0,
    inputRoutes: { ...attempt.inputRoutes }, hasExperimentalInput: attempt.hasExperimentalInput,
    assistedSuccesses: attempt.strongCueUsed ? 1 : 0, modeledSuccesses: attempt.modeled ? 1 : 0,
    formalSession: true, sessionId: session.sessionId, bundleId: session.bundleId,
    sessionActionId: action.actionId, localDateKey: session.localDateKey, sessionRole: action.role || "lesson",
    reviewSkillKey: null, requiredReview: false, sessionStartedAt: session.startedAt,
    voluntaryReplay: attempt.replayCountChild > 0
  };
  const retention = completed ? recordRetentionEvidence({ kind: "level", id: "LS08", attempt: formalAttempt, stable: stableCandidate, priorStableCompletions: 0, completedAt }) : { clockValid: false };
  const stable = stableCandidate && retention.clockValid === true;
  const existing = state.learningStats.levels.LS08 || { completions: 0, formalCompletions: 0, stableCompletions: 0 };
  if (completed) {
    existing.completions = (Number(existing.completions) || 0) + 1;
    existing.formalCompletions = (Number(existing.formalCompletions) || 0) + 1;
    if (stable) existing.stableCompletions = (Number(existing.stableCompletions) || 0) + 1;
  }
  existing.needsPractice = !stable;
  existing.todayNeedsPractice = !stable;
  existing.lastCompletedAt = completed ? completedAt : existing.lastCompletedAt;
  existing.lastResponse = `${attempt.correctCount}/4 首次完整回答正确`;
  existing.lastAttempt = {
    completedAt, completed, reason, correctCount: attempt.correctCount, neutralProgress: attempt.neutralProgress,
    replayCountChild: attempt.replayCountChild, replayCountSystem: attempt.replayCountSystem,
    separateNoteReplayUsed: attempt.separateNoteReplayUsed, strongCueUsed: attempt.strongCueUsed,
    modeled: attempt.modeled, accessibilityVisualAssist: attempt.accessibilityVisualAssist,
    hasExperimentalInput: attempt.hasExperimentalInput, crossedSessionBoundary: attempt.crossedSessionBoundary,
    guideRuns: attempt.guideRuns.map((run) => ({ ...run })), scoredPairs: attempt.scoredPairs.map((pair) => ({ ...pair })),
    storyEvents: attempt.storyEvents.map((event) => ({ ...event }))
  };
  state.learningStats.levels.LS08 = existing;
  saveLearningStats();
  const completion = {
    actionId: action.actionId, kind: "garden-listening", targetId: "LS08", runMode: "check", completedAt,
    completed, reason, correctCount: attempt.correctCount, stable, retained: false,
    replayCountChild: attempt.replayCountChild, replayCountSystem: attempt.replayCountSystem,
    separateNoteReplayUsed: attempt.separateNoteReplayUsed, strongCueUsed: attempt.strongCueUsed,
    modeled: attempt.modeled, accessibilityVisualAssist: attempt.accessibilityVisualAssist,
    hasExperimentalInput: attempt.hasExperimentalInput, crossedSessionBoundary: attempt.crossedSessionBoundary,
    guideRuns: attempt.guideRuns.map((run) => ({ ...run })), sequence: attempt.sequence.map((pair) => pair.slice()),
    scoredPairs: attempt.scoredPairs.map((pair) => ({ ...pair })), storyEvents: attempt.storyEvents.map((event) => ({ ...event }))
  };
  attempt.outcomeRecorded = true;
  session.completedActions.push(completion);
  state.chapter3.ls08Attempts.push({ ...completion, sessionId: session.sessionId });
  state.chapter3.ls08Attempts = state.chapter3.ls08Attempts.slice(-20);
  if (completed) {
    state.chapter3.ls08Completed = true;
    state.chapter3.completed = true;
    state.chapter3.ls08PartialRest = null;
    state.chapter3.resume = null;
    state.chapter3.lessonEvidence.LS08 = { ...completion, sessionId: session.sessionId, bundleId: session.bundleId };
  } else {
    state.chapter3.ls08PartialRest = { createdAt: completedAt, sessionId: session.sessionId, reason, neutralProgress: attempt.neutralProgress, strongCueUsed: attempt.strongCueUsed, modeled: attempt.modeled, needsPractice: true };
  }
  persistChapter3Progress();
  persistLs08Attempt();
  return completion;
}

function finishLs08Session({ completed, reason }) {
  const attempt = ensureLs08Attempt();
  if (!attempt) return;
  clearLs08Timers();
  recordLs08Outcome({ completed, reason });
  finishActiveSessionAtRest({ reward: completed ? ls08Config.reward : "根须休息", reason });
  state.ls08FeedbackTimer = setTimeout(() => showMapScreen(), completed ? 1000 : 800);
}

function scheduleLs08NaturalRestAfterEcho(delay = 500) {
  const attempt = ensureLs08Attempt();
  if (!attempt || !attempt.lowEchoCompleted || !attempt.storyEvents.some((event) => event.eventType === "storyEvent" && event.phaseRole === "unscored")) return false;
  if (state.ls08FeedbackTimer) clearTimeout(state.ls08FeedbackTimer);
  state.ls08FeedbackTimer = setTimeout(() => {
    state.ls08FeedbackTimer = null;
    if (!currentLs08Action() || attempt.outcomeRecorded) return;
    finishLs08Session({ completed: true, reason: "natural-rest" });
  }, delay);
  return true;
}

function completeLs08LowEcho() {
  const attempt = ensureLs08Attempt();
  if (!attempt) return;
  if (attempt.lowEchoCompleted) {
    scheduleLs08NaturalRestAfterEcho(350);
    return;
  }
  clearLs08Timers();
  attempt.phase = "unscored-low-echo";
  let event = attempt.storyEvents.find((item) => item.eventType === "storyEvent" && item.phaseRole === "unscored" && item.endedAt == null);
  if (!event) {
    const scheduledAt = new Date().toISOString();
    event = { eventType: "storyEvent", phaseRole: "unscored", midis: [60, 48], scored: false, timingUsedForMastery: false, occurredAt: scheduledAt, scheduledAt, startedAt: null, endedAt: null, interruptedAt: null, playbackAttempts: 0 };
    attempt.storyEvents.push(event);
  }
  attempt.soundPauseContext = null;
  startLs08TeachingSequence(attempt, {
    context: "low-echo",
    kind: "story-event",
    reason: "unscored-low-echo",
    notes: [
      { midi: 60, delayMs: 0 },
      { midi: 48, delayMs: LS08_PAIR_GAP_MS }
    ],
    phase: "unscored-low-echo",
    payload: { storyEventIndex: attempt.storyEvents.indexOf(event) },
    onStarted: (transaction) => {
      event.scheduledAt = transaction.scheduledAt;
      event.startedAt = transaction.startedAt;
      event.interruptedAt = null;
      event.playbackAttempts = (Number(event.playbackAttempts) || 0) + 1;
      attempt.lowEchoStarted = true;
      attempt.lowEchoEndedAt = null;
    },
    onEnded: (transaction) => {
      event.endedAt = transaction.endedAt;
      attempt.lowEchoStarted = false;
      attempt.lowEchoCompleted = true;
      attempt.lowEchoEndedAt = transaction.endedAt;
      persistLs08Attempt();
      renderGardenScreen();
      scheduleLs08NaturalRestAfterEcho(transaction.returnQueued ? 0 : 350);
    },
    onInterrupted: (transaction) => {
      event.interruptedAt = transaction.interruptedAt;
      attempt.lowEchoStarted = false;
      attempt.lowEchoCompleted = false;
      attempt.lowEchoReturnQueued = false;
    }
  });
}

function advanceLs08Pair({ modeled = false, visualAssist = false } = {}) {
  const attempt = ensureLs08Attempt();
  if (!attempt) return;
  const record = ls08PairRecord(attempt, { modeled, visualAssist });
  if (record.qualifyingCorrect && !modeled && !visualAssist) attempt.correctCount += 1;
  attempt.scoredPairs.push(record);
  attempt.pairIndex += 1;
  attempt.neutralProgress = attempt.pairIndex;
  if (attempt.pairIndex >= attempt.sequence.length) {
    attempt.phase = "complete-roots";
    persistLs08Attempt();
    renderGardenScreen();
    state.ls08FeedbackTimer = setTimeout(() => completeLs08LowEcho(), 900);
    return;
  }
  attempt.phase = "correct-feedback";
  persistLs08Attempt();
  renderGardenScreen();
  resetLs08Pair(attempt);
  persistLs08Attempt();
  state.ls08FeedbackTimer = setTimeout(() => playLs08Pair("system-next"), 720);
}

function finalizeLs08Modeled(reason) {
  const attempt = ensureLs08Attempt();
  const pair = ls08TargetPair(attempt);
  if (!attempt || !pair) return;
  attempt.modeledAudioPlaying = false;
  attempt.pendingModeledReason = null;
  attempt.repairAudioPlaying = false;
  attempt.modeled = true;
  attempt.strongCueUsed = true;
  attempt.targetRevealedBeforeResponse = true;
  attempt.pairStrongCueUsed = true;
  attempt.pairTargetRevealedBeforeResponse = true;
  attempt.modeledInputs.push({ pairIndex: attempt.pairIndex, targetMidis: pair.slice(), reason, completedAt: new Date().toISOString() });
  attempt.pendingModeledTargetPlayed = false;
  attempt.phase = "modeled-success";
  advanceLs08Pair({ modeled: true });
  if (attempt.pairIndex < attempt.sequence.length) {
    storeLs08Resume(attempt, reason);
    finishLs08Session({ completed: false, reason: "modeled-safe-rest" });
  }
}

function completeLs08Modeled(reason) {
  const attempt = ensureLs08Attempt();
  const pair = ls08TargetPair(attempt);
  if (!attempt || !pair || attempt.modeledAudioPlaying) return;
  clearLs08Timers();
  if (attempt.pendingModeledTargetPlayed === true) {
    attempt.pendingModeledTargetPlayed = false;
    finalizeLs08Modeled(reason);
    return;
  }
  attempt.soundPauseContext = null;
  attempt.modeledAudioPlaying = true;
  attempt.pendingModeledReason = reason;
  startLs08TeachingSequence(attempt, {
    context: "modeled",
    kind: "modeled-pair",
    reason,
    notes: pair.map((midi, index) => ({ midi, delayMs: index * LS08_PAIR_GAP_MS })),
    phase: "modeled-playing",
    payload: { reason, pairIndex: attempt.pairIndex },
    onEnded: () => finalizeLs08Modeled(attempt.pendingModeledReason || reason),
    onInterrupted: () => {
      attempt.modeledAudioPlaying = false;
      attempt.pairTimingInterrupted = true;
    }
  });
}

function settleLs08WrongFeedback(attempt, { fromReload = false } = {}) {
  if (!attempt || !["wrong-first", "wrong-second", "pair-compare", "assisted"].includes(attempt.phase)) return false;
  const target = ls08TargetPair(attempt);
  const wrongAt = Number.isInteger(attempt.pendingWrongAt) ? attempt.pendingWrongAt : (attempt.phase === "wrong-second" ? 1 : 0);
  const wrongRoute = attempt.pendingWrongRoute;
  attempt.repairAudioPlaying = false;
  attempt.repairReturnQueued = false;
  attempt.pendingWrongAt = null;
  attempt.pendingWrongRoute = null;
  attempt.pairCurrentResponseRoute = null;
  const hasHeldRoute = Object.values(attempt.routeHeldMidi || {}).some((midi) => midi !== null);
  if (!hasHeldRoute) {
    Object.keys(attempt.routeArmed).forEach((route) => { attempt.routeArmed[route] = true; });
    attempt.secondOnsetRequiresFreshRearm = false;
  }
  if (attempt.pairWrongCount >= 3 || attempt.phase === "assisted") {
    attempt.pairInputs = [];
    attempt.assistedCueVisible = attempt.pairRepairStage !== "candidate-outside";
    attempt.phase = "assisted";
    attempt.secondOnsetRequiresFreshRearm = false;
  } else if (wrongAt === 1 && target) {
    attempt.pairInputs = [target[0]];
    attempt.phase = "awaiting-second";
    attempt.secondOnsetRequiresFreshRearm = Boolean(wrongRoute && attempt.routeArmed[wrongRoute] === false);
  } else {
    attempt.pairInputs = [];
    attempt.phase = "awaiting-first";
    attempt.secondOnsetRequiresFreshRearm = false;
  }
  if (fromReload && attempt.pairInputs.length === 1) {
    Object.keys(attempt.routeArmed).forEach((route) => { attempt.routeArmed[route] = false; });
    Object.keys(attempt.routeHeldMidi).forEach((route) => { attempt.routeHeldMidi[route] = null; });
    attempt.secondOnsetRequiresFreshRearm = true;
    attempt.pairTimingInterrupted = true;
  }
  persistLs08Attempt();
  renderGardenScreen();
  if (attempt.phase === "assisted") scheduleLs08AssistedTimeout();
  else scheduleLs08ResponseTimeout();
  return true;
}

function ls08PairCanUseVisibleComparison(pair) {
  return Array.isArray(pair) && pair.length === 2 && pair.every((midi) => ls08Config.candidates.includes(midi));
}

function markLs08WrongRepairPlaybackComplete(attempt) {
  if (!attempt || attempt.pendingRepairReplayCounted) return;
  attempt.pendingRepairReplayCounted = true;
  attempt.replayCountSystem += 1;
  attempt.pairSystemReplayCount += 1;
  traceLs08(attempt, "wrong-repair-ended", { pairIndex: attempt.pairIndex });
}

function startLs08WrongRepairPlayback(attempt) {
  const target = ls08TargetPair(attempt);
  const response = attempt?.pairConfusion?.slice(0, 2) || [];
  if (!attempt || !target || response.length !== 2) return false;
  clearLs08Timers();
  attempt.soundPauseContext = null;
  attempt.pendingRepairReplayCounted = false;
  attempt.repairAudioPlaying = true;
  if (attempt.pairWrongCount >= 4) {
    attempt.phase = "modeled-playing";
    attempt.pendingModeledTargetPlayed = true;
  } else if (attempt.pairWrongCount >= 3) {
    attempt.strongCueUsed = true;
    attempt.pairStrongCueUsed = true;
    attempt.targetRevealedBeforeResponse = true;
    attempt.pairTargetRevealedBeforeResponse = true;
    attempt.pairRepairStage = "assisted";
    attempt.pairInputs = [];
    attempt.assistedCueVisible = true;
    attempt.phase = "assisted";
  } else if (attempt.pairWrongCount === 2) {
    if (ls08PairCanUseVisibleComparison(response) && ls08PairCanUseVisibleComparison(target)) {
      attempt.pairRepairStage = "pair-compare";
      attempt.phase = "pair-compare";
    } else {
      attempt.strongCueUsed = true;
      attempt.pairStrongCueUsed = true;
      attempt.pairRepairStage = "candidate-outside";
      attempt.pairInputs = [];
      attempt.assistedCueVisible = false;
      attempt.phase = "assisted";
    }
  } else {
    attempt.pairRepairStage = attempt.pendingWrongAt === 0 ? "wrong-first" : "wrong-second";
    attempt.phase = attempt.pendingWrongAt === 0 ? "wrong-first" : "wrong-second";
  }
  const targetStartMs = ls08SequenceDurationMs(response) + LS08_REPAIR_GAP_MS;
  const playback = startLs08TeachingSequence(attempt, {
    context: "wrong-repair",
    kind: "child-response-then-target",
    reason: "wrong-repair",
    notes: [
      ...response.map((midi, index) => ({ midi, delayMs: index * LS08_PAIR_GAP_MS, child: true })),
      ...target.map((midi, index) => ({ midi, delayMs: targetStartMs + (index * LS08_PAIR_GAP_MS) }))
    ],
    phase: attempt.phase,
    payload: { response: response.slice(), target: target.slice(), pairIndex: attempt.pairIndex, wrongAt: attempt.pendingWrongAt },
    onEnded: () => {
      markLs08WrongRepairPlaybackComplete(attempt);
      if (attempt.pairWrongCount >= 4) {
        completeLs08Modeled("fourth-wrong");
        return;
      }
      settleLs08WrongFeedback(attempt);
    },
    onInterrupted: () => {
      attempt.repairAudioPlaying = false;
      attempt.pairTimingInterrupted = true;
    }
  });
  return Boolean(playback);
}

function processLs08CompleteResponse(attempt, source) {
  const target = ls08TargetPair(attempt);
  const response = attempt.pairInputs.slice(0, 2);
  const firstComplete = !attempt.pairFirstCompleteResponse;
  if (firstComplete) {
    attempt.pairFirstCompleteResponse = response.slice();
    attempt.pairFirstCompleteRoute = attempt.pairCurrentResponseRoute || source;
    attempt.pairFirstCompleteAt = new Date().toISOString();
    const responseStart = Date.parse(attempt.pairResponseStartedAt || "");
    attempt.pairFirstCompleteResponseMs = !attempt.pairTimingInterrupted && Number.isFinite(responseStart) ? Math.max(0, Date.now() - responseStart) : null;
  }
  const correct = response.every((midi, index) => midi === target[index]);
  if (correct) {
    advanceLs08Pair({ visualAssist: attempt.phase === "visual-assist" });
    return;
  }
  attempt.pairWrongCount += 1;
  attempt.totalWrongCount += 1;
  attempt.pairConfusion = response.slice();
  const wrongAt = response[0] !== target[0] ? 0 : 1;
  attempt.pendingWrongAt = wrongAt;
  attempt.pendingWrongRoute = source;
  startLs08WrongRepairPlayback(attempt);
}

function handleLs08Input(midi, source) {
  const attempt = ensureLs08Attempt();
  if (!attempt || state.chapter3.equipmentState !== "safe-open") return;
  const now = new Date().toISOString();
  if (["guide-ready"].includes(attempt.phase)) {
    attempt.observations.push({ midi, source, phase: attempt.phase, occurredAt: now });
    persistLs08Attempt();
    return;
  }
  if (["guide-first", "guide-second"].includes(attempt.phase)) {
    if (attempt.guideAudioPlaying) {
      attempt.observations.push({ midi, source, phase: attempt.phase, reason: "guide-audio-playing", occurredAt: now });
      persistLs08Attempt();
      return;
    }
    clearLs08Timers();
    const targetMidi = ls08Config.guideMidis[attempt.guideIndex];
    const correct = midi === targetMidi;
    attempt.guideEvidence.push({ levelId: "LS08", bundleId: "C3-07", sessionId: state.activeSession?.sessionId || null, phaseRole: "guide", guideIndex: attempt.guideIndex, targetMidi, inputRoute: source, childInput: midi, correct, repair: attempt.guideRepairStage, playedAt: now, timingUsedForMastery: false });
    if (correct) {
      attempt.guideWrongCount = 0;
      attempt.guideRepairStage = "none";
      if (attempt.guideIndex === 0) {
        attempt.guideIndex = 1;
        persistLs08Attempt();
        renderGardenScreen();
        state.ls08FeedbackTimer = setTimeout(() => playLs08Guide(), attempt.guideMode === "short" ? 320 : 520);
        return;
      }
      attempt.guideCompleted = true;
      storeLs08GuideRun(attempt, { completed: true, reason: "child-guide-complete" });
      state.chapter3.ls08GuideDifficultyStreak = 0;
      if (attempt.remediationGuide) {
        state.chapter3.ls08RemediationRequired = false;
        persistChapter3Progress();
        persistLs08Attempt();
        finishLs08Session({ completed: false, reason: "remediation-guide-complete" });
        return;
      }
      attempt.checkEntered = true;
      persistChapter3Progress();
      persistLs08Attempt();
      renderGardenScreen();
      state.ls08FeedbackTimer = setTimeout(() => playLs08Pair("system-first"), 720);
      return;
    }
    attempt.guideWrongCount += 1;
    if (attempt.guideWrongCount >= 2) {
      persistLs08Attempt();
      finishLs08GuideRest("guide-repeated-wrong");
      return;
    }
    attempt.guideRepairStage = "soft-replay";
    attempt.pendingGuideWrongMidi = midi;
    startLs08GuideRepairPlayback(attempt);
    return;
  }
  if (["pair-playing", "sound-paused", "wrong-first", "wrong-second", "pair-compare", "correct-feedback", "modeled-playing", "modeled-success", "complete-roots", "unscored-low-echo"].includes(attempt.phase)) {
    attempt.observations.push({ midi, source, phase: attempt.phase, occurredAt: now });
    persistLs08Attempt();
    return;
  }
  if (!["awaiting-first", "awaiting-second", "assisted", "visual-assist"].includes(attempt.phase)) return;
  if (attempt.routeArmed[source] === false || (attempt.pairInputs.length === 1 && attempt.pairCurrentResponseRoute && attempt.pairCurrentResponseRoute !== source)) {
    attempt.observations.push({ midi, source, phase: attempt.phase, reason: "not-rearmed", occurredAt: now });
    persistLs08Attempt();
    return;
  }
  clearLs08Timers();
  attempt.routeArmed[source] = false;
  attempt.routeHeldMidi[source] = midi;
  attempt.secondOnsetRequiresFreshRearm = true;
  attempt.inputRoutes[source] = (attempt.inputRoutes[source] || 0) + 1;
  if (source === "麦克风") {
    attempt.hasExperimentalInput = true;
    attempt.pairExperimentalInput = true;
  }
  attempt.pairInputs.push(midi);
  attempt.pairDiscreteOnsets.push(true);
  attempt.pairInputEvents.push({ event: "onset", midi, route: source, accepted: true, position: attempt.pairInputs.length - 1, occurredAt: now });
  attempt.childInputs.push({ midi, source, pairIndex: attempt.pairIndex, position: attempt.pairInputs.length - 1, occurredAt: now });
  state.lastInputMidi = midi;
  state.lastInputResult = "neutral";
  if (attempt.pairInputs.length === 1) {
    attempt.pairCurrentResponseRoute = source;
    attempt.phase = "awaiting-second";
    persistLs08Attempt();
    renderGardenScreen();
    scheduleLs08ResponseTimeout();
    return;
  }
  processLs08CompleteResponse(attempt, source);
}

function releaseLs08Input(midi, source) {
  const attempt = ensureLs08Attempt();
  if (!attempt || !["awaiting-first", "awaiting-second", "wrong-first", "wrong-second", "pair-compare", "assisted", "visual-assist", "sound-paused"].includes(attempt.phase)) return;
  const held = attempt.routeHeldMidi[source];
  if (attempt.routeArmed[source] !== false && held === null) return;
  if (source !== "麦克风" && held !== null && Number.isFinite(Number(midi)) && Number(midi) !== Number(held)) return;
  attempt.routeHeldMidi[source] = null;
  attempt.routeArmed[source] = true;
  attempt.secondOnsetRequiresFreshRearm = false;
  attempt.pairInputEvents.push({ event: "release-rearm", midi: source === "麦克风" ? null : midi, route: source, accepted: true, occurredAt: new Date().toISOString() });
  persistLs08Attempt();
}

function enableLs08VisualAssist() {
  const attempt = ensureLs08Attempt();
  if (!attempt || !(attempt.phase === "assisted" || (attempt.phase === "sound-paused" && attempt.soundPauseCount >= 2))) return;
  clearLs08Timers();
  attempt.accessibilityVisualAssist = true;
  attempt.pairAccessibilityVisualAssist = true;
  attempt.targetRevealedBeforeResponse = true;
  attempt.pairTargetRevealedBeforeResponse = true;
  attempt.phase = "visual-assist";
  attempt.pairInputs = [];
  persistLs08Attempt();
  renderGardenScreen();
}

function resumeLs08Flow({ fromReload = false } = {}) {
  const attempt = ensureLs08Attempt();
  if (!attempt || state.screen !== "garden") return;
  clearLs08Timers();
  if (fromReload && attempt.audioTransaction && !attempt.audioTransaction.endedAt) {
    const context = attempt.audioTransaction.context || "pair";
    attempt.audioTransaction.interruptedAt ||= new Date().toISOString();
    attempt.audioTransaction.contextState = "page-reload";
    if (context === "guide" || context === "guide-repair") {
      attempt.guideAudioPlaying = false;
      attempt.guideAwaitingInput = false;
      attempt.guideReturnQueued = false;
    } else if (context === "pair") {
      attempt.pairAudioPlaying = false;
      attempt.pairReturnQueued = false;
      attempt.pairTimingInterrupted = true;
    } else if (context === "modeled") {
      attempt.modeledAudioPlaying = false;
      attempt.pairTimingInterrupted = true;
    } else if (context === "wrong-repair") {
      attempt.repairAudioPlaying = false;
      attempt.repairReturnQueued = false;
      attempt.pendingRepairReplayCounted = false;
      Object.keys(attempt.routeArmed).forEach((route) => { attempt.routeArmed[route] = false; });
      Object.keys(attempt.routeHeldMidi).forEach((route) => { attempt.routeHeldMidi[route] = null; });
      attempt.secondOnsetRequiresFreshRearm = true;
      attempt.pairTimingInterrupted = true;
    } else if (context === "low-echo") {
      const event = attempt.storyEvents.find((item) => item.eventType === "storyEvent" && item.phaseRole === "unscored" && item.endedAt == null);
      if (event) event.interruptedAt = attempt.audioTransaction.interruptedAt;
      attempt.lowEchoStarted = false;
      attempt.lowEchoCompleted = false;
      attempt.lowEchoReturnQueued = false;
    }
    enterLs08SoundPause(attempt, context, "refresh-interrupted", { increment: false });
    return;
  }
  if (fromReload && attempt.guideAudioPlaying && ["guide-first", "guide-second"].includes(attempt.phase)) {
    attempt.guideAudioPlaying = false;
    attempt.guideAwaitingInput = false;
    attempt.guideReturnQueued = false;
    attempt.soundPauseContext = Number.isFinite(attempt.pendingGuideWrongMidi) ? "guide-repair" : "guide";
    attempt.phase = "sound-paused";
    traceLs08(attempt, "guide-audio-interrupted", { guideIndex: attempt.guideIndex });
    persistLs08Attempt();
    renderGardenScreen();
    return;
  }
  if (fromReload && attempt.pairAudioPlaying && attempt.phase === "pair-playing") {
    attempt.pairAudioPlaying = false;
    attempt.pairReturnQueued = false;
    attempt.pendingPairReplayReason = null;
    attempt.soundPauseContext = "pair";
    attempt.phase = "sound-paused";
    traceLs08(attempt, "target-pair-interrupted", { pairIndex: attempt.pairIndex });
    persistLs08Attempt();
    renderGardenScreen();
    return;
  }
  if (fromReload && attempt.modeledAudioPlaying && attempt.phase === "modeled-playing") {
    attempt.modeledAudioPlaying = false;
    attempt.soundPauseContext = "modeled";
    attempt.phase = "sound-paused";
    traceLs08(attempt, "modeled-audio-interrupted", { pairIndex: attempt.pairIndex });
    persistLs08Attempt();
    renderGardenScreen();
    return;
  }
  if (fromReload && attempt.repairAudioPlaying && ["wrong-first", "wrong-second", "pair-compare", "assisted", "modeled-playing"].includes(attempt.phase)) {
    attempt.repairAudioPlaying = false;
    attempt.repairReturnQueued = false;
    attempt.pendingRepairReplayCounted = false;
    Object.keys(attempt.routeArmed).forEach((route) => { attempt.routeArmed[route] = false; });
    Object.keys(attempt.routeHeldMidi).forEach((route) => { attempt.routeHeldMidi[route] = null; });
    attempt.secondOnsetRequiresFreshRearm = true;
    attempt.soundPauseContext = "wrong-repair";
    attempt.phase = "sound-paused";
    traceLs08(attempt, "wrong-repair-interrupted", { pairIndex: attempt.pairIndex });
    persistLs08Attempt();
    renderGardenScreen();
    return;
  }
  if (["wrong-first", "wrong-second", "pair-compare"].includes(attempt.phase)) {
    settleLs08WrongFeedback(attempt, { fromReload });
    return;
  }
  if (attempt.phase === "modeled-playing") {
    completeLs08Modeled("resume-modeled");
    return;
  }
  if (fromReload && attempt.pairInputs.length === 1) {
    attempt.routeArmed = { "屏幕": false, MIDI: false, "麦克风": false };
    attempt.routeHeldMidi = { "屏幕": null, MIDI: null, "麦克风": null };
    attempt.secondOnsetRequiresFreshRearm = true;
    attempt.pairTimingInterrupted = true;
  }
  if (["awaiting-first", "awaiting-second", "visual-assist", "sound-paused", "assisted"].includes(attempt.phase)) {
    if (attempt.phase === "assisted") attempt.assistedCueVisible = false;
    persistLs08Attempt();
    renderGardenScreen();
    if (attempt.phase === "assisted") scheduleLs08AssistedTimeout();
    else if (["awaiting-first", "awaiting-second"].includes(attempt.phase)) scheduleLs08ResponseTimeout();
    return;
  }
  if (attempt.phase === "complete-roots") {
    persistLs08Attempt();
    renderGardenScreen();
    state.ls08FeedbackTimer = setTimeout(() => completeLs08LowEcho(), 900);
    return;
  }
  if (attempt.phase === "unscored-low-echo") {
    if (!attempt.lowEchoCompleted && attempt.lowEchoStarted) {
      const event = attempt.storyEvents.find((item) => item.eventType === "storyEvent" && item.phaseRole === "unscored" && item.endedAt == null);
      if (event) event.interruptedAt = new Date().toISOString();
      attempt.lowEchoStarted = false;
      attempt.lowEchoReturnQueued = false;
      attempt.soundPauseContext = "low-echo";
      attempt.phase = "sound-paused";
      persistLs08Attempt();
      renderGardenScreen();
      return;
    }
    persistLs08Attempt();
    renderGardenScreen();
    if (attempt.lowEchoCompleted) scheduleLs08NaturalRestAfterEcho(350);
    return;
  }
  if (["guide-first", "guide-second"].includes(attempt.phase) && attempt.guideAwaitingInput) {
    persistLs08Attempt();
    renderGardenScreen();
    state.ls08Timer = setTimeout(() => finishLs08GuideRest("guide-timeout"), LS08_GUIDE_WAIT_MS);
    return;
  }
  if (!state.audioUnlocked) {
    attempt.phase = attempt.guideCompleted ? "replay-ready" : "guide-ready";
    persistLs08Attempt();
    renderGardenScreen();
    return;
  }
  if (!attempt.guideCompleted) playLs08Guide();
  else playLs08Pair("sound-recovery");
}

function currentChapter4Action(targetId = null) {
  const action = state.chapter4DirectMode
    ? state.chapter4DirectAction
    : (currentSessionAction(state.activeSession) || (state.screen === "chapter4" ? state.chapter4RestView : null));
  if (!action || !["chapter4-listening", "chapter4-keyboard"].includes(action.kind)) return null;
  if (targetId && action.targetId !== targetId) return null;
  return action;
}

function createDirectChapter4Action(levelId) {
  const targetId = levelId === "LP02" ? "LP02" : "LP01";
  const action = {
    actionId: targetId === "LP01" ? chapter4Config.lp01.actionId : chapter4Config.lp02.actionId,
    kind: targetId === "LP01" ? "chapter4-listening" : "chapter4-keyboard",
    targetId,
    runMode: targetId === "LP01" ? "check" : "guided",
    formalSession: false,
    directMode: true
  };
  action.chapter4Attempt = targetId === "LP01"
    ? createLp01Attempt(null, { formalSession: false, directMode: true })
    : createLp02Attempt(null, { formalSession: false, directMode: true });
  return action;
}

function lp01BubbleMappingForSeed(seed) {
  const mappingSeed = hashSessionSeed(`LP01|bubble-mapping|${seed}`);
  const lowFirst = mappingSeed % 2 === 0;
  return lowFirst
    ? { "bubble-1": 48, "bubble-2": 60 }
    : { "bubble-1": 60, "bubble-2": 48 };
}

function lp01SequenceForSeed(seed) {
  const tables = [
    [48, 60, 48, 60],
    [60, 48, 60, 48],
    [48, 60, 60, 48],
    [60, 48, 48, 60]
  ];
  const sequenceSeed = hashSessionSeed(`LP01|target-sequence|${seed}`);
  return tables[(sequenceSeed >>> 8) % tables.length].slice();
}

function resetLp01Call(attempt) {
  attempt.callWrongCount = 0;
  attempt.callRepairStage = "none";
  attempt.callFirstBubbleId = null;
  attempt.callFirstSelectedMidi = null;
  attempt.callFirstInputRoute = null;
  attempt.callFirstResponseMs = null;
  attempt.callChildReplayCount = 0;
  attempt.callSystemReplayCount = 0;
  attempt.callTargetRevealedBeforeResponse = false;
  attempt.callStrongCueUsed = false;
  attempt.callAccessibilityVisualAssist = false;
  attempt.callExperimentalInput = false;
  attempt.callResponseStartedAt = null;
  attempt.callTimingInterrupted = false;
  attempt.callPresentedAt = null;
  attempt.callResolvedByModel = false;
  attempt.callInputEvents = [];
  attempt.pendingSelectedBubbleId = null;
  attempt.pendingSelectedMidi = null;
  attempt.pendingSelectedRoute = null;
  attempt.pendingWrongRepair = null;
  attempt.pendingModeledReason = null;
  attempt.pendingLp01TargetReason = null;
}

function createLp01Attempt(session = state.activeSession, options = {}) {
  const seed = session?.sessionId || options.seed || "C4-01-direct-LP01";
  const attempt = {
    version: 1,
    levelId: "LP01",
    bundleId: chapter4Config.bundleId,
    sessionId: session?.sessionId || null,
    formalSession: options.formalSession ?? Boolean(session),
    directMode: Boolean(options.directMode),
    seed,
    sessionSeed: seed,
    bubbleMapping: lp01BubbleMappingForSeed(seed),
    lowSideSeed: null,
    sequence: lp01SequenceForSeed(seed),
    phase: "lp01-model-ready",
    modelIndex: 0,
    modelCompleted: false,
    modelActiveBubbleId: null,
    modelEvents: [],
    modelReplayCount: 0,
    checkEntered: false,
    callIndex: 0,
    scoredCalls: [],
    presentedCallCount: 0,
    resolvedCallCount: 0,
    unpresentedCallCount: 4,
    correctCount: 0,
    totalWrongCount: 0,
    replayCountChild: 0,
    replayCountSystem: 0,
    strongCueUsed: false,
    modeled: false,
    accessibilityVisualAssist: false,
    hasExperimentalInput: false,
    targetRevealedBeforeResponse: false,
    crossedSessionBoundary: false,
    storyResolvedBySupport: false,
    storyCompletionSource: null,
    needsPractice: false,
    openingReviewRequired: false,
    observations: [],
    audioTrace: [],
    audioTransaction: null,
    outcomeRecorded: false
  };
  attempt.lowSideSeed = Object.entries(attempt.bubbleMapping).find(([, midi]) => midi === 48)?.[0] || "bubble-1";
  resetLp01Call(attempt);
  return attempt;
}

function createLp02Attempt(session = state.activeSession, options = {}) {
  return {
    version: 1,
    levelId: "LP02",
    bundleId: chapter4Config.bundleId,
    sessionId: session?.sessionId || null,
    formalSession: options.formalSession ?? Boolean(session),
    directMode: Boolean(options.directMode),
    phase: options.reconnectRequired ? "lp02-reconnect-ready" : "lp02-guide",
    reconnectRequired: Boolean(options.reconnectRequired),
    reconnectCompleted: !options.reconnectRequired,
    targetMidi: 48,
    firstChildMidi: null,
    firstInputRoute: null,
    firstResponseMs: null,
    firstNoteNameCorrect: null,
    firstRegisterCorrect: null,
    firstWrongOctave: null,
    responseStartedAt: new Date().toISOString(),
    timingInterrupted: false,
    wrongCount: 0,
    lastWrongInput: null,
    noteNameCorrect: false,
    registerCorrect: false,
    wrongOctave: false,
    strongCueUsed: false,
    modeled: false,
    accessibilityVisualAssist: false,
    experimentalInput: false,
    microphoneConfidence: null,
    completionSource: null,
    inputEvents: [],
    observations: [],
    audioTrace: [],
    audioTransaction: null,
    pendingLp02Input: null,
    routeArmed: { "屏幕": true, MIDI: true, "麦克风": true },
    routeHeldMidi: { "屏幕": null, MIDI: null, "麦克风": null },
    outcomeRecorded: false
  };
}

function ensureChapter4Attempt() {
  const action = currentChapter4Action();
  if (!action) return null;
  if (!action.chapter4Attempt) {
    action.chapter4Attempt = action.targetId === "LP01"
      ? createLp01Attempt(state.activeSession, { formalSession: !state.chapter4DirectMode, directMode: state.chapter4DirectMode })
      : createLp02Attempt(state.activeSession, { formalSession: !state.chapter4DirectMode, directMode: state.chapter4DirectMode });
    persistChapter4Attempt();
  }
  return action.chapter4Attempt;
}

function persistChapter4Progress() {
  if (state.chapter4DirectMode) return;
  state.sessionRuntime.chapter4 = state.chapter4;
  saveSessionRuntime(state.sessionRuntime);
}

function persistChapter4Attempt() {
  if (state.chapter4DirectMode) return;
  if (currentChapter4Action()) persistActiveSession();
}

function clearChapter4Timers() {
  if (state.chapter4Timer) clearTimeout(state.chapter4Timer);
  if (state.chapter4FeedbackTimer) clearTimeout(state.chapter4FeedbackTimer);
  state.chapter4Timer = null;
  state.chapter4FeedbackTimer = null;
}

function chapter4TargetMidi(attempt = ensureChapter4Attempt()) {
  if (!attempt) return null;
  if (attempt.levelId === "LP02") return 48;
  return attempt.sequence[attempt.callIndex] ?? null;
}

function traceChapter4(attempt, kind, extra = {}) {
  if (!attempt) return;
  attempt.audioTrace.push({ kind, at: new Date().toISOString(), ...extra });
  attempt.audioTrace = attempt.audioTrace.slice(-120);
}

function beginChapter4AudioTransaction(attempt, { context, kind, reason, midis, durationMs, payload = null, phase, scheduledAt = new Date().toISOString(), startedAt = null }) {
  attempt.audioTransaction = {
    context,
    kind,
    reason,
    midis: midis.slice(),
    durationMs,
    payload,
    scheduledAt,
    startedAt,
    endedAt: null,
    interruptedAt: null,
    playbackId: null,
    startAudioTime: null,
    endAudioTime: null,
    interruptedAudioTime: null,
    contextState: state.sfx?.ctx?.state || "unavailable",
    returnQueued: false,
    returnQueuedConsumedAt: null
  };
  if (phase) attempt.phase = phase;
  persistChapter4Attempt();
  renderChapter4Screen();
  return attempt.audioTransaction;
}

function consumeChapter4QueuedReturn(attempt, transaction = attempt?.audioTransaction) {
  if (!transaction || transaction.returnQueued !== true || transaction.returnQueuedConsumedAt) return false;
  transaction.returnQueued = false;
  transaction.returnQueuedConsumedAt = new Date().toISOString();
  traceChapter4(attempt, "queued-return-consumed", {
    context: transaction.context,
    interruption: Boolean(transaction.interruptedAt)
  });
  persistChapter4Attempt();
  if (state.screen === "chapter4") showMapScreen();
  return true;
}

function finishChapter4AudioTransaction(attempt, onEnded, endedAt = null) {
  const transaction = attempt?.audioTransaction;
  if (!transaction || transaction.endedAt || transaction.interruptedAt) return;
  transaction.endedAt = endedAt || new Date().toISOString();
  traceChapter4(attempt, "transaction-ended", { context: transaction.context, sequenceKind: transaction.kind });
  persistChapter4Attempt();
  const returnQueued = transaction.returnQueued === true;
  onEnded?.(transaction);
  if (returnQueued) consumeChapter4QueuedReturn(attempt, transaction);
}

function enterChapter4SoundPause(attempt, context, reason = "audio-unavailable") {
  const transaction = attempt?.audioTransaction;
  const returnQueued = transaction?.returnQueued === true;
  attempt.phaseBeforeSoundPause = attempt.phase;
  attempt.soundPauseContext = context;
  attempt.phase = "sound-paused";
  if (attempt.audioTransaction && !attempt.audioTransaction.endedAt) {
    attempt.audioTransaction.interruptedAt = new Date().toISOString();
  }
  traceChapter4(attempt, "audio-paused", { context, reason });
  persistChapter4Attempt();
  renderChapter4Screen();
  if (returnQueued) consumeChapter4QueuedReturn(attempt, transaction);
}

function startChapter4TeachingSequence(attempt, {
  context,
  kind,
  reason,
  midis,
  payload = null,
  phase,
  child = false,
  gapMs = 0,
  noteDurationMs = LP01_NOTE_DURATION_MS,
  traceKind = kind,
  onStarted,
  onEnded
} = {}) {
  if (!attempt || !Array.isArray(midis) || midis.length === 0) return null;
  const effectiveGap = gapMs || (noteDurationMs + LP01_REPAIR_GAP_MS);
  const delaysMs = midis.map((_, index) => index * effectiveGap);
  const durationMs = delaysMs.at(-1) + noteDurationMs;
  const transaction = beginChapter4AudioTransaction(attempt, {
    context,
    kind,
    reason,
    midis,
    durationMs,
    payload,
    phase
  });
  const playback = playTeachingPianoSequence({
    reason: `${context}:${reason}`,
    notes: midis.map((midi, index) => ({
      frequency: chapter4NoteForMidi(midi)?.frequency || midiFrequency(midi),
      gain: child ? 0.10 : 0.12,
      durationMs: noteDurationMs,
      delayMs: delaysMs[index]
    })),
    onStarted: (handle) => {
      if (attempt.audioTransaction !== transaction || transaction.endedAt || transaction.interruptedAt) return;
      transaction.scheduledAt = handle.scheduledAt || transaction.scheduledAt;
      transaction.startedAt = handle.startedAt;
      transaction.playbackId = handle.id;
      transaction.startAudioTime = handle.startAudioTime;
      transaction.contextState = handle.contextState;
      traceChapter4(attempt, traceKind || "chapter4-note", {
        reason,
        midis: midis.slice(),
        delaysMs,
        durationMs,
        scheduledAt: transaction.scheduledAt,
        startedAt: transaction.startedAt
      });
      onStarted?.(transaction, handle);
      persistChapter4Attempt();
      renderChapter4Screen();
    },
    onEnded: (handle) => {
      if (attempt.audioTransaction !== transaction) return;
      transaction.scheduledAt = handle.scheduledAt || transaction.scheduledAt;
      transaction.endAudioTime = handle.endAudioTime;
      transaction.contextState = handle.contextState;
      finishChapter4AudioTransaction(attempt, onEnded, handle.endedAt);
    },
    onInterrupted: (handle, interruptionReason) => {
      if (attempt.audioTransaction !== transaction || transaction.endedAt) return;
      transaction.scheduledAt = handle.scheduledAt || transaction.scheduledAt;
      transaction.interruptedAt = handle.interruptedAt || new Date().toISOString();
      transaction.playbackId = handle.id;
      transaction.interruptedAudioTime = handle.interruptedAudioTime;
      transaction.contextState = handle.contextState;
      attempt.timingInterrupted = true;
      enterChapter4SoundPause(attempt, context, `teaching-${interruptionReason}`);
    }
  });
  transaction.playbackId = playback.id;
  return { playback, transaction, durationMs, delaysMs };
}

function lp01BubbleIdForMidi(attempt, midi) {
  return Object.entries(attempt.bubbleMapping).find(([, mappedMidi]) => mappedMidi === midi)?.[0] || null;
}

function startLp01ModelStep(index, { replay = false } = {}) {
  const attempt = ensureChapter4Attempt();
  if (!attempt || attempt.levelId !== "LP01" || state.screen !== "chapter4") return false;
  clearChapter4Timers();
  const bubbleId = replay ? (attempt.modelActiveBubbleId || "bubble-1") : (index === 0 ? "bubble-1" : "bubble-2");
  const midi = attempt.bubbleMapping[bubbleId];
  attempt.modelIndex = index;
  attempt.modelActiveBubbleId = bubbleId;
  const playback = startChapter4TeachingSequence(attempt, {
    context: "lp01-model",
    kind: "model-note",
    reason: replay ? "child-model-replay" : `model-${index + 1}`,
    midis: [midi],
    payload: { index, replay, bubbleId },
    phase: "lp01-model-playing",
    onEnded: (transaction) => {
      attempt.modelEvents.push({ phaseRole: "model", bubbleId, midi, replay, endedAt: new Date().toISOString(), scored: false });
      if (replay) attempt.modelReplayCount += 1;
      if (!replay && index === 0) {
        if (transaction.returnQueued) {
          attempt.modelIndex = 1;
          attempt.phase = "lp01-model-ready";
          persistChapter4Attempt();
          renderChapter4Screen();
          return;
        }
        persistChapter4Attempt();
        state.chapter4FeedbackTimer = setTimeout(() => startLp01ModelStep(1), 320);
        return;
      }
      attempt.modelCompleted = true;
      attempt.phase = "lp01-model";
      attempt.modelActiveBubbleId = null;
      persistChapter4Attempt();
      renderChapter4Screen();
    }
  });
  return Boolean(playback);
}

function beginLp01Check() {
  const attempt = ensureChapter4Attempt();
  if (!attempt || attempt.levelId !== "LP01" || !attempt.modelCompleted || attempt.checkEntered) return;
  attempt.checkEntered = true;
  persistChapter4Attempt();
  playLp01Target("system-first");
}

function playLp01Target(reason = "system-first") {
  const attempt = ensureChapter4Attempt();
  const targetMidi = chapter4TargetMidi(attempt);
  if (!attempt || attempt.levelId !== "LP01" || !Number.isFinite(targetMidi)) return false;
  clearChapter4Timers();
  const previousTransactionReason = attempt.audioTransaction?.context === "lp01-target" && !attempt.audioTransaction.endedAt
    ? (attempt.audioTransaction.payload?.sourceReason || attempt.audioTransaction.payload?.reason)
    : null;
  const sourceReason = reason === "sound-recovery"
    ? (previousTransactionReason || attempt.pendingLp01TargetReason || "system-first")
    : reason;
  const recoveringInterruptedTarget = reason === "sound-recovery";
  attempt.pendingLp01TargetReason = sourceReason;
  const wasPresented = Boolean(attempt.callPresentedAt);
  const playback = startChapter4TeachingSequence(attempt, {
    context: "lp01-target",
    kind: "target",
    reason: sourceReason,
    midis: [targetMidi],
    payload: { sourceReason, recoveringInterruptedTarget },
    phase: "target-playing",
    onStarted: (transaction) => {
      if (!attempt.callPresentedAt) {
        attempt.callPresentedAt = new Date().toISOString();
        attempt.presentedCallCount += 1;
        attempt.unpresentedCallCount = Math.max(0, 4 - attempt.presentedCallCount);
      }
    },
    onEnded: () => {
      if (sourceReason === "child-replay") {
        attempt.replayCountChild += 1;
        attempt.callChildReplayCount += 1;
        if (attempt.replayCountChild > 1) {
          attempt.needsPractice = true;
          attempt.openingReviewRequired = true;
        }
      } else if (sourceReason === "system-replay" || (recoveringInterruptedTarget && wasPresented)) {
        attempt.replayCountSystem += 1;
        attempt.callSystemReplayCount += 1;
      }
      attempt.pendingLp01TargetReason = null;
      attempt.phase = "awaiting-response";
      attempt.soundPauseContext = null;
      if (!attempt.callResponseStartedAt) attempt.callResponseStartedAt = new Date().toISOString();
      persistChapter4Attempt();
      renderChapter4Screen();
      scheduleLp01ResponseTimeout();
    }
  });
  return Boolean(playback);
}

function scheduleLp01ResponseTimeout() {
  if (state.chapter4Timer) clearTimeout(state.chapter4Timer);
  state.chapter4Timer = setTimeout(() => {
    state.chapter4Timer = null;
    const attempt = ensureChapter4Attempt();
    if (!attempt || attempt.levelId !== "LP01" || attempt.phase !== "awaiting-response") return;
    attempt.strongCueUsed = true;
    attempt.callStrongCueUsed = true;
    attempt.targetRevealedBeforeResponse = true;
    attempt.callTargetRevealedBeforeResponse = true;
    attempt.callRepairStage = "assisted";
    attempt.needsPractice = true;
    attempt.phase = "assisted";
    persistChapter4Attempt();
    renderChapter4Screen();
    scheduleLp01AssistedTimeout();
  }, LP01_LONG_WAIT_MS);
}

function scheduleLp01AssistedTimeout() {
  if (state.chapter4Timer) clearTimeout(state.chapter4Timer);
  state.chapter4Timer = setTimeout(() => completeLp01Modeled("assisted-timeout"), LP01_ASSISTED_WAIT_MS);
}

function renderChapter4Progress(attempt) {
  if (!els.chapter4CallProgress) return;
  const total = attempt?.levelId === "LP01" ? 4 : 1;
  const done = attempt?.levelId === "LP01" ? attempt.resolvedCallCount : (attempt?.phase === "lp02-complete" ? 1 : 0);
  els.chapter4CallProgress.innerHTML = Array.from({ length: total }, (_, index) => `<span class="${index < done ? "done" : ""}" aria-hidden="true"></span>`).join("");
  els.chapter4CallProgress.setAttribute("aria-label", attempt?.levelId === "LP01" ? `声音泡泡进度，四次声音比较已解决 ${done} 次` : `低音 C 找家${done ? "已完成" : "进行中"}`);
}

function chapter4SpeechCopy(attempt) {
  if (!attempt) return { kicker: "地下入口", main: "洞口在等你", support: "点入口再出发。" };
  if (attempt.levelId === "LP02") {
    if (attempt.phase === "lp02-reconnect-ready" || attempt.phase === "lp02-reconnect-playing") return { kicker: "先重连两个声音", main: "听听两个 C", support: "我唱 Do。听完再去找下面的 C。" };
    if (attempt.phase === "lp02-middle-c-near-miss") return { kicker: "名字一样", main: "这是中央 C", support: "我也唱 Do，再找下面那个 C 的家。" };
    if (attempt.phase === "lp02-wrong") return attempt.lastWrongInput?.isBlack
      ? { kicker: "换一格找找", main: "刚才按到黑键", support: "再找下面那组两黑键左边的 C。" }
      : { kicker: "换一格找找", main: `刚才是 ${attempt.lastWrongInput?.name || "另一个白键"}`, support: "再找下面那组两黑键左边的 C。" };
    if (attempt.phase === "lp02-assisted") return { kicker: "两黑键帮忙", main: "找下面的 C", support: "我唱 Do。看看下面那组两黑键左边。" };
    if (attempt.phase === "lp02-input-playing") return { kicker: "听琴键唱完", main: "这一声还在唱", support: "等声音停稳，再继续找家。" };
    if (attempt.phase === "lp02-modeled-playing") return { kicker: "星芽一起找", main: "下面的 C 在这里", support: "我唱 Do，第一块地基一起落下。" };
    if (attempt.phase === "lp02-complete") return { kicker: "第一块地基", main: "低音 C 找到家了", support: "我唱 Do。今天先在洞口歇一歇。" };
    if (attempt.phase === "sound-paused") return { kicker: "声音先停住", main: "点重听再继续", support: "刚才的位置和记录都留着。" };
    return { kicker: "低音 C 的家", main: "找下面的 C", support: "两个都叫 Do。找到下面那个 C，按一下。" };
  }
  if (["lp01-model-ready", "lp01-model-playing", "lp01-model"].includes(attempt.phase)) {
    return { kicker: "先听两个声音", main: "声音泡泡住在固定位置", support: "哪个 Do 住得更低？" };
  }
  if (attempt.phase === "target-playing") return { kicker: "听这个声音", main: "等它唱完", support: "唱完再点同一个声音泡泡。" };
  if (attempt.phase === "awaiting-response") return { kicker: "轮到你", main: "刚才是哪一个声音泡泡？", support: "点一下你听到的那个。" };
  if (attempt.phase === "wrong-repair-playing") return { kicker: "再听清楚", main: "先听你选的，再听刚才的", support: "两个泡泡位置都不变。" };
  if (attempt.phase === "pair-compare") return { kicker: "听一听", main: "比较这两个声音泡泡", support: "再找和刚才同一个声音。" };
  if (attempt.phase === "assisted") return { kicker: "星芽轻轻帮忙", main: "看一眼，再听一听", support: "找到和刚才同一个声音泡泡。" };
  if (attempt.phase === "visual-assist") return { kicker: "看着找", main: "这个声音泡泡留在这里", support: "听一听，再点同一个声音。" };
  if (attempt.phase === "correct-feedback") return { kicker: "洞纹亮了一格", main: "这个声音找到了", support: "下一声会重新藏好。" };
  if (attempt.phase === "lp01-complete") return { kicker: "洞口亮起来了", main: "四次回声都安顿好", support: "接着去找低音 C 的家。" };
  if (attempt.phase === "lp01-early-rest" || attempt.phase === "lp01-supported-story-rest") return { kicker: "洞口先亮着", main: "今天做到这里", support: "星芽把洞口安顿好，下次先听一组再找家。" };
  if (attempt.phase === "sound-paused") return { kicker: "声音先停住", main: "点重听再继续", support: "刚才的题和记录都留着。" };
  return { kicker: "地下回声", main: "听一听，再点同一个声音", support: "两个声音泡泡一直住在固定位置。" };
}

function renderChapter4Screen() {
  if (!els.chapter4Panel || state.screen !== "chapter4") return;
  const action = currentChapter4Action();
  const attempt = ensureChapter4Attempt();
  if (!action || !attempt) return;
  const lessonId = action.targetId;
  const phase = attempt.phase;
  if (els.mainTitle) els.mainTitle.textContent = lessonId === "LP01" ? "地下回声洞" : "低音 C 的家";
  if (els.levelBadge) els.levelBadge.textContent = state.chapter4DirectMode ? `${lessonId}·审` : lessonId;
  if (els.appShell) {
    els.appShell.dataset.chapter4Lesson = lessonId;
    els.appShell.dataset.chapter4Phase = phase;
    els.appShell.dataset.chapter4Formal = attempt.formalSession ? "true" : "false";
    els.appShell.dataset.levelId = lessonId;
    els.appShell.dataset.phase = "chapter4";
    els.appShell.dataset.scaffold = phase.includes("assisted") || phase.includes("modeled") ? "strong" : "soft";
  }
  if (els.chapter4Scene) {
    els.chapter4Scene.dataset.chapter4Phase = phase;
    els.chapter4Scene.dataset.audioPlaying = attempt.audioTransaction && !attempt.audioTransaction.endedAt ? "true" : "false";
    els.chapter4Scene.dataset.repairStage = attempt.callRepairStage || (attempt.strongCueUsed ? "assisted" : "none");
  }
  const copy = chapter4SpeechCopy(attempt);
  if (els.chapter4SpeechKicker) els.chapter4SpeechKicker.textContent = copy.kicker;
  if (els.chapter4SpeechMain) els.chapter4SpeechMain.textContent = copy.main;
  if (els.chapter4SpeechSupport) els.chapter4SpeechSupport.textContent = copy.support;
  if (els.chapter4XingyaImage && els.chapter4XingyaImage.getAttribute("src") !== chapter4CharacterAsset) {
    els.chapter4XingyaImage.setAttribute("src", chapter4CharacterAsset);
  }
  if (els.chapter4Scene) els.chapter4Scene.dataset.characterAssetState = "garden-mode";
  if (els.chapter4CaveRings) {
    const done = attempt.levelId === "LP01" ? attempt.resolvedCallCount : (state.chapter4.lessonEvidence.LP01?.resolvedCallCount || 0);
    els.chapter4CaveRings.innerHTML = Array.from({ length: 4 }, (_, index) => `<span class="${index < done ? "done" : ""}" style="--ring-index:${index}" aria-hidden="true"></span>`).join("");
  }
  if (els.chapter4Foundation) {
    const installed = attempt.levelId === "LP02" && attempt.phase === "lp02-complete";
    els.chapter4Foundation.dataset.installed = installed ? "true" : "false";
    els.chapter4Foundation.dataset.foundationState = installed ? "installed" : "landing-place";
  }
  if (els.chapter4SoundSource) {
    const sourcePhases = new Set([
      "target-playing", "awaiting-response", "response-playing", "wrong", "wrong-repair-playing",
      "pair-compare", "assisted", "visual-assist", "modeled-playing", "correct-feedback"
    ]);
    const recoverySource = phase === "sound-paused" && attempt.soundPauseContext !== "lp01-model";
    els.chapter4SoundSource.hidden = !(attempt.levelId === "LP01" && (sourcePhases.has(phase) || recoverySource));
  }
  renderChapter4Progress(attempt);
  const bubbles = [...(els.chapter4Bubbles?.querySelectorAll(".chapter4-bubble") || [])];
  bubbles.forEach((bubble) => {
    const bubbleId = bubble.dataset.bubbleId;
    bubble.classList.remove("model-active", "assisted-target", "visual-target");
    const targetBubble = attempt.levelId === "LP01" ? lp01BubbleIdForMidi(attempt, chapter4TargetMidi(attempt)) : null;
    if (attempt.levelId === "LP01" && attempt.modelActiveBubbleId === bubbleId && attempt.phase === "lp01-model-playing") bubble.classList.add("model-active");
    if (attempt.levelId === "LP01" && attempt.phase === "assisted" && targetBubble === bubbleId) bubble.classList.add("assisted-target");
    if (attempt.levelId === "LP01" && attempt.phase === "visual-assist" && targetBubble === bubbleId) bubble.classList.add("visual-target");
    bubble.disabled = attempt.levelId !== "LP01" || ["response-playing", "wrong-repair-playing", "modeled-playing", "correct-feedback", "lp01-complete", "lp01-early-rest", "lp01-supported-story-rest", "sound-paused"].includes(phase);
    bubble.setAttribute("aria-label", `声音泡泡 ${bubbleId === "bubble-1" ? "1" : "2"}`);
  });
  if (els.chapter4Replay) {
    const wholeTargetReplay = attempt.levelId === "LP01" && ["awaiting-response", "assisted", "visual-assist"].includes(phase);
    const soundRecovery = phase === "sound-paused";
    els.chapter4Replay.hidden = !(wholeTargetReplay || soundRecovery);
    els.chapter4Replay.disabled = wholeTargetReplay && Boolean(attempt.audioTransaction && !attempt.audioTransaction.endedAt);
  }
  if (els.chapter4StartCheck) {
    const lp01Start = attempt.levelId === "LP01" && ["lp01-model-ready", "lp01-model"].includes(phase);
    const lp02ReconnectStart = attempt.levelId === "LP02" && phase === "lp02-reconnect-ready";
    els.chapter4StartCheck.hidden = !(lp01Start || lp02ReconnectStart);
    els.chapter4StartCheck.textContent = lp02ReconnectStart ? "听两个 C" : (phase === "lp01-model-ready" ? "听两个声音" : "开始听");
  }
  if (els.chapter4VisualAssist) els.chapter4VisualAssist.hidden = !(attempt.levelId === "LP01" && phase === "assisted");
  if (els.chapter4Status) els.chapter4Status.textContent = copy.main;
  if (els.keyboardPanel) els.keyboardPanel.hidden = lessonId !== "LP02";
  if (lessonId === "LP02") renderChapter4Keyboard(attempt);
  else if (els.keyboard) els.keyboard.innerHTML = "";
}

function resumeChapter4Flow({ fromReload = false } = {}) {
  const attempt = ensureChapter4Attempt();
  if (!attempt || state.screen !== "chapter4") return;
  clearChapter4Timers();
  if (fromReload && attempt.audioTransaction && !attempt.audioTransaction.endedAt) {
    attempt.audioTransaction.interruptedAt = new Date().toISOString();
    attempt.callTimingInterrupted = true;
    attempt.timingInterrupted = true;
    enterChapter4SoundPause(attempt, attempt.audioTransaction.context, "refresh-interrupted");
    return;
  }
  renderChapter4Screen();
  if (attempt.phase === "sound-paused") return;
  if (attempt.levelId === "LP01") {
    if (attempt.phase === "lp01-model-ready") {
      if (!state.chapter4DirectMode && state.audioUnlocked) startLp01ModelStep(attempt.modelIndex || 0);
      return;
    }
    if (["wrong", "pair-compare"].includes(attempt.phase)) {
      settleLp01Repair(attempt);
      return;
    }
    if (attempt.phase === "correct-feedback") {
      continueLp01AfterCorrectFeedback(attempt);
      return;
    }
    if (attempt.phase === "lp01-complete") {
      settleLp01Completion(attempt);
      return;
    }
    if (attempt.phase === "awaiting-response") scheduleLp01ResponseTimeout();
    else if (attempt.phase === "assisted") scheduleLp01AssistedTimeout();
    return;
  }
  if (attempt.phase === "lp02-reconnect-ready") {
    if (!state.chapter4DirectMode && state.audioUnlocked) startLp02Reconnect();
    return;
  }
  if (["lp02-middle-c-near-miss", "lp02-wrong"].includes(attempt.phase)) {
    attempt.phase = "lp02-guide";
    persistChapter4Attempt();
    renderChapter4Screen();
    scheduleLp02ResponseTimeout();
    return;
  }
  if (attempt.phase === "lp02-guide") scheduleLp02ResponseTimeout();
  else if (attempt.phase === "lp02-assisted") scheduleLp02AssistedTimeout();
}

function handleChapter4BubbleActivation(bubbleId, route = "touch-bubble") {
  const attempt = ensureChapter4Attempt();
  if (!attempt || attempt.levelId !== "LP01") return;
  const occurredAt = new Date().toISOString();
  if (attempt.phase === "lp01-model-ready") {
    startLp01ModelStep(attempt.modelIndex || 0);
    return;
  }
  if (attempt.phase === "lp01-model") {
    attempt.modelActiveBubbleId = bubbleId;
    startLp01ModelStep(bubbleId === "bubble-1" ? 0 : 1, { replay: true });
    return;
  }
  if (attempt.phase === "target-playing") {
    attempt.observations.push({ event: "early-bubble", bubbleId, route, phase: attempt.phase, occurredAt });
    persistChapter4Attempt();
    return;
  }
  if (!["awaiting-response", "assisted", "visual-assist", "pair-compare", "wrong"].includes(attempt.phase)) return;
  clearChapter4Timers();
  const selectedMidi = attempt.bubbleMapping[bubbleId];
  const targetMidi = chapter4TargetMidi(attempt);
  if (!Number.isFinite(selectedMidi) || !Number.isFinite(targetMidi)) return;
  if (!attempt.callFirstBubbleId) {
    attempt.callFirstBubbleId = bubbleId;
    attempt.callFirstSelectedMidi = selectedMidi;
    attempt.callFirstInputRoute = route;
    const started = Date.parse(attempt.callResponseStartedAt || "");
    attempt.callFirstResponseMs = !attempt.callTimingInterrupted && Number.isFinite(started) ? Math.max(0, Date.now() - started) : null;
  }
  attempt.callInputEvents.push({ event: "bubble-submit", bubbleId, selectedMidi, route, occurredAt });
  attempt.pendingSelectedBubbleId = bubbleId;
  attempt.pendingSelectedMidi = selectedMidi;
  attempt.pendingSelectedRoute = route;
  if (selectedMidi === targetMidi) {
    startLp01CorrectResponsePlayback(attempt);
    return;
  }
  attempt.callWrongCount += 1;
  attempt.totalWrongCount += 1;
  attempt.pendingWrongRepair = { bubbleId, selectedMidi, targetMidi, route, wrongCount: attempt.callWrongCount };
  if (attempt.callWrongCount >= 2) {
    attempt.needsPractice = true;
    attempt.openingReviewRequired = true;
  }
  startLp01WrongRepairPlayback(attempt);
}

function startLp01CorrectResponsePlayback(attempt) {
  const selectedMidi = attempt.pendingSelectedMidi;
  const playback = startChapter4TeachingSequence(attempt, {
    context: "lp01-response",
    kind: "child-selection",
    traceKind: "lp01-child-selection",
    reason: "bubble-submit",
    midis: [selectedMidi],
    payload: { selectedMidi, bubbleId: attempt.pendingSelectedBubbleId, route: attempt.pendingSelectedRoute },
    phase: "response-playing",
    child: true,
    onEnded: () => resolveLp01Call(attempt, { modeled: false })
  });
  return Boolean(playback);
}

function startLp01WrongRepairPlayback(attempt) {
  const repair = attempt?.pendingWrongRepair;
  if (!repair) return false;
  clearChapter4Timers();
  const playback = startChapter4TeachingSequence(attempt, {
    kind: "lp01-wrong-repair",
    context: "lp01-wrong-repair",
    reason: "child-then-target",
    midis: [repair.selectedMidi, repair.targetMidi],
    child: true,
    gapMs: LP01_NOTE_DURATION_MS + LP01_REPAIR_GAP_MS,
    payload: { ...repair },
    phase: "wrong-repair-playing",
    onEnded: () => {
      attempt.replayCountSystem += 1;
      attempt.callSystemReplayCount += 1;
      if (attempt.callWrongCount >= 4) {
        completeLp01Modeled("fourth-wrong", { targetAlreadyPlayed: true });
        return;
      }
      if (attempt.callWrongCount >= 3) {
        attempt.strongCueUsed = true;
        attempt.callStrongCueUsed = true;
        attempt.targetRevealedBeforeResponse = true;
        attempt.callTargetRevealedBeforeResponse = true;
        attempt.callRepairStage = "assisted";
        attempt.phase = "assisted";
        persistChapter4Attempt();
        renderChapter4Screen();
        scheduleLp01AssistedTimeout();
        return;
      }
      attempt.callRepairStage = attempt.callWrongCount === 2 ? "pair-compare" : "wrong";
      attempt.phase = attempt.callWrongCount === 2 ? "pair-compare" : "wrong";
      persistChapter4Attempt();
      renderChapter4Screen();
      state.chapter4FeedbackTimer = setTimeout(() => settleLp01Repair(attempt), attempt.callWrongCount === 2 ? 900 : 650);
    }
  });
  return Boolean(playback);
}

function settleLp01Repair(attempt) {
  if (!attempt || !["wrong", "pair-compare"].includes(attempt.phase)) return;
  attempt.phase = "awaiting-response";
  persistChapter4Attempt();
  renderChapter4Screen();
  scheduleLp01ResponseTimeout();
}

function completeLp01Modeled(reason, { targetAlreadyPlayed = false } = {}) {
  const attempt = ensureChapter4Attempt();
  const targetMidi = chapter4TargetMidi(attempt);
  if (!attempt || attempt.levelId !== "LP01" || !Number.isFinite(targetMidi)) return;
  clearChapter4Timers();
  attempt.needsPractice = true;
  attempt.openingReviewRequired = true;
  attempt.callStrongCueUsed = true;
  attempt.strongCueUsed = true;
  attempt.pendingModeledReason = reason;
  if (targetAlreadyPlayed) {
    attempt.modeled = true;
    attempt.callResolvedByModel = true;
    resolveLp01Call(attempt, { modeled: true, reason });
    return;
  }
  startChapter4TeachingSequence(attempt, {
    context: "lp01-modeled",
    kind: "modeled-target",
    reason,
    midis: [targetMidi],
    payload: { reason },
    phase: "modeled-playing",
    onEnded: () => {
      attempt.modeled = true;
      attempt.callResolvedByModel = true;
      resolveLp01Call(attempt, { modeled: true, reason });
    }
  });
}

function lp01CallRecord(attempt, { modeled = false } = {}) {
  const session = state.activeSession;
  const targetMidi = chapter4TargetMidi(attempt);
  const firstCorrect = attempt.callFirstSelectedMidi === targetMidi;
  const resolvedProgressCount = attempt.resolvedCallCount + 1;
  return {
    levelId: "LP01",
    bundleId: chapter4Config.bundleId,
    sessionId: attempt.formalSession ? (session?.sessionId || attempt.sessionId) : null,
    callIndex: attempt.callIndex,
    targetRegister: targetMidi === 48 ? "low" : "middle",
    targetMidi,
    sessionSeed: attempt.sessionSeed,
    bubbleMapping: { ...attempt.bubbleMapping },
    firstChildBubbleId: attempt.callFirstBubbleId,
    firstChildSelectedMidi: attempt.callFirstSelectedMidi,
    inputRoute: attempt.callFirstInputRoute,
    qualifyingCorrect: Boolean(!modeled && firstCorrect && attempt.callWrongCount === 0 && !attempt.callStrongCueUsed && !attempt.callAccessibilityVisualAssist && !attempt.callExperimentalInput),
    childReplayCount: attempt.callChildReplayCount,
    candidatePreviewUsed: false,
    lowSideSeed: attempt.lowSideSeed === "bubble-1" ? "left" : "right",
    resolvedProgressCount,
    systemReplayCount: attempt.callSystemReplayCount,
    targetRevealedBeforeResponse: Boolean(attempt.callTargetRevealedBeforeResponse),
    strongCueUsed: Boolean(attempt.callStrongCueUsed),
    modeled: Boolean(modeled),
    accessibilityVisualAssist: Boolean(attempt.callAccessibilityVisualAssist),
    experimentalInput: Boolean(attempt.callExperimentalInput),
    responseMs: !attempt.callTimingInterrupted ? attempt.callFirstResponseMs : null,
    timingInterrupted: Boolean(attempt.callTimingInterrupted),
    timingUsedForMastery: false,
    wrongCount: attempt.callWrongCount,
    repairStage: attempt.callRepairStage,
    inputEvents: attempt.callInputEvents.map((event) => ({ ...event }))
  };
}

function resolveLp01Call(attempt, { modeled = false } = {}) {
  if (!attempt || attempt.levelId !== "LP01" || attempt.callIndex >= attempt.sequence.length) return;
  clearChapter4Timers();
  const record = lp01CallRecord(attempt, { modeled });
  attempt.scoredCalls.push(record);
  attempt.resolvedCallCount += 1;
  if (record.qualifyingCorrect) attempt.correctCount += 1;
  attempt.callIndex += 1;
  attempt.unpresentedCallCount = Math.max(0, 4 - attempt.presentedCallCount);
  const shouldRestEarly = attempt.callIndex < 4 && (attempt.callWrongCount >= 2 || attempt.callStrongCueUsed || modeled || attempt.callAccessibilityVisualAssist);
  if (shouldRestEarly) {
    finishLp01EarlyRest(attempt, modeled ? "modeled-safe-rest" : "repeated-repair");
    return;
  }
  if (attempt.callIndex >= attempt.sequence.length) {
    finishLp01Completed(attempt);
    return;
  }
  attempt.phase = "correct-feedback";
  persistChapter4Attempt();
  renderChapter4Screen();
  state.chapter4FeedbackTimer = setTimeout(() => {
    state.chapter4FeedbackTimer = null;
    continueLp01AfterCorrectFeedback(attempt);
  }, 680);
}

function continueLp01AfterCorrectFeedback(attempt) {
  if (!attempt || attempt.levelId !== "LP01" || attempt.phase !== "correct-feedback") return false;
  clearChapter4Timers();
  resetLp01Call(attempt);
  persistChapter4Attempt();
  if (!state.audioUnlocked) {
    enterChapter4SoundPause(attempt, "lp01-target", "resume-target-needs-gesture");
    return false;
  }
  return playLp01Target("system-first");
}

function lp01StableEligible(attempt) {
  return Boolean(attempt.correctCount >= 3 && attempt.replayCountChild <= 1 && !attempt.strongCueUsed && !attempt.modeled &&
    !attempt.accessibilityVisualAssist && !attempt.hasExperimentalInput && !attempt.targetRevealedBeforeResponse &&
    !attempt.crossedSessionBoundary && !attempt.needsPractice && !attempt.openingReviewRequired &&
    attempt.presentedCallCount === 4 && attempt.resolvedCallCount === 4);
}

function recordLp01Outcome(attempt, { reason, storyResolvedBySupport = false } = {}) {
  if (!attempt || attempt.outcomeRecorded) return null;
  const completedAt = new Date().toISOString();
  const played = attempt.presentedCallCount === 4 && attempt.resolvedCallCount === 4;
  const stableCandidate = played && lp01StableEligible(attempt);
  let stable = false;
  if (attempt.formalSession && !state.chapter4DirectMode) {
    const session = state.activeSession;
    const action = currentChapter4Action("LP01");
    const formalAttempt = {
      kind: "level", id: "LP01", runMode: "check", corrects: attempt.correctCount, wrongs: attempt.totalWrongCount,
      cueStrength: attempt.strongCueUsed || attempt.accessibilityVisualAssist ? "strong" : "soft",
      strongCueFrames: attempt.strongCueUsed || attempt.accessibilityVisualAssist ? 1 : 0,
      inputRoutes: { "touch-bubble": attempt.scoredCalls.filter((call) => call.inputRoute?.includes("bubble")).length },
      hasExperimentalInput: attempt.hasExperimentalInput,
      assistedSuccesses: attempt.strongCueUsed ? 1 : 0,
      modeledSuccesses: attempt.modeled ? 1 : 0,
      formalSession: true,
      sessionId: session?.sessionId,
      bundleId: chapter4Config.bundleId,
      sessionActionId: action?.actionId,
      localDateKey: session?.localDateKey,
      sessionRole: action?.role || "lesson",
      reviewSkillKey: null,
      requiredReview: false,
      sessionStartedAt: session?.startedAt,
      voluntaryReplay: attempt.replayCountChild > 0
    };
    const existing = state.learningStats.levels.LP01 || { completions: 0, formalCompletions: 0, stableCompletions: 0 };
    if (played) {
      existing.completions = (Number(existing.completions) || 0) + 1;
      existing.formalCompletions = (Number(existing.formalCompletions) || 0) + 1;
      const retention = recordRetentionEvidence({ kind: "level", id: "LP01", attempt: formalAttempt, stable: stableCandidate, priorStableCompletions: existing.stableCompletions, completedAt });
      stable = stableCandidate && retention.clockValid === true;
      if (stable) existing.stableCompletions = (Number(existing.stableCompletions) || 0) + 1;
      existing.lastCompletedAt = completedAt;
      existing.lastFormalCompletedAt = completedAt;
    }
    existing.needsPractice = !stable;
    existing.todayNeedsPractice = !stable;
    existing.todayNeedsPracticeDate = localDateKeyAt(completedAt);
    existing.lastWrongCount = attempt.totalWrongCount;
    existing.lastResponse = played ? `${attempt.correctCount}/4 首答正确` : `本次做到 ${attempt.resolvedCallCount}/4`;
    existing.lastAttempt = { completedAt, played, stable, reason, scoredCalls: attempt.scoredCalls.map((call) => ({ ...call })) };
    state.learningStats.levels.LP01 = existing;
    saveLearningStats();
  }
  const summary = {
    levelId: "LP01",
    bundleId: chapter4Config.bundleId,
    sessionId: attempt.formalSession ? (state.activeSession?.sessionId || attempt.sessionId) : null,
    completedAt,
    played,
    stable,
    retained: false,
    reason,
    correctCount: attempt.correctCount,
    wrongCount: attempt.totalWrongCount,
    replayCountChild: attempt.replayCountChild,
    replayCountSystem: attempt.replayCountSystem,
    strongCueUsed: attempt.strongCueUsed,
    modeled: attempt.modeled,
    accessibilityVisualAssist: attempt.accessibilityVisualAssist,
    hasExperimentalInput: attempt.hasExperimentalInput,
    presentedCallCount: attempt.presentedCallCount,
    resolvedCallCount: attempt.resolvedCallCount,
    unpresentedCallCount: Math.max(0, 4 - attempt.presentedCallCount),
    storyResolvedBySupport: Boolean(storyResolvedBySupport),
    storyCompletionSource: storyResolvedBySupport ? "xingya-support" : "child-resolved-calls",
    needsPractice: !stable,
    openingReviewRequired: !stable,
    bubbleMapping: { ...attempt.bubbleMapping },
    sequence: attempt.sequence.slice(),
    scoredCalls: attempt.scoredCalls.map((call) => ({ ...call }))
  };
  attempt.storyResolvedBySupport = summary.storyResolvedBySupport;
  attempt.storyCompletionSource = summary.storyCompletionSource;
  attempt.outcomeRecorded = true;
  if (attempt.formalSession && !state.chapter4DirectMode) {
    state.chapter4.lessonEvidence.LP01 = summary;
    state.chapter4.lp01Attempts.push(summary);
    state.chapter4.lp01Attempts = state.chapter4.lp01Attempts.slice(-20);
    if (!stable && !state.chapter4.openingReviewQueue.includes("LP01")) state.chapter4.openingReviewQueue.push("LP01");
    const session = state.activeSession;
    if (session) session.completedActions.push({ actionId: chapter4Config.lp01.actionId, kind: "chapter4-listening", targetId: "LP01", ...summary });
    persistChapter4Progress();
    persistChapter4Attempt();
  }
  return summary;
}

function finishLp01Completed(attempt) {
  recordLp01Outcome(attempt, { reason: "lp01-complete", storyResolvedBySupport: false });
  attempt.phase = "lp01-complete";
  persistChapter4Attempt();
  renderChapter4Screen();
  if (state.chapter4DirectMode) return;
  const needsRest = attempt.needsPractice || attempt.strongCueUsed || attempt.modeled || attempt.accessibilityVisualAssist;
  state.chapter4FeedbackTimer = setTimeout(() => {
    state.chapter4FeedbackTimer = null;
    settleLp01Completion(attempt, { needsRest });
  }, 900);
}

function settleLp01Completion(attempt, { needsRest = null } = {}) {
  if (!attempt || attempt.levelId !== "LP01" || attempt.phase !== "lp01-complete" || state.chapter4DirectMode) return false;
  clearChapter4Timers();
  const shouldRest = needsRest ?? Boolean(attempt.needsPractice || attempt.strongCueUsed || attempt.modeled || attempt.accessibilityVisualAssist);
  if (shouldRest) finishLp01EarlyRest(attempt, "lp01-difficult-complete", { alreadyRecorded: true });
  else advanceChapter4ToLp02();
  return true;
}

function finishLp01EarlyRest(attempt, reason, { alreadyRecorded = false } = {}) {
  if (!attempt || state.chapter4DirectMode) {
    if (attempt) {
      attempt.phase = "lp01-supported-story-rest";
      renderChapter4Screen();
    }
    return;
  }
  clearChapter4Timers();
  attempt.storyResolvedBySupport = true;
  attempt.storyCompletionSource = "xingya-support";
  attempt.needsPractice = true;
  attempt.openingReviewRequired = true;
  if (!alreadyRecorded) recordLp01Outcome(attempt, { reason, storyResolvedBySupport: true });
  else {
    const summary = state.chapter4.lessonEvidence.LP01;
    if (summary) {
      summary.storyResolvedBySupport = true;
      summary.storyCompletionSource = "xingya-support";
      summary.needsPractice = true;
      summary.openingReviewRequired = true;
      summary.stable = false;
      summary.reason = reason;
    }
    const sessionId = state.activeSession?.sessionId || attempt.sessionId || null;
    const skillKey = evidenceSkillKey("level", "LP01");
    const staleStableEvents = state.learningStats.retention.stableEvents.filter((event) => event.skillKey === skillKey && event.sessionId === sessionId);
    if (staleStableEvents.length) {
      state.learningStats.retention.stableEvents = state.learningStats.retention.stableEvents.filter((event) => !(event.skillKey === skillKey && event.sessionId === sessionId));
      state.learningStats.retention.retainedEvents = state.learningStats.retention.retainedEvents.filter((event) => !(event.skillKey === skillKey && event.sessionId === sessionId));
    }
    const existing = state.learningStats.levels.LP01;
    if (existing) {
      if (staleStableEvents.length) existing.stableCompletions = Math.max(0, (Number(existing.stableCompletions) || 0) - staleStableEvents.length);
      existing.needsPractice = true;
      existing.todayNeedsPractice = true;
      existing.todayNeedsPracticeDate = localDateKeyAt();
      if (existing.lastAttempt) {
        existing.lastAttempt.stable = false;
        existing.lastAttempt.needsPractice = true;
        existing.lastAttempt.reason = reason;
      }
      saveLearningStats();
    }
    if (!state.chapter4.openingReviewQueue.includes("LP01")) state.chapter4.openingReviewQueue.push("LP01");
    const completedAction = state.activeSession?.completedActions.find((action) => action.targetId === "LP01" && (!sessionId || action.sessionId === sessionId));
    if (completedAction && summary) {
      Object.assign(completedAction, {
        ...summary,
        stable: false,
        needsPractice: true,
        openingReviewRequired: true,
        storyResolvedBySupport: true,
        storyCompletionSource: "xingya-support",
        reason
      });
    }
  }
  attempt.phase = attempt.presentedCallCount < 4 ? "lp01-supported-story-rest" : "lp01-early-rest";
  state.chapter4.resume = {
    bundleId: chapter4Config.bundleId,
    nextTargetId: "LP02",
    endedSessionId: state.activeSession?.sessionId || null,
    reconnectRequired: true,
    createdAt: new Date().toISOString(),
    lp01Summary: { ...state.chapter4.lessonEvidence.LP01 }
  };
  persistChapter4Progress();
  persistChapter4Attempt();
  const action = currentChapter4Action();
  state.chapter4RestView = action ? { ...action, chapter4Attempt: JSON.parse(JSON.stringify(attempt)) } : null;
  finishActiveSessionAtRest({ reward: "发光洞口", reason: "lp01-early-rest" });
  renderChapter4Screen();
  state.chapter4FeedbackTimer = setTimeout(() => showMapScreen(), 1000);
}

function advanceChapter4ToLp02() {
  if (state.chapter4DirectMode) return;
  const session = state.activeSession;
  if (!session || session.bundleId !== chapter4Config.bundleId) return;
  const nextIndex = session.actions.findIndex((action) => action.targetId === "LP02");
  if (nextIndex < 0) return;
  session.actionIndex = nextIndex;
  const action = session.actions[nextIndex];
  action.chapter4Attempt = createLp02Attempt(session);
  persistActiveSession();
  state.chapter4RestView = null;
  showChapter4Screen();
}

function startLp02Reconnect() {
  const attempt = ensureChapter4Attempt();
  if (!attempt || attempt.levelId !== "LP02") return false;
  clearChapter4Timers();
  const playback = startChapter4TeachingSequence(attempt, {
    context: "lp02-reconnect",
    kind: "unscored-reconnect",
    reason: "resume-unscored-model",
    midis: [60, 48],
    gapMs: LP01_NOTE_DURATION_MS + LP01_REPAIR_GAP_MS,
    phase: "lp02-reconnect-playing",
    onEnded: () => {
      attempt.reconnectCompleted = true;
      attempt.phase = "lp02-guide";
      attempt.responseStartedAt = new Date().toISOString();
      persistChapter4Attempt();
      renderChapter4Screen();
      scheduleLp02ResponseTimeout();
    }
  });
  return Boolean(playback);
}

function renderChapter4Keyboard(attempt) {
  if (!els.keyboard) return;
  els.keyboard.innerHTML = "";
  els.keyboard.className = "keyboard chapter4-keyboard";
  els.keyboard.dataset.targetVisible = ["lp02-assisted", "lp02-modeled-playing"].includes(attempt.phase) ? "true" : "false";
  const assistTarget = ["lp02-assisted", "lp02-modeled-playing"].includes(attempt.phase);
  const pendingMidi = attempt.phase === "lp02-input-playing" ? Number(attempt.pendingLp02Input?.midi) : null;
  const showCommittedWrong = attempt.phase !== "lp02-input-playing" && state.lastInputResult === "wrong";
  chapter4WhiteMidis.forEach((midi, index) => {
    const note = chapter4NoteForMidi(midi);
    const key = document.createElement("button");
    key.className = "white-key";
    key.type = "button";
    key.dataset.midi = String(midi);
    key.dataset.note = note.name;
    key.style.left = `${(index / 14) * 100}%`;
    if (assistTarget && midi === 48) key.classList.add("lp02-assist-target");
    if (midi === pendingMidi) key.classList.add("lp02-current-playing");
    if (showCommittedWrong && midi === state.lastInputMidi) key.classList.add("hit-wrong");
    const label = midi === 48 ? "低音 C" : (midi === 60 ? "中央 C" : note.name);
    key.setAttribute("aria-label", `${label}，${note.locator}`);
    key.innerHTML = `<span><strong>${note.name}</strong>${midi === 48 ? "<small>低音</small>" : (midi === 60 ? "<small>中央</small>" : "")}</span>`;
    bindChapter4KeyboardKey(key, note);
    els.keyboard.appendChild(key);
  });
  chapter4BlackMidis.forEach((midi) => {
    const note = chapter4NoteForMidi(midi);
    const lowerWhiteIndex = chapter4WhiteMidis.filter((whiteMidi) => whiteMidi < midi).length;
    const key = document.createElement("button");
    key.className = "black-key";
    key.type = "button";
    key.dataset.midi = String(midi);
    key.style.left = `${(lowerWhiteIndex / 14) * 100}%`;
    if (midi === pendingMidi) key.classList.add("lp02-current-playing");
    if (showCommittedWrong && midi === state.lastInputMidi) key.classList.add("hit-wrong");
    key.setAttribute("aria-label", `黑键，${note.locator}`);
    bindChapter4KeyboardKey(key, note);
    els.keyboard.appendChild(key);
  });
  syncLs08RenderedPointerState();
}

function bindChapter4KeyboardKey(key, note) {
  key.addEventListener("pointerdown", (event) => {
    const startsNewPress = beginLs08PointerActivation(note.midi, event);
    try { key.setPointerCapture?.(event.pointerId); } catch (error) { /* Document-level release remains authoritative. */ }
    if (startsNewPress) {
      beginKeyboardPress(key);
      showKeyPressRipple(key);
    }
    handleChapter4Input(note.midi, "屏幕", { activation: "pointer", startsNewPress });
  });
  key.addEventListener("pointerup", (event) => {
    if (ls08DocumentReleaseEvents.has(event)) return;
    const activation = endLs08PointerActivation(note.midi, event);
    if (activation.tracked && activation.removed) {
      syncLs08RenderedPointerState();
      if (activation.shouldRelease) releaseGardenInput(note.midi, "屏幕");
    }
  });
  key.addEventListener("pointercancel", (event) => {
    if (ls08DocumentReleaseEvents.has(event)) return;
    const activation = endLs08PointerActivation(note.midi, event);
    if (activation.tracked && activation.removed) {
      syncLs08RenderedPointerState();
      if (activation.shouldRelease) releaseGardenInput(note.midi, "屏幕");
    }
  });
  key.addEventListener("click", (event) => {
    if (consumeLs08PointerClick(note.midi, event)) return;
    beginKeyboardPress(key);
    showKeyPressRipple(key);
    handleChapter4Input(note.midi, "屏幕", { activation: "accessible-click", startsNewPress: true });
    releaseGardenInput(note.midi, "屏幕");
    releaseKeyboardPress(key);
  });
}

function scheduleLp02ResponseTimeout() {
  if (state.chapter4Timer) clearTimeout(state.chapter4Timer);
  state.chapter4Timer = setTimeout(() => {
    state.chapter4Timer = null;
    const attempt = ensureChapter4Attempt();
    if (!attempt || attempt.levelId !== "LP02" || attempt.phase !== "lp02-guide") return;
    attempt.strongCueUsed = true;
    attempt.phase = "lp02-assisted";
    persistChapter4Attempt();
    renderChapter4Screen();
    scheduleLp02AssistedTimeout();
  }, LP02_LONG_WAIT_MS);
}

function scheduleLp02AssistedTimeout() {
  if (state.chapter4Timer) clearTimeout(state.chapter4Timer);
  state.chapter4Timer = setTimeout(() => completeLp02Modeled("assisted-timeout"), LP02_ASSISTED_WAIT_MS);
}

function createLp02PendingInput(attempt, midi, source, meta, occurredAt) {
  const responseStartedAt = Date.parse(attempt.responseStartedAt || "");
  return {
    midi,
    source,
    activation: meta.activation || null,
    phase: attempt.phase,
    occurredAt,
    responseMs: !attempt.timingInterrupted && Number.isFinite(responseStartedAt)
      ? Math.max(0, Date.now() - responseStartedAt)
      : null,
    onsetRecorded: false,
    external: source === "麦克风"
  };
}

function recordLp02InputOnset(attempt, pending, startedAt = new Date().toISOString()) {
  if (!attempt || !pending || pending.onsetRecorded) return;
  const note = chapter4NoteForMidi(pending.midi);
  attempt.inputEvents.push({
    event: "onset",
    midi: pending.midi,
    pitchName: note?.pitchName || null,
    isBlack: Boolean(note?.isBlack),
    route: pending.source,
    occurredAt: pending.occurredAt,
    audioStartedAt: startedAt
  });
  pending.onsetRecorded = true;
}

function commitLp02PendingInput(attempt) {
  const pending = attempt?.pendingLp02Input;
  if (!attempt || !pending || attempt.outcomeRecorded) return;
  attempt.pendingLp02Input = null;
  const { midi, source, occurredAt, responseMs } = pending;
  const note = chapter4NoteForMidi(midi);
  const firstScoredInput = !attempt.firstInputRoute && source !== "麦克风";
  if (firstScoredInput) {
    attempt.firstChildMidi = midi;
    attempt.firstInputRoute = source;
    attempt.firstResponseMs = responseMs;
  }
  state.lastInputMidi = midi;
  if (source === "麦克风") {
    attempt.experimentalInput = true;
    attempt.microphoneConfidence = midi === 48 ? "confirmed" : (midi === 60 ? "octave-ambiguous" : "uncertain");
    if (midi === 48) {
      attempt.firstChildMidi ??= midi;
      attempt.firstInputRoute ??= source;
      if (attempt.firstResponseMs === null) attempt.firstResponseMs = responseMs;
      if (attempt.firstNoteNameCorrect === null) {
        attempt.firstNoteNameCorrect = true;
        attempt.firstRegisterCorrect = true;
        attempt.firstWrongOctave = false;
      }
      attempt.noteNameCorrect = true;
      attempt.registerCorrect = true;
      attempt.strongCueUsed = true;
      finalizeLp02Completion(attempt, { source: "microphone-assisted", modeled: false });
    } else {
      attempt.phase = pending.phase === "lp02-assisted" ? "lp02-assisted" : "lp02-guide";
      attempt.observations.push({ event: "microphone-unscored", midi, classification: attempt.microphoneConfidence, occurredAt });
      persistChapter4Attempt();
      renderChapter4Screen();
      if (attempt.phase === "lp02-assisted") scheduleLp02AssistedTimeout();
      else scheduleLp02ResponseTimeout();
    }
    return;
  }
  if (midi === 48) {
    if (firstScoredInput) {
      attempt.firstNoteNameCorrect = true;
      attempt.firstRegisterCorrect = true;
      attempt.firstWrongOctave = false;
    }
    attempt.noteNameCorrect = true;
    attempt.registerCorrect = true;
    attempt.wrongOctave = false;
    state.lastInputResult = "correct";
    finalizeLp02Completion(attempt, { source, modeled: false });
    return;
  }
  state.lastInputResult = "wrong";
  attempt.wrongCount += 1;
  attempt.noteNameCorrect = Boolean(!note?.isBlack && note?.name === "C");
  attempt.registerCorrect = false;
  attempt.wrongOctave = midi === 60;
  attempt.lastWrongInput = { midi, pitchName: note?.pitchName || null, name: note?.name || null, isBlack: Boolean(note?.isBlack), locator: note?.locator || "" };
  if (firstScoredInput) {
    attempt.firstNoteNameCorrect = attempt.noteNameCorrect;
    attempt.firstRegisterCorrect = false;
    attempt.firstWrongOctave = attempt.wrongOctave;
  }
  attempt.inputEvents.push({
    event: "wrong-home",
    midi,
    pitchName: note?.pitchName || null,
    isBlack: Boolean(note?.isBlack),
    childIdentity: note?.isBlack ? "黑键" : note?.name,
    noteNameCorrect: attempt.noteNameCorrect,
    registerCorrect: false,
    occurredAt
  });
  if (attempt.wrongCount >= 3) {
    attempt.strongCueUsed = true;
    completeLp02Modeled("repeated-repair");
    return;
  }
  if (attempt.wrongCount >= 2) {
    attempt.strongCueUsed = true;
    attempt.phase = "lp02-assisted";
    persistChapter4Attempt();
    renderChapter4Screen();
    scheduleLp02AssistedTimeout();
    return;
  }
  attempt.phase = midi === 60 ? "lp02-middle-c-near-miss" : "lp02-wrong";
  persistChapter4Attempt();
  renderChapter4Screen();
  state.chapter4FeedbackTimer = setTimeout(() => {
    state.chapter4FeedbackTimer = null;
    attempt.phase = "lp02-guide";
    persistChapter4Attempt();
    renderChapter4Screen();
    scheduleLp02ResponseTimeout();
  }, 900);
}

function beginLp02InputTransaction(attempt, pending, { recovery = false } = {}) {
  if (!attempt || !pending) return false;
  clearChapter4Timers();
  attempt.pendingLp02Input = pending;
  const traceReason = pending.source === "MIDI"
    ? (recovery ? "midi-local-monitor-recovery" : "midi-local-monitor")
    : (recovery ? "sound-recovery-child-key" : (pending.activation || "screen"));
  const playback = startChapter4TeachingSequence(attempt, {
    context: "lp02-child-input",
    kind: "child-key",
    reason: traceReason,
    midis: [pending.midi],
    payload: { ...pending },
    phase: "lp02-input-playing",
    child: true,
    noteDurationMs: LP02_CHILD_NOTE_DURATION_MS,
    onStarted: (transaction) => {
      if (recovery || pending.releaseRequested) {
        attempt.routeArmed[pending.source] = true;
        attempt.routeHeldMidi[pending.source] = null;
      } else {
        attempt.routeArmed[pending.source] = false;
        attempt.routeHeldMidi[pending.source] = pending.midi;
      }
      recordLp02InputOnset(attempt, pending, transaction.startedAt);
    },
    onEnded: () => commitLp02PendingInput(attempt)
  });
  return Boolean(playback);
}

function beginLp02ExternalInputTransaction(attempt, pending) {
  if (!attempt || !pending) return false;
  clearChapter4Timers();
  attempt.pendingLp02Input = pending;
  attempt.routeArmed[pending.source] = false;
  attempt.routeHeldMidi[pending.source] = pending.midi;
  const occurredAt = new Date().toISOString();
  beginChapter4AudioTransaction(attempt, {
    context: "lp02-external-input",
    kind: "external-child-key",
    reason: "microphone-gate-accepted",
    midis: [pending.midi],
    durationMs: LP02_EXTERNAL_INPUT_MAX_MS,
    payload: { ...pending, requiresQuietEnd: true },
    phase: "lp02-input-playing",
    scheduledAt: occurredAt,
    startedAt: occurredAt
  });
  state.chapter4Timer = setTimeout(() => {
    state.chapter4Timer = null;
    const transaction = attempt.audioTransaction;
    if (!transaction || transaction.endedAt || transaction.context !== "lp02-external-input") return;
    attempt.timingInterrupted = true;
    enterChapter4SoundPause(attempt, "lp02-external-input", "external-input-release-timeout");
  }, LP02_EXTERNAL_INPUT_MAX_MS);
  return true;
}

function handleChapter4Input(midi, source, meta = {}) {
  const attempt = ensureChapter4Attempt();
  if (!attempt) return;
  const now = new Date().toISOString();
  if (attempt.levelId === "LP01") {
    attempt.observations.push({ event: "non-scoring-note", midi, source, phase: attempt.phase, occurredAt: now });
    if (source === "麦克风" || source === "MIDI") {
      attempt.hasExperimentalInput = true;
      attempt.callExperimentalInput = true;
    }
    persistChapter4Attempt();
    return;
  }
  if (meta.startsNewPress === false) {
    attempt.observations.push({ event: "not-rearmed", midi, source, phase: attempt.phase, occurredAt: now });
    persistChapter4Attempt();
    return;
  }
  if (!["lp02-guide", "lp02-middle-c-near-miss", "lp02-wrong", "lp02-assisted"].includes(attempt.phase)) {
    attempt.observations.push({ event: "input-blocked", midi, source, phase: attempt.phase, occurredAt: now });
    persistChapter4Attempt();
    return;
  }
  if (attempt.routeArmed[source] === false) {
    attempt.observations.push({ event: "not-rearmed", midi, source, phase: attempt.phase, occurredAt: now });
    persistChapter4Attempt();
    return;
  }
  const pending = createLp02PendingInput(attempt, midi, source, meta, now);
  if (source === "麦克风") beginLp02ExternalInputTransaction(attempt, pending);
  else beginLp02InputTransaction(attempt, pending);
}

function releaseChapter4Input(midi, source) {
  const attempt = ensureChapter4Attempt();
  if (!attempt || attempt.levelId !== "LP02") return;
  const held = attempt.routeHeldMidi[source];
  if (attempt.routeArmed[source] !== false && held === null) {
    if (attempt.phase === "lp02-input-playing" && attempt.pendingLp02Input?.source === source && !attempt.audioTransaction?.startedAt) {
      attempt.pendingLp02Input.releaseRequested = true;
      persistChapter4Attempt();
    }
    return;
  }
  if (source !== "麦克风" && held !== null && Number.isFinite(Number(midi)) && Number(midi) !== Number(held)) return;
  attempt.routeHeldMidi[source] = null;
  attempt.routeArmed[source] = true;
  attempt.inputEvents.push({ event: "release-rearm", midi: source === "麦克风" ? null : midi, route: source, occurredAt: new Date().toISOString() });
  if (source === "麦克风" && attempt.phase === "lp02-input-playing" && attempt.audioTransaction?.context === "lp02-external-input" && !attempt.audioTransaction.endedAt && !attempt.audioTransaction.interruptedAt) {
    if (state.chapter4Timer) clearTimeout(state.chapter4Timer);
    state.chapter4Timer = null;
    recordLp02InputOnset(attempt, attempt.pendingLp02Input, attempt.audioTransaction.startedAt);
    finishChapter4AudioTransaction(attempt, () => commitLp02PendingInput(attempt));
    return;
  }
  persistChapter4Attempt();
}

function completeLp02Modeled(reason) {
  const attempt = ensureChapter4Attempt();
  if (!attempt || attempt.levelId !== "LP02") return;
  clearChapter4Timers();
  attempt.strongCueUsed = true;
  startChapter4TeachingSequence(attempt, {
    context: "lp02-modeled",
    kind: "modeled-low-c",
    reason,
    midis: [48],
    payload: { reason },
    phase: "lp02-modeled-playing",
    onEnded: () => {
      attempt.modeled = true;
      finalizeLp02Completion(attempt, { source: "model", modeled: true });
    }
  });
}

function lp02EvidenceRecord(attempt, { source, modeled = false } = {}) {
  const firstNote = chapter4NoteForMidi(attempt.firstChildMidi);
  return {
    levelId: "LP02",
    bundleId: chapter4Config.bundleId,
    sessionId: attempt.formalSession ? (state.activeSession?.sessionId || attempt.sessionId) : null,
    targetMidi: 48,
    firstChildMidi: attempt.firstChildMidi,
    firstPitchName: firstNote?.pitchName || null,
    firstInputRoute: attempt.firstInputRoute,
    inputRoute: attempt.firstInputRoute,
    noteNameCorrect: Boolean(attempt.firstNoteNameCorrect),
    registerCorrect: Boolean(attempt.firstRegisterCorrect),
    wrongOctave: Boolean(attempt.firstWrongOctave),
    strongCueUsed: Boolean(attempt.strongCueUsed),
    modeled: Boolean(modeled || attempt.modeled),
    accessibilityVisualAssist: Boolean(attempt.accessibilityVisualAssist),
    experimentalInput: Boolean(attempt.experimentalInput),
    microphoneConfidence: attempt.microphoneConfidence,
    completionSource: source,
    responseMs: !attempt.timingInterrupted ? attempt.firstResponseMs : null,
    timingInterrupted: Boolean(attempt.timingInterrupted),
    timingUsedForMastery: false,
    inputEvents: attempt.inputEvents.map((event) => ({ ...event }))
  };
}

function finalizeLp02Completion(attempt, { source, modeled = false } = {}) {
  if (!attempt || attempt.outcomeRecorded) return;
  clearChapter4Timers();
  const completedAt = new Date().toISOString();
  const evidence = lp02EvidenceRecord(attempt, { source, modeled });
  attempt.outcomeRecorded = true;
  attempt.completionSource = source;
  attempt.phase = "lp02-complete";
  if (attempt.formalSession && !state.chapter4DirectMode) {
    const existing = state.learningStats.levels.LP02 || { completions: 0, formalCompletions: 0, stableCompletions: 0 };
    existing.completions = (Number(existing.completions) || 0) + 1;
    existing.formalCompletions = (Number(existing.formalCompletions) || 0) + 1;
    existing.stableCompletions = Number(existing.stableCompletions) || 0;
    existing.needsPractice = Boolean(modeled || attempt.strongCueUsed || attempt.experimentalInput);
    existing.todayNeedsPractice = existing.needsPractice;
    existing.todayNeedsPracticeDate = existing.needsPractice ? localDateKeyAt(completedAt) : existing.todayNeedsPracticeDate;
    existing.lastCompletedAt = completedAt;
    existing.lastFormalCompletedAt = completedAt;
    existing.lastAttempt = { completedAt, played: true, stable: false, evidence };
    state.learningStats.levels.LP02 = existing;
    saveLearningStats();
    const summary = { ...evidence, completedAt, played: true, stable: false, retained: false, needsPractice: existing.needsPractice };
    state.chapter4.lessonEvidence.LP02 = summary;
    state.chapter4.lp02Attempts.push(summary);
    state.chapter4.lp02Attempts = state.chapter4.lp02Attempts.slice(-20);
    state.chapter4.completedSlice = true;
    state.chapter4.resume = null;
    const session = state.activeSession;
    if (session) session.completedActions.push({ actionId: chapter4Config.lp02.actionId, kind: "chapter4-keyboard", targetId: "LP02", ...summary });
    persistChapter4Progress();
    persistChapter4Attempt();
  }
  renderChapter4Screen();
  if (state.chapter4DirectMode) return;
  const action = currentChapter4Action();
  state.chapter4RestView = action ? { ...action, chapter4Attempt: JSON.parse(JSON.stringify(attempt)) } : null;
  finishActiveSessionAtRest({ reward: "第一块地基", reason: "natural-rest" });
  state.chapter4FeedbackTimer = setTimeout(() => showMapScreen(), 1050);
}

function recoverChapter4Sound() {
  const attempt = ensureChapter4Attempt();
  if (!attempt || attempt.phase !== "sound-paused") return;
  const interrupted = attempt.audioTransaction;
  const context = attempt.soundPauseContext || interrupted?.context;
  attempt.audioTransaction = null;
  attempt.soundPauseContext = null;
  if (context === "lp01-model") {
    const payload = interrupted?.payload;
    startLp01ModelStep(payload?.index ?? attempt.modelIndex, { replay: Boolean(payload?.replay) });
  } else if (context === "lp01-target") {
    playLp01Target("sound-recovery");
  } else if (context === "lp01-response") {
    startLp01CorrectResponsePlayback(attempt);
  } else if (context === "lp01-wrong-repair") {
    startLp01WrongRepairPlayback(attempt);
  } else if (context === "lp01-modeled") {
    completeLp01Modeled(attempt.pendingModeledReason || "sound-recovery-modeled");
  } else if (context === "lp02-reconnect") {
    startLp02Reconnect();
  } else if (context === "lp02-modeled") {
    completeLp02Modeled("sound-recovery-modeled");
  } else if (context === "lp02-child-input") {
    const pending = attempt.pendingLp02Input || interrupted?.payload;
    if (!pending) return;
    beginLp02InputTransaction(attempt, pending, { recovery: true });
  } else if (context === "lp02-external-input") {
    const pending = attempt.pendingLp02Input || interrupted?.payload;
    attempt.pendingLp02Input = null;
    attempt.audioTransaction = null;
    attempt.routeHeldMidi["麦克风"] = null;
    attempt.routeArmed["麦克风"] = true;
    attempt.phase = pending?.phase === "lp02-assisted" ? "lp02-assisted" : "lp02-guide";
    attempt.observations.push({ event: "external-input-retry-required", midi: pending?.midi ?? null, source: "麦克风", occurredAt: new Date().toISOString() });
    persistChapter4Attempt();
    renderChapter4Screen();
    if (attempt.phase === "lp02-assisted") scheduleLp02AssistedTimeout();
    else scheduleLp02ResponseTimeout();
  }
}

function isMicrophoneSource(source) {
  return source === "麦克风";
}

function ensureM03ResponseClock() {
  const stepKey = currentAttemptStepKey();
  if (state.practiceAttempt?.activeStepRecord?.key !== stepKey) beginPracticeStepClock();
}

function beginAudioAExternalInput(attempt, pending) {
  if (!audioAAttemptIsCurrent(attempt)) return false;
  const now = new Date().toISOString();
  attempt.pendingInput = { ...pending, acceptedAt: now };
  attempt.audioTransaction = {
    context: "external-input",
    payload: { ...attempt.pendingInput },
    notes: [{ midi: pending.midi, delayMs: 0, durationMs: 0 }],
    playbackId: null,
    scheduledAt: now,
    startedAt: now,
    endedAt: null,
    interruptedAt: null,
    startAudioTime: null,
    endAudioTime: null,
    interruptedAudioTime: null,
    contextState: "external-input",
    status: "playing",
    returnQueued: false,
    returnQueuedConsumedAt: null,
    outcomeRecorded: false
  };
  attempt.soundPauseContext = null;
  attempt.phase = "external-input";
  setAudioAInputArmed(attempt, false);
  traceAudioAAttempt(attempt, "started", attempt.audioTransaction, { external: true });
  persistAudioAAttempt(attempt);
  renderAudioAAttempt(attempt);
  return true;
}

function finishAudioAExternalInput(attempt, midi, source, commit) {
  const transaction = attempt?.audioTransaction;
  const pending = attempt?.pendingInput;
  if (!audioAAttemptIsCurrent(attempt) || attempt.phase !== "external-input" || !transaction || !pending) return false;
  if (pending.source !== source || (Number.isFinite(midi) && pending.midi !== midi)) return false;
  transaction.endedAt = new Date().toISOString();
  transaction.contextState = "external-input-quiet";
  transaction.status = "ended";
  transaction.outcomeRecorded = true;
  traceAudioAAttempt(attempt, "ended", transaction, { external: true });
  commit(pending, transaction, { returnQueued: transaction.returnQueued === true });
  persistAudioAAttempt(attempt);
  renderAudioAAttempt(attempt);
  consumeAudioAQueuedReturn(attempt, transaction);
  return true;
}

function startM03Model(attempt = ensureM03AudioAttempt(), reason = "system") {
  if (!audioAAttemptIsCurrent(attempt) || state.stepIndex >= (activeLevel()?.parts?.length || 0)) return false;
  const targetMidi = activeTargetMidi();
  const target = noteForMidi(targetMidi);
  if (!target) return false;
  attempt.targetMidi = targetMidi;
  attempt.pendingInput = null;
  attempt.modelCount = (Number(attempt.modelCount) || 0) + 1;
  return Boolean(startAudioATeachingSequence(attempt, {
    context: "model",
    notes: [{ midi: target.midi, frequency: target.frequency, gain: 0.13, durationMs: 720, delayMs: 0 }],
    payload: { targetMidi, reason, stepIndex: state.stepIndex },
    scheduledPhase: "model-scheduled",
    playingPhase: "model-playing",
    onStarted: (transaction) => {
      if (els.heardStatus) els.heardStatus.textContent = "听到：小车轮唱了一声";
      if (els.feedback) {
        els.feedback.classList.remove("good", "bad");
        els.feedback.textContent = "先听一听，声音停下后再弹同样的琴键。";
      }
      els.moonYard?.classList.remove("listening-pulse");
      void els.moonYard?.offsetWidth;
      els.moonYard?.classList.add("listening-pulse");
      setDinoMood("listen", 980);
    },
    onEnded: (playback, transaction, { returnQueued }) => {
      if (transaction.payload?.stepIndex !== state.stepIndex) return;
      attempt.phase = returnQueued ? "model-ready" : "awaiting-response";
      if (!returnQueued) {
        const preservesIdleSchedule = typeof reason === "string" && /^idle-(?:identity|locator)$/.test(reason);
        armAudioAResponse(attempt, { scheduleIdleHints: !preservesIdleSchedule });
      }
    }
  }));
}

function startM03ChildEcho(attempt, pending, { recovery = false } = {}) {
  const heard = noteForMidi(pending?.midi);
  if (!audioAAttemptIsCurrent(attempt) || !heard) return false;
  attempt.pendingInput = { ...pending, targetMidi: pending.targetMidi ?? activeTargetMidi() };
  attempt.childEchoCount = (Number(attempt.childEchoCount) || 0) + 1;
  return Boolean(startAudioATeachingSequence(attempt, {
    context: "child-echo",
    notes: [{ midi: heard.midi, frequency: heard.frequency, gain: 0.10, durationMs: 420, delayMs: 0 }],
    payload: { ...attempt.pendingInput, recovery },
    scheduledPhase: "child-echo-scheduled",
    playingPhase: "child-echo-playing",
    onEnded: (playback, transaction, { returnQueued }) => {
      transaction.outcomeRecorded = true;
      commitM03AudioInput(attempt, attempt.pendingInput, { returnQueued });
    }
  }));
}

function startM03WrongRepair(attempt, pending, { recovery = false } = {}) {
  const heard = noteForMidi(pending?.midi);
  const target = noteForMidi(pending?.targetMidi ?? activeTargetMidi());
  if (!audioAAttemptIsCurrent(attempt) || !heard || !target) return false;
  return Boolean(startAudioATeachingSequence(attempt, {
    context: "wrong-repair",
    notes: [{ midi: target.midi, frequency: target.frequency, gain: 0.13, durationMs: 720, delayMs: 0 }],
    payload: { ...pending, targetMidi: target.midi, recovery },
    scheduledPhase: "wrong-repair-scheduled",
    playingPhase: "wrong-repair-playing",
    onStarted: () => {
      showInputEffect(pending.midi, "wrong", { showLabel: true });
      showInputEffect(target.midi, "hint", { showLabel: true });
    },
    onEnded: (playback, transaction, { returnQueued }) => {
      if (returnQueued) {
        attempt.phase = "awaiting-response";
        setAudioAInputArmed(attempt, true);
        return;
      }
      if (attempt.pendingModeledReason) {
        startM03ModeledCompletion(attempt, attempt.pendingModeledReason);
        return;
      }
      attempt.phase = "awaiting-response";
      armAudioAResponse(attempt);
    }
  }));
}

function startM03ModeledCompletion(attempt, reason) {
  const target = noteForMidi(activeTargetMidi());
  if (!audioAAttemptIsCurrent(attempt) || !target) return false;
  if (state.assistedSuccessTimer) {
    clearTimeout(state.assistedSuccessTimer);
    state.assistedSuccessTimer = null;
  }
  attempt.pendingModeledReason = reason;
  return Boolean(startAudioATeachingSequence(attempt, {
    context: "modeled",
    notes: [{ midi: target.midi, frequency: target.frequency, gain: 0.13, durationMs: 720, delayMs: 0 }],
    payload: { targetMidi: target.midi, reason, stepIndex: state.stepIndex },
    scheduledPhase: "modeled-scheduled",
    playingPhase: "modeled-playing",
    onEnded: (playback, transaction, { returnQueued }) => {
      transaction.outcomeRecorded = true;
      completeM03ModeledAfterAudio(attempt, reason, { returnQueued });
    }
  }));
}

function beginM03AssistedRepair(attempt, targetMidi) {
  const stepWrongs = attempt?.activeStepRecord?.wrongs || 0;
  if (!attempt?.formalSession || stepWrongs < 3) return false;
  if (attempt.assistedMode) {
    ensureM03AudioAttempt().pendingModeledReason = "assisted-retry-wrong";
    return true;
  }
  attempt.assistedMode = true;
  state.assistedSuccessPending = true;
  markAttemptCue("strong");
  if (state.activeSession) {
    state.activeSession.restAfterCurrentLevel = true;
    persistActiveSession();
  }
  const audioAttempt = ensureM03AudioAttempt();
  audioAttempt.pendingModeledReason = null;
  if (state.assistedSuccessTimer) clearTimeout(state.assistedSuccessTimer);
  state.assistedSuccessTimer = setTimeout(() => {
    state.assistedSuccessTimer = null;
    if (audioAAttemptIsCurrent(audioAttempt) && audioAttempt.phase === "awaiting-response") {
      startM03ModeledCompletion(audioAttempt, "assisted-timeout");
    }
  }, CH3_ASSISTED_WAIT_MS);
  return true;
}

function completeM03ModeledAfterAudio(audioAttempt, reason, { returnQueued = false } = {}) {
  const attempt = state.practiceAttempt;
  const targetMidi = activeTargetMidi();
  const target = noteForMidi(targetMidi);
  if (!audioAAttemptIsCurrent(audioAttempt) || !attempt || !target) return false;
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
  state.lastInputMidi = targetMidi;
  state.lastInputResult = "correct";
  state.stepHadWrong = false;
  audioAttempt.phase = "complete";
  audioAttempt.pendingModeledReason = null;
  state.stepIndex = activeLevel().parts.length;
  renderAudioAAttempt(audioAttempt);
  flashBuildArea(state.stepIndex - 1, true);
  if (els.feedback) {
    els.feedback.classList.remove("bad");
    els.feedback.classList.add("good");
    els.feedback.textContent = "小车轮完整示范后，今天先在这里歇一歇。";
  }
  if (returnQueued) consumeAudioAQueuedReturn(audioAttempt, audioAttempt.audioTransaction);
  discardCompletedM03AudioAttempt(audioAttempt);
  completeLevel("model");
  return true;
}

function commitM03AudioInput(attempt, pending, { returnQueued = false } = {}) {
  if (!audioAAttemptIsCurrent(attempt) || !pending) return false;
  const targetMidi = pending.targetMidi ?? activeTargetMidi();
  if (targetMidi !== activeTargetMidi()) return false;
  const target = noteForMidi(targetMidi);
  const heard = noteForMidi(pending.midi);
  if (!target || !heard) return false;
  attempt.pendingInput = null;
  clearWorkshopIdleHints();
  if (pending.midi === targetMidi) {
    recordPracticeInput({ correct: true, target, heard, source: pending.source });
    state.lastInputMidi = pending.midi;
    state.lastInputResult = "correct";
    const droppedPart = activePart();
    const finalStep = state.stepIndex === activeLevel().parts.length - 1;
    if (!finalStep) showFlyingPart(droppedPart);
    pulseBuildStage("correct");
    playCorrectSound();
    state.stepIndex += 1;
    state.stepHadWrong = false;
    setRouteJustLocked(activeLevel(), state.stepIndex - 1);
    renderAudioAAttempt(attempt);
    const finished = state.stepIndex >= activeLevel().parts.length;
    flashBuildArea(state.stepIndex - 1, finished);
    showInputEffect(pending.midi, "correct", { showLabel: !finalStep });
    if (!finalStep) {
      showKeySpriteEffect(pending.midi, "correct");
      showNoteBurst(pending.midi, "correct", heard);
      showMusicFlight(pending.midi, heard, getPlayFlightTarget(state.stepIndex - 1), "correct");
    }
    if (finished) {
      attempt.phase = "complete";
      renderM03AudioState();
      if (returnQueued) consumeAudioAQueuedReturn(attempt, attempt.audioTransaction);
      discardCompletedM03AudioAttempt(attempt);
      completeLevel(pending.source);
      return true;
    }
    attempt.phase = "model-ready";
    setAudioAInputArmed(attempt, false);
    if (!returnQueued) {
      clearListeningPrompt();
      state.listenPromptTimer = setTimeout(() => {
        state.listenPromptTimer = null;
        if (audioAAttemptIsCurrent(attempt) && attempt.phase === "model-ready") startM03Model(attempt, "system-next");
      }, 560);
    }
    return true;
  }

  recordPracticeInput({ correct: false, target, heard, source: pending.source });
  state.lastInputMidi = pending.midi;
  state.lastInputResult = "wrong";
  pulseBuildStage("wrong");
  if (els.feedback) {
    els.feedback.classList.remove("good");
    els.feedback.classList.add("bad");
    els.feedback.textContent = wrongFeedbackFor(heard, target);
  }
  setDinoMood("bad");
  renderAudioAAttempt(attempt);
  const assisted = beginM03AssistedRepair(state.practiceAttempt, targetMidi);
  if (assisted && state.practiceAttempt?.assistedMode && (state.practiceAttempt.activeStepRecord?.wrongs || 0) >= 4) {
    attempt.pendingModeledReason = "assisted-retry-wrong";
  }
  const completedChildTransaction = attempt.audioTransaction;
  const repairStarted = startM03WrongRepair(attempt, pending);
  if (returnQueued) handoffAudioAQueuedReturn(attempt, completedChildTransaction);
  return repairStarted;
}

function handleM03AudioInput(midi, source) {
  const attempt = ensureM03AudioAttempt();
  if (!attempt) return;
  const retryingInterruptedExternalInput = attempt.phase === "sound-paused" &&
    (attempt.soundPauseContext || attempt.audioTransaction?.context) === "external-input";
  if (attempt.phase === "sound-paused") {
    if (!recoverAudioAAttempt() || !retryingInterruptedExternalInput) {
      if (source === "MIDI") recordAudioAMidiNoteOn(attempt, midi);
      recordAudioAObservation(attempt, midi, source);
      return;
    }
  }
  if (source === "MIDI") {
    const midiState = recordAudioAMidiNoteOn(attempt, midi);
    if (midiState.blocked) {
      recordAudioAObservation(attempt, midi, source, "held-midi");
      return;
    }
  }
  if (attempt.phase !== "awaiting-response" || !attempt.inputArmed) {
    recordAudioAObservation(attempt, midi, source);
    return;
  }
  const pending = { midi, source, targetMidi: activeTargetMidi(), occurredAt: new Date().toISOString() };
  if (isMicrophoneSource(source)) {
    beginAudioAExternalInput(attempt, pending);
    return;
  }
  startM03ChildEcho(attempt, pending);
}

function releaseM03AudioInput(midi, source) {
  const attempt = ensureM03AudioAttempt();
  if (source === "MIDI") return releaseAudioAMidiInput(attempt, midi);
  if (!isMicrophoneSource(source)) return false;
  return finishAudioAExternalInput(attempt, midi, source, (pending, transaction, options) => {
    commitM03AudioInput(attempt, pending, options);
  });
}

function startGardenAudioAModel(attempt = ensureGardenAudioAttempt(), reason = "system") {
  const lesson = audioAGardenLesson();
  if (!audioAAttemptIsCurrent(attempt) || !lesson || lesson.id !== attempt.lessonId) return false;
  const target = noteForMidi(lesson.midi);
  if (!target) return false;
  attempt.targetMidi = lesson.midi;
  attempt.pendingInput = null;
  attempt.modelCount = (Number(attempt.modelCount) || 0) + 1;
  return Boolean(startAudioATeachingSequence(attempt, {
    context: "model",
    notes: [{ midi: target.midi, frequency: target.frequency, gain: 0.13, durationMs: 720, delayMs: 0 }],
    payload: { targetMidi: target.midi, lessonId: lesson.id, reason, qualifiedInputs: state.chapter3.ls03QualifiedInputs },
    scheduledPhase: "model-scheduled",
    playingPhase: "model-playing",
    onStarted: () => {
      if (els.heardStatus) els.heardStatus.textContent = "听到：花园唱了一声";
    },
    onEnded: (playback, transaction, { returnQueued }) => {
      if (transaction.payload?.lessonId !== currentGardenLesson()?.id) return;
      attempt.phase = returnQueued ? "model-ready" : "awaiting-response";
      if (!returnQueued) armAudioAResponse(attempt);
    }
  }));
}

function startGardenChildEcho(attempt, pending, { recovery = false } = {}) {
  const heard = noteForMidi(pending?.midi);
  if (!audioAAttemptIsCurrent(attempt) || !heard) return false;
  attempt.pendingInput = { ...pending, targetMidi: pending.targetMidi ?? audioAGardenLesson()?.midi };
  attempt.childEchoCount = (Number(attempt.childEchoCount) || 0) + 1;
  return Boolean(startAudioATeachingSequence(attempt, {
    context: "child-echo",
    notes: [{ midi: heard.midi, frequency: heard.frequency, gain: 0.10, durationMs: 420, delayMs: 0 }],
    payload: { ...attempt.pendingInput, recovery },
    scheduledPhase: "child-echo-scheduled",
    playingPhase: "child-echo-playing",
    onEnded: (playback, transaction, { returnQueued }) => {
      transaction.outcomeRecorded = true;
      commitGardenAudioAInput(attempt, attempt.pendingInput, { returnQueued });
    }
  }));
}

function startGardenWrongRepair(attempt, pending, { recovery = false } = {}) {
  const heard = noteForMidi(pending?.midi);
  const target = noteForMidi(pending?.targetMidi ?? audioAGardenLesson()?.midi);
  if (!audioAAttemptIsCurrent(attempt) || !heard || !target) return false;
  return Boolean(startAudioATeachingSequence(attempt, {
    context: "wrong-repair",
    notes: [{ midi: target.midi, frequency: target.frequency, gain: 0.13, durationMs: 720, delayMs: 0 }],
    payload: { ...pending, targetMidi: target.midi, recovery },
    scheduledPhase: "wrong-repair-scheduled",
    playingPhase: "wrong-repair-playing",
    onEnded: (playback, transaction, { returnQueued }) => {
      if (returnQueued) {
        attempt.phase = "awaiting-response";
        setAudioAInputArmed(attempt, true);
        return;
      }
      if (attempt.pendingModeledReason) {
        startGardenModeledCompletion(attempt, attempt.pendingModeledReason);
        return;
      }
      const lesson = audioAGardenLesson();
      if (lesson?.id === "LS01" && state.gardenWrongCount >= 2 && state.gardenRepairStage !== "assisted") {
        beginGardenAssistedRepair();
        return;
      }
      attempt.phase = "awaiting-response";
      armAudioAResponse(attempt);
    }
  }));
}

function startGardenModeledCompletion(attempt, reason) {
  const lesson = audioAGardenLesson();
  const target = noteForMidi(lesson?.midi);
  if (!audioAAttemptIsCurrent(attempt) || !lesson || !target) return false;
  clearGardenTimers();
  attempt.pendingModeledReason = reason;
  return Boolean(startAudioATeachingSequence(attempt, {
    context: "modeled",
    notes: [{ midi: target.midi, frequency: target.frequency, gain: 0.13, durationMs: 720, delayMs: 0 }],
    payload: { targetMidi: target.midi, lessonId: lesson.id, reason },
    scheduledPhase: "modeled-scheduled",
    playingPhase: "modeled-playing",
    onEnded: (playback, transaction) => {
      if (transaction.payload?.lessonId !== currentGardenLesson()?.id) return;
      transaction.outcomeRecorded = true;
      state.gardenModeledInputs.push({
        source: "model",
        reason,
        targetMidi: lesson.midi,
        completedAt: new Date().toISOString()
      });
      state.lastInputMidi = lesson.midi;
      state.lastInputResult = "correct";
      attempt.phase = "complete";
      attempt.pendingModeledReason = null;
      persistGardenPendingAttempt();
      completeGardenLesson(lesson, {
        childCorrectCount: 0,
        modeled: true,
        assisted: state.gardenRepairStage === "assisted",
        needsPractice: true,
        completionSource: "model",
        earlyRest: lesson.id === "LS01",
        earlyRestReason: reason
      });
    }
  }));
}

function commitGardenAudioAInput(attempt, pending, { returnQueued = false } = {}) {
  const lesson = audioAGardenLesson();
  const heard = noteForMidi(pending?.midi);
  if (!audioAAttemptIsCurrent(attempt) || !lesson || !heard || pending.targetMidi !== lesson.midi) return false;
  attempt.pendingInput = null;
  state.lastInputMidi = pending.midi;
  if (pending.midi !== lesson.midi) {
    state.gardenInputRoutes[pending.source] = (state.gardenInputRoutes[pending.source] || 0) + 1;
    state.gardenChildInputs.push({ midi: pending.midi, source: pending.source, result: "wrong", occurredAt: new Date().toISOString() });
    state.lastInputResult = "wrong";
    state.gardenWrongCount += 1;
    els.gardenScene.classList.remove("garden-correct-pulse", "garden-wrong-pulse");
    void els.gardenScene.offsetWidth;
    els.gardenScene.classList.add("garden-wrong-pulse");
    showInputEffect(pending.midi, "wrong", { showLabel: false });
    persistGardenPendingAttempt();
    if (lesson.id === "LS01" && state.gardenRepairStage === "assisted") {
      attempt.pendingModeledReason = "assisted-retry-wrong";
    }
    const completedChildTransaction = attempt.audioTransaction;
    const repairStarted = startGardenWrongRepair(attempt, pending);
    if (returnQueued) handoffAudioAQueuedReturn(attempt, completedChildTransaction);
    return repairStarted;
  }

  state.gardenInputRoutes[pending.source] = (state.gardenInputRoutes[pending.source] || 0) + 1;
  state.gardenChildCorrectCount += 1;
  state.gardenChildInputs.push({ midi: pending.midi, source: pending.source, result: "correct", occurredAt: new Date().toISOString() });
  state.lastInputResult = "correct";
  setAudioAInputArmed(attempt, false);
  els.gardenScene.classList.remove("garden-correct-pulse", "garden-wrong-pulse");
  void els.gardenScene.offsetWidth;
  els.gardenScene.classList.add("garden-correct-pulse");
  showInputEffect(pending.midi, "correct", { showLabel: false });
  const assisted = state.gardenRepairStage === "assisted";
  if (assisted) clearGardenTimers();
  else if (state.gardenLongWaitTimer) {
    clearTimeout(state.gardenLongWaitTimer);
    state.gardenLongWaitTimer = null;
  }
  if (lesson.id === "LS03") {
    state.chapter3.ls03QualifiedInputs = Math.min(2, state.chapter3.ls03QualifiedInputs + 1);
    persistChapter3Progress();
    if (state.chapter3.ls03QualifiedInputs < 2) {
      attempt.phase = "model-ready";
      persistGardenPendingAttempt();
      if (!returnQueued) {
        state.gardenCompletionTimer = setTimeout(() => {
          state.gardenCompletionTimer = null;
          if (audioAAttemptIsCurrent(attempt) && attempt.phase === "model-ready") startGardenAudioAModel(attempt, "system-next");
        }, 360);
      }
      return true;
    }
  }
  attempt.phase = "complete";
  persistGardenPendingAttempt();
  completeGardenLesson(lesson, {
    childCorrectCount: state.gardenChildCorrectCount,
    assisted,
    needsPractice: assisted,
    completionSource: "child",
    earlyRest: lesson.id === "LS01" && assisted,
    earlyRestReason: assisted ? "assisted-repair" : ""
  });
  return true;
}

function handleGardenAudioAInput(midi, source) {
  const attempt = ensureGardenAudioAttempt();
  const lesson = audioAGardenLesson();
  if (!attempt || !lesson || state.chapter3.equipmentState !== "safe-open") return;
  const retryingInterruptedExternalInput = attempt.phase === "sound-paused" &&
    (attempt.soundPauseContext || attempt.audioTransaction?.context) === "external-input";
  if (attempt.phase === "sound-paused") {
    if (!recoverAudioAAttempt() || !retryingInterruptedExternalInput) {
      if (source === "MIDI") recordAudioAMidiNoteOn(attempt, midi);
      recordAudioAObservation(attempt, midi, source);
      return;
    }
  }
  if (source === "MIDI") {
    const midiState = recordAudioAMidiNoteOn(attempt, midi);
    if (midiState.blocked) {
      recordAudioAObservation(attempt, midi, source, "held-midi");
      return;
    }
  }
  if (attempt.phase !== "awaiting-response" || !attempt.inputArmed) {
    recordAudioAObservation(attempt, midi, source);
    return;
  }
  const pending = { midi, source, targetMidi: lesson.midi, occurredAt: new Date().toISOString() };
  if (isMicrophoneSource(source)) {
    beginAudioAExternalInput(attempt, pending);
    return;
  }
  startGardenChildEcho(attempt, pending);
}

function releaseGardenAudioAInput(midi, source) {
  const attempt = ensureGardenAudioAttempt();
  if (source === "MIDI") return releaseAudioAMidiInput(attempt, midi);
  if (!isMicrophoneSource(source)) return false;
  return finishAudioAExternalInput(attempt, midi, source, (pending, transaction, options) => {
    commitGardenAudioAInput(attempt, pending, options);
  });
}

function handleGardenInput(midi, source) {
  const lesson = currentGardenLesson();
  if (!lesson || state.chapter3.equipmentState !== "safe-open") return;
  if (isAudioAGardenActive()) {
    handleGardenAudioAInput(midi, source);
    return;
  }
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
        if (isAudioAM03Active()) {
          const restored = restoreM03AudioAttempt();
          const audioAttempt = ensureM03AudioAttempt();
          renderAudioAAttempt(audioAttempt);
          if (restored && audioAttempt.phase === "awaiting-response" && audioAttempt.inputArmed) {
            ensureM03ResponseClock();
            scheduleWorkshopIdleHints(LEVEL_INTRO_RESPONSE_DELAY_MS);
          } else if (!restored || audioAttempt.phase === "model-ready") {
            playListeningPrompt();
          }
        } else {
          beginPracticeStepClock();
          scheduleWorkshopIdleHints(LEVEL_INTRO_RESPONSE_DELAY_MS);
          if (isListeningLevel()) playListeningPrompt();
        }
      } else if (state.screen === "staff") {
        beginPracticeStepClock();
      } else if (state.screen === "garden") {
        if (isAudioAGardenActive()) restoreGardenPendingAttempt();
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

function currentListeningAction(targetId = null) {
  const action = currentSessionAction();
  if (action?.kind !== "garden-listening") return null;
  return !targetId || action.targetId === targetId ? action : null;
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
    soundPauseCount: 0,
    strongCueUsed: false,
    supportStage: "none",
    modeled: false,
    modeledInputs: [],
    pendingModeled: null,
    hasExperimentalInput: false,
    targetRevealedBeforeResponse: false,
    audioTrace: [],
    audioLifecycle: [],
    audioTransaction: null,
    soundPauseContext: null,
    pendingInput: null,
    midiHeldMidis: [],
    inputArmed: false,
    observations: []
  };
}

function ensureLs04Attempt() {
  const action = currentListeningAction("LS04");
  if (!action) return null;
  if (!action.listeningAttempt || action.listeningAttempt.version !== 1) {
    action.listeningAttempt = createLs04Attempt(state.activeSession);
    persistActiveSession();
  }
  return initializeAudioBAttempt(action.listeningAttempt);
}

function clearLs04Timers() {
  if (state.ls04Timer) clearTimeout(state.ls04Timer);
  if (state.ls04FeedbackTimer) clearTimeout(state.ls04FeedbackTimer);
  state.ls04Timer = null;
  state.ls04FeedbackTimer = null;
}

function persistLs04Attempt() {
  if (!currentListeningAction("LS04")) return;
  persistActiveSession();
}

function ls04Target(attempt = ensureLs04Attempt()) {
  return attempt ? attempt.sequence[attempt.callIndex] ?? null : null;
}

function traceLs04Audio(attempt, kind, midi, extra = {}) {
  attempt.audioTrace.push({ kind, midi, at: new Date().toISOString(), ...extra });
  attempt.audioTrace = attempt.audioTrace.slice(-40);
}

function playLs04Reference({ recovery = false } = {}) {
  const attempt = ensureLs04Attempt();
  if (!attempt || state.screen !== "garden") return null;
  clearLs04Timers();
  return startAudioBTeachingSequence(attempt, {
    context: "reference",
    kind: "reference",
    reason: "reference",
    notes: [{ midi: 60, durationMs: 720, delayMs: 0 }],
    payload: { originalReason: "reference", recovery },
    scheduledPhase: "reference",
    playingPhase: "reference",
    onStarted: () => traceLs04Audio(attempt, "reference", 60, { recovery }),
    onEnded: (transaction, playback, { returnQueued }) => {
      attempt.referencePlayed = true;
      attempt.phase = "replay-ready";
      persistLs04Attempt();
      renderGardenScreen();
      if (returnQueued) return;
      state.ls04Timer = setTimeout(() => {
        state.ls04Timer = null;
        if (audioBAttemptIsCurrent(attempt) && attempt.phase === "replay-ready") playLs04Target("system-first");
      }, 900);
    }
  });
}

function playLs04Target(reason = "system", { recovery = false, presentationCounted = false } = {}) {
  const attempt = ensureLs04Attempt();
  const targetMidi = ls04Target(attempt);
  if (!attempt || targetMidi === null || state.screen !== "garden") return null;
  clearLs04Timers();
  return startAudioBTeachingSequence(attempt, {
    context: "target",
    kind: "target",
    reason,
    notes: [{ midi: targetMidi, durationMs: 720, delayMs: 0 }],
    payload: { targetMidi, callIndex: attempt.callIndex, originalReason: reason, recovery, presentationCounted },
    scheduledPhase: "target-playing",
    playingPhase: "target-playing",
    onStarted: (transaction) => {
      if (!transaction.payload?.presentationCounted) {
        if (reason === "child-replay") attempt.replayCountChild += 1;
        else if (reason !== "system-first") attempt.replayCountSystem += 1;
        if (transaction.payload) transaction.payload.presentationCounted = true;
      }
      traceLs04Audio(attempt, "target", targetMidi, { reason, callIndex: attempt.callIndex, recovery });
    },
    onEnded: (transaction, playback, { returnQueued }) => {
      attempt.phase = audioBResponsePhaseForAttempt(attempt);
      persistLs04Attempt();
      renderGardenScreen();
      if (!returnQueued) armAudioBResponse(attempt);
    }
  });
}

function resumeLs04Flow({ fromReload = false } = {}) {
  const attempt = ensureLs04Attempt();
  if (!attempt || state.screen !== "garden") return;
  clearLs04Timers();
  if (!audioBPlaybackIsActive(attempt) && !audioBExternalInputIsActive(attempt)) clearAudioBStaleMidiHolds(attempt);
  if (fromReload) normalizeAudioBAttemptForRecovery(attempt);
  if (attempt.phase === "sound-paused") {
    persistLs04Attempt();
    renderGardenScreen();
    return;
  }
  if (["awaiting-response", "assisted"].includes(attempt.phase)) {
    armAudioBResponse(attempt);
    return;
  }
  if (attempt.phase === "complete") {
    persistLs04Attempt();
    renderGardenScreen();
    return;
  }
  if (attempt.phase === "correct-feedback" && !fromReload) {
    playLs04Target("system-next");
    return;
  }
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
  if (!fromReload) playLs04Target("resume");
  else {
    attempt.phase = "replay-ready";
    persistLs04Attempt();
    renderGardenScreen();
  }
}

function hashSessionSeed(value) {
  let hash = 2166136261;
  for (const character of String(value || "C3-04")) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function ls05SequenceForSeed(seed) {
  const tables = [
    [[62, 64, 62, 60, 64], [64, 62, 60, 64, 62]],
    [[60, 64, 60, 62, 64], [64, 60, 62, 64, 60]],
    [[60, 62, 60, 64, 62], [62, 60, 64, 62, 60]]
  ];
  const hash = hashSessionSeed(seed);
  const singletonIndex = hash % 3;
  return tables[singletonIndex][Math.floor(hash / 3) % 2].slice();
}

function cloneLs05Attempt(attempt) {
  return JSON.parse(JSON.stringify(attempt));
}

function createLs05Attempt(session = state.activeSession, resumeAttempt = null) {
  if (resumeAttempt?.version === 1 && Array.isArray(resumeAttempt.sequence)) {
    const resumed = cloneLs05Attempt(resumeAttempt);
    resumed.phase = "reference-ready";
    resumed.referencePlayed = false;
    resumed.originSessionId = resumed.originSessionId || resumed.seed || session?.resumeOfSessionId || "";
    resumed.resumedFromSessionId = session?.resumeOfSessionId || null;
    resumed.crossedSessionBoundary = true;
    resetLs05CallRepair(resumed);
    return resumed;
  }
  const seed = session?.sessionId || "C3-04";
  return {
    version: 1,
    seed,
    originSessionId: seed,
    resumedFromSessionId: null,
    crossedSessionBoundary: false,
    sequence: ls05SequenceForSeed(seed),
    phase: "reference-ready",
    referencePlayed: false,
    callIndex: 0,
    scoredCalls: [],
    neutralProgress: 0,
    correctCount: 0,
    eligibleCoverage: { C: false, D: false, E: false },
    callWrongCount: 0,
    callRepairStage: "none",
    callConfusionPair: [],
    assistedCueVisible: false,
    callFirstValidInput: null,
    callReplayCountChild: 0,
    callReplayCountSystem: 0,
    callTargetRevealedBeforeResponse: false,
    callStrongCueUsed: false,
    callExperimentalInput: false,
    callAccessibilityVisualAssist: false,
    callResponseStartedAt: null,
    callTimingInterrupted: false,
    callOutOfCandidateRepair: false,
    totalWrongCount: 0,
    confusionCounts: {},
    childInputs: [],
    earlyInputs: [],
    inputRoutes: {},
    replayCountChild: 0,
    replayCountSystem: 0,
    soundPauseCount: 0,
    strongCueUsed: false,
    modeled: false,
    modeledInputs: [],
    hasExperimentalInput: false,
    accessibilityVisualAssist: false,
    targetRevealedBeforeResponse: false,
    respondingFlower: null,
    audioTrace: [],
    audioLifecycle: [],
    audioTransaction: null,
    soundPauseContext: null,
    pendingInput: null,
    midiHeldMidis: [],
    inputArmed: false,
    observations: []
  };
}

function ensureLs05Attempt() {
  const action = currentListeningAction("LS05");
  if (!action) return null;
  if (!action.listeningAttempt || action.listeningAttempt.version !== 1) {
    action.listeningAttempt = createLs05Attempt(state.activeSession);
    persistActiveSession();
  }
  return initializeAudioBAttempt(action.listeningAttempt);
}

function persistLs05Attempt() {
  if (currentListeningAction("LS05")) persistActiveSession();
}

function clearLs05Timers() {
  if (state.ls05Timer) clearTimeout(state.ls05Timer);
  if (state.ls05FeedbackTimer) clearTimeout(state.ls05FeedbackTimer);
  state.ls05Timer = null;
  state.ls05FeedbackTimer = null;
}

function ls05Target(attempt = ensureLs05Attempt()) {
  return attempt ? attempt.sequence[attempt.callIndex] ?? null : null;
}

function traceLs05Audio(attempt, kind, midi, extra = {}) {
  attempt.audioTrace.push({ kind, midi, at: new Date().toISOString(), ...extra });
  attempt.audioTrace = attempt.audioTrace.slice(-60);
}

function initializeAudioBAttempt(attempt) {
  if (!attempt) return attempt;
  if (!Array.isArray(attempt.audioTrace)) attempt.audioTrace = [];
  if (!Array.isArray(attempt.audioLifecycle)) attempt.audioLifecycle = [];
  if (!Array.isArray(attempt.midiHeldMidis)) attempt.midiHeldMidis = [];
  if (!Array.isArray(attempt.observations)) attempt.observations = [];
  if (!Object.hasOwn(attempt, "audioTransaction")) attempt.audioTransaction = null;
  if (!Object.hasOwn(attempt, "soundPauseContext")) attempt.soundPauseContext = null;
  if (!Object.hasOwn(attempt, "pendingInput")) attempt.pendingInput = null;
  if (!Object.hasOwn(attempt, "inputArmed")) attempt.inputArmed = false;
  if (!Object.hasOwn(attempt, "soundPauseCount")) attempt.soundPauseCount = 0;
  if (!Object.hasOwn(attempt, "pendingModeled")) attempt.pendingModeled = null;
  return attempt;
}

function currentAudioBAttempt() {
  const action = currentListeningAction();
  if (action?.targetId === "LS04") return ensureLs04Attempt();
  if (action?.targetId === "LS05") return ensureLs05Attempt();
  return null;
}

function audioBLevelId(attempt = currentAudioBAttempt()) {
  const action = currentListeningAction();
  return action?.listeningAttempt === attempt ? action.targetId : null;
}

function audioBAttemptIsCurrent(attempt) {
  const action = currentListeningAction();
  return Boolean(
    state.screen === "garden" &&
    action &&
    ["LS04", "LS05"].includes(action.targetId) &&
    action.listeningAttempt === attempt
  );
}

function persistAudioBAttempt(attempt) {
  if (!audioBAttemptIsCurrent(attempt)) return;
  if (audioBLevelId(attempt) === "LS04") persistLs04Attempt();
  else persistLs05Attempt();
}

function renderAudioBAttempt(attempt) {
  if (!audioBAttemptIsCurrent(attempt)) return;
  renderGardenScreen();
}

function traceAudioBLifecycle(attempt, kind, transaction, extra = {}) {
  if (!attempt) return;
  attempt.audioLifecycle.push({
    kind,
    context: transaction?.context || null,
    sequenceKind: transaction?.kind || null,
    reason: transaction?.reason || null,
    midis: Array.isArray(transaction?.notes)
      ? transaction.notes.map((note) => note.midi).filter(Number.isFinite)
      : (Number.isFinite(transaction?.payload?.midi) ? [transaction.payload.midi] : []),
    playbackId: transaction?.playbackId || null,
    scheduledAt: transaction?.scheduledAt || null,
    startedAt: transaction?.startedAt || null,
    endedAt: transaction?.endedAt || null,
    interruptedAt: transaction?.interruptedAt || null,
    startAudioTime: transaction?.startAudioTime ?? null,
    endAudioTime: transaction?.endAudioTime ?? null,
    interruptedAudioTime: transaction?.interruptedAudioTime ?? null,
    contextState: transaction?.contextState || null,
    ...extra
  });
  attempt.audioLifecycle = attempt.audioLifecycle.slice(-80);
}

function audioBHeldMidiNotes(attempt) {
  if (!attempt) return [];
  const held = [...new Set((attempt.midiHeldMidis || [])
    .map((midi) => Number(midi))
    .filter(Number.isFinite))];
  attempt.midiHeldMidis = held;
  return held;
}

function recordAudioBMidiNoteOn(attempt, midi) {
  const note = Number(midi);
  const held = audioBHeldMidiNotes(attempt);
  if (!Number.isFinite(note)) return { blocked: false, wasHeld: false, hadHeld: held.length > 0 };
  const wasHeld = held.includes(note);
  const hadHeld = held.length > 0;
  if (!wasHeld) held.push(note);
  attempt.midiHeldMidis = held;
  return { blocked: wasHeld || hadHeld, wasHeld, hadHeld };
}

function releaseAudioBMidiNote(attempt, midi) {
  const note = Number(midi);
  if (!Number.isFinite(note)) return false;
  const held = audioBHeldMidiNotes(attempt);
  if (!held.includes(note)) return false;
  attempt.midiHeldMidis = held.filter((heldMidi) => heldMidi !== note);
  return true;
}

function clearAudioBStaleMidiHolds(attempt) {
  if (!attempt) return false;
  const hadHeld = audioBHeldMidiNotes(attempt).length > 0;
  attempt.midiHeldMidis = [];
  return hadHeld;
}

function audioBInputPhaseAllows(attempt) {
  const levelId = audioBLevelId(attempt);
  if (levelId === "LS04") return ["awaiting-response", "assisted"].includes(attempt?.phase);
  if (levelId === "LS05") return ["awaiting-response", "assisted-retry", "visual-assist"].includes(attempt?.phase);
  return false;
}

function audioBExternalInputIsActive(attempt) {
  const transaction = attempt?.audioTransaction;
  return Boolean(
    transaction?.context === "external-input" &&
    !transaction.endedAt &&
    !transaction.interruptedAt
  );
}

function audioBPlaybackIsActive(attempt) {
  const transaction = attempt?.audioTransaction;
  const playback = state.teachingPlayback;
  return Boolean(
    transaction &&
    !transaction.endedAt &&
    !transaction.interruptedAt &&
    transaction.playbackId &&
    playback?.id === transaction.playbackId &&
    ["scheduled", "playing"].includes(playback.status)
  );
}

function setAudioBInputArmed(attempt, armed) {
  const transaction = attempt?.audioTransaction;
  const next = Boolean(armed) &&
    audioBAttemptIsCurrent(attempt) &&
    audioBInputPhaseAllows(attempt) &&
    !audioBExternalInputIsActive(attempt) &&
    audioBHeldMidiNotes(attempt).length === 0 &&
    (!transaction || Boolean(transaction.endedAt || transaction.interruptedAt));
  attempt.inputArmed = next;
  state.gardenInputArmed = next;
  if (els.gardenScene) els.gardenScene.dataset.inputArmed = next ? "true" : "false";
  return next;
}

function armAudioBResponse(attempt) {
  const wasArmed = attempt?.inputArmed === true;
  const armed = setAudioBInputArmed(attempt, true);
  if (!armed || wasArmed) {
    persistAudioBAttempt(attempt);
    renderAudioBAttempt(attempt);
    return false;
  }
  if (audioBLevelId(attempt) === "LS04") {
    if (attempt.phase === "assisted") scheduleLs04AssistedTimeout();
  } else if (attempt.phase === "assisted-retry") {
    scheduleLs05AssistedTimeout();
  } else if (attempt.phase === "awaiting-response") {
    scheduleLs05ResponseTimeout();
  }
  persistAudioBAttempt(attempt);
  renderAudioBAttempt(attempt);
  return true;
}

function recordAudioBObservation(attempt, midi, source, phase = attempt?.phase, extra = {}) {
  if (!attempt) return;
  attempt.observations.push({ midi, source, phase, occurredAt: new Date().toISOString(), ...extra });
  attempt.observations = attempt.observations.slice(-32);
  attempt.earlyInputs.push({ midi, source, phase, occurredAt: new Date().toISOString(), observation: true });
  attempt.earlyInputs = attempt.earlyInputs.slice(-32);
  persistAudioBAttempt(attempt);
}

function writeAudioBTransaction(transaction, playback, field) {
  transaction.playbackId = playback.id;
  transaction.scheduledAt = playback.scheduledAt;
  transaction.startedAt = playback.startedAt;
  transaction.endedAt = playback.endedAt;
  transaction.interruptedAt = playback.interruptedAt;
  transaction.startAudioTime = playback.startAudioTime;
  transaction.endAudioTime = playback.endAudioTime;
  transaction.interruptedAudioTime = playback.interruptedAudioTime;
  transaction.contextState = playback.contextState;
  transaction.status = playback.status;
  if (field) transaction.lastLifecycleField = field;
}

function queueAudioBMapReturn(attempt) {
  if (!audioBPlaybackIsActive(attempt)) return false;
  attempt.audioTransaction.returnQueued = true;
  persistAudioBAttempt(attempt);
  renderAudioBAttempt(attempt);
  return true;
}

function markAudioBQueuedReturnConsumed(attempt, transaction = attempt?.audioTransaction) {
  if (!transaction?.returnQueued || transaction.returnQueuedConsumedAt) return false;
  transaction.returnQueued = false;
  transaction.returnQueuedConsumedAt = new Date().toISOString();
  traceAudioBLifecycle(attempt, "queued-return-consumed", transaction, {
    interruption: Boolean(transaction.interruptedAt)
  });
  persistAudioBAttempt(attempt);
  return true;
}

function consumeAudioBQueuedReturn(attempt, transaction = attempt?.audioTransaction) {
  if (!markAudioBQueuedReturnConsumed(attempt, transaction)) return false;
  setTimeout(() => {
    if (state.screen === "garden") showMapScreen();
  }, 0);
  return true;
}

function handoffAudioBQueuedReturn(attempt, transaction) {
  const successor = attempt?.audioTransaction;
  if (!transaction?.returnQueued || !successor || successor === transaction) return false;
  transaction.returnQueued = false;
  transaction.returnQueuedHandedOffAt = new Date().toISOString();
  successor.returnQueued = true;
  successor.returnQueuedFromPlaybackId = transaction.playbackId || null;
  persistAudioBAttempt(attempt);
  if (successor.interruptedAt) consumeAudioBQueuedReturn(attempt, successor);
  return true;
}

function enterAudioBSoundPause(attempt, context, reason = "audio-unavailable", { increment = true } = {}) {
  if (!attempt) return;
  clearLs04Timers();
  clearLs05Timers();
  const transaction = attempt.audioTransaction;
  const returnQueued = transaction?.returnQueued === true;
  if (increment && Object.hasOwn(attempt, "soundPauseCount")) attempt.soundPauseCount += 1;
  if (audioBLevelId(attempt) === "LS05") {
    attempt.callTimingInterrupted = true;
    attempt.callResponseStartedAt = null;
  }
  if (transaction && !transaction.endedAt && !transaction.interruptedAt) {
    transaction.interruptedAt = new Date().toISOString();
  }
  attempt.soundPauseContext = context;
  attempt.phase = "sound-paused";
  setAudioBInputArmed(attempt, false);
  traceAudioBLifecycle(attempt, "interrupted", transaction, { interruptionReason: reason });
  persistAudioBAttempt(attempt);
  renderAudioBAttempt(attempt);
  if (returnQueued) consumeAudioBQueuedReturn(attempt, transaction);
}

function startAudioBTeachingSequence(attempt, {
  context,
  kind,
  reason,
  notes,
  payload = null,
  scheduledPhase,
  playingPhase,
  onStarted,
  onEnded,
  onInterrupted
} = {}) {
  if (!audioBAttemptIsCurrent(attempt) || !Array.isArray(notes) || notes.length === 0) return null;
  const normalizedNotes = notes
    .filter((note) => Number.isFinite(note?.midi))
    .map((note) => ({
      midi: Number(note.midi),
      delayMs: Math.max(0, Number(note.delayMs) || 0),
      durationMs: Math.max(1, Number(note.durationMs) || 720),
      child: Boolean(note.child)
    }));
  if (normalizedNotes.length === 0) return null;
  const transaction = {
    context,
    kind,
    reason,
    payload: payload ? JSON.parse(JSON.stringify(payload)) : null,
    notes: normalizedNotes,
    playbackId: null,
    scheduledAt: new Date().toISOString(),
    startedAt: null,
    endedAt: null,
    interruptedAt: null,
    startAudioTime: null,
    endAudioTime: null,
    interruptedAudioTime: null,
    contextState: "scheduled",
    status: "scheduled",
    returnQueued: false,
    returnQueuedConsumedAt: null,
    outcomeRecorded: false
  };
  attempt.audioTransaction = transaction;
  attempt.soundPauseContext = null;
  attempt.phase = scheduledPhase || `${context}-scheduled`;
  setAudioBInputArmed(attempt, false);
  persistAudioBAttempt(attempt);
  renderAudioBAttempt(attempt);

  const playback = playTeachingPianoSequence({
    reason: `audio-b-${context}:${reason}`,
    notes: normalizedNotes.map((note) => ({
      frequency: noteForMidi(note.midi)?.frequency || midiFrequency(note.midi),
      gain: note.child ? 0.10 : 0.13,
      durationMs: note.durationMs,
      delayMs: note.delayMs
    })),
    onStarted: (handle) => {
      if (!audioBAttemptIsCurrent(attempt) || attempt.audioTransaction !== transaction) return;
      writeAudioBTransaction(transaction, handle, "started");
      attempt.phase = playingPhase || scheduledPhase || `${context}-playing`;
      traceAudioBLifecycle(attempt, "started", transaction);
      onStarted?.(transaction, handle);
      persistAudioBAttempt(attempt);
      renderAudioBAttempt(attempt);
    },
    onEnded: (handle) => {
      if (!audioBAttemptIsCurrent(attempt) || attempt.audioTransaction !== transaction) return;
      writeAudioBTransaction(transaction, handle, "ended");
      traceAudioBLifecycle(attempt, "ended", transaction);
      persistAudioBAttempt(attempt);
      onEnded?.(transaction, handle, { returnQueued: transaction.returnQueued === true });
      if (!audioBAttemptIsCurrent(attempt) || attempt.audioTransaction !== transaction) return;
      persistAudioBAttempt(attempt);
      renderAudioBAttempt(attempt);
      consumeAudioBQueuedReturn(attempt, transaction);
    },
    onInterrupted: (handle, interruptionReason) => {
      if (!audioBAttemptIsCurrent(attempt) || attempt.audioTransaction !== transaction || transaction.endedAt) return;
      writeAudioBTransaction(transaction, handle, "interrupted");
      onInterrupted?.(transaction, handle, interruptionReason);
      enterAudioBSoundPause(attempt, context, `teaching-${interruptionReason}`);
    }
  });
  if (audioBAttemptIsCurrent(attempt) && attempt.audioTransaction === transaction) {
    transaction.playbackId ||= playback.id;
    transaction.scheduledAt = playback.scheduledAt || transaction.scheduledAt;
    transaction.status = playback.status;
    transaction.contextState = playback.contextState || transaction.contextState;
    persistAudioBAttempt(attempt);
  }
  return { playback, transaction };
}

function beginAudioBExternalInput(attempt, pending) {
  if (!audioBAttemptIsCurrent(attempt) || !pending) return false;
  clearLs04Timers();
  clearLs05Timers();
  const now = new Date().toISOString();
  attempt.pendingInput = { ...pending, acceptedAt: now };
  attempt.audioTransaction = {
    context: "external-input",
    kind: "external-input",
    reason: "microphone-onset",
    payload: { ...attempt.pendingInput },
    notes: [{ midi: pending.midi, delayMs: 0, durationMs: 0 }],
    playbackId: null,
    scheduledAt: now,
    startedAt: now,
    endedAt: null,
    interruptedAt: null,
    startAudioTime: null,
    endAudioTime: null,
    interruptedAudioTime: null,
    contextState: "external-input",
    status: "playing",
    returnQueued: false,
    returnQueuedConsumedAt: null,
    outcomeRecorded: false
  };
  attempt.soundPauseContext = null;
  attempt.phase = "external-input";
  setAudioBInputArmed(attempt, false);
  traceAudioBLifecycle(attempt, "started", attempt.audioTransaction, { external: true });
  persistAudioBAttempt(attempt);
  renderAudioBAttempt(attempt);
  return true;
}

function finishAudioBExternalInput(attempt, midi, source, commit) {
  const transaction = attempt?.audioTransaction;
  const pending = attempt?.pendingInput;
  if (!audioBAttemptIsCurrent(attempt) || attempt.phase !== "external-input" || !transaction || !pending) return false;
  if (pending.source !== source || (Number.isFinite(midi) && pending.midi !== midi)) return false;
  transaction.endedAt = new Date().toISOString();
  transaction.contextState = "external-input-quiet";
  transaction.status = "ended";
  transaction.outcomeRecorded = true;
  traceAudioBLifecycle(attempt, "ended", transaction, { external: true });
  commit(pending, transaction, { returnQueued: transaction.returnQueued === true, external: true });
  if (!audioBAttemptIsCurrent(attempt) || attempt.audioTransaction !== transaction) return true;
  persistAudioBAttempt(attempt);
  renderAudioBAttempt(attempt);
  consumeAudioBQueuedReturn(attempt, transaction);
  return true;
}

function interruptAudioBExternalInput(attempt, reason = "external-interrupted") {
  if (!audioBAttemptIsCurrent(attempt) || !audioBExternalInputIsActive(attempt)) return false;
  const transaction = attempt.audioTransaction;
  transaction.interruptedAt = new Date().toISOString();
  transaction.contextState = "external-input-interrupted";
  transaction.status = "interrupted";
  transaction.interruptReason = reason;
  enterAudioBSoundPause(attempt, "external-input", reason);
  return true;
}

function interruptActiveAudioBExternalInput(reason) {
  return interruptAudioBExternalInput(currentAudioBAttempt(), reason);
}

function audioBTeachingSurfaceIsActive() {
  return state.screen === "garden" && Boolean(
    currentListeningAction("LS04") || currentListeningAction("LS05")
  );
}

function audioBResponsePhaseForAttempt(attempt) {
  const levelId = audioBLevelId(attempt);
  if (levelId === "LS04") return attempt?.supportStage === "assisted" ? "assisted" : "awaiting-response";
  if (levelId === "LS05") {
    return ["assisted", "candidate-outside"].includes(attempt?.callRepairStage)
      ? "assisted-retry"
      : "awaiting-response";
  }
  return "awaiting-response";
}

function normalizeAudioBAttemptForRecovery(attempt, { clearHeldMidi = true } = {}) {
  if (!attempt) return attempt;
  if (clearHeldMidi) clearAudioBStaleMidiHolds(attempt);
  const transaction = attempt.audioTransaction;
  if (!transaction || transaction.endedAt || transaction.interruptedAt) return attempt;
  transaction.interruptedAt = new Date().toISOString();
  transaction.contextState = "recovered-without-active-playback";
  transaction.status = "interrupted";
  attempt.soundPauseContext = transaction.context || null;
  attempt.phase = "sound-paused";
  setAudioBInputArmed(attempt, false);
  traceAudioBLifecycle(attempt, "interrupted", transaction, { interruptionReason: "reload-without-active-playback" });
  return attempt;
}

function releaseAudioBMidiInput(attempt, midi) {
  if (!audioBAttemptIsCurrent(attempt) || !releaseAudioBMidiNote(attempt, midi)) return false;
  if (!armAudioBResponse(attempt)) {
    persistAudioBAttempt(attempt);
    renderAudioBAttempt(attempt);
  }
  return true;
}

function audioBPendingMatchesCurrentCall(attempt, pending) {
  return Boolean(
    pending &&
    Number.isInteger(pending.callIndex) &&
    pending.callIndex === attempt?.callIndex &&
    pending.targetMidi === (audioBLevelId(attempt) === "LS04" ? ls04Target(attempt) : ls05Target(attempt))
  );
}

function recordAudioBInputPresentation(midi, source, correct) {
  state.lastInputMidi = midi;
  state.lastInputResult = correct ? "correct" : "wrong";
  if (els.inputStatus) els.inputStatus.textContent = `输入：${source}`;
  if (els.heardStatus) els.heardStatus.textContent = `听到：${noteForMidi(midi)?.name || midi}`;
}

function startAudioBChildEcho(attempt, pending, { recovery = false } = {}) {
  if (!audioBAttemptIsCurrent(attempt) || !audioBPendingMatchesCurrentCall(attempt, pending)) return null;
  const heardFrequency = noteForMidi(pending.midi)?.frequency || midiFrequency(pending.midi);
  attempt.pendingInput = { ...pending };
  return startAudioBTeachingSequence(attempt, {
    context: "child-echo",
    kind: "child-echo",
    reason: recovery ? "recovery" : "child-input",
    notes: [{ midi: pending.midi, durationMs: 420, delayMs: 0, child: true }],
    payload: { ...pending, recovery },
    scheduledPhase: "child-echo-scheduled",
    playingPhase: "child-echo-playing",
    onStarted: (transaction) => {
      transaction.payload.frequency = heardFrequency;
      traceAudioBInputStarted(attempt, pending, transaction, "child-echo", { recovery });
    },
    onEnded: (transaction, playback, { returnQueued }) => {
      if (transaction.outcomeRecorded) return;
      transaction.outcomeRecorded = true;
      commitAudioBInput(attempt, pending, transaction, { returnQueued, external: false });
    }
  });
}

function beginAudioBInput(attempt, midi, source) {
  const levelId = audioBLevelId(attempt);
  const targetMidi = levelId === "LS04" ? ls04Target(attempt) : ls05Target(attempt);
  if (!Number.isFinite(targetMidi)) return false;
  clearLs04Timers();
  clearLs05Timers();
  const pending = {
    midi,
    source,
    targetMidi,
    callIndex: attempt.callIndex,
    occurredAt: new Date().toISOString(),
    correct: midi === targetMidi,
    visualAssist: levelId === "LS05" && attempt.phase === "visual-assist"
  };
  if (isMicrophoneSource(source)) return beginAudioBExternalInput(attempt, pending);
  return Boolean(startAudioBChildEcho(attempt, pending));
}

function traceAudioBInputStarted(attempt, pending, transaction, kind, extra = {}) {
  const trace = audioBLevelId(attempt) === "LS04" ? traceLs04Audio : traceLs05Audio;
  trace(attempt, kind, pending.midi, {
    callIndex: pending.callIndex,
    targetMidi: pending.targetMidi,
    source: pending.source,
    frequency: noteForMidi(pending.midi)?.frequency || midiFrequency(pending.midi),
    ...extra
  });
}

function traceAudioBInputEnded(attempt, pending, transaction, kind, extra = {}) {
  const trace = audioBLevelId(attempt) === "LS04" ? traceLs04Audio : traceLs05Audio;
  trace(attempt, kind, pending.targetMidi, {
    callIndex: pending.callIndex,
    childMidi: pending.midi,
    source: pending.source,
    frequency: noteForMidi(pending.midi)?.frequency || midiFrequency(pending.midi),
    playbackId: transaction?.playbackId || null,
    ...extra
  });
}

function startAudioBWrongRepair(attempt, pending, { recovery = false, presentationCounted = false } = {}) {
  if (!audioBAttemptIsCurrent(attempt) || !audioBPendingMatchesCurrentCall(attempt, pending)) return null;
  const levelId = audioBLevelId(attempt);
  const targetMidi = pending.targetMidi;
  const modeledAfterRepair = levelId === "LS04"
    ? attempt.callWrongCount >= 4
    : attempt.callWrongCount >= 4;
  const presentationPhase = modeledAfterRepair
    ? "modeled-playing"
    : (levelId === "LS04"
      ? "wrong-feedback"
      : (attempt.callRepairStage === "pair-compare"
        ? "pair-compare"
        : (attempt.callRepairStage === "wrong-known" ? "wrong-known" : "assisted-retry")));
  const responsePhase = audioBResponsePhaseForAttempt(attempt);
  attempt.pendingInput = null;
  return startAudioBTeachingSequence(attempt, {
    context: "wrong-repair",
    kind: "wrong-repair",
    reason: "wrong-repair",
    notes: [{ midi: targetMidi, durationMs: 720, delayMs: 0 }],
    payload: {
      ...pending,
      originalReason: "wrong-repair",
      responsePhase,
      presentationPhase,
      modeledAfterRepair,
      recovery,
      presentationCounted
    },
    scheduledPhase: presentationPhase,
    playingPhase: presentationPhase,
    onStarted: (transaction) => {
      if (!transaction.payload?.presentationCounted) {
        if (levelId === "LS05") {
          attempt.replayCountSystem += 1;
          attempt.callReplayCountSystem += 1;
        }
        if (transaction.payload) transaction.payload.presentationCounted = true;
      }
      traceAudioBInputEnded(attempt, pending, transaction, "target-replay", { recovery });
    },
    onEnded: (transaction, playback, { returnQueued }) => {
      traceAudioBInputEnded(attempt, pending, transaction, "wrong-repair-ended", { recovery });
      if (transaction.payload?.modeledAfterRepair) {
        if (levelId === "LS04") {
          completeLs04Modeled("assisted-retry-wrong", { targetAlreadyPlayed: true, returnQueued });
        } else {
          completeLs05Modeled("assisted-retry-wrong", { targetAlreadyPlayed: true, returnQueued });
        }
        return;
      }
      attempt.phase = transaction.payload?.responsePhase || audioBResponsePhaseForAttempt(attempt);
      if (levelId === "LS05" && attempt.phase === "assisted-retry") attempt.assistedCueVisible = false;
      persistAudioBAttempt(attempt);
      renderAudioBAttempt(attempt);
      if (!returnQueued) armAudioBResponse(attempt);
    }
  });
}

function commitAudioBInput(attempt, pending, transaction, { returnQueued = false, external = false } = {}) {
  if (!audioBAttemptIsCurrent(attempt) || !audioBPendingMatchesCurrentCall(attempt, pending)) return false;
  const levelId = audioBLevelId(attempt);
  if (attempt.pendingInput?.occurredAt === pending.occurredAt) attempt.pendingInput = null;
  if (levelId === "LS04") return commitLs04AudioBInput(attempt, pending, transaction, { returnQueued, external });
  if (levelId === "LS05") return commitLs05AudioBInput(attempt, pending, transaction, { returnQueued, external });
  return false;
}

function recoverAudioBAttempt() {
  const attempt = currentAudioBAttempt();
  if (!attempt || attempt.phase !== "sound-paused") return false;
  clearLs04Timers();
  clearLs05Timers();
  clearAudioBStaleMidiHolds(attempt);
  const transaction = attempt.audioTransaction;
  const context = attempt.soundPauseContext || transaction?.context;
  const payload = transaction?.payload || attempt.pendingInput || {};
  const reason = payload.originalReason || payload.reason || transaction?.reason || "resume";
  if (context === "external-input") {
    attempt.pendingInput = null;
    attempt.phase = audioBResponsePhaseForAttempt(attempt);
    attempt.soundPauseContext = null;
    setAudioBInputArmed(attempt, true);
    persistAudioBAttempt(attempt);
    renderAudioBAttempt(attempt);
    return true;
  }
  if (context === "reference") {
    return audioBLevelId(attempt) === "LS04"
      ? Boolean(playLs04Reference({ recovery: true }))
      : Boolean(playLs05Reference({ recovery: true }));
  }
  if (context === "target") {
    const presentationCounted = payload.presentationCounted === true;
    return audioBLevelId(attempt) === "LS04"
      ? Boolean(playLs04Target(reason, { recovery: true, presentationCounted }))
      : Boolean(playLs05Target(reason, { recovery: true, presentationCounted }));
  }
  if (context === "child-echo" && audioBPendingMatchesCurrentCall(attempt, payload)) {
    return Boolean(startAudioBChildEcho(attempt, payload, { recovery: true }));
  }
  if (context === "wrong-repair" && audioBPendingMatchesCurrentCall(attempt, payload)) {
    return Boolean(startAudioBWrongRepair(attempt, payload, {
      recovery: true,
      presentationCounted: payload.presentationCounted === true
    }));
  }
  if (context === "modeled") {
    return audioBLevelId(attempt) === "LS04"
      ? Boolean(completeLs04Modeled(payload.reason || "modeled-recovery"))
      : Boolean(completeLs05Modeled(payload.reason || "modeled-recovery"));
  }
  attempt.phase = attempt.referencePlayed ? "replay-ready" : "reference-ready";
  attempt.soundPauseContext = null;
  setAudioBInputArmed(attempt, false);
  persistAudioBAttempt(attempt);
  renderAudioBAttempt(attempt);
  return true;
}

function releaseAudioBInput(midi, source) {
  const attempt = currentAudioBAttempt();
  if (!attempt) return false;
  if (source === "MIDI") return releaseAudioBMidiInput(attempt, midi);
  if (!isMicrophoneSource(source)) return false;
  return finishAudioBExternalInput(attempt, midi, source, (pending, transaction, options) => {
    commitAudioBInput(attempt, pending, transaction, { ...options, external: true });
  });
}

function scheduleLs05ResponseTimeout() {
  if (state.ls05Timer) clearTimeout(state.ls05Timer);
  state.ls05Timer = setTimeout(() => {
    state.ls05Timer = null;
    const attempt = ensureLs05Attempt();
    if (!attempt || attempt.phase !== "awaiting-response") return;
    attempt.strongCueUsed = true;
    attempt.targetRevealedBeforeResponse = true;
    attempt.callStrongCueUsed = true;
    attempt.callTargetRevealedBeforeResponse = true;
    attempt.callRepairStage = "assisted";
    attempt.assistedCueVisible = true;
    attempt.phase = "assisted-retry";
    persistLs05Attempt();
    renderGardenScreen();
    state.ls05FeedbackTimer = setTimeout(() => {
      state.ls05FeedbackTimer = null;
      if (attempt.phase !== "assisted-retry") return;
      attempt.assistedCueVisible = false;
      persistLs05Attempt();
      renderGardenScreen();
    }, 1250);
    scheduleLs05AssistedTimeout();
  }, CH3_LONG_WAIT_MS);
}

function scheduleLs05AssistedTimeout() {
  if (state.ls05Timer) clearTimeout(state.ls05Timer);
  state.ls05Timer = setTimeout(() => {
    state.ls05Timer = null;
    completeLs05Modeled("assisted-timeout");
  }, LS05_ASSISTED_WAIT_MS);
}

function playLs05Reference({ recovery = false } = {}) {
  const attempt = ensureLs05Attempt();
  if (!attempt || state.screen !== "garden") return null;
  clearLs05Timers();
  return startAudioBTeachingSequence(attempt, {
    context: "reference",
    kind: "reference",
    reason: "reference",
    notes: [{ midi: 60, durationMs: 720, delayMs: 0 }],
    payload: { originalReason: "reference", recovery },
    scheduledPhase: "reference",
    playingPhase: "reference",
    onStarted: () => traceLs05Audio(attempt, "reference", 60, { recovery }),
    onEnded: (transaction, playback, { returnQueued }) => {
      attempt.referencePlayed = true;
      attempt.phase = "replay-ready";
      persistLs05Attempt();
      renderGardenScreen();
      if (returnQueued) return;
      state.ls05Timer = setTimeout(() => {
        state.ls05Timer = null;
        if (audioBAttemptIsCurrent(attempt) && attempt.phase === "replay-ready") playLs05Target("system-first");
      }, 900);
    }
  });
}

function playLs05Target(reason = "system", { recovery = false, presentationCounted = false } = {}) {
  const attempt = ensureLs05Attempt();
  const targetMidi = ls05Target(attempt);
  if (!attempt || targetMidi === null || state.screen !== "garden") return null;
  clearLs05Timers();
  attempt.respondingFlower = null;
  return startAudioBTeachingSequence(attempt, {
    context: "target",
    kind: "target",
    reason,
    notes: [{ midi: targetMidi, durationMs: 720, delayMs: 0 }],
    payload: { targetMidi, callIndex: attempt.callIndex, originalReason: reason, recovery, presentationCounted },
    scheduledPhase: "target-playing",
    playingPhase: "target-playing",
    onStarted: (transaction) => {
      if (!transaction.payload?.presentationCounted) {
        if (reason === "child-replay") {
          attempt.replayCountChild += 1;
          attempt.callReplayCountChild += 1;
        } else if (["resume", "system-replay"].includes(reason)) {
          attempt.replayCountSystem += 1;
          attempt.callReplayCountSystem += 1;
        }
        if (transaction.payload) transaction.payload.presentationCounted = true;
      }
      traceLs05Audio(attempt, "target", targetMidi, { reason, callIndex: attempt.callIndex, recovery });
    },
    onEnded: (transaction, playback, { returnQueued }) => {
      attempt.phase = audioBResponsePhaseForAttempt(attempt);
      if (attempt.phase === "awaiting-response" && !attempt.callFirstValidInput) attempt.callResponseStartedAt = new Date().toISOString();
      persistLs05Attempt();
      renderGardenScreen();
      if (!returnQueued) armAudioBResponse(attempt);
    }
  });
}

function resumeLs05Flow({ fromReload = false } = {}) {
  const attempt = ensureLs05Attempt();
  if (!attempt || state.screen !== "garden") return;
  clearLs05Timers();
  if (!audioBPlaybackIsActive(attempt) && !audioBExternalInputIsActive(attempt)) clearAudioBStaleMidiHolds(attempt);
  if (fromReload) {
    if (!["reference-ready", "reference"].includes(attempt.phase)) {
      attempt.callTimingInterrupted = true;
      attempt.callResponseStartedAt = null;
    }
    normalizeAudioBAttemptForRecovery(attempt);
  }
  if (attempt.phase === "visual-assist") {
    armAudioBResponse(attempt);
    return;
  }
  if (attempt.phase === "sound-paused") {
    persistLs05Attempt();
    renderGardenScreen();
    return;
  }
  if (["awaiting-response", "assisted-retry"].includes(attempt.phase)) {
    armAudioBResponse(attempt);
    return;
  }
  if (attempt.phase === "complete") {
    persistLs05Attempt();
    renderGardenScreen();
    return;
  }
  if (attempt.phase === "correct-feedback" && !fromReload) {
    playLs05Target("system-next");
    return;
  }
  if (fromReload) {
    attempt.phase = attempt.referencePlayed ? "replay-ready" : "reference-ready";
    persistLs05Attempt();
    renderGardenScreen();
    return;
  }
  if (!state.audioUnlocked) {
    attempt.phase = attempt.referencePlayed ? "replay-ready" : "reference-ready";
    persistLs05Attempt();
    renderGardenScreen();
    return;
  }
  if (!attempt.referencePlayed) playLs05Reference();
  else playLs05Target("resume");
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
  clearLs05Timers();
  clearPairedListeningTimers();
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
    modeledInputs: state.gardenModeledInputs.map((input) => ({ ...input })),
    audioAttempt: cloneAudioAAttempt(state.gardenAudioAttempt)
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
  state.gardenAudioAttempt = pending?.audioAttempt && pending.audioAttempt.kind === "garden"
    ? normalizeAudioAAttemptForRecovery(cloneAudioAAttempt(pending.audioAttempt))
    : null;
  if (state.gardenAudioAttempt) {
    setAudioAInputArmed(state.gardenAudioAttempt, state.gardenAudioAttempt.phase === "awaiting-response");
    persistGardenPendingAttempt();
  }
}

function clearGardenPendingAttempt(action = currentSessionAction()) {
  if (!action?.gardenAttempt) return;
  delete action.gardenAttempt;
  state.gardenAudioAttempt = null;
}

function setGardenEquipmentState(equipmentState, { persist = true } = {}) {
  state.chapter3.equipmentState = equipmentState;
  if (equipmentState === "safe-open") state.chapter3.airCheckComplete = true;
  if (persist) persistChapter3Progress();
  renderGardenScreen();
  if (equipmentState === "safe-open") {
    const lesson = audioAGardenLesson();
    const audioAttempt = lesson && !state.chapter3.leaves[lesson.leaf - 1]
      ? ensureGardenAudioAttempt()
      : null;
    if (audioAttempt) {
      if (audioAttempt.phase === "model-ready") startGardenAudioAModel(audioAttempt, "system-first");
      else if (audioAttempt.phase === "awaiting-response") scheduleGardenLongWait();
      return;
    }
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
  const audioAttempt = ensureGardenAudioAttempt();
  if (audioAttempt && (audioAttempt.phase !== "awaiting-response" || !audioAttempt.inputArmed)) return;
  state.gardenLongWaitTimer = setTimeout(() => {
    state.gardenLongWaitTimer = null;
    completeGardenModeledSuccess("long-wait");
  }, CH3_LONG_WAIT_MS);
}

function gardenLessonCopy(lesson) {
  const count = lesson?.id === "LS03" ? state.chapter3.ls03QualifiedInputs : 0;
  if (!lesson) return { kicker: "花园休息", main: "三片叶长好啦", support: "星芽在新家园里休息。" };
  const audioAttempt = state.gardenAudioAttempt;
  if (audioAttempt?.lessonId === lesson.id) {
    if (["model-scheduled", "model-playing"].includes(audioAttempt.phase)) {
      return { kicker: "先听一声", main: "花园正在唱", support: "声音停下后，再弹同样的琴键。" };
    }
    if (["child-echo-scheduled", "child-echo-playing"].includes(audioAttempt.phase)) {
      return { kicker: "这一声还在唱", main: "先听完", support: "声音停下后，花园才会知道这一次。" };
    }
    if (["wrong-repair-scheduled", "wrong-repair-playing"].includes(audioAttempt.phase)) {
      return { kicker: "先听两个声音", main: "刚才的琴键，再听花园", support: "两个声音都停下后，再试一次。" };
    }
    if (["modeled-scheduled", "modeled-playing"].includes(audioAttempt.phase)) {
      return { kicker: "星芽正在示范", main: "先听清楚这一声", support: "声音停下后，叶子才会安顿好。" };
    }
    if (audioAttempt.phase === "sound-paused") {
      return { kicker: "声音先休息", main: "按一次琴键继续听", support: "继续后会从同一片叶和同一个声音重新开始。" };
    }
  }
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
  els.listeningCandidates.hidden = false;
  els.ls05FlowerArc.hidden = true;
  els.pairedListeningWorld.hidden = true;
  els.ls05Compare.hidden = true;
  els.ls05VisualAssist.hidden = true;
  els.gardenSpeech.hidden = false;
  els.gardenSpeechKicker.textContent = copy.kicker;
  els.gardenSpeechMain.textContent = copy.main;
  els.gardenSpeechSupport.textContent = copy.support;
  const playing = audioBPlaybackIsActive(attempt) || ["reference", "target-playing", "wrong-feedback", "child-echo-playing", "modeled-playing"].includes(attempt?.phase);
  els.listeningSource.classList.toggle("is-playing", playing);
  els.listeningSource.classList.toggle("is-sound-paused", attempt?.phase === "sound-paused");
  els.listeningCandidates.classList.toggle("is-scored", ["correct-feedback", "complete"].includes(attempt?.phase));
  els.listeningCandidates.classList.toggle("is-complete", attempt?.phase === "complete" || state.chapter3.ls04Completed || Boolean(state.chapter3.lessonEvidence.LS04?.completedAt));
  els.listeningResult.classList.remove("is-complete");
  const replayDisabled = playing || attempt?.phase === "correct-feedback" || attempt?.phase === "complete";
  els.listeningReplay.disabled = replayDisabled;
  els.listeningReplay.setAttribute("aria-disabled", String(replayDisabled));
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

function ls05Copy(attempt) {
  if (!attempt) return { kicker: "花粉铃", main: "准备叫醒三朵花", support: "按扬声器先听 C，我唱 Do。" };
  const target = noteForMidi(ls05Target(attempt));
  const lastInput = attempt.childInputs[attempt.childInputs.length - 1];
  const heard = noteForMidi(lastInput?.midi);
  if (attempt.phase === "reference-ready") return { kicker: "先定一个声音", main: "按一下，听 C", support: "我把 C 唱作 Do；这一声不计题。" };
  if (attempt.phase === "reference") return { kicker: "声音参照", main: "这是 C", support: "我唱 Do；接下来听花粉铃。" };
  if (attempt.phase === "replay-ready") return { kicker: "回到花粉铃", main: "按一下继续听", support: "题目和花粉格都还在。" };
  if (attempt.phase === "sound-paused") return { kicker: "声音先休息", main: "请先把声音打开", support: "打开后，按扬声器重听同一声。" };
  if (attempt.phase === "target-playing") return { kicker: `花粉 ${attempt.callIndex + 1}/5`, main: "先听花粉铃", support: "声音停下后，再弹同一个键。" };
  if (attempt.phase === "wrong-known") return { kicker: "先比较声音", main: `刚按了 ${heard?.name || "别的键"}`, support: `我先唱刚才的 ${heard?.solfege || "声音"}，再听花粉铃。` };
  if (attempt.phase === "pair-compare") {
    const pair = ls05VisibleConfusionPair(attempt).map((midi) => noteForMidi(midi)).filter(Boolean);
    return { kicker: "两个声音一起听", main: pair.map((note) => note.name).join(" / "), support: "听一听这两个声音，再找和花粉铃相同的键。" };
  }
  if (attempt.phase === "assisted-retry") return { kicker: "星芽陪你找", main: `找琴键 ${target?.name || ""}`, support: `我唱 ${target?.solfege || "这个音"}，看${target?.locator || "黑键位置"}。` };
  if (attempt.phase === "visual-assist") return { kicker: "看着完成这一格", main: `${target?.name || ""} · ${target?.locator || "黑键位置"}`, support: `声音今天休息，我唱 ${target?.solfege || "这个音"}，我们看着找。` };
  if (attempt.phase === "modeled-playing") return { kicker: "听一次清楚示范", main: "花粉铃正在示范", support: "这一格会保留，随后回地图休息。" };
  if (attempt.phase === "correct-feedback") {
    const found = noteForMidi(attempt.sequence[attempt.callIndex - 1]);
    return { kicker: "花朵醒了一下", main: `${found?.name || "这朵花"} 找到了`, support: `我把它唱作 ${found?.solfege || "这个音"}。下一声会自己响起。` };
  }
  if (attempt.phase === "modeled-success") return { kicker: "这一格先安顿好", main: "花粉环会替你保留", support: "下次回来先听 C，再继续剩下的声音。" };
  if (attempt.phase === "complete") return { kicker: "三朵花都醒啦", main: "花粉环转满了", support: "今天先在花园歇一会儿。" };
  return { kicker: `花粉 ${Math.min(5, attempt.callIndex + 1)}/5`, main: "弹同样的声音", support: "可以按扬声器重听。" };
}

function renderLs05Screen() {
  const attempt = ensureLs05Attempt();
  const targetMidi = ls05Target(attempt) ?? 60;
  const target = noteForMidi(targetMidi);
  const copy = ls05Copy(attempt);
  const equipmentState = "safe-open";
  els.mainTitle.textContent = "呼吸花园";
  els.levelBadge.textContent = "LS05";
  els.appShell.dataset.levelId = "LS05";
  els.appShell.dataset.phase = "garden-listening";
  els.appShell.dataset.chapter3 = "listening-three";
  els.gardenScene.dataset.airState = equipmentState;
  els.gardenScene.dataset.lesson = "LS05";
  els.gardenScene.dataset.listeningPhase = attempt?.phase || "reference-ready";
  els.gardenScene.dataset.reviewableForMastery = "true";
  els.gardenScene.dataset.repairStage = attempt?.callRepairStage || "none";
  els.gardenXingya.dataset.equipment = equipmentState;
  renderGardenCharacterAsset(equipmentState);
  els.gardenAirCheck.hidden = true;
  els.gardenPlant.hidden = true;
  els.gardenListening.hidden = false;
  els.listeningCandidates.hidden = true;
  els.ls05FlowerArc.hidden = false;
  els.pairedListeningWorld.hidden = true;
  els.gardenSpeech.hidden = false;
  els.gardenSpeechKicker.textContent = copy.kicker;
  els.gardenSpeechMain.textContent = copy.main;
  els.gardenSpeechSupport.textContent = copy.support;
  const playing = audioBPlaybackIsActive(attempt) || ["reference", "target-playing", "wrong-known", "pair-compare", "modeled-playing", "child-echo-playing"].includes(attempt?.phase);
  els.listeningSource.classList.toggle("is-playing", playing);
  els.listeningSource.classList.toggle("is-sound-paused", attempt?.phase === "sound-paused");
  const flowerNodes = [...els.ls05FlowerArc.querySelectorAll(".ls05-flower")];
  flowerNodes.forEach((flower) => flower.classList.remove("is-responding", "is-open"));
  if (attempt?.phase === "complete" || state.chapter3.ls05Completed) {
    flowerNodes.forEach((flower) => flower.classList.add("is-open"));
  } else if (attempt?.phase === "correct-feedback" && attempt.respondingFlower) {
    const flowerIndex = { C: 0, D: 1, E: 2 }[attempt.respondingFlower];
    if (Number.isInteger(flowerIndex)) flowerNodes[flowerIndex]?.classList.add("is-responding");
  }
  const pairVisible = attempt?.phase === "pair-compare";
  const assistedVisible = attempt?.phase === "assisted-retry";
  const visualAssistVisible = attempt?.phase === "visual-assist";
  els.ls05Compare.hidden = !pairVisible && !assistedVisible && !visualAssistVisible;
  if (pairVisible) {
    const pair = ls05VisibleConfusionPair(attempt).map((midi) => noteForMidi(midi)?.name).filter(Boolean);
    els.ls05Compare.innerHTML = pair.map((name) => `<span>${name}<small>${friendlyKeyLocator(noteForMidi(({ C: 60, D: 62, E: 64 })[name]))}</small></span>`).join("");
    els.ls05Compare.setAttribute("aria-label", `比较 ${pair.join(" 和 ")}`);
  } else if (assistedVisible) {
    els.ls05Compare.innerHTML = ["C", "D", "E"].map((name) => `<span>${name}</span>`).join("");
    els.ls05Compare.setAttribute("aria-label", "候选琴键 C、D、E");
  } else if (visualAssistVisible) {
    els.ls05Compare.innerHTML = `<span class="is-guide">${target?.name || ""}<small>${friendlyKeyLocator(target)}</small></span>`;
    els.ls05Compare.setAttribute("aria-label", `键位帮助：${target?.name || ""}，${target?.locator || ""}`);
  } else {
    els.ls05Compare.innerHTML = "";
    els.ls05Compare.removeAttribute("aria-label");
  }
  const replayDisabled = playing || ["correct-feedback", "complete", "modeled-success"].includes(attempt?.phase);
  els.listeningReplay.disabled = replayDisabled;
  els.listeningReplay.setAttribute("aria-disabled", String(replayDisabled));
  els.listeningReplay.hidden = attempt?.phase === "complete";
  const visualAssistAllowed = (attempt?.callRepairStage === "assisted" && attempt?.inputArmed &&
    !playing && !audioBExternalInputIsActive(attempt)) ||
    (attempt?.phase === "sound-paused" && attempt?.soundPauseCount >= 2);
  els.ls05VisualAssist.hidden = !visualAssistAllowed || ["visual-assist", "correct-feedback", "modeled-playing", "modeled-success", "complete"].includes(attempt?.phase);
  els.listeningCallProgress.innerHTML = [0, 1, 2, 3, 4].map((index) => {
    const done = index < (attempt?.neutralProgress || 0);
    const active = index === (attempt?.callIndex || 0) && attempt?.phase !== "complete";
    return `<span class="${done ? "done" : ""}${active ? " active" : ""}" aria-hidden="true"></span>`;
  }).join("");
  els.listeningCallProgress.setAttribute("aria-label", `五个花粉格已完成 ${attempt?.neutralProgress || 0} 个`);
  els.listeningResult.classList.remove("is-complete");
  els.gardenProgress.innerHTML = "";
  els.gardenProgress.hidden = true;
  els.nextAction.textContent = ["reference-ready", "reference"].includes(attempt?.phase)
    ? "先听 C 的参照音"
    : (attempt?.phase === "complete" ? "三朵花已经一起开放" : `花粉 ${Math.min(5, (attempt?.callIndex || 0) + 1)}/5`);
  els.inputStatus.textContent = "输入：屏幕琴键";
  els.heardStatus.textContent = "听到：-";
  const showTarget = visualAssistVisible || (assistedVisible && attempt?.assistedCueVisible);
  renderKeyboard(target, {
    scaffold: showTarget ? "garden-listening-assisted" : "garden-listening",
    disableTarget: !showTarget,
    showTarget,
    concealTargetIdentity: !showTarget
  });
}

function ls05VisibleConfusionPair(attempt) {
  return [...new Set(attempt?.callConfusionPair || [])].sort((a, b) => a - b);
}

function pairedListeningVisibleConfusionPair(attempt) {
  return [...new Set(attempt?.callConfusionPair || [])].sort((a, b) => a - b);
}

function pairedListeningCopy(attempt, config) {
  if (!attempt || !config) return { kicker: "声音伙伴", main: "准备听两个声音", support: "按扬声器开始带路。" };
  const target = noteForMidi(pairedListeningTarget(attempt));
  const lastInput = attempt.childInputs[attempt.childInputs.length - 1];
  const heard = noteForMidi(lastInput?.midi);
  if (attempt.phase === "guide-ready") {
    return config.levelId === "LS06"
      ? { kicker: "回声石先带路", main: "这是 C", support: "我唱 Do。找到琴键上的 C，按一下。" }
      : { kicker: "边界花先带路", main: "这是 E", support: "我唱 Mi。找到两颗黑键右边的 E，按一下。" };
  }
  if (attempt.phase === "guide-next-pending") {
    const midi = config.candidates[attempt.guideIndex] ?? config.candidates[0];
    const note = noteForMidi(midi);
    if (attempt.pendingGuidePresentation?.requiresExplicitGesture === true) {
      return {
        kicker: "\u5e26\u8def\u97f3\u8fd8\u5728\u8fd9\u91cc",
        main: `\u8fd9\u662f ${note?.name || ""}`,
        support: "\u6309\u626c\u58f0\u5668\u7ee7\u7eed\u542c\u4e0b\u4e00\u9897\u5e26\u8def\u97f3\u3002"
      };
    }
    return {
      kicker: "\u5e26\u8def\u97f3\u6b63\u5728\u8fd4\u56de\u5730\u56fe",
      main: `\u8fd9\u662f ${note?.name || ""}`,
      support: "\u7b49\u5f85\u5730\u56fe\u8fd4\u56de\u3002"
    };
  }
  if (attempt.phase === "visible-guide") {
    const midi = config.candidates[attempt.guideIndex] ?? config.candidates[0];
    const note = noteForMidi(midi);
    const locator = config.levelId === "LS07"
      ? (note?.midi === 64 ? "两颗黑键右边的 E" : "三颗黑键左边的 F")
      : `琴键上的 ${note?.name || ""}`;
    if (attempt.guideRepairStage === "soft-replay") {
      return { kicker: "星芽再带一次", main: `这是 ${note?.name || ""}`, support: `我再唱一次 ${note?.solfege || ""}。找到${locator}，按一下。` };
    }
    return config.levelId === "LS06"
      ? { kicker: "回声石先带路", main: `这是 ${note?.name || ""}`, support: `我唱 ${note?.solfege || ""}。找到琴键上的 ${note?.name || ""}，按一下。` }
      : { kicker: "边界花先带路", main: `这是 ${note?.name || ""}`, support: `我唱 ${note?.solfege || ""}。找到${locator}，按一下。` };
  }
  if (attempt.phase === "replay-ready") return { kicker: `回到 ${config.progressLabel}`, main: "按一下继续听", support: "当前呼叫和已经完成的故事格都保留。" };
  if (attempt.phase === "sound-paused") return { kicker: "声音先休息", main: "请先把声音打开", support: attempt.guidePlayed ? "打开后重听同一声。" : "打开后重新走本关带路。" };
  if (attempt.phase === "target-playing") return { kicker: `${config.progressLabel} ${attempt.callIndex + 1}/4`, main: "先听中央声音", support: "声音停下后，再弹同一个键。" };
  if (attempt.phase === "wrong-known") return { kicker: "先比较声音", main: `刚按了 ${heard?.name || "别的键"}`, support: "先听刚才的声音，再听中央目标。" };
  if (attempt.phase === "pair-compare") {
    const names = pairedListeningVisibleConfusionPair(attempt).map((midi) => noteForMidi(midi)?.name).filter(Boolean);
    return { kicker: "两个声音一起听", main: names.join(" / "), support: "听一听这两个声音，再找和中央声音相同的键。" };
  }
  if (attempt.phase === "assisted-retry") {
    return config.levelId === "LS06"
      ? { kicker: "星芽陪你找", main: `在 C 和 G 里找 ${target?.name || ""}`, support: `我唱 ${target?.solfege || ""}；两边键位都在这里。` }
      : { kicker: "星芽陪你看边界", main: `在 E 和 F 里找 ${target?.name || ""}`, support: `我唱 ${target?.solfege || ""}；E 靠两黑右，F 靠三黑左。` };
  }
  if (attempt.phase === "visual-assist") return { kicker: "看着完成这一格", main: `${target?.name || ""} · ${friendlyKeyLocator(target)}`, support: `我唱 ${target?.solfege || ""}；这格只完成故事，不计听辨正确。` };
  if (attempt.phase === "modeled-playing") return { kicker: "听一次清楚示范", main: "中央声音正在示范", support: "只保留当前一格，随后回地图休息。" };
  if (attempt.phase === "correct-feedback") {
    const found = noteForMidi(attempt.sequence[attempt.callIndex - 1]);
    return { kicker: "找到了", main: `${found?.name || "这一声"} 找到了`, support: `我把它唱作 ${found?.solfege || "这个音"}。下一声会自己响起。` };
  }
  if (attempt.phase === "modeled-success") return { kicker: "这一格先安顿好", main: `${config.progressLabel}会保留进度`, support: "下次回来先重新做本关带路，再续剩下的声音。" };
  if (attempt.phase === "guide-rest") {
    return config.levelId === "LS06"
      ? { kicker: "今天先走到这里", main: "回声藤先睡一会儿", support: "下次再来找 C 和 G。" }
      : { kicker: "今天先走到这里", main: "两株花先睡一会儿", support: "下次再来找 E 和 F。" };
  }
  if (attempt.phase === "complete") {
    return config.levelId === "LS06"
      ? { kicker: "四次回声都找到了", main: "回声藤连成拱门", support: "今天先回地图歇一会儿。" }
      : { kicker: "四次声音都找到了", main: "E 和 F 各自站稳了", support: "两株花分开舒展，今天先休息。" };
  }
  return { kicker: `${config.progressLabel} ${Math.min(4, attempt.callIndex + 1)}/4`, main: "弹同样的声音", support: "可以按扬声器重听。" };
}

function renderPairedListeningScreen() {
  const attempt = ensurePairedListeningAttempt();
  const config = pairedListeningConfig(attempt?.levelId);
  if (!attempt || !config) return;
  const guidePhase = ["guide-ready", "visible-guide", "guide-next-pending"].includes(attempt.phase);
  const targetMidi = guidePhase
    ? config.candidates[attempt.guideIndex]
    : (pairedListeningTarget(attempt) ?? config.candidates[0]);
  const target = noteForMidi(targetMidi);
  const copy = pairedListeningCopy(attempt, config);
  els.mainTitle.textContent = "呼吸花园";
  els.levelBadge.textContent = config.levelId;
  els.appShell.dataset.levelId = config.levelId;
  els.appShell.dataset.phase = "garden-listening";
  els.appShell.dataset.chapter3 = config.chapterMode;
  els.gardenScene.dataset.airState = "safe-open";
  els.gardenScene.dataset.lesson = config.levelId;
  els.gardenScene.dataset.listeningPhase = attempt.phase;
  els.gardenScene.dataset.reviewableForMastery = "true";
  els.gardenScene.dataset.repairStage = ["visible-guide", "guide-next-pending"].includes(attempt.phase)
    ? (attempt.guideRepairStage || "none")
    : (attempt.callRepairStage || "none");
  els.gardenXingya.dataset.equipment = "safe-open";
  renderGardenCharacterAsset("safe-open");
  els.gardenAirCheck.hidden = true;
  els.gardenPlant.hidden = true;
  els.gardenListening.hidden = false;
  els.listeningCandidates.hidden = true;
  els.ls05FlowerArc.hidden = true;
  els.pairedListeningWorld.hidden = false;
  els.pairedListeningWorld.dataset.level = config.levelId;
  els.pairedListeningWorld.dataset.phase = attempt.phase;
  els.gardenSpeech.hidden = false;
  els.gardenSpeechKicker.textContent = copy.kicker;
  els.gardenSpeechMain.textContent = copy.main;
  els.gardenSpeechSupport.textContent = copy.support;
  const playing = ["visible-guide", "child-echo-playing", "target-playing", "wrong-known", "pair-compare", "modeled-playing"].includes(attempt.phase);
  els.listeningSource.classList.toggle("is-playing", playing);
  els.listeningSource.classList.toggle("is-sound-paused", attempt.phase === "sound-paused");
  const endpoints = [els.pairedListeningLeft, els.pairedListeningRight];
  endpoints.forEach((endpoint) => {
    endpoint.classList.remove("is-responding", "is-complete", "is-guide-active");
    endpoint.removeAttribute("data-note");
  });
  const guideVisible = ["guide-ready", "visible-guide", "guide-next-pending"].includes(attempt.phase);
  if (guideVisible) {
    endpoints.forEach((endpoint, index) => endpoint.dataset.note = config.letters[index]);
    if (attempt.phase === "visible-guide") endpoints[attempt.guideIndex]?.classList.add("is-guide-active");
  }
  if (attempt.phase === "correct-feedback" && attempt.respondingCandidate) {
    const index = config.letters.indexOf(attempt.respondingCandidate);
    if (index >= 0) endpoints[index].classList.add("is-responding");
  }
  if (attempt.phase === "complete" || state.chapter3[`${config.chapterKey}Completed`]) endpoints.forEach((endpoint) => endpoint.classList.add("is-complete"));
  els.pairedListeningLink.classList.toggle("is-complete", attempt.phase === "complete" || state.chapter3[`${config.chapterKey}Completed`]);

  const pairVisible = attempt.phase === "pair-compare";
  const assistedVisible = attempt.phase === "assisted-retry";
  const visualAssistVisible = attempt.phase === "visual-assist";
  els.ls05Compare.hidden = !pairVisible && !assistedVisible && !visualAssistVisible;
  if (pairVisible) {
    const names = pairedListeningVisibleConfusionPair(attempt).map((midi) => noteForMidi(midi)?.name).filter(Boolean);
    els.ls05Compare.innerHTML = names.map((name) => `<span>${name}<small>${friendlyKeyLocator(noteForMidi(config.candidates[config.letters.indexOf(name)]))}</small></span>`).join("");
    els.ls05Compare.setAttribute("aria-label", `比较 ${names.join(" 和 ")}`);
  } else if (assistedVisible) {
    els.ls05Compare.innerHTML = config.letters.map((name) => `<span>${name}</span>`).join("");
    els.ls05Compare.setAttribute("aria-label", `候选琴键 ${config.letters.join("、")}`);
  } else if (visualAssistVisible) {
    els.ls05Compare.innerHTML = `<span class="is-guide">${target?.name || ""}<small>${friendlyKeyLocator(target)}</small></span>`;
    els.ls05Compare.setAttribute("aria-label", `键位帮助：${target?.name || ""}，${friendlyKeyLocator(target)}`);
  } else {
    els.ls05Compare.innerHTML = "";
    els.ls05Compare.removeAttribute("aria-label");
  }
  const guidePresentationAwaitingMap = attempt.phase === "guide-next-pending" &&
    attempt.pendingGuidePresentation?.requiresExplicitGesture !== true;
  const replayDisabled = playing || guidePresentationAwaitingMap ||
    ["guide-target-pending", "guide-rest", "correct-feedback", "complete", "modeled-success"].includes(attempt.phase);
  els.listeningReplay.disabled = replayDisabled;
  els.listeningReplay.setAttribute("aria-disabled", String(replayDisabled));
  els.listeningReplay.hidden = ["guide-rest", "complete"].includes(attempt.phase);
  const visualAssistAllowed = ["assisted", "candidate-outside"].includes(attempt.callRepairStage) || (attempt.phase === "sound-paused" && attempt.soundPauseCount >= 2);
  els.ls05VisualAssist.hidden = !visualAssistAllowed || ["visual-assist", "correct-feedback", "modeled-playing", "modeled-success", "complete"].includes(attempt.phase);
  els.listeningCallProgress.innerHTML = [0, 1, 2, 3].map((index) => {
    const done = index < attempt.neutralProgress;
    const formalCallVisible = attempt.guidePlayed && !["guide-ready", "visible-guide", "guide-next-pending", "guide-rest", "complete"].includes(attempt.phase);
    const active = formalCallVisible && index === attempt.callIndex;
    return `<span class="${done ? "done" : ""}${active ? " active" : ""}" aria-hidden="true"></span>`;
  }).join("");
  els.listeningCallProgress.setAttribute("aria-label", `四个中性故事格已完成 ${attempt.neutralProgress} 个`);
  els.listeningResult.classList.remove("is-complete");
  els.gardenProgress.innerHTML = "";
  els.gardenProgress.hidden = true;
  els.nextAction.textContent = ["guide-ready", "visible-guide", "guide-next-pending"].includes(attempt.phase)
    ? `跟着星芽找 ${config.letters.join(" / ")}`
    : (attempt.phase === "complete" ? `${config.progressLabel}完成` : `${config.progressLabel} ${Math.min(4, attempt.callIndex + 1)}/4`);
  els.inputStatus.textContent = "输入：屏幕琴键";
  els.heardStatus.textContent = "听到：-";
  const showTarget = guideVisible || visualAssistVisible || (assistedVisible && attempt.assistedCueVisible);
  renderKeyboard(showTarget ? target : null, {
    scaffold: showTarget ? "garden-listening-assisted" : "garden-listening",
    disableTarget: !showTarget,
    showTarget,
    concealTargetIdentity: !showTarget
  });
}

function ls08Copy(attempt) {
  if (!attempt) return { kicker: "两声根须", main: "准备听两声", support: "点扬声器开始。" };
  const guideMidi = ls08Config.guideMidis[attempt.guideIndex] ?? 60;
  const guideNote = noteForMidi(guideMidi);
  if (attempt.phase === "guide-ready") return { kicker: "根须先带路", main: "先找 C，再找 D", support: "我会唱 Do、Re。跟着琴键按两次。" };
  if (["guide-first", "guide-second"].includes(attempt.phase)) {
    const short = attempt.guideMode === "short" ? "再走一遍短带路" : "根须先带路";
    const repair = attempt.guideRepairStage === "soft-replay" ? "我再唱一次" : "我唱";
    return { kicker: short, main: `这是 ${guideNote?.name || ""}`, support: `${repair} ${guideNote?.solfege || ""}。找到琴键上的 ${guideNote?.name || ""}，按一下。` };
  }
  if (attempt.phase === "guide-rest") return { kicker: "今天先到这里", main: "一个小根芽已经长好", support: "下次再分别找稳 C 和 D。" };
  if (attempt.phase === "replay-ready") return { kicker: "回到两声根须", main: "按扬声器继续", support: "顺序和已经长出的根结都保留。" };
  if (attempt.phase === "pair-playing") return { kicker: `两声根须 ${attempt.pairIndex + 1}/4`, main: "先听完整两声", support: "声音停下后，再按同样的先后。" };
  if (attempt.phase === "awaiting-first") return { kicker: `两声根须 ${attempt.pairIndex + 1}/4`, main: "先按记住的第一声", support: "按键快慢都可以。" };
  if (attempt.phase === "awaiting-second") return { kicker: "第一声已经记下", main: "松开，再按第二声", support: "只记先后，不看快慢。" };
  if (attempt.phase === "wrong-first") return { kicker: "先后再听一遍", main: "第一声还没对上", support: "先听刚才按的两声，再听根须的两声。" };
  if (attempt.phase === "wrong-second") return { kicker: "第一声先留在这里", main: "第二声再找一找", support: "完整两声会再响一次。" };
  if (attempt.phase === "pair-compare") return { kicker: "两组声音一起比", main: "听一听哪组一样", support: "两组位置和样子都一样。" };
  if (attempt.phase === "assisted" && attempt.pairRepairStage === "candidate-outside") return { kicker: "回到三颗白键里", main: "先在 C、D、E 里找", support: "刚才的声音跑到外面了，根须会等你。" };
  if (attempt.phase === "assisted") return { kicker: "星芽陪你找", main: "在 C、D、E 里按两声", support: "正确键只会短短亮一下。" };
  if (attempt.phase === "visual-assist") return { kicker: "看着完成这个根结", main: "按图上的两个字母", support: "这组只完成故事，不计听辨正确。" };
  if (attempt.phase === "sound-paused") return { kicker: "声音先休息", main: "请先把声音打开", support: attempt.soundPauseContext === "low-echo" ? "恢复后只重播地底故事回声。" : "恢复后重播同一完整两声。" };
  if (attempt.phase === "correct-feedback") return { kicker: "这个根结长好了", main: "两声先后已经接住", support: "下一组会自己响起。" };
  if (attempt.phase === "modeled-playing") return { kicker: "听一次清楚示范", main: "根须正在示范这两声", support: "只保留当前根结，随后回地图休息。" };
  if (attempt.phase === "modeled-success") return { kicker: "这个根结先安顿好", main: "已经长出的进度会保留", support: "下次重做短带路，再续剩下的两声。" };
  if (attempt.phase === "complete-roots") return { kicker: "四个根结都接好了", main: "根须连到地下", support: "接下来只听一次地底回声，不需要按键。" };
  if (attempt.phase === "unscored-low-echo") return { kicker: "听见地底回声", main: "根须在地下回应", support: "这只是故事声音，不是新琴键任务。" };
  return { kicker: "两声根须", main: "准备听两声", support: "按扬声器继续。" };
}

function renderLs08Screen() {
  const attempt = ensureLs08Attempt();
  if (!attempt) return;
  const targetPair = ls08TargetPair(attempt) || [];
  const copy = ls08Copy(attempt);
  els.mainTitle.textContent = "呼吸花园";
  els.levelBadge.textContent = "LS08";
  els.appShell.dataset.levelId = "LS08";
  els.appShell.dataset.phase = "garden-listening";
  els.appShell.dataset.chapter3 = "listening-roots";
  els.gardenScene.dataset.airState = "safe-open";
  els.gardenScene.dataset.lesson = "LS08";
  els.gardenScene.dataset.listeningPhase = attempt.phase;
  els.gardenScene.dataset.reviewableForMastery = "true";
  els.gardenScene.dataset.repairStage = ["guide-first", "guide-second"].includes(attempt.phase) ? attempt.guideRepairStage : attempt.pairRepairStage;
  els.gardenXingya.dataset.equipment = "safe-open";
  renderGardenCharacterAsset("safe-open");
  els.gardenAirCheck.hidden = true;
  els.gardenPlant.hidden = true;
  els.gardenListening.hidden = false;
  els.listeningCandidates.hidden = true;
  els.ls05FlowerArc.hidden = true;
  els.pairedListeningWorld.hidden = false;
  els.pairedListeningWorld.dataset.level = "LS08";
  els.pairedListeningWorld.dataset.phase = attempt.phase;
  els.gardenSpeech.hidden = false;
  els.gardenSpeechKicker.textContent = copy.kicker;
  els.gardenSpeechMain.textContent = copy.main;
  els.gardenSpeechSupport.textContent = copy.support;
  const playing = Boolean(attempt.guideAudioPlaying || attempt.repairAudioPlaying || ["pair-playing", "wrong-first", "wrong-second", "pair-compare", "modeled-playing", "unscored-low-echo"].includes(attempt.phase));
  els.listeningSource.classList.toggle("is-playing", playing);
  els.listeningSource.classList.toggle("is-sound-paused", attempt.phase === "sound-paused");

  const endpoints = [els.pairedListeningLeft, els.pairedListeningRight];
  endpoints.forEach((endpoint) => {
    endpoint.classList.remove("is-responding", "is-complete", "is-guide-active", "has-child-input");
    endpoint.removeAttribute("data-note");
  });
  if (["guide-ready", "guide-first", "guide-second"].includes(attempt.phase)) {
    endpoints[0].dataset.note = "C";
    endpoints[1].dataset.note = "D";
    if (attempt.phase === "guide-first") endpoints[0].classList.add("is-guide-active");
    if (attempt.phase === "guide-second") endpoints[1].classList.add("is-guide-active");
  } else if (attempt.phase === "awaiting-second" && attempt.pairInputs.length === 1) {
    endpoints[0].dataset.note = noteForMidi(attempt.pairInputs[0])?.name || "";
    endpoints[0].classList.add("has-child-input");
  } else if (["wrong-first", "wrong-second"].includes(attempt.phase)) {
    attempt.pairInputs.slice(0, 2).forEach((midi, index) => { endpoints[index].dataset.note = noteForMidi(midi)?.name || ""; });
  } else if (attempt.phase === "visual-assist") {
    targetPair.forEach((midi, index) => { endpoints[index].dataset.note = noteForMidi(midi)?.name || ""; });
  }
  if (["complete-roots", "unscored-low-echo"].includes(attempt.phase) || state.chapter3.ls08Completed) endpoints.forEach((endpoint) => endpoint.classList.add("is-complete"));
  els.pairedListeningLink.classList.toggle("is-complete", ["complete-roots", "unscored-low-echo"].includes(attempt.phase) || state.chapter3.ls08Completed);

  const compareVisible = ["pair-compare", "assisted", "visual-assist"].includes(attempt.phase);
  els.ls05Compare.hidden = !compareVisible;
  if (attempt.phase === "pair-compare") {
    const comparable = ls08PairCanUseVisibleComparison(attempt.pairConfusion) && ls08PairCanUseVisibleComparison(targetPair);
    if (comparable) {
      const candidates = [attempt.pairConfusion.slice(), targetPair.slice()].sort((a, b) => a.join("-").localeCompare(b.join("-")));
      els.ls05Compare.innerHTML = candidates.map((pair) => `<span>${pair.map((midi) => noteForMidi(midi)?.name || "").join(" · ")}</span>`).join("");
      els.ls05Compare.setAttribute("aria-label", "比较两组同等的声音顺序");
    } else {
      els.ls05Compare.innerHTML = ["C", "D", "E"].map((name) => `<span>${name}</span>`).join("");
      els.ls05Compare.setAttribute("aria-label", "候选琴键 C、D、E");
    }
  } else if (attempt.phase === "assisted") {
    els.ls05Compare.innerHTML = ["C", "D", "E"].map((name) => `<span>${name}</span>`).join("");
    els.ls05Compare.setAttribute("aria-label", "候选琴键 C、D、E");
  } else if (attempt.phase === "visual-assist") {
    els.ls05Compare.innerHTML = targetPair.map((midi) => `<span class="is-guide">${noteForMidi(midi)?.name || ""}<small>${friendlyKeyLocator(noteForMidi(midi))}</small></span>`).join("");
    els.ls05Compare.setAttribute("aria-label", `键位帮助：${targetPair.map((midi) => noteForMidi(midi)?.name).join("、")}`);
  } else {
    els.ls05Compare.innerHTML = "";
    els.ls05Compare.removeAttribute("aria-label");
  }
  const replayDisabled = playing || ["guide-rest", "correct-feedback", "modeled-success", "complete-roots", "unscored-low-echo"].includes(attempt.phase);
  els.listeningReplay.disabled = replayDisabled;
  els.listeningReplay.setAttribute("aria-disabled", String(replayDisabled));
  els.listeningReplay.hidden = ["guide-rest", "complete-roots", "unscored-low-echo"].includes(attempt.phase);
  const assistAllowed = !attempt.repairAudioPlaying && (attempt.phase === "assisted" || (attempt.phase === "sound-paused" && attempt.soundPauseCount >= 2));
  els.ls05VisualAssist.hidden = !assistAllowed || ["visual-assist", "modeled-playing", "modeled-success", "complete-roots", "unscored-low-echo"].includes(attempt.phase);
  els.listeningCallProgress.innerHTML = [0, 1, 2, 3].map((index) => `<span class="${index < attempt.neutralProgress ? "done" : ""}${attempt.checkEntered && index === attempt.pairIndex && attempt.pairIndex < 4 ? " active" : ""}" aria-hidden="true"></span>`).join("");
  els.listeningCallProgress.setAttribute("aria-label", `四个中性根结已完成 ${attempt.neutralProgress} 个`);
  els.listeningResult.classList.remove("is-complete");
  els.gardenProgress.innerHTML = "";
  els.gardenProgress.hidden = true;
  els.nextAction.textContent = ["guide-ready", "guide-first", "guide-second"].includes(attempt.phase) ? "跟着星芽找 C / D" : (["complete-roots", "unscored-low-echo"].includes(attempt.phase) ? "根须连接完成" : `两声根须 ${Math.min(4, attempt.pairIndex + 1)}/4`);
  els.inputStatus.textContent = "输入：屏幕琴键";
  els.heardStatus.textContent = "听到：-";
  const guideTarget = ["guide-ready", "guide-first", "guide-second"].includes(attempt.phase) ? noteForMidi(ls08Config.guideMidis[attempt.guideIndex] || 60) : null;
  const assistedTarget = attempt.phase === "assisted" && attempt.assistedCueVisible ? noteForMidi(targetPair[attempt.pairInputs.length] ?? targetPair[0]) : null;
  renderKeyboard(guideTarget || assistedTarget, {
    scaffold: guideTarget || assistedTarget ? "garden-listening-assisted" : "garden-listening",
    disableTarget: !(guideTarget || assistedTarget),
    showTarget: Boolean(guideTarget || assistedTarget),
    concealTargetIdentity: !(guideTarget || assistedTarget)
  });
  if (attempt.phase === "visual-assist") {
    [...new Set(targetPair)].forEach((midi) => {
      const key = els.keyboard.querySelector(`.white-key[data-midi="${midi}"]`);
      if (key) key.classList.add("target");
    });
  }
}

function renderGardenScreen() {
  if (!els.gardenPanel || state.screen !== "garden") return;
  if (currentLs08Action()) {
    renderLs08Screen();
    return;
  }
  if (currentListeningAction("LS04")) {
    renderLs04Screen();
    return;
  }
  if (currentListeningAction("LS05")) {
    renderLs05Screen();
    return;
  }
  if (currentPairedListeningAction()) {
    renderPairedListeningScreen();
    return;
  }
  const lesson = currentGardenLesson();
  const audioAttempt = lesson && ["LS01", "LS02", "LS03"].includes(lesson.id) && !state.chapter3.leaves[lesson.leaf - 1]
    ? ensureGardenAudioAttempt()
    : null;
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
  if (audioAttempt) els.gardenScene.dataset.teachingAudioPhase = audioAttempt.phase;
  else delete els.gardenScene.dataset.teachingAudioPhase;
  els.gardenXingya.dataset.equipment = equipmentState;
  renderGardenCharacterAsset(equipmentState);
  els.gardenAirCheck.hidden = equipmentState === "safe-open";
  els.gardenPlant.hidden = false;
  els.gardenListening.hidden = true;
  els.pairedListeningWorld.hidden = true;
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
  if (action.kind === "chapter4-listening" || action.kind === "chapter4-keyboard") return Boolean(state.chapter4.lessonEvidence[action.targetId]?.completedAt);
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

function hasFormalChapter4EntranceEvidence() {
  const evidence = state.chapter3.lessonEvidence.LS08;
  if (!state.chapter3.completed || !evidence?.completedAt || evidence.completed !== true) return false;
  const endedEcho = Array.isArray(evidence.storyEvents) && evidence.storyEvents.some((event) =>
    event?.eventType === "storyEvent" &&
    event?.phaseRole === "unscored" &&
    Array.isArray(event.midis) &&
    event.midis.join(",") === "60,48" &&
    Boolean(event.endedAt)
  );
  if (!endedEcho || !evidence.sessionId) return false;
  return state.sessionRuntime.history.some((session) =>
    session?.sessionId === evidence.sessionId &&
    session?.bundleId === "C3-07" &&
    session?.status === "ended"
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

  if (action.kind === "chapter4-listening" || action.kind === "chapter4-keyboard") {
    showChapter4Screen();
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
  if (!state.chapter3.lessonEvidence.LS05?.completedAt) {
    const resume = state.chapter3.resume?.nextTargetId === "LS05" ? state.chapter3.resume : null;
    return {
      bundleId: "C3-04",
      actionIds: ["LS05-listening"],
      resumeOfSessionId: resume?.endedSessionId || null,
      resumeAttempt: resume?.ls05Attempt || null
    };
  }
  if (!state.chapter3.lessonEvidence.LS06?.completedAt) {
    const resume = state.chapter3.resume?.nextTargetId === "LS06" ? state.chapter3.resume : null;
    return {
      bundleId: "C3-05",
      actionIds: ["LS06-listening"],
      resumeOfSessionId: resume?.endedSessionId || null,
      pairedResumeAttempt: resume?.pairedAttempt || null
    };
  }
  if (!state.chapter3.lessonEvidence.LS07?.completedAt) {
    const resume = state.chapter3.resume?.nextTargetId === "LS07" ? state.chapter3.resume : null;
    return {
      bundleId: "C3-06",
      actionIds: ["LS07-listening"],
      resumeOfSessionId: resume?.endedSessionId || null,
      pairedResumeAttempt: resume?.pairedAttempt || null
    };
  }
  if (!state.chapter3.lessonEvidence.LS08?.completedAt) {
    const resume = state.chapter3.resume?.nextTargetId === "LS08" ? state.chapter3.resume : null;
    return {
      bundleId: "C3-07",
      actionIds: ["LS08-listening"],
      resumeOfSessionId: resume?.endedSessionId || null,
      ls08ResumeAttempt: resume?.ls08Attempt || null
    };
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
  if (listeningAction?.targetId === "LS04") listeningAction.listeningAttempt = createLs04Attempt(session);
  if (listeningAction?.targetId === "LS05") listeningAction.listeningAttempt = createLs05Attempt(session, plan.resumeAttempt);
  if (pairedListeningConfigs[listeningAction?.targetId]) listeningAction.listeningAttempt = createPairedListeningAttempt(session, plan.pairedResumeAttempt);
  if (listeningAction?.targetId === "LS08") listeningAction.listeningAttempt = createLs08Attempt(session, plan.ls08ResumeAttempt);
  return session;
}

function unlockChapter3AudioFromGesture() {
  unlockAudioFromGesture();
  requestSfxBusRunning().then((bus) => {
    document.documentElement.dataset.chapter3AudioGesture = bus ? "unlocked" : "unavailable";
  });
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

function nextChapter4SessionPlan() {
  if (!hasFormalChapter4EntranceEvidence() || state.chapter4.completedSlice) return null;
  const resume = state.chapter4.resume?.nextTargetId === "LP02" ? state.chapter4.resume : null;
  return resume
    ? { actionIds: [chapter4Config.lp02.actionId], resumeOfSessionId: resume.endedSessionId || null, reconnectRequired: true }
    : { actionIds: [chapter4Config.lp01.actionId, chapter4Config.lp02.actionId], resumeOfSessionId: null, reconnectRequired: false };
}

function createChapter4ActiveSession(plan) {
  const bundle = sessionBundleById.get(chapter4Config.bundleId);
  if (!bundle || !plan) return null;
  const now = new Date();
  const session = {
    sessionId: createSessionId(chapter4Config.bundleId),
    bundleId: chapter4Config.bundleId,
    startedAt: now.toISOString(),
    localDateKey: localDateKeyAt(now),
    reviewSkillKey: null,
    voluntaryReplay: false,
    formalSession: true,
    status: "active",
    actionIndex: 0,
    actions: bundle.actions.filter((action) => plan.actionIds.includes(action.actionId)).map((action) => ({
      ...action,
      role: plan.resumeOfSessionId ? "lesson-resume" : "lesson",
      requiredReview: false,
      reviewSkillKey: null
    })),
    completedActions: [],
    restAfterCurrentLevel: false,
    resumeOfSessionId: plan.resumeOfSessionId || null
  };
  const action = session.actions[0];
  if (action?.targetId === "LP01") action.chapter4Attempt = createLp01Attempt(session);
  if (action?.targetId === "LP02") action.chapter4Attempt = createLp02Attempt(session, { reconnectRequired: plan.reconnectRequired });
  return session;
}

function unlockChapter4AudioFromGesture() {
  unlockAudioFromGesture();
  requestSfxBusRunning().then((bus) => {
    document.documentElement.dataset.chapter4AudioGesture = bus ? "unlocked" : "unavailable";
  });
}

function startChapter4FromMap() {
  if (!hasFormalChapter4EntranceEvidence()) return;
  unlockChapter4AudioFromGesture();
  if (state.activeSession?.status === "active") {
    if (state.activeSession.bundleId === chapter4Config.bundleId) startActiveSessionAction(state.activeSession.actionIndex);
    return;
  }
  const plan = nextChapter4SessionPlan();
  if (!plan) return;
  state.activeSession = createChapter4ActiveSession(plan);
  if (!state.activeSession) return;
  state.chapter4RestView = null;
  if (plan.resumeOfSessionId) state.chapter4.resume = null;
  persistChapter4Progress();
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
  const audioAttempt = ensureGardenAudioAttempt();
  if (audioAttempt) {
    audioAttempt.phase = "awaiting-response";
    setAudioAInputArmed(audioAttempt, true);
    persistGardenPendingAttempt();
    renderGardenScreen();
    if (audioAttempt.inputArmed) scheduleGardenAssistedTimer();
    return;
  }
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
  const audioAttempt = ensureGardenAudioAttempt();
  if (audioAttempt) return startGardenModeledCompletion(audioAttempt, reason);
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

function showChapter4Screen() {
  clearAutoAdvance();
  clearGardenTimers();
  clearLs08Timers();
  clearChapter4Timers();
  hideResultModal();
  state.screen = "chapter4";
  state.lastInputMidi = null;
  state.lastInputResult = null;
  ensureChapter4Attempt();
  if (!state.chapter4DirectMode) history.replaceState(null, "", `?mode=chapter4${sessionUrlSuffix()}`);
  render();
  resumeChapter4Flow();
}

function showGardenScreen({ recovery = false } = {}) {
  clearAutoAdvance();
  clearGardenTimers();
  clearLs08Timers();
  hideResultModal();
  state.screen = "garden";
  state.lastInputMidi = null;
  state.lastInputResult = null;
  if (currentLs08Action()) ensureLs08Attempt();
  else if (currentListeningAction("LS04")) ensureLs04Attempt();
  else if (currentListeningAction("LS05")) ensureLs05Attempt();
  else if (currentPairedListeningAction()) ensurePairedListeningAttempt();
  else restoreGardenPendingAttempt();
  const audioBAttempt = currentAudioBAttempt();
  const audioCAttempt = currentAudioCAttempt();
  state.gardenInputArmed = state.gardenAudioAttempt
    ? state.gardenAudioAttempt.inputArmed === true
    : (audioBAttempt ? audioBAttempt.inputArmed === true : (audioCAttempt ? (audioCAttempt.inputArmed === true || audioCAttempt.guideInputArmed === true) : true));
  history.replaceState(null, "", `?mode=garden${sessionUrlSuffix()}`);
  render();
  if (currentLs08Action()) {
    setGardenEquipmentState("safe-open");
    resumeLs08Flow();
  } else if (currentListeningAction("LS04")) {
    setGardenEquipmentState("safe-open");
    resumeLs04Flow();
  } else if (currentListeningAction("LS05")) {
    setGardenEquipmentState("safe-open");
    resumeLs05Flow();
  } else if (currentPairedListeningAction()) {
    setGardenEquipmentState("safe-open");
    resumeAudioCPairedListeningFlow();
  } else {
    beginGardenAirCheck({ recovery });
    if (recovery && state.gardenAudioAttempt?.phase === "sound-paused") recoverAudioAAttempt();
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
    reward,
    reason
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
  const pendingChapter4 = currentChapter4Action()?.chapter4Attempt;
  const chapter4Playback = state.teachingPlayback;
  const chapter4ExternalInputIsActive = Boolean(
    pendingChapter4?.audioTransaction?.context === "lp02-external-input" &&
    !pendingChapter4.audioTransaction.endedAt &&
    !pendingChapter4.audioTransaction.interruptedAt
  );
  const chapter4AudioIsActive = Boolean(
    pendingChapter4?.audioTransaction &&
    !pendingChapter4.audioTransaction.endedAt &&
    !pendingChapter4.audioTransaction.interruptedAt &&
    pendingChapter4.audioTransaction.playbackId &&
    chapter4Playback?.id === pendingChapter4.audioTransaction.playbackId &&
    ["scheduled", "playing"].includes(chapter4Playback.status)
  );
  if (state.screen === "chapter4" && chapter4ExternalInputIsActive) {
    clearChapter4Timers();
    pendingChapter4.timingInterrupted = true;
    enterChapter4SoundPause(pendingChapter4, "lp02-external-input", "map-external-input");
  }
  if (state.screen === "chapter4" && chapter4AudioIsActive) {
    pendingChapter4.audioTransaction.returnQueued = true;
    pendingChapter4.callTimingInterrupted = true;
    pendingChapter4.timingInterrupted = true;
    persistChapter4Attempt();
    renderChapter4Screen();
    return;
  }
  if (state.screen === "chapter4" && pendingChapter4 && !["lp01-complete", "lp01-early-rest", "lp01-supported-story-rest", "lp02-complete"].includes(pendingChapter4.phase)) {
    pendingChapter4.callTimingInterrupted = true;
    pendingChapter4.timingInterrupted = true;
    persistChapter4Attempt();
  }
  if (state.screen === "chapter4") clearChapter4Timers();
  const audioAAttempt = currentAudioAAttempt();
  if (audioAAttempt && audioAExternalInputIsActive(audioAAttempt)) {
    interruptAudioAExternalInput(audioAAttempt, "map-external-input");
  }
  if (audioAAttempt && audioAPlaybackIsActive(audioAAttempt)) {
    queueAudioAMapReturn(audioAAttempt);
    return;
  }
  const audioBAttempt = currentAudioBAttempt();
  if (audioBAttempt && audioBExternalInputIsActive(audioBAttempt)) {
    interruptAudioBExternalInput(audioBAttempt, "map-external-input");
  }
  if (audioBAttempt && audioBPlaybackIsActive(audioBAttempt)) {
    queueAudioBMapReturn(audioBAttempt);
    return;
  }
  if (state.screen === "garden" && audioBAttempt && audioBLevelId(audioBAttempt) === "LS05" && audioBAttempt.phase !== "complete") {
    audioBAttempt.callTimingInterrupted = true;
    audioBAttempt.callResponseStartedAt = null;
    persistAudioBAttempt(audioBAttempt);
  }
  const pendingLs08 = currentLs08Action()?.listeningAttempt;
  if (state.screen === "garden" && pendingLs08?.guideAudioPlaying && ["guide-first", "guide-second"].includes(pendingLs08.phase)) {
    queueLs08MapReturn(pendingLs08);
    return;
  }
  if (state.screen === "garden" && pendingLs08?.pairAudioPlaying && pendingLs08.phase === "pair-playing") {
    queueLs08MapReturn(pendingLs08);
    return;
  }
  if (state.screen === "garden" && pendingLs08?.modeledAudioPlaying && pendingLs08.phase === "modeled-playing") {
    queueLs08MapReturn(pendingLs08);
    return;
  }
  if (state.screen === "garden" && pendingLs08?.repairAudioPlaying && ["wrong-first", "wrong-second", "pair-compare", "assisted", "modeled-playing"].includes(pendingLs08.phase)) {
    queueLs08MapReturn(pendingLs08);
    return;
  }
  if (state.screen === "garden" && pendingLs08?.phase === "unscored-low-echo" && !pendingLs08.audioTransaction?.interruptedAt && (pendingLs08.lowEchoStarted || (pendingLs08.audioTransaction?.context === "low-echo" && !pendingLs08.audioTransaction.endedAt)) && !pendingLs08.lowEchoCompleted) {
    queueLs08MapReturn(pendingLs08);
    return;
  }
  if (state.screen === "garden" && pendingLs08?.phase === "unscored-low-echo" && pendingLs08.lowEchoCompleted) {
    finishLs08Session({ completed: true, reason: "natural-rest" });
    return;
  }
  if (state.screen === "garden" && pendingLs08?.phase === "modeled-playing") {
    completeLs08Modeled("map-pause-modeled");
    return;
  }
  if (state.screen === "garden" && pendingLs08 && !["complete-roots", "unscored-low-echo"].includes(pendingLs08.phase)) {
    pendingLs08.pairTimingInterrupted = true;
    if (pendingLs08.pairInputs.length === 1) {
      pendingLs08.routeArmed = { "屏幕": false, MIDI: false, "麦克风": false };
      pendingLs08.routeHeldMidi = { "屏幕": null, MIDI: null, "麦克风": null };
      pendingLs08.secondOnsetRequiresFreshRearm = true;
    }
    persistLs08Attempt();
  }
  clearLs08Timers();
  const audioCAttempt = currentAudioCAttempt();
  if (audioCAttempt && audioCExternalInputIsActive(audioCAttempt)) {
    interruptAudioCExternalInput(audioCAttempt, "map-external-input");
  }
  if (audioCAttempt && audioCPlaybackIsActive(audioCAttempt)) {
    queueAudioCMapReturn(audioCAttempt);
    return;
  }
  if (state.screen === "garden" && audioCAttempt && audioCAttempt.phase !== "complete") {
    audioCAttempt.callTimingInterrupted = true;
    audioCAttempt.callResponseStartedAt = null;
    clearAudioCStaleInputHolds(audioCAttempt);
    persistAudioCAttempt(audioCAttempt);
  }
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
  clearChapter4Timers();
  clearAssistedRepairState();
  clearWorkshopIdleHints();
  clearLevelIntro();
  clearListeningPrompt();
  hideResultModal();
  state.screen = "map";
  state.chapter4RestView = null;
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

  return state.sfx;
}

function requestSfxBusRunning() {
  let sfx = null;
  try {
    sfx = getSfxBus();
  } catch (error) {
    return Promise.resolve(null);
  }
  if (!sfx) return Promise.resolve(null);
  if (sfx.ctx.state === "running") return Promise.resolve(sfx);
  if (sfx.ctx.state !== "suspended") return Promise.resolve(null);
  if (!sfx.resumePromise) {
    try {
      sfx.resumePromise = Promise.resolve(sfx.ctx.resume())
        .then(() => (sfx.ctx.state === "running" ? sfx : null))
        .catch(() => null)
        .finally(() => {
          if (state.sfx === sfx) sfx.resumePromise = null;
        });
    } catch (error) {
      return Promise.resolve(null);
    }
  }
  return sfx.resumePromise;
}

function envelopeParam(param, start, duration, peak, attack = 0.012, decay = 0.12, sustain = 0.18) {
  const sustainValue = Math.max(0.0001, peak * sustain);
  param.cancelScheduledValues(start);
  param.setValueAtTime(0.0001, start);
  param.linearRampToValueAtTime(peak, start + attack);
  param.exponentialRampToValueAtTime(sustainValue, start + attack + decay);
  param.exponentialRampToValueAtTime(0.0001, start + duration);
}

function createPianoVoice(sfx, frequency, options = {}, onPartialEnded = null) {
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
  const oscillators = [];
  partials.forEach((partial) => {
    const osc = ctx.createOscillator();
    const partialGain = ctx.createGain();
    osc.type = partial.type;
    osc.frequency.setValueAtTime(frequency * partial.ratio, start);
    osc.detune.value = (options.detune || 0) + partial.detune;
    partialGain.gain.value = partial.gain;
    osc.connect(partialGain);
    partialGain.connect(toneFilter);
    if (onPartialEnded) osc.onended = onPartialEnded;
    osc.start(start);
    osc.stop(start + duration + 0.04);
    oscillators.push(osc);
  });
  return { oscillators, startTime: start, endTime: start + duration + 0.04 };
}

function interruptTeachingPianoSequence(reason = "interrupted") {
  state.teachingPlayback?.interrupt?.(reason);
}

function playTeachingPianoSequence({ notes, reason = "teaching", onStarted, onEnded, onInterrupted, watchdogMs } = {}) {
  const sequence = Array.isArray(notes) ? notes.filter((note) => Number.isFinite(note?.frequency)) : [];
  const scheduledAt = new Date().toISOString();
  const playback = {
    id: `teaching-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    reason,
    scheduledAt,
    startedAt: null,
    endedAt: null,
    interruptedAt: null,
    startAudioTime: null,
    endAudioTime: null,
    interruptedAudioTime: null,
    contextState: null,
    status: "scheduled",
    interrupt: null
  };
  let settled = false;
  let stateChangeHandler = null;
  let startTimer = null;
  let watchdogTimer = null;
  let oscillators = [];
  const clearPlaybackListeners = (ctx = null) => {
    if (startTimer) clearTimeout(startTimer);
    if (watchdogTimer) clearTimeout(watchdogTimer);
    startTimer = null;
    watchdogTimer = null;
    if (ctx && stateChangeHandler) ctx.removeEventListener?.("statechange", stateChangeHandler);
    stateChangeHandler = null;
  };
  const interrupt = (interruptReason = "interrupted", ctx = null) => {
    if (settled) return;
    settled = true;
    playback.status = "interrupted";
    playback.interruptedAt = new Date().toISOString();
    playback.interruptedAudioTime = Number.isFinite(ctx?.currentTime) ? ctx.currentTime : null;
    playback.contextState = ctx?.state || playback.contextState || "unavailable";
    clearPlaybackListeners(ctx);
    oscillators.forEach((osc) => {
      osc.onended = null;
      try { osc.stop(); } catch (error) { /* The oscillator may already have ended. */ }
    });
    oscillators = [];
    if (state.teachingPlayback === playback) state.teachingPlayback = null;
    onInterrupted?.(playback, interruptReason);
  };
  playback.interrupt = (interruptReason) => interrupt(interruptReason, playback.ctx || null);
  if (sequence.length === 0) {
    interrupt("empty-sequence");
    return playback;
  }
  if (state.teachingPlayback && state.teachingPlayback !== playback) state.teachingPlayback.interrupt?.("superseded");
  state.teachingPlayback = playback;

  const begin = (sfx) => {
    const { ctx } = sfx || {};
    if (settled || state.teachingPlayback !== playback) return;
    if (!ctx || ctx.state !== "running" || !state.audioSettings.enabled || state.audioSettings.volume <= 0) {
      interrupt("context-not-running", ctx || null);
      return;
    }
    playback.ctx = ctx;
    playback.contextState = ctx.state;
    let remainingPartials = 0;
    const finishWhenAllPartialsEnd = () => {
      if (settled) return;
      remainingPartials -= 1;
      if (remainingPartials > 0) return;
      if (state.teachingPlayback !== playback) {
        interrupt("superseded", ctx);
        return;
      }
      if (ctx.state !== "running") {
        interrupt(`context-${ctx.state || "unavailable"}`, ctx);
        return;
      }
      if (!playback.startedAt) {
        interrupt("ended-before-start", ctx);
        return;
      }
      settled = true;
      playback.status = "ended";
      playback.endedAt = new Date().toISOString();
      playback.endAudioTime = ctx.currentTime;
      playback.contextState = ctx.state;
      clearPlaybackListeners(ctx);
      oscillators = [];
      if (state.teachingPlayback === playback) state.teachingPlayback = null;
      onEnded?.(playback);
    };
    stateChangeHandler = () => {
      if (!settled && ctx.state !== "running") interrupt(`context-${ctx.state || "unavailable"}`, ctx);
    };
    ctx.addEventListener?.("statechange", stateChangeHandler);
    try {
      sequence.forEach((note) => {
        remainingPartials += 4;
        const voice = createPianoVoice(sfx, note.frequency, {
          gain: note.gain,
          duration: note.durationMs / 1000,
          delay: note.delayMs / 1000,
          bus: note.bus,
          detune: note.detune
        }, finishWhenAllPartialsEnd);
        oscillators.push(...voice.oscillators);
      });
    } catch (error) {
      interrupt("oscillator-schedule-failed", ctx);
      return;
    }
    const firstDelayMs = Math.max(0, Math.min(...sequence.map((note) => Number(note.delayMs) || 0)));
    const markStarted = () => {
      if (settled) return;
      if (ctx.state !== "running") {
        interrupt(`context-${ctx.state || "unavailable"}`, ctx);
        return;
      }
      playback.status = "playing";
      playback.startedAt = new Date().toISOString();
      playback.startAudioTime = ctx.currentTime;
      playback.contextState = ctx.state;
      onStarted?.(playback);
    };
    if (firstDelayMs <= 1) markStarted();
    else startTimer = setTimeout(markStarted, firstDelayMs);
    const expectedDurationMs = Math.max(...sequence.map((note) => (Number(note.delayMs) || 0) + (Number(note.durationMs) || 0) + 40));
    watchdogTimer = setTimeout(() => {
      if (!settled) interrupt("watchdog-timeout", ctx);
    }, Math.max(expectedDurationMs + 1000, Number(watchdogMs) || 0));
  };

  let existingSfx = null;
  try {
    existingSfx = getSfxBus();
  } catch (error) {
    interrupt("context-unavailable");
    return playback;
  }
  if (existingSfx?.ctx?.state === "running") begin(existingSfx);
  else {
    requestSfxBusRunning().then((sfx) => {
      if (!sfx) interrupt("resume-rejected");
      else begin(sfx);
    });
  }
  return playback;
}

function isAudioAM03Active() {
  return state.screen === "play" && activeLevel()?.id === "M03";
}

function audioAGardenLesson() {
  const lesson = currentGardenLesson();
  return ["LS01", "LS02", "LS03"].includes(lesson?.id) ? lesson : null;
}

function isAudioAGardenActive() {
  return state.screen === "garden" && Boolean(audioAGardenLesson());
}

function audioATeachingSurfaceIsActive() {
  return isAudioAM03Active() || isAudioAGardenActive();
}

function createAudioAAttempt(kind, targetMidi, lessonId = null) {
  return {
    version: 1,
    kind,
    lessonId,
    targetMidi,
    phase: "model-ready",
    inputArmed: false,
    pendingInput: null,
    pendingModeledReason: null,
    audioTransaction: null,
    soundPauseContext: null,
    observations: [],
    audioTrace: [],
    modelCount: 0,
    childEchoCount: 0,
    midiHeldMidis: []
  };
}

function cloneAudioAAttempt(attempt) {
  if (!attempt) return null;
  return JSON.parse(JSON.stringify(attempt));
}

function ensureM03AudioAttempt() {
  if (!isAudioAM03Active()) return null;
  const targetMidi = activeTargetMidi();
  if (!state.practiceAttempt?.audioAttempt || state.practiceAttempt.audioAttempt.kind !== "m03") {
    state.practiceAttempt.audioAttempt = createAudioAAttempt("m03", targetMidi);
  }
  return state.practiceAttempt.audioAttempt;
}

function ensureGardenAudioAttempt() {
  const lesson = audioAGardenLesson();
  if (!lesson || state.chapter3.leaves[lesson.leaf - 1]) return null;
  if (!state.gardenAudioAttempt || state.gardenAudioAttempt.kind !== "garden" || state.gardenAudioAttempt.lessonId !== lesson.id) {
    state.gardenAudioAttempt = createAudioAAttempt("garden", lesson.midi, lesson.id);
  }
  return state.gardenAudioAttempt;
}

function currentAudioAAttempt() {
  if (isAudioAM03Active()) return ensureM03AudioAttempt();
  if (isAudioAGardenActive()) return ensureGardenAudioAttempt();
  return null;
}

function audioAAttemptIsCurrent(attempt) {
  if (!attempt) return false;
  if (attempt.kind === "m03") return isAudioAM03Active() && state.practiceAttempt?.audioAttempt === attempt;
  return isAudioAGardenActive() && state.gardenAudioAttempt === attempt;
}

function renderM03AudioState() {
  if (!isAudioAM03Active()) return;
  const attempt = ensureM03AudioAttempt();
  const phase = attempt?.phase || "model-ready";
  if (els.appShell) els.appShell.dataset.teachingAudioPhase = phase;
  if (els.moonYard) els.moonYard.dataset.teachingAudioPhase = phase;
  if (!els.m03InstructionStatus) return;
  if (phase === "model-scheduled") els.m03InstructionStatus.textContent = "小车轮准备唱一声。";
  else if (phase === "model-playing") els.m03InstructionStatus.textContent = "小车轮正在唱。";
  else if (phase === "child-echo-scheduled" || phase === "child-echo-playing") els.m03InstructionStatus.textContent = "这一声还在唱。";
  else if (phase === "wrong-repair-scheduled" || phase === "wrong-repair-playing") els.m03InstructionStatus.textContent = "先听刚才的琴键，再听小车轮。";
  else if (phase === "modeled-scheduled" || phase === "modeled-playing") els.m03InstructionStatus.textContent = "小车轮正在清楚示范。";
  else if (phase === "sound-paused") els.m03InstructionStatus.textContent = "声音先休息，按“再听车轮”继续。";
  else if (phase === "complete") els.m03InstructionStatus.textContent = "两个车轮都找到了声音，小车准备好了。";
  else els.m03InstructionStatus.textContent = "小车轮唱完，你弹同样的琴键。";
}

function renderAudioAAttempt(attempt) {
  if (!audioAAttemptIsCurrent(attempt)) return;
  if (attempt.kind === "m03") {
    render();
    renderM03AudioState();
    return;
  }
  renderGardenScreen();
}

function persistM03AudioAttempt() {
  if (!isAudioAM03Active() || !state.practiceAttempt) return;
  const action = currentSessionAction();
  const formalOwner = currentM03FormalSnapshotOwner(action);
  const snapshot = {
    version: 1,
    stepIndex: state.stepIndex,
    lastInputMidi: state.lastInputMidi,
    lastInputResult: state.lastInputResult,
    stepHadWrong: state.stepHadWrong,
    practiceAttempt: JSON.parse(JSON.stringify(state.practiceAttempt))
  };
  if (formalOwner) {
    snapshot.formalOwner = formalOwner;
    action.m03AudioAttempt = snapshot;
    persistActiveSession();
    return;
  }
  try {
    sessionStorage.setItem("starDinoM03AudioAttempt", JSON.stringify(snapshot));
  } catch (error) {
    // Direct M03 previews remain usable when session storage is unavailable.
  }
}

function currentM03FormalSnapshotOwner(action = currentSessionAction()) {
  const session = state.activeSession;
  if (!session || session.status !== "active" || action?.kind !== "level" || action.targetId !== "M03") return null;
  return {
    sessionId: session.sessionId,
    bundleId: session.bundleId,
    sessionActionId: action.actionId
  };
}

function m03SnapshotMatchesFormalOwner(snapshot, owner) {
  const attempt = snapshot?.practiceAttempt;
  const savedOwner = snapshot?.formalOwner || {
    sessionId: attempt?.sessionId,
    bundleId: attempt?.bundleId,
    sessionActionId: attempt?.sessionActionId
  };
  return Boolean(
    owner &&
    attempt?.formalSession === true &&
    attempt.kind === "level" &&
    attempt.id === "M03" &&
    savedOwner.sessionId === owner.sessionId &&
    savedOwner.bundleId === owner.bundleId &&
    savedOwner.sessionActionId === owner.sessionActionId
  );
}

function clearM03FormalSnapshot(action = currentSessionAction()) {
  if (action?.kind !== "level" || action.targetId !== "M03" || !action.m03AudioAttempt) return false;
  delete action.m03AudioAttempt;
  persistActiveSession();
  return true;
}

function clearM03AudioAttempt(action = currentSessionAction()) {
  clearM03FormalSnapshot(action);
  try {
    sessionStorage.removeItem("starDinoM03AudioAttempt");
  } catch (error) {
    // There is nothing else to clear when session storage is unavailable.
  }
}

function discardCompletedM03AudioAttempt(attempt) {
  clearM03AudioAttempt();
  if (state.practiceAttempt?.audioAttempt === attempt) state.practiceAttempt.audioAttempt = null;
}

function restoreM03AudioAttempt() {
  if (!isAudioAM03Active()) return false;
  const action = currentSessionAction();
  const formalOwner = currentM03FormalSnapshotOwner(action);
  let snapshot = formalOwner ? action.m03AudioAttempt : null;
  if (formalOwner && !m03SnapshotMatchesFormalOwner(snapshot, formalOwner)) {
    if (snapshot) clearM03FormalSnapshot(action);
    return false;
  }
  if (!formalOwner) {
    try {
      snapshot = JSON.parse(sessionStorage.getItem("starDinoM03AudioAttempt") || "null");
    } catch (error) {
      snapshot = null;
    }
    if (snapshot?.practiceAttempt?.formalSession) return false;
  }
  if (!snapshot?.practiceAttempt || !Number.isInteger(snapshot.stepIndex)) return false;
  if (snapshot.stepIndex >= activeLevel().parts.length || snapshot.practiceAttempt?.audioAttempt?.phase === "complete") {
    if (formalOwner) clearM03FormalSnapshot(action);
    else clearM03AudioAttempt(action);
    return false;
  }
  state.stepIndex = Math.max(0, Math.min(activeLevel().parts.length, snapshot.stepIndex));
  state.lastInputMidi = Number.isFinite(snapshot.lastInputMidi) ? snapshot.lastInputMidi : null;
  state.lastInputResult = ["correct", "wrong"].includes(snapshot.lastInputResult) ? snapshot.lastInputResult : null;
  state.stepHadWrong = snapshot.stepHadWrong === true;
  state.practiceAttempt = stampPracticeAttemptSession({
    ...createPracticeAttempt("level", "M03", state.levelRunMode),
    ...JSON.parse(JSON.stringify(snapshot.practiceAttempt))
  });
  if (state.practiceAttempt.audioAttempt?.kind === "m03") {
    normalizeAudioAAttemptForRecovery(state.practiceAttempt.audioAttempt);
    if (state.practiceAttempt.audioAttempt.phase === "awaiting-response") {
      setAudioAInputArmed(state.practiceAttempt.audioAttempt, true);
    }
    persistM03AudioAttempt();
  } else {
    state.practiceAttempt.audioAttempt = createAudioAAttempt("m03", activeTargetMidi());
  }
  return true;
}

function persistAudioAAttempt(attempt) {
  if (!audioAAttemptIsCurrent(attempt)) return;
  if (attempt.kind === "m03") persistM03AudioAttempt();
  else persistGardenPendingAttempt();
}

function audioAHeldMidiNotes(attempt) {
  if (!attempt) return [];
  const held = [...new Set((Array.isArray(attempt.midiHeldMidis) ? attempt.midiHeldMidis : [])
    .map((midi) => Number(midi))
    .filter(Number.isFinite))];
  attempt.midiHeldMidis = held;
  return held;
}

function recordAudioAMidiNoteOn(attempt, midi) {
  const note = Number(midi);
  const held = audioAHeldMidiNotes(attempt);
  if (!Number.isFinite(note)) return { blocked: false, wasHeld: false, hadHeld: held.length > 0 };
  const wasHeld = held.includes(note);
  const hadHeld = held.length > 0;
  if (!wasHeld) held.push(note);
  attempt.midiHeldMidis = held;
  return { blocked: wasHeld || hadHeld, wasHeld, hadHeld };
}

function releaseAudioAMidiNote(attempt, midi) {
  const note = Number(midi);
  if (!Number.isFinite(note)) return false;
  const held = audioAHeldMidiNotes(attempt);
  if (!held.includes(note)) return false;
  attempt.midiHeldMidis = held.filter((heldMidi) => heldMidi !== note);
  return true;
}

function clearAudioAStaleMidiHolds(attempt) {
  if (!attempt) return false;
  const hadHeldMidi = audioAHeldMidiNotes(attempt).length > 0;
  attempt.midiHeldMidis = [];
  return hadHeldMidi;
}

function audioAInputCanBeArmed(attempt) {
  const transaction = attempt?.audioTransaction;
  return Boolean(
    audioAAttemptIsCurrent(attempt) &&
    attempt.phase === "awaiting-response" &&
    !audioAExternalInputIsActive(attempt) &&
    audioAHeldMidiNotes(attempt).length === 0 &&
    (!transaction || transaction.endedAt)
  );
}

function setAudioAInputArmed(attempt, armed) {
  if (!attempt) return false;
  const next = Boolean(armed) && audioAInputCanBeArmed(attempt);
  attempt.inputArmed = next;
  if (attempt.kind === "garden") {
    state.gardenInputArmed = next;
    if (els.gardenScene) els.gardenScene.dataset.inputArmed = next ? "true" : "false";
  }
  return next;
}

function armAudioAResponse(attempt, { scheduleIdleHints = true } = {}) {
  if (!audioAAttemptIsCurrent(attempt)) return false;
  const wasArmed = attempt.inputArmed === true;
  const armed = setAudioAInputArmed(attempt, true);
  if (!armed || wasArmed) return false;
  if (attempt.kind === "m03") {
    ensureM03ResponseClock();
    if (scheduleIdleHints) scheduleWorkshopIdleHints(LEVEL_INTRO_RESPONSE_DELAY_MS);
  } else if (state.gardenRepairStage === "assisted") {
    scheduleGardenAssistedTimer();
  } else {
    scheduleGardenLongWait();
  }
  persistAudioAAttempt(attempt);
  renderAudioAAttempt(attempt);
  return true;
}

function releaseAudioAMidiInput(attempt, midi) {
  if (!audioAAttemptIsCurrent(attempt) || !releaseAudioAMidiNote(attempt, midi)) return false;
  if (!armAudioAResponse(attempt)) {
    persistAudioAAttempt(attempt);
    renderAudioAAttempt(attempt);
  }
  return true;
}

function normalizeAudioAAttemptForRecovery(attempt) {
  clearAudioAStaleMidiHolds(attempt);
  const transaction = attempt?.audioTransaction;
  if (!transaction || transaction.endedAt || transaction.interruptedAt) return attempt;
  transaction.interruptedAt = new Date().toISOString();
  transaction.contextState = "recovered-without-active-playback";
  attempt.soundPauseContext = transaction.context || null;
  attempt.phase = "sound-paused";
  setAudioAInputArmed(attempt, false);
  return attempt;
}

function recordAudioAObservation(attempt, midi, source, phase = attempt?.phase) {
  if (!attempt) return;
  attempt.observations.push({ midi, source, phase, occurredAt: new Date().toISOString() });
  attempt.observations = attempt.observations.slice(-24);
  persistAudioAAttempt(attempt);
}

function traceAudioAAttempt(attempt, kind, transaction, extra = {}) {
  if (!attempt) return;
  attempt.audioTrace.push({
    kind,
    context: transaction?.context || null,
    midis: Array.isArray(transaction?.notes)
      ? transaction.notes.map((note) => note.midi).filter(Number.isFinite)
      : (Number.isFinite(transaction?.payload?.midi) ? [transaction.payload.midi] : []),
    playbackId: transaction?.playbackId || null,
    scheduledAt: transaction?.scheduledAt || null,
    startedAt: transaction?.startedAt || null,
    endedAt: transaction?.endedAt || null,
    interruptedAt: transaction?.interruptedAt || null,
    startAudioTime: transaction?.startAudioTime ?? null,
    endAudioTime: transaction?.endAudioTime ?? null,
    ...extra
  });
  attempt.audioTrace = attempt.audioTrace.slice(-48);
}

function writeAudioATransaction(transaction, playback, field) {
  transaction.playbackId = playback.id;
  transaction.scheduledAt = playback.scheduledAt;
  transaction.startedAt = playback.startedAt;
  transaction.endedAt = playback.endedAt;
  transaction.interruptedAt = playback.interruptedAt;
  transaction.startAudioTime = playback.startAudioTime;
  transaction.endAudioTime = playback.endAudioTime;
  transaction.interruptedAudioTime = playback.interruptedAudioTime;
  transaction.contextState = playback.contextState;
  transaction.status = playback.status;
  if (field) transaction.lastLifecycleField = field;
}

function consumeAudioAQueuedReturn(attempt, transaction) {
  if (!transaction?.returnQueued || transaction.returnQueuedConsumedAt) return false;
  transaction.returnQueued = false;
  transaction.returnQueuedConsumedAt = new Date().toISOString();
  persistAudioAAttempt(attempt);
  setTimeout(() => showMapScreen(), 0);
  return true;
}

function handoffAudioAQueuedReturn(attempt, transaction) {
  const successor = attempt?.audioTransaction;
  if (!transaction?.returnQueued || !successor || successor === transaction) return false;
  transaction.returnQueued = false;
  transaction.returnQueuedHandedOffAt = new Date().toISOString();
  successor.returnQueued = true;
  successor.returnQueuedFromPlaybackId = transaction.playbackId || null;
  persistAudioAAttempt(attempt);
  if (successor.interruptedAt) consumeAudioAQueuedReturn(attempt, successor);
  return true;
}

function startAudioATeachingSequence(attempt, {
  context,
  notes,
  payload = null,
  scheduledPhase,
  playingPhase,
  onStarted,
  onEnded,
  onInterrupted
} = {}) {
  if (!audioAAttemptIsCurrent(attempt)) return null;
  const transaction = {
    context,
    payload: payload ? JSON.parse(JSON.stringify(payload)) : null,
    notes: notes.map((note) => ({
      midi: Number.isFinite(note.midi) ? note.midi : null,
      delayMs: Number(note.delayMs) || 0,
      durationMs: Number(note.durationMs) || 0
    })),
    playbackId: null,
    scheduledAt: new Date().toISOString(),
    startedAt: null,
    endedAt: null,
    interruptedAt: null,
    startAudioTime: null,
    endAudioTime: null,
    interruptedAudioTime: null,
    contextState: "scheduled",
    status: "scheduled",
    returnQueued: false,
    returnQueuedConsumedAt: null,
    outcomeRecorded: false
  };
  attempt.audioTransaction = transaction;
  attempt.soundPauseContext = null;
  attempt.phase = scheduledPhase || `${context}-scheduled`;
  setAudioAInputArmed(attempt, false);
  persistAudioAAttempt(attempt);
  renderAudioAAttempt(attempt);

  const playback = playTeachingPianoSequence({
    notes,
    reason: `audio-a-${context}`,
    onStarted: (actualPlayback) => {
      if (!audioAAttemptIsCurrent(attempt) || attempt.audioTransaction !== transaction) return;
      writeAudioATransaction(transaction, actualPlayback, "started");
      attempt.phase = playingPhase || `${context}-playing`;
      onStarted?.(actualPlayback, transaction);
      traceAudioAAttempt(attempt, "started", transaction);
      persistAudioAAttempt(attempt);
      renderAudioAAttempt(attempt);
    },
    onEnded: (actualPlayback) => {
      if (!audioAAttemptIsCurrent(attempt) || attempt.audioTransaction !== transaction) return;
      writeAudioATransaction(transaction, actualPlayback, "ended");
      traceAudioAAttempt(attempt, "ended", transaction);
      persistAudioAAttempt(attempt);
      onEnded?.(actualPlayback, transaction, { returnQueued: transaction.returnQueued === true });
      if (!audioAAttemptIsCurrent(attempt) || attempt.audioTransaction !== transaction) return;
      persistAudioAAttempt(attempt);
      renderAudioAAttempt(attempt);
      consumeAudioAQueuedReturn(attempt, transaction);
    },
    onInterrupted: (actualPlayback, reason) => {
      if (!audioAAttemptIsCurrent(attempt) || attempt.audioTransaction !== transaction) return;
      writeAudioATransaction(transaction, actualPlayback, "interrupted");
      attempt.soundPauseContext = context;
      attempt.phase = "sound-paused";
      setAudioAInputArmed(attempt, false);
      traceAudioAAttempt(attempt, "interrupted", transaction, { reason });
      persistAudioAAttempt(attempt);
      onInterrupted?.(actualPlayback, transaction, reason);
      if (!audioAAttemptIsCurrent(attempt) || attempt.audioTransaction !== transaction) return;
      persistAudioAAttempt(attempt);
      renderAudioAAttempt(attempt);
      consumeAudioAQueuedReturn(attempt, transaction);
    }
  });
  if (audioAAttemptIsCurrent(attempt) && attempt.audioTransaction === transaction) {
    transaction.playbackId ||= playback.id;
    transaction.scheduledAt = playback.scheduledAt;
    transaction.status = playback.status;
    transaction.contextState = playback.contextState || transaction.contextState;
    persistAudioAAttempt(attempt);
  }
  return playback;
}

function audioAPlaybackIsActive(attempt) {
  const transaction = attempt?.audioTransaction;
  const playback = state.teachingPlayback;
  return Boolean(
    transaction &&
    !transaction.endedAt &&
    !transaction.interruptedAt &&
    transaction.playbackId &&
    playback?.id === transaction.playbackId &&
    ["scheduled", "playing"].includes(playback.status)
  );
}

function audioAExternalInputIsActive(attempt) {
  const transaction = attempt?.audioTransaction;
  return Boolean(
    transaction?.context === "external-input" &&
    !transaction.endedAt &&
    !transaction.interruptedAt
  );
}

function interruptAudioAExternalInput(attempt, reason = "external-interrupted") {
  if (!audioAAttemptIsCurrent(attempt) || !audioAExternalInputIsActive(attempt)) return false;
  const transaction = attempt.audioTransaction;
  transaction.interruptedAt = new Date().toISOString();
  transaction.contextState = "external-input-interrupted";
  transaction.status = "interrupted";
  transaction.interruptReason = reason;
  attempt.soundPauseContext = "external-input";
  attempt.phase = "sound-paused";
  setAudioAInputArmed(attempt, false);
  traceAudioAAttempt(attempt, "interrupted", transaction, { reason, external: true });
  persistAudioAAttempt(attempt);
  renderAudioAAttempt(attempt);
  consumeAudioAQueuedReturn(attempt, transaction);
  return true;
}

function interruptActiveAudioAExternalInput(reason) {
  const attempt = currentAudioAAttempt();
  return interruptAudioAExternalInput(attempt, reason);
}

function queueAudioAMapReturn(attempt) {
  if (!audioAPlaybackIsActive(attempt)) return false;
  attempt.audioTransaction.returnQueued = true;
  persistAudioAAttempt(attempt);
  renderAudioAAttempt(attempt);
  return true;
}

function recoverAudioAAttempt() {
  const attempt = currentAudioAAttempt();
  if (!attempt || attempt.phase !== "sound-paused") return false;
  const transaction = attempt.audioTransaction;
  const context = attempt.soundPauseContext || transaction?.context;
  const payload = transaction?.payload || attempt.pendingInput;
  clearAudioAStaleMidiHolds(attempt);
  attempt.audioTransaction = null;
  attempt.soundPauseContext = null;
  if (context === "external-input") {
    attempt.pendingInput = null;
    attempt.phase = "awaiting-response";
    armAudioAResponse(attempt);
    persistAudioAAttempt(attempt);
    renderAudioAAttempt(attempt);
    return true;
  }
  if (attempt.kind === "m03") {
    if (context === "child-echo" && payload?.midi !== undefined) return startM03ChildEcho(attempt, payload, { recovery: true });
    if (context === "wrong-repair" && payload?.midi !== undefined) return startM03WrongRepair(attempt, payload, { recovery: true });
    if (context === "modeled") return startM03ModeledCompletion(attempt, attempt.pendingModeledReason || "sound-recovery");
    return startM03Model(attempt, "sound-recovery");
  }
  if (context === "child-echo" && payload?.midi !== undefined) return startGardenChildEcho(attempt, payload, { recovery: true });
  if (context === "wrong-repair" && payload?.midi !== undefined) return startGardenWrongRepair(attempt, payload, { recovery: true });
  if (context === "modeled") return startGardenModeledCompletion(attempt, attempt.pendingModeledReason || "sound-recovery");
  return startGardenAudioAModel(attempt, "sound-recovery");
}

function playPianoNote(frequency, options = {}) {
  let sfx = null;
  try {
    sfx = getSfxBus();
  } catch (error) {
    return false;
  }
  if (!sfx || sfx.ctx.state !== "running") return false;
  createPianoVoice(sfx, frequency, options);
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
  if (isAudioAM03Active()) {
    const attempt = ensureM03AudioAttempt();
    if (!attempt) return;
    if (attempt.phase === "sound-paused") {
      recoverAudioAAttempt();
      return;
    }
    if (["model-ready", "awaiting-response"].includes(attempt.phase)) startM03Model(attempt, "replay");
    return;
  }
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
  const restoredM03AudioAttempt = activeLevel()?.id === "M03" && restoreM03AudioAttempt();
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
  if (isAudioAM03Active()) {
    const audioAttempt = ensureM03AudioAttempt();
    renderM03AudioState();
    showLevelIntro();
    if (restoredM03AudioAttempt && audioAttempt.phase === "awaiting-response" && audioAttempt.inputArmed) {
      ensureM03ResponseClock();
      scheduleWorkshopIdleHints(LEVEL_INTRO_RESPONSE_DELAY_MS);
    } else if (!restoredM03AudioAttempt || audioAttempt.phase === "model-ready") {
      scheduleListeningPrompt(720);
    }
    return;
  }
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
  if (isAudioAM03Active()) {
    interruptTeachingPianoSequence("level-change");
    clearM03AudioAttempt();
  }
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
  if (isAudioAM03Active()) {
    interruptTeachingPianoSequence("level-change");
    clearM03AudioAttempt();
  }
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
const MIC_ESTIMATOR_MIN_FREQUENCY = 110;
const MIC_ESTIMATOR_MAX_FREQUENCY = 540;
const MIC_ESTIMATOR_FFT_SIZE = 8192;
const MIC_ESTIMATOR_MAX_SAMPLES = 4096;
const MIC_ESTIMATOR_MIN_CYCLES = 5;
const MIC_ESTIMATOR_MIN_WINDOW_MS = 80;
const MIC_YIN_THRESHOLD = 0.18;
const MIC_MIN_HARMONIC_COVERAGE = 0.58;

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

function microphonePitchFromFrequency(frequencyOrEstimate, confidence) {
  const estimate = typeof frequencyOrEstimate === "object" && frequencyOrEstimate
    ? frequencyOrEstimate
    : { frequency: frequencyOrEstimate, confidence };
  if ((Number(estimate.confidence) || 0) < MIC_ACCEPT_CONFIDENCE) return null;
  const frequency = Number(estimate.frequency);
  const pitch = frequencyToPitch(frequency);
  if (!pitch || Math.abs(pitch.cents) > MIC_ACCEPT_CENTS) return null;
  if (state.screen === "chapter4" && currentChapter4Action("LP02")) {
    if (pitch.midi === 48 && estimate.octaveAmbiguous) return null;
    const chapter4Note = chapter4NoteForMidi(pitch.midi);
    return chapter4Note ? {
      ...pitch,
      note: chapter4Note,
      confidence: estimate.confidence,
      octaveAmbiguous: Boolean(estimate.octaveAmbiguous),
      harmonicCoverage: estimate.harmonicCoverage ?? null
    } : null;
  }
  const note = noteForMidi(pitch.midi);
  return note && !isReservedNote(note) ? {
    ...pitch,
    note,
    confidence: estimate.confidence,
    octaveAmbiguous: Boolean(estimate.octaveAmbiguous),
    harmonicCoverage: estimate.harmonicCoverage ?? null
  } : null;
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
    analyser.fftSize = MIC_ESTIMATOR_FFT_SIZE;
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
  interruptActiveAudioAExternalInput("microphone-stopped");
  interruptActiveAudioBExternalInput("microphone-stopped");
  interruptActiveAudioCExternalInput("microphone-stopped");
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
    if (state.screen === "garden" && currentLs08Action() && gateResult.state === "quiet") {
      releaseGardenInput(null, "麦克风");
    } else if (state.screen === "garden" && (currentListeningAction("LS04") || currentListeningAction("LS05")) && gateResult.state === "quiet") {
      releaseGardenInput(null, "麦克风");
    } else if (state.screen === "chapter4" && currentChapter4Action("LP02") && gateResult.state === "quiet") {
      releaseGardenInput(null, "麦克风");
    } else if (isAudioAM03Active() && gateResult.state === "quiet") {
      releaseGardenInput(null, "麦克风");
    } else if (isAudioAGardenActive() && gateResult.state === "quiet") {
      releaseGardenInput(null, "麦克风");
    } else if (state.screen === "garden" && gateResult.state !== "releasing") {
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
    ? microphonePitchFromFrequency(pitch)
    : null;
  const gateResult = updateMicrophoneGate(audio, { now, rmsValue, detectedPitch });

  if (!detectedPitch) {
    setMicrophoneUi(audio, "输入：麦克风试听", "听到：再弹清楚一点");
  } else if (gateResult.state === "accepted") {
    setMicrophoneUi(audio, "输入：麦克风", `听到：${detectedPitch.note.name || "黑键"}`);
    handleInput(detectedPitch.note.midi, "麦克风");
  } else if (gateResult.state === "held") {
    setMicrophoneUi(audio, "输入：麦克风听音", `听到：${detectedPitch.note.name || "黑键"} · 等琴音停一下`);
  } else {
    setMicrophoneUi(audio, "输入：麦克风试听", `听到：${detectedPitch.note.name || "黑键"} · 稳一稳`);
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

function microphoneSpectralAmplitude(samples, sampleRate, frequency) {
  if (!Number.isFinite(frequency) || frequency <= 0 || frequency >= sampleRate / 2) return 0;
  let real = 0;
  let imaginary = 0;
  let weightSum = 0;
  const angularStep = (2 * Math.PI * frequency) / sampleRate;
  const lastIndex = samples.length - 1;
  for (let index = 0; index < samples.length; index += 1) {
    const weight = lastIndex > 0 ? 0.5 - 0.5 * Math.cos((2 * Math.PI * index) / lastIndex) : 1;
    const value = samples[index] * weight;
    const angle = angularStep * index;
    real += value * Math.cos(angle);
    imaginary -= value * Math.sin(angle);
    weightSum += weight;
  }
  return weightSum > 0 ? (2 * Math.hypot(real, imaginary)) / weightSum : 0;
}

function microphoneHarmonicProfile(samples, sampleRate, frequency, signalPower) {
  const amplitudes = [];
  let harmonicPower = 0;
  for (let harmonic = 1; harmonic <= 6; harmonic += 1) {
    const harmonicFrequency = frequency * harmonic;
    if (harmonicFrequency >= sampleRate / 2) break;
    const amplitude = microphoneSpectralAmplitude(samples, sampleRate, harmonicFrequency);
    amplitudes.push(amplitude);
    harmonicPower += (amplitude * amplitude) / 2;
  }
  return {
    amplitudes,
    coverage: signalPower > 0 ? Math.min(1, harmonicPower / signalPower) : 0
  };
}

function microphoneLowOctaveEvidence(profile, signalRms) {
  const fundamental = profile?.amplitudes?.[0] || 0;
  const second = profile?.amplitudes?.[1] || 0;
  const third = profile?.amplitudes?.[2] || 0;
  const componentFloor = Math.max(0.004, signalRms * 0.10);
  if (fundamental < componentFloor) return "absent";
  const fundamentalDominant = fundamental >= second * 0.62;
  const thirdSupportsFundamental = third >= Math.max(componentFloor, fundamental * 0.32, second * 0.14);
  if (fundamentalDominant || thirdSupportsFundamental) return "supported";
  if (second >= fundamental * 1.25) return "ambiguous";
  return "supported";
}

function estimatePitch(samples, sampleRate) {
  if (!samples?.length || !Number.isFinite(sampleRate) || sampleRate <= 0) return null;
  const minimumSamples = Math.max(
    Math.ceil((sampleRate / MIC_ESTIMATOR_MIN_FREQUENCY) * MIC_ESTIMATOR_MIN_CYCLES),
    Math.ceil((sampleRate * MIC_ESTIMATOR_MIN_WINDOW_MS) / 1000)
  );
  if (samples.length < minimumSamples) return null;

  const stride = Math.max(1, Math.floor(samples.length / MIC_ESTIMATOR_MAX_SAMPLES));
  const sampleCount = Math.min(MIC_ESTIMATOR_MAX_SAMPLES, Math.floor(samples.length / stride));
  const prepared = new Float64Array(sampleCount);
  let mean = 0;
  for (let index = 0; index < sampleCount; index += 1) {
    let value = 0;
    for (let offset = 0; offset < stride; offset += 1) value += Number(samples[index * stride + offset]) || 0;
    prepared[index] = value / stride;
    mean += prepared[index];
  }
  mean /= sampleCount;
  let signalPower = 0;
  for (let index = 0; index < sampleCount; index += 1) {
    prepared[index] -= mean;
    signalPower += prepared[index] * prepared[index];
  }
  signalPower /= sampleCount;
  const signalRms = Math.sqrt(signalPower);
  if (!Number.isFinite(signalRms) || signalRms < MIC_SIGNAL_RMS) return null;

  const estimatorSampleRate = sampleRate / stride;
  const minLag = Math.max(2, Math.floor(estimatorSampleRate / MIC_ESTIMATOR_MAX_FREQUENCY));
  const maxLag = Math.min(
    Math.floor(sampleCount / 2),
    Math.ceil(estimatorSampleRate / MIC_ESTIMATOR_MIN_FREQUENCY)
  );
  const comparisonLength = sampleCount - maxLag;
  if (comparisonLength <= maxLag) return null;

  const difference = new Float64Array(maxLag + 1);
  const normalizedDifference = new Float64Array(maxLag + 1);
  normalizedDifference[0] = 1;
  let runningDifference = 0;
  for (let lag = 1; lag <= maxLag; lag += 1) {
    let sum = 0;
    for (let index = 0; index < comparisonLength; index += 1) {
      const delta = prepared[index] - prepared[index + lag];
      sum += delta * delta;
    }
    difference[lag] = sum;
    runningDifference += sum;
    normalizedDifference[lag] = runningDifference > 0 ? (sum * lag) / runningDifference : 1;
  }

  let candidateLag = 0;
  let bestLag = minLag;
  for (let lag = minLag; lag <= maxLag; lag += 1) {
    if (normalizedDifference[lag] < normalizedDifference[bestLag]) bestLag = lag;
    if (normalizedDifference[lag] >= MIC_YIN_THRESHOLD) continue;
    while (lag + 1 <= maxLag && normalizedDifference[lag + 1] < normalizedDifference[lag]) lag += 1;
    candidateLag = lag;
    break;
  }
  if (!candidateLag) candidateLag = bestLag;
  const yinConfidence = 1 - normalizedDifference[candidateLag];
  if (yinConfidence < MIC_DETECT_CONFIDENCE) return null;

  let refinedLag = candidateLag;
  if (candidateLag > minLag && candidateLag < maxLag) {
    const left = normalizedDifference[candidateLag - 1];
    const center = normalizedDifference[candidateLag];
    const right = normalizedDifference[candidateLag + 1];
    const denominator = left - (2 * center) + right;
    if (Math.abs(denominator) > 1e-9) {
      refinedLag += Math.max(-0.5, Math.min(0.5, (0.5 * (left - right)) / denominator));
    }
  }

  let frequency = estimatorSampleRate / refinedLag;
  let profile = microphoneHarmonicProfile(prepared, estimatorSampleRate, frequency, signalPower);
  let octaveAmbiguous = false;
  if (frequency / 2 >= MIC_ESTIMATOR_MIN_FREQUENCY) {
    const lowerFrequency = frequency / 2;
    const lowerProfile = microphoneHarmonicProfile(prepared, estimatorSampleRate, lowerFrequency, signalPower);
    const lowerEvidence = microphoneLowOctaveEvidence(lowerProfile, signalRms);
    if (lowerEvidence === "supported" && lowerProfile.coverage >= MIC_MIN_HARMONIC_COVERAGE) {
      frequency = lowerFrequency;
      profile = lowerProfile;
    } else if (lowerEvidence === "ambiguous") {
      octaveAmbiguous = true;
    }
  }
  const resolvedLowEvidence = microphoneLowOctaveEvidence(profile, signalRms);
  if (resolvedLowEvidence === "ambiguous") octaveAmbiguous = true;
  if (profile.coverage < MIC_MIN_HARMONIC_COVERAGE) return null;

  return {
    frequency,
    confidence: Math.min(0.99, (yinConfidence * 0.72) + (profile.coverage * 0.28)),
    octaveAmbiguous,
    harmonicCoverage: profile.coverage,
    sampleCount: samples.length,
    analysisWindowMs: (samples.length / sampleRate) * 1000,
    minFrequency: MIC_ESTIMATOR_MIN_FREQUENCY,
    maxFrequency: MIC_ESTIMATOR_MAX_FREQUENCY
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
document.addEventListener("pointerup", releaseLs08PointerFromDocument, { capture: true });
document.addEventListener("pointercancel", releaseLs08PointerFromDocument, { capture: true });
document.addEventListener("pointerup", releaseChapter4BubblePointerFromDocument, { capture: true });
document.addEventListener("pointercancel", releaseChapter4BubblePointerFromDocument, { capture: true });
window.addEventListener("blur", () => {
  clearAllLs08PointerActivations();
  clearAllChapter4BubblePointerActivations();
  interruptTeachingPianoSequence("window-blur");
  interruptActiveAudioAExternalInput("window-blur");
  interruptActiveAudioBExternalInput("window-blur");
  interruptActiveAudioCExternalInput("window-blur");
});
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    interruptTeachingPianoSequence("document-hidden");
    interruptActiveAudioAExternalInput("document-hidden");
    interruptActiveAudioBExternalInput("document-hidden");
    interruptActiveAudioCExternalInput("document-hidden");
  }
});
window.addEventListener("pagehide", () => {
  interruptTeachingPianoSequence("pagehide");
  interruptActiveAudioAExternalInput("pagehide");
  interruptActiveAudioBExternalInput("pagehide");
  interruptActiveAudioCExternalInput("pagehide");
});
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
els.gardenRestMarker?.addEventListener("click", () => {
  if (hasFormalChapter4EntranceEvidence()) startChapter4FromMap();
  else startGardenFromMap();
});
els.chapter4Bubbles?.querySelectorAll(".chapter4-bubble[data-bubble-id]").forEach((bubble) => {
  bubble.addEventListener("pointerdown", (event) => {
    const startsNewPress = beginChapter4BubblePointerActivation(bubble.dataset.bubbleId, event);
    try { bubble.setPointerCapture?.(event.pointerId); } catch (error) { /* Document-level release remains authoritative. */ }
    if (startsNewPress) handleChapter4BubbleActivation(bubble.dataset.bubbleId, "touch-bubble");
    else {
      const attempt = ensureChapter4Attempt();
      attempt?.observations?.push({ event: "overlap-bubble", bubbleId: bubble.dataset.bubbleId, phase: attempt.phase, occurredAt: new Date().toISOString() });
      persistChapter4Attempt();
    }
  });
  bubble.addEventListener("pointerup", (event) => {
    if (chapter4BubbleDocumentReleaseEvents.has(event)) return;
    endChapter4BubblePointerActivation(bubble.dataset.bubbleId, event);
  });
  bubble.addEventListener("pointercancel", (event) => {
    if (chapter4BubbleDocumentReleaseEvents.has(event)) return;
    endChapter4BubblePointerActivation(bubble.dataset.bubbleId, event);
  });
  bubble.addEventListener("click", (event) => {
    if (consumeChapter4BubblePointerClick(bubble.dataset.bubbleId, event)) return;
    handleChapter4BubbleActivation(bubble.dataset.bubbleId, "accessible-bubble");
  });
});
els.chapter4StartCheck?.addEventListener("click", () => {
  unlockChapter4AudioFromGesture();
  const attempt = ensureChapter4Attempt();
  if (!attempt) return;
  if (attempt.levelId === "LP02" && attempt.phase === "lp02-reconnect-ready") {
    startLp02Reconnect();
    return;
  }
  if (attempt.levelId !== "LP01") return;
  if (attempt.phase === "lp01-model-ready") startLp01ModelStep(attempt.modelIndex || 0);
  else beginLp01Check();
});
els.chapter4Replay?.addEventListener("click", () => {
  unlockChapter4AudioFromGesture();
  const attempt = ensureChapter4Attempt();
  if (!attempt) return;
  if (attempt.phase === "sound-paused") recoverChapter4Sound();
  else if (attempt.levelId === "LP01" && attempt.phase === "lp01-model") {
    attempt.modelActiveBubbleId = "bubble-1";
    startLp01ModelStep(0, { replay: true });
  } else if (attempt.levelId === "LP01" && ["awaiting-response", "assisted", "visual-assist"].includes(attempt.phase)) {
    playLp01Target("child-replay");
  }
});
els.chapter4VisualAssist?.addEventListener("click", () => {
  const attempt = ensureChapter4Attempt();
  if (!attempt || attempt.levelId !== "LP01" || attempt.phase !== "assisted") return;
  clearChapter4Timers();
  attempt.accessibilityVisualAssist = true;
  attempt.callAccessibilityVisualAssist = true;
  attempt.targetRevealedBeforeResponse = true;
  attempt.callTargetRevealedBeforeResponse = true;
  attempt.needsPractice = true;
  attempt.openingReviewRequired = true;
  attempt.phase = "visual-assist";
  persistChapter4Attempt();
  renderChapter4Screen();
});
els.listeningReplay?.addEventListener("click", () => {
  unlockChapter3AudioFromGesture();
  if (currentLs08Action()) {
    const attempt = ensureLs08Attempt();
    if (!attempt) return;
    if (attempt.guideAudioPlaying || attempt.repairAudioPlaying || ["wrong-first", "wrong-second", "pair-compare", "modeled-playing"].includes(attempt.phase)) return;
    if (attempt.phase === "sound-paused" && attempt.soundPauseContext === "low-echo") completeLs08LowEcho();
    else if (attempt.phase === "sound-paused" && attempt.soundPauseContext === "wrong-repair") startLs08WrongRepairPlayback(attempt);
    else if (attempt.phase === "sound-paused" && attempt.soundPauseContext === "modeled") completeLs08Modeled("sound-recovery-modeled");
    else if (attempt.phase === "sound-paused" && attempt.soundPauseContext === "guide-repair") {
      attempt.phase = attempt.guideIndex === 0 ? "guide-first" : "guide-second";
      startLs08GuideRepairPlayback(attempt);
    }
    else if (attempt.phase === "sound-paused" && attempt.soundPauseContext === "guide") playLs08Guide({ replay: Boolean(attempt.pendingGuideReplay) });
    else if (attempt.phase === "sound-paused" && attempt.soundPauseContext === "pair") {
      const interruptedReplayReason = attempt.audioTransaction?.payload?.replayReason || attempt.pendingPairReplayReason;
      const replayReason = interruptedReplayReason === "child-replay" ? "child-replay" : "sound-recovery";
      playLs08Pair(replayReason);
    }
    else if (!attempt.guideCompleted || ["guide-ready", "guide-first", "guide-second"].includes(attempt.phase)) playLs08Guide({ replay: true });
    else playLs08Pair(attempt.phase === "sound-paused" ? "sound-recovery" : "child-replay");
    return;
  }
  if (currentPairedListeningAction()) {
    const attempt = currentAudioCAttempt();
    if (!attempt) return;
    if (audioCPlaybackIsActive(attempt) || audioCExternalInputIsActive(attempt)) return;
    const pendingGuideNeedsGesture = attempt.phase === "guide-next-pending" &&
      attempt.pendingGuidePresentation?.requiresExplicitGesture === true;
    if (["child-echo-playing", "guide-target-pending"].includes(attempt.phase) ||
      (attempt.phase === "guide-next-pending" && !pendingGuideNeedsGesture)) return;
    if (attempt.phase === "sound-paused") {
      recoverAudioCAttempt();
      return;
    }
    if (!attempt.guidePlayed || ["guide-ready", "visible-guide", "guide-next-pending"].includes(attempt.phase)) {
      playPairedListeningGuide({ recovery: pendingGuideNeedsGesture });
    }
    else if (attempt.phase === "replay-ready") playPairedListeningTarget("system-first");
    else playPairedListeningWholePairReplay();
    return;
  }
  if (currentListeningAction("LS05")) {
    const attempt = ensureLs05Attempt();
    if (!attempt) return;
    if (audioBPlaybackIsActive(attempt)) return;
    if (attempt.phase === "sound-paused") {
      recoverAudioBAttempt();
      return;
    }
    if (!attempt.referencePlayed || attempt.phase === "reference-ready") playLs05Reference();
    else if (attempt.phase === "replay-ready") playLs05Target("system-first");
    else playLs05Target("child-replay");
    return;
  }
  const attempt = ensureLs04Attempt();
  if (!attempt) return;
  if (audioBPlaybackIsActive(attempt)) return;
  if (attempt.phase === "sound-paused") {
    recoverAudioBAttempt();
    return;
  }
  if (!attempt.referencePlayed || attempt.phase === "reference-ready") playLs04Reference();
  else if (attempt.phase === "replay-ready") playLs04Target("system-first");
  else playLs04Target("child-replay");
});
els.ls05VisualAssist?.addEventListener("click", () => {
  if (currentLs08Action()) enableLs08VisualAssist();
  else if (currentPairedListeningAction()) enablePairedListeningVisualAssist();
  else enableLs05VisualAssist();
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
els.resetLevel.addEventListener("click", () => {
  if (isAudioAM03Active()) clearM03AudioAttempt();
  resetLevel();
});
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
  if (currentLs08Action()) {
    ensureLs08Attempt();
    setTimeout(() => resumeLs08Flow({ fromReload: true }), 0);
  } else if (currentListeningAction("LS04")) {
    ensureLs04Attempt();
    setTimeout(() => resumeLs04Flow({ fromReload: true }), 0);
  } else if (currentListeningAction("LS05")) {
    ensureLs05Attempt();
    setTimeout(() => resumeLs05Flow({ fromReload: true }), 0);
  } else if (currentPairedListeningAction()) {
    ensurePairedListeningAttempt();
    setTimeout(() => resumeAudioCPairedListeningFlow({ fromReload: true }), 0);
  } else {
    restoreGardenPendingAttempt();
  }
} else if (state.screen === "chapter4") {
  ensureChapter4Attempt();
  setTimeout(() => resumeChapter4Flow({ fromReload: !state.chapter4DirectMode }), 0);
}
render();
setInstructionFeedback();
startBootSequence();
registerPwaShell();
