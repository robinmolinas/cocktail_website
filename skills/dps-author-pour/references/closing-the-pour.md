# Closing the Pour

Turn what the room wrote into the pour file, prove it, and leave the studio tidy. Paths: `{pours}` = `{project-root}/Dionysus/Cocktail_Website_Agent/design-artifacts/pours`, `{studio}` = `{pours}/_studio`, `{tools}` = `{project-root}/skills/dps-tools/scripts`. Files use `{document_output_language}`.

## Assemble
`python3 {skill-root}/scripts/room.py assemble <pairing>` builds the pour from the agents' artifacts in `{studio}/work/<pairing>/` into `_host/provisional.md`, then lints it. It copies their words exactly, because the host arranges and never rewrites. What it needs from you is `_host/config.json`. That holds the title fields as the room settled them (name, tagline, epigraph, glassware, `contains` from the spec, `veto_free`), which files to take (the reading version, the fact card), and the host-arranged dossier text: the language row, sources, names note and open items, each drawn from what the agents wrote. The keys are listed in `room.py --help`. It takes the anchors table from `historian-anchors.md`; the recipe, method, closingLine, Checks, image brief and names from `mixologist-draft.md`; and the latest `historian-audit*` and `psychologist-resonance*` files (or the reading's own Resonance section). If an agent has named a file differently, ask them to use these names. The shape it produces (`{pours}/sage-lover.md` is the canonical one):

- **Frontmatter:**
  - `pairing`, `personality`
  - `archetypes: <Primary> × <Secondary> (never shown to the guest)`
  - `status: draft` (or `flagged`, with a `flag:` line saying why)
  - `veto_free: true|false`
  - `authored_in: the room, <date>`
- **`## Cocktail`:** bullets for `name`, `tagline`, `glassware`, `contains` (a JSON list in backticks), and `serves` if more than one. Then the recipe table (amount | item | note (shown)), the numbered method, and `**closingLine:**`.
- **`## Anchors`:** the table (kind | fact | meaning | speaksTo).
- **`## Reading`:** `**epigraph**`, `**whoYouAre**` (paragraphs), `**yours**` (numbered paragraphs).
- **`---`**, then **`## Dossier (research only — never shipped)`:**
  - `### Checks`: Tomás's table, plus the language row
  - `### Fact audit`: Hester's
  - `### Resonance`: Wren's verdict and the "this is me" line
  - `### Sources`
  - `### Legends and inferences`
  - `### Image brief`: Tomás's SCENE block
  - `### Names considered`
  - `### Open items`: unsourced values, paywalled sources, anything for Robin

**`contains`** comes from the spec, never from judgement: `python3 {tools}/allergens.py {studio}/specs/<pairing>.json`. If it stops on an ingredient not yet in the table, send it back to Tomás to add with `add_ingredient.py` (safe-side allergens). It's never a reason to flag the pour, and it's not Robin's to approve.

## Prove it
- `python3 {tools}/lint_pour.py {pours}/<pairing>.md --spec {studio}/specs/<pairing>.json` must show **0 errors**. If it doesn't, don't fix it yourself: reopen the room with the findings addressed to their owners, then reassemble.
- `python3 {tools}/balance.py {studio}/specs/<pairing>.json` must not be OUT, unless the room's Checks table justifies it (in which case the pour is `flagged` for Robin).

## Leave the studio tidy
One call does all of this except the summary and the rule candidates: `python3 {skill-root}/scripts/room.py close <pairing> --summary <file> --index-note "<pairing>: <Name> (<drink>), draft, <n> rounds" --batch <primary>`. It writes the pour, lints it (and stops on any error), runs balance and allergens, writes the registry, closes the room record with your summary, and adds the note to the batch row. What it does, step by step:
- `python3 {tools}/registry.py --write`, so the next room sees this pour's name, tagline, epigraph and motifs.
- **The room record:** set the header to `status: closed` (or `flagged`) with the final must-haves and sign-offs, and write **Summary for Robin**:
  - the persona in one line
  - the story chosen and the runner-up
  - the versions that failed and why
  - the "this is me" line
  - the names debated and the pick
  - any edge or flag
  - rule candidates

  The summary describes the conversation. It never adds to the pour's content.
- **Rule candidates** the room proposed go as rows in `{studio}/rule-candidates.md`.
- **`{studio}/index.md`:** update the batch row, or add a line for a single pour.
- The scratch folder stays as the audit trail.

## Tell Robin
Interactive: give the pour's name and tagline, the "this is me" line, any flag or edge, and links to the pour and its room record. Mention that `dps-review-desk` is where he reads, edits and approves. Headless: return `{"status": "complete"|"flagged", "pour": "<path>", "room": "<path>"}` and nothing else.
