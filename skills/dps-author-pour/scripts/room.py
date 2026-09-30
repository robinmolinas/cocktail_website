#!/usr/bin/env python3
"""room.py - the host's bookkeeping for one room, one call per step (Robin 2026-09-27: cut tokens, keep quality).
The host never writes the pour's content: this only files what the agents said and arranges what they wrote.

  room.py open PAIRING --batch NAME [--mode batch|pour|rework] [--menu TEXT] [--note TEXT]
      Scratch folder + room record from the template, and the opening host turn (siblings found automatically).

  room.py turn PAIRING ROUND [--tick TEXT]... [--last-change TEXT] [--signoffs TEXT] [--objections TEXT] < turns
      Reads the round's turns on stdin (each starts with its icon line: 🪞 **Wren:** / 📜 **Hester:** /
      🍸 **Tomás:** / 🕯️ **Host:**), stashes each in work/PAIRING/_host/rN-<who>.md, appends them verbatim
      under "### Round N" (appending to that round if it already exists), and updates the header.
      --tick "fact audit" ticks that must-have ("fact audit=v1: X1–X3 open" also annotates it).

  room.py assemble PAIRING
      Builds work/PAIRING/_host/provisional.md from the agents' artifacts and work/PAIRING/_host/config.json,
      then lints it. Prints only the lint result.

  room.py close PAIRING --summary FILE --index-note TEXT [--batch NAME]
      Copies the provisional pour into pours/, lints it (stops on any error), runs balance, allergens and
      registry --write, closes the room record with the Summary for Robin, and adds the note to the batch row
      in _studio/index.md. Prints a compact report.

config.json keys: pairing, personality, archetypes, date, batch, name, tagline, epigraph, glassware, contains,
veto_free, reading, card, language_row, sources, names_note, open_items (list); optional: draft.
"""
import datetime, json, os, re, shutil, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
SKILL = os.path.dirname(HERE)
ROOT = os.path.dirname(os.path.dirname(SKILL))
TOOLS = os.path.join(ROOT, "skills", "dps-tools", "scripts")
sys.path.insert(0, TOOLS)
from _common import POURS, STUDIO  # noqa: E402
import pourfile  # noqa: E402

WHO = {"🪞": "wren", "📜": "hester", "🍸": "tomas", "🕯️": "host", "🕯": "host", "👤": "robin"}
STANDING = ("Standing notes from Robin: **a spark, not just the classic** (STUDIO-RULES check 3: use the *Flavor Matrix* "
            "to find something original; riff when it adds something to the person); **8 rounds at most**; a lint-only "
            "fix that changes no fact and nothing in the drink doesn't void the others' sign-offs. Lessons so far: the story "
            "has to be in the glass; no drink you perform; check sibling motifs in the registry.")


def room_path(p):
    return os.path.join(STUDIO, "rooms", p + ".md")


def work(p, *parts):
    return os.path.join(STUDIO, "work", p, *parts)


def run(args, cwd=None):
    r = subprocess.run([sys.executable] + args, cwd=cwd, capture_output=True, text=True)
    return r.returncode, (r.stdout + r.stderr).strip()


# ---------------------------------------------------------------- open
def cmd_open(a):
    p = a.pairing
    if os.path.exists(room_path(p)):
        sys.exit("room already exists: %s" % room_path(p))
    os.makedirs(work(p, "_host"), exist_ok=True)
    code, out = run([os.path.join(TOOLS, "persona.py"), p, "--json"])
    try:
        personality = json.loads(out).get("name") or json.loads(out).get("personality")
    except ValueError:
        personality = None
    personality = a.personality or personality or p
    primary = p.split("-")[0]
    sibs = []
    for f in sorted(pourfile.all_pours(POURS)):
        d = pourfile.parse(f)
        if d["pairing"].startswith(primary + "-") and d["pairing"] != p:
            sibs.append("`%s.md` (*%s*, %s)" % (d["pairing"], d.get("name"), (d["status"] or "").split()[0]))
    t = open(os.path.join(SKILL, "assets", "room-template.md"), encoding="utf-8").read()
    t = (t.replace("{pairing}", p).replace("{personality}", personality)
          .replace("{date}", datetime.date.today().isoformat()).replace("{mode}", a.mode))
    opening = ("\n🕯️ **Host:** The room is open for **%s, %s**, in the %s batch. You each got your brief (skill, sanctum, "
               "rulebook, registry, persona, this room) in one call. Worked examples: `sage-lover.md`, `magician-outlaw.md`, "
               "`innocent-regular-guy.md`. This family so far: %s. Scratch folder: `_studio/work/%s/`.%s Eight rounds at "
               "most. The floor is open.\n%s%s\n") % (
        p, personality, a.batch.capitalize(), ", ".join(sibs) or "none yet", p,
        (" For interest only, from the menu view: %s." % a.menu) if a.menu else "",
        STANDING, ("\n" + a.note) if a.note else "")
    open(room_path(p), "w", encoding="utf-8").write(t.rstrip("\n") + "\n" + opening)
    print("opened %s (%s); siblings: %d" % (room_path(p), personality, len(sibs)))


# ---------------------------------------------------------------- turn
def split_turns(text):
    starts = [m.start() for m in re.finditer(r"^(?:🪞|📜|🍸|🕯️|🕯|👤) \*\*", text, re.M)]
    return [text[s:e].strip() for s, e in zip(starts, starts[1:] + [len(text)]) if text[s:e].strip()]


def set_line(s, label, value):
    return re.sub(r"^- \*\*%s[^*]*\*\*.*$" % re.escape(label),
                  lambda m: m.group(0).split(":**")[0] + ":** " + value, s, count=1, flags=re.M)


def cmd_turn(a):
    p, n = a.pairing, a.round
    turns = split_turns(sys.stdin.read())
    if not turns:
        sys.exit("no turns on stdin")
    for t in turns:
        who = WHO.get(t.split(" ", 1)[0], "x")
        f = work(p, "_host", "r%d-%s.md" % (n, who))
        if os.path.exists(f) and open(f, encoding="utf-8").read().strip() != t:
            f = f[:-3] + "-2.md"
        open(f, "w", encoding="utf-8").write(t + "\n")
    s = open(room_path(p), encoding="utf-8").read().rstrip("\n")
    body = "\n\n".join(t for t in turns if not re.match(r"^\S+ \*\*\w+:\*\* \(passes\)\s*$", t))
    if re.search(r"^### Round %d$" % n, s, re.M):
        s += "\n\n" + body + "\n"
    else:
        s += "\n\n### Round %d\n\n%s\n" % (n, body)
    s = re.sub(r"^round: *\d+( *)", lambda m: "round: %d%s" % (n, m.group(1)), s, count=1, flags=re.M)
    for tk in a.tick or []:
        name, _, note = tk.partition("=")
        s = re.sub(r"\[ \] %s" % re.escape(name), "[x] %s%s" % (name, " (%s)" % note if note else ""), s, count=1)
    if a.last_change: s = set_line(s, "Last change to the pour", a.last_change)
    if a.signoffs: s = set_line(s, "Sign-offs", a.signoffs)
    if a.objections: s = set_line(s, "Open objections", a.objections)
    open(room_path(p), "w", encoding="utf-8").write(s)
    print("round %d: %d turn(s) filed (%s)" % (n, len(turns), ", ".join(WHO.get(t.split(" ", 1)[0], "?") for t in turns)))


# ---------------------------------------------------------------- assemble
def sec(t, head):
    m = re.search(r"^(#+) *" + head + r".*?$", t, re.M)
    if not m:
        return ""
    rest = t[m.end():]
    nxt = re.search(r"^#{1,%d} " % len(m.group(1)), rest, re.M)
    return (rest[:nxt.start()] if nxt else rest).strip()


def latest(folder, prefix):
    fs = [f for f in os.listdir(folder) if f.startswith(prefix)]
    fs.sort(key=lambda f: [int(x) for x in re.findall(r"\d+", f)] or [0])
    return os.path.join(folder, fs[-1]) if fs else None


def demote(t):
    return re.sub(r"^#{1,3} ", "#### ", t, flags=re.M)


def cmd_assemble(a):
    p = a.pairing
    w = work(p)
    c = json.load(open(work(p, "_host", "config.json"), encoding="utf-8"))
    r = open(os.path.join(w, c["reading"]), encoding="utf-8").read()
    who, yours = sec(r, "whoYouAre"), sec(r, "yours")
    yours = re.split(r"^\*\*Closing line", yours, flags=re.M)[0].strip()
    paras = [x.strip() for x in yours.split("\n\n") if x.strip()]
    if paras and not re.match(r"^\d+\.", paras[0]):
        yours = "\n\n".join("%d. %s" % (i + 1, x) for i, x in enumerate(paras))
    anch = open(os.path.join(w, "historian-anchors.md"), encoding="utf-8").read()
    L = anch.splitlines()
    i = next(k for k, l in enumerate(L) if l.startswith("| kind"))
    tbl = []
    for l in L[i:]:
        if not l.startswith("|"):
            break
        tbl.append(l)
    dossier_only = sec(anch, "Dossier only") or sec(anch, "Guards")
    card = open(os.path.join(STUDIO, "fact-cards", c["card"]), encoding="utf-8").read()
    legends, conflicts = sec(card, "Legends"), sec(card, "Conflicts") or "_(none on the card)_"
    d = open(os.path.join(w, c.get("draft", "mixologist-draft.md")), encoding="utf-8").read()
    rec = sec(d, "Recipe")
    recipe = "\n".join(l for l in rec.splitlines() if l.startswith("|"))
    extras = "\n\n".join(x.strip() for x in rec.split("\n\n") if x.strip().startswith("**"))
    method = "\n".join(l for l in sec(d, "Method").splitlines() if re.match(r"^\d+\.", l))
    closing = re.search(r"\*\*closingLine[^*]*\*\*:? *(\*[^*]+\*)", d).group(1)
    rf = latest(w, "psychologist-resonance")
    res = open(rf, encoding="utf-8").read().split("\n", 1)[1].strip() if rf else sec(r, "Resonance")
    af = latest(w, "historian-audit")
    audit = open(af, encoding="utf-8").read().split("\n", 1)[1].strip()
    out = """---
pairing: {pairing}
personality: {personality}
archetypes: {archetypes} (never shown to the guest)
status: draft
veto_free: {vf}            # contains: {contains}
authored_in: the room, {date} (batch {batch})
---

# Pour — {name} · {personality} ({pairing})

## Cocktail

- **name:** {name}
- **tagline:** {tagline}
- **glassware:** {glassware}
- **contains:** `{contains}`

**recipe**

{recipe}

{extras}

**method**
{method}

**closingLine:** {closing}

## Anchors

{anchors}

## Reading

**epigraph**
*{epigraph}*

**whoYouAre**
{who}

**yours**

{yours}

---

## Dossier (research only — never shipped)

### Checks

{checks}
| Language | {language_row} |

### Fact audit

{audit}

### Resonance

{res}

### Sources

{sources}

### Legends and inferences

{legends}

**Dossier only** (Hester, `historian-anchors.md`)

{dossier_only}

**Conflicts** (fact card)

{conflicts}

### Image brief

{brief}

### Names considered

{names_note}

{names}

Wren's title-block notes:

{title}

### Open items

{open_items}
""".format(vf=str(c["veto_free"]).lower(), contains=json.dumps(c["contains"]), recipe=recipe, extras=extras,
           method=method, closing=closing, anchors="\n".join(tbl), who=who, yours=yours, checks=sec(d, "Checks"),
           audit=demote(audit), res=demote(res), legends=legends, dossier_only=dossier_only, conflicts=conflicts,
           brief=sec(d, "Image brief"), names=sec(d, "Names"), title=sec(r, "Title block"),
           open_items="\n".join("- " + x for x in c["open_items"]),
           **{k: c[k] for k in ("pairing", "personality", "archetypes", "date", "batch", "name", "tagline",
                                "glassware", "epigraph", "language_row", "sources", "names_note")})
    out = re.sub(r"\n{3,}", "\n\n", out)
    prov = work(p, "_host", "provisional.md")
    open(prov, "w", encoding="utf-8").write(out)
    print("assembled from %s, %s, %s" % (c["reading"], os.path.basename(af), os.path.basename(rf) if rf else "resonance in the reading"))
    code, lint = run([os.path.join(TOOLS, "lint_pour.py"), prov, "--spec", os.path.join(STUDIO, "specs", p + ".json")])
    print(lint)
    return code


# ---------------------------------------------------------------- close
def cmd_close(a):
    p = a.pairing
    prov, dest = work(p, "_host", "provisional.md"), os.path.join(POURS, p + ".md")
    spec = os.path.join(STUDIO, "specs", p + ".json")
    shutil.copyfile(prov, dest)
    code, lint = run([os.path.join(TOOLS, "lint_pour.py"), dest, "--spec", spec])
    print(lint.splitlines()[0])
    if code:
        print(lint)
        sys.exit("lint has errors: send them into the room (the pour file was written; the room stays open)")
    _, bal = run([os.path.join(TOOLS, "balance.py"), spec])
    print("balance: " + next((l for l in bal.splitlines() if l.startswith("VERDICT")), bal.splitlines()[-1]))
    _, alg = run([os.path.join(TOOLS, "allergens.py"), spec])
    print("allergens: " + next((l for l in alg.splitlines() if l.startswith("contains")), alg.splitlines()[-1]))
    run([os.path.join(TOOLS, "registry.py"), "--write"])
    s = open(room_path(p), encoding="utf-8").read()
    summary = open(a.summary, encoding="utf-8").read().strip()
    if not summary.startswith("## Summary for Robin"):
        summary = "## Summary for Robin\n" + summary
    s, k = re.subn(r"## Summary for Robin\n_\(written at close[^\n]*\n", lambda m: summary + "\n", s, count=1)
    s = re.sub(r"^status: open ?", "status: closed", s, count=1, flags=re.M)
    open(room_path(p), "w", encoding="utf-8").write(s)
    idx = os.path.join(STUDIO, "index.md")
    t = open(idx, encoding="utf-8").read()
    t, j = re.subn(r"^(\| batch %s \|.*?)( \|)\s*$" % re.escape(a.batch or p.split("-")[0]),
                   lambda m: m.group(1).rstrip(".") + ". " + a.index_note + m.group(2), t, count=1, flags=re.M)
    open(idx, "w", encoding="utf-8").write(t)
    print("registry written; room closed (summary %s); index row %s" % ("in" if k else "NOT FOUND", "updated" if j else "NOT FOUND"))


def main():
    import argparse
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    o = sub.add_parser("open"); o.add_argument("pairing"); o.add_argument("--batch", required=True)
    o.add_argument("--mode", default="batch"); o.add_argument("--menu"); o.add_argument("--note"); o.add_argument("--personality")
    t = sub.add_parser("turn"); t.add_argument("pairing"); t.add_argument("round", type=int)
    t.add_argument("--tick", action="append"); t.add_argument("--last-change"); t.add_argument("--signoffs"); t.add_argument("--objections")
    s = sub.add_parser("assemble"); s.add_argument("pairing")
    c = sub.add_parser("close"); c.add_argument("pairing"); c.add_argument("--summary", required=True)
    c.add_argument("--index-note", required=True); c.add_argument("--batch")
    a = ap.parse_args()
    return {"open": cmd_open, "turn": cmd_turn, "assemble": cmd_assemble, "close": cmd_close}[a.cmd](a) or 0


if __name__ == "__main__":
    sys.exit(main())
