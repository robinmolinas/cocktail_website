# Dionysus — Agent Instructions & Repository Guide

Welcome to **Dionysus**. This file provides complete architecture, context, and operational instructions for AI agents working in this repository (e.g. via Conductor, Claude Code, Cursor, or Devin).

---

## 1. Project Overview

**Dionysus** is an immersive cocktail recommendation experience rooted in the concept: *"Somewhere, a cocktail that does not exist yet is waiting to be made."*

It translates an individual's psychology, tastes, and choices into a single bespoke cocktail and narrative portrait:
- **132 Archetype Pairings**: Built on Jungian archetypes (12 primary × 11 secondary pairings, e.g. Caregiver × Magician → *The Healer*).
- **The Suspended Pour**: A continuous video journey (`journey.mp4`) that pauses at specific keyframe holds (the depths, seed drops, gravities, twin embers, resonance clusters, trace, breath, and surfacing reveal).
- **The Ateliers**: The reading is authored through four distinct artistic disciplines:
  - **Wren** (Psychologist) — Maps motives, tensions, and the "this is me" inner core.
  - **Hester** (Historian) — Traces real cocktail history, lineages, and true archival anchors.
  - **Tomás** (Mixologist) — Architects the drink spec, balancing ABV, sugar, acid, and dilution against Dave Arnold's style ranges.
  - **Storyteller** — Synthesizes the portrait into a bespoke keepsake narrative.

---

## 2. Repository Structure

```
.
├── Cocktail_Website_Agent/
│   ├── dionysus-experience/        # ACTIVE web application (Vite + React 19 + Tailwind 4)
│   │   ├── public/
│   │   │   ├── personas/          # Active persona image pairs (portrait.jpg, wide.jpg)
│   │   │   └── journey.mp4        # Core journey video asset
│   │   ├── src/
│   │   │   ├── components/        # TheDepths, TheReading, TheSurfacing, CtaButton, etc.
│   │   │   ├── data/              # personas.ts, archetypes.ts, cocktails.ts
│   │   │   ├── engine/            # mixology.ts (deterministic scoring & cocktail composition)
│   │   │   └── index.css          # Design system & custom animation tokens
│   │   └── scripts/               # validate-persona-images.mjs
│   ├── design-artifacts/          # UX specifications & pour design
│   │   └── pours/                 # Pour dossiers (<pairing>.md), STUDIO-RULES.md
│   │       └── _studio/           # Pour Studio workspace (specs, fact-cards, rooms, registry)
│   └── Knowledge base/            # Background cocktail counsel research
├── docs/
│   └── _text/                     # Transcribed library of 6 core mixology reference texts:
│                                  # Oxford Companion, Liquid Intelligence, Cocktail Codex,
│                                  # Imbibe!, Joy of Mixology, A Proper Drink
├── skills/                        # Dionysus Pour Studio (DPS) skills & tooling suite
│   ├── dps-tools/                 # CLI Python tools (lint_pour.py, balance.py, allergens.py, etc.)
│   ├── dps-agent-psychologist/    # Wren's skill & capabilities
│   ├── dps-agent-historian/       # Hester's skill & capabilities
│   ├── dps-agent-mixologist/      # Tomás's skill & capabilities
│   ├── dps-author-pour/           # Room orchestration
│   ├── dps-review-desk/           # Review desk & batch assessment
│   └── memory/                    # Agent sanctums & persistent memory notes
├── Cocktail_GPT/                  # Questionnaire templates (.docx/.pdf)
└── AGENTS.md                      # This guide
```

---

## 3. Web Application Development

The active frontend code is located in `Cocktail_Website_Agent/dionysus-experience`.

### Commands
Run all webapp commands from `Cocktail_Website_Agent/dionysus-experience`:

```bash
# Start local development server
npm install
npm run dev

# Run automated image validation & full production build
npm run build

# Run linting
npm run lint

# Validate persona images only
npm run validate:images
```

### Persona Images
When adding a new cocktail pour to the active web experience:
1. **Dimensions & Format**:
   - `portrait.jpg`: Exactly **896 × 1200 px** JPEG
   - `wide.jpg`: Exactly **1920 × 1080 px** JPEG
2. **Directory**: Place under `Cocktail_Website_Agent/dionysus-experience/public/personas/<pairing>/`.
3. **Registration**: Register the pairing in `src/data/personas.ts` with tag and glass focal coordinates.
4. **Validation**: Run `npm run validate:images` (built into `npm run build`).

### Visual & Experience Principles
- **No Video Lag**: Never adjust `playbackRate` or scrub `currentTime` arbitrarily. The video plays at native 1× using `playUntil(target, callback)` and freezes on arrival.
- **Dark-to-Dark**: The journey flows from darkness to light and returns to darkness. No bright jarring white flashes.
- **Glass Affordance**: Choices ride in suspended glass spheres with subtle hover/drift motion (`.sphere-cluster`).
- **Responsive**: Desktop-first layout, adapting smoothly to mobile (`@media (max-width: 640px)`).

---

## 4. Dionysus Pour Studio (DPS) Tooling

The repository includes the full standard-library Python tooling suite under `skills/dps-tools/`.

### Key CLI Scripts
Run from anywhere in the repository:

```bash
# Lint a pour dossier against STUDIO-RULES.md
python3 skills/dps-tools/scripts/lint_pour.py <pairing>
# Example: python3 skills/dps-tools/scripts/lint_pour.py caregiver-magician

# Check balance & dilution against Dave Arnold's metrics
python3 skills/dps-tools/scripts/balance.py <spec.json>
# Example: python3 skills/dps-tools/scripts/balance.py Cocktail_Website_Agent/design-artifacts/pours/_studio/specs/caregiver-magician.json

# Check allergens conservatively
python3 skills/dps-tools/scripts/allergens.py <spec.json>

# Inspect persona profile & archetypal lineage
python3 skills/dps-tools/scripts/persona.py <pairing>

# Query the cocktail historical research library
python3 skills/dps-tools/scripts/library.py search "ramos fizz"

# Regenerate studio registry and menu assessment
python3 skills/dps-tools/scripts/registry.py --write

# Run tool regression tests
python3 skills/dps-tools/tests/test_tools.py
```

---

## 5. Deployment Model (Two GitHub Repositories)

There are two GitHub repositories involved in the project:

1. **`cocktail_website` (`origin`)** — **The Monorepo (this repo)**:
   - Contains all tracks: webapp, Pour Studio, reference library, persona images, and tools.
   - Pushing: `git push origin main`

2. **`dionysus` (`dionysus` remote)** — **The Vercel Webapp**:
   - Contains *only* `Cocktail_Website_Agent/dionysus-experience/` at root.
   - Connected directly to Vercel for live deployment.
   - Pushing web updates to Vercel:
     ```bash
     git branch -D dionysus-standalone 2>/dev/null
     git subtree split --prefix=Cocktail_Website_Agent/dionysus-experience -b dionysus-standalone
     git push dionysus dionysus-standalone:main
     ```

---

## 6. Project-Level Claude Code Skills

Third-party skills are vendored under `.claude/skills/` so they are available in every checkout (local, Conductor, and Claude Code on the web/GitHub):

| Skill(s) | Source | Update |
|----------|--------|--------|
| `impeccable` (+ `.claude/agents/impeccable-*`) | [pbakaus/impeccable](https://impeccable.style/) | `npx impeccable update` |
| `bmad`, `bmad-*`, `bmod-*` | [BMAD Method](https://docs.bmad-method.org/) | `npx skills update -p` |
| `frontend-design` | [anthropics/claude-code](https://github.com/anthropics/claude-code/tree/main/plugins/frontend-design) | re-download `SKILL.md` |

- The in-house DPS skills stay in `skills/dps-*`; `.claude/skills/dps-*` are relative symlinks to them so Claude Code discovers them too. Edit the originals under `skills/`.
- First use: run `/impeccable init` (writes `PRODUCT.md`) and `/bmad setup` (creates `_bmad/`).
- The Impeccable engine binary (`.claude/skills/impeccable/scripts/bin/`) is gitignored; the launcher downloads and checksum-verifies it on first run.
