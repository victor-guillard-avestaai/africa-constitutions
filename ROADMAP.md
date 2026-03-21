# Constitutions d'Afrique — Roadmap

## Vision

Data science, NLP, and visualization contributions to a PhD thesis on sub-state peoples in African human rights law. The thesis has 8 chapters across 2 parts; this project provides quantitative evidence for each. See THESIS.md for the full thesis structure.

**Current state:** 6 chapter sections have delivered contributions (Ch.1 S1, Ch.1 S2, Ch.2 S1, Ch.2 S2, Ch.5 preliminary, Ch.6). Statistical claims use a two-tier approach: Tier 1 = francophone vs anglophone (n=42, all p-values and effect sizes); Tier 2 = lusophone/other/mixed as case studies (n=13, qualitative only).

---

## This Week (2026-03-21)

DONE: KB overhaul, EDA (M1a+M1b), scatter redesign (M0 P4), text analysis (M2), post-conflict variable, methodological overhaul (two-tier, η², caveats)
DONE: M3 start — ACHPR case law schema
DONE: Post-conflict analysis — strongest predictor (η²=45.5%), integrated into dashboard
NEXT: Tabbed dashboard + semantic embeddings (voyage-law-2) + clustering

---

## Milestone 0: Dashboard Completion — IN PROGRESS

**Done when:** The 5 existing visualizations are polished, thesis-grounded, and presentation-ready.

### Phase 1-3: Foundation — DONE
- [x] Interactive map + bio panel + heatmap + divergence + scatter
- [x] Heritage-keyed color gradients + light academic theme + responsiveness
- [x] File separation + color centralization + review system + KB overhaul

### Phase 4: Scatter Plot Redesign — DONE
- [x] Beeswarm layout: treaty count (0-6) as discrete columns, force-simulated dot placement
- [x] Total score (0-20) on Y-axis — matches heatmap scale
- [x] Statistical annotation: Spearman ρ = −0.06, p = 0.68 (ns)
- [x] Per-column mean lines showing flat trend
- [x] Click → bio panel, tooltip on hover
- [x] Thesis-grounded title: "Ratifier n'est pas reconnaître"

### Phase 5: Final Polish — IN PROGRESS
- [x] Remove 3 dead CSS classes (.dim-sep, .scale-label, .cp-articles)
- [x] Fix divergence subtitle (was "liste des pays", now "valeurs exactes par héritage")
- [x] TECHNICAL.md: add missing color vars (--c-none, --c0, --c1, --c2)
- [x] TECHNICAL.md: fix utility functions list (fillForScore, map-section functions)
- [x] TECHNICAL.md: add tab navigation to section order
- [ ] Accessibility audit (ARIA labels, keyboard navigation, colorblind patterns)
- [ ] Year slider range review (1847 vs 1930 start)
- [ ] Dimension constraint feedback (visual cue when minimum enforced)
- [ ] Print stylesheet for PDF export

---

## Milestone 1a: EDA — Constitutional Dataset — DONE

**Output:** `notebooks/eda_constitutional_dataset.ipynb`

### Distributions and structure
- [x] Score distributions per dimension: two tiers — universal (Dis 100%, Dc 93%) vs rare (F 11%, Dpa 15%)
- [x] Score distributions per heritage group: Franco 7.3/20, Anglo 10.9/20, Luso 6.6/20 (Mann-Whitney p=0.004)
- [x] Temporal evolution: gap WIDENED post-1990 (2.4→4.7). Convergence only in Dc and La, not identity dimensions
- [x] Missing data: 209/440 rows uncoded (transitional periods, coups). 52% coverage rate

### Correlations and clusters
- [x] Correlation matrix: Drc↔Drm r=0.70, Drm↔Id r=0.66, Dpa↔Drm r=0.66 — identity recognition comes as a package
- [x] Heritage group profiles: heatmap of 10-dimension means per heritage group
- [x] Outliers: RDC (+7.7 above francophone mean), Tanzanie (-5.9 below anglophone mean)
- [x] PCA: PC1 explains 39.6%, correlates r=0.428 with heritage — significant but not dominant

### Treaty and ratification data
- [x] Treaty ratification: CADHP 98%, DNUDPA 96%, C169 1.9% — only CAR ratified the indigenous peoples convention (2010)
- [x] Constitutional score vs treaty ratification: r=-0.057, p=0.682 — zero correlation
- [x] Heritage group × ratification: nearly identical across groups (~4.5 treaties each)

### Commentary and qualitative signals
- [x] COMMENTAIRE: 431/440 entries, mean 379 chars. "nation" (345), "ethni" (229), "coutum" (173) most frequent
- [x] ARTICLES PERTINENTS: 423/440 entries. Art. 1 cited 177 times. Preamble referenced in 22%
- [x] Naming paradox: francophone comments use "ethni" at 13.7/1000 words vs anglophone 7.2 — more discussion, less recognition

### Hierarchical clustering
- [x] k=4 clusters do NOT reproduce heritage groups. One "comprehensive recognizers" cluster mixes 6 anglophone + 2 francophone + 2 other + 1 mixed
- [x] Tunisie is an outlier singleton (score 3)

---

## Milestone 1b: PDF Text Extraction + EDA — Constitution Texts — DONE

**Output:** `notebooks/eda_constitution_texts.ipynb`, `data/constitution_corpus/`, `data/preamble_corpus/`, `scripts/extract_constitutions.py`, `scripts/country_mapping.json`

### Extraction pipeline
- [x] pdfplumber installed (in pyproject.toml)
- [x] `scripts/extract_constitutions.py`: PDF → plain text, preamble extraction (skips TOC entries)
- [x] 49/54 preambles extracted. Without: Botswana, Lesotho, Mauritius, Sierra Leone, Somalia
- [x] `scripts/country_mapping.json`: English filename → French spreadsheet name mapping (54 entries)

### Key findings
- [x] Corpus: 54 constitutions, 1,431,765 words. Anglophone mean 44K words vs francophone 16K
- [x] Keyword heatmap: francophone use "people/peoples" MORE (1.29/1k) than anglophone (0.61/1k) but "indigenous" LESS (0.008 vs 0.045). Anglophone use "federal" (0.38), "customary" (0.26), "traditional" (0.23) more
- [x] Sovereignty rhetoric: francophone use "sovereignty" (0.41 vs 0.16) and "unity" (0.48 vs 0.13) far more
- [x] Preamble analysis: francophone preambles are sovereignty-heavy (sov=12.2, id=13.5), anglophone are identity-heavy (sov=10.1, id=15.8)
- [x] "Indivisible": 70% francophone vs 21% anglophone — strongest heritage marker
- [x] Self-determination: only 8/54 mention it (2 franco, 2 anglo, 3 luso, 1 other). 60% of lusophone countries mention it
- [x] Autonomy: 74% francophone vs 26% anglophone — francophone constitutions mention autonomy (to deny or limit it) more often

---

## Milestone 2: Constitutional Text Analysis — DONE

**Output:** `notebooks/m2_constitutional_text_analysis.ipynb`, 7 figures in `data/figures/`

### Ch.1 S1 — Sovereignty vs. identity rhetoric
- [x] Preamble sovereignty/identity scatter with heritage group means (Fig. 1)
- [x] Balance bar chart: identity − sovereignty per 1k words, 49 countries sorted (Fig. 2)
- [x] Sovereignty markers by heritage: "indivisible" 70% franco vs 21% anglo (Fig. 3)

### Ch.1 S2 — Naming analysis
- [x] Heritage × naming terminology heatmap: people, peoples, ethnic, tribe, indigenous, etc. (Fig. 4)
- [x] "people" vs "peoples" scatter + bar — singular sovereign vs plural rights-bearing (Fig. 5)

### Ch.5 — Self-determination classification
- [x] 7-category posture classification: external SD, internal SD, mentioned, autonomy, indivisible+autonomy, indivisible, silent
- [x] Posture stacked bar by heritage (Fig. 6)
- [x] Binary flags heatmap: 54 countries × 4 markers (Fig. 7)
- [ ] Pre/post-Ogyek evolution (requires M3 case law dataset — deferred)

**Serves:** Ch.1, Ch.5.

---

## Milestone 3: ACHPR Case Law Dataset

**Done when:** A structured, coded dataset of ACHPR/African Court decisions on peoples' rights exists and supports timeline visualization.

**Why this is critical:** The thesis's central argument is that the ACHPR *constructed* the sub-state peoples category through case law. Without a structured dataset, this claim rests on qualitative reading alone. A coded dataset makes the progressive emergence of the functional criterion visible and auditable.

### Dataset design
- [ ] Design coding schema: `case_number`, `date`, `session`, `parties`, `respondent_state`, `articles_invoked`, `articles_violated`, `peoples_qualification` (bool), `functional_criterion` (bool), `cross_system_citations`, `outcome`, `reparations`
- [ ] Create `data/achpr_cases.xlsx` (or .json) with the schema
- [ ] Build `scripts/process_caselaw.py` for validation and JSON export

### Initial coding (from existing sources)
The 3 docx files in `data/sources/` contain ~35 case summaries from sessions 70-81.
- [ ] Extract structured data from `Communication 298 copie.docx` (Lower Omo, Nuba — the two most important cases)
- [ ] Extract from `Note RJCDI n°102.docx` (African Court, 77th session)
- [ ] Extract from `RJDCI n°104.docx` (sessions 76-81)
- [ ] Victor codes landmark cases not in the docx files: Endorois (2010), Ogyek (2017), earlier hesitations

### Visualization
- [ ] Interactive case law timeline: decisions over time, color-coded by functional criterion application
- [ ] Article invocation frequency chart (art. 19, 20, 21, 22, 23, 24 over time)
- [ ] Decision: integrate into dashboard as new section, or produce as standalone thesis figures?

**Bottleneck:** Victor must do the substantive legal coding. The project provides infrastructure and visualization. Design a minimal schema — do not over-code.

**Serves:** Ch.3 (primary), Ch.4, Ch.5, Ch.7, Ch.8 (all reference case law).

---

## Milestone 4: Semantic Clustering + Tabbed Dashboard

**Done when:** Embedding-based and dimension-based clustering reveal empirical constitutional models. Dashboard restructured as tabbed interface.

### 4a. Tabbed Dashboard Restructure
Convert the single-page dashboard into a tabbed interface. Each tab tells one thesis story.
- [ ] Tab navigation (CSS display toggle, no framework)
- [ ] **Carte** tab: existing map + bio panel + year slider (current page)
- [ ] **Héritage** tab: heatmap + divergence charts + heritage stats
- [ ] **Traités** tab: beeswarm scatter (moved from main page)
- [ ] **Post-conflit** tab: 2×2 interaction chart + per-dimension comparison + map overlay
- [ ] **Textes** tab: preamble rhetoric scatter + SD classification + keyword findings
- [ ] **Clusters** tab: embedding visualization + dendrogram + cluster profiles
- [ ] Fix scatter legend (circle/diamond display issue)

### 4b. Semantic Embeddings (Voyage AI)
Use `voyage-law-2` (legal-domain embeddings) to embed constitution texts and preambles. Compare semantic clustering with coded-dimension clustering.
- [ ] Embed 54 full constitutions via Voyage API (voyage-law-2, ~2M tokens)
- [ ] Embed 49 preambles separately (shorter, more focused)
- [ ] UMAP 2D projection, colored by heritage + shaped by post-conflict
- [ ] Compare: do embedding clusters agree with heritage groups? With coded-dimension clusters?
- [ ] Cross-constitutional similarity matrix (cosine distance) → D3 force graph or heatmap
- [ ] Thesis figure: UMAP scatter + similarity network

### 4c. Dimension-Based Clustering
Heritage groups are a colonial *input*. Clustering on the 10 dimensions reveals constitutional *output* patterns.
- [ ] Hierarchical clustering on the feature matrix (Ward, scipy)
- [ ] Identify emergent constitutional model types ("comprehensive recognizers", "selective recognizers", "silent constitutions")
- [ ] Do some francophone countries cluster with anglophone ones? (Key thesis test)
- [ ] Thesis figure: dendrogram + cluster profiles

### 4d. Advanced NLP
- [ ] BERTopic or LDA topic modeling on the 54 constitutions — discover latent topics beyond the 10 coded dimensions
- [ ] KWIC (keyword-in-context) analysis: extend the "peoples" contextual approach to "autonomy", "indigenous", "customary law"
- [ ] Cross-constitutional similarity network: which constitutions are textually most similar?

**Infrastructure:** `voyageai` (voyage-law-2, 50M free tokens), `umap-learn`, `python-dotenv`. API key in `.env`.

**Serves:** Ch.2 S2 (empirical typology), Ch.1 S2 (semantic patterns), cross-cutting (validation of coded dimensions).

---

## Milestone 5: Case Law Analysis

**Done when:** Functional criterion emergence and cross-system citation patterns are visualized.

**Depends on:** Milestone 3 (case law dataset must be substantially populated).

### Ch.3 — Functional criterion emergence
- [ ] Timeline visualization: when did key legal formulations first appear?
- [ ] Track: "peoples as distinct from state people" (Lower Omo §177), "identity markers and specific status" (Nuba §236)
- [ ] Pre-Ogyek hesitations vs. post-Ogyek stabilization — is the break visible in the data?

### Ch.4 S1 — Doctrinal concept mapping
- [ ] Extract references to: "identité complexe", "droits collectifs", "protection systémique", "lecture relationnelle" from case law notes
- [ ] Frequency and first-appearance chart

### Ch.4 S2 — Cross-system citation analysis
The ACHPR cites other systems via articles 60-61. The case law notes document these citations.
- [ ] Extract all cross-system citations from coded dataset
- [ ] Citation network: which systems does the ACHPR draw from, for which rights?
- [ ] Thesis figure: Sankey diagram or directed graph

**Serves:** Ch.3, Ch.4.

---

## Milestone 6: Extended Constitutional Coding

**Done when:** New dimensions for Ch.7 and Ch.8 are extracted from PDFs and visualized.

**Depends on:** Milestone 1 (PDF extraction pipeline).

### Ch.7 — Territorial and resource rights
- [ ] NLP on 54 PDFs: land rights, natural resources, environmental protection, traditional land tenure provisions
- [ ] New dimension(s) added to dataset
- [ ] Thesis figure: map or heatmap overlay
- [ ] **Deferred:** Extractive industries correlation (external data, methodological risk — only if time permits)

### Ch.8 — Cultural rights depth
The existing Drc dimension is binary (X/P/V). Constitutional cultural rights provisions vary enormously.
- [ ] NLP to classify cultural rights type: linguistic rights, cultural practice protection, cultural institutions, heritage protection
- [ ] Sub-dimension breakdown of Drc (3-4 sub-categories)
- [ ] Language provisions depth: how many languages recognized, what status (official/national/regional)?
- [ ] Thesis figure: language recognition count by heritage group

**Serves:** Ch.7, Ch.8.

---

## Milestone 7: Thesis Integration & Publication

**Done when:** All figures are thesis-ready, the dashboard is hosted, and the methodological appendix is generated.

### Ch. préliminaire — Methodological appendix
- [ ] Generate dataset documentation: coding scheme, dimension definitions, scoring rules
- [ ] Summary statistics: distribution of X/P/V per dimension, coverage rates, inter-coder reliability proxy from COMMENTAIRE
- [ ] Export as LaTeX-compatible tables

### Publication
- [ ] All thesis figures formatted for PDF (matplotlib/seaborn → LaTeX)
- [ ] Dashboard hosted on GitHub Pages or university server
- [ ] French/English language toggle
- [ ] Citation metadata (BibTeX, DOI)
- [ ] Data download (CSV export)
- [ ] Guided tour for committee members

---

## Chapter Coverage Summary

| Chapter | Status | Contribution | Milestone |
|---------|--------|-------------|-----------|
| Ch. prélim. | Planned | Methodological appendix, dataset documentation | M7 |
| Ch.1 S1 | **Delivered** | Preamble sovereignty/identity rhetoric, "indivisible" marker, "peoples" contextual analysis | M2 |
| Ch.1 S2 | **Delivered** | 10 dimensions × 54 countries (dashboard) + naming terminology heatmap | M0+M2 |
| Ch.2 S1 | **Delivered** | Treaty irrelevance: beeswarm scatter, structural incapacity of international regime | M0 |
| Ch.2 S2 | **Delivered** (base) | Heritage determinism (Cohen d=1.05), divergence charts. Enhancement: clustering (M4, planned) | M0+M4 |
| Ch.3 | Planned | Case law timeline, functional criterion emergence | M3+M5 |
| Ch.4 | Planned | Doctrinal concept mapping, cross-system citation network | M5 |
| Ch.5 | **Delivered** (preliminary) | 7-category SD classification, keyword-based — requires legal validation | M2 |
| Ch.6 | **Delivered** | Dc/Dau/F/PJ dimensions + institutional typology enhancement (M4, planned) | M0+M4 |
| Ch.7 | Planned | Territorial/resource rights provisions | M6 |
| Ch.8 | Planned | Cultural rights sub-dimensions, language depth | M6 |

---

## Priority Order

**Completed:** M0 (Phases 1-4), M1a, M1b, M2, M3 start, post-conflict analysis.

**Next:**

1. **M4a** — Tabbed dashboard restructure (presentation-ready)
2. **M4b** — Semantic embeddings (voyage-law-2 → UMAP → thesis figure)
3. **M4c** — Dimension-based clustering (dendrogram + cluster profiles)
4. **M4d** — Advanced NLP (BERTopic, KWIC, similarity network)
5. **M3 coding** — Victor codes ACHPR cases (runs in background)
6. **M5** — Case law analysis (depends on M3 progress)
7. **M0 P5** — Final dashboard polish (accessibility, print stylesheet)
8. **M6** — Extended constitutional coding (if time permits)
9. **M7** — Thesis integration + publication

**If time is limited:** M4a-c covers the remaining high-impact work. M4d, M5-M7 are enhancements.

---

## Methodological Notes

**Two-tier approach:** All statistical claims (p-values, effect sizes, η²) are computed on Tier 1 (francophone n=23 vs anglophone n=19 = 42 countries). Lusophone (n=5), Other (n=7), and Mixed (n=1) are discussed as Tier 2 case studies — qualitatively, not statistically. See THESIS.md for rationale.

**Post-conflict variable:** A second explanatory variable alongside heritage. Codes whether the *current constitution* (not the country) was adopted as a result of a negotiated peace process, post-war/post-genocide transition, or post-liberation state-building. 15/54 constitutions coded as post-conflict. Heritage+post-conflict together explain 54.9% of variance (vs heritage alone 22.3%). Coding with per-country justification in `scripts/post_conflict_coding.json`. Preliminary — requires legal validation.

**Translation caveat:** NLP on constitution texts operates on English translations (constituteproject.org). Only anglophone constitutions are in original language. Binary detection (presence/absence of terms) is reliable; frequency comparison requires caution. See `docs/linguistic_decisions.md`.

**Self-determination classification:** The 7-category posture system (M2) is keyword-based regex. It is labeled "preliminary" and requires legal validation by Victor before thesis citation.

**Temporal analysis:** Pre/post-1990 comparisons are cross-sectional (comparing average scores in each period), not panel data (tracking the same countries over time). Selection effects are not controlled.

---

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Case law coding bottleneck** | M3/M5 depend on Victor reading and coding each ACHPR decision | Minimal schema, start early, code 2-3 cases per session |
| **PDF extraction quality** | OCR artifacts, non-English content, formatting issues in 54 PDFs | Spot-check 10 countries before building full pipeline |
| **Dashboard architecture limits** | Vanilla JS / file:// cannot easily host case law timeline or citation networks | Static thesis figures (matplotlib) for complex new visualizations; dashboard for the core constitutional data |
| **Scope creep** | 8 chapters × multiple analyses per chapter = unbounded work | Strict milestone ordering; M6 items are optional enhancements |
| **Extractive industries correlation (Ch.7)** | External data + causality claims are methodologically risky in a legal thesis | Defer unless specifically needed; constitutional provisions analysis alone is sufficient |
| **Lusophone n=5** | Too small for statistical inference; any lusophone-specific finding is exploratory | Report as observation, not finding; discuss as case study |
| **Treaty count variance near-zero** | 72% at count=5, std=0.6 — correlation tests have no power | Reframe as structural argument (regime cannot differentiate), not null-correlation argument |

---

## Known Issues

*Deferred findings from the dashboard. Each has a target phase.*

### Visual
| Issue | Impact | Target | Status |
|-------|--------|--------|--------|
| ~~**Scatter plot hard to read**~~ | Redesigned as beeswarm with post-conflict diamonds | — | **Fixed** (M0 Phase 4) |
| **No colorblind support** | Heritage distinction color-only (~8% male users) | M0 Phase 5 | Deferred |
| **No keyboard navigation** | Inaccessible to keyboard users | M0 Phase 5 | Deferred |
| **Dimension deselection silent** | Min-1 constraint re-adds Drm without feedback | M0 Phase 5 | Deferred |

### Data
| Issue | Impact | Target | Status |
|-------|--------|--------|--------|
| ~~**Source spreadsheet: CAR C169 = X**~~ | Was X, should be V (ratified 30 Aug 2010) | — | **Fixed** |
| **Year slider starts at 1930** | Liberia 1847 + pre-1960 divergence invisible | M0 Phase 5 | Deferred |
| **Guinea/Mali in_force=false** | Constitutions may be suspended after coups | M0 Phase 5 | Verify with researcher |
| ~~**No NLP libraries installed**~~ | pdfplumber now in pyproject.toml | — | **Fixed** |
| **55th country undocumented** | République sahraouie in DATA but excluded silently; all docs say "54 countries" | M0 Phase 5 | Deferred |
| **Text count 439 vs 440** | THESIS.md says 439, spreadsheet has 440 rows — off by 1, reconcile | M0 Phase 5 | Deferred |

### Code
| Issue | Impact | Target | Status |
|-------|--------|--------|--------|
| **HERITAGE_COLORS not centralized** | 12 gradient intermediates in JS constants | — | By design |
| **13 hardcoded colors in styles.css** | Should use CSS variables | M0 Phase 5 | Deferred |
| ~~**4 unused CSS reader properties**~~ | CSS.bg, CSS.card, CSS.c0, CSS.c2 — already cleaned up | — | **Fixed** |
| **8 undocumented DATA keys** | TECHNICAL.md doesn't list adoption, decade_counts, etc. | M0 Phase 5 | Deferred |
| ~~**3 dead CSS classes**~~ | `.dim-sep`, `.scale-label`, `.cp-articles` removed | — | **Fixed** |
| ~~**Color vars undocumented**~~ | Added `--c-none`, `--c0`, `--c1`, `--c2` to TECHNICAL.md | — | **Fixed** |

### Documentation
| Issue | Impact | Target | Status |
|-------|--------|--------|--------|
| ~~**TECHNICAL.md section 4 misattributed**~~ | Utility functions corrected, map-section functions noted | — | **Fixed** |
| ~~**TECHNICAL.md file structure stale**~~ | Listed `.claude/review_prompts/` — removed | — | **Fixed** |
| ~~**PCA figure in THESIS.md wrong**~~ | Was ~43%, corrected to 39.6% with proper attribution | — | **Fixed** |
| ~~**ROADMAP Ch.2 S2 overstated**~~ | Separated base delivery from planned clustering enhancement | — | **Fixed** |

### UX
| Issue | Impact | Target | Status |
|-------|--------|--------|--------|
| **Mode switch scope not explained** | Users may expect all charts to change | M0 Phase 5 | Deferred |
| **"mixed" vs "other" heritage undocumented** | Cameroun is "mixed" but looks identical to "other" | M0 Phase 5 | Deferred |
| ~~**Score display inconsistency**~~ | Both heatmap and scatter now use 0-20 total | — | **Fixed** (scatter redesign) |
| ~~**Divergence subtitle claims country lists**~~ | Subtitle corrected to "valeurs exactes par héritage" | — | **Fixed** |
| **No map → heatmap navigation** | Clicking country opens bio but no link to heatmap row | M0 Phase 5 | Deferred |
| **Ch.6 art. 13 framing absent** | Dc/Dau/F/PJ present but not foregrounded as participation vs autonomy | M0 Phase 5 | Deferred |
| **Heritage determinism not explained in UI** | 2D legend is silent about what the encoding means | M0 Phase 5 | Deferred |

### Parking Lot
*Deferred/optional items with no current milestone assignment:*
- Extractive industries correlation (Ch.7 — external data, methodological risk)
- spaCy/transformers upgrade (only if keyword approach proves insufficient)
- Cross-system citation network depth (Ch.4 S2)
- Historical border changes animation

---

## Architecture Decisions

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-20 | Single-page visualization (no server) | Must work via `file://` for portability |
| 2026-03-20 | D3.js v7 (CDN) | Industry standard, no bundler needed |
| 2026-03-20 | Inline data (data.js) | CORS blocks `fetch()` on `file://` |
| 2026-03-20 | No ES modules | `closeBio()` called from HTML onclick, must be global |
| 2026-03-20 | Heritage-keyed color gradients | Heritage PREDICTS score — encoding both makes correlation preattentive |
| 2026-03-20 | Light academic theme | PhD committee audience |
| 2026-03-20 | CSS custom properties + JS reader | Centralized theme |
| 2026-03-20 | Feature order: rarest → most common | Rare features on the left draw attention |
| 2026-03-20 | File separation (monolith → 4 files) | MLTPHP |
| 2026-03-20 | Divergence annotations in tooltips | Contextual > static |
| 2026-03-20 | KB overhaul — thesis-aligned structure | All KB at root, THESIS.md, review sub-agents, thesis-aligned roadmap |
| 2026-03-20 | Static figures for complex new visualizations | Dashboard stays focused on constitutional data; case law timeline, citation networks → matplotlib for thesis PDF |
| 2026-03-20 | Regex-first NLP, upgrade only if needed | 54 documents is a small corpus; keyword analysis sufficient before investing in spaCy/transformers |
