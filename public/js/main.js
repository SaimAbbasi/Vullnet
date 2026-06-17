// ---- Burger menu ----
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    document.body.style.overflow = isOpen ? 'hidden' : '';
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
    burger.setAttribute('aria-expanded', 'false');
  }));
  document.addEventListener('click', e => {
    if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !burger.contains(e.target)) {
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
      burger.setAttribute('aria-expanded', 'false');
    }
  });
}

// ---- Intersection reveal ----
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('v') } });
}, { threshold: .1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.r,.r-left,.r-right,.r-scale,.cx-blur').forEach(el => obs.observe(el));

// ---- Counter animation (shared) ----
function animateValue(el, duration, power) {
  const text = el.textContent.trim();
  const match = text.match(/(\d+)/);
  if (!match) return;
  const target = parseInt(match[1]);
  const suffix = text.replace(match[1], '');
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, power);
    el.textContent = Math.round(ease * target) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ---- Hero stats counter ----
const heroStatEls = document.querySelectorAll('.hero-stat .num');
if (heroStatEls.length) {
  setTimeout(() => heroStatEls.forEach(el => animateValue(el, 1200, 3)), 700);
}

// ---- Counter animation — cx-stats sections (scroll-triggered) ----
const statsObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('.cx-stat-num').forEach(el => {
      if (el.dataset.counted) return;
      el.dataset.counted = '1';
      animateValue(el, 1600, 4);
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

// ---- Consolidated scroll handler (single listener, rAF-throttled) ----
(function() {
  const nav = document.getElementById('nav');
  const progressBar = document.getElementById('cx-progress');
  const backTopBtn = document.getElementById('cx-back-top');
  const accent1 = document.querySelector('.hero-accent-1');
  const accent2 = document.querySelector('.hero-accent-2');
  const parallaxSections = document.querySelectorAll('.cx-problem,.cx-compare,.cx-industries');

  // Quote tab — created once, shown after 50% scroll
  const quoteTab = document.createElement('a');
  quoteTab.href = '/contact';
  quoteTab.className = 'cx-quote-tab';
  quoteTab.setAttribute('aria-label', 'Get a Quote');
  quoteTab.innerHTML = '<span>Get a Quote</span>';
  document.body.appendChild(quoteTab);
  let quoteTabShown = false;

  let ticking = false;
  function onScroll() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;

    // Nav frosted-glass background
    if (nav) nav.classList.toggle('scrolled', scrollY > 50);

    // Scroll progress bar
    if (progressBar) progressBar.style.width = (scrollY / (docHeight - winHeight) * 100) + '%';

    // Back to top button
    if (backTopBtn) backTopBtn.classList.toggle('visible', scrollY > 400);

    // Quote tab — show once after 50% scroll
    if (!quoteTabShown && scrollY > docHeight / 2) { quoteTab.classList.add('visible'); quoteTabShown = true; }

    // Hero accent parallax
    if (accent1 && accent2) {
      accent1.style.transform = `translate(${scrollY * .03}px,${scrollY * .05}px) scale(${1 + scrollY * .0002})`;
      accent2.style.transform = `translate(${-scrollY * .02}px,${-scrollY * .04}px) scale(${1 + scrollY * .0001})`;
    }

    // Subtle background parallax on cx-sections
    parallaxSections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > winHeight) return;
      const progress = (winHeight - rect.top) / (winHeight + rect.height);
      sec.style.backgroundPositionY = (progress * 20 - 10) + 'px';
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
})();

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

  document.querySelectorAll(
    'a,button,.cx-problem-card,.cx-scenario-card,.cx-why-item,.cx-not-item,' +
    '.svc-card,.bl-card,.cx-blog-link-card,.val-item,.tl-step,.cx-ind-item,' +
    '.cx-proof-card,.cx-cost-range,.cx-guarantee-item,.cx-cred-item'
  ).forEach(el => {
    el.addEventListener('mouseenter', () => { document.body.classList.add('cx-hovering'); hovering = true; });
    el.addEventListener('mouseleave', () => { document.body.classList.remove('cx-hovering'); hovering = false; });
  });

  (function animate() {
    const speed = hovering ? 0.08 : 0.12;
    rx += (mx - rx) * speed;
    ry += (my - ry) * speed;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animate);
  })();
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

// ---- Blog listing: show more ----
(function() {
  const btn = document.getElementById('bl-show-more');
  if (!btn) return;
  btn.addEventListener('click', () => {
    document.querySelectorAll('.bl-hidden').forEach(el => el.classList.remove('bl-hidden'));
    btn.parentElement.remove();
  });
})();

// ---- Projects: lightbox ----
(function() {
  const lb = document.createElement('div');
  lb.className = 'cx-lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.innerHTML = '<button class="cx-lightbox-close" aria-label="Close">&times;</button><img src="" alt=""><div class="cx-lightbox-caption"></div>';
  document.body.appendChild(lb);
  const lbImg = lb.querySelector('img');
  const lbCap = lb.querySelector('.cx-lightbox-caption');

  document.querySelectorAll('.cx-proj-img-wrap img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      lbImg.src = img.src.replace(/w=\d+/, 'w=1400');
      lbImg.alt = img.alt;
      lbCap.textContent = img.alt;
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLb() { lb.classList.remove('open'); document.body.style.overflow = ''; }
  lb.querySelector('.cx-lightbox-close').addEventListener('click', closeLb);
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });
})();

// ---- Back to top smooth scroll ----
(function() {
  const btn = document.getElementById('cx-back-top');
  if (!btn) return;
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// ---- Blog: auto-generate table of contents from h2 headings ----
(function() {
  const toc = document.getElementById('bp-toc');
  const content = document.getElementById('bp-content');
  if (!toc || !content) return;
  const headings = content.querySelectorAll('h2');
  if (headings.length < 3) return;
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
