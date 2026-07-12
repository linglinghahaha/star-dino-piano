# Grok CLI Capability Probe

Status: `bounded_user_authorized_probe_complete / runtimeApproval=false / contradicted_local_instruction_read / no_further_shared_host_calls`.

Date: 2026-07-11. This report covers only the supervisor-approved, low-risk Grok probe. It does not approve runtime integration, character work, project-reference uploads, recordings, or code review.

## Plain-Language Result

The locally installed official Grok CLI can actually generate images and an image-to-video clip, save them locally, and accept one locally stored Grok-generated image as a visual reference. Those are capability facts, not an adoption decision.

It is **not** ready to make finished Star Dino Workshop assets. The current Administrator host automatically injected global instructions, skill lists, and MCP configuration; two calls also read the host `imagine` skill despite their prompt-level local-file limits. No project file or recording was observed as read, but this is a local-instruction boundary failure. The probe is closed: no further shared-host Grok call, including generic calls, is allowed without a separate Windows user/VM or a new supervisor decision.

All files in `concepts/grok-cli-probe/` are `capability_probe`, `motion_reference`, `muted_review_derivative`, or `rejected`. Every item has `runtimeApproval=false`.

## Scope And Boundaries

Allowed this round:

- Three new image calls: an empty two-world scene, a generic six-prop sheet, and a three-stage seed concept using only Grok's earlier seed image as reference.
- One text-only prompt-planning call and one image-to-video call using only that Grok seed image.
- Copying downloaded outputs into the candidate-only audit directory and checking their media metadata.

Not done:

- No project directory, source code, screenshots, docs, character references, M08 images, staff, keyboard, or lesson content was provided to Grok.
- No child/adult recording, TTS, cloning, audio upload, login, credential, web search, or subagent call was requested.
- No output was copied to `assets/runtime`, `audio/runtime-candidates`, or any running page.

## Tool Identity And Host Boundary

| Check | Evidence | Status |
| --- | --- | --- |
| Native CLI identity | `G:\新电脑E盘\ai_install\grok\bin\grok.exe`, `grok 0.2.93 (f00f96316d)`, Authenticode signer `X.AI LLC`; previously recorded SHA-256 `1e9393391a399275a1863f9f457e86c5d904b10b9cba987d0b81f8427fa625f2` | `passed` |
| Actual model | Session `chat_history.jsonl` records `model_id=grok-4.5`, `model_fingerprint=fp_a39489019fa99b6e` for every limited call | `passed` |
| Community `grok-dev` package | Community-built, not affiliated with xAI; rejected supply-chain candidate | `rejected` |
| Headless controls used | `--cwd` external empty directory, `--disable-web-search`, `--no-memory`, `--no-subagents`, bounded `--max-turns` | `passed` |
| Empty-directory codebase upload | The CLI reported no Git repository and codebase upload/manifest preparation failed; no project repository was present | `passed` for this probe only |
| Host isolation | Sessions auto-injected Administrator `Claude.md`, skills and MCPs. `GROK-IMG-02` and `GROK-IMG-03` also called `read_file` on `C:\Users\Administrator\.grok\skills\imagine\SKILL.md` despite their local-file constraints. No project file or recording read was observed. | `contradicted_local_instruction_read / no_project_file_observed / no_further_shared_host_calls` |
| Cost, usage, expiry URL | Not returned by this CLI session | `missing` |

The no-search, no-memory, no-subagent prompt restrictions were passed to the CLI, but the instruction read and inherited configuration prove this Administrator session is not an isolation boundary. This limited probe is closed.

## Actual Call Ledger

Working directory for every new call: `C:\Users\Administrator\grok-bounded-probe-20260711` (outside the project). All image/video calls used the official native CLI and the flags above. Exact prompts are preserved in [prompts.md](../concepts/grok-cli-probe/prompts.md).

| ID | Actual call | Result | Status |
| --- | --- | --- | --- |
| Existing seed reference | Earlier user-authorized Grok image, reused only as reference | 1024x1024 JPG; SHA-256 `8464A729965A337A33CCD3DFA18DE402503E0922E9F2835690E36CE9C40F1605` | `passed provenance input` |
| `GROK-IMG-01` | Text-to-image, empty two-world bridge scene | 1280x720 JPG downloaded | `capability_probe / composition_reference_only / rejected_project_visual_direction` |
| `GROK-IMG-02` | Text-to-image, exactly six generic construction props, transparent request | 1024x1024 JPG downloaded despite the CLI reporting `Max turns reached` | `rejected_prompt_compliance` |
| `GROK-IMG-03` | Image-reference test, using only the earlier Grok seed JPG | 1024x1024 JPG downloaded; CLI said `Reference accepted: yes` | `capability_probe / consistency_reference_only` |
| `GROK-TEXT-01` | Text-only prompt/safety-risk draft | Full assistant response is preserved in the audit directory; it reported `image_to_video` as directly available | `passed as preserved draft aid only` |
| `GROK-VID-01` | Image-to-video, only the earlier Grok seed JPG | 544x544 H.264 MP4 downloaded | `partial motion_reference_only` |

Counts: **3/3 image calls**, **1/1 text call**, **1/1 video call**. No retries or expanded calls remain authorized in this work order.

## Asset Results

| ID | Candidate copy | What actually happened | Audit result |
| --- | --- | --- | --- |
| `GROK-IMG-01` | `source-copies/grok-img-01-two-worlds-source.jpg` | Technically 16:9 with no visible UI, staff, keys, words, or characters. Its grey-purple soft light band does not match the selected fine starfield/vector bridge direction. | `capability_probe / composition_reference_only / rejected_project_visual_direction` |
| `GROK-IMG-02` | `source-copies/grok-img-02-space-props-source.jpg` | Six distinguishable requested object classes are present, but the delivered file is JPG with no alpha. It visibly includes `O2`, `Grow`, and a small valve label despite the no-text request. | `rejected`: no transparent PNG, embedded text, and no runtime use. |
| `GROK-IMG-03` | `source-copies/grok-img-03-seed-states-source.jpg` | Three left-to-right seed stages use a broadly consistent simplified seed silhouette; no embedded text or music answers visible. The listening glow is weak and all stages are baked into one raster. | `capability_probe / consistency_reference_only` |
| `GROK-VID-01` source | `source-copies/grok-vid-01-seed-leaf-source.mp4` | Actual image-to-video output; it starts with one leaf already present and grows to two leaves rather than opening the first leaf. It is opaque, 6.04 seconds rather than 2-4, and has AAC. | `capability fact passed / prompt compliance rejected / motion_reference_only / rejected_runtime` |
| `GROK-VID-01` review copy | `grok-vid-01-seed-leaf-muted-review.mp4` | Video-only derivative for visual review; no audio streams | `muted_review_derivative`, still not runtime media |

### Video Media Facts

- Source MP4: H.264, 544x544, 24fps, duration 6.041667 seconds.
- Source streams: H.264 video, AAC 48 kHz stereo audio, plus an MJPEG attached-picture stream.
- The generator said `Audio track: no`; independent `ffprobe` contradicts that statement. The AAC is nearly silent (`mean -82.5 dB`, `max -59.7 dB`) but remains source provenance only.
- The silent derivative maps only primary video (`-map 0:v:0 -an`) and has no audio stream. It is not an original download and may not enter any audio candidate directory.
- No video audio was used as Foley, voice, environment, UI feedback, or music.

## Hash And Review Index

- [manifest.json](../concepts/grok-cli-probe/manifest.json): source/copy paths, formats, sizes, hashes, classifications, and runtime flag.
- [prompts.md](../concepts/grok-cli-probe/prompts.md): exact user-authorized probe prompts and the text-only response summary.
- [audit.md](../concepts/grok-cli-probe/audit.md): visual review findings and known failures.
- [grok-text-01-response.txt](../concepts/grok-cli-probe/grok-text-01-response.txt): complete checked GROK-TEXT-01 assistant response only.
- [contact-sheet-images.jpg](../concepts/grok-cli-probe/contact-sheet-images.jpg): IMG-01/02/03 contact sheet.
- [grok-vid-01-contact-sheet.jpg](../concepts/grok-cli-probe/audit-frames/grok-vid-01-contact-sheet.jpg): start/middle/end video frames.

## What Grok Is Worth Using For

| Possible use | Evidence this round | Recommendation |
| --- | --- | --- |
| Generic environment direction | `GROK-IMG-01` produces a wide scene but misses the selected fine starfield/vector bridge direction | `rejected_project_visual_direction` |
| Generic prop ideation / counting | `GROK-IMG-02` reached six objects but failed alpha and no-text compliance | `partial`: useful for brainstorming, not final prop delivery |
| Same-object state exploration | `GROK-IMG-03` accepted a Grok-owned local reference and kept a broadly consistent seed | `capability_probe / consistency_reference_only` |
| Neutral motion exploration | `GROK-VID-01` is a genuine generated MP4 | `partial`: motion reference only; duration, audio and opaque composition fail app delivery gates |
| Prompt leakage review / shot lists | `GROK-TEXT-01` listed banned teaching-answer cues and safety risks | `passed as a draft aid`; teacher/supervisor still decide correctness |
| Contact-sheet character consistency review | Not called; project references remain forbidden | `missing / prohibited this round` |
| Asset manifest drafting | Not delegated to Grok; local audit created the manifest | `missing as Grok capability` |
| Prototype code or screenshot review | Explicitly forbidden in this probe | `prohibited` |
| Web / competitor / copyright search | Disabled and not called | `missing / prohibited`; never legal clearance |
| Child/adult voice, TTS, STT, cloning | No source material and no call | `prohibited` |

## Final Gate Status

- Official native image generation: `passed` as a capability fact.
- Local Grok-owned reference-image input: `passed`, but only for the one seed test.
- Actual image-to-video: `passed` as a capability fact.
- Transparent PNG delivery: `failed` for this test.
- Exact no-text compliance: `failed` for the prop sheet.
- 2-4 second silent video delivery: `failed` for this test; actual output is 6.04 seconds with an AAC stream.
- Shared-host future Grok calls: `prohibited` pending a separate Windows user/VM or a new supervisor decision.
- Mature App asset delivery: `missing`.
- Runtime integration: `prohibited`.
- Recording privacy gate: `closed`; no recordings were touched.
