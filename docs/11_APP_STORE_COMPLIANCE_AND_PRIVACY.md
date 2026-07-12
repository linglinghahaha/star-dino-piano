# App Store Compliance And Privacy

Last reviewed: 2026-07-11.

This is not legal advice. Re-check official rules before App Store submission.

`36_NATIVE_IPAD_AND_APP_STORE_RUNTIME_CONTRACT.md` is the authoritative implementation/evidence contract for native privacy, permissions, parent gate, local data, TestFlight, and App Store release. This file defines policy guardrails and cannot be used alone to claim a build passed.

## Official Sources

- Apple App Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Apple Kids Apps overview: https://developer.apple.com/app-store/kids-apps/
- Apple Core MIDI documentation: https://developer.apple.com/documentation/coremidi
- MDN Web MIDI API: https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API

## Kids Category Risk Areas

Because this product targets young children, assume stricter standards:

- no unnecessary collection of child data;
- no behavioral advertising;
- no external links or purchase flows without a parental gate;
- clear privacy disclosure;
- careful microphone permission language;
- no third-party analytics or SDKs until they are reviewed for child privacy;
- no user-generated free text or sharing in the child experience.

Default policy for MVP: no account, no ads, no social sharing, no third-party analytics, and no child free-text entry.

Regional note: this file is Apple-first planning, not a complete legal map. Before any public release, cloud sync, account system, analytics, subscriptions, export, or teacher dashboard, review child-privacy obligations for the actual launch regions and update the child data map accordingly.

Current external-risk note, 2026-07-10: child app distribution rules can also move at the jurisdiction or app-store level, including age-verification and parental-consent rules. Do not treat Apple Kids Category compliance as the whole legal checklist for a public release.

Parental gate note: a parental gate is a child-flow safety mechanism, not the same thing as legally sufficient parental consent for collecting, syncing, exporting, or analyzing child data. If the product ever adds accounts, cloud sync, analytics, teacher dashboards, subscriptions, export, or stored audio/input histories, review consent requirements separately for each launch region before implementation.

## Age Band And Declared Audience

Before native iPad/TestFlight planning turns into App Store work, choose the primary child age band deliberately.

Current product design target:

- primary child UX standard: pre-reading friendly, approximately 4-6;
- secondary support: 6-8 can use more letter-name and staff-position language;
- adult-facing copy: parent/teacher can see denser learning explanations.

Planning implication:

- child screens must not depend on English reading, long Chinese reading, or parent explanation;
- `Do/C`, `2黑左`, and `第一线` need visual/audio/gesture equivalents;
- any later A-G word typing mode should be older-child leaning and optional;
- if App Store Kids Category age bands or declared-age requirements are used, re-check Apple's current rules before submission;
- current planning should compare the child UX against Apple's age-band framing such as 5 and under, 6-8, and 9-11, not only the internal 4-8 shorthand.

## Permissions

### Microphone

Microphone should be optional. The app must explain:

- why it is needed;
- that it listens for piano notes;
- that it is not required to play;
- whether audio is stored or transmitted.

MVP rule: do not store or upload microphone audio.

Microphone implementation guardrails:

- process locally when possible;
- do not save raw audio;
- do not send audio to a server in the child MVP;
- do not make microphone accuracy part of a hard pass/fail gate;
- show a parent-facing explanation before requesting permission.

### MIDI

Web prototype:

- Web MIDI support depends on browser/platform support;
- do not make MIDI required;
- show fallback to touch input.

Native iPad:

- use Apple-native Core MIDI and audio-session paths for reliable hardware support;
- keep raw MIDI streams transient by default and do not infer actual left/right hand from pitch;
- test connect, disconnect, hot-plug, background/foreground, velocity-zero note-off, and touch fallback on physical devices before making reliability claims.

Marketing rule: do not claim that web MIDI works on every iPad/browser. Say "touch works now; MIDI support depends on browser/device; native iPad support is planned for reliability."

## Child Data Map

Before any release candidate, fill this table for every stored field:

| Data | Needed for | Stored where | Child data risk |
| --- | --- | --- | --- |
| Completed level ids | local progress | local device by default | low if not synced |
| Wrong note attempts | parent learning view | local device by default | moderate; keep minimal |
| Microphone audio | not needed to store | do not store | high if stored or uploaded |
| MIDI events | input handling | do not store raw stream by default | low if transient |
| Parent settings | permissions and mode choices | local device | low |

No cloud sync, account, analytics, or export should be added until this table is updated and reviewed.

## Parent Gate

Parent gate is required for:

- microphone permission explanation;
- external links;
- subscription or purchase;
- account creation;
- data export;
- teacher/parent settings;
- any web page outside the app.

Prototype note: the current parent modal is a learning/settings surface, not a real parental challenge. It is acceptable for the web prototype, but it is not sufficient for native permissions, purchases, external links, account creation, export, subscriptions, or other restricted actions.

Native release rule: the parental challenge must be outside the child answer flow, must not expose a lesson answer when it fails, and must protect permission requests, restricted settings, external links, purchases, import/export, reset, and diagnostic sharing. Its success, failure, timeout, cancellation, and app-resume states need device evidence.

## Native Privacy Evidence

Before TestFlight promotion, verify against the actual Release archive rather than planning intent:

- privacy manifest and any required-reason API declarations are present and accurate;
- microphone purpose text and in-app explanation match local processing and the no-storage/no-upload rule;
- the App Store privacy answers match every local field, log, diagnostic, network request, and third-party SDK in the shipped binary;
- the default child build contains no advertising, attribution, behavioral analytics, social SDK, account, cloud sync, or remote-course dependency;
- private voice recordings and authorization originals are excluded from source control, the app bundle, diagnostic export, and review attachments unless a separately approved workflow requires them;
- deleting/resetting local progress has a parent-gated, testable result and does not leave an undocumented child profile behind.

## Copyright And Brand Safety

`39_ASSET_ORIGINALITY_AND_SIMILARITY_REVIEW_PROTOCOL.md` is the authoritative production and external-review procedure. The allowed/not-allowed list below is an early policy boundary, not final legal clearance.

Allowed:

- original dinosaur and space art;
- generated assets that do not imitate a known brand;
- original melodies;
- public-domain or properly licensed materials.

Not allowed:

- Ultraman-like characters or silhouettes;
- unlicensed famous music;
- copied app UI or lesson screenshots;
- sound effects derived from known franchises;
- prompts that ask generation tools to imitate a protected style too closely.

## Submission Readiness Checklist

- privacy policy drafted;
- child data map complete;
- microphone copy reviewed;
- parent gate implemented;
- privacy manifest, required-reason API declarations, permission strings, SDK inventory, and App Store privacy answers checked against the Release archive;
- parent reset and local-progress migration plan drafted;
- all assets checked for originality;
- all music checked for rights;
- final asset provenance packages, runtime hashes, generated prompts/references, font/SDK licenses and independent visual/music similarity review completed under `docs/39`;
- App Store screenshots match actual app behavior;
- TestFlight install, upgrade, permission denial, offline launch, interruption/resume, migration, reset, and diagnostic-export evidence recorded on the supported device matrix;
- no claims that MIDI/microphone work universally in the web prototype.
