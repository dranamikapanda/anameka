import "server-only";
import { cache } from "react";
import { publicClient } from "@/lib/supabase/server";
import type {
  BlogPost, Faq, Programme, GalleryItem, LegalPage, ProfileSection, Service, SiteSettings,
  SocialLink, SuccessStory, Testimonial, TimelineItem, Video,
} from "@/lib/types";
import servicesSeed from "@/lib/content/services.json";
import siteSeed from "@/lib/content/site.json";
import faqSeed from "@/lib/content/faqs.json";
import postsSeed from "@/lib/content/blog-posts.json";
import categoriesSeed from "@/lib/content/blog-categories.json";
import legalSeed from "@/lib/content/legal.json";
import profileSeed from "@/lib/content/profile.json";
import programmesSeed from "@/lib/content/programmes.json";
import testimonialsDraft from "@/lib/content/testimonials-draft.json";
import { readingMinutes } from "@/lib/utils";

/**
 * Every read goes to Supabase when it is configured; otherwise it falls back to the
 * seed content in lib/content so the site builds and runs before the database exists.
 * Pages use ISR (revalidate) and admin saves call revalidatePath for instant updates.
 */
async function query<T>(fn: (db: NonNullable<ReturnType<typeof publicClient>>) => PromiseLike<{ data: T | null; error: unknown }>, fallback: T): Promise<T> {
  const db = publicClient();
  if (!db) return fallback;
  try {
    const { data, error } = await fn(db);
    if (error || data == null) return fallback;
    return data;
  } catch {
    return fallback;
  }
}

const seededPosts: BlogPost[] = (postsSeed as unknown as BlogPost[]).map((p) => ({ ...p, reading_minutes: readingMinutes(p.body) }));
const live = (p: BlogPost) => new Date(p.publish_at).getTime() <= Date.now();

export const getSettings = cache(async (): Promise<SiteSettings> => {
  const row = await query<{ value: Partial<SiteSettings> } | null>((db) => db.from("site_settings").select("value").eq("key", "global").maybeSingle(), null);
  return { ...(siteSeed as SiteSettings), ...(row?.value ?? {}) };
});

export const getServices = cache(() =>
  query<Service[]>((db) => db.from("services").select("*").eq("status", "published").order("sort_order"), servicesSeed as Service[]));

export const getService = cache(async (slug: string) => (await getServices()).find((s) => s.slug === slug) ?? null);

export const getProgrammes = cache(() =>
  query<Programme[]>((db) => db.from("programmes").select("*").eq("status", "published").order("sort_order"), programmesSeed as Programme[]));

export const getProgramme = cache(async (slug: string) => (await getProgrammes()).find((p) => p.slug === slug) ?? null);

export const getTestimonials = cache(() =>
  query<Testimonial[]>((db) => db.from("testimonials").select("*").eq("status", "published").order("featured", { ascending: false }).order("created_at", { ascending: false }), testimonialsDraft as unknown as Testimonial[]));

export const getStories = cache(() =>
  query<SuccessStory[]>((db) => db.from("success_stories").select("*").eq("status", "published").order("updated_at", { ascending: false }), []));

export const getGallery = cache(() =>
  query<GalleryItem[]>((db) => db.from("gallery_items").select("*").eq("status", "published").order("sort_order"), []));

export const getVideos = cache(() =>
  query<Video[]>((db) => db.from("videos").select("*").eq("status", "published").order("sort_order"), []));

export const getPosts = cache(async () => {
  const rows = await query<BlogPost[]>((db) => db.from("blog_posts").select("*").in("status", ["published", "scheduled"]).lte("publish_at", new Date().toISOString()).order("publish_at", { ascending: false }), seededPosts);
  return rows.filter(live).sort((a, b) => +new Date(b.publish_at) - +new Date(a.publish_at));
});

export const getPost = cache(async (slug: string) => (await getPosts()).find((p) => p.slug === slug) ?? null);

export const getCategories = cache(() =>
  query<{ slug: string; name: string }[]>((db) => db.from("blog_categories").select("slug,name").order("name"), categoriesSeed));

export const getFaqs = cache(() =>
  query<Faq[]>((db) => db.from("faqs").select("question,answer,topic").eq("status", "published").order("sort_order"), faqSeed as Faq[]));

export const getLegal = cache(async (slug: string) => {
  const fallback = (legalSeed as LegalPage[]).find((p) => p.slug === slug) ?? null;
  return query<LegalPage | null>((db) => db.from("legal_pages").select("slug,title,body,updated_at").eq("slug", slug).eq("status", "published").maybeSingle(), fallback);
});

export const getProfile = cache(async () => {
  const sections = await query<ProfileSection[]>((db) => db.from("profile_sections").select("slug,title,body,verified").eq("status", "published").order("sort_order"), profileSeed.sections as ProfileSection[]);
  const timeline = await query<TimelineItem[]>((db) => db.from("timeline_items").select("period,title,description").eq("status", "published").order("sort_order"), profileSeed.timeline as TimelineItem[]);
  // Only verified sections are shown publicly. Unverified ones stay in the admin panel.
  return { sections: sections.filter((s) => s.verified), timeline };
});

export const getSocial = cache(() =>
  query<SocialLink[]>((db) => db.from("social_links").select("platform,url").eq("status", "published").order("sort_order"), []));

export const getSeoOverride = cache(async (path: string) =>
  query<{ title?: string; description?: string; og_image_url?: string; noindex?: boolean } | null>((db) => db.from("seo_pages").select("*").eq("path", path).maybeSingle(), null));
