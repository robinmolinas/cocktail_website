// Dionysus sound engine: reference implementation for the experience owner.
//
// One audio owner (ARCHITECTURE-SPINE: "one audio owner; music never gates a
// stage or video transition"). Nothing here returns a promise the journey
// waits on: if audio cannot load or is blocked, every call is a no-op and the
// silent experience carries on unchanged.
//
// Gapless loop: HTMLAudioElement.loop leaves a gap with compressed formats
// (encoder priming and padding), so the loop plays from a decoded
// AudioBuffer with loopStart/loopEnd. Each web file is the loop with 2 s of
// its own tail before it and 2 s of its own head after it. Any window of
// exactly one loop length inside that file is seamless, so a few
// milliseconds of decoder offset cannot open a seam.
//
// Port to TypeScript by adding types; the logic needs no framework.

/** Scene targets: level relative to the master, low-pass cutoff, and the time
 *  constant of the move (seconds; ~95% arrival takes 3× this). */
export const SCENES = {
  silent:    { level: 0,    cutoff: 900,   tau: 0.6 },
  depths:    { level: 1,    cutoff: 9000,  tau: 1.6 },  // H1–H6: the bed
  hush:      { level: 0.38, cutoff: 1500,  tau: 2.2 },  // H7 trace: "near-silent", a held breath
  surfacing: { level: 1,    cutoff: 14000, tau: 3.2 },  // H8 breath → H9 reveal: a slow opening, never a hit
  reading:   { level: 0.55, cutoff: 5200,  tau: 3.0 },  // H10: under the letter
};

const PREF_KEY = 'dionysus.sound';

export class SoundEngine {
  /** @param {{ base: string, manifest: Record<string, {loopStart:number, loopEnd:number, files:{opus:string, aac:string}}>, master?: number }} opts */
  constructor({ base, manifest, master = 0.6 }) {
    this.base = base;
    this.manifest = manifest;
    this.masterLevel = master;
    this.ctx = null;
    this.buffers = new Map();
    this.track = null;
    this.source = null;
    this.scene = 'silent';
    this.enabled = SoundEngine.preference() === 'on';
    this.unavailable = false;
    this.listeners = new Set();
    this.onVisibility = () => this.handleVisibility();
    document.addEventListener('visibilitychange', this.onVisibility);
  }

  /** 'on' | 'off' | null (never chosen). */
  static preference() {
    try { return localStorage.getItem(PREF_KEY); } catch { return null; }
  }

  subscribe(fn) { this.listeners.add(fn); return () => this.listeners.delete(fn); }
  emit() { for (const fn of this.listeners) fn(this.state()); }
  state() { return { enabled: this.enabled, unavailable: this.unavailable, scene: this.scene, track: this.track }; }

  format() {
    const a = document.createElement('audio');
    return a.canPlayType('audio/webm; codecs=opus') ? 'opus' : 'aac';
  }

  /** Must be called from a user gesture the first time (autoplay policy). */
  ensureContext() {
    if (this.ctx) return this.ctx;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) { this.unavailable = true; this.emit(); return null; }
    this.ctx = new Ctx();
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.Q.value = 0.5;
    this.filter.frequency.value = SCENES.silent.cutoff;
    this.sceneGain = this.ctx.createGain();
    this.sceneGain.gain.value = 0;
    this.userGain = this.ctx.createGain();      // the on/off control
    this.userGain.gain.value = 0;
    this.master = this.ctx.createGain();
    this.master.gain.value = this.masterLevel;
    this.filter.connect(this.sceneGain).connect(this.userGain).connect(this.master).connect(this.ctx.destination);
    return this.ctx;
  }

  async load(track) {
    if (this.buffers.has(track)) return this.buffers.get(track);
    const m = this.manifest[track];
    const res = await fetch(`${this.base}/${m.files[this.format()]}`);
    const buf = await this.ctx.decodeAudioData(await res.arrayBuffer());
    this.buffers.set(track, buf);
    return buf;
  }

  /** Start (or swap to) a track. Swaps crossfade over ~4 s; never call this per question. */
  async play(track) {
    if (!this.ensureContext()) return;
    try {
      const buf = await this.load(track);
      const m = this.manifest[track];
      const src = this.ctx.createBufferSource();
      src.buffer = buf;
      src.loop = true;
      src.loopStart = m.loopStart;
      src.loopEnd = m.loopEnd;
      const g = this.ctx.createGain();
      g.gain.value = 0;
      src.connect(g).connect(this.filter);
      const now = this.ctx.currentTime;
      src.start(now, m.loopStart);
      g.gain.setTargetAtTime(1, now, 1.3);
      if (this.source) {
        const old = this.source;
        old.gain.gain.cancelScheduledValues(now);
        old.gain.gain.setTargetAtTime(0, now, 1.3);
        old.src.stop(now + 6);
      }
      this.source = { src, gain: g };
      this.track = track;
      this.emit();
    } catch {
      this.unavailable = true;   // graceful silence: the journey never waits on this
      this.emit();
    }
  }

  /** The sound control. Call from the click handler (it is the user gesture). */
  async setEnabled(on) {
    this.enabled = on;
    try { localStorage.setItem(PREF_KEY, on ? 'on' : 'off'); } catch { /* private mode */ }
    if (!this.ensureContext()) return;
    const now = this.ctx.currentTime;
    this.userGain.gain.cancelScheduledValues(now);
    if (on) {
      if (this.ctx.state === 'suspended') await this.ctx.resume().catch(() => {});
      this.userGain.gain.setTargetAtTime(1, now, 0.8);
    } else {
      this.userGain.gain.setTargetAtTime(0, now, 0.25);
    }
    this.emit();
  }

  /** Journey stage → scene. Cheap to call on every stage change; same scene is a no-op. */
  setScene(name) {
    if (name === this.scene) return;
    this.scene = name;
    this.emit();
    if (!this.ctx) return;
    const s = SCENES[name];
    const now = this.ctx.currentTime;
    this.sceneGain.gain.cancelScheduledValues(now);
    this.sceneGain.gain.setTargetAtTime(s.level, now, s.tau);
    this.filter.frequency.cancelScheduledValues(now);
    this.filter.frequency.setTargetAtTime(s.cutoff, now, s.tau);
  }

  /** Background tab: fade out and suspend (saves battery, respects the room);
   *  return: resume and fade back in, only if the guest had sound on. */
  async handleVisibility() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    if (document.hidden) {
      this.master.gain.cancelScheduledValues(now);
      this.master.gain.setTargetAtTime(0, now, 0.2);
      setTimeout(() => { if (document.hidden) this.ctx.suspend().catch(() => {}); }, 900);
    } else {
      // the master always comes back (the on/off lives in userGain), but the
      // context only resumes if she had sound on — otherwise setEnabled resumes it
      if (this.enabled) await this.ctx.resume().catch(() => {});
      const t = this.ctx.currentTime;
      this.master.gain.cancelScheduledValues(t);
      this.master.gain.setTargetAtTime(this.masterLevel, t, 0.6);
    }
  }

  dispose() {
    document.removeEventListener('visibilitychange', this.onVisibility);
    this.ctx?.close();
  }
}
