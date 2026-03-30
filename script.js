/* ==========================================
   CUSTOM CURSOR
========================================== */
const cursor    = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

let mouseX = 0, mouseY = 0;
let curX = 0, curY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

function animateCursor() {
  curX += (mouseX - curX) * 0.12;
  curY += (mouseY - curY) * 0.12;
  cursor.style.left = curX + 'px';
  cursor.style.top  = curY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

const hoverTargets = document.querySelectorAll('a, button, .exp-card, .skill-card, .edu-card, .contact-row');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
});

/* ==========================================
   NAVBAR — SCROLL STATE
========================================== */
const nav = document.getElementById('site-nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('solid', window.scrollY > 30);
}, { passive: true });

/* ==========================================
   MOBILE BURGER MENU
========================================== */
const burger  = document.getElementById('burger');
const navList = document.getElementById('navList');

burger.addEventListener('click', () => {
  const open = navList.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

navList.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navList.classList.remove('open');
    burger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ==========================================
   ACTIVE NAV LINKS ON SCROLL
========================================== */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ==========================================
   SCROLL REVEAL
========================================== */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

/* ==========================================
   SKILL BAR FILL ANIMATION
========================================== */
const barFills = document.querySelectorAll('.bar-fill');

const barObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('animated'), 200);
      barObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

barFills.forEach(b => barObserver.observe(b));

/* ==========================================
   STAT NUMBER COUNT-UP
========================================== */
function countUp(el, end, suffix, duration = 1200) {
  const isFloat  = end % 1 !== 0;
  const start    = 0;
  const startTs  = performance.now();

  function step(ts) {
    const progress = Math.min((ts - startTs) / duration, 1);
    const ease     = 1 - Math.pow(1 - progress, 3);
    const val      = start + (end - start) * ease;
    el.textContent = (isFloat ? val.toFixed(1) : Math.floor(val)) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const statBigs = document.querySelectorAll('.stat-big');
const statObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const raw = e.target.textContent.trim();
      if (raw === '2')    countUp(e.target, 2, '');
      if (raw === '3+')   { setTimeout(() => { e.target.textContent = '3+'; }, 300); }
      if (raw === '2028') countUp(e.target, 2028, '');
      if (raw === '↑2%')  { setTimeout(() => { e.target.textContent = '↑2%'; }, 200); }
      statObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.8 });

statBigs.forEach(s => statObserver.observe(s));

/* ==========================================
   PARALLAX HERO GLOW
========================================== */
const heroGlow = document.querySelector('.hero-glow');
if (heroGlow) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroGlow.style.transform = `translateY(${y * 0.25}px)`;
  }, { passive: true });
}

/* ==========================================
   SMOOTH ANCHOR SCROLL (extra precision)
========================================== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72);
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
