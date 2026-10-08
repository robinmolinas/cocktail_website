"""Report provenance regressions; uses tiny simulations and a stubbed solver.

Run with the analysis Python environment: python -B -m unittest discover
  -s agent/matching -p test_evidence.py
"""

import errno
import json
from pathlib import Path
import shutil
import sys
import tempfile
import unittest
from unittest.mock import patch

import analyze
import matching as mt
import render


class EvidenceTests(unittest.TestCase):
    def setUp(self):
        self.root = Path(tempfile.mkdtemp(prefix="dionysus-evidence-"))
        self.addCleanup(self.cleanup)
        self.inputs = {}
        for name, source in (("model", mt.MODEL_PATH), ("scales", mt.SCALES_PATH), ("catalogue", mt.CATALOGUE_PATH)):
            path = self.root / (name + ".json")
            path.write_bytes(Path(source).read_bytes())
            self.inputs[name] = path
        load_model, load_scales, load_catalogue = mt.load_model, mt.load_scales, mt.load_catalogue
        self.enterContext(patch.object(analyze, "HERE", str(self.root)))
        self.enterContext(patch.object(render, "HERE", str(self.root)))
        for attr, name in (("MODEL_PATH", "model"), ("SCALES_PATH", "scales"), ("CATALOGUE_PATH", "catalogue")):
            self.enterContext(patch.object(mt, attr, str(self.inputs[name])))
        self.enterContext(patch.object(mt, "load_model", side_effect=lambda: load_model(self.inputs["model"])))
        self.enterContext(patch.object(mt, "load_scales", side_effect=lambda: load_scales(self.inputs["scales"])))
        self.enterContext(patch.object(mt, "load_catalogue", side_effect=lambda model: load_catalogue(model, self.inputs["catalogue"])))
        self.enterContext(patch.object(analyze, "simulate", return_value={}))
        self.enterContext(patch.object(analyze, "Feasibility"))
        self.rows = [{"key": "caregiver-creator", "leads_fallback": "persona alone", "shortlist": "reachable (leads)", "witness": {}}]
        self.enterContext(patch.object(analyze, "reachability", return_value=self.rows))
        self.enterContext(patch("builtins.print"))

    def cleanup(self):
        try:
            shutil.rmtree(self.root)
        except OSError as error:
            if error.errno != errno.EPERM:
                raise

    def run_analysis(self, *options):
        with patch.object(sys, "argv", ["analyze.py", "--samples", "1", *options]):
            analyze.main()

    def metadata(self):
        return json.loads((self.root / "distribution-v1.json").read_text())["_analysis"]

    def test_success_binds_both_outputs_to_input_snapshot(self):
        self.run_analysis()
        meta = self.metadata()
        self.assertTrue(meta["reachability_regenerated"])
        self.assertEqual(meta["source_hashes"], analyze.source_hashes())
        self.assertEqual(set(meta["output_hashes"]), {"reachability-v1.json", "fixtures-v1.json"})
        self.assertEqual(render.analysis()["_analysis"], meta)

    def test_failed_solver_cannot_reuse_old_reachability(self):
        self.run_analysis()
        with patch.object(analyze, "reachability", side_effect=RuntimeError("interrupted solver")):
            with self.assertRaisesRegex(RuntimeError, "interrupted solver"):
                self.run_analysis()
        self.assertFalse(self.metadata()["reachability_regenerated"])
        with self.assertRaisesRegex(ValueError, "not regenerated"):
            render.reach()

    def test_failed_witness_write_cannot_mark_run_complete(self):
        self.run_analysis()
        original_open = open

        def fail_witness(path, mode="r", *args, **kwargs):
            if Path(path).name == "fixtures-v1.json" and mode == "w":
                raise OSError("witness write failed")
            return original_open(path, mode, *args, **kwargs)

        with patch("builtins.open", side_effect=fail_witness):
            with self.assertRaisesRegex(OSError, "witness write failed"):
                self.run_analysis()
        self.assertFalse(self.metadata()["reachability_regenerated"])
        with self.assertRaisesRegex(ValueError, "not regenerated"):
            render.reach()

    def test_source_edit_during_loading_is_rejected(self):
        original_load = mt.load_model

        def change_after_load():
            value = original_load()
            with self.inputs["model"].open("a") as source:
                source.write("\n")
            return value

        with patch.object(mt, "load_model", side_effect=change_after_load):
            with self.assertRaisesRegex(RuntimeError, "inputs changed"):
                self.run_analysis()
        self.assertFalse((self.root / "distribution-v1.json").exists())

    def test_source_edit_during_solver_keeps_run_incomplete(self):
        self.run_analysis()

        def change_during_solver(*_):
            with self.inputs["catalogue"].open("a") as source:
                source.write("\n")
            return self.rows

        with patch.object(analyze, "reachability", side_effect=change_during_solver):
            with self.assertRaisesRegex(RuntimeError, "inputs changed"):
                self.run_analysis()
        self.assertFalse(self.metadata()["reachability_regenerated"])

    def test_renderer_rejects_each_stale_input_and_output(self):
        self.run_analysis()
        paths = list(self.inputs.values()) + [self.root / name for name in ("reachability-v1.json", "fixtures-v1.json")]
        for path in paths:
            with self.subTest(path=path.name):
                original = path.read_bytes()
                path.write_bytes(original + b"\n")
                with self.assertRaisesRegex(ValueError, "stale analysis"):
                    render.analysis()
                path.write_bytes(original)

    def test_distribution_only_run_cannot_render_reachability(self):
        self.run_analysis("--skip-reach")
        self.assertFalse(render.analysis()["_analysis"]["reachability_regenerated"])
        with self.assertRaisesRegex(ValueError, "not regenerated"):
            render.reach()


if __name__ == "__main__":
    unittest.main()
