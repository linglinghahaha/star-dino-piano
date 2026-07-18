# 全课程教学钢琴音生命周期主管审计工作单

状态：`formal_work_order_active / AUDIO_A_B_passed / AUDIO_C_next / blocks_LP03_dispatch / media_locked`

本工作单解决一个系统性教学证据问题，不新增关卡。主管在 `C4-01 / 344a` 独立源审中确认：旧运行把 `playPianoNote()` 成功排程和墙钟计时误当成声音真实 started/ended；同源模式不仅存在于 C4 和 LS08，也存在于 M03、LS01-LS07。若 AudioContext 已 suspended、`resume()` 被拒绝或播放中再次挂起，旧代码可能在孩子没有听到目标音时显示“听到了”、开放作答、推进故事或写学习证据。

`overhaul-344a-p3` 已建立共享受控播放句柄、迁移 LS08 与 C4-01，并在提交 `8cea6d46b725c26d2c8272086eab56b271750b18` 通过主管独立审查。AUDIO-A 与 AUDIO-B 现已分别冻结通过；本工作单仍是 LP03 之前唯一运行工作，下一批只做 `AUDIO-C`。不得与 LP03、C4-R01、美术、视频、语音或新课程合并。

## 一、为什么这是教学阻断项

- 听辨任务的题目就是声音。只证明 oscillator 被排程，不能证明题目已经呈现。
- 墙钟到点不能冒充 Web Audio 时间轴结束；页面后台、系统打断和 Safari 自动挂起会让两者分离。
- “没听见却被评分”会污染首答、wrongCount、stable、retained 和复习调度，测试再多也只是验证错误语义稳定复现。
- 浏览器 `onended` 仍不能证明扬声器或耳机真的可闻；它只能建立浏览器内最强可审计证据。实体 iPad 与人工听审继续是独立 missing 项。

## 二、事件分类

### A. audio-required

以下动作没有真实教学音 started/ended 就不能开放评分或推进故事：

- M03 小车轮目标音、重听、wrong repair 和 modeled；
- LS01-LS03 可见声音模型、孩子触屏回声和 modeled completion；
- LS04-LS05 的 guide、hidden target、孩子选择回放、wrong repair、modeled；
- LS06-LS07 的 guide、hidden target、整组重听、wrong pair repair、modeled；
- LS08 与 C4-01 已由 344a 迁移的全部教学序列，作为共享回归基准。

`audio-required` 事件只有在受控句柄确认 AudioContext 为 `running`、第一声进入运行中的音频时间轴后才写 `startedAt`；只有最后一个实际 source/oscillator 触发 `ended` 后才可写 `endedAt`。

### B. external-audio

- 原声钢琴麦克风以 accepted onset 加 quiet/end gate 为真实外部事件，不能等待 App oscillator 才承认输入。
- MIDI note-on 证明控制器事件，不自动证明外部乐器发声；若任务依赖 App 本地监听，仍必须等待本地教学音句柄。
- MIDI note-off、麦克风 quiet 和本地 oscillator ended 必须分别记录，不能合并成一个笼统的“完成”。

### C. audio-supportive

纯视觉键位任务若产品合同允许静音继续，可以按位置完成故事，但必须记录 `localMonitorStarted=false`，且家长端不能把它描述为听音或声音联系证据。任何原合同明确要求“琴键发声后才提交”的任务仍属于 A 类，不能借本分类降级。

## 三、共享播放句柄合同

每个教学序列至少提供：

- 唯一 `playbackId`、context、kind、reason、midis 和调用来源；
- `scheduledAt`、`startedAt`、`endedAt`、`interruptedAt`；
- Web Audio `startAudioTime/endAudioTime` 与 context state；
- 生命周期 trace 的事件类型与教学序列类型分字段记录：例如事件 `kind=transaction-ended`，序列另写 `sequenceKind=target-pair/wrong-repair/...`；结束记录不得覆盖开始记录的类型并被误计为第二次播放；
- `onStarted`、`onEnded`、`onInterrupted` 三个互斥、幂等回调；
- 最后一声的真实 `ended` 驱动完成；wall-clock 只作 watchdog，触发时进入 interrupted/sound-paused；
- 页面刷新后旧内存句柄不得复活，持久事务必须以同一逻辑来源重新播放；旧句柄迟到的 callback 不能写入新事务；
- AudioContext `statechange` 为 suspended/closed 时，活动教学序列立即进入 interrupted；恢复必须由明确手势触发并产生新的 playbackId；
- 最后 source/oscillator 的 `onended` 汇合点必须再次确认 context 仍为 `running`、句柄仍是当前事务且尚未 settled。即使浏览器先派发 `onended`、后派发 suspended/closed 的 `statechange`，也只能 interrupted，不能写 ended；
- 声音关闭、音量 0、构造器失败、resume reject、后台挂起和播放节点异常都不得写假 started/ended。

浏览器没有可靠的 oscillator `onstart` 事件，因此 `startedAt` 的最低可接受代理是：context 已确认 `running`，第一声以当前 audio time 立即启动，且活动句柄仍是当前事务。单纯调用 `osc.start()` 或 resolve 一个排程函数不够。

## 四、逐关迁移要求

### M03

- 页面只有真实目标音 started 后才显示“已听到”状态，ended 后才开放同音键作答。
- 目标播放中输入只写 observation；声音未启动、被中断或刷新不能评分。
- 两级等待仍只重播目标，不泄露 D/C；来源、重听次数和恢复保持幂等。
- 屏幕琴键的孩子音、MIDI 本地监听和 wrong repair 不能继续走不受控的并行 `playPianoNote()`。一次物理输入只能产生一条孩子音事务；wrong repair 必须等孩子音真实 ended 后再顺序播放目标音，不能在两个音仍重叠时让孩子比较。

### LS01-LS03

- 可见模型仍不建立 stable，但模型音、孩子回声音和 modeled 动作必须真实结束后才开叶、伸叶或接住星光。
- 强提示/共同完成可以推进故事，不能因声音失败生成 child correct。
- 每个 action 必须先有一个可见、未计分的真实目标模型音；只有“我唱 Do/Re/Mi”的文字或目标键高亮不算模型。模型真实 ended 后才进入可输入态，模型播放中触摸、MIDI 或麦克风事件只作 observation。
- 屏幕琴键回声和需要 App 本地监听的 MIDI 回声必须走受控 child-echo 句柄，真实 ended 后才提交 correct/wrong 和世界动作；通用键盘 pointer/click 路径不得先额外播放一份重复钢琴音。实验麦克风保持 accepted onset + quiet/end 的外部事务，不得让扬声器回放污染识别。
- 答错后按“孩子刚才的音 -> 当前目标音”顺序完整播放，两声不重叠；结束后才重新开放输入。普通提示区只显示字母音名，唱名仍只允许由星芽对话框说出，错误修复不能退化成只亮答案键。
- modeled completion 也必须先完整播放当前目标音，再推进共同完成；声音关闭、音量 0、resume reject、地图或刷新中断时只进入 sound-paused，不能静默长出叶片。

### LS04-LS05

- hidden target ended 前不开放候选评分；候选选择播放真实 started 后才冻结首答，repair/model ended 后才推进。
- target、孩子重听和系统恢复来源分开，刷新不能把 child replay 降成 system replay。

### LS06-LS07

- 可见 guide 与 hidden check 分开；目标音、整组重听、wrong pair 和 modeled 均走同一受控句柄。
- 答案不能通过左右声像、动画开始时间或某侧先亮泄露；教学音保持中置等权。

### LS08 / C4 回归

- 344a 的 verified playback primitive、低回声门禁和 C4 事务不得回退。
- M03/LS01-LS07 迁移不能改变 LS08、LP01/LP02 的阈值、故事状态或音名政策。

## 五、实施批次与主管停点

全课程迁移是同一个阻断工作单，但不得堆成一个无法审查的大提交。固定按下面三个连续里程碑执行；前一批没有冻结证据时不得开始后一批，三批全部通过前仍不得开始 LP03：

| 里程碑 | 唯一运行范围 | 为什么这样分 | 每批最低回归 | 冻结方式 |
| --- | --- | --- | --- | --- |
| `AUDIO-A` | M03、LS01-LS03 | 单音目标与可见模仿属于同一简单生命周期家族，先验证共享句柄能安全替换旧排程/墙钟而不改变第一片至第三片叶的故事因果 | 对应专项、sessions、clean-state、M03/garden、LS08、C4、child-note-names、audio settings、input reliability、quick/strict | 主管独立源审与专项通过后单独选择性提交；不得夹带 UI、美术、课程或媒体 |
| `AUDIO-B` | LS04-LS05 | 两个隐藏单音听辨共享 target、child replay、wrong repair、modeled 和 resume 语义，但必须分别保留两音与三音集合的阈值和 seed | LS04、LS05、LS08、C4、sessions、clean-state、child-note-names、audio/input/PWA、quick/strict | 只在 `AUDIO-A` 已冻结提交上开始；主管独立验证未听见不评分、来源不漂移后单独提交 |
| `AUDIO-C` | LS06-LS07 | 两个成对比较任务共享 guide/hidden pair/whole-pair replay/repair/model，答案泄露和 route rearm 风险高于单音任务 | LS06-LS07、LS08、C4、全部 Chapter 3 专项、sessions、clean-state、输入/音名/可访问性、六视口合同、quick/strict | 完成后执行全课程总回归与最终合同，再解除 `docs/47` 的 LP03 阻断 |

固定调度规则：

- 每个里程碑都复用 344a 已冻结的 `playTeachingPianoSequence`，不能另造一套局部播放计时器；若共享原语本身需要修改，先停下并重新跑 LS08/C4 全量专项和反序回调探针。
- 每批最多只有一个生产写者；媒体 Batch、角色语音、音效、布局、美术和新课程继续并行只读或 source-only，不能混进运行差异。
- 一个里程碑内可以先做定向探针再跑完整专项，但最终证据必须来自同一源码 SHA；中途绿灯、旧合同和旧截图不能拼成放行证据。
- 每批完成后由主管检查 staged/unstaged 双层、运行引用和允许文件，再选择性提交。不得让上一批的旧暂存版本覆盖最新未暂存实现。
- 三批是审查停点，不是缩小课程。任何一批通过都不能单独恢复“全课程 audio-lifecycle verified”称号，也不能解锁 LP03。

## 六、会话与恢复

- 地图请求只能排队到真实活动句柄：持久事务必须同时满足未 ended、未 interrupted、playbackId 等于当前内存句柄，且句柄状态为 scheduled/playing。若已 interrupted，应立即允许离开并保持同一题和逻辑来源，不能排队到永远不会 ended 的旧事务，也不能为了导航伪造结束。
- 若孩子已在真实活动句柄期间请求返回地图，而句柄随后因 suspended、closed、resume reject、watchdog、visibility、pagehide 或 blur 进入 interrupted，已排队的单次返回必须立即兑现；不能要求孩子再点一次，也不能让 `returnQueued` 留在永远不会 ended 的事务上。LS08 的 guide/pair/repair/low-echo 与 C4 的 model/target/repair/child-input 均适用。
- 麦克风 accepted onset 到 quiet/end gate 属于无 `playbackId` 的外部活动事务，不能套用本地 oscillator 的排队条件。LP02 在该事务中返回地图时必须把它明确记为 interrupted、保留 started 但不写 ended/score，清理 release timeout，并在同一题重进后要求一次明确重试；地图期间到达的 quiet/release 不得在后台提交答案。
- reload/boot 检测到未 ended 的持久事务时进入 sound-paused；明确恢复后只呈现一次、计数一次。
- visibility/pagehide、窗口失焦和 AudioContext statechange 都应清理内存句柄；不能留下迟到 timer 或 onended 修改新页面状态。
- 刷新/中断时为防旧手势续写而取消输入武装后，repair 真正结束且所有 route 都无 held input 时必须恢复可输入状态；若仍有 pointer、MIDI note 或麦克风持续音则继续等待真实 release/quiet。既不能让旧长按穿过恢复，也不能让下一次新起音永久卡成 `not-rearmed`。
- started 但未 ended 的题不进入 scoredCalls、resolved、世界进度或 mastery；未 started 的题也不进入 presented count。
- 已真实 ended 的事务刷新后不得重播、重复计数或再次推进。

## 七、自动化最低清单

1. 共享播放句柄：running start、最后 source ended、suspended、closed、resume reject、watchdog、取消和迟到 callback 幂等；另用忠实 fake context 覆盖“先静默切 suspended/closed、再触发全部 onended、最后才派 statechange”的反序。
2. 使用真实 AudioContext 实例先播放、再 `suspend()` 并临时让 `resume()` reject；不能只用 constructor throw 假对象。
3. 播放中 suspend：wall-clock 超过原时长后仍不得 ended/score；恢复后完整重播并恰好结束一次。
4. M03 target、wrong repair、刷新和音量 0；未听见不显示“已听到”或评分。
5. LS01-LS03 每个 action 都先产生真实、未计分的目标模型事务；模型 ended 前不开放评分。屏幕/MIDI 的 child-echo、麦克风 onset-to-quiet、wrong repair 和 modeled 分轴记录，世界动作只在对应 ended 后发生；一次 pointer/click 不得同时触发通用键盘声和受控回声两份音。
6. LS04、LS05、LS06/LS07 各覆盖 target、child replay、wrong repair、modeled、地图/刷新和 stable 阻断。
7. 外部麦克风 accepted onset + quiet end 保持独立；MIDI note-on/off 与本地监听分轴。另覆盖 LP02 external-input started -> map -> 同题重进 -> 明确重试：旧事务 interrupted、ended 为空、地图期间 quiet 不提交、wrong/score/地基均不增加。
8. 旧事务 callback、重复恢复、Enter/Space/VoiceOver、pointerup/cancel 和页面外释放均只提交一次；至少覆盖一次 sound-paused -> map -> 同题重进 -> 明确恢复，以及一次 active playback -> 已请求 map -> 系统中断 -> 自动到 map，证明不死锁、不要求二次返回、不丢 pending、不虚构 score，恢复后只完成一次。每个 playback 的开始 trace 与 `transaction-ended` 各自只计一次，序列类型不得覆盖生命周期事件类型。
9. sessions、clean-state、child-note-names、audio settings、input reliability、PWA、iPad a11y、各章专项、六视口合同、quick 与 strict bundle 通过。
10. 原尺寸页面检查 sound-paused、target-playing、waiting、wrong、modeled 和恢复态；零 browser error。

## 八、放行与剩余证据

- 344a 前置条件已由 `overhaul-344a-p3` / `8cea6d46b725c26d2c8272086eab56b271750b18` 满足；`AUDIO-A` 已在 `overhaul-345b-audio-a` / `84a8f44213893304736d29ea45f7336d0730469d` 独立通过并冻结。它覆盖 M03 与 LS01-LS03，最终专项为 `66/66`。
- `AUDIO-B` 已在 `overhaul-345c-audio-b` / `2a8a17529aeffd47a8666f21e175ba822d48347f` 独立通过并冻结。它覆盖 LS04-LS05，最终专项为 `46/46`；`app.js` SHA-256 为 `E59D9F99C3C1A1406A180D3E88A899EEBD5846A0BCB43E3919973E77D9C3E74D`。LS04 `39/39`、LS05 `66/66`、AUDIO-A `66/66`、sessions `74/74`、LS08 `131/131`、C4 `137/137`、孩子端音名 `224/224`、PWA/音频设置/输入、quick 与 strict bundle 均由主管独立复跑通过。
- 下一唯一运行批次为 `AUDIO-C`（LS06-LS07）。必须从 345c 干净提交开始，保持各自 seed、pair 顺序、guide/hidden 边界、whole-pair replay、首答阈值和故事结果，不得夹带 LP03、美术、媒体或课程调整。
- 只有 `AUDIO-A`、`AUDIO-B`、`AUDIO-C` 三批都独立通过、分别冻结提交并完成全课程总回归后，既有 M03/LS01-LS07 浏览器听辨证据才可重新称为 audio-lifecycle verified，并解锁 `docs/47` 的 LP03；AUDIO-A/B 两批通过不能提前解锁。
- 不因该浏览器审计声称实体 iPad Safari、扬声器/耳机、蓝牙延迟、真实 MIDI、本地原声钢琴麦克风、教师或儿童观察通过。
- 原型任务必须选择性提交运行、专项、合同与 gate log；不得暂存主管 docs、`concepts/**`、`audio/**` 或未批准媒体。
