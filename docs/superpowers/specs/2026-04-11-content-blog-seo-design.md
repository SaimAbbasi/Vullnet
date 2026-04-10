# VNG Content Depth, Blog & SEO Design

**Goal:** Add deep marketing content to every page, build a 10-post blog using Eleventy collections, add minor CSS/JS animations, and strengthen on-page SEO — all from scratch with compelling copy for a GTA commercial renovation contractor.

**Architecture:** Eleventy Markdown collections for the blog (`src/blog/*.md`), a shared `blog-post.njk` layout, and a `blog.njk` listing page. All 6 existing pages get expanded with new sections added directly to their `.njk` files. Animations extend the existing CSS/JS framework (no new libraries). SEO improvements are applied to `base.njk` conditionally via frontmatter.

**Tech Stack:** Eleventy 3, Nunjucks, vanilla CSS (existing `style.css`), vanilla JS (existing `main.js`), Markdown for blog posts.

---

## 1. File Structure

### New files
- `src/blog/` — directory for 10 Markdown blog posts
- `src/blog/index.njk` — blog listing page at `/blog/`
- `src/_includes/blog-post.njk` — layout for individual blog posts
- Each post: `src/blog/<slug>.md`

### Modified files
- `src/index.njk` — add Why VNG strip, industries grid, quote carousel, blog preview strip
- `src/about.njk` — add founder story, milestone timeline, counter-positioning, culture section
- `src/services.njk` — expand service cards, add industries grid, add FAQ accordion
- `src/values.njk` — add manifesto statement, value scenarios, stats bar
- `src/process.njk` — expand step details, add callout boxes, add FAQ, add timeline reference
- `src/contact.njk` — replace mailto CTA with real HTML form, add service area section, response promise
- `src/_includes/base.njk` — improve title/meta patterns, add conditional FAQPage/Article/BreadcrumbList JSON-LD
- `public/css/style.css` — add styles for blog cards, FAQ accordion, quote carousel, typewriter, blog post layout, new page sections
- `public/js/main.js` — add FAQ accordion logic, quote carousel, typewriter effect, extended counter trigger
- `src/sitemap.njk` — verify blog posts are included via collection output

---

## 2. Page Content

### Home (`/`)
Sections to add after the existing CTA:

**Why VNG Strip** — 3 differentiators in a horizontal 3-column layout:
- "Mid-market sweet spot" — systems of a large firm, speed of a specialist crew
- "One throat to choke" — all trades under one contract, no finger-pointing
- "Deadline is non-negotiable" — we scale crew and hours before we miss a date

**Industries Served Grid** — 6 tiles in a 3×2 grid with bold label + one-line description:
- Office & Corporate, Retail & Showroom, Restaurant & Hospitality, Medical & Clinical, Industrial & Warehouse, Educational & Institutional

**Quote Carousel** — 3 rotating testimonial-style quotes (auto-rotate 5s, fade transition, manual dots):
1. "VNG was the first contractor in ten years who actually called us before a problem became a delay."
2. "They finished three days early on a 6-week office gut. I've never written a reference letter faster."
3. "When our GC pulled out two weeks before handover, VNG stepped in and hit the original date."

**Blog Preview Strip** — heading "From the Field", 3 latest blog posts as cards (title, excerpt, read time, link), link to `/blog/`

### About (`/about`)
Sections to add:

**Founder Story** — 2-paragraph origin narrative: started as a crew foreman, saw how projects failed not from bad tradespeople but from bad coordination, built VNG around the idea that execution is a system not a personality.

**Milestone Timeline** — horizontal or vertical timeline, 4 nodes:
- 2012 — First project, downtown Toronto office strip-out
- 2016 — Crossed 100 completed projects, expanded to full-scope execution
- 2020 — 500 projects delivered across the GTA
- 2024 — 1000+ projects, active in all major Ontario markets

**Counter-Positioning Section** — "Who we are not" — 3 contrasts in a grid:
- Not a big-box firm (you won't get handed to a junior PM and forgotten)
- Not a solo operator (we have the bench depth to scale when your timeline demands it)
- Not a generalist (we do commercial interiors, full stop — no residential side hustles)

**Culture Section** — 3 role cards (Foreman, Project Coordinator, Estimator) with a one-line philosophy each. Generic roles, no real names needed.

### Services (`/services`)
Expand each of the 5 existing service cards into a full panel with:
- A 2-sentence expanded description
- 4–5 bullet "what's included" items
- One differentiator callout ("Why it matters with VNG")

**Service expansions:**

01 Demolition:
- Included: Full strip-out, selective demo, hazmat coordination, debris removal, site protection
- Differentiator: We have never left a site dirty at end of day. That is not a policy, it is a habit.

02 Walls & Ceilings:
- Included: Steel stud framing, drywall hang/tape/mud, T-bar ceiling systems, bulkheads, acoustic panels
- Differentiator: Our taping crews are in-house, not subbed. That means schedule control and finish consistency.

03 Finishing:
- Included: Painting (all sheens), trim and base, LVP/tile/carpet flooring, caulking, touch-up sign-off
- Differentiator: We do not call a project done until the client walks it. Punch lists get closed, not carried.

04 Millwork & Install:
- Included: Custom cabinetry, reception desks, shelving, fixtures, built-in units, hardware installation
- Differentiator: We measure twice. Every piece is verified against drawings before fabrication begins.

05 Trade Coordination & Scaling:
- Included: Electrical coordination, plumbing tie-ins, HVAC scheduling, weekend/extended shifts, surge crew deployment
- Differentiator: We own the schedule. If a trade slips, we adjust the sequence rather than let a delay compound.

**Industries Grid** (same 6 as home page)

**FAQ Accordion** — 5 questions:
1. Do you work weekends and evenings to meet tight deadlines? → Yes. We build shift flexibility into every project plan upfront. Weekend pushes are standard, not an exception.
2. How do you handle scope changes mid-project? → With a written change order, a revised timeline, and a clear cost impact before any work changes. No surprises, no verbal agreements.
3. Do you self-perform all trades or subcontract? → We self-perform demolition, framing, drywall, and finishing. Mechanical, electrical, and plumbing are coordinated through vetted trade partners we have worked with for years.
4. What size of project is VNG built for? → We are most effective on projects between $50K and $2M. Large enough to need real coordination, small enough that you still get our full attention.
5. Are you insured and WSIB compliant? → Yes. Full general liability, WSIB in good standing, and documentation available on request before contract signing.

### Values (`/values`)
Sections to add:

**Manifesto Statement** — large typographic section, dark background:
"Most contractors measure success by whether they got paid. We measure it by whether we would take the call again."

**Value Scenarios** ("What this looks like on site") — below each value card, add a 2-sentence real-world scenario:
- Accountability: "It is 9pm Wednesday and we are 18 hours behind. We call a crew in for Thursday at 6am before the PM even asks."
- Transparency: "The tile delivery is delayed three days. We tell you Thursday morning, not Sunday night."
- Excellence: "The finish on the accent wall is 90%. We sand it and redo it. No one asked us to."
- Reliability: "We said we would be on site at 7am. We are there at 6:45."

**Stats Bar** — 3 animated counters:
- 1000+ Projects Delivered
- 10+ Years Operating
- 100% Deadline-focused (displayed as a statement, not a counter)

### Process (`/process`)
Sections to add:

**Expanded step details** — each step gets a sub-list of 3–4 specifics:
- Step 01 Scope & Quote: site walkthrough, written scope document, itemized line-item quote, clarification call
- Step 02 Plan & Schedule: trade schedule matrix, milestone calendar, risk log, your review and sign-off
- Step 03 Execute & Update: daily site log, weekly progress summary, issue escalation within 2 hours, photo documentation
- Step 04 Deliver & Close: final walkthrough, punch list closed before handover, as-built documentation, 30-day follow-up call

**Callout boxes** — one per step, a bold one-liner:
- "You will never be surprised by a cost. If something changes, you hear about it first."
- "Every trade knows the schedule before they set foot on site."
- "You get a status report whether you ask for one or not."
- "We don't call a job closed until you do."

**Typical Timeline Reference Strip** — 4 horizontal blocks: Week 1 (Scope), Week 2 (Plan), Weeks 3–N (Execute), Final Week (Close). Labels adjust for project size note.

**FAQ Accordion** — 5 questions:
1. How long does a typical commercial renovation take? → Depends on scope. A 2,000 sq ft office fit-out typically runs 4–6 weeks. Larger multi-trade projects can run 8–16 weeks. We give you a realistic timeline in writing before work starts.
2. What happens if you fall behind schedule? → We do not wait for permission to recover. We add crew, extend hours, and resequence trades. You hear about the problem and the recovery plan at the same time.
3. Can we phase the work to stay operational? → Yes. Phased execution is something we plan for upfront. We have managed live-operational renovations in occupied buildings.
4. How involved do we need to be during construction? → As much or as little as you want. We handle day-to-day trade management. We need your input on approvals and change orders, nothing else unless you want it.
5. Do you pull permits? → We advise on permit requirements and coordinate with the GC or owner as needed. Permit responsibility is defined in the contract scope.

### Contact (`/contact`)
Replace the existing section with:

**Form** — fields: Full Name (text), Company (text), Email (email, required), Phone (tel), Project Type (select: Office Renovation, Retail Buildout, Restaurant Renovation, Medical Office, Industrial, Other), Estimated Budget (select: Under $50K, $50K–$150K, $150K–$500K, $500K+, Not Sure), Message (textarea), Submit button. Form uses `action="https://formspree.io/f/placeholder"` method="POST" — user replaces with real Formspree endpoint.

**Service Area Section** — text block: Greater Toronto Area including Toronto, Mississauga, Brampton, Vaughan, Markham, Richmond Hill, Oakville, Burlington, Hamilton, and surrounding Ontario markets.

**Response Promise** — callout box: "We respond to every inquiry within one business day. If your project is urgent, say so in your message — we will get back to you the same day."

**Contact Details** — email link, note about no walk-ins (site-based work only).

---

## 3. Blog

### Architecture
- `src/blog/*.md` — 10 Markdown files with frontmatter
- Frontmatter fields: `title`, `description`, `date`, `slug`, `tags: [blog]`, `readTime`
- `src/blog/index.njk` — listing page, uses `collections.blog` sorted by date descending, displays title, excerpt (first 160 chars of description), read time, date, link
- `src/_includes/blog-post.njk` — post layout with: headline, date + read time meta, body content, "Further reading" links (2 internal links to services/pages), CTA block at bottom

### Eleventy Config
Add to `.eleventy.js`:
```js
eleventyConfig.addCollection("blog", col =>
  col.getFilteredByTag("blog").sort((a,b) => b.date - a.date)
);
```

### 10 Blog Posts

**Post 1** — `how-to-choose-commercial-renovation-contractor-toronto.md`
- Title: How to Choose a Commercial Renovation Contractor in Toronto
- Description: The 7 questions every project manager should ask before signing a contract — and the red flags that tell you to walk away.
- ~700 words. Sections: Why this decision matters more than cost, 7 questions to ask (experience with your project type, self-perform vs. subcontract ratio, how they handle delays, insurance/WSIB, references from similar scope, how they communicate, what the contract covers), 3 red flags (no written scope, vague timeline, no change order process), CTA.

**Post 2** — `office-renovation-gta-what-project-managers-need-to-know.md`
- Title: Office Renovation in the GTA: What Project Managers Need to Know
- Description: From phased occupancy to trade sequencing — a practical guide for PMs managing their first commercial office fit-out.
- ~700 words. Sections: What makes office renovations different, the phasing question (occupied vs. vacant), trades involved and their sequence, where most projects go wrong (late millwork, MEP surprises, finish delays), what to demand from your contractor, CTA.

**Post 3** — `real-cost-missed-deadline-commercial-construction.md`
- Title: The Real Cost of a Missed Deadline in Commercial Construction
- Description: It's not just the contractor's problem. Here's what a delayed commercial renovation actually costs the building owner, tenant, and PM.
- ~650 words. Sections: The obvious costs (holdover rent, delayed opening revenue), the hidden costs (PM credibility, tenant relationship, re-mobilization fees), why most delays are avoidable, what a deadline-first contractor actually does differently, CTA.

**Post 4** — `what-is-tenant-improvement-work.md`
- Title: What Is Tenant Improvement Work and Who Manages It?
- Description: TI explained for building owners and commercial tenants — who pays, who manages, and what a good TI contractor actually delivers.
- ~650 words. Sections: Definition of TI, who funds TI (landlord allowance vs. tenant-funded), who hires the contractor, scope of typical TI work, what separates a good TI contractor from a bad one, CTA.

**Post 5** — `commercial-drywall-why-framing-quality-determines-your-finish.md`
- Title: Commercial Drywall: Why Framing Quality Determines Your Finish
- Description: Most finish problems start at framing. Here's what in-house drywall crews do differently — and why it matters for your handover date.
- ~600 words. Sections: The drywall chain (framing → hang → tape → finish), where subbed-out crews cut corners, what in-house crews do differently, how to evaluate framing quality on a walkthrough, CTA.

**Post 6** — `restaurant-renovation-toronto-scope-timeline.md`
- Title: Restaurant Renovation in Toronto: Scope, Timeline, What to Expect
- Description: Restaurant renovations are one of the most demanding commercial scopes. Here's what makes them different and how to keep them on track.
- ~700 words. Sections: Why restaurants are harder (MEP density, health code, tight timelines), typical scope breakdown, permit considerations, how to phase a renovation around an operating kitchen, what to demand from your contractor, CTA.

**Post 7** — `retail-buildout-checklist-12-things-your-contractor-should-handle.md`
- Title: Retail Buildout Checklist: 12 Things Your Contractor Should Handle
- Description: A practical checklist for retail tenants and landlords preparing for a commercial buildout — covering scope, coordination, and handover.
- ~650 words. Format: numbered list of 12 items covering: site protection, demo, framing, MEP rough-in, drywall, ceiling, flooring, storefront/glazing coordination, millwork, paint, signage blocking, punch list. Intro and outro paragraphs around the list. CTA.

**Post 8** — `how-trade-coordination-works-multi-scope-project.md`
- Title: How Trade Coordination Actually Works on a Multi-Scope Commercial Project
- Description: When five trades are on site at once, someone has to own the schedule. Here's what real trade coordination looks like — and what it costs you when it's missing.
- ~700 words. Sections: What trade coordination actually is (not just scheduling — sequencing, conflict resolution, acceleration), what happens without it (domino delays), the sequence that works (demo → rough framing → MEP rough → drywall → MEP trim → finishing → millwork), what to ask your contractor about coordination capacity, CTA.

**Post 9** — `medical-office-renovation-what-is-different.md`
- Title: Medical Office Renovation: What's Different and Why It Matters
- Description: Medical and clinical renovations have requirements that most commercial contractors aren't built for. Here's what to look for before you hire.
- ~650 words. Sections: What makes medical different (infection control, HVAC requirements, plumbing density, accessibility standards, phasing around patients), common mistakes contractors make, what to ask before hiring, CTA.

**Post 10** — `from-demo-to-handoff-inside-commercial-reno-vng.md`
- Title: From Demo to Handoff: Inside a Commercial Renovation with VNG
- Description: A week-by-week walkthrough of how VNG executes a mid-size commercial interior renovation — from site visit to final sign-off.
- ~700 words. Narrative walkthrough using a fictional 3,500 sq ft office renovation as the example. Follows the 4-step process: scope/quote week, plan/schedule week, 5-week execution (demo, framing, MEP, drywall, finishing, millwork), handover week. Honest about what can go wrong and how VNG handles it. CTA.

---

## 4. Animations

All vanilla CSS/JS, no new libraries. `prefers-reduced-motion` respected throughout.

### CSS additions (`style.css`)
- `.faq-item` — border-bottom separated items, cursor pointer
- `.faq-answer` — `max-height: 0; overflow: hidden; transition: max-height .35s ease`
- `.faq-item.open .faq-answer` — `max-height: 400px`
- `.faq-chevron` — SVG icon, `transition: transform .3s`, `.open .faq-chevron { transform: rotate(180deg) }`
- `.blog-card` — dark card with red left border on hover, `transition: transform .25s, border-color .25s`, `:hover { transform: translateY(-4px) }`
- `.quote-carousel` — position relative, overflow hidden
- `.quote-slide` — `position: absolute; opacity: 0; transition: opacity .6s`, `.active { opacity: 1; position: relative }`
- `.typewriter` — `overflow: hidden; border-right: 2px solid var(--red); white-space: nowrap; animation: typing Xs steps(N) forwards, blink-cursor .75s infinite`
- `@keyframes typing { from { width: 0 } to { width: 100% } }`
- `.stat-bar` — flexbox row of 3 stat blocks, large Oswald number with counter JS hook
- `.milestone-timeline` — vertical timeline with red dot connectors
- `.industries-grid` — 3×2 grid, dark cards, red top-border accent on hover
- `.blog-post-body` — prose styles: `line-height: 1.85`, heading sizes, `a { color: var(--red) }`, `blockquote` left-border style
- `.breadcrumb` — small gray nav above post title
- `.post-meta` — date + read time in gray, small caps
- `.further-reading` — dark card section at post bottom with 2 internal links
- `.contact-form` — styled inputs/selects/textarea matching dark theme, red focus ring, full-width submit button

### JS additions (`main.js`)
- **FAQ accordion** — `querySelectorAll('.faq-item')`, click toggles `.open`, closes others in same group
- **Quote carousel** — array of slide elements, `setInterval(5000)` advances index, wraps around, updates `.active`
- **Typewriter** — detects `.typewriter` element, reads `data-text` attribute, appends characters via `setInterval(50ms)`, fires on page load
- **Extended counter** — existing counter logic reused; triggered by IntersectionObserver on `.stat-bar .num` elements (not just hero stats)

---

## 5. SEO

### `base.njk` changes
- Title pattern: `{{ title }} | Vullnet Nura Group` — already correct, ensure `h1` exists on every page
- Add conditional `FAQPage` JSON-LD block: rendered when frontmatter `hasFaq: true`, with hardcoded Q&A matching the FAQ accordion on that page
- Add conditional `Article` JSON-LD block: rendered when `layout == 'blog-post.njk'`, uses post frontmatter for headline, datePublished, description
- Add conditional `BreadcrumbList` JSON-LD: rendered on blog posts — `Home > Blog > Post Title`
- Add `og:type = article` and `article:published_time` for blog posts

### Per-page frontmatter improvements
| Page | New title | New description |
|------|-----------|-----------------|
| Home | When We Start, We Finish \| Vullnet Nura Group | Ontario's deadline-first commercial interior contractor. 1000+ projects delivered on time and on budget across the GTA. |
| About | Commercial Renovation Contractor Toronto \| About VNG | Mid-market execution power with specialist speed. Learn how Vullnet Nura Group delivers for commercial PMs across Ontario. |
| Services | Commercial Interior Services Toronto \| Vullnet Nura Group | Demolition, framing, drywall, finishing, millwork, and trade coordination. Full-scope commercial renovation across the GTA. |
| Values | Our Values \| Vullnet Nura Group | Accountability, transparency, excellence, reliability. The four principles behind every VNG commercial renovation project. |
| Process | How We Work \| Vullnet Nura Group | From scope to handover in four clear steps. Zero surprises, full documentation, and a deadline we treat as our own. |
| Contact | Get a Quote \| Vullnet Nura Group | Tell us about your commercial renovation project. We respond within one business day with a clear scope and honest timeline. |
| Blog | Commercial Renovation Insights \| VNG Blog | Practical guides for project managers and building owners navigating commercial renovations across Ontario. |

### `services.njk` and `process.njk` frontmatter
Add `hasFaq: true` to trigger `FAQPage` JSON-LD in `base.njk`.

### `sitemap.njk`
No changes needed — Eleventy automatically adds blog post URLs via collection output as long as they have `permalink` in frontmatter or are in a tagged collection.
