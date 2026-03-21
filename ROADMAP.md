# Constitutions d'Afrique — Roadmap

## Vision

Data science, NLP, and visualization contributions to a PhD thesis on sub-state peoples in African human rights law. 54 countries, 439 constitutional texts, 10 coded dimensions. Two deliverables: thesis figures (PDF) and interactive dashboard (web).

**Team:** Alex (law researcher, PhD student) + Victor (data scientist, developer) + Claude (AI assistant).

**Current state:** Research phase complete (M0-M7). 11 key insights, 25 thesis figures, 7 notebooks, 30 cases, embeddings, extended coding. Now in presentation phase.

---

## Two Deliverables

### Deliverable 1: Thesis Figures & Statistical Results
PDF-ready academic figures + statistical tables for the thesis document. Must be in **French and English**.
- 25 figures exist (18 original + 7 case law), 5 need French translation
- 4 missing high-priority figures (heritage divergence, treaty beeswarm, correlation matrix, score boxplot)
- Statistical tables in data/appendix/ (coding scheme, full dataset)
- All figures need captions, source citations, figure numbers

### Deliverable 2: Interactive Dashboard
Website where non-technical law researchers explore the data interactively.
- 7-tab structure (Carte, Matrice, Héritage, Traités, Post-conflit, Textes, Clusters)
- 5 tabs interactive (D3), 2 tabs static image embeds (need conversion to D3)
- Live at: https://victor-guillard-avestaai.github.io/africa-constitutions/
- Must work in **French and English**

---

## Remaining Work

### A. Thesis Figures (Deliverable 1)
- [ ] Translate 5 figures to French: ch5_sd_posture, ch7_land, kwic_customary, topics_heritage, ch1s2_people_vs_peoples
- [ ] Generate English versions of all 25 figures
- [ ] Generate missing figures: heritage divergence (10 small multiples), treaty beeswarm, correlation matrix, score distribution boxplot
- [ ] Add captions and source citations to figure_index.md
- [ ] Fix dendrogram readability (vertical or larger font)

### B. Dashboard Interactivity (Deliverable 2)
- [ ] Convert Textes tab from static images to interactive D3 charts
- [ ] Convert Clusters tab: interactive UMAP scatter (hover for country), interactive similarity heatmap
- [ ] Add per-dimension breakdown to Post-conflit tab
- [ ] Add post-conflict toggle to scatter plot (switch heritage/post-conflict view)
- [ ] Add post-conflict indicator to heatmap (column or icon next to country names)
- [ ] Add methodology explainer modal accessible from all tabs
- [ ] Extend year slider to 1847 (Liberia)

### C. Bilingual Support
- [ ] Dashboard: French/English toggle for all UI text, titles, explainers
- [ ] Thesis figures: generate both French and English versions from notebooks

### D. Polish & Publication
- [x] GitHub Pages deployment
- [x] ARIA labels on interactive elements
- [x] Print stylesheet
- [x] CSV data download
- [x] Citation metadata
- [ ] Colorblind toggle (low priority)
- [ ] Guided tour for first-time visitors (low priority)
- [ ] Dimension deselection feedback (low priority)

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
- [x] Print stylesheet for PDF export

---

## Milestone 1a: EDA — Constitutional Dataset — DONE

**Output:** `notebooks/eda_constitutional_dataset.ipynb`

### Distributions and structure
- [x] Score distributions per dimension: two tiers — universal (Dis 100%, Dc 93%) vs rare (F 11%, Dpa 15%)
- [x] Score distributions per heritage group: Franco 7.3/20, Anglo 10.9/20, Luso 6.6/20 (Mann-Whitney p=0.004)
- [x] Temporal evolution: gap WIDENED post-1990 (2.4→4.7). Convergence only in Dc and La, not identity dimensions
- [x] Missing data: 209/440 rows uncoded (transitional periods, coups). 52% coverage rate

### Correlations and clusters
- [x] Correlation matrix: Drc↔Drm r=0.70, Drm↔Id r=0.66, Dpa↔Drm r=0.66 (all 54; Tier 1: 0.69/0.62/0.68) — identity recognition comes as a package
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
- [x] Pre/post-Ogiek evolution: 14 constitutions adopted post-2017, mean 7.8 vs pre-Ogiek 9.2 — Ogiek effect not yet visible (mostly francophone authoritarian revisions)

**Serves:** Ch.1, Ch.5.

---

## Milestone 3: ACHPR Case Law Dataset — DONE

**Done when:** A structured, coded dataset of ACHPR/African Court decisions on peoples' rights exists and supports timeline visualization.

**Why this is critical:** The thesis's central argument is that the ACHPR *constructed* the sub-state peoples category through case law. Without a structured dataset, this claim rests on qualitative reading alone. A coded dataset makes the progressive emergence of the functional criterion visible and auditable.

### Dataset design
- [x] Design coding schema: `case_number`, `date`, `session`, `parties`, `respondent_state`, `articles_invoked`, `articles_violated`, `peoples_qualification` (bool), `functional_criterion` (bool), `cross_system_citations`, `outcome`, `reparations`
- [x] Created `data/achpr_cases.json` (30 cases extracted)
- [x] Built `scripts/process_caselaw.py`

### Initial coding (from existing sources)
The 3 docx files in `data/sources/` contain ~35 case summaries from sessions 70-81.
- [x] Extracted 16 cases from `Communication 298 copie.docx` (Lower Omo, Nuba — the two most important cases)
- [x] Extracted from `Note RJCDI n°102.docx` (different format, partial) (African Court, 77th session)
- [x] Extracted 12 cases from `RJDCI n°104.docx` (sessions 76-81)
- [x] Endorois (276/03) and Ogiek (006/2012) added manually not in the docx files: Endorois (2010), Ogiek (2017), earlier hesitations

### Visualization
- [x] Case law timeline: 30 cases by filing year, peoples' rights highlighted, functional criterion annotated (ch3_case_law_timeline.pdf)
- [x] Article invocation frequency chart: bar chart with peoples' arts 19-24 highlighted (ch3_article_frequency.pdf)
- [x] Functional criterion emergence timeline: 5 key cases annotated with legal formulations (ch3_functional_criterion_emergence.pdf)
- [x] Decision: thesis figures (matplotlib), not dashboard D3 — per architecture decision

**Bottleneck:** Alex must do the substantive legal coding. The project provides infrastructure and visualization. Design a minimal schema — do not over-code.

**Serves:** Ch.3 (primary), Ch.4, Ch.5, Ch.7, Ch.8 (all reference case law).

---

## Milestone 4: Semantic Clustering + Tabbed Dashboard — DONE

**Done when:** Embedding-based and dimension-based clustering reveal empirical constitutional models. Dashboard restructured as tabbed interface.

### 4a. Tabbed Dashboard Restructure
Convert the single-page dashboard into a tabbed interface. Each tab tells one thesis story.
- [x] Tab navigation (CSS display toggle, sticky nav)
- [x] **Carte** tab: existing map + bio panel + year slider (current page)
- [x] **Matrice** tab: comparative heatmap (moved from Carte to fix scroll-zoom conflict)
- [x] **Héritage** tab: divergence charts + heritage stats
- [x] **Traités** tab: beeswarm scatter (moved from main page)
- [x] **Post-conflit** tab: 2×2 interaction chart + per-dimension comparison + map overlay
- [x] **Textes** tab: preamble rhetoric scatter + SD classification + keyword findings
- [x] **Clusters** tab: embedding visualization + dendrogram + cluster profiles
- [x] Fixed scatter legend (SVG shapes in legend) (circle/diamond display issue)

### 4b. Semantic Embeddings (Voyage AI)
Use `voyage-law-2` (legal-domain embeddings) to embed constitution texts and preambles. Compare semantic clustering with coded-dimension clustering.
- [x] Embedded 54 constitutions (54×1024) via Voyage API (voyage-law-2, ~2M tokens)
- [x] Embedded 49 preambles (49×1024) (shorter, more focused)
- [x] UMAP 2D projection, colored by heritage + shaped by post-conflict
- [x] Compared: ARI=0.466 (embedding↔heritage), 0.033 (dimension↔heritage) agree with heritage groups? With coded-dimension clusters?
- [x] Cross-constitutional similarity matrix (cosine heatmap) (cosine distance) → D3 force graph or heatmap
- [x] 4 thesis figures: UMAP scatter ×2 + similarity heatmap + dendrogram

### 4c. Dimension-Based Clustering
Heritage groups are a colonial *input*. Clustering on the 10 dimensions reveals constitutional *output* patterns.
- [x] Hierarchical clustering (Ward, scipy) (Ward, scipy)
- [x] Identified: k=4 clusters do NOT reproduce heritage (ARI=0.033) ("comprehensive recognizers", "selective recognizers", "silent constitutions")
- [x] Yes: RDC clusters with anglophone high-scorers with anglophone ones? (Key thesis test)
- [x] Dendrogram + cluster profiles in m4_clustering_embeddings.ipynb

### 4d. Advanced NLP
- [x] BERTopic: 14 topics from 3103 paragraphs on the 54 constitutions — discover latent topics beyond the 10 coded dimensions
- [x] KWIC analysis: indigenous, autonomy, customary, traditional, minority, ethnic, tribe extend the "peoples" contextual approach to "autonomy", "indigenous", "customary law"
- [x] Similarity heatmap (cosine on voyage-law-2 embeddings) which constitutions are textually most similar?

**Infrastructure:** `voyageai` (voyage-law-2, 50M free tokens), `umap-learn`, `python-dotenv`. API key in `.env`.

**Serves:** Ch.2 S2 (empirical typology), Ch.1 S2 (semantic patterns), cross-cutting (validation of coded dimensions).

---

## Milestone 5: Case Law Analysis — DONE

**Done when:** Functional criterion emergence and cross-system citation patterns are visualized.

**Depends on:** Milestone 3 (case law dataset must be substantially populated).

### Ch.3 — Functional criterion emergence
- [x] Timeline visualization: functional criterion emergence across 5 key cases (ch3_functional_criterion_emergence.pdf)
- [x] Tracked: 5/30 cases invoke peoples' rights (art. 19-24): Endorois, Ogiek, Lower Omo, Nuba, 744/20
- [x] Functional criterion found in Endorois (2010) and Ogiek (2017) only — both Kenya stabilization
- [x] Progressive shift visible: from "autochtone" labeling (Endorois) to functional protection (Nuba — no "autochtone" label)

### Ch.4 S1 — Doctrinal concept mapping
- [x] Doctrinal concept frequency chart (ch4s1_doctrinal_concepts.pdf): thesis vocabulary absent, ACHPR vocabulary present
- [x] Key finding: "peuple infra-étatique", "critère fonctionnel" = 0 occurrences. "peuples autochtones" = 5, "autodétermination" = 2

### Ch.4 S2 — Cross-system citation analysis
The ACHPR cites other systems via articles 60-61. The case law notes document these citations.
- [x] Cross-system citation extraction from coded dataset (ch4s2_cross_system_citations.pdf)
- [x] Citation network: CIJ (4), CADHP auto-ref (6), CIDH (2), CEDH (2), UN HRC (1), African Court (0)
- [x] Landmark case citations: Nuba/Kordofan dominates (9), Lower Omo (2), Belilos (1) (ch4_landmark_citations.pdf)

**Serves:** Ch.3, Ch.4.

---

## Milestone 6: Extended Constitutional Coding — DONE

**Done when:** New dimensions for Ch.7 and Ch.8 are extracted from PDFs and visualized.

**Depends on:** Milestone 1 (PDF extraction pipeline).

### Ch.7 — Territorial and resource rights
- [x] NLP keyword analysis: land_rights, natural_resources, environment, ancestral_land, water_rights, environmental protection, traditional land tenure provisions
- [x] 5 land sub-categories saved to data/extended_coding_v2.json (land_tenure, natural_resources, environment, water, territorial_integrity)
- [x] Thesis figure: ch7_land_resources.pdf
- [ ] **Deferred:** Extractive industries correlation (external data, methodological risk — only if time permits)

### Ch.8 — Cultural rights depth
The existing Drc dimension is binary (X/P/V). Constitutional cultural rights provisions vary enormously.
- [x] Classified: linguistic_rights, cultural_practice, cultural_institution, heritage_protection linguistic rights, cultural practice protection, cultural institutions, heritage protection
- [x] 7 culture sub-categories coded across 54 countries (language_official, language_minority, cultural_heritage, cultural_practice, cultural_institution, education_culture, religious_freedom)
- [ ] Language provisions depth (not yet done — requires manual analysis) how many languages recognized, what status (official/national/regional)?
- [x] Thesis figure: ch8_cultural_rights_depth.pdf by heritage group

**Serves:** Ch.7, Ch.8.

---

## Milestone 7: Thesis Integration & Publication — DONE (partial)

**Done when:** All figures are thesis-ready, the dashboard is hosted, and the methodological appendix is generated.

### Ch. préliminaire — Methodological appendix
- [x] Generated: table1_coding_scheme.csv coding scheme, dimension definitions, scoring rules
- [x] Summary statistics: Mann-Whitney per dimension, η², Cohen d of X/P/V per dimension, coverage rates, inter-coder reliability proxy from COMMENTAIRE
- [x] Exported CSVs in data/appendix/

### Publication
- [x] 25 thesis figures in data/figures/ (PDF 300dpi + PNG) (matplotlib/seaborn → LaTeX)
- [x] Dashboard hosted on GitHub Pages or university server
- [ ] French/English language toggle (not yet done)
- [x] Citation metadata (HTML meta tags)
- [x] CSV data download
- [ ] Guided tour (not yet done)

---

## Chapter Coverage Summary

| Chapter | Status | Contribution | Milestone |
|---------|--------|-------------|-----------|
| Ch. prélim. | **Delivered** | Methodological appendix, coding scheme, summary statistics | M7 |
| Ch.1 S1 | **Delivered** | Preamble sovereignty/identity rhetoric, "indivisible" marker, "peoples" contextual analysis | M2 |
| Ch.1 S2 | **Delivered** | 10 dimensions × 54 countries (dashboard) + naming terminology heatmap | M0+M2 |
| Ch.2 S1 | **Delivered** | Treaty irrelevance: beeswarm scatter, structural incapacity of international regime | M0 |
| Ch.2 S2 | **Delivered** | Heritage determinism (Cohen d=1.05), divergence charts, clustering (ARI=0.033 dimension, ARI=0.466 embedding) | M0+M4 |
| Ch.3 | **Delivered** | Case law timeline, functional criterion emergence (5 key cases), article frequency | M3+M5 |
| Ch.4 | **Delivered** | Doctrinal concept frequency, cross-system citations, landmark case citations | M5 |
| Ch.5 | **Delivered** (preliminary) | 7-category SD classification, keyword-based — requires legal validation | M2 |
| Ch.6 | **Delivered** | Dc/Dau/F/PJ dimensions across heritage groups | M0 |
| Ch.7 | **Delivered** | 5 land/resource sub-categories coded, thesis figure | M6 |
| Ch.8 | **Delivered** | 7 cultural sub-categories coded, thesis figure | M6 |

---

## Priority Order

**Completed:** M0 (Phases 1-4), M1a, M1b, M2, M3, M4 (a-d), M5, M6, M7 (partial), post-conflict analysis.

**Next:**

1. **Remaining Work A** — Thesis figures (French translation, missing figures, captions)
2. **Remaining Work B** — Dashboard interactivity (convert static tabs to D3)
3. **Remaining Work C** — Bilingual support (French/English toggle)
4. **Remaining Work D** — Polish (colorblind, guided tour)
5. **M0 P5** — Final dashboard polish (accessibility)

**If time is limited:** A (thesis figures) is the highest-impact remaining work for the thesis defense.

---

## Methodological Notes

**Two-tier approach:** All statistical claims (p-values, effect sizes, η²) are computed on Tier 1 (francophone n=23 vs anglophone n=19 = 42 countries). Lusophone (n=5), Other (n=6), and Mixed (n=1) are discussed as Tier 2 case studies — qualitatively, not statistically. See THESIS.md for rationale.

**Post-conflict variable:** A second explanatory variable alongside heritage. Codes whether the *current constitution* (not the country) was adopted as a result of a negotiated peace process, post-war/post-genocide transition, or post-liberation state-building. 15/54 constitutions coded as post-conflict. Heritage+post-conflict together explain 54.9% of variance (vs heritage alone 22.3%). Coding with per-country justification in `scripts/post_conflict_coding.json`. Preliminary — requires legal validation.

**Translation caveat:** NLP on constitution texts operates on English translations (constituteproject.org). Only anglophone constitutions are in original language. Binary detection (presence/absence of terms) is reliable; frequency comparison requires caution. See `docs/linguistic_decisions.md`.

**Self-determination classification:** The 7-category posture system (M2) is keyword-based regex. It is labeled "preliminary" and requires legal validation by Alex before thesis citation.

**Temporal analysis:** Pre/post-1990 comparisons are cross-sectional (comparing average scores in each period), not panel data (tracking the same countries over time). Selection effects are not controlled.

---

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Case law coding bottleneck** | M3/M5 depend on Alex reading and coding each ACHPR decision | Minimal schema, start early, code 2-3 cases per session |
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
| ~~**55th country undocumented**~~ | Now included per Alex's decision. Empty row (no constitutional data) | — | **Resolved** | |
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

### Methodology
| Issue | Impact | Target | Status |
|-------|--------|--------|--------|
| ~~**Religion analysis unverifiable**~~ | Now computed in EDA notebook (cell 40) with `scripts/religion_coding.json`. η² increment=2.0%, KW p=0.45 | — | **Fixed** |
| ~~**Extended coding has no notebook**~~ | Now computed in EDA notebook (cell 38) from `data/extended_coding_v2.json`. All cultural p>0.10 confirmed | — | **Fixed** |
| **Post-conflict borderline codings** | Sierra Leone (1991 constitution predates civil war) and Liberia (1986 constitution predates civil wars) are borderline per the stated criterion | — | Needs legal validation by Alex |

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
