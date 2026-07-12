# LS08 主管独立验收草案

状态：`draft_ready / LS06_LS07_gate_waiting / runtime_locked`

## 一、用途与解锁条件

本文件预先锁定 `C3-07 / LS08`“根须记两声”的课程、故事、输入和证据边界。它不是当前运行工作单，也不授权原型任务提前实现 LS08、第三章出口或第四章。

只有同时满足以下条件，主管才可晋升本草案：

1. LS05 已独立通过并成为正式浏览器基线；
2. LS06-LS07 已分别通过短课、无泄题、证据、六视口合同和共享回归；
3. 工作树已清，当前没有其他运行写者或待集成媒体；
4. 主管明确下发“只做 C3-07 / LS08”的工作单。

事实源：`03_CONTENT_ROADMAP.md`、`09_SCAFFOLD_AND_ASSESSMENT_RULES.md`、`24_HUMAN_STORY_AND_LESSON_BOOK.md`、`31_SESSION_SCHEDULER_AND_RETENTION_RUNTIME_CONTRACT.md`、`32_CHAPTER3_LISTENING_RUNTIME_CONTRACT.md`、`33_GAME_TEACHING_PACING_AND_MOTIVATION_CONTRACT.md`。

## 二、范围冻结

允许：

- 一个独立 `C3-07 / LS08` session bundle；
- 一组可见、不计分的 C-D 双音带路；
- 四组少提示双音顺序 check；
- 章节末未计分的 C4 -> C3 地底回声和自然停点；
- 独立专项、坐标合同、家长证据和第三章出口状态。

禁止：

- 不实现第四章 LP01+、低音键盘、低音谱表、左右手或节奏谱；
- 不把最终低 C 当作孩子答题、stable、retained 或低音能力；
- 不接未批准媒体、语音、音效或 Gemini/Grok/Sora 候选；
- 不修改 LS01-LS07、第一二章、通用 mastery 阈值或全局 CSS 架构；
- 不把双音顺序做成 BPM、拍点、反应速度或节奏考试。

## 三、唯一新增教学轴

LS01-LS07 都只要求孩子听一个音再找一个键。LS08 只增加一件事：记住两个已知声音的先后顺序。

保持不变：

- 音域仍以 C4、D4、E4 为核心；
- 孩子按键速度自由；
- 普通界面只显示字母音名；
- 触屏键盘是完整核心路线；
- 故事进度与 stable/retained 分开；
- 错误可修复、不会撤销已获得的中性根结。

不新增：节拍、拍号、BPM、固定时值、双手、和弦、低音键位或绝对音感。

## 四、孩子实际经历

### 1. 地图进入

LS07 自然休息后，地图显示短字母主名“两声根须”。只有孩子明确点击才创建正式 C3-07 session 并解锁声音；渲染、刷新、根地址和 debug URL 不自动创建 session、播放教学音或写证据。

### 2. 可见 C-D 带路

- 根须上出现两个稳定的声音空位，普通界面依次显示 `C`、`D` 和真实键位家；星芽气泡可说 Do、Re。
- 中央中性声源按固定间隔播放 C4、D4；两个声音位置依次示范，但不使用颜色、方向、大小或根须动作编码音高。
- 孩子在自由速度下依次回按 C、D；该段允许分别重听单音。
- 带路是 guided/played，不进入四组 check 分母、stable 或 retained。
- 带路顺利时，同一 session 最多自动进入一次少提示 check。
- 若出现 repeated repair、strong、modeled、长等待或明显疲劳，只长出一个中性根芽并回地图休息；下一次明确进入创建新 session，仍先重做一次更短的可见 C-D 带路。只有孩子在未使用 strong/modeled 的情况下完成带路，才可在同一 session 最多自动进入一次完整四组 check。
- 若连续两个 session 的可见带路仍需要 strong/modeled，应由 scheduler 安排回到 LS05 的 C/D 单音听后找键或等价补教；不得直接开放隐藏双音 check，也不得把 modeled 带路当作 check 资格。

### 3. 四组少提示 check

固定音对各出现一次：

- `C4-D4`
- `E4-D4`
- `C4-C4`
- `D4-E4`

顺序由 session seed 决定并持久化。每组两个目标音使用相同音源、力度、包络、时长、混响、中央声像和固定音间隔；正式播放期间不显示字母、唱名、目标键、方向、嘴型或根须答案。

孩子听完两声后，以自由速度按两个键。第一声与第二声之间没有规定拍点；只判断顺序，不判断快慢。

### 4. 故事完成与章节出口

- 每组回答后，根须才按孩子两个输入位置短暂回应；进入下一组前清空当前声音格。
- 跨组只保留不含音高、方向和顺序信息的中性根结。
- 四组故事完成后根须连接到地下。
- 随后播放一次未计分的 C4 -> C3 地底回声；孩子不需要按键，屏幕不显示低音 C3 键位或新谱表。
- 该故事事件结束后第三章 story completion 才可成立，并自动回地图自然休息。
- 不弹结果卡，不显示关闭、继续或下一关按钮，不自动启动第四章。

## 五、两次离散起音

`C-C` 必须收到两个真实、离散的起音，不能让一次长按填满两个声音格。

### 触屏

- 第一次 pointer/touch 按下只填第一个位置；
- 必须 pointerup/cancel 并重新按下，第二次 C 才可填第二个位置；
- 按住、滑出但指针仍 active、程序重复 pointerdown 或键盘 repeat 不计第二音。

### MIDI

- 第一次 note-on 填第一个位置；
- 必须收到对应 note-off 或 velocity-zero 后重新 note-on，才能填第二个位置；
- aftertouch、持续 note-on、设备抖动或重复消息不计第二音。

### 实验麦克风

- 第一次 confirmed onset 填第一个位置；
- 必须经过有界安静重置，再检测第二次 confirmed onset；
- 一个持续 C、扬声器回声、uncertain/noisy/octave-ambiguous 不计第二音，也不算 wrong。

触屏、MIDI、麦克风必须走同一 pair state machine；不得为测试单独提供绕过离散起音的入口。

## 六、评分与 stable

每组 qualifying 结果只取孩子第一次完整的两个离散输入：

- 两音顺序完全一致，该组 qualifying correct；
- 第一音错误，该组立即失去 qualifying correct；后续修复只推进故事；
- 第一音正确、第二音错误或超时，该组同样失去 qualifying correct；修复可以暂存第一音帮助孩子完成，但不能回填；
- 过早输入、target-playing 输入、麦克风 uncertain 和程序重复只记 observation，不形成完整回答。

Stable 必须同时满足：

1. 同一完整 check session 内至少 `3/4` 组 qualifying correct；
2. 没有分音重听；
3. 孩子主动整组重听最多一次；
4. 没有提前揭题、strong、modeled、visual-assist 或实验麦克风推动；
5. 没有跨 session 拼接。

同一 session 不写 retained。只有后续 scheduler 选择的 opening review 才可按 `31` 形成 retained。

## 七、重听合同

- visible-guide 可分别重听 C 或 D，不影响后续 check，因为它不计分。
- check 只能重听当前完整双音组，不能单独重听第一音或第二音。
- 孩子主动整组重听、系统修复重播、声音恢复重播和无障碍播报必须分开统计。
- 第一次成功孩子整组重听不阻止 stable；第二次及以上仍可完成故事，但本轮只记 played/needsPractice。
- 失败或无声的重听不消耗孩子重听额度。

## 八、作答前无泄题

| 状态 | 允许 | 禁止 |
| --- | --- | --- |
| guide | 可见 C-D 模型、分音重听、星芽唱名 | 计入四组 check |
| pair-playing | 中央声源、两个空位、统一听姿 | 字母、唱名、方向、目标键、嘴型或根须随音高变化 |
| awaiting-first | 两个空位、正常字母键盘、中性整组重听 | 任何第一音答案 |
| awaiting-second | 只显示孩子已输入的第一音事实 | 显示目标第二音或把正确键高亮 |
| wrong-first | 显示孩子完整回答，再重播整组 | 伪造第一音正确或直接填目标 |
| wrong-second | 当前修复可保留正确的第一输入位置 | 把后来修对回填 qualifying correct |
| assisted | 明确 strong、可见候选边界、短键提示 | 当作无提示 check |
| visual-assist | 可见两音字母与键位模型，完成故事 | 写 listening correct/stable/retained |
| complete | 中性根系完成、未计分地底回声 | 低音键位教学或第四章自动开始 |

目标 pair 不能出现在 aria-label、title、alt、class、data、伪元素、隐藏说明、星芽动作、根须方向或声像中。普通键盘自身 C/D/E/F/G 身份可以保留；禁止的是把其中两个提前标成当前答案。

## 九、错误修复与安全停点

错误修复以“整组”为单位，不改成节奏跟弹：

1. 首次完整回答错误：播放孩子实际两音，再重播目标整组；根结不倒退。
2. 若第一音正确、第二音错误/忘记：修复画面暂存孩子正确的第一输入位置，第二位置保持空；仍重播完整目标组。
3. 重复混淆：显示同权、角色无关排序的候选边界；不固定把目标放第一/第二。
4. 再错或长等待：进入 bounded strong assisted；仍失败则 modeled 当前组并到安全休息。
5. modeled 只推进当前中性根结，不伪造剩余组正确、整轮 completion 或 stable。

地图暂停和刷新保留同一 session、seed、当前 pair、已收到的第一输入、离散起音 armed 状态和真实 evidence。若 modeled/fatigue 结束 session，下一次明确进入创建 `resumeOfSessionId` 并只续剩余 pair；跨 session 片段可以完成根须故事，绝不能拼成 stable。

## 十、孩子可见音名规则

- 除明确挂在星芽身上的对话框外，地图、声音格、键盘、反馈、根结、结果和章节出口只显示字母音名。
- 不出现普通 `Do/C`、`Re/D`、`Mi/E` 双标；星芽气泡可说 Do/Re/Mi。
- 正式隐藏 pair 播放和等待时，星芽也不说目标唱名。
- 地底低音事件不在孩子端显示 `C3`、低 Do、低音谱表或“你学会低音了”。

## 十一、每组证据合同

每个 guide/check pair 至少记录：

```json
{
  "levelId": "LS08",
  "bundleId": "C3-07",
  "sessionId": "...",
  "phaseRole": "check",
  "pairIndex": 2,
  "targetMidis": [60, 60],
  "firstCompleteChildResponse": [60, 60],
  "inputRoute": "touch",
  "discreteOnsets": [true, true],
  "qualifyingCorrect": true,
  "childWholePairReplayCount": 0,
  "systemWholePairReplayCount": 0,
  "separateNoteReplayUsed": false,
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

- firstCompleteChildResponse 永远不被修复输入覆盖；
- 每个输入事件保留 onset、release/rearm、route、midi、时间和评分状态；
- `responseMs` 只作观察，不参与 stable、奖励或失败；
- guide 与 check、分音与整组重听、孩子与系统重播分开；
- resume 前后 pair 保留各自真实 sessionId；
- 章节末 C4 -> C3 记录为 `storyEvent/unscored`，不得进入孩子输入或 mastery 统计。

## 十二、家长端

家长摘要必须使用“两个声音的先后记忆”或等价名称，并显示：

- 四组 first-complete correct；
- 孩子整组重听与系统重播次数；
- 是否出现分音重听、strong、modeled、mic、visual-assist；
- 主要错序，例如 `C-D -> D-C`，但不向孩子端泄露；
- played、stable、retained、today-needs-practice；
- guide 是否顺利、check 是否跨 session。

不得称为节奏、速度、拍子、低音、低音谱表、双手协调、和弦或绝对音感能力。历史 stable/retained 不因后来困难删除；当天困难单独显示。

## 十三、声音优先级

- 每组两个目标音间隔固定，建议起点 `450-650ms`；真机/儿童观察后再定。
- 两音使用同一音源、力度、包络、混响与中央声像；不以时长或响度编码顺序。
- 教学音起音后的前 540ms 不被语音、环境声、奖励动机或 Foley 遮盖。
- pair-playing、声音关闭、音量 0、AudioContext 失败或播放中断时不评分；恢复后重播同一完整 pair。
- 孩子输入音先清楚可辨，再进入无稳定音高的根须反馈。
- 最终 C4 -> C3 只能在四组故事完成后播放，且与 mastery 总线隔离。

## 十四、章节完成语义

- `LS08 played`：四组故事通过孩子、温和修复或有界共同完成走到根系连通。
- `LS08 stable`：只按同一 check session 的 `3/4` 及资格条件。
- `chapter3.completed`：根系故事与未计分地底回声事件均已安全结束；不要求 LS04-LS08 全部 stable。
- 第三章完成后地图停在地底入口或第四章前置地点；不自动创建 Chapter 4 session。
- opening review、retained 和补教继续由 scheduler 决定，不阻塞故事地图前进。

## 十五、专项自动化

建议新增独立 `check:chapter3-ls08`，至少覆盖：

1. LS07 完成后才解锁 LS08；地图点击才创建 C3-07。
2. guide 不计四组 check；顺利 guide 最多进入一次 check；困难 guide 提前休息并在下一 session 重做短 guide，连续困难时路由回单音补教，不能直接进入 check。
3. 四个固定 pair 各一次、seed 可复现、刷新保持顺序。
4. target-playing 输入只 observation；两个响应窗口按自由速度工作。
5. C-C 在 touch/MIDI/mic 均要求 release/rearm；长按、repeat、aftertouch、未 note-off、持续音不能填第二格。
6. 第一完整回答冻结；错后修对不回填；`3/4` stable 与资格阻断。
7. check 只有整组重听；两次孩子重听阻断 stable；失败重听不计额度。
8. first-wrong、second-wrong/timeout、pair repair、strong、modeled、visual-assist 的证据真实。
9. 地图/刷新保留第一输入与 armed 状态；跨 session 续剩余 pair 但不拼 stable。
10. 根结进度中性、下一 pair 前候选恢复、无目标 DOM/ARIA/class/data/动画/声像泄漏。
11. touch/MIDI/mic、sound-paused、音量 0、AudioContext 失败和麦克风 uncertain。
12. 章节末低音事件不要求输入、不写 mastery、不自动启动第四章。
13. 家长证据、每 pair sessionId、responseMs 和 timingUsedForMastery=false。
14. 非星芽孩子表面仅字母音名，无普通唱名或双标。
15. 无结果弹层、关闭/下一关按钮和未批准媒体路径。

新增独立 phase-bound 六视口合同，至少覆盖 map-entry、guide-first、guide-second、pair-playing、awaiting-first、awaiting-second、wrong-first、wrong-second、assisted、sound-paused、visual-assist、complete-roots、unscored-low-echo、reduced-motion。状态名必须与实际 phase 原子匹配；固定目录至少三连 internal hash 一致。

共享回归至少包含：LS06-LS07、LS05、LS04、Chapter 3 visible、child-note-names、sessions、clean-state、M03/garden、PWA、input、audio settings、iPad a11y、motion、palette/contrast、Xingya suit、第一二章共享门禁、generic zones、quick、strict bundle。

## 十六、人工与真机证据

浏览器不能证明：

- 4-6 岁孩子是否理解“听两声再按”，而不是把两个空位当节拍格；
- `450-650ms` 间隔是否足够清楚且不诱导固定节奏；
- C-C 离散起音在真实触屏、MIDI 和原声钢琴麦克风上的可靠性；
- 孩子是否因根须方向、星芽动作或第一格保留猜答案；
- 四组加 guide 是否过长，3/4 阈值是否合适；
- 最终低音是否被误解为新答题。

必须完成教师复核、实体 iPad、真实 MIDI/原声钢琴麦克风和 3-5 名儿童分 session 观察。未取得这些证据前，只能标记 browser prototype passed。

## 十七、当前裁决

- `passed_spec_draft`：LS08 的教学轴、故事、双音状态机、离散起音、证据和出口边界已形成草案。
- `locked`：LS05、LS06-LS07 尚未全部通过，不得派发运行实现。
- `missing`：运行、专项、合同、截图、真机、教师、儿童、媒体与发布清关。
- `not_release_ready`：本文件不证明第三章或成熟 App 已完成。
