# UI/UX Full Site Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve the Vullnet Nura Group website's UI/UX through a code quality pass, nav upgrade, visual polish, and inner page standardisation.

**Architecture:** Six self-contained tasks modifying `style.css`, `nav.njk`, `index.njk`, and city/service pages. A new `cta-section.njk` partial is created for inner page CTAs. All JS is already fully implemented in `public/js/main.js` — no new JS files needed.

**Tech Stack:** Eleventy (11ty) static site, Nunjucks templates, vanilla CSS, vanilla JS.

## Global Constraints

- Build command: `npx @11ty/eleventy` from `/Users/saim/Downloads/Claude Code/VullnetRepo`
- Dev server: `npx @11ty/eleventy --serve`
- All colours must use CSS variables: `--red:#d83030`, `--dark:#1a1a1a`, `--dark2:#292929`, `--pure:#fff`, `--gray1:#5B5B5B`, `--gray2:#A0A0A0`, `--gray3:#DBDBDB`
- Font families: `'Oswald',sans-serif` (headings/uppercase labels) and `'Inter',sans-serif` (body)
- Do NOT modify `public/js/main.js` — it is already fully wired with Intersection Observer, mobile CTA bar, reading progress, card hovers, and all interactions
- The mobile CTA bar (`.cx-mobile-cta`) already exists in `base.njk` and `style.css` — do not add another one
- The reading progress bar (`#cx-progress`) already exists — do not add another one
- Reveal system already uses `.v` class (not `.in-view`) — do not add new reveal CSS
- City/service pages intentionally use `.split` as their hero — do NOT migrate them to `.page-hero`

---

### Task 1: Nav — Remove Phone Number, Add Services Dropdown

**Files:**
- Modify: `src/_includes/nav.njk`
- Modify: `public/css/style.css`

**Interfaces:**
- Produces: `.has-dropdown`, `.dropdown-panel`, `.dropdown-col`, `.chevron` CSS classes consumed by no later task

- [ ] **Step 1: Update nav.njk — remove phone link and add dropdown**

Open `src/_includes/nav.njk`. The current `<ul class="nav-links">` has 8 `<li>` items. Make two changes:

1. Remove the phone number `<li>` entirely:
```html
<li><a href="tel:+12893396697" class="nav-phone">(289) 339-6697</a></li>
```

2. Replace the plain Services `<li>` with a dropdown wrapper:

Old:
```html
<li><a href="/services"{% if page.url == '/services/' %} class="active"{% endif %}>Services</a></li>
```

New:
```html
<li class="has-dropdown">
  <a href="/services"{% if page.url == '/services/' %} class="active"{% endif %}>Services <svg class="chevron" viewBox="0 0 10 6" width="10" height="6" fill="none" aria-hidden="true"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
  <div class="dropdown-panel">
    <div class="dropdown-col">
      <a href="/office-renovation-toronto">Office Renovation</a>
      <a href="/medical-office-renovation-toronto">Medical Renovation</a>
      <a href="/restaurant-renovation-toronto">Restaurant Fit-Out</a>
    </div>
    <div class="dropdown-col">
      <a href="/retail-fitout-gta">Retail Fit-Out</a>
      <a href="/commercial-permits-toronto">Permit Management</a>
      <a href="/fast-track-commercial-renovation">Fast-Track Projects</a>
    </div>
  </div>
</li>
```

- [ ] **Step 2: Add dropdown CSS to style.css**

Add after the `.nav-phone::after{display:none!important}` line (around line 28):

```css
/* ---- NAV DROPDOWN ---- */
.has-dropdown{position:relative}
.dropdown-panel{position:absolute;top:calc(100% + 8px);left:50%;transform:translateX(-50%) translateY(6px);background:rgba(22,22,22,.98);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.08);padding:20px 24px;display:grid;grid-template-columns:1fr 1fr;gap:0 28px;min-width:340px;opacity:0;visibility:hidden;transition:opacity .2s,transform .2s,visibility .2s;z-index:200;pointer-events:none}
.has-dropdown:hover .dropdown-panel{opacity:1;visibility:visible;transform:translateX(-50%) translateY(0);pointer-events:auto}
.dropdown-panel a{display:block;font-size:.72rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--gray2);text-decoration:none;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.04);transition:color .2s,padding-left .2s}
.dropdown-panel a:last-child{border-bottom:none}
.dropdown-panel a::after{display:none!important}
.dropdown-panel a:hover{color:var(--pure);padding-left:6px}
.chevron{vertical-align:middle;margin-left:4px;transition:transform .2s;display:inline-block}
.has-dropdown:hover .chevron{transform:rotate(180deg)}
@media(max-width:768px){.dropdown-panel{display:none!important}}
```

- [ ] **Step 3: Build and verify**

```bash
cd "/Users/saim/Downloads/Claude Code/VullnetRepo" && npx @11ty/eleventy
```
Expected: `Wrote N files in Xs` with no errors.

Open `_site/index.html` in a browser or check `grep -c "nav-phone" _site/index.html` → result should be `0`.

- [ ] **Step 4: Commit**

```bash
cd "/Users/saim/Downloads/Claude Code/VullnetRepo" && git add src/_includes/nav.njk public/css/style.css && git commit -m "feat: services dropdown nav, remove phone number from nav"
```

---

### Task 2: Code Quality — Trust Bar (Inline Styles → CSS)

**Files:**
- Modify: `src/index.njk` (lines 96–131, the social proof / reviews trust bar section)
- Modify: `public/css/style.css`

**Interfaces:**
- Produces: `.trust-bar`, `.trust-bar-inner`, `.trust-bar-rating`, `.trust-bar-stars`, `.trust-bar-score`, `.trust-bar-count`, `.trust-bar-stats`, `.trust-bar-divider`, `.trust-bar-stat`, `.trust-bar-stat-label`, `.trust-bar-stat-value` — consumed by no later task

- [ ] **Step 1: Add trust bar CSS to style.css**

Add after the `.footer-social a:hover{color:var(--red)}` block (around line 32):

```css
/* ---- TRUST BAR ---- */
.trust-bar{background:#111;padding:32px 0;border-bottom:1px solid rgba(255,255,255,.05)}
.trust-bar-inner{max-width:1280px;margin:0 auto;padding:0 clamp(24px,5vw,80px);display:flex;align-items:center;justify-content:space-between;gap:32px;flex-wrap:wrap}
.trust-bar-rating{display:flex;align-items:center;gap:16px}
.trust-bar-stars{display:flex;gap:3px}
.trust-bar-score{font-size:.82rem;font-weight:700;color:var(--pure)}
.trust-bar-count{font-size:.8rem;color:var(--gray2)}
.trust-bar-stats{display:flex;align-items:center;gap:32px;flex-wrap:wrap}
.trust-bar-divider{width:1px;height:28px;background:rgba(255,255,255,.08);flex-shrink:0}
.trust-bar-stat{text-align:center}
.trust-bar-stat-label{font-size:.65rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--gray1);margin-bottom:4px}
.trust-bar-stat-value{font-size:.82rem;font-weight:700;color:var(--pure)}
```

- [ ] **Step 2: Replace the trust bar section in index.njk**

Find the block starting with `<!-- SOCIAL PROOF / REVIEWS TRUST BAR -->` (line 95) and ending with `</section>` (line 131). Replace it entirely with:

```html
<!-- SOCIAL PROOF / REVIEWS TRUST BAR -->
<section class="trust-bar">
  <div class="trust-bar-inner">
    <div class="trust-bar-rating">
      <div class="trust-bar-stars">
        <svg viewBox="0 0 16 16" width="18" height="18" fill="#f5c518"><path d="M8 1.5l1.796 3.64 4.014.583-2.905 2.83.686 3.997L8 10.477l-3.591 1.073.686-3.997L2.19 5.723l4.014-.583z"/></svg>
        <svg viewBox="0 0 16 16" width="18" height="18" fill="#f5c518"><path d="M8 1.5l1.796 3.64 4.014.583-2.905 2.83.686 3.997L8 10.477l-3.591 1.073.686-3.997L2.19 5.723l4.014-.583z"/></svg>
        <svg viewBox="0 0 16 16" width="18" height="18" fill="#f5c518"><path d="M8 1.5l1.796 3.64 4.014.583-2.905 2.83.686 3.997L8 10.477l-3.591 1.073.686-3.997L2.19 5.723l4.014-.583z"/></svg>
        <svg viewBox="0 0 16 16" width="18" height="18" fill="#f5c518"><path d="M8 1.5l1.796 3.64 4.014.583-2.905 2.83.686 3.997L8 10.477l-3.591 1.073.686-3.997L2.19 5.723l4.014-.583z"/></svg>
        <svg viewBox="0 0 16 16" width="18" height="18" fill="#f5c518"><path d="M8 1.5l1.796 3.64 4.014.583-2.905 2.83.686 3.997L8 10.477l-3.591 1.073.686-3.997L2.19 5.723l4.014-.583z"/></svg>
      </div>
      <span class="trust-bar-score">5.0</span>
      <span class="trust-bar-count">47 Google Reviews</span>
    </div>
    <div class="trust-bar-stats">
      <div class="trust-bar-stat">
        <div class="trust-bar-stat-label">Coverage</div>
        <div class="trust-bar-stat-value">GTA &amp; Ontario Wide</div>
      </div>
      <div class="trust-bar-divider"></div>
      <div class="trust-bar-stat">
        <div class="trust-bar-stat-label">WSIB</div>
        <div class="trust-bar-stat-value">Fully Covered</div>
      </div>
      <div class="trust-bar-divider"></div>
      <div class="trust-bar-stat">
        <div class="trust-bar-stat-label">Insurance</div>
        <div class="trust-bar-stat-value">$5M General Liability</div>
      </div>
      <div class="trust-bar-divider"></div>
      <div class="trust-bar-stat">
        <div class="trust-bar-stat-label">In Business</div>
        <div class="trust-bar-stat-value">Since 2013</div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Build and verify**

```bash
npx @11ty/eleventy
```
Expected: Build succeeds. Check that `grep -c "style=\"background:#111" _site/index.html` returns `0` for the trust bar section. Visual appearance is identical to before.

- [ ] **Step 4: Commit**

```bash
git add src/index.njk public/css/style.css && git commit -m "refactor: trust bar inline styles to CSS classes"
```

---

### Task 3: Code Quality — Tools Strip (Inline Styles + JS Hover → CSS)

**Files:**
- Modify: `src/index.njk` (lines 404–429, the Planning Resources / tools strip section)
- Modify: `public/css/style.css`

**Interfaces:**
- Produces: `.tools-strip`, `.tools-strip-header`, `.tools-strip-grid`, `.tool-card`, `.tool-card-tag` — consumed by no later task

- [ ] **Step 1: Add tools strip CSS to style.css**

Add after the trust bar CSS block added in Task 2:

```css
/* ---- TOOLS STRIP ---- */
.tools-strip{background:var(--dark2);padding:clamp(48px,6vw,72px) 0;border-top:1px solid rgba(255,255,255,.05)}
.tools-strip .container{max-width:1280px;margin:0 auto;padding:0 clamp(24px,5vw,80px)}
.tools-strip-header{margin-bottom:36px}
.tools-strip-header .tag{font-size:.7rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--red);margin-bottom:10px}
.tools-strip-header h2{font-size:clamp(1.4rem,2.5vw,2rem);color:var(--pure);line-height:1}
.tools-strip-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px}
.tool-card{background:#111;padding:32px 28px;text-decoration:none;display:block;border-bottom:3px solid transparent;transition:border-color .25s,background .25s}
.tool-card:hover{border-bottom-color:var(--red);background:#1a1a1a}
.tool-card-tag{font-size:.65rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--red);margin-bottom:12px}
.tool-card h3{font-size:.95rem;color:var(--pure);margin-bottom:10px;line-height:1.3;font-family:'Oswald',sans-serif;text-transform:uppercase;letter-spacing:.03em}
.tool-card p{font-size:.82rem;line-height:1.6;color:var(--gray2)}
@media(max-width:640px){.tools-strip-grid{grid-template-columns:1fr}}
```

- [ ] **Step 2: Replace the tools strip section in index.njk**

Find the block starting with `<!-- TOOLS / QUICK LINKS STRIP -->` (line 404) and ending with `</section>` (line 429). Replace it entirely with:

```html
<!-- TOOLS / QUICK LINKS STRIP -->
<section class="tools-strip">
  <div class="container">
    <div class="tools-strip-header r">
      <div class="tag">Planning Resources</div>
      <h2>Tools to help you plan before you call.</h2>
    </div>
    <div class="tools-strip-grid">
      <a href="/cost-estimator" class="tool-card r">
        <div class="tool-card-tag">Free Tool</div>
        <h3>Renovation Cost Estimator</h3>
        <p>Get a rough budget range in 60 seconds. Select your space type, size, and finish level to see GTA market rate ranges.</p>
      </a>
      <a href="/commercial-permits-toronto" class="tool-card r">
        <div class="tool-card-tag">Permit Guide</div>
        <h3>GTA Permit Timelines</h3>
        <p>How long permits take in every GTA municipality, what causes delays, and why you should know this before signing your lease.</p>
      </a>
      <a href="/fast-track-commercial-renovation" class="tool-card r">
        <div class="tool-card-tag">Urgent Project?</div>
        <h3>Fast-Track Renovation</h3>
        <p>Hard deadline in 3-6 weeks? Learn how VNG compresses commercial renovation schedules without cutting corners.</p>
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Build and verify no JS hover handlers remain**

```bash
npx @11ty/eleventy && grep -c "onmouseover" _site/index.html
```
Expected: Build succeeds. `grep` returns `0`.

- [ ] **Step 4: Commit**

```bash
git add src/index.njk public/css/style.css && git commit -m "refactor: tools strip inline styles and JS hover to CSS"
```

---

### Task 4: Testimonials Polish + Ghost Button Fill

**Files:**
- Modify: `public/css/style.css` only

**Interfaces:**
- Produces: updated `.cx-proof-card`, `.cx-proof-attr span`, `.btn-ghost:hover` rules

- [ ] **Step 1: Add testimonial left border**

In `style.css`, find the `.cx-proof` block around line 361. After the `.cx-proof-attr span{color:var(--red)}` line, add:

```css
.cx-proof-card{border-left:3px solid var(--red)}
.cx-proof-attr span{font-weight:600}
```

Note: `.cx-proof-attr span` already has `color:var(--red)` — keep that, just add `font-weight:600`.

- [ ] **Step 2: Update ghost button hover**

Find this exact line in `style.css` (around line 88):
```css
.btn-ghost:hover{border-color:var(--pure);transform:translateY(-2px)}
```

Replace with:
```css
.btn-ghost:hover{border-color:var(--pure);transform:translateY(-2px);background:rgba(255,255,255,.06)}
```

- [ ] **Step 3: Build and verify**

```bash
npx @11ty/eleventy
```
Expected: Build succeeds. Verify `grep -A2 "cx-proof-card{" _site/index.html` is not needed — just confirm build passes.

- [ ] **Step 4: Commit**

```bash
git add public/css/style.css && git commit -m "feat: testimonial left border, ghost button hover fill"
```

---

### Task 5: Footer Polish

**Files:**
- Modify: `public/css/style.css` only

**Interfaces:**
- Produces: updated `.footer h4`, `.footer ul a`, new `.footer-brand a:hover svg` rule

- [ ] **Step 1: Update footer h4 to add red underline accent**

Find in `style.css` (around line 183):
```css
.footer h4{font-size:.68rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--pure);margin-bottom:16px}
```

Replace with:
```css
.footer h4{font-size:.68rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--pure);margin-bottom:14px;padding-bottom:8px;border-bottom:2px solid var(--red);display:inline-block}
```

- [ ] **Step 2: Reduce footer link font size**

Find in `style.css` (around line 186):
```css
.footer ul a{font-size:.82rem;color:var(--gray2);text-decoration:none;transition:color .2s}
```

Replace with:
```css
.footer ul a{font-size:.78rem;color:var(--gray2);text-decoration:none;transition:color .2s}
```

- [ ] **Step 3: Add logo hover glow**

Find in `style.css` (around line 32):
```css
.footer-social a:hover{color:var(--red)}
```

Add after it:
```css
.footer-brand a:hover svg{filter:drop-shadow(0 0 6px rgba(216,48,48,.5));transition:filter .2s}
```

- [ ] **Step 4: Build and verify**

```bash
npx @11ty/eleventy
```
Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add public/css/style.css && git commit -m "feat: footer h4 red accent, smaller links, logo hover glow"
```

---

### Task 6: CTA Partial + Inner Page Standardisation

**Files:**
- Create: `src/_includes/cta-section.njk`
- Modify: city/service `.njk` pages in `src/` that are missing a CTA at the end

**Interfaces:**
- Produces: `cta-section.njk` partial consumed by all inner pages missing a CTA

- [ ] **Step 1: Create the CTA partial**

Create `src/_includes/cta-section.njk` with this exact content:

```html
<section class="cta" id="contact-cta">
  <div class="cta-bg"><span>VNG</span></div>
  <div class="container">
    <div class="r-scale">
      <div class="cta-line"></div>
      <h2>Your project deserves<br>a team that <span class="accent">shows up.</span></h2>
      <p>Tell us what you are building. We will come back with a clear scope, an honest timeline, and a number you can stand behind.</p>
      <div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center">
        <a href="/contact" class="btn btn-red">Start a Conversation <svg class="arrow-icon" viewBox="0 0 16 16" fill="none"><path d="M3 13L13 3M6 3h7v7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
        <a href="https://calendly.com/vullnetnuragroup-marketing/discovery" target="_blank" rel="noopener noreferrer" class="btn btn-ghost">Book a Discovery Call</a>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Find pages missing a CTA**

Run these two commands to find which pages lack any CTA or conversion section:

```bash
cd "/Users/saim/Downloads/Claude Code/VullnetRepo"
grep -rL "class=\"cta\"\|cx-conversion\|btn-red" src/*.njk | grep -v "index.njk\|contact.njk\|thank-you.njk\|feed.njk\|sitemap.njk\|404.njk"
```

- [ ] **Step 3: Append CTA partial to each page from Step 2**

For each file listed, add this line at the very end of the file (after the last `</section>`):

```
{% include "cta-section.njk" %}
```

Pages known to already have a CTA and should NOT be modified:
- `index.njk` — has full `.cta` section
- `contact.njk` — IS the contact page
- `thank-you.njk` — post-conversion page, no CTA needed
- `feed.njk`, `sitemap.njk`, `404.njk` — non-content pages

- [ ] **Step 4: Build and verify**

```bash
npx @11ty/eleventy
```
Expected: Build succeeds. Sample check:

```bash
grep -c "class=\"cta\"" _site/commercial-renovation-toronto/index.html
```
Expected: returns `1` (or more if there was already one).

- [ ] **Step 5: Commit**

```bash
git add src/_includes/cta-section.njk src/*.njk && git commit -m "feat: cta-section partial, appended to all inner pages"
```

---

### Task 7: Push to Production

- [ ] **Step 1: Final build check**

```bash
cd "/Users/saim/Downloads/Claude Code/VullnetRepo" && npx @11ty/eleventy
```
Expected: Build succeeds with no errors.

- [ ] **Step 2: Push**

```bash
git push
```
Expected: `main -> main` pushed to `https://github.com/SaimAbbasi/Vullnet.git`.

---

## Already Implemented — Do Not Rebuild

The following were in the spec but are **fully implemented** in the current codebase. Do not touch them:

| Feature | Where it lives |
|---|---|
| Intersection Observer scroll reveals (`.r`, `.v`) | `main.js:25-28`, `style.css:190-206` |
| Stagger delays (up to 12 children) | `style.css:200-206`, `555-561` |
| Sticky mobile CTA bar | `base.njk:173-179`, `style.css:647-650` |
| Reading progress bar | `base.njk:156`, `main.js:115`, `style.css:541` |
| Blog post CTA section | `blog-post.njk:107-115` (`.bp-cta`) |
| Service card hover lift | `style.css:583-584` |
| Value item hover lift | `style.css:587-588` |
| Industry item hover | `style.css:354`, `574-575` |
| Testimonial quote mark `"` | `style.css:365` (`.cx-proof-quote::before`) |
| Proof card hover lift | `style.css:574` |
| Magnetic CTA buttons | `main.js:68-76` |
| Custom cursor ring | `base.njk:157`, `style.css:544-548`, `main.js:146-176` |
| Scroll quote tab | `base.njk:182`, `style.css:663-666`, `main.js:97-121` |
| Desktop sticky phone tab | `base.njk:182`, `style.css:658-660` |
| Back to top button | `base.njk:185-188`, `style.css:673-676`, `main.js:253-258` |
| CTA ambient glow | `style.css:578-580` |
| Blog TOC, copy link, newsletter | `blog-post.njk`, `main.js:260-297` |
| WhatsApp floating button | `base.njk:168-170`, `style.css:642-644` |
| Spotlight mouse glow | `style.css:616-619`, `main.js:178-185` |
