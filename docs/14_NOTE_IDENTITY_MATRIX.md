# Note Identity Matrix

## Purpose

This is the single planning source for note identity in the current first course and the planned low-register course. Before adding more levels, art, hints, or assessment rules, check this matrix.

The child should gradually connect:

- solfege;
- letter name;
- keyboard locator;
- staff position;
- heard sound;
- story consequence.

Color is only an early scaffold. A child should not be able to finish later checks by matching color alone.

## Course 1 Locked Mapping

MVP uses fixed-do:

| Letter | Solfege | MIDI | Keyboard locator | Staff position | Story role | Color role | Common confusion | Repair focus |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| C | Do | 60 | two-black left | ledger line below staff | first floor, start pad | first-exposure scaffold only | D | compare left vs middle in the two-black group |
| D | Re | 62 | two-black middle | space below staff | wheel, middle light | first-exposure scaffold only | C/E | show it between C and E |
| E | Mi | 64 | two-black right | first line | light, lower star | first-exposure scaffold only | D/F | compare two-black right vs three-black left |
| F | Fa | 65 | three-black left | first space | landing pad | first-exposure scaffold only | E/G | show it as the first key before the three-black group |
| G | Sol | 67 | three-black left-middle | second line | star gate | first-exposure scaffold only | F/C leap | compare first and second white keys around the three-black group |

## Register And Keyboard Scope

The first course is middle-C anchored:

- `C4 / MIDI 60` through `G4 / MIDI 67` are the taught notes for the first staff bridge.
- Staff positions in S01 refer to that register: ledger line below staff through second line.
- The on-screen keyboard may show neighboring `A/B` for real keyboard geography, but the active child target area should clearly be the middle `C-G` neighborhood.
- Later MIDI or microphone input must not treat every octave-equivalent `C`, `D`, `E`, `F`, or `G` as staff mastery unless a level explicitly says it is octave-agnostic listening.
- Parent evidence should record target register before real-keyboard or acoustic-piano mastery is claimed.

Before expanding the keyboard range, define how octave, hand area, and staff position are explained to the child.

## Chapter 4 Low-register Mapping

These rows are locked curriculum targets for `LP01-LP10`. `LP01-LP03` and their isolated opening-review scheduler use this register and locator logic in the approved `overhaul-347a-c4-r01a` / `af9aa28` browser baseline. The current unapproved browser/PWA experience candidate is `overhaul-369d-course-route-monotonicity-correction` at `app.js F3B4F960...`; 369c is the direct stage-settlement/PWA predecessor, 369b the Figma A settlement source, 369a the staff-notation source, 368b the S01-continuity source, 367b the portable-recovery predecessor, and 366a the teaching-core predecessor. It preserves the independently accepted LP04 loop, complete R01B lifecycle, compact phase-tail settlement and prior input corrections. Its route correction adds no bass-staff evidence; the future LP08-LP10 bass-staff rows remain specification-only. The separate frozen observation baseline remains `overhaul-359a-map-shell-scroll-reset` / `app.js 5AB01914...`; neither candidate changes this mapping. `LP05-LP10` remain planned and locked pending the next explicit dispatch.

| Letter | Ordinary child label | MIDI / Hz | Keyboard locator | Bass-staff position | Story role | Common confusion | Repair focus |
| --- | --- | --- | --- | --- | --- | --- | --- |
| C3 | 低音 C | `48 / 130.81` | lower two-black left | second space | first foundation stone | C4 / D3 | same name, different home; compare low vs middle C |
| D3 | 低音 D | `50 / 146.83` | lower two-black middle | third line (middle line) | tunnel rail | C3 / E3 | show it between low C and E |
| E3 | 低音 E | `52 / 164.81` | lower two-black right | third space | echo crystal | D3 / F3 | compare two-black right with three-black left |
| F3 | 低音 F | `53 / 174.61` | lower three-black left | fourth line | bridge support pad | E3 / G3 | show it as the first white key before three black keys |
| G3 | 低音 G | `55 / 196.00` | lower three-black left-middle | fourth space | main bridge anchor | F3 / G4 | compare first and second white keys around the three-black group; then compare registers |

Register-language contract:

- Ordinary child UI uses `低音 C` and `中央 C`/`较高的 C`, not an abstract octave lecture. A dinosaur dialogue may call the same sounds `低音 Do` and `中央 Do`.
- In the Chapter 5 TH03 relay, ordinary prompts distinguish `低音 D` from `上面的 D` and `低音 E` from `上面的 E`; `中央` remains reserved for the established `中央 C` landmark. Keyboard keycaps themselves still show letters only.
- Parent/teacher evidence always records `C3` or `C4` explicitly.
- A correct letter/solfege in the wrong octave is a useful near miss: name what was correct, show the required home, and do not count staff mastery.
- Color and character identity must not be the only way to distinguish registers.
- Chapter 4 bass-staff positions refer only to `C3-G3`; Chapter 1-2 treble positions refer only to `C4-G4`.

Two-octave display contract:

- Chapter 4-5 uses a continuous `C3-B4` on-screen keyboard. It shows 14 equal-width white keys plus correctly placed black keys in real `2-black / 3-black` groups.
- There is no black key between B-C or E-F, and black-key centers must follow the underlying white-key boundaries rather than an evenly spaced decorative grid.
- Cross-register tasks keep low `C3-G3` and middle `C4-G4` visible at the same time with no horizontal paging. Focus changes through labels, character gaze, or reduced opacity; the keys themselves do not move or resize.
- Gameplay is landscape-first. At smaller widths, remove secondary text and parent labels before reducing touch targets; do not stack octaves into separate rows because that destroys the keyboard geography being taught.
- MIDI may accept a wider instrument range, but only the exact target octave counts for register or staff mastery.

## Grand-staff Transition Contract

- `C3` remains low Do on the bass-staff second space. It is never called middle C.
- `C4` remains middle Do/middle C and keeps the treble ledger-line-below position already learned in S01.
- In `TH04`, the game may animate `C4` as the meeting landmark between the two maps, but it must not draw `C3` at that meeting point or merge `C3`/`C4` into one mastery id.
- `TH04` uses two separate staff-to-key loops and exposes only one current staff note at a time: bass-staff second-space `C3`, then treble-staff ledger-line-below `C4`.
- A full grand staff can write middle `C4` above the bass staff or below the treble staff. Chapter 5 introduces only the already-known treble-ledger form first; the alternate bass-ledger spelling is a later comparison, not a same-screen test.
- Same-name comparison means `Do is still Do in another home`; it does not mean the pitches, staff positions, or keyboard locations are interchangeable.

## Per-note Teaching Contract

Every first-course level that targets a note must expose at least two identity links:

| Level type | Required links |
| --- | --- |
| First exposure | solfege or letter name + keyboard locator |
| Guided sequence | note identity + key group direction |
| Reduced-cue check | note identity + key locator, with color delayed or reduced |
| Staff bridge | staff position + note identity + keyboard locator |
| Listening seed | across the full model/feedback cycle: heard sound + note identity + key locator; during a hidden call before action: heard sound/replay only |

These links accumulate across the teaching cycle; they do not all have to be visible at the same instant. In particular, a listening check fails if target identity, target color, answer key, or locator appears before the child responds.

Accumulation is teaching, not automatic proof. The current M01-M02 carrier pattern continuously pairs dinosaur solfege with ordinary letter names, so the `letter name <-> solfege` link remains partial until the teacher-gated `docs/71` review is approved, implemented and observed. Its proposed first letter choice and later guided piano transfer remain separate evidence; one cannot repair or backfill the other.

## Visual Differentiation

The notes need stable identity, but not five unrelated visual brands.

Allowed:

- subtle note color in early stages;
- stable ordinary visual labels that show only `C/D/E/F/G`;
- Xingya's or Dongdong's spoken/bubble prompt may say `Do/Re/Mi/Fa/Sol` and may connect it to the required letter in one short sentence;
- gated parent evidence may show both identities, such as `C / Do`; child-facing accessibility labels remain letter-only and may add a keyboard locator, such as `C，两黑键左边`;
- stable keyboard locator language;
- stable staff position language;
- a small story object that explains why the note matters in that level.

Avoid:

- making shape equal note identity across all levels;
- relying on color as the answer;
- inventing a new nickname or object rule per level that does not reinforce the music concept.

Course 1 display hierarchy is therefore a deliberate two-channel link, not two competing naming systems:

- keyboard keys, target/task cards, current parts, staff pads/hints, route markers, locators, feedback, effects, results, map labels, garden objects, and ordinary object labels use only `C/D/E/F/G` as the visible note name;
- Xingya's or Dongdong's child-facing speech and listening gestures use `Do/Re/Mi/Fa/Sol` as the main spoken/character name;
- action verbs must keep the roles clear: a character may "唱 Do", while the child is asked to "弹 C" or "找到 C". Do not use a bare command such as `唱 Re/D` when the expected input is a piano key, and never describe a letter name as something to sing;
- correct and repair feedback reconnect both names across channels: ordinary UI may show `C · 两黑左`, while a dinosaur bubble says `这是 Do，你来弹 C`; do not create an ordinary dual-label badge;
- parent-only evidence may retain `C / Do`; child-facing accessibility descriptions use the same letter-only identity as the visible control and must not leak a hidden target;
- hidden listening calls show neither target-specific letter nor solfege before the child responds.

When two registers appear together in Chapters 4-5, ordinary child surfaces disambiguate with `低音 C`, `中央 C`, `下面的 C`, or the black-key locator. They do not use `低音 Do` as a visual label and do not show scientific pitch names such as `C3/C4` on the ordinary child path. A dinosaur bubble may say `低音 Do` or `中央 Do`; parent/teacher evidence records `C3/C4`.

This hierarchy must be consistent across M01-M08, F/G preparation, S01, and Chapters 3-5. It is not enough to change one keyboard label while duplicate cards continue to present the old hierarchy elsewhere.

Notation such as `Do/C` elsewhere in curriculum documents is adult-facing shorthand for the identity mapping. It must not be copied literally into a child-facing visual label.

## Listening Seed Without Hardware

The first listening loop should work without MIDI or microphone:

1. The app plays one piano note from the active small set.
2. The child touches the matching on-screen key.
3. Correct feedback names the heard note and the key locator.
4. Wrong feedback says what was pressed and replays the target.

MIDI and microphone can later route into the same loop. They should not be required for the first listening-learning proof.

## A/B And A-G Word Mode Gate

The A-G word game remains parked. It must not start until:

- Chapters 1-5 have passed their own supervisor gates;
- the core release foundation is stable;
- no unresolved core P0/P1 issue remains;
- a future supervisor dispatch explicitly reopens the final project;
- A and B have their own note identity rows;
- the child can find A and B on the keyboard;
- the mode is marked as older-child or optional;
- the core C-D-E-F-G bridge and listening loops are stable.

The first four release-foundation conditions are mandatory. Completing the A/B teaching rows or C-G loops alone never unlocks this mode.

The word game should train letter names, not replace solfege or staff reading.

Implementation rule: A and B may appear as physical keyboard keys, but they are reserved expansion notes. They must not be selected as level targets, staff targets, listening targets, mastery targets, or word-mode targets until their rows include full staff positions, story roles, repair rules, and entry gates.

## Implementation Status

The current code has a Course 1 `noteIdentityMatrix` in `app.js`, and `notes` are generated from that matrix. Chapter 4 `LP01-LP04` and C4-R01A/R01B foundations use separate register-aware targets and evidence for C3/C4, but those low-register identities are not yet generated from one shared matrix. The approved committed browser baseline remains `overhaul-347a-c4-r01a` / `af9aa28`; LP04 is present in the current unapproved browser/PWA experience candidate 369d. 369c is the direct stage-settlement/PWA predecessor, 369b the Figma A settlement source, 369a the staff-notation source, 368b the S01-continuity source, 367b the portable-recovery predecessor, 366a the teaching-core predecessor, 365b the frozen static/source recovery owner, and 359a remains the separate frozen observation baseline. The 369d route correction adds no bass-staff evidence; future bass-staff positions remain specification-only. This is implementation progress, not proof that the document and runtime have become one protected source of truth.

Before extending `LP04+` or unlocking A/B:

- keep note labels, key locators, staff hints, common confusions, and repair focus in sync with the relevant runtime identity data;
- prefer generating child-facing note labels from a register-aware matrix instead of duplicating one-off strings;
- keep the curriculum-story coherence audit active while the document and code structures remain separate;
- treat A/B rows as reserved expansion until their staff positions, story roles, repair rules, and final-project entry gates are complete;
- keep register-qualified ids such as `C3`/`C4`; never key runtime mastery only by letter name.
