# LS04 主管独立验收表

状态：`passed_browser_baseline / overhaul-340a / external_evidence_missing`

## 一、用途和边界

本文件只用于主管独立审查 `C3-03 / LS04` Do/Re 两音隐藏听辨。课程事实仍以 `03_CONTENT_ROADMAP.md`、`09_SCAFFOLD_AND_ASSESSMENT_RULES.md`、`31_SESSION_SCHEDULER_AND_RETENTION_RUNTIME_CONTRACT.md`、`32_CHAPTER3_LISTENING_RUNTIME_CONTRACT.md` 和 `33_GAME_TEACHING_PACING_AND_MOTIVATION_CONTRACT.md` 为准；本表不重新发明课程规则。

`overhaul-340a` 是最先通过本表的 LS04 基线；当前主管批准浏览器基线为 `overhaul-340d`，并已复跑保留全部 LS04 行为。通过 LS04 不等于第三章完成，也不等于实体 iPad、教师、儿童、版权或发布门禁通过。

## 独立验收结果

- 运行与教学：LS04 专项 `39/39`；目标隐藏、平衡序列、地图/刷新连续性、错误重播、bounded assisted、modeled 安全停点、`3/4` stable、同 session 无 retained、实验麦克风不授 stable/retained、声音不可用不评分均通过。
- 共享回归：Chapter 3 visible、339d supervisor continuity、sessions、clean-state、M03/garden、PWA、输入、音频设置、iPad a11y、角色装备、第一二章、谱表、配色、对比度、减少动态、quick 与 strict bundle 均独立通过。
- 通用坐标合同：`teaching-zones-overhaul-340a-v1`，内部 SHA-256 `974792083d817e8b9722d6415a77bc61db4811b9d5e1c760104e9e3722c62640`。
- Chapter 3 合同：v1 因缺 `sound-paused` 被退回；v2 `chapter3-media-zones-overhaul-340a-v2` 覆盖固定九态、六视口 `9/9`、零 failure/console error，内部 SHA-256 `ed88544c6878fe769456f0fc4687ef04eb3a36eea5c61541deb9be9eb211f232`，文件 SHA-256 `A54B44AF7EA20037DD114E261279AA39296A87D9BAFC48A1D10A23503606D034`。
- 运行边界：`runtimeIntegrationAllowed=false`；未接入 `concepts/**`、`audio/**` 或技术预演，运行包仍为 41 个文件、`1,641,265` bytes。
- 仍缺：实体 iPad Safari、真实 MIDI/声学钢琴麦克风、人工耳机/扬声器/iPad 听审、教师、3-5 名儿童、最终来源与外部相似性/发布清关。

## 二、先验冻结检查

| 检查项 | 通过条件 | 失败级别 |
| --- | --- | --- |
| 范围 | 只新增独立 `C3-03 / LS04`，没有开始 LS05+ | P1 |
| 前置停点 | LS03 完成后先回地图，孩子再次点击才创建 C3-03 | P0 |
| 课程音域 | 参照和目标只使用 C4/Do、D4/Re；错误八度不算正确 | P0 |
| 旧证据 | 第一、二章及 LS01-LS03 的 completion、played、stable、retained 不被改写 | P0 |
| 章节语义 | LS04 只写 LS04/当前切片完成；`chapter3.completed` 保持 false，整章完成保留给 LS08 | P0 |
| 339d 存档迁移 | 旧“三片叶/Chapter 3 visible complete”状态幂等迁移为 `LS04 ready` 并立即持久化；迁移不创建 C3-03 session、不播放声音、不清叶片进度 | P0 |
| 媒体边界 | 运行层没有引用 `concepts/**`、`audio/**`、技术预演或未批准候选 | P0 |
| 角色资产 | 既有花园星芽文件和批准哈希未被顺手替换 | P1 |
| 版本一致 | HTML、Service Worker、测试断言、坐标合同、截图和 gate log 指向同一候选版本 | P1 |

## 三、孩子实际经历

主管必须按真实孩子路径完整走一次，不能只用调试深链或直接改 local storage：

1. 从 LS03 已完成的地图状态进入，看到明确但不依赖阅读的花园下一步。
2. 点击后创建唯一正式 C3-03 session；没有页面恢复自动建 session 或自动播教学音。
3. 开始前只出现一次可见、可听的 C4/Do 定锚；定锚不计入四次正式呼叫。
4. 每次正式呼叫先听中性钢琴音，播放结束后才开放作答。
5. C、D 两个候选在作答前保持同态；孩子不能靠颜色、方向、植物动作、文字、ARIA、键亮光或角色视线猜答案。
6. 正确后先确认音符身份，再产生短而明确的世界变化，并自动进入下一呼叫。
7. 四次呼叫后原有两侧候选叶子自身永久转向并握住，不叠加第二组“结果叶”；随后自动回到自然停点，没有关闭、继续或下一关弹层。

节奏目标：一次完整无困难短课约含 1 次定锚和 4 次有意义输入；每 1 次正确输入都有可见故事因果，但反馈不得盖住下一次目标音。孩子端不显示正确率、计时、stable、考试失败或速度评价。

## 四、无泄题矩阵

以下每个状态都要同时检查截图、可见 DOM、隐藏 DOM、class/data 属性、ARIA/accessibility name 和动画状态：

| 状态 | 不得出现 | 允许出现 |
| --- | --- | --- |
| `reference` | 把正式第一题提前写入或记分 | 明确的 C4/Do 定锚身份和一次钢琴音 |
| `target-playing` | C/D 名称、目标色、locator、目标键亮光、目标植物 active、目标方向 | 中性耳朵/声波、统一声源、两候选同态 |
| `awaiting-response` | 任一可机器读取或视觉推断的目标身份 | 中性重听、稳定候选、可按真钢琴键盘 |
| `wrong-known` | 下一题身份、下一题专属动画 | 孩子音身份、孩子音后接目标音、当前混淆边界 |
| `assisted-retry` | 把辅助后的输入冒充无提示正确 | 当前题明确边界和短暂目标键脉冲，并记录 strong cue |
| `complete` | 下一关按钮、结果弹层、伪造的剩余正确数 | 两叶握住、已完成故事状态、自然休息 |

任一正式呼叫在作答前泄露目标，整轮不得新增 stable/retained。不能通过从分母删除该呼叫来恢复资格。

## 五、序列和输入窗口

| 检查项 | 通过条件 |
| --- | --- |
| 四题配额 | C4、D4 各恰好两次 |
| 正确计数 | 每题只看第一次有效孩子作答；错后修对可推进故事，但该题不得回填为 qualifying correct |
| 相邻限制 | 同音连续不超过两次 |
| seed | 由正式 session seed 决定；刷新、地图暂停和重入不换序列 |
| 持久证据 | 当前 callIndex、目标、已发生输入、错误数、repairStage、重听来源立即落盘 |
| 过早输入 | `target-playing` 期间只记 observation，不算 correct/wrong |
| 触屏 | 完整可玩，是必需输入路线 |
| MIDI | 精确 C4/D4 才正确；未 note-off 的持续音不重复计数 |
| 麦克风 | uncertain/noisy/octave-ambiguous 不算 wrong；实验路线最多推动 played，不能授予 stable/retained |
| 声音不可用 | 声音关闭、音量 0、AudioContext 未解锁/失败或播放中断时评分窗口保持关闭；按键只记 observation，恢复声音后重播同一题 |
| 调试深链 | 不写正式 completion、stable、retained 或 opening-review 候选 |
| 旧存档 | 首次加载迁移一次并落盘；刷新后不重复迁移、不回到旧“全章完成”、不自动进入 LS04 |

至少用两个不同 seed 复核序列；不能只断言一个硬编码样本。

## 六、错误修复和安全休息

主管需分别构造以下路径，并检查画面、音频顺序和最终 evidence：

| 路径 | 预期结果 |
| --- | --- |
| 同一呼叫第一次错 | 先播放/确认孩子音，再重播目标；不亮答案键，不倒退故事 |
| 错后修对 | 保存修复后的正确输入并推进故事，但 scored call 仍为非 qualifying correct，不能把 3/4 抬成 4/4 |
| 同一混淆第二次错 | 缩小到当前 C/D 混淆，不授予 strong cue 之前的虚假正确 |
| 同一呼叫第三次错 | 进入 bounded assisted，记录 `strongCueUsed=true` |
| 第四次错或 assisted 超时 | modeled 当前呼叫，写 needsPractice；不写 child correct，不伪造剩余呼叫 |
| modeled 后 | 保留已获得的叶片变化，在最近故事安全点休息并回地图 |
| 地图暂停/刷新 | 同一 session/action 的序列、wrong、input routes 和 repairStage 连续；等待计时重新开始即可 |
| 新 session | 不继承旧 pending attempt；历史稳定记录不被后来困难删除 |

## 七、played、stable、retained 审计

| 情形 | played | 新增 stable | retained |
| --- | --- | --- | --- |
| 4/4 或 3/4，整轮无提前揭示、strong cue、modeled、实验麦克风推动 | 可以 | 可以 | 不可以，同 session 永远不行 |
| 少于 3/4 | 可以按真实故事进度记录 | 不可以 | 不可以 |
| 任一题提前揭示或使用 strong cue | 可以 | 整轮不可以 | 不可以 |
| 任一题 modeled | 可以，且 needsPractice=true | 整轮不可以 | 不可以 |
| 麦克风 uncertain/实验输入推动故事 | 可以按实验边界记录 | 不可以 | 不可以 |
| 调试深链、自动演示、普通重玩 | 不得伪造正式证据 | 不可以 | 不可以 |

稳定资格必须同时检查数值门槛和整轮资格字段。`responseMs` 只作观察，不参与 mastery。LS04 首次 session 只可能产生 played/stable，不可能产生 retained；opening review 的 retained 资格另按 `31` 审查。

## 八、游戏性和低幼清晰度

自动化不能替代以下人工判断：

- 第一视线是否落在中性声源、故事目标和可按键盘，而不是说明卡或长文案；
- 4-6 岁孩子忽略文字时，是否仍能理解“先听，再在钢琴上找同一个声音”；
- 每次正确是否在约 1-2 个输入内产生世界变化；变化是否足够明显但不抢下一题听觉注意力；
- 错误反馈是否像比较和再试，而不是失败、惩罚或考试；
- 重听图标是否熟悉、中性、至少 44px，并且位置不暗示 C/D；
- 候选、进度、反馈和键盘尺寸是否稳定，不因字数、动画或错误状态跳布局；
- 减色、无文字、声音关闭和减少动态状态是否诚实：声音关闭时不能假装完成听辨，只能提供受限替代或退出到安全停点。

没有教师和 3-5 名儿童观察时，本节最多判为 `browser_directional_pass / child_evidence_missing`。

家长面板另行检查：活动 LS04 和完成后的地图休息态都应显示 `C/D 小音组听后找键`，并按真实记录区分 played、stable、retained 和 needsPractice；不得继续套用 LS01-LS03 的“可见练习、不计稳定”，不得显示旧月球关卡，也不得声称绝对音感。

## 九、Chapter 3 专用媒体坐标合同

新合同至少覆盖 `garden-entry`、`LS04-reference`、`target-playing`、`awaiting-response`、`sound-paused`、`wrong-known`、`assisted-retry`、`complete` 和 `reduced-motion`。主管逐项确认：

- 使用真实 DOM 几何和候选构建哈希，不使用旧谱点、SVG 或截图假坐标；
- 记录 viewport、DPR、baseline、24px 安全边距和 alpha 阈值 `>= 8/255`；
- 保护键盘、角色气泡、中性声源、C/D 候选、重听、进度和错误反馈区；
- 六个或更多约定视口无 geometry failure、browser error 或横向溢出；
- `runtimeIntegrationAllowed=false`，且明确实体 iPad Safari missing；
- 该合同只允许媒体支线开始制作坐标锁定候选，不自动批准任何素材进入 runtime。

## 十、主管复跑最小集合

交接后先读取实现和新增专项，不直接信任支线数字。至少独立复跑：

1. 新增 LS04 独立专项；
2. 339d pending-attempt 主管探针；
3. Chapter 3、sessions、clean-state、M03/garden；
4. input reliability、audio settings、iPad a11y、motion、palette/contrast；
5. PWA、坐标合同、quick、strict bundle；
6. 1024x768、1194x834 DPR2、1366x1024 的 initial/playing/waiting/wrong/assisted/complete 原尺寸截图；
7. 运行引用、Service Worker 冷离线、控制台 warning/error 和资产哈希扫描。

## 十一、立即退回条件

出现以下任一项，不得以“总体体验不错”抵消：

- LS03 后自动开始 LS04，或页面恢复无手势创建正式 session/播放教学音；
- 旧 339d 完成存档没有迁移到 LS04 ready、迁移未落盘，或迁移过程伪造 C3-03 session/completion；
- LS04 结束后把第三章整章标为 completed，或用“第三章完成”替代“LS04 已完成并休息”；
- 作答前任何视觉、文本、DOM、ARIA、动画或键盘状态泄露 C/D；
- 序列不满足 C/D 各两次，或刷新/暂停改变题目；
- 过早输入被计分；普通 wrong、strong cue、modeled 或麦克风证据污染 stable；
- 同 session、同日期或少于 8 小时产生 retained；
- 返回地图/刷新清掉已发生错音和 repair 事实，或把普通导航当能力失败；
- modeled 后伪造剩余正确，或依靠关闭/下一关弹层继续主线；
- 触屏不能独立完成；
- 目标音未实际播放时仍接受 correct/wrong，或可通过声音关闭/音量 0 的猜键获得 completion/stable/retained；
- 接入未批准媒体候选，或新坐标合同把浏览器证据冒充实体 iPad；
- 第一、二章或 LS01-LS03 的既有学习证据回归。
- 家长面板把 LS04 写成“可见练习/不计稳定”、显示错误关卡，或不按真实 evidence 区分 played/stable/retained/needsPractice。

## 十二、最终裁决格式

主管只使用以下状态：

- `passed_browser_baseline`：P0/P1 全关，运行、截图、坐标和回归证据一致；仍保留真机、教师、儿童、来源和发布缺口。
- `partial`：实现可讨论但缺非阻断证据；不能晋升基线。
- `missing`：合同要求尚未实现或没有证据。
- `contradicted`：实现或证据与课程合同冲突。
- `rejected_as_baseline`：存在任一 P0/P1，必须发窄修工作单。

每次裁决必须记录：候选版本、改动文件、测试实际数字、截图路径、坐标合同 ID/内部哈希/文件哈希、运行资产哈希、人工审查发现，以及哪些结论仍只在浏览器成立。
