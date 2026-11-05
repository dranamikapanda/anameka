import { PageHero } from "@/components/PageHero";
import { FaqList } from "@/components/FaqList";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { getFaqs, getServices } from "@/lib/data";
import { buildMetadata, faqSchema } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({ path: "/faq", title: "Frequently Asked Questions | Dr. Anameka S Panda", description: "Answers to common questions about consultations with Dr. Anameka S Panda: booking, preparation, online sessions and what to expect." });
}
const topics: Record<string, string> = { general: "About Dr. Anameka", booking: "Booking and preparation", approach: "What to expect" };
export default async function Faq() {
  const [faqs, services] = await Promise.all([getFaqs(), getServices()]);
  const groups = Object.entries(topics).map(([k, l]) => ({ l, items: faqs.filter((f) => f.topic === k).map((f) => ({ q: f.question, a: f.answer })) })).filter((g) => g.items.length);
  const serviceFaqs = services.flatMap((s) => s.faqs.slice(0, 1));
  return (
    <>
      <JsonLd data={faqSchema([...groups.flatMap((g) => g.items), ...serviceFaqs])} />
      <PageHero title="Frequently asked questions" crumbs={[{ name: "FAQ", path: "/faq" }]} />
      <section className="section"><div className="container-x max-w-4xl space-y-16">
        {groups.map((g) => <div key={g.l}><h2 className="mb-6 text-[2.2rem]">{g.l}</h2><FaqList items={g.items} /></div>)}
        <div><h2 className="mb-6 text-[2.2rem]">About specific services</h2><FaqList items={serviceFaqs} /></div>
      </div></section>
      <CtaBand title="Have a question that isn't here?" body="Call or message on WhatsApp and the office will be happy to help." />
    </>
  );
}
