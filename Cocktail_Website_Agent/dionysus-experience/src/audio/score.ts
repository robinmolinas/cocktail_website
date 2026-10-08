// The score's single audio director (ARCHITECTURE-SPINE: one audio owner;
// music never gates a phase or a video transition; it fails silently).
//
// The music is one suite cut into chapter cues (./cues.ts). The journey is
// self-paced, so the director re-sequences: each stage names a cue and a mix,
// the cue loops while the guest stays, and a stage change crossfades forward.
// Stages REPORT to it; nothing awaits it. With no AudioContext, a blocked
// unlock, or a failed fetch, every call is a no-op and the journey is unchanged.
//
// The arc (Water & Ink, master spec): the entrance is silent; the depths fade
// in out of the descent; ascents open the filter as the camera moves; H7 is a
// hush; H8 is the one rise; the H9 wash lands on the splash (the loudest
// moment); the unveiling is silent; H10 blooms the answer, then the gentlest
// bed under the letter.
//
// Ownership seam: App owns the phases and is not ours to edit, so the reading
// is found by watching for TheReading's root (.tr-root) after the depths
// surface, and its removal sends the score home. If App ever reports phases
// itself, that watcher is the one piece to replace.

import { CUES, JOURNEY_ORDER, WASH_AT, entryOn, rootAt, type CueId } from './cues';

type Mix = { level: number; cutoff: number; tau: number };
type Want = { cue: CueId; mix: Mix; fadeIn: number; fadeOut: number; offset?: number };
type Voice = { cue: CueId; src: AudioBufferSourceNode; gain: GainNode; startedAt: number; offset: number };
export type ScoreState = { enabled: boolean; unavailable: boolean };

const BASE = `${import.meta.env.BASE_URL}audio/score/`;
const PREF_KEY = 'dionysus.sound';
const MASTER = 0.7;
/** H9: the drop's release → the crown in the footage (RELEASE_FALL_MS + the first frames of the splash) */
const SPLASH_LEAD = 1.3;
/** H10: the name finishes inking at 2.4 s + 1.6 s (TheReading); the answer waits for it */
const ANSWER_DELAY = 4.2;
const ANSWER_DELAY_STILL = 2.0;
/** the answer blooms, then the bed rises under it as it decays */
const BED_AFTER = 6;
const MAX_DECODED = 4;

// level is relative to the master; cutoff is the low-pass (the water's depth);
// tau is the time constant of the move (~95% arrives at 3×).
const MIX = {
  threshold: { level: 0.85, cutoff: 6500, tau: 1.6 },
  seed:      { level: 0.9,  cutoff: 9000, tau: 1.6 },
  gravity:   { level: 0.95, cutoff: 9000, tau: 1.6 },
  hidden:    { level: 0.95, cutoff: 9000, tau: 1.6 },
  resonance: { level: 1,    cutoff: 11000, tau: 2 },
  finish:    { level: 0.9,  cutoff: 10000, tau: 2 },
  hush:      { level: 0.42, cutoff: 2800, tau: 2.2 },  // H7: a held breath while she writes
  breath:    { level: 1,    cutoff: 14000, tau: 3.2 }, // H8: the rise, a tide never a hit
  answer:    { level: 1,    cutoff: 12000, tau: 0.4 },  // the resolution: as present as the depths
  reading:   { level: 0.5,  cutoff: 5000, tau: 5 },    // H10: domesticated, under the letter
} satisfies Record<string, Mix>;

// TheDepths' stages → cue, mix and the crossfade into it. An ascent starts the
// next chapter's cue as the camera moves (and brightens it); the hold settles.
const STAGES: Record<string, { cue: CueId; mix: Mix; fade: number; moving?: boolean }> = {
  arrive:    { cue: 'pressure', mix: MIX.threshold, fade: 0.05 }, // the file swells out of silence on its own
  lines:     { cue: 'pressure', mix: MIX.threshold, fade: 2 },
  name:      { cue: 'pressure', mix: MIX.threshold, fade: 2 },
  lens:      { cue: 'pressure', mix: MIX.threshold, fade: 2 },
  ascend1:   { cue: 'firstlight', mix: MIX.seed, fade: 3.5, moving: true },
  seed:      { cue: 'firstlight', mix: MIX.seed, fade: 3.5 },
  ascend2:   { cue: 'current', mix: MIX.gravity, fade: 3, moving: true },
  gravity:   { cue: 'current', mix: MIX.gravity, fade: 3 },
  ascend3:   { cue: 'question', mix: MIX.hidden, fade: 3, moving: true },
  hidden:    { cue: 'question', mix: MIX.hidden, fade: 3 },
  ascend4:   { cue: 'world', mix: MIX.resonance, fade: 5, moving: true }, // with the 5.5 s nightfall
  resonance: { cue: 'world', mix: MIX.resonance, fade: 5 },
  ascend5:   { cue: 'world', mix: MIX.finish, fade: 3, moving: true },
  finish:    { cue: 'world', mix: MIX.finish, fade: 3 },
  ascend6:   { cue: 'firstlight', mix: MIX.hush, fade: 4, moving: true },
  trace:     { cue: 'firstlight', mix: MIX.hush, fade: 4 },
  ascend7:   { cue: 'rise', mix: MIX.breath, fade: 2.5, moving: true },
  breath:    { cue: 'rise', mix: MIX.breath, fade: 2.5 },
  // 'surface' is release()'s: the letting-go cue is already timed to the splash
};

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** equal-power fade on `param` from wherever it is now to `to` */
function fade(ctx: AudioContext, param: AudioParam, to: number, dur: number) {
  const t = ctx.currentTime;
  const from = param.value;
  param.cancelScheduledValues(t);
  param.setValueAtTime(from, t);
  if (dur < 0.06) { param.linearRampToValueAtTime(to, t + Math.max(dur, 0.01)); return; }
  const n = 48;
  const curve = new Float32Array(n);
  const rising = to > from;
  for (let i = 0; i < n; i++) {
    const p = i / (n - 1);
    curve[i] = rising ? from + (to - from) * Math.sin((p * Math.PI) / 2) : to + (from - to) * Math.cos((p * Math.PI) / 2);
  }
  param.setValueCurveAtTime(curve, t + 0.005, dur);
}

function glide(ctx: AudioContext, param: AudioParam, to: number, tau: number) {
  const t = ctx.currentTime;
  param.cancelScheduledValues(t);
  param.setValueAtTime(param.value, t);
  param.setTargetAtTime(to, t, tau);
}

class Score {
  private ctx: AudioContext | null = null;
  private filter: BiquadFilterNode | null = null;
  private scene: GainNode | null = null;
  private user: GainNode | null = null;
  private master: GainNode | null = null;
  private bytes = new Map<CueId, Promise<ArrayBuffer>>();
  private decoded = new Map<CueId, Promise<AudioBuffer>>();
  private voices: Voice[] = [];
  private want: Want | null = null;
  private wantMoving = false;
  private token = 0;
  private enabled = true;
  private unavailable = false;
  private snap: ScoreState = { enabled: true, unavailable: false };
  private listeners = new Set<() => void>();
  private releasedAt = 0;
  private surfacedAt = 0;
  private readingOn = false;
  private observer: MutationObserver | null = null;
  private timers: number[] = [];
  private hideTimer = 0;
  private leaveTimer = 0;
  /** dev-only: what the director did, on the audio clock */
  readonly log: { t: number; what: string }[] = [];

  constructor() {
    if (typeof window === 'undefined') return;
    this.enabled = Score.preference() !== 'off';
    this.snap = { enabled: this.enabled, unavailable: false };
    // The first gesture anywhere unlocks audio; the landing's door is the one
    // that matters (it is the only way into the depths), so the descent can
    // start the score 1.55 s later without asking again.
    for (const ev of ['pointerdown', 'pointerup', 'click', 'touchend', 'keydown']) {
      window.addEventListener(ev, this.unlock, { capture: true, passive: true });
    }
    document.addEventListener('visibilitychange', this.onVisibility);
    // the first two chapters are fetched while she reads the landing
    const idle = (window as Window & { requestIdleCallback?: (fn: () => void) => number }).requestIdleCallback;
    const later = (fn: () => void) => (idle ? idle(fn) : window.setTimeout(fn, 2500));
    later(() => {
      const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
      if (this.enabled && !saveData) { this.fetchBytes('pressure'); this.fetchBytes('firstlight'); }
    });
  }

  static preference(): 'on' | 'off' | null {
    try { return localStorage.getItem(PREF_KEY) as 'on' | 'off' | null; } catch { return null; }
  }

  // ---------- the control's store (useSyncExternalStore) ----------
  subscribe = (fn: () => void) => { this.listeners.add(fn); return () => { this.listeners.delete(fn); }; };
  snapshot = () => this.snap;
  private emit() {
    this.snap = { enabled: this.enabled, unavailable: this.unavailable };
    for (const fn of this.listeners) fn();
  }

  toggle() {
    this.enabled = !this.enabled;
    try { localStorage.setItem(PREF_KEY, this.enabled ? 'on' : 'off'); } catch { /* private mode: the choice lasts the visit */ }
    this.mark(this.enabled ? 'sound on' : 'sound off');
    this.emit();
    const ctx = this.ensureContext();
    if (!ctx || !this.user) return;
    if (this.enabled) {
      if (ctx.state === 'suspended') void ctx.resume().then(() => this.reconcile());
      glide(ctx, this.user.gain, 1, 0.3);
      // a reading arrived at without the journey (the friend's gift, a reload):
      // turning sound on is the invitation, so the answer plays there too
      if (!this.want && document.querySelector('.tr-root')) this.enterReading();
      else this.reconcile();
    } else {
      glide(ctx, this.user.gain, 0, 0.15);
      window.setTimeout(() => { if (!this.enabled) this.stopAll(0.05); }, 900);
    }
  }

  // ---------- what TheDepths reports ----------
  /** every stage change in the depths */
  depths(stage: string) {
    this.surfacedAt = 0;
    this.leaveReading(false);
    const st = STAGES[stage];
    if (!st) return;
    this.mark(`stage ${stage}`);
    this.go({ cue: st.cue, mix: st.mix, fadeIn: st.fade, fadeOut: Math.max(st.fade, 1.5) }, !!st.moving);
  }

  /** H9 · the spirit-point lets go: the wash is timed to land on the splash */
  release() {
    this.releasedAt = performance.now();
    this.mark('release');
    this.go({ cue: 'lettinggo', mix: MIX.breath, fadeIn: 0.9, fadeOut: 1.2, offset: WASH_AT - SPLASH_LEAD }, false);
    const ctx = this.ctx;
    if (ctx && this.scene && this.filter && ctx.state === 'running') {
      // the splash: the loudest moment of the piece, the bloom bleaching the sound
      const at = ctx.currentTime + SPLASH_LEAD - 0.12;
      this.scene.gain.cancelScheduledValues(ctx.currentTime);
      this.scene.gain.setValueAtTime(this.scene.gain.value, ctx.currentTime);
      this.scene.gain.setTargetAtTime(1.7, at, 0.14);
      this.filter.frequency.cancelScheduledValues(ctx.currentTime);
      this.filter.frequency.setValueAtTime(this.filter.frequency.value, ctx.currentTime);
      this.filter.frequency.setTargetAtTime(19000, at, 0.08);
    }
  }

  /** the dark has taken the frame: the unveiling is silent, then the reading */
  surfaced() {
    this.mark('surfaced');
    this.surfacedAt = performance.now();
    this.want = null;
    const ctx = this.ctx;
    if (ctx && this.scene) glide(ctx, this.scene.gain, 0, 0.35); // gone before the nib starts (~2.7 s)
    this.later(3000, () => { if (!this.want) this.stopAll(0.2); });
    this.watchReading();
  }

  /** TheDepths unmounted without surfacing (the mark home, a dev remount) */
  depthsLeft() {
    if (this.surfacedAt) return;
    this.mark('depths left');
    this.go(null);
  }

  // ---------- the reading (found by its root, see the seam note above) ----------
  private watchReading() {
    if (this.observer) return;
    const check = () => {
      const present = !!document.querySelector('.tr-root');
      if (present && !this.readingOn) {
        this.enterReading();
      } else if (!present && this.readingOn) {
        // TheReading remounts itself on a replay; only a real absence leaves
        window.clearTimeout(this.leaveTimer);
        this.leaveTimer = window.setTimeout(() => { if (!document.querySelector('.tr-root')) this.leaveReading(true); }, 600);
      } else if (!present && this.surfacedAt && performance.now() - this.surfacedAt > 30000) {
        this.stopWatching(); // the reveal went home instead
      }
    };
    this.observer = new MutationObserver(check);
    this.observer.observe(document.body, { childList: true, subtree: true });
    check();
  }

  private enterReading() {
    this.readingOn = true;
    this.watchReading();
    this.mark('reading');
    const journey = !!this.surfacedAt;
    const delay = journey ? (reducedMotion() ? ANSWER_DELAY_STILL : ANSWER_DELAY) * 1000 : 400;
    this.later(delay, () => {
      if (!this.readingOn) return;
      this.mark('answer');
      this.go({ cue: 'answer', mix: MIX.answer, fadeIn: 1.2, fadeOut: 1.5 }, false);
      this.later(BED_AFTER * 1000, () => {
        if (!this.readingOn) return;
        this.mark('reading bed');
        this.go({ cue: 'current', mix: MIX.reading, fadeIn: 10, fadeOut: 12, offset: CUES.current.loopStart }, false);
      });
    });
  }

  private leaveReading(fadeOut: boolean) {
    const was = this.readingOn;
    this.readingOn = false;
    this.stopWatching();
    if (was && fadeOut) {
      this.mark('reading left');
      this.go(null);
    }
  }

  private stopWatching() {
    this.observer?.disconnect();
    this.observer = null;
  }

  // ---------- engine ----------
  private go(want: Want | null, moving = false) {
    for (const t of this.timers.splice(0)) window.clearTimeout(t);
    this.want = want;
    this.wantMoving = moving;
    this.applyMix();
    this.reconcile();
    if (want) this.prefetchAfter(want.cue);
  }

  private applyMix() {
    const ctx = this.ctx;
    if (!ctx || !this.scene || !this.filter || !this.want) return;
    const m = this.want.mix;
    glide(ctx, this.scene.gain, m.level, m.tau);
    // an ascent: the water brightens as the camera moves, then settles at the hold
    if (this.wantMoving) glide(ctx, this.filter.frequency, Math.min(16000, m.cutoff * 1.7), 0.5);
    else glide(ctx, this.filter.frequency, m.cutoff, m.tau);
  }

  private reconcile() {
    const ctx = this.ctx;
    if (!ctx || ctx.state !== 'running' || !this.enabled) return;
    const want = this.want;
    if (!want) { this.stopAll(1.6); return; }
    const top = this.voices[this.voices.length - 1];
    if (top && top.cue === want.cue) return; // same cue across stages: only the mix moves
    const token = ++this.token;
    this.decode(want.cue).then((buf) => {
      if (token !== this.token || this.want !== want || !this.enabled) return;
      this.startVoice(buf, want);
    }, () => { /* a cue that will not load: the chapter stays as it was */ });
  }

  private startVoice(buf: AudioBuffer, w: Want) {
    const ctx = this.ctx!;
    const cue = CUES[w.cue];
    const src = ctx.createBufferSource();
    src.buffer = buf;
    if (cue.loopStart != null && cue.loopEnd != null) {
      src.loop = true;
      src.loopStart = cue.loopStart;
      src.loopEnd = cue.loopEnd;
    }
    let offset = w.offset ?? this.entryFor(w.cue);
    // a late decode must not slide the wash off the splash
    if (w.cue === 'lettinggo' && this.releasedAt) offset += (performance.now() - this.releasedAt) / 1000;
    if (offset >= buf.duration - 0.05) return;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    src.connect(gain).connect(this.filter!);
    const t = ctx.currentTime + 0.01;
    src.start(t, offset);
    fade(ctx, gain.gain, 1, w.fadeIn);
    for (const v of [...this.voices]) this.retire(v, w.fadeOut);
    const voice: Voice = { cue: w.cue, src, gain, startedAt: t, offset };
    src.onended = () => {
      gain.disconnect();
      this.voices = this.voices.filter((x) => x !== voice);
    };
    this.voices.push(voice);
    this.mark(`play ${w.cue} @${offset.toFixed(2)}`);
  }

  /** where a voice is in its file now, following its loop */
  private position(v: Voice) {
    const cue = CUES[v.cue];
    let pos = v.offset + Math.max(0, this.ctx!.currentTime - v.startedAt);
    if (cue.loopStart != null && cue.loopEnd != null && pos >= cue.loopEnd) {
      pos = cue.loopStart + ((pos - cue.loopStart) % (cue.loopEnd - cue.loopStart));
    }
    return pos;
  }

  /** a chapter enters on the chord already sounding, so the crossfade never
   *  beats two roots against each other; it moves on in its own time */
  private entryFor(id: CueId) {
    const top = this.voices[this.voices.length - 1];
    if (!top || !CUES[id].chords) return 0;
    const root = rootAt(CUES[top.cue], this.position(top) + 1.5); // the root mid-crossfade
    return entryOn(CUES[id], root) ?? 0;
  }

  private retire(v: Voice, dur: number) {
    const ctx = this.ctx!;
    // out of the list at once, so a quick off-and-on starts afresh instead of
    // mistaking a fading voice for the chapter still playing
    this.voices = this.voices.filter((x) => x !== v);
    fade(ctx, v.gain.gain, 0, dur);
    try { v.src.stop(ctx.currentTime + dur + 0.1); } catch { /* already stopped */ }
  }

  private stopAll(dur: number) {
    if (!this.ctx) return;
    for (const v of [...this.voices]) this.retire(v, dur);
  }

  private fetchBytes(id: CueId) {
    let p = this.bytes.get(id);
    if (!p) {
      p = fetch(BASE + CUES[id].file).then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error(`${r.status}`))));
      p.catch(() => this.bytes.delete(id));
      this.bytes.set(id, p);
    }
    return p;
  }

  private decode(id: CueId) {
    const ctx = this.ctx!;
    let p = this.decoded.get(id);
    if (p) {
      this.decoded.delete(id); // re-insert: most recently used last
      this.decoded.set(id, p);
      return p;
    }
    // decodeAudioData detaches its buffer, so it gets a copy and the bytes stay cached
    p = this.fetchBytes(id).then((ab) => ctx.decodeAudioData(ab.slice(0)));
    p.catch(() => this.decoded.delete(id));
    this.decoded.set(id, p);
    // a 30 s stereo cue is ~11 MB decoded; keep a few, never one in use
    while (this.decoded.size > MAX_DECODED) {
      const busy = new Set<CueId>([...this.voices.map((v) => v.cue), ...(this.want ? [this.want.cue] : [])]);
      const old = [...this.decoded.keys()].find((k) => !busy.has(k) && k !== id);
      if (!old) break;
      this.decoded.delete(old);
    }
    return p;
  }

  private prefetchAfter(id: CueId) {
    if (!this.enabled) return; // sound off costs her no data
    const i = JOURNEY_ORDER.indexOf(id);
    const next = JOURNEY_ORDER.slice(i + 1, i + 3);
    for (const n of next) this.fetchBytes(n);
    // the next chapter is decoded ahead so its crossfade starts on the stage change
    if (this.ctx && next[0]) this.decode(next[0]).catch(() => {});
  }

  private ensureContext() {
    if (this.ctx || this.unavailable) return this.ctx;
    const Ctx = window.AudioContext ?? (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) {
      this.unavailable = true;
      this.emit();
      return null;
    }
    let ctx: AudioContext;
    try { ctx = new Ctx({ latencyHint: 'playback', sampleRate: 44100 }); } catch { ctx = new Ctx(); }
    this.ctx = ctx;
    this.filter = ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.Q.value = 0.5;
    this.filter.frequency.value = MIX.threshold.cutoff;
    this.scene = ctx.createGain();
    this.scene.gain.value = 0;
    this.user = ctx.createGain();
    this.user.gain.value = this.enabled ? 1 : 0;
    this.master = ctx.createGain();
    this.master.gain.value = MASTER;
    this.filter.connect(this.scene).connect(this.user).connect(this.master).connect(ctx.destination);
    return ctx;
  }

  private unlock = () => {
    const ctx = this.ensureContext();
    if (!ctx) return this.dropUnlock();
    // iOS unlocks on a sound started inside the gesture: one silent sample
    const b = ctx.createBuffer(1, 1, ctx.sampleRate);
    const s = ctx.createBufferSource();
    s.buffer = b;
    s.connect(ctx.destination);
    s.start();
    if (ctx.state === 'running') { this.unlocked(); return; }
    void ctx.resume().then(() => { if (ctx.state === 'running') this.unlocked(); }, () => {});
  };

  private unlocked() {
    this.dropUnlock();
    this.applyMix();
    // a reading opened without the journey (the friend's gift): sound is on,
    // so her first touch brings the room's music, as the door does for a guest
    if (this.enabled && !this.want && !this.readingOn && document.querySelector('.tr-root')) this.enterReading();
    else this.reconcile();
  }

  private dropUnlock() {
    for (const ev of ['pointerdown', 'pointerup', 'click', 'touchend', 'keydown']) {
      window.removeEventListener(ev, this.unlock, { capture: true });
    }
  }

  private onVisibility = () => {
    const ctx = this.ctx;
    if (!ctx || !this.user) return;
    window.clearTimeout(this.hideTimer);
    if (document.hidden) {
      glide(ctx, this.user.gain, 0, 0.15);
      this.hideTimer = window.setTimeout(() => { void ctx.suspend().catch(() => {}); }, 600);
    } else {
      void ctx.resume().then(() => {
        if (this.user) glide(ctx, this.user.gain, this.enabled ? 1 : 0, 0.5);
        this.reconcile();
      }, () => {});
    }
  };

  private later(ms: number, fn: () => void) {
    this.timers.push(window.setTimeout(fn, ms));
  }

  private mark(what: string) {
    if (import.meta.env.DEV) this.log.push({ t: this.ctx ? +this.ctx.currentTime.toFixed(3) : -1, what });
  }

  /** dev-only: record exactly what the guest hears, for listening back */
  debugRecord() {
    const ctx = this.ctx;
    if (!import.meta.env.DEV || !ctx || !this.master) return null;
    const dest = ctx.createMediaStreamDestination();
    this.master.connect(dest);
    const rec = new MediaRecorder(dest.stream, { mimeType: 'audio/webm;codecs=opus', audioBitsPerSecond: 192000 });
    const chunks: Blob[] = [];
    rec.ondataavailable = (e) => chunks.push(e.data);
    rec.start(1000);
    const t0 = ctx.currentTime;
    return {
      t0,
      stop: () => new Promise<Blob>((resolve) => {
        rec.onstop = () => { this.master?.disconnect(dest); resolve(new Blob(chunks, { type: 'audio/webm' })); };
        rec.stop();
      }),
    };
  }
}

export const score = new Score();

if (import.meta.env.DEV && typeof window !== 'undefined') {
  (window as Window & { __score?: Score }).__score = score;
}
