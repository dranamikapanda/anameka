import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
  MessageCircle,
} from "lucide-react";
import { Logo } from "./Logo";
import { CookieSettingsLink } from "./CookieSettingsLink";
import { env, formatPhone, waLink } from "@/lib/env";
import { getProgrammes, getServices, getSettings, getSocial } from "@/lib/data";

const icons: Record<string, typeof Instagram> = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
};

export async function Footer() {
  const [s, services, social, programmes] = await Promise.all([
    getSettings(),
    getServices(),
    getSocial(),
    getProgrammes(),
  ]);

  const col = "space-y-2.5 text-[0.95rem] text-ivory/70";

  return (
    <footer className="bg-gradient-to-b from-plum-deep to-plum-darkest text-ivory border-t border-gold/20">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12">
        {/* Brand column */}
        <div className="md:col-span-4">
          <Logo src={s.logoUrl} light />
          <p className="mt-5 max-w-sm text-sm sm:text-base text-ivory/75 leading-relaxed">
            {s.tagline}. {s.serviceArea}.
          </p>

          {/* Social Icons with golden borders */}
          {social.length > 0 && (
            <div className="mt-6">
              <p className="text-xs uppercase tracking-wider text-gold-light/80 mb-3">
                Connect with Dr. Anameka
              </p>
              <ul className="flex gap-2.5">
                {social.map((l) => {
                  const I = icons[l.platform] ?? Instagram;
                  return (
                    <li key={l.url}>
                      <a
                        href={l.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={l.platform}
                        className="grid h-10 w-10 place-items-center rounded-full border border-gold/30 bg-white/5 text-gold-light transition-all duration-300 hover:border-gold hover:bg-gold/20 hover:scale-105"
                      >
                        <I className="h-4 w-4" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {/* Services column */}
        <nav className="md:col-span-3" aria-label="Services">
          <h2 className="mb-4 font-display text-xl text-gold-light">Services</h2>
          <ul className={col}>
            {services.slice(0, 7).map((x) => (
              <li key={x.slug}>
                <Link className="transition-colors hover:text-gold-light" href={`/services/${x.slug}`}>
                  {x.title}
                </Link>
              </li>
            ))}
            <li>
              <Link className="font-semibold text-gold-light/90 hover:text-white" href="/services">
                View all services →
              </Link>
            </li>
          </ul>

          <h2 className="mb-4 mt-8 font-display text-xl text-gold-light">Signature Programmes</h2>
          <ul className={col}>
            {programmes.slice(0, 4).map((x) => (
              <li key={x.slug}>
                <Link className="transition-colors hover:text-gold-light" href={`/programmes/${x.slug}`}>
                  {x.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Quick Links column */}
        <nav className="md:col-span-2" aria-label="Quick links">
          <h2 className="mb-4 font-display text-xl text-gold-light">Explore</h2>
          <ul className={col}>
            {[
              ["About", "/about"],
              ["Programmes", "/programmes"],
              ["Testimonials", "/testimonials"],
              ["Success stories", "/success-stories"],
              ["Gallery", "/gallery"],
              ["Videos", "/videos"],
              ["Knowledge centre", "/blog"],
              ["FAQ", "/faq"],
            ].map(([l, h]) => (
              <li key={h}>
                <Link className="transition-colors hover:text-gold-light" href={h}>
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact & WhatsApp column */}
        <div className="md:col-span-3 space-y-6">
          <div>
            <h2 className="mb-4 font-display text-xl text-gold-light">Contact & Desk</h2>
            <ul className={col}>
              <li>
                <a
                  href={`tel:${env.phone}`}
                  className="flex items-center gap-2 transition-colors hover:text-gold-light"
                >
                  <Phone className="h-4 w-4 text-gold" />
                  <span>{formatPhone(env.phone)}</span>
                </a>
              </li>
              {env.email && (
                <li>
                  <a
                    href={`mailto:${env.email}`}
                    className="flex items-center gap-2 transition-colors hover:text-gold-light"
                  >
                    <Mail className="h-4 w-4 text-gold" />
                    <span>{env.email}</span>
                  </a>
                </li>
              )}
              <li className="flex gap-2">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" />
                <span>
                  {env.address ? `${env.address}, ` : ""}
                  {env.city}, {env.region} · Online worldwide
                </span>
              </li>
              <li>{s.hours}</li>
            </ul>
          </div>

          {/* Interactive WhatsApp Desk card */}
          <div className="rounded-2xl border border-whatsapp/40 bg-whatsapp/10 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-whatsapp">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-whatsapp opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-whatsapp"></span>
              </span>
              <span>Online Consultation Desk</span>
            </div>
            <p className="mt-1.5 text-xs text-ivory/80">
              Direct answers & booking assistance via official WhatsApp.
            </p>
            <a
              href={waLink("Hello Dr. Anameka, I am contacting you from the website footer.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-whatsapp px-3.5 py-2 text-xs font-medium text-white transition-all hover:bg-whatsapp-hover w-full justify-center shadow-sm"
            >
              <MessageCircle className="h-4 w-4 fill-current" />
              <span>Message on WhatsApp</span>
            </a>
          </div>

          <div>
            <Link href="/book-consultation" className="btn-gold w-full text-center justify-center !py-2.5 text-sm">
              Book a consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom legal strip */}
      <div className="border-t border-gold/15 bg-plum-darkest/80">
        <div className="container-x flex flex-col gap-4 py-6 text-sm text-ivory/70 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {s.name}. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {[
              ["Privacy", "/privacy-policy"],
              ["Terms", "/terms-and-conditions"],
              ["Disclaimer", "/disclaimer"],
              ["Cookies", "/cookie-policy"],
              ["Cancellation & refunds", "/cancellation-refund-policy"],
            ].map(([l, h]) => (
              <li key={h}>
                <Link href={h} className="hover:text-gold-light transition-colors">
                  {l}
                </Link>
              </li>
            ))}
            <li>
              <CookieSettingsLink />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
