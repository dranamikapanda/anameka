import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ServiceIcon } from "@/components/ServiceIcon";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { getServices } from "@/lib/data";
import { buildMetadata, webPageSchema } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({ path: "/services", title: "Services | Vedic Astrology, Vastu, Graphology & More | Dr. Anameka S Panda", description: "All consultations offered by Dr. Anameka S Panda: Vedic astrology, Vastu, non-invasive Vastu, graphology, graphotherapy, signature analysis, coaching and business guidance." });
}

export default async function Services() {
  const services = await getServices();
  return (
    <>
      <JsonLd data={[webPageSchema("/services", "Services", "Consultations offered by Dr. Anameka S Panda"), { "@context": "https://schema.org", "@type": "ItemList", itemListElement: services.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.title, url: `/services/${s.slug}` })) }]} />
      <PageHero title="Services" crumbs={[{ name: "Services", path: "/services" }]}
        intro="Twelve consultations, drawn from Vedic astrology, Vastu Shastra, handwriting analysis and coaching. Each can be booked on its own or combined when your question spans more than one area." />
      <section className="section">
        <ul className="container-x">
          {services.map((s) => (
            <li key={s.slug} className="group relative grid gap-4 border-t border-gold/30 py-9 transition-colors last:border-b hover:bg-cream/50 md:grid-cols-12 md:items-center md:px-4">
              <ServiceIcon name={s.icon} className="h-10 w-10 text-gold md:col-span-1" />
              <h2 className="text-[2rem] md:col-span-4"><Link href={`/services/${s.slug}`} className="after:absolute after:inset-0 group-hover:text-gold-deep">{s.title}</Link></h2>
              <p className="text-charcoal/75 md:col-span-6">{s.short_description}</p>
              <span className="hidden text-right text-sm text-plum md:col-span-1 md:block">Details</span>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand title="Not sure which consultation fits?" body="Describe your situation when you book and Dr. Anameka's office will suggest the right starting point." />
    </>
  );
}
