# LS05 主管独立验收表

状态：`spec_ready / dispatch_ready / waiting_for_runtime_handoff`

## 一、用途和边界

本文件只用于主管独立审查 `C3-04 / LS05` 的 C/D/E 三音小集合听后找键。课程事实仍以 `03_CONTENT_ROADMAP.md`、`09_SCAFFOLD_AND_ASSESSMENT_RULES.md`、`31_SESSION_SCHEDULER_AND_RETENTION_RUNTIME_CONTRACT.md`、`32_CHAPTER3_LISTENING_RUNTIME_CONTRACT.md` 和 `33_GAME_TEACHING_PACING_AND_MOTIVATION_CONTRACT.md` 为准。

当前已通过浏览器基线是 `overhaul-340a`。下一运行里程碑只能新增 LS05，不得顺手实现 LS06-LS08、正式媒体集成、全局 CSS 重构或新角色资产。通过 LS05 仍不等于第三章完成。

## 二、先验冻结检查

| 检查项 | 通过条件 | 失败级别 |
| --- | --- | --- |
| 范围 | 只新增独立 `C3-04 / LS05`；没有开始 LS06+ | P1 |
| 前置停点 | LS04 完成后先回地图；孩子再次点击才创建 C3-04 | P0 |
| 课程音域 | 参照和目标只使用 C4、D4、E4；错误八度不算正确 | P0 |
| 旧证据 | 第一、二章及 LS01-LS04 的 completion/played/stable/retained 不被改写 | P0 |
| 章节语义 | LS05 只写 LS05/当前切片证据；`chapter3.completed` 保持 false | P0 |
| 媒体边界 | 运行层不引用 `concepts/**`、`audio/**`、技术预演或未批准候选 | P0 |
| 基线一致 | HTML、Service Worker、测试断言、截图、合同和 gate log 指向同一候选 | P1 |

## 三、孩子实际经历

1. 地图当前地点明确是呼吸花园的下一小步，不回退到月球基地或第一章。
2. 孩子明确点击后创建唯一正式 `C3-04` session。
3. 开始前只给一次可见、可听的 C4/Do 定锚；它不计正式题。
4. 正式共有五次隐藏呼叫，候选是 C4/D4/E4；声音播放结束后才开放作答。
5. 三朵花在作答前完全同态。答后只有匹配花短暂回应，并在下一呼叫前恢复同态。
6. 跨呼叫只保留五格中性花粉环，不保留“哪朵花已经出现过”的频次答案。
7. 五次完成后，三朵花一起永久开放；随后自动回地图自然休息，无结果弹层、关闭、继续或下一关按钮。

低龄人工审图重点：第一眼应是中央花粉铃、三朵同态花、当前故事问题和真实钢琴；不能先看到规则说明卡、分数、倒计时或成人式测验语言。

## 四、平衡序列和连续性

- 每轮五次必须是 `2/2/1`：三音都出现，两个音各两次，一个音一次。
- 单次出现的音要由 session seed 决定，并在后续正式 session 间轮换；至少用三个固定 seed 证明 C、D、E 都能成为单次音。
- 同音不得连续超过两次；完整序列、seed、当前呼叫和 evidence 必须持久化。
- 地图暂停和刷新只停止 timer/动画/临时 DOM；重入仍是同一 sessionId、同一序列、同一当前呼叫和同一错误/重听/支架事实。
- action 完成、modeled safe rest 或 session 结束才清 pending；新 session 不继承旧 attempt。

## 五、作答前不得泄题

以下状态要同时检查截图、可见/隐藏 DOM、class/data、ARIA、动画和键盘：

| 状态 | 不得出现 | 允许出现 |
| --- | --- | --- |
| `reference` | 把参照计入五题；暗示第一题目标 | 可见 C/Do 定锚、统一声源 |
| `target-playing` | 目标名/唱名、目标色、目标键、单花动作、方向或声像答案 | 中央同态声源、统一听音动作 |
| `awaiting-response` | 目标专属 class/data/ARIA、单花高亮/摇摆/张合、键位 pulse | 三朵同态花、中性重听、五格中性环 |
| `wrong-known` | 立刻亮正确键或让正确花持续开放 | 孩子按出的音，再重放目标 |
| `pair-compare` | 用亮度、大小或方向标出正确者 | 两个混淆候选同权比较 |
| `assisted-retry` | 把 strong cue 当无提示正确 | 明示支架并记录 strong cue |
| `sound-paused` | 无声按键计 correct/wrong | 打开声音提示、重听同一题 |
| `complete` | 结果弹层、下一关按钮、虚构剩余正确 | 三花一起开放、自然休息 |

正常钢琴键仍可显示自己的 C/D/E/F/G 身份；禁止的是把某个键提前标成“当前答案”。

## 六、计分和掌握证据

- `correctCount` 只取每次呼叫的第一次有效孩子作答。错后修对能完成故事，但不能回填 qualifying correct。
- stable 必须同时满足：总分至少 `4/5`；C、D、E 各至少一次无强提示正确；孩子主动重听最多一次；无提前揭示、strong cue、modeled success 或实验麦克风推动。
- `4/5` 但某个候选从未无提示答对，只能 played/needsPractice，不能 stable。
- 两次或更多孩子主动重听仍可给故事结果，但不能 stable/retained。
- 触屏必须能完整完成并可授 stable；MIDI 走同一证据路径；麦克风最多推动 played，不能授 stable/retained。
- 同 session 永远不得 retained；opening review 资格继续按 `31` 调度。
- `responseMs` 只作观察，不参与 mastery；速度不失败、不扣奖励。

## 七、错误修复和安全停点

1. 第一次错误：先播放孩子实际输入音，再重播目标；不亮答案键。
2. 第二次同一混淆：缩小到该混淆对的同权比较，不把第三个音一起闪烁，也不直接给答案。
3. 第三次错误：进入 bounded strong assisted，出现一个明确候选边界和正确键短脉冲，并记录 strong cue。
4. 第四次错误或 assisted 超时：只 modeled 当前呼叫并安全休息；不得伪造剩余呼叫正确、整轮 completion 或 stable。
5. 安全休息保留真实已做题数、错音、混淆对、重听和支架证据；地图只显示中性部分进度，不泄露目标频次。

## 八、游戏性、成就感和节奏

- 每次有效作答都必须在约 1 秒内得到清楚的声音/按键反馈和一次短花朵回应。
- 每次呼叫只推进一个中性花粉格；布局尺寸稳定，不因文字、错误或动画跳动。
- 错误不让花枯萎、不撤销已获得的中性进度、不使用羞辱或失败语言。
- 帮助后仍有“今天把花照顾到这里”的故事结果，但家长证据诚实区分 played、stable 和 needsPractice。
- 五次呼叫后立即自然休息，不自动开始 LS06，不用按钮维持主线。

## 九、声音和输入安全

- 教学钢琴音优先；目标起音后的前 540ms 不被语音、环境声、奖励动机或 Foley 遮盖。
- 声音关闭、音量 0、AudioContext 未解锁/失败或播放中断时进入 `sound-paused/replay-ready`，按键只记 observation。
- 恢复声音后重播同一目标；不得换题、清错音、清重听或产生无声 completion。
- C/D/E 使用同一音源、力度、包络、目标时长、混响和中央声像。
- 所有触控目标至少 44 CSS px；屏幕琴键保持真实黑白键几何。

## 十、家长端证据

活动中和完成后的地图休息态必须显示 `C/D/E 三音听后找键` 或等价准确名称，并区分：

- 本轮 first-response correct 数；
- C、D、E 候选覆盖；
- 主动/系统重听次数；
- 主要混淆对；
- strong/modelled/microphone 是否使本轮失去 stable 资格；
- played、stable、retained 和 today-needs-practice。

不得显示绝对音感、速度成绩、旧月球关卡或 LS01-LS03 的“可见练习/不计稳定”模板。

## 十一、Chapter 3 媒体坐标合同

LS05 必须生成新的候选合同，至少覆盖：garden-entry、reference、target-playing、awaiting-response、sound-paused、wrong-known、pair-compare、assisted-retry、complete、reduced-motion。

- 使用真实 DOM 几何、候选构建哈希、24px 安全边距和 alpha 阈值 `>= 8/255`。
- 保护键盘、星芽/气泡、中央花粉铃、三朵花、重听、五格花粉环、错误/比较反馈。
- 固定 expected-state 集合必须同时驱动状态完整性断言和 `stateCoverage`；缺失、意外或重复状态都失败。
- 至少六个横屏浏览器视口零 geometry failure、browser error 和页面溢出。
- `runtimeIntegrationAllowed=false`；实体 iPad Safari 保持 missing。

## 十二、主管最小复跑集合

1. 新增独立 `check:chapter3-ls05`，不把全部断言堆入 LS04 或旧 visible 专项。
2. LS05 专项至少覆盖：三个固定 seed、2/2/1、单次音轮换、无泄题 DOM/ARIA/CSS、花朵重置、中性环、first-response scoring、4/5+候选覆盖、重听上限、错误音/目标音顺序、pair compare、assisted/modeled、sound-paused、touch/MIDI/mic、地图/刷新连续性、家长证据和无 LS06。
3. 复跑 LS04 `39/39`、Chapter 3 visible、339d continuity、sessions、clean-state、M03/garden、PWA、input、audio settings、iPad a11y、motion、palette/contrast、Xingya suit、第一二章共享门禁。
4. 复跑 generic zones、LS05 Chapter 3 zones、quick 和 strict bundle。
5. 人工查看 1024x768、1194x834 DPR2、1366x1024 的 reference/waiting/wrong/pair/assisted/sound-paused/complete 原尺寸截图。

## 十三、立即退回条件

- LS04 完成后自动开始 LS05，或恢复页面无手势创建正式 C3-04/播放目标音；
- 五题不满足 2/2/1、单次音不轮换、刷新/暂停换题或清 evidence；
- 作答前任何文字、颜色、花朵动作、方向、DOM、ARIA 或键盘状态泄露目标；
- 目标花的答后状态跨呼叫保留，导致孩子可推算剩余频次；
- 错后修对回填 qualifying correct；4/5 但缺候选覆盖仍写 stable；
- strong、modeled、实验麦克风或超过一次主动重听仍写 stable/retained；
- 声音不可用时仍评分；
- modeled 后伪造剩余正确或依靠结果弹层/下一关按钮继续；
- 开始 LS06+、接入未批准媒体、改写旧章节证据或把 LS05 写成第三章完成。

## 十四、裁决状态

- `passed_browser_baseline`：P0/P1 全关，运行、截图、坐标和回归证据一致；仍保留真机、教师、儿童、来源和发布缺口。
- `partial`：实现可讨论但缺非阻断证据；不能晋升基线。
- `missing`：合同要求尚未实现或没有证据。
- `contradicted`：实现或证据与课程合同冲突。
- `rejected_as_baseline`：存在任一 P0/P1，必须发窄修工作单。

