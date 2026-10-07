// Probe current selected private assets; no public/registry writes.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
const project = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const stage = join(project, 'design-artifacts/_image-production/2026-10-06');
const q = JSON.parse(readFileSync(join(stage, 'queue.json'), 'utf8'));
const motion = JSON.parse(readFileSync(join(stage, 'motion-risk-screen.json'), 'utf8'));
const hash = path => createHash('sha256').update(readFileSync(path)).digest('hex');
const rows = q.progress.selectedCandidates.map(c => {
  const folder = join(stage,c.pairing,c.version);
  const m = JSON.parse(readFileSync(join(folder,'metadata.json'),'utf8'));
  const dimensions = Object.fromEntries(['wide','portrait'].map(kind=>[kind, JSON.parse(execFileSync('/opt/homebrew/bin/ffprobe',['-v','error','-select_streams','v:0','-show_entries','stream=width,height','-of','json',join(folder,`${kind}.jpg`)],{encoding:'utf8'})).streams[0]]));
  return {...c,masterExists:existsSync(join(folder,'master.png')),exportReviewExists:existsSync(join(folder,'export-review.md')),sourceUnchanged:hash(join(project,'design-artifacts/pours',`${c.pairing}.md`))===m.sourceSha256,dimensions,outputHashMatch:['master','wide','portrait'].every(kind=>hash(join(folder,kind==='master'?'master.png':`${kind}.jpg`))===m.hashes[kind]),cropPasses:m.geometry.filter(g=>g.intact).length,cropTotal:m.geometry.length,motionRisk:motion.selected.find(v=>v.pairing===c.pairing&&v.version===c.version)?.viewportPasses??null};
});
const report={scope:'Read-only dimension/hash/pre-animation cover and separate sampled-motion audit. Not browser/scene/font acceptance.',date:'2026-10-06',checks:{publicValidationPairs:17,stagedPairsProbed:rows.length,currentSourceHashPasses:rows.filter(c=>c.sourceUnchanged).length,exactDimensionPairPasses:rows.filter(c=>c.dimensions.wide.width===1920&&c.dimensions.wide.height===1080&&c.dimensions.portrait.width===896&&c.dimensions.portrait.height===1200).length,outputHashPairPasses:rows.filter(c=>c.outputHashMatch).length,calculatedGlassPaperPasses:rows.reduce((n,c)=>n+c.cropPasses,0),calculatedGlassPaperTotal:rows.reduce((n,c)=>n+c.cropTotal,0),sampledMotionGlassPaperPasses:motion.summary.sampledViewportPasses,sampledMotionGlassPaperTotal:motion.summary.sampledViewportTotal},selectedCandidates:rows};
writeFileSync(join(stage,'checkpoint-audit.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report.checks));
if(rows.some(c=>!c.sourceUnchanged||!c.outputHashMatch||c.dimensions.wide.width!==1920||c.dimensions.wide.height!==1080||c.dimensions.portrait.width!==896||c.dimensions.portrait.height!==1200))process.exitCode=2;
