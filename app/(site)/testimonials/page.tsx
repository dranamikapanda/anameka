import { PageHero } from "@/components/PageHero";
import { TestimonialBrowser } from "@/components/TestimonialBrowser";
import { EmptyState } from "@/components/EmptyState";
import { CtaBand } from "@/components/CtaBand";
import { getServices, getTestimonials } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({ path: "/testimonials", title: "Client Testimonials | Dr. Anameka S Panda", description: "Written, WhatsApp and video testimonials from clients of Dr. Anameka S Panda, shared with their permission." });
}
export default async function Testimonials() {
  const [items, services] = await Promise.all([getTestimonials(), getServices()]);
  return (
    <>
      <PageHero title="Client testimonials" crumbs={[{ name: "Testimonials", path: "/testimonials" }]}
        intro="Feedback shared by clients with their permission. Names appear as each client chose, and personal details in screenshots are hidden. Individual experiences vary." />
      <section className="section"><div className="container-x">
        {items.length ? <TestimonialBrowser items={items} services={services.map(({ slug, title }) => ({ slug, title }))} />
          : <EmptyState title="Testimonials are on their way" body="Client feedback will appear here once clients have given permission to share it." cta={{ href: "/book-consultation", label: "Book a consultation" }} />}
      </div></section>
      <CtaBand />
    </>
  );
}
