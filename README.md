# Behind the Sun (پشت خورشید)

A thoughtful home for the world's oldest questions — astrology, tarot, Persian poetry (Hafez), and numerology.

## Stack

- **Framework**: Next.js 15 (App Router) + React 19
- **Styling**: Tailwind CSS + custom Behind the Sun design tokens
- **Database & Auth**: Supabase (Postgres + Auth + Storage)
- **Payments**: Stripe (subscriptions + one-time)
- **AI**: Anthropic Claude API for personalized readings
- **Astrology**: Prokerala API (Swiss Ephemeris, Placidus)
- **Email**: Resend
- **Hosting**: Vercel

## Getting started

```bash
# Install dependencies
npm install

# Copy environment template and fill in values
cp .env.example .env.local

# Run dev server
npm run dev
```

Open http://localhost:3000

## Project structure

```
app/
  layout.tsx           Root layout with fonts & metadata
  page.tsx             Landing page (classic SaaS)
  globals.css          Global styles + Tailwind
  astrology/           Astrology door pages
  tarot/               Tarot door pages
  hafez/               Hafez door pages
  numerology/          Numerology door pages
  (auth)/              Auth pages (sign-in, sign-up)
  api/                 API routes (Stripe webhooks, chart calc, etc.)
components/            Reusable UI components
lib/
  supabase/            Supabase clients (server + browser)
  utils.ts             Utility functions
public/                Static assets
```

## Design system

Behind the Sun uses a dual-mode design:

**SaaS mode** (marketing, dashboard, forms): light `paper` background, sans-serif, functional
**Reading mode** (birth chart, Hafez, tarot readings): dark `night` background, italic serif, cinematic

See `tailwind.config.ts` for full color palette.

## Deployment

Auto-deploys to Vercel on push to `main`. Preview deployments for every PR.

## License

Proprietary. © 2026 Behind the Sun / Divan Group.
