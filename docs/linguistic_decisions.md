# Linguistic Decisions and Caveats

## Language Map of the Project

| Component | Language | Source | Notes |
|-----------|----------|--------|-------|
| Source spreadsheet | **French** | Alex's coding | Column names, COMMENTAIRE, dimension codes (F, Dc, Drm...), country names, ratification data |
| Constitution PDFs | **English** | constituteproject.org translations | Originally written in French, English, Portuguese, Arabic, Amharic, etc. — all are English translations |
| Dashboard UI | **French** | Designed for PhD committee | Titles, labels, tooltips, explainer text, footer |
| KB files (CLAUDE.md etc.) | **English** | For Claude Code | Project documentation |
| EDA notebooks | **English** | Analysis commentary | Code comments, markdown cells |
| Thesis figures (M2) | **French** | For thesis PDF | Axis labels, titles, legends |
| Country names in data.js | **French** | From spreadsheet | e.g. "Côte d'Ivoire", "Éthiopie" |
| Country names in PDF filenames | **English** | From constituteproject.org | e.g. "Cote_DIvoire", "Ethiopia" |
| Heritage group labels | **Both** | Same in both languages | francophone, anglophone, lusophone |

## Critical Caveat: English Translations

**The entire M2 text analysis operates on English translations, not original texts.**

The 54 PDFs from constituteproject.org are English translations of constitutions originally written in:
- **French** (23 francophone countries)
- **English** (19 anglophone countries — these are the ONLY originals)
- **Portuguese** (5 lusophone countries)
- **Arabic** (several North/East African countries)
- **Amharic** (Ethiopia)
- **Other** (Swahili, Somali, etc.)

### What this means for keyword analysis

1. **"people" vs "peoples"**: We found francophone constitutions use BOTH forms more than anglophone ones. This is a **translation artifact** — French "le peuple" → "the people" and "les peuples" → "peoples" carry over directly. The raw frequency doesn't distinguish sovereignty from rights-bearing contexts. Only anglophone constitutions are being analyzed in their original language.

2. **"indivisible"**: Happens to be the same word in French and English, so the translation is transparent. The 70% francophone vs 21% anglophone finding is reliable.

3. **"self-determination"**: French "autodétermination" → "self-determination" is a clean translation. The 8/54 count is reliable.

4. **"sovereignty", "unity"**: French "souveraineté" → "sovereignty", "unité" → "unity" — clean translations. Frequency comparison between heritage groups is valid.

5. **"customary", "traditional"**: French "coutumier" → "customary", "traditionnel" → "traditional" — but translation choices may vary. An anglophone constitution written in English uses "customary law" as a legal term of art; a translated francophone constitution might use "customary" differently.

6. **"ethnic", "tribe"**: French "ethnie" → "ethnic", "tribu" → "tribe" — but English-original anglophone constitutions may use different terminology than translations of French texts. The COMMENTAIRE analysis (in French) is more reliable for cross-heritage comparison because it's all in the same language (Alex's coding notes).

### Reliable analyses

- **COMMENTAIRE keyword analysis** (EDA M1a) — all in French, written by the same coder. Cross-heritage comparison is valid.
- **"indivisible" presence/absence** — same word in both languages. Binary detection is reliable.
- **Self-determination classification** — "self-determination" is a technical legal term with consistent translation.
- **Sovereignty markers** — "sovereignty", "unity", "indivisible" are technical legal terms.
- **Structural metrics** — document length, preamble presence/absence, article counts.

### Analyses requiring caution

- **"people" vs "peoples" frequency comparison across heritage groups** — translation artifact. Already flagged in M2 Figure 5.
- **"ethnic", "tribe", "community" frequency comparison** — translation choices vary. Use for within-heritage analysis or as rough indicators, not for precise cross-heritage comparison.
- **"customary", "traditional" frequency** — legal term usage differs between original and translated texts.
- **Any fine-grained word frequency comparison between francophone and anglophone groups** — only the 19 anglophone constitutions are in their original language.

### Mitigation strategies

1. **For the thesis**: Clearly state that analyses are based on English translations from constituteproject.org. Acknowledge translation artifacts.
2. **For stronger results**: Complement NLP on English translations with the COMMENTAIRE analysis (French, all from the same coder).
3. **For future work**: Analyze original-language texts where available (the French originals exist on constituteproject.org but were not downloaded).
4. **Binary over continuous**: Presence/absence of a term is more reliable than frequency comparison across languages.

## Country Name Mapping

Two naming systems coexist:
- **French** (spreadsheet, data.js, dashboard): "Côte d'Ivoire", "République centrafricaine"
- **English** (PDF filenames, notebook analysis): "Cote DIvoire", "Central African Republic"

Resolved by `scripts/country_mapping.json` (54 entries). All notebooks and scripts must use this mapping.

## Dashboard Language

The dashboard is in **French** for the PhD committee audience. All UI text, tooltips, and explainer blocks are in French. This is intentional and documented in CLAUDE.md ("Academic tone").

The thesis figures (M2, matplotlib) use **French** axis labels and titles, matching the dashboard language.
