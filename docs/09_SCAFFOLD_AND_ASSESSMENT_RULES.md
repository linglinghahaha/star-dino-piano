# Scaffold And Assessment Rules

## Purpose

This file turns "do not rely on color/glow" into executable rules. Every level must declare a scaffold level, and the UI must obey what that scaffold allows. `33_GAME_TEACHING_PACING_AND_MOTIVATION_CONTRACT.md` separately owns the purpose, game action, achievement and natural-rest rhythm around these assessment rules; neither file may loosen the other.

## Scaffold Levels

| Scaffold | Used for | Show before action | Hide or reduce | Show after wrong input |
| --- | --- | --- | --- | --- |
| `strong` | first exposure | ordinary UI shows letter name + locator; dinosaur bubble may say solfege; note glow/color may support | nothing critical | pulse target key, repeat the letter/locator and use the dinosaur bubble for any solfege |
| `medium` | guided practice | ordinary UI shows letter name + locator; softer glow; dinosaur bubble may say solfege | reduce object-color matching | pulse target key and repeat only the necessary clue |
| `light` | memory check | letter name or a subtle key-group cue; dinosaur solfege only when the check contract permits it | no large color cue before action | reveal target letter/glow and one locator |
| `staff` | staff bridge | one current staff position; guided lessons may add its letter and one key locator | future answer pads stay hidden or neutral according to the lesson contract; checks remove answer letters and target-key glow | name the current letter, then pulse only the current staff position + target key |
| `listen` | modeled echo or small-set sound practice | modeled first echo may show note identity + locator; a hidden call shows only the heard-sound/replay prompt | on hidden calls, hide target name, object color, answer key, and locator until the child acts | name the pressed/target notes, replay the target, then show the relevant locator |
| `hand` | familiar-note hand route | one child-perspective hand glyph and the familiar current locator | finger-number strings, mirrored character-paw answers, and both-hand clutter | pause, keep the same requested hand glyph and show only the current target home; never imply a hand switch unless the lesson actually alternates hands |
| `duet` | relay or optional together route | two character lanes and one current pulse | future beats and decorative rewards | freeze the pulse, identify the heard/pressed note, then retry that beat |

For `listen`, the table describes two different moments. A visible modeled echo may teach the identity before action; a later hidden call must not expose that identity before the child responds. Waiting longer may replay the sound or restate the listening action, but cannot silently upgrade into an answer reveal.

Hidden listening calls also forbid indirect visual answers. The target must come from one neutral sound source whose position, animation, color, and stereo image do not change by note. Candidate plants, characters, route ends, and key homes remain visually equal until the child responds. Their note-specific story motion begins only after the scored input. A balanced candidate map may be taught before the hidden call, but the active target cannot receive a unique label, glow, movement, direction, or color.

Naming hierarchy does not change the reveal threshold. Ordinary visual UI and child-facing accessibility labels use only letter names `C/D/E/F/G`; Xingya's dialogue bubble may use solfege as the character-language prompt. In a teach state the two channels may be connected across the UI and the dialogue, but they must not be collapsed into a visible or screen-reader `Do/C` chip. Parent-only evidence may retain both identities. In a hidden listen/check state neither the target letter nor target solfege may appear before action.

`docs/71` proposes a separate naming-carrier review in which dinosaur audio says a learned solfege and neutral letter stamps remain equal until the child chooses. That proposal is not a current scaffold family or mastery threshold: teacher review, canonical skill keys and an explicit supervisor dispatch are still missing. Until those gates pass, continuous Do/C pairing, a collected passport stamp, a repair success or the final guided key transfer cannot create naming-carrier stable/retained evidence.

## Child-facing Hint Order

Always prefer this order:

1. Sound or the current musical action.
2. Letter name in ordinary UI; solfege only in the dinosaur dialogue when allowed.
3. Keyboard locator.
4. Staff position when relevant.
5. Color only as a secondary cue.

Bad:

- "Press the glowing red key."

Good:

- ordinary UI: `C -> 2-black left`
- ordinary staff UI: `C -> ledger line -> 2-black left`
- dinosaur dialogue: `我唱 Do，你来弹 C。`

## Error Handling

Wrong input should become a teaching moment:

- If the app knows what was pressed, say what it was.
- Say the target note.
- Say the key locator.
- In staff mode, say the staff position.
- Then pulse the correct key or staff pad.

Example:

- ordinary UI: `That was D. Target C: 2-black left.`
- ordinary staff UI: `Target C: ledger line, 2-black left.`
- dinosaur dialogue may compare: `刚才是 Re；我要 Do，你来弹 C。`

## Advancement Rules

Early levels can auto-advance after one correct input. Later levels should require stable performance:

| Level type | Suggested success rule |
| --- | --- |
| introduction | one correct input |
| guided sequence | complete sequence once |
| memory check | complete sequence with at most one wrong input |
| staff bridge | finish all pads in order |
| listening seed | M03 completes its two modeled calls; LS01-LS03 record introduction only; LS04-LS08 use the exact family thresholds below |

## Session Pacing And Natural Stop Rules

- A normal 4-6 session targets roughly 3-5 minutes: 2-3 tiny actions, one short retrieval of known material, one visible story consequence, then a rest point.
- A level id may contain several tiny actions. Do not add unrelated concepts merely to make a session look longer.
- Within a session, correct actions advance through story animation without a close or next-level modal.
- At the planned rest point, stop autoplay. Let the character sit, sleep, listen, or look toward the next destination while the world/map becomes the familiar resume surface.
- If the same target is missed twice, use the normal repair reveal. If it is still missed after the assisted retry, finish with an easy modeled success, mark `needs practice`, and stop at the next story-safe point.
- If the child repeatedly looks away, stops touching/playing, or asks to stop, do not force the review check. Preserve the completed story change and move the check to a later session.
- Do not end immediately on a wrong answer. Give one achievable repair action so the last event is a meaningful success, not a failure screen.
- Do not repeat a full check more than once in the same session. A child may voluntarily replay from the rest map, but the app must not loop practice indefinitely.
- For M07/M08 and any other full short route, a same-session check is allowed only when the guided pass did not require repeated repair, assisted/modeled success, long waiting, or an obvious stop signal. The check must have a different story function and reduced cues; otherwise end at the guided story consequence and retrieve it later.

## Retention And Spaced Review

Parent evidence needs three different meanings:

| State | Meaning | Minimum evidence |
| --- | --- | --- |
| `played` | the child completed a guided story action | guided completion with the target concept present |
| `stable` | the child retrieved the skill with reduced cues in the current learning period | the canonical family threshold below |
| `retained` | the child retrieved it again after a real rest interval | a later session, preferably another day, begins with no strong target glow and meets the same family threshold or its short review equivalent |

Rules:

- Story progress may continue on `played`; it never waits for `retained`.
- Existing `stable` records are useful immediate-performance evidence, but must not be described as long-term retention.
- MVP retained eligibility is a product scheduling rule, not a research claim: the review must use a different `sessionId`, occur on a different local calendar date, and start at least 8 hours after the qualifying stable run. Teacher/child evidence may tighten this interval before release, but implementation must not shorten it silently.
- The retained review begins without a strong target glow and must meet the same family threshold or the explicitly defined short-review equivalent. A timestamp alone never creates retained evidence.
- If the device clock moves backward, the stored timestamps are invalid, or elapsed time cannot be trusted, record the play as an ordinary review and do not grant `retained`.
- The next session should open with a 20-40 second retrieval of one previously met skill before introducing its new teaching axis.
- A wrong first retrieval does not erase earlier progress. Reveal the locator, complete one repair, and schedule that skill sooner.
- Review order prioritizes `needs practice`, then `played but not stable`, then the oldest stable skill without retained evidence.
- Schedule at most one required retained/review item in a normal 3-5 minute session. Additional due items remain in the parent-visible queue and cannot turn the child session into a drill list.
- A difficult review must not monopolize every opening. If a required review ends with repeated repair, strong/modelled help, visual assist, or a long-wait rest, keep its evidence and priority but defer that same item until at least one later, different formal child session has ended. During that history-based cooldown, another eligible review or new story may run. Refresh, debug/direct play, map navigation, and unfinished sessions do not consume the cooldown.
- Child-facing language never says `考试失败` or `退步`. Parent copy may say `今天需要提示` and `下次再找一次`.
- Even with the separate retained event now present in the browser runtime, ordinary stable reports must still say `本次减提示完成`; only a qualifying later-session event may say `隔日再次减提示完成`, and neither may say `永久掌握`.

## Canonical Mastery Thresholds

Use this table as the single threshold source for parent-facing mastery. Other files may explain the same rules, but should not invent different numbers.

| Level family | Example ids | Played once | Stable mastery | Cannot count stable if |
| --- | --- | --- | --- | --- |
| First exposure | M01 | completes the guided step | not required yet; parent view says "played" | target concept was not shown as note identity + locator |
| Guided C-D-E sequence | M02, M04, M05 | completes the sequence once | completes a later reduced-cue check for the same route with at most 1 wrong input and no strong target-key glow | only color/object matching was available |
| C-G-C leap preview | M06 | completes the guided leap once | later reduced-cue C-G-C route with at most 1 wrong input and no strong target-key glow; this is level-route evidence only | the result was promoted to independent G-key mastery |
| Short sequence memory | M07 | completes C-D-E-D-C once | reduced-cue full-sequence check, at most 1 wrong input, no strong target-key glow throughout the successful run | the second pass merely replayed the same installation state or followed visible future answers |
| Five-note climb | M08 | guided C-D-E-F-G installs all five roof panels | reduced-cue five-point seal check, at most 1 wrong input, no strong target-key glow, no assisted/modeled success, and no forced check after repeated repair | guided roof installation alone was called stable, the roof was simply rebuilt, or M08 was used as proof that F/G key homes are stable |
| F/G single-key homes | FG01, FG02 | completes each guided single-key story action | each note is retrieved in a later reduced-cue/opening-review action with the first scored response correct, no pre-response locator answer and no strong target-key glow | one guided/color-led encounter or one wrong-then-revealed retry was called stable |
| E/F/G neighbor comparison | FG03 | completes the full E-F-G comparison | reduced-cue full comparison, at most 1 wrong input, no strong target-key glow and no future-answer reveal | F/G were judged from M08 route completion alone |
| F/G staff-position preview | FG04 | completes the guided F/G staff-prep route | reduced-cue F/G prep check, at most 1 wrong input and no strong target-key glow; this proves only bridge preparation | FG04 was described as full C-G staff mastery or S01 completion |
| Staff bridge | S01 | finishes the bridge once | check run, at most 2 wrong inputs, no strong target-key glow, no F/G remediation trigger | F/G are missed twice, or strong key glow was used throughout |
| Touch listening seed | M03 | completes one full `Re -> Do` modeled-call run | completes two full runs, each with both calls correct, no target reveal before action, and no strong cue before the successful response; this remains an early seed, not broad listening mastery | only one full run exists, microphone confidence is missing/low, or target key/name was revealed before action |
| Visible pitch echo | LS01-LS03 | echoes one visibly modeled C4, D4, or E4 | no stable claim from these introduction/transfer levels alone | the app called one copied note absolute-pitch or sound-identity mastery |
| Small-set sound matching | LS04-LS05 | completes one guided C/D or C/D/E set | LS04 at least 3 of 4; LS05 at least 4 of 5, with at least one unassisted correct for each C/D/E, at most one child-requested replay, and no target reveal before each call | no reference/practice set was provided, one LS05 candidate had no unassisted correct evidence, or color/glow exposed the answer |
| Listening contrasts | LS06-LS07 | completes one guided C/G or E/F comparison | at least 3 of 4 calls for each pair without character/color as the answer | the child could solve from distance animation alone, or wrong input did not replay/compare the sounds |
| Two-note aural memory | LS08 | repeats one visible, unscored guide pair; separate-note replay is allowed only in that guided step | in one complete check session, the first complete child response is correct for at least 3 of 4 fixed pairs in order, with free timing, no separate-note replay, and at most one child-requested whole-pair replay; replay source stored separately | wrong-then-repaired or cross-session pair fragments were backfilled, unlimited replay was allowed, or the final C3 story echo, strong prelit keys, visual assist, or microphone uncertainty was counted as stable evidence |

`LS01-LS03` are `reviewableForMastery=false`. Their formal `played` records remain visible to parents, but the session scheduler must not treat them as unfinished stable skills. A later LS04-LS08 repair may reuse their visible model under a remediation role with no stable or retained eligibility.

For LS04-LS08, the numeric threshold and the cue threshold are both required. LS05 additionally requires at least one unassisted correct response for every candidate C/D/E, so a 4/5 total cannot hide a complete miss on the note that appeared once. A plain scored wrong may still leave an otherwise eligible 3/4 or 4/5 stable pass, but any pre-response target reveal, assisted strong cue, modeled success, or experimental/uncertain microphone progression blocks stable and retained for the whole run.

For LS08, the visible guide pair is not part of the four scored pairs. A child who completes it smoothly may continue into one reduced-cue check in the same session; repeated repair, strong/modelled help, long waiting, or fatigue defers that check to a later explicit session. Once a scored pair has a wrong first or second input, later repair can finish the story but cannot turn that pair into a qualifying correct. A check resumed across sessions may finish the root path but cannot create stable.

An accessibility visual-assist may reveal the letter and key position so a child who cannot use the audio route can still complete the story. That completion records observation/played/needs-practice only: it is not a listening response, cannot enter first-response correct or candidate coverage, and cannot be combined across sessions into LS04-LS08 stable or retained evidence.

### Chapter 4-5 Thresholds

| Level family | Example ids | Played once | Stable mastery | Cannot count stable if |
| --- | --- | --- | --- | --- |
| High/low register comparison | LP01 | completes the two-bubble model and the four-call story route | at least 3 of 4 first bubble choices correct, at most one child target replay in the four calls, no candidate preview after check starts, and no strong/modeled/visual answer | answer can be solved from character/color/position/stereo, a candidate was previewed without committing a response, or later repair was backfilled into the first answer |
| Low C home | LP02 | finds `C3` in the continuous two-octave keyboard with guidance | a later opening review or reduced-cue first response selects exact `C3` with no strong key locator | `C4` same-name input, experimental microphone completion, or modeled placement was accepted as low-register stable |
| Low keyboard geography | LP03-LP07 | completes a guided `C3-G3` route | reduced-cue route with at most 2 wrong inputs and correct register | octave-equivalent `C4-G4` inputs were accepted as low-register mastery |
| Bass-staff bridge | LP08-LP10 | completes the guided bass bridge | check run with at most 2 wrong inputs and no strong target-key glow | staff position or register was hidden from evidence |
| Same-name register/role turn | TH01-TH02 | completes the guided C pair and G/C transfer | later opening review presents one C pair and one G pair; 4/4 first responses use the exact register with no model tone, strong locator, target-key glow, modeled input, or cross-session stitching | same-session guided transfer or pitch alone was treated as stable or proof of physical hand use |
| Role/register relay with hand invitation | TH03 | completes the guided six-turn role/register route while one left/right invitation is shown at a time | a later separate slow-pulse review has six exact-register first responses in order, no model/strong/target-key answer, and at most 1 pulse miss; actual hand use remains optional adult observation | first guided play, note pitch, the invitation icon, or one-finger completion was treated as verified physical hand use |
| Component rehearsal and sequential bar relay | TH05 | completes supports, each high bar and each relay bar in separate child-started sessions | no stable is awarded in TH05; later evidence stays with its named TH03 role/register review or TH07-TH08 together contract | component teaching, one clean bar, pulse following, a held low note, or final bridge construction was called role/register, timing, sustain, hand or two-measure mastery |
| Paired-onset exploration | later optional TH06 | after the core TH08 garden ending, attempts the familiar `C3+C4 / G3+G4 / C3+C4` pairs; sequential fallback completes the same arch | no stable mastery in TH06; touch/MIDI may store `2 of 3 <=350 ms` only as a provisional emerging timing observation after teacher/device validation | microphone/sequential fallback, the provisional `600 ms` animation threshold, or pitch alone was called verified two-hand mastery |
| Two-layer encore observation | later optional TH07 and TH08 together-encore | completes one known bar per new session, then may attempt the known two-bar encore after the story is already complete | no general two-hand stable; an uninterrupted encore with exact order and both bar-start pairs inside the teacher-approved observation threshold may write narrowly named `twoLayerCoordinationObserved` | core relay completion, cross-session stitching, early low-note release, microphone input, or unobserved pitch data was called verified two-hand technique |

The `LP03` C3-D3-E3 subset is only a staged geography observation. It cannot create low-key stable or retained evidence by itself; the stable row above applies only after the full taught C3-G3 route exists and is completed under its reduced-cue threshold.

`LP01` keeps high/low listening separate from keyboard geography: its four scored comparisons use two fixed, neutral, equal-weight touch response homes that were heard in the model phase. During the model phase each bubble may be replayed freely. Once the four-call check begins, touching either bubble is the child's first response and plays that chosen sound; there is no separate candidate-preview action. A whole target may be replayed, but more than one child target replay across the four calls blocks stable. MIDI or microphone notes may be observed during free exploration but cannot score `LP01` or create its stable evidence. Exact C3 key finding starts in `LP02`, whose guided completion and later reduced-cue stability remain separate evidence.

Implementation rule: `played once` may keep the story moving. `stable` is stricter current-period performance and must be backed by the table above. `retained` requires the later-session rule and cannot be inferred from the first guided/check cycle.

## Mastery Gates

Completion is not the same as mastery. The game may let a child continue for flow, but the parent/teacher view must distinguish "played once" from "stable".

| Skill | Played once | Stable | Evidence to store later |
| --- | --- | --- | --- |
| `C/D/E` keyboard finding | completes one guided sequence | completes a light-scaffold sequence with at most one wrong input | first-try accuracy by note |
| `F/G` keyboard finding | reaches them in M08, then meets each home in FG01/FG02 | both F and G have a reduced-cue first-response success and the child completes the FG03 E-F-G comparison within its threshold | wrong pairs, especially E/F and F/G; evidence source must distinguish M08 exposure from FG01/FG02/FG03 proof |
| Staff `C-G` positions | finishes S01 once | finishes S01 with no more than two wrong inputs and no large target-key glow | wrong staff pad/note pairs, cue strength used |
| Sound-to-key matching | app models a known note/set and child echoes once | uses the exact LS04-LS08 family threshold; never label this absolute pitch | reference used, candidate set, replay count, wrong key, confidence when available, target, input route |
| Low `C3-G3` keyboard finding | completes one guided low route | completes a reduced-cue low route in the correct octave | target register, wrong octave, locator used, cue strength |
| Bass `C3-G3` staff positions | finishes the low bridge once | finishes bass-staff check with no more than two wrong inputs | wrong staff/note pairs, target register, cue strength |
| Same-name register/role turn | completes guided `C3-C4`, then `G3-G4` and returning `C3-C4` | later review completes one C pair and one G pair with 4/4 exact-register first responses and no strong/model answer | requested role/register, note-name correct, register correct, first response, cue/model use, actual hand unknown by default |
| Role/register relay | follows the TH03 six-turn character/register sequence; a hand may be invited but is not scored | in a later session, returns six exact-register first responses in order with no model/strong/target-key answer and at most one pulse miss | prompted role/register, note, release/rearm, pulse timing, and optional adult hand observation; pitch never proves the hand |
| TH05 component order | completes the two supports, two separate high bars and two separate relay bars | no TH05 stable state; keep stage played, help provenance and note-order observations separate | stage id, current turn, exact note/register, release/rearm, first response, cue/help, permanent result and needsPractice; do not merge this into TH03 stable or TH08 two-measure evidence |
| Simultaneous coordination | after the core ending, attempts the three TH06 same-name pairs; sequential fallback is valid completion | TH06 may record at least 2 of 3 pair deltas at the teacher-approved threshold as emerging observation only | each note time, provisional threshold version, pair delta, input route; never infer physical hand identity from pitch alone |
| Two-measure piece | core TH08 completes the two-bar relay; later optional sessions separately rehearse two-layer starts | uninterrupted together-encore may write `twoLayerCoordinationObserved` only for exact order and both teacher-approved bar-start deltas; it does not replace the core relay story record | `coreFinaleRoute`, encore stage, note order, each bar-start delta, early low-note release, optional adult observation |

Child-facing flow can stay generous. Adult-facing progress should only mark a skill "stable" when the evidence above is met.

## Chapter 4-5 Input And Hand Evidence Contract

- Touch and MIDI can verify note identity and timing; neither proves which physical hand was used from pitch alone.
- Microphone can support sequential single-note low/high tasks. It cannot verify simultaneous two-hand attacks in the MVP.
- Store `handPrompted`, `registerTarget`, `noteAccuracy`, `switchTiming`, `pairedTiming`, `inputRoute`, and optional `adultConfirmedHandUse` as separate facts.
- Parent copy may say `左手练过` or `左右手轮流练过` when the level presented those invitations. It may say `角色/音区接力稳定` only after the later relay gate. It may describe actual left/right alternation only from adult observation and must not say `左手技术已掌握` from note input.
- Child-facing core screens use a left/right hand icon but no required finger-number sequence. Optional fingering is parent/teacher guidance only and is not assessed.
- `TH01-TH05` followed by the first `TH08` core relay finale completes the 4-6 story route and opens the garden before any paired invitation. `TH06-TH07` and a later `TH08` together encore are post-story, child-started invitations and cannot withhold, reopen, or upgrade the story reward.
- Chapter 4 story completion at `LP10` is played/bounded-assisted/modeled progress, not a stable gate. Modeled completion keeps `needsPractice`, creates no child-correct/stable/retained backfill, and triggers no clean phase-tail milestone. The guided crossing and later reduced-cue signal-anchor check are separate sessions; the bridge stays built and Chapter 5 may unlock before the later stability check.

## Chapter 5 Timing And Route Contract

- Canonical piece: `4/4`, two bars, guided target `52 BPM` with `48-56 BPM` allowed.
- High part: quarter notes `C4-D4-E4-D4 | E4-D4-C4-C4`.
- Low part: whole notes `C3 | G3`; no pedal is expected.
- Exploration and separate-hand rehearsal are free-time and never fail on tempo.
- `TH03` first play is exactly one free-time six-note route with no pulse. Each note must release/rearm before the next turn; C, D, and E pairs are the only rest checkpoints. Slow-pulse evidence belongs to a later separate review and is not a speed test.
- `TH05` is resumable across five explicit short sessions: two low supports, near high bar, far high bar, relay bar 1 and relay bar 2. A session contains 2, 4, 4, 5 or 5 meaningful inputs respectively; it never chains automatically into the next stage. Finished supports, individual lights, relay steps and bridge spans persist across rests, map return and refresh.
- TH05 first teaching and component relay can write played/order observations only. They cannot reuse TH03's six-response stable gate, and pulse timing, low-note hold, invited hand, note pitch or a clean bridge result cannot prove actual hands, sustain, paired timing or complete two-measure mastery.
- Relay bar 1 is `C3,C4,D4,E4,D4`; relay bar 2 is `G3,E4,D4,C4,C4`. Each input must release/rearm, but the low anchor may release before the four-note answer. No pedal, simultaneous onset or four-beat hold is required on the core route.
- Relay completion proves turn-taking and note order only. It does not create paired or simultaneous evidence.
- A provisional `<=600 ms` guided pair may produce the friendly together animation. It is intentionally more forgiving than the provisional `<=350 ms` observation threshold; both must remain configurable and teacher/device-unvalidated, and neither may be stored as stable paired timing.
- `TH06` paired and sequential fallback must leave the same permanent practice-arch state. Paired timing may add a transient animation/audio layer, never a rarer object, badge, ending, or character approval.
- The core `TH08` relay finale always occurs first and writes the only Chapter 5 story completion. No optional session may intercept TH05's single TH08 exit or be selected from accuracy, speed, stable labels, pitch, or inferred hand use.
- The later optional together encore checks only the two bar-start pairs plus note order. Early release of a low whole note prompts coaching but does not fail, reduce an already-earned reward, or count as sustain mastery.
- `TH07` rehearses one known bar per new child-started session; a later `TH08 mode=together-encore` may join them. Fatigue, scattered timing, microphone input or preference for sequential play uses equal fallback or defers the encore without replaying the core finale.
- Do not expose BPM, milliseconds, accuracy percentages, or route labels such as `easy/hard` to the child.

## Remediation Rules

- If the same note is missed twice in one level, reveal the locator and pulse the correct key.
- If `F/G` are missed twice in S01, route the next replay toward F/G micro-practice.
- If a child completes a light-scaffold level only after many wrong inputs, show completion in the story but keep the skill as "needs practice" in parent view.
- Do not punish microphone false negatives. Ask for a quieter single note and keep touch available.
- Do not mark staff or memory checks stable if the app used large target-key glow throughout the run.
- Do not turn LS listening checks into note naming from silence. Give a modeled note, visible/heard reference, or just-practiced candidate set before reducing cues.
- If replay count rises, keep the story moving and record support used; replaying a sound is a learning action, not a wrong answer.

## Metrics To Track Later

- first-try accuracy by note;
- wrong key chosen;
- time to find key;
- repeated wrong note pairs, such as C vs D;
- whether the child relies on color before note name;
- scaffold/cue strength used during the successful run;
- microphone false detections.

## Current Implementation Gap

The app has `phase`, `focus`, `concepts`, and `scaffold` metadata. Keyboard cue strength changes in light scaffold, build-scene sockets follow reduced cue strength, local mastery records distinguish "played once" from "stable", S01 can route F/G weakness back to micro-practice, staff attempts record whether large target-key glow was used, S01 plus key build/prep checks can auto-enter reduced-cue replay, and M03 now provides a touch-only listening seed without requiring microphone or MIDI.

Recent evidence:

- `overhaul-289a` verifies a two-step M03 touch-only listening comparison: `Re/D`, then `Do/C`.
- `overhaul-290a/290b` verifies the core S01 guided-to-check replay path and parent `谱桥稳定` state.
- `overhaul-291a` verifies the first S01 color-reduced wrong-state repair and replaces no-reading staff toast prose with icon-led feedback.
- `overhaul-291b` verifies full S01 color-reduced guided/check completion and parent whole-bridge stable summary.
- `overhaul-297b` verifies the current M08 non-S01 build/prep reduced-cue replay: M08's larger foreground roof route completes `C-D-E-F-G`, auto-enters `level-check`, hides the strong target key before action, shows temporary roof-piece landing/lock motion on correct input, clears the `just-locked` animation state after settling, uses a compact correct confirmation, and reveals `Do/C -> 2黑左` only after a wrong `Re/D`.
- `overhaul-298a` verifies adaptive S01 F/G support: weak F/G prep adds a compact support marker on the current `Fa/F` or `Sol/G` staff pad, stable F/G prep does not, and `staff-check` preserves `keyboardTargetVisible=false` before action.
- `overhaul-293b` verifies one non-S01 memory/comparison reduced-cue replay: FG03 completes `Mi-Fa-Sol`, auto-enters `level-check`, hides the strong target key before action, keeps future pads as `2` and `3`, and reveals `Mi/E -> 2黑右` only after a wrong `Re/D`.
- `overhaul-294b` verifies one non-S01 memory-string reduced-cue replay: M07 completes `C-D-E-D-C`, auto-enters `level-check`, hides the strong target key before action, keeps future pads as `2`, `3`, `4`, and `5`, and reveals `Do/C -> 2黑左` only after a wrong `Re/D`.
- `overhaul-295a` verifies that M07 and FG03 wrong-state repair uses an in-scene route signal with black-key locator mini-map in both guided and `level-check` wrong states, without re-exposing the future answer sequence before the wrong input.
- `overhaul-302a` verifies the clean-state teaching slice from reset local storage through `M01`, `M03` twice, `M08`, `FG01-FG04`, and `S01`. Parent-facing states now prove introduced/played/stable separation for that route, and reduced-cue/check starts verify target-key answer hiding where expected.
- `overhaul-303a` adds `S01-mini` as a three-pad preschool observation route and reruns the same clean-state teaching slice with `124/124` checks still passing. The mini route does not write full S01 mastery or enter `staff-check`.

Remaining gaps:

- S01 adaptive first-run F/G hints exist, but the remaining proof gap is whether a real child can understand that support without adult reading.
- Reduced-cue replay now has current M07, M08, FG03, S01, and `303a` clean-state parent-mastery proof for the core slice, but still needs repeatable regression after future changes and real-child observation before generalizing the low-age claim.
- `23_TEACHING_PROOF_MATRIX.md` now defines the concrete skill-to-level proof rows; keep it in sync with this file when changing mastery thresholds.
- Microphone confidence is not yet strong enough to count as stable mastery evidence; microphone route should be saved as experimental input until confidence/retry states exist.
- Touch-only listening exists in M03, but it still needs broader coverage beyond the current `Re -> Do` seed before microphone becomes a product promise.
- Parent-facing mastery explanations need to stay separate from child-facing hints and gated settings.
