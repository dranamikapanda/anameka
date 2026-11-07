import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { YantraLines } from "@/components/YantraLines";
import { FaqList } from "@/components/FaqList";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { TrackView } from "@/components/TrackView";
import { WhatsAppKeyword } from "@/components/WhatsAppKeyword";
import { ProgrammeCard } from "@/components/ProgrammeCard";
import { getProgramme, getProgrammes } from "@/lib/data";
import { buildMetadata, faqSchema, programmeSchema } from "@/lib/seo";
import { waLink } from "@/lib/env";

type P = { params: Promise<{ slug: string }> };
export async function generateStaticParams() { return (await getProgrammes()).map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: P) {
  const p = await getProgramme((await params).slug);
  if (!p) return {};
  return buildMetadata({ path: `/programmes/${p.slug}`, title: p.seo_title || `${p.title} | Anameka S Panda`, description: p.seo_description || p.summary, image: p.poster_url ?? undefined });
}

export default async function ProgrammePage({ params }: P) {
  const { slug } = await params;
  const [p, all] = await Promise.all([getProgramme(slug), getProgrammes()]);
  if (!p) notFound();
  const others = all.filter((x) => x.slug !== p.slug && x.audience_key === p.audience_key).slice(0, 2);
  const book = `/book-consultation?service=${p.slug}`;
  return (
    <>
      <JsonLd data={[programmeSchema(p), ...(p.faqs.length ? [faqSchema(p.faqs)] : [])]} />
      <TrackView event="service_view" params={{ service: p.slug, type: "programme" }} />
      <section className="relative overflow-hidden bg-plum-deep pb-20 pt-36 text-ivory md:pb-24 md:pt-44">
        <YantraLines className="pointer-events-none absolute -right-48 top-1/2 h-[700px] w-[700px] -translate-y-1/2 text-gold/25" />
        <div className="container-x relative">
          <Breadcrumbs light items={[{ name: "Programmes", path: "/programmes" }, { name: p.title, path: `/programmes/${p.slug}` }]} />
          <p className="mt-10 text-gold-light">{p.audience}</p>
          <h1 className="mt-4 max-w-4xl text-ivory">{p.title}</h1>
          {p.tagline && <p className="mt-6 max-w-2xl font-display text-[1.7rem] italic leading-snug text-ivory/85">{p.tagline}</p>}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href={book} className="btn-gold">{p.cta_label}</Link>
            {p.whatsapp_keyword && <WhatsAppKeyword keyword={p.whatsapp_keyword} light context={`programme_${p.slug}`} />}
          </div>
        </div>
      </section>

      <div className="container-x grid gap-16 py-20 lg:grid-cols-12">
        <article className="space-y-14 lg:col-span-8">
          <p className="font-display text-[1.8rem] leading-snug text-plum">{p.intro || p.summary}</p>

          {p.pillars.length > 0 && (
            <section className="grid gap-6 border-t border-gold/30 pt-10 sm:grid-cols-3">
              {p.pillars.map((x) => (
                <div key={x.title}><h2 className="text-[1.7rem]">{x.title}</h2><p className="mt-2 text-charcoal/80">{x.body}</p></div>
              ))}
            </section>
          )}

          {p.includes.length > 0 && (
            <section className="border-t border-gold/30 pt-10">
              <h2 className="text-[2.2rem]">What the programme includes</h2>
              <dl className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {p.includes.map((x) => (
                  <div key={x.title} className="border-l-2 border-gold/50 pl-5"><dt className="font-display text-2xl text-plum">{x.title}</dt><dd className="mt-1 text-charcoal/80">{x.body}</dd></div>
                ))}
              </dl>
            </section>
          )}

          {p.for_whom.length > 0 && (
            <section className="rounded-3xl bg-cream p-8">
              <h2 className="text-[1.9rem]">Who it is for</h2>
              <ul className="mt-5 space-y-3">{p.for_whom.map((b) => <li key={b} className="flex gap-3 text-charcoal/85"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />{b}</li>)}</ul>
            </section>
          )}

          {p.faqs.length > 0 && <section className="border-t border-gold/30 pt-10"><h2 className="mb-6 text-[2.2rem]">Questions parents and teachers ask</h2><FaqList items={p.faqs} /></section>}
        </article>

        <aside className="lg:col-span-4">
          <div className="space-y-8 lg:sticky lg:top-32">
            <div className="rounded-3xl border border-gold/30 bg-plum p-8 text-ivory shadow-soft">
              <h2 className="text-[1.8rem] text-ivory">How to begin</h2>
              <p className="mt-3 text-ivory/75">{p.format}</p>
              {p.price_note && <p className="mt-3 font-medium text-gold-light">{p.price_note}</p>}
              <Link href={book} className="btn-gold mt-6 w-full text-center justify-center">{p.cta_label}</Link>
              <a href={waLink(`Namaste Dr. Anameka, I would like to inquire about the ${p.title} programme.`)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-3 w-full text-center justify-center text-xs sm:text-sm">
                <MessageCircle className="h-4 w-4 fill-current" />
                <span>Ask on WhatsApp</span>
              </a>
            </div>
          </div>
        </aside>
      </div>

      {others.length > 0 && (
        <section className="section bg-cream pt-16"><div className="container-x">
          <h2 className="mb-10">Related programmes</h2>
          <div className="grid gap-6 md:grid-cols-2">{others.map((o) => <ProgrammeCard key={o.slug} p={o} />)}</div>
        </div></section>
      )}
      <CtaBand />
    </>
  );
}
