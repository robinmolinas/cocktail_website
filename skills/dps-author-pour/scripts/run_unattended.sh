#!/usr/bin/env bash
# run_unattended.sh - author pours unattended, one fresh headless Claude session per pour.
#
# Each run is `resume --one --headless`: it finishes the open room, or authors the batch's next
# pairing, or hands over to the next family in the index's Queue line, then prints a DPS-RUN line.
# A fresh session per pour keeps the host's context small (Robin 2026-09-27).
#
# Usage (from anywhere; keep the Mac awake with caffeinate):
#   caffeinate -i "skills/dps-author-pour/scripts/run_unattended.sh" [max_pours]
# max_pours defaults to 0 = keep going until the queue is empty.
# Stop gently: touch "<studio>/STOP"  (checked between pours; the current pour finishes first).
# Logs: <studio>/runs/<timestamp>.log, one per session, plus runs/loop.log.
#
# On a usage limit the session dies mid-pour; the loop sleeps until the reset time the message
# names (or 30 min if it names none), and the next session resumes the open room from its record.

set -u
ROOT="/Users/robin.molinas/Documents/GenAI Projects"
STUDIO="$ROOT/Dionysus/Cocktail_Website_Agent/design-artifacts/pours/_studio"
LOGS="$STUDIO/runs"
MAX="${1:-0}"
WAIT_LIMIT=1800   # fallback wait (seconds) when the reset time can't be read from the log
# Robin 2026-09-27: a usage limit takes 4-5 hours to reset, so sleep until the stated reset
# time (+5 min) instead of retrying every few minutes.
MAX_FAILS=3       # consecutive runs with no DPS-RUN line (and no usage limit) before giving up
# The Terminal panel's shell may not have ~/.local/bin on PATH, so find claude explicitly.
CLAUDE_BIN="${CLAUDE_BIN:-$(command -v claude || echo "$HOME/.local/bin/claude")}"
# Robin 2026-09-27: pours are authored on Opus 5.5 (high effort), like batch creator. Unpinned,
# the CLI fell back to Sonnet 4.6 because it was signed in to an account without Opus 5.5.
# The loop signs in separately (personal account) so the terminal's own login is untouched:
#   CLAUDE_CONFIG_DIR="$HOME/.claude-dionysus" claude auth login
[ -d "$HOME/.claude-dionysus" ] && export CLAUDE_CONFIG_DIR="${CLAUDE_CONFIG_DIR:-$HOME/.claude-dionysus}"
MODEL="${DPS_MODEL:-claude-opus-5-5}"
EFFORT="${DPS_EFFORT:-high}"

# What the studio's host and agents need, and nothing broader. A denied call is reported back
# to the model, which works around it or ends the run as "blocked".
ALLOWED=(Read Write Edit Glob Grep Agent SendMessage Skill ToolSearch WebFetch WebSearch
  "Bash(python3 *)" "Bash(ls *)" "Bash(cat *)" "Bash(head *)" "Bash(tail *)" "Bash(sed -n *)"
  "Bash(grep *)" "Bash(wc *)" "Bash(find *)" "Bash(mkdir -p *)" "Bash(cd *)")

PROMPT='Run the dps-author-pour skill with the arguments: resume --one --headless. Do exactly one pour (or one batch hand-over) as references/batches-and-rework.md describes under "One pour only", then end with the single DPS-RUN line.'

mkdir -p "$LOGS"
cd "$ROOT" || exit 1
say() { echo "$(date '+%Y-%m-%d %H:%M:%S')  $*" | tee -a "$LOGS/loop.log"; }

# Seconds until the "resets 4am" / "resets 3:45pm" time named in a log, plus 5 minutes.
# Prints nothing if no time can be read or it's implausible (over 6 hours away).
wait_for_reset() {
  local t h m ap target now
  t=$(grep -oiE 'resets [0-9]{1,2}(:[0-9]{2})? ?(am|pm)' "$1" | tail -1 | sed -E 's/^[Rr]esets //; s/ //')
  [ -n "$t" ] || return 0
  h=$(echo "$t" | grep -oE '^[0-9]+'); m=$(echo "$t" | grep -oE ':[0-9]{2}' | tr -d :); m=${m:-00}
  ap=$(echo "$t" | grep -oiE '(am|pm)$' | tr 'A-Z' 'a-z')
  h=$((10#$h % 12)); [ "$ap" = pm ] && h=$((h + 12))
  target=$(date -j -f "%H:%M:%S" "$h:$m:00" +%s 2>/dev/null) || return 0
  now=$(date +%s); [ "$target" -le "$now" ] && target=$((target + 86400))
  [ $((target - now)) -le 21600 ] && echo $((target - now + 300))
}

# Preflight: refuse to start unless this CLI's account really serves $MODEL (no silent fallback).
got=$("$CLAUDE_BIN" -p "Reply with just OK" --model "$MODEL" --output-format json </dev/null 2>&1 |
  python3 -c "import json,sys
try: print(' '.join(json.load(sys.stdin).get('modelUsage') or {}))
except Exception: pass")
if [[ " $got " != *" $MODEL"* ]]; then
  say "preflight: $MODEL not available to this CLI (got: ${got:-none}); check 'claude auth status'. Not starting."
  exit 1
fi

poured=0; fails=0
say "loop start (max_pours=$MAX, model=$MODEL, effort=$EFFORT)"
while :; do
  if [ -f "$STUDIO/STOP" ]; then rm -f "$STUDIO/STOP"; say "STOP file found, stopping"; break; fi
  if [ "$MAX" -gt 0 ] && [ "$poured" -ge "$MAX" ]; then say "reached $MAX pours, stopping"; break; fi

  log="$LOGS/$(date +%Y%m%d-%H%M%S).log"
  say "session start -> $(basename "$log")"
  # Agent teams must be on: without it, headless sessions have no SendMessage, so the three
  # agents couldn't be kept standing across rounds (tested 2026-09-27).
  CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 "$CLAUDE_BIN" -p "$PROMPT" --model "$MODEL" --effort "$EFFORT" --permission-mode acceptEdits \
    --allowedTools "${ALLOWED[@]}" </dev/null >"$log" 2>&1
  line=$(grep -o 'DPS-RUN: .*' "$log" | tail -1)

  if [ -z "$line" ] && grep -qiE 'session limit|usage limit|rate.?limit|429' "$log"; then
    wait=$(wait_for_reset "$log"); wait=${wait:-$WAIT_LIMIT}
    say "usage limit ($(grep -oiE 'resets [^)]*\)?' "$log" | tail -1)); sleeping $((wait / 60)) min, until $(date -v+"${wait}"S '+%H:%M')"
    sleep "$wait"; continue
  fi

  say "${line:-no DPS-RUN line (see log)}"
  case "$line" in
    *'"poured"'*|*'"flagged"'*) poured=$((poured + 1)); fails=0 ;;
    *'"batch-done"'*)           fails=0 ;;
    *'"queue-empty"'*)          say "queue empty, all done"; break ;;
    *'"blocked"'*)              say "blocked: needs Robin, stopping"; break ;;
    *) fails=$((fails + 1))
       if [ "$fails" -ge "$MAX_FAILS" ]; then say "$fails runs in a row without a result, stopping"; break; fi
       sleep 60 ;;
  esac
done
say "loop end ($poured pours this run)"
