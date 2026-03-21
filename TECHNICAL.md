# Constitutions d'Afrique — Technical Reference

How things ARE built. Current codebase state only. For roadmap, see ROADMAP.md. For thesis context, see THESIS.md.

## Architecture

Single-page interactive visualization dashboard. No build system, no bundler, no server required. Opens directly via `file://` in any modern browser.

## Constraints

- **No ES modules** — `closeBio()` called from HTML `onclick` attribute; must remain global
- **No build tools** — standalone visualization, works with `file://` protocol
- **No package.json / no npm** — Python deps in `pyproject.toml` (uv), zero JS dependencies
- **data.js is a single line** — byte-identical extraction from original monolith, never reformat
- **Script loading order** — `data.js` → `app.js` (both synchronous `<script>` tags at end of `<body>`). DATA is referenced at top-level in app.js.

## Tech stack

### Dashboard (frontend)
- **D3.js v7** (CDN) — map projection, SVG charts, scales, axes
- **Vanilla JS** — no framework, no jQuery
- **CSS3** — custom properties, grid, flexbox, sticky positioning, media queries
- **Google Fonts** — Libre Baskerville (headings), Source Sans 3 (body)
- **GeoJSON** — Natural Earth 110m admin boundaries (fetched at runtime from GitHub CDN)

### Data science (Python)
- **uv** — dependency management (`pyproject.toml`). Run scripts with `uv run`.
- **pandas, numpy** — data manipulation
- **matplotlib, seaborn** — thesis figures
- **scipy, scikit-learn** — statistics, clustering, PCA
- **openpyxl** — Excel spreadsheet reading
- **pdfplumber** — PDF text extraction (constitution texts)
- **python-docx** — Word document reading (case law notes)
- **ipykernel** — Jupyter notebook support

## File structure

```
CLAUDE.md             — Project context for Claude Code (must be at root)
TECHNICAL.md          — This file (architecture reference)
THESIS.md             — PhD thesis context (business equivalent)
ROADMAP.md            — Priorities, known issues, decisions
pyproject.toml        — Python dependencies (managed by uv)
Makefile              — Development commands
notebooks/
  eda_constitutional_dataset.ipynb  — EDA on the structured dataset
src/
  index.html          — HTML skeleton (~160 lines)
  styles.css          — All CSS (~660 lines)
  data.js             — Inline dataset (362KB, 1 line) — DO NOT REFORMAT
  app.js              — Application logic (~830 lines)
data/
  tableau_constit_pays_af_complet_copie.xlsx   — Source spreadsheet
  constitutions/      — 54 PDF constitutions (constituteproject.org)
  sources/            — Reference documents (PhD plan, legal texts, ACHPR decisions)
docs/
  session-prompts.md  — User prompts from initial development session
scripts/
  prepare_data.py     — Data preparation pipeline (xlsx → json)
  extract_constitutions.py — PDF → plain text + preamble extraction
  country_mapping.json — English filename ↔ French spreadsheet name mapping
  review.sh           — Automated review system (L0-L3)
  recheck_findings.py — Verify findings integrated into ROADMAP.md
  dod_check.sh        — Definition of Done enforcement (lint + clean git)
  review_prompts/     — L2/L3 sub-agent prompt files
.claude/
  settings.json       — Hooks (PostToolUse lint, Stop DOD/tmp/findings)
  ops/                — Hook documentation (OPS.md + per-hook docs)
```

## Color system

All semantic colors defined as CSS custom properties in `:root` (styles.css). JS reads them once at startup via the `CSS` object (top of app.js).

### Theme palette (light academic)
| Variable | Value | Usage |
|----------|-------|-------|
| `--bg` | `#f6f3ee` | Page background (warm parchment) |
| `--card` | `#ffffff` | Card backgrounds |
| `--border` | `#d8d0c4` | Borders, separators |
| `--text` | `#1e2a3a` | Primary text (deep navy) |
| `--muted` | `#5e6a78` | Secondary text |
| `--dim` | `#8a94a4` | Tertiary text, axis labels |

### Heritage colors
| Variable | Value | Heritage |
|----------|-------|----------|
| `--francophone` | `#4a5a9a` | Indigo |
| `--anglophone` | `#9a3a4a` | Burgundy |
| `--lusophone` | `#2a7a5a` | Forest green |
| `--other-h` | `#7a8088` | Slate gray |

### Score & pill colors
`--score-x/p/v`, `--pill-bg-v/p/x`, `--pill-c-v/p/x`, `--stroke-default`, `--axis-grid`, `--hatch-bg/stroke`

### Adding a new color
1. Add variable to `:root` in `styles.css`
2. Add property to `CSS` reader in `app.js`
3. Reference as `CSS.myColor` in JS

Exception: `HERITAGE_COLORS` gradient intermediates (X/P/V per-heritage ramps for D3 scale interpolation) stay as JS constants — not semantic CSS.

## app.js section order

1. CSS Custom Property Reader
2. Constants & Color Scales (HERITAGE_COLORS, HERITAGE_SCALES, HC, HL, HM_SHORT)
3. Application State (selDims, selYear, selCountry, mapMode, hmSort, hmFilter)
4. Utility Functions (numVal, getState, compScore, fillFor, isIndependent, isSplitYet, getParentCountry)
5. Scale Bar / 2D Legend
6. Dimension Buttons (buildDimBtns, syncDims)
7. Mode Switch (buildModeSwitch, resetStrokes)
8. Map (initMap, renderMap, updateMap)
9. Tooltip Handlers (onHover, onMove, onLeave)
10. Bio Panel (onClick, openBio, closeBio, showCommentary, renderBio)
11. Slider & Play
12. Heatmap Table (renderHeatmap, initHeatmapFilters)
13. Divergence Charts (renderDivergence + annotations)
14. Scatter Plot (renderScatter)
15. Initialization

## Data model

### DATA object keys
| Key | Type | Used by |
|-----|------|---------|
| `country_timelines` | `{country: [{year, name, comment, features, has_feature_data}]}` | Map, bio panel |
| `features` | `["Dpa","F","Dau","Drc","Drm","Id","La","PJ","Dc","Dis"]` | All renderers (iteration order) |
| `feature_labels` | `{code: "French label"}` | All renderers |
| `feature_matrix` | `[{PAYS, F, Dc, ..., F_label, Dc_label, ...}]` | Heatmap, scatter |
| `colonial_heritage` | `{country: "francophone"|"anglophone"|"lusophone"|"other"|"mixed"}` | Map, heatmap, scatter |
| `heritage_groups` | `{heritage: [countries]}` | (legacy, not actively used) |
| `heritage_divergence` | `{feature: {heritage: [[year, score], ...]}}` | Divergence charts |
| `independence_dates` | `{country: year}` | Map (colonial hatching) |
| `border_splits` | `{country: {parent, split_year}}` | Map (pre-split rendering) |
| `name_to_iso` | `{country: "ISO_A3"}` | Map (GeoJSON matching) |
| `ratif_data` | `{country: {treaty: "X"|"P"|"V"}}` | Scatter plot |
| `treaties` | `["DUDPA","PIDCP","PIDESC","CERD","C169","CADHP"]` | Scatter plot |
| `country_region` | `{country: "region"}` | Bio panel metadata |

### 10 features (rarest → most common)
`Dpa` (Peuples autochtones), `F` (Fédéralisme), `Dau` (Autonomie), `Drc` (Droits culturels), `Drm` (Droits des minorités), `Id` (Identité), `La` (Langues), `PJ` (Pluralisme juridique), `Dc` (Décentralisation), `Dis` (Anti-discrimination)

### Scoring
X = absent (0), P = partial (1), V = recognized (2)

## Responsive breakpoints

- `1000px` — map sidebar stacks, divergence grid → single column
- `768px` — smaller map, compact cards/tables, smaller fonts
- `600px` — phone layout, 300px map, wrapped dimension buttons

## External dependencies (runtime)

- `https://cdn.jsdelivr.net/npm/d3@7` — D3.js
- `https://fonts.googleapis.com/...` — Google Fonts
- `https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson` — map boundaries

## Commands

| Command | Description |
|---------|-------------|
| `make review` | Quick review: L0+L1 (~5s) |
| `make review-full` | Full review: L0+L1+L2 (~1-2m) |
| `make review-deep` | Deep review: L0+L1+L2+L3 |
| `make check` | JS syntax + DATA JSON validation |
| `make open` | Open in default browser |
| `make clean` | Remove generated/backup files |
