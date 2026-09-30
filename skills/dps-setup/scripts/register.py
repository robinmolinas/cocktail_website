#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# ///
"""register.py - register the Dionysus Pour Studio in a workspace that uses BMAD's TOML config
(_bmad/config.toml is installer-managed and never edited). Standard library only. Safe to re-run.

Usage:
  register.py --project-root DIR --pours VALUE --library VALUE [--dry-run]

VALUE is a path relative to the project root, or already prefixed with {project-root}.

Writes:
  _bmad/custom/config.toml     the [modules.dps] table and one [agents.dps-agent-<code>] table per agent in
                               module.yaml's roster (durable: the installer never touches custom/),
                               replaced in place if it exists; nothing else in the file changes
  _bmad/_config/bmad-help.csv  the module's rows from ../assets/module-help.csv; old dps rows are removed
                               first (a reinstall rebuilds this catalog, so re-run dps-setup after one)
Prints JSON. Never deletes anything else.
"""
import argparse, csv, io, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
HELP_SRC = os.path.join(HERE, "..", "assets", "module-help.csv")
MODULE_YAML = os.path.join(HERE, "..", "assets", "module.yaml")
MODULE = "Dionysus Pour Studio"
BEGIN, END = "# >>> dps (written by dps-setup)", "# <<< dps"


def token(v):
    v = v.strip().rstrip("/")
    return v if v.startswith("{project-root}") else "{project-root}/" + v.lstrip("/")


def roster():
    """The agents: list in module.yaml (flat string fields only; no yaml library needed)."""
    agents, cur, inside = [], None, False
    for line in open(MODULE_YAML, encoding="utf-8").read().splitlines():
        if re.match(r"^agents:\s*$", line):
            inside = True
            continue
        if inside and line and not line.startswith(" "):
            break
        m = re.match(r"^\s*(-\s*)?(\w+):\s*(.*)$", line) if inside else None
        if m:
            if m.group(1):
                cur = {}
                agents.append(cur)
            cur[m.group(2)] = m.group(3).strip().strip('"')
    return agents


def q(v):
    return json.dumps(v, ensure_ascii=False)   # a JSON string is a valid TOML basic string


def upsert_toml(path, values, dry):
    text = open(path, encoding="utf-8").read() if os.path.exists(path) else ""
    lines = [BEGIN, "[modules.dps]"] + ["%s = %s" % (k, q(v)) for k, v in values.items()]
    for a in roster():
        lines += ["", "[agents.dps-agent-%s]" % a["code"], 'module = "dps"', 'team = "dionysus-pour-studio"']
        lines += ["%s = %s" % (k, q(a.get(k, ""))) for k in ("name", "title", "icon", "description")]
    block = "\n".join(lines + [END])
    if BEGIN in text and END in text:
        new = re.sub(re.escape(BEGIN) + r".*?" + re.escape(END), lambda m: block, text, flags=re.S)
        action = "updated"
    elif re.search(r"^\[(modules\.dps|agents\.dps-agent-[\w-]+)\]\s*$", text, re.M):
        sys.exit(json.dumps({"status": "error", "reason": "%s already has a dps table not written by "
                             "dps-setup. Edit it by hand, or remove it and re-run." % path}))
    else:
        new = text.rstrip("\n") + ("\n\n" if text else "") + block + "\n"
        action = "added"
    if not dry:
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "w", encoding="utf-8") as f:
            f.write(new)
    return action


def upsert_help(path, dry):
    src = list(csv.reader(open(HELP_SRC, encoding="utf-8")))
    header, rows = src[0], src[1:]
    if not os.path.exists(path):
        return {"catalog": "missing (skipped)"}
    cur = list(csv.reader(open(path, encoding="utf-8")))
    if cur[0] != header:
        return {"catalog": "unexpected header (skipped)"}
    kept = [r for r in cur[1:] if r and r[0] != MODULE]
    removed = len(cur) - 1 - len(kept)
    out = io.StringIO()
    w = csv.writer(out, lineterminator="\n")
    w.writerow(header)
    w.writerows(kept + rows)
    if not dry:
        with open(path, "w", encoding="utf-8", newline="") as f:
            f.write(out.getvalue())
    return {"catalog": path, "rows_removed": removed, "rows_added": len(rows)}


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--project-root", required=True)
    ap.add_argument("--pours", required=True)
    ap.add_argument("--library", required=True)
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()
    bmad = os.path.join(a.project_root, "_bmad")
    if not os.path.exists(os.path.join(bmad, "config.toml")):
        print(json.dumps({"status": "error", "reason": "no _bmad/config.toml: this workspace uses the YAML config layout; "
                          "use merge-config.py and merge-help-csv.py instead"}))
        return 1
    values = {"dps_pours_folder": token(a.pours), "dps_library_folder": token(a.library)}
    cfg = os.path.join(bmad, "custom", "config.toml")
    result = {"status": "ok", "dry_run": a.dry_run, "config": cfg, "config_action": upsert_toml(cfg, values, a.dry_run),
              "values": values}
    result.update(upsert_help(os.path.join(bmad, "_config", "bmad-help.csv"), a.dry_run))
    print(json.dumps(result, indent=1, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    sys.exit(main())
