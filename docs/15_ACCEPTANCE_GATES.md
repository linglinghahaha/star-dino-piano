# Acceptance Gates

## Purpose

This file turns "polished", "clear", and "child-friendly" into gates that can fail. A UI or gameplay pass should not be called done unless the relevant evidence exists.

## Proof-slice Scope

Use two scopes deliberately:

| Scope | Required screens | When to use |
| --- | --- | --- |
| Core product proof slice | `M01`, `M03`, `M08`, `FG03`, `S01` | proving the current wedge: first note identity, touch-only listening, F/G preparation, E/F/G comparison, and staff bridge |
| Full course smoke slice | `M01-M08`, `FG01-FG04`, `S01` | checking that broad course navigation, C/D/E geography, F/G prep, and parent states did not regress |

`M02` remains the direct C/D/E key-geography level and should be included whenever C/D/E sequencing, map flow, or full-course smoke is being tested. It is not the primary vertical-slice proof level unless the change specifically targets C/D/E geography.

## Core Gate Set

| Gate | Pass condition | Evidence |
| --- | --- | --- |
| Child screen clarity | Character, current target, keyboard area, and story result are visible without reading a paragraph | iPad landscape screenshot and one smaller browser screenshot |
| Teaching loop | Each active step shows note identity plus key locator, staff position, or sound cue | DOM/text audit for the core product proof slice; add `M02` when C/D/E geography is touched |
| Register scope | First-course staff/key mastery is middle `C4-G4`; octave-equivalent inputs do not count as staff mastery unless a level explicitly says octave-agnostic | `14_NOTE_IDENTITY_MATRIX.md` plus MIDI/microphone input-state review before native/audio claims |
| Reduced color reliance | Light-scaffold levels remain playable when object color is reduced | interaction check for M07 and FG03 |
| Staff bridge readability | Five staff lines, current pad, dino, start, and finish are readable without zoom | S01 screenshot at 1366x1024 and 1024x768 |
| Error teaching | Wrong input names the pressed/heard note when known and repeats the target clue | wrong-input check in one build level and S01 |
| Stable mastery | Parent state distinguishes "played once" from "stable" | local stats inspection after easy pass and after wrong-heavy pass |
| Input resilience | Touch can complete the game without MIDI or microphone | touch-only run through the core product proof slice; full-course smoke after flow changes |
| Parent clarity | Parent view explains the current learning goal in under 10 seconds | parent-view screenshot or text capture |
| Copy and encoding integrity | Child-facing and parent-facing strings are readable, intentional, and free of mojibake/placeholder copy | `tools/copy-integrity-audit.mjs` plus visible-text review for parent panel, wrong feedback, key labels, and gate screenshots |
| Parent gate separation | Permission, purchase, external links, export, and settings are not in the child flow | settings/permission flow review before native release |
| Asset readiness | Used assets have source, prompt/license, approved state, and screenshot proof | `16_ASSET_MANIFEST.md` updated |
| IP safety | No protected character, melody, UI copy, sound, or style imitation claim appears; final assets have provenance and independent review | `docs/39` asset/prompt/reference/hash matrix plus external visual/music review |
| Pre-reading support | Child-facing hints do not require reading English or long Chinese labels | black-key mini-map, dino gesture, staff pad highlight, and optional audio/voice plan |
| Preschool cognitive load | Each child-facing state has one primary action question and at most one or two visible support systems competing for attention | screenshot annotation for `M01`, `M03`, `M08`, `FG03`, and `S01`; DOM/text audit for duplicated hint surfaces |
| Performance readiness | Startup assets and CSS stay within the current asset budget or have a cleanup task | asset-size report and CSS-size report |
| No-reading playability | Core screens remain actionable when text labels are visually covered or ignored | M01, M03, M08, FG03, and S01 screenshots/checks with black-key maps, dino gestures, staff highlights, and sound cues doing the work |
| Clean-state mastery | Parent view separates first play from stable mastery from a fresh local-storage state | clean-storage run for M01, M03, one reduced-cue level, and S01 |
| Preschool session shape | A child can complete a short satisfying session without endless drilling | canonical bundle from `03/09/24`: 2-3 tiny actions, one review/check, one story reward, natural pause, and no close/next-modal explanation |
| Retention honesty | Same-session reduced-cue success is not presented as long-term retention | parent-copy review plus a later-session/timestamped retrieval record before any `retained` claim |
| Audio asset readiness | Piano tones and effects are pitch-correct, licensed/original, and do not mask the note | audio ledger with source/license, volume target, sample/synthesis method, and in-app proof |
| Reveal-rule correctness | Teach/listen/check/staff modes reveal the right amount of help and do not leak answers in listening/check states | DOM/text check plus screenshots before action and after wrong input |
| Comfort/accessibility | App remains usable with lower brightness, reduced motion, sound off, and color not carrying the answer | screenshot pass, motion setting pass, sound-off pass, and color-reduced interaction check |
| Teaching proof traceability | Every claimed learning outcome maps to a proof level, stable condition, and parent-facing evidence | `23_TEACHING_PROOF_MATRIX.md` row plus gate-run evidence |

## Pre-reading Hint Contract

For 4-6-year-old readiness, every child-facing text clue needs at least one non-text equivalent.

| Text clue type | Required non-text equivalent |
| --- | --- |
| visible letter name such as `C`, `D`, `E` | piano sound, key geography, staff/route location, or note-character action |
| dinosaur dialogue solfege such as `Do`, `Re`, `Mi` | the same note's visible letter/key location or a clear musical action |
| `2黑左`, `3黑左` locator | black-key mini-map or direct keyboard geography highlight |
| staff position words such as `第一线` | current staff pad glow, landing marker, dino pointing/jump arc |
| "try again" repair copy | wrong-key wiggle, target pulse, dino gentle stumble, or replayed sound |
| sequence order | path dots, object motion, or dino route movement |

Passing `?audit=no-reading` is useful evidence, but it is not enough by itself. A low-age pass requires the child to infer the action from visual, audio, and motion cues, not from hidden text that still secretly drives the layout.

## Real-child Observation Gate

Scripted checks can prove that screens do not leak answers, overflow, or break state. They cannot prove that a 4-6-year-old understands the task.

All observations follow `37_TEACHER_AND_CHILD_OBSERVATION_PROTOCOL.md`. An informal family play session without build id, adult-intervention coding, privacy boundaries, wrong/recovery evidence, and a natural-stop record is useful feedback but cannot pass this gate.

| Claim level | Minimum evidence |
| --- | --- |
| Directional usability signal | one observed 4-6 child completes one relevant short observation, especially `S01-mini`, with adult intervention logged |
| Low-age usability claim | 3-5 observed 4-6 children complete the keyboard-home, listening, and staff-bridge observation sessions on separate short runs, with at least one wrong input and recovery, without adult reading the task text step by step |
| Release confidence | repeat the observation after final art/audio/CSS changes, because visual polish can change where children look |

Each observation note must record:

- age band and device/viewport;
- whether sound was on or off;
- whether an adult pointed, read, or explained;
- where the child looked first after load;
- first wrong input and recovery path;
- whether the child noticed the story result;
- whether the session reached a natural pause without needing a close/next-button explanation.

## Reveal-rule Gate

Before calling a teaching slice done, verify these states:

| Mode | Must verify |
| --- | --- |
| first exposure | target identity and locator are clear before action |
| guided sequence | sequence route is visible, but color is not the only answer |
| listening | answer key/name is hidden before action; wrong input reveals repair clue |
| reduced-cue check | strong target-key glow is absent before action; wrong input reveals temporary help |
| staff bridge | current staff pad is visible; wrong input reveals staff position and key locator |

If a listening or check screen exposes the exact answer before the child acts, the gate fails unless the screen is explicitly a teach/first-exposure screen.

## Gate-Run Log Requirement

Every major UI/gameplay pass should leave a short gate-run record. Minimum fields:

| Field | Meaning |
| --- | --- |
| Date | when the gate was run |
| Build/version | HTML version query or commit/work note |
| Viewport | e.g. `1366x1024`, `1024x768`, smaller browser |
| Screens checked | M01, M03, M08, FG03, S01, map, parent view as relevant |
| Input route | touch, MIDI, microphone, or simulated |
| Pass/fail | explicit result for each gate |
| Screenshot path | local screenshot evidence |
| Wrong-input result | what the child saw after a wrong note |
| Parent-state result | whether "played once" and "stable" were separated |
| Retention result | whether any retained claim came from a genuinely later session rather than the first guided/check cycle |
| Clean-state result | whether the run started from reset/local-storage-cleared progress when mastery was being tested |
| No-reading result | whether the screen remained solvable without relying on text labels |
| Color-reduced result | whether the screen remained solvable without matching object color |
| Notes | overlap, readability, asset, or performance issues |

No broad visual polish pass should be called done without a gate-run record.

Current baseline automation: rerun `chrome-test/clean-state-slice-check.mjs` after mastery, reveal-rule, or flow changes. It is the clean-state regression for `M01`, `M03`, `M08`, `FG01-FG04`, and `S01`, but it does not replace real-child observation, audio proof, or release asset/CSS gates.

Current bundle automation: run `node tools/production-bundle-audit.mjs` after asset/reference changes. Prototype policy mode and `node tools/production-bundle-audit.mjs --strict` must both pass for any promoted browser baseline. The current independently validated `overhaul-343a-p2` baseline passes strict mode with 41 runtime files and 1,641,265 runtime bytes; every later draft must rerun it with its own version, sources and runtime references before promotion. A historical exception cannot silently return.

Version-baseline rule: the runtime version query in `index.html` must not be treated as proof by itself. If the app loads a newer version than the latest `20_GATE_RUN_LOG.md` entry, call it a draft. A version becomes the current baseline only after its relevant script checks, screenshots, bundle result, and pass/fail notes are logged.

## Stage Exit Gates

### Web Prototype

Pass when:

- touch-only play works;
- `M01`, `M02`, `M03`, `M08`, `FG03`, and `S01` are playable;
- no major layout overlap appears at iPad landscape size;
- MIDI and microphone are clearly optional.

### Teaching Vertical Slice

Pass when:

- C-D-E-F-G have stable note identity coverage;
- S01 is fun and legible enough to be the flagship mechanic;
- reduced-cue levels cannot be solved by color alone;
- wrong inputs create clear, gentle teaching moments;
- parent view shows the exact note/key/staff concept being trained;
- the relevant rows in `23_TEACHING_PROOF_MATRIX.md` have current evidence, not only intent.

Preschool observation note: `S01-mini` is implemented and logged as an observation route. It can support a real-child check that the staff-bridge mechanic is understandable, but it does not prove full S01 mastery. Full mastery still requires the complete bridge, reduced-cue/staff-check pass, and parent-state evidence.

### Visual Polish Pass

Pass when:

- no placeholder-looking object dominates the screen;
- dinosaur states are consistent across point, listen, happy, try-again, celebrate, and jump;
- key press, correct, wrong, jump, and completion effects clarify cause and effect;
- screenshot comparison covers map, one build level, FG03, and S01.

### TestFlight MVP

Pass when:

- an actual signed native Release candidate, not a browser page or empty wrapper, passes every `N0-N3` stage applicable to its declared scope and the corresponding numbered gates in `36_NATIVE_IPAD_AND_APP_STORE_RUNTIME_CONTRACT.md`; a full-course TestFlight candidate cannot omit `N2`;
- touch, native Core MIDI, optional microphone, audio-session interruption, local progress/migration/reset, offline cold launch, orientation/lifecycle recovery, and accessibility are verified on the declared physical-device matrix;
- the physical-device run follows `38_IPAD_MIDI_MIC_DEVICE_TEST_PROTOCOL.md`, identifies exact build/device/hardware/audio route, and reports p50/p95/max or accuracy by condition where applicable rather than a single “connected successfully” screenshot;
- a real parental challenge protects permissions, settings, external links, purchases, import/export, reset, and diagnostic sharing;
- the Release archive's privacy manifest, permission strings, SDK inventory, child-data map, network behavior, and App Store disclosures agree;
- TestFlight install and upgrade evidence identifies the same version, content manifest, assets, screenshots, and behavior being reviewed.

Producing an IPA, loading the Web prototype in a shell, or passing desktop browser automation does not by itself pass TestFlight MVP.

### Mature App Release Candidate

The project is not a mature app merely because the current Web slice or TestFlight shell runs. Pass only when all of the following are true:

- Chapters 1-5 core routes are implemented with their canonical session boundaries, story consequences, note/register/staff targets, cue fading, repair, natural rest, and parent evidence;
- the Chapter 5 relay route reaches the full ending without requiring simultaneous two-hand play, while optional together play receives the same ending and reward;
- the current source, runtime version, Service Worker cache, automated checks, screenshots, coordinate contract, gate log, asset manifest, and release package all identify the same promoted build;
- final map, build, listening, staff, low-register, duet, parent, settings and completion screens have no placeholder-dominant art or unresolved P0/P1 clarity issue;
- every runtime image, animation, voice, sound effect, piano source and melody has provenance, approval status and copyright/privacy evidence;
- the final Release and App Store media hashes match the `docs/16` ledger and have passed the internal and external originality/similarity process in `docs/39`; automated or model self-review is not treated as legal clearance;
- touch completes every core route; physical iPad testing covers supported iPadOS/device sizes, safe areas, orientation, interruption/resume, offline launch, audio start, persistence and accessibility settings;
- native Core MIDI is tested on the actual supported iPad path before MIDI is marketed as reliable, and microphone remains optional, confidence-aware and non-blocking;
- every advertised USB/BLE MIDI or piano-microphone route has authoritative evidence under `docs/38`; Web MIDI, simulator input and one quiet-room microphone demo do not support native reliability claims;
- a real parental challenge protects permissions, settings, external links, purchases and export; the privacy policy, child-data map and App Store disclosures match the shipped behavior;
- at least 3-5 real 4-6-year-old children complete the specified separate short observations, including one wrong input and recovery, without adult step-by-step reading, and the observations are repeated after final art/audio changes;
- a qualified piano/early-childhood teacher reviews the teaching sequence, terminology, thresholds, load and parent claims; any required corrections are rerun through the affected gates;
- the observation and teacher evidence follows `docs/37`, identifies the exact build/device/input route and intervention levels, and contains no unnecessary child identity, face, raw voice, or diagnostic claim;
- a valid version-control and reproducible-build path exists, including ignored private recordings, migration/reset behavior, rollback/recovery notes and a release archive;
- App Store metadata, screenshots, age band, permissions, privacy answers and marketing claims are reviewed against the actual final build and current official rules.
- all 35 native release gates in `36_NATIVE_IPAD_AND_APP_STORE_RUNTIME_CONTRACT.md` have authoritative evidence or an explicitly stricter approved replacement; no gate is inferred from Web-only results.

The cross-task status source for these conditions is `29_PROJECT_COORDINATION_AND_INDEPENDENT_AUDIT.md`. A row marked `partial`, `missing`, `contradicted`, `parked`, or based only on planning evidence prevents a mature-app completion claim.

## Hard Failure Examples

A pass fails if any of these are true:

- the child must read a long paragraph to know what to press;
- the only obvious instruction is a glowing key;
- a staff bridge screenshot looks like a worksheet strip instead of a path;
- the app calls S01 stable after a strongly hinted pass without reduced-cue evidence;
- the app calls a same-session reduced-cue pass `retained`, `长期掌握`, or an equivalent long-term claim;
- microphone false negatives are counted as wrong mastery evidence;
- a generated asset has no source or prompt/license record before release work;
- a prompt or asset imitates a protected franchise, studio, living artist, toy line, anime, movie, or superhero style.
- A/B or any reserved note appears as a target before its full note-identity row and entry gate exist.
- the child-facing UI depends on reading `Do/C`, `2-black left`, or staff-position words without an equivalent visual cue.
- a child-facing surface or accessibility label outside the small-dinosaur dialogue bubble shows solfege or a dual label such as `Do/C`; keyboard labels/ARIA, cards, routes, staff hints, feedback, effects, results, map labels, and garden objects must use letter names only.
- the letter-only display rule silently removes the solfege objective: each core note's first guided teaching must still connect the visible letter/key home to the dinosaur dialogue's corresponding solfege, while later reduced-cue checks must prove the child can act without that dialogue becoming a permanent answer card.
- visible child or parent copy is mojibake, stale placeholder text, or an accidental fallback from another mode.
- the release build keeps multi-megabyte product assets or broad CSS overrides without a documented cleanup decision.
- a child-facing state presents many simultaneous answer surfaces, such as route labels, target card, coach bubble, toast, staff note card, keyboard glow, and parent-like explanation all at once.
- an IPA/WebView shell is described as native-ready while Core MIDI, audio session, local migration, parent gate, privacy manifest, physical-device, or TestFlight evidence is missing.
