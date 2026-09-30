#!/usr/bin/env python3
"""persona.py - everything the studio knows about one personality, in one place.

Usage:
  persona.py PAIRING            e.g. sage-lover, magician-outlaw, regular-guy-sage
  persona.py PAIRING --json
  persona.py --list [--primary Sage] [--status]   all 132 pairings (with pour status)

Sources (read-only):
  - dionysus-experience/src/data/archetypes.ts           name, essence, story, goal, fear
  - agent/data/Brand Personality + Roulette.xlsx          PERSONALITY row (brands, example, colour, imagery,
                                                          drivers) + BRANDING rows for BOTH archetypes
                                                          (drivers, goals, fears, personality, audience, tone)
  - siblings: the other pairings sharing the primary archetype (for Wren's distinctiveness work)
  - pours/<pairing>.md status, and whether a template image exists (templates only: images follow the pour)
Pairing keys follow spine AD-11: lowercase "primary-secondary", spaces -> dashes.
"""
import html, json, os, re, sys, zipfile
from _common import APP, POURS

ARCH_TS = os.path.join(APP, "dionysus-experience", "src", "data", "archetypes.ts")
XLSX = os.path.join(APP, "agent", "data", "Brand Personality + Roulette.xlsx")
IMAGES = os.path.join(APP, "dionysus-experience", "public", "personas")


def key(primary, secondary):
    return ("%s-%s" % (primary, secondary)).lower().replace(" ", "-")


def pairings():
    src = open(ARCH_TS, encoding="utf-8").read()
    out = []
    for block in re.findall(r"\{\s*primary:(.*?)\n\s*\}", src, re.S):
        def f(name):
            m = re.search(r"%s:\s*'((?:[^'\\]|\\.)*)'" % name, "primary:" + block, re.S)
            return m.group(1).replace("\\'", "'") if m else ""
        p = {k: f(k) for k in ("primary", "secondary", "goal", "fear", "name", "essence", "story")}
        if not (p["primary"] and p["secondary"] and p["name"]):
            continue  # the TypeScript interface block, not a pairing
        p["key"] = key(p["primary"], p["secondary"])
        out.append(p)
    return out


def xlsx_rows():
    z = zipfile.ZipFile(XLSX)
    ss = [html.unescape("".join(re.findall(r"<t[^>]*>([^<]*)</t>", si)))
          for si in re.findall(r"<si>(.*?)</si>", z.read("xl/sharedStrings.xml").decode(), re.S)]
    sheets = {}
    for n in ("sheet1", "sheet2"):
        rows = []
        for r in re.findall(r"<row[^>]*>(.*?)</row>", z.read("xl/worksheets/%s.xml" % n).decode(), re.S):
            rows.append({re.match(r"[A-Z]+", ref).group(): " ".join((ss[int(v)] if 't="s"' in t else v).split())
                         for ref, t, v in re.findall(r'<c r="([A-Z]+\d+)"([^>]*)>(?:<f>.*?</f>)?<v>([^<]*)</v>', r)})
        sheets[n] = rows
    return sheets


def xlsx_personality(sheets, primary, secondary):
    cols = {"C": "goal", "D": "fear", "E": "brands", "H": "description", "I": "example", "J": "full_story",
            "K": "colour", "L": "imagery", "M": "primary_driver", "N": "secondary_driver"}
    for r in sheets["sheet2"]:
        if r.get("B") == primary and r.get("F") == secondary:
            return {v: r.get(k, "") for k, v in cols.items()}
    return {}


def xlsx_branding(sheets, archetype):
    cols = {"C": "drivers", "D": "goals", "E": "fears", "F": "personality", "G": "audience", "L": "tone"}
    for r in sheets["sheet1"]:
        if (r.get("A") or r.get("B") or "").strip() == archetype:
            return {v: r.get(k, "") for k, v in cols.items()}
    return {}


def pour_status(k):
    path = os.path.join(POURS, k + ".md")
    if not os.path.exists(path):
        return "unauthored", None
    m = re.search(r"^status:\s*(\S+)", open(path, encoding="utf-8").read(), re.M)
    return (m.group(1) if m else "unknown"), path


def image(k):
    for ext in (".jpg", ".jpeg", ".png", ".webp"):
        if os.path.exists(os.path.join(IMAGES, k + ext)):
            return "template image exists (templates only; the final image follows the pour)"
    return "none"


def profile(k):
    ps = pairings()
    p = next((x for x in ps if x["key"] == k), None)
    if not p:
        sys.exit("error: no pairing %r. Try: persona.py --list" % k)
    sh = xlsx_rows()
    status, path = pour_status(k)
    return {
        "key": k, "personality": p["name"], "primary": p["primary"], "secondary": p["secondary"],
        "goal": p["goal"], "fear": p["fear"], "essence": p["essence"], "story": p["story"],
        "xlsx": xlsx_personality(sh, p["primary"], p["secondary"]),
        "primary_archetype": xlsx_branding(sh, p["primary"]),
        "secondary_archetype": xlsx_branding(sh, p["secondary"]),
        "siblings": [{"key": x["key"], "personality": x["name"], "essence": x["essence"], "pour": pour_status(x["key"])[0]}
                     for x in ps if x["primary"] == p["primary"] and x["key"] != k],
        "pour": {"status": status, "file": path}, "image": image(k),
        "reminders": ["Archetype names (%s, %s) are NEVER shown to the guest; only '%s'." % (p["primary"], p["secondary"], p["name"]),
                      "No gendered language about the guest; some source names are gendered (e.g. 'The Boy/Girl Next Door')."],
    }


def show(d):
    x, pa, sa = d["xlsx"], d["primary_archetype"], d["secondary_archetype"]
    out = ["%s  (%s)   primary %s x secondary %s" % (d["personality"], d["key"], d["primary"], d["secondary"]),
           "pour: %s   image: %s" % (d["pour"]["status"], d["image"]), "",
           "essence:  %s" % d["essence"], "story:    %s" % d["story"],
           "goal: %s | fear: %s | example: %s | brands: %s" % (d["goal"], d["fear"], x.get("example", ""), x.get("brands", "")),
           "drivers:  %s / %s" % (x.get("primary_driver", ""), x.get("secondary_driver", "")),
           "colour:   %s" % x.get("colour", ""), "imagery:  %s" % x.get("imagery", ""), ""]
    for label, a, name in (("PRIMARY", pa, d["primary"]), ("SECONDARY", sa, d["secondary"])):
        out += ["%s - %s: goals %s | fears %s | tone: %s" % (label, name, a.get("goals", ""), a.get("fears", ""), a.get("tone", "")),
                "   %s" % a.get("personality", "")]
    out += ["", "siblings (same primary, %d):" % len(d["siblings"])]
    out += ["   %-26s %-32s %s" % (s["key"], s["personality"], s["pour"]) for s in d["siblings"]]
    out += [""] + ["! " + r for r in d["reminders"]]
    return "\n".join(out)


def main(argv):
    if len(argv) < 2 or argv[1] in ("-h", "--help"):
        print(__doc__)
        return 0
    if argv[1] == "--list":
        prim = argv[argv.index("--primary") + 1] if "--primary" in argv else None
        rows = [p for p in pairings() if not prim or p["primary"].lower() == prim.lower()]
        for p in rows:
            print("%-26s %-32s %s" % (p["key"], p["name"], pour_status(p["key"])[0] if "--status" in argv else ""))
        print("(%d)" % len(rows))
        return 0
    d = profile(argv[1])
    print(json.dumps(d, indent=1, ensure_ascii=False) if "--json" in argv else show(d))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
