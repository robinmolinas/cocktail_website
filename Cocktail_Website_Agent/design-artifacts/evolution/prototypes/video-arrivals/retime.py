# Build an output->source time map with eased arrivals (and optional eased departures),
# then resample the 120fps motion-interpolated intermediate at 30fps output.
import sys, os, subprocess, json, numpy as np
src, out, a, b = sys.argv[1], sys.argv[2], float(sys.argv[3]), float(sys.argv[4])
FF='/opt/homebrew/bin/ffmpeg'
W,H=1920,1080; FS=W*H*3//2; MIFPS=120; SRC_END=float(os.environ.get('SRC_END','14.9666667'))
HOLDS_DEFAULT=[('DEPTHS',0.6),('SEED',1.5),('GRAVITY',3.1),('HIDDEN',5.7),('RESONANCE',8.2),('FINISH',9.4),('TRACE',10.7),('BREATH',11.9)]
import os
HOLDS=json.loads(os.environ['HOLDS']) if os.environ.get('HOLDS') else HOLDS_DEFAULT
SURF=float(os.environ.get('SURF','12.95'))
NO_DEPART={'BREATH'}  # the splash timing after the breath is choreographed against 1x footage
ss=lambda u: 3*u*u-2*u**3
iss=lambda u: u**3-u**4/2         # integral of smoothstep from 0..u
# segments: list of (out_start, out_dur, src_start, kind) kind: 'lin' | 'out' (decel to 0) | 'in' (accel from 0)
segs=[]; T=0.0; Ssrc=0.0
def lin(to):
    global T,Ssrc
    if to>Ssrc+1e-9: segs.append((T,to-Ssrc,Ssrc,'lin',to-Ssrc)); T+=to-Ssrc; Ssrc=to
newholds={}
for name,h in HOLDS:
    lin(h-a)
    dur=2*a; dur+=round((T+dur)*30)/30-(T+dur)   # land the hold on an exact output frame
    segs.append((T,dur,Ssrc,'out',h-Ssrc)); T+=dur; Ssrc=h
    newholds[name]=round(T,6)
    if b>0 and name not in NO_DEPART:
        segs.append((T,2*b,Ssrc,'in',b)); T+=2*b; Ssrc=h+b
lin(SRC_END)
newholds['SURFACE_CUT']=round(SURF+(newholds['BREATH']-HOLDS[-1][1]),6)
total=T
def S(t):
    for (t0,dur,s0,k,span) in segs:
        if t<=t0+dur+1e-12:
            u=min(1,max(0,(t-t0)/dur))
            if k=='lin': return s0+u*span
            if k=='out': return s0+2*span*(u-iss(u))     # v = 1-ss(u): 1 -> 0, zero accel at both ends
            if k=='in':  return s0+2*span*iss(u)         # v = ss(u): 0 -> 1
    return SRC_END
n_out=int(round(total*30))
idx=[min(S(i/30)*MIFPS, SRC_END*MIFPS) for i in range(n_out)]
kf=','.join(f'{v:.6f}' for v in newholds.values())
json.dump({'a':a,'b':b,'duration':n_out/30,'holds':newholds,'map':[round(x/MIFPS,5) for x in idx]},open(out+'.json','w'),indent=1)
dec=subprocess.Popen([FF,'-v','error','-i',src,'-f','rawvideo','-pix_fmt','yuv420p','-'],stdout=subprocess.PIPE)
enc=subprocess.Popen([FF,'-v','error','-y','-f','rawvideo','-pix_fmt','yuv420p','-color_range','tv','-colorspace','bt709','-s',f'{W}x{H}','-r','30','-i','-',
   '-c:v','libx264','-preset','slow','-crf',sys.argv[5] if len(sys.argv)>5 else '21','-pix_fmt','yuv420p','-profile:v','high',
   '-color_range','tv','-colorspace','bt709','-color_primaries','bt709','-color_trc','bt709','-force_key_frames',kf,'-g','90','-movflags','+faststart',out],stdin=subprocess.PIPE)
cur=-1; buf={}
def get(j):
    global cur
    while cur<j:
        fr=dec.stdout.read(FS)
        if len(fr)<FS: break
        cur+=1; buf[cur]=np.frombuffer(fr,np.uint8)
        for k in [k for k in buf if k<cur-2]: del buf[k]
    return buf[min(j,cur)]
for x in idx:
    j=int(np.floor(x)); f=x-j
    A=get(j)
    if f<1e-3: o=A
    else:
        B=get(j+1); o=(A.astype(np.float32)*(1-f)+B.astype(np.float32)*f+0.5).astype(np.uint8)
    enc.stdin.write(o.tobytes())
enc.stdin.close(); enc.wait(); dec.kill()
print(json.dumps({'duration':n_out/30,'holds':newholds}))
