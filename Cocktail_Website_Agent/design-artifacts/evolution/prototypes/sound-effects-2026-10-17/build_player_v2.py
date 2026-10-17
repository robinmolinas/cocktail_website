"""Listening page for the gesture sounds: five real moments of the journey,
each as music only, the first pass and the second pass, mixed the way the app
mixes them (the bed through the hold's low-pass and level, the gestures at
their runtime gains, pitches, pans and ink softening, master 0.7).

The first pass is rendered as it behaves in the app: its choice retuned to the
chord root, ink at most once per 1.6 s, and a sound cut short when the stage
changes. Run after render_v2.py:
    uv run --with numpy --with scipy python -I build_player_v2.py
Writes assets/scenes/*.mp3 and index.html (opens from disk).
"""
from pathlib import Path
import json
import subprocess

import numpy as np
from scipy.signal import lfilter, resample

HERE = Path(__file__).resolve().parent
APP = HERE.parents[2].parent / 'dionysus-experience'
SR = 44100
MASTER = 0.7
V2 = json.loads((HERE / 'manifest-v2.json').read_text())['effects']
GAIN2 = {k: v['runtimeGain'] for k, v in V2.items()}

CHORDS = {  # cues.ts
    'question': [(0, 'G#'), (0.55, 'A#'), (8.55, 'G#'), (16.55, 'A#'), (24.55, 'G#')],
    'world': [(0, 'B'), (8.0, 'A#'), (16.0, 'G#')],
}
LADDER = {'G#': [0, 5, 7, 12], 'A#': [0, 5, 7, 12], 'B': [0, 3, 8, 12], 'C': [0, 4, 7, 12]}
INK_FIGURE = [0, 1, 0, 0, 1, 0, 1, 1]
V1_SEMI = {'G#': 0, 'A#': 2, 'B': 3, 'C': 4}


def decode(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(path), '-f', 'f32le', '-ac', '2', '-ar', str(SR), '-'],
                         check=True, capture_output=True).stdout
    return np.frombuffer(raw, dtype=np.float32).reshape(-1, 2).astype(np.float64)


def lowpass(x, fc, q=0.5):
    w0 = 2 * np.pi * fc / SR; al = np.sin(w0) / (2 * q); c = np.cos(w0)
    b = np.array([(1 - c) / 2, 1 - c, (1 - c) / 2]); a = np.array([1 + al, -2 * c, 1 - al])
    return lfilter(b / a[0], a / a[0], x, axis=0)


def root_at(cue, pos):
    r = 'G#'
    for t, rr in CHORDS.get(cue, []):
        if pos >= t: r = rr
    return r


def pitched(x, semis):
    if semis == 0: return x
    rate = 2 ** (semis / 12)
    return resample(x, int(round(len(x) / rate)), axis=0)


def pan(x, p):
    """Web Audio StereoPannerNode on a stereo input"""
    if p == 0: return x
    l, r = x[:, 0], x[:, 1]
    if p < 0:
        a = (p + 1) * np.pi / 2
        return np.stack([l + r * np.cos(a), r * np.sin(a)], axis=1)
    a = p * np.pi / 2
    return np.stack([l * np.cos(a), r + l * np.sin(a)], axis=1)


def add(buf, x, at, cut=None):
    i = int(at * SR)
    if cut is not None:                       # the first pass stops a sound at the stage change (35 ms)
        n = max(0, int((cut - at) * SR))
        x = x[:n + int(0.035 * SR)].copy()
        if len(x) > n: x[n:] *= np.linspace(1, 0, len(x) - n)[:, None]
    j = min(len(buf), i + len(x))
    buf[i:j] += x[:j - i]


# The five moments. Each gesture: (time, id, x, step). 'cut' = the stage
# change after it, in seconds (the first pass stops the sound there).
SCENES = [
    dict(key='name', title='Your name', cue='01-pressure', cueId='pressure', start=8, dur=7.5, level=0.85, fc=6500,
         note='Typing a name, then Enter. The first pass sounds only the first letter and cuts the seal at its loudest point, 0.82 s in, when the next question arrives.',
         ink=[1.2, 1.41, 1.58, 1.82, 2.01], seal=(3.0, 3.82), gestures=[]),
    dict(key='pairs', title='Quick pairs (H4)', cue='04-question', cueId='question', start=0.5, dur=11.5, level=0.95, fc=9000,
         note='Four quick choices, left and right. The first pass retunes each one to the chord, so the note jumps when the harmony turns. The new pass keeps her note, D#, which every chord holds, and leans a little to the side she tapped.',
         gestures=[(1.5, 'touch', 0.3, 0), (4.0, 'touch', 0.7, 0), (6.5, 'touch', 0.3, 0), (9.0, 'touch', 0.7, 0)]),
    dict(key='gather', title='Gathering words (H5)', cue='05-world', cueId='world', start=0.3, dur=12.5, level=1.0, fc=11000,
         note='Three words gathered, one taken back, another gathered. In the new pass each gathered word climbs a tone of the chord sounding, so you hear the world filling up. Taking one back sinks.',
         gestures=[(1.5, 'touch', 0.35, 0), (3.6, 'touch', 0.62, 1), (5.7, 'touch', 0.48, 2), (8.0, 'untouch', 0.62, 0), (9.6, 'touch', 0.7, 2)]),
    dict(key='flavours', title='Flavours, then leaving out (H6)', cue='05-world', cueId='world', start=16.5, dur=13.0, level=0.9, fc=10000,
         note='Two flavours, sealed; then two left out, sealed. The first pass uses one sound for choosing, sealing and leaving out, and the final seal is cut by the next stage.',
         gestures=[(1.2, 'touch', 0.4, 0), (2.6, 'touch', 0.6, 1), (4.2, 'seal', None, 0), (6.5, 'untouch', 0.35, 0), (7.6, 'untouch', 0.65, 0)],
         seal=(9.0, 10.1)),
    dict(key='trace', title='Writing the sentence (H7)', cue='02-firstlight', cueId='firstlight', start=8, dur=11.0, level=0.42, fc=2800,
         note='A sentence typed in the hush, then sealed. The first pass brushes once every 1.6 s whatever she types. The new pass answers every stroke, softer as she speeds up, fuller after each pause.',
         text='the summer my grandmother kept figs', seal=(7.4, 8.55), gestures=[]),
]


def strokes(text, t0):
    rng = np.random.default_rng(3)
    t, out = t0, []
    for ch in text:
        out.append(t)
        t += (0.28 if ch == ' ' else 0.11) + rng.uniform(-0.03, 0.05)
    return out


def render(sc, version, sounds):
    n = int(sc['dur'] * SR)
    bed = decode(APP / f'public/audio/score/{sc["cue"]}.mp3')[int(sc['start'] * SR):][:n]
    fx = np.zeros((n + 6 * SR, 2))
    post = np.zeros_like(fx)                    # the first pass bypassed the depth filter and the scene level
    ink_times = sc.get('ink') or (strokes(sc['text'], 1.0) if sc.get('text') else [])
    if version == 'v2':
        energy, last, k = 0.0, -1e9, 0
        for t in ink_times:
            e = energy * np.exp(-(t - last) / 0.7)
            lvl = 1 / (1 + 0.45 * e); energy, last = e + 1, t
            root = root_at(sc['cueId'], sc['start'] + t)
            x = pitched(sounds['ink'], LADDER[root][INK_FIGURE[k % 8]]) * GAIN2['ink'] * lvl
            add(fx, x, t); k += 1
        for t, gid, x, step in sc['gestures']:
            root = root_at(sc['cueId'], sc['start'] + t)
            semis = LADDER[root][min(step, 3)] if gid == 'touch' else 0
            y = pan(pitched(sounds[gid], semis), 0 if x is None else max(-0.3, min(0.3, (x - 0.5) * 0.6)))
            add(fx, y * GAIN2[gid], t)
        if sc.get('seal'):
            add(fx, sounds['seal'] * GAIN2['seal'], sc['seal'][0])
    elif version == 'v1':
        G1 = {'choice': (0.35, 4600), 'ink': (0.18, 7400), 'release': (0.28, 3400)}
        v1 = {k: lowpass(v, G1[k][1]) * G1[k][0] for k, v in sounds.items()}
        lastink = -1e9
        for t in ink_times:
            if t - lastink >= 1.6: add(post, v1['ink'], t); lastink = t
        prev = -1e9
        for t, gid, x, step in sc['gestures']:
            if t - prev < 0.25: continue
            prev = t
            if gid == 'touch':
                add(post, pitched(v1['choice'], V1_SEMI[root_at(sc['cueId'], sc['start'] + t)]), t)
            else:                                # seal and untouch were one sound
                add(post, v1['release'], t)
        if sc.get('seal'):
            add(post, v1['release'], sc['seal'][0], cut=sc['seal'][1])
    mix = lowpass(np.pad(bed, ((0, len(fx) - len(bed)), (0, 0))) + fx, sc['fc']) * sc['level'] + post
    mix = mix[:n] * MASTER
    k = int(0.4 * SR); mix[:k] *= np.linspace(0, 1, k)[:, None]
    k = int(1.0 * SR); mix[-k:] *= np.linspace(1, 0, k)[:, None]
    return mix


def encode(x, path):
    subprocess.run(['ffmpeg', '-v', 'error', '-nostdin', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '2', '-i', '-',
                    '-map_metadata', '-1', '-c:a', 'libmp3lame', '-b:a', '160k', str(path)],
                   input=np.ascontiguousarray(x, dtype=np.float32).tobytes(), check=True)


def main():
    out = HERE / 'assets' / 'scenes'
    out.mkdir(parents=True, exist_ok=True)
    s1 = {k: decode(HERE / 'assets' / f'{k}.mp3') for k in ('choice', 'ink', 'release')}
    s2 = {k: decode(HERE / 'assets' / 'v2' / f'{k}.mp3') for k in ('touch', 'untouch', 'seal', 'ink')}
    sections = []
    for sc in SCENES:
        for version, sounds in (('music', s2), ('v1', s1), ('v2', s2)):
            mix = render(sc, version, sounds)
            peak = 20 * np.log10(np.abs(mix).max())
            assert peak < -1, (sc['key'], version, peak)
            encode(mix, out / f'{sc["key"]}-{version}.mp3')
        sections.append(f'''<section><h2>{sc["title"]}</h2><p>{sc["note"]}</p>
      <div class="players">
        <label>Music only<audio controls preload="none" src="assets/scenes/{sc["key"]}-music.mp3"></audio></label>
        <label>First pass<audio controls preload="none" src="assets/scenes/{sc["key"]}-v1.mp3"></audio></label>
        <label><b>Second pass</b><audio controls preload="none" src="assets/scenes/{sc["key"]}-v2.mp3"></audio></label>
      </div></section>''')
    alone = ''.join(
        f'<label>{label}<audio controls preload="none" data-gain="{GAIN2[k] * MASTER}" src="assets/v2/{k}.mp3"></audio></label>'
        for k, label in (('touch', 'Touch · a choice'), ('untouch', 'Untouch · taken back, left out'),
                         ('seal', 'Seal · a beat closed'), ('ink', 'Ink · a stroke')))
    page = '''<!doctype html><html lang="en"><meta charset="utf-8">
<meta name="viewport" content="width=device-width"><title>Dionysus · Gesture sounds</title>
<style>
:root{color-scheme:dark}*{box-sizing:border-box}body{margin:0;background:#16140f;color:#f5ead8;font:17px/1.55 Georgia,serif}
main{max-width:1060px;margin:0 auto;padding:clamp(24px,5vw,64px)}h1{font-weight:400;font-style:italic;font-size:clamp(32px,5vw,52px);margin:0 0 12px}
h2{font-size:25px;font-weight:400;margin:0 0 6px}p{max-width:65ch;margin:0 0 20px;color:#cfc4ae}section{padding:28px 0;border-top:1px solid #f5ead82e}
.players{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}.players.four{grid-template-columns:repeat(4,minmax(0,1fr))}
label{display:block;font:13px/1.6 system-ui,sans-serif}audio{display:block;width:100%;margin-top:10px}
small{font:13px/1.6 system-ui,sans-serif;color:#cfc4ae}button,a{color:#f5ead8}button{font:inherit;padding:8px 16px;background:transparent;border:1px solid #f5ead866;border-radius:24px;margin:0 0 24px;cursor:pointer}
button:focus-visible,a:focus-visible{outline:2px solid #e8702a;outline-offset:4px}@media(max-width:720px){.players,.players.four{grid-template-columns:1fr;gap:18px}}
</style><main><h1>One glass, four gestures</h1>
<p>Headphones or good speakers, at the volume you would use for the journey. Each moment is the real music at that question, mixed the way the app mixes it. Listen to <b>music only</b> first, then the two passes. Barely there: you should feel the gestures rather than notice them.</p>
<p><a href="http://localhost:5180/?sfx=trial">Try the journey with sounds</a> (dev server) · <a href="http://localhost:5180/">Music only</a></p>
''' + ''.join(sections) + f'''<section><h2>The four sounds alone</h2><p>At journey level they are very quiet on their own; the button lifts them so you can hear their shape.</p>
<button id="detail" type="button" aria-pressed="false">Hear them louder</button>
<div class="players four">{alone}</div></section>
<small>Second pass · 17 October 2026. Synthesised in the score's key (render_v2.py); levels set against the score (manifest-v2.json). The first pass is kept in assets/ for comparison. Still Water omits gesture sounds; the normal journey stays music only until you approve.</small></main>
<script>
let detail=false;
const players=[...document.querySelectorAll('audio')];
const setLevels=()=>players.forEach(a=>{{a.volume=a.dataset.gain?Math.min(1,Number(a.dataset.gain)*(detail?8:1)):1;}});
players.forEach(a=>a.addEventListener('play',()=>players.forEach(b=>{{if(b!==a)b.pause();}})));
document.querySelector('#detail').addEventListener('click',e=>{{detail=!detail;e.currentTarget.setAttribute('aria-pressed',String(detail));e.currentTarget.textContent=detail?'Back to journey level':'Hear them louder';setLevels();}});
setLevels();
</script></html>'''
    (HERE / 'index.html').write_text(page)
    print(HERE / 'index.html')


if __name__ == '__main__':
    main()
