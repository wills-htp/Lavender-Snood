// "Add a friend": build a cartoon from a photo with plain measurement code (no AI).
// The player taps both eyes and the chin; we sample colors and proportions from there.
const FR_KEY='lbpop-friends';
const frLoad=()=>{try{const v=JSON.parse(localStorage.getItem(FR_KEY)||'[]');return Array.isArray(v)?v:[]}catch(e){return []}};
const frSave=a=>{try{localStorage.setItem(FR_KEY,JSON.stringify(a))}catch(e){}};
const HEX=/^#[0-9a-f]{6}$/i;
function frClean(f){
  // saved data is untrusted: keep only known fields and values
  const pick=(v,ok,d)=>ok.includes(v)?v:d,col=(v,d)=>HEX.test(v||'')?v:d;
  return {name:String(f.name||'Friend').slice(0,16),color:col(f.face,'#ff6fb5'),face:col(f.face,'#ff6fb5'),accent:col(f.accent,'#ffffff'),
    shape:pick(f.shape,['pill','octagon','egg','shield','squircle','bell','oval','thin','chisel','rect','blob'],'egg'),
    hair:pick(f.hair,['short','long','curly','bald','buzz','crop','side','wavy','medwavy','tousled'],'short'),hc:col(f.hc,'#3a2a1e'),
    facial:pick(f.facial,['','stubble','mustache','goatee','beard','bigbeard'],''),fc:col(f.fc,'#3a2a1e'),
    glasses:pick(f.glasses,['','round','rect','thick','sun'],''),hat:pick(f.hat,['','cap','knit','beret'],''),hatc:col(f.hatc,'#1d1d22'),
    mouth:pick(f.mouth,['grin','smile','toothy','flat','smirk','open'],'grin'),eyes:pick(f.eyes,['happy','normal','calm','wide','squint'],'happy'),
    browW:5,brow:col(f.brow,'#2a1f18'),custom:true}
}
function frAdd(f){const t=frClean(f);TOONS.push(t);COLORS.push(t.color);NAMES.push(t.name)}
frLoad().forEach(frAdd);

const ED={img:null,pts:[],px:null,cw:0,ch:0,rec:null};
function frOpen(){$('ed').hidden=false;frStep('photo');frList()}
function frClose(){$('ed').hidden=true}
function frStep(s){['photo','tap','tune'].forEach(k=>$('ed-'+k).hidden=k!==s)}
function frList(){
  const box=$('ed-list');box.textContent='';
  frLoad().forEach((f,i)=>{const row=document.createElement('div');row.className='ed-row';
    const c=document.createElement('canvas');c.width=c.height=80;drawToon(c.getContext('2d'),40,42,62,frClean(f));
    const n=document.createElement('span');n.textContent=f.name;
    const b=document.createElement('button');b.type='button';b.className='ghost';b.textContent='Remove';
    b.addEventListener('click',()=>{const a=frLoad();a.splice(i,1);frSave(a);location.reload()});
    row.append(c,n,b);box.appendChild(row)});
  $('ed-listwrap').hidden=!frLoad().length;
}
$('ed-file').addEventListener('change',e=>{
  const f=e.target.files&&e.target.files[0];if(!f)return;
  const url=URL.createObjectURL(f),im=new Image();
  im.onload=()=>{const sc=Math.min(1,640/Math.max(im.width,im.height));ED.cw=Math.round(im.width*sc);ED.ch=Math.round(im.height*sc);
    const c=$('ed-pic');c.width=ED.cw;c.height=ED.ch;const g=c.getContext('2d');g.drawImage(im,0,0,ED.cw,ED.ch);
    ED.px=g.getImageData(0,0,ED.cw,ED.ch);ED.img=im;ED.pts=[];URL.revokeObjectURL(url);frStep('tap');frTapHint()};
  im.src=url;e.target.value='';
});
const TAPS=['Tap their left eye','Tap their right eye','Tap the bottom of their chin'];
function frTapHint(){$('ed-taphint').textContent=TAPS[ED.pts.length]||'';frDrawPhoto()}
function frDrawPhoto(){const c=$('ed-pic'),g=c.getContext('2d');g.putImageData(ED.px,0,0);
  ED.pts.forEach(p=>{g.beginPath();g.arc(p[0],p[1],Math.max(5,ED.cw/70),0,7);g.fillStyle='#ff6fb5';g.fill();g.lineWidth=2;g.strokeStyle='#fff';g.stroke()})}
$('ed-pic').addEventListener('click',e=>{
  if(ED.pts.length>=3)return;const b=e.target.getBoundingClientRect();
  ED.pts.push([(e.clientX-b.left)*ED.cw/b.width,(e.clientY-b.top)*ED.ch/b.height]);frTapHint();
  if(ED.pts.length===3){ED.rec=frMeasure();frFill(ED.rec);frStep('tune');frPreview()}
});
$('ed-redo').addEventListener('click',()=>{ED.pts=[];frTapHint()});

function frSample(x,y,r){
  const d=ED.px.data;let n=0,R=0,G=0,B=0;r=Math.max(2,Math.round(r));
  for(let j=-r;j<=r;j+=2)for(let i=-r;i<=r;i+=2){const X=Math.round(x+i),Y=Math.round(y+j);if(X<0||Y<0||X>=ED.cw||Y>=ED.ch)continue;const o=(Y*ED.cw+X)*4;R+=d[o];G+=d[o+1];B+=d[o+2];n++}
  return n?[R/n,G/n,B/n]:null;
}
function frEdges(x,y,r){
  const d=ED.px.data,L=(X,Y)=>{const o=(Y*ED.cw+X)*4;return d[o]*.3+d[o+1]*.59+d[o+2]*.11};let s=0,n=0;r=Math.round(r);
  for(let j=-r;j<=r;j+=2)for(let i=-r;i<=r;i+=2){const X=Math.round(x+i),Y=Math.round(y+j);if(X<1||Y<1||X>=ED.cw-1||Y>=ED.ch-1)continue;s+=Math.abs(L(X+1,Y)-L(X-1,Y))+Math.abs(L(X,Y+1)-L(X,Y-1));n++}
  return n?s/n:0;
}
const lum=c=>c?c[0]*.3+c[1]*.59+c[2]*.11:128;
const cdist=(a,b)=>a&&b?Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2]):999;
const toHex=c=>'#'+c.map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join('');
function vivid(c){const m=Math.max(...c),n=Math.min(...c);if(m-n<25)return c;const k=255/Math.max(1,m);return c.map(v=>n+(v-n)*1.25*Math.min(1.4,k))}

function frMeasure(){
  const [L,Rt,C]=ED.pts,d=Math.max(8,Math.hypot(Rt[0]-L[0],Rt[1]-L[1])),M=[(L[0]+Rt[0])/2,(L[1]+Rt[1])/2];
  let ux=C[0]-M[0],uy=C[1]-M[1];const ul=Math.hypot(ux,uy)||1;ux/=ul;uy/=ul;const vx=-uy,vy=ux;
  const at=(a,b)=>[M[0]+ux*a*d+vx*b*d,M[1]+uy*a*d+vy*b*d];
  const S=(a,b,r=.15)=>{const p=at(a,b);return frSample(p[0],p[1],r*d)};
  const len=ul/d,r={};
  const fh=S(-.5,0,.12),cb=S(.35,.55,.1)||S(.35,-.55,.1),skin=fh&&cb?fh.map((v,i)=>(v+cb[i])/2):(fh||cb),hairTop=S(-1.3,0,.18),hairSide=S(-.6,1.2)||S(-.6,-1.2);
  const chinP=at(len*.9,0),jawP=at(len*.78,.62),jawQ=at(len*.78,-.62),lipP=at(len*.5,0);
  const low=frSample(chinP[0],chinP[1],.16*d),jaw=frSample(jawP[0],jawP[1],.12*d)||frSample(jawQ[0],jawQ[1],.12*d),stache=frSample(lipP[0],lipP[1],.08*d);
  const shirt=S(len+1.5,0,.3)||S(len+1.1,0,.25);
  const skE=Math.min(frEdges(...at(.35,.55),.1*d)||99,frEdges(...at(-.5,0),.12*d)||99)||1,chE=frEdges(chinP[0],chinP[1],.16*d),jwE=Math.max(frEdges(jawP[0],jawP[1],.12*d),frEdges(jawQ[0],jawQ[1],.12*d));
  r.shape=len>2.4?'thin':len>2.2?'oval':len>2.0?'egg':len>1.85?'pill':'squircle';
  const bald=!(hairTop&&(cdist(hairTop,fh||skin)>50||lum(hairTop)<lum(fh||skin)-40));
  const hc=bald?(hairSide&&cdist(hairSide,skin)>55?hairSide:[110,104,98]):(hairTop||[58,42,30]);
  r.hc=toHex(hc);
  const longHair=!bald&&cdist(S(.95,1.35),hc)<45&&cdist(S(.95,1.35),skin)>40;
  r.hair=bald?'bald':longHair?'long':'short';
  const chinB=cdist(low,skin)>50||chE>skE*1.7,jawB=cdist(jaw,skin)>50||jwE>skE*1.7,stB=cdist(stache,skin)>55&&lum(stache)<lum(skin);
  const strong=cdist(low,skin)>90||chE>skE*2.6;
  r.facial=chinB&&jawB?(strong&&len>0?'beard':'stubble'):chinB?'goatee':stB?'mustache':'';
  if(r.facial==='stubble'&&cdist(low,skin)>70)r.facial='beard';
  const bs=[low,jaw].filter(Boolean),bc=bs.length?bs[0].map((v,i)=>bs.reduce((t,c)=>t+c[i],0)/bs.length):null;r.fc=toHex(r.facial?(bc||hc):hc);
  ED.dbg={len:+len.toFixed(2),skin:skin&&toHex(skin),hairTop:hairTop&&toHex(hairTop),low:low&&toHex(low),cd:Math.round(cdist(low,skin)),chE:Math.round(chE),skE:Math.round(skE),jwE:Math.round(jwE),jcd:Math.round(cdist(jaw,skin))};
  const eyeE=(frEdges(L[0],L[1]-d*.05,d*.32)+frEdges(Rt[0],Rt[1]-d*.05,d*.32))/2,cheekE=skE;
  r.glasses=eyeE>cheekE*2.3&&eyeE>22?'round':'';
  let face=shirt&&cdist(shirt,skin)>35?vivid(shirt):[255,111,181];
  if(lum(face)<35)face=[60,60,70];
  r.face=toHex(face);r.accent=lum(face)>150?'#2b2b30':'#ffffff';
  r.brow=bald?r.fc:r.hc;r.hat='';r.hatc='#1d1d22';r.mouth='grin';r.eyes='happy';r.name='';
  return r;
}
function frFill(r){
  $('ed-name').value=r.name||'';$('ed-face').value=r.face;$('ed-accent').value=r.accent;$('ed-shape').value=r.shape;
  $('ed-hair').value=r.hair;$('ed-hc').value=r.hc;$('ed-facial').value=r.facial;$('ed-fc').value=r.fc;$('ed-glasses').value=r.glasses;
  $('ed-hat').value=r.hat;$('ed-hatc').value=r.hatc;$('ed-hatcrow').hidden=!r.hat;
}
function frRead(){return {name:$('ed-name').value.trim()||'Friend',face:$('ed-face').value,accent:$('ed-accent').value,shape:$('ed-shape').value,
  hair:$('ed-hair').value,hc:$('ed-hc').value,facial:$('ed-facial').value,fc:$('ed-fc').value,glasses:$('ed-glasses').value,
  hat:$('ed-hat').value,hatc:$('ed-hatc').value,mouth:'grin',eyes:'happy',brow:$('ed-hair').value==='bald'?$('ed-fc').value:$('ed-hc').value}}
function frPreview(){const c=$('ed-prev'),g=c.getContext('2d');g.clearRect(0,0,c.width,c.height);drawToon(g,c.width/2,c.height/2+6,c.width*.62,frClean(frRead()))}
document.querySelectorAll('#ed-tune input,#ed-tune select').forEach(el=>el.addEventListener('input',()=>{$('ed-hatcrow').hidden=!$('ed-hat').value;frPreview()}));
$('ed-save').addEventListener('click',()=>{const f=frRead();const a=frLoad();a.push(f);frSave(a);frAdd(f);for(const k in sprites)delete sprites[k];cast();frList();frStep('photo')});
$('ed-back').addEventListener('click',()=>frStep('photo'));
$('ed-close').addEventListener('click',frClose);
document.querySelectorAll('.addfriend').forEach(b=>b.addEventListener('click',frOpen));
