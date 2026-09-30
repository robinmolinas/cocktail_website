"""Shared helpers for the Dionysus Pour Studio tools (standard library only)."""
import json, os, re, sys

TOOLS = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(TOOLS, "data")
DASH_ML = 0.8
DROP_ML = 0.05


def find_project_root(start=None):
    """Nearest ancestor holding _bmad/ (GenAI Projects workspace) or Cocktail_Website_Agent/ (Dionysus repo)."""
    p = os.path.abspath(start or TOOLS)
    while p != os.path.dirname(p):
        if os.path.isdir(os.path.join(p, "_bmad")) or os.path.isdir(os.path.join(p, "Cocktail_Website_Agent")):
            return p
        p = os.path.dirname(p)
    sys.exit("error: could not find the project root (no _bmad/ or Cocktail_Website_Agent/ above %s)" % TOOLS)


def module_config(root):
    """The dps section of the BMAD config (set by dps-setup), {project-root} resolved. Empty if not set up."""
    try:
        import tomllib
    except ImportError:  # Python < 3.11: fall back to the defaults
        return {}
    out = {}
    for name in ("config.toml", "config.user.toml", os.path.join("custom", "config.toml"), os.path.join("custom", "config.user.toml")):
        p = os.path.join(root, "_bmad", name)
        if os.path.exists(p):
            try:
                with open(p, "rb") as f:
                    out.update(tomllib.load(f).get("modules", {}).get("dps", {}))
            except (OSError, ValueError):
                pass
    return {k: v.replace("{project-root}", root) for k, v in out.items() if isinstance(v, str)}


ROOT = find_project_root()
APP = os.path.join(ROOT, "Cocktail_Website_Agent") if os.path.isdir(os.path.join(ROOT, "Cocktail_Website_Agent")) else os.path.join(ROOT, "Dionysus", "Cocktail_Website_Agent")
_CFG = module_config(ROOT)
# precedence: environment (tests, one-off runs) > dps-setup's config > this workspace's defaults
POURS = os.environ.get("DPS_POURS_FOLDER") or _CFG.get("dps_pours_folder") or os.path.join(APP, "design-artifacts", "pours")
LIBRARY = os.environ.get("DPS_LIBRARY_FOLDER") or _CFG.get("dps_library_folder") or (
    os.path.join(ROOT, "docs", "_text") if os.path.isdir(os.path.join(ROOT, "docs", "_text")) else os.path.join(ROOT, "Dionysus", "docs", "_text")
)
STUDIO = os.path.join(POURS, "_studio")


def load_json(name):
    with open(os.path.join(DATA, name), encoding="utf-8") as f:
        return json.load(f)


def ingredients():
    return load_json("ingredients.json")["ingredients"]


def styles():
    return load_json("styles.json")


def load_spec(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


class SpecError(Exception):
    pass


def resolve(spec):
    """Return a list of resolved lines: dict(key, name, ml, sugar_g, ethanol_ml, acid_g, contains, kind, amount)."""
    table = ingredients()
    out, unknown = [], []
    for line in spec.get("ingredients", []) + [{"key": g} if isinstance(g, str) else g for g in spec.get("garnish", [])]:
        key = line["key"]
        ing = table.get(key)
        if ing is None:
            unknown.append(key)
            continue
        ml = 0.0
        sugar_g = 0.0
        if ing["kind"] == "solid":
            g = line.get("g")
            if g is None and "count" in line:
                g = line["count"] * ing.get("g_per_count", 0)
            if g is None and "ml_dry" in line:
                g = line["ml_dry"] * 0.85  # granulated sugar ~0.85 g per ml
            g = g or 0.0
            ml = g * ing.get("ml_per_g", 0.63)
            sugar_g = g * ing["sugar"] / 100.0
            amount = "%g g" % round(g, 1)
        elif ing["kind"] == "garnish":
            amount = line.get("count", 1)
        else:
            if "ml" in line:
                ml = float(line["ml"])
            elif "dashes" in line:
                ml = line["dashes"] * DASH_ML
            elif "drops" in line:
                ml = line["drops"] * DROP_ML
            elif "barspoons" in line:
                ml = line["barspoons"] * 5.0
            sugar_g = ml * ing["sugar"] / 100.0
            amount = "%g ml" % round(ml, 1)
        out.append({
            "key": key, "name": ing["name"], "kind": ing["kind"], "ml": ml,
            "ethanol_ml": ml * ing["abv"] / 100.0, "sugar_g": sugar_g,
            "acid_g": ml * ing["acid"] / 100.0, "contains": ing.get("contains", []),
            "source": ing["source"], "unsourced": ing["source"].startswith("unsourced"),
            "amount": amount, "stage": line.get("stage", "base"),
        })
    if unknown:
        raise SpecError("not in the ingredient table yet: %s. Add each with scripts/add_ingredient.py (values + source, "
                        "allergens classified on the safe side), then rerun. The table never limits the drink." % ", ".join(unknown))
    return out
