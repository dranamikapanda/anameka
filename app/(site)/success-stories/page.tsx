import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { EmptyState } from "@/components/EmptyState";
import { CtaBand } from "@/components/CtaBand";
import { getServices, getStories } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({ path: "/success-stories", title: "Client Stories | Dr. Anameka S Panda", description: "Client experiences with Dr. Anameka S Panda, told with context and published with permission." });
}
export default async function Stories() {
  const [stories, services] = await Promise.all([getStories(), getServices()]);
  const svc = (slug?: string | null) => services.find((s) => s.slug === slug);
  return (
    <>
      <PageHero title="Client stories" crumbs={[{ name: "Client stories", path: "/success-stories" }]}
        intro="Longer accounts of clients' experiences, each told with the situation they started from and published with their permission. These are individual experiences, not promises of similar outcomes." />
      <section className="section"><div className="container-x space-y-24">
        {stories.length === 0 && <EmptyState title="Stories will be shared here" body="Approved client stories will appear on this page once clients have consented to share them." />}
        {stories.map((st, i) => (
          <article key={st.id} id={st.slug} className="grid scroll-mt-28 gap-10 lg:grid-cols-12">
            <header className={`lg:col-span-5 ${i % 2 ? "lg:order-2 lg:col-start-8" : ""}`}>
              {st.image_url && <div className="relative mb-8 aspect-[4/3] overflow-hidden rounded-3xl border border-gold/30 bg-cream/40 p-2 shadow-soft"><Image src={st.image_url} alt="" fill className="object-contain" sizes="40vw" /></div>}
              <p className="text-sm text-gold-deep">{st.client_label}{svc(st.service_slug) && <>, <Link href={`/services/${st.service_slug}`} className="underline">{svc(st.service_slug)!.title}</Link></>}</p>
              <h2 className="mt-3">{st.title}</h2>
            </header>
            <dl className={`space-y-8 lg:col-span-6 ${i % 2 ? "lg:order-1" : "lg:col-start-7"}`}>
              {[["Where they started", st.context], ["The guidance", st.approach], ["In the client's words", st.outcome]].map(([t, b]) => (
                <div key={t} className="border-t border-gold/30 pt-5"><dt className="font-display text-xl italic text-gold-deep">{t}</dt><dd className="mt-2 leading-relaxed text-charcoal/85">{b}</dd></div>
              ))}
            </dl>
          </article>
        ))}
      </div></section>
      <CtaBand />
    </>
  );
}
