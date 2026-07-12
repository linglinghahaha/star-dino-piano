# Implementation Guardrails

## Current Priority

Do not add large new modes until the existing two main loops are clear:

1. Moon Base Builder: key-finding and note identity.
2. Staff Star Bridge: staff-reading and note-to-key mapping.

## Required State Model

Each level should declare:

- note sequence;
- learning phase;
- target concept;
- scaffold level;
- visual story object;
- feedback rules.

Example:

```js
{
  id: "M02",
  phase: "follow",
  focus: ["C", "D", "E"],
  concepts: ["solfege", "letter", "keyboard-locator"],
  scaffold: "strong"
}
```

## UI Contract

Each render step should expose the same teaching fields:

- `solfege`
- `letterName`
- `keyboardLocator`
- `staffHint` when relevant
- `phaseLabel`
- `storyAction`

Do not create one-off wording per level unless the teaching structure remains consistent.

## Feedback Contract

Correct:

- name the note;
- show the story result;
- if relevant, name the staff position.

Wrong:

- name what was heard/pressed when known;
- repeat the target note;
- repeat the key or staff locator;
- pulse the correct key or pad.

## Testing Requirements

Before considering a UI iteration acceptable:

- run `node --check app.js`;
- verify the current core product proof slice: `M01`, `M03`, `M08`, `FG03`, and `S01`;
- add `M02` whenever C/D/E geography, map flow, or full-course smoke coverage is touched;
- inspect iPad-size screenshots;
- check that text does not overlap;
- check that keyboard target and black-key groups align;
- check that staff bridge is readable without zooming.
- check HTML fallback text does not advertise old color/glow-only gameplay.
- check the implementation still follows `09_SCAFFOLD_AND_ASSESSMENT_RULES.md`.
- check major changes against `15_ACCEPTANCE_GATES.md`.

## CSS And Visual Debt Guardrail

The prototype may use overrides while exploring, but release-level polish needs maintainable styling:

- group new visual rules by screen or component purpose;
- prefer existing tokens and named state attributes over broad late-file overrides;
- avoid adding another large override block when a smaller component-level cleanup would be safer;
- each major visual pass should capture map, one normal build level, FG03, and S01 screenshots;
- if a CSS file becomes too large to reason about, create a cleanup task before adding more polish on top.
- release-level visual work must update `16_ASSET_MANIFEST.md` for any product asset it uses.

## App Store / iPad Notes

For web prototype:

- touch input is reliable;
- MIDI depends on browser support and may not be reliable on iPad Safari;
- microphone listening can be prototyped but needs calibration and privacy prompts.
- do not present MIDI or microphone as required for the web prototype.

For native iPad:

- use Apple-native audio and MIDI APIs for reliability;
- include a parent gate for permissions, external links, subscriptions, and settings;
- keep child privacy and Kids Category requirements in mind from the start.

## Copyright Safety

Allowed:

- original dinosaur/space characters;
- generated or custom-made assets;
- public-domain or licensed songs;
- original melodies.

Not allowed:

- Ultraman or other recognizable protected character references;
- copied UI, character silhouettes, sound effects, or music;
- unlicensed famous melodies;
- prompts or assets that imitate a living brand too closely.
