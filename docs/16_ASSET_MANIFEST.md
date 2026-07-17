# Asset Manifest

## Purpose

This is the release-readiness ledger for visual and audio assets. It is not a full legal review, but it prevents the project from drifting into untraceable generated art. `39_ASSET_ORIGINALITY_AND_SIMILARITY_REVIEW_PROTOCOL.md` owns the provenance package, protected-IP exclusion, independent similarity review and professional-release boundary that sit above this ledger.

Do not use `chrome-test` browser cache files as product assets. Product asset review starts with `assets/generated`, `assets/generated/raw`, formal screenshots, and any future sound files.

## Required Fields

Every release asset needs:

| Field | Meaning |
| --- | --- |
| Asset path | final file path used by the app |
| Type | character, background, story object, effect, sound, icon, UI |
| State or use | where and how it appears |
| Source | generated, hand-drawn, purchased, public domain, or custom code |
| Prompt/license note | generation prompt summary or license reference |
| Approval status | provisional, approved, replace, or retired |
| Screenshot proof | screenshot where the asset is visible in context |
| Final hash | SHA-256 of the exact runtime/release file |
| Similarity review | internal and external review status under `docs/39` |

## Runtime Note Palette

`overhaul-321a` uses the user-approved seven-color cycle below across white-key edge cues, letter labels, note glows, route pads, and generated feedback colors.

| Note | Runtime color | Visual role |
| --- | --- | --- |
| C / Do | `#CB84FA` | purple |
| D / Re | `#FB9608` | orange |
| E / Mi | `#62C60C` | green |
| F / Fa | `#CC338D` | magenta |
| G / Sol | `#6F8FFE` | blue |
| A / La | `#F78ACD` | pink, reserved/dimmed in the current course |
| B / Si | `#11D19E` | teal, reserved/dimmed in the current course |

Source and copyright boundary: the hues were sampled from a user-supplied third-party app screenshot as an internal color reference only. No third-party character, logo, wording, screen composition, or interaction asset is copied or shipped. Colors remain a secondary scaffold rather than an answer channel; `?audit=color-reduced` replaces the seven colors with one gray-blue cue and must still complete the route by note/key identity.

Evidence: `chrome-test/note-palette-check.mjs` verifies all seven runtime values, level-part synchronization, reserved A/B treatment, key-edge rendering, color-reduced removal, wrong-input behavior, and color-reduced FG04 completion. Screenshots: `screenshots/note_palette_latest_normal.png`, `screenshots/note_palette_latest_reduced.png`, and `screenshots/note_palette_latest_reduced_complete.png`.

## Audio Ledger Requirements

Audio assets need the same traceability as visual assets because they affect both learning accuracy and release rights.

Every release audio asset needs:

| Field | Meaning |
| --- | --- |
| Audio path or generator | final file path, synth engine, or sample pack |
| Type | piano note, correct effect, wrong effect, completion motif, UI tap, optional character cue |
| Musical role | whether it teaches pitch, confirms action, signals retry, or rewards completion |
| Source/license | original synthesis, recorded source, purchased license, public-domain source, or generated asset note |
| Pitch/quality check | for piano tones, the target note/frequency and verification result |
| Volume target | relative loudness so effects do not mask the piano pitch |
| Approval status | provisional, approved, replace, or retired |
| In-app proof | screen or interaction where the audio is triggered |

Release rule: correct/wrong effects and dino voice-like cues must never cover the piano pitch. If an audio asset is cute but makes the note harder to hear, replace it.

## Current Audio Inventory To Reconcile

The current prototype mostly uses WebAudio synthesis in `app.js`, not licensed sample files. That reduces third-party rights risk, but it still needs pitch, loudness, and child-comprehension proof before release.

| Audio source | Type | Current use | Current status | Needed before release |
| --- | --- | --- | --- | --- |
| `playPianoNote()` WebAudio partial synthesis | piano note generator | touch notes, listening prompt, melodic rewards | `320a` prototype runtime | C4-G4 source frequencies pass the A4=440 equal-temperament code audit within 0.1 cent; still needs device recording/listening proof and piano-likeness review |
| `playListeningPrompt()` | teaching pitch prompt | M03 touch-only listening seed | `320a` note-priority runtime | target stays hidden visually and the prompt now plays only the exact target piano frequency, with no bell/noise layer; still needs real-device audibility proof |
| `playCorrectSound()` | correct effect | correct input sparkle/audio confirmation | `320a` quieter effect bus | changed from target-related high notes to delayed filtered-noise sparkle, so it does not replay a pitched answer; child comfort still needs observation |
| `playWrongSound()` | wrong effect | gentle retry feedback | `320a` quieter effect bus | changed from a descending oscillator to short filtered-noise taps with no stable teaching pitch; softness still needs child/device listening proof |
| `playVictorySound()` | completion motif | level/staff completion | `320a` reward-only effect bus | motif remains C5-E5-G5-C6 but all four notes use the quieter effect bus; treat as reward, not note-identity evidence |
| `playBlackKeyTick()` | UI tap cue | black-key/tactile interaction feedback | `320a` quieter effect bus | changed from a 220 Hz oscillator to a short noise tick to reduce pitch-memory confusion |
| `starDinoAudioSettings` + parent controls | sound comfort/control | game sound on/off and 0-70% volume | `320a` prototype runtime | preferences persist locally; automated UI check passes, but actual iPad speaker loudness and headphone safety still require measurement |
| Future sampled piano pack or recorded notes | piano note assets | optional replacement for synthesis | not selected | require source/license, sample rate, loop/one-shot policy, and in-app pitch proof |

`320a` evidence: `tools/audio-contract-audit.mjs` passes `22/22` code-level frequency/mix rules, and `chrome-test/audio-settings-check.mjs` passes `13/13` sound-toggle, volume-cap, persistence, geometry, and console checks. This proves implementation contracts only. It does not prove perceived loudness, timbre quality, or child comfort on a real iPad.

Do not promote acoustic microphone play until confidence states and retry behavior are proven separately from these playback assets.

## Draft Performance Budget

Current generated assets are useful for exploration, but they are too heavy to treat as release-ready. Before release-level polish, use these draft budgets:

| Asset class | Draft budget | Notes |
| --- | --- | --- |
| App icon | under 512 KB for app/web delivery variants | keep a high-resolution source separately |
| Main backgrounds | under 800 KB each, prefer WebP/AVIF where supported | staff and moon scenes must stay crisp at iPad landscape size |
| Character poses | under 350 KB each for runtime files | keep transparent edges clean; source files can be larger |
| Story props | under 250 KB each | repeated props should be reused instead of duplicated |
| Effects | under 150 KB each | effects should be short-lived and not hide the music target |
| Initial startup asset group | under 8 MB total before compression cache | map, moon background, current dino states, core props |
| CSS delivery | no single release CSS file above 250 KB uncompressed without a cleanup decision | current override CSS is prototype debt, not release structure |

If a file exceeds the budget, mark it as `provisional` or `replace`, and record the reason in the ledger.

## Runtime Compression Pass

2026-07-09 `overhaul-277` created compressed runtime WebP assets in `assets/runtime`. The original PNG files in `assets/generated` remain the source/provisional art record.

Size result:

| Asset group | Count | Total size | Status |
| --- | --- | --- | --- |
| `assets/generated` including raw files | 50 | 72,290,490 bytes | source/provisional only |
| `assets/generated` top-level PNG files | 29 | 39,933,779 bytes | too heavy for runtime delivery |
| `assets/runtime/*` | 26 | 1,607,471 bytes | `overhaul-337c`; within the current startup image budget after adding the M08 flat workshop background and three-sprout pointing coach |
| root screenshot/contact-sheet files | 1,630 | 1,200,453,258 bytes | evidence/dev-only; never bundle |
| `chrome-test` non-script profile/cache files | 9 | 5,370,072 bytes | test cache only; never bundle |

Runtime proof:

| Screen | Screenshot proof | Notes |
| --- | --- | --- |
| `M03` listening seed | `screenshot_overhaul_277_M03_runtime_assets.png` | moon background, dino pose, and success badge resolve from `assets/runtime` |
| `S01` staff bridge | `screenshot_overhaul_277_S01_runtime_assets_fixed.png` | staff background and dino pose resolve from `assets/runtime`; five staff lines and current pad remain visible |

Current release-audit tooling: `release-bundle-policy.json` defines the publishable source set, deny patterns and asset budgets; `tools/production-bundle-audit.mjs` checks that publishable text references, including CSS, do not point at `assets/generated`, `chrome-test`, or screenshots. Prototype and strict policy modes pass at `overhaul-323a`; the remaining CSS risk is total selector debt across the four segmented override files, not a current per-file bundle failure.

Remaining release risk: none of the four segmented `quality-overrides*.css` files individually exceeds the current 250 KB uncompressed per-file gate, and strict bundle audit passes. The real debt is their combined roughly 779 KB of overlapping prototype CSS, which still needs consolidation before release-level maintainability can be claimed. Runtime image compression and the bundle audit reduce loading and packaging risk, but they do not remove that aggregate selector debt.

## Current Inventory To Reconcile

These assets exist and are used or likely used by the prototype. They are provisional until source/prompt/license notes and screenshot proof are filled.

Stage 1 concept-generation note: `concepts/generated-v2` is an approval workspace, not a runtime asset folder. Character, scene and prop candidates now exist and are recorded in `concepts/generated-v2/stage1-asset-record-template.md`; they still require separate runtime extraction, animation, compression and iPad review before any copy into `assets/runtime` or app code. The rejected `concepts/curriculum-v1` SVG/PNG files are archive-only structural wireframes and must not be used as public concept art, runtime assets, or image-generation style references.

Xingya species/equipment correction:

| Concept path | Type | State or use | Current status | Runtime rule |
| --- | --- | --- | --- | --- |
| `concepts/generated-v2/xingya-model-sheet-v1.png` | character source concept | helmet-free `星芽龙` body and expression master | selected source concept | do not use directly at runtime |
| `concepts/generated-v2/xingya-space-helmet-equipment-v1.png` | equipment source concept | early helmet-only mechanics | superseded | never implement as vacuum outfit |
| `concepts/generated-v2/xingya-space-exploration-suit-v2.png` | equipment source concept | early full-suit draft | superseded: tail exposed | never implement as exterior final |
| `concepts/generated-v2/xingya-space-exploration-suit-v3.png` | equipment source concept | selected exterior/habitat/garden modes | selected source concept | derive motion-ready assets separately |
| `concepts/generated-v2/ch01-moon-little-home-keyframe-v3.png` | scene source concept | moon outpost construction with complete sealed suit | selected source concept | background/character layers must be separated; exact UI stays code-rendered |
| `concepts/generated-v2/ch02-staff-star-bridge-keyframe-v3.png` | scene source concept | open-space staff bridge with complete sealed suit | selected source concept | five staff lines, notes and keyboard stay code-rendered |
| `concepts/generated-v2/ch03-atmosphere-check-transition-v1.png` | transition source concept | final state after sealed arrival, air check, opened helmet and packed outer suit | selected final-state concept only | not a complete shot or runtime layer pack; implement as automatic 2-4 second transition with no continue button or music cue only after neutral waiting/feedback/final layers exist and pass current safety zones |

`overhaul-323a` derives a six-pose complete-pressure-suit runtime set from `concepts/generated-v2/xingya-sealed-action-sheet-v1.png`. Exact prompt, generation id, reference paths, processing commands, hashes and manual review are recorded in `concepts/generated-v2/xingya-sealed-action-sheet-v1-record.md`. The previous five `assets/runtime/dino-*.webp` files are retired to `assets/generated/retired/helmet-only-runtime-322a/` and are no longer referenced or shipped by the active bundle.

Chapter 3 media boundary at `overhaul-334g`:

- the atmosphere-check keyframe above proves only the intended final story state;
- the neutral waiting pose, air-check feedback pose, helmet-open/outer-suit-packed final pose, transparent foreground/background separation and reduced-motion terminal frame are still `missing` as an approved runtime layer pack;
- `concepts/animatics/safety-zone-v2/` contains eight `source_clearance_candidate_unapproved` transparent candidates measured against frozen `326a`, not current `334g` or later layouts;
- Gemini Shot 01 and Shot 05 are rejected motion references because of airtight-tail-sleeve and character-consistency failures; their source AAC is provenance only and has `runtimeAudioAllowed=false`;
- no `concepts/**`, `audio/**` or technical preview file may be referenced by runtime until a selected minimum set is copied to `assets/runtime` and independently re-audited.

Grok CLI source-only video ledger at 2026-07-15:

- `concepts/grok-cli-video-capture-2026-07-14-batch2/`: 32 actual `image_to_video` calls, 31 raw MP4s and one missing original; 28 source-frame generations. The stronger retained directions are limited to the registered garden-edge/cave-glow and supervisor-selected roof/ecological-relay source references. All remain runtime-forbidden.
- `concepts/grok-cli-video-capture-2026-07-15-batch3/`: 24 actual video calls, 16 raw MP4s and eight missing P2 originals; 21 image-generation calls. `p1-garden-edge-loop-09` is the preferred Batch3 garden-edge motion direction only. C3 character transitions are rejected for Xingya identity/equipment continuity; LP02/LP03 foundation and workshop clips are rejected for egg/button semantics; echo, cave, roof, stow, completion and facility clips are partial references only.
- `concepts/grok-cli-video-capture-2026-07-15-batch3-recovery/`: two actual video calls from two already-generated authorized source frames, two raw MP4s and no missing original. `recovery-25` is a partial garden-edge motion source; `recovery-26` remains partial because round edge objects can read as badges or collectibles.
- `concepts/grok-cli-video-capture-2026-07-15-batch4/`: 12 orchestration attempts, 11 actual `image_to_video` calls and 11 raw MP4s. The twelfth attempt stopped before a media-tool call when Grok returned `402 Payment Required: usage balance exhausted`; it is not counted as a video call and was not retried. All 11 originals are H.264, 736x400, 24 fps, 6.041667 seconds and contain generated 48 kHz stereo AAC; 11 local review copies contain zero audio streams.
- Independent supervisor review keeps `b4-garden-edge-leaves-01` as the preferred source-only garden background-motion direction. `b4-moonbase-roof-seam-07` is also retained as a preferred source-only **post-M08 mechanical micro-cutscene direction**, not as a teaching background: its center-occupied roof and green confirmation light are appropriate only after the keyboard task has ended. The bell-vine, four cave and pressure-breathe clips remain partial references; the starbridge clip and both ecological-relay clips remain rejected for central badge/platform/electric-arc semantics. The missing completion-edge attempt has no media result.
- Across these four packages, 69 actual Grok video calls produced 60 raw MP4s. Batch4 ended at a historical `402 usage balance exhausted` event; later batches proved that authentication and generation access subsequently recovered, so this sentence must not be used as the current account state. Every raw MP4 retains generated AAC only as provenance; local muted-review derivatives have zero audio streams. None of the generated audio, review derivatives or source clips is approved for runtime.
- Package-level hashes and runtime-reference scans pass as recorded in each manifest/audit, but this proves only traceability and directory isolation. Real UI/keyboard/character composites, full-motion human review, external similarity/source clearance, 1024/1194 iPad delivery resolution and physical-device playback remain missing. `runtimeApproval=false`, `integrationAllowed=false` and `releaseCleared=false` remain mandatory.

Grok CLI later source-only ledger at 2026-07-17:

- `batch5`: 12 real video calls, 2 originals and 10 provider-503 missing originals; authentication and quota failures were 0.
- `batch6`: 6 real calls, 3 originals and 3 provider-503 missing originals; authentication and quota failures were 0.
- `batch7`: 18 real calls and 15 originals; two provider-503 events and one additional missing original. Independent item-level ruling is in `docs/50_GROK_BATCH7_SUPERVISOR_REVIEW.md`; no runtime approval was granted.
- `batch8`: 24 real calls and 23 originals; one missing original, with authentication, quota and provider-503 failures all 0. The character-video route stopped after identity/continuity failures; retained environment and mechanical items remain source-only.
- `batch9`: 11 real calls and 11 originals; `batch10`: 8/8; `batch11`: 6/6; `batch12`: 2/2. Their manifests record zero authentication, authorization, quota, rate-limit and provider-service failures for these 27 calls, and runtime references remain 0. Batch10/11 still require complete independent frame review; Batch12 is `capture_complete_pending_source_only_review`.
- The media task has been instructed to use a new `batch13` directory for any further calls; no Batch13 count may be recorded until its own call log and originals exist. Batch12 is frozen and must not be reopened or overwritten.
- All later batches remain `runtimeApproval=false / integrationAllowed=false / releaseCleared=false`. Grok-generated AAC is provenance-only; only zero-audio review derivatives may be used for review, and no generated clip enters runtime before item-level visual, teaching-zone, provenance, similarity and real-UI composite review.

M08 flat-workshop runtime record at `overhaul-337c`:

| Runtime path | Type | State or use | Source and approval | Screenshot proof | Final hash and similarity status |
| --- | --- | --- | --- | --- | --- |
| `assets/runtime/m08-flat-moon-workshop-bg-v1.webp` | background | M08 exterior install and seal-check scene | compressed from `assets/generated/m08-flat-moon-workshop-bg-v1.png`; prototype runtime only; exact prompt, generation ID and reference list are missing | `screenshots/roof_route_337c_ipad-1024x768_initial.png`, `screenshots/roof_route_337c_large-ipad-1366x1024_seal_complete.png` | SHA-256 `6EEDB13B27DAC6A1377C091A5B6FFC69FD71318113309CBCABD105CEA7797857`; internal layout review passed; external similarity review missing |
| `assets/runtime/xingya-suit-point-flat-m08-v3.webp` | character | M08 pointing coach in complete exterior pressure suit | prototype runtime identity candidate; the exact uncompressed v3 source, prompt, generation ID, reference list and reproducible export chain are missing, so nearby v1/v2 PNGs must not be treated as proof of the final v3 source | `screenshots/roof_route_337c_ipad-pro-11-1194x834_initial.png`, `screenshots/roof_route_337c_ipad-pro-11-1194x834_wrong_immediate.png` | SHA-256 `EEAA060FE8BC42618E142E2FBF7BC657BC63EA7A78BC8165136473D7B922BC79`; three sprouts and full suit manually passed; external similarity review missing |

Detailed known/missing evidence is recorded in `assets/generated/m08-337c-runtime-asset-record.md`. These two files are approved only for the current browser prototype. They are not release-cleared assets under `docs/39`.

Traceable M08 Xingya replacement-source candidate:

| Candidate path | Source input | Current decision | Evidence |
| --- | --- | --- | --- |
| `assets/generated/xingya-suit-point-flat-m08-source-v4-alpha-tight.png` | explicit edit of current runtime v3 using the configured `gpt-imagegen` skill; complete prompt, input/output hashes and chroma-removal steps recorded | `source_candidate_review_passed / runtime_not_selected`; it repairs traceability but is not a decisive in-scene improvement and is not release-cleared | `assets/generated/xingya-suit-point-flat-m08-source-v4-record.md`; `chrome-test/m08-art-candidate-check.mjs` `19/19`; `screenshots/m08_xingya_v4_candidate_tight/` |

| Runtime path | Type | State or use | Source and approval | Screenshot proof |
| --- | --- | --- | --- | --- |
| `assets/runtime/xingya-suit-point.webp` | character | M01-M08 guidance, M07/M08/FG03 route marker, S01 standing state | built-in image generation plus local chroma/split pipeline; approved for prototype runtime | `screenshots/xingya_space_suit_latest_M01_initial_1024.png`, `screenshots/xingya_space_suit_latest_M08_initial_1024.png` |
| `assets/runtime/xingya-suit-listen.webp` | character | M03 listening prompt and map cue | same selected sheet; approved for prototype runtime | `screenshots/overhaul_323a_visual_M03.png` |
| `assets/runtime/xingya-suit-good.webp` | character | correct/landing reaction and staff map cue | same selected sheet; approved for prototype runtime | `screenshots/xingya_space_suit_latest_S01_landing_1024.png` |
| `assets/runtime/xingya-suit-try-again.webp` | character | gentle wrong input and S01 stumble | same selected sheet; approved for prototype runtime | `screenshots/xingya_space_suit_latest_M01_wrong_1024.png`, `screenshots/xingya_space_suit_latest_S01_wrong_1024.png` |
| `assets/runtime/xingya-suit-celebrate.webp` | character | result and completion reaction | same selected sheet; approved for prototype runtime | `screenshots/xingya_space_suit_latest_M01_complete_1024.png` |
| `assets/runtime/xingya-suit-jump.webp` | character | S01 airborne staff-bridge motion | same selected sheet; approved for prototype runtime | `screenshots/xingya_space_suit_latest_S01_jump_1024.png` |

Authoritative rules and traceability: `docs/27_XINGYA_SPECIES_AND_SPACE_GEAR_BIBLE.md` and `concepts/generated-v2/xingya-species-and-space-gear-audit.md`.

| Asset path | Type | State or use | Current status | Needed before release |
| --- | --- | --- | --- | --- |
| `assets/generated/app-icon.png` | icon | app/PWA icon | provisional | source prompt, App Store icon review |
| `assets/runtime/app-icon.png` | icon | favicon, apple touch icon, PWA manifest icon | prototype runtime | App Store icon review and source prompt/license record |
| `assets/runtime/app-icon.webp` | icon | in-app icon image and runtime WebP variant | prototype runtime | decide whether kept for runtime or retired after PNG-only icon policy |
| `assets/generated/buddy-dino.png` | character | general dinosaur buddy | provisional | decide whether still used or retire |
| `assets/generated/dino-point.png` | character | former pointing hint source | retired from active vacuum runtime | keep only as historical source; do not restore to M01-M08/S01 |
| `assets/generated/dino-listen.png` | character | former listening source | retired from active vacuum runtime | keep only as historical source; do not restore to M01-M08/S01 |
| `assets/generated/dino-happy.png` | character | former correct-feedback source | retired from active vacuum runtime | keep only as historical source; do not restore to M01-M08/S01 |
| `assets/generated/dino-try-again.png` | character | former wrong-feedback source | retired from active vacuum runtime | keep only as historical source; do not restore to M01-M08/S01 |
| `assets/generated/dino-celebrate.png` | character | former completion source | retired from active vacuum runtime | keep only as historical source; do not restore to M01-M08/S01 |
| `assets/generated/moon-workshop-bg.png` | background | Moon Base Builder | provisional | style consistency check |
| `assets/generated/scale-island-map-bg.png` | background | map route | provisional | style consistency check |
| `assets/generated/staff-star-bridge-scene-wide-v172.png` | background | wide staff bridge | provisional | decide final staff background |
| `assets/generated/staff-star-bridge-scene-tablet-v172.png` | background | tablet staff bridge | provisional | decide final staff background |
| `assets/generated/staff-star-bridge-scene-v170.png` | background | staff bridge earlier version | provisional | approve or retire |
| `assets/generated/staff-dino-hop-bg-v1.png` | background | staff bridge concept | provisional | approve or retire |
| `assets/generated/staff-planet-bridge-bg.png` | background | staff bridge concept | provisional | approve or retire |
| `assets/generated/staff-space-rail-bg.png` | background | space rail concept | provisional | approve or retire |
| `assets/generated/staff-bridge-bg.png` | background | older staff bridge | provisional | approve or retire |
| `assets/generated/staff-bridge-bg-v2.png` | background | older staff bridge | provisional | approve or retire |
| `assets/generated/space-train-engine.png` | story object | parked train idea | provisional | likely retire if dino jumping remains core |
| `assets/generated/part-floor.png` | story object | floor | provisional | source prompt and screenshot |
| `assets/generated/part-light.png` | story object | lights | provisional | source prompt and screenshot |
| `assets/generated/part-wheel.png` | story object | wheel | provisional | source prompt and screenshot |
| `assets/generated/part-bridge.png` | story object | bridge pieces | provisional | source prompt and screenshot |
| `assets/generated/part-wall.png` | story object | wall | provisional | source prompt and screenshot |
| `assets/generated/part-star.png` | story object | stars | provisional | source prompt and screenshot |
| `assets/generated/part-roof.png` | story object | roof | provisional | source prompt and screenshot |
| `assets/generated/success-badge.png` | UI/reward | completion badge | provisional | source prompt and screenshot |
| `assets/generated/fx-correct-sparkle.png` | effect | correct feedback | provisional | intensity and source record |
| `assets/generated/fx-try-again-puff.png` | effect | wrong feedback | provisional | intensity and source record |
| `assets/generated/fx-level-confetti.png` | effect | completion | provisional | intensity and source record |

## Known Size Risks

The current prototype includes multi-megabyte generated PNG backgrounds, raw generation files, many root-level screenshot/contact-sheet artifacts, browser profile cache files, and large CSS override files. These are acceptable during exploration, but not as release assumptions.

Immediate cleanup tasks:

- decide which staff-bridge background is final and retire the rest;
- decide whether current WebAudio synthesis is good enough for the MVP or should be replaced by recorded/licensed piano samples;
- do not ship `assets/generated/raw` files in a production bundle;
- do not ship root `screenshot_*`, `generated_*contact_sheet*`, `ui_design_concept_board.png`, or `chrome-test` browser profile/cache artifacts in a production bundle;
- keep CSS and other publishable text files free of runtime references to `assets/generated`;
- keep `release-bundle-policy.json`, `.gitignore`, and `tools/production-bundle-audit.mjs` synced with the actual staging/release process;
- compress runtime backgrounds and character poses;
- record prompt/source/license fields for every kept asset;
- run iPad-size screenshots after compression to confirm staff lines, note pads, and black keys remain readable.

## Approval Rules

### Chapter 3 garden-mode Xingya at `overhaul-339b`

| Runtime path | Type | State or use | Source and approval | Hash and remaining clearance |
| --- | --- | --- | --- | --- |
| `assets/runtime/xingya-garden-invite-v1.webp` | character | Chapter 3 `safe-open` only; Xingya body with exploration harness and star backpack | deterministically extracted from `concepts/generated-v2/xingya-model-sheet-v1.png`; exact candidate and script records are under `concepts/runtime-candidates/ch03-garden-xingya-v1/`; `prototype_runtime_approved_for_339b` | SHA-256 `1228082D4DF2BF576ED916B16950799296A975279ED6EFC554F6BB9EDDE88EBA`; `release_provenance_partial`; `external_clearance_missing`; `releaseCleared=false` |

The sealed and scanning states continue to use `assets/runtime/xingya-suit-point.webp`. The garden asset must not appear before the air check reaches `safe-open`. Only the approved WebP is copied into runtime; the candidate PNG, checkerboard, audit composites and `concepts/**` paths remain outside the runtime bundle.

Live browser evidence: `screenshots/chapter3_visible_339b/LS01_initial_1024x768.png` and `screenshots/chapter3_visible_339b/LS02_resume_1194x834_dpr2.png`. These screenshots pass prototype placement review only; they do not satisfy external similarity or release provenance clearance.

`overhaul-339c` retains this exact runtime WebP and hash without modification. The 339c changes affect only pre-LS01 navigation and state-derived map copy; asset approval remains prototype-only and `releaseCleared=false`.

`overhaul-339d` also retains the exact WebP and hash. Its only Chapter 3 change is session-action pending-attempt continuity; no visual asset was regenerated, recompressed or replaced.

An asset can be approved only when:

- it visibly supports a music-learning action;
- it matches the warm toy-like space adventure direction;
- it does not imitate an existing protected character or brand;
- it is readable at iPad landscape size;
- it has a source and prompt/license note;
- it appears in at least one accepted screenshot.

## Replacement Rules

Replace or retire an asset when:

- it looks placeholder-level next to the target polish bar;
- it makes the music target harder to read;
- it introduces a competing story idea that is no longer core;
- it lacks source traceability before release work;
- it causes layout or performance problems.
