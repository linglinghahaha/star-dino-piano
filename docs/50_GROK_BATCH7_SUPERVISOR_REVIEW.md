# Grok Batch 7 主管独立审查

状态：`independent_source_review_complete / runtime_not_approved / release_not_cleared`

产品：星龙工坊（Star Dino Workshop）
唯一项目路径：`G:\新电脑E盘\个人\大顺\钢琴\web_star_dino_workshop`
审查对象：`concepts/grok-cli-video-capture-2026-07-16-batch7`

本文件只裁决素材能否继续进入合成与人工评审，不批准任何运行集成。它不得被用作实体 iPad、儿童观察、版权清关或 App Store 发布证据。

## 一、事实结论

- Batch 7 共真实触发 `18` 次 `image_to_video`。
- 成功保存 `15` 条原始 MP4；`2` 次为 provider `503 Service Unavailable`；`1` 次工具已触发但无原件。
- 认证失败 `0`，额度失败 `0`。503 不得解释成账号过期或余额不足。
- 15 条原件均约 `6.041667s`、`736x400`、H.264、`24fps`，并含 Grok AAC 音轨和 attached MJPEG cover。
- 15 条审核副本均只保留主 H.264 时序视频，音轨数为 `0`，attached cover 已移除。
- 运行引用扫描为 `0`；`runtimeApproval=false`、`integrationAllowed=false`、`releaseCleared=false`。
- 所有原件均超过主线过场既定的 `2-5s` 合同。即使列为 preferred，也必须重新选段、裁切并经过真实界面合成审查，不能直接复制到 `assets/runtime`。

## 二、独立视觉裁决

### 可继续加工的环境源

以下 6 条只获 `preferred_source_only`，不是运行批准：

| 素材 | 可保留价值 | 使用限制 |
|---|---|---|
| `b7-c4-rock-breathe-03` | 中央和底部较干净的暖洞穴轻循环 | 只可作为 C4 中性背景候选；先裁到 2-5 秒并做六视口合成 |
| `b7-lp04-distant-footstep-environment-06` | 边缘植物变化，中央仍可读 | 画面没有证明“脚步”；只能叫洞穴边缘植物反应层 |
| `b7-c4-dust-pulse-07` | 无答案载体的克制洞穴循环 | 动态很弱，需确认不是无效重复素材 |
| `b7-garden-edge-loop-10` | 花园边缘稳定，中央留白充足 | 只证明花园背景方向，不证明空气检测或装备收纳 |
| `b7-garden-bell-edge-11` | 花朵与铃花边缘层清楚 | 需在真实叶片、对话框和键盘叠加后复核遮挡 |
| `b7-lp04-shadowless-depth-17` | 无角色的洞穴根须/边缘变化 | 只可作 LP04 前置环境层，不构成咚咚预告或角色镜头 |

### 仅保留为局部参考

以下 6 条为 `partial_source_only`：

| 素材 | 主要问题 |
|---|---|
| `b7-lp03-sideglow-layer-04` | 上方中央强光会抢占教学注意，不能作为中性底板 |
| `b7-lp03-ground-tremble-layer-05` | 中央粒子团容易像奖励或目标提示，且没有清楚表达地面震动 |
| `b7-moonbase-roof-softclay-12` | 建筑占满中央和下部；只能参考屋顶动作与材质 |
| `b7-moonbase-pressure-breathe-13` | 中央绿灯一度像按钮/减号 UI；只能参考机械节奏，不得作完整过场 |
| `b7-garden-sensor-mechanism-14` | 灰色工业舱与呼吸花园材质语言不一致，也没有教学安全区 |
| `b7-dual-habitat-connection-16` | 只显示单个花园建筑，中央发光入口像目标；没有证明“两处家园连接” |

### 明确拒绝

以下 3 条不得进入后续运行候选：

| 素材 | 拒绝原因 |
|---|---|
| `b7-lp03-warm-edge-response-09` | 中央持续出现明亮封闭轮廓，明显像目标环或答案载体 |
| `b7-starbridge-arrival-transition-15` | 风格和场景突然跳变，并出现星形收集物；不符合连续性与无奖励载体合同 |
| `b7-dongdong-three-horn-border-18` | 实际只使用洞穴图，没有咚咚身份参考；结果为中央大型长颈/背刺轮廓，不是准确三角龙，也挡教学区 |

`b7-dongdong-three-horn-border-18` 的恢复事实可信：原调用在纠偏到达前已经开始，原件从既有 Grok session 按字节恢复；不得事后覆盖参考图或声称使用了 `dongdong-model-sheet-v1.png`。

## 三、课程与界面边界

- 洞穴视频不得编码 C/D/E、音名、唱名、琴键、谱表、左右、高低、颜色或目标答案。
- 中央发光、粒子和建筑入口不能在孩子作答前出现；否则会从“故事反馈”变成额外提示，污染首答和 mastery 证据。
- 花园与月球素材不得改变星芽装备状态。户外仍是完整气密服；只有空气检测通过后才允许花园模式。
- Grok 原始 AAC 禁止进入运行包。教学钢琴音仍是声音主角，环境声和 Foley 必须走独立音频审核与 ducking 合同。
- 本批没有合格咚咚角色动画、空气检测/开盔/收纳动画、两处家园连接动画或完整飞船抵达过场。

## 四、后续调度

1. Batch 8 先使用 `dongdong-model-sheet-v1.png` 的确定性单角色裁切做一条身份探针；三只角、金黄色颈盾、玉绿色身体、四足和尾巴任何一项漂移都不得继续角色链。
2. 对 6 条 preferred 环境源先做 `2-5s` 无声裁切候选，再在真实 C3/C4 页面按六视口叠加键盘、教学区、角色和对话框。
3. partial 素材不能通过改名升级。只有重新合成后证明教学安全区、风格和故事语义成立，才可申请下一轮主管审查。
4. rejected 素材保留作失败证据，不删除、不重试同一 ID、不进入运行资产清单。
5. 当前不向原型任务下发任何 Batch 7 运行集成；原型继续优先修复教学钢琴真实 started/ended 生命周期。

## 五、仍缺的发布证据

- 素材生成服务条款、完整上游来源和外部相似性清关；
- 实体 iPad Safari、扬声器/耳机与减少动态模式审查；
- 教师审查和 3-5 名目标年龄儿童观察；
- 2-5 秒最终剪辑、真实 UI 合成、性能、内存与离线缓存验证；
- 角色动作连续性、设备输入、真实 MIDI 和原声钢琴麦克风验证。

因此 Batch 7 的最终结论是：`素材生产有效，运行批准为 0，发布批准为 0`。
