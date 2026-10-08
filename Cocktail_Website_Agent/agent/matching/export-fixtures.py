"""Export deterministic Python shortlist expectations; --check writes nothing."""

import argparse
import hashlib
import itertools
import json
from pathlib import Path

import matching as mt

APP = Path(mt.APP) / "dionysus-experience"
OUT = APP / "shared/selection/reference-v1.json"
SOURCES = (
    "shared/selection/model-v1.json",
    "shared/selection/model-v1.scales.json",
    "shared/data/catalogue.json",
    "../agent/matching/fixtures-v1.json",
    "../agent/matching/matching.py",
    "../agent/matching/export-fixtures.py",
)
VETOES = ("egg-white", "dairy", "gluten", "nuts", "spice")


def reference():
    model = mt.Model(mt.load_model(), mt.load_scales())
    cat = mt.load_catalogue(model)
    cases = []

    def add(case_id, answers, target=None, pairings=None, records=None):
        pool = cat
        row = {"id": case_id, "answers": answers}
        if target is not None:
            row["target"] = target
        if pairings is not None:
            row["pairings"] = pairings
            pool = {key: cat[key] for key in pairings}
        if records is not None:
            row["records"] = records
            pool = {}
            for record in records:
                key = record["pairing"]
                pool[key] = dict(cat[key], contains=record["contains"],
                                 flavour=record.get("flavour", {f: 0.0 for f in model.flavours}))
        row["shortlist"] = mt.select_shortlist(model, pool, answers)[0]
        cases.append(row)

    witnesses = json.loads((Path(mt.HERE) / "fixtures-v1.json").read_text())
    for key, answers in sorted(witnesses.items()):
        add("witness:" + key, answers, target=key)
        if cases[-1]["shortlist"][0] != key:
            raise ValueError(f"witness no longer leads: {key}")

    add("empty", {})
    add("midpoint", {"gravity": {key: 50 for key in model.grav}})
    for group, options in (("drawnToward", model.drawn), ("soughtFor", model.sought)):
        for option in options:
            add(group + ":" + option, {group: [option]})
    for key in model.tex:
        for pole in ("a", "b"):
            add("texture:" + key + ":" + pole, {"texture": {key: pole}})
    for key in model.grav:
        for value in (0, 49, 50, 51, 100):
            add("gravity:" + key + ":" + str(value), {"gravity": {key: value}})
    for count in range(4):
        for flavors in itertools.combinations(model.flavours, count):
            add("flavors:" + ",".join(flavors), {"flavors": list(flavors)})
    for count in range(len(VETOES) + 1):
        for vetoes in itertools.combinations(VETOES, count):
            add("vetoes:" + ",".join(vetoes), {"vetoes": list(vetoes)})
    conflict = {"drawnToward": ["peace", "belonging"], "soughtFor": ["little-chaos"],
                "gravity": {"controlled-wild": 100}, "texture": {"control": "b"},
                "flavors": ["bitter", "smoky"], "vetoes": ["nuts"]}
    add("conflicting", conflict)
    for key in sorted(witnesses)[::11]:
        for flavors in (("sweet",), ("bitter", "floral"), ("herbal", "citrusy", "smoky")):
            add("mixed:" + key + ":" + ",".join(flavors), dict(witnesses[key], flavors=list(flavors), vetoes=["nuts"]))
    add("empty-pool", conflict, pairings=[])
    add("subset", conflict, pairings=["sage-ruler", "regular-guy-sage"])
    add("synthetic-neutral-flavour", {"flavors": ["smoky"]}, records=[
        {"pairing": "sage-ruler", "contains": []},
        {"pairing": "caregiver-creator", "contains": []},
    ])
    add("supplied-flavour", {"flavors": ["smoky"]}, records=[
        {"pairing": "sage-ruler", "contains": [], "flavour": {f: float(f == "smoky") for f in model.flavours}},
        {"pairing": "caregiver-creator", "contains": [], "flavour": {f: 0.0 for f in model.flavours}},
    ])
    # Independent numeric expectations for full, missing-group and conflicting intake.
    for row in cases:
        if row["id"] in ("witness:caregiver-creator", "drawnToward:freedom", "conflicting"):
            motive, expression, groups = model.scores(row["answers"])
            row["numeric"] = {
                "motive": dict(zip(model.arch, motive)),
                "expression": dict(zip(model.arch, expression)),
                "groups": {group: dict(zip(model.arch, values)) for group, values in groups.items()},
                "pairings": mt.pair_scores(model, cat, row["answers"]),
            }
    # Exact binary64 values exercise signs and decimal-half representation.
    values = [0.0, 0.0000000005, -0.0000000005, 0.0000000015, -0.0000000015,
              1.0000000005, -1.0000000005, 2.0000000005, -2.0000000005,
              0.1234567895, -0.1234567895, 0.1 + 0.2, -0.1 - 0.2,
              1.0009765625, -1.0009765625, 3.0009765625, -3.0009765625]
    return {
        "version": 1,
        "provenance": {source: hashlib.sha256((APP / source).read_bytes()).hexdigest() for source in SOURCES},
        "cases": cases,
        "rounding": [{"score": value, "rounded": round(value, 9)} for value in values],
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    text = json.dumps(reference(), indent=2, ensure_ascii=False, allow_nan=False) + "\n"
    if args.check:
        if not OUT.exists() or OUT.read_text() != text:
            raise SystemExit("selection reference is stale; run python3 ../agent/matching/export-fixtures.py")
    else:
        OUT.write_text(text)
    print(f"selection reference: {len(json.loads(text)['cases'])} cases; " + ("fresh" if args.check else "exported"))


if __name__ == "__main__":
    main()
