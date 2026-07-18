# Gate Run Log

This file records concrete pass/fail evidence for UI, teaching, and polish gates. It is not a substitute for the acceptance rules in `15_ACCEPTANCE_GATES.md`; it is the evidence trail.

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
