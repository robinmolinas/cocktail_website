"""Prepare versioned JPEG inputs from preserved batch14/15 measurements.

Creates private export adapters only. Original masters/measurements, public
assets, and runtime registry are never modified. Unknown bounds stay unknown.
"""
import copy
import hashlib
import json
import math
import pathlib
import struct

PROJECT = pathlib.Path(__file__).resolve().parents[3]
OLD = PROJECT / 'design-artifacts/_image-production/2026-10-06'
HERE = pathlib.Path(__file__).resolve().parent

def sha(p):
    return hashlib.sha256(pathlib.Path(p).read_bytes()).hexdigest()

def box(value):
    if value is None:
        return None
    if isinstance(value, list) and len(value) == 4:
        return dict(zip(['x0', 'y0', 'x1', 'y1'], value))
    if isinstance(value, dict) and all(isinstance(value.get(k), (int, float)) for k in ['x0', 'y0', 'x1', 'y1']):
        return {k: value[k] for k in ['x0', 'y0', 'x1', 'y1']}
    return None

def measurement(item, kind, batch):
    key = item.get('id', item.get('key'))
    original = pathlib.Path(item.get(kind + 'Measurements', item.get(kind + 'Geometry')))
    if not original.is_absolute():
        original = OLD / original
    source = json.loads(original.read_text())
    if kind in source and isinstance(source[kind], dict):
        source = source[kind]
    m = copy.deepcopy(source)
    master = pathlib.Path(m.get('master', item[kind]))
    if not master.is_absolute():
        master = OLD / master
    data = master.read_bytes()
    assert data[:8] == b'\x89PNG\r\n\x1a\n', master
    width, height = struct.unpack('>II', data[16:24])
    if m.get('masterSha256'):
        assert m['masterSha256'] == sha(master), key
    if m.get('generatedSource'):
        assert sha(m['generatedSource']) == sha(master), key
    dossier = PROJECT / 'design-artifacts/pours' / (key + '.md')
    spec = PROJECT / 'design-artifacts/pours/_studio/specs' / (key + '.json')
    if m.get('specSha256'):
        assert m['specSha256'] == sha(spec), key
    # Source fingerprints are fresh. The older source fingerprint is preserved,
    # never presented as a current-source match. All current spec fingerprints
    # must also match the already-live selected generation's spec where recorded.
    queue = json.loads((OLD / 'queue.json').read_text())
    selected = next(c for c in queue['progress']['selectedCandidates'] if c['pairing'] == key)
    live_measurement = json.loads((PROJECT / selected['measurements']).read_text())
    if live_measurement.get('specSha256'):
        assert live_measurement['specSha256'] == sha(spec), key
    prior_source = m.get('sourceSha256')
    m.update(pairing=key, pour=item.get('name', m.get('pour')), master=str(master), masterSha256=sha(master), sourceSha256=sha(dossier), specSha256=sha(spec), masterDimensions={'width': width, 'height': height})
    m['exportProvenance'] = {'batch': batch, 'originalMeasurement': str(original), 'originalMeasurementSha256': sha(original), 'previousSourceSha256': prior_source, 'sourceNote': 'Current dossier/spec fingerprints recorded; unchanged current recipe spec checked against the live selected generation. Original source/geometry and all photographic holds are preserved.', 'manualTolerance': 'Retains original manually estimated geometry; actual name and phone checks belong to Claude.'}
    bounds = m.get('bounds', {})
    if not bounds:
        bounds = {'glass': m['glassBounds'], 'paper': m['tag']['paperBounds'], 'serve': m['serveBounds']}
    m['unknownBounds'] = {k: v for k, v in bounds.items() if box(v) is None}
    m['bounds'] = {k: box(v) for k, v in bounds.items() if box(v) is not None}
    assert 'glass' in m['bounds'] and 'paper' in m['bounds'], key
    recognition = m.get('recognitionRegions', m.get('recognition', {}))
    if not recognition and m.get('props'):
        recognition = {k: v.get('recognitionBounds') for k, v in m['props'].items()}
    m['recognitionRegions'] = {k: box(v) for k, v in recognition.items() if box(v) is not None}
    crop = m.get(kind + 'Crop')
    if crop is None:
        proposed = m.get('proposedCrop')
        crop = proposed.get(kind) if isinstance(proposed, dict) else proposed
    if crop is None:
        crop = [0, 0, width, height]
    # One batch15 manual portrait guessed 1084px; actual IHDR is 1083px.
    # Preserve the guess, and bound the private adapter to the actual raster.
    if crop[0] + crop[2] > width or crop[1] + crop[3] > height:
        assert crop[0] + crop[2] <= width + 2 and crop[1] + crop[3] <= height + 2, (key, kind, crop)
        m['originalProposedCrop'] = list(crop)
        crop = [crop[0], crop[1], min(crop[2], width - crop[0]), min(crop[3], height - crop[1])]
    assert len(crop) == 4 and crop[0] >= 0 and crop[1] >= 0 and crop[2] > 0 and crop[3] > 0 and crop[0] + crop[2] <= width and crop[1] + crop[3] <= height, (key, kind, crop)
    m[kind + 'Crop'] = crop
    # The exporter reads wide from the wide master and portrait from its own
    # independent portrait master. Cross-orientation fields are inert here.
    m.setdefault('wideCrop', crop)
    m.setdefault('portraitCrop', crop)
    tag = m['tag']
    m['tag'] = {k: tag[k] for k in ['cx', 'cy', 'w', 'angle']}
    assert all(math.isfinite(v) for v in m['tag'].values())
    m['glass'] = {k: m['glass'][k] for k in ['x', 'y']}
    review = m.get('review', {})
    if not isinstance(review, dict):
        review = {'originalReview': review}
    m['review'] = review
    for axis in ['recipe', 'personality', 'world']:
        review.setdefault(axis, f'Preserved batch{batch} actual-original review and current settled dossier/spec. {axis} quality holds remain; this is a private comparison export, not final acceptance.')
    review.setdefault('issues', item.get('held', m.get('reviewHolds', [])))
    m['acceptance'] = {'material': False, 'personality': False, 'physics': False, 'name': False, 'browser': False, 'user': False, 'integrated': False}
    return m

rows = []
for batch in [14, 15]:
    manifest = json.loads((OLD / f'production-batch-{batch}-refinement.json').read_text())
    for item in manifest.get('items', manifest.get('pairs', [])):
        key = item.get('id', item.get('key'))
        folder = HERE / 'refinement-exports' / key
        wide = measurement(item, 'wide', batch)
        portrait = measurement(item, 'portrait', batch)
        wide['portraitMeasurementFile'] = 'portrait-measurements.json'
        folder.mkdir(parents=True, exist_ok=True)
        for name, data in [('measurements.json', wide), ('portrait-measurements.json', portrait)]:
            content = json.dumps(data, indent=2) + '\n'
            dest = folder / name
            if dest.exists():
                assert dest.read_text() == content, dest
            else:
                dest.write_text(content)
        rows.append({'pairing': key, 'name': wide['pour'], 'batch': batch, 'measurement': str(folder / 'measurements.json'), 'output': str(folder), 'wideMaster': wide['master'], 'portraitMaster': portrait['master'], 'status': 'prepared; export pending; all prior holds retained', 'browserOwner': 'Claude', 'integrationOwner': 'Claude'})
(HERE / 'refinement-export-manifest.json').write_text(json.dumps(rows, indent=2) + '\n')
print(f'Prepared {len(rows)} dedicated wide/portrait export inputs; original assets preserved.')
