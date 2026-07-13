# LS06-LS07 主管独立验收与运行工作单

状态：`independently_passed / browser_baseline_promoted / ls08_unlocked / media_runtime_locked`

## 一、用途与解锁条件

本文件锁定第三章后续两个听辨里程碑，并在 `overhaul-341a` LS05 通过主管独立审查后正式晋升为当前唯一运行工作单。它只授权原型任务实现 LS06 与 LS07，不授权 LS08、第三章出口、媒体集成或第四章。

以下解锁条件已经满足并保留为提交前复核清单：

1. `C3-04 / LS05` 已有冻结提交、独立专项复跑、稳定六视口合同和原尺寸人工审图；
2. `LS05` 的音名显示、同权比较、每题证据、跨 session 连续性和 stable 边界均通过；
3. 当前运行工作树已清，媒体任务没有待集成候选；
4. 主管明确下发“只做 `C3-05 / LS06` 与 `C3-06 / LS07`”的工作单。

课程事实源：`03_CONTENT_ROADMAP.md`、`09_SCAFFOLD_AND_ASSESSMENT_RULES.md`、`24_HUMAN_STORY_AND_LESSON_BOOK.md`、`31_SESSION_SCHEDULER_AND_RETENTION_RUNTIME_CONTRACT.md`、`32_CHAPTER3_LISTENING_RUNTIME_CONTRACT.md`、`33_GAME_TEACHING_PACING_AND_MOTIVATION_CONTRACT.md`。

## 二、范围冻结

允许范围：

- 新增独立 `C3-05 / LS06`“远远的回声藤”；
- 新增独立 `C3-06 / LS07`“挨着睡的 E 和 F”；
- 复用已经通过的 Chapter 3 会话、声音、输入、修复、家长证据和自然停点接口；
- 为两关新增独立专项与媒体保护区合同。

禁止范围：

- 不实现 `LS08`、第三章章节出口、低音故事事件或第四章；
- 不改 `LS01-LS05` 的音序、阈值、证据或故事结果；
- 不接入 `concepts/**`、`audio/**`、技术预演、未批准语音或候选动画；
- 不重构全局 CSS、通用 session scheduler、第一二章玩法或现有角色资产；
- 不把两关合并成一个无休息的长 session。

## 三、教学递进为何合理

| 里程碑 | 唯一新增难点 | 保持不变 | 孩子得到的故事结果 |
| --- | --- | --- | --- |
| `LS05` | C/D/E 三音小集合 | 单音、自由速度、听后找键 | 三朵花一起开放 |
| `LS06` | C/G 大距离声音与键位跨度 | 仍只有两个候选、仍是单音 | 长藤跨过远石形成拱门 |
| `LS07` | E/F 相邻声音与黑键组边界 | 仍只有两个候选、仍是四次呼叫 | 两株缠绕花分开站稳 |
| `LS08` | 两音先后记忆 | 留待下一独立里程碑 | 根须连到地下 |

`LS06` 先用差别较大的 C/G 建立比较信心，`LS07` 再把集合缩成最接近的 E/F。不能先做 E/F 再回到 C/G，也不能在同一 session 内从大距离突然切换到相邻音。

## 四、统一短课节奏

两关都使用同一四段循环，但世界物件和教学焦点不同：

1. `发现`：孩子从地图明确点击进入，创建唯一正式 session；没有自动进入或无手势教学音。
2. `带路`：先看见、听见两个候选的可见模型，再由孩子分别在真实键盘上找到并按一次；普通界面只显示字母，星芽气泡可说唱名；这两个 guided step 只写教学观察，不计四次 check。
3. `自己听`：完成四次受约束隐藏呼叫；目标播放结束后才开放触屏、MIDI 或实验麦克风输入。
4. `故事停点`：世界物件给出完整结果，随后自动回地图休息；没有结果弹层、关闭、继续或下一关按钮。

若可见带路已经出现 repeated repair、strong、modeled、长等待或明显疲劳，只完成一个中性小故事结果并休息，不在同一 session 强行进入隐藏 check。下一次明确进入时重新做短带路，再开始完整四次 check。

## 五、LS06：远远的回声藤

### 可见带路

- 画面同时提供普通字母 `C`、`G` 和真实键盘上的两个键位家；星芽气泡可说 Do、Sol。
- 中央回声石按相同音色、力度、时长和中央声像先后示范 C4、G4。
- 两块远石保持固定位置和同等视觉权重；“近/远”是故事地理，不得用目标声像、朝向、冒芽或运动编码答案。
- 孩子必须分别按一次 C、G 完成两个可见 guided step；每一步同时建立字母音名、星芽唱名、声音和真实键位的联系。这些输入只写 guided/played 观察，不计四次 check、stable 或 retained。
- 带路第一次错按只柔和重播当前音并同时保留 C/G 两个键位家；再次错按或长等待时只完成中性小结果并回地图休息，不进入隐藏 check。下一次明确点击创建新 session，并从两个 guided step 重新开始。

### 四次隐藏呼叫

- 目标只来自 `C4/MIDI 60` 与 `G4/MIDI 67`；C、G 各出现两次，同音不得连续超过两次。
- 完整序列由 session seed 决定并持久化；不得用出现频率、左右位置或永久藤结暴露剩余答案。
- 正式播放和等待时，两块石头都不冒芽、不发光、不改变大小；声音始终中央声像。
- 每次回答后，匹配一端可短暂回应；下一题前两端恢复同态。
- 跨题只保留从中央对称生长的中性藤结，不记录刚才是 C 还是 G。
- 四次结束后藤蔓才永久连成拱门，星芽在拱门下自然休息。

### Stable

同一完整 check session 内至少 `3/4` 首次有效孩子回答正确，且本 session 已完成两个不计分 guided step，并且无提前目标揭示、strong、modeled、visual-assist 或实验麦克风推动。普通错误后自行修复可完成故事，但不得回填该题 qualifying correct。LS06 只证明“能比较 C/G 两个已知声音并找键”，不得写成高低音、音区、绝对音感或跨八度能力。

## 六、LS07：挨着睡的 E 和 F

### 可见带路

- 画面同时显示普通字母 `E`、`F`，以及 E 在两黑键右侧、F 在三黑键左侧的边界关系；星芽气泡可说 Mi、Fa。
- 中央露珠用相同音色、力度、时长和声像分别示范 E4、F4。
- 两朵边界花在目标播放前保持同样姿势、大小和亮度；可见边界图属于不计分带路，不能常驻在隐藏 check 中。
- 孩子必须分别按一次 E、F 完成两个可见 guided step；每一步同时建立字母音名、星芽唱名、黑键组边界和真实键位的联系。这些输入只写 guided/played 观察，不计四次 check、stable 或 retained。
- 带路第一次错按只柔和重播当前音并继续等权显示 E/F 边界；再次错按或长等待时只完成中性小结果并回地图休息，不进入隐藏 check。下一次明确点击创建新 session，并从两个 guided step 重新开始。

### 四次隐藏呼叫

- 目标只来自 `E4/MIDI 64` 与 `F4/MIDI 65`；E、F 各出现两次。
- 中央露珠是唯一作答前声源；两朵花不因目标改变姿势、颜色、嘴型、位置或动画。
- 每次回答后，对应花可短暂回应；下一题前恢复同态。
- 跨题只保留中性“解结”进度，不记录 E/F 身份或剩余频次。
- 四次结束后两株花才永久分开并各自站稳，随后回地图休息。

### Stable

同一完整 check session 内至少 `3/4` 首次有效孩子回答正确，且本 session 已完成两个不计分 guided step，并且无提前边界答案、strong、modeled、visual-assist 或实验麦克风推动。LS07 要把必经的“开场可见边界教学”和隐藏作答后的“边界强帮助”分开记录；前者不阻断 stable，后者可以完成故事但不能称听辨稳定。

## 七、孩子可见身份规则

- 除明确挂在星芽身上的对话框外，键盘、任务、地图、候选、反馈、藤结、花朵和结果只显示 `C D E F G` 字母音名。
- 不出现普通 `Do/C`、`Mi/E`、`Sol/G` 双标，也不在普通副标题恢复 Do/Re/Mi/Fa/Sol。
- 星芽气泡可说“我唱 Do，你找 C”“我唱 Mi 或 Fa”，但同屏普通模型仍只显示字母。
- 家长区可保留双身份；孩子端键盘与任务 ARIA 只使用字母音名和必要键位定位。隐藏目标不得进入 `aria-label`、`title`、`alt`、class、data、伪元素或隐藏说明。

## 八、作答前无泄题

| 状态 | 必须保持中性 | 禁止行为 |
| --- | --- | --- |
| visible-guide | 两个候选同权出现，明确标为带路、不计题 | 把带路输入计入 check |
| target-playing | 统一中央声源、统一听姿 | 目标声像、目标石/花动作、目标键 pulse |
| awaiting-response | 两候选同态、正常字母键盘、中性进度 | 目标名、唱名、locator、颜色、方向或 active class |
| wrong-known | 孩子实际音后再听目标 | 立刻点亮正确键 |
| pair-compare | 两候选使用角色无关的中性排序和完全同权样式 | 永远把目标放第一/第二、单候选塌缩、目标专属 ARIA |
| assisted-retry | 明确记录 strong，短时显示合法键位帮助 | 把帮助后输入写成无提示正确 |
| visual-assist | 字母与键位模型持续可见，退出隐藏评分 | 写 listening correct、coverage、stable 或 retained |
| complete | 完整故事结果和自然休息 | 弹层、下一关按钮、自动进入另一关 |

错误八度、A/B 或其他当前候选外 MIDI 输入不得让 pair UI 只剩目标一个选项。无法形成低龄可懂的同权二选一时，应进入诚实的音区/候选外强帮助并阻止 stable，而不是伪装成普通 pair compare。

## 九、错误修复与连续性

每一题使用有界、call-local 修复：

1. 第一次错误：记录并播放孩子实际音，再播放目标；不亮答案键。
2. 第二次同一混淆：显示角色无关排序的同权两音比较；音频仍可按“孩子音 -> 目标音”教学。
3. 第三次错误：进入 bounded strong assisted。LS06 显示 C/G 两个键位家；LS07 显示 E/F 黑键组边界，并短脉冲正确键。
4. 第四次错误或 assisted 超时：modeled 当前题并到安全休息；只推进当前中性故事格，不伪造剩余题正确。

`wrongCount`、`repairStage`、混淆对、该题重听和响应计时在新题开始时清零；整轮总错音、输入路线、重听和混淆统计继续累计。

地图暂停和刷新保留同一 session、seed、当前题、修复层级和真实 evidence。modeled/fatigue 结束 session 后可以保留已完成的中性故事格与剩余 seeded 呼叫；下一次明确点击创建 `resumeOfSessionId`，先重做本关不计分双候选带路，再只续剩余故事题。跨 session 片段可以完成故事，不能拼成 stable。

## 十、每题证据合同

每个 guided 或 scored call 至少记录：

```json
{
  "levelId": "LS06",
  "bundleId": "C3-05",
  "sessionId": "...",
  "phaseRole": "check",
  "callIndex": 1,
  "targetMidi": 67,
  "candidateMidis": [60, 67],
  "firstChildInputMidi": 60,
  "inputRoute": "touch",
  "qualifyingCorrect": false,
  "childReplayCount": 0,
  "systemReplayCount": 1,
  "targetRevealedBeforeResponse": false,
  "strongCueUsed": false,
  "modeled": false,
  "accessibilityVisualAssist": false,
  "experimentalInput": false,
  "responseMs": 0,
  "timingUsedForMastery": false
}
```

要求：

- `responseMs` 只作观察；速度不判错、不扣奖励、不参与 stable/retained。
- guided 与 check 证据分开，visible-guide 不进入 check 分母。
- guided step 必须写入 `levelId`、`bundleId`、真实 `sessionId`、`phaseRole=guide`、`targetMidi`、`inputRoute`、孩子实际输入、正确与否、repair 和时间；两个 guided step 完成后才可开始 hidden check。
- 每次进入或 resume 都新增本 session 的 `guideRun`；不能只保留一个跨 session 的 `guidePlayed=true`。完成证据、partial-rest 和 resume 都要保留各次 `guideRun` 的原 session 归属。
- 错后修对保留在 child input history，但不能覆盖 first response。
- resume 前后的 call 保留各自真实 sessionId，最终故事汇总不得改写旧 call 归属。
- 历史 stable/retained 不因后来困难删除；当天困难单独写 needsPractice。

## 十一、家长端

LS06 必须显示：

- `C/G 大距离声音比较 · 听后找键` 或等价准确名称；
- 首答、主动/系统重听、主要混淆、strong/modeled/mic/visual-assist；
- played、stable、retained、today-needs-practice；
- 明确“不是绝对音感或音区掌握”。

LS07 必须显示：

- `E/F 相邻声音比较 · 键盘边界` 或等价准确名称；
- 声音首答、开场 E/F 可见边界教学是否完成、隐藏作答后是否使用边界强帮助三者分开呈现；
- played、stable、retained、today-needs-practice；
- 不把可见边界帮助称作听辨成功。

活动中、自然休息后的地图和 resume 状态都不能回退显示 LS05 三朵花、旧月球基地或 LS01-LS03“不计稳定”的模板。

## 十二、游戏性与低龄节奏

- 每个有效回答约 1 秒内得到清楚琴音、按键反馈和一次短世界回应。
- 错误不让藤蔓枯萎、不重新缠死花朵、不撤销已获得的中性进度。
- 带路最多约 20-30 秒，四次 check 目标约 60-90 秒；困难时优先自然休息，不拖成长测试。
- 孩子端不显示正确率、倒计时、速度、stable、retained 或考试语言。
- 减少动态保留静态回应和最终世界结果，去掉连续藤蔓摆动、快速闪烁和粒子。
- 无文字观察时，孩子仍应能从中央声源、两个同态候选、真实键盘、答后藤/花变化理解循环。

## 十三、声音与输入安全

- C4、E4、F4、G4 使用同一音源、力度、包络、时长、混响和中央声像；LS06 禁止左右/远近混音编码答案。
- 教学音起音后的前 540ms 不被语音、环境声、奖励动机或 Foley 遮盖。
- target-playing、声音关闭、音量 0、AudioContext 失败或播放中断时不评分；恢复后重播同一题。
- 触屏是完整核心路线；MIDI 精确八度才算正确；麦克风在真机校准前最多推动 played，不能授 stable/retained。
- 听力辅助只在已启用且声音有界恢复失败，或已进入 strong-help 后提供；正常等待态不常驻答案入口。

## 十四、专项与合同门禁

建议新增独立 `check:chapter3-ls06-ls07`，不得把断言堆进 LS05。至少覆盖：

1. LS05 完成后只解锁 LS06；LS06 完成回地图后才解锁 LS07；无 LS08。
2. 地图点击才创建 session，刷新、根地址、debug URL 不自动播放或写证据。
3. 两关各有两个真实 guided step，正确完成后才进入 hidden check；guided 不计四次 check、stable 或 retained，第二次错按或长等待会提前休息，resume 新 session 重新完成整段带路。
4. LS06 C/G 各两次，LS07 E/F 各两次，seed 可复现且不泄露剩余频次。
5. target-playing 输入只记 observation，awaiting-response 才评分。
6. 首答计分、错后修对不回填、`3/4` stable、strong/modeled/mic/visual-assist 阻断。
7. pair 两种方向、候选外/错误八度、同权样式和无固定目标位置。
8. call-local repair 重置，地图/刷新连续性，modeled rest 跨 session 续做但不拼 stable。
9. sound-paused、音量 0、AudioContext 失败、touch/MIDI/mic、听力辅助非评分。
10. 家长证据、每题 sessionId/responseMs/timingUsedForMastery、每次 guideRun 的真实 sessionId、LS07 开场边界教学与答后边界强帮助分离、历史 stable 保留。
11. 非星芽孩子表面只显示音名字母；隐藏 DOM/ARIA/class/data/伪元素无目标泄漏。
12. 无结果弹层、无下一关按钮、无 LS08、无未批准媒体路径。

两关各生成独立 phase-bound 六视口媒体保护区合同，至少覆盖 map-entry、visible-guide、target-playing、awaiting-response、wrong-known、pair-compare、assisted-retry、sound-paused、visual-assist、complete、reduced-motion。状态名必须与实际 phase 原子匹配；固定目录至少三连 internal hash 一致后才可作为主管证据。

共享回归至少包括：LS05、LS04、Chapter 3 visible、child-note-names、sessions、clean-state、M03/garden、PWA、input、audio settings、iPad a11y、motion、palette/contrast、Xingya suit、第一二章共享门禁、generic zones、quick、strict bundle。

## 十五、人工与真机仍不可替代

浏览器通过不能证明：

- iPad Safari 扬声器上 C/G 大距离与 E/F 相邻差是否清楚且响度公平；
- 4-6 岁孩子是否靠声音而不是石头位置、藤蔓方向或边界图猜；
- E/F 四次呼叫是否过难，修复是否足够短且不挫败；
- 真实 MIDI 错误八度、原声钢琴麦克风、家庭噪声和设备延迟；
- 教师是否认可先 C/G 后 E/F 的难度跨度与 `3/4` 阈值。

至少需要教师复核和 3-5 名儿童分 session 观察。未取得这些证据前，只能标记 browser prototype passed，不能宣称教学有效或发布成熟。

## 十六、当前裁决

- `independently_passed`：LS06/LS07 运行、`64/64` 专项、两份六视口 13 状态合同、原尺寸审图和全部共享回归均已由主管独立通过。
- `baseline`：当前浏览器基线为 `overhaul-342a`，冻结提交 `e6e27cc1fee57dc0eb2ed4a46f5b6dbb13176ff6`。
- `unlocked`：只解锁 `docs/45` 的 `C3-07 / LS08` 单独运行工作单；媒体可依据冻结坐标合同生产 source-clearance 候选，但不得接入 runtime。
- `partial`：浏览器教学逻辑通过；花园仍是原型级 CSS/线稿，不是成熟发布美术。一次旧审查服务导航超时已保留记录，干净验收服务三连稳定。
- `missing`：实体 iPad、真实 MIDI/原声钢琴麦克风、人工听审、教师、3-5 名儿童、最终来源和外部相似性。
- `not_release_ready`：本文件不构成媒体、iPad、教学有效性或 App Store 放行。
