# UI/UX Improvements — Full Site Upgrade
**Date:** 2026-06-27
**Scope:** Full site — homepage, global elements, inner pages
**Approach:** Keep existing dark/red visual identity; add new micro-interactions, fix code quality, improve conversions

---

## Goals

1. Replace inline styles and JS hover hacks with maintainable CSS classes
2. Improve conversion rate with a sticky mobile CTA bar and tighter nav hierarchy
3. Add scroll-triggered micro-interactions that make the site feel alive
4. Standardise inner page structure and spacing across 30+ pages
5. Polish testimonials, footer, and social proof with stronger visual weight

---

## Section 1 — Code Quality

**Problem:** `src/index.njk` contains ~8 sections built entirely with raw `style=""` attributes and 3 tool cards with `onmouseover`/`onmouseout` JS event handlers.

**Changes:**

- Social proof / trust bar → `.trust-bar`, `.trust-bar-left`, `.trust-bar-stats`, `.trust-bar-stat`, `.trust-bar-divider` CSS classes
- Planning tools strip header → `.tools-strip-header`
- Tool cards → `.tool-card` class; hover state (background + border-bottom) moved from inline JS to CSS `.tool-card:hover`
- About teaser inline styles → reduce to minimal necessary overrides; common patterns extracted
- Remove all 3 `onmouseover`/`onmouseout` attributes from tool card anchors

**Constraint:** Zero visual change — this is a pure refactor.

---

## Section 2 — Navigation

**Problem:** Nav contains 8 items (5 links + phone + 2 CTAs), diluting the two primary CTAs.

**Changes:**

- Remove phone number from nav links (already in footer and hero)
- Add CSS-only Services dropdown on hover: 2-column panel, 6 links (Office Renovation, Medical Renovation, Restaurant Fit-Out, Retail Fit-Out, Permit Management, Fast-Track Projects)
- Dropdown trigger gets a small rotating chevron SVG (CSS `transform: rotate(180deg)` on `.has-dropdown:hover .chevron`)
- Mobile: dropdown becomes accordion-expand within the existing mobile overlay menu (toggle via JS class)
- Existing `.nav.scrolled` background behaviour unchanged

**CSS additions:** `.has-dropdown`, `.dropdown-panel`, `.dropdown-col`, `.chevron`

---

## Section 3 — Micro-interactions & Scroll Reveals

**Problem:** `.r` and `.stagger` classes exist on elements but no Intersection Observer is wired up — reveals fire immediately on load.

**Changes:**

### Intersection Observer
- Small JS block in `base.njk` (or a `public/js/reveal.js` file included in base)
- Watches for all `.r` elements; adds `.in-view` class on entry with `threshold: 0.12`
- Elements already in viewport on load fire immediately via `requestAnimationFrame`
- CSS: `.r { opacity: 0; transform: translateY(24px); transition: opacity .5s, transform .5s }` and `.r.in-view { opacity: 1; transform: none }`

### Stagger
- `.stagger .r:nth-child(n)` gets `transition-delay: calc((n - 1) * 80ms)` for up to 8 children
- Implemented via a CSS loop (`:nth-child(1)` through `:nth-child(8)`)

### Hover polish
- Service cards: add `transform: translateY(-3px)` on hover alongside existing red left-border
- Industry grid items: add `border-left: 3px solid var(--red)` + `background: rgba(255,255,255,.03)` on hover (currently too subtle)
- Timeline dots: on `.in-view`, a `::after` pseudo-element expands outward as a red ring (keyframe animation, fires once)
- `.btn-ghost`: on hover, fill with `rgba(255,255,255,.06)` in addition to existing border-color change

---

## Section 4 — Sticky Mobile CTA Bar

**Problem:** Mobile users have no persistent action available while scrolling.

**Component:** `.mobile-cta-bar`

**Behaviour:**
- Hidden by default (`transform: translateY(100%)`)
- JS: after 300px scroll, adds `.mobile-cta-bar--visible` class → `transform: translateY(0)`, smooth CSS transition
- JS: when scroll position is within 200px of footer top, remove `.mobile-cta-bar--visible` to avoid overlap
- Desktop: `display: none` via `@media (min-width: 769px)`

**Layout:** Full-width fixed bar, flex row
- Left: phone icon SVG + `(289) 339-6697` as `<a href="tel:...">`, colour `var(--pure)`
- Right: red "Get a Quote" `<a href="/contact">` button, fills remaining space

**CSS:** `padding: 12px clamp(16px, 4vw, 28px); padding-bottom: calc(12px + env(safe-area-inset-bottom)); background: var(--dark); border-top: 1px solid rgba(255,255,255,.1)`

**Existing body padding-bottom** on mobile already accounts for this bar height — confirm value matches bar height (~60px) in implementation.

---

## Section 5 — Testimonials & Social Proof

**Problem:** Testimonial cards are visually flat and lack the weight of credible social proof.

**Changes:**

### Trust bar (social proof strip)
- Refactored to CSS classes (Section 1)
- Stars get `filter: drop-shadow(0 0 4px rgba(245,197,24,.4))` on `.trust-bar:hover` for subtle glow

### Testimonial cards (`.cx-proof-card`)
- Add large decorative quote mark: `::before` pseudo-element, content `"\201C"`, Oswald font, `font-size: 6rem`, `color: rgba(216,48,48,.12)`, positioned `top: 16px; left: 20px`
- Add `border-left: 3px solid var(--red)` (static, always visible — establishes visual rhythm)
- Card hover: `transform: translateY(-4px)` + `box-shadow: -3px 0 0 var(--red)` (strengthens the left border on hover)
- Attribution `.cx-proof-attr span` (company name): `font-weight: 600; color: var(--gray3)` (up from `var(--gray2)`)

---

## Section 6 — Inner Page Consistency

**Problem:** 30+ inner pages vary in hero structure, section spacing, and CTA endings.

**Changes:**

### Spacing variable
- Add `--section-gap: clamp(56px, 7vw, 96px)` to `:root` in `style.css`
- Add `.section-pad { padding: var(--section-gap) 0 }` utility class
- Apply to inner pages that currently hardcode padding values

### Page hero
- `.page-hero` class already exists in CSS — inner pages whose top `<section>` does not already use it get their hero wrapper changed to `<section class="page-hero">`. Only the outermost wrapper changes; inner content (h1, tag, subtext) is left as-is
- Ensures consistent dark hero + red eyebrow tag + large H1 across all city/service pages

### Scroll reveals on inner pages
- Intersection Observer (Section 3) applies globally via `base.njk` — inner pages benefit automatically
- Inner page content sections get `.r` class added where missing

### Blog post improvements
- Reading progress bar: thin `4px` red bar fixed to top of viewport, width driven by scroll position (`scrollY / (documentHeight - viewportHeight) * 100%`)
- Implemented in `blog-post.njk` as an inline `<div class="reading-progress">` + small JS block
- Prose content: `max-width: 68ch` on the article body for optimal line length
- Every blog post ends with the standard `.cta` section — the `blog-post.njk` layout template gets the CTA partial appended once, so all posts inherit it automatically

### Inner page CTA
- All inner pages standardised to end with the `.cta` section from `index.njk`
- Pages already ending with it: no change
- Pages missing it: append `{% include "cta-section.njk" %}` — extract CTA HTML into a new `src/_includes/cta-section.njk` partial

---

## Section 7 — Footer

**Problem:** Minor density and polish issues now the footer is a single row.

**Changes:**

- Column link `font-size`: `.82rem` → `.78rem` for better density at mid-widths
- Column `h4` headings: add `padding-bottom: 10px; border-bottom: 2px solid var(--red); display: inline-block` for a red underline accent
- Logo SVG in footer: add `transition: filter .2s` and `filter: drop-shadow(0 0 6px rgba(216,48,48,.4))` on `.footer-brand a:hover`
- Footer bottom bar: no changes — reads cleanly as-is

---

## Files Changed

| File | Change |
|---|---|
| `public/css/style.css` | New classes for trust bar, tool cards, nav dropdown, mobile CTA bar, scroll reveals, stagger delays, testimonial cards, footer h4 accent, reading progress bar |
| `src/index.njk` | Remove inline styles → CSS classes; remove JS hover handlers; add mobile CTA bar HTML |
| `src/_includes/nav.njk` | Remove phone link; add Services dropdown markup |
| `src/_includes/footer.njk` | No structural changes — CSS handles the h4 and logo hover |
| `src/_includes/base.njk` | Add Intersection Observer JS; add mobile CTA bar scroll JS |
| `src/_includes/blog-post.njk` | Add reading progress bar; enforce prose max-width |
| `src/_includes/cta-section.njk` | **New file** — extracted CTA partial |
| All city/service `.njk` pages | Add `.page-hero` structure where missing; append `cta-section` include |

---

## Non-Goals

- No colour palette changes
- No font changes
- No new page types
- No redesign of individual inner page content
- No backend/CMS changes
