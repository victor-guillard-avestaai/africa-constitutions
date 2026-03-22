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
    traites_explain: "<strong>Axe horizontal</strong> = nombre de traités internationaux ratifiés (DNUDPA, PIDCP, PIDESC, CERD, C169, CADHP).<br><strong>Axe vertical</strong> = score constitutionnel total (somme des 10 dimensions, 0 = tout absent, 20 = tout reconnu).<br><strong>La ligne horizontale</strong> représente le score moyen. L'absence de pente confirme l'absence de corrélation.<br><strong>Forme</strong> : ● = constitution non-conflit, ◆ = constitution post-conflit.<br><strong>Constat frappant</strong> : presque tous les pays ont ratifié la CADHP (53/54) et la DNUDPA (52/54), mais un seul (la RCA) a ratifié la Convention 169 de l'OIT sur les peuples autochtones — les régimes internationaux ne prédisent pas la réalité constitutionnelle.",

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

    // Clusters tab
    clusters_title: "Clustering constitutionnel",
    clusters_explain: "<strong>Méthode</strong> : les 54 constitutions sont plongées dans un espace sémantique (embeddings voyage-law-2, 1024 dimensions) puis projetées en 2D (UMAP). Le clustering hiérarchique (Ward) sur les 10 dimensions codées révèle des groupes qui ne reproduisent PAS l'héritage colonial (ARI = 0,033).",
    clusters_umap_title: "Carte de proximité sémantique",
    clusters_dendro_title: "Classification hiérarchique interactive",
    clusters_dendro_explain: "Déplacez le curseur de droite à gauche. À droite, toute l'Afrique forme un seul groupe. En déplaçant vers la gauche, les constitutions différentes se séparent en groupes distincts. La carte montre quels pays restent ensemble.",
    btn_constitutions: "Constitutions",
    btn_preambles: "Préambules",

    // Figures tab
    figures_title: "Figures de la thèse",
    figures_sub: "36 figures organisées par chapitre. Cliquez sur une image pour l'agrandir. Téléchargez le PDF haute résolution via le bouton ⬇.",
    fig_download: "⬇ PDF",

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
    traites_explain: "<strong>Horizontal axis</strong> = number of ratified international treaties (UNDRIP, ICCPR, ICESCR, ICERD, ILO 169, ACHPR).<br><strong>Vertical axis</strong> = total constitutional score (sum of 10 dimensions, 0 = all absent, 20 = all recognized).<br><strong>Horizontal line</strong> = column mean score. The flat line confirms the absence of correlation.<br><strong>Shape</strong>: ● = non-conflict constitution, ◆ = post-conflict constitution.<br><strong>Striking finding</strong>: almost all countries ratified the ACHPR (53/54) and UNDRIP (52/54), but only one (CAR) ratified ILO Convention 169 on indigenous peoples — international regimes do not predict constitutional reality.",

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

    // Clusters tab
    clusters_title: "Constitutional clustering",
    clusters_explain: "<strong>Method</strong>: the 54 constitutions are embedded in a semantic space (voyage-law-2, 1024 dimensions) then projected to 2D (UMAP). Hierarchical clustering (Ward) on the 10 coded dimensions reveals groups that do NOT reproduce colonial heritage (ARI = 0.033).",
    clusters_umap_title: "Semantic proximity map",
    clusters_dendro_title: "Interactive hierarchical classification",
    clusters_dendro_explain: "Drag the slider from right to left. On the right, all of Africa forms one group. Moving left, constitutions that are different separate into distinct groups. The map shows which countries stay together.",
    btn_constitutions: "Constitutions",
    btn_preambles: "Preambles",

    // Figures tab
    figures_title: "Thesis figures",
    figures_sub: "36 figures organized by chapter. Click an image to enlarge. Download high-resolution PDF via the ⬇ button.",
    fig_download: "⬇ PDF",

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
  document.getElementById('conflict-chart-container').innerHTML = '';
  renderConflictChart();
  document.getElementById('figures-gallery').innerHTML = '';
  document.getElementById('figures-gallery').classList.remove('figures-gallery');
  renderFigures();
  renderHeatmap();
  renderLegend2D();
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
let hmFilter = 'all';

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

  // Filter
  if (hmFilter === 'post-conflict') rows = rows.filter(r => r._postConflict);
  else if (hmFilter === 'non-conflict') rows = rows.filter(r => !r._postConflict);
  else if (hmFilter !== 'all') rows = rows.filter(r => r._heritage === hmFilter);

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
  document.querySelectorAll('.hm-sort-btn').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.hm-sort-btn').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      hmFilter = b.dataset.hf;
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

  // Dots — circles for non-conflict, diamonds for post-conflict
  const diamond = d3.symbol().type(d3.symbolDiamond).size(R * R * 3.5);
  const circle = d3.symbol().type(d3.symbolCircle).size(R * R * 3.14);

  g.selectAll('path.scatter-dot').data(countries).join('path')
    .attr('class','scatter-dot')
    .attr('d', d => d.postConflict ? diamond() : circle())
    .attr('transform', d => `translate(${d.x},${d.y})`)
    .attr('fill', d => HC[d.heritage] || HC.other)
    .attr('opacity', 0.85)
    .attr('stroke','rgba(0,0,0,0.15)').attr('stroke-width',0.5)
    .style('cursor', 'pointer')
    .on('mouseenter', function(ev, d) {
      d3.select(this).attr('opacity',1).attr('d', d.postConflict ? d3.symbol().type(d3.symbolDiamond).size(R*R*7)() : d3.symbol().type(d3.symbolCircle).size(R*R*7)());
      scTT.html(
        `<div class="tt-name">${d.name}</div>` +
        `<div style="font-size:0.8rem;margin-top:0.15rem">${tr('constitutional_score')} : <b>${d.totalScore}</b>/20</div>` +
        `<div style="font-size:0.8rem">${tr('treaties_ratified')} : <b>${d.treatyCount}</b>/6</div>` +
        `<div style="font-size:0.72rem;color:var(--dim);margin-top:0.15rem">${HL(d.heritage)}${d.postConflict ? ' · ' + tr('postconflict_constitution') : ''}</div>` +
        `<div style="font-size:0.7rem;color:var(--dim);margin-top:0.2rem;font-style:italic">${tr('click_open')}</div>`
      ).style('opacity','1').style('left',(ev.clientX+14)+'px').style('top',(ev.clientY-10)+'px');
    })
    .on('mousemove', function(ev) { scTT.style('left',(ev.clientX+14)+'px').style('top',(ev.clientY-10)+'px'); })
    .on('mouseleave', function(ev, d) { d3.select(this).attr('opacity',0.85).attr('d', d.postConflict ? diamond() : circle()); scTT.style('opacity','0'); })
    .on('click', function(ev, d) { scTT.style('opacity','0'); openBio(d.name); });

}

// ─── Post-Conflict Interaction Chart ──────────────────────
function renderConflictChart() {
  if (!DATA.post_conflict) return;
  const cont = document.getElementById('conflict-chart-container');
  if (!cont) return;

  const cLabels = tr('conflict_labels');
  const groups = [
    { label: cLabels[0], heritage: 'francophone', pc: false },
    { label: cLabels[1], heritage: 'francophone', pc: true },
    { label: cLabels[2], heritage: 'anglophone', pc: false },
    { label: cLabels[3], heritage: 'anglophone', pc: true },
  ];

  groups.forEach(g => {
    const countries = DATA.feature_matrix.filter(r => {
      const h = DATA.colonial_heritage[r.PAYS] || 'other';
      const pc = DATA.post_conflict[r.PAYS] || false;
      return h === g.heritage && pc === g.pc;
    });
    g.scores = countries.map(r => DATA.features.reduce((s, f) => s + r[f], 0));
    g.mean = g.scores.length ? d3.mean(g.scores) : 0;
    g.n = countries.length;
    g.countries = countries.map(r => r.PAYS);
  });

  const M = { top: 30, right: 20, bottom: 60, left: 50 };
  const w = 500, h = 320;

  const svg = d3.select(cont).append('svg')
    .attr('viewBox', `0 0 ${w + M.left + M.right} ${h + M.top + M.bottom}`)
    .style('max-width', '650px');

  const g = svg.append('g').attr('transform', `translate(${M.left},${M.top})`);
  const yS = d3.scaleLinear().domain([0, 20]).range([h, 0]);
  const xS = d3.scaleBand().domain(groups.map(gr => gr.label)).range([0, w]).padding(0.25);

  g.append('g').call(d3.axisLeft(yS).ticks(10).tickSize(-w))
    .selectAll('text').attr('fill', CSS.dim).attr('font-size', '11px');
  g.selectAll('.domain').remove();
  g.selectAll('.tick line').attr('stroke', CSS.axisGrid);

  g.append('text').attr('transform', 'rotate(-90)').attr('x', -h / 2).attr('y', -38)
    .attr('text-anchor', 'middle').attr('fill', CSS.muted).attr('font-size', '11px')
    .text(tr('conflict_ylabel'));

  const scTT = d3.select('#scatter-tooltip');

  g.selectAll('rect.conflict-bar').data(groups).join('rect')
    .attr('class', 'conflict-bar')
    .attr('x', d => xS(d.label))
    .attr('y', d => yS(d.mean))
    .attr('width', xS.bandwidth())
    .attr('height', d => h - yS(d.mean))
    .attr('fill', d => HC[d.heritage] || HC.other)
    .attr('opacity', d => d.pc ? 1 : 0.5)
    .attr('rx', 3)
    .style('cursor', 'pointer')
    .on('mouseenter', function(ev, d) {
      scTT.html(
        `<div class="tt-name">${d.label.replace('\n', ' ')}</div>` +
        `<div style="font-size:0.8rem">${tr('mean_score')} : <b>${d.mean.toFixed(1)}</b>/20 (n=${d.n})</div>` +
        `<div style="font-size:0.72rem;color:var(--dim);margin-top:0.2rem">${d.countries.join(', ')}</div>`
      ).style('opacity', '1').style('left', (ev.clientX + 14) + 'px').style('top', (ev.clientY - 10) + 'px');
    })
    .on('mousemove', function(ev) { scTT.style('left', (ev.clientX + 14) + 'px').style('top', (ev.clientY - 10) + 'px'); })
    .on('mouseleave', function() { scTT.style('opacity', '0'); });

  // Value labels on bars
  g.selectAll('text.bar-val').data(groups).join('text')
    .attr('x', d => xS(d.label) + xS.bandwidth() / 2)
    .attr('y', d => yS(d.mean) - 6)
    .attr('text-anchor', 'middle').attr('fill', CSS.text).attr('font-size', '12px').attr('font-weight', '600')
    .text(d => d.mean.toFixed(1));

  // n= labels
  g.selectAll('text.bar-n').data(groups).join('text')
    .attr('x', d => xS(d.label) + xS.bandwidth() / 2)
    .attr('y', h + 16)
    .attr('text-anchor', 'middle').attr('fill', CSS.dim).attr('font-size', '9px')
    .text(d => `n=${d.n}`);

  // X-axis labels (multi-line)
  g.selectAll('text.bar-label').data(groups).join('text')
    .attr('x', d => xS(d.label) + xS.bandwidth() / 2)
    .attr('y', h + 35)
    .attr('text-anchor', 'middle').attr('fill', CSS.muted).attr('font-size', '10px')
    .each(function(d) {
      const lines = d.label.split('\n');
      d3.select(this).selectAll('tspan').data(lines).join('tspan')
        .attr('x', xS(d.label) + xS.bandwidth() / 2)
        .attr('dy', (_, i) => i === 0 ? 0 : '1.1em')
        .text(t => t);
    });
}

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

    // Hover tooltip
    g.on('mouseover', (event) => {
      const tt = document.getElementById('tooltip');
      tt.style.display = 'block';
      tt.style.opacity = '1';
      tt.innerHTML = `<strong>${p.name}</strong><br>${HL(DATA.colonial_heritage[p.name] || 'other')}${pc?' &middot; ' + tr('postconflict_label'):''}`;
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
const CLUSTER_COLORS = ['#5b9bd5','#ed7d31','#70ad47','#ffc000','#9b59b6','#e74c3c','#1abc9c','#95a5a6'];
let clusterMapPaths = null;

function renderClusterMap() {
  const container = document.getElementById('cluster-map-container');
  if (!container) return;
  container.innerHTML = '';

  // Reuse geoData fetched by the main map if available; otherwise wait
  if (!geoData) {
    // Retry once geoData is loaded (initMap sets it)
    let retries = 0;
    const maxRetries = 50; // 50 × 200ms = 10s max
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
  const w = 380, h = 400;
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
    .attr('stroke-width', 0.5);
}

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

  // Update companion map
  if (clusterMapPaths) {
    clusterMapPaths.attr('fill', d => {
      const iso = d.properties.ISO_A3;
      // Also check ADM0_A3 for countries where ISO_A3 is -99
      const isoCheck = iso !== '-99' ? iso : d.properties.ADM0_A3;
      const name = Object.entries(DATA.name_to_iso).find(([n, i]) => i === isoCheck);
      if (!name) return '#eee';
      const clusterId = clusterMap[name[0]];
      return clusterId !== undefined ? CLUSTER_COLORS[clusterId % CLUSTER_COLORS.length] : '#eee';
    });
  }

  // Update dendrogram link colors based on clusters
  d3.selectAll('.dendro-link').attr('stroke', '#999');
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
    const h3 = document.createElement('h3');
    h3.textContent = group.ch;
    container.appendChild(h3);

    for (const fig of group.figures) {
      const card = document.createElement('div');
      card.className = 'fig-gallery-card';

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
}).catch(err => {
  document.getElementById('loading').innerHTML = `<span style="color:${CSS.anglophone}">${tr('error_prefix')} : ${err.message}</span>`;
});
renderHeatmap();
initHeatmapFilters();
renderDivergence();
renderScatter();
renderConflictChart();
