# Jamun Labz — Company Website

The official website of **Jamun Labz FZC**, a boutique business and technology consulting firm based in the United Arab Emirates.

- **Live address:** https://jamunlabz.com
- **Tagline:** Business First. Technology That Fits.
- **Current version:** Jamun Labz Web 26.10.0 (Phase 1)
- **Next version:** Jamun Labz Web 26.11.0 (Phase 2, planned)

This is a hand-built static website: plain HTML, CSS and JavaScript. There is no framework, no build step and no `npm install`. The code lives on GitHub and the live site is hosted on **Cloudflare Pages**.

---

## Table of contents

1. [Pages](#pages)
2. [Project structure](#project-structure)
3. [Running the site locally](#running-the-site-locally)
4. [How links work (important)](#how-links-work-important)
5. [Design system](#design-system)
6. [Page by page](#page-by-page)
7. [Shared behaviour (script.js)](#shared-behaviour-scriptjs)
8. [Making common changes](#making-common-changes)
9. [Contact form](#contact-form)
10. [SEO](#seo)
11. [Security headers](#security-headers)
12. [Privacy and cookies](#privacy-and-cookies)
13. [Responsiveness and accessibility](#responsiveness-and-accessibility)
14. [Domains and DNS](#domains-and-dns)
15. [Deploying to Cloudflare Pages](#deploying-to-cloudflare-pages)
16. [Pre-launch checklist](#pre-launch-checklist)
17. [Versions and roadmap](#versions-and-roadmap)
18. [Conventions for contributors](#conventions-for-contributors)

---

## Pages

| File | URL on the live site | Purpose |
|---|---|---|
| `index.html` | `/` | Home: hero, intro, What We Do, connection diagram, Why Jamun Labz, call to action |
| `about.html` | `/about` | About Us: why we started, mission and vision, beliefs, how we work, who we work with |
| `services.html` | `/services` | Six services in detail, plus how we engage |
| `contact.html` | `/contact` | Contact form (sends to the company inbox through Web3Forms) |
| `privacy.html` | `/privacy` | Privacy Policy |
| `terms.html` | `/terms` | Terms of Use |
| `404.html` | any unknown URL | "Page not found", served automatically by Cloudflare |

Navigation bar on every page: **Home · About Us · Services · Contact**.

Each service on the Services page has an anchor, so you can link straight to it:

| # | Service | Anchor |
|---|---|---|
| 01 | Business Systems & ERP Consulting | `services.html#erp-consulting` |
| 02 | Enterprise Development & Integrations | `services.html#development-integrations` |
| 03 | Business Process Improvement | `services.html#process-improvement` |
| 04 | Technology Assessment & Advisory | `services.html#technology-advisory` |
| 05 | Ongoing Consulting & Systems Support | `services.html#ongoing-support` |
| 06 | Project Management & Delivery Oversight | `services.html#project-management` |

---

## Project structure

```
/
├── index.html          Home
├── about.html          About Us
├── services.html       Services
├── contact.html        Contact page and form
├── privacy.html        Privacy Policy
├── terms.html          Terms of Use
├── 404.html            Page not found
│
├── styles.css          All styles for every page (one shared stylesheet)
├── script.js           All interactions for every page (one shared script)
│
├── fonts/              Self-hosted font files (.woff2)
│   ├── inter-v20-latin-regular / 500 / 600 / 700
│   └── manrope-v20-latin-600 / 700 / 800
├── icons/
│   ├── logo_withoutBG_favicon_32x32.png
│   └── logo_withoutBG_favicon_48x48.png
├── og-image.png        Preview image shown when the site is shared (1200 × 630)
│
├── sitemap.xml         List of pages for search engines
├── robots.txt          Tells search engines what they may crawl
├── _headers            Security and caching rules for Cloudflare Pages
└── README.md           This file
```

There is no separate `about.css`. Its styles were merged into the end of `styles.css`.

---

## Running the site locally

The site has no dependencies, so any simple local server works.

### Option A — VS Code Live Server (recommended)

1. Install the **Live Server** extension in VS Code.
2. Open the project folder (the one that contains `index.html`).
3. Right-click `index.html` and choose **Open with Live Server**.
4. The site opens at `http://127.0.0.1:5500/index.html`.

### Option B — Any other local server

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

### What does not work locally

- Opening the files by double-clicking them (`file://...`). Use Live Server.
- The custom `404.html`. Live Server shows its own error page; Cloudflare uses `404.html` on the live site.
- The `_headers` file. It only takes effect on Cloudflare.

---

## How links work (important)

Internal links and file paths are **relative**, for example:

```html
<link rel="stylesheet" href="styles.css">
<a href="./">Home</a>
<a href="about.html">About Us</a>
<a href="services.html#erp-consulting">ERP Consulting</a>
```

This is deliberate:

- **Locally** and on the **GitHub Pages preview** (where the site sits in a subfolder), relative paths keep working.
- **On Cloudflare Pages**, a visit to `/services.html` is automatically redirected to the clean address `/services`, so visitors always see clean addresses.

**Exception — `404.html`:** this page uses paths that start with `/` (`/styles.css`, `/services.html`). Cloudflare shows it at whatever broken address was typed (for example `/a/b/c`), where relative paths would fail. It looks unstyled on the GitHub preview; that is expected.

The **canonical tags**, **share (Open Graph) addresses** and **sitemap.xml** use full clean addresses (`https://jamunlabz.com/services`). Leave them that way; they tell search engines which address to show.

When you add a new link or file, use a relative path (no leading `/`), except in `404.html`.

---

## Design system

The look is called **"Cream & Brass"**: Jamun plum, brass and soft sage on a warm paper background. All values are CSS variables at the top of `styles.css` (`:root`). Use the variables rather than typing colours directly.

### Colours

| Variable | Value | Used for |
|---|---|---|
| `--ink` | `#5A3A5E` | Jamun Plum — buttons, active nav, links |
| `--accent-deep` | `#3D2442` | Plum Ink — hover colour of plum buttons |
| `--text-ink` | `#3D2442` | Headings and main text |
| `--text-ink-soft` | `#6B5A6E` | Body text and descriptions |
| `--paper` | `#F7F4EE` | Page background |
| `--white` | `#FFFEF7` | Cards and form fields |
| `--band` | `#EFE8F0` | Tinted sections and call-to-action panels |
| `--band-deep` | `#E4DBE6` | Borders on tinted sections |
| `--footer-bg` | `#F1E9DA` | Footer (cream) |
| `--accent` | `#8A6A2E` | Brass — readable brass text (numbers, labels) |
| `--accent-bright` | `#C9A25E` | Brass — decorative lines, dots, glows |
| `--sage` | `#9CCBB8` | Focus outlines, tick marks, highlights |

Rounded corners: `--radius-lg` 28px, `--radius-md` 18px, `--radius-sm` 10px.

### Typography

- **Manrope** (600, 700, 800) for headings. Variable: `--font-head`.
- **Inter** (400, 500, 600, 700) for body text. Variable: `--font-body`.
- Both fonts are stored in `/fonts`. No Google Fonts requests are made.
- Font sizes scale smoothly with the screen using `clamp()`.

### Spacing

The site is deliberately spacious. A few variables control all the breathing room:

| Variable | Controls | Range (phone → large screen) |
|---|---|---|
| `--gutter` | Left/right page padding | 20px → 64px |
| `--space-section` | Padding of large sections | 96px → 192px |
| `--space-section-tight` | Padding of smaller sections | 72px → 144px |
| `--space-head` | Gap under a section heading | 44px → 88px |
| `--max` | Maximum content width | 1200px (1320px on screens 1600px and wider) |
| `--header-h` | Header height | 78px (60px on phones held sideways) |

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
| `.ico` with `.a` / `.b` | Line icons (`.a` = brass line, `.b` = plum line) |
| `.toast` | Small pop-up message (e.g. "Email address copied") |

### Where each part lives in styles.css

Fonts → variables → header/nav → reveal → eyebrow → buttons → hero → page header → section spacing → icons → **Home** (intro, What We Do, connection diagram, Why Jamun Labz) → CTA panel → **Services** (lede, at a glance, service detail, engagement) → **Legal pages** → footer → **Contact form** → utilities → toast → **About** (intro link, mission & vision, principles, how we work, who we work with, promise band).

---

## Page by page

### Home (`index.html`)
- **Hero:** labels "Boutique Consulting · Business Solutions · Digital Knowledge", heading "Business First. Technology That Fits." The hero graphic moves slightly as you scroll.
- **Intro:** the company story, ending "Let's make business easier. Together." and a "More about us" button.
- **What We Do:** three cards — Business Systems & ERP Consulting; Enterprise Technology & Development (names SAP ABAP, Fiori, JavaScript, SuiteScript and e-invoicing integrations); Business & Technology Knowledge.
- **Connection diagram:** an animated drawing showing Jamun Labz linking Finance, Operations, Inventory and Customer data to Reporting, Automation, Fulfilment and Client portal. It is side-by-side on laptops and tablets, and top-to-bottom on phones (below 860px). The animation stops for visitors who prefer reduced motion. Heading: "One connecting layer, not another system to manage" (wording carried over from the old site; awaiting manager approval).
- **Why Jamun Labz?:** five reasons, on the lilac band.
- **Call to action:** "The Right Solution Starts With the Right Conversation" → "Let's Talk Business".

### About Us (`about.html`)
Heading "Built Around the Business, Not the Software." Then: Why we started Jamun Labz; Mission and Vision cards; What We Believe (four principles); How We Work (Listen → Assess → Recommend → Deliver → Support, a horizontal timeline on laptops and vertical on tablets and phones); Who We Work With (client types and industries); a promise line and button. No employees are named. Content approved by the manager.

### Services (`services.html`)
Heading "Practical Expertise. Solutions That Fit." Then: Services at a Glance (a grid that jumps to each service); the six detailed services; Flexible Engagements / How We Engage; closing call to action "Let's Find the Right Approach".

### Contact (`contact.html`)
The enquiry form (see [Contact form](#contact-form)) and a consent line linking to the Privacy Policy. A few page-only styles sit in a `<style>` block in its `<head>`.

### Privacy Policy and Terms of Use (`privacy.html`, `terms.html`)
A clean reading layout. On laptops an "On this page" list sits in a sticky sidebar; on phones and tablets it becomes a box you can open and close. Effective and last-updated dates are in the page header (both 17 October 2026). Contact address on both: info@jamunlabz.com.

### 404 (`404.html`)
Friendly "Page not found" message with links to popular pages. Marked `noindex` so it never appears in Google. Uses `/` paths (see [How links work](#how-links-work-important)).

---

## Shared behaviour (script.js)

| Feature | What it does |
|---|---|
| Mobile menu | Opens below 860px. The burger turns into a cross. Closes with Escape, by tapping outside, by tapping a link, or when the screen gets wider (tablet rotated). |
| Scroll reveal | Elements with `.reveal` fade in once as they come into view. |
| Legal contents box | Opens and closes the "On this page" box on phones. |
| Email icon | Opens the visitor's mail app and also copies the address, showing "Email address copied". |
| Hero parallax | The hero graphic moves gently while scrolling, at most once per frame so it never stutters. |
| Smooth wheel scrolling | A physical mouse wheel glides instead of jumping. Trackpads, touch screens and keyboards keep the browser's own scrolling. Change `SMOOTHNESS` (default 120; 90 = snappier, 160 = floatier). |
| Contact form | Checks the email, then sends the form to Web3Forms and shows a success or error message. |

---

## Making common changes

### Header and footer

The header and footer are written out in **every page** (there is no template system). If you change one, **make the same change in all 7 HTML files**.

- The current page's nav link has `class="active" aria-current="page"`. Only that page's link has it.
- Footer columns: **Company** (Home, About Us, Services, Contact), **Services** (links to all six), **Legal** (Privacy Policy, Terms of Use).

### Social media icons

The footer shows these icons:

| Icon | Status |
|---|---|
| Email | Working (`mailto:info@jamunlabz.com`) |
| LinkedIn | Working (`linkedin.com/company/jamun-labz`) |
| Instagram | Working (`instagram.com/jamunlabz`) |
| YouTube, X, Facebook, TikTok, Threads, Twitch | **Placeholders** (`href="#"`), go nowhere yet |

The GitHub icon was removed in version 26.10.0.

When you get a real profile address, replace the `#` on all 7 pages:

```html
<!-- before -->
<a href="#" target="_blank" rel="noopener noreferrer" aria-label="Jamun Labz on YouTube">

<!-- after -->
<a href="https://www.youtube.com/@jamunlabz" target="_blank" rel="noopener noreferrer" aria-label="Jamun Labz on YouTube">
```

If a profile will not exist, delete the whole `<a>…</a>` (with the icon inside) so no empty button is left. Leave out tracking bits such as `?utm_source=...` or `?igsh=...` when pasting links. When you add a real profile, also add it to `sameAs` in the Home page's structured data (see [SEO](#seo)).

### The email address

To change it, update `href="mailto:..."` and `data-copy-email="..."` in every footer, the address in `contact.html`, `privacy.html` and `terms.html`, and `"email"` in the structured data.

### Text content

All page text is plain HTML. Open the file and edit the text. If you change a page's main message, also update its `<title>` and `<meta name="description">`.

### Services

If you add, remove or rename a service, update all of these:

1. The service section and the "At a Glance" grid in `services.html`.
2. The `ItemList` structured data at the top of `services.html`.
3. The Services column in the footer of all 7 pages.
4. The `<select id="service">` options in `contact.html`.
5. The "What We Do" cards on the Home page, if relevant.
6. The anchor table in this README.

### Legal pages

`privacy.html` and `terms.html` each have the dates in the page header (`.legal-meta`) and an "On this page" list (`.legal-toc`) that must match the section headings. If you add, remove or rename a section, update **both** the `<h2 id="...">` and its link in the list. When the policy changes, update "Last updated". Each file has a comment at the top listing what to confirm with the manager.

### Share image

`og-image.png` (1200 × 630) shows the logo, "Jamun Labz" and the tagline. Social sites keep old copies for a long time, so if you replace it, raise the number in the `og:image` and `twitter:image` tags on every page (currently `og-image.png?v=2` → `?v=3`). Then check it with [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).

### Forcing visitors to get a new CSS file

After a visible CSS change you can add a version to the stylesheet link on every page, for example `styles.css?v=2`. It is optional; Cloudflare already makes browsers check for new files.

### Adding a new page

1. Copy an existing page (for example `about.html`) and rename it.
2. Update `<title>`, `<meta name="description">`, the canonical address and the `og:` / `twitter:` tags.
3. Set the right nav link to `active`, or none if the page is not in the nav.
4. Add the page to `sitemap.xml` using its clean address.
5. Add it to the nav and/or footer on all pages if needed, including `404.html` (with `/` paths).
6. Put its styles at the end of `styles.css` under a clear comment heading.

---

## Contact form

The form on `contact.html` sends each enquiry to the company inbox through **[Web3Forms](https://web3forms.com)** (free plan). No server of our own is needed.

- **Fields:** Name, Work email, Company (optional), Service (required, drop-down of the six services plus "Not sure yet"), Message (optional).
- **Subject line:** created automatically as `Name - Service`.
- **Access key:** a hidden field in `contact.html` (`name="access_key"`). Web3Forms keys are meant to be public. Locking the key to jamunlabz.com is a paid feature, so it is not locked. If it is ever misused, create a new key in the Web3Forms dashboard and swap it in.
- **Spam protection:** a hidden `botcheck` trap field that people never see; Web3Forms also filters spam into its Spam tab.
- **Email checks before sending (`script.js`):**
  1. the address looks like an email;
  2. it is not a fake or throwaway domain (`example.com`, `test.com`, `mailinator.com`, `yopmail.com`, etc. — see the `BLOCKED` list);
  3. the domain can receive email, checked with Google Public DNS (`dns.google`). Only the domain (e.g. `gmail.com`) is sent, never the full address or message. If Google cannot be reached, the check is skipped and the form still sends.
- **Messages:** success and error messages appear under the form.
- **Consent line:** "By sending this form, you agree…" with a link to the Privacy Policy.

These browser checks catch typos; they are not real security. Spam filtering is Web3Forms' job.

If you add any outside script (for example a captcha), you must also allow its address in `_headers`, or the browser will block it.

---

## SEO

Each page has:

- its own `<title>` and `<meta name="description">`;
- a **canonical address** (clean form, e.g. `https://jamunlabz.com/services`);
- **Open Graph** and **Twitter card** tags for link previews;
- a `robots` tag (`index, follow`; `404.html` is `noindex`);
- **structured data** (hidden company information Google reads):

| Page | Structured data |
|---|---|
| Home | `Organization` (legal name Jamun Labz FZC, country AE, email, slogan, `sameAs`, `knowsAbout`) and `WebSite` |
| About | `AboutPage`, `Organization`, `BreadcrumbList` |
| Services | `ItemList` of six `Service` items, `Organization`, `BreadcrumbList` |
| Contact | `ContactPage` with a `ContactPoint` |
| Privacy, Terms, 404 | none (not needed) |

`sameAs` on the Home page currently lists LinkedIn only. Add Instagram and any other real profiles there.

Site-wide files:

- **`sitemap.xml`** lists `/`, `/about`, `/services`, `/contact`, `/privacy` and `/terms`. Add new pages here.
- **`robots.txt`** allows all search engines and points to the sitemap.

After launch, submit `https://jamunlabz.com/sitemap.xml` in Google Search Console.

---

## Security headers

`_headers` is read by Cloudflare Pages and adds these rules to every page:

| Header | What it does |
|---|---|
| `Content-Security-Policy` | Only allows scripts, styles, fonts and images from this site, plus Web3Forms (form) and Google DNS (email check) |
| `Strict-Transport-Security` | Always uses HTTPS |
| `X-Frame-Options`, `frame-ancestors` | Stops other sites showing this one inside a frame |
| `X-Content-Type-Options` | Stops browsers guessing file types |
| `Referrer-Policy` | Limits what is shared with other sites when a link is clicked |
| `Permissions-Policy` | Turns off camera, microphone, location and payment features |
| `Cache-Control` on `/fonts/*` | Fonts are cached for a year |
| `X-Robots-Tag: noindex` on `*.pages.dev` | Keeps Cloudflare's preview addresses out of Google |

Inline styles are allowed (`'unsafe-inline'` for styles only), which is why small `<style>` blocks and `style="..."` work. Inline scripts are **not** allowed; all JavaScript must be in `script.js`. Structured data (`application/ld+json`) is not run as a script, so it is fine.

The site uses no outside scripts, CDNs or trackers, so the policy can stay strict.

---

## Privacy and cookies

- **No cookie banner is needed.** The site has no analytics, ads or tracking, and fonts and scripts come from our own domain. Cloudflare may set a strictly necessary security cookie, which does not need consent.
- If analytics or tracking is ever added, add a cookie banner and update the Privacy Policy at the same time.
- Visitor data flow: Visitor → Contact form → Web3Forms → company inbox (Microsoft 365). Cloudflare serves the site and sees visitor IP addresses. Google DNS receives only the email domain.

---

## Domains and DNS

| Domain | Role |
|---|---|
| `jamunlabz.com` | Main address of the site |
| `www.jamunlabz.com` | Redirects (301) to `jamunlabz.com` |
| `jamunlabz.ai` | Redirects (301) to `jamunlabz.com`, not a second copy (two copies would split search ranking) |

- Both domains are registered at **GoDaddy**, with DNS managed in **Cloudflare** (moved October 2026). A backup of the original GoDaddy records is in the company's shared storage ("DNS backup 9 Oct 2026").
- DNSSEC is off on both domains. It can be turned on later from Cloudflare.
- Company email runs on **Microsoft 365**. Its records (MX, SPF, DKIM `selector1/2._domainkey`, DMARC, `autodiscover`, `lyncdiscover`, `sip`, `msoid`, etc.) must stay **DNS only** (grey cloud) in Cloudflare. Turning them orange breaks email and Teams.

---

## Deploying to Cloudflare Pages

1. The code is pushed to the company GitHub repository.
2. In Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**, and choose the repository.
3. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/`
4. Deploy. Cloudflare publishes a `*.pages.dev` address (hidden from Google by `_headers`).
5. In the Pages project, open **Custom domains** and add `jamunlabz.com`. If Cloudflare warns about old records pointing to GoDaddy, let it replace them.
6. Set up the 301 redirects for `www.jamunlabz.com` and `jamunlabz.ai` to `https://jamunlabz.com`.
7. Turn off the GitHub Pages preview (**GitHub → Settings → Pages → Branch: None**) so only one copy of the site is online.

Every push to the main branch then redeploys the site automatically. Pushes to other branches create preview versions.

---

## Pre-launch checklist

- [ ] Manager approves the legal dates (17 October 2026) on `privacy.html` and `terms.html`
- [ ] `info@jamunlabz.com` confirmed as the contact address on all pages
- [ ] Privacy Policy completed: legal details (emirate/free zone, trade licence, address), how long enquiries are kept, and named providers (Web3Forms, Google DNS, Cloudflare, Microsoft 365)
- [ ] Placeholder social icons replaced with real links or removed
- [ ] Instagram (and any other real profiles) added to `sameAs`
- [ ] Manager approves the diagram heading "One connecting layer…"
- [ ] `jamunlabz.com` attached as a custom domain in Cloudflare Pages
- [ ] `www` and `jamunlabz.ai` redirect to `jamunlabz.com`
- [ ] GitHub Pages preview turned off
- [ ] A test enquiry from the live form arrives in the inbox
- [ ] Share preview checked in LinkedIn Post Inspector
- [ ] `sitemap.xml` submitted in Google Search Console

---

## Versions and roadmap

Versions are named **Jamun Labz Web YY.MM.patch**. Use the version name in commit messages and release tags.

### 26.10.0 — Phase 1 (current)
- Manager's content on Home, Services, Privacy Policy and Terms of Use.
- New About Us page, linked in the nav and footer of every page.
- Connection diagram re-added to the Home page.
- GitHub icon removed from all footers.
- Service 02 names SAP ABAP, Fiori, JavaScript, SuiteScript and e-invoicing integrations.
- Spacious layout, smooth wheel scrolling, responsive from 320px phones to large monitors.

### 26.11.0 — Phase 2 (planned, tracked in the team Google Sheet)
- Add **Product Management** as a service.
- Content review feedback from Jatayu and Aparna.
- Website content rewrite based on the expert content review (four options proposed).
- Automatic reply email after an enquiry, with a follow-up form link.

---

## Responsiveness and accessibility

### Screen sizes

Tested from 320px phones to 1920px+ monitors:

- Phones (iPhone, Android), portrait and landscape, including notched iPhones (`safe-area-inset`)
- Tablets and iPads, portrait and landscape
- Mac and Windows laptops and large monitors

Main breakpoints: `360`, `420`, `480`, `560`, `640`, `720`, `860` (mobile menu, diagram switch), `900`, `980`, `1000` (legal sidebar), `1080`, `1600` (wider content) px, plus a rule for phones held sideways (height under 520px).

### Behaviour

- **Mobile menu** below 860px (see [script.js](#shared-behaviour-scriptjs)).
- **Hover effects** are switched off on touch screens so cards don't stay "lifted" after a tap.
- **No blue tap flash** on phones (`-webkit-tap-highlight-color: transparent`).
- **Form fields** use a 16px font so iPhones don't zoom in when tapped.
- **Animations** (reveal, diagram) are switched off for visitors who prefer reduced motion; content shows straight away if JavaScript is off.

### Accessibility

- "Skip to content" link for keyboard users.
- Visible focus outlines on everything you can click or tab to.
- Labels on all form fields; `aria-label`s on icon links.
- Decorative drawings are hidden from screen readers; the diagram has a text description.

---

## Conventions for contributors

- **Keep it dependency-free.** No frameworks, CDNs or outside scripts without discussion; they would also need adding to `_headers`.
- **Use the CSS variables** for colours, fonts and spacing.
- **Put styles in `styles.css`.** Small page-only styles may go in a `<style>` block in that page's `<head>` (as on `contact.html` and `404.html`).
- **Keep headers and footers identical** across all 7 pages.
- **Use relative `.html` links** internally (`/` paths only in `404.html`) and full clean addresses in canonical tags and the sitemap.
- **Use official product names:** SAP ABAP, SAP Fiori, NetSuite SuiteScript.
- **Test before pushing:** check a phone-sized window (360px) and a laptop-sized window, and click every link you changed. After pushing, hard refresh (Ctrl+Shift+R, or Cmd+Shift+R on a Mac).
- **Keep images small.** Compress them before adding.
- **Commit messages** start with the version name, e.g. `Jamun Labz Web 26.10.0 – update service 02`.

---

© 2026 Jamun Labz FZC. All rights reserved.
