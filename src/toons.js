const TOONS=[
 {name:'Will',color:'#3cc46a',face:'#3cc46a',accent:'#ffffff',shape:'oval',hair:'swept',hc:'#3b2d24',mouth:'flat',eyes:'calm',browW:6,brow:'#2e231c',nose:1.2},
 {name:'Ben',color:'#e8453c',face:'#e8453c',accent:'#2f6fe0',shape:'chisel',hair:'crop',hc:'#2a2420',facial:'stubble',fc:'#2a2420',mouth:'smirk',eyes:'calm',browW:6.5,brow:'#2a2420'},
 {name:'David',color:'#f5c518',face:'#f5c518',earc:'#f5c518',accent:'#2456c8',shape:'oval',hat:'cap',hatc:'#12284b',brimc:'#f2b51f',hatband:true,hair:'side',hc:'#6b4a2e',mouth:'grin',eyes:'happy',browW:5,brow:'#6b4a2e'},
 {name:'Nick',color:'#e8b92c',face:'#e8b92c',earc:'#e8b92c',accent:'#1f7a3e',shape:'shield',hair:'medwavy',hc:'#2e1f16',facial:'stubble',fc:'#2e1f16',mouth:'smile',eyes:'normal',browW:5,brow:'#2e1f16'},
 {name:'Louis',color:'#ff6fb5',face:'#ff6fb5',accent:'#ffffff',shape:'egg',hat:'beret',hatc:'#ec5fa8',hair:'side',hc:'#6e655e',glasses:'round',facial:'mustache',fc:'#2a1f1a',mouth:'grin',eyes:'happy',browW:5,brow:'#2a1f1a'},
 {name:'Ari',color:'#ff8a1f',face:'#ff8a1f',accent:'#8a4a1a',shape:'egg',hair:'wisps',hc:'#a9a49e',facial:'beard',fc:'#4a403a',mouth:'grin',eyes:'wide',browW:5,brow:'#5a524c'},
 {name:'Mike',color:'#c3cad2',face:'#c3cad2',accent:'#e5b627',pattern:'metal',shape:'chisel',hair:'blondtop',hc:'#f4dc84',glasses:'thick',mouth:'smile',eyes:'normal',browW:5,brow:'#a8844a'},
 {name:'Matt',color:'#ffd34d',face:'#ffd34d',accent:'#ffffff',pattern:'rainbow',shape:'egg',hair:'short',hc:'#2a1d14',glasses:'sun',rainbow:true,facial:'beard',fc:'#2a1d14',mouth:'open',eyes:'normal',browW:5,brow:'#2a1d14'},
 {name:'Karthik',color:'#6a2fb0',face:'#6a2fb0',accent:'#fdb927',shape:'oval',hat:'cap',hatc:'#552583',brimc:'#fdb927',hatband:true,hair:'long',hc:'#1c1714',facial:'bigbeard',beardLen:84,streak:'rgba(70,58,50,.9)',fc:'#221c18',mouth:'oh',eyes:'wide',browW:6,brow:'#1c1714',nose:1.4},
 {name:'Holmes',color:'#ff6fb5',face:'#ff6fb5',accent:'rainbow',shape:'octagon',hat:'cap',hatc:'#a3214a',hair:'side',hc:'#3a3330',facial:'beard',fc:'#f4f2ec',streak:'rgba(160,155,150,.85)',mouth:'open',eyes:'squint',browW:5,brow:'#5a524c'},
 {name:'Jon',color:'#c3cad2',face:'#c3cad2',accent:'#2f6fe0',pattern:'metal',shape:'squircle',hair:'longwavy',hc:'#2b211b',glasses:'rect',glassc:'#ff4fa3',lens:'rgba(255,214,70,.42)',facial:'beard',beardLen:68,fc:'#7d766f',mouth:'grin',eyes:'happy',browW:5,brow:'#2b211b'},
 {name:'Andy',color:'#e8453c',face:'#e8453c',accent:'#1a2a5e',shape:'shield',hair:'shag',hc:'#b0532e',facial:'stubble',fc:'#8a6a4a',mouth:'toothy',eyes:'happy',browW:5,brow:'#9a4a2a'},
 {name:'Garrett',color:'#e5b627',face:'#e5b627',accent:'#2b2b30',shape:'squircle',hat:'cap',hatc:'#18181c',facial:'goatee',fc:'#9a948c',mouth:'toothy',cig:true,eyes:'happy',browW:5,brow:'#1a1614'},
 {name:'Jake',color:'#ff8a1f',face:'#ff8a1f',accent:'#ffffff',shape:'thin',hat:'cap',hatc:'#8fe3c2',hair:'side',hc:'#8a6a4a',glasses:'round',mouth:'flat',eyes:'calm',browW:5,brow:'#8a6a4a'},
 {name:'Tim',color:'#8fd3ff',face:'#8fd3ff',accent:'#e8453c',shape:'thin',hair:'tousled',hc:'#2a1f18',glasses:'round',glassc:'#5d6b7a',glassW:2.6,mouth:'tongue',eyes:'wide',browW:5,brow:'#2a1f18'},
 {name:'James',color:'#c3cad2',face:'#c3cad2',accent:'#2b2b30',pattern:'metal',shape:'blob',hat:'cap',hatc:'#141416',brimc:'#c9ced6',hatband:true,hair:'side',hc:'#1a1614',mouth:'flat',eyes:'squint',browW:5,brow:'#1a1614'},
 {name:'Gus',color:'#8fd3ff',face:'#8fd3ff',accent:'#c3cad2',shape:'egg',hair:'bald',facial:'beard',fc:'#f2c94c',streak:'rgba(190,140,30,.75)',mouth:'toothy',eyes:'happy',noBrow:true},
 {name:'Steve',color:'#2fb35a',face:'#2fb35a',accent:'#1a1a1d',shape:'egg',hat:'cap',hatc:'#1d1d22',hair:'side',hc:'#6e6660',facial:'beard',fc:'#7d766f',streak:'rgba(225,222,218,.85)',mouth:'grin',eyes:'happy',browW:5.5,brow:'#1a1614'},
 {name:'Sam',color:'#f5d31f',face:'#f5d31f',accent:'#1a1a1d',shape:'oval',hat:'cap',hatc:'#2e3236',hair:'side',hc:'#4a3a2e',facial:'mustache',fc:'#5a4636',mouth:'smile',eyes:'calm',browW:5,brow:'#3a2a20'},
 {name:'Andros',color:'#2f6fe0',face:'#2f6fe0',accent:'#ff8a1f',shape:'oval',hair:'tightcurl',hc:'#1a1412',facial:'beard',fc:'#1a1412',mouth:'smirk',eyes:'calm',browW:6,brow:'#1a1412'},
];
function toonPath(g,shape){
  g.beginPath();
  if(shape==='pill')g.roundRect(-31,-50,62,100,30);
  else if(shape==='octagon'){for(let i=0;i<8;i++){const a=Math.PI/8+i*Math.PI/4;g.lineTo(Math.cos(a)*53,Math.sin(a)*42)}g.closePath()}
  else if(shape==='egg'){g.moveTo(0,-48);g.bezierCurveTo(30,-48,34,-20,40,8);g.bezierCurveTo(48,40,26,50,0,50);g.bezierCurveTo(-26,50,-48,40,-40,8);g.bezierCurveTo(-34,-20,-30,-48,0,-48);g.closePath()}
  else if(shape==='shield'){g.moveTo(-43,-40);g.quadraticCurveTo(0,-50,43,-40);g.lineTo(41,0);g.quadraticCurveTo(36,34,0,56);g.quadraticCurveTo(-36,34,-41,0);g.closePath()}
  else if(shape==='squircle')g.roundRect(-48,-39,96,80,20);
  else if(shape==='bell'){g.moveTo(-26,-34);g.quadraticCurveTo(0,-60,26,-34);g.quadraticCurveTo(36,10,52,42);g.quadraticCurveTo(0,54,-52,42);g.quadraticCurveTo(-36,10,-26,-34);g.closePath()}
  else if(shape==='scallop'){for(let i=0;i<=72;i++){const a=i/72*2*Math.PI,r=42+5*Math.cos(a*10);g.lineTo(Math.cos(a)*r,Math.sin(a)*r)}g.closePath()}
  else if(shape==='oval')g.ellipse(0,2,32,51,0,0,7);
  else if(shape==='rect')g.roundRect(-38,-48,76,98,12);
  else if(shape==='chisel'){g.moveTo(-40,-44);g.quadraticCurveTo(0,-54,40,-44);g.lineTo(44,0);g.lineTo(34,32);g.lineTo(16,48);g.lineTo(-16,48);g.lineTo(-34,32);g.lineTo(-44,0);g.closePath()}
  else if(shape==='thin'){g.moveTo(0,-50);g.bezierCurveTo(30,-50,30,-10,28,14);g.bezierCurveTo(26,40,14,54,0,54);g.bezierCurveTo(-14,54,-26,40,-28,14);g.bezierCurveTo(-30,-10,-30,-50,0,-50);g.closePath()}
  else g.arc(0,0,47,0,7);
}
function shade(hex,f){const n=parseInt(hex.slice(1),16),c=[n>>16,n>>8&255,n&255].map(v=>Math.round(f<0?v*(1+f):v+(255-v)*f));return'rgb('+c+')'}
function drawToon(g,x,y,size,t){
  const s=size/100;g.save();g.translate(x,y);g.scale(s,s);
  const INK='#14100c';g.lineJoin='round';g.lineCap='round';
  const base=t.face||t.color;let acc=t.accent;
  if(acc==='rainbow'){const rg=g.createLinearGradient(-50,-50,50,50);['#ff4d6d','#ff9f1c','#ffe14d','#4dd97a','#4db8ff','#9b6bff'].forEach((c,i)=>rg.addColorStop(i/5,c));acc=rg}
  if(t.face)g.scale(.9,.9);
  // long hair behind
  if(t.hair==='medwavy'){g.fillStyle=t.hc;g.strokeStyle=INK;g.lineWidth=3;for(const [a,b,r] of [[-44,-6,14],[-48,12,14],[-44,28,12],[44,-6,14],[48,12,14],[44,28,12]]){g.beginPath();g.arc(a,b,r,0,7);g.fill();g.stroke()}}
  if(t.hair==='long'||t.hair==='longwavy'){g.fillStyle=t.hc;for(const [a,b,r] of [[-44,-4,15],[-50,16,16],[-48,36,15],[-40,52,13],[44,-4,15],[50,16,16],[48,36,15],[40,52,13]]){g.beginPath();g.arc(a,b,r,0,7);g.fill()}}
  if(t.face){for(const sx of [-1,1]){g.beginPath();g.ellipse(sx*({thin:31,oval:35,pill:34,octagon:54,squircle:50,chisel:47,rect:42}[t.shape]||46),4,8,12,0,0,7);g.fillStyle=t.earc||acc||shade(base,-.08);g.fill();g.lineWidth=4;g.strokeStyle=INK;g.stroke()}}
  // body
  toonPath(g,t.shape);
  let gr=g.createRadialGradient(-14,-18,6,0,0,58);gr.addColorStop(0,shade(base,.3));gr.addColorStop(1,shade(base,-.15));
  if(t.pattern==='rainbow'){gr=g.createLinearGradient(-40,-50,40,50);if(t.phase!=null){for(let i=0;i<=8;i++)gr.addColorStop(i/8,'hsl('+((i*45-t.phase*360)%360+360)%360+',90%,62%)')}else ['#ff4d6d','#ff9f1c','#ffe14d','#4dd97a','#4db8ff','#9b6bff'].forEach((c,i)=>gr.addColorStop(i/5,c))}
  else if(t.pattern==='metal'){gr=g.createLinearGradient(-45,-50,45,50);[['#f7f9fb',0],['#b9c1c9',.35],['#eef1f4',.55],['#8f98a2',1]].forEach(([c,o])=>gr.addColorStop(o,c))}
  else if(t.pattern==='wood'){gr=g.createLinearGradient(-45,0,45,0);gr.addColorStop(0,'#ecd3ad');gr.addColorStop(.5,'#f8e8cc');gr.addColorStop(1,'#e8cca2')}
  g.fillStyle=gr;g.fill();
  g.save();toonPath(g,t.shape);g.clip();
  if(t.pattern==='wood'){g.strokeStyle='rgba(175,130,85,.4)';g.lineWidth=2;for(let x=-50;x<=50;x+=9){g.beginPath();g.moveTo(x,-60);g.bezierCurveTo(x+6,-20,x-6,20,x+3,60);g.stroke()}g.beginPath();g.ellipse(-18,-28,5,9,0,0,7);g.ellipse(22,16,4,7,0,0,7);g.stroke()}
  // stubble / beard clipped to body
  if(t.facial==='stubble'){g.fillStyle=t.fc;g.globalAlpha=.28;g.beginPath();g.ellipse(0,24,32,20,0,0,7);g.fill();g.globalAlpha=.55;for(let i=0;i<60;i++){const a=Math.random()*Math.PI,r=14+Math.random()*16;g.fillRect(Math.cos(a)*r*1.5-1,22+Math.sin(a)*r*.7,1.6,1.6)}g.globalAlpha=1}
  if(t.facial==='beard'||t.facial==='bigbeard'){g.fillStyle=t.fc;g.beginPath();g.moveTo(-42,4);g.quadraticCurveTo(-40,t.facial==='bigbeard'?70:50,0,t.facial==='bigbeard'?72:52);g.quadraticCurveTo(40,t.facial==='bigbeard'?70:50,42,4);g.quadraticCurveTo(30,22,0,14);g.quadraticCurveTo(-30,22,-42,4);g.fill();
    g.strokeStyle=t.streak||shade(t.fc,t.fc==='#8c8580'||t.fc==='#a8a29a'?.35:.25);g.lineWidth=t.streak?2.6:1.6;for(let i=-30;i<=30;i+=8){g.beginPath();g.moveTo(i,26);g.quadraticCurveTo(i+3,36,i,44);g.stroke()}}
  if(t.hair==='bald'||t.hair==='buzz'){g.fillStyle='rgba(255,255,255,.35)';g.beginPath();g.ellipse(-12,-34,12,5,-.3,0,7);g.fill()}
  if(t.hair==='crop'||t.hair==='blondshort'){g.fillStyle=t.hc;g.globalAlpha=.9;g.beginPath();g.moveTo(-60,-6);g.lineTo(-46,-4);g.quadraticCurveTo(-40,-18,-28,-21);g.quadraticCurveTo(0,-27,28,-21);g.quadraticCurveTo(40,-18,46,-4);g.lineTo(60,-6);g.lineTo(60,-70);g.lineTo(-60,-70);g.closePath();g.fill();
    g.globalAlpha=1;g.fillStyle=shade(t.hc,.25);for(let i=0;i<90;i++){const x=-48+Math.random()*96,y=-44+Math.random()*24;g.fillRect(x,y,1.4,1.4)}}
  if(t.hair==='buzz'){g.fillStyle=t.hc;g.globalAlpha=.45;g.beginPath();g.ellipse(0,-44,44,18,0,0,7);g.fill();g.globalAlpha=1}
  g.restore();
  if(acc){g.save();toonPath(g,t.shape);g.clip();toonPath(g,t.shape);g.lineWidth=13;g.strokeStyle=acc;g.stroke();g.restore()}
  toonPath(g,t.shape);g.lineWidth=t.face?6:5;g.strokeStyle=INK;g.stroke();
  if(t.beardLen){g.fillStyle=t.fc;g.strokeStyle=INK;g.lineWidth=4;g.beginPath();g.moveTo(-36,28);g.bezierCurveTo(-34,60,-14,t.beardLen,0,t.beardLen+4);g.bezierCurveTo(14,t.beardLen,34,60,36,28);g.closePath();g.fill();g.stroke();
    g.strokeStyle=t.streak||'rgba(200,195,190,.55)';g.lineWidth=t.streak?3:1.8;for(let x=-24;x<=24;x+=8){g.beginPath();g.moveTo(x,38);g.quadraticCurveTo(x*1.1+3,58,x*.5,t.beardLen-6);g.stroke()}g.strokeStyle=INK}
  // hair on top
  g.save();if(!t.hat&&t.hair!=='swept'&&t.hair!=='shag'&&t.hair!=='wisps'&&t.hair!=='blondshort'&&t.hair!=='tousled'&&t.hair!=='blondtop'&&t.hair!=='tightcurl'&&t.hair!=='combover'&&t.hair!=='receding'){g.translate(0,-28);g.scale(1.22,1.32);g.translate(0,28)}
  g.fillStyle=t.hc;g.strokeStyle=INK;g.lineWidth=3;
  const blobs=(arr)=>{g.beginPath();for(const [a,b,r] of arr){g.moveTo(a+r,b);g.arc(a,b,r,0,7)}g.fill();g.stroke();g.beginPath();for(const [a,b,r] of arr){g.moveTo(a+r-3,b);g.arc(a,b,r-3,0,7)}g.fill()};
  if(t.hair==='swept'){g.save();g.translate(0,-12);g.scale(.98,.66);g.translate(0,12);
    g.beginPath();g.moveTo(-40,-10);g.bezierCurveTo(-52,-40,-46,-74,-20,-86);g.bezierCurveTo(4,-96,34,-90,44,-70);g.bezierCurveTo(52,-52,46,-28,40,-10);
    g.quadraticCurveTo(30,-30,4,-36);g.quadraticCurveTo(-26,-34,-40,-10);g.closePath();g.fill();g.stroke();
    blobs([[-34,-62,9],[-22,-80,10],[-4,-88,10],[16,-86,10],[34,-74,9],[44,-56,8]]);
    g.strokeStyle=shade(t.hc,.28);g.lineWidth=2.5;
    for(const [x0,y0,x1,y1,x2,y2] of [[-30,-34,-30,-64,-10,-78],[-14,-38,-12,-66,10,-80],[2,-38,6,-64,28,-74],[18,-36,24,-58,40,-62]]){g.beginPath();g.moveTo(x0,y0);g.quadraticCurveTo(x1,y1,x2,y2);g.stroke()}
    g.strokeStyle='rgba(200,195,190,.7)';g.lineWidth=2;g.beginPath();g.moveTo(-36,-24);g.quadraticCurveTo(-42,-44,-34,-58);g.moveTo(38,-24);g.quadraticCurveTo(44,-42,38,-54);g.stroke();
    g.strokeStyle=INK;g.lineWidth=3;g.restore();
  }
  if(t.hair==='shag'){g.beginPath();g.moveTo(-46,10);g.bezierCurveTo(-56,-40,-34,-64,0,-64);g.bezierCurveTo(34,-64,56,-40,46,10);
    g.lineTo(40,-4);g.lineTo(34,6);g.lineTo(30,-14);g.lineTo(22,-10);g.lineTo(16,-24);g.lineTo(8,-18);g.lineTo(0,-28);g.lineTo(-8,-22);g.lineTo(-16,-30);g.lineTo(-24,-24);g.lineTo(-32,-28);g.lineTo(-36,-8);g.lineTo(-40,2);g.closePath();g.fill();g.stroke();
    g.strokeStyle=shade(t.hc,.3);g.lineWidth=2;for(const x of [-30,-18,-6,6,18,30]){g.beginPath();g.moveTo(x*.6,-58);g.quadraticCurveTo(x*.9,-44,x,-28);g.stroke()}g.strokeStyle=INK;g.lineWidth=3}
  if(t.hair==='wisps'){g.strokeStyle=t.hc;g.lineWidth=2.4;g.lineCap='round';
    for(const [x,h,c] of [[-14,12,-8],[-7,16,6],[0,14,-6],[7,17,7],[14,12,-5],[-3,10,9],[10,9,-7]]){g.beginPath();g.moveTo(x,-44);g.bezierCurveTo(x+c,-44-h*.5,x-c,-44-h*.8,x+c*.6,-44-h);g.stroke()}
    g.strokeStyle=INK;g.lineWidth=3}
  if(t.hair==='blondshort'){g.beginPath();g.moveTo(-30,-36);const tp=[[-24,-50],[-16,-44],[-8,-54],[0,-46],[8,-55],[16,-46],[24,-51],[30,-38]];for(const [x,y] of tp)g.lineTo(x,y);g.quadraticCurveTo(0,-44,-30,-36);g.closePath();g.fill();g.stroke()}
  if(t.hair==='tousled'){blobs([[-34,-26,11],[-26,-42,13],[-10,-50,13],[8,-51,13],[24,-45,13],[36,-30,11],[-38,-10,9],[39,-12,9]]);
    g.strokeStyle=t.hc;g.lineWidth=3;g.lineCap='round';for(const [x0,y0,x1,y1,x2,y2] of [[-30,-50,-40,-62,-50,-56],[-4,-60,2,-72,-10,-76],[22,-56,34,-66,44,-60],[40,-22,52,-24,56,-14],[-40,-18,-52,-14,-54,-4]]){g.beginPath();g.moveTo(x0,y0);g.quadraticCurveTo(x1,y1,x2,y2);g.stroke()}g.strokeStyle=INK;g.lineWidth=3}
  if(t.hair==='blondtop'){g.beginPath();g.moveTo(-41,-20);g.bezierCurveTo(-46,-50,-30,-64,0,-64);g.bezierCurveTo(30,-64,46,-50,41,-20);g.quadraticCurveTo(34,-34,18,-34);g.quadraticCurveTo(4,-42,-14,-34);g.quadraticCurveTo(-32,-32,-41,-20);g.closePath();g.fill();g.stroke();
    g.strokeStyle=shade(t.hc,-.2);g.lineWidth=2;for(const x of [-26,-12,2,16,28]){g.beginPath();g.moveTo(x,-38);g.quadraticCurveTo(x+6,-50,x+2,-58);g.stroke()}g.strokeStyle=INK;g.lineWidth=3}
  if(t.hair==='tightcurl'){const hw=27,top=-57,bot=-32;
    g.beginPath();g.roundRect(-hw,top,hw*2,bot-top+6,7);g.fill();g.stroke();
    g.fillStyle=shade(t.hc,.25);for(let y=top+5;y<bot;y+=6)for(let x=-hw+5+((y/6|0)%2)*3;x<hw-3;x+=6){g.beginPath();g.arc(x,y,2.4,0,7);g.fill()}
    g.fillStyle=t.hc}
  if(t.hair==='receding'){
    // high receding hairline: hair swept back off a tall forehead, longer and wispy over the ears
    g.lineJoin='round';
    for(const sx of [-1,1]){g.beginPath();g.moveTo(sx*20,-52);g.bezierCurveTo(sx*40,-46,sx*41,-12,sx*39,16);g.quadraticCurveTo(sx*33,4,sx*27,-4);g.quadraticCurveTo(sx*19,-30,sx*8,-46);g.closePath();g.fill()}
    g.beginPath();g.moveTo(-32,-36);g.bezierCurveTo(-28,-64,28,-64,32,-36);g.quadraticCurveTo(26,-40,18,-42);g.quadraticCurveTo(8,-46,0,-44);g.quadraticCurveTo(-8,-46,-18,-42);g.quadraticCurveTo(-26,-40,-32,-36);g.closePath();g.fill();
    g.strokeStyle=shade(t.hc,-.25);g.lineWidth=1.6;for(const x of [-18,-6,6,18]){g.beginPath();g.moveTo(x*.9,-52);g.quadraticCurveTo(x,-58,x*1.15,-62);g.stroke()}
    g.lineCap='round';for(const sx of [-1,1])for(const [a,b,c,d] of [[39,8,47,22],[40,-14,49,-8]]){g.strokeStyle=t.hc;g.lineWidth=3;g.beginPath();g.moveTo(sx*a,b);g.quadraticCurveTo(sx*(a+6),b+2,sx*c,d);g.stroke()}
    g.strokeStyle=INK;g.lineWidth=3}
  if(t.hair==='combover'){
    // side hair low over the ears, a few long strands combed across the bald top
    for(const sx of [-1,1]){g.beginPath();g.moveTo(sx*42,6);g.quadraticCurveTo(sx*48,-18,sx*36,-34);g.quadraticCurveTo(sx*36,-14,sx*34,8);g.closePath();g.fill();g.stroke()}
    g.lineCap='round';
    for(const [y0,y1,y2] of [[-22,-44,-34],[-14,-38,-28],[-28,-50,-40]]){
      g.strokeStyle=INK;g.lineWidth=9;g.beginPath();g.moveTo(-40,y0);g.bezierCurveTo(-26,y1,14,y1-4,40,y2);g.stroke();
      g.strokeStyle=t.hc;g.lineWidth=5.5;g.beginPath();g.moveTo(-40,y0);g.bezierCurveTo(-26,y1,14,y1-4,40,y2);g.stroke()}
    g.strokeStyle=INK;g.lineWidth=3}
  if(t.hair==='curly')blobs([[-30,-36,11],[-16,-46,12],[0,-50,12],[16,-46,12],[30,-36,11],[-38,-22,9],[38,-22,9]]);
  if(t.hair==='short'&&!t.hat){g.beginPath();g.moveTo(-38,-22);g.quadraticCurveTo(-36,-54,0,-52);g.quadraticCurveTo(36,-54,38,-22);g.quadraticCurveTo(20,-36,0,-34);g.quadraticCurveTo(-20,-36,-38,-22);g.fill();g.stroke()}
  if(t.hair==='side'&&!t.hat){g.beginPath();g.moveTo(-40,-16);g.quadraticCurveTo(-42,-52,4,-50);g.quadraticCurveTo(40,-48,40,-20);g.quadraticCurveTo(14,-40,-14,-28);g.quadraticCurveTo(-30,-22,-40,-16);g.fill();g.stroke()}
  if(t.hair==='side'&&t.hat){const hx=t.shape==='thin'?30:40;blobs([[-hx,-14,7],[hx,-14,7]])}
  if(t.hair==='wavy'||t.hair==='longwavy'||t.hair==='medwavy')blobs([[-32,-30,10],[-20,-42,11],[-4,-47,11],[12,-46,11],[27,-38,10],[36,-26,8]]);
  if(t.hair==='messy'){g.beginPath();g.moveTo(-40,-14);const pts=[[-44,-28],[-38,-36],[-42,-46],[-28,-44],[-24,-56],[-10,-48],[0,-58],[12,-49],[26,-55],[28,-44],[42,-44],[38,-32],[44,-24],[38,-16]];for(const [a,b] of pts)g.lineTo(a,b);g.quadraticCurveTo(10,-34,-14,-26);g.quadraticCurveTo(-30,-22,-40,-14);g.closePath();g.fill();g.stroke()}
  if(t.hair==='fringe'){g.save();toonPath(g,t.shape);g.clip();g.strokeStyle=t.hc;g.lineWidth=9;for(const sx of [-1,1]){g.beginPath();g.moveTo(sx*40,2);g.quadraticCurveTo(sx*41,-14,sx*33,-26);g.stroke()}g.restore();g.strokeStyle=INK}
  if(t.hair==='bowl'){g.beginPath();g.moveTo(-42,-4);g.quadraticCurveTo(-48,-56,0,-54);g.quadraticCurveTo(48,-56,42,-4);g.lineTo(34,-6);g.quadraticCurveTo(28,-22,14,-22);g.lineTo(8,-16);g.lineTo(0,-23);g.lineTo(-10,-17);g.lineTo(-18,-23);g.quadraticCurveTo(-30,-22,-34,-6);g.closePath();g.fill();g.stroke()}
  g.restore();g.fillStyle=t.hc;g.strokeStyle=INK;g.lineWidth=3;
  if(t.hat==='beret'){g.save();g.fillStyle=t.hatc;g.beginPath();g.ellipse(4,-40,52,20,-.18,0,7);g.fill();g.stroke();g.fillStyle=shade(t.hatc,-.2);g.beginPath();g.ellipse(2,-30,38,6,-.18,0,Math.PI);g.fill();g.fillStyle=t.hatc;g.beginPath();g.moveTo(8,-58);g.quadraticCurveTo(12,-70,18,-66);g.lineTo(14,-58);g.closePath();g.fill();g.stroke();g.fillStyle='rgba(255,255,255,.3)';g.beginPath();g.ellipse(-14,-48,14,5,-.2,0,7);g.fill();g.restore()}
  else if(t.hat==='knit'){g.save();if(t.shape==='thin')g.scale(.8,1);g.fillStyle=t.hatc;g.strokeStyle=INK;g.lineWidth=3;
    g.beginPath();g.moveTo(-42,-20);g.bezierCurveTo(-44,-70,44,-70,42,-20);g.closePath();g.fill();g.stroke();
    g.strokeStyle=shade(t.hatc,-.22);g.lineWidth=2.5;for(let x=-30;x<=30;x+=10){g.beginPath();g.moveTo(x*.9,-56+Math.abs(x)*.25);g.quadraticCurveTo(x,-40,x*1.05,-26);g.stroke()}
    g.fillStyle=shade(t.hatc,-.12);g.strokeStyle=INK;g.lineWidth=3;g.beginPath();g.roundRect(-46,-30,92,16,7);g.fill();g.stroke();
    g.strokeStyle=shade(t.hatc,-.3);g.lineWidth=2;for(let x=-40;x<=40;x+=6){g.beginPath();g.moveTo(x,-28);g.lineTo(x,-16);g.stroke()}
    g.fillStyle=t.pomc||shade(t.hatc,.35);g.strokeStyle=INK;g.lineWidth=3;g.beginPath();g.arc(0,-66,9,0,7);g.fill();g.stroke();g.restore()}
  else if(t.hat){g.save();if(t.shape==='thin')g.scale(.8,1);g.fillStyle=t.hatc;g.beginPath();g.moveTo(-40,-22);g.quadraticCurveTo(-40,-60,0,-60);g.quadraticCurveTo(40,-60,40,-22);g.closePath();g.fill();g.stroke();
    g.fillStyle=t.brimc||shade(t.hatc,.15);g.beginPath();
    if(t.hat==='beret'){}
    else if(t.hat==='flat'){g.roundRect(-48,-26,96,9,4)}else{g.moveTo(-42,-22);g.quadraticCurveTo(0,-34,46,-22);g.quadraticCurveTo(30,-12,-30,-14);g.closePath()}
    g.fill();g.stroke();g.fillStyle=t.brimc||shade(t.hatc,.25);g.beginPath();g.arc(0,-59,3,0,7);g.fill();if(t.hatband){g.strokeStyle=t.brimc;g.lineWidth=3;g.beginPath();g.moveTo(-38,-26);g.quadraticCurveTo(0,-34,38,-26);g.stroke();g.strokeStyle=INK}g.restore()}
  // eyes
  const ey=-4,ex=15;
  if(t.glasses==='sun'){let lf='#1a1410';if(t.rainbow){lf=g.createLinearGradient(0,ey-11,0,ey+11);['#ff4d6d','#ff9f1c','#ffe14d','#4dd97a','#4db8ff','#9b6bff'].forEach((c,i)=>lf.addColorStop(i/5,c))}g.fillStyle=lf;g.beginPath();g.roundRect(-34,ey-11,28,22,8);g.roundRect(6,ey-11,28,22,8);g.fill();if(t.rainbow){g.strokeStyle='#1a1410';g.lineWidth=3;g.stroke();g.strokeStyle=INK}g.lineWidth=4;g.beginPath();g.moveTo(-6,ey-4);g.lineTo(6,ey-4);g.moveTo(-34,ey-6);g.lineTo(-44,ey-9);g.moveTo(34,ey-6);g.lineTo(44,ey-9);g.stroke();
    g.fillStyle=t.rainbow?'rgba(255,255,255,.7)':'rgba(255,170,60,.85)';g.beginPath();g.ellipse(-24,ey-3,6,3,-.4,0,7);g.ellipse(16,ey-3,6,3,-.4,0,7);g.fill()}
  else{
    const er=t.eyes==='wide'?13:11;
    for(const sx of [-1,1]){
      g.fillStyle='#fff';g.beginPath();g.ellipse(sx*ex,ey,er-1,t.eyes==='squint'?6:er,0,0,7);g.fill();g.lineWidth=3;g.strokeStyle=INK;g.stroke();
      g.fillStyle=INK;g.beginPath();g.arc(sx*ex+2,ey+1,t.eyes==='wide'?4:5,0,7);g.fill();
      g.fillStyle='#fff';g.beginPath();g.arc(sx*ex+3.5,ey-1,1.6,0,7);g.fill();
      if(t.eyes==='happy'){g.fillStyle=gr;g.beginPath();g.ellipse(sx*ex,ey+er+1,er+2,6,0,0,7);g.fill()}
      if(t.eyes==='calm'){g.fillStyle=shade(base,-.05);g.beginPath();g.ellipse(sx*ex,ey-er+2,er+1,6,0,0,7);g.fill();g.lineWidth=3;g.beginPath();g.moveTo(sx*ex-er,ey-4);g.lineTo(sx*ex+er,ey-4);g.stroke()}
    }
    if(!t.noBrow){g.strokeStyle=t.brow?t.brow:INK;g.lineWidth=t.browW||4;g.beginPath();g.moveTo(-ex-9,ey-er-6);g.quadraticCurveTo(-ex,ey-er-10,-ex+9,ey-er-6);g.moveTo(ex-9,ey-er-6);g.quadraticCurveTo(ex,ey-er-10,ex+9,ey-er-6);g.stroke();}
    if(t.glasses==='rect'){g.fillStyle=t.lens||'rgba(200,120,90,.25)';g.beginPath();g.roundRect(-ex-15,ey-10,30,21,5);g.roundRect(ex-15,ey-10,30,21,5);g.fill();g.strokeStyle=t.glassc||'#26304f';g.lineWidth=4.5;g.stroke();g.beginPath();g.moveTo(-1,ey-3);g.lineTo(1,ey-3);g.moveTo(-ex-15,ey-4);g.lineTo(-44,ey-7);g.moveTo(ex+15,ey-4);g.lineTo(44,ey-7);g.stroke();g.strokeStyle=INK}
    if(t.glasses==='thick'){g.fillStyle='rgba(255,255,255,.15)';g.beginPath();g.roundRect(-ex-16,ey-12,32,23,6);g.roundRect(ex-16,ey-12,32,23,6);g.fill();g.strokeStyle='#141010';g.lineWidth=7.5;g.stroke();g.lineWidth=6;g.beginPath();g.moveTo(-1,ey-5);g.lineTo(1,ey-5);g.moveTo(-ex-16,ey-6);g.lineTo(-46,ey-9);g.moveTo(ex+16,ey-6);g.lineTo(46,ey-9);g.stroke();g.strokeStyle=INK}
    if(t.glasses==='round'){g.strokeStyle=t.glassc||INK;g.lineWidth=t.glassW||4;g.beginPath();g.arc(-ex,ey,14,0,7);g.moveTo(ex+14,ey);g.arc(ex,ey,14,0,7);g.moveTo(-1,ey-2);g.quadraticCurveTo(0,ey-5,1,ey-2);g.moveTo(-ex-14,ey-2);g.lineTo(-44,ey-6);g.moveTo(ex+14,ey-2);g.lineTo(44,ey-6);g.stroke()}
  }
  // nose
  if(t.face){g.strokeStyle=acc?(typeof acc!=='string'?acc:acc==='#ffffff'?'#ffffff':shade(acc,-.1)):shade(base,-.4);g.lineWidth=3.5;g.beginPath();g.moveTo(-2,0);g.quadraticCurveTo(-7*(t.nose||1),12,0,13);g.quadraticCurveTo(5,13,7,10);g.stroke()}else{g.fillStyle=shade(t.color,-.25);g.beginPath();g.ellipse(0,9,5,4,0,0,7);g.fill()}
  // mustache
  if(t.stache||t.facial==='mustache'||t.facial==='beard'||t.facial==='bigbeard'||t.facial==='goatee'){g.fillStyle=t.sc||t.fc;g.save();if(t.facial==='mustache'){g.translate(0,17);g.scale(1.4,1.5);g.translate(0,-17)}g.beginPath();g.moveTo(-17,19);g.quadraticCurveTo(-8,10,0,15);g.quadraticCurveTo(8,10,17,19);g.quadraticCurveTo(8,17,0,19);g.quadraticCurveTo(-8,17,-17,19);g.fill();g.strokeStyle=INK;g.lineWidth=1.5;g.stroke();g.restore()}
  if(t.facial==='goatee'){g.fillStyle=t.fc;g.beginPath();g.moveTo(-9,32);g.quadraticCurveTo(0,48,9,32);g.closePath();g.fill()}
  // mouth
  const my=24;g.strokeStyle=INK;g.lineWidth=3.5;
  if(t.mouth==='tongue'){g.fillStyle='#5a1414';g.beginPath();g.ellipse(0,my,7,6,0,0,7);g.fill();g.stroke();
    g.fillStyle='#ff7f94';g.beginPath();g.moveTo(-7,my+2);g.lineTo(-7,my+12);g.quadraticCurveTo(-7,my+21,0,my+21);g.quadraticCurveTo(7,my+21,7,my+12);g.lineTo(7,my+2);g.closePath();g.fill();g.lineWidth=2.5;g.stroke();
    g.strokeStyle='#d9506a';g.lineWidth=1.8;g.beginPath();g.moveTo(0,my+6);g.lineTo(0,my+15);g.stroke();g.strokeStyle=INK}
  else if(t.mouth==='line'){g.lineWidth=3.5;g.beginPath();g.moveTo(-13,my+1);g.lineTo(13,my+1);g.stroke()}
  else if(t.mouth==='smirk'){g.beginPath();g.moveTo(-12,my+1);g.quadraticCurveTo(2,my+6,14,my-4);g.stroke();g.lineWidth=2.5;g.beginPath();g.moveTo(12,my-6);g.quadraticCurveTo(16,my-3,15,my);g.stroke()}
  else if(t.mouth==='flat'){g.beginPath();g.moveTo(-10,my);g.quadraticCurveTo(0,my+2,10,my);g.stroke()}
  else if(t.mouth==='smile'){g.beginPath();g.moveTo(-14,my-2);g.quadraticCurveTo(0,my+10,14,my-2);g.stroke()}
  else{
    const m=new Path2D();
    if(t.mouth==='oh')m.ellipse(0,my+2,7,9,0,0,7);
    else if(t.mouth==='talk')m.ellipse(0,my+1,10,6,0,0,7);
    else{const w=t.mouth==='open'?15:17,d=t.mouth==='open'?14:11;m.moveTo(-w,my-3);m.quadraticCurveTo(0,my-1,w,my-3);m.quadraticCurveTo(0,my+d+6,-w,my-3);m.closePath()}
    g.fillStyle='#5a1414';g.fill(m);g.save();g.clip(m);
    if(t.mouth!=='oh'&&t.mouth!=='talk'){g.fillStyle='#fff';g.fillRect(-20,my-6,40,t.mouth==='toothy'?9:6)}
    g.fillStyle='#e0606a';g.beginPath();g.ellipse(0,my+14,9,6,0,0,7);g.fill();g.restore();
    g.stroke(m);
  }
  if(t.cig){g.save();g.translate(14,30);g.rotate(-.18);g.fillStyle='#f4f1ea';g.strokeStyle=INK;g.lineWidth=2;g.beginPath();g.roundRect(0,-3,26,6,2);g.fill();g.stroke();
    g.fillStyle='#d9a066';g.fillRect(0,-3,8,6);g.fillStyle='#ff5a1f';g.beginPath();g.roundRect(24,-3,4,6,1.5);g.fill();g.fillStyle='#8a8580';g.fillRect(23,-3,2,6);g.restore();
    g.strokeStyle='rgba(235,235,240,.85)';g.lineWidth=3;g.lineCap='round';g.beginPath();g.moveTo(44,22);g.bezierCurveTo(52,12,40,4,48,-6);g.bezierCurveTo(54,-14,46,-22,52,-30);g.stroke();
    g.lineWidth=2;g.strokeStyle='rgba(235,235,240,.6)';g.beginPath();g.moveTo(42,20);g.bezierCurveTo(36,10,46,2,40,-8);g.stroke();g.strokeStyle=INK}
  if(t.mask){g.save();toonPath(g,t.shape);g.clip();
    const mk=new Path2D();mk.moveTo(-50,14);mk.quadraticCurveTo(0,6,50,14);mk.lineTo(50,40);mk.quadraticCurveTo(0,60,-50,40);mk.closePath();
    g.fillStyle='#9fd6ea';g.fill(mk);g.strokeStyle='rgba(60,120,150,.55)';g.lineWidth=2;for(const y of [22,29,36]){g.beginPath();g.moveTo(-40,y);g.quadraticCurveTo(0,y+6,40,y);g.stroke()}
    g.strokeStyle=INK;g.lineWidth=2.5;g.stroke(mk);g.restore();
    g.strokeStyle='#ffffff';g.lineWidth=2.5;for(const sx of [-1,1]){g.beginPath();g.moveTo(sx*44,17);g.quadraticCurveTo(sx*54,10,sx*52,0);g.moveTo(sx*44,36);g.quadraticCurveTo(sx*58,26,sx*52,8);g.stroke()}g.strokeStyle=INK}
  // shine
  g.fillStyle='rgba(255,255,255,.35)';g.beginPath();g.ellipse(-24,-20,7,4,-.6,0,7);g.fill();
  g.restore();
}
