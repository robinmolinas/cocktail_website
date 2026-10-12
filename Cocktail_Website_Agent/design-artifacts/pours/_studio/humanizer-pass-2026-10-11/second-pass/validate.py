"""Compare the studio's validation results before and after the prose edit."""
import argparse
import builtins
import io
import json
import sys
from pathlib import Path

REVIEW = Path(__file__).resolve().parent
POURS = REVIEW.parents[2]
WORKSPACE = POURS.parents[3]
sys.path.insert(0, str(WORKSPACE / "skills/dps-tools/scripts"))
import lint_pour
import pourfile

parser = argparse.ArgumentParser()
parser.add_argument("mode", choices=["baseline", "current"])
args = parser.parse_args()
baseline = json.loads((REVIEW / "baseline.json").read_text())
paths = [POURS / (name + ".md") for name in sorted(baseline)]

if args.mode == "baseline":
    def original_source(path, *positional, **keyword):
        requested = Path(path)
        if requested.parent == POURS and requested.stem in baseline:
            return io.StringIO(baseline[requested.stem])
        return builtins.open(path, *positional, **keyword)
    # The parser alone reads the saved originals. Specs and ingredient data
    # remain the studio's live data, identical for both validation runs.
    pourfile.open = original_source

parsed = [pourfile.parse(str(path)) for path in paths]
results = {}
for path in paths:
    data, errors, warnings = lint_pour.lint(
        str(path), parsed, str(POURS / "_studio/specs" / (path.stem + ".json"))
    )
    results[path.stem] = {"errors": errors, "warnings": warnings}
(REVIEW / (args.mode + "-lint.json")).write_text(
    json.dumps(results, ensure_ascii=False, indent=2) + "\n"
)
print(args.mode + ":", len(results), "pours;",
      sum(len(record["errors"]) for record in results.values()), "errors;",
      sum(len(record["warnings"]) for record in results.values()), "warnings")
for name, result in results.items():
    if result["errors"]:
        print(name + ": " + "; ".join(result["errors"]))
if args.mode == "current":
    before = json.loads((REVIEW / "baseline-lint.json").read_text())
    new_errors = {name: sorted(set(result["errors"]) - set(before[name]["errors"]))
                  for name, result in results.items()}
    new_errors = {name: errors for name, errors in new_errors.items() if errors}
    print("New errors:", new_errors)
    sys.exit(bool(new_errors))
