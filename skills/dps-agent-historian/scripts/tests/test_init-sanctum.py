#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# ///
"""Runs init-sanctum.py against a throwaway project root and checks the sanctum it creates."""
import subprocess, sys, tempfile
from pathlib import Path

SKILL = Path(__file__).resolve().parents[2]
fails = []


def check(name, cond):
    print(("PASS  " if cond else "FAIL  ") + name)
    if not cond:
        fails.append(name)


with tempfile.TemporaryDirectory() as tmp:
    root = Path(tmp)
    (root / "_bmad" / "core").mkdir(parents=True)
    (root / "_bmad" / "core" / "config.yaml").write_text("user_name: Robin\ncommunication_language: English\n")
    run = subprocess.run([sys.executable, str(SKILL / "scripts" / "init-sanctum.py"), str(root), str(SKILL)], capture_output=True, text=True)
    check("init exits 0", run.returncode == 0)
    s = root / "_bmad" / "memory" / "dps-agent-historian"
    for f in ["INDEX.md", "PERSONA.md", "CREED.md", "BOND.md", "MEMORY.md", "CAPABILITIES.md"]:
        check("creates " + f, (s / f).exists())
    check("first-breath stays in the skill", not (s / "references" / "first-breath.md").exists())
    check("capability prompts copied", all((s / "references" / f).exists() for f in
          ["mirror-hunt.md", "fact-card.md", "draft-anchors.md", "audit-reading.md", "in-the-room.md", "propose-names.md"]))
    caps = (s / "CAPABILITIES.md").read_text()
    check("6 built-in capabilities registered", all("[%s]" % c in caps for c in ["MH", "FC", "AN", "FA", "IR", "NM"]))
    check("studio tools listed with a real path", "skills/dps-tools/scripts/library.py" in caps and "{project_root}" not in caps)
    check("owner name substituted", "Robin" in (s / "BOND.md").read_text())
    check("birth date substituted", "{birth_date}" not in (s / "PERSONA.md").read_text())
    leftovers = [f.name for f in s.glob("*.md") if "{project_root}" in f.read_text() or "{sanctum_path}" in f.read_text()]
    check("no unsubstituted path variables", not leftovers)
    again = subprocess.run([sys.executable, str(SKILL / "scripts" / "init-sanctum.py"), str(root), str(SKILL)], capture_output=True, text=True)
    check("second run leaves an existing sanctum alone", again.returncode == 0 and "already exists" in again.stdout)

print("\n%d failure(s)" % len(fails))
sys.exit(1 if fails else 0)
