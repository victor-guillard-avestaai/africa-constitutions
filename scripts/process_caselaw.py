"""
Process the ACHPR case law dataset (data/achpr_cases.xlsx).
Validates schema, exports to JSON for visualization.

Usage: uv run python scripts/process_caselaw.py
"""

import json
import sys
from pathlib import Path

import pandas as pd

CASES_FILE = Path(__file__).parent.parent / "data" / "achpr_cases.xlsx"
OUTPUT_FILE = Path(__file__).parent.parent / "data" / "achpr_cases.json"

REQUIRED_COLUMNS = [
    "case_number",
    "short_name",
    "date",
    "respondent_state",
    "articles_invoked",
    "peoples_qualification",
    "functional_criterion",
    "outcome",
]


def validate_and_export():
    if not CASES_FILE.exists():
        print(f"ERROR: {CASES_FILE} not found")
        return 1

    df = pd.read_excel(CASES_FILE, sheet_name="ACHPR Cases", skiprows=1)

    # Drop empty rows (template guidance row + any blanks)
    df = df.dropna(how="all")
    if len(df) == 0:
        print("No cases coded yet. Add cases to data/achpr_cases.xlsx.")
        return 0

    # Validate required columns
    missing = [c for c in REQUIRED_COLUMNS if c not in df.columns]
    if missing:
        print(f"ERROR: Missing columns: {missing}")
        return 1

    # Parse dates
    df["date"] = pd.to_datetime(df["date"], errors="coerce")
    df["year"] = df["date"].dt.year

    # Parse boolean fields
    for col in ["peoples_qualification", "functional_criterion"]:
        df[col] = df[col].astype(str).str.upper().isin(["TRUE", "1", "YES", "OUI"])

    # Parse comma-separated article lists
    for col in ["articles_invoked", "articles_violated"]:
        if col in df.columns:
            df[col] = df[col].fillna("").astype(str).apply(
                lambda x: [a.strip() for a in x.split(",") if a.strip()]
            )

    # Summary
    print(f"Cases: {len(df)}")
    print(f"Date range: {df['year'].min():.0f} – {df['year'].max():.0f}")
    print(f"Peoples qualification: {df['peoples_qualification'].sum()}/{len(df)}")
    print(f"Functional criterion: {df['functional_criterion'].sum()}/{len(df)}")
    print(f"Respondent states: {df['respondent_state'].nunique()}")

    # Export to JSON
    records = df.to_dict(orient="records")
    # Convert timestamps to strings for JSON
    for r in records:
        if pd.notna(r.get("date")):
            r["date"] = r["date"].isoformat()[:10]
        else:
            r["date"] = None

    with open(OUTPUT_FILE, "w") as f:
        json.dump(records, f, indent=2, ensure_ascii=False, default=str)

    print(f"Exported to {OUTPUT_FILE}")
    return 0


if __name__ == "__main__":
    sys.exit(validate_and_export())
