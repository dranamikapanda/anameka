import { PageHero } from "@/components/PageHero";
import { TestimonialBrowser } from "@/components/TestimonialBrowser";
import { EmptyState } from "@/components/EmptyState";
import { CtaBand } from "@/components/CtaBand";
import { getServices, getTestimonials } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({
    path: "/testimonials",
    title: "Client Testimonials & Feedback | Dr. Anameka S Panda",
    description:
      "Read real, verified feedback from clients of Dr. Anameka S Panda: Vedic astrology readings, residential Vastu corrections, student exam confidence, and handwriting analysis.",
  });
}

export default async function Testimonials() {
  const [items, services] = await Promise.all([getTestimonials(), getServices()]);

  return (
    <>
      <PageHero
        title="Client Testimonials & Reflections"
        badge="Verified Experiences"
        crumbs={[{ name: "Testimonials", path: "/testimonials" }]}
        intro="Read experiences shared with permission by clients across India and internationally. Every consultation is conducted privately, with sensitive personal details strictly protected."
      />

      <section className="section bg-ivory">
        <div className="container-x">
          {items.length ? (
            <TestimonialBrowser
              items={items}
              services={services.map(({ slug, title }) => ({ slug, title }))}
            />
          ) : (
            <EmptyState
              title="Testimonials are on their way"
              body="Client feedback will appear here once clients have given permission to share it."
              cta={{ href: "/book-consultation", label: "Book a consultation" }}
            />
          )}
        </div>
      </section>

      <CtaBand
        title="Experience Clear, Practical Guidance for Yourself"
        body="Join hundreds of individuals, parents, teachers, and business owners who have found clarity and calm through Dr. Anameka’s personalized guidance."
      />
    </>
  );
}
