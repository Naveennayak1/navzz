# Navzz Portfolio — Next.js 14 + TypeScript

A production-ready, fully SSR portfolio with excellent SEO, built with Next.js 14 App Router, React 18, TypeScript, and Tailwind CSS.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy env file
cp .env.example .env.local
# Edit .env.local with your values

# 3. Add your photos
# Copy your 3 photos to:
#   public/images/photo1.jpg  (hotel corridor)
#   public/images/photo2.jpg  (mountain/golden hour)
#   public/images/photo3.jpg  (fountain/park)

# 4. Run dev server
npm run dev
# → http://localhost:3000

# 5. Build for production
npm run build
npm start
```

---

## Project Structure

```
navzz-portfolio/
├── app/                        # Next.js App Router (SSR pages)
│   ├── layout.tsx              # Root layout — fonts, metadata, JSON-LD
│   ├── page.tsx                # Home page (SSR)
│   ├── about/page.tsx          # About page (SSR)
│   ├── projects/
│   │   ├── page.tsx            # Projects list (SSR)
│   │   └── [slug]/page.tsx     # Individual project (SSG)
│   ├── gallery/page.tsx        # Gallery page (SSR)
│   ├── contact/page.tsx        # Contact page (SSR)
│   ├── api/contact/route.ts    # Contact form API handler
│   ├── sitemap.ts              # Auto-generated sitemap.xml
│   ├── robots.ts               # robots.txt
│   └── not-found.tsx           # 404 page
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Top nav + theme switcher + onboard tip
│   │   └── Footer.tsx          # Footer
│   ├── sections/
│   │   ├── HeroSection.tsx     # Hero + orbit canvas animation
│   │   ├── MarqueeBar.tsx      # Scrolling marquee strips
│   │   ├── ServicesSection.tsx # Services cards
│   │   ├── TechSection.tsx     # Tech stack with animated bars
│   │   ├── ExperienceSection.tsx # Experience + animated counters
│   │   ├── ProcessSection.tsx  # Process steps + HomeCTA
│   │   ├── GalleryClient.tsx   # Interactive drag-scroll gallery
│   │   └── ContactClient.tsx   # Contact form with react-hook-form
│   └── ui/
│       ├── ThemeProvider.tsx   # Theme context (mono/coffee/blue)
│       ├── CustomCursor.tsx    # Custom cursor animation
│       ├── useReveal.tsx       # Scroll reveal hook + wrapper
│       └── ScrollspySidebar.tsx # Fixed right-side scrollspy dots
│
├── lib/
│   ├── data.ts                 # ALL content — single source of truth
│   └── seo.ts                  # Metadata factory + JSON-LD schemas
│
├── styles/globals.css          # Global CSS + Tailwind + themes
├── public/
│   ├── images/                 # Add your photos here
│   └── site.webmanifest
│
└── .env.example
```

---

## SEO Features

| Feature | Implementation |
|---|---|
| SSR pages | All pages server-rendered via Next.js App Router |
| Metadata API | `buildMetadata()` in `lib/seo.ts` per page |
| JSON-LD | Person, WebSite, BreadcrumbList, SoftwareApplication schemas |
| Open Graph | og:title, og:description, og:image per page |
| Twitter Cards | summary_large_image per page |
| Sitemap | Auto-generated `/sitemap.xml` |
| robots.txt | Auto-generated `/robots.txt` |
| Canonical URLs | Set on every page |
| Semantic HTML | `<article>`, `<section>`, `<nav>`, `<figure>`, etc. |
| Alt text | All images have descriptive alt text |
| Page speed | Next.js Image optimisation, font display swap, no unused CSS |
| 404 | Custom not-found page |

---

## Customisation

### Update personal info
Edit `lib/data.ts` — the `SITE` object at the top controls name, email, phone, URLs, etc.

### Add projects
Add to the `PROJECTS` array in `lib/data.ts`. Each project automatically gets:
- Its own SSG page at `/projects/[slug]`
- JSON-LD SoftwareApplication schema
- Breadcrumbs
- Sitemap entry

### Change photos
Replace files in `public/images/` — update `GALLERY_PHOTOS` in `lib/data.ts` if filenames change.

### Enable email sending
In `app/api/contact/route.ts`, uncomment the nodemailer block and set your `SMTP_*` env vars.
Recommended: Use [Resend](https://resend.com) (free tier, excellent deliverability):
```bash
npm install resend
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```
Add env vars in Vercel dashboard → Settings → Environment Variables.

### Deploy to VPS / Docker
```bash
npm run build
npm start
# Runs on port 3000
```

---

## Performance Checklist
- [ ] Replace `https://navzz.dev` in `lib/data.ts` with your real domain
- [ ] Add Google Search Console verification token in `lib/seo.ts`
- [ ] Generate a real OG image at `public/og/default.png` (1200×630)
- [ ] Add real favicon files to `public/`
- [ ] Connect SMTP or Resend for contact form emails
- [ ] Set `NEXT_PUBLIC_SITE_URL` in `.env.local`
