"""Dionysus background-music concept sketches.

Three seamless loops, synthesised from scratch (no samples, no generative
model), so the sketches carry no third-party rights. Run:

    uv run --with numpy python -I synth.py <out_dir>

Seamless by construction: every event is written modulo the loop length, every
LFO completes a whole number of cycles per loop, and filtering and reverb are
done as circular operations in the frequency domain. The output is exactly one
period of a periodic signal, so the last sample flows into the first.

These are direction sketches for judging register, density and pace inside the
app. They are not production masters; see ../PRODUCTION-AND-RIGHTS.md.
"""
import sys, json, wave
import numpy as np

SR = 48000
TAU = 2 * np.pi


def midi(n):
    return 440.0 * 2 ** ((n - 69) / 12)


class Loop:
    def __init__(self, seconds, seed):
        self.n = int(round(seconds * SR))
        self.seconds = self.n / SR
        self.buf = np.zeros((2, self.n))
        self.rng = np.random.default_rng(seed)

    def add(self, t0, sig, pan=0.0, gain=1.0):
        """Add a mono or stereo signal at t0 seconds, wrapping around the loop."""
        if sig.ndim == 1:
            l = np.cos((pan + 1) * np.pi / 4)
            r = np.sin((pan + 1) * np.pi / 4)
            sig = np.vstack([sig * l, sig * r])
        start = int(round((t0 % self.seconds) * SR))
        pos, i = start, 0
        while i < sig.shape[1]:  # wrap around the loop as many times as needed
            take = min(self.n - pos, sig.shape[1] - i)
            self.buf[:, pos:pos + take] += sig[:, i:i + take] * gain
            i += take
            pos = 0

    def lfo(self, cycles, phase=0.0):
        """A slow sine that completes `cycles` whole cycles per loop (seamless)."""
        t = np.arange(self.n) / SR
        return np.sin(TAU * cycles * t / self.seconds + phase)


# ---------------------------------------------------------------- voices

def felt_piano(f, dur, vel, rng):
    """Additive felt piano: inharmonic partials, felt-damped highs, soft attack,
    two-stage decay, unison-string beating."""
    n = int(dur * SR)
    t = np.arange(n) / SR
    out = np.zeros(n)
    B = 0.00035
    for k in range(1, 13):
        fk = f * k * np.sqrt(1 + B * k * k)
        if fk > 9000:
            break
        amp = (1 / k ** 1.25) * np.exp(-(k - 1) / (2.2 + 2.5 * vel))
        tau1 = 0.55 / (1 + 0.35 * k)
        tau2 = 5.5 / (1 + 0.22 * k) * (220 / max(f, 110)) ** 0.35
        env = 0.55 * np.exp(-t / tau1) + 0.45 * np.exp(-t / tau2)
        det = 1 + rng.uniform(0.0002, 0.0009)
        out += amp * env * (np.sin(TAU * fk * t + rng.uniform(0, TAU)) +
                            0.8 * np.sin(TAU * fk * det * t + rng.uniform(0, TAU)))
    att = np.clip(t / 0.014, 0, 1) ** 1.6
    rel = np.clip((dur - t) / 0.6, 0, 1)
    return out * att * rel * vel * 0.16


def glass(f, dur, rng, rubbed=True):
    """A faint glass harmonic: near-pure tone, slow bloom if rubbed, tiny
    vibrato, long tail; one inharmonic overtone for the glass colour."""
    n = int(dur * SR)
    t = np.arange(n) / SR
    vib = 1 + 0.0015 * np.sin(TAU * rng.uniform(4.5, 5.5) * t)
    ph = TAU * np.cumsum(f * vib) / SR
    tone = np.sin(ph) + 0.12 * np.sin(2.76 * ph) + 0.04 * np.sin(5.4 * ph)
    if rubbed:
        env = np.clip(t / 1.6, 0, 1) ** 2 * np.exp(-np.maximum(t - 1.6, 0) / 2.2)
    else:
        env = np.clip(t / 0.004, 0, 1) * np.exp(-t / 2.8)
    return tone * env * np.clip((dur - t) / 0.5, 0, 1) * 0.05


def pad_voice(f, dur, rng, bright=4):
    """Soft additive pad partial stack with slow internal beating."""
    n = int(dur * SR)
    t = np.arange(n) / SR
    out = np.zeros(n)
    for k in range(1, bright + 1):
        for d in (-0.0016, 0.0, 0.0019):
            out += (1 / k ** 1.7) * np.sin(TAU * f * k * (1 + d) * t + rng.uniform(0, TAU))
    return out / 3


def bass_pluck(f, dur, vel, rng):
    """Soft upright-bass pluck: warm low partials, quick body decay, finger thump."""
    n = int(dur * SR)
    t = np.arange(n) / SR
    out = np.zeros(n)
    for k in range(1, 7):
        tau = 1.1 / (1 + 0.6 * (k - 1))
        out += (1 / k ** 1.4) * np.exp(-t / tau) * np.sin(TAU * f * k * t + rng.uniform(0, TAU))
    thump = np.exp(-t / 0.018) * np.sin(TAU * 62 * t) * 0.35
    att = np.clip(t / 0.006, 0, 1)
    return (out + thump) * att * np.clip((dur - t) / 0.15, 0, 1) * vel * 0.22


def epiano(f, dur, vel, rng):
    """Two-operator FM electric piano, kept dark: decaying index, faint tine."""
    n = int(dur * SR)
    t = np.arange(n) / SR
    idx = 0.25 + 1.1 * vel * np.exp(-t / 0.35)
    mod = np.sin(TAU * f * t)
    body = np.sin(TAU * f * t + idx * mod)
    tine = 0.05 * vel * np.exp(-t / 0.08) * np.sin(TAU * f * 14 * t)
    env = np.clip(t / 0.004, 0, 1) * (0.6 * np.exp(-t / 0.9) + 0.4 * np.exp(-t / 3.6))
    return (body + tine) * env * np.clip((dur - t) / 0.4, 0, 1) * vel * 0.07


def brush(dur, vel, rng, swish=True):
    """Brushed snare: band-limited noise with a soft swell (swish) or tap."""
    n = int(dur * SR)
    t = np.arange(n) / SR
    noise = rng.standard_normal(n)
    spec = np.fft.rfft(noise)
    fr = np.fft.rfftfreq(n, 1 / SR)
    spec *= np.exp(-((np.log(fr + 1) - np.log(4200)) ** 2) / 0.9)
    noise = np.fft.irfft(spec, n)
    noise /= np.abs(noise).max() + 1e-9
    env = np.sin(np.pi * np.clip(t / dur, 0, 1)) ** 2 if swish else np.exp(-t / 0.06)
    return noise * env * vel * 0.03


# ---------------------------------------------------------------- mix stages

def spectral(buf, curve):
    """Circular frequency-domain filter (keeps the loop periodic)."""
    n = buf.shape[1]
    fr = np.fft.rfftfreq(n, 1 / SR)
    g = curve(fr)
    return np.vstack([np.fft.irfft(np.fft.rfft(ch) * g, n) for ch in buf])


def reverb(buf, seconds=3.6, wet=0.32, seed=7, damp=5200):
    """Circular convolution with a decorrelated stereo noise tail."""
    n = buf.shape[1]
    rng = np.random.default_rng(seed)
    m = int(seconds * SR)
    t = np.arange(m) / SR
    out = np.zeros_like(buf)
    for c in range(2):
        ir = rng.standard_normal(m) * np.exp(-t * 6.9 / seconds)
        ir[: int(0.012 * SR)] = 0
        spec = np.fft.rfft(ir)
        fr = np.fft.rfftfreq(m, 1 / SR)
        spec *= 1 / np.sqrt(1 + (fr / damp) ** 2)
        ir = np.fft.irfft(spec, m)
        ir /= np.sqrt((ir ** 2).sum())
        pad = np.zeros(n)
        pad[:m] = ir
        out[c] = np.fft.irfft(np.fft.rfft(buf[c]) * np.fft.rfft(pad), n)
    return (1 - wet) * buf + wet * out * 2.2


def finish(buf, lp=9000, hp=38):
    curve = lambda fr: (1 / np.sqrt(1 + (fr / lp) ** 4)) * (fr ** 2 / (fr ** 2 + hp ** 2))
    return spectral(buf, curve)


# ---------------------------------------------------------------- concepts

BPM = 64
BEAT = 60 / BPM
BAR = 4 * BEAT


def concept_piano():
    """1 · Felt piano — 'The Back Room'. Sparse felt piano over a low drone,
    glass harmonics as punctuation. 40 bars at 64 BPM = 150 s."""
    L = Loop(40 * BAR, seed=11)
    rng = L.rng
    chords = [  # (bass, upper chord tones) — D minor, modal, slow
        (38, [53, 57, 60, 64, 65]),  # Dm9
        (34, [53, 57, 58, 62, 65]),  # Bbmaj7
        (33, [53, 57, 60, 64, 67]),  # Fmaj9/A
        (31, [53, 57, 58, 62, 65]),  # Gm9
        (38, [53, 57, 60, 62, 64]),  # Dm9
        (39, [55, 58, 62, 65, 69]),  # Ebmaj7#11
        (34, [53, 57, 60, 62, 65]),  # Bbmaj9
        (33, [52, 55, 57, 62, 64]),  # A7sus4 → back to Dm9
    ]
    per = 5  # bars per chord
    for ci, (root, tones) in enumerate(chords):
        c0 = ci * per * BAR
        # low drone: root + fifth, swelling across the chord, crossfaded into the next
        d = per * BAR + 6
        for f, g in ((midi(root), 0.9), (midi(root + 7), 0.35)):
            v = pad_voice(f, d, rng, bright=3)
            tt = np.arange(v.size) / SR
            env = np.sin(np.pi * np.clip(tt / d, 0, 1)) ** 1.5
            L.add(c0 - 3, v * env * g * 0.05, pan=rng.uniform(-0.2, 0.2))
        # left hand: the bass note, softly, on the chord change
        L.add(c0 + rng.uniform(0, 0.05), felt_piano(midi(root + 12), 7.0, 0.5, rng), pan=-0.25)
        # right hand: 1–3 notes a bar, some bars resting
        for b in range(per):
            if rng.random() < 0.22:
                continue
            nn = rng.choice([1, 2, 2, 3])
            beats = sorted(rng.choice([0, 1, 1.5, 2, 2.5, 3], size=nn, replace=False))
            for bt in beats:
                note = rng.choice(tones) + rng.choice([0, 0, 12])
                t0 = c0 + b * BAR + bt * BEAT + rng.normal(0, 0.03)
                L.add(t0, felt_piano(midi(note), 6.5, rng.uniform(0.35, 0.62), rng),
                      pan=np.clip((note - 64) / 24, -0.6, 0.6))
        # one glass harmonic every other chord, high in the chord
        if ci % 2 == 1:
            g = glass(midi(rng.choice(tones) + 24), 7.0, rng)
            L.add(c0 + rng.uniform(2, 8), g, pan=rng.uniform(-0.7, 0.7))
    L.buf = reverb(L.buf, seconds=4.2, wet=0.36)
    L.buf = finish(L.buf, lp=7800)
    return L


def concept_texture():
    """2 · Textural — 'Under the Surface'. Slow pad fields, a liquid noise bed,
    sub swells and rubbed-glass harmonics; almost no notes. 156 s."""
    L = Loop(156.0, seed=23)
    rng = L.rng
    chords = [  # D lydian / modal drift
        [50, 57, 62, 64, 66, 71],   # D6/9
        [47, 54, 59, 62, 64, 69],   # Bm11
        [43, 55, 59, 62, 66, 73],   # Gmaj7#11
        [40, 52, 59, 62, 66, 67],   # Em9
        [43, 55, 59, 64, 66, 69],   # Gmaj13
        [45, 52, 57, 62, 64, 66],   # A6sus
    ]
    seg = L.seconds / len(chords)
    for ci, tones in enumerate(chords):
        c0 = ci * seg
        d = seg + 12
        for j, nte in enumerate(tones):
            v = pad_voice(midi(nte), d, rng, bright=4 if nte > 50 else 2)
            tt = np.arange(v.size) / SR
            env = np.sin(np.pi * np.clip((tt - j * 0.9) / (d - j * 0.9), 0, 1)) ** 2
            L.add(c0 - 6, v * env * (0.028 if nte > 50 else 0.05), pan=rng.uniform(-0.6, 0.6))
    # liquid bed: noise, band-limited, gently breathing (whole cycles per loop)
    noise = rng.standard_normal((2, L.n))
    bed = spectral(noise, lambda fr: np.exp(-((np.log(fr + 1) - np.log(520)) ** 2) / 0.35))
    bed *= (0.6 + 0.4 * L.lfo(5)) * (0.8 + 0.2 * L.lfo(13, 1.0))
    L.buf += bed / np.abs(bed).max() * 0.012
    # sub swells at the two halves
    for t0 in (0.0, L.seconds / 2):
        d = 22
        tt = np.arange(int(d * SR)) / SR
        sub = np.sin(TAU * midi(26) * tt) * np.sin(np.pi * tt / d) ** 2 * 0.05
        L.add(t0 + 4, sub)
    # rubbed glass, irregular
    t = 3.0
    while t < L.seconds:
        tones = chords[int(t // seg) % len(chords)]
        L.add(t, glass(midi(rng.choice(tones[2:]) + 24), 8.5, rng), pan=rng.uniform(-0.8, 0.8), gain=0.9)
        t += rng.uniform(7, 13)
    # a single distant felt note per chord, very low in the mix
    for ci, tones in enumerate(chords):
        L.add(ci * seg + rng.uniform(6, 14), felt_piano(midi(tones[3] + 12), 6.0, 0.3, rng), pan=0.3, gain=0.5)
    L.buf = reverb(L.buf, seconds=6.0, wet=0.5, damp=4200)
    L.buf = finish(L.buf, lp=6500)
    return L


def concept_trio():
    """3 · Nocturne trio — 'Last Orders'. Restrained jazz-adjacent: brushed
    time, a walking-ish upright, dark electric piano comping. 48 bars = 180 s."""
    L = Loop(48 * BAR, seed=37)
    rng = L.rng
    form = [  # (root, bass walk targets, voicing) — Db major, 2 bars each, 16-bar form
        (51, [51, 58], [61, 65, 66, 70]),   # Ebm9
        (44, [44, 51], [60, 63, 65, 66]),   # Ab13
        (49, [49, 56], [60, 63, 65, 68]),   # Dbmaj9
        (42, [42, 49], [58, 61, 65, 68]),   # Gbmaj9
        (48, [48, 54], [58, 63, 66, 70]),   # Cm7b5
        (41, [41, 48], [57, 60, 63, 66]),   # F7b9
        (46, [46, 53], [56, 60, 61, 65]),   # Bbm9
        (46, [46, 45], [56, 61, 62, 67]),   # Bb7(13) → Ebm9
    ]
    for rep in range(3):
        for ci, (root, walk, voic) in enumerate(form):
            c0 = (rep * 16 + ci * 2) * BAR
            # bass: half notes, one approach note into the next chord
            nxt = form[(ci + 1) % len(form)][0]
            line = [walk[0], walk[1], walk[0] + rng.choice([3, 4, 7]), nxt + rng.choice([-1, 1])]
            for k, nte in enumerate(line):
                f = midi(nte - 12 if nte > 50 else nte)
                L.add(c0 + k * 2 * BEAT + rng.normal(0, 0.01), bass_pluck(f, 2 * BEAT + 0.3, rng.uniform(0.55, 0.8), rng), pan=-0.1)
            # comping: one or two soft voicings per two bars, sometimes anticipated
            hits = [0.0] if rng.random() < 0.5 else [0.0, rng.choice([5.5, 6.0, 6.5])]
            if rep == 1 and ci % 2 == 1:
                hits = [-0.5]  # anticipation from the previous bar
            for h in hits:
                vel = rng.uniform(0.45, 0.65)
                for j, nte in enumerate(voic):
                    L.add(c0 + h * BEAT + j * 0.012 + rng.normal(0, 0.006), epiano(midi(nte), 3.2, vel, rng), pan=0.25 + 0.08 * j)
            # brushes: swish on every beat, tap on 2 and 4
            for b in range(8):
                L.add(c0 + b * BEAT, brush(BEAT * 0.95, 0.5, rng), pan=0.35)
                if b % 2 == 1:
                    L.add(c0 + b * BEAT + 0.005, brush(0.25, 0.55, rng, swish=False), pan=0.3)
        # one glass harmonic per form, the house signature
        L.add(rep * 16 * BAR + rng.uniform(20, 40), glass(midi(rng.choice([77, 80, 84])), 7.0, rng), pan=-0.6, gain=0.8)
    L.buf = reverb(L.buf, seconds=2.8, wet=0.26, damp=6000)
    L.buf = finish(L.buf, lp=8500, hp=34)
    return L


CONCEPTS = {
    "01-felt-piano-back-room": concept_piano,
    "02-textural-under-the-surface": concept_texture,
    "03-nocturne-trio-last-orders": concept_trio,
}


def write_wav(path, buf, bits=24):
    x = np.clip(buf.T, -1, 1)
    if bits == 24:
        ints = (x * (2 ** 23 - 1)).astype(np.int32)
        b = ints.astype("<i4").tobytes()
        raw = bytearray()
        for i in range(0, len(b), 4):
            raw += b[i:i + 3]
        sw = 3
    else:
        raw = (x * 32767).astype("<i2").tobytes()
        sw = 2
    with wave.open(path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(sw)
        w.setframerate(SR)
        w.writeframes(bytes(raw))


if __name__ == "__main__":
    out = sys.argv[1]
    only = sys.argv[2:] or list(CONCEPTS)
    meta = {}
    for name in only:
        L = CONCEPTS[name]()
        buf = L.buf - L.buf.mean(axis=1, keepdims=True)
        buf /= np.abs(buf).max() / 0.5  # headroom; loudness set afterwards by linear gain
        write_wav(f"{out}/{name}.raw.wav", buf, bits=24)
        seam = np.abs(buf[:, 0] - buf[:, -1]).max()
        typical = np.median(np.abs(np.diff(buf, axis=1)))
        meta[name] = {"seconds": L.seconds, "samples": L.n, "seam_jump": float(seam), "median_step": float(typical)}
        print(name, json.dumps(meta[name]))
    json.dump(meta, open(f"{out}/render-meta.json", "w"), indent=2)
