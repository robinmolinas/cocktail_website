// Import the authored pours into shared/data/ (spec 1.2).
//
//   npm run import:pours         regenerate shared/data/{catalogue.json,manifest.json,pours/*}
//                                and ../agent/catalogue/import-report.md
//   npm run import:pours:check   regenerate in memory; exit 1 if the committed files differ
//
// Flags: --if-sources (with --check, the build's step: skip with exit 0 when
// any source is absent; otherwise fail only on contains/status/pairing-set
// drift and warn on newer copy) --pours <dir> --specs <dir> --ingredients <file> --rules <file>
// (defaults below, relative to this app directory). Exits non-zero on any
// error and then writes nothing. Deterministic: sorted keys, no timestamps.
//
// Runs under Node's type stripping (Node 22+: --experimental-strip-types;
// plain `node` on 25), so shared/import uses `.ts` import extensions.

import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { buildStore } from '../shared/import/build.ts';
import { classifyDrift } from '../shared/import/drift.ts';
import { loadersModule, renderReport, stableJson } from '../shared/import/emit.ts';

const APP = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const DEFAULTS = {
  pours: '../design-artifacts/pours',
  specs: '../design-artifacts/pours/_studio/specs',
  // The live dps-tools table at the workspace root (not the stale copy in Dionysus/skills).
  ingredients: '../../../skills/dps-tools/data/ingredients.json',
  rules: '../agent/matching/flavour-rules.json',
};

const OUT = {
  catalogue: 'shared/data/catalogue.json',
  manifest: 'shared/data/manifest.json',
  pours: 'shared/data/pours',
  report: '../agent/catalogue/import-report.md',
};

function parseArgs(argv: string[]) {
  const options = { ...DEFAULTS, check: false, ifSources: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--check') options.check = true;
    else if (arg === '--if-sources') options.ifSources = true;
    else if (arg === '--pours' || arg === '--specs' || arg === '--ingredients' || arg === '--rules') {
      const value = argv[++i];
      if (!value || value.startsWith('--')) throw new Error(`${arg} needs a value`);
      options[arg.slice(2) as keyof typeof DEFAULTS] = value;
    } else throw new Error(`unknown argument ${arg}`);
  }
  return options;
}

const abs = (p: string) => resolve(APP, p);
const rel = (p: string) => relative(APP, p).split(sep).join('/');
const sha256 = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
const byName = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);

function main(): number {
  const options = parseArgs(process.argv.slice(2));
  const poursDir = abs(options.pours);
  const specsDir = abs(options.specs);
  const ingredientsFile = abs(options.ingredients);
  const rulesFile = abs(options.rules);

  // The deployed subtree has no design-artifacts/ or workspace-root table:
  // there the build skips the freshness check instead of failing.
  if (options.ifSources) {
    const missing = [poursDir, specsDir, ingredientsFile, rulesFile].filter((p) => !existsSync(p));
    if (missing.length) {
      console.log(`import-pours: sources not present — freshness check skipped (missing ${missing.map(rel).join(', ')}).`);
      return 0;
    }
  }

  const hashes: Record<string, string> = {};
  const read = (file: string) => {
    const bytes = readFileSync(file);
    hashes[rel(file)] = sha256(bytes);
    return bytes.toString('utf8');
  };
  const readJson = (file: string): unknown => {
    try {
      return JSON.parse(read(file));
    } catch (error) {
      throw new Error(`${rel(file)}: ${(error as Error).message}`, { cause: error });
    }
  };

  const dossierFiles = readdirSync(poursDir)
    .filter((f) => f.endsWith('.md') && f !== 'STUDIO-RULES.md')
    .sort(byName);
  const dossiers = dossierFiles.map((f) => ({ pairing: f.slice(0, -3), markdown: read(join(poursDir, f)) }));
  const specs = new Map<string, unknown>();
  for (const f of readdirSync(specsDir).filter((f) => f.endsWith('.json')).sort(byName)) {
    specs.set(f.slice(0, -5), readJson(join(specsDir, f)));
  }
  const ingredients = readJson(ingredientsFile);
  const rules = readJson(rulesFile);

  const store = buildStore({ dossiers, specs, ingredients, rules });
  if (store.errors.length) {
    console.error(`import-pours: ${store.errors.length} error(s); nothing written.`);
    for (const e of store.errors) console.error(`  ✗ ${e}`);
    return 1;
  }

  const pairings = store.pours.map((p) => p.pairing);
  const outputs = new Map<string, string>();
  outputs.set(OUT.catalogue, stableJson(store.catalogue));
  for (const pour of store.pours) outputs.set(`${OUT.pours}/${pour.pairing}.json`, stableJson(pour));
  outputs.set(`${OUT.pours}/index.ts`, loadersModule(pairings));
  outputs.set(
    OUT.manifest,
    stableJson({
      generator: 'scripts/import-pours.ts',
      pours: pairings.length,
      sources: Object.fromEntries(Object.entries(hashes).sort(([a], [b]) => byName(a, b))),
    }),
  );
  const vetoFree = store.catalogue.filter((e) => e.contains.length === 0).length;
  outputs.set(OUT.report, renderReport({ pairings, statuses: new Map(store.pours.map((p) => [p.pairing, p.status])), warnings: store.warnings, vetoFree }));

  // Files in shared/data/pours that this run would not produce are stale.
  const poursOut = abs(OUT.pours);
  const stale = existsSync(poursOut)
    ? readdirSync(poursOut)
        .map((f) => `${OUT.pours}/${f}`)
        .filter((f) => !outputs.has(f))
    : [];

  if (options.check && options.ifSources) {
    // The build's step: only safety drift fails; newer copy just warns.
    let committed: unknown;
    try {
      committed = JSON.parse(readFileSync(abs(OUT.catalogue), 'utf8'));
    } catch {
      committed = null;
    }
    const { safety, flavour } = classifyDrift(committed, store.catalogue);
    if (safety.length) {
      console.error(`import-pours: the committed store is unsafe against the sources (${safety.length}); run \`npm run import:pours\`.`);
      for (const line of safety) console.error(`  ✗ ${line}`);
      return 1;
    }
    const newer = new Set(flavour);
    for (const pour of store.pours) {
      const file = `${OUT.pours}/${pour.pairing}.json`;
      if (!existsSync(abs(file)) || readFileSync(abs(file), 'utf8') !== outputs.get(file)) newer.add(pour.pairing);
    }
    if (newer.size) console.warn(`import-pours: ${newer.size} pours have newer copy than the committed store — run npm run import:pours`);
    else console.log(`import-pours: committed store is fresh (${pairings.length} pours, ${vetoFree} veto-free).`);
    return 0;
  }

  if (options.check) {
    const drift = [...outputs].filter(([file, content]) => !existsSync(abs(file)) || readFileSync(abs(file), 'utf8') !== content).map(([f]) => f);
    drift.push(...stale.map((f) => `${f} (stale)`));
    if (drift.length) {
      console.error(`import-pours --check: ${drift.length} file(s) differ from the sources; run \`npm run import:pours\`.`);
      for (const f of drift) console.error(`  ≠ ${f}`);
      return 1;
    }
    console.log(`import-pours --check: up to date (${pairings.length} pours, ${vetoFree} veto-free).`);
    return 0;
  }

  for (const f of stale) rmSync(abs(f));
  for (const [file, content] of outputs) {
    mkdirSync(dirname(abs(file)), { recursive: true });
    writeFileSync(abs(file), content);
  }
  const warningCount = [...store.warnings.values()].reduce((n, list) => n + list.length, 0);
  console.log(`import-pours: ${pairings.length} pours, ${vetoFree} veto-free, ${warningCount} report item(s) in ${OUT.report}.`);
  return 0;
}

try {
  process.exitCode = main();
} catch (error) {
  console.error(`import-pours: ${(error as Error).message}`);
  process.exitCode = 1;
}
