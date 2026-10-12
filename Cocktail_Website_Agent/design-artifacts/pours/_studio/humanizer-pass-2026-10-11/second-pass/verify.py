"""Check the editorial audit and protected source material against saved originals."""
from collections import Counter
import hashlib
import json
from pathlib import Path
import re

REVIEW = Path(__file__).resolve().parent
POURS = REVIEW.parents[2]
baseline = json.loads((REVIEW / "baseline.json").read_text())
initial = json.loads((REVIEW.parent / "baseline.json").read_text())
protections = json.loads((REVIEW.parent / "protections.json").read_text())
records = [record for group in "abcd" for record in
           json.loads((REVIEW / f"group-{group}.json").read_text())]
errors = []

def check(condition, message):
    if not condition:
        errors.append(message)

def parts(text):
    prefix, body = text.split("## Reading", 1)
    reading, suffix = body.split("## Dossier", 1)
    return prefix, reading, suffix

def fields(reading):
    matches = list(re.finditer(r"^\*\*([^*]+)\*\*\s*$", reading, re.M))
    return {m.group(1): reading[m.end():matches[i+1].start() if i+1 < len(matches)
                               else len(reading)].strip()
            for i, m in enumerate(matches)}

check(len(records) == 132, "Record count must be 132")
check(Counter(r["pairing"] for r in records) == Counter(baseline.keys()),
      "Pairings must appear once, covering the entire collection")
changed = []
fragments_checked = 0
reading_fragments_checked = 0
source_hashes = {}
for record in records:
    name = record["pairing"]
    before = baseline[name]
    after = (POURS / (name + ".md")).read_text()
    old_prefix, old_reading, old_suffix = parts(before)
    prefix, reading, suffix = parts(after)
    check(prefix == old_prefix and suffix == old_suffix,
          name + ": material outside Reading changed")
    check((prefix, suffix) == (parts(initial[name])[0], parts(initial[name])[2]),
          name + ": material outside Reading differs from initial source")
    replay = old_reading
    for edit in record["edits"]:
        check(edit["before"] != edit["after"], name + ": empty replacement")
        check(replay.count(edit["before"]) == 1, name + ": ambiguous audit replacement")
        replay = replay.replace(edit["before"], edit["after"], 1)
    check(replay == reading, name + ": exact audit replay failed")
    old_fields, new_fields = fields(old_reading), fields(reading)
    check(list(old_fields) == list(new_fields), name + ": Reading labels changed")
    check(re.findall(r"^\d+\. ", old_reading, re.M) ==
          re.findall(r"^\d+\. ", reading, re.M), name + ": paragraph numbers changed")
    check(re.findall(r"\d+(?:[.,:/]\d+)*", old_reading) ==
          re.findall(r"\d+(?:[.,:/]\d+)*", reading), name + ": numeric details changed")
    quotes = r'"[^"\n]*"|“[^”\n]*”'
    check(Counter(re.findall(quotes, old_reading)) == Counter(re.findall(quotes, reading)),
          name + ": exact quotations changed")
    check(old_reading.count("I like to think") == reading.count("I like to think"),
          name + ": interpretation signatures changed")
    for label in old_fields:
        if label.lower() == "epigraph" or "closing" in label.lower():
            check(old_fields[label] == new_fields[label], name + ": " + label + " changed")
    for fragment in protections["protected_text"].get(name, []):
        if fragment in initial[name]:
            fragments_checked += 1
            check(fragment in after, name + ": protected fragment absent")
        if fragment in parts(initial[name])[1]:
            reading_fragments_checked += 1
            check(fragment in reading, name + ": protected guest-reading fragment absent")
    if name in protections["approved_pours"]:
        check(after == before == initial[name], name + ": approved source changed")
    check(record["decision"] == ("edited" if before != after else "retained"),
          name + ": disposition disagrees with source")
    if before != after:
        changed.append(name)
    source_hashes[name] = hashlib.sha256(after.encode()).hexdigest()

reviews = {}
for group in "abcd":
    review = json.loads((REVIEW / f"review-group-{group}.json").read_text())
    reviews[group] = review["verdict"]
    check(review["verdict"] in ("pass", "pass_after_corrections"),
          "Independent meaning review failed for group " + group)

result = {
    "reviewed": len(records), "edited": len(changed), "retained": len(records)-len(changed),
    "paragraph_or_field_replacements": sum(len(r["edits"]) for r in records),
    "approved_pours_unchanged": protections["approved_pours"],
    "protected_fragments_checked": fragments_checked,
    "protected_guest_reading_fragments_checked": reading_fragments_checked,
    "source_audit_replay": not errors, "independent_meaning_review": reviews,
    "preserved": ["All text before Reading and from Dossier onward",
                  "Reading field labels and paragraph numbers", "Numeric details and exact quotations",
                  "I like to think signatures", "Epigraphs and closing lines",
                  "Complete approved pours and recorded Robin edit fragments"],
    "edited_pairings": sorted(changed),
    "retained_pairings": sorted(set(baseline)-set(changed)),
    "source_hashes": source_hashes, "errors": errors,
}
(REVIEW / "verification.json").write_text(json.dumps(result, ensure_ascii=False, indent=2)+"\n")
print(json.dumps({k: v for k, v in result.items() if k not in
                  ("edited_pairings", "source_hashes")}, ensure_ascii=False, indent=2))
raise SystemExit(bool(errors))
