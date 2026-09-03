# Content Roadmap

## Canonical Chapter Numbering

This is the canonical chapter order. Other planning files must use the same numbers and names.

| Chapter | Story name | Main teaching job | Current status |
| --- | --- | --- | --- |
| 1 | 月亮小家 | middle `C4-G4` note identity and keyboard geography | current Web course |
| 2 | 星星桥 | treble-staff `C4-G4` reading through physical jump pads | current flagship slice |
| 3 | 会听的小种子 | guided pitch echo, small-set sound-to-key matching, and two-note aural memory | `LS01-LS08` browser behavior and the full teaching-audio lifecycle pass in `overhaul-345d-audio-c` / `2405734`; physical-device, teacher and child evidence remain missing |
| 4 | 咚咚的低音星球 | high/low contrast, low `C3-G3`, bass staff, left-hand readiness | approved baseline `overhaul-347a-c4-r01a` / `af9aa28` contains `LP01-LP03` and isolated C4-R01A. The current unapproved browser/PWA experience candidate `overhaul-369d-course-route-monotonicity-correction` at `app.js F3B4F960...` changes only formal progression-history eligibility and forward garden-route recovery. It keeps 369c as its direct stage-settlement/PWA predecessor, 369b as the Figma A settlement source, 369a as the staff-notation source, 368b as the S01-continuity source, 367b as the portable-recovery predecessor and 366a as the teaching-core predecessor. It does not implement or verify the future LP08-LP10 bass staff. None replaces the frozen adult physical-iPad preflight and directional child-observation baseline `overhaul-359a-map-shell-scroll-reset` / `docs/30_OBSERVATION_CANDIDATE_359A.json`; `LP05-LP10` stay locked while adult iPad, device, teacher and child evidence remain missing |
| 5 | 会唱歌的大家园 | hand alternation, simple two-hand coordination, grand staff | curriculum specified; not implemented |

Child-map labels and story-script titles are two names for the same canonical chapters, not separate levels:

| Chapter | Child map / navigation label | Parent-readable story title |
| --- | --- | --- |
| 1 | 月球基地 | 月亮小家 |
| 2 | 星星桥 | 星星桥 |
| 3 | 呼吸花园 | 会听的小种子 |
| 4 | 地下回声洞 | 咚咚的低音星球 |

Child navigation uses the middle column consistently. Story and lesson documents may use the right column when describing narrative tone, but parent-facing summaries must show the mapping instead of presenting the two names as different destinations.

`音符护照` is a cross-chapter collection/review system, not a numbered chapter. Its child-facing collection is icon-led and records places, helpers and story accomplishments; parent-facing played/stable/retained evidence remains separate, so collection count cannot imply mastery. The A-G word game is the parked final optional project: it cannot start before Chapters 1-5 and the core release foundation pass, all core P0/P1 issues are resolved, and a future supervisor explicitly dispatches it.

## Course-wide Learning Logic

- Experience before terminology: hear and feel high/low before saying right hand, left hand, treble staff, or bass staff.
- One new axis at a time: do not introduce a new register, a new clef, a new hand, and a new rhythm in one first-exposure level.
- Every concept follows `explore -> guided comparison -> reduced cue -> check`.
- Child-facing levels stay within roughly 1-3 minutes. A normal preschool session contains 2-3 tiny actions, one brief review, one visible story reward, and a natural pause within roughly 3-5 minutes. A single level may supply several tiny actions; do not cram unrelated level ids together merely to reach a count.
- Story metaphors support the concept but never become the answer. Heavy stones cannot be the only clue for low notes, and character/color cannot replace sound, key location, or staff position.
- Touch always completes the core path. MIDI can improve note/timing evidence. Microphone is limited to sequential single-note work and never gates simultaneous two-hand progress.
- `33_GAME_TEACHING_PACING_AND_MOTIVATION_CONTRACT.md` owns the cross-chapter rhythm: one new teaching axis, at most one old retrieval, usually 3-8 meaningful note actions, visible story progress every 1-2 actions, at most one reduced-cue check, a permanent story consequence, and a natural rest. A clean five-note guided route may add one reduced-cue pass up to roughly 10 total inputs only when the second pass has a different story purpose; repair, assisted success, long waiting, or disengagement defers that check. Chapter tables in this file own content order but cannot override that pacing contract.

## Canonical Preschool Session Map

These are teaching bundles, not new runtime level ids. Completing a bundle keeps the story moving but does not automatically create stable or retained mastery.

Each session follows the same rhythm:

1. `摸一摸`: one story problem lets the child explore a sound, key home, or staff landing with generous help.
2. `学一学`: Xingya or Dongdong links the action to one note identity or one representation axis.
3. `试试看`: one short reduced-cue retrieval reuses only material already met.
4. `世界变化`: the object moves, grows, opens, or connects, then the character reaches a visible rest point.

The reduced-cue retrieval may move to the next session when the child needed repeated help. Same-session success is immediate performance; a later-session retrieval is required before calling the skill retained.

| Session | Level bundle | Main teaching load | Natural story pause |
| --- | --- | --- | --- |
| `C1-01` | `M01` plus one Do revisit | first `Do/C` identity and two-black-left home | first floor locks and Xingya stands safely |
| `C1-02` | `M02` | compare `C4-D4-E4` within one two-black group | three lamps wake, then dim for rest |
| `C1-03` | `M03` | first modeled sound-to-key echo within known Do/Re | wheel sings and rolls into its bay |
| `C1-04` | `M04-M05` | keyboard direction: up, then down, using known C-D-E | small bridge folds open and countdown lights settle |
| `C1-05` | `M06` | first guided `C-G-C` leap and Sol preview | wall rises; no G mastery claim |
| `C1-06` | `M07` | guided C-D-E-D-C order memory; only a clean first pass continues into a reduced-cue memory-light check | five stars stay hung; the optional check makes the installed garland remember its route without rehanging it |
| `C1-07` | `M08` | five-note climb as a first whole-route experience; only a clean, engaged first pass continues into a reduced-cue five-point seal check | five roof panels close; the optional second pass lights the pressure seal, otherwise Xingya rests at the closed roof; F/G still need their own lesson |
| `C1-08` | `FG01-FG02` | isolate Fa and Sol keyboard homes | two bridge approach pads light |
| `C1-09` | `FG03` | compare neighboring E-F-G without strong glow | three near stars align |
| `C1-10` | `FG04` | first F/G staff-position preview | bridge map unfolds, then the scene rests |
| `C2-01` | `S01-mini` | first C-D-E staff jumps; observation only | Xingya reaches the small rest star |
| `C2-02` | full `S01` guided | complete C-G staff route with support | Xingya reaches the far planet |
| `C2-03` | `S01` reduced-cue check | retrieve the known bridge without strong key glow | bridge becomes a stable route; story continues even if practice is still needed |
| `C3-01` | `LS01-LS02` | visible modeled echo for Do and Re | two seed leaves open |
| `C3-02` | `LS03` | finish the visible modeled-echo transfer with Mi | the third leaf catches a star light, then Xingya rests |
| `C3-03` | `LS04` | first hidden call within the already known Do/Re pair | two seed pods find their flowers |
| `C3-04` | `LS05` | one-of-three C/D/E listening set | three flowers open |
| `C3-05` | `LS06` | large C/G sound contrast | long vine reaches the far stone |
| `C3-06` | `LS07` | close E/F sound and keyboard-boundary contrast | tangled flowers separate |
| `C3-07` | `LS08` | two-note order memory in free time | roots carry the unscored low echo underground |
| `C4-01` | `LP01-LP02` | high/low C contrast and the low C3 home | cave opens and the permanent C anchor stone lands |
| `C4-02` | `LP03` | low C3-D3-E3 keyboard geography | the existing C anchor wakes; D and E join it to complete the three-stone path |
| `C4-03` | `LP04` | low descending sound-to-key route | cave echo travels downward |
| `C4-04` | `LP05` | low E3-F3-G3 neighborhood | E wakes the faint starting footprint, F/G restore the two missing footprints, and Dongdong fully appears only when the story unit resolves |
| `C4-05` | `LP06` | low C-G-C leap preview | C releases the stone stop, G rolls the arch stone across the marked arc, and the final C seats it permanently |
| `C4-06` | `LP07` | left-hand invitation on a familiar low route | five steady footprints appear |
| `C4-07` | `LP08` | first bass-staff C3-D3-E3 positions | underground map lights three homes |
| `C4-08` | `LP09` | bass-staff E3-F3-G3 neighborhood | upper bridge gains three supports |
| `C4-09` | `LP10` guided crossing, then a later reduced-cue signal check | integrate low sound, key, and bass staff without forcing two six-note routes into one session | Dongdong completes the low bridge and sends a usable signal; a later review lights the existing signal anchors without rebuilding or re-crossing it |
| `C5-01` | `TH01-TH02` | guided same-name register calls, then a C/G role-register transfer without testing physical hand use | the two homes answer with two permanent signal pairs and release the first bridge materials |
| `C5-02` | `TH03` | free-time role/register relay with left/right invitations | three C/D/E bridge pairs lock from both ends |
| `C5-03` | `TH04` | two one-at-a-time C staff landmarks join the two maps | meeting light closes the brace and the first Chapter 5 phase |
| `C5-04` | resumable `TH05` phases | five explicit child-started sessions: supports (2 inputs), near high bar (4), far high bar (4), relay bar 1 (5), relay bar 2 (5); no stage auto-starts the next | two supports, two four-light groups and two signal spans accumulate without resetting; relay bar 2 makes the main bridge ready |
| `C5-05` | `TH08` core relay finale | every child finishes the 4-6 story before any simultaneous-note invitation | the shared garden opens once and the two characters meet |
| `C5-X1` | later optional `TH06` | use familiar same-name C/C and G/G pairs to isolate friendly paired onset after the garden is already open | the same practice arch lights through paired or sequential fallback; paired timing adds only a brief musical layer, not an exclusive object |
| `C5-X2` | later optional `TH07 -> TH08 together-encore` | rehearse one known bar per later child-started session, then optionally add a complete two-layer encore | the already-open garden gains a temporary musical layer; no second story completion or new permanent reward |

Session guardrails:

- one session has one main teaching axis: keyboard geography, sound matching, staff position, register, hand turn, or coordination;
- never require a child to finish a reduced-cue check after repeated repair; end on an assisted success and schedule retrieval later;
- after a planned story pause, continuing is a new session choice, not an automatic endless chain;
- no child-facing close or next-level modal is required. Within a session, story motion advances automatically; at the rest point, the character settles and the world map becomes the resume surface;
- the child world map exposes exactly one current journey marker. Completed landmarks remain as quiet scenery, future landmarks remain distant or locked, and historical replay belongs in the parent area rather than a grid of equally prominent child buttons;
- key-by-key correct, wrong, assisted, and modeled feedback stays inside the teaching scene and character safe area. It never opens a centered blocking card or the child result modal; see `docs/52_CHILD_COURSE_DIRECTOR_AND_NONBLOCKING_FEEDBACK_ACCEPTANCE_CHECKLIST.md`;
- after S01, the map rests at the Chapter 3 garden entrance. Tapping that story destination starts `C3-01` and supplies the user gesture needed for browser audio; completion must not route back to `M01` or autoplay the new chapter without a gesture;
- `C3-01` normally contains LS01-LS02, but repeated repair, a strong/assisted cue, modeled success, long waiting, or clear fatigue during LS01 ends early at the first-leaf safe point. The next formal session resumes only the pending LS02 action;
- `LS03` and `LS04` are separate first-play sessions: the third leaf is the rest point after visible echo transfer, and the first hidden Do/Re call begins only when the child starts the next session;
- Chapter 5 optional sessions cannot delay or downgrade the shared-garden ending;
- every child goes from `C5-04/TH05` to `C5-05/TH08 core-relay-finale` first. Only after that formal finale, on later child-started visits, may `C5-X1/X2` offer `TH06 -> TH07 bar 1 -> TH07 bar 2 -> TH08 together-encore`.

## Chapter 1: Moon Base Builder

Goal: introduce C-D-E, then expand to F-G through short construction missions.

| Level | Current concept | Teaching job | Required improvement |
| --- | --- | --- | --- |
| M01 | 第一块月亮地板 | `Do/C`, 2-black left | make it a clear first note-identity level, not a color match |
| M02 | 三颗小灯醒醒 | distinguish 2-black left/middle/right | reduce pure color solving |
| M03 | 会唱小车轮 | first touch-only listening seed: hear `Re/D`, then `Do/C` | keep target key hidden until wrong input |
| M04 | 咔哒小桥 | `C-D-E` sequence left-to-right | connect melody direction to keyboard direction |
| M05 | 火箭倒数灯 | `E-D-C` descending pattern | show that notes can move down |
| M06 | 大跳墙 | first guided `C-G-C` leap and Sol preview | use a strong three-black locator; do not count G mastery here |
| M07 | 星星记忆串 | guided `C-D-E-D-C` hangs five stars; an optional reduced-cue pass makes the installed garland remember the route without rehanging it | defer the memory check after repair, strong help, long waiting, or disengagement |
| M08 | 合上月亮屋顶 | guided `C-D-E-F-G` installs five roof panels; optional reduced-cue repeat checks five seal points instead of rebuilding the same roof | prepare for staff bridge, but do not treat F/G as mastered from one pass; defer the seal check after repair, assisted help, long waiting, or disengagement |
| FG01 | Fa landing pad | isolate `Fa/F` | connect F to `3-black left` before staff |
| FG02 | Sol star gate | isolate `Sol/G` | connect G to `3-black left-middle` before staff |
| FG03 | Mi-Fa-Sol check | compare E-F-G | require a light-scaffold memory pass |
| FG04 | staff-prep bridge | preview F/G staff positions | connect `first space` and `second line` to keys |

Staff-prep rule: each Chapter 1 level should show a tiny letter-name passport hint when possible, such as `C -> 2-black left`, and later `C -> ledger line -> 2-black left`. Xingya's dialogue may say `Do`, but the passport itself does not show `Do/C`. This prevents the staff bridge from arriving as a sudden new game.

### Required F/G Bridge Before Staff

Do not jump from one C-D-E-F-G roof level directly into staff-reading mastery. The current course now includes these micro-steps:

| Step | Purpose | Required cue fade |
| --- | --- | --- |
| FG01 | isolate `Fa/F` on the keyboard | show `3-black left`, then fade object color |
| FG02 | isolate `Sol/G` on the keyboard | show `3-black left-middle`, then fade object color |
| FG03 | compare `Mi/E`, `Fa/F`, `Sol/G` | require at least one no-strong-glow pass |
| FG04 | preview staff positions for `Fa/F` and `Sol/G` | show first space and second line before S01 |

S01 should still compensate with stronger F/G hints if the parent-view mastery state says F/G need practice.

## Chapter 2: Staff Star Bridge

Goal: make five-line staff recognition concrete through the dinosaur jump mechanic.

Story boundary: S01 is a temporary one-traveler exploration route across open space. It lets sealed-suit Xingya reach and inspect the destination, but it does not yet carry home materials, combine the high/low music jobs, or turn the two settlements into one permanent habitat. Chapter 5 builds that permanent shared link.

Initial sequence:

- `Do/C`: ledger line below staff;
- `Re/D`: below staff;
- `Mi/E`: first line;
- `Fa/F`: first space;
- `Sol/G`: second line;
- return to `Mi/E`: first line.

Required polish:

- make staff bridge large and uncluttered;
- keep only one to two measures;
- make the current note pad obvious;
- keep future pads visible but not dominant;
- make correct jump and wrong stumble readable;
- finish at the ecology-planet arrival without needing a manual "next" button.

S01 release gate:

- the first run may show note labels and key locators;
- the second run should reduce target key glow;
- the child should finish the bridge with no more than two wrong inputs before the app calls it "learned";
- if F/G are missed twice, the app should return to an F/G micro-practice rather than treating the bridge as complete mastery.

## Chapter 3: Listening Seed

Story name: `会听的小种子`.

Goal: move from visible single-note echo to small-set sound comparison and two-note memory without pretending to test absolute pitch. Touch works first; MIDI and calibrated microphone are optional input routes.

Implementation seed now starts earlier in Chapter 1:

- M03 is the first touch-only listening proof: the app plays `Re/D`, then `Do/C`, and the child touches the matching on-screen key for each heard note.
- This does not require microphone or MIDI.
- Wrong input reveals the note/key locator and replays the target sound.

Story transition: after Xingya finishes the staff bridge, the destination planet is quiet except for several closed seed pods. Each seed wakes only when it hears its own piano sound echoed back. The final root carries an unfamiliar low sound into the ground, causing Chapter 4 rather than merely announcing it.

Entry conditions:

- the child has completed the guided S01 bridge or an equivalent C4-G4 key/staff route;
- Do/Re/Mi key homes are at least familiar with medium cues;
- unresolved F/G weakness keeps locators available in LS06-LS07;
- touch remains sufficient and no permission prompt appears on first entry.

| Level | Child-facing mission | New teaching job | Playable sound task | Story consequence | Cue fade / check |
| --- | --- | --- | --- | --- | --- |
| `LS01` | 第一颗会唱种子 | visible sound-to-key echo with known Do | see/hear `C4`, then echo `C4` on the keyboard | the first seed opens one leaf | show Do/key home before the first call; no stable claim |
| `LS02` | D 的小芽伸懒腰 | transfer the echo loop to Re | see/hear `D4`, then echo `D4` | a curled stem stretches toward the middle of the two-black group | repeat visible model once after wrong input |
| `LS03` | E 点亮第三片叶 | transfer the echo loop to Mi | see/hear `E4`, then echo `E4` | the third leaf catches a small star light | fade the direct key glow on the second echo |
| `LS04` | C 和 D 找朋友 | discriminate within a two-note known set | hear `C4` or `D4` after one visible Do reference; press the heard key in 4 short calls | two seed pods turn toward their matching flowers | no note name or target glow before each check call; replay remains available |
| `LS05` | 花粉铃叫醒三朵花 | expand the known set without adding rhythm | hear one of `C4/D4/E4` after a visible C anchor whose solfege is spoken only by Xingya; press the heard key in 5 calls | the pollen bell is the only pre-response sound source; three flowers stay in fixed arc positions and the scored flower responds only after the answer, then all three reset while a neutral pollen ring records progress; all three open together at the end | replay always remains available; stable requires one fresh five-call run with at least 4 of 5, at least one unassisted correct for each of C/D/E, and at most one child-requested replay; a visual accessibility completion can finish the story but cannot create listening correct/stable evidence |
| `LS06` | 远远的回声藤 | hear a large contrast before a close contrast | compare/match `C4` and `G4` in 4 calls | a vine reaches across two distant garden stones | first call may show both homes; check uses sound plus stable keyboard geography |
| `LS07` | 挨着睡的 E 和 F | discriminate adjacent known keys | compare/match `E4` and `F4` in 4 calls | two tangled flowers separate at the two-black/three-black boundary | wrong input reveals only the E/F boundary map; check target is 3 of 4 |
| `LS08` | 根须记两声 | first two-note aural memory within C-D-E | first echo one visible, unscored `C4-D4` guide pair, then answer 4 hidden pairs from `C4-D4`, `E4-D4`, `C4-C4`, `D4-E4` | the guide grows one neutral root bud; scored pairs add neutral root knots, and after story completion an unscored `C4 -> C3` low echo travels underground | enter the four-pair check in the same session only after a smooth guide; otherwise rest, repeat a shorter visible guide next session, and route repeated guide difficulty back to C/D single-note remediation. Stable requires the first complete child response to at least 3 of 4 pairs in one session, no separate-note replay, and at most one child-requested whole-pair replay; resumed fragments finish story only; C3 is story exposure only |

`docs/57_SOUND_TO_STAFF_CROSS_REPRESENTATION_LESSON_SPEC.md` proposes a `C3-X01` interlude after LS05 and before LS06 to close the direct `heard sound -> staff position -> same-name key` gap with known C/D/E only. Its curriculum specification is ready, but teacher review, formal ID/phase approval, runtime and child evidence are missing. It is not part of the current canonical runtime order and cannot be implemented by inference from this paragraph.

Chapter 3 guardrails:

- This is guided pitch matching in a tiny learned set, not an absolute-pitch test. Every check begins from a visible/heard reference or a just-practiced set.
- Before the target sound, do not reveal the answer through note name, color, character glow, or a strongly lit key.
- Hidden target audio comes from one neutral central echo source. Target flowers, near/far stones, vines, roots, character gestures, stereo position, and motion remain identical until the child responds; otherwise the task has become visual matching instead of listening.
- After a wrong key, name what the child pressed, replay the target, then show the relevant locator. The child may audition and compare without penalty.
- A replay icon remains available. Replaying is scaffolding data, not failure.
- Touch is the core route. MIDI may provide exact note evidence. Microphone remains optional, single-note, confidence-aware, and never blocks chapter completion.
- Parent copy says `能在小音组里听后找键`, not `有绝对音感` or `听音已掌握` from one run.
- LS08 introduces no new rhythm notation. It tests order memory in free time; the final low C3 is an unscored story event and cannot create low-register mastery.
- Any random call list is constrained and balanced: LS04/LS06/LS07 present each candidate twice, LS05 includes all three notes in a 2/2/1 distribution, and LS08 presents each fixed pair once. The session seed may change order, but cannot make frequency, candidate-specific permanent progress, or a repeated animation the answer.
- LS05 repair state is call-local: a new call resets `wrongCount`, `repairStage`, and the temporary comparison pair while cumulative evidence remains. A modeled or fatigue rest preserves the neutral pollen progress and remaining seeded calls; the next explicit map start begins the new resume session with one fresh visible/heard, unscored C4 anchor, then continues only those remaining story calls. The anchor does not reset progress or count as a child replay, and evidence split across sessions cannot be combined into a fresh five-call stable pass.
- LS08's visible guide pair is unscored and outside the four-pair check. A smooth guide may flow into one check in the same session; repeated error, strong help, modeled completion, long wait, or fatigue ends at the guide root bud and defers the check. The next explicit session first repeats a shorter visible guide; two consecutive guide sessions that still need strong/modeled route back to LS05 C/D single-note remediation instead of opening the hidden check. If a check is later interrupted and resumed across sessions, remaining pairs may finish the root story but cannot combine into stable.

Chapter 3 stable evidence:

- LS01-LS03 are introduction/transfer levels and record `played`, not stable mastery by themselves;
- LS01-LS03 are also excluded from the scheduler's `played but not stable` mastery-review queue. They may reappear only as visible remediation for a later listening difficulty, never as a retained opening review;
- LS04 succeeds on at least 3 of 4 C/D calls without target reveal;
- LS05 succeeds on at least 4 of 5 C/D/E calls, includes at least one unassisted correct response for each of C, D, and E, and uses at most one child-requested replay;
- LS06 and LS07 each succeed on at least 3 of 4 comparisons without color/character as the answer;
- LS08 repeats at least 3 of 4 two-note pairs in order in one complete check session; each pair is judged from the first complete two-input child response, so wrong-then-repaired pairs do not backfill qualifying correct. A stable check uses no separate-note replay and at most one child-requested whole-pair replay. Additional replay or cross-session continuation still preserves the story reward but records played/needs-practice rather than stable.

Remediation:

- cannot match one visible model: keep the target key visible, let the child hear target and pressed key alternately, then retry once;
- confuses C/D/E: return from LS05 to the relevant two-note pair instead of widening the set;
- confuses E/F: show the two-black-right versus three-black-left boundary and let both keys be auditioned;
- loses the second note in LS08: keep the first correct response visible only inside the current repair, replay the whole pair, and keep free timing; if the first note was wrong, restart that pair without treating the later repair as qualifying correct;
- microphone uncertain/noisy: show `没听清` without a wrong mark and keep touch available;
- reacts to the final low echo incorrectly: no correction is needed because it is a story reveal, not an assessed target.

Listening MVP limit:

- touch-only listening must work before microphone is promoted;
- only single notes through LS07, then two sequential notes in LS08;
- only the active small note set;
- low confidence means "try again" without penalty;
- microphone input must not be required to clear any core level.

## Cross-chapter System: Note Passport Review

Goal: each note gets a compact identity card while the product separately checks whether the child can retrieve the letter name from the dinosaur's solfege carrier. Full teacher-gated detail lives in `docs/71_CROSS_CHAPTER_REPRESENTATION_AND_NOTE_PASSPORT_SUPERVISOR_CHECKLIST.md`.

The collection page may contain:

- character buddy;
- solfege;
- letter name;
- keyboard locator;
- staff position;
- sample sound;
- tiny story object.

This is not a flashcard wall. It should be unlocked through play.

The collection layer updates quietly at natural rests and may show what the child has met, but it must not interrupt the story or claim mastery from a single guided pass. The proposed naming-carrier review is a separate, short opening-review action: `NP-CDE` is not eligible before LS05, `NP-FG` is not eligible before LS07 plus LP05, neither is a numbered map level, and neither may enter runtime before preschool-teacher review and an explicit supervisor dispatch.

## Chapter 4: Dongdong and the Underground Echo Cave

Story name: `咚咚的低音星球`.

Canonical geography: `森芽星` is the formal name of the current breathable ecology planet. Dongdong comes from `鸣石星`, but Season One does not travel there. Chapter 4 remains in Senya's `地下回声洞`, where Dongdong guards a small `共鸣石前哨`. The chapter nickname is not Mingshi's formal name and creates no new map node, route, session, or teaching evidence.

Goal: let the child first hear and feel a lower sound world, connect low `C3-G3` to keyboard geography, let the left hand walk an already-familiar route, and only then map that route onto bass-staff positions. Do not start by saying "now use the left hand."

Story transition: one singing seed sends a deep echo into the ground. The soil glows, a cave opens, and Xingya discovers the unfinished resonance-stone outpost that Dongdong is guarding. Dongdong needs steady low sounds to move foundation stones and hold the bridge.

Entry conditions:

- in story mode, `C3-07/LS08` has reached its played, bounded assisted, or modeled story ending so the underground echo exists; a modeled ending keeps `needsPractice` and cannot invent child-correct, stable, retained, or Chapter 3 mastery evidence; teacher/direct modes may bypass the story route but cannot invent Chapter 3 mastery;
- the child has completed the guided S01 bridge or an equivalent `C4-G4` note/key route;
- `C4-G4` does not need to be fully stable, but unresolved F/G weakness keeps adaptive support available;
- touch input remains sufficient; no hardware is required.

| Level | Child-facing mission | New teaching job | Playable note task | Story consequence | Cue fade / check |
| --- | --- | --- | --- | --- | --- |
| `LP01` | 地底传来“咚” | hear high vs low before hand/clef labels | distinguish `C3` from `C4` in 4 short calls after two unscored models | every resolved call adds one neutral cave crack; the fourth opens a cave glow | model bubbles may be replayed before check; once check starts, the first bubble touch commits the response and no character/position/stereo cue gives the answer |
| `LP02` | 低音 C 的家 | same solfege/letter can live in another register | find `C3` at the lower two-black-left home; compare with `C4` | the permanent C anchor stone lands beside the cave door | keep `低音 C` large; `C3` stays parent/teacher detail |
| `LP03` | 三块地基石 | low two-black-group geography | press `C3` to wake/relock the existing anchor, then place `D3-E3` | C stays in place while D and E lock to its right | fade direct key glow after the guided route; never re-float or re-drop C |
| `LP04` | 地洞回声 | low descending direction plus sound matching | hear/play `E3-D3-C3` | echo lights travel down the cave | hide answer key before sound; reveal locator only after wrong input |
| `LP05` | 三黑键旁的脚印 | isolate low `F3/G3` and compare `E3-F3-G3` | three guided footprints `E3-F3-G3`, then at most three short comparisons if the child remains ready | E wakes the faint starting footprint, F/G restore the two missing footprints; after the comparison branch finishes or is honestly deferred, Dongdong fully appears once at the story-unit ending | reduce color and future-note labels in check; never delay the story reward merely to force optional comparisons |
| `LP06` | 咚咚搬大石 | first low-register leap, not hand stretch | three released, sequential taps `C3-G3-C3`; one finger may reposition between notes | C releases the stone stop, G rolls the arch stone across the marked arc, and the final C seats it permanently | strong current-note locator on first run; no held span, simultaneous notes, legato requirement, added check, or stable claim from this preview alone |
| `LP07` | 左手小队出发 | invite the child's left hand only after low key geography is familiar; do not test hand technique | five released notes `C3-D3-E3-D3-C3`; right-hand, one-finger, touch, MIDI, or microphone completion still advances the story | each released correct note stamps one permanent footprint; the fifth forms the team and points toward LP08 | one standardized child-perspective left-hand glyph sits beside the keyboard; wrong-note repair reveals only the current C/D/E locator; suggested `5-4-3-4-5` is optional parent/teacher support only |
| `LP08` | 地下谱线地图 | map the already-familiar low C/D/E footprints onto the first three bass-staff homes, one current position at a time | guided `C3` second space -> `D3` third line -> `E3` third space loops show the current letter, one model tone, and one exact key locator; if the child remains ready, an optional light check presents C/D/E once each in a deterministic non-ascending order | three homes stay lit as one short underground rail; the optional check connects three existing rail joints without rebuilding the homes | use one wide one-measure staff with five fixed thick/spaced lines and one current notehead; the check hides answer letter, solfege, target sound, and target-key glow before response; wrong-note repair reveals only the current staff/letter/key relationship |
| `LP09` | 低音桥加固 | reuse the existing E3 third-space home as an anchor, then add the new F3 fourth-line and G3 fourth-space homes | guided E3 lowers the folded anchor brace, F3 and G3 install two new supports; if the child remains ready, an optional pressure check presents E/F/G once each in a deterministic non-ascending order | three supports stay installed and the short bridge stops wobbling; the optional check sends pressure light through existing supports without rebuilding them | only one current support/notehead is active; the check hides answer letter, solfege, target sound, color, and target-key glow; E/F and F/G repair compares both exact staff position and black-key boundary |
| `LP10` | 咚咚的低音星桥 | integrate the already-taught low sound, exact key, bass-staff position, and six-note order without adding rhythm or a hand requirement | guided six released notes `C3-D3-E3-F3-G3-E3` light one current stepping signal at a time and move Dongdong to the tower; fatigue may rest after the first E without replaying completed steps; a later scheduler-selected session reads the same six staff positions with reduced cues | the supported bridge gains a usable signal route, Dongdong remains at the tower, and Xingya answers from the safe garden relay; the later check lights six existing anchors without moving either character or replaying the chapter ending | guided pads may show the current letter/locator and a child-perspective left-hand invitation, but any hand or one finger can finish; the later check hides answer letter, solfege, target sound, color, and target-key glow; guided completion unlocks Chapter 5, while only the later check may create current stable evidence |

Chapter 4 guardrails:

- Exact taught register is `C3-G3` (`MIDI 48-55`). Do not count octave-equivalent notes as bass-staff mastery.
- Chapter 4-5 play uses one continuous, non-scrolling two-octave keyboard from `C3` through `B4`, so `C3-G3` and `C4-G4` keep their real spatial relationship. Black keys follow real 2/3 groups and key widths never change between levels.
- Ordinary child copy uses `低音 C/D/E/F/G`, `下面的 C`, or a black-key locator. Only dinosaur dialogue may say `低音 Do/Re/Mi/Fa/Sol`; parent/teacher evidence records `C3/D3/...`.
- LP02's C foundation stone is a permanent world result. LP03 must render it already seated, use the first C response only to wake or lock that anchor, and add only the D and E stones; refresh, rest, repair, or later checks must never suspend or drop C again.
- The left hand is invited in `LP07`, after location and sound are familiar. Before that, high/low is a musical contrast, not a hand test. In LP07, using the right hand or one finger is not a wrong answer and cannot reduce the story reward.
- LP07 uses one standardized child-perspective left-hand glyph beside the keyboard. A mirrored character paw cannot be the only left/right cue. Touch, MIDI, and microphone events default to `actualHand=unknown`; only optional adult observation may add `adultConfirmedHandUse`, and that field never proves technique or mastery.
- LP08 is a staff-to-key lesson, not a hidden listening test. Its guided loop may model the current target tone after the footprint reaches its named staff home; its optional check must not play or name the target before the response. Only one C/D/E notehead is active at a time, and future answer positions stay hidden rather than appearing as three equal pads.
- LP08 guided or supported completion writes only the C3-D3-E3 bass-staff subset as played. The optional check may retain per-note first-response evidence, but LP08 alone cannot create full `bass-staff:C3-G3` stable or retained evidence.
- LP09 inherits LP08's lit E3 home. E3 lowers an existing folded brace; it does not erase, refloat, or reteach the E staff home as new. F3 fourth line and G3 fourth space appear one at a time, with exact three-black-group locators. Its optional pressure check reads existing supports and cannot create full bass-staff stable/retained evidence by itself.
- LP10 begins on LP09's already-supported bridge. The guided crossing completes its six-step signal route; it does not build another bridge. Guided, assisted, or modeled story completion may unlock Chapter 5 but cannot create bass-staff stable. The reduced-cue signal-anchor check is a different explicit session chosen later by the scheduler, never the immediate mandatory map destination.
- A clean formal LP10 guided ending is a meaningful Chapter 4 phase tail and may show the single lightweight buttonless milestone under `docs/52`. Assisted/modeled/partial endings and the later signal check never show that settlement. After either path, the child map has one obvious story destination; the check cannot replace or block the unlocked Chapter 5 task.
- Do not require a small child to hold a five-key span or play legato. Single-note taps and repositioning are valid; fingering is a support layer, not the answer.
- Microphone may experimentally support the single-note key-response tasks in `LP02-LP07`, but it is not a scored response route for the touch-only high/low comparison in `LP01` and cannot prove hand use or simultaneous coordination. In LP07 it is assisted story progress only: `actualHand=unknown`, no stable/retained evidence, and one confirmed pitch must end or fall to silence before the route rearms for another footprint.
- `LP10` guided crossing and reduced-cue signal check are separate short sessions. Guided/assisted/modeled story completion may unlock Chapter 5; the later check measures bass-staff stability and must not make Dongdong rebuild or re-cross the same bridge.

Chapter 4 stable evidence:

- high/low comparison succeeds on at least 3 of 4 first responses, with at most one whole-target replay and without candidate preview, character/color/position/stereo answers, strong or modeled help;
- `low-key:C3-G3 stable` remains an unscheduled evidence target: no current LP05-LP10 action or C4-R01 route grants it; a separate teacher-reviewed, supervisor-dispatched opening review must first define its exact order, cue exclusions, input budget, and routing;
- bass-staff `C3-G3` check finishes without strong target-key glow;
- parent view separates `低音区玩过`, `低音键位稳定`, and `低音谱位稳定`.

Remediation:

- confuse `C3` and `C4`: return to `LP01/LP02` same-name, different-home comparison;
- miss `E3/F3`: compare two-black-right with three-black-left;
- miss `F3/G3`: return to `LP05` three-black-group footprints;
- read the right note in the wrong octave: praise the note name, then show the correct low home; do not count it as staff mastery;
- struggle with left-hand use: keep the story moving with touch/sequential play and mark hand practice as in progress, not failed.

### First Chapter 4 Observation Slice

Do not prototype `LP01 -> LP02 -> LP08 -> LP10` as if it were a child course. That skips the `Re/Mi` key lesson and creates a false staff jump.

The observation sequence below is deliberately stricter than the normal `C4-01` runtime flow. A smooth in-app session may continue from LP01 into one guided LP02 action, as specified in `docs/34` and `docs/46`; the first external observation intentionally stops after LP01 so an observer can tell whether the child understood the sound-bubble comparison before keyboard geography is introduced.

Use three short sessions instead:

1. Register-listening session: `LP01` only. Stop after the four high/low calls and the cave glow; do not add key finding in the same observation.
2. Low-key session: `LP02 -> LP03`. Reconnect the two C homes, then introduce only the low C-D-E keyboard neighborhood.
3. Familiar-route/staff session: `LP07 -> LP08-mini -> LP10-mini`.

`LP08-mini` uses only bass `C3-D3-E3`. `LP10-mini` crosses only those three already-known pads. They are observation tools, not separate curriculum ids, and must not write full `LP08`, `LP10`, `C3-G3`, or bass-bridge mastery. Add `LP05`, `LP09`, and the full `LP10` before testing the complete C3-G3 course.

## Chapter 5: Two Homes Sing Together

Story name: `会唱歌的大家园`.

The Chapter 5 bridge connects the ecology home with the remote moon outpost. Mingshi is not a current endpoint and remains reserved for a future, separately reviewed expansion.

Goal: turn the two characters' separate jobs into a gradual coordination course. Alternating hands comes before simultaneous hands; separate-hand rehearsal comes before a two-bar duet; rhythm stays simple while coordination is new.

Story transition: Dongdong's low bridge sends a steady signal upward, and Xingya answers from a safe garden relay station linked to the distant moon outpost. Both characters remain at the breathable ecology-side control stations; the moon endpoint is a remote beacon with automatic bridge modules, not a place where helmet-free Xingya is shown standing. Low anchors grow from the ecology side while high-register signals activate the remote moon end, and the treble and bass staves become two connected maps.

Entry conditions:

- in story mode, `C4-09/LP10` has reached its played, bounded assisted, or modeled signal ending; a modeled ending keeps `needsPractice`, creates no child-correct/stable/retained backfill, and shows no clean phase-tail milestone; stable bass-staff evidence is not required to meet Xingya again;
- low `C3-E3` and middle `C4-E4` keyboard locations are familiar with medium cues; unresolved locations keep adaptive support in the core relay route rather than blocking it;
- the child has experienced a slow one-hand route. The core relay remains guided when turn-taking is not yet stable;
- simultaneous levels remain post-story optional invitations and never block, delay, or upgrade the 4-6 story path.

| Level | Child-facing mission | New teaching job | Playable note task | Story consequence | Cue fade / check |
| --- | --- | --- | --- | --- | --- |
| `TH01` | 两个 C 说你好 | recall the already-taught low/middle C relationship and add Dongdong-then-Xingya role/register order; this is not a physical-hand test | after each role voice ends, one model tone and one current letter/locator guide `C3`, then `C4`; any hand, one finger, touch, exact MIDI, or eligible sequential microphone input may respond | the low-station C lamp and middle-C relay lamp answer in order, leaving one permanent signal arc | guided only: one current role, one child-perspective hand invitation and one current locator; the future C key stays neutral |
| `TH02` | G 回声接力 | transfer the same-name/different-register rule from C to G, then recall C with fewer cues | guided `G3 -> G4`, then reduced-cue `C3 -> C4`; child labels are `低音 G` and `上面的 G`, never `中央 G` | the G pair closes the middle signal gap; the returning C pair releases the first permanent bridge materials | G may use one model tone and exact current locator per turn; the C return has no model tone, target-key glow, color answer, or future-key preview; this same-session transfer is observation, not stable evidence |
| `TH03` | 两边轮流修桥 | follow Dongdong/Xingya role-register turns while left/right hands are invited, without treating pitch as proof of physical-hand use | one free-time route of six discrete released inputs: `C3 -> C4 -> D3 -> D4 -> E3 -> E4`; C/D/E each form one low/upper pair | each pair joins one permanent bridge section, so the bridge grows in three readable steps from both ends | one current role/register and at most one child-perspective hand invitation; first play has no pulse or tempo requirement; a slow pulse belongs only to a later separate review |
| `TH04` | 中央 C 会合点 | connect two exact C staff landmarks to two exact keyboard homes, one current position at a time | two guided staff-to-key loops only: bass-staff second-space `C3`, then treble-staff ledger-line-below `C4` | the brace closes and one middle-C meeting light joins the maps | no hand switching, pulse, rhythm, melody, simultaneous input, alternate bass-ledger spelling of C4, or second active note on screen |
| `TH05` | 一边托住，一边点灯 | rehearse the two musical jobs, then combine one bar at a time | five resumable sessions: low anchors `C3 | G3`; high bar 1; high bar 2; relay bar 1; relay bar 2 | each session leaves one readable permanent result; the second relay span makes the main bridge ready | each session starts only from a new child map action and contains at most five meaningful inputs; TH08 alone joins both bars into one complete performance |
| `TH06` | 第一次一起落地 | later optional paired-onset exploration after the core story is complete | `C3+C4`, then `G3+G4`, then `C3+C4`; same-name pairs reduce note-selection load before the real second-bar transfer | paired or sequential fallback lights the same existing practice arch; a close pair adds only a brief together animation | touch/MIDI may observe timing; microphone or single-point input uses sequential fallback; provisional `<=600 ms` friendly feedback and tighter observation remain teacher/device-gated |
| `TH07` | 两小节小合奏 | later optional transfer from same-name pairs to the actual two-layer bar starts | one known bar per new child-started session: `C3+C4` then `D4-E4-D4`; later `G3+E4` then `D4-C4-C4` | each practiced bar adds a temporary two-layer rehearsal light; the already-open garden and permanent rewards do not change | early low-note release and scattered pairs are coached or completed sequentially, not failed |
| `TH08` | 会唱歌的大家园 | first run is the universal relay story finale; a later replay may be a together encore | core: join the two TH05 relay bars; later encore: join the two TH07 bars with pair windows only at bar starts | core opens the shared garden once; later encore adds temporary two-layer sound and returns to the same garden | no manual next button, route-choice modal, second story completion, or easy/hard label |

### Canonical Two-measure Piece And Route Fork

The implementation must use one fixed original piece instead of inventing a different melody in each file:

| Part | Bar 1 | Bar 2 | Child action |
| --- | --- | --- | --- |
| Xingya / middle-register part | `C4 q, D4 q, E4 q, D4 q` | `E4 q, D4 q, C4 q, C4 q` | four equal star pulses per bar |
| Dongdong / low-register part | `C3 w` | `G3 w` | one support lands on beat 1 and may be held for four pulses |

- Meter is `4/4`; guided target tempo is `52 BPM`, with a permitted range of `48-56 BPM`.
- `TH05` is one public mission with five internal, child-started short sessions: `C5-04A` supports `C3,G3`; `C5-04B1` near lights `C4-D4-E4-D4`; `C5-04B2` far lights `E4-D4-C4-C4`; `C5-04C1` relay bar 1 `C3,C4,D4,E4,D4`; and `C5-04C2` relay bar 2 `G3,E4,D4,C4,C4`. A completed session never auto-starts the next, and every installed support, light and signal span persists across map return, refresh, repair and rest.
- Supports and high bars are first teaching/rehearsal; the two relay bars observe known component order. None of these first-play stages creates TH03 role/register stable, paired timing, sustain, verified-hand or two-measure mastery evidence. The low anchor may be released before the high answer; no pedal or four-beat hold is required.
- `C5-04C2` is the second Chapter 5 phase tail. Only a formal completion with a clean final relay-bar action may show one lightweight, buttonless milestone; helped completion still opens TH08 with `needsPractice` and no clean milestone. Internal TH05 stages use permanent world changes only, never a result modal.
- After core TH05 completion, the home shows `刚完成：主桥接通了 / 现在：让大家园唱起来 / 随后：花园会打开`; only TH08 is actionable and no TH08 session is created automatically. TH08 is the first time the two learned relay bars are joined into one uninterrupted two-bar performance.
- The universal 4-6 route is `TH01 -> TH02 -> TH03 -> TH04 -> TH05 -> TH08 core relay finale`. Every child opens the garden before any paired invitation.
- Only on a later child-started visit after the formal core finale may the scheduler offer `TH06 -> TH07 bar 1 -> TH07 bar 2 -> TH08 together-encore`. No optional session is created in the core completion session.
- Optional eligibility is never inferred from accuracy, stable labels, speed, pitch, hand icons, or presumed ability. A child click starts the invitation; touch/MIDI may observe two onsets, while microphone, single-point input, scattered pairs, fatigue, or preference for one-at-a-time play uses the equal sequential fallback or defers the encore without affecting the completed garden.
- `TH06` does not unlock a unique permanent arch or rarer collectible. Paired and sequential fallback leave the same practice-arch state; only the brief animation/audio layer differs.
- In `TH06`, `600 ms` is only a provisional friendly-animation threshold and `2 of 3 pairs within 350 ms` is only a provisional emerging paired-timing observation. Both require preschool-teacher and physical-device review and still cannot prove physical hand identity or technique.
- In `TH07`, the two bar-start pairs are the only required simultaneous onsets. Releasing the low whole note early does not fail the story, use the pedal, or create a sustain mastery claim.
- The child never sees `easy`, `hard`, `failed two hands`, BPM numbers, or timing milliseconds. Those are implementation and parent/teacher evidence details.

Chapter 5 guardrails:

- Do not infer which physical hand was used from pitch alone. MIDI and microphone report notes, not hands. Store `hand prompted`, `range accuracy`, `switch timing`, `paired timing`, and optional adult confirmation separately.
- `TH01-TH02` teach role/register order before any explicit left/right invitation. `TH03` begins that invitation, but the assessable task remains exact role/register order: a child who uses the same finger or the non-invited hand on the correct key is still correct, and pitch cannot prove actual hand use.
- `TH01` is the guided C reminder. `TH02` guides the new cross-register G pair and uses the returning C pair as a same-session reduced-cue transfer. Neither first-play route may create stable; a later scheduler-selected opening review must present one C pair and one G pair, require four first-response exact-register inputs with no model tone, strong locator, target-key glow, modeled input, or cross-session stitching, and still cannot prove physical hand use.
- `C5-01` has no result modal or phase settlement after TH01 or TH02. Smooth play advances from TH01 into TH02 inside one session; difficulty rests at the completed C or G signal pair, and the next explicit map action resumes only the unfinished pair. After TH02, the world returns with `刚完成：两个家听见了 / 现在：轮流修桥 / 随后：中央 C 会合点`; only the current task is actionable.
- `TH03` first play is one free-time six-note route with a real release/rearm between turns. C, D, and E are three permanent pair checkpoints; difficulty rests only after a completed pair and resumes only unfinished pairs. It has no result modal or phase settlement, and returns to `刚完成：桥轮流长出三段 / 现在：中央 C 会合点 / 随后：一边托住，一边点灯`.
- `TH04` presents only one current staff landmark and one keyboard target at a time. Guided completion writes narrow C-landmark played evidence, not grand-staff mastery. It is the first Chapter 5 phase tail: a clean formal phase completion may show one lightweight buttonless milestone; assisted or modeled completion still opens TH05 with `needsPractice` but shows no clean milestone.
- `TH01-TH05` plus the first `TH08` core relay finale are the complete 4-6 story route. `TH06-TH07` and a later `TH08` together encore form a post-story invitation; inability or unwillingness to play simultaneous notes never delays, downgrades, or reopens story completion.
- Core Chapter 5 story entry and completion depend on played, bounded assisted, or modeled story progress, not stable or retained labels. Modeled progress keeps `needsPractice` and cannot backfill child-correct, stable, or retained evidence; those labels only change support, parent evidence, and whether the optional together invitation is appropriate.
- Introduce no chords within one hand, syncopation, dotted rhythm, pedal, or long piece while two-hand coordination is new.
- The first duet stays at two measures. Practice each hand separately before combining.
- The microphone route stays sequential. Touch/MIDI can test paired attacks, but neither proves hand identity without observation/confirmation.
- Grand staff is shown as two connected maps; middle C is the meeting landmark, not a demand that both hands press the same key.
- Child-facing Chapters 4-5 use hand icons, not finger-number sequences. Suggested fingering remains optional parent/teacher support and is not a mastery target.
- Chapter 4-5 gameplay is landscape-first on iPad. On a narrow viewport, remove secondary labels before shrinking below a reliable touch target; never split the keyboard into two rows or horizontally page between low and middle homes during a task.

Chapter 5 stable evidence:

- same-name register/role retrieval is observed only in a later opening review with one C pair and one G pair: all four first responses use the requested register, no model/strong target locator/target-key glow/modeled input is used, and cross-session fragments are not combined;
- role/register relay begins in TH03; first play is free-time and cannot create stable. A later separate slow-pulse review may establish `role-register relay stable` only from six exact-register first responses in order, no model/strong locator/target-key glow/modeled input, and at most one pulse miss; actual hand use remains unknown without adult observation;
- TH04 guided play writes only `C3/C4 staff landmarks played`; a later reduced-cue session may establish those two landmarks stable from 2/2 exact staff-to-key first responses, while C3 and C4 remain separate mastery identities;
- each separate part can be replayed without strong target-key glow;
- paired-note timing, when attempted, is tracked separately from note accuracy;
- relay completion and together-attempt completion remain separate facts;
- parent view may say `左右手轮流练过` after the invitation and `角色/音区接力稳定` after the later relay gate. It may describe actual left/right use only when an adult observed it; note input alone never proves hand technique.

Remediation:

- correct letter but wrong register/role: praise the letter, keep the completed signal, and show only the current character plus `低音 C/G`, `中央 C`, or `上面的 G`; never call `G4` `中央 G`;
- correct key played with the non-invited hand: accept it, keep `actualHand=unknown`, and continue without a hand-error message;
- exact notes but the later review pulse breaks: keep hand use unknown, remove new pitch changes, and rehearse two alternating role/register anchors;
- simultaneous pair is scattered: accept a wider timing window, rehearse each note separately, then retry once without penalty;
- staff overload: return to the separate treble or bass bridge before showing the grand staff again;
- fatigue/frustration: stop at the completed alternating route and preserve the story reward.

## Later Project: A-G Word Typing Game

Status: `excluded_from_v1_scope_by_user / parked_final_project / not_dispatched / runtime_forbidden`.

Do not implement, prototype, generate dedicated art for, or expose an entry until all of the following are true:

- Chapters 1-5 have passed their own supervisor gates;
- the core release foundation is stable;
- no unresolved core P0/P1 issue remains;
- a future supervisor dispatch explicitly reopens this project.

This order is stricter than merely finishing the C-G bridge or listening loops. Available engineering time, a convenient word list, or completed A/B rows are not unlock signals by themselves.

Potential idea:

- Use only letters A-G.
- Child presses piano keys to spell simple note-letter words.
- Valid examples: `BAG`, `BAD`, `BED`, `BEE`, `CAB`, `DAD`, `EGG`, `FACE`, `FEED`, `AGED`, `CAGE`.
- Music teaching value: strengthens letter note names.
- Risk: English word reading may be too advanced for younger children, and A/B are not part of the first C-D-E-F-G course yet. After the final-project gate is explicitly reopened, define A/B note identity first, keep the mode optional/older-child, and verify that language play reinforces rather than replaces music literacy.
