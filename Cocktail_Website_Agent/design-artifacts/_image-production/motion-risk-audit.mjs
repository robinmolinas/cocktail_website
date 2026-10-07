// Read-only scene/stylesheet inspection; writes only this run's private report.
// Separate from the approved exporter. Not browser or glyph acceptance.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const project = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const stage = join(project, 'design-artifacts/_image-production/2026-10-06');
const queue = JSON.parse(readFileSync(join(stage, 'queue.json'), 'utf8'));
const css = readFileSync(join(project, 'dionysus-experience/src/index.css'), 'utf8');
const component = readFileSync(join(project, 'dionysus-experience/src/components/TheReading.tsx'), 'utf8');
const rest = Number(css.match(/--rest:\s*([\d.]+);/)?.[1]);
const ken = Number(css.match(/--ken:\s*([\d.]+);/)?.[1]);
if (rest !== 1.055 || ken !== 1.115 || !css.includes('translate3d(-1.6%, -1.2%, 0)') || !component.includes('(ox * 100).toFixed(1)')) {
  throw new Error('Runtime motion/rounding changed: inspect before updating this audit.');
}
const viewports = [[1920,1080],[1440,900],[2048,1036],[3440,1440],[390,844],[430,932],[320,568]];
const phases = [0, .25, .5, .75, 1];
const keep = (p, v, c, h) => {
  if (v >= 1) return p;
  const lo = (c+h-v)/(1-v), hi = (c-h)/(1-v);
  return Math.min(1, Math.max(0, lo > hi ? (c-v/2)/(1-v) : Math.min(Math.max(p, lo), hi)));
};
function inspect(pairing, version) {
  const path = join(stage, pairing, version, 'measurements.json');
  const m = JSON.parse(readFileSync(path, 'utf8'));
  const checks = viewports.map(([cw,ch]) => {
    const kind = cw <= 900 && ch > cw ? 'portrait' : 'wide';
    const [cx,cy,sw,sh] = m[`${kind}Crop`];
    const [iw,ih] = kind === 'wide' ? [1920,1080] : [896,1200];
    const scale = Math.max(cw/iw,ch/ih), pw = iw*scale, ph = ih*scale;
    const tag = { x:(m.tag.cx-cx)/sw, y:(m.tag.cy-cy)/sh, w:m.tag.w/sw };
    const glass = { x:(m.glass.x-cx)/sw, y:(m.glass.y-cy)/sh };
    const ox = Number((100*keep(kind === 'wide' ? .5 : glass.x, Math.min(1,cw/pw), tag.x, tag.w/2+.02)).toFixed(1))/100;
    const oy = Number((100*keep(kind === 'wide' ? .46 : glass.y, Math.min(1,ch/ph), tag.y, .085)).toFixed(1))/100;
    const left = (cw-pw)*ox, top = (ch-ph)*oy;
    const sampled = phases.map(t => {
      const s = rest+(ken-rest)*t;
      const fx = x => cw/2+s*(left+(x-cx)/sw*pw-cw/2-.016*t*cw);
      const fy = y => ch/2+s*(top+(y-cy)/sh*ph-ch/2-.012*t*ch);
      const measuredBounds = { ...m.bounds, ...Object.fromEntries(Object.entries(m.recognitionRegions ?? {}).map(([key,b])=>[`recognition:${key}`,b])) };
      const bounds = Object.fromEntries(Object.entries(measuredBounds).map(([key,b]) => [key, {
        x0:fx(b.x0), y0:fy(b.y0), x1:fx(b.x1), y1:fy(b.y1)
      }]));
      const intact = b => b.x0 >= -1 && b.y0 >= -1 && b.x1 <= cw+1 && b.y1 <= ch+1;
      return { phase:t, scale:s, bounds, glassPaperIntact:intact(bounds.glass)&&intact(bounds.paper), recordedPersonalityBoundsIntact:Object.entries(bounds).filter(([k])=>!['glass','paper'].includes(k)).every(([,b])=>intact(b)) };
    });
    return { viewport:[cw,ch], kind, objectPosition:{x:ox,y:oy}, glassPaperIntactAcrossSamples:sampled.every(c=>c.glassPaperIntact), recordedPersonalityBoundsIntactAcrossSamples:sampled.every(c=>c.recordedPersonalityBoundsIntact), sampled };
  });
  return { pairing, version, sourceSha256:m.sourceSha256, recordedPersonalityBoundKeys:[...Object.keys(m.bounds).filter(k=>!['glass','paper'].includes(k)),...Object.keys(m.recognitionRegions ?? {}).map(k=>`recognition:${k}`)], viewportPasses:checks.filter(c=>c.glassPaperIntactAcrossSamples).length, viewportTotal:checks.length, checks };
}
const chosen = queue.progress.selectedCandidates.map(c=>inspect(c.pairing,c.version));
const extras = process.argv.slice(2).map(s=>{const [pairing,version]=s.split('/'); if(!/^[a-z-]+$/.test(pairing)||!/^v\d+$/.test(version))throw new Error('Invalid candidate'); return inspect(pairing,version);});
const report = {
  scope:'Static motion risk screen, not a browser/name-font/render pass. At scroll=0 only; seven nominal viewports, five sampled breathing phases, current rounded object-position. Actual scrollbar/client size, masks, copy overlays, arrival, scrolling, font and runtime interpolation require browser review.',
  cssSha256:createHash('sha256').update(css).digest('hex'),
  componentSha256:createHash('sha256').update(component).digest('hex'),
  rest, ken, selected:chosen, additionalCalibration:extras,
  summary:{ selectedCount:chosen.length, sampledViewportPasses:chosen.reduce((n,c)=>n+c.viewportPasses,0), sampledViewportTotal:chosen.length*viewports.length, candidatesWithAllViewportsIntact:chosen.filter(c=>c.viewportPasses===c.viewportTotal).length }
};
writeFileSync(join(stage,'motion-risk-screen.json'), JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({scope:report.scope,summary:report.summary,selected:chosen.map(c=>({pairing:c.pairing,version:c.version,passes:c.viewportPasses,total:c.viewportTotal})),additional:extras.map(c=>({pairing:c.pairing,version:c.version,passes:c.viewportPasses,total:c.viewportTotal,personality:c.recordedPersonalityBoundKeys}))},null,2));
