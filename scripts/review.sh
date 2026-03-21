#!/usr/bin/env bash
# Constitutions d'Afrique — Review System
# Four-phase automated audit, adapted from DataPilot.
#
# Usage: bash scripts/review.sh [--full | --deep | --l0-only | --l1-only | --l2-only | --l3-only]
#
# Default (no args): L0+L1 only (~5s)  — fast, run after every change
# --full:            L0+L1+L2 (~1-2m)  — between features / before push
# --deep:            L0+L1+L2+L3       — before milestones / major releases
set -u

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
PROMPTS_DIR="$SCRIPT_DIR/review_prompts"
TODAY=$(date +%Y-%m-%d)

# ── Parse args ──────────────────────────────────────────────
RUN_L0=true RUN_L1=true RUN_L2=false RUN_L3=false
for arg in "$@"; do
    case "$arg" in
        --full) RUN_L2=true ;;
        --deep) RUN_L2=true; RUN_L3=true ;;
        --l0-only) RUN_L0=true; RUN_L1=false ;;
        --l1-only) RUN_L0=false ;;
        --l2-only) RUN_L0=false; RUN_L1=false; RUN_L2=true ;;
        --l3-only) RUN_L0=false; RUN_L1=false; RUN_L3=true ;;
        *) echo "Unknown arg: $arg"; exit 1 ;;
    esac
done

# ── Counters ────────────────────────────────────────────────
L0_PASS=0 L0_WARN=0 L0_FAIL=0
L1_PASS=0 L1_WARN=0 L1_FAIL=0
L2_PASS=0 L2_WARN=0 L2_FAIL=0
L3_PASS=0 L3_WARN=0 L3_CRITICAL=0

l0_result() {
    local status="$1" name="$2" detail="${3:-}"
    case "$status" in
        PASS) echo "  [PASS] $name"; ((L0_PASS++)) || true ;;
        WARN) echo "  [WARN] $name"; [ -n "$detail" ] && echo "         $detail"; ((L0_WARN++)) || true ;;
        FAIL) echo "  [FAIL] $name"; [ -n "$detail" ] && echo "         $detail"; ((L0_FAIL++)) || true ;;
    esac
}

l1_result() {
    local status="$1" name="$2" detail="${3:-}"
    case "$status" in
        PASS) echo "  [PASS] $name"; ((L1_PASS++)) || true ;;
        WARN) echo "  [WARN] $name"; [ -n "$detail" ] && echo "         $detail"; ((L1_WARN++)) || true ;;
        FAIL) echo "  [FAIL] $name"; [ -n "$detail" ] && echo "         $detail"; ((L1_FAIL++)) || true ;;
    esac
}

# ═══════════════════════════════════════════════════════════════
cat <<EOF

══════════════════════════════════════════════
  CONSTITUTIONS D'AFRIQUE REVIEW — $TODAY
══════════════════════════════════════════════
EOF

cd "$PROJECT_DIR"

# ── L0: Self-check ──────────────────────────────────────────
if $RUN_L0; then
cat <<'EOF'

── L0: Review system self-check ──────────────
EOF

# L0-1: Required KB files exist at root
for f in CLAUDE.md TECHNICAL.md THESIS.md ROADMAP.md; do
    if [ -f "$f" ]; then
        l0_result PASS "$f exists"
    else
        l0_result FAIL "$f MISSING"
    fi
done

# L0-2: Required source files exist
for f in src/index.html src/styles.css src/data.js src/app.js; do
    if [ -f "$f" ]; then
        l0_result PASS "$f exists"
    else
        l0_result FAIL "$f MISSING"
    fi
done

# L0-3: index.html references all external files
for ref in 'styles.css' 'data.js' 'app.js'; do
    if grep -q "$ref" src/index.html 2>/dev/null; then
        l0_result PASS "index.html references $ref"
    else
        l0_result FAIL "index.html missing reference to $ref"
    fi
done

# L0-4: No inline <style> in index.html
if grep -q '<style>' src/index.html 2>/dev/null; then
    l0_result FAIL "index.html has inline <style> — should be in styles.css"
else
    l0_result PASS "No inline styles in index.html"
fi

# L0-5: Script tag count sanity
INLINE_SCRIPTS=$(grep -c '<script' src/index.html 2>/dev/null || echo "0")
if [ "$INLINE_SCRIPTS" -le 3 ]; then
    l0_result PASS "index.html script tag count OK ($INLINE_SCRIPTS)"
else
    l0_result WARN "index.html has $INLINE_SCRIPTS script tags (expected ≤3)"
fi

# L0-6: Review prompt files exist
PROMPT_COUNT=$(ls "$PROMPTS_DIR"/*.txt 2>/dev/null | wc -l)
if [ "$PROMPT_COUNT" -ge 7 ]; then
    l0_result PASS "Review prompts: $PROMPT_COUNT files"
else
    l0_result WARN "Review prompts: only $PROMPT_COUNT files (expected ≥7)"
fi

# L0-7: No stale doc paths (KB files should NOT be in docs/)
for stale in docs/TECHNICAL.md docs/ROADMAP.md; do
    if [ -f "$stale" ]; then
        l0_result FAIL "Stale file: $stale (should be at root)"
    fi
done

# L0-8: Stale file pointers in review prompts
# Check that paths mentioned in prompt files actually exist on disk
STALE_REFS=""
for prompt_file in "$PROMPTS_DIR"/*.txt; do
    [ -f "$prompt_file" ] || continue
    prompt_name=$(basename "$prompt_file")
    while IFS= read -r ref_path; do
        [ -z "$ref_path" ] && continue
        if [ ! -e "$ref_path" ]; then
            STALE_REFS="$STALE_REFS $prompt_name→$ref_path"
        fi
    done < <(grep -oP '(?:src/|scripts/|data/|docs/)[a-zA-Z0-9_./-]+\.[a-z]+' "$prompt_file" 2>/dev/null | sort -u)
done
if [ -z "$STALE_REFS" ]; then
    l0_result PASS "No stale file refs in review prompts"
else
    l0_result FAIL "Stale file refs in prompts:$STALE_REFS"
fi

# L0-9: Orphan prompts — every prompt file should be wired into review.sh
ORPHAN_PROMPTS=""
for prompt_file in "$PROMPTS_DIR"/*.txt; do
    [ -f "$prompt_file" ] || continue
    prompt_name=$(basename "$prompt_file")
    if ! grep -q "$prompt_name" "$SCRIPT_DIR/review.sh" 2>/dev/null; then
        ORPHAN_PROMPTS="$ORPHAN_PROMPTS $prompt_name"
    fi
done
if [ -z "$ORPHAN_PROMPTS" ]; then
    l0_result PASS "All prompts wired into review.sh"
else
    l0_result WARN "Orphan prompts (not in review.sh):$ORPHAN_PROMPTS"
fi

# L0-10: Hooks configuration exists
if [ -f ".claude/settings.json" ]; then
    l0_result PASS ".claude/settings.json exists"
else
    l0_result WARN ".claude/settings.json missing — no auto-enforcement"
fi

fi # RUN_L0

# ── L1: Mechanical checks ──────────────────────────────────
if $RUN_L1; then
cat <<'EOF'

── L1: Mechanical checks ─────────────────────
EOF

# L1-1: JS syntax check
if command -v node &>/dev/null; then
    if node -e "new Function(require('fs').readFileSync('src/data.js','utf8'))" 2>/dev/null; then
        l1_result PASS "data.js syntax valid"
    else
        l1_result FAIL "data.js syntax error"
    fi
    if node -e "new Function('d3','DATA','document','window','getComputedStyle',require('fs').readFileSync('src/app.js','utf8'))" 2>/dev/null; then
        l1_result PASS "app.js syntax valid"
    else
        l1_result FAIL "app.js syntax error"
    fi
else
    l1_result WARN "node not found — skipping JS syntax check"
fi

# L1-2: DATA JSON validity
if python3 -c "
import json, sys
with open('src/data.js') as f:
    content = f.read()
d = json.loads(content.split('const DATA = ')[1].rstrip(';\n'))
assert len(d['features']) == 10, f'Expected 10 features, got {len(d[\"features\"])}'
assert len(d['feature_matrix']) == 54, f'Expected 54 countries, got {len(d[\"feature_matrix\"])}'
" 2>/dev/null; then
    l1_result PASS "DATA JSON valid (10 features, 54 countries)"
else
    l1_result FAIL "DATA JSON invalid or corrupted"
fi

# L1-3: CSS custom properties ↔ JS CSS reader sync
CSS_VARS=$(grep -oE '\-\-[a-zA-Z][a-zA-Z0-9_-]*' src/styles.css | sort -u)
JS_READER_VARS=$(grep -oE "'\-\-[a-zA-Z][a-zA-Z0-9_-]*'" src/app.js | tr -d "'" | sort -u)
MISSING_IN_CSS=""
for v in $JS_READER_VARS; do
    if ! echo "$CSS_VARS" | grep -qxF -- "$v"; then
        MISSING_IN_CSS="$MISSING_IN_CSS $v"
    fi
done
if [ -z "$MISSING_IN_CSS" ]; then
    l1_result PASS "CSS↔JS variable sync OK"
else
    l1_result FAIL "JS references CSS vars not in styles.css:$MISSING_IN_CSS"
fi

# L1-3b: Python lint (ruff)
if command -v uv &>/dev/null; then
    RUFF_OUT=$(uv run ruff check scripts/ --quiet 2>&1)
    if [ -z "$RUFF_OUT" ]; then
        l1_result PASS "Python lint (ruff) clean"
    else
        l1_result WARN "Python lint issues" "$(echo "$RUFF_OUT" | head -5)"
    fi
else
    l1_result WARN "uv not found — skipping Python lint"
fi

# L1-4: Hardcoded hex colors in app.js
HC_COUNT=$(grep -oP "'#[0-9a-fA-F]{6}'" src/app.js | wc -l)
if [ "$HC_COUNT" -le 25 ]; then
    l1_result PASS "Hardcoded colors in app.js: $HC_COUNT (≤25 threshold)"
else
    l1_result WARN "Hardcoded colors in app.js: $HC_COUNT (consider centralizing)" "$(grep -oP "'#[0-9a-fA-F]{6}'" src/app.js | sort | uniq -c | sort -rn | head -5)"
fi

# L1-5: No TODO/FIXME/HACK in code
TODOS=$(grep -rn 'TODO\|FIXME\|HACK\|XXX' src/app.js src/styles.css src/index.html 2>/dev/null | grep -v 'node_modules' | wc -l)
if [ "$TODOS" -eq 0 ]; then
    l1_result PASS "No TODO/FIXME/HACK markers"
else
    l1_result WARN "$TODOS TODO/FIXME/HACK markers found" "$(grep -rn 'TODO\|FIXME\|HACK\|XXX' src/app.js src/styles.css src/index.html 2>/dev/null | head -3)"
fi

# L1-6: No console.log left in app.js
LOGS=$(grep -c 'console\.log' src/app.js || true)
LOGS=${LOGS:-0}
if [ "$LOGS" -eq 0 ]; then
    l1_result PASS "No console.log in app.js"
else
    l1_result WARN "$LOGS console.log statements in app.js"
fi

# L1-7: File sizes sanity
HTML_LINES=$(wc -l < src/index.html)
if [ "$HTML_LINES" -le 300 ]; then
    l1_result PASS "index.html is $HTML_LINES lines (≤300, properly split)"
else
    l1_result WARN "index.html is $HTML_LINES lines (>300, may contain inline code)"
fi

# L1-8: No stale dark-theme colors
DARK_COLORS=$(grep -l '#0c0e14\|#12151e\|#8b7aff\|#ff7090\|#18f0be\|#3ecfb0' src/app.js src/styles.css 2>/dev/null | wc -l)
if [ "$DARK_COLORS" -eq 0 ]; then
    l1_result PASS "No dark-theme color remnants"
else
    l1_result FAIL "Found $DARK_COLORS dark-theme color references"
fi

# L1-9: KB files not empty
for doc in CLAUDE.md TECHNICAL.md THESIS.md ROADMAP.md; do
    LINES=$(wc -l < "$doc" 2>/dev/null || echo 0)
    if [ "$LINES" -ge 10 ]; then
        l1_result PASS "$doc has content ($LINES lines)"
    else
        l1_result WARN "$doc seems empty ($LINES lines)"
    fi
done

# L1-10: KB cross-references valid
for ref_pair in "CLAUDE.md:ROADMAP.md" "CLAUDE.md:THESIS.md" "CLAUDE.md:TECHNICAL.md" "TECHNICAL.md:ROADMAP.md" "TECHNICAL.md:THESIS.md"; do
    src_file=$(echo "$ref_pair" | cut -d: -f1)
    ref_file=$(echo "$ref_pair" | cut -d: -f2)
    if grep -q "$ref_file" "$src_file" 2>/dev/null; then
        l1_result PASS "$src_file references $ref_file"
    else
        l1_result WARN "$src_file does not reference $ref_file"
    fi
done

fi # RUN_L1

# ── L2+L3: Sub-agent helpers ───────────────────────────────
print_agent_result() {
    local name="$1" tmpfile="$2" phase="$3"
    local parsed
    parsed=$(mktemp /tmp/review_parsed_XXXX.txt)
    python3 -c "
import json, re, sys, textwrap

def extract_review(filepath):
    with open(filepath) as f:
        text = f.read().strip()
    if not text:
        return None
    try:
        envelope = json.loads(text)
        if isinstance(envelope, dict) and 'result' in envelope:
            text = envelope['result']
    except (json.JSONDecodeError, KeyError):
        pass
    m = re.search(r'\x60\x60\x60json\s*\n(.*?)\n\s*\x60\x60\x60', text, re.DOTALL)
    if m:
        text = m.group(1).strip()
    start = text.find('{')
    end = text.rfind('}') + 1
    if start >= 0 and end > start:
        try:
            return json.loads(text[start:end])
        except json.JSONDecodeError:
            pass
    return None

d = extract_review('$tmpfile')
if not d:
    import os
    size = os.path.getsize('$tmpfile') if os.path.exists('$tmpfile') else 0
    if size < 10:
        print('STATUS:WARN')
        print('SUMMARY:Agent returned empty output')
    else:
        print('STATUS:WARN')
        print(f'SUMMARY:Could not parse agent output ({size} bytes)')
    sys.exit(0)

print(f'STATUS:{d.get(\"status\", \"WARN\")}')
print(f'SUMMARY:{d.get(\"summary\", \"No summary\")}')
for issue in d.get('issues', []):
    sev = issue.get('severity', 'medium').upper()
    desc = issue.get('description', '') or issue.get('title', '')
    detail = issue.get('details', '') or issue.get('evidence', '')
    print(f'ISSUE:[{sev}] {desc}')
    if detail:
        for line in textwrap.wrap(str(detail), 70):
            print(f'DETAIL:{line}')
" < /dev/null > "$parsed" 2>/dev/null || echo "STATUS:WARN" > "$parsed"

    local status summary issues
    status=$(grep '^STATUS:' "$parsed" | head -1 | sed 's/^STATUS://')
    summary=$(grep '^SUMMARY:' "$parsed" | head -1 | sed 's/^SUMMARY://')
    issues=$(grep -E '^(ISSUE:|DETAIL:)' "$parsed" | sed 's/^ISSUE:/         /;s/^DETAIL:/                /' || true)
    [ -z "$status" ] && status="WARN"
    [ -z "$summary" ] && summary="No output"
    rm -f "$parsed"

    case "$status" in
        PASS)
            echo "  [PASS] $name"
            if [ "$phase" = "l2" ]; then ((L2_PASS++)) || true
            else ((L3_PASS++)) || true; fi
            ;;
        WARN)
            echo "  [WARN] $name"
            echo "         $summary"
            [ -n "$issues" ] && echo "$issues"
            if [ "$phase" = "l2" ]; then ((L2_WARN++)) || true
            else ((L3_WARN++)) || true; fi
            ;;
        FAIL)
            echo "  [FAIL] $name"
            echo "         $summary"
            [ -n "$issues" ] && echo "$issues"
            if [ "$phase" = "l2" ]; then ((L2_FAIL++)) || true
            else ((L2_FAIL++)) || true; fi
            ;;
        CRITICAL)
            echo "  [CRITICAL] $name"
            echo "         $summary"
            [ -n "$issues" ] && echo "$issues"
            if [ "$phase" = "l3" ]; then ((L3_CRITICAL++)) || true
            else ((L2_FAIL++)) || true; fi
            ;;
        *)
            echo "  [WARN] $name"
            echo "         $summary"
            [ -n "$issues" ] && echo "$issues"
            if [ "$phase" = "l2" ]; then ((L2_WARN++)) || true
            else ((L3_WARN++)) || true; fi
            ;;
    esac

    rm -f "$tmpfile"
}

# ── L2: Documentation accuracy ─────────────────────────────
if $RUN_L2; then
cat <<'EOF'

── L2: Documentation accuracy ────────────────
  Starting 4 sub-agents in parallel...
EOF

L2_PIDS=()
L2_NAMES=("TECHNICAL.md accuracy" "ROADMAP.md phase status" "THESIS.md consistency" "Dead code scan")
L2_FILES=("$PROMPTS_DIR/l2_technical.txt" "$PROMPTS_DIR/l2_roadmap.txt" "$PROMPTS_DIR/l2_thesis.txt" "$PROMPTS_DIR/l2_dead_code.txt")
L2_OUTPUTS=()

for i in "${!L2_NAMES[@]}"; do
    slug=$(echo "${L2_FILES[$i]}" | sed 's/.*l2_//;s/\.txt//')
    tmpfile=$(mktemp /tmp/afconst_l2_${slug}_XXXX.json)
    L2_OUTPUTS+=("$tmpfile")

    if command -v claude &>/dev/null; then
        (timeout 300 claude -p \
            --output-format json \
            --model sonnet \
            --max-turns 15 \
            --allowedTools "Read,Glob,Grep" \
            --no-session-persistence \
            "$(cat "${L2_FILES[$i]}")" \
            > "$tmpfile" 2>/dev/null || \
            echo '{"status":"WARN","issues":[],"summary":"Agent timed out or failed"}' > "$tmpfile"
        ) &
        L2_PIDS+=($!)
    else
        echo '{"status":"WARN","issues":[],"summary":"claude CLI not found — run L2 checks manually"}' > "$tmpfile"
        L2_PIDS+=(0)
    fi
done

echo "  Waiting for sub-agents..."
for pid in "${L2_PIDS[@]}"; do
    [ "$pid" -ne 0 ] && wait "$pid" 2>/dev/null || true
done
echo ""

for i in "${!L2_NAMES[@]}"; do
    print_agent_result "${L2_NAMES[$i]}" "${L2_OUTPUTS[$i]}" "l2"
done

fi # RUN_L2

# ── L3: Architectural review ───────────────────────────────
if $RUN_L3; then
cat <<'EOF'

── L3: Architectural review ──────────────────
  Running 3 sub-agents in pairs...
EOF

L3_NAMES=("Visualization coherence" "Thesis alignment" "Roadmap feasibility")
L3_FILES=("$PROMPTS_DIR/l3_coherence.txt" "$PROMPTS_DIR/l3_thesis_alignment.txt" "$PROMPTS_DIR/l3_feasibility.txt")
L3_OUTPUTS=()

for i in "${!L3_NAMES[@]}"; do
    slug=$(echo "${L3_FILES[$i]}" | sed 's/.*l3_//;s/\.txt//')
    tmpfile=$(mktemp /tmp/afconst_l3_${slug}_XXXX.json)
    L3_OUTPUTS+=("$tmpfile")
done

_run_l3_agent() {
    local idx=$1
    local prompt_file="${L3_FILES[$idx]}"
    local out_file="${L3_OUTPUTS[$idx]}"
    if command -v claude &>/dev/null; then
        timeout 300 claude -p \
            --output-format json \
            --model sonnet \
            --max-turns 20 \
            --allowedTools "Read,Glob,Grep,Bash" \
            --no-session-persistence \
            "$(cat "$prompt_file")" \
            > "$out_file" 2>/dev/null || \
            echo '{"status":"WARN","issues":[],"summary":"Agent timed out or failed"}' > "$out_file"
    else
        echo '{"status":"WARN","issues":[],"summary":"claude CLI not found — run L3 checks manually"}' > "$out_file"
    fi
}

# Launch all 3 in parallel (timeouts prevent runaway)
echo "  Launching ${#L3_NAMES[@]} agents in parallel..."
for i in "${!L3_NAMES[@]}"; do
    _run_l3_agent "$i" &
done
wait

echo ""

for i in "${!L3_NAMES[@]}"; do
    print_agent_result "${L3_NAMES[$i]}" "${L3_OUTPUTS[$i]}" "l3"
done

fi # RUN_L3

# ── Persist findings ────────────────────────────────────────
FINDINGS_FILE="$SCRIPT_DIR/last_review.json"
FINDINGS_EXIT=0

if $RUN_L2 || $RUN_L3; then
    python3 -c "
import json, re, sys, os, glob

findings = []

for tmpfile in sorted(glob.glob('/tmp/afconst_l[23]_*.json')):
    try:
        with open(tmpfile) as f:
            text = f.read().strip()
        if not text:
            continue
        try:
            envelope = json.loads(text)
            if isinstance(envelope, dict) and 'result' in envelope:
                text = envelope['result']
        except (json.JSONDecodeError, KeyError):
            pass
        m = re.search(r'\x60\x60\x60json\s*\n(.*?)\n\s*\x60\x60\x60', text, re.DOTALL)
        if m:
            text = m.group(1).strip()
        start = text.find('{')
        end = text.rfind('}') + 1
        if start >= 0 and end > start:
            d = json.loads(text[start:end])
            status = d.get('status', 'WARN')
            if status in ('WARN', 'FAIL', 'CRITICAL'):
                for issue in d.get('issues', []):
                    findings.append({
                        'severity': issue.get('severity', 'medium'),
                        'description': issue.get('description', '') or issue.get('title', ''),
                        'details': issue.get('details', '') or issue.get('evidence', ''),
                        'source': os.path.basename(tmpfile),
                    })
    except Exception:
        pass

roadmap = ''
try:
    with open('ROADMAP.md') as f:
        roadmap = f.read()
except FileNotFoundError:
    pass

new_findings = []
for f in findings:
    desc_lower = f['description'].lower()
    tokens = re.findall(r'[a-z_]{4,}', desc_lower)
    seen = set()
    words = []
    for t in tokens:
        if t not in seen and len(t) > 4:
            seen.add(t)
            words.append(t)
            if len(words) >= 8:
                break
    roadmap_lower = roadmap.lower()
    matches = sum(1 for w in words if w in roadmap_lower)
    already_tracked = matches >= 2 if words else False
    f['already_tracked'] = already_tracked
    if not already_tracked:
        new_findings.append(f)

output = {
    'date': '$(date +%Y-%m-%d)',
    'total_findings': len(findings),
    'new_findings': len(new_findings),
    'findings': findings,
}

with open('$FINDINGS_FILE', 'w') as f:
    json.dump(output, f, indent=2)

if new_findings:
    print()
    print('  ACTION REQUIRED: {} new finding(s) not in ROADMAP.md Known Issues:'.format(len(new_findings)))
    for nf in new_findings:
        print('    [{sev}] {desc}'.format(sev=nf['severity'].upper(), desc=nf['description'][:80]))
    print()
    print('  Add these to ROADMAP.md Known Issues with phase cross-references.')
    print('  Then run: python3 scripts/recheck_findings.py')
    print('  Findings saved to: scripts/last_review.json')
    sys.exit(1)
else:
    if findings:
        print()
        print('  All {} finding(s) already tracked in ROADMAP.md Known Issues.'.format(len(findings)))
    sys.exit(0)
" 2>/dev/null
    FINDINGS_EXIT=$?
fi

# ── Summary ─────────────────────────────────────────────────
cat <<EOF

── Summary ───────────────────────────────────
EOF
$RUN_L0 && echo "  L0: $L0_PASS pass, $L0_WARN warn, $L0_FAIL fail"
$RUN_L1 && echo "  L1: $L1_PASS pass, $L1_WARN warn, $L1_FAIL fail"
$RUN_L2 && echo "  L2: $L2_PASS pass, $L2_WARN warn, $L2_FAIL fail"
$RUN_L3 && echo "  L3: $L3_PASS pass, $L3_WARN warn, $L3_CRITICAL critical"
if [ "$FINDINGS_EXIT" -gt 0 ]; then
    echo "  Findings: NEW untracked findings — integrate into ROADMAP.md Known Issues"
fi
echo "══════════════════════════════════════════════"
echo ""

# Exit: non-zero if mechanical failures or new untracked findings
TOTAL_BAD=$(( L0_FAIL + L1_FAIL + L2_FAIL + FINDINGS_EXIT ))
exit $(( TOTAL_BAD > 0 ? 1 : 0 ))
