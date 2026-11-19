import { Clock, Mail, MapPin, MessageCircle, Phone, Instagram, Youtube, Facebook, Linkedin, Star, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { EnquiryForm } from "@/components/EnquiryForm";
import { JsonLd } from "@/components/JsonLd";
import { getProgrammes, getServices, getSettings, getSocial } from "@/lib/data";
import { buildMetadata, webPageSchema } from "@/lib/seo";
import { env, formatPhone, waLink } from "@/lib/env";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.35 11.1h-9.17v2.73h5.27c-.23 1.2-1.35 3.52-5.27 3.52-3.17 0-5.76-2.63-5.76-5.87s2.59-5.87 5.76-5.87c1.8 0 3.01.77 3.7 1.43l2.16-2.08C21.9 3.56 19.34 2.5 16.5 2.5 10.98 2.5 6.5 6.98 6.5 12.5s4.48 10 10 10c5.77 0 9.61-4.06 9.61-9.78 0-.66-.07-1.16-.16-1.62z" />
    </svg>
  );
}

const icons: Record<string, any> = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  google: GoogleIcon,
};

export async function generateMetadata() {
  return buildMetadata({ path: "/contact", title: "Contact Dr. Anameka S Panda | Call, WhatsApp or Send a Message", description: "Contact the office of Dr. Anameka S Panda by phone or WhatsApp on +91 79925 12533, or send a message online." });
}
export default async function Contact() {
  const [services, s, progs, social] = await Promise.all([getServices(), getSettings(), getProgrammes(), getSocial()]);
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

          {/* Google My Business Card */}
          <div className="rounded-3xl border border-gold/30 bg-white/90 p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gold/15 text-gold-deep shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-display text-base font-medium text-plum">Google My Business</h4>
                <p className="text-xs text-charcoal/75 flex items-center gap-1">
                  <span className="text-amber-500 font-bold">★★★★★ 4.9</span>
                  <span>• Verified Google Profile</span>
                </p>
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=Dr.+Anameka+S+Panda+Bhubaneswar"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-xs font-semibold text-plum hover:bg-gold hover:text-plum-deep transition-all"
            >
              <span>View Location &amp; Reviews on Google</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Social Media Connect Row */}
          {social.length > 0 && (
            <div className="rounded-3xl border border-gold/30 bg-cream/40 p-5 shadow-soft">
              <p className="text-xs uppercase tracking-wider font-semibold text-gold-deep mb-3">
                Connect Across Social Media
              </p>
              <div className="flex flex-wrap gap-2.5">
                {social.map((l) => {
                  const I = icons[l.platform] ?? Instagram;
                  return (
                    <a
                      key={l.url}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={l.platform}
                      className="grid h-10 w-10 place-items-center rounded-full border border-gold/30 bg-white text-plum transition-all duration-300 hover:border-gold hover:bg-gold/20 hover:scale-105"
                    >
                      <I className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
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
