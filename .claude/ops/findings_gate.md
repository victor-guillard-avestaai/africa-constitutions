---
name: findings_gate
tier: L2
type: command
event: Stop
mode: both
enabled: true
---

## Intent
Block session end if review findings exist that haven't been integrated into ROADMAP.md Known Issues.

## Check
```bash
if [ -f scripts/last_review.json ]; then
    NEW=$(python3 -c "import json; print(json.load(open('scripts/last_review.json')).get('new_findings',0))" 2>/dev/null)
    if [ "$NEW" -gt 0 ]; then
        echo "BLOCKED: $NEW review finding(s) pending" >&2
        exit 2
    fi
fi
```

## Why
Review findings that aren't tracked in ROADMAP.md get lost between sessions.
