# 星龙工坊过场、角色语音与音效生产计划

状态：2026-07-11 已按冻结的 326a 合同获准并完成 safety-zone v2 候选生产：合同为 `teaching-zones-overhaul-326a-v1`，自哈希 `1b234f8e089fe2d79d04c5543330dab092dc0a73e7d34a37cb4e34fa2d1626a3`，8 条本地透明候选在 6 个浏览器视口、workshop/staff 双上下文中均逐帧 0 交叠。此放行只适用于候选生产。任何 post-326a 当前/后继实时布局（当前 334a in progress）都不得沿用 326a 放行运行集成，运行前必须以当时最新布局重新验合同。所有素材仍为未批准候选；没有任何 `runtime_approved` 素材。

适用范围：这份文件只规划和审核过场、角色语音、故事音效、环境声与完成奖励。课程目标、关卡音符、掌握规则、谱位、键位和主界面教学语义继续由课程与原型任务负责，本支线不改写。

## 先看结论

- Gemini MCP 已实测。其工具表仍没有 Veo、视频生成、视频轮询或视频下载工具；在用户明确授权后，改由 Skill 托管浏览器 CDP 回退实测 Gemini 网页 `Create video`，真实生成并下载两条 MP4。两条都只保留为 `motion_reference_only`：Shot 05 因咚咚角色漂移被拒绝，Shot 01 因尾套不完整且有可听 AAC 被拒绝；均不得进 runtime。
- Gemini 共生成三张静态视觉开发稿。三张都出现角色身份、头芽数量、气密尾套或教学元素漂移，全部标为 `rejected_source_concept`，不得进入运行逻辑。
- 六段 2-5 秒技术预演使用既有已审核源概念制作，只提供节奏、格式与构图讨论证据。它们不能证明教学安全区或运行适配，也不是逐帧角色动画或 Gemini/Veo 视频。
- 七个非语音音效小样已经由本地确定性 DSP 原创合成，具有 WAV 源概念、AAC/Opus 运行候选、资产台账和钢琴并播 A/B 审核页。它们仍是 `runtime_candidate_unapproved`。
- 没有收到、上传、训练、克隆或发布任何儿童或成人声音。星芽和咚咚的角色语音仍为 `missing`，需要用户另行录音和明确授权。
- 调度任务已作为唯一写入负责人在根 `.gitignore` 安装 `private-recordings/**` 及两个例外规则。2026-07-13 已在有效 Git 工作树中复核 WAV/PDF 两条路径均命中 `.gitignore:39 private-recordings/**`，忽略门禁为 `passed`；`private-recordings/README.md` 保持未忽略。录音接收仍为 `closed / not requested`，直到用户明确提供文件、授权用途并由唯一负责人执行接收。

## 一、不能改变的边界

1. 星芽必须保持原创“星芽龙”身份：珊瑚红身体、奶油色口鼻和腹部、暖棕色眼睛、恰好三颗青绿色软头芽、上翘平衡尾和星星背包。
2. 第一、二章正式游戏始终使用完整气密探索服；飞船、月球表面、前哨和 S01 均包含全身压力服、手套、靴子、密封环、生命维持背包和完整气密尾套。不能只戴头盔或露出尾巴。
3. M08 用屋顶闭合、门窗密封和安全压力光证明前哨密封，星芽仍保持密封；FG/S01 从已经密封的状态继续，不再重新密封。第三章的花园空气检测才是第一次明确后铰开盔和收起外层压力服。
4. 咚咚保持四足低姿、低而宽、稳重可爱、圆润颈盾和宽脚掌；角数严格为鼻角 1 加眉角 2，不得出现额外额角、角状尖刺或怪兽化。不能用颜色和重量替孩子给出低音答案。
5. 咚咚揭晓顺序固定为 LP01 只有声音，LP04 只有剪影，LP05 才完整出现。不能合并为章首电影。
6. 精确五线谱、音符、琴键、唱名、字母名、谱位标签和教学提示继续由代码绘制。任何位图或视频都不得烘焙这些元素。
7. 过场只提交视觉状态，不写掌握记录，不改变完成状态，不替孩子演奏，不调用下一关，不依赖关闭、继续或下一关按钮。
8. 接力路线和可选合奏路线使用同一个最终会合与花园结局。

权威依据：`docs/24_HUMAN_STORY_AND_LESSON_BOOK.md`、`docs/25_CHARACTER_AND_SCENE_CONCEPT_GUIDE.md`、`docs/27_XINGYA_SPECIES_AND_SPACE_GEAR_BIBLE.md` 和 `docs/29_PROJECT_COORDINATION_AND_INDEPENDENT_AUDIT.md`。

## 二、状态词

| 状态 | 普通解释 | 能否进入正式运行 |
| --- | --- | --- |
| `source_concept` | 用来讨论构图、动作或声音方向的源概念 | 否 |
| `rejected_source_concept` | 已生成但违反硬约束，仅保留审计证据 | 否 |
| `source_clearance_candidate_unapproved` | 已按冻结坐标逐帧零交叠的透明候选，仍需独立复核和最新布局再验 | 否 |
| `rejected_character_consistency` | 动作概念可讨论，但角色身份或可识别特征漂移 | 否 |
| `rejected_equipment_consistency` | 角色身份部分成立但气密装备等硬约束不成立 | 否 |
| `motion_reference_only` | 仅可供后期动作节奏参考，不可裁切放行或作为正式角色资产 | 否 |
| `technical_preview` | 用既有图做的节奏、格式与构图预演，不证明角色动画连续性或教学安全区 | 否 |
| `runtime_candidate_unapproved` | 已有可播放格式和技术台账，但还未获人工/真机批准 | 否 |
| `runtime_approved` | 完成人工选定、版权/隐私、真机和运行集成审核 | 是 |

本里程碑没有任何 `runtime_approved` 素材。

## 三、生产目录

```text
concepts/animatics/
  gemini-source-concepts/    # Gemini 静态稿与拒绝审计
  technical-previews/        # 既有审核概念图派生的 2-5 秒技术预演
  review/                    # 视觉接触表和本地审核索引
  safety-zone-v2/            # 326a 冻结下的透明候选、Gemini 源视频与拒绝审计

audio/source-concepts/       # 非语音 48 kHz/24-bit WAV 源概念
audio/runtime-candidates/    # 未批准的 AAC/Opus 候选
audio/review/                # 逐项试听和钢琴并播 A/B 审核

private-recordings/          # 未来家庭原始录音，仅本机私密保存，不进素材目录
```

`private-recordings/` 当前没有创建，也没有任何录音。调度任务已作为唯一写入负责人安装精确忽略规则；本支线未修改根 `.gitignore`。有效 Git 仓库与录音 WAV/授权 PDF 的 `git check-ignore -v --no-index` 命中已验证为 `passed`，但这不打开接收门禁；在用户明确提供文件、授权用途并由唯一负责人接收前，不创建目录、不接收或处理真实家庭录音。授权模板见 `docs/28_VOICE_RECORDING_PRIVACY_AND_AUTHORIZATION.md`。

## 四、首批过场分镜与动作表

### 统一播放合同

- 主线单段 2-5 秒；咚咚揭晓是同一资产组的三次 2-2.5 秒微过场。
- 自动播放；提供可聚焦、可读屏命名的跳过命令，但不把跳过按钮放入 `aria-hidden` 的场景容器。
- 跳过只应用该段已批准的视觉终态，并返回 `skipped`；不推进关卡，不写掌握状态。
- 减少动态模式使用已审核终帧、150-250 毫秒淡入或直接切换，不播放镜头飞行、快速奔跑、摇晃、尘土和闪烁。
- 所有构图保留下方键盘带和中央谱表/目标区。角色、尾巴、字幕和特效不能越过教学安全区。这是安全区 v2 和未来运行候选的硬门禁；当前 v1 未证明满足，且部分画面与该要求矛盾。
- 语音和 Foley 不是理解过场的唯一渠道。静音时仍应能看懂环境状态变化。

### 分镜表

| 事件 ID | 放置位置 | 时长 | 动作拆解 | 跳过后的终态 | 减少动态 | 建议声音 |
| --- | --- | ---: | --- | --- | --- | --- |
| `story.ch01.arrival-seal` | M01 开始前，只说明抵达和真空准备 | 4.0 秒 | 0-0.8 秒飞船轻落地；0.8-2.2 秒舱内星芽已穿完整软服和尾套，后铰头盔落下，颈环闭合；2.2-4.0 秒背包中性确认，外门才开始打开 | 星芽完整密封，舱门可开，停在 M01 视觉起点 | 飞船已落地定帧 -> 密封终帧短淡入 | 飞船软着陆、头盔密封；不播放教学音 |
| `story.ch01.m08-pressurized` | M08 最后屋顶板已经由孩子完成之后 | 4.5 秒 | 0-1.2 秒承接最后屋顶锁定；1.2-2.8 秒屋顶、门窗闭合，前哨柔和增压；2.8-4.5 秒安全压力光稳定，星芽仍穿完整气密服在屋内望向天窗 | 前哨已密封且压力安全，星芽仍完整密封 | 屋顶完成终帧 -> 安全压力光终帧 | 屋顶锁定、轻气阀、低干扰压力光；不播放开盔声，最后一个钢琴音后再进入声音层 |
| `story.ch02.s01-sealed-depart` | S01 第一谱垫出现前 | 3.5 秒 | 已密封的星芽在前哨门内待发；气密门开启；星芽带完整尾套走到临时星光路线桥头并停在待发姿势 | 星芽持续完整密封，位于代码绘制的第一谱垫之前 | 已密封前哨定帧 -> 已密封桥头终帧 | 气闸门、轻脚步；不生成或播放任何答案音，也不播放重新密封/开盔动作 |
| `story.ch03.atmosphere-check` | 真正的 LS01 进入前，不能误绑到当前 M03 | 4.0 秒 | 密封抵达花园门口；背包发出中性白/金呼吸波，附近叶片轻动；安全确认后头盔后掀；外层软服沿可理解路径收进背包；星芽以本体、背带和背包迈向种子 | 花园已确认可呼吸，星芽处于花园模式 | 密封抵达终帧 -> 花园模式终帧 | 中性检测气流、开盔、布料收纳；禁止警报和音高提示 |
| `story.ch04.dongdong-reveal.sound` | LP01 完成低/中 Do 比较后 | 2.0 秒 | 只出现地面柔和波纹、洞廓和画外一声“咚”，不见完整角色 | 洞廓可见，咚咚仍未露面 | 洞廓直接淡入 | 非稳定音高脚步/洞穴冲击，或成人固定“咚”录音 |
| `story.ch04.dongdong-reveal.silhouette` | LP04 下降回声完成后 | 2.2 秒 | 光向下移动，只照亮眼睛、颈盾剪影和脚步波纹 | 剪影可见，完整身体仍隐藏 | 剪影终帧短淡入 | 轻脚步、砂砾；不把脚步调成低音 Do |
| `story.ch04.dongdong-reveal.full` | LP05 最后一枚脚印完成后 | 2.5 秒 | 最后脚印落定；咚咚以四足低姿探头并完整走出；鼻角 1、眉角 2 和圆润无尖刺颈盾逐帧清楚 | 咚咚完整出现，可进入后续故事 | 完整登场终帧淡入 | 两步脚掌、轻呼吸、可选短自我介绍 |
| `story.ch05.homes-meet` | TH08 已完成路线之后 | 5.0 秒 | 0-0.8 秒已完成的桥转为花园小路；0.8-2.0 秒两角色始终留在生态星球安全控制区，从两端靠近；2.0-2.4 秒在花园中继台、代码绘制的中央 C 会合灯旁击掌；2.4-5.0 秒花园开放并停留成果，月球只作为远端自动端点 | 两处家园相连，角色会合，花园中继台保持开放 | 花园开放终帧至少停留 2 秒 | 轻脚步、击掌、完成短动机；等待最后教学音结束 |

## 五、视觉制作路线

### 当前已经能证明什么

- 既有审核概念图能证明角色、装备和场景方向。
- 技术预演只提供 2-5 秒节奏、媒体格式与构图讨论证据。
- v1 下方 200 px 仅叠加 16% 半透明暗层，是 `lower-band contrast proxy`，不是教学安全区证明。独立复核确认角色、尾巴或主体仍进入该区域，`02/03/04` 也占据中央目标区；安全区状态为 `contradicted/partial`。
- Gemini 拒绝稿能证明当前 MCP 生图无法稳定保持本项目的角色身份和教学边界。

它们都不能证明真实逐帧动作没有穿模、教学区域已经腾空或 iPad 运行性能。

### 推荐后续顺序

1. **Rive/Spine 或分层序列帧**：优先制作星芽头盔铰链、颈环、尾套、背包和咚咚剪影/登场。角色数量少、时长短，确定性比生成视频更重要。
2. **CSS/Canvas**：负责前哨增压、空气波纹、叶片摆动、地面波纹、桥转花园小路和减少动态终态。精确教学层继续由现有代码绘制。
3. **序列帧/WebM alpha**：用于难以骨骼化的布料收纳、开盔和双角色击掌。只导出透明角色层，背景和教学层分离。
4. **Sora/Veo**：只在能够提供锁定角色参考、透明/可分层输出和可复核连续性时作为视觉开发或背景运动候选。不得直接把不可控生成视频接入教学主界面。

### 首批可播放技术预演

本批确实包含可播放的 MP4/WebM 文件，但视频内容来自既有静态源概念的裁切、推拉、交叉淡化和状态顺序演示。它们是 `technical_preview`，不是 Gemini/Veo 生成视频，也不是角色逐帧动画、教学安全区证据或运行候选。

审核入口：

- `concepts/animatics/technical-preview-v1/review-index_technical-preview_source-concept-derived.html`
- `concepts/animatics/technical-preview-v1/contact-sheet_technical-preview_source-concept-derived.png`
- `concepts/animatics/technical-preview-v1/manifest_technical-preview_source-concept-derived.json`
- `concepts/animatics/technical-preview-v1/ffprobe-report_technical-preview_source-concept-derived.tsv`
- `concepts/animatics/technical-preview-v1/review-audit.mjs`

| ID | 文件组 | 时长 | 自审状态 | 诚实限制 |
| --- | --- | ---: | --- | --- |
| `01` | `01_arrival-site-sealed_technical-preview.*` | 3.6 秒 | `partial` | 现有审核源没有飞船飞行和头盔闭合画面，只验证抵达地点与完整密封外观 |
| `02` | `02_m08-roof-pressure-helmet-open_technical-preview.*` | 3.5 秒 | `superseded_story_state / prohibited_for_future_production` | 历史文件保留为技术预演证据；其开盔叙事已被 M08 屋顶闭合、增压、安全压力光且角色持续密封的合同替代 |
| `03` | `03_s01-reseal-depart_technical-preview.*` | 3.7 秒 | `superseded_story_state / prohibited_for_future_production` | 历史文件保留为技术预演证据；S01 已改为从已经密封的状态出发，不再以重新密封或开盔起始 |
| `04` | `04_chapter3-atmosphere-open_technical-preview.*` | 3.766 秒 | `partial` | 三格源概念按时间展开，不能证明头盔和外层收纳连续无穿模 |
| `05a` | `05a_lp01-sound-empty-cave_technical-preview.*` | 2.0 秒 | `partial` | 静音视觉代理；未来“咚”声音必须来自独立音频资产 |
| `05b` | `05b_lp04-silhouette_technical-preview.*` | 2.2 秒 | `partial` | 剪影源概念推拉，不是咚咚动作动画 |
| `05c` | `05c_lp05-full-reveal_technical-preview.*` | 2.5 秒 | `partial` | 完整登场源概念推拉；三只角可见，但仍需逐帧角色审核 |
| `06` | `06_homes-connect-reunion_technical-preview.*` | 3.833 秒 | `partial` | 桥部件和会合终帧可审，角色跑动/击掌仍未制作 |

整批 v1 的教学安全区状态为 `contradicted/partial`：`01/02/03/04/05c` 等终帧中角色、尾巴或主体仍进入下方 200 px，`02/03/04` 还占据中央目标区。压暗画面不等于腾空。若要升级为集成候选，必须另做安全区 v2：按原型任务确认的中央谱表与下方键盘坐标实际避让，或提供透明分层并由运行代码按确认坐标裁切；在此之前不得标记 `runtime_approved`。

v2 制作规格见 `docs/28_SAFETY_ZONE_V2_PRODUCTION_SPEC.md`。`325a` 暂缓生产是已替代的历史注记；其后冻结的 326a 已获书面放行并完成 8 条 v2 候选生产。当前门禁是：任何 post-326a 当前/后继实时布局都须重新交付正式合同、重审候选并取得独立运行放行，不能因为已有候选生产而自动集成。

`05_dongdong-sound-silhouette-reveal_technical-preview.*` 是 3.8 秒整体审核蒙太奇，只用来同时观看三阶段顺序。它不能绑定单个运行事件，也不能把 LP01、LP04 和 LP05 连续播放。

## 六、给原型任务的非侵入式接口

建议由原型任务实现，当前支线不修改 `app.js`、HTML 或 CSS：

```js
presentStoryMedia(eventId, {
  host,
  reducedMotion,
  signal
})
// 必须始终 resolve：
// ended | skipped | reduced | missing | error | timeout
```

接口合同：

- 调用方继续拥有原来的关卡完成和后续回调；媒体层永远不能成为继续教学的硬门。
- 使用独立的 stage overlay，不复用结果弹窗。
- 导航、重置和关卡切换通过 `AbortSignal` 取消媒体、语音和排队音效。
- 减少动态时显示审核终帧并自动 resolve；不能只依赖 CSS 暂停 `<video>`。
- 候选视频默认 `playsinline`，视觉可静音播放；语音和 Foley 走现有 WebAudio 总线并等待用户手势解锁。
- 若记录是否看过，只能使用独立的非掌握字段 `storyMediaSeen`，不能写 `completed`、正确率、掌握度或目标音。

建议事件清单：

```text
story.ch01.arrival-seal
story.ch01.m08-pressurized
story.ch02.s01-sealed-depart
story.ch03.atmosphere-check
story.ch04.dongdong-reveal.sound
story.ch04.dongdong-reveal.silhouette
story.ch04.dongdong-reveal.full
story.ch05.homes-meet
```

运行清单字段：

```text
id, eventId, kind, category, status, path, fallbackPoster,
durationMs, reducedMotionMode, safeZone, bus, maxGain,
delayAfterTeachingNoteMs, duckDb, stablePitch,
source, promptOrRecipe, license, sha256, reviewStatus
```

`safeZone` 是未来运行清单字段。v1 只能登记为 `unverified/contradicted`，不得因存在下方暗层而登记为通过。

## 七、角色语音默认路线

默认只做“固定台词录制 + 本地降噪/剪辑 + 轻度音高和共振峰处理”，不训练可复用声音模型。

### 星芽

- 使用孩子自愿录制的固定短句；每次录音 10-15 分钟以内，孩子可随时停止或跳过台词。
- 原声已经偏高时，不强行升调。可选处理范围：`0 到 +1.5` 半音；共振峰 `0 到 +0.5` 半音；3-5 kHz 只做最多约 1 dB 的轻微明亮度调整。
- 目标是清楚、温暖、有好奇感，不尖锐、不娃娃化、不制造可复用“儿童声纹模型”。

### 咚咚

- 使用用户本人的固定短句录音。
- 可选处理范围：`-1 到 -2` 半音；共振峰约 `-0.5 到 -1.5` 半音；保留自然辅音和呼吸。
- 目标是稳、暖、稍低，不咆哮、不怪兽化、不用低频轰鸣压住钢琴音。

最小台词库和授权记录模板见 `docs/28_VOICE_RECORDING_PRIVACY_AND_AUTHORIZATION.md`。所有最终教学台词仍需课程故事任务确认；通用语音不能替换唱名、键位或谱位提示。

## 八、录音与文件合同

| 项目 | 要求 |
| --- | --- |
| 录音环境 | 小而有软装的安静房间；关闭风扇、电视和通知；录 10 秒房间底噪 |
| 麦克风位置 | 距嘴 15-20 厘米，略偏轴，使用防喷罩；全程固定距离 |
| 原始格式 | 48 kHz、24-bit、单声道 WAV；关闭自动增益、强降噪和美声滤镜 |
| 原始电平 | 常态峰值约 -12 至 -6 dBFS；绝不削波；底噪目标不高于 -55 dBFS，-50 dBFS 可进入人工判断 |
| 每句录法 | 前后各留 1.0-1.5 秒静音；三次独立 take；文件不写真实姓名 |
| 私密源文件名 | `voice_{character}_{line-id}_{speaker-code}_t{take}_{yyyymmdd}.wav` |
| 私密处理母版 | 48 kHz、24-bit、单声道 WAV；保留未限制动态的可逆母版 |
| 发布候选 | AAC-LC `.m4a` 48 kHz mono 64-96 kbps；Opus `.ogg` 48 kHz mono 48-64 kbps |
| 语音响度 | 短句目标约 -20 至 -18 LUFS；true peak 不高于 -3 dBTP；最终以 iPad 实听为准 |
| 编辑限制 | 降噪通常不超过 6 dB；不重门限切断尾音；不改词、不拼接出未授权的新句 |
| 版本 | `_v01`、`_v02`；任何新台词、新处理或新授权范围都升版本 |

## 九、儿童声音隐私工作流

0. 根 `.gitignore` 规则、有效 Git 仓库和录音 WAV/授权 PDF 两类 `git check-ignore -v --no-index` 命中已在 2026-07-12 通过。接收门禁仍为 `closed / not requested`；未获得用户明确文件、授权用途和唯一负责人接收安排时，停止，不创建或接收任何真实文件。
1. 先由监护人确认固定台词、用途、保存地点、处理范围和删除期限。
2. 原始 WAV 只进入本机 `private-recordings/`，不进入 `audio/`、`assets/`、云盘、代码仓库或聊天附件。
3. 降噪、剪辑、音高和共振峰处理默认在本地离线完成。
4. 先导出不含真实姓名的审核候选；监护人和录音者听审通过后，才把有限的处理后固定台词放入 `audio/runtime-candidates/voice/`。
5. 发布候选台账只保留匿名 speaker code、line ID、处理参数、授权记录编号和哈希，不保存孩子姓名、生日、学校或联系方式。
6. 若撤回授权，删除运行候选、处理母版和原始录音，并更新资产台账和发布包。
7. App 运行时只播放随包发布的固定文件，不上传儿童声音，不接收孩子语音来生成角色台词。

### 高风险声音克隆路线

当前状态：`missing / not authorized / not executed`。

只有用户再次明确提出并同意后，才可单独评估。最低门禁：

- 监护人书面同意，且孩子在录音现场自愿；
- 服务商书面承诺不用于训练、无公开 voice ID、私有模型、明确保留期和删除 API；
- 原始样本和模型所在地区、访问权限、审计日志与泄露响应可说明；
- 不公开分享 voice ID，不允许第三方任意输入文本生成孩子声音；
- 不在儿童运行时上传声音；
- 能删除原始样本、派生模型、缓存和已导出文件；
- 对每次新用途重新取得授权。

任一项不能确认，路线即停止。固定台词录制仍是默认和推荐方案。

## 十、音频分类与混音合同

| 类别 | 例子 | 是否允许稳定音高 | 默认总线 |
| --- | --- | --- | --- |
| 教学钢琴音 | 目标音、听音提示、孩子按键回放 | 是，必须准确 | `noteBus` |
| 正确/再试/UI | 正确闪点、柔和再试、触控轻点 | 否 | `effectBus` 下的 feedback bus |
| 故事 Foley | 密封、气阀、地板、桥垫、发芽、石头、脚步 | 原则上否；若有共振必须证明不构成答案音 | `effectBus` 下的 storySfx bus |
| 环境声 | 月球舱内、花园空气、洞穴轻风 | 否，且不得持续抢注意 | ambience bus |
| 角色语音 | 星芽、咚咚固定短句 | 说话自然音高，不作为答题依据 | voice bus |
| 完成短动机 | 章节完成奖励 | 可以，但只在教学音结束后 | reward bus |

钢琴优先：

- `noteBus` 永不因角色语音、Foley、环境声或奖励 duck。
- 从目标/听音钢琴起音时刻 `t=0` 开始，到 `t=540 ms` 为止，feedback/storySfx 至少降低 8 dB；随后用 140 毫秒恢复。这里不是“起音前”提前 duck。
- 环境声在教学钢琴窗口降低至少 12 dB。
- 角色语音尽量不与目标音重叠：前置台词结束后至少留 250 毫秒再放目标音；若目标音已开始，语音等待约 700 毫秒或目标音主体衰减后再进入。
- 完成动机在最后一个教学音结束至少 650 毫秒后播放。它不能计入音高正确证据。
- 全局音量仍服从当前原型的家长设置和 0.7 上限；候选响度不等于真机安全结论。

## 十一、首批非语音音频台账

完整机器台账：`audio/audio-asset-manifest.json`。逐项试听和 A/B 并播：`audio/review/index.html`。

| ID | 名称 | 源 WAV | 运行候选 | 延迟 | 候选增益 | 状态 |
| --- | --- | --- | --- | ---: | ---: | --- |
| `SFX-FOLEY-001` | 头盔密封 | `audio/source-concepts/helmet-seal_v01_source.wav` | `helmet-seal_v01.m4a/.ogg` | 180 ms | 0.52 | `runtime_candidate_unapproved` |
| `SFX-FOLEY-002` | 地板落位 | `audio/source-concepts/floor-placement_v01_source.wav` | `floor-placement_v01.m4a/.ogg` | 190 ms | 0.50 | `runtime_candidate_unapproved` |
| `SFX-FOLEY-003` | 桥垫落地 | `audio/source-concepts/bridge-pad-landing_v01_source.wav` | `bridge-pad-landing_v01.m4a/.ogg` | 170 ms | 0.46 | `runtime_candidate_unapproved` |
| `SFX-FOLEY-004` | 种子发芽 | `audio/source-concepts/seed-sprout_v01_source.wav` | `seed-sprout_v01.m4a/.ogg` | 210 ms | 0.44 | `runtime_candidate_unapproved` |
| `SFX-FOLEY-005` | 咚咚脚步 | `audio/source-concepts/dongdong-footsteps_v01_source.wav` | `dongdong-footsteps_v01.m4a/.ogg` | 160 ms | 0.48 | `runtime_candidate_unapproved` |
| `SFX-FEEDBACK-001` | 正确 | `audio/source-concepts/correct_v01_source.wav` | `correct_v01.m4a/.ogg` | 140 ms | 0.40 | `runtime_candidate_unapproved` |
| `SFX-FEEDBACK-002` | 轻柔再试 | `audio/source-concepts/retry_v01_source.wav` | `retry_v01.m4a/.ogg` | 120 ms | 0.38 | `runtime_candidate_unapproved` |

本批全部由本地确定性程序合成：无外部样本、无网络音频服务、无角色语音、无儿童录音。AAC+Opus 候选合计 118,994 bytes。七项稳定周期筛查全部通过，但仍需人工听审和实体 iPad 扬声器/耳机测试。

2026-07-12 的 LS04 离线 A/B 听审只覆盖“种子发芽、正确、轻柔再试”。每项各有 C4（261.625565 Hz）和 D4（293.664768 Hz）的 A 未保护 / B 钢琴优先混音，共 12 条审核文件。B 组数字增益审计证明 `noteBus=1.0`、t=0 前没有提前 duck、t=0..540 ms 内 SFX 至少 -8 dB；种子发芽和正确在 540.0208 ms 后开始 140 ms 释放，轻柔再试在保护窗内结束，释放不适用且没有提前变响。C/D 答案风险只得到 `pass_screening_only`，人工耳机、扬声器和实体 iPad 听审仍为 `missing`。详见 `docs/28_LS04_AUDIO_OFFLINE_AB_REVIEW.md`。

尚未制作：月球/花园/洞穴环境声、石头滚动、气阀独立版本、章节完成短动机、角色语音。它们保持 `missing`，不拿现有七项冒充。

## 十二、版权与隐私检查表

| 检查 | 本里程碑状态 | 证据或下一步 |
| --- | --- | --- |
| Gemini 是否实测视频/Veo | `passed` | MCP `tools/list` 仍无视频工具；经用户授权接入同一 Skill 托管浏览器，Gemini 网页 `Create video` 已真实生成并下载 2 条 MP4 |
| Gemini 静态稿是否符合角色身份 | `contradicted` | 三张均有明显漂移，见 `concepts/animatics/gemini-source-concepts/audit.md` 和拒绝接触表 |
| 是否产生真实生成式视频 | `passed`（事实）/ `rejected`（制作质量） | `gemini-video-samples/shot-01` 和 `shot-05` 为真实 Gemini 网页 MP4；均不是合格角色动画或运行候选 |
| Gemini Shot 05 咚咚一致性 | `rejected_character_consistency` | 生成四足偏写实通用三角龙；头盾突起、比例、站姿、脚趾、脸和尾均漂移，三角数量存在儿童识别歧义；仅 `motion_reference_only` |
| Gemini Shot 01 星芽装备一致性 | `rejected_equipment_consistency` | 三头芽、头盔、连体服、手套、靴子、背包可见，但尾端露出红色本体，完整气密尾套不成立；AAC 也有可听内容 |
| Gemini 严格首尾帧 | `failed` | 网页 Omni 只接收普通参考；两条生成首尾均未复现保存的目标 PNG，见 `gemini-video-samples/endpoint-comparison-contact-sheet.png` |
| Gemini 教学安全区 | `contradicted` | 两条 H.264 源视频均全帧不透明、时长 10.005 秒，越过 2-5 秒和 326a 安全区要求；不得标 `partial_clip_ready` |
| Gemini 原始音轨 | `source provenance only` | 两条原 MP4 均有 AAC；manifest 为 `sourceAudioPresent=true`、`runtimeAudioAllowed=false`。Shot 05 近静音（最大 -84.3 dBFS），Shot 01 可听（最大 -11.0 dBFS）；未进入音频候选或原创 Foley 台账 |
| 是否产生可播放技术预演文件 | `passed` | 9 组 MP4+WebM、18 个文件，均为静态源概念派生、无音轨；只证明文件存在、格式和节奏，不证明安全区或运行放行 |
| 星芽恰好三颗头芽 | Gemini 稿 `contradicted`；既有审核图 `passed` | 运行制作必须以已审核模型表重新分层 |
| 真空完整气密尾套 | Gemini 稿 `contradicted/partial` | 运行制作不得采用拒绝稿 |
| 咚咚三只角 | 技术预演沿用审核图 `partial` | 未来制作严格核对四足低姿、鼻角 1、眉角 2、圆润颈盾和无额外尖刺；仍需逐帧和 iPad 检查 |
| 无烘焙谱表/琴键/标签 | Gemini 前两稿 `contradicted`；技术预演 `passed` | 拒绝稿出现键盘、音符、按钮/答题垫；“未烘焙教学元素”与“空间安全区已腾空”是两个独立门禁 |
| 教学安全区（technical-preview-v1） | `contradicted/partial` | 下方 200 px 暗层只是对比代理，角色/尾巴/主体仍进入；需按原型坐标避让的 v2，或透明分层加运行裁切 |
| 音效原创和可追溯 | `passed` | 生成器、种子、DSP 配方、哈希和格式在音频台账中 |
| 正确/再试无稳定教学音高 | 自动筛查 `passed`，人工听审 `partial` | 周期性分数均低于阈值；需家长/教师和真机复听 |
| 钢琴并播保护 | LS04 C4/D4 文件级 A/B 与数字 duck 合同 `passed`，运行/真机 `missing` | 三个 cue 各有四条 A/B 混音；自动证据不替代人工耳机、扬声器或 iPad 听审 |
| 儿童声音是否上传 | `passed: no` | 没有收到或调用任何声音文件/声音模型服务 |
| `private-recordings` 忽略门禁 | `passed` | 有效 Git 仓库已建立；WAV/PDF 探针均命中 `.gitignore:39 private-recordings/**`，README 保持未忽略；录音接收仍 `closed / not requested` |
| 儿童授权与录音 | `missing` | 需要用户提供固定台词录音和监护人授权 |
| 成人咚咚录音 | `missing` | 需要用户录制 |
| 声音克隆 | `missing / not authorized` | 未执行；需要再次明确同意和高风险门禁 |
| 运行集成 | `missing` | 本支线不改原型代码，待原型任务接收候选 |
| 实体 iPad 听感/动态 | `missing` | 不能由桌面自动化代替 |
| 4-6 岁儿童理解 | `missing` | 需真实孩子观察，不能由成人或模型代替 |

## 十三、第一里程碑自审结论

### Passed

- 权威故事、装备和协调合同已读取并冻结。
- Gemini MCP 工具表已通过真实 stdio MCP 调用核验。
- 已明确区分静态关键帧/分镜、技术预演和真实视频。
- 七个非语音小样、格式候选、哈希、响度、峰值、稳定音高筛查和钢琴并播审核页已生成。
- 没有上传、训练或克隆儿童/成人声音。
- 326a 冻结合同下的 8 条本地 safety-zone v2 透明候选已经生成、媒体完整解码并逐帧通过 6 视口/双上下文 0 交叠审计；审核页无 autoplay 且减少动态能切换海报。
- Gemini 网页 Create video 已由 Skill 托管浏览器真实生成并下载 Shot 01 与 Shot 05 源 MP4；编码、时长、音轨、首中尾抽帧、目标端点对比和哈希已经记录。

### Partial

- 技术预演只提供节奏、格式与构图讨论证据，不是角色逐帧动画；v1 教学安全区为 `contradicted/partial`。
- 音频自动化和桌面浏览器审核通过，但尚无实体 iPad 和儿童听感证据。
- 语音台词、录音规范和授权流程已规划，实际演员录音尚未开始。
- Gemini 两条源视频可讨论“抵达/密封”和“空洞穴到登场”的动作节奏，但不能继承角色、装备、首尾帧或教学安全区通过结论。

### Missing

- 合格的生成式角色动画成片；本轮 Gemini 静态稿和两条真实视频都存在硬约束漂移。
- 对任何 post-326a 当前/后继实时布局（当前 334a in progress）重新验收的坐标合同、iPad Safari 真机和独立运行集成复核。326a 的安全区候选不能自动迁移。
- 星芽儿童录音、咚咚成人录音及签署授权记录。
- 用户明确提供的星芽/咚咚固定台词文件、用途授权与唯一负责人接收安排；Git/WAV/PDF 忽略验证已通过但不构成接收授权。
- 环境声、完成动机和完整 Foley 库。
- 原型集成、减少动态运行验证、iPad 录屏/扬声器证据和真实儿童观察。

### 冻结与交接

- `concepts/animatics/**`、`audio/source-concepts/**`、`audio/runtime-candidates/**` 继续由本支线维护，未经调度任务放行不得复制到 `assets/runtime`。
- 原型任务只接收事件接口、候选 ID、回退终帧和混音合同，当前不应引用 `concepts/**` 或 `audio/**` 作为正式运行路径。
- 326a 冻结合同仅为候选生产锁，安全区 v2 已制作在 `concepts/animatics/safety-zone-v2/`。任何 post-326a 当前/后继实时布局（当前 334a in progress）仍不得沿用 326a 结论放行；必须重新验合同、审计素材和取得独立运行批准。
- 录音忽略门禁已通过，但接收仍为 `closed / not requested`；本支线继续不创建 `private-recordings/`，不接收真实录音或签署授权文件，直到用户明确提供文件和用途授权并由唯一负责人接收。
- 课程故事任务继续拥有关卡触发点和最终台词语义；本支线发现冲突只报告，不改课程文件。
