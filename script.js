const pctEl = document.getElementById('pct');
const fillEl = document.getElementById('fill');
const noteEl = document.getElementById('note');
const form = document.getElementById('notify');
const email = document.getElementById('email');
const copyBtn = document.getElementById('copy');
document.getElementById('yr').textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Animated progress percent
let p = 37;
function bump(){
  const delta = Math.max(1, Math.round(Math.random()*5));
  p = Math.min(96, p + delta);
  pctEl.textContent = `${p}%`;
  fillEl.style.width = `${p}%`;
  if (p < 96 && !reduceMotion) setTimeout(bump, 1200 + Math.random()*1200);
}
setTimeout(bump, 800);

// Email capture (local only; hook to backend later)
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const v = email.value.trim();
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(v);
  if(!ok){
    noteEl.textContent = 'Enter a valid email.';
    email.focus();
    return;
  }
  try{
    const list = JSON.parse(localStorage.getItem('nx-emails')||'[]');
    if(!list.includes(v)){ list.push(v); localStorage.setItem('nx-emails', JSON.stringify(list)); }
  }catch{}
  noteEl.textContent = 'Thanks. You will be notified.';
  form.reset();
  confetti();
});

// Copy domain
copyBtn.addEventListener('click', async ()=>{
  try{
    await navigator.clipboard.writeText(location.hostname || 'nexoninc.tech');
    noteEl.textContent = 'Domain copied.';
  }catch{
    noteEl.textContent = 'Copy failed.';
  }
});

// Minimal confetti
function confetti(){
  if (reduceMotion) return;
  const c = document.createElement('canvas');
  c.width = innerWidth; c.height = innerHeight;
  c.style.position='fixed'; c.style.inset='0'; c.style.zIndex='9999'; c.style.pointerEvents='none';
  document.body.appendChild(c);
  const ctx = c.getContext('2d');
  const parts = Array.from({length: 120}, ()=>({
    x: Math.random()*c.width,
    y: -20 - Math.random()*80,
    s: 2 + Math.random()*4,
    v: 2 + Math.random()*3,
    a: Math.random()*Math.PI,
    r: Math.random()*Math.PI
  }));
  let frames = 0;
  (function tick(){
    ctx.clearRect(0,0,c.width,c.height);
    parts.forEach(p=>{
      p.y += p.v; p.x += Math.sin(p.a+=0.02)*1.2; p.r += 0.1;
      ctx.save();
      ctx.translate(p.x,p.y); ctx.rotate(p.r);
      ctx.fillStyle = ['#5eead4','#38bdf8','#a78bfa','#f472b6'][frames%4];
      ctx.fillRect(-p.s, -p.s, p.s*2, p.s*2);
      ctx.restore();
    });
    frames++;
    if(frames<200){ requestAnimationFrame(tick); }
    else c.remove();
  })();
}

// Resize canvas on rotate
window.addEventListener('resize', ()=> {
  document.querySelectorAll('canvas[style*="pointer-events: none"]').forEach(cv=>{
    cv.width = innerWidth; cv.height = innerHeight;
  });
});
