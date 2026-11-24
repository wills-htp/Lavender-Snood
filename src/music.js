// Lavender Boys soundtrack: original, procedural, mellow analog-minimal techno.
// Everything is synthesized with Web Audio; nothing is sampled.
const Music=(()=>{
  const BPM=123,STEP=60/BPM/4,SWING=0.16;
  const N=(m)=>440*Math.pow(2,(m-69)/12);
  // A minor / dorian palette
  const CHORDS=[[57,60,64,67,71],[50,57,60,64,65],[53,57,60,64,67],[52,55,59,62,67]];
  const BASS=[[0,45],[3,45],[6,48],[8,45],[10,52],[11,50],[14,43]];
  const BASS_B=[[0,45],[2,45],[5,52],[7,48],[10,45],[12,55],[14,52]];
  const PLINK=[69,72,74,76,79,81,84];
  let ac=null,out=null,dly=null,rev=null,noise=null,timer=null,next=0,step=0,on=false;

  function makeNoise(c){const b=c.createBuffer(1,c.sampleRate,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;return b}
  function makeVerb(c){const len=c.sampleRate*2.6,b=c.createBuffer(2,len,c.sampleRate);for(let ch=0;ch<2;ch++){const d=b.getChannelData(ch);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,3.2)}const v=c.createConvolver();v.buffer=b;return v}

  function graph(c,dest){
    const master=c.createGain();master.gain.value=.55;
    const comp=c.createDynamicsCompressor();comp.threshold.value=-18;comp.ratio.value=3;comp.attack.value=.01;comp.release.value=.2;
    const warm=c.createBiquadFilter();warm.type='lowpass';warm.frequency.value=9000;
    master.connect(warm);warm.connect(comp);comp.connect(dest);
    const d=c.createDelay(2);d.delayTime.value=STEP*3;const fb=c.createGain();fb.gain.value=.42;const dl=c.createBiquadFilter();dl.type='lowpass';dl.frequency.value=2200;const dh=c.createBiquadFilter();dh.type='highpass';dh.frequency.value=300;
    d.connect(dl);dl.connect(dh);dh.connect(fb);fb.connect(d);const dOut=c.createGain();dOut.gain.value=.55;dh.connect(dOut);dOut.connect(master);
    const r=makeVerb(c),rOut=c.createGain();rOut.gain.value=.32;r.connect(rOut);rOut.connect(master);
    return {master,dly:d,rev:r,noise:makeNoise(c)};
  }
  function env(g,t,a,peak,dec){g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(peak,t+a);g.gain.exponentialRampToValueAtTime(0.0001,t+a+dec)}

  function kick(G,c,t,v=1){const o=c.createOscillator(),g=c.createGain(),f=c.createBiquadFilter();f.type='lowpass';f.frequency.value=900;
    o.frequency.setValueAtTime(110,t);o.frequency.exponentialRampToValueAtTime(44,t+.11);env(g,t,.003,.9*v,.42);o.connect(f);f.connect(g);g.connect(G.master);o.start(t);o.stop(t+.5)}
  function hat(G,c,t,open,v){const s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();s.buffer=G.noise;f.type='highpass';f.frequency.value=open?6500:8200;
    env(g,t,.002,v,open?.16:.035);s.connect(f);f.connect(g);g.connect(G.master);if(open){const sd=c.createGain();sd.gain.value=.15;g.connect(sd);sd.connect(G.dly)}s.start(t);s.stop(t+.25)}
  function rim(G,c,t,v){const o=c.createOscillator(),f=c.createBiquadFilter(),g=c.createGain();o.type='triangle';o.frequency.value=1650;f.type='bandpass';f.frequency.value=1800;f.Q.value=6;
    env(g,t,.001,v,.045);o.connect(f);f.connect(g);g.connect(G.master);const sd=c.createGain();sd.gain.value=.35;g.connect(sd);sd.connect(G.dly);o.start(t);o.stop(t+.08)}
  function clap(G,c,t,v){for(let k=0;k<3;k++){const s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();s.buffer=G.noise;f.type='bandpass';f.frequency.value=1400;f.Q.value=1.4;
    const tt=t+k*.011;env(g,tt,.001,v*(k===2?1:.6),k===2?.14:.02);s.connect(f);f.connect(g);g.connect(G.master);const rv=c.createGain();rv.gain.value=.5;g.connect(rv);rv.connect(G.rev);s.start(tt);s.stop(tt+.2)}}
  function bass(G,c,t,m,cut,len){const o=c.createOscillator(),o2=c.createOscillator(),f=c.createBiquadFilter(),g=c.createGain();o.type='sawtooth';o2.type='square';o.frequency.value=N(m);o2.frequency.value=N(m-12);
    const g2=c.createGain();g2.gain.value=.35;f.type='lowpass';f.Q.value=7;f.frequency.setValueAtTime(cut*2.6,t);f.frequency.exponentialRampToValueAtTime(cut,t+.12);
    env(g,t,.004,.32,len);o.connect(f);o2.connect(g2);g2.connect(f);f.connect(g);g.connect(G.master);o.start(t);o2.start(t);o.stop(t+len+.05);o2.stop(t+len+.05)}
  function stab(G,c,t,ch,cut,v){const f=c.createBiquadFilter(),g=c.createGain();f.type='lowpass';f.Q.value=4;f.frequency.setValueAtTime(cut*3,t);f.frequency.exponentialRampToValueAtTime(cut,t+.18);
    env(g,t,.003,v,.22);ch.forEach((m,i)=>{for(const det of [-7,7]){const o=c.createOscillator();o.type='sawtooth';o.frequency.value=N(m);o.detune.value=det;o.connect(f);o.start(t);o.stop(t+.3)}});
    f.connect(g);g.connect(G.master);const sd=c.createGain();sd.gain.value=.7;g.connect(sd);sd.connect(G.dly);const rv=c.createGain();rv.gain.value=.4;g.connect(rv);rv.connect(G.rev)}
  function pad(G,c,t,ch,dur,v){const f=c.createBiquadFilter(),g=c.createGain();f.type='lowpass';f.frequency.setValueAtTime(500,t);f.frequency.linearRampToValueAtTime(1400,t+dur*.5);f.frequency.linearRampToValueAtTime(600,t+dur);
    g.gain.setValueAtTime(0.0001,t);g.gain.linearRampToValueAtTime(v,t+dur*.35);g.gain.linearRampToValueAtTime(0.0001,t+dur);
    ch.forEach(m=>{const o=c.createOscillator();o.type='triangle';o.frequency.value=N(m+12);o.detune.value=(Math.random()-.5)*14;o.connect(f);o.start(t);o.stop(t+dur+.05)});
    f.connect(g);g.connect(G.master);const rv=c.createGain();rv.gain.value=.6;g.connect(rv);rv.connect(G.rev)}
  function plink(G,c,t,m,v){const o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.value=N(m);env(g,t,.002,v,.25);o.connect(g);g.connect(G.master);
    const sd=c.createGain();sd.gain.value=.8;g.connect(sd);sd.connect(G.dly);o.start(t);o.stop(t+.3)}

  // one 16th step of the arrangement (128-bar cycle)
  function play(G,c,s,t){
    const st=s%16,bar=Math.floor(s/16)%128,sec=Math.floor(bar/16),ph=bar%8;
    const brk=(bar>=56&&bar<64)||(bar>=120);
    const sw=(st%2)?STEP*SWING:0;t+=sw;
    const chord=CHORDS[Math.floor(bar/4)%4];
    const cut=420+340*Math.sin(s/(16*12))+(sec>=2?220:0);
    if(!brk&&st%4===0)kick(G,c,t,bar<4?.7:1);
    if(bar>=2&&!(brk&&bar<60)){
      if(st%4===2)hat(G,c,t,true,.07);
      else if(sec>=1||bar>=6)hat(G,c,t,false,st%2?.05:.08);
    }
    if(bar>=8&&!brk&&(st===4||st===12)&&sec%2===1)clap(G,c,t,.22);
    if(bar>=10&&!brk&&(st===3||st===11||(st===14&&ph%2)))rim(G,c,t,.09);
    if(bar>=8&&!brk){const pat=(Math.floor(bar/8)%2)?BASS_B:BASS;for(const [p,m] of pat)if(p===st)bass(G,c,t,m,cut,STEP*1.6)}
    if(bar>=16&&(st===2||(st===7&&ph%2===1)||(st===10&&ph===6)))stab(G,c,t,chord,brk?1500:700+cut*.6,brk?.09:.07);
    if(bar>=24&&bar%4===0&&st===0)pad(G,c,t,chord,STEP*64,brk?.07:.045);
    if(bar>=32&&Math.random()<(brk?.22:.08)&&st%2===0)plink(G,c,t,PLINK[Math.floor(Math.random()*PLINK.length)],.06);
  }

  function tick(){while(next<ac.currentTime+.15){play({master:out,dly,rev,noise},ac,step,next);next+=STEP;step++}}
  function start(){
    try{
      if(!ac){const C=window.AudioContext||window.webkitAudioContext;if(!C)return;ac=new C();const G=graph(ac,ac.destination);out=G.master;dly=G.dly;rev=G.rev;noise=G.noise}
      ac.resume();if(on)return;on=true;next=ac.currentTime+.08;timer=setInterval(tick,25);
    }catch(e){}
  }
  function stop(){on=false;clearInterval(timer);timer=null;try{ac&&ac.suspend()}catch(e){}}
  function offline(c,seconds,fromBar=0){const G=graph(c,c.destination);let t=.05,s=fromBar*16;while(t<seconds){play(G,c,s,t);t+=STEP;s++}}
  return {start,stop,offline,get on(){return on}};
})();
