# Grid Nova Energy — Figma handoff notes

Source: Figma file `6DTvt2eIU5AQaFlVIl6jGC` ("grid nova website design").

Pages and node ids:

| Page | Node id | Contents |
| --- | --- | --- |
| 🖥 Website — Desktop | `0:1` | 13 page frames, 1440 wide |
| 🌐 Website — Arabic (RTL) | `40:1172` | Arabic homepage `40:1173` (1440 × 8357) |
| 📐 Design System | `5:2` | Boards 00–15 + appendix |
| 🛠 Dev Handoff | `69:1445` | Boards 16–21 |
| 📣 Portfolio | `72:1396` | Presentation mockups only |

Desktop page frames (all 1440 wide):

| Route | Frame | Node id | Height |
| --- | --- | --- | --- |
| `/` | Homepage | `8:2` | 8595 |
| `/services` | Services | `28:85` | 5628 |
| `/services/manufacturing` | Service detail — Manufacturing | `30:168` | 3532 |
| `/services/energy-generation` | Service detail — Energy Generation | `32:251` | 3450 |
| `/services/construction` | Service detail — Construction | `32:448` | 3450 |
| `/services/commissioning-testing` | Service detail — Commissioning & Testing | `32:645` | 3472 |
| `/projects` | Projects | `34:542` | 2892 |
| `/projects/[slug]` | Project detail — Ad-Dayir 2 | `35:632` | 3483 |
| `/about` | About | `37:722` | 5065 |
| `/news` | News | `38:812` | 2493 |
| `/contact` | Contact | `38:1021` | 2218 |
| `/careers` | Careers | `39:992` | 2676 |
| `/faq` | FAQ | `39:1253` | 2734 |
| `/ar` | Arabic home (RTL) | `40:1173` | 8357 |

Homepage sections (top → bottom), node ids:
Hero `11:2` (818) · Clients & partners marquee `23:2` (108) · Stats `12:17` (209) · About `12:34` (985) · Services `14:2` (939) · Projects `15:2` (860) · Who we are `31:251` (723) · Message from the CEO `31:279` (760) · Vision 2030 band `26:2` (977) · Contact `24:2` (834) · News `25:2` (827) · Footer instance `26:57` (555).

Design-system boards (page `5:2`): 00 Cover `60:1375` · 01 Brand & logo `60:1412` · 02 Colour `60:1454` · 03 Typography `60:1618` · 04 Spacing & radius `60:1771` · 05 Grid & layout `60:1856` · 06 Buttons & links `61:1375` · 07 Forms `61:1524` · 08 Navigation `61:1589` · 09 Footer `61:1601` · 10 Cards `61:1606` · 11 Icons `62:1375` · 12 Imagery `62:1580` · 13 Motion `62:1607` · 14 Accessibility `62:1645` · 15 Arabic (RTL) `62:1678` · Appendix Arabic font `62:1721`.

Dev handoff boards (page `69:1445`): 16 Overview & page map `67:1375` · 17 Tokens as code `67:1477` · 18 Component specs `67:1504` · 19 States & motion `67:1842` · 20 Responsive & edge cases `67:1966` · 21 Assets, SEO & a11y `67:2062`.

## Stack guidance from the handoff

Framework-agnostic static marketing site. Delivery order: tokens + fonts → nav & footer → homepage sections → inner pages (reuse the section patterns) → Arabic mirror via `dir="rtl"` → motion & QA.

Fonts: SF Pro on Apple devices, **Inter** as the metric-compatible web fallback. Arabic: **Almarai 400/700**. Self-host both.
Icons: **Lucide** (lucide-react), 24 px, stroke 2, inline SVG with `currentColor`.

## Tokens (tokens.css from board 17)

```css
:root {
  /* brand */
  --brand-blue: #1A68AF;  --brand-blue-dark: #0F4C85;
  --brand-green: #53A045; --brand-green-dark: #3A7A30;
  --brand-cyan: #00A6E8;  --brand-cyan-dark: #0A6FA3;
  /* neutrals */
  --neutral-navy: #0B1F33; --neutral-navy-deep: #061424;
  --neutral-900: #111827; --neutral-700: #374151; --neutral-500: #6B7280;
  --neutral-300: #D1D5DB; --neutral-200: #E5E7EB; --neutral-100: #F3F4F6;
  --neutral-50: #F8FAFC;  --neutral-white: #FFFFFF;
  /* tints & status */
  --tint-blue-50: #EAF2FA; --tint-green-50: #EEF7EC; --tint-cyan-50: #E6F6FD;
  --status-error: #D92D20; --status-error-50: #FEF3F2;
  /* roles */
  --color-text: var(--neutral-900); --color-text-muted: var(--neutral-700);
  --color-text-subtle: var(--neutral-500);
  --color-surface: var(--neutral-white); --color-surface-alt: var(--neutral-50);
  --color-surface-dark: var(--neutral-navy);
  --color-border: var(--neutral-200); --color-border-strong: var(--neutral-300);
  --color-action: var(--brand-green-dark);
  --color-link: var(--brand-blue); --color-link-hover: var(--brand-blue-dark);
  --color-focus: var(--brand-blue); --color-focus-on-dark: var(--brand-cyan);
  --color-error: var(--status-error);

  --space-4: 4px; --space-8: 8px; --space-12: 12px; --space-16: 16px; --space-20: 20px;
  --space-24: 24px; --space-32: 32px; --space-40: 40px; --space-48: 48px; --space-64: 64px;
  --space-80: 80px; --space-96: 96px; --space-120: 120px;
  --radius-6: 6px; --radius-10: 10px; --radius-16: 16px; --radius-24: 24px; --radius-full: 999px;
  --font-sans: "SF Pro", "Inter", system-ui, sans-serif;
  --font-arabic: "Almarai", "SF Pro", system-ui, sans-serif;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --dur-micro: 150ms; --dur-enter: 300ms; --dur-exit: 200ms; --dur-marquee: 40s;
  --container: 1200px; /* 1440 − 2 × space/120 */
  --gutter: var(--space-24);
  --section-y: 112px;
}
[dir="rtl"] { --font-sans: var(--font-arabic); }
@media (prefers-reduced-motion: reduce) { :root { --dur-micro: 0ms; --dur-enter: 0ms; --dur-exit: 0ms; } }
```

## Type styles (size/line-height/weight/tracking; AR = Almarai, +4 px line height, 700 for Semibold/Bold, 400 for Medium, no tracking, no uppercase)

| Class | EN | AR |
| --- | --- | --- |
| display-hero | 700 64/72, −1.5px | 700 64/76 |
| heading-h2 | 700 44/52, −1px | 700 44/56 |
| heading-h3 | 600 28/36, −0.4px | 700 28/40 |
| heading-h4 | 600 20/28, −0.2px | 700 20/32 |
| heading-h5 | 600 17/24 | 700 17/28 |
| stat-number | 700 56/60, −1.5px, tabular-nums | 700 56/64 |
| quote-l | 600 28/40, −0.3px | 700 28/46 |
| body-l | 400 18/30 | 400 18/34 |
| body-m | 400 16/26 | 400 16/30 |
| body-s | 400 14/22 | 400 14/24 |
| label-eyebrow | 600 13/16, +2px, uppercase | 700 13/18 |
| label-button | 600 15/20 | 700 15/22 |
| label-nav | 500 15/20 | 400 15/22 |
| label-caption | 500 13/18 | 400 13/20 |

`.prose { max-width: 660px }`. Mobile (< 768): Display/Hero 64 → 40/48, H2 44 → 32/40.

## Component specs (board 18)

- **Navigation / Dark** 1440 × 93: padding 22 / 120, logo 234 × 36, link gap 32, nav item 46 tall (pad 10 / 8), actions gap 20, button 48. Sticky; once scrolled > 24 px: background navy-deep 92 % + backdrop-blur 12 px + 1 px bottom border white 8 % (200 ms). Active route = 2 px underline (brand/green in component, brand/cyan per board 19 — use green as drawn on the homepage), label 100 %, `aria-current="page"`. Default label white 82 %, hover → 100 % (150 ms). Focus-visible: 2 px cyan ring, 2 px offset, radius 6. Language toggle: pill, border white 25 %, globe icon 16 + "العربية" (Almarai 15/22); swaps `/` ↔ `/ar` keeping the route.
- **Button / primary**: height 48, padding 24 × / 14 y, Label/Button 15/20, icon 18, gap 8, radius 10, fill brand/green-dark, text white. Hover: +10 % black overlay (150 ms). Active: scale(0.96) 120 ms, release 150 ms. Focus-visible: 2 px brand/blue ring (cyan on dark), 2 px offset. Loading: label stays, 16 px spinner, aria-busy. Disabled: neutral/100 fill, neutral/500 label.
- **Input**: height 52, padding 12 / 14, radius 10, border 1 neutral/300; focus border 2 brand/blue (no outline); error border 2 status/error + fill status/error-50 + message with icon, aria-invalid + aria-describedby. Label Label/Caption (13/18 neutral/700), gap 6; helper text neutral/500.
- **Section rhythm**: padding 112 top/bottom, 120 sides; header → content 56; header copy max 760 (intro 660).
- **Stats band**: height 205, padding 56 / 120, 4 equal cells with 1 × 64 dividers (neutral/200), number Stat/Number, label Body/S, gap 6.
- **Hero**: height 824 incl. nav; content padding 88 top, 104 bottom, 120 sides; copy column 700, stack gap 28; featured card 372 × 427, padding 28, radius 20, white 10 % + border white 25 % + backdrop-blur 16; pause control 130 × 42 pill at 120 from right, 32 from bottom. Overlays: navy-deep 85 → 0 % from the left; bottom fade 60 %. Video: `<video autoplay muted loop playsinline>` with poster, deferred until interactive, skipped on Save-Data; reduced motion shows the poster with a Play control.
- **Partner marquee**: stripe 105 high, padding 28; label (Label/Eyebrow + Heading/H5) + 1 × 40 divider + track; track gap 72, slot height 48, logos 26–46 high monochrome (`filter: grayscale(1); opacity: .75`); 40 s linear infinite, duplicated track; pause on hover / focus-within and via a control; edge fade 120 px; static row under reduced motion. Fewer than 4 logos: static centred row.
- **Service card** (4-up, 282 wide): radius 20, border 1 neutral/200, image 16:10 → 176, body padding 22 top / 24, gap 10, number eyebrow (brand/green-dark) + 24 px green rule, title H4 (neutral/900), tagline Label/Caption brand/blue, description Body/S neutral/500 clamp 4, "See more" link 15/20 + arrow 16. Whole card is the link.
- **Project card** (3-up, 384 wide): no border; image 3:2 → 256, radius 16, 1 px white 10 % outline, tag pill inset 16 (navy-deep 60 % + border white 20 %, 13/18); body gap 14; title H4 white clamp 2; meta row Body/S white 70 %, gap 18, icons 15 (building, map-pin, calendar); "Project details" link + arrow. Hover: image scale 1.03 @ 300 ms, link → blue-dark.
- **Card hover**: shadow `0 1px 2px rgba(0,0,0,.06), 0 8px 24px rgba(0,0,0,.08)`, image scale 1.03, link → brand/blue-dark, 300 ms ease-standard. Enter on scroll: opacity 0 → 1, translateY 12 → 0, siblings stagger 100 ms, once, at 20 % visibility.
- **Contact form card**: 520 wide, padding 36, radius 20, field rows gap 14, label gap 6, message 140 high, consent checkbox 20, submit full width 48.
- **CEO section**: portrait 440 × 520 (name on the overlay), quote column 664, gap 20, Quote/L with closing quote-mark icon 40, neutral/navy surface.
- **Footer**: padding 80 top, 32 bottom, 120 sides; 4 columns 260 / 260 / 220 / fill, gap 40; column stack gap 48; legal row Body/S white 60 %; neutral/navy surface.
- **FAQ accordion**: row is the `<button aria-expanded>`, panel height via `grid-template-rows 0fr → 1fr`, chevron rotates 180°, 250 ms.
- **Vision 2030 cards**: float in from 24 px below, 100 ms stagger; chips drift toward the cursor (60 ms lag), hidden under `(hover: none)` and off on mobile.

## Responsive (board 20) — collapse late, from the content

| Range | Grid | Changes |
| --- | --- | --- |
| ≥ 1280 | 12 col · margins 120 | As drawn (content 1200, scales to 1040 at 1280) |
| 1024–1279 | 12 col · margins 64 | Services 4-up → 3-up; projects 3-up stays; hero copy 60 % / card 40 %; footer 4 col; nav unchanged |
| 768–1023 | 6 col · margins 32 | Nav → logo + language toggle + hamburger (sheet from the right, 320 wide, inert background, Escape closes, focus trapped); hero card under the copy; cards 2-up; stats 2 × 2; CEO portrait above quote; footer 2 col; marquee unchanged |
| < 768 | 4 col · margins 16 | Hero 40/48, H2 32/40; all card grids 1-up; stats 1-up with dividers; contact form full width; Vision cards stack, chips off; footer 1 col; sticky bottom "Contact us" bar 56 high |
| < 480 | 4 col · margins 16 | Buttons full width; partner logos 24 high; tap targets ≥ 44 |

Content clamps: hero headline ≤ 60 chars (`text-wrap: balance`), H2 ≤ 60, card title clamp 2, service description clamp 4, news clamp 3, nav labels never wrap, stat ≤ 7 chars tabular-nums, quote ≤ 280 (24/36 above 220).

Edge cases: projects filter empty → "No projects in this category yet" + "Show all"; news empty → hide on home, "Stories coming soon" card on /news; careers empty → "No open roles right now — send your CV" + mailto. Images: neutral/100 skeleton, fade in 300 ms. Form errors inline + `role="status"` summary; submit failure `role="alert"`. No CEO photo → initials avatar on navy; no project image → desert-haze-lines placeholder; no partner logo → hide slot; no Arabic string → English fallback, keep RTL.

## Assets (board 21)

Logo horizontal colour / white: SVG (Design System › 01), PNG @2x 468 × 72. Stacked logo SVG + PNG 600 × 424. Favicon: mark only. Hero poster `hero-highvoltage-dusk` WebP 1440 × 824 (preload). Page-hero photos: services-hero, riyadh-night, about-control-room, desert-haze-lines, energy-aerial-solar, team-blueprints (WebP 1440 / 2880). Cards: svc-* 564 × 352, proj-* 768 × 512, news-* 768 × 480. Portraits 3:4 880 × 1040: ceo-mutlaq-alotaibi, chairman-tawfik-alsharhan, vp-faleh-alsharhan. Partner logos: PwC, Sieyuan (SVG), SPARK, Saudi Energy (PNG), grayscale.

## SEO / a11y / meta

`<html lang="en">` (`/ar` → `lang="ar" dir="rtl"`), title `{Page} — Grid Nova Energy`, hreflang en/ar pairs, `theme-color #061424`. One h1 per page (hero headline). Skip link first tab stop. `<nav aria-label="Main">`. Cards are one `<a>` named by the title. Focus ring 2 px on every stop. Hover gated by `@media (hover: hover)`. Targets ≥ 44 px on touch. RTL mirrors layout and arrows, not logos/photos; numbers stay LTR. Analytics events: cta_click, form_submit, video_pause, marquee_pause, language_toggle, faq_toggle, project_filter. Budget: LCP ≤ 2.5 s, CLS < 0.1, ≤ 300 KB JS on home.
