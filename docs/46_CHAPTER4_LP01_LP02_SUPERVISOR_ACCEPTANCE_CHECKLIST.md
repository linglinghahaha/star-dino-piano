# Chapter 4 LP01-LP02 主管独立验收与运行工作单

状态：`formal_work_order_issued / 343a_gate_passed / runtime_unlocked_for_c4_01_lp01_lp02_only / media_not_approved`

## 一、用途与解锁条件

本文件锁定 `C4-01 / LP01-LP02` 的课程、故事、输入、双八度键盘和证据边界。`overhaul-343a-p2` 已完成第三章自然出口并通过主管独立审查，因此本文件现为下一唯一运行工作单；只授权本文件范围，不授权 LP03+ 或整章铺开。

只有以下条件全部满足，主管才可把本草案晋升为正式工作单：

1. `C3-07 / LS08` 有冻结提交、独立专项、稳定六视口合同、原尺寸审图和共享回归；
2. LS08 的未计分 C4 -> C3 地底回声和第三章自然出口真实通过，没有自动创建第四章 session；
3. 工作树 clean，只有原型任务作为唯一运行写者，媒体候选没有待集成修改；
4. 主管明确下发“只做 C4-01 / LP01-LP02”。

上述条件已由 `overhaul-343a-p2`、`docs/45` 的正式裁决和本文件满足。原型任务仍须在开始前读取当前 active turn；若正在完成不改运行的 source-only 审图工作，可先自然收口再切换，不要求中途丢弃有效证据。

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

1. 正式 LS08 clean、bounded assisted 或 modeled story completion 都可在未计分地底回声结束后显示入口；孩子从地图明确点击地下入口，才创建唯一正式 C4-01 session 并解锁声音。stable 不是入口条件，debug/direct/刷新不造入口或 session。
   - 上述限制指孩子的 Story mode。教师/自动化审计可以使用显式 `directMode=true / formalSession=false` 的隔离入口查看第四章，但不得写 Chapter 3 completion、正式 C4 session、played、stable、retained、地图解锁或孩子历史；普通 URL 深链不能冒充该模式。
2. LP01 先完成两个固定声音泡泡的可见模型，再做四次高低 C 比较。
3. 若 LP01 没有 repeated repair、strong、modeled、长等待或疲劳，可在同一短课进入一次 LP02 可见找家。
4. LP02 找到低音 C 后第一块地基落下，自动回地图自然休息；不自动开始 LP02 少提示检查或 LP03。

### 困难路线

- LP01 需要 repeated repair、strong、modeled、长等待或出现疲劳时，保留发光洞口并结束旧 session 为 early-rest；不强行进入 LP02。
- 下一次明确点击创建新 session，`resumeOfSessionId` 指向旧 session；先重听一组不计分的 C4/C3 模型，再进入 LP02。
- 不重做 LP01 的完整四次 check，不把重听写成 LP01 correct/stable，也不因 LP01 困难阻止故事进入 LP02；旧 session 写 `needsPractice` 并保留以后独立的 LP01 opening review，LP02 成功不能清除或回填它。
- early-rest 只记录真正呈现过的调用。当前题可由 bounded modeled 帮助解决，尚未出现的调用必须写为 `notPresented`，不能补造 correct、wrong、responseMs 或四条 scored call。洞口可以由星芽帮助点亮并写 `storyResolvedBySupport=true`，但只有四次调用都真实呈现并解决时才写 LP01 `played`；提前收短只写 partial/needsPractice 和以后复习队列。
- LP02 自身出现 strong/modeled 时仍可让第一块地基在共同帮助下落下并自然休息，但不得写低音 C 键位 stable。

## 五、LP01：只听高低 C

### 可见模型

- 两个固定声音泡泡外观、大小、亮度、动作、垂直基线和位置权重相同，分别示范 C4 和 C3；左右映射由 session seed 固定，整轮不随目标交换，并在跨孩子/复习 seed 中保持可平衡。
- 两个泡泡只在模型阶段可由孩子自由重听；模型阶段不计四次 check、stable 或 retained。正式 check 开始后，第一次点泡泡即提交本题首答并播放所选声音，不存在“先试听候选、再决定答案”的免费预听。
- 声音泡泡和普通说明不显示 `Do/C`、`C3/C4` 或高低答案文字。角色气泡可说“哪个 Do 住得更低”。

### 四次比较

- C3、C4 各出现两次，同一目标不得连续超过两次；seed 可复现并持久化。
- 每题目标只由中央中性声源播放。孩子通过触摸两个固定声音泡泡之一作答，不使用琴键作答。
- 孩子可重听整题目标；四题合计超过一次孩子主动目标重听仍可完成故事，但阻断 stable。target-playing 期间输入只记 observation，不提前评分。
- target-playing 和 awaiting-response 时，不得用角色视线、上下移动、声像、颜色、大小、地面波纹或洞口变化编码答案。
- MIDI 和麦克风只可记录非评分探索 observation，不能形成 correct、wrong、completion 或 stable。
- 每个已解决调用增加一个不含高低信息的中性洞纹，第二次和第四次形成可见进展；答后高/低反馈在下一题前完全清除。
- stable 至少 `3/4` 首次有效触摸正确，最多一次孩子目标重听，且无候选预听、提前揭题、strong、modeled、visual-assist、实验输入、跨 session 拼接或错后回填。
- 若为保护注意力而提前收短，洞口故事可由角色帮助完成，但洞纹不得假装来自四次孩子作答；运行证据必须同时保留 `presentedCallCount`、`resolvedCallCount`、`unpresentedCallCount`、`storyResolvedBySupport` 和 `storyCompletionSource`。这种路线不写 LP01 played/stable。

## 六、LP02：低音 C 的家

- 使用连续 `C3-B4` 屏幕键盘：14 个等宽白键、真实 2/3 黑键组、B-C 与 E-F 之间无黑键；不得拆成两排或水平分页。
- 普通孩子界面和 child-facing ARIA 使用 `低音 C`、`中央 C`、`下面的 C` 和黑键定位，不显示 `C3/C4`、`低音 Do` 或 `Do/C` 双标。角色气泡可说“两个都叫 Do，找下面那个家”。
- 首次可见教学同时保留低音 C 与中央 C 两个键家，不在作答前单独脉冲低音 C。教学完成只写 played。
- 中央 C 是“名字对、家不同”的近似回答：记录 `noteNameCorrect=true`、`registerCorrect=false`，温和提示低音家，不算完全正确，也不羞辱。
- 低音 C 的 reduced-cue stable 必须来自后续独立短课或 opening review 的首答正确；不得在完成四次 LP01 后继续追加检查把 C4-01 拉成长课。
- A/B 可以作为真实键盘邻居低调出现，但不能成为当前目标、奖励或未教身份考题。
- 触屏 C3 是核心正确路线；精确 MIDI C3 可写 played，C4 写同名近似但 register wrong。实验麦克风 confirmed C3 最多作为 assisted story completion，不写 LP02 stable/retained；uncertain/noisy/bleed/octave-ambiguous 不算 wrong。
- 当前浏览器麦克风估音下限高于 C3；实现 LP02 前必须把检测与音符映射明确扩展到至少 `C3-B4`，并保留八度谐波歧义保护。只有真实判为 confirmed C3 的事件才可辅助故事；把 C4、C3 的二次谐波或不稳定低频猜成 C3 必须落到 `octave-ambiguous/uncertain`，不能写 correct、wrong 或 completion。该扩展不得让第一至第三章把 A/B、低音或未教身份变成新目标。

## 七、修复与安全停点

### LP01

1. 第一次错误：先播放孩子选择的泡泡，再播放目标；两个泡泡仍同权，不直接点亮答案，也不只处理“选高、目标低”一种方向。
2. 第二次同一混淆：允许短暂重听两个泡泡，但视觉顺序保持固定中性，记录 strong 前的 repair。
3. 再错或长等待：进入 bounded strong；仍失败则 modeled 当前题并在发光洞口自然休息，不伪造剩余比较正确。
4. 地图点击发生在“孩子选择 -> 目标重播”的修复音频中时，只能排队到该事务结束后返回；刷新中断则进入对应 sound-paused 恢复，不能直接 settle、跳过目标重播或重复计错。

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
- target、孩子选择、目标重播和 modeled 都要区分 `scheduled/started/ended`。只有完整播放窗结束后才可推进洞纹、early-rest 或故事完成；地图返回可以排队，刷新中断不得把“已排程”当作“已听完”。

## 九、证据合同

LP01 每个 check call 至少记录：

```json
{
  "levelId": "LP01",
  "bundleId": "C4-01",
  "sessionId": "...",
  "targetRegister": "low",
  "targetMidi": 48,
  "sessionSeed": "...",
  "bubbleMapping": { "bubble-1": 48, "bubble-2": 60 },
  "firstChildBubbleId": "bubble-1",
  "firstChildSelectedMidi": 48,
  "inputRoute": "touch-bubble",
  "qualifyingCorrect": true,
  "childReplayCount": 0,
  "candidatePreviewUsed": false,
  "lowSideSeed": "left",
  "resolvedProgressCount": 1,
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
- 每条 LP01 call 只在真实呈现后创建；提前收短的剩余题只进入 `unpresentedCallCount`，不能生成占位 scored call。session 摘要另存 `presentedCallCount/resolvedCallCount/unpresentedCallCount/storyResolvedBySupport/storyCompletionSource`；四题未全部呈现时 LP01 `played=false`。
- `bubbleMapping` 在同一 session 固定，`firstChildBubbleId`、实际选择的 MIDI/register 和目标必须分字段保存，不能只保存“选了 low/high”而失去物理按钮与 seed 审计能力。
- 速度只作观察，不判错、不扣奖励、不参与 stable/retained；
- resume 前后保留各自真实 sessionId；
- 历史 stable/retained 不因后来困难删除，当天困难单独写 needsPractice。

## 十、孩子端与家长端

孩子端：

- 不显示正确率、倒计时、速度、stable、retained、C3/C4 或“绝对音感”；
- 非角色可见文本、ARIA、title、alt、伪元素和反馈只用字母音名与必要定位；
- 三秒内能看出当前是“听两个声音”还是“在长键盘找下面的 C”，两种任务不能同屏竞争。
- 两个声音泡泡与 14 个白键保持真实可激活控件语义。触屏 pointer 不能造成 click 二次计数；键盘/VoiceOver 等辅助激活必须能完成相同的单次选择，同时不得通过 accessible name 暴露当前高低目标。两个泡泡可使用固定中性的“声音泡泡 1/2”身份，不得都成为无法区分的同名控件。

家长端必须分开显示：

- `高低 C 声音比较`：四次首答、重听、strong/modeled、touch bubble、played/stable/needsPractice；
- 若 LP01 提前收短，家长端显示“本次做到 X/4，洞口由星芽帮助打开，高低比较待复习”，不能同时显示四题完成或“已经玩过”；
- `低音 C 键位`：低音首答、中央 C 近似、wrong octave、route、played/stable/needsPractice；
- 明确“不是绝对音感测试”，也不把低音键位正确称为左手能力。

## 十一、自动化与坐标合同

新增独立 `check:chapter4-lp01-lp02`，至少覆盖：

1. 只有正式 LS08 clean/assisted/modeled story completion 加未计分地底回声后显示入口；点击才创建 C4-01，stable 不是入口条件，刷新/debug 不自动播放或写证据。
2. LP01 模型不计分且可自由重听；check 后首次泡泡触摸即提交、无免费候选预听；四次 C3/C4 各两次；target-playing 输入 observation；首答、最多一次目标重听和 `3/4` stable 正确。
3. 两泡泡同权、固定映射、无角色/声像/位置/颜色泄题；MIDI/mic 不评分。
4. LP01 困难 early-rest、新 session resume、不计分模型重连和只续 LP02。
   - early-rest 只保留真实 presented calls；未呈现调用数正确，`storyResolvedBySupport=true`，LP01 played/stable 均为 false，LP02 后续成功不清除 needsPractice/opening-review。
5. LP02 连续 14 白键和真实黑键几何；1024x768、1194x834、1366x1024 无分页、双排或溢出。
6. 普通文字与 child-facing ARIA 只用音名；中央 C 近似和低音 C 正确证据分开。
7. LP02 touch C3、MIDI exact C3、C4 同名近似、其它 wrong octave/note、mic assisted-only、uncertain/noisy/bleed、sound-paused、volume 0、AudioContext failure、strong/modeled、地图/刷新连续性。
8. 无咚咚完整形象、无低音谱表、无 LP03、无结果弹层/下一关按钮、无未批准媒体路径。
9. LP01 每 1-2 个已解决调用出现中性洞纹进展；困难写 needsPractice/opening-review 队列，LP02 不清除或回填；Chapter 1-3、mastery、retained、音名门禁、PWA 和现有共享回归不变。
10. 麦克风检测覆盖 simulated confirmed C3，同时把 C4/谐波/低置信/家庭噪声落到正确的近似或不确定状态；不得用扩大频率范围冒充实体 iPad 与原声钢琴通过。LP01 泡泡和 LP02 白键的 pointer、click、键盘/辅助激活各只提交一次，且 child-facing accessibility tree 不泄露目标。输入后即使重绘泡泡或键盘，pointer 状态仍按稳定控件/音符身份延续；页面其他位置的 `pointerup/pointercancel` 与窗口失焦必须幂等释放，不能靠旧 DOM 节点或等待失焦才解除永久 pressed/rearm。
11. Story mode 的 direct/debug/刷新不造入口或正式证据；显式教师/审计 direct mode 必须 `formalSession=false` 且对 Chapter 3/4 学习历史零写入。
12. LP01 target、wrong repair、modeled 的地图/刷新恢复保持原音频事务；`scheduled` 不等于 `ended`，不得提前推进洞纹或故事。C4-01 的引导 LP02 即使首答正确也只写 played，LP02 stable 必须保持 0，等待以后独立 reduced-cue session。

新增一个 phase-bound 六视口合同，至少覆盖：chapter4-entry、LP01-model、target-playing、awaiting-response、wrong、wrong-repair-playing、assisted、sound-paused、LP01-complete、LP01-early-rest、LP01-supported-story-rest、LP02-guide、LP02-middle-C-near-miss、LP02-assisted、LP02-complete、reduced-motion。状态名与实际 phase 必须原子匹配，固定目录三连 internal hash 一致，`runtimeIntegrationAllowed=false`。

## 十二、人工与真机仍不可替代

浏览器不能证明：

- iPad 扬声器上的 C3/C4 响度公平和低音可辨性；
- 4-6 岁孩子是否理解“听泡泡”和“找下面的 C”是前后两个不同任务；
- 连续双八度键盘是否仍有足够触摸宽度；
- 真实 MIDI wrong octave、原声钢琴麦克风、家庭噪声和设备延迟；
- 教师是否认可 LP01 `3/4`、困难后重连和 LP02 stable 分离。

必须完成实体 iPad、真实 MIDI/原声钢琴麦克风、幼儿钢琴教师和 3-5 名儿童分 session 观察。未取得这些证据前，只能标记 browser prototype passed。

## 十三、当前裁决

- `formal_work_order_issued`：C4-01 的故事地理、LP01/LP02 分轴、困难重连、双八度键盘、证据和门禁已通过解锁审查；原型任务只可实现 `C4-01 / LP01-LP02`。
- `in_scope`：孩子明确点击地底入口、LP01 两模型加四次高低 C 比较、LP02 低音 C 找家、early-rest/resume、声音恢复、连续双八度键盘、专项和 phase-bound 六视口合同。
- `locked`：LP03+、咚咚完整形象、低音谱表、左手、Chapter 5、正式媒体/语音/音效运行集成和全局重构不得开始。
- `missing`：运行、专项、合同、截图、双八度真机、真实 MIDI/麦克风、教师、儿童、最终媒体来源、外部相似性与发布清关。
- `not_release_ready`：本工作单只解锁下一浏览器切片，不证明低音教学、设备可靠性或成熟 App 已完成。
