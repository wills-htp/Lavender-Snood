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
  const [Le,Re,C]=ED.pts,d=Math.max(8,Math.hypot(Re[0]-Le[0],Re[1]-Le[1])),M=[(Le[0]+Re[0])/2,(Le[1]+Re[1])/2];
  let ux=C[0]-M[0],uy=C[1]-M[1];const ul=Math.hypot(ux,uy)||1;ux/=ul;uy/=ul;const vx=-uy,vy=ux,len=ul/d;
  const D=ED.px.data,W=ED.cw,H=ED.ch;
  const px=(a,b)=>{const x=Math.round(M[0]+ux*a*d+vx*b*d),y=Math.round(M[1]+uy*a*d+vy*b*d);if(x<1||y<1||x>=W-1||y>=H-1)return null;
    const o=(y*W+x)*4,lm=(k)=>D[k]*.3+D[k+1]*.59+D[k+2]*.11;return {c:[D[o],D[o+1],D[o+2]],l:lm(o),e:Math.abs(lm(o+4)-lm(o-4))+Math.abs(lm(o+W*4)-lm(o-W*4))}};
  const grid=(a0,a1,b0,b1,n=9)=>{const out=[];for(let i=0;i<n;i++)for(let k=0;k<n;k++){const p=px(a0+(a1-a0)*i/(n-1),b0+(b1-b0)*k/(n-1));if(p)out.push(p)}return out};
  const med=a=>{const s=a.slice().sort((x,y)=>x-y);return s.length?s[s.length>>1]:0};
  const medC=g=>[0,1,2].map(i=>med(g.map(p=>p.c[i])));
  const ref=grid(.3,.45,.35,.75).concat(grid(.3,.45,-.75,-.35));
  const skin=medC(ref),skl=med(ref.map(p=>p.l)),ske=med(ref.map(p=>p.e))+1;
  const region=(g)=>{if(!g.length)return {dark:0,far:0,tex:0,g};return {dark:g.filter(p=>skl-p.l>30).length/g.length,far:g.filter(p=>cdist(p.c,skin)>55).length/g.length,tex:g.reduce((t,p)=>t+p.e,0)/g.length/ske,g}};
  // above the eyes: hat or hair or bald
  const band=(a)=>region(grid(a,a,-.45,.45,7).concat(grid(a+.06,a+.06,-.45,.45,7)));
  const prof=[-.55,-.7,-.85,-1,-1.15,-1.3,-1.45,-1.6].map(a=>{const g=grid(a,a+.08,-.45,.45,5);return {a,g,dist:g.length?cdist(medC(g),skin):-1,tex:g.length?g.reduce((t,p)=>t+p.e,0)/g.length/ske:0}});
  const P=a=>prof.find(p=>Math.abs(p.a-a)<.01);
  const hatBand=[P(-.7),P(-.85),P(-1),P(-1.15)].filter(p=>p.dist>=0);
  const hatDist=hatBand.reduce((t,p)=>t+p.dist,0)/Math.max(1,hatBand.length),hatTex=hatBand.reduce((t,p)=>t+p.tex,0)/Math.max(1,hatBand.length);
  const r={};
  r.shape=len>2.5?'thin':len>2.05?'oval':len>1.75?'egg':len>1.5?'pill':'squircle';
  const hat=hatDist>105||(hatDist>80&&hatTex<.35);
  r.hat=hat?'cap':'';r.hatc=hat?toHex(medC([].concat(...hatBand.map(p=>p.g)))):'#1d1d22';
  const low=[P(-.85),P(-1),P(-1.15)].filter(p=>p.dist>=0),lowMean=low.reduce((t,p)=>t+p.dist,0)/Math.max(1,low.length);
  const p145=P(-1.45),topBright=P(-1.3)&&P(-1.3).g.length?med(P(-1.3).g.map(p=>p.l))-skl:0;
  const p160=P(-1.6),darkTop=p160&&p160.dist>150&&p160.g.length&&med(p160.g.map(p=>p.l))<skl-40;
  const bald=!hat&&lowMean<45&&topBright>-10&&!darkTop;
  let hc;
  if(hat){const side=region(grid(-.15,.15,1.0,1.2,5).concat(grid(-.15,.15,-1.2,-1.0,5)));const hs=side.g.filter(p=>cdist(p.c,skin)>50&&p.l<skl);hc=hs.length>4?medC(hs):[58,42,30]}
  else{const hl=prof.find(p=>p.dist>60);hc=hl?medC(hl.g):[110,104,98]}
  if(bald){const side=grid(-.15,.15,1.05,1.25,5).concat(grid(-.15,.15,-1.25,-1.05,5)).filter(p=>cdist(p.c,skin)>45&&p.l<skl);hc=side.length>4?medC(side):[120,114,108]}
  r.hc=toHex(hc);
  const longG=grid(.6,1.0,1.25,1.4,5).concat(grid(.6,1.0,-1.4,-1.25,5)),longHair=!bald&&longG.length&&longG.filter(p=>cdist(p.c,hc)<45&&cdist(p.c,skin)>45).length/longG.length>.55;
  r.hair=bald?'bald':longHair?'long':'short';
  // beard: darkness of chin, jaw, cheeks and lip area compared with the upper cheeks
  const chin=region(grid(len*.82,len*1.0,-.3,.3)),jaw=region(grid(len*.6,len*.85,.45,.75).concat(grid(len*.6,len*.85,-.75,-.45)));
  const st=region(grid(len*.38,len*.46,-.3,.3)),ch=region(grid(len*.5,len*.65,.4,.7).concat(grid(len*.5,len*.65,-.7,-.4)));
  const score=(chin.dark+jaw.dark+st.dark+ch.dark)/4;
  if(st.dark>.7&&chin.dark<.25)r.facial='mustache';
  else if(chin.dark>.5&&ch.dark<.3&&st.dark<.35)r.facial='goatee';
  else if(score>=.8&&jaw.dark>.85)r.facial='bigbeard';
  else if(score>=.45)r.facial='beard';
  else if(score>=.27)r.facial='stubble';
  else r.facial='';
  const bp=[].concat(chin.g,jaw.g,st.g).filter(p=>skl-p.l>30);
  r.fc=toHex(bp.length>5?medC(bp):hc);
  // glasses: strong horizontal edges along the lower rim under each eye and across the nose bridge
  const gyAt=(x,y)=>{x=Math.round(x);y=Math.round(y);if(x<1||y<1||x>=W-1||y>=H-1)return null;const o=(y*W+x)*4,lm=k=>D[k]*.3+D[k+1]*.59+D[k+2]*.11;return Math.abs(lm(o+W*4)-lm(o-W*4))};
  const ptAt=(cx,cy,a,b)=>[cx+ux*a*d+vx*b*d,cy+uy*a*d+vy*b*d];
  const cheekRef=(()=>{const v=[];for(let i=0;i<5;i++)for(const b of [-.6,-.5,.5,.6]){const q=ptAt(M[0],M[1],.5+.05*i,b),g=gyAt(q[0],q[1]);if(g!=null)v.push(g)}return v.reduce((t,x)=>t+x,0)/Math.max(1,v.length)+1})();
  let lom=0;for(const e of [Le,Re])for(const rr of [.28,.33,.38,.43]){let t=0,n=0;for(let k=0;k<9;k++){const ang=Math.PI*(.35+.3*k/8),q=[e[0]+(Math.cos(ang)*vx+Math.sin(ang)*ux)*rr*d,e[1]+(Math.cos(ang)*vy+Math.sin(ang)*uy)*rr*d],g=gyAt(q[0],q[1]);if(g!=null){t+=g;n++}}if(n)lom=Math.max(lom,t/n)}
  let br=0;for(let i=0;i<11;i++){const a=-.15+.025*i;let t=0,n=0;for(let k=0;k<7;k++){const q=ptAt(M[0],M[1],a,-.1+k*.2/6),g=gyAt(q[0],q[1]);if(g!=null){t+=g;n++}}if(n)br=Math.max(br,t/n)}
  const gscore=(lom+br)/cheekRef;
  r.glasses=gscore>=10?(lum(region(grid(-.1,.1,.35,.65,5)).g.length?medC(region(grid(-.1,.1,.35,.65,5)).g):[255,255,255])<skl-110?'sun':'round'):'';
  const shirt=region(grid(len+.9,len+1.4,-.6,.6,7)).g.filter(p=>cdist(p.c,skin)>40);
  // face color: their shirt if it's a real color, otherwise a bright color nobody else is using yet
  const sc=shirt.length>8?medC(shirt):null,chroma=sc?Math.max(...sc)-Math.min(...sc):0;
  const PAL=[[255,111,181],[47,125,225],[63,179,79],[245,197,24],[255,138,31],[20,184,176],[138,92,240],[232,69,60],[143,211,255],[154,212,30]];
  const used=TOONS.map(t=>{const n=parseInt((t.face||t.color).slice(1),16);return [n>>16,n>>8&255,n&255]});
  const ranked=PAL.slice().sort((x,y)=>Math.min(...used.map(u=>cdist(u,y)))-Math.min(...used.map(u=>cdist(u,x)))),fresh=ranked[Math.round(skin[0]+skin[1]*3+len*97)%4];
  let face=sc&&chroma>45&&lum(sc)>45?vivid(sc):fresh;
  r.face=toHex(face);r.accent=lum(face)>150?'#2b2b30':'#ffffff';
  r.brow=bald?r.fc:r.hc;r.mouth='grin';r.eyes='happy';r.name='';
  ED.dbg={gscore:+gscore.toFixed(1),p145:p145&&Math.round(p145.dist),p160:P(-1.6)&&Math.round(P(-1.6).dist),p130:P(-1.3)&&Math.round(P(-1.3).dist),topBright:Math.round(topBright),t145:p145&&+p145.tex.toFixed(1),len:+len.toFixed(2),hatDist:Math.round(hatDist),hatTex:+hatTex.toFixed(2),lowMean:Math.round(lowMean),score:+score.toFixed(2)};
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
window.__fr={open:frOpen,step:frStep,ED};
