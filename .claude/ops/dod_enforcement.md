---
name: dod_enforcement
tier: L1
type: command
event: Stop
mode: build
enabled: true
timeout: 300
---

## Intent
Enforce Definition of Done: lint passes and no uncommitted changes at session end.

## Check
```bash
bash scripts/dod_check.sh
```

## Why
Prevents sessions from ending with broken code or dangling changes.
