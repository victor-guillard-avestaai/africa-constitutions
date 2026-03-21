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

## Methodology: Two-Tier Comparative Approach

**Primary comparison (Tier 1):** Francophone (n=23) vs Anglophone (n=19) — all statistical claims (p-values, effect sizes, correlations) are computed on this n=42 subset. These two groups have sufficient sample sizes for inference and represent the thesis's core contrast: Jacobin vs Common Law models.

**Case studies (Tier 2):** Lusophone (n=5), Other (n=7), Mixed (n=1) — discussed qualitatively, not statistically. Key cases: Ethiopia (permits secession, key ACHPR case), CAR (only C169 ratification), Cameroun (mixed heritage, high recognition). Lusophone countries show distinctive patterns (60% mention self-determination) but n=5 is too small for inference.

**Translation caveat:** The NLP analysis operates on English translations from constituteproject.org. Only the 19 anglophone constitutions are in their original language. Binary detection ("indivisible" present/absent) is reliable across translations; keyword frequency comparison requires caution. See `docs/linguistic_decisions.md` for details.

## How This Project Serves the Thesis

### Delivered

| Chapter | Contribution | Status |
|---------|-------------|--------|
| Ch.1 S1 | Preamble sovereignty/identity rhetoric: scatter, balance bar, "indivisible" as heritage marker. Contextual analysis of "peoples" usage (74% francophone usage = Charter citations) | Delivered (M2) |
| Ch.1 S2 | Constitutional recognition of collective identities: 10 dimensions × 54 countries × 439 texts (map, heatmap, bio panel). Naming terminology heatmap | Delivered (M0+M2) |
| Ch.2 S1 | Treaty ratification is irrelevant to constitutional recognition: beeswarm scatter, Spearman ρ=−0.06, p=0.68. Near-zero treaty count variance limits test power but strengthens the argument | Delivered (M0) |
| Ch.2 S2 | Heterogeneity of constitutional solutions: heritage determinism (Cohen d=1.05), divergence patterns, structural gaps | Delivered (M0) |
| Ch.5 | Self-determination classification: 7-category posture for 54 countries. 8/54 mention SD, 70% francophone use "indivisible". Preliminary, keyword-based — requires legal validation | Delivered (M2, preliminary) |
| Ch.6 | Participation vs. autonomy: Dc/Dau/F/PJ dimensions across heritage groups | Delivered (M0) |

### Future contributions

| Chapter | Contribution | Method | Roadmap |
|---------|-------------|--------|---------|
| Ch. prélim. | Methodological appendix: coding scheme, summary statistics | Script | M7 |
| Ch.2 S2 | Enhancement: empirical clustering on 10 dimensions — constitutional *output* patterns beyond colonial *input* heritage | Hierarchical clustering | M4 |
| Ch.3 | Case law timeline: functional criterion emergence through ACHPR jurisprudence | Structured dataset + visualization | M3+M5 |
| Ch.4 S1 | Doctrinal concept frequency in case law | Text mining on case law notes | M5 |
| Ch.4 S2 | Cross-system citation network (articles 60-61) | Citation extraction | M5 |
| Ch.6 | Enhancement: institutional architecture typology from COMMENTAIRE | Semi-automatic classification | M4 |
| Ch.7 | Territorial/resource rights provisions | NLP on 54 PDFs | M6 |
| Ch.8 | Cultural rights depth: sub-dimension breakdown | NLP + qualitative coding | M6 |

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

## Key Insights (EDA confirmed, methodological review 2026-03-21)

1. **Heritage determines identity recognition, not institutional features.** Among n=42 francophone+anglophone countries: Cohen's d=1.05 (large effect), η²=22.3%. Per-dimension Mann-Whitney tests reveal a clean split: the **identity cluster** (Drm p<0.001, Id p<0.001, PJ p<0.001, Dpa p=0.02, Drc p=0.03) shows significant heritage gaps; the **institutional/baseline dimensions** (F, La, Dc, Dis, Dau) show none. Francophone and anglophone countries decentralize equally, discriminate equally, recognize languages similarly — but diverge sharply on identity, minorities, and legal pluralism. The outliers (RDC scoring 15 as francophone, Tanzanie scoring 5 as anglophone) are precisely where existing categories fail.

2. **Post-1990 divergence, not convergence.** The anglo-franco gap *widened* from 2.4 pre-1990 to 4.7 post-1990. The democratic wave brought francophone countries to recognize decentralization (Dc: +1.50) and languages (La: +0.95), but the identity dimensions (Drm: +0.06, Dpa: +0.03) remained near-zero. Convergence is dimension-specific, not general. *Caveat: this is a cross-sectional comparison, not a panel analysis — selection effects (which countries adopted new constitutions) are not controlled.*

3. **Treaty ratification is structurally incapable of differentiating.** 5 of 6 treaties have near-universal ratification (89-98%); C169 has near-universal non-ratification (1/54). Treaty count variance is too low (std=0.6) for a correlation test to have power. The correct framing: the international regime gives every country the same score, making it structurally incapable of predicting constitutional diversity. This supports Ch.2 S1 more strongly than a null correlation alone.

4. **Recognition comes as a package.** Drc ↔ Drm r=0.70, Dpa ↔ Drm r=0.66, Drm ↔ Id r=0.66. Countries either recognize the full identity cluster or stay silent. You cannot carve out "indigenous peoples" as a separate category — the functional criterion captures the whole package. Dc and Dis are near-universal and orthogonal to the identity cluster.

5. **Francophone silence is in the law, not in reality.** COMMENTAIRE analysis (same language, same coder — methodologically reliable) shows francophone entries use "ethni" at 13.7/1000 words vs anglophone 7.2. They *discuss* ethnicity more while *recognizing* it less constitutionally. Contextual analysis of "peoples" in constitution texts confirms: 74% of francophone usage = African Charter citations and diplomatic solidarity, not domestic recognition. They cite the Charter on Human and *Peoples'* Rights without translating "peoples" into domestic law.

6. **Structural gaps.** F (fédéralisme) 89% absent, Dpa (peuples autochtones) 85% absent — near-zero across all groups. Dis (anti-discrimination) 98% recognized, Dc (décentralisation) 93% — near-universal. The gap between "baseline" and "identity" dimensions is the story.

7. **Post-conflict constitutional moments are the strongest predictor — stronger than heritage.** Countries whose current constitution emerged from a negotiated peace process, post-war/post-genocide transition, or post-liberation state-building score dramatically higher: mean 12.4 vs 7.5 (p=0.001). This holds *within* each heritage group: francophone post-conflict 11.0 vs 6.8, anglophone post-conflict 14.6 vs 8.8. Heritage + post-conflict together explain 54.9% of variance (vs heritage alone 22.3%). The effect is concentrated on the identity cluster: Dpa (p<0.001), Dau (p<0.001), Drc (p<0.001), Drm (p<0.001). The "outliers" (RDC, Kenya, South Africa, Ethiopia) are not heritage anomalies — they are post-conflict constitutions. This supports the thesis argument that recognition of sub-state peoples is driven by *political necessity* (the functional criterion), not by inherited legal tradition alone.

    *Post-conflict constitutional moment:* The **current constitution** (not the country as an inherent property) was adopted as a direct result of a negotiated peace process, post-war/post-genocide transition, or post-liberation state-building. Coups, authoritarian revisions, and routine amendments are excluded. 15/54 current constitutions coded as post-conflict. A country may have both post-conflict and non-conflict constitutions in its history. Coding documented in `scripts/post_conflict_coding.json` with per-country justification.

8. **Religion is not an independent factor.** Constitutional references to Islam, secularism, or religious neutrality do not predict recognition scores independently of colonial heritage (η² increment = 3.3 percentage points, Kruskal-Wallis p=0.53). Within each heritage group, religion makes no difference: francophone Islamic countries score 7.4 ≈ francophone secular 7.6; anglophone Islamic 10.3 ≈ anglophone secular 10.3. The religion signal is fully absorbed by heritage.

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
