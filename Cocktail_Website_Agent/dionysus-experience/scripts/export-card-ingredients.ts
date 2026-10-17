// The keep card's short ingredient list (playtest, 2026-10-17: "we kind of
// want to try it again"): what is in the glass, by name only, no amounts.
//
//   node --experimental-strip-types scripts/export-card-ingredients.ts
//
// Reads Tomás's specs (the structured recipes the import also reads) and
// writes shared/data/card-ingredients.json, pairing → names in pour order.
// The recipe text itself can't be shortened by rule: it carries brands,
// strengths and sub-recipes. Garnishes are left off, as on a menu; water is
// not an ingredient anyone shops for. A key without a name here fails the run.

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const APP = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SPECS = resolve(APP, '../design-artifacts/pours/_studio/specs');
const OUT = join(APP, 'shared/data/card-ingredients.json');

const SKIP = new Set(['water', 'ice_water']);

const NAMES: Record<string, string> = {
  abbey_ale: 'abbey ale', absinthe_lucid: 'absinthe', absinthe_verte_tangerine: 'tangerine absinthe',
  agave_nectar: 'agave nectar', allspice_dram: 'allspice dram', amaretto: 'amaretto', amaro_ciociaro: 'amaro',
  amaro_nonino: 'Amaro Nonino', angostura: 'Angostura bitters', anis_dulce: 'anís dulce', anis_seco: 'anís seco',
  aperol: 'Aperol', apollinaris: 'sparkling mineral water', apple_brandy: 'apple brandy',
  apricot_eau_de_vie: 'apricot eau-de-vie', apricot_steeped_rye: 'apricot rye', armagnac: 'Armagnac',
  balsamic_vinegar: 'balsamic vinegar', banane_du_bresil: 'banana liqueur', basil_leaf: 'basil',
  batavia_arrack: 'Batavia arrack', beef_broth_homemade: 'beef broth', beer: 'beer', benedictine: 'Bénédictine',
  bigallet_china_china: 'China-China amer', black_tea: 'black tea', blanc_vermouth: 'blanc vermouth',
  blanc_vermouth_fig_leaf: 'fig-leaf vermouth', borovicka: 'borovička', bourbon: 'bourbon',
  bourbon_beet: 'beetroot bourbon', bourbon_blantons: 'bourbon', bourbon_cask_strength: 'cask-strength bourbon',
  bourbon_elijah_craig: 'bourbon', bourbon_four_roses_bentons: 'bacon-washed bourbon', brandy_aged_grape: 'brandy',
  brandy_unaged_grape: 'pisco', cachaca_unaged: 'cachaça', calvados: 'calvados', camomile_honey_syrup: 'camomile honey',
  campari: 'Campari', canadian_whisky: 'Canadian whisky', caol_ila_12: 'Islay whisky', caramel_syrup: 'caramel syrup',
  celery_salt: 'celery salt', champagne_brut: 'champagne', cherry_heering: 'cherry liqueur', cinnamon_stick: 'cinnamon',
  cinnamon_syrup: 'cinnamon syrup', clove: 'clove', coca_cola: 'cola', coffee_chicory: 'chicory coffee', cognac: 'cognac',
  cognac_black_tea: 'black-tea cognac', cognac_sichuan_pepper: 'Sichuan-pepper cognac', cointreau: 'Cointreau',
  coriander_seed: 'coriander seed', cranberry_cocktail: 'cranberry juice', cranberry_syrup: 'cranberry syrup',
  cream: 'cream', creme_de_cacao_white: 'crème de cacao', creme_de_cassis: 'crème de cassis',
  creme_de_mure: 'crème de mûre', creme_de_peche: 'peach liqueur', creme_de_violette: 'crème de violette',
  cucumber_muddled: 'cucumber', cynar: 'Cynar', demerara_sherry_vinegar_syrup: 'sherry-vinegar syrup',
  demerara_sugar: 'demerara sugar', demerara_sugar_cube: 'sugar cube', demerara_syrup: 'demerara syrup',
  dry_cider: 'dry cider', dry_vermouth: 'dry vermouth', egg_white: 'egg white', egg_whole: 'whole egg',
  egg_whole_lavender: 'lavender egg', elderflower_liqueur: 'elderflower liqueur', espresso: 'espresso',
  falernum_homemade: 'falernum', fernet: 'Fernet-Branca', fino: 'fino sherry', folle_blanche_armagnac: 'young Armagnac',
  fortaleza_blanco: 'tequila blanco', genever_oude: 'oude genever', giffard_triple_sec: 'triple sec',
  gin_gordons: 'London dry gin', gin_london_dry: 'London dry gin', gin_tanqueray_london_dry_413: 'London dry gin',
  ginger_ale: 'ginger ale', ginger_cumin_syrup: 'ginger and cumin syrup', glenfarclas_single_malt: 'single malt Scotch',
  glenlivet_12: 'Speyside single malt', gooseberry_syrup: 'gooseberry syrup', grapefruit_juice: 'grapefruit juice',
  grappa: 'grappa', grappa_nonino_monovitigno: 'grappa', green_chartreuse: 'green Chartreuse',
  green_olive_brine: 'olive brine', grenadine: 'grenadine', honey: 'honey', honey_syrup: 'honey syrup',
  honey_syrup_3to1: 'honey syrup', hot_coffee: 'hot coffee', hudson_do_the_rye_thing: 'rye whiskey',
  irish_pot_still_whiskey: 'Irish whiskey', irish_whiskey: 'Irish whiskey', jaggery_syrup: 'jaggery syrup',
  jasmine_tea_syrup: 'jasmine tea syrup', jeppsons_malort: 'Malört', jim_beam_white_label: 'bourbon',
  johnnie_walker_red_label: 'blended Scotch', kalimotxo_ice: 'red wine and cola ice', kirsch: 'kirsch',
  lark_classic_cask: 'Tasmanian single malt', lemon_juice: 'lemon juice', lemon_peel: 'lemon peel',
  lemongrass_syrup: 'lemongrass syrup', licorice_root_syrup: 'liquorice syrup', lillet_blanc: 'Lillet Blanc',
  lime_caraway_cordial: 'lime and caraway cordial', lime_juice: 'lime juice', local_honey_syrup: 'honey syrup',
  madeira_rainwater: 'Madeira', makrut_lime_leaf: 'makrut lime leaf', malt_rich_syrup: 'malt syrup',
  mandarin_liqueur: 'mandarin liqueur', mango_syrup: 'mango syrup', manzanilla: 'manzanilla sherry',
  maple_syrup: 'maple syrup', maraschino: 'maraschino', mezcal: 'mezcal', mezcal_del_maguey_chichicapa: 'mezcal',
  milk: 'milk', mint_leaves: 'mint', mint_leaves_pressed_out: 'mint', mint_syrup: 'mint syrup',
  nebbiolo_syrup: 'Nebbiolo syrup', nikka_from_the_barrel: 'Japanese whisky', noilly_prat_original_dry: 'dry vermouth',
  ogogoro_pedros: 'ògógóró', old_potrero_rye: 'rye whiskey', old_tom_ransom: 'Old Tom gin', oloroso_dry: 'oloroso sherry',
  orange_bitters: 'orange bitters', orange_curacao: 'orange curaçao', orange_flower_water: 'orange flower water',
  orange_juice: 'orange juice', orange_juice_sharpened: 'orange juice', orange_marmalade: 'marmalade',
  orange_peel: 'orange peel', orange_wheel_muddled: 'orange', orgeat: 'orgeat', orgeat_toasted_almond: 'toasted almond orgeat',
  parsnip_syrup: 'parsnip syrup', passion_fruit_syrup: 'passion fruit syrup', pear_syrup: 'pear syrup',
  pernod_anise: 'Pernod', peychauds: "Peychaud's bitters", pimms_no1: "Pimm's", pineapple_juice: 'pineapple juice',
  pineapple_juice_pressed: 'pineapple', pineau_des_charentes_blanc: 'Pineau des Charentes', plum_syrup: 'plum syrup',
  plymouth_gin: 'Plymouth gin', pomegranate_syrup: 'pomegranate syrup', popcorn_demerara_syrup: 'popcorn syrup',
  port_ruby: 'ruby port', port_tawny_10: 'tawny port', px_sherry: 'PX sherry', quince_paste_loosened: 'quince',
  raspberry_cumin_syrup: 'raspberry and cumin syrup', raspberry_red_wine_syrup: 'raspberry and red wine syrup',
  red_bordeaux: 'red Bordeaux', red_wine_cabernet: 'red wine', red_wine_young_spanish: 'Spanish red wine',
  rich_syrup: 'rich syrup', roasted_apple: 'roasted apple', rosemary_syrup: 'rosemary syrup', rum_aged: 'aged rum',
  rum_aged_tea: 'black-tea rum', rum_angostura_1919: 'aged rum', rum_appleton_12: 'aged Jamaican rum',
  rum_gold_jamaican: 'gold Jamaican rum', rum_gold_puerto_rican: 'gold rum', rum_jamaican_aged_50: 'aged Jamaican rum',
  rum_jamaican_any: 'Jamaican rum', rum_lemon_hart_151: 'overproof Demerara rum', rum_navy: 'navy rum',
  rum_virgin_islands: 'St. Croix rum', rum_white: 'white rum', rum_white_50: 'white rum', rum_zacapa_23: 'aged rum',
  rye: 'rye whiskey', rye_40: 'rye whiskey', rye_barrel_proof: 'cask-strength rye', saline_solution: 'salt',
  salt_pinch: 'salt', scotch_blended: 'blended Scotch', scotch_blended_hopped: 'hopped Scotch',
  scotch_single_grain: 'single grain Scotch', scotch_single_malt_highland_unpeated: 'Highland single malt',
  seville_demerara_shrub: 'Seville-orange shrub', shackleton_blended_malt: 'blended malt Scotch',
  sherry_medium_dry: 'medium dry sherry', sherry_vinegar: 'sherry vinegar', shiso_leaf: 'shiso',
  shochu_barley: 'barley shochu', siembra_azul_blanco: 'tequila blanco', simple_syrup: 'simple syrup',
  sloe_gin: 'sloe gin', soda_water: 'soda water', sorghum_syrup: 'sorghum syrup',
  strawberry_lemon_cordial: 'strawberry and lemon cordial', strawberry_muddled: 'strawberry', sugar: 'sugar',
  sugar_cube: 'sugar cube', sweet_vermouth: 'sweet vermouth', sweet_vermouth_beet: 'beetroot vermouth',
  sweet_vermouth_cardamom: 'cardamom vermouth', tamarind_water: 'tamarind', tarragon_leaves: 'tarragon',
  tequila_blanco: 'tequila blanco', thyme_grenadine: 'thyme grenadine', thyme_sprig: 'thyme',
  toasted_oat_cream: 'toasted oat cream', tokaji_aszu: 'Tokaji', tomato_juice: 'tomato juice',
  tomato_vanilla_syrup: 'tomato and vanilla syrup', triple_sec: 'orange liqueur', underberg: 'Underberg',
  vanilla_extract: 'vanilla', verjus_blanc: 'verjus', vodka: 'vodka', vodka_citrus: 'citrus vodka',
  white_wine_dry_california_bay: 'bay-leaf white wine', yellow_chartreuse: 'yellow Chartreuse', zirbenz: 'stone pine liqueur',
};

const out: Record<string, string[]> = {};
const missing: string[] = [];
for (const file of readdirSync(SPECS).filter((f) => f.endsWith('.json')).sort()) {
  const spec = JSON.parse(readFileSync(join(SPECS, file), 'utf8')) as { pairing: string; ingredients: { key: string }[] };
  const names: string[] = [];
  for (const { key } of spec.ingredients) {
    if (SKIP.has(key)) continue;
    const name = NAMES[key];
    if (!name) { missing.push(`${spec.pairing}: ${key}`); continue; }
    if (!names.includes(name)) names.push(name);
  }
  out[spec.pairing] = names;
}
if (missing.length) {
  console.error(`no card name for:\n  ${missing.join('\n  ')}`);
  process.exit(1);
}
writeFileSync(OUT, `${JSON.stringify(out, null, 2)}\n`);
console.log(`wrote ${Object.keys(out).length} pours to ${OUT}`);
