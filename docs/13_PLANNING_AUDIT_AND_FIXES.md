# Planning Audit And Fixes

Last reviewed: 2026-07-09.

Latest follow-up review: see `18_CURRENT_PLANNING_REVIEW.md` for the current consistency audit, including note matrix sync, earlier touch-only listening, parent-control separation, asset ledger gaps, and iPad Web MIDI wording.

## Verdict

The product direction is sound: the strongest wedge is not a generic piano course and not a character skin over glowing keys. The defensible product is a story-based first-note trainer that connects solfege, letter names, keyboard location, staff position, and sound through a playable staff bridge.

The current planning set is usable, but it is not yet tight enough for a mature app build. Several items are directionally correct but too broad, stale, or hard to verify. These fixes should be treated as guardrails before the next major UI, art, and gameplay pass.

## Decisions To Lock

### 1. Stage Boundaries

Do not mix these stages:

| Stage | Purpose | Exit gate |
| --- | --- | --- |
| Web prototype | prove the core loop and interaction feel | touch path works, S01 is playable, no major layout confusion |
| Teaching vertical slice | prove C-D-E-F-G learning value | child can finish M01-M08, FG01-FG04, and S01 with understandable feedback |
| TestFlight MVP | prove iPad reliability and privacy shape | native or wrapped build has stable audio, local progress, parent gate, and no misleading input claims |
| App Store 1.0 | public release | polished assets, privacy policy, child safety review, App Store screenshots match behavior |

Do not spend release-level effort on broad content before the teaching vertical slice passes.

### 2. Age Bands

The target range `4-8` is too broad for one UX assumption.

Use two internal bands:

| Band | Product implication |
| --- | --- |
| 4-6 | pre-reading friendly, large targets, voice/sound support later, minimal text, parent setup |
| 6-8 | can use more letter names, short labels, staff position naming, optional A-G word mode later |

Child-facing text must still work for the younger band. Parent/teacher view can carry the longer explanation.

### 3. Fixed Do Assumption

MVP uses fixed-do mapping:

- `Do = C`
- `Re = D`
- `Mi = E`
- `Fa = F`
- `Sol = G`

Do not introduce movable-do or transposition until the first-note course is stable.

### 4. Identity System Before More Levels

Before adding many new levels, maintain `14_NOTE_IDENTITY_MATRIX.md` as the planning source for C-D-E-F-G:

| Note | Solfege | Keyboard locator | Staff position | Story object | Color role | Common confusion |
| --- | --- | --- | --- | --- | --- | --- |
| C | Do | two-black left | ledger line below staff | first floor / start pad | scaffold only | D |
| D | Re | two-black middle | below staff | wheel / middle light | scaffold only | C/E |
| E | Mi | two-black right | first line | light / lower star | scaffold only | D/F |
| F | Fa | three-black left | first space | landing pad | scaffold only | E/G |
| G | Sol | three-black left-middle | second line | star gate | scaffold only | F/C leap |

Every new mechanic must say which identity links it trains. The current code still needs to make this matrix a real implementation source or a checked sync target.

## Main Gaps

### A. Acceptance Gates Are Too Soft

Several documents say "clear", "polished", "child-friendly", or "mature app-level" without measurable failure conditions. `15_ACCEPTANCE_GATES.md` now defines gates that can fail:

- 4-6-year-old friendly screen: character, target, keyboard area, and result must be identifiable without reading a paragraph.
- Staff bridge: five lines and current pad readable at iPad landscape size without zoom.
- Teaching loop: every step exposes note name plus either key locator, staff position, or sound cue.
- Color reliance: a reduced-cue level must be passable without matching object color.
- Parent clarity: parent can state the current learning goal in under 10 seconds from the parent view.

### B. Microphone Promise Is Risky

Microphone input is valuable, but it should remain optional until measured. The web prototype should not treat microphone detections as hard failure evidence.

Required before promoting microphone:

- confidence value exposed internally;
- octave mistakes handled gently;
- low-confidence input becomes retry, not wrong;
- only active note set is recognized;
- no raw audio storage or upload;
- parent-facing permission copy before request.

### C. Parent View Versus Parent Gate

The product needs both:

- quick parent learning view: what the child is practicing now;
- parent gate: permissions, external links, purchases, settings, export, privacy.

Do not put permission or purchase controls directly in the child play flow.

### D. S01 Remediation Is Partially Implemented, But Not Fully Proven

The docs correctly say F/G weakness should route back to micro-practice. The implementation now records wrong targets and can route F/G weakness from S01 back to a repair level. Remaining work:

- make S01 first-run hints react to prior weak F/G readiness;
- prove the repair route with screenshot and interaction checks;
- verify the reduced-cue replay/check mode after the generous first pass;
- show repair as a story reason, not a punishment.

### E. Art Direction Needs Production Discipline

Generated art is allowed, but release work needs traceability through `16_ASSET_MANIFEST.md`:

- every asset has source/prompt/license notes;
- every dinosaur pose has an approved state;
- screenshots are checked at iPad landscape and smaller browser sizes;
- no prompts reference protected franchises, studios, living artists, TV, anime, movie, toy, or superhero styles.

### F. CSS And UI Technical Debt Are Now Product Risk

The prototype has accumulated large override CSS. Before release-level polish, consolidate styles enough that screens can be maintained and visually verified.

Minimum rule:

- new visual polish should go through named screen sections and token-like variables;
- do not keep adding broad late-file overrides without a cleanup task;
- each major UI change needs screenshot comparison for map, one build level, FG03, and S01.

## Contradictions Or Stale Points

| Area | Issue | Fix |
| --- | --- | --- |
| `09` current gap | was stale after S01 F/G repair routing was added | updated to "routing exists; stronger hints, cue-strength evidence, and visual proof remain" |
| Sound identity | north star includes real piano sounds, but microphone is not release-reliable yet | add touch-only listening first, phrase microphone as growth path in Web prototype |
| Age range | `4-8` treated as one group | split internal assumptions into 4-6 and 6-8 |
| Parent view | educational display and restricted settings are not separated enough | define quick view versus gated settings |
| Mature art | asset production is listed but no release gate ties it to screenshots and manifest | require asset record and screenshot audit through `16_ASSET_MANIFEST.md` |
| A-G words | useful idea but may conflict with low-age pre-reading and needs A/B notes | keep parked until core loop is stable and A/B identity is defined |

## Applied In This Audit Pass

1. Added fixed-do and age-band notes to the north star.
2. Updated scaffold implementation gap to match the current code state.
3. Added a technical-debt gate to implementation guardrails.
4. Added a planning repair section to backlog before the next polish pass.
5. Added `14_NOTE_IDENTITY_MATRIX.md` as the note identity source.
6. Added `15_ACCEPTANCE_GATES.md` for hard pass/fail checks.
7. Added `16_ASSET_MANIFEST.md` for release asset traceability.

## Next Implementation Priorities

1. Verify the reduced-cue S01 replay/check mode with screenshots and interaction checks.
2. Make S01 first-run hints react to weak F/G readiness and verify the repair route visually.
3. Connect note labels, staff hints, and story objects to the note identity matrix.
4. Run `15_ACCEPTANCE_GATES.md` screenshot and interaction checks after each major UI pass.
5. Fill source/prompt/license status in `16_ASSET_MANIFEST.md` before release-level polish.
