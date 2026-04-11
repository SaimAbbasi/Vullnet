// ---- Burger menu ----
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
if (burger && navLinks) {
  burger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

// ---- Nav scroll state ----
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 50) }, { passive: true });
}

// ---- Intersection reveal ----
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('v') } });
}, { threshold: .1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.r,.r-left,.r-right,.r-scale,.cx-blur').forEach(el => obs.observe(el));

// ---- Parallax on hero accents ----
const accent1 = document.querySelector('.hero-accent-1');
const accent2 = document.querySelector('.hero-accent-2');
if (accent1 && accent2) {
  window.addEventListener('scroll', () => {
    const s = window.scrollY;
    accent1.style.transform = `translate(${s * .03}px,${s * .05}px) scale(${1 + s * .0002})`;
    accent2.style.transform = `translate(${-s * .02}px,${-s * .04}px) scale(${1 + s * .0001})`;
  }, { passive: true });
}

// ---- Counter animation — hero stats ----
const heroStatEls = document.querySelectorAll('.hero-stat .num');
if (heroStatEls.length) {
  function animateValue(el) {
    const text = el.textContent.trim();
    const match = text.match(/(\d+)/);
    if (!match) return;
    const target = parseInt(match[1]);
    const suffix = text.replace(match[1], '');
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(ease * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  setTimeout(() => heroStatEls.forEach(animateValue), 700);
}

// ---- Counter animation — cx-stats sections (scroll-triggered) ----
const statsObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('.cx-stat-num').forEach(el => {
      if (el.dataset.counted) return;
      el.dataset.counted = '1';
      const text = el.textContent.trim();
      const match = text.match(/(\d+)/);
      if (!match) return;
      const target = parseInt(match[1]);
      const suffix = text.replace(match[1], '');
      const duration = 1600;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(ease * target) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
    statsObs.unobserve(e.target);
  });
}, { threshold: 0.4 });
document.querySelectorAll('.cx-stats').forEach(s => statsObs.observe(s));

// ---- Magnetic effect on CTA buttons ----
document.querySelectorAll('.btn-red').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * .15;
    const y = (e.clientY - rect.top - rect.height / 2) * .15;
    btn.style.transform = `translate(${x}px,${y}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = '' });
});

// ---- FAQ accordion ----
document.querySelectorAll('.cx-faq-item').forEach(item => {
  item.querySelector('.cx-faq-q').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.cx-faq-item.open').forEach(o => o.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ---- Scroll progress bar ----
const progressBar = document.getElementById('cx-progress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    progressBar.style.width = (scrolled * 100) + '%';
  }, { passive: true });
}

// ---- Custom cursor ring (desktop / pointer:fine only) ----
(function() {
  if (!window.matchMedia('(pointer:fine)').matches) return;
  const ring = document.querySelector('.cx-cursor-ring');
  if (!ring) return;

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my;
  let hovering = false;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY }, { passive: true });
  document.addEventListener('mousedown', () => document.body.classList.add('cx-clicking'));
  document.addEventListener('mouseup', () => document.body.classList.remove('cx-clicking'));

  // Elements that expand the ring
  document.querySelectorAll(
    'a,button,.cx-problem-card,.cx-scenario-card,.cx-why-item,.cx-not-item,' +
    '.svc-card,.bl-card,.cx-blog-link-card,.val-item,.tl-step,.cx-ind-item,' +
    '.cx-proof-card,.cx-cost-range,.cx-guarantee-item,.cx-cred-item'
  ).forEach(el => {
    el.addEventListener('mouseenter', () => { document.body.classList.add('cx-hovering'); hovering = true; });
    el.addEventListener('mouseleave', () => { document.body.classList.remove('cx-hovering'); hovering = false; });
  });

  (function animate() {
    // Lerp: ring lags behind actual cursor with smooth easing
    const speed = hovering ? 0.08 : 0.12;
    rx += (mx - rx) * speed;
    ry += (my - ry) * speed;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animate);
  })();
})();

// ---- Parallax depth on split-section floating V ----
(function() {
  const splitVisuals = document.querySelectorAll('.split-visual');
  if (!splitVisuals.length) return;
  window.addEventListener('scroll', () => {
    splitVisuals.forEach(el => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.querySelectorAll('.floating-v').forEach(v => {
        v.style.transform = `translateY(${center * 0.04}px)`;
      });
    });
  }, { passive: true });
})();

// ---- Subtle section background parallax on cx-sections ----
(function() {
  const sections = document.querySelectorAll('.cx-problem,.cx-compare,.cx-industries');
  if (!sections.length) return;
  window.addEventListener('scroll', () => {
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      sec.style.backgroundPositionY = (progress * 20 - 10) + 'px';
    });
  }, { passive: true });
})();
