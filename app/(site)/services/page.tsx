import { PageHero } from "@/components/PageHero";
import { ServiceBrowser } from "@/components/ServiceBrowser";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { getServices } from "@/lib/data";
import { buildMetadata, webPageSchema } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({
    path: "/services",
    title: "Services | Vedic Astrology, Vastu, Graphology & More | Dr. Anameka S Panda",
    description:
      "All consultations offered by Dr. Anameka S Panda: Vedic astrology, Vastu, non-invasive Vastu, graphology, graphotherapy, signature analysis, coaching and business guidance.",
  });
}

export default async function Services() {
  const services = await getServices();

  return (
    <>
      <JsonLd
        data={[
          webPageSchema("/services", "Services", "Consultations offered by Dr. Anameka S Panda"),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.title,
              url: `/services/${s.slug}`,
            })),
          },
        ]}
      />

      <PageHero
        title="Consultations & Disciplines"
        badge="Holistic Guidance"
        crumbs={[{ name: "Services", path: "/services" }]}
        intro="Explore specialized consultations drawn from Vedic astrology, Vastu Shastra, graphology and subconscious coaching. Every session is prepared uniquely around your questions with unhurried personal attention."
      />

      <section className="section bg-ivory">
        <div className="container-x">
          <ServiceBrowser services={services} />
        </div>
      </section>

      <CtaBand
        title="Unsure which consultation suits your question?"
        body="Message Dr. Anameka’s desk directly on WhatsApp or phone. We will listen to your current situation and recommend the most effective consultation."
      />
    </>
  );
}
