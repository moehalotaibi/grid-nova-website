# Grid Nova Energy — website front end

React 19 + Vite + TypeScript + Tailwind CSS v4 + React Router v7, built from the Figma file
"grid nova website design" (`6DTvt2eIU5AQaFlVIl6jGC`). The design-system tokens, component specs and
responsive rules from the file's Dev Handoff boards are summarised in [docs/figma-handoff.md](docs/figma-handoff.md).

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build → dist/
npm run preview    # serve the production build
```

## Routes

| English | Arabic mirror | Source |
| --- | --- | --- |
| `/` | `/ar` | `src/pages/Home.tsx` + `src/sections/home/*` |
| `/services`, `/services/:slug` | `/ar/services…` | `src/pages/Services.tsx`, `ServiceDetail.tsx` |
| `/projects`, `/projects/:slug` | `/ar/projects…` | `src/pages/Projects.tsx`, `ProjectDetail.tsx` |
| `/news`, `/news/:slug` | `/ar/news…` | `src/pages/News.tsx`, `Article.tsx` (`src/data/news.ts`) |
| `/careers`, `/careers/:slug`, `/careers/apply?role=` | `/ar/careers…` | `src/pages/Careers.tsx`, `JobDetail.tsx`, `Apply.tsx` (`src/data/careers.ts`) |
| `/about`, `/contact`, `/faq` | `/ar/…` | `src/pages/*.tsx` |
| `/privacy`, `/terms`, `/cookies` | `/ar/…` | `src/pages/Legal.tsx` (`src/data/legal.ts`) |

Routes are declared once in `src/App.tsx` and mounted both at `/` and under `/ar`.

## Structure

```
src/
  styles/index.css        Tailwind theme (tokens), type classes, layout + motion utilities
  i18n/                   LocaleProvider (lang/dir, path(), togglePath), strings.ts (en + ar)
  components/ui           Button, SectionHeader/Eyebrow, SmartImage, Logo, SocialIcon
  components/layout       Header (sticky nav + dropdown + mobile sheet), Footer, PageHero, CtaBand, SiteLayout
  components/cards        ServiceCard, ProjectCard, NewsCard
  components/forms        ContactForm (validation, status/alert regions, loading state)
  sections/<page>/        One component per Figma section
  data/                   Content (services, projects, news, team, faq…) with {en, ar?} fields
  hooks/                  useReveal (enter-on-scroll), usePageMeta (title/description/hreflang)
public/images/            WebP 1x + @2x generated from the Figma/Unsplash sources
```

## Content and languages

- UI strings live in `src/i18n/strings.ts` (shared) and `src/i18n/pages/*.ts` (per page); content lives in
  `src/data/*.ts`. Every localisable field is `{ en, ar? }` — Arabic falls back to English per key.
- Content was migrated from the previous website (energy.shrhan.com, English + Arabic) and its LinkedIn page;
  the company name was updated to Grid Nova Energy. News articles keep a `source` link to the original post.
- `useLocale()` gives `s` (merged strings), `l(field)` (localised value), `path(to)` (adds `/ar`), `isAr`.
- `dir="rtl"` on `<html>` mirrors the layout; the stylesheet uses logical properties and swaps the font to Almarai.

## Images

Source photos are kept out of the build in `assets-src/images/<name>-source.(jpg|png)`; only the generated
`public/images/<name>.webp` + `<name>@2x.webp` ship. Regenerate the homepage set with
`node scripts/optimize-images.mjs`, or any single image with
`node scripts/make-webp.mjs <source> <name> <width> <height>` (sizes follow handoff board 21).

## Things to supply before launch

- **Hero video**: drop the loop at `public/videos/hero-highvoltage-dusk.mp4` (MP4 H.264, 1440×824, ≤ 6 MB,
  8–12 s, no audio). Until then the poster frame shows and the pause control stays hidden.
- **Sitemap**: `node scripts/make-sitemap.mjs https://your-domain` regenerates `public/sitemap.xml` (every route in EN and AR with hreflang alternates) from the data files.
- **Contact form endpoint**: set `VITE_CONTACT_ENDPOINT` (see `.env.example`) to a URL that accepts a JSON POST.
- **Job application endpoint**: set `VITE_CAREERS_ENDPOINT` to a URL that accepts a multipart/form-data POST (all form fields plus the CV file as `cv`). Unset, the form simulates a successful submission.
  Without it the form simulates a successful send.
- **Company profile PDF** at `public/grid-nova-company-profile.pdf`, real social URLs in `src/data/site.ts`,
  and an Open Graph image (stacked logo on navy, 1200×630).
- Real X / Instagram URLs (the old site had placeholders, so only LinkedIn is shown), and the exact project
  statuses — the old site lists every project as "in progress" even where the end date has passed.
