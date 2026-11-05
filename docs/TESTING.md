# Testing report

Tested on 4 November 2026 against a production build (`next build && next start`) with Next.js 15.5.28 and Node v22.23.4.

## Update: content from the flyers (5 November 2026)

Added five programme pages, the Astro-Vastu service, the portrait and logo, contact email and city, FAQs, two articles and draft items. After the update:

- **Build:** passes, 50 pages.
- **TypeScript:** no errors.
- **Database:** schema and seed load on PostgreSQL 16, and running the seed twice creates no duplicates. It holds 5 programmes, 13 services, 12 FAQs and 4 articles. One testimonial, one social link and 13 flyers are saved as drafts.
- **API/SEO suite:** 13/13 pass, now covering 25 pages including all programme pages.
- **Browser suite:** 18/18 pass with no console errors.
- **Booking:** preselects a programme from the URL.
- **Programme flyers:** load and open in the lightbox.

Lighthouse wasn't re-run after this update; the changes use the same components and image handling as the pages measured below.

## Summary

| Area | Result |
|---|---|
| TypeScript (`tsc --noEmit`) | Pass, no errors |
| Production build | Pass, 40 routes; public pages statically generated with 5-minute revalidation |
| Database schema, seed and security rules (PostgreSQL 16) | Pass |
| API, SEO and security suite (`npm test`) | **13 / 13 pass** |
| Browser suite (`tests/ui_test.py`, Chromium) | **18 / 18 pass**, no console errors |
| Lighthouse, mobile preset, median of 3 runs | Accessibility, Best Practices and SEO 100 on all pages measured; Performance 85–99 (details below) |

## Database and security rules

Run on PostgreSQL 16 with stand-ins for Supabase's `auth` schema.

- Schema and seed load without errors; re-running the seed creates no duplicates.
- Visitor (anonymous) role: sees 12 published services, 0 drafts; cannot read enquiries or subscribers; inserting an enquiry is rejected by row-level security; updates silently affect 0 rows.
- Editor role: sees drafts, reads enquiries, edits content; cannot delete enquiries; cannot change site settings.
- Admin role: can delete enquiries.
- Database rejects publishing a testimonial without `permission_confirmed`.

## API, SEO and security (`tests/site.test.mjs`)

1. All 18 public pages return 200 with a unique title, a meta description of 50+ characters, a canonical URL, Open Graph tags and exactly one `<h1>`.
2. Unknown pages and unknown service slugs return 404.
3. Legacy URLs return 301.
4. Structured data present: Person, ProfessionalService, Service, FAQPage (service and FAQ pages), Article, BreadcrumbList.
5. Sitemap lists services and articles; robots.txt blocks `/admin` and points to the sitemap.
6. Unverified profile placeholders never appear on the public About page.
7. Booking validation reports all missing fields in one response.
8. Past dates and unknown services are rejected.
9. A valid enquiry succeeds; a honeypot-filled one receives a silent fake success.
10. The 6th submission within 10 minutes from one IP receives 429.
11. Newsletter rejects invalid emails, accepts valid ones.
12. `/admin`, `/admin/enquiries` and `/api/admin/export` redirect signed-out visitors to the login page.
13. Security headers present (`nosniff`, `SAMEORIGIN`, HSTS); `X-Powered-By` removed.

Also verified manually: HTML in names and messages is stripped before storage; CSV export prefixes cells that spreadsheet apps would treat as formulas.

## Browser (`tests/ui_test.py`)

Booking: service preselected from `?service=`; empty submit shows errors and focuses the first invalid field; completed form shows the confirmation; WhatsApp follow-up link is prefilled with the booking details; `generate_lead` and `consultation_request` reach the dataLayer. Floating call button uses `tel:+917992512533`; `service_view` fires on service pages; Google Tag Manager does not load before consent. Blog search filters results and shows an empty-search message. Mobile menu opens, navigates and closes; no horizontal scrolling at 390 px. With reduced motion, no WebGL is created; without it, WebGL waits for interaction and stays off on software-only renderers. First Tab focuses the skip link.

## Lighthouse (mobile, simulated 4× CPU slowdown, median of 3)

```
/                                                    perf=90 a11y=100 bp=100 seo=100 | LCP 2.8s TBT 320ms CLS 0.00 runs [88, 90, 91]
/about                                               perf=99 a11y=100 bp=100 seo=100 | LCP 2.1s TBT 58ms CLS 0.00 runs [99, 99, 98]
/blog                                                perf=98 a11y=100 bp=100 seo=100 | LCP 2.3s TBT 140ms CLS 0.00 runs [98, 93, 98]
/services                                            perf=88 a11y=100 bp=100 seo=100 | LCP 2.0s TBT 390ms CLS 0.00 runs [83, 88, 99]
/services/graphology                                 perf=97 a11y=100 bp=100 seo=100 | LCP 2.0s TBT 169ms CLS 0.00 runs [95, 97, 99]
/testimonials                                        perf=97 a11y=100 bp=100 seo=100 | LCP 2.5s TBT 150ms CLS 0.00 runs [95, 97, 97]
/blog/how-to-prepare-for-a-vedic-astrology-consultation perf=85 a11y=100 bp=100 seo=100 | LCP 2.3s TBT 332ms CLS 0.00 runs [83, 99, 85]
/contact                                             perf=93 a11y=100 bp=100 seo=100 | LCP 2.4s TBT 226ms CLS 0.00 runs [94, 93, 88]
/book-consultation                                   perf=96 a11y=100 bp=100 seo=100 | LCP 2.1s TBT 200ms CLS 0.00 runs [96, 98, 85]
```

The first measurement of the homepage scored 49 for performance and 84 for accessibility. The fixes:

- The WebGL yantra now loads only after interaction, and only on GPU-backed devices.
- Hero, menu and expertise animations moved from Framer Motion to CSS.
- Unused font weights were removed.
- Contrast was fixed site-wide, including dark text on gold buttons.
- The blog list is now rendered on the server, which removed its 0.31 layout shift.
- Heading levels and ARIA roles were corrected.

LCP is 2.0–2.8 s and CLS 0 on every page. The remaining spread in performance scores comes from Total Blocking Time, which varied widely between identical runs in this shared-CPU test environment (for example 83 / 99 / 85 on the same page). **Re-measure on PageSpeed Insights after deployment**, which is the figure Google uses.

## Not yet tested (needs live keys)

These paths are written and type-checked, but couldn't be exercised end to end in the test environment:

- **Admin sign-in and content saving** through the interface. The underlying database permissions are tested above.
- **Cloudinary uploads** from the admin.
- **Resend emails** to the admin and the client.
- **Newsletter webhook.**
- **Google Tag Manager / GA4** receiving events. The dataLayer pushes are tested; the GTM container configuration is yours to set up.
- **The 3D yantra on real GPU hardware.** It rendered correctly in the earlier screenshots, before the load-on-interaction change. Check it on a phone and a laptop after deployment.

Run through the go-live checklist in DEPLOYMENT.md once the keys are in place.
