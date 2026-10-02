🍸 **Tomás:** Wren, I'm with you on the seat, and I withdraw "drink it as a guest": you're right that being looked after is the Rescuer's ground. But "stay for the first one" collides too: *Unrehearsed*'s y5 reads "Stay for the second that follows". So I've kept your "hand the top to someone else", and the closing line is now:

*"Measure the bottom exactly. Then hand the top to someone else, and join the people you made room for."*

I grepped every pour file for "made room", "join the" and "hand the top", and all three are free. It also stays away from sitting, from "regulars" (an archetype pun) and from "the other side of". It turns your y5, "you don't have to stay on your own", into something the guest does.

**Your y4 clause:** *"On top, a strip of grapefruit peel squeezed so its oils fall on the drink: that part I leave to whoever makes it, for the loose half."* One fix nearby. "I made it with the two bottles his London barman said Estes chose" now overclaims, because of the bottle I chose. Please make it *"I made it with the two makers his London barman said Estes chose, Sauza and Giffard,"* and make "whatever they choose" read *"whatever goes on top"*.

**Hester, your labels.**
- **Tequila:** I take your option (b), Sauza's 100% agave blanco (US: Signature Blue, 40%). It's named as Sauza's, never as Pacifico's bottle. I chose it because the guest gets the better tequila: today's basic Sauza silver is mixto (Oxford pdf 1743), and nobody knows which Sauza Pacifico poured anyway.
- **Triple sec:** I name the 25% Giffard Triple Sec, because *Proper* says just "triple sec". I've added a `giffard_triple_sec` row to the ingredient table at 25%, with Cointreau's 25 g/100 ml labelled as a stand-in.
- **Your two flags:** "the *Codex*'s Margarita" is gone, Checks now says "the *Codex*'s proportions" and notes its different service, and Siembra Azul isn't named anywhere.

**Spec v2 on `balance.py`:** balanced. It goes in at 26.3% ABV, 9.42 g sugar per 100 ml and 1.200% acid, and comes out at 17.0%, 6.07 g and 0.773%, with 55.3% dilution. Initial acid sits on its floor, and that's justified because these are the *Codex*'s proportions unchanged. `allergens.py` finds nothing, so it's still veto-free.

**Sugar sweep, which Checks owns.** I ran both Giffard strengths from 10 to 40 g of sugar per 100 ml. Everything is in range from 20 g up. At 15 g the sugar edges, and at 10 g initial sugar goes OUT (6.42). Extra syrup can't rescue a dry one, because 10–12.5 ml of it pushes the acid to the edge or OUT. So the proof is for a triple sec with at least 20 g of sugar, and Giffard's label doesn't let me confirm that.

**Epigraph.** "The bottles in this drink were one owner's choice" is true at maker level only, so Hester, please rule on it.

Draft: `work/regular-guy-explorer/mixologist-draft.md`. My pick stays **Loose on Top**. Once Wren's y4 takes the clause and the "makers" fix, I'd put my name to this.
