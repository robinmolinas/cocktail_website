#!/usr/bin/env python3
"""brief.py - everything a room agent loads on arrival, in one output (one tool call instead of ten).

Usage:
  brief.py ROLE PAIRING          ROLE = psychologist | historian | mixologist (or wren | hester | tomas)
  brief.py ROLE --plan PRIMARY   arrival for a family plan (dps-author-pour references/family-plan.md)

Prints, in order: the agent's SKILL.md, its sanctum (INDEX, PERSONA, CREED, BOND, MEMORY, CAPABILITIES),
its in-the-room guide, the names of its other capability references (open those only when needed),
Robin's rulebook (STUDIO-RULES.md), the registry, the persona, the family plan, and the room so far.
With --plan: the family-plan guide instead of the room guide, every persona of the family, the plan so far with
its scratch files, and the Claims of the other families' plans.
Read-only. Same content the agent used to load file by file (Robin 2026-09-27: cut tokens, keep quality).
"""
import os, subprocess, sys
from _common import ROOT, POURS, STUDIO

ROLES = {"wren": "psychologist", "hester": "historian", "tomas": "mixologist", "tomás": "mixologist"}
SANCTUM = ["INDEX.md", "PERSONA.md", "CREED.md", "BOND.md", "MEMORY.md", "CAPABILITIES.md"]


def show(title, path):
    print("\n\n==================== %s (%s) ====================\n" % (title, os.path.relpath(path, ROOT)))
    if os.path.exists(path):
        print(open(path, encoding="utf-8").read().strip())
    else:
        print("(missing)")


def claims(path):
    t = open(path, encoding="utf-8").read()
    i = t.find("## Claims")
    if i < 0:
        return "(no Claims section yet)"
    j = t.find("\n## ", i + 1)
    return t[i:j if j > 0 else len(t)].strip()


def plan_brief(skill, sanctum, primary):
    fam = primary.lower()
    plans = os.path.join(STUDIO, "plans")
    show("SKILL", os.path.join(skill, "SKILL.md"))
    if os.path.isdir(sanctum):
        for f in SANCTUM:
            show("SANCTUM " + f, os.path.join(sanctum, f))
    show("FAMILY PLAN GUIDE", os.path.join(ROOT, "skills", "dps-author-pour", "references", "family-plan.md"))
    show("STUDIO RULES", os.path.join(POURS, "STUDIO-RULES.md"))
    show("REGISTRY", os.path.join(STUDIO, "registry.md"))
    here = os.path.dirname(os.path.abspath(__file__))
    out = subprocess.run([sys.executable, os.path.join(here, "persona.py"), "--list", "--primary", fam.replace("-", " ").title()],
                         capture_output=True, text=True).stdout
    pairings = [l.split()[0] for l in out.splitlines() if l.strip() and "-" in l.split()[0]]
    for pr in pairings:
        print("\n\n==================== PERSONA (persona.py %s) ====================\n" % pr)
        sys.stdout.flush()
        subprocess.run([sys.executable, os.path.join(here, "persona.py"), pr])
    show("THIS FAMILY'S PLAN SO FAR", os.path.join(plans, fam + ".md"))
    work = os.path.join(plans, "work", fam)
    for f in sorted(os.listdir(work)) if os.path.isdir(work) else []:
        show("PLAN SCRATCH " + f, os.path.join(work, f))
    others = sorted(f for f in os.listdir(plans) if f.endswith(".md") and f != fam + ".md") if os.path.isdir(plans) else []
    print("\n\n==================== OTHER FAMILIES' CLAIMS ====================\n")
    for f in others:
        print("--- plans/%s\n%s\n" % (f, claims(os.path.join(plans, f))))
    if not others:
        print("(none yet)")
    return 0


def main(argv):
    if len(argv) == 4 and argv[2] == "--plan":
        role = ROLES.get(argv[1].lower(), argv[1].lower())
        skill = os.path.join(ROOT, "skills", "dps-agent-" + role)
        sanctum = os.path.join(ROOT, "_bmad", "memory", "dps-agent-" + role)
        if not os.path.isdir(skill):
            sys.exit("error: unknown role %r" % argv[1])
        return plan_brief(skill, sanctum, argv[3])
    if len(argv) != 3 or argv[1] in ("-h", "--help"):
        print(__doc__)
        return 0 if len(argv) > 1 else 1
    role = ROLES.get(argv[1].lower(), argv[1].lower())
    pairing = argv[2]
    skill = os.path.join(ROOT, "skills", "dps-agent-" + role)
    sanctum = os.path.join(ROOT, "_bmad", "memory", "dps-agent-" + role)
    if not os.path.isdir(sanctum):
        sanctum = os.path.join(ROOT, "skills", "memory", "dps-agent-" + role)
    if not os.path.isdir(skill):
        sys.exit("error: unknown role %r" % argv[1])
    show("SKILL", os.path.join(skill, "SKILL.md"))
    if os.path.isdir(sanctum):
        for f in SANCTUM:
            show("SANCTUM " + f, os.path.join(sanctum, f))
        refs = os.path.join(sanctum, "references")
    else:
        print("\n\n(no sanctum yet: work from the seed templates in %s/assets and say so once)" % os.path.relpath(skill, ROOT))
        refs = os.path.join(skill, "references")
    show("IN THE ROOM", os.path.join(refs, "in-the-room.md"))
    others = sorted(f for f in os.listdir(refs) if f.endswith(".md") and f != "in-the-room.md")
    print("\n\nOther capability references (open only when you use one): %s" % ", ".join(
        os.path.relpath(os.path.join(refs, f), ROOT) for f in others))
    show("STUDIO RULES", os.path.join(POURS, "STUDIO-RULES.md"))
    show("REGISTRY", os.path.join(STUDIO, "registry.md"))
    print("\n\n==================== PERSONA (persona.py %s) ====================\n" % pairing)
    sys.stdout.flush()
    subprocess.run([sys.executable, os.path.join(os.path.dirname(os.path.abspath(__file__)), "persona.py"), pairing])
    fam = "regular-guy" if pairing.startswith("regular-guy-") else pairing.split("-")[0]
    plan = os.path.join(STUDIO, "plans", fam + ".md")
    if os.path.exists(plan):
        show("FAMILY PLAN (your row is a starting point, not a verdict)", plan)
    show("THE ROOM SO FAR", os.path.join(STUDIO, "rooms", pairing + ".md"))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
