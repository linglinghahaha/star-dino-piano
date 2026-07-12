# 过场、角色语音与音效支线第一里程碑交接

日期：2026-07-10。

接收方：

- `星龙工坊｜课程故事、整体调度与独立审查`：`019f4a2b-d759-7a13-b076-d4fd19a39db6`
- `星龙工坊原型开发、界面`：`019f4aa6-edba-7843-a835-c4b930a388ff`

独立复核已完成：本里程碑被接受为可追溯的技术预演/音频候选，但“运行集成放行”被退回。当前不得把 `concepts/**`、`audio/**` 或 `technical-preview-v1` 接入 runtime。

发送状态：2026-07-10 已分别向上述调度任务和原型任务发送首轮交接及独立审查修正回执；调度独立复核已经完成，原型在再次放行前只能只读候选，不得建立正式运行引用。

## 1. Gemini MCP 实测能力

- 真实调用了 `gemini-skill` 的 stdio MCP server，并成功执行工具列表、登录检查、图片生成、独立新会话、参考图上传、图片列表和提取。
- 工具表只有图片、文本、模型切换和诊断，没有 Veo、视频生成、视频任务轮询、视频编辑或视频下载。
- Gemini 生成了三张静态 PNG。它们是分镜/关键帧尝试，不是视频。
- 三张均被拒绝：前两张把星芽变成人类并加入琴键/答案垫/音符/按钮；第三张虽成功上传参考图，仍有角色脸型、头芽数量、尾套和控制元素漂移。
- 初始静态图里程碑的 Gemini/Veo/Sora 生成视频为 `0`；后续经用户明确授权的 Gemini 网页视频实测见第 10 节，已生成 2 条真实 MP4，但没有任何合格运行视频。
- 技术预演包包含实际可播放 MP4/WebM，但内容是既有源概念图的镜头运动和交叉淡化，明确不是 Gemini/Veo 或完成角色动画。

证据：`concepts/animatics/gemini-source-concepts/audit.md` 和 `concepts/animatics/review/gemini-rejected-contact-sheet.png`。

## 2. 改动与生成文件

### 规划与台账

- `docs/28_CUTSCENE_VOICE_SFX_PRODUCTION_PLAN.md`
- `docs/28_VOICE_RECORDING_PRIVACY_AND_AUTHORIZATION.md`
- `docs/28_MILESTONE_1_HANDOFF.md`

### Gemini 静态审计

- `concepts/animatics/gemini-source-concepts/*.png`
- `concepts/animatics/gemini-source-concepts/audit.md`
- `concepts/animatics/review/gemini-rejected-contact-sheet.png`
- `concepts/animatics/build_gemini_reject_contact_sheet.py`

### 视觉技术预演

- `concepts/animatics/technical-preview-v1/*.mp4`
- `concepts/animatics/technical-preview-v1/*.webm`
- `concepts/animatics/technical-preview-v1/*reduced-motion-end-state.png`
- `concepts/animatics/technical-preview-v1/review-index_technical-preview_source-concept-derived.html`
- `concepts/animatics/technical-preview-v1/contact-sheet_technical-preview_source-concept-derived.png`
- `concepts/animatics/technical-preview-v1/manifest_technical-preview_source-concept-derived.json`
- `concepts/animatics/technical-preview-v1/ffprobe-report_technical-preview_source-concept-derived.tsv`
- `concepts/animatics/technical-preview-v1/review-audit.mjs`
- `concepts/animatics/technical-preview-v1/README.md`
- `tools/generate-technical-animatics.ps1`

### 非语音音频

- `audio/source-concepts/*_source.wav`：7 个 48 kHz/24-bit mono WAV
- `audio/runtime-candidates/*.m4a`：7 个 AAC-LC 候选
- `audio/runtime-candidates/*.ogg`：7 个 Opus 候选
- `audio/audio-asset-manifest.json`
- `audio/README.md`
- `audio/review/index.html`、审核脚本和 A/B 并播文件
- `docs/28_LS04_AUDIO_OFFLINE_AB_REVIEW.md`
- `tools/generate_audio_concepts.py`
- `tools/audio-review-page-audit.mjs`

没有由本支线修改原型的 `app.js`、运行 HTML/CSS、课程音符、关卡触发或掌握规则。`audio/review/` 仅是离线审核页。工作区同时有原型任务在运行，因此不能用当前文件时间戳推断其他任务没有改动。

## 3. 支线自审、版权与隐私

- 视觉：所有技术预演带有 `TECHNICAL PREVIEW | SOURCE-CONCEPT-DERIVED | NOT RUNTIME APPROVED | NOT GEMINI/VEO` 标识；教学谱表、琴键和标签没有进入候选。但 v1 下方 200 px 只有 16% 暗层，角色、尾巴或主体仍进入该区域，不能作为教学安全区证明。
- 咚咚：LP01、LP04、LP05 已拆成三个独立微预演；3.8 秒合并版只作审核，禁止连续运行。
- 音频：七项均由本地确定性 DSP 原创合成，无外部样本、无网络音频服务；台账包含配方、种子、许可说明、哈希、LUFS、true peak、时长和触发合同。
- 正确/再试：不使用振荡器或下降旋律，稳定周期性筛查通过。
- 钢琴保护：LS04 对种子发芽、正确、轻柔再试各制作 C4/D4 的 A 未保护 / B 钢琴优先版本。B 的数字包络证明 `noteBus` 保持 unity、t=0 前没有 duck、t=0..540 ms 内音效为 -8 dB；自动结果不替代听感。
- 儿童声音：没有收到、读取、上传、训练、克隆或发布任何孩子声音。
- 成人声音：没有收到用户的咚咚录音。
- 声音克隆：没有执行；固定台词录制是默认路线，高风险克隆需要用户再次明确同意和独立授权。
- `.gitignore`：调度任务已作为唯一写入负责人安装三条 `private-recordings` 规则，规则安装为 `passed`，本支线未修改根文件。2026-07-12 有效 Git 工作树与 WAV/PDF 的 `git check-ignore -v --no-index` 命中均为 `passed`；录音接收仍 `closed / not requested`，等待用户明确文件、用途授权和唯一负责人接收。

## 4. 素材分类

| 资产组 | 分类 | 是否可运行集成 |
| --- | --- | --- |
| Gemini 三张 PNG | `rejected_source_concept` | 否 |
| 既有审核概念图 | `source_concept` | 否；只能作为派生参考 |
| 技术预演 MP4/WebM | `technical_preview` | 否；只供节奏、格式与构图讨论，不证明教学安全区 |
| 减少动态 PNG | `technical_preview` | 否；部分仅为审核代理终帧，同样不证明教学安全区 |
| 7 个 WAV | `source_concept` | 否 |
| 7 组 AAC/Opus | `runtime_candidate_unapproved` | 否；待人工/真机/调度放行 |
| LS04 C4/D4 A/B 混音与钢琴参考 | `source_concept` / `runtime_candidate_unapproved` | 否；只供离线审核，`runtimeApproval=false` |
| 角色语音 | `missing` | 否 |

## 5. 门禁状态

### Passed

- Gemini MCP 工具能力已真实核验，且没有把静态图伪称视频。
- 六类主线节奏预演和咚咚三次独立微预演均有可读文件、时长和格式证据；这项通过不代表安全区或 runtime 通过。
- 七个非语音小样可解码，格式/哈希/响度/峰值/触发合同完整。
- 音频确定性复现检查、稳定音高筛查和 LS04 三 cue 的 C4/D4 12 条 A/B 混音数字合同通过；`noteBus` unity、无提前 duck、-8 dB 保护窗和释放边界都记录在 manifest。
- LS04 音频审核页桌面/移动结构、3 行、20 个播放器、媒体元数据和横向溢出检查通过。
- 儿童声音未上传或训练。

### Partial

- 过场技术预演只提供节奏、格式与构图讨论证据。01 缺飞船飞行/头盔闭合源；02/03/04 是状态淡化；06 未制作角色跑动与击掌。
- v1 教学安全区为 `contradicted/partial`：`01/02/03/04/05c` 等终帧中角色、尾巴或主体进入下方 200 px，`02/03/04` 占据中央目标区；16% 暗层只是 `lower-band contrast proxy`，压暗不等于腾空。
- 减少动态海报仍是审核代理，不是运行批准终帧，也不能证明教学安全区。
- LS04 音频文件级 C4/D4 duck 对比已完成，但没有人工耳机、普通扬声器或实体 iPad 听感；正确/再试的情绪区分也未获得人工批准。
- 台词与录音规范已定义，最终文案仍需课程任务确认。

### Missing

- 合格的 Gemini/Veo/Sora 角色动画和合格的新分镜图；本轮已生成 2 条真实 Gemini 网页视频，但均被拒绝为 `motion_reference_only`。
- Rive/Spine/序列帧角色动画、透明角色层和运行时跳过状态机。
- 针对任何 post-326a 当前/后继实时布局（当前 334a in progress）重新验证的安全区合同、运行集成和 iPad Safari 证据；326a 下的 8 条透明候选已生产，但不能自动迁移为运行批准。
- 星芽儿童固定台词录音、咚咚成人录音和签署授权。
- 月球/花园/洞穴环境声、石头滚动、独立气阀和完成短动机。
- 原型集成、实体 iPad 动态/响度、MIDI 联动和真实 4-6 岁孩子观察。

## 6. 原型任务接收接口

建议接口：

```js
presentStoryMedia(eventId, { host, reducedMotion, signal })
// always resolves: ended | skipped | reduced | missing | error | timeout

playMediaCue(id, { category, delayMs, signal })
```

事件：

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

集成约束：

- 媒体接口始终 resolve，不作为教学继续的硬门，不调用完成/下一关。
- 使用 stage overlay，不复用结果弹窗；跳过只提交视觉终态。
- 减少动态显式使用终帧，不能只靠 CSS 隐藏仍在播放的视频。
- 语音、Foley、环境声都走现有 WebAudio master 体系；教学 `noteBus` 永不 duck。
- 从教学音起音时刻 `t=0` 开始的前 540 ms，SFX 至少 -8 dB；环境至少 -12 dB；随后按合同恢复。这里不要求在起音前提前 duck，语音仍尽量不与目标音重叠。
- 当前不要从 `concepts/**` 或 `audio/**` 直接建立正式运行引用；调度和用户选定后，再复制最小候选到 `assets/runtime` 并重新审计预算。
- Chapter 3 事件不能误绑到当前 M03；真正触发点由课程任务确认。

## 7. 独立审查修正回执

2026-07-10 已按“运行集成放行退回、技术预演/音频候选里程碑接受”的裁决完成以下修正：

- v1 教学安全区统一降级为 `contradicted/partial`；下方 200 px 的 16% 暗层统一改称 `lower-band contrast proxy`，不再作为安全区证明。
- v1 只保留节奏、格式与构图讨论证据；安全区 v2 必须按原型确认坐标实际避让，或提供透明分层供运行裁切。
- ducking 基准统一为从教学音起音时刻 `t=0` 开始的前 540 ms，不在起音前提前 duck。
- 已同步 `docs/28_CUTSCENE_VOICE_SFX_PRODUCTION_PLAN.md`、本交接、技术预演 README/审核页/manifest/生成脚本及 `audio/review/index.html`。
- 未重做或修改任何 MP4、WebM、PNG、WAV、AAC、Opus；未修改原型运行代码、课程音符、掌握规则或教学语义。

修正后验证：`npm run check:quick` 通过，`npm run check:bundle:strict` 通过，音频确定性验证 7/7，视觉 manifest 哈希 40/40，技术预演审核页 9 视频/0 autoplay/减少动态海报切换通过，音频审核页 7 行/28 播放器通过。运行集成、人工/真机听审、角色录音和安全区 v2 继续保持 `missing` 或未放行。

## 8. 已替代历史注记：调度最终复核与下一里程碑门禁（最新状态见第 10 节）

【已替代历史注记，最新状态见第 10 节】以下记录的是 326a 放行前的裁决，不表示当前生产门禁。

调度任务最终复核确认：文档与生成源纠偏 `passed`，技术预演/音频候选仅 `accepted for review evidence`，运行集成继续退回；v1 教学安全区保持 `contradicted/partial`，不得宣传为通过。

下一里程碑只新增 `docs/28_SAFETY_ZONE_V2_PRODUCTION_SPEC.md`，且该规格已获 `passed as specification`。现有 docs/30 合同的 13/13 源哈希、自哈希和 6 视口浏览器几何已技术通过，但 S01.wrong 浮层因认知负荷被退回；该修正可能改变源哈希，因此没有创建 `concepts/animatics/safety-zone-v2/`，也没有制作或接入 v2 素材。刷新合同到达前，当前证据只作参考。

2026-07-10 已向调度任务发送规格回执，并向原型任务发送非阻断坐标交接请求；请求明确要求其先完成 325a 收口，当前不为媒体修改运行代码。

【已替代历史注记，当前状态见第 10 节】录音门禁曾仅完成规则安装；2026-07-12 有效 Git 工作树以及原始 WAV/签署授权 PDF 的 `git check-ignore -v --no-index` 命中均已通过。接收仍为 `closed / not requested`：本支线继续不创建目录，不接收、处理或上传任何真实家庭录音和授权文件，直到用户明确提供文件、授权用途并由唯一负责人接收。

仍为 `missing`：完成角色动画与合格新分镜、人工听审、实体 iPad 扬声器/耳机、角色固定台词和授权、真实儿童观察、运行集成。

## 9. 已替代历史注记：325a 坐标合同技术复核与生产暂缓（最新状态见第 10 节）

调度独立复核确认 `docs/30_TEACHING_ZONE_COORDINATE_CONTRACT_325A.json` 在复核时满足：13/13 源文件 SHA-256 匹配、自哈希匹配、6 视口临时目录重跑 0 browser error/0 failure；除动态 wrongFeedbackZones 最大约 0.5 px 采样抖动外，非动态保护区和 layoutAudit 一致。

【已替代历史注记，最新状态见第 10 节】当时这不构成 v2 生产放行。S01.wrong 稳定态人工审查发现认知负荷过高，已退回原型任务收敛浮层；修正可能改变 app/CSS 和合同源哈希。当时坐标合同只作 `reference_only`，本支线保持 `coordinate_contract_waiting`，不创建 v2 目录、不生产候选、不接入 runtime。iPad Safari 真机证据仍为 `missing`，录音门禁继续 `closed`。

## 10. 326a 候选生产与 Gemini 网页视频样片更新

本节取代上文 325a 暂缓生产的当前状态，但不改写其历史事实。

### 326a safety-zone v2 候选

- 调度已放行冻结的 `teaching-zones-overhaul-326a-v1` 仅用于候选生产；合同自哈希为 `1b234f8e089fe2d79d04c5543330dab092dc0a73e7d34a37cb4e34fa2d1626a3`，边距 24 px、可见 alpha 阈值 `>= 8/255`。
- 已生成 `concepts/animatics/safety-zone-v2/` 下 8 条透明候选：`01`、`02`、`03`、`04`、`05a`、`05b`、`05c`、`06`。全部为 `source_clearance_candidate_unapproved`，在 6 浏览器横屏视口、workshop/staff 双保护上下文中逐帧最大交叠为 0。
- 媒体为 1280x720、30fps、2-5 秒、无音轨；透明 WebM 与 MP4 审核预览均完整解码。审核页为 8 视频、0 autoplay，减少动态切换终帧海报，桌面与移动端无横向溢出。
- 该结论只针对冻结 326a 几何。任何 post-326a 当前/后继实时布局（当前 334a in progress）不得沿用为运行放行；任何集成前必须按当时最新布局重建合同、重审候选并取得独立批准。iPad Safari 仍 `missing`。

### Gemini 实测视频

- `gemini-skill` 的 MCP Inspector 已再次确认登录、`Create video` 菜单和 Skill 托管浏览器端点。现有 MCP 工具表仍无一键视频工具；在用户明确授权下，只通过该托管浏览器的 CDP 连接生成，未启动外部浏览器。
- Gemini 网页实际生成并下载两条源 MP4：`gemini-video-samples/shot-05/shot-05_gemini-omni-source.mp4` 与 `gemini-video-samples/shot-01/shot-01_gemini-omni-source.mp4`。两条均为 1280x720、24fps、10.005 秒、H.264 + AAC，且已全量解码。
- 每条均有单独保存的目标起止 PNG、上传参考、提示词、浏览器事件日志、SHA-256、开始/中间/结束抽帧和定量端点对比。Gemini Omni 只接收普通参考，两个样片的首尾端点均为 `failed`，不宣称首尾帧锁定。
- Shot 05：`rejected_character_consistency / motion_reference_only`。空洞穴到出现的动作概念可讨论，但咚咚变为偏写实四足通用三角龙；头盾突起、比例、脚趾、脸、尾和站姿漂移，额外尖突造成三角识别歧义。
- Shot 01：`rejected_equipment_consistency / motion_reference_only`。三头芽、透明头盔、连体服、手套、靴子和背包可见，但尾端露出红色本体，完整气密尾套不成立；同时源 AAC 可听，不能与教学钢琴并播。
- 两条源视频均全帧不透明、时长超出 2-5 秒，故教学安全区为 `contradicted`，并且不得标为 `partial_clip_ready`。不进入 `assets/runtime`、不建立运行引用、不可作为正式星芽/咚咚资产。
- 两条原始下载均保留 AAC 仅作 source provenance：manifest 记录 `sourceAudioPresent=true`、`runtimeAudioAllowed=false`。Shot 05 原音接近静音（最大 -84.3 dBFS），Shot 01 原音可听（最大 -11.0 dBFS）；两者均未并入 `audio/runtime-candidates`、角色语音或原创 Foley。每条另导出无音轨的 `muted_review_derivative` 仅供视觉审核/动作参考，不冒充原始下载。

审计入口：`concepts/animatics/safety-zone-v2/gemini-video-samples/audit-summary.json` 和 `endpoint-comparison-contact-sheet.png`。

录音门禁更新：规则安装、有效 Git 仓库及 WAV/PDF 忽略命中验证均为 `passed`；录音接收继续 `closed / not requested`，直到用户明确提供文件、授权用途并由唯一负责人接收。本支线没有创建、接收、处理或上传任何真实录音或授权文件。

## 11. 2026-07-11 Grok 低风险能力矩阵

本节记录主管授权的一次有限例外，不修改第 10 节 Gemini 事实，也不代表 Administrator 宿主已通过隔离审查。

- 官方 `Grok Build CLI` 已实际生成三张 JPG、一次只使用 Grok 自身种子 JPG 的参考图测试、一次文本提示词草案，以及一条真实 MP4 图生视频。社区 `grok-dev` 仍保持拒绝。
- 新图分别是空的双世界桥背景、六件通用太空施工道具表、三阶段种子；视频是中性种子开叶。没有把项目角色、项目截图、代码、课程文件、录音或授权文件输入 Grok。
- 实际问题同样记录：道具表为不透明 JPG，且烘焙 `O2`、`Grow` 和阀门文字，故为 `rejected_prompt_compliance`；视频为 544x544、24fps、6.041667 秒的 H.264 MP4，含近静音 AAC，且从已有一片叶长到两片，不是第一片叶打开，故只可 `motion_reference_only / rejected_runtime`，另有无音轨审核衍生品。
- 空背景为 `capability_probe / composition_reference_only / rejected_project_visual_direction`；三阶段种子为 `capability_probe / consistency_reference_only`。二者均不证明当前或未来原型教学安全区，不得接入 `assets/runtime` 或 `audio/runtime-candidates`。
- 产物、原始下载副本、哈希、提示词、审图和首中尾帧位于 `concepts/grok-cli-probe/`；总台账是 `docs/28_GROK_CLI_CAPABILITY_PROBE.md`。
- 会话实际自动注入 Administrator 指令、技能和 MCP；IMG-02/03 还读取了主机 `imagine` skill，虽然未观察到项目文件或录音读取。因此状态为 `contradicted_local_instruction_read / no_project_file_observed / no_further_shared_host_calls`：本轮封闭，不能据此批准任何新的共享宿主 Grok 调用、项目读取、角色图上传、代码/截图审查、搜索或声音处理。

## 12. 2026-07-11 课程/装备媒体合同同步

- Shot 02 已改为 M08 屋顶闭合、前哨增压与安全压力光；第一、二章的星芽始终完整密封，M08 不开盔。
- Shot 03 已改为从已经密封的状态出发；不再以开盔起始或重新密封。建议接口事件更新为 `story.ch02.s01-sealed-depart`，本文件不修改运行实现。
- Shot 04 仍是第三章空气检测通过后的第一次明确开盔和外层收起，不能误绑当前 M03。
- 咚咚未来制作严格锁定为四足低姿、鼻角 1、眉角 2、圆润颈盾、无额外角状尖刺；Chapter 5 会合发生在生态星球安全控制区的花园中继台，月球只是远端自动端点。
- 旧 `technical-preview-v1` 的 02/03 文件保留历史证据，但状态为 `superseded_story_state / prohibited_for_future_production`，不得作为未来镜头或运行候选。

## 13. 2026-07-12 Grok 隔离复测预检

- 只读预检未发现先前建议的 `grok-media-probe` 独立 Windows 用户/用户目录，也没有可用 Hyper-V VM 接口；当前身份仍为 `Administrator`。这不是对其他用户资料的扫描，也不能证明存在合格隔离环境。
- 结论为 `blocked_waiting_isolated_environment`；本轮 Grok 调用、登录、媒体、项目输入和录音输入均为 `0`。
- 已在 `docs/28_GROK_ISOLATED_RETEST_AND_USE_MATRIX.md` 补齐六项中性基准 prompt、上限、自动/人工检查、停止条件、评分表、manifest 草案与接触表量表。共享宿主继续 `no_further_shared_host_calls`，不影响原型的 338a 工作。
- 当前没有任何新结果可进入 `source_candidate` 或 runtime；下一步确实需要用户明确准备独立 Windows 用户或 VM，并在其中先证明零继承、零无关读取和零项目输入。
