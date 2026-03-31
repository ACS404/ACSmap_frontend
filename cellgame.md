---
layout: opencs
permalink: /cellgame
---

<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,sans-serif;background:#f5f4f0;display:flex;justify-content:center;align-items:flex-start;padding:20px;min-height:100vh}
#app{width:100%;max-width:740px}
h1{font-size:15px;font-weight:500;color:#444;margin-bottom:10px;text-align:center}
#game{width:100%;background:#fff;border:1px solid #ddd;border-radius:12px;overflow:hidden;user-select:none;position:relative}
#canvas{display:block;width:100%}
#ui{padding:10px 14px;border-top:1px solid #eee;display:flex;gap:10px;align-items:center;flex-wrap:wrap;background:#fafaf8}
.bar-wrap{flex:1;min-width:120px}
.bar-label{font-size:11px;color:#888;margin-bottom:3px}
.bar{height:8px;border-radius:4px;background:#eee;overflow:hidden}
.bar-fill{height:100%;border-radius:4px;transition:width 0.3s}
#status-box{flex:2;min-width:180px;font-size:12px;color:#666;line-height:1.5;padding:6px 10px;background:#f5f4f0;border-radius:8px}
#controls{font-size:11px;color:#aaa;text-align:right;min-width:100px}
#overlay{position:absolute;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.6);flex-direction:column;gap:12px}
#overlay-card{background:#fff;border-radius:12px;padding:24px 28px;max-width:400px;text-align:center;border:1px solid #eee}
#overlay-title{font-size:18px;font-weight:500;margin-bottom:8px;color:#222}
#overlay-body{font-size:13px;color:#555;line-height:1.6;margin-bottom:16px}
#overlay-btn{padding:8px 20px;border-radius:8px;border:1px solid #ccc;background:#fff;color:#333;font-size:13px;cursor:pointer;font-family:inherit}
#overlay-btn:hover{background:#f5f4f0}
</style>

<body>
<div id="app">
  <h1>Cell Cycle &amp; Cancer — Interactive RPG</h1>
  <div id="game">
    <canvas id="canvas" height="420"></canvas>
    <div id="ui">
      <div class="bar-wrap">
        <div class="bar-label">DNA Integrity</div>
        <div class="bar"><div class="bar-fill" id="dna-bar" style="background:#1D9E75;width:100%"></div></div>
      </div>
      <div class="bar-wrap">
        <div class="bar-label">Damage</div>
        <div class="bar"><div class="bar-fill" id="dmg-bar" style="background:#D85A30;width:0%"></div></div>
      </div>
      <div id="status-box">Phase: <strong id="phase-label">G1</strong> — <span id="phase-desc">Growing. Collect nutrients, avoid mutagens.</span></div>
      <div id="controls">Arrow keys / WASD<br>SPACE to use repair</div>
    </div>
    <div id="overlay">
      <div id="overlay-card">
        <div id="overlay-title">Cell Cycle Journey</div>
        <div id="overlay-body">You are a cell navigating the cell cycle. Collect nutrients, pass checkpoints, and avoid mutagens that damage your DNA. p53 will watch over you — but if damage gets too high, the cycle ends.<br><br>Each phase teaches you how cancer really develops.</div>
        <button id="overlay-btn" onclick="startGame()">Begin</button>
      </div>
    </div>
  </div>
  <div style="font-size:11px;color:#aaa;margin-top:8px;text-align:center">Collect nutrients to unlock checkpoints &middot; SPACE activates DNA repair &middot; p53 triggers automatically at high damage</div>
</div>

<script>
const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');
const W=canvas.width=700,H=420;

const COL={
  teal:'#1D9E75',tealLight:'#9FE1CB',
  coral:'#D85A30',
  purple:'#534AB7',purpleLight:'#CEBFF6',
  gray:'#888780',
  amber:'#BA7517',
  green:'#639922',
  red:'#E24B4A',
  blue:'#185FA5',blueLight:'#B5D4F4'
};

const PHASES=[
  {name:'G1',full:'Gap 1 — Growth',color:COL.teal,desc:'Growing. Collect nutrients. Avoid UV mutagens.'},
  {name:'S',full:'S Phase — DNA Synthesis',color:COL.purple,desc:'Replicating DNA. Avoid chemical mutagens.'},
  {name:'G2',full:'Gap 2 — Preparation',color:COL.amber,desc:'Preparing to divide. p53 checkpoint ahead.'},
  {name:'M',full:'M Phase — Mitosis',color:COL.blue,desc:'Dividing! Segregate chromosomes correctly.'},
];

let state={
  phase:0,dna:100,damage:0,repairCooldown:0,repairCharges:3,score:0,
  nutrients:0,nutrientsNeeded:5,checkpointOpen:false,checkpointPassed:false,
  gameOver:false,won:false,particles:[],floatTexts:[],p53Active:false,p53Timer:0,
  keys:{},frameCount:0
};

let player={x:80,y:H/2,size:16};
let entities=[];
const checkpointX=620;
let walls=[];

function showOverlay(title,body,btnText,action){
  document.getElementById('overlay-title').textContent=title;
  document.getElementById('overlay-body').textContent=body;
  const btn=document.getElementById('overlay-btn');
  btn.textContent=btnText;
  btn.onclick=action||null;
  document.getElementById('overlay').style.display='flex';
}
function hideOverlay(){document.getElementById('overlay').style.display='none';}

function startGame(){hideOverlay();resetPhase(0);loop();}

function resetPhase(phaseIdx){
  state.phase=phaseIdx;state.checkpointPassed=false;state.checkpointOpen=false;
  state.nutrients=0;state.nutrientsNeeded=4+phaseIdx*2;state.repairCooldown=0;
  player.x=60;player.y=H/2;
  entities=[];walls=[];
  generateEntities(phaseIdx);generateWalls(phaseIdx);updateUI();
}

function generateWalls(p){
  walls=[];
  if(p===0){walls.push({x:220,y:80,w:20,h:140},{x:400,y:200,w:20,h:140});}
  else if(p===1){walls.push({x:180,y:60,w:20,h:160},{x:360,y:180,w:20,h:160},{x:540,y:60,w:20,h:140});}
  else if(p===2){walls.push({x:200,y:100,w:200,h:20},{x:400,y:280,w:200,h:20});}
  else{walls.push({x:150,y:130,w:20,h:160},{x:350,y:130,w:20,h:160},{x:550,y:130,w:20,h:160});}
}

function generateEntities(p){
  const mutagens=[
    {type:'mutagen',label:'UV',color:COL.amber,size:14,dmg:12,desc:'UV radiation — thymine dimers'},
    {type:'mutagen',label:'C',color:COL.coral,size:12,dmg:15,desc:'Chemical carcinogen — DNA adducts'},
    {type:'mutagen',label:'Me',color:COL.gray,size:12,dmg:10,desc:'Heavy metal — breaks repair enzymes'},
    {type:'mutagen',label:'V',color:COL.red,size:13,dmg:20,desc:'HPV — inactivates p53 and Rb'},
    {type:'mutagen',label:'O',color:COL.amber,size:10,dmg:8,desc:'Free radical — oxidative damage'},
  ];
  const nutrients=[
    {type:'nutrient',color:COL.green,label:'N',desc:'Nutrient — fuels healthy growth'},
    {type:'nutrient',color:COL.teal,label:'A',desc:'Antioxidant — protects DNA'},
    {type:'nutrient',color:COL.blueLight,label:'R',desc:'Repair enzyme — fixes damage'},
  ];
  for(let i=0;i<6+p*2;i++){
    const m={...mutagens[(i+p)%mutagens.length]};
    m.x=150+Math.random()*450;m.y=40+Math.random()*(H-100);
    m.vx=(Math.random()-0.5)*1.5;m.vy=(Math.random()-0.5)*1.5;
    m.angle=0;m.hit=false;entities.push(m);
  }
  for(let i=0;i<state.nutrientsNeeded+2;i++){
    const n={...nutrients[i%nutrients.length]};
    n.x=150+Math.random()*400;n.y=50+Math.random()*(H-100);
    n.size=10;n.collected=false;n.bob=Math.random()*Math.PI*2;entities.push(n);
  }
  if(p===3){
    entities.push({type:'chromosome',x:360,y:H/2,color:COL.purple,size:18,collected:false});
    entities.push({type:'chromosome',x:340,y:H/2-30,color:COL.purpleLight,size:18,collected:false});
  }
}

function addParticle(x,y,color,vx,vy,life){
  state.particles.push({x,y,color,vx,vy,life,maxLife:life,size:3+Math.random()*3});
}
function addFloat(x,y,text,color){
  state.floatTexts.push({x,y,text,color,life:60,alpha:1});
}

document.addEventListener('keydown',e=>{
  state.keys[e.code]=true;
  if(e.code==='Space'){e.preventDefault();tryRepair();}
  if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code))e.preventDefault();
});
document.addEventListener('keyup',e=>{state.keys[e.code]=false;});

function tryRepair(){
  if(state.repairCharges>0&&state.repairCooldown<=0&&state.damage>0){
    state.repairCharges--;state.repairCooldown=90;
    const healed=Math.min(state.damage,25);
    state.damage=Math.max(0,state.damage-healed);state.dna=Math.min(100,state.dna+healed);
    addFloat(player.x,player.y-20,'DNA Repaired!',COL.teal);
    for(let i=0;i<8;i++)addParticle(player.x,player.y,COL.teal,(Math.random()-0.5)*3,(Math.random()-0.5)*3,40);
    updateUI();
  }
}

function rectOverlap(ax,ay,aw,ah,bx,by,bw,bh){return ax<bx+bw&&ax+aw>bx&&ay<by+bh&&ay+ah>by;}

function update(){
  state.frameCount++;
  if(state.repairCooldown>0)state.repairCooldown--;
  if(state.p53Timer>0)state.p53Timer--;else state.p53Active=false;

  const speed=2.2;let dx=0,dy=0;
  if(state.keys['ArrowLeft']||state.keys['KeyA'])dx-=speed;
  if(state.keys['ArrowRight']||state.keys['KeyD'])dx+=speed;
  if(state.keys['ArrowUp']||state.keys['KeyW'])dy-=speed;
  if(state.keys['ArrowDown']||state.keys['KeyS'])dy+=speed;
  if(dx&&dy){dx*=0.707;dy*=0.707;}

  const ps=player.size;
  let nx=Math.max(ps,Math.min(W-ps,player.x+dx));
  let ny=Math.max(20,Math.min(H-20,player.y+dy));

  for(const w of walls){
    if(rectOverlap(nx-ps,ny-ps,ps*2,ps*2,w.x,w.y,w.w,w.h)){
      if(dx!==0&&!rectOverlap(player.x-ps,ny-ps,ps*2,ps*2,w.x,w.y,w.w,w.h))nx=player.x;
      if(dy!==0&&!rectOverlap(nx-ps,player.y-ps,ps*2,ps*2,w.x,w.y,w.w,w.h))ny=player.y;
    }
  }
  player.x=nx;player.y=ny;

  for(const e of entities){
    if(e.type==='mutagen'){
      e.x+=e.vx;e.y+=e.vy;e.angle+=0.04;
      if(e.x<30||e.x>W-30)e.vx*=-1;
      if(e.y<30||e.y>H-30)e.vy*=-1;
      if(!e.hit&&Math.hypot(player.x-e.x,player.y-e.y)<ps+e.size){
        e.hit=true;setTimeout(()=>{e.hit=false;},1200);
        let d=e.dmg;if(state.p53Active)d=Math.floor(d*0.4);
        state.damage=Math.min(100,state.damage+d);state.dna=Math.max(0,state.dna-d);
        addFloat(player.x,player.y-20,`-${d} DNA`,COL.coral);
        for(let i=0;i<6;i++)addParticle(e.x,e.y,e.color,(Math.random()-0.5)*4,(Math.random()-0.5)*4,30);
        if(state.damage>=80&&!state.p53Active)activateP53();
        if(state.dna<=0)endGame(false);
        updateUI();
      }
    } else if(e.type==='nutrient'&&!e.collected){
      e.bob+=0.06;
      if(Math.hypot(player.x-e.x,player.y-e.y)<ps+e.size+4){
        e.collected=true;state.nutrients++;state.score+=10;
        if(e.label==='A'){state.damage=Math.max(0,state.damage-5);state.dna=Math.min(100,state.dna+5);}
        if(e.label==='R'&&state.repairCharges<5)state.repairCharges++;
        addFloat(e.x,e.y-10,e.desc.split('—')[0].trim(),e.color);
        for(let i=0;i<5;i++)addParticle(e.x,e.y,e.color,(Math.random()-0.5)*2,(Math.random()-0.5)*2,25);
        updateUI();
      }
    } else if(e.type==='chromosome'&&!e.collected){
      if(Math.hypot(player.x-e.x,player.y-e.y)<ps+e.size){
        e.collected=true;state.nutrients++;
        addFloat(e.x,e.y-15,'Chromosome segregated!',COL.purple);updateUI();
      }
    }
  }

  if(!state.checkpointPassed&&state.nutrients>=state.nutrientsNeeded)state.checkpointOpen=true;
  if(state.checkpointOpen&&!state.checkpointPassed&&Math.hypot(player.x-checkpointX,player.y-H/2)<30)passCheckpoint();

  state.particles=state.particles.filter(p=>{p.x+=p.vx;p.y+=p.vy;p.life--;p.vx*=0.9;p.vy*=0.9;return p.life>0;});
  state.floatTexts=state.floatTexts.filter(f=>{f.y-=0.7;f.life--;f.alpha=f.life/60;return f.life>0;});
}

function activateP53(){
  state.p53Active=true;state.p53Timer=180;state.repairCharges=Math.min(state.repairCharges+2,5);
  addFloat(W/2,H/2-30,'p53 ACTIVATED — Repair Mode!',COL.green);
  for(let i=0;i<15;i++)addParticle(W/2,H/2,COL.green,(Math.random()-0.5)*5,(Math.random()-0.5)*5,50);
}

function passCheckpoint(){
  state.checkpointPassed=true;state.checkpointOpen=false;
  const p=state.phase;
  const msgs=[
    ['G1 Checkpoint Passed!','The Restriction Point (G1/S checkpoint) is cleared. Your cell has enough nutrients and minimal DNA damage. Now entering DNA Synthesis — the cell replicates all chromosomes. Replication errors here introduce mutations that can drive cancer.','Continue to S Phase',()=>{hideOverlay();resetPhase(1);}],
    ['S Phase Complete!','DNA synthesis done — all chromosomes duplicated. Entering Gap 2. The G2/M checkpoint with p53 verifies DNA integrity before committing to division. A mutated BRCA gene would make this replication far riskier by disabling repair.','Continue to G2',()=>{hideOverlay();resetPhase(2);}],
    ['G2 Checkpoint — p53 Inspects!','p53 scans all replicated DNA. If damage is found, p53 halts division and activates repair. If repair fails, p53 triggers apoptosis (programmed cell death). HPV inactivates p53 with its E6 protein — the guardian is silenced, enabling cancer.','Continue to Mitosis',()=>{hideOverlay();resetPhase(3);}],
    ['Cell Division Complete!','Mitosis complete — two healthy daughter cells. If mutations had accumulated in proto-oncogenes (like RAS) or tumor suppressors (like p53, Rb), these daughters would divide uncontrollably. That uncontrolled proliferation is the definition of cancer.','Play Again',()=>{hideOverlay();resetAll();}],
  ];
  if(p<3){showOverlay(...msgs[p]);}
  else{state.score+=100;endGame(true);}
}

function endGame(won){
  state.gameOver=true;
  if(won){
    showOverlay('Healthy Division — '+state.score+' pts','Your cell completed the full cycle without becoming cancerous. DNA integrity maintained, all checkpoints passed, p53 kept watch. Cancer requires multiple "hits" — accumulation of mutations in oncogenes AND tumor suppressors, typically over decades.','Play Again',resetAll);
  } else {
    showOverlay('Cell Cycle Disrupted','Excessive DNA damage overwhelmed repair systems. This mirrors cancer: mutagens accumulate damage faster than the cell can fix. Without p53 arrest or apoptosis, the cell divides with broken DNA — producing a tumor.','Try Again',resetAll);
  }
}

function resetAll(){
  hideOverlay();
  Object.assign(state,{phase:0,dna:100,damage:0,repairCooldown:0,repairCharges:3,score:0,nutrients:0,nutrientsNeeded:5,checkpointOpen:false,checkpointPassed:false,gameOver:false,won:false,particles:[],floatTexts:[],p53Active:false,p53Timer:0,frameCount:0,keys:{}});
  resetPhase(0);
}

function updateUI(){
  document.getElementById('dna-bar').style.width=state.dna+'%';
  document.getElementById('dmg-bar').style.width=state.damage+'%';
  const ph=PHASES[state.phase];
  const lbl=document.getElementById('phase-label');
  lbl.textContent=ph.name;lbl.style.color=ph.color;
  document.getElementById('phase-desc').textContent=ph.desc;
}

function drawCell(){
  const ph=PHASES[state.phase];const t=state.frameCount;
  ctx.save();ctx.translate(player.x,player.y);
  const pulse=1+Math.sin(t*0.08)*0.06;ctx.scale(pulse,pulse);
  if(state.p53Active){ctx.shadowColor=COL.green;ctx.shadowBlur=12;}
  ctx.beginPath();ctx.arc(0,0,player.size,0,Math.PI*2);ctx.fillStyle=ph.color;ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,0.5)';ctx.lineWidth=2;ctx.stroke();
  ctx.beginPath();ctx.arc(0,0,player.size*0.45,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,0.3)';ctx.fill();
  if(state.repairCooldown>0){
    ctx.beginPath();ctx.arc(0,0,player.size+4,Math.PI*1.5,Math.PI*1.5+Math.PI*2*(1-state.repairCooldown/90));
    ctx.strokeStyle='rgba(255,255,255,0.6)';ctx.lineWidth=2;ctx.stroke();
  }
  ctx.restore();
}

function drawEntities(){
  for(const e of entities){
    if(e.collected||e.hit===true)continue;
    ctx.save();ctx.translate(e.x,e.y);
    if(e.type==='mutagen'){
      ctx.rotate(e.angle);ctx.beginPath();
      for(let i=0;i<5;i++){const a=i*Math.PI*2/5-Math.PI/2;const r=i%2===0?e.size:e.size*0.5;i===0?ctx.moveTo(Math.cos(a)*r,Math.sin(a)*r):ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);}
      ctx.closePath();ctx.fillStyle=e.color+'cc';ctx.fill();ctx.strokeStyle=e.color;ctx.lineWidth=1.5;ctx.stroke();
      ctx.fillStyle='rgba(255,255,255,0.9)';ctx.font='bold 8px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(e.label,0,0);
    } else if(e.type==='nutrient'){
      ctx.translate(0,Math.sin(e.bob)*3);
      ctx.beginPath();ctx.arc(0,0,e.size,0,Math.PI*2);ctx.fillStyle=e.color+'aa';ctx.fill();ctx.strokeStyle=e.color;ctx.lineWidth=1.5;ctx.stroke();
      ctx.fillStyle='rgba(255,255,255,0.9)';ctx.font='bold 8px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(e.label,0,0);
    } else if(e.type==='chromosome'){
      ctx.beginPath();ctx.ellipse(0,0,e.size*0.4,e.size,0,0,Math.PI*2);ctx.fillStyle=e.color+'99';ctx.fill();ctx.strokeStyle=e.color;ctx.lineWidth=2;ctx.stroke();
    }
    ctx.restore();
  }
}

function drawCheckpoint(){
  const cx=checkpointX,cy=H/2,ph=PHASES[state.phase],r=22;
  ctx.save();ctx.translate(cx,cy);
  ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);
  ctx.fillStyle=state.checkpointOpen?ph.color+'55':'rgba(136,135,128,0.3)';ctx.fill();
  ctx.strokeStyle=state.checkpointOpen?ph.color:COL.gray;ctx.lineWidth=2;ctx.stroke();
  ctx.fillStyle=state.checkpointOpen?ph.color:'#888780';
  ctx.font='bold 10px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText('CHECK',0,-5);ctx.fillText('POINT',0,6);
  if(state.checkpointOpen){
    const rr=r+5+Math.sin(state.frameCount*0.1)*3;
    ctx.beginPath();ctx.arc(0,0,rr,0,Math.PI*2);ctx.strokeStyle=ph.color+'55';ctx.lineWidth=2;ctx.stroke();
    ctx.beginPath();ctx.arc(0,0,rr+7,0,Math.PI*2);ctx.strokeStyle=ph.color+'22';ctx.lineWidth=2;ctx.stroke();
  }
  ctx.restore();
  ctx.fillStyle=state.checkpointOpen?ph.color:COL.gray;
  ctx.font='11px sans-serif';ctx.textAlign='center';
  ctx.fillText(`${state.nutrients}/${state.nutrientsNeeded} nutrients`,cx,cy+r+14);
}

function drawP53(){
  if(!state.p53Active)return;
  ctx.save();ctx.globalAlpha=0.7+Math.sin(state.frameCount*0.1)*0.3;
  ctx.fillStyle=COL.green;ctx.font='bold 12px sans-serif';ctx.textAlign='left';
  ctx.fillText('p53 ACTIVE — Repair Mode',10,18);
  ctx.font='10px sans-serif';ctx.fillText(`${Math.ceil(state.p53Timer/60)}s`,175,18);
  ctx.restore();
}

function drawWalls(){
  const ph=PHASES[state.phase];
  for(const w of walls){
    ctx.fillStyle=ph.color+'22';ctx.strokeStyle=ph.color+'66';ctx.lineWidth=1.5;
    ctx.beginPath();ctx.rect(w.x,w.y,w.w,w.h);ctx.fill();ctx.stroke();
  }
}

function drawParticles(){
  for(const p of state.particles){
    ctx.globalAlpha=p.life/p.maxLife;ctx.fillStyle=p.color;
    ctx.beginPath();ctx.arc(p.x,p.y,p.size*(p.life/p.maxLife),0,Math.PI*2);ctx.fill();
  }
  ctx.globalAlpha=1;
}

function drawFloats(){
  for(const f of state.floatTexts){
    ctx.globalAlpha=f.alpha;ctx.fillStyle=f.color;
    ctx.font='bold 11px sans-serif';ctx.textAlign='center';ctx.fillText(f.text,f.x,f.y);
  }
  ctx.globalAlpha=1;
}

function drawHUD(){
  const ph=PHASES[state.phase];
  ctx.fillStyle=ph.color;ctx.font='bold 13px sans-serif';ctx.textAlign='center';ctx.fillText(ph.full,W/2,16);
  ctx.fillStyle=COL.gray;ctx.font='11px sans-serif';ctx.textAlign='left';ctx.fillText(`Score: ${state.score}`,10,H-8);
  ctx.textAlign='right';ctx.fillText('SPACE repair: '+'■'.repeat(state.repairCharges)+'□'.repeat(Math.max(0,3-state.repairCharges)),W-10,H-8);
}

function drawPhaseBar(){
  const ph=PHASES[state.phase];const bw=(W-40)/4;
  for(let i=0;i<4;i++){
    ctx.fillStyle=i<state.phase?PHASES[i].color+'88':i===state.phase?PHASES[i].color+'44':'rgba(136,135,128,0.2)';
    ctx.fillRect(20+i*bw,H-26,bw-4,10);
    if(i===state.phase){ctx.strokeStyle=ph.color;ctx.lineWidth=1.5;ctx.strokeRect(20+i*bw,H-26,bw-4,10);}
    ctx.fillStyle=i===state.phase?ph.color:COL.gray;
    ctx.font=i===state.phase?'bold 9px sans-serif':'9px sans-serif';
    ctx.textAlign='center';ctx.fillText(PHASES[i].name,20+i*bw+bw/2-2,H-19);
  }
}

function drawLegend(){
  const items=[{color:COL.green,label:'N Nutrient'},{color:COL.teal,label:'A Antioxidant'},{color:COL.blueLight,label:'R Repair enzyme'},{color:COL.amber,label:'UV Mutagen'},{color:COL.coral,label:'C Carcinogen'},{color:COL.red,label:'V Virus'}];
  ctx.font='9px sans-serif';ctx.textAlign='left';let x=W-170,y=30;
  for(const it of items){
    ctx.fillStyle=it.color;ctx.beginPath();ctx.arc(x,y,5,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='rgba(68,68,65,0.8)';ctx.fillText(it.label,x+9,y+4);y+=14;
  }
}

function drawBg(){
  const ph=PHASES[state.phase];const t=state.frameCount;
  ctx.clearRect(0,0,W,H);ctx.fillStyle='rgba(241,239,232,0.95)';ctx.fillRect(0,0,W,H);
  for(let i=0;i<12;i++){
    const x=(i*73+t*0.15)%(W+60)-30;const y=60+Math.sin(t*0.01+i)*80+(i*29)%240;
    ctx.beginPath();ctx.arc(x,y,3+i%3,0,Math.PI*2);ctx.fillStyle=ph.color+'18';ctx.fill();
  }
}

function draw(){
  drawBg();drawWalls();drawP53();drawCheckpoint();drawEntities();drawCell();drawParticles();drawFloats();drawHUD();drawPhaseBar();drawLegend();
}

function loop(){if(state.gameOver)return;update();draw();requestAnimationFrame(loop);}

updateUI();
</script>
