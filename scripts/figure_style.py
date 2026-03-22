"""Shared thesis figure style, bilingual labels, and helpers.

Import in notebooks:
    import sys; sys.path.insert(0, str(Path('..') / 'scripts'))
    from figure_style import *
"""

import json  # noqa: I001
from pathlib import Path
import matplotlib.patches as mpatches  # noqa: F401 — re-exported for notebook star-imports
import matplotlib.pyplot as plt
import numpy as np  # noqa: F401 — re-exported for notebook star-imports
import pandas as pd  # noqa: F401 — re-exported for notebook star-imports
from matplotlib.lines import Line2D  # noqa: F401 — re-exported

# Try seaborn, optional
try:
    import seaborn as sns
    HAS_SNS = True
except ImportError:
    HAS_SNS = False

# ── Paths ─────────────────────────────────────────────────
PROJECT_DIR = Path(__file__).resolve().parent.parent
FIG_DIR = PROJECT_DIR / 'data' / 'figures'

# ── Heritage ──────────────────────────────────────────────
H_ORDER = ['francophone', 'anglophone', 'lusophone', 'other', 'mixed']

HC = {
    'francophone': '#4a5a9a',
    'anglophone':  '#9a3a4a',
    'lusophone':   '#2a7a5a',
    'other':       '#7a8088',
    'mixed':       '#7a8088',
}

# Additional case-law / utility colors
C_PEOPLES = '#c0392b'
C_FUNC    = '#e67e22'
C_MUTED   = '#5e6a78'
C_DIM     = '#8a94a4'

# ── Features ──────────────────────────────────────────────
FEATURES = ['Dpa', 'F', 'Dau', 'Drc', 'Drm', 'Id', 'La', 'PJ', 'Dc', 'Dis']

# Identity cluster first (for correlation matrix ordering)
FEATURES_IDENTITY_FIRST = ['Drc', 'Drm', 'Id', 'Dpa', 'PJ', 'La', 'Dau', 'Dc', 'Dis', 'F']

# Dimension groupings
IDENTITY_DIMS = ['Drm', 'Id', 'Drc', 'Dpa', 'PJ']
INSTITUTIONAL_DIMS = ['Dc', 'La', 'Dis', 'Dau', 'F']

# Tier 1 heritages
TIER1_HERITAGES = ['francophone', 'anglophone']

# ── Bilingual labels ─────────────────────────────────────
LABELS = {
    'fr': {
        # Heritage group names
        'francophone': 'Francophone', 'anglophone': 'Anglophone',
        'lusophone': 'Lusophone', 'other': 'Autre', 'mixed': 'Mixte',

        # Dimension names
        'dim': {
            'Dpa': 'Peuples autochtones', 'F': 'Fédéralisme', 'Dau': 'Autonomie',
            'Drc': 'Droits culturels', 'Drm': 'Droits des minorités', 'Id': 'Identité',
            'La': 'Langues', 'PJ': 'Pluralisme juridique', 'Dc': 'Décentralisation',
            'Dis': 'Anti-discrimination',
        },

        # Score labels
        'absent': 'Absent', 'partial': 'Partiel', 'recognized': 'Reconnu',

        # ── New figure titles (Step 2) ──
        'heritage_divergence_title': "L'héritage colonial détermine la reconnaissance\nidentitaire, pas institutionnelle",
        'heritage_divergence_left': 'Dimensions identitaires\n(divergence post-1990)',
        'heritage_divergence_right': 'Dimensions institutionnelles\n(convergence)',
        'treaty_beeswarm_title': 'Ratifier n\'est pas reconnaître',
        'treaty_beeswarm_xlabel': 'Nombre de traités ratifiés',
        'treaty_beeswarm_ylabel': 'Score constitutionnel total (sur 20)',
        'treaty_beeswarm_annot': 'Spearman ρ = −0,06 · p = 0,68 (n.s.)\nσ(traités) = 0,6 — 72 % à 5 traités',
        'correlation_title': 'La reconnaissance identitaire vient en bloc',
        'correlation_subtitle': 'Corrélations de Pearson, Tier 1 (n=42)',
        'score_boxplot_title': "L'écart de reconnaissance par héritage colonial",
        'score_boxplot_ylabel': 'Score constitutionnel total (sur 20)',
        'score_boxplot_annot': 'Cohen d = 1,05 (franco. vs anglo.)',
        'dendrogram_title': 'Classification hiérarchique des 54 constitutions\n(Ward, 10 dimensions codées)',
        'dendrogram_xlabel': 'Distance',

        # ── Existing figure titles (Step 3) ──
        # Ch.1 S1
        'preamble_sov_id_title': 'Les traditions coloniales structurent\nla rhétorique préambulaire',
        'preamble_sov_id_xlabel': 'Rhétorique de souveraineté (mots-clés pour 1000 mots)',
        'preamble_sov_id_ylabel': 'Rhétorique identitaire (mots-clés pour 1000 mots)',
        'preamble_parity': 'parité',
        'preamble_mean_fmt': 'moyenne {}',
        'preamble_balance_title': 'Les préambules francophones privilégient la souveraineté,\nles anglophones l\'identité',
        'preamble_balance_xlabel': '← Souveraineté dominante          Identité dominante →',
        'sovereignty_markers_title': "« Indivisible » : un marqueur\ndistinctement francophone",
        'sov_marker_labels': ['« indivisible »', '« unité »', '« souverain »'],
        'sovereignty_markers_ylabel': '% de constitutions contenant le terme',

        # Ch.1 S2
        'naming_heatmap_title': 'Les anglophones utilisent un vocabulaire identitaire\nplus diversifié que les francophones',
        'naming_term_labels': ['peuple (sg.)', 'peuples (pl.)', 'ethni(que)', 'tribu/tribal',
                               'autochtone', 'communauté(s)', 'minorité(s)', 'nation', 'race/racial'],
        'naming_heatmap_cbar': 'pour 1000 mots',
        'peoples_context_title': "« Peoples » dans les constitutions francophones :\nun mot emprunté, pas traduit en droit",
        'peoples_context_xlabel': "Nombre d'occurrences de « peoples »",
        'peoples_context_legend': 'Type de contexte',
        'peoples_context_right_title': 'Répartition proportionnelle',
        'peoples_context_right_xlabel': '% des occurrences',

        # Context categories (currently English in French figures — now properly translated)
        'ctx_charter': 'Citation de la Charte',
        'ctx_diplomatic': 'Solidarité diplomatique',
        'ctx_proper_noun': 'Nom propre (UPDF)',
        'ctx_indigenous': 'Autochtone',
        'ctx_self_determination': 'Autodétermination',
        'ctx_national': 'National (domestique)',
        'ctx_other': 'Autre',

        # Ch.5
        'sd_posture_title': "Les constitutions francophones sont majoritairement\nsilencieuses sur l'autodétermination",
        'sd_posture_xlabel': 'Nombre de constitutions',
        'sd_posture_legend': 'Posture',
        'sd_flags_title': "L'autodétermination reste largement absente\ndes constitutions africaines",
        'sd_flag_labels': ['Autodétermination', 'Indivisible', 'Autonomie', 'Sécession'],
        'sd_categories': [
            'externe (sécession permise)', 'interne (autodét. + autonomie)',
            'mentionnée (contexte)', 'autonomie sans autodét.',
            'indivisible + autonomie (tension)', 'indivisible (prohibition implicite)',
            'silencieuse',
        ],
        'pre_post_ogiek_title': "L'arrêt Ogiek n'a pas (encore) influencé\nles réformes constitutionnelles",
        'pre_post_ogiek_ylabel': 'Score moyen (0-2)',
        'pre_ogiek_label': 'Avant Ogiek (n={})',
        'post_ogiek_label': 'Après Ogiek (n={})',

        # Ch.3 case law
        'timeline_title': 'Le critère fonctionnel émerge progressivement\ndepuis Endorois (2010)',
        'timeline_xlabel': 'Année (dépôt ou décision)',
        'legend_other_decisions': 'Autres décisions',
        'legend_peoples_rights': 'Droits des peuples (art. 19-24)',
        'legend_functional': 'Critère fonctionnel appliqué',
        'article_freq_title': "Les droits des peuples (art. 19-24) restent\nmarginaux dans la pratique CADHP",
        'article_freq_xlabel': 'Article de la Charte africaine',
        'article_freq_ylabel': "Nombre d'invocations",
        'legend_other_articles': 'Autres articles',
        'functional_emergence_title': 'Émergence progressive du critère fonctionnel\ndans la jurisprudence CADHP/Cour africaine',
        'functional_emergence_xlabel': 'Année',
        'legend_functional_explicit': 'Critère fonctionnel explicitement appliqué',
        'legend_peoples_invoked': 'Droits des peuples invoqués (art. 19-24)',
        'phase_crystallization': 'Cristallisation du critère\nfonctionnel (Kenya)',
        'phase_extension': "Extension à d'autres peuples\net systèmes juridiques",

        # Ch.4
        'doctrinal_title': 'Vocabulaire doctrinal dans la jurisprudence CADHP\n— La Commission applique le critère sans le nommer',
        'doctrinal_xlabel': 'Occurrences dans le corpus jurisprudentiel (94K caractères)',
        'doctrinal_absent': '✗ absent',
        'doctrinal_group_thesis': 'VOCABULAIRE\nDE LA THÈSE',
        'doctrinal_group_achpr': 'VOCABULAIRE\nDE LA CADHP',
        'doctrinal_group_charter': 'ARTICLES\nDE LA CHARTE',
        'citations_title': 'Citations inter-systémiques dans la jurisprudence CADHP\n— Articles 60-61 de la Charte africaine',
        'citations_xlabel': 'Citations dans le corpus (3 documents, sessions 70-81)',
        'citations_note': 'Articles 60-61 : la CADHP s\'inspire\ndu droit international et comparé',
        'landmark_title': 'Nuba/Kordofan domine les citations récentes —\nles précédents fondateurs sont absents',
        'landmark_xlabel': 'Citations dans le corpus',
        'landmark_note': 'Note : Endorois et Ogiek ne sont pas citées dans les\nsessions 70-81 car elles sont antérieures au corpus.',

        # Cross-system citation labels
        'sys_achpr': 'CADHP (auto-référence)',
        'sys_icj': 'CIJ (Cour internationale de Justice)',
        'sys_iachr': 'Cour interaméricaine (CIDH)',
        'sys_echr': 'Cour européenne (CEDH)',
        'sys_unhrc': "Comité des droits de l'Homme (ONU)",
        'sys_afcourt': 'Cour africaine',

        # Post-conflict
        'pc_interaction_title': "L'effet post-conflit est plus marqué\nchez les francophones",
        'pc_interaction_ylabel': 'Score constitutionnel total (sur 20)',
        'pc_interaction_effect': "Effet d'interaction",
        'pc_non_conflict': 'Non-conflit',
        'pc_post_conflict': 'Post-conflit',
        'pc_dimensions_title': "Les constitutions post-conflit reconnaissent\nplus sur toutes les dimensions identitaires",
        'pc_dimensions_cbar': 'Score moyen (0=X, 1=P, 2=V)',
        'pc_row_labels': ['Franco non-conflit', 'Franco post-conflit', 'Anglo non-conflit', 'Anglo post-conflit'],

        # Clustering
        'umap_const_title': "L'héritage colonial structure le texte constitutionnel,\npas la reconnaissance substantielle",
        'umap_preamb_title': 'Les préambules se regroupent moins nettement\npar héritage que les textes complets',
        'similarity_title': 'Les voisins géographiques sont plus similaires\ntextuellement que les pairs par héritage',
        'similarity_cbar': 'Similarité cosinus',
        'post_conflict_suffix': ' (post-conflit)',

        # KWIC / Topics
        'kwic_customary_title': "« Customary » renvoie au droit coutumier en anglophone,\nau droit international en francophone",
        'kwic_cats': ['Droit coutumier/tribunaux', 'Autorité traditionnelle', 'Droits fonciers',
                      'Pratiques culturelles', 'Droit international', 'Autre'],
        'kwic_xlabel': "Nombre d'occurrences",
        'kwic_legend': 'Type de contexte',
        'topics_title': 'Les thèmes constitutionnels latents varient\nentre traditions juridiques',
        'topics_note': 'Mots-clés anglais issus du corpus (constituteproject.org)',
        'topics_cbar': '% des paragraphes du groupe héritage',

        # Ch.7 / Ch.8 / Ch.1 S2 (remaining figures)
        'ch7_title': "Les francophones mentionnent davantage\nl'environnement que les anglophones",
        'ch7_right_title': 'Effet post-conflit sur les droits territoriaux',
        'ch7_xlabel': 'Pour 1000 mots',
        'ch7_right_xlabel': 'Provisions totales (moyenne)',
        'ch7_land_cats': ['Droits fonciers', 'Ressources naturelles', 'Environnement', 'Terres ancestrales', 'Droits hydriques'],
        'ch8_title': 'Seule la protection du patrimoine varie\nentre traditions juridiques',
        'ch8_cbar': 'Occurrences moyennes',
        'ch8_cats': ['Droits linguistiques', 'Pratiques culturelles', 'Institutions culturelles', 'Protection du patrimoine'],
        'ch8_zero_note': 'Les 0,0 reflètent une absence quasi-totale de ces provisions dans le corpus constitutionnel.',
        'people_vs_peoples_title': 'Fréquence de « people » vs « peoples »',
        'people_vs_peoples_xlabel': '« people » (singulier, pour 1000 mots)',
        'people_vs_peoples_ylabel': '« peoples » (pluriel, pour 1000 mots)',
        'people_vs_peoples_right': 'Moyenne par héritage',
        'people_vs_peoples_right_ylabel': 'pour 1000 mots',
        'pc_non_conflict_short': 'Non-conflit',
        'pc_post_conflict_short': 'Post-conflit',

        # New labels for figure rework
        'peoples_semantic_title': "Les constitutions francophones citent « peoples »\nsans le traduire en droit domestique",
        'peoples_semantic_xlabel': "% des occurrences de « peoples »",
        'peoples_semantic_annot': "61 % = citations de la Charte\n+ solidarité diplomatique",
        'timeline_subtitle': "5 des 30 communications invoquent les droits des peuples (art. 19-24)",
        'article_freq_subtitle': "Combien des 30 affaires CADHP citent chaque article de la Charte",
        'correlation_cluster_label': 'Cluster identitaire',
        'pre_post_ogiek_subtitle': "Les constitutions post-Ogiek sont majoritairement des révisions\nautoritaires francophones (Guinée, Tunisie, Tchad),\npas des réponses à la jurisprudence.",
        'dendrogram_subtitle': "Les pays se regroupent par profil de reconnaissance, pas par héritage",
        'treaty_beeswarm_subtitle': "Chaque point = un pays. La ligne plate montre l'absence\nde relation entre traités ratifiés et reconnaissance constitutionnelle.",
        'treaty_beeswarm_mean': 'Moyenne globale',
        'pc_outliers_title': "Les « anomalies » s'expliquent par le moment\nconstitutionnel post-conflit",
        'pc_outliers_ylabel': 'Score constitutionnel total (sur 20)',
        'pc_mechanism_title': "L'effet post-conflit se concentre\nsur les dimensions identitaires",
        'pc_mechanism_ylabel': 'Score moyen (0-2)',
        'pc_mechanism_identity': 'Dimensions identitaires',
        'pc_mechanism_institutional': 'Dimensions institutionnelles',
        'pc_interaction_suptitle': "L'effet post-conflit est plus fort que l'héritage colonial",
        'pc_mechanism_footnote': 'Drm=Minorités, Id=Identité, Drc=Droits culturels, Dpa=Peuples autochtones, PJ=Pluralisme juridique, Dc=Décentralisation, La=Langues, Dis=Anti-discrimination, Dau=Autonomie, F=Fédéralisme',
        'tier2_note': '* Lusophone, autre = Tier 2 (études de cas)',
        'tier1_note': 'Tier 1 (n=42, francophone + anglophone)',
        'kwic_pct_xlabel': "% des occurrences",
    },

    'en': {
        # Heritage group names
        'francophone': 'Francophone', 'anglophone': 'Anglophone',
        'lusophone': 'Lusophone', 'other': 'Other', 'mixed': 'Mixed',

        # Dimension names
        'dim': {
            'Dpa': 'Indigenous peoples', 'F': 'Federalism', 'Dau': 'Autonomy',
            'Drc': 'Cultural rights', 'Drm': 'Minority rights', 'Id': 'Identity',
            'La': 'Languages', 'PJ': 'Legal pluralism', 'Dc': 'Decentralization',
            'Dis': 'Anti-discrimination',
        },

        # Score labels
        'absent': 'Absent', 'partial': 'Partial', 'recognized': 'Recognized',

        # ── New figure titles ──
        'heritage_divergence_title': 'Colonial heritage determines identity recognition,\nnot institutional features',
        'heritage_divergence_left': 'Identity dimensions\n(post-1990 divergence)',
        'heritage_divergence_right': 'Institutional dimensions\n(convergence)',
        'treaty_beeswarm_title': 'Ratification does not mean recognition',
        'treaty_beeswarm_xlabel': 'Number of ratified treaties',
        'treaty_beeswarm_ylabel': 'Total constitutional score (out of 20)',
        'treaty_beeswarm_annot': 'Spearman ρ = −0.06 · p = 0.68 (n.s.)\nσ(treaties) = 0.6 — 72% at count 5',
        'correlation_title': 'Identity recognition comes as a package',
        'correlation_subtitle': 'Pearson correlations, Tier 1 (n=42)',
        'score_boxplot_title': 'The recognition gap by colonial heritage',
        'score_boxplot_ylabel': 'Total constitutional score (out of 20)',
        'score_boxplot_annot': "Cohen's d = 1.05 (franco. vs anglo.)",
        'dendrogram_title': 'Hierarchical clustering of 54 constitutions\n(Ward, 10 coded dimensions)',
        'dendrogram_xlabel': 'Distance',

        # ── Existing figure titles ──
        # Ch.1 S1
        'preamble_sov_id_title': 'Colonial traditions structure\npreamble rhetoric',
        'preamble_sov_id_xlabel': 'Sovereignty rhetoric (keywords per 1000 words)',
        'preamble_sov_id_ylabel': 'Identity rhetoric (keywords per 1000 words)',
        'preamble_parity': 'parity',
        'preamble_mean_fmt': '{} mean',
        'preamble_balance_title': 'Francophone preambles emphasize sovereignty,\nanglophone preambles emphasize identity',
        'preamble_balance_xlabel': '← Sovereignty-dominant          Identity-dominant →',
        'sovereignty_markers_title': '"Indivisible": a distinctly\nfrancophone marker',
        'sov_marker_labels': ['"indivisible"', '"unity"', '"sovereign"'],
        'sovereignty_markers_ylabel': '% of constitutions containing the term',

        # Ch.1 S2
        'naming_heatmap_title': 'Anglophone constitutions use more diverse\nidentity vocabulary than francophone',
        'naming_term_labels': ['people (sg.)', 'peoples (pl.)', 'ethnic', 'tribe/tribal',
                               'indigenous', 'community/ies', 'minority/ies', 'nation', 'race/racial'],
        'naming_heatmap_cbar': 'per 1000 words',
        'peoples_context_title': '"Peoples" in francophone constitutions:\na borrowed word, not translated into law',
        'peoples_context_xlabel': 'Number of "peoples" occurrences',
        'peoples_context_legend': 'Context type',
        'peoples_context_right_title': 'Proportional distribution',
        'peoples_context_right_xlabel': '% of occurrences',

        'ctx_charter': 'Charter citation',
        'ctx_diplomatic': 'Diplomatic solidarity',
        'ctx_proper_noun': 'Proper noun (UPDF)',
        'ctx_indigenous': 'Indigenous/autochthonous',
        'ctx_self_determination': 'Self-determination',
        'ctx_national': 'National (domestic)',
        'ctx_other': 'Other',

        # Ch.5
        'sd_posture_title': 'Francophone constitutions are mostly silent\non self-determination',
        'sd_posture_xlabel': 'Number of constitutions',
        'sd_posture_legend': 'Posture',
        'sd_flags_title': 'Self-determination remains largely absent\nfrom African constitutions',
        'sd_flag_labels': ['Self-determination', 'Indivisible', 'Autonomy', 'Secession'],
        'sd_categories': [
            'external (secession permitted)', 'internal (self-determination + autonomy)',
            'mentioned (context-dependent)', 'autonomy without SD language',
            'indivisible + autonomy (tension)', 'indivisible (implicit prohibition)',
            'silent',
        ],
        'pre_post_ogiek_title': 'The Ogiek ruling has not (yet) influenced\nconstitutional reforms',
        'pre_post_ogiek_ylabel': 'Mean score (0-2)',
        'pre_ogiek_label': 'Before Ogiek (n={})',
        'post_ogiek_label': 'After Ogiek (n={})',

        # Ch.3 case law
        'timeline_title': 'The functional criterion emerges progressively\nsince Endorois (2010)',
        'timeline_xlabel': 'Year (filing or decision)',
        'legend_other_decisions': 'Other decisions',
        'legend_peoples_rights': "Peoples' rights (art. 19-24)",
        'legend_functional': 'Functional criterion applied',
        'article_freq_title': "Peoples' rights (art. 19-24) remain marginal\nin ACHPR practice",
        'article_freq_xlabel': 'African Charter article',
        'article_freq_ylabel': 'Number of invocations',
        'legend_other_articles': 'Other articles',
        'functional_emergence_title': 'Progressive emergence of the functional criterion\nin ACHPR/African Court case law',
        'functional_emergence_xlabel': 'Year',
        'legend_functional_explicit': 'Functional criterion explicitly applied',
        'legend_peoples_invoked': "Peoples' rights invoked (art. 19-24)",
        'phase_crystallization': 'Crystallization of the\nfunctional criterion (Kenya)',
        'phase_extension': 'Extension to other peoples\nand legal systems',

        # Ch.4
        'doctrinal_title': 'Doctrinal vocabulary in ACHPR case law\n— The Commission applies the criterion without naming it',
        'doctrinal_xlabel': 'Occurrences in the case law corpus (94K characters)',
        'doctrinal_absent': '✗ absent',
        'doctrinal_group_thesis': 'THESIS\nVOCABULARY',
        'doctrinal_group_achpr': 'ACHPR\nVOCABULARY',
        'doctrinal_group_charter': 'CHARTER\nARTICLES',
        'citations_title': 'Cross-system citations in ACHPR case law\n— Articles 60-61 of the African Charter',
        'citations_xlabel': 'Citations in the corpus (3 documents, sessions 70-81)',
        'citations_note': 'Articles 60-61: the ACHPR draws on\ninternational and comparative law',
        'landmark_title': 'Nuba/Kordofan dominates recent citations —\nfoundational precedents are absent',
        'landmark_xlabel': 'Citations in the corpus',
        'landmark_note': 'Note: Endorois and Ogiek are not cited in sessions\n70-81 as they predate the corpus.',

        'sys_achpr': 'ACHPR (self-reference)',
        'sys_icj': 'ICJ (International Court of Justice)',
        'sys_iachr': 'Inter-American Court (IACHR)',
        'sys_echr': 'European Court (ECHR)',
        'sys_unhrc': 'UN Human Rights Committee',
        'sys_afcourt': 'African Court',

        # Post-conflict
        'pc_interaction_title': 'The post-conflict effect is stronger\namong francophone constitutions',
        'pc_interaction_ylabel': 'Total constitutional score (out of 20)',
        'pc_interaction_effect': 'Interaction effect',
        'pc_non_conflict': 'Non-conflict',
        'pc_post_conflict': 'Post-conflict',
        'pc_dimensions_title': 'Post-conflict constitutions recognize more\nacross all identity dimensions',
        'pc_dimensions_cbar': 'Mean score (0=X, 1=P, 2=V)',
        'pc_row_labels': ['Franco non-conflict', 'Franco post-conflict', 'Anglo non-conflict', 'Anglo post-conflict'],

        # Clustering
        'umap_const_title': 'Colonial heritage shapes constitutional text,\nnot substantive recognition',
        'umap_preamb_title': 'Preambles cluster less clearly by heritage\nthan full constitutional texts',
        'similarity_title': 'Geographic neighbors are more textually similar\nthan heritage peers',
        'similarity_cbar': 'Cosine similarity',
        'post_conflict_suffix': ' (post-conflict)',

        # KWIC / Topics
        'kwic_customary_title': '"Customary" refers to customary law in anglophone,\nto international law in francophone',
        'kwic_cats': ['Customary law/courts', 'Traditional authority', 'Land/property rights',
                      'Cultural practices', 'International law', 'Other'],
        'kwic_xlabel': 'Number of occurrences',
        'kwic_legend': 'Context type',
        'topics_title': 'Latent constitutional topics vary\nacross legal traditions',
        'topics_note': 'English keywords from corpus (constituteproject.org)',
        'topics_cbar': '% of paragraphs in heritage group',

        # Ch.7 / Ch.8 / Ch.1 S2 (remaining figures)
        'ch7_title': 'Francophone constitutions mention the environment\nmore than anglophone',
        'ch7_right_title': 'Post-conflict effect on territorial rights',
        'ch7_xlabel': 'Per 1000 words',
        'ch7_right_xlabel': 'Total provisions (mean)',
        'ch7_land_cats': ['Land rights', 'Natural resources', 'Environment', 'Ancestral land', 'Water rights'],
        'ch8_title': 'Only heritage protection varies\nacross legal traditions',
        'ch8_cbar': 'Mean occurrences',
        'ch8_cats': ['Linguistic rights', 'Cultural practices', 'Cultural institutions', 'Heritage protection'],
        'ch8_zero_note': 'The 0.0 values reflect a near-total absence of these provisions in the constitutional corpus.',
        'people_vs_peoples_title': 'Frequency of "people" vs "peoples"',
        'people_vs_peoples_xlabel': '"people" (singular, per 1000 words)',
        'people_vs_peoples_ylabel': '"peoples" (plural, per 1000 words)',
        'people_vs_peoples_right': 'Mean by heritage',
        'people_vs_peoples_right_ylabel': 'per 1000 words',
        'pc_non_conflict_short': 'Non-conflict',
        'pc_post_conflict_short': 'Post-conflict',

        # New labels for figure rework
        'peoples_semantic_title': "Francophone constitutions cite 'peoples'\nwithout translating it into domestic law",
        'peoples_semantic_xlabel': "% of 'peoples' occurrences",
        'peoples_semantic_annot': "61% = Charter citations\n+ diplomatic solidarity",
        'timeline_subtitle': "5 of 30 communications invoke peoples' rights (art. 19-24)",
        'article_freq_subtitle': "How many of the 30 ACHPR cases cited each Charter article",
        'correlation_cluster_label': 'Identity cluster',
        'pre_post_ogiek_subtitle': "Post-Ogiek constitutions are mostly francophone\nauthoritarian revisions (Guinea, Tunisia, Chad),\nnot responses to case law.",
        'dendrogram_subtitle': "Countries cluster by recognition patterns, not by heritage",
        'treaty_beeswarm_subtitle': "Each dot = one country. The flat line shows no relationship\nbetween treaty ratification and constitutional recognition.",
        'treaty_beeswarm_mean': 'Overall mean',
        'pc_outliers_title': "The 'outliers' are explained by post-conflict\nconstitutional moments",
        'pc_outliers_ylabel': 'Total constitutional score (out of 20)',
        'pc_mechanism_title': "The post-conflict effect is concentrated\non identity dimensions",
        'pc_mechanism_ylabel': 'Mean score (0-2)',
        'pc_mechanism_identity': 'Identity dimensions',
        'pc_mechanism_institutional': 'Institutional dimensions',
        'pc_interaction_suptitle': 'The post-conflict effect is stronger than colonial heritage',
        'pc_mechanism_footnote': 'Drm=Minorities, Id=Identity, Drc=Cultural rights, Dpa=Indigenous peoples, PJ=Legal pluralism, Dc=Decentralization, La=Languages, Dis=Anti-discrimination, Dau=Autonomy, F=Federalism',
        'tier2_note': '* Lusophone, other = Tier 2 (case studies)',
        'tier1_note': 'Tier 1 (n=42, francophone + anglophone)',
        'kwic_pct_xlabel': "% of occurrences",
    },
}


def t(key, lang='fr'):
    """Get translated label. For dimension names: t('dim', lang)['Dpa']."""
    return LABELS[lang][key]


def hl(heritage, lang='fr'):
    """Get heritage label."""
    return LABELS[lang].get(heritage, heritage.capitalize())


def add_tier_note(ax, lang='fr', tier=1):
    """Add small tier annotation to figure corner."""
    label = t('tier1_note', lang) if tier == 1 else t('tier2_note', lang)
    ax.text(0.98, 0.02, label, transform=ax.transAxes, ha='right', va='bottom',
            fontsize=7, color=C_DIM, style='italic',
            bbox=dict(boxstyle='round,pad=0.2', facecolor='white', edgecolor=C_DIM, alpha=0.6))


# ── Style ─────────────────────────────────────────────────
THESIS_RCPARAMS = {
    'font.family': 'serif',
    'font.size': 10,
    'axes.titlesize': 13,
    'axes.labelsize': 11,
    'xtick.labelsize': 9,
    'ytick.labelsize': 9,
    'axes.spines.top': False,
    'axes.spines.right': False,
    'figure.facecolor': '#f6f3ee',
    'axes.facecolor': '#f6f3ee',
    'savefig.facecolor': '#f6f3ee',
    'figure.dpi': 150,
    'savefig.dpi': 300,
    'savefig.bbox': 'tight',
}


def apply_style():
    """Apply thesis-quality matplotlib style."""
    if HAS_SNS:
        sns.set_theme(style='whitegrid', font='serif', palette='muted')
    plt.rcParams.update(THESIS_RCPARAMS)


# ── Save helper ───────────────────────────────────────────
def save_fig(fig, name, lang='fr', fig_dir=None):
    """Save figure to data/figures/{lang}/{name}.pdf and .png."""
    if fig_dir is None:
        fig_dir = FIG_DIR
    out_dir = Path(fig_dir) / lang
    out_dir.mkdir(parents=True, exist_ok=True)
    for fmt in ('pdf', 'png'):
        fig.savefig(out_dir / f'{name}.{fmt}')


# ── Data loader ───────────────────────────────────────────
def load_data(project_dir=None):
    """Load DATA from src/data.js. Returns the parsed dict."""
    if project_dir is None:
        project_dir = PROJECT_DIR
    with open(Path(project_dir) / 'src' / 'data.js') as f:
        raw = f.read()
    start = raw.index('{')
    end = raw.rindex('}') + 1
    return json.loads(raw[start:end])
