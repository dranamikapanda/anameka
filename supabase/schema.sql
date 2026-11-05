-- =====================================================================
-- Dr. Anameka S Panda – database schema (Supabase / PostgreSQL)
-- Run in Supabase SQL editor, then run seed.sql.
-- =====================================================================
create extension if not exists "pgcrypto";

-- ---------- Roles ----------
create type public.app_role as enum ('admin', 'editor', 'viewer');
create type public.publish_status as enum ('draft', 'scheduled', 'published', 'archived');
create type public.enquiry_status as enum ('new', 'contacted', 'scheduled', 'completed', 'closed', 'spam');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role public.app_role not null default 'viewer',
  created_at timestamptz not null default now()
);

create or replace function public.current_role() returns public.app_role
language sql stable security definer set search_path = public as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.is_staff() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select role in ('admin','editor') from public.profiles where id = auth.uid()), false)
$$;

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select role = 'admin' from public.profiles where id = auth.uid()), false)
$$;

-- Create a viewer profile automatically on sign-up; promote in SQL or admin panel.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name) values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- Shared updated_at trigger ----------
create or replace function public.touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

-- ---------- Site settings (single row, key 'global') ----------
create table public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- ---------- About / profile ----------
create table public.profile_sections (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,            -- introduction, journey, philosophy, qualifications, certifications, achievements, approach ...
  title text not null,
  body text not null default '',        -- sanitised HTML
  verified boolean not null default false, -- only verified sections are shown publicly
  sort_order int not null default 0,
  status public.publish_status not null default 'draft',
  updated_at timestamptz not null default now()
);

create table public.timeline_items (
  id uuid primary key default gen_random_uuid(),
  period text not null,                 -- e.g. "2018" or "2018 – 2020"
  title text not null,
  description text,
  sort_order int not null default 0,
  status public.publish_status not null default 'draft',
  updated_at timestamptz not null default now()
);

-- ---------- Services ----------
create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  short_description text not null,
  icon text not null default 'Sparkles', -- Lucide icon name
  image_url text,
  intro text,
  what_is text,
  process text,
  who_for text,
  procedure jsonb not null default '[]'::jsonb,   -- [{title, body}]
  benefits jsonb not null default '[]'::jsonb,    -- [string]
  limitations jsonb not null default '[]'::jsonb, -- [string]
  faqs jsonb not null default '[]'::jsonb,        -- [{q, a}]
  seo_title text,
  seo_description text,
  sort_order int not null default 0,
  status public.publish_status not null default 'draft',
  updated_at timestamptz not null default now()
);

-- ---------- Programmes (student, parent and teacher programmes) ----------
create table public.programmes (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  audience text not null,
  audience_key text not null default 'students' check (audience_key in ('students','teachers','business','families')),
  tagline text not null default '',
  summary text not null,
  intro text not null default '',
  pillars jsonb not null default '[]'::jsonb,
  includes jsonb not null default '[]'::jsonb,
  for_whom jsonb not null default '[]'::jsonb,
  format text not null default '',
  price_note text,
  price_inr int,
  cta_label text not null default 'Book a discovery call',
  whatsapp_keyword text,
  poster_url text,
  poster_alt text,
  faqs jsonb not null default '[]'::jsonb,
  seo_title text,
  seo_description text,
  sort_order int not null default 0,
  status public.publish_status not null default 'draft',
  updated_at timestamptz not null default now()
);

-- ---------- Testimonials & stories ----------
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('written','whatsapp','video')),
  client_name text not null,          -- may be initials, as the client permits
  client_location text,
  service_slug text references public.services(slug) on update cascade on delete set null,
  quote text,
  image_url text,                     -- WhatsApp screenshot (personal details redacted)
  video_url text,
  permission_confirmed boolean not null default false,
  permission_note text,               -- how / when consent was recorded
  featured boolean not null default false,
  status public.publish_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint publish_requires_permission check (status <> 'published' or permission_confirmed)
);

create table public.success_stories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  client_label text not null,
  service_slug text references public.services(slug) on update cascade on delete set null,
  context text not null,              -- situation before consultation
  approach text not null,             -- what guidance was given
  outcome text not null,              -- client's own description of what changed
  image_url text,
  permission_confirmed boolean not null default false,
  status public.publish_status not null default 'draft',
  updated_at timestamptz not null default now(),
  constraint story_publish_requires_permission check (status <> 'published' or permission_confirmed)
);

-- ---------- Media ----------
create table public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('professional','events','workshops','consultations','client-interactions','achievements','media-coverage','flyers')),
  title text not null,
  alt text not null,
  image_url text not null,
  width int, height int,
  taken_on date,
  sort_order int not null default 0,
  status public.publish_status not null default 'draft',
  updated_at timestamptz not null default now()
);

create table public.videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  video_url text not null,            -- YouTube URL or Cloudinary video URL
  thumbnail_url text,
  duration_iso text,                  -- e.g. PT4M12S, used in VideoObject schema
  category text not null default 'talks',
  published_on date,
  sort_order int not null default 0,
  status public.publish_status not null default 'draft',
  updated_at timestamptz not null default now()
);

-- ---------- Blog ----------
create table public.blog_categories (
  slug text primary key,
  name text not null,
  description text
);

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null,
  body text not null default '',      -- sanitised HTML from the rich text editor
  cover_url text,
  cover_alt text,
  category_slug text references public.blog_categories(slug) on update cascade,
  tags text[] not null default '{}',
  featured boolean not null default false,
  reading_minutes int not null default 1,
  seo_title text,
  seo_description text,
  status public.publish_status not null default 'draft',
  publish_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index blog_posts_live_idx on public.blog_posts (status, publish_at desc);

-- ---------- FAQ / legal / SEO / social ----------
create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  topic text not null default 'general',
  sort_order int not null default 0,
  status public.publish_status not null default 'draft',
  updated_at timestamptz not null default now()
);

create table public.legal_pages (
  slug text primary key,              -- privacy-policy, terms-and-conditions, disclaimer, cookie-policy, cancellation-refund-policy
  title text not null,
  body text not null,
  last_reviewed date,
  status public.publish_status not null default 'published',
  updated_at timestamptz not null default now()
);

create table public.seo_pages (
  path text primary key,              -- e.g. "/", "/about"
  title text,
  description text,
  og_image_url text,
  noindex boolean not null default false,
  updated_at timestamptz not null default now()
);

create table public.social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null,             -- instagram, facebook, youtube, linkedin, x
  url text not null,
  sort_order int not null default 0,
  status public.publish_status not null default 'published',
  updated_at timestamptz not null default now()
);

-- ---------- Leads (inserted only by the server with the service role) ----------
create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('contact','consultation')),
  full_name text not null,
  phone text not null,
  email text,
  service_slug text,
  mode text check (mode in ('online','offline')),
  preferred_date date,
  preferred_time text,
  message text,
  consent boolean not null,
  status public.enquiry_status not null default 'new',
  admin_notes text,
  source_page text,
  ip_hash text,                       -- salted hash, never raw IP
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index enquiries_status_idx on public.enquiries (status, created_at desc);

create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  consent boolean not null default true,
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.audit_log (
  id bigserial primary key,
  actor uuid references auth.users(id),
  action text not null,
  entity text not null,
  entity_id text,
  created_at timestamptz not null default now()
);

-- ---------- updated_at triggers ----------
do $$ declare t text; begin
  foreach t in array array['site_settings','profile_sections','timeline_items','services','programmes','testimonials','success_stories',
    'gallery_items','videos','blog_posts','faqs','legal_pages','seo_pages','social_links','enquiries'] loop
    execute format('create trigger %I_touch before update on public.%I for each row execute function public.touch_updated_at()', t, t);
  end loop;
end $$;

-- ---------- Row-level security ----------
alter table public.profiles enable row level security;
create policy "own profile" on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "admin manages roles" on public.profiles for update using (public.is_admin());

-- Public content: anyone reads published rows, staff read/write everything.
do $$ declare t text; begin
  foreach t in array array['profile_sections','timeline_items','services','programmes','testimonials','success_stories',
    'gallery_items','videos','faqs','legal_pages','social_links'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format($p$create policy "public read published" on public.%I for select using (status = 'published' or public.is_staff())$p$, t);
    execute format($p$create policy "staff write" on public.%I for all using (public.is_staff()) with check (public.is_staff())$p$, t);
  end loop;
end $$;

alter table public.blog_posts enable row level security;
create policy "public read live posts" on public.blog_posts for select
  using ((status in ('published','scheduled') and coalesce(publish_at, created_at) <= now()) or public.is_staff());
create policy "staff write posts" on public.blog_posts for all using (public.is_staff()) with check (public.is_staff());

alter table public.blog_categories enable row level security;
create policy "public read categories" on public.blog_categories for select using (true);
create policy "staff write categories" on public.blog_categories for all using (public.is_staff()) with check (public.is_staff());

alter table public.site_settings enable row level security;
create policy "public read settings" on public.site_settings for select using (true);
create policy "admin write settings" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());

alter table public.seo_pages enable row level security;
create policy "public read seo" on public.seo_pages for select using (true);
create policy "staff write seo" on public.seo_pages for all using (public.is_staff()) with check (public.is_staff());

-- Leads: no public policies at all. Inserts happen through the API with the service role.
alter table public.enquiries enable row level security;
create policy "staff read enquiries" on public.enquiries for select using (public.is_staff());
create policy "staff update enquiries" on public.enquiries for update using (public.is_staff());
create policy "admin delete enquiries" on public.enquiries for delete using (public.is_admin());

alter table public.newsletter_subscribers enable row level security;
create policy "staff read subscribers" on public.newsletter_subscribers for select using (public.is_staff());
create policy "admin manage subscribers" on public.newsletter_subscribers for all using (public.is_admin()) with check (public.is_admin());

alter table public.audit_log enable row level security;
create policy "admin read audit" on public.audit_log for select using (public.is_admin());
create policy "staff append audit" on public.audit_log for insert with check (public.is_staff());
