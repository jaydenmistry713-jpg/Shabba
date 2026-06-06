# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

**Cooking with Shabba** — a single-page luxury landing page for a Caribbean private
dining brand (Gloucester, UK; transitioning into high-end private dining). The site's
one job is to **convert visitors into enquiries**. Domain: cookingwithshabba.co.uk,
hosted on **Netlify**.

`shabba_PRD.md` is the complete specification (copy, all 14 menu items, palette,
social URLs, acceptance criteria). Treat it as the source of truth — read it before
making content or structural changes.

## Stack

Static site. **No frameworks, no build step, no package manager.** Vanilla
HTML/CSS/JS only. The single external dependency is Google Fonts.

```
index.html              Single-page site — all sections in order; JSON-LD in <head>
privacy.html            Placeholder privacy policy (noindex)
404.html                Branded not-found page
robots.txt              Crawl rules + sitemap pointer
sitemap.xml             Single-URL sitemap
netlify.toml            /privacy → /privacy.html redirect, security headers, asset caching
assets/css/styles.css   All styling (CSS custom properties at :root)
assets/js/main.js        Nav scroll, mobile menu, scroll reveal, reviews carousel, AJAX form submit, cookie notice
shabba_PRD.md           Full product spec
prompt.txt              Original build brief
```

There is no `assets/images/` yet — gallery, hero, and about images are **Unsplash
placeholder URLs** to be swapped for real shoot photos.

## Running it

It's a static file — open `index.html` in a browser. No server needed for layout/JS.
The enquiry form only works once deployed to Netlify (Netlify Forms processes the POST).

## Conventions

- **Design rule above all:** luxury *editorial* — never generic. No predictable
  hero+subtitle layouts, no equal-padding card grids, no Inter/Roboto/system fonts,
  no purple gradients, no "Our Services"/"Why Choose Us" sections. Think fine-dining
  menu meets magazine.
- **Fonts:** Cormorant Garamond (display/serif) + DM Sans (body). Never substitute.
- **Palette** — warm dark "stone" range (candle-lit, not flat black), defined as
  CSS vars in `styles.css` `:root`: bg-deep `#0E0C0A`, bg `#14110E` (espresso),
  bg-alt `#1E1A15` (warm charcoal), surface `#2A2620` (stone-grey, lightest panel),
  text `#F5F0E8`, gold `#C9A84C`, muted gold `#8B7236`. Sections alternate across
  the bg/bg-alt/surface tones for warmth — **don't flatten back to pure black**.
  No white/light backgrounds anywhere.
- **Texture:** a subtle SVG film-grain overlay (`body::after`, ~5% opacity,
  `mix-blend-mode: overlay`) gives every section a hand-finished feel. Disabled
  under `prefers-reduced-motion`.
- **Woven imagery:** photos are distributed through the page, not pooled in the
  gallery — full-bleed `.band` strips between sections (edges fade into the
  adjacent section colour via `--edge-top`/`--edge-bot`), a full-bleed
  `.menu__media` banner (`width: 100vw` via `margin-inline: calc(50% - 50vw)`,
  `height: auto` so it shows the whole dish at the display width; top/bottom fade
  into `--bg-alt`) that sits above the `.menu__cols` list, a left-bleed
  `.about__media` that dissolves into the page, and a preview gallery. All
  swappable photos keep `class="gallery-img"`.
- **Gallery + lightbox:** `.gallery__grid` shows 3 preview tiles (now `<button>`s
  with a `data-lightbox` index and a `.gallery__zoom` "+" cue). The rest of the set
  lives in `#gallery-more` (`hidden`, loads on demand). `main.js` builds the
  lightbox image list from grid imgs **then** `#gallery-more` imgs (so preview
  indices line up), upscaling placeholder URLs `w=800`→`w=1600`. `.gallery__view`
  ("View Full Gallery") opens `#lightbox` at photo 1; tiles open at their own index.
  Lightbox supports prev/next, dot-free counter, Esc/arrow keys, backdrop-click
  close, body-scroll lock, and focus restore. Keep the "N Photos" count in the
  button in sync with the total image count.
- **CSS** is plain (no preprocessor). Use the existing custom properties and the
  `--ease` cubic-bezier for transitions. BEM-ish class names (`block__element--modifier`).
- **Scroll animations:** elements get class `.reveal`; `main.js` adds `.is-visible`
  via IntersectionObserver with a stagger. Respect `prefers-reduced-motion`.
- **Reviews carousel:** `.reviews` section between Gallery and Trust. Slides are
  `.review` figures stacked absolutely and cross-faded via `.is-active`; `main.js`
  builds the `.reviews__dot` nav into `#reviews-dots`. Rotation is **driven by the
  progress indicator** (`.reviews__bar`): the bar's CSS `@keyframes reviewProgress`
  fill sets the interval (6.5s — single source of truth), and its `animationend`
  advances the slide, so bar and timing never drift. Pause = freezing the bar's
  `animation-play-state` (on hover/focus/tab-hidden). Auto-rotation is disabled under
  `prefers-reduced-motion` (first review stays shown, progress bar hidden). Reviews
  are **real guest quotes** extracted from social DMs, lightly tidied for spelling
  and anonymised to initials/first name.
- **FAQ:** `.faq` section just before the footer, built from native
  `<details class="faq__item">`/`<summary class="faq__q">` (no JS — accessible by
  default). The `+`/`−` toggle is the `.faq__icon` pseudo-elements.
- **JS** is a single IIFE in `main.js`, ES5-safe, no dependencies.

## Deployment (CSS cache-busting)

`netlify.toml` caches everything under `/assets/*` for **1 year as immutable**.
This is great for performance but means browsers will never re-fetch a file unless
its URL changes. Whenever `styles.css` is updated, **bump the `?v=N` query string**
on the stylesheet link in `index.html` (e.g. `styles.css?v=2` → `styles.css?v=3`).
Failure to do this leaves live visitors with the old CSS against new HTML.

**The same applies to `main.js`** — it is linked as `main.js?v=N` for exactly this
reason. Bump that `?v=N` whenever `main.js` changes, or returning visitors keep
running stale JS against new HTML (this is what made the gallery lightbox button
appear dead — old cached `main.js` had no handler for it). Keep the CSS and JS
version numbers moving forward as you edit each file.

## Hard requirements (don't break these)

- **No phone number anywhere** on the site.
- Enquiry form must keep its Netlify wiring: `data-netlify="true"`,
  `netlify-honeypot="bot-field"`, the hidden `form-name` input, and the honeypot field.
  Submission is AJAX (`fetch` POST to `/`) so the inline `#form-success` panel can
  replace the form without a page reload — keep both in sync if you change field names.
- Gallery `<img>` tags must keep `class="gallery-img"` so photos can be swapped by
  filename replacement.
- All 14 menu items present; HelloFresh section keeps the `[DISCOUNT_CODE]` and
  `[HELLOFRESH_LINK]` tokens until real values are dropped in.
- Keep SEO head intact (title, meta description, OG tags, canonical, `lang`, semantic
  landmarks, `aria-label`s, `loading="lazy"` on below-fold images).

## Pending content (placeholders to replace before go-live)

- `[DISCOUNT_CODE]` and `[HELLOFRESH_LINK]` in the HelloFresh section
- Hero background, About `<img>`, and 6 gallery images (real photos — shoot 6 Jun 2026)
- `og:image` (`/assets/og-image.jpg`) — also referenced in the JSON-LD `image` field
- Favicon + touch icons (deferred to a later session)
