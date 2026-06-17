# Vullnet Nura Group — Company Website

The official marketing website for **Vullnet Nura Group (VNG)**, a commercial interior renovation contractor based in Mississauga, Ontario. A fast, zero-dependency static site built to rank in Google, get cited by AI tools, and convert property managers and developers across the Greater Toronto Area into quote requests.

---

## Table of Contents

- [What Was Built](#what-was-built)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Page Inventory](#page-inventory)
- [Blog Articles](#blog-articles)
- [CSS Architecture](#css-architecture)
- [JavaScript Features](#javascript-features)
- [SEO, AIEO & GEO](#seo-aieo--geo)
- [Schema Markup](#schema-markup)
- [Fonts](#fonts)
- [Running Locally](#running-locally)
- [Deploying](#deploying)

---

## What Was Built

A full multi-page commercial marketing website with:

- **7 core pages** (home, about, services, process, values, contact, FAQ)
- **11 service pages** (one per renovation specialty)
- **12 city/location pages** (one per GTA market)
- **4 reference/tool pages** (pricing guide, glossary, cost estimator, testimonials)
- **6 utility pages** (projects, careers, trades, privacy, terms, thank-you)
- **25 blog articles** targeting high-intent GTA commercial renovation search terms
- **RSS feed**, **XML sitemap**, **llms.txt** for AI crawler indexing
- **Netlify Forms** integration on the quote request form

---

## Tech Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Static site generator | [Eleventy (11ty) v3](https://www.11ty.dev/) | Nunjucks templates + Markdown blog posts compiled to plain HTML |
| Templating | Nunjucks | Layouts, partials, page components |
| Styling | Vanilla CSS | No framework. Custom design system via CSS custom properties |
| Interactivity | Vanilla JavaScript | No libraries. All animations and interactions hand-written |
| Hosting | [Vercel](https://vercel.com/) | Auto-deploys from `main` branch on GitHub push |
| Forms | Netlify Forms | Quote request form with spam honeypot, redirects to `/contact/thank-you/` |
| Fonts | Self-hosted WOFF2 | Inter (body) and Oswald (headings) served from `/public/fonts/` |
| Icons | Inline SVG | No icon library dependency |

**Zero runtime JavaScript dependencies.** No React, no Vue, no jQuery, no build toolchain beyond Eleventy itself.

---

## Project Structure

```
/
├── src/                        # All source files — never edit _site/ directly
│   ├── _includes/
│   │   ├── base.njk            # Root HTML shell — head, nav, footer, all global schema
│   │   ├── nav.njk             # Navigation bar partial
│   │   ├── footer.njk          # Footer partial with links and contact info
│   │   └── blog-post.njk       # Blog article layout with TOC, Article schema
│   ├── blog/
│   │   ├── index.njk           # Blog listing page
│   │   └── *.md                # 25 individual blog articles (Markdown + frontmatter)
│   ├── index.njk               # Homepage
│   ├── about.njk
│   ├── services.njk
│   ├── process.njk
│   ├── values.njk
│   ├── contact.njk
│   ├── faq.njk
│   ├── projects.njk
│   ├── testimonials.njk
│   ├── careers.njk
│   ├── trades.njk
│   ├── cost-estimator.njk
│   ├── renovation-costs-toronto.njk   # 2026 pricing reference (AIEO citation target)
│   ├── glossary.njk                   # 14-term construction glossary (DefinedTermSet schema)
│   ├── [service pages].njk            # 11 service-specific pages
│   ├── [city pages].njk               # 12 GTA city pages
│   ├── privacy.njk
│   ├── terms.njk
│   ├── thank-you.njk
│   ├── 404.njk
│   ├── sitemap.njk             # Generates /sitemap.xml
│   ├── feed.njk                # Generates RSS feed
│   └── llms.txt                # AI crawler index (AIEO/GEO)
│
├── public/                     # Static assets — copied to _site/ as-is
│   ├── css/
│   │   ├── style.css           # All styles (~900 lines, single file)
│   │   └── fonts.css           # @font-face declarations for self-hosted fonts
│   ├── js/
│   │   └── main.js             # All interactivity (~320 lines, single file)
│   ├── fonts/
│   │   ├── inter-latin.woff2
│   │   └── oswald-latin.woff2
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   ├── og-image.png            # Open Graph image (1200×630)
│   └── og-image.svg            # Source for OG image
│
├── _site/                      # Build output — auto-generated, never edit
├── .eleventy.js                # Eleventy config (passthrough copy for public/)
├── package.json
└── README.md
```

---

## Page Inventory

### Core Pages

| URL | File | Purpose |
|-----|------|---------|
| `/` | `index.njk` | Homepage: hero, services overview, comparison table, industries, stats, testimonials |
| `/about/` | `about.njk` | Company story, differentiators, credentials, social proof quotes |
| `/services/` | `services.njk` | Full service menu with $/sq ft ranges, FAQPage schema |
| `/process/` | `process.njk` | Step-by-step workflow, timeline tables, VNG vs. typical GC comparison |
| `/values/` | `values.njk` | Core values with real job-site scenarios |
| `/contact/` | `contact.njk` | Quote request form, service area grid, what-happens-next steps |
| `/faq/` | `faq.njk` | 20+ questions with FAQPage schema for Google rich results |

### Service Pages

| URL | Specialty |
|-----|-----------|
| `/office-renovation-toronto/` | Office tenant improvement |
| `/office-renovation-mississauga/` | Office TI — Mississauga market |
| `/medical-office-renovation-toronto/` | Medical/dental/clinical fit-outs |
| `/medical-office-renovation-mississauga/` | Medical — Mississauga market |
| `/restaurant-renovation-toronto/` | Restaurant and hospitality |
| `/retail-fitout-gta/` | Retail fit-outs and buildouts |
| `/pharmacy-renovation-toronto/` | Pharmacy dispensary + consultation rooms |
| `/law-office-renovation-toronto/` | Legal office interiors |
| `/bank-branch-renovation-gta/` | Bank branch and financial |
| `/daycare-renovation-ontario/` | Licensed childcare (CCEYA) |
| `/fast-track-commercial-renovation/` | Compressed-timeline urgent projects |
| `/commercial-permits-toronto/` | Permit management service |

### City Pages

| URL | Market |
|-----|--------|
| `/commercial-renovation-toronto/` | Toronto |
| `/commercial-renovation-brampton/` | Brampton |
| `/commercial-renovation-vaughan/` | Vaughan |
| `/commercial-renovation-markham/` | Markham |
| `/commercial-renovation-hamilton/` | Hamilton |
| `/commercial-renovation-oakville/` | Oakville |
| `/commercial-renovation-burlington/` | Burlington |
| `/commercial-renovation-richmond-hill/` | Richmond Hill |
| `/commercial-renovation-north-york/` | North York |
| `/commercial-renovation-etobicoke/` | Etobicoke |
| `/commercial-renovation-scarborough/` | Scarborough |
| `/office-renovation-mississauga/` | Mississauga (doubles as service + city) |

### Reference & Tool Pages

| URL | Purpose |
|-----|---------|
| `/renovation-costs-toronto/` | 2026 pricing guide with cost-per-sq-ft tables by space type — primary AIEO citation target |
| `/glossary/` | 14-term construction glossary with DefinedTermSet schema |
| `/cost-estimator/` | Interactive budget estimator tool |
| `/testimonials/` | Client reviews and social proof |
| `/projects/` | Project portfolio |

---

## Blog Articles

25 articles targeting commercial renovation search terms in the GTA:

1. How to choose a commercial renovation contractor in Toronto
2. What is tenant improvement (TI) work?
3. Commercial drywall and framing quality
4. From demo to handoff: inside a commercial renovation
5. How trade coordination works on multi-trade projects
6. Medical office renovation requirements in Ontario
7. Restaurant renovation in Toronto
8. Office renovation in the GTA — what project managers need to know
9. Retail buildout checklist
10. The real cost of a missed deadline in commercial construction
11. AODA compliance in commercial renovation (Ontario)
12. Tenant improvement allowance guide (Ontario)
13. Office renovation cost Toronto 2026
14. Restaurant kitchen layout for commercial buildouts
15. WSIB and insurance — what to ask your commercial contractor
16. Commercial renovation permit guide (Ontario)
17. How long does a commercial renovation permit take in Toronto?
18. Why commercial renovations go over budget
19. Open office vs. private office renovation cost comparison
20. Industrial office buildout in Ontario
21. Commercial flooring options for office renovation
22. Dental office renovation guide (Ontario)
23. Commercial renovation in an occupied building
24. How to read a commercial construction quote
25. Commercial renovation scope of work and contract guide

Each post targets a specific long-tail keyword, includes an in-article CTA linking to `/contact/` or the relevant service page, and is structured with an `Article` + `BreadcrumbList` JSON-LD schema.

---

## CSS Architecture

Single file: `public/css/style.css`

### Design Tokens (CSS Custom Properties)

```css
:root {
  --red:   #d83030;   /* brand accent */
  --dark:  #1a1a1a;   /* primary background */
  --dark2: #292929;   /* secondary background */
  --pure:  #fff;
  --white: #fafafa;
  --gray1: #5B5B5B;
  --gray2: #A0A0A0;
  --gray3: #DBDBDB;
}
```

### Typography

- **Headings / display**: Oswald (self-hosted WOFF2) — uppercase, tracked, 600 weight
- **Body**: Inter (self-hosted WOFF2) — `-webkit-font-smoothing: antialiased`

### Responsive Breakpoints

| Breakpoint | Target |
|------------|--------|
| `1024px` | Tablet — collapse nav, adjust grid layouts |
| `768px` | Mobile — burger menu, single-column layout |
| `700px` | Narrow mobile adjustments |
| `640px` | Hero and section spacing compression |
| `580px` | Card grid and form layout changes |
| `480px` | Minimum viewport — smallest font and spacing overrides |

Special media queries:
- `@media (hover: none)` — disables hover transforms on touch devices
- `@media (pointer: fine)` — enables custom cursor (mouse only)

### Animation Classes

Scroll-triggered via `IntersectionObserver` in `main.js`:

| Class | Effect |
|-------|--------|
| `.r` | Fade up (opacity 0→1, translateY 20px→0) |
| `.r-left` | Slide in from left |
| `.r-right` | Slide in from right |
| `.r-scale` | Scale in (0.95→1) |
| `.cx-blur` | Blur in (blur 8px→0) |
| `.stagger` | Child elements animate in sequence with 80ms delay |
| `.cx-stats` | Counter animation triggered on enter |

### Key Components

- **`.cx-container`** — max-width 1200px, auto horizontal margins, fluid padding
- **`.cx-section`** — consistent vertical padding via `clamp()`
- **`.btn-red`** — primary CTA button with magnetic hover effect (desktop)
- **`.cx-spotlight`** — section with mouse-tracking radial glow (desktop)
- **`.cx-problem-card`, `.cx-city-item`, `.cx-trust-item`** — reusable content cards

### Mobile Features

- **Burger menu** — animated 3-line to X, body scroll lock when open
- **Fixed mobile CTA bar** — 60px bar pinned to bottom viewport with Call and Get a Quote buttons
- **Back-to-top button** — appears after 400px scroll, positioned above mobile CTA bar

### Desktop-Only Features

- **Custom cursor ring** — 40px ring follows mouse with lerp (linear interpolation) lag
- **Scroll progress bar** — 2px red bar at top of viewport
- **Sticky phone tab** — appears at left edge after 50% page scroll
- **Spotlight glow** — radial gradient follows cursor on `.cx-spotlight` sections
- **Magnetic CTA buttons** — `.btn-red` elements repel/attract on hover

---

## JavaScript Features

Single file: `public/js/main.js` (~320 lines, no dependencies)

| Feature | Implementation |
|---------|---------------|
| Scroll reveal animations | `IntersectionObserver` on `.r`, `.r-left`, `.r-right`, `.r-scale`, `.cx-blur` |
| Staggered child animations | `querySelectorAll` on `.stagger` children with 80ms index offset |
| Counter animation | `requestAnimationFrame` easing on `.cx-stats` stat numbers |
| Custom cursor | `mousemove` + lerp loop via `requestAnimationFrame` |
| Spotlight glow | `mousemove` on `.cx-spotlight` updating `--mx`/`--my` CSS vars |
| Magnetic buttons | `mousemove`/`mouseleave` on `.btn-red` with `transform: translate()` |
| Nav scroll state | `scroll` listener adds `.scrolled` class at 10px for frosted-glass effect |
| Burger menu | Toggle `.open` class, `overflow:hidden` on body, close on outside click |
| Mobile CTA bar | Always visible on touch devices, hides on desktop |
| Back-to-top button | Appears at 400px scroll, smooth scroll to top |
| Sticky phone tab | Appears after 50% page scroll on desktop |
| Before/After slider | Drag handle on project comparison images |
| Blog TOC | Auto-generated from `h2` headings with scroll-spy active state |
| Copy link button | `navigator.clipboard.writeText` with confirmation flash |
| Project lightbox | Click to enlarge project images with keyboard close |
| FAQ accordion | Toggle `aria-expanded` + max-height animation |

---

## SEO, AIEO & GEO

### Traditional SEO

- Unique `<title>` (≤60 chars) and `<meta description>` on every page
- `<meta name="keywords">` on all service and city pages
- Canonical URL on every page
- Open Graph (`og:title`, `og:description`, `og:image`, `og:url`) on every page
- Twitter Card tags on every page
- XML sitemap at `/sitemap.xml` (auto-generated by Eleventy)
- RSS feed at `/feed.xml`
- `robots.txt` — standard crawl with sitemap reference
- Image `width` and `height` attributes on all images (prevents CLS)
- WOFF2 font preload hints in `<head>` (improves LCP)

### AIEO & GEO (AI Engine Optimization / Generative Engine Optimization)

- **`/llms.txt`** — structured plain-text index following the llms.txt standard. Contains company summary, all service descriptions, key facts, pricing ranges, permit timelines, all page URLs, and 12 Q&A pairs in the format AI citation engines prefer
- **`/renovation-costs-toronto/`** — the primary AIEO citation target. Contains pricing tables by space type and finish level, project size estimates, permit cost breakdown, and a visible FAQ section. This is the page AI models should cite when answering "how much does commercial renovation cost in Toronto?"
- **`/glossary/`** — 14-term construction glossary with `DefinedTermSet` + `DefinedTerm` schema. Structured for AI definitional queries (e.g. "what is a TI in construction?")

---

## Schema Markup

JSON-LD structured data on every page and page type:

| Schema Type | Where Applied |
|-------------|--------------|
| `LocalBusiness` + `GeneralContractor` | Sitewide in `base.njk` — includes address, geo coordinates, service area, opening hours, WSIB/insurance credentials, employee count, payment methods |
| `FAQPage` | Services page, Process page, FAQ page, renovation costs page |
| `ContactPage` | Contact page |
| `Article` + `BreadcrumbList` | Every blog post via `blog-post.njk` — includes `mainEntityOfPage`, `speakable`, `about`, publisher logo |
| `DefinedTermSet` + `DefinedTerm` | Glossary page — 14 construction terms |
| `WebPage` | All city and service pages |

The sitewide `LocalBusiness` schema includes:
```json
"hasCredential": [
  { "credentialCategory": "WSIB Clearance Certificate" },
  { "credentialCategory": "Commercial General Liability Insurance", "description": "$5M CGL" }
],
"numberOfEmployees": { "minValue": 15, "maxValue": 50 },
"paymentAccepted": "Cheque, EFT, Wire Transfer",
"currenciesAccepted": "CAD"
```

---

## Fonts

Both fonts are self-hosted as WOFF2 files in `/public/fonts/` — no external font requests, no FOUT, no privacy leakage to Google Fonts.

| Font | File | Used for |
|------|------|----------|
| Inter | `inter-latin.woff2` | Body text, UI elements |
| Oswald | `oswald-latin.woff2` | Headings, stats, display text |

Declared in `public/css/fonts.css` and preloaded in `base.njk`:
```html
<link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/oswald-latin.woff2" as="font" type="font/woff2" crossorigin>
```

---

## Running Locally

```bash
# Install Eleventy
npm install

# Build once
npm run build

# Build and serve with live reload
npm run dev
```

Then open `http://localhost:8080` in your browser.

The dev server watches `src/` and `public/` and rebuilds on any file change.

---

## Deploying

Push to the `main` branch on GitHub. Vercel picks it up automatically and deploys within ~30 seconds. No manual steps required.

Vercel is configured to serve the `_site/` output directory.

---

## Contact

Built for: **Vullnet Nura Group**
Phone: (289) 339-6697
Email: info@vullnetnuragroup.com
Address: Suite 700, 2 Robert Speck Pkwy, Mississauga, ON
Service area: Toronto, Mississauga, Brampton, Vaughan, Markham, Oakville, Burlington, Hamilton, Etobicoke, Scarborough, North York, Richmond Hill
