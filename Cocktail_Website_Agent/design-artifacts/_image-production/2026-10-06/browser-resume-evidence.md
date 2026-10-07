# Browser evidence reconciliation

This session exposed no browser automation connector. The approved private
review server attempt returned `listen EPERM 127.0.0.1:5179`; the installed
headless Chromium attempt failed OS bootstrap/Mach-port permissions before
opening a page. No fresh screenshot or app visit succeeded here.

The browser skill's package-download runner was rejected by auto-review as
remote dependency execution. It was not retried or bypassed. A plugin search
found browser connectors disabled by the administrator and unavailable to
install; those restrictions were not bypassed.

Later inspection discovered previously saved `browser-tag-check/results.json`,
`tag-check.mjs` and screenshots. Their on-disk modification times are 19:35–19:41
on October 6. Root read the complete runner and inspected saved phone images.
The report contains 308 cases for the previous 22 selected versions: 199 carry
PASS labels and 109 carry flags. Every pairing has at least one flag. These
are saved evidence, not runs performed in this session or final acceptance.

The fixture renders the actual Reading component with calibration copy. The
runner waits for `document.fonts.ready`, freezes animations near the resting
state and compares named/bare screenshots, glyph boxes and measured paper.
It does not record application/image hashes, actual loaded font identities,
the environment's optional name nudge, or a complete breathing/scroll sweep.
Its luminance-based paper classification can flag dark paper as non-paper;
review pixels manually instead of treating every percentage as a proven defect.
Placeholder copy also cannot prove that the authored title/tagline will fit.

Confirmed visual evidence: the saved caregiver-innocent/v2 phone screenshots
show the title crossing the physical tag and the name buried in the lower
scrim; at 320px the paper/name are largely obscured. The caregiver-creator/v4
saved phone screenshot is more nuanced: the name appears largely on paper,
so its non-paper percentage requires manual review. This is why geometry,
ink-on-paper and full-page readability are separate gates.

The new caregiver-innocent/v4, caregiver-creator/v7 and caregiver-outlaw/v10
exports are not covered by that saved run. Existing screenshots are preserved,
not overwritten or relabelled as checks of new assets.

After finding these artifacts, a read-only check still found no local server
on port 5179. A fresh attempt to launch the already-installed full Chromium
on `about:blank` was explicitly rejected by auto-review: executing externally
sourced browser/dependency code lacked a trusted exact approval marker,
despite the earlier user approval in this conversation. No alternate launcher,
remote installation, disabled protection or delegated bypass was attempted.
At that checkpoint, fresh session-specific approval was required to retry.

## Latest explicit session approval and retry

Robin explicitly requested launching the installed Playwright/Chromium and
local review app in this session. Both commands cleared execution review.
The unchanged private Vite server still exited with `listen EPERM` on
127.0.0.1:5179. The installed full Chromium launched a process but terminated
with SIGABRT before opening `about:blank`; Playwright also reported `kill EPERM`
and temporary-directory cleanup restrictions. Both command sessions exited 1.
No browser page, screenshot or running review server resulted. Existing public
assets and earlier browser evidence remain untouched.

The current blocker is the local execution environment, not missing approval.
Do not ask Robin for the same approval again or retry unchanged commands.
No alternate privileged launcher, new browser installation or disabled process
protection was used to bypass the restriction.

Robin then reported Chromium enabled/open. After the permission profile changed
to expose approved npm/dev and Playwright/screenshot prefixes, root rechecked:
tool discovery still exposed no browser-control connector; the approved server
again failed `listen EPERM`, and the installed screenshot CLI failed before
navigation with Chromium Mach-port bootstrap permission denied (SIGTRAP).
No current screenshot was created. An open normal browser window is not evidence
that this chat has a connected browser-control tool. Clarify that connection
instead of requesting more generic approval or repeating the same launches.

Next: obtain a functioning permitted local-execution/browser session or
user-assisted screenshots; check corrected candidates
with Ada and Alexandria-Rose, actual loaded font, authored page copy, arrival,
rest/reduced motion, breathing endpoints/intermediate phases and scroll. Resolve
phone tag/copy overlap with the experience owner before scaling. Do not infer
that an image fitting its cover window means the page is ready.
