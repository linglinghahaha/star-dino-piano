# 过场教学安全区 v2 制作规格

状态：`specification_passed / coordinate_contract_locked_for_candidate_production_only / runtime_not_approved`。

创建：2026-07-10；最新状态：2026-07-11。

这份规格已通过调度任务独立复核，并已在冻结的 `docs/30_TEACHING_ZONE_COORDINATE_CONTRACT_326A.json` 下完成首批候选生产。合同为 `teaching-zones-overhaul-326a-v1`，自哈希 `1b234f8e089fe2d79d04c5543330dab092dc0a73e7d34a37cb4e34fa2d1626a3`，仅能证明候选相对 326a 几何的避让。它不授权运行集成，也不修改运行代码或课程语义。任何 post-326a 当前/后继实时布局（当前 334a in progress）必须重新验坐标合同，不能借用 326a 放行。

## 1. 普通结论

- v1 的下方暗层只是视觉对比代理，安全区结论保持 `contradicted/partial`。
- v2 不能从截图目测或现有 CSS 反推坐标。326a 已作为冻结候选生产合同使用；运行前仍必须由当时的原型布局交付带版本和哈希的刷新合同。
- v2 有两条允许路线：画面本身逐帧完全避让，或交付透明分层供未来运行裁切。
- 透明分层只能标为 `partial_clip_ready`；在运行裁切完成并取得设备证据前，不能标为安全区通过。
- 所有 v2 仍留在 `concepts/animatics/**`，不得复制到 `assets/runtime` 或建立运行引用。

## 2. 开工硬门禁

以下门禁已满足本轮候选生产；运行集成还需另行满足最新布局和设备门禁：

| 门禁 | 当前状态 | 放行证据 |
| --- | --- | --- |
| 原型 `326a` 收口 | `passed_for_candidate_production` | S01.wrong 浮层已收敛并经调度复核 |
| 稳定教学区坐标 | 浏览器合同 `passed_for_candidate_production` | 覆盖中央谱表、目标区、键盘及必要 UI；iPad Safari 仍缺失 |
| 坐标合同版本锁 | `locked_for_candidate_production_only` | `teaching-zones-overhaul-326a-v1`，13/13 冻结源哈希与合同自哈希匹配 |
| 目标视口清单 | 6 视口 `passed_for_candidate_production` | 0 browser error、0 failure；运行前须按最新布局重跑 |
| 安全边距与 alpha 阈值 | `passed_for_candidate_production` | 24 px、alpha `>= 8/255` |
| 调度允许开始 v2 候选生产 | `passed` | 已生成 8 条未批准候选；运行集成未放行 |

326a 冻结基线允许本轮候选生产，但不会跟随实时源码自动更新。任何 post-326a 当前/后继实时布局（当前 334a in progress）的源文件、断点、safe-area 或教学区规则变化都会使运行集成所需结论为 `stale`，必须建立新合同并重新审计。

### 当前 docs/30 技术复核状态

| 项目 | 结论 |
| --- | --- |
| 合同 ID | `teaching-zones-overhaul-326a-v1` |
| 合同自哈希字段 | `1b234f8e089fe2d79d04c5543330dab092dc0a73e7d34a37cb4e34fa2d1626a3`，独立复核匹配 |
| 源文件 | 13/13 SHA-256 与冻结 326a 基线一致；任何 post-326a 当前/后继实时源码（当前 334a in progress）另行处理 |
| 浏览器几何 | 6 视口独立重跑，0 browser error、0 failure；非动态保护区与 layoutAudit 一致 |
| 动态区差异 | wrongFeedbackZones 采样最大约 0.92 CSS px；不改变布局审计结论 |
| 人工审查 | S01.wrong 浮层收敛，专项 27/27 通过 |
| 设备证据 | iPad Safari 真机仍为 `missing` |
| 对本支线的效力 | `locked_for_candidate_production_only`；禁止直接运行集成 |

本支线已将上述合同 ID 与自哈希写入候选 manifest，并保存冻结副本。该写入不等于运行批准；任何 post-326a 当前/后继实时布局（当前 334a in progress）都需要刷新合同、媒体重审和独立运行放行。

## 3. 原型坐标交接合同

326a 冻结副本已保存为 `concepts/animatics/safety-zone-v2/coordinate-contract_326a_frozen.json`。原型任务须在任何运行集成前，为任何 post-326a 当前/后继实时布局（当前 334a in progress）提供刷新后的只读 JSON 数据包；本支线只可据此重新审计，不自行改运行代码。

必须字段：

| 字段 | 说明 |
| --- | --- |
| `coordinateContractId` | 例如 `teaching-zones-326a-v1` 或后继版本，由原型任务命名 |
| `prototypeBaseline` | 真实稳定基线，不得只写“latest” |
| `prototypeTaskId` | `019f4aa6-edba-7843-a835-c4b930a388ff` |
| `sourceFiles` | 参与坐标计算的 HTML/CSS/JS 文件及 SHA-256 |
| `viewportId` | 每个目标设备/布局的稳定 ID |
| `width/height/dpr/orientation` | 视口和像素密度 |
| `safeAreaInsets` | 上、右、下、左安全边距 |
| `coordinateSpace` | 原点、单位、缩放和裁切规则 |
| `staffZone` | 五线谱保护多边形或矩形 |
| `centralTargetZone` | 中央任务/目标保护区 |
| `keyboardZone` | 下方屏幕键盘保护区 |
| `persistentUiZones` | 仍需保护的顶栏、跳过命令或状态 UI |
| `clearanceMarginPx` | 角色、尾巴、字幕和特效必须额外避开的边距 |
| `alphaThreshold` | 逐帧审计中什么像素算可见前景 |
| `stateCoverage` | 初始、idle、答错揭示、正确、减少动态及转场状态 |

待接收模板：

```json
{
  "coordinateContractStatus": "locked_for_candidate_production_only",
  "coordinateContractId": null,
  "prototypeBaseline": "overhaul-326a-or-successor-after-closeout",
  "contractSha256": null,
  "viewports": [],
  "zones": [],
  "clearanceMarginPx": null,
  "alphaThreshold": null
}
```

原型坐标、断点、safe-area 或适配规则一旦变化，旧合同和全部 v2 审计立即标为 `stale`，不能沿用旧 `passed`。

## 4. 两种制作路线

### 路线 A：源画面实际避让

- 角色、尾巴、字幕、前景道具和特效在每一帧都避开膨胀后的保护区。
- 背景可完整铺底，但不能烘焙谱表、琴键、音符、唱名、答案或教学按钮。
- 全帧交叠像素必须为 0，才可标为 `passed_source_clearance`。
- 目测、三帧抽查、暗化或模糊保护区都不算通过。

### 路线 B：透明分层等待裁切

- 背景、星芽、咚咚、道具、字幕和特效分别交付透明层。
- 提供按坐标合同生成的建议 `clip-matte`，但本支线不把它写入运行代码。
- 透明层齐全且 alpha 审计通过时，只能标为 `partial_clip_ready`。
- 原型任务完成实际裁切、跳过、减少动态和真机复核前，不得升级为 `runtime_approved`。

## 5. 每镜头交付层

| 层 | 要求 |
| --- | --- |
| `clean-background` | 不含角色、尾巴、字幕、特效或任何教学 UI |
| `character-xingya` | 完整 RGBA；三颗头芽和章节装备连续性可逐帧检查 |
| `character-dongdong` | 完整 RGBA；三只角可逐帧检查 |
| `props` | 建筑、桥垫、门、背包检测等可独立隐藏或裁切 |
| `effects` | 气流、尘土、发芽、光效等独立透明层 |
| `caption` | 默认不烘焙；确需字幕时必须单独透明层 |
| `clip-matte` | 与坐标合同绑定，仅供未来原型裁切参考 |
| `reduced-motion-poster` | 独立制作和审计的安全终态，不从普通视频结论继承通过 |

每层记录画布尺寸、帧率、时长、帧范围、锚点、z-order、blend mode、色彩空间、alpha 模式、可见边界、来源和 SHA-256。允许格式为 RGBA PNG 序列、带 alpha 的 WebM、Rive/Spine 工程或经审核的等价分层格式。

## 6. 首批镜头保持原合同

| Shot ID | 事件 | v2 特别要求 |
| --- | --- | --- |
| `01` | 飞船抵达、星芽密封 | 必须补真实飞船/头盔闭合状态；完整气密尾套 |
| `02` | M08 屋顶闭合、前哨增压、安全压力光；星芽仍密封 | 屋顶、压力光、角色和完整尾套不能进入锁定教学区；本镜头不得开盔 |
| `03` | S01 从已经密封的状态出发 | 不烘焙第一谱垫；星芽、头盔和完整尾套持续密封，不得加入重新密封或开盔起始 |
| `04` | 第三章检测空气、第一次开盔、外层收起 | 仍不得误绑当前 M03；动作连续性需逐帧审计，开盔只在安全确认后发生 |
| `05a` | LP01 只有声音/空洞 | 保持独立，不能出现完整咚咚 |
| `05b` | LP04 剪影 | 保持独立，只显示合格的四足低姿剪影、圆润颈盾和鼻角 1/眉角 2 轮廓，不得出现额外角状尖刺 |
| `05c` | LP05 完整出现 | 四足低姿、鼻角 1、眉角 2、圆润颈盾和无额外尖刺逐帧清楚；不能占用教学保护区 |
| `06` | Chapter 5 永久双层家园通道、角色会合 | 两位角色始终留在生态星球安全控制区的花园中继台；月球仅为远端自动端点。跑动、击掌和尾巴轨迹必须逐帧避让，精确高/低谱表与中央 C 会合灯仍由代码绘制 |

组合 `05` 继续只作审核蒙太奇，不能成为连续运行事件。所有主线段保持 2-5 秒、可跳过、自动结束，并尊重减少动态设置。

### Shot 06 场景与装备事实源

- S01 星星桥是开放太空中的临时星光路线，只供穿完整气密探索服和气密尾套的星芽单独前往新地点查看。它不是两个住处的永久连接，也不能直接承担第五章的高音/低音合作。
- Shot 06 属于 Chapter 5：临时路线此时才升级为能长期连接两个安全住处的永久高音/低音双层家园通道。视觉可以表达上下两层共同成桥，但不得把精确谱线、音符、中央 C 或答案标签烘焙进素材。
- 星芽在已经确认可呼吸的花园中继台回答信号，使用第三至第五章的花园状态：角色本体、探索背带和星星背包，外层压力服已经安全收好。咚咚从地下生态层一端发出信号。
- 月亮小家/前哨在 Shot 06 中只作为远端信号灯或地图端点出现。不得把未戴头盔、未穿压力服的星芽画回真空月面；若未来任何独立镜头确实让星芽进入月面或开放太空，必须恢复完整气密服、头盔和气密尾套。
- 最终会合发生在连接后的花园路径语境。角色可以从两端靠近并击掌，但代码绘制的中央 C 会合灯、谱表和键盘保护区必须保持无遮挡。

权威事实源：`docs/03_CONTENT_ROADMAP.md`、`docs/10_STORY_WORLD_BIBLE.md`、`docs/17_STORY_ARC_AND_LEVEL_BEATS.md`、`docs/24_HUMAN_STORY_AND_LESSON_BOOK.md`。

## 7. 逐帧安全审计

对每个镜头、每个目标视口执行：

1. 按合同的 `alphaThreshold` 提取角色、尾巴、字幕、道具和特效可见前景。
2. 按 `clearanceMarginPx` 膨胀所有保护区。
3. 逐帧计算前景与保护区的交叠像素数。
4. 记录最大交叠、最坏帧、首次违规帧、违规层和边界框。
5. 路线 A 只有全部帧交叠为 0 才通过；路线 B 只检查分层/蒙版完整性并保持 partial。

证据包必须包含原始预览、透明层预览、起始/中间/结束/最坏帧、保护区叠加接触表、alpha 交叠蒙版、前景占用热图、全帧 JSON/CSV、ffprobe、完整解码、alpha 存在性和 SHA-256 报告。不能只截三帧宣布通过。

## 8. 减少动态合同

- 每镜头提供静态终态，或最多 150-250 ms 的淡入。
- 禁止镜头推拉、奔跑、摇晃、闪烁、尘土和连续粒子运动。
- 减少动态模式不能在后台继续播放隐藏视频。
- 自动到达与正常跳过必须提交同一个故事终态，不依赖关闭、继续或下一关按钮。
- reduced-motion 终态必须用同一坐标合同单独执行全帧/单帧安全审计。

## 9. Manifest 状态合同

```json
{
  "classification": "source_concept",
  "runtimeApproval": false,
  "integrationAllowed": false,
  "coordinateContractStatus": "waiting",
  "coordinateContractId": null,
  "coordinateContractSha256": null,
  "safetyStrategy": null,
  "safetyZoneResult": "missing",
  "selectedForRuntime": false
}
```

`safetyZoneResult` 只允许：

- `passed_source_clearance`：锁定坐标下全部视口、全部帧零交叠。
- `partial_clip_ready`：透明层可裁切，但尚无运行裁切和设备证据。
- `missing`：坐标、素材或审计尚未完成。
- `contradicted`：已经发现越界。
- `stale`：坐标合同或原型基线已经变化。

## 10. 已建候选目录

326a 候选已创建：

```text
concepts/animatics/safety-zone-v2/
  coordinate-contract_326a_frozen.json
  manifest.json
  shots/<shot-id>/layers/
  shots/<shot-id>/previews/
  audit/frame-data/
  audit/overlays/
  review/index.html
  review/contact-sheet.png
  gemini-source-concepts/       # 单独保存的普通参考起止 PNG，不是首尾帧锁定
  gemini-video-samples/         # 真实 Gemini 源 MP4、浏览器日志和拒绝审计
```

8 条本地透明镜头为 `source_clearance_candidate_unapproved`；两条 Gemini MP4 分别是 `rejected_character_consistency / motion_reference_only` 与 `rejected_equipment_consistency / motion_reference_only`。所有文件均不进 `assets/runtime`，也不建立运行引用。

## 11. 放行顺序

1. 326a 合同已完成候选生产与逐帧证据；任何 post-326a 当前/后继稳定基线（当前 334a in progress）必须交付刷新合同。
2. 本支线按刷新合同重审保留候选，或制作新候选；不得因 326a 产物跳过此步骤。
3. 本支线自审角色、装备、版权边界、媒体格式和安全区。
4. 调度任务独立复核最新坐标、逐帧交叠和所有限制。
5. 原型任务在获得单独运行放行后才复制最小选定素材并实现裁切/跳过/减少动态。
6. 实体 iPad、扬声器/耳机、MIDI 和真实儿童观察完成后，才讨论运行批准。

当前已完成冻结 326a 下的第 1-3 步候选工作，并通过本支线逐帧审计；仍缺任何 post-326a 当前/后继布局（当前 334a in progress）合同、调度独立复核、运行集成、iPad Safari、音频设备和儿童观察证据。坐标状态为 `locked_for_candidate_production_only`，不是运行放行。

## 12. Gemini 网页视频的边界

- 现有 MCP 工具表无视频生成；用户明确授权下，通过同一 Skill 托管浏览器网页 `Create video` 生成的 MP4 才可如实登记为 `actualGeminiWebVideo`。
- Web Omni 只接收普通参考图，不能保证首尾帧插值。每条必须保存目标起止 PNG，并将实际首尾抽帧定量和人工对比；不一致时只作中间动作参考。
- `gemini-video-samples/shot-05` 因咚咚角色漂移被 `rejected_character_consistency`；`shot-01` 因气密尾套失败且源 AAC 可听被 `rejected_equipment_consistency`。两条均为 `motion_reference_only`。
- H.264 原视频没有 alpha、为全帧不透明且 10.005 秒，天然违反 2-5 秒与源画面避让要求；不得因尝试裁切而标为 `partial_clip_ready`。审核证据见 `gemini-video-samples/audit-summary.json`。
