# 星龙工坊整体调度与独立审查规则

状态：2026-07-18 调度重排继续生效；最新获批浏览器实现基线为 `overhaul-345d-audio-c` / `2405734`，`app.js` SHA-256 为 `DAA50F00F4CCFD8A408631AE934BB39D8B6FB02EB064A99063475C751CD692C6`。它使 M03、LS01-LS08 与第四章 LP01-LP02 的浏览器教学音生命周期完成总回归，并修正 LS06/LS07 第一颗带路音跨地图后第二颗未呈现就开放作答的问题。`docs/49` 现已完成，下一唯一运行工作是按 `docs/47` 实现 `C4-02 / LP03`；LP04+、完整咚咚揭晓、左手、低音谱表、Chapter 5、正式媒体运行集成和全局重构继续锁定。用户要求抢占 Grok 可用窗口后，Batch18 已用一个全新 CH3-A ID 真实触发一次 `image_to_video`；CLI 登录与 `grok-4.5` 可见，但外层 `402`、视频工具 `403 personal-team-blocked:spending-limit`，raw MP4=0，其余七项立即停发。所有媒体候选继续 `runtimeApproval=false / integrationAllowed=false / releaseCleared=false`。现有花园仍是原型级美术，离线音频仍缺人工耳机/扬声器/iPad 听审；远程 Git、真实录音、实体 iPad、教师、儿童、最终来源/外部相似性、原生工程、TestFlight 和商店证据仍缺失，项目整体未达到发布准备状态。

## 2026-07-18 C4-R01 防枯燥调度修正

- 主管复核 `docs/48` 时发现原优先级缺少困难候选的轮换条件：持续 `needsPractice` 的 LP01 可能每个 session 都抢在 LP02 和新故事前，形成补教死循环并破坏 3-5 分钟儿童短课节奏。
- 现改为基于正式 session 历史的单次冷却。一次 review 使用 repeated repair、strong、modeled、visual-assist 或长等待收短后，保留证据与原优先级，但写 `cooldownAfterSessionId`；至少一个后来结束的不同正式孩子 session 出现前，该候选暂不参选。期间可轮到其它合格 review 或新故事，刷新、debug/direct、地图往返和未结束 session 都不能消耗冷却。
- `C4-R01` 同时明确为目标 bundle session 开头的最多一个 `opening-review` action，而不是额外故事 bundle：顺利时沿用同一 session 进入新课，困难时新课 action 保持未呈现并在 review 安全点结束。
- `docs/09` 的通用支架规则和 `docs/48` 的字段、状态、自动化清单已经同步；`docs/51` 也已把 LP04 收敛为一份 `prepared_locked` 的 E-D-C 下降回声工作单。两者都只是后续规划，不触碰当前 LP03 运行实现，也不提前解锁 C4-R01、LP04 或媒体集成。

## 2026-07-18 `overhaul-345d-audio-c` 正式晋升与 LP03 解锁

- 冻结提交：`2405734`；运行身份：`overhaul-345d-audio-c`；最终 `app.js` SHA-256：`DAA50F00F4CCFD8A408631AE934BB39D8B6FB02EB064A99063475C751CD692C6`。提交只包含运行、AUDIO-C/主管专项、共享回归编排、版本断言和 `docs/20`，没有混入主管规划、媒体候选、CSS、美术、课程音序或阈值。
- 主管先以永久探针复现 `12/13`：第一颗 guide child echo 中请求地图后，重进时第二颗 guide 未播放就 `guideInputArmed=true`。P1 增加 `guide-next-pending / pendingGuidePresentation`，使 LS06 C->G、LS07 E->F 都必须先真实 started/ended；真实刷新保持 guide 阶段、未武装、无正式 `1/4` 分母，并要求明确扬声器手势。
- 最终 SHA 独立通过：主管 AUDIO-C `13/13`、AUDIO-C `46/46`、LS06/LS07 `64/64`；全生命周期 AUDIO-A `66/66`、AUDIO-B `46/46`、AUDIO-C `46/46`、LS08 `131/131`、C4 `137/137`。另通过 sessions `74/74`、clean-state `124/124`、M03/garden `32/32`、Chapter 3 visible `74/74`、LS04 `39/39`、LS05 `66/66`、孩子端音名 `224/224`、PWA `8/8`、iPad a11y `43/43`、音频设置 `13/13`、输入 `12/12`、quick/strict；严格包为 42 个运行文件、1,641,265 bytes。
- 17 个运行入口文件的禁止项目标识和未批准媒体引用均为 0。浏览器证据现允许把 M03/LS01-LS08 与 LP01-LP02 称为 `audio-lifecycle verified`，并解除 LP03 的前置阻断；它不证明实体设备可闻性、学习效果或发布质量，也不解锁 LP04、媒体集成和后续章节。

## 2026-07-18 Grok Batch18 加急视频调用与额度停点

- 用户明确要求在账号窗口失效前加紧生成。媒体任务重新实测 `grok 0.2.93`：仍登录 `grok.com`，默认模型 `grok-4.5` 可见；CLI 没有非消耗余额查询命令，因此登录正常不能证明视频消费额度可用。
- Batch18 先从封版透明模型表制作并四边核验星芽密封服清洁裁切；通过裁切 SHA-256 为 `598FF57E12DFE1CEC28D7DAC4BAC3DAF3FDE3AA69B0040BEEF4112296BF47BFB`，含三颗头芽、透明头盔、压力服、手套、靴子、生命维持背包、完整尾巴和尾套。带邻近姿态碎片的 v1 裁切保留为 rejected，未用于调用。
- 全新 ID `b18-ch3a-sealed-scan-safe-01` 真实触发一次 `image_to_video`；外层 Responses API 为 `402 Payment Required`，视频工具为 `403 Forbidden / personal-team-blocked:spending-limit`。`videoCallCount=1`、`successfulOriginals=0`、raw MP4=0；错误原文 SHA-256 为 `40FD14FC120678EC3A4D0BA9C449BCBE3A803E37D7CDF4020A89361C0125D7B3`。
- Batch18 已冻结为 `frozen_blocked_by_provider_spending_limit_after_explicit_attempt`，其余七项均 `captureEligible=false`，不得重试同一 ID、换号或绕过消费限制。恢复后须用新 ID 串行生产，并从 CH3-A 重新开始逐条审查。
- 主管独立读取 manifest/queue/冻结审计并复算错误哈希；运行引用扫描 0、跨项目标识扫描 0，三个批准位均为 false。本轮只证明登录有效和视频额度被阻塞，不产生可审视频，也不批准运行、来源、相似性或发布清关。

## 2026-07-18 `overhaul-345c-audio-b` 正式晋升与 `AUDIO-C` 解锁

- 冻结提交：`2a8a17529aeffd47a8666f21e175ba822d48347f`；运行身份：`overhaul-345c-audio-b`；最终 `app.js` SHA-256：`E59D9F99C3C1A1406A180D3E88A899EEBD5846A0BCB43E3919973E77D9C3E74D`。提交后 tracked worktree 干净；该批没有改 DOM、CSS、布局或坐标合同。
- 主管独立复跑通过：AUDIO-B `46/46`、LS04 `39/39`、LS05 `66/66`、AUDIO-A `66/66`、sessions `74/74`、孩子端音名 `224/224`、LS08 `131/131`、Chapter 4 LP01-LP02 `137/137`、PWA `8/8`、音频设置 `13/13`、输入可靠性 `12/12`、quick 与 strict bundle；严格包为 42 个运行文件、1,641,265 bytes，禁止项目/媒体运行引用为 0。
- 主管额外直接证明 LS04 与 LS05 的最后一次正确 child echo 只有真实 `ended` 后才完成，只消费一次排队地图返回，只回地图一次，且不会自动创建 LS05/LS06。临时探针未进入提交。
- AUDIO-B 只晋升 LS04-LS05 的浏览器音频生命周期，不证明 LS06-LS07、实体扬声器可闻性、iPad Safari、真实 MIDI/麦克风或儿童学习效果。下一唯一运行工作为 AUDIO-C；不得混入 LP03、UI、美术、媒体或课程调整。

## 2026-07-18 Grok Batch16 离线准备、后续调用与主管独立裁决

- 媒体任务在不发送新 Grok 请求的前提下索引 Batch1-Batch14 共 `146` 条 raw MP4，并冻结 `concepts/grok-cli-video-capture-2026-07-18-batch16/`。主管没有沿用支线自评，已独立解析 manifest/queue/shortlist，核对 12 条原片 SHA-256、12 个静音审核流和两份参考图哈希，并直接打开 2x6 接触表。
- 12 条短清单裁决为 `7 passed_source_only / 2 partial_source_only / 3 rejected_source_only`。洞穴、花园边缘、侧探针、完整屋顶和气闸离开只可作受限 source-only；桥只作物理接缝参考；咚咚 03 只作三角身份参考。咚咚头脸消失、脸感舱门和中央目标轮廓继续 rejected，不能因进入新清单而升级。
- Batch16 队列共 6 项：2 项 `call_when_authorized`，2 项 `deterministic_derive`，1 项 `existing_partial_no_call`，1 项 `source_gated`。离线裁决时调用为 0；用户随后明确授权正式生产，运行器竞争导致同一 `b16-c4-nondirectional-rock-dust-01` 被两个 session 各触发一次。两次视频工具均返回同一 spending-limit，`videoCallCount=2`、`successfulOriginals=0`、raw MP4=0；重复触发作为流程事故保留，未被隐藏或合并。
- `grok 0.2.93` 始终显示已登录且 `grok-4.5` 可见，但官方 CLI 无非消耗余额/用量查询命令。Batch16 两次失败、Batch17 零调用待命和 Batch18 单次加急失败共同证明当前阻塞是视频消费额度，不是登录过期；不得重试旧 ID、换号或绕过消费限制。
- 主管独立扫描确认 Batch16 跨项目标识 0、运行引用 0；`runtimeApproval=false / integrationAllowed=false / releaseCleared=false`。本裁决只通过离线清单和未来调用准备，不批准生成结果、运行集成、版权来源或发布清关。

## 2026-07-17 `overhaul-345b-audio-a` 正式晋升与 `AUDIO-B` 解锁

- 冻结提交：`84a8f44213893304736d29ea45f7336d0730469d`；运行身份：`overhaul-345b-audio-a`；最终 `app.js` SHA-256：`6D6E771DDF7EBE6468A2D58064869CF87A9BBFB73074B1C389C745BD42B9F40E`。提交后工作树干净，运行提交没有混入主管文档、媒体、CSS、坐标合同或 AUDIO-B/C。
- 主管先独立复现并退回两个原专项未覆盖的 P1：直接预览 M03 的 wrong/route/trace 会污染新正式 `C1-03`；最后一次 child echo 播放中请求地图会丢失并自动跳 M04。345b 以正式 snapshot ownership 和终态 ended 后单次消费排队返回闭环，并补 touch/MIDI、正式刷新与地图恢复永久断言。
- 最终 SHA 上主管独立复跑通过：AUDIO-A `66/66`、sessions `74/74`、M03/Garden `32/32`、clean-state `124/124`、孩子端音名 `224/224`、PWA `8/8`、输入 `12/12`、音频设置 `13/13`、quick 与 strict bundle；严格包为 42 个运行文件、1,641,265 runtime-asset bytes。原型同 SHA 另复跑 LS08 `131/131`、C4 `137/137` 及全部版本受影响门禁。
- AUDIO-A 只证明 M03、LS01-LS03 的浏览器 started/ended、held input、外部麦克风事务、恢复和排队返回合同；不把 LS04-LS07、实体扬声器可闻性、真实设备或学习效果自动升级为通过。没有重签坐标合同，因为该批未改 DOM/CSS/布局。
- `docs/49` 的下一唯一运行工作现为 `AUDIO-B`（LS04-LS05）。AUDIO-C、LP03、媒体接入和其它章节仍不得并行写入同一运行里程碑。

## 2026-07-17 `overhaul-344a-p3` 历史基线晋升

- 冻结提交：`8cea6d46b725c26d2c8272086eab56b271750b18`；运行身份：`overhaul-344a-p3`；最终 `app.js` SHA-256：`58D4D2721FF0EC28BCCA9D0EE86449407E2C8D77A1CC6FD1CE2AD2B61BD21CD3`。
- 主管独立复跑：LS08 `131/131`、C4 LP01-LP02 `137/137`、孩子端音名 `224/224`、audio contract `22/22`、quick 和 strict bundle 均通过；strict bundle 为 42 个运行文件、1,641,265 bytes。
- 四份最终 344a 合同均记录最终源码摘要、`runtimeIntegrationAllowed=false`、零 geometry failure 和零 browser error：C4 6x19，LS08 6x14，通用教学区 6 视口，Chapter 3 区域 6x9。合同与哈希事实源在 `docs/20_GATE_RUN_LOG.md` 顶部。
- 344a 证明 LS08 与 LP01-LP02 的浏览器内受控 started/ended、interrupted、恢复、排队返回和反序回调语义；它不把 M03、LS01-LS07 自动升级为音频生命周期通过，也不证明扬声器真实可闻、iPad Safari、真实 MIDI/麦克风或儿童学习效果。
- `docs/49` 现为唯一运行工作单，顺序固定为 `AUDIO-A -> AUDIO-B -> AUDIO-C`，每批独立源码审查、测试、合同和提交。三批全部通过前，`docs/47` 的 LP03 不得下发。
- 旧的 344a 退回、P0/P1 和 `343a-p2` 结构裁决继续作为历史审计保留；本节记录 345b 的直接前置基线，当前状态以上方 345b 晋升节为准。

## 2026-07-17 `AUDIO-A` MIDI held-note P1 历史退回（已由 345b 闭环）

- 原型任务在候选 SHA-256 `791FFD963BE3839E2E0943B888FE3CFC59CB4375033BB710E19A53DCCDCF4E66` 上自报 `check:audio-a 44/44`、sessions `74/74`、M03/Garden `32/32`、Chapter 3 visible `74/74`、clean-state `124/124`、LS08 `131/131`、C4 `137/137`、孩子端音名 `224/224`、输入可靠性 `12/12`、音频设置 `13/13`、quick 与 strict bundle 全通过。主管在同一 SHA 独立复跑 AUDIO-A `44/44` 与 sessions `74/74`，这些结果只证明现有断言通过。
- 主管额外实测 M03：目标 D 时发送一次 MIDI C4 note-on 且不发送 note-off；child echo 与目标修复音结束后，候选错误进入 `awaiting-response / inputArmed=true`。再次发送同一 C4 note-on 会启动新的 child echo。LS01 以 D4 错按 C4 目标时得到同样结果，可能多记 wrong 并过早进入 assisted。
- 当前 `releaseM03AudioInput()` 与 `releaseGardenAudioAInput()` 只处理麦克风，没有把 MIDI held/released 状态纳入重新武装。现有“重复 note-on”断言只覆盖修复音仍播放时的重复事件，没有覆盖修复结束但旧音尚未 note-off 的窗口。这违反 `docs/49` 第六节的持续输入门禁，状态为 `P1_rejected_for_held_MIDI_rearm / baseline_unchanged`。
- 原型只获准在 AUDIO-A 范围内补 held-note 状态、note-off 解锁与直接专项；还须补 M03 modeled 真正 ended 后才完成、以及至少一个 Audio-A 排队返回后系统中断自动兑现的直接证据。修正通过前禁止生成最终坐标合同、改版本/PWA 缓存、写 `docs/20`、暂存或提交，也不得提前开始 AUDIO-B。
- 本节保留当时的拒绝事实，不能覆盖上方 345b 正式晋升；held-note 及主管后续发现的两个 P1 均已在 `84a8f442...` 闭环。

## 2026-07-17 Grok Batch13/14/15 最终裁决与额度停点

- Batch13 已冻结为 `12` 次真实 `image_to_video`、`12` 条原始 MP4，认证/授权/额度/503/缺原件均为 `0`；12 个静音审核副本均为 0 音轨，raw 哈希 `12/12`，运行引用 `0`。主管逐帧只保留 `06` 实体家园连接、`08` M08 屋顶末锁、`09` C3 侧探针为 preferred；`04/05/07/10/11/12` 为 partial，`01/02/03` 因飞船脸化、运动因果或气闸问题 rejected。
- Batch14 真实调用 `5` 次，前 `4` 条有原件；第 5 条实际触发后返回 `402 Payment Required` 与 `403 personal-team-blocked:spending-limit`，认证失败为 `0`，第 6 条从未触发。4 个静音审核副本均为 0 音轨，raw 哈希 `4/4`，运行引用 `0`。`01` 为完整屋顶闭合 preferred；`02` 探针往返与 `03` 次级屋顶为 partial；`04` 因脸状孔洞及教学区遮挡 rejected。
- 这两批都只证明 source-only 动作参考；Grok 原片自带 AAC 与 attached cover 均禁止 runtime。没有一个文件获准复制到 `assets/runtime`，也没有一个证明角色一致性、教学安全、版权来源、外部相似性或发布许可。
- 当前阻断是消费上限，不是账号过期。媒体获准先离线建立去重后的最多 6 条高价值队列；没有无消耗的额度恢复证据时不得发真实调用探测。额度恢复后才可每镜头一次、串行连续生成，并继续保持 `runtimeApproval=false / integrationAllowed=false / releaseCleared=false`。
- Batch15 先完成无消耗核验与冻结队列；用户随后明确授权一次真实生产尝试。`b15-c4-nondirectional-deep-tremor-03` 于 `2026-07-17T16:10:55.756Z` 在媒体工具前返回 `402 Payment Required: Grok Build usage balance exhausted`，所以 `productionAttemptCount=1`、`videoCallCount=0`、raw=0，且不得重试该 ID；Batch16 未创建。精确事实见 `concepts/grok-cli-video-capture-2026-07-17-batch15/manifest.json`、`logs/calls.jsonl` 与 `errors/b15-c4-nondirectional-deep-tremor-03-provider-error.json`。

## 2026-07-16 教学钢琴音生命周期 P0 与运行顺序修正

- 主管直接审查当前 344a 源码发现：旧 `getSfxBus()` 在 AudioContext 为 suspended 时异步调用 `resume()`，却立即返回可排程的 bus；`playPianoNote()` 返回 true 只证明 oscillator 被排程，不证明 context 已 running 或声音真正结束。C4 与 LS08 又用 `setTimeout` 按预计时长写 `ended`、开放评分、推进世界状态和解锁第四章。
- 在 `resume()` reject、播放中再次 suspend、后台节流或 watchdog 到点时，孩子可能没有听到完整题目，旧逻辑仍可虚记 presented、scored、地基安装、低回声完成和章节解锁。这是教学证据 P0，不是普通音效瑕疵。
- 当前 344a 只能建立共享受控播放句柄并迁移 C4/LS08：AudioContext 真正 running 且第一声进入当前 audio time 后才可写 started/presented；最后 oscillator 的真实 `onended` 才可写 ended；suspended/closed、resume reject、构造失败、静音、音量 0、visibility/pagehide/blur 和 watchdog 都只能进入 interrupted/sound-paused。
- 共享句柄必须记录 playbackId、Web Audio start/end time、context state 和互斥的 started/ended/interrupted；迟到 callback 不得污染刷新或恢复后的新事务。LS08 低回声只有真实 ended 才能建立完成证据和第四章入口。
- 2026-07-17 的最终 P0 候选为 `app.js` SHA-256 `58D4D2721FF0EC28BCCA9D0EE86449407E2C8D77A1CC6FD1CE2AD2B61BD21CD3`。主管独立源审确认 LP02 external-input 地图中断、同 session 显式恢复、C4/LS08 排队返回中断单次兑现和反序 `onended/statechange` 保护成立，并在独立端口完整复跑 LS08 `131/131`、C4 `137/137`，exit 均为 0。该结论只通过 P0，不代替最终共享回归、六视口合同、运行清单、选择性暂存或提交。
- 344a 独立通过后，`docs/49_TEACHING_AUDIO_LIFECYCLE_AUDIT_CHECKLIST.md` 成为 LP03 前唯一运行工作。M03 与 LS01-LS07 的同类旧排程/墙钟路径全部迁移后，才可解锁 `docs/47`。这项顺序已经同步到 `docs/README.md`。

## 2026-07-16 Grok Batch7 独立裁决

- Batch7 共真实触发 `18` 次 `image_to_video`，保存 `15` 条原始 MP4；`2` 次为 provider 503，`1` 次工具触发后无原件，认证失败与额度失败均为 0。所有原件约 `6.041667s / 736x400 / H.264 / 24fps`，并带禁止运行使用的 Grok AAC 和 attached MJPEG cover；15 条审核副本均为 0 音轨。
- 主管独立查看 15 条首中末和 145 帧接触表后，仅保留 6 条洞穴/花园环境为 `preferred_source_only`，6 条机械/光效/构图为 `partial_source_only`，并拒绝中央目标轮廓、带星形收集物的星桥跳变和无角色参考生成的随机恐龙预告。
- `b7-dongdong-three-horn-border-18` 的原调用在纠偏到达前已使用洞穴图启动；恢复原件虽有角色轮廓，但不是准确三角龙，也没有咚咚模型表身份来源。该竞态已如实保留，禁止事后覆盖参考图或升级角色身份。
- 所有原件都超过既定 `2-5s` 运行合同；preferred 也只能进入裁切和真实 UI 合成审查。Batch7 运行引用为 0，运行与发布批准均为 0。逐项裁决见 `docs/50_GROK_BATCH7_SUPERVISOR_REVIEW.md`。
- Batch8 只允许使用项目角色模型表的可复现清洁裁切或已审核场景源。任何带相邻角色碎片、角数不清或教学区侵占的参考图必须在调用前拒绝，避免为了消耗账号窗口制造不可追溯素材。

## 2026-07-17 Grok Batch8 最终裁决与 Batch9 边界

- Batch8 已冻结为 `24` 次真实 `image_to_video`、`23` 条本地原件和 `1` 条工具触发后无原件；provider 503、认证失败和额度失败均为 `0`。`calls.jsonl` 已独立逐行解析为 `24/24`，23 条原件、23 条零音轨审核副本、23 张全帧接触表和 manifest 哈希一致；运行引用扫描为 `0`。
- 咚咚模型表的 side crop、`three-quarter-clean-v1` 与 `v2` 均因邻近角色碎片被拒绝并保留证据；获准的 `v3` 清洁裁切只证明首条身份探针来源。`b8-dongdong-threequarter-identity-probe-03` 保持 `partial_source_only_identity_pass_layout_unsafe_runtime_forbidden`；`b8-dongdong-distant-silhouette-04` 因头脸消失、额外尖片和时序连续性失败保持 rejected。Grok 角色视频链在此停止，不能用裁切或镜头拼接冒充稳定角色动画。
- 独立逐帧复核只保留三个首选 source-only 代表：`b8-c4-cave-edge-breathe-07` 为动态中性洞穴背景，`b8-c4-cave-still-poster-25` 为减少动态洞穴背景，`b8-garden-edge-leaf-loop-09` 为花园边缘教学背景。洞穴 `08/13/19/20` 与花园 `10/15/16` 只算备选重复，不能以数量冒充场景覆盖；`21` 的植物侵入保留区，只作动作参考。
- `b8-moonbase-roof-lock-24` 逐帧变化不足以证明屋顶真正锁定，只保留机械转场参考；`b8-moonbase-arrival-horizon-17` 的建筑占中央且暖光大幅扩张，只保留全屏章节转场参考。`04/18/22/23/26` 明确 rejected，分别对应角色连续性失败、舱门门户化、中央黑洞/目标、工业 UI 式绿灯和中央持续发光入口。
- 所有 Batch8 项继续 `runtimeApproval=false / integrationAllowed=false / releaseCleared=false`。用户要求趁账号有效继续生产后，媒体任务获准只在 `concepts/grok-cli-video-capture-2026-07-17-batch9/**` 串行补最多 12 个不同镜头，重点补飞船抵达、可见屋顶闭合、空气检测、花园到洞穴和实体家园连接；禁止修改运行文件、接入原型或再次尝试复杂角色动作。

## 2026-07-16 Grok Batch5 登录恢复、真实调用与主管裁决

- 用户要求继续抢占 Grok CLI 的可用窗口。第一次只读预检确实返回 `You are not authenticated.`；稍后主管在同一物理 ASCII 工作目录 `C:\grok-star-dino-capture` 再次执行 `G:\新电脑E盘\ai_install\grok\bin\grok.exe models`，真实结果已变为 `You are logged in with grok.com.`，默认模型 `grok-4.5`。后续事实以恢复后的真实调用为准，旧的 `authentication_missing / 0 call` 只保留为前置历史，不能继续冒充当前结论。
- Batch5 捕获器最初因 Windows PowerShell 5.1 把顶层 JSON 队列包装成单个 pipeline item 而零调用；主管确认没有 Grok/runner 进程后，只在 `concepts/grok-cli-video-capture-2026-07-16-batch5/tools/run_batch5_capture.ps1` 修正队列展开，再按既定 12 条队列逐条调用，每个镜头恰好一次、没有重试。最终真实 `image_to_video=12`、成功原始 MP4 `2`、工具触发后 `503 provider service unavailable=10`、认证失败 `0`、额度失败 `0`。
- 两条原件均为 `6.041667s / 736x400 / H.264 / 24fps`，原件带 AAC 48 kHz 双声道，另有 0 音轨审核副本。主管没有沿用媒体任务的文字自审，独立查看了两条 145 帧全时序接触表并复核 ffprobe：`b5-echo-neutral-interior-05` 没有目标环、箭头、文字、UI 或高低/方向答案载体，可保留为 `preferred_source_only_neutral_cave_environment_runtime_forbidden`；它是安全留白的中性洞穴环境，不足以单独承担明显的 LP01 回声反馈。`b5-moonbase-pressure-breathe-12` 的软陶屋顶和单一绿灯可读，但中心和下部被建筑占据，只保留为 `partial_source_only_mechanical_action_reference_runtime_forbidden`，不能当课堂背景。
- 两条原件、静音副本、接触表、prompt、session、哈希和 10 次 503 证据均冻结在 `concepts/grok-cli-video-capture-2026-07-16-batch5/`；运行引用扫描为 `0`，两者继续 `runtimeApproval=false / integrationAllowed=false / releaseCleared=false`，不得通知原型接入。Batch1-5 当前累计为 81 次真实 Grok 视频调用、62 条原始 MP4；数量增长不等于成熟素材、版权清关或发布批准。

## 2026-07-15 `344a` 候选二次代码审查退回

- 当时的 `overhaul-344a-p3` 仍是未提交、未批准候选，获批基线仍为 `overhaul-343a-p2`。原型任务在 pending-key 中性视觉修复后曾重新取得 LS08 `3 x 118/118`，但主管随后发现新的运行 P1，因此这些当时结果和正在生成的 19 态合同均作废；后来通过的 344a 事实只以上方 2026-07-17 晋升节为准。
- P1-1：LP01 `correct-feedback` 和 `lp01-complete` 都依赖内存计时器推进。回地图、在声音事务结束后排队回地图或刷新会清除计时器，而 `resumeChapter4Flow` 没有对应 phase 恢复分支，重进后会停死。原型已收到幂等 phase-driven 恢复和 map/reload 单次证据要求。
- P1-2：`playLp01Target()` 在确认教学音能够播放前就增加 `presentedCallCount`。静音、音量 0 或 AudioContext failure 会把未听见的题虚记为已呈现；已要求改为真实 started 后才计数，并验证失败时 `presented=0/resolved=0/unpresented=4/scoredCalls=0`。
- P1-3：LP01 early-rest 后 map 上的家长摘要立即切到 LP02，LP02 完成后也会遮住仍在 opening-review 队列中的高低 C needsPractice。已要求 map 家长区优先保留未解决 LP01，同时补充 LP02 待找家/已找家状态，不能让故事推进掩盖学习缺口。
- P1-4：孩子端“`四个声音`”容易被理解成四种音高，但实际只有 C3/C4 两个音、四次比较；已要求统一为“四次回声/四次声音比较”。LP02 reconnect-ready 刷新后还必须有明确手势入口，不得只能绕回地图。
- 课程主管同时复核下一工作单，发现 `docs/47` 曾允许 LP03 的 C-D-E 接缝检查单独写 stable，与 `docs/09` 的 canonical `C3-G3` 完整少提示路线门槛矛盾。现已修为 LP03 只保存 `low-key:C3-E3` 阶段观察，stable/retained 均为 0；并补充已完成音重复、未来音提前和 C4/D4/E4 同名错误八度的世界状态边界。
- 新增 `docs/48_CHAPTER4_OPENING_REVIEW_SCHEDULER_ACCEPTANCE_CHECKLIST.md`，状态为 `prepared_not_dispatched`。它防止 LP01/LP02 队列只记录不消费，排期固定为 LP03 浏览器基线之后、LP04 之前的独立 `C4-R01`；当前不得打扰 C4-01 修复或提前写运行代码。

## 2026-07-15 Grok Batch4 额度窗口收口与主管裁决

- 用户再次要求趁 Grok CLI 账号有效加紧生产。媒体任务完成独立 Batch4：12 次编排、11 次真实 `image_to_video`、11 条原始 MP4；第 12 条在媒体工具调用前返回 `402 Payment Required: usage balance exhausted`，没有原件、没有补发，也不计视频调用。Grok 在该历史时点额度耗尽；后续 Batch5-12 已证明权限和生成能力恢复，不能把本句当作当前账号状态。
- 11 条原件均为 H.264、736x400、24 fps、6.041667 秒并带 48 kHz 双声道 AAC；原始音轨只作溯源。11 条本地无声审核副本为 0 音轨，逐条三帧接触表、master contact、SHA-256、12 份源参考和运行引用 0 均通过。
- 主管逐图确认 `b4-garden-edge-leaves-01` 为本批优选花园边缘背景动效方向，但仍缺真实 UI/键盘/角色合成、iPad 分辨率、色彩统一和外部相似性清关。`b4-moonbase-roof-seam-07` 另保留为优选的 **M08 完成后无角色机械微过场方向**，不适合作为教学背景，也不得直接接 runtime。
- 铃花、四条洞穴和稳压镜头只保留 partial 环境/动作参考；星桥中心星形徽章、生态中继中心平台/标记和高对比电弧三条保持 rejected。余额耗尽的完成态边缘微光没有媒体结果。
- Batch2、Batch3、恢复包和 Batch4 合计为 69 次真实 Grok 视频调用、60 条原始 MP4。全部继续 `runtimeApproval=false / integrationAllowed=false / releaseCleared=false`，应用运行引用为 0。后续媒体工作只能做离线真实 UI 合成、受控分层角色制作和来源/相似性审查，不能再假定 Grok 可用，也不能联系正在修 C4-01 的原型任务。

## 2026-07-15 02:31 Grok 视频生产与主管独立裁决

- 为响应用户“趁 Grok CLI 账号仍有效加紧生成”的要求，媒体任务完成三包 source-only 生产：Batch2 为 32 次实际视频调用/31 条原始 MP4；Batch3 为 24 次/16 条；窄恢复包为 2 次/2 条。合计 58 次实际 Grok 视频调用、49 条原始 MP4。Batch2 一条和 Batch3 八条缺原件，恢复包无缺失；认证在最后仍有效。
- 全部原始 MP4 带生成 AAC，仅作来源证据；本地无声审核副本均为 0 音频流。各包清单、SHA-256 和运行引用扫描通过，应用运行引用始终为 0；`runtimeApproval=false`、`integrationAllowed=false`、`releaseCleared=false`。
- 主管独立审图确认：`p1-garden-edge-loop-09` 是 Batch3 优选花园边缘动效方向，但仍缺真实 UI/键盘/角色合成且米绿底偏单一；恢复包 25 只保留为 partial 花园边缘参考，26 因圆形边缘物可能像徽章/收集物而保持风险 partial。低/高回声只能分别作动作参考，不能组成等权答案对；洞穴、屋顶、收纳、完成光和设施镜头也只为 partial 构图/动作参考。
- 三条 C3 星芽过场因三颗头芽、装备变换、正脸和动作因果漂移被拒绝；LP02/LP03 地基及工坊镜头因石蛋、按钮、玩具件隐喻被拒绝。没有一个 Grok 视频获准复制到 `assets/runtime`，也没有一个证明最终角色动画、教学安全、发布来源或外部相似性通过。
- Batch3 P2 的八次缺原件来自短回合读取 staging brief/MCP 初始化/编排失败，不是登录失效。主管只授权两张已存在源帧做一次窄恢复；两次均成功后即停止，不再扩张调用。媒体任务另披露过四次无项目参考、未写项目文件的误触发原生生图调用；它们不是 Grok 调用、不属于项目资产，作为流程事故留在 recovery audit，不计入上述总数。
- 下一媒体工作不是继续批量生成，而是等冻结运行坐标后，用已保留方向制作真实 UI 合成板并逐项审查；角色变装应优先走受控分层/骨骼或逐帧制作，不能再用身份漂移的视频冒充完成动画。

## 2026-07-15 00:36 进行中主管检查点

- 该检查点当时唯一获批运行基线仍是 `overhaul-343a-p2` / `d218df468aa7458b672fc540bd3996752b81e9ef`。工作树中的 `C4-01 / LP01-LP02` 是未提交的 `overhaul-344a-p3` 候选，不能冒充当时的新基线；该检查点 HEAD `36f85e3` 只包含此前主管文档提交。
- 原型/UI 任务仍在同一个长 turn 内收口候选。它正在先稳定 LS08 页面内 reload 测试，再补 LP01 泡泡与 LP02 C3 的 Enter、Space、VoiceOver/`MouseEvent(detail=0)` 单次提交证据；运行文件继续冻结在该任务名下。主管不在此时下发 LP03，不因普通进度追问打断它。
- 媒体任务已确认唯一项目路径为 `web_star_dino_workshop`，Grok CLI 登录和 `grok-4.5` 可用，并建立 `concepts/grok-cli-video-capture-2026-07-15-batch3/`。截至本检查点，目录只有计划、manifest 和首批 prompt，manifest 仍为 0 次已登记调用；因此只能写 `production_started / first_call_pending`，不能声称视频已生成。首批限定为 Chapter 3 空气检测/开盔/收纳和 Chapter 4 中性回声/C-D-E 地基连续动作，全部 source-only、`runtimeApproval=false`、运行引用必须为 0。
- 课程审查已修正 LP02-LP03 世界连续性：LP02 的 C 石是永久洞门锚石；LP03 只用 C 唤醒/锁紧已有锚石，再让 D、E 两块落下，不能把三块石头全部重新悬起。`docs/03`、`docs/17`、`docs/24`、`docs/34` 已同步，`docs/47_CHAPTER4_LP03_SUPERVISOR_ACCEPTANCE_CHECKLIST.md` 仅为 `prepared_not_dispatched / runtime_locked`。
- 下一调度触发点只有两个：原型提交正式 `344a` 冻结回执，或媒体每 8-12 个成功视频/CLI 中断回执。出现会污染证据、串项目、改课程或接 runtime 的 P0/P1 才允许中途打断；其它建议批量留到对应里程碑结束。

## 2026-07-13 跨项目截图误认核查与边界修正

- 星龙工坊的唯一运行仓库是 `G:\新电脑E盘\个人\大顺\钢琴\web_star_dino_workshop`；琴键小队长的工程与证据位于 `G:\DevProjects\MidiInputProbe` 和 `G:\新电脑E盘\个人\大顺\钢琴\keyboard_captain_*`。两者不是同一产品、同一运行时或同一证据链。
- 本次误认发生在用户附件 `codex-clipboard-77f3d145-71a9-49e6-8cf7-83d0aeb82cae.png` 的临时路径失效后，主管错误查看了系统临时目录中的另一张琴键小队长截图。该错图先被误称为星龙工坊 M07 路线截图，随后又让一条发给星龙工坊原型任务的补充消息误写“车厢、节拍/小节提示”。这张图及基于其画面作出的项目判断都不是有效的星龙工坊需求或证据来源。
- 已立即发送勘误：撤回上述琴键小队长截图归属、车厢、音乐火车和节拍小节对象，只保留星龙工坊既有的 M07、M08、S01、工坊、花园、根须和屏幕琴键音名规则。M07 的 `C-D-E-D-C` 与孩子端纯音名规则之所以继续有效，只依据用户此前独立给出的文字要求和星龙工坊事实源，不以这张错图为证据。原型任务确认不会新增车厢、音乐火车或节拍小节相关实现/断言。
- 双向文件扫描未发现项目内容混写：星龙工坊运行/课程文件没有琴键小队长工程、音乐火车或怪物射击实现；琴键小队长设计目录和 HarmonyOS 工程没有星芽、咚咚、M07、LS08、呼吸花园或星龙工坊运行引用。本次错误没有复制截图、写入对方工程或改变课程音序、掌握语义和媒体边界。
- 2026-07-14 再审对两个项目的位图做全量 SHA-256 交叉比对：星龙工坊 `8,837` 个 PNG/WebP/JPEG/GIF，与 `keyboard_captain_design`、`keyboard_captain_concepts`、`keyboard_captain_assets` 和 `G:\DevProjects\MidiInputProbe` 的 `3,563` 个位图之间，完全相同文件为 `0`。这只能证明没有原文件/原截图被直接复制，不能替代人工构图与外部相似性审查。
- 同次再审直接打开 `http://127.0.0.1:4173/`，页面标题为“星龙音阶工坊”，可见星芽、音阶岛和月球基地路线；星龙运行身份仍为 `overhaul-343a-p2`。琴键小队长的应用名为“琴键小队长”，HarmonyOS bundle 为 `com.dashun.midiprobe`，工程边界未发生交换。
- 从现在起，临时附件失效时不得用同一 Temp 目录中“时间相近”或“画面相似”的其他图片替代。必须通过原附件、当前页面 URL、任务标题、应用角色/场景标识或已登记截图路径确认项目身份；无法确认时只报告附件不可读，并从本项目源码/正式截图证据核查，不能跨项目猜测。
- 给支线发消息前新增项目身份守卫：消息中的角色、关卡 ID、界面对象、工作目录和证据路径必须全部属于接收任务；若出现 `MidiInputProbe`、`keyboard_captain_*`、琴键小队长、音乐小火车或车厢等另一项目标识，星龙工坊消息必须停止发送并重新核对。

## 2026-07-14 `overhaul-343a-p2` LS08 与第三章出口正式独立裁决

裁决：`passed_browser_baseline / chapter3_ls01_ls08_passed / chapter4_lp01_lp02_unlocked / release_art_device_external_evidence_missing`。

- 提交边界通过：当前冻结提交为 `d218df468aa7458b672fc540bd3996752b81e9ef`，运行身份为 `overhaul-343a-p2`，工作树在复核前后 clean。LS08 的运行、专项、V2 合同、PWA/version 和 gate log 已进入提交；没有 Chapter 4 运行、未批准媒体、语音、音效或课程阈值混入。
- 主管独立复跑 LS08 专项为 `118/118`。可见 C-D 带路与四组隐藏双音分开；C-C 需要真实释放/重武装；首个完整两音回答被冻结；wrong、pair compare、assisted、strong、modeled、整组重听、跨 session、触屏/MIDI/实验麦克风、声音恢复和页面外 pointerup/pointercancel 均保留真实证据，修对或跨 session 不回填 stable。
- LS08 V2 固定目录三连内部 SHA-256 均为 `92ab00d2dec178dd33db2a937eceac1aa0408d4ddbff03be09d5555c0ca0219f`；每轮 6 视口 x 14 实际 phase = 84 个状态，零 failure、零 browser error、零 hidden target carrier，`runtimeIntegrationAllowed=false`。冻结 JSON SHA-256 为 `687E0F7913871BF560F93378D15BB6143F6454090AB47DFBEB1EE12D197CD115`，8 个源文件 bytes/hash 与当前提交一致。
- 通用教学区合同重新通过：6 视口、零失败/错误，内部 SHA-256 `b3030f4ec79e36ed667c43a062cea5325ac3d6478bf0c362bd3b3efd58b36d7a`。旧第三章媒体合同重新通过：6 视口、零失败，内部 SHA-256 `9c66ebbf3cfe5cee717c86947b2909b96b7aa76c0c3f0cd270caba881cbcccf5`。这证明 LS08 没有破坏既有教学区和 LS01-LS07 保护区。
- 共享回归独立通过：LS06/LS07 `64/64`、LS05 `65/65`、LS04 `39/39`、Chapter 3 visible `74/74`、儿童音名 `183/183`、sessions `72/72`、clean-state `124/124`、M03/garden `32/32`、continuity `14/14`、assembly `39/39`、workshop `36/36`、roof `97/97`、M01 `17/17`、Xingya suit `23/23`、staff repair `27/27`、staff readability `13/13`、staff mini `20/20`、palette `17/17`、contrast `9/9`、motion `19/19`、audio settings `13/13`、input `12/12`、iPad a11y `43/43`、PWA `7/7`、quick 与 strict bundle。Strict bundle 保持 41 个运行文件、1,641,265 bytes。
- 原尺寸审图确认地图进入、带路、pair 播放、等待第一/第二声、wrong、pair compare、assisted、visual-assist、sound-paused、根须完成、未计分地底回声和地图休息层级可读；普通孩子界面与 ARIA 使用字母音名，唱名只在小恐龙气泡。家长端只写“两个声音的先后记忆”和首次完整回答，不声称节奏、速度、低音或绝对音感。
- 当前 V1/V2 84 张对应 PNG 像素逐张完全一致；72 张文件字节一致，12 张只是 PNG 编码/元数据不同。`docs/20` 顶部旧记录的 80/4 字节统计已过期，不能继续作为精确数量事实，但没有像素、布局、文案、控件或答案 carrier 回归。
- 第三章故事完成后只播放一次未计分 `C4 -> C3` 地底回声并回地图，地图显示地底入口；不会自动创建 `C4-01`。clean `4/4` 可新增 LS08 stable，但不写 retained；温和帮助和跨 session 仍可完成根须故事而不冒充 stable。
- 人工审图同时确认发布缺口：花园关卡仍是扁平 CSS/线稿，明显低于地图 3D 美术成熟度；当前只能称 browser teaching/logic passed，不能称成熟发布美术。
- 该裁决把 `docs/45` 降为已完成历史工作单，并把 `docs/46` 晋升为下一唯一正式运行工作单。只解锁 `C4-01 / LP01-LP02`；LP03+、完整咚咚、低音谱表、左手、Chapter 5 和所有媒体运行集成继续锁定。
- 仍为 missing：实体 iPad Safari、真实 MIDI、原声钢琴麦克风、耳机/扬声器/iPad 人工听审、幼儿钢琴教师、3-5 名儿童、最终素材来源、外部相似性、远程备份、原生工程、TestFlight 与商店证据。

## 2026-07-13 LS06/LS07 garden-art-v3 独立媒体裁决

裁决：`technical_source_package_passed / individual_props_partial / progression_placement_missing / runtime_integration_forbidden / release_clearance_missing`。

- 主管没有沿用媒体任务的自审结论，重新读取 `manifest.json`、`audit.md` 和生成脚本，直接查看 22 件透明接触表、knot3 拒绝证据及 LS06/LS07 的 visible-guide、awaiting-response、complete 原尺寸合成。22 件独立道具的 3D clay 材质、主体完整度和低龄可读性明显优于当前扁平运行占位，可保留为下一轮整合候选；它们仍不是完整场景或发布美术。
- `ls06-vine-knot-3` 的原始花苞遮住后方藤条，alpha 删除版本又留下硬边洞，独立审图确认应保持 `rejected_visual_occlusion_hole / selected=false / usableInLs06Progression=false`。LS06 只保留 knot0、knot1、knot2、knot4 四步，arch 只用于完成态；LS07 knot0-4 仍是 `unplaced_source_extra`，不得把编号当作已批准的教学语义。
- 初次按交接建议执行 `build_candidate.py --verify` 时，主管发现该命令实际先删除并重建 manifest/audit/透明件，会把 `repeatBuild=passed/stable/84` 降回 `not_yet_repeat_verified`。媒体任务已修为真正只读验证，并把重建与 `--repeat-verify` 分开。
- 修正后主管再次独立执行只读验证：前后均为 90 个文件，SHA-256、长度和 UTC 时间戳变化数均为 0；manifest 保持 `repeatBuild=passed / stable=true / verifiedFileCount=84`。脚本 SHA-256 为 `309A614FD1AD87568BCC3428E0993D53554854578172DBC6DB4638593FC86879`，与 manifest 一致；透明门禁 22/22、实际已放置资产几何 156/156、28 张冻结 UI 合成保护区、当前运行引用 0 均通过。
- 28 张合成只证明中性声源、同权候选对和完成物不会越过冻结保护区；LS06 四个进度藤结和全部 LS07 藤结没有进入真实 UI 进度板。合成仍保留旧白色轨迹圈、浅蓝占位和扁平背景，3D 道具与运行场景材质明显不统一，因此不能证明进度可读、落地、无遮挡、成熟方向或 live runtime 可用。
- 后续媒体里程碑只能在 343a 冻结后，基于最新冻结截图制作“统一花园场景 + clean props + 移除旧白圈/浅蓝占位 + 明确四步进度”的完整整合板；在该板、逐文件来源/相似性和运行回归通过前，继续保持 `runtimeApproval=false / integrationAllowed=false / releaseCleared=false`，不得复制到 `assets/runtime`。

## 2026-07-13 `overhaul-342a` LS06/LS07 正式独立裁决

裁决：`passed_browser_baseline / ls06_ls07_teaching_contract_passed / ls08_dispatch_unlocked / release_art_and_external_evidence_missing`。

- 提交边界通过：冻结提交 `e6e27cc1fee57dc0eb2ed4a46f5b6dbb13176ff6` 只包含 LS06/LS07 运行、专项、坐标合同、PWA/version 断言和 `docs/20`；没有混入 LS08、候选媒体、主管课程文档、语音或音效集成。复核前后工作树均 clean。
- 主管独立复跑 LS06/LS07 专项为 `64/64`。两次可见带路与四次隐藏呼叫分开；C/G、E/F 各自 `2/2`；首答、错后修复、同权 pair、候选外输入、strong、modeled、visual-assist、touch/MIDI/mic、声音恢复、跨 session、stable 和家长证据均通过。LS06 休息只宣布回声藤结果，LS07 休息才宣布边界花结果，guide-rest 和 modeled-rest 不冒充完成。
- LS06 固定目录连续三次六视口合同内部 SHA-256 均为 `a94dae4345dfa377f6e58f895907f922f0f79ddcfcb59711cde847258e0b3f03`；LS07 在干净验收服务上连续三次均为 `264c7f71a43419b5cf0dcd74f53db25771f6d005d29171c2280ff6aaa7fb1ed2`。每关为 6 视口 x 13 状态 = 78 个状态记录，`phaseMismatch=0`、隐藏 target carrier=0、隐藏 dynamic key=0、overflow=0、failure=0、browser error=0，`runtimeIntegrationAllowed=false`。
- 一次 LS07 合同在连续长时共享回归后的旧 `4173` Python 服务上出现首次导航 30 秒超时；该服务已运行三天且本地响应约 0.8-1.0 秒。新启的同目录 `4174` 验收服务响应约 30ms，随后 LS07 固定目录三连完全稳定。该事实记录为审查环境负载警告，不被删除，也不作为运行教学失败。
- 独立共享回归全部通过：LS05 `65/65`、LS04 `39/39`、Chapter 3 visible `74/74`、儿童音名 `183/183`、sessions `72/72`、clean-state `124/124`、M03/garden `32/32`、PWA `7/7`、input `12/12`、audio settings `13/13`、iPad a11y `43/43`、motion `19/19`、palette `17/17`、contrast `9/9`、Xingya suit `23/23`、M01 `17/17`、assembly `39/39`、workshop `36/36`、roof `97/97`、staff readability `13/13`、staff repair `27/27`、staff mini `20/20`、continuity `14/14`、generic/legacy Chapter 3 zones、quick 与 strict bundle。
- 人工原图确认可见带路、等待、wrong、pair、assisted、sound-paused、visual-assist、complete 和地图休息的教学层级可用；普通孩子界面只显示音名字母，唱名只在小恐龙气泡。当前花园仍是扁平 CSS/线稿，明显低于地图 3D 美术质量，因此只能通过 browser logic，不能称成熟发布美术。
- 该裁决只解锁 `docs/45` 的 LS08 单独运行工作单，以及媒体任务依据冻结合同生产 LS06/LS07 source-clearance 候选。LS08 之外的运行、任何候选媒体 runtime 集成、第四章和全局重构继续锁定。
- 仍为 missing：实体 iPad Safari、真实 MIDI、原声钢琴麦克风、耳机/扬声器/iPad 人工听审、教师、3-5 名儿童、最终素材来源、外部相似性、原生工程、TestFlight 与商店证据。

## 2026-07-13 LS06/LS07 花园美术 v1 独立裁决

裁决：`foreground_source_technical_pass / background_art_direction_partial / actual_ui_composite_missing / runtime_forbidden / v2_returned`。

- 主管直接查看三个背景方向、LS06/LS07 原始 prop sheet、透明棋盘、1024x768 七态合成和被拒的星芽动作表。21 个透明道具的边缘、主体完整度和无洋红残留可保留；两侧候选使用同一透明文件复制，尺寸、亮度和高度同权，未发现 C/G 或 E/F 答案 carrier。
- 媒体自报的 156/156 只覆盖前景 bbox；manifest 明确把全屏背景写成 `not_scored_full_frame_base_layer`。方向 C 左侧大叶片和岩柱进入角色/气泡背景，右侧橙叶靠近进度区，尚无真实文字、角色轮廓或控件对比证据，因此不能用前景零碰撞证明背景安全。
- 现有 audit-only 合成只画保护矩形，没有保留 342a 的真实 UI、键盘、星芽、气泡、重听和进度。1024 下中央声源约 61px、左右道具约 105px，花、石和完成拱门缺少清楚地面接触，视觉上像悬浮贴层；该证据不能支持成熟运行集成。
- 方向 C 比当前扁平 CSS 精细，但仍偏平面纸艺和单一绿青色；透明道具更接近 3D clay，前后景材质语言不统一，也未达到现有月球地图的动画电影/手办成熟度。方向 C 降为 `comparison_candidate_art_direction_partial`，不得继续写 selected runtime source。
- 星芽动作表是通用红色背刺恐龙，没有三颗可数绿色头芽，虽然带星星背包，仍违反角色身份合同；保持 `rejected_character_identity`，不得裁切或复制到运行目录。
- 媒体任务已收到 v2 窄修：只在候选目录生成更接近月球地图的 3D clay 空花园方向、真实 342a UI 合成、背景保护区可读性和地面接触证据；可做一次批准模型表参考下的星芽动作重试。运行代码、课程、音频和 `assets/runtime` 继续冻结，所有结果仍为 `runtimeApproval=false`。

## 2026-07-13 观察、设备与录音门禁事实修正

- 项目根是有效 Git 工作树；嵌套 WAV 和授权 PDF 探针均命中当前 `.gitignore:39 private-recordings/**`，`private-recordings/README.md` 退出 1、保持未忽略。技术隔离为 `passed`，录音/授权接收仍为 `closed / not requested`。
- `docs/36/38` 的 Web 参考已从 338a 更新为冻结的 342a；正在开发的 343a/LS08 不能冒充批准基线，更不能冒充 Core MIDI、麦克风、AVAudioSession、真机时延或 TestFlight 证据。
- `docs/37` 不再错误声称“没有有效 Git”。342a 可用于一名成人陪同、默认不录音录像和不收集身份的方向性观察；LS08、第四章和第五章仍需各自冻结后才能观察对应内容。最终教师、3-5 名儿童、实体 iPad 和最终美术/声音后的复测仍为发布阻断项。

## 2026-07-13 LS05 花粉铃/三花方向 C 独立裁决

裁决：`source_clearance_direction_c_passed / runtime_forbidden / release_art_missing / external_similarity_missing / physical_device_missing`。

- 主管独立运行 `python concepts/runtime-candidates/ls05-pollen-flowers-v1/build_candidate.py --direction c --verify`；17/17 媒体文件哈希保持一致，341a 合同 66/66、零几何失败，alpha 连通域 6/6。
- 独立扫描 `app.js`、`index.html`、全部运行 CSS、`service-worker.js` 和 `package.json`，候选目录及候选文件名运行引用为 0。
- 人工审看透明棋盘、1024x768 awaiting/sound-paused 与 1194x834 complete：三朵 neutral 花确为同一文件复制，同形同权；暂停铃没有 C/D/E、音高、方向或角色答案线索；透明边缘未见白边、洋红残留或意外悬空碎片。
- 方向 B 的绘制质感更成熟，但在 1024 CSS px 安全槽内中性花过窄；继续放大会进入进度保护带。方向 C 小尺寸可读性更好，因此只获 source-clearance 方向选择。
- 方向 C 仍与 3D 星芽的材质语言不统一，完成态偏基础矢量素材，不能称为成熟 App 发布美术。342a 冻结后坐标、视觉层级和实际运行叠层必须重新审查；当前不得复制到 `assets/runtime`。
- 媒体自审文件曾残留“运行引用 pending scan”，已退回媒体任务改为通过/0；这是一处文档状态修正，不改变图像、脚本或运行批准边界。

## 2026-07-13 第四、五章音名显示规划纠偏

裁决：`global_note_name_policy_extended_to_chapters_4_5 / runtime_still_locked`。

- `docs/14` 的两通道规则现覆盖全五章：琴键、任务、地图、路线、谱垫、反馈、特效、结果和普通物件只显示字母音名；只有星芽/咚咚对话框可显示唱名。
- 两个音区同时出现时，普通孩子界面使用 `低音 C`、`中央 C`、`下面的 C` 和黑键组定位，不显示普通 `低音 Do`、`Do/C` 双标或 `C3/C4` 科学音高；家长/教师证据仍记录 `C3/C4`。
- Chapter 4 公开任务 `LP02` 改为 `低音 C 的家`；Chapter 5 公开任务 `TH01/TH02` 改为 `两个 C 说你好`、`G 回声接力`。角色台词仍可说 Do/Sol，课程音高、顺序、故事结果和掌握阈值未改变。
- `docs/03/24/34/35` 已同步孩子动作、谱垫、脚印、桥路线、两小节表格和未来自动化门禁。第四、五章仍无运行实现，不能据此宣称浏览器通过。

## 2026-07-13 LS08 解锁前课程合同预审（历史，已由 342a 裁决替代）

当时裁决：`spec_consistency_corrected / runtime_still_locked / LS06_LS07_gate_waiting`。该预审随后由 `342a`、`343a-p2` 和最终 `344a-p3` 裁决逐步取代；当前有效状态以上方 2026-07-17 晋升节、`docs/45`、`docs/46` 和 `docs/49` 为准。

- 预审发现 `docs/32` 旧段落曾要求 LS08 可见带路困难后，下一 session 直接开始四组隐藏 check；这与 `docs/24/45` 的补教逻辑冲突，也会让最需要教学的孩子跳过带路直接进入考试。
- `docs/03/32/33/45` 已统一：顺利带路可在同一短课进入一次 check；困难时在中性根芽休息，下次先重做更短的 C-D 可见带路；连续两个 guide session 仍需 strong/modeled 时回到 LS05 C/D 单音补教，不直接开放隐藏双音 check。
- C-C 跨地图/刷新连续性补充 `secondOnsetRequiresFreshRearm`：保留第一输入和真实证据，但不能把活动 pointer、仍按住的 MIDI note 或未经过安静重置的麦克风持久化成已重新武装；恢复后必须观察新的释放/中性阶段再接收第二起音。
- 这些修正在当时只提高未来工作单一致性，不解锁 LS08；该前置条件后来由 342a 解锁并在 343a-p2 完成验证。

## 2026-07-12 `overhaul-341a` LS05 正式独立裁决

裁决：`passed_browser_baseline / ls05_teaching_contract_passed / ls06_ls07_dispatch_unlocked / release_and_external_evidence_missing`。

- 提交边界通过：运行提交 `34277625400d1f1a4c60a5b29ed267b1f090bdf0` 只包含 LS05 运行、专项、合同、PWA/version 及 gate log；补充提交 `af9293afc5386cc71ac594bec72e0307476ee205` 只更新六个 341a 版本断言。工作树 clean，未混入 LS06+、媒体候选或主管课程文件。
- 主管在最终候选上连续三次运行 `check:chapter3-ls05`，均为 `65/65`。专项原子证明 target-playing 早输入只进 observation，孩子主动重听另行计数；C/D/E 严格 `2/2/1`、首答计分、候选覆盖、错误八度/黑键、pair、strong、modeled、visual-assist、touch/MIDI/mic、声音恢复、跨 session 和家长证据均通过。
- LS05 六视口十一状态合同连续三次内部 SHA-256 均为 `8dbadee17186763ab78269222362700ff174a7803e400ebb4df5ab7355a0a65f`；每视口 11 态、零 failure、零 browser error、零 state-to-phase mismatch，最终文件 SHA-256 为 `A4684E42E60377AA4911CCB502545C57701B14F1F4103893E61674AA02C8AC8F`，`runtimeIntegrationAllowed=false`。
- 独立共享回归通过：LS04 `39/39`、visible `74/74`、儿童音名 `160/160`、sessions `72/72`、clean-state `124/124`、M03/garden `32/32`、PWA `7/7`、input `12/12`、audio settings `13/13`、iPad a11y `43/43`、motion `19/19`、palette `17/17`、contrast `9/9`、Xingya suit `23/23`、workshop `36/36`、assembly `39/39`、M01 `17/17`、roof `97/97`、staff mini `20/20`、staff repair `27/27`、staff readability `13/13`、continuity `14/14`、generic/Chapter 3 zones、quick 与 strict bundle。
- 原尺寸审图确认等待态三花同态、目标播放无答案、wrong 先呈现孩子音、pair 同权、assisted/visual-assist 分层、答后角色气泡连接 letter-solfege、旧身份和“看着找”控件在下一题前清除、五格与三花完成态清楚。美术仍是原型级，不能替代最终素材生产和儿童理解观察。
- 该裁决只解锁 `docs/44` 的 LS06-LS07 工作单。LS08、第三章出口、媒体运行集成、实体 iPad、真实 MIDI/原声钢琴麦克风、教师、3-5 名儿童、最终来源和外部相似性仍为 missing。

## 2026-07-12 `overhaul-340d` v3 正式独立裁决

裁决：`passed_browser_baseline / note_name_policy_passed / phase_capture_integrity_passed / ls05_dispatch_unlocked / release_and_external_evidence_missing`。

- 提交 `0c14cd9fa3cdfe20e1fe22491e1b526c984c3b8e` 只包含 Chapter 3 v3 证据脚本/JSON、package gate 和 `docs/20`；运行 JS/CSS、课程、声音、媒体与 LS05 均未改变。v1、v2 历史文件继续保留各自拒绝原因。
- 主管使用同一正式截图目录独立连续运行三次 v3；三轮均为六视口、每视口九状态、零 failure、零 browser error，内部 SHA-256 均为 `063115a50e95d3cd1a5c7b7ef439debfe2ccb18fbeea9d7b6f3ddcc11f1f18c1`。
- 54 个状态记录逐项命中显式 phase：`playing -> target-playing`、`waiting -> awaiting-response`、`wrong -> wrong-feedback`、`assisted -> assisted`、`complete -> complete`；`phaseMismatches=0`。reduced-motion 的允许集合被显式写入，不再靠隐式漂移通过。
- 通用 340D v2 合同独立通过，内部 SHA-256 为 `16a7cf0c921d9fcf3cc83d3ce7981446eeebcc2575ed6022b0098b8d4797f67d`。独立回归通过：Chapter 3 visible `74/74`、LS04 `39/39`、儿童音名 `160/160`、sessions `72/72`、clean-state `124/124`、PWA `7/7`、quick 与 strict bundle。
- 人工运行核对确认孩子可见路线和键帽使用音名字母；唱名只留在小恐龙对话框。普通、减色、高对比、当前/完成/未来节点和伪元素都受同一门禁约束。
- 该裁决只解锁单独 `C3-04 / LS05`。实体 iPad Safari、真实 MIDI/声学钢琴麦克风、人工听审、教师、3-5 名儿童、最终素材来源、外部相似性、原生工程与发布证据仍为 missing。

## 2026-07-12 `overhaul-340d` v2 独立复核与 v3 退回

裁决：`navigation_resilience_passed / phase_capture_integrity_p1 / 340d_v2_not_promoted / ls05_locked`。

- `aaf0426b0f7f284812d49d612b7a236b1aca810e` 仅新增 v2 合同脚本/JSON、package 指向和 `docs/20`；运行 JS/CSS、课程和媒体未变。
- v2 将 navigation/reload/boot 改为 30 秒有界 helper，失败诊断包含 URL、阶段、readyState、boot、Service Worker 与 cache；清除了 Chapter 3 URL 的 340a tag。首次独立运行不再出现 page.goto 12 秒超时。
- 主管使用正式固定截图目录连续运行三次：三轮均为六视口、九状态、零 failure/console error，但内部哈希为 `424e29de...`、`45098116...`、`45098116...`。去掉 `generatedAt/contractSha256` 后唯一差异是首个视口的 `playing` 记录：第一次 `geometry.phase=awaiting-response`，后两次为 `target-playing`。
- 现有脚本先等待 `target-playing`，再通过另一次 Playwright round-trip 调用 geometry；760ms 播放窗可在两次调用间结束。合同只检查九个记录名完整，没有检查记录名与实际 `geometry.phase` 一致，因此把 waiting 几何贴成 playing 仍报零失败。
- v3 只允许把预期 phase 与几何采样原子化，并建立 stateName -> actual phase 的完整性断言；不得把 playing 放宽为多个 phase、增加任意 sleep 或修改 runtime。v1/v2 继续作为 rejected evidence history 保留。

## 2026-07-12 `overhaul-340d` v1 独立复核与 v2 退回

裁决：`runtime_and_note_name_behavior_passed / contract_navigation_resilience_p1 / 340d_v1_not_promoted / ls05_locked`。

- 提交边界通过：`35e2b43b8992b559233ca5ee88e1e5874c0eb5bd` 紧接 `af13deb`，未混入主管课程文档、媒体候选、音频或截图。
- 独立通过：儿童音名 `160/160`、Chapter 3 visible `74/74`；人工原图确认 M07 为 `C-D-E-D-C`，FG03 为 `E-F-G`，普通/减色/高对比未来节点均可读，no-reading 伪元素显示 `E` 而不是 `Mi`。
- 独立三连合同第一轮失败于 `chapter3-media-zone-contract-340d.mjs:86`：reduced-context 再次 seed 时 `page.goto(... domcontentloaded)` 的固定 `12000ms` 超时；随后本地服务五次 HTTP 响应为 `22-109ms`，不能把失败简单归因于服务离线。
- 同一脚本默认 URL 仍写 `check=chapter3-media-zones-340a`；通用 340D 脚本的 M03/staff 导航和 boot 也保留固定 12 秒上限。功能测试通过不能替代连续可复现的合同证据。
- v2 只允许修两份合同的导航/重载/boot 有界等待、诊断、340D check tag 和 v2 证据身份；不得改运行 CSS/JS、课程、音序、mastery、媒体或开始 LS05。v1 作为 rejected history 保留可追溯，v2 需 Chapter 3 连续三次、通用连续两次内部哈希一致后再审。

## 2026-07-12 儿童音名与角色唱名载体裁决

裁决：`curriculum_policy_locked / prototype_behavior_passed / regression_gate_active`。

- 儿童可见的琴键、任务/目标卡、当前零件、路线节点、星垫、五线谱旁提示、定位提示、答对答错反馈、特效、结果、地图标签和花园物件只显示音名字母 `C D E F G`；后续 A/B 同样遵守其独立进入门禁。
- 只有小恐龙的对话框可以可见地使用唱名 `Do Re Mi Fa Sol`。角色应说清动作关系，例如“我唱 Do，你来弹 C”，而不是把 `Do/C` 做成普通徽章或要求孩子“唱 C”。
- 家长端可以保留 `C / Do` 双身份；孩子端无障碍说明与可见控件一致，只使用字母音名和必要键位定位。隐藏听辨和少提示检查仍禁止通过 ARIA、title、alt、隐藏文字、class、颜色、动作或目标键泄题。
- 课程文件中的 `Do/C` 是成人理解用的映射简写，不是字面 UI 规范；历史截图和 gate log 保留历史事实，不得被复制为当前界面。
- 当前原型验收必须包含 M07 可见路线 `C D E D C`、FG03 全字母路线、键帽字母-only，以及普通/减色/高对比、1024x768/1194x834 下的可见文本扫描；不得改变音高、MIDI、旋律、计分、mastery 或提示时序。

## 2026-07-12 `overhaul-340c` 候选独立审查与 340d 窄修裁决

裁决：`runtime_and_visual_behavior_passed / evidence_resilience_p1 / 340c_not_promoted / ls05_locked`。

- Git 边界通过：`af13deb910c8ecb10e26f6b7b67f842fdd9013cc` 紧接 `b431c1ab347dd813ac1aa712a05c5f7ab150cf55`；候选提交未混入主管课程文档、`concepts/**`、`audio/**`、截图、私密录音或未批准候选素材。
- 人工审图通过：M07 是单角色、单气泡、五点 `C-D-E-D-C` 路线；FG03 是单角色、单气泡、三点 `E-F-G` 路线；琴键、当前星垫、路线和普通反馈只显示音名字母，角色气泡单独承担 `Do -> C`、`Mi -> E` 联系。
- 主管独立通过 child-note-names `55/55`、assembly `39/39`、identity `36/36`、M01 `17/17`、iPad a11y `43/43`、staff readability `13/13`、LS04 `39/39`、input `12/12`、palette `17/17`、suit `23/23`、PWA `7/7`、roof `97/97`、sessions `72/72`、clean-state `124/124`、staff-mini `20/20`、staff-repair `27/27`、continuity `14/14`、motion `19/19`、audio settings `13/13`、contrast `9/9`、quick 与 strict bundle。
- 340C 合同 ID、baseline、九态、六视口和 `runtimeIntegrationAllowed=false` 正确；内部 SHA-256 为 `a61253dcdb366f907afe64428baacbb7635f54974b7710ce7a21a2ad03ee5b70`。历史 340A V2 内部 SHA-256 仍为 `ed88544c6878fe769456f0fc4687ef04eb3a36eea5c61541deb9be9eb211f232`，当前文件 SHA-256 为 `11299884b8c7837812c5968ad6c75f53a4f169a803c7cbf412a19fa4796e547b`，没有被候选生成器覆盖。
- P1：340C 合同单独复跑曾在第三次错误前等待 `awaiting-response` 时 6000ms 超时，下一次复跑才恢复通过；Chapter 3 visible 与其他门禁并发时也曾因固定 520ms 取样错过 scanning。当前证据不能把一次绿灯当作连续可复现。
- P1：新补的 M07/FG03 减色原图暴露 `#appShell::after` 审计标签继承基础全屏伪元素尺寸，1024x768 下实际形成约 990x744 的巨大椭圆暗层并压暗路线；“字母仍有非零尺寸”不足以证明该模式可读。
- P1：首版路线可读性断言只读取字母子元素自身的 `opacity=1`，没有计算父级 upcoming 标签的 `.64/.52` 透明度，因而会把实际被压暗的 F/G 或 M07 后续字母误报为 fully visible；辅助模式必须按父级/累计有效透明度和原图审查。
- 340d 只允许修可靠状态观测、合理负载下的合同等待/诊断、静态“读唱名”改“读音名”、减色/无阅读审计角标的全屏继承问题，并补 M07/FG03 普通、减色、高对比两尺寸路线专项；不得改音序、提示时序、mastery、故事、媒体或开始 LS05。

## 2026-07-12 `overhaul-340a` v2 窄修闭环与正式裁决

裁决：`passed_browser_baseline / ls04_hidden_listening_passed / chapter3_incomplete / release_and_external_evidence_missing`。`overhaul-340a` 晋升为最新主管批准浏览器基线，只解锁 `C3-04 / LS05`；不解锁 LS06+、正式媒体运行集成、真机或发布声明。

- 初审运行与教学全部通过，但 Chapter 3 媒体坐标合同 v1 缺 `sound-paused`，因此当时退回且 `339d` 暂时保留基线地位。
- 窄修只改 `chrome-test/chapter3-media-zone-contract.mjs`、`package.json`、v2 合同/截图和 `docs/20`；v1/v2 源哈希对比证明 `app.js`、HTML 和全部运行 CSS 未改变。
- v2 固定九态为 garden-entry、sound-paused、reference、playing、waiting、wrong、assisted、complete、reduced-motion；六视口均 `9/9`，缺失、意外或重复状态会直接失败。
- v2 合同 ID `chapter3-media-zones-overhaul-340a-v2`，内部 SHA-256 `ed88544c6878fe769456f0fc4687ef04eb3a36eea5c61541deb9be9eb211f232`，文件 SHA-256 `A54B44AF7EA20037DD114E261279AA39296A87D9BAFC48A1D10A23503606D034`，零 failure、零 browser error，`runtimeIntegrationAllowed=false`、实体 iPad Safari missing。
- 主管再次复跑 LS04、Chapter 3 zones、quick 和 strict bundle；运行包保持 41 文件、`1,641,265` bytes。1024x768 DPR2 与 1194x834 DPR2 的 `sound-paused` 原图提示清楚、无重叠、键盘和重听仍可见。
- 仍缺实体 iPad Safari、真实 MIDI/声学钢琴麦克风、人工听审、教师、3-5 名儿童、最终来源、外部相似性和发布清关；这些缺口不因浏览器基线晋升而改变。

## 2026-07-12 `overhaul-340a` v1 初审历史裁决

裁决：`rejected_as_baseline / runtime_behavior_passed / media_coordinate_contract_p1`。`overhaul-339d` 继续作为最新主管批准浏览器基线，`LS05` 与正式媒体运行集成继续锁定。

- 独立通过：`check:chapter3-ls04`、`check:chapter3-visible`、`check:supervisor-339c` 14/14、sessions、clean-state、M03/garden 32/32、PWA 7/7、input 12/12、audio settings 13/13、iPad a11y 43/43、Xingya suit 23/23、assembly 13/13、M01 17/17、staff mini 20/20、staff repair 27/27、staff readability 13/13、palette 16/16、contrast 9/9、motion 19/19、quick 与 strict bundle。
- 运行语义通过：声音关闭、音量 0 与 AudioContext 失败会进入 `sound-paused` 且不评分；LS04 只写 `ls04Completed`，不伪造整章完成；实验麦克风不授予 stable/retained；第一、二章及 LS01-LS03 证据未被改写。
- 合同哈希复核：通用合同 `teaching-zones-overhaul-340a-v1` / `974792083d817e8b9722d6415a77bc61db4811b9d5e1c760104e9e3722c62640`；Chapter 3 合同 `chapter3-media-zones-overhaul-340a-v1` / `fc44012398898a530aaf6c8ebbe922be582e76cc55af9a7932b1e0118937611a`。
- P1：`docs/41_LS04_SUPERVISOR_ACCEPTANCE_CHECKLIST.md` 要求 Chapter 3 专用合同覆盖 `sound-paused`，但 v1 脚本、`stateCoverage`、六视口记录和截图目录都只有 garden-entry、reference、playing、waiting、wrong、assisted、complete、reduced-motion 八态。现有测试也没有固定 expected-state 完整性断言，因此“合同脚本通过”不能证明要求状态齐全。
- 窄修边界：原型任务只补真实 `sound-paused` 六视口几何、1024/1194 原图、九态完整性断言和合同 v2；不得改运行 JS/HTML/CSS、课程、会话/mastery、角色、声音或 LS05+。媒体任务保持 runtime forbidden，等待合同 v2 独立复核。
- 仍为 missing：实体 iPad Safari、真实 MIDI/声学钢琴麦克风、教师、3-5 名儿童、人工耳机/扬声器/iPad 听审、最终来源、外部相似性与发布清关。

这份文件规定三个星龙工坊任务怎样分工、交接、复核和报告证据，避免课程、原型、动画和声音同时修改同一处，也避免某个支线把“自己做完了”直接等同于项目通过。

## 当前任务结构

| 任务 | 任务 ID | 主要职责 | 主要写入范围 |
| --- | --- | --- | --- |
| `星龙工坊｜课程故事、整体调度与独立审查` | `019f4a2b-d759-7a13-b076-d4fd19a39db6` | 课程顺序、故事世界、教案、角色/场景教学要求、跨任务排期、交接和独立复核 | 课程与故事规划文件、协调审查文件；不直接修改其他支线正在负责的运行代码或声音素材 |
| `星龙工坊｜原型/UI·唯一运行写者` | `019f4aa6-edba-7843-a835-c4b930a388ff` | Web/iPad 原型、界面、交互、MIDI/触控、运行时动画、视觉与设备证据 | `app.js`、HTML、CSS、测试、运行素材、截图和实现日志 |
| `星龙工坊｜媒体·候选素材与工具核验` | `019f4be2-96d7-7403-b862-08788d8e22b1` | Gemini/Grok 工具能力核验、分镜/关键帧、角色台词、录音与声音处理方案、音效素材、透明运行候选和隐私台账 | `docs/28_*`、`concepts/animatics`、`concepts/grok-cli-probe`、`concepts/runtime-candidates`、`audio/source-concepts`、`audio/runtime-candidates`，不直接改运行逻辑或 `assets/runtime` |

## 主管制运行方式

`星龙工坊｜课程故事、整体调度与独立审查` 是本项目的主管任务。它不代替其他任务写代码或做素材，而是负责五件事：

1. 确认当前产品目标和本轮唯一优先级；
2. 查看每个任务正在做什么、是否偏离、是否依赖另一个尚未完成的结果；
3. 把普通建议批量放到下一里程碑，不把“持续关注”变成连续打断；
4. 收到支线自审后做独立复核，决定退回、部分放行或建立新基线；
5. 维护成熟 App 总完成账本，防止界面好看或测试变绿后过早宣布完成。

主管采用**事件驱动**而不是频繁催报：任务开始、用户改范围、支线交接、独立审查发现阻断问题、下一依赖解锁时才发送消息。没有新决定时，主管可以只读查看状态和工作区，不需要让对方回复“已收到”。当前主管目标保持 active，由主管任务持续承担巡检和裁决，不再另开一个会重复发号施令的“二级主管”任务。

### 决策权与用户优先级

| 决策 | 最终负责人 | 其他任务怎样参与 |
| --- | --- | --- |
| 产品优先级、课程目标、故事因果、掌握证据和里程碑是否放行 | 主管任务 | 原型和媒体发现冲突后报告，不自行改变教学语义 |
| 当前里程碑内的代码结构、布局实现和测试方法 | 当前唯一写入负责人 | 在冻结合同内自主完成；主管不逐步遥控实现 |
| 角色、动画、语音、音效候选的制作与来源台账 | 媒体任务 | 主管审核是否可交给原型集成，媒体不能自批 runtime |
| 画面是否符合用户想要的观感与参考方向 | 用户 | 原型必须先回应所在任务中的最新直接反馈；主管不能用旧合同压过用户的新明确取舍 |
| 教学是否真实有效、真机是否可靠、隐私/版权是否可发布 | 教师、儿童观察、真实设备、授权和专业复核共同证明 | 任何单个 Codex 任务都不能代替这些外部证据 |

当用户在某条任务里直接给出最新反馈时，该任务先处理这条反馈。主管只有在反馈会触发课程、版权、隐私、数据或跨任务范围冲突时才插入 `P0/P1`；一般审美和布局修正由当前负责人完成并在交接时统一报告。

### 主管巡检节奏

主管可以随时只读检查任务状态，但只有下列事件产生对外动作：

1. `active -> idle/completed`，说明可能已有里程碑或需要收口；
2. 支线提交正式回执，主管立即进入独立审查；
3. 用户提出跨课程、原型、媒体或发布边界的新要求；
4. 发现 `P0/P1`，继续执行会造成错误或大量返工；
5. 当前依赖通过，下一任务可以正式解锁。

若任务仍在正确处理用户当前要求，巡检只更新主管自己的状态板和待办，不给对方发送“进度如何”“请确认收到”等消息。普通 `P2/P3` 至少等到里程碑交接再合并发送；同一问题不由主管、课程和媒体三方分别重复转述。

### 长门禁、上下文压缩与断线检查点

1. 启动预计超过五分钟的专项、合同三连或共享回归前，任务必须先写清“门禁名、当前计数、冻结源身份和输出目录”；每一轮只有拿到明确退出码与最终数量后才计为完成。
2. 已完成门禁的最终数量、internal hash、源文件 hash 和输出目录一旦回报，即成为本里程碑检查点。只要运行源和门禁脚本未变，context compaction、终端句柄丢失或后来一次未完成运行都不能把该检查点自动作废。
3. 压缩或断线后，任务先读取当前 turn 中压缩前最后的明确回执，再检查仍在运行的进程、输出时间和源 hash；不得因为推理摘要缺失就自行宣布“从零重跑全部门禁”。
4. 没有最终退出码的那一轮必须作废，但只作废该轮。例如 LS08 `2/3` 句柄丢失时，只补跑新的 `2/3`，不能顺带重算已经完成且源未变的 C4 合同三连。
5. 若重复长门禁已经误启动，应在确认没有写坏冻结产物后停止重复进程，保留原检查点并回到真正缺失的下一项。主管可把这种继续运行会造成明显时间浪费或覆盖证据的情况作为一次 `BLOCKER / P1` 纠偏。

### 发消息前的固定检查

主管给任何任务发消息前必须先做以下检查：

1. 读取该任务最近的用户要求、正在进行的 turn 和最后一次承诺范围；
2. 判断对方是 `active`、`handoff_waiting`、`idle` 还是 `blocked`；
3. 判断消息是必须立刻停止错误，还是只影响下一阶段；
4. 检查新内容是否已经在先前合同中，避免重复发送同一要求；
5. 若对方正在正确执行，普通补充只写进本文件的待办队列，不发送；
6. 若必须打断，只发一条短消息，明确“为什么现在必须停”和“哪些工作仍可保留”。
7. 核对项目身份：附件、页面、角色、关卡 ID、目录、截图和术语必须属于接收任务；临时附件失效时不得从 Temp 目录挑选其他图片替代。

### 消息优先级

| 级别 | 什么时候使用 | 是否打断 active 任务 | 例子 |
| --- | --- | --- | --- |
| `STOP / P0` | 继续做会产生课程错误、版权/隐私风险、数据损坏或明显违背用户最新范围 | 立即打断，一次说明 | 改错音符顺序、接入未授权儿童声音、使用受保护形象、覆盖他人文件、用户明确说只改 M08 却继续改 M01-M07 |
| `BLOCKER / P1` | 当前实现方向若不修正，会让整个里程碑证据无效或造成大量返工 | 仅在现在不说就会继续浪费工作时打断 | M08 第二遍仍拆屋顶重装、检查模式提前泄露答案、运行素材直接引用 `concepts/**` |
| `NEXT / P2` | 合理改进，但不影响当前里程碑是否能完成 | 不打断；放入下一里程碑交接 | 更广的场景统一、美术精修、未来 Chapter 3 反馈、CSS 重构 |
| `OBSERVE / P3` | 现象、想法或尚未形成证据的问题 | 不发消息，只记录 | 某张中间截图可能偏挤、以后可比较另一种动效 |

同一里程碑正常情况下最多发送一条启动合同和一条必要的 `STOP/P1` 纠偏。支线自审前不反复追加验收条款；新要求默认进入下一里程碑，除非来自用户最新明确改动或属于安全/课程阻断。

## 当前非打扰状态板

| 任务 | 当前状态 | 当前唯一工作 | 主管现在应做什么 | 下一次允许发消息的触发点 |
| --- | --- | --- | --- | --- |
| 课程故事/主管 | `active / 345d AUDIO-C approved / LP03 dispatch-ready` | 维护课程、故事、成熟 App 总账本与唯一放行裁决；按 `docs/47` 冻结 LP03 范围并独立验收 | 不写运行状态机或媒体；只在会虚构教学证据、串项目、改课程或污染来源的 P0/P1 时介入；普通建议等里程碑交接 | LP03 冻结回执；用户确认 Grok 额度恢复 |
| 原型/UI | `idle / approved runtime 345d / waiting LP03 order` | 下一轮只实现 C4-02 / LP03 的 C 锚石唤醒、D/E 落位、恢复/休息和证据 | 不做 LP04、完整咚咚、低音谱表、左手、美术升级或媒体接入；不得改变 LP01/LP02、Chapter 3、音名或 mastery 合同 | 收到 `docs/47` 窄指令后开始；完成时给新 SHA、专项、合同和全回归 |
| 动画/语音/音效 | `idle / Batch18 frozen / provider spending-limit` | 保留 Batch18 一次真实 CH3-A 失败调用、清洁参考裁切、错误与哈希证据；其余七项停发 | 不改 runtime/课程/主管文档，不上传录音或个人资料，不重试旧 ID、换号或绕过额度 | 用户明确确认充值/恢复合格订阅后，使用全新 ID 从 CH3-A 串行重启 |
| 用户/真机/儿童证据 | `protocols_ready / participants_and_devices_waiting` | `docs/37` 已锁定教师/儿童观察；`docs/38` 已锁定实体 iPad、MIDI、麦克风和音频测试 | 不要求现在提供私密录音、孩子资料或伪造真机截图；先让运行流程稳定 | 冻结纵切后才请求方向性观察；原生 N0/N1 后才执行真机矩阵；最终候选再做 3-5 名复测 |

工作区当前的已复核浏览器基线是 `overhaul-345d-audio-c`，冻结提交为 `2405734`。它保留第一、二章、第三章 `LS01-LS08` 与第四章 LP01-LP02 的课程、session、输入、错误修复、故事和布局结构，并证明 M03、LS01-LS08 与 LP01-LP02 的受控教学音生命周期。它不是 LP03 实现、媒体集成、实体 iPad、真实学习效果或 Release 基线。任何 source-only 视频或后续未冻结运行都不能冒充新基线。

### 当前命令队列

| 顺序 | 所有者 | 指令 | 当前动作 |
| --- | --- | --- | --- |
| `NOW-RUNTIME` | 原型/UI | 按 `docs/47` 只做 `C4-02 / LP03`：继承 LP02 C 锚石，依次完成 C 唤醒、D/E 落位、自然停点与证据分轴 | `dispatch_ready / start_from_2405734 / do_not_merge` |
| `NOW-MEDIA` | 媒体 | Batch18 已真实触发 1 次 CH3-A 视频调用并因 outer 402/tool 403 spending-limit 冻结；0 原片，其余七项停发 | `batch18_quota_failed / recharge_required / runtime_and_release_forbidden` |
| `NEXT-RUNTIME` | 原型/UI -> 主管 | LP03 冻结后只读独立复核世界连续性、三步声音门禁、session/恢复、played/needsPractice 与提交边界 | `waiting_lp03_handoff / do_not_merge` |
| `NEXT-LP04` | 主管 -> 原型/UI | 只有 LP03 独立通过并单独提交后，才编写并派发 LP04 窄工作单 | `runtime_locked / do_not_dispatch` |
| `NEXT-AUDIO-AUDIT` | 主管 | 现有离线 LS04 包只保持历史通过；等待真人耳机/扬声器/iPad 听审，不能用自动响度与哈希冒充听感 | `offline_package_passed / runtime_forbidden / human_and_ipad_listening_missing` |
| `BASELINE-REVIEW` | 主管 | `345d` 的源码、session、M03/LS01-LS08、LP01/LP02 教学音、音名、PWA、共享回归和严格 bundle 已独立通过；既有布局合同仍作未改布局的基线 | `passed_browser_baseline / full_audio_lifecycle_passed / external_evidence_missing` |
| `NEXT-1` | 主管/基础设施 | 建立有效 Git 与私密录音忽略验证；不处理真实录音 | `passed_repo_ignore_lfs / baseline_commit_b431c1a` |
| `NEXT-2` | 原型/UI | 按本文件冻结启动包窄修 M03 重复/角色主语与 S01 花园入口 | `completed_at_338a / independently_passed` |
| `NEXT-3` | 原型/UI | 按 `docs/32` 实现 Chapter 3 可见首切片 | `completed_at_339d / independently_passed / LS04_unlocked` |
| `NEXT-NATIVE` | 未来独立原生任务 | 按 `docs/36` 依次做 N0 平台探针、N1 教学纵切、N2 五章迁移、N3 TestFlight/商店 | `spec_ready / web_reference_ready_at_345d_audio_c / task_not_created / locked_by_mac_xcode_account_and_physical_ipad` |
| `EXTERNAL-EVIDENCE` | 主管/教师/家长 | 按 `docs/37` 执行教师复核、方向性儿童观察和最终 3-5 名复测 | `protocol_ready / observations_locked_by_frozen_build` |
| `DEVICE-EVIDENCE` | 未来原生任务/主管 | 按 `docs/38` 执行实体 iPad、触屏、USB/BLE MIDI、麦克风、音频会话、生命周期和压力矩阵 | `protocol_ready / native_and_hardware_evidence_missing` |
| `IP-EVIDENCE` | 主管/媒体/外部专业人员 | 按 `docs/39` 收齐来源包、最终哈希、独立视觉/音乐相似性复核和发布地区专业意见 | `protocol_ready / final_assets_and_external_clearance_missing` |
| `PARALLEL-MEDIA` | 媒体 | Batch13 为 12 调用/12 原件，Batch14 为 5 调用/4 原件；Batch15 在媒体工具前以 402 停止；Batch16 同一 ID 两次工具触发均额度失败；Batch17 零调用；Batch18 一次工具触发额度失败，后三批新原件均为 0 | `batch13_14_frozen / batch15_16_18_quota_failed / batch17_zero_call / runtime_and_release_forbidden` |
| `PARALLEL-ART` | 媒体 | 从已选源概念确定性提取 Chapter 3 garden-mode 星芽 512px 透明候选；不写 runtime、不调用生成服务 | `completed / approved_for_339b_prototype_copy_only / release_not_cleared`；Chapter 4/5 批量概念仍暂缓 |
| `PARALLEL-AUDIO` | 媒体 | 复核 LS04 现有无音高反馈/Foley 与 C4/D4 教学音并播；只做本地确定性审核资产 | `completed / independently_passed_offline_package / runtime_forbidden / human_listening_missing` |
| `PARALLEL-GARDEN-ART` | 媒体 | LS06/LS07 garden-art-v3 源包已收口并经主管独立审查；22 个透明道具保留为后续整合候选，knot3 拒绝，真实四步进度整合板仍缺失 | `completed_source_package / independently_audited / progression_integration_board_missing / runtime_locked / recording_closed` |

2026-07-11 课程静态审查补充：`docs/24` 已纠正“M03 属于第三章已实现内容”的错误表述，明确 M03 只是第一章的听音预备；`docs/03/17/24/31/33` 已统一 M07 的两段故事作用为“先挂好星串，再让原位星灯记住路线”，第二遍不得拆星重挂，吃力时延期。当前只读代码证据显示 `C1-06` 已有 guided/check 两步，检查标题为“自己接亮”且复用同一组星位，因此没有需要打断 M08 的 P0/P1；但“已安装星串在检查开始时是否视觉持续、第二状态是否足够明显”仍缺独立截图证据，记为后续第一章节奏回归观察项，不扩入当前 M08 或下一轮 M03/S01 窄修。

2026-07-11 第三章合同交叉审查补充：`docs/03/09/17/24/32/33` 已统一 `C3-01` 的提前休息条件，LS01 出现 repeated repair、strong/assisted cue、modeled success、长等待或疲劳时就在第一片叶保持打开处结束，并在下次只续 LS02；自然停点不得用叶片重新合拢制造进度撤销感。原 `LS08 星芽唱两声` 已改为 `LS08 根须记两声`，目标由中央中性声源播放，星芽只做同态“听两声”动作；后续预审又明确一组可见、不计分的 C-D 带路回声，只有顺利时才在同一 session 进入四组 check。稳定检查不得分音重听，整轮最多一次孩子主动整组重听；每组只取第一次完整双输入，错后修对或跨 session 续做仍给故事结果但不写 stable。该段记录的是当时的 `specification_passed / runtime_missing` 状态；当时 LS06-LS08 继续锁定，也没有发送给当时正在执行的 LS05 turn。

2026-07-11 第四、五章合同交叉审查补充：`docs/03/09/17/24/33` 已取消“stable 才能进入下一章”的隐性故事门槛。Story mode 需要真实上一章 played 或 bounded-assisted 结尾来维持因果，但未稳定技能只增加支架，不阻止咚咚发信号或两个朋友会合。`LP10` 的六音引导过桥和少提示信号锚检查拆为不同 session，桥和咚咚位置不重置；`TH05` 拆成桥墩、两个四音灯组、两小节接力的可续接阶段，不能在一次短课塞入约 20 个输入；`TH07` 每次只练一个已知小节。`TH06` 一起落地与前后落地必须留下相同练习拱门，一起落地只增加瞬时声画层，不授予独占物件、稀有收藏或更高角色认可。以上为 `specification_passed / runtime_missing / teacher_child_evidence_missing`，不扩入当前 M08、M03/S01 或 Chapter 3 里程碑。

2026-07-11 运行合同补齐：新增 `docs/34_CHAPTER4_LOW_REGISTER_RUNTIME_CONTRACT.md` 与 `docs/35_CHAPTER5_COORDINATION_RUNTIME_CONTRACT.md`。`34` 把 LP01-LP10、连续 C3-B4 键盘、低音谱位、咚咚揭晓、LP10 持久阶段、输入/音频和手部证据收敛为 24 项自动门禁；`35` 把 TH01-TH08、TH05 恢复、唯一两小节原曲、relay/paired/together 状态、350/600ms 事实、相同永久奖励、输入/音频和角色环境安全收敛为 29 项门禁。两份文件状态均为 `specification_passed / runtime_missing / device_teacher_child_evidence_missing`，只有到调度阶段 I 解锁后才交给原型实现。

2026-07-11 原生合同补齐：新增 `docs/36_NATIVE_IPAD_AND_APP_STORE_RUNTIME_CONTRACT.md`，把 Mac/Xcode 可用性、架构选择、触屏、Core MIDI、可选麦克风、AVAudioSession、本地数据迁移、真实家长门、隐私 manifest、离线/生命周期、无障碍、设备矩阵、TestFlight 和 App Store 收敛为 35 项原生门禁。当前状态为 `specification_passed / architecture_choice_open / native_runtime_missing / mac_xcode_account_device_store_evidence_missing`。拥有个人 Mac 不是产品门禁，但进入 N0-N3 必须真实取得 macOS/Xcode、实体 iPad 和相应签名/账号条件；Web/PWA 证据不能冒充原生通过。

2026-07-11 外部证据协议补齐：新增 `docs/37_TEACHER_AND_CHILD_OBSERVATION_PROTOCOL.md`，固定匿名最小化记录、监护人在场、默认不录音录像、`I0-I4` 成人干预编码、分阶段儿童路线、教师 12 项复核、低龄门禁和最终美术/声音后的复测。协议状态为 `protocol_ready / participants_not_recruited / observations_missing`；它解决的是“怎样真实观察”，不把尚未发生的观察写成通过。M08 guided 可按课程顺序观察施工理解，但少提示/减色/F-G 证明必须在 FG01-FG03 后单独观察。

2026-07-11 真机协议补齐：新增 `docs/38_IPAD_MIDI_MIC_DEVICE_TEST_PROTOCOL.md`，把 Web/模拟器/实体证据等级、三档 iPad、USB/BLE MIDI、触屏真实几何、麦克风噪声与泛音条件、AVAudioSession、中断恢复、p50/p95/max、准确率分条件报告、30 分钟压力和隐私台账变成可执行步骤。当前状态为 `protocol_ready / native_runtime_missing / physical_devices_missing / measurements_missing`；它不能把尚未发生的测试写成通过，也禁止用一次“连接成功”截图宣传可靠 MIDI 或麦克风。

2026-07-11 原创与相似性协议补齐：新增 `docs/39_ASSET_ORIGINALITY_AND_SIMILARITY_REVIEW_PROTOCOL.md`，把每个 Release 素材的 creator/tool、完整 prompt/brief、所有参考、许可、编辑过程、最终哈希、运行截图、内部拒绝和外部独立相似性审查统一成来源包；覆盖星芽/咚咚身份、生成图视频、竞品 UI、原创两小节、SFX/儿童语音、字体/图标和 App Store 材料。当前状态为 `protocol_ready / internal_review_partial / external_professional_review_missing / release_clearance_missing`；任何模型自称“原创无风险”或内部一次审图都不能冒充法律清关。

2026-07-12 第四、第五章静态交叉审查：新增 `docs/40_CHAPTER4_5_COURSE_STORY_AND_ART_READINESS_AUDIT.md`。`docs/03/09/14/17/24/33/34/35` 的音区、关卡顺序、唯一两小节、短课负荷、故事解锁、路线公平和 played/stable/retained 边界相互一致，记为 `curriculum_story_static_passed`。现有 Chapter 4/5 生成图仍只有 `source concept` 价值；第五章主场景把两个住处画成相邻花园房屋并让角色站在桥中央，与“生态星球安全控制区 + 远端月亮自动端点 + 花园内会合”相矛盾，记为 `rejected_story_geography`。Chapter 4/5 批量概念现暂缓，媒体先完成不写 runtime 的 Chapter 3 garden-mode 单资产依赖。

2026-07-12 Chapter 4/5 生图提供方审计：媒体任务发现已配置的 `gpt-imagegen` 实际指向本机 `http://127.0.0.1:8080`，监听进程为 `sub2api.exe`。客户端请求名虽为 `gpt-image-2`，但无法证明后端属于 Codex 内置或官方 OpenAI Images，也无法证明数据保留、训练边界和真实模型。门禁明确前已经发生 5 次调用，其中 3 次参考图请求共上传 6 次项目角色设定图；门禁明确后新增调用为 0。全部输出已在 `concepts/generated-v3/chapter4-5-readiness` 标为 `provider_unverified_rejected / sourceCandidate=false / runtimeApproval=false`，只保留审计图、完整 prompt、调用事实与哈希，不得用于风格参考、源候选、衍生生成或 runtime。运行引用扫描为 0，quick/strict bundle 保持通过。

2026-07-11 课程故事交叉审查修正：第一、二章装备合同已统一为正式游戏全程完整气密服，M08 以屋顶和压力光证明前哨安全，不在 FG/S01 前反复开盔；LP01 已从“听高低后又找键”的双轴任务拆清为固定中性声音泡泡触屏比较，精确 C3 键位、MIDI 和麦克风计分从 LP02 开始；第五章明确两位角色留在生态星球安全控制区，远端月亮前哨由自动模块响应，最终在可呼吸花园中继台庆祝。咚咚形体补齐为四足低姿、准确三角、圆润无额外角状颈盾尖刺。以上为主管严格自审后的 `specification_corrected / runtime_missing / teacher_child_review_missing`，不发送给当前 M08 active turn，进入未来 Chapter 4/5 启动合同。

2026-07-11 课程故事静态一致性复核：主管从当前文件重新计算而非沿用旧结论。`M01-M08`、`FG01-FG04`、`S01`、`LS01-LS08`、`LP01-LP10`、`TH01-TH08` 共 39 个 id 均同时出现在 `docs/03/17/24/33`；LS、LP、TH 全集分别完整出现在 `docs/32/34/35`。针对“M08/ S01 重复开盔密封、LP01 混入精确 C3 键位或 MIDI/麦克风计分、stable 阻断故事、第五章角色无头盔返回真空月面”的定向冲突扫描没有发现未标明历史废弃状态的有效矛盾。第五章唯一两小节在 `03/24/35` 一致为星芽 `C4-D4-E4-D4 | E4-D4-C4-C4` 四分音符、咚咚 `C3 | G3` 全音符、4/4、目标 52 BPM。该结果只证明规划文字一致，仍不能代替教师、儿童或运行证据。

2026-07-12 Chapter 3 首切片预审：主管重新核对 `docs/17/24/31/32/33`，未发现需要在 `338a` 中途打断的课程矛盾。下一阶段只在 M03/S01 通过后解锁，固定为花园入口点击、`CH3_ENTRY_AIR_CHECK` 代码 fallback、`C3-01: LS01-LS02` 与 `C3-02: LS03`；不包含隐藏听辨 LS04。教学节奏和审查重点为：

- 入口点击是孩子的用户手势，只启动安全装备状态和正式 C3-01；S01 完成瞬间不无手势强播新章节；
- LS01 只建立 C/Do/两黑左/听到同音/按同键，LS02 只建立 D/Re/两黑中；每个只需一个有意义输入并立即留下叶片或卷茎世界结果；
- LS01 出现 repeated repair、strong/assisted、modeled、长等待或疲劳时，第一片叶保持打开并提前休息；下次只续 LS02，不重做 LS01；
- LS01-LS03 全部 `reviewableForMastery=false`，只能写 played/remediation，不进入 played-but-not-stable、stable、retained 或 opening-review 队列；
- LS03 必须是独立 C3-02 session：第一次可见 E/Mi/两黑右，第二次只弱化直接提示，不在同一首次 session 自动开始 LS04；
- 正确后按大字字母、星芽唱名和真实键位重新连接身份；颜色与植物动作只作答后确认，不能在下一输入前泄题；
- 两个 bundle 都自动到自然停点，无关闭/下一关按钮；触屏路线完整，MIDI/麦克风不是前提；
- 媒体缺失不得阻塞：sealed -> scan -> open/stowed 用代码状态回退，减少动态、跳过和刷新必须落到同一安全装备状态。

当时状态为 `specification_passed / overhaul-341a_LS05_passed / LS06_LS07_runtime_dispatched / LS08_missing / device_teacher_child_evidence_missing`；该历史状态已由上方 343a-p2 全章浏览器裁决取代。

### 2026-07-12 `overhaul-339a` 正式独立裁决

主管没有采用支线的 `passed` 自审，而是重新读取源码和专项、查看 air-check、LS01、LS02、LS03 与完成地图原尺寸截图，并独立复跑 `chapter3-visible 30/30`、M03/garden `32/32`、sessions `72/72`、clean-state `124/124`、六视口 zones、quick 与 strict bundle。共享回归均为绿色，但 `339a` 仍不能晋升基线：

1. `index.html` 的 garden 角色始终引用 `xingya-suit-point.webp`。该位图已经烘焙透明头盔、压力服、手套、靴子和气密尾套；CSS 隐藏额外 `.garden-visor` 不能把这些装备从图中移除。`safe-open` 只是数据名，不是画面事实，违反 `docs/24/32` 的星芽本体、三颗头芽、探索背带和星星背包最终状态。
2. 地图固定显示“当前章节：月球基地”，花园入口和三片叶完成后仍以“基地 x/12”作为当前章节状态。第三章故事入口、进行中、提前休息、下一 bundle 和完成态都缺少“呼吸花园/会听的小种子”的当前章节身份。
3. `completeGardenLesson` 只以 `gardenWrongCount >= 2` 回地图，仍保留同一个 active `C3-01` 和相同 sessionId；没有 `endReason=early-rest`，没有 LS01 `needsPractice=true`，也没有分开记录 assisted、modeled 或长等待。专项第 210-214 行反而要求同一 active session 恢复 LS02，与 `docs/08/32/33` 的“结束当前短课，下一正式 session 只续 LS02”矛盾。

此前启动消息中的“不创建第二个 active session”现统一解释为：不得并发或重复保留两个 active session；它不允许把已经到自然停点的旧 session 长期保持 active。`339b` 必须把旧 session 写入 history，随后由下一次孩子手势创建一个新且唯一的 LS02 resume session，叶1和 introduction-only 观察证据保持，第一、二章 mastery 不变。

因此当前运行基线继续保持 `338a`。原型只修以上三项；媒体只交无新生成调用的 garden-mode 透明候选。两条支线分别正式交接并经主管独立检查前，不得接 LS04、正式动画、语音、SFX 或环境声。

### 2026-07-12 Chapter 3 花园模式星芽候选裁决

媒体没有调用任何生成服务，只从 `concepts/generated-v2/xingya-model-sheet-v1.png` 固定裁切并用本地 OpenCV 建立透明候选。主管没有沿用媒体自审，而是重新计算并确认：源图 SHA-256 `34F3F53E...6854`、最终脚本 SHA-256 `2EB24287...9EF4`、PNG SHA-256 `F8B5199A...2931`、WebP SHA-256 `1228082D...EBA`、棋盘图、两张审核图和源截图哈希均与 manifest 相符；WebP 为 512x512、`yuva420p`、33,794 bytes，四角 alpha 为 0。

人工原图核查确认三颗头芽、星芽本体、探索背带、星星背包、双脚和完整尾巴存在，无头盔、压力服、手套、靴子或气密尾套，候选本体没有文字、琴键、音符或场景底图。裁决为 `approved_for_339b_prototype_copy_only`：只有该精确 WebP 哈希可以由原型复制到 `assets/runtime`，sealed/scanning 继续使用完整气密服，safe-open 才切换花园模式。该许可不适用于 PNG、审核合成、其他姿势、其他哈希或 Release；上游生成来源、外部相似性、实体 iPad、教师和儿童证据仍缺失。

### 2026-07-12 `overhaul-339b` 正式独立裁决

主管独立确认上一轮三项主 P1 已取得实质进展：sealed/scanning 与 safe-open 使用不同且正确的角色资产；地图顶部为“呼吸花园”和嫩芽 `0/3-3/3`；assisted、modeled、长等待与叶1后主动休息都会结束旧 session，下一次只建立 LS02 resume session。独立复跑 `chapter3-visible 54/54`、sessions `72/72`、clean-state `124/124`、PWA `7/7`、六视口 zones、quick 与 strict bundle 均通过，live 1024/1194 原图没有角色遮挡或脚底残影。

但主管额外真实浏览器探针证明两项专项盲区：

1. 刚创建 `C3-01` 后在 `scanning` 阶段立即点主页，`showMapScreen` 会无条件调用 `completeGardenModeledSuccess("voluntary-rest")`。结果是孩子零输入、尚未 safe-open 时 leaf1 已长成，LS01 被记录为 modeled/needsPractice，旧 session 结束并把下一目标改成 LS02。普通导航或误触因此会跳过 C/Do 的首次教学，违反课程顺序与证据语义。
2. `renderMapScreen` 对任何 active garden 或 waiting resume 都固定显示“继续第二片叶”。主管 DOM 实测在 LS01、嫩芽 `0/3` 时已经出现该文案；active LS03 也会同样说错，正常完成两片后又退回泛化入口文案。

因此 `339b` 裁决为 `rejected_as_baseline / core_gates_green / two_navigation_contract_P1`。`339c` 只修：LS01 未完成时返回地图不产生 modeled、叶片、needsPractice 或 LS02 跳转；下一次仍进入 LS01；以及地图可见文案/ARIA 按未进入、LS01、LS02、LS03、complete 五态准确派生。获批 WebP、声音、音序、其他关卡和 LS04 不得改变。

### 2026-07-12 `overhaul-339c` 正式独立裁决

主管没有直接采用支线的 `passed` 自审。源码确认 `showMapScreen()` 已不再把未完成 LS01 转成 modeled，`gardenMapMarkerCopy()` 也会从 current action、resume 目标和 leafCount 派生第一/二/三片叶文案。独立复跑 `chapter3-visible 69/69`，并新增 `chrome-test/supervisor-339c-continuity-check.mjs`：sealed、scanning、safe-open 零输入和一次错音四条路线均能在返回后保持无叶、无 LS01 evidence、无 resume，重入时继续相同 sessionId 的 LS01，前 13 条为绿色；五态地图原尺寸截图与 visible/ARIA 一致。

但第 14 条真实探针发现新的教学连续性 P1：LS01 第一次错按 D 后返回地图，再进入同一个 sessionId/LS01 并错按 E，`repairStage` 仍为 `none`，气泡仍是普通“再找一次”，没有进入合同规定的第二错 assisted。源码原因是重入 action 时把 `gardenWrongCount`、`gardenInputRoutes`、`gardenChildCorrectCount` 和 `gardenModeledInputs` 重置为初值，而 active session/action 没有持久 pending attempt。这样不仅可通过导航绕过辅助教学；若随后按对，最终 evidence 还会丢失第一次错误和 route，把有错误的尝试写成 `wrongCount=0`。

因此 `339c` 裁决为 `rejected_as_baseline / prior_navigation_and_copy_P1_closed / pending_attempt_continuity_P1`。`339d` 只需把已经发生的 action 输入事实随 active session 持久化并在重入恢复；返回地图仍只清 timers、动画和临时 DOM，不得造叶、写 needsPractice 或累计离开时间。两次错音跨暂停仍应在第二次进入 assisted；一次错后暂停再正确必须保留 `wrongCount=1` 与 input routes；action 完成、early-rest 或新 session 后 pending 数据必须清除，不能污染 LS02。素材、音序、mastery/retained、第一二章、声音、美术和 LS04 继续冻结。

### 2026-07-12 `overhaul-339d` 正式独立裁决

主管重新读取 pending-attempt 源码与产品专项，人工查看跨导航第二错、一次错后重入和 LS02 resume 原尺寸画面，并独立复跑主管探针 `14/14`、Chapter 3 `74/74`。两次错音分布在地图暂停前后时，第二次会进入 bounded assisted；一次错后暂停再正确会把 `wrongCount=1`、两条 ordered child input 和两次 input route 写入 LS01 evidence，普通暂停本身不写 needsPractice；刷新会恢复 pending，action 完成、early-rest 和 session ending 会清除 pending，LS02/新 session 不继承。

共享门禁由主管独立复跑：sessions `72/72`、clean-state `124/124`、M03/garden `32/32`、PWA `7/7`、workshop `36/36`、M08 `97/97`、assembly `13/13`、M01 `17/17`、Xingya suit `23/23`、staff mini `20/20`、staff repair `27/27`、staff readability `13/13`、iPad a11y `43/43`、palette `16/16`、contrast `9/9`、motion `19/19`、audio settings `13/13`、input reliability `12/12`，quick 与 strict bundle 通过，运行包为 41 个文件、`1,641,265` bytes。运行引用扫描未发现 `concepts/**`、`audio/**`、technical preview 或 animatics；花园角色 WebP SHA-256 仍为 `1228082D...EBA`。

坐标合同 `teaching-zones-overhaul-339d-v1` 六视口 0 failure、0 browser error，内部合同 SHA-256 `0f996e4e0c551a9788fb766e15a6bb4932476c9ec4128a914d9f645708167669`，`runtimeIntegrationAllowed=false`。原型冻结时文件 SHA 为 `BD3CBEB...E59CF4`；主管独立重生成只改变被内部哈希排除的 `generatedAt`，当前文件 SHA 为 `9188D593...54557`，内部合同哈希保持完全一致。该合同仍把 Chapter 3 标为行为门禁而非完整媒体保护区，因此不能直接放行安全区 v2 视觉候选。

裁决为 `passed_browser_baseline / chapter3_visible_slice_passed / release_and_external_evidence_missing`。这只解锁下一独立短课 `C3-03 / LS04`，不解锁 LS05-LS08、正式动画/SFX 运行集成、实体 iPad、真实 MIDI/声学麦克风、教师/儿童或 Release 声明。

### 2026-07-12 `LS05` 启动前课程预审

主管在等待阶段 F 与 340d 收口期间只读交叉核对 `03/09/17/23/24/32/33/38/43`，发现四项会让后续三音听辨产生虚假教学结论或低龄阻断的规格缺口，已在课程文件中统一关闭：

- 原 `4/5` 门槛允许唯一出现一次的音完全答错后仍把 C/D/E 三音集合写成 stable。现固定为：总数至少 `4/5`，且 C、D、E 各至少有一次无强提示正确；最多一次孩子主动重听；任何提前揭示、strong cue、modeled 或实验麦克风推动仍取消整轮 stable/retained 资格。
- 对应花若跨呼叫永久开放，会暴露已出现频次并让后半段可从画面猜答案。现固定为：评分后对应花只短暂回应并在下一呼叫前恢复同态；跨呼叫只保留五格中性花粉环；五次结束后三朵花一起永久开放。
- LS05 每个呼叫的 `wrongCount`、`repairStage` 和临时混淆对必须在下一题清零，整轮错误历史另存；上一题不能把下一题直接推入 assisted。modeled、长等待或疲劳安全休息后保留同一 seeded 序列和中性花粉进度，下一次明确点击只续剩余故事步；跨 session 片段不能拼成 stable，stable 只来自后来一次同 session 的全新五呼叫运行。
- `sound-paused` 仍不开放评分；但成熟产品不能让声音关闭或听力受限的孩子卡死。明确 visual-assist 后可用字母和键位模型完成故事，并记录 `accessibilityVisualAssist=true`、played/needsPractice；可见帮助、无声 observation 和跨 session 片段均不得进入 listening correct、firstTry、candidate coverage、stable 或 retained。

历史状态为 `LS05_curriculum_preflight_passed / runtime_dispatch_unlocked / LS06_plus_locked`；该门禁已由 `overhaul-341a` 关闭。当前只依据新的 `docs/44` 工作单实现 LS06-LS07，仍不得提前实现 LS08。

### 2026-07-12 LS04 离线音频包独立裁决

媒体支线交付 `seed-sprout`、`correct`、`retry` 与 C4/D4 合成教学参考的离线 A/B 包。主管未直接采用支线自审，独立读取生成器、manifest、审核页和波形控制代码，并复跑：

- `generate_audio_concepts.py --verify-only`：7 个源资产通过；
- 2 条参考 + 12 条 A/B 混音：14/14 SHA-256、AAC、48 kHz、mono 通过；
- 三 cue × C4/D4 × A/B 矩阵完整，`noteBus=1.0`，SFX 在 `t=0..540ms` 至少 `-8 dB`；`retry` 在保护窗内结束，释放段正确标为不适用；
- 审核页 3 行、20 个播放器、桌面/手机无横向溢出，运行引用 0；
- 自动周期性只判为 `pass_screening_only`，人工耳机、普通扬声器、实体 iPad 和儿童听感保持 missing。

首轮主管审图发现审核自动化会把第一条候选写成 pass 并留在手机截图，且旧 batch-only localStorage 可能污染新 D4 标准，因此退回 P1。修正后新增协议 `ls04-c4-d4-offline-ab / r1`；旧记录隔离，筛选测试后旧/新 key 均清空，三项恢复 pending，导出包含协议 id/revision，14/14 音频哈希前后完全一致。主管再次复跑专项和原图确认 P1 关闭。

裁决为 `audio_review_package_passed_runtime_forbidden / pitch_and_masking_screening_only / human_headphone_speaker_ipad_missing / full_runtime_WebAudio_mix_missing`。该包不能批准 SFX 运行接入；全局 quick/strict 因原型 `340a` 同时写运行文件，留待其冻结后由主管统一复跑。

## 协作效率审查

| 发现 | 判断 | 改进决定 |
| --- | --- | --- |
| 主管曾在原型长 turn 中连续补充课程、节奏和媒体要求 | 确有打断和上下文膨胀风险，即使内容正确也可能降低实现效率 | 从现在起执行消息优先级；普通补充批量留到里程碑交接，当前 M08 不再追加消息 |
| 原型任务一度把“前面五个”理解成 M01-M05，而用户实际指 M08 五步屋顶 | 范围确认不够早，导致试做和撤回 | 新里程碑启动合同必须同时写 `in-scope`、`out-of-scope` 和可修改文件；歧义先只读核对，不先铺开实现 |
| 当前运行版本、测试输出目录和最后 gate log 可能出现 `334g/335a/335b/335c` 并存 | 中间开发允许，但没有一次性收口会造成证据错配 | 交接必须统一 HTML、Service Worker、测试期望、截图目录、docs/30 和 docs/20 的同一版本；主管按源哈希复核 |
| 三个任务共享同一工作区，且此前没有有效 Git 元数据 | 是高风险效率问题：难以可靠看 diff、回退和确认谁改了什么 | 2026-07-12 已在项目根建立有效 Git 并验证 WAV/PDF 忽略规则；仍需后续明确初始基线提交策略，继续坚持单一文件负责人 |
| `08` 历史执行记录很长，`18`、`29` 和旧审查文件都可能被当成当前指令 | 有查找成本和来源混淆 | `18` 只管当前产品审查，`29` 只管主管状态/调度，`20` 只管运行证据；`08` 作为阶段 backlog，不用它覆盖最新队列 |
| 媒体任务不能在布局未稳定时制作最终素材，但完全空转也会浪费工具核验窗口 | 一次有上限的能力核验可以发现工具真实边界；核验结束后必须服从证据而不是继续试到满意 | Grok 探测已因宿主读取约束 contradicted 而封闭；最终裁切、角色一致性、混音与非 Grok 媒体生产仍等待稳定坐标和主管解锁 |
| 所有开发几乎串行经过原型任务 | 对同一运行代码是必要的单写者保护；但主管可并行做课程审查、版权台账和测试设计 | 保留运行串行；把文档核查、验收脚本设计、教师/儿童观察方案作为安全并行工作 |

效率不是让三个任务同时修改同一页面，而是让每个任务在依赖满足时一次做对，并且主管只在决策点介入。

## 各任务职责怎样改进

| 任务 | 继续保留的核心职责 | 需要改进的工作方式 | 每次必须交付 |
| --- | --- | --- | --- |
| 课程故事/主管 | 课程顺序、故事因果、教学证据、任务排期、独立裁决 | 少发过程消息；把要求先收敛成一次性合同；不因自己写过课程就把自审称为独立教学证明；定期检查总完成账本而不是只看最新截图 | 当前唯一优先级、冻结合同、待办队列、独立审查结果、下一触发点 |
| 原型/UI | Web/iPad 原型、交互状态机、触屏/MIDI/麦克风入口、运行美术、PWA、自动化和截图 | 大改前先给 2-3 个可比较方案；确认范围后一次实现；不自行改课程音符/掌握语义；统一版本和证据后再交接；不要用持续叠 CSS 代替信息架构 | 改动文件、统一 build id、三种目标视口、正确/错误/完成/休息状态、测试清单、源哈希、passed/partial/missing/contradicted |
| 动画/语音/音效 | 分镜、动作关键帧、角色语音流程、Foley、环境声、混音和来源台账 | 未解锁时保持等待；生成稿先审角色一致性和教学安全区；儿童声音先过隐私门禁；只交运行候选，不直接改主程序 | 素材状态、来源/授权、角色与装备核查、透明边界、安全区、音频指标、减少动态版本、禁止接入项 |
| 用户/外部证据 | 审美取舍、真机、家庭录音授权、儿童实际体验 | 只在产品达到可观察状态后请求，避免让用户反复评审明显中间稿；私密素材必须走已验证门禁 | 用户观感、iPad/MIDI/扬声器记录、授权文件、儿童观察、教师/合规意见 |

原型任务不负责决定“孩子学会了什么”，媒体任务不负责决定“素材可以运行集成”，主管任务不负责替代真实孩子、老师、设备或用户做最终证明。

## 成熟 App 总完成账本

下表是主管长期检查的主账本。某个局部里程碑通过，只能更新对应一行，不能把项目整体状态直接改成完成。

| 领域 | 成熟 App 放行条件 | 当前证据 | 当前状态 | 唯一负责人/下一触发点 |
| --- | --- | --- | --- | --- |
| 产品定位与课程合同 | 五章顺序、每短课目标、音符/谱位/音区、提示递减、played/stable/retained、故事因果和原生迁移不漂移 | `00/02/03/09/14/17/24/31/32/33/34/35/36` 已形成合同 | `passed_spec / teacher_evidence_missing / native_runtime_missing` | 主管；运行实现遇到冲突时裁决，正式发布前教师复核 |
| 第一、二章 Web 教学闭环 | M01-M08、FG01-FG04、S01 的正式 session、错误修复、自然停点、家长证据和离线壳层稳定 | `345d` 保留状态机、音名、视觉、输入和回归；M03 的真实 started/ended、held MIDI、麦克风外部事务、正式会话 ownership 和终态返回已在 AUDIO-A 通过并由总回归保持 | `passed_browser_structure / M03_audio_lifecycle_passed / physical_device_teacher_child_evidence_missing` | LP03 不得改第一、二章；主管持续跑共享回归 |
| 第三章听音花园 | 花园入口、LS01-LS08、小集合隐藏听辨、重听、音频优先、自然停点和证据阈值全部运行通过 | `345d` 已证明入口、装备、session、early-rest、地图/刷新、输入与故事状态；LS01-LS03 AUDIO-A、LS04-LS05 AUDIO-B、LS06-LS07 AUDIO-C 与 LS08 均通过受控音频生命周期 | `passed_browser_logic_layout_and_audio / release_art_device_teacher_child_evidence_missing` | LP03 不得回改第三章；媒体只做 source-only，真机/教师/儿童另补 |
| 第四章低音与低音谱表 | C3-G3 双八度真实键盘、音区、高低比较、低音谱位、左手邀请和咚咚故事运行通过 | 课程/故事脚本完整；`345d` 回归通过 LP01/LP02、LS08 `131/131`、C4 `137/137` 与既有六视口合同。LP03 已解锁但尚未实现，LP04-LP10 继续缺失 | `first_slice_browser_passed / LP03_dispatch_ready / LP03_LP10_runtime_incomplete / external_evidence_missing` | 现在只按 `docs/47` 实现 LP03，不把第一切片外推为完整低音课程 |
| 第五章轮流与合作 | 接力主线、可选同时路线、两小节固定原创曲、同等奖励结局和总谱地图运行通过 | 课程/故事脚本存在，无运行闭环 | `missing_runtime` | 第四章低音/谱表门禁通过后下发 |
| UI、美术与角色动作 | 地图、关卡、键盘、谱桥、五章场景和角色状态达到统一发布质量；无占位物；来源和版权清楚 | `343a-p2` 的视觉层级、路线音名和辅助模式通过浏览器审查；第三章运行场景仍是扁平 CSS/线稿。Batch7 仅 6 条环境素材获 `preferred_source_only`；Batch8 的 23 条原件经逐帧去重后只保留洞穴动态/减少动态与花园边缘 3 个首选 source-only 代表，2 个机械/全屏转场参考和 5 个明确拒绝项。没有视频获 runtime 或 release 批准 | `partial / prototype_visual_passed / source_only_video_progress / role_video_chain_failed / runtime_integration_forbidden / release_art_missing` | 媒体只补无角色故事缺口；主管逐文件裁决并要求真实 UI 合成，未批准前不得复制到 runtime |
| 钢琴音、音效、过场与角色语音 | 真机上钢琴音清晰；SFX/语音不遮盖；过场可跳过/减少动态；授权和隐私完整 | 7 个本地原创候选和离线混音合同存在；M03、LS01-LS08、LP01/LP02 的浏览器教学钢琴音已通过完整生命周期总回归。完成动画、角色录音、真人听感和真机混音均缺失 | `partial / browser_teaching_audio_lifecycle_passed / recording_gate_closed / human_device_listening_missing` | LP03 继续复用共享音频合同；媒体运行集成仍须独立审查，录音门禁有效且用户再次同意后才接收录音 |
| 输入与设备可靠性 | 按 `docs/38` 证明触屏始终可完成、原生 iPad Core MIDI 可靠、麦克风可选且置信度安全、旋转/中断/恢复可用 | 设备协议已完成；浏览器触屏、桌面 MIDI/实验麦克风和输入自动化存在，无实体测量 | `passed_protocol / runtime_partial / physical_iPad_missing` | Web主线稳定后建立原生 iPad 项目，并按 N0/N1 执行真机矩阵 |
| 低龄可理解性与教学效果 | 按 `docs/37` 由 3-5 名 4-6 岁儿童分多次完成开始、错误、修复、结果和休息；教师复核目标/阈值；最终美术声音后重复验证 | 观察协议与表格已完成；仍只有自动化和成人截图，无合格儿童/教师记录 | `passed_protocol / external_evidence_missing` | 冻结教学纵切后先做一名儿童方向性观察；最终候选执行 3-5 名复测，不由自动化替代 |
| 隐私、版权与家长门禁 | 无受保护 IP；按 `docs/39` 让资产/音乐/声音来源和最终哈希可追溯并通过独立相似性审查；真实家长挑战；隐私政策、数据地图和权限文案与行为一致 | 原创世界、资产台账和版权协议较强；最终来源包、外部相似性/地区法律复核、真实家长挑战和有效录音忽略验证缺失 | `passed_protocol / implementation_and_external_review_partial` | 主管+媒体+专业/地区复核；TestFlight 前必须通过 |
| 原生 iPad、TestFlight 与 App Store | `docs/36` 的 N0-N3、35 项门禁、Xcode/iPadOS 工程、签名、设备测试、TestFlight、商店素材、隐私披露和审核准备完成 | 原生验收规格已通过；目前只有 Web/PWA 原型，没有原生工程或设备/商店证据 | `passed_spec / architecture_open / runtime_and_external_evidence_missing` | 一个稳定教学纵切通过且可使用 macOS/Xcode、实体 iPad 和开发者账号后，创建独立原生任务；不要求必须自购 Mac |
| 发布工程与版本可追溯 | 有效 Git、可复现构建、版本/缓存/截图/坐标合同一致、回滚和迁移计划、正式发布包门禁通过 | `345d` 的版本、缓存、AUDIO-C 专项和 gate log 已进入 `2405734`；既有布局合同继续作为未改布局的冻结基线。项目 Git、私密录音 ignore、LFS 和连续里程碑提交有效；仍无远程备份、签名发布构建和迁移/回滚演练 | `partial / browser_evidence_aligned / git_valid / milestone_commits_present / release_pipeline_missing` | 保持 LP03 独立提交边界；原生/TestFlight 前补远程备份、签名构建、迁移与回滚演练 |
| A-G 英文单词玩法 | A/B 身份、年龄定位、词库版权/教学意义和独立玩法完成，不抢占主线 | 只有停放计划 | `parked / missing` | 第一至第五章和发布基础稳定后才启动 |

项目整体只有当上述主线必需行均为 `passed`，且可选 A-G 是否纳入首发范围已有明确产品决定时，才可以调用“成熟 App 已完成”。当前不能因为课程合同较完整或浏览器测试通过而提前结束主管目标。

## 调度任务的权限

调度任务可以：

- 读取所有任务的状态、源码、文档、图片、音频和测试证据；
- 把新问题拆给唯一负责人，写清文件范围、输入、输出和验收条件；
- 要求支线先完成自审，再进行独立二次审查；
- 发现冲突时暂停下一步，退回原负责人修正；
- 向其他任务发送纠偏、放行、等待或补证消息；
- 维护跨任务依赖、版本状态和证据缺口。

调度任务不可以：

- 在独立审查时顺手修改被审查任务的文件；
- 让两个任务同时写同一文件或同一运行素材；
- 因为截图好看就宣布教学通过；
- 因为自动化通过就宣布真实孩子、真实 iPad、真实 MIDI 或声音隐私通过；
- 为了显得项目完整，把 `partial` 或 `missing` 改写成 `passed`；
- 无限循环追求“再精美一点”，而不明确本轮可验证的完成标准。

## 独立性的诚实边界

本任务同时是课程和故事文件的主要作者，因此：

- 对原型任务和动画音频任务的交付，可以做独立二次审查；
- 对本任务自己编写的课程、故事和教案，只能称为严格自审；
- 涉及儿童教学合理性、古生物表述、隐私合规或商业宣传等高风险结论，如需真正独立证据，应交给另一任务、教师、家长观察或专业顾问复核；
- 用户的最终观感与取舍不是可以由调度任务代替的门禁。

## 固定工作流程

1. **确认问题和当前活动**：先明确问题属于课程、界面、动画、语音、音效、设备还是版权隐私，并读取负责人正在做什么。
2. **确定唯一负责人**：指定一个任务拥有写权限，其他任务只读或等待。
3. **冻结一次性合同**：写清 `in-scope`、`out-of-scope`、不可改变的课程目标、故事原因、输入输出和验收门禁。
4. **安静执行**：负责人完成实现；主管只读监控，普通意见进入待办，不在 turn 中连续插入。
5. **支线自审与里程碑回执**：负责人列出改动文件、统一版本、测试、截图、证据状态和剩余风险。
6. **调度任务独立复核**：不直接采用支线结论，重新检查关键文件、素材、画面或测试输出。
7. **一次性退回或放行**：把同一轮发现合并成一份裁决；通过后才允许下游任务集成。
8. **集成后复查**：源概念通过不等于运行通过，运行通过也不等于真机或儿童通过。
9. **记录状态和下一触发点**：每个门禁标为 `passed`、`partial`、`missing` 或 `contradicted`，并明确下一次主管介入条件。

### 新里程碑启动包

主管只在上一里程碑结束后发送一份启动包，固定包含六项：

1. 本轮唯一目标和用户最新原话；
2. `in-scope` 与 `out-of-scope`；
3. 唯一负责人和允许写入的文件/目录；
4. 不可改变的课程、故事、输入、媒体和隐私合同；
5. 必须覆盖的画面、状态、测试与外部证据边界；
6. 正式交接格式和下一次主管介入触发点。

没有完整启动包，不启动跨模块大改；负责人遇到歧义时先只读核对，不通过试写多个模块来猜范围。

## 证据分级

| 证据层级 | 能证明什么 | 不能证明什么 |
| --- | --- | --- |
| 规划与脚本 | 目标、台词、关卡和素材需求已定义 | 孩子能理解、画面已经实现 |
| 源概念 | 角色、场景、装备或声音方向可供制作 | 运行时动作、性能和交互可用 |
| 源码与自动化 | 行为合同、状态机和回归检查成立 | 真机听感、手感和儿童理解 |
| 浏览器/iPad 截图或录屏 | 指定版本在指定画面下可见、无明显遮挡 | 长期掌握、真实 MIDI 或真实儿童通过 |
| 真实设备测试 | iPad/MIDI/扬声器上的连接、延迟、响度或布局 | 儿童教学效果和长期保持 |
| 真实儿童观察 | 指定孩子在指定脚本下的行为与成人干预 | 普遍适用于所有儿童或长期掌握 |
| 授权与隐私记录 | 声音、图片和素材具有明确使用边界 | 教学效果或审美质量 |

## 文件冲突规则

- 原型任务写运行代码时，调度任务不同时修改同一 HTML、CSS、JS 或测试文件。
- 动画音频任务生成源素材时，原型任务只读候选；选定并交接后才制作运行版本。
- `docs/03`、`09`、`14`、`17`、`24`、`27`、`31-39` 的课程、音符、故事、短课、保持性、后续章节、原生发布、外部观察、设备证据和原创性审查合同由本任务锁定；其他任务发现冲突时报告，不自行改语义。
- `docs/20_GATE_RUN_LOG.md` 主要由原型任务维护实现证据。
- `docs/28_*` 主要由动画音频任务维护制作计划和素材台账。
- `docs/29_PROJECT_COORDINATION_AND_INDEPENDENT_AUDIT.md` 由本调度任务维护。
- `README`、`08`、`16`、`18`、`23`、`25`、`26` 属共享文件；写入前必须确认当前没有另一任务正在编辑，并在交接中说明修改范围。

## 调整后的高效调度队列

原则：运行代码保持单写者；主管在实现期只读、在交接期独立审查；媒体只有在稳定坐标和明确素材接口出现后才进入生产。下表替代按消息先后不断追加任务的方式。

| 阶段 | 运行写者 | 主管并行工作 | 媒体并行工作 | 阶段结束条件 |
| --- | --- | --- | --- | --- |
| `A M08 实现` | 原型按用户参考完成 M08 扁平构图、可演奏施工谱、真实屋顶安装/气密状态和自审；M01-M07 不动 | 只读监控，维护 M08 工作单和通用场景/道具合同 | Grok 探测完成并封闭；媒体未参与运行集成 | `completed at 337c` |
| `B M08 裁决` | 原型冻结 `337c` 运行文件 | 主管重新跑全部门禁并人工审图，记录来源与外部证据缺口 | 继续等待 | `passed_browser_baseline / release evidence missing` |
| `C 基础设施停点` | 无运行写入 | 已建立有效 Git 并验证私密 WAV/PDF ignore；后续只需确定初始基线提交和审查归档方案 | 录音接收仍关闭，媒体只同步门禁事实 | `repo_and_ignore passed / initial commit pending` |
| `D M03 + S01 小修` | 原型只做 M03 去重/主语与 S01 花园入口和相应回归 | 主管准备 Chapter 3 首切片测试，不中途追加视觉重做 | 继续等待 | `completed at 338a / independently passed` |
| `E Chapter 3 可见示范` | 原型实现入口 fallback、`C3-01: LS01-LS02`、`C3-02: LS03`；不做 LS04 | 主管检查 played-only、音频手势、叶片永久进度、真实 open/stowed、返回不跳课、地图五态、同 action 输入连续性、LS01 early-rest 和 LS03 单独停点 | garden-mode 候选已交接并冻结，不再生产新素材 | `completed_at_339d / independently_passed / release_evidence_missing` |
| `F 首次安全并行` | 原型实现 `C3-03: LS04` 隐藏 Do/Re 听辨，并输出 Chapter 3 专用媒体保护区合同 | 主管分别审运行和媒体，不让两者互相自批 | 媒体先做 LS04 音频遮盖/无稳定音高复核；视觉候选须等待新 Chapter 3 合同，仍禁止运行集成 | LS04 运行门禁通过；媒体音频候选完成来源和遮盖审查；视觉合同可供候选生产但 `runtimeIntegrationAllowed=false` |
| `G Chapter 3 扩展` | 原型按 `LS05 -> LS06/LS07 -> LS08` 分里程碑实现 | 主管逐批独立审新增集合、错误修复、音频/指针生命周期和前章回归 | 媒体保留 source-only 候选，不写运行 | `completed_at_343a_p2 / LS01-LS08_browser_passed / external_evidence_missing` |
| `H 方向性外部观察` | 原型仅修真实观察发现的 P0/P1，不做无关美化 | 主管可在冻结 `344a-p3` 上按 `docs/37` 组织教师预审和至少一名儿童的非音频方向性观察；M03/LS01-LS07 听音观察等待对应 AUDIO 批次通过 | 媒体只修明确的理解/听感问题 | `protocol_ready / participant_missing / audio_routes_partially_locked`；这仍不是最终 3-5 名儿童发布证据 |
| `I Chapter 4-5` | 当前先按 `docs/46` 只做 `C4-01 / LP01-LP02`；通过后才按 `docs/34` 补完整低音章，LP10 过桥/信号检查分开。之后按 `docs/35` 做 played 可继续的接力主线、TH05 分阶段持久化和可选合作 | 主管先审高低 C 泡泡、连续双八度键盘、C3 八度歧义、early-rest 和证据分轴；后续再审低音谱位、手部证据、LP10/TH05 恢复和可选路线同一永久奖励 | 媒体只在每个冻结坐标合同后制作对应候选，不提前整章生产 | 当前结束条件仅为 `C4-01 / LP01-LP02` 浏览器门禁通过； broader `34/35` 继续锁定 |
| `J 原生 iPad` | 仅在一个稳定教学纵切和 macOS/Xcode/实体 iPad 条件具备后创建独立原生任务；按 `docs/36` 做 N0-N3，并按 `docs/38` 执行设备矩阵，不在迁移中改课程 | 主管逐阶段核对 Web 冻结行为、35 项门禁、真机步骤和证据来源；架构只有在 N0 比较后决定 | 媒体只交付 approved 的原生运行格式、授权和真机混音材料 | N0-N3、`docs/38` 触屏/MIDI/麦克风/音频/压力矩阵、家长门、隐私、离线/恢复和 TestFlight/App Store 全部通过；拥有个人 Mac 不是门禁，但真实工具/设备证据不可缺 |
| `K 最终发布证据` | 仅修最终门禁问题 | 主管按 `docs/37` 组织儿童/教师复测，按 `docs/38` 收齐真机证据，按 `docs/39` 完成来源包、独立相似性和专业版权复核，再做隐私/App Store 完整审查并核对总账本 | 完成真机混音、最终素材、来源和授权归档 | 成熟 App 总完成账本主线必需行全部 `passed` |

### WIP 限制

- 同一时间最多一个任务写运行代码；
- 同一时间最多一个已解锁的媒体生产里程碑；
- 主管审查期间，原型和媒体都等待裁决，不继续修改被审对象；
- 一个任务没有交接上一里程碑时，不给它塞下一里程碑；
- 用户直接发给当前负责人的最新要求由该负责人优先处理；主管转述的新要求若不属于 `STOP/P0` 或 `BLOCKER/P1`，先放入下一阶段，不打断当前正确执行。

2026-07-11 用户额外解锁一项**坐标无关的 Grok CLI 能力核验**。主管最初预检 PATH 时无 `grok` 命令、无 `GROK_API_KEY`、无默认 Grok 配置和 Bun，只有 Node/npm；随后用户在媒体任务中提供了重定向安装目录 `G:\新电脑E盘\ai_install\grok`。已确认的事实为：

- `superagent-ai/grok-cli` / `grok-dev@1.1.7` 是 MIT 社区项目、并非 xAI 官方 CLI。主管独立 `npm pack --dry-run` 确认包为 102,328,186 bytes、559 files，含 60 个 `.grok/computer`、13 个 `.grok/generated-media`、13 个 `.claude/worktrees` 文件和两个约 70MB 二进制；该候选为 `contradicted / rejected`；
- 用户本地 `grok.exe` 是另一个候选。主管独立确认三个 Windows 发行副本均为 135,930,184 bytes、SHA-256 `1E9393391A399275A1863F9F457E86C5D904B10B9CBA987D0B81F8427FA625F2`、Authenticode `Valid`、签发者 `X.AI LLC`，版本为 `grok 0.2.93 (f00f96316d)`；官方原生身份为 `passed`；
- 主管在新空目录独立运行 `inspect`，仍发现 `C:\Users\Administrator\.claude\Claude.md`、49 个技能和 11 个 MCP；进一步重定向 `HOME/USERPROFILE/APPDATA/LOCALAPPDATA/XDG/CLAUDE_CONFIG_DIR/GROK_HOME` 后，仍读取真实管理员 Claude 指令和 11 个 MCP。环境变量包装不能构成隔离，当前共享宿主仍是 `contradicted`；
- 用户随后明确授权一次有上限的低风险探测。实际完成 3 次新生图、1 次纯文本和 1 次图生视频；会话日志记录模型为 `grok-4.5`、fingerprint `fp_a39489019fa99b6e`。没有观察到项目代码、截图、角色参考、音频或录音被读取或上传；
- 但会话自动注入了 Administrator 的 `Claude.md`、技能和 MCP 列表；IMG-02/IMG-03 在 prompt 明确限制本地读取时仍读取 `C:\Users\Administrator\.grok\skills\imagine\SKILL.md`。因此宿主状态为 `contradicted_local_instruction_read / no_project_file_observed / no_further_shared_host_calls`，不是隔离通过；
- 能力事实：1280x720 文生图、本地 Grok 自有参考图编辑和 544x544 图生视频均真实成功；所有原始/审核副本、prompt、完整文字回答、媒体事实和 9 项哈希已收进 `concepts/grok-cli-probe/`；
- 交付事实：道具图没有 alpha 且烘焙 `O2/Grow` 等文字；视频为 6.041667 秒并含意外 AAC，且从一片叶长到两片，不是第一片叶打开；双世界图不符合已选精细星空/矢量桥方向；三阶段种子只有大体一致且无可用分层。所有结果均禁止运行；
- 主管另审了用户先前通过 Grok 生成的 1024x1024 三角龙 JPG，SHA-256 `CBEF8C588722D1D26756872027E1E5923D8CF1EED56BC159D45E622CF1E4AB59`。它是通用可爱贴画，头盾尖角造成“三只角”视觉歧义，缺少项目装备、动作连续性和可裁切结构，状态为 `rejected_as_project_character / useful_only_as_capability_evidence`；
- 当前没有透明 PNG、合格角色一致动作表、可运行视频、音频生产、代码审查或版权清查证据。

这次结果只证明 Grok 可作为粗概念探索工具。种子图构图清楚，但材质、层次和独特性不足以直接作为成熟 App 素材；三角龙图更不能替代咚咚设定。无论后续结果如何，都不等于运行媒体、安全区、角色一致性、版权、儿童理解或真机混音通过。

### Grok CLI 独立审查工作单

状态：`audited / image_reference_video_capability_passed / delivery_failed / host_constraint_contradicted / probe_closed / runtime_prohibited`。主管未直接采用媒体任务自审，已独立查看会话日志、本地原图、接触表、媒体流、运行引用和 9 项 manifest 哈希：

| 审查项 | 通过条件 | 不能冒充的证据 | 当前状态 |
| --- | --- | --- | --- |
| 工具身份 | 官方原生二进制与社区包明确分开；签名、版本、哈希可复核 | 搜索结果、README 宣称 | `passed_official / rejected_community` |
| 供应链边界 | 不执行异常社区包；官方二进制签名和三副本一致 | 仅 `npm view` 成功 | `passed_official / contradicted_community` |
| Windows/headless | 实际 `--version`、`--help` 可退出；限定次数的图、文字和视频调用均能落地 | 源码里存在参数 | `passed_bounded_calls` |
| 授权与秘密 | 不读取/输出 token、设备码或 OAuth URL；只使用用户已有登录状态 | 报告“应该可以登录” | `passed_no_secret_exposure / existing_session_used` |
| 文生图 | 实际 prompt、工具调用、本地图片、尺寸和哈希完整 | README 或源码含 `generate_image` | `passed_capability / project_direction_rejected` |
| 图片编辑/参考图 | 只用 Grok 自有种子参考，工具明确接受且输出大体同物 | 普通文生图碰巧相似 | `passed_capability / consistency_reference_only` |
| 文生视频/图生视频 | MP4 可解码；时长、分辨率、帧率、音轨、首尾帧和哈希复核 | 工具声称无音轨或返回一个路径 | `passed_capability / prompt_compliance_rejected / runtime_rejected` |
| 教学安全 | 不烘焙精确答案、琴键、谱位；透明边界、安全区和音轨必须另证 | 画面可爱、没有明显报错 | `partial_generic_only / no_coordinate_or_alpha_proof` |
| 角色/低龄质量 | 精确数量、装备、动作一致性和主焦点需人工逐项核对 | 模型自评“适合儿童” | `seed_consistency_partial / triceratops_rejected` |
| 其他用途 | 完整文字回复可追溯；只作 prompt 草案，不能决定课程、版权或审美 | 一份用途清单或摘要 | `passed_draft_aid_only / further_calls_closed` |
| 目录与运行隔离 | 审查副本仅在 `concepts/grok-cli-probe`，运行引用 0；宿主本地读取约束必须真实可控 | 文件只是暂时没被页面显示 | `passed_runtime_boundary / contradicted_host_boundary` |
| 采用裁决 | 当前结果只保留能力证据；不得交给原型或继续在共享宿主扩测 | 因生成成功一次就替换现有管线 | `do_not_use_for_project_production / runtime_prohibited` |

正式结论：媒体任务的修正回执已通过主管独立复核，`docs/28_GROK_CLI_CAPABILITY_PROBE.md` 与 manifest 现为事实源。共享 Administrator 宿主的限定读取约束已被实际调用推翻，本轮例外正式封闭；今后连通用 prompt 也不得继续调用。仍禁止上传项目角色/界面参考、代码、截图、儿童或成人录音，禁止代码/竞品/版权审查和运行集成。下一次只有独立 Windows 用户或 VM 证明 `0 inherited instructions / 0 skills / 0 MCP / 0 unrelated local reads / 0 project files` 后，才可另行申请新探测。

2026-07-11 用户提出继续评估 Grok 对图像、视频和其他工作的帮助。主管未重开共享宿主调用，而是向媒体任务下发一个不影响 M08 的文档型支线：仅基于现有证据编制隔离环境复测方案、工具分工矩阵、最多 5-6 项中性测试包和采用裁决树。媒体已交付 `docs/28_GROK_ISOLATED_RETEST_AND_USE_MATRIX.md`，主管独立检查确认其保持 `planning_only / shared_host_calls_closed / runtimeApproval=false`，记录新增 Grok 调用、媒体、录音和运行改动均为 `0`。该文件不属于媒体生产里程碑，不得自动解锁下一次调用；真正复测仍须先在独立 Windows 用户或 VM 证明零继承、零无关读取和零项目输入。

2026-07-12 用户再次要求评估 Grok 对图像、视频和其他辅助工作的价值。主管重新激活媒体任务，但只允许执行“隔离环境存在性预检 + 离线基准包完善”：不得自行创建 Windows 用户或 VM，不得在当前 Administrator 宿主调用 `grok.exe`，不得上传项目 IP、截图、代码、课程文件或录音，也不得联系正在收口 `338a` 的原型任务。媒体只读预检未发现 `grok-media-probe` 独立用户/资料目录，也没有可用 Hyper-V VM 接口，因此实际 Grok 调用、登录、媒体生成、项目输入和录音输入均为 `0`，状态收口为 `blocked_waiting_isolated_environment`。`docs/28_GROK_ISOLATED_RETEST_AND_USE_MATRIX.md` 已补齐六项中性、单次、有停止条件的测试，以及完整 prompt、负面约束、自动/人工评分表、manifest 草案、接触表量表和工具分工；当前没有新结果进入 `source_candidate` 或 runtime。真正复测仍须由用户明确准备独立 Windows 标准用户或 VM，并先证明零继承、零无关读取和零项目输入。

### 本轮 Grok 限定工作单（已完成并封闭）

实际完成 3 次图片、1 次文本、1 次视频调用，没有重试或扩量。下表保留为审计用原始工作单，不再授权任何后续调用。

| 编号 | 低风险输入 | 要验证的能力 | 交付与判定 |
| --- | --- | --- | --- |
| `GROK-IMG-01` | 纯文字描述的 16:9 双星球与桥的空场景；无角色、UI、文字、谱表和琴键 | 宽画幅构图、主路径、教学安全留白、风格控制 | 原图、prompt、尺寸/哈希、主管可审接触表；只可标 `capability_probe` 或 `source_concept` |
| `GROK-IMG-02` | 纯文字描述的通用太空施工道具表；明确数量、无品牌和无文字 | 精确计数、物件区分、干净边界、是否能产透明 PNG | 核对数量、重复/融合、alpha；失败也保留为能力证据 |
| `GROK-IMG-03` | 只允许用 Grok 自己生成的种子图作为参考，制作同一颗种子的三阶段变化；不得上传项目图 | 参考图输入、同一对象一致性、状态变化 | 三阶段特征对照；若工具不支持则记 `missing`，不得改用项目素材补测 |
| `GROK-VID-01` | 仅当官方 CLI 实际暴露视频工具时，用中性种子做 2-4 秒无声开叶运动 | 是否真能生成/下载视频、时长、分辨率、帧率、音轨与首尾帧 | MP4/WebM 解码、ffprobe、哈希；无工具就如实记 `missing_not_supported`，不能用缩放幻灯片冒充 |
| `GROK-TEXT-01` | 不含项目文件的简化文字 brief | 生成 3 组镜头/素材提示词，并自列可能违反数量、文字和安全区的风险 | 仅作 prompt 草案；不能自批美术、课程、版权或儿童适用性 |

最终结果：项目读取、录音和运行引用均未观察到，但宿主无关指令/技能读取已发生，足以关闭共享宿主路线。Grok 图像、参考编辑和视频只能记作能力事实；透明交付、无字遵循、2-4 秒静音视频、项目视觉方向和成熟素材全部未通过。

课程节奏补充已在 2026-07-11 完成并同步给两条支线：

- `docs/33` 现已逐短课覆盖第一至第五章，固定每段的唯一教学目标、主要考察、游戏动词、永久成就和防重复职责；
- 同一课程路线必须根据投入顺利、犹豫、重复错误、乱按/追特效、疲劳和主动继续六类状态调整提示、检查与停点，但不得临时增加新音、新谱位、速度或第二个知识轴；
- 该分流已在 M08 与 `339d` 的 LS01 休息/返回连续性中通过；当前原型任务只扩到独立 `LS04`，不得顺手实现 LS05-LS08；
- 动画音频任务已结束 Grok 探测并回到等待；课程节奏约束继续保持为钢琴音优先、每 1-2 个动作一个小反馈、每短课一次故事高潮、乱按/疲劳时减少特效。任何现有能力证据都不是运行素材批准，也不能提前绑定 M08 或 Chapter 3。

## M08 独立审查工作单

状态：`completed / independently_passed_at_337c / retained_in_340a`。本节保留为 M08 历史审查记录；当前运行工作转入独立 LS05 三音隐藏听辨。

| 审查项 | 必须证明什么 | 最低证据 | 当前状态 |
| --- | --- | --- | --- |
| 范围冻结 | M01-M07、课程音域、音序、掌握语义、声音和输入合同没有被 M08 重做改变 | 改动文件清单；M01/M02/M03、M07 smoke；相关源对照 | `passed` |
| 统一版本 | HTML、Service Worker、测试断言、截图目录、docs/30、docs/20 使用同一 build id 和源哈希 | 版本扫描、冷离线、最新 gate log、坐标合同 | `passed_337c` |
| 初始视线层级 | 第一眼只有一个故事问题、一个施工谱、一个当前动作和真实键盘；星芽只承担一句唱名邀请 | 1024x768、1194x834、1366x1024 原尺寸截图和可见 DOM 表面计数 | `passed_browser / child_unverified` |
| 音符身份职责 | 蓝图槽表示建筑位置/步骤/字母，星芽说唱名，键盘负责真实位置；相同 C-D-E-F-G 不在多张卡重复 | 初始 DOM 文本/可见性审计；无阅读和减色截图 | `passed_browser` |
| 安装进展 | 每个正确音让对应真实屋顶片锁入槽位，1-2 个动作内有明确世界进展；未来答案不因动画泄露 | 初始、C 后、D 后、E 后、五片闭合截图与状态断言 | `passed_browser` |
| 合格进入气密检查 | 只有干净、投入、无 strong cue、无 assisted/modeled、无长等待的第一遍才可同 session 进入检查 | 正式 session 自动化；attempt/cue/response 字段和转场状态 | `passed_browser` |
| 气密状态不同 | 第二遍保留已安装屋顶，不拆除、不重建；五个槽改为气密点/压力检查，正确音逐点点亮 | seal 初始、中途、完成截图；屋顶片持续 placed；seal count 递增 | `passed_browser` |
| 少提示不泄露 | seal/check 作答前无强目标键光、无答案字母/颜色/角色位置泄露；错误后只揭示当前目标 | check 初始和 wrong-before/after DOM；颜色降低模式 | `passed_browser` |
| 错误修复 | 第一次错误说明刚按音并给短比较；不弹大卡、不清空进度、不让屋顶倒退 | guided 与 seal 各一组错误/恢复截图和状态 | `passed_browser` |
| 吃力延期 | repeated repair、强提示、共同完成、长等待、明显失焦任一出现时，不强迫气密检查 | 每种可自动模拟状态至少证明代表性分支；其余代码/状态审查 | `passed_browser` |
| 共同完成 | modeled/assisted 可让五片屋顶永久闭合并获得故事完成感，但不得写 stable/retained | 家长记录、session history、自然休息状态 | `passed_browser` |
| 故事与掌握分离 | guided M08 只证明五音路线玩过；不得写 F/G 单键家、FG03 邻音或 S01 谱桥稳定 | clean-state 家长证据和学习记录字段 | `passed_browser` |
| 自然休息 | 屋顶闭合或气密完成后自动到安全停点，不出现必须关闭/下一关/考试/失败弹窗，不自动启动下一 bundle | 完成后定时状态、页面截图、session 持久化 | `passed_browser` |
| 反馈克制 | M08 无飞行音名字粒子、大彩带、重复成功卡；琴键按压、屋顶锁定、星芽动作和最终压力光承担反馈 | 正确/错误/完成原尺寸截图；减少动态模式 | `passed_browser` |
| 三视口与保护区 | 星芽、施工谱、当前物件、键盘不互挡；无横纵溢出；触摸目标可靠 | 3 个目标视口、zones、iPad a11y、输入可靠性 | `passed_browser / physical_iPad_missing` |
| 回归与发布边界 | quick/strict/PWA/sessions/clean-state/roof/identity/suit/palette/motion/audio/input/contrast 通过；无 `concepts/**` 或未批准 `audio/**` 运行引用 | 原型自审后由主管独立重跑；运行引用扫描 | `passed_browser / release_art_clearance_missing` |

`roof-route-visual-check.mjs` 已在 `337c` 扩展为 `97/97`，覆盖三视口初始层级、五片世界屋顶、guided-to-seal 持续、错误不回退、气密完成、快速输入瞬时杂物为零、吃力延期和自然休息。该通过仍只属于浏览器实现，不替代真实儿童或实体 iPad 证据。

2026-07-11 `overhaul-336b` 只读检查点，非正式交接、非退回消息、非新基线：主管在 `?level=M08` 以触屏实际完成 `C-D-E-F-G`，并在目标 D 时故意按 E。当前可见画面证明初始信息数量已较集中、蓝图会把已完成字母标为 placed、第一遍结束后会进入五点气密检查；但同时留下以下待正式交接核对的阻断证据：

- C 正确后只有蓝图槽状态改变，场景中的 `.base.scene-roof` 仍为 `display:none`，背景基地没有可辨认的新屋顶片或永久世界变化；
- 气密检查开始时 `.base.scene-roof` 仍隐藏，蓝图从五块字母直接换成五个空点，已安装屋顶没有持续可见，当前不能证明“检查同一座已盖好的屋顶”；
- 已知错按 E 时角色只显示“再试一次，请按唱名：Re”，没有命名刚按的 `Mi/E` 或形成 `Mi/E -> Re/D` 的短比较，因此错误修复合同尚未通过；
- 本次有一次错误仍进入气密检查。课程合同只明确禁止 repeated repair、strong/assisted/modeled、长等待或失焦后强制检查；是否允许一次快速自修进入检查应由正式 session 字段和测试证明，不能仅凭该调试直链判断。

主管复跑当前 `npm run check:roof-route` 得到退出码 0，但脚本把蓝图内部 `.blueprint-roof-panel` 的 opacity 当作屋顶持续证据，没有检查 `.base.scene-roof` 或场景中真实屋顶层是否可见；wrong 断言也只要求目标 Do 与目标键 locator，没有要求命名刚按的音。因此这次绿色结果只能证明蓝图状态机和部分 session 分流，不能证明上述三项课程/故事门禁。正式交接需要补强断言，而不是引用现有绿灯覆盖缺口。

这些问题已经属于现有工作单中的“安装进展、气密状态不同、错误修复”三行，原型仍处于 active draft，主管不重复发送中途要求。若正式回执仍保留上述行为，则在阶段 B 合并退回。

2026-07-11 新二维素材 P1：原型将 `m08-flat-moon-workshop-bg-v1.webp`（1860x845、无 alpha）和 `xingya-suit-point-flat-m08-v1.webp`（1254x1254、含 alpha）接入 M08 草稿，快速包体因此暂时从 38 个运行文件/约 1.31 MB 增到 40 个/约 1.60 MB。主管独立原图审查确认角色只有两颗可见头芽，违反 `docs/25/27` 的三颗头芽身份锁定；现有 `check:xingya-suit` 不能用文件名或 DOM 存在替代视觉计数。已向 active 原型发送唯一一条 `BLOCKER/P1`：保留二维背景、布局和代码，只拒绝/替换该角色，正式候选必须明确三颗头芽、完整透明头盔、连体服、手套、靴子、背包和完整气密尾套，并交来源/哈希与人工计数。背景左侧已经存在完整圆顶建筑是否会削弱“中央新屋顶施工”的故事问题，留给本轮初始/C 后/完成截图证明，不单独打断。

P1 草稿修复检查点：原型已移除运行目录中的 v1，并改用 `xingya-suit-point-flat-m08-v2.webp`。主管独立查看 1254x1254 `yuva420p` 原图，确认三颗头芽均清楚可见，透明圆顶头盔、连体气密服、手套、靴子、生命维持/星星背包和完整包覆尾套存在，指向动作可读；SHA-256 为 `2B22265208A1D7F3F2210CADF35B9A13671B1BBA45524B9811B48492F7CF6095`，CSS 只引用 v2，运行扫描未发现 v1。该 P1 在“视觉身份草稿”层面关闭；素材来源/提示词、资产台账、最终构建哈希、三视口裁切和不遮挡蓝图仍等待原型正式交接，不能提前标 runtime approved。

最新二维状态图只读检查点，仍非正式交接：`roof_route_336b_ipad-1024x768_{initial,advanced,seal}.png` 已显示统一二维月球工地、v2 三芽星芽、左侧一句提示、地面投影蓝图、右侧吊装件和真实键盘，信息层级比前一版清楚；但 `advanced` 在完成 C/D 后主要只是字母牌描边/底条变化，中央虚线施工屋和背景世界没有可辨认的两块屋顶进展；`seal` 把字母换为五个检查点，却仍没有持续显示同一座已盖好的屋顶或安全压力状态。背景左侧圆顶建筑从 initial 起就完整存在且全程不变，因此不能替代孩子刚完成的目标屋顶。若正式回执仍保持这些状态，“每 1-2 音真实世界进展”和“检查同一座已安装屋顶”两项必须退回。原型当前仍主动修施工轮廓、箭头和三芽游戏尺寸可读性，主管不发送第二条中途 P1。

后续源码证据把该问题从截图疑问升级为必修 P1：`app.js` 只渲染 `.blueprint-roof-panel` 与 `.blueprint-seal-point`，`roof-blueprint-overrides.css` 只绘制蓝图和吊装件，项目中没有独立 world/scene roof panel；`roof-route-visual-check.mjs` 的 advanced/seal 断言也只读取 blueprint panel opacity。因此继续微调蓝图轮廓不可能满足真实世界因果。主管已发送一次核心因果 `BLOCKER/P1`：保留当前美术与布局，只在中央施工区增加无文字的五片世界屋顶层，证明 initial 缺片、C/D 后两片、guided 完整、seal 同屋顶持续、逐点气密和最终压力光，wrong 不回退；测试必须检查世界层而不是蓝图替身。该消息虽是本里程碑第二次 P1，但第一条仅阻止错误角色身份，本条若延迟到全量回归后才发会造成确定性大返工，符合立即纠偏条件。

P1 实现中检查点，仍非正式交接：原型现已在 `index.html` 增加独立 `#roofWorldBuild`，`app.js` 渲染 `.roof-world-cabin`、五个 `.roof-world-panel`、天窗、五个接缝灯和 `data-pressure-state`，且最新 `roof_route_336b_*` 截图可见 initial 五片未装轮廓、C/D 后两片真实落位、seal 时同一座完整屋顶继续存在。核心世界因果已从 `contradicted` 推进到 `implementation_present / acceptance_waiting`。但截至该检查点，`chrome-test/roof-route-visual-check.mjs` 仍未读取任何 `.roof-world-*` 数据，advanced/seal 绿灯仍只检查蓝图内部 opacity；也没有 seal complete 的安全压力光截图、world-layer wrong 不回退断言、统一新 build/cache、更新后的 `docs/20` 条目或正式里程碑回执。原型继续 active 收口，主管不提前放行，也不重复发送同一 P1。

后续专项脚本已继续补入世界层断言并实际生成 guided complete、seal progress、seal complete、advanced wrong 和吃力延期截图，证明五片闭合、同屋顶持续、接缝递增、最终 `safe` 压力状态及已装面板不回退。主管原尺寸审图同时发现两项冻结前 P1，已合并为一条窄消息发送，未扩大到其他关卡：其一，触屏 `pointerdown` 仍无条件调用 `showKeyPressLabel`，导致快速 C-D-E-F-G 时在 `flow_guided_complete`、`seal_progress`、`seal_complete` 上叠出多枚大号 Mi/Fa/Sol、Re/D、Sol/G 浮动标签，违反“屋顶变化承担反馈、快速输入不鼓励追特效”；其二，M08 wrong 气泡仍只写“再试一次，请按唱名：Do”，没有命名刚按的 Re/D 或形成短比较。原型只需在 M08 guided/seal 禁止浮动标签/音名字粒子并补 120-300ms transient 断言，同时让 guided/seal wrong 可见地说明刚按音与目标音，且世界进度不回退；随后再升版本和跑全量门禁。

### 2026-07-12 `overhaul-337c` 正式裁决

主管没有直接采用支线自审结论，而是重新运行并检查当前工作区。结论为：`passed_browser_baseline / release_and_external_evidence_missing`。

- M08 专项 `97/97`：三种 iPad 浏览器视口均证明五片世界屋顶从缺失到安装、同屋顶气密检查、错误不回退、最终安全压力光，以及快速输入后 120-300ms 内无浮动音名、粒子、flight 或 sprite；
- 全局状态与发布边界：`clean-state 124/124`、`sessions 72/72`、PWA `6/6`、quick/strict bundle 通过，运行包为 40 个文件、`1,607,471` bytes；
- 共享 UI/输入门禁：M01 `17/17`、assembly `13/13`、iPad a11y `43/43`、Xingya suit `23/23`、workshop identity `36/36`、staff mini `20/20`、staff repair `27/27`、staff readability `13/13`、palette `16/16`、contrast `9/9`、motion `19/19`、audio settings `13/13`、input reliability `12/12`；
- 坐标合同：`teaching-zones-overhaul-337c-v1`，六视口 0 failure，规范摘要 `8cc4e049e45b0aee373630085f17c707b3d16a2f557a4c31baa4d169f8310861`，仍为 `runtimeIntegrationAllowed=false`；
- 人工原尺寸审图：初始、即时错误和气密完成画面中，角色、气泡、施工谱、世界屋顶和键盘层级清楚，无明显遮挡；是否能被 4-6 岁儿童无需成人解释地理解仍为 `missing`；
- 资产边界：背景运行文件可追溯到同尺寸 PNG；当前三芽 v3 角色缺精确未压缩源、完整 prompt、生成 ID 和可复现导出链。两项仅批准当前原型，不批准 Release，外部视觉相似性审查也未完成；
- 运行引用扫描未发现 `concepts/**`、`audio/**`、technical preview 或 animatics。

因此 M08 的浏览器实现不再阻断下一运行里程碑；实体 iPad Safari、真实 MIDI/声学钢琴麦克风、教师、3-5 名儿童、素材来源和外部相似性继续保留为独立门禁。

2026-07-12 v4 来源候选独立补充：`xingya-suit-point-flat-m08-source-v4-alpha-tight.png` 的三芽、完整气密服、尾套、指向动作、透明边缘和三视口试装可以作为 `source_candidate_review_passed`；但它是以当前来源不完整的 v3 runtime 图为明确输入生成的编辑结果。完整 prompt、输入/输出哈希和抠图步骤只证明 `v3 -> v4` 的加工链可追溯，不能补齐 v3 更早的原创来源、参考或权利链。因此它仍是 `derivative_source_candidate / upstream_provenance_incomplete / runtime_not_selected / release_not_cleared`。`docs/16` 与候选记录中的“repairs traceability”应在下一次资产台账维护时收窄为“repairs derivative-process traceability”；该 P2 不打断当前 `338a` 运行里程碑。

## 下一里程碑冻结启动包：M03 + S01 窄修

状态：`completed / independently_passed / promoted_to_338a_baseline`。本节保留为历史冻结合同；下一运行工作已切换到 Chapter 3 可见首切片。

2026-07-12 实现中 P1：主管查看首批 `338a` 截图确认 M03 身份、隐藏答案、角色职责和花园入口方向正确，但 `M03_complete_1024x768.png` 仍沿用整屏“听出来了 / 下一站 M04”结果卡并残留飞出 Do 标签。该行为与本节“正确后留在场景、无大结果卡/飞行音名”的既有合同冲突，因此已发送一条不扩大范围的 P1：只把 M03 完成改为场景内轮子归位、短状态宣布和自动推进/休息，专项必须断言全屏 modal 隐藏及 120-300ms 瞬时杂物为 0。S01、其他关卡、音序、声音和掌握规则保持不动。

### 唯一目标

只解决两个已确认的第一、二章出口问题：

1. M03 从“同一动作在多处重复、唱名和音名字母角色不清”收敛为一个故事问题、一个重听入口和一句角色邀请；
2. S01 check 完成后把地图的持久故事当前位置停在花园入口，为下一里程碑 Chapter 3 建立入口，但本轮不创建 `C3-01`、不播放空气检测、不进入 LS01。

### In scope

- M03 初始、重听、首次错误揭示、正确、完成和自然休息的文案层级；
- M03 可见文本、ARIA 与测试中角色/音名/唱名职责；
- S01 check 正常、assisted/modeled、无 stable 和已有 stable 四种完成后的花园入口休息位置；
- S01 完成后刷新/重开仍落在花园入口，而不是依赖内存态 `state.staffComplete`；
- 对应的窄自动化、三视口截图、PWA/clean-state/session 回归、统一 build id 与 gate log。

### Out of scope

- 不改 M08、M01-M02、M04-M07、FG01-FG04 的教学或画面；
- 不实现 Chapter 3 地图内部、`CH3_ENTRY_AIR_CHECK`、LS01-LS08、开盔/收纳动画或任何媒体候选；
- 不改音域、M03 `D4 -> C4` 顺序、S01 `C-D-E-F-G-E` 谱位、played/stable/retained 阈值；
- 不接入 `concepts/**`、`audio/**`、technical preview 或家庭录音；
- 不借窄修继续叠加全局 CSS 或重做地图美术。

### M03 冻结合同

| 状态 | 唯一可见职责 | 不得出现 |
| --- | --- | --- |
| 初始/作答前 | 故事只说明轮子要唱；角色只说“轮子先唱一声，你来弹同一个音”；重听控件只承担重播 | 目标 `D/C`、`Re/Do`、黑键定位、目标键强光；三处重复“先听/再找” |
| 首次错误后 | 先说明孩子刚按的音，再重播目标；一句角色话写清“轮子唱 Re，你来弹 D”或“轮子唱 Do，你来弹 C” | `唱 Re/D`、把孩子弹键写成孩子唱歌、同时出现多张答案卡 |
| 正确后 | 轮子探头或滚入小车，钢琴音先于故事反馈 | 飞行音名字、大结果卡、额外下一关按钮 |
| 完成/证据 | 第一次完整 D-C 只写 played；另一次无提前揭示、无 strong cue 的 qualifying completion 才可写 stable | 同 session retained、第一次完成即 stable、错误后仍写 clean stable |

### S01 花园入口冻结合同

1. 花园入口的持久解锁依据是正式 `C2-03` session 已结束，而不是临时 `state.staffComplete`，因此刷新后仍成立。
2. assisted/modeled 可以完成故事并解锁入口，但不增加 S01 stable/retained；家长端保留 needs practice。
3. 地图显示花园入口为当前休息地点，旧 M01-M08 节点不得继续获得 `aria-current` 或“出发”徽章；S01 桥仍可作为以后复练入口，但不是自动当前地点。
4. 本里程碑的花园入口只是非交互休息标记，不能伪装成可点击按钮；下一里程碑才把它变成创建 `C3-01` 的正式入口。
5. 到达入口后不 autoplay、不恢复 AudioContext、不播放空气检测或教学音，不弹关闭/继续/下一关。
6. 没有完成正式 `C2-03` 时，入口不得提前成为当前地点；调试深链也不能伪造解锁。

### 最低验收证据

- M03 初始、重听、wrong-before/after、D 正确、C 正确、完成/休息的 DOM 与原尺寸截图；
- 可见文案扫描证明没有 `唱 Re/D`、重复“听完再找琴键”或作答前目标身份泄露；
- M03 played/stable/retained clean-state 和 session history 回归；
- S01 clean check、assisted/modeled、未 stable、已 stable、刷新恢复和调试深链六条路线；
- 花园入口前后地图 DOM、ARIA、当前节点唯一性和无 autoplay/无新 session 证明；
- `check:quick`、`check:bundle:strict`、`check:pwa-shell`、`check:sessions`、`check:clean-state`、M03 listening、S01 mini/full/check、zones、a11y、audio/input 回归；
- 改动文件、统一版本、截图、测试、`passed/partial/missing/contradicted` 和课程/装备/媒体/声音冲突检查。

### 2026-07-12 `overhaul-338a` 正式裁决

主管没有直接采用支线自审结论，而是重新读取源码与测试、查看五张原尺寸证据、复跑全部门禁，并额外执行真实 `C2-03` 端到端路线。结论为：`passed_browser_baseline / release_and_external_evidence_missing`。

- M03/garden 专项 `32/32`：作答前隐藏 D/C、Re/Do、目标键和 locator；重听/等待不泄题；错误只保留角色准确的轮子唱名与目标键修复；完成后车轮扣入小车，无全屏结果层和 120-300 ms 瞬时杂物；
- session/证据：`sessions 72/72`、`clean-state 124/124`。第一次正式 M03 只 played，第二次 qualifying 才 stable，同 session retained 为 0，调试深链不造正式证据；
- 真实 `C2-03` 补充审查：clean、assisted、modeled 三条实际 session 均结束并落到花园入口；assisted/modeled 的 stable/retained 为 0、`needsPractice=true`，没有 console warning/error；
- 共享门禁：M08 `97/97`、assembly `13/13`、M01 `17/17`、identity `36/36`、PWA `6/6`、a11y `43/43`、Xingya suit `23/23`、staff mini `20/20`、staff repair `27/27`、staff readability `13/13`、palette `16/16`、contrast `9/9`、motion `19/19`、audio settings `13/13`、input reliability `12/12`、quick/strict bundle 通过；
- 坐标合同：`teaching-zones-overhaul-338a-v1`，六视口 0 failure，规范摘要 `73c69d09bee907e41ebe18c606803cccb0d9d5db6fd37875a840d60795d4c400`，仍为 `runtimeIntegrationAllowed=false`；
- 人工原尺寸审图：M03 初始、错误、完成和花园入口/刷新画面中，主任务、角色、键盘、修复和休息地点清楚，无明显遮挡；是否能被 4-6 岁儿童无需成人解释地理解仍为 `missing`；
- 运行引用扫描和源码审查未发现 Chapter 3、未批准 `concepts/**`、`audio/**`、语音、SFX 或过场被提前接入。

因此第一、二章浏览器教学出口不再阻断 Chapter 3 首切片；实体 iPad Safari、真实 MIDI/声学钢琴麦克风、教师、3-5 名儿童、最终来源和外部相似性继续保留为独立门禁。

## 上一浏览器基线：`overhaul-340d`（已由 341a 取代）

`overhaul-340d` 是 LS05 之前的已复核浏览器基线，不是第三章全章、媒体运行集成、实体 iPad 或发布基线。它保留 `340a` 的第一、二章与 Chapter 3 LS01-LS04 行为，并将孩子可见的非角色表面统一为音名字母；M07 路线为 `C-D-E-D-C`，FG03 为 `E-F-G`，小恐龙对话框继续承担唱名到音名的口语联系。v3 还把 Chapter 3 记录态与实际 phase 原子绑定，关闭了导航和状态采样两类证据缺口。

原型任务自审记录在 `docs/20_GATE_RUN_LOG.md`。调度任务已独立复核：

- `check:quick` 通过：音符目标 38、音频合同 22、发布包 41 个文件、1,641,265 runtime bytes；`check:bundle:strict` 通过；
- `check:chapter3-ls04` `39/39`；声音关闭、音量 0 和 AudioContext 失败进入 `sound-paused` 且不评分，恢复后重播同一题；LS04 completion 不写第三章整章完成；
- `check:child-note-names` `160/160`；普通、减色、高对比、当前/完成/未来路线节点、伪元素和琴键均遵守“非角色表面只显示音名”；
- `check:supervisor-339c` `14/14`、`check:chapter3-visible` `74/74`、`check:sessions` `72/72`、`check:pwa-shell` `7/7`、`check:m01-hierarchy` `17/17`、`check:workshop-identity` `36/36`；
- `check:roof-route` `97/97`、`check:assembly-blueprint` `13/13`、`check:zones` 六视口 0 failure、`check:clean-state` `124/124`；
- `check:ipad-a11y` `43/43`、`check:staff-mini` `20/20`、`check:staff-repair` `27/27`、`check:staff-readability` `13/13`；
- `check:xingya-suit` `23/23`、`check:palette` `16/16`、`check:motion` `19/19`、`check:audio-settings` `13/13`、`check:input-reliability` `12/12`、`check:contrast` `9/9`；
- `check:m03-garden` `32/32`；主管探针额外实际完成 sealed/scanning/safe-open/one-wrong pause-resume、跨暂停第二错 assisted、刷新恢复和 LS02 清理边界；
- 人工查看跨导航第二错、one-wrong resume、LS02 resume、地图五态、M08 三视口和 PWA 冷启动证据。

`339a-339c` 的装备、章节身份、early-rest、普通返回、地图文案和 pending 连续性退回均已在 `339d` 关闭；`340a` v1 的 `sound-paused` 坐标缺态已在 v2 关闭；340d v1 的导航韧性和 v2 的 phase 误标已在 v3 关闭。历史裁决仍保留在上文，不因新基线覆盖。

当前坐标合同：

- `docs/30_TEACHING_ZONE_COORDINATE_CONTRACT_340D_V2.json`
- ID：`teaching-zones-overhaul-340d-v2`
- 规范摘要：`16a7cf0c921d9fcf3cc83d3ce7981446eeebcc2575ed6022b0098b8d4797f67d`
- 状态：`browser_coordinate_contract_passed_device_unverified`
- `runtimeIntegrationAllowed=false`

Chapter 3 媒体保护区合同：

- `docs/30_CHAPTER3_MEDIA_ZONE_CONTRACT_340D_V3.json`
- ID：`chapter3-media-zones-overhaul-340d-v3`
- 规范摘要：`063115a50e95d3cd1a5c7b7ef439debfe2ccb18fbeea9d7b6f3ddcc11f1f18c1`
- 固定九态、六视口、零 failure、零 browser error；记录态与实际 phase 有显式完整性断言
- `runtimeIntegrationAllowed=false`

340A V2、340C、340D v1 和 v2 合同继续作为历史证据保留；它们不替代 340D v3 的 LS01-LS04 历史证据或当前 341a LS05 合同，也不允许媒体运行集成。

两份合同只证明浏览器 DOM 保护区和 Chapter 3 九个关键状态。它们允许媒体制作坐标锁定候选，但不批准 `326a` 候选自动迁移，也不批准 iPad Safari、动画、语音或音效运行集成。

## 当前固定实施顺序

1. `overhaul-345d-audio-c` / `2405734` 是当前获批浏览器基线；它继承第一至第三章结构、LS08 与第四章 LP01-LP02，并使 M03、LS01-LS08、LP01/LP02 通过完整浏览器教学音生命周期总回归。
2. `C` 的有效 Git、LFS 与 WAV/PDF 忽略证明已通过；首个源码基线为 `b431c1ab347dd813ac1aa712a05c5f7ab150cf55`，没有远程仓库，也没有接收录音。后续修正必须用新 commit，不得重写该基线。
3. `docs/49` 已完成；当前唯一运行工作是 `docs/47` 的 `C4-02 / LP03`。只实现 C 锚石唤醒、D/E 落位、恢复/休息和证据分轴，不得混入 LP04、完整咚咚、低音谱表、左手、美术升级、媒体或课程阈值。
4. Chapter 3 source-only 美术已有多个候选和整合板；Grok Batch13/14 已冻结。Batch15 在媒体工具前因余额耗尽停止；Batch16 后续两个同 ID 工具触发、Batch18 一个全新 CH3-A 工具触发均被 spending-limit 拒绝且没有原片，Batch17 保持零调用。媒体现在必须等待用户确认充值或恢复合格订阅；恢复后只用新 ID 串行生产，任何结果仍须逐帧去重和真实 UI 合成审查，禁止复制到 runtime、改课程或打断 LP03。
5. 可在冻结 `345d` 上准备不收集身份、声音或影像的方向性观察；M03/LS01-LS08 与 LP01/LP02 可引用浏览器生命周期证据。任何早期观察都不能外推到未实现的 LP03+、第五章或最终发布。
6. `docs/46` 已成为 Chapter 4 `C4-01 / LP01-LP02` 的历史通过记录；LP03 现按 `docs/47` 单独解锁，LP04+、完整咚咚揭晓、左手、低音谱表、Chapter 5 和媒体运行集成继续锁定。
7. 所有媒体运行集成都必须逐文件哈希、真实 UI 合成、来源/相似性、教学安全和运行回归分别通过；source-clearance、技术预演或生成成功不能自动变成 runtime approved。
8. Chapter 4、5、原生 iPad、TestFlight 和最终发布按 `I -> J -> K` 推进。A-G 单词玩法继续保持最后项目，不抢占主线资源。

该顺序不允许两个任务同时修改运行代码，也不允许未批准素材先占位进入发布路径。

### 2026-07-13 LS06/LS07 garden-art-v2 独立审图裁决

媒体任务在 `concepts/runtime-candidates/ls06-ls07-garden-art-v2/` 交付 Direction D 背景、沿用 v1 的 LS06/LS07 前景道具、三张参考图引导星芽动作切图和 28 张冻结 `342a` 真实 UI 审核合成。主管没有采用 manifest 的人工自审，直接打开批准模型表、原始图、透明棋盘和 1024/1194 合成后裁决为：`art_direction_reference_partial / character_source_rejected / runtime_integration_forbidden`。

- Direction D 的 3D clay 深度、地面感、材质和色彩范围明显优于 Direction C，可锁定为下一轮统一花园美术的方向参考；当前背景原图仍是 comparison candidate，不是可复制到 runtime 的批准资产。
- 星芽动作稿与 `xingya-model-sheet-v1.png` 冲突：批准模型为三枚光滑青绿色头芽/背棘，新稿变成三片大叶加一枚前方小芽，实际形成四个头顶部件，脸型和尾背棘也漂移。三张透明切图还分别出现右侧黄色碎片或左侧红色悬空碎片，因此整组改判 `rejected_source_concept`，不得保留 selected/source-clearance 语义。
- 28 张合成和 156/156 几何通过只证明坐标不碰保护区。人工画面仍显示新背景与 v1 小道具材质、尺度不统一，白色轨迹圈和浅蓝占位层争抢注意力，道具像贴在场景上而不是长在花园里；这不满足成熟 App 的统一美术门禁。
- 媒体下一轮只做 source-only v3：以 Direction D 为风格参考重做同材质、低龄可读的大号 LS06 回声石/藤拱和 LS07 水滴/边界花状态；真实 UI 合成必须保留现有运行层一起审。暂不再次生成星芽，先复用批准模型或既有运行姿势作 audit-only 合成。
- `runtimeApproval=false`、`integrationAllowed=false`、`releaseCleared=false` 和 runtime references `0` 保持不变。v3 正式冻结并经主管逐图、逐哈希审查前，不联系原型任务、不复制文件、不建立运行引用。

## 当前必须保持未通过的门禁

- 孩子的星芽录音尚未提供，也未授权上传或训练声音模型；
- 用户的咚咚录音尚未提供；
- Gemini MCP 已通过官方 MCP Inspector 实测；当前工具表没有 Veo、视频生成、轮询、编辑或下载能力，因此本轮 Gemini/Veo 视频成片为 `missing`，三张静态生成稿均为拒绝稿；
- 项目根已建立有效 Git；2026-07-13 复核的 `private-recordings/xingya/raw/test.wav` 与 `private-recordings/consent-private/test.pdf` 均由 `.gitignore:39 private-recordings/**` 命中，README 保持未忽略。当前仍未创建或接收真实录音/授权文件，录音接收只有在用户明确提供、用途授权和唯一负责人接收流程成立后才可开启；
- `326a` 的 8 条 safety-zone v2 透明候选为 `source_clearance_candidate_unapproved`，不能自动迁移到 `338a`、`339a`、`339b`、`339c`、`339d` 或任何后续布局；
- Gemini Shot 01 因尾部气密套不完整被拒绝，Shot 05 因咚咚角色漂移为通用四足三角龙被拒绝；两者都只能作动作参考，原 MP4 AAC 也不得进入运行混音；
- 过场动画尚未作为运行素材集成并在 iPad 验证；
- 角色语音与钢琴音的真实扬声器混音尚未验证；
- 真实 4-6 岁孩子对完整故事、星桥和听音流程的理解仍未形成足够证据；
- Web 原型不等于原生 iPad App Store 版本已经完成。

## 对用户的报告格式

每个里程碑只报告五件事：

1. 哪个任务完成了什么；
2. 调度任务独立检查了什么；
3. 哪些证据支持 `passed`；
4. 哪些仍为 `partial`、`missing` 或 `contradicted`；
5. 下一步由谁负责，哪些文件被冻结。

整个星龙工坊只有在课程合同、运行原型、素材版权/隐私、iPad 真机、MIDI 输入和真实儿童观察分别达到预定门禁后，才可以声称达到成熟 App 的发布准备状态。
