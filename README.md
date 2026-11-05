# Dr. Anameka S Panda – website

A fully dynamic website and content-management dashboard for Dr. Anameka S Panda's consultancy in Vedic astrology, Vastu, graphology, graphotherapy, remedial practices and coaching.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · Supabase (Postgres, auth, row-level security) · Cloudinary · Resend · GA4 / Google Tag Manager · Three.js via React Three Fiber · Framer Motion (lightbox and carousel only).

## Quick start

```bash
npm install
cp .env.example .env.local      # fill in what you have; everything is optional for a first look
npm run dev                     # http://localhost:3000
```

The site runs **without any keys**: until Supabase is configured, every page renders from the starter content in `lib/content/*.json`. Forms validate and respond normally but nothing is stored. Admin requires Supabase.

To go fully live, follow **[docs/SETUP.md](docs/SETUP.md)** (about 30 minutes), then **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)**.

## What's included

| Area | Where |
|---|---|
| Public pages (18 + 13 service pages + 5 programme pages + articles) | `app/(site)/` |
| Admin dashboard | `app/admin/` – overview, enquiries & bookings, subscribers, analytics, 14 content modules (including Programmes), settings, users & roles |
| Admin content modules (one config drives all forms) | `lib/admin/collections.ts` |
| Database schema with row-level security | `supabase/schema.sql` |
| Starter content + seed | `lib/content/*.json` → `npm run seed:generate` → `supabase/seed.sql` |
| SEO: metadata, JSON-LD, sitemap, robots, redirects | `lib/seo.ts`, `app/sitemap.ts`, `app/robots.ts`, `lib/redirects.mjs` |
| Enquiry / booking / newsletter APIs | `app/api/` |
| Analytics events | `lib/analytics.ts`, `components/Analytics.tsx` |
| Tests | `tests/site.test.mjs` (API/SEO), `tests/ui_test.py` (browser) |

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build && npm start` | Production build and server |
| `npm run typecheck` | TypeScript check |
| `npm test` | API, SEO and security checks against `BASE_URL` (default `http://localhost:3000`) |
| `npm run seed:generate` | Rebuild `supabase/seed.sql` from `lib/content/*.json` |
| `python tests/ui_test.py` | Browser tests (booking flow, analytics, mobile menu, accessibility) |

## Content principles built into the system

These come from the project brief and are enforced in code, not just by convention:

- **No invented credentials.** Profile sections (qualifications, certifications, achievements, experience) start as placeholders marked *unverified*. Unverified sections are never shown publicly; an editor must tick “I have verified every fact” first.
- **No unapproved testimonials.** The database refuses to publish a testimonial or client story unless *client permission confirmed* is ticked, and the admin form records how consent was obtained.
- **No invented contact details.** Email and office address are blank environment variables; the site hides them until set, and structured data omits them.
- **No guaranteed outcomes.** Every service page states its limits alongside its benefits, and the disclaimer is linked from booking.

## Documentation

- **[docs/CONTENT-TO-CONFIRM.md](docs/CONTENT-TO-CONFIRM.md) – start here: details added from Ma'am's flyers that she needs to confirm**

- [docs/SETUP.md](docs/SETUP.md) – Supabase, Cloudinary, email, analytics, first admin user
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) – Vercel deployment, domain, Search Console, go-live checklist
- [docs/ADMIN-GUIDE.md](docs/ADMIN-GUIDE.md) – plain-language guide for whoever manages content
- [docs/TESTING.md](docs/TESTING.md) – what was tested, results, and what still needs testing with live keys
