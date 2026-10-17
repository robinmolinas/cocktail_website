"""Native-audio audition page; works from disk without a dev server."""
from pathlib import Path
import json
import subprocess

HERE = Path(__file__).resolve().parent
APP = HERE.parents[2].parent / 'dionysus-experience'
M = json.loads((HERE / 'manifest.json').read_text())
SCENES = {
    'choice': ('02-firstlight.mp3', 8, 0.9, 9000, 'A choice', 'A short glass touch, tuned to the chord in the journey.'),
    'ink': ('02-firstlight.mp3', 8, 0.42, 2800, 'Writing', 'A breath of texture as a phrase begins, with space between strokes.'),
    'release': ('05-world.mp3', 16, 1.0, 11000, 'Letting go', 'A soft wake as a chosen word or written line leaves.'),
}


def ff(*args):
    subprocess.run(['ffmpeg', '-v', 'error', '-nostdin', '-y', *args], check=True)


sections = []
for name, (cue, start, level, cutoff, title, description) in SCENES.items():
    bed = HERE / 'assets' / f'{name}-music-only.mp3'
    mix = HERE / 'assets' / f'{name}-with-effects.mp3'
    ff('-ss', str(start), '-t', '9', '-i', str(APP / 'public/audio/score' / cue),
       '-af', f'lowpass=f={cutoff},volume={level * 0.7},afade=t=in:d=0.4,afade=t=out:st=8:d=1',
       '-c:a', 'libmp3lame', '-b:a', '160k', str(bed))
    gain = M['effects'][name]['gain'] * 0.7
    graph = (f'[1:a]volume={gain},asplit=2[a][b];'
             '[a]adelay=2200:all=1[x];[b]adelay=5400:all=1[y];'
             '[0:a][x][y]amix=inputs=3:duration=first:normalize=0[o]')
    ff('-i', str(bed), '-i', str(HERE / 'assets' / f'{name}.mp3'),
       '-filter_complex', graph, '-map', '[o]', '-c:a', 'libmp3lame', '-b:a', '160k', str(mix))
    sections.append(f'''<section><h2>{title}</h2><p>{description}</p>
      <div class="players">
        <label>Sound alone · {M["effects"][name]["duration"]:g} s · journey level<audio controls preload="none" data-gain="{gain}" src="assets/{name}.mp3"></audio></label>
        <label>Music only<audio controls preload="none" src="assets/{name}-music-only.mp3"></audio></label>
        <label>Music + effects<audio controls preload="none" src="assets/{name}-with-effects.mp3"></audio></label>
      </div></section>''')

page = '''<!doctype html><html lang="en"><meta charset="utf-8">
<meta name="viewport" content="width=device-width"><title>Dionysus · Sound trial</title>
<style>
:root{color-scheme:dark}*{box-sizing:border-box}body{margin:0;background:#16140f;color:#f5ead8;font:17px/1.55 Georgia,serif}
main{max-width:1060px;margin:0 auto;padding:clamp(24px,5vw,64px)}h1{font-weight:400;font-style:italic;font-size:clamp(32px,5vw,52px);margin:0 0 12px}
h2{font-size:25px;font-weight:400;margin:0 0 6px}p{max-width:65ch;margin:0 0 20px;color:#cfc4ae}section{padding:28px 0;border-top:1px solid #f5ead82e}
.players{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}label{display:block;font:13px/1.6 system-ui,sans-serif}audio{display:block;width:100%;margin-top:10px}
small{font:13px/1.6 system-ui,sans-serif;color:#cfc4ae}button,a{color:#f5ead8}button{font:inherit;padding:8px 16px;background:transparent;border:1px solid #f5ead866;border-radius:24px;margin:0 0 24px;cursor:pointer}
button:focus-visible,a:focus-visible{outline:2px solid #e8702a;outline-offset:4px}@media(max-width:720px){.players{grid-template-columns:1fr;gap:18px}}
</style><main><h1>Sound, barely there</h1><p>Three short gestures drawn from the existing Glass Chords recording. Compare each with the same music alone. The effects enter at 2.2 and 5.4 seconds.</p>
<p><a href="http://127.0.0.1:5182/?sfx=trial">Try the journey with effects</a> · <a href="http://127.0.0.1:5182/">Music only</a></p>
<button id="detail" type="button" aria-pressed="false">Hear isolated sounds louder</button>
''' + ''.join(sections) + '''<small>First listening pass · 17 October 2026. The journey trial uses the existing sound switch. Still Water omits effects. The normal journey remains music only.</small></main>
<script>
let detail=false;
const players=[...document.querySelectorAll('audio')];
const setLevels=()=>players.forEach(a=>{a.volume=a.dataset.gain?Math.min(1,Number(a.dataset.gain)*(detail?4:1)):1;});
players.forEach(a=>a.addEventListener('play',()=>players.forEach(b=>{if(b!==a)b.pause();})));
document.querySelector('#detail').addEventListener('click',e=>{detail=!detail;e.currentTarget.setAttribute('aria-pressed',String(detail));e.currentTarget.textContent=detail?'Return to journey level':'Hear isolated sounds louder';setLevels();});
setLevels();
</script></html>'''
(HERE / 'index.html').write_text(page)
print(HERE / 'index.html')
