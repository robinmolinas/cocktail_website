"""Level and package the rendered loops for the web.

    uv run --with numpy python -I src/synth.py build      # renders build/*.raw.wav
    python3 src/export.py build                           # writes masters/, web/, previews/

Linear gain only (keeps each loop periodic) to TARGET LUFS integrated. Web
files carry PAD seconds of the loop's own tail before and head after, so any
window of exactly one loop length is seamless; loops.json records the points.
"""
import json, re, subprocess, sys

PAD, TARGET = 2.0, -22.0
build = sys.argv[1]
meta = json.load(open(f'{build}/render-meta.json'))
ff = lambda *a: subprocess.run(['ffmpeg', '-v', 'error', '-y', *a], check=True)
manifest = {}
for name, m in meta.items():
    src, L = f'{build}/{name}.raw.wav', m['seconds']
    log = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', src, '-af', 'ebur128', '-f', 'null', '-'],
                         capture_output=True, text=True).stderr
    lufs = float(re.findall(r'I:\s+(-?[\d.]+) LUFS', log)[-1])
    g = TARGET - lufs
    ff('-i', src, '-af', f'volume={g:.2f}dB', '-c:a', 'pcm_s24le', f'masters/{name}.master.wav')
    fc = (f'[0]volume={g:.2f}dB,asplit=3[a][b][c];[a]atrim=start={L-PAD},asetpts=PTS-STARTPTS[pre];'
          f'[c]atrim=end={PAD},asetpts=PTS-STARTPTS[post];[pre][b][post]concat=n=3:v=0:a=1[o]')
    ff('-i', src, '-filter_complex', fc, '-map', '[o]', '-c:a', 'libopus', '-b:a', '112k', f'web/{name}.webm')
    ff('-i', src, '-filter_complex', fc, '-map', '[o]', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', f'web/{name}.m4a')
    sc = (f'[0]volume={g:.2f}dB,asplit=2[a][b];[a]atrim=start={L-12},asetpts=PTS-STARTPTS[x];'
          f'[b]atrim=end=12,asetpts=PTS-STARTPTS[y];[x][y]concat=n=2:v=0:a=1[o]')
    ff('-i', src, '-filter_complex', sc, '-map', '[o]', '-c:a', 'libmp3lame', '-q:a', '2', f'previews/{name}.seam-check.mp3')
    manifest[name] = {"loopStart": PAD, "loopEnd": PAD + L, "loopSeconds": L, "integratedLufs": TARGET,
                      "files": {"opus": f"{name}.webm", "aac": f"{name}.m4a"}}
    print(name, f'{lufs:+.1f} → {TARGET} LUFS')
json.dump(manifest, open('web/loops.json', 'w'), indent=2)
