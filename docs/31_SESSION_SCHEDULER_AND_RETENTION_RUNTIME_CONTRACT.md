# 短课调度、自然休息与保持性证据运行合同

状态：`specification_passed / browser_runtime_passed / physical_device_and_child_evidence_missing`

负责人：课程与调度任务锁定教学语义；原型任务负责运行实现、迁移和自动化。本文件不把浏览器实现等同于真实儿童或长期学习证据。

## 给家长看的解释

孩子不是一次连续闯完几十关。一次正常游戏只做一件主要的学习任务：先摸一摸，再学一学，试着少看一点提示，看到世界发生变化，然后角色自然坐下、休息或望向下一站。此时游戏停止自动推进，地图成为下次回来时的入口。

三个进度词必须分开：

- `played`：在故事帮助下做过；
- `stable`：这一次能在较少提示下完成；
- `retained`：隔了真正的休息时间，在另一次、另一天的短课里再次少提示完成。

当天重复成功不能写成“已经长期掌握”。隔天到了时间也不会自动获得 `retained`，孩子仍要实际完成一次符合门槛的回忆动作。

## 第一阶段范围

第一阶段只实现现有第一、二章，不提前创建第三章运行关卡：

| 短课 | 运行内容 | 自然停点 |
| --- | --- | --- |
| `C1-01` | `M01` 加一次同一 Do 的短回忆 | 第一块地板锁定，星芽站稳 |
| `C1-02` | `M02` | 三盏灯醒来后变成休息亮度 |
| `C1-03` | `M03` | 轮子唱完并滚入停放位 |
| `C1-04` | `M04-M05` | 小桥展开，倒数灯安静下来 |
| `C1-05` | `M06` | 墙升起；不据此声称 Sol 稳定 |
| `C1-06` | `M07` 引导挂星；仅在第一遍轻松完成时继续少提示记忆灯检查 | 五颗星永久挂好；可选检查让原位星灯记住顺序，不重新挂星；需要修复时直接休息 |
| `C1-07` | `M08` 引导安装；仅在第一遍轻松完成时继续少提示气密检查 | 五块屋顶闭合；可选检查点亮安全压力光；需要修复时在闭合屋顶直接休息，F/G 仍需专门教学 |
| `C1-08` | `FG01-FG02` | 两块桥前落脚垫亮起 |
| `C1-09` | `FG03` | 三颗近邻星排好 |
| `C1-10` | `FG04` | 桥前小地图展开 |
| `C2-01` | `S01-mini` | 星芽抵达小休息星；只作观察，不写完整 S01 stable/retained |
| `C2-02` | 完整 `S01` 引导版 | 星芽到达对面星球 |
| `C2-03` | `S01` 少提示版 | 已知路线完成；不论是否稳定，故事都可继续 |

这些是 `bundleId`，不是新的关卡 ID。`C1-01` 的 Do 回忆是 M01 内的短动作或同概念回忆，不得伪造一个不存在的新课程关卡。

## Session 生命周期

1. 只有孩子或家长从地图明确开始一段短课时才创建新的 `sessionId`。
2. 同一短课内的自动故事推进、关卡切换和正常重渲染都沿用同一 `sessionId`。
3. 浏览器刷新、页面恢复、短暂切到后台或崩溃后恢复，不得仅因此创建新的 `sessionId`。未到休息点时应恢复同一 active session。
4. 到达自然停点后把 session 标记为 ended，停止自动推进；再次从地图开始才是新 session。
5. 调试深链可以直接打开关卡，但不得在正式学习记录中伪造完整短课完成或 retained。
6. 每个 session 记录本地日期键 `YYYY-MM-DD` 和 UTC 时间戳。日期键必须按设备当时的本地日历生成，不能由 UTC 日期截断代替。

建议独立存储：

```json
{
  "version": 1,
  "active": {
    "sessionId": "uuid",
    "bundleId": "C1-03",
    "startedAt": "ISO-8601 UTC",
    "localDateKey": "YYYY-MM-DD",
    "reviewSkillKey": null,
    "status": "active"
  },
  "history": []
}
```

## 短课节奏和停止规则

- 一次正常短课目标为约 3-5 分钟、2-3 个很小的动作、最多一个旧内容回忆、一个看得见的故事结果和一个自然停点。
- 短课内部正确后自动推进，不要求孩子理解“关闭”“下一关”按钮。
- 到休息点后不得继续自动跳到下一 bundle，也不得用倒计时催促继续。
- 休息画面以角色动作和世界状态表达结束；地图恢复可操作，但不弹出必须关闭的成绩窗。
- 同一目标连续两次答错后进入正常修复；辅助重试仍失败时，给一个可完成的示范成功，保留世界变化，写 `needsPractice=true`，在下一个故事安全点休息。
- 不在错误画面立即结束。最后一个孩子动作应是有意义的修复成功。
- 同一 session 不重复强制完整检查。孩子主动从地图自由重玩可以记录普通练习，但不因此改变 retained 条件。
- M07/M08 等完整短路线最多在同一 session 增加一遍 reduced-cue check；第二遍必须有不同的故事目的和世界状态。出现重复错误、assisted/modeled success、长等待或明显退出信号时，结束在当前故事安全点，把完整检查交给以后，不为了取得 stable 让孩子原样重做。

辅助修复必须有界。建议状态机是“正常错误 -> 强提示 assisted retry -> 若再次错误则 modeled success”。modeled success 可以由星芽与孩子“共同完成”当前动作并触发世界变化，但不能写入 child correct、firstTry、touch/MIDI inputRoutes、stable 或 retained；它必须写 assistedSuccess/needsPractice，并在当前关卡或最近的故事安全点结束 session。若孩子在 assisted retry 时自己按对，也可亲自完成故事，但该次因已经使用 strong cue，仍不能计 stable。

## 每次开场的旧内容回忆

- 每个正常 session 最多安排一个 20-40 秒的必做回忆项。
- 优先级固定为：`needs practice`，其次 `played but not stable`，最后是最早到期且尚无 retained 证据的 stable 技能。
- 上述优先级只适用于课程合同声明 `reviewableForMastery=true` 的技能。一次 formal completion 本身不能让“只负责引入、永不授予 stable”的 level 进入 opening-review 队列。
- 当前明确排除 `M01` 以及第三章 `LS01-LS03`。这些引入课可以写 `played` 和观察字段；出现困难时可由后续关卡触发可见补教，但该补教不是 retained opening review，也不能因为反复完成而伪造 stable。
- 回忆只使用孩子已经见过的音、键位、听辨集合或谱位，不得借“复习”引入新概念。
- 同一技能本次需要强提示或修复后仍可获得故事奖励，但不能获得 retained。
- 其余待复习项只显示在家长队列，不把孩子端变成练习清单。

## 学习证据兼容规则

现有 `starDinoLearningStats` v2 的 `levels`、`notes`、`staff`、`completions`、`stableCompletions` 和最近一次记录必须原样保留。实现可以升级为 v3，但不得迁移、重命名、清零或用 retained 覆盖旧 stable。

建议在 v3 新增事件型证据：

```json
{
  "retention": {
    "stableEvents": [],
    "retainedEvents": [],
    "lastWallClockAt": "ISO-8601 UTC"
  }
}
```

每个 qualifying stable event 至少记录：

- `eventId`
- `skillKey`
- `levelId` 或 `staffCourseId`
- `sessionId`
- `completedAt`
- `localDateKey`
- `runMode`
- `wrongCount`
- `cueStrength` 和 `strongCueFrames`
- `inputRoutes` 与 `experimentalInput`
- `thresholdVersion`

第一、二章可先使用稳定的技能键，例如 `level:M03`、`level:M07`、`level:M08`、`level:FG03`、`staff:S01`。`S01-mini` 只能使用观察事件，不能写入 `staff:S01` 的 stable 或 retained。

M03 的内部无错计数不能提前变成 stable event。首次完整 `Re -> Do` 无错运行仍是 `played`；第二次完整运行也满足无提前揭示、无 strong cue 的条件后，才新增 M03 qualifying stable event。之后若要获得 retained，仍须再满足不同 session、不同本地日期、至少 8 小时和再次达标，不能把第二次 M03 运行同时记成 stable 与 retained。

## Retained 判定

一次回忆只有同时满足以下条件才可新增 retained event：

1. 已存在符合该技能家庭门槛的 stable event；
2. 当前动作是调度器放在 session 开头的唯一 `opening-review`，并且它的 `reviewSkillKey` 与当前技能一致；
3. 当前 `sessionId` 与 stable event 不同；
4. 当前 `localDateKey` 与 stable event 不同；
5. 当前完成时间距离 stable event 至少 `8 * 60 * 60 * 1000` 毫秒；
6. 当前回忆再次满足 `docs/09` 对应技能家庭的 reduced-cue 门槛；
7. 成功完成前没有出现 strong target glow，且强提示帧数为 0；
8. 时间戳、本地日期和输入证据有效，且 `completedAt` 不早于当前 session 的 `startedAt`；
9. 对不允许实验输入作为掌握证据的技能，`experimentalInput` 必须为 false。

普通 formal guided/check 可以新增 qualifying stable event，但没有 `opening-review` 身份时不能新增 retained event。孩子从地图自愿重玩旧 bundle、同一 bundle 内先看完整示范再少提示检查、调试深链和家长单关控制都不具备 retained 资格。opening review 必须发生在本次新教学动作之前；不能先给同一技能 strong cue，再依靠后面的 check 获得 retained。

若有多个历史 stable event，使用“当前 session 之前、已经满足日期和 8 小时条件的最新一条”作为 retained anchor；同日普通练习不得删除更早的合格 anchor，也不得把 eligibility 时间无限向后重置。

以下情况一律不能创建 retained：

- 同一 session；
- 不同 session 但同一本地日期；
- 不同日期但不足 8 小时；
- ordinary guided/check、自愿 bundle replay 或非 opening-review 动作；
- 同一 session 先示范/强提示同一技能，再完成后续 check；
- 仅仅时间到了，孩子没有完成回忆；
- 回忆过程中先出现强亮答案再完成；
- 设备时间早于 stable 时间、早于当前 session 的 `startedAt`，或早于已记录的 `lastWallClockAt`；
- 时间字段缺失、无法解析或顺序矛盾；
- `S01-mini`、故事过场、自动演示或 final low-C 故事音。

失败的 later review 不删除旧 stable 或历史 retained。它只更新本次表现与 `needsPractice`，家长端可以同时显示“曾在隔日少提示完成”和“今天需要提示”。

同样，普通 guided replay 不能因为本次 runMode、cueStrength 或 lastStrongCueFrames 覆盖了“最后一次”字段，就让历史 stable 在家长端消失。历史证据由 qualifying stable/retained 事件或兼容迁移后的累计合格记录决定；最近一次表现单独表达 `todayNeedsPractice`、`lastAttempt` 或同义字段。`needsPractice` 只在必做回忆未达标、连续修复或 assisted success 等真实情形下更新，不能仅因孩子自愿重玩引导版而自动变成 true。

## 文案边界

孩子端不显示 `stable`、`retained`、倒计时、速度排名、考试失败或退步。

家长端建议：

| 证据 | 可用文案 | 禁止文案 |
| --- | --- | --- |
| played | `在故事帮助下玩过` | `已经掌握` |
| stable | `本次减提示完成` | `已经长期掌握` |
| retained | `隔日再次减提示完成` | `永久记住`、`绝对掌握` |
| later review failed | `今天需要提示，下次再找一次` | `退步`、`考试失败` |

响应时间、首答速度和停顿时长只作观察字段，`timingUsedForMastery` 必须保持 false，除非未来某个明确节奏/同步课程另有经过审查的门槛。

## 必须自动验证的边界

1. 刷新 active session 后 `sessionId` 不变。
2. 到自然停点后 autoplay 停止，地图可用，无必须关闭/下一关弹层。
3. 从地图开始下一短课时才创建新 `sessionId`。
4. 一个 session 最多一个必做 review item。
5. 同 session 的成功回忆不授予 retained。
6. 不同 session、相隔 9 小时但同一日期不授予 retained。
7. 不同日期、相隔 7 小时 59 分不授予 retained。
8. 不同日期、相隔至少 8 小时且门槛通过才授予 retained。
9. 已到期但有 strong cue、超出错误门槛或未完成时不授予 retained。
10. 时钟回拨或时间字段损坏时不授予 retained。
11. later review 失败不清除旧 stable/retained 历史。
12. v2 学习记录升级后原字段和数值保持一致。
13. `S01-mini` 完成不写完整 S01 stable/retained。
14. 连续修复失败后以 assisted success 到达安全停点，故事变化保留并写 needs practice。
15. 家长端同时区分 played、stable、retained 和今天需要提示；孩子端不出现这些评估词。
16. 已有到期 M07 anchor，但新 session 先做 M07 guided 再做 check，不授予 retained。
17. 已有到期 anchor，但孩子自愿重玩旧 bundle，不授予 retained；显式 opening review 达标才授予。
18. 完成时间早于当前 session 的 startedAt 时，不授予 stable/retained 事件并记录时钟无效。
19. M07 已 stable 后普通 guided replay，历史 stable 仍显示；本次运行单独记录。
20. M07 已 retained 后 later review 失败，retained 历史仍显示，同时家长端可显示今天需要提示。
21. 只有 v2 `stableCompletions` 的旧数据升级后仍保留历史 stable；迁移不得凭累计数字伪造 retained。
22. 纯 v2 的历史 stable 虽然没有 v3 stable event，仍会进入“尚无 retained”的 opening-review 队列。
23. 该迁移技能第一次 opening review 达标时只建立新的可追溯 stable event，retained 仍为 0。
24. 只有再经过另一次、另一天、至少 8 小时且再次达标的 opening review，迁移技能才新增 retained event。
25. 普通 level 同一步在 assisted retry 后再次答错，会在有限时间内 modeled success 并到安全地图；needs practice 为 true，stable/retained 不增加。
26. S01 同一步在 assisted retry 后再次答错，同样温和结束，不让星芽跳到错误谱位，也不无限等待。
27. modeled success 不进入 child correct、firstTry 或 touch/MIDI inputRoutes。
28. 孩子在 assisted retry 自己按对可以完成故事，但 strong cue/assisted 状态阻止 stable 与 retained。
29. `LS01-LS03` 即使已有 formal completion，也不进入 `played but not stable` opening-review 队列，不创建 stable/retained。
30. `LS04-LS08` 的困难可以路由回 `LS01-LS03` 做可见补教，但该补教使用 remediation 身份，不占用或冒充 opening-review。

## 放行状态

- `passed`：本文件的教学语义、时间条件、数据兼容和验收边界已锁定。
- `passed`：`overhaul-338a` 已在浏览器实现第一、二章 bundle、自然休息、active session 跨刷新恢复、v2 到 v3 兼容、独立 stable/retained/observation 事件、时钟异常阻断和家长四类证据；主管独立复跑 `check:sessions` 为 `72/72`，`check:clean-state` 为 `124/124`，quick/strict bundle 通过。
- `partial`：上述结论是自动化浏览器运行证据。它不证明系统时区切换、iPad Safari 后台恢复、真实触控节奏或长期学习保持。
- `passed_browser`：`338a` 保留了 M08“安装五片真实屋顶 -> 检查同一屋顶气密点 -> 吃力时在屋顶闭合后推迟检查”，并通过 `97/97` 专项、跨 session 和自然休息回归；这不等于儿童理解或实体 iPad 通过。
- `passed_browser`：M03 第一次正式无错 `D4 -> C4` 仍只写 played，第二次 qualifying completion 才可写 stable，同 session retained 仍为 0；主管复跑 session 矩阵 `72/72` 和 M03/garden 专项 `32/32`。
- `passed_browser`：正式 `C2-03` clean、assisted、modeled 三条实际运行路线都会结束 session 并持久落到花园入口；assisted/modeled 保持 stable/retained 为 0 和 `needsPractice=true`，刷新/根地址恢复不创建新 session。
- `missing`：真实 iPad 上的后台恢复、系统时间/时区变化行为。
- `missing`：教师复核和 3-5 名 4-6 岁儿童对短课长度、自然停点与隔日回忆的观察。

`docs/32` 要求的 S01 后花园入口已在 `338a` 作为非交互休息地点通过；它尚未点击创建 `C3-01`，也没有触发空气检测、LS01 或任何 Chapter 3 学习证据。下一里程碑只能实现该入口手势和 `LS01-LS03` 可见模仿切片，不能把入口通过误写成第三章听辨已经实现。

在真实设备和儿童缺口补齐前，只能说“短课与 retained 规格和浏览器运行实现通过”，不能说保持性学习效果或成熟 App 已通过。
