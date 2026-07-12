# Chapter 3 Listening Runtime Contract

状态：`specification_passed / overhaul-340d_ls04_browser_passed / ls05_runtime_dispatched / media_not_approved / device_and_child_evidence_missing`

负责人：课程故事、整体调度与独立审查任务锁定教学语义；原型任务负责运行实现、浏览器门禁和截图；动画/声音任务只生产可追溯候选，未经调度复核不得接入运行时。

本文件是第三章 `LS01-LS08` 的运行验收合同。它不改变 `03_CONTENT_ROADMAP.md` 的关卡顺序、`09_SCAFFOLD_AND_ASSESSMENT_RULES.md` 的掌握阈值、`14_NOTE_IDENTITY_MATRIX.md` 的音高/键位、`17_STORY_ARC_AND_LEVEL_BEATS.md` 的故事因果或 `33_GAME_TEACHING_PACING_AND_MOTIVATION_CONTRACT.md` 的游戏/教学节奏；它把这些要求收敛成原型可以直接实现和自动验证的状态机。

## 给家长看的简短说明

第三章不是让孩子从安静中猜音名，也不声称训练绝对音感。孩子先在普通界面看见 C、D、E，同时听星芽把它们说成 Do、Re、Mi，再从刚练过的两个或三个音中听一个、找同一个键，最后记住两个声音的先后。

这一章真正建立四条联系：

1. 听到的钢琴声音；
2. `Do/Re/Mi/Fa/Sol` 与 `C/D/E/F/G` 的身份；
3. 真钢琴黑键组旁的键位家；
4. 已经在前两章见过的故事记忆。

故事奖励可以在引导下获得；`stable` 只来自符合阈值的少提示听辨；`retained` 仍必须遵守 `31_SESSION_SCHEDULER_AND_RETENTION_RUNTIME_CONTRACT.md` 的跨 session、跨本地日期、至少 8 小时和 opening-review 规则。

## 一、不可改变的课程边界

- 教学音域仍是 `C4-G4`：`C4/MIDI 60`、`D4/62`、`E4/64`、`F4/65`、`G4/67`。
- `LS01-LS03` 是可见模仿与迁移，只写 `played`，不单独宣称听音稳定。
- `LS01-LS03` 固定为 `reviewableForMastery=false`：不进入通用 scheduler 的 `played but not stable`、stable 或 retained 队列。后续听辨困难可以把孩子带回这些可见模型做补教，但补教事件必须标为 remediation，而不是 opening-review。
- `LS04-LS07` 是刚练过的小集合听后找键，不是无参照的绝对音高命名。
- `LS08` 只考两个声音的顺序，使用自由速度，不引入节拍、BPM 或节奏读谱。
- 章节结尾的 `C4 -> C3` 低音回声是未计分故事事件，不能写低音键位、低音谱表或 Chapter 4 mastery。
- 触屏键盘是完整核心路线。MIDI 和麦克风只能增加输入方式，不能成为通关前提。
- 孩子端不显示正确率、倒计时、速度排名、stable、retained、考试失败或退步。
- 家长端必须按当前 Chapter 3 action 区分：LS01-LS03 是“可见提示下玩过、不计稳定”；LS04-LS08 是小集合听辨，显示真实 played/stable/retained/needsPractice 和输入/重听/混淆证据。LS04 期间及完成后的地图休息态不能继续显示“C-D-E 三片叶/不计稳定”，也不能称绝对音感。
- 颜色、角色位置、植物动作、声源位置和故事物件都不能在孩子作答前指向正确答案。

## 二、第三章进入过场与装备连续性

首次从 S01 到达花园时触发一次自动事件 `CH3_ENTRY_AIR_CHECK`：

S01 的自然停点先落在地图上的花园入口，不在上一关完成瞬间无手势地强播新章节。孩子点花园入口这一故事节点时创建正式 `C3-01` session、恢复/解锁 AudioContext，然后自动播放空气检测并进入 LS01；这不是关闭/继续/下一关弹窗。

1. 星芽仍穿 Chapter 1/2 的完整气密探索服、透明头盔、手套、靴子、生命维持背包和完整气密尾套。
2. 星星背包进行 2-4 秒空气检测；检测完成前不得让无头盔星芽站在开放太空或月面。
3. 安全信号出现后，头盔向后打开，外层压力服自动收纳；星芽保留角色本体、三颗头芽、探索背带和星星背包。
4. 过场自动结束并进入 `LS01`，不要求孩子点关闭、继续或下一关。
5. 减少动态模式显示三张以内的静态状态变化；跳过或媒体缺失时使用代码驱动的短淡入，最终装备状态必须相同。
6. 事件只在首次正式进入 Chapter 3 时完整播放。后续短课从花园休息点恢复，不反复开盔、穿脱。
7. 刷新或崩溃恢复必须幂等：不得同时出现已收纳压力服和密封头盔，也不得重复授予故事完成或学习证据。

当前 Chapter 3 运行布局尚未实现，因此任何现有 `concepts/**` 视频最多是候选。过场可以缺席而课程仍可用代码回退进入；不能为了等媒体阻塞教学实现。

## 三、短课地图与自然停点

第三章使用 7 个正式 `bundleId`，不把 8 个 level 变成连续闯关：

| Bundle | 运行内容 | 唯一新教学轴 | 可见故事结果 | 自然停点 |
| --- | --- | --- | --- | --- |
| `C3-01` | `LS01 -> LS02` | 看见并模仿 Do、Re | 第一片叶打开，第二根卷茎伸直 | 两片叶保持打开并降为休息亮度，星芽坐到种子旁 |
| `C3-02` | `LS03` | Mi 的可见模仿到第二次弱化直亮 | 第三片叶接住星光 | 三片叶组成小芽后休息 |
| `C3-03` | `LS04` | 首次隐藏的 Do/Re 小集合听辨 | 两颗种子转向各自花朵 | 两边叶子握住后停下 |
| `C3-04` | `LS05` | C/D/E 三音小集合 | 固定弧形位置的三朵花一起开放 | 三朵花保持弧线位置，仅花瓣慢慢合拢成夜间休息态 |
| `C3-05` | `LS06` | C/G 大距离对比 | 长藤跨过远石形成拱门 | 星芽在拱门下听风 |
| `C3-06` | `LS07` | E/F 相邻音与黑键组边界 | 两株缠绕花分开 | 两朵花各自站稳后停下 |
| `C3-07` | `LS08` | 两音顺序记忆 | 根须按顺序连到地下 | 播放未计分低音回声并回地图 |

孩子端地图节点使用短字母主名：`C・D 小芽`、`E 星光叶`、`C/D 找朋友`、`C/D/E 花铃`、`C/G 回声藤`、`E/F 邻居花`、`两声根须`。人类教案和星芽口语仍可说 Do/Re/Mi/Fa/Sol，但地图不再用唱名覆盖字母主线。

规则：

- `C3-02` 与 `C3-03` 必须是两个不同的首次游玩 session。不能在 Mi 可见模仿后立刻无停点进入隐藏 Do/Re。
- `C3-01` 正常情况下在一个 session 内完成 `LS01 -> LS02`。若 LS01 出现 repeated repair、strong/assisted cue、modeled success、长时间等待或明显疲劳，第一片叶就是提前安全停点：当前 session 以 `early-rest` 结束，保存 LS01 played/needsPractice 的真实状态；下一次正式开始同一 bundle 时只继续尚未完成的 LS02，不重做 LS01，也不把 LS01 当 opening review。
- 每个 bundle 最多在开头加入一个 20-40 秒旧内容回忆，沿用 `31` 的 opening-review 资格和 retained 边界。
- 到自然停点后停止自动推进，回到地图。孩子不需要理解关闭或下一关按钮。
- 正式地图路径才创建 session。`?level=LS04` 等调试深链不得创建正式 completion、stable、retained 或 opening-review 候选。
- 从只实现到 LS03 的旧浏览器版本升级时，已经真实完成三片叶的存档应幂等迁移为 `LS04 ready`，并立即持久化；迁移本身不得创建 C3-03 session、播放目标音、改写 LS01-LS03 evidence 或把 LS04 标为完成。
- `chapter3.completed` 或同义的“整章完成”字段只允许在 LS08 章节出口后写 true。LS03 可写 `visibleSliceCompleted`，LS04 可写 `lessonEvidence.LS04`/`ls04Completed`；地图可以显示当前切片已完成并休息，但不能把 LS04 当作第三章全章完成，也不能靠下一版本再把 completed 改回 false。

## 四、声音呼叫的统一状态机

每个隐藏呼叫都使用同一状态机，避免各关自行发明规则：

1. `reference`：只在该关规定的可见模型或集合参照阶段出现。
2. `ready`：中性耳朵/回声图标提示“先听”，候选植物保持相同静止状态。
3. `target-playing`：播放目标钢琴音；评分输入关闭，过早输入记为 observation，不算错。
4. `awaiting-response`：目标音结束后才接收触屏/MIDI/已校准麦克风输入；不显示倒计时。
5. `correct`：先确认孩子的输入音，再以普通界面的字母音名、星芽对话框中的唱名和键位家重新连接身份，随后触发对应故事变化；普通界面不得出现双标。
6. `wrong-known`：说出孩子按的音，播放“孩子音 -> 目标音”或经听审批准的短比较，再显示相关候选边界；不提前照亮下一题。
7. `uncertain`：只用于麦克风置信度不足、环境过吵或目标回放串音；显示“没听清”，不加 wrong。
8. `assisted-retry`：同一呼叫连续错误后提供一个明确定位和一次再试。
9. `modeled-success`：辅助再试仍失败或等待超时时，星芽与孩子共同完成当前呼叫，保留故事变化，写 `needsPractice=true`，不写 child correct/stable/retained，并在最近的故事安全点结束短课。
10. `rest`：世界结果保持可见，自动播放停止，地图恢复。

等待提示只能重放目标音、做听的手势或显示中性重听图标。任何作答前出现的目标名字、目标颜色、目标植物动作、目标方向或强亮键都算 strong cue，并阻止这一整轮 level 的 stable/retained；不能只把被提示的单个呼叫从分母里删掉后继续宣称稳定。

## 五、视觉不得泄题

隐藏听辨阶段使用一个中性声源，例如“回声种核”“露珠铃”或屏幕中央的声波点。它每次播放不同音时，位置、大小、颜色、发光、嘴型和运动必须相同。

每次作答后的音符专属动画只能短暂确认“刚才发生了什么”。进入下一次 `ready/playing/awaiting-response` 前，所有候选物件必须重新回到同态；跨呼叫保留的进度只能是中性叶片、花粉点、藤结或空根节，不能记录已经出现过哪些目标。否则孩子会根据平衡序列的剩余次数排除答案，而不是听声音。永久的种子转向、花朵开放、藤桥完成或根须连接只在整组结束或有界共同完成时发生。

具体边界：

- `LS04`：中央回声种核播放不带唱名的 C4 或 D4 钢琴音；星芽在回答前不说 Do/Re，两颗种子都不转向。
- `LS05`：中央花粉铃播放不带名字的 C4/D4/E4 钢琴音；三朵花在孩子回答前都不张合、不摇摆、不单独发光。
- `LS06`：中央回声石播放不带名字的 C4 或 G4 钢琴音；近端和远端石头在孩子回答前都不冒芽，声像保持居中，不能用左右声道或距离动画给答案。
- `LS07`：中央露珠播放不带名字的 E4 或 F4 钢琴音；两朵边界花在孩子回答前保持同样姿势。
- `LS08`：中央中性声源播放两声，星芽只做统一的“听两声”动作；嘴型、头芽、手势和根须不能随音高方向变化，根须只在孩子输入后按回答顺序发光。

可见模型与答后反馈仍要建立音名联系：

- 可见模型只用大字 `C/D/E` 和黑键组定位；星芽对话框可说 `Do/Re/Mi`，唱名不得作为模型、卡片或物件的小字副标。
- 隐藏呼叫前不得显示目标专属名字、颜色或定位。多个候选若同时出现，必须同权重、中性色、无目标差异。
- 隐藏目标也不得泄露到无障碍名称：重听按钮只说“重听这个声音”，不能在 `aria-label`、`title`、`alt`、隐藏说明或目标专属 active class 中出现 `C/Do` 等答案。正常钢琴键自身仍可分别标注 C/D/E/F/G；禁止的是把其中一个提前标成“当前目标”。
- 答对或答错后必须跨载体重新连接：普通界面的大字字母名 + 星芽对话框的唱名 + 键位家；颜色只能作为此时的次级确认，不能生成普通 `Do/C` 双标。
- 正确故事物件可以按每个音形成稳定记忆形象，但只能在回答后变化：Do 圆叶、Re 卷茎、Mi 星尖叶、Fa 边界双瓣、Sol 长藤。

## 六、每关精确呼叫与平衡序列

所谓“随机”必须是受约束的平衡序列，不能让四题全部是同一个音，也不能让孩子靠位置频率猜答案。序列由 session seed 选择，测试可复现；同一设备下一次正式 session 尽量不重复上一次完整序列。

| Level | 参照/模型 | 计分呼叫 | 平衡要求 | Played | Stable |
| --- | --- | --- | --- | --- | --- |
| `LS01` | 孩子端大字 `C` + 星芽说 Do + 两黑左；内部目标为 C4/MIDI 60 | 1 次可见回声 | 固定 C4 | 完成回声 | 不授予 |
| `LS02` | 孩子端大字 `D` + 星芽说 Re + 两黑中；内部目标为 D4/MIDI 62 | 1 次可见回声 | 固定 D4 | 完成回声 | 不授予 |
| `LS03` | 第 1 次孩子端可见大字 `E`；内部目标为 E4/MIDI 64 | 第 2 次弱化直亮的 E4 回声 | 两次都是 E4；第二次不持续亮目标键 | 两次完成 | 不授予 |
| `LS04` | 开始前可见/可听一次 C4 参照 | 4 次 C4/D4 | C、D 各 2 次；同音不得连续超过 2 次 | 完成 4 次或温和修复到休息 | 至少 3/4，目标未提前揭示 |
| `LS05` | 每组开始前一次 C4 参照 | 5 次 C4/D4/E4 | 三音都出现；两个音各出现 2 次、一个音 1 次，重复角色跨 session 轮换；同音不得连续超过 2 次 | 完成或温和修复 | 至少 4/5，C/D/E 各至少 1 次无强提示正确，最多 1 次孩子主动重听，无提前揭示 |
| `LS06` | 第一次可同时看见 C/G 两个键位家 | 4 次 C4/G4 | C、G 各 2 次；声像始终居中 | 完成或温和修复 | 至少 3/4，无方向/距离动画答案 |
| `LS07` | 第一次可同时看见 E/F 边界 | 4 次 E4/F4 | E、F 各 2 次 | 完成或温和修复 | 至少 3/4，无角色/颜色答案 |
| `LS08` | 带路练习可分开重听 | 4 组：C-D、E-D、C-C、D-E，各一次 | 四组都出现；顺序由受约束 seed 决定 | 完成或温和修复 | 至少 3/4 整组顺序正确；自由速度；无分音重听，整轮最多 1 次孩子主动整组重听 |

`LS05` 的“一次主动重听”只影响 stable，不影响故事奖励；即使总数达到 4/5，只要 C/D/E 中任一音没有至少一次无强提示正确，也只能记录 played/needsPractice，不能写 stable。`LS08` 带路练习可以分音重听；少提示检查不得分音重听，孩子主动整组重听超过一次则只记 played/needsPractice，不写 stable。等待系统自动重放、麦克风 uncertain 或无障碍重复播报不得偷偷计为孩子错误；应分开记录来源。

LS05 的 `wrongCount`、`repairStage` 和当前混淆对只属于当前呼叫。进入下一呼叫时这些临时修复字段必须清零，上一题的错误不能让下一题直接进入 assisted；整轮的错音、混淆对计数、重听和输入路线另行累计，供家长证据和后续补教使用。

LS05 因 modeled success、长等待或疲劳到达安全休息时，保留已完成的中性花粉格、原 seeded 序列、当前/剩余呼叫和真实 evidence，并结束当前 session。下一次只能由地图上的明确手势创建 `resumeOfSessionId`，继续同一故事序列中尚未完成的呼叫；不得重做已完成呼叫，也不得因 resume 改变 2/2/1 分布。跨 session 的片段可以共同完成故事，但永远不能拼接成一次 qualifying stable；stable 只能来自后来一次从头开始、同一 session 内完成的全新五呼叫正式运行。

LS04-LS07 的 `correctCount` 按每次呼叫的第一次有效孩子作答计数。第一次答错后，即使孩子在温和比较或重听后自行修对，该呼叫仍完成故事但不回填为 qualifying correct；否则反复试到正确会把 `3/4` 或 `4/5` 门槛变成虚设。修复后的正确输入、错音和提示仍完整进入 evidence，不能丢失。

## 七、错误修复和安全结束

- 第一次错误：显示孩子按出的音，再重放目标；故事物件不枯萎、不倒退。
- 第二次同一混淆：缩小集合。例如 LS05 的 Re/Mi 混淆只比较 Re/Mi，不把 Do 一起闪烁。
- 第三次进入 assisted retry：出现一个候选边界图和正确键短脉冲，标记 strong cue。
- 第四次仍错或辅助等待超时：执行 modeled success。模型输入必须进入 `modeledInputs`，不能进入 `correctCount`、`firstTry`、touch/MIDI/mic `inputRoutes`。
- 多呼叫关卡在 modeled success 后不需要伪造剩余全部正确。保留已经打开的花/藤/根，做一个“今天先照顾到这里”的故事安全停点并回地图。
- 下一 session 的 opening review 优先返回具体混淆对，而不是重新强迫完整五题。

## 八、输入路线合同

### 触屏

- 始终可用，是 Chapter 3 发布前必须完整通过的路线。
- 触屏键使用真实钢琴黑白键几何；目标仍限制为 C4-G4。
- 目标音和触屏琴键使用同一套经过听审的钢琴音色，避免用音色差而不是音高作答。
- LS08 的 `C-C` 必须收到两个离散触摸起音：第一次 pointer/touch 结束并重新按下后才能填第二个声音格。长按一个 C、滑出后仍保持 active pointer 或程序重复 keydown 都不能算第二音。

### MIDI

- Web 只在浏览器暴露 Web MIDI 时启用；iPad Web 不承诺可用。
- 只接受精确目标 MIDI 作为正确证据；八度等价音不能算本章 stable。
- LS08 同音重复要求先收到 note-off/velocity-zero，再接受下一次 note-on；持续 note-on、aftertouch 或重复设备抖动不能填两个声音格。
- 外接琴自身发声时，应用确认音不得形成明显双音/梳状失真；真机听审前状态仍为 partial。

### 麦克风/真钢琴声音

- 只能从家长设置明确开启，不在孩子首次进入 Chapter 3 时弹权限。
- MVP 本地处理，不上传录音，不保存原始家庭音频。
- 目标回放结束后才打开评分窗口，避免把设备扬声器回声当孩子输入。
- `uncertain`、噪声过高、持续时间不足或八度不明确都不算 wrong；立即保留触屏路线。
- LS08 同音重复在麦克风路线必须先经过安静重置，再检测到第二次清晰起音；一个持续 C 只能产生一个输入事件。
- 建议初始技术门槛是目标音附近约 `+/-45 cents`、连续稳定约 `180 ms`，但这只是待真机校准的实现起点，不是发布通过值。
- 在真实 iPad 扬声器、至少一台原声钢琴和安静/普通家庭噪声测试完成前，麦克风输入可以推动故事的实验性 `played`，不能单独授予 stable/retained。

## 九、音频优先级

- 教学钢琴音是最高优先级。角色语音必须在目标音前结束，目标音起音后的前 `540 ms` 不得被角色语音、环境声、奖励动机或 Foley 遮盖。
- 隐藏听辨只有在目标钢琴音实际可播放时才可打开评分窗口。声音关闭、音量为 0、AudioContext 未解锁/失败或目标播放被中断时，当前呼叫进入可恢复的 `sound-paused/replay-ready`，孩子按键只记非评分 observation，不算 correct/wrong；恢复声音后必须重播同一目标，不能靠无声猜测获得 completion/stable/retained。若已启用听力辅助、声音在有界恢复后仍不可用，或当前呼叫已经进入明确 strong-help 路线，才可提供“看着找”；正常 `target-playing/awaiting-response` 不得常驻一个随时揭示答案的按钮。本题转成可见字母与键位模型的 accessibility visual-assist 后，可以推进花园故事并记录 `accessibilityVisualAssist=true`、played/needsPractice，但不得写 listening correct、firstTry、stable 或 retained，也不得伪装成隐藏听辨通过。
- 隐藏呼叫的 C4-G4 使用同一钢琴音源、力度、包络、目标时长、混响和中央声像；校准后的短时电平建议控制在约 `+/-1.5 dB` 内，再由真机听审确认。允许真实钢琴随音高产生的自然音色差，不允许额外用响度、时长、声像或效果器编码答案。
- 目标播放期间不触发有稳定音高的植物音效。正确故事 Foley 至少等孩子输入音的主要起音清楚后再进入。
- 正确/重试提示必须是弱音高或无稳定音高；不能暗示下一题答案。
- LS06 的 C/G 声像保持中央，不使用左/右或近/远混音编码答案。
- LS08 两音间隔固定为儿童可分辨但不形成节奏考试的自由回声间隔；建议起点 `450-650 ms`，真机/儿童观察后再定。
- Gemini 视频自带音轨、未批准候选语音和 `concepts/**` 音频不得进入运行总线。

## 十、学习证据字段

每次呼叫至少记录：

```json
{
  "levelId": "LS05",
  "bundleId": "C3-04",
  "sessionId": "...",
  "callIndex": 2,
  "targetMidi": 64,
  "candidateMidis": [60, 62, 64],
  "inputMidi": 62,
  "inputRoute": "touch",
  "correct": false,
  "replayCountChild": 0,
  "replayCountSystem": 1,
  "targetRevealedBeforeResponse": false,
  "strongCueUsed": false,
  "modeled": false,
  "accessibilityVisualAssist": false,
  "microphoneConfidence": null,
  "responseMs": 0,
  "timingUsedForMastery": false
}
```

要求：

- `responseMs` 只作观察，不参与 mastery。
- `accessibilityVisualAssist=true` 表示该呼叫已退出隐藏听辨，任何随后可见模型输入都只推进故事，不进入 listening correct、firstTry、candidate coverage、stable 或 retained。
- stable 先检查数值门槛、候选覆盖，再检查整轮资格。LS05 的候选覆盖要求 C/D/E 各至少一次无强提示正确，不能用 4/5 总分掩盖对单次候选的完全失败。普通 wrong 在评分后得到中性比较反馈，不会自动否定其余符合门槛的无提示正确；但只要任一呼叫在作答前 `targetRevealedBeforeResponse=true`、使用 strong cue、进入 modeled success，或由麦克风 uncertain/实验输入推动故事，这一整轮就不能新增 stable/retained。
- 历史 stable/retained 事件不能被后来困难删除；当天困难单独写 `todayNeedsPractice`。
- 故事进度可在 played 后继续，不等待 stable 或 retained。

## 十一、短 opening review 等价规则

只有 `LS04-LS08` 这五个可形成 stable 的听辨技能进入本章 opening-review 队列。完整 level 已 stable 后，后续 session 最多加入一个 20-40 秒 opening review；只有 scheduler 选择的 opening review 才有 retained 资格。`LS01-LS03` 即使已经正式完成，也不得作为 `played but not stable` 候选反复占队列。

| 技能 | 短回忆内容 | 通过条件 |
| --- | --- | --- |
| `LS04` C/D | 3 次，C/D 都出现 | 3/3，无提前揭示、无 strong cue |
| `LS05` C/D/E | 3 次，三音各一次 | 3/3，最多 1 次主动重听 |
| `LS06` C/G | 3 次，两音都出现 | 3/3，无方向答案 |
| `LS07` E/F | 3 次，两音都出现 | 3/3，无边界答案提前揭示 |
| `LS08` 两音顺序 | 从固定四组抽 2 组 | 2/2 顺序正确，自由速度，无分音重听，最多 1 次孩子主动整组重听 |

普通重玩、同 session check、调试深链、自动演示、modeled success、SFX/过场低音和 microphone uncertain 都不能产生 retained。

## 十二、孩子端界面要求

- 第一视线是中性声源、当前故事问题和可按钢琴，不是说明卡或长段文字。
- 除星芽口语/气泡外，键盘、任务、谱垫、路线、反馈、结果、地图和花园物件只显示 C/D/E/F/G；同一屏不重复堆叠多个等价身份卡，也不显示普通 `Do/C` 双标。
- 重听使用熟悉的扬声器/重播图标，按钮至少 44px，有屏幕阅读标签；不写“听力考试”。
- 目标音播放时显示统一耳朵/声波状态，所有候选物件保持同态。
- 候选集合、当前呼叫槽和剩余故事进度尺寸稳定，不因文字或反馈跳动布局。
- 正确后自动推进下一呼叫；关末自动进入自然停点，无必须点的结果弹层。
- 减少动态模式保留钢琴键按下、静态正确/错误轮廓和答后故事状态，不保留连续粒子、摇摆或快速根须动画。
- 无文字审计时，孩子仍能从耳朵图标、中性声波、真实键盘、角色统一听姿和答后植物变化理解循环。

## 十三、必须自动验证的门禁

原型任务至少提供以下自动化证据：

1. `LS01-LS08` 触屏完整流程、正确、错误、repair、completion、rest。
2. 每个隐藏呼叫在目标播放和等待回答时，可见 DOM 与 accessibility tree 中都无目标名字、目标颜色、目标 locator、目标植物 active class 或目标专属动画；重听控件名称保持中性。
3. LS04/06/07 的 4 次序列各候选恰好出现 2 次；LS05 三音都出现且满足 2/2/1；LS04-LS07 的 qualifying correct 只取每次呼叫第一次有效作答，错后修对不回填；LS05 还要验证 4/5 但单次候选答错时不得 stable、4/5 且 C/D/E 各至少一次无强提示正确时才可 stable；LS08 四组各一次。
4. 从一个呼叫进入下一个呼叫时，候选物件恢复同态；持久进度 DOM/画面不暴露已出现目标、剩余频次或下一答案。音符专属反馈只允许出现在上一呼叫已经评分之后。
5. 目标声播放期间的过早输入不算 wrong/correct；响应窗口打开后输入才评分。
6. 主动重听、系统重放和麦克风 uncertain 分开统计；LS08 的 guided 分音重听、check 整组重听和稳定资格上限分别验证。
7. wrong-known 先识别孩子音，再重放目标和相关边界；下一题答案保持隐藏。
8. 连续 repair 最终有界 modeled success，且不污染 child correct、firstTry、inputRoutes、stable、retained。
9. C3-01 到 C3-07 的自然停点停止 autoplay；没有关闭/下一关弹层。
10. S01 完成后下一故事目的地是花园入口而不是 M01；点击入口才创建 C3-01 session 并触发自动空气检测，页面恢复不得无手势强播教学音。
11. LS01 modeled success/辅助超时在第一片叶提前休息；下一 session 只续 LS02，不重复 LS01 或把它变成 opening review。
12. C3-02 首次结束后回地图；LS04 不得在同一首次 session 自动开始。
13. 调试深链不写正式 session/completion/stable/retained，也不进入 opening-review 候选。
14. 同 session、同日期、少于 8 小时、clock rollback、普通重玩都不能授予 retained。
15. 历史 stable/retained 在后来困难后仍显示，同时家长端可显示今天需要提示。
16. MIDI 模拟精确音、错误音、错误八度；iPad Web 文案不承诺 MIDI 必可用。
17. 麦克风模拟 confirmed/uncertain/noisy/octave-ambiguous；uncertain 不算 wrong，触屏始终可接管。
18. 正式完成 `LS01-LS03` 后开始新 session，opening review 不得选择这三个 introduction-only level；由 `LS04-LS08` 失败触发的可见补教也不得写 opening-review/stable/retained。
19. 教学音从起音 `t=0` 开始的前 `540 ms` 遮盖/ducking 合同、声音关闭和音量上限继续通过；不要求在起音前提前 duck。
20. 三种 iPad 横屏浏览器模型、较小视口、无文字、减色、减少动态、声音关闭均无重叠和横向溢出。
21. 首次 Chapter 3 过场的 sealed -> scan -> open/stowed 状态正确；跳过、媒体缺失、减少动态和刷新恢复都到同一安全装备状态。
22. 运行代码对 `concepts/**`、未批准 Gemini 视频音轨和 `audio/**` 候选引用为 0，除非另一次调度明确放行。
23. LS08 的 `C-C` 在触屏、MIDI 和模拟麦克风路线均要求两个离散起音；长按或未重新武装的持续音只填第一个声音格。
24. 隐藏呼叫各目标使用同一音源/力度/包络/时长/混响和中央声像；自动检查参数一致性与电平范围，真实 iPad 扬声器仍需人工听审。
25. 旧“三片叶已完成”存档升级后只进入 LS04 ready；迁移落盘且刷新幂等，不自动创建 C3-03、播放教学音或伪造 LS04 completion/stable。
26. LS04-LS08 在声音关闭、音量 0、AudioContext 不可用或目标播放中断时不开放评分；无声按键不计对错，恢复声音后重播同一题，不能产生无声 completion/stable/retained。
27. LS04 完成只写 LS04/当前切片证据；第三章整章 completed 仍为 false，直到 LS08 章节出口。地图停点不得把“声音朋友完成”表达成“第三章完成”。
28. 家长面板在 LS04 活动和完成后的地图休息态显示 `C/D 小音组听后找键` 及真实 played/stable/retained/needsPractice；不能复用 LS01-LS03 的“可见练习/不计稳定”文案，也不能回退显示旧月球关卡。
29. LS05 每个新呼叫重置 call-local repair，modeled/疲劳休息后通过新 session 续做同一 seeded 序列的剩余呼叫；跨 session 片段只完成故事，不能合并授予 stable。
30. LS05 的听力辅助 visual-assist 可完成故事但只写 observation/played/needsPractice；可见模型、无声输入或 accessibility completion 不得进入 listening correct/stable/retained。

建议新增独立脚本而不是把所有断言塞入旧测试：

- `check:listening-ch3`
- `check:listening-reveal`
- `check:listening-inputs`
- `check:listening-audio`
- `check:chapter3-transition`

## 十四、人工和真机证据

浏览器自动化不能证明以下项目：

- iPad Safari 扬声器上 C4-G4 音色、响度和目标音可辨性；
- 原声钢琴麦克风在安静与普通家庭噪声下的准确率、延迟和误判；
- 真实 MIDI 键盘在支持设备/浏览器上的双音和延迟；
- 4-6 岁孩子是否真的看声源图标后先听、是否靠植物动作猜答案、是否理解重听；
- 教师对小集合音高匹配、E/F 难度、LS08 两音间隔和 stable 阈值的复核；
- Chapter 3 角色过场的最终动画质量和版权相似性。

至少观察 3-5 名真实儿童，分两到三次短 session，不把 LS01-LS08 一次做完。记录成人是否指出琴键、读文字、解释规则，以及孩子实际依赖声音、键位、动画还是颜色。

## 十五、放行状态

- `passed`：第三章故事、音高、短课、无泄题、输入、证据和测试规格已锁定。
- `passed_browser_visible_slice`：`overhaul-339d` 已由主管独立通过花园入口手势、确定性空气检测回退、`C3-01: LS01-LS02`、独立 `C3-02: LS03`、early-rest、地图五态和 pending-attempt 连续性；这三个 introduction-only level 仍固定 `reviewableForMastery=false`。
- `passed_browser_ls04`：`overhaul-340d` 保留并由主管复跑通过独立 `C3-03: LS04`、可见 C4 定锚、四次平衡 C/D 隐藏呼叫、无泄题、错误比较、bounded assisted/modeled、`3/4` stable、无声不评分、自然停点和九态 Chapter 3 媒体保护区合同；`chapter3.completed` 仍为 false。
- `next_runtime_milestone`：当前已派发的独立课程里程碑只实现 `C3-04: LS05` C/D/E 三音小集合，不包含 LS06+。
- `missing`：`LS06-LS08`、完整 Chapter 3 后续状态机与章节出口。
- `missing`：正式空气检测/开盔/收纳动画和批准后的运行媒体。
- `missing`：真实 iPad、MIDI、原声钢琴麦克风、教师与儿童证据。

在这些缺口补齐前，只能说“第三章课程与运行规格完成”，不能说听音教学已证明有效或成熟 App 已完成。
