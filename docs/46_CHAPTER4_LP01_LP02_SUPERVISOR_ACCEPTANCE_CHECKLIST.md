# Chapter 4 LP01-LP02 主管独立验收草案

状态：`draft_ready / ls08_gate_waiting / runtime_locked / media_not_approved`

## 一、用途与解锁条件

本文件预先锁定 `C4-01 / LP01-LP02` 的课程、故事、输入、双八度键盘和证据边界。它不是当前运行工作单，不授权原型任务提前实现第四章。

只有以下条件全部满足，主管才可把本草案晋升为正式工作单：

1. `C3-07 / LS08` 有冻结提交、独立专项、稳定六视口合同、原尺寸审图和共享回归；
2. LS08 的未计分 C4 -> C3 地底回声和第三章自然出口真实通过，没有自动创建第四章 session；
3. 工作树 clean，只有原型任务作为唯一运行写者，媒体候选没有待集成修改；
4. 主管明确下发“只做 C4-01 / LP01-LP02”。

事实源：`03_CONTENT_ROADMAP.md`、`09_SCAFFOLD_AND_ASSESSMENT_RULES.md`、`14_NOTE_IDENTITY_MATRIX.md`、`17_STORY_ARC_AND_LEVEL_BEATS.md`、`24_HUMAN_STORY_AND_LESSON_BOOK.md`、`33_GAME_TEACHING_PACING_AND_MOTIVATION_CONTRACT.md`、`34_CHAPTER4_LOW_REGISTER_RUNTIME_CONTRACT.md`、`40_CHAPTER4_5_COURSE_STORY_AND_ART_READINESS_AUDIT.md`。

## 二、范围冻结

允许：

- 第四章地下生态层入口和一个独立 `C4-01` bundle；
- `LP01` 高低 C 的固定声音泡泡比较；
- `LP02` 连续双八度键盘上的低音 C 找家；
- LP01 困难后的自然休息、下一 session 不计分高低 C 重连和 LP02 resume；
- 家长证据、独立专项和 phase-bound 六视口合同。

禁止：

- 不实现 LP03-LP10、低音 C-D-E 路线、E/F/G、C-G-C、左手、低音谱表或 Chapter 5；
- 不让咚咚在 LP01-LP02 完整出现；只允许声音、洞穴轮廓和必要的局部故事回应；
- 不接入未批准图像、动画、语音、音效或环境声；
- 不改变第一至第三章、通用 mastery、session scheduler 或全局 CSS 架构；
- 不把 LP01 做成找低音琴键，也不把 LP02 的键位成功回填为 LP01 听辨正确。

## 三、故事地理与装备

- “低音星球”只是花园所在生态星球地下生态层的音乐昵称，不是第三颗新星球。
- 星芽从可呼吸花园进入地下层，保持本体、三颗头芽、探索背带和星星背包；不重新穿压力服，也不无头盔返回月面。
- LP01 只听见地底“咚”和看见洞穴轮廓；LP02 洞门出现门铃和第一块地基。咚咚完整形象必须留到 LP05。
- 正确后世界留下洞口亮光或第一块地基；错误不让洞穴坍塌、石头爆炸或角色失望。

## 四、C4-01 短课节奏

### 顺利路线

1. 孩子从第三章完成后的地图明确点击地下入口，创建唯一正式 C4-01 session 并解锁声音。
2. LP01 先完成两个固定声音泡泡的可见模型，再做四次高低 C 比较。
3. 若 LP01 没有 repeated repair、strong、modeled、长等待或疲劳，可在同一短课进入一次 LP02 可见找家。
4. LP02 找到低音 C 后第一块地基落下，自动回地图自然休息；不自动开始 LP02 少提示检查或 LP03。

### 困难路线

- LP01 需要 repeated repair、strong、modeled、长等待或出现疲劳时，保留发光洞口并结束旧 session 为 early-rest；不强行进入 LP02。
- 下一次明确点击创建新 session，`resumeOfSessionId` 指向旧 session；先重听一组不计分的 C4/C3 模型，再进入 LP02。
- 不重做 LP01 的完整四次 check，不把重听写成 LP01 correct/stable，也不因 LP01 困难阻止故事进入 LP02。
- LP02 自身出现 strong/modeled 时仍可让第一块地基在共同帮助下落下并自然休息，但不得写低音 C 键位 stable。

## 五、LP01：只听高低 C

### 可见模型

- 两个固定声音泡泡外观、大小、亮度、动作和位置权重相同，分别示范 C4 和 C3；映射在整轮固定，不随目标交换。
- 两个泡泡都可由孩子重听；模型阶段不计四次 check、stable 或 retained。
- 声音泡泡和普通说明不显示 `Do/C`、`C3/C4` 或高低答案文字。角色气泡可说“哪个 Do 住得更低”。

### 四次比较

- C3、C4 各出现两次，同一目标不得连续超过两次；seed 可复现并持久化。
- 每题目标只由中央中性声源播放。孩子通过触摸两个固定声音泡泡之一作答，不使用琴键作答。
- target-playing 和 awaiting-response 时，不得用角色视线、上下移动、声像、颜色、大小、地面波纹或洞口变化编码答案。
- MIDI 和麦克风只可记录非评分探索 observation，不能形成 correct、wrong、completion 或 stable。
- stable 至少 `3/4` 首次有效触摸正确，且无提前揭题、strong、modeled、visual-assist 或实验输入推动。

## 六、LP02：低音 C 的家

- 使用连续 `C3-B4` 屏幕键盘：14 个等宽白键、真实 2/3 黑键组、B-C 与 E-F 之间无黑键；不得拆成两排或水平分页。
- 普通孩子界面和 child-facing ARIA 使用 `低音 C`、`中央 C`、`下面的 C` 和黑键定位，不显示 `C3/C4`、`低音 Do` 或 `Do/C` 双标。角色气泡可说“两个都叫 Do，找下面那个家”。
- 首次可见教学同时保留低音 C 与中央 C 两个键家，不在作答前单独脉冲低音 C。教学完成只写 played。
- 中央 C 是“名字对、家不同”的近似回答：记录 `noteNameCorrect=true`、`registerCorrect=false`，温和提示低音家，不算完全正确，也不羞辱。
- 低音 C 的 reduced-cue stable 必须来自后续独立短课或 opening review 的首答正确；不得在完成四次 LP01 后继续追加检查把 C4-01 拉成长课。
- A/B 可以作为真实键盘邻居低调出现，但不能成为当前目标、奖励或未教身份考题。

## 七、修复与安全停点

### LP01

1. 第一次错误：先播放孩子选择的泡泡，再播放目标；两个泡泡仍同权，不直接点亮答案。
2. 第二次同一混淆：允许短暂重听两个泡泡，但视觉顺序保持固定中性，记录 strong 前的 repair。
3. 再错或长等待：进入 bounded strong；仍失败则 modeled 当前题并在发光洞口自然休息，不伪造剩余比较正确。

### LP02

1. 中央 C：明确“名字对，找下面的 C”，同时保留两个 C 家。
2. 其他白键或黑键：先说出孩子实际音/位置，再显示低音两黑键组定位。
3. repeated repair：短时突出低音两黑左，标记 strong；仍失败则 modeled 落下第一块地基并休息。

已获得的洞口亮光和地基不倒退。地图暂停与刷新保留 session、当前 action、repair、真实输入和 evidence；普通导航不制造 modeled、completion 或 stable。

## 八、声音合同

- C3/C4 使用同一钢琴音源、力度、包络、时长、混响和中央声像，只保留钢琴本身自然音色差。
- 需通过人工听审确认短时响度公平，不能让更低音因为更响或更长而成为答案。
- 教学音起音后的前 540ms 不被角色语音、环境声、奖励动机或 Foley 遮盖。
- 声音关闭、音量 0、AudioContext 失败或播放中断时不开放评分；恢复后重播同一题。
- 正确/错误故事反馈必须无稳定音高或足够弱，不与 C3/C4 混淆。

## 九、证据合同

LP01 每个 check call 至少记录：

```json
{
  "levelId": "LP01",
  "bundleId": "C4-01",
  "sessionId": "...",
  "targetRegister": "low",
  "targetMidi": 48,
  "firstChildBubble": "low",
  "inputRoute": "touch-bubble",
  "qualifyingCorrect": true,
  "childReplayCount": 0,
  "systemReplayCount": 0,
  "targetRevealedBeforeResponse": false,
  "strongCueUsed": false,
  "modeled": false,
  "responseMs": 0,
  "timingUsedForMastery": false
}
```

LP02 至少记录 `targetMidi=48`、首次实际 MIDI/琴键、`noteNameCorrect`、`registerCorrect`、route、wrong octave、strong/modeled、sessionId、responseMs 和 `timingUsedForMastery=false`。

要求：

- LP01 bubble 证据和 LP02 note 证据不能合并为同一种 correct；
- 速度只作观察，不判错、不扣奖励、不参与 stable/retained；
- resume 前后保留各自真实 sessionId；
- 历史 stable/retained 不因后来困难删除，当天困难单独写 needsPractice。

## 十、孩子端与家长端

孩子端：

- 不显示正确率、倒计时、速度、stable、retained、C3/C4 或“绝对音感”；
- 非角色可见文本、ARIA、title、alt、伪元素和反馈只用字母音名与必要定位；
- 三秒内能看出当前是“听两个声音”还是“在长键盘找下面的 C”，两种任务不能同屏竞争。

家长端必须分开显示：

- `高低 C 声音比较`：四次首答、重听、strong/modeled、touch bubble、played/stable/needsPractice；
- `低音 C 键位`：低音首答、中央 C 近似、wrong octave、route、played/stable/needsPractice；
- 明确“不是绝对音感测试”，也不把低音键位正确称为左手能力。

## 十一、自动化与坐标合同

新增独立 `check:chapter4-lp01-lp02`，至少覆盖：

1. 只有真实 LS08 章节出口后显示入口；点击才创建 C4-01，刷新/debug 不自动播放或写证据。
2. LP01 模型不计分；四次 C3/C4 各两次；target-playing 输入 observation；首答和 `3/4` stable 正确。
3. 两泡泡同权、固定映射、无角色/声像/位置/颜色泄题；MIDI/mic 不评分。
4. LP01 困难 early-rest、新 session resume、不计分模型重连和只续 LP02。
5. LP02 连续 14 白键和真实黑键几何；1024x768、1194x834、1366x1024 无分页、双排或溢出。
6. 普通文字与 child-facing ARIA 只用音名；中央 C 近似和低音 C 正确证据分开。
7. touch、MIDI、mic、wrong octave、sound-paused、volume 0、AudioContext failure、strong/modeled、地图/刷新连续性。
8. 无咚咚完整形象、无低音谱表、无 LP03、无结果弹层/下一关按钮、无未批准媒体路径。
9. Chapter 1-3、mastery、retained、音名门禁、PWA 和现有共享回归不变。

新增一个 phase-bound 六视口合同，至少覆盖：chapter4-entry、LP01-model、target-playing、awaiting-response、wrong、assisted、sound-paused、LP01-complete、LP01-early-rest、LP02-guide、LP02-middle-C-near-miss、LP02-assisted、LP02-complete、reduced-motion。状态名与实际 phase 必须原子匹配，固定目录三连 internal hash 一致，`runtimeIntegrationAllowed=false`。

## 十二、人工与真机仍不可替代

浏览器不能证明：

- iPad 扬声器上的 C3/C4 响度公平和低音可辨性；
- 4-6 岁孩子是否理解“听泡泡”和“找下面的 C”是前后两个不同任务；
- 连续双八度键盘是否仍有足够触摸宽度；
- 真实 MIDI wrong octave、原声钢琴麦克风、家庭噪声和设备延迟；
- 教师是否认可 LP01 `3/4`、困难后重连和 LP02 stable 分离。

必须完成实体 iPad、真实 MIDI/原声钢琴麦克风、幼儿钢琴教师和 3-5 名儿童分 session 观察。未取得这些证据前，只能标记 browser prototype passed。

## 十三、当前裁决

- `draft_ready`：C4-01 的故事地理、LP01/LP02 分轴、困难重连、双八度键盘、证据和门禁已形成解锁前草案。
- `locked`：LS08 尚未独立通过，不得派发第四章运行实现。
- `missing`：运行、专项、合同、截图、双八度真机、教师、儿童、媒体与发布清关。
- `not_release_ready`：本文件不证明第四章或成熟 App 已完成。
