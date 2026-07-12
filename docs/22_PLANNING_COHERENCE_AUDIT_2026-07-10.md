# Planning Coherence Audit 2026-07-10

Archive note: this is a dated audit. Its still-current findings have been folded into `18_CURRENT_PLANNING_REVIEW.md` and `08_EXECUTION_BACKLOG.md`. Use `18` as the current planning audit source. Some proof-status statements below predate `overhaul-302a`; for clean-state and S01 proof status, follow `18`, `20`, and `23`.

## Scope

This audit reviews the current planning system against the current prototype state, not just the written product intent.

Checked:

- `docs/00` through `docs/21`;
- `app.js`, `index.html`, runtime asset directories, and CSS bundle size;
- recent gate evidence in `docs/20_GATE_RUN_LOG.md`;
- current platform/market references for Apple Kids, Web MIDI, and close music-learning competitors.

This file is a dated audit. It should be folded back into `18_CURRENT_PLANNING_REVIEW.md` and `08_EXECUTION_BACKLOG.md`; it should not become another permanent competing source of truth.

Update after `overhaul-289a`: the P0 M03 mismatch called out below has been resolved. The code, map copy, cache version, and gate evidence now agree on a two-step `Re -> Do` listening comparison. The broader risks in this audit remain active.

## Short Verdict

The overall plan is reasonable and should continue.

The strongest product shape is still:

> a touch-first, original dinosaur story game where a young child connects solfege, letter name, piano key location, staff position, and heard sound by helping Xingya build a moon home and jump across a short staff bridge.

The biggest current risk is false readiness. The documents sound mature, but the prototype still has partial proof for several core promises.

Current distance estimate:

| Area | Current estimate |
| --- | --- |
| Product direction and wedge | 80-85% aligned |
| Planning coherence | 70-75% aligned |
| Teaching design on paper | 70% aligned |
| Teaching proof in prototype | 50-55% aligned |
| Low-age no-reading usability | 45-55% as audit tooling, not child-proven |
| Visual/art production readiness | 35-40% aligned |
| Native iPad/App Store readiness | 30-35% aligned |

## P0 Findings

### 1. Resolved after audit: `M03` had an unlogged half-step beyond the documents

State found during this audit:

- `app.js` now has `M03.focus: ["D", "C"]` and a second `Do` listening part.
- `app.js` also schedules the next listening prompt after a correct non-final listening step.
- `index.html` still exposes `overhaul-288a` asset query versions and map copy `听 Re/D`.
- `docs/18`, `20`, `21`, and `08` still describe M03 as one touch-only `Re/D` seed.

Risk:

- The runtime behavior, map promise, cache version, and evidence log are no longer synchronized.
- A future audit could trust the docs and miss the current two-step behavior.

Correction completed in `overhaul-289a`:

- `index.html` cache versions now use `overhaul-289a`.
- Map copy now says `听 Re / Do`.
- `20_GATE_RUN_LOG.md` contains no-reading and normal-mode evidence for the two-step `Re -> Do` flow.
- `08_EXECUTION_BACKLOG.md` and `18_CURRENT_PLANNING_REVIEW.md` now describe M03 as a two-step listening seed.

Remaining risk:

- This is still narrow listening proof. It does not yet cover `Mi/Fa`, `Do/Sol`, or microphone-confirmed input.

### 2. Audit ownership is still too crowded

Current state:

- `13`, `18`, `19`, `21`, and this file all contain audit-like guidance.
- Historical state at this audit: `README.md` said `18` was the current source while `21` was the latest strict cross-file audit. Current source ownership is maintained in `README.md` and `18`.
- `18` is already about 410 lines and contains repeated historical addendums.

Risk:

- Future work may follow the wrong paragraph because multiple files sound authoritative.

Required correction:

- Keep `18` as the only rolling current review after cleanup.
- Treat `21` and `22` as dated audits.
- Move old sections in `18` below `Historical Notes` or archive them.
- Keep `19` as story/art reference, not production checklist.

### 3. The teaching loop needs separate reveal rules for teaching, listening, and check modes

Current tension:

- `02_PEDAGOGY_AND_GAMEPLAY.md` says every step shows the target identity such as `Do/C`.
- Listening/check logic now intentionally hides the answer before the child acts.

This is not a bad design, but the document needs to separate:

| Mode | Before action | After wrong input |
| --- | --- | --- |
| Teach / first exposure | show note identity and locator | repeat full clue |
| Guided follow | show note identity and route | pulse current target |
| Listening | play sound or show sound prompt, hide target answer | reveal target note and locator, replay sound |
| Reduced-cue check | show minimal identity/visual locator | reveal stronger clue |

Without this, future UI work may accidentally reintroduce answer leaks.

### 4. `no-reading` audit is useful, but not enough for 4-6-year-old usability

Current state:

- The prototype has `?audit=no-reading` evidence for several screens.
- However, this mostly proves that the screen does not collapse when text is hidden.

Missing proof:

- a real child can infer the action from dino gesture, black-key mini-map, staff pad highlight, sound, and animation;
- wrong input teaches without requiring the child to read `Do/C`, `2黑左`, or `第一线`;
- reduced-cue replay still works without adult explanation.

Required correction:

- Add a pre-reading hint contract to `15_ACCEPTANCE_GATES.md`:
  every child-facing text clue must have a visual, audio, gesture, or animation equivalent.
- Run at least one real 4-6 child observation before claiming low-age readiness.

### 5. S01 is the flagship, but still lacks one complete vertical-slice proof

Current state:

- S01 layout, no-reading cue seed, wrong-state copy, and 1024 layout have partial evidence.
- Reduced-cue replay, clean-state parent mastery, and color-reduced checks remain incomplete.

Risk:

- The product's strongest differentiator may still be a good-looking screen rather than a proven learning mechanic.

Required S01 gate:

- fresh local storage;
- guided first run;
- wrong input;
- reduced-cue replay;
- parent state before/after;
- 1366x1024 and 1024x768 screenshots;
- no-reading and color-reduced checks;
- console/overflow result.

### 6. Sound identity is still under-proven

Current state:

- The documents correctly say sound is core.
- M03 is the only implemented listening seed, and the current code has started a two-step `Re` then `Do` version without full verification.

Required correction:

- Finish and prove M03 two-note comparison first.
- Then add small touch-only listening comparisons:
  - `Do` vs `Re`;
  - `Mi` vs `Fa`;
  - later `Do` vs `Sol`.
- Keep microphone as optional and experimental until explicit confidence states are proven.

### 7. Asset and audio release readiness is still not real

Current state:

- `16_ASSET_MANIFEST.md` defines good required fields.
- Runtime images are compressed: `assets/runtime` is 22 files and 1,267,472 bytes.
- Source/generated assets are still heavy: `assets/generated` is 50 files and 72,290,490 bytes.
- The audio ledger is mostly a plan, not an inventory.

Risk:

- Release art/audio cannot be audited for origin, prompt, license, approval, or in-app proof.

Required correction:

- Convert `16` into a real ledger with one row per kept runtime asset and audio asset.
- Retire unused staff/train/background concepts.
- Add source/prompt/license/date/model/approval/screenshot proof for every release asset.
- Add pitch/volume/license proof for piano notes and effects.

### 8. CSS size is now a product risk

Current measured state:

| File | Size |
| --- | ---: |
| `quality-overrides.css` | 1,561,003 bytes |
| `styles.css` | 224,711 bytes |
| `app.js` | 156,078 bytes |
| `index.html` | 32,055 bytes |

`16_ASSET_MANIFEST.md` says no single release CSS file should exceed 250 KB uncompressed without a cleanup decision. `quality-overrides.css` is far beyond that.

Required correction:

- Start a CSS cleanup task before another broad visual layer.
- Split by component/screen or consolidate old override layers.
- Add a production bundle rule excluding `assets/generated/raw` and unused concept art.

## P1 Findings

### 9. Parent modal and parent gate are correctly separated, but native planning needs a concrete gate

Current plan is right:

- quick parent view can explain learning status;
- restricted actions need a real adult gate later.

Missing:

- native parent-gate interaction design;
- permission explanation flow before microphone access;
- settings, reset, external links, purchase/subscription, export behind the gate.

Apple's current Kids guidance reinforces this: Kids-category apps need age-band selection and parental gates for restricted actions. See source links below.

### 10. Age target is directionally right but not operational enough

Current state:

- Docs say 4-6 first and 6-8 second.
- Apple Kids distribution asks for bands such as ages 5 and under, 6-8, or 9-11.

Recommended decision:

- Design child-facing gameplay to pass the 5-and-under/pre-reading standard.
- Let parent/teacher surfaces and optional later modes support 6-8.
- Park A-G word typing until the child can already handle letter names and A/B identity.

### 11. Competitor wedge is plausible, but only if we stay specific

Current market signal:

- Simply Piano owns broad piano lessons, song progress, and listen/onscreen-keyboard feedback.
- Note Rush owns fast staff note reading with acoustic/MIDI-style feedback and teacher customization.
- Mussila owns broader child music-learning game territory.

Implication:

- "cute piano note app" is not enough.
- The defensible wedge is narrower:
  staff-as-story-bridge + piano key locator + note identity + sound, designed for pre-reading children.

### 12. Note identity still has two sources

Current state:

- `14_NOTE_IDENTITY_MATRIX.md` is the planning source.
- `app.js` has the runtime `noteIdentityMatrix`.

Risk:

- Solfege, letter, locator, staff position, common confusion, and repair copy can drift.

Required correction:

- Keep `app.js` as runtime source for now.
- Add a sync check or move the matrix into one structured JSON/JS module before adding more notes, staff levels, or A-G word mode.

### 13. Microphone logic needs confidence states before it can affect mastery

Current state:

- Touch is reliable.
- MIDI is optional and platform-dependent.
- Microphone can feed accepted pitches into the same input path, while low confidence asks retry.

Risk:

- A false accepted pitch can still feel like an unfair wrong/correct event to a child.

Required states:

- listening;
- heard;
- uncertain;
- too noisy;
- confirmed.

Low confidence should be retry, not wrong. Microphone should not count stable mastery until these states are proven.

### 14. Session design is still missing

Docs define levels, but not a preschool-length play session.

Required correction:

- Define a 3-5 minute session:
  - 2-3 tiny missions;
  - 1 review/check;
  - 1 visible story reward;
  - natural pause.

This matters because young children do not experience the app as a backlog; they experience it as one satisfying play moment.

### 15. Accessibility and comfort need hard gates

Add gates for:

- volume cap;
- sound-off mode;
- reduce-motion mode;
- color-blind robustness;
- large touch target minimums;
- lower-brightness readability;
- no-punishment retry language.

## Not Contradictions

These tensions are acceptable if the rules above are enforced:

| Tension | Decision |
| --- | --- |
| M03 appears before Chapter 3 listening | Acceptable. M03 is the seed; Chapter 3 is the expanded listening garden. |
| A/B appear on the keyboard but are not taught | Acceptable. They preserve real keyboard geography but must stay reserved targets. |
| `Do/C` combines solfege and letter names | Acceptable. `Do` can be primary child-facing; `C` can be a small badge and parent/teacher concept. |
| Web code includes MIDI | Acceptable if copy says touch works now and Web MIDI depends on browser/device. |
| Story objects recur by note | Acceptable only if they are consequences/rewards, not the answer in reduced-cue checks. |

## Immediate Priority Order

1. Clean audit ownership: fold active `21`/`22` findings into `18` and `08`; archive old addendums.
2. Add explicit reveal rules for teach/listen/check modes.
3. Run the full S01 vertical-slice gate.
4. Add the pre-reading hint contract to acceptance gates.
5. Expand and verify touch-only listening beyond the `Re -> Do` hidden-answer seed.
6. Convert asset/audio inventory into a release ledger.
7. Start CSS cleanup and production bundle exclusion rules.
8. Define native parent gate and local progress reset/migration.
9. Define one 3-5 minute preschool session loop.

## Source Links Checked

- Apple App Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Apple Kids and age-appropriate design guidance: https://developer.apple.com/kids/
- MDN Web MIDI API: https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API
- Can I Use Web MIDI: https://caniuse.com/midi
- Simply Piano App Store page: https://apps.apple.com/us/app/simply-piano-learn-piano-fast/id1019442026
- Note Rush App Store page: https://apps.apple.com/us/app/note-rush-music-reading-game/id1083801827
- Mussila Music App Store page: https://apps.apple.com/us/app/mussila-music/id1287981140
