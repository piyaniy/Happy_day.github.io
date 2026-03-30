
/* ── Stars ── */
const sf=document.getElementById('starfield');
for(let i=0;i<100;i++){const s=document.createElement('div');s.className='s';const sz=Math.random()*2+0.5;s.style.cssText=`width:${sz}px;height:${sz}px;left:${Math.random()*100}%;top:${Math.random()*100}%;--d:${(Math.random()*4+2).toFixed(1)}s;animation-delay:${(Math.random()*4).toFixed(1)}s;`;sf.appendChild(s);}

/* ── Particles ── */
const pE=['✨','🌸','💛','⭐','🌹','💫'];
function spawnP(){const p=document.createElement('div');p.className='particle';p.textContent=pE[Math.floor(Math.random()*pE.length)];p.style.cssText=`left:${Math.random()*96}%;animation-duration:${(Math.random()*6+7).toFixed(1)}s;font-size:${(Math.random()*0.8+0.7).toFixed(1)}rem;opacity:0.3;`;document.body.appendChild(p);setTimeout(()=>p.remove(),14000);}
setInterval(spawnP,1800);

/* ── Music ── */
const audio = document.getElementById('bg-music');
audio.volume = 0.5;
let playing = false;

function setPlaying(state) {
  playing = state;
  document.getElementById('play-btn').textContent = state ? '⏸' : '▶';
  document.querySelectorAll('.bar').forEach(b => state ? b.classList.add('playing') : b.classList.remove('playing'));
}

function toggleMusic() {
  if (playing) { audio.pause(); setPlaying(false); }
  else { audio.play().then(()=>setPlaying(true)).catch(()=>{}); }
}

/* ── Splash (needed to unlock audio autoplay) ── */
function startSite() {
  const splash = document.getElementById('splash');
  splash.classList.add('hidden');
  setTimeout(()=>{ splash.style.display='none'; }, 800);
  // Play music on first user interaction
  audio.play().then(()=>setPlaying(true)).catch(()=>{});
  launchConfetti();
}

/* ── Confetti ── */
const canvas=document.getElementById('confetti');
const ctx=canvas.getContext('2d');
let particles=[],animId=null;
function resize(){canvas.width=innerWidth;canvas.height=innerHeight;}
resize();window.addEventListener('resize',resize);
const COLORS=['#C9A84C','#E8C97A','#F5E6C0','#8B3A52','#D4AF37','#FFF8DC','#B8860B'];
function Particle(){this.x=Math.random()*canvas.width;this.y=-10;this.color=COLORS[Math.floor(Math.random()*COLORS.length)];this.size=Math.random()*8+4;this.vx=(Math.random()-.5)*3;this.vy=Math.random()*3+1.5;this.rot=Math.random()*360;this.rs=(Math.random()-.5)*5;this.alpha=1;this.shape=Math.random()<0.6?'rect':'diamond';}
function drawP(p){ctx.save();ctx.globalAlpha=p.alpha;ctx.fillStyle=p.color;ctx.translate(p.x,p.y);ctx.rotate(p.rot*Math.PI/180);if(p.shape==='rect'){ctx.fillRect(-p.size/2,-p.size/4,p.size,p.size/2);}else{ctx.beginPath();ctx.moveTo(0,-p.size/2);ctx.lineTo(p.size/2,0);ctx.lineTo(0,p.size/2);ctx.lineTo(-p.size/2,0);ctx.closePath();ctx.fill();}ctx.restore();}
function animate(){ctx.clearRect(0,0,canvas.width,canvas.height);particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.rot+=p.rs;p.vy+=0.04;if(p.y>canvas.height-80)p.alpha-=0.025;drawP(p);});particles=particles.filter(p=>p.alpha>0);if(particles.length>0)animId=requestAnimationFrame(animate);else{ctx.clearRect(0,0,canvas.width,canvas.height);animId=null;}}
function launchConfetti(){if(animId)cancelAnimationFrame(animId);particles=[];for(let i=0;i<180;i++)setTimeout(()=>particles.push(new Particle()),i*10);animate();}

/* ── Scroll reveal ── */
const reveals=document.querySelectorAll('.reveal');
const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}});},{threshold:0.12});
reveals.forEach(el=>io.observe(el));