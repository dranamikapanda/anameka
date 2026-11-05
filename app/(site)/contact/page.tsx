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
      <PageHero title="Contact" crumbs={[{ name: "Contact", path: "/contact" }]} intro="Call, message on WhatsApp, or write to us below. To request a specific consultation time, use the booking page." />
      <section className="section"><div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <ul>
            <li className={row}><Phone className="mt-1 h-5 w-5 text-gold" /><div><p className="text-sm text-charcoal/75">Phone</p><a href={`tel:${env.phone}`} className="font-display text-2xl text-plum">{formatPhone(env.phone)}</a></div></li>
            <li className={row}><MessageCircle className="mt-1 h-5 w-5 text-gold" /><div><p className="text-sm text-charcoal/75">WhatsApp</p><a href={waLink("Hello, I have a question about a consultation.")} target="_blank" rel="noopener noreferrer" className="font-display text-2xl text-plum">Message on WhatsApp</a></div></li>
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
