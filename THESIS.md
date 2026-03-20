# Constitutions d'Afrique — Thesis Context

The agent reads this to make thesis-aware decisions (visualization design, data interpretation, roadmap priorities).

## The Thesis

**Title:** "Le peuple infra-étatique en droit international des droits de l'Homme — La construction d'une catégorie juridique fonctionnelle dans le système africain."

**Central argument:** The African human rights system (ACHPR + African Court) has progressively constructed a functional legal category of "sub-state peoples" through case law — distinct from both "indigenous peoples" (UNDRIP/ILO C169) and "minorities" (ICCPR Art. 27). This category is non-essentialist, built on identity-function rather than ethnic labeling, and uniquely suited to African constitutional realities.

**Key ACHPR cases:** Endorois (2010), Ogyek (2017), Lower Omo (2023), Nuba (ongoing). These cases crystallize the functional criterion: a people is recognized not by what it *is* but by what legal protections its situation *requires*.

**Audience:** PhD committee, constitutional law scholars, African studies researchers.

## Thesis Structure

### Partie I — La construction régionale du peuple infra-étatique

**Titre 1 — La nécessité d'une catégorie introuvable dans les cadres existants**

- **Chapitre 1** — Les contradictions fondatrices de la mobilisation juridique des appartenances collectives
  - S1: Tensions téléologiques (souveraineté vs. identité)
  - S2: Tensions épistémologiques (occidentalisation des catégories, usages africains de la nation) ← **THIS PROJECT**

- **Chapitre 2** — L'insuffisance des cadres juridiques existants
  - S1: Régimes internationaux partiels et concurrents (peuples, minorités, autochtones)
  - S2: Hétérogénéité des solutions constitutionnelles africaines ← **THIS PROJECT**

**Titre 2 — Le choix du système africain**

- **Chapitre 3** — La cristallisation africaine du peuple infra-étatique comme catégorie juridique fonctionnelle
  - S1: Construction progressive (hésitations pré-Ogyek → stabilisation)
  - S2: Le peuple infra-étatique comme catégorie fonctionnelle (droit positif + opérabilité contentieuse)

- **Chapitre 4** — La spécificité africaine d'une catégorie non essentialiste
  - S1: Sens doctrinal (identité complexe, droits collectifs, spécificité de la Charte)
  - S2: Spécificité sans isolement (comparaison intersystémique, articles 60-61)

### Partie II — Le régime des peuples infra-étatiques par ses fins

**Titre 1 — Faire vivre les identités complexes**

- **Chapitre 5** — La place de l'article 20(1) et l'autodétermination → avènement d'un droit à l'existence

- **Chapitre 6** — Entre participation et autonomie, la déconstruction du modèle stato-national (art. 13) ← **THIS PROJECT**

**Titre 2 — Protéger plutôt que libéraliser**

- **Chapitre 7** — Protéger les ressources et le vivant (art. 24 + droits territoriaux)

- **Chapitre 8** — Protéger les cultures

**Chapitre préliminaire** — Méthodologie (cross-cutting, not numbered in the 8)

## How This Project Serves the Thesis

### Current coverage

| Chapter | Contribution | Status |
|---------|-------------|--------|
| Ch.1 S2 | Constitutional tensions: how 54 African states encode (or silence) collective identities — visualization of 10 coded dimensions across 439 texts | Delivered |
| Ch.2 S2 | Heterogeneity of constitutional solutions: heritage determinism (francophone silence vs. anglophone pluralism), divergence patterns, structural gaps | Delivered |
| Ch.6 | Participation vs. autonomy models: heatmap of decentralization, autonomy, federalism, and pluralisme juridique across heritage groups — maps directly to art. 13 analysis | Delivered |

### Future contributions (not yet built)

| Chapter | Contribution | Method | Roadmap |
|---------|-------------|--------|---------|
| Ch. prélim. | Methodological appendix: coding scheme documentation, summary statistics, inter-coder reliability proxy from COMMENTAIRE column | Script (prepare_data.py extension) | M7 |
| Ch.1 S1 | Preamble sovereignty rhetoric: keyword co-occurrence analysis ("unite/indivisible" near "peuple/ethnie/communauté"), sovereignty clause frequency by heritage group | NLP on 54 PDFs (regex, pdfplumber) | M2 |
| Ch.1 S2 | Enhancement: lexical map of how constitutions name sub-state groups (ethnie, tribu, communauté, peuple, autochtone, minorité) — extracted from COMMENTAIRE column | Text mining on source spreadsheet | M2 |
| Ch.2 S1 | Treaty coverage gap: upset plot of ratification combinations, correlation between UNDRIP ratification and Dpa scores (hypothesis: none) | Existing ratif_data + visualization | M0+M4 |
| Ch.2 S2 | Enhancement: empirical clustering of 54 countries on 10 dimensions — reveals constitutional *output* patterns beyond colonial *input* heritage | Hierarchical clustering (scipy) | M4 |
| Ch.3 | Case law timeline: progressive emergence of functional criterion through ACHPR jurisprudence (Endorois → Ogyek → Lower Omo → Nuba). Article invocation frequency over time | Structured case law dataset + visualization | M3+M5 |
| Ch.4 S1 | Doctrinal concept frequency: "identité complexe", "droits collectifs", "protection systémique" — first appearances and recurrence | Text mining on case law notes | M5 |
| Ch.4 S2 | Cross-system citation network: which systems does the ACHPR draw from via articles 60-61? For which rights? | Citation extraction + network diagram | M5 |
| Ch.5 | Self-determination posture of 54 constitutions: silent / prohibits secession / internal self-determination / external self-determination (Ethiopia only) | NLP on 54 PDFs (keyword classification) | M2 |
| Ch.6 | Enhancement: institutional architecture typology (unitary centralized / unitary decentralized / quasi-federal / federal / special autonomy) from COMMENTAIRE column | Semi-automatic classification | M4 |
| Ch.7 | Territorial/resource rights provisions: land rights, natural resources, environmental protection, traditional land tenure | NLP on 54 PDFs (new dimensions) | M6 |
| Ch.8 | Cultural rights depth: sub-dimension breakdown (linguistic rights, cultural practice, cultural institutions, heritage protection). Language recognition count by heritage group | NLP + qualitative coding | M6 |

## The Dataset

**Source:** `data/tableau_constit_pays_af_complet_copie.xlsx` — 54 countries, 439 constitutional texts, 10 coded dimensions.

### 10 dimensions (ordered rarest → most common)

| Code | Label | Group |
|------|-------|-------|
| Dpa | Peuples autochtones | Protections |
| F | Fédéralisme | Institutionnel |
| Dau | Autonomie | Institutionnel |
| Drc | Droits culturels | Identitaire |
| Drm | Droits des minorités | Identitaire |
| Id | Identité | Identitaire |
| La | Langues | Identitaire |
| PJ | Pluralisme juridique | Institutionnel |
| Dc | Décentralisation | Institutionnel |
| Dis | Anti-discrimination | Protections |

### Scoring
X = absent (0), P = partial (1), V = recognized (2)

### Heritage groups
- **Francophone** (23) — Jacobin model, unitary state, constitutional silence on diversity
- **Anglophone** (19) — Common law pluralism, customary courts, higher recognition scores
- **Lusophone** (5) — Post-independence socialist constitutionalism
- **Other** (7) + **Mixed** (1: Cameroun)

## Key Insights (Confirmed by EDA, 2026-03-20)

1. **Heritage determinism — significant but not dominant.** Francophone mean 7.3/20 vs anglophone 10.9/20 (Mann-Whitney p=0.004). But PCA shows heritage explains only ~43% of variance (PC1 ↔ heritage r=0.428). Heritage is *one factor among several*. The outliers (RDC scoring 15 as francophone, Tanzanie scoring 5 as anglophone) are precisely where existing categories fail — and where the functional criterion is needed.

2. **Post-1990 divergence, not convergence.** The anglo-franco gap actually *widened* from 2.4 pre-1990 to 4.7 post-1990. The democratic wave brought francophone countries to recognize decentralization (Dc: +1.50) and languages (La: +0.95), but the deeper identity dimensions (Drm: +0.06, Dpa: +0.03) remained near-zero. Convergence is dimension-specific, not general.

3. **Treaty ratification is irrelevant.** Constitutional score vs treaty ratification count: r=-0.057, p=0.682 — zero correlation. No individual treaty predicts constitutional recognition. C169 (the indigenous peoples convention) has been ratified by only 1 of 54 countries (République centrafricaine, 2010 — the only African state party). International regimes do not reach African constitutional reality. This directly supports Ch.2 S1.

4. **Recognition comes as a package.** Drc ↔ Drm r=0.70, Dpa ↔ Drm r=0.66, Drm ↔ Id r=0.66. Countries either recognize the full identity cluster or stay silent. You cannot carve out "indigenous peoples" as a separate category — the functional criterion captures the whole package. Dc and Dis are near-universal and orthogonal to the identity cluster.

5. **Francophone silence is in the law, not in reality.** COMMENTAIRE analysis shows francophone entries use "ethni" at 13.7/1000 words vs anglophone 7.2. They *discuss* ethnicity more while *recognizing* it less constitutionally. The silence is a legal construction, not an absence of diversity.

6. **Structural gaps.** F (fédéralisme) 89% absent, Dpa (peuples autochtones) 85% absent — near-zero across all groups. Dis (anti-discrimination) 98% recognized, Dc (décentralisation) 93% — near-universal. The gap between "baseline" and "identity" dimensions is the story.

## Reference Documents (data/sources/)

- **PLAN #11 A.S.docx** — PhD thesis plan (8 chapters across 2 parts)
- **Communication 298 copie.docx** — ACHPR case law notes (70th-75th sessions)
- **Note RJCDI n°102.docx** — African Court decisions (77th session, June 2025)
- **RJDCI n°104.docx** — ACHPR decisions (76th-81st sessions)
- **TEXTE CHARTE AF.pdf** — African Charter on Human and Peoples' Rights
- **UNDRIP_F_web.pdf** — UN Declaration on Rights of Indigenous Peoples
- **Convention_FRA.pdf** / **Convention relative aux peuples indigènes...pdf** — ILO C169
- **treaties_B-32_...pdf** — American Convention on Human Rights (comparative)

## Rules

- The visualization serves the thesis, not the other way around. Every chart must be interpretable in thesis terms.
- When designing a new visualization, ask: "Which chapter does this serve? What thesis argument does it support?"
- Prefer showing patterns that reveal the *need* for a new legal category over patterns that merely describe constitutional features.
- Academic rigor over visual spectacle. Every data claim must be traceable to the source spreadsheet.
