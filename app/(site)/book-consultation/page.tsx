import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { EnquiryForm } from "@/components/EnquiryForm";
import { BookingForm } from "@/components/BookingForm";
import { getProgrammes, getServices } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({ path: "/book-consultation", title: "Book a Consultation | Dr. Anameka S Panda", description: "Request an online or in-person consultation with Dr. Anameka S Panda. Choose a service and a preferred date; the office will confirm your time." });
}
const steps = [
  ["Send your request", "Choose a service, online or in person, and a preferred date."],
  ["We confirm", "The office calls or messages you to confirm the time, fee and anything to prepare."],
  ["Your consultation", "An unhurried session with Dr. Anameka, with time for your questions."],
];
export default async function Book() {
  const pick = ({ slug, title }: { slug: string; title: string }) => ({ slug, title });
  const [list, progs] = await Promise.all([getServices().then((x) => x.map(pick)), getProgrammes().then((x) => x.map(pick))]);
  return (
    <>
      <PageHero title="Book a consultation" crumbs={[{ name: "Book a consultation", path: "/book-consultation" }]}>
        <ol className="mt-10 grid max-w-4xl gap-6 sm:grid-cols-3">
          {steps.map(([t, d], i) => (
            <li key={t} className="border-t border-gold/50 pt-4"><p className="font-display text-3xl italic text-gold">{i + 1}</p><h2 className="mt-1 text-xl">{t}</h2><p className="mt-1 text-sm text-charcoal/70">{d}</p></li>
          ))}
        </ol>
      </PageHero>
      <section className="section"><div className="container-x max-w-4xl">
        <Suspense fallback={<EnquiryForm kind="consultation" services={list} programmes={progs} />}><BookingForm services={list} programmes={progs} /></Suspense>
        <p className="mt-6 text-sm text-charcoal/75">Submitting this form is a request, not a confirmed appointment. Please read the <a className="underline" href="/cancellation-refund-policy">cancellation policy</a> and <a className="underline" href="/disclaimer">disclaimer</a>.</p>
      </div></section>
    </>
  );
}
