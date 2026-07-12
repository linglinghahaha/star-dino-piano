# Apple Ecosystem Strategy

## Why iPad First

iPad is the best first target because:

- landscape screen can fit staff bridge and piano keyboard together;
- touch piano is usable for young children;
- parents are used to guided learning apps on iPad;
- later native build can support reliable MIDI and audio input.

## Native App Implications

Eventually publishing as an iPad app likely requires:

- access to macOS + Xcode for native iPadOS build, signing, and submission; owning a personal Mac is not strictly required;
- at least one physical iPad during implementation and the full supported-device matrix before release;
- App Store developer account;
- privacy disclosures;
- parental gates;
- careful permissions around microphone and external links;
- native Core MIDI or equivalent native MIDI handling;
- original assets and audio.

The web prototype can validate gameplay first. Native work should begin after one teaching vertical slice is stable enough to act as a parity reference, not after every visual detail is finished. `36_NATIVE_IPAD_AND_APP_STORE_RUNTIME_CONTRACT.md` is the authoritative migration and release contract.

Native work is staged:

1. `N0` proves packaging, touch, one Core MIDI path, audio-session interruption, local persistence, offline launch, and the parent-gated microphone permission path without claiming curriculum completion.
2. `N1` migrates one approved teaching vertical slice and compares its correct, wrong, repair, modeled, rest, and resume behavior against the frozen Web contract.
3. `N2` migrates Chapters 1-5 in contract order without changing note sequences, thresholds, story causes, or reward equality during the rewrite.
4. `N3` freezes the device matrix, TestFlight evidence, privacy disclosures, screenshots, metadata, and App Store submission answers.

The architecture remains open until `N0` evidence exists. Full native SwiftUI/SpriteKit and a bundled local WebView with native bridges are both candidates; neither is accepted merely because it can produce an IPA.

Platform promise rule:

- Treat iPad web as touch-first. Do not promise Web MIDI on iPad Safari in product copy.
- As of the 2026-07-10 planning check, iPad/iOS Safari should be treated as not supporting Web MIDI for this product plan.
- Web MIDI can remain a desktop/prototype option where the browser exposes it.
- The reliable iPad MIDI promise belongs to a later native build using Apple's Core MIDI path.
- MIDI and microphone must never block child progress.
- Web Service Worker, browser local storage, and desktop Web MIDI results cannot substitute for native offline, migration, Core MIDI, lifecycle, or audio-session evidence.

## Apple-specific Product Advantages To Lean Into

- "Works even before buying a MIDI keyboard": touch-first onboarding.
- "Grows into real piano": native MIDI and acoustic input later, after reliability checks.
- "Parent-readable learning goals": concise dashboard.
- "Kid-safe original world": no IP-risk theme.
- "iPad landscape as instrument": large, stable keyboard and big staff bridge.

## App Store Screenshot Story

Future screenshots should show:

1. Dinosaur on staff bridge.
2. Real piano-like keyboard with `Do/C` target.
3. Correct jump and star destination.
4. Parent view showing learning goals.
5. Optional microphone/native MIDI/touch input choices, only after those paths are reliable enough.

Do not lead with a generic landing page.
