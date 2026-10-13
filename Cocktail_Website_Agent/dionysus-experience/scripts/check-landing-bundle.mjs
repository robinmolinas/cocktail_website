// Post-build gate (story 1.6): the landing chunk carries no zod and no
// DEV-only intake hook. Zod is only for the lazily loaded reveal, gift and
// link chunks; window.__dionysusIntake must be compiled out of production.
// Markers are ones minification keeps: zod's `_zod` internals and the
// `ZodError` name, plus the hook's global name.
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const ASSETS = fileURLToPath(new URL('../dist/assets/', import.meta.url));
const MARKERS = ['__dionysusIntake', 'ZodError', '_zod'];

let landing;
try {
  landing = readdirSync(ASSETS).filter((file) => /^index-.*\.js$/.test(file));
} catch {
  console.error('check-landing-bundle: dist/assets is missing; run vite build first.');
  process.exit(1);
}
if (landing.length === 0) {
  console.error('check-landing-bundle: no dist/assets/index-*.js landing chunk found.');
  process.exit(1);
}

const failures = [];
for (const file of landing) {
  const source = readFileSync(ASSETS + file, 'utf8');
  for (const marker of MARKERS) if (source.includes(marker)) failures.push(`${file} contains ${marker}`);
}
if (failures.length) {
  console.error(`check-landing-bundle: the landing chunk must carry no zod and no dev hook:\n  ${failures.join('\n  ')}`);
  process.exit(1);
}
console.log(`check-landing-bundle: ${landing.join(', ')} carries no zod and no dev hook.`);
