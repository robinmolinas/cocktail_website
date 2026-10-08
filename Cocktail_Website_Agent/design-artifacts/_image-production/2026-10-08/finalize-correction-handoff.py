"""Validate staged correction files and prepare Claude's local review handoff."""
import hashlib
import json
import math
import struct
from pathlib import Path
from datetime import datetime, timezone

PROJECT = Path(__file__).resolve().parents[3]
HERE = Path(__file__).resolve().parent
OLD = PROJECT / 'design-artifacts/_image-production/2026-10-06'
def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()
def dump(path, data):
    Path(path).write_text(json.dumps(data, indent=2, ensure_ascii=False) + '\n')
def rel(path):
    return str(Path(path).relative_to(PROJECT))
def pngdims(path):
    data = Path(path).read_bytes()
    assert data[:8] == b'\x89PNG\r\n\x1a\n', path
    return struct.unpack('>II', data[16:24])
def jpgdims(path):
    data = Path(path).read_bytes()
    assert data[:2] == b'\xff\xd8' and data[-2:] == b'\xff\xd9', path
    i = 2
    while i < len(data):
        assert data[i] == 255, (path, i)
        while data[i] == 255:
            i += 1
        marker = data[i]
        i += 1
        if marker in [0xd8, 0xd9] or 0xd0 <= marker <= 0xd7:
            continue
        length = int.from_bytes(data[i:i+2], 'big')
        if marker in [0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]:
            height, width = struct.unpack('>HH', data[i+3:i+7])
            return width, height
        i += length
    raise AssertionError(('JPEG dimensions missing', path))

notes = {
 'explorer-creator': 'One frozen opaque portion and caliper visible. Dense frozen stippling, glossy timber and broad trace composition remain held.',
 'explorer-jester': 'Hot cup, saucer, steam, orange peel, clamp and spanner retained. Portrait spanner visible. Repeated timber sheen and trace/serve proportions remain held.',
 'innocent-creator': 'Burgundy wine-cola cubes, handmade two-colour card and cake retained. Both portrait traces visible. Ice/material detail and proportions remain held.',
 'jester-explorer': 'Cup-shaped shell pieces, peel, folded paper and envelope retained. Fold intent and natural ice material remain uncertain; glossy wood/cord holds retained.',
 'jester-innocent': 'Crushed ice, bitters top, spoon and opened packet retained in both orientations. Repeated ice texture, low cord geometry and glossy timber remain held.',
 'jester-lover': 'Settled two-coffee exception retained with clove-studded preparation peel, fork, gift boxes and tissue. Physical clove count, handle connection, prop breadth and orange wood remain held.',
 'jester-regular-guy': 'Settled unmixed spirit and beer exception retained with keys on cloth. Low stem wrap, long paper and wet/gold timber remain held.',
 'lover-creator': 'Settled two-Nick-and-Nora exception retained with painted card and brush. Portrait group is centered. Dense droplets, sugar rim, broad painting and doubled cord remain held.',
 'magician-jester': 'Three-layer cordial retained with magnifier and spectacles on cloth. Portrait tools remain recognizable; repeated stem turns, layer plausibility and material texture remain held.',
 'magician-ruler': 'One cold handled punch retained with folded cloth and leather organiser. No invented steam. World warmth/gloss, trace specificity and handle tie remain held.',
 'ruler-jester': 'Crushed raspberry drink, mint, straw, gloves and phone retained. Flatter ice chips are still glossy/repetitive; trace recognition and low body tie remain held.',
 'hero-creator': 'Fruit-and-mint garnish, cold round goblet, paper/envelopes and pen retained. Portrait paper group visible. Oversized serve, shiny timber, dense droplets/ice and low cord remain held.',
 'hero-innocent': 'Tall iced serve, orange peel, open wooden box/lid and pencil retained. Portrait props visible. Doubled cord, ice/droplet texture and glossy amber timber remain held.',
 'hero-regular-guy': 'Single-cube pink-red serve and bitters retained with flashlight/screwdriver. Wide drink dominates; screwdriver support, dense cube texture and wood gloss remain held.',
 'lover-caregiver': 'v3 comparison: distinct pale apple chunks persist in amber liquid. Chair/olive throw retained. Doubled cord and broad composition remain held; prefer testing the later v5 liquid edit.',
 'jester-magician': 'Iced pale amber serve, lemon peel, banana/key bowl and two mugs retained. Mugs are partial/occluded traces; dense ice detail and gold timber remain held.',
 'outlaw-magician': 'v3 comparison: saturated amber-red liquid persists. Oversized bag and clipped binder/sheets retained. Ring action, dense cube texture and rough gold timber remain held; prefer testing the later v5 colour edit.'
}
manifest = json.loads((HERE / 'refinement-export-manifest.json').read_text())
rows = [dict(r) for r in manifest]
for pair in ['lover-caregiver', 'outlaw-magician']:
    folder = OLD / pair / 'v5'
    m = json.loads((folder / 'measurements.json').read_text())
    pm = json.loads((folder / 'portrait-measurements.json').read_text())
    rows.append({'pairing': pair, 'name': m['pour'], 'batch': 16,
        'measurement': str(folder / 'measurements.json'), 'output': str(folder),
        'wideMaster': m['master'], 'portraitMaster': pm['master'],
        'browserOwner': 'Claude', 'integrationOwner': 'Claude'})
timestamp = datetime.now(timezone.utc).isoformat()
audit = []
handoff = []
for row in rows:
    folder = Path(row['output'])
    meta = json.loads((folder / 'metadata.json').read_text())
    pair = row['pairing']
    assert meta['pairing'] == pair
    assert all(v is False for v in meta['acceptance'].values()), pair
    assert sha(PROJECT / 'design-artifacts/pours' / (pair + '.md')) == meta['sourceSha256'], pair
    dims = {}
    for kind, shape in [('wide', (1920, 1080)), ('portrait', (896, 1200))]:
        m = meta['measurements'] if kind == 'wide' else meta['portraitMeasurements']
        assert sha(m['master']) == m['masterSha256'], (pair, kind)
        assert pngdims(m['master']) == (m['masterDimensions']['width'], m['masterDimensions']['height'])
        assert sha(PROJECT / 'design-artifacts/pours/_studio/specs' / (pair + '.json')) == m['specSha256'], pair
        assert m['sourceSha256'] == meta['sourceSha256'], pair
        if m.get('generatedSource'):
            assert sha(m['generatedSource']) == m['masterSha256'], (pair, kind, 'generated-copy')
        actual = jpgdims(folder / (kind + '.jpg'))
        assert actual == shape, (pair, kind, actual)
        assert sha(folder / (kind + '.jpg')) == meta['hashes'][kind], (pair, kind)
        dims[kind] = dict(zip(['width', 'height'], actual))
        tag = meta['runtimeCandidate']['wideTag' if kind == 'wide' else 'tag']
        glass = meta['runtimeCandidate']['wideGlass' if kind == 'wide' else 'glass']
        assert all(math.isfinite(v) for v in [*tag.values(), *glass.values()])
        assert all(0 <= tag[k] <= 1 for k in ['cx', 'cy', 'w']) and tag['w'] > 0
        assert all(0 <= glass[k] <= 1 for k in ['x', 'y'])
    assert sha(folder / 'master.png') == meta['hashes']['master']
    assert sha(meta['portraitMeasurements']['master']) == meta['hashes']['portraitMaster']
    passes = sum(g['intact'] for g in meta['geometry'])
    note = notes[pair] if row['batch'] != 16 else meta['review']['issues']
    versions = {k: Path(row[k + 'Master']).parent.name for k in ['wide', 'portrait']}
    candidate_id = pair + ('-v5-batch16' if row['batch'] == 16 else '-batch' + str(row['batch']))
    status = 'exported; inspected JPEGs; visual holds retained; Claude browser/name review pending'
    row.update(status=status, exported=True, rootWideJpegInspected=True, rootPortraitJpegInspected=True)
    report = {'id': candidate_id, 'pairing': pair, 'batch': row['batch'], 'dimensions': dims,
        'outputHashesMatch': True, 'masterHashesMatch': True, 'currentDossierAndSpecMatch': True,
        'normalizedMeasurementsFiniteAndInRange': True, 'wideJpegInspected': True,
        'portraitJpegInspected': True, 'staticCropPasses': passes, 'staticCropTotal': len(meta['geometry'])}
    audit.append(report)
    item = {'id': candidate_id, 'pairing': pair, 'name': row['name'], 'batch': row['batch'],
        'nativeVersions': versions, 'output': rel(folder), 'wide': rel(folder / 'wide.jpg'),
        'portrait': rel(folder / 'portrait.jpg'), 'metadata': rel(folder / 'metadata.json'),
        'runtimeCandidate': meta['runtimeCandidate'], 'hashes': meta['hashes'],
        'sourceSha256': meta['sourceSha256'], 'specSha256': meta['measurements']['specSha256'],
        'reviewNote': note, 'priorHolds': meta['review'], 'staticGeometry': {'passCount': passes, 'total': len(meta['geometry']),
        'scope': meta['geometryScope']}, 'status': status,
        'recommendedForComparison': row['batch'] == 16 or pair not in ['lover-caregiver', 'outlaw-magician'],
        'acceptance': meta['acceptance'], 'browserOwner': 'Claude', 'nameOverlayOwner': 'Claude',
        'liveSwapOwner': 'Claude', 'liveSwapPerformedByCodex': False}
    handoff.append(item)
    text = '# ' + row['name'] + ' — staged JPEG review\n\n'
    text += 'Both actual exported JPEGs inspected by Codex on 2026-10-08. Exact dimensions: wide 1920×1080, portrait 896×1200. Master/output hashes and current dossier/spec fingerprints independently checked.\n\n'
    text += note + '\n\n'
    text += 'Static calculated crop bounds: ' + str(passes) + '/' + str(len(meta['geometry'])) + '. This is not browser, motion, font/name fit, personality or physics acceptance. All acceptance flags remain false. Claude owns browser/name checks and live swaps.\n'
    (folder / 'export-review.md').write_text(text)
dump(HERE / 'refinement-export-manifest.json', rows[:len(manifest)])
dump(HERE / 'correction-image-audit.json', {'checkedAt': timestamp, 'pairs': len(audit),
    'uniquePairings': len(set(r['pairing'] for r in audit)), 'jpegFiles': len(audit)*2,
    'dimensionsAndHashes': 'PASS', 'sourceAndSpecFingerprints': 'PASS',
    'scope': 'File/metadata checks and actual exported JPEG inspection only. Browser/name and live integration belong to Claude.',
    'staticCropPasses': sum(r['staticCropPasses'] for r in audit),
    'staticCropTotal': sum(r['staticCropTotal'] for r in audit), 'results': audit})
dump(HERE / 'claude-correction-handoff.json', {'createdAt': timestamp, 'liveDraftBaseline': '53b988a',
    'generationAndExportOwner': 'Codex', 'browserAndNameOwner': 'Claude', 'liveSwapOwner': 'Claude',
    'candidatePairs': 19, 'uniquePairings': 17, 'liveSwapsPerformedByCodex': 0,
    'newCorrections': ['lover-caregiver-v5-batch16', 'outlaw-magician-v5-batch16'],
    'candidates': handoff})
dump(HERE / 'batch-16-export-receipt.json', {'exporterSha256': sha(PROJECT / 'design-artifacts/_image-production/export-pair.mjs'),
    'explicitExecutionApproval': 'User2026-10-08: I approve command',
    'exportedPairs': [h for h in handoff if h['batch'] == 16],
    'note': 'Exporter exit2 denotes preserved static geometry failures; both exact-size JPEGs and metadata were created successfully.'})
queue_path = OLD / 'queue.json'
q = json.loads(queue_path.read_text())
p = q['progress']
p['phase'] = 'batch16 corrections exported; Claude browser/name review and live swaps; further quality corrections remain'
p['blocker'] = None
p['correctionCandidates'] = handoff
p['correctionExportedCandidatePairCount'] = 19
p['correctionExportedUniquePairingCount'] = 17
p['correctionHandoff'] = rel(HERE / 'claude-correction-handoff.json')
p['verification']['correctionStagedImages'] = 'PASS2026-10-08:19 candidate pairs/38JPEGs, exact sizes and current source/spec/master/output hashes; all JPEGs inspected. Static geometry and visual holds retained.'
p['verification'].setdefault('historicalCodexBrowserNameOverlay', p['verification'].get('browserNameOverlay'))
p['verification']['browserNameOverlay'] = 'Owned by Claude per user2026-10-08; Codex does not run browser or name checks for these corrections.'
p['recordStateNote'] = 'User reports all115 selected drafts live at53b988a (132 total including17 originals). Codex exported17 batch14/15 refinement pairs plus2 new batch16 v5 pairs. Live selectedCandidates remain the baseline; new correctionCandidates are staged only. Claude owns browser/name acceptance and live swaps. Existing historical reviews/holds preserved.'
p['correctionProductionBatch'] = {'id': 'production-batch-16', 'generationLedger': rel(HERE / 'batch-16-generation-ledger.json'),
    'newPairings': 0, 'correctedPairings': 2, 'builtInImagegenCalls': 5, 'selectedNativeAssets': 4,
    'rejectedNativeAssetsRetained': 1, 'exportedPairs': 2, 'pendingExports': 0,
    'browserAndNameOwner': 'Claude', 'liveSwapOwner': 'Claude', 'liveAssetsChangedByCodex': False,
    'remainingHolds': 'Liquid improvement only; materials, trace composition, tag physics and browser/name fit remain pending.'}
for candidate in p['selectedCandidates']:
    candidate.setdefault('historicalIntegrationState', candidate.get('integrationState'))
    candidate['integrationState'] = 'live-draft-at53b988a; user-confirmed; final visual acceptance pending'
dump(queue_path, q)
readme = '# Correction handoff — 8 October 2026\n\n'
readme += '19 staged correction candidate pairs across 17 personas are ready for Claude’s comparison: 17 preserved batch14/15 refinements, plus two newly generated v5 liquid corrections. All 38 actual JPEGs were inspected; dimensions are exactly 1920×1080 and 896×1200, with current source/spec and master/output hashes verified. This is technical export verification; visual holds remain.\n\n'
readme += 'Claude owns browser checks, actual name overlays and live swaps in personas.ts. Codex made no registry/public-asset changes. The user-confirmed live draft baseline is commit53b988a. Compare the later v5 pair for Hoping You’d Come and For Its Own Good; their v3 exports are retained as comparisons. All new candidate acceptance flags remain false.\n\n'
readme += '[Machine-readable paths, measurements, hashes and holds](claude-correction-handoff.json) · [Independent file audit](correction-image-audit.json) · [Five-call generation ledger](batch-16-generation-ledger.json)\n\n'
readme += 'The apple edit replaces large pale chunks with finer suspended pulp. A repeated fleck pattern, doubled stem cord, broad chair/throw and orange glossy timber remain. The grappa edit is lighter and more transparent; bag dominance, clipped binder/sheets, unclear ring action, etched cube and rough gold timber remain. Static calculated crop containment is 6/7 for apple and 0/7 for grappa, which includes the declared side props; neither is browser acceptance.\n\n'
readme += '| Persona | Native wide / portrait | Batch | Wide JPEG | Portrait JPEG | Metadata |\n|---|---|---:|---|---|---|\n'
for h in handoff:
    def link(target):
        import os
        return os.path.relpath(PROJECT / target, HERE)
    readme += '| ' + h['name'] + ' (' + h['pairing'] + ') | ' + h['nativeVersions']['wide'] + ' / ' + h['nativeVersions']['portrait'] + ' | ' + str(h['batch']) + ' | [wide](' + link(h['wide']) + ') | [portrait](' + link(h['portrait']) + ') | [metadata](' + link(h['metadata']) + ') |\n'
readme += '\nFurther production should use the current full pour/spec and keep existing visual holds visible. These candidates do not clear the earlier material or personality issues. Await Claude’s per-candidate results for browser/name-specific corrections; material-only production may continue independently.\n'
(HERE / 'README.md').write_text(readme)
old_readme = OLD / 'README.md'
prefix = '# Current workflow — 8 October 2026\n\nUser confirms all selected drafts live at53b988a. Codex continues generation and staged JPEG corrections; Claude owns browser/name checks and live version swaps. Latest:17 batch14/15 refinement pairs plus2 new v5 liquid corrections exported, inspected and fingerprint/dimension checked. [Current correction handoff](../2026-10-08/README.md). Historical browser blockers and counts below are preserved; they do not describe current ownership or draft integration.\n\n'
previous = old_readme.read_text()
if not previous.startswith('# Current workflow — 8 October 2026'):
    old_readme.write_text(prefix + previous)
print(json.dumps({'candidatePairs': len(audit), 'uniquePairings': len(set(r['pairing'] for r in audit)), 'JPEGs': len(audit)*2,
 'dimensionsHashesSources': 'PASS', 'staticCropPasses': sum(r['staticCropPasses'] for r in audit),
 'staticCropTotal': sum(r['staticCropTotal'] for r in audit), 'handoff': rel(HERE / 'README.md')}))
