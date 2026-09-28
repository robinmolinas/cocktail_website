import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = new URL('../public/personas/', import.meta.url);
const PORTRAIT = { width: 896, height: 1200 };
const WIDE = { width: 1920, height: 1080 };

function jpegDimensions(path) {
  const bytes = readFileSync(path);
  if (bytes[0] !== 0xff || bytes[1] !== 0xd8) {
    throw new Error('not a JPEG');
  }

  let offset = 2;
  while (offset + 9 < bytes.length) {
    while (bytes[offset] === 0xff) offset += 1;
    const marker = bytes[offset];
    offset += 1;

    if (marker === 0xd8 || marker === 0xd9) continue;
    if (offset + 1 >= bytes.length) break;

    const length = bytes.readUInt16BE(offset);
    const isStartOfFrame =
      marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
    if (isStartOfFrame) {
      return {
        height: bytes.readUInt16BE(offset + 3),
        width: bytes.readUInt16BE(offset + 5),
      };
    }
    if (length < 2) break;
    offset += length;
  }

  throw new Error('JPEG dimensions not found');
}

const rootPath = fileURLToPath(ROOT);
const pairingDirs = readdirSync(rootPath)
  .filter((name) => statSync(join(rootPath, name)).isDirectory())
  .sort();

const errors = [];
for (const pairing of pairingDirs) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)+$/.test(pairing)) {
    errors.push(`${pairing}: directory must use a lowercase pairing key`);
    continue;
  }

  const portraitPath = join(rootPath, pairing, 'portrait.jpg');
  const widePath = join(rootPath, pairing, 'wide.jpg');

  for (const [kind, path] of [['portrait', portraitPath], ['wide', widePath]]) {
    try {
      const size = jpegDimensions(path);
      if (kind === 'portrait' &&
          (size.width !== PORTRAIT.width || size.height !== PORTRAIT.height)) {
        errors.push(
          `${pairing}/portrait.jpg: expected 896x1200, got ${size.width}x${size.height}`,
        );
      }
      if (kind === 'wide') {
        const ratio = size.width / size.height;
        if (size.width !== WIDE.width || size.height !== WIDE.height ||
            Math.abs(ratio - 16 / 9) > 0.01) {
          errors.push(
            `${pairing}/wide.jpg: expected 1920x1080 (16:9), got ${size.width}x${size.height}`,
          );
        }
      }
    } catch (error) {
      errors.push(`${pairing}/${kind}.jpg: ${error.message}`);
    }
  }
}

if (pairingDirs.length === 0) {
  errors.push('no canonical persona image directories found');
}

if (errors.length > 0) {
  console.error(`Persona image validation failed:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}

console.log(`Validated ${pairingDirs.length} persona image pairings.`);
