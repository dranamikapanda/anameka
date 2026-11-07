import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { EnquiryForm } from "@/components/EnquiryForm";
import { JsonLd } from "@/components/JsonLd";
import { getProgrammes, getServices, getSettings } from "@/lib/data";
import { buildMetadata, webPageSchema } from "@/lib/seo";
import { env, formatPhone, waLink } from "@/lib/env";

export async function generateMetadata() {
  return buildMetadata({ path: "/contact", title: "Contact Dr. Anameka S Panda | Call, WhatsApp or Send a Message", description: "Contact the office of Dr. Anameka S Panda by phone or WhatsApp on +91 79925 12533, or send a message online." });
}
export default async function Contact() {
  const [services, s, progs] = await Promise.all([getServices(), getSettings(), getProgrammes()]);
  const row = "flex items-start gap-4 border-t border-gold/30 py-5";
  return (
    <>
      <JsonLd data={webPageSchema("/contact", "Contact", "Contact Dr. Anameka S Panda")} />
      <PageHero
        badge="Direct Office Desk"
        title="Contact Dr. Anameka S Panda"
        crumbs={[{ name: "Contact", path: "/contact" }]}
        intro="Direct inquiries, consultation bookings, and sacred astrological, vastu, and graphology guidance. In-person at Bhubaneswar, and virtual worldwide."
        ctaHref="/book-consultation"
        ctaText="Book Consultation Slot"
        showWhatsAppCta
      />
      <section className="section"><div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl border border-whatsapp/40 bg-whatsapp/10 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-whatsapp-dark">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-whatsapp opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-whatsapp"></span>
              </span>
              <span>Fastest Response: WhatsApp</span>
            </div>
            <h3 className="mt-2 text-xl font-display text-plum font-medium">Chat Directly with Dr. Anameka</h3>
            <p className="mt-2 text-sm text-charcoal/80">Typically responds within 15 minutes during office hours. Ask questions or request time slots.</p>
            <a href={waLink("Namaste Dr. Anameka, I am reaching out from your website contact page.")} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-4 w-full text-center justify-center text-sm shadow-sm">
              <MessageCircle className="h-4 w-4 fill-current" />
              <span>Open WhatsApp Chat</span>
            </a>
          </div>

          <ul>
            <li className={row}><Phone className="mt-1 h-5 w-5 text-gold shrink-0" /><div><p className="text-xs sm:text-sm text-charcoal/75">Phone</p><a href={`tel:${env.phone}`} className="font-display text-xl sm:text-2xl text-plum">{formatPhone(env.phone)}</a></div></li>
            <li className={row}><MessageCircle className="mt-1 h-5 w-5 text-gold shrink-0" /><div><p className="text-xs sm:text-sm text-charcoal/75">WhatsApp</p><a href={waLink("Hello, I have a question about a consultation.")} target="_blank" rel="noopener noreferrer" className="font-display text-xl sm:text-2xl text-plum">Message on WhatsApp</a></div></li>
            {env.email && <li className={row}><Mail className="mt-1 h-5 w-5 text-gold" /><div><p className="text-sm text-charcoal/75">Email</p><a href={`mailto:${env.email}`} className="text-lg text-plum">{env.email}</a></div></li>}
            <li className={row}><MapPin className="mt-1 h-5 w-5 text-gold" /><div><p className="text-sm text-charcoal/75">Location</p><p className="text-plum">{env.address ? `${env.address}, ` : ""}{env.city}, {env.region}</p><p className="text-sm text-charcoal/75">In person by appointment, online worldwide</p></div></li>
            <li className={`${row} border-b`}><Clock className="mt-1 h-5 w-5 text-gold" /><div><p className="text-sm text-charcoal/75">Hours</p><p className="text-plum">{s.hours}</p></div></li>
          </ul>
        </div>
        <div className="lg:col-span-7 lg:col-start-6"><EnquiryForm kind="contact" services={services.map(({ slug, title }) => ({ slug, title }))} programmes={progs.map(({ slug, title }) => ({ slug, title }))} /></div>
      </div></section>
      {env.mapsEmbed && (
        <section className="container-x pb-24"><div className="aspect-[16/7] overflow-hidden rounded-3xl border border-gold/30">
          <iframe src={env.mapsEmbed} title="Office location on Google Maps" className="h-full w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div></section>
      )}
    </>
  );
}
