# Two worlds — revision 02

Centered composition with dark space on both sides, anonymous facial silhouettes, and a highball for the man alongside the woman's coupe. The before image was derived from the revealed image to preserve the geometry of the paired layers.

- [Before](before.png)
- [Revealed](revealed.png)
- [Exact prompts](prompts.md)

## Local trial

Selected again on 2026-10-09 after exploring revisions 3–5: the user prefers this first centered pair. This pair is available as **Option 3**, using the unchanged v2 PNGs. Later revisions are preserved for reference.

Open http://localhost:5180/homepage-3 or choose **Option 3** in the cover selector. The original portrait is the first option at http://localhost:5180/; the richer v5 pair is **Option 2** at http://localhost:5180/homepage-2. Query aliases `?landing=3` and `?v=3` also open this pair. Browser back/forward and refresh restore the selected option from its URL. No deployment was performed.

Both trial layers use the same centered crop. On phones and portrait tablets the artwork is sized into the upper frame so both profiles can remain visible above the copy.

Both native PNGs measure 1672 × 941 pixels. The full build passed, including image validation, data/reference checks, TypeScript and all 925 tests. Build output was written to a fresh temporary directory because the existing dist output cannot be cleared in this environment.

The artwork was visually reviewed against the owner's screenshot and original silhouette. Automated Chromium verification is unavailable because macOS denies its browser launch. The local server remains listening on port 5180, but this execution environment also cannot connect directly to its loopback interface; the owner can review the trial by refreshing their existing browser.

