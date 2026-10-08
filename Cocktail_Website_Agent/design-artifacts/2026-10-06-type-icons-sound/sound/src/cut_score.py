"""Cut the chosen ElevenLabs suite ("Glass Chords and Felt Key Breathing",
8 Oct 2026) into the journey's cues.

The suite is one linear 4:30 piece. The journey is not linear (H4 is timed,
H5, H7 and the wait are self-paced), so the app re-sequences it: each chapter
plays its own section of the suite, looped while the guest stays there, and
the score crossfades forward when the stage changes. The sections already
share one root (G#), so every crossfade is consonant.

Each looped cue is seamless by construction:
  file = x[a : L1] whose last `c` seconds are a crossfade of x[L1-c : L1]
  (fading out) with x[L0-c : L0] (fading in), followed by 1 s of x[L0 : ...].
At L1 the signal *is* the material just before L0, so jumping back to L0 is
the track's own continuation. Any window of exactly one loop length inside
the file is seamless, so a decoder's few-ms priming offset cannot open a gap.
The fade law adapts to how correlated the two windows are (a drone blending
with itself must not bump or hollow out at the midpoint).

Usage:  python cut_score.py <suite.mp3> <app public/audio/score dir> <preview dir>
        (the suite lives in ../source/; it is the source of record, not shipped)
Needs numpy and ffmpeg (libmp3lame). Prints the cue table for src/audio/cues.ts.
"""
import json, subprocess, sys
from pathlib import Path
import numpy as np

SR = 44100
GAIN_DB = -6.0          # the suite is mastered at -14 LUFS; the bed sits far lower
CHAIN_FADE_S = 0.03     # anti-click edge where the suite itself starts hard

# (id, a = file start, L0 = loop start, L1 = loop end / file end when no loop, c = seam crossfade)
# times are suite seconds, found by measurement (sections land on a 32 s grid).
CUES = [
    ('pressure',   0.0,   7.5,   31.5, 4.0),   # H1   the G# stack, felt more than heard
    ('firstlight', 32.0,  40.0,  63.5, 3.0),   # H2, H7  bass drops away: a held glass fifth and glints
    ('current',    64.0,  72.0,  95.8, 3.0),   # H3, H10 bed  the stack returns, breathing every 8 s
    ('question',   95.8,  95.8, 127.8, 3.0),   # H4   G#/A# alternate every 8 s
    ('world',      127.8, 127.8, 159.8, 3.0),  # H5-H6  B, A#, G#: the widest harmony
    ('rise',       176.0, 181.0, 213.0, 3.0),  # H8   G#, C, A#, G#, brighter partials
    ('lettinggo',  205.0, None,  229.0, None), # H9   the wash at ~215.9 s lands on the splash
    ('answer',     248.0, None,  268.0, None), # H10  the chord with its major third on top, decaying (sounds from 248.05)
]


def decode(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(path), '-f', 'f32le', '-ac', '2', '-ar', str(SR), '-'],
                         check=True, capture_output=True).stdout
    return np.frombuffer(raw, dtype=np.float32).reshape(-1, 2).T.copy()


def encode(x, path):
    p = subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ac', '2', '-ar', str(SR), '-i', '-',
                        '-c:a', 'libmp3lame', '-b:a', '192k', str(path)],
                       input=np.ascontiguousarray(x.T, dtype=np.float32).tobytes(), check=True)
    return p


def s(t):
    return int(round(t * SR))


def best_loop_start(m, L0, L1, c, search=0.3):
    """Nudge L0 so the window before it matches the window before L1."""
    tail = m[s(L1 - c):s(L1)]
    lo, hi = s(L0 - c - search), s(L0 + search)
    seg = m[lo:hi]
    n = len(tail)
    # normalised cross-correlation via FFT
    N = 1 << int(np.ceil(np.log2(len(seg) + n)))
    xc = np.fft.irfft(np.fft.rfft(seg, N) * np.conj(np.fft.rfft(tail, N)), N)[:len(seg) - n + 1]
    e = np.convolve(seg ** 2, np.ones(n), 'valid')
    r = xc / (np.sqrt(e * np.sum(tail ** 2)) + 1e-12)
    k = int(np.argmax(r))
    return (lo + k + n) / SR, float(r[k])


def seam_crossfade(out_w, in_w, r):
    t = np.linspace(0, 1, out_w.shape[1])
    th = t * np.pi / 2
    r = max(0.0, min(1.0, r))
    k = 1 / np.sqrt(1 + 2 * r * np.cos(th) * np.sin(th))
    return out_w * (np.cos(th) * k) + in_w * (np.sin(th) * k)


def seam_report(y, ls, le):
    """Size of the step across the loop point vs the file's ordinary steps."""
    m = y.mean(axis=0)
    steps = np.abs(np.diff(m))
    jump = abs(m[s(ls)] - m[s(le) - 1])
    pct = float((steps < jump).mean() * 100)
    # short-window level either side of the seam (dB), 200 ms
    w = s(0.2)
    before = 20 * np.log10(np.sqrt(np.mean(m[s(le) - w:s(le)] ** 2)) + 1e-9)
    after = 20 * np.log10(np.sqrt(np.mean(m[s(ls):s(ls) + w] ** 2)) + 1e-9)
    return pct, before, after


def main():
    src, app_dir, prev_dir = Path(sys.argv[1]), Path(sys.argv[2]), Path(sys.argv[3])
    app_dir.mkdir(parents=True, exist_ok=True)
    prev_dir.mkdir(parents=True, exist_ok=True)
    x = decode(src) * (10 ** (GAIN_DB / 20))
    m = x.mean(axis=0)
    table = []
    for i, (cid, a, L0, L1, c) in enumerate(CUES, 1):
        name = f'{i:02d}-{cid}.mp3'
        if L0 is None:
            y = x[:, s(a):s(L1)].copy()
            entry = {'id': cid, 'file': name, 'duration': round(y.shape[1] / SR, 3)}
        else:
            L0t, r = best_loop_start(m, L0, L1, c)
            a = min(a, L0t - 0.05)  # the loop must start after the head's anti-click edge
            body = x[:, s(a):s(L1)].copy()
            n = s(c)
            body[:, -n:] = seam_crossfade(x[:, s(L1) - n:s(L1)], x[:, s(L0t) - n:s(L0t)], r)
            y = np.concatenate([body, x[:, s(L0t):s(L0t) + SR]], axis=1)
            ls, le = L0t - a, L1 - a
            pct, b_db, a_db = seam_report(y, ls, le)
            entry = {'id': cid, 'file': name, 'duration': round(y.shape[1] / SR, 3),
                     'loopStart': round(ls, 4), 'loopEnd': round(le, 4)}
            print(f'{cid:11s} L0 {L0}->{L0t:.4f} (r={r:.3f})  loop {le - ls:.2f}s  seam step pct {pct:.1f}  '
                  f'level {b_db:.1f} | {a_db:.1f} dB')
            # seam check: 6 s up to the loop end straight into 6 s from the loop start
            chk = np.concatenate([y[:, s(le - 6):s(le)], y[:, s(ls):s(ls + 6)]], axis=1)
            encode(chk, prev_dir / f'{i:02d}-{cid}.seam-check.mp3')
        # anti-click edge at the head (the suite starts some sections hard)
        f = s(CHAIN_FADE_S)
        y[:, :f] *= np.linspace(0, 1, f)
        if cid == 'lettinggo':
            # where the splash's wash peaks: the 3-12 kHz envelope's maximum
            seg = x[:, s(213):s(219)].mean(axis=0)
            spec = np.abs(np.fft.rfft(seg.reshape(-1, s(0.05))[:, :], axis=1))
            freqs = np.fft.rfftfreq(s(0.05), 1 / SR)
            band = spec[:, (freqs > 3000) & (freqs < 12000)].sum(axis=1)
            entry['washAt'] = round(213 + int(np.argmax(band)) * 0.05 + 0.025 - a, 3)
            print(f'lettinggo   wash peak at cue {entry["washAt"]}s (suite {entry["washAt"] + a:.2f}s)')
        y[:, -s(0.02):] *= np.linspace(1, 0, s(0.02))
        peak = 20 * np.log10(np.abs(y).max())
        encode(y, app_dir / name)
        entry['peakDb'] = round(float(peak), 1)
        table.append(entry)
    print(json.dumps(table, indent=1))


if __name__ == '__main__':
    main()
