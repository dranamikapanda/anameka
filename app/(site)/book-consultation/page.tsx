import { Suspense } from "react";
import { MessageCircle } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { EnquiryForm } from "@/components/EnquiryForm";
import { BookingForm } from "@/components/BookingForm";
import { getProgrammes, getServices } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { waLink } from "@/lib/env";

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
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-whatsapp/40 bg-whatsapp/10 p-5 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-whatsapp text-white shadow-sm">
              <MessageCircle className="h-5 w-5 fill-current" />
            </div>
            <div>
              <p className="text-sm font-semibold text-plum">Prefer instant booking or have preliminary questions?</p>
              <p className="text-xs text-charcoal/75">Connect directly with Dr. Anameka’s desk on WhatsApp.</p>
            </div>
          </div>
          <a href={waLink("Namaste Dr. Anameka, I would like to book a consultation session directly.")} target="_blank" rel="noopener noreferrer" className="btn-whatsapp shrink-0 !py-2.5 !px-5 text-xs sm:text-sm">
            <span>Book via WhatsApp</span>
          </a>
        </div>
        <Suspense fallback={<EnquiryForm kind="consultation" services={list} programmes={progs} />}><BookingForm services={list} programmes={progs} /></Suspense>
        <p className="mt-6 text-sm text-charcoal/75">Submitting this form is a request, not a confirmed appointment. Please read the <a className="underline" href="/cancellation-refund-policy">cancellation policy</a> and <a className="underline" href="/disclaimer">disclaimer</a>.</p>
      </div></section>
    </>
  );
}
