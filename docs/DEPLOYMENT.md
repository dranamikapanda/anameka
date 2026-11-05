# Deployment

## Recommended: Vercel

1. Push the project to a private GitHub repository.
2. In Vercel, **Add New → Project**, import the repository. Framework preset: Next.js. No build settings need changing.
3. Add every variable from `.env.example` under **Settings → Environment Variables** (Production and Preview). Set `NEXT_PUBLIC_SITE_URL` to the final domain, for example `https://www.anamekaspanda.com` (placeholder; use the real domain).
4. Deploy. Then **Settings → Domains** to connect the domain; Vercel issues HTTPS automatically.
5. In Supabase **Authentication → URL Configuration**, set the Site URL to the same domain.

Any Node 20+ host also works (`npm run build && npm start`).

### Rate limiting on serverless

`lib/rate-limit.ts` uses in-memory counters, which reset per server instance. On Vercel that still deters casual abuse, but for strict limits swap the `Map` for Upstash Redis (`@upstash/ratelimit`); the function signature stays the same. Supabase's own limits and the honeypot and timing checks remain in place either way.

## Search engines

1. **Google Search Console:** add the domain property. Use the HTML-tag method and put the token in `NEXT_PUBLIC_GSC_VERIFICATION`, or verify via DNS. Submit `https://YOUR-DOMAIN/sitemap.xml`.
2. **Google Business Profile:** create or claim it with the *same* name, phone and address shown on the site; consistency matters for local search.
3. **Rich results:** test a service page and an article at search.google.com/test/rich-results.
4. **Redirects:** if replacing an older site, list old URLs in `lib/redirects.mjs` (301s) before switching DNS.

## Go-live checklist

- [ ] Supabase schema and seed run; first admin promoted; public sign-ups disabled
- [ ] All environment variables set in production; `NEXT_PUBLIC_SITE_URL` is the real domain
- [ ] Logo, portrait and social image uploaded
- [ ] Email and address confirmed (or deliberately left blank)
- [ ] Profile sections completed with verified facts and marked verified
- [ ] Legal pages reviewed by a lawyer; all `[PLACEHOLDER]` text replaced (search the Legal pages module for “PLACEHOLDER”)
- [ ] Cancellation and refund terms confirmed with Dr. Anameka
- [ ] Test booking submitted on production; admin email received; enquiry visible in Admin
- [ ] GTM/GA4 receiving events (GA4 → Realtime) after accepting cookies
- [ ] Search Console verified and sitemap submitted
- [ ] `BASE_URL=https://YOUR-DOMAIN npm test` passes

## Backups and logs

- Supabase Pro includes daily backups with point-in-time recovery; on the free plan, schedule a weekly `pg_dump` (Supabase → Database → Backups explains both).
- The `audit_log` table records every create, update and delete made in the admin, with who made it.
- Server errors from form submissions are logged with an `[enquiries]` prefix and appear in Vercel → Logs.
