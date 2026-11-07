import { PageHero } from "@/components/PageHero";
import { FaqList } from "@/components/FaqList";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { getFaqs, getServices } from "@/lib/data";
import { buildMetadata, faqSchema } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({
    path: "/faq",
    title: "Frequently Asked Questions | Consultations, Booking & Formats | Dr. Anameka S Panda",
    description:
      "Answers to common questions about consultations with Dr. Anameka S Panda: booking, preparation, online video sessions, confidential notes, and what to expect.",
  });
}

const topics: Record<string, string> = {
  general: "About Dr. Anameka & Her Approach",
  booking: "Booking, Fees & Online Preparation",
  approach: "Session Expectations & Confidentiality",
};

export default async function Faq() {
  const [faqs, services] = await Promise.all([getFaqs(), getServices()]);
  const groups = Object.entries(topics)
    .map(([k, l]) => ({
      l,
      items: faqs.filter((f) => f.topic === k).map((f) => ({ q: f.question, a: f.answer })),
    }))
    .filter((g) => g.items.length);
  const serviceFaqs = services.flatMap((s) => s.faqs.slice(0, 1));

  return (
    <>
      <JsonLd data={faqSchema([...groups.flatMap((g) => g.items), ...serviceFaqs])} />

      <PageHero
        title="Frequently Asked Questions"
        badge="Clarifications & Guidelines"
        crumbs={[{ name: "FAQ", path: "/faq" }]}
        intro="Clear answers to common questions about consultation preparation, birth details, online international sessions, and non-invasive remedies."
      />

      <section className="section bg-ivory">
        <div className="container-x max-w-4xl space-y-10">
          {groups.map((g) => (
            <div
              key={g.l}
              className="rounded-3xl border border-gold/30 bg-white/95 p-6 sm:p-9 shadow-soft"
            >
              <h2 className="mb-6 font-display text-2xl sm:text-3xl text-plum">{g.l}</h2>
              <FaqList items={g.items} />
            </div>
          ))}

          <div className="rounded-3xl border border-gold/30 bg-white/95 p-6 sm:p-9 shadow-soft">
            <h2 className="mb-6 font-display text-2xl sm:text-3xl text-plum">
              Specific Discipline Guidance
            </h2>
            <FaqList items={serviceFaqs} />
          </div>
        </div>
      </section>

      <CtaBand
        title="Have a specific question not covered here?"
        body="Dr. Anameka’s office desk is available on WhatsApp or direct phone to assist with any preliminary questions before your booking."
      />
    </>
  );
}
