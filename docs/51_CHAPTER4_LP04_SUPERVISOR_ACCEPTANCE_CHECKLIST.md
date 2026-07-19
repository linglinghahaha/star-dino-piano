# Chapter 4 C4-03 / LP04 主管验收工作单

状态：`dispatch_ready / LP03_baseline_passed / C4_R01A_core_passed_at_af9aa28 / includes_C4_R01B_runtime_integration_gate / next_unique_runtime_work / media_forbidden`

本文件把 `LP04 地洞回声` 从故事提纲收敛为可实现、可复核的短课合同。它只负责把已经教过的低音 `C-D-E` 键位关系转成一次 `E-D-C` 下降回声路线；不引入 F/G、低音谱表、左手、完整咚咚、视频、语音或 SFX 候选。

当前可派发。`C4-02 / LP03` 已在 `cedc384` 完成独立审查与冻结，`C4-R01A` 调度核心也已在 `overhaul-347a-c4-r01a` / `af9aa2831bb90c94fd10fdfbe3ca89ba4d03021a` 形成独立基线。LP04 现在是唯一运行工作，并必须同时完成 `C4-R01B` 的真实 `C4-03` 整合门禁；LP04/R01B 要形成新的独立提交，不能回写或压扁 R01A 提交。工作范围仍不包含媒体、完整咚咚、低音谱表、左手或 LP05+。

## 一、这节课教什么，不教什么

LP03 已让孩子在正确低音八度找到 C、D、E 的三个家。LP04 不再做一遍“按亮键建三块石头”，而是让孩子听见一条从高到低的熟悉三音路线，并沿真实键盘方向把回声带进洞底：

1. 先听一次不计分的完整 `E3-D3-C3` 下降模型，知道“声音正在往下走”。
2. 再分三步听当前目标并在连续双八度键盘上找到精确 `E3`、`D3`、`C3`。
3. 每个正确且真实结束的孩子音只推动当前一段回声光；未来段不预亮答案。
4. 普通孩子界面、石头、路线、键盘、反馈和 ARIA 使用 `E / D / C`；只有星芽或洞中咚咚的对话框可说 `Mi / Re / Do`。

这仍是有界教学路线，不是无参考绝对音高测试，也不是低音键位 stable、低音谱表、左手或连奏测试。允许单指逐个按、换手、停顿和重新定位，不要求固定速度、指法或三音连奏。

## 二、故事连续性

### 开场

- LP03 的 C、D、E 三块地基石已经永久就位，不能悬回空中、重新落下或被回声覆盖。
- 洞壁只有三段中性回声通道和一个尚未抵达洞底的光点；段的颜色、重量、大小和运动方向不能在当前教学音开始前编码答案。
- 咚咚仍是洞底局部剪影。开场最多看见圆扇形颈盾轮廓，不得提前显示完整身体、三只角动作表、脚印关或正式见面动画。

### 三步因果

1. `E3` 真正结束：上段回声被接住，光进入第一段。
2. `D3` 真正结束：光继续向下进入第二段。
3. `C3` 真正结束：光到达洞底，只照亮咚咚的两只眼睛和颈盾局部轮廓。

世界字段至少分开保存 `echoEReached`、`echoDReached`、`echoCReached` 与 `dongdongPartialReveal`。每一步完成立即持久化；返回地图、刷新、repair、后续 opening review 和新 session 都不能让光倒退或重复授予同一故事结果。

完成态停在洞底局部剪影，不自动进入 LP05，不弹“下一关/关闭/成绩”卡。完整咚咚只能在 LP05 教完 E-F-G 边界后出现。

## 三、教学与游戏节奏

### 1. 一次完整模型

每个 formal session 开头最多播放一次不计分的 `E3-D3-C3` 完整下降模型。三个音必须使用同一中性洞口声源、相同音色和响度，不用左右声像、角色视线或三块石头动画给答案。刷新恢复未结束的模型时进入 sound-paused，不能靠墙钟假装播完；同一 session 恢复后由明确扬声器手势重播，不新增第二条模型证据。

若这是从 E 或 D 后自然休息恢复的新 session，可以重播一次完整模型帮助重新进入故事，但已完成世界段保持不动，当前 action 仍从第一个未完成目标开始。

### 2. 三个当前目标

- 模型结束后才呈现当前一步。当前洞段可显示一个字母音名，角色对话可说对应唱名；这是两个互补载体的上限。
- 当前目标音先从中性洞口真实 started/ended，随后才开放键盘输入。答案键在目标音前、播放中和普通等待期均不预亮。
- 第一次等待只重播当前目标或让角色重说一句短邀请；第二级帮助才显示两黑键组定位，再困难才短暂标出当前键。
- E、D、C 每完成一步都有小的下行变化；第三步获得本课唯一永久高潮，即洞底眼睛和颈盾局部亮起。

### 3. 错误与修复

- 孩子所按音先按真实 `pitchName / MIDI / register / isBlack` 发声并结束，再重放当前目标音；回声停在当前段，不倒退、不坍塌、不爆炸。
- 同名错误八度 `E4 / D4 / C4` 写 `noteNameCorrect=true / registerCorrect=false`，不能推进低音回声。
- 已完成音重复写“这一段已经接住”，未来音提前写 out-of-order；两者都不能跳段或移动未来回声。
- 第二次错误进入 bounded assisted；assisted 再错或长等待后，角色只 modeled 完成当前最小段，写 needsPractice，不制造 child correct。

### 4. 自然停点

- 顺利路线可以在同一短课完成 E-D-C 三步。
- repeated repair、strong、modeled、长等待、乱按失焦或明显疲劳出现时，在当前通过 repair 完成的回声段休息。E 后下一 session 只含 D/C，D 后只含 C。
- 困难 opening review 已在本 session 开头收短时，LP04 三个 action 必须全部保持未呈现；不得为了“顺便推进故事”自动播放模型或点亮回声。

## 四、C4-R01 与 session 组合

- 地图只有在正式 LP03 结束且三石地基成立后显示 LP04 入口。孩子明确点击后创建唯一目标 `bundleId=C4-03` formal session。
- 已通过的 `C4-R01A` 调度核心可在该 session 的 LP04 actions 前插入最多一个 `opening-review` action；本次 LP04 候选负责完成 `C4-R01B` 真实运行整合，`reviewSkillKey` 与 LP04 evidence 分开。
- 无 review 或 review 顺利且孩子仍投入时，沿用同一 session 进入 LP04 模型；review 困难时 session 在 review 安全点 ended，LP04 模型和 actions 均未呈现。
- 任一 session 呈现过 review 后，下一次正式点击必须创建不含 review 的 C4-03/后续故事 session；困难 review 后尤其不能改选另一条复习继续拦路。该无复习 session ended 后，调度器才可再次选 review。
- LP04 在 E 后或 D 后自然休息形成的 `resumeOfSessionId` session 永远不插 review，只续 D/C 或 C；该 resume 正常 ended 后可作为全局无复习故事间隔。
- render、刷新、debug/direct、地图查看和复习队列迁移都不能单独创建 C4-03 session。自然停点后的再次点击必须创建新 sessionId，并只含剩余 LP04 action；`resumeOfSessionId` 指向上一正式 session。

## 五、输入与教学音生命周期

- 触屏是核心发布路线；精确 MIDI 52/50/48 可走同一低音 action。连续键盘保持 `C3-B4`、14 个等宽白键和真实 2/3 黑键组。
- 屏幕键只有在孩子音真实 started 后才记录 onset，只有真实 ended 后才评分并推动回声。声音关闭、音量 0、AudioContext suspended/closed、resume 拒绝、播放失败、后台挂起和 watchdog 均只能进入可恢复 sound-paused，不能写 correct/wrong/world progress。
- MIDI note-on 后提供本地教学钢琴回声；未 note-off、长按重复和程序合成重复不能形成第二次输入。页面外 pointerup/pointercancel、失焦和 DOM 重绘必须幂等释放。
- 麦克风只作为实验 assisted 路线。confirmed 精确音还需有界 quiet/end 证据才可辅助当前故事段；uncertain、noisy、speaker bleed 和 octave-ambiguous 不算 wrong。麦克风不建立 stable/retained。
- 地图返回若发生在任何目标、孩子音或 repair 音事务中，只设置 queued return；事务必须真实结束或进入 sound-paused 后才决定进度，不能由导航直接提交。

## 六、证据语义

LP04 三个 action 均为 `reviewableForMastery=false`。三步真实呈现并由 child/assisted/modeled 逐步完成后可以记录：

- `played=true`：跟着下降回声走过 E-D-C 故事路线；
- `needsPractice=true`：使用 strong、modeled、实验麦克风或 repeated repair；
- `stageObservation.skill=low-direction:E3-C3`：保存每步 first response、wrongCount、route、cue、register 与跨 session 情况。

本课必须保持 `stable=0 / retained=0 / low-key:C3-G3 stable=0`。完整模型、固定顺序和当前字母提示使它不具备少提示稳定证据条件；家长端只能写“跟着下降回声走过”或“今天需要提示”，不能写“听出任意下降旋律”“掌握低音 C-D-E”“会左手”或“会低音谱”。

## 七、可见界面与无障碍

- 孩子第一眼应看见三块已落地石头、当前回声段、局部剪影、星芽/洞中声音的一句邀请和完整键盘；不再叠加任务说明卡、成绩卡或三份重复答案。
- 当前字母最多出现在洞段与键盘身份中；键帽保持正常音名字母政策，角色对话之外不得出现 Mi/Re/Do。
- 回声、剪影和角色不得遮住当前键、两黑键定位或键盘触控区。1024x768、1194x834、1366x1024 及对应 DPR 六视口无横向溢出。
- 减少动态模式用静态段亮起和局部剪影明暗替代快速下坠、震屏、尘土和闪烁。
- ARIA 说清“当前找 E/D/C”“回声完成 x/3”“按键真实音名”；不说唱名、速度、考试、stable 或答案键已亮。

## 八、专项自动化最低清单

1. LP03 正式完成、三石世界继承、地图入口、debug/direct 零历史、唯一 C4-03 session。
2. `C4-R01B` 无候选、顺利 review、困难 review 三条真实 C4-03 组合路线；困难时 LP04 全部未呈现且下次显式点击创建无 review 的新 session，不能改选第二候选，也不能引用 A 类纯计划夹具冒充端到端通过。
3. 一次模型 E-D-C 的真实 started/ended；刷新、返回、suspended、resume reject、mute/volume zero、watchdog 均不能伪造模型完成或 action 进度。
4. E/D/C 三步 exact register、世界单向持久化、E 后和 D 后自然停点、新 session 只含剩余 action。
5. 普通 wrong、黑键、C4/D4/E4 同名错八度、已完成音重复、未来音提前、assisted、modeled、mic ambiguous 分轴正确。
6. touch click/Enter/Space/VoiceOver、重叠 pointer、页面外释放、MIDI held note、DOM 重绘各只产生一次音、一次提交、一次世界推进。
7. played/needsPractice/stage observation 与家长文案；LP04、`low-key:C3-E3` 和 `low-key:C3-G3` stable/retained 全部保持 0。
8. 完成只显示局部眼睛/颈盾剪影，0 完整咚咚、0 LP05 action、0 自动下一 bundle、0 结果弹层。
9. 普通表面/ARIA 音名门禁、连续双八度键盘、六视口 phase-bound 合同、减少动态、PWA 冷离线。
10. LP01-LP03、C4-R01、Chapter 1-3、session、clean-state、教学音总生命周期、iPad a11y、audio settings、input reliability、quick 和 strict bundle 回归。
11. 任一 review 后的下一 formal child session 为 story-first、opening-review 数量 0；只有该 session ended 后才可重新选择候选，同优先级候选无饥饿。
12. E 后、D 后的 `resumeOfSessionId` 路线均保持 opening-review 数量 0、剩余 action 原序，且可在 ended 后诚实消费全局间隔。
13. `concepts/**`、`audio/**`、Grok/Gemini 视频、未批准角色/剪影和跨项目标识运行引用为 0。

## 九、冻结交接要求

原型任务获准执行后，必须单独提交 LP04，并提供改动文件、最终源码 SHA、专项逐项数量、共享回归、六视口合同三连 internal hash、原尺寸截图、浏览器错误、严格包清单以及 passed/partial/missing/contradicted 自审。

实体 iPad Safari、真实 MIDI、原声钢琴麦克风、扬声器/耳机真人听审、教师、3-5 名儿童、最终剪影/角色美术、来源和外部相似性在有直接证据前继续 missing。主管独立复跑通过前，LP05 和所有媒体运行集成仍锁定。
