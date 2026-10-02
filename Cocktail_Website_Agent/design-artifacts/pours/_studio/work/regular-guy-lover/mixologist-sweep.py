import json, subprocess, sys
S="skills/dps-tools/scripts/balance.py"; W=sys.argv[1]
def run(name, ings, style="stirred"):
    spec={"pairing":name,"style":style,"ingredients":ings}
    p=f"{W}/mixologist-tmp.json"; json.dump(spec,open(p,"w"))
    r=json.loads(subprocess.run(["python3",S,p,"--json"],capture_output=True,text=True).stdout)
    return r
def base(rum=45, verm=45, rich=5, lemon=10, soy=3, rum46=False, lemongrass=False):
    r=[{"key":"rum_aged","ml":29.1},{"key":"rum_navy","ml":15.9}] if rum46 else [{"key":"rum_aged","ml":rum}]
    r+= [{"key":"sweet_vermouth","ml":verm},{"key":"lemongrass_syrup" if lemongrass else "rich_syrup","ml":rich},{"key":"lemon_juice","ml":lemon},{"key":"orange_bitters","dashes":1}]
    if soy: r.append({"key":"soy_sauce","drops":soy})
    return r
first=True
for lab,kw in [("v1 45/45 rich5 lemon10",{}),("lemon 7.5",{"lemon":7.5}),("lemon 12.5",{"lemon":12.5}),("lemon 15",{"lemon":15}),("rich 3.75",{"rich":3.75}),("rich 7.5",{"rich":7.5}),("rum 46%",{"rum46":True}),("rum46 lemon12.5",{"rum46":True,"lemon":12.5}),("no soy",{"soy":0}),("lemongrass 1:1 7.5",{"lemongrass":True,"rich":7.5,"soy":0}),("oxford 60/60 lemon15",{"rum":60,"verm":60,"lemon":15})]:
    r=run(lab,base(**kw))
    if first: print(json.dumps(r)[:1500]); first=False
