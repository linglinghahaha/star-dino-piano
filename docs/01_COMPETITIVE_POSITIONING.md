# Competitive Positioning

## Current Competitor Set

This project sits near several established categories in the Apple ecosystem:

- song-based piano learning: Simply Piano, flowkey, Skoove, Piano Marvel;
- multi-instrument learning: Yousician;
- child/teacher piano apps: Piano Maestro;
- basic music literacy: Duolingo Music and similar note-reading products;
- child note-reading games: Note Rush, Flashnote Derby, Mussila Music, and similar staff/ear-training apps;
- touch/MIDI/microphone beginner courses: Piano Academy and similar all-age products;
- low-age hardware + app bundles: Loog Piano;
- child video-course ecosystems: Hoffman Academy.

Current official-source check, 2026-07-23:

- close piano-course competitors still emphasize broad lessons, sheet music, song practice, and real-time feedback;
- Note Rush remains a close staff-reading / note-recognition benchmark, but its official site says `all ages`; there is no verified narrow age 4-6 claim;
- Mussila validates the child music-game space, but it is broader than our piano-specific staff/key locator wedge;
- Piano Academy already combines touch, MIDI, acoustic/electronic-piano detection, staff work, ear/rhythm games, songs and instant feedback;
- Loog Piano explicitly targets ages 3+ with hardware, app lessons, game-like exercises and screen-free cards; Hoffman Academy explicitly targets kids 5+ with lessons, games and teacher resources;
- Apple Kids work requires an official age-band choice. The current first-release candidate is `5 and under`, with parental gates for purchases, external links and other restricted actions;
- Web MIDI should not be promised on iPad/iOS Safari; native iPad MIDI remains a later path.

The dated evidence matrix and exact unknowns are in `77_APPLE_COMPETITOR_EVIDENCE_REFRESH_2026-07-23.md`. Its findings supersede the 2026-07-10 spot-check where the two differ.

Official-source implications for this planning pass:

- Apple Kids and App Review sources still frame Kids-category apps around age-appropriate content, child-data protection, and parental gates.
- MDN and Can I use still list Safari on iOS as not supporting Web MIDI, so the web prototype should stay touch-first on iPad.
- Note Rush's official site remains a close benchmark because it focuses on written-note recognition, listens for acoustic playing, supports MIDI and custom note sets, and can score speed and accuracy.
- Simply Piano, Piano Maestro and Piano Academy already cover some combination of touch, acoustic recognition, MIDI and instant feedback. None of those input methods is a unique product claim.
- Note reading, ear training, child themes, touch keyboard, microphone feedback, MIDI, songs and teacher views are established categories. The defensible hypothesis is the combined pre-reading story bridge, explicit representation transfer, honest mastery evidence, and optional-input design.
- A dedicated third-party Web MIDI browser exists on the App Store, which reinforces the point that ordinary iPad Safari should not be treated as the reliable MIDI path.

Planning note: this is a positioning scan, not a quantified market-share, effectiveness, hands-on comparison, global uniqueness, legal, or App Store Optimization report. Before final App Store copy, re-open the official sources and update the dated matrix.

## Competitor Strengths

| Product | Strength | Why we should not copy it directly |
| --- | --- | --- |
| Simply Piano | broad beginner lessons, song practice, mic/MIDI feedback | too broad and song-library driven for our early-child niche |
| flowkey | large song catalog, wait/listen style practice, polished video + sheet UI | stronger for learners who already want to play songs |
| Skoove | structured lessons, theory, listening feedback | more general piano course than character-led child game |
| Yousician | multi-instrument feedback, practice scoring, broad course format | not focused on low-age note identity and staff-as-world play |
| Piano Maestro | child/teacher-oriented piano app, strong practice flow | closest competitor; we need a more original story world and clearer pre-reading bridge |
| Piano Marvel | large library and serious assessment/practice | not the low-friction, story-first child niche |
| Duolingo Music | accessible note literacy and app-native learning | not focused on real piano key-finding or story-based instrument readiness |
| Note Rush | all-age note reading with acoustic/MIDI feedback, custom note sets and optional timer | close to staff-to-instrument recognition; we need an independently evidenced pre-reading transfer curriculum, not an unsupported age claim |
| Flashnote Derby | simple gamified flashcard-style note identification | useful benchmark for speed and clarity, but too worksheet-like for our story-world goal |
| Mussila Music | broad child music-learning game world | validates the child music-game market, but our wedge must be narrower and more piano-specific |
| Piano Academy | touch, MIDI, acoustic/electronic detection, staff/theory, ear/rhythm games, songs and feedback | proves that an input checklist is not enough differentiation |
| Loog Piano | ages 3+ hardware/app bundle, game-like lessons, artist songs and screen-free cards | owns a strong physical-product path; our evidence must come from curriculum transfer and story causality |
| Hoffman Academy | kids 5+ video curriculum, games, practice tracks and teacher resources | stronger breadth and teacher ecosystem than our prototype; real-time input was not verified in this source pass |

## Apple Ecosystem Opportunities

The Apple ecosystem is crowded, but it rewards polished, focused experiences:

- iPad is ideal for a wide on-screen piano and big staff bridge.
- Native iPad app can support reliable MIDI through Apple's Core MIDI stack.
- Microphone listening can make the app useful without a MIDI keyboard.
- Apple families expect privacy, parental gates, offline safety, and low-friction setup.
- A strong icon, screenshots, and original character world matter for App Store browsing.

## Our Wedge

The current combined-positioning hypothesis should be:

> "A dinosaur space adventure for pre-reading piano beginners that turns sound, staff position, letter name, solfege, and the same-name key into one connected story skill."

This is narrower than "learn piano fast." It is not yet a public uniqueness claim. It becomes defensible only after the proposed sound-to-staff transfer, solfege-to-letter retrieval, teacher review, and real-child observation have evidence.

## Distinctive Mechanics We Must Evidence

- Staff bridge: the five-line staff is the world path.
- Dino jump feedback: correct notes move the character, wrong notes visibly stumble and hint.
- Note passport: each note has a stable identity across sound, key, staff, and story.
- Gentle scaffold fade: color and glow help early, then gradually reduce.
- Parent/teacher view: shows exactly which representation relationship was trained, what help was used, and what remains unproven.
- Evidence honesty: story completion, played, stable, and retained remain separate.
- Optional-input path: touch is complete; MIDI and microphone enhance input but never define success.
- Copyright-safe original universe: no borrowed hero IP, no famous protected melodies unless licensed or public domain.

These are internal product requirements, not proof that no competitor has a similar feature.

## Must-win Dimensions

The product should be judged against competitors on these dimensions, not on song-library size:

| Dimension | Must be true before public release |
| --- | --- |
| Child clarity | A child can see the character, target note, keyboard area, and story result without an adult explaining the screen. |
| Music concept depth | Each target connects at least two of: solfege, letter name, keyboard locator, staff position, sound. |
| Staff originality | The staff bridge is a playable place, not a decorative worksheet strip. |
| Input resilience | Touch is complete; MIDI and microphone are optional and never block progress. |
| Parent trust | Parent view can explain the current learning goal in under 10 seconds. |
| IP safety | Characters, music, UI, sound effects, and generated prompts are original or properly licensed. |

If a feature does not improve one of these dimensions, it should wait.

## Sources To Re-check Before App Store Work

Use current official pages before final business claims:

- Apple App Store Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Apple Kids Category overview: https://developer.apple.com/app-store/kids-apps/
- Apple Kids developer page: https://developer.apple.com/kids/
- Apple Core MIDI documentation: https://developer.apple.com/documentation/coremidi
- MDN Web MIDI API compatibility: https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API
- Can I use Web MIDI compatibility: https://caniuse.com/midi
- Simply Piano App Store: https://apps.apple.com/us/app/simply-piano-learn-piano-fast/id1019442026
- flowkey App Store: https://apps.apple.com/us/app/flowkey-learn-piano/id1020357408
- Yousician App Store: https://apps.apple.com/us/app/yousician-your-music-teacher/id959883039
- Piano Maestro by JoyTunes App Store: https://apps.apple.com/us/app/piano-maestro-by-joytunes/id604699751
- Skoove App Store: https://apps.apple.com/us/app/skoove-learn-piano/id1449839723
- Note Rush App Store: https://apps.apple.com/us/app/note-rush-music-reading-game/id1083801827
- Flashnote Derby App Store: https://apps.apple.com/us/app/flashnote-derby/id453126527
- Mussila Music App Store: https://apps.apple.com/us/app/mussila-music/id1287981140
- Piano Academy App Store: https://apps.apple.com/us/app/piano-academy-by-yokee-music/id1390574671
- Loog Piano official page: https://loogguitars.com/products/loog-piano
- Hoffman Academy official page: https://www.hoffmanacademy.com/

## Competitive Risk

If we ship only a cute skin over "press the glowing key," we lose. That is not defensible. The defensible product is a child-centered note-concept trainer with a high-polish story shell.
