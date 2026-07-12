# LS04 音频离线 A/B 听审

日期：2026-07-12  
范围：只审 Chapter 3 / LS04 可用的 `seed-sprout`、`correct`、`retry` 三个既有本地音效。所有文件仍是 `source_concept` 或 `runtime_candidate_unapproved`，`runtimeApproval=false`。

这是一份离线听审证据包，不是运行接入申请。它没有修改原型、课程音符、关卡规则、网页运行代码或运行素材目录；没有使用网络、生成服务、角色语音或任何家庭录音。

## 本次做了什么

每个 cue 都与两条只供审核的合成教学钢琴参考并播：

- C4：261.625565 Hz
- D4：293.664768 Hz

每个音高都有两种版本：

- A `a_no_duck`：故意不降低音效，用来听出钢琴可能被遮盖的压力情况。
- B `b_piano_priority`：教学钢琴不变；音效从琴音起音 `t=0` 后的前 540 ms 至少降低 8 dB。窗口结束后才在 140 ms 内恢复。

三个 cue 共 12 条审核混音。位置和完整 SHA-256 在 [`audio/audio-asset-manifest.json`](../audio/audio-asset-manifest.json)；可播放页面在 [`audio/review/index.html`](../audio/review/index.html)。它们均不得复制到 `assets/runtime`。

## 审核记录版本

本次审核协议是 `ls04-c4-d4-offline-ab / r1`。浏览器本地记录的 key 同时包含批次和协议版本：`starDinoAudioReview:<batch_id>:r1`。旧版只含批次的记录不会被本页面读取，因此旧 C4-only 标准下的 `pass`、`revise` 或 `reject` 不会污染当前 C4/D4 A/B 审核。

导出的 JSON 也会写入 `review_protocol_id` 和 `review_protocol_revision`。审核自动化仅在临时浏览器上下文内测试保存和筛选，截图前会删除旧 key 与当前 key，并确认三项都回到“未审核候选 / pending”。

## 数字合同结果

| Cue | 延迟 | 稳定周期性 | 源响度 / 峰值 | B 组前 540ms | 释放 | 自动状态 |
| --- | ---: | ---: | --- | --- | --- | --- |
| 种子发芽 | 210 ms | 0.1442 | -19.44 LUFS / -5.21 dBTP | -8.00 dB | 540.0208 ms 后开始 | `passed` |
| 正确 | 140 ms | 0.1792 | -24.25 LUFS / -5.80 dBTP | -8.00 dB | 540.0208 ms 后开始 | `passed` |
| 轻柔再试 | 120 ms | 0.2431 | -24.85 LUFS / -6.00 dBTP | -8.00 dB | cue 在保护窗内结束，无释放段 | `passed` |

每条 B 组审核的确定性增益记录还证明：

- `noteBus` 在 t=0 前和 t=0..540 ms 都是 `1.0`，没有被 duck。
- 所有 cue 起始都在 t=0 之后，因此 t=0 前不存在已播放的音效样本，也没有提前 duck 命令。
- 三个 cue 的 C4/D4 答案风险自动筛查均为 `pass_screening_only`：DSP 配方只用噪声和瞬态，没有 C4/D4 振荡器或钢琴回放。周期性低于 0.58 阈值，不构成稳定音高中心的自动证据。

这些是数字控制和文件分析结果，不能替代人耳判断“是否像答案音”。`correct` 与 `retry` 的配方、时长、频谱重心不同，自动记录只说明两者有可区分的声学设计；它不证明孩子听起来会觉得前者温和肯定、后者温和不羞辱。

## 人工听审清单

请按每个 cue 的 C4、D4 各试听 A 后 B，先只听钢琴参考，再听并播。记录在审核页的本地备注中。

| 要确认的事 | 目前状态 |
| --- | --- |
| B 组的 C4 和 D4 起音是否都比 A 组清楚 | `missing`：需人耳 |
| 音效是否会让人误以为 C 或 D 是答案 | `missing`：需教师/家长听审 |
| `correct` 是否轻短明亮、`retry` 是否柔和且不羞辱 | `missing`：需人耳 |
| 声音是否过尖、惊吓、或会抢走孩子注意力 | `missing`：需人耳 |
| 耳机、普通扬声器、实体 iPad Safari 的舒适度与遮盖情况 | `missing`：需真机 |
| 与真实 MIDI/实体琴键时序联动 | `missing`：需原型和真机 |

人工结论无论填为“通过候选”还是“需要调整”，都只用于下一轮审核；不会自动将任何文件升级为 runtime approved。

## 复现与核验

```powershell
& 'C:\Python313\python.exe' tools/generate_audio_concepts.py --verify-only
node tools/audio-review-page-audit.mjs
```

生成脚本为本地确定性 DSP。它会重建源 WAV、候选编码、C4/D4 参考与 LS04 审核混音，再以 manifest 的 SHA-256、格式、LS04 的 4 格混音矩阵、音高筛查和 duck 包络进行核验。审核页只读取 `audio/**` 审核文件；它不是运行页面。

## 结论

- 自动合同、编码、哈希、C4/D4 12 格 A/B 矩阵：`passed`。
- “没有稳定答案音”的自动筛查：`passed_screening_only`。
- 人工耳机/扬声器/iPad 听审、MIDI 联动、儿童观察：`missing`。
- 运行集成、角色语音、环境声、奖励动机：`missing / prohibited in this milestone`。
