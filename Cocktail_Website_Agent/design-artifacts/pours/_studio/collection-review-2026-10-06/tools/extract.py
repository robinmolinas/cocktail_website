#!/usr/bin/env python3
"""Collection review 2026-10-06: extract every pour's guest-facing text and computed fields.

Read-only over the pours, specs and ingredient table. Writes:
  corpus/<primary>.md   the guest-facing pour as a reader meets it, one file per primary family
  reversed/<a>__<b>.md  each of the 66 reversed pairs side by side
  matrix.json           one record per pour (computed fields for the 132-row matrix)
  neighbours.md         nearest recipe neighbours, shared fact cards, repeated openings/endings

Usage: python3 extract.py [--fresh]   (--fresh re-runs balance.py and allergens.py; otherwise cached in matrix.json)
"""
import json, math, re, subprocess, sys
from collections import Counter, defaultdict
from pathlib import Path

HERE = Path(__file__).resolve().parent
REVIEW = HERE.parent
STUDIO = REVIEW.parent
POURS = STUDIO.parent
WORKSPACE = POURS.parents[3]          # GenAI Projects
TOOLS = WORKSPACE / "skills" / "dps-tools" / "scripts"   # the live tools (the repo copy is stale)
ING = json.loads((WORKSPACE / "skills" / "dps-tools" / "data" / "ingredients.json").read_text())

ARCH = ["caregiver", "creator", "explorer", "hero", "innocent", "jester", "lover",
        "magician", "outlaw", "regular-guy", "ruler", "sage"]


def split_pair(k):
    for a in ARCH:
        if k.startswith(a + "-") and k[len(a) + 1:] in ARCH:
            return a, k[len(a) + 1:]
    raise ValueError(k)


def frontmatter(t):
    m = re.match(r"---\n(.*?)\n---\n", t, re.S)
    fm = {}
    for line in (m.group(1) if m else "").splitlines():
        if ":" in line:
            k, v = line.split(":", 1)
            fm[k.strip()] = v.strip()
    return fm


def section(t, start, stops):
    i = t.find(start)
    if i < 0:
        return ""
    j = len(t)
    for s in stops:
        k = t.find(s, i + len(start))
        if k >= 0:
            j = min(j, k)
    return t[i + len(start):j].strip()


def bold_block(t, label):
    """Text after a **label** line, up to the next **x** label line or heading."""
    m = re.search(r"^\*\*" + re.escape(label) + r"\*\*[^\n]*\n(.*?)(?=^\*\*[a-zA-Z][^\n]*\*\*[^\n]*$|^#|\Z)", t, re.S | re.M)
    return m.group(1).strip() if m else ""


def sentences(s):
    return [x for x in re.split(r"(?<=[.!?])\s+", s.strip()) if x]


def tagline_flags(tl):
    f = []
    ss = sentences(tl)
    if len(ss) == 2:
        f.append("two-sentence")
    if re.match(r"you\b", tl, re.I):
        f.append("opens-You")
    if re.match(r"(everyone|everybody|nobody|no one|most people|people|anyone|some people|half the)\b", tl, re.I):
        f.append("mass-contrast")
    if re.search(r"\b(everyone|nobody|everybody|no one)\b.*\b(everyone|nobody|everybody|no one|you)\b", tl, re.I) and len(ss) == 2:
        f.append("public/private")
    if re.search(r"\bnot\b[^.]*\.?\s*(but|you)\b", tl, re.I) or re.search(r"n't\b[^.]*\. You\b", tl):
        f.append("not-X-but-Y")
    return f


def balance(spec):
    try:
        out = subprocess.run([sys.executable, str(TOOLS / "balance.py"), str(spec)], capture_output=True, text=True, timeout=60).stdout
    except Exception as e:
        return {"verdict": f"error {e}"}
    r = {"raw_out": [l.strip() for l in out.splitlines() if l.strip().startswith(("OUT", "EDGE"))]}
    m = re.search(r"final:\s+([\d.]+)% ABV \| ([\d.]+) g sugar/100 ml \| ([\d.]+)% acid", out)
    if m:
        r["abv"], r["sugar"], r["acid"] = map(float, m.groups())
    m = re.search(r"-> ([\d.]+) ml", out)
    if m:
        r["volume_ml"] = float(m.group(1))
    m = re.search(r"VERDICT: (.*)", out)
    r["verdict"] = m.group(1).strip() if m else out.strip().splitlines()[-1][:120] if out.strip() else "no output"
    return r


def allergens(spec):
    out = subprocess.run([sys.executable, str(TOOLS / "allergens.py"), str(spec)], capture_output=True, text=True, timeout=60)
    m = re.search(r"contains: (\[.*?\])", out.stdout + out.stderr)
    return json.loads(m.group(1)) if m else (out.stdout + out.stderr).strip().splitlines()[0][:160]


def main():
    recs = {}
    for f in sorted(POURS.glob("*.md")):
        if f.name == "STUDIO-RULES.md":
            continue
        k = f.stem
        try:
            a, b = split_pair(k)
        except ValueError:
            continue
        t = f.read_text()
        fm = frontmatter(t)
        cocktail = section(t, "## Cocktail", ["## Anchors", "## Reading"])
        reading = section(t, "## Reading", ["## Dossier", "\n---\n"])
        anchors = section(t, "## Anchors", ["## Reading"])
        image = section(t, "### Image brief", ["\n### "])
        def field(name):
            m = re.search(r"^- \*\*" + name + r":\*\*\s*(.*)$", cocktail, re.M)
            return m.group(1).strip() if m else ""
        yours_txt = bold_block(reading, "yours")
        yours = [p.strip() for p in re.split(r"\n\s*\n|\n(?=\d+\.\s)", yours_txt) if p.strip()]
        closing = bold_block(reading, "closingLine") or (re.search(r"\*\*closingLine:\*\*\s*(.*)", cocktail) or [None, ""])[1]
        spec_p = STUDIO / "specs" / f"{k}.json"
        spec = json.loads(spec_p.read_text()) if spec_p.exists() else {}
        cards = sorted(set(re.findall(r"fact-cards/([a-z0-9\-]+)\.md", t)))
        reading_words = len(re.findall(r"\w+", " ".join(yours)))
        recs[k] = {
            "pairing": k, "primary": a, "secondary": b,
            "personality": fm.get("personality", ""), "status": fm.get("status", ""), "flag": fm.get("flag", ""),
            "veto_free_line": fm.get("veto_free", ""),
            "name": field("name"), "tagline": field("tagline"), "glass": field("glassware") or spec.get("glass", ""),
            "contains_file": field("contains"),
            "epigraph": bold_block(reading, "epigraph").strip("*"),
            "whoYouAre": bold_block(reading, "whoYouAre"),
            "yours": yours, "closingLine": closing.strip().strip("*"),
            "recipe_block": bold_block(cocktail, "recipe"), "method": bold_block(cocktail, "method"),
            "cocktail_block": cocktail,
            "anchors": anchors, "image_brief": image,
            "family": spec.get("family", ""), "style": spec.get("style", ""), "serves": spec.get("serves", 1),
            "ingredients": spec.get("ingredients", []), "garnish": spec.get("garnish", []),
            "fact_cards": cards, "reading_words": reading_words,
            "tagline_flags": tagline_flags(field("tagline")),
        }
    # tool runs (cached in matrix.json unless --fresh)
    cache = {}
    if "--fresh" not in sys.argv and (REVIEW / "matrix.json").exists():
        cache = json.loads((REVIEW / "matrix.json").read_text())
    for k, r in recs.items():
        if k in cache and "balance" in cache[k]:
            r["balance"], r["contains_tool"] = cache[k]["balance"], cache[k]["contains_tool"]
            continue
        sp = STUDIO / "specs" / f"{k}.json"
        r["balance"] = balance(sp) if sp.exists() else {"verdict": "no spec"}
        r["contains_tool"] = allergens(sp) if sp.exists() else "no spec"

    # recipe neighbours: cosine over ingredient keys (ml weighted, base key normalised a little)
    def vec(r):
        v = Counter()
        for i in r["ingredients"]:
            key = i.get("key", "")
            if re.search(r"(^|_)(water|soda|ice|sparkling|tonic)(_|$)", key):
                continue   # diluents say nothing about the drink's character
            v[key] += float(i.get("ml") or 5)
            # coarse category so 'rye_40' and 'rye_barrel_proof' meet
            v["~" + key.split("_")[0]] += 0.5 * float(i.get("ml") or 5)
        v["#fam:" + r["family"]] += 15
        v["#style:" + r["style"]] += 15
        return v
    def cos(x, y):
        dot = sum(x[k] * y.get(k, 0) for k in x)
        return dot / (math.sqrt(sum(v * v for v in x.values())) * math.sqrt(sum(v * v for v in y.values())) or 1)
    vecs = {k: vec(r) for k, r in recs.items()}
    for k in recs:
        sims = sorted(((cos(vecs[k], vecs[j]), j) for j in recs if j != k), reverse=True)[:3]
        recs[k]["neighbours"] = [(j, round(s, 2)) for s, j in sims]

    (REVIEW / "matrix.json").write_text(json.dumps(recs, indent=1, ensure_ascii=False))

    # corpus per family
    (REVIEW / "corpus").mkdir(exist_ok=True)
    for a in ARCH:
        out = [f"# Corpus: {a} (guest-facing text as the reader meets it)\n",
               "Extracted 2026-10-06 by `tools/extract.py` from the pour files. Read-only copy; edit the pour files, never this.\n"]
        for k, r in recs.items():
            if r["primary"] != a:
                continue
            bal = r["balance"]
            out.append(f"\n---\n\n## {k} · {r['personality']} · *{r['name']}* · status: {r['status']}\n")
            if r["flag"]:
                out.append(f"**flag:** {r['flag']}\n")
            out.append(f"- **tagline:** {r['tagline']}\n- **epigraph:** {r['epigraph']}\n- **spec:** {r['family']} · {r['style']} · serves {r['serves']} · "
                       f"{bal.get('abv','?')}% ABV · {bal.get('sugar','?')} g sugar · {bal.get('acid','?')}% acid · {bal.get('volume_ml','?')} ml · balance: {bal.get('verdict')}"
                       f"{(' · ' + '; '.join(bal.get('raw_out', []))) if bal.get('raw_out') else ''}\n"
                       f"- **contains (file / tool):** {r['contains_file']} / {r['contains_tool']}\n"
                       f"- **recipe neighbours:** {', '.join(f'{j} ({s})' for j, s in r['neighbours'])}\n"
                       f"- **fact cards:** {', '.join(r['fact_cards']) or '(none cited)'}\n")
            out.append("\n### Cocktail block\n\n" + r["cocktail_block"] + "\n")
            out.append("\n### Reading\n\n**epigraph** " + r["epigraph"] + "\n\n**whoYouAre**\n\n" + r["whoYouAre"] + "\n\n**yours**\n\n" + "\n\n".join(r["yours"]) +
                       "\n\n**closingLine** " + r["closingLine"] + "\n")
            out.append("\n### Anchors\n\n" + r["anchors"] + "\n")
        (REVIEW / "corpus" / f"{a}.md").write_text("\n".join(out))

    # reversed pairs
    (REVIEW / "reversed").mkdir(exist_ok=True)
    done = set()
    for k, r in recs.items():
        rk = f"{r['secondary']}-{r['primary']}"
        if rk not in recs or frozenset((k, rk)) in done:
            continue
        done.add(frozenset((k, rk)))
        x, y = sorted((k, rk))
        o = [f"# Reversed pair: {x} / {y}\n"]
        for p in (x, y):
            q = recs[p]
            o.append(f"\n## {p} · {q['personality']} · *{q['name']}* ({q['status']})\n\n- tagline: {q['tagline']}\n- epigraph: {q['epigraph']}\n"
                     f"- drink: {q['family']} · {q['style']} · {', '.join(i['key'] for i in q['ingredients'])} · {q['glass']}\n- closing: {q['closingLine']}\n\n"
                     f"**whoYouAre**\n\n{q['whoYouAre']}\n\n**yours (proposal paragraph)**\n\n{q['yours'][-1] if q['yours'] else ''}\n")
        (REVIEW / "reversed" / f"{x}__{y}.md").write_text("\n".join(o))
    print(f"pours {len(recs)}, reversed pairs {len(done)}")


if __name__ == "__main__":
    main()
