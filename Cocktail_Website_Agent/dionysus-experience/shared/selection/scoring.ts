// Pure matching v1. Accumulation follows the Python reference's fixed order.
import type { BinaryKey, DrawnId, FlavourId, GravityKey, RevealRequest, SoughtId } from '../answers';
import { ARCHETYPES, parsePairingKey, type Archetype, type PairingKey } from '../pairing';
import modelData from './model-v1.json';
import scaleData from './model-v1.scales.json';

export const GROUPS = ['drawnToward', 'soughtFor', 'gravity', 'texture'] as const;
export type Group = (typeof GROUPS)[number];
export type ArchetypeVector = Record<Archetype, number>;
export type FlavourStrengths = Readonly<Record<FlavourId, number>>;
type Affinity = Readonly<Partial<Record<Archetype, number>>>;
type Poles = readonly [Affinity, Affinity];
type ModelData = {
  roles: { motive: Record<Group, number>; expression: Record<Group, number> };
  drawnToward: Record<DrawnId, Affinity>;
  soughtFor: Record<SoughtId, Affinity>;
  gravity: Record<GravityKey, Poles>;
  texture: Record<BinaryKey, Poles>;
  flavours: FlavourId[];
  flavourFit: { phi: number };
};
const model = modelData as unknown as ModelData;
const scales = scaleData.scales;
const vector = (value: (a: Archetype) => number): ArchetypeVector =>
  Object.fromEntries(ARCHETYPES.map((a) => [a, value(a)])) as ArchetypeVector;

function wordColumns(table: Readonly<Record<string, Affinity>>) {
  const words = Object.keys(table);
  const mean = vector((a) => words.reduce((sum, word) => sum + (table[word][a] ?? 0), 0) / words.length);
  return words.map((word) => ({ word, values: vector((a) => (table[word][a] ?? 0) - mean[a]) }));
}
function poleColumns<K extends string>(table: Record<K, Poles>) {
  return Object.keys(table).filter((key) => !key.startsWith('_')).map((key) => {
    const [left, right] = table[key as K];
    return {
      key: key as K,
      a: vector((a) => ((left[a] ?? 0) - (right[a] ?? 0)) / 2),
      b: vector((a) => ((right[a] ?? 0) - (left[a] ?? 0)) / 2),
    };
  });
}
const drawnColumns = wordColumns(model.drawnToward);
const soughtColumns = wordColumns(model.soughtFor);
const gravityColumns = poleColumns(model.gravity);
const textureColumns = poleColumns(model.texture);
function add(target: ArchetypeVector, values: ArchetypeVector, factor = 1) {
  for (const a of ARCHETYPES) target[a] += factor * values[a];
}
function wordGroup(columns: ReturnType<typeof wordColumns>, words: readonly string[]) {
  const chosen = new Set(words);
  const out = vector(() => 0);
  for (const column of columns) if (chosen.has(column.word)) add(out, column.values);
  return out;
}
export type PersonaScores = {
  groups: Record<Group, ArchetypeVector>;
  motive: ArchetypeVector;
  expression: ArchetypeVector;
};
export function scorePersona(req: RevealRequest): PersonaScores {
  const groups: Record<Group, ArchetypeVector> = {
    drawnToward: wordGroup(drawnColumns, req.drawnToward),
    soughtFor: wordGroup(soughtColumns, req.soughtFor),
    gravity: vector(() => 0), texture: vector(() => 0),
  };
  for (const column of gravityColumns) {
    const value = req.gravity[column.key];
    if (value === undefined) continue;
    const lean = (value - 50) / 50;
    if (lean < 0) add(groups.gravity, column.a, -lean);
    else if (lean > 0) add(groups.gravity, column.b, lean);
  }
  for (const column of textureColumns) {
    const pole = req.texture[column.key];
    if (pole !== undefined) add(groups.texture, column[pole]);
  }
  const role = (name: 'motive' | 'expression') => vector((a) => GROUPS.reduce(
    (sum, group) => sum + model.roles[name][group] * groups[group][a] / scales[group], 0,
  ));
  return { groups, motive: role('motive'), expression: role('expression') };
}
export function scorePairing(
  persona: PersonaScores, pairing: PairingKey, flavours: readonly FlavourId[], strength?: FlavourStrengths,
): number {
  const identity = parsePairingKey(pairing);
  if (!identity) throw new RangeError(`Unknown pairing key: ${pairing}`);
  const chosen = new Set(flavours);
  const fit = model.flavours.reduce((sum, f) => sum + (chosen.has(f) ? (strength?.[f] ?? 0) : 0), 0);
  return persona.motive[identity.primary] + persona.expression[identity.secondary] + model.flavourFit.phi * fit;
}

// Round the actual binary64 value like Python round(score, 9), ties to even.
// Scaling a Number first loses which side of a decimal half it occupies.
export function round9(score: number): number {
  if (!Number.isFinite(score) || score === 0) return score;
  const view = new DataView(new ArrayBuffer(8));
  view.setFloat64(0, Math.abs(score), false);
  const bits = view.getBigUint64(0, false);
  const exponentBits = Number((bits >> 52n) & 0x7ffn);
  const fraction = bits & ((1n << 52n) - 1n);
  const significand = exponentBits === 0 ? fraction : fraction + (1n << 52n);
  const exponent = (exponentBits === 0 ? -1022 : exponentBits - 1023) - 52;
  if (exponent >= 0) return score;
  const numerator = significand * 1_000_000_000n;
  const denominator = 1n << BigInt(-exponent);
  let rounded = numerator / denominator;
  const remainder = numerator % denominator;
  if (remainder * 2n > denominator || (remainder * 2n === denominator && rounded % 2n !== 0n)) rounded += 1n;
  // Parsing once avoids another rounding when the scaled integer is large.
  const magnitude = Number(`${rounded}e-9`);
  return score < 0 ? -magnitude : magnitude;
}
