# Product Requirements Document
## Cooking with Shabba — Luxury Private Dining Landing Page

**Prepared by:** Mistuzzo Marketing  
**Date:** 2 June 2026  
**Domain:** cookingwithshabba.co.uk  
**Hosting:** Netlify  
**Status:** Ready to build

---

## 1. Project Context

Cooking with Shabba is a Caribbean catering business run by Shabba — a home cook and food creator based in Gloucester, UK, with a 5-Star Food Hygiene Rating and Halal certification. The business is transitioning from Jamaican food platters into the luxury private dining space. This website is the first digital presence for the brand in this new direction, and needs to reflect where the business is heading — premium, elevated, and distinct — rather than where it has been.

The site must do one thing above all else: **convert visitors into enquiries**.

---

## 2. Design Direction

### Aesthetic
Luxury editorial — dark, refined, high-contrast. Think fine dining menu meets editorial magazine. Not a generic "restaurant website." No stock-looking layouts, no predictable hero + subtitle + CTA patterns.

### Palette
- Background: near-black `#0A0A0A`
- Text: off-white `#F5F0E8`
- Gold accent: `#C9A84C` (warm, not garish)
- Muted gold: `#8B7236` (for borders, dividers)
- Surface: `#111111` (cards, sections)

### Typography
- Display / headings: **Cormorant Garamond** (Google Fonts) — elegant, editorial serif
- Body / UI: **DM Sans** (Google Fonts) — clean, modern contrast to the serif
- Never use Inter, Roboto, Arial, or system fonts

### Motion
- Subtle scroll-reveal fade-ins (staggered, not uniform)
- Smooth section transitions
- Hover states on nav, buttons, and cards that feel intentional
- No aggressive animations — premium restraint

### Layout
- Full-width sections with generous whitespace
- Asymmetric compositions where appropriate
- Fine gold lines / rules as dividers — not full borders
- Section backgrounds alternate between `#0A0A0A` and `#0F0F0F` — barely perceptible depth
- No card grids with equal padding everywhere

---

## 3. Tech Stack

- **HTML5 / CSS3 / Vanilla JS** — single file per section, or single `index.html`
- **No frameworks** — pure HTML/CSS/JS
- **Google Fonts** — Cormorant Garamond + DM Sans via CDN
- **Netlify Forms** — for enquiry form submission (no backend needed)
- **Netlify hosting** — static site
- **No jQuery**, no unnecessary dependencies

---

## 4. Site Structure

Single-page scrollable site. All sections on one `index.html`. Nav links scroll to anchors.

### Sections (in order):

1. **Navigation**
2. **Hero**
3. **About**
4. **Menu**
5. **Gallery**
6. **Trust / Credentials**
7. **Enquiry Form**
8. **HelloFresh**
9. **Footer**

---

## 5. Section Specifications

---

### 5.1 Navigation

**Type:** Fixed, transparent on load — darkens on scroll  
**Logo/Brand:** "Cooking with Shabba" in Cormorant Garamond, small caps styling  
**Links:** About | Menu | Gallery | Enquire  
**CTA button:** "Book an Experience" — gold outlined button, top right  
**Behaviour:** Smooth scroll to section anchors  
**Mobile:** Hamburger menu — full-screen overlay on mobile  

---

### 5.2 Hero

**Purpose:** Establish the brand immediately. Luxury, food, Caribbean elegance.

**Layout:**
- Full viewport height (`100vh`)
- Dark overlay over a placeholder image (full bleed background)
- Asymmetric text composition — NOT centred, NOT left-aligned with a subtitle directly below
- Brand name large and dominant
- Tagline sits separately, not as a subtitle — treated typographically as a secondary element with spacing

**Content:**
- Brand name: **Cooking with Shabba**
- Tagline: **Where Caribbean Culture Meets Fine Dining**
- Single CTA: "Enquire Now" — gold button, scrolls to form

**Placeholder image:** Dark food/dining scene — use `https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600` or similar dark, atmospheric food image

**Design notes:**
- No subtitle text directly under the main heading
- Gold thin horizontal rule above or below the tagline
- The CTA should feel like it's discovered, not shoved in the user's face

---

### 5.3 About

**Purpose:** Introduce Shabba personally and build trust.

**Layout:**
- Two-column on desktop: image left, text right (or reversed — asymmetric)
- Single column on mobile
- Image: placeholder portrait/food image

**Content (use this copy — rewrite tone but preserve meaning):**

> My name is Shabba, a passionate lifestyle chef dedicated to bringing people together through high quality Caribbean cuisine, luxury presentation and exceptional service. What started as a love for cooking has grown into a luxury dining brand focused on celebrating Caribbean flavours, creating memorable experiences, and sharing the rich culture behind every dish.
>
> From perfectly seasoned dishes to comforting classics, every meal is prepared with passion, creativity and attention to detail, using recipes and flavours inspired by the vibrant heritage of the Caribbean.
>
> Whether it's private events, celebrations, corporate gatherings or special occasions, my goal is simple: to deliver delicious food, premium presentation and a warm atmosphere that leaves lasting impressions.
>
> At Cooking with Shabba, food is more than just a meal. It's culture, energy, tradition and luxury all served on one plate.

**Slogan to include visually (pull quote treatment):**
> *"Where Caribbean Culture Meets Fine Dining."*

**Design notes:**
- Pull quote in large Cormorant Garamond italic, gold colour, breaking the column grid
- Credentials visible but subtle: 5★ Food Hygiene | Halal Certified

---

### 5.4 Menu

**Purpose:** Show the food offering. Make it feel like a restaurant menu, not a list.

**Layout:**
- Editorial menu layout — think printed fine dining menu, not a card grid
- Items listed in an elegant typographic treatment
- Two columns on desktop, single on mobile
- Thin gold dividing lines between items

**Heading:** Something like "The Menu" or "What We Serve" — in display serif

**Items (all 14 dishes):**
1. Rice and Peas
2. White Rice
3. Curry Goat
4. Fried Chicken
5. BBQ Drumsticks
6. Mac and Cheese
7. Honey Glazed Lamb Chops
8. Beef Burger Sliders
9. Brown Stew Chicken Spring Rolls
10. Plantain
11. Salad
12. Pasta Salad
13. Coleslaw
14. Cheesecake Cups

**Note below menu:** Small italicised text — *"Menu items and flavours can vary. Get in touch to discuss your event requirements."*

**Design notes:**
- No icons, no prices
- Each item in Cormorant Garamond, body description (if added later) in DM Sans
- Section background slightly different to hero — use `#0F0F0F`

---

### 5.5 Gallery

**Purpose:** Showcase food photography. Initially placeholder images — designed to be swapped out easily.

**Layout:**
- Masonry or editorial asymmetric grid — NOT equal-sized tiles in a row
- Mix of portrait and landscape aspect ratios
- On hover: subtle gold border appears + slight scale

**Placeholder images:** 6–8 images using Unsplash dark food photography  
Suggested URLs (or similar):
- `https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800`
- `https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800`
- `https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800`
- `https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800`
- `https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800`
- `https://images.unsplash.com/photo-1484980972926-edee96e0960d?w=800`

**Design notes:**
- Images should be HTML `<img>` tags with clear class names (e.g. `.gallery-img`) so they can be swapped by filename replacement
- Alt text: `"Cooking with Shabba — private dining event"` (consistent, generic until real photos arrive)
- Add a small label: *"Gallery updated as events happen — follow [@cookingwithshabba](https://www.instagram.com/cookingwithshabba) for the latest."*

---

### 5.6 Trust / Credentials

**Purpose:** Reinforce credibility without being a generic badge section.

**Layout:**
- Horizontal band — three credentials with minimal iconography or typographic treatment
- NOT three equal cards with icons — something more editorial

**Items:**
1. **5-Star Food Hygiene Rating** — awarded by local authority
2. **Halal Certified** — all food prepared to Halal standards
3. **Nationwide** — available across the UK for private events

**Design notes:**
- Gold numbers or decorative elements
- Could be a horizontal scrolling marquee on mobile
- Feels like a credentials ribbon, not a "features" section

---

### 5.7 Enquiry Form

**Purpose:** Primary conversion point. Every section leads here.

**Anchor:** `id="enquire"`

**Layout:**
- Full-width section, dark background
- Form centred, max-width ~600px
- Elegant field styling — thin gold bottom-border inputs, no boxy outlines

**Netlify Forms integration:**
```html
<form name="enquiry" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="enquiry" />
  <p hidden><input name="bot-field" /></p>
  <!-- fields below -->
</form>
```

**Fields:**
| Field | Type | Required |
|---|---|---|
| Full Name | text | Yes |
| Email Address | email | Yes |
| Event Type | text (placeholder: "e.g. birthday, corporate, private dinner") | Yes |
| Event Date | date | No |
| Number of Guests | number | No |
| Message / Additional Details | textarea | No |

**Below the form:** Small italic note —  
*"Have a question about a specific dish or flavour? Ask us in the message field — we're happy to accommodate."*

**Submit button:** "Send Enquiry" — full-width gold button on mobile, normal width on desktop

**After submit:** Netlify default thank you page (acceptable for now)

**Privacy note:** One line below button — *"Your information is only used to respond to your enquiry. See our privacy policy."* — with a link placeholder `href="/privacy"`

---

### 5.8 HelloFresh Partnership

**Purpose:** Brief mention of the HelloFresh affiliation and discount code.

**Layout:**
- Compact section — not a full-page feature
- Tasteful, not promotional-feeling
- Dark background, simple layout

**Content:**
- Shabba partners with HelloFresh
- Visitors can get **50% off their first HelloFresh box** using his discount code
- Link/button redirects to HelloFresh

**Note:** The actual discount code and HelloFresh affiliate link should be added as a placeholder — use `[DISCOUNT_CODE]` and `[HELLOFRESH_LINK]` as tokens in the HTML so they can be dropped in.

**Design notes:**
- Small HelloFresh logo or text reference acceptable
- Tone: personal recommendation, not an advertisement
- Something like: *"As a HelloFresh partner, I recommend them for everyday home cooking. Use code [DISCOUNT_CODE] to get 50% off your first box."* with a CTA button "Claim Discount"

---

### 5.9 Footer

**Purpose:** Contact, social links, legal.

**Content:**
- Brand name: Cooking with Shabba
- Email: Cookingwithshabba@outlook.com (linked as `mailto:`)
- **No phone number displayed**
- Social links:
  - Instagram: https://www.instagram.com/cookingwithshabba
  - Facebook: https://www.facebook.com/share/166CYkotxp/?mibextid=wwXIfr
  - TikTok: https://www.tiktok.com/@cookingwithshabba
- Copyright: © 2026 Cooking with Shabba. All rights reserved.
- Privacy Policy link: `/privacy` (placeholder — page to be created separately)
- Halal | 5★ Hygiene (small credential text)

**Design notes:**
- Minimal — three columns on desktop (brand/tagline | contact | socials)
- Thin gold top border
- Social icons: SVG inline icons (Instagram, Facebook, TikTok) — no icon font libraries

---

## 6. Responsive Behaviour

| Breakpoint | Layout |
|---|---|
| Mobile (`< 768px`) | Single column, hamburger nav, stacked sections |
| Tablet (`768–1024px`) | Two columns where applicable, condensed nav |
| Desktop (`> 1024px`) | Full layout as specified |

**Mobile priorities:**
- Enquiry form must be fully functional and easy to use on mobile
- Hero CTA must be thumb-reachable
- Menu items must be legible at small size
- Gallery collapses to 2-column or single-column

---

## 7. Performance & SEO

### SEO
- `<title>`: Cooking with Shabba | Luxury Private Dining | Caribbean Cuisine | UK
- `<meta name="description">`: "Cooking with Shabba offers luxury private dining buffet experiences across the UK. Caribbean cuisine, premium presentation, and unforgettable events. Enquire now."
- Semantic HTML throughout: `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`, proper heading hierarchy (`h1` → `h2` → `h3`)
- Each section has an `aria-label`
- Open Graph tags:
  - `og:title`: Cooking with Shabba | Luxury Private Dining
  - `og:description`: Caribbean cuisine. Premium presentation. Unforgettable events.
  - `og:image`: `/assets/og-image.jpg` (placeholder)
  - `og:url`: https://cookingwithshabba.co.uk
- Alt text on all images
- `lang="en"` on `<html>`
- Canonical tag: `<link rel="canonical" href="https://cookingwithshabba.co.uk" />`

### Performance
- Google Fonts loaded with `display=swap`
- Images with `loading="lazy"` on all below-fold images
- Minify inline CSS where practical
- No render-blocking scripts — JS at bottom of `<body>` or `defer`

---

## 8. GDPR & Legal

- **Privacy Policy page** — `/privacy.html` — can be a simple placeholder for now with standard language
- **Cookie notice** — minimal inline banner (no analytics on this site, so simple consent suffices)
- Enquiry form data goes directly to Netlify — no third-party CRM
- No tracking pixels, no Google Analytics (unless added later by client)

---

## 9. File Structure

```
/
├── index.html
├── privacy.html          (placeholder privacy policy)
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       ├── hero-placeholder.jpg
│       ├── about-placeholder.jpg
│       └── gallery/
│           ├── gallery-1.jpg
│           ├── gallery-2.jpg
│           └── ...
└── netlify.toml          (optional redirect/header config)
```

---

## 10. Content Tokens (Placeholders)

Items to be filled in before go-live:

| Token | Description |
|---|---|
| `[DISCOUNT_CODE]` | HelloFresh discount code |
| `[HELLOFRESH_LINK]` | HelloFresh affiliate/referral URL |
| `[OG_IMAGE]` | Open Graph image — real photo after shoot |
| Gallery images | Replace with real shoot photos (6 June 2026) |
| Hero image | Replace with real photo after shoot |
| About image | Replace with real photo after shoot |

---

## 11. Out of Scope (v1)

- No CMS integration
- No payment or booking system
- No blog
- No multi-page navigation beyond index + privacy
- No Google Analytics (can be added later)
- No WhatsApp widget

---

## 12. Acceptance Criteria

- [ ] All 9 sections present and scrollable
- [ ] Enquiry form submits via Netlify Forms
- [ ] No phone number visible anywhere on the page
- [ ] Mobile-responsive on 375px+ viewports
- [ ] All 14 menu items listed
- [ ] Gallery contains 6+ placeholder images with swap-ready class names
- [ ] Cormorant Garamond + DM Sans loaded correctly
- [ ] Gold/dark colour scheme throughout — no white backgrounds
- [ ] SEO meta tags present
- [ ] GDPR cookie notice present
- [ ] Privacy policy page exists (placeholder acceptable)
- [ ] HelloFresh section with `[DISCOUNT_CODE]` and `[HELLOFRESH_LINK]` tokens
- [ ] Social links correct (Instagram, Facebook, TikTok)
- [ ] Email in footer linked as `mailto:`
- [ ] Smooth scroll navigation working
- [ ] Fixed nav darkens on scroll
