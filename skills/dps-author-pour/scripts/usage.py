#!/usr/bin/env python3
"""usage.py - what each room cost, from Claude Code's own transcripts (read-only).

Usage:
  usage.py SESSION_JSONL [PAIRING ...]

SESSION_JSONL is the host session's transcript (~/.claude/projects/<project>/<session-id>.jsonl); its agents'
transcripts sit beside it in <session-id>/subagents/. Agents are grouped by the room they were sent to (the
rooms/<pairing>.md path in their first prompt); the host's share is its usage between the room's first and
last agent activity. "read" = context re-read from cache, the bulk of the cost; "write" = cache writes.
Baseline, batch creator 2026-09-26 (six pours): agents ~45M read / ~1.3M write / ~150k out / ~300 calls a pour,
host about the same again in reads.
"""
import collections, glob, json, os, re, sys


def usage_rows(fn):
    for line in open(fn, encoding="utf-8"):
        try:
            d = json.loads(line)
        except ValueError:
            continue
        yield d


def tally(rows, lo=None, hi=None):
    t = collections.Counter()
    for d in rows:
        if d.get("type") != "assistant":
            continue
        ts = d.get("timestamp", "")
        if lo and not (lo <= ts <= hi):
            continue
        u = d.get("message", {}).get("usage") or {}
        t["calls"] += 1
        t["read"] += u.get("cache_read_input_tokens", 0)
        t["write"] += u.get("cache_creation_input_tokens", 0) + u.get("input_tokens", 0)
        t["out"] += u.get("output_tokens", 0)
        ctx = u.get("cache_read_input_tokens", 0) + u.get("cache_creation_input_tokens", 0) + u.get("input_tokens", 0)
        if t["calls"] == 1:
            t["first_ctx"] = ctx
        t["max_ctx"] = max(t["max_ctx"], ctx)
    return t


def fmt(t):
    return "calls %4d | read %6.1fM | write %5.2fM | out %4.0fk | ctx first %3.0fk max %3.0fk" % (
        t["calls"], t["read"] / 1e6, t["write"] / 1e6, t["out"] / 1e3, t["first_ctx"] / 1e3, t["max_ctx"] / 1e3)


def main(argv):
    if len(argv) < 2 or argv[1] in ("-h", "--help"):
        print(__doc__)
        return 0
    host = argv[1]
    sub = os.path.join(host[:-len(".jsonl")], "subagents")
    rooms = collections.defaultdict(list)
    for fn in glob.glob(os.path.join(sub, "*.jsonl")):
        rows = list(usage_rows(fn))
        first = next((d for d in rows if d.get("type") == "user"), None)
        if not first:
            continue
        m = first["message"]["content"]
        text = m if isinstance(m, str) else " ".join(c.get("text", "") for c in m if c.get("type") == "text")
        r = re.search(r"rooms/([a-z-]+)\.md", text)
        if r:
            ts = [d["timestamp"] for d in rows if d.get("timestamp")]
            rooms[r.group(1)].append((fn, rows, min(ts), max(ts), text.split(",", 1)[0][:40]))
    want = argv[2:] or sorted(rooms, key=lambda p: min(x[2] for x in rooms[p]))
    hostrows = list(usage_rows(host))
    for p in want:
        if p not in rooms:
            print("%s: no agents found" % p)
            continue
        tot = collections.Counter()
        print("== %s" % p)
        for fn, rows, lo, hi, who in rooms[p]:
            t = tally(rows)
            print("   %-40s %s" % (who, fmt(t)))
            for k in ("calls", "read", "write", "out"):
                tot[k] += t[k]
        lo, hi = min(x[2] for x in rooms[p]), max(x[3] for x in rooms[p])
        h = tally(hostrows, lo, hi)
        print("   %-40s %s" % ("agents total", "calls %4d | read %6.1fM | write %5.2fM | out %4.0fk" % (
            tot["calls"], tot["read"] / 1e6, tot["write"] / 1e6, tot["out"] / 1e3)))
        print("   %-40s %s" % ("host (same window)", fmt(h)))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
