// Burger menu
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
if (burger && navLinks) {
  burger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

// Nav scroll state
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 50) });
}

// Intersection reveal
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('v') } })
}, { threshold: .12, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.r,.r-left,.r-right,.r-scale').forEach(el => obs.observe(el));

// Parallax on hero accents (only on home page)
const accent1 = document.querySelector('.hero-accent-1');
const accent2 = document.querySelector('.hero-accent-2');
if (accent1 && accent2) {
  window.addEventListener('scroll', () => {
    const s = window.scrollY;
    accent1.style.transform = `translate(${s * .03}px,${s * .05}px) scale(${1 + s * .0002})`;
    accent2.style.transform = `translate(${-s * .02}px,${-s * .04}px) scale(${1 + s * .0001})`;
  });
}

// Counter animation for hero stats (only on home page)
const statEls = document.querySelectorAll('.hero-stat .num');
if (statEls.length) {
  function animateCounters() {
    statEls.forEach(el => {
      const text = el.textContent;
      const match = text.match(/(\d+)/);
      if (!match) return;
      const target = parseInt(match[1]);
      const suffix = text.replace(match[1], '');
      let current = 0;
      const step = Math.max(1, Math.floor(target / 20));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer) }
        el.textContent = current + suffix;
      }, 18);
    });
  }
  setTimeout(animateCounters, 700);
}

// Magnetic effect on CTA buttons
document.querySelectorAll('.btn-red').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * .15;
    const y = (e.clientY - rect.top - rect.height / 2) * .15;
    btn.style.transform = `translate(${x}px,${y}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = '' });
});

// FAQ accordion
document.querySelectorAll('.cx-faq-item').forEach(item => {
  item.querySelector('.cx-faq-q').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.cx-faq-item.open').forEach(o => o.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});
