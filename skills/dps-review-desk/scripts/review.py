#!/usr/bin/env python3
# /// script
# requires-python = ">=3.9"
# dependencies = ["openpyxl>=3.1"]
# ///
"""review.py -Robin's review desk: every pour in an Excel workbook he reads, edits and comments on,
and everything he wrote brought back into the studio without losing a word.

Usage (PY = pours/_studio/.venv/bin/python, which has openpyxl; `setup` runs with any python3):
  python3 review.py setup                          create pours/_studio/.venv with openpyxl (idempotent)
  PY review.py export [--batch PRIMARY] [--status draft,flagged] [--force]
                                                   pour files -> pours/_studio/review.xlsx
  PY review.py status                              what Robin changed since export (JSON; changes nothing)
  PY review.py sync [--dry-run]                    workbook -> studio (JSON report), then re-export
  PY review.py note PAIRING "text"                 a note from the desk, shown to Robin in the next export
  PY review.py approve PAIRING [--note "text"]     approval given in chat (only when Robin says so)

Rules it keeps:
- Robin's words win. A changed cell is written into the pour file verbatim, and the write is refused
  unless the re-parsed file gives back exactly what he typed. Unchanged fields are never touched.
- Nothing he wrote is lost: export stops on unsynced changes (unless --force), the previous workbook is
  always archived, both commands stop while Excel has the workbook open, and a row whose pour changed
  after export is skipped with its edits kept as desk notes.
- A recipe edit holds that row's approval until Tomas updates the spec (the guest's allergen veto
  depends on it). Every other finding is reported, never blocking.
"""
import datetime, hashlib, json, os, re, shutil, subprocess, sys

HERE = os.path.dirname(os.path.realpath(__file__))
TOOLS_SCRIPTS = os.path.normpath(os.path.join(HERE, "..", "..", "dps-tools", "scripts"))
sys.path.insert(0, TOOLS_SCRIPTS)
import pourfile  # noqa: E402
from _common import POURS, STUDIO  # noqa: E402

WORKBOOK = os.path.join(STUDIO, "review.xlsx")
LOCK = os.path.join(STUDIO, "~$review.xlsx")
ARCHIVE = os.path.join(STUDIO, "review-archive")
DESK_NOTES = os.path.join(STUDIO, "desk-notes.json")
LEDGER = os.path.join(STUDIO, "robin-edits.md")
CANDIDATES = os.path.join(STUDIO, "rule-candidates.md")
INDEX = os.path.join(STUDIO, "index.md")
ROOMS = os.path.join(STUDIO, "rooms")
VENV = os.path.join(STUDIO, ".venv")

TEXT_FIELDS = ["name", "tagline", "epigraph", "whoYouAre"]   # then yours 1..N, then:
TAIL_FIELDS = ["recipe", "method", "closingLine"]
READ_ONLY = ["pairing", "personality", "the personality", "status", "drink", "glass", "contains", "flags",
             "this is me", "room record", "from the desk"]
ROBIN = ["Decision", "Notes to the room"]
DECISIONS = ["—", "Approve", "Needs work"]
GROUND = {"name": "Wren, Hester, Tomás", "recipe": "Tomás", "method": "Tomás", "closingLine": "Tomás"}
STATUS_ORDER = {"flagged": 0, "draft": 1, "approved": 2}


class DeskError(Exception):
    pass


def today():
    return datetime.date.today().isoformat()


def h(value):
    return hashlib.sha1(norm(value).encode("utf-8")).hexdigest()[:12]


def file_hash(path):
    with open(path, "rb") as f:
        return hashlib.sha1(f.read()).hexdigest()[:12]


def norm(value):
    if value is None:
        return ""
    if isinstance(value, float) and value.is_integer():
        value = int(value)
    t = str(value).replace("\r\n", "\n").replace("\r", "\n")
    return "\n".join(line.rstrip() for line in t.split("\n")).strip()


def pour_path(pairing):
    return os.path.join(POURS, pairing + ".md")


# ---------------------------------------------------------------- pour <-> cells

def cells_from(d, n_yours):
    c = {"name": d["name"] or "", "tagline": d["tagline"] or "", "epigraph": d["epigraph"] or "",
         "whoYouAre": "\n\n".join(d["whoYouAre"])}
    for i in range(n_yours):
        c["yours %d" % (i + 1)] = d["yours"][i] if i < len(d["yours"]) else ""
    c["recipe"] = "\n".join(" | ".join(x for x in (r["amount"], r["item"]) if x) + (" | " + r["note"] if r["note"] else "")
                            for r in d["recipe"])
    c["method"] = "\n".join(d["method"])
    c["closingLine"] = d["closingLine"] or ""
    return c


def one_line(t):
    return re.sub(r"\s*\n\s*", " ", t).strip()


def paragraphs(t):
    return [one_line(p) for p in re.split(r"\n\s*\n", norm(t)) if p.strip()]


def yours_from(cells, n_yours):
    """A blank line inside a paragraph cell splits it in two; an emptied cell removes the paragraph."""
    out = []
    for i in range(n_yours):
        out += paragraphs(cells.get("yours %d" % (i + 1), ""))
    return out


def recipe_from(t):
    rows = []
    for line in norm(t).split("\n"):
        if not line.strip():
            continue
        parts = [p.strip() for p in line.split("|")]
        if len(parts) == 1:
            parts = ["", parts[0]]
        rows.append({"amount": parts[0], "item": parts[1], "note": " | ".join(parts[2:]).strip()})
    return rows


def _region(text, start, ends):
    i = text.find(start)
    if i < 0:
        raise DeskError("can't find %r in the pour file" % start)
    j = min([text.find(e, i + len(start)) for e in ends if text.find(e, i + len(start)) >= 0] or [len(text)])
    return i, j


def _rewrap(old_raw, new):
    s = old_raw.strip()
    italic = len(s) > 1 and s.startswith("*") and s.endswith("*") and not s.startswith("**")
    return "*%s*" % new if italic else new


def _set_bullet(block, name, new):
    for pat in (r"^(- \*\*%s:\*\*[ \t]*)(.*)$", r"^(- \*\*%s\*\*[^:\n]*:\*?\*?[ \t]*)(.*)$"):
        m = re.search(pat % name, block, re.M)
        if m:
            return block[:m.start(2)] + _rewrap(m.group(2), new) + block[m.end(2):]
    raise DeskError("can't find the %s line" % name)


def _set_numbered(block, header, items):
    """Replace the numbered list that follows `header` inside block (first to last numbered line)."""
    i = block.find(header)
    if i < 0:
        raise DeskError("can't find %r" % header)
    lines = list(re.finditer(r"^[ \t]*\d+\.[^\n]*$", block[i:], re.M))
    if not lines:
        raise DeskError("no numbered list after %r" % header)
    a, b = i + lines[0].start(), i + lines[-1].end()
    gap = "\n\n" if len(lines) > 1 and "\n\n" in block[i + lines[0].end():i + lines[1].start() + 1] else "\n"
    return block[:a] + gap.join("%d. %s" % (k + 1, t) for k, t in enumerate(items)) + block[b:]


def apply_fields(text, changes, n_yours):
    """Write Robin's changed fields into the pour text. `changes` holds cell values for changed fields only."""
    ci, cj = _region(text, "## Cocktail", ["## Anchors", "## Reading"])
    ri, rj = _region(text, "## Reading", ["\n---\n", "## Dossier"])
    if not ci < cj <= ri < rj:
        raise DeskError("unexpected section order in the pour file")
    head, cocktail, mid, reading, tail = text[:ci], text[ci:cj], text[cj:ri], text[ri:rj], text[rj:]

    if "name" in changes:
        old = pourfile._clean(re.search(r"^- \*\*name:\*\*\s*(.*)$", cocktail, re.M).group(1)) \
            if re.search(r"^- \*\*name:\*\*", cocktail, re.M) else None
        cocktail = _set_bullet(cocktail, "name", one_line(changes["name"]))
        if old:
            head = re.sub(r"^(# Pour — )%s( · )" % re.escape(old), lambda m: m.group(1) + one_line(changes["name"]) + m.group(2),
                          head, count=1, flags=re.M)
    if "tagline" in changes:
        cocktail = _set_bullet(cocktail, "tagline", one_line(changes["tagline"]))
    if "recipe" in changes:
        a, b = _region(cocktail, "**recipe**", ["**method**"])
        block = cocktail[a:b]
        tlines = [m for m in re.finditer(r"^\|[^\n]*$", block, re.M)]
        if len(tlines) < 2:
            raise DeskError("recipe table not found")
        table = [tlines[0].group(0), tlines[1].group(0)]   # keep the header and separator rows
        table += ["| %s | %s | %s |" % (r["amount"], r["item"], r["note"]) if r["note"]
                  else "| %s | %s | |" % (r["amount"], r["item"]) for r in recipe_from(changes["recipe"])]
        block = block[:tlines[0].start()] + "\n".join(table) + block[tlines[-1].end():]
        cocktail = cocktail[:a] + block + cocktail[b:]
    if "method" in changes:
        steps = [one_line(s) for s in norm(changes["method"]).split("\n") if s.strip()]
        a, b = _region(cocktail, "**method**", ["**closingLine"])
        cocktail = cocktail[:a] + _set_numbered(cocktail[a:b], "**method**", steps) + cocktail[b:]
    if "closingLine" in changes:
        m = re.search(r"(\*\*closingLine:\*\*[ \t]*)(.*)", cocktail)
        if not m:
            raise DeskError("can't find the closingLine")
        cocktail = cocktail[:m.start(2)] + _rewrap(m.group(2), one_line(changes["closingLine"])) + cocktail[m.end(2):]

    if "epigraph" in changes:
        m = re.search(r"\*\*epigraph\*\*[^\n]*\n([^\n]*)", reading)
        if not m:
            raise DeskError("can't find the epigraph")
        reading = reading[:m.start(1)] + _rewrap(m.group(1), one_line(changes["epigraph"])) + reading[m.end(1):]
    if "whoYouAre" in changes:
        m = re.search(r"\*\*whoYouAre\*\*[^\n]*\n", reading)
        k = reading.find("**yours**")
        if not m or k < 0:
            raise DeskError("can't find whoYouAre")
        reading = reading[:m.end()] + "\n\n".join(paragraphs(changes["whoYouAre"])) + "\n\n" + reading[k:]
    if any(f.startswith("yours ") for f in changes):
        reading = _set_numbered(reading, "**yours**", changes["_yours"])

    return head + cocktail + mid + reading + tail


def expected_after(d, changes):
    """What the parser must return for each changed field once written."""
    exp = {}
    for f in ("name", "tagline", "epigraph", "closingLine"):
        if f in changes:
            exp[f] = one_line(changes[f])
    if "whoYouAre" in changes:
        exp["whoYouAre"] = paragraphs(changes["whoYouAre"])
    if "_yours" in changes:
        exp["yours"] = changes["_yours"]
    if "recipe" in changes:
        exp["recipe"] = recipe_from(changes["recipe"])
    if "method" in changes:
        exp["method"] = [one_line(s) for s in norm(changes["method"]).split("\n") if s.strip()]
    return exp


def set_status(text, status, comment):
    new = "status: %-19s # %s" % (status, comment)
    out, n = re.subn(r"^status:.*$", new, text, count=1, flags=re.M)
    if not n:
        raise DeskError("no status line in the frontmatter")
    return out


# ---------------------------------------------------------------- studio files

def load_notes():
    if os.path.exists(DESK_NOTES):
        with open(DESK_NOTES, encoding="utf-8") as f:
            return json.load(f)
    return {}


def save_notes(notes):
    with open(DESK_NOTES, "w", encoding="utf-8") as f:
        json.dump({k: v for k, v in notes.items() if v}, f, indent=1, ensure_ascii=False)
        f.write("\n")


def resonance_line(d):
    m = re.search(r'"this is me" line[^\n]*\n+(?:[^\n]*\n)*?>\s*\*?(.+?)\*?\s*$', d["dossier"], re.M | re.I)
    return m.group(1).strip() if m else ""


def room_path(pairing):
    return os.path.join(ROOMS, pairing + ".md")


def log_to_room(d, date, decision, notes, edits, extra=None):
    """Robin's review goes at the top of the room record, newest first (Wren and the rework read it there)."""
    path = room_path(d["pairing"])
    if not os.path.exists(path):
        os.makedirs(ROOMS, exist_ok=True)
        with open(path, "w", encoding="utf-8") as f:
            f.write("---\npairing: %s\npersonality: %s\nstatus: closed\nround: 0\nmode: review\n---\n\n"
                    "# The room: %s (%s)\n\nThis pour was authored before the studio's room existed (party mode, "
                    "2026-09-24), so there's no conversation on record. Robin's reviews are logged here.\n"
                    % (d["pairing"], d["personality"], d["personality"], d["pairing"]))
    with open(path, encoding="utf-8") as f:
        text = f.read()
    lines = ["## Robin's review, %s (review desk)" % date, ""]
    lines.append("- **Decision:** %s" % decision)
    if notes:
        lines.append("- **Robin's notes:** %s" % one_line(notes))
    if edits:
        lines.append("- **Robin's edits** (his words: kept verbatim, never changed back):")
        for e in edits:
            lines.append("  - **%s:** %s → %s" % (e["field"], json.dumps(e["before"], ensure_ascii=False),
                                                   json.dumps(e["after"], ensure_ascii=False)))
    for x in extra or []:
        lines.append("- %s" % x)
    block = "\n".join(lines) + "\n\n"
    m = re.search(r"^# .*\n", text, re.M)
    at = m.end() if m else len(text)
    rest = text[at:].lstrip("\n")
    with open(path, "w", encoding="utf-8") as f:
        f.write(text[:at] + "\n" + block + rest)


def cell_md(t):
    return norm(t).replace("|", "\\|").replace("\n\n", " ¶ ").replace("\n", " / ")


def log_ledger(pairing, date, edits):
    if not edits:
        return
    if not os.path.exists(LEDGER):
        with open(LEDGER, "w", encoding="utf-8") as f:
            f.write("# Robin's edits\n\nEvery direct edit Robin made at the review desk, before → after. His words are final; "
                    "these rows are for learning. Each agent reads the rows on its ground, learns the lesson "
                    "(Wren: BOND.md voice ledger), then writes its name in **learned**.\n\n"
                    "| date | pour | field | before | after | ground | learned |\n| --- | --- | --- | --- | --- | --- | --- |\n")
    with open(LEDGER, "a", encoding="utf-8") as f:
        for e in edits:
            base = e["field"].split(" ")[0]
            f.write("| %s | %s | %s | %s | %s | %s | |\n" % (date, pairing, e["field"], cell_md(e["before"]),
                                                               cell_md(e["after"]), GROUND.get(base, "Wren")))


def queue_rework(pairings, date):
    if not pairings or not os.path.exists(INDEX):
        return
    with open(INDEX, encoding="utf-8") as f:
        text = f.read()
    row = "| review %s | %s | rework queued | %s | Robin's notes from the review desk (top of each room record) |\n" % (
        date, ", ".join(pairings), date)
    m = list(re.finditer(r"^\|.*\|[ \t]*$", text, re.M))
    if m:
        text = text[:m[-1].end()] + "\n" + row.rstrip("\n") + text[m[-1].end():]
    else:
        text += "\n" + row
    with open(INDEX, "w", encoding="utf-8") as f:
        f.write(text)


def candidate_rows():
    if not os.path.exists(CANDIDATES):
        return []
    rows = []
    for line in open(CANDIDATES, encoding="utf-8").read().splitlines():
        if not line.startswith("|") or set(line) <= set("|-: "):
            continue
        cells = [c.strip() for c in re.split(r"(?<!\\)\|", line.strip())[1:-1]]
        if len(cells) < 5 or cells[0] == "date":
            continue
        rows.append({"date": cells[0], "by": cells[1], "rule": cells[2], "why": cells[3], "robin": cells[4], "line": line})
    return rows


def pending_candidates():
    return [r for r in candidate_rows() if not r["robin"] or r["robin"].lower().startswith(("pending", "—", "-"))]


def mark_candidate(rule_id, verdict, note, date):
    with open(CANDIDATES, encoding="utf-8") as f:
        text = f.read()
    for r in candidate_rows():
        if h(r["rule"]) == rule_id:
            cells = [c.strip() for c in re.split(r"(?<!\\)\|", r["line"].strip())[1:-1]]
            cells[4] = "**%s** (%s, review desk)%s" % (verdict, date, (": " + cell_md(note)) if note else "")
            text = text.replace(r["line"], "| " + " | ".join(cells) + " |", 1)
            with open(CANDIDATES, "w", encoding="utf-8") as f:
                f.write(text)
            return r
    return None


def lint_findings(path, others=None):
    from lint_pour import lint
    if others is None:
        others = [pourfile.parse(f) for f in pourfile.all_pours(POURS)]
    d, E, W = lint(path, others)
    return ["ERROR " + e for e in E] + ["warn " + w for w in W]


def drinks():
    try:
        import registry
        return {r["pairing"]: r for r in registry.gather()}
    except Exception:  # the desk still works if a spec is broken
        return {}


def write_registry():
    import registry
    rows = registry.gather()
    for name, content in (("registry.md", registry.registry_md(rows)), ("menu-assessment.md", registry.menu_md(rows))):
        with open(os.path.join(STUDIO, name), "w", encoding="utf-8") as f:
            f.write(content)


# ---------------------------------------------------------------- workbook

def need_openpyxl():
    try:
        import openpyxl  # noqa: F401
        return openpyxl
    except ImportError:
        sys.exit("openpyxl is missing: run `python3 %s setup`, then use %s/bin/python" % (__file__, VENV))


def excel_open():
    if os.path.exists(LOCK):
        raise DeskError("the workbook is open in Excel (%s exists). Save it and close Excel's window, then run this again."
                        % os.path.basename(LOCK))


def pours_for(batch=None, statuses=None):
    ds = [pourfile.parse(f) for f in pourfile.all_pours(POURS)]
    if batch:
        ds = [d for d in ds if d["pairing"].split("-")[0] == batch.lower()]
    if statuses:
        ds = [d for d in ds if (d["status"] or "").split()[0] in statuses]
    return sorted(ds, key=lambda d: (STATUS_ORDER.get((d["status"] or "").split()[0], 1), d["pairing"]))


def columns(n_yours):
    return READ_ONLY[:3] + TEXT_FIELDS + ["yours %d" % (i + 1) for i in range(n_yours)] + TAIL_FIELDS \
        + ROBIN + READ_ONLY[3:] + ["_fp"]


def personas(pairings):
    """What the studio knows about each personality (persona.py), for Robin to read beside the pour."""
    import functools
    import persona
    persona.xlsx_rows = functools.lru_cache()(persona.xlsx_rows)
    persona.pairings = functools.lru_cache()(persona.pairings)
    out = {}
    for k in pairings:
        try:
            out[k] = persona.profile(k)
        except (SystemExit, Exception):  # a pairing missing from the sources still exports
            out[k] = None
    return out


def persona_card(p):
    if not p:
        return "(not found in the persona sources)"
    x = p["xlsx"]
    lines = ["%s × %s (never shown to the guest)" % (p["primary"], p["secondary"]), "", p["essence"], "", p["story"], "",
             "Goal: %s · Fear: %s" % (p["goal"], p["fear"])]
    if x.get("example"):
        lines.append("Example: %s" % x["example"])
    if x.get("brands"):
        lines.append("Brands: %s" % x["brands"])
    if x.get("primary_driver") or x.get("secondary_driver"):
        lines.append("Drivers: %s / %s" % (x.get("primary_driver", ""), x.get("secondary_driver", "")))
    pa, sa = p["primary_archetype"], p["secondary_archetype"]
    lines.append("%s fears: %s · %s fears: %s" % (p["primary"], pa.get("fears", "?"), p["secondary"], sa.get("fears", "?")))
    return "\n".join(lines)


PERSONA_COLS = [("pairing", 18, lambda p: p["key"]), ("personality", 18, lambda p: p["personality"]),
                ("archetypes", 16, lambda p: "%s × %s" % (p["primary"], p["secondary"])),
                ("essence", 36, lambda p: p["essence"]), ("story", 60, lambda p: p["story"]),
                ("goal", 16, lambda p: p["goal"]), ("fear", 16, lambda p: p["fear"]),
                ("example", 20, lambda p: p["xlsx"].get("example", "")), ("brands", 20, lambda p: p["xlsx"].get("brands", "")),
                ("drivers", 20, lambda p: " / ".join(x for x in (p["xlsx"].get("primary_driver"), p["xlsx"].get("secondary_driver")) if x)),
                ("colour", 30, lambda p: p["xlsx"].get("colour", "")), ("imagery", 44, lambda p: p["xlsx"].get("imagery", ""))]
for _side in ("primary", "secondary"):
    PERSONA_COLS += [("%s: %s" % (_side, f), w, (lambda f, s: lambda p: "%s: %s" % (p[s], p["%s_archetype" % s].get(f, "")))(f, _side))
                     for f, w in (("goals", 26), ("fears", 24), ("tone", 24), ("personality", 50), ("audience", 36))]


WIDTH = {"pairing": 18, "personality": 16, "the personality": 50, "name": 20, "tagline": 32, "epigraph": 32, "whoYouAre": 60, "recipe": 42,
         "method": 55, "closingLine": 32, "Decision": 13, "Notes to the room": 40, "status": 10, "drink": 26, "glass": 18,
         "contains": 14, "flags": 50, "this is me": 36, "room record": 28, "from the desk": 44}


def export(batch=None, statuses=None, force=False, carry=None):
    openpyxl = need_openpyxl()
    from openpyxl.styles import Alignment, Font, PatternFill, Protection
    from openpyxl.worksheet.datavalidation import DataValidation
    excel_open()
    if os.path.exists(WORKBOOK):
        pending = changes_in_workbook()
        if pending["changed"] and not force:
            raise DeskError("the workbook has changes that aren't synced yet (%s). Run `sync` first, or export --force "
                            "(the old workbook is archived either way)." % ", ".join(pending["changed"]))
        os.makedirs(ARCHIVE, exist_ok=True)
        shutil.copy2(WORKBOOK, os.path.join(ARCHIVE, "review-%s.xlsx" % datetime.datetime.now().strftime("%Y%m%d-%H%M%S")))

    ds = pours_for(batch, statuses)
    n_yours = max([len(d["yours"]) for d in ds] + [4]) + 1   # one spare column to add a paragraph
    cols = columns(n_yours)
    info, notes = drinks(), load_notes()
    every = [pourfile.parse(f) for f in pourfile.all_pours(POURS)]
    people = personas([d["pairing"] for d in ds])
    grey, white, robin = PatternFill("solid", fgColor="EDEDED"), PatternFill("solid", fgColor="FFFFFF"), PatternFill("solid", fgColor="FFF2CC")
    head_fill = PatternFill("solid", fgColor="3A3A3A")
    wrap = Alignment(wrap_text=True, vertical="top")

    wb = openpyxl.Workbook()
    readme = wb.active
    readme.title = "Read me"
    for i, line in enumerate(README_LINES, 1):
        readme.cell(row=i, column=1, value=line).alignment = Alignment(wrap_text=True, vertical="top")
    readme.cell(row=1, column=1).font = Font(bold=True, size=14)
    readme.column_dimensions["A"].width = 110

    ws = wb.create_sheet("Pours")
    for j, c in enumerate(cols, 1):
        cell = ws.cell(row=1, column=j, value=c)
        cell.font, cell.fill, cell.alignment = Font(bold=True, color="FFFFFF"), head_fill, wrap
        base = c.split(" ")[0] if c.startswith("yours") else c
        ws.column_dimensions[cell.column_letter].width = WIDTH.get(base, 62)
    dv = DataValidation(type="list", formula1='"%s"' % ",".join(DECISIONS), allow_blank=True)
    ws.add_data_validation(dv)
    for i, d in enumerate(ds, 2):
        cells = cells_from(d, n_yours)
        r = info.get(d["pairing"], {})
        abv = r.get("abv")
        room = room_path(d["pairing"])
        flags = lint_findings(d["file"], every)
        ro = {"pairing": d["pairing"], "personality": d["personality"], "the personality": persona_card(people.get(d["pairing"])),
              "status": (d["status"] or "?").split()[0],
              "drink": " · ".join(x for x in (r.get("family"), r.get("style"), r.get("base"),
                                               ("%.1f%%" % abv) if abv else None) if x and x != "?"),
              "glass": d["glassware"] or "", "contains": ", ".join(d["contains"] or []) or "veto-free",
              "flags": "\n".join(flags) or "clean", "this is me": resonance_line(d),
              "room record": os.path.relpath(room, POURS) if os.path.exists(room) else "(none yet)",
              "from the desk": "\n".join("%s: %s" % (n["date"], n["text"]) for n in notes.get(d["pairing"], []))}
        fp = {"_file": file_hash(d["file"]), "_n_yours": n_yours}
        fp.update({k: h(v) for k, v in cells.items()})
        lines = 1
        for j, c in enumerate(cols, 1):
            if c == "_fp":
                v = json.dumps(fp)
            elif c in cells:
                v = cells[c]
            elif c in ro:
                v = ro[c]
            else:
                v = (carry or {}).get(d["pairing"], {}).get(c, "—" if c == "Decision" else "")
            cell = ws.cell(row=i, column=j, value=v)
            cell.data_type = "s"
            cell.alignment = wrap
            if c in cells:
                cell.fill, cell.protection = white, Protection(locked=False)
            elif c in ROBIN:
                cell.fill, cell.protection = robin, Protection(locked=False)
            else:
                cell.fill = grey
            if c != "_fp" and v:
                width = WIDTH.get(c.split(" ")[0] if c.startswith("yours") else c, 62)
                lines = max(lines, sum(1 + len(p) // max(1, int(width * 1.1)) for p in str(v).split("\n")))
        dv.add(ws.cell(row=i, column=cols.index("Decision") + 1))
        ws.row_dimensions[i].height = min(409, 15 * lines + 4)
    ws.freeze_panes = "C2"
    ws.column_dimensions[ws.cell(row=1, column=len(cols)).column_letter].hidden = True
    ws.protection.sheet = True
    ws.protection.formatColumns = False
    ws.protection.formatRows = False

    ps = wb.create_sheet("Personalities")
    for j, (c, w, _) in enumerate(PERSONA_COLS, 1):
        cell = ps.cell(row=1, column=j, value=c)
        cell.font, cell.fill, cell.alignment = Font(bold=True, color="FFFFFF"), head_fill, wrap
        ps.column_dimensions[cell.column_letter].width = w
    for i, d in enumerate(ds, 2):
        p = people.get(d["pairing"])
        if not p:
            ps.cell(row=i, column=1, value=d["pairing"])
            continue
        for j, (c, w, get) in enumerate(PERSONA_COLS, 1):
            cell = ps.cell(row=i, column=j, value=get(p) or "")
            cell.data_type, cell.alignment, cell.fill = "s", wrap, grey
        ps.row_dimensions[i].height = 180
    ps.freeze_panes = "C2"
    ps.protection.sheet = True
    ps.protection.formatColumns = False
    ps.protection.formatRows = False

    rs = wb.create_sheet("Rule candidates")
    rcols = ["date", "proposed by", "rule", "why", "Decision", "Robin's note", "_id"]
    rdv = DataValidation(type="list", formula1='"—,Accept,Reject"', allow_blank=True)
    rs.add_data_validation(rdv)
    for j, c in enumerate(rcols, 1):
        cell = rs.cell(row=1, column=j, value=c)
        cell.font, cell.fill, cell.alignment = Font(bold=True, color="FFFFFF"), head_fill, wrap
        rs.column_dimensions[cell.column_letter].width = {"rule": 60, "why": 50, "Robin's note": 40}.get(c, 14)
    for i, r in enumerate(pending_candidates(), 2):
        for j, v in enumerate([r["date"], r["by"], r["rule"], r["why"], "—", "", h(r["rule"])], 1):
            cell = rs.cell(row=i, column=j, value=v)
            cell.data_type, cell.alignment = "s", wrap
            if j in (5, 6):
                cell.fill, cell.protection = robin, Protection(locked=False)
            else:
                cell.fill = grey
        rdv.add(rs.cell(row=i, column=5))
    rs.column_dimensions["G"].hidden = True
    rs.freeze_panes = "A2"
    rs.protection.sheet = True
    rs.protection.formatColumns = False
    rs.protection.formatRows = False

    ms = wb.create_sheet("Menu")
    ms.column_dimensions["A"].width, ms.column_dimensions["B"].width = 34, 90
    menu = os.path.join(STUDIO, "menu-assessment.md")
    row = 1
    for line in (open(menu, encoding="utf-8").read().splitlines() if os.path.exists(menu) else []):
        m = re.match(r"^- \*\*(.+?):?\*\*:?\s*(.*)$", line)
        if m:
            ms.cell(row=row, column=1, value=m.group(1).rstrip(":")).font = Font(bold=True)
            ms.cell(row=row, column=2, value=m.group(2)).alignment = wrap
        elif line.startswith("#") or line.startswith(">"):
            ms.cell(row=row, column=1, value=line.lstrip("#> ").strip()).font = Font(bold=line.startswith("#"), italic=line.startswith(">"))
        else:
            continue
        row += 1

    wb.active = 1
    wb.save(WORKBOOK)
    return {"workbook": WORKBOOK, "pours": [d["pairing"] for d in ds], "rule_candidates": len(pending_candidates())}


README_LINES = [
    "The review desk",
    "",
    "Pours: one row per pour. White cells are the words: edit them directly, and your words win. "
    "Yellow cells are yours: Decision (— / Approve / Needs work) and Notes to the room. Grey cells are for reading.",
    "Paragraphs: one per 'yours' column. Empty a cell to remove that paragraph; type in the spare column to add one; "
    "a blank line inside a cell splits it in two. whoYouAre keeps its paragraphs separated by a blank line.",
    "Recipe: one ingredient per line, as  amount | item | note (the note is shown to the guest, and is optional). "
    "Editing the recipe holds an approval until Tomás updates the spec, because the allergen veto depends on it.",
    "The personality: the source card for each pour (essence, story, goal, fear, example, drivers), next to its words. "
    "The Personalities sheet has everything the studio knows, archetype by archetype. Archetype names are for you: "
    "the guest never sees them.",
    "Asterisks are kept as written: *word* is italics in the pour.",
    "Notes to the room send the pour back to the room (a rework) with your notes as its first constraint. "
    "Approve with a note = approved, and the note is logged as a comment.",
    "From the desk: anything the studio needs you to see (checks your edit tripped, an edit that couldn't be applied).",
    "Rule candidates: rules the room proposed. Accept adds it to the studio rules; Reject logs it.",
    "When you're done: save, close the workbook, and tell Claude 'sync the review desk'.",
]


def read_workbook():
    openpyxl = need_openpyxl()
    if not os.path.exists(WORKBOOK):
        raise DeskError("no workbook yet: run export first")
    wb = openpyxl.load_workbook(WORKBOOK)
    ws = wb["Pours"]
    head = [c.value for c in ws[1]]
    rows = []
    for r in ws.iter_rows(min_row=2, values_only=True):
        if not any(v not in (None, "") for v in r):
            continue
        rows.append({head[j]: r[j] for j in range(len(head)) if head[j]})
    rules = []
    if "Rule candidates" in wb.sheetnames:
        rs = wb["Rule candidates"]
        rh = [c.value for c in rs[1]]
        for r in rs.iter_rows(min_row=2, values_only=True):
            if any(r):
                rules.append({rh[j]: r[j] for j in range(len(rh)) if rh[j]})
    return rows, rules


def row_changes(row):
    fp = json.loads(row["_fp"])
    n_yours = fp["_n_yours"]
    fields = TEXT_FIELDS + ["yours %d" % (i + 1) for i in range(n_yours)] + TAIL_FIELDS
    cells = {f: norm(row.get(f)) for f in fields}
    changed = [f for f in fields if h(cells[f]) != fp.get(f)]
    decision = norm(row.get("Decision"))
    decision = "" if decision in ("", "—", "-") else decision
    notes = norm(row.get("Notes to the room"))
    return fp, n_yours, cells, changed, decision, notes


def changes_in_workbook():
    rows, rules = read_workbook()
    out = {"changed": [], "rows": []}
    for row in rows:
        fp, n, cells, changed, decision, notes = row_changes(row)
        if changed or decision or notes:
            out["changed"].append(row["pairing"])
            out["rows"].append({"pairing": row["pairing"], "fields": changed, "decision": decision or None, "notes": notes or None})
    for r in rules:
        v = norm(r.get("Decision"))
        if v in ("Accept", "Reject"):
            out["changed"].append("rule: " + norm(r.get("rule"))[:40])
    return out


# ---------------------------------------------------------------- sync

def sync(dry=False):
    excel_open()
    rows, rules = read_workbook()
    date = today()
    notes_db = load_notes()
    report = {"workbook": WORKBOOK, "dry_run": dry, "pours": [], "rules": {"accepted": [], "rejected": []},
              "reworks": [], "conflicts": [], "errors": []}
    carry = {}
    for row in rows:
        pairing = row["pairing"]
        fp, n_yours, cells, changed, decision, notes = row_changes(row)
        if not (changed or decision or notes):
            continue
        path = pour_path(pairing)
        entry = {"pairing": pairing, "edits": [], "decision": decision or None, "notes": notes or None,
                 "approval": None, "new_findings": [], "applied": False}
        report["pours"].append(entry)
        if not os.path.exists(path) or file_hash(path) != fp["_file"]:
            entry["conflict"] = True
            report["conflicts"].append(pairing)
            kept = ["the pour changed after export (a rework or an approval in chat), so nothing on this row was applied. "
                    "Your words are kept here; re-enter what still applies:"]
            kept += ["%s → %s" % (f, json.dumps(cells[f], ensure_ascii=False)) for f in changed]
            if decision:
                kept.append("Decision: " + decision)
            if notes:
                kept.append("Notes: " + notes)
            notes_db.setdefault(pairing, []).append({"date": date, "text": " ".join(kept)})
            continue
        d = pourfile.parse(path)
        before_cells = cells_from(d, n_yours)
        change_vals = {f: cells[f] for f in changed}
        if any(f.startswith("yours ") for f in changed):
            change_vals["_yours"] = yours_from(cells, n_yours)
        entry["edits"] = [{"field": f, "before": before_cells[f], "after": cells[f]} for f in changed]
        text = open(path, encoding="utf-8").read()
        try:
            new = apply_fields(text, change_vals, n_yours) if changed else text
        except DeskError as e:
            report["errors"].append("%s: %s" % (pairing, e))
            notes_db.setdefault(pairing, []).append({"date": date, "text": "couldn't apply your edits (%s): kept here: %s" % (
                e, "; ".join("%s → %s" % (f, json.dumps(cells[f], ensure_ascii=False)) for f in changed))})
            continue
        if changed:
            tmp = path + ".desk-check"
            with open(tmp, "w", encoding="utf-8") as f:
                f.write(new)
            got = pourfile.parse(tmp)
            os.remove(tmp)
            exp = expected_after(d, change_vals)
            bad = [k for k, v in exp.items() if got.get(k) != v]
            if bad:
                report["errors"].append("%s: the edit to %s wouldn't read back as typed, so it wasn't written" % (pairing, ", ".join(bad)))
                notes_db.setdefault(pairing, []).append({"date": date, "text": "your edit to %s couldn't be written safely; kept here: %s" % (
                    ", ".join(bad), "; ".join("%s → %s" % (f, json.dumps(cells[f], ensure_ascii=False)) for f in changed))})
                continue
        approve = decision == "Approve"
        needs_work = decision == "Needs work" or (notes and not approve)
        extra = []
        if approve and "recipe" in changed:
            entry["approval"] = "held: the recipe changed, so Tomás must update the spec and the allergen check must rerun"
            extra.append("**Approval held:** the recipe was edited in the same review; Tomás updates the spec, then the "
                         "approval applies (Robin can override in chat).")
        elif approve:
            new = set_status(new, "approved", "Robin, %s (review desk)" % date)
            entry["approval"] = "applied"
        entry["applied"] = not dry
        if dry:
            continue
        before_findings = set(lint_findings(path))
        with open(path, "w", encoding="utf-8") as f:
            f.write(new)
        notes_db.pop(pairing, None)   # Robin has seen this row's desk notes
        fresh = [x for x in lint_findings(path) if x not in before_findings]
        entry["new_findings"] = fresh
        for x in fresh:
            notes_db.setdefault(pairing, []).append({"date": date, "text": "after your edit, the check says: " + x})
        if "recipe" in changed:
            notes_db.setdefault(pairing, []).append({"date": date, "text": "recipe edited: Tomás updates the spec "
                                                     "(_studio/specs/%s.json) and reruns the four checks" % pairing})
        label = {"Approve": "Approve", "Needs work": "Needs work"}.get(decision, "— (notes only)" if notes else "— (edits only)")
        log_to_room(d, date, label, notes, entry["edits"], extra)
        log_ledger(pairing, date, entry["edits"])
        if needs_work:
            report["reworks"].append(pairing)
    for r in rules:
        v = norm(r.get("Decision"))
        if v not in ("Accept", "Reject"):
            continue
        item = {"rule": norm(r.get("rule")), "why": norm(r.get("why")), "note": norm(r.get("Robin's note"))}
        if not dry:
            found = mark_candidate(norm(r.get("_id")), "Accepted" if v == "Accept" else "Rejected", item["note"], date)
            if not found:
                report["errors"].append("rule candidate not found in rule-candidates.md: %s" % item["rule"][:60])
                continue
        report["rules"]["accepted" if v == "Accept" else "rejected"].append(item)
    if dry:
        return report
    queue_rework(report["reworks"], date)
    save_notes(notes_db)
    write_registry()
    report["reexported"] = export(force=True, carry=carry)["workbook"]
    return report


def approve_in_chat(pairing, note=None):
    path = pour_path(pairing)
    if not os.path.exists(path):
        raise DeskError("no pour file for %s" % pairing)
    d = pourfile.parse(path)
    text = set_status(open(path, encoding="utf-8").read(), "approved", "Robin, %s (in chat)" % today())
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)
    log_to_room(d, today(), "Approve (in chat)", note, [])
    write_registry()
    return {"pairing": pairing, "status": "approved"}


def add_note(pairing, text):
    if not os.path.exists(pour_path(pairing)):
        raise DeskError("no pour file for %s" % pairing)
    notes = load_notes()
    notes.setdefault(pairing, []).append({"date": today(), "text": one_line(text)})
    save_notes(notes)
    return {"pairing": pairing, "notes": len(notes[pairing])}


def setup():
    py = os.path.join(VENV, "bin", "python")
    if not os.path.exists(py):
        subprocess.check_call([sys.executable, "-m", "venv", VENV])
    try:
        subprocess.check_call([py, "-c", "import openpyxl"], stderr=subprocess.DEVNULL)
    except subprocess.CalledProcessError:
        subprocess.check_call([py, "-m", "pip", "install", "-q", "openpyxl"])
    return {"venv": VENV, "python": py}


def main(argv):
    if len(argv) < 2 or argv[1] in ("-h", "--help"):
        print(__doc__)
        return 0
    cmd, args = argv[1], argv[2:]

    def opt(name):
        return args[args.index(name) + 1] if name in args else None
    try:
        if cmd == "setup":
            out = setup()
        elif cmd == "export":
            st = opt("--status")
            out = export(opt("--batch"), st.split(",") if st else None, "--force" in args)
        elif cmd == "status":
            out = changes_in_workbook()
        elif cmd == "sync":
            out = sync("--dry-run" in args)
        elif cmd == "note" and len(args) >= 2:
            out = add_note(args[0], args[1])
        elif cmd == "approve" and args:
            out = approve_in_chat(args[0], opt("--note"))
        else:
            print(__doc__)
            return 2
    except DeskError as e:
        print(json.dumps({"status": "blocked", "reason": str(e)}, ensure_ascii=False))
        return 1
    print(json.dumps(out, indent=1, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
