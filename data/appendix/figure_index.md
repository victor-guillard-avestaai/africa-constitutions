# Thesis Figure Index

36 figures in `data/figures/fr/` (French) and `data/figures/en/` (English) — PDF (300 dpi) + PNG.
Generated from notebooks. Regenerate with `uv run jupyter nbconvert --execute`.

Two-tier methodology: statistical comparisons use Tier 1 only (francophone n=23, anglophone n=19). Structural visualizations (clustering, similarity) include all 54 countries. Figures annotated accordingly.

## Ch.1 S1 — Souveraineté vs identité

| # | Figure | File | Source |
|---|--------|------|--------|
| 1.1 | Préambules : souveraineté vs. identité | ch1s1_preamble_sovereignty_identity | m2 |
| 1.2 | Équilibre rhétorique (identité − souveraineté) | ch1s1_preamble_balance | m2 |
| 1.3 | Marqueurs de souveraineté par héritage | ch1s1_sovereignty_markers | m2 |

*70% of francophone constitutions contain "indivisible" vs 21% anglophone — the strongest heritage marker.*

| 1.4 | Souveraineté ou identité : la géographie du silence constitutionnel (carte) | sov_vs_id_choropleth | thesis_figures |

*Blue = institutional-dominant (francophone West Africa), warm = identity-dominant (anglophone East/Southern Africa). The geographic divide is immediately visible.*

## Ch.1 S2 — Terminologie de nomination

| # | Figure | File | Source |
|---|--------|------|--------|
| 1.4 | Heatmap terminologie × héritage (Tier 1) | ch1s2_naming_heatmap | m2 |
| 1.5 | Contexte de « peoples » (Tier 1) | ch1s2_peoples_context | m2 |
| 1.6 | Distribution sémantique de « peoples » (Tier 1) | ch1s2_people_vs_peoples | thesis_figures |

*61% of francophone "peoples" usage = Charter citations (24%) + diplomatic solidarity (37%). They cite the Charter on Human and Peoples' Rights without translating "peoples" into domestic law.*

## Ch.2 S1 — Traités et reconnaissance

| # | Figure | File | Source |
|---|--------|------|--------|
| 2.1 | Ratifier n'est pas reconnaître (beeswarm) | ch2s1_treaty_beeswarm | thesis_figures |

*Spearman ρ=−0.06, p=0.68. The flat mean line shows treaty ratification is structurally incapable of differentiating.*

## Ch.2 S2 — Héritage et reconnaissance

| # | Figure | File | Source |
|---|--------|------|--------|
| 2.2 | Divergence héritage (10 petits multiples) | ch2s2_heritage_divergence | thesis_figures |
| 2.3 | Matrice de corrélation (Tier 1) | ch2s2_correlation_matrix | thesis_figures |
| 2.4 | Écart de reconnaissance (Tier 1) | ch2s2_score_distribution | thesis_figures |
| 2.5 | Carte : identitaire vs institutionnel (double choroplèthe) | ch2s2_dual_choropleth | thesis_figures |
| 2.6 | Le fossé identitaire (dumbbell) | ch2s2_heritage_dumbbell | thesis_figures |
| 2.7 | Profil constitutionnel par héritage (radar) | ch2s2_heritage_radar | thesis_figures |

*Identity cluster diverges post-1990; institutional dimensions converge. Cohen d=1.05. The dual choropleth makes the thesis argument visual at a glance.*

## Ch.3 — Chronologie jurisprudentielle

| # | Figure | File | Source |
|---|--------|------|--------|
| 3.1 | Chronologie des 30 décisions CADHP | ch3_case_law_timeline | m3_m5 |
| 3.2 | Fréquence d'invocation des articles | ch3_article_frequency | m3_m5 |
| 3.3 | Émergence du critère fonctionnel | ch3_functional_criterion_emergence | m3_m5 |

*5/30 cases invoke peoples' rights. Functional criterion crystallized in Endorois (2010) → Ogiek (2017), then extended.*

## Ch.4 — Concepts doctrinaux et citations

| # | Figure | File | Source |
|---|--------|------|--------|
| 4.1 | Vocabulaire doctrinal | ch4s1_doctrinal_concepts | m3_m5 |
| 4.2 | Citations inter-systémiques (art. 60-61) | ch4s2_cross_system_citations | m3_m5 |
| 4.3 | Citations de décisions emblématiques | ch4_landmark_citations | m3_m5 |

*ACHPR does NOT use the thesis's vocabulary. "Peuple infra-étatique", "critère fonctionnel" = 0 occurrences.*

## Ch.5 — Autodétermination

| # | Figure | File | Source |
|---|--------|------|--------|
| 5.1 | Posture d'autodétermination (Tier 1) | ch5_self_determination_posture | m2 |
| 5.2 | Heatmap marqueurs SD (Tier 1) | ch5_sd_flags_heatmap | m2 |
| 5.3 | Avant/après Ogiek (2017) | ch5_pre_post_ogiek | m3_m5 |

*Post-Ogiek constitutions score LOWER (mostly francophone authoritarian revisions). Case law ≠ constitutional change.*

## Ch.7 — Droits territoriaux

| # | Figure | File | Source |
|---|--------|------|--------|
| 7.1 | Provisions territoriales (Tier 1 + post-conflit) | ch7_land_resources | thesis_figures |

*Francophone constitutions lead on environmental language (p=0.003). Post-conflict effect visible on territorial rights.*

## Ch.8 — Profondeur des droits culturels

| # | Figure | File | Source |
|---|--------|------|--------|
| 8.1 | Profondeur culturelle par héritage | ch8_cultural_rights_depth | thesis_figures |

*NO significant heritage gap on cultural rights (all p>0.10). Francophone silence is on identity, not culture.*

## Post-conflit (transversal)

| # | Figure | File | Source |
|---|--------|------|--------|
| T.1 | Interaction héritage × post-conflit | post_conflict_interaction | post_conflict |
| T.2 | Heatmap 4 cellules × 10 dimensions | post_conflict_dimensions | post_conflict |
| T.3 | Les anomalies s'expliquent par le post-conflit | post_conflict_outliers_explained | post_conflict |
| T.4 | Effet concentré sur les dimensions identitaires | post_conflict_mechanism | post_conflict |
| T.5 | Carte : score total avec overlay post-conflit | overview_choropleth_score | thesis_figures |

*Post-conflict is the strongest predictor (η²=51.0%). The choropleth shows geographic clustering in Great Lakes/Horn/Southern Africa. RDC, Kenya, South Africa are not heritage anomalies — they are post-conflict constitutions. The effect is concentrated on identity dimensions (Drm, Id, Dpa, Drc: all p<0.001).*

## Clustering & Embeddings

| # | Figure | File | Source |
|---|--------|------|--------|
| C.1 | UMAP des 54 constitutions | clusters_umap_constitutions | m4 |
| C.2 | UMAP des 49 préambules | clusters_umap_preambles | m4 |
| C.3 | Matrice de similarité cosinus | clusters_similarity_heatmap | m4 |
| C.4 | Dendrogramme hiérarchique | clusters_dendrogram_dimensions | thesis_figures |

*Embedding clusters partially reproduce heritage (ARI=0.466) but dimension clusters do NOT (ARI=0.033). Heritage shaped form, not substance.*

## NLP

| # | Figure | File | Source |
|---|--------|------|--------|
| N.1 | Contexte de « customary » (Tier 1, %) | kwic_customary_context | m4d |
| N.2 | Topics × héritage (Tier 1) | topics_heritage_heatmap | m4d |

*186/278 "customary" = customary law/courts (anglophone). Francophone "customary" = international law contexts.*
