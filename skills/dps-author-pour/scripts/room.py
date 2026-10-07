#!/usr/bin/env python3
"""room.py - the host's bookkeeping for one room, one call per step (Robin 2026-09-27: cut tokens, keep quality).
The host never writes the pour's content: this only files what the agents said and arranges what they wrote.

  room.py open PAIRING --batch NAME [--mode batch|pour|rework] [--menu TEXT] [--note TEXT] [--rounds N (rework)]
      Scratch folder + room record from the template, and the opening host turn (siblings found automatically).
      With --mode rework on an existing record: reopens it (header reset, old summary kept and renamed, a
      "## Rework, <date>" section opened with --note quoted as Robin's review). Turns then file as "Rework round N".

  room.py turn PAIRING ROUND [--files host,wren,hester,tomas] [--tick TEXT]... [--last-change TEXT] [--signoffs TEXT] [--objections TEXT] [< turns]
      --files: the agents wrote their turns to work/PAIRING/_host/rN-<who>.md themselves; file those, in that order.
      Reads the round's turns on stdin (each starts with its icon line: 🪞 **Wren:** / 📜 **Hester:** /
      🍸 **Tomás:** / 🕯️ **Host:**), stashes each in work/PAIRING/_host/rN-<who>.md, appends them verbatim
      under "### Round N" (appending to that round if it already exists), and updates the header.
      --tick "fact audit" ticks that must-have ("fact audit=v1: X1–X3 open" also annotates it).

  room.py assemble PAIRING
      Builds work/PAIRING/_host/provisional.md from the agents' artifacts and work/PAIRING/_host/config.json,
      then lints it. Prints only the lint result.

  room.py plan PRIMARY
      Starts a family plan (references/family-plan.md): makes _studio/plans/ and its scratch folder, and prints the
      family's pairings (with status) and the plans other families have already written (their claims).

  room.py close PAIRING --summary FILE --index-note TEXT [--batch NAME]
      Copies the provisional pour into pours/, lints it (stops on any error), runs balance, allergens and
      registry --write, closes the room record with the Summary for Robin, and adds the note to the batch row
      in _studio/index.md. Prints a compact report.

config.json keys: pairing, personality, archetypes, date, batch, name, tagline, epigraph, glassware, contains,
veto_free, reading, card, language_row, sources, names_note, open_items (list); optional: draft.
"""
import datetime, json, os, re, shutil, subprocess, sys

HERE = os.path.dirname(os.path.realpath(__file__))  # realpath: .claude/skills/ holds symlinks
SKILL = os.path.dirname(HERE)
ROOT = os.path.dirname(os.path.dirname(SKILL))
TOOLS = os.path.join(ROOT, "skills", "dps-tools", "scripts")
sys.path.insert(0, TOOLS)
from _common import POURS, STUDIO, studio_lock  # noqa: E402
import pourfile  # noqa: E402

WHO = {"🪞": "wren", "📜": "hester", "🍸": "tomas", "🕯️": "host", "🕯": "host", "👤": "robin"}
STANDING = ("Standing notes from Robin: **a spark, not just the classic** (STUDIO-RULES check 3: use the *Flavor Matrix* "
            "to find something original; riff when it adds something to the person). **If no spark fits, the drink must "
            "still be interesting:** Tomás uses the cocktail books to make it so, always personalised to the person; a guest "
            "shown only a plain classic may feel let down (Robin 2026-09-30); **4 rounds at most** (Robin 2026-10-01; round 1 is Wren's alone; round 4 in four steps); a lint-only "
            "fix that changes no fact and nothing in the drink doesn't void the others' sign-offs. Lessons so far: the story "
            "has to be in the glass; no drink you perform; check sibling motifs in the registry.")


def family_of(p):
    return "regular-guy" if p.startswith("regular-guy-") else p.split("-")[0]


def archetype_name(fam):
    return fam.replace("-", " ").title()


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
    if os.path.exists(room_path(p)) and a.mode == "rework":
        return reopen(a)
    if os.path.exists(room_path(p)):
        sys.exit("room already exists: %s" % room_path(p))
    os.makedirs(work(p, "_host"), exist_ok=True)
    code, out = run([os.path.join(TOOLS, "persona.py"), p, "--json"])
    try:
        personality = json.loads(out).get("name") or json.loads(out).get("personality")
    except ValueError:
        personality = None
    personality = a.personality or personality or p
    primary = family_of(p)
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
               "`innocent-regular-guy.md`. This family so far: %s. Scratch folder: `_studio/work/%s/`.%s%s **Four rounds at "
               "most.** Round 1 is Wren's alone: she lays out who the person is, in detail. Hester and Tomás join in round 2, "
               "and Tomás writes no spec until the story is ruled (unless Wren accepts the plan's lead in round 1).\n%s%s\n") % (
        p, personality, a.batch.capitalize(), ", ".join(sibs) or "none yet", p,
        (" For interest only, from the menu view: %s." % a.menu) if a.menu else "",
        (" The family plan is `_studio/plans/%s.md` (this pairing's row: a starting point, not a verdict)." % primary)
        if os.path.exists(os.path.join(STUDIO, "plans", primary + ".md")) else " No family plan exists yet.",
        STANDING, ("\n" + a.note) if a.note else "")
    open(room_path(p), "w", encoding="utf-8").write(t.rstrip("\n") + "\n" + opening)
    print("opened %s (%s); siblings: %d" % (room_path(p), personality, len(sibs)))


def reopen(a):
    """Rework: reopen the existing record (batches-and-rework.md). The first pour's summary is kept, renamed; the
    header resets; a '## Rework, <date>' section opens with Robin's notes quoted as the room's first constraint."""
    p, today = a.pairing, datetime.date.today().isoformat()
    s = open(room_path(p), encoding="utf-8").read().rstrip("\n")
    s = re.sub(r"^status: *\w+", "status: open", s, count=1, flags=re.M)
    s = re.sub(r"^round: *\d+", "round: 0", s, count=1, flags=re.M)
    s = re.sub(r"^mode: *\w+", "mode: rework", s, count=1, flags=re.M)
    s = re.sub(r"\[x\] (persona read|story \+ sourced anchors|drink \+ four checks|reading|fact audit|resonance test|"
               r"names \(≥3 \+ pick\)|image brief)(?: \([^·\n]*\))?", r"[ ] \1", s)
    s = set_line(s, "Last change to the pour", "rework round 0")
    s = set_line(s, "Sign-offs", "Wren — · Hester — · Tomás —")
    s = set_line(s, "Open objections", "none")
    s = set_line(s, "Robin's notes (rework)", "%s: %s" % (today, a.note or "see the Rework section"))
    s = s.replace("## Summary for Robin\n", "## Summary for Robin\n_(written at close, with a **What changed** list: each "
                  "note → what the room did)_\n\n## Summary for Robin (before the rework)\n", 1)
    s += ("\n\n## Rework, %s\n\n👤 **Robin (review):** %s\n\n🕯️ **Host:** The room is reopened for a rework of **%s** "
          "(`pours/%s.md`), with fresh voices. Robin's note above is the room's first constraint: answer it, and change "
          "what you must. Everything above this section is the first pour's room; the scratch folder `_studio/work/%s/` "
          "holds its artifacts. Sign-offs are needed again, and the fact audit, resonance test and lint are rerun. "
          "**%s rounds at most.**\n%s\n") % (today, a.note or "", p, p, p, a.rounds,
                                             STANDING.replace("**4 rounds at most** (Robin 2026-10-01; round 1 is Wren's alone; round 4 in four steps)", "**%d rounds for this rework**" % a.rounds))
    open(room_path(p), "w", encoding="utf-8").write(s)
    print("reopened %s for rework" % room_path(p))


# ---------------------------------------------------------------- turn
def split_turns(text):
    starts = [m.start() for m in re.finditer(r"^(?:🪞|📜|🍸|🕯️|🕯|👤) \*\*", text, re.M)]
    return [text[s:e].strip() for s, e in zip(starts, starts[1:] + [len(text)]) if text[s:e].strip()]


def set_line(s, label, value):
    return re.sub(r"^- \*\*%s[^*]*\*\*.*$" % re.escape(label),
                  lambda m: m.group(0).split(":**")[0] + ":** " + value, s, count=1, flags=re.M)


def cmd_turn(a):
    p, n = a.pairing, a.round
    if a.files:  # the agents wrote their own turns to _host/ (no host retyping, no copy slips)
        rw = bool(re.search(r"^mode: *rework", open(room_path(p), encoding="utf-8").read(), re.M))
        text = ""
        for stem in a.files.split(","):
            f = work(p, "_host", "%s%d-%s.md" % ("rw" if rw else "r", n, stem.strip()))
            if not os.path.exists(f):
                sys.exit("missing turn file: " + f)
            text += open(f, encoding="utf-8").read().strip() + "\n\n"
    else:
        text = sys.stdin.read()
    turns = split_turns(text)
    if not turns:
        sys.exit("no turns on stdin")
    rework = bool(re.search(r"^mode: *rework", open(room_path(p), encoding="utf-8").read(), re.M))
    head, tag = ("Rework round", "rw") if rework else ("Round", "r")
    for t in turns:
        who = WHO.get(t.split(" ", 1)[0], "x")
        base, k = work(p, "_host", "%s%d-%s" % (tag, n, who)), 1
        f = base + ".md"
        while os.path.exists(f) and open(f, encoding="utf-8").read().strip() != t:
            k += 1; f = "%s-%d.md" % (base, k)  # never overwrite a different turn
        open(f, "w", encoding="utf-8").write(t + "\n")
    s = open(room_path(p), encoding="utf-8").read().rstrip("\n")
    body = "\n\n".join(t for t in turns if not re.match(r"^\S+ \*\*\w+:\*\* \(passes\)\s*$", t))
    if re.search(r"^### %s %d$" % (head, n), s[s.rfind("\n## Rework"):] if rework else s, re.M):
        s += "\n\n" + body + "\n"
    else:
        s += "\n\n### %s %d\n\n%s\n" % (head, n, body)
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
           open_items="\n".join("- " + x for x in ([c["open_items"]] if isinstance(c["open_items"], str) else c["open_items"])),  # a plain string is one item, never one item per character (bug found 2026-10-06)
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
    with studio_lock():  # other family conversations write index.md too
        t = open(idx, encoding="utf-8").read()
        t, j = re.subn(r"^(\| batch %s \|.*?)( \|)\s*$" % re.escape(a.batch or p.split("-")[0]),
                       lambda m: m.group(1).rstrip(".") + ". " + a.index_note + m.group(2), t, count=1, flags=re.M)
        open(idx, "w", encoding="utf-8").write(t)
    print("registry written; room closed (summary %s); index row %s" % ("in" if k else "NOT FOUND", "updated" if j else "NOT FOUND"))


def cmd_plan(a):
    fam = a.primary.lower()
    plans = os.path.join(STUDIO, "plans")
    os.makedirs(os.path.join(plans, "work", fam), exist_ok=True)
    mine = os.path.join(plans, fam + ".md")
    print("family plan for %s: %s (%s)" % (archetype_name(fam), os.path.relpath(mine, STUDIO),
                                            "exists" if os.path.exists(mine) else "not written yet"))
    print("scratch: %s" % os.path.relpath(os.path.join(plans, "work", fam), STUDIO))
    _, out = run([os.path.join(TOOLS, "persona.py"), "--list", "--primary", archetype_name(fam), "--status"])
    print("\npairings:\n" + out)
    others = sorted(f for f in os.listdir(plans) if f.endswith(".md") and f != fam + ".md")
    print("\nother families' plans (their claims; read before claiming a story, person or bottle): %s"
          % (", ".join("plans/" + f for f in others) or "none yet"))


def main():
    import argparse
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    o = sub.add_parser("open"); o.add_argument("pairing"); o.add_argument("--batch", required=True)
    o.add_argument("--mode", default="batch"); o.add_argument("--menu"); o.add_argument("--note"); o.add_argument("--personality")
    o.add_argument("--rounds", type=int, default=4, help="rework budget (Robin sets it per rework; default 4)")
    t = sub.add_parser("turn"); t.add_argument("pairing"); t.add_argument("round", type=int)
    t.add_argument("--files", help="comma list of stems (host,wren,hester,tomas,tomas-2...): read rN-<stem>.md from _host/ instead of stdin")
    t.add_argument("--tick", action="append"); t.add_argument("--last-change"); t.add_argument("--signoffs"); t.add_argument("--objections")
    s = sub.add_parser("assemble"); s.add_argument("pairing")
    pl = sub.add_parser("plan"); pl.add_argument("primary")
    c = sub.add_parser("close"); c.add_argument("pairing"); c.add_argument("--summary", required=True)
    c.add_argument("--index-note", required=True); c.add_argument("--batch")
    a = ap.parse_args()
    return {"open": cmd_open, "turn": cmd_turn, "assemble": cmd_assemble, "close": cmd_close, "plan": cmd_plan}[a.cmd](a) or 0


if __name__ == "__main__":
    sys.exit(main())
