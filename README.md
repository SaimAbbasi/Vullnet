# Vullnet Nura Group — Company Website

This is the official website for **Vullnet Nura Group (VNG)**, a commercial interior renovation contractor based in Mississauga, Ontario. The site is a fast, SEO-optimized marketing website built to attract and convert property managers, landlords, and developers across the Greater Toronto Area.

## What Was Built

A full multi-page marketing website with six core pages plus a blog, deployed on Vercel and auto-publishing on every GitHub push.

### Pages

| Page | Purpose |
|------|---------|
| **Home** | Hero, services overview, comparison table, industries served, client proof quotes |
| **About** | Company story, what makes VNG different, credentials (WSIB, insurance, permits) |
| **Services** | Detailed service descriptions, cost guide ($/sq ft by project type), FAQ |
| **Values** | Core values with real job-site scenarios showing what each value looks like in practice |
| **Process** | Step-by-step workflow, typical project timelines by type, VNG vs. typical GC comparison |
| **Contact** | Quote request form, service area grid, what happens after you submit |
| **Blog** | 10 articles targeting commercial renovation search terms in the GTA |

### Blog Articles

- How to choose a commercial renovation contractor in Toronto
- What is tenant improvement (TI) work?
- Commercial drywall and framing quality
- From demo to handoff: inside a commercial renovation
- How trade coordination works on multi-trade projects
- Medical office renovation requirements
- Restaurant renovation in Toronto
- Office renovation in the GTA — what project managers need to know
- Retail buildout checklist
- The real cost of a missed deadline in commercial construction

## Tech Stack

- **[Eleventy (11ty)](https://www.11ty.dev/)** — static site generator. Takes Nunjucks templates and Markdown files and builds plain HTML
- **Nunjucks** — templating language used for layouts and page components
- **Vanilla CSS** — no frameworks, custom design with CSS custom properties
- **Vanilla JavaScript** — no libraries, handles animations and interactivity
- **[Vercel](https://vercel.com/)** — hosting and deployment. Auto-deploys on every push to the `main` branch on GitHub
- **Google Fonts** — Inter (body) and Oswald (headings)

## How It Works

```
src/          ← all source files (pages, templates, blog posts)
public/       ← CSS, JS, and any static assets
_site/        ← built output (auto-generated, not edited directly)
```

When you run `npm run build`, Eleventy reads everything in `src/` and outputs finished HTML files into `_site/`. Vercel serves the `_site/` folder.

## Running Locally

```bash
npm install
npm run build
```

To run with live reload during development:

```bash
npx @11ty/eleventy --serve
```

Then open `http://localhost:8080` in your browser.

## Deploying

Push to the `main` branch on GitHub. Vercel picks it up automatically and deploys within about 30 seconds. No manual steps required.

## SEO Features

- Unique title and meta description on every page
- LocalBusiness + GeneralContractor structured data (JSON-LD) on every page
- FAQPage structured data on Services and Process pages for rich results in Google
- Canonical URLs, Open Graph tags, and Twitter Card tags on every page
- Sitemap at `/sitemap.xml`
- Blog articles targeting high-intent commercial renovation search terms in the GTA

## Design Features

- Custom animated cursor ring with lag effect (desktop only)
- Scroll progress bar at the top of the page
- Scroll-triggered reveal animations on every section
- Mouse-tracking spotlight glow on key home page sections
- Counter animations on stat numbers
- Parallax effects on hero accents and floating graphics
- FAQ accordion
- Responsive — works on mobile, tablet, and desktop

## Contact

Site built for: **Vullnet Nura Group**
Email: info@vullnetnuragroup.com
Service area: Toronto, Mississauga, Brampton, Vaughan, Markham, Oakville, Burlington, Hamilton, and surrounding GTA
