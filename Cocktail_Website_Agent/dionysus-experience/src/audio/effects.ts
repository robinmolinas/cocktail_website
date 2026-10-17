import { EffectPolicy, panFor, semitones, type EffectConditions, type EffectId, type EffectOptions } from './effects-policy';
import type { Root } from './cues';

const BASE = `${import.meta.env.BASE_URL}audio/effects/`;
const IDS: EffectId[] = ['touch', 'untouch', 'seal', 'ink'];
// manifest-v2.json runtimeGain: each sound's loudest 400 ms sits under the
// beds' median loudness by touch 17.5, untouch 22, seal 16, ink 25 dB
// (5 dB down after Robin's listen: "a bit too loud, quieter/smoother").
const GAIN: Record<EffectId, number> = { touch: 0.0294, untouch: 0.02, seal: 0.039, ink: 0.0187 };
const MAX_VOICES = 4;

type Voice = { source: AudioBufferSourceNode; gain: GainNode; nodes: AudioNode[] };

/** One-shot voices owned by Score: same context, preference and master, fed
 * into the score's own depth filter so a gesture sits in the water with the
 * music (muffled in the hush, opening on the ascents). No new context, unlock
 * or timers, and nothing plays on behalf of a late fetch. The sounds are
 * synthesised in the score's key (render_v2.py beside the manifest). */
export class ScoreEffects {
  private policy = new EffectPolicy();
  private buffers = new Map<EffectId, Promise<AudioBuffer>>();
  private voices: Voice[] = [];
  private ctx: AudioContext;
  private output: AudioNode;
  private conditions: () => EffectConditions;
  private report: (event: string) => void;

  constructor(
    ctx: AudioContext,
    output: AudioNode,
    conditions: () => EffectConditions,
    report: (event: string) => void,
  ) {
    this.ctx = ctx;
    this.output = output;
    this.conditions = conditions;
    this.report = report;
  }

  prepare() {
    if (!this.policy.allowed(this.conditions())) return;
    for (const id of IDS) void this.load(id).catch(() => {});
  }

  play(id: EffectId, root: Root, opts: EffectOptions = {}) {
    const ticket = this.policy.reserve(id, this.ctx.currentTime, this.conditions());
    if (!ticket) return;
    void this.load(id).then((buffer) => {
      if (!this.policy.current(ticket, this.ctx.currentTime, this.conditions())) return;
      // a new gesture is never the one that goes silent: the oldest ring gives way
      while (this.voices.length >= MAX_VOICES) this.release(this.voices.shift()!, 0.06);
      const ctx = this.ctx;
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      // An audio sample's pitch: the glass is retuned to the chord tone (and a
      // few cents of a hand's unevenness). The journey video's speed is never touched.
      const cents = (Math.random() - 0.5) * 8;
      source.playbackRate.value = 2 ** ((semitones(id, root, opts.step, ticket.stroke) + cents / 100) / 12);
      const gain = ctx.createGain();
      gain.gain.value = GAIN[id] * ticket.level * 10 ** (((Math.random() - 0.5) * 1.4) / 20);
      const nodes: AudioNode[] = [gain];
      let tail: AudioNode = gain;
      const pan = panFor(opts.x);
      if (pan !== 0 && typeof ctx.createStereoPanner === 'function') {
        const panner = ctx.createStereoPanner();
        panner.pan.value = pan;
        gain.connect(panner);
        nodes.push(panner);
        tail = panner;
      }
      source.connect(gain);
      tail.connect(this.output);
      const voice: Voice = { source, gain, nodes };
      this.voices.push(voice);
      source.onended = () => {
        this.voices = this.voices.filter((v) => v !== voice);
        source.disconnect();
        for (const n of nodes) n.disconnect();
      };
      source.start();
      this.report(`effect ${id}${opts.step ? ` step ${opts.step}` : ''}`);
    }).catch(() => { /* missing audio never interrupts a gesture */ });
  }

  /** a chapter changes: nothing queued plays late, but what rings rings out
   *  (a seal carries into the next chapter, which enters on the same D#) */
  settle() { this.policy.cancel(); }

  /** mute, a hidden tab, the splash, leaving: everything stops, softly */
  stop(fade = 0.12) {
    this.policy.cancel();
    for (const v of this.voices.splice(0)) this.release(v, fade);
  }

  private release(v: Voice, fade: number) {
    const now = this.ctx.currentTime;
    v.gain.gain.cancelScheduledValues(now);
    v.gain.gain.setValueAtTime(v.gain.gain.value, now);
    v.gain.gain.setTargetAtTime(0, now, fade / 3);
    try { v.source.stop(now + fade + 0.02); } catch { /* already ended */ }
  }

  private load(id: EffectId) {
    let result = this.buffers.get(id);
    if (!result) {
      result = fetch(BASE + id + '.mp3')
        .then((r) => r.ok ? r.arrayBuffer() : Promise.reject(new Error(String(r.status))))
        .then((bytes) => this.ctx.decodeAudioData(bytes));
      this.buffers.set(id, result);
      result.catch(() => { this.buffers.delete(id); });
    }
    return result;
  }
}
