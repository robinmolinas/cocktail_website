# Type, icons and sound exploration: handoff to the experience owner

Track: "Type, icons, and sound exploration" from `../2026-10-06-parallel-work-plan.md`. Date: 6 October 2026.

## Decided

Nothing yet. Every item below needs Robin's choice. Recommendations are marked; they are not approvals.

## Delivered

| Item | Recommendation | Start here |
| --- | --- | --- |
| Type: 4 directions (current + Neue Montreal, Switzer, Satoshi) on H1, H4 (practice + longest pair), H5 and H10 (title, card, letter), at desktop, 375px and 430px | **B: Neue Montreal for the journey, Playfair for the cocktail.** Free fallback: Switzer with B's role rules | `type/compare.html`, `type/ROLE-RULES.md` |
| Flavour icons: all 9 H6 flavours, one hairline family, shown in the real spheres | Adopt as drawn; H6 flavours only | `icons/README.md`, `icons/in-app-*.png` |
| Music: 3 seamless loop concepts (felt piano, textural, nocturne trio), loudness-matched, web-encoded with loop points | **Concept 1, felt piano**, if the reading duck keeps it under the letter | `sound/player/` (audition), `sound/PRODUCTION-AND-RIGHTS.md` |
| Sound control and transitions: engine, scene map, control design, tab handling | Sound on at the descent, control visible from the landing (open decision) | `sound/player/sound-engine.js` |

## Changed

Only this folder. No file in `dionysus-experience/` was edited. The type directions were injected into the running app at screenshot time. `src/` changes in the working tree belong to other conversations.

## Checked

- **Type:** captured from the live app; every face confirmed loaded. Glyph coverage checked with fontTools. Satoshi and Switzer lack Vietnamese ễ; Neue Montreal covers everything tested.
- **Icons:** legible at 18–28px on dark and paper; they hold in the lit sphere state. Herbal was redrawn after it read as wheat, which clashes with the Gluten veto.
- **Music:**
  - loop seams measured as ordinary sample steps;
  - −22 LUFS integrated, peaks ≤ −6.8 dBFS;
  - spectrograms show no clipping or harsh bands;
  - the pipeline rebuilds bit-identically.
- **Engine (Chromium):** gesture-gated start, loop points, all five scene targets, crossfade between concepts, hidden-tab fade and suspend, mute. No console errors.

## Not checked

- No one has listened to the music; I can't audition audio.
- The Safari/AAC path and real phones are untested.
- Final licence prices are unconfirmed.
- The type was compared on injected overrides, not on a built implementation.

## Open: for Robin

1. Type direction: B (recommended), the Switzer fallback, or keep the current type.
2. Flavour icons: yes or no.
3. Music concept, and the production path: commission (recommended), Suno paid, or refine in-house.
4. Sound default: on at the descent (recommended) or off until chosen.

## Notes for the implementer

Once Robin chooses:
- **Type:** port the chosen direction as tokens plus per-role selectors (`type/ROLE-RULES.md`, "For the implementer").
- **Kicker markup:** wrap the dedication name in its own span (the Ink Rule).
- **DESIGN.md:** update §3 in the same change.
- **Neue Montreal licence:** the files in `type/_trial-fonts/` are personal-use only. Never deploy them; buy the web licence first.
- **Design log:** record the chosen direction in `_progress/00-design-log.md` as part of that change. This track did not write to the shared log, to avoid colliding with the design owner's edits in progress.
- **H4 bright frame (finding):** the practice line crosses from a dark sphere into pale smoke in every type direction. Move the line rather than darkening behind it.
- **H6 phone overlap (finding):** at 375px a lit H6 sphere overlaps its rising neighbours. This exists today.
- **Kicker wrap (finding):** a long dedication name wraps mid-label on 375px phones. This exists today; see the Dedication Rule.

## Live variants

Use these to compare the type directions in the real journey, rather than in screenshots. With `npm run dev` up on :5180, run `node variants/serve-variants.mjs`:

- `:5181` current type
- `:5182` Neue Montreal
- `:5183` Switzer
- `:5184` Satoshi

Every port also shows the H6 flavour icons. Each port is the same live app with one stylesheet added at serve time, so `:5180` and the source stay untouched. Hot reload passes through.

## Folder

```
type/      compare.html · ROLE-RULES.md · directions/*.css · screens/ · name-specimen.* · capture.mjs · _trial-fonts/ (do not ship)
icons/     svg/*.svg · size-sheet.* · in-app-*.png · capture-in-app.mjs · README.md
variants/  serve-variants.mjs (live type variants + icons on :5181–5184)
sound/     player/ (index.html, sound-engine.js) · web/ (webm, m4a, loops.json) · masters/ (48k/24-bit, ~140 MB) · previews/ · src/ · PRODUCTION-AND-RIGHTS.md
```
