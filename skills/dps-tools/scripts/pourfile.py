"""pourfile.py - read a staging pour file (design-artifacts/pours/<pairing>.md) into a dict.

The format is the one of the three approved worked examples: frontmatter; '## Cocktail' with
'- **field:** value' bullets, a recipe table, **method** list and **closingLine**; '## Anchors' table;
'## Reading' with **epigraph**, **whoYouAre**, **yours** (numbered paragraphs); then '## Dossier'.
"""
import json, os, re


def _clean(t):
    t = t.strip()
    t = re.sub(r"^\*(.*)\*$", r"\1", t.strip())
    return t.strip()


def _between(text, start, ends):
    i = text.find(start)
    if i < 0:
        return None
    i += len(start)
    j = min([text.find(e, i) for e in ends if text.find(e, i) >= 0] or [len(text)])
    return text[i:j]


def _table(block):
    rows = []
    for line in (block or "").splitlines():
        line = line.strip()
        if not line.startswith("|") or set(line) <= set("|-: "):
            continue
        rows.append([c.strip() for c in line.strip("|").split("|")])
    return rows[1:] if rows else []


def parse(path):
    text = open(path, encoding="utf-8").read()
    d = {"file": path, "errors": []}
    fm = re.match(r"^---\n(.*?)\n---\n", text, re.S)
    front = {}
    if fm:
        for line in fm.group(1).splitlines():
            m = re.match(r"^(\w+):\s*(.*?)\s*(?:#.*)?$", line)
            if m:
                front[m.group(1)] = m.group(2).strip("'\"")
    d["front"] = front
    d["pairing"] = front.get("pairing") or os.path.basename(path)[:-3]
    d["personality"] = front.get("personality", "")
    d["status"] = front.get("status", "")
    cocktail = _between(text, "## Cocktail", ["## Anchors", "## Reading"]) or ""
    reading = _between(text, "## Reading", ["\n---\n", "## Dossier"]) or ""
    d["dossier"] = _between(text, "## Dossier", ["\x00"]) or ""

    def bullet(name):
        m = re.search(r"^- \*\*%s\*\*[^:\n]*:\*?\*?\s*(.*)$" % name, cocktail, re.M)
        if not m:
            m = re.search(r"^- \*\*%s:\*\*\s*(.*)$" % name, cocktail, re.M)
        return _clean(m.group(1)) if m else None
    for f in ("name", "tagline", "glassware", "serves"):
        d[f] = bullet(f)
    c = bullet("contains")
    try:
        d["contains"] = json.loads((c or "").strip("` ")) if c else None
    except ValueError:
        d["contains"] = None
        d["errors"].append("contains is not a JSON list: %r" % c)
    d["recipe"] = [{"amount": r[0], "item": r[1], "note": r[2] if len(r) > 2 else ""}
                   for r in _table(_between(cocktail, "**recipe**", ["**method**"]))]
    method = _between(cocktail, "**method**", ["**closingLine"]) or ""
    d["method"] = [re.sub(r"^\d+\.\s*", "", l.strip()) for l in method.splitlines() if re.match(r"^\s*\d+\.", l)]
    m = re.search(r"\*\*closingLine:\*\*\s*(.*)", cocktail)
    d["closingLine"] = _clean(m.group(1)) if m else None
    d["anchors"] = [{"kind": r[0], "fact": r[1], "meaning": r[2] if len(r) > 2 else "", "speaksTo": r[3] if len(r) > 3 else ""}
                    for r in _table(_between(text, "## Anchors", ["## Reading"]))]
    ep = _between(reading, "**epigraph**", ["**whoYouAre**"])
    d["epigraph"] = _clean(ep.split("\n", 1)[1]) if ep and "\n" in ep else None
    w = _between(reading, "**whoYouAre**", ["**yours**"])
    d["whoYouAre"] = [p.strip() for p in (w or "").strip().split("\n\n") if p.strip()]
    y = _between(reading, "**yours**", ["\x00"]) or ""
    d["yours"] = [re.sub(r"^\d+\.\s*", "", l.strip()) for l in y.splitlines() if re.match(r"^\s*\d+\.", l)]
    return d


def guest_text(d):
    """Every string a guest can read, with its field name."""
    out = []
    for f in ("name", "tagline", "epigraph", "closingLine"):
        if d.get(f):
            out.append((f, d[f]))
    out += [("whoYouAre", p) for p in d["whoYouAre"]]
    out += [("yours %d" % (i + 1), p) for i, p in enumerate(d["yours"])]
    out += [("method %d" % (i + 1), p) for i, p in enumerate(d["method"])]
    out += [("recipe note", r["note"]) for r in d["recipe"] if r["note"]]
    return out


def all_pours(folder):
    return sorted(os.path.join(folder, f) for f in os.listdir(folder)
                  if f.endswith(".md") and not f.isupper() and f[0].islower() and f != "README.md")
