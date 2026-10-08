# Flavour rules — Tomás's review (2026-10-08)

Reviewed `flavour-rules.json` as proposed by the matching owner (2026-10-06). Verified against the 132 specs.

## Summary

The rules are structurally sound and the amount-scaling logic (≥20 ml × 1.0, 7.5–20 ml × 0.6, smaller × 0.3) is the right approach for this collection. The `sweet` derivation from live sugar concentration rather than a regex is also the right call — a sugar syrup and a honey syrup both sweeten in proportion. Four things to address before the first matching run; two are minor.

---

## Issues

### 1. `ogogoro` has no flavour category — assign `fruity 0.6` (minor)

**Pour:** outlaw-hero (30 ml Pedro's ògógóró, unaged).

Ògógóró is a Nigerian palm-sap distillate. Its character is fruity and slightly vegetal with a grassy finish — closer to cachaça than to a neutral grain spirit. At 30 ml (mid-tier by the amount scale, so × 0.6) a `fruity` base of 1.0 is defensible. The current rules leave this pour unscored for fruity, which would underweight it when a guest picks fruity.

**Proposed addition to `fruity` tier-1:**
```
ogogoro
```

### 2. `batavia_arrack` at `smoky 0.3` is misfiled — move to `fruity 0.6` (minor)

**Pour:** magician-ruler (60 ml Batavia arrack).

Batavia arrack is not smoky. It is a Javanese rum-style spirit with a pronounced funky, tropical-fruity character — closer to agricole rum than to a peated Scotch. Classifying it as smoky (even weakly) would wrongly steer smoke-disliking guests away from a pour they would enjoy and wrongly attract smoke-seeking guests to a pour that doesn't deliver that.

The right home is `fruity` at 1.0 (60 ml × 1.0 = full-weight fruity), matching the spirit's actual profile and aligning it with rum, cognac and armagnac in the fruity tier-2.

**Proposed change:** Remove `batavia_arrack` from `smoky`. Add `batavia_arrack` to `fruity` tier-1 at 1.0 alongside `pineapple|cranberry|…`.

### 3. `rye` at `spicy 0.4` fires for 15 pours with no other spice signal (worth flagging)

15 pours score spicy=0.4 on rye alone: creator-explorer, creator-sage, hero-caregiver, hero-outlaw, jester-explorer, jester-regular-guy, jester-ruler, lover-hero, lover-outlaw, outlaw-ruler, regular-guy-hero, ruler-lover, ruler-magician, sage-hero, sage-magician.

Rye does have a spicy character (pepper, grain), so the categorisation is not wrong. But at 0.4 it means a guest selecting "spicy" would get a modest nudge toward every rye pour in the collection even when none of the other ingredients support that reading. Whether this is desirable depends on how the matching weights are calibrated.

**No change proposed yet.** I'd leave 0.4 in place and let the matching owner see the distribution in a test run. If rye pours cluster too heavily under spicy relative to genuinely spicy pours (falernum, ginger, cinnamon), lower to 0.2.

### 4. `shochu` has no flavour category — leave unscored (confirm)

**Pour:** lover-magician (30 ml shochu barley).

Shochu is a very clean Japanese spirit, lower ABV than most base spirits (25%). Its flavour contribution in this pour is mild and grain-neutral — it adds texture and length without a strong flavour signature. I'd leave it unscored rather than force it into a category it doesn't cleanly belong to. The pour scores on its other ingredients (gin, vermouth, lemon). **This is a confirm, not a change request.**

---

## What is correct and should not change

- `citrusy`: comprehensive; `orange_peel` and `lemon_peel` in the regex are harmless (garnish already excluded at the data level).
- `bitter` tier structure (1.0 / 0.8 / 0.5): the three-tier split between full-bitter spirits, bitters themselves, and low-bitter fortifieds is correct.
- `herbal` two-tier (spirits / fresh herbs both at 1.0): correct.
- `fruity` tier-2 (`cognac|armagnac|brandy|pisco|grappa|…` at 0.5): correct — these contribute a background fruitiness, not a primary fruit character.
- `fresh` (mint/cucumber at 1.0; bubbles at 0.8): correct.
- `floral` (`lillet|cocchi|blanc_vermouth|genever` at 0.5): correct — these add floral background, not a primary floral statement.
- Garnish excluded at the data level — critical decision, confirmed correct.

---

## Proposed edits (two changes)

```json
"fruity": [
  ["pineapple|cranberry|pomegranate|passion|mango|tamarind|strawberry|raspberry|cherry|cassis|mure|peche|apricot|apple|calvados|pear|plum|quince|sloe|port_|red_wine|bordeaux|nebbiolo|banane|kirsch|grenadine|cider|gooseberry|fig|orange_juice|maraschino|pimms|kalimotxo|ogogoro|batavia_arrack", 1.0],
  ["cognac|armagnac|brandy|pisco|grappa|pineau|tokaji|madeira|px_sherry", 0.5]
],
"smoky": [
  ["mezcal|peated|caol_ila|islay|lapsang|smoked", 1.0]
]
```

(Removes `batavia_arrack|scotch_blended_hopped` from smoky entirely. `scotch_blended_hopped` is a Scotch cold-steeped with dried hops — see ingredients table entry added by Tomás for caregiver-explorer. Hops give herbal/floral/bitter character, not smoke. It has no natural home in `smoky`; it is already covered via `vermouth|tea|…` → `herbal 0.5` through the `gin|genever|old_tom|vermouth|tea` tier and will receive a modest herbal boost from the hop-steeped scotch key if the regex is extended — but that is a separate, lower-priority question. Leaving it unscored for now is preferable to miscategorising it as smoky.)

**These edits are already applied to `flavour-rules.json` (2026-10-08). The `_about` header is updated. The matching owner can run `npm run import:pours` and proceed.**
