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

// ---- Spotlight glow: track mouse position on .cx-spotlight sections ----
document.querySelectorAll('.cx-spotlight').forEach(sec => {
  sec.addEventListener('mousemove', e => {
    const rect = sec.getBoundingClientRect();
    sec.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
    sec.style.setProperty('--my', (e.clientY - rect.top) + 'px');
  }, { passive: true });
});

// ---- Before / After image slider ----
(function() {
  const wrap = document.querySelector('.cx-ba-wrap');
  if (!wrap) return;
  const before = wrap.querySelector('.cx-ba-before');
  const handle = wrap.querySelector('.cx-ba-handle');
  const range = wrap.querySelector('.cx-ba-range');
  function setPos(pct) {
    pct = Math.max(0, Math.min(100, pct));
    before.style.width = pct + '%';
    handle.style.left = pct + '%';
    range.value = pct;
  }
  range.addEventListener('input', () => setPos(+range.value));
  // Touch / mouse drag on the visual
  let dragging = false;
  wrap.addEventListener('mousedown', e => { if (e.target !== range) { dragging = true; } });
  window.addEventListener('mouseup', () => { dragging = false; });
  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    const rect = wrap.getBoundingClientRect();
    setPos(((e.clientX - rect.left) / rect.width) * 100);
  });
  wrap.addEventListener('touchmove', e => {
    const rect = wrap.getBoundingClientRect();
    setPos(((e.touches[0].clientX - rect.left) / rect.width) * 100);
  }, { passive: true });
})();

// ---- Scroll-triggered "Get a Quote" side tab ----
(function() {
  const tab = document.createElement('a');
  tab.href = '/contact';
  tab.className = 'cx-quote-tab';
  tab.setAttribute('aria-label', 'Get a Quote');
  tab.innerHTML = '<span>Get a Quote</span>';
  document.body.appendChild(tab);
  let shown = false;
  window.addEventListener('scroll', () => {
    const halfway = document.documentElement.scrollHeight / 2;
    if (!shown && window.scrollY > halfway) { tab.classList.add('visible'); shown = true; }
  }, { passive: true });
})();

// ---- Back to top button ----
(function() {
  const btn = document.getElementById('cx-back-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// ---- Blog: auto-generate table of contents from h2 headings ----
(function() {
  const toc = document.getElementById('bp-toc');
  const content = document.getElementById('bp-content');
  if (!toc || !content) return;
  const headings = content.querySelectorAll('h2');
  if (headings.length < 3) return; // only show TOC for articles with 3+ sections
  const label = document.createElement('div');
  label.className = 'bp-toc-label';
  label.textContent = 'In this article';
  const ol = document.createElement('ol');
  headings.forEach((h, i) => {
    if (!h.id) h.id = 'section-' + i;
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = h.textContent;
    li.appendChild(a);
    ol.appendChild(li);
  });
  toc.appendChild(label);
  toc.appendChild(ol);
  toc.classList.add('has-items');
})();

// ---- Blog: copy link button ----
(function() {
  const btn = document.getElementById('bp-copy-link');
  if (!btn) return;
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      btn.classList.add('copied');
      const orig = btn.innerHTML;
      btn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
      setTimeout(() => { btn.innerHTML = orig; btn.classList.remove('copied'); }, 2000);
    });
  });
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
