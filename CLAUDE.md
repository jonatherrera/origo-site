# CLAUDE.md

This file provides guidance to Claude Code when working with the Origo site repository.

---

## Project Overview

Origo (origo.ooo) is a boutique digital presence agency based in Texas. This is a static HTML/CSS/JS site with no framework, no build step, and no page builder. Hosted on Cloudways. Version-controlled via GitHub.

---

## Stack

- HTML5 / CSS3 / Vanilla JavaScript — no framework, no build step
- Google Fonts: Poppins (400, 500, 600, 700) + Roboto (400, 500)
- Deployment: push to GitHub (main branch) → Cloudways pulls automatically
- Development branch: dev | Production branch: main

---

## File Structure

```
index.html                          Homepage (StoryBrand 8-section arc)
css/styles.css                      Full design system — variables, components, layout, responsive
js/main.js                          Mobile nav, scroll reveal, nav scroll state, footer year
favicon.svg / favicon.ico / favicon-192.png

services/
  index.html                        Services overview
  services.css                      Services-specific styles
  branding/index.html
  web-design/index.html
  seo-aeo/index.html
  copywriting/index.html
  website-concierge/index.html
  app-development/index.html

work/
  branding/index.html
  branding/branding.css
  case-studies/index.html
  case-studies/case-studies.css
  case-studies/groomers-seafood/index.html
  case-studies/redemption-hill/index.html

contact/
  index.html
  contact.css

team/
  index.html
  team.css

faq/index.html
glossary/index.html
accessibility/index.html
sitemap.xml
```

---

## Design System

### CSS Custom Properties (defined in css/styles.css)

```css
/* Colors */
--color-black:      #0A0A0A;
--color-white:      #FFFFFF;
--color-blue:       #0066FF;
--color-blue-hover: #0052CC;
--color-gray-light: #F7F7F7;
--color-gray-dark:  #2B2B2B;
--color-border:     rgba(0, 0, 0, 0.08);

/* Typography */
--font-head: 'Poppins', sans-serif;
--font-body: 'Roboto', sans-serif;

/* Spacing */
--section-pad:    96px;
--section-pad-sm: 64px;
--container:      1200px;
--container-pad:  24px;

/* Radius */
--radius:    5px;
--radius-sm: 4px;

/* Transition */
--ease: 0.6s ease;
```

### Typography Classes

- `.t-label` — Poppins 400, 11px, 0.14em tracking, uppercase, Electric Blue
- `.t-label--muted` — same as above, Dark Gray at 50% opacity
- `h1 / .t-h1` — Poppins 700, clamp(36px, 4.5vw, 52px), line-height 1.12, -0.02em tracking
- Always use CSS variables, never hardcode color or font values

### Dark Mode

Dark mode is implemented via `[data-theme="dark"]` on the root element.

```css
/* Dark mode color values */
background:   #0A0A0A
secondary bg: #161618
text:         #F5F5F7
body text:    #B5B5BD
borders:      rgba(255, 255, 255, 0.08)
blue:         #0066FF (unchanged)
```

Light mode and dark mode only. No third theme. Do not add any other theme.

---

## Brand Standards

- Design inspired by clay.global — bold typography, flat, high contrast, generous whitespace
- Agency type: "boutique digital presence agency" — never change this phrasing
- AI positioning: woven in naturally ("Not cheaper. Better."), never the headline
- Social media is NOT a service — do not add it to any service listing
- Founder name: Jon (not Jonathan)
- Location: Texas (not Austin specifically)
- Tagline: "Build trust. Own your presence."
- Core value: trust

### StoryBrand Rules

- Origo is always the guide, never the hero
- The client is always the hero
- All copy follows: problem → stakes → guide → plan → CTA structure
- Never position Origo as the focus — the client's transformation is the focus

---

## Primary CTA

All "Book a call" / "Book a discovery call" buttons and links:
`https://api.gohighlevelfor19.com/widget/groups/jonathans-calendar`

Never change this URL. Never use a different booking link.

---

## Coding Standards

### HTML

- Semantic HTML5 elements throughout (section, nav, main, footer, article, aside)
- Every page includes: correct meta title, meta description, canonical tag, og tags
- AEO: FAQ sections use proper schema-ready structure
- JSON-LD schema blocks go in the page head or immediately before closing body tag
- 301 redirects required for any old URLs on redesigns — document in sitemap.xml

### CSS

- All styles use CSS custom properties — never hardcode values
- Mobile-first responsive design
- Section padding uses --section-pad and --section-pad-sm variables
- Container max-width uses --container variable with --container-pad for gutters
- No inline styles
- Page-specific styles go in a separate CSS file in that page's directory (e.g. contact/contact.css)
- Global styles only go in css/styles.css

### JavaScript

- Vanilla JS only — no libraries, no frameworks
- All JS goes in js/main.js unless page-specific
- Keep functions small and named clearly
- No jQuery

### General

- Show before delivering — always preview or describe the change before applying it
- Complete sequential steps — never skip a step
- Flag architecture implications before recommending an approach
- Never reference tools, paths, or files not actually in the project

---

## Deployment Workflow

1. Make changes locally in Claude Code
2. Test in browser
3. Commit to dev branch
4. Push to GitHub: `git push origin dev`
5. Merge dev into main when ready: `git checkout main && git merge dev && git push origin main`
6. Cloudways automatically pulls from main

Never push untested code directly to main.

---

## Repository

- Remote: git@github.com:jonatherrera/origo-site.git
- Default branch: main
- Development branch: dev

---

## Blog

Blog posts live at origo.ooo/blog/[post-slug]/index.html
Each post includes: SEO title tag, meta description, JSON-LD FAQ schema, AEO-optimized FAQ section.
Audio option planned: /assets/audio/[post-slug].mp3 via ElevenLabs (not yet implemented).

---

## Key Decisions — Do Not Override

- No frameworks, no build tools, no page builders — ever
- No headless WordPress for this project
- Light and dark mode only — no third theme
- Social media is not a service
- Jon, not Jonathan
- Texas, not Austin
- StoryBrand architecture on all pages
- Electric Blue #0066FF is never changed in dark mode
