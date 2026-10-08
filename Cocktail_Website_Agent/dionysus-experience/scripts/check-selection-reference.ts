// Build-time provenance gate. It needs no Python and works in the deployed subtree.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const APP = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SHARED_SOURCES = ['shared/selection/model-v1.json', 'shared/selection/model-v1.scales.json', 'shared/data/catalogue.json'];
const ANALYSIS_SOURCES = ['../agent/matching/fixtures-v1.json', '../agent/matching/matching.py', '../agent/matching/export-fixtures.py'];

try {
  const reference: unknown = JSON.parse(readFileSync(resolve(APP, 'shared/selection/reference-v1.json'), 'utf8'));
  if (!reference || typeof reference !== 'object' || !('provenance' in reference)) throw new Error('missing provenance');
  const provenance = reference.provenance;
  if (!provenance || typeof provenance !== 'object') throw new Error('invalid provenance');
  const withAnalysis = existsSync(resolve(APP, '../agent'));
  const errors: string[] = [];
  for (const source of [...SHARED_SOURCES, ...ANALYSIS_SOURCES]) {
    const expected = (provenance as Record<string, unknown>)[source];
    if (typeof expected !== 'string' || !/^[a-f0-9]{64}$/.test(expected)) {
      errors.push(`${source}: missing or invalid source hash`);
      continue;
    }
    if (ANALYSIS_SOURCES.includes(source) && !withAnalysis) continue;
    const path = resolve(APP, source);
    if (!existsSync(path)) {
      errors.push(`${source}: source missing from repository`);
      continue;
    }
    const actual = createHash('sha256').update(readFileSync(path)).digest('hex');
    if (actual !== expected) errors.push(`${source}: changed since reference export`);
  }
  if (errors.length) throw new Error(`${errors.join('; ')}. Regenerate the Python reference.`);
  console.log(`selection reference: source hashes match${withAnalysis ? '' : ' (standalone: analysis sources absent)'}.`);
} catch (error) {
  console.error(`selection reference: ${(error as Error).message}`);
  process.exitCode = 1;
}
