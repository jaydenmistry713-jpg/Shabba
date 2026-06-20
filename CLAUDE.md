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
assets/js/main.js        Nav scroll, mobile menu, scroll reveal + image unveil, photo parallax, reviews carousel, gallery lightbox, AJAX form submit, cookie notice
assets/images/          Real brand photos (hero, about + about-detail accent, 2 food bands, lifestyle band, menu, 6 gallery tiles + lightbox), the transparent chef logo (logo.png), favicons, og-image
site.webmanifest        PWA manifest (icon-192/512, theme colour)
shabba_PRD.md           Full product spec
prompt.txt              Original build brief
```

Real shoot photos live in `assets/images/` (optimised JPGs), processed from the
originals in `shabbaimages/` (untracked) by `process-images.cjs` (gitignored;
re-run with `node process-images.cjs` — it borrows `sharp` from the global
netlify-cli). **All photos are kept in their natural colour** (the `colour()` job:
mild saturation/brightness + a soft vignette, baked in). The white-studio portrait/
lifestyle shots therefore read brighter than the dark sections — the vignette plus
the CSS edge-fades (about bleed, band/menu fades) and a light CSS `brightness()`/
`contrast()` on `.about__media`/`.band__img`/`.gallery__cell`/`.menu__media` settle
them in without recolouring. (A warm low-key `duotone()` job still exists in the
script if a toned look is ever wanted again, but it is not used.) Favicons + the OG
image were generated from the chef-badge logo and the food spread respectively.

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
- **Woven imagery:** every photo is placed with intent and distributed through the
  page, never pooled — full-bleed `.band` strips between sections (edges fade into
  the adjacent section colour via `--edge-top`/`--edge-bot`), including a
  `.band--lifestyle` brand/at-home strip between the gallery and reviews; a full-bleed
  `.menu__media` banner (`width: 100vw` via `margin-inline: calc(50% - 50vw)`;
  top/bottom fade into `--bg-alt`) above the `.menu__cols` list — a two-up grid of
  two `.menu__list` columns (items 1–7 / 8–14) that **stays two columns on mobile too**
  (the `≤600px` rule keeps `1fr 1fr` and just shrinks `.menu__name`/gaps so the longer
  dishes fit); a left-bleed
  `.about__media` portrait that dissolves into the page, with a small overlapping
  colour food detail (`.about__accent`, hidden when the layout stacks) for an
  art-directed layered feel; and a curated gallery. All swappable photos keep
  `class="gallery-img"`.
- **Gallery + lightbox:** `.gallery__grid` is a curated **asymmetric mosaic** of 6
  `<button>` tiles (portraits interleaved with food; sizes via
  `--tall`/`--wide`), each with a `data-lightbox` index and a `.gallery__zoom` "+"
  cue. Three extra food shots live in `#gallery-more` (`hidden`, lightbox-only).
  `main.js` builds the lightbox list from grid imgs **then** `#gallery-more` imgs
  (so tile indices line up) — 9 total; the `w=800`→`w=1600` upscale `.replace` is a
  harmless no-op on the local files. `.gallery__view` ("View Full Gallery") opens
  `#lightbox` at photo 1; tiles open at their own index. Lightbox supports prev/next,
  dot-free counter, Esc/arrow keys, backdrop-click close, body-scroll lock, and focus
  restore. Keep the "N Photos" count in the button in sync with the total image count.
- **CSS** is plain (no preprocessor). Use the existing custom properties and the
  `--ease` cubic-bezier for transitions. BEM-ish class names (`block__element--modifier`).
- **Scroll animations:** text/elements get `.reveal` (fade-up); image wrappers get
  `.reveal-img`, which scales + fades the **direct `<img>` child** into place (used on
  about/menu media and every gallery tile). `main.js` observes both via one IntersectionObserver
  and adds `.is-visible` with a stagger. Full-bleed photos (`hero__media`, `.band__img`)
  carry a `data-parallax="<px>"` attribute and drift slower than the page; `main.js`
  applies an rAF-throttled transform with a computed scale so no edge gap is exposed.
  Everything is disabled/neutralised under `prefers-reduced-motion`.
- **Reviews carousel:** `.reviews` section between the lifestyle band and Trust. Slides are
  `.review` figures stacked absolutely and cross-faded via `.is-active`; `main.js`
  builds the `.reviews__dot` nav into `#reviews-dots`. Rotation is **driven by the
  progress indicator** (`.reviews__bar`): the bar's CSS `@keyframes reviewProgress`
  fill sets the interval (6.5s — single source of truth), and its `animationend`
  advances the slide, so bar and timing never drift. Pause = freezing the bar's
  `animation-play-state` (on hover/focus/tab-hidden). Auto-rotation is disabled under
  `prefers-reduced-motion` (first review stays shown, progress bar hidden). Reviews
  are **real guest quotes** extracted from social DMs, lightly tidied for spelling
  and anonymised to initials/first name.
- **Hero:** centred stack — the chef logo emblem (`.hero__logo`, `assets/images/logo.png`,
  the illustrated chef badge as a clean grey **medallion** — a transparent circle with
  the chef's face inside and **only his hat protruding from the top**; the rest of the
  silhouette is cut to the circle, never ragged into the jacket), eyebrow, an oversized
  centred `.hero__title` ("Cooking / with / Shabba"), a tagline flanked by two gold
  `.rule`s, and the CTA; centred `.hero__scroll` cue at the bottom. The logo is
  intentionally a different (illustrated) style from the photographic luxury theme —
  keep it small. Regenerate it with `generate-logo.cjs` (see Local tooling).
- **FAQ:** `.faq` section just before the footer, built from native
  `<details class="faq__item">`/`<summary class="faq__q">` (no JS — accessible by
  default). The `+`/`−` toggle is the `.faq__icon` pseudo-elements.
- **JS** is a single IIFE in `main.js`, ES5-safe, no dependencies.

## Deployment (cache-busting)

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

**It applies to images too.** If you re-process an image but keep the same filename
(e.g. re-toning `band-lifestyle.jpg`), its content changes under a URL the cache
treats as immutable — returning visitors keep the stale photo. Append/bump a `?v=N`
on that specific `src` (the lightbox's `w=…` `.replace` ignores other params, so it's
safe). New filenames don't need it. Current versions: `styles.css?v=15`,
`main.js?v=8`, and `band-lifestyle.jpg?v=2` / `gallery-4.jpg?v=2` / `logo.png?v=2`.

## Local tooling (not shipped — all gitignored)

Dev-only helpers in the repo root, plus the `node_modules`/`package*.json` they pull
in (the site itself still has **no build step**):

- `process-images.cjs` — re-crops `shabbaimages/` originals into `assets/images/`
  and bakes the natural-colour treatment (soft vignette + mild tone). `node
  process-images.cjs`. Borrows `sharp` from the global netlify-cli install. Processing
  is deterministic, so unchanged jobs produce byte-identical output (only genuinely
  retuned images show as modified in `git status` — handy for knowing which need a
  `?v` bump).
- `generate-logo.cjs` — rebuilds the hero chef emblem (`assets/images/logo.png`) from
  the source illustration (`shabbaimages/28007cd5-…Shabaka Robinson.jpg`). Detects the
  grey medallion circle (centre/radius are baked into the script), keeps the disc as a
  clean anti-aliased circle, and reconstructs the protruding hat by flood-filling the
  light-grey studio background away from the borders (the hat's dark sketch outline
  stops the fill). Borrows `sharp` from the global netlify-cli install. `node
  generate-logo.cjs`. Bump `logo.png?v=N` in `index.html` after re-running.
- `_shot.cjs` — visual QA. Drives installed Chrome via `puppeteer-core` (headless),
  scrolls to fire lazy-load + reveals, then screenshots each section at desktop
  (1440) and mobile (390) to `_shot-{d,m}-*.png`. **Always re-render and look** after
  image/layout changes — this is how the empty-gallery and head-crop bugs were caught.
- `_diag.cjs` — one-off DOM probe (e.g. reading computed `clip-path` / `.is-visible`
  state) when a screenshot shows something wrong but the cause isn't obvious.

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

Done: real shoot photos (all natural colour) woven through the page with intent —
food in hero/bands/menu, a portrait + overlapping food accent in about, and a curated
gallery mosaic, plus a lifestyle/brand band between gallery and reviews; image
scroll-reveals (`.reveal-img`) and parallax drift; favicons + touch icons; the OG image
(`/assets/og-image.jpg`, also used by the JSON-LD `image`); and the reviews carousel.
