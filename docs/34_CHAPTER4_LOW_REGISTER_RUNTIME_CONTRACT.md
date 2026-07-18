# Chapter 4 Low-Register Runtime Contract

状态：`specification_passed / LP01_LP03_browser_runtime_passed_at_346a / C4_R01A_next / LP04_LP10_runtime_incomplete / device_teacher_child_evidence_missing`

负责人：课程故事、整体调度与独立审查任务锁定教学语义；原型任务负责运行实现、浏览器门禁、截图和输入证据；媒体任务只生产可追溯候选，未经调度复核不得接入运行时。

本文件把第四章 `LP01-LP10` 收敛成可直接实现的运行合同。它不能改变 `03_CONTENT_ROADMAP.md` 的顺序和音高、`09_SCAFFOLD_AND_ASSESSMENT_RULES.md` 的证据边界、`14_NOTE_IDENTITY_MATRIX.md` 的键位/谱位、`17_STORY_ARC_AND_LEVEL_BEATS.md` 的故事因果、`24_HUMAN_STORY_AND_LESSON_BOOK.md` 的角色动机或 `33_GAME_TEACHING_PACING_AND_MOTIVATION_CONTRACT.md` 的短课预算。

## 给家长看的简短说明

第四章先让孩子听出“同样叫 Do，也有高低两个家”，再认识低音 `C3-G3` 的键位。等低音位置熟悉以后，咚咚才邀请左手加入，最后把已经走过的路放到低音谱表上。

故事可以在提示或共同完成后继续；`stable` 只能来自符合门槛的少提示表现；`retained` 仍必须遵守 `docs/31` 的跨 session、跨本地日期、至少 8 小时和 opening-review 规则。

## 一、不可改变的课程边界

- 教学低音域固定为 `C3-G3`：`C3/MIDI 48`、`D3/50`、`E3/52`、`F3/53`、`G3/55`。
- 比较参照使用中央音区 `C4-G4`，但不能把八度等价音算作正确低音键或低音谱位。
- 第四、五章使用一条连续、不滚动、不分页的 `C3-B4` 两八度键盘；黑键保持真实 2/3 分组，白键宽度和键位顺序不随关卡变化。
- 普通孩子界面只显示 `低音 C/D/E/F/G`、`下面的 C`、`中央 C` 或黑键定位；键帽仍只显示字母。只有挂在星芽/咚咚身上的对话框可说 `低音 Do/Re/Mi/Fa/Sol`；`C3/D3/...` 只在家长、教师或调试证据中出现。
- `LP01-LP06` 先教音区和键位，不提前把任务说成左手考试。
- `LP07` 只证明系统提示过左手、孩子完成了熟悉路线；触屏/MIDI 音高不能证明真实手型或指法。
- `LP08-LP10` 只使用已经单独见过的低音，不能一边引入新键位一边首次教低音谱表。
- `LP06` 的 `C3-G3-C3` 是远跳预览，不能单独证明低音 G 稳定或手张开能力。
- `LP10` 引导过桥和少提示信号检查必须是不同 session；故事在引导/共同完成后可继续，不等待 stable。
- 触屏是完整核心路线；MIDI、麦克风和成人确认只能增加证据，不能成为通关前提。
- 孩子端不显示速度分、准确率、stable、retained、手型失败或“高低音天赋”。

## 二、故事入口与角色连续性

Story mode 只有在正式 `C3-07/LS08` session 以 clean、bounded assisted 或 modeled story completion 结束，并真实写入未计分 C4 -> C3 地底回声事件后才出现第四章入口：根须把低 Do 回声送入地下，地面产生波纹，洞穴轮廓出现。stable 不是入口条件；debug/direct、刷新或未结束 session 不能伪造入口，入口必须由孩子下次明确点击才创建 `C4-01`。

教师/自动化审计可以通过显式隔离入口直接查看第四章，但必须标记 `directMode=true / formalSession=false`，不得写 Chapter 3 completion、正式 C4 session、地图解锁、played、stable、retained 或孩子历史。普通 debug/direct URL 在 Story mode 中仍不能造入口或自动入章；测试深链与正式故事状态必须使用不同存储命名空间或无持久写入 fixture。

角色连续性：

1. 星芽仍在可呼吸花园和地下生态层活动，保持角色本体、三颗头芽、探索背带和星星背包，不无头盔返回月面真空。
2. 咚咚是原创圆扇形颈盾、四足低姿、三只短角、宽脚掌的低重心角色；不能漂移成带额外颈盾尖刺的通用三角龙贴画、长期双足吉祥物，也不能用笨拙、怪兽化动作制造笑点。
3. 咚咚按“声音 -> 洞中剪影 -> 眼睛/颈盾局部 -> 三枚脚印 -> LP05 完整出现”的顺序揭晓，不能在 LP01 自动播放完整角色成片。
4. 低音的视觉重量只营造氛围，不得通过更暗颜色、更大石头、左侧位置或角色动作提前给出答案。

## 三、正式短课与自然停点

| Bundle | 运行内容 | 有意义输入预算 | 永久故事结果 | 自然停点/恢复 |
| --- | --- | --- | --- | --- |
| `C4-01` | `LP01 -> LP02` | LP01 两次不计分模型 + 最多 4 次高低首答；LP02 1-2 次低 C 找家 | 每 1-2 次真实已解决比较增加中性洞纹；顺利时四题点亮洞口，困难时星芽可帮助打开故事入口但不能补造未呈现题；LP02 让第一块地基落下 | LP01 吃力时停在发光洞口并写 partial/needsPractice；下次先重听一组不计分 C4/C3 模型，再续 LP02，不重播整组四次比较，后续 opening review 再取回高低比较 |
| `C4-02` | `LP03` | 3 次路线输入：C 唤醒/锁紧既有锚石，D、E 各落下一块；状态顺利时可加 3 个地基接缝检查 | LP02 的 C 锚石保持原位，D、E 加入后形成永久三石地基路 | 接缝检查延期时直接在已完成的地基路休息 |
| `C4-03` | `LP04` | 3 个低音下降输入 | 回声光到达洞底，局部剪影出现 | 剪影保持可见，不自动进入脚印关 |
| `C4-04` | `LP05` | 3 个 E-F-G 脚印 + 最多 3 次已教近邻比较 | 咚咚完整出现并成为朋友 | 咚咚在最后脚印旁坐下 |
| `C4-05` | `LP06` | 3 个远跳输入 | 大拱石永久滚入桥位 | 不追加稳定检查，直接看大动作结果 |
| `C4-06` | `LP07` | 5 个熟悉低音脚印 | 五枚左手邀请脚印永久亮起 | 只记录 handPrompted；咚咚与孩子组成小队后休息 |
| `C4-07` | `LP08` | 3 个 C-D-E 谱位；顺利时可加 3 个轨道检查 | 地下谱线地图亮起前三个家 | 强帮助后在已亮地图休息，检查延期 |
| `C4-08` | `LP09` | 3 个 E-F-G 支撑；顺利时可加 3 个压力检查 | 三个上层支撑永久锁紧 | 桥保持稳定，不拆支撑重做 |
| `C4-09A` | `LP10` guided | 6 个 C-D-E-F-G-E 谱桥输入 | 咚咚到达信号塔，低音桥完成并发出可用信号 | Chapter 5 可解锁；不自动开始检查 |
| `C4-09B` | later `LP10` check | 6 个同音序少提示输入 | 原桥上的六个信号锚依次稳定 | 只测当前稳定；咚咚不重新过桥，完成后回地图 |

`C4-09A/B` 是同一 `C4-09` 故事 bundle 的两个持久阶段，不是两个新的课程 level id。恢复状态必须保存 bridgeBuilt、dongdongAtSignalTower、signalAnchorCount 和 checkDeferred；刷新不能把角色送回桥头。

通用分流：

- repeated repair、strong/assisted cue、modeled success、长等待、乱按失焦或疲劳出现后，不强迫同 session 检查；保留当前永久结果并休息。
- modeled success 允许完成当前最小故事单元，但写 needsPractice，不写 child correct/stable/retained。
- 已完成石头、脚印、谱位、支撑和桥不因后来错误倒退。

## 四、双八度键盘与谱位合同

连续键盘范围为 `C3-B4`，至少覆盖 14 个白键和真实黑键组。任何视口都不得：

- 把低音和中央音区拆成上下两排；
- 水平分页或在作答时自动滚动；
- 为了放入屏幕改变黑键宽度、位置或 2/3 分组；
- 用左右屏幕位置替代高低音听辨答案；
- 让标签、提示或角色遮住当前低音键。

低音谱位固定：

| 音 | MIDI | 低音谱表位置 | 黑键定位 |
| --- | --- | --- | --- |
| `C3 / 低音 Do` | 48 | 第二间 | 两黑左 |
| `D3 / 低音 Re` | 50 | 第三线/中间线 | 两黑中 |
| `E3 / 低音 Mi` | 52 | 第三间 | 两黑右 |
| `F3 / 低音 Fa` | 53 | 第四线 | 三黑左 |
| `G3 / 低音 Sol` | 55 | 第四间 | 三黑第一、第二之间 |

谱位由代码绘制，不能烘焙进生成图片或视频。当前目标以一个谱垫为主，未来谱位保持安静；检查前无强目标键光。

## 五、各关教学与检查状态

### LP01 高低 Do

- 模型阶段先让两个固定、同权重、同垂直基线的中性声音泡泡分别播放 C4/C3；左右映射由 session seed 固定且整组不交换。泡泡 mapping 与四题 sequence 必须使用相互独立的可复现 seed 派生，不能让第一题或第二题在所有 session 恒定落到同一个泡泡。泡泡可在模型阶段自由重听，不使用星芽/咚咚发光、上下运动或左右声像编码答案。
- 正式比较使用 4 次受约束调用，低/高目标各 2 次，顺序可复现且同一目标不连续超过 2 次。
- 正式目标从中央中性声源播放；check 开始后第一次点任一泡泡即提交首答并播放所选声音，不提供不计分的候选预听。目标可整题重听，但四次调用中超过一次孩子重听会阻断 stable。响应映射在整组中不交换，未来目标不能通过动画、位置变化、角色视线、左右声像或持久世界进度泄露。
- LP01 全程不要求找 C3/C4 琴键。MIDI/麦克风事件可作为非计分探索观察，但不能评分、写 correct 或形成 LP01 stable；精确键位动作从 LP02 开始。
- 每个已解决调用增加一个与高低无关的中性洞纹，第二次和第四次形成可见小成就；答后高/低方向反馈必须在下一题前清除，不能成为未来 target carrier。
- stable：至少 3/4 第一次泡泡选择正确，最多一次孩子整题重听，无候选预听、strong、modeled、visual-assist、实验输入、跨 session 拼接或错后回填。
- repeated repair、modeled、长等待或疲劳可提前结束 LP01：只保存真实 presented/resolved calls，剩余调用写 `unpresentedCallCount`，不创建 scored call。角色可以令洞口故事进入 `storyResolvedBySupport` 并允许下次续 LP02，但四题未全部呈现时 LP01 `played=false/stable=false`，家长端显示 partial/needsPractice 和以后 opening review。

### LP02 低音 C 家

- 同时显示正常权重的 C3/C4 两个键家，只有故事门铃说明“寻找地下家”；不能提前脉冲 C3。
- 中央 C4 是“名字对、家不同”的接近答案，不记作低音正确，也不羞辱。
- 后续 reduced-cue 首答正确才可形成独立 C3 家证据；引导完成只记 played。
- 触屏选择 C3 是核心正确路线。精确 MIDI C3 可形成 played，C4 写 `noteNameCorrect=true/registerCorrect=false`；其它音按真实 note/register 修复。实验麦克风 confirmed C3 最多形成 assisted story completion，不能形成 LP02 stable/retained；uncertain/noisy/bleed/octave-ambiguous 不算 wrong，立即保留触屏接管。
- LP01 困难后续 LP02 不删除 `needsPractice`；scheduler 必须保留一个以后拥有独立证据的高低 C opening-review action，而不是把 LP02 找键成功回填为 LP01 stable。该 action 条件插入下一目标课的 session 开头，不是额外地图关或 review-only session。

### LP03-LP07 低音键位

- LP02 已永久放下 C 锚石。LP03 第一遍先用 C 唤醒/锁紧该锚石，再用 D、E 放下两块新石；不能把 C 重新悬起或再次落下。可选检查只点亮门-C、C-D、D-E 三个既有接缝，不移动任何石头。
- LP04 目标音播放前不亮答案键；错误后先说孩子音，再重放目标和当前方向。
- LP05 先教 E/F/G 三个家，再做近邻比较；完整咚咚只在故事单元结束时出现。
- LP06 只记录远跳路线 played，不授予独立 G 家或跨度能力。
- LP07 handPrompted=`left`，但 touch/MIDI/mic 的 note event 不得自动写 actualHand=`left`。

### LP08-LP10 低音谱表

- LP08 引导点亮 C-D-E 地图；可选检查让已有轨道接通，不清空谱位。
- LP09 引导锁紧 E-F-G 支撑；可选检查读取压力点，不拆桥。
- LP10 guided 让咚咚过桥；later check 让六个信号锚稳定。两段使用同音序但不同世界状态。
- wrong octave 必须记录 noteNameCorrect=true、registerCorrect=false，并提示低音家；不能计 bass staff correct。

## 六、played、stable、retained 与手部证据

| 技能 | Played | Stable | 禁止结论 |
| --- | --- | --- | --- |
| 高低 C 比较 | 四次调用均真实呈现并解决后才写 played；assisted/modeled 可写 played + needsPractice。若为保护孩子提前收短，只写 storyResolvedBySupport + partial/needsPractice，不写 played | 同一 session 至少 3/4 个第一次完整泡泡选择正确；最多一次孩子整题重听；无候选预听、strong、modeled、visual-assist、实验输入、跨 session 拼接或错后回填 | “绝对音感”“低音天赋”；把未呈现调用或修对结果回填为首答正确 |
| 低音 C 家 | 引导中触屏找到 C3，或精确 MIDI C3 写 played；confirmed 麦克风只能写 experimental assisted story progress | later reduced-cue 的触屏首答找到正确低音 C；无 strong/modeled/visual/mic，且 MIDI/麦克风不在首版建立 stable | C4 同名按对算低音正确；用 LP02 成功删除或回填 LP01 needsPractice |
| 低音 C3-G3 键位 | 完成相关引导路线 | reduced-cue 路线最多 2 次 wrong，正确 register，无 strong key glow | LP06 远跳一次等于 G 稳定 |
| 左手邀请 | LP07 提示左手并完成路线 | 只能记录 prompted/observed；需成人确认才有 actual hand evidence | 仅凭低音音高声称左手技术掌握 |
| 低音谱位 | 完成 LP08-LP10 guided | LP10 later signal check 最多 2 次 wrong，无 strong glow，所有音正确八度 | 故事过桥等于谱位稳定 |

stable 事件使用 register-qualified skill key，例如 `low-key:C3-G3`、`bass-staff:C3-G3`。不能与高音 `C4-G4` 的证据合并成 letter-only key。

retained 只能来自 scheduler 选择的 later opening review。普通重玩、LP10 同故事 check、调试深链和同日重复都不能写 retained。

## 七、输入路线

### 触屏

- 完整通过 LP01-LP10，是核心发布路线。
- 键盘保持真实 C3-B4 几何；按键必须有即时真实压下和钢琴音。
- TH/LP 未来多点需求不影响第四章单音路线；滑音或长按重复不能伪造多个输入。
- 琴键或声音泡泡在输入后发生 DOM 重绘时，pointer 生命周期必须按稳定音符/控件身份保存，不能按已被替换的元素保存。页面其他位置收到 `pointerup/pointercancel`、窗口失焦或辅助激活后都要幂等收口；一次物理触控及其合成 click 只能发一次音、提交一次，并且不能留下永久 pressed 或未重新武装状态。

### MIDI

- LP01 不使用 MIDI 作为计分输入，避免把高低听辨和键位寻找混成一个任务；MIDI 从 LP02 开始进入精确八度键位路线。
- 仅精确 MIDI 和正确八度算正确；velocity-zero/note-off 正常去抖。
- Web MIDI 不在 iPad Safari 上作必有承诺。
- 外接琴自身发声时检查应用确认音的双音/梳状失真。

### 麦克风/真钢琴

- LP01 不使用麦克风作为计分输入；让孩子弹一个 C 来回答会提前混入 LP02 的键位任务。实验麦克风路线从 LP02-LP06 开始。
- 仅家长设置明确开启；不在孩子首次进章时弹权限。
- MVP 本地处理，不上传、不保存原始家庭录音。
- 可实验性推动 LP02-LP06 sequential played；不能证明 hand use、bass-staff reading、stable 或 retained，直到真机校准通过。
- wrong octave、uncertain、noisy 和 speaker bleed 必须分开；uncertain 不算孩子答错，触屏始终可接管。

## 八、音频与角色反馈

- 教学钢琴音最高优先级；目标音起音后的前 540ms 不被语音、环境声、石头 Foley 或奖励动机遮盖。
- C3/C4 比较使用同一钢琴音源、力度、包络、混响和中央声像；允许真实音区音色差，不额外用响度、时长或效果器编码高低答案。
- 咚咚的低声角色语音必须在目标音前结束，不能与 C3 叠在一起形成答案。
- 石头落位、脚步和桥支撑音效应无稳定教学音高或足够弱，不与 Do-Re-Mi 混淆。
- 正确、错误、修复和完成使用不同但克制的动作；错误不让洞穴坍塌、石头爆炸或咚咚表现失望。
- 减少动态模式保留键压、静态落位、谱垫轮廓和最终角色状态，去掉连续尘土、震屏和快速滚石。
- 目标、孩子选择、目标重播和 modeled 必须保存 started/ended 事务状态；地图点击只能排队到当前声音事务结束，刷新中断必须回到对应 sound-paused 恢复。仅成功排程声音不能推进洞纹、结束 LP01 或写故事完成。

## 九、孩子端界面要求

- 第一视线是当前洞穴问题、一个可演奏道具、咚咚/星芽的一句邀请和连续双八度琴键。
- 同一个答案最多由两个互补载体出现：物件/谱垫显示字母，角色说唱名；不能再用标题、卡片、粒子重复。
- 地图、任务名、门铃、石头、脚印、谱垫、路线、反馈、特效和结果使用 `低音 C/D/E/F/G` 或单字母；不得出现普通 `低音 Do`、`Do/C`、`Sol/G` 双标。角色气泡可把同一个字母唱作对应唱名。
- 两个八度同时出现时，普通界面用 `低音 C`、`中央 C`、上下位置和黑键组定位区分，不把 `C3/C4` 放在孩子主路径上。
- LP01 比较时两个候选必须同尺寸、同亮度、同位置权重；目标声来自中性中央声源。
- LP05 完整角色揭晓不能遮住 E-F-G 边界或键盘。
- LP08-LP10 五线谱五根线足够粗、间距适合 iPad，一到两个小节长，不用长谱页。
- 左手图标只在 LP07/后续手任务出现；不在低音初识时提前给出“低音等于左手”的误解。
- 自然停点无必须关闭/下一关弹层，角色和永久世界状态保持可看。

## 十、必须自动验证的门禁

原型任务至少提供：

1. Story mode 只有真实 C3-07 clean、bounded-assisted 或 modeled story ending 且未计分地底回声结束后才显示 Chapter 4 入口；必须孩子明确点击才创建 C4 session，direct/debug/刷新不伪造前章证据或自动入章。
2. LP01 四次高低调用平衡；两个固定声音泡泡同权重；mapping 与 sequence 独立派生，并在至少 16 个确定性 session seed 上证明第一、第二题答案位置都不是常量、两侧平衡且覆盖 mapping x 首题目标四种组合；模型泡泡只在 check 前可自由重听，check 中第一次点任一泡泡立即提交且不存在候选预听；孩子整题重听最多一次才可能 stable；每 1-2 个真实已解决调用只增加中性洞纹；MIDI/麦克风不评分；3/4 首次完整回答、needsPractice 与 later opening-review 队列均正确。提前收短时 presented/resolved/unpresented、storyResolvedBySupport 与 played=false 必须一致，不生成占位 scored call。
3. LP02 触屏 C3 是核心正确路线；精确 MIDI C3 最多写 played；confirmed 麦克风最多写 experimental assisted story completion 且不能 stable；C4 写 nameCorrect/registerWrong，不计低音正确，也不能删除或回填 LP01 的听辨证据与 needsPractice。
4. C3-B4 连续键盘在目标 iPad 横屏视口不分页、不滚动、不拆行，黑键几何正确。
5. LP03 进入时必须继承 LP02 已落下的 C 锚石；C 输入只唤醒/锁紧，D/E 才新增石头。安装与门-C、C-D、D-E 接缝检查状态不同；地图、刷新、休息、repair 和 later check 均不重置或重放已完成石头。
6. LP04 目标音播放前输入关闭，答案键不亮；wrong 先识别孩子音再重放目标。
7. LP05 E/F/G 边界和完整咚咚揭晓顺序正确，作答前角色动作不泄题。
8. LP06 不写独立 G stable 或跨度 mastery。
9. LP07 handPrompted 与 actualHand/adultConfirmed 分开；touch/MIDI 音高不伪造手部证据。
10. LP08 C3/D3/E3、LP09 E3/F3/G3 谱位和 MIDI 完全匹配 `docs/14`。
11. wrong octave 在 LP08-LP10 不计正确，但得到“名字对、低音家不同”的温和修复。
12. LP08/LP09 引导与检查使用不同世界状态，已完成地图/支撑不倒退。
13. LP10 guided 和 check 是不同 session；guided 完成后 Chapter 5 可解锁，check 不让咚咚重新过桥。
14. LP10 刷新恢复保存 bridgeBuilt、角色终点、signalAnchorCount、checkDeferred。
15. repeated repair/strong/assisted/modeled/长等待/疲劳会延期同 session 检查并保留故事结果。
16. modeled success 不进入 child correct、firstTry、touch/MIDI/mic inputRoutes、stable 或 retained。
17. stable skill key 带 register，不能与 C4-G4 证据合并。
18. 同 session、同日期、少于 8 小时、普通重玩、direct/debug 都不能授予 retained；显式教师/审计 direct mode 对正式历史零写入。
19. MIDI 错误八度、note-off 去抖和外接琴双音风险有自动/人工证据。
20. microphone confirmed/uncertain/noisy/octave-ambiguous/speaker-bleed 状态分开；uncertain 不算 wrong。
21. 教学音起音后 540ms 音频优先、声音关闭和音量上限通过。
22. 三种 iPad 横屏、较小视口、无文字、减色、减少动态、声音关闭均无重叠和横向溢出。
23. 运行引用对未批准 `concepts/**`、`audio/**` 和生成视频音轨为 0。
24. 家长端区分低音区玩过、低音键位稳定、低音谱位稳定、左手提示过和今天需要提示。
25. LP01-LP10 的普通孩子表面、可见属性和非角色 ARIA 只使用字母音名；唱名只出现在角色对话，隐藏任务不通过任何身份字段泄题。
26. target/wrong-repair/modeled 声音事务在地图/刷新下不被绕过；只有 ended 才可推进洞纹、early-rest 或 story completion。C4-01 引导 LP02 不写 stable，later reduced-cue session 才可建立低音 C 键位 stable。
27. LP01 泡泡和 LP02-LP10 琴键的 pointer 状态跨 DOM 重绘保持稳定身份；同控件重叠触控、页面外 `pointerup/pointercancel`、窗口失焦、纯 click、Enter/Space 和 VoiceOver 各自只有一次音频与一次提交。局部和页面级释放必须幂等，所有活动 pointer 结束后才能重新武装，且有界清除 click 抑制和 pressed 状态。

建议独立脚本：

- `check:low-register-ch4`
- `check:bass-staff-ch4`
- `check:chapter4-sessions`
- `check:chapter4-inputs`
- `check:chapter4-audio`

## 十一、人工和真机证据

自动化不能证明：

- iPad 扬声器上 C3/C4 是否清楚且没有额外响度线索；
- 两八度键盘在真实手指下是否仍易按、黑键是否误触；
- 原声钢琴麦克风能否稳定区分 C3/C4 和错误八度；
- 4-6 岁孩子是否理解高低而不是跟角色/石头大小猜；
- 孩子是否愿意尝试左手、是否需要成人摆手位；
- 低音谱表当前垫、黑键定位和咚咚动作是否争抢注意力；
- 幼儿钢琴教师是否认可低音谱位、音区顺序、左手措辞和稳定阈值。

第一轮方向性观察按 `docs/03` 的两个 observation session 执行，不把 LP01-LP10 一次做完。完整课程、实体 iPad、教师和 3-5 名儿童复测通过前，不得声称低音教学成熟。

## 十二、放行状态

- `passed`：本文件的 Chapter 4 音高、短课、故事、谱位、手部证据、输入和测试规格已锁定。
- `missing`：LP01-LP10 运行、双八度键盘、地图、状态机、浏览器截图与自动化。
- `missing`：真实 iPad、MIDI、原声钢琴麦克风、教师和儿童证据。

当前只能说“第四章运行规格完成”，不能说低音章、左手教学或 bass-staff 学习效果已实现或验证。
