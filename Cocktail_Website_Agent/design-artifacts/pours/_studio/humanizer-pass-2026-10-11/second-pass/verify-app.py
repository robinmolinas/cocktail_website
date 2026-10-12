"""Check that the application import changes only the edited guest readings."""
import hashlib
import json
from pathlib import Path

REVIEW = Path(__file__).resolve().parent
POURS = REVIEW.parents[2]
SITE = POURS.parents[1]
APP = SITE / "dionysus-experience"
baseline = json.loads((REVIEW / "app-baseline.json").read_text())
verification = json.loads((REVIEW / "verification.json").read_text())
errors = []
changed = []
fields = set()
non_reading_unchanged = True
for name, before in baseline["pours"].items():
    after = json.loads((APP / "shared/data/pours" / (name + ".json")).read_text())
    if before != after:
        changed.append(name)
    if {k: v for k, v in before.items() if k != "reading"} != {
            k: v for k, v in after.items() if k != "reading"}:
        errors.append(name + ": non-reading data changed")
        non_reading_unchanged = False
    for key in set(before["reading"]) | set(after["reading"]):
        if before["reading"].get(key) != after["reading"].get(key):
            fields.add(key)
            if key not in ("whoYouAre", "yours"):
                errors.append(name + ": protected Reading field changed: " + key)
if set(changed) != set(verification["edited_pairings"]):
    errors.append("Application changes disagree with edited sources")
other_files_unchanged = True
for name, digest in baseline["other_hashes"].items():
    if hashlib.sha256((SITE / name).read_bytes()).hexdigest() != digest:
        errors.append(name + ": generated file changed")
        other_files_unchanged = False

manifest = json.loads((APP / "shared/data/manifest.json").read_text())
old_manifest = baseline["manifest"]
if set(manifest) != set(old_manifest):
    errors.append("Manifest keys changed")
for key in old_manifest:
    if key != "sources" and manifest[key] != old_manifest[key]:
        errors.append("Manifest metadata changed: " + key)
if set(manifest["sources"]) != set(old_manifest["sources"]):
    errors.append("Manifest input list changed")
manifest_changes = {key for key in old_manifest["sources"]
                    if manifest["sources"].get(key) != old_manifest["sources"][key]}
expected_changes = {f"../design-artifacts/pours/{name}.md" for name in changed}
if manifest_changes != expected_changes:
    errors.append("Manifest changed beyond edited sources")
for name, digest in verification["source_hashes"].items():
    if manifest["sources"].get(f"../design-artifacts/pours/{name}.md") != digest:
        errors.append(name + ": imported source hash disagrees with final source")

result = {
    "pours_checked": len(baseline["pours"]), "pours_updated": len(changed),
    "changed_reading_fields": sorted(fields),
    "all_other_pour_data_unchanged": non_reading_unchanged,
    "catalogue_and_import_report_unchanged": other_files_unchanged,
    "manifest_changed_only_for_edited_sources": manifest_changes == expected_changes,
    "final_source_hashes_match_manifest": not any("hash" in e for e in errors),
    "errors": errors,
}
verification["application"] = result
(REVIEW / "verification.json").write_text(
    json.dumps(verification, ensure_ascii=False, indent=2) + "\n")
print(json.dumps(result, indent=2))
raise SystemExit(bool(errors))
