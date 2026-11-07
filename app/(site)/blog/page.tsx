import { PageHero } from "@/components/PageHero";
import { BlogBrowser } from "@/components/BlogBrowser";
import { BlogCard } from "@/components/BlogCard";
import { EmptyState } from "@/components/EmptyState";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getCategories, getPosts } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({ path: "/blog", title: "Knowledge Centre | Astrology, Vastu & Graphology Articles | Dr. Anameka S Panda", description: "Educational articles on Vedic astrology, Vastu Shastra, graphology, graphotherapy, remedial practices and personal growth by Dr. Anameka S Panda." });
}
export default async function Blog() {
  const [posts, cats] = await Promise.all([getPosts(), getCategories()]);
  const name = (s: string) => cats.find((c) => c.slug === s)?.name;
  const featured = posts.find((p) => p.featured);
  const cards = Object.fromEntries(posts.map((p) => [p.slug, <BlogCard key={p.slug} post={p} categoryName={name(p.category_slug)} level="h2" />]));
  return (
    <>
      <PageHero
        badge="Wisdom & Insights"
        title="Knowledge Centre"
        crumbs={[{ name: "Knowledge Centre", path: "/blog" }]}
        intro="Authentic, practical guidance on Vedic Astrology, Non-Invasive Vastu, Graphotherapy, and Holistic Remedial Sciences by Dr. Anameka S Panda."
        ctaHref="/book-consultation"
        ctaText="Book a 1-on-1 Consultation"
        showWhatsAppCta
      />
      <section className="section">
        <div className="container-x">
          {posts.length ? <BlogBrowser posts={posts} categories={cats} cards={cards} featured={featured ? { slug: featured.slug, node: <BlogCard post={featured} categoryName={name(featured.category_slug)} large level="h2" /> } : undefined} />
            : <EmptyState title="Articles coming soon" body="Subscribe below to hear when the first articles are published." />}
        </div>
      </section>
      <section className="bg-cream py-16"><div className="container-x flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <h2 className="text-[2rem]">New articles in your inbox</h2><NewsletterForm />
      </div></section>
    </>
  );
}
