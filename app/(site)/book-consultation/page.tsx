import { Suspense } from "react";
import { MessageCircle, Sparkles, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { EnquiryForm } from "@/components/EnquiryForm";
import { BookingForm } from "@/components/BookingForm";
import { getProgrammes, getServices } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { waLink } from "@/lib/env";

export async function generateMetadata() {
  return buildMetadata({
    path: "/book-consultation",
    title: "Book a Consultation | Vedic Astrology, Vastu & Graphology | Dr. Anameka S Panda",
    description:
      "Request an online or in-person consultation with Dr. Anameka S Panda. Choose your preferred discipline, date and mode; our desk confirms your session promptly.",
  });
}

const steps = [
  ["1. Send Request", "Choose your discipline, preferred consultation mode (Online/In-person), and date."],
  ["2. Desk Confirmation", "Our office contacts you via WhatsApp/Phone to confirm exact timing, fee, and any charts/samples needed."],
  ["3. Private Consultation", "An unhurried, one-on-one session with Dr. Anameka with full clarity and non-invasive remedies."],
];

export default async function Book() {
  const pick = ({ slug, title }: { slug: string; title: string }) => ({ slug, title });
  const [list, progs] = await Promise.all([
    getServices().then((x) => x.map(pick)),
    getProgrammes().then((x) => x.map(pick)),
  ]);

  return (
    <>
      <PageHero
        title="Schedule Your Consultation"
        badge="Direct Booking Desk"
        crumbs={[{ name: "Book a consultation", path: "/book-consultation" }]}
        intro="Select your desired consultation below. Whether you connect online from anywhere in the world or visit in person, every session is prepared with deep individual attention."
      >
        {/* 3-Step Process Ribbon on Dark Header */}
        <div className="grid max-w-4xl gap-4 sm:grid-cols-3 mt-8">
          {steps.map(([t, d], i) => (
            <div
              key={t}
              className="rounded-2xl border border-gold/30 bg-white/5 p-4 backdrop-blur-sm"
            >
              <span className="font-display text-2xl font-semibold italic text-gold-light">
                0{i + 1}
              </span>
              <h3 className="mt-1 text-base font-medium text-ivory">{t}</h3>
              <p className="mt-1.5 text-xs text-ivory/70 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </PageHero>

      <section className="section bg-ivory">
        <div className="container-x max-w-4xl">
          {/* Instant WhatsApp Priority Booking Callout */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-whatsapp/40 bg-gradient-to-r from-whatsapp/15 via-whatsapp/5 to-transparent p-6 backdrop-blur-sm shadow-soft">
            <div className="flex items-center gap-3.5">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-whatsapp text-white shadow-md">
                <MessageCircle className="h-6 w-6 fill-current" />
              </div>
              <div>
                <p className="text-sm font-semibold text-plum">
                  Prefer instant confirmation or have quick questions?
                </p>
                <p className="text-xs text-charcoal/75 mt-0.5">
                  Connect directly with Dr. Anameka’s desk on WhatsApp for 15-minute response.
                </p>
              </div>
            </div>
            <a
              href={waLink("Namaste Dr. Anameka, I would like to book a consultation session directly.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp shrink-0 !py-2.5 !px-5 text-xs sm:text-sm text-center justify-center w-full sm:w-auto shadow-sm"
            >
              <span>Book via WhatsApp</span>
            </a>
          </div>

          <Suspense
            fallback={
              <EnquiryForm kind="consultation" services={list} programmes={progs} />
            }
          >
            <BookingForm services={list} programmes={progs} />
          </Suspense>

          <p className="mt-6 text-xs text-charcoal/65 text-center">
            Submitting this request is provisional. You will receive a direct confirmation from the office. Please review our{" "}
            <a className="underline decoration-gold text-plum" href="/cancellation-refund-policy">
              cancellation policy
            </a>{" "}
            and{" "}
            <a className="underline decoration-gold text-plum" href="/disclaimer">
              disclaimer
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
