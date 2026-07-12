# Visual, Audio, And Interaction Standards

## Art Direction

The product should feel like a polished children's iPad app:

- warm space adventure;
- small dinosaur guide;
- original moon/planet/bridge world;
- tactile toy-like objects;
- readable music objects;
- no borrowed superhero, TV, anime, or movie IP.

## Screen Hierarchy

Child-facing screens should answer these questions visually:

1. Where is the character?
2. What does the character need?
3. Which note is being trained?
4. Where is that note on the piano?
5. What changed after I played?

If a screen cannot answer these without adult explanation, redesign it.

## Staff Bridge Visual Rules

- Staff area gets priority over top labels.
- Five lines must be thick enough and spaced enough for a child to distinguish.
- Use short one- or two-measure layouts.
- The staff should read as a bridge/path, not a floating worksheet.
- Current target should glow.
- Future notes should be visible but quieter.
- Dinosaur bubble should be compact and contextual.

## Piano Keyboard Rules

- White/black key positions must match real piano grouping.
- `2 black` and `3 black` groups should be visually discoverable.
- Visible white-key labels use letter names only: `C D E F G` and, when unlocked, `A B`. Solfege may remain in a non-leaking `aria-label`, but not as a second visible key-cap label.
- The target key may glow, but the key locator must also be shown.
- Pressed keys need tactile motion: down movement, highlight, sound, and small particle.
- Wrong key should show a gentle correction, not punishment.

## Text Rules

Use short labels:

- ordinary UI: `C`
- `2-black left`
- `ledger line`
- `first line`

Avoid long instructions in the play area. If solfege or a name-to-name explanation is needed, put it in the dinosaur bubble or gated parent view. Ordinary cards, routes, hints, feedback, effects, and results must not show `Do/C` dual labels.

## Audio Rules

Audio should support learning, not just decoration:

- each note press plays the correct piano tone;
- correct effect is bright but short;
- wrong effect is soft and non-scary;
- level complete has a recognizable motif;
- dinosaur can use tiny vocal-like cues later, but avoid licensed character voices.

## Asset Production Rules

Every generated or purchased asset needs a lightweight record before release:

| Asset type | Required states | Record |
| --- | --- | --- |
| Dinosaur | point, listen, happy, try-again, celebrate, jump | prompt/source, generation date, approved file path |
| Piano parts | white keys, black keys, pressed key, target hint, wrong hint | custom/vector/source note |
| Story objects | floor, lights, wheel, bridge, wall, star, roof, staff pad, planets | original prompt/source and style check |
| Effects | correct sparkle, wrong puff, landing ripple, bridge jump trail | source/license and volume/intensity notes |
| Sounds | piano notes, correct, wrong, complete, optional dino chirps | source/license, sample rate, loop/one-shot flag |

Generated assets must not ask for a protected franchise, artist, studio, toy line, superhero, TV, anime, or movie style. Use internal style words such as "warm toy-like space adventure", "rounded child-safe shapes", and "clear music-learning object".

## Audio Interaction Requirements

- Piano note playback should be short, in tune, and consistent across touch, MIDI, and microphone feedback.
- Correct and wrong effects should be quieter than the piano note so they do not hide pitch memory.
- Microphone recognition should expose confidence internally; low confidence should produce a gentle retry state, not a wrong-note penalty.
- On iPad, all audio must unlock from a user gesture and keep working after orientation changes.

## Animation Rules

Every animation should clarify cause and effect:

- press key -> note energy travels;
- correct -> object lands or dino jumps;
- wrong -> dino stumbles and target clue pulses;
- complete -> destination changes.

Decorative animation is allowed only when it does not hide the music target.
