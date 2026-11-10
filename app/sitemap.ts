import type { MetadataRoute } from "next";
import { getPosts, getProgrammes, getServices } from "@/lib/data";
import { env } from "@/lib/env";

export const revalidate = 3600;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, posts, programmes] = await Promise.all([getServices(), getPosts(), getProgrammes()]);
  const u = (p: string) => `${env.siteUrl}${p}`;
  const staticPages = ["/", "/about", "/services", "/courses", "/programmes", "/testimonials", "/success-stories", "/gallery", "/videos", "/blog", "/faq", "/contact", "/book-consultation",
    "/privacy-policy", "/terms-and-conditions", "/disclaimer", "/cookie-policy", "/cancellation-refund-policy"];
  return [
    ...staticPages.map((p) => ({ url: u(p), changeFrequency: "monthly" as const, priority: p === "/" ? 1 : p.includes("policy") || p.includes("terms") || p === "/disclaimer" ? 0.2 : 0.7 })),
    ...services.map((s) => ({ url: u(`/services/${s.slug}`), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...programmes.map((p) => ({ url: u(`/programmes/${p.slug}`), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...posts.map((p) => ({ url: u(`/blog/${p.slug}`), lastModified: p.updated_at || p.publish_at, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
