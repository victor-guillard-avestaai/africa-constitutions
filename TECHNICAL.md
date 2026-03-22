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
- **GeoJSON** — Natural Earth 50m admin boundaries (fetched at runtime from GitHub CDN)

### Data science (Python)
- **uv** — dependency management (`pyproject.toml`). Run scripts with `uv run`.
- **pandas, numpy** — data manipulation
- **matplotlib, seaborn** — thesis figures
- **scipy, scikit-learn** — statistics, clustering, PCA
- **voyageai** — legal-domain embeddings (voyage-law-2) for semantic clustering
- **umap-learn** — dimensionality reduction for embedding visualization
- **openpyxl** — Excel spreadsheet reading
- **pdfplumber** — PDF text extraction (constitution texts)
- **python-docx** — Word document reading (case law notes)
- **python-dotenv** — API key management (.env)
- **ipykernel, nbconvert** — Jupyter notebook support

## File structure

```
CLAUDE.md             — Project context for Claude Code
TECHNICAL.md          — This file
THESIS.md             — PhD thesis context
ROADMAP.md            — Priorities, known issues, decisions
pyproject.toml        — Python dependencies (uv)
Makefile              — Development commands (make review, lint, check, etc.)
.env                  — API keys (gitignored)
notebooks/
  eda_constitutional_dataset.ipynb  — EDA: structured dataset (M1a)
  eda_constitution_texts.ipynb      — EDA: PDF corpus (M1b)
  m2_constitutional_text_analysis.ipynb — Text analysis: Ch.1/Ch.5 (M2)
  post_conflict_analysis.ipynb      — Post-conflict interaction (transversal)
  m4_clustering_embeddings.ipynb    — Semantic clustering: Voyage + UMAP (M4b/c)
  m4d_kwic_topics.ipynb             — KWIC + BERTopic (M4d)
  m3_m5_case_law_analysis.ipynb     — ACHPR case law: timeline, citations, Ogiek (M3/M5)
  thesis_figures.ipynb              — 13 thesis figures: maps, dumbbell, radar, boxplot, dendrogram, etc. (bilingual)
src/                  — Dashboard (open index.html in browser)
  index.html          — 7-tab dashboard (~300 lines)
  styles.css          — All CSS (~700 lines)
  data.js             — Inline dataset (362KB, 1 line) — DO NOT REFORMAT
  app.js              — Application logic (~1060 lines, D3 charts)
  figures/            — Thesis figures copied for web serving (gitignored from data/figures/)
data/
  tableau_constit_pays_af_complet_copie.xlsx   — Source spreadsheet (54 countries)
  constitutions/      — 54 PDF constitutions (constituteproject.org)
  constitution_corpus/ — 54 extracted plain text files (from extract_constitutions.py)
  preamble_corpus/    — 49 extracted preamble text files
  sources/            — Reference documents (PhD plan, legal texts, ACHPR decisions)
  achpr_cases.json    — 30 extracted ACHPR cases (M3/M5)
  case_law_analysis.json — Doctrinal concepts, cross-system citations (M5)
  extended_coding_v2.json — 12 sub-categories: land/resources + cultural rights (M6)
  embeddings/         — Voyage voyage-law-2 embeddings (gitignored, regenerable)
  figures/fr/         — 36 thesis-quality PDFs + PNGs in French (gitignored, regenerable)
  figures/en/         — 36 thesis-quality PDFs + PNGs in English (gitignored, regenerable)
  ne_50m_admin_0_countries.geojson — Natural Earth 50m boundaries (cached for choropleth maps)
  appendix/           — CSV tables for thesis methodology appendix (M7)
docs/
  session-prompts.md  — User prompts from initial development session
  linguistic_decisions.md — Translation caveats and language map
scripts/
  prepare_data.py     — Data preparation pipeline (xlsx → data.js)
  extract_constitutions.py — PDF → plain text + preamble extraction
  embed_constitutions.py — Voyage API embedding pipeline
  process_caselaw.py  — ACHPR case law validation + JSON export
  country_mapping.json — English filename ↔ French spreadsheet names (54 entries)
  post_conflict_coding.json — Post-conflict coding with per-country justification
  religion_coding.json — Religion coding (islamic/secular/neutral) for 54 countries
  figure_style.py     — Shared bilingual style module (imported by all figure notebooks)
  review.sh           — Automated review system (L0-L3)
  recheck_findings.py — Verify review findings integrated into ROADMAP.md
  dod_check.sh        — Definition of Done enforcement (lint + clean git)
  review_prompts/     — L2/L3 sub-agent prompt files (7 files)
.claude/
  settings.json       — Hooks (PostToolUse lint, Stop DOD/tmp/findings)
  ops/                — Hook documentation (OPS.md + per-hook docs)
.github/
  workflows/deploy.yml — GitHub Pages deployment (src/ → Pages)
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

### Score & utility colors
| Variable | Value | Usage |
|----------|-------|-------|
| `--c-none` | `#eae6df` | Uncolored map countries |
| `--c0` | `#e8e4dd` | Score level 0 background |
| `--c1` | `#3a7c8a` | Score level 1 |
| `--c2` | `#1a6b5a` | Score level 2 |
| `--score-x/p/v` | | Pill backgrounds by score |
| `--pill-bg-v/p/x`, `--pill-c-v/p/x` | | Pill text colors |
| `--stroke-default`, `--axis-grid` | | Chart strokes and grid |
| `--hatch-bg/stroke` | | Colonial territory hatching |
| `--explainer-bg` | `#f0ece5` | Explainer block background |
| `--hover-light` | `#ede9e2` | Button/row hover background |
| `--stripe-bg` | `#f8f5f0` | Table alternate row stripe |

### Adding a new color
1. Add variable to `:root` in `styles.css`
2. Add property to `CSS` reader in `app.js`
3. Reference as `CSS.myColor` in JS

Exception: `HERITAGE_COLORS` gradient intermediates (X/P/V per-heritage ramps for D3 scale interpolation) stay as JS constants — not semantic CSS.

## app.js section order

0. Tab Navigation
1. CSS Custom Property Reader
2. Constants & Color Scales (HERITAGE_COLORS, HERITAGE_SCALES, HC, HL, HM_SHORT, numVal)
3. Application State (selDims, selYear, selCountry, mapMode, hmSort, hmFilter)
4. Utility Functions (getState, compScore, fillFor, fillForScore — note: isIndependent, isSplitYet, getParentCountry are in Map section)
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
15. Post-Conflict Chart (renderConflictChart)
16. CSV Download
17. Initialization

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
| `post_conflict` | `{country: bool}` | Post-conflit tab, scatter diamonds |
| `adoption` | `{country: year}` | Bio panel (adoption year) |
| `treaty_labels` | `{treaty_code: "French label"}` | Scatter plot axis |
| `total_countries` | `int` (54) | Summary statistics |
| `total_entries` | `int` (439) | Summary statistics |
| `country_counts` | `{year: count}` | (diagnostic, not rendered) |
| `decade_counts` | `{decade: count}` | (diagnostic, not rendered) |
| `ratif_counts` | `{treaty: count}` | (diagnostic, not rendered) |
| `regions` | `[region_names]` | Bio panel filter |

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
- `https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson` — map boundaries

## Commands

| Command | Description |
|---------|-------------|
| `make review` | Quick review: L0+L1 (~5s) |
| `make review-full` | Full review: L0+L1+L2 (~1-2m) |
| `make review-deep` | Deep review: L0+L1+L2+L3 |
| `make check` | JS syntax + DATA JSON validation |
| `make open` | Open in default browser |
| `make clean` | Remove generated/backup files |
