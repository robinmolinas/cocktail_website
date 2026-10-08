// Mechanical export and measured-metadata handoff; no image generation or grading.
// node design-artifacts/_image-production/export-pair.mjs <measurement.json>
// Measurements use master pixels, never shared default coordinates.
import { readFileSync, existsSync, mkdirSync, copyFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const PROJECT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const input = resolve(process.argv[2] ?? '');
if (!process.argv[2]) throw new Error('Provide a measurement.json path.');
const m = JSON.parse(readFileSync(input, 'utf8'));
// Optional dedicated portrait, measured on its own native photograph.
// Legacy same-master pairs keep their existing behaviour.
const portraitInput = m.portraitMeasurementFile
  ? resolve(dirname(input), m.portraitMeasurementFile) : null;
const portraitM = portraitInput ? JSON.parse(readFileSync(portraitInput, 'utf8')) : m;
if (portraitM.pairing !== m.pairing) throw new Error('Portrait pairing differs from wide.');
if (!/^[a-z]+(?:-[a-z]+)+$/.test(m.pairing)) throw new Error('Invalid pairing key.');
const out = dirname(input);
// Preflight every output before copying or converting either orientation.
for (const name of ['wide.jpg', 'portrait.jpg', 'metadata.json']) {
  if (existsSync(join(out, name))) throw new Error(`${name} exists; use a versioned directory.`);
}
const dossier = join(PROJECT, 'design-artifacts/pours', `${m.pairing}.md`);
const hash = p => createHash('sha256').update(readFileSync(p)).digest('hex');
const sourceHash = hash(dossier);
if (!m.sourceSha256 || sourceHash !== m.sourceSha256) throw new Error('Pour changed after review. Re-read before export.');
if (portraitM.sourceSha256 !== sourceHash) throw new Error('Portrait pour fingerprint differs.');
if (!m.review?.recipe || !m.review?.personality || !m.review?.world) throw new Error('Physical/personality/world review missing.');
for (const key of ['wideCrop', 'portraitCrop']) {
  const measured = key === 'portraitCrop' ? portraitM : m;
  if (!Array.isArray(measured[key]) || measured[key].length !== 4 || measured[key].some(v => !Number.isFinite(v)) || measured[key][2] <= 0 || measured[key][3] <= 0) throw new Error(`Invalid ${key}`);
}
for (const measured of [m, portraitM]) {
  if (!measured.review?.recipe || !measured.review?.personality || !measured.review?.world) throw new Error('Per-master physical/personality/world review missing.');
  for (const key of ['cx', 'cy', 'w', 'angle']) if (!Number.isFinite(measured.tag?.[key])) throw new Error(`Missing measured tag ${key}`);
  for (const key of ['x', 'y']) if (!Number.isFinite(measured.glass?.[key])) throw new Error(`Missing measured glass ${key}`);
  if (!measured.bounds?.glass || !measured.bounds?.paper) throw new Error('Measured complete glass/paper bounds required.');
  if (measured.masterSha256 && hash(resolve(measured.master)) !== measured.masterSha256) throw new Error('Master bytes changed after measurement.');
}
const master = resolve(m.master);
mkdirSync(out, { recursive: true });
const masterCopy = join(out, 'master.png');
if (master !== masterCopy) {
  if (existsSync(masterCopy)) throw new Error('Master exists; use a versioned directory.');
  copyFileSync(master, masterCopy);
}
const dims = JSON.parse(execFileSync('/opt/homebrew/bin/ffprobe', ['-v','error','-select_streams','v:0','-show_entries','stream=width,height','-of','json',masterCopy], { encoding:'utf8' })).streams[0];
const portraitMaster = portraitInput ? resolve(portraitM.master) : masterCopy;
const portraitDims = portraitInput ? JSON.parse(execFileSync('/opt/homebrew/bin/ffprobe', ['-v','error','-select_streams','v:0','-show_entries','stream=width,height','-of','json',portraitMaster], { encoding:'utf8' })).streams[0] : dims;
const shapes = { wide: [1920,1080], portrait: [896,1200] };
const runtime = { src:`/personas/${m.pairing}/portrait.jpg`, wide:`/personas/${m.pairing}/wide.jpg` };
const pixels = {};
for (const kind of ['wide','portrait']) {
  const measured = kind === 'portrait' ? portraitM : m;
  const sourceMaster = kind === 'portrait' ? portraitMaster : masterCopy;
  const sourceDims = kind === 'portrait' ? portraitDims : dims;
  const [x,y,w,h] = measured[`${kind}Crop`], [ew,eh] = shapes[kind];
  if (x<0 || y<0 || x+w>sourceDims.width || y+h>sourceDims.height) throw new Error(`${kind} crop exceeds master.`);
  const jpg = join(out, `${kind}.jpg`);
  if (existsSync(jpg)) throw new Error(`${kind}.jpg exists; use a versioned directory.`);
  execFileSync('/opt/homebrew/bin/ffmpeg', ['-v','error','-i',sourceMaster,'-vf',`crop=${w}:${h}:${x}:${y},scale=${ew}:${eh}`,'-frames:v','1','-q:v','2',jpg]);
  const scaleX=ew/w, scaleY=eh/h;
  const angle=Math.atan(Math.tan(measured.tag.angle*Math.PI/180)*scaleY/scaleX)*180/Math.PI;
  const tag={cx:(measured.tag.cx-x)/w, cy:(measured.tag.cy-y)/h, w:measured.tag.w/w, angle};
  const glass={x:(measured.glass.x-x)/w,y:(measured.glass.y-y)/h};
  for(const v of Object.values({cx:tag.cx,cy:tag.cy,w:tag.w,gx:glass.x,gy:glass.y})) if(v<0||v>1) throw new Error(`${kind}: normalized measurement outside image.`);
  runtime[kind==='wide'?'wideTag':'tag']=tag;
  runtime[kind==='wide'?'wideGlass':'glass']=glass;
  pixels[kind]={tag:{cx:tag.cx*ew,cy:tag.cy*eh,w:tag.w*ew,angle},glass:{x:glass.x*ew,y:glass.y*eh}};
}
function keep(preferred, visible, centre, half) {
  if (visible>=1) return preferred;
  const lo=(centre+half-visible)/(1-visible), hi=(centre-half)/(1-visible);
  if(lo>hi) return Math.min(1,Math.max(0,(centre-visible/2)/(1-visible)));
  return Math.min(1,Math.max(0,Math.min(Math.max(preferred,lo),hi)));
}
const geometry = [];
for(const [cw,ch] of [[1920,1080],[1440,900],[2048,1036],[3440,1440],[390,844],[430,932],[320,568]]) {
  const kind=cw<=900&&ch>cw?'portrait':'wide', [iw,ih]=shapes[kind];
  const measured=kind==='portrait'?portraitM:m;
  const [cx,cy,sw,sh]=measured[`${kind}Crop`], t=runtime[kind==='wide'?'wideTag':'tag'], g=runtime[kind==='wide'?'wideGlass':'glass'];
  const scale=Math.max(cw/iw,ch/ih), pw=iw*scale, ph=ih*scale;
  const ox=keep(kind==='wide'?0.5:g.x,Math.min(1,cw/pw),t.cx,t.w/2+0.02);
  const oy=keep(kind==='wide'?0.46:g.y,Math.min(1,ch/ph),t.cy,0.085);
  const left=(cw-pw)*ox, top=(ch-ph)*oy;
  const bounds=Object.fromEntries(Object.entries(measured.bounds).map(([key,b])=>[key,{x0:left+(b.x0-cx)/sw*pw,y0:top+(b.y0-cy)/sh*ph,x1:left+(b.x1-cx)/sw*pw,y1:top+(b.y1-cy)/sh*ph}]));
  const intact=Object.values(bounds).every(b=>b.x0>=-1&&b.y0>=-1&&b.x1<=cw+1&&b.y1<=ch+1);
  geometry.push({viewport:[cw,ch],kind,intact,objectPosition:{x:ox,y:oy},bounds});
}
const allIntact=geometry.every(t=>t.intact);
const metadata={pairing:m.pairing,pour:m.pour,status:allIntact?'image-production-reviewed; browser-name-overlay-pending':'needs-recomposition',generatedWith:'built-in image_gen',sourceSha256:sourceHash,review:m.review,measurements:m,exportPixels:pixels,runtimeCandidate:runtime,hashes:{master:hash(masterCopy),wide:hash(join(out,'wide.jpg')),portrait:hash(join(out,'portrait.jpg'))},geometryScope:'Calculated cover positions mirror current TheReading.tsx. Not a browser/name-font test.',geometry};
if (portraitInput) {
  metadata.status='private-review-export; all-acceptance-gates-pending';
  metadata.portraitMeasurements=portraitM;
  metadata.hashes.portraitMaster=hash(portraitMaster);
  metadata.acceptance={material:false,personality:false,physics:false,name:false,browser:false,user:false,integrated:false};
  metadata.geometryScope='Static calculated cover bounds only; excludes breathing/translation, full trace recognition, loaded names and browser acceptance.';
}
writeFileSync(join(out,'metadata.json'),JSON.stringify(metadata,null,2)+'\n');
console.log(JSON.stringify({pairing:m.pairing,status:metadata.status,output:out,runtimeCandidate:runtime,cropPasses:geometry.filter(t=>t.intact).length,cropTotal:geometry.length}));
if(!allIntact) process.exitCode=2;
