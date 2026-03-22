// ═══════════════════════════════════════════════════════════
// Tab Navigation
// ═══════════════════════════════════════════════════════════
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
});

// ═══════════════════════════════════════════════════════════
// CSS Custom Property Reader
// ═══════════════════════════════════════════════════════════
const CSS = (() => {
  const s = getComputedStyle(document.documentElement);
  const g = (v) => s.getPropertyValue(v).trim();
  return {
    text: g('--text'), muted: g('--muted'), dim: g('--dim'),
    border: g('--border'), cNone: g('--c-none'),
    francophone: g('--francophone'), anglophone: g('--anglophone'),
    lusophone: g('--lusophone'), otherH: g('--other-h'),
    scoreX: g('--score-x'), scoreP: g('--score-p'), scoreV: g('--score-v'),
    pillBgV: g('--pill-bg-v'), pillBgP: g('--pill-bg-p'), pillBgX: g('--pill-bg-x'),
    pillCv: g('--pill-c-v'), pillCp: g('--pill-c-p'), pillCx: g('--pill-c-x'),
    strokeDefault: g('--stroke-default'), axisGrid: g('--axis-grid'),
    hatchBg: g('--hatch-bg'), hatchStroke: g('--hatch-stroke'),
  };
})();

// ═══════════════════════════════════════════════════════════
// Internationalization (I18N)
// ═══════════════════════════════════════════════════════════
const I18N = {
  fr: {
    // Header
    site_title: "Constitutions d'Afrique",
    site_lead: "De la construction nationale au pluralisme identitaire — comment 54 pays africains reconnaissent ou effacent la diversité ethnoculturelle dans leurs constitutions",

    // Tab names
    tab_carte: "Carte",
    tab_matrice: "Matrice",
    tab_heritage: "Héritage",
    tab_traites: "Traités",
    tab_conflit: "Post-conflit",
    tab_textes: "Textes",
    tab_clusters: "Clusters",
    tab_figures: "Figures",

    // Carte tab
    carte_title: "Carte de la reconnaissance constitutionnelle",
    carte_sub: "Chaque pays est coloré selon le score moyen des dimensions sélectionnées, pour l'année choisie. Cliquez sur un pays pour explorer son histoire constitutionnelle. <b>Shift+clic</b> sur les dimensions pour en sélectionner plusieurs.",
    carte_year: "Année",
    carte_animate: "Animer",
    carte_dims: "Dimensions (multi-sélection)",
    carte_mode: "Mode d'affichage",
    mode_score: "Score seul",
    mode_combined: "Combiné",
    mode_heritage: "Héritage seul",
    pc_overlay: "Overlay post-conflit",
    carte_loading: "Chargement de la carte...",
    carte_reset: "↺ Réinitialiser la vue",
    carte_colonial: "Territoire colonial",
    carte_disputed: "Territoire disputé",
    bio_close: "Fermer",

    // Matrice tab
    matrice_title: "Matrice comparative — 54 pays × 10 dimensions",
    matrice_sub: "Dernière constitution en vigueur par pays. Cliquez sur un en-tête de colonne pour trier. Cliquez sur un nom de pays pour ouvrir sa fiche.",
    matrice_x: "X = absent",
    matrice_p: "P = reconnaissance partielle",
    matrice_v: "V = pleinement reconnu",
    filter_all: "Tous",
    filter_postconflict: "Post-conflit",
    filter_nonconflict: "Non-conflit",
    conflit_filter_label: "Conflit",
    filter_peace: "Paix",
    filter_auth: "Autoritaire",

    // Heritage tab
    heritage_title: "Divergence par héritage colonial",
    heritage_sub: "Score moyen de reconnaissance par tradition juridique (1960–2026). Survolez pour les valeurs exactes par héritage.",
    heritage_explain: "L'héritage colonial détermine la tradition juridique constitutionnelle. Les pays <strong>francophones</strong> ont hérité du modèle jacobin français (État unitaire, silence sur la diversité). Les pays <strong>anglophones</strong> ont hérité du pluralisme de la common law britannique (chefferie traditionnelle, tribunaux coutumiers). Les pays <strong>lusophones</strong> suivent une troisième voie, souvent marquée par le socialisme post-indépendance.<br><br><strong>Résultat clé</strong> : l'écart francophone-anglophone s'est <em>élargi</em> après 1990, passant de 2,4 à 4,7 points. La vague de démocratisation a apporté la décentralisation et la reconnaissance linguistique, mais pas la reconnaissance identitaire profonde (droits des minorités, peuples autochtones). η² = 22,3 % (n = 42 franco + anglo).",
    heritage_franco: "Francophone (23 pays)",
    heritage_anglo: "Anglophone (19 pays)",
    heritage_luso: "Lusophone (5 pays)",

    // Traites tab
    traites_title: "Ratifier n'est pas reconnaître",
    traites_sub: "Ce graphique confronte deux mesures pour chaque pays : ses engagements internationaux (nombre de traités ratifiés sur 6) et la réalité de sa constitution (score total des 10 dimensions sur 20). La corrélation est nulle (ρ = −0,06, p = 0,68) — ratifier des traités ne prédit pas la reconnaissance constitutionnelle.",
    traites_explain: "<strong>Axe horizontal</strong> = nombre de traités internationaux ratifiés (DNUDPA, PIDCP, PIDESC, CERD, C169, CADHP).<br><strong>Axe vertical</strong> = score constitutionnel total (somme des 10 dimensions, 0 = tout absent, 20 = tout reconnu).<br><strong>La ligne horizontale</strong> représente le score moyen. L'absence de pente confirme l'absence de corrélation.<br><strong>Couleur</strong> : héritage colonial. <strong>Filtres</strong> : utilisez les boutons ci-dessous pour isoler un héritage ou un type de contexte.<br><strong>Constat frappant</strong> : presque tous les pays ont ratifié la CADHP (53/54) et la DNUDPA (52/54), mais un seul (la RCA) a ratifié la Convention 169 de l'OIT sur les peuples autochtones — les régimes internationaux ne prédisent pas la réalité constitutionnelle.",

    // Post-conflit tab
    conflit_title: "Le moment constitutionnel post-conflit",
    conflit_sub: "Les constitutions adoptées après un conflit armé ou une transition politique majeure reconnaissent davantage la diversité — indépendamment de l'héritage colonial.",
    conflit_method_result_thesis: "<strong>Variable</strong> : la <em>constitution actuelle</em> a-t-elle été adoptée dans le cadre d'un processus de paix, d'une transition post-guerre ou d'une construction nationale post-libération ? 13/54 constitutions codées post-conflit.<br><strong>Résultat</strong> : parmi les 42 pays francophones et anglophones, les constitutions post-conflit obtiennent un score moyen de 14,1/20 contre 7,5 (p = 0,0001). L'héritage seul explique 22,3 % de la variance ; héritage + post-conflit en explique 63,2 %. L'effet est concentré sur les dimensions identitaires (Dpa, Dau, Drc, Drm : p &lt; 0,001).<br><strong>Implication pour la thèse</strong> : la reconnaissance des peuples infra-étatiques est motivée par la nécessité politique (le critère fonctionnel), pas par la tradition juridique héritée seule.",
    conflit_read: "<strong>Comment lire ce graphique ?</strong> Chaque barre représente le score moyen d'un groupe de pays. Le groupe est défini par deux variables : l'héritage colonial (francophone ou anglophone) et le contexte de la constitution actuelle (post-conflit ou non). Si l'héritage était le seul facteur, les deux barres bleues seraient au même niveau. L'écart entre « conflit » et « non-conflit » <em>au sein du même héritage</em> montre que le contexte de rédaction de la constitution compte autant, sinon plus, que la tradition juridique héritée.",

    // Textes tab
    textes_title: "Ce que disent les constitutions",
    textes_sub: "Analyse textuelle de 54 constitutions (1,4 million de mots). Nous avons compté et classé les occurrences de termes juridiques clés pour mesurer objectivement ce que chaque constitution dit — et ce qu'elle tait.",
    textes_method: "<strong>Méthode</strong> : les 54 constitutions ont été téléchargées en anglais depuis <em>constituteproject.org</em>, puis analysées par recherche de mots-clés. Pour chaque terme (« sovereignty », « peoples », « indivisible »...), nous avons compté les occurrences et classé leur contexte d'utilisation.<br><strong>Limite</strong> : seules les 19 constitutions anglophones sont dans leur langue originale. Les 35 autres sont des traductions. Les termes techniques juridiques (« indivisible », « self-determination ») se traduisent fidèlement ; les termes courants (« people », « community ») sont plus ambigus.",
    textes_sov_title: "Souveraineté vs identité dans les préambules",
    textes_sov_sub: "70 % des constitutions francophones contiennent le mot « indivisible », contre 21 % des anglophones. Le modèle jacobin se lit dans le texte.",
    textes_peoples_title: "Le mot « peoples » : citation vs reconnaissance",
    textes_peoples_sub: "Les constitutions francophones utilisent le mot « peoples » (peuples) plus souvent que les anglophones — mais 61 % des occurrences sont des citations de la Charte africaine (24 %) ou des formules diplomatiques (37 %). Le mot « peuples » n'est pas traduit en droits domestiques.",
    textes_sd_title: "Autodétermination",
    textes_sd_sub: "8 pays sur 54 mentionnent l'autodétermination. Seule l'Éthiopie autorise la sécession. Classification préliminaire par mots-clés — nécessite validation juridique.",
    textes_sd_sort_label: "Tri",
    textes_sd_posture: "Posture",
    textes_sd_criteria: "Critères",
    textes_sov_n_tooltip: "{n}/{total} constitutions ({pct} %)",
    textes_peoples_mentions: "{n} mentions",
    textes_peoples_pct: "{pct} % des mentions",
    textes_sd_col_country: "Pays",
    textes_sd_col_sd: "Autodét.",
    textes_sd_col_indiv: "Indivisible",
    textes_sd_col_auton: "Autonomie",
    textes_sd_col_secess: "Sécession",
    textes_sd_col_posture: "Posture",
    textes_sd_posture_external: "externe (sécession)",
    textes_sd_posture_internal: "interne (SD + autonomie)",
    textes_sd_posture_mentioned: "mentionné",
    textes_sd_posture_autonomy_only: "autonomie sans SD",
    textes_sd_posture_indivisible_only: "indivisible seul",
    textes_sd_posture_tension: "indivisible + autonomie",
    textes_sd_posture_silent: "silencieux",
    textes_peoples_ctx_charter: "Charte africaine",
    textes_peoples_ctx_diplomatic: "Formule diplomatique",
    textes_peoples_ctx_indigenous: "Peuples autochtones",
    textes_peoples_ctx_self_determination: "Autodétermination",
    textes_peoples_ctx_proper_noun: "Nom propre",
    textes_peoples_ctx_national: "Peuple national",

    // Clusters tab
    clusters_title: "Clustering constitutionnel",
    clusters_explain: "<strong>Méthode</strong> : les 54 constitutions sont plongées dans un espace sémantique (embeddings voyage-law-2, 1024 dimensions) puis projetées en 2D (UMAP). Le clustering hiérarchique (Ward) sur les 10 dimensions codées révèle des groupes qui ne reproduisent PAS l'héritage colonial (ARI = 0,033).",
    clusters_umap_title: "Carte de proximité sémantique",
    clusters_umap_sub: "Chaque point représente une constitution. Les points proches sont textuellement similaires. Les couleurs indiquent l'héritage colonial.",
    clusters_dendro_title: "Classification hiérarchique interactive",
    clusters_dendro_explain: "Déplacez le curseur de droite à gauche. À droite, toute l'Afrique forme un seul groupe. En déplaçant vers la gauche, les constitutions différentes se séparent en groupes distincts. La carte montre quels pays restent ensemble.",
    clusters_threshold: "Seuil",
    clusters_groups: "groupes",
    clusters_group: "Groupe",
    clusters_countries: "pays",
    btn_constitutions: "Constitutions",
    btn_preambles: "Préambules",

    // Figures tab
    figures_title: "Figures de la thèse",
    figures_sub: "36 figures organisées par chapitre. Cliquez sur une image pour l'agrandir. Téléchargez le PDF haute résolution via le bouton ⬇.",
    fig_download: "⬇ PDF",
    fig_method_toggle: "En savoir plus",
    fig_method_toggle_close: "Masquer",

    // Footer
    footer_note: "Chaque cellule colorée encode une dimension constitutionnelle",

    // Tooltips & UI
    no_data: "Pas de données",
    score_label: "Score",
    heritage_label: "Héritage",
    postconflict_label: "Post-conflit",
    postconflict_constitution: "Constitution post-conflit",
    total_score: "Score total",
    treaties_ratified: "Traités ratifiés",
    yes: "Oui",
    no: "Non",
    no_comment: "Pas de commentaire disponible.",
    untitled: "Sans titre",
    click_segment: "Cliquez sur un segment pour lire le commentaire complet",
    click_open: "Cliquez pour ouvrir la fiche",
    mean_score: "Score moyen",
    country: "Pays",
    constitutional_score: "Score constitutionnel",
    part_of_until: "Fait partie de {parent} jusqu'en {year}",
    colonial_territory: "Territoire colonial — indépendance en {year}",
    texts_count: "{n} textes",

    // Legend
    legend_absent: "Absent",
    legend_partial: "Partiel",
    legend_recognized: "Reconnu",
    legend_explain: "La <b>teinte</b> indique l'héritage colonial ; l'<b>intensité</b> indique le niveau de reconnaissance.",
    legend_postconflict_border: "Bordure épaisse = constitution post-conflit",

    // Heritage names
    h_francophone: "Francophone",
    h_anglophone: "Anglophone",
    h_lusophone: "Lusophone",
    h_other: "Autre",
    h_mixed: "Mixte",

    // Groups
    grp_all: "Toutes",
    grp_identity: "Identitaire",
    grp_institutional: "Institutionnel",
    grp_protections: "Protections",

    // Short dimension labels
    dim_short: { Dpa:'Péd.aut.', F:'Féd.', Dau:'Auto.', Drc:'Cult.', Drm:'Min.', Id:'Iden.', La:'Lng.', PJ:'Plur.', Dc:'Déc.', Dis:'Discr.' },

    // CSV headers
    csv_country: "Pays",
    csv_heritage: "Héritage",
    csv_postconflict: "Post-conflit",
    csv_total: "Score total",
    csv_treaties: "Traités ratifiés",

    // Scatter
    scatter_ylabel: "Score constitutionnel total (sur 20)",
    scatter_xlabel: "Nombre de traités internationaux ratifiés (sur 6)",
    scatter_stat: "Spearman ρ = −0,06 · p = 0,68 (non significatif)",

    // Conflict chart
    conflict_ylabel: "Score moyen (sur 20)",
    conflict_labels: ['Francophone\nnon-conflit','Francophone\npost-conflit','Anglophone\nnon-conflit','Anglophone\npost-conflit'],
    conflit_comparison_title: "Comparaison par type",
    conflit_dimensions_title: "Effet par dimension",
    conflit_peace_title: "Processus de paix",
    conflit_auth_title: "Transition autoritaire",
    conflit_nonconflict: "Non-conflit",
    conflit_stat_count: "constitutions post-conflit",
    conflit_peace_count: "pays (processus de paix)",
    conflit_auth_count: "pays (transition autoritaire)",
    conflit_mean_pc: "Score moyen post-conflit",
    conflit_mean_npc: "Score moyen non-conflit",
    conflit_mannwhitney: "Mann-Whitney",
    conflit_eta_heritage: "η² héritage seul",
    conflit_eta_combined: "η² héritage + post-conflit",
    conflit_ref_mean: "Moyenne non-conflit",

    // Divergence annotations
    div_events: [['Démocratisation'],['UA créée']],
    div_annotations: {
      'F': [
        {year:1963, text:'Nigéria (1963) : première fédération africaine post-indépendance'},
        {year:1990, text:'Le fédéralisme reste une spécificité anglophone — Nigéria, Éthiopie, Af. du Sud'},
        {year:1995, text:'Éthiopie (1995) : fédéralisme ethnique avec droit de sécession (art. 39)'},
      ],
      'Dc': [
        {year:1990, text:'Conférence de La Baule (1990) : la France conditionne l\'aide à la démocratisation'},
        {year:1996, text:'Les constitutions francophones inscrivent massivement la décentralisation'},
        {year:2010, text:'Convergence quasi-complète : 93% du continent reconnaît la décentralisation'},
      ],
      'Drm': [
        {year:1990, text:'La démocratisation ne comble PAS l\'écart sur les droits des minorités'},
        {year:1996, text:'Af. du Sud (1996) : Bill of Rights avec 11 langues officielles et droits des minorités'},
        {year:2010, text:'Le silence francophone sur les minorités persiste malgré 20 ans de démocratie'},
      ],
      'La': [
        {year:1990, text:'Le multilinguisme officiel reste un marqueur anglophone'},
        {year:1996, text:'Af. du Sud reconnaît 11 langues ; Tanzanie ajoute le swahili et l\'anglais'},
        {year:2010, text:'Les francophones restent monolingues constitutionnellement (français = langue officielle)'},
      ],
      'Drc': [
        {year:1990, text:'Les droits culturels émergent dans les constitutions post-démocratisation'},
        {year:2002, text:'Charte de l\'UA (2002) : le protocole de Maputo renforce les droits culturels'},
        {year:2010, text:'Kenya (2010) et Zimbabwe (2013) inscrivent des droits culturels forts'},
      ],
      'Dpa': [
        {year:1990, text:'Quasi-absent : le concept de « peuples autochtones » est un import occidental'},
        {year:2007, text:'DNUDPA (2007) : 52/54 pays africains votent pour — mais ne légifèrent pas'},
        {year:2010, text:'Seuls RDC (2006) et Kenya (2010) inscrivent les peuples autochtones'},
      ],
      'Dis': [
        {year:1960, text:'Les premières constitutions post-indépendance inscrivent l\'anti-discrimination'},
        {year:1990, text:'La vague démocratique entraîne une adoption quasi universelle (98%)'},
        {year:2010, text:'Convergence totale — aucune différence entre héritages sur cette dimension'},
      ],
      'Id': [
        {year:1990, text:'Pré-1990 : l\'identité constitutionnelle est quasi inexistante'},
        {year:2002, text:'L\'identité émerge dans les constitutions de 3e génération post-UA'},
        {year:2010, text:'L\'écart se creuse : les anglophones reconnaissent, les francophones restent silencieux'},
      ],
      'Dau': [
        {year:1990, text:'L\'autonomie reste rare — seules les fédérations la prévoient'},
        {year:1995, text:'Éthiopie (1995) : autonomie régionale maximale (nations, nationalités, peuples)'},
        {year:2010, text:'RDC (2006) et Kenya (2010) inscrivent l\'autonomie post-conflit'},
      ],
      'PJ': [
        {year:1990, text:'Le pluralisme juridique distingue nettement anglophones et francophones'},
        {year:1996, text:'Af. du Sud (1996) : reconnaissance du droit coutumier dans la Constitution'},
        {year:2010, text:'Les lusophones (Angola 2010, Mozambique 2004) rejoignent les anglophones'},
      ],
    },

    // Disputed tooltips
    disputed_sahraouie_title: "République sahraouie (RASD)",
    disputed_sahraouie_desc: "Territoire disputé — membre de l'UA depuis 1984.<br>Pas de constitution. Non inclus dans l'analyse.",
    disputed_somaliland_title: "Somaliland",
    disputed_somaliland_desc: "Territoire autoproclamé indépendant depuis 1991.<br>Non reconnu internationalement. Pas de constitution dans le dataset.",

    // Error
    error_prefix: "Erreur",

    // Lang toggle
    lang_toggle: "EN",
  },
  en: {
    // Header
    site_title: "African Constitutions",
    site_lead: "From nation-building to identity pluralism — how 54 African countries recognize or erase ethnocultural diversity in their constitutions",

    // Tab names
    tab_carte: "Map",
    tab_matrice: "Matrix",
    tab_heritage: "Heritage",
    tab_traites: "Treaties",
    tab_conflit: "Post-conflict",
    tab_textes: "Texts",
    tab_clusters: "Clusters",
    tab_figures: "Figures",

    // Carte tab
    carte_title: "Map of constitutional recognition",
    carte_sub: "Each country is colored by the average score of the selected dimensions for the chosen year. Click a country to explore its constitutional history. <b>Shift+click</b> dimensions to select several.",
    carte_year: "Year",
    carte_animate: "Animate",
    carte_dims: "Dimensions (multi-select)",
    carte_mode: "Display mode",
    mode_score: "Score only",
    mode_combined: "Combined",
    mode_heritage: "Heritage only",
    pc_overlay: "Post-conflict overlay",
    carte_loading: "Loading map...",
    carte_reset: "↺ Reset view",
    carte_colonial: "Colonial territory",
    carte_disputed: "Disputed territory",
    bio_close: "Close",

    // Matrice tab
    matrice_title: "Comparative matrix — 54 countries × 10 dimensions",
    matrice_sub: "Latest constitution in force per country. Click a column header to sort. Click a country name to open its profile.",
    matrice_x: "X = absent",
    matrice_p: "P = partial recognition",
    matrice_v: "V = fully recognized",
    filter_all: "All",
    filter_postconflict: "Post-conflict",
    filter_nonconflict: "Non-conflict",
    conflit_filter_label: "Conflict",
    filter_peace: "Peace",
    filter_auth: "Authoritarian",

    // Heritage tab
    heritage_title: "Divergence by colonial heritage",
    heritage_sub: "Average recognition score by legal tradition (1960–2026). Hover for exact values by heritage.",
    heritage_explain: "Francophone Africa inherits the French Jacobin tradition — unitary state, indivisible, single language. Anglophone Africa inherits British Common Law — pluralism, recognition of collective rights. Lusophone Africa shows a distinct profile, mixing socialist influences and indigenous aspirations.<br><br><strong>Key result</strong>: the francophone-anglophone gap <em>widened</em> after 1990, from 2.4 to 4.7 points. The democratization wave brought decentralization and linguistic recognition, but not deep identity recognition (minority rights, indigenous peoples). η² = 22.3% (n = 42 franco + anglo).",
    heritage_franco: "Francophone (23 countries)",
    heritage_anglo: "Anglophone (19 countries)",
    heritage_luso: "Lusophone (5 countries)",

    // Traites tab
    traites_title: "Ratification does not mean recognition",
    traites_sub: "This chart compares two measures for each country: its international commitments (number of treaties ratified out of 6) and the reality of its constitution (total score of 10 dimensions out of 20). The correlation is null (ρ = −0.06, p = 0.68) — ratifying treaties does not predict constitutional recognition.",
    traites_explain: "<strong>Horizontal axis</strong> = number of ratified international treaties (UNDRIP, ICCPR, ICESCR, ICERD, ILO 169, ACHPR).<br><strong>Vertical axis</strong> = total constitutional score (sum of 10 dimensions, 0 = all absent, 20 = all recognized).<br><strong>Horizontal line</strong> = column mean score. The flat line confirms the absence of correlation.<br><strong>Color</strong>: colonial heritage. <strong>Filters</strong>: use the buttons below to isolate a heritage or context type.<br><strong>Striking finding</strong>: almost all countries ratified the ACHPR (53/54) and UNDRIP (52/54), but only one (CAR) ratified ILO Convention 169 on indigenous peoples — international regimes do not predict constitutional reality.",

    // Post-conflit tab
    conflit_title: "The post-conflict constitutional moment",
    conflit_sub: "Constitutions adopted through a peace process or post-war transition recognize significantly more ethnocultural diversity.",
    conflit_method_result_thesis: "<strong>Variable</strong>: was the <em>current constitution</em> adopted through a peace process, post-war transition, or post-liberation state-building? 13/54 constitutions coded as post-conflict.<br><strong>Result</strong>: among the 42 francophone and anglophone countries, post-conflict constitutions score 14.1/20 vs 7.5 (p = 0.0001). Heritage alone explains 22.3% of variance; heritage + post-conflict explains 63.2%. The effect concentrates on identity dimensions (Dpa, Dau, Drc, Drm: p &lt; 0.001).<br><strong>Thesis implication</strong>: recognition of sub-state peoples is driven by political necessity (the functional criterion), not by inherited legal tradition alone.",
    conflit_read: "<strong>How to read this chart?</strong> Each bar represents the average score of a group of countries. The group is defined by two variables: colonial heritage (francophone or anglophone) and the context of the current constitution (post-conflict or not). If heritage were the only factor, the two blue bars would be at the same level. The gap between 'conflict' and 'non-conflict' <em>within the same heritage</em> shows that the constitution's drafting context matters as much as, if not more than, the inherited legal tradition.",

    // Textes tab
    textes_title: "What the constitutions say",
    textes_sub: "Textual analysis of 54 constitutions (1.4 million words). We counted and classified occurrences of key legal terms to objectively measure what each constitution says — and what it silences.",
    textes_method: "<strong>Method</strong>: the 54 constitutions were downloaded in English from <em>constituteproject.org</em>, then analyzed by keyword search. For each term ('sovereignty', 'peoples', 'indivisible'...), we counted occurrences and classified their usage context.<br><strong>Limitation</strong>: only the 19 anglophone constitutions are in their original language. The other 35 are translations. Technical legal terms ('indivisible', 'self-determination') translate faithfully; common terms ('people', 'community') are more ambiguous.",
    textes_sov_title: "Sovereignty vs identity in preambles",
    textes_sov_sub: "70% of francophone constitutions contain the word 'indivisible,' vs 21% of anglophone. The Jacobin model is written into the text.",
    textes_peoples_title: "The word 'peoples': citation vs recognition",
    textes_peoples_sub: "Francophone constitutions use the word 'peoples' more often than anglophone — but 61% of occurrences are citations of the African Charter (24%) or diplomatic formulas (37%). The word 'peoples' is not translated into domestic law.",
    textes_sd_title: "Self-determination",
    textes_sd_sub: "8 out of 54 countries mention self-determination. Only Ethiopia allows secession. Preliminary keyword-based classification — requires legal validation.",
    textes_sd_sort_label: "Sort",
    textes_sd_posture: "Posture",
    textes_sd_criteria: "Criteria",
    textes_sov_n_tooltip: "{n}/{total} constitutions ({pct}%)",
    textes_peoples_mentions: "{n} mentions",
    textes_peoples_pct: "{pct}% of mentions",
    textes_sd_col_country: "Country",
    textes_sd_col_sd: "Self-det.",
    textes_sd_col_indiv: "Indivisible",
    textes_sd_col_auton: "Autonomy",
    textes_sd_col_secess: "Secession",
    textes_sd_col_posture: "Posture",
    textes_sd_posture_external: "external (secession)",
    textes_sd_posture_internal: "internal (SD + autonomy)",
    textes_sd_posture_mentioned: "mentioned",
    textes_sd_posture_autonomy_only: "autonomy without SD",
    textes_sd_posture_indivisible_only: "indivisible only",
    textes_sd_posture_tension: "indivisible + autonomy",
    textes_sd_posture_silent: "silent",
    textes_peoples_ctx_charter: "African Charter",
    textes_peoples_ctx_diplomatic: "Diplomatic formula",
    textes_peoples_ctx_indigenous: "Indigenous peoples",
    textes_peoples_ctx_self_determination: "Self-determination",
    textes_peoples_ctx_proper_noun: "Proper noun",
    textes_peoples_ctx_national: "National people",

    // Clusters tab
    clusters_title: "Constitutional clustering",
    clusters_explain: "<strong>Method</strong>: the 54 constitutions are embedded in a semantic space (voyage-law-2, 1024 dimensions) then projected to 2D (UMAP). Hierarchical clustering (Ward) on the 10 coded dimensions reveals groups that do NOT reproduce colonial heritage (ARI = 0.033).",
    clusters_umap_title: "Semantic proximity map",
    clusters_umap_sub: "Each point represents a constitution. Nearby points are textually similar. Colors indicate colonial heritage.",
    clusters_dendro_title: "Interactive hierarchical classification",
    clusters_dendro_explain: "Drag the slider from right to left. On the right, all of Africa forms one group. Moving left, constitutions that are different separate into distinct groups. The map shows which countries stay together.",
    clusters_threshold: "Threshold",
    clusters_groups: "groups",
    clusters_group: "Group",
    clusters_countries: "countries",
    btn_constitutions: "Constitutions",
    btn_preambles: "Preambles",

    // Figures tab
    figures_title: "Thesis figures",
    figures_sub: "36 figures organized by chapter. Click an image to enlarge. Download high-resolution PDF via the ⬇ button.",
    fig_download: "⬇ PDF",
    fig_method_toggle: "Learn more",
    fig_method_toggle_close: "Hide",

    // Footer
    footer_note: "Each colored cell encodes a constitutional dimension",

    // Tooltips & UI
    no_data: "No data",
    score_label: "Score",
    heritage_label: "Heritage",
    postconflict_label: "Post-conflict",
    postconflict_constitution: "Post-conflict constitution",
    total_score: "Total score",
    treaties_ratified: "Treaties ratified",
    yes: "Yes",
    no: "No",
    no_comment: "No commentary available.",
    untitled: "Untitled",
    click_segment: "Click a segment to read the full commentary",
    click_open: "Click to open profile",
    mean_score: "Mean score",
    country: "Country",
    constitutional_score: "Constitutional score",
    part_of_until: "Part of {parent} until {year}",
    colonial_territory: "Colonial territory — independence in {year}",
    texts_count: "{n} texts",

    // Legend
    legend_absent: "Absent",
    legend_partial: "Partial",
    legend_recognized: "Recognized",
    legend_explain: "<b>Hue</b> indicates colonial heritage; <b>intensity</b> indicates recognition level.",
    legend_postconflict_border: "Thick border = post-conflict constitution",

    // Heritage names
    h_francophone: "Francophone",
    h_anglophone: "Anglophone",
    h_lusophone: "Lusophone",
    h_other: "Other",
    h_mixed: "Mixed",

    // Groups
    grp_all: "All",
    grp_identity: "Identity",
    grp_institutional: "Institutional",
    grp_protections: "Protections",

    // Short dimension labels
    dim_short: { Dpa:'Indig.', F:'Fed.', Dau:'Auton.', Drc:'Cult.', Drm:'Minor.', Id:'Ident.', La:'Lang.', PJ:'Plur.', Dc:'Decen.', Dis:'Discr.' },

    // CSV headers
    csv_country: "Country",
    csv_heritage: "Heritage",
    csv_postconflict: "Post-conflict",
    csv_total: "Total score",
    csv_treaties: "Treaties ratified",

    // Scatter
    scatter_ylabel: "Total constitutional score (out of 20)",
    scatter_xlabel: "Number of ratified international treaties (out of 6)",
    scatter_stat: "Spearman ρ = −0.06 · p = 0.68 (not significant)",

    // Conflict chart
    conflict_ylabel: "Mean score (out of 20)",
    conflict_labels: ['Francophone\nnon-conflict','Francophone\npost-conflict','Anglophone\nnon-conflict','Anglophone\npost-conflict'],
    conflit_comparison_title: "Comparison by type",
    conflit_dimensions_title: "Effect by dimension",
    conflit_peace_title: "Peace process",
    conflit_auth_title: "Authoritarian transition",
    conflit_nonconflict: "Non-conflict",
    conflit_stat_count: "post-conflict constitutions",
    conflit_peace_count: "countries (peace process)",
    conflit_auth_count: "countries (authoritarian transition)",
    conflit_mean_pc: "Mean score post-conflict",
    conflit_mean_npc: "Mean score non-conflict",
    conflit_mannwhitney: "Mann-Whitney",
    conflit_eta_heritage: "η² heritage alone",
    conflit_eta_combined: "η² heritage + post-conflict",
    conflit_ref_mean: "Non-conflict mean",

    // Divergence annotations
    div_events: [['Democratization'],['AU created']],
    div_annotations: {
      'F': [
        {year:1963, text:'Nigeria (1963): first post-independence African federation'},
        {year:1990, text:'Federalism remains an anglophone specificity — Nigeria, Ethiopia, South Africa'},
        {year:1995, text:'Ethiopia (1995): ethnic federalism with secession right (art. 39)'},
      ],
      'Dc': [
        {year:1990, text:'La Baule Conference (1990): France conditions aid on democratization'},
        {year:1996, text:'Francophone constitutions massively adopt decentralization'},
        {year:2010, text:'Near-complete convergence: 93% of the continent recognizes decentralization'},
      ],
      'Drm': [
        {year:1990, text:'Democratization does NOT close the gap on minority rights'},
        {year:1996, text:'South Africa (1996): Bill of Rights with 11 official languages and minority rights'},
        {year:2010, text:'Francophone silence on minorities persists despite 20 years of democracy'},
      ],
      'La': [
        {year:1990, text:'Official multilingualism remains an anglophone marker'},
        {year:1996, text:'South Africa recognizes 11 languages; Tanzania adds Swahili and English'},
        {year:2010, text:'Francophones remain constitutionally monolingual (French = official language)'},
      ],
      'Drc': [
        {year:1990, text:'Cultural rights emerge in post-democratization constitutions'},
        {year:2002, text:'AU Charter (2002): the Maputo Protocol strengthens cultural rights'},
        {year:2010, text:'Kenya (2010) and Zimbabwe (2013) enshrine strong cultural rights'},
      ],
      'Dpa': [
        {year:1990, text:'Nearly absent: the concept of "indigenous peoples" is a Western import'},
        {year:2007, text:'UNDRIP (2007): 52/54 African countries vote for — but do not legislate'},
        {year:2010, text:'Only DRC (2006) and Kenya (2010) enshrine indigenous peoples'},
      ],
      'Dis': [
        {year:1960, text:'The first post-independence constitutions include anti-discrimination'},
        {year:1990, text:'The democratic wave leads to near-universal adoption (98%)'},
        {year:2010, text:'Total convergence — no difference between heritages on this dimension'},
      ],
      'Id': [
        {year:1990, text:'Pre-1990: constitutional identity is nearly non-existent'},
        {year:2002, text:'Identity emerges in 3rd-generation post-AU constitutions'},
        {year:2010, text:'The gap widens: anglophones recognize, francophones remain silent'},
      ],
      'Dau': [
        {year:1990, text:'Autonomy remains rare — only federations provide for it'},
        {year:1995, text:'Ethiopia (1995): maximum regional autonomy (nations, nationalities, peoples)'},
        {year:2010, text:'DRC (2006) and Kenya (2010) enshrine post-conflict autonomy'},
      ],
      'PJ': [
        {year:1990, text:'Legal pluralism sharply distinguishes anglophones from francophones'},
        {year:1996, text:'South Africa (1996): constitutional recognition of customary law'},
        {year:2010, text:'Lusophones (Angola 2010, Mozambique 2004) join the anglophones'},
      ],
    },

    // Disputed tooltips
    disputed_sahraouie_title: "Sahrawi Arab Democratic Republic (SADR)",
    disputed_sahraouie_desc: "Disputed territory — AU member since 1984.<br>No constitution. Not included in the analysis.",
    disputed_somaliland_title: "Somaliland",
    disputed_somaliland_desc: "Self-declared independent territory since 1991.<br>Not internationally recognized. No constitution in the dataset.",

    // Error
    error_prefix: "Error",

    // Lang toggle
    lang_toggle: "FR",
  }
};

let lang = 'fr';
function tr(key) { return I18N[lang][key] || I18N.fr[key] || key; }

function switchLang() {
  lang = lang === 'fr' ? 'en' : 'fr';
  document.documentElement.lang = lang;
  document.getElementById('lang-toggle').textContent = tr('lang_toggle');
  updateAllText();
  // Re-render dynamic charts that contain translatable text
  document.getElementById('div-grid').innerHTML = '';
  renderDivergence();
  document.getElementById('scatter-container').innerHTML = '';
  renderScatter();
  renderConflictTab();
  document.getElementById('figures-gallery').innerHTML = '';
  document.getElementById('figures-gallery').classList.remove('figures-gallery');
  renderFigures();
  renderHeatmap();
  renderLegend2D();
  // Re-render UMAP (tooltips use tr()) and dendrogram/clusters
  document.getElementById('umap-container').innerHTML = '';
  renderUMAP();
  document.getElementById('dendrogram-container').innerHTML = '';
  renderDendrogram();
  renderTextesTab();
  // Re-render bio if open
  if (selCountry) {
    const evs = DATA.country_timelines[selCountry];
    if (evs) renderBio(selCountry, evs);
  }
}

function updateAllText() {
  // Update all elements with data-tr attribute
  document.querySelectorAll('[data-tr]').forEach(el => {
    const key = el.dataset.tr;
    const val = tr(key);
    if (val === key) return; // key not found, skip
    if (el.dataset.trHtml !== undefined) el.innerHTML = val;
    else el.textContent = val;
  });
  // Update group buttons
  document.querySelectorAll('.grp-btn').forEach(b => {
    const gName = b.dataset.grp;
    if (gName === 'all') b.textContent = tr('grp_all');
    else if (gName) b.textContent = tr('grp_' + gName);
  });
}

// ─── Constants & Color Scales ─────────────────────────────
const COLOR_NONE = CSS.cNone;

// Heritage-keyed color gradients — V/flat from CSS, X/P are D3 interpolation
// anchors (lighter tints of each heritage hue for the 3-stop gradient)
const HERITAGE_COLORS = {
  francophone: { X: '#d5d0e8', P: '#7a82b8', V: CSS.francophone, flat: CSS.francophone },
  anglophone:  { X: '#e8d0d4', P: '#b86878', V: CSS.anglophone, flat: CSS.anglophone },
  lusophone:   { X: '#cce8dc', P: '#58a880', V: CSS.lusophone, flat: CSS.lusophone },
  other:       { X: '#dde0e4', P: '#98a0a8', V: CSS.otherH, flat: CSS.otherH },
  mixed:       { X: '#dde0e4', P: '#98a0a8', V: CSS.otherH, flat: CSS.otherH },
};

const HERITAGE_SCALES = {};
for (const [h, c] of Object.entries(HERITAGE_COLORS)) {
  HERITAGE_SCALES[h] = d3.scaleLinear()
    .domain([0, 1, 2])
    .range([c.X, c.P, c.V])
    .interpolate(d3.interpolateRgb.gamma(2.2));
}

// Single gradient for "Score seul" mode (original)
const COLOR_X = CSS.scoreX;
const COLOR_P = CSS.scoreP;
const COLOR_V = CSS.scoreV;
const mapColorScale = d3.scaleLinear()
  .domain([0, 1, 2])
  .range([COLOR_X, COLOR_P, COLOR_V])
  .interpolate(d3.interpolateRgb.gamma(2.2));

function numVal(s) { return s === 'V' ? 2 : s === 'P' ? 1 : 0; }

const HC = { francophone:CSS.francophone, anglophone:CSS.anglophone, lusophone:CSS.lusophone, other:CSS.otherH, mixed:CSS.otherH };
function HL(h) {
  const map = { all:'filter_all', francophone:'h_francophone', anglophone:'h_anglophone', lusophone:'h_lusophone', other:'h_other', mixed:'h_mixed' };
  return tr(map[h] || 'h_other');
}
function HM_SHORT(dim) { return tr('dim_short')[dim] || dim; }

// ─── State ─────────────────────────────────────────────────
let selDims = new Set(DATA.features);
let selYear = 2026;
let selCountry = null;
let mapMode = 'score'; // 'score' | 'combined' | 'heritage'
let pcOverlay = false;
let geoData = null;
let isoToGeo = {};
let playInt = null;
let hmSort = { col: '_total', dir: -1 };
let hmHeritageFilter = 'all';
let hmConflictFilter = 'all';
const scatterActiveHeritage = new Set(['francophone','anglophone','lusophone','other']);
const scatterActiveConflict = new Set(['peace','authoritarian','non-conflict']);

const GROUPS = {
  'identity': ['Drm','La','Drc','Id'],
  'institutional': ['F','Dc','Dau','PJ'],
  'protections': ['Dpa','Dis'],
};
function groupLabel(key) {
  const map = { identity:'grp_identity', institutional:'grp_institutional', protections:'grp_protections' };
  return tr(map[key] || key);
}

// ─── Utility ───────────────────────────────────────────────
function getState(c, y) {
  const evs = DATA.country_timelines[c];
  if (!evs) return null;
  let last = null;
  for (const e of evs) { if (e.year !== null && e.year <= y) last = e; }
  return last;
}

function compScore(st) {
  if (!st || selDims.size === 0) return null;
  let s = 0;
  for (const d of selDims) s += numVal(st.features[d]);
  return s / selDims.size;
}

function fillFor(sc, heritage) {
  if (sc === null) return COLOR_NONE;
  const h = heritage || 'other';
  if (mapMode === 'score') return mapColorScale(sc);
  if (mapMode === 'heritage') return HERITAGE_COLORS[h] ? HERITAGE_COLORS[h].flat : HERITAGE_COLORS.other.flat;
  // combined mode
  return (HERITAGE_SCALES[h] || HERITAGE_SCALES.other)(sc);
}

// Backward-compatible wrapper for bio timeline (always uses single gradient)
function fillForScore(sc) { return sc === null ? COLOR_NONE : mapColorScale(sc); }

// ─── Scale bar ─────────────────────────────────────────────
function renderScale() {
  renderLegend2D();
}

function renderLegend2D() {
  const cont = document.getElementById('legend-2d');
  renderCombinedLegend(cont);
  // If post-conflict overlay is active, show border note
  if (pcOverlay) {
    cont.innerHTML += '<div style="font-size:0.65rem;color:var(--muted);margin-top:0.4rem;display:flex;align-items:center;gap:0.35rem">'
      + '<svg width="28" height="14"><rect x="1" y="1" width="26" height="12" fill="none" stroke="#333" stroke-width="2.5" stroke-dasharray="5,2.5" rx="2"/></svg>'
      + ` ${tr('legend_postconflict_border')}</div>`;
  }
}

function renderCombinedLegend(cont) {
  const heritages = ['francophone','anglophone','lusophone','other','mixed'];
  const scores = ['X','P','V'];
  const scoreLabels = { X:tr('legend_absent'), P:tr('legend_partial'), V:tr('legend_recognized') };
  const hLabels = { francophone:tr('h_francophone'), anglophone:tr('h_anglophone'), lusophone:tr('h_lusophone'), other:tr('h_other'), mixed:tr('h_mixed') };

  let html = `<div class="legend-explain">${tr('legend_explain')}</div>`;
  html += '<div class="legend-grid">';
  html += '<div></div>';
  scores.forEach(s => { html += `<div class="lg-header">${scoreLabels[s]}</div>`; });
  heritages.forEach(h => {
    const dotColor = HC[h];
    html += `<div class="lg-row-label"><span class="lg-dot" style="background:${dotColor}"></span>${hLabels[h]}</div>`;
    scores.forEach(s => {
      const color = HERITAGE_COLORS[h][s];
      html += `<div class="lg-swatch" style="background:${color}" title="${hLabels[h]} \u2014 ${scoreLabels[s]}"></div>`;
    });
  });
  html += '</div>';
  cont.innerHTML = html;
}


// ─── Dim buttons ───────────────────────────────────────────
function buildDimBtns() {
  const cont = document.getElementById('dim-buttons');
  const grpC = document.getElementById('grp-buttons');

  Object.entries(GROUPS).forEach(([key, ds]) => {
    const b = document.createElement('button');
    b.className = 'grp-btn'; b.dataset.grp = key; b.textContent = groupLabel(key);
    b.title = ds.map(d => DATA.feature_labels[d]).join(', ');
    b.addEventListener('click', () => {
      const all = ds.every(d => selDims.has(d));
      if (all) ds.forEach(d => selDims.delete(d));
      else ds.forEach(d => selDims.add(d));
      if (selDims.size === 0) selDims.add('Drm');
      syncDims(); updateMap();
    });
    grpC.appendChild(b);
  });

  const aBtn = document.createElement('button');
  aBtn.className = 'grp-btn'; aBtn.dataset.grp = 'all'; aBtn.textContent = tr('grp_all');
  aBtn.addEventListener('click', () => {
    DATA.features.forEach(d => selDims.add(d));
    syncDims(); updateMap();
  });
  grpC.appendChild(aBtn);

  DATA.features.forEach(f => {
    const b = document.createElement('button');
    b.className = 'dim-btn'; b.dataset.dim = f;
    b.innerHTML = `<span class="cb"></span>${DATA.feature_labels[f]}`;
    b.addEventListener('click', e => {
      if (e.shiftKey || e.ctrlKey || e.metaKey) {
        if (selDims.has(f)) {
          if (selDims.size > 1) selDims.delete(f);
          else { b.classList.add('shake'); setTimeout(() => b.classList.remove('shake'), 400); return; }
        } else selDims.add(f);
      } else {
        selDims.clear(); selDims.add(f);
      }
      syncDims(); updateMap();
    });
    cont.appendChild(b);
  });
  syncDims();
}

function syncDims() {
  document.querySelectorAll('.dim-btn').forEach(b => {
    const d = b.dataset.dim;
    b.classList.toggle('active', selDims.has(d));
    b.querySelector('.cb').textContent = selDims.has(d) ? '✓' : '';
  });
  document.querySelectorAll('.grp-btn').forEach(b => {
    const key = b.dataset.grp;
    if (key === 'all') b.classList.toggle('active', selDims.size === DATA.features.length);
    else if (GROUPS[key]) b.classList.toggle('active', GROUPS[key].every(d => selDims.has(d)));
  });
}

// ─── Mode switch ──────────────────────────────────────────
function buildModeSwitch() {
  document.querySelectorAll('#mode-switch .mode-btn').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('#mode-switch .mode-btn').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      mapMode = b.dataset.mode;
      updateMap();
    });
  });
  // Post-conflict overlay checkbox
  const pcCb = document.getElementById('pc-overlay');
  if (pcCb) {
    pcCb.addEventListener('change', () => {
      pcOverlay = pcCb.checked;
      resetStrokes();
      renderLegend2D();
    });
  }
}

function resetStrokes() {
  d3.selectAll('.country-path').each(function(d) {
    const el = d3.select(this);
    if (el.classed('selected')) return;
    if (pcOverlay && DATA.post_conflict && DATA.post_conflict[d.name]) {
      el.attr('stroke', '#333').attr('stroke-width', 3).attr('stroke-dasharray', '6,3');
    } else {
      el.attr('stroke', CSS.strokeDefault).attr('stroke-width', 0.4).attr('stroke-dasharray', null);
    }
  });
  // Island markers with post-conflict overlay
  d3.selectAll('circle.island-marker').each(function(d) {
    if (pcOverlay && DATA.post_conflict && DATA.post_conflict[d.name]) {
      d3.select(this).attr('stroke', '#333').attr('stroke-width', 3).attr('stroke-dasharray', '6,3');
    } else {
      d3.select(this).attr('stroke', 'white').attr('stroke-width', 1.5).attr('stroke-dasharray', null);
    }
  });
}

// ─── Map ───────────────────────────────────────────────────
async function initMap() {
  const r = await fetch('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson');
  const w = await r.json();
  geoData = { type:'FeatureCollection', features: w.features.filter(f => f.properties.CONTINENT === 'Africa') };

  geoData.features.forEach(f => {
    isoToGeo[f.properties.ISO_A3] = f;
    if (f.properties.ISO_A3_EH) isoToGeo[f.properties.ISO_A3_EH] = f;
    if (f.properties.ISO_A3 === '-99' && f.properties.ADM0_A3) isoToGeo[f.properties.ADM0_A3] = f;
  });

  document.getElementById('loading').style.display = 'none';
  document.getElementById('map-svg').style.display = 'block';
  renderMap();
}

function renderMap() {
  const cont = document.getElementById('map-container');
  const W = cont.clientWidth, H = 540;
  const svg = d3.select('#map-svg').attr('viewBox', `0 0 ${W} ${H}`);
  svg.selectAll('*').remove();

  // Hatched pattern for pre-independence countries
  const defs = svg.append('defs');
  const pat = defs.append('pattern')
    .attr('id', 'hatch-colonial')
    .attr('width', 6).attr('height', 6)
    .attr('patternUnits', 'userSpaceOnUse')
    .attr('patternTransform', 'rotate(45)');
  pat.append('rect').attr('width', 6).attr('height', 6).attr('fill', CSS.hatchBg);
  pat.append('line').attr('x1', 0).attr('y1', 0).attr('x2', 0).attr('y2', 6)
    .attr('stroke', CSS.hatchStroke).attr('stroke-width', 1.5);

  // Cross-hatch pattern for disputed territories (République sahraouie)
  const patD = defs.append('pattern')
    .attr('id', 'hatch-disputed')
    .attr('width', 6).attr('height', 6)
    .attr('patternUnits', 'userSpaceOnUse');
  patD.append('rect').attr('width', 6).attr('height', 6).attr('fill', '#e8e4dd');
  patD.append('line').attr('x1', 0).attr('y1', 0).attr('x2', 6).attr('y2', 6)
    .attr('stroke', '#c0b8a8').attr('stroke-width', 0.8);
  patD.append('line').attr('x1', 6).attr('y1', 0).attr('x2', 0).attr('y2', 6)
    .attr('stroke', '#c0b8a8').attr('stroke-width', 0.8);

  const proj = d3.geoMercator().center([20, 2]).scale(Math.min(W, H) * 0.62).translate([W/2, H/2]);
  const path = d3.geoPath().projection(proj);
  const g = svg.append('g');

  // Zoom + pan
  const resetBtn = document.getElementById('zoom-reset');
  const zoom = d3.zoom()
    .scaleExtent([1, 8])
    .on('zoom', (ev) => {
      g.attr('transform', ev.transform);
      g.attr('transform', ev.transform);
    });
  svg.call(zoom);
  svg.on('dblclick.zoom', null);
  if (resetBtn) resetBtn.addEventListener('click', () => svg.transition().duration(500).call(zoom.transform, d3.zoomIdentity));

  // Background (non-African or non-data countries)
  const dataIsos = new Set(Object.values(DATA.name_to_iso));
  dataIsos.add('SOL'); // Somaliland → part of Somalia
  g.selectAll('path.bg').data(geoData.features.filter(f => !dataIsos.has(f.properties.ISO_A3) && !dataIsos.has(f.properties.ADM0_A3)))
    .join('path').attr('d', d => path(d)).attr('fill', CSS.hatchBg).attr('stroke', CSS.strokeDefault).attr('stroke-width', 0.3);

  // Data countries
  const cPaths = [];
  for (const [name, iso] of Object.entries(DATA.name_to_iso)) {
    const geo = isoToGeo[iso];
    if (geo) cPaths.push({ name, iso, geo });
  }
  // Somaliland (SOL) → disputed territory
  if (isoToGeo['SOL']) cPaths.push({ name: 'Somaliland', iso: 'SOL', geo: isoToGeo['SOL'] });

  // Island nation markers — rendered BEFORE country paths so islands sit on top
  const islandData = [
    { name: 'Cap-Vert', lon: -23.64, lat: 15.07 },
    { name: 'Sao Tomé-et-Príncipe', lon: 7.02, lat: 0.97 },
    { name: 'Comores', lon: 43.32, lat: -11.73 },
    { name: 'Maurice', lon: 57.57, lat: -20.30 },
    { name: 'Seychelles', lon: 55.48, lat: -4.68 },
  ].map(d => ({ ...d, projected: proj([d.lon, d.lat]) }))
   .filter(d => d.projected);

  g.selectAll('circle.island-marker').data(islandData).join('circle')
    .attr('class', 'island-marker')
    .attr('cx', d => d.projected[0])
    .attr('cy', d => d.projected[1])
    .attr('r', 12)
    .attr('stroke', 'white')
    .attr('stroke-width', 1.5)
    .style('cursor', 'pointer')
    .on('mouseenter', function(ev, d) { d3.select(this).attr('r', 15); onHover.call(this, ev, d); })
    .on('mousemove', onMove)
    .on('mouseleave', function(ev, d) { d3.select(this).attr('r', 12); onLeave.call(this, ev, d); })
    .on('click', function(ev, d) { onClick.call(this, ev, d); });

  // Country paths — rendered on top so island shapes are visible over the circles
  g.selectAll('path.country-path').data(cPaths, d => d.iso).join('path')
    .attr('class', 'country-path')
    .attr('d', d => path(d.geo))
    .attr('data-country', d => d.name)
    .on('mouseenter', onHover).on('mousemove', onMove).on('mouseleave', onLeave).on('click', onClick);

  updateMap();
}

function isIndependent(country, year) {
  const indepYear = DATA.independence_dates && DATA.independence_dates[country];
  if (!indepYear) return true; // assume independent if no data
  return year >= indepYear;
}

function isSplitYet(country, year) {
  // For border-split countries (Eritrea, South Sudan): before split, they don't exist as separate entities
  const split = DATA.border_splits && DATA.border_splits[country];
  if (!split) return true; // not a split country
  return year >= split.split_year;
}

function getParentCountry(country) {
  const split = DATA.border_splits && DATA.border_splits[country];
  return split ? split.parent : null;
}

function updateMap() {
  d3.selectAll('.country-path').each(function(d) {
    const el = d3.select(this);
    const indep = isIndependent(d.name, selYear);
    const splitOk = isSplitYet(d.name, selYear);
    const h = DATA.colonial_heritage[d.name] || 'other';

    // Disputed territories (no constitution)
    if (d.name === 'République sahraouie' || d.name === 'Somaliland') {
      el.attr('fill', 'url(#hatch-disputed)');
      return;
    }

    if (!splitOk) {
      // Before split: show parent's color with no visible border
      const parent = getParentCountry(d.name);
      if (parent) {
        const pH = DATA.colonial_heritage[parent] || 'other';
        const pState = getState(parent, selYear);
        const pScore = compScore(pState);
        const parentIndep = isIndependent(parent, selYear);
        const parentFill = parentIndep ? fillFor(pScore, pH) : 'url(#hatch-colonial)';
        el.attr('fill', parentFill);
        el.attr('stroke', parentIndep ? fillFor(pScore, pH) : CSS.hatchBg).attr('stroke-width', 0.8);
      }
    } else if (!indep) {
      el.attr('fill', 'url(#hatch-colonial)');
    } else {
      const st = getState(d.name, selYear);
      el.attr('fill', fillFor(compScore(st), h));
    }
  });

  // Update island marker colors
  d3.selectAll('circle.island-marker').each(function(d) {
    const h = DATA.colonial_heritage[d.name] || 'other';
    const st = getState(d.name, selYear);
    d3.select(this).attr('fill', fillFor(compScore(st), h));
  });

  resetStrokes();
  renderLegend2D();
}

// ─── Tooltip ───────────────────────────────────────────────
const tooltip = document.getElementById('tooltip');

function onHover(ev, d) {
  // Disputed territories — special tooltip
  const disputedKeys = {
    'République sahraouie': ['disputed_sahraouie_title', 'disputed_sahraouie_desc'],
    'Somaliland': ['disputed_somaliland_title', 'disputed_somaliland_desc'],
  };
  if (disputedKeys[d.name]) {
    const [tKey, dKey] = disputedKeys[d.name];
    const tt = document.getElementById('tooltip');
    tt.innerHTML = `<div class="tt-name">${tr(tKey)}</div><div style="font-size:0.75rem;color:${CSS.dim}">${tr(dKey)}</div>`;
    tt.style.opacity = '1';
    tt.style.left = (ev.clientX + 14) + 'px';
    tt.style.top = (ev.clientY - 10) + 'px';
    return;
  }

  const indep = isIndependent(d.name, selYear);
  const splitOk = isSplitYet(d.name, selYear);

  let statusLine = '';
  if (!splitOk) {
    const parent = getParentCountry(d.name);
    const splitInfo = DATA.border_splits[d.name];
    if (splitInfo) {
      statusLine = `<div style="font-size:0.72rem;color:${CSS.pillCp};margin-bottom:0.2rem">${tr('part_of_until').replace('{parent}', parent).replace('{year}', splitInfo.split_year)}</div>`;
    }
  } else if (!indep) {
    const indepY = DATA.independence_dates[d.name];
    statusLine = `<div style="font-size:0.72rem;color:${CSS.pillCp};margin-bottom:0.2rem">${tr('colonial_territory').replace('{year}', indepY)}</div>`;
  }

  const st = getState(d.name, selYear);
  const sc = compScore(st);
  const h = DATA.colonial_heritage[d.name] || 'other';
  const hLabel = HL(h);

  let pills = '';
  if (st && indep && splitOk) {
    pills = '<div class="tt-pills">' + DATA.features.map(f => {
      const v = st.features[f];
      const act = selDims.has(f);
      const bg = v==='V'?CSS.pillBgV:v==='P'?CSS.pillBgP:CSS.pillBgX;
      const c = v==='V'?CSS.pillCv:v==='P'?CSS.pillCp:CSS.pillCx;
      const brd = act ? `border:1px solid ${c};` : 'border:1px solid transparent;';
      return `<span class="tt-pill" style="background:${bg};color:${c};${brd}">${DATA.feature_labels[f]}: ${v}</span>`;
    }).join('') + '</div>';
  }

  // Post-conflict label when overlay is active
  let pcLine = '';
  if (pcOverlay && DATA.post_conflict && DATA.post_conflict[d.name]) {
    pcLine = `<div style="font-size:0.72rem;color:#555;margin-bottom:0.15rem;font-weight:600">${tr('postconflict_constitution')}</div>`;
  }

  tooltip.innerHTML =
    `<div class="tt-name">${d.name}</div>` +
    `<div style="font-size:0.72rem;color:${HC[h]};margin-bottom:0.15rem">${hLabel}</div>` +
    statusLine +
    pcLine +
    (indep && splitOk
      ? `<div class="tt-score"><div class="tt-swatch" style="background:${fillFor(sc, h)}"></div>${sc !== null ? `${tr('score_label')} : ${sc.toFixed(2)}/2 (${selDims.size} dim.)` : tr('no_data')}</div>` +
        (st ? `<div class="tt-const">${st.name} (${st.date_raw||st.year||'?'})</div>` : '')
      : '') +
    pills;
  tooltip.style.opacity = '1';
}

function onMove(ev) {
  tooltip.style.left = Math.min(ev.clientX + 14, window.innerWidth - 420) + 'px';
  tooltip.style.top = (ev.clientY - 10) + 'px';
}

function onLeave() { tooltip.style.opacity = '0'; }

// ─── Country click / Bio ───────────────────────────────────
function onClick(ev, d) {
  d3.selectAll('.country-path').classed('selected', false);
  resetStrokes();
  d3.select(this).classed('selected', true).attr('stroke', CSS.text).attr('stroke-width', 1.8);
  selCountry = d.name;
  openBio(d.name);
}

function openBio(c) {
  const p = document.getElementById('bio-panel');
  p.classList.add('open');
  document.getElementById('bio-country-name').textContent = c;
  const evs = DATA.country_timelines[c];
  const h = DATA.colonial_heritage[c] || 'other';
  const reg = DATA.country_region[c] || '';
  document.getElementById('bio-meta').innerHTML =
    `<span style="color:${HC[h]||HC.other}">${HL(h)}</span><span>${reg}</span><span>${tr('texts_count').replace('{n}', evs.length)}</span>`;
  document.getElementById('commentary-pane').classList.remove('open');
  document.getElementById('commentary-pane').innerHTML = '';
  renderBio(c, evs);
  p.scrollIntoView({ behavior:'smooth', block:'nearest' });
}

function closeBio() {
  document.getElementById('bio-panel').classList.remove('open');
  document.getElementById('commentary-pane').classList.remove('open');
  d3.selectAll('.country-path').classed('selected', false);
  resetStrokes();
  selCountry = null;
}

function showCommentary(ev) {
  const pane = document.getElementById('commentary-pane');
  const pills = DATA.features.map(f => {
    const v = ev.features[f];
    const bg = v==='V'?CSS.pillBgV:v==='P'?CSS.pillBgP:CSS.pillBgX;
    const c = v==='V'?CSS.pillCv:v==='P'?CSS.pillCp:CSS.pillCx;
    return `<span class="tt-pill" style="background:${bg};color:${c};padding:0.12rem 0.4rem;font-size:0.72rem">${DATA.feature_labels[f]}: ${v}</span>`;
  }).join('');

  pane.innerHTML =
    `<div class="cp-title">${ev.name || tr('untitled')}</div>` +
    `<div class="cp-date">${ev.date_raw || ev.year || ''}</div>` +
    `<div class="cp-pills">${pills}</div>` +
    `<div class="cp-text">${ev.comment || '<em>' + tr('no_comment') + '</em>'}</div>`;
  pane.classList.add('open');
  pane.scrollIntoView({ behavior:'smooth', block:'nearest' });
}

function renderBio(country, events) {
  const evY = events.filter(e => e.year !== null);
  if (!evY.length) return;
  const minY = Math.min(...evY.map(e => e.year));
  const maxY = Math.max(2026, Math.max(...evY.map(e => e.year)));

  const m = { top:28, right:18, bottom:32, left:150 };
  const lH = 19, lG = 2, nL = DATA.features.length;
  const iH = nL * (lH + lG);
  const W = Math.max(680, (maxY - minY) * 12);
  const H = iH + m.top + m.bottom;

  const svg = d3.select('#bio-timeline-svg').attr('width', W + m.left + m.right).attr('height', H);
  svg.selectAll('*').remove();
  const g = svg.append('g').attr('transform', `translate(${m.left},${m.top})`);

  const x = d3.scaleLinear().domain([minY, maxY]).range([0, W]);

  g.append('g').attr('transform', `translate(0,${iH+3})`)
    .call(d3.axisBottom(x).tickFormat(d => String(d)).ticks(Math.min(14, maxY-minY)))
    .selectAll('text').attr('fill',CSS.muted).attr('font-size','9.5px');
  g.selectAll('.domain, .tick line').attr('stroke',CSS.border);

  DATA.features.forEach((f, i) => {
    const y = i * (lH + lG);
    g.append('text').attr('x', -5).attr('y', y + lH/2 + 3.5)
      .attr('text-anchor','end')
      .attr('fill', selDims.has(f) ? CSS.text : CSS.dim)
      .attr('font-size','10px')
      .attr('font-weight', selDims.has(f) ? '600' : '400')
      .text(DATA.feature_labels[f]);
  });

  for (let fi = 0; fi < DATA.features.length; fi++) {
    const feat = DATA.features[fi];
    const y = fi * (lH + lG);
    const isSel = selDims.has(feat);

    for (let ei = 0; ei < evY.length; ei++) {
      const ev = evY[ei];
      const nextY = ei < evY.length - 1 ? evY[ei+1].year : maxY;
      const color = fillForScore(numVal(ev.features[feat]));

      g.append('rect')
        .attr('x', x(ev.year)).attr('y', y)
        .attr('width', Math.max(1, x(nextY) - x(ev.year)))
        .attr('height', lH).attr('fill', color).attr('rx', 2)
        .attr('opacity', isSel ? 0.9 : 0.35)
        .style('cursor','pointer')
        .on('click', function() { showCommentary(ev); })
        .on('mouseenter', function() {
          d3.select(this).attr('opacity', 1).attr('stroke',CSS.text).attr('stroke-width', 1);
        })
        .on('mouseleave', function() {
          d3.select(this).attr('opacity', isSel ? 0.9 : 0.35).attr('stroke','none');
        });
    }
  }

  // Event markers
  evY.forEach(ev => {
    g.append('line')
      .attr('x1', x(ev.year)).attr('x2', x(ev.year))
      .attr('y1', -3).attr('y2', iH)
      .attr('stroke', ev.has_feature_data ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.05)')
      .attr('stroke-width', ev.has_feature_data ? 0.7 : 0.3)
      .attr('stroke-dasharray', ev.has_feature_data ? 'none' : '2,3')
      .attr('pointer-events', 'none');
  });

  // Instruction
  g.append('text').attr('x', W/2).attr('y', iH + 26)
    .attr('text-anchor','middle').attr('fill',CSS.dim).attr('font-size','9px')
    .text(tr('click_segment'));
}

// ─── Slider ────────────────────────────────────────────────
function initSlider() {
  const sl = document.getElementById('year-slider');
  const disp = document.getElementById('year-display');
  sl.addEventListener('input', () => {
    selYear = parseInt(sl.value);
    disp.textContent = selYear;
    updateMap();
  });
  document.getElementById('play-btn').addEventListener('click', togglePlay);
}

function togglePlay() {
  const btn = document.getElementById('play-btn');
  const sl = document.getElementById('year-slider');
  const disp = document.getElementById('year-display');
  if (playInt) { clearInterval(playInt); playInt = null; btn.classList.remove('playing'); btn.innerHTML = '&#9654;'; return; }
  if (selYear >= 2026) { selYear = 1930; sl.value = 1930; disp.textContent = '1930'; updateMap(); }
  btn.classList.add('playing'); btn.innerHTML = '&#9646;&#9646;';
  playInt = setInterval(() => {
    selYear++;
    if (selYear > 2026) { clearInterval(playInt); playInt = null; btn.classList.remove('playing'); btn.innerHTML = '&#9654;'; return; }
    sl.value = selYear; disp.textContent = selYear; updateMap();
  }, 120);
}

// ─── Heatmap Table ─────────────────────────────────────────
function renderHeatmap() {
  const tbl = document.getElementById('heatmap-table');
  const feats = DATA.features;

  // Build data
  let rows = DATA.feature_matrix.map(r => {
    const total = feats.reduce((s, f) => s + r[f], 0);
    const pc = DATA.post_conflict && DATA.post_conflict[r.PAYS] || false;
    return { ...r, _total: total, _heritage: DATA.colonial_heritage[r.PAYS] || 'other', _postConflict: pc };
  });

  // Filter — heritage and conflict are independent (intersection)
  if (hmHeritageFilter !== 'all') rows = rows.filter(r => r._heritage === hmHeritageFilter);
  if (hmConflictFilter === 'peace') rows = rows.filter(r => DATA.post_conflict_type[r.PAYS] === 'peace');
  else if (hmConflictFilter === 'authoritarian') rows = rows.filter(r => DATA.post_conflict_type[r.PAYS] === 'authoritarian');
  else if (hmConflictFilter === 'non-conflict') rows = rows.filter(r => !DATA.post_conflict[r.PAYS]);

  // Sort
  rows.sort((a, b) => {
    const va = hmSort.col === '_total' ? a._total : a[hmSort.col];
    const vb = hmSort.col === '_total' ? b._total : b[hmSort.col];
    return (vb - va) * hmSort.dir;
  });

  // Fixed column widths to prevent layout shift on filtering
  let html = '<colgroup><col style="width:180px">';
  feats.forEach(() => { html += '<col style="width:55px">'; });
  html += '<col style="width:60px"></colgroup>';
  html += `<thead><tr><th>${tr('country')}</th>`;
  feats.forEach(f => {
    const sorted = hmSort.col === f ? ' sorted' : '';
    html += `<th class="${sorted}" data-col="${f}" title="${DATA.feature_labels[f]}">${HM_SHORT(f)}</th>`;
  });
  html += `<th class="${hmSort.col === '_total' ? 'sorted' : ''}" data-col="_total" title="${tr('total_score')}">Total</th>`;
  html += '</tr></thead><tbody>';

  rows.forEach(r => {
    const hDot = `<span class="hm-heritage-dot" style="background:${HC[r._heritage]||HC.other}"></span>`;
    html += `<tr><td data-country="${r.PAYS}">${hDot}${r.PAYS}</td>`;
    feats.forEach(f => {
      const v = r[f + '_label'];
      const bg = v==='V'?CSS.pillBgV:v==='P'?CSS.pillBgP:CSS.pillBgX;
      const c = v==='V'?CSS.pillCv:v==='P'?CSS.pillCp:CSS.pillCx;
      html += `<td style="background:${bg};color:${c}">${v}</td>`;
    });
    html += `<td>${r._total}/20</td></tr>`;
  });

  html += '</tbody>';
  tbl.innerHTML = html;

  // Sort click handlers
  tbl.querySelectorAll('th[data-col]').forEach(th => {
    th.addEventListener('click', () => {
      const col = th.dataset.col;
      if (hmSort.col === col) hmSort.dir *= -1;
      else { hmSort.col = col; hmSort.dir = -1; }
      renderHeatmap();
    });
  });

  // Country click
  tbl.querySelectorAll('td[data-country]').forEach(td => {
    td.addEventListener('click', () => {
      const c = td.dataset.country;
      openBio(c);
      document.getElementById('bio-panel').scrollIntoView({ behavior:'smooth' });
    });
  });
}

function initHeatmapFilters() {
  // Heritage filter group
  document.querySelectorAll('.hm-btn[data-hf]').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.hm-btn[data-hf]').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      hmHeritageFilter = b.dataset.hf;
      renderHeatmap();
    });
  });
  // Conflict filter group
  document.querySelectorAll('.hm-btn[data-cf]').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.hm-btn[data-cf]').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      hmConflictFilter = b.dataset.cf;
      renderHeatmap();
    });
  });
}

// ─── Divergence Charts ─────────────────────────────────────
function renderDivergence() {
  const grid = document.getElementById('div-grid');
  const hC = { francophone:CSS.francophone, anglophone:CSS.anglophone, lusophone:CSS.lusophone };
  const divTT = document.getElementById('div-tooltip');

  const divAnnotations = tr('div_annotations');

  DATA.features.forEach(feat => {
    const div = document.createElement('div');
    div.className = 'div-chart';
    div.innerHTML = `<div class="dc-title">${DATA.feature_labels[feat]}</div>`;
    grid.appendChild(div);

    const M = { top:6, right:12, bottom:24, left:32 };
    const w = 480, h = 170;

    const svg = d3.select(div).append('svg')
      .attr('viewBox', `0 0 ${w+M.left+M.right} ${h+M.top+M.bottom}`)
      .style('width','100%');

    const g = svg.append('g').attr('transform', `translate(${M.left},${M.top})`);

    const xS = d3.scaleLinear().domain([1960,2026]).range([0,w]);
    const yS = d3.scaleLinear().domain([0,2]).range([h,0]);

    // Axes
    g.append('g').attr('transform', `translate(0,${h})`).call(d3.axisBottom(xS).ticks(6).tickFormat(d => String(d)))
      .selectAll('text').attr('fill',CSS.dim).attr('font-size','9.5px');
    g.append('g').call(d3.axisLeft(yS).ticks(4).tickSize(-w))
      .selectAll('text').attr('fill',CSS.dim).attr('font-size','9.5px');
    g.selectAll('.domain').remove();
    g.selectAll('.tick line').attr('stroke',CSS.axisGrid);

    // Y labels
    g.append('text').attr('x',-4).attr('y',yS(0)+3).attr('text-anchor','end').attr('fill',CSS.dim).attr('font-size','7.5px').text('X');
    g.append('text').attr('x',-4).attr('y',yS(1)+3).attr('text-anchor','end').attr('fill',CSS.dim).attr('font-size','7.5px').text('P');
    g.append('text').attr('x',-4).attr('y',yS(2)+3).attr('text-anchor','end').attr('fill',CSS.dim).attr('font-size','7.5px').text('V');

    // Key event lines
    const divEvts = tr('div_events');
    const events = [
      [1990, divEvts[0][0]],
      [2002, divEvts[1][0]],
    ];
    events.forEach(([yr, lbl]) => {
      g.append('line').attr('x1',xS(yr)).attr('x2',xS(yr)).attr('y1',0).attr('y2',h)
        .attr('stroke','rgba(0,0,0,0.15)').attr('stroke-width',1).attr('stroke-dasharray','4,3');
      g.append('text').attr('x',xS(yr)+3).attr('y',10).attr('fill',CSS.muted).attr('font-size','8.5px').attr('font-weight','600').text(lbl);
    });

    const line = d3.line().x(d => xS(d[0])).y(d => yS(d[1])).curve(d3.curveBasis);
    const area = d3.area().x(d => xS(d[0])).y0(h).y1(d => yS(d[1])).curve(d3.curveBasis);

    for (const [hg, color] of Object.entries(hC)) {
      const series = DATA.heritage_divergence[feat][hg];
      if (!series) continue;
      g.append('path').datum(series).attr('d',area).attr('fill',color).attr('opacity',0.1);
      g.append('path').datum(series).attr('d',line).attr('fill','none').attr('stroke',color).attr('stroke-width',2.5).attr('opacity',0.85);
    }

    // Interactive overlay with tooltip
    const crossG = g.append('g').style('display','none');
    crossG.append('line').attr('y1',0).attr('y2',h).attr('stroke','rgba(0,0,0,0.2)').attr('stroke-dasharray','3,3');

    g.append('rect').attr('width',w).attr('height',h).attr('fill','transparent')
      .on('mouseenter', () => crossG.style('display',null))
      .on('mouseleave', () => { crossG.style('display','none'); divTT.style.opacity = '0'; })
      .on('mousemove', function(event) {
        const [mx] = d3.pointer(event);
        const yr = Math.max(1960, Math.min(2026, Math.round(xS.invert(mx))));
        const cx = xS(yr);
        crossG.select('line').attr('x1',cx).attr('x2',cx);

        let ttHtml = `<div class="dtt-year">${yr} — ${DATA.feature_labels[feat]}</div>`;
        for (const [hg, color] of Object.entries(hC)) {
          const series = DATA.heritage_divergence[feat][hg];
          if (!series) continue;
          const idx = yr - 1960;
          const val = series[idx] ? series[idx][1] : 0;
          const label = val < 0.5 ? tr('legend_absent') : val < 1.5 ? tr('legend_partial') : tr('legend_recognized');
          ttHtml += `<div class="dtt-row"><div class="dtt-dot" style="background:${color}"></div><b>${HL(hg)}</b> : ${val.toFixed(2)} (${label})</div>`;
        }
        // Show contextual annotation near notable events
        const annots = divAnnotations[feat];
        if (annots) {
          for (const a of annots) {
            if (Math.abs(yr - a.year) <= 5) {
              ttHtml += `<div class="dtt-note">${a.text}</div>`;
            }
          }
        }

        divTT.innerHTML = ttHtml;
        divTT.style.opacity = '1';
        divTT.style.left = Math.min(event.clientX + 14, window.innerWidth - 320) + 'px';
        divTT.style.top = (event.clientY - 10) + 'px';
      });
  });
}

// ─── Scatter Plot (Beeswarm) ──────────────────────────────
function scatterConflictCat(d) {
  if (!d.postConflict) return 'non-conflict';
  return (DATA.post_conflict_type && DATA.post_conflict_type[d.name]) || 'peace';
}

function updateScatterOpacity() {
  d3.selectAll('circle.scatter-dot')
    .transition().duration(250)
    .attr('opacity', d => (scatterActiveHeritage.has(d.heritage) && scatterActiveConflict.has(scatterConflictCat(d))) ? 0.85 : 0.08);
}

function initScatterFilters() {
  document.querySelectorAll('.scatter-toggle[data-sh]').forEach(btn => {
    btn.addEventListener('click', () => {
      const h = btn.dataset.sh;
      if (btn.classList.contains('active')) {
        // Don't allow deactivating the last one
        if (scatterActiveHeritage.size > 1) {
          btn.classList.remove('active');
          scatterActiveHeritage.delete(h);
        }
      } else {
        btn.classList.add('active');
        scatterActiveHeritage.add(h);
      }
      updateScatterOpacity();
    });
  });
  document.querySelectorAll('.scatter-toggle[data-sc]').forEach(btn => {
    btn.addEventListener('click', () => {
      const c = btn.dataset.sc;
      if (btn.classList.contains('active')) {
        if (scatterActiveConflict.size > 1) {
          btn.classList.remove('active');
          scatterActiveConflict.delete(c);
        }
      } else {
        btn.classList.add('active');
        scatterActiveConflict.add(c);
      }
      updateScatterOpacity();
    });
  });
}

function renderScatter() {
  const countries = [];
  for (const row of DATA.feature_matrix) {
    const c = row.PAYS;
    const totalScore = DATA.features.reduce((s, f) => s + row[f], 0);
    const rats = DATA.ratif_data[c] || {};
    const treatyCount = DATA.treaties.reduce((s, t) => s + (rats[t] === 'V' ? 1 : 0), 0);
    const h = DATA.colonial_heritage[c] || 'other';
    const pc = DATA.post_conflict && DATA.post_conflict[c] || false;
    countries.push({ name:c, totalScore, treatyCount, heritage:h, postConflict:pc });
  }

  const cont = document.getElementById('scatter-container');
  const M = { top:30, right:30, bottom:55, left:60 };
  const w = 480, h = 380;

  const svg = d3.select(cont).append('svg')
    .attr('viewBox', `0 0 ${w+M.left+M.right} ${h+M.top+M.bottom}`)
    .style('max-width','650px');

  const g = svg.append('g').attr('transform', `translate(${M.left},${M.top})`);

  // X-axis: band scale for discrete treaty counts (3, 4, 5, 6)
  const treatyCounts = [...new Set(countries.map(d => d.treatyCount))].sort();
  const xBand = d3.scaleBand().domain(treatyCounts).range([0, w]).padding(0.15);
  const yS = d3.scaleLinear().domain([0, 20]).range([h, 0]);

  // X-axis
  g.append('g').attr('transform', `translate(0,${h})`)
    .call(d3.axisBottom(d3.scalePoint().domain(treatyCounts.map(String)).range([xBand(treatyCounts[0]) + xBand.bandwidth()/2, xBand(treatyCounts[treatyCounts.length-1]) + xBand.bandwidth()/2])))
    .selectAll('text').attr('fill',CSS.dim).attr('font-size','12px');

  // Y-axis with grid
  g.append('g').call(d3.axisLeft(yS).ticks(10).tickSize(-w))
    .selectAll('text').attr('fill',CSS.dim).attr('font-size','11px');
  g.selectAll('.domain').remove();
  g.selectAll('.tick line').attr('stroke',CSS.axisGrid);

  // Column count labels at top
  treatyCounts.forEach(tc => {
    const n = countries.filter(d => d.treatyCount === tc).length;
    g.append('text')
      .attr('x', xBand(tc) + xBand.bandwidth()/2).attr('y', -10)
      .attr('text-anchor', 'middle').attr('fill', CSS.dim).attr('font-size', '10px')
      .text(`n=${n}`);
  });

  // Axis labels
  g.append('text').attr('x',w/2).attr('y',h+44).attr('text-anchor','middle').attr('fill',CSS.muted).attr('font-size','11.5px')
    .text(tr('scatter_xlabel'));

  g.append('text').attr('transform','rotate(-90)').attr('x',-h/2).attr('y',-44)
    .attr('text-anchor','middle').attr('fill',CSS.muted).attr('font-size','11.5px')
    .text(tr('scatter_ylabel'));

  // Mean line per column
  treatyCounts.forEach(tc => {
    const col = countries.filter(d => d.treatyCount === tc);
    const colMean = d3.mean(col, d => d.totalScore);
    g.append('line')
      .attr('x1', xBand(tc) + 4).attr('x2', xBand(tc) + xBand.bandwidth() - 4)
      .attr('y1', yS(colMean)).attr('y2', yS(colMean))
      .attr('stroke', CSS.dim).attr('stroke-width', 1.5).attr('stroke-dasharray', '4,3').attr('opacity', 0.5);
  });

  // Statistical annotation
  g.append('text').attr('x', w - 4).attr('y', 16)
    .attr('text-anchor', 'end').attr('fill', CSS.dim).attr('font-size', '10px')
    .attr('font-style', 'italic')
    .text(tr('scatter_stat'));

  // Beeswarm: force-simulate within each column to avoid overlap
  const R = 5.5;
  countries.forEach(d => {
    d.bx = xBand(d.treatyCount) + xBand.bandwidth() / 2;
    d.by = yS(d.totalScore);
    d.x = d.bx;
    d.y = d.by;
  });

  const sim = d3.forceSimulation(countries)
    .force('x', d3.forceX(d => d.bx).strength(0.8))
    .force('y', d3.forceY(d => d.by).strength(1))
    .force('collide', d3.forceCollide(R + 1.5))
    .stop();

  for (let i = 0; i < 200; i++) sim.tick();

  // Clamp dots within their column band
  countries.forEach(d => {
    d.x = Math.max(xBand(d.treatyCount) + R + 1, Math.min(xBand(d.treatyCount) + xBand.bandwidth() - R - 1, d.x));
    d.y = Math.max(R, Math.min(h - R, d.y));
  });

  // Scatter tooltip
  const scTT = d3.select('#scatter-tooltip');

  // All dots are circles — heritage color, opacity driven by filters
  g.selectAll('circle.scatter-dot').data(countries).join('circle')
    .attr('class','scatter-dot')
    .attr('cx', d => d.x).attr('cy', d => d.y).attr('r', R)
    .attr('fill', d => HC[d.heritage] || HC.other)
    .attr('opacity', d => (scatterActiveHeritage.has(d.heritage) && scatterActiveConflict.has(scatterConflictCat(d))) ? 0.85 : 0.08)
    .attr('stroke','rgba(0,0,0,0.15)').attr('stroke-width',0.5)
    .style('cursor', 'pointer')
    .on('mouseenter', function(ev, d) {
      d3.select(this).attr('r', R * 1.5);
      scTT.html(
        `<div class="tt-name">${d.name}</div>` +
        `<div style="font-size:0.8rem;margin-top:0.15rem">${tr('constitutional_score')} : <b>${d.totalScore}</b>/20</div>` +
        `<div style="font-size:0.8rem">${tr('treaties_ratified')} : <b>${d.treatyCount}</b>/6</div>` +
        `<div style="font-size:0.72rem;color:var(--dim);margin-top:0.15rem">${HL(d.heritage)}${d.postConflict ? ' · ' + tr('postconflict_constitution') : ''}</div>` +
        `<div style="font-size:0.7rem;color:var(--dim);margin-top:0.2rem;font-style:italic">${tr('click_open')}</div>`
      ).style('opacity','1').style('left',(ev.clientX+14)+'px').style('top',(ev.clientY-10)+'px');
    })
    .on('mousemove', function(ev) { scTT.style('left',(ev.clientX+14)+'px').style('top',(ev.clientY-10)+'px'); })
    .on('mouseleave', function(ev, d) { d3.select(this).attr('r', R); scTT.style('opacity','0'); })
    .on('click', function(ev, d) { scTT.style('opacity','0'); openBio(d.name); });

}

// ─── Post-Conflict Tab (multi-component) ─────────────────
function renderConflictTab() {
  if (!DATA.post_conflict) return;

  // ── Compute shared data ────────────────────────────────
  const allCountries = DATA.feature_matrix.map(r => {
    const c = r.PAYS;
    const total = DATA.features.reduce((s, f) => s + r[f], 0);
    return { name: c, total, heritage: DATA.colonial_heritage[c] || 'other', pc: !!DATA.post_conflict[c], pcType: DATA.post_conflict_type[c] || null };
  });
  const pcCountries = allCountries.filter(d => d.pc);
  const npcCountries = allCountries.filter(d => !d.pc);
  const peaceCountries = pcCountries.filter(d => d.pcType === 'peace').sort((a, b) => b.total - a.total);
  const authCountries = pcCountries.filter(d => d.pcType === 'authoritarian').sort((a, b) => b.total - a.total);
  const pcMean = pcCountries.length ? d3.mean(pcCountries, d => d.total) : 0;
  const npcMean = npcCountries.length ? d3.mean(npcCountries, d => d.total) : 0;

  // ── 1. Mini-map ────────────────────────────────────────
  renderConflictMap(pcCountries);

  // ── 2. Stats panel ─────────────────────────────────────
  renderConflictStats(pcCountries, peaceCountries, authCountries, pcMean, npcMean);

  // ── 3. Comparison panels ───────────────────────────────
  renderConflictComparison(peaceCountries, authCountries, npcMean);

  // ── 4. Dimension breakdown chart ───────────────────────
  renderConflictDimensions(allCountries);
}

function renderConflictMap(pcCountries) {
  const cont = document.getElementById('conflit-map');
  if (!cont) return;
  cont.innerHTML = '';
  if (!geoData) return; // not loaded yet

  const W = 250, H = 250;
  const svg = d3.select(cont).append('svg').attr('viewBox', `0 0 ${W} ${H}`);

  const defs = svg.append('defs');
  // Hatching for peace process
  const pat1 = defs.append('pattern').attr('id','hatch-peace').attr('width',5).attr('height',5).attr('patternUnits','userSpaceOnUse').attr('patternTransform','rotate(45)');
  pat1.append('rect').attr('width',5).attr('height',5).attr('fill','#d4785a');
  pat1.append('line').attr('x1',0).attr('y1',0).attr('x2',0).attr('y2',5).attr('stroke','#a85535').attr('stroke-width',1.2);
  // Cross-hatching for authoritarian
  const pat2 = defs.append('pattern').attr('id','hatch-auth').attr('width',5).attr('height',5).attr('patternUnits','userSpaceOnUse');
  pat2.append('rect').attr('width',5).attr('height',5).attr('fill','#c4956a');
  pat2.append('line').attr('x1',0).attr('y1',0).attr('x2',5).attr('y2',5).attr('stroke','#8a6540').attr('stroke-width',0.8);
  pat2.append('line').attr('x1',5).attr('y1',0).attr('x2',0).attr('y2',5).attr('stroke','#8a6540').attr('stroke-width',0.8);

  const proj = d3.geoMercator().fitSize([W, H], geoData);
  const path = d3.geoPath(proj);

  // Build lookup for pc countries
  const pcLookup = {};
  pcCountries.forEach(d => { pcLookup[d.name] = d; });

  // Score color scale for post-conflict countries
  const scoreScale = d3.scaleLinear().domain([0, 10, 20]).range(['#e8c4a0','#d4785a','#a83020']).interpolate(d3.interpolateRgb);

  const scTT = d3.select('#scatter-tooltip');

  svg.selectAll('path.cm-country').data(geoData.features).join('path')
    .attr('class','cm-country')
    .attr('d', path)
    .attr('stroke', CSS.strokeDefault).attr('stroke-width', 0.3)
    .attr('fill', d => {
      const name = DATA.name_to_iso ? Object.entries(DATA.name_to_iso).find(([n, iso]) => {
        const geoIso = d.properties.ISO_A3 !== '-99' ? d.properties.ISO_A3 : d.properties.ADM0_A3;
        return iso === geoIso;
      }) : null;
      const countryName = name ? name[0] : null;
      if (!countryName) return '#eae6df';
      const pc = pcLookup[countryName];
      if (!pc) return '#eae6df';
      if (pc.pcType === 'peace') return 'url(#hatch-peace)';
      return 'url(#hatch-auth)';
    })
    .on('mouseenter', function(ev, d) {
      const name = DATA.name_to_iso ? Object.entries(DATA.name_to_iso).find(([n, iso]) => {
        const geoIso = d.properties.ISO_A3 !== '-99' ? d.properties.ISO_A3 : d.properties.ADM0_A3;
        return iso === geoIso;
      }) : null;
      const countryName = name ? name[0] : null;
      if (!countryName) return;
      const pc = pcLookup[countryName];
      if (!pc) return;
      scTT.html(
        `<div class="tt-name">${pc.name}</div>` +
        `<div style="font-size:0.8rem">${tr('total_score')} : <b>${pc.total}</b>/20</div>` +
        `<div style="font-size:0.72rem;color:var(--dim)">${pc.pcType === 'peace' ? tr('conflit_peace_title') : tr('conflit_auth_title')}</div>`
      ).style('opacity','1').style('left',(ev.clientX+14)+'px').style('top',(ev.clientY-10)+'px');
    })
    .on('mousemove', function(ev) { scTT.style('left',(ev.clientX+14)+'px').style('top',(ev.clientY-10)+'px'); })
    .on('mouseleave', function() { scTT.style('opacity','0'); });

  // Small legend below the map
  const legY = H - 22;
  const legData = [
    { label: tr('conflit_peace_title'), fill: 'url(#hatch-peace)' },
    { label: tr('conflit_auth_title'), fill: 'url(#hatch-auth)' },
  ];
  const legG = svg.append('g').attr('transform', `translate(5,${legY})`);
  legData.forEach((d, i) => {
    const g = legG.append('g').attr('transform', `translate(${i * 125}, 0)`);
    g.append('rect').attr('width',12).attr('height',10).attr('rx',2).attr('fill',d.fill).attr('stroke',CSS.border).attr('stroke-width',0.5);
    g.append('text').attr('x',16).attr('y',8).attr('font-size','7.5px').attr('fill',CSS.muted).text(d.label);
  });
}

function renderConflictStats(pcCountries, peaceCountries, authCountries, pcMean, npcMean) {
  const cont = document.getElementById('conflit-stats');
  if (!cont) return;

  cont.innerHTML = `
    <div class="stat-row">
      <span class="stat-big">${pcCountries.length}/54</span>
      <span class="stat-label">${tr('conflit_stat_count')}</span>
    </div>
    <div class="stat-detail">
      <div class="stat-bullet"><span class="stat-dot" style="background:#d4785a"></span>${peaceCountries.length} ${tr('conflit_peace_count')}</div>
      <div class="stat-bullet"><span class="stat-dot" style="background:#c4956a"></span>${authCountries.length} ${tr('conflit_auth_count')}</div>
    </div>
    <hr class="stat-divider">
    <div class="stat-pair"><span class="stat-key">${tr('conflit_mean_pc')}</span><span class="stat-val">${pcMean.toFixed(1)}/20</span></div>
    <div class="stat-pair"><span class="stat-key">${tr('conflit_mean_npc')}</span><span class="stat-val">${npcMean.toFixed(1)}/20</span></div>
    <div class="stat-small">${tr('conflit_mannwhitney')} p = 0,0001</div>
    <hr class="stat-divider">
    <div class="stat-pair"><span class="stat-key">${tr('conflit_eta_heritage')}</span><span class="stat-val">22,3 %</span></div>
    <div class="stat-pair"><span class="stat-key">${tr('conflit_eta_combined')}</span><span class="stat-val">63,2 %</span></div>
  `;
}

function renderConflictComparison(peaceCountries, authCountries, npcMean) {
  const scTT = d3.select('#scatter-tooltip');

  function renderPanel(containerId, title, countries) {
    const cont = document.getElementById(containerId);
    if (!cont) return;
    cont.innerHTML = '';

    const box = document.createElement('div');
    box.className = 'conflit-panel-box';
    const h4 = document.createElement('h4');
    h4.textContent = title;
    box.appendChild(h4);

    countries.forEach(d => {
      const card = document.createElement('div');
      card.className = 'conflit-country-card';
      const color = HC[d.heritage] || HC.other;
      card.innerHTML = `
        <span class="cc-dot" style="background:${color}"></span>
        <span class="cc-name">${d.name}</span>
        <span class="cc-score">${d.total}</span>
        <span class="cc-bar-bg"><span class="cc-bar" style="width:${(d.total / 20) * 100}%;background:${color}"></span></span>
      `;
      card.addEventListener('click', () => openBio(d.name));
      card.addEventListener('mouseenter', (ev) => {
        scTT.html(
          `<div class="tt-name">${d.name}</div>` +
          `<div style="font-size:0.8rem">${tr('total_score')} : <b>${d.total}</b>/20</div>` +
          `<div style="font-size:0.72rem;color:var(--dim)">${HL(d.heritage)} · ${d.pcType === 'peace' ? tr('conflit_peace_title') : tr('conflit_auth_title')}</div>`
        ).style('opacity','1').style('left',(ev.clientX+14)+'px').style('top',(ev.clientY-10)+'px');
      });
      card.addEventListener('mouseleave', () => { scTT.style('opacity','0'); });
      box.appendChild(card);
    });

    // Reference line
    const ref = document.createElement('div');
    ref.className = 'conflit-ref-line';
    ref.innerHTML = `<span class="ref-label">${tr('conflit_ref_mean')}</span><span class="ref-val">${npcMean.toFixed(1)}/20</span>`;
    box.appendChild(ref);

    cont.appendChild(box);
  }

  renderPanel('conflit-peace-panel', tr('conflit_peace_title'), peaceCountries);
  renderPanel('conflit-auth-panel', tr('conflit_auth_title'), authCountries);
}

function renderConflictDimensions(allCountries) {
  const cont = document.getElementById('conflit-dimensions-chart');
  if (!cont) return;
  cont.innerHTML = '';

  // Dimension order: identity-first
  const dimOrder = ['Dpa','Dau','Drc','Drm','Id','La','PJ','F','Dc','Dis'];

  // 4 groups: Franco non-conflict, Franco post-conflict(peace), Anglo non-conflict, Anglo post-conflict(peace)
  const groupDefs = [
    { key: 'franco-nc', heritage: 'francophone', pc: false, label: tr('h_francophone') + ' ' + tr('conflit_nonconflict'), color: CSS.francophone, opacity: 0.4 },
    { key: 'franco-pc', heritage: 'francophone', pc: true, label: tr('h_francophone') + ' post-conflit', color: CSS.francophone, opacity: 1 },
    { key: 'anglo-nc', heritage: 'anglophone', pc: false, label: tr('h_anglophone') + ' ' + tr('conflit_nonconflict'), color: CSS.anglophone, opacity: 0.4 },
    { key: 'anglo-pc', heritage: 'anglophone', pc: true, label: tr('h_anglophone') + ' post-conflit', color: CSS.anglophone, opacity: 1 },
  ];

  // Compute means per dim per group
  const groupData = groupDefs.map(gd => {
    const countries = allCountries.filter(d => d.heritage === gd.heritage && d.pc === gd.pc);
    const means = {};
    dimOrder.forEach(dim => {
      const vals = countries.map(d => {
        const row = DATA.feature_matrix.find(r => r.PAYS === d.name);
        return row ? row[dim] : 0;
      });
      means[dim] = vals.length ? d3.mean(vals) : 0;
    });
    return { ...gd, means, n: countries.length };
  });

  // Significance markers per dimension (from thesis: Dpa, Dau, Drc, Drm p < 0.001)
  const sigDims = new Set(['Dpa','Dau','Drc','Drm']);

  const M = { top: 30, right: 20, bottom: 80, left: 130 };
  const barH = 14, gapBetweenDims = 8, groupGap = 2;
  const dimH = groupDefs.length * (barH + groupGap) + gapBetweenDims;
  const chartH = dimOrder.length * dimH;
  const w = 450;

  const svg = d3.select(cont).append('svg')
    .attr('viewBox', `0 0 ${w + M.left + M.right} ${chartH + M.top + M.bottom}`)
    .style('max-width', '800px');

  const g = svg.append('g').attr('transform', `translate(${M.left},${M.top})`);

  const xS = d3.scaleLinear().domain([0, 2]).range([0, w]);

  // Grid lines
  g.append('g').call(d3.axisTop(xS).ticks(4).tickSize(-chartH).tickFormat(d => d.toFixed(0)))
    .selectAll('text').attr('fill', CSS.dim).attr('font-size', '10px');
  g.selectAll('.domain').remove();
  g.selectAll('.tick line').attr('stroke', CSS.axisGrid);

  // X-axis label
  g.append('text').attr('x', w / 2).attr('y', -20)
    .attr('text-anchor', 'middle').attr('fill', CSS.muted).attr('font-size', '10px')
    .text(tr('conflict_ylabel').replace(/\(.*\)/, '(0–2)'));

  const scTT = d3.select('#scatter-tooltip');

  dimOrder.forEach((dim, di) => {
    const yBase = di * dimH;
    const dimLabel = DATA.feature_labels[dim];

    // Dim label on left
    g.append('text')
      .attr('x', -8).attr('y', yBase + dimH / 2)
      .attr('text-anchor', 'end').attr('dominant-baseline', 'middle')
      .attr('fill', sigDims.has(dim) ? CSS.text : CSS.muted)
      .attr('font-size', '11px')
      .attr('font-weight', sigDims.has(dim) ? '600' : '400')
      .text(dimLabel + (sigDims.has(dim) ? ' ***' : ''));

    // Bars for each group
    groupData.forEach((gd, gi) => {
      const y = yBase + gi * (barH + groupGap);
      const val = gd.means[dim];

      g.append('rect')
        .attr('x', 0).attr('y', y)
        .attr('width', Math.max(xS(val), 1)).attr('height', barH)
        .attr('fill', gd.color).attr('opacity', gd.opacity)
        .attr('rx', 2)
        .style('cursor', 'pointer')
        .on('mouseenter', function(ev) {
          scTT.html(
            `<div class="tt-name">${gd.label}</div>` +
            `<div style="font-size:0.8rem">${dimLabel} : <b>${val.toFixed(2)}</b>/2 (n=${gd.n})</div>`
          ).style('opacity','1').style('left',(ev.clientX+14)+'px').style('top',(ev.clientY-10)+'px');
        })
        .on('mousemove', function(ev) { scTT.style('left',(ev.clientX+14)+'px').style('top',(ev.clientY-10)+'px'); })
        .on('mouseleave', function() { scTT.style('opacity','0'); });

      // Value label
      g.append('text')
        .attr('x', xS(val) + 4).attr('y', y + barH / 2)
        .attr('dominant-baseline', 'middle')
        .attr('fill', CSS.dim).attr('font-size', '8px')
        .text(val.toFixed(1));
    });
  });

  // Legend at bottom
  const legY = chartH + 20;
  const legG = g.append('g').attr('transform', `translate(0,${legY})`);
  groupDefs.forEach((gd, i) => {
    const x = (i % 2) * (w / 2);
    const y = Math.floor(i / 2) * 18;
    const lg = legG.append('g').attr('transform', `translate(${x},${y})`);
    lg.append('rect').attr('width', 14).attr('height', 10).attr('rx', 2).attr('fill', gd.color).attr('opacity', gd.opacity);
    lg.append('text').attr('x', 18).attr('y', 8).attr('font-size', '9px').attr('fill', CSS.muted).text(`${gd.label} (n=${groupData[i].n})`);
  });
  // Significance note
  legG.append('text').attr('x', 0).attr('y', 48).attr('font-size', '8px').attr('fill', CSS.dim).attr('font-style', 'italic')
    .text('*** p < 0,001 (Mann-Whitney)');
}

// Backward-compatible wrapper for init and switchLang
function renderConflictChart() { renderConflictTab(); }

// ─── CSV Download ─────────────────────────────────────────
document.getElementById('download-csv')?.addEventListener('click', () => {
  const header = [tr('csv_country'),tr('csv_heritage'),tr('csv_postconflict'),tr('csv_total'),...DATA.features.map(f => DATA.feature_labels[f]),tr('csv_treaties')];
  const rows = DATA.feature_matrix.map(r => {
    const c = r.PAYS;
    const h = DATA.colonial_heritage[c] || 'other';
    const pc = DATA.post_conflict && DATA.post_conflict[c] ? tr('yes') : tr('no');
    const total = DATA.features.reduce((s,f) => s + r[f], 0);
    const rats = DATA.ratif_data[c] || {};
    const ratCount = DATA.treaties.reduce((s,t) => s + (rats[t]==='V'?1:0), 0);
    return [c, h, pc, total, ...DATA.features.map(f => ['X','P','V'][r[f]]), ratCount];
  });
  const csv = [header,...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n');
  const blob = new Blob(['\ufeff'+csv], {type:'text/csv;charset=utf-8;'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'constitutions_afrique_donnees.csv';
  a.click();
});

// ─── UMAP Scatter ───────────────────────────────────────────
let umapMode = 'constitutions';

function renderUMAP() {
  const container = document.getElementById('umap-container');
  if (!container || !DATA.umap_coords) return;
  container.innerHTML = '';

  const coords = umapMode === 'preambles' ? DATA.umap_preamble_coords : DATA.umap_coords;
  if (!coords || Object.keys(coords).length === 0) return;

  const margin = {top: 20, right: 20, bottom: 40, left: 40};
  const w = 600, h = 400;

  const svg = d3.select(container).append('svg')
    .attr('viewBox', `0 0 ${w + margin.left + margin.right} ${h + margin.top + margin.bottom}`)
    .append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  // Get extent
  const points = Object.entries(coords).map(([name, [x, y]]) => ({name, x, y}));
  const xExt = d3.extent(points, d => d.x);
  const yExt = d3.extent(points, d => d.y);
  const xScale = d3.scaleLinear().domain([xExt[0]-1, xExt[1]+1]).range([0, w]);
  const yScale = d3.scaleLinear().domain([yExt[0]-1, yExt[1]+1]).range([h, 0]);

  // Axes
  svg.append('g').attr('transform', `translate(0,${h})`).call(d3.axisBottom(xScale).ticks(5)).selectAll('text').style('font-size','8px');
  svg.append('g').call(d3.axisLeft(yScale).ticks(5)).selectAll('text').style('font-size','8px');
  svg.append('text').attr('x',w/2).attr('y',h+35).attr('text-anchor','middle').style('font-size','10px').style('fill',CSS.muted).text('UMAP 1');
  svg.append('text').attr('transform','rotate(-90)').attr('x',-h/2).attr('y',-30).attr('text-anchor','middle').style('font-size','10px').style('fill',CSS.muted).text('UMAP 2');

  // Compute total score lookup for tooltip
  const scoreLookup = {};
  if (DATA.feature_matrix) {
    for (const row of DATA.feature_matrix) {
      scoreLookup[row.PAYS] = DATA.features.reduce((s, f) => s + row[f], 0);
    }
  }

  // Draw points
  points.forEach(p => {
    const heritage = DATA.colonial_heritage[p.name] || 'other';
    const pc = DATA.post_conflict && DATA.post_conflict[p.name];
    const color = HC[heritage] || HC.other;

    const g = svg.append('g').style('cursor','pointer');

    if (pc) {
      // Diamond for post-conflict
      const size = 6;
      g.append('path')
        .attr('d', `M${xScale(p.x)},${yScale(p.y)-size} L${xScale(p.x)+size},${yScale(p.y)} L${xScale(p.x)},${yScale(p.y)+size} L${xScale(p.x)-size},${yScale(p.y)} Z`)
        .attr('fill', color).attr('stroke','white').attr('stroke-width',0.5).attr('opacity',0.85);
    } else {
      g.append('circle')
        .attr('cx', xScale(p.x)).attr('cy', yScale(p.y)).attr('r', 5)
        .attr('fill', color).attr('stroke','white').attr('stroke-width',0.5).attr('opacity',0.85);
    }

    // Label for notable countries only
    const notable = ['RDC','Éthiopie','Afrique du Sud','Kenya','Cameroun','Tunisie','Somalie','Nigéria'];
    const shortName = p.name.replace('République démocratique du Congo','RDC');
    if (notable.includes(shortName) || notable.includes(p.name)) {
      g.append('text').attr('x',xScale(p.x)+8).attr('y',yScale(p.y)+3)
        .style('font-size','7px').style('fill',color).text(shortName);
    }

    // Hover tooltip — all countries
    const totalScore = scoreLookup[p.name];
    g.on('mouseover', (event) => {
      const tt = document.getElementById('tooltip');
      tt.style.display = 'block';
      tt.style.opacity = '1';
      const scoreStr = totalScore !== undefined ? ` &middot; ${tr('score_label')} : ${totalScore}/20` : '';
      tt.innerHTML = `<strong>${p.name}</strong><br>${HL(heritage)}${scoreStr}${pc ? ' &middot; ' + tr('postconflict_label') : ''}`;
    })
    .on('mousemove', (event) => {
      const tt = document.getElementById('tooltip');
      tt.style.left = (event.pageX + 12) + 'px';
      tt.style.top = (event.pageY - 20) + 'px';
    })
    .on('mouseout', () => {
      const tt = document.getElementById('tooltip');
      tt.style.opacity = '0';
      tt.style.display = '';
    })
    .on('click', () => { openBio(p.name); });
  });
}

// UMAP toggle button handlers
document.querySelectorAll('[data-umap]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-umap]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    umapMode = btn.dataset.umap;
    renderUMAP();
  });
});

// ─── Dendrogram with threshold slider ───────────────────────
function buildTreeFromLinkage(linkageData) {
  const n = linkageData.countries.length;
  const nodes = new Array(2 * n - 1);

  // Leaf nodes
  for (let i = 0; i < n; i++) {
    nodes[i] = { id: i, name: linkageData.countries[i], children: null, height: 0, count: 1 };
  }

  // Internal nodes
  linkageData.linkage.forEach((row, idx) => {
    const [left, right, dist, count] = row;
    nodes[n + idx] = {
      id: n + idx,
      children: [nodes[left], nodes[right]],
      height: dist,
      count: count,
      name: null
    };
  });

  return nodes[2 * n - 2]; // root
}

function renderDendrogram() {
  const container = document.getElementById('dendrogram-container');
  if (!container || !DATA.linkage_data || !DATA.linkage_data.linkage) return;
  container.innerHTML = '';

  const root = buildTreeFromLinkage(DATA.linkage_data);
  const hierarchy = d3.hierarchy(root);

  const margin = {top: 20, right: 30, bottom: 30, left: 180};
  const w = 400, h = 800;

  const svg = d3.select(container).append('svg')
    .attr('viewBox', `0 0 ${w + margin.left + margin.right} ${h + margin.top + margin.bottom}`)
    .append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  // Cluster layout: assigns y positions to leaves evenly spaced
  const cluster = d3.cluster().size([h, w]);
  cluster(hierarchy);

  // x scale: map height (distance) to pixels (0 = leaves on left, maxDist = root on right)
  const maxDist = root.height;
  const xScale = d3.scaleLinear().domain([0, maxDist]).range([0, w]);

  // Draw links as elbow connectors
  const links = hierarchy.links();
  svg.selectAll('.dendro-link')
    .data(links)
    .enter().append('path')
    .attr('class', 'dendro-link')
    .attr('d', d => {
      const sx = xScale(d.source.data.height);
      const sy = d.source.x;
      const tx = xScale(d.target.data.height);
      const ty = d.target.x;
      return `M${sx},${sy} H${tx} V${ty}`;
    })
    .attr('fill', 'none')
    .attr('stroke', '#999')
    .attr('stroke-width', 1);

  // Draw leaf labels
  const leaves = hierarchy.leaves();
  leaves.forEach(leaf => {
    const name = leaf.data.name;
    const heritage = DATA.colonial_heritage[name] || 'other';
    svg.append('text')
      .attr('x', -5)
      .attr('y', leaf.x)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'end')
      .style('font-size', '8px')
      .style('fill', HC[heritage] || HC.other)
      .style('font-weight', 'bold')
      .text(name.replace('République démocratique du Congo','RDC').replace('République centrafricaine','Centrafrique'));
  });

  // Threshold slider line (draggable vertical line)
  const initialThreshold = maxDist * 0.5;
  const sliderLine = svg.append('line')
    .attr('class', 'threshold-line')
    .attr('x1', xScale(initialThreshold))
    .attr('x2', xScale(initialThreshold))
    .attr('y1', -10)
    .attr('y2', h + 10)
    .attr('stroke', '#c0392b')
    .attr('stroke-width', 2)
    .attr('stroke-dasharray', '6,3')
    .style('cursor', 'ew-resize');

  // Slider handle
  const handle = svg.append('rect')
    .attr('x', xScale(initialThreshold) - 8)
    .attr('y', -15)
    .attr('width', 16)
    .attr('height', 20)
    .attr('rx', 3)
    .attr('fill', '#c0392b')
    .attr('opacity', 0.8)
    .style('cursor', 'ew-resize');

  // Drag behavior
  const drag = d3.drag()
    .on('drag', (event) => {
      const newX = Math.max(0, Math.min(w, event.x));
      const threshold = xScale.invert(newX);
      sliderLine.attr('x1', newX).attr('x2', newX);
      handle.attr('x', newX - 8);
      updateClusters(threshold);
    });

  handle.call(drag);
  sliderLine.call(drag);

  // Distance axis
  svg.append('g')
    .attr('transform', `translate(0,${h + 5})`)
    .call(d3.axisBottom(xScale).ticks(6))
    .selectAll('text').style('font-size','8px');
  svg.append('text').attr('x',w/2).attr('y',h+28).attr('text-anchor','middle').style('font-size','10px').style('fill',CSS.muted).text('Distance');

  // Initial cluster update
  updateClusters(initialThreshold);
}

// ─── Companion cluster map ──────────────────────────────────
function clusterColor(clusterId, totalClusters) {
  const t = totalClusters <= 1 ? 0.5 : clusterId / (totalClusters - 1);
  return d3.interpolateRdYlBu(1 - t); // reversed: warm=0, cool=1
}
let clusterMapPaths = null;

function renderClusterMap() {
  const container = document.getElementById('cluster-map-container');
  if (!container) return;
  container.innerHTML = '';

  // Reuse geoData fetched by the main map if available; otherwise wait
  if (!geoData) {
    let retries = 0;
    const maxRetries = 50;
    const check = setInterval(() => {
      retries++;
      if (geoData) {
        clearInterval(check);
        renderClusterMap();
      } else if (retries >= maxRetries) {
        clearInterval(check);
        console.warn('renderClusterMap: gave up waiting for geoData after 10s');
      }
    }, 200);
    return;
  }

  const africa = geoData.features;
  const w = 500, h = 420;
  const projection = d3.geoMercator().center([20, 3]).scale(w * 0.65).translate([w/2, h/2]);
  const path = d3.geoPath().projection(projection);

  const svg = d3.select(container).append('svg')
    .attr('viewBox', `0 0 ${w} ${h}`);

  clusterMapPaths = svg.selectAll('path')
    .data(africa)
    .enter().append('path')
    .attr('d', path)
    .attr('fill', '#eee')
    .attr('stroke', 'white')
    .attr('stroke-width', 0.5)
    .style('cursor', 'pointer')
    .on('mouseover', (event, d) => {
      const iso = d.properties.ISO_A3 !== '-99' ? d.properties.ISO_A3 : d.properties.ADM0_A3;
      const entry = Object.entries(DATA.name_to_iso).find(([n, i]) => i === iso);
      if (!entry) return;
      const name = entry[0];
      const heritage = DATA.colonial_heritage[name] || 'other';
      const clusterId = currentClusterMap[name];
      const clusterLabel = clusterId !== undefined ? `${tr('clusters_group')} ${clusterId + 1}` : '—';
      const tt = document.getElementById('tooltip');
      tt.style.display = 'block';
      tt.style.opacity = '1';
      tt.innerHTML = `<strong>${name}</strong><br>${HL(heritage)} &middot; ${clusterLabel}`;
    })
    .on('mousemove', (event) => {
      const tt = document.getElementById('tooltip');
      tt.style.left = (event.pageX + 12) + 'px';
      tt.style.top = (event.pageY - 20) + 'px';
    })
    .on('mouseout', () => {
      const tt = document.getElementById('tooltip');
      tt.style.opacity = '0';
      tt.style.display = '';
    });
}

let currentClusterMap = {}; // shared for tooltip lookup

function updateClusters(threshold) {
  if (!DATA.linkage_data) return;

  // Cut the linkage tree at the given threshold to get cluster labels
  const linkage = DATA.linkage_data.linkage;
  const countries = DATA.linkage_data.countries;
  const n = countries.length;

  // Union-Find for cutting
  const parent = new Array(2 * n - 1);
  for (let i = 0; i < parent.length; i++) parent[i] = i;
  function find(x) { return parent[x] === x ? x : (parent[x] = find(parent[x])); }

  // Merge clusters up to threshold
  linkage.forEach((row, idx) => {
    const [left, right, dist] = row;
    if (dist <= threshold) {
      parent[find(left)] = find(n + idx);
      parent[find(right)] = find(n + idx);
    }
  });

  // Assign cluster IDs
  const clusterMap = {};
  const rootToId = {};
  let nextId = 0;
  for (let i = 0; i < n; i++) {
    const root = find(i);
    if (!(root in rootToId)) rootToId[root] = nextId++;
    clusterMap[countries[i]] = rootToId[root];
  }
  currentClusterMap = clusterMap;
  const totalClusters = nextId;

  // Update companion map
  if (clusterMapPaths) {
    clusterMapPaths.attr('fill', d => {
      const iso = d.properties.ISO_A3;
      const isoCheck = iso !== '-99' ? iso : d.properties.ADM0_A3;
      const name = Object.entries(DATA.name_to_iso).find(([n, i]) => i === isoCheck);
      if (!name) return '#eee';
      const clusterId = clusterMap[name[0]];
      return clusterId !== undefined ? clusterColor(clusterId, totalClusters) : '#eee';
    });
  }

  // Update dendrogram link colors based on clusters
  d3.selectAll('.dendro-link').attr('stroke', '#999');

  // Update cluster composition panel
  const compPanel = document.getElementById('cluster-composition');
  if (compPanel) {
    // Group countries by cluster
    const groups = {};
    for (const [country, cid] of Object.entries(clusterMap)) {
      if (!groups[cid]) groups[cid] = [];
      groups[cid].push(country);
    }
    const sortedIds = Object.keys(groups).map(Number).sort((a, b) => a - b);

    let html = `<div class="cc-header">${tr('clusters_threshold')} : ${threshold.toFixed(1)} — ${totalClusters} ${tr('clusters_groups')}</div>`;
    for (const cid of sortedIds) {
      const members = groups[cid];
      const colorSwatch = clusterColor(cid, totalClusters);
      const shortNames = members.map(c => c.replace('République démocratique du Congo','RDC').replace('République centrafricaine','Centrafrique'));
      html += `<div class="cc-group"><span class="cc-group-label" style="color:${colorSwatch}">${tr('clusters_group')} ${cid + 1}</span> (${members.length} ${tr('clusters_countries')}) : <span class="cc-group-countries">${shortNames.join(', ')}</span></div>`;
    }
    compPanel.innerHTML = html;
  }
}

// ═══════════════════════════════════════════════════════════
// Textes Tab — Interactive Charts
// ═══════════════════════════════════════════════════════════

// Static precomputed data from constitutional text analysis (54 constitutions)

const SOVEREIGNTY_DATA = {
  markers: ['indivisible', 'unity', 'sovereign'],
  francophone: { pct: [70, 100, 87], n: [16, 23, 20], total: 23 },
  anglophone:  { pct: [21, 95, 100], n: [4, 18, 19], total: 19 },
};

const PEOPLES_CONTEXT = {
  francophone: { charter: 19, diplomatic: 21, indigenous: 0, self_determination: 0, proper_noun: 1, national: 10 },
  anglophone:  { charter: 0, diplomatic: 2, indigenous: 0, self_determination: 0, proper_noun: 5, national: 20 },
};

const PEOPLES_CTX_ORDER = ['charter', 'diplomatic', 'indigenous', 'self_determination', 'proper_noun', 'national'];
const PEOPLES_CTX_COLORS = {
  charter: '#7a82b8', diplomatic: '#5a9a88', indigenous: '#c4956a',
  self_determination: '#d4785a', proper_noun: '#98a0a8', national: '#b86878',
};

const SD_DATA = [
  {country:'Afrique du Sud', heritage:'anglophone', has_sd:true, has_indivisible:false, has_autonomy:false, has_secession:false, posture:'mentioned'},
  {country:'Botswana', heritage:'anglophone', has_sd:false, has_indivisible:false, has_autonomy:false, has_secession:false, posture:'silent'},
  {country:'Eswatini', heritage:'anglophone', has_sd:false, has_indivisible:false, has_autonomy:false, has_secession:false, posture:'silent'},
  {country:'Gambie', heritage:'anglophone', has_sd:false, has_indivisible:false, has_autonomy:true, has_secession:false, posture:'autonomy_only'},
  {country:'Ghana', heritage:'anglophone', has_sd:false, has_indivisible:false, has_autonomy:false, has_secession:false, posture:'silent'},
  {country:'Kenya', heritage:'anglophone', has_sd:false, has_indivisible:true, has_autonomy:false, has_secession:false, posture:'indivisible_only'},
  {country:'Lesotho', heritage:'anglophone', has_sd:false, has_indivisible:false, has_autonomy:false, has_secession:false, posture:'silent'},
  {country:'Malawi', heritage:'anglophone', has_sd:false, has_indivisible:false, has_autonomy:false, has_secession:false, posture:'silent'},
  {country:'Maurice', heritage:'anglophone', has_sd:false, has_indivisible:false, has_autonomy:false, has_secession:false, posture:'silent'},
  {country:'Namibie', heritage:'anglophone', has_sd:false, has_indivisible:false, has_autonomy:false, has_secession:false, posture:'silent'},
  {country:'Nigéria', heritage:'anglophone', has_sd:false, has_indivisible:true, has_autonomy:false, has_secession:false, posture:'indivisible_only'},
  {country:'Ouganda', heritage:'anglophone', has_sd:true, has_indivisible:false, has_autonomy:true, has_secession:false, posture:'internal'},
  {country:'Sierra Leone', heritage:'anglophone', has_sd:false, has_indivisible:false, has_autonomy:false, has_secession:false, posture:'silent'},
  {country:'Soudan', heritage:'anglophone', has_sd:false, has_indivisible:false, has_autonomy:false, has_secession:false, posture:'silent'},
  {country:'Soudan du Sud', heritage:'anglophone', has_sd:false, has_indivisible:false, has_autonomy:false, has_secession:false, posture:'silent'},
  {country:'Tanzanie', heritage:'anglophone', has_sd:false, has_indivisible:false, has_autonomy:true, has_secession:false, posture:'autonomy_only'},
  {country:'Zambie', heritage:'anglophone', has_sd:false, has_indivisible:true, has_autonomy:true, has_secession:false, posture:'tension'},
  {country:'Zimbabwe', heritage:'anglophone', has_sd:false, has_indivisible:false, has_autonomy:false, has_secession:true, posture:'silent'},
  {country:'Égypte', heritage:'anglophone', has_sd:false, has_indivisible:true, has_autonomy:true, has_secession:false, posture:'tension'},
  {country:'Algérie', heritage:'francophone', has_sd:true, has_indivisible:true, has_autonomy:true, has_secession:false, posture:'internal'},
  {country:'Burkina Faso', heritage:'francophone', has_sd:false, has_indivisible:false, has_autonomy:true, has_secession:false, posture:'autonomy_only'},
  {country:'Burundi', heritage:'francophone', has_sd:false, has_indivisible:true, has_autonomy:true, has_secession:false, posture:'tension'},
  {country:'Bénin', heritage:'francophone', has_sd:false, has_indivisible:true, has_autonomy:true, has_secession:false, posture:'tension'},
  {country:'Comores', heritage:'francophone', has_sd:false, has_indivisible:false, has_autonomy:true, has_secession:false, posture:'autonomy_only'},
  {country:"Côte d'Ivoire", heritage:'francophone', has_sd:false, has_indivisible:true, has_autonomy:false, has_secession:false, posture:'indivisible_only'},
  {country:'Djibouti', heritage:'francophone', has_sd:false, has_indivisible:true, has_autonomy:true, has_secession:true, posture:'tension'},
  {country:'Gabon', heritage:'francophone', has_sd:false, has_indivisible:true, has_autonomy:true, has_secession:false, posture:'tension'},
  {country:'Guinée', heritage:'francophone', has_sd:true, has_indivisible:true, has_autonomy:false, has_secession:false, posture:'mentioned'},
  {country:'Madagascar', heritage:'francophone', has_sd:false, has_indivisible:false, has_autonomy:true, has_secession:false, posture:'autonomy_only'},
  {country:'Mali', heritage:'francophone', has_sd:false, has_indivisible:true, has_autonomy:false, has_secession:false, posture:'indivisible_only'},
  {country:'Maroc', heritage:'francophone', has_sd:false, has_indivisible:true, has_autonomy:true, has_secession:false, posture:'tension'},
  {country:'Mauritanie', heritage:'francophone', has_sd:false, has_indivisible:true, has_autonomy:false, has_secession:true, posture:'indivisible_only'},
  {country:'Niger', heritage:'francophone', has_sd:false, has_indivisible:true, has_autonomy:true, has_secession:false, posture:'tension'},
  {country:'Rwanda', heritage:'francophone', has_sd:false, has_indivisible:false, has_autonomy:true, has_secession:false, posture:'autonomy_only'},
  {country:'République centrafricaine', heritage:'francophone', has_sd:false, has_indivisible:true, has_autonomy:true, has_secession:false, posture:'tension'},
  {country:'République du Congo', heritage:'francophone', has_sd:false, has_indivisible:true, has_autonomy:false, has_secession:false, posture:'indivisible_only'},
  {country:'République démocratique du Congo', heritage:'francophone', has_sd:false, has_indivisible:true, has_autonomy:true, has_secession:false, posture:'tension'},
  {country:'Seychelles', heritage:'francophone', has_sd:false, has_indivisible:false, has_autonomy:false, has_secession:false, posture:'silent'},
  {country:'Sénégal', heritage:'francophone', has_sd:false, has_indivisible:false, has_autonomy:true, has_secession:false, posture:'autonomy_only'},
  {country:'Tchad', heritage:'francophone', has_sd:false, has_indivisible:true, has_autonomy:true, has_secession:false, posture:'tension'},
  {country:'Togo', heritage:'francophone', has_sd:false, has_indivisible:true, has_autonomy:true, has_secession:false, posture:'tension'},
  {country:'Tunisie', heritage:'francophone', has_sd:false, has_indivisible:false, has_autonomy:true, has_secession:false, posture:'autonomy_only'},
  {country:'Angola', heritage:'lusophone', has_sd:true, has_indivisible:true, has_autonomy:true, has_secession:false, posture:'internal'},
  {country:'Cap-Vert', heritage:'lusophone', has_sd:true, has_indivisible:false, has_autonomy:true, has_secession:false, posture:'internal'},
  {country:'Guinée-Bissau', heritage:'lusophone', has_sd:true, has_indivisible:false, has_autonomy:true, has_secession:false, posture:'internal'},
  {country:'Mozambique', heritage:'lusophone', has_sd:false, has_indivisible:true, has_autonomy:true, has_secession:false, posture:'tension'},
  {country:'Sao Tomé-et-Príncipe', heritage:'lusophone', has_sd:false, has_indivisible:false, has_autonomy:true, has_secession:false, posture:'autonomy_only'},
  {country:'Cameroun', heritage:'mixed', has_sd:false, has_indivisible:true, has_autonomy:true, has_secession:false, posture:'tension'},
  {country:'Guinée Équatoriale', heritage:'other', has_sd:false, has_indivisible:false, has_autonomy:true, has_secession:false, posture:'autonomy_only'},
  {country:'Libye', heritage:'other', has_sd:false, has_indivisible:false, has_autonomy:false, has_secession:false, posture:'silent'},
  {country:'Libéria', heritage:'other', has_sd:false, has_indivisible:false, has_autonomy:true, has_secession:false, posture:'autonomy_only'},
  {country:'Somalie', heritage:'other', has_sd:false, has_indivisible:true, has_autonomy:false, has_secession:false, posture:'indivisible_only'},
  {country:'Érythrée', heritage:'other', has_sd:false, has_indivisible:false, has_autonomy:false, has_secession:false, posture:'silent'},
  {country:'Éthiopie', heritage:'other', has_sd:true, has_indivisible:false, has_autonomy:false, has_secession:true, posture:'external'},
];

const POSTURE_ORDER = ['external','internal','mentioned','tension','indivisible_only','autonomy_only','silent'];

// ── Sovereignty chart: grouped horizontal bar chart ──────
function renderSovereigntyChart() {
  const cont = document.getElementById('sovereignty-chart');
  if (!cont) return;
  cont.innerHTML = '';

  const markers = SOVEREIGNTY_DATA.markers;
  const markerLabels = { indivisible: 'indivisible', unity: 'unity', sovereign: 'sovereign' };
  const heritages = ['francophone', 'anglophone'];

  const M = { top: 20, right: 60, bottom: 30, left: 100 };
  const barH = 18, groupGap = 20, barGap = 3;
  const chartH = markers.length * (heritages.length * (barH + barGap) + groupGap) - groupGap;
  const w = 500;

  const svg = d3.select(cont).append('svg')
    .attr('viewBox', `0 0 ${w + M.left + M.right} ${chartH + M.top + M.bottom}`)
    .style('max-width', '700px');

  const g = svg.append('g').attr('transform', `translate(${M.left},${M.top})`);

  const xS = d3.scaleLinear().domain([0, 100]).range([0, w]);

  // Grid lines
  g.append('g').call(d3.axisTop(xS).ticks(5).tickSize(-chartH).tickFormat(d => d + '%'))
    .selectAll('text').attr('fill', CSS.dim).attr('font-size', '10px');
  g.selectAll('.domain').remove();
  g.selectAll('.tick line').attr('stroke', CSS.axisGrid);

  const scTT = d3.select('#scatter-tooltip');

  markers.forEach((marker, mi) => {
    const yBase = mi * (heritages.length * (barH + barGap) + groupGap);

    // Marker label on left
    g.append('text')
      .attr('x', -8).attr('y', yBase + (heritages.length * (barH + barGap)) / 2)
      .attr('text-anchor', 'end').attr('dominant-baseline', 'middle')
      .attr('fill', CSS.text).attr('font-size', '12px').attr('font-weight', '600')
      .attr('font-style', 'italic')
      .text(markerLabels[marker]);

    heritages.forEach((h, hi) => {
      const y = yBase + hi * (barH + barGap);
      const pct = SOVEREIGNTY_DATA[h].pct[mi];
      const n = SOVEREIGNTY_DATA[h].n[mi];
      const total = SOVEREIGNTY_DATA[h].total;

      g.append('rect')
        .attr('x', 0).attr('y', y)
        .attr('width', Math.max(xS(pct), 1)).attr('height', barH)
        .attr('fill', HC[h]).attr('opacity', 0.85).attr('rx', 3)
        .style('cursor', 'pointer')
        .on('mouseenter', function(ev) {
          d3.select(this).attr('opacity', 1);
          scTT.html(
            `<div class="tt-name">${HL(h)}</div>` +
            `<div style="font-size:0.85rem;margin-top:0.1rem"><b>${pct} %</b> — <i>${markerLabels[marker]}</i></div>` +
            `<div style="font-size:0.78rem;color:var(--dim)">${tr('textes_sov_n_tooltip').replace('{n}', n).replace('{total}', total).replace('{pct}', pct)}</div>`
          ).style('opacity', '1').style('left', (ev.clientX + 14) + 'px').style('top', (ev.clientY - 10) + 'px');
        })
        .on('mousemove', function(ev) { scTT.style('left', (ev.clientX + 14) + 'px').style('top', (ev.clientY - 10) + 'px'); })
        .on('mouseleave', function() { d3.select(this).attr('opacity', 0.85); scTT.style('opacity', '0'); });

      // Value label
      g.append('text')
        .attr('x', xS(pct) + 6).attr('y', y + barH / 2)
        .attr('dominant-baseline', 'middle')
        .attr('fill', CSS.muted).attr('font-size', '11px').attr('font-weight', '600')
        .text(pct + '%');
    });
  });

  // Legend
  const legG = g.append('g').attr('transform', `translate(${w - 180},${chartH + 10})`);
  heritages.forEach((h, i) => {
    const lg = legG.append('g').attr('transform', `translate(${i * 100}, 0)`);
    lg.append('rect').attr('width', 12).attr('height', 10).attr('rx', 2).attr('fill', HC[h]).attr('opacity', 0.85);
    lg.append('text').attr('x', 16).attr('y', 8).attr('font-size', '10px').attr('fill', CSS.muted).text(HL(h));
  });
}

// ── Peoples context: 100%-stacked horizontal bar chart ───
function renderPeoplesChart() {
  const cont = document.getElementById('peoples-chart');
  if (!cont) return;
  cont.innerHTML = '';

  const heritages = ['francophone', 'anglophone'];

  const M = { top: 10, right: 30, bottom: 10, left: 100 };
  const barH = 30, barGap = 14;
  const chartH = heritages.length * (barH + barGap) - barGap;
  const w = 500;

  const svg = d3.select(cont).append('svg')
    .attr('viewBox', `0 0 ${w + M.left + M.right} ${chartH + M.top + M.bottom + 10}`)
    .style('max-width', '700px');

  const g = svg.append('g').attr('transform', `translate(${M.left},${M.top})`);

  const xS = d3.scaleLinear().domain([0, 100]).range([0, w]);

  const scTT = d3.select('#scatter-tooltip');

  heritages.forEach((h, hi) => {
    const y = hi * (barH + barGap);
    const raw = PEOPLES_CONTEXT[h];
    const total = PEOPLES_CTX_ORDER.reduce((s, k) => s + (raw[k] || 0), 0);

    // Heritage label on left
    g.append('text')
      .attr('x', -8).attr('y', y + barH / 2)
      .attr('text-anchor', 'end').attr('dominant-baseline', 'middle')
      .attr('fill', HC[h]).attr('font-size', '12px').attr('font-weight', '600')
      .text(HL(h));

    // Total count label
    g.append('text')
      .attr('x', -8).attr('y', y + barH / 2 + 13)
      .attr('text-anchor', 'end').attr('dominant-baseline', 'middle')
      .attr('fill', CSS.dim).attr('font-size', '9px')
      .text(tr('textes_peoples_mentions').replace('{n}', total));

    // Stacked segments
    let xOffset = 0;
    PEOPLES_CTX_ORDER.forEach(ctx => {
      const count = raw[ctx] || 0;
      if (count === 0) return;
      const pct = (count / total) * 100;
      const segW = xS(pct);
      const ctxLabel = tr('textes_peoples_ctx_' + ctx);

      g.append('rect')
        .attr('x', xOffset).attr('y', y)
        .attr('width', Math.max(segW, 1)).attr('height', barH)
        .attr('fill', PEOPLES_CTX_COLORS[ctx]).attr('opacity', 0.85)
        .attr('rx', xOffset === 0 ? 3 : 0)
        .style('cursor', 'pointer')
        .on('mouseenter', function(ev) {
          d3.select(this).attr('opacity', 1).attr('stroke', CSS.text).attr('stroke-width', 1);
          scTT.html(
            `<div class="tt-name">${ctxLabel}</div>` +
            `<div style="font-size:0.85rem;margin-top:0.1rem">${HL(h)} : <b>${count}</b> ${tr('textes_peoples_mentions').replace('{n}', count).replace('mentions', '').trim()}</div>` +
            `<div style="font-size:0.78rem;color:var(--dim)">${tr('textes_peoples_pct').replace('{pct}', Math.round(pct))}</div>`
          ).style('opacity', '1').style('left', (ev.clientX + 14) + 'px').style('top', (ev.clientY - 10) + 'px');
        })
        .on('mousemove', function(ev) { scTT.style('left', (ev.clientX + 14) + 'px').style('top', (ev.clientY - 10) + 'px'); })
        .on('mouseleave', function() { d3.select(this).attr('opacity', 0.85).attr('stroke', 'none'); scTT.style('opacity', '0'); });

      // Inline label for segments wide enough
      if (segW > 30) {
        g.append('text')
          .attr('x', xOffset + segW / 2).attr('y', y + barH / 2)
          .attr('text-anchor', 'middle').attr('dominant-baseline', 'middle')
          .attr('fill', '#fff').attr('font-size', '9px').attr('font-weight', '600')
          .attr('pointer-events', 'none')
          .text(Math.round(pct) + '%');
      }

      xOffset += segW;
    });
  });

  // Legend below the chart
  const legDiv = document.createElement('div');
  legDiv.className = 'peoples-legend';
  PEOPLES_CTX_ORDER.forEach(ctx => {
    const totalAcross = (PEOPLES_CONTEXT.francophone[ctx] || 0) + (PEOPLES_CONTEXT.anglophone[ctx] || 0);
    if (totalAcross === 0) return;
    const item = document.createElement('span');
    item.className = 'peoples-legend-item';
    item.innerHTML = `<span class="peoples-legend-swatch" style="background:${PEOPLES_CTX_COLORS[ctx]}"></span>${tr('textes_peoples_ctx_' + ctx)}`;
    legDiv.appendChild(item);
  });
  cont.appendChild(legDiv);
}

// ── SD Grid: sortable table ──────────────────────────────
let sdSortMode = 'heritage';
let sdHeritageFilter = 'all';

function renderSDGrid() {
  const cont = document.getElementById('sd-grid');
  if (!cont) return;
  cont.innerHTML = '';

  const flagCols = ['has_sd', 'has_indivisible', 'has_autonomy', 'has_secession'];
  const colHeaders = [
    tr('textes_sd_col_country'),
    tr('textes_sd_col_sd'),
    tr('textes_sd_col_indiv'),
    tr('textes_sd_col_auton'),
    tr('textes_sd_col_secess'),
    tr('textes_sd_col_posture'),
  ];

  // Filter
  let rows = [...SD_DATA];
  if (sdHeritageFilter !== 'all') {
    if (sdHeritageFilter === 'other') {
      rows = rows.filter(r => r.heritage === 'other' || r.heritage === 'mixed');
    } else {
      rows = rows.filter(r => r.heritage === sdHeritageFilter);
    }
  }

  // Sort
  if (sdSortMode === 'heritage') {
    const hOrder = { francophone: 0, anglophone: 1, lusophone: 2, mixed: 3, other: 4 };
    rows.sort((a, b) => (hOrder[a.heritage] || 9) - (hOrder[b.heritage] || 9) || a.country.localeCompare(b.country));
  } else if (sdSortMode === 'posture') {
    rows.sort((a, b) => POSTURE_ORDER.indexOf(a.posture) - POSTURE_ORDER.indexOf(b.posture) || a.country.localeCompare(b.country));
  } else if (sdSortMode === 'criteria') {
    rows.sort((a, b) => {
      const sA = flagCols.reduce((s, f) => s + (a[f] ? 1 : 0), 0);
      const sB = flagCols.reduce((s, f) => s + (b[f] ? 1 : 0), 0);
      return sB - sA || a.country.localeCompare(b.country);
    });
  }

  function postureLabel(p) { return tr('textes_sd_posture_' + p); }

  // Build table
  let html = '<table>';
  html += '<colgroup><col style="width:180px">';
  flagCols.forEach(() => { html += '<col style="width:70px">'; });
  html += '<col style="width:160px"></colgroup>';

  html += '<thead><tr>';
  colHeaders.forEach((h, i) => { html += `<th>${h}</th>`; });
  html += '</tr></thead><tbody>';

  rows.forEach(r => {
    const hDot = `<span class="hm-heritage-dot" style="background:${HC[r.heritage] || HC.other}"></span>`;
    html += `<tr><td data-country="${r.country}">${hDot}${r.country}</td>`;
    flagCols.forEach(f => {
      const present = r[f];
      html += `<td class="${present ? 'sd-present' : 'sd-absent'}">${present ? 'V' : ''}</td>`;
    });
    html += `<td class="sd-posture">${postureLabel(r.posture)}</td>`;
    html += '</tr>';
  });

  html += '</tbody></table>';
  cont.innerHTML = html;

  // Country click → open bio
  cont.querySelectorAll('td[data-country]').forEach(td => {
    td.addEventListener('click', () => {
      openBio(td.dataset.country);
      document.getElementById('bio-panel').scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function initSDFilters() {
  // Sort buttons
  document.querySelectorAll('[data-sd-sort]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-sd-sort]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      sdSortMode = btn.dataset.sdSort;
      renderSDGrid();
    });
  });
  // Heritage filter buttons
  document.querySelectorAll('[data-sd-hf]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-sd-hf]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      sdHeritageFilter = btn.dataset.sdHf;
      renderSDGrid();
    });
  });
}

// ── Textes tab orchestrator ──────────────────────────────
function renderTextesTab() {
  renderSovereigntyChart();
  renderPeoplesChart();
  renderSDGrid();
}

// ═══════════════════════════════════════════════════════════
// Figures Gallery
// ═══════════════════════════════════════════════════════════
const FIGURE_INDEX = [
  // Ch.1 S1
  {id:'1.1', file:'ch1s1_preamble_sovereignty_identity', ch:'Ch.1 S1', caption_fr:'Préambules : souveraineté vs. identité', caption_en:'Preambles: sovereignty vs. identity'},
  {id:'1.2', file:'ch1s1_preamble_balance', ch:'Ch.1 S1', caption_fr:'Équilibre rhétorique des préambules', caption_en:'Rhetorical balance of preambles'},
  {id:'1.3', file:'ch1s1_sovereignty_markers', ch:'Ch.1 S1', caption_fr:'Marqueurs de souveraineté par héritage', caption_en:'Sovereignty markers by heritage'},
  {id:'1.4', file:'sov_vs_id_choropleth', ch:'Ch.1 S1', caption_fr:'Souveraineté ou identité : carte', caption_en:'Sovereignty vs identity: map'},
  // Ch.1 S2
  {id:'1.5', file:'ch1s2_naming_heatmap', ch:'Ch.1 S2', caption_fr:'Terminologie de nomination', caption_en:'Naming terminology'},
  {id:'1.6', file:'ch1s2_peoples_context', ch:'Ch.1 S2', caption_fr:'Contexte de « peoples »', caption_en:'"peoples" context'},
  {id:'1.7', file:'ch1s2_people_vs_peoples', ch:'Ch.1 S2', caption_fr:'Distribution sémantique de « peoples »', caption_en:'Semantic distribution of "peoples"'},
  // Ch.2 S1
  {id:'2.1', file:'ch2s1_treaty_beeswarm', ch:'Ch.2 S1', caption_fr:'Ratifier n\'est pas reconnaître', caption_en:'Ratification ≠ recognition'},
  // Ch.2 S2
  {id:'2.2', file:'ch2s2_heritage_divergence', ch:'Ch.2 S2', caption_fr:'Divergence héritage (10 dimensions)', caption_en:'Heritage divergence (10 dimensions)'},
  {id:'2.3', file:'ch2s2_correlation_matrix', ch:'Ch.2 S2', caption_fr:'Matrice de corrélation', caption_en:'Correlation matrix'},
  {id:'2.4', file:'ch2s2_score_distribution', ch:'Ch.2 S2', caption_fr:'Écart de reconnaissance', caption_en:'Recognition gap'},
  {id:'2.5', file:'ch2s2_dual_choropleth', ch:'Ch.2 S2', caption_fr:'Carte : identitaire vs institutionnel', caption_en:'Map: identity vs institutional'},
  {id:'2.6', file:'ch2s2_heritage_dumbbell', ch:'Ch.2 S2', caption_fr:'Le fossé identitaire (dumbbell)', caption_en:'The identity gap (dumbbell)'},
  {id:'2.7', file:'ch2s2_heritage_radar', ch:'Ch.2 S2', caption_fr:'Profil constitutionnel (radar)', caption_en:'Constitutional profile (radar)'},
  // Ch.3
  {id:'3.1', file:'ch3_case_law_timeline', ch:'Ch.3', caption_fr:'Chronologie des décisions CADHP', caption_en:'ACHPR decision timeline'},
  {id:'3.2', file:'ch3_article_frequency', ch:'Ch.3', caption_fr:'Fréquence d\'invocation des articles', caption_en:'Article invocation frequency'},
  {id:'3.3', file:'ch3_functional_criterion_emergence', ch:'Ch.3', caption_fr:'Émergence du critère fonctionnel', caption_en:'Functional criterion emergence'},
  // Ch.4
  {id:'4.1', file:'ch4s1_doctrinal_concepts', ch:'Ch.4', caption_fr:'Vocabulaire doctrinal', caption_en:'Doctrinal vocabulary'},
  {id:'4.2', file:'ch4s2_cross_system_citations', ch:'Ch.4', caption_fr:'Citations inter-systémiques', caption_en:'Cross-system citations'},
  {id:'4.3', file:'ch4_landmark_citations', ch:'Ch.4', caption_fr:'Citations de décisions emblématiques', caption_en:'Landmark case citations'},
  // Ch.5
  {id:'5.1', file:'ch5_self_determination_posture', ch:'Ch.5', caption_fr:'Posture d\'autodétermination', caption_en:'Self-determination posture'},
  {id:'5.2', file:'ch5_sd_flags_heatmap', ch:'Ch.5', caption_fr:'Marqueurs d\'autodétermination', caption_en:'Self-determination markers'},
  {id:'5.3', file:'ch5_pre_post_ogiek', ch:'Ch.5', caption_fr:'Avant/après Ogiek (2017)', caption_en:'Before/after Ogiek (2017)'},
  // Ch.7
  {id:'7.1', file:'ch7_land_resources', ch:'Ch.7', caption_fr:'Provisions territoriales', caption_en:'Territorial provisions'},
  // Ch.8
  {id:'8.1', file:'ch8_cultural_rights_depth', ch:'Ch.8', caption_fr:'Profondeur des droits culturels', caption_en:'Cultural rights depth'},
  // Post-conflict
  {id:'T.1', file:'post_conflict_interaction', ch:'Post-conflit', caption_fr:'Interaction héritage × post-conflit', caption_en:'Heritage × post-conflict interaction'},
  {id:'T.2', file:'post_conflict_dimensions', ch:'Post-conflit', caption_fr:'Dimensions × post-conflit', caption_en:'Dimensions × post-conflict'},
  {id:'T.3', file:'post_conflict_outliers_explained', ch:'Post-conflit', caption_fr:'Les anomalies expliquées', caption_en:'Outliers explained'},
  {id:'T.4', file:'post_conflict_mechanism', ch:'Post-conflit', caption_fr:'Mécanisme post-conflit', caption_en:'Post-conflict mechanism'},
  {id:'T.5', file:'overview_choropleth_score', ch:'Post-conflit', caption_fr:'Carte : score + post-conflit', caption_en:'Map: score + post-conflict'},
  // Clustering
  {id:'C.1', file:'clusters_umap_constitutions', ch:'Clustering', caption_fr:'UMAP des constitutions', caption_en:'Constitution UMAP'},
  {id:'C.2', file:'clusters_umap_preambles', ch:'Clustering', caption_fr:'UMAP des préambules', caption_en:'Preamble UMAP'},
  {id:'C.3', file:'clusters_similarity_heatmap', ch:'Clustering', caption_fr:'Matrice de similarité', caption_en:'Similarity matrix'},
  {id:'C.4', file:'clusters_dendrogram_dimensions', ch:'Clustering', caption_fr:'Dendrogramme hiérarchique', caption_en:'Hierarchical dendrogram'},
  // NLP
  {id:'N.1', file:'kwic_customary_context', ch:'NLP', caption_fr:'Contexte de « customary »', caption_en:'"customary" context'},
  {id:'N.2', file:'topics_heritage_heatmap', ch:'NLP', caption_fr:'Topics × héritage', caption_en:'Topics × heritage'},
];

// Featured figures get 2-column span in the mosaic
const FEATURED_FIGURES = new Set([
  'ch2s2_dual_choropleth', 'overview_choropleth_score',
  'ch2s2_heritage_dumbbell', 'ch2s2_heritage_radar'
]);

// Chapter descriptions (methodology + key finding)
const CHAPTER_DESCS = {
  'Ch.1 S1': {
    fr: "Analyse des pr\u00e9ambules constitutionnels par recherche de mots-cl\u00e9s (souverainet\u00e9, indivisibilit\u00e9, identit\u00e9). Le mod\u00e8le jacobin fran\u00e7ais structure la rh\u00e9torique des constitutions francophones.",
    en: "Analysis of constitutional preambles by keyword search (sovereignty, indivisibility, identity). The French Jacobin model structures francophone constitutional rhetoric."
  },
  'Ch.1 S2': {
    fr: "S\u00e9mantique du mot \u00ab peoples \u00bb dans les 54 constitutions. La majorit\u00e9 des occurrences francophones sont des citations de trait\u00e9s, non des droits domestiques.",
    en: "Semantics of the word 'peoples' across 54 constitutions. Most francophone occurrences are treaty citations, not domestic rights."
  },
  'Ch.2 S1': {
    fr: "Corr\u00e9lation entre ratification de trait\u00e9s internationaux et reconnaissance constitutionnelle. R\u00e9sultat : aucune corr\u00e9lation significative (\u03c1 = \u22120,06).",
    en: "Correlation between international treaty ratification and constitutional recognition. Result: no significant correlation (\u03c1 = \u22120.06)."
  },
  'Ch.2 S2': {
    fr: "Analyse multidimensionnelle de la divergence par h\u00e9ritage colonial. L\u2019\u00e9cart francophone-anglophone s\u2019\u00e9largit apr\u00e8s 1990 (\u03b7\u00b2 = 22,3 %).",
    en: "Multidimensional analysis of divergence by colonial heritage. The francophone-anglophone gap widens after 1990 (\u03b7\u00b2 = 22.3%)."
  },
  'Ch.3': {
    fr: "Chronologie et analyse des d\u00e9cisions de la Commission et Cour africaines des droits de l\u2019homme (CADHP). \u00c9mergence du crit\u00e8re fonctionnel.",
    en: "Timeline and analysis of African Commission and Court decisions (ACHPR). Emergence of the functional criterion."
  },
  'Ch.4': {
    fr: "Analyse du vocabulaire doctrinal et des citations inter-syst\u00e9miques dans la jurisprudence africaine des droits des peuples.",
    en: "Analysis of doctrinal vocabulary and cross-system citations in African peoples' rights jurisprudence."
  },
  'Ch.5': {
    fr: "Cartographie de l\u2019autod\u00e9termination dans les 54 constitutions. 8 pays mentionnent l\u2019autod\u00e9termination ; seule l\u2019\u00c9thiopie autorise la s\u00e9cession.",
    en: "Mapping self-determination across 54 constitutions. 8 countries mention self-determination; only Ethiopia allows secession."
  },
  'Ch.7': {
    fr: "Provisions territoriales et fonci\u00e8res dans les constitutions africaines. Le lien terre-identit\u00e9 comme marqueur de reconnaissance.",
    en: "Territorial and land provisions in African constitutions. The land-identity link as a recognition marker."
  },
  'Ch.8': {
    fr: "Profondeur des droits culturels : de la mention symbolique aux garanties justiciables. L\u2019analyse distingue trois niveaux de protection.",
    en: "Cultural rights depth: from symbolic mention to justiciable guarantees. The analysis distinguishes three protection levels."
  },
  'Post-conflit': {
    fr: "Interaction entre h\u00e9ritage colonial et contexte post-conflit. L\u2019effet post-conflit explique 41 % de variance suppl\u00e9mentaire (\u03b7\u00b2 passe de 22 % \u00e0 63 %).",
    en: "Interaction between colonial heritage and post-conflict context. The post-conflict effect explains 41% additional variance (\u03b7\u00b2 goes from 22% to 63%)."
  },
  'Clustering': {
    fr: "Embeddings s\u00e9mantiques (voyage-law-2) et UMAP. Le clustering hi\u00e9rarchique sur 10 dimensions ne reproduit pas l\u2019h\u00e9ritage colonial (ARI = 0,033).",
    en: "Semantic embeddings (voyage-law-2) and UMAP. Hierarchical clustering on 10 dimensions does not reproduce colonial heritage (ARI = 0.033)."
  },
  'NLP': {
    fr: "Analyse KWIC (concordancier) et mod\u00e9lisation de topics sur le corpus constitutionnel. Les th\u00e8mes r\u00e9v\u00e8lent des structures rh\u00e9toriques distinctes par h\u00e9ritage.",
    en: "KWIC (concordance) analysis and topic modeling on the constitutional corpus. Topics reveal distinct rhetorical structures by heritage."
  }
};

// Expandable methodology notes per chapter
const CHAPTER_METHODS = {
  'Ch.1 S1': {
    fr: "Recherche de mots-cl\u00e9s (regex) sur les pr\u00e9ambules : \u00ab sovereignty \u00bb, \u00ab indivisible \u00bb, \u00ab unity \u00bb, \u00ab identity \u00bb, \u00ab diversity \u00bb. Taux de pr\u00e9sence calcul\u00e9s par h\u00e9ritage colonial. Score d\u2019\u00e9quilibre = ratio identit\u00e9/souverainet\u00e9.",
    en: "Keyword search (regex) on preambles: 'sovereignty', 'indivisible', 'unity', 'identity', 'diversity'. Presence rates computed by colonial heritage. Balance score = identity/sovereignty ratio."
  },
  'Ch.1 S2': {
    fr: "Classification manuelle des occurrences de \u00ab peoples \u00bb en 6 cat\u00e9gories s\u00e9mantiques. Validation crois\u00e9e sur un \u00e9chantillon de 10 constitutions.",
    en: "Manual classification of 'peoples' occurrences into 6 semantic categories. Cross-validation on a sample of 10 constitutions."
  },
  'Ch.2 S1': {
    fr: "Corr\u00e9lation de Spearman entre nombre de trait\u00e9s ratifi\u00e9s (6 trait\u00e9s : DNUDPA, PIDCP, PIDESC, CERD, C169, CADHP) et score constitutionnel total. Beeswarm plot pour visualiser la distribution.",
    en: "Spearman correlation between number of ratified treaties (6 treaties: UNDRIP, ICCPR, ICESCR, ICERD, ILO 169, ACHPR) and total constitutional score. Beeswarm plot for distribution visualization."
  },
  'Ch.2 S2': {
    fr: "S\u00e9ries temporelles 1960\u20132026 par h\u00e9ritage. ANOVA \u00e0 deux facteurs (h\u00e9ritage \u00d7 post-conflit). Matrice de corr\u00e9lation de Spearman sur les 10 dimensions. Choropleth bi-dimensionnel (identitaire vs institutionnel).",
    en: "Time series 1960\u20132026 by heritage. Two-way ANOVA (heritage \u00d7 post-conflict). Spearman correlation matrix on 10 dimensions. Bi-dimensional choropleth (identity vs institutional)."
  },
  'Ch.3': {
    fr: "Extraction semi-automatique des d\u00e9cisions de la CADHP citant les droits des peuples (art. 19\u201324 de la Charte africaine). Classification par article invoqu\u00e9 et type de requ\u00e9rant.",
    en: "Semi-automatic extraction of ACHPR decisions citing peoples' rights (art. 19\u201324 of the African Charter). Classification by invoked article and applicant type."
  },
  'Ch.4': {
    fr: "Extraction de termes doctrinaux par TF-IDF. R\u00e9seau de citations inter-syst\u00e9miques (CADHP \u2194 CEDH \u2194 CIDH). Analyse des d\u00e9cisions embl\u00e9matiques (Endorois, Ogiek).",
    en: "Doctrinal term extraction by TF-IDF. Cross-system citation network (ACHPR \u2194 ECHR \u2194 IACHR). Analysis of landmark decisions (Endorois, Ogiek)."
  },
  'Ch.5': {
    fr: "Recherche de mots-cl\u00e9s : \u00ab self-determination \u00bb, \u00ab secession \u00bb, \u00ab autonomy \u00bb, \u00ab indivisible \u00bb. Classification en 7 postures constitutionnelles.",
    en: "Keyword search: 'self-determination', 'secession', 'autonomy', 'indivisible'. Classification into 7 constitutional postures."
  },
  'Ch.7': {
    fr: "Codage binaire des provisions territoriales (terre communautaire, droit foncier coutumier, ressources naturelles). Analyse par h\u00e9ritage et statut post-conflit.",
    en: "Binary coding of territorial provisions (communal land, customary land law, natural resources). Analysis by heritage and post-conflict status."
  },
  'Ch.8': {
    fr: "Codage en trois niveaux (absent / mention / garantie justiciable) des droits culturels. Analyse de la profondeur institutionnelle associ\u00e9e.",
    en: "Three-level coding (absent / mention / justiciable guarantee) of cultural rights. Analysis of associated institutional depth."
  },
  'Post-conflit': {
    fr: "Variable binaire (post-conflit oui/non). Test de Mann-Whitney et ANOVA \u00e0 deux facteurs. Taille d\u2019effet : \u03b7\u00b2 héritage = 22 %, \u03b7\u00b2 h\u00e9ritage + post-conflit = 63 %.",
    en: "Binary variable (post-conflict yes/no). Mann-Whitney test and two-way ANOVA. Effect size: \u03b7\u00b2 heritage = 22%, \u03b7\u00b2 heritage + post-conflict = 63%."
  },
  'Clustering': {
    fr: "Embeddings voyage-law-2 (1024 dim). R\u00e9duction UMAP (2D). Clustering hi\u00e9rarchique Ward sur les 10 dimensions cod\u00e9es. M\u00e9trique : Adjusted Rand Index vs h\u00e9ritage colonial.",
    en: "Voyage-law-2 embeddings (1024 dim). UMAP reduction (2D). Ward hierarchical clustering on 10 coded dimensions. Metric: Adjusted Rand Index vs colonial heritage."
  },
  'NLP': {
    fr: "Concordancier KWIC sur \u00ab customary \u00bb avec fen\u00eatre de \u00b110 mots. Mod\u00e9lisation de topics (LDA, k=8) sur les constitutions compl\u00e8tes.",
    en: "KWIC concordance on 'customary' with \u00b110-word window. Topic modeling (LDA, k=8) on full constitutions."
  }
};

function renderFigures() {
  const container = document.getElementById('figures-gallery');
  if (!container) return;

  // Group figures by chapter
  const groups = [];
  const groupMap = new Map();
  for (const fig of FIGURE_INDEX) {
    if (!groupMap.has(fig.ch)) {
      const group = { ch: fig.ch, figures: [] };
      groups.push(group);
      groupMap.set(fig.ch, group);
    }
    groupMap.get(fig.ch).figures.push(fig);
  }

  container.classList.add('figures-gallery');

  for (const group of groups) {
    // Chapter heading
    const h3 = document.createElement('h3');
    h3.textContent = group.ch;
    container.appendChild(h3);

    // Chapter description
    const desc = CHAPTER_DESCS[group.ch];
    if (desc) {
      const descEl = document.createElement('div');
      descEl.className = 'chapter-desc';
      descEl.textContent = lang === 'fr' ? desc.fr : desc.en;
      container.appendChild(descEl);
    }

    // Methodology toggle
    const method = CHAPTER_METHODS[group.ch];
    if (method) {
      const toggleBtn = document.createElement('button');
      toggleBtn.className = 'method-toggle';
      toggleBtn.textContent = tr('fig_method_toggle');
      const detailEl = document.createElement('div');
      detailEl.className = 'method-detail';
      detailEl.textContent = lang === 'fr' ? method.fr : method.en;
      toggleBtn.addEventListener('click', () => {
        detailEl.classList.toggle('open');
        toggleBtn.textContent = detailEl.classList.contains('open') ? tr('fig_method_toggle_close') : tr('fig_method_toggle');
      });
      container.appendChild(toggleBtn);
      container.appendChild(detailEl);
    }

    for (const fig of group.figures) {
      const card = document.createElement('div');
      card.className = 'fig-gallery-card';
      if (FEATURED_FIGURES.has(fig.file)) {
        card.classList.add('featured');
      }

      const img = document.createElement('img');
      img.src = `figures/${fig.file}.png`;
      img.alt = lang === 'fr' ? fig.caption_fr : (fig.caption_en || fig.caption_fr);
      img.loading = 'lazy';
      img.addEventListener('click', () => window.open(img.src, '_blank'));

      const num = document.createElement('div');
      num.className = 'fig-num';
      num.textContent = `Figure ${fig.id}`;

      const caption = document.createElement('div');
      caption.className = 'fig-caption';
      caption.textContent = lang === 'fr' ? fig.caption_fr : (fig.caption_en || fig.caption_fr);

      const dl = document.createElement('a');
      dl.className = 'fig-dl';
      dl.href = `figures/${fig.file}.pdf`;
      dl.download = '';
      dl.textContent = tr('fig_download');

      card.appendChild(img);
      card.appendChild(num);
      card.appendChild(caption);
      card.appendChild(dl);
      container.appendChild(card);
    }
  }
}

// ─── Init ──────────────────────────────────────────────────
renderScale();
buildDimBtns();
buildModeSwitch();
initSlider();
initMap().then(() => {
  renderUMAP();
  renderDendrogram();
  renderClusterMap();
  renderFigures();
  // Re-render conflict mini-map now that geoData is available
  renderConflictTab();
}).catch(err => {
  document.getElementById('loading').innerHTML = `<span style="color:${CSS.anglophone}">${tr('error_prefix')} : ${err.message}</span>`;
});
renderHeatmap();
initHeatmapFilters();
renderDivergence();
renderScatter();
initScatterFilters();
renderConflictTab();
renderTextesTab();
initSDFilters();
