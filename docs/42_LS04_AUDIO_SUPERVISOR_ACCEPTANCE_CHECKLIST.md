# LS04 音频主管独立验收表

状态：`independently_passed_offline_package / runtime_forbidden / human_and_ipad_listening_missing`

## 一、验收对象

本表只审查 LS04 的离线声音候选，不批准运行集成。允许对象限定为现有 `seed-sprout`、`correct`、`retry` 三类无答案音效，分别与 C4、D4 教学钢琴音形成可复现 A/B 审核材料。

本轮不得包含：角色语音、真实儿童或成人录音、视觉素材、视频、外部样本、生成服务输出、`assets/runtime` 复制或 `app.js/HTML/CSS` 修改。

## 二、来源和目录边界

| 检查项 | 通过条件 | 失败级别 |
| --- | --- | --- |
| 声音来源 | 三个 cue 继续来自项目已有的本地确定性 DSP 配方；无外部样本、无新生成服务调用 | P0 |
| 教学音来源 | C4/D4 使用同一已记录钢琴源、力度、包络、时长、混响和中央声像，仅基频不同 | P0 |
| 可复现性 | 脚本、参数、seed、输入哈希和输出哈希齐全；完整重跑可得到相同文件 | P1 |
| 审核协议版本 | review revision 进入 storage key 和导出记录；旧批次/旧标准的本地 verdict 不得自动带入新 A/B 标准 | P1 |
| 候选状态 | 只标记 `source_concept` 或 `runtime_candidate_unapproved`，且 `runtimeApproval=false` | P0 |
| 运行引用 | HTML/JS/CSS/Service Worker/manifest/runtime bundle 对本批次引用为 0 | P0 |
| 隐私 | 未创建、接收、上传、训练或克隆家庭录音；录音接收门禁保持 closed | P0 |

## 三、A/B 矩阵完整性

主管按 manifest 而不是文件名猜测确认矩阵：

- cue：`seed-sprout`、`correct`、`retry`；
- target：C4、D4；
- A：教学钢琴对照；
- B：同一教学钢琴与受保护 SFX 的混音；
- 每个 cue/target 组合都能单独播放 A、B，并能看到对应参数和哈希；
- 审核页禁止 autoplay，不得在打开页面时同时播放多个样本；
- C4 与 D4 的 A/B 除教学钢琴音高外使用相同混音规则，不能为某个答案单独加更亮、更长或不同方向的音效。

若实现采用共享 A 文件而不是重复导出，只要 manifest 能无歧义映射全部六个 cue/target 组合即可；不得为了凑文件数重复制造不同哈希。

## 四、教学音优先合同

| 时间区间 | 必须成立 |
| --- | --- |
| `t < 0` | 不提前改变任何即将播放的总线；没有为了制造泵动感而预先 duck |
| `0 <= t < 540 ms` | 教学 note bus 保持 unity；SFX 相对其正常电平至少降低 8 dB；钢琴起音清晰可辨 |
| `t >= 540 ms` | SFX 可平滑释放到正常候选电平，但不能产生突跳、二次起音或掩盖钢琴尾音 |
| cue 在 540 ms 前已结束 | 释放段标为 `not_applicable`；仍需证明整个存在区间保持保护电平，不能把“无释放段”误判成提前恢复或自动通过 |

主管需从波形/增益轨迹验证实际结果，而不只读取脚本中声明的常量。任何教学 note bus 被 duck、削顶、限幅变形或被 SFX 侧链误控均为 P0。

## 五、音高和答案暗示审查

自动频谱检查至少回答：

- cue 是否存在足够长、足够窄的稳定峰值，可被孩子误听成另一个钢琴音；
- 同一 cue 的 C4 版和 D4 版是否除了教学钢琴外还出现了不同的音效音高、速度、时长、亮度或声像；
- `correct` 是否因上扬音程形成固定的“更高就是正确”暗示；
- `retry` 是否因下坠、低频冲击或刺耳噪声形成惩罚感；
- `seed-sprout` 是否像目标音的第二次起音，造成孩子以为听到了两个音；
- SFX 尾音是否进入下一题的目标播放窗口。

自动检测只能给出风险筛查。没有耳机、普通扬声器和实体 iPad 扬声器人工听审时，最高状态只能是 `automated_screening_passed / perceptual_review_missing`。

## 六、响度和舒适度

每条候选需记录峰值、true peak、LUFS 或同等可复核指标，并检查：

- 不削顶；
- B 相比 A 不出现突然的大幅总响度跃升；
- `retry` 不比 `correct` 更响、更尖或更长；
- 连续四题播放时不会产生疲劳或让孩子只等音效、不听钢琴；
- 声音关闭和音量上限合同仍由运行层独立验证，本批离线候选不能声称已经通过真机舒适度。

发布前仍需在至少一台实体 iPad 的扬声器和耳机路由上按 `docs/38` 复测。桌面浏览器和自动响度值不能替代该证据。

## 七、故事与教学触发边界

候选只允许讨论以下未来触发点，不得自行写入运行事件：

| Cue | 可讨论的触发时刻 | 不得承担的教学职责 |
| --- | --- | --- |
| `seed-sprout` | 评分后植物短暂回应或关末永久变化 | 目标播放、答案提示、呼叫顺序提示 |
| `correct` | 正确评分已完成后 | 代替 C/Do、D/Re 身份连接，或提前告诉孩子正确 |
| `retry` | wrong-known 的孩子音和目标音比较结束后 | 覆盖孩子音/目标音、惩罚孩子、暗示下一题 |

三个 cue 都不能修改 callIndex、correctCount、stable、retained、completion 或自动推进。未来运行集成必须通过独立 `playMediaCue`/音频总线合同，教学状态机仍是唯一事实源。

## 八、审核页和自动化

主管至少独立验证：

1. manifest JSON 可解析，所有声明文件存在且 SHA-256 一致；
2. 生成器完整重跑和 verify-only 都通过，并明确没有网络调用；
3. 审核页列出全部 cue/target/A-B 组合，播放器数量与 manifest 一致，0 autoplay；
4. 键盘操作、暂停、切换 A/B 时不会叠播多个样本；筛选专项结束后恢复全部 pending，不留下自动化伪造的 pass/revise/reject；
5. 桌面和移动审查视口无横向溢出；
6. 运行引用和目录边界为 0；
7. `check:quick`、`check:bundle:strict` 继续通过；
8. 所有自动结论明确区分 `passed`、`partial`、`missing`、`contradicted`，不能把真机或听觉结论写成 passed。

## 九、立即退回条件

- 使用任何未核验生成服务、外部音频、真实录音或未授权上传；
- 教学钢琴总线被 duck，或起音 540 ms 内 SFX 未达到至少 8 dB 保护；
- C4/D4 使用不同 cue 参数、声像、包络或答案相关音效；
- cue 有稳定可辨音高，可能成为 C/D 的额外答案线索；
- `retry` 有明显惩罚性、惊吓性或比正确反馈更抢注意力；
- manifest、脚本、文件哈希或实际波形互相矛盾；
- 审核页 autoplay、叠播或把候选复制/引用到 runtime；
- 自动化或旧 localStorage 把未进行人耳复核的项目显示为“通过候选”；
- 仅凭自动指标宣称 iPad、儿童舒适度或发布声音已通过。

## 十、最终裁决

- `audio_review_package_passed_runtime_forbidden`：来源、矩阵、ducking、哈希、边界和自动筛查通过；仍需人工/iPad 听审，不能运行集成。
- `partial`：材料可继续讨论，但缺少非 P0 的验证或人工听审。
- `rejected_audio_candidate`：存在遮盖、稳定音高、惩罚感、来源或边界问题。
- `contradicted`：manifest/文档声明与实际媒体或运行引用不一致。

即使离线包通过，原型也必须另交事件映射、总线优先级、声音关闭、减少动态、打断恢复和实体 iPad 证据，主管才会考虑一次单独的运行集成工作单。
