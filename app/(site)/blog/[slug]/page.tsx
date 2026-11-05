import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BlogCard } from "@/components/BlogCard";
import { ShareButtons } from "@/components/ShareButtons";
import { Portrait } from "@/components/Portrait";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { TrackView } from "@/components/TrackView";
import { getCategories, getPost, getPosts, getSettings } from "@/lib/data";
import { articleSchema, buildMetadata } from "@/lib/seo";
import { cleanHtml } from "@/lib/sanitize";
import { formatDate, withHeadingIds } from "@/lib/utils";
import { env } from "@/lib/env";

type P = { params: Promise<{ slug: string }> };
export async function generateStaticParams() { return (await getPosts()).map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: P) {
  const p = await getPost((await params).slug);
  if (!p) return {};
  return buildMetadata({ path: `/blog/${p.slug}`, title: p.seo_title || `${p.title} | Dr. Anameka S Panda`, description: p.seo_description || p.excerpt, image: p.cover_url, type: "article", publishedTime: p.publish_at });
}

export default async function Post({ params }: P) {
  const { slug } = await params;
  const [p, all, cats, s] = await Promise.all([getPost(slug), getPosts(), getCategories(), getSettings()]);
  if (!p) notFound();
  const cat = cats.find((c) => c.slug === p.category_slug);
  const { html, toc } = withHeadingIds(cleanHtml(p.body));
  const related = all.filter((x) => x.slug !== p.slug && (x.category_slug === p.category_slug || x.tags.some((t) => p.tags.includes(t)))).slice(0, 3);
  const url = `${env.siteUrl}/blog/${p.slug}`;
  return (
    <>
      <JsonLd data={articleSchema(p, s.name)} />
      <TrackView event="blog_view" params={{ slug: p.slug, category: p.category_slug }} />
      <header className="grain bg-cream pb-14 pt-36 md:pt-44">
        <div className="container-x max-w-4xl">
          <Breadcrumbs items={[{ name: "Knowledge centre", path: "/blog" }, ...(cat ? [{ name: cat.name, path: `/blog?category=${cat.slug}` }] : []), { name: p.title, path: `/blog/${p.slug}` }]} />
          <h1 className="mt-8 text-[clamp(2.3rem,4.6vw,4rem)]">{p.title}</h1>
          <p className="lede mt-6">{p.excerpt}</p>
          <p className="mt-8 flex flex-wrap gap-x-5 gap-y-1 text-sm text-charcoal/75">
            <span>By <Link href="/about" className="text-plum underline decoration-gold/60">{s.name}</Link></span>
            <time dateTime={p.publish_at}>{formatDate(p.publish_at)}</time>
            <span>{p.reading_minutes} min read</span>
          </p>
        </div>
      </header>
      {p.cover_url && <div className="container-x -mt-2 max-w-5xl"><div className="relative aspect-[16/8] overflow-hidden rounded-3xl"><Image src={p.cover_url} alt={p.cover_alt || ""} fill priority className="object-cover" sizes="(min-width:1024px) 64rem, 100vw" /></div></div>}
      <div className="container-x grid gap-14 py-16 lg:grid-cols-12">
        {toc.length > 2 && (
          <nav aria-label="Table of contents" className="lg:col-span-3">
            <div className="lg:sticky lg:top-32">
              <h2 className="text-xl">In this article</h2>
              <ol className="mt-4 space-y-2.5 border-l border-gold/40 pl-4 text-[0.95rem]">
                {toc.map((t) => <li key={t.id} className={t.level === 3 ? "pl-3" : ""}><a href={`#${t.id}`} className="text-charcoal/70 hover:text-plum">{t.text}</a></li>)}
              </ol>
            </div>
          </nav>
        )}
        <div className={toc.length > 2 ? "lg:col-span-8 lg:col-start-5" : "mx-auto max-w-3xl lg:col-span-12"}>
          <article className="prose-rich max-w-prose" dangerouslySetInnerHTML={{ __html: html }} />
          {p.tags.length > 0 && <ul className="mt-10 flex flex-wrap gap-2">{p.tags.map((t) => <li key={t}><Link href={`/blog?tag=${encodeURIComponent(t)}`} className="rounded-full bg-cream px-3 py-1 text-sm text-plum hover:bg-gold/20">{t}</Link></li>)}</ul>}
          <div className="mt-10 border-t border-gold/30 pt-8"><ShareButtons url={url} title={p.title} /></div>
          <aside className="mt-12 grid gap-6 rounded-3xl bg-cream p-8 sm:grid-cols-[7rem_1fr] sm:items-center" aria-label="About the author">
            <Portrait src={s.portraitUrl} className="w-28" />
            <div><p className="text-sm text-charcoal/75">Written by</p><h2 className="text-2xl">{s.name}</h2><p className="mt-2 text-charcoal/75">{s.shortBio}</p>
              <Link href="/about" className="mt-3 inline-block text-plum underline decoration-gold underline-offset-4">Read her profile</Link></div>
          </aside>
        </div>
      </div>
      {related.length > 0 && <section className="section bg-cream pt-16"><div className="container-x"><h2 className="mb-10">Related articles</h2>
        <div className="grid gap-12 md:grid-cols-3">{related.map((r) => <BlogCard key={r.slug} post={r} categoryName={cats.find((c) => c.slug === r.category_slug)?.name} />)}</div></div></section>}
      <CtaBand />
    </>
  );
}
