"""A quiet sound family cut from the approved Glass Chords recording.

Python standard library + ffmpeg only. No synthesis, new sample library or
generation service. Run from any directory: python3 render.py
"""
from array import array
from pathlib import Path
import hashlib
import json
import math
import subprocess
import sys

HERE = Path(__file__).resolve().parent
ARTIFACTS = HERE.parents[2]
SOURCE = ARTIFACTS / '2026-10-06-type-icons-sound/sound/source/Glass_Chords_and_Felt_Key_Breathing_2026-10-08T135645.mp3'
APP = ARTIFACTS.parent / 'dionysus-experience'
RATE = 44100
# Source seconds, duration, filters, attack, tail, peak dBFS, runtime gain.
CUTS = {
    'choice': (35.25, 0.78, 'highpass=f=620,lowpass=f=4600', 0.025, 0.65, -16, 0.35),
    'ink': (216.05, 0.28, 'highpass=f=3200,lowpass=f=7400', 0.045, 0.20, -22, 0.18),
    'release': (214.60, 1.10, 'highpass=f=850,lowpass=f=3400,areverse', 0.18, 0.80, -20, 0.28),
}


def run(*args, **kw):
    return subprocess.run(['ffmpeg', '-v', 'error', '-nostdin', *args], check=True, **kw)


def decoded(path):
    raw = run('-i', str(path), '-f', 'f32le', '-ar', str(RATE), '-ac', '2', '-', capture_output=True).stdout
    samples = array('f')
    samples.frombytes(raw)
    if sys.byteorder != 'little':
        samples.byteswap()
    return samples


def main():
    assets = HERE / 'assets'
    target = APP / 'public/audio/effects'
    assets.mkdir(exist_ok=True)
    target.mkdir(exist_ok=True)
    record = {'source': str(SOURCE.relative_to(ARTIFACTS)),
              'sourceSha256': hashlib.sha256(SOURCE.read_bytes()).hexdigest(),
              'status': 'Listening trial; Robin chose barely there. Not enabled by default.', 'effects': {}}
    for name, (start, duration, filters, attack, tail, peak, gain) in CUTS.items():
        raw = run('-ss', str(start), '-t', str(duration), '-i', str(SOURCE), '-af', filters,
                  '-f', 'f32le', '-ar', str(RATE), '-ac', '2', '-', capture_output=True).stdout
        x = array('f')
        x.frombytes(raw)
        if sys.byteorder != 'little':
            x.byteswap()
        frames = len(x) // 2
        for i in range(frames):
            t = i / RATE
            rise = math.sin(min(1.0, t / attack) * math.pi / 2) ** 2
            fall = math.sin(min(1.0, max(0.0, (frames - 1 - i) / RATE / tail)) * math.pi / 2) ** 2
            env = rise * fall
            x[i * 2] *= env
            x[i * 2 + 1] *= env
        level = 10 ** (peak / 20) / max(abs(v) for v in x)
        x = array('f', (v * level for v in x))
        if sys.byteorder != 'little':
            x.byteswap()
        path = assets / f'{name}.mp3'
        run('-y', '-f', 'f32le', '-ar', str(RATE), '-ac', '2', '-i', '-',
            '-map_metadata', '-1', '-c:a', 'libmp3lame', '-b:a', '128k', str(path), input=x.tobytes())
        (target / path.name).write_bytes(path.read_bytes())
        check = decoded(path)
        measured_peak = 20 * math.log10(max(abs(v) for v in check))
        rms = 20 * math.log10(math.sqrt(sum(v * v for v in check) / len(check)))
        assert measured_peak < -12, (name, measured_peak)
        assert abs(check[0]) < 0.002 and abs(check[-1]) < 0.002, name
        record['effects'][name] = {
            'sourceStart': start, 'sourceDuration': duration, 'filters': filters,
            'attack': attack, 'tail': tail, 'gain': gain,
            'duration': round(len(check) / RATE / 2, 3),
            'peakDbfs': round(measured_peak, 2), 'rmsDbfs': round(rms, 2),
            'bytes': path.stat().st_size, 'sha256': hashlib.sha256(path.read_bytes()).hexdigest(),
        }
        print(name, record['effects'][name])
    (HERE / 'manifest.json').write_text(json.dumps(record, indent=2) + '\n')


if __name__ == '__main__':
    main()
