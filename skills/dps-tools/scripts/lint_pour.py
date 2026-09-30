#!/usr/bin/env python3
"""lint_pour.py - check a pour file against the studio's rules (STUDIO-RULES.md) before Robin sees it.

Usage:
  lint_pour.py PAIRING|FILE [--spec SPEC.json]   one pour (errors exit 1)
  lint_pour.py --all                               every pour in the pours folder

Errors must be fixed by the owning agent, in the room. Warnings need a human look (they're often fine,
e.g. "he" about a historical bartender) and should be answered in the room record.
Spec lookup when --spec isn't given: pours/_studio/specs/<pairing>.json, then the tools' test fixtures.
"""
import os, re, sys
import pourfile
from _common import POURS, STUDIO, TOOLS, load_spec, SpecError
from allergens import derive

ARCHETYPES = ["Caregiver", "Creator", "Explorer", "Hero", "Innocent", "Jester", "Lover", "Magician",
              "Outlaw", "Regular Guy", "Everyman", "Ruler", "Sage"]
WE_ALLOW = ["what we do know", "what we know", "all we know", "we still don't know", "we'll never know"]
LIVE_DRINKING = ["as you sip", "take a sip", "you're drinking", "you are drinking", "in your hand", "sip it now",
                 "now that you've tasted", "as you drink", "the glass in front of you", "while you drink"]
JARGON = ["solera", "oleo-saccharum", "oleo saccharum", "louche", "titratable", "dilution", "abv", "fining",
          "orgeat", "falernum", "amaro", "express the", "expressed", "dry shake", "reverse dry", "fat-wash",
          "fat wash", "clarified", "brix", "rinse the glass", "flame the"]
STOP = set("a an the and or but of to in on at for with by from as is was were be been it its this that these those "
           "you your you're yours i i'm i'd i've me my we our us he she his her they them their there here what which who "
           "so if then than not no never just only all some any one two into out up down over about more most very can "
           "could would should will do does did has have had".split())
VALID_STATUS = {"draft", "approved", "flagged"}


def words(t):
    return re.findall(r"[a-z’']+", t.lower().replace("’", "'"))


def content(t):
    return [w for w in words(t) if w not in STOP and len(w) > 2]


VOICE_SIGNATURES = ["i like to think"]  # the bartender's signature: may repeat (Robin, 2026-09-24)
RATIONED = ["here's what i'd ask", "that's you, isn't it"]  # "only now and then" (Robin, 2026-09-24)
RATION_SHARE = 0.25  # a rationed phrase may appear in at most ~1 pour in 4


def ngrams(t, n=4):
    low = t.lower().replace("’", "'")
    for sig in VOICE_SIGNATURES + RATIONED:
        low = low.replace(sig, " | ")
    ws = words(low)
    return {tuple(ws[i:i + n]) for i in range(len(ws) - n + 1) if sum(w not in STOP for w in ws[i:i + n]) >= 2}


def find_spec(pairing, given=None):
    for p in ([given] if given else []) + [os.path.join(STUDIO, "specs", pairing + ".json"),
                                            os.path.join(TOOLS, "tests", "fixtures", pairing + ".json")]:
        if p and os.path.exists(p):
            return p
    return None


def lint(path, others, spec_path=None):
    d = pourfile.parse(path)
    E, W = list(d["errors"]), []
    # required fields
    for f in ("name", "tagline", "glassware", "epigraph", "closingLine"):
        if not d.get(f):
            E.append("missing field: %s" % f)
    if d["contains"] is None:
        E.append("missing or unreadable: contains")
    if not d["recipe"]: E.append("missing recipe table")
    if not d["method"]: E.append("missing method")
    if len(d["anchors"]) < 3: E.append("needs >= 3 anchors (has %d)" % len(d["anchors"]))
    for a in d["anchors"]:
        if not a["fact"].strip() or not a["meaning"].strip():
            E.append("anchor '%s' needs both fact and meaning" % a["kind"])
    if not d["whoYouAre"]: E.append("missing whoYouAre")
    if not (3 <= len(d["yours"]) <= 6): W.append("yours has %d paragraphs (the examples have 4-5)" % len(d["yours"]))
    status = d["status"].split()[0] if d["status"] else ""
    if status not in VALID_STATUS: E.append("status must be draft | approved | flagged (is %r)" % d["status"])
    for sec in ("### Checks", "### Sources"):
        if sec not in d["dossier"]:
            E.append("dossier missing '%s'" % sec)
    # lengths
    n = len(words(" ".join(d["whoYouAre"])))
    if n > 190: W.append("whoYouAre is %d words (the examples run ~90-150): punchier?" % n)
    n = len(words(" ".join(d["yours"])))
    if not 220 <= n <= 700: W.append("yours is %d words (the examples run ~300-520)" % n)
    if d.get("epigraph") and len(words(d["epigraph"])) > 16: W.append("epigraph over 16 words")
    if d.get("tagline") and len(words(d["tagline"])) > 14: W.append("tagline over 14 words")
    # epigraph vs tagline: the epigraph is about the cocktail, the tagline about the person; no echo
    if d.get("epigraph") and d.get("tagline"):
        a, b = set(content(d["epigraph"])), set(content(d["tagline"]))
        shared = a & b
        if shared and len(shared) / max(1, min(len(a), len(b))) >= 0.34:
            E.append("epigraph and tagline echo each other (shared: %s)" % ", ".join(sorted(shared)))
    # guest-facing language rules
    reading_fields = ("epigraph", "whoYouAre", "yours")
    for field, t in pourfile.guest_text(d):
        low = t.lower()
        scrub = re.sub(r"\bU\.?S\.?(?=[\s,;:)]|$)", "", t).lower()   # "the US Supreme Court" is a country, not "us"
        for ok in WE_ALLOW:
            scrub = scrub.replace(ok, "")
        m = re.search(r"\b(we|we'd|we've|we'll|we're|us|our|ours|ourselves)\b", scrub.replace("’", "'"))
        if m:
            E.append("[%s] one bartender speaks: 'I', not %r" % (field, m.group(1)))
        tag = re.search(r"\((?:[^()]*\b(?:pdf|p\.)\s*\d+[^()]*|\s*[FC]\d+(?:\s*,\s*[FC]\d+)*\s*)\)", t)
        if tag:
            E.append("[%s] audit tag left in guest text: %r (sources live in the dossier)" % (field, tag.group(0)))
        for name in ARCHETYPES:
            for mm in re.finditer(r"\b%s\b" % re.escape(name), t):
                start = mm.start()
                sentence_start = start == 0 or re.search(r"[.!?:\"“]\s*$", t[:start])
                if name in ("Sage",) and not sentence_start and t[start:start + 10].lower().startswith("sage leaf"):
                    continue
                (W if sentence_start else E).append("[%s] archetype name %r visible to the guest%s" % (
                    field, name, " (sentence start: check it's not the archetype)" if sentence_start else ""))
        if field.startswith(reading_fields):
            for phrase in LIVE_DRINKING:
                if phrase in low:
                    E.append("[%s] assumes the guest is drinking right now: %r" % (field, phrase))
            for p in re.findall(r"\b(he|she|him|her|his|hers|himself|herself)\b", low):
                W.append("[%s] gendered pronoun %r: fine for a historical person, never for the guest" % (field, p))
                break
        for j in JARGON:
            if re.search(r"\b%s\b" % re.escape(j), low):
                W.append("[%s] jargon %r: explained in plain words?" % (field, j))
    # cross-pour: duplicates and repeated motifs
    mine = " ".join(d["whoYouAre"] + d["yours"])
    my_grams = ngrams(mine)
    for o in others:
        if o["pairing"] == d["pairing"]:
            continue
        for f in ("name", "tagline", "epigraph", "closingLine"):
            if d.get(f) and o.get(f) and d[f].strip().lower() == o[f].strip().lower():
                E.append("duplicate %s with %s" % (f, o["pairing"]))
        shared = my_grams & ngrams(" ".join(o["whoYouAre"] + o["yours"]))
        if shared:
            W.append("motif overlap with %s: %s" % (o["pairing"], "; ".join(" ".join(g) for g in sorted(shared)[:4])))
    # rationed phrases: "only now and then"
    def has(o, ph):
        return ph in " ".join(o["whoYouAre"] + o["yours"]).lower().replace("’", "'")
    for ph in RATIONED:
        if has(d, ph):
            users = [o["pairing"] for o in others if o["pairing"] != d["pairing"] and has(o, ph)]
            share = (len(users) + 1) / max(1, len(others))
            if share > RATION_SHARE:
                W.append("rationed phrase %r now in %d of %d pours (limit ~1 in 4): vary it" % (ph, len(users) + 1, len(others)))
    # allergens: declared contains must match the spec
    sp = find_spec(d["pairing"], spec_path)
    if sp:
        try:
            derived, why = derive(load_spec(sp))
            if d["contains"] is not None and sorted(d["contains"]) != sorted(derived):
                E.append("contains %s but the spec derives %s (%s)" % (d["contains"], derived, os.path.basename(sp)))
        except SpecError as e:
            E.append("spec error: %s" % e)
    else:
        W.append("no balance/allergen spec found for %s (expected _studio/specs/%s.json)" % (d["pairing"], d["pairing"]))
    return d, E, W


def main(argv):
    if len(argv) < 2 or argv[1] in ("-h", "--help"):
        print(__doc__)
        return 0
    files = pourfile.all_pours(POURS)
    others = [pourfile.parse(f) for f in files]
    targets = files if argv[1] == "--all" else [argv[1] if argv[1].endswith(".md") else os.path.join(POURS, argv[1] + ".md")]
    spec = argv[argv.index("--spec") + 1] if "--spec" in argv else None
    bad = 0
    for t in targets:
        d, E, W = lint(t, others, spec)
        print("%s  (%s, %s)  %d error(s), %d warning(s)" % (d["pairing"], d.get("name"), d["status"], len(E), len(W)))
        for e in E: print("  ERROR  " + e)
        for w in W: print("  warn   " + w)
        bad += bool(E)
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
