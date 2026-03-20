---
name: tmp_cleanup
tier: L1
type: command
event: Stop
mode: both
enabled: true
---

## Intent
Ensure tmp/ clipboard is empty before ending session. Victor shares files via tmp/.

## Check
```bash
FILES=$(ls tmp/ 2>/dev/null | grep -v '.gitkeep')
if [ -n "$FILES" ]; then
    echo "BLOCKED: tmp/ not empty — process and clean up: $FILES" >&2
    exit 2
fi
```

## Why
Unprocessed files in tmp/ mean the user's input was ignored.
