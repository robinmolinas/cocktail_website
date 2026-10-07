# Producer / browser reviewer handoff

## Latest workflow override — production first

Robin requested image creation now and browser checks in a later batch.
The producer heartbeat `dionysus-image-review-handoffs` is confirmed PAUSED
through the app after specific approval. No new per-candidate browser requests
are being published for this production batch. Its staged files/measurements
are not acceptance or a READY browser gate. Existing immutable requests/results
stay untouched, including the still-pending phone-layout-r1 request.
The reviewer's session watcher is separate; producer does not control it.
Earlier ACTIVE/browser-before-generation statements below are historical.

NEW READY request: `requests/pilot-caregiver-innocent-v4-phone-layout-r1.json`.
Robin authorized the producer's phone layout fix. This reuses unchanged held v4
images and tests new runtime only;17 inputs fingerprinted. Read the request's
phone scroll policy: image-first, then caption/reading in normal flow; opening
image intentionally leaves the viewport on scroll. New cue, actual seed colors,
anchors and desktop/print regressions need checking. Material hold remains
regardless of browser verdict. Original request/result unchanged. Local checks
subsequently passed under fresh explicit approval; supplementary proof is in
`producer-checks/pilot-caregiver-innocent-v4-phone-layout-r1.json`. Do not overwrite
the immutable request's earlier publication-time BLOCKED verification snapshot.

The producer owns `requests/`; the independent browser reviewer owns
`results/<batch-id>/`. Requests are immutable once `status` is `ready`.
Corrections get a new version folder and a new batch ID, never an overwritten
request. Root remains the sole integration owner; public images are untouched.

## Contract

1. Producer publishes exact candidate/version, actual image, pour, metadata and
   runtime fingerprints only after exports and photographic candidate review.
2. Reviewer verifies those fingerprints and renders the actual current Reading
   with authored copy. The existing private fixture has placeholder copy and
   is not authored-layout proof. Reviewer adaptations stay private and are
   documented separately; do not change producer assets or production code.
3. Reviewer writes `report.md`, `result.json` and linked screenshots. Record
   loaded fonts, browser version, each viewport/name/state, measured findings,
   independent scene/material observations, and actionable fixes classified
   as image, metadata, name fitting or application layout.
4. Reviewer rechecks input fingerprints at completion. A changed source makes
   the result stale. Report PASS, FAIL or BLOCKED without substituting static
   geometry, placeholder copy or disabled-motion captures for runtime evidence.
5. Reviewer sends a completion callback to producer thread
   `01a0e301-82a5-7e13-9270-2810eceb62e0`. Producer reads the report and actual
   evidence, confirms freshness, then decides correction or acceptance.

Browser PASS is only the browser gate. It never clears root material holds or
changes editorial/user approval. Producer must review actual evidence before
integrating or scaling beyond representative pilots.

## Automation status

The user pasted a completion callback from Claude Code genai-projects-61.
Producer verified and consumed pilot-caregiver-innocent-v4: fresh browser FAIL,
with a separate root material hold. Initial producer heartbeat creation was
rejected; after specific user approval, the supported five-minute heartbeat
was successfully created and its saved configuration is still ACTIVE:
`dionysus-image-review-handoffs`. It checks shared results in this chat and
continues bounded local image work when fresh actionable evidence arrives.
Keep quiet when unchanged; notify only on meaningful findings or required
decisions. No publishing, committing, pushing or deployment is authorized.
The reviewer reports job766e344b checking every five minutes only while its
session is idle, expiring after seven days. This is callback evidence, not an
independent producer inspection of that watcher. The reviewer reports no
supported direct Claude-to-Codex message route; user-pasted callbacks and
producer polling of shared files are the current route. Do not launch a
concurrent CLI resume against this chat. A saved ACTIVE producer configuration
does not guarantee future scheduler execution or substitute for browser work.

## First request

`requests/pilot-caregiver-innocent-v4.json` stays immutable and ready as historical
request evidence. Its result is complete and consumed, not pending. It covers
Before the Room v4 as a candidate, not a production release. Desktop/ultrawide
pass the browser gate; all three portrait phones fail for hero-copy/tag overlap
and vignette-darkened ink. Tag measurements need no correction. Root material
hold rejects wine filigree/patterned textures. Zero acceptance or integration.

Producer-owned receipt and experience handoff are in `../2026-10-06/`:
`browser-pilot-caregiver-innocent-v4-receipt.md` and `phone-layout-handoff.md`.
Reviewer-owned requests/results and all fingerprinted inputs were preserved.
After an image or runtime change, publish a new request with new fingerprints;
never reinterpret this FAIL as a PASS or overwrite the completed result.
