# F1: same-cocktail scan of the 132 pours

Tomás, 2026-10-06. **A scan only. No pour was changed for F1.** Robin decides.

## The test (STUDIO-RULES check 3, Robin 2026-10-06, F1)

> the same template with only the spirit swapped *within its kind* (rye for bourbon, one gin for another, one rum for another) is the same cocktail. A different spirit family (gin to vodka, whiskey to brandy), or a riff that changes the template itself (a modifier, a split base, a spark in the glass), makes a different drink.

How I applied it:
- **Kinds:** whisk(e)y is one kind (scotch, bourbon, rye, Canadian, Irish, Japanese). Gin is one (London dry, Old Tom, Plymouth, genever). Rum is one. Brandy is one (cognac, Armagnac, pisco, grappa, apple brandy). Agave is one (tequila, mezcal). Vodka is its own.
- **Doesn't count** (D12, the two Rickeys): glass, ice, service, measures, a different citrus, water, a different bottle of the same kind.
- **Counts as a template change:** a modifier (a liqueur, vermouth, amaro or wine that isn't in the template); a split base; a spark in the glass, meaning an added flavour the guest is told about, whether it's an infusion, a flavoured sugar or a seasoning.
- **Sources:** every spec in `_studio/specs/`, every recipe and method, and the drink's name in yours 4 ("The cocktail I've made for you is…"). I took each signals neighbour at 0.80 or above and then went through by template, because the cosine misses some close pairs. *Nothing to It* and *What It Rests On* aren't in signals at all.

## Result

**0 pairs are the same cocktail. 34 neighbour pairs are different.** Under the rule as written, every Manhattan, Old-Fashioned, Martini and highball in the collection stands. Five of the "different" verdicts rest only on a flavoured sugar or a trace of seasoning. They're listed under "Thinnest calls" below, in case Robin reads "a spark in the glass" more narrowly.

A side note: under the rule as written, the vodka Collins the *Word Gets Round* room set aside (ruled the same as *Not Too Polite*'s Tom Collins) would now count as different, since gin to vodka is a change of family. That's moot, because the pour is now a Jack Rose.

## The pairs

| # | pair | recipe A | recipe B | verdict |
| --- | --- | --- | --- | --- |
| 1 | caregiver-lover *Standing By* ↔ ruler-sage *Either Way* (0.94) | blended scotch 60, passion fruit syrup 7.5, Angostura 2 dashes, lemon peel; stirred, served up in a wine glass | blended scotch 60, malt syrup (barley malt + rich syrup) 7.5, Angostura 2 dashes, orange peel; built on ice | **Different:** each has a spark in the sugar (passion fruit; barley malt). Thin, see T1. *Either Way*'s room set passion fruit aside because it was already *Standing By*'s. |
| 2 | caregiver-lover *Standing By* ↔ explorer-ruler *Far Enough* | as above | Shackleton blended malt 60, rich plum syrup 6.25, Angostura 2 dashes, orange peel; one large cube | **Different:** plum spark against passion fruit. Thin, see T1. |
| 3 | ruler-sage *Either Way* ↔ explorer-ruler *Far Enough* | as in 1 | as in 2 | **Different:** malt spark against plum spark. Thin, see T1. |
| 4 | explorer-hero *Nothing to It* ↔ sage-creator *What It Rests On* (not in signals) | Blanton's bourbon 60, caramel syrup 7.5, Angostura 2 dashes, orange peel; stirred, up, no ice | bourbon 60, popcorn-demerara syrup 7.5, Angostura 2 dashes, ice-cold water 30, peel; made the night before in the freezer, up | **Different:** caramel spark against popcorn spark. This is the **closest pair in the collection**: same kind, form, measures and service, and both sparks come off the same *Matrix* charts (Caramel pdf 72-73, Corn pdf 88-89). See T2. |
| 5 | explorer-hero *Nothing to It* ↔ sage-hero *At the Time* | as in 4 | barrel-proof rye 50, demerara syrup 12.5, Angostura 2 dashes, water 15; strained over a block of frozen coffee | **Different:** the coffee ice is a spark in the glass (it melts into the drink). |
| 6 | hero-outlaw *No Promises* ↔ sage-hero *At the Time* | rye 60, sorghum syrup 7.5, Underberg 5 ml, orange peel; one cube | as in 5 | **Different:** Underberg replaces the aromatic bitters, sorghum the sugar; coffee ice on the other side. |
| 7 | outlaw-regular-guy *Where You Stand* ↔ sage-magician *Plain to See* | Canadian 60, maple 5, orange curaçao 2.5, Angostura 2 dashes; up (Embury's Canadian) | Canadian 30 + rye 30, demerara 7.5, tamarind water 7.5, Angostura; up | **Different:** a curaçao modifier against a split base with a tamarind spark. |
| 8 | outlaw-creator *Asked In* ↔ ruler-sage *Either Way* | Glenlivet 12 60, elderflower liqueur 15, rich syrup 5, orange bitters 2 dashes, lemon peel; one cube | as in 1 | **Different:** the elderflower liqueur is a modifier. |
| 9 | creator-sage *Beside the First* ↔ jester-explorer *Unrehearsed* (0.87) | rye 60, simple 7.5, triple sec 2.5, green Chartreuse 5, Angostura 2 dashes; shaken, up | rye 45 + Zacapa 23 rum 15, demerara 10, Angostura, water 20; poured into an ice shell | **Different:** modifiers (Chartreuse, triple sec) against a split base. |
| 10 | lover-sage *In Kind* ↔ sage-creator *What It Rests On* (0.98) | bourbon 60, rich syrup 7.5, water 30, mint pressed in and taken out; pounded ice, julep cup | as in 4 | **Different:** a Mint Julep. Mint takes the bitters' place on heaped ice, a different template (*Codex* pp. 30-31). |
| 11 | regular-guy-creator *Right Here* ↔ sage-explorer *Look Again* | Tanqueray 60, licorice root syrup 10, Angostura 2 dashes; built on ice | oude genever 45 + cognac 15, rich syrup 6, Angostura 2 dashes, lemon peel; built | **Different:** a licorice spark against a split base. |
| 12 | outlaw-innocent *Kept* ↔ magician-hero *Worth the Trade* (and outlaw-magician *For Its Own Good*) | Armagnac 60, yellow Chartreuse 15, rich syrup 2.5, Angostura | cognac 45 + Folle Blanche Armagnac 15, gooseberry syrup 10; one cube (grappa 60, Nebbiolo syrup 10, orange bitters) | **Different:** a Chartreuse modifier, a split base, and a Nebbiolo-syrup spark respectively. |
| 13 | caregiver-hero *Off Duty* ↔ magician-regular-guy *Cold Water First* | Irish whiskey 45, honey 10, hot water 110, thyme steeped 2 min | Caol Ila 30 + Irish pot still 30, demerara 14 g, boiling water 150, lemon peel | **Different:** a split base and peel (the Whisky Skin) against a thyme spark. |
| 14 | lover-outlaw *Accomplices* ↔ ruler-lover *Up Close* (0.88) | rye 60, beetroot-steeped sweet vermouth 30, orange curaçao 7.5, Angostura; up | rye 60, sweet vermouth 20, pressed pineapple 7.5, rich syrup 2.5, Angostura, lemon peel; up | **Different:** a curaçao modifier and a beet spark against a pineapple spark. |
| 15 | regular-guy-hero *I'll Do It* and ruler-regular-guy *One Table* ↔ the rye Manhattans (14) | rye 45 + apple brandy 15, sweet vermouth 30, demerara 2.5, Angostura; one cube / rye 30 + cognac 30, cardamom vermouth 30, Bénédictine 5, Peychaud's, Angostura | as in 14 | **Different:** split bases (the second is a Vieux Carré). |
| 16 | caregiver-sage *Instead* ↔ creator-caregiver *Quite Alive* | Ransom Old Tom 60, sweet vermouth 30, Angostura 1 + orange bitters 1, lemon peel; up (a Martinez) | London dry 60, sweet vermouth 30, Fernet 7.5, orange peel; up (a Hanky Panky) | **Different:** the gins are the same kind, but Fernet is a modifier. |
| 17 | creator-caregiver *Quite Alive* ↔ jester-caregiver *Anyway* (0.94) | as in 16 | gin 60, sweet vermouth 30, dry vermouth 5, a crushed orange slice, Peychaud's, coriander; shaken (a Bronx) | **Different:** dry vermouth and orange (the Bronx template) against Fernet. |
| 18 | caregiver-lover *Standing By* ↔ sage-lover *A Brother's Care* (0.89; also *Either Way* ↔ *A Brother's Care*, 0.85) | as in 1 | blended scotch 60, sweet vermouth 20, oloroso 10, PX 5, orange bitters; up (Rob Roy riff) | **Different:** a Martini-family template with vermouth and sherry modifiers. |
| 19 | innocent-ruler *Whole World* ↔ magician-lover *Undimmed* | London dry 45, dry vermouth 15, lemon peel; thrown | vodka 60, dry vermouth 5, grated lemon zest; poured from the freezer | **Different:** gin to vodka, the rule's own example. |
| 20 | explorer-magician *Just Knew* ↔ innocent-ruler *Whole World* (0.88) / creator-caregiver *Quite Alive* (0.87) | gin 45, Campari 22.5, sweet vermouth 15, dry vermouth 15, bay leaf, orange peel; on ice | as in 19 / 16 | **Different:** a Negroni. Campari is a modifier. |
| 21 | innocent-sage *Just So You Know* ↔ lover-regular-guy *Any Day* | bourbon 60, lemon 20, sugar 11 g pressed into the lemon shell; shaken, up (a Whiskey Sour) | Elijah Craig 60, lemon 22.5, 3:1 honey syrup 15; one cube (the Gold Rush) | **Different:** honey for the sugar, and the guest is told a different classic's name (D12's test). Thin, see T5. |
| 22 | innocent-sage *Just So You Know* ↔ ruler-creator *On Their Behalf* (0.94) | as in 21 | bourbon 50, lemon 22.5, simple 15, orange curaçao 7.5, dry vermouth 10, soda 15 (a Daisy) | **Different:** curaçao and vermouth are modifiers. |
| 23 | innocent-sage *Just So You Know* ↔ ruler-hero *A Place Kept* | as in 21 | Jim Beam 60, lemon 22.5, simple 20, a red wine float 15 (a New York Sour) | **Different:** the wine float is a modifier in the glass. |
| 24 | caregiver-outlaw *Not Too Polite* ↔ sage-caregiver *Further Than Me* (0.89) | London dry 60, lemon 30, jaggery syrup 25, soda 50, orange peel (Tom Collins, jaggery for the sugar) | London dry 60, lemon 30, simple 22.5, 6 mint + 8 tarragon leaves shaken in, soda 60 (a long Southside) | **Different:** mint and tarragon against jaggery. Both are sparks, and the Southside is its own classic. |
| 25 | caregiver-outlaw *Not Too Polite* ↔ magician-creator *On One Condition* | as in 24 | gin 30 + vodka 30, lemon 30, rosemary syrup 20, Cointreau 5, Angostura, soda 60 | **Different:** a split base and modifiers. |
| 26 | creator-regular-guy *As It Was* ↔ explorer-lover *Straight Back* (0.97) | gin 60, lemon 22.5, simple 15, maraschino 5, crème de violette 5; up (Aviation riff) | gin 60, lemon 22.5, simple 15, crème de mûre 15 + balsamic 2.5 poured over; crushed ice (a Bramble) | **Different:** different modifiers make two different classics. |
| 27 | creator-regular-guy *As It Was* ↔ sage-caregiver *Further Than Me* (0.95) | as in 26 | as in 24 | **Different:** maraschino and violette against mint, tarragon and soda. |
| 28 | creator-jester *The Other Berry* ↔ hero-sage *Leave It With Me* (0.93) | white rum 60, lime 22.5, cherry-tomato-vanilla syrup 20 | white rum 300, lime 100, sugar 50 g, makrut leaves; pitcher for six | **Different:** a tomato spark against a makrut spark. |
| 29 | jester-innocent *Off the Tour* ↔ *The Other Berry* (0.91) / *Leave It With Me* (0.93) | white rum 60, lime 25, simple 20, tangerine absinthe 5, Angostura 4 ml; swizzled (a Green Swizzle) | as in 28 | **Different:** absinthe and bitters are modifiers. |
| 30 | ruler-explorer *Not the Same* ↔ ruler-jester *Who's In?* (0.83) | vodka 60, lemon 22.5, simple 22.5, apricot eau-de-vie rinse, sugar rim (a Lemon Drop) | vodka 60, lime 20, raspberry-cumin syrup 15, mint left in, crushed ice | **Different:** a rinse spark against a raspberry-cumin spark. |
| 31 | regular-guy-explorer *Loose on Top* ↔ explorer-creator *For Good* (0.82) | Sauza blanco 60, Giffard triple sec 22.5, lime 22.5, simple 7.5, grapefruit oil on top; shaken, up | blanco 240, Cointreau 120, simple 90, water 450, vanilla extract 2.5, lime 150; frozen, about four glasses | **Different:** the vanilla is a spark in the glass, though thin. Frozen is service and doesn't count. See T4. |
| 32 | creator-innocent *Half a Rim* ↔ regular-guy-explorer *Loose on Top* (0.89) | blanco 60, lime 22.5, agave 10, water 10, half salt rim, one block (a Tommy's) | as in 31 | **Different:** agave nectar replaces the orange liqueur, a different template (a Daiquiri, not a Sidecar). |
| 33 | caregiver-explorer *Serviceable* ↔ sage-ruler *Note to Self* | hop-steeped blended scotch 50, soda 125, lemon peel left in | unpeated Highland single malt 50, vanilla extract ⅛ tsp, soda 100 | **Different:** a hop spark against a vanilla spark. Thin, see T3. (innocent-magician *Let's Try It*: Lark 45, still water 110, a Glenfarclas float 10. The split base and still water make it a different drink from both.) |
| 34 | explorer-outlaw *Fine by Me* ↔ innocent-outlaw *Fresh Air* (0.89) | bacon-washed bourbon 45, maple 7.5, Angostura, dry cider 135 | aged rum 45, still dry cider 120 (a Stone Fence) | **Different:** whiskey to rum, plus the wash, maple and bitters. |

**The other signals neighbours are different templates that the cosine pulled together on shared ingredients**, all different:
- Kir Royale with basil ↔ Seelbach (*Before the Room* ↔ *No Accident*, 0.93) and ↔ French 75 (*Just This Once*, 0.80).
- Margarita ↔ Tommy's (*Half a Rim* ↔ *For Good*).
- Martini ↔ sour (*In a Minute* ↔ *Leave It With Me*).
- Split-core highball ↔ Manhattan (*Next One's Mine* ↔ *Up Close*).
- Ward Eight Collins ↔ sour and Daisy (*The Long Answer* ↔ *Just So You Know*, *On Their Behalf*).
- Floridita ↔ daiquiris (*Day Job* ↔ *Off the Tour*, *Leave It With Me*).
- Sour ↔ Old-Fashioned or Julep (*Just So You Know* ↔ *What It Rests On*, *In Kind*).
- Dry-vermouth bourbon Martini ↔ Old-Fashioned, Julep and sour (*Against My Better Judgement* ↔ *What It Rests On*, *In Kind*, *Just So You Know*).
- Cold toddy ↔ brandy Old-Fashioned and brandy Manhattan (*Hoping You'd Come* ↔ *Worth the Trade*, *Go On*).
- Jasmine ↔ Southside, Bramble and Aviation (*Only Half Joking* ↔ *Further Than Me*, *Straight Back*, *As It Was*).
- Tom Collins ↔ Aviation and Bramble (*Not Too Polite* ↔ *As It Was*, *Straight Back*).
- Freezer vodka Martini ↔ vodka sours (*Undimmed* ↔ *Who's In?*, *Not the Same*).
- Improved rye cocktail ↔ rye Manhattans (*Beside the First* ↔ *Up Close*, *Accomplices*).
- Bronx ↔ Negroni and dry Martini (*Anyway* ↔ *Just Knew*, *Whole World*).
- Grog ↔ arrack punch (*Fair Measure* ↔ *Built to Hold*: navy rum and lime with a sherry-vinegar demerara syrup, against arrack with a Seville-orange shrub; no vinegar in the shrub).

## Thinnest calls (for Robin, only if "a spark in the glass" should be narrower)

If Robin reads a flavoured sugar or a trace of seasoning as *not* enough, so that only a modifier or a split base counts, these pairs would become the same cocktail. For each, I give the pour I'd move and the smallest change. **None is swept or applied.**

- **T1. The three scotch Old-Fashioneds** (*Standing By*, *Either Way*, *Far Enough*): each differs from the others only by its sugar. Each story is tied to scotch, so two would move.
  - *Standing By* stays: it's the 1874 letter's four things.
  - *Either Way* would move to a split base: single malt 30 + single grain 30 instead of 60 of blend. That puts "the two whiskies that argument was about" in the glass as two measures.
  - *Far Enough* would need a room.
- **T2. *Nothing to It* ↔ *What It Rests On*:** the closest pair. *What It Rests On* would move, because its spark comes off the same *Matrix* Caramel chart (pdf 73), and the caramel is *Nothing to It*'s closing line. The smallest change I'd test is a split base (bourbon 45 + corn whiskey 15). A room would have to square that with y4's "none of it shows".
- **T3. *Serviceable* ↔ *Note to Self*:** *Note to Self* would move. Its ⅛ tsp of vanilla (about 0.6 ml in 150 ml) is the thinner seasoning, and the hop steep is substantial (4 g in 250 ml). It needs a room: its story gives every step a reason, so I can't bolt something on.
- **T4. *Loose on Top* ↔ *For Good*:** both stories need a Margarita (Estes's; Martinez's machine). *For Good* would move, since frozen is only service and its vanilla is about 0.6 ml a glass. It needs a room.
- **T5. *Just So You Know* ↔ *Any Day*:** I'd keep these apart even under the narrow reading. The Gold Rush is its own named classic (*A Proper Drink* p. 96), and the guest is told so.

Under the narrow reading, at most 5 pours would move (two in T1, one each in T2-T4).
