# Chapter 4 Low-Register Runtime Contract

状态：`specification_passed / LP01_LP03_and_C4_R01A_browser_runtime_passed_at_347a / LP04_and_C4_R01B_browser_lifecycle_supervisor_accepted_uncommitted / LP05_LP10_runtime_incomplete / device_teacher_child_evidence_missing`

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

1. 森芽星是当前可呼吸生态星球的正式名称。星芽仍在森芽星的可呼吸花园和地下生态层活动，保持角色本体、三颗头芽、探索背带和星星背包，不无头盔返回月面真空。
2. 咚咚来自鸣石星的星岩家园，目前暂时守护森芽星地下回声洞里的共鸣石前哨。第一季不会前往鸣石星；当前洞穴不是咚咚的出生地，`咚咚的低音星球` 也不是鸣石星的正式名称。
3. 咚咚是原创圆扇形连续颈盾、四足低姿、鼻角一只、眉角两只、完整尾巴和宽脚掌的低重心角色；不能漂移成带额外颈盾尖刺/王冠齿的通用三角龙贴画、长期双足吉祥物，也不能用笨拙、怪兽化动作制造笑点。
4. 咚咚按“声音 -> 被建筑遮挡的宽低剪影 -> 眼睛/颈盾局部 -> 三枚脚印 -> LP05 完整出现”的顺序揭晓，不能在 LP01 自动播放完整角色成片。
5. 低音的视觉重量只营造氛围，不得通过更暗颜色、更大石头、左侧位置或角色动作提前给出答案。
6. LP05 的教学音、三枚脚印和世界变化全部结束后，未来实现才可让咚咚说 `我从鸣石星来。`；这句非教学台词不触发下一关，不创建鸣石星地图目标，也不写 played、stable 或 retained。

## 三、正式短课与自然停点

| Bundle | 运行内容 | 有意义输入预算 | 永久故事结果 | 自然停点/恢复 |
| --- | --- | --- | --- | --- |
| `C4-01` | `LP01 -> LP02` | LP01 两次不计分模型 + 最多 4 次高低首答；LP02 1-2 次低 C 找家 | 每 1-2 次真实已解决比较增加中性洞纹；顺利时四题点亮洞口，困难时星芽可帮助打开故事入口但不能补造未呈现题；LP02 让第一块地基落下 | LP01 吃力时停在发光洞口并写 partial/needsPractice；下次先重听一组不计分 C4/C3 模型，再续 LP02，不重播整组四次比较，后续 opening review 再取回高低比较 |
| `C4-02` | `LP03` | 3 次路线输入：C 唤醒/锁紧既有锚石，D、E 各落下一块；状态顺利时可加 3 个地基接缝检查 | LP02 的 C 锚石保持原位，D、E 加入后形成永久三石地基路 | 接缝检查延期时直接在已完成的地基路休息 |
| `C4-03` | `LP04` | 3 个低音下降输入 | 回声光到达洞底，局部剪影出现 | 剪影保持可见，不自动进入脚印关 |
| `C4-04` | `LP05` | 3 个 E-F-G 脚印 + 状态合适时最多 3 次已教近邻比较 | E 唤醒浅起点，F/G 补回后两枚；比较完成或诚实延期后，咚咚只在故事单元末完整出现并成为朋友 | 咚咚在最后脚印旁坐下；不为强制可选比较扣住故事奖励 |
| `C4-05` | `LP06` | 3 个依次按下并真实松开的 `C3-G3-C3` 单音；允许同指移动 | 第一个 C 松楔、G 滚石、最后 C 让大拱石永久落座 | 不追加稳定检查；咚咚坐在石旁望向 LP07 脚印，自然休息 |
| `C4-06` | `LP07` | 5 个正确且真实松开的熟悉低音 `C3-D3-E3-D3-C3`；右手、单指、触屏、MIDI 或麦克风路线均可推进故事 | 每次合格 release 永久点亮一枚脚印；第五枚让咚咚与孩子组成小队并指向 LP08 | 写 `handPrompted=left`，默认 `actualHand=unknown`；不判断手型或技巧；自然休息，不自动开始 LP08 |
| `C4-07` | `LP08` | 3 个逐一呈现的 C-D-E 引导循环；状态顺利时再以非 C-D-E 顺序各检查一次 | C 第二间、D 第三线、E 第三间永久亮成一小节地下轨道；检查只锁紧三个现有接缝 | 强帮助、长等待或疲劳后保留地图并延期检查；只写 C3-E3 子集 played/逐音观察，不写完整 bass-staff stable；自然休息，不自动开始 LP09 |
| `C4-08` | `LP09` | E 复用既有第三间家并放下折叠支架，F 第四线/G 第四间各装一根新支架；状态顺利时再以非 E-F-G 顺序各检查一次 | 三根支架永久锁紧；检查只让压力光通过现有支架 | 强帮助、长等待或疲劳后保留支架并延期检查；只写 E3-G3 子集 played/逐音观察，不写完整 bass-staff stable；自然休息，不自动开始 LP10 |
| `C4-09A` | `LP10` guided | 6 个真实 release 的 C-D-E-F-G-E 谱桥输入；疲劳/帮助后可在首个 E 保存 3/6 | 六个落脚信号接通，咚咚永久到达信号塔，星芽在花园中继台回答 | guided/assisted/modeled 故事完成可解锁 Chapter 5；仅 clean formal phase tail 可显示一次约 2.3s 无按钮轻量结算；不自动开始检查 |
| `C4-09B` | later scheduler-selected `LP10` check | 独立 session 的 6 个同音序少提示输入 | 原桥上的六个信号锚依次点亮；桥、咚咚、星芽和章节结算不重播 | 只测当前 bass-staff stable；不是强制地图节点，不阻挡 Chapter 5，不授予 retained，完成后回唯一当前故事任务 |

`C4-09A/B` 是同一 `C4-09` 故事 bundle 的故事阶段与以后调度的复习阶段，不是两个新的课程 level id。A 完成即写 storyComplete/phaseComplete 并允许课程导演进入 Chapter 5；B 以 deferred review action 存在，不得让“最早未完成 bundle”逻辑把它误判成孩子的强制下一地图节点。恢复状态必须保存 crossingStepIndex、bridgeBuilt、dongdongAtSignalTower、storySignalSent、xingyaSignalReceived、signalAnchorCount、checkDeferred、milestoneShown 和 nextStoryTarget；刷新不能把角色送回桥头、重播结算或创建 B session。

LP05 完整揭晓是场景内故事结果，不是 phase settlement；`C4-04` 的 `settlementEligibility=none`。只有 `C4-09A / LP10 guided` 是第四章 phase tail，且仍受 clean formal 条件约束。

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

- LP02 已永久放下 C 锚石。LP03 固定为 `C3-D3-E3`：先用 C3 唤醒/锁紧该锚石，再用 D3、E3 放下两块新石；不能把 C 重新悬起或再次落下。可选检查只点亮门-C、C-D、D-E 三个既有接缝，不移动任何石头。
- LP04 固定为低音下降 `E3-D3-C3`。目标音播放前不亮答案键；错误后先说孩子音，再重放目标和当前方向。
- LP05 固定先教 `E3-F3-G3` 三个家：E 唤醒浅起点，F/G 补回后两枚；状态合适时才做同一近邻集合的最多三次短比较。比较完成或因帮助、等待、疲劳而诚实延期后，故事单元才结束，完整咚咚只在此时出现一次；不得为强制可选比较扣住故事奖励。
- LP06 固定为 `C3-G3-C3` 三个依次按下并真实松开的单音；允许同一根手指重新定位，不要求保持 C、同时按、五指张开或连奏。三个动作分别松楔、滚石、落座，只记录路线 played，不授予独立 G 家、完整 C3-G3 稳定、手型、指法、左手或跨度能力。
- LP07 固定为五个依次按下并真实松开的熟悉音 `C3-D3-E3-D3-C3`。每个合格 release 只新增一枚永久脚印；暂停、刷新、repair 和后续 wrong 不得熄灭或重复盖章。第五枚形成小队并指向 LP08，随后自然休息，不自动开下一课。
- LP07 开始时写 `handPrompted=left`，默认 `actualHand=unknown`。touch/MIDI/mic 的 note event 不得推断或改写真实用手；只有成人现场观察可另写可选 `adultConfirmedHandUse`，且它不参与 stable、retained、手型、指法或技巧判断。
- 使用右手、同一根手指重新定位或屏幕琴键不是错误，不减少脚印和故事奖励。wrong note 不推进，只显示当前 C/D/E 的音名字母与准确黑键定位；wrong octave 写 `noteNameCorrect=true/registerCorrect=false` 并提示“名字对，低音家不同”。

### LP08-LP10 低音谱表

- LP08 使用一小节宽、五条固定粗线且间距适合 iPad 的低音谱表。引导按 `C3-D3-E3` 逐一建立第二间、第三线、第三间：一次只显示一个当前音符和脚印，未来 C/D/E 答案不得同时铺开。普通界面显示当前字母和一个准确键位定位，当前脚印落位时可播放一次目标低音钢琴声；角色对话可说唱名。
- LP08 引导后只有在没有 repeated repair、strong/assisted/modeled、长等待或疲劳时，才可在同一 session 追加三点 light check。检查由 session seed 从 C/D/E 的非升序全排列中确定，三个音各一次；作答前不得出现答案字母、唱名、目标声音、目标键光、目标颜色或未来位置。当前无字母谱位与固定真实键盘必须保留。
- LP08 引导每个合格 release 永久锁定一个谱位家；check 只锁紧现有 railJoint，不重新生成谱位。暂停、刷新、wrong、延期和 later review 都不得清空或重复计数。三个家完成后 LP09 可以保持提示继续，但本课自然休息且不自动启动 LP09。
- LP08 guided/assisted/modeled 只写 `bass-staff:C3-E3 played`、cueStrength、route 和 needsPractice；light check 保存每音 firstResponseCorrect、target/actual/register、wrongCount 和 cueStrength。它不写完整 `bass-staff:C3-G3 stable` 或 retained；该能力仍只可能在 LP09 已教 F/G 后由 LP10 later check 形成。
- LP08 核心作答为触屏，精确 MIDI 可选；麦克风不作为谱位作答或 LP08 证据路线。wrong note 先保留孩子真实音的结束，再显示孩子音名字母、当前目标谱位/字母和准确键位；wrong octave 写 `noteNameCorrect=true/registerCorrect=false` 并提示“名字对，低音家不同”。
- LP09 必须继承 LP08 的 C/D/E staffHome、railJoint 和 E 第三间。引导按 `E3-F3-G3`：E 只放下既有家下方的折叠支架，不重建 E 家；F 第四线和 G 第四间各建立一个新 staffHome 并安装一根新支架。一次只有当前音符/支架具有教学权重，已有地图保持低强调但不消失。
- LP09 guided 可为当前 E/F/G 显示音名字母、播放一次目标低音钢琴声并给一个准确定位：E=两黑右，F=三黑左第一个白键，G=同组三黑第一与第二个黑键之间。角色对话可说 Mi/Fa/Sol；机械锁紧声必须在教学音结束后播放且无稳定教学音高。
- LP09 只有在没有 repeated repair、strong/assisted/modeled、长等待或疲劳时，才可追加三点 light pressure check。检查由 session seed 从 E/F/G 的非升序全排列中确定，三个音各一次；作答前只保留当前无字母谱位、pressurePoint 和固定真实键盘，不得出现答案字母、唱名、目标声音、目标颜色、目标键光或未来答案。
- LP09 引导每个合格 release 只改变一个持久对象：supportCount 1/2/3；pressure check 只增加 pressureJointCount 1/2/3，不重建 staffHome/support。暂停、刷新、wrong、延期和 later review 都不得清空、重复或让桥重新摇晃。三个支架完成后自然休息，不自动启动 LP10。
- LP09 guided/assisted/modeled 只写 `bass-staff:E3-G3 played`、cueStrength、route 和 needsPractice；light check 保存每音 firstResponseCorrect、target/actual/register、confusionPair、wrongCount 和 cueStrength。它不写完整 `bass-staff:C3-G3 stable` 或 retained。
- LP09 核心作答为触屏，精确 MIDI 可选；麦克风不作为谱位作答或 LP09 证据路线。E/F wrong repair 必须比较第三间/第四线和两黑右/三黑左；F/G repair 比较第四线/第四间和三黑左/第一第二黑键之间，不得只写“G 在两个黑键之间”。wrong octave 继续写 name-correct/register-wrong。
- LP10 guided 和 later check 都固定为六个真实 release 的 `C3-D3-E3-F3-G3-E3`，自由时间、不考节奏。guided 一次只显示当前谱位，可给当前音名字母和准确键位定位，并可保留一个孩子视角左手邀请；右手、同指、触屏或精确 MIDI 都能完成，音高不能证明真实用手。每个正确 release 只增 crossingStepIndex 并在孩子音结束后移动咚咚；未来谱位不得以答案权重预亮。
- LP10 guided 可在 crossingStepIndex=3 的首个 E 中途平台安全休息。续玩只执行 F-G-E，保留前三步、角色位置和同一故事 bundle 关联；不得重放 C-D-E 或把跨 session 续完回填为 clean first-run/stable。最终 E 后写 bridgeBuilt=true、dongdongAtSignalTower=true、storySignalSent=true、xingyaSignalReceived=true、Chapter 5 unlocked=true。
- LP10 guided clean formal completion 是 C4-09 phase tail，按 `docs/52` 只显示一次约 2.3 秒、无按钮、无成绩、不中断琴键安全区的轻量结算；assisted/modeled/partial/early-rest/replay/direct/debug 不结算，但故事完成仍可解锁 Chapter 5。结算后主页唯一当前任务为 `TH01 两个 C 说你好`，随后为 `TH02 G 回声接力`；只有孩子再次点击才创建新 session。
- LP10 later check 只能由 scheduler 在以后明确选择并创建新 session；不得紧跟 guided 自动开始、不得作为 C4-09 未完成故事节点阻挡 Chapter 5。六次作答前只显示当前无字母低音谱位、真实键盘和中性 signalAnchor；不得出现答案字母、唱名、目标声音、颜色、目标键光、未来答案或咚咚移动。每个 correct 只增 signalAnchorCount，结束不重播 crossing、Xingya 回答或 milestone。
- LP10 guided/assisted/modeled 写 `bass-staff:C3-G3 played`、crossing evidence、cueStrength 和 needsPractice，不写 stable。later check 只有六个音正确八度、总 wrongCount<=2 且整次无 strong/assisted/modeled/visual target-key answer 时才写 `bass-staff:C3-G3 stable`；不得同时回填 `low-key:C3-G3 stable`、真实左手或 retained。retained 仍只来自符合 `docs/31` 的更后 opening review。
- LP10 每个 session 的六个预算单位是目标/世界进度槽位，不是孩子所有尝试的硬上限。wrong、replay 和 repair 分开记录，不占目标槽位，也不能因计数到顶而阻断故事；later check 的 `wrongCount<=2` 只决定 stable 资格。
- LP10 核心作答为触屏，精确 MIDI 可选；麦克风不作为谱位 check 或 stable 路线。wrong 时孩子音先完整结束，再出现当前目标音名字母、谱位和准确键位；wrong octave 写 name-correct/register-wrong。桥不坍塌，咚咚停在最近完成步，repair 后可继续但 later check 的 cue 使用必须如实阻断 stable。
- wrong octave 必须记录 noteNameCorrect=true、registerCorrect=false，并提示低音家；不能计 bass staff correct。

## 六、played、stable、retained 与手部证据

| 技能 | Played | Stable | 禁止结论 |
| --- | --- | --- | --- |
| 高低 C 比较 | 四次调用均真实呈现并解决后才写 played；assisted/modeled 可写 played + needsPractice。若为保护孩子提前收短，只写 storyResolvedBySupport + partial/needsPractice，不写 played | 同一 session 至少 3/4 个第一次完整泡泡选择正确；最多一次孩子整题重听；无候选预听、strong、modeled、visual-assist、实验输入、跨 session 拼接或错后回填 | “绝对音感”“低音天赋”；把未呈现调用或修对结果回填为首答正确 |
| 低音 C 家 | 引导中触屏找到 C3，或精确 MIDI C3 写 played；confirmed 麦克风只能写 experimental assisted story progress | later reduced-cue 的触屏首答找到正确低音 C；无 strong/modeled/visual/mic，且 MIDI/麦克风不在首版建立 stable | C4 同名按对算低音正确；用 LP02 成功删除或回填 LP01 needsPractice |
| 低音 C3-G3 键位 | 完成相关引导路线 | 当前没有可调度的合格动作；在教师复核并明确派发独立 opening review 前保持 missing | LP05-LP10、LP06 远跳或现有 C4-R01 被当成完整键位 stable |
| 左手邀请 | LP07 写 `handPrompted=left` 并完成熟悉路线；默认 `actualHand=unknown` | 仅成人现场观察可写可选 `adultConfirmedHandUse`，但它不产生 stable/retained | 仅凭低音音高、触屏、MIDI 或麦克风声称真实用手、手型、指法或左手技术掌握 |
| 低音谱位 | LP08 写 C3-E3 子集 played，LP09 补 E3-G3 子集 played，LP10 guided 完成整桥 played | 只有 LP09 已教完 F/G 后的 LP10 later signal check 才可按最多 2 次 wrong、无 strong glow、所有音正确八度写完整 `bass-staff:C3-G3 stable` | LP08 三点检查、故事过桥、麦克风音高或错八度同名音等于完整谱位稳定 |

stable 事件使用 register-qualified skill key，例如 `low-key:C3-G3`、`bass-staff:C3-G3`。不能与高音 `C4-G4` 的证据合并成 letter-only key。

`low-key:C3-G3 stable` 当前没有可调度的合格动作。现有 C4-R01 只覆盖高低 C 比较或低音 C 找家，LP10 later check 只覆盖 `bass-staff:C3-G3 stable`；在教师复核并明确派发独立 opening review 前保持 missing，不得用已写阈值伪装成已完成调度规格。

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

- LP01 不使用麦克风作为计分输入；让孩子弹一个 C 来回答会提前混入 LP02 的键位任务。实验麦克风路线从 LP02-LP07 开始。
- 仅家长设置明确开启；不在孩子首次进章时弹权限。
- MVP 本地处理，不上传、不保存原始家庭录音。
- 可实验性推动 LP02-LP06 sequential assisted story progress。LP07 麦克风只形成 experimental assisted story progress，始终写 `actualHand=unknown`，不能证明 hand use、bass-staff reading、stable 或 retained。
- LP07 只有在本地教学事务结束后，确认音稳定且随后检测到音结束或静音后才允许 rearm；同一持续音不能盖出第二枚脚印。uncertain/noisy/bleed/octave-ambiguous 仍不算 wrong，也不能推进。
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
- LP08 固定为一个宽的一小节谱窗，左端低音谱号和五线全程稳定；一次只有当前 C/D/E 音符获得教学权重。咚咚待在谱表外侧，不遮线、间、谱号、音符或琴键；轨道末端两个无字支撑空位不能烘焙 F/G 答案。
- LP09 复用同一稳定谱窗。进入时 E 第三间已亮，E 折叠支架与两个中性空位可以可见，但 F/G 的线间位置、字母和颜色答案在轮到当前目标前不能烘焙或预亮；支架和压力效果不得遮住第四线、第四间或键盘。
- LP10 使用一到两个小节长的同一低音谱桥，信号塔和花园中继台终点首屏可辨。guided/check 都一次只强调当前音符；咚咚移动、颈盾反光、信号束、星芽回应和轻量结算都不得遮五线、谱号、当前音符或键盘。later check 中咚咚固定在塔边，未来信号锚中性且无音高答案。
- 左手图标只在 LP07/后续手任务出现；不在低音初识时提前给出“低音等于左手”的误解。LP07 使用琴键旁、从孩子视角看的标准左手图标；角色朝向可能产生镜像，因此咚咚的某只前爪不得成为唯一左右提示。
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
8. LP06 三个输入严格为真实 release 分开的 `C3-G3-C3`；C/G 当前定位、错八度、逐步松楔/滚石/落座和刷新不倒退正确；不写独立 G、完整 C3-G3、手型、指法、左手、连奏或跨度 stable/mastery，也不自动开始 LP07。
9. LP07 五个真实 release 按 `C3-D3-E3-D3-C3` 各生成一枚持久脚印，暂停/刷新/repair 不倒退或重复；右手、单指、touch/MIDI/mic 不算手部错误；`handPrompted=left`、`actualHand=unknown` 与可选 `adultConfirmedHandUse` 分开，音高不伪造手部证据，也不写手型、指法、技巧 stable/retained；第五枚后自然休息且不自动开始 LP08。
10. LP08 只按 C3 第二间、D3 第三线、E3 第三间逐一引导；未来答案不同时出现。每个合格 release 永久建一个 staffHome；可选 check 使用含 C/D/E 各一次且不等于 C-D-E 的可复现排列，只增 railJoint。触屏与精确 MIDI 八度正确，麦克风不评分；引导/检查提示、延期、刷新和证据边界符合本节，LP08 不写完整 bass-staff stable/retained。
11. wrong octave 在 LP08-LP10 不计正确，但得到“名字对、低音家不同”的温和修复。
12. LP08/LP09 引导与检查使用不同世界状态，已完成地图/支撑不倒退；LP08 检查前不存在答案字母、唱名、目标声音、目标键光、目标颜色或三个未来答案垫；LP09 继承 E 家，E 只放下折叠支架，F/G 才新增谱位，check 使用含 E/F/G 各一次且不等于 E-F-G 的可复现排列并只增 pressureJoint。两课都不让角色或道具遮谱表教学对象，不写完整 bass-staff stable/retained。
13. LP10 guided 和 check 是不同 session；guided 的六个 release、3/6 安全休息/续玩、任意手有效、逐步移动、音频先后和最终四个世界字段正确。guided/assisted/modeled story completion 解锁 Chapter 5；只有 clean formal phase tail 单次结算，check 不自动开始、不成为强制地图节点、不让咚咚重新过桥、不重播星芽回应/结算。
14. LP10 刷新/根地址/地图恢复保存 crossingStepIndex、bridgeBuilt、dongdongAtSignalTower、storySignalSent、xingyaSignalReceived、signalAnchorCount、checkDeferred、milestoneShown 和 nextStoryTarget；任何恢复都不倒退、重复结算或静默创建 session。
15. repeated repair/strong/assisted/modeled/长等待/疲劳会延期同 session 检查并保留故事结果。
16. modeled success 不进入 child correct、firstTry、touch/MIDI/mic inputRoutes、stable 或 retained。
17. stable skill key 带 register，不能与 C4-G4 证据合并。
18. LP10 later check 最多 2 wrong、正确八度且无 strong/assisted/modeled/visual target-key answer 才写 bass-staff stable；不交叉授予 low-key stable、真实左手或 retained。同 session、同日期、少于 8 小时、普通重玩、direct/debug 都不能授予 retained；显式教师/审计 direct mode 对正式历史零写入。
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
- `passed_browser_lp01_lp03_and_r01a`：`LP01-LP03` 的高低 C、低音 C 家、`C3-D3-E3` 地基路线、连续双八度键盘、地图、自然停点、错误修复、教学音生命周期、诚实阶段证据与隔离 opening-review 调度核心已进入获批 `overhaul-347a-c4-r01a` / `af9aa28` 浏览器基线。
- `passed_browser_lp04_and_C4_R01B_uncommitted`：冻结观察基线 359a `app.js` SHA-256 为 `5AB01914C5B2AFA0E17838AAB59C2E0CAC5D8A4CA8E0956A23F382A4818AE566`；它继承 358a 已通过的 LP04 main `27/27`、input `8/8`、audio `11/11`、R01B lifecycle `31/31`、foundation `20/20` 和主管 retained 对抗探针 `9/9`，只增加主页内部滚动归零。当前未批准浏览器/PWA 体验候选 369a（`overhaul-369a-staff-notation-geometry-correction`）`app.js` SHA-256 为 `197C588C32460159E6EED94CC3E3250D89756503CDEADDC6E620DA76E9DD9A96`；368b 是 S01 连续性/PWA 前序，367b 是恢复前序，366a 是教学核心前序。369a 仅验证高音谱表 C4-G4 可见几何；LP08+ 低音谱表仍未实现、未验证。369a 继续保持 Chapter 4 课程与证据边界，不能反向改写已批准 347a 基线，也不能替代或继承 359a 的观察身份。
- `next_gated_runtime_work`：当前 369a 只拥有浏览器/PWA 资格与高音谱表几何候选事实；368b 连续性前序、367b 恢复证据、366a 教学核心和 `359A` 47 文件观察冻结包继续分离。当前先做成人实体 iPad 声音预听，教师阶段 A 与外部视觉筛查可并行；首名方向观察必须等成人预听获主管接受。LP05 的四道实现前门禁仍是成人预听获主管接受、首名儿童无阻断 P0、教师阶段 B 无课程 P0 和主管明确窄派工。`LP05-LP10`、咚咚完整揭晓、左手和低音谱表不会自动解锁。
- `missing`：真实 iPad、MIDI、原声钢琴麦克风、教师和儿童证据。

当前只能说“第四章规格已覆盖 LP01-LP10，LP01-LP03 与 C4-R01A 已进入批准基线，LP04 与 R01B 浏览器生命周期在 359a 冻结观察基线及当前未批准 369a 体验候选中保持通过；369a 只验证高音谱表 C4-G4，`low-key:C3-G3 stable` 调度规格与 LP08+ 低音谱表运行实现仍 missing”，不能说完整低音章、左手教学或 bass-staff 学习效果已实现或验证。
