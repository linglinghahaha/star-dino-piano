# Planning System Audit 2026-07-10

Archive note: this is a dated audit. Its still-current findings have been folded into `18_CURRENT_PLANNING_REVIEW.md` and `08_EXECUTION_BACKLOG.md`. Use `18` as the current planning audit source. Some proof-status statements below predate `overhaul-302a`; for clean-state and S01 proof status, follow `18`, `20`, and `23`.

## Scope

This audit reviews the current planning set as a system, not as isolated documents:

- `00-20` planning documents in `docs/`;
- current implementation signals in `app.js`, `index.html`, and `quality-overrides.css`;
- current asset-size state in `assets/runtime` and `assets/generated`;
- lightweight external checks for App Store/Kids/Web MIDI/competitor assumptions.

This file does not restart the product direction. It records contradictions, missing gates, and priority corrections so later implementation does not drift.

## Short Verdict

The overall plan is reasonable and worth continuing.

The strongest product remains:

> A touch-first, story-led first piano literacy game where a small original dinosaur builds a moon home and jumps across a short staff bridge, gradually linking solfege, letter name, keyboard location, staff position, and heard sound.

The biggest risk is not the idea. The biggest risk is false readiness: the documents now sound mature, but several key promises still have partial proof only.

Current distance estimate:

| Area | Estimate |
| --- | --- |
| Product direction and wedge | 80-85% aligned |
| Planning coherence | 75-80% aligned |
| Teaching design on paper | 70% aligned |
| Teaching proof in prototype | 50-55% aligned |
| Low-age no-reading usability | 45-55% as audit tooling, not proven child usability |
| Visual/art production readiness | 35-40% aligned |
| Native iPad/App Store readiness | 30-35% aligned |

## What Is Solid

| Area | Audit result |
| --- | --- |
| Narrow product wedge | Correct. Do not compete as a broad song-library piano app. The defensible claim is note identity through a playable staff bridge. |
| Copyright/IP direction | Correct. Original dinosaur/space/moon/staff world avoids the Ultraman/protected-franchise problem. |
| Input priority | Correct. Touch is the reliable MVP path. MIDI and microphone are optional growth paths. |
| Fixed-do first course | Correct for this MVP: `Do=C`, `Re=D`, `Mi=E`, `Fa=F`, `Sol=G`. Do not add movable-do or transposition yet. |
| C-D-E then F/G then staff bridge | Correct. The added `FG01-FG04` bridge prevents S01 from arriving too abruptly. |
| A-G word typing | Correctly parked. It should wait until A/B have full identity rows and the main C-G loop is stable. |
| Mastery split | Correct. "Played once" and "stable mastery" must remain separate in parent view. |
| Gate evidence habit | Improved. `20_GATE_RUN_LOG.md` is the right mechanism, and recent screenshot logs are useful. |

## Major Tensions And Corrections

### 1. Audit ownership is still messy

Problem:

- `13`, `18`, `19`, and now this file all contain audit-like guidance.
- `18_CURRENT_PLANNING_REVIEW.md` is marked as the current audit source, but it has become long and repetitive.

Risk:

- Future work may pick an older paragraph and treat it as current.

Correction:

- Keep `18` as the rolling current review only after it is cleaned.
- Move older addendums in `18` under a clear `Historical Notes` heading or archive them.
- Treat `13` as historical planning repair notes.
- Treat `19` as story/art reference, not production checklist.
- Historical context: at creation time this `21` file was the latest strict cross-file review; its still-current decisions have now been folded into `18` and `08`.

### 2. Note identity has two sources

Problem:

- `14_NOTE_IDENTITY_MATRIX.md` is the planning source.
- `app.js` has the practical `noteIdentityMatrix`.

Risk:

- Solfege, letter name, locator, staff hint, common confusion, and repair copy can drift.

Correction:

- Before adding more levels, choose one structured source of truth.
- Best near-term path: keep `app.js` as runtime source and add a sync check against a JSON/MD table later.
- Hard-fail any A/B target use in level, staff, listening, or word-mode target lists.

### 3. Age range is directionally split but not operational enough

Problem:

- Docs say 4-6 and 6-8 are different, but the production target is still fuzzy.
- Child-facing UI still uses `Do/C`, `2黑左`, and staff-position words heavily.

Risk:

- A 4-6-year-old may need adult reading help, which violates the intended first-use experience.

Correction:

- Make the child UI pass a pre-reading standard first.
- Decide native/App Store primary band before TestFlight planning.
- Keep English letters as compact badges and parent/teacher concepts, not the only child instruction.

### 4. No-reading audit is useful, but not equivalent to child usability

Problem:

- `?audit=no-reading` hides text and proves the screen is not totally text-dependent.
- It does not prove a real child understands the task.

Risk:

- We may call screens "low-age ready" because labels are hidden, while the actual play still feels unclear.

Correction:

- Keep the no-reading audit, but require a real 4-6 child observation before claiming low-age readiness.
- Gate should include: first try, wrong input, reduced-cue replay, and parent-free comprehension.

### 5. Sound identity promise is still thin

Problem:

- The north star includes heard sound.
- Historical state at this audit: current proof was mainly M03 with one touch-only `Re/D` seed. Current rolling status is maintained in `18`.

Risk:

- Marketing or parent copy may overclaim sound training.

Correction:

- Add touch-only listening comparisons before microphone promotion:
  - `Do` vs `Re`;
  - `Mi` vs `Fa`;
  - later `Do` vs `Sol`.
- Keep microphone as experimental mastery evidence until confidence states are explicit.

### 6. Staff bridge is the flagship, but vertical-slice proof is incomplete

Problem:

- S01 is conceptually the product's strongest differentiator.
- Current evidence is partial: layout, hierarchy, no-reading cue seed, and wrong-state checks exist, but reduced-cue replay and clean-state mastery proof are still missing.

Risk:

- The flagship may look good in a screenshot but not yet prove staff reading.

Correction:

- Run one full S01 vertical-slice gate:
  - guided first run;
  - wrong input;
  - reduced-cue replay;
  - clean local storage;
  - parent state before and after;
  - 1366x1024 and 1024x768 screenshots;
  - no-reading/color-reduced view.

### 7. Story beats are good, but level gameplay can still become repetitive

Problem:

- `10`, `17`, and `19` define a good story arc.
- But many Chapter 1 levels can still reduce to "press note, object appears."

Risk:

- The game feels like a themed drill rather than a real child game.

Correction:

- Every level needs a tiny visible problem before the note and a visible consequence after the note.
- Use animation as teaching:
  - wheel rolls left/right on wrong C/E in M03;
  - wall rises halfway on wrong F/G in M06;
  - roof climbs by physical step in M08;
  - dino jump lands exactly on staff pad in S01.

### 8. Parent modal and parent gate are not the same thing

Problem:

- Current parent modal is useful for learning status and input options.
- It is not a real parental challenge.

Risk:

- Native release could violate Kids-category expectations around permissions, links, purchases, export, settings, and subscriptions.

Correction:

- Keep current modal for web prototype.
- Before native/TestFlight, design a real parent gate for:
  - microphone permission explanation;
  - external links;
  - purchase/subscription;
  - data export;
  - settings;
  - progress reset.

### 9. Microphone route needs clearer states

Problem:

- The implementation has confidence thresholds, but accepted microphone pitches can still route into the same input path as touch/MIDI.

Risk:

- False accepted pitches may confuse the child or contaminate mastery records.

Correction:

- Add explicit states:
  - listening;
  - heard;
  - uncertain;
  - too noisy;
  - confirmed.
- Low confidence should be retry, not wrong.
- Microphone should not count toward stable mastery until these states are proven.

### 10. Asset manifest is a good idea but not yet a release ledger

Problem:

- `16_ASSET_MANIFEST.md` lists required fields.
- Inventory rows are still mostly provisional and do not yet include full prompt/source/license/screenshot proof.
- Audio ledger is not filled.

Risk:

- Release art and sound cannot be audited for rights, consistency, or production readiness.

Correction:

- Convert `16` into a real ledger with columns for:
  - final runtime path;
  - source path;
  - generation model/date or license source;
  - prompt summary;
  - approval status;
  - screenshot proof;
  - replacement/retirement decision.
- Add audio records for piano notes, correct/wrong effects, completion motif, UI tap, and any dino voice-like cue.

### 11. CSS and bundle size are now product risks

Current measured state:

| Item | Current size |
| --- | --- |
| `quality-overrides.css` | 1,560,294 bytes |
| `app.js` | 155,273 bytes |
| `index.html` | 32,055 bytes |
| `assets/runtime` | 22 files, 1,267,472 bytes |
| `assets/generated` | 50 files, 72,290,490 bytes |

Risk:

- Runtime image compression is good, but CSS maintainability is still weak.
- Generated assets must not be bundled as runtime production assets.

Correction:

- Start a CSS cleanup task before another broad visual layer.
- Define production bundle exclusion rules for `assets/generated/raw` and unused concept backgrounds.
- Keep runtime images compressed and screenshot-verified.

### 12. Acceptance gates are still too manual

Problem:

- `15_ACCEPTANCE_GATES.md` is strong conceptually.
- But several gates still rely on human impression without required artifacts.

Risk:

- A pass can be declared without clean-state proof, reduced-cue proof, or parent-state proof.

Correction:

- Every major gate run must include:
  - build/version;
  - viewport;
  - screen list;
  - input route;
  - pass/fail per gate;
  - screenshot path;
  - wrong-input result;
  - no-reading result;
  - color-reduced result;
  - clean-state parent mastery result;
  - console/overflow result.

### 13. Session design is missing

Problem:

- The docs define levels, but not a preschool-length session.

Risk:

- The app may become an endless drill loop.

Correction:

- Define a 3-5 minute session:
  - 2-3 tiny missions;
  - 1 review/check;
  - 1 visible story reward;
  - natural pause.

### 14. Accessibility and comfort need hard rules

Missing or under-specified:

- volume cap;
- sound-off mode;
- reduce-motion mode;
- color-blind robustness;
- large touch target minimums;
- no-punishment retry language;
- visual clarity under lower brightness.

Correction:

- Add these to `15_ACCEPTANCE_GATES.md` or a new accessibility section before TestFlight planning.

### 15. Competitor wedge is plausible but must stay specific

Lightweight external check:

- App Store has note-recognition/ear-training piano games, including products that advertise note recognition, ear training, simple melodies, and stickers.
- Apple Kids guidance currently asks developers to choose age bands such as 5 and under, 6-8, or 9-11 and comply with Kids-category rules.
- MDN currently reports no Web MIDI support for Safari on iOS.

Implication:

- The docs are right not to compete on "we teach piano notes" alone.
- The stronger wedge is: staff-as-story-bridge plus keyboard locator plus note identity plus sound, designed for pre-reading children.
- Before final product copy, re-check App Store competitor pages and Apple rules again.

References checked:

- Apple App Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Apple Kids apps guidance: https://developer.apple.com/kids/
- MDN Web MIDI API: https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API
- Can I Use Web MIDI: https://caniuse.com/midi
- Example App Store note-reading app: https://apps.apple.com/jp/app/learn-music-notes-piano/id1205662433?l=en-US&platform=ipad

## Not Contradictions

| Tension | Decision |
| --- | --- |
| M03 has listening before Chapter 3 | Acceptable. M03 is the seed; Chapter 3 becomes the expanded listening garden. |
| Story objects recur by note | Acceptable only if objects are consequences/rewards, not the answer in reduced-cue checks. |
| `Do/C` uses both solfege and letter name | Acceptable. `Do` can be child-facing; `C` can be a small badge and parent/teacher concept. |
| Web prototype includes MIDI code | Acceptable if product copy says touch works now and Web MIDI depends on browser/device. |
| Generated art is used | Acceptable for prototype; release use needs manifest, source, prompt/license, screenshot proof, and IP review. |

## Priority Order

### P0: Prevent Drift

1. Clean `18_CURRENT_PLANNING_REVIEW.md` into one current section plus historical notes.
2. Decide the note-identity source of truth or add a sync check.
3. Add a hard pre-reading hint contract: every text clue needs icon/audio/gesture/animation equivalent.
4. Run the full S01 vertical-slice gate.

### P1: Prove Teaching

1. Finish 1024x768 no-reading/color-reduced checks for M08, FG03, and S01.
2. Prove clean-state parent mastery: introduced vs stable.
3. Expand touch-only listening beyond M03 `Re/D`.
4. Make FG03 and M08 less label-dependent through motion and key locator visuals.

### P2: Prepare Production

1. Convert `16_ASSET_MANIFEST.md` into a real visual/audio ledger.
2. Start CSS cleanup and production bundle rules.
3. Define native parent gate and local storage schema/reset/migration.
4. Add accessibility/comfort gates.
5. Choose the primary App Store age band before native work.

## Final Decision

Do not restart the concept and do not add broad new modes yet.

The next work should prove the current vertical slice:

- M01 first note identity;
- M03 touch-only listening;
- M08 five-note climb;
- FG03 E/F/G comparison;
- S01 staff bridge guided run and reduced-cue replay;
- parent view showing played-once vs stable;
- child-facing no-reading clarity.

Only after that slice passes should the project expand into broader content, A-G word typing, native MIDI, or release-level marketing.
