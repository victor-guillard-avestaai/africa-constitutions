# Constitutions d'Afrique — Project Context for Claude Code

## Principles

**Simplicity above all.** When in doubt, do less, better. Avoid over-engineering.

**Long-term health (MLTPHP).** Every decision should promote the long-term health of the project. Entropy accumulates fast. Structure things so the project gets easier to navigate over time, not harder.

**Leave it cleaner than you found it.** When touching a file, clean up what's around it — unused code, dead functions, stale comments. When new code replaces old code, delete the old code.

**Academic tone.** Light theme, serif headings, muted scholarly palette. No neon, no dashboard-bro aesthetics.

**Plan before building.** For any non-trivial task, STOP and present a brief plan before writing code.

## Workflow

### Build mode / Review mode

Two modes of working. Don't mix them.

**Build mode** (default): Implement features, fix bugs, write code. Focus on progress.

**Review mode** (on request): Three tiers, triggered by natural language:
  - **"review"** → `make review` — L0+L1 only (~5s). After every feature.
  - **"full review"** → `make review-full` — L0+L1+L2 (~1-2m). Between features or before push.
  - **"deep review"** → `make review-deep` — L0+L1+L2+L3. Before milestones.
  Phases:
  - **L0:** Self-check — required files exist, index.html references correct
  - **L1:** Mechanical — JS syntax, DATA JSON, CSS↔JS sync, TODOs, console.logs
  - **L2:** Documentation accuracy — sub-agents verify TECHNICAL.md, ROADMAP.md, THESIS.md, dead code
  - **L3:** Architectural — sub-agents assess coherence, thesis alignment, feasibility
  Targeted: `--l0-only`, `--l1-only`, `--l2-only`, `--l3-only`
  Prompts in `scripts/review_prompts/` — edit these to change what gets checked.
  **Findings tracking:** Saves to `scripts/last_review.json`, exits non-zero if new findings aren't in ROADMAP.md Known Issues. After integrating, run `python3 scripts/recheck_findings.py`.

### Clipboard

Victor shares files via `tmp/` in the project root. Check this folder before doing anything else.

### Project management

- Read `ROADMAP.md` for current priorities. Read `THESIS.md` for thesis context.
- Before starting a feature, check if it's the current milestone priority.
- Update ROADMAP.md when features complete or decisions are made.

## Definitions

- **KB** — Knowledge base: CLAUDE.md, TECHNICAL.md, THESIS.md, ROADMAP.md, memory files
- **CB** — Codebase: src/, scripts/
- **DOD** — Definition of done
- **MLTPHP** — Most Long-Term Project Health Promoting. Decision lens: pick the approach that best promotes long-term health. Usage: "What is the MLTPHP solution?"

## What this is

Interactive data visualization dashboard exploring how 54 African countries recognize ethnocultural diversity in their constitutions (1847–2026). Technical contribution to a PhD in international constitutional law. The dataset encodes 10 dimensions of constitutional identity recognition across 54 countries and 439 texts. See THESIS.md for full thesis context, TECHNICAL.md for architecture.
