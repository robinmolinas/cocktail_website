#!/usr/bin/env python3
"""library.py - search the studio's page-marked research library (Dionysus/docs/_text).

Usage:
  library.py search "TERMS" [--book B] [--max N] [--context C]
      every hit with its book, page and a snippet. All terms must appear within one snippet window.
  library.py entry "HEADWORD" [--chars N]
      the Oxford Companion entry that starts with HEADWORD (e.g. "solera", "Stinger", "Last Word", "punch").
  library.py page BOOK N [--printed]
      the full text of one page (pdf page N, or printed page N with --printed).
  library.py books
      the books, their files, trust tier and citation style.

Books (B): oxford, imbibe, proper (A Proper Drink), mezcal, codex, li (Liquid Intelligence),
matrix (Flavor Matrix, OCR), joy (Joy of Mixology, OCR).
Citations follow _text/README.md: Oxford by HEADWORD + pdf page; Codex, Liquid Intelligence and
A Proper Drink by printed page; Imbibe, Matrix and Joy by pdf page. Each book may have an index
(<file>.index.md next to it: chapters, recipes, who's where); read it before searching. The Mezcal file is a summary: leads only, NEVER cite it.
Research only: facts go into the dossier in our own words; never copy source text into a pour.
"""
import os, re, sys
from _common import LIBRARY

BOOKS = {
    "oxford": ("historian/oxford-companion.md", "The Oxford Companion to Spirits and Cocktails", "primary", "Oxford Companion, {HEAD} (pdf {pdf})"),
    "imbibe": ("historian/imbibe.md", "Imbibe! (Wondrich)", "primary", "Imbibe!, pdf {pdf}"),
    "mezcal": ("historian/mezcal-bookey-summary.md", "Mezcal - Bookey summary (Janzen)", "LEADS ONLY - never cite", "(not citable)"),
    "proper": ("historian/a-proper-drink.md", "A Proper Drink (Simonson): the cocktail revival, c. 1987-2015",
               "reliable secondary; quotes are on-record interviews", "A Proper Drink, p. {printed}"),
    "codex": ("mixologist/cocktail-codex.md", "Cocktail Codex", "craft", "Cocktail Codex, p. {printed}"),
    "li": ("mixologist/liquid-intelligence.md", "Liquid Intelligence (Arnold)", "craft", "Liquid Intelligence, p. {printed} (pdf {pdf})"),
    "matrix": ("mixologist/flavor-matrix.md", "The Flavor Matrix (OCR)", "pairing reference; check figures on the page image", "Flavor Matrix, pdf {pdf}"),
    "joy": ("mixologist/joy-of-mixology.md", "The Joy of Mixology, revised ed. (Regan, 2018; OCR)",
            "craft reference; drink families + recipes with origin notes", "Joy of Mixology, pdf {pdf}"),
}
ENTRY = re.compile(r"^((?:The )?[A-Za-z][\w’'\-.]*(?: [\w’'\-.&]+){0,5}) (?:,|is |was |\()")
# Oxford lays out each headword on its own line; entries are matched on that line joined with the next.
MARK = re.compile(r"^=== (?:pdf (\d+)(?: \| printed ([^=]+?))?|printed ([^=]+?)|chapter [^=]*) ===$")


def load(book):
    path = os.path.join(LIBRARY, BOOKS[book][0])
    if not os.path.exists(path):
        sys.exit("error: %s not found. Run the library extraction (see the studio setup)." % path)
    with open(path, encoding="utf-8") as f:
        return f.read().split("\n")


def page_at(lines, idx):
    pdf = printed = None
    for i in range(idx, -1, -1):
        m = MARK.match(lines[i].strip())
        if m:
            pdf = m.group(1)
            printed = (m.group(2) or m.group(3) or "").strip() or None
            if pdf or printed:
                break
    return pdf, printed


def cite(book, lines, idx, head=None):
    pdf, printed = page_at(lines, idx)
    fmt = BOOKS[book][3]
    if book == "oxford":
        printed = None  # Oxford's printed labels are PDF artefacts
    if "{printed}" in fmt and not printed:
        fmt = fmt.replace("p. {printed}", "pdf {pdf}")
    head = re.sub(r"^the ", "", head or "?", flags=re.I)
    return fmt.format(HEAD=head.upper(), pdf=pdf or "?", printed=printed or "?")


def oxford_headword_near(lines, idx):
    for i in range(idx, max(idx - 400, -1), -1):
        joined = lines[i] + " " + (lines[i + 1] if i + 1 < len(lines) else "")
        m = ENTRY.match(" ".join(joined.split()))
        if m and not m.group(1).isupper() and (i == 0 or lines[i - 1].strip() == "" or MARK.match(lines[i - 1].strip())):
            return m.group(1)
    return None


def cmd_search(args):
    terms = [t.lower() for t in args[0].split()]
    book_filter = opt(args, "--book")
    maxn = int(opt(args, "--max") or 25)
    ctx = int(opt(args, "--context") or 300)
    n = 0
    for book in ([book_filter] if book_filter else BOOKS):
        lines = load(book)
        text_lines = [l.lower() for l in lines]
        seen_pages = set()
        for i, l in enumerate(text_lines):
            if terms[0] not in l:
                continue
            window = " ".join(text_lines[max(0, i - 3): i + 4])
            if not all(t in window for t in terms):
                continue
            pdf, printed = page_at(lines, i)
            if (pdf, printed) in seen_pages:
                continue
            seen_pages.add((pdf, printed))
            snippet = " ".join(" ".join(lines[max(0, i - 3): i + 4]).split())
            pos = snippet.lower().find(terms[0])
            snippet = snippet[max(0, pos - ctx // 2): pos + ctx // 2]
            head = oxford_headword_near(lines, i) if book == "oxford" else None
            print("[%s] %s | line %d\n    ...%s...\n" % (book, cite(book, lines, i, head), i + 1, snippet))
            n += 1
            if n >= maxn:
                print("(stopped at %d hits; use --max)" % maxn)
                return 0
    if n == 0:
        print("no hits")
    return 0


def cmd_entry(args):
    head = args[0]
    chars = int(opt(args, "--chars") or 5000)
    lines = load("oxford")
    pat = re.compile(r"^(?:The )?%s (?:,|is |was |\()" % re.escape(head), re.I)
    for i, l in enumerate(lines):
        joined = " ".join((l + " " + (lines[i + 1] if i + 1 < len(lines) else "")).split())
        if pat.match(joined) and (i == 0 or lines[i - 1].strip() == "" or MARK.match(lines[i - 1].strip())):
            body = []
            size = 0
            for j in range(i, len(lines)):
                if MARK.match(lines[j].strip()):
                    body.append("\n" + lines[j].strip() + "\n")
                    continue
                if j > i + 2 and (lines[j - 1].strip() == "" or MARK.match(lines[j - 1].strip())):
                    nxt = " ".join((lines[j] + " " + (lines[j + 1] if j + 1 < len(lines) else "")).split())
                    em = ENTRY.match(nxt)
                    if em and not em.group(1).isupper() and len(lines[j].split()) <= 6:
                        break  # the next headword (Oxford sets each on its own short line)
                body.append(lines[j])
                size += len(lines[j])
                if size > chars:
                    break
            print("%s\n\n%s" % (cite("oxford", lines, i, head), re.sub(r"(?<!\n)\n(?!\n|=)", " ", "\n".join(body))))
            return 0
    print("no Oxford entry starting with %r. Try: library.py search %r --book oxford" % (head, head))
    return 1


def cmd_page(args):
    book, n = args[0], args[1]
    printed = "--printed" in args
    lines = load(book)
    out, on = [], False
    for l in lines:
        m = MARK.match(l.strip())
        if m:
            if on:
                break
            p_pdf, p_pr = m.group(1), (m.group(2) or m.group(3) or "").strip()
            on = (p_pr == n) if printed else (p_pdf == n)
            if on:
                out.append(l)
            continue
        if on:
            out.append(l)
    print("\n".join(out) if out else "page not found")
    return 0 if out else 1


def opt(args, name):
    return args[args.index(name) + 1] if name in args and args.index(name) + 1 < len(args) else None


def main(argv):
    if len(argv) < 2 or argv[1] in ("-h", "--help"):
        print(__doc__)
        return 0
    cmd, args = argv[1], argv[2:]
    if cmd == "books":
        for k, (f, title, tier, fmt) in BOOKS.items():
            print("%-7s %-50s %-40s cite as: %s" % (k, title, tier, fmt))
        return 0
    return {"search": cmd_search, "entry": cmd_entry, "page": cmd_page}[cmd](args)


if __name__ == "__main__":
    sys.exit(main(sys.argv))
