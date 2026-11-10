export type Status = "draft" | "scheduled" | "published" | "archived";

export interface Service {
  id?: string; slug: string; title: string; short_description: string; icon: string;
  image_url?: string | null; intro?: string; what_is?: string; process?: string; who_for?: string;
  procedure: { title: string; body: string }[]; benefits: string[]; limitations: string[];
  faqs: { q: string; a: string }[]; seo_title?: string; seo_description?: string;
}
export interface Programme {
  id?: string; slug: string; title: string; audience: string; audience_key: "students" | "teachers" | "business" | "families";
  tagline: string; summary: string; intro: string; pillars: { title: string; body: string }[]; includes: { title: string; body: string }[];
  for_whom: string[]; format: string; price_note?: string | null; price_inr?: number | null; cta_label: string; whatsapp_keyword?: string | null;
  poster_url?: string | null; poster_alt?: string | null; faqs: { q: string; a: string }[]; seo_title?: string | null; seo_description?: string | null;
}
export interface Testimonial {
  id: string; kind: "written" | "whatsapp" | "video"; client_name: string; client_location?: string | null;
  service_slug?: string | null; quote?: string | null; image_url?: string | null; video_url?: string | null; featured?: boolean;
}
export interface SuccessStory {
  id: string; slug: string; title: string; client_label: string; service_slug?: string | null;
  context: string; approach: string; outcome: string; image_url?: string | null;
}
export interface GalleryItem { id: string; category: string; title: string; alt: string; image_url: string; width?: number | null; height?: number | null; }
export interface Video { id: string; title: string; description?: string | null; video_url: string; thumbnail_url?: string | null; duration_iso?: string | null; category: string; published_on?: string | null; }
export interface BlogPost {
  id?: string; slug: string; title: string; excerpt: string; body: string; cover_url?: string | null; cover_alt?: string | null;
  category_slug: string; tags: string[]; featured: boolean; reading_minutes?: number; publish_at: string;
  updated_at?: string; seo_title?: string | null; seo_description?: string | null;
}
export interface Faq { question: string; answer: string; topic: string }
export interface LegalPage { slug: string; title: string; body: string; updated_at?: string }
export interface ProfileSection { slug: string; title: string; body: string; verified: boolean }
export interface TimelineItem { period: string; title: string; description?: string | null }
export interface Course {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  duration: string;
  format: string;
  level: string;
  next_batch: string;
  description: string;
  modules: string[];
  certification: string;
  includes: string;
  icon: string;
}

export interface SiteSettings {
  name: string; tagline: string; heroHeadline: string; heroSubheading: string; shortBio: string;
  serviceArea: string; hours: string; logoUrl: string; portraitUrl: string; ogImageUrl: string;
}
export interface SocialLink { platform: string; url: string }
