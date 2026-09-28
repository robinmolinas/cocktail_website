# SUPERSEDED — do not build from these files

Archived 2026-09-23 when `../../ARCHITECTURE-SPINE.md` replaced them. They describe
the pre-2026-09-18 front-end and are kept only for history / source material.

| File | Superseded by |
|---|---|
| `architecture.md` (stalled at step 4, 2026-06-17) | `ARCHITECTURE-SPINE.md` + `.memlog.md` |
| `store-schema.md` | Spine AD-4, AD-11 (authored cocktail fields, pairing key, `contains` vetoes) |
| `spec/output-contract.md` (8 reveal elements) | Spine AD-5/6/7 — the reading matches the final `TheReading` (tagline, epigraph, 2 paragraphs); the reading is never persisted |
| `prompts/bartender.md` | The runtime prompt now lives in code (`server/bartender/`). Its voice rules and calibrated example are still good **input** for writing that prompt, but it reads the trace, which AD-2 forbids |
| `data/New Revamped Questionnaire.docx` | The live journey (`TheDepths.tsx`) + `shared/answers.ts` (Answers v2) |
| `data/cocktail-workflow-v0.json` | n8n v0 — the runtime is Vercel + Hono (spine) |
| `data/fixtures/` | Real persona answers on the OLD questionnaire; irreplaceable, not usable as-is for calibration |
