# Chapter 4 C4-R01 Opening Review 调度主管工作单

状态：`C4_R01A_core_passed_at_af9aa28 / C4_R01B_real_LP04_lifecycle_supervisor_accepted / exact_anchor_fail_closed / two_gate_contract_complete / LP05_not_auto_unlocked`

本文件解决一个独立问题：第四章当前可以诚实记录 `LP01/LP02 needsPractice`，并为 LP01 保留 `openingReviewQueue` 标记，但 LP02 还只有证据、没有正式队列项，通用调度器也不能消费这些第四章技能。C4-R01 必须从已有真实证据幂等地建立 LP02 队列项，不能假设它已经存在，也不能回填或改写旧 session。该缺口若不补，家长会看到“以后再复习”，孩子却永远收不到真正的复习短课。

`C4-01 / LP01-LP02`、全课程音频前置和 `C4-02 / LP03` 均已通过主管独立浏览器审查；`C4-R01A` 调度核心又在 `overhaul-347a-c4-r01a` / `af9aa2831bb90c94fd10fdfbe3ca89ba4d03021a` 独立通过并提交。A 阶段没有创建正式 C4-03 或 LP04 action。后续未提交候选已把 `C4-R01B` 接入真实 LP04 actions，并由主管以 lifecycle `31/31`、foundation `20/20` 和 retained-anchor 对抗探针 `9/9` 接受。该结果不得回改已冻结的 C4-01/LP03/R01A，也不自动解锁完整咚咚、低音谱表、左手、LP05+ 或媒体候选。

拆分的原因不是缩小验收，而是消除循环依赖：LP04 尚未实现时，运行侧还没有合法的 `C4-03` lesson actions，因而不可能诚实证明“review 顺利后在同一 session 继续 LP04”。`C4-R01A` 只冻结队列迁移、候选选择、冷却、review 状态机、持久化和可组合 plan 接口；正式地图不得创建空的 `C4-03` session，也不得用测试占位 action 冒充新课。`C4-R01B` 必须在 LP04 候选中把该接口接到真实 `C4-03` actions，并完成本文件规定的同 session、困难收短和未呈现边界。两道门禁都通过后，C4-R01 才算完整运行通过。

## 一、教学边界

第四章至少有三类不同证据，不能混成一个“低音会了”：

1. `LP01`：听出同名 C 的高低音区，回答载体是两个固定声音泡泡。
2. `LP02`：在连续双八度键盘上找到精确低音 `C3`。
3. `LP03-LP07`：逐步建立低音 `C3-G3` 键位邻域；LP03 的 C-D-E 接缝只是阶段观察，不能单独写整体 stable。

复习只能重取已经教过的同一技能，不能借 opening review 引入 D/E/F/G、低音谱表或左手。

## 二、调度优先级

每个正式 session 最多一个必做 opening review。第四章候选和既有全局候选按以下顺序竞争：

1. `needsPractice=true` 且课程允许复习的技能；
2. `played=true / stable=false`；
3. 已有 stable、满足不同 session、不同本地日期和至少 8 小时，但尚无 retained 的最早到期技能。

同一优先级先选从未尝试过的候选，再按正式 ended session 历史选择最久未尝试者；证据时间和固定技能键只作最后破平局。调度迁移时，LP01 读取现有 `openingReviewQueue` 与证据，LP02 从 `needsPractice` 或 played-but-not-stable 证据创建独立候选；迁移必须幂等，刷新或重复启动不能生成重复项。`LP01` 和 `LP02` 都是第一次形成同优先级候选时，可先处理 LP01 的听辨缺口；LP01 一旦尝试过，尚未尝试的 LP02 必须先于 LP01 重试，不能因 LP01 证据更早而永久挨饿。同一 session 仍不连做两个 review。

优先级不能变成“同一个困难技能永久霸占开场”。一次 review 若用了 repeated repair、strong、modeled、visual-assist 或因长等待收短，该候选仍保留，但写入 `cooldownAfterSessionId=<本次 review sessionId>`。在 session 历史中出现至少一个**后来结束的、不同 sessionId 的正式孩子 session**之前，它暂时不参与选择。这个候选级冷却只用于控制单技能重复，不删除 needsPractice、不降低证据优先级，也不依赖设备墙钟。

另设全局密度门禁：任一正式 session 实际呈现过 opening review 后，写 `reviewSpacingAfterSessionId=<本次 sessionId>`。至少一个后来结束、正式、孩子参与且**没有 opening-review action** 的 session 出现前，所有 review 候选都暂停；困难 review 收短后的下一次明确点击因此必定直接进入新故事，不能改选 LP02 或其它候选继续拦路。顺利 review 已在同一 session 进入新课，也仍让下一 session story-first，避免孩子形成“每次打开都先考试”的感受。刷新、崩溃恢复、地图往返、debug/direct、未结束 session 和另一个 review-only session 都不能消耗全局间隔。顺利补教转入 `nextMode=reduced-cue` 时仍只允许间隔后的独立 session 再检查，不能在同一 session 追加考试。

任何带 `resumeOfSessionId`、只续接上一短课剩余 action 的 session 都跳过 opening review。自然休息后的孩子先接回眼前故事，不被旧题截断；该 resume session 正常 ended 后可作为全局需要的“无复习故事 session”，但 active、刷新或只看地图不能提前消费间隔。

调度器必须保存明确的 `reviewSkillKey`：

- LP01：沿用已落盘的 `level:LP01`，其语义只代表同名 C 的高低音区听辨；
- LP02：`low-key:C3`。

这些键不得与 `level:LP02`、`low-key:C3-G3`、高音 C4-G4 或低音谱位证据合并；不得为了新命名让现有 `level:LP01` stable anchor 失联或被重复迁移。

## 三、LP01 复习类型

### A. needsPractice 补教复习

适用于 LP01 提前收短、strong、modeled、visual-assist 或明显困难：

- 先用两个固定泡泡重听一组不计分的 `C4/C3` 模型；
- 最多进行四次高低比较；若第一题已需 repeated repair/strong/modeled，完成眼前最小回声后自然休息，不强做完；
- 模型后的本次路线可以写新的 played/needsPractice 观察，但因为同 session 先看了完整模型，不能写 stable 或 retained；
- 原先未呈现的调用仍不能被回填为历史 correct。
- 若孩子在模型后的短路线中不再需要 strong、modeled、visual-assist 或 repeated repair，本次仍不写 stable，但队列项必须原子切换为 `nextMode=reduced-cue`，并保存 `remediationPreparedAt`。下一次独立 session 直接进入 B 类少提示复习，不能因为技能记录仍为 `needsPractice=true` 又无限重播完整模型。
- 若补教复习仍需上述帮助，队列保持 `nextMode=remediation`。同一 session 不立即再来一遍；下次才可重新补教。

### B. played-but-not-stable 少提示复习

适用于四次调用曾真实完成但没有 stable，且本次不需要先重放完整模型：

- 两个泡泡保持原有等权、固定位置；正式目标从中央声源播放；
- 四次中至少 3/4 首次选择正确、孩子目标重听最多一次、无 candidate preview、strong、modeled、visual-assist、实验输入或跨 session 拼接，才可新增当前 stable event；
- 普通错后修复可以完成故事，但不能回填首次正确。
- 由 A 类成功转入本模式时，调度器以队列项的 `nextMode=reduced-cue` 为准，优先于旧技能摘要中的笼统 `needsPractice`。本次达到 stable 后关闭该候选；再次需要 strong/modeled/repeated repair 时才把 `nextMode` 退回 `remediation`。

### C. retained 到期复习

只有已有 qualifying stable anchor，且满足 `docs/31` 的不同 session、不同本地日期、至少 8 小时和时钟有效条件时才可选择：

- 不先播放两个泡泡的完整模型，不给强答案提示；
- 再次满足 LP01 stable 门槛后才新增 retained event；
- 到期本身不产生 retained，失败也不删除历史 stable/retained。

## 四、LP02 复习类型

LP02 opening review 使用当前已冻结的连续 `C3-B4` 单排键盘和真实 2/3 黑键组：

- 孩子表面给出“找低音 C”的字母音名问题，星芽对话可说 Do；不显示 `C3/C4` 数字；
- 第一次有效触屏选择精确 MIDI 48，且无 strong key glow、modeled、visual、mic 或预先脉冲目标键，可新增 `low-key:C3` stable；
- MIDI 可形成 played/观察，但首版不用于建立 stable；实验麦克风最多辅助故事，不能 stable/retained；
- 中央 C/MIDI 60 写 `noteNameCorrect=true/registerCorrect=false`，不能算低音 C；
- retained 仍必须是以后另一次合格 opening review，不能让第一次 reduced-cue LP02 review 同时写 stable 和 retained。

## 五、故事与短课节奏

- review 是 20-40 秒的章内“洞口回声检查”，不是成绩页、练习清单或重新建造。
- LP01 review 只让已有洞纹短暂回应；LP02 review 只让已落下的 C 锚石接缝发光。不得重开洞门、重落 C 石或重播咚咚揭晓。
- review 顺利且孩子仍投入时，才可进入当前新教学 bundle；出现 repeated repair、strong、modeled、长等待或明显退出信号时，在 review 的安全结果处休息，新教学留到下次明确点击。
- review 完成或延期都不要求关闭、下一关或成绩确认按钮。
- 每 1-2 个孩子动作只有一个小反馈；钢琴音优先，角色语音和 SFX 不遮盖目标音。

## 六、状态与队列

- `C4-R01` 是调度动作身份，不是新的孩子故事 bundle。最终运行形态中，孩子从地图明确开始当前目标短课时只创建一个 formal session：`bundleId` 保持目标新课（LP03 通过后的首个目标是 `C4-03`），并在其 lesson actions 前最多插入一个带 `reviewSkillKey` 的 `opening-review` action。顺利 review 可在同一 session 继续目标 lesson；困难 review 在安全结果处结束该 session，目标 lesson actions 保持未呈现，下一次仍需孩子明确点击并创建新的 session。不得在 review 与新课之间自动创建第二个 session，也不得把未呈现的新课写进完成历史。
- `C4-R01A` 阶段没有真实 LP04 actions，正式地图入口继续锁定。它可以通过纯计划夹具或不可达的测试 plan 验证“最多插入一个 review、目标 actions 字节不改、困难时未呈现”，但不得在孩子运行路径创建 review-only `C4-03`、空 session、占位 completion 或虚构新课 action。
- A 阶段的 session/刷新/恢复测试只能使用专用内存夹具或独立非孩子存储命名空间；不得写 `starDinoSessionRuntime` 的正式 history、不得生成可点击地图入口，也不得开放一个会被普通 debug URL 误当成正式学习的持久入口。夹具销毁后正式孩子数据必须逐字节不变。
- `C4-R01B` 随 LP04 候选接入真实 `C4-03` plan 后，必须重新执行端到端浏览器验收；只有这一阶段可以证明顺利 review 沿用同一 session 进入真实 LP04，或困难 review 结束后 LP04 三个 actions 全部未呈现。
- 队列项至少保存 `skillKey`、source session、reason、priority、`nextMode`、`remediationPreparedAt`、createdAt、lastAttemptAt、`lastAttemptSessionId`、`cooldownAfterSessionId` 和状态；调度器另保存全局 `reviewSpacingAfterSessionId`，不能把它误塞进某一候选后被删除。
- 创建 review session 后不能立即删除队列项；只有对应 review 真实 ended 后才按结果更新。
- `passed stable/retained` 可关闭相应队列项；困难结果更新 `needsPractice` 并保留下一次资格，但不得在同一 session 再排第二遍。
- 队列迁移与每次 review 收口必须幂等：刷新不得把 `nextMode=reduced-cue` 降回 remediation，也不得因技能摘要仍为 needsPractice 生成第二个 LP01 候选。
- 困难结果的冷却按正式 ended session 历史顺序消费：同一困难候选不能连续霸占两个孩子 session；冷却期间其它候选或新故事可以前进。不得用 `Date.now()`、刷新次数、地图往返或 debug session 假装已经间隔一节。
- 刷新、地图暂停、PWA 恢复和浏览器崩溃恢复保持同一 review sessionId、call/action index、声音事务和已解决进度。
- 调试/direct、普通自愿重玩、同日重复和课程内自动演示都不能冒充 opening-review 身份。

## 七、家长端

家长端分别显示：

- 高低 C：待复习 / 本次减提示完成 / 隔日再次减提示完成；
- 低音 C 键位：待复习 / 本次减提示找到 / 隔日再次减提示找到；
- LP03 C-D-E：只显示路线玩过或阶段观察，不在 C3-G3 完整检查前显示稳定。

失败的 later review 只显示“今天需要提示，下次再找一次”，不能写退步、考试失败或删除历史证据。

## 八、自动化最低清单

### A. `C4-R01A` 调度核心门禁（LP04 实现前）

1. LP01 needsPractice、played-not-stable、retained-due 三类候选选择正确。
2. LP02 只有历史 needsPractice/played 证据、没有旧队列项时，首次调度恰好创建一个 `low-key:C3` 候选；刷新、重复迁移和多次启动仍只有一个，且旧 session/evidence 字节语义不被回填。
3. LP01 补教模型阻止 stable/retained；顺利补教把同一候选的 `nextMode` 切到 reduced-cue，下一独立 session 不再重复模型；困难才退回 remediation。少提示 3/4 门槛和最多一次目标重听正确。
4. LP02 exact C3、C4 same-name wrong register、其它白键、黑键、MIDI、mic ambiguous 分轴正确。
5. 组合 plan 最多一个 review；困难 review 的收口决策不允许目标 action 呈现。
6. 隔离夹具中的模拟 review 生命周期、刷新、地图暂停、恢复、ended 和队列更新幂等；覆盖“技能 needsPractice 仍为 true，但队列 nextMode 已为 reduced-cue”时不会形成补教死循环或重复候选。夹具运行前后正式孩子存储逐字节不变。
7. 困难 review 写入候选级 `cooldownAfterSessionId`；任一 review 写入全局 `reviewSpacingAfterSessionId`。刷新、debug、未结束 session、其它 review-only session 都不消耗全局间隔；下一个 formal child session 必须无 review 并进入新故事，正常 ended 后才重新开放选择。
8. 两个同优先级 needsPractice 候选先覆盖从未尝试者，再按 ended 历史最久未尝试者轮换；LP01 初次破平局不能使 LP02 永久饥饿。
9. `resumeOfSessionId` 组合 plan 永远返回 0 个 review、保持剩余 action 原序；只有该正式无复习 session ended 后才可消费全局间隔。
10. 纯计划夹具证明 review 是目标 bundle 的前置 action，且不会制造第二个自动 session、空的新课 completion 或重复 review history；这一项不能替代 `C4-R01B` 的真实 LP04 端到端证据。
11. 普通 replay/direct/debug/同日或不足 8 小时均不能 retained。
12. stable/retained 历史不因后来困难删除；todayNeedsPractice 可同时存在。
13. LP01/LP02 review 不改变 C 锚石、D/E 石头、LP03 阶段观察或前章证据。
14. 孩子界面不出现 stable、retained、倒计时、速度、C3/C4 数字或两个 review 清单。
15. review 自身的六视口、辅助激活、pointer/MIDI 生命周期、声音 started/ended、PWA、session、clean-state、quick 和 strict bundle 通过；正式地图上仍没有空的 C4-03 入口或 session。
16. `concepts/**`、`audio/**` 和未批准生成视频运行引用为 0。

### B. `C4-R01B` 真实目标课整合门禁（LP04 候选内）

1. 正式 LP03 完成后点击 LP04 入口，创建唯一 `bundleId=C4-03` session；无候选时直接进入真实 LP04 模型。
2. 有候选时最多插入一个真实 review action；顺利时同一 session、同一 sessionId 继续第一个 LP04 action，不创建第二个 session。
3. 困难 review 在安全点结束；LP04 模型、E/D/C actions、世界字段和 completion 全部保持未呈现/未写入，下一次明确点击才创建新 session。
4. 刷新、地图暂停、PWA 恢复和崩溃恢复同时覆盖 review 与目标 action 的边界，不能重复 review、跳过模型或自动创建 C4-03。
5. 任一路线呈现过 review 后，下一个正式 session 必须直接进入 LP04 或后续真实故事且不含 review；该无复习 session ended 后，调度器才可再次选择候选。
6. 重新执行本文件 A 类全部回归以及 LP04 专项、共享音频生命周期、六视口合同、session、clean-state、PWA、输入和严格包门禁。

## 九、放行顺序

- 当前：`C4_R01A_core_passed_at_af9aa28 / LP04_and_C4_R01B_supervisor_accepted_uncommitted / LP05_not_auto_unlocked`。
- C4-01 未晋升浏览器基线前：不得下发。
- LP03 已在 `cedc384` 晋升浏览器教学基线，C4-R01A 前置已满足。
- `C4-R01A` 已在 `af9aa28` 单独实现、审查并提交；正式地图继续停在 LP03 完成态，没有创建空的 C4-03。
- LP04 与 C4-R01B 已使用真实 C4-03 actions 完成本文件的同 session、困难收短、story-first、resume、retained 与 fail-closed 端到端门禁；A 类计划夹具没有被用来冒充 B 类完成。
- `C4-R01A` 的提交边界与未提交 LP04/R01B 候选继续分开。A、B 两道浏览器门禁均已通过，但 LP05 仍等待 354b 实体 iPad 成人预听、方向性观察和主管明确窄派工。

实体 iPad、真实 MIDI、原声钢琴麦克风、教师、3-5 名儿童、长期 retained 效果、素材来源和外部相似性在对应证据完成前继续标记 missing。
