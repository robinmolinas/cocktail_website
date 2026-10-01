def calc(name, items, formula="shaken"):
    vol=sum(i[1] for i in items); eth=sum(i[1]*i[2]/100 for i in items)
    sug=sum(i[1]*i[3]/100 for i in items); acid=sum(i[1]*i[4]/100 for i in items)
    A=eth/vol
    d=-1.567*A*A+1.742*A+0.203
    fv=vol*(1+d)
    print(f"{name:42s} vol {vol:6.1f} init {A*100:5.1f}% | dil {d*100:4.0f}% fin {eth/fv*100:5.1f}% sug {sug/fv*100:5.2f} g acid {acid/fv*100:4.2f}% | final {fv:5.0f} ml")
# key: (name, ml, abv, sugar g/100ml, acid g/100ml)
lime=("lime",22.5,0,1.6,6.0)
def dons(ml): return ("dons",ml,0,(2*10.4+61.5)/3,(2*2.4)/3)
gren=("grenadine",5,0,60,0)
pern=("pernod",0.3,40,0,0); ango=("ango",0.8,44.7,4.2,0)
velvet=("velvet",15,11,30,0.3)   # unsourced guess
for fsug,fabv in [(30,11),(45,10),(55,10)]:
  fal=("fal",15,fabv,fsug,0.2)
  calc(f"Oxford Zombie, falernum {fsug}g/{fabv}%",[lime,fal,("pr",45,40,0,0),("jam",45,40,0,0),("lh151",30,75.5,0,0),gren,pern,ango,dons(15)])
for fsug,fabv in [(30,11),(55,10)]:
  fal=("fal",15,fabv,fsug,0.2)
  calc(f"Codex Zombie Punch, fal {fsug}g",[lime,fal,("jam",37.5,43,0,0),("es",37.5,40,0,0),("h151",22.5,75.5,0,0),gren,("pern",1.6,68,0,0),dons(15)])
# v0 sketches: no grenadine, homemade falernum ~55g/10%, 
for fal_ml in [15,20]:
 for rums in [(45,45,30),(37.5,37.5,22.5),(30,30,15)]:
  fal=("fal",fal_ml,10,55,0.2)
  calc(f"v0 fal{fal_ml} rums {rums} no gren",[lime,fal,("pr",rums[0],40,0,0),("jam",rums[1],43,0,0),("151",rums[2],75.5,0,0),pern,ango,dons(15)])
for dm in [15,22.5,30]:
  fal=("fal",15,10,55,0.2)
  calc(f"v0 dons {dm} rums 37.5/37.5/22.5",[lime,fal,("pr",37.5,40,0,0),("jam",37.5,43,0,0),("151",22.5,75.5,0,0),pern,ango,dons(dm)])
print("--- keep Oxford rums, raise the rest")
for l,dm,fm,g in [(30,22.5,20,5),(30,30,22.5,5),(37.5,30,22.5,5),(30,22.5,22.5,0)]:
  calc(f"Ox rums lime{l} dons{dm} fal{fm} gren{g}",[("lime",l,0,1.6,6),("fal",fm,10,55,0.2),("pr",45,40,0,0),("jam",45,43,0,0),("151",30,75.5,0,0),("g",g,0,60,0),pern,ango,dons(dm)])
print("--- 30/30/15 rums, no grenadine")
for fm in [15,20]:
  calc(f"30/30/15 fal{fm} no gren",[lime,("fal",fm,10,55,0.2),("pr",30,40,0,0),("jam",30,43,0,0),("151",15,75.5,0,0),pern,ango,dons(15)])
