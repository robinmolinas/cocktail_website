import re,os
r=open('psychologist-reading-v4.md').read()
who=r.split('## whoYouAre')[1].split('## yours')[0].strip()
yours=r.split('## yours')[1].split('## Notes (audit table; not guest text)')[0].strip()
paras=[x.strip() for x in yours.split('\n\n') if x.strip()]
if not paras[0][:2].rstrip('.').isdigit(): yours='\n\n'.join('%d. %s'%(i+1,x) for i,x in enumerate(paras))
title=r.split('## Title block')[1].split('## whoYouAre')[0].strip()
anch=open('historian-anchors.md').read()
lines=anch.splitlines(); i=next(k for k,l in enumerate(lines) if l.startswith('| kind'))
tbl=[]
for l in lines[i:]:
    if not l.startswith('|'): break
    tbl.append(l)
table='\n'.join(tbl)
dossier_only=anch.split('## Dossier only (never in guest text)')[1].strip()
card=open('../../fact-cards/tommys-margarita.md').read()
card_leg=card.split('## Legends / cautions')[1].split('## Conflicts')[0].strip()
card_conf=card.split('## Conflicts')[1].strip()
card_conf=re.split(r'^## ',card_conf,flags=re.M)[0].strip()
d=open('mixologist-draft.md').read()
rec=d.split('## Recipe (for the pour)')[1].split('## Method')[0]
recipe='\n'.join(l for l in rec.splitlines() if l.startswith('|'))
extras='\n\n'.join(p.strip() for p in rec.split('\n\n') if p.strip().startswith('**'))
m=d.split('## Method (v1.1; Wren to read)')[1]
method=m.split('**Salt:**')[0].strip()
closing=re.search(r'\*\*closingLine[^*]*\*\* (\*.*?\*)',d).group(1)
checks=d.split('## Checks (for the dossier)')[1].split('## Image brief')[0].strip()
brief=d.split('## Image brief (draft)')[1].strip()
res=re.sub(r'^## ','#### ',open('psychologist-resonance-v1.md').read().split('\n',1)[1].strip(),flags=re.M)
res=re.sub(r'^### ','#### ',res,flags=re.M)
auditf=sorted(f for f in os.listdir('.') if f.startswith('historian-audit-v'))[-1]
audit=re.sub(r'^##+ ','#### ',open(auditf).read().split('\n',1)[1].strip(),flags=re.M)
out=open('_host/template.md').read().format(**locals())
open('_host/provisional.md','w').write(out); print('audit',auditf)
