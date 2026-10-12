# Jamun Labz — Company Website

The official website of **Jamun Labz FZC**, a boutique business and technology consulting firm based in the United Arab Emirates.

**Live site:** https://jamunlabz.com
**Tagline:** Business First. Technology That Fits.

This is a hand-built static website: plain HTML, CSS and JavaScript. There is no framework, no build step and no `npm install`. The site is hosted on **Cloudflare Pages**.

---

## Table of contents

1. [Pages](#pages)
2. [Project structure](#project-structure)
3. [Running the site locally](#running-the-site-locally)
4. [How links work (important)](#how-links-work-important)
5. [Design system](#design-system)
6. [Making common changes](#making-common-changes)
7. [Contact form](#contact-form)
8. [SEO](#seo)
9. [Security headers](#security-headers)
10. [Responsiveness and accessibility](#responsiveness-and-accessibility)
11. [Deploying to Cloudflare Pages](#deploying-to-cloudflare-pages)
12. [Pre-launch checklist](#pre-launch-checklist)
13. [Conventions for contributors](#conventions-for-contributors)

---

## Pages

| File | URL on the live site | Purpose |
|---|---|---|
| `index.html` | `/` | Home: hero, intro, What We Do, Why Jamun Labz, call to action |
| `services.html` | `/services` | Six services, each with details, plus engagement models |
| `contact.html` | `/contact` | Contact form (sends to email through Web3Forms) |
| `privacy.html` | `/privacy` | Privacy Policy |
| `terms.html` | `/terms` | Terms of Use |
| `404.html` | any unknown URL | "Page not found" page, served automatically by Cloudflare |

Each service on the Services page has an anchor, so you can link straight to it:

| Service | Anchor |
|---|---|
| Business Systems & ERP Consulting | `services.html#erp-consulting` |
| Enterprise Development & Integrations | `services.html#development-integrations` |
| Business Process Improvement | `services.html#process-improvement` |
| Technology Assessment & Advisory | `services.html#technology-advisory` |
| Ongoing Consulting & Systems Support | `services.html#ongoing-support` |
| Project Management & Delivery Oversight | `services.html#project-management` |

---

## Project structure

```
/
├── index.html          Home page
├── services.html       Services page
├── contact.html        Contact page and form
├── privacy.html        Privacy Policy
├── terms.html          Terms of Use
├── 404.html            Page not found
│
├── styles.css          All styles for every page (one shared stylesheet)
├── script.js           All interactions for every page (one shared script)
│
├── fonts/              Self-hosted Manrope and Inter font files (.woff2)
├── icons/              Logo and favicons
├── og-image.png        Preview image shown when the site is shared (1200 × 630)
│
├── sitemap.xml         List of pages for search engines
├── robots.txt          Tells search engines what they may crawl
├── _headers            Security and caching headers for Cloudflare Pages
└── README.md           This file
```

---

## Running the site locally

The site has no dependencies, so any static file server works.

### Option A — VS Code Live Server (recommended for the team)

1. Install the **Live Server** extension in VS Code.
2. Open the project folder (the folder that contains `index.html`) in VS Code.
3. Right-click `index.html` and choose **Open with Live Server**.
4. The site opens at `http://127.0.0.1:5500/index.html`.

> Open the project folder itself, not a parent folder. Asset paths start with `/` (for example `/styles.css`), so the server's root must be this folder.

### Option B — Any other static server

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

### What does not work locally

- Opening the HTML files by double-clicking them (`file://...`). The paths starting with `/` will not resolve. Use a local server.
- The custom `404.html` page. Live Server shows its own error for unknown URLs; Cloudflare uses `404.html` on the live site.
- The `_headers` file. It only takes effect on Cloudflare.

---

## How links work (important)

All internal links use the `.html` form, for example:

```html
<a href="/services.html">Services</a>
<a href="/services.html#erp-consulting">ERP Consulting</a>
```

This is deliberate:

- **Locally**, Live Server needs the real file name, so `.html` links work.
- **On Cloudflare Pages**, a visit to `/services.html` is automatically redirected to the clean URL `/services`, so visitors always see clean addresses.

The **canonical tags**, **Open Graph URLs** and **sitemap.xml** use the clean form (`https://jamunlabz.com/services`). Leave them that way. They tell search engines which address to index.

When you add a new link, use the `.html` form. The home page link is simply `/`.

---

## Design system

The look is called **"Cream & Brass"**: Jamun plum, brass and soft sage on a warm paper background. All values live as CSS variables at the top of `styles.css` (`:root`). Use the variables rather than hard-coding colours.

### Colours

| Variable | Value | Used for |
|---|---|---|
| `--ink` | `#5A3A5E` | Jamun Plum — buttons, active nav, links |
| `--text-ink` | `#3D2442` | Headings and main text |
| `--text-ink-soft` | `#6B5A6E` | Body text and descriptions |
| `--paper` | `#F7F4EE` | Page background |
| `--white` | `#FFFEF7` | Cards and form fields |
| `--band` | `#EFE8F0` | Alternate (tinted) sections and CTA panels |
| `--band-deep` | `#E4DBE6` | Borders on tinted sections |
| `--footer-bg` | `#F1E9DA` | Footer |
| `--accent` | `#8A6A2E` | Brass — readable brass text (numbers, taglines) |
| `--accent-bright` | `#C9A25E` | Brass — decorative lines, dots, glows |
| `--sage` | `#9CCBB8` | Focus rings, check marks, highlights |

### Typography

- **Manrope** (600, 700, 800) for headings. Variable: `--font-head`.
- **Inter** (400, 500, 600, 700) for body text. Variable: `--font-body`.
- Both fonts are self-hosted in `/fonts`. No Google Fonts requests are made.
- Font sizes are fluid: they scale with the screen using `clamp()`.

### Spacing

Section spacing is controlled by a few variables. Change these to make the whole site tighter or airier:

| Variable | Controls |
|---|---|
| `--gutter` | Left/right page padding |
| `--space-section` | Padding of large sections |
| `--space-section-tight` | Padding of smaller sections |
| `--space-head` | Gap under a section heading |
| `--max` | Maximum content width (1200px, or 1320px on very large screens) |

### Reusable building blocks

| Class | What it is |
|---|---|
| `.wrap` | Centred container with page padding |
| `.section`, `.section-tight` | Vertical section spacing |
| `.surface-paper`, `.surface-ink` | Plain or tinted section background |
| `.section-head` (+ `.center`) | Section heading with intro paragraph |
| `.eyebrow` | Small uppercase label above a heading |
| `.btn.btn-primary`, `.btn.btn-ghost` | Filled and outline buttons |
| `.cta-panel` | Tinted call-to-action box |
| `.reveal` | Fades an element in when it scrolls into view |
| `.ico` with `.a` / `.b` | Line icons (`.a` = brass stroke, `.b` = plum stroke) |

---

## Making common changes

### The header and footer

The header and footer are written out in **every page** (there is no templating). If you change either one, **make the same change in all 6 HTML files**.

- The active nav item uses `class="active" aria-current="page"`. Only the current page's link has it.
- Footer columns: Company, Services, Legal.

### Social media links

The footer has 10 icons: Email, LinkedIn, GitHub, Instagram, YouTube, X, Facebook, TikTok, Threads and Twitch.

YouTube, X, Facebook, TikTok, Threads and Twitch are **placeholders** with `href="#"`. Clicking a placeholder does nothing. When you have the real profile URL, replace the `#`:

```html
<!-- before -->
<a href="#" target="_blank" rel="noopener noreferrer" aria-label="Jamun Labz on YouTube">

<!-- after -->
<a href="https://www.youtube.com/@jamunlabz" target="_blank" rel="noopener noreferrer" aria-label="Jamun Labz on YouTube">
```

Remember to update **all 6 pages**. Leave out tracking parameters such as `?utm_source=...` or `?igsh=...` when you paste a link.

### The email icon

The email icon is a standard `mailto:info@jamunlabz.com` link. When clicked it:

1. opens the visitor's default mail app (Outlook, Apple Mail, Gmail, etc.), **and**
2. copies the address to the clipboard and shows an "Email address copied" message.

The copy is a fallback for computers with no mail app set up. To change the address, update both `href="mailto:..."` and `data-copy-email="..."` in every footer, and the address in `contact.html`, `privacy.html` and `terms.html`.

### Text content

All page text is plain HTML. Open the page file and edit the text directly. If you change a page's main message, also update its `<title>` and `<meta name="description">` (see [SEO](#seo)).

### Legal pages

`privacy.html` and `terms.html` each have:

- the effective and last-updated dates in the page header (`.legal-meta`), and
- an "On this page" contents list (`.legal-toc`) that must match the section headings.

If you add, remove or rename a section, update **both** the `<h2 id="...">` heading and its link in the contents list. When the policy changes, update the "Last updated" date.

### Adding a new page

1. Copy an existing page (for example `privacy.html`) and rename it.
2. Update `<title>`, `<meta name="description">`, the canonical URL and the `og:` / `twitter:` tags.
3. Set the correct nav item to `active`, or none for pages not in the nav.
4. Add the page to `sitemap.xml` using its clean URL.
5. Link to it from the footer if needed, in all pages.

---

## Contact form

The form on `contact.html` sends submissions to the company inbox through **[Web3Forms](https://web3forms.com)**. No backend server is needed.

- **Fields:** Name, Work email, Company (optional), Service, Message (optional).
- **Access key:** stored in a hidden field in `contact.html` (`name="access_key"`). Web3Forms keys are designed to be public, but restrict the key to `jamunlabz.com` in the Web3Forms dashboard so nobody else can use it.
- **Spam protection:** a hidden `botcheck` honeypot field.
- **Email check:** before sending, `script.js` checks the email format, blocks throwaway domains, and confirms the domain can receive mail using Google Public DNS (`dns.google`).
- **Subject line:** created automatically as `Name - Service`.
- **Messages:** success and error messages appear below the form.

If you add or rename a service, update the `<select id="service">` options in `contact.html` too.

If you add a third-party script (for example a captcha), allow its domain in the Content-Security-Policy in `_headers`, or the browser will block it.

---

## SEO

Each page includes:

- a unique `<title>` and `<meta name="description">`;
- a **canonical URL** (clean form, for example `https://jamunlabz.com/services`);
- **Open Graph** and **Twitter card** tags for link previews;
- **structured data** (JSON-LD) for search engines:
  - Home: `Organization` and `WebSite`
  - Services: `ItemList` of six `Service` items, plus `BreadcrumbList`
  - Contact: `ContactPage` with a `ContactPoint`
- `robots` meta tags (`404.html` is `noindex`).

Site-wide files:

- **`sitemap.xml`** lists all public pages using clean URLs. Add new pages here.
- **`robots.txt`** allows all crawlers and points to the sitemap.

### Share preview image

`og-image.png` (1200 × 630 px) is the image shown when the site is shared on LinkedIn, WhatsApp, X, etc.

Social platforms cache this image for a long time. If you replace it, **increase the version number** in the `og:image` and `twitter:image` tags on every page, for example `og-image.png?v=2` → `og-image.png?v=3`. After deploying, check the preview with [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).

---

## Security headers

`_headers` is read by Cloudflare Pages and adds these response headers:

| Header | Purpose |
|---|---|
| `Content-Security-Policy` | Only allows scripts, styles, fonts and images from this site, plus Web3Forms and Google DNS for the form |
| `Strict-Transport-Security` | Forces HTTPS |
| `X-Frame-Options`, `frame-ancestors` | Stops other sites embedding this one in a frame |
| `X-Content-Type-Options` | Stops browsers guessing file types |
| `Referrer-Policy` | Limits referrer information sent to other sites |
| `Permissions-Policy` | Disables camera, microphone, location and payment APIs |
| `Cache-Control` on `/fonts/*` | Caches font files for a year |
| `X-Robots-Tag: noindex` on `*.pages.dev` | Keeps Cloudflare preview URLs out of Google |

The site uses no external scripts, CDNs or trackers, so the policy can stay strict.

---

## Responsiveness and accessibility

### Screen sizes

The layout is fluid and has been tested from 320px phones to 1920px desktops:

- Phones (iPhone, Android), portrait and landscape, including notched iPhones (`safe-area-inset`)
- Tablets and iPads
- Mac and Windows laptops and large monitors

Main breakpoints: `560px`, `860px` (mobile menu), `900px`, `980px`, `1000px` (legal sidebar), `1080px`.

### Behaviour

- **Mobile menu:** opens below 860px. It closes with Escape, by tapping outside, or by tapping a link.
- **Legal pages:** "On this page" is a sticky sidebar on laptops and a collapsible box on phones.
- **Scroll animation:** elements with `.reveal` fade in once. They are switched off for visitors who prefer reduced motion, and shown immediately when JavaScript is off.
- **Smooth wheel scrolling:** applies to physical mouse wheels only. Trackpads, touch screens and keyboards keep native scrolling. Adjust `SMOOTHNESS` in `script.js`.
- **Hover effects:** disabled on touch screens so cards don't stay "lifted" after a tap.

### Accessibility

- A "Skip to content" link appears for keyboard users.
- Visible focus outlines on all interactive elements.
- Labels on all form fields, and `aria-label`s on icon links.
- Decorative SVGs are hidden from screen readers.
- Form inputs use a 16px font size so iPhones don't zoom in on tap.

---

## Deploying to Cloudflare Pages

1. Push this repository to GitHub.
2. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Connect to Git** and select this repository.
3. Use these build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/`
4. Deploy. Cloudflare publishes the site to a `*.pages.dev` address.
5. Under **Custom domains**, add `jamunlabz.com` (and `www.jamunlabz.com` if needed).

Every push to the main branch redeploys the site automatically. Pushes to other branches create preview deployments.

---

## Pre-launch checklist

Before going live, confirm:

- [ ] Legal dates (17 October 2026) on `privacy.html` and `terms.html` are approved
- [ ] `info@jamunlabz.com` is the correct contact address on all pages
- [ ] Placeholder social links (`href="#"`) are replaced or removed
- [ ] Web3Forms access key is restricted to `jamunlabz.com`
- [ ] A test submission from the live contact form arrives in the inbox
- [ ] Share preview checked in LinkedIn Post Inspector
- [ ] `https://jamunlabz.com/sitemap.xml` submitted in Google Search Console

---

## Conventions for contributors

- **Keep it dependency-free.** No frameworks, CDNs or external scripts without discussion; they would also need adding to the CSP.
- **Use the CSS variables** for colours, fonts and spacing.
- **Put styles in `styles.css`.** Small page-only styles may go in a `<style>` block in that page's `<head>`, as on `contact.html` and `404.html`.
- **Keep headers and footers identical** across all pages.
- **Use `.html` links internally** and clean URLs in canonical tags and the sitemap.
- **Test before pushing:** check the page on a phone-sized window (360px) and a laptop-sized window, and click every link you touched.
- **Keep image sizes small.** Compress images before adding them.

---

© 2026 Jamun Labz FZC. All rights reserved.
