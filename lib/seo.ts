import type { Metadata } from "next";
import { env } from "@/lib/env";
import { getSeoOverride, getSettings } from "@/lib/data";

interface MetaInput { path: string; title: string; description: string; image?: string | null; type?: "website" | "article"; publishedTime?: string; noindex?: boolean }

/** Unique title/description/canonical/OG/Twitter per page, overridable from Admin → SEO. */
export async function buildMetadata(m: MetaInput): Promise<Metadata> {
  const [o, s] = await Promise.all([getSeoOverride(m.path), getSettings()]);
  const title = o?.title || m.title;
  const description = o?.description || m.description;
  const image = o?.og_image_url || m.image || s.ogImageUrl || `${env.siteUrl}/og-default.png`;
  const url = `${env.siteUrl}${m.path === "/" ? "" : m.path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: o?.noindex || m.noindex ? { index: false, follow: true } : undefined,
    openGraph: { title, description, url, siteName: s.name, type: m.type ?? "website", images: [{ url: image, width: 1200, height: 630 }], locale: "en_IN", ...(m.publishedTime ? { publishedTime: m.publishedTime } : {}) },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

const personId = `${env.siteUrl}/#person`;
const orgId = `${env.siteUrl}/#organization`;

export function personSchema(name: string, image?: string, sameAs: string[] = []) {
  return {
    "@context": "https://schema.org", "@type": "Person", "@id": personId, name,
    url: `${env.siteUrl}/about`, jobTitle: "Graphologist, Graphotherapist and Life Transformation Coach",
    knowsAbout: ["Graphology", "Graphotherapy", "Handwriting analysis", "Signature analysis", "Vedic astrology", "Jyotish", "Vastu Shastra", "Numerology", "Student coaching", "Life coaching"],
    telephone: env.phone, ...(image ? { image } : {}), ...(sameAs.length ? { sameAs } : {}),
    worksFor: { "@id": orgId },
  };
}

export function organizationSchema(name: string, logo?: string, sameAs: string[] = []) {
  return {
    "@context": "https://schema.org", "@type": "ProfessionalService", "@id": orgId, name,
    url: env.siteUrl, telephone: env.phone, founder: { "@id": personId },
    ...(env.email ? { email: env.email } : {}),
    ...(logo ? { logo, image: logo } : {}),
    // Address is included only once it has been verified and set in env/admin.
    address: { "@type": "PostalAddress", ...(env.address ? { streetAddress: env.address } : {}), addressLocality: env.city, addressRegion: env.region, addressCountry: "IN" },
    areaServed: [{ "@type": "City", name: env.city }, "Worldwide (online consultations)"],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export const websiteSchema = (name: string) => ({
  "@context": "https://schema.org", "@type": "WebSite", "@id": `${env.siteUrl}/#website`, name, url: env.siteUrl,
  publisher: { "@id": orgId },
  potentialAction: { "@type": "SearchAction", target: `${env.siteUrl}/blog?q={search_term_string}`, "query-input": "required name=search_term_string" },
});

export const webPageSchema = (path: string, name: string, description: string) => ({
  "@context": "https://schema.org", "@type": "WebPage", url: `${env.siteUrl}${path}`, name, description,
  isPartOf: { "@id": `${env.siteUrl}/#website` }, about: { "@id": personId },
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${env.siteUrl}${it.path}` })),
});

export const serviceSchema = (s: { slug: string; title: string; short_description: string }) => ({
  "@context": "https://schema.org", "@type": "Service", name: s.title, description: s.short_description,
  url: `${env.siteUrl}/services/${s.slug}`, provider: { "@id": orgId }, areaServed: "Worldwide (online)", serviceType: s.title,
});

export const programmeSchema = (p: { slug: string; title: string; summary: string; audience: string; price_inr?: number | null }) => ({
  "@context": "https://schema.org", "@type": "Service", name: p.title, description: p.summary, url: `${env.siteUrl}/programmes/${p.slug}`,
  provider: { "@id": orgId }, audience: { "@type": "Audience", audienceType: p.audience }, areaServed: [env.city, "Online"],
  ...(p.price_inr ? { offers: { "@type": "Offer", price: p.price_inr, priceCurrency: "INR" } } : {}),
});

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const articleSchema = (p: { slug: string; title: string; excerpt: string; publish_at: string; updated_at?: string; cover_url?: string | null }, authorName: string) => ({
  "@context": "https://schema.org", "@type": "Article", headline: p.title, description: p.excerpt,
  datePublished: p.publish_at, dateModified: p.updated_at || p.publish_at,
  mainEntityOfPage: `${env.siteUrl}/blog/${p.slug}`, author: { "@type": "Person", "@id": personId, name: authorName, url: `${env.siteUrl}/about` },
  publisher: { "@id": orgId }, ...(p.cover_url ? { image: p.cover_url } : {}),
});

export const videoSchema = (v: { title: string; description?: string | null; video_url: string; thumbnail_url?: string | null; duration_iso?: string | null; published_on?: string | null }) => ({
  "@context": "https://schema.org", "@type": "VideoObject", name: v.title, description: v.description || v.title,
  contentUrl: v.video_url, ...(v.thumbnail_url ? { thumbnailUrl: v.thumbnail_url } : {}),
  ...(v.duration_iso ? { duration: v.duration_iso } : {}), ...(v.published_on ? { uploadDate: v.published_on } : {}),
});
