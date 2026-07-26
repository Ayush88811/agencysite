# NovaFlare Digital — Agency Website

A premium, fully responsive one-page website for a fictional digital agency,
**NovaFlare Digital**. Built with semantic HTML5, custom CSS3 (glassmorphism,
gradients, scroll animations), and vanilla JavaScript, with Bootstrap 5 used
only for grid/utility support underneath a fully custom visual design.

---

## 1. Project Overview

NovaFlare Digital is a one-page agency website designed to showcase services,
portfolio work, testimonials, and a working contact form for a modern digital
studio. The project was built as a university front-end development
assignment, with an emphasis on:

- Production-quality, well-commented code
- A distinctive, non-templated visual identity (dark aurora-mesh background,
  violet → cyan gradient accents, glassmorphism panels)
- Full responsiveness across phone, tablet, and desktop breakpoints
- Accessibility and SEO best practices

**Live sections:** Sticky Navigation · Hero · About · Services · Portfolio ·
Why Choose Us · Testimonials · Contact · Footer

---

## 2. Features

### Design
- Glassmorphism cards (frosted blur + soft borders) throughout
- Custom gradient palette (violet `#6C5CE7` → cyan `#00D9F5`) on a deep navy
  background (`#0B0E1A`)
- Typography pairing: **Sora** (display headings), **Inter** (body copy),
  **JetBrains Mono** (eyebrows / stat figures)
- Animated gradient "blob" background in the hero section
- Rounded cards, pill-shaped buttons, consistent spacing scale

### Interactivity (script.js)
- Sticky navbar that gains a frosted background on scroll
- Animated mobile hamburger menu (off-canvas panel)
- Scroll-spy active-link highlighting
- Scroll-reveal animations via `IntersectionObserver` (fade + slide up,
  staggered for grids)
- Animated stat counters (count up once visible)
- Back-to-top button that appears after one viewport height of scrolling
- Client-side contact form validation (name, email, phone, message) with
  inline error messages and a success confirmation — no page reload
- Preloader / loading animation on first paint
- Auto-updating footer copyright year

### Technical / Optimisation
- Semantic HTML5 (`header`, `nav`, `main`, `section`, `article`, `figure`,
  `footer`) for better SEO and screen-reader navigation
- Full meta tag set: description, keywords, canonical URL, Open Graph and
  Twitter Card tags, theme colour, and an inline SVG favicon
- `loading="lazy"` on all below-the-fold images; `fetchpriority="high"` on
  the hero background so the largest above-the-fold asset loads first
- All decorative images use `alt=""`; all meaningful images have descriptive
  `alt` text; icons are marked `aria-hidden="true"`
- Skip-to-content link and visible `:focus-visible` outlines for keyboard
  users
- `prefers-reduced-motion` media query disables animation for users who
  request it at the OS level
- No inline styles/scripts — all CSS/JS lives in dedicated files for
  cacheability
- CSS organised with a clear table of contents and grouped by section for
  easy maintenance (see the comment header at the top of `style.css`)

### Responsiveness
Tested and tuned at the following breakpoints, mobile-first:

| Breakpoint | Target device                     |
|-----------:|------------------------------------|
| 320px      | Smallest supported phones          |
| 375px      | Standard phones                    |
| 425px      | Large phones                       |
| 768px      | Tablets (portrait)                 |
| 1024px     | Tablets (landscape) / small laptops|
| 1440px     | Desktop                            |

---

## 3. Folder Structure

```
agency-website/
│
├── index.html              # Main HTML document (all sections)
├── style.css                # All custom CSS (design tokens, layout, animation)
├── script.js                 # All custom JavaScript (interactivity, validation)
│
├── assets/
│   ├── images/                # Hero background, about illustration, portfolio thumbnails
│   │   ├── hero-bg.svg
│   │   ├── about.svg
│   │   └── portfolio-1.svg … portfolio-6.svg
│   └── icons/
│       └── favicon.svg        # Brand favicon (SVG)
│
├── README.md                 # This file
└── LICENSE                   # MIT License
```

> All imagery in `assets/images` is provided as lightweight, dependency-free
> SVG illustrations so the project runs fully offline with zero external
> image requests. Swap them for real photography/screenshots by replacing
> the files with the same names, or updating the `src` attributes in
> `index.html`.

---

## 4. How to Run Locally

No build step or package manager is required — this is a static site.

**Option A — Open directly**
1. Download or clone the repository.
2. Double-click `index.html` (or right-click → Open with your browser).

**Option B — Local server (recommended, avoids any browser file:// quirks)**

```bash
# Using Python 3
cd agency-website
python3 -m http.server 8000
# then visit http://localhost:8000

# Using Node.js (npx, no install needed)
npx serve .

# Using VS Code
# Install the "Live Server" extension, right-click index.html → "Open with Live Server"
```

---

## 5. Technologies Used

| Technology              | Purpose                                             |
|--------------------------|-----------------------------------------------------|
| HTML5                    | Semantic page structure                             |
| CSS3                     | Custom design system, glassmorphism, animations      |
| JavaScript (Vanilla ES6) | Interactivity, scroll effects, form validation       |
| Bootstrap 5 (CDN)        | Base grid/utility classes                            |
| Font Awesome 6 (CDN)     | Iconography                                          |
| Google Fonts             | Sora, Inter, JetBrains Mono                          |

No frameworks, bundlers, or build tools are required to run or edit the
project — everything works from plain files.

---

## 6. Deployment Steps

### GitHub Pages
1. Push this folder to a GitHub repository (see structure above).
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
4. Choose the `main` branch and `/ (root)` folder, then **Save**.
5. Your site will be published at `https://<username>.github.io/<repo-name>/`.

### Netlify
1. Log in to Netlify and choose **Add new site → Import an existing project**.
2. Connect your GitHub repository (or drag-and-drop the folder for an
   instant deploy).
3. Leave the build command empty and set the publish directory to `/`
   (root), since this is a static site with no build step.
4. Click **Deploy site**.

### Vercel
1. Log in to Vercel and choose **Add New… → Project**.
2. Import the GitHub repository.
3. Framework preset: **Other** (static site) — no build command needed.
4. Click **Deploy**.

### Any static host (Firebase Hosting, cPanel, S3, etc.)
Simply upload the contents of the `agency-website/` folder to the web
root — there is nothing to compile or install.

---

## 7. Credits & License

Built as a university front-end assignment. Content, company name
("NovaFlare Digital"), and testimonials are fictional placeholders created
for demonstration purposes. Released under the [MIT License](LICENSE).
