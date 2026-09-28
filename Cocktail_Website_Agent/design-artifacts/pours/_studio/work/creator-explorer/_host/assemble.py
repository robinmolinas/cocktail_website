import re,os
r=open('psychologist-reading-v4.md').read()
who=r.split('## whoYouAre')[1].split('## yours')[0].strip()
yours=r.split('## yours')[1].split('## Notes (never shipped)')[0].strip()
anch=open('historian-anchors.md').read()
lines=anch.splitlines(); i=next(k for k,l in enumerate(lines) if l.startswith('| kind'))
tbl=[]
for l in lines[i:]:
    if not l.startswith('|'): break
    tbl.append(l)
table='\n'.join(tbl)
dossier_only=anch.split('## Dossier only (never in guest text)')[1].strip()
card=open('../../fact-cards/angostura-trinidad-sour.md').read()
def sec(t,h):
    m=re.search(r'^## '+h+r'.*?$(.*?)(?=^## |\Z)',t,re.S|re.M); return m.group(1).strip() if m else ''
card_leg=sec(card,'Legends'); card_conf=sec(card,'Conflicts')
d=open('mixologist-draft.md').read()
rec=d.split('## Recipe (for the pour)')[1].split('## Method')[0]
recipe='\n'.join(l for l in rec.splitlines() if l.startswith('|'))
syrup=re.search(r'(\*\*Lemongrass syrup\*\*.*)',rec).group(1).strip()
method=d.split('## Method (draft; Wren to read)')[1].split('**closingLine')[0].strip()
closing=re.search(r'\*\*closingLine[^*]*\*\* (\*.*?\*)',d).group(1)
checks=d.split('## Checks (for the dossier)')[1].split('## Image brief')[0].strip()
brief=d.split('## Image brief (draft)')[1].strip()
res=re.sub(r'^## ','#### ',open('psychologist-resonance-v1.md').read().split('\n',1)[1].strip(),flags=re.M)
auditf=sorted(f for f in os.listdir('.') if f.startswith('historian-audit-v'))[-1]
audit=re.sub(r'^## ','#### ',open(auditf).read().split('\n',1)[1].strip(),flags=re.M)
title=r.split('## Title block')[1].split('## whoYouAre')[0].strip()
out=open('_host/template.md').read().format(**locals())
open('_host/provisional.md','w').write(out); print('audit',auditf, 'legends' if card_leg else 'NO LEGENDS', 'conf' if card_conf else 'NO CONF')
