# Type, Icons and Sound — Handoff

Exploration created 6 October 2026 · Decisions reconciled 8 October 2026

## Settled

- Retain **Playfair Display / Playfair / Jost**. Neue Montreal, Switzer and Satoshi alternatives were reviewed and declined; their role rules are historical comparisons.
- H1 lens phrases use weight 400.
- H6 flavour icons are approved and built in FlavourIcon.tsx: one fine line family, mark above word, Fresh as a dewdrop. Veto words have no icons.
- Portrait phones show the scene first and place title/reading below, protecting the physical tag. The existing pilot passes the recorded 320/375/390px checks. New image candidates still need their own acceptance.

## Open

**Music: integrated 8 October 2026, awaiting Robin's ear.** The rights record is complete: Starter plan, commercial use allowed ([RIGHTS.md](sound/RIGHTS.md)).
- **The take.** The "Missing Note" ElevenLabs suite, take "Glass Chords" ([prompt](sound/2026-10-08-elevenlabs-score.md)), cut into chapter cues and played by `src/audio/` in the app. The design log entry for 8 October has the detail.
- **Sound default:** on, remembered, unlocked by the door's tap.
- **Still open:**
  - Robin's listening pass (`sound/score-glass-chords/journey-*.webm`);
  - Safari/iOS and real-phone audio.
- **Superseded.** The three October sketches, the demonstration engine and the [sound proposal](sound/PRODUCTION-AND-RIGHTS.md) now stand as references only.

The H1 softer-Playfair **murmur** comparison is separate from the settled type-family decision and remains a trial. Other earlier overlap findings must be rechecked against current source before changes.

## Sources and ownership

[DESIGN.md](../../dionysus-experience/DESIGN.md) owns production tokens. The [evolution brief](../evolution/analysis/2026-10-06-experience-evolution-brief.md) owns current follow-ups; the [design log](../_progress/00-design-log.md) records acceptance.

`type/` and `variants/` retain comparison tools; `icons/` retains the icon evidence; `sound/` retains the demonstration, samples and production proposal. Historical recommendations or licence notes in these comparisons are not current type choices or purchase authorization.
