# Chapter 4 C4-02 / LP03 主管验收工作单

状态：`approved_for_dispatch / 345d_audio_prerequisite_passed / runtime_unlocked / implementation_pending`

本文件只定义 `C4-02 / LP03`。`C4-01 / LP01-LP02` 已在 `overhaul-344a-p3` 完成选择性提交、主管独立复跑并晋升浏览器基线；`docs/49` 的 AUDIO-A、AUDIO-B、AUDIO-C 也已依次通过并冻结，最终基线为 `overhaul-345d-audio-c` / `2405734`。因此 LP03 现在可以派发给唯一运行写者，但仍是 `implementation_pending`：不得把“前置条件通过”写成“LP03 已完成”，也不得合并 LP04、完整咚咚、低音谱表、左手或媒体候选。

## 零、解锁记录与本轮边界

- AUDIO-C 最终 `app.js` SHA-256 为 `DAA50F00F4CCFD8A408631AE934BB39D8B6FB02EB064A99063475C751CD692C6`；主管验收 `13/13`、AUDIO-C `46/46`、LS06/LS07 `64/64` 和全课程音频生命周期总回归均通过。
- 下一唯一运行工作就是本文件的 `C4-02 / LP03`。实现必须从提交 `2405734` 开始，保持 LP01/LP02、Chapter 3、音名政策、session、mastery 和共享音频生命周期不变。
- 本轮只实现 C 锚石唤醒、D/E 落位、对应恢复/休息/证据与必要代码回退美术。LP04、完整咚咚出场、低音谱表、左手、视频、语音、SFX 和未批准角色/场景资产继续锁定。
- 浏览器前置通过不替代实体 iPad、真实 MIDI、原声钢琴麦克风、扬声器/耳机听审、教师或儿童观察；这些仍是独立 missing 证据。

## 一、这节课为什么存在

LP02 已让孩子找到低音 C 的家，并让第一块 C 地基石永久落在洞门旁。LP03 的教学任务不是重复找一次 C，也不是把三块石头全部重置，而是让孩子把低音 C-D-E 看成同一个两黑键邻域中的连续三个白键：

1. C 是已经认识的固定起点。
2. D 在两个黑键之间的白键位置。
3. E 在两个黑键右边。
4. 角色可以说 Do、Re、Mi；键盘、石头、路线、反馈、ARIA 和其它非角色界面只显示 C、D、E 音名。

本节不教低音谱表、不判断左手、不要求连奏、不要求固定指法，也不把一次顺序模仿宣称为稳定掌握。

## 二、故事连续性

### 开场必须成立

- 地图只有在正式 `C4-01` 已结束、LP02 的 C 锚石确实落下后才显示 `C4-02` 入口。
- 进入 LP03 时，C 锚石已经在洞门旁，不能悬浮、消失、重新落下或被替换成另一块 C。
- 只有 D、E 两块石头悬在 C 的右边；它们的形状和重量不能编码正确答案。
- 咚咚仍只以洞中声音或已批准的局部阶段存在，不能提前完整出现。

### 三次路线动作

1. 孩子按低音 C：C 锚石的接缝亮起或锁扣收紧，世界位置不变。
2. 孩子按低音 D：D 石落到 C 右边。
3. 孩子按低音 E：E 石落到 D 右边，形成 C-D-E 三石地基路。

三次动作都必须由成功结束的教学钢琴音事务驱动。只排程声音、声音被中断、地图导航或页面刷新不能提前改变世界状态。

### 永久结果

- `foundationCAnchored=true` 来自 LP02，LP03 只读取，不重新授予。
- LP03 分别持久化 `foundationCAwake`、`foundationDPlaced`、`foundationEPlaced`。
- C、D、E 每完成一步立即保存；休息、返回地图、刷新和新 session 恢复后从第一个未完成动作继续。
- 完成后地图显示三石地基路，不再显示两块悬石；后续 LP04 只能从该完成状态继续。

## 三、教学节奏与游戏节奏

### 1. 看懂问题

孩子第一眼应看到：已经落地但接缝睡着的 C、两块待接上的 D/E、星芽或洞中声音的一句邀请，以及连续 C3-B4 键盘。不要再放一张说明卡重复文字。

### 2. 有界带练

- 当前一步可在石头上显示一个字母音名，并用黑键组定位帮助找键。
- 第一次等待只允许角色重说短邀请或重播当前目标音，不直接脉冲答案键。
- 第二级帮助可显示当前两黑键组定位；再困难才短暂标出当前键。强提示完成写 needsPractice，不写 stable。
- 后续 D/E 不得在作答前同时高亮，避免把 C-D-E 变成照灯按键。

### 3. 即时世界反馈

- C：锁扣亮起、轻微稳固动作。
- D/E：每次只落当前一块，落位后保留。
- 答错：所按键正常发声并短暂压下；角色先说真实音名关系，再重放当前目标。石头轻轻回应但不坍塌、不爆炸、不倒退。
- 减少动态模式使用静态锁定/落位和短亮边，不依赖震屏、尘土或快速滚动。

### 4. 自然停点

- repeated repair、modeled、长等待、乱按失焦或疲劳出现时，在当前已完成石头处休息。
- C 完成后休息，下一 session 从 D 开始；D 完成后休息，下一 session 只续 E。
- modeled 可以完成当前最小动作，但该动作写 needsPractice；不能生成孩子 correct，也不能把后续动作补写完成。

### 5. 可选接缝检查

只有三次路线顺利、没有 strong/modeled/长等待/疲劳时，才可在同一短课追加最多三个 reduced-cue 接缝检查：门-C、C-D、D-E。检查只让已有接缝发光，不移动石头；若预算不足直接延期到下一次 opening review。

- 三个接缝分别检查 `C3`、`D3`、`E3`；呈现顺序必须由 session seed 在六种排列中确定，不能永远固定为 C-D-E，也不能从动画方向提前泄露下一项。
- 当前接缝可以显示字母音名，但键盘不预亮答案；星芽对话可说对应唱名。每个接缝只接受一次首答，再按普通 repair 合同完成。
- 每次检查仍须等待对应教学钢琴音真实 started 和最后 oscillator ended；墙钟只可触发 interrupted/sound-paused，不能直接点亮接缝或写阶段观察。

接缝检查不是第二次建造。它只提供当前 C-D-E 邻域的 reduced-cue 阶段观察，供后续 `C3-G3` 完整路线调度使用；本关不能据此单独写 stable，也不能证明低音谱位、左手或 retained。

## 四、输入与身份规则

- 核心路线是触屏琴键；精确 MIDI C3/D3/E3 可走同一动作。
- 实验麦克风 confirmed 事件最多辅助故事进度，不建立 stable/retained；uncertain、noisy、speaker bleed 和 octave-ambiguous 不算孩子答错。
- 屏幕键只有在对应教学钢琴音真实 started 后才成为一次已提交输入；声音关闭、音量为 0、AudioContext 或播放失败时，不写 correct、wrong、wrongCount、repairStage 或世界进度，只进入可恢复的未提交/sound-paused 状态。
- MIDI 或麦克风若以外部琴声作为孩子选择音，必须保存可审计的 onset 和有界 ended/quiet 事件；不能在 note-on 或首次 confirmed 帧当刻把声音冒充为完整结束。无本地发声的 MIDI 控制器必须仍能从 App 获得教学钢琴音。
- 使用连续 C3-B4 单排键盘，14 个等宽白键与真实 2/3 黑键组；不得为 LP03 改键宽、拆行或只截出三个答案键。
- 白键反馈保存 `midi`、`pitchName`、`noteNameCorrect`、`registerCorrect` 和 route。
- 黑键必须保留真实 `pitchName/isBlack/MIDI`；孩子端可说“黑键”及两黑/三黑组位置，绝不能把 C#、D# 等去掉升号后伪装成 C/D 白键。
- 同名错误八度 `C4/D4/E4` 必须分别写 `noteNameCorrect=true/registerCorrect=false`，不能推进对应低音动作。
- 当前目标为 D/E 时，重复已经完成的 C/D 只记录为“这块已经就位”的当前步错误；未来音提前出现则记录为 out-of-order。两种情况都正常发声并保留真实音名，但不能移动、拆除或提前安装任何石头。

## 五、证据语义

### Played

LP03 三个路线动作真实呈现并完成后，可写 C-D-E 低音键位路线 played。assisted/modeled 可以完成故事并写 needsPractice，但必须保留实际 route、wrongCount、repairStage 和 modeledInputs。

### Stable

本里程碑不写 stable。即使三个 reduced-cue 接缝检查都顺利完成，也只保存 `low-key:C3-E3` 的阶段观察，不创建 stable event、不增加 stable completion。低音键位 stable 必须等后续已经教完 F/G 后，按 `docs/09` 的 canonical threshold 完成完整 `low-key:C3-G3` 少提示路线；不能把 LP03 的 C-D-E 子集提前冒充为整体稳定。

### Retained

本里程碑不写 retained。retained 只能来自 scheduler 以后安排的独立 opening review。

### 家长端

家长端最多区分：

- 低音 C-D-E 路线玩过；
- 本次需要提示；
- 三个低音键位完成过少提示接缝观察。

禁止写“会左手”“会低音谱”“掌握所有低音键”或“绝对音感”。

## 六、会话、恢复与防重复

- 地图入口点击创建唯一正式 `C4-02` session；渲染、刷新、debug URL 和截图模式不得创建正式历史。
- 当前动作的 wrongCount、childInputs、inputRoutes、repairStage、modeledInputs 和声音事务必须在每次有效输入/升级后立即持久化。
- 声音事务必须区分 `scheduledAt`、真实 `startedAt`、真实 `endedAt` 和 `interruptedAt`。AudioContext 为 suspended、resume 被拒绝、页面后台挂起或播放中断时，不能用 wall-clock timer 冒充 ended。
- 地图暂停只清理计时器、动画和 DOM，不清 pending attempt。
- 页面恢复时先恢复世界持久状态，再恢复当前动作；不得重复落石或重复授予 evidence。
- Enter、Space、VoiceOver/辅助 click、触摸 pointer、鼠标 click 和 MIDI 每次物理/辅助激活只能产生一次教学音、一次提交和一次世界推进。
- 页面外 pointerup/pointercancel、窗口失焦和 DOM 重绘必须幂等清理 pressed 状态，不得卡键或双触发。

## 七、可见界面验收

- 普通孩子表面和非角色 ARIA 只出现 C、D、E 等音名；Do、Re、Mi 只允许出现在星芽或咚咚对话框。
- 当前目标最多由两个互补载体表达：石头字母和角色唱名。标题、任务条、粒子、键帽不得再重复答案。
- 1024x768、1194x834、1366x1024 及对应 DPR 视口无横向溢出；键盘完整、石头不挡键、角色不挡当前动作。
- C 锚石、D/E 悬石、错误、assisted、modeled、各自然停点、地图恢复、完成态和减少动态均需原尺寸证据。
- 正式美术若尚未批准，可使用清楚的代码回退完成教学验收，但只能称 browser teaching baseline，不能称发布美术。

## 八、专项自动化最低清单

1. 正式入口、debug/direct 零历史写入、唯一 session。
2. LP02 C 锚石继承，LP03 初始 C 不悬浮/不重落。
3. C 唤醒、D/E 落位及三步真实声音 started/ended 门禁；覆盖 suspended + resume reject、播放中 suspend、watchdog 只进入 sound-paused、恢复后单次提交。
4. C 后、D 后休息和刷新恢复；新 session 只含剩余动作。
5. wrong、已完成音重复、未来音提前、C4/D4/E4 same-name wrong octave、黑键、assisted、modeled、mic ambiguous，以及声音关闭/音量 0/播放失败时零评分、恢复后单次提交。
6. 石头和 evidence 不因返回、刷新、repair 或 later check 倒退。
7. 可选门-C、C-D、D-E 接缝检查、六种 seed 顺序覆盖与延期分支。
8. played/needsPractice/阶段观察和家长端分轴；LP03 stable/retained 必须保持 0。
9. 纯 click、Enter、Space、VoiceOver detail=0、重叠 pointer、页面外释放、DOM 重绘后各只提交一次。
10. 儿童音名门禁、连续双八度键盘、PWA 冷离线、session/clean-state/前章回归。
11. 六视口 phase-bound 合同、三连 internal hash、源文件 bytes/hash、零 browser error。
12. `concepts/**`、`audio/**`、Grok/Gemini 视频和未批准 runtime 候选引用为 0。

## 九、冻结交接要求

原型任务正式收到本工作单后，完成时必须提供：

- 选择性提交 SHA 与改动文件；不得暂存主管文档或媒体候选。
- 专项逐项数量、共享回归、quick、strict bundle 和 PWA 结果。
- 六视口合同 ID、internal hash、文件 SHA-256 和 source hash 核对。
- 原尺寸截图路径与浏览器错误统计。
- passed / partial / missing / contradicted 四态自审。
- 明确说明实体 iPad、真实 MIDI、原声钢琴麦克风、教师、3-5 名儿童、发布来源和外部相似性仍是否 missing。

只有主管独立复跑并确认世界连续性、教学语义、输入生命周期、证据分轴和提交边界后，`C4-02` 才能晋升浏览器基线；LP04 在此之前继续锁定。
