"""
Prepare all data needed for the interactive African constitutions visualization.
Reads the xlsx, builds country timelines with forward-fill feature logic,
adds colonial heritage and ISO codes, pre-computes heritage divergence series.
Outputs app_data.json.
"""

import json
import os
import re

import pandas as pd

# ─── Load and clean ───────────────────────────────────────────────────────────

df = pd.read_excel("tableau_constit_pays_af_complet_copie.xlsx")
df["PAYS"] = df["PAYS"].ffill()

FEATURES = ["F", "Dc", "Drm", "La", "Drc", "Dpa", "Dis", "Id", "Dau", "PJ"]
FEATURE_LABELS = {
    "F": "Fédéralisme",
    "Dc": "Décentralisation",
    "Drm": "Droits des minorités",
    "La": "Langues",
    "Drc": "Droits culturels",
    "Dpa": "Droits peuples autochtones",
    "Dis": "Anti-discrimination",
    "Id": "Identité",
    "Dau": "Autonomie",
    "PJ": "Pluralisme juridique",
}

# ─── ISO A3 mapping ──────────────────────────────────────────────────────────

NAME_TO_ISO = {
    "Algérie": "DZA",
    "Afrique du Sud": "ZAF",
    "Angola": "AGO",
    "Bénin": "BEN",
    "Botswana": "BWA",
    "Burkina Faso": "BFA",
    "Burundi": "BDI",
    "Cameroun": "CMR",
    "Cap-Vert": "CPV",
    "République centrafricaine": "CAF",
    "Comores": "COM",
    "République du Congo": "COG",
    "République démocratique du Congo": "COD",
    "Côte d'Ivoire": "CIV",
    "Djibouti": "DJI",
    "Égypte": "EGY",
    "Érythrée": "ERI",
    "Eswatini": "SWZ",
    "Éthiopie": "ETH",
    "Gabon": "GAB",
    "Gambie": "GMB",
    "Ghana": "GHA",
    "Guinée": "GIN",
    "Guinée-Bissau": "GNB",
    "Guinée Équatoriale": "GNQ",
    "Kenya": "KEN",
    "Lesotho": "LSO",
    "Libéria": "LBR",
    "Libye": "LBY",
    "Madagascar": "MDG",
    "Malawi": "MWI",
    "Mali": "MLI",
    "Maroc": "MAR",
    "Maurice": "MUS",
    "Mauritanie": "MRT",
    "Mozambique": "MOZ",
    "Namibie": "NAM",
    "Niger": "NER",
    "Nigéria": "NGA",
    "Ouganda": "UGA",
    "Rwanda": "RWA",
    "Sao Tomé-et-Príncipe": "STP",
    "Sénégal": "SEN",
    "Seychelles": "SYC",
    "Sierra Leone": "SLE",
    "Somalie": "SOM",
    "Soudan": "SDN",
    "Soudan du Sud": "SSD",
    "Tanzanie": "TZA",
    "Tchad": "TCD",
    "Togo": "TGO",
    "Tunisie": "TUN",
    "Zambie": "ZMB",
    "Zimbabwe": "ZWE",
    "République sahraouie": "ESH",
}

# ─── Colonial heritage ───────────────────────────────────────────────────────

COLONIAL_HERITAGE = {
    "Algérie": "francophone",
    "Afrique du Sud": "anglophone",
    "Angola": "lusophone",
    "Bénin": "francophone",
    "Botswana": "anglophone",
    "Burkina Faso": "francophone",
    "Burundi": "francophone",
    "Cameroun": "mixed",
    "Cap-Vert": "lusophone",
    "République centrafricaine": "francophone",
    "Comores": "francophone",
    "République du Congo": "francophone",
    "République démocratique du Congo": "francophone",
    "Côte d'Ivoire": "francophone",
    "Djibouti": "francophone",
    "Égypte": "anglophone",
    "Érythrée": "other",
    "Eswatini": "anglophone",
    "Éthiopie": "other",
    "Gabon": "francophone",
    "Gambie": "anglophone",
    "Ghana": "anglophone",
    "Guinée": "francophone",
    "Guinée-Bissau": "lusophone",
    "Guinée Équatoriale": "other",
    "Kenya": "anglophone",
    "Lesotho": "anglophone",
    "Libéria": "other",
    "Libye": "other",
    "Madagascar": "francophone",
    "Malawi": "anglophone",
    "Mali": "francophone",
    "Maroc": "francophone",
    "Maurice": "anglophone",
    "Mauritanie": "francophone",
    "Mozambique": "lusophone",
    "Namibie": "anglophone",
    "Niger": "francophone",
    "Nigéria": "anglophone",
    "Ouganda": "anglophone",
    "Rwanda": "francophone",
    "Sao Tomé-et-Príncipe": "lusophone",
    "Sénégal": "francophone",
    "Seychelles": "francophone",
    "Sierra Leone": "anglophone",
    "Somalie": "other",
    "Soudan": "anglophone",
    "Soudan du Sud": "anglophone",
    "Tanzanie": "anglophone",
    "Tchad": "francophone",
    "Togo": "francophone",
    "Tunisie": "francophone",
    "Zambie": "anglophone",
    "Zimbabwe": "anglophone",
    "République sahraouie": "other",
}

# ─── Regions ─────────────────────────────────────────────────────────────────

REGIONS = {
    "Afrique du Nord": [
        "Algérie", "Égypte", "Libye", "Maroc", "Tunisie", "Mauritanie", "Soudan",
    ],
    "Afrique de l'Ouest": [
        "Bénin", "Burkina Faso", "Cap-Vert", "Côte d'Ivoire", "Gambie", "Ghana",
        "Guinée", "Guinée-Bissau", "Libéria", "Mali", "Niger", "Nigéria",
        "Sénégal", "Sierra Leone", "Togo",
    ],
    "Afrique Centrale": [
        "Cameroun", "République centrafricaine", "République du Congo",
        "République démocratique du Congo", "Gabon", "Guinée Équatoriale",
        "Tchad", "Sao Tomé-et-Príncipe",
    ],
    "Afrique de l'Est": [
        "Burundi", "Comores", "Djibouti", "Érythrée", "Éthiopie", "Kenya",
        "Madagascar", "Maurice", "Mozambique", "Ouganda", "Rwanda", "Seychelles",
        "Somalie", "Soudan du Sud", "Tanzanie",
    ],
    "Afrique Australe": [
        "Afrique du Sud", "Angola", "Botswana", "Eswatini", "Lesotho",
        "Malawi", "Namibie", "Zambie", "Zimbabwe",
    ],
}

COUNTRY_REGION = {}
for region, countries in REGIONS.items():
    for c in countries:
        COUNTRY_REGION[c] = region


# ─── Year extraction ─────────────────────────────────────────────────────────

def extract_year(d):
    if pd.isna(d):
        return None
    m = re.search(r"(\d{4})", str(d))
    return int(m.group(1)) if m else None


# ─── Feature parsing ─────────────────────────────────────────────────────────

def parse_features(text):
    """Parse the CARACTÈRES DU SYSTÈME column.
    Returns (is_full_block, features_dict).
    A full block has 5+ features assigned. Otherwise it's a delta.
    """
    if pd.isna(text):
        return False, {}
    result = {}
    for feat in FEATURES:
        # Match "F = V" or "F = X → P" (take last value after arrow)
        pattern = rf"\b{re.escape(feat)}\s*=\s*(?:[XPV]\s*→\s*)?([XPV])"
        matches = re.findall(pattern, text)
        if matches:
            result[feat] = matches[-1]
    is_full = len(result) >= 5
    return is_full, result


# ─── Treaty ratification parsing ─────────────────────────────────────────────

TREATIES = ["DNUDPA", "PIDCP", "PIDESC", "CERD", "C169", "CADHP"]
TREATY_LABELS = {
    "DNUDPA": "UNDRIP",
    "PIDCP": "ICCPR",
    "PIDESC": "ICESCR",
    "CERD": "ICERD",
    "C169": "ILO 169",
    "CADHP": "ACHPR",
}


def parse_ratifications(text):
    if pd.isna(text):
        return {}
    result = {}
    for t in TREATIES:
        pattern = rf"{re.escape(t)}\s*=\s*(X|P|V)"
        m = re.search(pattern, str(text))
        if m:
            result[t] = m.group(1)
    return result


# ─── Build country timelines with forward-fill ───────────────────────────────

country_timelines = {}
ratif_data = {}

for country, group in df.groupby("PAYS"):
    if country == "République sahraouie":
        continue  # Only one empty row

    events = []
    running_state = {f: "X" for f in FEATURES}  # Start with all absent

    for _, row in group.iterrows():
        year = extract_year(row["DATE"])
        is_full, feats = parse_features(row.get("CARACTÈRES DU SYSTÈME"))

        if is_full:
            # Full snapshot: replace running state entirely
            for f in FEATURES:
                running_state[f] = feats.get(f, running_state[f])
        elif feats:
            # Delta: apply changes on top
            for f, v in feats.items():
                running_state[f] = v

        # Parse ratifications (only on rows that have them)
        rats = parse_ratifications(row.get("ÉTAT DES RATIFICATIONS"))
        if rats:
            ratif_data[country] = rats

        comment = row.get("COMMENTAIRE", "")
        if pd.isna(comment):
            comment = ""

        name = row.get("CONSTITUTION OU LOI DE RÉVISION", "")
        if pd.isna(name):
            name = ""

        events.append({
            "year": year,
            "name": str(name).replace("\n", " "),
            "date_raw": str(row.get("DATE", "")) if not pd.isna(row.get("DATE")) else "",
            "comment": str(comment).replace("\n", " "),
            "features": dict(running_state),
            "has_feature_data": bool(feats),
        })

    country_timelines[country] = events


# ─── Compute latest feature matrix ──────────────────────────────────────────

feature_matrix = []
for country, events in country_timelines.items():
    # Take the last event with feature data
    last_feats = events[-1]["features"] if events else {f: "X" for f in FEATURES}
    row = {"PAYS": country, "iso": NAME_TO_ISO.get(country, "")}
    for f in FEATURES:
        val = last_feats.get(f, "X")
        row[f] = 2 if val == "V" else (1 if val == "P" else 0)
        row[f"{f}_label"] = val
    feature_matrix.append(row)


# ─── Compute heritage divergence time series ────────────────────────────────

heritage_groups = {}
for country, heritage in COLONIAL_HERITAGE.items():
    if heritage in ("francophone", "anglophone", "lusophone"):
        heritage_groups.setdefault(heritage, []).append(country)

# For each year 1960..2026, for each heritage group, for each feature:
# average score across countries in that group (using last known state)
heritage_divergence = {f: {} for f in FEATURES}

for feat in FEATURES:
    for hgroup, countries in heritage_groups.items():
        series = []
        for year in range(1960, 2027):
            scores = []
            for c in countries:
                if c not in country_timelines:
                    continue
                # Find last event with year <= current year
                state = None
                for ev in country_timelines[c]:
                    if ev["year"] is not None and ev["year"] <= year:
                        state = ev["features"]
                if state:
                    val = state.get(feat, "X")
                    scores.append(2 if val == "V" else (1 if val == "P" else 0))
            avg = sum(scores) / len(scores) if scores else 0
            series.append([year, round(avg, 3)])
        heritage_divergence[feat][hgroup] = series


# ─── Compute adoption over time (cumulative countries with V or P) ───────────

adoption = {}
for feat in FEATURES:
    country_latest = {}
    yearly = {}
    for year in range(1960, 2027):
        for c, events in country_timelines.items():
            for ev in events:
                if ev["year"] is not None and ev["year"] == year:
                    val = ev["features"].get(feat, "X")
                    country_latest[c] = 2 if val == "V" else (1 if val == "P" else 0)
        count = sum(1 for v in country_latest.values() if v >= 1)
        yearly[str(year)] = count
    adoption[feat] = yearly


# ─── Country counts and decade counts ────────────────────────────────────────

country_counts = {}
decade_counts = {}
for country, events in country_timelines.items():
    country_counts[country] = len(events)
    for ev in events:
        if ev["year"]:
            decade = (ev["year"] // 10) * 10
            decade_counts[str(decade)] = decade_counts.get(str(decade), 0) + 1

# Sort country_counts descending
country_counts = dict(sorted(country_counts.items(), key=lambda x: -x[1]))


# ─── Ratification counts ────────────────────────────────────────────────────

ratif_counts = {}
for t in TREATIES:
    ratif_counts[t] = sum(1 for c in ratif_data.values() if c.get(t) == "V")


# ─── Independence / first constitution dates ────────────────────────────────

# Year of first constitutional text per country (proxy for independence)
first_year = {}
for country, events in country_timelines.items():
    years = [e["year"] for e in events if e["year"] is not None]
    first_year[country] = min(years) if years else None

# Special cases: actual independence dates (used for map display)
INDEPENDENCE_DATES = {
    "Algérie": 1962, "Afrique du Sud": 1961, "Angola": 1975, "Bénin": 1960,
    "Botswana": 1966, "Burkina Faso": 1960, "Burundi": 1962, "Cameroun": 1960,
    "Cap-Vert": 1975, "République centrafricaine": 1960, "Comores": 1975,
    "République du Congo": 1960, "République démocratique du Congo": 1960,
    "Côte d'Ivoire": 1960, "Djibouti": 1977, "Égypte": 1922,
    "Érythrée": 1993, "Eswatini": 1968, "Éthiopie": 1900,  # never colonized
    "Gabon": 1960, "Gambie": 1965, "Ghana": 1957, "Guinée": 1958,
    "Guinée-Bissau": 1973, "Guinée Équatoriale": 1968, "Kenya": 1963,
    "Lesotho": 1966, "Libéria": 1847, "Libye": 1951, "Madagascar": 1960,
    "Malawi": 1964, "Mali": 1960, "Maroc": 1956, "Maurice": 1968,
    "Mauritanie": 1960, "Mozambique": 1975, "Namibie": 1990, "Niger": 1960,
    "Nigéria": 1960, "Ouganda": 1962, "Rwanda": 1962,
    "Sao Tomé-et-Príncipe": 1975, "Sénégal": 1960, "Seychelles": 1976,
    "Sierra Leone": 1961, "Somalie": 1960, "Soudan": 1956,
    "Soudan du Sud": 2011, "Tanzanie": 1961, "Tchad": 1960, "Togo": 1960,
    "Tunisie": 1956, "Zambie": 1964, "Zimbabwe": 1980,
}

# Border split events: before these dates, the child country should be
# shown as part of the parent country on the map
BORDER_SPLITS = {
    "Érythrée": {"parent": "Éthiopie", "split_year": 1993},
    "Soudan du Sud": {"parent": "Soudan", "split_year": 2011},
}


# ─── Post-conflict coding ────────────────────────────────────────────────────

pc_path = os.path.join(os.path.dirname(__file__), "post_conflict_coding.json")
with open(pc_path, encoding="utf-8") as f:
    pc_raw = json.load(f)

POST_CONFLICT = {}
POST_CONFLICT_TYPE = {}
for country, info in pc_raw.items():
    # Map English names to French
    fr_name = None
    for fr, iso in NAME_TO_ISO.items():
        if fr.lower() == country.lower() or country.lower() in fr.lower():
            fr_name = fr
            break
    name = fr_name or country
    POST_CONFLICT[name] = info.get("post_conflict", False)
    POST_CONFLICT_TYPE[name] = info.get("pc_type")  # "peace", "authoritarian", or null


# ─── Sovereignty vs Identity scores ──────────────────────────────────────────

IDENTITY_DIMS = ["Drm", "Id", "Drc", "Dpa", "PJ"]
INSTITUTIONAL_DIMS = ["Dc", "La", "Dis", "Dau", "F"]

sov_vs_id_scores = {}
for row in feature_matrix:
    country = row["PAYS"]
    identity = sum(row[f] for f in IDENTITY_DIMS)
    institutional = sum(row[f] for f in INSTITUTIONAL_DIMS)
    sov_vs_id_scores[country] = {
        "identity": identity,
        "institutional": institutional,
        "balance": identity - institutional,
    }


# ─── UMAP coordinates ───────────────────────────────────────────────────────

try:
    import numpy as np  # noqa: I001
    from scipy.cluster.hierarchy import fcluster, linkage
    from sklearn.metrics.pairwise import cosine_similarity
    from sklearn.preprocessing import StandardScaler

    emb_dir = os.path.join(os.path.dirname(__file__), "..", "data", "embeddings")

    # Constitution UMAP
    const_emb = np.load(os.path.join(emb_dir, "constitution_embeddings.npy"))
    with open(os.path.join(emb_dir, "constitution_meta.json")) as f:
        const_meta = json.load(f)

    from umap import UMAP
    umap_model = UMAP(n_components=2, random_state=42, n_neighbors=10, min_dist=0.3)
    const_2d = umap_model.fit_transform(const_emb)

    umap_coords = {}
    for i, meta in enumerate(const_meta):
        umap_coords[meta["country_fr"]] = [round(float(const_2d[i, 0]), 3),
                                             round(float(const_2d[i, 1]), 3)]

    # Preamble UMAP
    pream_emb = np.load(os.path.join(emb_dir, "preamble_embeddings.npy"))
    with open(os.path.join(emb_dir, "preamble_meta.json")) as f:
        pream_meta = json.load(f)

    pream_2d = umap_model.fit_transform(pream_emb)
    umap_preamble_coords = {}
    for i, meta in enumerate(pream_meta):
        umap_preamble_coords[meta["country_fr"]] = [round(float(pream_2d[i, 0]), 3),
                                                      round(float(pream_2d[i, 1]), 3)]

    # Hierarchical clustering (Ward, on 10 coded dimensions)
    X = np.array([[row[f] for f in FEATURES] for row in feature_matrix])
    X_scaled = StandardScaler().fit_transform(X)
    Z = linkage(X_scaled, method="ward")
    linkage_countries = [row["PAYS"] for row in feature_matrix]
    linkage_matrix_data = {
        "countries": linkage_countries,
        "linkage": [[int(r[0]), int(r[1]), round(float(r[2]), 4), int(r[3])] for r in Z],
    }

    # Cluster assignments for k=2..8
    cluster_assignments = {}
    for k in range(2, 9):
        labels = fcluster(Z, k, criterion="maxclust")
        cluster_assignments[f"k{k}"] = {
            linkage_countries[i]: int(labels[i]) for i in range(len(linkage_countries))
        }

    # Cosine similarity matrix
    sim_matrix = cosine_similarity(const_emb)
    similarity_matrix_data = {
        "countries": [meta["country_fr"] for meta in const_meta],
        "matrix": [round(float(v), 3) for row in sim_matrix for v in row],
    }

    HAS_EMBEDDINGS = True
    print(f"Computed: UMAP ({len(umap_coords)} const, {len(umap_preamble_coords)} pream), "
          f"linkage ({len(Z)} rows), clusters (k=2..8), similarity ({len(sim_matrix)}×{len(sim_matrix)})")

except Exception as e:
    print(f"Warning: could not compute embeddings data: {e}")
    HAS_EMBEDDINGS = False
    umap_coords = {}
    umap_preamble_coords = {}
    linkage_matrix_data = {}
    cluster_assignments = {}
    similarity_matrix_data = {}


# ─── Assemble final JSON ────────────────────────────────────────────────────

app_data = {
    "country_timelines": country_timelines,
    "colonial_heritage": COLONIAL_HERITAGE,
    "name_to_iso": NAME_TO_ISO,
    "feature_matrix": feature_matrix,
    "features": FEATURES,
    "feature_labels": FEATURE_LABELS,
    "heritage_divergence": heritage_divergence,
    "heritage_groups": heritage_groups,
    "adoption": adoption,
    "ratif_data": ratif_data,
    "ratif_counts": ratif_counts,
    "treaty_labels": TREATY_LABELS,
    "treaties": TREATIES,
    "country_region": COUNTRY_REGION,
    "regions": REGIONS,
    "country_counts": country_counts,
    "decade_counts": decade_counts,
    "total_countries": len(country_timelines),
    "total_entries": sum(len(e) for e in country_timelines.values()),
    "independence_dates": INDEPENDENCE_DATES,
    "border_splits": BORDER_SPLITS,
    "post_conflict": POST_CONFLICT,
    "post_conflict_type": POST_CONFLICT_TYPE,
    "sov_vs_id_scores": sov_vs_id_scores,
    "umap_coords": umap_coords,
    "umap_preamble_coords": umap_preamble_coords,
    "linkage_data": linkage_matrix_data,
    "cluster_assignments": cluster_assignments,
    "similarity_matrix": similarity_matrix_data,
}

with open("app_data.json", "w", encoding="utf-8") as f:
    json.dump(app_data, f, ensure_ascii=False, indent=None)

size_kb = len(json.dumps(app_data, ensure_ascii=False)) / 1024
print(f"Output: app_data.json ({size_kb:.0f} KB)")
print(f"Countries: {len(country_timelines)}")
print(f"Total events: {app_data['total_entries']}")
print(f"Heritage groups: { {k: len(v) for k, v in heritage_groups.items()} }")
