# Chapter 5 Coordination Runtime Contract

状态：`specification_passed / runtime_missing / device_teacher_child_evidence_missing`

负责人：课程故事、整体调度与独立审查任务锁定教学语义；原型任务负责运行、输入、动画、浏览器门禁和证据；媒体任务只提供可追溯候选，不能自行决定路线奖励、掌握或运行集成。

本文件把第五章 `TH01-TH08` 收敛成可执行合同。它不改变 `03_CONTENT_ROADMAP.md` 的路线、`09_SCAFFOLD_AND_ASSESSMENT_RULES.md` 的阈值、`17_STORY_ARC_AND_LEVEL_BEATS.md` 的故事因果、`24_HUMAN_STORY_AND_LESSON_BOOK.md` 的两小节原曲或 `33_GAME_TEACHING_PACING_AND_MOTIVATION_CONTRACT.md` 的短课预算和同等奖励原则。

## 给家长看的简短说明

第五章先让咚咚和星芽一个说、一个答，再轮流修桥。孩子不需要会同时弹，也能用接力方式完成同一座大家园。准备好的孩子可以尝试一起落地和两小节双层演奏，但这只是额外体验，不是更高级路线，也不会获得更好的结局。

系统能验证音高、顺序和时间差，不能仅凭音高判断孩子真实用了哪只手。家长端必须区分“提示过左/右手”“接力顺序稳定”“尝试双音”和“成人实际观察到的手部使用”。

## 一、不可改变的课程边界

- Story mode 在 `C4-09/LP10` 达到 played 或 bounded assisted 的信号结尾后解锁；低音谱位 stable 不是见到星芽或进入结局的门槛。
- 核心 4-6 岁路线固定为 `TH01 -> TH02 -> TH03 -> TH04 -> TH05 resumable -> TH08 relay`。
- 可选能力路线固定为 `TH05 -> TH06 -> TH07 bar 1 -> TH07 bar 2 -> TH08 together`。
- TH06/TH07 困难、设备不支持多点/MIDI、疲劳或孩子不愿尝试时，自动回到已学接力路线，不出现失败、降级、简单/困难或较差奖励。
- 两条路线的永久桥、花园、角色会合、收藏状态和结局完全相同；可选路线只能增加瞬时双层声画体验和独立成人证据。
- 连续键盘保持 `C3-B4` 一条真实两八度布局，不拆行、不分页、不滚动。
- 核心路线只要求顺序单音；同时音只在 TH06/TH07/TH08 together 出现，且不包含一只手内和弦。
- 新协调轴出现时不再引入新旋律、新音名、新谱位、附点/切分、踏板或长曲。
- 孩子端使用角色和手图标，不显示指法串、BPM、毫秒、准确率、左右手失败或技术等级。
- 普通孩子界面的任务、地图、角色轨道、谱位、琴键、反馈、特效和结果只显示字母音名；跨音区用 `低音 C`、`中央 C`、上下位置或黑键组定位。只有恐龙对话框可说 `Do/Re/Mi/Fa/Sol`，家长/教师证据使用 `C3/C4/...`。
- `played` 可以继续故事；stable 只影响家长证据和支架；retained 遵守 `docs/31`。

## 二、故事空间与安全连续性

第五章发生在可呼吸花园中继台和地下生态层的本地控制区，远端月亮前哨通过地图信号与自动桥模块响应。星芽不无头盔返回真空月面；咚咚和星芽都留在生态星球的安全区域。

永久桥的生态侧由咚咚的低音地基托住，远端月亮侧由星芽从花园中继台发出的高音信号唤醒自动模块；地图表现桥从两个星球端点逐段闭合，最终连接两个安全住处。两位角色操作本地的低音地基站和高音中继站，不站在开放太空桥中央。TH04 的大谱表是两张音乐地图会合，不是把角色放进抽象练习卡。

角色职责：

- 咚咚承担低音支撑、生态侧地基轮次、稳定落点和慢动作邀请；慢不等于笨。
- 星芽承担中音短句、花园中继轮次、远端月亮模块回应和听/指方向；不能同时作为答案卡、分数牌和长篇老师。
- 当前时刻只突出一位角色、一个手/轮次和一个音乐问题。

## 三、正式短课、持久阶段与自然停点

| Bundle/阶段 | 运行内容 | 有意义输入预算 | 永久结果 | 自然停点/恢复 |
| --- | --- | --- | --- | --- |
| `C5-01` | `TH01 -> TH02` | TH01 2 个同名 C 轮次；TH02 最多 4 个 G/G、C/C 迁移输入 | 两端灯第一次互相回答，桥材料出现 | TH01 吃力时停在第一束光；下次只续 TH02 |
| `C5-02` | `TH03` | 6 个 L-R 轮次 | 桥从两端长出六段 | 任一修复后保留已长桥段，不清空重来 |
| `C5-03` | `TH04` | 2 个谱位/键位动作 | 大谱表括号合拢，中央 C 会合灯永久亮起 | 不紧接新旋律，角色在会合灯旁休息 |
| `C5-04A` | `TH05 supports` | 2 个低音 C3、G3 支撑 | 两块桥墩永久落下 | 保存 supportsComplete=2 |
| `C5-04B` | `TH05 high bars` | 每个四音灯组 4 个输入；bar 1 后必须可休息 | 两组四颗星灯逐组永久保存 | 保存 highBarsComplete=0/1/2，下次不重弹已完成 bar |
| `C5-04C` | `TH05 relay` | 10 个事件窗：低音锚 + 四音，重复两 bar | 主桥完成，核心结局路线可用 | 不自动开始 TH08；角色在桥口休息 |
| `C5-05` | `TH08 relay finale` | 已知两 bar 的 10 个顺序事件窗 | 两个家、桥和花园形成最终永久世界 | 花园开放后停留看成果，不弹下一关 |
| `C5-X1` | optional `TH06` | 3 个配对尝试 | 同一练习拱门通过 paired 或 sequential fallback 点亮 | 无独占物件；结束后可回 relay 或继续 optional |
| `C5-X2A` | optional `TH07 bar 1` | 1 个 bar：C3+C4 起点 + D4-E4-D4 | 第一条临时双层排练光 | 只练一个 bar，保存 optionalBar1Played |
| `C5-X2B` | optional `TH07 bar 2` | 1 个 bar：G3+E4 起点 + D4-C4-C4 | 第二条临时双层排练光 | 保存 optionalBar2Played，不自动完整演出 |
| `C5-X2C` | `TH08 together finale` | 已知两 bar；只在两个 bar 起点形成 pair window | 与 relay 完全相同的永久花园，附加本次双层声音 | 结局状态与 relay 同一 canonical id |

`C5-04A/B/C` 是同一 `C5-04` 的可恢复阶段，不是新课程 level。刷新、退出或疲劳后保存 supportsComplete、highBarsComplete、relayBarsComplete 和 permanentBridgeSegments；不得要求重做已完成阶段。

`C5-X2A/B/C` 也是 optional `C5-X2` 内部阶段标签，不是新的公开 bundle 或 level id；孩子端只看到一条连续的练习邀请和自然休息点。

通用分流：

- repeated repair、strong/assisted、modeled success、长等待、乱按失焦或疲劳后，在最近永久阶段休息。
- 核心路线始终有 guided/assisted fallback；optional 路线不得因能力困难修改孩子价值、角色认可或结局。
- 自动路线选择依据 input capability、已完成 separate parts、孩子当前尝试和疲劳信号；孩子不手动选择 easy/hard。

## 四、唯一两小节原曲

所有文件和运行实现使用同一首原创两小节，不得临时更换旋律：

| 声部 | 第 1 小节 | 第 2 小节 | 角色工作 |
| --- | --- | --- | --- |
| 星芽/中音 | `C4 q, D4 q, E4 q, D4 q` | `E4 q, D4 q, C4 q, C4 q` | 每拍点亮一颗星 |
| 咚咚/低音 | `C3 w` | `G3 w` | 每小节第一拍放一个支撑 |

- 拍号 `4/4`；引导目标 52 BPM，允许 48-56 BPM 作为制作范围。
- 探索、分声部和核心接力不因速度失败。慢脉冲只帮助轮次和分组，不是排名。
- TH05 relay：咚咚先弹低音锚，星芽按自由但清楚的四音顺序回答；第二小节重复。
- TH07/TH08 together：只有两个小节第一拍要求尝试配对；其余中音顺序单独接收。
- 低音提前松开只写 lowReleaseObservation，不失败、不要求踏板、不声称延音掌握。

## 五、轮次和配对状态机

### 核心接力

1. `role-ready`：只显示当前角色和手图标。
2. `pulse-ready`：慢脉冲到达，但没有倒计时失败。
3. `awaiting-note`：接收当前 register 的目标音。
4. `correct-turn`：当前桥段/灯立即变化，切换下一角色。
5. `wrong-note`：说出孩子音，保留轮次，给当前键位修复。
6. `wrong-turn`：正确音但来自非当前角色 register 时，说明“音名对，先轮到谁”，不扣分。
7. `assisted/modeled`：共同完成当前轮次，保留故事，阻止本次 stable。
8. `permanent-rest`：保存桥段并停止 autoplay。

核心 stable 观察音序和轮次，不要求精确 BPM。一个 missed switch 可温和修复；strong cue、modeled success 或持续目标键光阻止 stable。

### 可选 paired window

- 每个 pair 有 low/high 两个 register-qualified target；顺序不重要，必须是两个离散起音。
- 第一音到达后打开 pair window；第二音在 `<=600 ms` 内可触发友好一起落地动画。
- 成人 emerging paired timing 证据使用更严格的 `<=350 ms`，TH06 至少 2/3 pair 达标。
- `351-600 ms` 只触发友好故事效果，不写 stable paired timing。
- `>600 ms`、只有一个音、设备不支持或孩子改为顺序弹，都走 sequential fallback；同一拱门仍点亮。
- microphone route 不产生 pair evidence；程序自动音、长按重复、MIDI 抖动和未重新武装输入不能补第二音。

## 六、TH01-TH08 精确职责

### TH01-TH02 同名呼应

- TH01 新轴是角色/手轮次；C3/C4 同名关系已经在 Chapter 4 教过，不作为新知识考试。
- TH01 先低 C3、后中 C4；TH02 迁移到 G3/G4，再以 C3/C4 收束。
- 同时只显示当前角色和手提示；检查前响应键不持续强亮。
- TH01 repeated repair/assisted 后在第一束光休息，TH02 延期。

### TH03 交替修桥

- 固定路线 `L:C3 -> R:C4 -> L:D3 -> R:D4 -> L:E3 -> R:E4`。
- 音名正确但轮次错误与 wrong note 分开记录。
- free-time 摸索后可用慢脉冲引导；不因早/晚于节拍让桥倒退。

### TH04 大谱表会合

- 只解决 C3 bass second space 与 C4 treble ledger line 的地图关系。
- 暂停轮次节拍、长旋律和 simultaneous，避免同时增加多个轴。
- C3/C4 都必须使用正确 register；会合灯只出现一次。

### TH05 多阶段建主桥

- supports 阶段只弹 C3/G3，不马上要求保持四拍。
- high bars 阶段每次最多一个四音组为基本单元；bar 1 完成后必须有可休息状态。
- relay 阶段只组合已完成内容；十个事件窗是单 session 上限，不再加 check 或奖励题。
- 每个阶段的桥墩、星灯和桥段永久保存，下一阶段不播放“重新安装”动画。

### TH06-TH08 路线公平

- TH06 paired 与 sequential fallback 使用同一练习拱门和永久状态。
- TH07 每个 session 只练一个已知 bar；不先完整重练两个声部再合奏。
- TH08 使用最近成功路线自动进入 finale；若 optional 尝试困难，直接用已学 relay，不要求重新通过 TH05。
- relay/together 共用 `sharedGardenOpened`、`finalBridgeBuilt` 和结局收藏 id；另存 routeUsed、pairedTiming、togetherAttempted 作为成人证据。
- finale 的远端月亮前哨在地图上亮起，星芽和咚咚在可呼吸花园中继台会合庆祝；任何路线都不得让无头盔角色跑到开放太空桥中央。

## 七、played、stable、retained 与手部证据

| 技能 | Played | Stable/观察 | 禁止结论 |
| --- | --- | --- | --- |
| 同名跨音区轮次 | TH01/TH02 guided 完成 | reduced-cue 顺序正确、正确 register、无 strong cue | 音高自动证明哪只手 |
| 左右接力 | TH03/TH05 relay 完成 | 慢速路线最多 1 次 missed switch，音序正确，无持续强亮 | 精确 BPM 或速度排名 |
| 大谱表会合 | TH04 guided 完成 | later reduced-cue C3/C4 谱位与 register 正确 | 一次会合等于 grand-staff 全部掌握 |
| paired timing | TH06 至少尝试一组 | 2/3 pair 在 <=350ms；只称 emerging paired timing | <=600ms 动画、麦克风或音高被称为双手技术 |
| 两小节 together | 分 bar 尝试后完成 route | 音序正确、两个 bar-start pair <=350ms；low sustain 另记 | relay completion 被称为双手合奏稳定 |
| final story | 任一路线打开花园 | 不新增 mastery；只是表演/回报 | together 路线获得更高价值结局 |

手部字段必须分开：

```text
handPrompted
rolePrompted
registerTarget
noteAccuracy
switchTiming
pairedTiming
inputRoute
adultConfirmedHandUse
lowReleaseObservation
routeUsed
```

只有成人/教师明确观察才可写 actualHand 或 handTechniqueObservation。触屏和 MIDI 不能从 pitch 自动推断。

retained 只来自 scheduler 选择的 later opening review；TH08 finale、普通重玩、optional 尝试和同 session check 不授予 retained。

## 八、输入路线

### 触屏

- 核心 relay 必须完整可玩；optional paired 依赖可靠多点时才出现。
- 两个同时目标使用真实键位，不扩大或移动键来降低难度。
- pointer/touch 必须离散去抖；一个长按不能生成多音或第二 pair 音。

### MIDI

- 精确 MIDI、note-on/off、velocity-zero 和设备抖动去重。
- 支持 paired timing，但不能证明手 identity。
- 外接琴自身发声与应用音频双响需真机听审。

### 麦克风/真钢琴

- 只支持 sequential core played；不支持 paired/together 证据。
- 不上传、不保存原始家庭录音；uncertain/noisy 不算 wrong。
- 麦克风路线遇到 TH06/TH07 自动使用 sequential fallback，仍得到同一故事结果。

## 九、音频、节拍和反馈

- 教学钢琴音最高优先级；角色语音在目标起音前结束，前 540ms 不被环境、Foley 或奖励动机遮盖。
- 慢脉冲可以是无稳定音高的轻触感/视觉脉冲，不与 C-G 音高混淆。
- metronome/pulse 音量低于钢琴，声音关闭后仍有清晰角色轮次和视觉拍点。
- correct-turn 只短确认当前角色；wrong-turn 不播放羞辱音或大红失败层。
- paired success 可增加短暂双层光/无稳定音高 Foley；不能产生更响、更长、更稀有的完成动机。
- relay 和 together finale 使用同长度、同角色认可、同永久场景的完成反馈；together 只允许实时音乐层不同。
- 减少动态模式保留键压、当前角色轮廓、桥段静态落位和最终花园；去除连续粒子、快速镜头和持续跳动。

## 十、孩子端界面要求

- 一屏只有一个当前角色/手、一个当前音乐工作、一个故事道具和连续键盘。
- TH01/TH02 的公开任务名固定为 `两个 C 说你好`、`G 回声接力`；普通轨道与桥灯使用 `低音 C/G`、`中央 C/G`，不得显示普通 `两个 Do`、`Sol 回声接力` 或字母/唱名双标。
- 两条角色轨道只能在 TH03/TH05 relay/optional together 中出现；非当前轨道退为背景，不同时显示两套答案。
- TH04 大谱表和双八度键盘不能互相遮挡；当前谱位、C3/C4 和会合灯尺寸稳定。
- TH05 的阶段地图由桥墩、两组四灯和主桥表示，不用文字任务清单或卡片套卡片。
- optional 邀请使用角色动作和练习拱门，不显示 easy/hard、奖励稀有度或“高级挑战”。
- 完成后无必须关闭/下一关按钮，花园保持可看并允许停止。
- 无文字模式仍可从角色轮次、手图标、桥段移动和键盘理解当前动作。

## 十一、必须自动验证的门禁

1. Story mode 只有真实 LP10 played/bounded-assisted 信号结尾才出现 Chapter 5；direct/debug 不伪造前章证据。
2. 未稳定低音技能只增加支架，不阻止 TH01 或 core relay。
3. C3-B4 连续键盘在三种 iPad 横屏与较小视口不拆行、不分页、不横向滚动，黑键真实。
4. TH01 repeated repair/assisted 后在第一束光休息；下一 session 只续 TH02。
5. TH01/TH02 同时只显示当前角色、hand/role prompt 和当前 register；未来响应键不强亮。
6. TH03 固定六轮次，wrong-note 与 wrong-turn 分开，桥段不倒退。
7. TH04 只显示 C3/C4 会合任务，不混入脉冲旋律或 simultaneous。
8. TH05 supports/highBars/relay 三阶段持久化；bar 1 后可休息；恢复不重做完成阶段。
9. TH05 relay 单 session 最多 10 个事件窗，不附加同 session check。
10. TH06 paired 和 sequential fallback 留下相同 practiceArchLit/permanent asset 状态。
11. TH06 <=600ms 只触发友好动画；2/3 <=350ms 才写 emerging paired timing。
12. TH06 只有一个音、>600ms、设备不支持、microphone 或疲劳均自动回 sequential，不失败。
13. TH07 每 session 只练一个 bar；bar1/bar2 状态分别恢复。
14. TH08 relay/together 使用同一 `sharedGardenOpened`、`finalBridgeBuilt` 和收藏 id。
15. together route 无独占物件、徽章、台词、结局、稀有度或更高奖励音。
16. routeUsed、pairedTiming、togetherAttempted 与故事完成分开记录。
17. pitch/input 不能自动写 actual hand；adultConfirmedHandUse 独立。
18. low whole-note early release 只写 observation，不失败、不要求 pedal。
19. repeated repair/strong/assisted/modeled/长等待/疲劳在最近永久阶段休息，已建桥不清空。
20. modeled success 不污染 child correct、firstTry、inputRoutes、stable、retained。
21. retained 不可由 same session、普通重玩、TH08 finale 或 optional route 产生。
22. touch/MIDI 两个离散起音和去抖正确；microphone 不能产生 pair evidence。
23. 52 BPM/48-56 只作引导；孩子端无 BPM/毫秒/速度分，核心故事不因 tempo 失败。
24. TH01-TH08 普通孩子表面、可见属性和非角色 ARIA 只使用字母音名；唱名只出现在恐龙对话，未来轮次和隐藏目标不通过身份字段泄题。
24. 教学音起音后 540ms 优先、pulse/SFX 音量、声音关闭和减少动态通过。
25. 三种 iPad 横屏、较小视口、无文字、减色、减少动态、声音关闭无重叠和溢出。
26. 运行引用对未批准 `concepts/**`、`audio/**` 和视频音轨为 0。
27. 家长端区分 played、左右接力稳定、双手合奏练习中、paired timing、成人确认手部和今天需要提示。
28. finale 自动到自然停点，无必须关闭/下一关/路线选择弹层。
29. Chapter 5 两位角色始终位于生态星球安全控制区；月亮前哨只作远端自动端点；finale 在花园中继台庆祝，不出现无头盔开放太空角色。

建议独立脚本：

- `check:coordination-ch5`
- `check:chapter5-sessions`
- `check:chapter5-paired-input`
- `check:chapter5-route-equity`
- `check:chapter5-audio`

## 十二、人工和真机证据

自动化不能证明：

- 真实 iPad 多点同时按键是否可靠、误触和延迟是否适合儿童；
- MIDI 键盘 paired timing 与应用/琴自身双响是否舒适；
- 4-6 岁孩子是否理解“轮到谁”，是否会被两条角色轨道分散；
- 孩子能否在 TH05 每个自然停点感到完成，而不是觉得任务被切断；
- optional 邀请是否真的不让孩子感到自己走了较差路线；
- 幼儿钢琴教师是否认可 52 BPM、350/600ms 窗口、两小节负荷和低音提前松开处理；
- 成人是否观察到真实左右手使用、身体姿势和不适。

至少进行：核心 relay 路线 3-5 名儿童观察；optional paired/together 只对愿意且设备支持的孩子方向性观察；两条路线分别核对结局和角色认可是否等价。

## 十三、放行状态

- `passed`：本文件的 Chapter 5 session、旋律、轮次、输入、证据、同等奖励和测试规格已锁定。
- `missing`：TH01-TH08 运行、路线状态机、双八度界面、浏览器截图和自动化。
- `missing`：真实 iPad 多点、MIDI、教师与儿童证据。

当前只能说“第五章运行规格完成”，不能说双手教学、接力玩法、可选合奏或最终 App 已实现和验证。
