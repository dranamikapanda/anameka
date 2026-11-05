# Setup

Everything below is configured through `.env.local` locally and through your host's environment settings in production. See `.env.example` for the full list.

## 1. Supabase (database, admin login)

1. Create a project at supabase.com. Choose a region close to your visitors (Mumbai, `ap-south-1`, for India) and note it for the privacy policy.
2. **SQL Editor →** run `supabase/schema.sql`, then `supabase/seed.sql`.
3. **Project Settings → API:** copy the URL, `anon` key and `service_role` key into
   `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
   The service-role key bypasses security rules: keep it server-side only, never prefix it with `NEXT_PUBLIC_`.
4. **Authentication → Providers:** keep Email enabled. **Authentication → Sign In / Up:** turn *off* "Allow new users to sign up" so only invited people get accounts.
5. **Authentication → Users → Invite user** for yourself. After accepting, promote the account in the SQL editor:
   ```sql
   update public.profiles set role = 'admin'
   where id = (select id from auth.users where email = 'you@example.com');
   ```
   Further users can then be invited and given roles in **Admin → Users and roles**.

**Roles:** *viewer* can read the dashboard; *editor* manages content and enquiries; *admin* can also delete, edit legal pages and site settings, and change roles. These are enforced by database row-level security, not only by the interface.

## 2. Contact details

| Variable | Notes |
|---|---|
| `NEXT_PUBLIC_CONTACT_PHONE` | `+917992512533` (already set) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Digits only with country code: `917992512533` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Leave blank until confirmed |
| `NEXT_PUBLIC_BUSINESS_ADDRESS` | Leave blank until confirmed. When set, it appears on the contact page, footer and in local-business structured data |
| `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL` | Google Maps → Share → Embed a map → copy the `src` URL |

## 3. Cloudinary (image and video uploads)

Create a free account; from the dashboard copy cloud name, API key and secret into `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`. Uploads are signed on the server, so the secret never reaches the browser. Images are stored with `f_auto,q_auto`, so visitors automatically get AVIF or WebP.

## 4. Email notifications (Resend)

Create an account at resend.com, verify your sending domain, and set `RESEND_API_KEY`, `NOTIFY_FROM_EMAIL` (for example `Dr. Anameka S Panda <hello@yourdomain>`) and `NOTIFY_ADMIN_EMAIL` (where new enquiries go). Clients who give an email receive an acknowledgement. Without these keys, enquiries are still stored; only the emails are skipped.

## 5. Analytics

Set `NEXT_PUBLIC_GTM_ID` (recommended) or `NEXT_PUBLIC_GA4_ID`. Nothing loads until a visitor accepts analytics cookies (Google Consent Mode v2, default *denied*).

The site pushes these events to the `dataLayer`. In GTM, create a GA4 Event tag for each (or one tag using `{{Event}}` as the event name) and mark the lead events as key events in GA4:

| Event | Fired when | Parameters |
|---|---|---|
| `generate_lead` | Any form succeeds | `form`, `service` |
| `consultation_request` | Booking form succeeds | `service` |
| `contact_form_submit` | Contact form succeeds | `service` |
| `whatsapp_click` | Any WhatsApp link | `location` |
| `phone_click` | Call button | `location` |
| `newsletter_signup` | Newsletter succeeds | – |
| `service_view` | Service page viewed | `service` |
| `blog_view` | Article viewed | `slug`, `category` |
| `gallery_interaction` | Gallery filter or open | `action`, `category`/`item` |
| `video_play` | Video opened | `title` |

## 6. Newsletter provider (optional)

Subscribers are stored in Supabase and exportable as CSV. To sync automatically to Mailchimp, Brevo or similar, set `NEWSLETTER_WEBHOOK_URL` to a Zapier/Make webhook or your provider's endpoint; each new email is POSTed as `{"email": "…"}`.

## 7. Brand assets

Sign in to **Admin → Website settings** and upload the official logo, Dr. Anameka's portrait and a 1200 × 630 social-sharing image. Until then, the site shows a clearly labelled placeholder.
