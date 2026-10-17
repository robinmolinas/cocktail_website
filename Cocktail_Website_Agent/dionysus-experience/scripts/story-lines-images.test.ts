// Every archival image named in shared/data/story-lines.json ships in public/.
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, it } from 'vitest';
import storyLines from '../shared/data/story-lines.json';

const PUBLIC = join(resolve(dirname(fileURLToPath(import.meta.url)), '..'), 'public');

it('every archival image file exists', () => {
  for (const line of Object.values(storyLines as Record<string, { image?: { src: string; srcSmall: string } }>)) {
    if (!line.image) continue;
    for (const src of [line.image.src, line.image.srcSmall]) expect(existsSync(join(PUBLIC, src)), src).toBe(true);
  }
});
