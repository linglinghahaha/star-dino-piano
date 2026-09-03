# App Store Compliance And Privacy

Last reviewed: 2026-07-30.

This is not legal advice. Re-check official rules before App Store submission.

`36_NATIVE_IPAD_AND_APP_STORE_RUNTIME_CONTRACT.md` is the authoritative implementation/evidence contract for native privacy, permissions, parent gate, local data, TestFlight, and App Store release. This file defines policy guardrails and cannot be used alone to claim a build passed.

`64_WEB_DATA_PERMISSION_AND_NETWORK_INVENTORY.md` and its JSON sidecar are the exact current-Web inventory for the unapproved 367b browser/PWA experience candidate; 367a is the visual predecessor, 366a the teaching-core predecessor, and 365b the frozen static/source recovery owner. The frozen 359a manifest remains the separate adult-preflight/child-observation boundary, while 364b/364a remain older frozen recovery/input predecessors. The inventory documents all six `localStorage` keys, two `sessionStorage` keys, the same-origin cache, microphone/MIDI behavior and the absence of external runtime endpoints. Browser hidden/pagehide microphone release, the parent-only two-step local-learning reset and the Web parental-challenge reference now pass independently. Release remains blocked because the Web challenge is not a native child-resistant gate, MIDI disconnect and physical-device evidence are incomplete, and native/device/store privacy evidence is missing. `75_PRELIMINARY_PRIVACY_DISCLOSURE_AND_APP_STORE_ANSWER_MAP.md` translates these facts into a parent-readable draft and conditional App Store answers without claiming publication or release approval.

The 359a observation hold remains stricter than the general microphone policy below and applies to the frozen observation package, not merely to the live browser candidate. Browser lifecycle and local-reset evidence do not authorize child microphone use; adult physical-iPad preflight and the `docs/38` permission/interruption matrix remain required, and both candidates retain `observationAllowed=false` until the applicable evidence is accepted.

## Official Sources

- Apple App Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Apple safe and age-appropriate experiences: https://developer.apple.com/kids/
- App Store Connect age-rating setup: https://developer.apple.com/help/app-store-connect/manage-app-information/set-an-app-age-rating/
- Apple age-rating values and definitions: https://developer.apple.com/help/app-store-connect/reference/app-information/age-ratings-values-and-definitions/
- Apple privacy manifest files: https://developer.apple.com/documentation/bundleresources/privacy-manifest-files
- Apple third-party SDK requirements: https://developer.apple.com/support/third-party-SDK-requirements/
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

Before native iPad/TestFlight planning turns into App Store work, keep three separate decisions explicit:

- internal teaching target: `4-6`; this controls lesson language, observation and interaction assumptions;
- Apple global age rating: questionnaire-derived and region/OS dependent; current Apple values for the latest operating-system generation include `4+`, `9+`, `13+`, `16+`, and `18+`;
- Kids Category age band: a separate Made for Kids metadata choice of `5 and under`, `6-8`, or `9-11` when the app is eligible for that category.

The internal teaching target is not an App Store rating, and a global `4+` rating is not the same field as the Kids Category `5 and under` band. Apple currently allows Made for Kids selection when the calculated rating is `4+` or `9+`; after App Review approves that selection, subsequent updates remain subject to Kids Category requirements and the age-band choice cannot be casually treated as editable. The final questionnaire result, regional ratings and Kids selection must be captured from the actual App Store Connect record.

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

Age-assurance boundary:

- `Declared Age Range`, `PermissionKit`, and significant-change permission flows are not default dependencies merely because the product is for children;
- evaluate them only if the final native product requests age-range information, adapts features by declared age, introduces covered communication, or makes a change that triggers the relevant Apple flow;
- any adoption requires a separate data-minimization, entitlement, sandbox, parental-consent and regional-law review. Do not add an account, network service, SDK or child-data field just to claim age-assurance readiness.

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

Prototype note: 365b adds a Web-reference two-threshold challenge, but it is not a native parental gate and is not sufficient for native permissions, purchases, external links, account creation, export, subscriptions, or other restricted actions.

Native release rule: the parental challenge must be outside the child answer flow, must not expose a lesson answer when it fails, and must protect permission requests, restricted settings, external links, purchases, import/export, reset, and diagnostic sharing. Its success, failure, timeout, cancellation, and app-resume states need device evidence.

## Native Privacy Evidence

Before TestFlight promotion, verify against the actual Release archive rather than planning intent:

- privacy manifest and any required-reason API declarations are present and accurate;
- every listed third-party SDK in the final Release archive has the Apple-required valid privacy manifest and, where required, SDK signature; repackaged or transitive SDKs remain in scope;
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
- App Store age-rating questionnaire, resulting global/regional ratings and any Made for Kids age-band selection recorded as separate fields;
- parent reset and local-progress migration plan drafted;
- all assets checked for originality;
- all music checked for rights;
- final asset provenance packages, runtime hashes, generated prompts/references, font/SDK licenses and independent visual/music similarity review completed under `docs/39`;
- App Store screenshots match actual app behavior;
- TestFlight install, upgrade, permission denial, offline launch, interruption/resume, migration, reset, and diagnostic-export evidence recorded on the supported device matrix;
- no claims that MIDI/microphone work universally in the web prototype.
