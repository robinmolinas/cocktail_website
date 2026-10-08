import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const APP = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const shared = ['shared/selection/model-v1.json', 'shared/selection/model-v1.scales.json', 'shared/data/catalogue.json'];
const analysis = ['../agent/matching/fixtures-v1.json', '../agent/matching/matching.py', '../agent/matching/export-fixtures.py'];
let directory: string;
let app: string;
function copy(source: string) {
  const target = resolve(app, source);
  mkdirSync(dirname(target), { recursive: true });
  if (analysis.includes(source)) {
    // Synthetic analysis files let these integration tests run in the deployed subtree too.
    const bytes = `analysis fixture: ${source}\n`;
    writeFileSync(target, bytes);
    const referencePath = resolve(app, 'shared/selection/reference-v1.json');
    const reference = JSON.parse(readFileSync(referencePath, 'utf8'));
    reference.provenance[source] = createHash('sha256').update(bytes).digest('hex');
    writeFileSync(referencePath, JSON.stringify(reference));
  } else {
    copyFileSync(resolve(APP, source), target);
  }
}
function check() {
  return spawnSync(process.execPath, ['--experimental-strip-types', resolve(app, 'scripts/check-selection-reference.ts')], { encoding: 'utf8' });
}
beforeEach(() => {
  directory = mkdtempSync(join(tmpdir(), 'dionysus-selection-gate-'));
  app = join(directory, 'app');
  for (const source of ['scripts/check-selection-reference.ts', 'shared/selection/reference-v1.json', ...shared]) copy(source);
  writeFileSync(join(app, 'package.json'), '{"type":"module"}\n');
});
afterEach(() => {
  try {
    rmSync(directory, { recursive: true, force: true });
  } catch (error) {
    // Some restricted runners permit scratch writes but forbid directory removal.
    // Keep their temporary evidence without hiding any gate assertion failure.
    if ((error as NodeJS.ErrnoException).code !== 'EPERM') throw error;
  }
});

describe('selection reference provenance gate', () => {
  it('checks shared sources in the standalone app without requiring Python', () => {
    const result = check();
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('standalone: analysis sources absent');
  });
  it('checks all sources in the full repository', () => {
    for (const source of analysis) copy(source);
    expect(check().status).toBe(0);
  });
  for (const source of shared) it(`rejects stale standalone input: ${source}`, () => {
    const path = resolve(app, source);
    writeFileSync(path, readFileSync(path, 'utf8') + '\n');
    const result = check();
    expect(result.status).toBe(1);
    expect(result.stderr).toContain(`${source}: changed since reference export`);
  });
  for (const source of analysis) it(`rejects stale repository input: ${source}`, () => {
    for (const input of analysis) copy(input);
    const path = resolve(app, source);
    writeFileSync(path, readFileSync(path, 'utf8') + '\n');
    const result = check();
    expect(result.status).toBe(1);
    expect(result.stderr).toContain(`${source}: changed since reference export`);
  });
  it('rejects missing analysis files in a partial repository', () => {
    copy(analysis[0]);
    const result = check();
    expect(result.status).toBe(1);
    expect(result.stderr).toContain(`${analysis[1]}: source missing from repository`);
  });
  it('rejects a missing provenance hash even in the standalone app', () => {
    const path = resolve(app, 'shared/selection/reference-v1.json');
    const reference = JSON.parse(readFileSync(path, 'utf8'));
    delete reference.provenance[analysis[0]];
    writeFileSync(path, JSON.stringify(reference));
    const result = check();
    expect(result.status).toBe(1);
    expect(result.stderr).toContain(`${analysis[0]}: missing or invalid source hash`);
  });
});
