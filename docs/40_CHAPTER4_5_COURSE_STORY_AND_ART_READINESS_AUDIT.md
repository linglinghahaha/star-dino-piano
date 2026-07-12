# Chapter 4-5 Course, Story, and Art Readiness Audit

状态：`curriculum_story_static_passed / art_package_partial / chapter5_scene_contradicted / runtime_missing / teacher_child_device_evidence_missing`

日期：2026-07-12

负责人：课程故事、整体调度与独立审查任务。本文只裁决课程、故事和概念素材是否足以进入后续生产，不批准任何素材进入 runtime。

## 给普通人看的结论

第四、第五章的教学路线现在是合理且连贯的：孩子先听出同名 Do 的高低差别，再找到低音键位，之后才邀请左手；等低音键位熟悉后再读低音谱表。第五章先做一问一答和左右轮流，不会同时弹的孩子也能完成完整故事；同时弹和两小节双层演奏只是可选体验，不会得到更好的结局或奖励。

目前真正未准备好的是美术生产包。已有图片可以帮助讨论角色气质和材质，但不足以直接实现第四、第五章：

- 第四章缺少“只听见声音 -> 洞中剪影 -> 局部出现 -> LP05 完整见面”的连续场景状态；
- 第四章缺少 LP08-LP10 地下谱线、五个准确谱位、桥支撑和六个信号锚的可分层世界状态；
- 第五章现有主场景把两处住处画成相邻房屋，并让角色站在桥上，不符合已经锁定的故事地理；
- 第五章缺少 TH05 的“两桥墩 -> 两组各四颗星灯 -> 两小节接力桥完成”精确阶段图；
- 所有现有生成图仍是 source concept，没有最终透明切图、完整来源包、外部相似性清关和真机教学安全区证据。

因此结论不是“第四、第五章要重写”，而是“课程可以保留，美术需要按课程重新补齐”。

## 一、课程与故事交叉审查

| 审查项 | 当前裁决 | 证据 |
| --- | --- | --- |
| 第四章入口 | `passed_spec` | LS08 只发送未计分低音回声；LP01 才开始正式高低教学 |
| LP01 与 LP02 分轴 | `passed_spec` | LP01 只比较 C3/C4 声音泡泡；LP02 才寻找低音 C3 键位 |
| 低音键位顺序 | `passed_spec` | C3-D3-E3 -> E3-F3-G3 -> C3-G3-C3，未跳过 Re/Mi/Fa |
| 左手引入 | `passed_spec` | LP07 才邀请左手；音高事件不能自动证明实际用手 |
| 低音谱表 | `passed_spec` | LP08 只教 C3-D3-E3，LP09 补 E3-F3-G3，LP10 只整合已学内容 |
| 第四章故事解锁 | `passed_spec` | LP10 guided/bounded-assisted 可继续故事；later check 不让咚咚重过桥 |
| 第五章核心路线 | `passed_spec` | TH01-TH05 -> TH08 relay，全程只需顺序单音 |
| 第五章可选路线 | `passed_spec` | TH06-TH07 -> TH08 together；失败、设备不支持或疲劳会回 relay |
| 唯一两小节 | `passed_spec` | 第 1 小节：中音 C4-D4-E4-D4、低音 C3；第 2 小节：中音 E4-D4-C4-C4、低音 G3；4/4，52 BPM 仅作引导 |
| 路线公平 | `passed_spec` | relay/together 共用永久桥、花园、角色认可、收藏和结局 |
| 短课负荷 | `passed_spec` | TH05 拆为 supports、high bar 1/2、relay；任一完成阶段永久保存 |
| 证据边界 | `passed_spec` | played 可继续故事；stable/retained、实际用手、paired timing 分开记录 |

权威文件：`03_CONTENT_ROADMAP.md`、`09_SCAFFOLD_AND_ASSESSMENT_RULES.md`、`14_NOTE_IDENTITY_MATRIX.md`、`17_STORY_ARC_AND_LEVEL_BEATS.md`、`24_HUMAN_STORY_AND_LESSON_BOOK.md`、`33_GAME_TEACHING_PACING_AND_MOTIVATION_CONTRACT.md`、`34_CHAPTER4_LOW_REGISTER_RUNTIME_CONTRACT.md`、`35_CHAPTER5_COORDINATION_RUNTIME_CONTRACT.md`。

## 二、现有概念素材裁决

### 咚咚角色

文件：`concepts/generated-v2/dongdong-model-sheet-v1.png`

裁决：`source_identity_candidate / partial`

通过点：

- 四足低姿，适合“稳定、托住、低音”角色职责；
- 鼻角 1、眉角 2，共三只角；
- 圆润颈盾，没有明显额外角状尖刺；
- 正面、侧面、背面和基础表情足以讨论角色身份。

仍缺：

- 独立透明切图和可复现来源记录；
- 走、听、托住、落地、休息、轻柔重试、完整揭晓等生产动作；
- 角色比例在所有场景和动作中的一致性验证；
- 外部相似性审查和最终发布权利包。

### 第四章主场景

文件：`concepts/generated-v2/ch04-dongdong-low-planet-keyframe-v1.png`

裁决：`composition_reference_only / partial`

可保留：温暖洞穴、灰绿与金色材质、中央教学留白、地基和洞门方向。

不能直接使用：画面同时完整出现星芽和咚咚，只适合 LP05 以后；不能代表 LP01 空洞穴、LP04 剪影或逐步揭晓。画面也没有低音谱表、准确谱位、键盘安全区和 LP10 信号终点。

### 第四章道具

文件：`ch04-low-planet-props-v1.png`、`ch04-three-foundation-stones-v1.png`

裁决：`source_prop_candidate / partial`

可保留：洞门三态、洞穴剪影、三块石、脚印、拱石和落脚垫的材质方向。

仍缺：

- LP01 两个同权重声音泡泡和中性中央声源；
- LP04 回声下降的三段世界轨迹；
- LP05 E/F/G 三枚脚印及完整揭晓前后状态；
- LP08 C3/D3/E3 地下谱线轨道；
- LP09 E3/F3/G3 三个支撑与压力检查；
- LP10 guided bridge 和 later 六个信号锚的不同状态；
- 可由代码叠加字母、谱位和键位的透明无字层。

### 第五章主场景

文件：`concepts/generated-v2/ch05-singing-shared-garden-keyframe-v1.png`

裁决：`rejected_story_geography / source_mood_reference_only`

问题：

- 把两个住处画成同一花园中相邻的房屋，弱化了“生态星球与远端月亮前哨长期连接”的故事目标；
- 两位角色站在桥中央击掌，容易被后续实现理解为角色在跨星球开放桥上活动；
- 没有生态侧地基站、花园中继台、远端月亮自动端点和双端地图关系；
- 不能表示 TH01-TH05 从远距离信号到永久通道逐步闭合的世界变化。

可保留：明亮、安全、可呼吸花园的色彩和最终庆祝情绪。不得把该图当作第五章 canonical layout。

### 第五章道具和双角色动作

文件：`ch05-shared-garden-props-v1.png`、`xingya-dongdong-duo-actions-v1.png`

裁决：`source_candidate / partial`

可保留：信号灯、桥段、根系、拱门、花园门、角色一问一答和击掌动作方向。

仍缺或需纠正：

- TH05 必须明确两块低音桥墩、两组各四颗星灯、两小节 10 个事件窗和永久阶段恢复；
- TH06 paired 与 sequential fallback 必须留下完全相同的拱门；
- TH08 relay/together 必须留下同一最终世界，只允许瞬时音乐层不同；
- 角色不能在开放太空桥中央活动，最终击掌发生在生态星球可呼吸花园的中央 C 会合灯旁；
- 生成图中的琴键、谱表和教学标签不得进入 runtime，必须由代码精确绘制。

## 三、下一批必须补齐的概念稿

### A. Chapter 4 场景状态板

一张 16:9 宽场景的四格连续状态，镜头和布局完全一致：

1. `LP01` 空洞穴，只见中性声波和洞门轮廓；
2. `LP04` 洞中只有四足低姿剪影，三只角不可被误读为更多角；
3. `LP04 end` 只见眼睛、圆润颈盾局部和脚印，不完整出场；
4. `LP05` 咚咚完整出现，星芽位于教学安全区外侧。

禁止文字、琴键、谱表、答案颜色和完整角色提前出现。

### B. Chapter 4 教学世界状态板

分别表现：

- 三块地基石 0/1/2/3 已安装；
- 三段下降回声；
- E/F/G 三枚脚印；
- LP08 三个地下谱线家；
- LP09 三个桥支撑；
- LP10 bridgeBuilt 与 six signal anchors 0-6。

谱线、音符、字母和键位由代码覆盖；生成素材只提供无字场景与道具层。

### C. Chapter 5 正确世界地理板

画面必须同时讲清：

- 生态星球安全区中的咚咚地基站；
- 同一安全区中的星芽花园中继台；
- 远端月亮小家只作为地图上的自动端点；
- 永久通道从两个端点逐步闭合；
- 两位角色始终在生态星球安全控制区，不站在开放太空中央；
- 最终在花园中央 C 会合灯旁击掌。

### D. TH05 精确阶段板

同一镜头下至少包含：

1. `supportsComplete=0/1/2`；
2. `highBarsComplete=0/1/2`，每组严格四颗灯；
3. `relayBarsComplete=0/1/2`；
4. `finalBridgeBuilt=true`。

数量不正确、自动多出灯、把两个阶段合并或重置已完成状态都必须拒绝。

### E. 路线公平对照板

同一最终场景并排比较 relay 与 together：桥、花园、角色位置、收藏和完成光完全相同；together 只允许一个短暂双层声画圈，不能多一件物品、更多花、稀有徽章或更热烈角色台词。

## 四、媒体任务交付门禁

每份候选必须：

1. 标记 `source_concept` 或 `source_candidate_unapproved`，`runtimeApproval=false`；
2. 记录生成工具、模型、完整 prompt、所有参考图、日期和 SHA-256；
3. 保留原始图，不覆盖旧证据；
4. 制作普通人可看的接触表，逐项标出 passed/partial/rejected；
5. 核对星芽三颗头芽、星星背包和可呼吸花园装备；
6. 核对咚咚准确三只角、四足低姿、圆润颈盾和无额外角状尖刺；
7. 不把琴键、五线谱、音符、音名、唱名或答案烘焙成正式素材；
8. 不修改 app.js、HTML、CSS、runtime 资产、课程音序、掌握或 session 规则；
9. 不使用当前共享 Administrator 宿主调用 Grok；
10. 未经主管独立审查，不向原型任务发送集成建议。

## 五、仍然缺少的发布证据

- Chapter 4/5 运行实现与自动化；
- 真实 iPad 双八度键盘、触屏多点、MIDI 和麦克风证据；
- 幼儿钢琴教师审查；
- 3-5 名儿童分短 session 观察；
- 最终素材来源包、外部相似性和发布地区专业意见；
- 原生 iPad 工程、TestFlight 和 App Store 审核证据。

在这些证据补齐前，只能说“第四、第五章课程故事规格已静态通过，概念美术部分准备”，不能说成熟 App 已完成。
