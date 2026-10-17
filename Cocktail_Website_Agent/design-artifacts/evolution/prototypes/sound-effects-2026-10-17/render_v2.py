"""The gesture sounds, second pass: one struck-glass voice in the score's own key.

Why a second pass (17 Oct 2026). The first trial cut its sounds out of the
Glass Chords recording. Measured, that recording has no isolated struck
notes: it is a continuous G#/D# drone with bright shimmer on top. So every cut
was a slice of a held note given an artificial fade-in. It swelled rather than
touched, it carried the drone with it, and its tail stopped at 0.78 s. This
pass keeps the score as the reference but synthesises the sounds in-house
(the same rights path as ../../../2026-10-06-type-icons-sound/sound/src/synth.py):
a nearly pure glass partial set, which is how the score's own glass measures,
tuned to A440 on D# and G#. Those are the two notes every chord in the journey
contains, so any gesture over any chapter is consonant without retuning.

The family is one glass, four gestures:
  touch    a fingertip on the glass (D#5). A choice. The app climbs a chord
           tone per gathered word in H5 and H6 (D#, G#, A#, D#).
  untouch  the glass damped, a fifth lower (G#4), sinking 15 cents. A word
           taken back, a flavour left out, a step back.
  seal     the open fifth placed together (G#4 then D#5), with the longest
           room. A name, a written line, a beat sealed.
  ink      a mote of the same glass (D#6) with a breath of nib. Each stroke;
           the app lowers it as typing quickens.

All share one synthetic room (2.2 s, darker as it decays), so the tails dissolve
into the score instead of stopping. Levels are set against the score itself:
each sound's loudest 400 ms is placed a fixed number of dB under the median
loudness of the beds it plays over (BS.1770 K-weighted, through the same
low-pass the app applies at those holds).

Run: uv run --with numpy --with scipy python -I render_v2.py
Writes assets/v2/*.mp3, the app's public/audio/effects/{touch,untouch,seal,ink}.mp3
and manifest-v2.json (parameters, hashes, levels, runtime gains).
"""
from pathlib import Path
import hashlib
import json
import subprocess

import numpy as np
from scipy.signal import butter, fftconvolve, lfilter, sosfilt

HERE = Path(__file__).resolve().parent
APP = HERE.parents[2].parent / 'dionysus-experience'
SR = 44100
D5, G4, D6 = 622.254, 415.305, 1244.508   # D#5, G#4, D#6 at A440 (the score measures 0 ± 5 cents)

# The beds the gestures land on: (cue file, low-pass in the app at that hold).
BEDS = [('01-pressure', 6500), ('02-firstlight', 9000), ('03-current', 9000),
        ('04-question', 9000), ('05-world', 11000), ('05-world', 10000), ('02-firstlight', 2800)]
# dB under the bed's median short-term loudness, for the loudest 400 ms.
# Barely there (Robin, 17 Oct): felt more than heard; seal leads by length, not level.
# Robin, after listening: "a bit too loud, quieter/smoother" -> all ~5 dB down.
TARGET = {'touch': -17.5, 'untouch': -22.0, 'seal': -16.0, 'ink': -25.0}


def k_weight(x):
    b1 = [1.53512485958697, -2.69169618940638, 1.19839281085285]; a1 = [1, -1.69065929318241, 0.73248077421585]
    b2 = [1, -2, 1]; a2 = [1, -1.99004745483398, 0.99007225036621]
    return lfilter(b2, a2, lfilter(b1, a1, x, axis=0), axis=0)


def st_loudness(x, win=0.4):
    """short-term loudness (LUFS) every 100 ms, stereo summed as BS.1770"""
    y = k_weight(x if x.ndim == 2 else x[:, None])
    n, hop = int(win * SR), int(0.1 * SR)
    out = [-0.691 + 10 * np.log10(np.sum(np.mean(y[i:i + n] ** 2, axis=0)) + 1e-12) for i in range(0, max(1, len(y) - n), hop)]
    return np.array(out)


def lowpass(x, fc, q=0.5):
    """the app's BiquadFilter (lowpass, Q 0.5)"""
    w0 = 2 * np.pi * fc / SR; al = np.sin(w0) / (2 * q); c = np.cos(w0)
    b = np.array([(1 - c) / 2, 1 - c, (1 - c) / 2]); a = np.array([1 + al, -2 * c, 1 - al])
    return lfilter(b / a[0], a / a[0], x, axis=0)


def decode(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(path), '-f', 'f32le', '-ac', '2', '-ar', str(SR), '-'],
                         check=True, capture_output=True).stdout
    return np.frombuffer(raw, dtype=np.float32).reshape(-1, 2).astype(np.float64)


def glass(f0, dur, partials, attack, glide_cents=0.0, shimmer=0.35, seed=0):
    """modal glass: each partial (ratio, amp, tau) decays on its own; the
    fundamental is a slightly detuned pair, so it breathes like real glass"""
    rng = np.random.default_rng(seed)
    t = np.arange(int(dur * SR)) / SR
    bend = 2 ** (glide_cents * (1 - np.exp(-t / 0.25)) / 1200)       # a sink that settles
    y = np.zeros_like(t)
    for ratio, amp, tau in partials:
        f = f0 * ratio * bend
        if ratio == 1:
            for d, share in ((-shimmer, 0.6), (shimmer, 0.4)):   # unequal, so it breathes but never cancels
                ph = 2 * np.pi * np.cumsum(f + d) / SR + rng.uniform(0, 2 * np.pi)
                y += amp * share * np.exp(-t / tau) * np.sin(ph)
        else:
            ph = 2 * np.pi * np.cumsum(f) / SR + rng.uniform(0, 2 * np.pi)
            y += amp * np.exp(-t / tau) * np.sin(ph)
    a = np.minimum(1, t / attack)
    y *= np.sin(a * np.pi / 2) ** 2
    k = int(0.3 * len(t))                                            # the dry note ends at silence, never a cut
    y[-k:] *= np.cos(np.linspace(0, np.pi / 2, k)) ** 2
    return y


def nib(dur, lo, hi, db, seed):
    """a breath of contact: band-limited noise, a few ms long"""
    rng = np.random.default_rng(seed)
    n = int(dur * SR)
    x = sosfilt(butter(2, [lo, hi], btype='band', fs=SR, output='sos'), rng.standard_normal(n))
    t = np.arange(n) / SR
    x *= np.exp(-t / (dur / 4)) * np.minimum(1, t / 0.0008)
    return x / (np.abs(x).max() + 1e-12) * 10 ** (db / 20)


def room(rt60=2.2, seed=7):
    """stereo synthetic room: sparse early reflections, then a diffuse tail
    whose highs die first (rt per band), unit energy per channel"""
    rng = np.random.default_rng(seed)
    n = int(rt60 * 1.15 * SR)
    t = np.arange(n) / SR
    bands = [((None, 500), rt60 * 1.15), ((500, 2500), rt60), ((2500, 6000), rt60 * 0.6), ((6000, None), rt60 * 0.3)]
    ir = np.zeros((n, 2))
    for ch in range(2):
        tail = np.zeros(n)
        for (lo, hi), rt in bands:
            noise = rng.standard_normal(n)
            if lo is None: sos = butter(2, hi, btype='low', fs=SR, output='sos')
            elif hi is None: sos = butter(2, lo, btype='high', fs=SR, output='sos')
            else: sos = butter(2, [lo, hi], btype='band', fs=SR, output='sos')
            tail += sosfilt(sos, noise) * np.exp(-6.91 * t / rt)
        tail *= np.minimum(1, t / 0.03)                    # the tail blooms in after the reflections
        for ms, g in [(11, 0.5), (17, 0.38), (23 + 4 * ch, 0.3), (31 - 3 * ch, 0.24), (43, 0.17), (59 + 5 * ch, 0.12)]:
            tail[int(ms * SR / 1000)] += g * (1 if (ms + ch) % 2 else -1) * 6
        pre = int(0.014 * SR)
        ir[pre:, ch] = tail[:n - pre]
        ir[:, ch] /= np.sqrt(np.sum(ir[:, ch] ** 2))
    return ir


def place(dry, wet_db, ir, tail_s):
    """dry in the centre, the room around it; ends at true silence"""
    total = len(dry) + int(tail_s * SR)
    d = np.zeros(total); d[:len(dry)] = dry
    wet = np.stack([fftconvolve(d, ir[:, c])[:total] for c in range(2)], axis=1) * 10 ** (wet_db / 20)
    out = d[:, None] * np.array([[1.0, 1.0]]) + wet
    env = st_loudness(out)
    # trim where the whole thing has fallen 60 dB under its loudest moment
    last = np.where(env > env.max() - 60)[0][-1]
    end = min(total, int((last * 0.1 + 0.4) * SR))
    out = out[:end]
    k = int(0.35 * SR)
    out[-k:] *= np.cos(np.linspace(0, np.pi / 2, k))[:, None] ** 2
    return out


def build():
    ir = room()
    s = {}
    # touch: a fingertip on the glass, nearly pure, short
    s['touch'] = place(
        glass(D5, 2.4, [(1, 1.0, 0.52), (2, 0.1, 0.22), (3, 0.025, 0.12), (2.76, 0.025, 0.045)], 0.014, seed=1),
        -10, ir, 1.8)
    # untouch: the same glass damped and lower, sinking a little
    s['untouch'] = place(glass(G4, 1.5, [(1, 1.0, 0.3), (2, 0.05, 0.12)], 0.028, glide_cents=-15, seed=2), -12, ir, 1.4)
    # seal: the open fifth, placed (G# first, D# 24 ms later), the longest room
    a = glass(G4, 3.6, [(1, 0.8, 0.95), (2, 0.06, 0.4), (2.76, 0.012, 0.05)], 0.045, seed=3)
    b = glass(D5, 3.6, [(1, 0.68, 0.8), (2, 0.06, 0.3), (2.76, 0.012, 0.04)], 0.035, seed=4)
    off = int(0.024 * SR)
    seal = np.zeros(len(a) + off); seal[:len(a)] += a; seal[off:] += b
    s['seal'] = place(seal, -8, ir, 2.4)
    # ink: a mote of the glass, an octave up, with the nib
    s['ink'] = place(
        glass(D6, 0.7, [(1, 1.0, 0.085), (2, 0.05, 0.04), (2.76, 0.02, 0.018)], 0.006, shimmer=0.6, seed=5)
        + np.pad(nib(0.012, 3000, 6000, -34, 12), (0, int(0.7 * SR) - int(0.012 * SR))),
        -12, ir, 0.9)
    return s


def encode(x, path):
    x = x / np.abs(x).max() * 10 ** (-3 / 20)                 # files peak at -3 dBFS; the app sets the level
    subprocess.run(['ffmpeg', '-v', 'error', '-nostdin', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '2', '-i', '-',
                    '-map_metadata', '-1', '-c:a', 'libmp3lame', '-b:a', '128k', str(path)],
                   input=np.ascontiguousarray(x, dtype=np.float32).tobytes(), check=True)


def main():
    out = HERE / 'assets' / 'v2'
    out.mkdir(parents=True, exist_ok=True)
    target = APP / 'public/audio/effects'
    beds = []
    for cue, fc in BEDS:
        x = lowpass(decode(APP / f'public/audio/score/{cue}.mp3')[int(8 * SR):int(28 * SR)], fc)
        beds.append(float(np.median(st_loudness(x))))
    ref = float(np.mean(beds))
    record = {
        'method': 'in-house modal synthesis tuned to the Glass Chords score (A440, D# and G#); render_v2.py',
        'status': 'Second listening pass, 17 Oct 2026; replaces the cut fragments of the first pass. Not enabled by default.',
        'bedReferenceLufsST': round(ref, 2), 'beds': {f'{c}@{f}': round(b, 2) for (c, f), b in zip(BEDS, beds)},
        'effects': {},
    }
    for name, x in build().items():
        path = out / f'{name}.mp3'
        encode(x, path)
        (target / path.name).write_bytes(path.read_bytes())
        y = decode(path)
        peak_st = float(st_loudness(np.pad(lowpass(y, 9000), ((0, int(0.4 * SR)), (0, 0)))).max())
        gain = 10 ** ((ref + TARGET[name] - peak_st) / 20)
        lead = int(np.argmax(np.abs(y).max(axis=1) > 10 ** (-40 / 20)))
        assert np.abs(y).max() < 0.75 and np.abs(y[-64:]).max() < 1e-3, name
        record['effects'][name] = {
            'duration': round(len(y) / SR, 3), 'peakDbfs': round(20 * np.log10(np.abs(y).max()), 2),
            'fileLoudestLufsST': round(peak_st, 2), 'underBedDb': TARGET[name], 'runtimeGain': round(gain, 4),
            'decodedLeadMs': round(lead / SR * 1000, 1),
            'bytes': path.stat().st_size, 'sha256': hashlib.sha256(path.read_bytes()).hexdigest(),
        }
        print(name, record['effects'][name])
    (HERE / 'manifest-v2.json').write_text(json.dumps(record, indent=2) + '\n')


if __name__ == '__main__':
    main()
