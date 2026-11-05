import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ServiceIcon } from "@/components/ServiceIcon";
import { YantraLines } from "@/components/YantraLines";
import { FaqList } from "@/components/FaqList";
import { BlogCard } from "@/components/BlogCard";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { TrackView } from "@/components/TrackView";
import { getCategories, getPosts, getProgrammes, getService, getServices, getTestimonials } from "@/lib/data";
import { buildMetadata, faqSchema, serviceSchema } from "@/lib/seo";

type P = { params: Promise<{ slug: string }> };
export async function generateStaticParams() { return (await getServices()).map((s) => ({ slug: s.slug })); }
export async function generateMetadata({ params }: P) {
  const s = await getService((await params).slug);
  if (!s) return {};
  return buildMetadata({ path: `/services/${s.slug}`, title: s.seo_title || `${s.title} | Dr. Anameka S Panda`, description: s.seo_description || s.short_description, image: s.image_url });
}

const blogCatFor: Record<string, string> = {
  "vedic-astrology": "vedic-astrology", "vastu-consultation": "vastu-shastra", "non-invasive-vastu": "vastu-shastra", graphology: "graphology", graphotherapy: "graphotherapy",
  "signature-analysis": "signature-analysis", "remedial-measures": "remedial-measures", "watch-correction": "remedial-measures",
  "life-transformation-coaching": "life-transformation", "business-growth-guidance": "business-guidance", "logo-design-guidance": "business-guidance", "mobile-number-analysis": "business-guidance",
};

const programmesFor: Record<string, string[]> = {
  graphology: ["student-inner-excellence", "child-script-coach", "teacher-handwriting-consultation"],
  graphotherapy: ["exam-ready-from-the-inside", "student-inner-excellence"],
  "signature-analysis": ["teacher-handwriting-consultation"],
  "life-transformation-coaching": ["student-inner-excellence", "exam-ready-from-the-inside"],
};

export default async function ServicePage({ params }: P) {
  const { slug } = await params;
  const [s, all, testimonials, posts, cats, programmes] = await Promise.all([getService(slug), getServices(), getTestimonials(), getPosts(), getCategories(), getProgrammes()]);
  if (!s) notFound();
  const related = testimonials.filter((t) => t.service_slug === s.slug && t.quote).slice(0, 3);
  const relatedPosts = posts.filter((p) => p.category_slug === blogCatFor[s.slug]).slice(0, 3);
  const progSlugs = programmesFor[s.slug] ?? [];
  const relatedProgs = programmes.filter((p) => progSlugs.includes(p.slug));
  const others = all.filter((x) => x.slug !== s.slug).slice(0, 4);
  const block = (title: string, body?: string) => body ? (
    <section className="border-t border-gold/30 pt-10"><h2 className="text-[2.2rem]">{title}</h2><p className="prose-rich mt-5">{body}</p></section>
  ) : null;

  return (
    <>
      <JsonLd data={[serviceSchema(s), ...(s.faqs.length ? [faqSchema(s.faqs)] : [])]} />
      <TrackView event="service_view" params={{ service: s.slug }} />
      <section className="relative overflow-hidden bg-plum-deep pb-20 pt-36 text-ivory md:pb-24 md:pt-44">
        <YantraLines className="pointer-events-none absolute -right-48 top-1/2 h-[700px] w-[700px] -translate-y-1/2 text-gold/25" />
        <div className="container-x relative">
          <Breadcrumbs light items={[{ name: "Services", path: "/services" }, { name: s.title, path: `/services/${s.slug}` }]} />
          <ServiceIcon name={s.icon} className="mt-10 h-12 w-12 text-gold-light" />
          <h1 className="mt-6 max-w-3xl text-ivory">{s.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/75">{s.short_description}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href={`/book-consultation?service=${s.slug}`} className="btn-gold">Book {s.title.toLowerCase()}</Link>
            <a href="#how-it-works" className="btn-ghost-light">How it works</a>
          </div>
        </div>
      </section>

      <div className="container-x grid gap-16 py-20 lg:grid-cols-12">
        <article className="space-y-14 lg:col-span-8">
          {s.intro && <p className="font-display text-[1.8rem] leading-snug text-plum">{s.intro}</p>}
          {block(`What is ${s.title.toLowerCase()}?`, s.what_is)}
          {block("Understanding the process", s.process)}
          {block("Who may find it useful", s.who_for)}

          {s.procedure.length > 0 && (
            <section id="how-it-works" className="scroll-mt-28 border-t border-gold/30 pt-10">
              <h2 className="text-[2.2rem]">Consultation procedure</h2>
              <ol className="mt-8 space-y-8">
                {s.procedure.map((p, i) => (
                  <li key={p.title} className="grid grid-cols-[3rem_1fr] gap-4">
                    <span className="font-display text-4xl italic leading-none text-gold">{i + 1}</span>
                    <div><h3 className="text-2xl">{p.title}</h3><p className="mt-2 text-charcoal/75">{p.body}</p></div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          <section className="grid gap-6 border-t border-gold/30 pt-10 md:grid-cols-2">
            <div className="rounded-3xl bg-cream p-8">
              <h2 className="text-[1.9rem]">What it can offer</h2>
              <ul className="mt-5 space-y-3">{s.benefits.map((b) => <li key={b} className="flex gap-3 text-charcoal/85"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />{b}</li>)}</ul>
            </div>
            <div className="rounded-3xl border border-plum/15 p-8">
              <h2 className="text-[1.9rem]">Its limits</h2>
              <ul className="mt-5 space-y-3">{s.limitations.map((b) => <li key={b} className="flex gap-3 text-charcoal/85"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full border border-plum" />{b}</li>)}</ul>
            </div>
          </section>

          {s.faqs.length > 0 && <section className="border-t border-gold/30 pt-10"><h2 className="mb-6 text-[2.2rem]">Frequently asked questions</h2><FaqList items={s.faqs} /></section>}

          {related.length > 0 && (
            <section className="border-t border-gold/30 pt-10">
              <h2 className="text-[2.2rem]">What clients say</h2>
              <div className="mt-8 space-y-8">{related.map((t) => (
                <figure key={t.id}><blockquote className="font-display text-2xl italic text-plum">“{t.quote}”</blockquote><figcaption className="mt-3 text-sm text-charcoal/75">{t.client_name}</figcaption></figure>
              ))}</div>
            </section>
          )}
        </article>

        <aside className="lg:col-span-4">
          <div className="space-y-8 lg:sticky lg:top-32">
            <div className="rounded-3xl bg-plum p-8 text-ivory">
              <h2 className="text-[1.8rem] text-ivory">Book this consultation</h2>
              <p className="mt-3 text-ivory/70">Online or in person. Choose a preferred date and the office will confirm.</p>
              <Link href={`/book-consultation?service=${s.slug}`} className="btn-gold mt-6 w-full">Request a time</Link>
            </div>
            {relatedProgs.length > 0 && (
              <nav aria-label="Related programmes">
                <h2 className="text-xl">Related programmes</h2>
                <ul className="mt-4 space-y-3">{relatedProgs.map((o) => <li key={o.slug}><Link className="text-plum underline decoration-gold/50 underline-offset-4 hover:decoration-gold" href={`/programmes/${o.slug}`}>{o.title}</Link></li>)}</ul>
              </nav>
            )}
            <nav aria-label="Other services">
              <h2 className="text-xl">Other services</h2>
              <ul className="mt-4 space-y-3">{others.map((o) => <li key={o.slug}><Link className="text-plum underline decoration-gold/50 underline-offset-4 hover:decoration-gold" href={`/services/${o.slug}`}>{o.title}</Link></li>)}</ul>
            </nav>
          </div>
        </aside>
      </div>

      {relatedPosts.length > 0 && (
        <section className="section bg-cream pt-16"><div className="container-x">
          <h2 className="mb-10">Further reading</h2>
          <div className="grid gap-12 md:grid-cols-3">{relatedPosts.map((p) => <BlogCard key={p.slug} post={p} categoryName={cats.find((c) => c.slug === p.category_slug)?.name} />)}</div>
        </div></section>
      )}
      <CtaBand />
    </>
  );
}
