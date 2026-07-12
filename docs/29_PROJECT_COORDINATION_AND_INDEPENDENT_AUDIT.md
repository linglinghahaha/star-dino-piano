# 星龙工坊整体调度与独立审查规则

状态：2026-07-13 调度重排继续生效；`overhaul-341a` 已完成主管独立复核并晋升为最新浏览器实现基线。它在 `340d` 的第一、二章、LS01-LS04、音名-only 和确定性证据基础上，完成独立 `C3-04 / LS05` C/D/E 三音听后找键。当前唯一运行工作为 `C3-05 / LS06` 与 `C3-06 / LS07` 的 `overhaul-342a` 收口；LS08、正式媒体集成、全局重构和第四章继续锁定。LS05 花粉铃/三花方向 C 已通过主管 source-clearance 审图，但仍为 `runtimeApproval=false / releaseCleared=false`；它只可作为后续精修基底，不能替代发布美术。LS04 植物/声源提取包仍为 `rejected_extraction`，现有离线音频仍缺人工耳机/扬声器/iPad 听审。没有远程 Git、真实录音、实体 iPad、教师、儿童、最终来源/外部相似性、原生工程、TestFlight 或商店证据，项目整体未达到发布准备状态。

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

## 2026-07-13 LS08 解锁前课程合同预审

裁决：`spec_consistency_corrected / runtime_still_locked / LS06_LS07_gate_waiting`。

- 预审发现 `docs/32` 旧段落曾要求 LS08 可见带路困难后，下一 session 直接开始四组隐藏 check；这与 `docs/24/45` 的补教逻辑冲突，也会让最需要教学的孩子跳过带路直接进入考试。
- `docs/03/32/33/45` 已统一：顺利带路可在同一短课进入一次 check；困难时在中性根芽休息，下次先重做更短的 C-D 可见带路；连续两个 guide session 仍需 strong/modeled 时回到 LS05 C/D 单音补教，不直接开放隐藏双音 check。
- C-C 跨地图/刷新连续性补充 `secondOnsetRequiresFreshRearm`：保留第一输入和真实证据，但不能把活动 pointer、仍按住的 MIDI note 或未经过安静重置的麦克风持久化成已重新武装；恢复后必须观察新的释放/中性阶段再接收第二起音。
- 这些修正只提高未来工作单一致性，不解锁 LS08。必须先完成 342a 独立审查、工作树清理和主管明确派发。

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
- 家长端和不泄题的无障碍说明可以保留 `C / Do` 双身份；隐藏听辨和少提示检查仍禁止通过 ARIA、title、alt、隐藏文字、class、颜色、动作或目标键泄题。
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

### 发消息前的固定检查

主管给任何任务发消息前必须先做以下检查：

1. 读取该任务最近的用户要求、正在进行的 turn 和最后一次承诺范围；
2. 判断对方是 `active`、`handoff_waiting`、`idle` 还是 `blocked`；
3. 判断消息是必须立刻停止错误，还是只影响下一阶段；
4. 检查新内容是否已经在先前合同中，避免重复发送同一要求；
5. 若对方正在正确执行，普通补充只写进本文件的待办队列，不发送；
6. 若必须打断，只发一条短消息，明确“为什么现在必须停”和“哪些工作仍可保留”。

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
| 课程故事/主管 | `active / 341a browser baseline passed / LS06-LS07 dispatched` | 维护课程合同和成熟 App 总账本；按 `docs/44` 独立复核 LS06-LS07，并审查并行 LS05 美术候选 | 不写运行文件或媒体；只在正式交接或 P0/P1 时介入 | LS06/LS07 冻结交接、媒体 source 候选交接，或新 P0/P1 |
| 原型/UI | `ready / C3-05 LS06 + C3-06 LS07 only` | 按 `docs/44` 分两个自然停点实现 C/G 与 E/F 听辨、证据、恢复和独立合同；保持 341a 既有行为 | 不做 LS08、媒体接入、全局 CSS 重构、新角色资产或课程改写 | LS06-LS07 冻结提交、自审与证据正式交接 |
| 动画/语音/音效 | `ready / LS05 source-clearance art only / runtime forbidden` | 基于最终 341a 合同制作花粉铃与三花透明 source 候选、接触表和 audit-only 合成；保留音频人工听审 missing | 不重做已拒绝的 LS04 提取、不接入 runtime/音频、不处理家庭录音、不制作 LS06+ 美术 | LS05 source 候选冻结交接，或合法录音接收条件满足时 |
| 用户/真机/儿童证据 | `protocols_ready / participants_and_devices_waiting` | `docs/37` 已锁定教师/儿童观察；`docs/38` 已锁定实体 iPad、MIDI、麦克风和音频测试 | 不要求现在提供私密录音、孩子资料或伪造真机截图；先让运行流程稳定 | 冻结纵切后才请求方向性观察；原生 N0/N1 后才执行真机矩阵；最终候选再做 3-5 名复测 |

工作区当前的已复核浏览器基线是 `341a`。它不是第三章全章基线、媒体集成基线、实体 iPad 基线或 Release 基线；现阶段只能称 `LS01-LS05 browser slice and note-name UI passed`。下一运行改动必须从该行为冻结点启动，不能反向改写 `341a` 已通过事实。

### 当前命令队列

| 顺序 | 所有者 | 指令 | 当前动作 |
| --- | --- | --- | --- |
| `NOW` | 原型/UI | 按 `docs/32` 与正式 `docs/44` 执行 `C3-05 / LS06` 与 `C3-06 / LS07`；分两个自然停点，不做 LS08 | `dispatched / LS08_locked` |
| `NEXT-AUDIT` | 主管 | 分别审 LS06 C/G 与 LS07 E/F 的 guide/check、无位置泄题、call-local repair、first-response、跨 session、自然停点、音名和独立合同 | `waiting_for_ls06_ls07_handoff` |
| `NEXT-AUDIO-AUDIT` | 主管 | 按 `docs/42_LS04_AUDIO_SUPERVISOR_ACCEPTANCE_CHECKLIST.md` 独立复核离线 A/B、540ms ducking、音高风险、哈希和运行引用 0 | `independently_passed_offline_package / runtime_forbidden / human_and_ipad_listening_missing` |
| `REVIEW` | 主管 | 对 `341a` 的源码、LS05、音名规则、无声恢复、原图、专项、共享回归、PWA、坐标合同和发布包做独立裁决 | `passed_browser_baseline / LS01-LS05_only / external_evidence_missing` |
| `NEXT-1` | 主管/基础设施 | 建立有效 Git 与私密录音忽略验证；不处理真实录音 | `passed_repo_ignore_lfs / baseline_commit_b431c1a` |
| `NEXT-2` | 原型/UI | 按本文件冻结启动包窄修 M03 重复/角色主语与 S01 花园入口 | `completed_at_338a / independently_passed` |
| `NEXT-3` | 原型/UI | 按 `docs/32` 实现 Chapter 3 可见首切片 | `completed_at_339d / independently_passed / LS04_unlocked` |
| `NEXT-NATIVE` | 未来独立原生任务 | 按 `docs/36` 依次做 N0 平台探针、N1 教学纵切、N2 五章迁移、N3 TestFlight/商店 | `spec_ready / web_reference_ready_at_341a / task_not_created / locked_by_mac_xcode_account_and_physical_ipad` |
| `EXTERNAL-EVIDENCE` | 主管/教师/家长 | 按 `docs/37` 执行教师复核、方向性儿童观察和最终 3-5 名复测 | `protocol_ready / observations_locked_by_frozen_build` |
| `DEVICE-EVIDENCE` | 未来原生任务/主管 | 按 `docs/38` 执行实体 iPad、触屏、USB/BLE MIDI、麦克风、音频会话、生命周期和压力矩阵 | `protocol_ready / native_and_hardware_evidence_missing` |
| `IP-EVIDENCE` | 主管/媒体/外部专业人员 | 按 `docs/39` 收齐来源包、最终哈希、独立视觉/音乐相似性复核和发布地区专业意见 | `protocol_ready / final_assets_and_external_clearance_missing` |
| `PARALLEL-MEDIA` | 媒体 | 官方 Grok CLI 的有限图像、参考编辑、文字和图生视频能力矩阵 | `audited_closed`：能力事实部分通过，但宿主读取约束 contradicted、项目视觉方向和交付规格未通过；全部 `runtimeApproval=false`，禁止继续共享宿主调用 |
| `PARALLEL-ART` | 媒体 | 从已选源概念确定性提取 Chapter 3 garden-mode 星芽 512px 透明候选；不写 runtime、不调用生成服务 | `completed / approved_for_339b_prototype_copy_only / release_not_cleared`；Chapter 4/5 批量概念仍暂缓 |
| `PARALLEL-AUDIO` | 媒体 | 复核 LS04 现有无音高反馈/Foley 与 C4/D4 教学音并播；只做本地确定性审核资产 | `completed / independently_passed_offline_package / runtime_forbidden / human_listening_missing` |
| `PARALLEL-LS05-ART` | 媒体 | 按主管工作单和最终 341a 合同制作花粉铃/三朵花透明 source-clearance 候选、接触表与两视口 audit-only 合成；用户明确请求并交付授权后才接收家庭录音 | `source_production_dispatched / runtime_locked / recording_closed` |

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

当前状态为 `specification_passed / overhaul-341a_LS05_passed / LS06_LS07_runtime_dispatched / LS08_missing / device_teacher_child_evidence_missing`。

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
| 第一、二章 Web 教学闭环 | M01-M08、FG01-FG04、S01 的正式 session、错误修复、自然停点、家长证据和离线壳层稳定 | 独立浏览器基线 `341a` 保留全部第一、二章专项、回归、音名规则和人工审图 | `passed_browser / physical_device_teacher_child_evidence_missing` | 主管维持回归；实体 iPad、教师与儿童证据另行补齐 |
| 第三章听音花园 | 花园入口、LS01-LS08、小集合隐藏听辨、重听、音频优先、自然停点和证据阈值全部运行通过 | `341a` 已独立通过入口、装备回退、LS01-LS03、early-rest、地图/刷新连续性、LS04 C/D 与 LS05 C/D/E 隐藏听辨；LS06-LS07 已派发，LS08 尚无运行实现 | `runtime_partial / LS01_LS05_browser_passed / LS06_LS07_active / LS08_missing` | 原型只做 LS06-LS07；主管通过后才决定 LS08 |
| 第四章低音与低音谱表 | C3-G3 双八度真实键盘、音区、高低比较、低音谱位、左手邀请和咚咚故事运行通过 | 课程/故事脚本存在，无运行闭环 | `missing_runtime` | 第三章听音闭环通过后由主管下发观察切片 |
| 第五章轮流与合作 | 接力主线、可选同时路线、两小节固定原创曲、同等奖励结局和总谱地图运行通过 | 课程/故事脚本存在，无运行闭环 | `missing_runtime` | 第四章低音/谱表门禁通过后下发 |
| UI、美术与角色动作 | 地图、关卡、键盘、谱桥、五章场景和角色状态达到统一发布质量；无占位物；来源和版权清楚 | `341a` 第一、二章与第三章 LS01-LS05 视觉层级、路线音名和辅助模式通过浏览器审查；花园仍是运行骨架，精确角色源链、外部相似性和后三章素材仍不完整 | `partial / prototype_visual_passed / release_art_missing` | 原型负责运行表现；媒体负责经批准的源素材；主管二次审查 |
| 钢琴音、音效、过场与角色语音 | 真机上钢琴音清晰；SFX/语音不遮盖；过场可跳过/减少动态；授权和隐私完整 | WebAudio 合同和 7 个原创候选存在；完成动画、角色录音、真机混音缺失 | `partial / recording_gate_closed` | 最新布局安全区稳定后解锁媒体；录音门禁有效后才请求用户 |
| 输入与设备可靠性 | 按 `docs/38` 证明触屏始终可完成、原生 iPad Core MIDI 可靠、麦克风可选且置信度安全、旋转/中断/恢复可用 | 设备协议已完成；浏览器触屏、桌面 MIDI/实验麦克风和输入自动化存在，无实体测量 | `passed_protocol / runtime_partial / physical_iPad_missing` | Web主线稳定后建立原生 iPad 项目，并按 N0/N1 执行真机矩阵 |
| 低龄可理解性与教学效果 | 按 `docs/37` 由 3-5 名 4-6 岁儿童分多次完成开始、错误、修复、结果和休息；教师复核目标/阈值；最终美术声音后重复验证 | 观察协议与表格已完成；仍只有自动化和成人截图，无合格儿童/教师记录 | `passed_protocol / external_evidence_missing` | 冻结教学纵切后先做一名儿童方向性观察；最终候选执行 3-5 名复测，不由自动化替代 |
| 隐私、版权与家长门禁 | 无受保护 IP；按 `docs/39` 让资产/音乐/声音来源和最终哈希可追溯并通过独立相似性审查；真实家长挑战；隐私政策、数据地图和权限文案与行为一致 | 原创世界、资产台账和版权协议较强；最终来源包、外部相似性/地区法律复核、真实家长挑战和有效录音忽略验证缺失 | `passed_protocol / implementation_and_external_review_partial` | 主管+媒体+专业/地区复核；TestFlight 前必须通过 |
| 原生 iPad、TestFlight 与 App Store | `docs/36` 的 N0-N3、35 项门禁、Xcode/iPadOS 工程、签名、设备测试、TestFlight、商店素材、隐私披露和审核准备完成 | 原生验收规格已通过；目前只有 Web/PWA 原型，没有原生工程或设备/商店证据 | `passed_spec / architecture_open / runtime_and_external_evidence_missing` | 一个稳定教学纵切通过且可使用 macOS/Xcode、实体 iPad 和开发者账号后，创建独立原生任务；不要求必须自购 Mac |
| 发布工程与版本可追溯 | 有效 Git、可复现构建、版本/缓存/截图/坐标合同一致、回滚和迁移计划、正式发布包门禁通过 | `341a` 的版本、缓存、截图、通用回归、LS05 十一态合同和 gate log 已一致；项目根 Git、私密录音 ignore 和连续里程碑提交均有效，但仍无远程备份、发布构建和迁移演练 | `partial / browser_evidence_aligned / git_valid / milestone_commits_present / release_pipeline_missing` | 保持里程碑提交边界；原生/TestFlight 前补远程备份、签名构建、迁移与回滚演练 |
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
| `G Chapter 3 扩展` | 原型按 `LS05 -> LS06/LS07 -> LS08` 分 2-3 个里程碑实现，不一次铺满 | 主管每批只审新增集合、错误修复和前章回归；LS08 另审中性声源、离散起音和整组重听上限 | 媒体根据已通过状态补齐相应动作/声音候选 | LS01-LS08 全章运行、音频优先、故事出口和证据阈值通过 |
| `H 方向性外部观察` | 原型仅修真实观察发现的 P0/P1，不做无关美化 | 主管按 `docs/37` 组织一次教师预审和至少一名儿童方向性观察，记录 build/device/input、`I0-I4` 干预、错误修复和自然休息 | 媒体只修明确的理解/听感问题 | 方向性问题已修；这仍不是最终 3-5 名儿童发布证据 |
| `I Chapter 4-5` | 按 `docs/34` 先做 Chapter 4 两个观察 session，再补完整低音章；LP10 过桥/信号检查分开。通过后按 `docs/35` 先做 played 可继续的接力主线，TH05 分阶段持久化，最后才做可选合作 | 主管按 `34/35` 审双八度键盘、低音谱位、手部证据、单 session 输入预算、LP10/TH05 恢复、配对时间事实和可选路线同一永久奖励 | 媒体在每章稳定坐标后制作对应素材，不提前整章生产 | `34/35` 的运行门禁及五章主线/可选路线全部通过；故事未被 stable 卡住，双音路线无独占奖励 |
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

1. `A -> G1` 与 341a 证据收口已完成：`341a` 是当前主管批准浏览器基线；第一、二章与 Chapter 3 LS01-LS05 已独立通过。
2. `C` 的有效 Git、LFS 与 WAV/PDF 忽略证明已通过；首个源码基线为 `b431c1ab347dd813ac1aa712a05c5f7ab150cf55`，没有远程仓库，也没有接收录音。后续修正必须用新 commit，不得重写该基线。
3. `G1` 已在 `overhaul-341a` 完成并独立通过：LS05 成为最新浏览器基线，第三章整章仍未完成。
4. 上一份 LS04 植物提取已拒绝；媒体现只执行 LS05 花粉铃/三花 source-clearance 工作单，任何候选仍不得自行进入 runtime。
5. 当前执行 `G2: LS06-LS07`，严格按 `docs/44` 分成两个独立自然停点；不得接入媒体或提前开始 LS08。
6. `G3: LS08` 继续锁定，作为两音记忆和第三章出口单独审查，不用一次大改制造难以定位的听音、状态和素材回归。
7. 方向性外部观察放在 Chapter 3 闭环后；最终 3-5 名儿童、教师、真机和合规证据仍在最终视觉/声音稳定后重复。
8. Chapter 4、5、原生 iPad、TestFlight 和最终发布按 `I -> J -> K` 推进。A-G 单词玩法继续保持最后项目，不抢占主线资源。

该顺序不允许两个任务同时修改运行代码，也不允许未批准素材先占位进入发布路径。

## 当前必须保持未通过的门禁

- 孩子的星芽录音尚未提供，也未授权上传或训练声音模型；
- 用户的咚咚录音尚未提供；
- Gemini MCP 已通过官方 MCP Inspector 实测；当前工具表没有 Veo、视频生成、轮询、编辑或下载能力，因此本轮 Gemini/Veo 视频成片为 `missing`，三张静态生成稿均为拒绝稿；
- 项目根已建立有效 Git；`private-recordings/probe.wav` 与 `private-recordings/consent.pdf` 均由 `.gitignore:29 private-recordings/**` 命中，README 保持未忽略。当前仍未创建或接收真实录音/授权文件，录音接收只有在用户明确提供、用途授权和唯一负责人接收流程成立后才可开启；
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
