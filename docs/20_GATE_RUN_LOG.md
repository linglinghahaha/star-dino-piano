# Gate Run Log

This file records concrete pass/fail evidence for UI, teaching, and polish gates. It is not a substitute for the acceptance rules in `15_ACCEPTANCE_GATES.md`; it is the evidence trail.

## 2026-08-31 - 369f Active Progress Truth Candidate

- Added `overhaul-369f-active-progress-truth-correction`, recorded in `docs/30_ACTIVE_PROGRESS_TRUTH_CORRECTION_CANDIDATE_369F.json` (SHA-256 `D84712AC970CAD3C62135CA52757960D211C20D3F8D5B2B5ED350A4C8C74A31E`). It retains 369e as the frozen predecessor and 359a as the frozen observation baseline.
- TDD red evidence: LS05 was `66/67` when an active zero-input LS05 map showed “刚完成：三朵花一起开放” beside current “叫醒三朵花”; LS04 was `39/40` when its complete speech promised “今天先在花园歇一歇”.
- Green evidence: `check:chapter3-ls04` `40/40`, `check:chapter3-ls05` `67/67`, `check:child-course-director` `111/111`, and `check:child-nonblocking-feedback` `78/78`. The active unfinished action now resolves the preceding completed result; voluntary replays retain their existing completed-result display. The original-size map proof is `screenshots/chapter3_ls05_341a/ls05_active_zero_input_progress_truth_1024x768.png`.
- This candidate changes only the map guide branch and LS04 support copy. Session/action/history/mastery/played/stable/retained/needsPractice, lesson and pitch order, input, audio, media, CSS, PWA cache identity, and frozen predecessor records are unchanged. PWA cold-offline qualification remains unqualified for 369f by scope; all four approval flags remain false.

## 2026-08-29 - 369e iPad Settlement Candidate Closeout

- Closed the current browser/PWA candidate as `overhaul-369e-ipad-settlement-compactness-correction`, bound to `docs/30_IPAD_SETTLEMENT_COMPACTNESS_CANDIDATE_369E.json` (SHA-256 `6BDF234A3A5DD85A2CE7F19AB5F9D726B3A1A4B747A4802D0438493F4D94EA5F`). The predecessor chain is retained as evidence: 369d -> 369c -> 369b -> 369a, with 368b, 367b, 366a, 365b and 359a retaining their original roles and identities.
- The scoped change is presentation and PWA identity only: the iPad phase-settlement surface is compact and nonblocking. The 369e runtime identity records `app.js` SHA-256 `F3B4F960D90A5F7CD12749C9BA554D09D2A25F8FCDACE154905ACB692EAFB31F`; no lesson order, pitch order, note-name/solfege boundary, input budget, repair threshold, mastery evidence, audio, MIDI, microphone, voice, SFX or runtime media bytes were changed by this closeout.
- Deterministic static recovery is available at `dist/prototype/star-dino-369e-static-backup.zip`: `2,368,293` bytes, SHA-256 `7CAEDA7083156E182DA3D0537C23289970052ACD0010FD21E513B1F570DD004C`, with `54` release files and `55` ZIP entries. The backup manifest is `docs/30_PROTOTYPE_BACKUP_369E.json` (SHA-256 `F17DC39795E4DBCA20D4D5368256C3DED4C87C50D7A9868C948A4BF282673870`); archive tamper rejection is `5/5` and isolated recovery is `10/10`.
- Current review surfaces are bound to 369e while 359a remains the frozen observation baseline. Review Hub passes `109` browser assertions and `239` server assertions; the release-owner and device-readiness pages pass `77/77` and `113/113`; their real-world returns remain missing.
- Focused and aggregate checks remain green: release-owner verifier `20`, device verifier `22`, release actionability `249`, static recovery `14`, release engineering preflight `201` (shared dirty-tree warning only), curriculum facts `110`, curriculum/story `61/61`, runtime pacing `1365`, `check:quick` exit `0`, and strict bundle `54` files / `1,948,942` runtime-asset bytes. `git diff --check` has no whitespace errors beyond existing line-ending warnings.
- This is a documentation and recovery closeout, not a release or runtime-integration approval. `runtimeApproval=false`, `integrationAllowed=false`, `observationAllowed=false`, and `releaseCleared=false` remain enforced. The 13 release blockers remain open: physical iPad Safari, real MIDI/acoustic microphone matrix, teacher and child observation, final audio/media listening review, rights/source and external-similarity clearance, native iPad/privacy/signing/TestFlight work, and remote/second-host/deployment rollback evidence. The exact 369e source snapshot is still missing while shared control files change; `world-map-v6-dark-scifi.css` remains an unattributed parallel presentation change requiring separate review.

## 2026-07-31 - 368a S01-mini Training Dock P1-A

- Created the independent unapproved visual successor `overhaul-368a-s01-mini-training-dock` in `docs/30_S01_MINI_TRAINING_DOCK_CANDIDATE_368A.json` (SHA-256 `DC4F1132EA2D05BCDEE7198CEF6039953F7B2EB0BFF6F91AAAE291E200340DD7`). The 368a surface keeps the visible 367b shell request (`app.js?v=overhaul-367b-world-map-pwa-qualification`) and adds only the scoped `s01-mini-training-dock.css?v=overhaul-368a-s01-mini-training-dock`; 367b remains the retained predecessor and 359a remains the frozen observation baseline.
- S01-mini now presents a short three-pad training dock: one current pad, neutral future pads, a low-contrast distant bridge, and a visible noninteractive mini-rest star. Correct C4-D4-E4 inputs leave stable scene lights and a 720ms jump path; wrong input remains in place and nonblocking; completion stops at the rest star without a modal, score, next-level CTA or formal S01 mastery. The focused debug capture writes no observation event, while a canonical formal S01-mini session retains its existing observation-only contract and still cannot write stable or retained evidence. Reduced motion preserves the three-pad/rest-star terminal geometry with static transitions.
- Focused evidence passes `check:s01-mini-p1a` `41/41` with zero browser problems at `1024x768` and `1194x834@2x`, covering initial, one-correct, wrong, complete, refresh-return and reduced-motion screenshots in `screenshots/s01_mini_training_dock_368a/`. Existing S01 gates pass: staff-mini `20/20`, staff-readability `13/13`, staff-repair `27/27`.
- Serial shared gates pass: child note names `286/286`, child course director `78/78`, home single task `23/23`, child nonblocking feedback `77/77`, clean state `124/124`, sessions `74/74`, curriculum story `54/54`, and strict bundle `53` files / `1,948,942` runtime-asset bytes. The strict policy was minimally extended to include the new S01 CSS; no runtime asset was added. The 29 runtime files compare byte-for-byte with the retained 367b static archive (zero differing files).
- `check:runtime-pacing` remains partial at `1361` passed plus one expected legacy 367b live-app identity pin; `check:quick` remains partial because it stops at the same supervisor-owned `check:curriculum-facts` identity pin after `105` checks. These old fact sources were not rewritten. `git diff --check` passes with only existing line-ending conversion warnings.
- Current hashes are `app.js 839DDE4BD4D9D9C2A88BD6119D2FFFA523D1E2D741B277C69902C2A6203E616C`, `index.html 7FC292D26BDB713D7E7439F08A6FBAAF8641B51613FB48ED370F2A6D811DB481`, `service-worker.js 4AEA021B68327BD0DAF66084A1E22D80839FFE1869962885F941688E7961D1FD`, and `s01-mini-training-dock.css 499FE3EA9663AB70328489A4DDE8C88CFA84C895D53106877C09C960EA4CCB1A`. PWA/cold-offline for the new CSS was not requalified; all runtime, integration, observation and release approvals remain false, and no P1-B/P1-C work was performed.

## 2026-07-30 - Note Passport Opening-Review Story-First Correction

- Independently compared the future `C3-X01` lesson continuation contract with the proposed `NP-CDE/NP-FG` opening reviews and the global scheduler. `C3-X01` is a future story lesson, so a natural rest may resume its remaining one or two story calls in a new session. Note Passport is an opening review, so the same continuation rule must not apply.
- Found one real contradiction in `docs/71`: the `NP-FG` action budget said a difficult run could be continued across sessions, while the same file and `docs/31` require the next child click to enter the planned story with zero opening reviews. A fail-closed audit first produced the expected `53/54` result.
- The corrected contract ends a difficult, long-wait or fatigued passport at a complete-stamp safety point, preserves only honest collection plus `played/needsPractice`, and sends the next child click directly into the planned story. The same passport may be scheduled again only as a complete new run after at least one later ended, formal, child-participated story session with no opening review; unfinished calls and later runs can never be stitched into stable/retained.
- `docs/61` now gives the teacher the same scheduling boundary. The focused curriculum/story gate passes `54/54`, and runtime pacing remains `1,362` checks across `38` units. This changes no runtime, canonical lesson, input budget, note order, phase settlement, mastery threshold or approval state; C3-X01 and NP-CDE/NP-FG remain teacher-gated and runtime-forbidden, and all 13 release blockers remain open.
- Because `docs/61/71` are embedded teacher sources, the package verifier correctly rejected the previous current v7 bytes. The rolling current protocol-r4 v7 was deterministically rebuilt without changing its 33 questions or frozen 359a binding: `4,880,305` bytes / SHA-256 `FBA81CF8CF4B6A784B11BC30E284112186B7A5A23BB92F96A302CE9682D4045E`. Immutable historical v5/v6 were not modified.
- Current-package verification passes `2/2` byte-identical builds and `6/6` tamper rejection. The regenerated Review Hub passes `101` browser assertions and `239` allowlist-server assertions with four external tasks, `0/4` accepted real results, zero runtime routes and zero accepted write methods.

## 2026-07-30 - Multi-Lesson Pacing Metadata Preservation

- Investigated the apparent `39` canonical lessons versus `38` pacing units. No lesson is missing: six units deliberately group two canonical lessons, while S01 and TH08 also occur in multiple session roles. Grouping remains allowed only as a session/pacing choice and does not merge lesson identities or evidence.
- Found a real audit gap: the prior metadata gate validated only each grouped unit as a whole. It could not prove that M04/M05, FG01/FG02, LS01/LS02, LP01/LP02, TH01/TH02 and optional TH07/TH08 each retained its own teaching axis, game verb, child music action, world result, rest point, handoff, continuation rule, settlement eligibility and mastery boundary. LP01 listening versus LP02 low-C key geography was the highest-risk example.
- Added fail-closed per-lesson segment requirements to `docs/80_RUNTIME_PACING_METADATA_CONTRACT.json` and `tools/runtime-pacing-metadata-audit.mjs`. The intentional red run failed `8` checks: all six grouped units lacked segments, plus the dedicated C4-01 and C5-01 axis protections. After adding 12 ordered lesson-segment contracts, the pacing gate passes `1,362` checks across the unchanged `38` units.
- This is specification and audit work only. The `39` lesson IDs, `38`-unit topology, `23` frozen runtime units, input budgets, note order, session behavior, settlement boundaries, mastery semantics and all runtime core bytes remain unchanged. Runtime dispatch stays zero; LP05+, C3-X01, NP-CDE/NP-FG and Chapter 5 remain locked, and all 13 release blockers remain open.

## 2026-07-30 - Dongdong Mingshi Canon Residual Cleanup

- A full current-source sweep found three live wording leaks after the `docs/98` origin decision: `docs/03` still called the Senya cave Dongdong's unfinished low-planet home, `docs/24` described a wrong-octave G as being below Dongdong's home, and `docs/25` still called the Moon/outbound-world composition two planets. Historical evidence and frozen review packages were not rewritten.
- The current wording now distinguishes Dongdong's guarded Senya resonance-stone outpost from his Mingshi home, uses `下面低音区的 G` for the future LP09 repair, and describes Chapter 2 art as a left Moon surface plus a right ecology planet. No lesson, note, register, input budget, reveal timing, session, mastery rule, runtime copy, map control, media file or approval field changed.
- The coherence gate first failed `52/53` on the stale roadmap phrase, then passed `53/53` after the narrow corrections. Curriculum facts pass `106`, runtime pacing passes `1,227` checks across `38` units, and copy integrity passes all `9` files. Runtime dispatch remains zero, LP05+ remains locked, and all 13 release blockers remain open.
- Full `check:quick`, strict bundle, current source-snapshot comparison, release engineering `185`, blocker actionability `211`, and maturity-state `63` fact checks all pass. The rebuilt portable kit again passes its `11`-assertion empty-directory bootstrap/offline rehearsal and `3/3` tamper rejection; its final hashes remain in the machine manifests to avoid source/archive self-reference.

## 2026-07-30 - 367b Portable Independent Recovery Kit

- Added a deterministic outer recovery bundle containing exactly seven current 367b artifacts: the candidate manifest, static manifest/archive, source manifest/archive and dedicated npm-cache manifest/archive. The ZIP also carries top-level `RECOVER.py`, which uses only the Python standard library to validate the sidecar, recover the bundled source verifier and continue without a repository checkout. The external manifest, ZIP and current-machine verification JSON live in `dist/release-engineering`; final hashes remain machine-owned there so the included source snapshot does not refer to its enclosing ZIP.
- Hardened validation before final packaging. Candidate, static and source approval objects must contain every required false approval field; the npm-cache verifier now rejects a lock path that escapes its explicitly bound recovery root. The current 367b source verifier also compares the archive selection and every source hash against the live workspace, while frozen predecessor checks remain archive-only. Its intentional pre-rebuild red result identified the five recovery tools plus every changed release record instead of accepting the stale snapshot. The cache self-test passes `3/3`, including content tampering and the new path-boundary rejection. The outer verifier rejects artifact-byte, embedded-approval and unsafe-path variants `3/3`.
- Current-machine rehearsal first extracts only `RECOVER.py` into an empty directory and launches it with `python -I`, proving that project imports and an existing checkout are not required. It then extracts all seven roles into a fresh system temporary directory, verifies the nested source/static/cache archives, performs `npm ci --offline` against the newly extracted dedicated cache, runs `npm ls --all`, module probes, syntax and strict bundle, and removes both temporary copies. The package-level rehearsal passes `11` assertions; strict bundle remains `52` files / `1,948,942` runtime-asset bytes.
- The package explicitly excludes Playwright browser binaries, Node/npm installers, native toolchains, signing credentials and user data. `repositoryCheckoutRequired=false`, `remoteBackupVerified=false`, `secondPhysicalHostVerified=false` and `realDeploymentRollbackVerified=false`; this closes no physical-iPad, native, migration, signing, TestFlight, App Store or human-review requirement and does not reduce the 13 release blockers.
- This work changes release-engineering tools and records only. The three current runtime core hashes remain unchanged, every runtime/integration/observation/release approval remains false, and prototype/UI, media and Dongdong design tasks remain idle.

## 2026-07-30 - Apple Age, Kids And SDK Rule Delta Recheck

- Rechecked only current Apple first-party sources for App Store age ratings, Kids Category age bands, privacy manifests and listed third-party SDK requirements. Internal teaching target `4-6`, questionnaire-derived general App ratings and the Kids Category `5 and under / 6-8 / 9-11` bands are now explicitly separate fields; no `4+` or Kids approval is predeclared.
- The release contract now records the current latest-OS global values `4+ / 9+ / 13+ / 16+ / 18+`, the current `4+` or `9+` eligibility condition for selecting Made for Kids, and the continuing Kids obligations after approval. Final questionnaire, global/regional result and Kids selection remain missing until the actual App Store Connect record exists.
- `Declared Age Range`, `PermissionKit` and significant-change permission flows remain conditional future evaluations, not default dependencies for a child-focused app. No account, network service, SDK, entitlement or child-data field was added. The native contract also requires the final Release archive to prove valid manifests, signatures, versions and the Xcode privacy report for Apple-listed direct, transitive or repackaged SDKs.
- TDD first produced six focused failures. After the source updates, `check:competitive-facts` passes `29/29` and `check:privacy-state` passes `69/69`; current Web storage remains six local keys and two session keys with zero external runtime URLs. Five privacy release blockers and all 13 mature-app blockers remain open. No runtime, course, media, observation, integration, native or release approval changed.
- Source-hash validation correctly rejected the stale release-owner and device-readiness templates after the native contract changed. Their exact `docs/36` and `docs/75` hashes were refreshed, both local-only pages were regenerated, and the verifier/page gates pass release owner `20 + 59/59` and device readiness `22 + 81/81`; both real returns remain missing and fail closed.
- Full `check:quick` and strict bundle pass at `52` files / `1,948,942` runtime-asset bytes. The strict privacy release gate intentionally exits nonzero with the same five blockers. The current 367b source snapshot is rebuilt only after these generated artifacts and this log entry; its final identity is authoritative in `docs/30_PROJECT_SOURCE_SNAPSHOT_367B.json` to avoid a self-referential hash.

## 2026-07-30 - Chapter 4 Future-Contract And Teacher Review V7 Closure

- Independently reconciled the future-only Chapter 4 route across `docs/03/08/11/14/15/16/24/34/66/80/93` without modifying the frozen 367b runtime. LP05 now has one planned target/world-progress input per child-started session and an absolute session maximum of three; it has no settlement eligibility. LP10 may resume its guided `3/6` route and later check within a `2-3` input session, and remains the only formal Chapter 4 phase tail.
- Clarified that lesson input budgets count only target/world-progress slots. Wrong inputs, replay requests and bounded repair events remain separately recorded and cannot consume the story budget or block helped story completion. LP07 microphone evidence is limited to LP02-LP07, is experimental assisted story progress only, records `actualHand=unknown`, and may rearm only after note end or silence. `low-key:C3-G3 stable` remains an explicit unschedulable missing capability; no review lesson, skill event or mastery claim was invented to close it.
- The focused gates pass with curriculum/story `53/53`, curriculum facts `106`, runtime pacing `1227`, copy integrity over `9` files, and strict bundle `52` files / `1,948,942` runtime-asset bytes. These are static-contract and regression results only; `runtimeDispatchAllowed=false`, and LP05+, C3-X01, NP-CDE/NP-FG and Chapter 5 runtime remain forbidden.
- Rebuilt the current teacher package after its generated page and manifest drifted from the revised A5/session-budget source. `dist/review/star-dino-teacher-staged-review-359a-v7.zip` now contains the same 21 allowlisted files plus one embedded manifest, is `4,880,101` bytes, and has SHA-256 `2F73F306B9636652DEA47F9A2F59BD365D193F4ABE13E874D57640991FBA3E02`. The page has `98` assertions and A13/B10/C10 = 33 questions; two full builds are byte-identical and all six tamper probes are rejected. V5 and V6 remain immutable historical packages.
- Review Hub now exposes only that refreshed v7 identity and passes browser `101` plus allowlist server `239`, while retaining four external tasks, zero accepted real results, zero runtime routes and zero write methods. The exact 359a observation binding and all-false approval fields remain unchanged. Physical iPad, qualified teacher, child, device, SFX, similarity, rights and release evidence remain missing; all 13 release blockers remain open.
- This source-document and generated-review closure requires a fresh deterministic 367b source snapshot. Its final archive and manifest identities are intentionally read from `docs/30_PROJECT_SOURCE_SNAPSHOT_367B.json` rather than copied into this included file, avoiding a self-referential hash.

## 2026-07-30 - Portable 367b NPM Offline Dependency Cache

- Added a dedicated public-registry cache seeder, deterministic cache builder, verifier and empty-cache recovery rehearsal. The seed process reads the exact lock and uses an isolated cache plus the null user config; it collected all `19` resolved lock packages, including optional platform packages, without archiving the user's global npm cache or configuration.
- `docs/30_NPM_OFFLINE_DEPENDENCY_CACHE_367B.json` binds lock SHA-256 `B2617DB01D017E0EC1CF27AF5D511E83B9CF4F397174602AFB39FD7EC3620B99`, `39` `_cacache` files / `36,885,039` cache bytes, and a `36,868,498`-byte ZIP with SHA-256 `0CA5B29E3A0ECA654A16EF2FA23A42E35860069A9BC3E3D4B19A89C048B75D1F`. Two complete archive builds from the dedicated seed cache are byte-identical; external manifest SHA-256 is `6937B83825737860024CAB3508DFAD9A30EA71FE6524DADD618E57A81FF2DCED`.
- The verifier passes its real archive check and content-tamper probe `2/2`. The recovery rehearsal starts with an empty system-temporary npm cache, extracts the portable cache and verified 367b source snapshot, then passes `npm ci --offline`, `npm ls --all`, Playwright/PostCSS/Lightning CSS module probes, syntax and strict bundle for `19/19` assertions. The direct portability gate passes `16` assertions, including rejection when the external approval object is removed.
- This closes the earlier “only the current machine's warm cache is usable” limitation at the artifact level, while preserving the original 362a failure as historical evidence. It does not include Playwright browser binaries, Node/npm installers or native signing tools and has not run on a second physical host; remote backup, deployment rollback, physical iPad, signed native archive and all 13 release blockers remain unresolved. Every runtime, observation and release approval stays `false`.
- The deterministic 367b source snapshot was rebuilt after these source-only tools and records, then passed independent verification, source-only recovery and empty-cache dependency recovery. Its current identity remains machine-owned by `docs/30_PROJECT_SOURCE_SNAPSHOT_367B.json` and is not copied here to avoid self-reference.

## 2026-07-30 - Current-Machine Offline Dependency Cache Follow-up

- Preserved the original 362a failure evidence: its first `npm ci --offline --ignore-scripts --no-audit --no-fund` attempt failed because the then-current npm cache lacked `source-map-js@1.2.1`. Seeding that package exposed further uncached locked dependencies including `postcss`, `lightningcss` and `playwright`; none of those intermediate failures was rewritten as a pass.
- Used the exact `package-lock.json` with SHA-256 `B2617DB01D017E0EC1CF27AF5D511E83B9CF4F397174602AFB39FD7EC3620B99` for one online seed install of 9 packages. A new directory then passed `npm ci --offline --ignore-scripts --no-audit --no-fund` and `npm ls --all` on Node.js `v22.19.0` / npm `10.9.3`.
- Extracted the verified 367b source snapshot into a separate clean directory and repeated the offline install. Syntax, note matrix, copy, curriculum facts `79`, curriculum/story `52/52`, runtime pacing `1217`, strict bundle `52` files / `1,948,942` runtime-asset bytes, and the Playwright adult-review audit `71` all passed from that recovered copy.
- Current status is `offline_dependency_cache_seeded_current_machine_passed`. This proves only that this machine's npm cache currently satisfies this lock file; the source snapshot does not contain that cache, and no unseeded clean machine or portable offline cache archive has been verified. The 13 release blockers, physical-iPad evidence, deployment rollback, remote backup and signed native archive remain missing; all approval values remain `false`.
- These source-document updates require a new deterministic 367b source snapshot. Its current archive and manifest hashes are intentionally read from `docs/30_PROJECT_SOURCE_SNAPSHOT_367B.json` rather than copied into this included file, avoiding a self-referential hash.

## 2026-07-30 - Nonvoice SFX Physical-iPad Review Direct Route

- Replaced the Review Hub's ZIP-only SFX action with a primary interactive route at `/review/nonvoice-sfx-listening-r1/review/` and a separate retained download for the byte-identical offline package. The Hub still reports `0/4` accepted external results and all runtime, integration, observation and release approval values remain `false`.
- The read-only 4201 server now derives an exact 34-file page/media allowlist from `audio/review/human-listening-package-v1/package-manifest.json`, verifies every hash before listening, serves M4A as `audio/mp4` and WAV as `audio/wav`, and implements bounded single-range responses for physical iPad Safari. CSP permits only same-origin media while keeping network connections, frames, objects and writes disabled; repository audio paths, runtime assets, unlisted files and traversal probes remain inaccessible.
- TDD red evidence first produced `media-src 'none'` plus 404 for the package manifest, page, all media and Range requests, and the Hub had no separate offline-package action. Green evidence passes Review Hub browser `101`, allowlist/media server `239`, package verification `7 assets / 28 players / 37 audio hashes`, packaged-page metadata decode `28/28`, human-return verifier self-test `31`, and actual-page return integration `19` with two independently recomputed physical-iPad routes.
- The fixed external ZIP remains `753,681` bytes / SHA-256 `F38289D48EA65EFFC92AD10EE4B84CB059C87C2820A38FCB4EF00306CE66C520`; no WAV, M4A, mix, reference, runtime, course, story, note-identity, session, settlement or mastery byte was changed. Real adult iPad speaker and headphone listening results remain missing, so this infrastructure cannot select, approve or integrate any SFX.
- The current 367b source snapshot recorded by the prior finalization entry is superseded by this source-only review-infrastructure change. Its replacement identity is intentionally read from `docs/30_PROJECT_SOURCE_SNAPSHOT_367B.json` rather than copied into this included source file, avoiding a self-referential snapshot hash.

## 2026-07-30 - 367b Current-Candidate Recovery Evidence Finalization

- Preserved the frozen `overhaul-367b-world-map-pwa-qualification` runtime exactly: `app.js B58B37C179920514FB8BD8B597C2B6EFB6D692F90BDD114BA2CAE4159D6019CB`, `index.html B7724512BF6B12D7CAEB3C445CF870DFA1EB82CB3AF039F02E03AF3AD437E652`, `service-worker.js 4AEA021B68327BD0DAF66084A1E22D80839FFE1869962885F941688E7961D1FD`, and `package.json 836BE3FDC8478B81A503E4A5B133211AE862DAAEF909F49412A2F8238398F2A8`. No runtime, course, media, note-identity, input-budget, session, settlement or `played/stable/retained` byte was changed by this recovery-evidence work.
- Finalized the independent current-candidate static backup at `docs/30_PROTOTYPE_BACKUP_367B.json`: `52` release files / `53` ZIP entries, manifest SHA-256 `FEE6C3218D898B83E92A0D40ED6CD7D5B700B11E539120D3079F6A3E39C0E1DB`, archive `2,360,874` bytes / SHA-256 `33CD00D4A51436232A6E480A9281A930DDCAB6280E6C62E129CEFDE27E1B67C3`. Archive verification, the `5/5` tamper matrix and isolated 367b-to-359a static recovery `10/10` pass.
- Finalized `docs/30_PROJECT_SOURCE_SNAPSHOT_367B.json` and `dist/release-engineering/star-dino-source-snapshot-367b.zip` after all audit, coordination and generated-review metadata changes. Two complete builds with the same timestamp and arguments are byte-identical: `1,170` source files / `24,494,765` source bytes / `1,171` ZIP entries; external manifest SHA-256 `0AF0AB375F6DEE848036534DCB6BEA18CDE6BEDAA744F4E60EA40AF60419A88E`; ZIP `6,339,056` bytes / SHA-256 `702132FF8E63D2EC84C0D9DEFB79CDAB448595007315B2CE1C53E4D5A54DA84F`. Verifier self-test passes `2` assertions and isolated source recovery passes `20/20`, including eight source-only core gates without `node_modules`.
- Migrated release actionability, mature-app readiness and Review Hub to distinguish current 367b recovery evidence from the frozen 365b recovery owner. Current checks pass release actionability `199`, mature-app facts `63`, Review Hub browser `95`, allowlist server `70`, release engineering `169`, full `check:quick`, and strict bundle `52` files / `1,948,942` runtime-asset bytes. The Review Hub reports current 367b static/source recovery as prepared while preserving 365b only as frozen predecessor evidence.
- The frozen 367b candidate JSON intentionally retains its creation-time `staticBackup/sourceSnapshot=missing` fields; post-manifest evidence is held by the separate manifests, archives, ledger and coordination contracts. This log entry is a post-build audit record and therefore is not written back into the ZIP whose final hash it records.
- Status remains fail-closed: physical iPad Safari, remote backup, real deployment rollback, persistent-data migration, signed native archive, TestFlight, App Store, teacher/child evidence, final audio/media and release rights remain missing or partial. All runtime, integration, observation and release approvals remain `false`; the mature-app ledger still reports `13` release blockers.

## 2026-07-30 - 367b Browser PWA Qualification Fact-Migration Recheck

- Reconciled release-facing facts to the exact unapproved `overhaul-367b-world-map-pwa-qualification` manifest: `docs/30_WORLD_MAP_PWA_QUALIFICATION_CANDIDATE_367B.json` SHA-256 `6B5FE70D4C6FD61BE437EA8EB81AA57422E674C4EED930BFBDBA693C9D8ED1A5`. The current runtime remains `app.js B58B37C179920514FB8BD8B597C2B6EFB6D692F90BDD114BA2CAE4159D6019CB`, `index.html B7724512BF6B12D7CAEB3C445CF870DFA1EB82CB3AF039F02E03AF3AD437E652`, `service-worker.js 4AEA021B68327BD0DAF66084A1E22D80839FFE1869962885F941688E7961D1FD`, and `package.json 836BE3FDC8478B81A503E4A5B133211AE862DAAEF909F49412A2F8238398F2A8`.
- The candidate roles are now separately machine-checked: 367b owns current browser Service Worker/cache/update/cold-offline qualification; 367a is the frozen map-visual predecessor; 366a is the frozen teaching-core predecessor; 365b owns only frozen static backup, source snapshot and isolated recovery rehearsal; 359a remains the only adult physical-iPad and directional-observation baseline. No frozen manifest was rewritten and no recovery archive was presented as a current 367b backup.
- Rebound both local-only field-return templates and review pages to 367b while retaining their exact 359a observation binding. The owner-facts verifier self-test passes `20` assertions and its blank template remains `incomplete_fail_closed`; device-readiness verifier self-test passes `22` assertions with the same fail-closed state. Browser intake audits pass owner facts `59/59` and device readiness `81/81`; neither page can grant physical-device evidence, final pass or release approval.
- Rebuilt the review hub with explicit 367b/367a/366a/365b/359a identity labels. Review-hub browser audit passes `94` assertions and its strict allowlist server passes `70`, serving no runtime routes, accepting no write methods and retaining `0/4` real external results. Current local-intake state is `templates_and_pages_367b_ready_results_missing`.
- Current-state release gates pass: release-blocker actionability `193` assertions, Web privacy `67` checks with five unresolved privacy blockers, release engineering `155` assertions with the intentional dirty-worktree warning, and mature-app current-state `62` facts with all `13` release blockers still present. All runtime, integration, observation and release approval values remain `false`.
- Final regression passes `check:curriculum-facts` (`79`), `check:curriculum-story` (`52/52`), `check:runtime-pacing` (`1217`), full `check:quick`, and `check:bundle:strict` (`52` files / `1,948,942` runtime-asset bytes). `git diff --check` exits successfully; it reports only existing line-ending conversion warnings for `index.html`, `tools/generate_audio_concepts.py`, and `tools/process-xingya-action-sheet.py`, not whitespace errors.
- This migration changes release-coordination documents, verifiers, generated review metadata and version-bound labels only. It does not change lesson order, note identities, input budgets, session/mastery semantics, child-visible copy, runtime media, audio, the 359a observation archive, source-rights status, physical-iPad evidence or release status.

## 2026-07-30 - 366a Course Continuity And Regression-Gate Independent Recheck

- The M03/Garden red was a stale test fixture, not a runtime course failure. `chrome-test/m03-garden-narrow-check.mjs` supplied only one synthetic `C2-03` row, while the current course director requires the complete canonical C1/C2 history before exposing the single Garden task. The fixture now uses `canonicalC1C2History()`, retains clean/assisted/modeled C2-03 variants, expects all 13 prior sessions, and checks the current `aria-current="step"` contract. M03/Garden passes `32/32`.
- Resolved one real cross-task contract conflict in M01. The 355a visual layer hid the suspended floor's letter badge even though the established hierarchy contract and the explicit child-copy rule require ordinary non-character identity markers to use letter note names. M01 now shows only `C` on the suspended floor, keeps `C-G` on the keyboard, confines `Do` to Xingya's dialogue, and still hides the extra story identity row, build-slot letter, tap badge, finger and locator overlays. The strengthened visual-intensity check requires that static `C` while rejecting transient duplicate cues. M01 hierarchy passes `17/17`; child feedback intensity passes `42/42`; child note-name audit passes `286/286`; clean state passes `124/124`.
- Migrated obsolete shell assertions in assembly, M01 hierarchy, staff repair and staff readability from historical 348a expectations to the exact current `overhaul-366a-c4-settlement-lp04-continuity-correction` script identity. No behavioral assertion was removed or relaxed. Assembly passes `39/39`, staff repair `27/27`, and staff readability `13/13`.
- Migrated the workshop identity test to the real current parent challenge instead of waiting for direct parent-panel access, and updated its runtime identity assertion to 366a. Workshop identity/telemetry passes `36/36`; iPad accessibility passes `43/43`; M01-M03 companion feedback remains `21/21` with zero browser problems.
- Fresh Chapter 3/4 continuity evidence passes: Chapter 3 visible `76/76`, course director `78/78`, home single task `23/23`, nonblocking feedback `77/77`, LS04 `39/39`, LS05 `66/66`, LS06/LS07 `64/64`, LS08 `131/131`, LP01/LP02 `137/137`, LP03 `54/54`, LP04 `33/33`, LP04 input `8/8`, LP04 audio `11/11`, LP04/R01B foundation `20/20`, R01A scheduler `35/35`, and R01B lifecycle `31/31`. LS08 required a longer process timeout but passed unchanged; the diagnostic showed no visual-assist transition defect.
- Input/audio and shared-map evidence passes: AUDIO-A `66/66`, AUDIO-B `46/46`, AUDIO-C `46/46`, MIDI/microphone coexistence `9/9`, microphone lifecycle `17/17`, input reliability `12/12`, sessions/retention `74/74`, world-map v5 `103/103`, world-map v6 `103/103`, and world-map visual focus `80/80`.
- Global verification passes `check:quick`, including curriculum/story `52/52`, runtime pacing `1217`, privacy current-state `67`, release engineering `152`, and all fail-closed review packages. `check:bundle:strict` passes with `52` files / `1,948,942` runtime-asset bytes. Focused `git diff --check` is clean.
- Status remains `prototype_runtime_candidate_unapproved`: `runtimeApproval=false / integrationAllowed=false / observationAllowed=false / releaseCleared=false`. Physical iPad Safari, real MIDI and acoustic-microphone evidence, qualified teacher review, 3-5 child observation, final voice/SFX listening, visual similarity and source/rights clearance, qualifying native privacy/release work, TestFlight and store review remain unresolved. No `concepts/**`, `audio/**`, technical preview, Keyboard Captain or other-product material was integrated.

## 2026-07-29 - Private Recording Ignore Gate Current-State Revalidation

- Recomputed the historical recording-privacy prerequisite against the current repository without creating `private-recordings`, WAV, PDF or any real consent/voice file. `git rev-parse --show-toplevel` resolves to the Star Dino Workshop repository and `.git` is active.
- Nonexistent probes `private-recordings/xingya/raw/supervisor-probe.wav` and `private-recordings/consent-private/supervisor-probe.pdf` both resolve through `git check-ignore -v --no-index` to `.gitignore:39 private-recordings/**` and return ignored status. `private-recordings/README.md` resolves through the line-41 negation and plain `git check-ignore --no-index` returns non-ignored status. The private directory remains absent.
- Release-engineering preflight passes `150` assertions with the intentional dirty-worktree warning; current Web privacy facts pass `66` checks while retaining five privacy blockers. This revalidation does not open recording intake: no real voice or consent result exists, and explicit user authorization plus the designated private intake workflow remain required.

## 2026-07-29 - Dongdong A-C Household Preference Return Contract R1

- Added a privacy-minimized, source-only return contract for the current A-C household sheet. `review/household-preference-return.template.json` records only review date, first choice, optional distinct second choice, and two adult confirmations that the prompt stayed neutral and was not repeated. It contains no free text, child quote, name, age, birth date, face, voice, photo/video, school or contact field.
- The verifier binds the exact current candidate set, manifest and display-grid hashes; it accepts only `A/B/C`, `no_preference`, and `no_second_choice`, rejects duplicate rankings, old A-E identity, hash changes, extra response fields, identifying-data flags, cross-product markers and any runtime/release/final-design claim. A complete return can only become `household_preference_candidate_pending_supervisor` or `no_preference_recorded_pending_supervisor`; automatic approval remains false.
- TDD red evidence first failed because the verifier did not exist. A second adversarial red run proved that JavaScript date parsing incorrectly normalized `2026-02-31`; exact calendar round-trip validation now rejects it. Green evidence passes `29/29`; the blank template is structurally valid but remains `incomplete_fail_closed`. Template SHA-256 is `80249BABB16529580582ADD177D8FE6185B37FAF681593C8F984E91510C0D022`; verifier SHA-256 is `BC0EFB4AED404636CDB72C6F044D256EFA7818D4F81BE2AEC86CFAAEFC05D084`.
- `check:dongdong-household-preference` is mandatory in `check:quick`. Full quick, curriculum/story `52/52`, strict bundle (`52` files / `1,948,942` runtime-asset bytes), focused runtime-reference scan and `git diff --check` pass. The current manifest still says `actualChildPreference=not_collected`; this work does not count as child observation, select a final character, modify media/runtime/course, or reduce the 13 release blockers.

## 2026-07-29 - Superseded Dongdong A-E Household Display Closure

- Supervisor status review found a real stale-authority defect: although `docs/29` already classified `dongdong-child-preference-study-v1-2026-07-29` A-E as user-rejected and superseded, that old package still declared `householdPreferencePacket=true`, `householdStaticPreferenceAllowed=true`, and instructed adults to show its A-E grid. This was strong enough to cause a stale supervisor display and contradicted the current A-C ruling.
- Closed the old package without changing any PNG: top-level status is now `superseded_user_rejected_not_current_household_display`, both household-display flags are false, the old parent guide is a do-not-use notice, and README/audit/manifest point to `dongdong-lively-cute-study-v1-2026-07-29` as the only current household-only candidate. The corrected historical manifest SHA-256 is `4FEE1B1BB07411C9781ECCCF5A2D66F7E98BDCCEE2B742B407C81500E5408964`.
- Independently rechecked the current A-C package: manifest SHA-256 `ABA42537845598B1CD0A50A9A5C7850F99932F0CCD38806E9DF282552CD5E280`; display-grid SHA-256 `4933535CB9A5E68805C836A170201CB9AF8D53666B7A4F905230C4B67C4B6544`; household static preference remains the only true permission, while runtime, integration and release remain false. Runtime references to both candidate packages remain zero.
- Added a regression assertion to the existing curriculum/story audit. Deliberately restoring the stale old-package display flag produced the expected `51/52` red failure specifically at `old A-E household display is still allowed`; restoring the corrected false value passes `52/52`. `check:quick`, `check:bundle:strict` (`52` files / `1,948,942` runtime-asset bytes) and `git diff --check` pass.
- A recursive structured scan of every `concepts/runtime-candidates/**/manifest.json` found no second positive runtime, integration, observation or release authorization. The only positive display/approval value is the intended `approval.householdStaticPreferenceAllowed=true` in the current A-C package; the other text match is the negative LS06/LS07 evidence key `notAnIntendedFinalIntegrationBoard=true`, not an authorization. Review Hub rebuild remains `tasks=4 / missing=4 / accepted=0`, and the current A-C manifest still records `actualChildPreference=not_collected`.
- This is an authority and evidence-boundary correction only. It does not approve a Dongdong design, collect a household result, change media bytes, modify runtime/course/story/mastery, or reduce any of the 13 release blockers.

## 2026-07-29 - Built-In ImageGen V3 Canonical Cave Slice Independent Ruling

- Independently verified `concepts/runtime-candidates/unified-art-canonical-cave-slice-imagegen-v3-2026-07-29`: `call-events.json` records exactly four successful built-in `image_gen` calls, four unique execution ids and zero retries. The four `1672x941` PNGs, contact sheet, prompt archive and call ledger match every declared byte count and SHA-256; each workspace PNG also matches its default built-in generated-image file byte for byte. Manifest SHA-256 is `832286C813C8F58BD35C9A485B0F1AA004DEB826ED8D299AA1D1196A04E8EFC5`.
- The ledger's four `workspaceAbsolutePath` strings are mojibake and cannot be resolved. This is recorded as an evidence-metadata defect rather than silently repaired: the valid relative paths, default generation paths, output hashes and manifest cross-links still close the byte chain.
- LP01 and LP02 are retained only as source directions for the closed ecology-rock entrance, same-shot narrow slit, one grounded blank anchor, broad teaching-safe floor and rounded matte cave material. Their practical-light placement is useful, but the upper-left fixture has twin bright cells and all practicals outrank the later eye reflections; those lighting details require simplification and dimming.
- LP03 is `partial_missing_required_silhouette`: its three permanent stones persist, but the required distant wide-low architecture-occluded presence is effectively absent. Its prompt also caps the arc at `6%` width / `2.5%` height without a child-readable minimum, so the unchanged prompt must not simply be rerun.
- LP04 is `contradicted_echo_count_and_local_reveal`: the wall shows roughly five prominent grooves rather than the canonical three neutral echo channels; the two eye catches float in the slit without one readable rounded face/frill midtone plane; and a bright triangular wedge can read as a premature horn or surprise element. It is rejected as an LP04 scene and as a Dongdong face/frill reference.
- Current `docs/24`, `docs/34` and `docs/92` bytes differ from the hashes captured at generation time, but direct rereading confirms the same locked reveal sequence: sound -> architecture-occluded wide-low silhouette -> local eyes/frill -> three footprints -> full LP05 reveal. Historical input hashes remain unchanged. Focused runtime scanning finds zero V3 directory or source-file references; the only external match is one planning-only reference in `docs/99`. All approval values and `prototypeNotificationSent` remain false, and no prototype integration is requested.
- Post-ruling verification passes `check:quick` (including curriculum/story `51/51`, runtime pacing `1215`, Review Hub `92/92`, allowlist server `70/70` and release actionability `188`), `check:bundle:strict` (`52` files / `1,948,942` runtime-asset bytes), the root runtime/reference scan and `git diff --check`. The current `app.js` remains byte-identical at SHA-256 `0088765222DA4FB5DF039B7074AE293428CEB0930F3209432C0F183DB9B752B9`; the only diff-check output is the pre-existing line-ending warnings.

## 2026-07-29 - Review Hub Local-Preparation Separation

- Added a separate adult-only `项目负责人本地准备` section to `review/index.html` for the release-owner facts intake, D1/D2/D3 device-readiness intake and display-only release-engineering state. These three items explicitly do not count toward the four external human results; the hub remains `0/4 accepted`, child observation remains on hold, and all runtime, observation, integration and release approvals remain false.
- Corrected the visible intake-page identity labels from stale `364a`/`361a` text to the exact current unapproved experience candidate `365b`. Their generated data and manifests already bound `365b` plus the frozen `359a` observation baseline; no saved owner/device result was created or inferred.
- TDD red evidence reproduced the missing local-preparation section and both stale labels. A second red case proved that a plain hub entry did not pass the frozen app port, allowing an old locally saved IP/port to survive. Green evidence now passes release-owner intake `57/57`, device-readiness intake `79/79`, Review Hub browser `92/92`, and exact allowlist server `70/70`; plain and invalid-port hub entries force `appPort=4199`, while an explicit valid diagnostic port remains available for tests. The server adds only the two intake directories' six exact files each; runtime routes remain `0`, write methods remain `0`, external requests remain `0`, and the desktop/390px screenshots have no horizontal overflow.
- This changes review infrastructure and supervisor facts only. It does not modify `app.js`, child-visible runtime, lesson order, note names, mastery/session rules, media bytes, the frozen `359a` evidence package or the 13 release blockers.

## 2026-07-29 - Senya Canon Name And Teacher Review V7 Sync

- Accepted `森芽星` only as the formal name of the already-existing breathable ecology planet. The Season One route remains Moon Outpost -> Star Bridge -> Senya Breathing Garden -> Senya Underground Echo Cave -> Singing Home; Chapter 4 stays at Dongdong's temporary resonance-stone outpost, Mingshi remains Dongdong's origin and future IP expansion, and the unapproved `共鸣航线`/Season One Mingshi-flight inference was explicitly rejected. Runtime code, chapter order, lesson ids, pitch/register routes, input budgets, reveal timing, session/mastery rules and approval values did not change.
- TDD evidence: the updated coherence gate first failed `50/51` because the live canon still treated Senya as forbidden, then passed `51/51` after the decision record and current authoritative roadmap, story, character, equipment, pacing, Chapter 4/5 and visual sources were synchronized. The design task `019fabda-c5b5-7423-905d-cb69bfabb6fb` received a record-only correction and was told to remain idle pending the existing A/B/C household preference result.
- The first post-sync `check:quick` correctly failed when teacher-review v6 no longer matched the live `docs/34` and `docs/35`. V5 and v6 were not overwritten. After the 365b/365a/364b/364a/359a status-chain correction in `docs/34`, the separate current `dist/review/star-dino-teacher-staged-review-359a-v7.zip` was deterministically refreshed and now contains 21 allowlisted files plus one embedded manifest, `4,879,166` bytes, SHA-256 `76F68388D1D1724EABD48201601C40AAE02EB913143D18FAB930A7E8749EB3D8`; v5 remains `DB2992...9857`, v6 remains `A36A27...885B`.
- V7 retains the exact frozen 359a observation manifest, seven reference screenshots, r4 A13/B10/C10 questions, all-missing teacher results and all-false approvals. Package verification passes two byte-identical builds and six tamper rejections. Review Hub exposes only v7 as current and passes browser `80/80` plus allowlist-server `57/57`, with four tasks, zero accepted real results, three exact packages, zero runtime routes and zero accepted write methods.
- Final verification passes `check:quick`, `check:bundle:strict` (`52` files / `1,948,942` runtime-asset bytes), curriculum/story `51/51`, runtime pacing `1215`, curriculum facts `79`, release actionability `188`, maturity current-state `62`, copy integrity and `git diff --check`. Strict release maturity intentionally remains nonzero with the same 13 release blockers.

## 2026-07-29 - Dongdong Household Study And Future Voice Attribution Narrowing

- Replaced the rejected A-E household-study trigger with `concepts/runtime-candidates/dongdong-lively-cute-study-v1-2026-07-29`. Independent media review passes A `Curious Listening`, B `Slowly Approaching`, and C `Steady Happiness` against the original Dongdong visual mother and Xingya's shared toy/clay rendering anchor: each retains one nose horn, two brow horns, four legs, a complete tail, the low-wide body and the mint/warm-yellow/cream identity system. All 7 declared hashes match; three raw provider paths remain byte-identical to the package copies; runtime and `assets/runtime` references are 0.
- The A-C grid is approved only for one neutral, non-identifying household static-preference question. Actual preference, in-product child evidence, external similarity, copyright/release rights, runtime, integration, observation and release approval remain missing or false. No candidate image, runtime file or approval bit changed.
- Resolved two existing future-copy attribution gaps without adding or rewriting a literal: Dongdong owns the complete TH03 sentence `咚咚一下，星芽一下。`; Xingya owns `用我们刚学会的方法，让花园唱起来！` in the first core TH08 finale only, and the later encore does not replay it. TH07 remains `copy_missing`. The 39-lesson inventory is now `25 recording_ready_unrecorded / 0 dynamic_ui_only / 13 teacher_gated_provisional / 1 copy_missing`, with the same 57 unique fixed literals and no recording/runtime authorization.
- Focused verification passes: curriculum/story `51/51`, copy integrity `9` files, curriculum status facts `77`, syntax for the updated audit, and `git diff --check`. This changes no note order, input budget, mastery/session rule, phase settlement, reveal timing, media byte or child-visible runtime copy.

## 2026-07-29 - Teacher Review V6 Canonical-Sync Package

- The Dongdong/Mingshi story synchronization changed the live `docs/34` and `docs/35`, so the old teacher v5 package correctly stopped `check:quick` instead of silently presenting stale future-chapter facts. The historical ZIP was not rebuilt or overwritten: `dist/review/star-dino-teacher-staged-review-359a-v5.zip` remains exactly `4,878,528` bytes / SHA-256 `DB2992DDDACC37738FD45DFFA0D0CB8518A1AFD00EFEC26FAEB25FC8D8F39857`.
- Built the separate current package `dist/review/star-dino-teacher-staged-review-359a-v6.zip`: 21 allowlisted files plus one embedded manifest, `4,878,974` bytes, SHA-256 `A36A27DC6B0CEFB2F0494233C6197832D569792A9D6A71F2109A120793ED885B`. It retains the exact frozen 359a observation manifest, seven screenshot hashes, r4 protocol, A13/B10/C10 question set, all-missing teacher results and all-false approvals; only the synchronized future-chapter contracts and package-version wording changed.
- Strengthened `tools/package_teacher_staged_review.py`: current-page source-document and page-file hashes must match before packaging; v5 is verified read-only from its fixed outer hash and self-contained manifest rather than mutable live docs; attempting to target the v5 path for a build is rejected. V6 rebuilds are byte-identical `2/2`, and content, approval, observation-binding, unsafe-path, timestamp and missing-file tampering is rejected `6/6`.
- Review Hub now exposes only v6 as current and treats v1-v5 as historical. Browser audit passes `80/80`; the allowlist server passes `57/57`, serves three exact review packages, exposes zero runtime routes and accepts zero write methods. Unified human-return self-test passes `31` assertions with `25` tamper rejections, and real-page integration passes `19`. `npm run check:quick`, curriculum/story `51/51`, maturity current-state `62` facts, release actionability `188`, strict bundle (`52` files / `1,948,942` runtime-asset bytes), copy integrity and `git diff --check` pass. The mature-app audit still reports the same 13 release blockers and all four external results remain missing.
- This is review-infrastructure and fact-synchronization work only. It changes no runtime, lesson order, note route, input budget, mastery/session rule, reference screenshot, media byte or observation result; it grants no teacher, child, runtime, integration, observation or release approval.

## 2026-07-29 - Built-In ImageGen V2 Scene Slice Independent Rejection

- Independently verified `concepts/runtime-candidates/unified-art-scene-slice-imagegen-v2-2026-07-28`: four source PNGs plus the contact sheet match all declared byte counts and SHA-256 values; all three cited specification hashes match the live files; the generation ledger remains four built-in `image_gen` calls with zero retries; runtime references remain zero and all four approval values remain false.
- The generator self-audit overstates MAP-V2 as passed. It is retained only as `partial_composition_reference_only`: the material, palette, broad geography, completed near bridge and broken future bridge are useful, but one static all-lit scene does not prove current/sleep/completed map states, installed lesson results or one-current-task behavior.
- LP01, LP03 and LP04 are rejected for scene semantics. The cited canonical sources require LP01's cave entrance to remain closed, LP02 to open only a slit and install the first anchor stone, LP03 to retain the permanent three-stone foundation, and LP04 to retain those stones plus neutral echo channels before the eye/frill reveal. The V2 production prompts instead explicitly require no door/opening mechanism, no arranged stones and no route, so the missing world causality is prompt-level and cannot be repaired by labels or runtime overlays.
- LP01 additionally contains four repeated warm wall recesses that compete with later eye cues. LP04's intended eyes are much weaker than those lamps and the detached gold semicircle does not read reliably as one local rounded-frill/face mid-plane. The calm cave camera, matte blue-gray/deep-teal material, flat teaching-safe floor and non-horror lighting may be retained only as direction references.
- Supervisor evidence is in `concepts/runtime-candidates/unified-art-scene-slice-imagegen-v2-2026-07-28/supervisor-independent-review/`. A V3 source-only brief was dispatched to the existing built-in-image task for exactly four canonical cave states, four calls and zero retries; MAP is not regenerated. No prototype integration was requested or approved.

## 2026-07-29 - 365b Chapter 3 Parent-Challenge Test Migration

- Accepted the completed test-only migration in eight current Chapter 3 browser modules: 24 real parent-gate clicks map one-to-one to 24 calls to the existing `completeParentChallenge()` helper. Six current modules now use `canonicalC1C2History()` instead of a synthetic one-row `C2-03` history, closing all seven previously blocked functional/media-zone commands without weakening the single-task course director.
- Replaced eight copy-dependent assertions with direct journey checks: LS04 four, LS05 three, and LS06/LS07 one. They verify `childJourneyPlan()`, `#mapShell` journey state, the unique visible/enabled/current Garden entry, exact session/resume identity, progress, real parent evidence, and letter-note-only parent text.
- Focused gates pass: LS04 `39/39`, LS05 `66/66`, LS06/LS07 `64/64`; LS05/shared-C3/LS06/LS07 media-zone runs each cover six viewports with zero geometry failures and zero browser errors. Cross-regressions pass: Chapter 3 visible `76/76`, LS08 `131/131`, course director `78/78`, child note names `286/286`, and parental challenge `23/23`.
- Supervisor review found one test-only screenshot race in LS06: correct `pair-compare` evidence could expire while the screenshot was captured before pause/re-entry. An unchanged rerun passed; moving only that screenshot after the same-session re-entry assertion produced three consecutive writer passes and an independent supervisor `64/64`. No timeout, assertion, repair rule, lesson, or runtime behavior was relaxed.
- Final supervisor `check:quick` and `git diff --check` pass. The three frozen runtime hashes, 365b manifest hash, four false approval values, and four restored media-zone JSON hashes remain exact; the zone JSON files have no worktree diff.
- Supervisor ruling: `docs/97_CHAPTER3_PARENT_CHALLENGE_TEST_MIGRATION_SUPERVISOR_REVIEW_365B.md`. All four approval values remain false.

## 2026-07-29 - 365b Supervisor Follow-up Recheck

- Re-ran the current 365b browser reference against the live Star Dino Workshop workspace after the parallel WIP settled: parental challenge `23/23`, PWA shell `11/11`, observation build identity `9/9`, parent history/free piano `20/20`, parent data reset `13/13`, microphone lifecycle `17/17`, MIDI/microphone coexistence `9/9`, iPad accessibility `43/43`, motion `19/19`, and free-piano safety `17/17`.
- Re-ran static boundaries: strict bundle (`52` files / `1,948,942` runtime-asset bytes), privacy current-state (`66` facts, 5 blockers), maturity current-state (`62` facts, 13 blockers), and release-engineering (`150` assertions, one dirty-worktree warning). `check:quick` passed end-to-end, including curriculum/story `50/50`, runtime pacing `1199`, and release actionability `188`.
- Revalidated the 365b static backup and source snapshot independently: backup manifest verification, workspace comparison, and `5/5` tamper rejection; isolated static recovery `10/10`; source snapshot self-test/verification and source recovery `20` assertions. Archive SHA-256 remains `015F9957CBC3CFA751140ADD05936CAB2CB2EE07201DBF230E4C51F5D4148B25`; source archive SHA-256 remains `07F30E6730FFC16336B7F6861B2FC4CE31BD4E487142805BE6E7D12E7E941FB9`.
- Original-size screenshot review found no contradiction in the cancellation, short-hold, success, active-lesson, or reduced-motion states. The result is accepted as a current, unapproved Web reference only; no native gate, child observation, runtime integration, media approval, or release approval is granted. `runtimeApproval=false / integrationAllowed=false / observationAllowed=false / releaseCleared=false` remains mandatory.

## 2026-07-28 - 365b Parent Challenge Pointer-Cancel Correction

- Candidate: `overhaul-365b-parental-challenge-pointer-cancel-correction`; 365a remains frozen and its candidate manifest, static backup, and source snapshot were not modified. The current candidate manifest is `docs/30_PARENTAL_CHALLENGE_POINTER_CANCEL_CORRECTION_CANDIDATE_365B.json` / `AD4A4B8AE4E6A6A681D43498E0F42C25CE0B974B3D588322EBC307F73ADB8055`.
- TDD red evidence: the supervisor `pointercancel` assertion and the new `lostpointercapture` companion both failed under a deliberately delayed two-second hold callback, producing `21/23` and opening `parentModal` after a system cancellation. Green evidence: `check:parental-challenge` is `23/23`; either cancellation clears the outstanding hold and re-focuses a newly randomized answer while parent access remains locked.
- Direct evidence passes: PWA shell `11/11`, observation build identity `9/9`, parent history/free piano `20/20`, parent reset `13/13`, microphone lifecycle `17/17`, MIDI/microphone coexistence `9/9`, free piano safety `17/17`, sessions `74/74`, clean state `124/124`, iPad accessibility `43/43`, and motion `19/19`. Screenshots are in `screenshots/parental_challenge_365b/`, including initial, wrong/short hold, successful parent panel, active lesson, and reduced-motion originals.
- Strict bundle passes with `52` files and `1,948,942` runtime-asset bytes; `git diff --check` exits successfully with only pre-existing line-ending warnings. Runtime assets retain 29 files and identical hashes.
- Supervisor fact migration now binds the exact 365b manifest while retaining the real chain `365b -> 365a -> 364b -> 364a` and the independent 359a observation baseline. `check:quick`, `check:privacy-state`, `check:bundle:strict`, release engineering `150`, maturity current-state `62`, parental challenge `23/23`, PWA `11/11`, build identity `9/9`, static backup tamper matrix `5/5`, and isolated static recovery `10/10` pass. The 365b source/control snapshot is independently generated and verified; all approval fields remain false and maturity still reports 13 release blockers. Independent ruling: `docs/96_PARENTAL_CHALLENGE_POINTER_CANCEL_SUPERVISOR_REVIEW_365B.md`.
- All approval values remain false. This is a Web parental-challenge reference correction only, not a qualified native parental gate or release approval.

## 2026-07-28 - 365a Candidate Authority And Recovery Closure

- Migrated release-engineering, curriculum-status, actionability and maturity fact checks to the exact current Web reference candidate `overhaul-365a-web-parental-challenge-reference`, while retaining 364b as the frozen journey-recovery predecessor, 364a as the frozen input predecessor and 359a as the sole adult-iPad/observation baseline. No candidate hash or evidence is interchangeable across those roles.
- Corrected one maturity-audit constant from the nonexistent `D2_PRIMARY_10_11_INCH_IPAD` to the canonical device-template ID `D2_PRIMARY_10_11_IPAD`. The device template, generated intake page and browser audit already used the canonical ID; the fix changes no device result or approval.
- The deterministic 365a static backup remains 52 runtime files / 53 ZIP entries: manifest SHA-256 `E03E03A98BFCC1266DD8DD5C6BF75C641378114C4F542591D230F92326CC66A9`, archive `2,359,182` bytes / SHA-256 `30E35D79DEE23892CB645BEAC7F0E99476793123060D169157746CD248FCFEAF`. Its isolated static slot rehearsal passes `10/10` and all approval fields remain false.
- Rebuilt the 365a source/control snapshot after correcting its verifier command to pass the exact candidate ID. The snapshot contains 1,065 source files; verification and tamper self-test pass, and extraction without `node_modules` passes `20/20` plus syntax, note matrix, copy, competitive facts, curriculum facts, curriculum/story, runtime pacing and strict-bundle checks. Exact source ZIP metadata remains machine-owned by `docs/30_PROJECT_SOURCE_SNAPSHOT_365A.json` to avoid a self-referential documentation hash.
- Fresh verification passes: curriculum facts `75`, curriculum/story `50/50`, runtime pacing `1199`, release actionability `183`, release-owner intake `56/56`, device-readiness intake `78/78`, Review Hub browser/server `79/56`, release engineering `149`, maturity facts `62`, full `check:quick`, and strict bundle `52` files / `1,948,942` runtime-asset bytes. The hub still has `0/4` accepted external results.
- This closes only internal attribution and recovery-preparation defects. The mature-app audit still reports 13 release blockers; privacy still reports five blockers; the shared worktree remains dirty. No runtime behavior, course note/order, mastery/session rule, asset byte, external evidence, native signing state or approval field changed. `runtimeIntegrationAllowed=false / observationAllowed=false / releaseCleared=false` remains mandatory.

## 2026-07-27 - Native iPad Early Prototype Boundary Correction

- Corrected the false binary claim that Star Dino Workshop had no native artifact. The sibling `G:\新电脑E盘\个人\大顺\钢琴\ipad_star_dino_workshop` is the same product family and contains 19 files, 18 non-ZIP files and 10 Swift files. It remains read-only. The full path/byte/SHA-256 inventory is `docs/94_NATIVE_IPAD_PROTOTYPE_BOUNDARY_MANIFEST.json`; the human ruling is `docs/94_NATIVE_IPAD_PROTOTYPE_COMPATIBILITY_AUDIT_2026-07-27.md`.
- Independent source inspection classifies the project as `native_prototype_present_nonqualifying`: its eight old levels make M03 a single D input instead of canonical D-C listening; it uses five legacy dinosaur identities, exposes solfege on child target cards and keys, offers direct previous/next navigation, stores progress only in memory, and has no formal session/`played/stable/retained`, PrivacyInfo, parental gate, native tests, signing Team, release archive or final art. SwiftPM targets iOS 16 while the Xcode project targets iOS 17. The README's microphone-resume claim also lacks a disconnect restart branch.
- Core MIDI discovery/reconnect/device-name/note filtering is retained only as `core_midi_reusable_candidate`; the local pitch detector remains `microphone_pitch_reusable_candidate_requires_physical_validation`. Neither is runtime-approved. The native source contains zero Keyboard Captain identifiers, and no file from `G:\DevProjects\MidiInputProbe`, `keyboard_captain_*`, `com.dashun.midiprobe`, 琴键小队长 or MatePad was used as evidence.
- TDD evidence: the new boundary gate first failed on the absent manifest, human audit, package wiring and old maturity output `native artifacts=0`. After the bounded correction, `check:native-ipad-prototype` passes 85 assertions; release actionability passes 178 with the same 13 blockers and the native row changed only from `missing` to `partial`; maturity current-state passes 61 facts and reports `native prototype=present_nonqualifying`. Field-return templates remain fail-closed at `3/3`, and the refreshed device-readiness page still treats `nativeCandidateId=missing` as “no qualified canonical native candidate.”
- Release engineering preflight passes 135 assertions with the dirty-worktree warning and now states `native_prototype_boundary_manifest_passed / sibling_native_not_in_web_source_snapshot`. The 364b Web source snapshot contains this audit and its machine ledger but deliberately excludes sibling native bytes; exact final source archive metadata remains machine-owned by `docs/30_PROJECT_SOURCE_SNAPSHOT_364B.json` to avoid a self-referential documentation hash. The frozen 364b candidate manifest and static runtime archive are unchanged.
- This correction grants no runtime, observation, physical-device, TestFlight, App Store or release approval. The current critical path remains the exact 359a adult physical-iPad Safari preflight. `runtimeIntegrationAllowed=false / observationAllowed=false / nativeRuntimePassed=false / testFlightAllowed=false / appStoreSubmissionAllowed=false / releaseCleared=false`; all 13 mature-app blockers remain open.

## 2026-07-27 - 364b Deterministic Static And Source Recovery

- Added a current-candidate recovery pair without modifying the frozen `docs/30_COURSE_CONTINUITY_NOTE_IDENTITY_CORRECTION_CANDIDATE_364B.json`. The static manifest is `docs/30_PROTOTYPE_BACKUP_364B.json`, SHA-256 `AE66A6F8174ADDEA9345B401C91C8C5D4C42ED96796EAF3CA525AA31DFB42622`; its 52-file/53-entry ZIP is `2,356,915` bytes, SHA-256 `4B5C5A392F0E367783880F63F15DE7401ECE8BBB32E037DA536CB463CF2FCACA`. Two complete builds are byte-identical and five tamper classes are rejected `5/5`.
- Current 364b static verification deliberately compares the archive with the live workspace; it does not use `--archive-only`. The isolated 364b-to-359a-to-364b slot rehearsal passes `10/10`. Frozen 364a and historical 362a retain their own archive-only recovery paths, while 359a remains the only adult-iPad and child-observation baseline.
- The paired source/control snapshot is owned by `docs/30_PROJECT_SOURCE_SNAPSHOT_364B.json` and `dist/release-engineering/star-dino-source-snapshot-364b.zip`. Repeated builds are byte-identical; isolated extraction without `node_modules` passes `20/20` plus syntax, note matrix, copy, competitive facts, curriculum facts, curriculum/story, runtime pacing and strict-bundle gates. The snapshot excludes `.git`, `dist`, `node_modules`, `private-recordings`, screenshots and its own external manifest.
- These results set only `currentCandidateStaticBackup=true / currentCandidateSourceSnapshot=true`. They do not change the 13 release blockers or approve runtime, observation, physical devices, teacher/child evidence, visual/audio rights, deployment rollback, native signing, TestFlight or App Store release; `rollbackExecution=false / releaseCleared=false` remains mandatory.

## 2026-07-27 - Full-Course Voice Readiness Supervisor Correction

- Independently reviewed the media task's `docs/93_FULL_COURSE_VOICE_RECORDING_READINESS_AUDIT.md` rather than accepting its reported `24 / 0 / 12 / 3` status counts. Direct recomputation confirms all `39` canonical lesson IDs in exact `docs/24` order, `56` fixed-literal evidence entries, `56` unique literals, `0` duplicates, and `0` literals missing from `docs/24` plus the locked M01-M03 V4 source.
- Corrected two attribution classifications without rewriting any line. LP04's child-facing heading remains `剪影说`, but the same canonical section explicitly says Dongdong uses Mi-Re-Do, so its existing line is attributable to Dongdong and is `recording_ready_unrecorded`. TH03 says only `角色只说一句`, so its performer or two-speaker split remains unresolved and is `copy_missing`. Final lesson counts are `25 recording_ready_unrecorded / 0 dynamic_ui_only / 11 teacher_gated_provisional / 3 copy_missing`.
- Added a fail-closed machine check before changing the inventory. It reproduced the stale classification at curriculum/story `49/50`; after correction the gate passes `50/50` and now locks the 39-row order, status counts, LP04/TH03 attribution boundary, 56 unique source literals, false approvals, runtime non-reference, product isolation, and the `docs/README.md` index entry.
- The corrected inventory is `22,828` bytes / SHA-256 `C40015587EFA46B75A96EBA44CE934208D4496D097398C7B8C06F574A94A5D08`. It is accepted only as a source inventory. Voice authorization, recording, human listening, runtime integration and release clearance all remain missing or false; no runtime, lesson text, target note, input route, mastery rule, media byte or child-visible reveal changed.

## 2026-07-27 - Review Hub Current/Frozen Candidate Isolation

- Corrected the external-review execution center's version presentation so the live unapproved experience is explicitly `overhaul-364b-course-continuity-and-note-identity-correction`, the evidence-bound frozen observation baseline remains `overhaul-359a-map-shell-scroll-reset`, and the separate visual-screening candidate remains 361a. The page says that tests, screenshots and returns cannot substitute across these versions; 359a is labeled `冻结观察基线`, not the current runtime candidate.
- Added the aggregate `check:review-hub:all` script and made it mandatory inside `check:quick`. It deterministically rebuilds the page before running both browser and allowlist-server audits, preventing a stale generated page from passing against newer source labels. Current results are browser `79/79`, four tasks, zero accepted results and zero external requests; server `56/56`, three exact packages, zero runtime routes and zero accepted write methods.
- A final maturity run exposed stale hard-coded hub counts `73/55` in the supervisor audit. The mature-state check now verifies the 364b manifest path/hash/app hash and false approval fields in the hub manifest, browser evidence and server evidence, while retaining exact 359a and 361a boundaries. Mature current-state passes `59` facts with the same `15` requirements and `13` release blockers.
- This is evidence-attribution and audit-infrastructure work only. It approves no current runtime, external result, observation, media integration or release; all four external review results remain missing.

## 2026-07-27 - M01-M03 Canonical Recording-Copy Alignment

- Cross-checked the 20 fixed, unrecorded V4 voice lines against the human-readable M01-M03 lesson book. Seven exact literals were absent: the M01 and M02 scene invitations, all three natural-rest lines, and the two M03 target-specific repair lines with their final punctuation. The lesson book also described the M03 repair lines as examples even though the recording contract requires fixed copy.
- Added a fail-closed curriculum/story assertion before changing the lesson book. It reproduced the defect at `48/49` and listed all seven missing literals. The canonical lesson book now includes only those already-frozen V4 lines at their existing invite, repair, or rest boundaries; M03 now calls the two repair lines fixed rather than examples.
- Direct recomputation now reports `20` recording rows, `20` unique IDs, `20` unique literals, and `0` literals missing from the canonical M01-M03 section. Curriculum/story returns to `49/49`; audio contract passes `22`; the full `npm run check:quick` passes; and the deterministic 359a teacher-review package remains byte-identical at SHA-256 `DB2992DDDACC37738FD45DFFA0D0CB8518A1AFD00EFEC26FAEB25FC8D8F39857`.
- This is recording-copy preparation only. It changes no runtime, target note, input, session/mastery, phase settlement, media byte, observation baseline, or approval field. Voice authorization, recording, human listening and runtime integration remain missing; the mature-app audit must continue to report the same 13 release blockers.

## 2026-07-27 - 364b Course Continuity And Note Identity Independent Review

- Independently closed the narrow `overhaul-364b-course-continuity-and-note-identity-correction` review. The homepage no longer presents the same repeated lesson as both just-completed and current; Garden rest copy follows the persisted one-, two-, or three-leaf state; LP04 black-key accessibility uses `pitchName`; S01, LS01-LS08, and LP01-LP04 homepage cues use their exact letter-note targets; and unknown lessons do not invent a `C D E` cue. Ordinary child surfaces remain letter-name-only, with solfege limited to character speech.
- Fresh focused browser regressions pass: Chapter 4 LP04 `28/28`, child note names `286/286`, child course director `78/78`, Chapter 3 visible `76/76`, home single task `23/23`, sessions/retention `74/74`, child nonblocking feedback `62/62`, and iPad accessibility `43/43`. The nonblocking suite's first invocation reached only the outer 124-second command limit; the complete rerun exited 0 in 139.9 seconds with every assertion passing.
- Full `npm run check:quick` passes, including curriculum facts `75`, curriculum/story `49/49`, runtime pacing `1199`, release actionability `170`, release engineering `105`, privacy facts `65`, and audio `22`. Strict bundle passes with `52` files and `1,948,942` runtime-asset bytes. `git diff --check` reports no whitespace error and only existing line-ending warnings.
- Exact live hashes match `docs/30_COURSE_CONTINUITY_NOTE_IDENTITY_CORRECTION_CANDIDATE_364B.json`: manifest `0594D9F261B8C517295FF6E371F69722D468F559369C793C52F4E5B8D67C227B`; `app.js` `4847619EA121F7E4634E063A559DDDF57D24CFC7824E5C6CC4803E71BDBFF948`; `index.html` `29B6950C8C87C53215F0B30E138C83FFC8A8D615993905A081D5EF0EC810737C`; and `service-worker.js` `1F4F116AE7DE00C09FCA944D2F4942825A9BDDBA4919E134FF9DFC790B2E7D8D`.
- The frozen 364a input-routing predecessor remains separate recovery evidence, and the frozen 359a package remains the only adult-iPad/child-observation baseline. A later release-engineering entry adds an independent 364b static backup and source snapshot; neither may be presented as 359a observation evidence. Runtime, integration, observation, and release approvals remain false; physical MIDI/acoustic microphone/iPad Safari, teacher and child review, final voice/art rights, native shell, and store evidence remain missing.

## 2026-07-27 - M08 Background Source-Thread Provenance Recovery

- Recovered the exact M08 flat-workshop background generation prompt, `gpt-imagegen` tool family, zero reference-image arguments, source output, five source-thread event hashes and the exact PNG-to-WebP `ffmpeg` command from Star Dino Workshop thread `019f4aa6-edba-7843-a835-c4b930a388ff`. The machine record is `assets/generated/m08-flat-moon-workshop-bg-v1-generation-record.json`; no other product was used as evidence.
- Independently streamed the `3,073,264,124`-byte source JSONL and recomputed raw UTF-8 line hashes `74305`, `74306`, `74322`, `74372` and `74373`: `5/5` match the record. The 1,193-character prompt hash is `3CA5761C60FFC12AB5FBA51C050E2AE36982A87D25211BABAF8B0B266B5FA219`; the exact derivation-command hash is `EF4E9BDF4D3CCFBC4751532452910D1972719D5461D6029F328196BE7FEE4774`.
- Reverified source PNG `2,098,043` bytes / SHA-256 `4B2924720481046C016648FED6786E211F9F117D12D8E0450B10F5DC14CF31C2` and runtime WebP `169,410` bytes / SHA-256 `6EEDB13B27DAC6A1377C091A5B6FFC69FD71318113309CBCABD105CEA7797857`. The generation output's reported `1536x1024` versus observed source `1860x845` remains an unexplained metadata mismatch; no intervening edit call was found and no explanation was invented.
- The 359a JSON matrix remains byte-frozen at SHA-256 `BB5744F973939A5962456C7467605F437DE7FF851D73AA21D25CD72A2E82BA86` because it is an exact R4/R5 external-review input. The current effective overlay changes only this asset from historical `named_source_prompt_missing` to `recovered_prompt_derivation_provider_model_rights_missing`; exact provider/model, generation ID, operation-specific terms receipt, rights review and external similarity remain missing.
- Verification passes: source provenance `903`; field-return templates `3/3`; curriculum facts `75`; maturity current-state `59` facts with the same `13` release blockers; full `npm run check:quick`; production bundle `52` files / `1,948,942` runtime-asset bytes. R4 and R5 visual-review ZIPs remain byte-identical at their existing hashes.
- This is evidence recovery only. It changes no runtime/media byte, lesson, note route, input budget, mastery/session semantics or approval value. Runtime, integration, observation and release approvals remain false; release visual clearance remains `0/27`.

## 2026-07-27 - 364a Static/Source Recovery And Teacher Packet Fact Refresh

- Corrected live documentation that still called 359a the current browser candidate: 364a is now consistently identified as the current unapproved experience candidate, while the exact 359a package remains the sole adult-iPad and directional-child observation baseline. No runtime, lesson, mastery or approval field changed.
- Built a deterministic 364a static backup with 52 release files and 53 ZIP entries. Two builds are byte-identical; manifest SHA-256 is `A6F007127A80405F7729950F08766C1EF5DC4A5BFB73F14A549D99588723E7EA`, archive SHA-256 is `DDC75C2DCE15702E7C5C6A2EDFA73F10F84AADC422785651C43F9E69BC0D421F`, tamper rejection is `5/5`, and the isolated 364a-to-359a-to-364a slot rehearsal is `10/10`.
- Built the 364a source/control snapshot with 1,053 files. Repeated builds are byte-identical; the exact archive hash remains machine-owned by `docs/30_PROJECT_SOURCE_SNAPSHOT_364A.json` to avoid a self-referential documentation hash. Isolated extraction without `node_modules` passes `20/20` assertions and eight core source gates. Release preflight passes `104` assertions while explicitly retaining the dirty-worktree warning and `releaseCleared=false`.
- Because `docs/34` is an allowlisted teacher-packet source, the old v5 ZIP correctly failed closed after the fact-source correction. The packet was rebuilt through its deterministic builder without changing questions, frozen 359a identity, seven reference images or approval state. The refreshed 21-file/22-entry ZIP is `4,878,528` bytes, SHA-256 `DB2992DDDACC37738FD45DFFA0D0CB8518A1AFD00EFEC26FAEB25FC8D8F39857`, builds identically `2/2`, and rejects six tamper classes `6/6`. Real teacher results remain missing.
- The 13 release blockers remain unchanged. Static/source recovery does not prove physical MIDI, acoustic microphone, iPad Safari, teacher/child learning, rights clearance, native signing, persistent-data migration or deployment rollback.

## 2026-07-27 - 364a Candidate Authority Migration

- Repaired a governance-only stale-binding defect: the maturity and pacing audits still treated the historical 362a map prototype as the live app after the independently reviewed 364a MIDI/microphone correction became current. `docs/80_RUNTIME_PACING_METADATA_CONTRACT.json`, its audit, the maturity audit and the current-status documents now bind the live browser experience to `overhaul-364a-midi-microphone-routing-correction` / `docs/30_MIDI_MIC_ROUTING_CORRECTION_CANDIDATE_364A.json` / `app.js 59DE21BD...E62EB`.
- The frozen `overhaul-359a-map-shell-scroll-reset` candidate remains the sole adult iPad and directional-child observation baseline. Historical 362a V6 bytes remain a visual/recovery record: its 51-file static backup is now compared to its own frozen app, index and service-worker hashes, never to the mutable 364a runtime.
- Local release-owner, device-readiness and privacy-inventory facts were confirmed against 364a while keeping their 359a baseline binding. The device matrix explicitly rejects treating the 364a browser candidate as 359a physical-iPad evidence. No observation, integration or release approval changed.
- Verification passes: runtime pacing `1199/1199`; maturity current-state `58` facts with the unchanged `13` release blockers; full `npm run check:quick`; strict bundle `52` files / `1,948,942` runtime-asset bytes; and `git diff --check` with no whitespace error.
- This migration changes no runtime behavior, course order, note route, input budget, session/mastery evidence, asset byte or approval boolean. It only restores correct candidate attribution for future audits and handoffs.

## 2026-07-27 - 364a MIDI And Microphone Routing Independent Review

- Independently reviewed the Claude Code session `019fa15e-f6df-7cf3-9a19-7a854110577f` against the Star Dino Workshop runtime. The external report correctly identified disconnect-state, parent-device-copy and raw-MIDI-number defects, but its proposed listening-route exception was rejected: one physical piano key must not create duplicate evidence in M03, Garden or Chapter 4. Its example for MIDI 72 was also corrected from A to C.
- The runtime candidate is `overhaul-364a-midi-microphone-routing-correction`: a bounded 1500 ms queue suppresses only a microphone onset with the exact recent MIDI pitch; a different pitch remains eligible. Disconnected Web MIDI ports are ignored and have handlers cleared; an all-device disconnect clears transient MIDI state and returns the child input label to screen keys. Device names and no-device, permission-denied, generic-failure and disconnect messages remain parent-only and are not persisted.
- Fresh focused browser verification passes: MIDI/microphone coexistence `9/9`, input reliability `12/12`, free-piano safety `17/17`, parent history/free piano `20/20`, microphone lifecycle `17/17`, AUDIO-B `46/46`, AUDIO-C `46/46`, LP04 input `8/8`, child course director `70/70`, and PWA shell `11/11`. The out-of-range MIDI check presents 72 as the letter name C, not a raw number.
- The release-owner and physical-device readiness intake chains now bind the current 364a manifest and retain 359a only as the frozen observation baseline. Release-owner verification passes `20` assertions and its page `56/56`; device readiness passes `22` assertions and its page `78/78`. Both remain local-only and fail closed. Release actionability passes `165` assertions with all `13` blockers unchanged.
- Full `npm run check:quick` and strict bundle pass; the strict bundle contains `52` files and `1,948,942` runtime-asset bytes. Privacy current-state passes `65` facts while preserving `5` blockers. `git diff --check` reports no whitespace error and only pre-existing line-ending warnings.
- This review does not approve runtime, observation or release. Physical MIDI hot-plug, simultaneous acoustic microphone behavior, iPad Safari/native lifecycle, teacher and child evidence remain missing. Course order, note routes, input budgets, octave strictness, session/mastery semantics, media bytes and LP05+ remain unchanged; all approval booleans remain false.

## 2026-07-26 - 362a Isolated Source Snapshot Recovery Rehearsal

- Added `tools/source_snapshot_recovery_rehearsal.py` and `npm run check:source-recovery:362a`. The gate validates the exact 362a source snapshot, safely extracts it into a Python-managed system temp directory, proves the recovered file set and hashes, requires Node.js 20+, and runs eight source-only core checks without `node_modules`. It passes `20/20` and cleans its own temp copy.
- The recovered copy passes syntax, note matrix, copy, competitive facts, curriculum facts, curriculum/story `44/44`, runtime pacing `1199`, and strict bundle `51` files / `1,948,942` runtime-asset bytes. Its `app.js` remains SHA-256 `AB343F1BAEE0D7CD7724AFD37D0BB9342AF1B467898D3311D70BB948F904C508`.
- A separate dependency rehearsal found an honest boundary: offline-only `npm ci` failed because the local npm cache lacked `source-map-js@1.2.1`; locked ordinary `npm ci` then installed 9 packages and the same eight checks passed. `package-lock.json` SHA-256 is `B2617DB01D017E0EC1CF27AF5D511E83B9CF4F397174602AFB39FD7EC3620B99`. Full offline development restoration therefore remains partial.
- The source recovery gate is now part of release-engineering preflight. It does not prove browser-review packages, physical devices, real deployment, localStorage/native schema migration, signing, rollback execution or release. No child runtime, course order, note sequence, media, audio, mastery or approval bit changed.

## 2026-07-26 - Supervisor Local Reverification After Claude/Fable Cancellation

- At the user's direction, Claude Code / `claude-fable-5` is abandoned for this project because the probe was unstable. The read-only probe was terminated without an audit result; no Claude output was accepted, no pass was recorded, and no retry or Claude-derived implementation is scheduled.
- Current authority remains the unapproved `overhaul-362a-dark-scifi-map-v6-prototype`, with `app.js` SHA-256 `AB343F1BAEE0D7CD7724AFD37D0BB9342AF1B467898D3311D70BB948F904C508`. The frozen directional-observation baseline remains `overhaul-359a-map-shell-scroll-reset`. The prototype/UI task's last 361a status message is stale task telemetry, not a reason to disturb the frozen task or override the 362a manifests.
- Local independent gates pass: prior full `check:quick`; strict bundle `51` files / `1,948,942` runtime-asset bytes; maturity current-state `58` facts / `15` requirements / unchanged `13` release blockers; home single task `23/23`; child course director `68/68`; child nonblocking feedback `62/62`; note-name-only `286/286`; world-map V6 `103/103`; curriculum/story `44/44`.
- `docs/80_RUNTIME_PACING_METADATA_CONTRACT.json` was rechecked against `app.js` by the dedicated runtime-pacing audit: `1199` checks pass across `38` units, with `23` current runtime units and `15` future, conditional or optional units. `C3-X01`, LP05+, Chapter 5 and the naming-retrieval work remain absent from runtime and retain their existing gates.
- This was a documentation-only supervisory audit. No runtime code, CSS, course order, note sequence, input rule, mastery rule, media, audio or approval bit was changed. The prototype/UI and media tasks remain idle; Grok video generation remains hard-paused, and no Claude, Grok, Gemini or other generation service was called in this audit.

## 2026-07-26 - 362a V6 Dark Sci-Fi Candidate Final Regression And Archive Refresh

- The local child-facing prototype at `http://127.0.0.1:4173/` is now the unapproved `overhaul-362a-dark-scifi-map-v6-prototype` candidate. The frozen `overhaul-359a-map-shell-scroll-reset` remains the only observation baseline; 361a remains a historical visual predecessor. No screenshot, runtime hash or review result may be attributed across those candidates.
- The V6 map keeps one enabled current task, non-current landmark masks as pointer-free scenery, and a continuous readable journey scrim. Its V6 mask alpha is `0.25`; the home single-task test had retained the old V5-only `0.16` assertion, so the test now derives the expected value from `data-map-visual` without changing runtime CSS or child behavior.
- Final browser gates pass: home single task `23/23`, world map V6 `103/103`, course director `68/68`, nonblocking feedback `62/62`, PWA shell `11/11`, brand/source identity `6/6`, and observation-build binding `9/9`. The existing quick, strict-bundle, curriculum/story, runtime-pacing and asset/identity gates remain applicable.
- Rebuilt and independently verified the 362a static backup: 51 release files / 52 ZIP entries, `2,353,717` bytes, SHA-256 `276E36A31679456C23C54A5D3DB4EB920F6617C43E3EC109C663D02BC0854149`; tamper matrix `5/5`. Isolated static recovery rehearsal passes `10/10`.
- Rebuilt the source/control snapshot after the final documentation and test-contract edits at `docs/30_PROJECT_SOURCE_SNAPSHOT_362A.json` and `dist/release-engineering/star-dino-source-snapshot-362a.zip`; the manifest records the resulting source file/byte totals and archive SHA-256, and the source snapshot self-test passes `2/2`. Release-engineering preflight passes `71` assertions with the expected dirty-worktree warning.
- This remains a prototype regression and archive result, not a release or observation approval. `runtimeApproval=false / integrationAllowed=false / observationAllowed=false / releaseCleared=false`; physical iPad, teacher, child, external similarity, provenance and native release evidence remain missing.

## 2026-07-26 - Physical Device Readiness Offline Intake Page R1

- Added the local-only human intake at `review/device-readiness-r1/`, available from `http://127.0.0.1:4173/review/device-readiness-r1/`. It exposes 11 launch-support decisions and 13 device/connection/environment rows through 89 controls. D1/D2/D3 remain fixed to older/smaller, primary 10-11 inch and large iPad; every planned evidence ID must keep its matching prefix.
- The page saves only a candidate-scoped browser draft and downloads JSON. It has no network/upload API, media, child data, recording, credential, serial-number or Bluetooth-address field. A completed form can reach only `hardware_access_ready_candidate_pending_supervisor` or `procurement_plan_candidate_pending_supervisor`; every exported `evidenceState` remains `not_started`, and `physicalDeviceEvidencePassed/fullMatrixPassed/releaseCleared` remain false.
- `tools/build_device_readiness_intake.mjs` binds the page to template SHA-256 `E74A7B8E585AB17D01B63149D5F4688F13A3AE91829C865AE7AD115135509CC1`, exact 361a/359a candidate identities and false approvals. Generated data SHA-256 is `7EF9994B61A3DA12D6B00D9647F466075BD8B7F10D556B4AD94F810CD001FA13`; page manifest SHA-256 is `F39AE7633ADB8C65BACBA669E5EAF44DFA85561F877210DDCBE9829E345251B6`.
- Browser audit passes `78/78`: readable Chinese, blank-state failure, wrong-revision draft isolation, conditional BLE/Lightning requirements, procurement/access distinction, export plus independent verifier recomputation, zero external requests/errors/media/autoplay, and no horizontal overflow at `1366x900` or `768x1024`. Screenshots are under `review/device-readiness-r1/audit-captures/`.
- The page gate is part of `check:quick`, the actionability ledger and maturity current-state audit. Full quick, strict bundle `50` files / `1,948,942` runtime-asset bytes, and `git diff --check` pass. Strict maturity and privacy release gates correctly remain blocked by `13` and `5` requirements. `app.js`, the 361a experience manifest and the 359a observation manifest retain their frozen hashes; no child runtime, course, story, mastery, map, audio, media or approval changed.

## 2026-07-26 - Release Owner Facts Offline Intake Page R1

- Added a human-readable, local-only release-owner intake at `review/release-owner-facts-r1/`. It covers the 52 owner inputs required by the existing r1 JSON contract: intended bundle ID, public operator/support facts, regions/languages/age/pricing, 12 product commitments, six touch/microphone/MIDI commitments, public-policy preparation, seven external-evidence states and four attestations. It saves only a candidate-scoped browser draft and downloads JSON; it has no upload API, external request, child data, recording, MIDI stream, device serial, credential or signing-secret field.
- `tools/build_release_owner_facts_intake.mjs` deterministically binds the page to template SHA-256 `1A4665F22864FF776E5B333E273E9451F2BEA1D308EBEA95070057A45C993014`, exact 361a/359a candidate identities and false approvals. Generated data SHA-256 is `92887E38D1BCF5F9F37D22CF78B99C28444ECC60B9C64DADCAD3A1825B2396`; page manifest SHA-256 is `40CE29A048B74DC8F2124577727515B1E6D18B806AF64C9C25CC089EFF5C5618`.
- `tools/audit_release_owner_facts_intake.mjs` passes `56/56`: blank state fails closed; wrong-revision drafts are ignored; a complete low-data fixture reaches only `owner_facts_complete_candidate_pending_supervisor`; enabling cloud sync reopens privacy scope; the downloaded JSON is accepted and independently recomputed by the existing strict verifier; all approval values remain false; external evidence cannot select `passed`; desktop and tablet layouts have no horizontal overflow or browser errors; external requests are zero. Evidence screenshots are `review/release-owner-facts-r1/audit-captures/release-owner-facts-complete-1366x900.png` and `release-owner-facts-empty-768x1024.png`.
- The page gate is now part of `check:quick`, the actionability ledger and maturity current-state audit. Full quick passes, including curriculum/story `44/44`, runtime pacing `1199`, release actionability `162`, owner-page `56/56`, device readiness `22`, frozen observation server `274`, teacher page `98`, runtime provenance `889`, privacy facts `64` and audio `22`. Strict bundle remains exactly 50 files / `1,948,942` runtime-asset bytes; current `app.js` and both 361a/359a manifests retain their prior hashes.
- This closes only the owner-facts input usability gap. The real product-owner return remains missing, and strict maturity/privacy release correctly remain blocked by `13` and `5` requirements. No child runtime, course, story, mastery, map, audio, media or approval changed.

## 2026-07-26 - Release Evidence Identity, Device Matrix And V5 Screenshot Isolation R1

- Corrected the physical-device inventory to match the canonical `docs/38` matrix: `D1_OLDER_SMALLER_IPAD`, `D2_PRIMARY_10_11_IPAD` and `D3_LARGE_IPAD`. Planned evidence names must carry the matching `D1-`, `D2-` or `D3-` prefix; planned or owned hardware remains preparation rather than test evidence.
- Device-readiness and release-owner return templates now fail closed on both exact identities: frozen observation baseline `docs/30_OBSERVATION_CANDIDATE_359A.json` / SHA-256 `C153CDB5CF2182CF78D1F2423E49FA883B8EF5E50D539266CF6CD7F196C7E4BC` / `app.js` SHA-256 `5AB01914C5B2AFA0E17838AAB59C2E0CAC5D8A4CA8E0956A23F382A4818AE566`, and current dark-scifi prototype `docs/30_WORLD_MAP_V5_DARK_SCIFI_PROTOTYPE_CANDIDATE_361A.json` / SHA-256 `2C7670DCF3ED070F183B42BCFE1605FD0FF3CEB11A8EEE1D1D8949C9FC0EC741` / `app.js` SHA-256 `F38822E87AB5851BD26DEA7DBF0CC9EFBCC4FFA852096B02CB240AA303B87BB9`. The 361a manifest baseline was independently confirmed to bind that exact 359a identity, and the Web data inventory remains a frozen-359a fact source only.
- Release-owner facts now explicitly preserve touch as a complete core route while microphone and MIDI remain optional inputs. Regional-law review, native `PrivacyInfo.xcprivacy`, release archive, packet capture and final App Store answers cannot be self-declared passed in the owner return; the Web inventory is not accepted as native-release proof.
- Corrected a frozen-evidence overwrite risk in `chrome-test/world-map-v5-check.mjs`. Ordinary V5 reruns now write dynamic captures to `screenshots/world_map_v5_latest/`, while `screenshots/world_map_v5_361a/` was restored from the fixed R5 package and remains byte-bound to ZIP SHA-256 `27D8BA0E82A0E69AAB109DF0E0D9511DAF07630221855CA007E9A56FD5F176C2`.
- Verification passes: device readiness `22`, release-owner facts `20`, release actionability `161`, maturity current-state `58` facts / `15` requirements / `13` blockers, release engineering `71` with the expected dirty-worktree warning, privacy current-state `64` facts / `5` blockers, V5 map `103/103`, R5 packet `105` plus `17` return assertions and `15` tamper rejections, full `check:quick`, strict bundle `50` files / `1,948,942` runtime-asset bytes, and `git diff --check` with only existing line-ending warnings. Strict maturity and privacy release gates correctly remain nonzero with `13` and `5` blockers. Accepted external results remain `0/4`; no child runtime, course, mastery, audio or visual asset changed in this correction.

## 2026-07-26 - Teacher 359a Freeze Binding And Offline Packet V5

- A fresh supervisory review found that the teacher r4 page checked candidate ID and the frozen `app.js` hash but did not carry the path and SHA-256 of `docs/30_OBSERVATION_CANDIDATE_359A.json`. The old v4 ZIP also omitted that manifest. This left a real evidence-attribution gap while the mutable 361a visual worktree continued separately.
- The teacher builder, browser audit, package verifier, human-return verifier, Review Hub builder and mature-state audit now all fail closed on the exact 359a manifest path, SHA-256 `C153CDB5CF2182CF78D1F2423E49FA883B8EF5E50D539266CF6CD7F196C7E4BC`, candidate ID, frozen `app.js` SHA-256 `5AB01914C5B2AFA0E17838AAB59C2E0CAC5D8A4CA8E0956A23F382A4818AE566` and false approvals. The teacher builder also pins all seven 359a reference screenshots by byte count and SHA-256, so rerunning a mutable runtime cannot silently replace them.
- The current package is `dist/review/star-dino-teacher-staged-review-359a-v5.zip`: 21 allowlisted files plus one embedded manifest, `4,878,375` bytes, SHA-256 `D6C0BF7508C2C6745E1E6DDF32CF9CFB845303C0FE88B97B2913DE8A9AC52D0B`. It includes the frozen observation manifest, builds identically `2/2`, and rejects content, approval, observation-binding, unsafe-path, timestamp and missing-file tampering `6/6`. Teacher page verification remains `98`, A13/B10/C10, all real results missing and all approvals false.
- Unified return verification now passes `31` assertions with `25` tamper rejections, including a forged teacher observation-manifest hash; real-page integration remains `19`. Review Hub browser verification passes `73`, and the allowlist server passes `55`, serves only teacher v5 plus the existing audio and visual packages, exposes zero runtime routes, accepts zero write methods, and returns 404 for teacher v1-v4.
- Full `check:quick` now automatically runs both teacher page and teacher package gates and passes. Strict bundle remains 50 files / `1,948,942` runtime-asset bytes; maturity current-state passes `57` facts, while strict release correctly fails on the unchanged `13` blockers. The live `4201` process is PID `47412`; HTTP returns the exact v5 byte count and SHA above, while v4 returns 404. No child runtime, lesson order, note route, mastery, media or release approval changed; accepted external results remain `0/4`.

## 2026-07-26 - Adult 359a Review Freeze Binding Correction R1

- A fresh run of `check:adult-ipad-preflight-review` exposed one real infrastructure failure: the adult 359a review audit compared its frozen `app.js` hash to the mutable current 361a workspace `app.js`. The page and review manifest were correct, but the audit itself mixed the observation baseline with the current visual prototype and failed `1` assertion.
- Corrected the review evidence chain without changing either runtime. The adult manifest now locks `docs/30_OBSERVATION_CANDIDATE_359A.json` and SHA-256 `C153CDB5CF2182CF78D1F2423E49FA883B8EF5E50D539266CF6CD7F196C7E4BC`. The dedicated audit verifies the path, manifest hash, candidate ID, frozen `app.js` hash, false approvals and absence of review tooling from the 47-file observation set. The review-hub builder and human-return verifier fail closed on the same binding; no check reads current 361a `app.js` as 359a evidence.
- The corrected adult audit passes `71/71`, including six nonqualifying states, all-pass `supervisor-pending`, clean desktop/mobile captures, no external requests and no browser errors. `review-manifest.json` is `1,904` bytes / SHA-256 `2F4938D59C79CAA13E5F612FCCE5374B26D9EBFAE0BF8BFF8BC1194469A6BC2A`; `review-verification.json` is `1,688` bytes / SHA-256 `5E100BB0F91B06CDE2F1884BBFB6EBFA722F6E6D24870A2D4B6DF554D34B3C61`. Live `4201` responses match both exact files, while live `4199/app.js` remains `5AB01914C5B2AFA0E17838AAB59C2E0CAC5D8A4CA8E0956A23F382A4818AE566`.
- Added the dedicated adult audit to `check:quick`. Full quick now passes with curriculum/story `44/44`, runtime pacing `1199`, frozen observation server `274`, adult review `71`, release engineering `71`, runtime provenance `889`, privacy facts `64` and audio `22`. Human-return self-test remains `30`, real-page integration `19`, review hub `72`, review-hub server `54`, maturity current-state `57` facts and all `13` release blockers.
- This closes only the mutable-workspace comparison defect. Real adult physical-iPad evidence remains missing; accepted external results remain `0/4`; child observation, LP05, runtime integration and release remain forbidden. All approval flags stay false.

## 2026-07-26 - Frozen 359a And Review Hub Live Service Reverification R1

- Reconfirmed the restored read-only services on `0.0.0.0`: the immutable 359a application is PID `45984` on port `4199`, and the external-review hub is PID `25704` on port `4201`. Both trusted-LAN roots return HTTP `200`: `http://10.3.142.131:4199/` and `http://10.3.142.131:4201/`.
- Raw HTTP bytes from `4199` still match the frozen manifest exactly: root `index.html` is `51,704` bytes / SHA-256 `8768366E0CB7ACF47F2EA7862B77E87B50B584AF31AD1010484128B4CF8A2B9B`, and `app.js` is `980,076` bytes / SHA-256 `5AB01914C5B2AFA0E17838AAB59C2E0CAC5D8A4CA8E0956A23F382A4818AE566`. The separate current experience on `4173` remains 361a: `app.js` is `980,444` bytes / SHA-256 `F38822E87AB5851BD26DEA7DBF0CC9EFBCC4FFA852096B02CB240AA303B87BB9`.
- Raw HTTP downloads from `4201` match all three current packages exactly: teacher V4 `4,874,315` bytes / `06EE6FC82A0805C52B92B25D367AA45C611F11996E7F193CFBA3AFDB6B40A9E4`, nonvoice SFX V1 `753,681` bytes / `F38289D48EA65EFFC92AD10EE4B84CB059C87C2820A38FCB4EF00306CE66C520`, and visual R5 `36,233,169` bytes / `27D8BA0E82A0E69AAB109DF0E0D9511DAF07630221855CA007E9A56FD5F176C2`. `/app.js` and historical visual R4 return `404`; POST returns `405`.
- Post-record verification passes `check:quick`, curriculum/story `44/44`, runtime pacing `1199`, release actionability `156`, maturity current-state `57` facts, strict bundle `50` files / `1,948,942` runtime-asset bytes, review hub `72`, review-hub server `54`, and `git diff --check` with only existing line-ending warnings. The strict mature-app gate correctly exits nonzero and lists all `13` blockers.
- This proves current service availability, frozen-candidate isolation and exact package delivery only. Accepted external results remain `0/4`; adult physical-iPad preflight, preschool-piano-teacher Stage A, physical-iPad SFX listening and independent V5 visual-similarity results remain missing. `observationAllowed=false / runtimeApproval=false / integrationAllowed=false / releaseCleared=false`.

## 2026-07-26 - 361a Deterministic Static Backup And Isolated Recovery Rehearsal

- Added a separate 361a static-backup pair without changing the R5-bound candidate manifest: `docs/30_PROTOTYPE_BACKUP_361A.json` is `9,086` bytes / SHA-256 `9ADFD139FFA220A23267AB84ACB5F5D8407729A449F0CA1DDBB667A6B1A55995`; `dist/prototype/star-dino-361a-static-backup.zip` is `2,351,476` bytes / SHA-256 `02CA99E9DD8001DE297B74AE6AE42393E1AFBEC580FB0519EBC36452A70609B2`. It contains 50 exact runtime files plus one embedded manifest. Two complete manifest/archive builds are byte-identical, and five content/approval/path/timestamp/missing-file tamper variants are rejected `5/5`.
- Added `tools/static_archive_recovery_rehearsal.py`. It independently verifies 361a against the current workspace and 359a against its frozen archive, then switches temporary static directory slots 361a→359a→361a. The rehearsal passes `10/10`; no project file, browser storage, schema, native archive or deployment directory is changed.
- `check:release-engineering` now passes `71` assertions and reruns both archive verification and the isolated recovery rehearsal. `check:maturity-state` passes `57` facts while retaining all `13` release blockers. The immutable visual-screening identity remains exact: candidate manifest SHA-256 `2C7670DCF3ED070F183B42BCFE1605FD0FF3CEB11A8EEE1D1D8949C9FC0EC741` and R5 package SHA-256 `27D8BA0E82A0E69AAB109DF0E0D9511DAF07630221855CA007E9A56FD5F176C2`.
- Full `check:quick` passes, including curriculum/story `44/44`, runtime pacing `1199`, release actionability `156`, V5 packet `105` source assertions plus `17` return assertions and `15` tamper rejections, observation server `274`, runtime provenance `889`, privacy facts `64` and audio `22`. Strict bundle remains `50` files / `1,948,942` runtime-asset bytes; `git diff --check` has no whitespace error beyond existing line-ending warnings.
- Status is `361a_deterministic_static_backup_passed / isolated_static_recovery_rehearsal_passed / deployment_rollback_missing / localStorage_and_native_migration_missing / signed_archive_missing / releaseCleared=false`. This advances release-engineering preparation only; it does not approve 361a, replace 359a, or close any physical-device, teacher, child, rights, native or store gate.

## 2026-07-26 - Release Engineering Candidate Boundary And Archive Verification R1

- Added `docs/87_RELEASE_ENGINEERING_CHANGE_BOUNDARY_AND_ROLLBACK_PLAN.md` and the read-only `tools/release-engineering-preflight.mjs`. The preflight keeps the current `overhaul-361a-dark-scifi-map-v5-prototype` separate from the frozen `overhaul-359a-map-shell-scroll-reset`, checks current 361a hashes against its candidate JSON, checks project isolation markers, and records the shared dirty worktree as a warning rather than pretending it is releasable. It passes `56` assertions with `releaseCleared=false`.
- Corrected `tools/verify_observation_bundle.py` to expose two explicit modes. The default quick path is now `--archive-only`: it verifies the immutable ZIP against its embedded and external 359a manifests without comparing the mutable 361a workspace. `check:observation-bundle:workspace` preserves the strict comparison and correctly fails closed on the current `app.js`, `index.html`, `service-worker.js` drift. Archive verification passes at `48` entries / `2,101,650` bytes / SHA-256 `FC8ACE12BD2C357B4FBD1AEE22C354D6981B13C92788F3CD7BB175A571417023`; the tamper matrix remains `5/5`.
- Wired archive integrity and release-engineering preflight into `check:quick`. Full quick, strict bundle, `git diff --check`, device readiness `17` assertions and release actionability `154` assertions remain passing. This closes only the deterministic archive-boundary preparation defect; it does not approve 361a, 359a observation, physical devices, native runtime, rollback execution or release.

## 2026-07-26 - Physical Device And Connection Readiness Inventory R1

- Added a preparation-only inventory for the physical test matrix in `docs/86_PHYSICAL_DEVICE_AND_CONNECTION_READINESS_MATRIX.md` and `review/field-return-templates/device-readiness-inventory.template.json`. It covers a primary, older/smaller and recent iPad; USB and conditional BLE MIDI; USB-C and Lightning data/power paths; wired and conditional Bluetooth/USB audio; an acoustic piano; household noise; and an optional external microphone route. It explicitly excludes serial numbers, account data, child data and any claim that planned procurement is test evidence.
- `tools/verify_device_readiness_inventory.mjs` binds the current 361a experience identity and exact `docs/38_IPAD_MIDI_MIC_DEVICE_TEST_PROTOCOL.md` SHA-256 `30046A534E9F54E5F24DB369CF918069A73DA3E3376F14BF5EBAB6CE0F37DFF6`. Its self-test passes `17` assertions and the blank template correctly returns `incomplete_fail_closed`; `check:release-actionability` now passes `154` assertions while retaining all `13` blockers in the exact `external=4 / local=3 / gated=5 / blocked=1` classification.
- `check:bundle:strict` remains clean at `50` files / `1,948,942` runtime-asset bytes, and `git diff --check` reports no whitespace error beyond the existing line-ending warnings. No runtime, course, story, media, device result or approval changed. A real inventory return, physical iPad batches, actual MIDI/microphone/audio evidence, the full device matrix and the native release candidate all remain missing; `physicalDeviceEvidencePassed=false / fullMatrixPassed=false / releaseCleared=false`.

## 2026-07-26 - Release Owner Privacy And App Store Facts Intake R1

- Added a local-only release-owner intake that separates public operator/support facts and product decisions from prohibited credentials, signing secrets, child data, audio/MIDI recordings and device serial numbers. The human card is `docs/85_RELEASE_OWNER_PRIVACY_AND_APP_STORE_FACTS_INTAKE.md`; the blank r1 JSON remains `incomplete_fail_closed` and all runtime, observation, policy-publication, App Store and release approvals remain false.
- `tools/verify_release_owner_privacy_facts_return.mjs` binds the exact `docs/36/64/75/85` bytes, rejects schema/candidate/source/privacy/approval drift, and independently recomputes three outcomes: incomplete, low-data owner-facts candidate, or privacy-scope reopen required. Self-test passes `15` assertions, including approval escalation, child-data/network-upload, unexpected credential field and protocol timestamp rejection. `check:release-actionability` now passes `149` assertions and keeps `parent-privacy-release` in `local_preparation_now`.
- `check:quick`, `check:privacy-state`, `check:maturity-state` and strict bundle pass. The strict privacy release gate correctly remains nonzero with five blockers: real parental challenge, MIDI disconnect/lifecycle, physical-device permission evidence, native PrivacyInfo/purpose strings and final policy/store/regional review. No runtime, lesson, media, child observation or public policy was approved.

## 2026-07-26 - Release Blocker Actionability And Dispatch Audit

- Re-audited all `13` mature-app blockers against the current worktree, review manifests and recent task status. The exact primary classification is `external_evidence_ready_now=4`, `local_preparation_now=3`, `gated_future_implementation=5`, `blocked_waiting_dependency=1`. The four ready external tasks are adult 359a physical-iPad preflight, preschool-piano-teacher Stage A, seven nonvoice-SFX physical-iPad listening and V5 independent visual similarity screening. Child observation is the sole current dependency wait and remains closed until the adult 359a result is accepted.
- Added the machine ledger `docs/84_RELEASE_BLOCKER_ACTIONABILITY_LEDGER.json`, the human-readable audit `docs/84_RELEASE_BLOCKER_ACTIONABILITY_AUDIT_2026-07-26.md` and `check:release-actionability`. The gate verifies all 13 unique IDs, category counts, existing evidence paths, four prepared/missing-result review tasks, frozen prototype/UI and media status, Grok hard pause and zero runtime dispatch; it passes `146` assertions. It does not change any blocker, approval, lesson, runtime, asset or evidence result.
- Full verification passes: `check:quick` including curriculum facts `60`, curriculum/story `44/44`, runtime pacing `1199` and release actionability `146`; `check:maturity-state` retains `15` requirements and all `13` blockers; strict bundle remains `50` files / `1,948,942` runtime-asset bytes; `git diff --check` has no whitespace error, only existing line-ending warnings. The original 361a experience and frozen 359a observation boundary remain unchanged.

## 2026-07-26 - Preschool Piano Teacher Protocol R4 Foundational Sequence And Story-Pacing Review

- Upgraded the independent teacher protocol from r3 to `preschool-piano-teacher-staged-review/r4` without changing any runtime file, lesson order, note route, session, phase settlement or mastery rule. Existing A1-A11/B1-B10/C1-C10 text and numbering remain unchanged. New A12 directly submits the `M01 note name/black-key group -> M03 sound -> S01-mini staff position` to-key sequence for a qualified preschool-piano teacher to judge; new A13 separately submits music-caused floor/wheel/jump changes and phase-goal-only settlement pacing. The staged set is now `A13/B10/C10 = 33` questions, while all real A/B/C teacher results remain `missing` and every approval remains false.
- Stage A now carries seven exact frozen-359a references: two M01 states, two M03 states and three S01 states. The audit compares the teacher candidate to the self-contained `docs/30_OBSERVATION_CANDIDATE_359A.json` identity instead of the mutable 361a working-tree `app.js`, preventing the current dark-map prototype from being misattributed as teacher evidence. The page passes `98` browser assertions across desktop/mobile, including exact source-question extraction, seven decoded references, storage revision isolation, fail-closed revise/unable/qualification states, all-stage export, zero external requests and zero browser errors.
- Built `dist/review/star-dino-teacher-staged-review-359a-v4.zip`: `20` allowlisted files plus one embedded manifest, `4,874,315` bytes, SHA-256 `06EE6FC82A0805C52B92B25D367AA45C611F11996E7F193CFBA3AFDB6B40A9E4`. Two complete builds are byte-identical and all five content/approval/path/timestamp/missing-file tamper variants are rejected. Old teacher v1/r1, v2/r2 and v3/r3 packages remain historical rejection inputs only.
- The unified return validator still passes `30` self-test assertions and the real-page integration passes `19` assertions with all `33` canonical teacher questions. The review hub now exposes only teacher v4, nonvoice-SFX v1 and visual R5: browser audit `72`, allowlist-server audit `54`, packages `3`, runtime routes `0`, accepted write methods `0`, accepted real results `0/4`. Teacher v1-v3 package routes return 404.
- Global evidence after the migration: `check:quick` passes, including curriculum facts `60`, curriculum/story `44/44` and runtime pacing `1199`; `check:maturity-state` passes `56` current facts while retaining all `13` release blockers; strict bundle passes with `50` files / `1,948,942` runtime-asset bytes. Status is `teacher_staged_review_infrastructure_passed / protocol_r4 / preschool_piano_teacher_result_missing / no_runtime_approval`; adult physical-iPad, qualified teacher, child, device, rights, native and release evidence remain missing.

## 2026-07-25 - 361a V5 Dark Sci-Fi World Map Prototype Candidate

- Implemented `overhaul-361a-dark-scifi-map-v5-prototype` as a controlled visual prototype only. The exact selected V5 source PNG is `604F95575B2DE22341E273DFC9BB285D44D321F4563790C055C29EBC2D08251A` (1448x1086, 2,158,254 bytes). Pinned local conversion through FFmpeg 8.0 / `libwebp` produces `assets/runtime/world-map-v5-361a.webp`, `133,276` bytes / `688FB37A8526640CCBD9CF6B3984648E7AFA32466279253F3073E59CC3DB3F10`, identically in both conversion runs.
- V5 keeps the source's central teaching field, uses no global dark overlay, hides the legacy route/wash, applies only `0.16` local non-current focus masks, and gives the map HUD and the one actionable task a dark navy control treatment. Formal C1-01 keeps its world-result semantics as a noninteractive segmented threshold light at the workshop entrance; the old red floor prop remains hidden. The task card was widened only in the V5 style layer, with a fail-closed per-line title check that rejects a single-character orphan and an icon/title overlap.
- Browser evidence on `http://127.0.0.1:4204/`: V5 map `103/103` (including two deterministic conversions, seven C1-C4 journey states at `1024x768` and `1194x834@2x`, PWA cold-offline map fetch, one task/current route, scroll/overflow/no-dialog and 27-image guards); map scroll `12/12`; home single task `23/23`; course director `68/68`; nonblocking feedback `62/62`; visual feedback `42/42`; sessions `74/74`; clean state `124/124`; iPad accessibility `43/43`; PWA `11/11`; palette `17/17`; contrast `9/9`; motion `19/19`; Xingya suit `29/29`; M08 provenance `18/18`; roof route `97/97`; free piano `17/17`; and observation build `9/9`. Original-size V5 evidence is in `screenshots/world_map_v5_361a/`.
- Strict bundle passes with `50` files and `1,948,942` runtime-asset bytes; `git diff --check` has no whitespace error (only existing line-ending warnings). `check:quick` stops fail-closed at `check:curriculum-facts` because that supervisor-owned fact tool still requires the exact 360a candidate; `check:maturity-state` likewise reports the intentional 360a identity mismatch after `54` fact checks and retains `13` release blockers. Neither tool nor any supervisor fact source was modified for 361a.
- Candidate facts are in `docs/30_WORLD_MAP_V5_DARK_SCIFI_PROTOTYPE_CANDIDATE_361A.json`. The frozen 359a manifest remains exactly `C153CDB5CF2182CF78D1F2423E49FA883B8EF5E50D539266CF6CD7F196C7E4BC`; all 27 pre-existing runtime assets are byte-identical. No course order, story, input, audio, session, mastery, retention, phase-settlement, equipment or approval bit changes are authorized. `runtimeApproval=false / integrationAllowed=false / observationAllowed=false / releaseCleared=false`; external similarity, physical iPad, teacher, child and source-clearance evidence remain missing.

## 2026-07-25 - 360a Supervisor Review And Immutable 359a Service Isolation

- Independently reviewed the `overhaul-360a-world-map-v4-prototype` at original size. The deep blue-cyan twilight, rounded habitat architecture, restrained cyan technology light and warm window light satisfy the requested simpler cartoon / darker science-fiction direction without further whole-screen dimming. The central field remains calm, the current chapter stays readable, and the three non-current landmarks are locally dimmed at no more than `0.22`.
- Independent runtime verification passed V4 `75/75`, `check:quick`, maturity current-state `55` facts, strict bundle `49` files / `1,815,666` runtime-asset bytes, and `git diff --check` with only pre-existing line-ending warnings. The release state remains blocked by `13` requirements; 360a is an experience prototype, not an observation or release candidate.
- Corrected a freeze-integrity defect in the 359a LAN service. `npm run serve:observation-candidate` now serves `dist/observation/star-dino-359a.zip` from `immutable-observation-bundle-memory` rather than rereading the mutable working tree. The adversarial audit passes `274` assertions. The live `4199` responses remain exact: `app.js` `980,076` bytes / `5AB01914C5B2AFA0E17838AAB59C2E0CAC5D8A4CA8E0956A23F382A4818AE566`; root `index.html` `51,704` bytes / `8768366E0CB7ACF47F2EA7862B77E87B50B584AF31AD1010484128B4CF8A2B9B`.
- Restarted only the `4201` review-hub process after verifying its old in-memory allowlist returned `404` for the V4 packet. The current process serves `star-dino-visual-similarity-screening-359a-v4.zip` with HTTP `200`, `10,984,568` bytes and exact SHA-256 `670E1FAC9D59F2AB2B0066BFDC7B23444A1BEEFC80918EB8CAE394E7C2E3C702`; server audit remains `50` assertions with zero runtime routes and zero accepted write methods.
- The current experience server is `http://127.0.0.1:4173/` and returns the exact 360a `app.js` / V4 map hashes. It is deliberately separate from the frozen 359a adult-iPad evidence service on `4199`. External similarity, physical iPad, teacher, child and release-rights evidence remain missing; all approval flags remain false.

## 2026-07-25 - 360a V4 World Map Prototype Candidate

- Implemented `overhaul-360a-world-map-v4-prototype` as a controlled visual prototype only. The source is the exact V4 PNG `1D893F492B4F702BE3CC6A161E3D8A1F7A88C069659F36437B7094D446268417`; the reproducible WebP conversion uses the pinned local script / FFmpeg 8.0 parameters and produces `assets/runtime/world-map-v4-360a.webp`, `114,748` bytes / `4EE9E6A6164D0B36826935F59B5D6F24C3B9BCE477D3FC1C1B5218FBA0362998` in both runs.
- The runtime uses the V4 background only from `assets/runtime`, hides legacy route/wash layers, applies local chapter focus masks with the three non-current landmarks at or below alpha `0.22`, and preserves a single enabled / `aria-current` task. Formal C1-01 evidence shows a noninteractive workshop threshold light; the mismatched legacy red floor overlay stays hidden. No course, session, mastery, input, audio, note-name/solfege carrier, phase-settlement or 27 frozen runtime-asset byte changed.
- Browser evidence on the isolated prototype server includes V4 `75/75` twice, map scroll `12/12`, home single task `23/23`, course director `68/68`, nonblocking feedback `62/62`, sessions `74/74`, clean state `124/124`, iPad accessibility `43/43`, PWA `11/11`, palette `17/17`, contrast `9/9`, motion `19/19`, M08 provenance `18/18`, roof route `97/97`, Xingya suit `29/29`, child note names `286/286`, and observation build identity `9/9`. Original-size V4 captures cover C1/C2/C3/C4 at `1024x768` and `1194x834@2x`.
- Candidate facts are in `docs/30_WORLD_MAP_V4_PROTOTYPE_CANDIDATE_360A.json`. It preserves the exact 359a baseline manifest SHA `C153CDB5CF2182CF78D1F2423E49FA883B8EF5E50D539266CF6CD7F196C7E4BC` and all approvals remain false: this does not authorize observation or release. Source/provider terms are partial; external similarity, physical iPad, teacher and child review are missing.

## 2026-07-25 - World Map V4 Simpler Dark Sci-Fi Direction

- Follow-up status is `world_map_v4_cross_chapter_focus_audit_passed / runtime_still_forbidden`. A new audit-only tool seeded seven real course states across C1-C4 and captured both `1024x768` and `1194x834@2x`: 14 captures, `168/168` assertions, zero browser problems. It verifies the exact journey chapter/state/target, one enabled task, one visible `aria-current`, no dialog, no overflow, origin scroll, no story/task overlap and nonblank output.
- The second visual pass rejected uniform whole-scene dimming. The retained rule leaves the current landmark and central play field at source brightness while locally dimming only the three non-current landmarks, at a maximum alpha of `0.22`; it adds no animated or extra glowing route. The reproducible report is `concepts/runtime-candidates/world-map-release-source-v4-2026-07-25/audit/cross-chapter-audit-report.json`, SHA-256 `EB7A58D1446A05D236B575DDF6EB2C83ACAABF93B899C6D3BA8C74C7E44A03D0`.
- Human review found one integration blocker not present in the raw image: after Chapter 1, frozen 359a overlays the legacy red installed-floor prop in front of the new moon workshop. It conflicts in material, scale and perspective and must be removed, relocated or remade before integration. C3/C4 resume/final-complete views, responsive mask implementation, physical iPad and child review remain missing.
- The user rejected the V2 detail density and then asked that the simplified V3 direction become more science-fiction and slightly darker. V3 is retained as `superseded_source_direction`; no V3 audit or runtime integration was performed.
- One V4 built-in edit used exact V3 SHA-256 `F4E3AE1D...7E42`, one call and zero retries. The untouched result is `1448x1086`, `2,009,499` bytes, SHA-256 `1D893F492B4F702BE3CC6A161E3D8A1F7A88C069659F36437B7094D446268417`; the exact submitted prompt and cache path are archived.
- V4 keeps a low-detail central field, simplified moon workshop, breathing garden, secondary echo cave, exactly two planets and one starlight bridge. It adds rounded habitat architecture and restrained cyan/amber lighting over a dark blue-green twilight palette without adding baked UI, text, character, notation, keyboard or level pads.
- The reusable audit tool injected V4 only into frozen 359a. `1024x768` and `1194x834@2x` each pass six assertions: one task, no dialog, no horizontal overflow, origin scroll, no story/task overlap and nonblank capture. Both full runs reproduced byte-identical composites and report; browser problems are zero.
- Human review marks V4 `preferred_source_candidate_unapproved`. Darkness must not increase; ready/rest/active states now have an audit-only local-dimming proof, while C3/C4 resume/final-complete states, responsive separated layers or runtime masking, provider terms, external similarity, professional art, physical iPad and child review remain missing.
- Runtime is unchanged and contains zero V3/V4 references. `runtimeApproval=false / integrationAllowed=false / observationAllowed=false / releaseCleared=false`; the current visual-similarity package has not yet been rebuilt around V4.
- Maturity current-state now locks the V1 failure, V2 source, V3 supersession and V4 preferred-but-unapproved state as separate facts: `55` facts, `15` requirements and unchanged `13` blockers.
- Post-record verification passed `check:quick`, strict bundle (`47` files / `1,700,918` runtime-asset bytes), candidate JSON/checksums, product-isolation scan and `git diff --check` with only pre-existing line-ending warnings. Frozen hashes remain `app.js 5AB01914...E566` and manifest `C153CDB5...E4BC`.

## 2026-07-25 - World Map V2 Source Candidate Audit

- A separate built-in image-generation call returned one valid Star Dino Workshop world-map PNG. The untouched source is `concepts/runtime-candidates/world-map-release-source-v2-2026-07-25/world-map-master-v2-raw.png`, `1448x1086`, `2,892,992` bytes, SHA-256 `1F92448A3E95293121F16443AFAD29E4848E00F7E96E2335D15DB98EEC6B2C86`; input-image count and retry count are both zero.
- The result is one continuous tactile 3D world with a left moon workshop, right breathing garden, lower echo cave and exactly two sky planets connected by starlight. Original-size review found no baked text, character, notation, keyboard, level number, circular level pad or button-like landmark.
- `render-audit-composites.mjs` injected the image as a data URL into the exact frozen `359a` map only for capture, hiding the old route and wash layers without changing runtime. Both `1024x768` and `1194x834@2x` retain one enabled task, zero visible dialogs, zero horizontal overflow, zero shell offset and zero story/task geometry overlap; console problems are zero.
- Human review advances it only to `strong_source_candidate / composition_revision_required`: the cave is too bright and dominant for Chapter 1 and is partly covered by the two lower overlays. Responsive layers/crops and Chapter 2-4 state composites are still missing.
- The exact submitted prompt string and provider/model terms were not durably returned, so the archived prompt is explicitly reconstructed rather than falsely exact. External similarity, professional final-art, physical iPad, teacher and child review remain missing.
- V1's interrupted zero-image record remains intact and separately fail-closed. V2 has zero runtime references and zero cross-project identifier hits; `runtimeApproval=false / integrationAllowed=false / observationAllowed=false / releaseCleared=false`. Runtime remains frozen at `overhaul-359a-map-shell-scroll-reset`.
- `check:maturity-state` now locks both the V1 failure record and the V2 source-only candidate as separate facts: `54` fact checks, `15` requirements and the same `13` release blockers.

## 2026-07-25 - World Map Source Attempt Fail-Closed And Review Services Restored

- Independently reconciled the interrupted source-only world-map task. Its one built-in static-generation attempt is recorded as `aborted`, with zero returned world-map images and no verifiable saved path, execution ID, source SHA or dimensions. The visible cached file belonged to the earlier seven-prop workshop task; original-size review confirmed it was not a map, and it was not copied, registered or composited.
- The fail-closed record is `concepts/runtime-candidates/world-map-release-source-2026-07-25/manifest.json`, `2,103` bytes, SHA-256 `B126DC074BC1008787460A427C6EF4C91D8E93FFF5A7D58D5EF7E55D18825F42`. The directory contains six text/JSON audit records plus one checksum list and zero image files. Status remains `map_generation_missing_after_interruption`; `candidateCreated=false / runtimeApproval=false / integrationAllowed=false / releaseCleared=false`, runtime references and forbidden-product hits are both zero.
- This does not close the external UI P1 for button-like non-current landmarks or unified release art for the garden, cave and world map. Runtime remains frozen at 359a and no prototype integration was requested.
- Rebuilt the external review hub and reran the executable next-gate infrastructure. Review hub browser audit passes `65` assertions; frozen 359a allowlist server passes `271`; adult iPad preflight form passes `66`; live review-hub allowlist audit passes `49` with three exact packages, zero runtime routes and zero write methods.
- Restarted the exact read-only services on `0.0.0.0:4199` and `0.0.0.0:4201`; current Node PIDs are `22632` and `33236`. Both loopback roots return HTTP `200`, and the current trusted-LAN review entry is `http://10.3.142.131:4201/`. These services make the adult preflight executable but do not constitute a physical-iPad, teacher, child, SFX or visual-similarity result.
- Added a maturity fail-closed assertion for the exact map-attempt manifest, zero image outputs, all-false approval state and explicit rejection of the old prop sheet. Current-state maturity passes `53` facts with the same `15` requirements and `13` blockers; `check:quick`, strict bundle (`47` files / `1,700,918` runtime-asset bytes) and `git diff --check` pass, with only pre-existing line-ending warnings.

## 2026-07-25 - External Audit Returns And Visual Screening V3 Closure

- Reverified the two user-returned Star Dino Workshop Web ChatGPT ZIPs without starting duplicate broad audits. Course remains SHA-256 `4F009D1C...9DBAD` with `7/7` requested Markdown files. The original UI ZIP remains `245A8E7B...E656BC`; its four extra PNGs stay quarantined, while the eight-Markdown sanitized derivative remains the only authoritative input for `docs/65`. Controlled intake is `2 valid / 0 missing / 0 invalid`, and adversarial self-test passes `9/9`.
- `docs/56` and `docs/65` remain the supervisor decisions. The only retained new curriculum gap is the teacher-gated `sound -> staff position -> same-name key` bridge in `docs/57`; it is absent from runtime and cannot be dispatched before preschool-piano-teacher review. External opinions did not directly alter lesson notes, order, mastery, runtime or assets.
- Upgraded the independent visual-similarity packet to `external-visual-similarity-screening/r3`. `dist/review/star-dino-visual-similarity-screening-359a-v3.zip` has `26` entries, `5,551,824` bytes and SHA-256 `78784D5CC0F3B19CC34A213AB65C01F21DF9A212582685108A7C6B7F76044DC6`; two complete builds are byte-identical. It keeps current 359a runtime visuals, the seven-item V2 set and rejected old beacon evidence, and the separate corrected replacement beacon source-only evidence as non-interchangeable objects.
- The r3 return requires separate answers for replacement-beacon similarity, button/trophy misreading, transparent-cover credibility, scene-scale readability and release-grade redraw. The verifier passes `33` assertions with `6` qualifying or explicitly nonqualifying fixtures and `27` tamper rejections; all three blank templates remain fail-closed. No external visual result has been received or accepted.
- Rebuilt the review hub with the exact r3 hash. Browser audit passes `65` assertions with four tasks, zero accepted results, zero external requests and zero browser errors. The allowlist server passes `49` assertions, serves exactly three current ZIPs, exposes zero runtime routes and accepts zero write methods. The live `0.0.0.0:4201` process is PID `43788`; LAN root `http://10.3.142.131:4201/` returns `200`, `/app.js` and the old r2 ZIP return `404`, POST returns `405`, and the live r3 ZIP recomputes to the exact local size and hash.
- Regression passed external intake and `9/9` self-test, curriculum facts `60`, curriculum/story `44/44`, runtime pacing `1199`, workshop source `258`, runtime provenance `889`, human return self-test `30` and integration `19`, r3 deterministic verification, field-return templates `3/3`, review hub `65`, allowlist server `49`, `check:quick`, and strict bundle `47` files / `1,700,918` runtime-asset bytes. Current-state maturity passes `52` facts while retaining `15` requirements and `13` release blockers.
- Runtime remains frozen at `overhaul-359a-map-shell-scroll-reset`; `app.js` SHA-256 remains `5AB01914...E566`. Runtime release clearance remains `0/27`, and `observationAllowed=false / runtimeApproval=false / integrationAllowed=false / releaseCleared=false`.

## 2026-07-25 - External Audit Intake And Beacon Source Review

- Reverified the two returned Star Dino Workshop Web ChatGPT packages. Course remains `35,034` bytes / SHA-256 `4F009D1C...9DBAD`; the original UI package remains `6,942,469` bytes / `245A8E7B...E656BC`. Strict controlled intake reports `2 valid / 0 missing / 0 invalid`, and its adversarial self-test passes `9/9`. The UI package's four extra concept PNGs remain quarantined; only the exact eight-Markdown sanitized derivative is authoritative for `docs/65`.
- Existing supervisor rulings in `docs/56/65` remain authoritative. The accepted new curriculum gap is the teacher-gated `sound -> staff position -> same-name key` bridge in `docs/57`; external suggestions did not automatically change runtime, notes, lesson order, mastery or assets.
- Independently reviewed the new single-beacon source candidate. One built-in static generation call produced raw SHA-256 `286EAA9D...1BEAC`; retry count is `0`. The first auto-key extraction is rejected evidence because it removed the dome and core. The corrected fixed-key extraction is byte-identical across two runs at SHA-256 `B13FC0B6...A0CDE`; checkerboard and M02/M05 composites retain the complete warm-yellow dome, core, guard and base with zero detected magenta residual.
- The new beacon advances only as `corrected_alpha_passed_for_source_only / source_candidate_unapproved`. It has zero runtime references and zero forbidden-product hits. Provider terms, external similarity, professional art, physical iPad and child evidence remain missing; `runtimeApproval=false / integrationAllowed=false / releaseCleared=false`.
- `npm run check:workshop-prop-source` now passes `258` checks. It preserves the original V2 beacon as rejected evidence while independently pinning the replacement raw/alpha/failure bytes, the one-call/no-retry ledger, double-run identity, actual RGBA pixels, source-only human ruling, zero runtime references and all false approval bits.

## 2026-07-25 - LP05 Gate Propagation Repair

- Continued curriculum/story review found that the earlier four-gate repair had not propagated to every status-bearing source. `docs/40` still called LP05 a three-gate dispatch and named 357a as the current adult-preflight target; `docs/34` still described `357A` as the current frozen manifest in `next_gated_runtime_work`.
- Both documents now name exact 359a and the same four gates as `docs/66` and `docs/79`: adult physical-iPad acceptance, first child observation without blocking P0, teacher Stage B without curriculum P0, and explicit narrow supervisor dispatch. Teacher Stage A continues to own S01/C3-X01 review and does not substitute for the LP05 Stage-B gate.
- `check:curriculum-facts` and `check:curriculum-story` now fail closed if the stale three-gate or 357a-current wording returns. This changes no runtime byte, pitch/order, story result, session, phase settlement, mastery rule, asset, audio or approval bit; LP05 remains `runtime_forbidden`.
- Verification passed curriculum facts `60`, curriculum/story `44/44`, runtime pacing `1199`, and maturity current-state `52` facts / `15` requirements / `13` blockers. Full quick, strict bundle and source/provenance gates are recorded after the beacon source review completes.

## 2026-07-25 - Trusted-LAN Human Review Hub Live Verification

- Re-ran `npm run check:review-hub-server`: `48` assertions pass, with exactly three approved review packages, zero runtime routes and zero accepted write methods.
- Replaced the prior loopback-only review-hub listener, PID `30512`, with the same allowlisted Node server bound to `0.0.0.0:4201`, PID `10744`. The session-specific LAN root `http://10.3.142.131:4201/` returns `200`; `/app.js` returns `404`; POST returns `405`.
- Downloaded all three live LAN package routes in memory and recomputed SHA-256. Teacher r3 is `1,982,305` bytes / `A05E32E0...9D90`, nonvoice SFX r1 is `753,681` bytes / `F38289D4...520`, and visual similarity r2 is `2,824,194` bytes / `FB37EE62...411`; all match the locked verification record.
- The live hub makes the next human gates executable but does not satisfy them. Accepted real results remain `0/4`; adult physical-iPad, teacher, SFX and independent visual results remain missing, and every observation/runtime/integration/release approval remains false.

## 2026-07-25 - LP05 Four-Gate Consistency Repair

- A continuous curriculum/coordination review found one deterministic contradiction: the opening paragraph of `docs/66` said LP05 waited for three gates, while its own Section 2 and `docs/79` correctly define four gates. The opening text now also says four: adult physical-iPad acceptance, first child observation without blocking P0, preschool-piano-teacher Stage B without curriculum P0, and an explicit narrow supervisor dispatch.
- `check:curriculum-facts` now fails closed if the old three-gate wording returns or if `docs/66` and `docs/79` disagree. Current curriculum facts increase from `59` to `60`; no human gate is treated as passed.
- No runtime byte, lesson pitch/order, story result, session, phase settlement, mastery rule, asset, audio or approval bit changed. LP05 remains `runtime_forbidden`.
- Verification passed curriculum facts `60`, curriculum/story `44/44`, runtime pacing `1199`, maturity current-state `52` facts / `15` requirements / `13` blockers, review-hub server `48`, `check:quick`, strict bundle (`47` files / `1,700,918` runtime-asset bytes), live 47-file manifest verification, and `git diff --check` with only pre-existing line-ending warnings.

## 2026-07-25 - Frozen 359a LAN Runtime Allowlist

- Replaced the preflight assumption of a broad repository directory server with `tools/serve_observation_candidate.mjs`. The server verifies every path, byte count and SHA-256 in exact manifest `docs/30_OBSERVATION_CANDIDATE_359A.json` before listening, then serves only those 47 frozen runtime files on canonical port `4199`.
- Added `tools/audit_observation_candidate_server.mjs`, `review/observation-candidate-server-verification.json`, `npm run serve:observation-candidate` and `npm run check:observation-candidate-server`; the latter is wired into `check:quick`.
- The server audit passes `271` assertions: all 47 files return exact bytes, hashes, MIME types and lengths; root/query routes return the frozen index; HEAD is read-only; non-manifest docs, concepts, audio, review, dist, tools, Git data, package metadata, arbitrary assets and traversal routes remain inaccessible; POST/PUT/PATCH/DELETE are rejected. Recorded totals are `manifestFilesServed=47`, `nonManifestRoutesServed=0`, `writeMethodsAccepted=0`.
- Live replacement was also verified. The prior Python listener, PID `31868`, returned HTTP `200` for `/docs/29_PROJECT_COORDINATION_AND_INDEPENDENT_AUDIT.md`, `/concepts/` and `/package.json`; it was stopped only after those exposures and the owning PID were confirmed. Node PID `40832` then took canonical port `4199`: root and a manifest asset return `200`, docs/concepts return `404`, POST returns `405`, and all 47 files pass the live manifest verifier. The current LAN route `http://10.3.142.131:4199/` returned `200`; that address is session-specific and is not frozen as product evidence.
- This closes LAN repository-exposure risk only. `observationAllowed=false / runtimeApproval=false / integrationAllowed=false / releaseCleared=false`; adult physical-iPad evidence, teacher/child evidence, secure-context capabilities and release clearance remain missing. No runtime byte, course note, mastery rule, audio or image asset changed.
- Current-state maturity now passes `52` facts while retaining `15` requirements and `13` release blockers.

## 2026-07-25 - Returned Web Audits And Visual Screening V2 Closure

- Reconfirmed the two user-returned Web ChatGPT result ZIPs as the already-controlled Star Dino Workshop inputs: course SHA-256 `4F009D1C7C52342492A12FFF0BCB1456132259817B05BAC123E86F0AA8C9DBAD` and UI SHA-256 `245A8E7B1935A5E38498E3C4DCCB492178ADDB0A71CCBBA1836C873A66E656BC`. Their authoritative triage remains `docs/56` and `docs/65`; no duplicate broad course/story or screen-by-screen UI audit was started, and no external recommendation directly changed runtime, mastery, lesson order or assets.
- Consolidated external visual similarity work into one r2 review instead of opening another task. `dist/review/star-dino-visual-similarity-screening-359a-v2.zip` contains 19 entries, is `2,824,194` bytes, has SHA-256 `FB37EE625C588C98D402977D24FF5ED252F4C1401DF51BCEF772A1CFD7941411`, and rebuilds byte-identically. One independent reviewer now receives both the current 359a runtime visuals and the seven unintegrated workshop V2 candidates, with explicit instructions not to treat the two sets as interchangeable.
- The visual r2 return template and verifier lock the exact 359a hashes plus the workshop V2 candidate ID, manifest/contact-sheet/audit hashes, six source-only passes, rejected-for-runtime beacon, zero runtime references and all false approval bits. Self-test passes `30` assertions: `6` valid or explicitly nonqualifying fixtures and `24` tamper rejections; blank templates remain fail-closed `3/3`.
- Rebuilt the unified review hub with four tasks and zero accepted real results. Browser audit passes `65` assertions at desktop/mobile with `0` external requests and `0` browser errors; the allowlist server passes `48` assertions, serves exactly three ZIPs, exposes zero runtime routes and accepts zero write methods.
- Current-state maturity passes `51` fact checks but still reports `15` requirements and `13` release blockers. Runtime remains frozen at `overhaul-359a-map-shell-scroll-reset` / `app.js 5AB01914...E566`; `observationAllowed=false / runtimeApproval=false / integrationAllowed=false / releaseCleared=false`. The returned ChatGPT audits do not replace adult physical-iPad, preschool-teacher, child, SFX, device, provenance, legal or final visual evidence.
- Regression passed: curriculum facts `59`, curriculum/story `44/44`, runtime pacing `1199`, runtime provenance `889`, workshop source `227`, visual packet deterministic verification, field-return `30` plus templates `3/3`, review hub `65`, allowlist server `48`, `check:quick`, strict bundle `47` files / `1,700,918` runtime-asset bytes, and `git diff --check` with only existing line-ending warnings.

## 2026-07-25 - Workshop prop extraction V2 supervisor acceptance

- Independently accepted the deterministic V2 extraction only as `six_source_only_passed / beacon_partial_rejected_for_runtime`. Bridge, base floor, roof, star signal, wall and wheel have clean source-only silhouettes; the beacon's clear cover still contains visible pink contamination and is prohibited from runtime consideration.
- Locked the sole extraction input at `3040AAF1...AF50A`, the extraction script at `8D9FA1DD...164C7C`, `verification.json` at `56311E5A...ADDBA2` and the final manifest at `6E418A3A...B1B1FD`. Two full builds and `final/` are byte-identical across 18 files. Seven corners checks pass, ordinary key-family residual pixels are zero, the bridge preserves five enclosed transparent holes and the wall preserves one transparent window.
- Reconciled three call events without collapsing them: historical built-in capability check `0`; user-authorized compatible Images API source probe `1`; raced built-in call `1`, candidate writes `0`, runtime integration `0`, additional calls after stop `0`. The raced image hash `41E83F7E...E0F35A` is absent from the candidate.
- Existing 359a runtime has four same-name legacy assets, so the audit compares bytes rather than names. All four hashes differ from V2, the other three same-name runtime files are absent, and no V2 PNG/WebP hash exists under `assets/runtime`.
- Added `npm run check:workshop-prop-source`; `workshop_prop_v2_supervisor_checks_227` pass. It also rejects credential-like strings, forbidden-product markers, candidate-directory runtime references, approval drift and any attempt to relabel the beacon or the complete seven-item set as approved.
- Runtime remained frozen at `app.js 5AB01914...E566`; no candidate was copied into runtime. `runtimeApproval=false / integrationAllowed=false / releaseCleared=false`; provider identity/terms, external similarity, professional final-art review and physical-device evidence remain missing.
- Post-acceptance regression passed: curriculum facts `59`, curriculum/story `44/44`, runtime provenance `889`, runtime pacing `1199`, maturity current-state `51` facts / `15` requirements / `13` blockers, `check:quick`, strict bundle `47` files / `1,700,918` runtime-asset bytes, review-hub allowlist server `48`, and `git diff --check` with only existing line-ending warnings. Local ports `4199` and `4201` respond with HTTP 200; this proves review infrastructure availability, not a physical-iPad result.

## 2026-07-25 - Seven-Prop Source Image Independent Review

- Reconciled the earlier one-call HTTP 502/zero-image attempt with a later, separately user-authorized OpenAI-compatible `gpt-image-2` provider probe. The later probe made one request, zero retries and returned one PNG; it does not prove that the desktop built-in `image_gen` tool was exposed or that the proxy's backend/model/license claims are independently verified.
- The source is `concepts/runtime-candidates/workshop-prop-sheet-imagegen-v2-2026-07-25/provider-probe/gpt-image-2-probe-001.png`, `1,370,543` bytes, `1254x1254`, SHA-256 `3040AAF1F9B2C3394A2FD7EBE7229679D56E968F5365A2DD151430579B3AF50A`. Credential-like string scan, forbidden-product marker scan and runtime-reference scan each returned `0`.
- Supervisor original-size inspection and a conservative connected-component probe found exactly seven large, separated, uncropped objects: bridge, base floor, beacon, sealed roof, star signal, wall and wheel. The tactile 3D toy material is compatible with the current 359a workshop/map art, so the source advances to `preferred_source_only / extraction_required`.
- It is not runtime-ready: alpha is fully opaque; the border is not uniform `#FF00FF`; approximately `72.39%` of pixels match a conservative near-magenta rule; cast/contact shadows, clear-cover magenta contamination and bridge/wall holes require per-item cleanup. Floor/button ambiguity and star/reward ambiguity also require live-scene review.
- Human-readable rulings and the zero-call derivative contract are in `docs/81_WORKSHOP_PROP_SOURCE_SUPERVISOR_REVIEW_2026-07-25.md`. The media task may create deterministic transparent cuts, contact sheets and audit-only 359a composites, but may not call another provider or write runtime. `runtimeApproval=false / integrationAllowed=false / releaseCleared=false`; external similarity, provider terms, professional art review, physical iPad and child evidence remain missing.

## 2026-07-25 - External Audit Closure, NP-FG Register Isolation, And Teacher R3 Rebuild

- Reverified the two user-returned Web ChatGPT results as the exact packages already accepted and triaged by `docs/56` and `docs/65`: course SHA-256 `4F009D1C7C52342492A12FFF0BCB1456132259817B05BAC123E86F0AA8C9DBAD`, UI SHA-256 `245A8E7B1935A5E38498E3C4DCCB492178ADDB0A71CCBBA1836C873A66E656BC`, intake `2 valid / 0 missing / 0 invalid`. No duplicate broad course/story or 13-screen UI audit was started, and no external recommendation directly changed runtime, mastery or assets.
- Closed one real planning ambiguity in the teacher-gated `NP-FG` proposal. Its four scored choices still test only `Fa/Sol -> F/G`; the final provisional, non-scored transfer now names low `F3/G3`. A high `F4/G4` response is `noteNameCorrect=true / registerCorrect=false`, receives name-first repair, cannot backfill the naming first response and cannot create low-register key stable. Teacher Stage B question B10 must decide whether to keep that low-register transfer, replace it with a letter-only transfer or move the review.
- Upgraded and rebuilt the current teacher protocol as `r3`, with `A11/B10/C10 = 31` questions. The deterministic package is `dist/review/star-dino-teacher-staged-review-359a-v3.zip`, `1,982,305` bytes, SHA-256 `A05E32E0A6F2F7E96C8C9542AE4F0D4B50D7BF76BEE8368151B9C96360AE9D90`; old r1/r2 packages remain explicit rejection/history inputs only. Real teacher A/B/C results remain missing and every approval remains false. The full-card return label now explicitly identifies its separate `C3-X01` section 1-12, and the staged Stage B return template now covers `B1-B10` instead of the stale `B1-B9`; a browser assertion prevents the three return ranges from drifting again.
- Added fail-closed curriculum guards for the `NP-FG` name/register separation, Stage-B ownership and r3 manifest. Updated the broader story-coherence guard so it requires explicit central `C4/D4/E4` versus provisional low `F3/G3` transfer instead of restoring the ambiguous phrase "same-name key".
- Closed the SFX return-integrity gap without changing audio bytes. `tools/verify_human_review_return.mjs` now independently recomputes adult, teacher and seven-item nonvoice-SFX JSON; the SFX path locks both physical-iPad speaker and headphone routes, 14 item records and the no-approval boundary. The rebuilt package is `dist/review/star-dino-nonvoice-sfx-human-listening-v1.zip`, `753,681` bytes, SHA-256 `F38289D48EA65EFFC92AD10EE4B84CB059C87C2820A38FCB4EF00306CE66C520`; all seven WAV, seven M4A and seven OGG bytes remain unchanged.
- Verification passed: curriculum facts `59`; curriculum/story `44/44`; teacher browser page `84`; teacher package `2/2` deterministic plus `5/5` tamper rejection; human-return self-test `30` and real-page integration `19`; review hub `64`; allowlist server `48`; maturity current-state `51` facts / `15` requirements / `13` blockers; `check:quick`; strict bundle `47` files / `1,700,918` runtime-asset bytes; and `git diff --check` with only pre-existing line-ending warnings.
- Runtime stayed frozen: `app.js` SHA-256 `5AB01914C5B2AFA0E17838AAB59C2E0CAC5D8A4CA8E0956A23F382A4818AE566`; `docs/30_OBSERVATION_CANDIDATE_359A.json` SHA-256 `C153CDB5CF2182CF78D1F2423E49FA883B8EF5E50D539266CF6CD7F196C7E4BC`; `observationAllowed=false / releaseCleared=false`. LP05, `C3-X01`, `NP-CDE/NP-FG` runtime, child observation, prototype/UI dispatch and media integration remain locked.

## 2026-07-25 - Media Attempt Ledger And Scheduler Status Reconciliation

- Independently reviewed `concepts/runtime-candidates/workshop-prop-sheet-release-source-2026-07-23/`. Exactly one authorized `gpt-image-2` request reached the provider and returned HTTP 502; it produced `0` images, used no second request and no provider fallback, and created no runtime reference. The candidate remains `source_missing / runtimeApproval=false`.
- Corrected the candidate-local contradictory zero-call ledger. Root manifest schema 2, attempt/error records and `verify_attempt_001_failure.py` now agree on one failed call; the retired `verify_zero_call.py` exits nonzero and can no longer overwrite current verification. Current `verification.json` SHA-256 is `BED9BCDFAA07EE204B3FB19A35BD02C3633421D026B692964E8A27C74BA149F5`.
- Reconciled `docs/31` with already-implemented scheduler behavior. Fresh browser evidence is `C4-R01A 35/35`, `C4-R01B 31/31`, and exact-anchor adversarial `9/9`, covering global review spacing, fair rotation, difficult-review story-first recovery, review-free resumes, exact retained anchors and fail-closed malformed anchors.
- Added a curriculum-fact guard against restoring the stale `missing_runtime` claim. This documentation/tooling correction does not change the frozen 359a runtime, unlock LP05, approve media, open child observation, or reduce the 13 mature-release blockers.
- Verification passed: external intake `2 valid / 0 missing / 0 invalid`; media attempt verifier with SHA-256 `BED9BCD...149F5`; runtime provenance `889`; curriculum facts `58`; curriculum/story `44/44`; runtime pacing `1199`; scheduler `35/35 + 31/31 + 9/9`; maturity `51` facts / `15` requirements / `13` blockers; `check:quick`; strict bundle `47` files / `1,700,918` runtime-asset bytes; and `git diff --check` with only pre-existing line-ending warnings. Frozen hashes remain `app.js 5AB01914...E566` and manifest `C153CDB5...E4BC`.

## 2026-07-25 - External Audit Intake And Runtime Pacing Metadata Gate

- Reverified the two user-returned external ChatGPT ZIPs byte-for-byte: course SHA-256 `4F009D1C7C52342492A12FFF0BCB1456132259817B05BAC123E86F0AA8C9DBAD`, UI SHA-256 `245A8E7B1935A5E38498E3C4DCCB492178ADDB0A71CCBBA1836C873A66E656BC`. They are the same inputs already triaged in `docs/56` and `docs/65`; no duplicate broad course/story or 13-screen UI audit was started, and the UI package's four concept PNGs remain quarantined and unapproved.
- Added `docs/80_RUNTIME_PACING_METADATA_CONTRACT.json` and `tools/runtime-pacing-metadata-audit.mjs`. The contract maps 39 canonical lessons to 38 pacing units: 23 exact frozen-runtime bundles and 15 future/conditional/optional units that remain runtime-forbidden.
- The fail-closed audit checks exact 359a hashes and approval holds, input budgets, world-progress cadence, verb variety, permanent outcomes, natural rests, phase-tail settlement, next-task continuity, runtime action order, and the absence of future units from the current app. It is registered as `check:runtime-pacing` and runs inside `check:quick` after curriculum/story coherence.
- This is documentation and tooling only. It does not change runtime, pitches, lesson order, session/mastery semantics, assets, media, `observationAllowed=false`, `releaseCleared=false`, or the 13 mature-release blockers.

## 2026-07-25 - Per-Lesson Story Result And Next-Task Continuity

- The parent-readable route index in `docs/24_HUMAN_STORY_AND_LESSON_BOOK.md` now gives each of the 39 canonical lessons its own world result, natural stop and next child-started task. Seven grouped labels were expanded; S01 intentionally remains three short phases of one canonical lesson.
- The review found and corrected one real story-copy contradiction: M03's lesson body and canonical story define one missing singing wheel, while the route index incorrectly said two wheels were installed. The route now says the single missing wheel returns and the car stands securely.
- `tools/curriculum-story-coherence-audit.mjs` now requires the exact 41-row story order (`39` lessons plus two additional S01 phase rows), five non-empty columns per row, individual lesson labels, and the post-finale TH08 -> optional TH06 -> TH07 ordering.
- Curriculum/story passes `44/44` and curriculum facts pass `57/57`. This changes no runtime, lesson notes, mastery semantics, observation approval or release approval; later-course runtime and real teacher/child evidence remain missing.

## 2026-07-25 - Historical Provenance Snapshot Boundary Lock

- `tools/runtime-asset-provenance-audit.mjs` now treats `concepts/provenance-recovery-2026-07-23/` as a frozen 353b audit snapshot rather than a current 359a matrix. It pins the four accepted recovery-artifact hashes and the historical input-matrix SHA-256 `1859CD7C...DCA38C`.
- The same gate independently pins the current `docs/62` SHA-256 `BB5744F9...2BA86`, requires the active reproducible M08 A2 asset, rejects the retired v3 path from the current matrix/runtime, and requires current T1 `7` / T5 `0` with `releaseCleared=false`.
- The historical `passed=0 / partial=26 / missing=1 / contradicted=0` result remains valid only for its old input. It cannot be used to reintroduce the retired T5 row, promote a source tier, approve runtime integration, or clear release rights.
- The provenance gate passes `889` checks. No runtime file, image, course rule, mastery rule, observation approval or release approval changed; frozen `app.js` remains SHA-256 `5AB01914C5B2AFA0E17838AAB59C2E0CAC5D8A4CA8E0956A23F382A4818AE566`.

## 2026-07-25 - Visual, Child, And Device Field-Return Intake

- Added `tools/verify_field_review_return.mjs` and three Star-Dino-only templates under `review/field-return-templates/`. The verifier locks exact 359a identity, source-document hashes, the 27-item asset matrix and visual contact sheet, recomputes aggregate status, rejects cross-product markers, and keeps every runtime, observation, mastery, full-device-matrix and release approval false.
- Visual status is recomputed as incomplete, non-independent, redesign, unable, or screening candidate pending supervisor. Child intake hard-stops before supervisor-accepted adult iPad preflight, rejects privacy/consent failures, limits one child to directional evidence, and limits a qualifying 3-5-child cohort to a low-age-comprehensibility candidate. Device intake validates one evidence batch only and can never self-declare D1-D3/M1-M2/A1/P1 complete.
- Self-test passes `28` assertions with `6` valid or explicitly nonqualifying fixtures and `22` tamper rejections. Blank templates pass `3/3` in fail-closed states. Both commands are now part of `check:quick`.
- This is review-only infrastructure. Real adult, teacher, SFX, visual, child and device evidence remains missing; `observationAllowed=false`, `releaseCleared=false`, visual clearance remains `0/27`, and the mature release gate still has `13` blockers. Frozen `app.js` remains SHA-256 `5AB01914C5B2AFA0E17838AAB59C2E0CAC5D8A4CA8E0956A23F382A4818AE566`.
- Verification passed current-state maturity `50` facts / `15` requirements / `13` blockers, curriculum/story `43/43`, curriculum facts `57/57`, `check:quick`, strict bundle (`47` files / `1,700,918` runtime-asset bytes), and `git diff --check`. Strict mature release failed closed on the same 13 blockers, as required.

## 2026-07-25 - Release-Gate Dependency And Deadlock Correction

- An independent read-only dependency audit confirmed that current-state maturity still has `45` fact checks and `13` release blockers; exit code 0 in current-state mode means the missing facts are recorded honestly, not that release passed.
- LP05 prerequisite sources disagreed. `docs/66` formerly listed only adult 359a preflight, first-child observation and supervisor dispatch, while `docs/72` also required teacher Stage B to contain no curriculum P0. The authoritative order is now adult 359a preflight -> child observation and teacher Stage B in parallel -> both supervisor-reviewed without blocking P0 -> LP05-only dispatch.
- `docs/70` formerly required TH06-TH08-specific child evidence before starting the runtime that children would have to observe. It now separates pre-implementation teacher/generic-device gates from post-implementation child acceptance; child findings may reject or revise a candidate but cannot be fabricated before it exists.
- `docs/29` now labels the old `maturity_release_blockers_14` token as a historical snapshot, records successor-candidate migration, and points to `docs/79_RELEASE_GATE_DEPENDENCY_AND_RETURN_CONTRACT.md` for the current dependency graph and return boundaries.
- No runtime, lesson order, note sequence, story result, mastery rule, asset or approval bit changed. The frozen candidate remains `overhaul-359a-map-shell-scroll-reset` / `app.js 5AB01914...E566`; real adult, teacher, child, SFX and similarity results remain missing.
- Verification passed current-state maturity `49` facts / `13` blockers, curriculum/story `43/43`, curriculum facts `57/57`, quick, strict bundle (`47` files / `1,700,918` runtime-asset bytes), and `git diff --check`. Strict release failed closed on the same 13 blockers, as required.

## 2026-07-25 - Review Hub Alternate-Port Handoff

- The two external ChatGPT audit ZIPs were rechecked byte-for-byte and remain the already-triaged course `4F009D1C...9DBAD` and UI `245A8E7B...E656BC` inputs. No duplicate curriculum, story, screen-by-screen UI or visual total audit was started; the UI ZIP's four extra PNGs remain quarantined.
- The frozen child candidate remains `overhaul-359a-map-shell-scroll-reset`; `app.js` SHA-256 remains `5AB01914C5B2AFA0E17838AAB59C2E0CAC5D8A4CA8E0956A23F382A4818AE566`.
- Review-only routing now accepts a validated `appPort=1..65535` query on the hub and propagates it only to the adult iPad preflight page. Invalid values fall back to canonical `4199`; teacher, nonvoice-SFX and visual-similarity actions never inherit the parameter. A `/review/` base also makes the documented hub root load its own assets and adult form consistently.
- Adult preflight documentation names the alternate-port form `http://<LAN-IP>:<review-port>/?appPort=<app-port>` without changing the frozen candidate identity, qualification logic, privacy boundary or any approval bit.
- Verification passed: adult iPad preflight `66/66`, review hub browser `62/62`, allowlist server `48/48`, maturity current-state `45` facts with `13` blockers, curriculum/story `43/43`, curriculum facts `57/57`, quick, strict bundle (`47` files / `1,700,918` runtime-asset bytes), and `git diff --check`. Real review results remain `0/4`, `observationAllowed=false`, and visual release clearance remains `0/27`.

## 2026-07-24 - External Evidence Scheduling Dependency Correction

- The two returned ChatGPT audit ZIPs remain exact, already-triaged inputs: course SHA-256 `4F009D1C...9DBAD` and UI SHA-256 `245A8E7B...E656BC`. No duplicate course or screen-by-screen UI audit was started.
- A supervisor cross-check found one execution-language contradiction: `docs/72` stages teacher A/B/C around the adult physical-iPad preflight and Chapter 4 progress, while the unified review hub called all four evidence tasks parallel and could be read as requiring all 30 teacher questions immediately.
- The hub now marks adult physical-iPad preflight as the current critical path, teacher stage A and visual-similarity screening as available in parallel, nonvoice SFX listening as physical-iPad dependent, teacher stage B and first-child observation as post-preflight work, and teacher stage C as Chapter-4-timed work. Child observation remains blocked.
- This correction changes adult scheduling copy, generated review metadata and fail-closed review assertions only. It does not modify the 359a child runtime, lesson order, note sequence, session, phase settlement, mastery, assets, media or any approval bit.
- Verification passed: review hub `58/58`, allowlist server `48/48`, curriculum/story `43/43`, curriculum facts `57/57`, `check:quick`, strict bundle (`47` files / `1,700,918` runtime-asset bytes), and mature current-state (`45` facts / `13` blockers). Real results remain `0/4`; visual release clearance remains `0/27`.

## 2026-07-24 - Future Chapter Acceptance Contract Cross-Check

- The supervisor cross-checked `docs/66-70` against the canonical route, human lesson book, pacing contract and Chapter 4/5 runtime contracts in `docs/03/24/33/34/35`. LP05 E3-F3-G3, TH01-TH04 register/staff routes, TH05 2/4/4/5/5 child-started actions, phase tails, single-current-task home flow and the core-TH08-before-optional-TH06/TH07 order are coherent.
- One stale fact was corrected: `docs/68` still named the frozen runtime as 357a while all current sources use `overhaul-359a-map-shell-scroll-reset`. No note sequence, teaching axis, story cause, session, phase settlement, mastery rule, runtime file, asset or approval changed.
- Review infrastructure independently remained green: hub `48` assertions, allowlist server `48`, adult-iPad page `62`, teacher staged page `82`, human-return self-test `19`, and human-return integration `13`. These checks prove tooling only; accepted real-world results remain `0`, and the adult physical-iPad, teacher and child gates remain missing.
- The future checklists remain `runtime_forbidden`. The frozen prototype/UI and media tasks were not contacted and received no implementation work.

## 2026-07-24 - Curriculum Ten-Field And Route-Continuity Review

- The supervisor compared all 39 canonical lesson sections in `docs/24_HUMAN_STORY_AND_LESSON_BOOK.md` with the ten-field pacing contract in `docs/33_GAME_TEACHING_PACING_AND_MOTIVATION_CONTRACT.md`. Story cause, single teaching axis, prior ability, music action, world response, first teaching, repair, achievement semantics and mastery boundaries remain coherent. The recurring human-readability gap was that 29/39 sections relied on the chapter-level stop rule instead of stating the next stop in the same lesson block; this was documentation ambiguity, not a runtime route defect.
- `docs/24` now has a single “做完后去哪儿” route index for M01-TH08. It explicitly separates same-short-lesson automatic step transitions from post-rest child-initiated entry, names the one current next task, and labels current runtime, current unsubmitted candidate, and planned/teacher-gated content. LP02 now also states repair behavior for an arbitrary wrong note and a same-name wrong octave.
- New audit record: `docs/78_CURRICULUM_TEN_FIELD_AUDIT_2026-07-24.md`. `C3-X01`, `NP-CDE`, `NP-FG`, LP05+, Chapter 5, physical iPad, teacher, child, asset clearance and release states remain unchanged and unapproved.
- Verification after the documentation-only edits: curriculum/story `43/43`, curriculum facts `57/57`, `npm run check:quick` pass, `npm run check:bundle:strict` pass (`47` files / `1,700,918` runtime-asset bytes), and `git diff --check` pass with only pre-existing line-ending warnings. Runtime hashes and release approvals were unchanged.

## 2026-07-24 - Supervisor Ledger Count Reconciliation

- A current-summary audit found two stale counts in `docs/29_PROJECT_COORDINATION_AND_INDEPENDENT_AUDIT.md`: the parent-map paragraph said `42/42` curriculum/story checks and the UI reconciliation paragraph said `54` curriculum facts. The live commands returned `43/43` and `57/57`; only those current-summary numbers were corrected. Historical entries were left unchanged.
- After the documentation-only correction, `node tools/curriculum-status-fact-audit.mjs`, `node tools/curriculum-story-coherence-audit.mjs`, `npm run check:quick`, `npm run check:bundle:strict`, and `git diff --check` passed. No runtime, lesson order, note sequence, mastery, asset, media or approval state changed.

## 2026-07-24 - 359A Workshop Identity Recheck

- The isolated child runtime at `http://127.0.0.1:4199/` was rerun through `chrome-test/workshop-identity-telemetry-check.mjs`. The only initial failure was a stale test label and version assertion for `overhaul-348a-course-director`; the served candidate is `overhaul-359a-map-shell-scroll-reset`. The assertion was narrowed to the current 359a build and did not change runtime behavior.
- The clean and continuation paths both passed after the correction: `workshop identity and telemetry checks: 36 passed, 0 failed`, including the color-reduced M02 completion (`placedSlots=3`, result modal hidden), letter-name-only child surfaces, nonblocking feedback, and clean browser console. No course, note order, mastery, session, asset, media or approval field changed.
- `npm run check:quick`, `npm run check:bundle:strict`, and `git diff --check` passed. The candidate remains `observationAllowed=false / releaseCleared=false`; this closes only a stale regression-test assertion.

## 2026-07-24 - Evidence Hub And Frozen 359A Transport Recheck

- Supervisor reran the external-evidence infrastructure against the exact `overhaul-359a-map-shell-scroll-reset` candidate. `check:review-hub` passed `48` assertions with `4` tasks and `0` accepted results; `check:review-hub-server` passed `48` assertions with `3` allowlisted packages, `0` runtime routes and `0` write methods.
- The teacher r2 package passed deterministic verification (`2/2` byte-identical builds, `5/5` tamper rejections, SHA-256 `F8297D5C...F64E56`). The adult iPad review page passed `62` fail-closed assertions, the teacher staged page passed `82`, and the human-return verifier self-test passed `19` assertions. These are delivery-tool checks only; real adult iPad and teacher results remain missing.
- Raw HTTP byte comparison from the trusted local runtime on `4199` matched the frozen manifest for `app.js`, `index.html` and `service-worker.js` byte-for-byte. The LAN endpoints `http://10.3.142.131:4199/` (child runtime) and `http://10.3.142.131:4201/` (review hub) both returned HTTP 200. Text-decoding hashes are not used as build evidence.
- No runtime, course, mastery, asset, media or approval field changed in this recheck. `accepted_results=0`, `observationAllowed=false` and `releaseCleared=false` remain authoritative; the 13 release blockers are unchanged.

## 2026-07-24 - External Audit Dialogue Clarity Follow-up

- The two user-supplied result ZIPs remain exact matches to the controlled intake: course `4F009D1C7C52342492A12FFF0BCB1456132259817B05BAC123E86F0AA8C9DBAD`, UI `245A8E7B1935A5E38498E3C4DCCB492178ADDB0A71CCBBA1836C873A66E656BC`. The original UI package still remains quarantined for its four PNG entries; only the verified Markdown-only derivative is used for supervisor triage.
- `docs/24_HUMAN_STORY_AND_LESSON_BOOK.md` now uses short child-facing lines for M05/M08 and C3-X01, and every human-readable G locator in the reviewed LP05/M06/FG02 passages explicitly names the white key between the first two black keys in the three-black-key group. This is documentation-only; C3-X01 remains teacher-gated and runtime-forbidden.
- No runtime file, lesson order, note sequence, input route, phase settlement, `played/stable/retained` rule, asset approval or media candidate changed. `npm run check:curriculum-story` passes `43/43`, `check:curriculum-facts` passes `57/57`, `check:quick` passes, `check:bundle:strict` passes, and the frozen runtime hashes remain `app.js 5AB01914...E566`, `index.html 8768366E...A2B9B`, `service-worker.js 34B60070...91AD`.

## 2026-07-24 - Parent Course Map And Evidence Glossary

- `docs/24_HUMAN_STORY_AND_LESSON_BOOK.md` now opens with a parent/teacher map that explicitly pairs the four current child-place labels with their story titles: `月球基地 -> 月亮小家`, `星星桥 -> 星星桥`, `呼吸花园 -> 会听的小种子`, and `地下回声洞 -> 咚咚的低音星球`. It states that these are one story line rather than duplicate levels, and that Chapter 5 has not entered the child map.
- The same plain-language section defines `音符护照`, `自由琴键`, `少提示练习`, `故事完成`, `玩过`, `本次稳定`, `隔一次还记得`, and `需要再练`. Collection, story completion and immediate performance cannot be mistaken for mastery or retention.
- External course-audit item P1-6 and `P1-STORY-NAME-GLOSSARY` are now recorded as `resolved_in_parent_lesson_map / runtime_unchanged` and `DONE-P1-STORY-NAME-GLOSSARY` in `docs/56`. This closes a documentation-comprehension gap only; real-parent comprehension still requires observation.
- `npm run check:curriculum-story` passes `42/42`, including an exact cross-check against the canonical mapping in `docs/03`. `check:curriculum-facts` separately fails closed if the external triage reopens the old partial status. No runtime, chapter id, note order, scaffold, mastery threshold, asset, input route or approval changed.

## 2026-07-24 - Adult External-Evidence Execution Hub

- `review/index.html` now gives adults one local entry for four independent real-world tasks against frozen candidate `overhaul-359a-map-shell-scroll-reset`: physical-iPad preflight, preschool-piano-teacher r2 review, seven-item nonvoice-SFX listening, and external visual-similarity screening. These are not the two returned ChatGPT course/UI audits; those results remain accepted for supervisor triage under `docs/56` and `docs/65`.
- The generated manifest is fail-closed at `4` tasks, `4` missing and `0` accepted. Every privacy field is false, every approval field is false, child observation remains blocked, and the page cannot write course, mastery, stable/retained, runtime, integration or release approval.
- The hub pins the then-current teacher package, current audio ZIP SHA-256 `F38289D48EA65EFFC92AD10EE4B84CB059C87C2820A38FCB4EF00306CE66C520`, visual ZIP `782F37DAC8B33F3BBDB01091FDF3B9913B98890CCEE02418FA719C4AE59C174F`, and current `app.js` SHA-256 `5AB01914C5B2AFA0E17838AAB59C2E0CAC5D8A4CA8E0956A23F382A4818AE566`.
- `npm run build:review-hub` rebuilds the data and manifest. `npm run check:review-hub` passes `46` browser assertions at `1366x900` and `390x844`, with `0` external requests, `0` browser errors and no horizontal overflow. Clean evidence is in `review/audit-captures-hub/`; machine state is in `review/review-hub-manifest.json` and `review/review-hub-verification.json`.
- `npm run serve:review-hub` provides a separate trusted-LAN entry on port `4201`; frozen runtime remains on `4199`. The server uses an exact route allowlist rather than exposing the repository. `npm run check:review-hub-server` passes `48` assertions: the three downloadable ZIPs match their exact size/hash, project runtime routes and old packages remain inaccessible, path traversal is rejected, and accepted write methods remain `0`. Deterministic evidence is `review/review-hub-server-verification.json`.
- This is review-delivery infrastructure, not new human evidence. Mature current-state remains `45` facts / `15` requirements / `13` release blockers, and strict release must continue to fail. Frozen `app.js`, `index.html` and `service-worker.js` hashes are unchanged; no runtime, lesson, media or asset file was modified by this work.

## 2026-07-23 - Note Passport Threshold Correction And Teacher Review r2

- Independent follow-up found that the draft `NP-FG` stable threshold of at least `3/4` first responses was too weak for four balanced binary F/G calls: random guessing reaches it with probability `5/16 = 31.25%`. `docs/61/71/72` now use a provisional F/G threshold of two F plus two G calls with `4/4` first responses correct. Help still completes the story and preserves child achievement, but cannot create stable evidence.
- Stage A now includes A11, which explicitly asks a qualified preschool piano teacher to judge all three provisional evidence thresholds: `C3-X01` at at least 3/4 complete two-step first responses with C/D/E each represented, `NP-CDE` at 3/3, and `NP-FG` at 4/4. The staged protocol is now `r2`, with A11/B9/C10 = 30 questions. Existing r1 exports and the v1 ZIP are historical only and fail current protocol validation.
- The rebuilt local page and the actual extracted ZIP both pass `82` browser assertions at `1366x900` and `390x844`, including exact A11 semantics, all fail-closed branches, revision-isolated localStorage, complete JSON export, no upload/media/autoplay/external request, three decoded Star Dino S01 references, clean synthetic state and no horizontal overflow.
- Deterministic package `dist/review/star-dino-teacher-staged-review-359a-v2.zip` contains `16` allowlisted files plus one embedded manifest, `1,981,124` bytes, SHA-256 `F8297D5C41DDB5D6CB6D498B466B99BD9CDFAAC9A0A3F72DDF7CA45F29F64E56`. Verification reports `2/2` byte-identical builds and rejects `5/5` tampered variants. The v1 ZIP remains untouched as historical evidence.
- This correction changed curriculum specifications, adult review infrastructure and audit gates only. It did not modify runtime, note sequences, phase settlement, story/played/stable/retained runtime semantics, input routes or assets. Real teacher A/B/C results remain missing; C3-X01, NP-CDE and NP-FG remain runtime-forbidden; the maturity state remains 15 requirements with 13 release blockers.

## 2026-07-23 - External Audit Intake Follow-up And Apple Competitor Evidence Refresh

- The returned course and UI ZIPs remain exact-hash matches to the already verified sources: course `4F009D1C7C52342492A12FFF0BCB1456132259817B05BAC123E86F0AA8C9DBAD`, UI `245A8E7B1935A5E38498E3C4DCCB492178ADDB0A71CCBBA1836C873A66E656BC`. `docs/56` and `docs/65` remain the authoritative triage records; no external finding automatically changed runtime, lesson order, mastery, assets or approval state.
- `docs/77_APPLE_COMPETITOR_EVIDENCE_REFRESH_2026-07-23.md` now records dated official-source claims and explicit unknowns for Apple Kids, Simply Piano, Piano Maestro, Note Rush, Mussila, Duolingo Music, Piano Academy, Loog Piano and Hoffman Academy. It is positioning evidence only, not a hands-on comparison, effectiveness study, market-share report, legal clearance or global-uniqueness proof.
- The evidence corrects the old unsupported implication that Note Rush targets an older group: its official page says `all ages`, while no narrow 4-6 claim was found. It also establishes that note reading, ear training, touch piano, acoustic/microphone recognition, MIDI, child themes, songs and teacher views already exist in the category and cannot be marketed as single-feature exclusives.
- The current defensible hypothesis is the combination of pre-reading 4-6 design, independent `sound -> staff -> same-name key` transfer, dinosaur-carried solfege to letter-name retrieval, story-world consequences, touch-complete optional input, separate story/played/stable/retained evidence and parent-readable relationship reporting. `docs/57`, `docs/71`, teacher review and child observation remain missing, so this is not yet an outward learning or uniqueness claim.
- `check:competitive-facts` passes `26` fail-closed checks; `check:quick` and `check:bundle:strict` pass. Curriculum facts remain `53`, curriculum/story remains `41/41`, strict bundle remains `47` files / `1,700,918` runtime-image bytes, and maturity current-state remains `45` facts / `15` requirements / `13` blockers. Strict release correctly exits `1` on those 13 blockers. Frozen `app.js`, `index.html` and `service-worker.js` retain their 359a hashes; no implementation or media task was dispatched.

## 2026-07-23 - External UI Triage Current-State Reconciliation

- A supervisor reread found an internal status contradiction in `docs/65`: its header and implementation update correctly closed UI-P0A/P0B/P0C in 355a-357a, while five TOP-20 rows still described the 354b findings as current P0 defects.
- The rows for homepage task emphasis, M01 local feedback, C1-01 world result, phase-tail summary and completion bubble now point to their exact 355a/356a evidence. Remaining non-current landmark affordance is classified as final-map-art partial; S01 remains teacher-gated P1; garden/cave and release art remain open.
- `check:curriculum-facts` now fails closed if those five implemented items regress to `visual_P0_current`, or if the S01 and release-art debts disappear from the ruling. It passes `53` checks. No runtime, lesson order, phase eligibility, mastery, media or approval bit changed.

## 2026-07-23 - Human Review Return Intake And Recalculation

- `tools/verify_human_review_return.mjs` accepts only the frozen 359a adult-iPad or preschool-teacher JSON protocols, recalculates every status from the submitted fields, and refuses to trust exported `status`, candidate flags, approval bits, question text, build identity or document hashes. It always reports supervisor acceptance as false.
- `npm run check:human-review-return:selftest` passes `19` assertions: `4` canonical valid fixtures and `15` rejected tamper cases covering the historical teacher r1 protocol, other stale revisions, wrong builds, missing or duplicate items, changed prompts, forged pass states and flipped approval fields.
- `npm run check:human-review-return:integration` passes `13` assertions against the actual local review pages. It exports one synthetic adult record and all three synthetic teacher stages (`30` questions), verifies them through the independent recalculator, rejects forged adult status and teacher prompt changes, and records `0` external requests and `0` browser errors.
- Status is `human_review_return_intake_infrastructure_passed / return_structure_recomputation_passed / authenticity_self_reported_unverified / adult_physical_iPad_result_missing / preschool_piano_teacher_result_missing / no_automatic_approval`. JSON consistency cannot cryptographically prove the reviewer, device or real-world observation. The mature current-state audit has `45` fact checks and still has exactly `13` release blockers.

## 2026-07-23 - Preschool Piano Teacher Three-Stage Offline Review Infrastructure

- `review/preschool-piano-teacher-staged-359a/` converts the canonical teacher material in `docs/61/72` into an adult-only A/B/C review tool for frozen candidate `overhaul-359a-map-shell-scroll-reset`. Its A10/B9/C10 questions are extracted directly from `docs/72`; Stage A includes exactly three current Star Dino S01 references, while Stages B/C deliberately contain no screenshots of unimplemented lessons.
- The page fails closed for missing answers, an unqualified or non-independent reviewer, child involvement, an unexplained `revise`, or any `unable to judge`. A fully passing stage can only become `stage_pass_candidate_pending_supervisor`; all three synthetic passing stages can only become `all_stages_pass_candidate_pending_supervisor`. Teacher acceptance, course freeze, runtime, integration, observation, stable/retained and release approvals remain false.
- `npm run check:teacher-staged-review` passes `81` assertions at `1366x900` and `390x844`: exact 29-question extraction, all decision branches, revision-scoped localStorage, combined JSON export, no upload/media/autoplay/external request, three decoded references, clean synthetic state and no horizontal overflow. The same `81` assertions also pass against the actual ZIP after extraction through `file://`, proving the documented no-server route.
- Deterministic package `dist/review/star-dino-teacher-staged-review-359a-v1.zip` contains `16` allowlisted files plus one embedded manifest, `1,980,456` bytes, SHA-256 `89FC729B96A5D574629F3C3C507029B858FBB6C29A33D26B5A9EBDFD272C3597`. Verification reports two byte-identical rebuilds and rejects `5/5` tampered variants: changed content, approval flip, unsafe path, timestamp drift and missing file. Runtime, audio, concepts, private recordings, child data and forbidden cross-product markers are absent.
- Status is `teacher_staged_review_infrastructure_passed / preschool_piano_teacher_result_missing / no_runtime_approval`. This closes only the reliable review-delivery gap. A real qualified teacher has not returned Stage A, B or C, so the `preschool-piano-teacher` maturity requirement remains missing and the release blocker count remains `13`.

## 2026-07-23 - Adult Physical-iPad Preflight Local Review Infrastructure

- `review/adult-ipad-preflight-359a/` turns the text card in `docs/60` into an adult-only, local structured review page for the exact frozen candidate `overhaul-359a-map-shell-scroll-reset` / `359a · 5AB01914`. It remains outside the production bundle and has no runtime reference, media element, autoplay, audio generation, upload API, child-data field or recording path.
- The page requires a physical-iPad confirmation, Safari, model, iPadOS, output route, system/App volume, exact observed build and the five canonical checks: landscape/keyboard fit, C-G pitch order and integrity, unobscured M03 target note, ordered nonoverlapping wrong-C then target-D comparison, and comfortable volume plus mute. Data is revision-scoped in localStorage; adults can copy a human summary or export structured JSON.
- Every incomplete, pending, non-iPad, non-Safari, wrong-build, failed or unable-to-judge path is fail-closed. Even complete all-pass data exports only `pass_candidate_pending_supervisor`; `finalPassed=false`, `childObservationAllowed=false`, and every mastery/stable/retained, observation, runtime, integration and release approval remains false.
- `npm run check:adult-ipad-preflight-review` passes `62` assertions, including all six nonqualifying states, an all-pass export, wrong-revision storage isolation, exact `4200 -> 4199` link mapping, the narrow-server command, no external requests or browser errors, and zero horizontal overflow at `1366x900` and `390x844`. Synthetic audit values are cleared before `desktop-clean.png` and `mobile-clean.png` are captured. Machine evidence is `review-manifest.json` SHA-256 `3C34D035D94288727C94E86AA77366C7280BEE7DB61B5FE6A12A31689FB8DF1E` and `review-verification.json` SHA-256 `2B653CA905B6251C5313280B29CBE8F55C1611BA0AC896737CE0CDBF60143B01`.
- This closes only the review-infrastructure gap. `adult_physical_iPad_result_missing` remains true until a real adult returns evidence from a physical iPad Safari and the supervisor accepts it. Child observation remains forbidden. The mature current-state audit now has `43` fact checks and the same `13` release blockers.

## 2026-07-23 - Grok Batch10-12 Independent Source-Only Review

- The supervisor independently inspected first/middle/last and all-frame contact sheets for all `8 + 6 + 2 = 16` existing Batch10-12 originals. No Grok, Gemini, Sora, image-generation, or new-video call was made.
- Batch12's existing local finalizer created two muted review derivatives, two three-frame sheets, two all-frame sheets, two reduced-motion posters and one master sheet. Both muted reviews contain zero audio streams and zero attached covers; the two raw hashes remain `F0958C8F...E82C7` and `B577993D...31BF`.
- Final rulings are `3 preferred_source_only / 6 partial_source_only / 7 rejected`. Explicit rejects include a face-like roof, animal-face shuttle, commercial airliner, causally false equipment morph, unreadable pebble footsteps, static white-stage bridge and center-blocking slab.
- `node tools/audit_grok_batch10_12_supervisor_review.mjs` passes `16/16`, matching every raw/contact/all-frame hash and confirming `runtimeApproval=false / integrationAllowed=false / releaseCleared=false / runtimeReferences=0`. Exact rulings are in `docs/76_GROK_BATCH10_12_SUPERVISOR_RULINGS.json`; human reasons are in `docs/76_GROK_BATCH10_12_SUPERVISOR_REVIEW_2026-07-23.md`.
- The mature current-state audit now has `42` fact checks and still reports the same `13` release blockers. Closing review debt does not produce final animation, release art, source rights, external similarity, iPad playback, teacher review or child evidence.

## 2026-07-23 - Seven-Item Nonvoice SFX Human-Listening Infrastructure

- The source-only review package is `dist/review/star-dino-nonvoice-sfx-human-listening-v1.zip`, currently `753,681` bytes / SHA-256 `F38289D48EA65EFFC92AD10EE4B84CB059C87C2820A38FCB4EF00306CE66C520`. Independent archive inspection found 35 entries under one root, zero unsafe or duplicate paths, and `34/34` package-manifest hashes matching.
- `python tools/verify_nonvoice_sfx_review.py` passes with protocol `nonvoice-sfx-human-listening/r1`, 7 canonical IDs, 28 visible players and 37 manifest-backed audio hashes. Independent recomputation confirms 7 WAV, 7 M4A and 7 OGG candidates have zero mismatches; no audio file was regenerated or transcoded.
- Both the workspace review page and staged self-contained package pass `node tools/with-playwright-path.mjs tools/audit_nonvoice_sfx_human_listening.mjs` in desktop `1366x900` and mobile `390x844` viewports. All 28 visible players load metadata and decode, autoplay is zero, Stop All is wired, browser errors and horizontal overflow are zero.
- Fail-closed probes pass for an empty export, one physical-iPad speaker route with only 6/7 items complete, and one complete speaker route without a headphone route: every case remains `overallStatus=pending`. The old LS04 three-item storage key is isolated from the new protocol. Four standalone Foley assets expose no invented A/B path; only seed-sprout, correct and retry expose C4/D4 A/B.
- Approval remains `runtime_candidate_unapproved / human_listening_missing`; `runtimeApproval=false / integrationAllowed=false / releaseCleared=false`, runtime references and cross-product markers are zero. A real adult must still complete separate physical-iPad speaker and headphone reviews. This evidence does not reduce the 13 release blockers or approve runtime integration.

## 2026-07-23 - 359a Map Shell Scroll Reset And Phase Continuity

- Current identity is `overhaul-359a-map-shell-scroll-reset`. Core hashes are `app.js 5AB01914C5B2AFA0E17838AAB59C2E0CAC5D8A4CA8E0956A23F382A4818AE566`, `index.html 8768366E0CB7ACF47F2EA7862B77E87B50B584AF31AD1010484128B4CF8A2B9B`, and `service-worker.js 34B600701609333CB4EB777E7F503E4B9449813C961E70EB9FB58DCBE56991AD`. The cache and parent-only build identity are 359a; all 27 runtime-image hashes remain byte-identical to 358a.
- The reproduced defect was an internal-scroll mismatch: after a lesson return `window.scrollY` was already `0`, but `#mapShell.scrollTop` remained `310`. This hid the topbar, current location and single next task even though the page had formally returned home. Map entry now resets both axes immediately and across the next two animation frames, covering clean entry, formal return, explicit pause and refresh/restored entry.
- `check:map-shell-scroll-reset` passes `12/12`. It proves clean and returned maps start at `scrollTop=0 / topbarTop=0`; the first M01 C proceeds directly to `M01-do-revisit` without a result or milestone; both C actions remain in the same `C1-01` session; complete phase return exposes only M02 “叫醒三颗小灯”; partial return exposes only “继续再找到一次 C，让地板锁紧”; and all 27 runtime assets retain their prior hashes. Original-size evidence is in `screenshots/map_shell_scroll_reset_359a/`.
- Shared regressions pass: home single task `23/23`, child course director `68/68`, child nonblocking feedback `62/62`, child feedback intensity `42/42`, sessions `74/74`, clean state `124/124`, iPad accessibility `43/43`, PWA `11/11`, and observation build identity `9/9`. Ordinary input, wrong input and intermediate correct input remain in-scene; only a complete phase tail may show one short buttonless summary.
- `docs/30_OBSERVATION_CANDIDATE_359A.json` freezes 47 self-contained files and has SHA-256 `C153CDB5CF2182CF78D1F2423E49FA883B8EF5E50D539266CF6CD7F196C7E4BC`; runtime images total `1,700,918` bytes. `observationAllowed=false / releaseCleared=false` remains unchanged. Physical iPad Safari, real MIDI/acoustic-piano microphone, adult listening, preschool-teacher review, child observation, final media, release provenance and external-similarity clearance remain missing.
- Local and `http://127.0.0.1:4199/` manifest verification pass. Two complete 359a observation builds are byte-identical: each contains 47 release files plus its embedded manifest and is `2,101,650` bytes / SHA-256 `FC8ACE12BD2C357B4FBD1AEE22C354D6981B13C92788F3CD7BB175A571417023`; both verify independently, and the verifier rejects all five tamper classes. `check:quick`, strict bundle, curriculum facts `52`, curriculum/story `41/41`, provenance `878`, privacy facts `54`, maturity facts `42` with 13 honest release blockers, PWA `11/11`, observation identity `9/9`, free piano `17/17`, Xingya equipment `29/29`, M08 provenance `18/18`, and roof route `97/97` pass against the isolated Star Dino server. Maturity facts pin the exact teacher Stage A, external visual-similarity and seven-item nonvoice-SFX review ZIP hashes; separate facts pin the preliminary name scan, Batch10-12 source-only rulings and parent-readable privacy/App Store answer draft while preserving human listening, native archive, operator contact, regional review and publication approval as missing.
- The returned external course and UI ZIPs remain exact-hash matches to the already triaged originals. `docs/56/65` remain authoritative, the UI package's four extra PNGs remain quarantined, and teacher-gated candidates in `docs/57/71` remain runtime-forbidden. No external suggestion automatically changed notes, mastery, runtime or assets.

## 2026-07-23 - Supervisor Coordination, A-G Scope And LAN Preflight Readiness

- The unique Star Dino runtime writer and the media-candidate task are both completed and idle. Neither has an active write transaction, and no duplicate course/UI/media audit was dispatched. The working path remains `G:\新电脑E盘\个人\大顺\钢琴\web_star_dino_workshop`; no Keyboard Captain source, screenshot, asset or identifier was used.
- The user had already placed A-G word typing after all current work. That instruction is now an explicit first-release scope decision: `maturity_ag_scope_excluded_from_v1`. The mode remains `parked_final_project / runtime_forbidden` and is not implemented or claimed complete. Mature current-state facts pass `42`; 15 requirements still have 13 blockers. Strict release must still fail on those 13 blockers.
- Current-state references in the README, Chapter 4 contract, LP05 checklist, UI triage, observation packet and adult preflight card now identify frozen 358a while retaining 357a as historical UI-P0C evidence. `app.js` and all 47 frozen runtime files remain unchanged.
- The current project is reachable on `0.0.0.0:4174`. The current Windows LAN address `http://10.3.142.131:4174/` returns the 358a shell, and the 47-file observation manifest verifies over that address with `observationAllowed=false / releaseCleared=false`. `docs/58/60` now use port 4174; port 4173 is not accepted as current Star Dino evidence on this machine.
- A LAN Chromium probe passed all seven child/parent build-identity and layout assertions, then correctly could not run the eighth cold-offline assertion because ordinary LAN HTTP exposes no `navigator.serviceWorker` secure context. This is not recorded as PWA failure: localhost PWA remains independently passed `11/11`, while LAN HTTP is explicitly limited to layout and adult listening. No physical iPad result, Service Worker offline claim, microphone permission, Web MIDI or child observation was created.

## 2026-07-23 - 358a M08 Traceable Pose

- Current identity is `overhaul-358a-m08-traceable-pose`. `app.js` remains byte-identical at `17B78E96F5D143EDDAFEC4463B8DE178DB2BD424B7F6B8D41A3BA15BC37AA276`; `index.html` is `76EAE92F1804AD6E5CEC8237D004BEC8D28721A5C9FBFD971C3872FB44902B63`, `service-worker.js` is `EC777BF2354EF3324B616163532A0598162F3576087D087D76F0FF0BCD2820F3`, and `roof-blueprint-overrides.css` is `DEDCE8DDA0FE9533CE6253CF99E15BD403D59ED26EB27543EC6CC8752E4A94F5`. The cache is `star-dino-pwa-overhaul-358a-m08-traceable-pose`; the parent-only observation label is `358a / 17B78E96`.
- M08 alone now renders `assets/runtime/xingya-suit-point-m08-route-a2.png`, an exact `205,311`-byte PNG copy of the selected A2 source with SHA-256 `AF3DCD97F0134487F86141C177A2DF8800BD9CA01B3F6F96442A79FC5BFB8236`. The source verification record remains SHA-256 `4E12FBC718E28C2D6DBD686DCB8829AB4F0C47674D327E5A5B14129AE30ED4FA`. The former T5 WebP is absent from active runtime, PWA, and strict bundle, and is retained byte-identically only at `assets/generated/retired/m08-provenance-missing-357a/xingya-suit-point-flat-m08-v3.webp` with SHA-256 `EEAA060FE8BC42618E142E2FBF7BC657BC63EA7A78BC8165136473D7B922BC79`.
- `check:m08-provenance-pose` passed `18/18`; roof route passed `97/97`; Xingya suit `29/29`; PWA shell `11/11`, including cold-offline byte/hash fetch of the new M08 pose; observation build identity `9/9`; free piano safety `17/17`; child note names `286/286`; clean state `124/124`; sessions `74/74`; audio contract `22`; and strict bundle `47` files / `1,700,918` runtime asset bytes. `git diff --check` passes.
- Original-size review captures are `screenshots/m08_traceable_pose_358a/m08-1024x768-dpr1.png`, `m08-1194x834-dpr2.png`, and `m08-1366x1024-dpr1.png`. They show all three sprouts and the complete pressure suit, clear keyboard/blueprint/bubble separation, and no console warnings or errors. The A2 candidate is runtime-integrated for this prototype only: `releaseCleared=false`, with external similarity and upstream-rights clearance still missing.
- Supervisor fact sources now point to the exact 358a bytes without weakening any approval hold. `docs/30_OBSERVATION_CANDIDATE_358A.json` freezes 47 files at manifest SHA-256 `A19BF62E053A9BF9D68D6FDCFF817F40029322E620B2F7488957AA40619E6D3D`; `observationAllowed=false / releaseCleared=false`. Runtime provenance passes `878` checks at T1 `7` / T5 `0`, but release clearance remains `0/27`. Privacy current-state passes `54` facts with five explicit blockers; after the separate A-G first-release scope decision, mature current-state passes `36` facts and reports `15` requirements / `13` release blockers. `check:quick`, strict bundle, manifest verification and `git diff --check` pass.
- Deterministic observation packaging now targets 358a. Two complete builds, `star-dino-358a.zip` and `star-dino-358a-round2.zip`, are byte-identical at `2,101,467` bytes / SHA-256 `26594566ADD065D5B6D400BA10D800F5D20ADC2EE9C1FA76D533AB716C52E354`; both independently verify and the tamper rejection matrix passes `5/5`. They remain local audit artifacts, not child-observation or release packages.
- The supervisor reran M08 `18/18`, roof route `97/97`, Xingya suit `29/29`, and PWA `11/11` against the isolated Star Dino server at `http://127.0.0.1:4174/`. Human review of `screenshots/m08_traceable_pose_358a_supervisor/` confirms the three sprouts, complete pressure suit and separated teaching surfaces. Physical iPad Safari, real MIDI/acoustic-piano microphone, preschool-teacher review, 3-5 child observations, final audio/media, external similarity and release-rights clearance, native build, TestFlight and App Store evidence remain missing.

## 2026-07-23 - External Audit Cross-Chapter Closure And Note Passport Contract

- Both returned external audit results remain exact and structurally valid in the controlled intake: `valid=2 / invalid=0`; adversarial intake self-test passes `9/9`. The course result is SHA-256 `4F009D1C7C52342492A12FFF0BCB1456132259817B05BAC123E86F0AA8C9DBAD`. The original UI ZIP with four PNGs remains quarantined; only the exact-hash Markdown-only derivative is supervisor-triaged. No external finding automatically changed runtime, mastery or assets.
- The cross-chapter review found one stale roadmap sentence that still placed `C5-X1/X2` before the finale despite the accepted universal-core-first route. It now states `TH05 -> TH08 core-relay-finale` for every child, with TH06/TH07/together-encore only on later child-started visits. A new fail-closed audit rejects the old sentence.
- The representation proof matrix now distinguishes correct display-carrier separation from independent retrieval. Existing C/Do pairing remains teaching exposure, not proof that hearing dinosaur solfege retrieves a letter. `docs/71_CROSS_CHAPTER_REPRESENTATION_AND_NOTE_PASSPORT_SUPERVISOR_CHECKLIST.md` separates quiet story collection, reduced-cue solfege-to-letter first response, one guided key transfer, expressive-name adult observation and later retention. It has no canonical ids and is teacher-review-only, runtime/media forbidden.
- Curriculum/story coherence passes `41/41`; curriculum facts pass `52`; `check:quick` and strict bundle pass (`47` files / `1,621,097` runtime asset bytes). Mature current-state facts pass `36` and now report `15` requirements / `14` blockers, including the explicit `naming-carrier-retrieval` blocker. `app.js` remains SHA-256 `17B78E96F5D143EDDAFEC4463B8DE178DB2BD424B7F6B8D41A3BA15BC37AA276`.
- This review changed curriculum, story, teacher-review and audit files only. It did not contact the frozen prototype task, did not change runtime, media or audio, and did not approve C3-X01, NP-CDE/NP-FG, LP05+, Chapter 5, child observation or release.

## 2026-07-23 - TH06-TH08 Universal Core Finale And Later Encore Contract

- The supervisor found and removed a real cross-document contradiction: TH05 required a single TH08 home exit while the old capability route could insert TH06-TH07 before that same ending. The corrected universal route is `TH01-TH05 -> TH08 core-relay-finale`; every child opens the garden before any paired invitation.
- Later child-started visits may offer `TH06 -> TH07 bar 1 -> TH07 bar 2 -> TH08 together-encore`, one current task and one new session at a time. Optional routing cannot be inferred from accuracy, stable labels, speed, pitch or presumed hand ability, cannot start in the core completion session, and cannot rewrite the core story completion, garden, character approval or collectibles.
- TH06 now has a specific teaching purpose: familiar `C3+C4 / G3+G4 / C3+C4` same-name pairs reduce note-selection load while introducing paired onset; TH07 transfers that experience to the actual `C3+C4` and `G3+E4` bar starts. Sequential fallback and deferred play remain equal. The `600 ms` animation and `350 ms` observation thresholds are explicitly provisional pending preschool-teacher and physical-device review.
- `docs/70_CHAPTER5_TH06_TH08_SUPERVISOR_ACCEPTANCE_CHECKLIST.md` is curriculum-only and runtime-forbidden. The expanded curriculum/story gate passes `39/39`; no runtime, media or audio file was changed by this review, and the frozen 357a candidate remains the only current browser observation baseline.
- Independent verification passed external-audit intake `2 valid / 0 invalid`, intake self-test `9/9`, curriculum facts `52`, `check:quick`, strict bundle (`47` files / `1,621,097` runtime bytes), maturity current-state (`35` facts / `13` release blockers) and `git diff --check`. `app.js` remains SHA-256 `17B78E96F5D143EDDAFEC4463B8DE178DB2BD424B7F6B8D41A3BA15BC37AA276`.

## 2026-07-23 - TH05 Five-Session Curriculum And Exit Contract

- The supervisor corrected the future TH05 plan from a ten-window relay session followed by an immediate full TH08 repeat to five explicit child-started actions with `2/4/4/5/5` inputs: supports, near high bar, far high bar, relay bar 1 and relay bar 2. TH08 is now the first uninterrupted two-bar performance.
- Completed supports, individual lights, relay steps and bridge spans persist through repair, refresh, map return and rest. Continuation sessions are story-first and cannot insert an opening review. The six `刚完成 / 现在 / 随后` home states are fixed, with only the current action enabled.
- TH05 first teaching writes component played/order and help provenance only. It cannot create TH03 role/register stable, actual-hand, paired-timing, sustain, two-measure or retained evidence. A/B1/B2/C1 have no settlement; only a formal clean C2 phase tail may show one lightweight buttonless milestone, while helped completion still opens TH08 with `needsPractice` and no clean milestone.
- `docs/69_CHAPTER5_TH05_SUPERVISOR_ACCEPTANCE_CHECKLIST.md` is curriculum-only and runtime-forbidden. `check:curriculum-story` passes `38/38`, curriculum facts pass `52`, `check:quick`, strict bundle (`47` files / `1,621,097` runtime bytes) and maturity current-state (`35` facts, `13` release blockers) pass. `app.js` remains SHA-256 `17B78E96F5D143EDDAFEC4463B8DE178DB2BD424B7F6B8D41A3BA15BC37AA276`; no runtime, media or audio file was changed by this review.

## 2026-07-23 - Adult iPad Preflight Route Correction And LAN Readiness

- The adult card previously allowed M01 or M03 for the wrong-note two-sound comparison. That was too broad: M01 intentionally uses local nonblocking feedback, while the ordered child-note-to-target-note repair transaction belongs to M03 and LS01-LS03. `docs/60` now sends the adult directly to `?level=M03&check=adult-ipad-preflight-357a`, asks for the known first-target `D` followed by an intentional `C` response, and requires complete nonoverlapping `C -> D` playback before another score can occur.
- The direct route is explicitly diagnostic-only. It cannot count as course completion, first-answer correctness, stable, or retained evidence; homepage/M01 still owns the normal layout and nonblocking-feedback check. The maturity current-state audit now fails if either the M03 route or this evidence boundary drifts.
- The existing server was confirmed listening on `0.0.0.0:4173`. On the current Windows LAN address, the 357a manifest verifier passed all 47 files over HTTP and reported `observationAllowed=false / releaseCleared=false`. The numeric LAN address is session-specific and is not frozen into the card; the adult must use the current IPv4 shown by Windows.
- `check:quick`, strict bundle, and the amended maturity current-state audit remain required. The card correction does not supply a physical-iPad result, human listening result, microphone/MIDI evidence, child observation, or release approval.

## 2026-07-23 - M08 Traceable Static Source Candidate Audit

- Route A1 proved that directly placing the traceable square `xingya-suit-point.webp` canvas in the tall M08 coach box makes the visible character too small. Route A2 removes transparent canvas only, retains every nonzero-alpha source pixel plus a fixed 12px transparent margin, and produces `candidate/route-a2-point-transparent-trim-margin12.png` at `410x456`, SHA-256 `AF3DCD97F0134487F86141C177A2DF8800BD9CA01B3F6F96442A79FC5BFB8236`. No character pixel was redrawn, recolored, repaired, or reposed.
- Original-size 1024x768 and 1194x834 three-way contact sheets compare current T5, unchanged A1, and transparent-trim A2 in the same frozen M08 coach boxes. A2 preserves three sprouts, the transparent helmet, suit, gloves, boots, backpack, and complete tail cover. Its visible width closely matches T5, its height is honestly recorded as 9-11px shorter, keyboard overlap is zero, and the small blueprint-tail alpha overlap remains comparable to T5.
- The first supervisor pass found two stale contact-sheet hashes in `manifest.json` that the then-current verifier did not enforce. The media task corrected both hashes and made every `auditArtifacts` path, existence check, and SHA-256 fail closed. A second independent `verify_route_a.py` run passed with `manifestAuditArtifactHashesMatch=true`; final `verification.json` SHA-256 is `4E12FBC718E28C2D6DBD686DCB8829AB4F0C47674D327E5A5B14129AE30ED4FA`.
- Both audit builds are byte-identical. All 27 `assets/runtime` hashes remain unchanged during verification; runtime references and cross-product markers are zero. The ruling is `source_candidate_unapproved / runtimeApproval=false / integrationAllowed=false / releaseCleared=false`. No runtime file, observation manifest, course rule, mastery rule, or `docs/62` entry was promoted. Built-in image generation remains missing with zero calls; Grok video remains quota-exhausted and hard-paused; current T5 release provenance and external-similarity clearance remain missing.

## 2026-07-23 - 357a Free Piano Safety Copy

- Current identity is `overhaul-357a-free-piano-safety-copy`. Core bytes: `app.js 17B78E96F5D143EDDAFEC4463B8DE178DB2BD424B7F6B8D41A3BA15BC37AA276`, `index.html AB85F6CE21F429120C608CEC37E3EAC1E09A622151C69AE4396ADB12D7CBC166`, `service-worker.js C3D53BD7A943DEBE906C1203AC0C7D7EDE8B8668289220C5EAF9D97CE7DFC95C`, `course-director.css 858BB506425FBACDC7855C9EEE9C1D115D003FC44E23764D06123DA28FC752CB`, and `child-feedback-intensity.css 615BF9285BC4F824E840EC79ADC27E59EBCD78524084085C7B7162255C1B0126`. The parent-only observation label is `357a / 17B78E96`; child map, lesson, milestone, character and ARIA surfaces remain build-free. `observationAllowed=false / releaseCleared=false` remain unchanged.
- The free-piano moon scene now reuses the existing complete sealed-suit image `assets/runtime/xingya-suit-good.webp`; no runtime asset was edited. Child-facing input status says `屏幕琴键`, `外接琴键`, or `钢琴声音`, and contains no `MIDI`, `Web MIDI`, protocol, or browser-compatibility wording. The parent `设备与声音` surface retains the accurate `连接 MIDI 键盘` disclosure. Free-piano touch, black/white-key input, simulated external keyboard input, optional microphone path, refresh, and exit preserve formal runtime/history/mastery bytes exactly and never create a formal session, target, score, result, milestone, played, stable, retained, or needs-practice evidence.
- `check:free-piano-safety` passed `17/17`; original-size human-reviewed captures are `screenshots/free_piano_safety_357a/initial-1024x768-dpr1-full.png`, `external-keyboard-1024x768-dpr1-full.png`, `initial-1194x834-dpr2-full.png`, `reduced-motion-1024x768-dpr1.png`, and `parent-devices-midi-1024x768.png`. The pressure suit, helmet, gloves, boots, backpack and tail are visible without covering the keyboard, input status or return control; child surfaces contain no technical wording and the parent page retains its MIDI fact.
- Regressions passed: parent history/free piano `20/20`, home single task `23/23`, child course director `68/68`, child nonblocking `62/62`, child feedback intensity `42/42`, sessions `74/74`, clean state `124/124`, motion `19/19`, iPad accessibility `43/43`, PWA shell `10/10`, observation build identity `9/9`, Xingya suit `29/29`, child note names `286/286`, curriculum/story `33/33`, runtime asset provenance `869`, audio contract `22`, and strict production bundle `47` files / `1,621,097` runtime asset bytes. `git diff --check` passes.
- Supervisor facts now point to `docs/30_OBSERVATION_CANDIDATE_357A.json` without weakening any assertion. `check:quick` passes, including curriculum facts `52`, curriculum/story `33/33`, runtime asset provenance `869` with release clearance `0/27`, privacy current-state `54` with five honest blockers, audio `22`, and the 47-file bundle. The amended maturity current-state audit passes `35` fact checks and reports 13 release blockers. Strict bundle passes. Strict privacy and mature-App release gates correctly fail with five and 13 blockers respectively; no approval bit changed.
- Deterministic observation packaging now targets 357a. `star-dino-357a.zip` and `star-dino-357a-round2.zip` are each `2,021,403` bytes / SHA-256 `A7743D07BF4CA241FA93B19A649D8C05812F627AC20E9AA527A7883AC2DEA614`, contain 47 release files plus one embedded manifest, pass independent verification, and reject all five tamper classes. They remain local audit artifacts with `observationAllowed=false / releaseCleared=false`.
- The user re-supplied the two external ChatGPT result ZIPs. They are byte-identical to the already registered originals: course `35,034` bytes / `4F009D1C7C52342492A12FFF0BCB1456132259817B05BAC123E86F0AA8C9DBAD`; UI `6,942,469` bytes / `245A8E7B1935A5E38498E3C4DCCB492178ADDB0A71CCBBA1836C873A66E656BC`. The UI original remains quarantined because of four PNG entries, while its eight Markdown entries match the `34,908`-byte sanitized package entry-for-entry and hash-for-hash. Strict intake reports two valid Markdown audits; self-test passes `9/9`. Existing supervisor triage in `docs/56/65` remains authoritative and no duplicate total audit was started.
- Post-intake curriculum review tightened the teacher-gated sound-to-staff specification without changing runtime. `docs/57` and `docs/61` now use the same unambiguous D4 wording, bind C4/D4/E4 to one central target two-black-key group, distinguish guided Session A from the reduced-cue three-choice check, expose Session B's full eight-action-plus-anchor load, and share the same 12 numbered teacher questions. Modeled story completion remains eligible only for honest guided `played` wording with `needsPractice`, never child-correct/stable evidence. The curriculum coherence gate now verifies all 12 questions byte-for-byte across both documents; `check:curriculum-story` remains `33/33`, curriculum facts remain `52`, and `check:quick` passes. `C3-X01` remains teacher-review-missing and runtime-forbidden.
- The offline runtime-provenance recovery package in `concepts/provenance-recovery-2026-07-23/` passed supervisor reproducibility review. Two complete executions produced byte-identical `README.md`, `provenance-recovery.json`, `evidence-index.md`, and `verification.json`; their hashes are `88806E5B...3AC6`, `8A14FACE...D9F3`, `56BE38B...A0A8`, and `3F2AAB19...9361`. A before/after hash fence covered all 27 `assets/runtime` files and found zero changed or added files. The report independently confirms `27/27` runtime hashes, `27/27` declared source hashes, `providerCalls=0`, zero runtime references and zero cross-product markers. Its conclusions remain `passed=0 / partial=26 / missing=1 / contradicted=0`: no T1-T5 level, approval bit, rights claim, external-similarity state, or `releaseCleared=false` hold was promoted. M08 background export evidence and the exact M08 Xingya v3 mother source remain missing; the six sealed-suit historical hash conflict remains explicitly recorded.

## 2026-07-22 - 356a Home Single Task And World Result

- Current identity is `overhaul-356a-home-single-task-world-result-r2`. Core bytes: `app.js F328FB0978BB5D5B556ADC14382908517DA64B395C912098B730A40B436CDC42`, `index.html DAAFBF50C35DFE941BC2B8090422120926E665A7283FD945CE047BB0BA1EA1B6`, `service-worker.js 9A8F1D985F1A15A876D2EDAD12718D6A1B39A05B23977A3D1CF339B224EE4B0C`, `course-director.css 858BB506425FBACDC7855C9EEE9C1D115D003FC44E23764D06123DA28FC752CB`, and `child-feedback-intensity.css 615BF9285BC4F824E840EC79ADC27E59EBCD78524084085C7B7162255C1B0126`. The parent-only label is `356a / F328FB09`; child map, lesson, milestone, character, and ARIA remain build-free.
- The home map now has one enabled/current task. Its CTA is an object-plus-action rectangle rather than a circular destination badge; all other lesson controls remain disabled and hidden from the accessible task tree. Header station numbers are visual-hidden while numeric detail remains in ARIA and parent evidence. The story chain is a compact `just completed / now / then` scrim, not a blocking card.
- Formal C1-01 completion alone derives the persistent `part-floor.webp` world object. The floor is anchored inside the red moon-base platform with a contact shadow, is absent on clean state, persists through reload, and never starts C1-02 until the child taps the sole M02 CTA. C1-01 course/session/mastery semantics are unchanged.
- `check:home-single-task` passed `23/23`, including real M01 click completion, reload persistence, M01/M02/M03/S01/C3/C4/active/resume plans, six full/reduced viewport states, one CTA/current target, object thumbnails, M01 two-black-key/C glyph, local noninteractive landmark washes, geometry, and clean browser console. Human original-size review: `screenshots/home_single_task_356a/clean-M01-1024x768-dpr1-full.png`, `after-C1-01-M02-1024x768-dpr1-full.png`, `active-1024x768-dpr1-full.png`, `resume-1024x768-dpr1-full.png`, and `after-C1-01-M02-1194x834-dpr2-reduced.png`.
- Regressions passed: child course director `68/68`, child nonblocking `62/62`, child feedback intensity `42/42`, sessions `74/74`, clean state `124/124`, motion `19/19`, iPad accessibility `43/43`, PWA shell `10/10`, observation build identity `9/9`, Xingya suit `29/29`, and strict bundle `47` files / `1,621,097` runtime asset bytes.
- Runtime-writer handoff initially left supervisor-owned facts pinned to 355A. Supervisor follow-up created `docs/30_OBSERVATION_CANDIDATE_356A.json` (`47` files; SHA-256 `DC196F29FEA70DB1FFB269D22D2B178C92E8415AE3E601A28976453B494DBECA`), updated the coordination/privacy/maturity facts, and independently reran current-state facts. Curriculum facts pass `52`, privacy facts `54`, maturity facts `33` with the expected `13` release blockers; `check:quick`, strict bundle, local/HTTP manifest verification and observation build identity `9/9` pass. Strict maturity and privacy release gates correctly fail with `13` and `5` blockers. `observationAllowed=false / releaseCleared=false` remain unchanged.

## 2026-07-22 - 355a Child Feedback Visual Intensity

- Current identity is `overhaul-355a-child-feedback-visual-intensity-r2`. Core bytes: `app.js 9531C9F9FA9BA263C84576C6D501A7FFC93239490DD5E5D7EE8E416EF60484CA`, `index.html 54A2882C5BDD3DC6B8BCF1E4FF5DF6F76394B0DC949B27DD762A9C9FEC6FACDC`, `service-worker.js 5849D7C4C53914586C98922E9E05C65075EB372687FA014E762FDF0B00CEE752`, `course-director.css 81D03E082A829906612986D1C132357938574869BF192AC9DC1B94CE2F5A6B09`, and `child-feedback-intensity.css 615BF9285BC4F824E840EC79ADC27E59EBCD78524084085C7B7162255C1B0126`. The parent-only observation label is `355a / 9531C9F9`; child map, lesson, milestone, character, and ARIA remain build-free.
- M01 visual feedback is now limited to the played key and placed floor. Its M01-only `key-content::after` suppression includes both temporary local-wrong and persistent `hit-wrong` states, so the red X cannot return after the 620ms local class expires; the key button's 64px soft ring remains. The formal browser gate verifies the immediate wrong state and the assisted, post-expiry `hit-wrong` state. It also keeps the existing compact noninteractive phase settlement, after transient target, route dialog, and current-route label cleanup.
- `check:child-feedback-intensity` passed `42/42` with zero browser errors across M01 wrong/correct/assisted/modeled and full/reduced DPR1/DPR2 phase-tail views. Evidence includes `screenshots/child_feedback_intensity_355a/m01-wrong-1024x768-dpr1.png`, `m01-assisted-1024x768-dpr1.png`, `phase-tail-1024x768-dpr1-full.png`, and `phase-tail-1194x834-dpr2-reduced.png`.
- Regressions passed: child nonblocking `62/62`, child course director `68/68`, Xingya suit `29/29`, sessions `74/74`, clean state `124/124`, motion `19/19`, iPad accessibility `43/43`, PWA shell `10/10`, observation build identity `9/9`, audio contract `22/22`, curriculum/story `33/33`, and strict bundle `47` files / `1,621,097` runtime asset bytes. `git diff --check` has no whitespace errors.
- `check:quick` is partial by scope: it stops at the supervisor-owned 354b curriculum fact pin because live `app.js` is now 355a. The separately-run provenance audit is also blocked by the supervisor-owned coordination-ledger asset-state fact, and privacy current-state is blocked by its frozen 354b core hashes. These fact sources and `docs/30` were not changed; no runtime assertion was weakened. `observationAllowed=false / releaseCleared=false` remain unchanged.

## 2026-07-22 - External UI/UX Sanitized Intake And Supervisor Triage

- The original UI result remains quarantined at `6,942,469` bytes / `245A8E7B1935A5E38498E3C4DCCB492178ADDB0A71CCBBA1836C873A66E656BC`. A new fail-closed sanitizer accepts only that source hash and its exact eight-Markdown/four-PNG entry set, copies only the eight Markdown files, and never promotes the four concept PNGs.
- Two sanitized builds are byte-identical at `34,908` bytes / SHA-256 `199DB652A08E54306C777A02AAC937BE80E1EAF52F8AF7DF39000B1C64B9B9DD`. Strict intake reports `ready_for_supervisor_content_review`, two valid audits, zero missing/invalid results, and zero UI errors/warnings. Intake self-test is now `9/9`, including bounded `(1)/(2)` browser-renamed input Markdown and the existing five rejection classes.
- `docs/65_EXTERNAL_UI_UX_AUDIT_TRIAGE_2026-07-22.md` completes content review. Accepted current P0s are M01/phase visual intensity, homepage visual affordance/world-result continuity, and free-piano atmosphere/equipment/device copy. S01 clutter is teacher-gated P1. The external LP03 hidden-candidate recommendation is rejected because LP03 is the visible C3-D3-E3 foundation route; no-leak belongs to LP04.
- Current evidence was rerun rather than inferred from the mixed-milestone upload screenshots: child course director `68/68`; Xingya equipment `29/29` after correcting one stale 352a test-version assertion to frozen 354b. M01/S01 sealed-suit paths pass, while the current free-piano moon scene still uses garden-mode Xingya and remains a P0.
- The mature-app external-UI requirement is now passed and the strict blocker total drops from 14 to 13. This does not make the app observation-ready: 354b is now historical freeze evidence only, `observationAllowed=false`, and qualifying adult iPad preflight must wait for a new post-UI-P0 candidate.
- Scope is supervisor documentation, intake tooling, and one stale test assertion only. No runtime, course sequence, note target, mastery, media, asset byte, observation manifest, or approval bit changed.

## 2026-07-22 - 354b Supervisor Acceptance, Self-contained Archive And External-result Closure

- The supervisor accepted `overhaul-354b-parent-data-reset` as the current uncommitted browser observation candidate. Exact core bytes remain `app.js 15674BC35D5EF9D1F71BD420B117C2A1A6994B187C6B70AEA9AD80E00109C8D9`, `index.html FF30FB8105C60A400E7D3FC19586A9D24C1C0CFD3117D753EE065E33EE34BBC5`, `service-worker.js BAD487F1E5E6BE3072AE15558A7943EA43BE8839148F5FF75B7C0B44A02B0C6E`, and `parent-experience.css F408C568666A357837E5A030D314495997C1C8CB5C627A6313C88075BB9ACDEC`. `observationAllowed=false / releaseCleared=false` remain unchanged.
- `check:parent-data-reset` passed `13/13` after an independent sentinel extension. Besides the four exact learning keys and tab-local M03 attempt, the test plants unrelated `localStorage` and `sessionStorage` values and proves confirmation preserves them; first tap, cancel, close and pagehide remain zero-write. PWA `10/10`, observation build identity `9/9`, microphone lifecycle `17/17`, input reliability `12/12`, sessions `74/74`, clean state `124/124`, quick checks, and strict bundle also pass.
- The old release policy omitted four stylesheets directly referenced by `index.html`: `roof-blueprint-overrides.css`, `chapter3-visible.css`, `course-director.css`, and `parent-experience.css`. The policy now contains 46 self-contained runtime files, and the strict bundle independently rejects any local `src/href` dependency missing from that set. The historical 354a ZIP pair was deterministic only for its incomplete 42-file policy; the current verifier correctly rejects its manifest with `frozen manifest file set differs from current release policy`.
- `docs/30_OBSERVATION_CANDIDATE_354B.json` freezes the corrected 46-file set and has SHA-256 `018DEAEAEAD24168321B3B6938EF91A924659FDD207777488DE5C8ADD4471FC8`. `star-dino-354b.zip` and `star-dino-354b-round2.zip` are each `2,016,234` bytes with identical SHA-256 `946FF98BF668B3F5B5A6A876F836E8719A3D3A6651BB4DB551AB6264665F2939`; each contains 46 release files plus one embedded manifest and passes independent verification. Tamper rejection remains `5/5`.
- Privacy current-state facts pass with 54 assertions. Parent local-data deletion is now closed at browser-prototype level; five release requirements remain: a real parental challenge, MIDI/device lifecycle, physical-device permission evidence, native privacy declarations, and policy/store/regional review. `check:privacy-release` must therefore fail with exactly five blockers.
- Mature-app current-state facts remain consistent, while the strict release gate must fail with 14 named blockers. The self-contained Web archive closes only deterministic audit packaging; it does not supply physical iPad, teacher, child, final media/provenance, native runtime, TestFlight, store, or release-engineering evidence.
- External ChatGPT course ZIP `4F009D1C7C52342492A12FFF0BCB1456132259817B05BAC123E86F0AA8C9DBAD` passed strict intake and was triaged only at specification level. Its retained new gap is the explicit `sound -> staff position -> same-name key` bridge in `docs/57`; runtime remains forbidden until the preschool piano teacher card is reviewed. UI/UX ZIP `245A8E7B1935A5E38498E3C4DCCB492178ADDB0A71CCBBA1836C873A66E656BC` was rejected and quarantined because it contains four PNG files in addition to the required eight Markdown files. None of its content may drive changes; a Markdown-only repackage is still required.

## 2026-07-21 - 354b Parent Local Data Reset

- `overhaul-354b-parent-data-reset` adds one parent-only, two-step inline reset in the `设备与声音` panel. The first click and cancellation are storage no-ops. Confirmation stops the active microphone, teaching audio and lesson timers, then removes only `starDinoSessionRuntime`, `starDinoCompletedLevels`, `starDinoLearningStats`, `starDinoFreePianoRuntime`, and tab-session `starDinoM03AudioAttempt`. Audio and reduced-motion comfort settings remain. The reload returns to a clean map with the course director's one first task, no session, history, free-piano state, milestone, or autoplay.
- At this runtime-writer handoff, SHA-256 values were `app.js 15674BC35D5EF9D1F71BD420B117C2A1A6994B187C6B70AEA9AD80E00109C8D9`, `index.html FF30FB8105C60A400E7D3FC19586A9D24C1C0CFD3117D753EE065E33EE34BBC5`, `service-worker.js BAD487F1E5E6BE3072AE15558A7943EA43BE8839148F5FF75B7C0B44A02B0C6E`, and `parent-experience.css F408C568666A357837E5A030D314495997C1C8CB5C627A6313C88075BB9ACDEC`. HTML meta, parent build label, cache name, app query, and parent stylesheet query all used `overhaul-354b-parent-data-reset`; `observationAllowed=false / releaseCleared=false` remained unchanged, while the still-current 354a manifest was superseded by the 354b supervisor freeze recorded above.
- `check:parent-data-reset` passed `13/13`, including a visible touch-viewport confirmation, child map/lesson/ARIA isolation, first-click/cancel/close/pagehide no-write behavior, exact deletion with comfort-setting retention, active/history/mastery/M03/free-piano cleanup, corrupt-state and repeated-confirm idempotence, active microphone track/context release, cold-offline availability, and zero browser errors. Screenshots: `screenshots/parent_data_reset_354b/inline-confirmation-834x1194.png`, `confirmed-clean-map-1024x768.png`, and `cold-offline-parent-reset-834x1194.png`.
- Regressions passed: observation build `9/9`, brand `6/6`, PWA `10/10`, microphone lifecycle `17/17`, input reliability `12/12`, child nonblocking `62/62`, child course director `68/68`, sessions `74/74`, clean state `124/124`, curriculum/story `33/33`, runtime asset provenance `869`, audio contract `22`, and prototype/strict production bundle audits (`46` files; `1,621,097` runtime asset bytes). `git diff --check` has no whitespace errors.
- **Historical handoff limitation, subsequently closed by the 2026-07-22 supervisor entry above:** at this runtime-writer checkpoint, `check:quick` still stopped at the supervisor-owned 354a fact pin and the 354b manifest had not yet been created. The supervisor later refreshed those facts, froze 354b, and reran the gates without changing course, mastery, asset, upload, analytics, or external URL behavior.

## 2026-07-21 - 354a Supervisor Freeze, Privacy Facts And Deterministic Bundle

- The supervisor accepted the final `overhaul-354a-microphone-lifecycle` browser bytes after the narrow garden settlement layering fix. Core SHA-256 values are `app.js C6E79EBAA2FAF7129759AA96B472675051A6CBE975C2118FE848BC0AED121560`, `index.html 586E51FDB11FCAE6C349860ACDB4565F85C688DB1FF38A2AEE5BEAB0078BE8E9`, and `service-worker.js 36A14397F7AF6C6935351B3E93C9675741930B1570DA7281002D1E124EBE7DBA`; `course-director.css` is `81D03E082A829906612986D1C132357938574869BF192AC9DC1B94CE2F5A6B09`.
- `docs/30_OBSERVATION_CANDIDATE_354A.json` freezes 42 release-policy files and retains `observationAllowed=false / releaseCleared=false`; manifest SHA-256 is `E4A9818582DD10432BD46653D7911B3756A077B24DE84635F91050144A33812B`. Local and HTTP-served `4173` bytes pass manifest verification. Historical 353a/353b manifests remain unchanged.
- Independent supervisor reruns passed: microphone lifecycle `17/17`, input reliability `12/12`, build identity `9/9`, PWA `10/10`, brand `6/6`, child course director `68/68`, nonblocking/phase settlement `62/62`, R01B lifecycle `31/31`, exact-anchor adversarial `9/9`, audio contract `22/22`, AUDIO-A `66/66`, AUDIO-B `46/46`, AUDIO-C `46/46`, and LP04 audio `11/11`. The runtime writer separately passed Chapter 3 visible `74/74` and strict bundle after the garden layering fix.
- The privacy inventory now matches 354a and passes `51` current-state fact checks: six `localStorage` keys, two `sessionStorage` keys, zero external runtime URLs, and browser hidden/pagehide microphone release passed. Six release blockers remain, including parent delete-all, a real parental challenge, MIDI/device lifecycle, physical-device evidence, native privacy declarations, and policy/store/regional review; strict privacy release must still fail.
- Two ignored deterministic archives, `star-dino-354a.zip` and `star-dino-354a-round2.zip`, are byte-identical at `1,995,049` bytes / `7926999F624B46CECD2359E676857DFFE3F682CA8D154F2F9842974F4F2AE06B`. Both independently verify as 43 entries, and the tamper rejection matrix passes `5/5`.
- Course external intake remains valid and supervisor-triaged. The child UI/UX result remains unavailable as a compliant Markdown-only ZIP; its PNG-bearing submission stays quarantined and cannot drive runtime changes. Mature-app current-state facts pass while the strict release gate remains blocked by all 14 named requirements.

## 2026-07-20 - 354a Microphone Background Release

- `overhaul-354a-microphone-lifecycle` adds an in-memory microphone request token and one idempotent release path. Hidden/pagehide, explicit cancellation, rejected `resume()`, context construction failure, and a late `getUserMedia()` resolution all stop any acquired tracks, close the microphone `AudioContext`, cancel the microphone listen RAF, clear `state.audio`/pending state and restore ordinary touch input. Visibility/pageshow never reopen a microphone without a new parent action.
- The parent-only build identity is `当前观察版本 354a · C6E79EBA`; HTML meta is `overhaul-354a-microphone-lifecycle` and the PWA cache is `star-dino-pwa-overhaul-354a-microphone-lifecycle`. Child map, lesson, milestone, character and ARIA surfaces remain build-free. No asset, course, session/mastery, R01B, product-name or observation-manifest file changed.
- `check:microphone-lifecycle` passed `17/17`, including active hidden/pagehide release, late streams after hidden/pagehide, late/rejected resume, token replacement, two-stop idempotence, pageshow no-autostart, touch recovery and parent disclosure. `check:input-reliability` passed `12/12`; it continues to prove a microphone-assisted route cannot create strict stable evidence. Screenshots are in `screenshots/microphone_lifecycle_354a/` and `screenshots/observation_build_id_354a/`.
- Regressions passed: observation build `9/9`, PWA `10/10`, brand `6/6`, audio settings `13/13`, child course director `68/68`, nonblocking `62/62`, C4-R01B lifecycle `31/31`, runtime asset provenance `869/869`, note matrix, copy, curriculum/story `33/33`, audio contract `22/22`, bundle and strict bundle.
- `check:privacy-state` remains source-waiting by design and was not weakened: its immutable 353b inventory now reports the three changed core hashes plus its old source-shape expectations. `check:curriculum-facts` also remains source-waiting because its 353b manifest pin rejects the changed `app.js`; neither frozen source nor any docs/30 observation manifest was edited in this pass. `observationAllowed=false / releaseCleared=false` remain unchanged.
- The compact Chapter 3 phase settlement now temporarily hides the ordinary garden speech surface while it is visible, avoiding a duplicate status message in the same upper-scene area. The CSS URL is `course-director.css?v=overhaul-354a-milestone-layering`; no app, course, session, mastery, asset or cache identity changed.

## 2026-07-20 - 353b Web Privacy Surface Inventory

- Added `docs/64_WEB_DATA_PERMISSION_AND_NETWORK_INVENTORY.md`, its JSON fact source and `tools/web-privacy-surface-audit.mjs`. The source hashes remain the frozen 353b values; no runtime file, course rule, asset or observation manifest changed.
- The inventory accounts for all six persistent keys, both tab-session keys and the same-origin PWA cache. It distinguishes raw audio/MIDI/device identity (not stored) from derived child learning evidence such as note number, route, result, help flags and timestamps (stored locally).
- Static runtime review found zero external HTTP/HTTPS/WSS URLs, third-party SDKs, analytics, advertising, accounts, cloud sync, WebSocket/beacon/file-upload paths or cross-origin cache handling. Service Worker fetch remains same-origin navigation/runtime caching only.
- Microphone acquisition is audio-only; explicit stop and acquisition-failure cleanup stop tracks and close its `AudioContext`; no recording/upload API is present; experimental microphone evidence cannot create strict stable evidence. MIDI requests `sysex:false`, handles note-on/off and does not persist velocity or device identity.
- Seven release blockers remain. The immediate Web P0s are: hidden/pagehide does not call `stopMicrophone`, and the parent surface has no delete-all local-learning-data control. A release parent challenge, MIDI disconnect/device lifecycle, physical permission/device evidence, native privacy manifest/purpose string, and final policy/store/regional review are also missing.
- `check:privacy-state` is registered in `check:quick` and must pass as a fact-consistency check. `check:privacy-release` is deliberately separate and must fail while blockers remain. Current child microphone observation is forbidden; adult 353b layout/teaching-audio preflight may proceed without enabling the microphone.

## 2026-07-20 - Deterministic 353b Web Observation Bundle

- Added a manifest-locked builder and a separately implemented verifier. The builder accepts only the 42 exact files in `docs/30_OBSERVATION_CANDIDATE_353B.json`, validates live bytes before writing, and fixes path order, timestamp, permissions, compression and archive metadata. It embeds one `_bundle/manifest.json` with the source-manifest hash and both approval flags false.
- Two builds to different ignored `dist/observation` paths are byte-identical: each has 43 entries, `1,994,333` bytes and SHA-256 `D60CE7E3F331149AE04A791F0CBF27FDFBF6DE1603A60762F796F7F159CABB80`. Both pass independent verification against the frozen manifest and live worktree.
- Negative matrix `5/5` passes: one-byte content mutation, forged `releaseCleared=true`, parent-path entry, changed timestamp and missing release file are each rejected. Temporary invalid archives are created outside the project and removed automatically.
- Commands: `build:observation-bundle`, `check:observation-bundle`, and `check:observation-bundle:selftest`. Full boundaries and rollback limits are in `docs/63_FROZEN_WEB_BUNDLE_REPRODUCIBILITY.md`.
- Status: `deterministic_web_audit_bundle_passed / independent_verifier_passed / tamper_matrix_5_5_passed / deployment_rollback_missing / native_signed_release_missing / observationAllowed=false / releaseCleared=false`. No release-policy file or runtime behavior changed.

## 2026-07-20 - Executable Mature-App Readiness Gate

- Added `tools/mature-app-readiness-audit.mjs` and two deliberately different npm commands. `check:maturity-state` verifies that live files, external-intake state and the `docs/29` maturity ledger agree; `check:maturity-release` is the strict completion assertion and is intentionally excluded from ordinary quick checks.
- Current-state mode passes `28/28` fact checks and records exactly 14 blockers: LP05-LP10/TH01-TH08 runtime, C3-X01, clean external UI audit, release visual assets, final audio/media, adult iPad preflight, preschool piano teacher, child observations, physical-device input, parent/privacy release, native iPad runtime, TestFlight/App Store, release engineering, and the A-G first-release scope decision.
- Every future pass requires both concrete local/evidence conditions and a distinct supervisor-acceptance token in `docs/29`. Merely adding a lesson ID, a ZIP, an Xcode directory, a privacy file, an archive or a status sentence cannot independently clear the requirement.
- `npm run check:maturity-state` exits `0`. `npm run check:maturity-release` exits `1` as required and prints all 14 blockers; this expected failure is the correct current result, not a regression. The strict command must reach exit `0` before the active mature-App goal can be marked complete.
- No runtime, course, mastery, asset, media, observation or release file was promoted by this gate. The frozen 353b manifest remains `observationAllowed=false / releaseCleared=false`.

## 2026-07-20 - Curriculum Story Coherence Quick Gate

- The existing coherence audit initially returned `27/29`: its art-readiness assertion still expected LP04-LP10 to be missing, and its committed-baseline parser no longer matched the supervisor document's newer `latest committed approved baseline` wording. These were stale audit facts, not runtime or lesson-order failures.
- Updated the audit to recognize the accepted uncommitted LP04/R01B state while keeping LP05-LP10 missing, and to derive the committed `overhaul-347a-c4-r01a / af9aa28` baseline without confusing it with the uncommitted 353b observation candidate.
- Added explicit gates for C4-R01 as a non-node same-session review with no score page, LP04's E-D-C no-leak story loop, and proposed C3-X01 remaining teacher-gated and absent from runtime. All 39 canonical human lesson sections continue to require opening, child action, correct/completion response, wrong/repair response and learning purpose.
- Added `check:curriculum-story` to `check:quick`, and made the audit verify that this npm wiring remains present. The dedicated gate now passes `33/33`; no curriculum ID, note order, story text, runtime code, mastery rule or observation manifest changed.

## 2026-07-20 - 353b Runtime Asset Provenance Matrix

- Added `docs/62_RUNTIME_ASSET_PROVENANCE_MATRIX.json` plus a human-readable Markdown audit for all 27 PNG/WebP files in the frozen 353b release-policy set. Exact paths, byte counts, SHA-256 values, current uses, runtime reference files, source mappings and honest missing records now total `1,621,097` bytes and match `docs/30_OBSERVATION_CANDIDATE_353B.json`.
- Provenance is separated from release clearance: 6 sealed-suit poses have a reproducible source/prompt/generation/layout pipeline; the garden Xingya has exact candidate bytes but incomplete upstream rights; 18 early assets have only named PNG sources and batch-level summaries; the M08 background lacks its prompt/generation identity; the M08 Xingya final v3 source is missing. `staff-dino-hop-bg-v1.webp` is pre-cache-only and remains a future retirement candidate.
- `npm run check:runtime-asset-provenance` passes `869/869`; it verifies the live files, frozen manifest, named source hashes, evidence paths, runtime references, six expected pipeline outputs, human report synchronization, backlog/coordination state and the global `prototype_runtime / releaseCleared=false` hold. It is now part of `check:quick`.
- The six-pose cutter was rerun independently and reproduced all six current runtime byte counts and SHA-256 values exactly. `check:quick`, `check:bundle:strict`, and local 353b manifest verification pass; the release set remains 42 files and no runtime image was edited.
- Supervisor ruling: `runtime_asset_inventory_passed / traceability_levels_honest / release_clearance_0_of_27 / prototype_runtime_unchanged`. The frozen prototype writer stays idle; future asset work must recover truthful source records or replace the affected images, then complete external similarity and physical-iPad review.

## 2026-07-20 - Preschool Piano Teacher Review Card

- Added `docs/61_PRESCHOOL_PIANO_TEACHER_REVIEW_CARD.md` so a 4-6 piano teacher can review the exact treble/bass positions, low-register-to-left-hand sequence, grand-staff transition, core relay/optional-together boundary and proposed `C3-X01` sound-to-staff-to-key lesson without reading code.
- The card separates `passed / revise / cannot determine`, requests no child test or identity, and routes every critical revision back to curriculum. A teacher pass may freeze the specification only; it does not approve runtime, stable migration, LP05, Chapter 5 or release.

## 2026-07-20 - Adult iPad Audio Preflight Card

- Added `docs/60_ADULT_IPAD_AUDIO_PREFLIGHT_CARD.md` as a parent-readable 5-8 minute physical-iPad Safari preflight for the frozen 353b candidate. It records device/output, exact parent build label, landscape/key fit, C-G tone order, teaching-note masking, wrong-note comparison, comfortable volume and mute. The current LAN HTTP route is explicitly limited to layout and listening; it cannot prove service-worker offline, microphone permission or Web MIDI.
- The card requires exact `当前观察版本 353b · 1598F42A` and a passing 42-file manifest before listening. It requests no child participation, recording, video, face or identity data.
- Any failed or uncertain version/audio item stops child observation. A passing card permits only the first one-child directional observation under `docs/37/58`; it does not approve teaching effectiveness, native MIDI/microphone, release or LP05.

## 2026-07-20 - Chapter 4-5 Curriculum Status Fact Audit

- Cross-checked the current Chapter 4-5 order, note/register targets, story geography, core relay, optional together route, evidence boundaries and low-age workload across `docs/03/09/14/17/24/33/34/35/40`. The canonical course remains coherent and no runtime note order or mastery threshold changed.
- Corrected current-source drift: TH01/TH02 public titles now use letter names; LP04/R01B are no longer described as missing or next work in the active backlog, proof matrix, scheduler record, docs index or external-audit ruling; observation references use 353b while retaining 353a as history.
- Refreshed the existing mature-app ledger instead of creating a competing dashboard: product identity is closed, 353b is the uncommitted observation candidate, adult iPad preflight is the next external gate, Git HEAD `428dd34` is documentation-only while the committed runtime baseline remains `af9aa28`, and LAN HTTP is not device/offline/MIDI proof.
- Added `tools/curriculum-status-fact-audit.mjs` and `check:curriculum-facts` to `check:quick`. After adding maturity-ledger, adult-preflight and teacher-card checks it passes `52/52`; it fails on stale 353a current-manifest references, old public solfege titles, R01B-waiting language, old 352a candidate identity, incorrect staff positions, missing external-evidence holds or a changed frozen app hash.
- Scope is documentation and verification only. `app.js`, release assets, course order, mastery and `docs/30_OBSERVATION_CANDIDATE_353B.json` remain unchanged; LP05 and `C3-X01` stay locked behind their existing external gates.

## 2026-07-20 - 353b Supervisor Acceptance And Observation Manifest

- After the unique runtime writer froze 353b, the supervisor independently reviewed the original-size parent, clean-map, active-lesson, phase-milestone and cold-offline screenshots. The parent label is readable without overlapping controls; child visible text and ARIA contain no build ID.
- Exact frozen core: `app.js 1598F42AC37F017AE240F9E8AF40A0B1E10AAD8B3F2C909E5397F7163BFF616D`, `index.html 289D2D6BE5F8FCC39154FE1C173C284B8C44A662188E616F5802FC0E98C55106`, `service-worker.js 8C26A117702B6F50196867C6D1F88E7E284398537C637191F958363AF6FA1716`. The garden asset remains `30,010` bytes / `AD83E1626A52FE86A49F882953F3089F5142A607B1B5B24F084D70EA775B9EF5`.
- Independent reruns passed observation build `9/9`, brand `6/6`, PWA `10/10`, child course director `68/68`, nonblocking/phase settlement `62/62`, R01B lifecycle `31/31`, quick, strict bundle and `git diff --check`.
- `docs/30_OBSERVATION_CANDIDATE_353B.json` freezes all 42 release-policy files. Its SHA-256 is `AD9B325A26D8047A6ED9A09C79B6C2131BF76D665B356984A10B9676476B2827`; local, `http://127.0.0.1:4173/` and LAN server `http://127.0.0.1:4174/` verification pass. Relative to 353a, only `index.html` and `service-worker.js` changed in the release set.
- `docs/30_OBSERVATION_CANDIDATE_353A.json` remains a historical manifest and is superseded for new observation. `observationAllowed=false / releaseCleared=false` until an adult verifies `当前观察版本 353b · 1598F42A` and completes physical-iPad audio preflight.

## 2026-07-20 - 353b Parent Observation Build Identity

- The stable HTML build identity is `overhaul-353b-observation-build-id`. The parent-only `设备与声音` panel presents one ordinary observation line: `当前观察版本 353b · 1598F42A`.
- The marker is intentionally absent from child map, lesson, milestone, character and ARIA surfaces. It remains available from the cold offline PWA shell under `star-dino-pwa-overhaul-353b-observation-build-id`.
- Scope is cache/observation evidence only: no `app.js`, course/session/mastery/R01B, media, product-name, mode or asset change. The garden runtime asset remains `30,010` bytes / `AD83E1626A52FE86A49F882953F3089F5142A607B1B5B24F084D70EA775B9EF5`.
- `check:observation-build-id` passed `9/9` with a clean child map, active lesson, real phase-tail milestone and return, parent devices, and cold offline parent devices. The browser summary reports zero errors/timeouts and exit `0`; screenshots are in `screenshots/observation_build_id_353b/`.
- Regressions passed: brand `6/6`, PWA shell `10/10`, child course director `68/68`, nonblocking feedback `62/62`, C4-R01B lifecycle `31/31`, `check:quick`, and `check:bundle:strict`. The frozen `app.js` remains `1598F42AC37F017AE240F9E8AF40A0B1E10AAD8B3F2C909E5397F7163BFF616D`.

## 2026-07-20 - 353a Child Brand Fact Source

- Child-facing product identity is now one fact: `星龙工坊` in the document title, Apple title, manifest name/short name, boot screen, map and active-lesson lockups. `星龙音阶工坊` is absent from runtime child surfaces.
- The PWA cache identity is `star-dino-pwa-overhaul-353a-brand-fact-source`; the application script identity remains `app.js?v=overhaul-352a-p0d-milestone` because this pass does not modify `app.js`.
- `check:brand-fact-source` covers clean map, active lesson, real phase-terminal milestone/return, metadata and cold offline shell. The scope excludes curriculum/session/mastery/audio/media changes and does not alter garden or sealed-suit assets.
- Supervisor reran brand `6/6`, PWA `10/10`, course director `68/68`, phase settlement/nonblocking `62/62`, quick and strict bundle. The phase screenshot now waits for the 180ms arrival delay and visibly captures the compact no-control settlement above an unobscured keyboard.
- Frozen core: `app.js 1598F42AC37F017AE240F9E8AF40A0B1E10AAD8B3F2C909E5397F7163BFF616D`, `index.html 706E0964F16906B7B37874C6C328760D71A2C0F6CD8FD5D29AE3CCF6FB43F28D`, `service-worker.js CA709A494BEA9498948BB1451E8E3732B6A2A99AD2B366DD08D25F20842E318A`.
- `docs/30_OBSERVATION_CANDIDATE_353A.json` records all 42 release-policy files and passes local plus served-byte verification. Manifest SHA-256: `C0A17BE6233DF9D8869764BCEB3E03543F8A4B237977C3770E28852CC20491F1`; `observationAllowed=false / releaseCleared=false` until adult physical-iPad audio preflight.

## 2026-07-20 - C4-R01B Supervisor Acceptance And Exact-Anchor Closure

- Frozen uncommitted runtime core: `app.js` SHA-256 `1598F42AC37F017AE240F9E8AF40A0B1E10AAD8B3F2C909E5397F7163BFF616D`. The retained-due completion path now accepts only the unique qualified stable event matching the action's stored `reviewAnchorSessionId + reviewAnchorCreatedAt`; missing, mismatched or ambiguous identity fails closed without fallback.
- The supervisor adversarial probe was extended to three real browser scenarios: missing selected anchor, matching session with mismatched time, and two exact duplicate anchors. It passed `9/9`, with zero browser errors and no replacement stable/retained evidence. Probe SHA-256: `0E3C33D9A35089834AC950B3C1FB1ECBDFCCDDC2C16ECE1230088904E508A806`.
- Independent reruns passed R01B lifecycle `31/31`, R01A `35/35`, foundation `20/20`, LP04 main/audio/input `27/27 + 11/11 + 8/8`, sessions `74/74`, LP01/LP02 `137/137`, nonblocking/phase settlement `62/62`, child course director `68/68`, child note names `286/286`, clean-state `124/124`, PWA `10/10`, quick and strict bundle.
- Runtime scans found zero forbidden-product markers, zero `C3-X01` or LP05+ runtime identities, and zero direct `concepts/**`, `audio/**`, technical-preview or runtime-candidate references. The served `4173` HTML and app hashes matched the local Star Dino worktree.
- Original-size R01B evidence was reviewed: successful review continues into LP04 without a centered result box; difficult review returns to one current homepage task; character dialogue, teaching area and keyboard do not overlap.
- Status: `C4_R01B_browser_lifecycle_accepted_uncommitted / exact_anchor_P1_closed / 353a_observation_manifest_frozen / LP05_not_auto_unlocked / release_not_approved`. Full decision: `docs/59_C4_R01B_SUPERVISOR_ACCEPTANCE_2026-07-20.md`.

## 2026-07-20 - External ChatGPT Results Intake And Course Triage

- Preserved the two download originals and copied them to the expected intake names with byte-identical hashes. Course result: `35,034` bytes / `4F009D1C7C52342492A12FFF0BCB1456132259817B05BAC123E86F0AA8C9DBAD`. UI result: `6,942,469` bytes / `245A8E7B1935A5E38498E3C4DCCB492178ADDB0A71CCBBA1836C873A66E656BC`.
- Strict intake accepted the course result as `structurally_valid_pending_supervisor_content_review`: 7/7 requested UTF-8 Markdown files, `69,045` uncompressed bytes, zero errors/warnings, complete manifest and Star Dino identity.
- Strict intake rejected the UI result: it contained 12 files rather than 8 and added four nested PNG concept drafts. The invalid copy and full JSON report were moved to `chatgpt_web_task_packs_2026-07-20/quarantine/2026-07-20_ui_result_245A8E7B/`; no UI report content was read, cited or implemented.
- The post-quarantine waiting-state gate passes as `partial_results_received` with one valid course result and one missing replacement UI result. Original upload packs remain exact and no foreign-product evidence was accepted.
- The valid course result was extracted only after exact per-entry SHA verification into `chatgpt_web_task_packs_2026-07-20/review-only/course_story_phase_4F009D1C/` and fully reviewed. Six of seven supplied source documents still match the worktree; only `docs/03_CONTENT_ROADMAP.md` changed after upload.
- At intake time, supervisor reruns passed child note names `286/286`, LP04 main `27/27`, LP04 audio `11/11`, LP04 input `8/8`, and real-C4-03 R01B foundation `20/20`. This rejected the stale external claim that LP04 was missing. The later R01B lifecycle acceptance is recorded in the newer entry above; LP05 remains explicitly locked rather than becoming an automatic consequence.
- Content decision is recorded in `docs/56_EXTERNAL_CHATGPT_AUDIT_TRIAGE_2026-07-20.md`. The main surviving new curriculum gap is direct sound-to-staff transfer; the documentation-only `large C / smaller Do` conflict must also be corrected. External FG02 locator wording and the LS05-to-LS08 skip are rejected. No runtime, curriculum order, mastery threshold, UI or asset was changed by intake.
- The independently confirmed documentation corrections are now closed without runtime changes: `docs/00` fixes the core MVP at ages 4-6 and uses the Star Dino Workshop identity; `docs/02` removes the ordinary-surface `large C / smaller Do` rule; `docs/03` maps child navigation names to story titles; `docs/03`, `14` and `24` now distinguish the committed LP01-LP03 baseline from the uncommitted LP04/R01B candidate accurately.
- Added `docs/57_SOUND_TO_STAFF_CROSS_REPRESENTATION_LESSON_SPEC.md` as `curriculum_specification_ready / teacher_review_missing / runtime_forbidden`. It proposes a known-C/D/E interlude after LS05 and before LS06, with separate staff-first/key-first evidence, a guided session, a later reduced-cue check, honest played/stable/retained rules and no phase settlement. `docs/23` records the missing proof row; no canonical runtime order or course ID changed.
- At this intake checkpoint, the previously idle unique runtime writer received a separate C4-R01B-only dispatch. Its status then was `sent / acknowledgement_pending`; the later completion and supervisor acceptance are recorded in the newer entry above.
- Status: `course_result_triaged / ui_result_invalid_quarantined / corrected_ui_zip_waiting / no_automatic_approval`.

## 2026-07-20 - External ChatGPT Audit Result Intake Gate

- Added `tools/verify-external-chatgpt-audit-results.ps1` and `docs/55_EXTERNAL_CHATGPT_AUDIT_RESULT_INTAKE_PROTOCOL.md`. The verifier reads ZIP Markdown in memory through .NET `ZipArchive`; it does not extract untrusted entries into the repository or approve runtime/curriculum changes.
- Self-test passed `8/8`: valid course/UI result shapes and one shared wrapper directory are accepted only as `structurally_valid_pending_supervisor_content_review`; missing required files, `../` path traversal, binary/input-file injection, strong foreign-product markers, and duplicate entries are rejected.
- Real waiting-state check exits successfully with `overallStatus=waiting_external_results`, `validCount=0`, `missingCount=2`, `invalidCount=0`, and `automaticRuntimeOrCurriculumApproval=false`.
- Original upload packs remain exact: course `7,054,750` bytes / `AB8D5E79F55291106448F4AB61A03550A24FF5C4F869D55007641AD98C1BF423`; UI `7,040,373` bytes / `CB95449F243041835B22515060ED18CD105CC2040A52FA86CE2CFD7A462C716D`. Returned Markdown will receive per-entry SHA-256 records before content review.
- Status: `intake_gate_passed / external_result_zips_missing / local_duplicate_audit_forbidden / no_runtime_or_curriculum_approval`.

## 2026-07-20 - 352b Garden Xingya v3 Controlled Runtime Integration

Identity and controlled replacement:

- The stable runtime URL remains `assets/runtime/xingya-garden-invite-v1.webp`; it now contains the user-selected v3 WebP from `concepts/runtime-candidates/ch03-garden-xingya-v3/xingya-garden-invite-v3.webp` without adding a runtime `concepts/**` reference.
- Runtime bytes are `30,010`; SHA-256 is `AD83E1626A52FE86A49F882953F3089F5142A607B1B5B24F084D70EA775B9EF5`; the decoded asset is `512x512` RGBA with four transparent corners. The approved source PNG is `196,851` bytes, SHA-256 `6B8AF92EC623AA9FCDF20CE239F32958AB82FE26992EE9FCE6D6A0ED2580F28D`.
- Rejected history remains explicit: the old runtime v1 bytes were `31,996` / `F2B305052BE42B47DD67795498E04733D7522C3312152B1308D7BB9D053FA5AB`; the v2 candidate drifted to `32,628` / `4F318F0DE4785B4087880C8C33CE65D01DB4531CCA230771AD51628E8ECD7B5E`. Neither is an approval source.
- Service Worker identity is `star-dino-pwa-overhaul-352b-garden-v3`. The app runtime remains `app.js?v=overhaul-352a-p0d-milestone`; this integration does not alter `app.js`, HTML/CSS UI, curriculum, session/mastery, audio, sealed-suit assets, or Chapter 5 scope.

Evidence:

- Runtime hash/byte verification passed. `check:xingya-suit` passed `29/29`, including the exact v3 SHA, 512px transparent decode, six sealed-suit hashes, and sealed/scanning versus safe-open/Chapter 4 equipment separation.
- `check:pwa-shell` passed `10/10`; its cold offline fetch verifies both `30,010` bytes and the complete v3 SHA from the Service Worker cache.
- `check:chapter3-visible` passed `74/74`; `check:chapter4-lp01-lp02` passed `137/137`; `check:child-course-director` passed `68/68`; parent history/free piano passed `20/20`; supervisor phase-settlement/nonblocking feedback passed `62/62`; `check:quick` and `check:bundle:strict` passed.
- Original-size browser captures: `screenshots/chapter3_visible_340a/LS01_initial_1024x768.png`, `screenshots/chapter3_visible_340a/LS02_resume_1194x834_dpr2.png`, and `screenshots/chapter3_visible_340a/air_check_scanning_1024x768.png`. They show clear eyes/highlights without exterior black or white artifacts, unobstructed teaching/keyboard regions, sealed suit while scanning, and garden equipment only after safe-open.

Status and limits:

- `passed`: controlled runtime replacement, exact offline-cache verification, role/equipment isolation, Chapter 3 and Chapter 4 character routes, child-course continuity, and parent free-piano isolation.
- `partial`: prototype runtime source is approved only from the user-selected v3 candidate; `release_provenance_partial` and `external_similarity_clearance_missing` remain.
- `missing`: physical iPad Safari, real MIDI/acoustic microphone, teacher and child observation, human audio review, final source/similarity clearance, native shell, TestFlight, and store evidence.
- `contradicted`: none in the integrated runtime. `releaseCleared=false` remains mandatory; this is neither a release promotion nor a commit.

## 2026-07-20 - P0-D Phase Milestone Settlement Closure

Identity and scope:

- Runtime cache identity: `overhaul-352a-p0d-milestone`. `index.html` and the Service Worker now use the same `app.js?v=overhaul-352a-p0d-milestone` shell entry; no other resource version was changed.
- `app.js` SHA-256 before this cache-only closure: `75F9D2E98D3FA69FC556B675145589E280E37593EB85DE311BB270291148E0EB`.
- Settlement eligibility is limited to formal, complete phase-tail bundles. Single actions, intermediate bundles, direct/debug, voluntary replay, zero/partial sessions, and incomplete-rest reasons do not settle. Legitimate Chapter 3 business completion reasons remain eligible when the formal curriculum evidence completes their phase.

Evidence:

- `check:child-nonblocking-feedback` passed `62/62`, `exitCode=0`, with `55` PNG captures and final scenario `support-1366x1024-dpr2-reduced`. It verifies assisted/modeled early rest has no settlement, non-terminal bundles return directly, C1 and C3 phase tails settle once, no reload/repeated-map replay occurs, and full/reduced six-viewport feedback remains nonblocking.
- `check:child-course-director` passed `68/68`; session/retention `74/74`; clean-state `124/124`; iPad accessibility `43/43`; motion `19/19`; `check:quick` and `check:bundle:strict` passed.
- Independent follow-up regressions passed: parent history/free piano `20/20`, Chapter 3 LS08 `131/131`, Chapter 4 LP01-LP02 `137/137`, LP03 `54/54`, and LP03 supervisor `32/32`. Five stale LP03 assertions were aligned with the canonical course-director header and sole current CTA; runtime behavior was not changed for those test corrections.
- At this P0-D checkpoint, PWA shell was explicitly `blocked_by_unrelated_asset_integrity`: `9/10` passed. The offline request for `assets/runtime/xingya-garden-invite-v1.webp` returned `31,996` bytes, SHA-256 `F2B305052BE42B47DD67795498E04733D7522C3312152B1308D7BB9D053FA5AB`; docs/16 then approved `33,794` bytes, SHA-256 prefix `122808`. The asset was an existing unrelated modification and was neither changed nor reverted; the PWA gate was not weakened. The newer 352b entry above closes this historical blocker with the independently approved v3 bytes.

Status and limits:

- `passed`: phase-tail-only settlement eligibility, compact no-control presentation, C1/C3 custom completion continuity, reload idempotence, child-route continuity, and affected browser regressions listed above.
- `partial` at this checkpoint: PWA shell behavior was otherwise exercised but could not be reported green while the approved garden-character asset integrity contract disagreed with the worktree.
- `missing` at this checkpoint: approved garden-character restoration or an independently approved asset-contract update. That item is closed by 352b above; physical iPad Safari, real MIDI/acoustic microphone, teacher and child observation, final source/similarity clearance, native shell, TestFlight, and store evidence remain missing.
- No curriculum note/order/threshold, mastery/stable/retained rule, audio transaction, media integration, LP05+, or forbidden-project source changed. This is not a release promotion or commit.

## 2026-07-19 - P0-D Small-Goal Milestone Settlement Pass (superseded by the 2026-07-20 phase-tail-only rule above)

Identity and user-visible correction:

- Runtime shell identity: `overhaul-350c-milestone-settlement`; `app.js` SHA-256 `46D6E7FF69666C9B9AE46B8004AB965DF145816D0E97C732F2544E72287D624A`; `course-director.css` SHA-256 `BDEBFB0E322C993354C30DBEE0E4F63C46C7641A64BD8F337DC1772B6293913F`.
- The user clarified that settlement is not forbidden globally: it belongs after a stage-sized small goal. Single-key correct/wrong feedback and same-bundle action transitions remain in-scene only; one automatic settlement is now reserved for a formal natural rest with at least one completed action.
- The settlement is a compact upper banner, not the retired centered/full result composition. It shows the completed world result and the next story stop, contains zero close/continue/next controls, leaves the keyboard unobscured, and does not make the app or map inert.
- In this superseded build, the banner remained for about `2.3s` and then returned to the canonical course homepage. The homepage updated `刚完成 / 现在 / 随后` without starting the next session. At that point phase-ending bundles said `这一阶段完成！` and other safe rests said `小目标完成！`; the current 2026-07-20 rule above removed settlement from all non-phase-tail safe rests.
- Voluntary replay, direct/debug preview, zero-action pause, each wrong input, each ordinary correct input, and internal automatic continuation cannot trigger the settlement. While it is visible, gameplay input is ignored so a late MIDI/touch input cannot leak into a completed session.

Timing and continuity correction:

- A first session regression froze wall-clock `Date`. Using `Date.now()` for the ephemeral minimum-display gate caused the map return to defer forever even though the real timer fired. The final implementation uses `performance.now()` only for this visual duration; persisted evidence continues to use ISO wall-clock time and mastery/retention semantics are unchanged.
- Existing completion callers may request map return at 800-1450ms. `showMapScreen()` now defers those requests until the milestone minimum is satisfied, hides the banner once, then performs the existing map cleanup/render path. No second session or autoplay is created.

Evidence:

- `check:child-nonblocking-feedback` passed `56/56`: per-key wrong/correct, same-session continuation, assisted/modeled rest, a two-action bundle, zero visible result controls, automatic homepage return, no autoplay, and six viewport/DPR combinations under full and reduced motion.
- Key original-size captures: `screenshots/child_nonblocking_feedback_p0a/formal-bundle-milestone-1024x768-dpr1.png` and `screenshots/child_nonblocking_feedback_p0a/assisted-milestone-1024x768-dpr1.png`.
- Course director `68/68`; session/retention `74/74`, including frozen-wall-clock natural rest; clean-state `124/124`; iPad accessibility `43/43`; motion `19/19`; PWA shell `10/10`; quick and strict bundle passed with `42` runtime files and `1,641,265` runtime-asset bytes.

Status and limits:

- `passed`: browser small-goal settlement trigger boundary, compact/no-control presentation, keyboard clearance, monotonic auto-return, canonical next-stop continuity, no autoplay, and PWA cache identity.
- `partial`: the banner uses the shared success badge and current browser scene; final per-chapter celebration art and physical iPad timing remain unverified.
- `missing`: physical iPad Safari, real MIDI/acoustic-piano microphone, teacher and 3-5-child observation, final source/similarity clearance, native shell, TestFlight, and App Store evidence.
- No lesson notes, course order, audio transaction, stable/retained threshold, media candidate, character equipment rule, or Chapter 5 scope changed.

## 2026-07-19 - P0-C Homepage Course Facts and Safe Update Pass

Identity and observed failure:

- Runtime shell identity: `overhaul-348a-course-director-p0c`; uncommitted `app.js` SHA-256 `92E152B4DC0D9D78A2914D996AC87331D0A7D80D4639C55BD40F4BB1CCCC6EF8`; `course-director.css` SHA-256 `6F33A8E51D39AA8BB5F54BCA8D8B0A653A72870964EB04AA67D948F88D73E06F`.
- The user-visible page was reproduced before editing. An already-open tab still showed the legacy twelve-button map. After a manual reload, the 348a director appeared, but the top bar still said `基地 12/12 · 小恐龙待跳` while the canonical director said `C1-01 / 铺第一块月亮地板`; the circular destination still displayed the old node title `找到 C`. These were three competing course facts, so the user's report remained valid even though the core director existed.

Runtime correction:

- The child home is now titled `学习旅程`. The top bar, chapter strip, central story, teaching focus, next-story copy, and sole destination are all derived from the same `childJourneyPlan()` result. Every chapter uses canonical `第 n/总数 站 · 准备/进行中/继续/下一站/完成`; the old `基地 x/12` completion set can no longer contradict a formal resume.
- The central panel labels the teaching purpose as `本领：...` and the story connection as `接下来：...`. The sole circular destination uses the same `primaryStoryLabel` as the central plan, including garden and Chapter 4 entrances. Completing clean `C1-01` returns to `第 2/10 站 · 下一站`, and both surfaces say `叫醒三颗小灯`; it does not create or autoplay `C1-02`.
- The Service Worker cache is `star-dino-pwa-overhaul-348a-course-director-p0c`. Registration explicitly checks for updates. A controller change reloads only when the child is safely on the map with no active session; an active lesson is never reloaded, and its pending shell update waits for a later map rest.
- LP04 test fixtures now include the complete canonical C1/C2 prerequisite history instead of skipping directly from `C2-03`. The session gate's debug helper now reads `staffStepIndex` for S01 rather than using the workshop `stepIndex`; no runtime lesson or mastery behavior changed for either test correction.

Evidence:

- `check:child-course-director` passed `58/58`, including a new `legacy-formal-conflict` state with all twelve legacy levels marked complete and a partial formal `C1-01`. It exposes one destination, `第 1/10 站 · 继续`, and no `基地 12/12` header. Original-size captures are in `screenshots/child_course_director_348b/`.
- P0 nonblocking feedback `54/54`; sessions/retention `74/74`; clean-state `124/124`; iPad accessibility `43/43`; workshop identity `36/36`; child note-name policy `286/286`; palette `17/17`; motion `19/19`; contrast `9/9`; PWA `10/10`, including safe-map refresh and active-lesson deferral.
- Shared LP04 fixtures passed main `27/27`, input `8/8`, and audio lifecycle `11/11`. `check:quick` and strict bundle passed with `42` runtime files and `1,641,265` runtime-asset bytes. Browser consoles were clean in every reported gate.

Status and limits:

- `passed`: P0-C browser homepage fact-source consistency, one next destination after a bundle, legacy/formal conflict presentation, and safe shell-update behavior.
- `partial`: child homepage art remains a single shared island background rather than chapter-specific final world direction; parent history replay and free piano remain missing under `docs/53`.
- `missing`: physical iPad Safari, real MIDI/acoustic-piano microphone, manual speaker/headphone review, teacher and 3-5-child observation, final source/similarity clearance, native shell, TestFlight, and App Store evidence.
- This pass does not unlock C4-R01B, LP05, media integration, or release promotion.

## 2026-07-19 - P0 Child Course Director and Nonblocking Feedback Browser Pass

Identity and scope:

- Runtime identity: `overhaul-348a-course-director`; current uncommitted `app.js` SHA-256 `FFF382EEBE726F0345B4391CD251F326E5D73B76D51607117A7DEE3D528686E0`; `course-director.css` SHA-256 `E15CDF81E16CA161DF5C7D37A01394449ABD57133FB19648762776357027329D`.
- Scope is the global child-flow P0 only: remove blocking result/repair surfaces from production child paths, derive one homepage task from formal course state, make partial bundles resume at the first unfinished action, and show current learning plus the next story connection. No lesson note, threshold, stable/retained rule, Chapter 5 content, or media candidate was integrated.

Course-director evidence:

- `check:child-course-director` passed `44/44`: clean, active, partial resume, C1-to-C2 transition, garden resume, C4 ready, current-content complete, and legacy migration. Every actionable state has exactly one visible/enabled/current journey marker; complete has zero enabled markers and one current completion surface.
- A programmatic double activation creates or resumes exactly one session. Partial `C1-04` resumes only `M05-down` as `lesson-resume` with the prior `sessionId`; completed `M04-up` is not replayed. Clean `C1-01` completes both M01 actions and returns to a map whose sole destination is `C1-02 / M02`.
- Eight original-size scenario captures plus the post-C1-01 capture are in `screenshots/child_course_director_348a/`. The set covers 1024x768, 1194x834, 1366x1024, DPR 1/2, and reduced motion, with zero panel/marker/header overlap and zero horizontal overflow.

Affected shared regression (all exit 0):

- P0 nonblocking feedback `54/54`; sessions/retention `74/74`; clean-state `124/124`; iPad accessibility `43/43`; workshop identity `36/36`; child note-name policy `286/286`; AUDIO-A `66/66`.
- Palette `17/17`; motion `19/19`; contrast `9/9`; PWA shell `8/8`; `check:quick` and strict bundle pass. Strict bundle contains `42` runtime files and `1,641,265` runtime-asset bytes.
- Service worker identity is `star-dino-pwa-overhaul-348a-course-director` and precaches `course-director.css?v=overhaul-348a-course-director` plus the matching app runtime.

Status and limits:

- `passed`: P0-A browser nonblocking surfaces and P0-B child-home core navigation/continuity.
- `partial`: homepage art remains prototype-level; parent history replay/free-key mode is not yet implemented.
- `missing`: physical iPad Safari, real MIDI/acoustic-piano microphone, manual audio review, teacher and 3-5-child observation, final source/similarity clearance, native shell, TestFlight, and store evidence.
- This is not a release promotion and does not resume R01B/LP05 automatically. Grok video remains quota-exhausted and hard-paused.

## 2026-07-19 - C4-R01A Scheduler Core Accepted Browser Baseline

Identity and scope:

- Runtime identity: `overhaul-347a-c4-r01a`; frozen `app.js` SHA-256 `5E2041D554E20DA7E98A5C0544B1834051B4DD8AA7D684388F8A43B0CCB0D4DE`.
- This milestone accepts only the C4-R01A opening-review scheduler core, its isolated real-screen fixtures, and evidence contracts. It does not create a formal `C4-03`, implement LP04, complete C4-R01B, or integrate media.
- Canonical skills remain isolated as `level:LP01 -> LP01` and `low-key:C3 -> LP02`. Unknown, missing, or mismatched persisted identities are discarded instead of being remapped. Resume plans stay story-first; one post-review formal child story is required before another opening review.

Focused independent gates:

- Scheduler `35/35`; fixed supervisor evidence `19/19`; P1 adversarial `29/29`; dedicated R01A audio lifecycle `12/12`; artifact authenticity `20/20`; triple-contract authenticity `19/19`.
- The P1 gate covers malformed retained anchors, missing stable-event fields, invalid dates, system-only routes, child-story spacing, same-day/cross-day boundaries, corrupt attempt timestamps, unknown skills, missing level identity, and both skill/level mismatch directions.
- The audio gate proves real shared-piano started/ended transactions, reduced-cue no-model behavior, interruption recovery, reload isolation, and byte-identical non-empty formal storage.

Three-round browser contract:

- Each round is `captureScope=full`, six landscape browser viewports x seven real scheduler states = `42/42` PNG, with zero failures and zero browser errors. Every capture records decoded assets, frozen capture motion, and unchanged non-empty formal storage; all six LP01 playing states record `audioTransactionStarted=true`.
- All three core hashes and all 42 state-keyed PNG hashes are byte-identical across rounds. Core SHA-256: `32b8f7b84a9d25e5a3fa7d43c1c0b6ff5f343552f509dcb92d68c74aaa492401`.
- Round JSON SHA-256: round 1 `4FFD61F79D6A0160BD40146DA2260D3073283501BFE92C393CFC6E0173AA9BA4`; round 2 `E8DE24B7AD430DC236BE7F4C4C9B095512EA6A283A31CAEA215A85AEEA3140F4`; round 3 `FFE359BC60DD3F7F088C0EF32BC7962BE9B5ED6BB82B4408D450343E45243F7D`.
- The canonical contract `docs/30_CHAPTER4_R01A_MEDIA_ZONE_CONTRACT_347A_V1.json` is byte-identical to accepted round 3 and points to `screenshots/chapter4_r01a_media_zones_347a_v1_full_round3/`. Runner SHA-256: `DB52C69CA81E5D6ABABCCC5669A0219C2C4F31E7ACF9DDE6B23DAF99EDE49C3D`; dedicated audio gate SHA-256: `58ED27B0EF32DECDB3E8E01097DAB19F513C660F201B150C4EA2CA7900FC2C53`.

Shared regression on the frozen source:

- Curriculum/story coherence `29/29`; child note-name policy `276/276`; sessions/retention `74/74`; clean-state `124/124`; M03/garden `32/32`; Chapter 3 visible `74/74`; LS04 `39/39`; LS05 `66/66`; LS06/LS07 `64/64`; LS08 `131/131`.
- Full controlled audio components passed: AUDIO-A `66/66`, AUDIO-B `46/46`, AUDIO-C `46/46`, LS08 `131/131`, C4 LP01-LP02 `137/137`, C4 R01A `12/12`, C4 LP03 `54/54`, and LP03 supervisor `32/32`.
- Input reliability `12/12`; audio settings `13/13`; PWA shell `8/8`; iPad accessibility `43/43`; staff mini `20/20`; staff repair `27/27`; staff readability `13/13`; motion `19/19`; palette `17/17`; contrast `9/9`.
- Xingya equipment `29/29`; workshop identity `36/36`; assembly hierarchy `39/39`; M01 hierarchy `17/17`; M08 roof route `97/97`. `check:quick` and `check:bundle:strict` pass with 42 runtime files and 1,641,265 runtime-asset bytes.

Status and remaining evidence:

- `passed`: browser scheduler semantics, isolated real-screen remediation/reduced-cue fixtures, storage isolation, teaching audio lifecycle, exact three-round visual evidence, curriculum coherence, note-name policy, and shared browser regression.
- `partial`: C4-R01A is a composable core; C4-R01B still must connect it to real LP04 actions in a later, separate milestone. Capture animation is deliberately frozen for deterministic geometry evidence and does not replace motion testing.
- `missing`: physical iPad Safari, real MIDI hardware, acoustic-piano microphone, human speaker/headphone review, teacher review, 3-5 child observations, long-term retained learning evidence, final art/source clearance, native iPad/TestFlight/App Store evidence, LP04-LP10, and Chapter 5 runtime.
- Grok video remains `external_quota_exhausted / hard_paused`: no precheck, retry, polling, alternate account, new batch, or runtime media integration is allowed until the user explicitly confirms restored quota.

## 2026-07-19 - LP03 346a Contract Triple and Shared Regression Evidence

Baseline, identity, and scope:

- Baseline: approved AUDIO-C runtime `overhaul-345d-audio-c`; LP03 candidate identity: `overhaul-346a-lp03`. This is browser/prototype evidence only and is not a promotion or release baseline.
- Frozen runtime digest throughout the contract triple and shared gates: `app.js` SHA-256 `98BBD58DF14B9CB97EC45EC46F2BD8133B2660341534C8EADC346739F1F9DCF5`.
- The shell loads `app.js?v=overhaul-346a-lp03`; Service Worker cache `star-dino-pwa-overhaul-346a-lp03` precaches that URL and the matching Chapter 4 CSS URL. PWA shell passed on the frozen digest.
- Scope remained C4-02 / LP03 evidence and its affected regression gates. This LP03 work made no C4-R01, LP04, low-staff/left-hand teaching, media integration, course order/threshold, mastery, or supervisor-document change. Candidate files remain unstaged and uncommitted.

LP03 crash-recovery P1 and browser-harness evidence:

- Persisted `lp03-step-complete` and `lp03-complete` states reconcile idempotently: clean C/D advance only once, assisted C rests only once, clean E becomes gesture-gated seam-ready, deferred E finishes only once, and an active final completion closes one session without duplicating route events, completed actions, history, learning completion, stable, or retained evidence.
- The permanent LP03 harness closes every tracked context/browser in `finally`, has a 90-second scenario watchdog and 12-minute suite cap, prints the last scenario on failure, and supports the single persisted-C recovery fixture. The direct fixture passed `4/4`; the complete LP03 suite passed `54/54` without a residual Playwright process.

Fixed-directory LP03 coordinate contract triple:

- Contract: `chapter4-lp03-media-zones-overhaul-346a-v1`, `docs/30_CHAPTER4_LP03_MEDIA_ZONE_CONTRACT_346A_V1.json`, and `screenshots/chapter4_lp03_media_zones_346a_v1/`. Each independent run cleared and regenerated the fixed directory from the same frozen inputs.
- All three runs passed `6` viewports x `19` states = `114` PNG, with `0` geometry failures and `0` browser errors. Required internal SHA-256 was identical in every run: `139635b5560dd316415b52b191871350273a0bdad0c8286d18dd8cd7848ea273`.
- Round 1 raw hashes: JSON `FE1DFD7A55E2122503FA054031B4D6593B312FB161A6B4D6F5CE5D940610825D`; PNG manifest `1002b3a9bd5d96786c9620ca66bb323c4e17877641b2be648354b481db7268d0`.
- Round 2 raw hashes: JSON `58B7E8735380363E3C97165B36EBEB3854AFA71C28BC223831E2821570E941C3`; PNG manifest `cfc569876c616b37e6b152aca74b4ff3d09e20378e2c0414ca7ab184e021ab74`.
- Round 3 final raw hashes: JSON `AE8430B0ED39D55B201BD1D0A5B474879DBD30A4BE4FB6CC651856A2F18188B3`; PNG manifest `5d77ab02f67849b89d485e6fc39d5d1c295ed55a13410e848ac41f44e54d0dc8`. The internal runner hash is the fixed-run equivalence field; raw artifact hashes are recorded for traceability.

Shared gates on the same frozen digest (all exit 0):

- Full audio lifecycle: AUDIO-A `66/66`, AUDIO-B `46/46`, AUDIO-C `46/46`, LS08 `131/131`, C4 LP01-LP02 `137/137`, LP03 `54/54`, and LP03 supervisor `32/32`.
- Session and device gates: sessions `74/74`, clean-state `124/124`, PWA `8/8`, iPad accessibility `43/43`, audio settings `13/13`, input reliability `12/12`, child note names `276/276`.
- Course gates: M03/Garden `32/32`, Chapter 3 visible `74/74`, LS04 `39/39`, LS05 `66/66`, LS06/LS07 `64/64`, and continuity supervisor `14/14`.
- Version-sensitive Chapter 1/2 gates: M01 hierarchy `17/17`, roof route `97/97`, assembly blueprint `39/39`, staff readability `13/13`, staff repair `27/27`, Xingya suit `29/29`, workshop identity `36/36`.
- `check:quick` passed syntax, note matrix, copy integrity, the `22`-check audio audit, and bundle audit. `check:bundle:strict` passed with `42` runtime files and `1,641,265` runtime-asset bytes.

Static, isolation, and remaining evidence:

- `node --check` passed every changed JS/MJS file; `git diff --check` and `git diff --cached --check` passed. The only Git notice was the non-failing CRLF normalization warning for `index.html`.
- Runtime entry files have zero matches for `concepts/`, `audio/`, Grok/Gemini/Sora, technical-preview, and prohibited-project identifiers. `package.json` has one non-runtime developer command that names `concepts/`; supervisor `docs/29` retains seven historical isolation references. Those non-runtime references are not represented as a whole-repository literal-zero claim.
- Original-size final-round review artifacts include `ipad-1024x768-dpr1_initial-model-ready.png` SHA-256 `CB8520DF1282A938764AF1CAEE27C8A09E0E6DDB6FC5FC2488EEA275EDF8D7DA`, `ipad-1024x768-dpr1_assisted.png` SHA-256 `C21A5849A6D302361392BAB87BD087705ED8D768FD4F824A6F6C23A409AF58AB`, and `ipad-1024x768-dpr1_complete-map.png` SHA-256 `ABE828D6345DDCBD1E9A2F8561A4FE460A0FD2EBABB1AE1F1FEC2DE698D5A457` in the fixed screenshot directory.
- Status: available browser/runtime evidence is `passed`; no contradiction was found and no test process remains. Physical iPad Safari, real MIDI hardware, acoustic-piano microphone input, manual speaker/headphone listening review, teacher review, 3-5 child observation, source/provenance review, external similarity review, and release clearance remain `missing`.

## 2026-07-18 - AUDIO-C LS06-LS07 Browser Gate Evidence

Baseline and identity:

- Baseline: frozen AUDIO-B candidate `overhaul-345c-audio-b`; AUDIO-C candidate identity: `overhaul-345d-audio-c`.
- Final runtime digest: `app.js` SHA-256 `DAA50F00F4CCFD8A408631AE934BB39D8B6FB02EB064A99063475C751CD692C6`.
- The shell loads `app.js?v=overhaul-345d-audio-c`; Service Worker cache `star-dino-pwa-overhaul-345d-audio-c` precaches the same URL. PWA shell evidence passed with that identity.

Scope and lifecycle evidence:

- AUDIO-C covers only Chapter 3 LS06 and LS07. Guide, hidden target, whole-pair child replay, controlled screen/MIDI child echo, wrong pair repair, modeled pair, microphone external input, reload/recovery, map queueing, and held MIDI reuse `playTeachingPianoSequence`; no lesson-local AudioContext or wall-clock completion path was introduced.
- Verified start/end gates response scoring and world action. Mute, zero volume, rejected resume, suspend/closed, watchdog, map, refresh, visibility, pagehide, and blur produce interrupted/sound-paused evidence rather than fabricated score, flower/vine action, or next-lesson advance. Microphone remains accepted-onset-to-quiet external evidence with no local speaker echo.
- AUDIO-C P1 closes the final-guide transition race. After the second guide child echo truly ends, `guide-target-pending` binds the automatic `system-first` target to that ended child transaction's playback token. Whole-pair replay is unavailable until a real response phase; the replay control is native-disabled and `aria-disabled` during child echo and the transition. The permanent probe proves repeated click, Enter, and Space create zero whole-pair starts, zero child replay count, one started/ended system-first target, zero orphan interruption, and zero scored calls.
- AUDIO-C P1 also closes the non-final guide map-resume gap. If the child asks for the map during the first guide echo, the attempt persists `guide-next-pending` plus `pendingGuidePresentation`; re-entry in the explicit map gesture plays the second guide through the verified teaching sequence before `guideInputArmed=true`. A real page reload is not treated as a sound gesture: it keeps the guide phase unarmed, suppresses formal `1/4` progress, exposes one accessible replay control, and uses Xingya dialogue to request that explicit continuation. LS06 C->G and LS07 E->F each have permanent lifecycle, DOM, ARIA, session, denominator and mastery-isolation assertions.
- LS06 remains C/G with four 2/2 calls and its existing 3/4 stable threshold. LS07 remains E/F with its existing guide/hidden boundary, four 2/2 calls, and existing stable/retained semantics. Neither lesson auto-starts LS07 or LS08; no course sequence, seed, threshold, mastery, DOM/CSS/layout, media, or runtime asset changed.

Final browser gates (all exit 0 on the final digest):

- `check:supervisor-audio-c` `13/13`; `check:audio-c` `46/46`; `check:chapter3-ls06-ls07` `64/64`. Full `check:audio-lifecycle` passed AUDIO-A `66/66`, AUDIO-B `46/46`, AUDIO-C `46/46`, LS08 `131/131`, and C4 LP01-LP02 `137/137`.
- `check:chapter3-ls04` `39/39`; `check:chapter3-ls05` `66/66`; `check:sessions` `74/74`; `check:clean-state` `124/124`; `check:m03-garden` `32/32`; `check:chapter3-visible` `74/74`.
- `check:child-note-names` `224/224`; `check:audio-settings` `13/13`; `check:input-reliability` `12/12`; `check:pwa-shell` `8/8`; `check:ipad-a11y` `43/43`.

Unchanged-shell evidence inherited from the immediately preceding 345d digest:

- On digest `310A2B78C0140231425F727FE7F71F6016A113172DB18052EBC599E18F40D529`, workshop identity `36/36`, assembly blueprint `39/39`, M01 hierarchy `17/17`, roof route `97/97`, staff readability `13/13`, staff repair `27/27`, Xingya suit `29/29`, staff mini `20/20`, motion `19/19`, palette `17/17`, and contrast `9/9` passed. The final P1 diff changes only AUDIO-C paired-listening state/copy and its lifecycle regression; it changes no HTML structure, CSS, asset, viewport, course note, seed or threshold. These results are retained as unchanged-shell regression evidence, not represented as newly rerun final-digest tests.

Layout and static evidence:

- LS06/LS07 historical 342a JSON and fixed screenshot directories were not re-signed or overwritten. AUDIO-C and its P1 changed no DOM/CSS geometry contract; the existing runner was only made lifecycle-aware by waiting for real guide/response rearm instead of wall-clock-timed input. Final-digest iPad accessibility passed `43/43`, child note-name/layout passed `224/224`, and all browser consoles remained clean. The 342a contracts remain layout-regression baselines rather than new 345d device evidence; physical iPad Safari is still missing.
- `check:quick` passed syntax, note matrix, copy integrity, the 22-check audio contract audit, and the bundle audit. `check:bundle:strict` passed with 42 runtime files and 1,641,265 runtime-asset bytes.
- `node --check` passed every changed JS/MJS file; `git diff --check` and `git diff --cached --check` passed. The only Git output is the non-failing CRLF normalization warning for `index.html`.
- Runtime entry files have zero matches for `concepts/`, `audio/`, Grok/Gemini/Sora, technical preview, and prohibited-project identifiers. Historical docs and developer tools are excluded from that runtime-only statement.

Status: final-digest browser/runtime evidence is `passed`, and the supervisor approves an isolated AUDIO-C promotion. Runtime media integration remains disallowed. Physical iPad Safari, real MIDI hardware, acoustic-piano microphone input, manual speaker/headphone listening review, teacher review, 3-5 child observation, source/provenance review, external similarity review, and release clearance remain `missing`.

## 2026-07-18 - AUDIO-B LS04-LS05 Browser Gate Evidence

Baseline and identity:

- Baseline: frozen AUDIO-A candidate `overhaul-345b-audio-a`; AUDIO-B candidate identity: `overhaul-345c-audio-b`.
- Final runtime digest: `app.js` SHA-256 `E59D9F99C3C1A1406A180D3E88A899EEBD5846A0BCB43E3919973E77D9C3E74D`.
- The shell loads `app.js?v=overhaul-345c-audio-b`; Service Worker cache `star-dino-pwa-overhaul-345c-audio-b` precaches that same URL. PWA shell evidence passed with the new identity.

Scope and lifecycle evidence:

- AUDIO-B covers only Chapter 3 LS04 and LS05. It reuses `playTeachingPianoSequence`; no new lesson-local AudioContext or wall-clock completion path was introduced.
- Reference, hidden target, controlled touch/MIDI child echo, wrong repair, modeled completion, microphone external input, recovery, map queueing, and held-MIDI release all wait for verified start/end or enter `sound-paused`/`interrupted` without fabricated score, story action, or next-lesson advance.
- Touch and local MIDI suppress the raw keyboard note while the controlled child echo owns that input, so one physical input produces one child voice. Wrong repair retains the one child voice followed by the target without overlap; microphone keeps accepted-onset-to-quiet external evidence with no local echo.
- LS04 preserves its four C4/D4 calls and 3/4 stable threshold. LS05 preserves its seeded 2/2/1 C4/D4/E4 sequence, all-candidate coverage, one-child-replay rule, 4/5 stable threshold, and played/stable/retained semantics.
- Map/reload recovery keeps the same call and logical source; held MIDI cannot rearm until every accepted note receives note-off. Late callbacks and queued map returns are idempotent, and neither LS05 nor LS06 auto-starts from an interrupted transaction.
- No AUDIO-C, LP03+, course sequence/threshold, mastery, DOM/CSS/layout, media/runtime asset, or coordinate-contract change was introduced. Layout is unchanged, so the existing 344a coordinate contracts remain regression baselines and were not re-signed or renamed as AUDIO-B evidence.

Final browser gates (all exit 0 on the final digest):

- `check:audio-b` `46/46`; `check:chapter3-ls04` `39/39`; `check:chapter3-ls05` `66/66`; `check:audio-a` `66/66`.
- `check:chapter3-ls08` `131/131`; `check:chapter4-lp01-lp02` `137/137`; `check:sessions` `74/74`; `check:clean-state` `124/124`; `check:m03-garden` `32/32`; `check:chapter3-visible` `74/74`.
- `check:child-note-names` `224/224`; `check:audio-settings` `13/13`; `check:input-reliability` `12/12`; `check:pwa-shell` `8/8`.
- Version-sensitive shell gates: `check:workshop-identity` `36/36`; `check:assembly-blueprint` `39/39`; `check:m01-hierarchy` `17/17`; `check:roof-route` `97/97`; `check:staff-readability` `13/13`; `check:staff-repair` `27/27`; `check:xingya-suit` `29/29`.
- After the pre-existing port 4173 listener returned `ERR_EMPTY_RESPONSE`, subsequent browser scripts ran from a clean isolated local static server; no source, test timing, or assertion was changed to accommodate that transport fault.

Static and isolation evidence:

- `check:quick` passed syntax, note matrix, copy integrity, the 22-check audio contract audit, and bundle audit. `check:bundle:strict` passed with 42 runtime files and 1,641,265 runtime-asset bytes.
- `node --check` passed `app.js`, `service-worker.js`, and every changed AUDIO-B test script. `git diff --check` and `git diff --cached --check` passed; the former only emitted Git's non-failing CRLF normalization warning for `index.html`.
- Runtime files (`app.js`, shell, Service Worker, manifest, and loaded runtime CSS) have zero matches for `concepts/`, `audio/`, Grok/Gemini/Sora, technical preview, or prohibited-project identifiers. Historical docs and developer tooling are not represented as a whole-repository literal-zero claim.

Status: browser/runtime evidence is `passed`; no browser-test contradiction was found. Candidate files remain unstaged and uncommitted pending supervisor review. Physical iPad Safari, real MIDI hardware, acoustic-piano microphone input, manual speaker/headphone listening review, teacher review, 3-5 child observation, source/provenance review, external similarity review, and release clearance remain `missing`.

## 2026-07-17 - AUDIO-A 345b Browser Gate Evidence

Baseline and identity:

- Baseline: frozen 344a teaching-audio candidate (`overhaul-344a-p3`); AUDIO-A candidate identity: `overhaul-345b-audio-a`.
- Final runtime digest: `app.js` SHA-256 `6D6E771DDF7EBE6468A2D58064869CF87A9BBFB73074B1C389C745BD42B9F40E`.
- The shell loads `app.js?v=overhaul-345b-audio-a`; Service Worker cache `star-dino-pwa-overhaul-345b-audio-a` precaches that same URL. PWA shell evidence passed with the new identity.

Scope and lifecycle evidence:

- AUDIO-A covers only M03 and Chapter 3 LS01-LS03. It reuses the frozen verified teaching-piano sequence contract: actual running/start before presentation, final oscillator end before scoring/world action, and interrupted rather than fabricated completion for mute, rejected resume, suspend, watchdog, navigation, reload, visibility, pagehide, and blur.
- Held-MIDI P1 is covered by session-local held notes: same or other held note-ons are observation-only, repair/model completion cannot rearm while held, per-note release arms exactly once, and map/reload recovery cannot persist an unobservable stale hold.
- M03 formal-session P1: a formal `C1-03` action restores only its own owner-stamped snapshot (`sessionId`, `bundleId`, `sessionActionId`). A direct-preview session-storage snapshot cannot seed a new formal action; refresh and map re-entry preserve only matching formal evidence.
- M03 terminal-return P1: a map request during the final touch or MIDI child echo remains queued until actual ended, consumes once before the attempt is discarded, returns to the map, and clears the M04 auto-advance timer. Completion evidence remains single-write.
- Final hardening preserves the M03 idle identity-to-locator sequence across audible idle replays and restores M03 wrong/target visual key feedback only after the verified repair target has started. Neither path adds a second child note, score, world action, or teaching sound.
- No AUDIO-B/C, LP03, C4-R01, UI/art/media work, course-order change, threshold change, or mastery-semantic change was introduced.

Final browser gates (all exit 0 on the final digest):

- `check:audio-a` `66/66`; `check:sessions` `74/74`; `check:m03-garden` `32/32`; `check:chapter3-visible` `74/74`; `check:clean-state` `124/124`.
- `check:chapter3-ls08` `131/131`; `check:chapter4-lp01-lp02` `137/137`; `check:child-note-names` `224/224`.
- `check:audio-settings` `13/13`; `check:input-reliability` `12/12`; `check:pwa-shell` `8/8`.
- `check:assembly-blueprint` `39/39`; `check:m01-hierarchy` `17/17`; `check:roof-route` `97/97`; `check:staff-readability` `13/13`; `check:staff-repair` `27/27`; `check:xingya-suit` `29/29`; `check:workshop-identity` `36/36`.
- `check:quick` passed syntax, note-matrix, copy, the 22-check audio contract audit, and bundle audit. `check:bundle:strict` passed with 42 runtime files and 1,641,265 runtime-asset bytes.
- `node --check` passed every modified JS file. `git diff --check` and `git diff --cached --check` passed; the former only emitted Git's non-failing CRLF normalization warning for `index.html`.

Runtime and contract boundaries:

- Runtime files (`app.js`, shell, Service Worker, manifest, and loaded runtime CSS) have zero matches for `concepts/`, `audio/`, Grok/Gemini/Sora, technical preview, and prohibited-project identifiers. Historical docs, developer tools, and older test material may contain non-runtime isolation or planning references; this is not represented as a whole-repository literal-zero claim.
- Coordinate contracts were not re-signed: AUDIO-A changed no DOM/CSS/layout contract. The existing 344a coordinate contracts remain layout-regression baselines and are not renamed or represented as 345b contracts.

Status: browser/runtime evidence is `passed`; candidate remains uncommitted and awaits supervisor review. Runtime media integration remains disallowed. Physical iPad Safari, real MIDI hardware, acoustic-piano microphone input, teacher review, 3-5 child observation, source/provenance review, external similarity review, and release clearance remain `missing`. No contradiction was found in the available browser evidence.

## 2026-07-17 - Overhaul 344a Final Browser Gate Evidence

Scope: final browser evidence for the frozen C4-01 / LP01-LP02 and LS08 teaching-audio candidate. No LP03, C4-R01, LP04, media runtime integration, or global UI work was added during this evidence pass.

Runtime identity and focused gates:

- Final runtime digest: `app.js` SHA-256 `58D4D2721FF0EC28BCCA9D0EE86449407E2C8D77A1CC6FD1CE2AD2B61BD21CD3`.
- `check:chapter3-ls08` passed `131/131`; `check:chapter4-lp01-lp02` passed `137/137`; `check:child-note-names` passed `224/224`.
- `check:quick` passed, including the 22-check audio contract audit; `check:bundle:strict` passed with 42 files and 1,641,265 runtime-asset bytes.
- Child text, keyboard labels and ordinary ARIA remain letter-only; character dialogue is the only allowed solfege surface. A runtime scan for `concepts/**`, `audio/**`, Grok/Gemini/Sora, Batch 8/9 and technical-preview references returned zero matches.

Final 344a coordinate contracts:

- Chapter 4: `chapter4-lp01-lp02-media-zones-overhaul-344a-v1`, 6 viewports x 19 states, zero failures and zero browser errors. Three fixed-directory runs were identical: internal SHA-256 `620d9340c182a9efff2a96cc7d1f447ccc5c9bf1494d833abd793cbb6b0a21bc`; JSON SHA-256 `C59C2DBE8953995D5FFD57C5C4BC8DA0B9A345786389B2312FA5429F7D8F43A6`; `docs/30_CHAPTER4_LP01_LP02_MEDIA_ZONE_CONTRACT_344A_V1.json`.
- LS08: `chapter3-ls08-media-zones-overhaul-344a-v3`, 6 viewports x 14 states, zero failures and zero browser errors. Three fixed-directory runs were identical: internal SHA-256 `7dab39c6068cf1b8d36cb64f37657ef9584f86e1d2fe8e4d134939ad2816aff1`; JSON SHA-256 `629CF9B7E059DE12254FF4EAA819ECA5723FE74E232E614BC436883B2149938E`; `docs/30_CHAPTER3_LS08_MEDIA_ZONE_CONTRACT_344A_V3.json`.
- Teaching zones: `teaching-zones-overhaul-344a-v1`, 6 viewports with M03/S01 geometry, zero failures and zero browser errors; internal SHA-256 `7f3b3d6d7fbb52d12a29a44f6baa84ea52136f9e02e1f6310e9a5310877f5c28`; JSON SHA-256 `C8E2479565F6832B042F8B2F443B43C264CD795C91AB4FE4A8ADCEA3F81DAF8D`; `docs/30_TEACHING_ZONE_COORDINATE_CONTRACT_344A_V1.json`.
- Chapter 3 zones: `chapter3-media-zones-overhaul-344a-v1`, 6 viewports x 9 states, zero failures and zero browser errors; internal SHA-256 `52f6a654def39b0e33fe17020788c2a3a6e9ab18432679d709e424b6e97150e3`; JSON SHA-256 `E6867AAC09FD4F510D440338CEDF0D888FF1DC3D81602515B78DF9CA9BF011AD`; `docs/30_CHAPTER3_MEDIA_ZONE_CONTRACT_344A_V1.json`.
- Every final 344a contract records `prototypeBaseline=overhaul-344a`, `buildIdentity=overhaul-344a-p3`, `runtimeIntegrationAllowed=false`, and the final `app.js` digest. Historical 340d and 343a contracts remain historical and are not cited as 344a evidence.

Original-size review and shared regressions:

- Reviewed current 1024 CSS-pixel C4 evidence: `screenshots/chapter4_lp01_lp02_media_zones_344a_v1/ipad-1024x768-dpr1_lp01-model.png` shows exactly two symmetric bubbles and one start command; `ipad-1024x768-dpr1_lp02-input-playing.png` shows only the neutral pending C state, with no stale wrong-D highlight.
- Current-candidate shared gates: sessions `72/72`, clean-state `124/124`, M03/garden `32/32`, Chapter 3 visible `74/74`, LS04 `39/39`, LS05 `65/65`, LS06/LS07 `64/64`, input reliability `12/12`, audio settings `13/13`, PWA shell `8/8`, iPad accessibility `43/43`, motion `19/19`, palette `17/17`, contrast `9/9`, Xingya suit `29/29`, workshop identity `36/36`, M01 hierarchy `17/17`, assembly blueprint `39/39`, roof route `97/97`, staff mini `20/20`, staff repair `27/27`, and staff readability `13/13`.

Status: browser candidate evidence is `passed`; runtime media integration remains disallowed. Physical iPad Safari, real MIDI hardware, acoustic-piano microphone input, teacher review, 3-5 child observation, source/provenance review, and external similarity/release clearance remain `missing`.

## 2026-07-14 - Overhaul 343a P2 LS08 Same-Key Pointer Release Follow-up

Scope: LS08 pointer lifecycle and evidence identity only, against frozen runtime commit `66a31b4`. No lesson order, sequence, scoring, mastery, audio transaction, other level, curriculum source or runtime media integration changed.

Runtime correction:

- LS08 screen-pointer ownership is stored by stable MIDI plus `pointerToken -> midi`, rather than by replaceable keyboard DOM nodes. The first accepted onset may redraw the keyboard without losing held-pointer identity or pressed feedback.
- Only the first active pointer on one physical key starts the press animation, ripple, piano sound and `child-key(pointer)` trace. Overlapping pointers on that same key still reach the formal input contract as `not-rearmed` observations but produce no second sound or onset.
- Pointer-generated clicks consume their own bounded suppression tokens. Direct click, Enter/Space and assistive activation remain independent one-sound, one-onset, one-release paths.
- Key-local release and document-capture `pointerup` / `pointercancel` share the same idempotent token removal. Releasing over the scene after DOM replacement works; one overlapping pointer cannot rearm the route while another remains held. Window blur remains the full cleanup fallback.
- Pending click suppression expires after a bounded window. A canceled or externally released pointer cannot leave a permanent MIDI activation entry.

Focused and affected gates:

- Final `check:chapter3-ls08` equivalent run on the isolated local static server passed `118/118`. New cases cover same-key overlap across DOM replacement, a third overlap before final release, document-level pointerup, document-level pointercancel, exactly one pointer sound/onset/final rearm, bounded click suppression and the next independent activation.
- Input reliability passed `12/12`; PWA shell passed `7/7`; iPad accessibility passed `43/43`; `check:quick` and `check:bundle:strict` passed. Strict bundle remains 41 files and 1,641,265 runtime-asset bytes.
- Two preliminary runs against the pre-existing port 4173 service ended in non-assertion `page.goto` timeouts while direct HTTP remained 200. Final evidence used a clean static server on port 4174 with unchanged runtime and navigation timeouts; no sleep, retry masking or playback duration change was introduced.

V2 evidence identity:

- Current runtime identity is `overhaul-343a-p2`; PWA cache is `star-dino-pwa-overhaul-343a-v2`. The package LS08 zone gate points to `chapter3-ls08-media-zone-contract-343a-v2.mjs`, V2 JSON and the V2 screenshot directory.
- Contract ID `chapter3-ls08-media-zones-overhaul-343a-v2`, 6 viewports x 14 actual-phase-bound states, `runtimeIntegrationAllowed=false`, zero failures and zero browser errors.
- Three consecutive fixed-directory runs produced internal SHA-256 `92ab00d2dec178dd33db2a937eceac1aa0408d4ddbff03be09d5555c0ca0219f`. Final V2 JSON SHA-256: `687E0F7913871BF560F93378D15BB6143F6454090AB47DFBEB1EE12D197CD115`.
- Historical V1 script and JSON remain unchanged. V1 JSON SHA-256 is still `AC5A6D99128EC0A5E8B74EF0D51F0F7470850B9F4808F3445AADE6D10F1EE97B`.
- V2 screenshots are in `screenshots/chapter3_ls08_media_zones_343a_v2/`. Of 84 files, 80 are byte-identical to V1; manual original-size comparison of the 4 dynamic-byte differences found no target cue, layout, copy, control, keyboard or state regression.

Status: browser runtime, focused pointer evidence, affected shared gates and V2 coordinate evidence are `passed`. Physical multi-touch iPad Safari, real MIDI hardware, acoustic microphone, teacher review, 3-5 child sessions and release clearance remain `missing`. No curriculum, equipment, media or sound-contract contradiction was found.

## 2026-07-13 - Overhaul 343a C3-07 / LS08 Two-Sound Root Memory

Scope: LS08 only, against supervisor work order commit `5d5fd7b`. LS01-LS07 behavior and thresholds, Chapter 4, approved-media integration, curriculum fact sources and the global CSS architecture remain unchanged.

Runtime and evidence semantics:

- LS07 completion only exposes the LS08 map marker. A child map click creates the independent `C3-07` session and unlocks sound; render, refresh and debug URLs do not create sessions or evidence.
- Every fresh or resumed session performs visible, unscored C then D guide steps. Guide evidence is stored outside the four-pair denominator. Two difficult guide sessions schedule a remediation-only C/D guide; that session records zero scored pairs and cannot enter hidden check.
- The persisted four-pair sequence contains C-D, E-D, C-C and D-E exactly once. Stable requires at least 3/4 qualifying first-complete responses in one complete session, a clean guide in that session, at most one whole-pair child replay, and no strong, modeled, visual-assist, experimental microphone, reveal or crossed-session evidence.
- C-C requires two discrete onsets and release/rearm for screen, MIDI and microphone routes. Refresh preserves a first input but clears active route state; continuous microphone quiet records only the first real false-to-true rearm transition.
- The first complete two-note response, its input route and response time are immutable. Later cross-route repair remains in `inputEvents`, cannot backfill qualifying correctness, and `timingUsedForMastery` is always false.
- Wrong repair schedules the complete child response before the complete target pair with a neutral gap. System replay is counted only after that transaction ends. Map requests wait for audio end; refresh enters the matching `sound-paused` transaction and requires an explicit recovery gesture without recounting wrong/input evidence.
- Candidate-outside pairs such as MIDI 61 or wrong octave 72 use strong C/D/E boundary repair instead of a one-answer pair card. Valid lower-to-target and higher-to-target confusions use the same neutral sorted card style, so the target appears in both first and second positions across scenarios.
- Guide notes, guide soft repair, target pairs, wrong repair, direct modeled pairs and the final low echo all use started-to-ended lifecycles. Map requests queue while audio is active; refresh interrupts to the correct sound-paused context. Modeled evidence/progress and Chapter 3 completion are written only after the relevant sound window ends.
- Pointer down/up plus the browser click submits one onset. Per-key suppression handles near-simultaneous pointers without a global-key collision. Direct click, Enter/Space and assistive activation each play one child key sound, show press/release feedback and write one onset plus one rearm; two independent activations can complete C-C.
- Four story pairs complete neutral root knots, then one unscored C4-to-C3 story event plays. The event stores `startedAt`, `endedAt`, playback attempts and `timingUsedForMastery=false`; only an ended event completes LS08 and Chapter 3. No C3 key, low-note teaching, LP01 session or Chapter 4 auto-start is created.
- Ordinary child-visible text and child-facing ARIA remain letter-only. Dinosaur dialogue may sing Do/Re/Mi; parent evidence may keep adult mappings and octave IDs. M07 remains C-D-E-D-C and M08 remains C-D-E-F-G after a forced Service Worker refresh.

Focused and shared gates:

- `check:chapter3-ls08`: three consecutive `115/115` runs. `check:chapter3-ls06-ls07`: `64/64`; LS05 `65/65`; LS04 isolated final rerun `39/39`; Chapter 3 visible `74/74`; child note names `183/183`.
- Sessions `72/72`; clean-state `124/124`; M03/garden `32/32`; assembly `39/39`; workshop identity `36/36`; M01 hierarchy `17/17`; roof route `97/97`; staff repair/readability/mini `27/27`, `13/13`, `20/20`; continuity `14/14`.
- PWA `7/7`; input reliability `12/12`; audio settings `13/13`; iPad accessibility `43/43`; motion `19/19`; palette `17/17`; contrast `9/9`; Xingya suit `23/23`.
- Generic teaching zones passed six temporary-output viewports with zero failures/errors and internal SHA-256 `cc784618404b82b1d923e1b53c41c17dfb1706494043410b815165be277c383a`. Legacy Chapter 3 zones passed six temporary-output viewports with zero failures/errors and internal SHA-256 `579ddd5ea2bb8a19cfded9cba4442a9c3970108138600144dcb51919bbc3bb24`. Historical contract JSON files were not overwritten.
- `check:quick` and `check:bundle:strict` passed. Strict bundle remains 41 files and 1,641,265 runtime-asset bytes; runtime references to `concepts/**`, `audio/**` and technical previews remain zero.
- One shared-batch LS04 fixed five-second phase sample timed out, and a second isolated run reached a later fixed wait before timing out. The final isolated rerun passed `39/39` without runtime or lesson timing changes; this is recorded as evidence-harness load sensitivity, not hidden as a runtime pass.

Coordinate and screenshot evidence:

- Contract ID `chapter3-ls08-media-zones-overhaul-343a-v1`, baseline `overhaul-343a`, build identity `overhaul-343a-p1`, `runtimeIntegrationAllowed=false`.
- Six landscape browser viewports cover 14 actual-phase-bound states: `map-entry`, `guide-first`, `guide-second`, `pair-playing`, `awaiting-first`, `awaiting-second`, `wrong-first`, `wrong-second`, `assisted`, `sound-paused`, `visual-assist`, `complete-roots`, `unscored-low-echo`, `reduced-motion`.
- Three consecutive fixed-directory runs produced internal SHA-256 `f155250e2f81a94701634c4442aada851ea4bb8662d9b8010a83fc5cded25ea8`, zero failures, zero browser errors and zero hidden target carriers. Final JSON file SHA-256: `AC5A6D99128EC0A5E8B74EF0D51F0F7470850B9F4808F3445AADE6D10F1EE97B`.
- Original-size focused evidence is in `screenshots/chapter3_ls08_343a/`; six-viewport state evidence is in `screenshots/chapter3_ls08_media_zones_343a_v1/`. Manual review covered guide, waiting, awaiting-second, wrong, neutral pair, assisted, visual-assist, sound-paused, complete roots, low echo and map rest at 1024x768, 1194x834 DPR2 and 1366x1024.
- Manual review found no target cue in hidden states, no text/control overlap, clear neutral completed knots, a distinct persistent visual-assist state, and no low C key teaching. `screenshots/child_note_names_340d/ipad-1024x768_M07_forced_refresh.png` visibly shows C-D-E-D-C; Do appears only in the dinosaur bubble.

Status: browser runtime, focused evidence, coordinate contract and shared regression are `passed`. Runtime media integration is intentionally disallowed. Physical iPad Safari, real MIDI hardware, acoustic microphone, teacher review, 3-5 child sessions and external similarity/release clearance remain `missing`. No curriculum, equipment, media or sound-contract contradiction was found.

## 2026-07-13 - Overhaul 342a C3-05 / LS06 and C3-06 / LS07 Listening Slices

Scope: LS06 and LS07 only, against supervisor fact source commit `99b8c8e`. LS08, the Chapter 3 exit, approved-media integration, LS01-LS05 behavior, Chapter 1/2 semantics and the global CSS architecture remain unchanged.

Runtime and teaching evidence:

- LS06 and LS07 each require a fresh explicit map click and create independent `C3-05` / `C3-06` sessions. LS06 returns to the map before LS07 becomes available; neither level auto-starts the next lesson.
- Each session begins with a real two-step unscored guide loop. LS06 guides C then G; LS07 guides E then F with the two-black-key/three-black-key boundary locators. Guide input is stored separately from the four hidden calls and never enters the stable denominator.
- A guide second error or bounded wait ends at `guide-rest`; modeled or bounded hidden repair ends at the current level's neutral safe rest. Resume creates a new session, repeats the complete guide, preserves old call/session evidence and remaining calls, and cannot combine fragments into stable.
- Hidden rounds persist four calls with an exact `2/2` candidate distribution. `target-playing` input is observation-only; touch and MIDI use the same formal scoring path; confirmed microphone input can complete played evidence but cannot grant stable or retained.
- First wrong replays the child's actual MIDI frequency before the target. Valid candidate pairs are neutral and sorted independently of answer role; black keys and wrong octaves use candidate-outside strong repair. The fourth wrong has one modeled target demonstration and a non-interactive safe-rest transition.
- Stable requires at least 3/4 first-response correct in one complete session, a complete guide in that session, and no strong, modeled, visual-assist, experimental microphone, early reveal or crossed-session evidence. LS07 stores opening boundary guide evidence separately from post-prompt boundary strong help.
- Hidden `target-playing`, `awaiting-response`, `wrong-known` and `pair-compare` keyboard states have no target class/data/ARIA/style/pixel carrier. Only the current visible guide, bounded assisted pulse, visual assist and short correct feedback may expose one target.
- Complete and rest keyboards are neutral. LS06 map rest says only `回声藤拱门已经搭好，边界花在等你。`; LS07 alone may say `两株边界花已经安顿好`. `lastRest` now persists bundle, reward and reason, and guide/modeled rests never claim completion.
- Ordinary child text and child-facing ARIA use letter names only. Dinosaur dialogue may sing solfege; parent-only evidence may retain adult mappings. Forced Service Worker refresh preserves M07 `C-D-E-D-C`, M08 `C-D-E-F-G`, and letter-only keyboard ARIA.

Focused and shared gates:

- `check:chapter3-ls06-ls07`: `64/64`; LS05 `65/65`; LS04 isolated rerun `39/39`; Chapter 3 visible `74/74`; child note names `183/183` including forced-refresh evidence.
- Sessions `72/72`; clean-state `124/124`; M03/garden `32/32`; assembly `39/39`; workshop identity `36/36`; M01 hierarchy `17/17`; roof route `97/97`; staff readability `13/13`; staff repair `27/27`; staff mini `20/20`; continuity `14/14`.
- PWA `7/7`; input `12/12`; audio settings `13/13`; iPad accessibility `43/43`; motion `19/19`; palette `17/17`; contrast `9/9`; Xingya suit `23/23`.
- Generic and Chapter 3 legacy coordinate regressions each passed six browser viewports with zero failures/errors; their historical JSON files were restored and not included in this candidate.
- `check:quick` and `check:bundle:strict` passed. Strict bundle remains 41 files and 1,641,265 runtime-asset bytes; runtime references to `concepts/**`, `audio/**`, technical previews and parallel LS05 media candidates remain zero.
- One loaded shared-batch continuity navigation and one LS04 fixed five-second phase wait timed out; both immediate isolated reruns passed `14/14` and `39/39` without runtime or timing changes.

Coordinate and screenshot evidence:

- LS06 contract ID `chapter3-ls06-media-zones-overhaul-342a-v1`; LS07 contract ID `chapter3-ls07-media-zones-overhaul-342a-v1`. Each uses six landscape browser viewports and 13 actual-phase-bound states: `map-entry`, `visible-guide`, `visible-guide-soft-replay`, `guide-rest`, `target-playing`, `awaiting-response`, `sound-paused`, `visual-assist`, `wrong-known`, `pair-compare`, `assisted-retry`, `complete`, `reduced-motion`.
- Three consecutive fixed-directory runs were identical. LS06 internal SHA-256: `ddd3d18157f9d2000edac5c9852345351c741a3dea80488959f066d4a96b0d69`; JSON file SHA-256: `3D622EE458C882BFB3670791BE4607FC0092E04F0838981101ABA378D4BB4FBC`. LS07 internal SHA-256: `1582e5623504683feaa3b24584c28edc871f0adf1244c4ff480f7569b7ad5ff5`; JSON file SHA-256: `52CBFA31BECD98AED518F72048681462389A2079529086B00C4AAF20EE866FF4`.
- Both contracts report `runtimeIntegrationAllowed=false`, six viewports, 13/13 states, zero phase mismatches, zero browser errors and zero hidden target carriers.
- Focused original-size evidence includes `screenshots/chapter3_ls06_ls07_342a/ls06_guide_1366x1024.png`, `ls06_waiting_1366x1024.png`, `ls06_pair_1024x768.png`, `ls06_assisted_1024x768.png`, `ls06_sound_paused_1024x768.png`, `ls06_map_rest_1366x1024.png`, `ls07_guide_1366x1024.png`, `ls07_wrong_1366x1024.png` and `ls07_map_rest_1366x1024.png`. Contract directories contain the complete 13-state six-viewport captures, including 1024 DPR2 and 1194 DPR2.
- Manual review confirms guide letter/locator/key alignment, neutral hidden keyboards, equal pair presentation, bounded assisted versus persistent visual-assist distinction, neutral completion keyboards, and stage-correct LS06/LS07 map-rest copy.

Status: browser runtime, focused evidence and both coordinate contracts `passed`. Runtime media integration is intentionally `missing`/disallowed. Physical iPad Safari, real MIDI hardware, acoustic microphone, teacher review, 3-5 child sessions and external similarity/release clearance remain `missing`. No curriculum, equipment, approved-media or sound-contract contradiction was found.

## 2026-07-12 - Overhaul 341a C3-04 / LS05 Listening Slice

Scope: LS05 only. LS06-LS08, approved media, the LS01-LS04 teaching sequence, Chapter 1/2 mastery semantics and the global visual architecture remain unchanged.

Runtime and teaching evidence:

- An explicit map click creates the sole formal `C3-04` session. Every new or resumed session starts with one visible/audible unscored C4 reference; same-session map pause and refresh preserve the current call without replaying the reference.
- Each seeded round persists five hidden C4/D4/E4 calls with a strict `2/2/1` quota, all three candidates present and no run longer than two. Three fixed seeds rotate the singleton across C, D and E.
- Target playback is non-scoring. The focused test atomically injects an early input during actual `target-playing` and proves that only `earlyInputs` changes; call index, correct/wrong totals and scored calls remain unchanged. A later explicit replay from `awaiting-response` increments child replay once without changing those scoring fields.
- Wrong repair preserves the child's actual MIDI pitch, uses neutral sorted pair comparison for valid C/D/E confusions, routes black-key and wrong-octave repeats to candidate-outside strong repair, and performs one target demonstration before modeled safe rest on the fourth error.
- Pair-compare, assisted, visual-assist and pending modeled transitions survive map pause and refresh. Modeled rest creates a new session for remaining calls, replays the C reference, preserves old call records under their original session IDs and cannot combine fragments into stable.
- Per-call records include level/session/bundle IDs, candidates, first valid input and route, qualifying correctness, local replay counts, reveal/strong/modeled/visual/microphone flags, response time and `timingUsedForMastery=false`.
- Stable requires at least 4/5 first-response correct, eligible C/D/E coverage, at most one successful child replay, and no strong, modeled, visual-assist, experimental microphone or crossed-session evidence. The same session never grants retained; `chapter3.completed` remains false.
- Sound disabled, volume zero and AudioContext failure remain non-scoring and recover on the same seed/call. Failed replay does not consume the child replay allowance.
- Correct feedback reconnects D/E to Re/Mi only in the dinosaur bubble. All ordinary child surfaces remain letter-only, and the next hidden call clears the old identity. Feedback states hide the visual-assist control.
- The parent panel reports first-response evidence, C/D/E coverage, child/system replay, confusion, strong/modeled/microphone/visual-assist and truthful partial-rest practice need without claiming absolute pitch.

Focused and shared gates:

- `check:chapter3-ls05`: `65/65`; the supervisor also reported three consecutive `65/65` runs after the atomic early-input and explicit replay correction.
- `check:chapter3-ls04`: `39/39`; `check:chapter3-visible`: `74/74`; `check:child-note-names`: `160/160`; PWA: `7/7`.
- Sessions `72/72`; clean-state `124/124`; M03/garden `32/32`; 339d continuity `14/14`; input `12/12`; audio settings `13/13`; iPad accessibility `43/43`; motion `19/19`; palette `17/17`; contrast `9/9`; Xingya suit `23/23`.
- Generic teaching-zone regression: six viewports, zero failures and zero browser errors; temporary internal SHA-256 `d633ed61116bff92a4edc3e423c08998eb121b14e0166b9f0ed981d063e6cc03`. Historical 340D contract files were not overwritten.
- `check:quick` and `check:bundle:strict` passed; strict bundle remains 41 files and 1,641,265 runtime-asset bytes.

LS05 coordinate and screenshot evidence:

- Contract ID `chapter3-ls05-media-zones-overhaul-341a-v1`, baseline `overhaul-341a`, six landscape browser viewports and 11 required states: `garden-entry`, `reference`, `target-playing`, `awaiting-response`, `sound-paused`, `visual-assist`, `wrong-known`, `pair-compare`, `assisted-retry`, `complete`, `reduced-motion`.
- Three consecutive complete runs produced internal SHA-256 `8dbadee17186763ab78269222362700ff174a7803e400ebb4df5ab7355a0a65f`; final committed JSON file SHA-256 `A4684E42E60377AA4911CCB502545C57701B14F1F4103893E61674AA02C8AC8F`; all runs had zero failures.
- `screenshots/chapter3_ls05_341a/ls05_reference_1024x768.png`, `ls05_waiting_1024x768.png`, `ls05_wrong_1024x768.png`, `ls05_pair_1024x768.png`, `ls05_assisted_1024x768.png`, `ls05_visual_assist_1194x834.png`, `ls05_visual_assist_feedback_1194x834.png`, `ls05_complete_1366x1024.png` and `ls05_parent_1366x1024.png` are original-size browser evidence.
- Manual review confirms the visual-assist capture is the real pre-answer phase, feedback has no stale help button, pair cards are equal, assisted and persistent visual-assist are visibly distinct, and all five complete pollen cells have clear neutral filled centers.

Status: browser runtime, evidence and coordinate contract `passed`. Physical iPad Safari, real MIDI hardware, acoustic-piano microphone input, child/teacher testing and external release/media clearance remain `missing`. `runtimeIntegrationAllowed=false`; LS06+ remain locked.

## 2026-07-12 - Overhaul 340d Chapter 3 Phase Capture V3

Scope: evidence-only follow-up to `aaf0426`; runtime, CSS, curriculum, input, scoring, mastery, sound and media files are unchanged.

Corrections:

- Every Chapter 3 contract state now has an explicit state-to-phase requirement. `playing` requires `target-playing`; `waiting` requires `awaiting-response`; sound-paused, reference, wrong, assisted and complete require their exact runtime phases. Garden entry requires map.
- Reduced-motion explicitly allows `reference`, `target-playing` or `awaiting-response`; this allowed set is stored in `expectedActualPhases` and repeated in `stateCoverage`.
- Phase waiting and geometry measurement now happen inside one bounded `page.evaluate` task. This removes the Playwright round-trip where `target-playing` could advance to `awaiting-response` between the phase assertion and geometry read.
- Contract completeness now fails when the state name exists but `geometry.phase` is outside that state's allowed set.
- Package, JSON ID and screenshots now use 340D v3. Chapter 3 v1 remains `rejected_navigation_resilience_evidence`; Chapter 3 v2 remains `rejected_phase_capture_nondeterministic_evidence`. Both historical files remain unchanged.

Evidence:

- One cold-directory run followed by two fixed-directory reruns completed with six viewports, nine states, zero failures and zero browser errors.
- All six `playing` records measured `target-playing`; all six `waiting` records measured `awaiting-response` in every run.
- All three runs produced internal SHA-256 `063115a50e95d3cd1a5c7b7ef439debfe2ccb18fbeea9d7b6f3ddcc11f1f18c1`; final v3 file SHA-256 `DCA8CD3A0FBAA36F85F64F954A547080CDB24B334F6C7097D2472F98A68B8981`.
- Generic 340D v2 regression passed with internal SHA-256 `16a7cf0c921d9fcf3cc83d3ce7981446eeebcc2575ed6022b0098b8d4797f67d`.
- `check:chapter3-visible` `74/74`; `check:chapter3-ls04` `39/39`; child note names `160/160`; PWA `7/7`; quick and strict bundle passed.

Status: v3 browser phase/coordinate evidence `passed`; physical iPad Safari remains `missing`, and `runtimeIntegrationAllowed=false`. LS05 remains locked.

## 2026-07-12 - Overhaul 340d Coordinate Navigation Resilience V2

Scope: evidence-only follow-up to commit `35e2b43`; runtime, CSS, curriculum, input, scoring, mastery, sound and media files are unchanged. This version is retained as `rejected_phase_capture_nondeterministic_evidence` because a state named `playing` could measure `awaiting-response` without failing.

Corrections:

- Chapter 3 and generic coordinate generators now use bounded 30-second navigation and boot waits instead of direct 12-second `goto` calls. The generic protected surface wait is bounded at 20 seconds.
- Navigation/reload failures report the target URL, named stage, current URL, `document.readyState`, boot visibility/style, protected-surface geometry where applicable, Service Worker control URL and CacheStorage names. Errors are surfaced immediately; there is no retry loop or swallowed failure.
- The Chapter 3 check tag is `chapter3-media-zones-340d-v2`; both v2 scripts contain no 340a/340c evidence identity.
- Current package gates, JSON IDs and screenshot paths use 340D v2. The 340D v1 files from `35e2b43` remain byte-identical and are retained as `rejected_navigation_resilience_evidence`, not overwritten.

Contract evidence:

- Chapter 3 ID: `chapter3-media-zones-overhaul-340d-v2`; six viewports, nine states, zero failures. Three consecutive complete runs produced internal SHA-256 `45098116a6dc5a383d1452abb21b3d953589140f75b0a15db135256b8b8f6b8a`; final file SHA-256 `6CA2006225EC766CECD52B19297FC3B9BB53134650557C4E5599066B466DAE0A`.
- Generic ID: `teaching-zones-overhaul-340d-v2`; six viewports, zero failures/errors. Two consecutive complete runs produced internal SHA-256 `16a7cf0c921d9fcf3cc83d3ce7981446eeebcc2575ed6022b0098b8d4797f67d`; final file SHA-256 `46A7CAC071BF42FEF9FA59A897E03EC47E53B83D046D608B9512AC43489A8A05`.
- Historical files remain unchanged: 340A V2 `11299884B8C7837812C5968AD6C75F53A4F169A803C7CBF412A19FA4796E547B`; Chapter 3 340C `248A3A36FB2E92424576ACFC901BCB9F166EB0C504914B7C2D764AE2A4805813`; generic 340C `BE5D74A9765D1B6F3B6BF9E58EE322C204978F29B550ECE1A321459622A360C2`; Chapter 3 340D v1 `6FA71E298B580ED59DFD2B465BBDBD23B56449F3BC438597D03A52FF3BA1C891`; generic 340D v1 `D79E9A84C9D6A904C421AAA424BE3579A770F58AA625BE41D1A0DD7C71B800C5`.

Status: v2 browser coordinate evidence `passed`; physical iPad Safari remains `missing`, and `runtimeIntegrationAllowed=false`. LS05 remains locked.

## 2026-07-12 - Overhaul 340d Evidence Resilience and Note-Name Boundary

Baseline: follow-up to `af13deb` without changing lesson runtime, pitch, input, scoring, mastery, story or media behavior. The coordinate v1 produced by this entry is retained for traceability but is superseded as `rejected_navigation_resilience_evidence` by the 340D v2 entry above.

Corrections:

- Chapter 3 visible testing now installs an air-state observer before the entry click and proves the ordered `sealed -> scanning -> safe-open` transition. Scanning return and refresh cases wait for the actual state instead of sampling at a fixed 520 ms.
- The 340D media-zone generator uses bounded 12-second phase waits that require DOM and persisted attempt agreement, with explicit session/phase/audio diagnostics on timeout. The final completion observer is armed before the last child input and requires the complete garden panel to be visibly present, so a stale marker on the map cannot pass.
- Static `#staffFeedback` startup copy now says `读音名`; dinosaur dialogue, parent records and legal non-leaking ARIA dual identity remain unchanged.
- The child note-name matrix covers M07 and FG03 initial, mixed and complete route states in normal, color-reduced and high-contrast modes at 1024x768 and 1194x834 DPR2. It scans DOM text, route attributes and visible pseudo-elements, and calculates cumulative ancestor opacity plus text/background contrast.
- Color-reduced and no-reading audit labels are compact corner badges instead of inherited full-screen pseudo-element overlays. Auxiliary M07/FG03 route labels remain at cumulative opacity `>= 0.85` and contrast `>= 4.5`; normal-mode progress hierarchy is unchanged.
- FG03 no-reading feedback now reads `data-note`, not `data-solfege`, so the non-dialogue pseudo-element displays `E` rather than `Mi`.
- Historical 340C generators and contracts are frozen. Current gates write independent `overhaul-340d` contracts and screenshot directories.
- PWA cache advanced to `star-dino-pwa-overhaul-340d-v1` for the corrected static shell.

Evidence:

- `check:chapter3-visible`: `74/74` with observer-based scanning evidence.
- `check:child-note-names`: `160/160`, including all M07 `C-D-E-D-C` and FG03 `E-F-G` node states, two viewports, three visual modes, compact audit badges and no-reading pseudo-elements.
- `check:chapter3-zones`: three consecutive complete six-viewport/nine-state 340D runs passed. Each produced internal SHA-256 `b73d2da45527ddec49a0b6a91f5a31251c2a1b95b77f67c5838e8f1a6108b9d7`; final file SHA-256 is `6FA71E298B580ED59DFD2B465BBDBD23B56449F3BC438597D03A52FF3BA1C891`.
- Historical files remained byte-identical: 340A V2 SHA-256 `11299884B8C7837812C5968AD6C75F53A4F169A803C7CBF412A19FA4796E547B`; Chapter 3 340C SHA-256 `248A3A36FB2E92424576ACFC901BCB9F166EB0C504914B7C2D764AE2A4805813`; generic 340C SHA-256 `BE5D74A9765D1B6F3B6BF9E58EE322C204978F29B550ECE1A321459622A360C2`.
- `check:chapter3-ls04`: `39/39`; PWA `7/7`; assembly/M08-only blueprint `39/39`; workshop identity `36/36`; M01 hierarchy `17/17`; staff readability `13/13`; iPad accessibility `43/43`; palette `17/17`; contrast `9/9`.
- Generic 340D six-viewport contract passed with internal SHA-256 `1aafae3b27a3f9a8fb72db22619b65f4c981f24425b9bb5dabc15c9ac8d0bc3a`, file SHA-256 `D79E9A84C9D6A904C421AAA424BE3579A770F58AA625BE41D1A0DD7C71B800C5`.
- `check:quick` and `check:bundle:strict` passed; strict bundle remains 41 files and 1,641,265 runtime-asset bytes.

Auxiliary-mode screenshots:

- `screenshots/child_note_names_340d/ipad-1024x768_M07_color-reduced_step-2.png`
- `screenshots/child_note_names_340d/ipad-1024x768_M07_high-contrast_step-5.png`
- `screenshots/child_note_names_340d/ipad-1024x768_FG03_high-contrast_step-0.png`
- `screenshots/child_note_names_340d/ipad-1024x768_FG03_high-contrast_step-3.png`
- `screenshots/child_note_names_340d/ipad-1024x768_FG03_no-reading.png`
- Matching 1194x834 DPR2 originals are in the same directory.

Status: `passed_browser`; physical iPad Safari and external child/teacher review remain `missing`. `runtimeIntegrationAllowed=false`; LS05 remains locked.

## 2026-07-12 - Overhaul 340c Route and Note-Name Correction

Build/version: `overhaul-340c-p7`; product baseline remains `overhaul-340c` pending supervisor promotion.

Scope:

- `M08` remains the only blueprint level. `M01-M07` and `FG01-FG04` keep their physical world scenes.
- Restored the complete M07 five-point route (`C D E D C`) and FG03 three-point route (`E F G`) while suppressing the duplicate star fixture.
- M07 and FG03 now use one route character and one route-attached dinosaur dialogue instead of a second coach character.
- Child-visible note identity uses letters only across keyboard keycaps, level/staff/garden surfaces, route nodes, feedback and transient effects. Dinosaur dialogue may retain solfege; parent evidence and non-leaking keyboard/staff ARIA retain dual identity.
- Static startup/offline copy was updated so no solfege keycap or route label flashes before runtime render.
- PWA runtime URLs and cache advanced to `star-dino-pwa-overhaul-340c-p7-v1`. No pitch, MIDI, microphone, note order, scoring, mastery, session, sound or Chapter 3 behavior changed.

Focused evidence:

- `check:child-note-names`: `55/55` across 1024x768 and 1194x834 DPR2, including normal, color-reduced and high-contrast modes; M07/FG03 letter sequences, one-character/one-dialogue policy, letter-only keycaps and dual-identity keyboard ARIA all pass.
- `check:assembly-blueprint`: `39/39`; M07 and FG03 routes are visible without duplicate fixtures and only M08 retains a blueprint.
- `check:workshop-identity`: `36/36`; `check:m01-hierarchy`: `17/17`; `check:staff-mini`: `20/20`; `check:staff-repair`: `27/27`; `check:staff-readability`: `13/13`.
- `check:input-reliability`: `12/12`; `check:palette`: `17/17`; `check:xingya-suit`: `23/23`; `check:ipad-a11y`: `43/43`; `check:audio-settings`: `13/13`; `check:motion`: `19/19`; `check:contrast`: `9/9`.
- `check:m03-garden`: `32/32`; `check:roof-route`: `97/97`; `check:chapter3-visible`: `74/74`; `check:chapter3-ls04`: `39/39`; `check:supervisor-339c`: `14/14`.
- `check:sessions`: `72/72`; `check:clean-state`: `124/124`; `check:pwa-shell`: `7/7`; `check:quick` and `check:bundle:strict`: passed (`41` files, `1,641,265` runtime-asset bytes).

Coordinate evidence:

- Current Chapter 3 contract: `chapter3-media-zones-overhaul-340c-v1`, nine states, six viewports, zero failures, `runtimeIntegrationAllowed=false`, internal SHA-256 `a61253dcdb366f907afe64428baacbb7635f54974b7710ce7a21a2ad03ee5b70`, current file SHA-256 `248A3A36FB2E92424576ACFC901BCB9F166EB0C504914B7C2D764AE2A4805813`.
- Consecutive Chapter 3 contract runs produced the same internal hash; only `generatedAt` changed. Historical `docs/30_CHAPTER3_MEDIA_ZONE_CONTRACT_340A_V2.json` remained byte-identical at SHA-256 `11299884B8C7837812C5968AD6C75F53A4F169A803C7CBF412A19FA4796E547B`.
- Generic contract: `teaching-zones-overhaul-340c-v1`, six viewports, zero failures/errors, internal SHA-256 `6db90c11eada4733e2fb7a40bdad4fdd6599a60603960889ad0e43f599b4f1f1`.

Screenshots:

- `screenshots/child_note_names_340c/ipad-1024x768_M01.png`
- `screenshots/child_note_names_340c/ipad-1024x768_M07.png`
- `screenshots/child_note_names_340c/ipad-1024x768_FG03.png`
- `screenshots/child_note_names_340c/ipad-1024x768_staff.png`
- `screenshots/child_note_names_340c/ipad-1024x768_garden.png`
- Matching 1194x834 DPR2 originals are in the same directory.

Status: browser runtime and coordinate evidence `passed`; physical iPad Safari, real child/teacher review and external media clearance remain `missing`. LS05 and media runtime integration remain locked.

## 2026-07-12 - Overhaul 340c M08-Only Blueprint Boundary

Build/version: `overhaul-340c`

Scope:

- Construction blueprints are now restricted to `M08` only.
- `M01-M07` and `FG01-FG04` restore their physical world-build layer and keep the blueprint container hidden and empty.
- M03 keeps its hidden-answer listening flow and renders the completed cart in the world scene rather than inside a blueprint.
- M08 roof installation, five-step C-D-E-F-G blueprint, permanent world roof and seal-check flow are unchanged.
- Runtime URLs and the PWA cache were refreshed. No curriculum, note order, session/mastery, input, sound, Chapter 3 or character asset semantics changed.

Evidence:

- `check:assembly-blueprint`: `35/35` across 1024x768 and 1194x834 DPR2; all non-M08 level scenes are visible with hidden/empty blueprints, and M08 retains five steps.
- `check:m03-garden`: `32/32`.
- `check:workshop-identity`: `36/36`.
- `check:roof-route`: `97/97` across 1024x768, 1194x834 DPR2 and 1366x1024.
- `check:m01-hierarchy`: `17/17`.
- `check:clean-state`: `124/124`.
- `check:pwa-shell`: `7/7`.
- `check:quick` and `check:bundle:strict`: passed; strict bundle remains `41` files and `1,641,265` runtime-asset bytes.
- Generic coordinate contract: `teaching-zones-overhaul-340c-v1`, six viewports, zero failures/errors, internal SHA-256 `037d4c6069fd1dd23379b955d060ed492f2e0094e21f86ad23ae924d78827386`.

Status: browser runtime and coordinate evidence `passed`; physical iPad Safari and external child/teacher review remain `missing`. Media runtime integration remains locked.

## 2026-07-12 - Overhaul 340a Chapter 3 Media Zone Contract V2

Build/version: `overhaul-340a` unchanged. This is an evidence-contract correction only; no runtime, curriculum, session, mastery, character, sound or media integration file changed.

Correction:

- The Chapter 3 media-zone generator now measures `sound-paused` after using the real parent sound toggle, confirming the actual runtime phase before recording geometry.
- A single fixed `expectedStates` collection drives both per-viewport completeness checks and contract `stateCoverage`. Missing, unexpected or duplicate states fail generation.
- Required states are: `garden-entry`, `sound-paused`, `reference`, `playing`, `waiting`, `wrong`, `assisted`, `complete`, `reduced-motion`.
- All nine states measure keyboard, Xingya/bubble, neutral sound source, C/D candidates, replay and progress protection zones where applicable, with 24 CSS px clearance and alpha `>= 8/255`.

Contract evidence:

- Path: `docs/30_CHAPTER3_MEDIA_ZONE_CONTRACT_340A_V2.json`
- ID: `chapter3-media-zones-overhaul-340a-v2`
- Internal SHA-256: `ed88544c6878fe769456f0fc4687ef04eb3a36eea5c61541deb9be9eb211f232`
- File SHA-256: `A54B44AF7EA20037DD114E261279AA39296A87D9BAFC48A1D10A23503606D034`
- Six landscape browser viewport models, nine states per viewport, zero failures and zero browser errors.
- `prototypeBaseline=overhaul-340a`, `runtimeIntegrationAllowed=false`, physical iPad Safari remains `missing`.
- The v1 contract and screenshots remain unchanged as rejected historical evidence.

Screenshots:

- `screenshots/chapter3_media_zones_340a_v2/ipad-1024x768-dpr2_sound-paused.png`
- `screenshots/chapter3_media_zones_340a_v2/ipad-pro-11-1194x834-dpr2_sound-paused.png`

Required reruns:

- `check:chapter3-zones`: passed, six viewports, zero failures.
- `check:chapter3-ls04`: `39/39`.
- `check:quick`: passed.
- `check:bundle:strict`: passed; `41` files and `1,641,265` runtime-asset bytes.

Status: browser coordinate evidence `passed`; runtime promotion remains pending supervisor review. Media runtime integration remains locked.

## 2026-07-12 - Overhaul 340a Chapter 3 LS04 Hidden C/D Listening

Build/version: `overhaul-340a`

Scope:

- Added the independent formal `C3-03 / LS04` session after the child explicitly returns from LS03 and clicks the garden marker again. LS05 and later lessons remain unimplemented.
- LS04 first plays one visible C4/Do reference, then uses a session-seeded persistent four-call sequence with C4 and D4 exactly twice each and no run longer than two.
- Formal target playback and response waiting expose no target-specific text, solfege, color, locator, key glow, candidate class, ARIA answer or target data attribute. The two story candidates stay visually identical until scoring.
- The first wrong records child-input audio before target replay; the third wrong enters bounded strong assisted; the fourth wrong or assisted timeout models only the current call and ends at a natural safe rest.
- Every input, support transition and sequence field persists on the current action as `listeningAttempt`. Refresh and map pause preserve session, seed, call and evidence; ended sessions remove pending state.
- Stable requires at least `3/4` first-attempt-correct calls with no early reveal, strong cue, modeled input or experimental microphone route. Same-session retained remains impossible.
- Sound-disabled, zero-volume and failed-AudioContext paths enter neutral `sound-paused`; keys remain observation-only until a gesture successfully replays the same reference/target.
- LS04 completion sets `ls04Completed` and `lessonEvidence.LS04`, while `chapter3.completed` remains false for the future LS08 chapter exit.
- Parent evidence now names the C/D small listening set and reads real LS04 played/stable/retained/today-needs-practice evidence during the activity and after map rest.

Automated evidence:

- `check:chapter3-ls04`: `39/39`, including seed/refresh stability, balanced quota, no-leak DOM, early input, touch, MIDI, real microphone-route completion, wrong replay ordering, assisted/modeled boundaries, `3/4` and `2/4` thresholds, sound disabled, volume zero, AudioContext failure, parent evidence and Chapter 1/2 sentinels.
- `check:chapter3-visible`: `74/74`; `check:supervisor-339c`: `14/14`; `check:sessions`: `72/72`; `check:clean-state`: `124/124`; `check:m03-garden`: `32/32`.
- PWA `7/7`, iPad accessibility `43/43`, input reliability `12/12`, audio settings `13/13`, Xingya suit `23/23`, workshop identity `36/36`, M08 roof `97/97`, assembly `13/13`, M01 hierarchy `17/17`, staff mini `20/20`, staff repair `27/27`, staff readability `13/13`, palette `16/16`, contrast `9/9`, motion `19/19`.
- `check:quick` and `check:bundle:strict` passed; strict bundle still contains `41` files and `1,641,265` runtime-asset bytes.

Coordinate contracts:

- Generic path: `docs/30_TEACHING_ZONE_COORDINATE_CONTRACT_340A.json`
- Generic ID/internal SHA-256: `teaching-zones-overhaul-340a-v1` / `974792083d817e8b9722d6415a77bc61db4811b9d5e1c760104e9e3722c62640`
- Generic file SHA-256: `F25F2BD589D2A8F8E68A62DCC4BBB0D0CA1B71BD60B045A6CC335D424FAD2275`
- Chapter 3 media path: `docs/30_CHAPTER3_MEDIA_ZONE_CONTRACT_340A.json`
- Chapter 3 ID/internal SHA-256: `chapter3-media-zones-overhaul-340a-v1` / `fc44012398898a530aaf6c8ebbe922be582e76cc55af9a7932b1e0118937611a`
- Chapter 3 file SHA-256: `EB7CB0B8A21E3D04E4FEE3BBAF6E64094F2AF41CDA6E6C8E6F6C26C44D735609`
- Both contracts cover six landscape browser viewport models with zero failures, 24 CSS px clearance and alpha `>= 8/255`; the Chapter 3 contract measures entry, reference, playing, waiting, wrong, assisted, complete and reduced-motion states. `runtimeIntegrationAllowed=false`; physical iPad Safari remains missing.

Screenshots:

- `screenshots/chapter3_ls04_340a/ls04_reference_1024x768.png`
- `screenshots/chapter3_ls04_340a/ls04_waiting_1024x768.png`
- `screenshots/chapter3_ls04_340a/ls04_wrong_1024x768.png`
- `screenshots/chapter3_ls04_340a/ls04_complete_1024x768.png`
- `screenshots/chapter3_ls04_340a/ls04_parent_stable_1024x768.png`
- `screenshots/chapter3_ls04_340a/ls04_modeled_rest_1194x834.png`
- `screenshots/chapter3_media_zones_340a/` contains original-size 1024 and 1194 evidence for every protected state.

Milestone status:

- `passed`: browser LS04 state machine, explicit session boundary, deterministic sequence, hidden-answer DOM/ARIA, bounded repair, no-sound scoring gate, persistence, learning evidence, parent evidence, PWA and browser coordinate geometry.
- `partial`: teaching tones use the existing browser Web Audio piano synthesis; speaker audibility and pitch discriminability are not physically calibrated.
- `missing`: physical iPad Safari, real MIDI hardware, acoustic-piano microphone, teacher review, 3-5 child observations, full release provenance and external similarity clearance.
- `contradicted`: none in the frozen 340a scope.

## 2026-07-12 - Overhaul 339d Chapter 3 Pending Attempt Continuity

Build/version: `overhaul-339d`

Scope:

- An unfinished garden attempt is now stored only on the current active session action as `gardenAttempt`.
- Persisted fields include wrong count, input routes, accepted child inputs, child correct count, repair stage and modeled inputs. Ordinary map navigation clears timers and transient visual state but preserves these facts.
- Re-entering the same action, including after a page refresh, restores the pending facts. Waiting time restarts from re-entry and does not include time spent on the map.
- Action completion copies the full evidence into the lesson completion, then deletes the pending attempt. Session ending also removes pending attempts so LS01 cannot contaminate LS02 or another session.
- The approved garden Xingya WebP, note order, mastery/retained rules, Chapter 1/2, sound and art remain unchanged.

Continuity evidence:

- `check:supervisor-339c`: `14/14`; the fixed supervisor probe now confirms two LS01 errors remain cumulative across map navigation.
- `check:chapter3-visible`: `74/74`.
- One wrong, map pause, same-session re-entry, then correct: final LS01 evidence has `wrongCount=1`, `childCorrectCount=1`, two input-route events and ordered wrong/correct child inputs; pause itself does not set needs-practice.
- One wrong followed by refresh: the restored action retains the first wrong; the next wrong enters bounded assisted repair.
- LS01 completion clears its pending attempt; the fresh LS02 resume action/session contains no inherited `gardenAttempt` and starts with repair stage `none`.

Regression evidence:

- sessions `72/72`, clean-state `124/124`, M03+garden `32/32`, PWA `7/7`.
- Version-sensitive gates: workshop identity `36/36`, M08 roof `97/97`, assembly `13/13`, M01 hierarchy `17/17`, Xingya suit `23/23`, staff repair `27/27`, staff readability `13/13`.
- quick and strict bundle passed; `41` files and `1,641,265` runtime-asset bytes.
- Unchanged 339c/339b evidence remains applicable to iPad accessibility, staff mini, palette, contrast, motion, audio settings and input reliability because those source paths were not changed.

Coordinate contract:

- Path: `docs/30_TEACHING_ZONE_COORDINATE_CONTRACT_339D.json`
- ID: `teaching-zones-overhaul-339d-v1`
- Internal contract SHA-256: `0f996e4e0c551a9788fb766e15a6bb4932476c9ec4128a914d9f645708167669`
- File SHA-256: `BD3CBEB605EC55D1D52FAF58CA89FCF3354FB2A72982D5650F1CAEEFA2E59CF4`
- Six browser viewport models, zero failures and zero browser errors; `runtimeIntegrationAllowed=false`; physical iPad Safari remains missing.

Screenshots:

- `screenshots/supervisor_339d/cross-navigation-second-error_1024x768.png`
- `screenshots/supervisor_339d/one-wrong_resumed_1024x768.png`
- `screenshots/supervisor_339d/sealed_resumed_1024x768.png`
- `screenshots/supervisor_339d/scanning_resumed_1024x768.png`
- `screenshots/supervisor_339d/safe-open-zero-input_resumed_1024x768.png`

Milestone status:

- `passed`: pending attempt persistence, cross-map and refresh continuity, cleanup boundaries, supervisor probe, requested regression and browser coordinate evidence.
- `partial`: browser prototype only; final equipment stow remains a deterministic state switch rather than approved motion media.
- `missing`: physical iPad Safari, real device input evidence, teacher/child observation, full release provenance and external similarity clearance.
- `contradicted`: none in the frozen 339d scope.

## 2026-07-12 - Overhaul 339c Pre-LS01 Rest And Garden Map Copy

Build/version: `overhaul-339c`

Scope:

- Returning to the map during sealed, scanning, safe-open with zero input, or after one ordinary LS01 error now pauses the same active `C3-01` at LS01. It creates no leaf, modeled completion, LS01 evidence, resume-to-LS02 target, or needs-practice label.
- Only a real child/assisted/modeled completion of leaf one may end at `early-rest` and create an LS02 resume target.
- Garden marker visible copy and ARIA now share one state-derived result: entrance, LS01, LS02, LS03 ready/active, and complete.
- The approved `assets/runtime/xingya-garden-invite-v1.webp` remains unchanged at SHA-256 `1228082D4DF2BF576ED916B16950799296A975279ED6EFC554F6BB9EDDE88EBA`.

Automated evidence:

- `check:chapter3-visible`: `69/69`, including four pre-LS01 return routes and five map copy states.
- `check:sessions`: `72/72`; `check:clean-state`: `124/124`; `check:m03-garden`: `32/32`; `check:pwa-shell`: `7/7`.
- Version-sensitive regressions: workshop identity `36/36`, M08 roof `97/97`, assembly `13/13`, M01 hierarchy `17/17`, Xingya suit `23/23`, staff repair `27/27`, staff readability `13/13`.
- `check:quick` and `check:bundle:strict`: passed; `41` files and `1,641,265` runtime-asset bytes.
- Unchanged 339b evidence remains applicable to staff mini `20/20`, palette `16/16`, contrast `9/9`, motion `19/19`, audio settings `13/13`, input reliability `12/12`, and iPad accessibility `43/43`; none of their source behavior changed in 339c.

Coordinate contract:

- Path: `docs/30_TEACHING_ZONE_COORDINATE_CONTRACT_339C.json`
- ID: `teaching-zones-overhaul-339c-v1`
- Internal contract SHA-256: `08477ec5e7a846c0375ad8f2e131771eedfe874a809f59f10f244869b593e0f8`
- File SHA-256: `8095D419BA343B44A531E0CF0F77971B57762D051CBAABA8079D0B93C70218E2`
- Six browser viewport models, zero failures, zero browser errors; `runtimeIntegrationAllowed=false`; physical iPad Safari remains `missing`.

Screenshots:

- Four no-progress returns: `screenshots/chapter3_visible_339c/pre_ls01_return_sealed_1024x768.png`, `pre_ls01_return_scanning_1024x768.png`, `pre_ls01_return_safe_open_zero_input_1024x768.png`, `pre_ls01_return_one_wrong_1024x768.png`.
- Map states: `garden_entry_1024x768.png`, `map_copy_ls02_resume_1194x834_dpr2.png`, `map_copy_ls03_ready_1024x768.png`, `map_copy_ls03_active_1024x768.png`, `garden_complete_map_1024x768.png`. The four no-progress screenshots also provide the LS01 active/paused marker state.

Milestone status:

- `passed`: both returned P1 contracts, session/mastery isolation, map visible/ARIA consistency, PWA, version-sensitive regressions and browser coordinate evidence.
- `partial`: browser prototype only; Chapter 3 equipment change remains deterministic state switching rather than final stow animation.
- `missing`: physical iPad Safari, real MIDI/acoustic microphone device evidence, teacher review, 3-5 child observations, full release provenance and external similarity clearance.
- `contradicted`: none in the frozen 339c scope.

## 2026-07-12 - Overhaul 339b Chapter 3 Contract Correction

Build/version: `overhaul-339b`

Scope:

- Chapter 3 map identity now stays `呼吸花园` with `嫩芽 0/3` through `3/3`.
- Difficult, assisted, modeled, long-wait and voluntary-rest LS01 routes end the old `C3-01` session with `early-rest`; the next explicit garden click creates a fresh LS02-only resume session.
- Sealed and scanning states use `xingya-suit-point.webp`; `safe-open` switches to `assets/runtime/xingya-garden-invite-v1.webp`.
- The garden WebP is `prototype_runtime_approved_for_339b`, SHA-256 `1228082D4DF2BF576ED916B16950799296A975279ED6EFC554F6BB9EDDE88EBA`; `release_provenance_partial`, `external_clearance_missing`, `releaseCleared=false`.
- The former CSS visor and helmet-dock layers were removed; runtime contains no `concepts/**` reference.

Evidence status:

- `check:chapter3-visible`: `54/54`; `check:sessions`: `72/72`; `check:clean-state`: `124/124`; `check:m03-garden`: `32/32`.
- `check:workshop-identity`: `36/36`; `check:roof-route`: `97/97`; `check:assembly-blueprint`: `13/13`; `check:m01-hierarchy`: `17/17`.
- `check:pwa-shell`: `7/7`, including a cold-offline fetch of the 33,794-byte garden WebP; `check:ipad-a11y`: `43/43`; `check:xingya-suit`: `23/23`.
- `check:staff-mini`: `20/20`; `check:staff-repair`: `27/27`; `check:staff-readability`: `13/13`.
- `check:palette`: `16/16`; `check:contrast`: `9/9`; `check:motion`: `19/19`; `check:audio-settings`: `13/13`; `check:input-reliability`: `12/12`.
- `check:quick` and `check:bundle:strict`: passed; strict bundle contains `41` files and `1,641,265` runtime-asset bytes.
- Coordinate contract: `docs/30_TEACHING_ZONE_COORDINATE_CONTRACT_339B.json`, ID `teaching-zones-overhaul-339b-v1`, internal contract SHA-256 `138ca68521fd1a45943ca336b7dfc688e603ea5952cb4eb03c3050b19d8832e5`, six browser viewport models, zero failures; `runtimeIntegrationAllowed=false`; physical iPad Safari remains missing.

Live DOM screenshot review:

| State | Evidence | Result |
| --- | --- | --- |
| sealed/scanning, 1024x768 | `screenshots/chapter3_visible_339b/air_check_scanning_1024x768.png` | passed: complete sealed suit remains visible, with no second CSS visor or dock ring |
| LS01 safe-open, 1024x768 | `screenshots/chapter3_visible_339b/LS01_initial_1024x768.png` | passed: three sprouts, exposed body, harness, star backpack, complete feet/tail and clean transparent foot edge; no overlap with speech, leaves or keyboard |
| LS02 resume, 1194x834 DPR2 browser model | `screenshots/chapter3_visible_339b/LS02_resume_1194x834_dpr2.png` | passed: garden-mode character stays readable and leaf one persists in the fresh LS02-only resume session |
| LS03 complete, 1024x768 | `screenshots/chapter3_visible_339b/LS03_complete_1024x768.png` | passed: all three leaves remain visible and the character does not cover the completion state |

Milestone status:

- `passed`: all three returned P1 contracts, prototype-only garden asset selection, live browser placement, Chapter 1/2 regression isolation, PWA and browser coordinate evidence.
- `partial`: garden asset is approved only for this browser prototype; the air-check transition is deterministic code state, not the final motion-ready equipment stow animation.
- `missing`: complete upstream generation provenance, external similarity clearance, physical iPad Safari, real MIDI/acoustic microphone device evidence, teacher review and 3-5 child observations.
- `contradicted`: none in the frozen 339b browser scope.

## 2026-07-12 - Overhaul 339a Chapter 3 Visible Slice

Build/version: `overhaul-339a`

Scope: explicit garden entry, deterministic code fallback air check, C3-01 LS01-LS02, and C3-02 LS03 only. Chapter 1/2 targets, mastery thresholds, retained rules, M08, M03, S01, input semantics, and sound content remain unchanged.

What changed:

- Converted the formal post-C2-03 garden marker into the only Chapter 3 entry button. Rendering, refresh, root reopen, and debug URLs create no Chapter 3 session; the child click creates exactly one formal `C3-01` and unlocks the existing AudioContext in the same gesture.
- Added deterministic `CH3_ENTRY_AIR_CHECK` runtime states: `sealed -> scanning -> safe-open`. Reduced motion and refresh recovery converge to the same safe-open state. The fallback uses code/CSS and the existing approved runtime Xingya suit art; it references no candidate media.
- Added C3-01 as two existing-session `garden` actions: LS01 C4 opens leaf one and LS02 D4 straightens leaf two. If LS01 is difficult, leaf one and its observation evidence persist while the same active session rests on the map and resumes at LS02.
- Added C3-02 LS03: two released, discrete E4 inputs are required. The second prompt removes direct target-key highlighting. Programmatic repetition, held input, and MIDI note-on without note-off cannot count twice.
- Added three permanent world leaves. Future leaves hide their letters until they become current; grown leaves remain connected to the stem and never roll back after an error.
- LS01-LS03 record only local visible-lesson evidence with `reviewableForMastery=false`. They write no stable or retained event and do not change Chapter 1/2 learning records.
- Completion stays in the garden long enough to show all three grown leaves and Xingya's short rest reaction, then returns to a disabled map rest marker. No result modal, close, continue, next-level control, voice, SFX, ambience, or completion motif was added.

Changed implementation and evidence files:

- `app.js`, `index.html`, `chapter3-visible.css`, `service-worker.js`, `package.json`
- `chrome-test/chapter3-visible-check.mjs`, `chrome-test/m03-garden-narrow-check.mjs`, `chrome-test/pwa-shell-check.mjs`, `chrome-test/teaching-zone-coordinate-contract.mjs`
- build assertions in affected existing browser gates
- `docs/30_TEACHING_ZONE_COORDINATE_CONTRACT_339A.json`, `docs/20_GATE_RUN_LOG.md`

Automated results:

- `check:chapter3-visible`: `30/30`.
- `check:m03-garden`: `32/32`; `check:sessions`: `72/72`; `check:clean-state`: `124/124`; `check:workshop-identity`: `36/36`.
- `check:roof-route`: `97/97`; `check:assembly-blueprint`: `13/13`; `check:m01-hierarchy`: `17/17`.
- `check:ipad-a11y`: `43/43`; `check:xingya-suit`: `23/23`; `check:staff-mini`: `20/20`; `check:staff-repair`: `27/27`; `check:staff-readability`: `13/13`.
- `check:palette`: `16/16`; `check:contrast`: `9/9`; `check:motion`: `19/19`; `check:audio-settings`: `13/13`; `check:input-reliability`: `12/12`.
- `check:pwa-shell`: `6/6`; `check:quick` and `check:bundle:strict`: passed, `40` files and `1,607,471` runtime-asset bytes.
- `check:zones`: six browser viewport models, zero browser errors, zero geometry failures.

Coordinate contract:

- Path: `docs/30_TEACHING_ZONE_COORDINATE_CONTRACT_339A.json`
- ID: `teaching-zones-overhaul-339a-v1`
- Status: `browser_coordinate_contract_passed_device_unverified`
- SHA-256: `7aee5df03232b48a940535619e2152b51dd6b404b53afcf1a91749c860fbf45f`
- `runtimeIntegrationAllowed=false`; physical iPad Safari remains `missing`.

Manual screenshot review:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| Garden entry, 1024x768 | `screenshots/chapter3_visible_339a/garden_entry_1024x768.png` | passed | The explicit entry is the sole current destination and creates no session before the click. |
| Air check, 1024x768 | `screenshots/chapter3_visible_339a/air_check_scanning_1024x768.png` | passed | Xingya remains sealed while the backpack checks air; no teaching answer or media overlay is introduced. |
| LS01 initial/correct, 1024x768 | `screenshots/chapter3_visible_339a/LS01_initial_1024x768.png`, `LS01_correct_1024x768.png` | passed | C is primary, Do is Xingya support, and one C visibly opens the first world leaf. |
| LS02 resume, 1194x834 DPR2 | `screenshots/chapter3_visible_339a/LS02_resume_1194x834_dpr2.png` | passed | The first leaf persists and the same session resumes directly at D. |
| LS03 first/complete, 1024x768 | `screenshots/chapter3_visible_339a/LS03_first_1024x768.png`, `LS03_complete_1024x768.png` | passed | The second E weakens direct key highlighting; completion shows three permanent leaves and an in-scene rest reaction. |
| Completed map, 1024x768 | `screenshots/chapter3_visible_339a/garden_complete_map_1024x768.png` | passed | The garden becomes a disabled rest marker with no C3-03/LS04 route or autoplay. |

Milestone status:

- `passed`: browser runtime/session uniqueness, gesture audio timing, deterministic equipment fallback, LS01-LS03 visible teaching, discrete LS03 input, persistent leaves, early-rest resume, mastery isolation, no-modal completion, PWA cache, full existing regression set, and browser coordinate contract.
- `partial`: safe-open is a deterministic code/CSS fallback using existing art, not a final motion-ready helmet/backpack retraction animation. Browser DPR models are not physical iPad Safari evidence.
- `missing`: physical iPad Safari; teacher review; 3-5 child observation; real MIDI keyboard; acoustic-piano microphone; approved Chapter 3 motion/audio media; external art similarity/source clearance.
- `contradicted`: none in the 339a runtime scope.

Integration conflict audit:

- Curriculum: no conflict found. Only LS01 C4, LS02 D4, and LS03 two discrete E4 inputs were implemented; LS04-LS08 remain absent.
- Equipment/story: no conflict found. Entry begins sealed and only reaches safe-open after the air check; Chapter 1/2 suit behavior remains unchanged.
- Media/sound: no conflict found. No `concepts/**`, `audio/**`, `technical-preview-v1`, voice, SFX, ambience, or completion motif is referenced.
- Evidence/input: no conflict found. Chapter 3 is excluded from stable/retained; touch, MIDI note-off rearming, and existing local microphone gating preserve child-input meaning and privacy.

## 2026-07-12 - Overhaul 338a M03 Listening Roles And S01 Garden Rest Destination

Build/version: `overhaul-338a`

Scope: M03 expression/feedback and the post-S01 map destination only. M08 and the 337c runtime art remain frozen. M01-M02, M04-M08, FG01-FG04, note order, input routes, session/retention thresholds, audio behavior, and Chapter 3 remain unchanged.

What changed:

- Replaced the remaining M03 `听音小种子` identity with `会唱小车轮` / `听小车轮` in runtime titles and parent detail.
- Reduced M03 initial guidance to one scene problem, one visible wheel replay button, and one Xingya invitation. The duplicate story ribbon and central listen guide stay hidden.
- Kept D4/C4, Re/Do, target color, key glow, and locator hidden before each answer. Waiting replays the wheel sound without escalating to a locator.
- Changed first-error language to explicit roles: `轮子唱 Re，你来弹 D` and `轮子唱 Do，你来弹 C`. The target key remains the only second repair system.
- Replaced the M03 full-screen result modal with an in-scene permanent result: both wheels lock into the cart, the blueprint states that the cart is ready, and Xingya gives a short celebration. Completion clears floating labels, bursts, sprites, music flights, flying parts, and confetti before the 120-300 ms audit window.
- Preserved formal session progression. The first clean formal D-C completion remains played only; a later qualifying completion may create stable; same-session retained remains impossible. Debug deep links still create no formal evidence.
- Added a persistent non-interactive `花园入口` map rest marker. It unlocks only from an ended formal `C2-03` history entry containing completed `S01-check`, not from `state.staffComplete`, debug stats, or completed-level storage.
- Clean, assisted, and modeled C2-03 endings all unlock the story destination, while their stable/retained and needs-practice evidence remains governed by the existing session contract. Refresh and root/map reopen preserve the marker.
- When the garden marker is current, M01-M08, FG01-FG04, and S01 have no `active`, `aria-current`, `出发`, or `跳` marker. The garden destination is a `div role=status`, not a button, and starts no Chapter 3 session, audio, media, or autoplay.

Changed implementation and evidence files:

- `app.js`
- `index.html`
- `current-overhaul.css`
- `map-overrides.css`
- `service-worker.js`
- `package.json`
- `chrome-test/m03-garden-narrow-check.mjs`
- `chrome-test/workshop-identity-telemetry-check.mjs`
- `chrome-test/clean-state-slice-check.mjs`
- `chrome-test/assembly-blueprint-check.mjs`
- version assertions in affected browser gates
- `docs/30_TEACHING_ZONE_COORDINATE_CONTRACT_338A.json`
- `docs/20_GATE_RUN_LOG.md`

Automated results:

- `npm run check:m03-garden`: `32` passed, `0` failed.
- `npm run check:sessions`: `72` passed, `0` failed.
- `npm run check:clean-state`: `124` passed, `0` failed.
- `npm run check:workshop-identity`: `36` passed, `0` failed.
- `npm run check:roof-route`: `97` passed, `0` failed; M08 remains behaviorally unchanged.
- `npm run check:assembly-blueprint`: `13` passed, `0` failed; `npm run check:m01-hierarchy`: `17` passed, `0` failed.
- `npm run check:staff-mini`: `20` passed, `0` failed; `npm run check:staff-repair`: `27` passed, `0` failed; `npm run check:staff-readability`: `13` passed, `0` failed.
- `npm run check:ipad-a11y`: `43` passed, `0` failed; `npm run check:xingya-suit`: `23` passed, `0` failed.
- `npm run check:palette`: `16` passed, `0` failed; `npm run check:contrast`: `9` passed, `0` failed; `npm run check:motion`: `19` passed, `0` failed.
- `npm run check:audio-settings`: `13` passed, `0` failed; `npm run check:input-reliability`: `12` passed, `0` failed.
- `npm run check:pwa-shell`: `6` passed, `0` failed, including cold offline fetch of every current runtime CSS/JS URL.
- `npm run check:quick`: pass. Note matrix `5` core, `2` reserved, `7` palette, `38` targets; copy `9` files; audio contract `22` checks.
- `npm run check:bundle:strict`: pass. `40` files and `1,607,471` runtime-asset bytes.
- `npm run check:zones`: six browser viewport models, `0` browser errors, `0` geometry failures.

Coordinate contract:

- Path: `docs/30_TEACHING_ZONE_COORDINATE_CONTRACT_338A.json`
- ID: `teaching-zones-overhaul-338a-v1`
- Status: `browser_coordinate_contract_passed_device_unverified`
- SHA-256: `73c69d09bee907e41ebe18c606803cccb0d9d5db6fd37875a840d60795d4c400`
- Runtime media integration remains `runtimeIntegrationAllowed=false`; physical iPad Safari remains `missing`.

Manual screenshot review:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| M03 initial, 1024x768 | `screenshots/m03_garden_338a/M03_initial_1024x768.png` | passed | One wheel story problem, one replay control, one answer-neutral Xingya invitation, neutral `?` wheel slots, and the real keyboard are visually distinct. |
| M03 first error, 1024x768 | `screenshots/m03_garden_338a/M03_wrong_D_1024x768.png` | passed | Xingya says the wheel sang Re and the child should press D; the target key locator is the only second persistent repair system. |
| M03 complete, 1024x768 | `screenshots/m03_garden_338a/M03_complete_1024x768.png` | passed | Both wheels are visibly locked into the cart; Xingya celebrates in scene; no full-screen result card or floating completion clutter remains. |
| Garden rest, 1194x834 DPR2 browser model | `screenshots/m03_garden_338a/garden_clean_1194x834_dpr2.png` | passed | `花园入口` is readable, non-interactive, and the sole `aria-current` location; old nodes carry no current badge. |
| Garden refresh, 1366x1024 DPR2 browser model | `screenshots/m03_garden_338a/garden_refresh_1366x1024_dpr2.png` | passed | Root reopen and refresh preserve the same rest destination without creating an active session. |

Milestone status:

- `passed`: M03 wheel identity, pre-answer hiding, replay behavior, role-correct repair language, in-scene completion, transient suppression, formal played/stable/retained regression, persistent formal-C2-03 garden destination, debug isolation, offline shell, and browser coordinate contract.
- `partial`: browser DPR models and screenshots are not physical iPad Safari evidence. The garden destination is a restrained prototype marker, not final Chapter 3 art.
- `missing`: physical iPad Safari install/offline/update evidence; teacher review; observation with 3-5 children; real MIDI keyboard; real acoustic-piano microphone; approved Chapter 3 atmosphere/gear transition; external art similarity/source clearance.
- `contradicted`: none in the M03 + S01 narrow runtime scope.

Integration conflict audit:

- Curriculum: no conflict found. M03 remains D4 then C4; first formal completion is played only; later qualifying completion may be stable; retained rules are unchanged.
- Equipment/story: no conflict found. M03 remains in the sealed moon exterior. The garden marker does not open Xingya's helmet or start Chapter 3.
- Media/sound: no conflict found. No `concepts/**`, `audio/**`, technical preview, voice, SFX, atmosphere check, or candidate runtime asset was integrated. Existing note playback remains unchanged.
- Input/privacy: no conflict found. Touch, MIDI, and local microphone semantics are unchanged; no account, upload, recording, analytics, or child data pipeline was added.

## 2026-07-11 - Overhaul 337c M08 Roof Blueprint And Visible Feedback Closure

Build/version: `overhaul-337c`

Scope: M08 five-step roof blueprint only. M01-M07 behavior, note targets, mastery/retention semantics, touch/MIDI/microphone input meaning, audio behavior, map routing, M03, S01, and Chapter 3 remain unchanged.

What changed:

- Replaced the old abstract rising route with a grounded, flat moon-workshop composition: one story problem, one central five-step construction blueprint, one Xingya coach bubble, and the real C-G keyboard.
- Added a separate code-drawn world cabin behind the blueprint. It starts with five missing roof panels; C and D visibly install two real panels; C-D-E-F-G permanently closes all five panels and the skylight. Blueprint progress is no longer used as a substitute for world progress.
- The optional reduced-cue pass now checks five pressure joints on the same completed roof. It does not dismantle or rebuild the roof. Completion leaves a soft safe-pressure glow while Xingya remains fully sealed outdoors.
- M08 touch input suppresses floating key labels, note bursts, music flights, and sprites in both install and seal modes. The retained feedback is the physical key press/ripple plus roof-panel or seal-light state change.
- M08 repair copy now compares the child's input with the target, for example `刚按 D（Re），目标 C，唱 Do！`. Guided and seal wrong states preserve all installed panels and checked joints.
- Replaced the rejected two-sprout M08 character candidate with the flat three-sprout Xingya asset. Manual original-size review confirmed three sprouts, transparent helmet, pressure suit, gloves, boots, life-support backpack, and sealed tail sleeve.
- Advanced the page resource version, PWA cache, browser assertions, screenshot paths, and coordinate-contract baseline to `337c`.

Changed implementation and evidence files:

- `app.js`
- `index.html`
- `roof-blueprint-overrides.css`
- `service-worker.js`
- `package.json`
- `chrome-test/roof-route-visual-check.mjs`
- `chrome-test/teaching-zone-coordinate-contract.mjs`
- `chrome-test/assembly-blueprint-check.mjs`
- `chrome-test/m01-note-hierarchy-check.mjs`
- `chrome-test/pwa-shell-check.mjs`
- `chrome-test/staff-readability-check.mjs`
- `chrome-test/staff-repair-layer-check.mjs`
- `chrome-test/workshop-identity-telemetry-check.mjs`
- `chrome-test/xingya-space-suit-check.mjs`
- `assets/runtime/m08-flat-moon-workshop-bg-v1.webp`
- `assets/runtime/xingya-suit-point-flat-m08-v3.webp`
- `assets/generated/m08-337c-runtime-asset-record.md`
- `assets/generated/retired/m08-two-sprout-rejected/`
- `assets/generated/retired/m08-runtime-superseded/`
- `docs/16_ASSET_MANIFEST.md`
- `docs/30_TEACHING_ZONE_COORDINATE_CONTRACT_337C.json`
- `docs/20_GATE_RUN_LOG.md`

Runtime asset identity:

- M08 flat workshop background SHA-256: `6EEDB13B27DAC6A1377C091A5B6FFC69FD71318113309CBCABD105CEA7797857` (`169,410` bytes).
- M08 three-sprout Xingya SHA-256: `EEAA060FE8BC42618E142E2FBF7BC657BC63EA7A78BC8165136473D7B922BC79` (`125,490` bytes).
- Post-handoff provenance audit: the background runtime file is traceable to `assets/generated/m08-flat-moon-workshop-bg-v1.png` at the same `1860x845` dimensions, with decoded PNG/WebP SSIM `0.981389`. The exact uncompressed three-sprout v3 source, full prompt, generation ID, reference list and reproducible export command are not present in the workspace; nearby v1/v2 PNGs are not treated as proof of the final v3 derivation. Details: `assets/generated/m08-337c-runtime-asset-record.md`.
- No `concepts/**`, `audio/**`, or technical-preview candidate is referenced by runtime.

Automated results:

- `npm run check:roof-route`: `97` passed, `0` failed. This includes 180 ms guided/seal wrong-state checks, 120-180 ms rapid-input clutter checks, real world-panel counts, install-to-seal continuity, wrong-state non-regression, pressure completion, and all three required browser viewport sizes.
- `npm run check:quick`: pass. Note matrix: `5` core rows, `2` reserved rows, `7` palette rows, and `38` targets; copy `9` files; audio contract `22` checks.
- `npm run check:bundle:strict`: pass. `40` files, `1,607,471` runtime-asset bytes.
- `npm run check:pwa-shell`: `6` passed, `0` failed, including cold offline fetches for every runtime CSS/JS URL declared by `index.html`.
- `npm run check:xingya-suit`: `23` passed, `0` failed; `npm run check:workshop-identity`: `36` passed, `0` failed.
- `npm run check:m01-hierarchy`: `17` passed, `0` failed; `npm run check:assembly-blueprint`: `13` passed, `0` failed; `npm run check:ipad-a11y`: `43` passed, `0` failed.
- `npm run check:clean-state`: `124` passed, `0` failed; `npm run check:sessions`: `72` passed, `0` failed.
- `npm run check:staff-mini`: `20` passed, `0` failed; `npm run check:staff-repair`: `27` passed, `0` failed; `npm run check:staff-readability`: `13` passed, `0` failed.
- `npm run check:palette`: `16` passed, `0` failed; `npm run check:contrast`: `9` passed, `0` failed.
- `npm run check:motion`: `19` passed, `0` failed; `npm run check:audio-settings`: `13` passed, `0` failed; `npm run check:input-reliability`: `12` passed, `0` failed.
- `npm run check:zones`: six browser viewport models, `0` browser errors, `0` geometry failures.

Coordinate contract:

- Path: `docs/30_TEACHING_ZONE_COORDINATE_CONTRACT_337C.json`
- ID: `teaching-zones-overhaul-337c-v1`
- Status: `browser_coordinate_contract_passed_device_unverified`
- SHA-256: `8cc4e049e45b0aee373630085f17c707b3d16a2f557a4c31baa4d169f8310861`
- The generator itself is part of the source hash set: `chrome-test/teaching-zone-coordinate-contract.mjs` SHA-256 `5581fc6985dfab652a5df1fb68ccefed9543971326f002e66ff1264aae4f5ab2`.
- Runtime media integration remains `runtimeIntegrationAllowed=false`; iPad Safari evidence remains `missing`.

Manual screenshot review:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| M08 initial, 1024x768 | `screenshots/roof_route_337c_ipad-1024x768_initial.png` | passed | Missing five-panel world roof, lateral 1/C-5/G floor blueprint, current hanging part, three-sprout Xingya, and keyboard read as distinct layers without duplicate cards. |
| M08 guided wrong, 1194x834 | `screenshots/roof_route_337c_ipad-pro-11-1194x834_wrong_immediate.png` | passed | One Xingya comparison bubble names D/Re versus C/Do; no floating note label, particle, flight, or sprite appears; the world roof stays unchanged. |
| M08 seal progress, 1194x834 | `screenshots/roof_route_337c_ipad-pro-11-1194x834_seal_progress.png` | passed | The same completed roof remains visible while pressure joints light in order; no roof rebuilding or transient label stack returns. |
| M08 seal complete, 1366x1024 | `screenshots/roof_route_337c_large-ipad-1366x1024_seal_complete.png` | passed | Five roof panels, skylight, five checked joints, soft safe-pressure glow, large readable Xingya, and an uncluttered keyboard remain visible. |

`docs/33` thirteen-item fusion review for M08:

- `passed`: items 1 and 3-12 in browser implementation. M08 keeps one main teaching axis, makes piano input necessary for world change, shows progress every 1-2 inputs, uses one instruction carrier, separates guided and reduced-cue passes, avoids answer leakage as the only cue, provides bounded repair, preserves evidence semantics, stops at natural rest when the child struggles, changes the second pass to a different story action, and keeps music/action ahead of decoration.
- `partial`: item 2. The scene now visually presents a missing roof, blueprint, hanging part, and pointing coach without a paragraph of instructions, but whether a 4-6-year-old understands the story problem without adult explanation is not proven by browser inspection.
- `missing`: item 13. No teacher-led or 3-5 child observation has yet recorded first attention, adult intervention, repair comprehension, noticing the permanent result, or desire to continue.

Milestone status:

- `passed`: M08 flat information hierarchy, three-sprout sealed Xingya continuity, real five-panel world construction, install-to-seal story progression, transient-feedback suppression, comparative wrong repair, non-regressing progress, PWA cache/version closure, browser coordinate contract, and all listed C4-G4/S01 regression gates.
- `partial`: browser screenshots and Playwright DPR models are not physical iPad Safari evidence. The current flat runtime art is suitable for prototype evaluation, but the three-sprout v3 source chain is incomplete and neither asset has completed external similarity review or child appeal testing.
- `missing`: physical iPad Safari install/offline/update review; real MIDI keyboard; real acoustic-piano microphone; teacher review; observation with 3-5 children; approved media/audio integration; Chapter 3 air-check transition; external art/copyright-similarity review.
- `contradicted`: none in the M08-only runtime scope. Previously queued M03/S01 broader-scope issues remain unchanged and are not claimed as resolved here.

Integration conflict audit:

- Curriculum: no conflict found. C-D-E-F-G order, first-pass guided meaning, second-pass reduced-cue meaning, stable/retained gates, natural-rest deferral, and assisted/modeled evidence rules remain intact.
- Equipment and transition: no conflict found. M08 stays outdoors in a complete airtight suit and does not open the helmet. Chapter 3 remains unimplemented and is not bound to M03.
- Sound/input: no conflict found. M08 still accepts the existing screen, MIDI, and local microphone input paths; only M08 visual transients were suppressed. Note sound remains primary and no candidate SFX was integrated.
- Privacy/media: no account, upload, recording, analytics, external runtime resource, unapproved `concepts/**`, `audio/**`, or technical preview was integrated.

## 2026-07-11 - Overhaul 334g Formal Session Isolation, Note Hierarchy, And Cold Offline PWA Closure

Build/version: `overhaul-334g`

Scope: current C4-G4 / S01 browser prototype only. This pass aligns the existing runtime with the locked session-retention contract, reduces M01/M03 teaching clutter, and closes a real PWA shell-cache gap. It does not change level order, note targets, thresholds, story contracts, Chapter 3 behavior, or approved runtime-media boundaries.

What changed:

- Formal learning evidence is isolated from debug deep links. Scheduler priority reads `needsPractice` directly and orders formal history by `lastFormalCompletedAt`; debug replay can update the last attempt but cannot move a formal review later, clear its practice priority, create formal completion evidence, or create stable/retained evidence.
- v2 `completions` migrate as traceable `formalCompletions` for review eligibility without inventing a stable or retained event. The current session matrix covers legacy played-only and legacy stable records, root/map session recovery, wall-clock limits, and bounded modeled completion.
- The clean-state browser slice now asserts that direct `?level=` / `?mode=staff` replay remains played-only. Formal reduced-cue evidence continues to be tested only through the map-created session matrix.
- M01 now uses C-G letter names as the primary keyboard and part labels, keeps solfege secondary, removes redundant story/current-note surfaces, and gives the larger Xingya coach the only initial `唱 Do` prompt.
- M03 keeps its answer hidden before input. On a wrong answer, the only persistent scene repair is Xingya's `唱 Re/D` bubble plus the target-key locator; duplicate part, card, toast, arrow, and particle surfaces remain hidden.
- Added the missing `quality-overrides.css` URL to the PWA `APP_SHELL`. The PWA gate now parses every same-origin runtime stylesheet/script from `index.html`, confirms each is in the current CacheStorage, and opens a fresh controlled offline page that fetches every CSS/JS with `cache: "no-store"`.
- The coordinate-contract generator now measures a reduced-motion stable snapshot and excludes the generated timestamp from its canonical digest. Two consecutive six-viewport runs produced the same contract SHA-256, while normal-motion behavior remains separately covered by `check:motion`.
- Advanced the shell cache and all relevant browser assertions to `334g`.

Changed implementation and evidence files:

- `app.js`
- `current-overhaul.css`
- `index.html`
- `service-worker.js`
- `package.json`
- `chrome-test/session-retention-check.mjs`
- `chrome-test/clean-state-slice-check.mjs`
- `chrome-test/m01-note-hierarchy-check.mjs`
- `chrome-test/roof-route-visual-check.mjs`
- `chrome-test/workshop-identity-telemetry-check.mjs`
- `chrome-test/pwa-shell-check.mjs`
- `chrome-test/contrast-preference-check.mjs`
- `chrome-test/staff-readability-check.mjs`
- `chrome-test/staff-repair-layer-check.mjs`
- `chrome-test/xingya-space-suit-check.mjs`
- `chrome-test/teaching-zone-coordinate-contract.mjs`
- `docs/30_TEACHING_ZONE_COORDINATE_CONTRACT_334G.json`
- `docs/20_GATE_RUN_LOG.md`

Automated results:

- `npm run check:quick`: pass. Note matrix: `5` core rows, `2` reserved rows, `7` palette rows, and `38` targets; copy `9` files; audio contract `22` checks.
- `npm run check:bundle:strict`: pass. `38` files, `1,312,571` runtime-asset bytes.
- `npm run check:sessions`: `72` passed, `0` failed.
- `npm run check:clean-state`: `124` passed, `0` failed.
- `npm run check:m01-hierarchy`: `17` passed, `0` failed.
- `npm run check:workshop-identity`: `36` passed, `0` failed.
- `npm run check:roof-route`: `16` passed, `0` failed.
- `npm run check:ipad-a11y`: `43` passed, `0` failed.
- `npm run check:staff-mini`: `20` passed, `0` failed; `npm run check:staff-repair`: `27` passed, `0` failed; `npm run check:staff-readability`: `13` passed, `0` failed.
- `npm run check:xingya-suit`: `23` passed, `0` failed; `npm run check:palette`: `16` passed, `0` failed.
- `npm run check:motion`: `19` passed, `0` failed; `npm run check:audio-settings`: `13` passed, `0` failed; `npm run check:input-reliability`: `12` passed, `0` failed.
- `npm run check:pwa-shell`: `6` passed, `0` failed, including cold offline per-runtime CSS/JS fetches.
- `npm run check:contrast`: `9` passed, `0` failed.
- `npm run check:zones`: six browser viewport models, `0` browser errors, `0` geometry failures.
- Repeated `npm run check:zones`: identical stable-snapshot SHA-256 on both runs.

Coordinate contract:

- Path: `docs/30_TEACHING_ZONE_COORDINATE_CONTRACT_334G.json`
- ID: `teaching-zones-overhaul-334g-v1`
- Status: `browser_coordinate_contract_passed_device_unverified`
- SHA-256: `911ebf65893b17c93a0b8b454276fbd79f57ca0eea7615e2e23f7b163af92150`
- Runtime media integration: `runtimeIntegrationAllowed=false`
- iPad Safari and physical safe-area evidence: missing

Manual screenshot review:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| M01, 1024x768 | `screenshots/m01_hierarchy_334g_ipad-1024x768.png` | passed | Story card is compact and identity-free; C-G is primary on the real keyboard; Xingya is larger, contained, and is the only initial solfege prompt. |
| M03 wrong repair | `screenshots/workshop_identity_latest_M03_wrong_revealed.png` | passed | One Xingya `Re/D` repair surface plus the target-key locator remain; target-linked objects and repeated overlays stay hidden. |
| Active session resume | `screenshots/session_retention_334g/active-resume-map-1194x834.png` | passed | The map keeps the active route visible and resumes the same session rather than creating a new one. |
| Parent evidence | `screenshots/session_retention_334g/parent-four-evidence-states-1194x834.png` | passed | Played, stable, retained, and today-needs-practice remain separate on the adult-only surface. |
| Bounded rest states | `screenshots/session_retention_334g/level-modeled-rest-1194x834.png`; `screenshots/session_retention_334g/staff-modeled-rest-1194x834.png` | passed | Four misses resolve to a gentle shared completion and map rest without polluting child input evidence. |
| Cold offline map | `screenshots/pwa_shell_334g_cold-offline-map.png` | passed | A newly opened offline controlled page renders the cached map shell after every declared CSS/JS resource has been fetched from the service-worker cache. |

Milestone status:

- `passed`: formal/debug evidence isolation, v2 review migration coverage, M01 letter-name hierarchy, M03 repair convergence, cold PWA shell resources, current browser coordinate contract, and all listed C4-G4/S01 browser gates.
- `partial`: PWA and coordinate evidence is Chrome/Playwright browser evidence, not physical iPad Safari. The PWA test proves cache completeness for the declared shell, not an iOS home-screen update cycle.
- `missing`: physical iPad Safari install/offline/update review; real MIDI keyboard; real acoustic-piano microphone; teacher review; observation with 3-5 children; Chapter 3 air-check transition and approved runtime art; approved media integration; external art/copyright-similarity review.
- `contradicted`: none in the checked C4-G4/S01 runtime scope.

Integration conflict audit:

- Curriculum: no contract conflict found. The runtime implementation now honors the existing formal-session, review, stable, retained, and debug-isolation rules; no course target, sequence, threshold, or story meaning was changed.
- Equipment and transition: no conflict found. Chapter 1/2 pressure-suit behavior remains in place; Chapter 3 remains unimplemented.
- Privacy/media: no account, upload, recording, analytics, external runtime resource, or unapproved `concepts/**`, `audio/**`, or technical preview was integrated.

## 2026-07-11 - Overhaul 333a System High-Contrast Display Preference

Build/version: `overhaul-333a`

Scope: Web/iPad prototype accessibility and display polish only. This pass honors a device/browser `prefers-contrast: more` preference without adding child-facing assessment UI, changing note colors into an answer channel, modifying level order, or changing learning evidence.

What changed:

- Added a small runtime preference bridge in `app.js`: the document records `data-contrast="more"` and `data-contrast-source="system"` when the device requests higher contrast, and updates when that device preference changes. Default devices explicitly stay at `data-contrast="normal"`.
- Added high-contrast styles only below that document state. Map labels, app chrome, staff labels, parent surfaces, and result surfaces become opaque with stronger borders; S01 uses `8px` white staff/ledger lines and `6px` measure lines; the keyboard gains a clear outer edge.
- Default visual presentation, C-G note palette, color-reduced mode, key geometry, M03 answer-hiding state, sound, motion, input routes, and child-facing copy are unchanged.
- Added `check:contrast`, covering the normal path plus system-high-contrast map, M03 listening, S01, keyboard, and parent surface states at the 11-inch browser model.
- Advanced the cache-busted shell, PWA cache, regression assertions, screenshot destinations, and coordinate-contract baseline from `332a` to `333a`.

Changed implementation and evidence files:

- `app.js`
- `current-overhaul.css`
- `index.html`
- `service-worker.js`
- `package.json`
- `chrome-test/contrast-preference-check.mjs`
- `chrome-test/pwa-shell-check.mjs`
- `chrome-test/staff-readability-check.mjs`
- `chrome-test/staff-repair-layer-check.mjs`
- `chrome-test/teaching-zone-coordinate-contract.mjs`
- `chrome-test/workshop-identity-telemetry-check.mjs`
- `chrome-test/xingya-space-suit-check.mjs`
- `docs/30_TEACHING_ZONE_COORDINATE_CONTRACT_333A.json`
- `docs/20_GATE_RUN_LOG.md`

Automated results:

- `npm run check:contrast`: `9` passed, `0` failed.
- `npm run check:sessions`: `58` passed, `0` failed.
- `npm run check:quick` and `npm run check:bundle:strict`: pass; strict bundle checks `38` files and `1,312,571` runtime-asset bytes.
- `npm run check:clean-state`: `124` passed, `0` failed.
- `npm run check:workshop-identity`: `36` passed, `0` failed.
- `npm run check:ipad-a11y`: `43` passed, `0` failed.
- `npm run check:staff-mini`: `20` passed, `0` failed; `npm run check:staff-repair`: `27` passed, `0` failed; `npm run check:staff-readability`: `13` passed, `0` failed.
- `npm run check:xingya-suit`: `23` passed, `0` failed; `npm run check:palette`: `16` passed, `0` failed.
- `npm run check:motion`: `19` passed, `0` failed; `npm run check:audio-settings`: `13` passed, `0` failed.
- `npm run check:input-reliability`: `12` passed, `0` failed; `npm run check:pwa-shell`: `5` passed, `0` failed.
- `npm run check:zones`: pass across six browser viewport models, `0` browser errors, `0` failures.

Coordinate contract:

- Path: `docs/30_TEACHING_ZONE_COORDINATE_CONTRACT_333A.json`
- ID: `teaching-zones-overhaul-333a-v1`
- Status: `browser_coordinate_contract_passed_device_unverified`
- SHA-256: `dae9f1abb2deeff8b9fee78ecc7bb81ee55776798a11dad583fc6d05068e755b`
- Runtime media integration: `runtimeIntegrationAllowed=false`
- iPad Safari and physical safe-area evidence: missing

Manual screenshot review:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| Default map | `screenshots/ipad_accessibility_latest_map.png` | passed | The normal child-facing map retains its existing colorful, low-density visual treatment. |
| Default S01 | `screenshots/staff_readability_333a_ipad-pro-11-1194x834.png` | passed | Normal mode retains the clear five-line star bridge and unaltered keyboard hierarchy. |
| High-contrast map | `screenshots/contrast_preference_333a_map.png` | passed | System preference makes map labels and headers opaque with dark outlines while leaving the world image available as context. |
| High-contrast S01 | `screenshots/contrast_preference_333a_staff.png` | passed | Five staff lines, the target pad, and the keyboard boundary remain unambiguous on the dark scene. |
| High-contrast parent panel | `screenshots/contrast_preference_333a_parent.png` | passed | Parent status, controls, and input options remain legible and contained. |

Milestone status:

- `passed`: system high-contrast preference support is active, normal mode remains visually unchanged, and all current C4-G4/S01 browser gates remain green. The current 333a browser coordinate contract matches the live `current-overhaul.css` hash.
- `partial`: the contrast preference is browser-emulated evidence, not a physical iPad Safari accessibility test. A specific iPadOS contrast/Smart Invert review is still needed because system preference support varies by device and browser version.
- `missing`: physical iPad home-screen install and offline update cycle; real MIDI keyboard; real acoustic-piano microphone; teacher review; observation with 3-5 children; approved Chapter 3 runtime art package (air-check transition, helmet-free Xingya garden poses, and seed states); approved media integration; Chapter 3 runtime; external art/copyright-similarity review.
- `contradicted`: none in the checked C4-G4/S01 runtime scope.

Integration conflict audit:

- Curriculum: no conflict found. No level target, order, scaffold, mastery threshold, story rule, session boundary, or `played/stable/retained` semantics changed.
- Equipment and transition: no conflict found. Current Chapter 1/2 complete pressure-suit behavior remains unchanged. Chapter 3 was inspected but not implemented because only source concepts, not runtime-approved garden/transition assets, are available.
- Privacy/media: no account, upload, recording, analytics, external runtime resource, or unapproved `concepts/**`, `audio/**`, or technical preview was integrated.

### 2026-07-11 - 333a Sealed Xingya Action-Sheet Reproducibility Addendum

Scope: source-art processing verification only. This is not a new runtime-art approval, a Chapter 3 implementation, or a media integration decision.

What changed:

- Refactored `tools/process-xingya-action-sheet.py` now accepts a layout manifest for its source path, grid, crop adjustments, normalized canvas, byte budget, and expected output SHA-256 values.
- Added `concepts/generated-v2/xingya-sealed-action-sheet-v1.runtime-layout.json` and `npm run check:runtime-art-pipeline`. The package command writes only under `screenshots/runtime_art_pipeline_333a/`; it does not target `assets/runtime`.
- Corrected two transcription errors in the manifest's existing expected hashes: `try-again` and `celebrate`. All six regenerated outputs now exactly match the already active Chapter 1/2 runtime files.

Verification:

```powershell
python -m py_compile tools\process-xingya-action-sheet.py
npm run check:runtime-art-pipeline
```

- Python syntax check: passed.
- Pipeline: passed. Six `512x512` transparent WebP outputs were written only to `screenshots/runtime_art_pipeline_333a/runtime/`, each under the `100,000` byte budget (`35,532`-`42,520` bytes).
- Alpha/fringe audit: passed for all six poses. Every canvas keeps transparent outer corners; visible-pixel counts are `78,693`-`91,586`; the magenta-like fringe scan found `5`-`10` pixels per pose, below the configured threshold.
- SHA-256 match: passed for `point`, `listen`, `good`, `try-again`, `celebrate`, and `jump`. The generated files exactly match the existing `assets/runtime/xingya-suit-*.webp` hashes.
- Manual contact-sheet review: `screenshots/runtime_art_pipeline_333a/xingya-sealed-action-cuts.png` was checked at original size. The six poses retain clean transparent bounds, and the `celebrate`/`jump` crop-boundary adjustment does not carry content across cells.
- Runtime preservation: `assets/runtime/xingya-suit-*.webp` was not written by this command; its recorded modification times remain `2026-07-10`.

Limitations and conflict audit:

- This command proves reproducibility of the current sealed-suit source cuts only. It does not approve any new character, scene, animation, voice, SFX, or Chapter 3 asset.
- No `concepts/**`, `audio/**`, or technical-preview file was added to a runtime path. Existing Chapter 1/2 pressure-suit behavior, curriculum semantics, and media-integration hold remain unchanged.

## 2026-07-11 - Overhaul 332a S01 Five-Line Staff Readability

Build/version: `overhaul-332a`

Scope: current C4-G4/S01 browser prototype visual correction only. A manual iPad-model audit found that the actual SVG five-line staff was being visually weakened by the legacy scene treatment. This pass makes the staff read first, without changing the course route, notes, hints, keyboard geometry, session evidence, or story semantics.

What changed:

- Raised the S01 SVG staff scene contrast and opacity after confirming the legacy `.staff-lines` element is intentionally hidden and the live staff is `.svg-staff-line`.
- Set the five live staff lines to a visibly high-contrast `7px` treatment and strengthened ledger and measure lines. Note positions, bar layout, route targets, piano layout, and repair hierarchy are unchanged.
- Added `check:staff-readability`, which covers `1024x768`, `1194x834`, and `1366x1024` browser models. It requires five visible staff lines at or above `7px`, visible measure/ledger lines, no page overflow, and a clean console.
- Advanced the cache-busted shell, PWA cache, browser assertions, screenshot destinations, and coordinate-contract baseline from `331a` to `332a` so the visual correction is not hidden behind an installed stale shell.

Changed implementation and evidence files:

- `current-overhaul.css`
- `index.html`
- `service-worker.js`
- `package.json`
- `chrome-test/staff-readability-check.mjs`
- `chrome-test/staff-repair-layer-check.mjs`
- `chrome-test/workshop-identity-telemetry-check.mjs`
- `chrome-test/xingya-space-suit-check.mjs`
- `chrome-test/teaching-zone-coordinate-contract.mjs`
- `chrome-test/pwa-shell-check.mjs`
- `docs/30_TEACHING_ZONE_COORDINATE_CONTRACT_332A.json`
- `docs/20_GATE_RUN_LOG.md`

Automated results:

- `npm run check:staff-readability`: `13` passed, `0` failed.
- `npm run check:sessions`: `58` passed, `0` failed, including v2 migration anchoring, eligible opening review, retained timing, debug-deep-link isolation, and bounded level/S01 modeled success.
- `npm run check:quick` and `npm run check:bundle:strict`: pass; strict bundle checks `38` files and `1,312,571` runtime-asset bytes.
- `npm run check:clean-state`: `124` passed, `0` failed.
- `npm run check:workshop-identity`: `36` passed, `0` failed.
- `npm run check:ipad-a11y`: `43` passed, `0` failed.
- `npm run check:staff-mini`: `20` passed, `0` failed; `npm run check:staff-repair`: `27` passed, `0` failed.
- `npm run check:xingya-suit`: `23` passed, `0` failed; `npm run check:palette`: `16` passed, `0` failed.
- `npm run check:motion`: `19` passed, `0` failed; `npm run check:audio-settings`: `13` passed, `0` failed.
- `npm run check:input-reliability`: `12` passed, `0` failed; `npm run check:pwa-shell`: `5` passed, `0` failed.
- `npm run check:zones`: pass across six browser viewport models, `0` browser errors, `0` failures.

Coordinate contract:

- Path: `docs/30_TEACHING_ZONE_COORDINATE_CONTRACT_332A.json`
- ID: `teaching-zones-overhaul-332a-v1`
- Status: `browser_coordinate_contract_passed_device_unverified`
- SHA-256: `58cd6932f3668d427ef4b1524379b8548fa652adcd231abfe3eb475cf6c7eddb`
- Runtime media integration: `runtimeIntegrationAllowed=false`
- iPad Safari and physical safe-area evidence: missing

Manual screenshot review:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| S01 initial, 11-inch browser model | `screenshots/staff_readability_332a_ipad-pro-11-1194x834.png` | passed | Five staff lines, measure separators, and ledger line remain clearly readable before a hint appears. |
| S01 wrong repair, 11-inch browser model | `screenshots/staff_repair_332a_1194x834-dpr2_stable.png` | passed | Central staff target remains primary; one Xingya repair bubble and one key locator are the only persistent repair guidance. |
| Active route resume | `screenshots/session_retention_332a/active-resume-map-1194x834.png` | passed | The active short lesson remains marked on the map and can be resumed. |
| Natural rest | `screenshots/session_retention_332a/natural-rest-1194x834.png` | passed | Autoplay has stopped at the world result; no close/next modal is required. |
| Parent evidence surface | `screenshots/session_retention_332a/parent-four-evidence-states-1194x834.png` | passed | Played, stable, retained, and today-needs-practice remain distinguishable without presenting assessment terms on the child screen. |
| Level modeled rest | `screenshots/session_retention_332a/level-modeled-rest-1194x834.png` | passed | Four consecutive misses resolve to a calm shared completion and map rest; modeled input is not child evidence. |
| S01 modeled rest | `screenshots/session_retention_332a/staff-modeled-rest-1194x834.png` | passed | The staff path reaches the same safe rest without a failure layer or wrong-pad jump. |

Milestone status:

- `passed`: S01 staff readability is materially clearer in all three supported browser models; existing two-surface S01 repair, session/retention, bounded repair, input, PWA, suit, accessibility, palette, and motion gates remain green; the 332a browser coordinate contract was regenerated from current source hashes.
- `partial`: browser/DPR-model evidence is not physical iPad Safari evidence. PWA install/update behavior, physical safe-area geometry, and the visual result on a real child-held device remain unobserved.
- `missing`: physical iPad home-screen install and offline update cycle; real MIDI keyboard; real acoustic-piano microphone; teacher review; observation with 3-5 children; approved media integration; Chapter 3 transition; external art/copyright-similarity review.
- `contradicted`: none in the checked C4-G4/S01 runtime scope.

Integration conflict audit:

- Curriculum: no conflict found. No level target, ordering, scaffold threshold, story rule, session boundary, or `played/stable/retained` semantics changed.
- Equipment and transition: no conflict found. Chapter 1/2 complete pressure-suit behavior is unchanged; Chapter 3 remains unimplemented.
- Privacy/media: no account, upload, recording, analytics, external runtime resource, or unapproved `concepts/**`, `audio/**`, or technical preview was integrated.

## 2026-07-11 - Overhaul 331a Complete iPad Landscape Parent Panel

Build/version: `overhaul-331a`

Scope: final prototype-side visual completion of the parent settings surface across the current iPad browser models. The prior `330a` compact layout fixed `1194x834` and `1024x768`, but the `1366x1024` large-iPad model still inherited the older `720px` card cap and hid lower input options in an internal scroll area.

What changed:

- Raised the landscape parent-card cap to `min(840px, 92svh)` only above `900px` viewport height, preserving the compact layout for shorter iPad landscape viewports while keeping the larger panel readable on a large iPad.
- Added an explicit large-iPad assertion to `check:ipad-a11y`: it requires `1366x1024` to expose every input option, avoid horizontal overflow, and avoid internal vertical scrolling.
- Advanced cache-busted CSS/JS URLs, the PWA cache name, relevant browser assertions, screenshot output paths, and the coordinate-contract baseline to `331a` so installed clients cannot retain the 330a layout.

Measured layout evidence:

- `1194x834`: card height `629.22px`, content/client height `627px`, all parent options visible.
- `1366x1024`: card height `829.09px`, content/client height `827px`, all parent options visible.
- Both measurements use the local `overhaul-331a` browser shell and have no horizontal page overflow.

Changed implementation and evidence files:

- `current-overhaul.css`
- `index.html`
- `service-worker.js`
- `package.json`
- `chrome-test/ipad-accessibility-check.mjs`
- `chrome-test/pwa-shell-check.mjs`
- `chrome-test/staff-repair-layer-check.mjs`
- `chrome-test/workshop-identity-telemetry-check.mjs`
- `chrome-test/xingya-space-suit-check.mjs`
- `chrome-test/teaching-zone-coordinate-contract.mjs`
- `docs/30_TEACHING_ZONE_COORDINATE_CONTRACT_331A.json`
- `docs/20_GATE_RUN_LOG.md`

Automated results:

- `npm run check:sessions`: `58` passed, `0` failed.
- `npm run check:quick` and `npm run check:bundle:strict`: pass; strict bundle checks `38` files and `1,312,571` runtime-asset bytes.
- `npm run check:clean-state`: `124` passed, `0` failed.
- `npm run check:workshop-identity`: `36` passed, `0` failed.
- `npm run check:ipad-a11y`: `43` passed, `0` failed, including the new large-iPad parent-panel guard.
- `npm run check:staff-mini`: `20` passed, `0` failed; `npm run check:staff-repair`: `27` passed, `0` failed.
- `npm run check:xingya-suit`: `23` passed, `0` failed; `npm run check:palette`: `16` passed, `0` failed.
- `npm run check:motion`: `19` passed, `0` failed; `npm run check:audio-settings`: `13` passed, `0` failed.
- `npm run check:input-reliability`: `12` passed, `0` failed; `npm run check:pwa-shell`: `5` passed, `0` failed.
- `npm run check:zones`: pass across six browser viewport models, `0` browser errors, `0` failures.

Coordinate contract:

- Path: `docs/30_TEACHING_ZONE_COORDINATE_CONTRACT_331A.json`
- ID: `teaching-zones-overhaul-331a-v1`
- Status: `browser_coordinate_contract_passed_device_unverified`
- SHA-256: `bb1f317d5c2b61165ccda30fff832e56c6199e75fd19d44928665d87469f9dd3`
- Runtime media integration: `runtimeIntegrationAllowed=false`
- iPad Safari and safe-area evidence: missing

Manual screenshot review:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| 11-inch parent panel | `screenshots/parent_panel_331a_1194x834.png` | passed | Evidence, sound, motion, local microphone, MIDI, and screen-keyboard options all fit on the initial view. |
| Large-iPad parent panel | `screenshots/parent_panel_331a_1366x1024.png` | passed | The previous scroll regression is gone without shrinking the large-screen typography. |
| Active route resume | `screenshots/session_retention_331a/active-resume-map-1194x834.png` | passed | The active short lesson is legible and resumes from its marked map node. |
| Natural rest | `screenshots/session_retention_331a/natural-rest-1194x834.png` | passed | Autoplay stops at the world result; no close/next modal is required. |
| Level modeled rest | `screenshots/session_retention_331a/level-modeled-rest-1194x834.png` | passed | Bounded repair ends as a calm shared completion on the map. |
| S01 modeled rest | `screenshots/session_retention_331a/staff-modeled-rest-1194x834.png` | passed | The staff path reaches the same safe rest without a failure layer. |
| S01 stable repair | `screenshots/staff_repair_331a_1194x834-dpr2_stable.png` | passed | The central task, one Xingya repair bubble, and one key locator remain the only persistent repair guidance. |

Milestone status:

- `passed`: 327a session/retention and bounded-repair behavior remains green; all parent settings are visible in the two iPad landscape browser models; current browser/PWA regression and a fresh coordinate contract are green.
- `partial`: Chromium/browser-model evidence is not physical iPad Safari evidence. PWA install/update behavior and safe-area geometry remain unobserved on an actual device.
- `missing`: physical iPad home-screen install and offline update cycle; real MIDI keyboard; real acoustic-piano microphone; teacher review; observation with 3-5 children; approved media integration; Chapter 3 transition; external art/copyright-similarity review.
- `contradicted`: none in the checked C4-G4/S01 runtime scope.

Integration conflict audit:

- Curriculum: no conflict found. No level target, order, scaffold threshold, story rule, session boundary, or `played/stable/retained` semantics changed.
- Equipment and transition: no conflict found. Chapter 1/2 suit behavior remains unchanged; Chapter 3 is still not implemented.
- Privacy/media: no account, upload, recording, analytics, external runtime resource, or unapproved `concepts/**`, `audio/**`, or technical preview was integrated.

## 2026-07-11 - Overhaul 330a Parent-Panel Landscape Completion

Build/version: `overhaul-330a`

Scope: prototype UI and PWA shell freshness only. The 329a 11-inch landscape parent panel kept its lower input options in an internal scroll region. This pass makes all parent settings visible in the initial landscape view without changing child-facing course behavior, learning evidence, or media integration.

What changed:

- Added a landscape-height layout rule for the parent panel: smaller but still readable status cards, compact evidence chips, and contained input rows. All controls retain at least `44px` touch targets.
- At `1194x834` and `1024x768` browser models, the parent card is now `629.22px` high with `627px` of content, all input options are visible, and there is no horizontal page overflow.
- Bumped CSS/JS cache URLs and the same-origin PWA cache from `overhaul-329a` to `overhaul-330a`, so an installed shell can receive the parent-panel correction rather than continuing to render cached 329a CSS.
- Advanced the PWA, character, workshop, staff-repair, and coordinate-contract runtime assertions to `330a`; created a fresh browser coordinate contract because a layout source file changed.

Changed implementation and evidence files:

- `current-overhaul.css`
- `index.html`
- `service-worker.js`
- `package.json`
- `chrome-test/pwa-shell-check.mjs`
- `chrome-test/staff-repair-layer-check.mjs`
- `chrome-test/workshop-identity-telemetry-check.mjs`
- `chrome-test/xingya-space-suit-check.mjs`
- `chrome-test/teaching-zone-coordinate-contract.mjs`
- `docs/30_TEACHING_ZONE_COORDINATE_CONTRACT_330A.json`
- `docs/20_GATE_RUN_LOG.md`

Automated results:

- `npm run check:sessions`: `58` passed, `0` failed.
- `npm run check:quick` and `npm run check:bundle:strict`: pass; strict bundle checks `38` files and `1,312,571` runtime-asset bytes.
- `npm run check:clean-state`: `124` passed, `0` failed.
- `npm run check:workshop-identity`: `36` passed, `0` failed.
- `npm run check:ipad-a11y`: `42` passed, `0` failed.
- `npm run check:staff-mini`: `20` passed, `0` failed; `npm run check:staff-repair`: `27` passed, `0` failed.
- `npm run check:xingya-suit`: `23` passed, `0` failed; `npm run check:palette`: `16` passed, `0` failed.
- `npm run check:motion`: `19` passed, `0` failed; `npm run check:audio-settings`: `13` passed, `0` failed.
- `npm run check:input-reliability`: `12` passed, `0` failed; `npm run check:pwa-shell`: `5` passed, `0` failed.
- `npm run check:zones`: pass across six browser viewport models, `0` browser errors, `0` failures.

Coordinate contract:

- Path: `docs/30_TEACHING_ZONE_COORDINATE_CONTRACT_330A.json`
- ID: `teaching-zones-overhaul-330a-v1`
- Status: `browser_coordinate_contract_passed_device_unverified`
- SHA-256: `3b3550c7e1406b57161b4c331396a30bae08e2e91becd29efeb54a73eef7863c`
- Runtime media integration: `runtimeIntegrationAllowed=false`
- iPad Safari and safe-area evidence: missing

Manual screenshot review:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| Active route resume | `screenshots/session_retention_330a/active-resume-map-1194x834.png` | passed | The active short lesson remains readable and resumes from its marked map node. |
| Natural rest | `screenshots/session_retention_330a/natural-rest-1194x834.png` | passed | The world result remains visible, autoplay has stopped, and no close/next modal is required. |
| Parent panel | `screenshots/parent_panel_330a_1194x834.png` | passed | Progress, evidence, sound, motion, local microphone, MIDI, and screen-keyboard options all fit in the initial landscape view. |
| Level modeled rest | `screenshots/session_retention_330a/level-modeled-rest-1194x834.png` | passed | Bounded assisted repair ends as a calm shared completion on the map. |
| S01 modeled rest | `screenshots/session_retention_330a/staff-modeled-rest-1194x834.png` | passed | The staff path uses the same safe-rest outcome without a failure layer. |
| S01 stable repair | `screenshots/staff_repair_330a_1194x834-dpr2_stable.png` | passed | The central staff task, one Xingya repair bubble, and one key locator remain the only persistent repair guidance. |

Milestone status:

- `passed`: all required 327a session/retention and bounded-repair checks remain green; current browser parent-panel layout, PWA cache refresh, full regression, and a fresh browser coordinate contract are green.
- `partial`: evidence is Chromium/browser-model based; PWA install/update and safe-area behavior have not been observed on physical iPad Safari.
- `missing`: physical iPad home-screen install and offline update cycle; real MIDI keyboard; real acoustic-piano microphone; teacher review; observation with 3-5 children; approved media integration; Chapter 3 transition; external art/copyright-similarity review.
- `contradicted`: none in the checked C4-G4/S01 runtime scope.

Integration conflict audit:

- Curriculum: no conflict found. No target, level sequence, scaffold threshold, session behavior, or `played/stable/retained` semantics changed.
- Equipment and transition: no conflict found. Chapter 1/2 suit behavior and the unimplemented Chapter 3 transition are unchanged.
- Privacy/media: no account, upload, recording, analytics, external runtime resource, or unapproved `concepts/**`, `audio/**`, or technical preview was integrated.

## 2026-07-11 - Overhaul 329a iPad PWA Shell And Local Offline Map

Build/version: `overhaul-329a`

Scope: Web/iPad delivery shell only. This makes the prototype installable as a PWA and locally usable after its approved shell is cached; it does not make a native iPad app, change course semantics, or add cloud data handling.

What changed:

- The manifest now uses `./` for `id`, `scope`, and `start_url`. Installing from a browser opens the child-facing map rather than the `?level=M01` debug deep link.
- The document now declares standalone/mobile web-app metadata, `viewport-fit=cover`, a blue theme color matching the current map, an iOS status-bar style, an Apple title, and the existing runtime app icon.
- Added `service-worker.js`, which pre-caches only the local HTML, manifest, versioned CSS/JS, and approved `assets/runtime` files. It does not intercept or cache cross-origin requests, does not cache deep-link navigation responses, and falls back to the cached `index.html` only when a navigation is offline.
- The worker removes previous `star-dino-pwa-*` shell caches on activation and claims existing clients. The versioned CSS/JS URLs ensure a future runtime version receives a new shell cache.
- Added a PWA browser gate that validates manifest/head metadata, local worker installation, approved cache inventory, offline map navigation, no overflow, and clean console output.
- The release bundle policy now includes the service worker, so strict bundle auditing covers it.

Changed implementation and evidence files:

- `index.html`
- `manifest.webmanifest`
- `app.js`
- `service-worker.js`
- `release-bundle-policy.json`
- `package.json`
- `chrome-test/pwa-shell-check.mjs`
- `chrome-test/staff-repair-layer-check.mjs`
- `chrome-test/workshop-identity-telemetry-check.mjs`
- `chrome-test/xingya-space-suit-check.mjs`
- `chrome-test/teaching-zone-coordinate-contract.mjs`
- `docs/30_TEACHING_ZONE_COORDINATE_CONTRACT_329A.json`
- `docs/20_GATE_RUN_LOG.md`

Automated results:

- `npm run check:pwa-shell`: `5` passed, `0` failed. It verifies map-first standalone metadata, local worker installation, cache allow-list, no candidate/concept/audio cache path, offline map fallback, no overflow, and console state.
- `npm run check:sessions`: `58` passed, `0` failed.
- `npm run check:input-reliability`: `12` passed, `0` failed.
- `npm run check:quick`: pass. Note matrix checked `38` targets; audio contract checked `22` assertions.
- `npm run check:bundle:strict`: pass; `38` files checked and runtime assets total `1,312,571` bytes.
- `npm run check:clean-state`: `124` passed, `0` failed.
- `npm run check:workshop-identity`: `36` passed, `0` failed.
- `npm run check:ipad-a11y`: `42` passed, `0` failed.
- `npm run check:staff-mini`: `20` passed, `0` failed.
- `npm run check:staff-repair`: `27` passed, `0` failed.
- `npm run check:xingya-suit`: `23` passed, `0` failed.
- `npm run check:palette`: `16` passed, `0` failed.
- `npm run check:motion`: `19` passed, `0` failed.
- `npm run check:audio-settings`: `13` passed, `0` failed.
- `npm run check:zones`: pass across six browser viewport models, `0` browser errors, `0` failures.

Coordinate contract:

- Path: `docs/30_TEACHING_ZONE_COORDINATE_CONTRACT_329A.json`
- ID: `teaching-zones-overhaul-329a-v1`
- Status: `browser_coordinate_contract_passed_device_unverified`
- SHA-256: `06cdc2e9586e113796f184ca298b88cd992e510ab91edce399858d6f4f48f64c`
- Runtime media integration: `runtimeIntegrationAllowed=false`
- iPad Safari and safe-area evidence: missing

Manual screenshot review:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| Online PWA map | `screenshots/pwa_shell_329a_online-map.png` | passed | The map is the initial shell and remains legible at the 11-inch iPad browser model. |
| Offline PWA map | `screenshots/pwa_shell_329a_offline-map.png` | passed | After the first online shell install, an offline navigation returns the complete cached map with no layout overflow. |
| Input and parent panel | `screenshots/input_reliability_329a_microphone-parent.png` | passed | The PWA version preserves the local microphone status, privacy copy, and clean parent foreground. |
| S01 repair | `screenshots/staff_repair_329a_1194x834-dpr2_stable.png` | passed | The two-surface staff repair composition remains unchanged. |
| Session evidence | `screenshots/session_retention_329a/` | passed | Active/resume, natural rest, parent evidence, and modeled-safe-rest states regenerate under the PWA-enabled build. |

Milestone status:

- `passed`: map-first PWA manifest; iOS/standalone metadata; local same-origin shell cache; browser offline fallback; release-policy coverage; full current browser regression; new browser coordinate contract.
- `partial`: Chromium service-worker evidence and browser DPR models are not an install/open/update test on actual iPad Safari. `viewport-fit=cover` metadata exists, but physical safe-area inset geometry remains unmeasured.
- `missing`: physical iPad home-screen install; real Safari offline/update lifecycle; real microphone/MIDI hardware; teacher review; observation with 3-5 children; approved media integration; Chapter 3 transition; external art/copyright-similarity review.
- `contradicted`: none in the checked C4-G4/S01 runtime scope.

Integration conflict audit:

- Curriculum: no conflict found. No level target, order, scaffold, story, session, or `played/stable/retained` field changed.
- Equipment and transition: no conflict found. Current Chapter 1/2 suit and S01 visual rules remain unchanged; Chapter 3 remains unimplemented.
- Privacy/media: no account, analytics, sync, upload, recording, or external runtime resource was added. The worker admits same-origin app-shell and `assets/runtime` paths only; no unapproved `concepts/**`, `audio/**`, or technical preview was integrated.

## 2026-07-11 - Overhaul 328a Reliable Local Microphone Input And Parent-Panel Foreground Guard

Build/version: `overhaul-328a`

Scope: current C4-G4 prototype input only. This is a browser/synthetic-audio implementation milestone, not acoustic piano, physical iPad Safari, or MIDI-hardware release evidence.

What changed:

- The existing microphone route now analyzes at a bounded interval, requires a C4-G4 non-reserved note to remain stable for at least `180 ms` across at least three analysis frames, and accepts it only when confidence and tuning tolerance are met.
- After an accepted microphone note, the same sustained piano tone cannot advance or count as a second answer. The microphone requires a quiet interval before rearming for the next note.
- C4-G4 acceptance rejects A/B reserved keys, pitches more than `42 cents` away from a supported note, low-confidence estimates, and out-of-range values. This does not change the course keyboard, palette, or future-range contract.
- Microphone capture explicitly asks for raw local audio without echo cancellation, noise suppression, or auto gain. The parent UI now states that audio is analyzed on-device immediately and is not uploaded or saved.
- Microphone routes remain experimental evidence: `hasExperimentalInput=true` continues to prevent `stable` and `retained` events. MIDI remains a supported optional input; note-on with velocity zero is still ignored.
- Opening the parent panel removes foreground input particles/toasts/flight effects, visually suppresses any delayed transient feedback, and blocks touch, MIDI, and microphone progression until the panel closes. This fixes a live `Re/D` feedback badge that previously crossed the parent motion-setting row.
- The current browser baseline and all version assertions were advanced from `327a` to `328a`. `327a` contracts and screenshots remain historical evidence.

Changed implementation and evidence files:

- `app.js`
- `index.html`
- `current-overhaul.css`
- `package.json`
- `chrome-test/input-reliability-check.mjs`
- `chrome-test/staff-repair-layer-check.mjs`
- `chrome-test/workshop-identity-telemetry-check.mjs`
- `chrome-test/xingya-space-suit-check.mjs`
- `chrome-test/teaching-zone-coordinate-contract.mjs`
- `docs/30_TEACHING_ZONE_COORDINATE_CONTRACT_328A.json`
- `docs/20_GATE_RUN_LOG.md`

Automated results:

- `npm run check:input-reliability`: `12` passed, `0` failed. It mocks a local C4/D4 waveform through the actual `getUserMedia`/`AudioContext` listener path, proves held-tone de-duplication and quiet rearm, validates pitch/range/tuning gates, checks local-only parent copy, verifies modal input freeze/foreground cleanup, proves microphone input cannot create stable evidence, and checks MIDI note-on/velocity-zero boundaries.
- `npm run check:sessions`: `58` passed, `0` failed.
- `npm run check:quick`: pass. Note matrix checked `38` targets; audio contract checked `22` assertions.
- `npm run check:bundle:strict`: pass; `37` files checked and runtime assets total `1,312,571` bytes.
- `npm run check:clean-state`: `124` passed, `0` failed.
- `npm run check:workshop-identity`: `36` passed, `0` failed.
- `npm run check:ipad-a11y`: `42` passed, `0` failed.
- `npm run check:staff-mini`: `20` passed, `0` failed.
- `npm run check:staff-repair`: `27` passed, `0` failed.
- `npm run check:xingya-suit`: `23` passed, `0` failed.
- `npm run check:palette`: `16` passed, `0` failed.
- `npm run check:motion`: `19` passed, `0` failed.
- `npm run check:audio-settings`: `13` passed, `0` failed.
- `npm run check:zones`: pass across six browser viewport models, `0` browser errors, `0` failures.

Coordinate contract:

- Path: `docs/30_TEACHING_ZONE_COORDINATE_CONTRACT_328A.json`
- ID: `teaching-zones-overhaul-328a-v1`
- Status: `browser_coordinate_contract_passed_device_unverified`
- SHA-256: `6fcb84f15159af569bcb5eb8a5a6bf6d26c6494f11f73e6961272335ded14712`
- Runtime media integration: `runtimeIntegrationAllowed=false`
- iPad Safari and safe-area evidence: missing

Manual screenshot review:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| Microphone live route | `screenshots/input_reliability_328a_microphone-live.png` | passed | M08 remains clear while a synthetic single note is held; keyboard and story target remain unobstructed. |
| Microphone parent panel | `screenshots/input_reliability_328a_microphone-parent.png` | passed | The parent sees `麦克风听音中`, heard-note state, and local-only privacy copy. The previous Re/D foreground badge is absent from the panel. |
| MIDI route | `screenshots/input_reliability_328a_midi.png` | passed | C/D MIDI note-ons advance the visible route without a velocity-zero false input. |
| S01 repair | `screenshots/staff_repair_328a/` | passed | The existing two-surface repair hierarchy remains intact after the input and modal changes. |
| Session evidence | `screenshots/session_retention_328a/` | passed | Active/resume, natural rest, parent evidence, and both modeled-success rest states regenerate under the 328a code. |

Milestone status:

- `passed`: browser-local microphone gate; sustained-tone de-duplication; quiet rearm; C4-G4/reserved/tuning boundaries; MIDI note-on boundary; parent privacy copy; modal foreground cleanup and background-input freeze; full current browser regression; new browser coordinate contract.
- `partial`: synthetic waveform tests and Chromium mock permissions do not prove microphone pickup of an acoustic piano, phone/iPad microphone gain behavior, room noise, latency, or child comprehension. The microphone remains excluded from mastery by design.
- `missing`: physical iPad Safari microphone and MIDI hardware evidence; real acoustic piano/device listening; teacher review; observation with 3-5 children; approved media integration; Chapter 3 transition; external art/copyright-similarity review.
- `contradicted`: none in the checked C4-G4/S01 runtime scope.

Integration conflict audit:

- Curriculum: no conflict found. No note targets, level order, scaffold thresholds, story rules, session map, or `played/stable/retained` semantics changed.
- Equipment and transition: no conflict found. The complete Chapter 1/2 suit remains active; Chapter 3 is not implemented or bound to M03.
- Sound/media: no unapproved `concepts/**`, `audio/**`, or technical-preview asset was integrated. The microphone consumes a local live stream only; it does not record, upload, or store audio.

## 2026-07-11 - Overhaul 327a Short Sessions, Retention Evidence, And Bounded Repair

Build/version: `overhaul-327a`

Scope: formal Chapter 1-2 map sessions, the current C4-G4 prototype, and the existing S01 route only. This implementation does not add Chapter 3 or later runtime content, change course semantics, or integrate unapproved media.

What changed:

- Formal map starts now own a persistent `sessionId` and `bundleId`; reload and map resume preserve the active session, while a new map start creates the next session only after a natural rest point.
- The v2 learning record is losslessly persisted as v3 at startup. Historical `stable` remains independent from later guided replay or failed review; `played`, `stable`, `retained`, and `today needs practice` are distinct parent-facing evidence states.
- `retained` can only arise from the scheduler-selected unique `opening-review`, with a different session and local date, at least eight hours, a valid clock, reduced cue, no strong cue, and a qualifying child completion. Debug deep links and voluntary replay cannot create formal retention evidence.
- Legacy v2 `stableCompletions` can enter the opening-review queue. The first qualifying review creates a traceable v3 stable anchor only; a later eligible review can create retained evidence.
- A third same-step miss enters one assisted retry. A further miss or assisted timeout triggers a modeled success, keeps the world result, marks practice needed, and returns to a natural rest without counting modeled input as child-correct, first-try, touch, MIDI, stable, or retained evidence.
- The map exposes active/resume and natural-rest states without child-facing close/next controls. The parent panel exposes four evidence chips only; child surfaces do not use assessment vocabulary.
- Audio contexts remain user-gesture gated, avoiding browser autoplay warnings.

Changed implementation and evidence files:

- `app.js`
- `index.html`
- `current-overhaul.css`
- `package.json`
- `chrome-test/session-retention-check.mjs`
- `chrome-test/clean-state-slice-check.mjs`
- `chrome-test/staff-repair-layer-check.mjs`
- `chrome-test/teaching-zone-coordinate-contract.mjs`
- `chrome-test/xingya-space-suit-check.mjs`
- `chrome-test/workshop-identity-telemetry-check.mjs`
- `docs/30_TEACHING_ZONE_COORDINATE_CONTRACT_327A.json`
- `docs/20_GATE_RUN_LOG.md`

Automated results:

- `npm run check:sessions`: `58` passed, `0` failed. The full latest docs/31 matrix is covered, including v2 migration, old stable anchor conversion, retained time/date/session gates, deep-link isolation, later-review preservation, and level/S01 modeled success.
- `npm run check:quick`: pass. Note matrix checked `38` level/staff targets; audio contract checked `22` assertions.
- `npm run check:bundle:strict`: pass; `37` files checked and runtime assets total `1,312,571` bytes.
- `npm run check:clean-state`: `124` passed, `0` failed.
- `npm run check:workshop-identity`: `36` passed, `0` failed.
- `npm run check:ipad-a11y`: `42` passed, `0` failed.
- `npm run check:staff-mini`: `20` passed, `0` failed.
- `npm run check:staff-repair`: `27` passed, `0` failed.
- `npm run check:xingya-suit`: `23` passed, `0` failed.
- `npm run check:palette`: `16` passed, `0` failed.
- `npm run check:motion`: `19` passed, `0` failed.
- `npm run check:audio-settings`: `13` passed, `0` failed.
- `npm run check:zones`: pass across six browser viewport models, `0` browser errors, `0` failures.

Coordinate contract:

- Path: `docs/30_TEACHING_ZONE_COORDINATE_CONTRACT_327A.json`
- ID: `teaching-zones-overhaul-327a-v1`
- Status: `browser_coordinate_contract_passed_device_unverified`
- SHA-256: `648201e726e5745e957bd1494dcbbc23872a90ba8a061099df06d49ce418494f`
- Runtime media integration: `runtimeIntegrationAllowed=false`
- iPad Safari and safe-area evidence: missing

Manual screenshot review:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| Active session resume | `screenshots/session_retention_327a/active-resume-map-1194x834.png` | passed | The map clearly communicates an active route and offers its current start point without creating a new session. |
| Natural rest | `screenshots/session_retention_327a/natural-rest-1194x834.png` | passed | The world result is visible, autoplay has stopped, and the map is usable without a close/next result modal. |
| Parent evidence | `screenshots/session_retention_327a/parent-four-evidence-states-1194x834.png` | passed | Played, stable, retained, and today-needs-practice are isolated in the parent surface. |
| Level modeled rest | `screenshots/session_retention_327a/level-modeled-rest-1194x834.png` | passed | Bounded repair ends with a calm shared-completion map state rather than a failure screen. |
| S01 modeled rest | `screenshots/session_retention_327a/staff-modeled-rest-1194x834.png` | passed | The staff path also reaches a calm safe rest after modeled completion. |

Milestone status:

- `passed`: 327a session lifecycle; lossless v2-to-v3 persistence; formal opening-review-only retention; legacy anchor conversion; bounded level/S01 assisted repair; parent evidence separation; current browser coordinate contract; all listed automated gates and manual browser screenshots.
- `partial`: browser evidence does not prove that 4-6-year-old children understand the new session/rest language; pressure-suit poses remain static assets/CSS state changes; aggregate CSS debt remains substantial.
- `missing`: physical iPad Safari resume and safe-area evidence; real MIDI hardware; microphone device testing; teacher review; observation with 3-5 children; Chapter 3 atmosphere transition; approved media integration; external art and copyright-similarity review.
- `contradicted`: none in the checked C4-G4/S01 runtime scope.

Integration conflict audit:

- Curriculum: no conflict found; no target range, level sequence, scaffold threshold, story rule, or `played/stable/retained` contract was changed.
- Equipment and transition: no conflict found; current Chapter 1/2 scenes retain the complete airtight suit; Chapter 3 remains unimplemented and is not bound to M03.
- Sound/media: no unapproved `concepts/**`, `audio/**`, or technical preview path is referenced by `app.js`, `index.html`, or current runtime CSS.

## 2026-07-11 - Overhaul 326a S01 Stable Repair-Layer Convergence

Build/version: `overhaul-326a`

Primary review viewports: `1024x768` DPR1 and `1194x834` DPR2. The refreshed coordinate contract also covers the existing six browser viewports. This is not physical iPad Safari evidence.

Input route: touch/click on the on-screen keyboard; no microphone or MIDI required.

What changed:

- S01 wrong input now enters an explicit `staffRepairState=repair` runtime state.
- The stable repair composition keeps the central staff landing pad as the only main task object and exactly two persistent assistance systems: one Xingya bubble (`Do/C` plus `look at the landing`) and one correct-key locator.
- The duplicate staff note card, central arrow/locator card, top-right event toast, jump guide, footprints, landing ripple, wrong-key character sticker, note bursts, hint flight, and answer particles are suppressed in the repair state.
- The wrong key receives only a short red press response. Its `hit-wrong` state clears after about `940 ms`, while the key label remains readable.
- Xingya may perform one brief gentle stumble, then returns to the start point in the complete pressure suit and clear standing pose. The character does not overlap the current staff pad.
- The current staff pad keeps `Do` and its staff position visible as the main reading target. Color remains secondary; the note label, staff position, and key locator remain available.
- The previous `325a` coordinate contract remains historical evidence for that baseline. Because `app.js`, `current-overhaul.css`, and `index.html` changed, the current runtime uses a new `326a` contract rather than treating `325a` geometry as current.
- This pass changes visual feedback hierarchy only. It does not change S01 notes, staff positions, sequence, scaffold thresholds, mastery, session rules, story semantics, or equipment continuity.

Changed implementation and evidence files:

- `app.js`
- `current-overhaul.css`
- `index.html`
- `package.json`
- `chrome-test/staff-repair-layer-check.mjs`
- `chrome-test/teaching-zone-coordinate-contract.mjs`
- `chrome-test/xingya-space-suit-check.mjs`
- `chrome-test/workshop-identity-telemetry-check.mjs`
- `docs/30_TEACHING_ZONE_COORDINATE_CONTRACT_326A.json`
- `docs/20_GATE_RUN_LOG.md`

Run commands:

```powershell
npm run check:staff-repair
npm run check:quick
npm run check:bundle:strict
npm run check:ipad-a11y
npm run check:workshop-identity
npm run check:xingya-suit
npm run check:palette
npm run check:motion
npm run check:audio-settings
npm run check:staff-mini
npm run check:clean-state
npm run check:zones
```

Automated results:

- `npm run check:staff-repair`: `27` passed, `0` failed across `1024x768` and `1194x834` DPR2. The gate counts exactly two stable assistance surfaces, rejects duplicate overlays, verifies wrong-key fade, checks the standing suit pose, checks pad separation, and captures screenshots.
- `npm run check:quick`: pass.
- `npm run check:bundle:strict`: pass; `37` files checked and runtime assets total `1,312,571` bytes.
- `npm run check:ipad-a11y`: `42` passed, `0` failed.
- `npm run check:workshop-identity`: `36` passed, `0` failed.
- `npm run check:xingya-suit`: `23` passed, `0` failed.
- `npm run check:palette`: `16` passed, `0` failed.
- `npm run check:motion`: `19` passed, `0` failed.
- `npm run check:audio-settings`: `13` passed, `0` failed.
- `npm run check:staff-mini`: `20` passed, `0` failed.
- `npm run check:clean-state`: `124` passed, `0` failed.
- `npm run check:zones`: six viewports measured, `0` browser errors, `0` failures.

Coordinate contract:

- Path: `docs/30_TEACHING_ZONE_COORDINATE_CONTRACT_326A.json`
- ID: `teaching-zones-overhaul-326a-v1`
- Status: `browser_coordinate_contract_passed_device_unverified`
- SHA-256: `1b234f8e089fe2d79d04c5543330dab092dc0a73e7d34a37cb4e34fa2d1626a3`
- Runtime media integration: not allowed
- iPad Safari: missing

Evidence:

| Screen/check | Evidence | Result | Notes |
| --- | --- | --- | --- |
| S01 stable repair `1024x768` | `screenshots/staff_repair_326a_1024x768_stable.png` | passed | Central Do pad, Xingya bubble, and Do key locator form one clear visual path. |
| S01 stable repair `1194x834` DPR2 | `screenshots/staff_repair_326a_1194x834-dpr2_stable.png` | passed | The previously reported duplicate cards, sticker, arrows, particles, and extra rings are absent. |
| Six-viewport S01 stable repair | `screenshots/teaching_zones_326a_*_S01_wrong.png` | passed browser geometry | Stable repair screenshot and DOM geometry regenerated across all contract viewports. |

Milestone status:

- `passed`: S01 stable wrong-state hierarchy; exactly two persistent assistance systems; short wrong-key fade; clear start stance; 1024/1194 screenshots; current browser coordinate contract; all current automated regressions.
- `partial`: this is browser and scripted evidence, not observation of whether a 4-6-year-old follows the intended gaze path; the complete-suit action remains static-pose/CSS motion; aggregate CSS debt remains substantial.
- `missing`: physical iPad Safari and safe-area evidence; MIDI hardware; microphone device; teacher review; observation with 3-5 real children; Chapter 3 transition; external visual-similarity review.
- `contradicted`: none in the checked S01/C4-G4 runtime scope.

Integration conflict audit:

- Curriculum: no conflict found; no course target, sequence, scaffold, or evidence threshold changed.
- Equipment: no conflict found; S01 remains in the complete airtight suit and tail sleeve.
- Transition: no new conflict; Chapter 3 remains unimplemented and is not bound to M03.
- Sound/media: no unapproved `concepts/**`, `audio/**`, or technical preview was integrated.

## 2026-07-11 - Overhaul 325a M03 Repair-Layer Convergence, iPad Accessibility, And Teaching-Zone Contract

Build/version: `overhaul-325a`

Viewport coverage: `1024x768` DPR1 and DPR2, `1180x820` DPR2, `1194x834` DPR2, `1280x720` DPR1 media smoke, and `1366x1024` DPR2 large-iPad browser model. These are browser measurements, not physical iPad Safari evidence.

Input route: touch/click on the on-screen keyboard; no microphone, MIDI hardware, or device permission required.

What changed:

- M03 now keeps every target-identity carrier neutral before the child answers. Initial, identity-idle, and locator-idle states hide the suspended-part badge, current slot letter, route/part answer text, target-key glow, solfege/letter answer, and locator answer. Idle help may replay the modeled note but remains sound-only.
- M03 wrong feedback was reduced from roughly six or seven repeated answer surfaces to two coordinated systems: one Xingya scene-level repair bubble (`Re/D` plus the key locator) and one temporary target-key pulse/locator. The story ribbon, center guide, part badge, slot letter, wrong toast, answer particles, sprite, and flying-answer effect stay suppressed in this state.
- Wrong-key and target-key markers were repositioned and checked so the `Do` and `Re` key names remain readable.
- M08's route bubble was shifted above and to the right of Xingya. M08 and FG03 now have explicit DOM, geometry, complete-suit visibility, and screenshot assertions in the workshop identity gate.
- iPad controls use a minimum `44 CSS px` touch target, retain accessible names and keyboard focusability, and stay inside the header. Route progress exposes one `aria-current` item. The parent dialog traps focus, makes gameplay inert, and restores focus on close. Automatic result layers announce status without becoming a manual next-level gate.
- `chrome-test/teaching-zone-coordinate-contract.mjs` now measures live DOM geometry rather than deriving zones from screenshots, SVG, or CSS constants. It includes its own SHA-256 in the source set, uses `24 CSS px` clearance and `alpha >= 8/255` as the foreground rule, and records M03/S01 initial and wrong states across all six contract viewports.
- M08 and FG03 route-idle states are explicitly primary-only behavior evidence; they are not represented as full-viewport geometry coverage. Geometry states use `measured_all_contract_viewports`, while teaching behavior remains separately linked under `gateEvidence`.
- The coordinate contract remains blocked from runtime media integration: `runtimeIntegrationAllowed=false`; physical iPad Safari and safe-area measurements remain `missing`.
- This pass does not change note/register targets, level order, staff positions, story meaning, reveal/mastery rules, session boundaries, `played / stable / retained` semantics, or actual-hand evidence.

Changed implementation and evidence files:

- `app.js`
- `index.html`
- `styles.css`
- `current-overhaul.css`
- `package.json`
- `chrome-test/ipad-accessibility-check.mjs`
- `chrome-test/xingya-space-suit-check.mjs`
- `chrome-test/clean-state-slice-check.mjs`
- `chrome-test/workshop-identity-telemetry-check.mjs`
- `chrome-test/teaching-zone-coordinate-contract.mjs`
- `docs/30_TEACHING_ZONE_COORDINATE_CONTRACT_325A.json`
- `docs/20_GATE_RUN_LOG.md`

Run commands:

```powershell
npm run check:quick
npm run check:bundle:strict
npm run check:workshop-identity
npm run check:ipad-a11y
npm run check:xingya-suit
npm run check:palette
npm run check:motion
npm run check:audio-settings
npm run check:staff-mini
npm run check:clean-state
npm run check:zones
```

Automated results:

- `npm run check:quick`: pass; syntax, note matrix/palette, copy integrity, audio contract, and prototype bundle policy passed.
- `npm run check:bundle:strict`: pass; `37` files checked and runtime assets total `1,312,571` bytes.
- `npm run check:workshop-identity`: `36` passed, `0` failed. This includes M03 initial, both idle stages, wrong-state repair-surface counting, readable key labels, next-target hiding, M08/FG03 route bubbles, telemetry, and clean console.
- `npm run check:ipad-a11y`: `42` passed, `0` failed.
- `npm run check:xingya-suit`: `23` passed, `0` failed.
- `npm run check:palette`: `16` passed, `0` failed.
- `npm run check:motion`: `19` passed, `0` failed.
- `npm run check:audio-settings`: `13` passed, `0` failed.
- `npm run check:staff-mini`: `20` passed, `0` failed.
- `npm run check:clean-state`: `124` passed, `0` failed.
- `npm run check:zones`: six viewports measured, `0` browser errors, `0` failures.

Coordinate contract:

- Path: `docs/30_TEACHING_ZONE_COORDINATE_CONTRACT_325A.json`
- ID: `teaching-zones-overhaul-325a-v1`
- Status: `browser_coordinate_contract_passed_device_unverified`
- SHA-256: `76d3823d957d46f01a442430385d68f8a335bbb4eb5cc4de93943ba58bf0170e`
- Source files: `13`, including `chrome-test/teaching-zone-coordinate-contract.mjs`
- Viewports: `6`
- Clearance: `24 CSS px`
- Foreground threshold: `alpha >= 8/255`
- Runtime media integration: not allowed
- iPad Safari: missing

Evidence:

| Screen/check | Evidence | Result | Notes |
| --- | --- | --- | --- |
| M03 initial | `screenshots/workshop_identity_latest_M03_initial_hidden.png` | passed | No visible `Re/D`, locator, target glow, part badge, or current slot letter. |
| M03 identity idle | `screenshots/workshop_identity_latest_M03_idle_identity_hidden.png` | passed | Sound replay remains answer-neutral. |
| M03 locator idle | `screenshots/workshop_identity_latest_M03_idle_locator_hidden.png` | passed | The listening level does not turn the second idle tier into a visible locator reveal. |
| M03 wrong | `screenshots/workshop_identity_latest_M03_wrong_revealed.png` | passed | Exactly one scene-level repair bubble plus one target-key locator; duplicate answer surfaces are hidden. |
| M08 route idle | `screenshots/workshop_identity_latest_M08_idle_identity.png` | passed | Bubble stays above and clear of the complete pressure-suit character. |
| FG03 route idle | `screenshots/workshop_identity_latest_FG03_idle_identity.png` | passed | Bubble and character remain readable. |
| Contract M03 wrong matrix | `screenshots/teaching_zones_325a_*_M03_wrong.png` | passed browser geometry | Wrong-state geometry and protected-zone clearance captured at all six contract viewports. |
| Contract S01 wrong matrix | `screenshots/teaching_zones_325a_*_S01_wrong.png` | passed browser geometry | Staff, central target, keyboard, persistent UI, and wrong-feedback zones captured at all six contract viewports. |

Milestone status:

- `passed`: M03 sound-first answer hiding; M03 two-layer wrong repair; readable wrong/target key labels; M08/FG03 route-bubble placement; iPad browser touch targets and dialog focus behavior; complete-suit, palette, reduced-motion, audio-settings, S01-mini, clean-state, bundle, and six-viewport coordinate-contract regressions.
- `partial`: the coordinate contract is browser-derived and safe-area insets remain declared rather than measured on hardware; route and suit motion still use static poses/CSS transitions; aggregate CSS delivery remains substantial prototype debt.
- `missing`: physical iPad Safari and safe-area evidence; MIDI hardware check; microphone-device check; Chapter 3 automatic atmosphere-check/open-helmet/suit-stow transition; teacher review; observation with 3-5 real children; external visual-similarity review.
- `contradicted`: none in the checked C4-G4/S01 runtime scope.

Integration conflict audit:

- Curriculum: no conflict found; M03 reveal timing was restored to the sound-first contract without changing targets or mastery semantics.
- Equipment: no conflict found; active Chapter 1/2 screens continue to use the complete airtight suit and tail sleeve.
- Transition: no new conflict; Chapter 3 remains unimplemented and is not bound to current M03.
- Sound/media: no unapproved `concepts/**`, `audio/**`, or `technical-preview-v1` candidate was integrated.

## 2026-07-10 - Overhaul 324a Workshop Note Identity, Idle Help, And Pressure-Free Telemetry

Build/version: `overhaul-324a`

Viewport: `1024x768` for workshop identity, complete-suit, palette, motion, audio-settings, S01-mini, clean-state, staff and M01-M08 iPad checks; `1280x720` for the final map + staff + M01-M08 visual smoke.

Input route: touch/click on the on-screen keyboard; no microphone or MIDI required.

What changed:

- Workshop parts now keep note identity attached to the object: suspended/current parts show a combined solfege and letter badge such as `Do/C`, while installed sockets retain the letter badge. The approved note color remains a secondary outline/fill cue rather than the only answer signal.
- Color-reduced mode neutralizes the workshop identity badge to `#5F7286`; the child must still use the label, black-key group and keyboard position.
- Guided workshop levels gained two staged, non-punitive idle supports. After about `4.8s`, Xingya gives a soft solfege/letter reminder. After about `8.8s`, Xingya gives the key locator and the matching key receives a temporary locator pulse.
- The first idle identity reminder does not invalidate an otherwise reduced-cue completion. The second key-locator hint records a strong cue and prevents a false stable result.
- M03 keeps its sound-first contract: idle help may replay the modeled note, but it does not reveal the answer note name or key location.
- M07, M08 and FG03 route layouts now attach the idle-help bubble to the visible route Xingya instead of placing detached instruction text in the stage.
- Each completed attempt records local, pressure-free response evidence: first-response time, first-try accuracy, total/wrong inputs and idle-help counts. The record is stored only under `starDinoLearningStats` and includes `timingUsedForMastery: false`.
- The child screen has no countdown, speed rank or time penalty. Timing appears only in the parent panel as a neutral observation with an explicit unlimited-time label.
- Wrong-answer requeue and graded star rewards remain a later game-mode slice. They were not silently added to the guided teaching flow in this pass.
- `docs/16_ASSET_MANIFEST.md` now states the measured CSS risk correctly: no individual `quality-overrides*.css` file exceeds the `250 KB` single-file guard, while the four files total `779,306` bytes and remain substantial aggregate CSS debt.
- This pass does not change note/register targets, level order, staff positions, story meaning, reveal rules, mastery thresholds, session boundaries, `played / stable / retained` semantics, or hand-evidence rules.

Changed implementation files:

- `app.js`
- `index.html`
- `styles.css`
- `package.json`
- `chrome-test/workshop-identity-telemetry-check.mjs`
- `chrome-test/xingya-space-suit-check.mjs`
- `docs/16_ASSET_MANIFEST.md`
- `docs/20_GATE_RUN_LOG.md`

Run commands:

```powershell
npm run check:workshop-identity
npm run check:quick
npm run check:bundle:strict
npm run check:xingya-suit
npm run check:palette
npm run check:motion
npm run check:audio-settings
npm run check:staff-mini
npm run check:clean-state
node tools/with-playwright-path.mjs chrome-test/ipad-visual-check.mjs http://127.0.0.1:4173/ screenshots/overhaul_324a_final_ipad
node tools/with-playwright-path.mjs chrome-test/visual-audit.mjs http://127.0.0.1:4173/ screenshots/overhaul_324a_final_visual
```

Automated results:

- `npm run check:workshop-identity`: `23` checks passed, `0` failed. Coverage includes `Do/C` part/socket identity, color-reduced badges, two-stage idle help, strong-cue evidence, M03 answer hiding, route speech bubbles, parent telemetry and no timing-based mastery.
- `npm run check:quick`: pass; syntax, note matrix/palette, copy integrity, audio contract and prototype bundle policy passed.
- `npm run check:bundle:strict`: pass; `37` files checked and runtime assets total `1,312,571` bytes.
- `npm run check:xingya-suit`: `23` checks passed, `0` failed.
- `npm run check:palette`: `16` checks passed, `0` failed.
- `npm run check:motion`: `19` checks passed, `0` failed.
- `npm run check:audio-settings`: `13` checks passed, `0` failed.
- `npm run check:staff-mini`: `20` checks passed, `0` failed.
- `npm run check:clean-state`: `124` checks passed, `0` failed. The new timing record remains non-authoritative for mastery, and M03 answer hiding plus S01 guided/check behavior remain intact.
- Final `1024x768` iPad smoke: staff and M01-M08 rendered with stable stage/keyboard geometry and `0` console warnings/errors.
- Final `1280x720` visual smoke: map, staff and M01-M08 rendered with `0` console warnings/errors.

Evidence:

| Screen/check | Evidence | Result | Notes |
| --- | --- | --- | --- |
| M02 workshop identity | `screenshots/workshop_identity_latest_M02_initial.png` | passed | Suspended part shows `Do/C`; the active socket keeps `C`; keyboard locator remains separate. |
| M02 installed identity | `screenshots/workshop_identity_latest_M02_after_C.png` | passed | Installed/current object identity remains visible after the first correct input. |
| Color-reduced completion | `screenshots/workshop_identity_latest_M02_color_reduced_complete.png` | passed | Neutralized badge removes the note-color answer shortcut without breaking completion. |
| Route soft reminder | `screenshots/workshop_identity_latest_M07_idle_identity.png` | passed | Xingya names `Do/C` in a contained bubble without covering the route. |
| Route key locator | `screenshots/workshop_identity_latest_M07_idle_locator.png` | passed | Second-stage reminder gives the two-black-key locator and pulses the matching key. |
| Parent response record | `screenshots/workshop_identity_latest_M01_parent_record.png` | passed | Parent-only view shows neutral first-response/accuracy/help counts and explicitly says unlimited time. |
| Complete-suit regression | `screenshots/xingya_space_suit_latest_M01_initial_1024.png` | passed | Workshop identity changes did not regress the Chapter 1/2 airtight-suit baseline. |
| S01 staff geometry | `screenshots/overhaul_324a_final_ipad_staff.png` | passed | Staff stage is `988x459`; keyboard is `1008x222`; no console errors. |
| M01-M08 iPad smoke | `screenshots/overhaul_324a_final_ipad_*.png` | passed | All eight workshop levels rendered at `1024x768` without stage or keyboard collapse. |
| Map and cross-screen smoke | `screenshots/overhaul_324a_final_visual_*.png` | passed | Map, staff and M01-M08 loaded without browser warnings/errors. |

Measured file state:

| File | Size |
| --- | ---: |
| `app.js` | 194,962 bytes |
| `index.html` | 34,448 bytes |
| `styles.css` | 228,842 bytes |
| `chrome-test/workshop-identity-telemetry-check.mjs` | 13,736 bytes |
| `assets/runtime` | 24 files / 1,312,571 bytes |
| `quality-overrides*.css` aggregate | 4 files / 779,306 bytes |

Milestone status:

- `passed`: workshop object-to-note identity; color-reduced fallback; staged idle help; M03 answer hiding; M07/M08/FG03 route bubble placement; local pressure-free response telemetry; parent-only timing presentation; complete-suit, palette, motion, audio-settings, S01-mini, clean-state and bundle regressions; iPad-size M01-M08/staff screenshots and cross-screen smoke.
- `partial`: response timing is an observation signal only, not a validated learning metric; route and suit motion still use static pose/CSS transitions; browser viewport evidence is not physical iPad Safari evidence; aggregate CSS delivery remains much larger than a release-quality target.
- `missing`: later game-mode wrong-answer requeue and graded reward design; physical iPad performance/touch review; teacher review; observation with 3-5 real children; Chapter 3 automatic atmosphere-check/open-helmet/suit-stow transition; external visual-similarity review.
- `contradicted`: none in the checked C4-G4 runtime scope. The earlier `docs/16_ASSET_MANIFEST.md` single-file CSS over-budget statement was corrected to the measured aggregate-debt statement.

Integration conflict audit:

- Curriculum: no conflict found; note targets, sequence, scaffold, natural stop points and evidence semantics are unchanged.
- Equipment: no conflict found; active Chapter 1/2 screens continue to use the complete airtight suit and tail sleeve.
- Transition: no new conflict; Chapter 3 remains unimplemented and is not bound to current M03.
- Sound/media: no unapproved `concepts/**`, `audio/**`, technical preview, voice or SFX candidate was integrated.

## 2026-07-10 - Overhaul 323a Complete Pressure-Suit Xingya Runtime

Build/version: `overhaul-323a`

Viewport: `1024x768` for complete-suit asset, M01/M03/M07/M08/FG03, S01 motion, palette, audio, reduced-motion, S01-mini and clean-state checks; `1280x720` for map + staff + M01-M08 smoke.

Input route: touch/click on the on-screen keyboard; no microphone or MIDI required.

What changed:

- Recovered the built-in image-generation result `ig_0bd22844754bf369016a50db6b685c81999e2830a218396d66`, removed its magenta background, corrected a jump-tail cell-boundary artifact, and derived six normalized `512x512` transparent WebP poses.
- M01-M08 guidance, M03 listening, M07/M08/FG03 route markers, result celebration, and S01 standing/jump/wrong/landing states now use the complete exterior pressure suit: dome helmet, full soft suit, gloves, boots, life-support backpack and airtight tail sleeve.
- S01 now swaps to the dedicated airborne pose during the actual jump and to the gentle stumble pose after a wrong input. Reduced-motion behavior remains controlled by the existing device/parent setting.
- The normal-level coach was previously loaded but fully covered by its own bubble at iPad size. The bubble and character now occupy separate regions; M01-M06, M03 and FG01/FG02/FG04 visibly show Xingya without restoring the duplicated coach layer on M07/M08/FG03.
- M08's first roof piece previously covered almost the whole route character. The complete-suit marker is larger and offset before the current piece, with automated overlap coverage.
- The result character was static-flow content with ineffective `top/right` declarations. It is now positioned as a visible upper-right celebration pose.
- Five superseded helmet-only `assets/runtime/dino-*.webp` files moved to `assets/generated/retired/helmet-only-runtime-322a/`; active source and CSS no longer reference them, so they are not included in the production bundle.
- Exact prompt, reference paths, processing commands, hashes and manual review are recorded in `concepts/generated-v2/xingya-sealed-action-sheet-v1-record.md`.
- This pass changes runtime character art and visual placement only. It does not change note/register targets, level order, staff positions, story meaning, reveal rules, mastery thresholds, sessions, MIDI/microphone evidence, or `played / stable / retained` semantics.

Changed implementation files:

- `app.js`
- `index.html`
- `styles.css`
- `current-overhaul.css`
- `quality-overrides-3.css`
- `quality-overrides-4.css`
- `package.json`
- `tools/process-xingya-action-sheet.py`
- `chrome-test/xingya-space-suit-check.mjs`
- `assets/runtime/xingya-suit-*.webp`
- `concepts/generated-v2/xingya-sealed-action-sheet-v1.png`
- `concepts/generated-v2/xingya-sealed-action-sheet-v1-alpha.png`
- `concepts/generated-v2/xingya-sealed-action-cuts-v1.png`
- `concepts/generated-v2/xingya-sealed-action-sheet-v1-record.md`
- `docs/16_ASSET_MANIFEST.md`
- `docs/20_GATE_RUN_LOG.md`

Run commands:

```powershell
python tools\process-xingya-action-sheet.py
npm run check:xingya-suit
npm run check:motion
npm run check:audio-settings
npm run check:palette
npm run check:staff-mini
npm run check:clean-state
npm run check:quick
npm run check:bundle:strict
node tools/with-playwright-path.mjs chrome-test/visual-audit.mjs http://127.0.0.1:4173/ screenshots/overhaul_323a_visual
```

Automated results:

- `npm run check:xingya-suit`: `23` checks passed, `0` failed. Coverage includes active-reference retirement, six-file decode/alpha/canvas checks, file budgets, M01 point/wrong/celebrate, M03 listen, M07/M08/FG03 route markers, M08 character/part overlap, S01 standing/jump/landing/wrong, iPad overflow, legacy fallback scan, and clean console.
- `npm run check:motion`: `19` checks passed, `0` failed.
- `npm run check:audio-settings`: `13` checks passed, `0` failed; no sound integration changed.
- `npm run check:palette`: `16` checks passed, `0` failed.
- `npm run check:staff-mini`: `20` checks passed, `0` failed.
- `npm run check:clean-state`: `124` checks passed, `0` failed; introduced/played/stable records and answer-hiding behavior are unchanged.
- `npm run check:quick`: pass; syntax, note matrix/palette, copy integrity, audio contract and prototype bundle policy passed.
- `npm run check:bundle:strict`: pass; `37` files checked and runtime assets total `1,312,571` bytes.
- Final Playwright smoke: map + staff + `M01-M08` rendered at `1280x720` with `0` console warnings/errors.

Evidence:

| Screen/check | Evidence | Result | Notes |
| --- | --- | --- | --- |
| Six-pose source audit | `concepts/generated-v2/xingya-sealed-action-cuts-v1.png` | passed | Checkerboard original-size review; tail boundary artifact corrected before runtime export. |
| M01 initial | `screenshots/xingya_space_suit_latest_M01_initial_1024.png` | passed | Full suit and tail sleeve visible; bubble no longer covers Xingya. |
| M01 wrong | `screenshots/xingya_space_suit_latest_M01_wrong_1024.png` | passed | Reassuring sealed-suit stumble pose; no bare body or tail. |
| M01 completion | `screenshots/xingya_space_suit_latest_M01_complete_1024.png` | passed | Celebration pose is visible in the result composition. |
| M03 listening | `screenshots/overhaul_323a_visual_M03.png` | passed | Side-ear listening pose appears beside the sound-first prompt. |
| M08 roof route | `screenshots/xingya_space_suit_latest_M08_initial_1024.png` | passed | Full suit appears before the first roof piece instead of behind it. |
| S01 airborne | `screenshots/xingya_space_suit_latest_S01_jump_1024.png` | passed | Airtight tail sleeve remains compact and does not cover the next staff landing target. |
| S01 landing | `screenshots/xingya_space_suit_latest_S01_landing_1024.png` | passed | Positive sealed-suit pose lands on the completed pad. |
| S01 wrong | `screenshots/xingya_space_suit_latest_S01_wrong_1024.png` | passed | Gentle stumble remains in place and keeps the staff route visible. |
| Cross-screen smoke | `screenshots/overhaul_323a_visual_*.png` | passed | Map, staff and M01-M08 load without browser errors. |

Measured file state:

| File | Size |
| --- | ---: |
| `app.js` | 181,970 bytes |
| `index.html` | 34,213 bytes |
| `current-overhaul.css` | 45,091 bytes |
| `chrome-test/xingya-space-suit-check.mjs` | 13,423 bytes |
| `tools/process-xingya-action-sheet.py` | 5,198 bytes |
| `assets/runtime` | 24 files / 1,312,571 bytes |

Milestone status:

- `passed`: complete pressure-suit runtime references for active Chapter 1/2 prototype screens; static-pose decode/alpha/file-budget checks; M01/M03/M07/M08/FG03/S01 browser behavior; iPad-size layout screenshots; reduced-motion, palette, audio-settings, S01-mini, clean-state and bundle regressions.
- `partial`: these are six static pose renders animated by CSS and position changes, not a final frame-by-frame action package; copyright self-review found no superhero/chest-light/franchise markers, but an external similarity review is still required; `1024x768` is browser viewport evidence, not physical iPad Safari proof.
- `missing`: Chapter 3 automatic atmosphere-check/open-helmet/suit-stow runtime transition; physical iPad performance; real-child gesture comprehension; teacher review of whether the poses imply any unwanted hand or staff cue.
- `contradicted`: none in the checked Chapter 1/2 runtime scope.

Integration conflict audit:

- Curriculum: no conflict found; note targets, sequence, scaffold and evidence semantics are unchanged.
- Equipment: the previous helmet-only runtime conflict is resolved for active M01-M08 and S01 references.
- Transition: no new conflict, but the Chapter 3 2-4 second automatic transition remains missing and must not be claimed as implemented.
- Sound: no candidate voice, animation-audio or new effect asset was integrated; the existing note-priority/audio-settings gates still pass.

## 2026-07-10 - Overhaul 322a Reduced-Motion Comfort Control

Build/version: `overhaul-322a`

Viewport: `1024x768` for the parent control, FG04 feedback, S01-mini, palette, audio, and clean-state checks; `768x1024` for parent-panel geometry only; `1280x720` for the final map + staff + M01-M08 smoke.

Input route: touch/click on the on-screen keyboard; no microphone or MIDI required.

What changed:

- The parent panel now includes a persisted `减少动态效果` switch. The control has a `44px` minimum touch height and fits the existing parent panel without horizontal overflow.
- The runtime respects `prefers-reduced-motion: reduce` automatically. When the device preference is active, the app shows `设备`, keeps the switch on, and does not allow the app to override the device accessibility choice.
- Reduced motion stops continuous route, footprint, dino, map, modal, and celebration animation; removes moving confetti, floating note bursts, ripple sprites, and moving press labels; and reduces remaining transitions to `1ms`.
- Piano keys still depress immediately. Correct, wrong, and hint states retain solid, dashed, and dotted static outlines plus the existing key-state color/depth, so motion reduction does not remove answer feedback.
- The `768x1024` screenshot hides the existing landscape orientation guard inside the Playwright test only so parent-panel geometry can be inspected. Runtime portrait behavior is unchanged and still asks the user to rotate the iPad.
- This pass changes comfort/accessibility UI only. It does not change note/register targets, level order, staff positions, story meaning, reveal rules, mastery thresholds, sessions, or `played / stable / retained` semantics.

Run commands:

```powershell
npm run check:motion
npm run check:audio-settings
npm run check:palette
npm run check:quick
npm run check:staff-mini
npm run check:clean-state
npm run check:bundle:strict
node tools/with-playwright-path.mjs chrome-test/visual-audit.mjs http://127.0.0.1:4173/ screenshots/motion_322a/final_322a
```

Automated results:

- `npm run check:motion`: `19` checks passed, `0` failed, including default/full state, parent persistence, device preference, 44px touch target, reduced-motion key depression, static wrong/correct feedback, FG04 completion, staff/roof animation stop, portrait geometry, full-motion restoration, and clean console.
- `npm run check:audio-settings`: `13` checks passed, `0` failed.
- `npm run check:palette`: `16` checks passed, `0` failed.
- `npm run check:quick`: pass; syntax, note matrix/palette, copy integrity, audio contract, and prototype bundle policy passed.
- `npm run check:staff-mini`: `20` checks passed, `0` failed.
- `npm run check:clean-state`: `124` checks passed, `0` failed.
- `npm run check:bundle:strict`: pass with no temporary exception.
- Final Playwright smoke: map + staff + `M01-M08` rendered with `0` console warnings/errors and unchanged stage/keyboard geometry.

Evidence:

| Screen/check | Evidence | Result | Notes |
| --- | --- | --- | --- |
| Parent reduced-motion control | `screenshots/motion_settings_latest_parent_reduced.png` | pass | Toggle, explanatory copy, sound controls, and input options fit at `1024x768`. |
| Reduced-motion key feedback | `screenshots/motion_settings_latest_reduced_key_feedback.png` | pass | Moving effects are removed while key state and static feedback remain. |
| Reduced-motion staff bridge | `screenshots/motion_settings_latest_staff_reduced.png` | pass | Jump guide and footprints remain as static route cues without continuous animation. |
| iPad portrait geometry audit | `screenshots/motion_settings_latest_ipad_portrait.png` | pass | Parent panel has no horizontal overflow; orientation guard was hidden by the test only for this layout screenshot. |
| Device preference | `screenshots/motion_settings_latest_system_reduced.png` | pass | System reduced-motion preference is shown as device-controlled and cannot be disabled in the app. |
| Cross-screen smoke | `screenshots/motion_322a/final_322a_*.png` | pass | Map, staff, and M01-M08 load without browser errors. |

Measured file state:

| File | Size |
| --- | ---: |
| `app.js` | 180,810 bytes |
| `index.html` | 34,179 bytes |
| `current-overhaul.css` | 41,157 bytes |
| `chrome-test/motion-settings-check.mjs` | 12,635 bytes |

Remaining risks:

- Real iPad testing is still required to confirm the OS setting, touch feel, visual comfort, and performance in Safari on physical hardware.
- This closes the code-level reduced-motion gap, not the whole accessibility program. Low-brightness readability, a full-screen 44px touch-target audit, VoiceOver semantics, and real-child comfort observation remain open.
- Static feedback is proven by DOM/style checks and screenshots, but children still need observation to confirm it is understandable without relying on continuous motion or adult explanation.

## 2026-07-10 - Overhaul 321a User-Approved A-G Note Palette

Build/version: `overhaul-321a`

Viewport: `1024x768` for palette, color-reduced, FG04, S01-mini, and clean-state checks; `1280x720` for the final map + staff + M01-M08 smoke.

Input route: touch/click on the on-screen keyboard; no microphone or MIDI required.

What changed:

- The runtime note colors now follow the user-supplied reference cycle: C `#CB84FA`, D `#FB9608`, E `#62C60C`, F `#CC338D`, G `#6F8FFE`, A `#F78ACD`, B `#11D19E`.
- Every level-part color literal now matches its note identity. `note-matrix-sync-audit.mjs` checks all seven palette rows plus the 38 level/staff targets.
- White keys show a stable note-colored lower edge and colored letter label while keeping the large solfege label dark for readability.
- A/B retain the current reserved/dimmed treatment, but their pink/teal edge remains visible so the seven-color cycle is consistent without making them current-course targets.
- `color-reduced` still replaces the seven colors with one gray-blue cue. A scripted FG04 run proves wrong C does not advance, then F-G completes without color as the answer.
- Only the color relationships were sampled from the user-provided screenshot. No third-party character, logo, wording, layout, or interaction asset is copied or included in the release bundle.
- This pass changes visual identity only. It does not change note/register targets, level order, staff positions, story meaning, reveal rules, mastery thresholds, sessions, or `played / stable / retained` semantics.

Run commands:

```powershell
npm run check:palette
npm run check:quick
npm run check:staff-mini
npm run check:clean-state
npm run check:bundle:strict
node tools/with-playwright-path.mjs chrome-test/visual-audit.mjs http://127.0.0.1:4173/ screenshots/palette_321a/final_321a
```

Automated results:

- `npm run check:palette`: `16` checks passed, `0` failed, including all seven colors, seven distinct key-edge cues, reserved A/B, color-reduced removal, wrong-input stability, and color-reduced FG04 completion.
- `npm run check:quick`: pass; syntax, note matrix/palette, copy integrity, audio contract, and prototype bundle policy passed.
- `npm run check:staff-mini`: `20` checks passed, `0` failed.
- `npm run check:clean-state`: `124` checks passed, `0` failed.
- `npm run check:bundle:strict`: pass with no temporary exception.
- Final Playwright smoke: map + staff + `M01-M08` rendered with `0` console warnings/errors and unchanged stage/keyboard geometry.

Evidence:

| Screen/check | Evidence | Result | Notes |
| --- | --- | --- | --- |
| Normal seven-color keyboard | `screenshots/note_palette_latest_normal.png` | pass | C-G edge colors match the reference cycle; reserved A/B retain visible pink/teal edges. |
| Color-reduced keyboard | `screenshots/note_palette_latest_reduced.png` | pass | All seven custom properties resolve to one gray-blue cue instead of seven answer colors. |
| Color-reduced completion | `screenshots/note_palette_latest_reduced_complete.png` | pass | Wrong C does not advance FG04; F then G completes the route. |
| FG04 visual flow | `screenshots/palette_321a/fg04_v2_after_first.png` | pass | F magenta and G blue are consistent across key edges, target card, locator, and route feedback. |
| S01-mini | `screenshots/staff_mini_latest_initial.png` | pass | Staff Do uses the new purple identity while the three-pad mini/session behavior is unchanged. |
| Cross-screen smoke | `screenshots/palette_321a/final_321a_*.png` | pass | Map, staff, and M01-M08 load without browser errors. |

Measured file state:

| File | Size |
| --- | ---: |
| `app.js` | 178,167 bytes |
| `index.html` | 33,488 bytes |
| `current-overhaul.css` | 36,986 bytes |
| `chrome-test/note-palette-check.mjs` | 5,377 bytes |
| `tools/note-matrix-sync-audit.mjs` | 7,141 bytes |

Remaining risks:

- Color is still a scaffold, not teaching proof. Real-child observation must confirm that children also use sound, key geometry, labels/solfege, and staff position.
- The sampled palette is approved for this prototype, but release branding/art still needs its own original visual review; the third-party reference screenshot must remain internal and unshipped.
- General short-session scheduling and later-session `retained` evidence remain unimplemented and unchanged.

## 2026-07-10 - Overhaul 320a Note-Priority Audio And Parent Comfort Controls

Build/version: `overhaul-320a`

Viewport: `1024x768` for parent audio-control and teaching-state checks; `1280x720` for the final map + staff + M01-M08 Playwright smoke.

Input route: touch/click on the on-screen keyboard; microphone and MIDI remain optional and were not required by this gate.

What changed:

- WebAudio now has separate `noteBus` and `effectBus` paths. The note bus stays at full mix priority while the effect bus is capped at `0.36` before the shared master/compressor.
- Parent settings add a persisted game-sound toggle and `0-70%` volume slider. The controls fit in the `1024x768` parent panel without horizontal overflow, and the input options use a denser two-column layout.
- `M03` listening prompts now play only the exact target piano frequency; the previous bell layer was removed so the modeled pitch is not masked.
- Correct feedback no longer replays target-related high notes. Correct, wrong, and black-key feedback now use quieter filtered-noise textures with no stable teaching pitch.
- The completion motif remains a reward-only C5-E5-G5-C6 shape, but all four notes route through the quieter effect bus.
- This pass changes audio playback/comfort UI only. It does not change note targets, level order, story meaning, reveal rules, mastery thresholds, session bundles, `played / stable / retained`, MIDI evidence, or microphone evidence.

Run commands:

```powershell
npm run check:audio
npm run check:audio-settings
npm run check:quick
npm run check:bundle:strict
npm run check:staff-mini
npm run check:clean-state
node tools/with-playwright-path.mjs chrome-test/visual-audit.mjs http://127.0.0.1:4173/ screenshots/audio_320a/final_320a
```

Automated results:

- `npm run check:audio`: `22` code-level frequency/mix contract checks passed, `0` failed. C4-G4 source frequencies stay within `0.1` cent of A4=440 equal temperament.
- `npm run check:audio-settings`: `13` browser checks passed, `0` failed, including toggle, 70% cap, local persistence, panel geometry, and console state.
- `npm run check:quick`: pass; syntax, note matrix, copy integrity, audio contract, and prototype bundle policy passed.
- `npm run check:bundle:strict`: pass with no temporary exception.
- `npm run check:staff-mini`: `20` checks passed, `0` failed.
- `npm run check:clean-state`: `124` checks passed, `0` failed.
- Final Playwright smoke: map + staff + `M01-M08` rendered with `0` console warnings/errors and unchanged stage/keyboard geometry.

Evidence:

| Screen/check | Evidence | Result | Notes |
| --- | --- | --- | --- |
| Parent audio settings | `screenshots/audio_settings_latest_parent.png` | pass | Toggle, slider, current percentage, microphone, MIDI, and touch fallback all fit in the 1024x768 parent panel. |
| Final cross-screen smoke | `screenshots/audio_320a/final_320a_*.png` | pass | Map, staff, and all eight C4-G4 levels retain the accepted `319a` child-facing layout. |
| Audio contract | `tools/audio-contract-audit.mjs` | pass | Verifies source frequencies, note/effect routing, M03 clean prompt, non-pitched retry/correct textures, reward-bus routing, and volume cap. |
| Audio settings interaction | `chrome-test/audio-settings-check.mjs` | pass | Verifies defaults, mute/re-enable, persistence across reload, 35% adjustment, geometry, and browser console. |

Measured file state:

| File | Size |
| --- | ---: |
| `app.js` | 178,068 bytes |
| `index.html` | 33,488 bytes |
| `current-overhaul.css` | 35,056 bytes |
| `tools/audio-contract-audit.mjs` | 4,017 bytes |
| `chrome-test/audio-settings-check.mjs` | 6,211 bytes |

Remaining risks:

- Frequency and mix checks are code-level evidence. They do not prove perceived loudness, timbre quality, headphone safety, or child comfort on a real iPad speaker.
- The correct/wrong textures still need adult listening review followed by observation with 3-5 children before they are treated as final release audio.
- General short-session scheduling and later-session `retained` evidence remain unimplemented and were not changed by this pass.

## 2026-07-10 - Overhaul 319a Safe CSS Convergence And Formal Regression

Build/version: `overhaul-319a`

Viewport: `1024x768` for the formal nine-screen comparison and scripted S01-mini/clean-state checks; `1280x720` for the final map + staff + M01-M08 Playwright smoke.

Input route: touch/click on the on-screen keyboard; no microphone or MIDI required.

What changed:

- The `318a` visual behavior was preserved while the `1,752,783` byte monolithic `quality-overrides.css` source was safely deduplicated, minified, and split into four production CSS files.
- The four files concatenate byte-for-byte to the validated safe candidate: `779,272` bytes, SHA-256 `361d01b075f03b276d965abd7a238885d752b9fa94977f0428faea9ecd75df49`.
- The safe pass preserves selector/at-rule context, shorthand/longhand boundaries, all five `@property` rules, and every unique keyframe name. Only ten duplicate same-name keyframe definitions were merged.
- `release-bundle-policy.json` now includes all four CSS segments with no temporary exception. Every segment is below the `250,000` byte strict per-file budget.
- State-cropped candidates that restored the central task card, exposed excess key labels, or weakened S01 hierarchy were rejected and were not promoted.
- This pass does not change C4-G4 targets, staff positions, level order, reveal rules, mastery thresholds, story meaning, MIDI/microphone behavior, Chapter 4-5 content, or the `played / stable / retained` contract.

Run commands:

```powershell
npm run check:staff-mini
npm run check:clean-state
npm run check:quick
npm run check:bundle:strict
node tools/with-playwright-path.mjs chrome-test/visual-audit.mjs http://127.0.0.1:4173/ screenshots/convergence_319a/final_319a
```

Automated results:

- `npm run check:staff-mini`: `20` checks passed, `0` failed.
- `npm run check:clean-state`: `124` checks passed, `0` failed.
- `npm run check:quick`: pass; syntax, note-matrix sync, copy integrity, and bundle policy passed.
- `npm run check:bundle:strict`: pass; the former CSS exception is gone.
- Final Playwright smoke: map + staff + `M01-M08` rendered with `0` console warnings/errors and stable stage/keyboard geometry.

Evidence:

| Screen/check | Evidence | Result | Notes |
| --- | --- | --- | --- |
| Formal staff + M01-M08 matrix | `screenshots/convergence_319a/formal_safe_319a_*.png` | pass | Nine formal screens preserve the accepted `318a` hierarchy and geometry. |
| Final cross-screen smoke | `screenshots/convergence_319a/final_319a_*.png` | pass | Map, staff, and all eight C4-G4 levels load without browser errors. |
| S01-mini | `screenshots/staff_mini_latest_*.png` | pass | The three-pad observation route still stops at its rest point and does not write full S01 mastery. |
| Clean-state teaching slice | `screenshots/clean_state_latest_*.png` | pass | Guided/played/stable states and reduced-cue answer hiding remain intact. |
| Pixel comparison | formal vs safe candidate and `318a` baseline | pass | Across the nine formal screens, only `0.2369%` of pixels differ from the safe candidate by more than four channel levels; differences are concentrated in animation/glow regions. Manual review of staff, M01, and M08 found no layout or hierarchy regression. |

Measured file state:

| File | Size |
| --- | ---: |
| `quality-overrides.css` | 219,558 bytes |
| `quality-overrides-2.css` | 219,954 bytes |
| `quality-overrides-3.css` | 219,303 bytes |
| `quality-overrides-4.css` | 120,457 bytes |
| Four-file override total | 779,272 bytes |
| `current-overhaul.css` | 31,415 bytes |
| `app.js` | 175,664 bytes |
| `index.html` | 32,527 bytes |

Remaining risks:

- `319a` is the current automated C4-G4/S01 regression baseline, not real-child teaching proof or release-grade final art/audio proof.
- The canonical 3-5 minute session map is a curriculum contract only; a general session scheduler and natural-rest resume flow are not implemented beyond `S01-mini`.
- `retained` is not stored or proven. Existing same-session `stable` records must not be migrated or described as long-term retention.
- The strict bundle gate now passes, but the remaining `779,272` bytes still contain historical visual ownership debt and need later semantic consolidation before native/release packaging.

## 2026-07-10 - Overhaul 318a S01 Dino Jump Path And Piano Proportion Pass

Build/version: `overhaul-318a`

Viewport: `1280x720` for manual in-app browser visual inspection; `1024x768` for scripted S01-mini and clean-state browser checks.

Input route: touch/click on on-screen keyboard; no microphone or MIDI required.

What changed:

- `index.html` now loads `overhaul-318a` CSS/JS query strings.
- `current-overhaul.css` adds a stronger S01 jump-path finish layer: the next-jump arc, small footprints, current landing pad, start/finish pads, and dino scale now read more like a physical jump action.
- Real-piano black keys are slightly shortened and visually lightened, with a staff-specific constraint so black keys do not dominate the white-key labels at taller viewports.
- This pass keeps C4-G4 scope and does not change target notes, staff positions, reveal rules, mastery rules, MIDI/microphone behavior, or Chapter 4-5 LP/TH content.

Run commands:

```powershell
npm run check:staff-mini
npm run check:clean-state
npm run check:quick
npm run check:bundle:strict
```

Automated results:

- `npm run check:staff-mini`: `20` checks passed, `0` failed.
- `npm run check:clean-state`: `124` checks passed, `0` failed.
- `npm run check:quick`: pass; syntax, note-matrix sync, copy integrity, and prototype bundle policy passed.
- `npm run check:bundle:strict`: expected fail because `quality-overrides.css` is `1,752,783` bytes, above the `250,000` byte strict CSS budget.

Evidence:

| Screen/check | Evidence | Result | Notes |
| --- | --- | --- | --- |
| S01-mini initial | `screenshots/staff_mini_latest_initial.png` | pass | Mini route still renders exactly three staff pads, with stronger jump-path/footprint direction and no horizontal overflow. |
| S01-mini wrong `Re/D` | `screenshots/staff_mini_latest_wrong_d.png` | pass | Wrong input still reveals the compact staff-position capsule and does not complete mini. |
| S01-mini result | `screenshots/staff_mini_latest_result.png` | pass | Mini still stops at the rest point and does not write full S01 mastery. |
| Clean-state teaching slice | `screenshots/clean_state_latest_M08_guided_initial.png`, `screenshots/clean_state_latest_FG03_guided_initial.png`, `screenshots/clean_state_latest_S01_check_initial.png`, `screenshots/clean_state_latest_S01_parent.png` | pass | Fresh storage run still separates introduced/played/stable parent states and keeps reduced-cue target glow hidden before action. |
| Manual visual inspection | `?mode=staff&check=visual-overhaul-318a-final`, `?level=M08&check=visual-overhaul-318a-after` | pass | S01 jump direction is more legible; M08 normal play keeps the true keyboard layout without visible overlap. |

Measured file state:

| File | Size |
| --- | ---: |
| `quality-overrides.css` | 1,752,783 bytes |
| `current-overhaul.css` | 31,415 bytes |
| `app.js` | 175,664 bytes |
| `index.html` | 32,308 bytes |

Remaining risks:

- This promotes `318a` as the current scripted teaching-state regression baseline, not as release-grade art.
- Real 4-6 child observation, audio pitch/volume proof, release asset ledger, and CSS consolidation remain open.
- CSS strict release remains blocked by `quality-overrides.css`.

## 2026-07-10 - Overhaul 317a Shared HUD, Staff-line, And Keyboard Finish Pass

Build/version: `overhaul-317a`

Viewport: `1280x720` for manual in-app browser visual inspection; `1024x768` for scripted S01-mini and clean-state browser checks.

Input route: touch/click on on-screen keyboard; no microphone or MIDI required.

What changed:

- `index.html` now loads `overhaul-317a` CSS/JS query strings.
- `current-overhaul.css` adds a shared current-screen finish layer for C4-G4 only.
- Top chrome now reads more like a game HUD: lighter glass header, smaller progress pills, and less heavy parent/dev buttons on both normal play and staff screens.
- Staff SVG line art is softened directly at the SVG layer, reducing the bright neon-tube look while keeping the one-to-two-measure bridge readable.
- The real-piano keyboard is visually quieter: reduced black-key glare/shadow, cleaner white-key borders, subtler target glow, and retained correct black-key geometry.
- The boot loader card is slightly smaller and less dominant.
- This pass does not change level order, target notes, reveal rules, mastery rules, MIDI/microphone behavior, or Chapter 4-5 LP/TH content.

Run commands:

```powershell
npm run check:staff-mini
npm run check:clean-state
npm run check:quick
npm run check:bundle:strict
```

Automated results:

- `npm run check:staff-mini`: `20` checks passed, `0` failed.
- `npm run check:clean-state`: `124` checks passed, `0` failed.
- `npm run check:quick`: pass; syntax, note-matrix sync, copy integrity, and prototype bundle policy passed.
- `npm run check:bundle:strict`: expected fail because `quality-overrides.css` is `1,752,783` bytes, above the `250,000` byte strict CSS budget.

Evidence:

| Screen/check | Evidence | Result | Notes |
| --- | --- | --- | --- |
| S01-mini initial | `screenshots/staff_mini_latest_initial.png` | pass | Staff HUD, softer SVG staff lines, current pad, and keyboard render without horizontal overflow. |
| S01-mini wrong `Re/D` | `screenshots/staff_mini_latest_wrong_d.png` | pass | Wrong-state recovery still shows the compact staff-position capsule and does not complete mini. |
| S01-mini result | `screenshots/staff_mini_latest_result.png` | pass | Mini still stops at the rest point and does not write full S01 mastery. |
| Clean-state teaching slice | `screenshots/clean_state_latest_M08_guided_initial.png`, `screenshots/clean_state_latest_FG03_guided_initial.png`, `screenshots/clean_state_latest_S01_check_initial.png`, `screenshots/clean_state_latest_S01_parent.png` | pass | Fresh storage run still separates introduced/played/stable parent states and keeps reduced-cue target glow hidden before action. |
| Manual visual inspection | `?mode=staff&check=visual-overhaul-317a-after2`, `?level=M08&check=visual-overhaul-317a-after` | pass | Staff bridge and M08 normal play both use the new HUD/keyboard finish layer without visible overlap. |

Measured file state:

| File | Size |
| --- | ---: |
| `quality-overrides.css` | 1,752,783 bytes |
| `current-overhaul.css` | 24,800 bytes |
| `app.js` | 175,664 bytes |
| `index.html` | 32,308 bytes |

Remaining risks:

- This promotes `317a` as the current scripted teaching-state regression baseline, not as release-grade art.
- The visual result is cleaner, but the product is still not finished until real-child observation, audio pitch/volume proof, release asset ledger, and CSS consolidation are done.
- CSS strict release remains blocked by `quality-overrides.css`.

## 2026-07-10 - Overhaul 316a Current C4-G4 CSS Convergence Pass

Build/version: `overhaul-316a`

Viewport: `1024x768` for scripted S01-mini and clean-state browser checks.

Input route: touch/click on on-screen keyboard; no microphone or MIDI required.

What changed:

- `index.html` now loads `overhaul-316a` CSS/JS query strings.
- `current-overhaul.css` starts a separate current-work convergence layer instead of continuing to grow `quality-overrides.css`.
- `release-bundle-policy.json` now includes `current-overhaul.css` in the prototype bundle source set.
- S01 staff-pad x positions were adjusted so the C-D-E-F-G bridge reads less crowded on the current 1024px tablet view.
- Staff-mode polish reduced noisy background/locator layers, kept the target/hint locator visible, strengthened staff-line readability, and reduced wrong-key burst coverage over the piano.
- This pass stays inside the current C4-G4 web prototype and does not implement Chapter 4-5 LP/TH content.

Run commands:

```powershell
npm run check:staff-mini
npm run check:clean-state
npm run check:quick
npm run check:bundle:strict
```

Automated results:

- `npm run check:staff-mini`: `20` checks passed, `0` failed.
- `npm run check:clean-state`: `124` checks passed, `0` failed.
- `npm run check:quick`: pass; syntax, note-matrix sync, copy integrity, and prototype bundle policy passed.
- `npm run check:bundle:strict`: expected fail because `quality-overrides.css` is `1,752,783` bytes, above the `250,000` byte strict CSS budget.

Evidence:

| Screen/check | Evidence | Result | Notes |
| --- | --- | --- | --- |
| S01-mini initial | `screenshots/staff_mini_latest_initial.png` | pass | Current `Do` pad is moved away from the left-side visual clutter; bridge pads read as a simpler short route. |
| S01-mini wrong `Re/D` | `screenshots/staff_mini_latest_wrong_d.png` | pass | Wrong-key feedback is smaller and no longer dominates the black-key area. |
| Clean-state teaching slice | `screenshots/clean_state_latest_M08_guided_initial.png`, `screenshots/clean_state_latest_FG03_guided_initial.png`, `screenshots/clean_state_latest_S01_check_initial.png`, `screenshots/clean_state_latest_S01_parent.png` | pass | Fresh storage run still separates introduced/played/stable parent states and keeps reduced-cue target glow hidden before action. |
| Bundle source set | `release-bundle-policy.json` | pass in prototype mode | `current-overhaul.css` is included; strict release still blocks on the old giant CSS file. |

Measured file state:

| File | Size |
| --- | ---: |
| `quality-overrides.css` | 1,752,783 bytes |
| `current-overhaul.css` | 10,960 bytes |
| `app.js` | 175,664 bytes |
| `index.html` | 32,308 bytes |

Remaining risks:

- This promotes `316a` as the current scripted teaching-state regression baseline, not as release-grade art.
- Real 4-6 child observation, audio pitch/volume proof, release asset ledger, and CSS consolidation remain open.
- CSS strict release remains blocked by `quality-overrides.css`.

## 2026-07-10 - Overhaul 315b S01 Landing-Pad Visual Gate

Build/version: `overhaul-315b`

Viewport: `1024x768` for scripted S01-mini and clean-state browser checks.

Input route: touch/click on on-screen keyboard; no microphone or MIDI required.

What changed:

- `index.html` now loads `overhaul-315b` CSS/JS query strings.
- `quality-overrides.css` adds a true terminal `315b` active-pad lock after the later `315a`/motion layers, so the current S01 `Do` pad keeps the intended hierarchy.
- Initial S01-mini hides the staff-position word on the current pad; wrong/reveal state shows it as a compact capsule below the pad.
- `chrome-test/staff-mini-observation-check.mjs` now includes active-pad visual assertions for hidden initial staff-position copy and compact wrong-state capsule.
- This pass stays inside the current C4-G4 web prototype and does not add later-course/story content.

Run commands:

```powershell
node --check .\chrome-test\staff-mini-observation-check.mjs
node --check .\tools\with-playwright-path.mjs
npm run check:staff-mini
npm run check:clean-state
npm run check:quick
npm run check:bundle:strict
```

Automated results:

- `node --check chrome-test/staff-mini-observation-check.mjs`: pass.
- `node --check tools/with-playwright-path.mjs`: pass.
- `npm run check:staff-mini`: `20` checks passed, `0` failed.
- `npm run check:clean-state`: `124` checks passed, `0` failed.
- `npm run check:quick`: pass; syntax, note-matrix sync, copy integrity, and prototype bundle policy passed.
- `npm run check:bundle:strict`: expected fail because `quality-overrides.css` is `1,752,783` bytes, above the `250,000` byte strict CSS budget.

Evidence:

| Screen/check | Evidence | Result | Notes |
| --- | --- | --- | --- |
| S01-mini initial | `screenshots/staff_mini_latest_initial.png` | pass | Current `Do` pad shows the note identity without the staff-position word competing on first view. |
| S01-mini wrong `Re/D` | `screenshots/staff_mini_latest_wrong_d.png` | pass | Wrong input keeps the route recoverable and shows the staff position as a compact repair capsule. |
| S01-mini result | `screenshots/staff_mini_latest_result.png` | pass | Completion opens the mini result, labels the rest point, and does not write full S01 mastery. |
| Clean-state teaching slice | `screenshots/clean_state_latest_M08_guided_initial.png`, `screenshots/clean_state_latest_FG03_guided_initial.png`, `screenshots/clean_state_latest_S01_check_initial.png`, `screenshots/clean_state_latest_S01_parent.png` | pass | Fresh storage run still separates introduced/played/stable parent states and keeps reduced-cue target glow hidden before action. |
| Note matrix and reserved targets | `npm run check:quick` | pass | C-G matrix, A/B reserved status, and level/staff targets are synced. |

Remaining risks:

- This promotes `315b` as the current scripted teaching-state regression baseline, not as release-grade art.
- Real 4-6 child observation, audio pitch/volume proof, release asset ledger, and CSS consolidation remain open.
- CSS strict release remains blocked by `quality-overrides.css`.

## 2026-07-10 - Overhaul 315a S01 Active Pad Polish And Harness Repair

Build/version: `overhaul-315a`

Viewport: `1024x768` for scripted S01-mini and clean-state browser checks.

Input route: touch/click on on-screen keyboard; no microphone or MIDI required.

What changed:

- At this run, `index.html` loaded `overhaul-315a` CSS/JS query strings.
- `quality-overrides.css` contains the current S01 active landing-pad polish layer: the active staff pad reads more like a physical glowing landing pad, with `Do` primary and `C` demoted.
- `tools/with-playwright-path.mjs` now resolves the bundled pnpm Playwright layout by adding `.pnpm/node_modules`, verifies both `playwright` and `playwright-core`, and falls back to installed Chrome/Edge through `CHROME_EXECUTABLE` when Playwright's downloaded browser is missing.
- This pass repairs the verification harness for the current C4-G4 web prototype. It does not add later-course content.

Run commands:

```powershell
node --check .\tools\with-playwright-path.mjs
npm run check:staff-mini
npm run check:clean-state
npm run check:quick
npm run check:bundle:strict
```

Automated results:

- `node --check tools/with-playwright-path.mjs`: pass.
- `npm run check:staff-mini`: `18` checks passed, `0` failed.
- `npm run check:clean-state`: `124` checks passed, `0` failed.
- `npm run check:quick`: pass; syntax, note-matrix sync, copy integrity, and prototype bundle policy passed.
- `npm run check:bundle:strict`: expected fail because `quality-overrides.css` is `1,745,124` bytes, above the `250,000` byte strict CSS budget.

Evidence:

| Screen/check | Evidence | Result | Notes |
| --- | --- | --- | --- |
| S01-mini initial | `screenshots/staff_mini_latest_initial.png` | pass | Mini session keeps only the first three pads and stays in the mini URL. |
| S01-mini wrong `Re/D` | `screenshots/staff_mini_latest_wrong_d.png` | pass | Wrong input remains recoverable and does not complete the mini route. |
| S01-mini result | `screenshots/staff_mini_latest_result.png` | pass | Completion opens the mini result, labels the rest point, and does not write full S01 mastery. |
| Clean-state teaching slice | `screenshots/clean_state_latest_M08_guided_initial.png`, `screenshots/clean_state_latest_FG03_guided_initial.png`, `screenshots/clean_state_latest_S01_check_initial.png`, `screenshots/clean_state_latest_S01_parent.png` | pass | Fresh storage run still separates introduced/played/stable parent states and keeps reduced-cue target glow hidden before action. |
| Note matrix and reserved targets | `npm run check:quick` | pass | C-G matrix, A/B reserved status, and level/staff targets are synced. |

Remaining risks:

- This promoted `315a` as the scripted teaching-state regression baseline at the time, not as release-grade art.
- Real 4-6 child observation, audio pitch/volume proof, release asset ledger, and CSS consolidation remain open.
- CSS strict release remains blocked by `quality-overrides.css`.

## 2026-07-10 - Overhaul 314a Boot Overlay Cleanup

Build/version: `overhaul-314a`

Viewport: `1024x768` for browser smoke; viewport reset after capture.

Input route: page load and touch-ready screen inspection; no microphone or MIDI required.

What changed:

- `styles.css` shortens the boot-loader fade transition from `360ms` to `160ms`.
- `app.js` releases the loader sooner: `is-done` after `80ms`, hidden after `300ms`.
- The boot card animation stops once the loader is done.
- `index.html` asset query version was bumped to `overhaul-314a`.
- Purpose: remove the semi-transparent central brand card that was still visible over M08/FG03/S01 during early screenshots and first-load perception.

Run commands:

```powershell
node --check .\app.js
node .\tools\copy-integrity-audit.mjs
node .\tools\production-bundle-audit.mjs
node .\tools\production-bundle-audit.mjs --strict
```

Automated results:

- `node --check app.js`: pass.
- `node tools/copy-integrity-audit.mjs`: pass; checked 9 publishable text/source files.
- `node tools/production-bundle-audit.mjs`: prototype policy pass with the known CSS-budget warning.
- `node tools/production-bundle-audit.mjs --strict`: expected fail because `quality-overrides.css` is `1,725,925` bytes, above the `250,000` byte strict CSS budget.

Browser smoke evidence:

| Screen/check | Evidence | Result | Notes |
| --- | --- | --- | --- |
| FG03 after early load | `screenshots/boot_cleanup_314a_FG03_250ms.png` | pass for boot overlay cleanup | At `250ms`, `bootLoader.hidden=true`, `display=none`, `opacity=0`; the central brand-card watermark is gone. |
| M08 after early load | `screenshots/boot_cleanup_314a_M08_250ms.png` | pass for boot overlay cleanup | At `250ms`, boot overlay is hidden and no longer covers the moon workshop scene. |
| S01-mini after early load | `screenshots/boot_cleanup_314a_S01_250ms.png` | pass for boot overlay cleanup | At `250ms`, boot overlay is hidden and no longer covers the staff bridge. |

Remaining risks:

- This is a first-load visual cleanup, not a validated teaching baseline.
- `overhaul-310a` remains the last clean-state parent-mastery baseline until current runtime S01-mini and clean-state checks pass.
- CSS strict release remains blocked by `quality-overrides.css`.

## 2026-07-10 - Overhaul 313a S01 Wrong-feedback Consolidation

Build/version: `overhaul-313a`

Viewport: `1024x768` for browser smoke; viewport reset after capture.

Input route: touch/click on on-screen keyboard; no microphone or MIDI required.

What changed:

- `quality-overrides.css` adds a final scoped `313a` staff-mode layer.
- Wrong S01 staff feedback is visually demoted from a text pill/card into a small repair puck, while the detailed text remains in DOM state.
- The main wrong-input teaching surfaces remain the stage event toast, target staff pad, keyboard target hint, locator cue, and dino stumble.
- Correct/good staff feedback remains the prior compact text signal.
- `index.html` asset query version was bumped to `overhaul-313a`.

Run commands:

```powershell
node --check .\app.js
node .\tools\copy-integrity-audit.mjs
node .\tools\production-bundle-audit.mjs
node .\tools\production-bundle-audit.mjs --strict
node .\chrome-test\staff-mini-observation-check.mjs http://127.0.0.1:4173/ screenshots/staff_feedback_313a_staff_mini
node .\chrome-test\clean-state-slice-check.mjs http://127.0.0.1:4173/ screenshots/staff_feedback_313a_clean_state
```

Automated results:

- `node --check app.js`: pass.
- `node tools/copy-integrity-audit.mjs`: pass; checked 9 publishable text/source files.
- `node tools/production-bundle-audit.mjs`: prototype policy pass with the known CSS-budget warning.
- `node tools/production-bundle-audit.mjs --strict`: expected fail because `quality-overrides.css` is `1,725,925` bytes, above the `250,000` byte strict CSS budget.
- `staff-mini-observation-check.mjs`: not run successfully in this shell; first attempt could not resolve `playwright`, and the bundled dependency path then failed on missing `playwright-core`.
- `clean-state-slice-check.mjs`: not run successfully for the same `playwright` / `playwright-core` dependency issue.

Browser smoke evidence:

| Screen/check | Evidence | Result | Notes |
| --- | --- | --- | --- |
| S01-mini initial | `screenshots/staff_feedback_313a_initial.png` | partial pass | Runtime loads `overhaul-313a`; no staff feedback or toast is present before input. |
| S01-mini wrong `Re/D` | `screenshots/staff_feedback_313a_wrong_180.png`, `screenshots/staff_feedback_313a_wrong_540.png` | partial pass | Right-bottom wrong feedback is now a `44x44` repair puck with hidden visual text; stage toast still says the repair action, and the target pad/key/locator cue remain visible. |
| S01-mini correct `Do/C` after wrong | `screenshots/staff_feedback_313a_correct_200.png`, `screenshots/staff_feedback_313a_after_correct.png` | partial pass | Correct feedback and next `Re/D` pad still work; the `good` staff feedback remains compact text and was not demoted by the wrong-only CSS. |

Remaining risks:

- This is a visual smoke pass, not the validated teaching baseline.
- `overhaul-310a` remains the last clean-state parent-mastery baseline until the Playwright dependency issue is resolved and `staff-mini-observation-check.mjs` plus `clean-state-slice-check.mjs` pass for the current runtime.
- Wrong-state feedback is less scattered, but this still needs real-child observation to prove attention goes to the bridge/pad/key rather than adult-readable labels.
- `quality-overrides.css` grew again and remains release-blocking prototype debt.

## 2026-07-10 - Overhaul 312a S01 Staff Chrome And Dino Speech Polish

Build/version: `overhaul-312a`

Viewport: `1024x768`

Input route: touch/click on on-screen keyboard; no microphone or MIDI required.

What changed:

- `quality-overrides.css` adds a final scoped `312a` S01 visual polish layer.
- Staff-mode top chrome is quieter: the progress-number rail is hidden, the title/buttons are smaller, and the staff scene gets more vertical room.
- The dino action hint is now a warm speech bubble instead of a dark pill label when the dino is not stumbling.
- Wrong/stumble feedback keeps the `311d` wrong halo instead of being overwritten by the new speech bubble.
- Staff line glow is slightly reduced so the bridge reads less like bright UI rails.
- `index.html` asset query version was bumped to `overhaul-312a`.

Run commands:

```powershell
node --check .\app.js
node .\tools\copy-integrity-audit.mjs
node .\tools\production-bundle-audit.mjs
node .\tools\production-bundle-audit.mjs --strict
```

Automated results:

- `node --check app.js`: pass.
- `node tools/copy-integrity-audit.mjs`: pass; checked 9 publishable text/source files.
- `node tools/production-bundle-audit.mjs`: prototype policy pass with the known CSS-budget warning.
- `node tools/production-bundle-audit.mjs --strict`: expected fail because `quality-overrides.css` is `1,721,682` bytes, above the `250,000` byte strict CSS budget.

Browser smoke evidence:

| Screen/check | Evidence | Result | Notes |
| --- | --- | --- | --- |
| S01-mini initial after polish | `screenshots/staff_polish_312a_initial.png` | partial pass | Top chrome is quieter, the progress-number rail no longer competes with the staff bridge, the staff stage grows from roughly `439px` to `459px`, and the dino tip is a warm speech bubble. |
| S01-mini wrong `Re/D` | `screenshots/staff_polish_312a_wrong_180.png`, `screenshots/staff_polish_312a_wrong_540.png` | partial pass | Wrong key, target key, current staff pad, and wrong halo remain visible. Feedback is still somewhat distributed across multiple repair surfaces, so this is not release-grade. |
| S01-mini correct `Do/C` | `screenshots/staff_polish_312a_correct_180.png`, `screenshots/staff_polish_312a_after_correct.png` | partial pass | Dino jump, first-pad landing, next `Re` pad, and speech bubble survive the chrome/bubble changes. |

Remaining risks:

- This is a visual smoke pass, not the validated teaching baseline.
- `overhaul-310a` remains the last clean-state parent-mastery baseline until `staff-mini-observation-check.mjs` and `clean-state-slice-check.mjs` are rerun for the current runtime.
- Wrong-state repair still exposes several simultaneous feedback surfaces; a later pass should consolidate the repair signal without weakening teaching.
- `quality-overrides.css` grew again and remains release-blocking prototype debt.

## 2026-07-10 - Overhaul 310a S01 Staff Bridge Stage Polish

Build/version: `overhaul-310a`

Viewport: `1024x768`

Input route: touch/click on on-screen keyboard; no microphone or MIDI required.

What changed:

- `quality-overrides.css` adds a scoped `310a` S01 stage polish layer.
- The S01 bridge keeps the same note positions, reveal rules, keyboard target visibility, and mastery logic.
- The visual pass tones down rectangular/instrument-panel bridge elements, adds a softer playable star-route layer, and makes start/landing/finish hierarchy more physical.
- `index.html` asset query version was bumped to `overhaul-310a`.

Run commands:

```powershell
$env:NODE_PATH='C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules;C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules\.pnpm\node_modules'
$env:CHROME_EXECUTABLE='C:\Program Files\Google\Chrome\Application\chrome.exe'
node --check .\app.js
node .\chrome-test\staff-mini-observation-check.mjs http://127.0.0.1:4173/ screenshots/s01_stage_310a_tuned
node .\chrome-test\clean-state-slice-check.mjs http://127.0.0.1:4173/ screenshots/clean_state_310a
node .\tools\copy-integrity-audit.mjs
node .\tools\production-bundle-audit.mjs
node .\tools\production-bundle-audit.mjs --strict
```

Automated results:

- `node --check app.js`: pass.
- `staff-mini-observation-check.mjs`: `18` checks passed, `0` failed.
- `clean-state-slice-check.mjs`: `124` checks passed, `0` failed.
- `node tools/copy-integrity-audit.mjs`: pass; checked 9 publishable text/source files.
- `node tools/production-bundle-audit.mjs`: prototype policy pass with the known CSS-budget warning.
- `node tools/production-bundle-audit.mjs --strict`: expected fail because `quality-overrides.css` is `1,678,659` bytes, above the `250,000` byte strict CSS budget.

Evidence:

| Screen/check | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `S01-mini` stage polish | `screenshots/s01_stage_310a_tuned_initial.png`, `screenshots/s01_stage_310a_tuned_wrong_d.png`, `screenshots/s01_stage_310a_tuned_result.png` | pass | Mini route still stops at the rest point, and the bridge route reads less like a grey UI progress bar after the tuning pass. |
| `S01` guided/check slice | `screenshots/clean_state_310a_S01_guided_initial.png`, `screenshots/clean_state_310a_S01_guided_wrong.png`, `screenshots/clean_state_310a_S01_check_initial.png`, `screenshots/clean_state_310a_S01_check_result.png` | pass | Guided, wrong, and reduced-cue check states remain readable; check mode still starts without strong target-key glow. |
| Cross-screen clean-state slice | `screenshots/clean_state_310a_M08_guided_initial.png`, `screenshots/clean_state_310a_FG03_guided_initial.png`, `screenshots/clean_state_310a_S01_parent.png` | pass | The S01-only CSS pass did not break M08, FG03, or parent stable-state separation. |

Remaining risks:

- This is a visual-stage polish pass, not final art direction.
- The staff bridge is cleaner but still not release-grade; real child observation is still missing.
- `quality-overrides.css` grew again and remains release-blocking prototype debt.

## 2026-07-10 - Overhaul 309a Planning Scope And Platform-copy Tightening

Build/version: `overhaul-309a`

Viewport: `1024x768`

Input route: touch/click on on-screen keyboard; no microphone or MIDI required. Static planning/copy edits also included.

What changed:

- `15_ACCEPTANCE_GATES.md` now separates the core product proof slice (`M01`, `M03`, `M08`, `FG03`, `S01`) from full-course smoke coverage (`M01-M08`, `FG01-FG04`, `S01`).
- `M02` is explicitly kept as the direct C/D/E geography level and full-course smoke screen, without expanding the core product proof slice by accident.
- `23_TEACHING_PROOF_MATRIX.md` now treats one real-child observation as a directional signal only; low-age usability claims require 3-5 observed 4-6 children.
- `16_ASSET_MANIFEST.md` now lists current WebAudio sources that must be reconciled before release-level audio claims.
- MIDI-unavailable copy now says to use screen keys first and frames microphone as optional试听.
- `index.html` asset query version was bumped to `overhaul-309a`.

Run commands:

```powershell
$env:NODE_PATH='C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules;C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules\.pnpm\node_modules'
$env:CHROME_EXECUTABLE='C:\Program Files\Google\Chrome\Application\chrome.exe'
node --check .\app.js
node .\chrome-test\staff-mini-observation-check.mjs http://127.0.0.1:4173/ screenshots/planning_scope_309a_staff_mini
node .\chrome-test\clean-state-slice-check.mjs http://127.0.0.1:4173/ screenshots/planning_scope_309a_clean_state
node .\tools\copy-integrity-audit.mjs
node .\tools\production-bundle-audit.mjs
node .\tools\production-bundle-audit.mjs --strict
```

Automated results:

- `node --check app.js`: pass.
- `staff-mini-observation-check.mjs`: `18` checks passed, `0` failed.
- `clean-state-slice-check.mjs`: `124` checks passed, `0` failed.
- `node tools/copy-integrity-audit.mjs`: pass; checked 9 publishable text/source files.
- `node tools/production-bundle-audit.mjs`: prototype policy pass with the known CSS-budget warning.
- `node tools/production-bundle-audit.mjs --strict`: expected fail because `quality-overrides.css` is `1,669,064` bytes, above the `250,000` byte strict CSS budget.

Evidence:

| Screen/check | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `S01-mini` observation route | `screenshots/planning_scope_309a_staff_mini_initial.png`, `screenshots/planning_scope_309a_staff_mini_wrong_d.png`, `screenshots/planning_scope_309a_staff_mini_result.png` | pass | The preschool observation route still stops at the mini rest point and does not write full S01 mastery. |
| Clean-state teaching slice | `screenshots/planning_scope_309a_clean_state_M08_guided_initial.png`, `screenshots/planning_scope_309a_clean_state_FG03_guided_initial.png`, `screenshots/planning_scope_309a_clean_state_S01_check_initial.png`, `screenshots/planning_scope_309a_clean_state_S01_parent.png` | pass | The teaching-state baseline still separated played/introduced/stable parent states after the planning and platform-copy pass. |

Remaining risks:

- This pass improves planning and copy guardrails, not visual polish.
- Real 4-6 child observation is still missing.
- Audio proof is still missing beyond WebAudio implementation inventory.
- `quality-overrides.css` remains release-blocking prototype debt.

## 2026-07-10 - Overhaul 308a Keyboard Hierarchy Polish

Build/version: `overhaul-308a`

Viewport: `1024x768`

Input route: touch/click on on-screen keyboard; no microphone or MIDI required.

Run commands:

```powershell
$env:NODE_PATH='C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules;C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules\.pnpm\node_modules'
$env:CHROME_EXECUTABLE='C:\Program Files\Google\Chrome\Application\chrome.exe'
node --check .\app.js
node .\chrome-test\staff-mini-observation-check.mjs http://127.0.0.1:4173/ screenshots/s01_keyboard_hierarchy_308a
node .\chrome-test\clean-state-slice-check.mjs http://127.0.0.1:4173/ screenshots/clean_state_308a
node .\tools\copy-integrity-audit.mjs
node .\tools\production-bundle-audit.mjs
node .\tools\production-bundle-audit.mjs --strict
```

Automated results:

- `node --check app.js`: pass.
- `staff-mini-observation-check.mjs`: `18` checks passed, `0` failed.
- `clean-state-slice-check.mjs`: `124` checks passed, `0` failed.
- `node tools/copy-integrity-audit.mjs`: pass; checked 9 publishable text/source files.
- `node tools/production-bundle-audit.mjs`: prototype policy pass with the known CSS-budget warning.
- `node tools/production-bundle-audit.mjs --strict`: expected fail because `quality-overrides.css` is `1,669,064` bytes, above the `250,000` byte strict CSS budget.

Screens checked:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `S01-mini` keyboard hierarchy | `screenshots/s01_keyboard_hierarchy_308a_initial.png`, `screenshots/s01_keyboard_hierarchy_308a_wrong_d.png`, `screenshots/s01_keyboard_hierarchy_308a_result.png` | pass | The staff observation route still works while the piano key labels sit lower, the black-key locator becomes secondary, and the target cue no longer reads as a large floating card. |
| `M08` guided keyboard | `screenshots/clean_state_308a_M08_guided_initial.png` | pass | Multi-note roof route keeps a cleaner real-piano key hierarchy; black keys no longer visually collide with the `Do/Re/Mi/Fa/Sol` labels. |
| `FG03` guided keyboard | `screenshots/clean_state_308a_FG03_guided_initial.png` | pass | E/F/G comparison keeps the keyboard readable with lower note labels and quieter per-key locator graphics. |
| Clean-state teaching slice | `screenshots/clean_state_308a_S01_check_initial.png`, `screenshots/clean_state_308a_S01_parent.png` | pass | The full scripted teaching baseline still separates introduced/played/stable parent states after the keyboard hierarchy CSS pass. |

Remaining risks:

- This improves one high-impact rough UI layer, but it is still a CSS polish pass rather than release-grade art, audio, or real-child comprehension proof.
- The next S01 proof should still involve real 4-6 child observation; passing `S01-mini` automation is not enough to claim low-age usability.
- `quality-overrides.css` grew to `1,669,064` bytes and remains release-blocking prototype debt.

## 2026-07-10 - Overhaul 307a S01 Bridge Rail Polish

Build/version: `overhaul-307a`

Viewport: `1024x768`

Input route: touch/click on on-screen keyboard; no microphone or MIDI required.

Run commands:

```powershell
$env:NODE_PATH='C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules;C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules\.pnpm\node_modules'
$env:CHROME_EXECUTABLE='C:\Program Files\Google\Chrome\Application\chrome.exe'
node .\chrome-test\staff-mini-observation-check.mjs http://127.0.0.1:4173/ screenshots/s01_bridge_rail_307a_fix2
node .\chrome-test\clean-state-slice-check.mjs http://127.0.0.1:4173/ screenshots/clean_state_307a_fix2
```

Automated results:

- `staff-mini-observation-check.mjs`: `18` checks passed, `0` failed.
- `clean-state-slice-check.mjs`: `124` checks passed, `0` failed.
- `node tools/production-bundle-audit.mjs`: pass with the known `quality-overrides.css` CSS-budget warning.
- `node tools/copy-integrity-audit.mjs`: pass; checked 9 publishable text/source files.

Screens checked:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `S01-mini` initial bridge rail | `screenshots/s01_bridge_rail_307a_fix2_initial.png` | pass | A soft rail/landing-pad glow helps the three staff pads read more like one short star bridge; the current `Do` pad remains centered and unobscured after opacity and layer fixes. |
| `S01-mini` wrong and completion flow | `screenshots/s01_bridge_rail_307a_fix2_wrong_d.png`, `screenshots/s01_bridge_rail_307a_fix2_result.png` | pass | Wrong input remains recoverable, completion still opens `staff-mini`, and no full S01 mastery stats are written. |
| Clean-state teaching slice | `screenshots/clean_state_307a_fix2_S01_check_initial.png`, `screenshots/clean_state_307a_fix2_S01_parent.png` | pass | The full clean-state baseline still separates introduced/played/stable parent states after the bridge-rail CSS pass. |

Remaining risks:

- This is a narrow S01 bridge-readability polish pass, not a full art, audio, or real-child usability pass.
- The rail is intentionally subtle; S01 still needs more physical dino motion, landing ripple, and child-observation proof before it can be called release-grade.
- `quality-overrides.css` is `1,657,903` bytes and remains release-blocking prototype debt.

## 2026-07-10 - Overhaul 306b Copy Integrity Gate

Build/version: `overhaul-306b`

Input route: static text/source audit; no browser, microphone, or MIDI required.

Run commands:

```powershell
node --check .\tools\copy-integrity-audit.mjs
node .\tools\copy-integrity-audit.mjs
```

Automated results:

- `node --check tools/copy-integrity-audit.mjs`: pass.
- `node tools/copy-integrity-audit.mjs`: pass; checked 9 publishable text/source files.

What this gate covers:

- common mojibake tokens in publishable app text;
- unfinished placeholder copy in visible source surfaces;
- old protected-IP terms such as Ultraman/Tiga/Dyna/M78 in publishable text.

Remaining risks:

- This is a source/text gate, not a real-child copy comprehension test.
- It does not replace screenshot review for whether short labels are actually understandable to a 4-6-year-old.
- CSS debt, audio proof, and real-child observation remain open.

## 2026-07-10 - Overhaul 306a Tactile Piano-Key Pass

Build/version: `overhaul-306a`

Viewport: `1024x768`

Input route: touch/click on on-screen keyboard; no microphone or MIDI required.

Run commands:

```powershell
node --check .\app.js
node --check .\tools\production-bundle-audit.mjs
node .\tools\production-bundle-audit.mjs
node .\tools\production-bundle-audit.mjs --strict
$env:NODE_PATH='C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules;C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules\.pnpm\node_modules'
$env:CHROME_EXECUTABLE='C:\Program Files\Google\Chrome\Application\chrome.exe'
node .\chrome-test\staff-mini-observation-check.mjs http://127.0.0.1:4173/ screenshots/s01_mini_keyboard_306a
node .\chrome-test\clean-state-slice-check.mjs http://127.0.0.1:4173/ screenshots/clean_state_306a
```

Automated results:

- `node --check app.js`: pass.
- `node --check tools/production-bundle-audit.mjs`: pass.
- `node tools/production-bundle-audit.mjs`: pass with the known `quality-overrides.css` CSS-budget warning.
- `node tools/production-bundle-audit.mjs --strict`: expected fail on `quality-overrides.css` being `1,653,418` bytes, above the `250,000` byte CSS budget.
- `staff-mini-observation-check.mjs`: `18` checks passed, `0` failed.
- `clean-state-slice-check.mjs`: `124` checks passed, `0` failed.

Screens checked:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `S01-mini` initial tactile keyboard | `screenshots/s01_mini_keyboard_306a_initial.png` | pass | White and black keys read more like a physical piano surface; staff-mode target hiding remains intact. |
| `S01-mini` wrong and completion flow | `screenshots/s01_mini_keyboard_306a_wrong_d.png`, `screenshots/s01_mini_keyboard_306a_result.png` | pass | Wrong input remains recoverable, completion still opens `staff-mini`, and no full S01 mastery stats are written. |
| White-key press state | `screenshots/s01_mini_keyboard_306a_white_pressed.png` | pass | Pressed white key shows clear downward motion and depth without shifting the keyboard layout. |
| Black-key press state | `screenshots/s01_mini_keyboard_306a_black_pressed.png` | pass | Pressed black key shows depth and remains aligned with the real piano geometry. |
| Clean-state teaching slice | `screenshots/clean_state_306a_S01_check_initial.png`, `screenshots/clean_state_306a_S01_parent.png` | pass | The full clean-state baseline still separates played/introduced/stable parent states after the tactile-key CSS pass. |

Remaining risks:

- This is a tactile keyboard polish pass, not a full art, audio, or real-child usability pass.
- `quality-overrides.css` grew to `1,653,418` bytes and remains release-blocking prototype debt.
- A synthetic pointer event attempt during exploratory checking produced a pointer-capture page error because it was not a real pointer. The verified mouse-based press screenshots and automated runs were clean.

## 2026-07-10 - Overhaul 305a S01 Active Pad And Helper Compass Polish

Build/version: `overhaul-305a`

Viewport: `1024x768`

Input route: touch/click on on-screen keyboard; no microphone or MIDI required.

Run commands:

```powershell
node --check .\app.js
node --check .\tools\production-bundle-audit.mjs
node .\tools\production-bundle-audit.mjs
node .\tools\production-bundle-audit.mjs --strict
$env:NODE_PATH='C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules;C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules\.pnpm\node_modules'
$env:CHROME_EXECUTABLE='C:\Program Files\Google\Chrome\Application\chrome.exe'
node .\chrome-test\staff-mini-observation-check.mjs http://127.0.0.1:4173/ screenshots/s01_mini_pad_compass_305a_pinfix2
```

Automated results:

- `node --check app.js`: pass.
- `node --check tools/production-bundle-audit.mjs`: pass.
- `node tools/production-bundle-audit.mjs`: pass with the known `quality-overrides.css` CSS-budget warning.
- `node tools/production-bundle-audit.mjs --strict`: expected fail on `quality-overrides.css` being `1,646,692` bytes, above the `250,000` byte CSS budget.
- `staff-mini-observation-check.mjs`: `18` checks passed, `0` failed.

Screens checked:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `S01-mini` initial active pad | `screenshots/s01_mini_pad_compass_305a_pinfix2_initial.png` | pass | Current `Do` staff pad reads more like a glowing jump pad; the black-key locator is smaller and secondary; duplicate red pin artifact is removed. |
| `S01-mini` wrong and completion flow | `screenshots/s01_mini_pad_compass_305a_pinfix2_wrong_d.png`, `screenshots/s01_mini_pad_compass_305a_pinfix2_result.png` | pass | Wrong input remains recoverable, completion still opens `staff-mini`, and no full S01 mastery stats are written. |

Remaining risks:

- This improves one rough S01 visual layer, but it is not a full S01 art pass.
- The interface still needs real 4-6 child observation to prove the visual hierarchy works without adult reading.
- `quality-overrides.css` grew again and remains release-blocking prototype debt.

## 2026-07-10 - Overhaul 304a Runtime Reference Audit And Staff Top Chrome

Build/version: `overhaul-304a`

Viewport: `1024x768`

Input route: touch/click on on-screen keyboard; no microphone or MIDI required.

Run commands:

```powershell
rg -n "assets/generated" .\styles.css .\play-overrides.css .\map-overrides.css .\staff-overrides.css .\quality-overrides.css .\index.html .\manifest.webmanifest .\app.js
node --check .\tools\production-bundle-audit.mjs
node .\tools\production-bundle-audit.mjs
node .\tools\production-bundle-audit.mjs --strict
node --check .\app.js
$env:NODE_PATH='C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules;C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules\.pnpm\node_modules'
$env:CHROME_EXECUTABLE='C:\Program Files\Google\Chrome\Application\chrome.exe'
node .\chrome-test\staff-mini-observation-check.mjs http://127.0.0.1:4173/ screenshots/s01_mini_topchrome_304a
```

Automated results:

- publishable CSS/HTML/manifest/app references to `assets/generated`: pass; no matches outside `release-bundle-policy.json` deny rules.
- `node --check tools/production-bundle-audit.mjs`: pass.
- `node tools/production-bundle-audit.mjs`: pass with the known `quality-overrides.css` CSS-budget warning.
- `node tools/production-bundle-audit.mjs --strict`: expected fail on `quality-overrides.css` being `1,640,894` bytes, above the `250,000` byte CSS budget.
- `node --check app.js`: pass.
- `staff-mini-observation-check.mjs`: `18` checks passed, `0` failed.

Screens checked:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `S01-mini` initial after top chrome cleanup | `screenshots/s01_mini_topchrome_304a_initial.png` | pass | Staff-mode top chrome is shorter and quieter; bridge and keyboard keep priority; no horizontal overflow. |
| `S01-mini` wrong and completion flow | `screenshots/s01_mini_topchrome_304a_wrong_d.png`, `screenshots/s01_mini_topchrome_304a_result.png` | pass | Wrong input remains recoverable, completion still opens `staff-mini`, and no full S01 mastery stats are written. |

Changes checked:

| Item | Result | Notes |
| --- | --- | --- |
| CSS runtime references | pass | Old CSS references to `assets/generated` were switched to `assets/runtime` WebP/PNG equivalents. |
| Audit coverage | pass | `production-bundle-audit.mjs` now scans included text files, including CSS, for forbidden release references instead of only `index.html`, `manifest.webmanifest`, and `app.js`. |
| Staff top chrome | pass for this narrow polish slice | Staff mode now uses a shorter top row and smaller controls so the child-facing bridge area feels less like a debug/workbench screen. |

Remaining risks:

- This does not solve the broader CSS debt; `quality-overrides.css` is still far above the release budget.
- This is visual and packaging cleanup, not real-child usability proof.
- Audio ledger, sound-off/reduced-motion gates, asset approval rows, and full release art polish remain open.

## 2026-07-10 - Production Bundle Guardrail Seed

Build/version: `overhaul-303a` source state plus bundle-policy guardrail.

Input route: static file audit; no browser, microphone, or MIDI required.

Run commands:

```powershell
node --check .\tools\production-bundle-audit.mjs
node .\tools\production-bundle-audit.mjs
node .\tools\production-bundle-audit.mjs --strict
node --check .\app.js
```

Automated results:

- `node --check tools/production-bundle-audit.mjs`: pass.
- `node tools/production-bundle-audit.mjs`: pass with one intentional warning for `quality-overrides.css`.
- `node tools/production-bundle-audit.mjs --strict`: expected fail on `quality-overrides.css` being `1,638,630` bytes, above the `250,000` byte CSS budget.
- `node --check app.js`: pass.

Changes checked:

| Item | Result | Notes |
| --- | --- | --- |
| Runtime icon path | pass | `index.html` and `manifest.webmanifest` now use `assets/runtime/app-icon.png` instead of `assets/generated/app-icon.png`. |
| Runtime asset group | pass | `assets/runtime` is now `23` files and `1,367,001` bytes after adding a 512px PNG app/touch icon. |
| Publishable-source policy | pass for prototype | `release-bundle-policy.json` allowlists runtime/app source files and denies `assets/generated`, `screenshots`, `chrome-test`, root screenshot/contact sheets, and historical root planning files. |
| Release strictness | fail as intended | Strict release remains blocked by CSS debt until `quality-overrides.css` is consolidated or deliberately re-approved. |

Remaining risks:

- This guardrail prevents accidental packaging drift, but it does not make the app visually release-ready.
- CSS cleanup, asset source/license rows, audio ledger, comfort gates, and real-child observation remain open.

## 2026-07-10 - Overhaul 303a S01-mini Preschool Observation Mode

Build/version: `overhaul-303a`

Viewport: `1024x768`

Input route: touch/click on on-screen keyboard; no microphone or MIDI required.

Run commands:

```powershell
$env:NODE_PATH='C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules;C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules\.pnpm\node_modules'
$env:CHROME_EXECUTABLE='C:\Program Files\Google\Chrome\Application\chrome.exe'
node .\chrome-test\staff-mini-observation-check.mjs http://127.0.0.1:4173/ screenshots/s01_mini_303a
node .\chrome-test\clean-state-slice-check.mjs http://127.0.0.1:4173/ screenshots/clean_state_303a
```

Automated results:

- `staff-mini-observation-check.mjs`: `18` checks passed, `0` failed.
- `clean-state-slice-check.mjs`: `124` checks passed, `0` failed.
- `node --check app.js`, `node --check chrome-test/staff-mini-observation-check.mjs`, and `node --check chrome-test/clean-state-slice-check.mjs` passed.

Screens checked:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `S01-mini` initial | `screenshots/s01_mini_303a_initial.png` | pass | `?mode=staff&session=mini` renders exactly three staff pads, marks one mini rest pad, keeps URL/session data as `mini`, and uses `S01·短` with observation copy. |
| `S01-mini` wrong `Re/D` | `screenshots/s01_mini_303a_wrong_d.png` | pass | Wrong input does not complete the route, keeps three pads, and remains recoverable without changing the formal S01 path. |
| `S01-mini` completion | `screenshots/s01_mini_303a_result.png` | pass | Completing `C-D-E` opens `staff-mini` result, labels the rest point, leaves the dinosaur at `mini-rest`, keeps `session=mini`, does not auto-enter `staff-check`, and does not write `learningStats.staff.S01`. |
| Full clean-state slice after mini change | `screenshots/clean_state_303a_*.png` | pass | Formal `M01`, `M03`, `M08`, `FG01-FG04`, and full `S01` still pass the `302a` baseline: guided S01 opens `staff-check`, reduced-cue starts hide target glow, and check completion records parent `谱桥稳定`. |

Technical notes:

- `index.html` asset/cache query version is `overhaul-303a`.
- `app.js` size is `175,644` bytes.
- `quality-overrides.css` size is `1,638,630` bytes.

Remaining risks:

- `S01-mini` is now implemented, but it is only an observation tool. It does not replace a real 4-6 child observation and must not be counted as full S01 mastery.
- The audio ledger, sound-off/reduced-motion gates, asset approval ledger, and CSS cleanup are still open release-readiness gaps.

## 2026-07-10 - Overhaul 302a Clean-State Teaching Slice Automation

Build/version: app assets still load `overhaul-301a`; new verification script is `chrome-test/clean-state-slice-check.mjs`.

Viewport: `1024x768`

Input route: touch/click on on-screen keyboard; no microphone or MIDI required.

Run command:

```powershell
$env:NODE_PATH='C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules;C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules\.pnpm\node_modules'
$env:CHROME_EXECUTABLE='C:\Program Files\Google\Chrome\Application\chrome.exe'
node .\chrome-test\clean-state-slice-check.mjs http://127.0.0.1:4173/ screenshots/clean_state_302a
```

Automated result: `124` checks passed, `0` failed. Browser console warning/error list was empty.

Clean-state setup:

- cleared `starDinoCompletedLevels`;
- cleared `starDinoLearningStats`;
- started from `M01` with a fresh Playwright browser context.

Screens checked:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `M01` first exposure | `screenshots/clean_state_302a_M01_initial.png`, `screenshots/clean_state_302a_M01_result.png`, `screenshots/clean_state_302a_M01_parent.png` | pass | Completing M01 stores played-once progress; parent status returns `已见过 Do/C`, not stable mastery. |
| `M03` touch-only listening, first pass | `screenshots/clean_state_302a_M03_first_initial.png`, `screenshots/clean_state_302a_M03_first_result.png`, `screenshots/clean_state_302a_M03_first_parent.png` | pass | Initial `Re/D` and second `Do/C` answers both start with `keyboardTargetVisible=false`; parent status after one clean pass is `听音玩过`. |
| `M03` touch-only listening, second pass | `screenshots/clean_state_302a_M03_second_initial.png`, `screenshots/clean_state_302a_M03_second_result.png`, `screenshots/clean_state_302a_M03_second_parent.png` | pass | Second clean pass changes parent status to `听音稳定`; no microphone or MIDI evidence is counted. |
| `M08` five-note roof route | `screenshots/clean_state_302a_M08_guided_initial.png`, `screenshots/clean_state_302a_M08_guided_result.png`, `screenshots/clean_state_302a_M08_check_initial.png`, `screenshots/clean_state_302a_M08_check_result.png`, `screenshots/clean_state_302a_M08_parent.png` | pass | Guided completion opens `level-check`; check start has `keyboardTargetVisible=false`; parent status after clean check is `稳定掌握`. |
| `FG01-FG04` F/G prep | `screenshots/clean_state_302a_FG01_parent.png`, `screenshots/clean_state_302a_FG02_parent.png`, `screenshots/clean_state_302a_FG03_parent.png`, `screenshots/clean_state_302a_FG04_parent.png` | pass | Each F/G prep level completes guided run, auto enters reduced-cue check, then records parent `稳定掌握`, allowing S01 entry without bypassing readiness. |
| `S01` staff bridge | `screenshots/clean_state_302a_S01_guided_initial.png`, `screenshots/clean_state_302a_S01_guided_wrong.png`, `screenshots/clean_state_302a_S01_guided_result.png`, `screenshots/clean_state_302a_S01_check_initial.png`, `screenshots/clean_state_302a_S01_check_result.png`, `screenshots/clean_state_302a_S01_parent.png` | pass | Guided wrong `Re/D` is recoverable; guided completion opens `staff-check`; check start has `keyboardTargetVisible=false`; clean check completion sets parent status to `谱桥稳定` and focus to `星桥 C-G 谱位 · 已稳定`. |

Additional automated checks:

- every captured state checked visible text for mojibake-like corruption;
- every captured state checked horizontal overflow and key container offscreen bounds;
- `M03`, `M08`, `FG01-FG04`, and `S01` reduced-cue starts all verified target-key glow is absent before action where expected;
- `node --check app.js` and `node --check chrome-test/clean-state-slice-check.mjs` passed before the run.

Remaining risks:

- This is a strong scripted proof of the teaching-state machine, but not a real-child usability observation.
- This run does not replace no-reading/color-reduced audits; it complements them with clean-state mastery evidence.
- The audio ledger, sound-off/reduced-motion gates, asset approval ledger, and CSS cleanup are still open release-readiness gaps.

## 2026-07-10 - Overhaul 301a S01 Stage Toast As Bridge Event

Build/version: `overhaul-301a`

Viewport: `1024x768`

Input route: touch/click on on-screen keyboard; no microphone or MIDI required.

Fresh origins:

- `http://127.0.0.1:4173/?mode=staff&check=s01-toast-301a-initial`
- `http://127.0.0.1:4173/?mode=staff&check=s01-toast-301a-correct`
- `http://127.0.0.1:4173/?mode=staff&audit=no-reading&check=s01-toast-301a-no-reading`

Screens checked:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `S01` initial, no toast | `screenshots/overhaul_301a_S01_toast_initial_1024.png` | pass | Initial state has no stage toast, dino tip remains `跳亮垫`, and versioned assets load `overhaul-301a`. |
| `S01` wrong `Re/D` toast | `screenshots/overhaul_301a_S01_toast_wrong_1024.png` | pass | Ordinary wrong toast is now a compact bridge event: `Do / 看落点 / 亮垫 Do`, about `157x58`. Detailed repair remains in the compact bridge signal: `Re/D -> Do/C · 下方小线 · 2黑左`. |
| `S01` correct `Do/C` toast | `screenshots/overhaul_301a_S01_toast_correct_1024.png` | pass | Ordinary correct toast is now `Do / 落稳 / 下一跳 Re`, about `166x58`. Next-note key identity remains in the staff note card and visual locator. |
| `S01` no-reading wrong `Re/D` toast | `screenshots/overhaul_301a_S01_toast_no_reading_wrong_1024.png` | pass | No-reading toast still uses the visual path with no `.staff-toast-copy`; visible text is only the note badge/locator graphic output. Dino bubble remains hidden. |

Technical checks:

- `node --check app.js` passed.
- `index.html` asset/cache query version is `overhaul-301a`.
- `app.js` size is `171,065` bytes.
- `quality-overrides.css` size is `1,637,285` bytes.
- Browser console warning/error logs were empty.
- Browser DOM checks found no horizontal or vertical overflow in initial, wrong, correct, or no-reading wrong states at `1024x768`.

Remaining risks:

- This makes the S01 stage toast less like an answer card, but it is still screenshot/DOM proof rather than child usability proof.
- The S01 visual language still needs real-child observation to prove that the child acts from bridge motion, pad highlights, key geometry, and sound rather than adult-readable labels.
- CSS debt grew again and remains release-blocking until consolidated.

## 2026-07-10 - Overhaul 300a S01 Action-Led Dino Hint

Build/version: `overhaul-300a`

Viewport: `1024x768`

Input route: touch/click on on-screen keyboard; no microphone or MIDI required.

Fresh origins:

- `http://127.0.0.1:4173/?mode=staff&check=s01-hierarchy-300a-initial-reshoot`
- `http://127.0.0.1:4173/?mode=staff&check=s01-hierarchy-300a-initial`
- `http://127.0.0.1:4173/?mode=staff&audit=no-reading&check=s01-hierarchy-300a-no-reading`

Screens checked:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `S01` initial hint hierarchy | `screenshots/overhaul_300a_S01_hint_initial_1024.png` | pass | Dino bubble now says only `跳亮垫`; `#dinoHint` also says `跳亮垫`. Exact `Do/C · 下方小线 · 2黑左` identity remains on the staff note card, visual locator, and keyboard. Initial screenshot was re-captured after the boot loader was hidden. |
| `S01` wrong `Re/D` hierarchy | `screenshots/overhaul_300a_S01_hint_wrong_1024.png` | pass | Dino bubble changes to `看落点` with `data-tip-tone="wrong"`. Detailed repair stays in the toast, compact bridge signal, visual cue, and target key; no overflow appears. |
| `S01` correct `Do/C` hierarchy | `screenshots/overhaul_300a_S01_hint_correct_1024.png` | pass | Dino bubble changes to `下一跳` with `data-tip-tone="correct"`. The next note identity remains on the staff note card and locator cue instead of being duplicated in the dino bubble. |
| `S01` no-reading wrong `Re/D` hierarchy | `screenshots/overhaul_300a_S01_hint_no_reading_wrong_1024.png` | pass | In `audit=no-reading`, the dino bubble pseudo-element remains hidden and `#dinoHint` remains transparent. The screen still shows the staff pad, visual locator, wrong key, and compact bridge signal. |

Technical checks:

- `node --check app.js` passed.
- `index.html` asset/cache query version is `overhaul-300a`.
- `app.js` size is `171,009` bytes.
- `quality-overrides.css` size is `1,633,940` bytes.
- Browser console warning/error logs were empty.
- Browser DOM checks found no horizontal or vertical overflow in initial, wrong, correct, or no-reading wrong states at `1024x768`.

Remaining risks:

- This improves S01 hint hierarchy but remains screenshot/DOM proof, not child usability proof.
- The stage toast still carries the detailed teaching identity after wrong/correct input; that is intentional for this pass, but the next broad S01 polish should keep checking that it does not compete with the staff bridge.
- CSS debt grew again and remains a release-level cleanup requirement.

## 2026-07-10 - Overhaul 299a S01 Compact Bridge Feedback Signal

Build/version: `overhaul-299a`

Viewport: `1024x768`

Input route: touch/click on on-screen keyboard; no microphone or MIDI required.

Fresh origins:

- `http://127.0.0.1:4173/?mode=staff&check=s01-feedback-299a-wrong`
- `http://127.0.0.1:4173/?mode=staff&check=s01-feedback-299a-correct`
- `http://127.0.0.1:4173/?mode=staff&audit=no-reading&check=s01-feedback-299a-no-reading`

Screens checked:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `S01` wrong `Re/D` feedback | `screenshots/overhaul_299a_S01_feedback_wrong_1024.png` | pass | Bottom/right feedback is now a compact bridge signal. Feedback chip is about `215x31`, text is shortened to `Re/D -> Do/C · 下方小线 · 2黑左`, and no overflow appears. |
| `S01` correct `Do/C` feedback | `screenshots/overhaul_299a_S01_feedback_correct_1024.png` | pass | Correct feedback is a compact event chain `Do/C · 下方小线 -> 线下面`; chip is about `180x31`, and the staff bridge plus keyboard remain visible. |
| `S01` no-reading wrong feedback | `screenshots/overhaul_299a_S01_feedback_no_reading_wrong_1024.png` | pass | In `audit=no-reading`, the bottom signal keeps only the icon-sized affordance visible; the text is transparent and compressed to `36px` width. |

Technical checks:

- `node --check app.js` passed.
- `index.html` asset/cache query version is `overhaul-299a`.
- `app.js` size is `171,007` bytes.
- `quality-overrides.css` size is `1,630,860` bytes.
- Browser DOM checks found no horizontal or vertical overflow in wrong, correct, or no-reading wrong states at `1024x768`.

Remaining risks:

- This removes one visible S01 card-like feedback artifact, but it is still screenshot/DOM proof rather than child usability proof.
- The white dino speech bubble can still feel label-like; the next S01 visual pass should unify dino bubble, stage toast, and staff visual cue so there is one obvious child-facing hint hierarchy.
- CSS debt grew again and must be consolidated before release-level polish.

## 2026-07-10 - Overhaul 298a S01 Adaptive F/G Support

Build/version: `overhaul-298a`

Viewport: `1024x768`

Input route: touch/click on on-screen keyboard; no microphone or MIDI required.

Fresh origins:

- `http://127.0.0.1:4173/?mode=staff&audit=color-reduced&check=s01-298a-stable-fg`
- `http://127.0.0.1:4173/?mode=staff&audit=color-reduced&check=s01-298a-weak-fg`
- `http://127.0.0.1:4173/?mode=staff&audit=color-reduced&check=s01-298a-weak-fg-check`

Screens checked:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `S01` stable F/G prep reaches `Fa/F` | `screenshots/overhaul_298a_S01_stable_F_no_support_1024.png` | pass | After `C-D-E`, the current `Fa/F` pad does not show the extra F/G support marker when stored F/G prep is already stable. |
| `S01` weak F/G prep reaches `Fa/F` | `screenshots/overhaul_298a_S01_weak_F_support_1024.png` | pass | After `C-D-E`, the current `Fa/F` pad shows the adaptive F/G mini-support cue from weak prep, without turning the whole task into a strong target-key glow. |
| `S01` weak F/G prep in `staff-check` | `screenshots/overhaul_298a_S01_weak_F_support_check_1024.png` | pass | Check mode preserves the reduced-cue rule: F/G support marker is visible, but `keyboardTargetVisible=false` before action. |

Technical checks:

- `node --check app.js` passed.
- `index.html` asset/cache query version is `overhaul-298a`.
- `app.js` size is `171,087` bytes.
- `quality-overrides.css` size is `1,627,329` bytes.
- Current implementation adds `staffFgSupportInfo()`, `data-fg-support`, `.fg-support`, `.staff-fg-support-mark`, and `.staff-cue-fg-support`.

Remaining risks:

- This is adaptive scaffold evidence, not real 4-6 child usability proof.
- The S01 bottom/right green feedback area still reads too much like an explanatory UI card and should be a next visual polish target.
- `quality-overrides.css` grew again and remains release-blocking prototype debt.

## 2026-07-10 - Overhaul 297b M08 Physical Roof Lock And Compact Correct Signal

Build/version: `overhaul-297b`

Viewport: `1024x768`

Input route: touch/click on on-screen keyboard; no microphone or MIDI required.

Fresh origin:

- `http://127.0.0.1:4173/?level=M08&audit=color-reduced&check=m08-297b-roof-confirm`

Screens checked:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `M08` color-reduced initial | `screenshots/overhaul_297b_M08_roof_confirm_initial_1024.png` | pass | `app.js?v=overhaul-297b`; route rect about `579x199`; current node is `Do/C -> 2黑左`; no overflow. |
| `M08` correct `Do` early lock | `screenshots/overhaul_297b_M08_roof_confirm_after_do_early_1024.png` | pass | First node enters `done just-locked`, route state `just-locked`; roof animation is `roofPieceLock297`, lock studs animate, and second node becomes current `Re/D -> 2黑中`. The correct toast is now a compact in-scene confirmation around `142x50`, not the previous wide white card. |
| `M08` correct `Do` settled | `screenshots/overhaul_297b_M08_roof_confirm_after_do_settled_1024.png` | pass | After the lock timer, first node becomes ordinary `done`; `just-locked` is no longer persistent. Lock studs remain visible as a completed roof-piece state. |
| `M08` guided completion to reduced-cue replay | `screenshots/overhaul_297b_M08_roof_confirm_completion_wait_1024.png` | pass | A paced `C-D-E-F-G` touch run auto-enters `level-check`; badge is `M08·复`; `keyboardTargetVisible=false`; current route reads `Do/C -> 自己找`; future pads show only order markers. |
| `M08` reduced-cue wrong `Re/D` | `screenshots/overhaul_297b_M08_roof_confirm_check_wrong_D_1024.png` | pass | Wrong input reveals `Do/C -> 2黑左`, changes `keyboardTargetVisible` to `true`, marks the wrong Re key, and keeps repair feedback as a compact in-scene route signal around `244x58`. |

Technical checks:

- `node --check app.js` passed.
- `index.html` asset/cache query version is `overhaul-297b`.
- `app.js` size is `169,439` bytes.
- `quality-overrides.css` size is `1,622,494` bytes.
- Initial/after-correct/check-wrong DOM checks found no horizontal or vertical overflow at `1024x768`.
- Browser warning/error logs were empty in the checked wrong state.

Remaining risks:

- This is a M08 interaction-polish proof, not real 4-6 child usability proof.
- M08 now feels more physical than `296c`, but the whole product still needs clean-state parent mastery and real-child observation before calling the teaching slice mature.
- `quality-overrides.css` grew again and remains release-blocking prototype debt.

## 2026-07-10 - Overhaul 296c M08 Roof Route Title-Signal Polish

Build/version: `overhaul-296c`

Viewport: `1024x768`

Input route: touch/click on on-screen keyboard; no microphone or MIDI required.

Fresh origin:

- `http://127.0.0.1:4173/?level=M08&audit=color-reduced&check=m08-296c-title-signal`

Screens checked:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `M08` color-reduced initial | `screenshots/overhaul_296c_M08_roof_route_initial_1024.png` | pass for title-signal polish | The old route title text remains in the DOM for structure, but the visible title is reduced to a small roof-piece plus arrow scene signal. The main route still reads as the foreground roof-building path. No overflow found. |
| `M08` reduced-cue initial | `screenshots/overhaul_296c_M08_roof_route_check_initial_1024.png` | pass | `levelRunMode=check`, `scaffold=level-check`, `keyboardTargetVisible=false`; current route is `Do/C -> 自己找`, future pads show only order markers. |
| `M08` reduced-cue wrong `Re/D` | `screenshots/overhaul_296c_M08_roof_route_check_wrong_D_1024.png` | pass | Wrong input reveals `Do/C -> 2黑左` through the route tile, target key, and compact route repair signal. |

Technical checks:

- `node --check app.js` passed.
- `index.html` asset/cache query version is `overhaul-296c`.
- `quality-overrides.css` size is `1,610,833` bytes.
- Initial DOM: script version `app.js?v=overhaul-296c`; route title text still exists as `屋顶梯 从低到高盖上`, while `small` and `strong` are visually clipped to `1px`.
- Initial route rect is about `579x199`; no horizontal or vertical overflow found.
- Check initial DOM: `levelRunMode=check`, `scaffold=level-check`, `keyboardTargetVisible=false`, current route text `Do/C 自己找`, no overflow.
- Check wrong DOM: `toastClass="stage-input-toast toast-wrong toast-route-repair"`, `hasToastLocator=true`, `keyboardTargetVisible=true`, no overflow.
- Browser warning/error logs were empty in checked states.

Remaining risks:

- This is a visual polish improvement over 296b, not proof that a 4-6-year-old can infer the roof task without reading.
- M08 still needs motion polish: roof pieces should physically land/lock so the path feels like a toy action, not only a static route.
- `quality-overrides.css` remains far above the release CSS budget and must be cleaned before release-level polish.

## 2026-07-10 - Overhaul 296b M08 Roof Route Foreground Polish

Build/version: `overhaul-296b`

Viewport: `1024x768`

Input route: touch/click on on-screen keyboard; no microphone or MIDI required.

Fresh origin:

- `http://127.0.0.1:4173/?level=M08&audit=color-reduced&check=m08-296b-route`

Screens checked:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `M08` color-reduced initial | `screenshots/overhaul_296b_M08_roof_route_initial_1024.png` | pass for route readability | The foreground roof route is larger and lower in the scene than 296a: route rect is about `579x199` at `1024x768`, current node is about `108x118`, and the current `Do/C -> 2黑左` tile reads as a physical roof step. No overflow found. |
| `M08` guided wrong `Re/D` | `screenshots/overhaul_296b_M08_roof_route_wrong_D_1024.png` | pass | Wrong input keeps the enlarged roof route visible and uses the compact in-scene repair signal with target solfege badge and black-key locator mini-map. |
| `M08` guided completion to reduced-cue replay | `screenshots/overhaul_296b_M08_roof_route_check_initial_1024.png` | pass | A clean paced `C-D-E-F-G` touch run auto-routes into `level-check`; `keyboardTargetVisible=false`; current route reads `Do/C -> 自己找`; future pads show `2`, `3`, `4`, and `5`. |
| `M08` reduced-cue wrong `Re/D` | `screenshots/overhaul_296b_M08_roof_route_check_wrong_D_1024.png` | pass | In `level-check`, wrong `Re/D` reveals `Do/C -> 2黑左` through the current route tile, target key, and route repair signal. |

Technical checks:

- `node --check app.js` passed.
- `index.html` asset/cache query version is `overhaul-296b`.
- Initial DOM: `levelRunMode=guided`, `scaffold=medium`, `keyboardTargetVisible=true`, route visible, route rect about `579x199`, no overflow.
- Check initial DOM: `levelRunMode=check`, `scaffold=level-check`, `keyboardTargetVisible=false`, route text contains `Do/C 自己找 2 Re 3 Mi 4 Fa 5 Sol`, no overflow.
- Check wrong DOM: `toastClass="stage-input-toast toast-wrong toast-route-repair"`, `hasToastLocator=true`, `keyboardTargetVisible=true`, no overflow.
- Browser warning/error logs were empty in the final checked state.

Remaining risks:

- The M08 route is less card-like and more game-like than 296a, but the small title pill still feels like UI copy. A later pass should let dino motion and roof-piece animation carry more of the instruction.
- This remains screenshot/DOM evidence, not real 4-6 child usability.
- `quality-overrides.css` grew to about 1.61 MB, so CSS cleanup is still a release-level blocker.

## 2026-07-10 - Overhaul 295a M07/FG03 Route Repair Toast Polish

Build/version: `overhaul-295a`

Viewport: `1024x768`

Input route: touch/click on on-screen keyboard; no microphone or MIDI required.

Fresh origins:

- `http://127.0.0.1:4173/?level=M07&audit=color-reduced&check=route-toast-295a-M07`
- `http://127.0.0.1:4173/?level=FG03&audit=color-reduced&check=route-toast-295a-FG03`
- `http://route-m07-295a.lvh.me:4173/?level=M07&audit=color-reduced&check=route-toast-295a-check-M07`
- `http://route-fg03-295a.lvh.me:4173/?level=FG03&audit=color-reduced&check=route-toast-295a-check-FG03-b`

Screens checked:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `M07` color-reduced wrong `Re/D` | `screenshots/overhaul_295a_M07_route_repair_wrong_D_1024.png` | pass for repair-card polish | The old white wrong-input card is replaced by a smaller dark in-scene route signal. It includes the target solfege badge, a repair gesture, a black-key locator mini-map, and compact copy. No overflow found. |
| `FG03` color-reduced wrong `Re/D` | `screenshots/overhaul_295a_FG03_route_repair_wrong_D_1024.png` | pass for repair-card polish | FG03 uses the same scene-level repair signal instead of a floating white instruction card. Target-key repair remains visible only after the wrong input. |
| `M07` reduced-cue wrong `Re/D` | `screenshots/overhaul_295a_M07_route_repair_check_wrong_D_1024.png` | pass | In `level-check`, future pads still show only `2`, `3`, `4`, and `5`; wrong `Re/D` reveals `Do/C -> 2黑左` through the route, target key, and repair signal. |
| `FG03` reduced-cue wrong `Re/D` | `screenshots/overhaul_295a_FG03_route_repair_check_wrong_D_1024.png` | pass | In `level-check`, future pads still show only `2` and `3`; wrong `Re/D` reveals `Mi/E -> 2黑右` through the route, target key, and repair signal. |

Technical checks:

- `node --check app.js` passed.
- `index.html` asset/cache query version is `overhaul-295a`.
- M07 guided wrong DOM: `toastClass="stage-input-toast toast-wrong toast-route-repair"`, `hasVisual=true`, `hasLocator=true`, `keyboardTargetVisible=true`, no overflow.
- FG03 guided wrong DOM: `toastClass="stage-input-toast toast-wrong toast-route-repair"`, `hasVisual=true`, `hasLocator=true`, `keyboardTargetVisible=true`, no overflow.
- M07 check wrong DOM: `levelRunMode=check`, `scaffold=level-check`, future labels `2/3/4/5`, `hasVisual=true`, `hasLocator=true`, no overflow.
- FG03 check wrong DOM: `levelRunMode=check`, `scaffold=level-check`, future labels `2/3`, `hasVisual=true`, `hasLocator=true`, no overflow.
- Browser warning/error logs were empty in the final checked state.

Remaining risks:

- This removes the most obvious white-card repair artifact for M07/FG03 route levels, but it is still screenshot/DOM evidence, not real 4-6 child usability.
- M08 shares the same route-repair toast style by scope, but this pass captured M07 and FG03 only. M08's broader roof-route glow still needs later art tuning.
- The next proof gap remains broader clean-state parent mastery plus real-child no-reading observation.

## 2026-07-10 - Overhaul 294b M07 Memory String Reduced-Cue Replay

Build/version: `overhaul-294b`

Viewport: `1024x768`

Input route: touch/click on on-screen keyboard; no microphone or MIDI required.

Fresh origins:

- `http://127.0.0.1:4173/?level=M07&audit=color-reduced&check=m07-294b-route`
- `http://127.0.0.1:4173/?level=M07&audit=color-reduced&check=m07-294b-route-full`

Screens checked:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `M07` color-reduced memory-route initial | `screenshots/overhaul_294b_M07_color_reduced_initial_1024.png` | pass for visual simplification | M07 now uses a foreground five-star memory string for `Do-Re-Mi-Re-Do`. The duplicated story ribbon, target card, stage note orb, and coach overlay are visually suppressed so the route and keyboard carry the task. `keyboardTargetVisible=false`; no overflow found. |
| `M07` color-reduced wrong `Re/D` | `screenshots/overhaul_294b_M07_color_reduced_wrong_D_1024.png` | pass | Wrong input keeps the memory string visible, marks `Re/D` as wrong, and reveals `Do/C -> 2黑左` through the route, feedback, and target-key hint. |
| `M07` guided completion to reduced-cue replay | `screenshots/overhaul_294b_M07_color_reduced_auto_check_1024.png` | pass | A paced touch run through `C-D-E-D-C` auto-routes into `level-check`; `keyboardTargetVisible=false`; current route reads `Do/C 自己找`; future pads show only `2`, `3`, `4`, and `5`, not the answer sequence. |
| `M07` reduced-cue wrong `Re/D` | `screenshots/overhaul_294b_M07_color_reduced_check_wrong_D_1024.png` | pass | In `level-check`, wrong `Re/D` changes `keyboardTargetVisible` from `false` to `true`, target key gets `target hint`, wrong key gets `hit-wrong`, and current route changes from `自己找` to `2黑左`. |

Technical checks:

- `node --check app.js` passed.
- `index.html` asset/cache query version is `overhaul-294b`.
- M07 initial DOM: `levelRunMode=guided`, `scaffold=light`, `keyboardTargetVisible=false`, five `.memory-route-node` elements visible, and `.memory-route-dino` visible.
- M07 reduced-cue check DOM: `levelRunMode=check`, `scaffold=level-check`, `keyboardTargetVisible=false`, future route labels `2`, `3`, `4`, and `5`.
- M07 reduced-cue wrong state: `keyboardTargetVisible=true`, `targetKeyClasses="key white-key target hint"`, `wrongKeyClasses="key white-key hit hit-wrong wrong"`.
- No browser warning/error logs and no horizontal or vertical overflow found at `1024x768` in the checked states.

Remaining risks:

- This proves the current M07 color-reduced/reduced-cue replay slice, but it is still screenshot/DOM evidence, not real 4-6 child usability.
- This run still showed a UI-card-like repair card; `overhaul-295a` later mitigates this for M07 with an in-scene route repair signal.
- With M07, M08, FG03, and S01 now covered by current color-reduced/reduced-cue evidence, the next proof gap is broader clean-state parent mastery and real child observation.

## 2026-07-10 - Overhaul 293b FG03 Star Route Reduced-Cue Replay

Build/version: `overhaul-293b`

Viewport: `1024x768`

Input route: touch/click on on-screen keyboard; no microphone or MIDI required.

Fresh origins:

- `http://127.0.0.1:4173/?level=FG03&audit=color-reduced&check=fg03-293b-route`
- `http://127.0.0.1:4173/?level=FG03&audit=color-reduced&check=fg03-293b-route-full`

Screens checked:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `FG03` color-reduced initial | `screenshots/overhaul_293b_FG03_color_reduced_initial_1024.png` | pass for visual simplification | FG03 now uses the three foreground star pads as the main play surface. The duplicated left story ribbon, right target card, stage note orb, and coach overlay are hidden for this level. Route title reads `三颗星 / 排成梯`; no overflow found. |
| `FG03` color-reduced wrong `Re/D` | `screenshots/overhaul_293b_FG03_color_reduced_wrong_D_1024.png` | pass | Wrong input keeps the route visible, marks `Re/D` as wrong, and reveals `Mi/E -> 2黑右` through the route, feedback, and target-key hint. |
| `FG03` guided completion to reduced-cue replay | `screenshots/overhaul_293b_FG03_color_reduced_auto_check_1024.png` | pass | A paced touch run through `Mi-Fa-Sol` auto-routes into `level-check`; `keyboardTargetVisible=false`; current route reads `Mi/E 自己找`; future pads show only `2` and `3`, not `Fa/Sol`. |
| `FG03` reduced-cue wrong `Re/D` | `screenshots/overhaul_293b_FG03_color_reduced_check_wrong_D_1024.png` | pass | In `level-check`, wrong `Re/D` changes `keyboardTargetVisible` from `false` to `true`, target key gets `target hint`, wrong key gets `hit-wrong`, and current route changes from `自己找` to `2黑右`. |

Technical checks:

- `node --check app.js` passed.
- `index.html` asset/cache query version is `overhaul-293b`.
- FG03 initial DOM: `levelRunMode=guided`, `scaffold=light`, `keyboardTargetVisible=false`, `storyRibbonDisplay=none`.
- FG03 reduced-cue check DOM: `levelRunMode=check`, `scaffold=level-check`, `keyboardTargetVisible=false`, future route labels `2` and `3`.
- FG03 reduced-cue wrong state: `keyboardTargetVisible=true`, `targetKeyClasses="key white-key target hint"`, `wrongKeyClasses="key white-key hit hit-wrong wrong"`.
- No horizontal or vertical overflow found at `1024x768` in the checked initial, auto-check, and wrong states.

Remaining risks:

- This proves the current FG03 color-reduced/reduced-cue replay slice, but it is still screenshot/DOM evidence, not real 4-6 child usability.
- This run still showed a UI-card-like repair card; `overhaul-295a` later mitigates this for FG03 with an in-scene route repair signal.
- `M07` remains the main non-S01 color-reduced/reduced-cue gap.

## 2026-07-10 - Overhaul 292b M08 Roof Route And Reduced-Cue Replay

Build/version: `overhaul-292b`

Viewport: `1024x768`

Input route: touch/click on on-screen keyboard; no microphone or MIDI required.

Fresh origins:

- `http://m08-292b-route.lvh.me:4173/?level=M08&audit=color-reduced&check=m08-292b-route`
- `http://m08-292b-fullroute2.lvh.me:4173/?level=M08&audit=color-reduced&check=m08-292b-fullroute2`

Screens checked:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `M08` color-reduced roof-route initial | `screenshots/overhaul_292b_M08_roof_route_color_reduced_initial_1024.png` | pass for visual simplification | M08 now uses a foreground roof-scale route with five physical C-D-E-F-G roof pads; old floating roof slots are hidden. The duplicated right-side target card, stage note orb, and coach overlay are visually suppressed so the route and keyboard carry the target. |
| `M08` color-reduced wrong `Re/D` | `screenshots/overhaul_292b_M08_roof_route_color_reduced_wrong_D_1024.png` | pass | Wrong input keeps the route visible, marks `Re/D` as wrong, and reveals `Do/C -> 2黑左` through the route, feedback, and target-key hint. No overflow found. |
| `M08` guided completion to reduced-cue replay | `screenshots/overhaul_292b_M08_roof_route_color_reduced_auto_check_1024.png` | pass | A correctly paced touch run through `C-D-E-F-G` auto-routes into `level-check`; `keyboardTargetVisible=false`; route current state reads `Do/C 自己找`. |
| `M08` reduced-cue wrong `Re/D` | `screenshots/overhaul_292b_M08_roof_route_color_reduced_check_wrong_D_1024.png` | pass | In `level-check`, wrong `Re/D` changes `keyboardTargetVisible` from `false` to `true`, target key gets `target hint`, wrong key gets `hit-wrong`, and route current state changes from `自己找` to `2黑左`. |

Technical checks:

- `node --check app.js` passed before the CSS/version bump.
- `index.html` asset/cache query version is `overhaul-292b`.
- M08 DOM after full guided run: `levelRunMode=check`, `scaffold=level-check`, `keyboardTargetVisible=false`, `roofCurrent=Do/C 自己找`.
- M08 reduced-cue wrong state: `levelRunMode=check`, `keyboardTargetVisible=true`, `targetKeyClasses="key white-key target hint"`, `wrongKeyClasses="key white-key hit hit-wrong"`.
- No horizontal or vertical overflow found at `1024x768` in the checked initial, auto-check, and wrong states.

Remaining risks:

- M08 is clearer than the previous floating-roof-block version, but the broad diagonal route glow still needs a later art pass so it reads less like a screen overlay and more like an in-world roof path.
- This proves one non-S01 build/prep reduced-cue replay. `M07` and `FG03` still need current color-reduced/reduced-cue proof before broad mastery claims.
- Real 4-6-year-old usability is still not proven; no-reading/color-reduced screenshots remain audit evidence, not child observation.

## 2026-07-10 - Overhaul 291b S01 Color-Reduced Completion And Parent Summary Repair

Build/version: `overhaul-291b`

Viewport: `1024x768`

Input route: touch/click on on-screen keyboard; no microphone or MIDI required.

Fresh origin: `http://s01-291b-fullcolor.lvh.me:4173/?mode=staff&audit=color-reduced&check=s01-291b-fullcolor`

Screens checked:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `S01` color-reduced initial | `screenshots/overhaul_291b_S01_color_reduced_initial_1024.png` | pass | Fresh color-reduced staff run loads `app.js?v=overhaul-291b`, starts at `S01`, and has no overflow. |
| `S01` guided completion modal | `screenshots/overhaul_291b_S01_color_reduced_guided_complete_modal_1024.png` | pass | First guided run completes and routes to `S01 · 少提示复读`, not stable mastery. |
| `S01` color-reduced check initial | `screenshots/overhaul_291b_S01_color_reduced_check_initial_1024.png` | pass | Check replay starts with `S01·复`, `staff-check`, and `targetVisible=false`; parent summary says the whole `C-G` bridge is in reduced-cue replay. |
| `S01` color-reduced check completion | `screenshots/overhaul_291b_S01_color_reduced_check_complete_stable_1024.png` | pass | Check run completes with result `staff`, heading `星桥读稳了！`, mastery `谱桥稳定`, and no strong target-key glow. |
| parent state after stable check | `screenshots/overhaul_291b_S01_color_reduced_parent_stable_1024.png` | pass | Parent learning focus now summarizes the whole bridge: `星桥 C-G 谱位 · 已稳定`; detail lists `Do/Re/Mi/Fa/Sol` instead of the previous last-note-only `Mi/E` summary. |

Technical checks:

- `node --check app.js` passed.
- `index.html` asset/cache query version is `overhaul-291b`.
- Browser console showed no warn/error in the checked run.
- No horizontal or vertical overflow found at `1024x768`.
- Stable DOM state after check completion: `badge=S01·复`, `scaffold=staff-check`, `targetVisible=false`, `resultDataset=staff`, `parentMasteryStatus=谱桥稳定`, `parentLearningFocus=星桥 C-G 谱位 · 已稳定`.

Remaining risks:

- At this point, color-reduced/reduced-cue gates still needed M07, M08, FG03, and at least one non-staff build/prep replay. `overhaul-292b` later covers the M08 build/prep replay slice; M07 and FG03 remain open.
- S01 still needs real child observation before claiming 4-6 no-reading usability.
- The locator mini-map still carries hidden text in the DOM; visually it is icon-led, but a later component cleanup could add a pure-graphic locator mode.

## 2026-07-10 - Overhaul 291a S01 Color-Reduced And Visual Toast Audit

Build/version: `overhaul-291a`

Viewport: `1024x768`

Input route: touch/click on on-screen keyboard; no microphone or MIDI required.

Screens checked:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `S01` color-reduced wrong `Re/D` | `screenshots/overhaul_291a_S01_color_reduced_wrong_D_1024.png` | pass for first color-reduced wrong-state proof | `?audit=color-reduced` activates neutral note variables; color dots become striped/neutral; current staff pad and wrong key use outline/dashed state rather than hue alone. |
| `S01` no-reading visual toast wrong `Re/D` | `screenshots/overhaul_291a_S01_no_reading_visual_toast_wrong_D_quick_1024.png` | pass for toast structure | no `.staff-toast-copy` is generated in no-reading staff toast; toast uses note badge + repair gesture icon + black-key locator map. |

Technical checks:

- `node --check app.js` passed.
- `index.html` asset/cache query version is `overhaul-291a`.
- Browser console showed no warn/error in the checked runs.
- No horizontal or vertical overflow found at `1024x768` in the checked color-reduced and no-reading wrong states.
- Color-reduced DOM check: `body[data-audit="color-reduced"]`, current pad `--note-color` computed as neutral `#5f7286`, color dot filter `grayscale(1) saturate(0.05)`, wrong/target outlines active.
- No-reading toast DOM check: `hasCopy=false`, `hasVisual=true`, `hasToastLocator=true`, toast size about `193x66`.

Remaining risks:

- This historical `291a` run was not a full color-reduced completion run. It proves the S01 wrong-state repair does not depend on color; the full guided/check completion is logged in `overhaul-291b` above.
- At this point, color-reduced gates still needed M07, M08, FG03, and at least one non-staff reduced-cue replay. `overhaul-292b` later covers the M08 build/prep replay slice; M07 and FG03 remain open.
- The locator mini-map still carries hidden text in the DOM; visually it is icon-led, but a later component cleanup could add a pure-graphic locator mode.

## 2026-07-10 - Overhaul 290b S01 Vertical Slice And No-Reading Toast Fix

Build/version: `overhaul-290b`

Viewport: `1024x768` for the no-reading wrong-state verification; `overhaul-290a` evidence also includes the guided/check S01 flow and one `1366x1024` initial screenshot.

Input route: touch/click on on-screen keyboard; no microphone or MIDI required.

Screens checked:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `S01` clean guided initial | `screenshots/overhaul_290a_S01_clean_initial_1024.png` | pass | fresh-origin run starts in staff scaffold with `S01`; target `Do/C` is active and old M01 fallback copy is not visible. |
| `S01` guided wrong `Re/D` | `screenshots/overhaul_290a_S01_guided_wrong_D_1024.png` | pass | wrong key is marked, current pad reveals repair state, and target `Do/C` is hinted. |
| `S01` guided completion modal | `screenshots/overhaul_290a_S01_guided_complete_modal_1024.png` | pass | first completion leads to automatic reduced-cue replay copy: `S01 · 少提示复读`. |
| `S01` check initial | `screenshots/overhaul_290a_S01_check_initial_1024.png` | pass | check replay starts with muted target key and no strong target-key glow. |
| `S01` check completion stable | `screenshots/overhaul_290a_S01_check_complete_stable_1024.png` | pass | reduced-cue completion reports true bridge stability, not just a guided pass. |
| parent state after stable check | `screenshots/overhaul_290a_S01_parent_stable_1024.png` | pass | parent view shows `谱桥稳定` only after the check run. |
| `S01` no-reading initial | `screenshots/overhaul_290a_S01_no_reading_initial_1024.png` | pass for audit mode | staff bridge, current pad, dino, visual locator, and keyboard remain visible. |
| `S01` no-reading wrong `Re/D` after fix | `screenshots/overhaul_290b_S01_no_reading_wrong_D_1024.png` | pass for toast text leak | right-top toast prose is visually hidden in no-reading mode; computed copy opacity is `0` and text color is transparent. |
| `S01` initial wide | `screenshots/overhaul_290a_S01_initial_1366.png` | pass for layout spot check | wide staff layout remains readable. |

Technical checks:

- `node --check app.js` passed after the `overhaul-290b` CSS/cache update.
- Browser console showed no warn/error in the `290b` no-reading wrong-state verification.
- No horizontal or vertical overflow found at `1024x768` in the checked no-reading wrong state.
- `index.html` asset/cache query version is `overhaul-290b`.
- `quality-overrides.css` now targets `.staff-stage-toast .staff-toast-copy` in no-reading mode, not only the ordinary `.toast-copy` selector.

Remaining risks:

- This is strong S01 vertical-slice evidence, but not final low-age proof.
- Color-reduced gate is still not implemented/verified.
- Real 4-6-year-old usability is still unproven.
- Hidden no-reading toast copy still exists in the DOM and occupies a small layout box; it is visually hidden, but the final child UI should rely less on invisible text and more on explicit animation/sound/gesture.

## 2026-07-10 - Overhaul 289a M03 Two-Step Listening Comparison

Build/version: `overhaul-289a`

Viewport: `1024x768`

Input route: touch/click on on-screen keyboard; no microphone or MIDI required.

Screens checked:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `M03` no-reading step 1 initial | `screenshots/overhaul_289a_M03_step1_initial_1024.png` | pass | first listening target starts as a sound prompt (`♪`); the `Re/D` key is muted, not strongly revealed. |
| `M03` no-reading step 2 after correct `Re/D` | `screenshots/overhaul_289a_M03_step2_initial_after_Re_1024.png` | pass | after the first correct touch, the level does not complete; it advances to a second listening target, keeps `♪`, and mutes `Do/C` as the next hidden-answer target. |
| `M03` no-reading step 2 wrong `Re/D` | `screenshots/overhaul_289a_M03_step2_wrong_D_1024.png` | pass | wrong `Re/D` on step 2 reveals `Do/C -> 2黑左`; `Do/C` becomes the hint/target key and the wrong key is marked. |
| `M03` no-reading complete | `screenshots/overhaul_289a_M03_complete_1024.png` | pass | correct `Do/C` completes the level and the result modal says the child heard the sound and found the same key. |
| `M03` normal initial | `screenshots/overhaul_289a_M03_normal_initial_1024.png` | pass | normal mode also starts with `stageNoteText=♪`, empty `stageNoteName`, and muted `Re/D` target. |

Technical checks:

- `node --check app.js` passed.
- Browser console showed no warn/error in the checked normal run.
- No horizontal or vertical overflow found at `1024x768`.
- HTML asset/cache query version is `overhaul-289a`.
- Map copy now advertises `听 Re / Do`, matching the two-step runtime behavior.
- Implementation now treats `M03` as a minimal two-note listening comparison: `Re/D` first, then `Do/C`.

Remaining risks:

- This resolves the previous partial `289a` mismatch between code, map copy, cache version, and evidence.
- Listening proof is still narrow: it now covers a two-step `Re -> Do` comparison, but not broader sound identity such as `Mi/Fa`, `Do/Sol`, or microphone-confirmed input.

## 2026-07-10 - Overhaul 288a M03 Listening Seed Answer-Hiding Pass

Build/version: `overhaul-288a`

Viewport: `1024x768`

Input route: touch/click on on-screen keyboard; no microphone or MIDI required.

Screens checked:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `M03` no-reading initial | `screenshots/overhaul_288a_M03_no_reading_initial_1024.png` | pass for answer hiding | initial listening state no longer exposes `Re`; stage note, coach cue, and target card use a sound prompt (`♪`) while the target key remains muted. |
| `M03` no-reading wrong `Do/C` | `screenshots/overhaul_288a_M03_no_reading_wrong_C_1024.png` | pass for repair reveal | after a wrong key, the screen reveals `Re` and the two-black-key middle visual locator; target key becomes highlighted for repair. |
| `M03` normal initial | `screenshots/overhaul_288a_M03_normal_initial_1024.png` | pass | normal play also starts as sound-led instead of answer-led: `stageNoteText=♪`, `keyboardTargetVisible=false`. |
| `M03` normal wrong `Do/C` | `screenshots/overhaul_288a_M03_normal_wrong_C_1024.png` | pass | normal wrong state reveals `Re/D -> 2黑中` as the teaching repair. |

Technical checks:

- `node --check app.js` passed.
- Browser console showed no warn/error in the checked runs.
- No horizontal or vertical overflow found at `1024x768`.
- HTML asset/cache query version is `overhaul-288a`.
- Implementation adds a listening prompt-only state: before wrong input, the listening seed displays `♪`; after wrong input, it reveals the target solfege/letter and locator.

Remaining risks:

- This fixes the first M03 answer leak, but listening proof is still narrow: only one `Re/D` seed exists.
- Broader touch-only listening comparisons such as `Do` vs `Re` and `Mi` vs `Fa` are still required before claiming robust sound-identity training.

## 2026-07-10 - Overhaul 287b 1024 No-Reading M08 Answer-Card Tightening

Build/version: `overhaul-287b`

Viewport: `1024x768`

Input route: touch/click on on-screen keyboard; no microphone or MIDI required.

Screens checked:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `M08` no-reading initial | `screenshots/overhaul_287b2_M08_no_reading_1024_initial.png` | pass for answer-card issue | the previous right-side `Do/C` coach bubble now shows only `Do`; black-key locator graphics and real keyboard geometry remain visible. |
| `M08` no-reading wrong `Re/D` | `screenshots/overhaul_287b2_M08_no_reading_1024_wrong_D.png` | pass for layout and label tightening | wrong state still has no visible `Do/C` answer card; target remains carried by large solfege, key geometry, and visual locator. |
| `M03` no-reading initial | `screenshots/overhaul_287b_M03_no_reading_1024_initial.png` | partial pass | listening guide remains icon-led and no overflow appears. The screen still reveals a large `Re`, so this is not yet proof of sound-only listening. |
| `M03` no-reading wrong `Do/C` | `screenshots/overhaul_287b_M03_no_reading_1024_wrong_C.png` | partial pass | wrong state gives repair information without layout overflow. Broader listening design is still needed. |
| `FG03` no-reading initial | `screenshots/overhaul_287b_FG03_no_reading_1024_initial.png` | pass for current visual state | active star pad is visually reduced to a compact `Mi` label; future pads remain quiet and no overflow appears. |
| `FG03` no-reading wrong `Re/D` | `screenshots/overhaul_287b_FG03_no_reading_1024_wrong_D.png` | partial pass | wrong state remains stable at tablet size, but reduced-cue/check-run proof is still required before mastery claims. |
| `S01` no-reading initial | `screenshots/overhaul_287b_S01_no_reading_1024_initial.png` | pass for layout | staff bridge, current `Do` pad, visual locator cue, and keyboard remain visible at tablet size. |
| `S01` no-reading wrong `Re/D` | `screenshots/overhaul_287b_S01_no_reading_1024_wrong_D.png` | partial pass | wrong state has no overflow or console errors. Reduced-cue replay and clean-state parent mastery proof remain separate gates. |

Technical checks:

- `node --check app.js` passed.
- Browser console showed no warn/error in the checked runs.
- No horizontal or vertical overflow found at `1024x768` in the checked runs.
- HTML asset/cache query version is `overhaul-287b`.
- Implementation changed normal-level no-reading labels in story/coach/target cue layers from full `Do/C` style to solfege-only `Do` style, while keeping normal mode unchanged.

Remaining risks:

- This is still not a full no-reading product gate.
- Reduced-cue replay, clean-state parent mastery proof, color-reduced checks, and a real 4-6-year-old usability observation remain required.
- M03 still needs a better listening-specific rule because the current screen can reveal the target solfege before the child proves sound recognition.

## 2026-07-10 - Overhaul 286a No-Reading Label Tightening For Listening And FG03

Build/version: `overhaul-286a`

Viewport: `1366x1024`

Input route: touch/click on on-screen keyboard; no microphone or MIDI required for navigation. M03 still represents a listening seed, so the screen intentionally keeps the sound icon and piano-key icon as the main cue.

Screens checked:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `M03` no-reading initial | `screenshots/overhaul_286a_final_M03_no_reading_initial_1366.png` | pass for text tightening | listening guide now reads as icon -> arrow -> key icon, not text instruction; the story note pill collapses instead of leaving a blank answer label. |
| `M03` no-reading wrong `Do/C` | `screenshots/overhaul_286a3_M03_no_reading_wrong_C_1366.png` | partial pass | locator words stay visually hidden and no overflow appears. This still needs a child usability check because M03 depends on hearing the note. |
| `FG03` no-reading initial | `screenshots/overhaul_286a_final_FG03_no_reading_initial_1366.png` | pass for label-reduction issue | future star pads no longer show `Fa/Sol`; current pad shows only a compact `Mi` badge, and the black-key mini-map remains visible. |
| `FG03` no-reading wrong `Re/D` | `screenshots/overhaul_286a3_FG03_no_reading_wrong_D_1366.png` | partial pass | wrong state keeps locator words visually hidden and preserves the star-route structure. Still needs a reduced-cue/check-run proof. |
| `S01` no-reading initial | `screenshots/overhaul_286a2_S01_no_reading_initial_1366.png` | unchanged pass | staff bridge, current pad, visual locator cue, and keyboard remain visible after the tighter CSS. |
| `S01` no-reading wrong `Re/D` | `screenshots/overhaul_286a2_S01_no_reading_wrong_D_1366.png` | unchanged partial pass | staff visual cue remains visible; text feedback is hidden in the audit view. Reduced-cue replay still needs a separate gate. |

Technical checks:

- `node --check app.js` passed.
- Browser console showed no warn/error in the checked runs.
- No horizontal or vertical overflow found at `1366x1024`.
- HTML asset/cache query version is `overhaul-286a`.
- No-reading audit now hides the listening guide words, collapses story note pills, hides FG03 future route labels, and shows the active FG03 route note through a compact solfege-only badge.

Remaining risks:

- This is still not a full no-reading product gate.
- `1024x768` checks, reduced-cue replay, clean-state parent mastery proof, and a real 4-6-year-old usability observation remain required.
- M03's initial state is intentionally sound-led; if audio is unavailable, the screen is not self-sufficient yet.

## 2026-07-09 - Overhaul 285c No-Reading Audit Mode Tightening

Build/version: `overhaul-285c`

Viewport: `1366x1024`, `1024x768`, reset after verification

Input route: touch/click on on-screen keyboard; no microphone or MIDI required

Screens checked:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `S01` no-reading initial, wide | `screenshots/overhaul_285c_S01_no_reading_initial_1366.png` | pass for audit overlay | `body` and `#appShell` carry `data-audit="no-reading"`; long prose is visually hidden while the staff bridge, current pad, dino/start, destination, large note symbol, visual cue, and keyboard remain visible. |
| `S01` no-reading initial, tablet | `screenshots/overhaul_285c_S01_no_reading_initial_1024.png` | pass for layout | five staff lines, current `Do` pad, visual locator cue, and keyboard remain visible at `1024x768`; no obvious squeezed layout or overflow in this check. |
| `M01` no-reading initial, wide | `screenshots/overhaul_285c_M01_no_reading_initial_1366.png` | pass for audit overlay | story object, big note identity, black-key mini-map, and keyboard remain visible after prose-like hints and locator words are hidden. |

Technical checks:

- `node --check app.js` passed.
- Browser console showed no warn/error in the checked runs.
- No horizontal or vertical overflow found in the checked runs.
- HTML asset/cache query version is `overhaul-285c`.
- `?audit=no-reading` / `?checkMode=no-reading` now activates a stricter audit view that hides prose-like hints, locator words, guide labels, and small key letters while keeping large solfege, story objects, staff pads, black-key locator graphics, and keyboard geometry visible.

Remaining risks:

- This is an audit tool and a narrow evidence run, not a full no-reading product gate.
- `M03`, `M08`, `FG03`, `S01` wrong states, reduced-cue replay, and clean-state parent mastery proof still need logged no-reading/color-reduced checks.
- Real child usability remains unproven until a 4-6-year-old can complete a short session without adult reading help.

## 2026-07-09 - Overhaul 284a S01 No-Reading Visual Cue Seed

Build/version: `overhaul-284a`

Viewport: `1366x1024`, reset after verification

Input route: touch/click on on-screen keyboard; no microphone or MIDI required

Screens checked:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `S01` initial | `screenshots/overhaul_284a_S01_initial_visual_cue.png` | pass for this visual-cue seed | the staff bridge now has a compact non-text cue: landing pad icon -> arrow -> black-key mini-map. The cue text content is empty; the locator copy is visually hidden. |
| `S01` wrong `Re/D` | `screenshots/overhaul_284a_S01_wrong_D_visual_cue.png` | pass | wrong input brightens the visual cue while the current pad reveals the fuller text clue. Future pads remain unlabeled. |
| `S01` correct `Do/C` | `screenshots/overhaul_284a_S01_after_Do_next_Re_visual_cue.png` | pass | after `Do/C`, the cue switches to `Re/D` with the two-black-key middle finder position, and the current bridge pad shows only `Re`. |

Technical checks:

- `node --check app.js` passed.
- Browser console showed no warn/error in the checked run.
- No horizontal or vertical overflow found at `1366x1024`.
- HTML asset/cache query version bumped to `overhaul-284a`.
- Added `#staffVisualCue` as an in-stage visual teaching layer. It reuses the existing `locatorVisualHtml()` black-key mini-map so key-locator visuals stay consistent across screens.

Remaining risks:

- This is a seed for no-reading support, not a full no-reading gate.
- The dino bubble and feedback still contain text; future passes should test with text visually covered and then reduce or relocate redundant text.
- Need a 1024x768 S01 check and broader M01/M03/M08/FG03 no-reading checks before claiming low-age no-reading playability.

## 2026-07-09 - Overhaul 283c S01 Bridge-First Pad Hierarchy Pass

Build/version: `overhaul-283c`

Viewport: `1366x1024`, reset after verification

Input route: touch/click on on-screen keyboard; no microphone or MIDI required

Screens checked:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `S01` initial | `screenshots/overhaul_283c_S01_initial_bridge_first.png` | pass for this label-density issue | future/locked bridge pads no longer expose `Re/Mi/Fa/Sol` text. Only the current pad shows a large `Do`; future pads read as quiet landing spots. |
| `S01` wrong `Re/D` | `screenshots/overhaul_283c_S01_wrong_D_revealed.png` | pass | wrong input reveals the current `Do/C` pad and staff hint while future pads remain quiet. Feedback still names the pressed note and target clue: `This was Re/D; target Do/C: staff position + 2-black-left.` |
| `S01` correct `Do/C` | `screenshots/overhaul_283c_S01_after_Do_next_Re.png` | pass | after correct input, the first pad becomes done, the next pad shows only `Re`, and future pads stay unlabeled. |

Technical checks:

- `node --check app.js` passed.
- Browser console showed no warn/error in the checked run.
- No horizontal or vertical overflow found at `1366x1024`.
- HTML asset/cache query version bumped to `overhaul-283c`.
- `renderStaffSteps()` now marks pads with `data-step-state` and `data-revealed` so CSS can distinguish current, done, locked, and wrong-revealed states without guessing from text.

Remaining risks:

- This is still a narrow S01 hierarchy pass, not the full vertical-slice gate.
- The dino speech bubble still carries compact text (`Do/C`, staff hint, key locator); a later no-reading gate should verify that dino motion, staff position, keyboard mini-map, and audio can carry more of the work.
- Reduced-cue replay and clean-state parent mastery proof still need a full logged gate.

## 2026-07-09 - Overhaul 282a FG03 Star-Pad Simplification Pass

Build/version: `overhaul-282a`

Viewport: `1366x1024`, reset after verification

Input route: touch/click on on-screen keyboard; no microphone or MIDI required

Screens checked:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `FG03` initial | `screenshots/overhaul_282a_FG03_final_minimal.png` | pass for this label-reduction issue | the old full route title `Mi -> Fa -> Sol` is gone. The scene now shows a compact `跳近邻星` title, a visible dino marker, current `Mi/E 2黑右`, and quieter future `Fa`/`Sol` pads. |
| `FG03` wrong input | `screenshots/overhaul_282a_FG03_wrong_D_clean.png` | pass | pressing `Re/D` keeps the repeated right-side coach/target cards hidden and still gives compact repair feedback: `这是 Re/D。要 Mi/E：2黑右。` |
| `M01` parent state | `screenshots/overhaul_282a_M01_parent_seen_after_completion.png` | pass | after M01 completion, the parent mastery status now reads `已见过 Do/C` instead of implying stable mastery with `已认识 Do/C`. |

Technical checks:

- `node --check app.js` passed.
- Browser console showed no warn/error in the checked run.
- No horizontal or vertical overflow found at `1366x1024`.
- HTML asset/cache query version bumped to `overhaul-282a`.
- FG03 now hides the duplicated `targetNote`, `stageNoteOrb`, and right-side `coach-overlay`; the current note is carried by the star pad plus story ribbon and keyboard locator.

Remaining risks:

- This is still not the full vertical-slice gate.
- FG03 is less worksheet-like, but it still needs a later no-reading/color-reduced gate to prove a 4-6-year-old can act without reading the labels.
- S01 reduced-cue replay and full staff bridge acceptance remain outstanding.

## 2026-07-09 - Overhaul 281b Icon-led Story Ribbon Pass

Build/version: `overhaul-281b`

Viewport: `1366x1024`

Input route: touch/click on on-screen keyboard; no microphone or MIDI required

Screens checked:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `M01` first exposure | `screenshots/overhaul_281b_M01.png` | pass for this story-card issue | left story ribbon now uses a part icon, short line `地板还没落下`, note pill, black-key mini-map, and staff chip. Text height dropped from the older roughly 192px card to about 154px. |
| `M03` listening seed | `screenshots/overhaul_281b_M03.png` | pass for current listening ribbon | story ribbon now shows wheel icon, `听完再找琴键`, and `♪ 找同样键`; the central listening guide remains the main instruction. |
| `M08` five-note climb | `screenshots/overhaul_281b_M08.png` | partial pass | roof story card is shorter and icon-led. The level still needs a later review of five-note progression clarity after the first step. |
| `FG03` E/F/G comparison | `screenshots/overhaul_281b_FG03.png` | partial pass | story ribbon is now about 126px high and does not duplicate the key locator. The in-scene Mi/Fa/Sol labels still need a later low-age visual pass. |
| `M01` wrong input | `screenshots/overhaul_281b_M01_wrong_D.png` | pass for this issue | compact wrong feedback remains `这是 Re/D。要 Do/C：2黑左。`; story ribbon and toast do not cover the keyboard. |

Technical checks:

- `node --check app.js` passed.
- Browser console showed no warn/error in the checked run.
- No horizontal or vertical overflow found at `1366x1024`.
- HTML asset/cache query version bumped to `overhaul-281b`.
- `stageStoryRibbon` now renders a fixed icon-led structure instead of directly inserting long `storyNeed` plus full key/staff text.
- `imageCssUrl()` now uses single-quoted CSS URLs so inline generated asset references render correctly inside HTML strings.

Remaining risks:

- This is still not a full acceptance pass.
- Story card is less text-heavy, but child success still depends partly on reading `Do/C`, `2黑左`, and staff chips; a later pass should add more animation/gesture/voice support.
- FG03 still has multiple visible labels around the three stars; it needs a separate comparison-mode simplification pass.
- Reduced-cue replay and fresh-state parent mastery proof are still outstanding.

## 2026-07-09 - Overhaul 280b Ordinary Level Information Hierarchy Pass

Build/version: `overhaul-280b`

Viewport: `1366x1024`

Input route: touch/click on on-screen keyboard; no microphone or MIDI required

Screens checked:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `M01` first exposure | `screenshots/overhaul_280b_M01.png` | partial pass | visible coach bubble now reads `当前音 Do/C 2黑左` instead of repeating the level title and long locator copy. Story ribbon remains readable but still text-heavy. |
| `M03` listening seed | `screenshots/overhaul_280b_M03.png` | pass for current listening affordance | coach bubble now reads `听一听 ♪ 再找键`; center guide still carries `听一声 -> 找同样键`; target key remains unrevealed before wrong input. |
| `M08` five-note climb | `screenshots/overhaul_280b_M08.png` | partial pass | five-note climb keeps the large story scene and keyboard; coach bubble no longer duplicates the level title. Left story ribbon still carries note/key/staff text. |
| `FG03` E/F/G comparison | `screenshots/overhaul_280b_FG03.png` | partial pass | Mi-Fa-Sol comparison path stays visible; coach bubble is shorter. The comparison still has many labels and needs a later low-age visual pass. |
| `M01` wrong input | `screenshots/overhaul_280b_M01_wrong_D.png` | pass for text density | wrong feedback is compact: `这是 Re/D。要 Do/C：2黑左。`; the stage toast remains visual and does not cover the keyboard. |

Technical checks:

- `node --check app.js` passed.
- Browser console showed no warn/error in the checked run.
- No horizontal or vertical overflow found at `1366x1024`.
- HTML asset/cache query version bumped to `overhaul-280b`.
- Ordinary play `coachBubble` copy was shortened to `当前音 / 听一听 / 少提示` states.
- Hidden `targetNote` and visible feedback copy were also shortened, but the currently visible side cue is the in-scene `coachBubble`, not the hidden practice-panel target card.

Remaining risks:

- This is a narrow information-hierarchy pass, not a full acceptance pass.
- The left story ribbon is still the largest text surface in ordinary play and should be made more icon/gesture-led in a later pass.
- Normal build levels still need a full low-age visual audit for whether a 4-6-year-old can act without reading `Do/C`, `2黑左`, or staff-position words.
- Reduced-cue replay and fresh-state parent mastery proof are still outstanding.

## 2026-07-09 - Overhaul 279 Vertical Slice Copy, Listening, And Platform Promise Pass

Build/version: `overhaul-279d`

Viewport: `1366x1024`

Input route: touch/click on on-screen keyboard; no microphone or MIDI required

Screens checked:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `M01` first exposure | `screenshots/overhaul_279_gate_M01.png` | partial pass | child can see the story object, target key, keyboard, and result area. Still has redundant left story card plus right target card. |
| `M03` listening seed | `screenshots/overhaul_279_gate_M03.png` | partial pass | touch-only listening seed is present and target key is muted before action. Visual story still feels empty compared with the teaching goal. |
| `M08` five-note climb | `screenshots/overhaul_279_gate_M08.png` | partial pass | five-note keyboard path is readable. The scene still repeats note clues in multiple UI zones. |
| `FG03` E/F/G comparison | `screenshots/overhaul_279_gate_FG03.png` | pass for current slice | E/F/G comparison reads more clearly than M03; reduced cue is visible. |
| `S01` staff bridge | `screenshots/overhaul_279_gate_S01.png` | pass for layout, partial for copy | staff bridge is large, readable, and no empty dark band remains. Some DOM/title fields still expose normal-level fallback text, so the staff screen needs cleaner state ownership. |
| `M01` wrong input | `screenshots/overhaul_279_gate_M01_wrong_D.png` | pass | wrong input names `Re/D` and redirects to `Do/C` plus key locator. |
| `S01` wrong input before copy fix | `screenshots/overhaul_279_gate_S01_wrong_D.png` | fail on text density | staff wrong feedback was too long for child-facing bridge play. |
| `S01` wrong input after copy fix | `screenshots/overhaul_279_finalcopy_S01_wrong_D.png` | pass for this copy issue | wrong feedback now reads: `这是 Re/D。要 Do/C：下方小线、2黑左。`; toast height dropped to about 37px. |
| parent view | `screenshots/overhaul_279_aftercopy2_M08_parent.png` | pass for platform wording | MIDI copy now says it is only available in some browsers and iPad web should use the screen keyboard first. |
| `M03` listening guide after fix | `screenshots/overhaul_279_overhaul279c_M03_listen_initial.png` | pass for first-run affordance | M03 now shows `听一声 -> 找同样键` without revealing `Re/D` before an error. |
| `M03` listening guide after wrong | `screenshots/overhaul_279_overhaul279c_M03_listen_wrong_C.png` | pass for repair affordance | after a wrong `Do/C`, the guide reveals `Re/D -> 2黑中`. |
| `M03` parent view after mastery fix | `screenshots/overhaul_279_overhaul279d_M03_parent.png` | pass for parent mastery wording | parent view now says listening is stable only after two no-wrong matches. |

Technical checks:

- `node --check app.js` passed.
- HTML asset/cache query version bumped to `overhaul-279d`.
- M01 no longer counts one guided correct input as stable mastery in `isStableLevelAttempt`; parent-facing copy still treats it as `已认识 Do/C`.
- M03 listening stable mastery now requires at least two stable completions before parent view says `听音稳定`.
- M03 gained a visual listening guide that defaults to `听一声 -> 找同样键` and reveals `Re/D -> 2黑中` only after wrong input.

Remaining risks:

- This is still not a full acceptance pass. Reduced-cue replay and parent-state split need a clean fresh-state proof.
- M03 still needs broader listening content beyond one `Re/D` seed, such as Do/Re and Mi/Fa comparisons.
- Normal build levels still repeat the same note clue in story ribbon, target card, dino hint, keyboard labels, and feedback; this is the next major UI simplification target.
- S01 still needs cleaner staff-mode state ownership so hidden/fallback normal-level text cannot leak into DOM audits.

## 2026-07-09 - Overhaul 278 S01 Layout Recovery Pass

Build/version: `overhaul-278`

Viewport: in-app browser, staff mode

Input route: touch/click on on-screen keyboard; no microphone or MIDI required

Screens checked:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `S01` normal staff bridge | `screenshot_overhaul_278_S01_fixed.png` | pass for this narrow layout issue | the staff stage now fills the available panel; the previous empty dark band below the bridge was removed. |
| `S01` wrong feedback | `screenshot_overhaul_278_S01_wrong_feedback_positioned.png` | pass for this narrow overlap issue | wrong-feedback HUD was moved so it no longer covers the current Do/C pad. |

Measured notes from the pass:

- staff stage height increased to about 690px;
- visible staff lines: 5;
- current staff pad count: 1;
- stage-to-keyboard gap: about 21px;
- no horizontal or vertical overflow found in the checked viewport;
- wrong feedback no longer overlaps the current staff pad;
- browser console showed no warn/error in this checked run.

Remaining risks:

- This is still not the full vertical-slice gate. M01, M03, M08, FG03, parent view, reduced-cue replay, and broader wrong-input teaching still need a logged pass/fail run.
- S01 feedback copy is still text-heavy for 4-6-year-olds; the next pass should make dino gesture, staff pad highlight, and key locator visuals do more work.
- This pass improved layout, not release-level art or CSS maintainability.

## 2026-07-09 - Overhaul 277 Runtime Asset And Reserved-Target Guard Pass

Build/version: `overhaul-277`

Viewport: in-app browser viewport during local verification

Input route: simulated/page load; no microphone or MIDI permission requested

Screens checked:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `M03` listening seed | `screenshot_overhaul_277_M03_runtime_assets.png` | pass | dino pose, moon background, and success badge load from `assets/runtime`; no console warn/error. |
| `S01` staff bridge | `screenshot_overhaul_277_S01_runtime_assets_fixed.png` | pass | staff background and dino pose load from `assets/runtime`; five staff lines and one current pad visible; no console warn/error. |

Technical checks:

- `node --check web_star_dino_workshop/app.js` passed.
- Runtime WebP group: 22 files, 1,267,472 bytes.
- `assets/generated` remains a source/provisional directory, not a production runtime bundle.
- Reserved A/B target use now fails during course validation instead of only logging a warning.

Remaining risks:

- This is still not the full vertical-slice gate. M01, M08, FG03, parent view, wrong-input teaching, and reduced-cue replay still need logged evidence.
- CSS delivery is still not release-grade; `quality-overrides.css` remains a large prototype override file and needs cleanup before release-level polish.
- Asset source/prompt/license fields are still provisional and must be completed before public release work.

## 2026-07-09 - Overhaul 276 Reserved-Key And Toast Pass

Build/version: `overhaul-276`

Viewport: `1024x768`

Input route: touch/click on on-screen keyboard

Screens checked:

| Screen | Evidence | Result | Notes |
| --- | --- | --- | --- |
| `M03` listening seed | `screenshot_overhaul_276_M03_reserved_wrong.png` | pass | A/B are visible as physical keys but dimmed; A wrong input shows `La` and says the key is for later. |
| `S01` staff bridge | `screenshot_overhaul_276_staff_reserved.png` | pass | A/B remain dimmed in staff mode; C-G stay visually dominant; staff bridge layout unchanged. |

Gate notes:

- Fixed a normal-level toast regression where old CSS set both `top` and `bottom`, stretching wrong feedback into a large overlay.
- Reserved A/B keys now look like not-yet-taught keyboard territory instead of active answer buttons.
- Reserved-key wrong feedback now says the key is for later and points back to the current target.

Remaining risks:

- This is a narrow gate run, not the full vertical-slice gate. M01, M08, FG03, parent view, and reduced-cue replay still need logged evidence.
- Startup still briefly shows the loader on asset-heavy screens; asset compression remains a separate gate.

## 2026-07-26 - 363a M01-M03 Companion Feedback Visual Slice

Candidate: `overhaul-363a-m01-m03-companion-feedback-visual-slice`.

- `check:m01-m03-companion-feedback`: `21/21`, including M02 C-to-D and D-to-E handoff single-dominant-answer checks, M02 completion target cleanup, reduced motion, and clean browser console.
- Shared browser gates: course director `68/68`; nonblocking feedback `62/62`; feedback intensity `42/42`; home single task `23/23`; sessions `74/74`; clean state `124/124`; PWA `11/11`; motion `19/19`; iPad accessibility `43/43`; AUDIO-A `66/66`; child note names `286/286`.
- `check:bundle:strict`: pass, `52` files and `1,948,942` runtime asset bytes. `git diff --check`: pass.
- `check:quick`: fail-closed at supervisor-owned `check:curriculum-facts`, which still pins the live application to exact 362a identity. No supervisor facts or approvals were changed to bypass this hold.

## 2026-07-26 - 363b LP04 Echo Return Story Fact

Candidate: `overhaul-363b-lp04-echo-return-story-fact`.

- `check:child-course-director`: `70/70`, including the exact LP04 cave-response learning and next-landmark copy plus the absence of `找到咚咚`、`完整见面`、`谱位`、`掌握` on the completed child map.
- `check:chapter4-lp04`: `27/27`; `check:curriculum-story`: `47/47`; `check:child-note-names`: `286/286`; `check:pwa-shell`: `11/11` with cold-offline 363b shell identity.
- `check:bundle:strict`: pass, `52` files and `1,948,942` runtime asset bytes.
- `check:quick`: fail-closed at supervisor-owned `check:curriculum-facts`, which still pins exact 362a runtime identity. No fact source or approval was changed to bypass this hold.

## 2026-07-28 - 365a Web Parental Challenge Reference

Candidate: `overhaul-365a-web-parental-challenge-reference`.

- TDD evidence: the pre-implementation challenge-presence probe failed because `#parentChallenge` was absent; the initial green probe passed `1/1`. Final `check:parental-challenge` passed `21/21`.
- The final challenge gate covers random in-memory addition, three choices, a two-second pointer or keyboard hold, timeout close/retry, focus recovery, cancel/Escape/reload, active-session input blocking, microphone release, reduced motion, no storage writes, and browser console cleanliness.
- P1 lifecycle coverage passed: timeout closes and relocks; hidden, pagehide, and blur relock an already-open parent panel; blur during a correct pointer or keyboard hold cannot authorize later; rebuilt wrong/short-hold choices regain focus; challenge answers have `touch-action: none`, `user-select: none`, and `-webkit-touch-callout: none`.
- Shared browser gates passed: parent history `20/20`; parent data reset `13/13`; microphone lifecycle `17/17`; MIDI/microphone coexistence `9/9`; free piano safety `17/17`; home single task `23/23`; course director `78/78`; nonblocking feedback `62/62`; sessions `74/74`; clean state `124/124`; iPad accessibility `43/43`; motion `19/19`; child note names `286/286`; PWA `11/11`.
- `check:bundle:strict`: pass, `52` files and `1,948,942` runtime asset bytes. `git diff --check`: pass.
- Evidence: `screenshots/parental_challenge_365a/`, including initial, wrong/short-hold, successful parent-panel, active-lesson, and reduced-motion captures.
- `check:quick` remains fail-closed at supervisor-owned `check:curriculum-facts` because it pins exact 364b candidate facts. `check:privacy-state` also remains fail-closed on the supervisor-owned 364b inventory and the preceding no-Web-challenge assertion. Neither fact source was modified to bypass these holds.
- Post-review correction: a delayed two-second hold callback probe exposed a 365a gap not covered by `21/21`: both `pointercancel` and `lostpointercapture` could still reach the authorization callback after cancellation. The historical review in `docs/95_WEB_PARENTAL_CHALLENGE_SUPERVISOR_REVIEW_365A.md` is therefore `superseded_partial`; 365b is the current unapproved correction candidate.

## 2026-08-03 - 369b Figma A Stage Settlement Narrow Migration

Candidate: `overhaul-369b-figma-a-stage-settlement`.

- Scope was limited to the Stage Settlement surface and successor PWA/build identity. The former light centered milestone card is now a top safe-area, dark navy, warm-gold-bordered, two-zone nonblocking status bar. The true lesson scene, Xingya/world result and full keyboard remain visible; the surface has no buttons, focus takeover or autoplay behavior.
- Runtime teaching code was not changed. `app.js` remains `197C588C32460159E6EED94CC3E3250D89756503CDEADDC6E620DA76E9DD9A96`; milestone eligibility, phase endpoints, 2300ms lifecycle, sessions, mastery, played/stable/retained/needsPractice, lesson order, input budgets, audio and media remain preserved.
- New runtime identity: `index.html 9CEA0BF3719A17C1F5B605325E7A8A8058C84FCA421D02C00567F3CB7CE37C59`; `service-worker.js 522D7B388E8531A097661289CC9E6C2871B4D52486CA4C71961F27CADE669E2D`; `child-feedback-intensity.css F463101DD348B26598C2A7D61736FF940BB2525F5AD2F9711EF4821F546337F9`; cache `star-dino-pwa-overhaul-369b-figma-a-stage-settlement`; app request `app.js?v=overhaul-369b-figma-a-stage-settlement`; settlement CSS request `child-feedback-intensity.css?v=overhaul-369b-figma-a-stage-settlement`.
- Red/green evidence: strengthened `chrome-test/child-nonblocking-feedback-check.mjs` first failed `75/77` on the old light centered card, hidden scene anchors and nowrap/ellipsis next copy; after CSS-first correction it passed `77/77` with screenshots in `screenshots/figma_a_stage_settlement_369b`.
- PWA evidence: `check:pwa-shell` passed `11/11`; `check:pwa-successor-upgrade` passed `10/10`, including real 369a-to-369b Service Worker update, removal of the 369a cache, exact new Stage Settlement CSS cache hit and cold-offline start.
- Shared gates run: home-single-task `23/23`; child-course-director `78/78`; child-nonblocking-feedback `77/77`; clean-state `124/124`; child-note-names `286/286`; motion `19/19`; contrast `9/9`; iPad a11y `43/43`; sessions `74/74`; world-map-v6 `103/103`; runtime-pacing `1362`; bundle:strict `54 files / 1,948,942 runtime asset bytes`.
- `check:quick` remains partial and stopped at `check:curriculum-facts`: that audit still pins broad curriculum/coordination docs to current 369a identity. Those authority-doc migrations are outside this Figma A Stage Settlement visual slice and were not changed here.
- Manifest: `docs/30_FIGMA_A_STAGE_SETTLEMENT_CANDIDATE_369B.json`. All approval flags remain false; 359a remains the frozen observation baseline; 369a/368b/367b/366a/365b remain bounded predecessors; physical iPad, teacher, child, external similarity and release clearance remain missing.

## 2026-08-01 - 369a Staff Notation Geometry Correction Final Verification

Candidate: `overhaul-369a-staff-notation-geometry-correction`.

- Current implemented treble-staff geometry is fixed and browser-verified as: C4 = lower ledger line (`90.5%`), D4 = lower ledger space (`83%`), E4 = first line (`75.5%`), F4 = first space (`68%`), and G4 = second line (`60.5%`). The same coordinate contract covers S01 full, S01 mini, reduced-motion S01 mini, and the FG04 F/G preview.
- D4 child-facing terminology is `下加一间`; the former nonstandard lower-staff wording is excluded. S01 full/mini and FG04 display a five-line treble staff and visible treble clef. Note-center geometry remains fixed while full-motion presentation animates only the surrounding aura.
- `check:staff-notation-geometry`: `21/21`, `0` browser problems, at `1024x768 DPR1` and `1194x834 DPR2`; maximum measured note-center error was `0.0078125px` against a `2px` tolerance.
- `check:quick`: pass, including note matrix, child letter-name copy, 39-lesson story/course facts, runtime pacing, review packages, PWA/recovery boundaries, privacy facts, audio contract, and prototype bundle.
- `check:privacy-state`: `73` fact checks passed. The live app is bound to 369a while `docs/64_WEB_DATA_PERMISSION_AND_NETWORK_INVENTORY.json` remains frozen 367b predecessor evidence and explicitly cannot certify 369a. Five real release blockers remain; no approval flag changed.
- `check:bundle:strict`: pass, `54` files and `1,948,942` runtime asset bytes. `git diff --check`: exit `0`; only existing line-ending normalization warnings were reported.
- Runtime hashes remained exact after verification: `app.js 197C588C32460159E6EED94CC3E3250D89756503CDEADDC6E620DA76E9DD9A96`, `index.html EAF3696710C61B88AE7C7CC74AA5747A8D54595BA6931FE57BAB8C998C1B0424`, `service-worker.js 3A38CB61E5BF494DFE188B17D07CA2E0018AFCF09245C96569598CDD5AC2BCB7`, `staff-notation-geometry.css C930582657F5B0952E95D8769B6F340470BCC9D337322AE062C2633BD3DA7B94`.
- Evidence remains exact: `chrome-test/staff-notation-geometry-check.mjs 9330ADACECC1929EF7BC8EF4D0B680B1F4F75D8DDBD46CA1425D0AE6D59C067E`; `screenshots/staff_notation_geometry_369a/summary.json EC4CCC5CEB8219922A8265760FF1409C47037D909783383685D7A88C1475471E`; manifest `docs/30_STAFF_NOTATION_GEOMETRY_CORRECTION_CANDIDATE_369A.json A189D57C204B26F7267CE88B5883C060EDC5E4DDAD8C6718D687A2FAB27EF597`.
- Boundary: LP08-LP10 future bass-staff content is not implemented or verified and must not be described as correct yet. Physical iPad Safari, teacher/child review, real MIDI/acoustic microphone evidence, rights/similarity clearance, runtime approval, observation approval, integration approval, and release approval remain missing or false.

## 2026-08-01 - 369a Local Intake And Review Hub Binding Migration

Scope: local release-owner/device forms, unified review hub, coordination facts and maturity audits only. No runtime, curriculum, lesson, media, audio, mastery or approval behavior changed.

- The release-owner and device-readiness templates, generated pages and manifests are now consistently bound to current unapproved `overhaul-369a-staff-notation-geometry-correction`. Their visible identity also preserves S01/PWA predecessor 368b, recovery predecessor 367b, visual predecessor 367a, teaching predecessor 366a, frozen recovery owner 365b and observation baseline 359a.
- TDD evidence: after changing the hub audit expectations first, the old generated hub failed exactly two assertions because it still published 367b as the local-intake candidate. The implementation was then migrated to `current_369a_templates_and_pages_ready_results_missing`.
- Local forms may export a complete current-candidate result for supervisor review, but `pageCanGrantFinalPass=false`; real owner/inventory results remain `missing`, blank templates remain `incomplete_fail_closed`, network upload remains false and every approval flag remains false.
- Focused gates passed: release-owner verifier `20` assertions and intake browser audit `61/61`; device verifier `22` assertions and intake browser audit `83/83`; review hub `104` assertions; review hub server `239` assertions with 0 runtime routes and 0 accepted write methods; release actionability `220` assertions; maturity facts `63`.
- `check:quick`: pass, including curriculum/story `54/54`, runtime pacing `1362`, review packages, frozen 359a observation server, 367b portable recovery, native boundary, privacy facts and production bundle.
- `check:bundle:strict`: pass, `54` files and `1,948,942` runtime asset bytes.
- Release state is intentionally unchanged: external results remain `0/4`; maturity remains 15 requirements with 13 blockers; current 369a static backup/source snapshot, physical iPad, real device matrix, teacher/child results, release visual/audio clearance, qualified native runtime, signed archive, TestFlight and App Store evidence remain missing or partial.

## 2026-08-01 - 369a Recovery Evidence And Boundary Coordination Sync

Candidate: `overhaul-369a-staff-notation-geometry-correction`.

- The frozen candidate manifest remains unchanged. Its creation-time `recovery.staticBackup=missing_for_369a` and `recovery.sourceSnapshot=missing_for_369a` are historical fields, not instructions to rewrite the manifest.
- `369a_staticBackup_passed`: `docs/30_PROTOTYPE_BACKUP_369A.json` SHA-256 `73066E215135EB152EEECBFB980A25453A050EFEC164D1880267267B98BBD4AE`; `dist/prototype/star-dino-369a-static-backup.zip` is `2,367,360` bytes, SHA-256 `EF5B9C49CD366EE39902509D5F491789A0E154CEA1660265E3A24A19D5A73AD2`, with `54` files and `55` ZIP entries. Archive-only verification, tamper probes, and isolated static recovery passed.
- `369a_map_boundary_addendum_passed`: `docs/30_STAFF_NOTATION_GEOMETRY_CORRECTION_BOUNDARY_ADDENDUM_369A.json` SHA-256 `2317BB7936644743FADD6AE8656E0675E5CDBFF943FF8ADDBD2D3DFAE48B0713` passed. It discloses only the pre-freeze unowned world-map-v6 high-contrast four-line delta and does not change runtime.
- `369a_sourceSnapshot_passed_dirty_post_candidate`: `docs/30_PROJECT_SOURCE_SNAPSHOT_369A.json` and `dist/release-engineering/star-dino-source-snapshot-369a.zip` now pass source verification, tamper probes and isolated core recovery. Their role is strictly `dirty_post_candidate_source_and_control_snapshot`: they may recover current source/control state but are not the frozen candidate-source identity. The external manifest remains the authority for archive bytes and SHA-256; those values are not copied into this included log to avoid a self-reference cycle.
- `current_static_source_recovery_owner_369a` now names the current experience recovery owner. `portable_recovery_predecessor_367b` is retained only for the portable npm dependency cache and portable recovery kit used for second-host bootstrap; it is not the current static/source recovery owner.
- `node tools/release-engineering-369a-recovery-audit.mjs` now passes `17` assertions, including the immutable frozen-manifest fields, 369a static archive, dirty post-candidate source snapshot and 367b portable-owner split. Review Hub browser audit passes `105` assertions and its allowlist server passes `239`, with four external tasks, `0/4` accepted results, zero runtime routes and zero accepted write methods. Physical iPad, remote backup, second physical host, real deployment rollback and signed native archive remain missing or unverified; `runtimeApproval=false`, `observationAllowed=false`, and `releaseCleared=false` remain unchanged.

## 2026-08-01 - 369a Recovery Fail-Closed Independent Review Correction

- Independent high-reasoning review found no P0 and one P1: the 369a recovery audit verified the source archive and tamper probes but did not compare it with the current dirty source/control selection. A stale snapshot could therefore pass the copy-preflight audit.
- `tools/release-engineering-369a-recovery-audit.mjs` now always invokes `verify_source_snapshot.py --compare-workspace --selftest`. The pre-rebuild negative probe correctly failed and named every changed source/control file, proving that a stale snapshot can no longer be treated as the current 369a recovery pair.
- A local-only rehearsal of the `docs/109` second-host command sequence then exposed a metadata edge case: an extracted source ZIP contains its internal `snapshot-manifest.json`, which the new workspace comparison initially treated as an extra source file. `tools/build_source_snapshot.py` now excludes that reserved archive metadata path from the source/control selection. This correction is validated locally only and does not set `secondPhysicalHostVerified` or `remoteBackupVerified`.
- Release actionability and maturity consumers now also fail closed on the source-snapshot role plus physical iPad Safari, remote backup, second physical host, deployment rollback and signed native archive states. All remain `missing` or `unverified`; all runtime, observation and release approvals remain `false`.
- `docs/79`, `docs/84`, `docs/87` and the coordination record now consistently name 369a as the current static/source recovery owner and 367b as the portable dependency/self-bootstrap predecessor. Stale statements that the 369a source snapshot was still pending or that 367b/365b was the current owner were removed.
- The final deterministic 369a source snapshot rebuild includes these corrections. Its external manifest remains the sole authority for archive bytes and SHA-256 so this included log does not create a hash self-reference.

## 2026-08-01 - 369a Candidate-Role and Future-Course Evidence Synchronization

- A low-cost read-only blocker inventory correctly retained `13` release blockers but did not read the four Chapter 5 acceptance checklists or the stale README/current-role lines. Independent supervisor review confirmed that `docs/67-70` still described 359a as the current frozen runtime and that the release-engineering maturity row retained the same obsolete role.
- `docs/67-70`, `docs/README.md` and `docs/29_PROJECT_COORDINATION_AND_INDEPENDENT_AUDIT.md` now identify 369a as the current unapproved browser/PWA experience and restrict 359a to the frozen adult physical-iPad preflight/directional-observation baseline. Historical 367b/365b/364b/364a evidence keeps only its bounded predecessor role.
- The `course-runtime` blocker now indexes the authoritative Chapter 4/5 runtime contracts and all LP05/TH01-TH08 future acceptance checklists. Curriculum/story and release-actionability audits fail closed on stale candidate-role wording or an incomplete evidence-path set.
- Supervisor delegation is now difficulty-routed: Luna Max is limited to deterministic mechanical inventory, hashes, paths, status synchronization and repetitive gates; Terra handles bounded disjoint implementation; Sol high/xhigh owns curriculum, child experience, state/privacy/release risk and final review. Lower-cost output cannot grant approval and must receive higher-reasoning source checks before acceptance.
- This is documentation and audit synchronization only. It does not change `app.js`, `package.json`, runtime assets, pitches, input budgets, settlement, mastery, session behavior or any approval. LP05-LP10 and TH01-TH08 remain runtime-forbidden; physical iPad, teacher, child, rights, native, signing, remote backup, second-host and deployment evidence remain missing or unverified.

## 2026-08-02 - 369a Current Visual Inventory Delta Review

- The externally circulated `docs/62` matrix remains the immutable 359a inventory: `27` images / `1,700,918` bytes. It was not rewritten to represent a successor candidate.
- The current 369a strict bundle contains `29` runtime images / `1,948,942` bytes. Exact-name scanning over the release entry surfaces classified them as `27 runtime-direct / 1 cache-only / 1 zero-reference`.
- `assets/runtime/staff-dino-hop-bg-v1.webp` is the cache-only file. `assets/runtime/world-map-v4-360a.webp` is absent from current HTML, JS, CSS, manifest and Service Worker references and enters the strict bundle only through `assets/runtime/**`. `assets/runtime/world-map-v5-361a.webp` remains the active unapproved map source through both map stylesheets and the Service Worker.
- V4 and the legacy staff-hop background are now two separate successor-candidate retirement probes. No file, Service Worker entry, release policy, runtime hash or frozen manifest changed in this review.
- V5 has an exact source PNG, prompt, execution ID, output hash and deterministic WebP conversion chain, but the generation reference input file/hash, applicable account/terms receipt, release rights and external similarity clearance remain missing or partial. Current visual clearance is therefore `0/29`, not a release approval.
- Coordination records now distinguish `frozen_359a_visual_inventory_27_27` from `current_369a_visual_inventory_29_29`. Runtime, curriculum, session, mastery, audio, input and every approval flag remain unchanged.
- Focused verification passed: runtime asset provenance `910` assertions; curriculum facts `105`; curriculum/story `54/54`; release actionability `233`; maturity current-state `65` facts with the same `15` requirements and `13` blockers. The maturity report now prints both `frozen359a assets=27` and `current369a assets=29` instead of presenting the frozen count as the current inventory.

## 2026-08-02 - Human Form Guidance and Visual Closure Count Correction

- Independent operator-copy review found two stale facts in `docs/106_HUMAN_REVIEW_FORM_FILLING_GUIDE.md`: the example `MIDI-HOTPLUG-01` did not satisfy the device form's required `M1-` prefix, and the release hold still referred only to 27 runtime images.
- The example is now `M1-HOTPLUG-01`. The guide and `docs/79_RELEASE_GATE_DEPENDENCY_AND_RETURN_CONTRACT.md` distinguish the frozen 359a external-review baseline of 27 images from the current 369a inventory of 29 images and keep the current release-clearance count at `0/29`.
- `tools/runtime-asset-provenance-audit.mjs` now fails if either operator guidance regresses to an invalid evidence prefix or the release contract again treats the frozen 27-image count as the final-set closure requirement.
- Focused verification passed: runtime asset provenance `912` assertions, release actionability `233`, and curriculum/story `54/54`. No runtime file, lesson, note sequence, session, mastery, media byte, form protocol, candidate identity or approval flag changed; the mature-app ledger remains `15` requirements with `13` blockers.

## 2026-08-02 - Full-Course Staff Position Canonical Audit

- `docs/110_STAFF_POSITION_CANONICAL_AUDIT.md` now derives the ten Season One staff positions from fixed clef anchors instead of relying on repeated prose. Treble C4-G4 is C4 lower ledger line, D4 lower ledger space, E4 first line, F4 first space and G4 second line. Bass C3-G3 is C3 second space, D3 third line, E3 third space, F3 fourth line and G3 fourth space.
- `check:note-matrix` passed with `5` core rows, `5` low-register rows, `9` staff reference files, `2` reserved rows and `38` level/staff targets. It also rejects the former ambiguous D4 and D3 wording.
- `check:staff-notation-geometry` passed `21/21` at `1024x768 DPR1` and `1194x834 DPR2`, including full S01, mini S01, reduced-motion mini S01, FG04 preview and a clean browser console. The first invocation failed only because no server was listening at `127.0.0.1:4173`; after restoring the local static server, the unchanged browser gate passed in full.
- Curriculum cross-checks passed: curriculum/story `54/54` and curriculum facts `105`.
- Evidence boundary remains fail-closed: 369a browser geometry proves only treble C4-G4. Bass C3-G3 is theory/contract-correct but LP08-LP10 runtime, physical iPad, teacher and child evidence remain missing. No runtime, observation, integration or release approval changed.

## 2026-08-02 - Development Plugin Capability Routing Audit

- The current runtime remains the existing HTML/CSS/JavaScript application. No React, Phaser, Three.js, Swift/Xcode or Figma project file exists in the runtime repository, so installing plugins does not authorize a framework migration.
- `Game Studio` is useful now for structured player-path playtests, screenshot-based overlay/HUD review, responsive and reduced-motion checks, and tightly bounded sprite normalization. `Build Web Apps` is useful now for rendered frontend debugging and must use the Browser path first when available.
- Figma MCP authentication was successfully probed. Figma may hold design-system variables and reviewable map/lesson/dialogue/keyboard/settlement state candidates after a target file is supplied or explicitly created, but those artifacts cannot change curriculum, code, asset provenance or approval state without independent supervisor review.
- `Build macOS Apps` is not an iPad/iOS tool and is out of scope for the current Web runtime and the read-only nonqualifying native prototype. It cannot provide Xcode iOS build, signing, physical iPad or TestFlight evidence.
- Current routing status is `plugin_routing_audited / browser_game_playtest_workflow_allowed / figma_design_candidate_only / macos_plugin_out_of_scope_current / no_framework_migration / no_automatic_approval`.

## 2026-08-31 - 369f-369h Current Product Rectification Closeout

Current live correction: `overhaul-369h-s01-visual-focus`. Frozen PWA/static-recovery baseline: `overhaul-369e-ipad-settlement-compactness-correction`. Frozen adult observation baseline: `overhaul-359a-map-shell-scroll-reset`.

- `369f` corrected map progress truth without changing session or lesson evidence. An active zero-input LS05 now names the last genuinely completed LS04 world result instead of presenting LS05 as both completed and current; LS04 completion copy no longer promises a stop before the immediately available LS05 route. Focused evidence passed LS04 `40/40`, LS05 `67/67`, child course director `111/111`, and nonblocking feedback `78/78`.
- `docs/117_REDUCED_CUE_EVIDENCE_HONESTY_AUDIT_2026-09-02.md` found a real P1 answer-carrier leak in M07 check/opening review and S01 check. `369g` removed future route answers and sequence-bearing ARIA from M07, and retained the true S01 staff question while hiding answer letters and locators until a genuine wrong response. The final reduced-cue audit passed `47/47`; course order, input budgets, wrong thresholds, session identity and `played/stable/retained` were unchanged.
- `docs/118_SAME_SITTING_INPUT_BUDGET_AUDIT_2026-09-03.md` measured all 23 current runtime bundles and marked `C1-06=13`, `C1-07=15`, and `C1-09=11` as high-load upper-bound cases. Its ten-session five-review / 40% result is explicitly a `global-spacing-policy-stress-upper-bound` with `reachableContentPlaythrough=false`, not a canonical child route. Neither `same-sitting-short-review` nor `new-story-first` was integrated; a qualified teacher review and directional child evidence remain prerequisites.
- `369h` is a CSS-only S01 focus correction. Inactive pads, progress marks, remote destination glow, footprints, route effects and background decoration were reduced so the current staff position and keyboard remain dominant in guided, check, first-wrong and reduced-motion states. The focused gate passed `41/41`; eight original-size captures in `screenshots/s01_visual_focus_369h/` were reviewed at `1024x768 DPR1` and `1194x834 DPR2`. Staff mini `20/20`, staff readability `13/13`, staff repair `27/27`, motion `19/19`, iPad accessibility `43/43`, and reduced-cue `47/47` remained passing.
- Privacy/current-candidate attribution was corrected without changing the privacy inventory. `tools/web-privacy-surface-audit.mjs` now verifies the exact chain `369h -> 369g -> 369f -> 369e`; it prints 369h as the live unapproved correction and retains 369e only as the frozen PWA/static-recovery baseline. Current-state privacy passed `73` fact checks with six persistent keys, two tab-session keys, zero external runtime URLs and the same five unresolved privacy blockers.
- Final shared verification passed: `check:quick`; `check:bundle:strict` at `54` files / `1,948,942` runtime-asset bytes; PWA shell `11/11`; sessions `74/74`; child note names `286/286`; and `git diff --check` with no whitespace error (only existing line-ending normalization warnings).
- This closeout does not requalify PWA or grant runtime, integration, observation or release approval to 369f, 369g or 369h. All four approval booleans remain `false`. The 369e Service Worker/cache, cold-offline and static-recovery evidence stays historical and bounded; 369h does not claim a new visible build or PWA qualification.
- Remaining evidence is unchanged: physical iPad Safari, qualified preschool-piano teacher review, child observation, real MIDI and acoustic-microphone validation, final voice/SFX listening, visual source-rights and external-similarity clearance, qualifying native privacy/release archive, TestFlight and store evidence are still missing or incomplete. Mature-app release remains blocked by 13 requirements.

## 2026-08-31 - TH07 Canonical Voice Copy Decision

- The course owner approved one Dongdong line for future optional TH07: `咚咚托稳大地。花朵——等你叫醒。`. It is fixed canonical source copy, not a runtime cue or recording authorization.
- The line may occur at most once before each TH07 bar and must finish before model/target piano. Wrong repair, replay and later TH08 together-encore do not repeat it. Note order, input budgets, paired timing, hand evidence, settlement and story completion remain unchanged.
- The source-only inventory is now `25 recording_ready_unrecorded / 0 dynamic_ui_only / 14 teacher_gated_provisional / 0 copy_missing` with 58 unique fixed literals. Voice authorization, recording, human listening, teacher/device review, runtime integration and release clearance remain missing or false.
