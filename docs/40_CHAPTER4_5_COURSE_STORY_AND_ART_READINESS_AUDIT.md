# Chapter 4-5 Course, Story, and Art Readiness Audit

状态：`curriculum_story_static_passed / chapter4_lp01_lp03_committed_browser_runtime_passed / chapter4_lp04_and_C4_R01B_browser_lifecycle_passed_uncommitted / chapter4_lp05_lp10_runtime_missing / chapter5_runtime_missing / art_package_partial / chapter5_scene_contradicted / provider_unverified_outputs_quarantined / grok_video_hard_paused / teacher_child_device_evidence_missing`

初版日期：2026-07-13
调度政策复核：2026-07-19

负责人：课程故事、整体调度与独立审查任务。本文只裁决课程、故事和概念素材是否足以进入后续生产，不批准任何素材进入 runtime。

调度政策说明：历史 Grok 批次只用于保存能力和 source-only 证据，从未获得 runtime 或 release 批准。用户现已明确确认 Grok 视频额度耗尽，当前进入硬暂停：不得生成视频、预检额度、重试旧 ID、切换账号或建立新批次；只有用户以后明确确认额度恢复，主管才可重新评估。已有原片仍须保留 prompt、参考源、会话和原件哈希，并始终保持 `runtimeApproval=false / integrationAllowed=false / releaseCleared=false`。工具曾经可调用、账号可登录或视频曾生成成功，都不能替代逐帧质量审查、来源清关、外部相似性审查或运行集成批准。

## 给普通人看的结论

第四、第五章的教学路线现在是合理且连贯的：孩子先听出同名 C 的高低差别，角色在对话框里把它们都唱作 Do；再找到低音键位，之后才邀请左手；等低音位置熟悉后再读低音谱表。第五章先做一问一答和角色/音区轮流，同时邀请左右手来帮忙但不把音高冒充为真实用手证据；不会同时弹的孩子也能完成完整故事。同时弹和两小节双层演奏只是可选体验，不会得到更好的结局或奖励。

目前 LP01-LP03 已进入获批浏览器基线，当前未提交候选中的 LP04 与 C4-R01B 完整生命周期也已通过主管独立浏览器回归，但这不等于第四章完成。LP05-LP10、第五章全部运行内容以及成熟美术生产包都还未准备好。已有图片可以帮助讨论角色气质和材质，但不足以直接实现第四、第五章剩余内容：

- 第四章缺少“只听见声音 -> 洞中剪影 -> 局部出现 -> LP05 完整见面”的连续场景状态；
- 第四章缺少 LP08-LP10 地下谱线、五个准确谱位、桥支撑和六个信号锚的可分层世界状态；
- 第五章现有主场景把两处住处画成相邻房屋，并让角色站在桥上，不符合已经锁定的故事地理；
- 第五章缺少 TH05 的“两桥墩 -> 近端四灯 -> 远端四灯 -> 第一段信号 -> 第二段信号”五次短行动精确阶段图；
- 仍可讨论的合格生成图最多是 source concept，没有最终透明切图、完整来源包、外部相似性清关和真机教学安全区证据；`concepts/generated-v3/chapter4-5-readiness` 的五张输出经过未验证本地代理，已全部隔离为 `provider_unverified_rejected`，不是 source concept 或候选。

因此结论不是“第四、第五章要重写”，而是“课程可以保留；LP01-LP04 与 R01B 浏览器教学切片已达到上述分层状态，先冻结并观察当前纵切，再决定 LP05-LP10 的下一窄实现；第五章运行和成熟美术仍需逐段补齐”。

## 2026-07-23 后半程逐课严审

本轮在外部课程审查完成主管分级后，再逐课对照 `docs/24`、`docs/33`、`docs/34`、`docs/35` 和当前自动门禁。LP05-LP10 与 TH01-TH05 的静态课程骨架、音高、谱位、旋律和故事地理可以保留；后续 TH06-TH08 专项发现了一个真实路线矛盾：TH05 合同规定主页只能进入 TH08，旧 optional 合同却又可能在结局前插入 TH06-TH07。现已裁决为“所有孩子先完成 TH08 core relay，再于以后到访进行 optional encore”，详见 `docs/70`。但“规格一致”仍不等于运行、教学效果或发布通过。

| 范围 | 唯一教学轴 | 游戏与成就 | 不得被误写成 |
| --- | --- | --- | --- |
| `LP05` | 低音 E/F/G 的黑键组边界和近邻比较 | 三枚脚印找出咚咚，完整揭晓由音乐动作触发 | 单纯播放角色过场或靠颜色找答案 |
| `LP06` | C3-G3-C3 远跳预览 | 大拱石滚入桥位，形成一次大动作回报 | G 已稳定、手能张开五度或连奏能力 |
| `LP07` | 在熟悉路线中邀请左手 | 与咚咚组成小队，五枚脚印永久留下 | 系统仅凭音高证明真实用手或指法正确 |
| `LP08-LP09` | 先把已熟悉 C3-D3-E3 逐个连成“谱位—字母—声音—键位”；再继承 E 第三间作锚点，只新增 F 第四线/G 第四间；检查只保留谱位到正确八度键 | 一次一个脚印建三个谱位家，已有轨道检查只锁接缝；E 放下折叠支架，F/G 再装两根，压力检查不拆桥 | 一次铺满三个或五个答案、把 E 重建成新家、用目标声音泄露检查、LP08/LP09 子集检查冒充完整低音谱稳定、错八度也算读谱正确 |
| `LP10` | 整合低音键位、谱位和六音路线 | 已托稳桥上点亮六步信号，咚咚只过桥一次并在塔边留下；clean phase tail 一次轻量结算，later check 只校准原桥信号 | 同一 session 连弹两遍、把 check 设成强制下一站、故事等待 stable、重走桥或重播角色/结算 |
| `TH01-TH02` | 先复习 C3/C4 的同名关系并加入角色/音区轮次，再把规则迁移到 G3/G4，最后无模型音返回 C3/C4；真实手部不评分 | C 信号到半路、G 信号接中段、返回 C 后第一批桥材料释放；困难时停在已完成 pair，TH01/TH02/C5-01 均无结算框 | 六次亮键模仿、把 G4 叫中央 G、同 session 迁移冒充 stable、从音高或手图标推断真实左右手 |
| `TH03` | 一条无节拍的 `C3-C4-D3-D4-E3-E4` 路线练角色/音区轮次；左右手仅作邀请 | C/D/E 每对锁住一段桥，困难只从未完成 pair 续接；无结算 | 首次就加 48-56 BPM、把音高当真实手证据、每个单音弹大反馈或跨 pair 重做 |
| `TH04` | 一次一个谱位完成 bass second-space C3、treble ledger-line-below C4 两个 staff-to-key 循环 | 大谱表会合灯亮起；clean formal phase tail 才有一次轻量小结，帮助完成仍可去 TH05 | 同屏两个活动答案、合并 C3/C4 mastery、加入手切换/脉冲/旋律/同时音或把 guided 称为 grand-staff stable |
| `TH05` | 先分声部，再一次组合一个接力小节 | 五次孩子主动开始的 2/4/4/5/5 输入短行动，分别留下两桥墩、近端四灯、远端四灯和两段永久信号；第二段才是 phase tail | 单次十步接力、action 自动连播、把 TH05 写成 TH03 stable/节拍/延音/真实手证据，或不会同时弹就不能结局 |
| `TH08 core` | 所有孩子先用接力连续完成同一首两小节 | 主桥与花园只在这里首次完整打开，场景自然停留、无结算大框 | 在结局前按能力分流、路线选择弹层、同时音门槛或把十步演出当全部知识考试 |
| `later TH06-TH07` | 终章后的 C/C、G/G、C/C paired onset 与分小节双层迁移 | 顺序 fallback 留下同一拱门，每次只练一个已知小节 | 高级路线、稀有奖励、失败降级、补考感或踏板要求 |
| `TH08 together-encore` | 在已打开花园中完整加演同一首两小节 | 只增加临时双层声画，不重放解锁或写第二次故事完成 | 覆盖 core route、获得更高价值结局或冒充双手 stable/retained |

本轮还把拟议 `C3-X01` 的“声音种子找谱垫”补入 `docs/24` 的人类故事脚本，明确有提示教学和少提示检查是两次到访，分别记录谱位首选与琴键首答。它仍是教师审核中的插曲，不属于 39 个 canonical 运行 lesson，也没有改变 LS05-LS06 当前顺序。

TH05 收口时课程故事专项为 `38/38`；TH06-TH08 顺序修正后已扩展为 `39/39` 并通过。门禁继续锁定 LP05 的 `E3/52 -> F3/53 -> G3/55`、完整黑键组定位、故事单元末才完整揭晓咚咚、不得授予 `low-key:C3-G3 stable/retained`，以及 LP05 的四道实现前门禁：“成人实体 iPad 预听获主管接受 + 首名方向观察无阻断 P0 + 教师阶段 B 已复核且无课程 P0 + 主管明确窄派工”；同时新增“core TH08 必须先于 optional、同 session 不创建 TH06、加演不重写结局、TH06 同名字母减负和 350/600ms provisional”检查。LP08 的五条完整低音谱线、TH05 五次到访、core TH08 十输入终章和 TH06 时间窗都仍必须由教师、设备和儿童判断，不能靠自动化自批。

调度裁决不变：359a 成人实体 iPad 预听获主管接受前不派 LP05；教师阶段 A 返回前不改 S01 谱位层、不正式插入 `C3-X01`，教师阶段 B 返回且无课程 P0 前也不得派 LP05；TH06-TH07 继续只属于 TH08 core 结局后的可选加演。原型任务继续冻结，媒体任务只能生产来源可追溯、无教学标签的候选。

## 一、课程与故事交叉审查

| 审查项 | 当前裁决 | 证据 |
| --- | --- | --- |
| 第四章入口 | `passed_spec` | LS08 只发送未计分低音回声；LP01 才开始正式高低教学 |
| 第四章故事地理 | `passed_spec_corrected` | 森芽星是当前生态星球的正式名称；咚咚来自鸣石星，但第一季不会前往鸣石星；“低音星球”只是森芽星地下层的音乐昵称，地下回声洞是咚咚暂时守护的共鸣石前哨，不是鸣石星或出生地；星芽保持花园模式进入地下生态层 |
| 孩子端身份载体 | `passed_spec` | 普通任务、地图、键盘、谱垫、轨道、反馈和结果使用 `低音 C/中央 C` 等字母音名；Do/Re/Mi/Fa/Sol 只由角色对话承载，C3/C4 只进成人证据 |
| LP01 与 LP02 分轴 | `passed_spec_corrected` | LP01 只比较 C3/C4 声音泡泡：模型阶段可自由重听，check 开始后第一次泡泡触摸即提交，不能候选预听；每 1-2 个真实已解决调用只增加中性洞纹。LP01 困难时可由星芽帮助打开故事洞口，但未呈现调用不生成 scored call，四题未全部呈现时只写 partial/needsPractice，不写 played/stable，并排入 later opening review。LP02 才寻找低音 C3 键位，触屏为核心、精确 MIDI 最多写 played、麦克风最多辅助故事；LP02 成功不得删除或回填 LP01 听辨证据 |
| 低音键位顺序 | `passed_spec` | C3-D3-E3 -> E3-F3-G3 -> C3-G3-C3，未跳过 Re/Mi/Fa |
| 左手引入 | `passed_spec` | LP07 才邀请左手；音高事件不能自动证明实际用手 |
| 低音谱表 | `passed_spec` | LP08 只教 C3-D3-E3，LP09 补 E3-F3-G3，LP10 只整合已学内容 |
| 第四章故事解锁 | `passed_spec` | LP10 guided/bounded-assisted/modeled story completion 可继续故事；modeled 保留 needsPractice 且不结算，later check 不让咚咚重过桥 |
| 第五章核心路线 | `passed_spec_corrected` | TH01-TH05 -> TH08 core relay，全程只需顺序单音，并在任何 paired 邀请前打开花园 |
| 第五章可选路线 | `passed_spec_corrected_teacher_missing` | 花园完成后的后来到访才依次 TH06 -> TH07 bar 1 -> TH07 bar 2 -> TH08 together-encore；顺序 fallback 或延期不改结局 |
| 唯一两小节 | `passed_spec` | 第 1 小节：中音 C4-D4-E4-D4、低音 C3；第 2 小节：中音 E4-D4-C4-C4、低音 G3；4/4，52 BPM 仅作引导 |
| 路线公平 | `passed_spec_corrected` | core relay 先把永久桥、花园、角色认可和收藏给所有孩子；later together 只能加临时音乐层，不再“共用两条结局路线”或延迟表现顺利孩子的奖励 |
| 短课负荷 | `passed_spec_corrected` | TH05 精确拆为 supports、high bar 1、high bar 2、relay bar 1、relay bar 2 五个孩子主动开始的 session；输入上限 2/4/4/5/5，任一步永久保存 |
| 证据边界 | `passed_spec` | played 可继续故事；stable/retained、实际用手、paired timing 分开记录 |

权威文件：`03_CONTENT_ROADMAP.md`、`09_SCAFFOLD_AND_ASSESSMENT_RULES.md`、`14_NOTE_IDENTITY_MATRIX.md`、`17_STORY_ARC_AND_LEVEL_BEATS.md`、`24_HUMAN_STORY_AND_LESSON_BOOK.md`、`33_GAME_TEACHING_PACING_AND_MOTIVATION_CONTRACT.md`、`34_CHAPTER4_LOW_REGISTER_RUNTIME_CONTRACT.md`、`35_CHAPTER5_COORDINATION_RUNTIME_CONTRACT.md`。

## 二、现有概念素材裁决

### 咚咚角色

文件：`concepts/generated-v2/dongdong-model-sheet-v1.png`

裁决：`source_identity_candidate / partial`

来源边界：该历史模型表只提供四足低姿、三角数量和基础比例方向；通用大眼、波浪颈盾、配色、表情与细节均未锁定，也不能把当前地下回声洞画成鸣石星或星岩家园。新方向必须遵守 `docs/98`，并继续作为 source-only 候选接受来源与相似性审查。

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

可保留：当前生态星球共鸣石前哨的温暖洞穴、灰绿与金色材质、中央教学留白、地基和洞门方向。它不能作为鸣石星或星岩家园的定稿。

不能直接使用：画面同时完整出现星芽和咚咚，只适合 LP05 以后；不能代表 LP01 空洞穴、LP04 剪影或逐步揭晓。画面也没有低音谱表、准确谱位、键盘安全区和 LP10 信号终点。

### 第四章道具

文件：`ch04-low-planet-props-v1.png`、`ch04-three-foundation-stones-v1.png`

裁决：`source_prop_candidate / partial`

可保留：洞门三态、洞穴剪影、三块石、脚印、拱石和落脚垫的材质方向。

仍缺：

- LP01 两个同权重声音泡泡和中性中央声源；
- LP02 两个同名 C 门铃、洞门开缝和第一块地基的独立无字层；字母、八度和黑键定位仍由代码覆盖；
- LP04 回声下降的三段世界轨迹；
- LP05 E/F/G 三枚脚印及完整揭晓前后状态；
- LP08 一个宽的一小节无字轨道地貌底层、C/D/E 三个可独立点亮的家、三个独立接缝效果和两个不含 F/G 答案的中性支撑空位；五线、低音谱号、音符、字母与准确谱位必须由代码覆盖，不能烘焙进生成图；
- LP09 继承 E 第三间的折叠支架、F/G 两个新支架、三段 pressure light 和桥入口；无字场景层不能烘焙 F/G 谱位、字母、颜色或黑键答案；
- LP10 guided crossingStep 0-6、首个 E 的 3/6 中途平台、咚咚六个落点/塔边终态、花园中继台星芽回应、一次无字信号束与 later 六个独立 signalAnchor；章节结算文字/按钮不得烘焙进素材；
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

- TH05 必须明确两块低音桥墩、两组各四颗星灯、两个各五步的独立接力小节、五次 session 边界和永久逐步恢复；
- core TH08 relay 必须先留下唯一最终世界；同一完成 session 不出现 TH06 或路线选择；
- later TH06 paired 与 sequential fallback 必须留下完全相同的拱门；TH08 together-encore 只能给已打开花园增加瞬时音乐层，不能重写最终世界；
- 角色不能在开放太空桥中央活动，最终击掌发生在生态星球可呼吸花园的中央 C 会合灯旁；
- 生成图中的琴键、谱表和教学标签不得进入 runtime，必须由代码精确绘制。

## 三、下一批必须补齐的概念稿

下面 A-E 是未来生产规格，不是当前生成授权。Grok 视频硬暂停；任何静态图新生产也必须先证明使用的是官方或 Codex 内置提供方，并记录真实模型、参考上传边界、完整 prompt 和哈希。未验证代理的旧输出只能留在 quarantine，不能改名成为候选。

### A. Chapter 4 场景状态板

一张 16:9 宽场景的四格连续状态，镜头和布局完全一致：

1. `LP01` 空洞穴，只见中性声波和洞门轮廓；
2. `LP04` 洞中只有四足低姿剪影，三只角不可被误读为更多角；
3. `LP04 end` 只见眼睛和圆润颈盾局部，不出现脚印，也不完整出场；
4. `LP05` 的 E-F-G 音乐动作逐枚补齐三枚脚印，故事单元结束后咚咚才完整出现，星芽位于教学安全区外侧。

禁止文字、琴键、谱表、答案颜色和完整角色提前出现。

### B. Chapter 4 教学世界状态板

分别表现：

- 三块地基石 0/1/2/3 已安装；
- LP02 洞门关闭/开缝与第一块地基未落/已落；两个 C 门铃保持同材质，不能把低音答案烘焙成大小、亮度或上下动画；
- 三段下降回声；
- E/F/G 三枚脚印；
- LP08 一小节轨道底层、C/D/E 三个谱位家 0/1/2/3、三个 railJoint 0/1/2/3，以及两个始终中性的后续支撑空位；当前音符和谱表教学几何不属于位图状态；
- LP09 E 折叠支架 folded/deployed、F/G 两根支架 0/1/2、supportCount 0/1/2/3、pressureJointCount 0/1/2/3 和 bridgeEntranceReady；
- LP10 crossingStepIndex 0-6、bridgeBuilt、dongdongAtSignalTower、storySignalSent、xingyaSignalReceived、milestoneShown，以及 later signalAnchorCount 0-6；guided 与 check 共享桥但不共享角色移动/结算状态。

谱线、音符、字母和键位由代码覆盖；生成素材只提供无字场景与道具层。

### C. Chapter 5 正确世界地理板

画面必须同时讲清：

- 生态星球安全区中的咚咚地基站；
- 同一安全区中的星芽花园中继台；
- 远端月亮小家只作为地图上的自动端点；
- 永久通道从两个端点逐步闭合；
- 两位角色始终在生态星球安全控制区，不站在开放太空中央；
- 最终在花园中央 C 会合灯旁击掌。

### D. TH01-TH02 信号呼应状态板

同一正确世界地理下分别提供：

1. `cCallTurn=0/1/2` 与 `cSignalConnected=false/true`：低音 C 灯、中央 C 中继灯和半程 C 信号弧；
2. `gCallTurn=0/1/2` 与 `gSignalConnected=false/true`：两颗材质/大小/亮度中性的 G 中继星和补齐的中段信号；
3. `returnCTurn=0/1/2` 与 `firstBridgeMaterialsReleased=false/true`：返回 C 信号和第一批桥材料收纳/释放；
4. 咚咚呼唤、星芽倾听/回答的角色动作，以及减少动态下的静态当前角色轮廓。

位图不得烘焙 C/G 字母、Do/Sol、手图标、琴键、黑键定位、当前/未来答案光、完成文字或结果卡。两个 G 星在作答前必须同权，角色位置、星体大小和远近不能暗示 G3/G4；字母、音区、可选手邀请和键位定位由运行代码覆盖。TH01/TH02 的每个单音只产生小反馈，pair 完成才改变信号段，返回 C 完成才释放桥材料，避免六次相同庆祝。

### E. TH05 精确阶段板

同一镜头下至少包含：

1. `supportsComplete=0/1/2`；
2. `highBar1Step=0/1/2/3/4` 与 `highBar2Step=0/1/2/3/4`，每组严格四颗灯；
3. `relayBar1Step=0/1/2/3/4/5` 与 `relayBar2Step=0/1/2/3/4/5`；
4. `currentAction=A/B1/B2/C1/C2`，非当前阶段不得出现答案权重；
5. `finalBridgeBuilt=true` 与一次 clean-tail-only `milestoneShown`。

数量不正确、自动多出灯、把两个小节合并成十步单 session、自动跳到下一 action、重置已完成状态或把字母/答案烘焙进素材都必须拒绝。

### F. 路线公平对照板

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
9. Grok 视频当前硬暂停：用户明确确认额度恢复前，不得生成、预检额度、重试、换号或建立新批次；已有证据只可离线审查，不得混入其他项目或直接接入 runtime；
10. 未经主管独立审查，不向原型任务发送集成建议。

## 五、仍然缺少的发布证据

- Chapter 4 LP05-LP10 与 Chapter 5 全部运行实现和自动化；LP01-LP03、C4-R01A、LP04 与 C4-R01B 已有相应已提交或未提交浏览器接受证据，均不再笼统列为 missing；
- 真实 iPad 双八度键盘、触屏多点、MIDI 和麦克风证据；
- 幼儿钢琴教师审查；
- 3-5 名儿童分短 session 观察；
- 最终素材来源包、外部相似性和发布地区专业意见；
- 原生 iPad 工程、TestFlight 和 App Store 审核证据。

在这些证据补齐前，只能说“第四、第五章课程故事规格已静态通过，第四章 LP01-LP03 已进入浏览器基线，LP04 与 R01B 在当前未提交候选通过，LP05+ 仍缺”，不能说成熟 App 已完成。
