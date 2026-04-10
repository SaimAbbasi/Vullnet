# SEO & Multi-Page Eleventy Migration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the single `index.html` into a 6-page Eleventy static site with full per-page SEO, auto-deployed via Vercel on GitHub push.

**Architecture:** Eleventy reads from `src/` and outputs clean static HTML to `_site/`. A single `base.njk` layout holds the shared `<head>`, nav, and footer — written once, inherited by all pages. CSS and JS are extracted to `public/` for browser caching.

**Tech Stack:** Eleventy 3.x, Nunjucks templates, plain CSS/JS (no framework), Vercel

**Repo:** `/Users/saim/Downloads/VullnetRepo`

---

### Task 1: Initialize Eleventy Project

**Files:**
- Create: `package.json`
- Create: `.eleventy.js`
- Create: `vercel.json`
- Modify: `.gitignore` (add `node_modules/` and `_site/`)

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "vullnet-nura-group",
  "version": "1.0.0",
  "description": "Vullnet Nura Group website",
  "scripts": {
    "dev": "eleventy --serve",
    "build": "eleventy"
  },
  "dependencies": {
    "@11ty/eleventy": "^3.0.0"
  }
}
```

- [ ] **Step 2: Create `.eleventy.js`**

```js
module.exports = function(eleventyConfig) {
  // Pass public/ through to _site/ verbatim
  eleventyConfig.addPassthroughCopy("public");

  // Copy robots.txt from src/ to _site/
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "html"],
    htmlTemplateEngine: "njk"
  };
};
```

- [ ] **Step 3: Create `vercel.json`**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "_site",
  "installCommand": "npm install"
}
```

- [ ] **Step 4: Update `.gitignore`**

Create or append — file should contain at minimum:

```
node_modules/
_site/
```

- [ ] **Step 5: Install dependencies**

```bash
cd /Users/saim/Downloads/VullnetRepo && npm install
```

Expected: `node_modules/` created, no errors.

- [ ] **Step 6: Commit**

```bash
cd /Users/saim/Downloads/VullnetRepo
git add package.json package-lock.json .eleventy.js vercel.json .gitignore
git commit -m "feat: initialize Eleventy project"
```

---

### Task 2: Extract CSS and JS to Public Assets

**Files:**
- Create: `public/css/style.css`
- Create: `public/js/main.js`

- [ ] **Step 1: Create `public/css/style.css`**

Extract every line between (and not including) `<style>` and `</style>` from `index.html` (lines 12–281). The full content to write to `public/css/style.css` is:

```css
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{--red:#d83030;--dark:#1a1a1a;--dark2:#292929;--white:#fafafa;--gray1:#5B5B5B;--gray2:#A0A0A0;--gray3:#DBDBDB;--pure:#fff}
html{scroll-behavior:smooth;font-size:16px}
body{font-family:'Inter',sans-serif;color:var(--dark);background:var(--pure);-webkit-font-smoothing:antialiased;overflow-x:hidden}
h1,h2,h3,.logo-text,.stat-num,.big-num{font-family:'Oswald',sans-serif;text-transform:uppercase;letter-spacing:0.02em;font-weight:600}

/* ---- NAV ---- */
.nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:0 clamp(24px,5vw,80px);height:72px;display:flex;align-items:center;justify-content:space-between;background:transparent;transition:background .4s,backdrop-filter .4s}
.nav.scrolled{background:rgba(26,26,26,0.97);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}
.logo{display:flex;align-items:center;gap:12px;text-decoration:none;color:var(--pure)}
.logo-mark{width:36px;height:36px;position:relative}
.logo-mark span{position:absolute;left:50%;height:2px;background:var(--red);transform-origin:left center;border-radius:1px}
.logo-text{font-size:0.95rem;font-weight:700;letter-spacing:.1em;line-height:1.1}
.nav-links{display:flex;align-items:center;gap:32px;list-style:none}
.nav-links a{font-size:.75rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--gray2);text-decoration:none;transition:color .25s;position:relative}
.nav-links a::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:2px;background:var(--red);transition:width .3s}
.nav-links a:hover{color:var(--pure)}
.nav-links a:hover::after{width:100%}
.nav-links a.active{color:var(--pure)}
.nav-links a.active::after{width:100%}
.nav-cta-btn{padding:10px 28px;background:var(--red);color:var(--pure)!important;font-size:.75rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;transition:background .2s,transform .2s}
.nav-cta-btn:hover{background:#c22828;transform:translateY(-1px)}
.nav-cta-btn::after{display:none!important}
.burger{display:none;background:none;border:none;cursor:pointer;padding:4px}
.burger i{display:block;width:22px;height:2px;background:var(--pure);margin:5px 0;transition:.3s}

/* ---- HERO ---- */
.hero{min-height:100vh;display:flex;align-items:flex-end;background:var(--dark);position:relative;overflow:hidden;padding-bottom:clamp(60px,10vh,120px)}
.hero-lines{position:absolute;inset:0;overflow:hidden;opacity:.07}
.hero-lines .line{position:absolute;width:1px;height:200%;background:var(--pure);transform:rotate(25deg);animation:lineDrift 10s linear infinite}
@keyframes lineDrift{0%{transform:rotate(25deg) translateY(-10%)}100%{transform:rotate(25deg) translateY(10%)}}
.hero-accent{position:absolute;border-radius:50%;background:var(--red);filter:blur(80px);opacity:.15;animation:pulse 3s ease-in-out infinite alternate}
.hero-accent-1{width:400px;height:400px;top:-100px;right:-100px;animation-delay:0s}
.hero-accent-2{width:300px;height:300px;bottom:10%;left:5%;animation-delay:1s}
@keyframes pulse{0%{transform:scale(1);opacity:.12}100%{transform:scale(1.2);opacity:.2}}
.hero-building{position:absolute;right:5%;bottom:0;width:clamp(320px,35vw,520px);height:80%;pointer-events:none;opacity:.12}
.hero-building svg{width:100%;height:100%}
.hero-building .bld-line{stroke-dasharray:500;stroke-dashoffset:500;animation:drawLine 2s ease forwards}
.hero-building .bld-line:nth-child(1){animation-delay:.2s}
.hero-building .bld-line:nth-child(2){animation-delay:.35s}
.hero-building .bld-line:nth-child(3){animation-delay:.5s}
.hero-building .bld-line:nth-child(4){animation-delay:.65s}
.hero-building .bld-line:nth-child(5){animation-delay:.8s}
.hero-building .bld-line:nth-child(6){animation-delay:.95s}
.hero-building .bld-line:nth-child(7){animation-delay:1.1s}
.hero-building .bld-line:nth-child(8){animation-delay:1.25s}
.hero-building .bld-line:nth-child(9){animation-delay:1.4s}
.hero-building .bld-line:nth-child(10){animation-delay:1.55s}
.hero-building .bld-line:nth-child(11){animation-delay:1.7s}
.hero-building .bld-line:nth-child(12){animation-delay:1.85s}
.hero-building .bld-line:nth-child(13){animation-delay:2s}
.hero-building .bld-line:nth-child(14){animation-delay:2.15s}
.hero-building .bld-line:nth-child(15){animation-delay:2.3s}
.hero-building .bld-line:nth-child(16){animation-delay:2.45s}
.hero-building .bld-line:nth-child(17){animation-delay:2.6s}
.hero-building .bld-line:nth-child(18){animation-delay:2.75s}
.hero-building .bld-line:nth-child(19){animation-delay:2.9s}
.hero-building .bld-line:nth-child(20){animation-delay:3.05s}
.hero-building .bld-fill{opacity:0;animation:fillIn .6s ease forwards}
.hero-building .bld-fill:nth-child(21){animation-delay:3.2s}
.hero-building .bld-fill:nth-child(22){animation-delay:3.4s}
.hero-building .bld-fill:nth-child(23){animation-delay:3.6s}
.hero-building .bld-fill:nth-child(24){animation-delay:3.8s}
.hero-building .bld-fill:nth-child(25){animation-delay:4s}
@keyframes drawLine{to{stroke-dashoffset:0}}
@keyframes fillIn{to{opacity:.3}}
.hero .container{position:relative;z-index:2;max-width:1280px;margin:0 auto;padding:0 clamp(24px,5vw,80px);padding-top:120px;width:100%}
.hero-grid{display:grid;grid-template-columns:1fr auto;gap:64px;align-items:end}
.hero-left{max-width:780px}
.hero-eyebrow{display:inline-flex;align-items:center;gap:10px;margin-bottom:28px;opacity:0;animation:fadeUp .4s .15s forwards}
.hero-eyebrow .dot{width:8px;height:8px;background:var(--red);border-radius:50%;animation:blink 1s infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
.hero-eyebrow span{font-size:.7rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--red)}
.hero h1{font-size:clamp(3.2rem,9vw,7.5rem);line-height:.9;color:var(--pure);margin-bottom:36px;overflow:hidden}
.hero h1 .word{display:inline-block;opacity:0;transform:translateY(100%);animation:wordReveal .35s forwards}
.hero h1 .word:nth-child(1){animation-delay:.2s}
.hero h1 .word:nth-child(2){animation-delay:.28s}
.hero h1 .word:nth-child(3){animation-delay:.36s}
.hero h1 .accent{color:var(--red)}
@keyframes wordReveal{to{opacity:1;transform:translateY(0)}}
.hero-body{font-size:clamp(1rem,1.4vw,1.15rem);line-height:1.75;color:var(--gray2);max-width:480px;margin-bottom:44px;opacity:0;animation:fadeUp .4s .45s forwards}
.hero-btns{display:flex;gap:16px;flex-wrap:wrap;opacity:0;animation:fadeUp .4s .55s forwards}
@keyframes fadeUp{to{opacity:1;transform:translateY(0)}from{opacity:0;transform:translateY(20px)}}
.hero-right{display:flex;flex-direction:column;gap:32px;padding-bottom:8px;opacity:0;animation:fadeUp .4s .6s forwards}
.hero-stat{text-align:right}
.hero-stat .num{font-family:'Oswald',sans-serif;font-size:3rem;font-weight:700;color:var(--pure);line-height:1}
.hero-stat .lab{font-size:.7rem;font-weight:600;letter-spacing:.15em;text-transform:uppercase;color:var(--gray1);margin-top:4px}

/* Buttons */
.btn{display:inline-flex;align-items:center;gap:10px;font-family:'Inter',sans-serif;font-size:.8rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:16px 40px;text-decoration:none;border:none;cursor:pointer;transition:all .25s;position:relative;overflow:hidden}
.btn-red{background:var(--red);color:var(--pure)}
.btn-red::before{content:'';position:absolute;inset:0;background:linear-gradient(120deg,transparent 40%,rgba(255,255,255,.15) 50%,transparent 60%);transform:translateX(-100%);transition:transform .3s}
.btn-red:hover::before{transform:translateX(100%)}
.btn-red:hover{background:#c22828;transform:translateY(-2px);box-shadow:0 8px 32px rgba(216,48,48,.3)}
.btn-ghost{background:transparent;color:var(--pure);border:1px solid var(--gray1)}
.btn-ghost:hover{border-color:var(--pure);transform:translateY(-2px)}
.btn-dark{background:var(--dark);color:var(--pure)}
.btn-dark:hover{background:var(--dark2);transform:translateY(-2px)}
.btn svg{transition:transform .25s}
.btn:hover svg{transform:translateX(4px)}
.arrow-icon{width:16px;height:16px}

/* ---- MARQUEE ---- */
.marquee{background:var(--red);padding:16px 0;overflow:hidden;white-space:nowrap}
.marquee-track{display:inline-flex;animation:scroll 15s linear infinite}
.marquee-track span{font-family:'Oswald',sans-serif;font-size:.85rem;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--pure);padding:0 48px;opacity:.8}
.marquee-track span::after{content:'';display:inline-block;width:6px;height:6px;background:var(--pure);border-radius:50%;margin-left:48px;vertical-align:middle;opacity:.5}
@keyframes scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

/* ---- SPLIT SECTION ---- */
.split{display:grid;grid-template-columns:1fr 1fr;min-height:70vh;background:#111}
.split-text{display:flex;flex-direction:column;justify-content:center;padding:clamp(40px,6vw,80px) clamp(32px,5vw,80px);color:var(--pure)}
.split-visual{position:relative;overflow:hidden;background:#1a1a1a}
.split-visual-inner{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
.logo-wall{position:relative;width:100%;height:100%}
.logo-wall .floating-v{position:absolute;opacity:.06;animation:floatV 5s ease-in-out infinite}
@keyframes floatV{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-20px) rotate(3deg)}}
.split-quote{position:absolute;bottom:clamp(32px,5vw,64px);left:clamp(32px,5vw,64px);right:clamp(32px,5vw,64px);z-index:2}
.split-quote p{font-family:'Oswald',sans-serif;font-size:clamp(1.6rem,3vw,2.4rem);text-transform:uppercase;color:var(--pure);line-height:1.1}
.split-quote .highlight{color:var(--red)}

/* ---- SERVICES ---- */
.services-section{background:var(--dark);padding:clamp(56px,7vw,96px) 0;color:var(--pure)}
.services-header{max-width:1280px;margin:0 auto;padding:0 clamp(24px,5vw,80px);margin-bottom:48px}
.services-header .tag{font-size:.7rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--red);margin-bottom:16px}
.services-header h2{font-size:clamp(2.2rem,4.5vw,3.8rem);line-height:1}
.services-header p{font-size:1rem;line-height:1.7;color:var(--gray2);max-width:480px;margin-top:20px}
.services-masonry{max-width:1280px;margin:0 auto;padding:0 clamp(24px,5vw,80px);display:grid;grid-template-columns:repeat(3,1fr);gap:2px}
.svc-card{background:#222;padding:clamp(36px,4vw,56px);position:relative;overflow:hidden;transition:background .2s}
.svc-card::before{content:'';position:absolute;top:0;left:0;width:3px;height:0;background:var(--red);transition:height .25s}
.svc-card:hover{background:#2a2a2a}
.svc-card:hover::before{height:100%}
.svc-card .svc-num{font-family:'Oswald',sans-serif;font-size:4rem;font-weight:700;color:rgba(255,255,255,.04);position:absolute;top:16px;right:20px;line-height:1;transition:color .2s}
.svc-card:hover .svc-num{color:rgba(216,48,48,.15)}
.svc-card h3{font-size:1.2rem;letter-spacing:.05em;margin-bottom:14px;position:relative}
.svc-card p{font-size:.88rem;line-height:1.65;color:var(--gray2);position:relative}
.svc-card.big{grid-column:span 2;display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center}
.svc-card.big .svc-num{font-size:6rem}

/* ---- VALUES ---- */
.values-section{background:#111;padding:clamp(56px,7vw,96px) 0;color:var(--pure)}
.values-container{max-width:1280px;margin:0 auto;padding:0 clamp(24px,5vw,80px)}
.values-top{display:grid;grid-template-columns:1fr 1fr;gap:48px;margin-bottom:48px;align-items:end}
.values-top .tag{font-size:.7rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--red);margin-bottom:16px}
.values-top h2{font-size:clamp(2.2rem,4.5vw,3.8rem);line-height:1;color:var(--pure)}
.values-top p{font-size:1rem;line-height:1.7;color:var(--gray2)}
.values-row{display:grid;grid-template-columns:repeat(4,1fr);gap:0;border-top:1px solid rgba(255,255,255,.08)}
.val-item{padding:clamp(28px,3vw,48px) clamp(20px,2vw,32px);border-right:1px solid rgba(255,255,255,.08);border-bottom:1px solid rgba(255,255,255,.08);position:relative;transition:background .15s}
.val-item:last-child{border-right:none}
.val-item:hover{background:rgba(255,255,255,.03)}
.val-item::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--red);transform:scaleX(0);transform-origin:left;transition:transform .2s}
.val-item:hover::before{transform:scaleX(1)}
.val-item .big-num{font-size:3rem;font-weight:700;color:rgba(255,255,255,.1);line-height:1;margin-bottom:20px;transition:color .15s}
.val-item:hover .big-num{color:var(--red)}
.val-item h3{font-size:1.15rem;letter-spacing:.04em;margin-bottom:12px;color:var(--pure)}
.val-item p{font-size:.85rem;line-height:1.6;color:var(--gray2)}

/* ---- PROCESS ---- */
.process-section{background:#1a1a1a;padding:clamp(56px,7vw,96px) 0;overflow:hidden;color:var(--pure)}
.process-container{max-width:1280px;margin:0 auto;padding:0 clamp(24px,5vw,80px)}
.process-header{margin-bottom:48px}
.process-header .tag{font-size:.7rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--red);margin-bottom:16px}
.process-header h2{font-size:clamp(2.2rem,4.5vw,3.8rem);line-height:1;color:var(--pure)}
.timeline{position:relative;display:grid;grid-template-columns:repeat(4,1fr);gap:0}
.timeline::before{content:'';position:absolute;top:28px;left:0;right:0;height:2px;background:rgba(255,255,255,.1)}
.tl-step{position:relative;padding-top:64px;padding-right:32px}
.tl-dot{position:absolute;top:20px;left:0;width:18px;height:18px;border-radius:50%;background:#1a1a1a;border:3px solid rgba(255,255,255,.15);transition:all .2s;z-index:2}
.tl-step:hover .tl-dot{border-color:var(--red);background:var(--red);box-shadow:0 0 0 6px rgba(216,48,48,.15)}
.tl-step h3{font-size:1.1rem;letter-spacing:.04em;margin-bottom:10px;color:var(--pure)}
.tl-step p{font-size:.85rem;line-height:1.6;color:var(--gray2)}
.tl-step .step-tag{font-family:'Oswald',sans-serif;font-size:.75rem;font-weight:600;letter-spacing:.15em;color:var(--red);margin-bottom:8px}

/* ---- CTA ---- */
.cta{position:relative;padding:clamp(72px,9vw,120px) 0;background:var(--dark);text-align:center;overflow:hidden}
.cta-bg{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:.03}
.cta-bg span{font-family:'Oswald',sans-serif;font-size:clamp(15rem,30vw,40rem);font-weight:700;color:var(--pure);white-space:nowrap;text-transform:uppercase}
.cta .container{position:relative;z-index:2;max-width:1280px;margin:0 auto;padding:0 clamp(24px,5vw,80px)}
.cta h2{font-size:clamp(2.6rem,6vw,5rem);line-height:.95;color:var(--pure);margin-bottom:24px}
.cta h2 .accent{color:var(--red)}
.cta p{font-size:1.05rem;line-height:1.65;color:var(--gray2);max-width:460px;margin:0 auto 40px}
.cta-line{width:48px;height:3px;background:var(--red);margin:0 auto 32px;animation:expandLine 1s ease-in-out infinite alternate}
@keyframes expandLine{0%{width:48px}100%{width:96px}}

/* ---- FOOTER ---- */
.footer{background:var(--dark);border-top:1px solid rgba(255,255,255,.06);padding:56px 0 28px;color:var(--gray2)}
.footer .container{max-width:1280px;margin:0 auto;padding:0 clamp(24px,5vw,80px)}
.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px;margin-bottom:48px}
.footer-brand p{font-size:.85rem;line-height:1.6;margin-top:16px;color:var(--gray1);max-width:280px}
.footer h4{font-size:.68rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--pure);margin-bottom:16px}
.footer ul{list-style:none}
.footer ul li{margin-bottom:8px}
.footer ul a{font-size:.82rem;color:var(--gray2);text-decoration:none;transition:color .2s}
.footer ul a:hover{color:var(--pure)}
.footer-bottom{border-top:1px solid rgba(255,255,255,.06);padding-top:20px;display:flex;justify-content:space-between;font-size:.75rem;color:var(--gray1)}

/* ---- PAGE LAYOUTS ---- */
.page-hero{background:var(--dark);padding:clamp(140px,16vw,200px) 0 clamp(56px,7vw,96px);color:var(--pure)}
.page-hero .container{max-width:1280px;margin:0 auto;padding:0 clamp(24px,5vw,80px)}
.page-hero .tag{font-size:.7rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--red);margin-bottom:16px}
.page-hero h1{font-size:clamp(2.6rem,6vw,5rem);line-height:.95;color:var(--pure)}
.page-content{background:var(--pure);padding:clamp(56px,7vw,96px) 0}
.page-content .container{max-width:1280px;margin:0 auto;padding:0 clamp(24px,5vw,80px)}

/* ---- REVEAL SYSTEM ---- */
.r{opacity:0;transform:translateY(30px);transition:opacity .4s cubic-bezier(.16,1,.3,1),transform .4s cubic-bezier(.16,1,.3,1)}
.r.v{opacity:1;transform:translateY(0)}
.r-left{opacity:0;transform:translateX(-30px);transition:opacity .4s cubic-bezier(.16,1,.3,1),transform .4s cubic-bezier(.16,1,.3,1)}
.r-left.v{opacity:1;transform:translateX(0)}
.r-right{opacity:0;transform:translateX(30px);transition:opacity .4s cubic-bezier(.16,1,.3,1),transform .4s cubic-bezier(.16,1,.3,1)}
.r-right.v{opacity:1;transform:translateX(0)}
.r-scale{opacity:0;transform:scale(.94);transition:opacity .4s,transform .4s cubic-bezier(.16,1,.3,1)}
.r-scale.v{opacity:1;transform:scale(1)}
.stagger .r:nth-child(1){transition-delay:.03s}
.stagger .r:nth-child(2){transition-delay:.07s}
.stagger .r:nth-child(3){transition-delay:.11s}
.stagger .r:nth-child(4){transition-delay:.15s}
.stagger .r:nth-child(5){transition-delay:.19s}
.stagger .r:nth-child(6){transition-delay:.23s}

/* ---- RESPONSIVE ---- */
@media(max-width:1024px){
  .hero-grid{grid-template-columns:1fr;gap:40px}
  .hero-right{flex-direction:row;gap:40px}
  .hero-stat{text-align:left}
  .split{grid-template-columns:1fr}
  .split-visual{min-height:50vh}
  .services-masonry{grid-template-columns:repeat(2,1fr)}
  .svc-card.big{grid-column:span 2}
  .values-row{grid-template-columns:repeat(2,1fr)}
  .val-item:nth-child(2n){border-right:none!important}
  .footer-grid{grid-template-columns:1fr 1fr}
}
@media(max-width:768px){
  .nav-links{display:none;position:fixed;top:72px;left:0;right:0;bottom:0;background:var(--dark);flex-direction:column;align-items:center;justify-content:center;gap:28px}
  .nav-links.open{display:flex}
  .burger{display:block}
  .hero-right{display:none}
  .split{grid-template-columns:1fr}
  .services-masonry{grid-template-columns:1fr}
  .svc-card.big{grid-column:span 1;grid-template-columns:1fr}
  .values-top{grid-template-columns:1fr}
  .values-row{grid-template-columns:1fr}
  .val-item{border-right:none}
  .timeline{grid-template-columns:1fr}
  .timeline::before{display:none}
  .tl-step{padding-left:36px;padding-right:0;padding-top:0;margin-bottom:36px}
  .tl-dot{top:4px;left:0}
  .footer-grid{grid-template-columns:1fr;gap:24px}
  .footer-bottom{flex-direction:column;gap:8px;text-align:center}
  .hero-btns{flex-direction:column}
  .btn{justify-content:center}
}
```

- [ ] **Step 2: Create `public/js/main.js`**

```js
// Burger menu
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Nav scroll state
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 50) });

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
```

- [ ] **Step 3: Commit**

```bash
cd /Users/saim/Downloads/VullnetRepo
git add public/
git commit -m "feat: extract CSS and JS to public assets"
```

---

### Task 3: Create Site Data and Base Layout

**Files:**
- Create: `src/_data/site.js`
- Create: `src/_includes/base.njk`

- [ ] **Step 1: Create `src/_data/site.js`**

```js
module.exports = {
  name: "Vullnet Nura Group",
  shortName: "VNG",
  baseUrl: "https://vullnet.vercel.app",
  defaultDescription: "Ontario's deadline-first commercial interior execution contractor. 1000+ projects delivered on time, on budget.",
  email: "info@vullnetnuragroup.com"
};
```

- [ ] **Step 2: Create `src/_includes/base.njk`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{{ title or site.name }}</title>
<meta name="description" content="{{ description or site.defaultDescription }}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="{{ site.baseUrl }}{{ permalink or page.url }}">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="{{ site.name }}">
<meta property="og:title" content="{{ title or site.name }}">
<meta property="og:description" content="{{ description or site.defaultDescription }}">
<meta property="og:url" content="{{ site.baseUrl }}{{ permalink or page.url }}">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="{{ title or site.name }}">
<meta name="twitter:description" content="{{ description or site.defaultDescription }}">

<!-- JSON-LD -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "{{ site.name }}",
  "description": "{{ site.defaultDescription }}",
  "url": "{{ site.baseUrl }}",
  "email": "{{ site.email }}",
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "ON",
    "addressCountry": "CA"
  },
  "areaServed": "Greater Toronto Area"
}
</script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/public/css/style.css">
</head>
<body>

{% include "nav.njk" %}

{{ content | safe }}

{% include "footer.njk" %}

<script src="/public/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 3: Verify `src/` directory structure exists**

```bash
ls /Users/saim/Downloads/VullnetRepo/src/_includes/
ls /Users/saim/Downloads/VullnetRepo/src/_data/
```

Expected: both directories exist and contain the created files.

- [ ] **Step 4: Commit**

```bash
cd /Users/saim/Downloads/VullnetRepo
git add src/
git commit -m "feat: add site data and base layout"
```

---

### Task 4: Create Nav and Footer Components

**Files:**
- Create: `src/_includes/nav.njk`
- Create: `src/_includes/footer.njk`

- [ ] **Step 1: Create `src/_includes/nav.njk`**

```html
<nav class="nav" id="nav">
  <a href="/" class="logo">
    <div class="logo-mark">
      <svg viewBox="0 0 100 100" width="36" height="36" fill="none">
        <g stroke="#d83030" stroke-width="2">
          <line x1="50" y1="90" x2="36" y2="8"/><line x1="50" y1="90" x2="25" y2="8"/>
          <line x1="50" y1="90" x2="15" y2="12"/><line x1="50" y1="90" x2="7" y2="21"/>
          <line x1="50" y1="90" x2="2" y2="32"/><line x1="50" y1="90" x2="0" y2="46"/>
          <line x1="50" y1="90" x2="0" y2="60"/><line x1="50" y1="90" x2="2" y2="73"/>
          <line x1="50" y1="90" x2="7" y2="81"/>
          <line x1="50" y1="90" x2="64" y2="8"/><line x1="50" y1="90" x2="75" y2="8"/>
          <line x1="50" y1="90" x2="85" y2="12"/><line x1="50" y1="90" x2="93" y2="21"/>
          <line x1="50" y1="90" x2="98" y2="32"/><line x1="50" y1="90" x2="100" y2="46"/>
          <line x1="50" y1="90" x2="100" y2="60"/><line x1="50" y1="90" x2="98" y2="73"/>
          <line x1="50" y1="90" x2="93" y2="81"/>
        </g>
      </svg>
    </div>
    <span class="logo-text">VULLNET<br>NURA GROUP</span>
  </a>
  <ul class="nav-links" id="navLinks">
    <li><a href="/about"{% if page.url == '/about/' %} class="active"{% endif %}>About</a></li>
    <li><a href="/services"{% if page.url == '/services/' %} class="active"{% endif %}>Services</a></li>
    <li><a href="/values"{% if page.url == '/values/' %} class="active"{% endif %}>Values</a></li>
    <li><a href="/process"{% if page.url == '/process/' %} class="active"{% endif %}>Process</a></li>
    <li><a href="/contact" class="nav-cta-btn">Get a Quote</a></li>
  </ul>
  <button class="burger" id="burger" aria-label="Toggle menu"><i></i><i></i><i></i></button>
</nav>
```

- [ ] **Step 2: Create `src/_includes/footer.njk`**

```html
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="/" class="logo">
          <svg viewBox="0 0 100 100" width="32" height="32" fill="none">
            <g stroke="#d83030" stroke-width="2">
              <line x1="50" y1="90" x2="36" y2="8"/><line x1="50" y1="90" x2="25" y2="8"/>
              <line x1="50" y1="90" x2="15" y2="12"/><line x1="50" y1="90" x2="7" y2="21"/>
              <line x1="50" y1="90" x2="2" y2="32"/><line x1="50" y1="90" x2="0" y2="46"/>
              <line x1="50" y1="90" x2="0" y2="60"/><line x1="50" y1="90" x2="2" y2="73"/>
              <line x1="50" y1="90" x2="7" y2="81"/>
              <line x1="50" y1="90" x2="64" y2="8"/><line x1="50" y1="90" x2="75" y2="8"/>
              <line x1="50" y1="90" x2="85" y2="12"/><line x1="50" y1="90" x2="93" y2="21"/>
              <line x1="50" y1="90" x2="98" y2="32"/><line x1="50" y1="90" x2="100" y2="46"/>
              <line x1="50" y1="90" x2="100" y2="60"/><line x1="50" y1="90" x2="98" y2="73"/>
              <line x1="50" y1="90" x2="93" y2="81"/>
            </g>
          </svg>
          <span class="logo-text">VULLNET<br>NURA GROUP</span>
        </a>
        <p>High performance commercial interior execution across the GTA and Ontario. Deadline first delivery.</p>
      </div>
      <div>
        <h4>Company</h4>
        <ul>
          <li><a href="/about">About</a></li>
          <li><a href="/values">Values</a></li>
          <li><a href="/process">Process</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4>Services</h4>
        <ul>
          <li><a href="/services">Demolition</a></li>
          <li><a href="/services">Walls &amp; Ceilings</a></li>
          <li><a href="/services">Finishing</a></li>
          <li><a href="/services">Millwork</a></li>
        </ul>
      </div>
      <div>
        <h4>Get in Touch</h4>
        <ul>
          <li><a href="mailto:info@vullnetnuragroup.com">info@vullnetnuragroup.com</a></li>
          <li><a href="/contact">Greater Toronto Area</a></li>
          <li><a href="/contact">Ontario, Canada</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 Vullnet Nura Group. All rights reserved.</p>
      <p>Built with precision.</p>
    </div>
  </div>
</footer>
```

- [ ] **Step 3: Commit**

```bash
cd /Users/saim/Downloads/VullnetRepo
git add src/_includes/
git commit -m "feat: add nav and footer components"
```

---

### Task 5: Create Home Page

**Files:**
- Create: `src/index.njk`

- [ ] **Step 1: Create `src/index.njk`**

```html
---
layout: base.njk
title: "Vullnet Nura Group — Commercial Interior Execution"
description: "Ontario's deadline-first commercial renovation contractor. 1000+ projects delivered on time, on budget."
permalink: /
---

<!-- HERO -->
<section class="hero" id="hero">
  <div class="hero-lines">
    <div class="line" style="left:10%;animation-delay:0s;opacity:.5"></div>
    <div class="line" style="left:25%;animation-delay:-4s;opacity:.3"></div>
    <div class="line" style="left:40%;animation-delay:-8s;opacity:.4"></div>
    <div class="line" style="left:55%;animation-delay:-2s;opacity:.3"></div>
    <div class="line" style="left:70%;animation-delay:-6s;opacity:.5"></div>
    <div class="line" style="left:85%;animation-delay:-10s;opacity:.3"></div>
    <div class="line" style="left:95%;animation-delay:-3s;opacity:.4"></div>
  </div>
  <div class="hero-accent hero-accent-1"></div>
  <div class="hero-accent hero-accent-2"></div>
  <div class="container">
    <div class="hero-grid">
      <div class="hero-left">
        <div class="hero-eyebrow">
          <span class="dot"></span>
          <span>Commercial Interior Execution</span>
        </div>
        <h1>
          <span class="word">When we </span>
          <span class="word">start, </span>
          <span class="word accent">we finish.</span>
        </h1>
        <p class="hero-body">Most contractors talk. We deliver. Over a decade of on time, on budget commercial renovations across Ontario. No excuses. No finger pointing. Just a finished project you can walk through and feel proud of.</p>
        <div class="hero-btns">
          <a href="/contact" class="btn btn-red">Request a Quote <svg class="arrow-icon" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
          <a href="/services" class="btn btn-ghost">See Our Work</a>
        </div>
      </div>
      <div class="hero-right">
        <div class="hero-stat"><div class="num">1000+</div><div class="lab">Projects Delivered</div></div>
        <div class="hero-stat"><div class="num">10+</div><div class="lab">Years in Business</div></div>
        <div class="hero-stat"><div class="num">100%</div><div class="lab">Deadline Focused</div></div>
      </div>
    </div>
  </div>
</section>

<!-- MARQUEE -->
<div class="marquee">
  <div class="marquee-track">
    <span>Demolition</span><span>Walls &amp; Ceilings</span><span>Finishing</span><span>Millwork</span><span>Installation</span><span>Trade Coordination</span><span>Project Scaling</span><span>Multi Scope Execution</span>
    <span>Demolition</span><span>Walls &amp; Ceilings</span><span>Finishing</span><span>Millwork</span><span>Installation</span><span>Trade Coordination</span><span>Project Scaling</span><span>Multi Scope Execution</span>
  </div>
</div>
```

- [ ] **Step 2: Run a test build and verify**

```bash
cd /Users/saim/Downloads/VullnetRepo && npm run build 2>&1
```

Expected: build succeeds, `_site/index.html` exists.

```bash
grep -c "<title>" _site/index.html
```

Expected: `1`

```bash
grep "og:title" _site/index.html
```

Expected: line containing `Vullnet Nura Group — Commercial Interior Execution`

- [ ] **Step 3: Commit**

```bash
cd /Users/saim/Downloads/VullnetRepo
git add src/index.njk
git commit -m "feat: add home page"
```

---

### Task 6: Create About Page

**Files:**
- Create: `src/about.njk`

- [ ] **Step 1: Create `src/about.njk`**

```html
---
layout: base.njk
title: "About | Vullnet Nura Group"
description: "Mid-market systems and speed of a specialist crew. Learn how VNG delivers for commercial project managers across the GTA."
permalink: /about/
---

<section class="split" id="about">
  <div class="split-text">
    <div class="r-left" style="max-width:480px">
      <div style="font-size:.7rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--red);margin-bottom:16px">About VNG</div>
      <h2 style="font-size:clamp(2rem,4vw,3.2rem);line-height:1;margin-bottom:24px;color:var(--pure)">The execution partner project managers actually trust.</h2>
      <p style="font-size:.95rem;line-height:1.75;color:var(--gray2);margin-bottom:20px">Here is the truth about this industry. Most contractors are either too small to be reliable or too big to actually care about your project.</p>
      <p style="font-size:.95rem;line-height:1.75;color:var(--gray2);margin-bottom:20px">VNG sits in the middle on purpose. We have the systems and manpower of a large firm with the speed and flexibility of a specialized crew. That means your project gets real attention from people who treat your deadline like their own.</p>
      <p style="font-size:.95rem;line-height:1.75;color:var(--gray2)">We have delivered over a thousand projects across the GTA. Not because we are the cheapest. Because we are the ones who actually show up and get it done.</p>
      <div style="margin-top:32px">
        <a href="/contact" class="btn btn-red">Work With Us <svg class="arrow-icon" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
      </div>
    </div>
  </div>
  <div class="split-visual">
    <div class="split-visual-inner">
      <div class="logo-wall">
        <svg class="floating-v" viewBox="0 0 200 200" style="width:80%;left:10%;top:10%;animation-delay:0s" fill="none">
          <g stroke="#d83030" stroke-width="1.2" opacity=".8">
            <line x1="100" y1="180" x2="72" y2="16"/><line x1="100" y1="180" x2="50" y2="16"/>
            <line x1="100" y1="180" x2="30" y2="24"/><line x1="100" y1="180" x2="14" y2="42"/>
            <line x1="100" y1="180" x2="4" y2="64"/><line x1="100" y1="180" x2="0" y2="92"/>
            <line x1="100" y1="180" x2="0" y2="120"/><line x1="100" y1="180" x2="4" y2="146"/>
            <line x1="100" y1="180" x2="14" y2="162"/>
            <line x1="100" y1="180" x2="128" y2="16"/><line x1="100" y1="180" x2="150" y2="16"/>
            <line x1="100" y1="180" x2="170" y2="24"/><line x1="100" y1="180" x2="186" y2="42"/>
            <line x1="100" y1="180" x2="196" y2="64"/><line x1="100" y1="180" x2="200" y2="92"/>
            <line x1="100" y1="180" x2="200" y2="120"/><line x1="100" y1="180" x2="196" y2="146"/>
            <line x1="100" y1="180" x2="186" y2="162"/>
          </g>
        </svg>
      </div>
    </div>
    <div class="split-quote r-right">
      <p>&ldquo;We do what we say we will do. <span class="highlight">Every single time.</span>&rdquo;</p>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Build and verify**

```bash
cd /Users/saim/Downloads/VullnetRepo && npm run build 2>&1
ls _site/about/
```

Expected: `index.html` exists in `_site/about/`.

```bash
grep "About | Vullnet" _site/about/index.html
```

Expected: line found.

- [ ] **Step 3: Commit**

```bash
git add src/about.njk
git commit -m "feat: add about page"
```

---

### Task 7: Create Services Page

**Files:**
- Create: `src/services.njk`

- [ ] **Step 1: Create `src/services.njk`**

```html
---
layout: base.njk
title: "Services | Vullnet Nura Group"
description: "Demolition, walls & ceilings, millwork, finishing, and trade coordination — full-scope commercial interior execution across Ontario."
permalink: /services/
---

<section class="services-section" id="services">
  <div class="services-header r">
    <div class="tag">What We Execute</div>
    <h2>Full scope interior<br>execution.</h2>
    <p>From first swing of the hammer to the final piece of millwork, we handle every trade under one roof so nothing slips through the cracks.</p>
  </div>
  <div class="services-masonry stagger">
    <div class="svc-card r">
      <span class="svc-num">01</span>
      <h3>Demolition</h3>
      <p>Complete strip outs and selective demo. We clear the way fast and clean so your project starts on the front foot, not the back one.</p>
    </div>
    <div class="svc-card r">
      <span class="svc-num">02</span>
      <h3>Walls &amp; Ceilings</h3>
      <p>Steel framing, drywall, taping, ceiling systems. Precision work that is ready for finishing on time, every time.</p>
    </div>
    <div class="svc-card r">
      <span class="svc-num">03</span>
      <h3>Finishing</h3>
      <p>Paint, trim, flooring, final touches. This is where the design comes to life and we make sure every surface reflects the quality your client expects.</p>
    </div>
    <div class="svc-card r">
      <span class="svc-num">04</span>
      <h3>Millwork &amp; Install</h3>
      <p>Custom millwork, cabinetry, fixtures, built ins. Placed exactly to spec with zero guesswork and zero callbacks.</p>
    </div>
    <div class="svc-card big r">
      <div>
        <span class="svc-num">05</span>
        <h3>Trade Coordination &amp; Scaling</h3>
        <p>We manage the flow of multiple trades, keep schedules tight, and scale manpower when the timeline demands it. Weekend pushes, extended crews, whatever it takes. Your deadline does not move.</p>
      </div>
      <div style="display:flex;align-items:center;justify-content:center">
        <svg viewBox="0 0 120 120" width="100" height="100" fill="none" style="opacity:.25">
          <circle cx="60" cy="60" r="50" stroke="#d83030" stroke-width="1.5"/>
          <circle cx="60" cy="60" r="35" stroke="#d83030" stroke-width="1"/>
          <circle cx="60" cy="60" r="20" stroke="#d83030" stroke-width=".8"/>
          <line x1="60" y1="10" x2="60" y2="110" stroke="#d83030" stroke-width=".5"/>
          <line x1="10" y1="60" x2="110" y2="60" stroke="#d83030" stroke-width=".5"/>
        </svg>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Build and verify**

```bash
cd /Users/saim/Downloads/VullnetRepo && npm run build 2>&1
ls _site/services/
grep "Services | Vullnet" _site/services/index.html
```

Expected: `index.html` in `_site/services/`, title tag found.

- [ ] **Step 3: Commit**

```bash
git add src/services.njk
git commit -m "feat: add services page"
```

---

### Task 8: Create Values Page

**Files:**
- Create: `src/values.njk`

- [ ] **Step 1: Create `src/values.njk`**

```html
---
layout: base.njk
title: "Our Values | Vullnet Nura Group"
description: "Accountability, transparency, excellence, and reliability. The principles behind every VNG project."
permalink: /values/
---

<section class="values-section" id="values">
  <div class="values-container">
    <div class="values-top">
      <div class="r-left">
        <div class="tag">Core Values</div>
        <h2>What we actually<br>stand behind.</h2>
      </div>
      <div class="r-right">
        <p>These are not words on a wall. These are the standards we hold ourselves to on every single project. If we fall short, you will hear it from us first.</p>
      </div>
    </div>
    <div class="values-row stagger">
      <div class="val-item r">
        <div class="big-num">01</div>
        <h3>Accountability</h3>
        <p>We own the outcome. If a project hits a wall, we scale our team, extend our hours, and protect your deadline like it is our own. Because it is.</p>
      </div>
      <div class="val-item r">
        <div class="big-num">02</div>
        <h3>Transparency</h3>
        <p>No disappearing acts. No sugar coating. You get direct, clear communication whether the news is good or bad. That is how trust gets built.</p>
      </div>
      <div class="val-item r">
        <div class="big-num">03</div>
        <h3>Excellence</h3>
        <p>Our reputation lives on the job site, not in a slide deck. Every wall, every finish, every detail has to meet the same standard we would put our name next to.</p>
      </div>
      <div class="val-item r">
        <div class="big-num">04</div>
        <h3>Reliability</h3>
        <p>We do what we say we will do. That sounds simple until you realize how many contractors cannot deliver on that promise. We can. We have. We will.</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Build and verify**

```bash
cd /Users/saim/Downloads/VullnetRepo && npm run build 2>&1
ls _site/values/
grep "Our Values | Vullnet" _site/values/index.html
```

Expected: `index.html` in `_site/values/`, title tag found.

- [ ] **Step 3: Commit**

```bash
git add src/values.njk
git commit -m "feat: add values page"
```

---

### Task 9: Create Process Page

**Files:**
- Create: `src/process.njk`

- [ ] **Step 1: Create `src/process.njk`**

```html
---
layout: base.njk
title: "Our Process | Vullnet Nura Group"
description: "From first call to final walkthrough — how VNG manages commercial renovations with zero surprises."
permalink: /process/
---

<section class="process-section" id="process">
  <div class="process-container">
    <div class="process-header r">
      <div class="tag">How We Work</div>
      <h2>Simple process.<br>Zero surprises.</h2>
    </div>
    <div class="timeline stagger">
      <div class="tl-step r">
        <div class="tl-dot"></div>
        <div class="step-tag">Step 01</div>
        <h3>Scope &amp; Quote</h3>
        <p>You tell us what you need. We give you a clear scope and a transparent quote. No hidden costs, no vague line items. You know exactly what you are paying for before we pick up a single tool.</p>
      </div>
      <div class="tl-step r">
        <div class="tl-dot"></div>
        <div class="step-tag">Step 02</div>
        <h3>Plan &amp; Schedule</h3>
        <p>We build a detailed project plan with every milestone mapped and every trade accounted for. You see the full picture upfront so there is never a question about what happens next.</p>
      </div>
      <div class="tl-step r">
        <div class="tl-dot"></div>
        <div class="step-tag">Step 03</div>
        <h3>Execute &amp; Update</h3>
        <p>We get to work and keep you in the loop with structured updates. Daily or weekly, whatever the project demands. You will never have to chase us for a status report.</p>
      </div>
      <div class="tl-step r">
        <div class="tl-dot"></div>
        <div class="step-tag">Step 04</div>
        <h3>Deliver &amp; Close</h3>
        <p>The job wraps on time with full documentation. Clean handoff, no loose ends, no callbacks. You walk through a finished project and it is exactly what was promised.</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Build and verify**

```bash
cd /Users/saim/Downloads/VullnetRepo && npm run build 2>&1
ls _site/process/
grep "Our Process | Vullnet" _site/process/index.html
```

Expected: `index.html` in `_site/process/`, title tag found.

- [ ] **Step 3: Commit**

```bash
git add src/process.njk
git commit -m "feat: add process page"
```

---

### Task 10: Create Contact Page

**Files:**
- Create: `src/contact.njk`

- [ ] **Step 1: Create `src/contact.njk`**

```html
---
layout: base.njk
title: "Get a Quote | Vullnet Nura Group"
description: "Ready to start your next commercial renovation? Contact Vullnet Nura Group for a fast, no-nonsense quote."
permalink: /contact/
---

<section class="cta" id="contact">
  <div class="cta-bg"><span>VNG</span></div>
  <div class="container">
    <div class="r-scale">
      <div class="cta-line"></div>
      <h2>Your project deserves<br>a team that <span class="accent">shows up.</span></h2>
      <p>Tell us what you are building. We will come back to you with a clear scope, an honest timeline, and a number you can trust.</p>
      <a href="mailto:info@vullnetnuragroup.com" class="btn btn-red">Start a Conversation <svg class="arrow-icon" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Build and verify**

```bash
cd /Users/saim/Downloads/VullnetRepo && npm run build 2>&1
ls _site/contact/
grep "Get a Quote | Vullnet" _site/contact/index.html
```

Expected: `index.html` in `_site/contact/`, title tag found.

- [ ] **Step 3: Commit**

```bash
git add src/contact.njk
git commit -m "feat: add contact page"
```

---

### Task 11: Create Sitemap and Robots.txt

**Files:**
- Create: `src/sitemap.njk`
- Create: `src/robots.txt`

- [ ] **Step 1: Create `src/sitemap.njk`**

```html
---
permalink: /sitemap.xml
eleventyExcludeFromCollections: true
---
<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://vullnet.vercel.app/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://vullnet.vercel.app/about/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://vullnet.vercel.app/services/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://vullnet.vercel.app/values/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://vullnet.vercel.app/process/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://vullnet.vercel.app/contact/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

- [ ] **Step 2: Create `src/robots.txt`**

```
User-agent: *
Allow: /
Sitemap: https://vullnet.vercel.app/sitemap.xml
```

- [ ] **Step 3: Build and verify**

```bash
cd /Users/saim/Downloads/VullnetRepo && npm run build 2>&1
cat _site/sitemap.xml
cat _site/robots.txt
```

Expected: `sitemap.xml` contains all 6 URLs, `robots.txt` points to sitemap.

- [ ] **Step 4: Commit**

```bash
git add src/sitemap.njk src/robots.txt
git commit -m "feat: add sitemap.xml and robots.txt"
```

---

### Task 12: Final Cleanup and Push

**Files:**
- Delete: `index.html` (replaced by `src/index.njk`)

- [ ] **Step 1: Full build verification**

```bash
cd /Users/saim/Downloads/VullnetRepo && npm run build 2>&1
```

Expected: zero errors, output like:
```
[11ty] Wrote 7 files in X.XXs
```

- [ ] **Step 2: Verify all 6 pages + sitemap + robots exist**

```bash
ls _site/
ls _site/about/ _site/services/ _site/values/ _site/process/ _site/contact/
```

Expected: each directory contains `index.html`.

- [ ] **Step 3: Verify SEO tags on every page**

```bash
for page in _site/index.html _site/about/index.html _site/services/index.html _site/values/index.html _site/process/index.html _site/contact/index.html; do
  echo "=== $page ===";
  grep -c "og:title\|canonical\|application/ld+json" $page;
done
```

Expected: each page returns `3` (og:title, canonical, and JSON-LD each appear once).

- [ ] **Step 4: Delete old index.html**

```bash
cd /Users/saim/Downloads/VullnetRepo
git rm index.html
```

- [ ] **Step 5: Final commit and push**

```bash
git add -A
git commit -m "feat: complete SEO multi-page Eleventy migration"
git push
```

Expected: push succeeds, Vercel detects the push and starts a deployment. Check Vercel dashboard to confirm build passes.
