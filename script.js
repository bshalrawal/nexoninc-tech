const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
const yr = document.getElementById('yr');
yr.textContent = new Date().getFullYear();
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const open = nav.style.display === 'flex';
    nav.style.display = open ? 'none' : 'flex';
    navToggle.setAttribute('aria-expanded', String(!open));
  });
}
const slider = document.getElementById('tl');
const stages = Array.from(document.querySelectorAll('.stage'));
function setStage(idx){ stages.forEach((s,i)=> s.classList.toggle('active', i===idx)); }
setStage(parseInt(slider.value,10));
slider.addEventListener('input', e => setStage(parseInt(e.target.value,10)));
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduce) {
  let dir = 1; let timer;
  const play = () => { timer = setInterval(()=>{
    let v = parseInt(slider.value,10) + dir;
    if (v>=2 || v<=0) dir *= -1;
    slider.value = String(v);
    slider.dispatchEvent(new Event('input'));
  }, 2000); };
  const stop = ()=> clearInterval(timer);
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.isIntersecting ? play() : stop());
  }, {threshold:0.4});
  io.observe(slider);
}
function sendMail(){
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const msg = document.getElementById('msg').value.trim();
  const ok = /[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email);
  const note = document.getElementById('contact-note');
  if (!ok){ note.textContent = 'Enter a valid email.'; return false; }
  const subject = encodeURIComponent(`[Nexon Inc] Inquiry from ${name||'Someone'}`);
  const body = encodeURIComponent(msg + `\n\nFrom: ${name} <${email}>`);
  location.href = `mailto:hello@nexoninc.tech?subject=${subject}&body=${body}`;
  note.textContent = 'Your email client will open. If it does not, email hello@nexoninc.tech.';
  return false;
}