import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Portrait } from "@/components/Portrait";
import { CtaBand } from "@/components/CtaBand";
import { GalleryGrid } from "@/components/GalleryGrid";
import { JsonLd } from "@/components/JsonLd";
import { getGallery, getProfile, getServices, getSettings } from "@/lib/data";
import { buildMetadata, webPageSchema } from "@/lib/seo";
import { cleanHtml } from "@/lib/sanitize";

export async function generateMetadata() {
  return buildMetadata({ path: "/about", title: "About Dr. Anameka S Panda | Astrology, Vastu & Graphology", description: "Professional profile of Dr. Anameka S Panda: her approach to Vedic astrology, Vastu, graphology, graphotherapy, remedial practices and coaching." });
}

export default async function About() {
  const [s, { sections, timeline }, services, gallery] = await Promise.all([getSettings(), getProfile(), getServices(), getGallery()]);
  const intro = sections.find((x) => x.slug === "introduction");
  const others = sections.filter((x) => x.slug !== "introduction");
  const photos = gallery.filter((g) => g.category === "professional" || g.category === "events");
  return (
    <>
      <JsonLd data={webPageSchema("/about", "About Dr. Anameka S Panda", s.shortBio)} />
      <PageHero title="About Dr. Anameka S Panda" crumbs={[{ name: "About", path: "/about" }]} />
      <section className="section">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 mx-auto max-w-xs sm:max-w-sm lg:max-w-none">
              <Portrait src={s.portraitUrl} />
            <dl className="mt-8 space-y-4 text-sm">
              <div><dt className="text-charcoal/75">Consultations</dt><dd className="text-plum">{s.serviceArea}</dd></div>
              <div><dt className="text-charcoal/75">Disciplines</dt><dd className="text-plum">{services.length} services across astrology, Vastu, handwriting and coaching</dd></div>
            </dl></div>
          </aside>
          <div className="lg:col-span-7 lg:col-start-6">
            {intro && <div className="font-display text-[1.75rem] leading-snug text-plum [&_p]:mb-4" dangerouslySetInnerHTML={{ __html: cleanHtml(intro.body) }} />}
            {others.map((sec) => (
              <section key={sec.slug} id={sec.slug} className="mt-14 border-t border-gold/30 pt-10">
                <h2 className="text-[2.2rem]">{sec.title}</h2>
                <div className="prose-rich mt-5" dangerouslySetInnerHTML={{ __html: cleanHtml(sec.body) }} />
              </section>
            ))}
            <section className="mt-14 border-t border-gold/30 pt-10">
              <h2 className="text-[2.2rem]">Areas of expertise</h2>
              <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {services.map((x) => <li key={x.slug}><Link href={`/services/${x.slug}`} className="text-plum underline decoration-gold/50 underline-offset-4 hover:decoration-gold">{x.title}</Link></li>)}
              </ul>
            </section>
            {timeline.length > 0 && (
              <section className="mt-14 border-t border-gold/30 pt-10">
                <h2 className="text-[2.2rem]">Career timeline</h2>
                <ol className="relative mt-8 border-l border-gold/40 pl-8">
                  {timeline.map((t) => (
                    <li key={t.period + t.title} className="relative mb-10 last:mb-0">
                      <span className="absolute -left-[2.35rem] top-1.5 h-3 w-3 rotate-45 border border-gold bg-ivory" aria-hidden />
                      <p className="font-display text-xl italic text-gold-deep">{t.period}</p>
                      <h3 className="mt-1 text-2xl">{t.title}</h3>
                      {t.description && <p className="mt-2 text-charcoal/75">{t.description}</p>}
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </div>
        </div>
      </section>
      {photos.length > 0 && (
        <section className="section bg-cream pt-16"><div className="container-x"><h2 className="mb-10">Photographs</h2><GalleryGrid items={photos} limit={6} /></div></section>
      )}
      <CtaBand title="Talk to Dr. Anameka" />
    </>
  );
}
