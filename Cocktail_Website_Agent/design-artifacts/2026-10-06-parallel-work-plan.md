# Dionysus Continuation Plan

Created 6 October 2026 · Reconciled 8 October 2026

Continue the existing project. The [experience contract](2026-07-08-experience-master-spec.md), [pipeline spec](../agent/spec/SPEC.md) and [architecture spine](../agent/ARCHITECTURE-SPINE.md) are the build inputs; [current status](2026-10-06-continuation-status.md) records what has landed. The original conversation briefs and planning snapshots are preserved in the [archive](_archive/2026-10-08-document-refresh/2026-10-06-parallel-work-plan.md).

## Existing work and owners

| Track | Sources | Responsibility and next handoff |
| --- | --- | --- |
| Experience | Product brief, trigger map, UX scenarios, DESIGN.md, design log and evolution brief | Design owner: TheDepths, ResonanceWorld, visual CSS. Preserve approved H4/H5 and type; resolve focused mobile/video/music follow-ups. Hand answer changes to matching before wiring them. |
| Content | Pour dossiers/specs, STUDIO-RULES, collection-review applied summary and approved tagline voice | Pour Studio: preserve recipe/history truth and Robin's edits; finish tagline review and record full-pour approvals separately. Import current source after edits. |
| Matching | agent/spec, architecture, matching evidence and active initiative | Matching owner: shared schemas, catalogue, scorer and tests. Integration owner connects App/types/TheReading; story 1.5 records Robin's assignment. Journey writer coordinates story 1.6. |
| Images | Persona Image System and production queue/checkpoint | Image owner: settled physical drink/personality → candidates → exports → browser acceptance → integration. Preserve 17 existing public pairs. |

BMAD's resolved active initiative is **initiative-dionysus-continuation**. Outputs live in this app's `_bmad-output`; WDS lives in `design-artifacts`; live Pour Studio tools are the workspace-root `skills/dps-*`, synced one way into the repository. Follow the installed skill's own workflow rather than treating old help-catalog names as executable commands.

## Implementation sequence

1. Keep the completed shared scaffold, catalogue and reading assembler. Selection v1 is now merged into the primary checkout (32e8013), followed by reviewed flavour rules and refreshed evidence (67b57ef). These component merges do not connect App to the selected result.
2. Complete story 1.5: normal journey answers produce a selected authored Reading. Preserve the approved visual experience.
3. Complete story 1.6 with the design writer: stable v3 ids and browser-only diagnostics. H4 uses the current 1 / 2 example, not rehearsal repeats. H5 asks soughtFor first; optional carry applies there.
4. Retire obsolete fields/generator imports, then run privacy and desktop/phone parity checks. Preserve development fixture navigation.
5. Implement ticket 1.9: drawnToward is the **second** H5 round; replace Mischief with **Knowledge, Influence, Making, Caring**, approved by Robin on 8 October. Recheck the current world layout at twelve words and regenerate the model evidence. Keep the nine-word baseline explicit until then.
6. Epic 2 adds the Bartender, server-owned pour records, minimal gifts, crawler HTML, OG and house pours. It depends on Epic 1's shared contracts.

Content review, candidate image correction and focused design trials can continue independently. Use one writer per shared file. Work in isolated checkouts when needed; carry accepted decisions back into the named sources. A completed component, merge, normal journey walkthrough and deployed result are distinct milestones.

## Runtime rules

- Deterministic top-three eligible ordered pairings; bounded Bartender choice; failed choice uses shortlist[0].
- One authored recipe per pairing. Only yours may be tailored; invalid tailoring uses authored text verbatim.
- Vetoes filter whole pours. Development requires three veto-free; strict launch requires all 132 and twelve veto-free. All authored pours are eligible at first release; approval status stays separately visible.
- Trace and derivatives stay in the browser; name never reaches the LLM; private readings are never stored or shared.
- Lens/seed never score archetypes; flavours are bounded pour fit; timing/status are unscored diagnostics.
- Native video, dark reveal, reduced motion and one non-blocking audio owner.

## Decisions still needing attention

Music/default/source and retimed-video adoption remain open. The H1 softer-type trial, mobile control/orientation proposals, and portrait cue's faint kicker need focused decisions or verification. Q12 labels, the H4/H5 concept choice, retaining Playfair and bottom-only reading actions are already settled.

The latest tagline and image counts are dated snapshots; consult their owner records before each import or release. Catalogue technical gates are necessary checks, not a substitute for editorial or image acceptance.
