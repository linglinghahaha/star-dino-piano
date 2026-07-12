# 角色语音录音、隐私与授权模板

状态：模板；忽略规则安装和有效 Git 仓库中的 WAV/PDF 命中验证均为 `passed`，录音接收门禁仍为 `closed / not requested`。当前没有任何录音、授权文件或声音模型。

调度任务已在根 `.gitignore` 安装 `private-recordings/**` 和两个例外规则。2026-07-12 已确认有效 Git 工作树；`private-recordings/probe.wav` 与 `private-recordings/consent.pdf` 的 `git check-ignore -v --no-index` 都命中 `.gitignore:29 private-recordings/**`，而 `private-recordings/README.md` 保持未忽略。技术忽略验证已通过，但不授权接收：在用户明确提供文件、授权用途并由唯一负责人执行接收前，不得创建 `private-recordings/`，不得接收、复制、下载、处理或上传任何真实家庭录音及签署授权文件。

## 最小台词库

这些是录音批次的短句候选，不自动替换课程脚本。`课程确认` 为“待确认”的项目，必须由“课程故事、整体调度与独立审查”任务核对后才能录制最终版。

| Line ID | 角色 | 类别 | 候选台词 | 目标时长 | 表演方向 | 课程确认 |
| --- | --- | --- | --- | ---: | --- | --- |
| `XG-CALL-001` | 星芽 | 叫声 | “嗯？” | 0.4 秒 | 好奇、轻，不尖 | 待确认 |
| `XG-LISTEN-001` | 星芽 | 听音 | “先听一听。” | 0.9 秒 | 闭嘴听前的轻声邀请 | 待确认 |
| `XG-DIR-BLACK-001` | 星芽 | 指方向 | “看看两个黑键。” | 1.1 秒 | 指方向，不急 | 待确认；不能替代具体键位提示 |
| `XG-RETRY-001` | 星芽 | 轻柔再试 | “没关系，再听一次。” | 1.3 秒 | 平静，不叹气 | 待确认 |
| `XG-CORRECT-001` | 星芽 | 正确 | “对啦！” | 0.6 秒 | 小而明亮 | 待确认 |
| `XG-REST-001` | 星芽 | 休息 | “我们歇一会儿。” | 1.1 秒 | 放松、自然停下 | 待确认 |
| `XG-ARRIVE-001` | 星芽 | 章节过场 | “月亮到了。” | 0.9 秒 | 轻声惊喜 | 待确认 |
| `XG-AIRSAFE-001` | 星芽 | 章节过场 | “这里可以呼吸。” | 1.1 秒 | 安心，不像系统警报 | 待确认 |
| `DD-CALL-001` | 咚咚 | 画外叫声 | “咚……” | 0.7 秒 | 温暖、远处，不怪兽化 | 待确认 |
| `DD-LISTEN-001` | 咚咚 | 听音 | “听听低低的声音。” | 1.3 秒 | 稳、慢一点 | 待确认 |
| `DD-DIR-LOW-001` | 咚咚 | 指方向 | “再找下面那个家。” | 1.2 秒 | 鼓励，不把低音当颜色 | 待确认 |
| `DD-RETRY-001` | 咚咚 | 轻柔再试 | “慢慢来，再试一次。” | 1.3 秒 | 稳定、不失望 | 待确认 |
| `DD-CORRECT-001` | 咚咚 | 正确 | “稳稳的！” | 0.7 秒 | 自豪但不大声 | 待确认 |
| `DD-REST-001` | 咚咚 | 休息 | “歇一会儿，再出发。” | 1.3 秒 | 温暖、自然停下 | 待确认 |
| `DD-REVEAL-001` | 咚咚 | 揭晓 | “你好，我是咚咚。” | 1.2 秒 | 友好、第一次完整出现 | 待确认 |
| `DUO-MEET-001` | 双角色 | 最终会合 | “我们连起来啦！” | 1.1 秒 | 可分两轨录制，不要求同一房间 | 待确认 |

录音顺序优先：先录叫声、听音、再试、正确、休息各三次；课程确认后再录方向和章节台词。这样即使课程文案调整，也不会浪费整个批次。

## 私密目录规划（门禁通过前不得创建）

```text
private-recordings/
  README.md                    # 只说明规则，不放个人信息
  consent-private/             # 签署记录，不提交仓库
  xingya/raw/                  # 孩子原始 WAV
  dongdong/raw/                # 成人原始 WAV
  room-tone/                   # 房间底噪
  processed-private/           # 本地处理母版
  export-review-private/       # 家庭内部审核文件
```

调度任务已作为本轮根 `.gitignore` 的唯一写入负责人应用以下规则；动画音频支线只读该结果，不修改根文件：

```gitignore
# Private family voice recordings and consent records. Never commit.
private-recordings/**
!private-recordings/
!private-recordings/README.md
```

应用后必须检查：

```powershell
git check-ignore -v --no-index private-recordings/xingya/raw/test.wav
git check-ignore -v --no-index private-recordings/consent-private/test.pdf
```

两条命令都必须输出根 `.gitignore` 中的 `private-recordings/**` 命中规则才算 `passed`。2026-07-12 已在有效 Git 工作树中用 `--no-index` 验证 WAV/PDF 两条探针均命中 `.gitignore:29 private-recordings/**`；README 的 quiet 检查退出 1，保持未忽略可作为规则说明模板。忽略验证为 `passed`，录音接收仍 `closed / not requested`，不是自动接收授权。

## 录音批次记录

不要把填写后的真实姓名、签名、联系方式或孩子信息提交仓库。仓库台账只引用匿名授权编号。

| 字段 | 填写内容 |
| --- | --- |
| 批次 ID | 例如 `VOICE-BATCH-202607-01` |
| 角色 | 星芽 / 咚咚 |
| Speaker code | 例如 `SPK-X01`，不得使用姓名或生日 |
| Line IDs | 本次录制的固定台词列表 |
| 录音日期与地点 | 私密记录 |
| 设备与软件 | 麦克风、录音机、版本 |
| 原始格式 | 48 kHz/24-bit mono WAV |
| 房间底噪文件 | 私密相对路径 |
| Take 数量 | 每句至少 3 次 |
| 处理范围 | 降噪、剪辑、音高、共振峰、EQ、限制器 |
| 授权记录编号 | 例如 `CONSENT-202607-01` |
| 删除期限 | 具体日期或项目终止后多少天 |
| 录音者/监护人复听 | 通过 / 退回 |

## 固定台词授权模板

以下模板应离线填写和保存，不提交仓库。

```text
项目：星龙工坊
授权记录编号：
录音者匿名代码：
录音者是否未成年人：是 / 否
监护人与录音者关系：

授权的固定台词 Line IDs：
授权用途：仅用于星龙工坊角色的固定台词播放
允许发布的平台：
允许的地区和语言版本：
允许的编辑：剪辑、轻度降噪、轻度音高/共振峰、响度标准化
明确不允许：训练或微调声音模型、创建可复用 voice ID、公开样本、生成未列出的新句、广告画像或身份识别

原始录音保存位置：仅本地 private-recordings/
是否允许第三方上传：否
原始录音删除日期/条件：
处理母版删除日期/条件：
运行候选撤回流程：
联系与撤回方式：私密记录，不写入仓库

成人录音者确认：姓名/签名/日期（私密）
监护人确认：姓名/签名/日期（私密）
孩子现场意愿记录：愿意 / 暂停 / 不愿意（由成人如实记录）
```

## 声音克隆单独门禁

固定台词授权不等于声音克隆授权。若未来评估克隆，必须新建独立授权记录，逐项记录服务商、模型类型、训练用途、数据地区、保留期、删除证明、私有 voice ID、访问人员和撤回结果。未经用户再次明确同意，不上传样本、不创建模型、不试用服务。

## 处理与发布核对

| 检查 | 结果 |
| --- | --- |
| 调度已作为根 `.gitignore` 唯一写入负责人 | `passed` |
| 根 `.gitignore` 已包含三条 private-recordings 规则 | `passed` |
| 有效 Git 工作树 | `passed` |
| `git check-ignore -v --no-index` 验证原始 WAV 路径 | `passed`：`.gitignore:29 private-recordings/**` |
| `git check-ignore -v --no-index` 验证签署授权 PDF 路径 | `passed`：`.gitignore:29 private-recordings/**` |
| `private-recordings/README.md` quiet 检查 | `passed`：退出 1，保持未忽略 |
| 录音接收 | `closed / not requested`：等待用户明确文件、用途授权与唯一负责人接收 |
| 台词属于已确认 Line ID | 待录音时填写 |
| 文件名无真实姓名/生日/学校 | 待录音时填写 |
| 原始 WAV 只在 private-recordings | 待录音时填写 |
| 无云盘自动同步 | 待录音时填写 |
| 处理未拼接出新句 | 待录音时填写 |
| 星芽不尖锐，咚咚不怪兽化 | 待人工复听 |
| 语音不覆盖目标钢琴音 | 待 A/B 和真机复听 |
| 处理后候选有 LUFS、true peak、哈希 | 待生成 |
| 授权编号和删除期限存在 | 待录音时填写 |
| 没有声音模型、voice ID 或运行时上传 | 当前通过 |
