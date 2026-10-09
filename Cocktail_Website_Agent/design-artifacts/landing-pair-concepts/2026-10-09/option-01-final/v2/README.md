# Two worlds — revision 02

Centered composition with dark space on both sides, anonymous facial silhouettes, and a highball for the man alongside the woman's coupe. The before image was derived from the revealed image to preserve the geometry of the paired layers.

- [Before](before.png)
- [Revealed](revealed.png)
- [Exact prompts](prompts.md)

## Local trial

Selected again on 2026-10-09 after exploring revisions 3–5: the user prefers this first centered pair. The local trial uses the unchanged v2 PNGs. Later revisions are preserved for reference.

The active Vite development page at http://localhost:5180/ uses this pair by default. http://localhost:5180/?landing=original shows the original single portrait. Production builds continue to use the original artwork.

Both trial layers use the same centered crop. On phones and portrait tablets the artwork is sized into the upper frame so both profiles can remain visible above the copy.

Both native PNGs measure 1672 × 941 pixels. The full build passed, including image validation, data/reference checks, TypeScript and all 925 tests. Build output was written to a fresh temporary directory because the existing dist output cannot be cleared in this environment.

The artwork was visually reviewed against the owner's screenshot and original silhouette. Automated Chromium verification is unavailable because macOS denies its browser launch. The local server remains listening on port 5180, but this execution environment also cannot connect directly to its loopback interface; the owner can review the trial by refreshing their existing browser.

