# Tomás r2 sweep: built Caipirinha on cracked ice, judged on Arnold's shaken (sours) ranges.
def calc(cach_ml, abv, lime_ml, sugar_g, dil=None):
    eth = cach_ml*abv/100
    sug = sugar_g + lime_ml*1.6/100
    acid = lime_ml*6.0/100
    vol = cach_ml + lime_ml + sugar_g*0.63
    a0 = eth/vol
    d = dil if dil is not None else (-1.567*a0*a0 + 1.742*a0 + 0.203)
    fv = vol*(1+d)
    return dict(abv=eth/fv*100, sugar=sug/fv*100, acid=acid/fv*100, dil=d, vol=fv)
R = dict(abv=(15.0,19.7), sugar=(5.0,8.9), acid=(0.76,0.94))
def mark(k,v):
    lo,hi=R[k]; return "ok" if lo<=v<=hi else ("LOW" if v<lo else "HIGH")
def show(tag,**kw):
    r=calc(**kw)
    print("%-38s abv %5.1f %-4s sugar %5.2f %-4s acid %5.3f %-4s dil %3.0f%% vol %4.0f" % (tag, r['abv'],mark('abv',r['abv']), r['sugar'],mark('sugar',r['sugar']), r['acid'],mark('acid',r['acid']), r['dil']*100, r['vol']))
print("== main candidate: 60 ml cachaça 40%, lime ~22.5 ml from 6/8 lime, 10 g sugar (2 heaped tsp)")
show("v1 main", cach_ml=60, abv=40, lime_ml=22.5, sugar_g=10)
print("== lime yield sweep (muddled extraction unsourced)")
for l in (15,17.5,20,22.5,25,27.5,30): show("lime %.1f, sugar 10"%l, cach_ml=60, abv=40, lime_ml=l, sugar_g=10)
print("== sugar sweep at lime 22.5")
for s in (6,8,10,12,14,17.8): show("sugar %.1f"%s, cach_ml=60, abv=40, lime_ml=22.5, sugar_g=s)
print("== strength sweep (Codex p.112: 38-48%)")
for a in (38,40,42,45,48): show("abv %d"%a, cach_ml=60, abv=a, lime_ml=22.5, sugar_g=10)
print("== corners")
for a in (38,48):
  for l in (17.5,27.5):
    for s in (8,12): show("abv %d lime %.1f sug %d"%(a,l,s), cach_ml=60, abv=a, lime_ml=l, sugar_g=s)
print("== melt in the glass (crushed ice keeps melting as it's drunk)")
for d in (0.40,0.50,0.60,0.70,0.80): show("dilution fixed %.0f%%"%(d*100), cach_ml=60, abv=40, lime_ml=22.5, sugar_g=10, dil=d)
print("== book versions for reference")
show("Codex p137 (6/8 lime~22.5, 3/4oz simple+cube)", cach_ml=60, abv=40, lime_ml=22.5, sugar_g=22.5*0.615+4)
show("Joy pdf263 (90 ml, 1 tbsp 12.5 g, ~25 ml)", cach_ml=90, abv=40, lime_ml=25, sugar_g=12.5)
