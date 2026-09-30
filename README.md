# Dionysus — The Cocktail Within You

> *"Somewhere, a cocktail that does not exist yet is waiting to be made."*

Dionysus is an immersive digital journey of self-discovery that distills a person’s psychology, instincts, and choices into a single, bespoke cocktail portrait.

---

## The Experience

- **The Suspended Pour**: An interactive video-journey questionnaire (`journey.mp4`) that pauses at critical holds: the quiet depths, the liqueur seed, gravitational polarities, twin embers, effervescent resonance clusters, and the final breath before surfacing.
- **132 Archetype Pairings**: Built on Jungian archetypes (12 primary × 11 secondary pairings). Every combination resolves to a distinct cocktail with its own historical lineage, balanced recipe, and storytelling narrative.
- **The Keepsake**: The surfacing reveals a bespoke cocktail portrait, complete with ingredient measurements, tasting notes, preparation ritual, and personalized psychological narrative.

---

## Repository Map

| Directory | Description | Stack / Format |
| --- | --- | --- |
| `Cocktail_Website_Agent/dionysus-experience/` | **The active web application** deployed to Vercel | React 19, TypeScript, Vite, Tailwind CSS 4 |
| `Cocktail_Website_Agent/design-artifacts/pours/` | Pour dossiers, design specifications, and `STUDIO-RULES.md` | Markdown, JSON |
| `Cocktail_Website_Agent/design-artifacts/pours/_studio/` | Cocktail development studio (fact cards, room logs, specs, menu registry) | Markdown, JSON |
| `skills/` | Dionysus Pour Studio (DPS) skills, CLI tools, and agent memory | Python 3, Markdown |
| `docs/_text/` | Archival research library (Oxford Companion, Liquid Intelligence, Cocktail Codex, Imbibe, Joy of Mixology, A Proper Drink) | Markdown |
| `Cocktail_GPT/` | Questionnaire templates and historical prompt artifacts | .docx, .md |

---

## Quick Start

### 1. Web Application

```bash
cd Cocktail_Website_Agent/dionysus-experience
npm install
npm run dev      # Local dev server at http://localhost:5173
npm run build    # Validates persona images, type-checks, and builds production bundle
```

### 2. Dionysus Pour Studio (DPS) Tools

The repository contains standard-library Python tools under `skills/dps-tools/`:

```bash
# Lint a pour dossier against the studio rulebook
python3 skills/dps-tools/scripts/lint_pour.py <pairing>

# Verify cocktail balance, ABV, sugar, and dilution
python3 skills/dps-tools/scripts/balance.py <spec.json>

# Search the cocktail history library
python3 skills/dps-tools/scripts/library.py search "negroni"

# Run tool regression suite
python3 skills/dps-tools/tests/test_tools.py
```

---

## Agent & Automation Guidance

For detailed system architecture, agent roles, conventions, and Vercel deployment instructions, see [AGENTS.md](file:///Users/robin.molinas/Documents/GenAI%20Projects/Dionysus/AGENTS.md).
