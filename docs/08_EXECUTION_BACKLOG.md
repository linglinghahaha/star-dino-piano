# Execution Backlog

## Phase 0: Alignment Files

Status: complete.

Deliverables:

- product north star;
- competitive positioning;
- pedagogy and gameplay model;
- content roadmap;
- visual/audio/interaction standards;
- implementation guardrails;
- Apple ecosystem strategy;
- A-G later-project parking lot;
- scaffold and assessment rules;
- story world bible;
- App Store compliance and privacy guardrails;
- business wedge and App Store story;
- planning audit and correction priorities;
- note identity matrix;
- hard acceptance gates;
- asset manifest;
- current planning review;
- teaching proof matrix.

Acceptance:

- docs exist in `docs/`;
- later implementation can point to a specific document for each decision.

## Phase 1: Teaching Logic Repair

Status: in progress.

Goal: stop the main loop from being only color/glow following.

Tasks:

- add `phase`, `focus`, `concepts`, and `scaffold` metadata to levels;
- create a shared note-teaching helper for solfege, letter name, key locator, and staff hint;
- update normal level prompt, target card, dino bubble, and wrong feedback;
- make workshop parts carry scaffold-aware note identity: a large `C/D/E/F/G` letter name, smaller solfege when space allows, and a thin note-color edge in guided teaching; Xingya's speech may reverse the hierarchy. Reduce or withhold target-specific cues before action in checks;
- add staged no-input coaching through Xingya: gesture first, then the currently allowed note-name clue, then keyboard locator or target replay; every stage must update cue-strength evidence;
- record response time only as parent/teacher diagnostic data, starting after prompt audio and transition animation settle; never show a child countdown or use speed to deduct stars or decide mastery;
- keep canonical story sequences in order, and place missed items into a separate spaced review queue only where the curriculum defines a review/check segment; cap retries so the app never loops a child indefinitely;
- replace competitive speed ranks with cumulative child rewards for story completion, recovery, and reduced-cue independence; keep numeric accuracy, timing, hint use, and confusion pairs in the parent view;
- make color an assist, not the only instruction;
- make scaffold level change actual cue strength, following `09_SCAFFOLD_AND_ASSESSMENT_RULES.md`;
- remove old color/glow-only fallback text from HTML;
- align note labels, staff hints, and story objects with `14_NOTE_IDENTITY_MATRIX.md`;
- keep A-G word typing disabled.

Acceptance:

- M01 teaches large `C + 2-black left`, while Xingya says `Do`;
- M02 distinguishes `C/D/E` by locator, not only color;
- M08 prepares `C-D-E-F-G`;
- wrong input tells the child what was pressed and what to try;
- at least one light-scaffold check can be completed without object-color matching.
- a guided workshop part can visibly connect large `C` with Xingya's `Do` and its locator without recoloring the entire object into the answer;
- a no-input hint never reveals the target immediately, and any answer-revealing hint prevents that run from counting as reduced-cue stable evidence;
- response time is stored without changing child reward, story progress, or `played / stable / retained` meaning;
- a missed review item can return after spacing, but the session reaches a natural stop instead of repeating until perfect.

Current progress:

- level metadata exists;
- shared note identity helper exists;
- normal prompts, target card, dino hint, and wrong feedback use note identity;
- HTML fallback text no longer describes color/glow-only play;
- `light` scaffold now hides strong target glow until wrong input;
- C-D-E-F-G levels now show early staff-position hints;
- build-scene target sockets now follow light-scaffold cue fading;
- parent view now shows the current learning objective;
- planning docs now include direct child note-reading competitors, mastery gates, F/G transition rules, asset records, child-data guardrails, and the planning audit in `13_PLANNING_AUDIT_AND_FIXES.md`.
- F/G micro-levels now exist in the course flow before S01;
- local mastery records now distinguish "played once" from "stable" for parent view.
- 12-node island map route has been recomposed so F/G prep appears as the path into S01;
- S01 entry now routes weak F/G mastery back to the next needed prep level;
- S01 completion can route F/G weakness inside the bridge back to an F/G repair level;
- S01 attempts now record target-key cue strength, so a strong-glow pass is not counted as stable mastery.
- S01 now auto-routes from the generous guided pass into a reduced-cue replay/check pass.
- Key build/prep checks now auto-route into reduced-cue replay before counting stable mastery: `M07`, `M08`, and `FG01-FG04`.
- M03 now includes the first touch-only listening seed: the app plays the wheel's note and the child finds the matching on-screen key without microphone or MIDI.
- Child-flow controls are cleaner: MIDI/microphone and level-skip controls are treated as parent/dev surfaces instead of default child-facing controls.
- Canonical mastery thresholds now live in `09_SCAFFOLD_AND_ASSESSMENT_RULES.md`; A/B are documented and implemented as reserved expansion notes; microphone input is treated as experimental evidence and cannot count as stable mastery yet.
- M01-M08 and F/G prep level copy now use story-first titles and parts (`第一块月亮地板`, `大跳墙`, `桥前小地图`) instead of color-first placeholder labels.
- Main play scenes now include an in-scene story ribbon and clearer dino bubble so the story problem is visible inside the play area, not only in the side task card.
- Child-facing character naming has been simplified around `星芽`; old per-note dino names were removed from the live UI so the child does not have to learn a separate mascot for every note.
- Keyboard locator cues now include small black-key group pictures on target cards, coach bubbles, story ribbons, and piano keys, reducing reliance on reading `2黑左` / `3黑左中` text.
- A/B reserved keys now remain visible for true piano geography but are visually dimmed so they no longer compete with the first-course C-G targets.
- Reserved-key wrong input now says the key is for later and redirects the child to the active target note.
- The first gate-run log now exists in `20_GATE_RUN_LOG.md`.
- Reserved A/B target use now hard-fails in course validation instead of only logging a warning.
- Runtime WebP assets now exist in `assets/runtime`; active app/image/CSS references use the compressed runtime group while `assets/generated` remains the source/provisional art directory.
- `overhaul-277` logged M03 and S01 runtime-asset evidence in `20_GATE_RUN_LOG.md`; runtime WebP files total 1,267,472 bytes.
- `18_CURRENT_PLANNING_REVIEW.md` now includes a code-and-file audit against the current implementation, including the M01 introduced/stable wording mismatch, iPad Web MIDI promise risk, and the need for full vertical-slice gate evidence.
- `overhaul-279b` fixed the M01 introduced/stable mismatch at code level: a guided M01 correct input no longer increments stable mastery, while parent copy still says `已认识 Do/C`.
- Parent MIDI copy now matches the iPad/Web platform promise: Web MIDI is only a partial-browser option, and iPad web should use screen keys first.
- `overhaul-279d` added a M03 visual listening guide: first run shows `听一声 -> 找同样键`, and wrong input reveals `Re/D -> 2黑中`.
- M03 parent mastery now requires two no-wrong stable completions before saying `听音稳定`, matching `09_SCAFFOLD_AND_ASSESSMENT_RULES.md`.
- `overhaul-280b` reduced ordinary-level text duplication: initial feedback is shorter, wrong feedback now uses compact repair copy such as `这是 Re/D。要 Do/C：2黑左。`, and the visible coach bubble now reads compact states like `当前音 Do/C 2黑左` instead of repeating the level title and long locator.
- `overhaul-280b` screenshot evidence now exists for `M01`, `M03`, `M08`, `FG03`, and `M01` wrong input in `20_GATE_RUN_LOG.md`; `node --check app.js` and browser console checks passed.
- `overhaul-281b` made the left in-scene story ribbon icon-led: it now uses the current part artwork, a short story line, note pill, black-key mini-map, and compact staff chip instead of direct long `storyNeed` text.
- `overhaul-281b` fixed generated inline asset URLs in `imageCssUrl()` so the new story-ribbon part icons render correctly; screenshot evidence exists for `M01`, `M03`, `M08`, `FG03`, and `M01` wrong input.
- `overhaul-282a` softened M01 parent mastery wording from `已认识 Do/C` to `已见过 Do/C`, matching the rule that M01 is played/introduced but not stable mastery.
- `overhaul-282a` simplified FG03 into a star-pad route: the old `Mi -> Fa -> Sol` title and duplicated right-side target/coach cards are hidden, the dino marker sits on the current pad, and future `Fa`/`Sol` labels are quieter.
- `overhaul-282a` screenshot evidence now exists for `FG03` initial, `FG03` wrong input, and `M01` parent state in `20_GATE_RUN_LOG.md`; `node --check app.js` and browser console checks passed.
- `overhaul-285c` added and tightened an opt-in no-reading audit mode (`?audit=no-reading` / `?checkMode=no-reading`) that hides prose-like hints, locator words, guide labels, and small key letters while keeping large solfege, story objects, staff pads, black-key locator graphics, and real keyboard geometry visible.
- `overhaul-285c` screenshot evidence now exists for `S01` no-reading initial at `1366x1024` and `1024x768`, plus `M01` no-reading initial at `1366x1024`; `node --check app.js`, browser console, and overflow checks passed.
- `overhaul-286a` tightened no-reading audit visuals for `M03` and `FG03`: listening guide words are hidden in favor of sound/key icons, story note pills collapse instead of leaving blank answer labels, FG03 future star pads no longer reveal `Fa/Sol`, and the current FG03 route pad shows a compact solfege-only badge.
- `overhaul-286a` screenshot evidence now exists for `M03`, `FG03`, and `S01` no-reading initial/wrong states at `1366x1024`; `node --check app.js`, browser console, and overflow checks passed.
- `overhaul-287b` fixed the `1024x768` no-reading `M08` answer-card leak: normal-level story/coach/target cue layers now show solfege-only labels in `audit=no-reading`, so the right-side coach bubble no longer exposes `Do/C`. Screenshot evidence now exists for `M08`, `M03`, `FG03`, and `S01` no-reading initial/wrong states at `1024x768`; `node --check app.js`, browser console, and overflow checks passed.
- `overhaul-288a` tightened the `M03` listening seed itself: before a wrong input, the stage note/coach/target cue now show a sound prompt (`♪`) instead of revealing `Re`; after a wrong `Do/C`, the screen reveals `Re/D -> 2黑中` for repair. Screenshot evidence exists for normal and no-reading initial/wrong states at `1024x768`; `node --check app.js`, browser console, and overflow checks passed.
- `overhaul-289a` finished the partial two-step `M03` listening comparison: the map and cache version now match the runtime, the level plays `Re/D` then `Do/C`, the second target returns to a hidden-answer `♪` state, wrong `Re/D` on step 2 reveals `Do/C -> 2黑左`, and completion works through touch only. Screenshot evidence exists for no-reading initial, step-2 initial, wrong, completion, and normal initial states at `1024x768`; `node --check app.js`, browser console, and overflow checks passed.
- `overhaul-290a/290b` verified the main S01 vertical slice: guided start, wrong `Re/D`, guided completion, automatic reduced-cue replay, check completion, and parent `谱桥稳定` state are now logged. `290b` also fixed the no-reading staff toast prose leak at `1024x768`; `node --check app.js`, browser console, and overflow checks passed for the checked no-reading wrong state.
- `overhaul-291a` added an explicit `?audit=color-reduced` mode and verified the S01 wrong-state repair without note/object color solving. It also changed no-reading S01 toast feedback from transparent prose to a generated visual toast: note badge + repair icon + black-key locator map.
- `overhaul-291b` verified full S01 color-reduced guided/check completion and repaired the parent learning summary after stable S01 so it says `星桥 C-G 谱位 · 已稳定` instead of showing only the last note.
- `overhaul-292b` gives `M08` a foreground roof-scale route and hides the repeated right-side answer card, stage note orb, and coach overlay for that level. A correctly paced `C-D-E-F-G` touch run now auto-enters `level-check`; the check start has `keyboardTargetVisible=false` and route text `Do/C 自己找`, while wrong `Re/D` reveals `Do/C -> 2黑左`. Screenshot evidence exists in `20_GATE_RUN_LOG.md`.
- `overhaul-293b` gives `FG03` a cleaner three-star foreground route, hides the duplicated left story ribbon and repeated target/coach layers for that level, and verifies color-reduced guided/wrong/auto-check/check-wrong states at `1024x768`. In check mode, future pads show only `2` and `3`, `keyboardTargetVisible=false` before action, and wrong `Re/D` reveals `Mi/E -> 2黑右`.
- `overhaul-294b` gives `M07` a foreground five-star memory string for `C-D-E-D-C`, hides duplicated target/story/coach layers for that level, and verifies color-reduced guided/wrong/auto-check/check-wrong states at `1024x768`. In check mode, future pads show only `2/3/4/5`, `keyboardTargetVisible=false` before action, and wrong `Re/D` reveals `Do/C -> 2黑左`.
- `overhaul-295a` changes M07/FG03 wrong-input repair from a white floating card into a compact in-scene route signal with target solfege badge, repair gesture, and black-key locator mini-map. Guided wrong and `level-check` wrong states are verified at `1024x768`; future check pads still hide the answer sequence until the wrong input.
- `overhaul-296b` enlarges and lowers the M08 roof route so it reads more like the foreground roof-building game rather than a small UI trail. At `1024x768`, initial/wrong/check/check-wrong states are verified, check mode starts with `keyboardTargetVisible=false`, and wrong `Re/D` reveals `Do/C -> 2黑左` through the route tile, target key, and route repair signal.
- `overhaul-296c` reduced the remaining M08 route-title pill into a small roof-piece plus arrow scene signal. At `1024x768`, color-reduced initial, reduced-cue initial, and reduced-cue wrong states were logged in `20_GATE_RUN_LOG.md`; that pass loaded `overhaul-296c`, and `quality-overrides.css` was `1,610,833` bytes.
- `overhaul-297b` makes M08's roof route more physical: the latest correct roof piece enters a temporary `just-locked` state, lock studs remain on completed pieces, the correct toast is compressed into a small in-scene roof confirmation, and the temporary lock state clears back to ordinary `done` after the landing animation. At `1024x768`, color-reduced initial, correct early/settled, guided-to-check, and check wrong states are logged in `20_GATE_RUN_LOG.md`; `index.html` now loads `overhaul-297b`, `app.js` is `169,439` bytes, and `quality-overrides.css` is `1,622,494` bytes.
- `overhaul-298a` gives S01 adaptive first-run F/G support: when stored F/G prep is weak, or the current S01 attempt has already missed F/G, the current `Fa/F` or `Sol/G` staff pad gains a compact mini-support marker and locator cue. Stable F/G prep receives no extra marker, and `staff-check` still keeps `keyboardTargetVisible=false` before action. Evidence is logged in `20_GATE_RUN_LOG.md`; `index.html` now loads `overhaul-298a`, `app.js` is `171,087` bytes, and `quality-overrides.css` is `1,627,329` bytes.
- `overhaul-299a` compresses the S01 bottom/right staff feedback card into a small bridge signal. Wrong, correct, and no-reading wrong states are logged at `1024x768`; `index.html` now loads `overhaul-299a`, `app.js` is `171,007` bytes, and `quality-overrides.css` is `1,630,860` bytes.
- `overhaul-300a` changes the S01 dino bubble from note/staff/key explanation into action-led hints: initial `跳亮垫`, wrong `看落点`, correct `下一跳`, done `到星门`. No-reading still hides the bubble. Initial/wrong/correct/no-reading wrong states are logged at `1024x768`; `index.html` now loads `overhaul-300a`, `app.js` is `171,009` bytes, and `quality-overrides.css` is `1,633,940` bytes.
- `overhaul-301a` changes ordinary S01 stage toasts from explanatory cards into compact bridge events: wrong `Do / 看落点 / 亮垫 Do`, correct `Do / 落稳 / 下一跳 Re`, while no-reading remains icon/locator-only. Initial/wrong/correct/no-reading wrong states are logged at `1024x768`; `index.html` now loads `overhaul-301a`, `app.js` is `171,065` bytes, and `quality-overrides.css` is `1,637,285` bytes.
- `23_TEACHING_PROOF_MATRIX.md` now maps the vertical slice skills to proof levels, stable conditions, parent evidence, and real-child gates so visual polish cannot be mistaken for teaching proof.
- `03`, `09`, and `24` now define the canonical 3-5 minute preschool session bundles, automatic in-session flow, natural story rest points, and the difference between `played`, current-period `stable`, and later-session `retained` evidence. These are curriculum-complete but not yet implemented as a full session scheduler or retained-progress state.
- `overhaul-302a` adds a scripted clean-state teaching-slice regression: it clears local storage, runs `M01`, `M03` twice, `M08`, `FG01-FG04`, and `S01`, verifies reduced-cue/check answer hiding where expected, and records parent states from introduced/played to stable. The run passed `124` checks with `0` failures; evidence is logged in `20_GATE_RUN_LOG.md`.
- `overhaul-307a` adds a subtle S01 bridge-rail/landing-pad glow and reruns the current S01-mini plus clean-state teaching baselines. The fixed pass keeps the current `Do` pad unobscured and still passes `18/18` plus `124/124`; evidence is logged in `20_GATE_RUN_LOG.md`.
- `overhaul-308a` polishes the shared piano-key hierarchy: per-key black-key locator graphics are smaller and secondary, `Do/Re/Mi/Fa/Sol` labels sit lower like real key labels, and target keys use edge glow plus a small state pin instead of a floating card. S01-mini still passes `18/18`, the clean-state slice still passes `124/124`, copy integrity passes, and prototype bundle policy passes with the known CSS warning.
- `overhaul-309a` tightens planning scope and platform copy: the core product proof slice is `M01`, `M03`, `M08`, `FG03`, and `S01`; full-course smoke is `M01-M08`, `FG01-FG04`, and `S01`; `M02` remains required when C/D/E geography or full-course flow changes; one real-child observation is only a directional signal; WebAudio sources are now listed for later audio proof. S01-mini still passes `18/18`, the clean-state slice still passes `124/124`, copy integrity passes, and prototype bundle policy passes with the known CSS warning.
- `overhaul-310a` polishes the S01 staff bridge stage: rectangular/instrument-panel bridge elements are toned down, the star-route layer is softer, and the start/current-pad/finish hierarchy reads more like a playable route. S01-mini still passes `18/18`, the clean-state slice still passes `124/124`, copy integrity passes, and prototype bundle policy passes with the known CSS warning.
- `overhaul-313a` added an active draft S01 wrong-feedback consolidation layer and has partial browser-smoke screenshots plus basic copy/bundle checks logged, but it is not a validated teaching baseline.
- `overhaul-314a` cleaned up the boot overlay fade so the live app no longer shows a stale central brand card at about 250ms. It was superseded by `315a` before becoming the latest clean-state baseline.
- `overhaul-315a` repaired the local Playwright gate runner and validated the then-current S01 active landing-pad polish layer: S01-mini passed `18/18`, the clean-state slice passed `124/124`, `npm run check:quick` passed, and strict bundle still failed as intended on `quality-overrides.css`.
- `overhaul-315b` makes the current S01 `Do` landing pad less cluttered and validates it with explicit S01-mini visual assertions: S01-mini passes `20/20`, the clean-state slice passes `124/124`, `npm run check:quick` passes, and strict bundle still fails as intended on `quality-overrides.css`.
- `overhaul-316a` starts CSS convergence in `current-overhaul.css`, tunes the current S01 staff-pad spacing/background/key-feedback layer, and keeps the current C4-G4 baseline valid: S01-mini passes `20/20`, the clean-state slice passes `124/124`, `npm run check:quick` passes, and strict bundle still fails as intended on `quality-overrides.css`.
- `overhaul-317a` gives the current C4-G4 prototype a shared HUD/staff-line/keyboard finish pass without changing teaching rules: S01-mini passes `20/20`, the clean-state slice passes `124/124`, `npm run check:quick` passes, and strict bundle still fails as intended on `quality-overrides.css`.
- `overhaul-318a` makes S01 read more like a dino jump by strengthening the next-jump arc, footprints, landing-pad shape, and black-key proportions while preserving teaching rules: S01-mini passes `20/20`, the clean-state slice passes `124/124`, `npm run check:quick` passes, and strict bundle still fails as intended on `quality-overrides.css`.
- `overhaul-319a` preserves the accepted `318a` C4-G4/S01 behavior while replacing the `1,752,783` byte monolithic override source with four byte-identical safe-deduplicated/minified segments totaling `779,272` bytes. S01-mini passes `20/20`, the clean-state slice passes `124/124`, `npm run check:quick` passes, strict bundle now passes with no temporary exception, and the map + staff + M01-M08 Playwright smoke has no browser errors. This is implementation regression evidence only; it does not implement the general preschool session scheduler, later-session `retained` state, or real-child observation.
- `overhaul-320a` adds note-priority WebAudio mixing and parent-gated sound comfort controls without changing curriculum semantics. M03 now plays an unmasked target pitch, correct/wrong/black-key feedback no longer supplies a stable teaching pitch, the effect bus is capped below the note bus, and game sound persists with an on/off toggle plus a 0-70% volume slider. Audio contract passes `22/22`, audio settings pass `13/13`, S01-mini passes `20/20`, clean-state passes `124/124`, quick/strict bundle pass, and map + staff + M01-M08 smoke has no browser errors. Real iPad loudness/timbre and child comfort remain unproven.
- `overhaul-321a` applies the user-approved A-G palette across runtime note identities, all level-part colors, key-edge cues, letter labels, routes, and feedback: C purple, D orange, E green, F magenta, G blue, A pink, B teal. A/B stay reserved/dimmed. The palette gate passes `16/16`, including color-reduced wrong/recovery/completion; S01-mini passes `20/20`, clean-state passes `124/124`, quick/strict bundle pass, and map + staff + M01-M08 smoke has no browser errors. The external screenshot is an internal hue reference only; no third-party character, branding, layout, or asset is shipped.
- `overhaul-322a` adds a persisted parent reduced-motion control and automatically respects the device `prefers-reduced-motion` setting. Continuous route/dino/map/celebration animation and moving particle labels stop, remaining transitions reduce to `1ms`, while physical key depression and static correct/wrong/hint outlines remain. The motion gate passes `19/19`, audio settings `13/13`, palette `16/16`, S01-mini `20/20`, clean-state `124/124`, quick/strict bundle pass, and map + staff + M01-M08 smoke has no browser errors. This is a comfort/accessibility implementation only and does not change curriculum semantics.

Remaining:

- keep the `322a` clean-state and comfort-control run as the current validated regression baseline and add real child usability checks; `M07`, `M08`, `FG03`, `FG04`, and `S01` now have current color-reduced/reduced-cue proof, and `M01`, `M03`, `M08`, `FG01-FG04`, and `S01` have clean-state parent-state proof, but 4-6-year-olds still need observation evidence so they do not solve only from color or depend on reading `Do/C`, `2黑左`, or staff-position words;
- treat one observed child as a directional usability signal only; require 3-5 observed 4-6 children before calling the low-age flow proven;
- continue the audio release ledger started in `16_ASSET_MANIFEST.md`: `320a` records the WebAudio generators, note/effect bus roles, source-frequency audit, and parent controls, but real-device loudness, timbre, headphone safety, and child-comfort approval remain open;
- implement the canonical short-session and natural-rest contract from `03`, `09`, and `24`; `S01-mini` proves one observation rest point only, not the complete session scheduler;
- add a separate later-session `retained` evidence state or equivalent timestamped review record; do not rename existing same-session `stable` history as long-term retention;
- keep historical `13_PLANNING_AUDIT_AND_FIXES.md` corrections only when they have been folded into `18_CURRENT_PLANNING_REVIEW.md`, `23_TEACHING_PROOF_MATRIX.md`, or this backlog;
- run full visual screenshot review after the next UI pass;
- continue visual screenshot review and asset polish across play/staff/map screens;
- continue ordinary-level low-age visual polish; FG03 and M07 now have cleaner in-scene route repair signals and M08 has a more physical roof-lock route, but multi-note levels still rely on several visible labels/title pills;
- continue S01 proof now that adaptive F/G first-run support, compact bridge feedback, action-led dino hints, compact event toasts, bridge-rail polish, keyboard hierarchy polish, `318a` jump-path/keyboard polish, and current clean-state parent-state proof exist; the next gap is real-child comprehension rather than another text-shortening pass;
- `overhaul-303a` implements the `S01-mini` observation mode: it stops after the first three staff jumps, shows a rest point, avoids writing full S01 stable mastery, and preserves the full S01 baseline. The next gap is using it in a real-child observation session;
- expand screenshot and interaction verification beyond the current `M07`, `M08`, `FG03`, `S01`, and `318a` clean-state proofs; the next gap is real-child no-reading observation plus audio/comfort gates;
- keep the product-proof slice centered on `M01`, `M03`, `M08`, `FG03`, and `S01` before spending broad polish effort on every ordinary level;
- keep `M02` in the full-course smoke and C/D/E geography checks, but do not let it expand the core proof slice by accident;
- use `23_TEACHING_PROOF_MATRIX.md` as the traceability gate for the next large UI/gameplay pass;
- keep the code-level `noteIdentityMatrix` and `14_NOTE_IDENTITY_MATRIX.md` synced;
- keep first-course mastery anchored to middle `C4-G4`; before MIDI/microphone mastery claims, decide how octave-equivalent inputs are handled and recorded;
- apply the remaining must-fix findings in `18_CURRENT_PLANNING_REVIEW.md`, especially canonical mastery thresholds, asset ledger fields, and broader parent-gate hardening.
- rerun the full cross-screen vertical-slice pass/fail gate after mastery, reveal-rule, or flow changes before calling the product slice done;
- expand touch-only listening beyond M03's now-hidden-answer `Re -> Do` seed, especially Mi/Fa and later Do/Sol comparisons;
- add pre-reading visual/audio/gesture equivalents for `Do/C`, black-key locator, and staff-position hints;
- mark older Huawei/HarmonyOS planning files as historical so current iPad/web planning remains the source.
- treat root-level `DESIGN_AUDIT_AND_ASSET_PLAN.md` and `ASSET_MANIFEST.md` as historical unless their useful rows are copied into the active `docs/` files;
- add basic automated gates for note-matrix sync, reserved A/B targets, reveal-rule leaks, reduced-cue target glow, and production bundle exclusions;
- production bundle exclusions must cover root screenshots/contact sheets, `chrome-test` browser cache files, raw/generated source art, and unused concept art, not only runtime assets;
- add an actual-region child-privacy review before cloud sync, accounts, analytics, exports, subscriptions, or public App Store release;
- continue semantic CSS cleanup; `319a` reduces the former `1,752,783` byte monolith to four strict-budget segments totaling `779,272` bytes, while `current-overhaul.css` is `41,157` bytes after the current palette and reduced-motion layers. The strict bundle gate passes, but historical selector ownership and total CSS volume remain release debt.
- before another large generated-art pass, decide which staff backgrounds, dinosaur poses, effects, and audio sources are kept, and mark the rest retired/source-only in `16_ASSET_MANIFEST.md`.

Planning repair gates before broad polish:

- fixed-do assumption is kept consistent across prompts and parent copy;
- 4-6 and 6-8 age-band implications are reflected in child text density;
- note identity matrix for C-D-E-F-G is maintained before adding new content;
- parent learning view and parent-gated settings remain separate;
- microphone is optional and not used as hard mastery proof yet;
- touch-only listening practice exists before microphone is treated as a product promise;
- major UI and gameplay changes pass the gates in `15_ACCEPTANCE_GATES.md`;
- CSS override growth is treated as product debt, not just implementation detail.
- asset and CSS file sizes are checked against `16_ASSET_MANIFEST.md` before release-level polish;
- every logged gate run records screenshots, viewport, pass/fail, wrong-input result, and parent-state result.
- every real-child observation records adult intervention, first visual focus, wrong-input recovery, story-result recognition, sound on/off, and whether a manual close/next explanation was needed.
- parent copy distinguishes guided play, current-period reduced-cue stability, and later-session retention; child story progress never waits for retained evidence.

## Phase 2: Staff Star Bridge Polish

Goal: make S01 the flagship mechanic.

Tasks:

- keep staff bridge large and clear;
- make current staff note pad obvious;
- make future notes quieter but readable;
- align dinosaur jump to staff positions;
- make final destination automatic;
- reduce abstract text.

Acceptance:

- child can see left start, staff bridge, right finish;
- each jump teaches staff position + note name + keyboard locator;
- wrong input causes a visible stumble and target hint;
- no top UI element steals space from the bridge;
- first "played once" completion and reduced-cue "stable" completion are tracked separately.

Current progress:

- S01 correct/wrong feedback now reads as a bridge event: correct says where Xingya landed and what the next staff position is; wrong says what was pressed, where Xingya should land, and which key locator to use.
- Staff event toast was restored after an older override had hidden it; toast now appears near the upper-right stage area and bottom event feedback appears above the keyboard.
- Verified with `node --check app.js`, browser interaction, and screenshots:
  - `screenshot_staff_event_270_wrong.png`
  - `screenshot_staff_event_270_correct.png`
- Staff-mode piano feedback has been calmed down: non-target key locator cards are lighter and mostly icon-only, target/wrong/hint keys keep the teaching label, and staff-mode key labels/sprites/note bursts are smaller.
- The ordinary pointer-down note bubble is suppressed in staff mode so a wrong input no longer creates three competing bubbles.
- Verified with `node --check app.js`, browser interaction, no console warnings/errors, and screenshots:
  - `screenshot_staff_keyboard_272_wrong.png`
  - `screenshot_staff_keyboard_272_correct.png`
- Remaining visual issue: the staff-stage note bubble can still sit a little close to the left start area on early notes. It does not block the staff lines, but the next S01 pass should position dino speech and event toast with a clearer rule.
- Overhaul 278 removed the large empty dark band under S01 by letting the staff stage fill the panel and turning the bottom progress/feedback into a compact floating HUD.
- Verified narrow S01 layout evidence:
  - `screenshot_overhaul_278_S01_fixed.png`
  - `screenshot_overhaul_278_S01_wrong_feedback_positioned.png`
- Remaining S01 issue after the layout recovery: child-facing feedback is still more text-heavy than ideal; the next pass should make staff pad glow, dino gesture, and key locator visuals carry more of the correction.
- Overhaul 279b shortened S01 wrong feedback from a long sentence to a compact bridge hint:
  - before: `刚才是 Re/D；星芽要落到 下方小线 的 Do/C 星垫；找 2黑左。`
  - after: `这是 Re/D。要 Do/C：下方小线、2黑左。`
- Verified evidence:
  - `screenshots/overhaul_279_finalcopy_S01_wrong_D.png`
- Remaining S01 issue: staff-mode DOM audits can still read normal-level fallback/title fields. The visible screen is acceptable, but state ownership should be cleaned before calling S01 release-grade.
- Overhaul 283c made S01 more bridge-first: future/locked staff pads no longer expose note-name labels, completed pads collapse into quiet done markers, and the current pad shows only the large solfege until a wrong input reveals the fuller note/staff clue.
- Verified with `node --check app.js`, browser interaction, no console warnings/errors, no overflow at `1366x1024`, and screenshots:
  - `screenshots/overhaul_283c_S01_initial_bridge_first.png`
  - `screenshots/overhaul_283c_S01_wrong_D_revealed.png`
  - `screenshots/overhaul_283c_S01_after_Do_next_Re.png`
- Remaining S01 issue after 283c: the dino speech bubble and bottom feedback still carry text clues. The next gate should test whether staff position, dino motion, keyboard mini-map, and audio/animation can carry the play without reading.
- Overhaul 284a added a first no-reading visual cue seed inside S01: a small landing-pad icon points to a reused black-key mini-map, with no visible locator text inside the cue. Wrong input brightens the cue; correct input retargets it from `Do/C` to `Re/D`.
- Verified with `node --check app.js`, browser interaction, no console warnings/errors, no overflow at `1366x1024`, and screenshots:
  - `screenshots/overhaul_284a_S01_initial_visual_cue.png`
  - `screenshots/overhaul_284a_S01_wrong_D_visual_cue.png`
  - `screenshots/overhaul_284a_S01_after_Do_next_Re_visual_cue.png`
- Remaining S01 issue after 284a: this is not yet a full no-reading gate. Need a 1024x768 check, text-covered audit, and reduced-cue replay proof before claiming S01 is low-age independent.
- Overhaul 290a/290b added the first strong S01 vertical-slice proof: fresh guided start, wrong input, guided completion, automatic reduced-cue replay, check-mode completion, parent `谱桥稳定` state, no old M01 fallback copy leak in the checked flow, and no-reading wrong-state toast fix at `1024x768`.
- Verified evidence:
  - `screenshots/overhaul_290a_S01_clean_initial_1024.png`
  - `screenshots/overhaul_290a_S01_guided_wrong_D_1024.png`
  - `screenshots/overhaul_290a_S01_guided_complete_modal_1024.png`
  - `screenshots/overhaul_290a_S01_check_initial_1024.png`
  - `screenshots/overhaul_290a_S01_check_complete_stable_1024.png`
  - `screenshots/overhaul_290a_S01_parent_stable_1024.png`
  - `screenshots/overhaul_290b_S01_no_reading_wrong_D_1024.png`
- Remaining S01 issue after 290b: color-reduced play is still not verified, real child usability is still not proven, and no-reading audit still hides text rather than replacing every clue with explicit motion/sound/gesture.
- Overhaul 291a adds the first S01 color-reduced wrong-state proof and replaces the no-reading staff toast copy with icon-led repair feedback.
- Verified evidence:
  - `screenshots/overhaul_291a_S01_color_reduced_wrong_D_1024.png`
  - `screenshots/overhaul_291a_S01_no_reading_visual_toast_wrong_D_quick_1024.png`
- Overhaul 291b adds the full S01 color-reduced guided/check completion proof and fixes parent current-training copy after stable S01.
- Verified evidence:
  - `screenshots/overhaul_291b_S01_color_reduced_initial_1024.png`
  - `screenshots/overhaul_291b_S01_color_reduced_guided_complete_modal_1024.png`
  - `screenshots/overhaul_291b_S01_color_reduced_check_initial_1024.png`
  - `screenshots/overhaul_291b_S01_color_reduced_check_complete_stable_1024.png`
  - `screenshots/overhaul_291b_S01_color_reduced_parent_stable_1024.png`
- Remaining S01 issue after 291b: real child usability still needs observation, and the no-reading version should keep shifting repair work from hidden text toward motion/sound/gesture.

## Phase 2B: Chapter 3 Listening Garden

Status: in progress. Steps 1-4 passed independently at `overhaul-339d`; step 5 (`overhaul-340a / LS04`) is active; step 6 remains locked.

Goal: turn the existing M03 listening seed into a staged story course that links heard piano sound, C/D/E/F/G letter name, Xingya's solfege, real keyboard geography, and neutral story consequences without claiming absolute pitch.

Authoritative contract: `32_CHAPTER3_LISTENING_RUNTIME_CONTRACT.md`.

Implementation order:

1. `[completed at 339d]` Fix the existing handoff surface first: M03 keeps one instruction carrier, and completed S01 rests at the garden entrance rather than routing back to M01.
2. `[completed at 339d]` Add the code-driven Chapter 3 entry fallback: garden-node user gesture, sealed Xingya, atmosphere scan, open/stowed safe state, reduced-motion/static fallback, refresh idempotence. Do not wait for approved video.
3. `[completed at 339d]` Implement only `C3-01` (`LS01-LS02`) and `C3-02` (`LS03`). These are introduction-only, write played/observation evidence, and never enter the mastery opening-review queue.
4. `[completed at 339d]` Stop and audit the visible echo loop, early LS01 rest/resume, letter-first UI, audio priority, touch route, debug isolation, map destination and pending-attempt continuity before adding hidden calls.
5. `[active at 340a]` Implement `C3-03` (`LS04`) as the first hidden C/D set. Prove neutral source, target-free accessibility names, balanced calls, candidate reset, bounded repair, stable/retained separation and the Chapter 3 media-coordinate contract.
6. `[locked]` Only after LS04 passes independently, add `LS05`, then `LS06-LS07`, then `LS08`; do not land all hidden listening families in one unreviewed patch. LS05 stable additionally requires at least one unassisted correct for every C/D/E candidate, and its persistent progress must remain note-neutral.

Acceptance:

- S01 -> garden entrance -> C3-01 is a coherent story route and supplies a browser audio gesture without a next-level modal;
- LS01-LS03 show large C/D/E, Xingya says Do/Re/Mi, and no repeated equivalent identity cards clutter the screen;
- LS01 modeled success rests at the first leaf and the next session resumes LS02 only;
- LS01-LS03 formal completion never creates opening-review, stable, or retained evidence;
- hidden calls use unlabeled piano sound from a neutral source, candidate objects reset before every call, and persistent progress does not reveal prior target frequency;
- LS08 `C-C` requires two discrete onsets on touch, MIDI, and experimental microphone routes;
- all `docs/32` automated gates pass on one frozen browser baseline before any Chapter 4 runtime work begins;
- real iPad, real MIDI/acoustic piano, teacher review, and 3-5 child observations remain separate release gates.

## Phase 3: Art And Animation Polish

Goal: reach mature app-level presentation.

Tasks:

- audit all generated assets for consistent style and update `16_ASSET_MANIFEST.md`;
- improve dinosaur poses: point, listen, happy, try-again, celebrate, jump;
- implement the canonical `星芽龙` identity and three outfit states from `27_XINGYA_SPECIES_AND_SPACE_GEAR_BIBLE.md`;
- replace every moon-surface/open-space helmet-only pose with complete pressure coverage, including gloves, boots and airtight tail sleeve;
- add the automatic Chapter 3 atmosphere-check, rear-hinged helmet-opening and outer-suit-removal transition without a continue button;
- polish note particles, landing ripples, and wrong hints;
- remove placeholder haze and unnecessary labels;
- check screenshots at iPad landscape size.
- compress or replace oversized PNG assets before treating the art pass as release-level;
- reduce broad CSS override debt before adding another large visual layer.

Acceptance:

- no rough placeholder objects dominate the scene;
- animations clarify action result;
- interface feels child-friendly without becoming cluttered;
- used assets have source/prompt/license notes before release-level work.
- vacuum scenes never show bare Xingya torso, limbs, hands, feet or tail; breathable scenes begin only after the safety transition.

Current progress:

- Normal-level wrong/correct input toast no longer stretches into a large overlay; the Overhaul 276 pass constrains it to a compact feedback capsule.
- Species and environment logic are planning-locked: Xingya is the original `星芽龙`; selected source concepts are `xingya-space-exploration-suit-v3.png`, `ch01-moon-little-home-keyframe-v3.png`, and `ch02-staff-star-bridge-keyframe-v3.png`. Runtime implementation and motion proof remain open in the prototype task.

## Phase 4: Input Reliability

Goal: make touch, MIDI, and microphone routes teach the same thing.

Tasks:

- keep touch as default;
- add touch-only listening seed: app plays a note, child finds it on the on-screen keyboard;
- keep MIDI support for browsers that expose it;
- design native iPad Core MIDI plan;
- calibrate microphone listening only for simple note sets first;
- add parent-facing permission explanations.

Acceptance:

- touch path works without hardware;
- listening practice can run without MIDI or microphone;
- MIDI path does not block the game;
- microphone mode is framed as optional and limited until reliable.

## Phase 5: Parent/Teacher Quick View

Goal: make the learning value obvious to adults.

Tasks:

- show current phase;
- show notes introduced;
- show key locators practiced;
- show staff positions practiced;
- show last common mistake;
- show input mode.

Acceptance:

- parent can understand what the child is learning in under 10 seconds;
- child screen remains uncluttered.

## Phase 6: Parent Gate And Release Safety

Goal: keep permissions, settings, external links, purchases, and export out of the child flow.

Tasks:

- define the parent gate interaction;
- add parent-facing microphone permission copy before any microphone request;
- keep external links and purchase flows behind the gate;
- update the child data map before adding sync, accounts, analytics, or export.

Acceptance:

- child play screens do not expose settings or purchase controls;
- microphone remains optional and locally processed for MVP;
- App Store screenshots and privacy copy match actual behavior.

## Phase 7: Later A-G Word Typing Game

Goal: strengthen letter-note names after the main course is solid.

Status: parked.

Do not start until Phase 1-6 are stable and A/B have their own note identity rows.
