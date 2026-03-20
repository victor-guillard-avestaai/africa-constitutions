#!/usr/bin/env python3
"""Re-check last_review.json against current ROADMAP.md Known Issues.

Updates the new_findings count without re-running the full review.
Run after integrating findings into ROADMAP.md to verify all are tracked.
Deletes the findings file when all findings are accounted for.

Usage: python3 scripts/recheck_findings.py
"""

import json
import re
import sys
from pathlib import Path

FINDINGS_FILE = Path(__file__).parent / "last_review.json"
ROADMAP_FILE = Path(__file__).parent.parent / "ROADMAP.md"


def main() -> int:
    if not FINDINGS_FILE.exists():
        print("No findings file — nothing to check.")
        return 0

    data = json.loads(FINDINGS_FILE.read_text())
    findings = data.get("findings", [])
    if not findings:
        print("No findings in file — nothing to check.")
        return 0

    roadmap = ROADMAP_FILE.read_text().lower() if ROADMAP_FILE.exists() else ""

    new_count = 0
    for f in findings:
        desc_lower = f.get("description", "").lower()
        # Extract meaningful tokens (4+ chars)
        tokens = re.findall(r"[a-z_]{4,}", desc_lower)
        # Deduplicate and take first 8 meaningful tokens
        seen = set()
        words = []
        for t in tokens:
            if t not in seen and len(t) > 4:
                seen.add(t)
                words.append(t)
                if len(words) >= 8:
                    break
        # Match if at least 2 tokens found in roadmap
        matches = sum(1 for w in words if w in roadmap)
        already_tracked = matches >= 2 if words else False
        f["already_tracked"] = already_tracked
        if not already_tracked:
            new_count += 1

    data["new_findings"] = new_count
    FINDINGS_FILE.write_text(json.dumps(data, indent=2))

    if new_count > 0:
        print(f"{new_count} finding(s) still not in ROADMAP.md Known Issues:")
        for f in findings:
            if not f.get("already_tracked"):
                print(f"  [{f.get('severity', '?').upper()}] {f.get('description', '')[:80]}")
        return 1
    else:
        print("All findings tracked in ROADMAP.md Known Issues — clearing findings file.")
        FINDINGS_FILE.unlink()
        return 0


if __name__ == "__main__":
    sys.exit(main())
