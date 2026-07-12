# Pedagogy And Gameplay

## Teaching Goal

The child should not merely press the key that lights up. Each level should build one or more of these connections:

- solfege: `Do`, `Re`, `Mi`, `Fa`, `Sol`, later `La`, `Si`;
- letter name: `C`, `D`, `E`, `F`, `G`, later `A`, `B`;
- keyboard locator: `2-black left`, `2-black middle`, `2-black right`, `3-black left`, etc.;
- staff position: ledger line, below staff, first line, first space, second line;
- sound memory: the heard piano tone.

## Game And Teaching Must Be The Same Action

The app must not alternate between a decorative game and a separate worksheet. A meaningful piano action must cause the story change, and the story consequence must make the learning relation easier to notice without revealing an assessment answer in advance.

`33_GAME_TEACHING_PACING_AND_MOTIVATION_CONTRACT.md` is the authoritative pacing and motivation contract. It defines each short-session phase, the teaching/assessment job of every phase, meaningful-input budgets, achievement layers, anti-boredom rotation, chapter-level balance, and the independent acceptance checklist.

Core rule: story completion may remain generous, while learning claims stay strict. Assisted or modeled success can preserve the child's world progress and confidence, but it cannot be counted as unassisted stable or retained evidence.

## Learning Loop

Every child-facing step should follow this pattern:

1. A story need appears: the dinosaur needs a part, star, bridge tile, or jump pad.
2. The target note identity appears with letter-first visual hierarchy: large `C`, smaller `Do`; Xingya may say `Do` first.
3. The key-finding clue appears: `2-black left`.
4. The child plays by touch, MIDI, or acoustic piano sound.
5. Correct: the world changes immediately.
6. Wrong: the character reacts, the correct note is hinted, and the clue is repeated.

## Reveal Rules By Mode

The app should not use one reveal rule for every mode. Teaching, listening, and check play need different amounts of help.

| Mode | Before the child acts | After a wrong input | Why |
| --- | --- | --- | --- |
| Teach / first exposure | show note identity and key locator clearly | repeat the full clue and pulse the target | the child is meeting the note for the first time |
| Guided follow | show note identity, route, and a softer target cue | compare the pressed note with the target and pulse the target | the child is learning sequence and direction |
| Listening | play the note or show a sound prompt; hide the answer key/name when possible | reveal target note, locator, and replay the sound | otherwise the child can solve by reading, not hearing |
| Reduced-cue check | show minimal identity or visual locator; no strong target-key glow | reveal stronger clue temporarily | mastery should not come from following a light |
| Staff bridge | show current staff pad, dino landing target, and compact note clue | reveal staff position, target note, and key locator | staff position must become a physical jump target |

Implementation rule: hiding an answer for listening/check mode is not a contradiction of the teaching loop. It is the assessment version of the same loop.

Visual naming rule: outside Xingya's speech/bubble, current Course 1 UI uses `C/D/E/F/G` as the primary visible labels. Solfege remains necessary, but is spoken by Xingya or shown as secondary confirmation. Correct/wrong feedback reconnects both; hidden listening/check states reveal neither target-specific name before action.

## Listening Is Not An Absolute-pitch Test

Chapter 3 uses a child-manageable sequence:

1. See and hear one known key, then echo it.
2. Repeat that loop for C, D, and E separately.
3. Hear and match within a just-practiced two-note set.
4. Expand to a three-note set only after the pair is workable.
5. Compare a large C/G distance before the close E/F boundary.
6. Echo two sequential notes in free time.

Every reduced-cue call keeps a modeled reference, a visible/heard home note, or a just-practiced candidate set. Do not play an isolated random note from silence and call failure evidence. Parent copy may say `能在小音组里听后找键`; it must not claim `绝对音感` or broad note recognition from these games.

## Progression Model

| Phase | Purpose | UI help level | Example |
| --- | --- | --- | --- |
| Explore | child discovers key locations | strong glow, color, name, key clue | `Do/C - 2-black left` |
| Follow | child follows short patterns | glow + name + locator | `Do Re Mi` build lights |
| Match | child matches concept to key | less color, stronger letter/solfege | "Find Mi/E" |
| Read | child reads staff positions | staff bridge + note label | "first line = Mi/E" |
| Check | child proves memory | minimal glow, score through story | dino jumps without large hints |

## Preschool Cognitive-load Rule

For 4-6-year-old child-facing states, do not ask the child to decode every identity link at the same moment. Each screen state should have:

- one primary action question, such as "which key wakes this part?" or "where should Xingya jump?";
- one secondary support, such as a black-key mini-map, staff pad glow, sound replay, or dino gesture;
- optional note-name/letter/staff wording kept compact and supported by visuals.

Use at most one sentence-level instruction carrier in a play state. The story card states the story problem, the central play area shows an icon/state, and Xingya may own the one short child instruction; do not repeat the same command in all three places.

The full chain `solfege -> letter -> key locator -> staff position -> sound` should accumulate across the level and parent evidence, not appear as five competing instructions in one play state. If a state shows note name, letter, locator words, staff words, color, sequence numbers, multiple bubbles, and parent-like explanation at once, it fails the preschool version even if each clue is individually correct.

## Color Policy

Color is allowed only as a scaffold:

- early levels: color may match note and object;
- middle levels: color remains decorative but text/position takes priority;
- check levels: color should be reduced or delayed after the child acts.

Do not let children solve the whole game by color alone.

## Shape Policy

Shape should communicate story object type, not note identity.

- lights are lights;
- bridge tiles are bridge tiles;
- roof pieces are roof pieces;
- note identity comes from sound, name, staff, and key locator.

## Feedback Rules

Correct feedback must answer: "What did I do right?"

Example:

- `Do/C found. The red floor tile landed.`
- `Mi/E found on the first line. Dino jumped.`

Wrong feedback must answer: "What should I try next?"

Example:

- `That was Re/D. Try Do/C at 2-black left.`
- `Look lower: Do/C sits on the little ledger line.`

Avoid generic wrong feedback like "press the glowing key" once the child is beyond phase 1.

## Staff Bridge Rule

The staff bridge is the flagship mechanic. It should not feel like a UI panel. It should feel like:

- left planet/start;
- short one- or two-measure staff bridge;
- note pads as jump spots;
- right planet/finish;
- dinosaur physically jumping from staff position to staff position.

## Input Rules

Touch, MIDI, and microphone listening should all route into the same teaching loop, but they are not equal in MVP reliability.

- Touch: default and always available.
- MIDI: best for real keyboard users where browser/native support is available.
- Microphone: important for acoustic piano, but optional, tolerant, and limited to simple notes in early versions.

The teaching loop should work fully with touch alone.

For the first listening seed, do not wait for microphone reliability. The app can play a piano note first, then the child touches the matching on-screen key. MIDI and microphone should later feed the same learning loop, but they are growth paths rather than the first proof of sound identity.

## Register, Clef, And Hand Progression

Future low-register and two-hand teaching must follow this order:

1. Hear and act on high/low contrast without hand or clef terminology.
2. Find the separate low `C3-G3` keyboard neighborhood.
3. Compare same-name notes in different registers, such as `C3` and `C4`.
4. Invite the left hand onto an already familiar low-key route; do not add finger-number reading yet.
5. Map that familiar low route onto bass-staff `C3-G3` positions.
6. Alternate left and right turns before asking for simultaneous notes.
7. Rehearse each hand separately before a two-measure combined task.
8. Show grand staff as two connected maps around middle C.

Do not introduce a new register, bass clef, left-hand fingering, and new rhythm in one first-exposure state.

Hand-evidence rule:

- note input proves pitch and timing, not physical hand identity;
- MIDI cannot tell which hand pressed a key;
- microphone cannot verify simultaneous two-hand play in the MVP;
- parent/teacher confirmation or direct observation is required before claiming physical hand technique;
- the 4-6 story path can finish through alternating hands, while simultaneous two-hand play remains a capability branch.

Finger-number rule:

- the child-facing core route uses a clear left/right hand icon and character motion, not a row of finger numbers;
- optional fingering such as left-hand `5-4-3-4-5` stays in the parent/teacher support layer until the child can already find the notes;
- finger numbers are never the answer and are not assessed in Chapters 4-5;
- any future child-facing fingering lesson needs a separate teacher review and real-child observation gate.

Register-error rule: when the child plays the correct letter/solfege in the wrong octave, say that the note name was right, point to the required high/low home, and do not count staff mastery.

## Parent/Teacher Clarity

The child screen should stay playful. The parent/teacher view should show the actual learning objective:

- notes introduced;
- keyboard locator practiced;
- staff positions practiced;
- last errors;
- current scaffold level.
