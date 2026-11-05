import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Logo } from "./Logo";
import { CookieSettingsLink } from "./CookieSettingsLink";
import { env, formatPhone } from "@/lib/env";
import { getProgrammes, getServices, getSettings, getSocial } from "@/lib/data";

const icons: Record<string, typeof Instagram> = { instagram: Instagram, facebook: Facebook, youtube: Youtube, linkedin: Linkedin };

export async function Footer() {
  const [s, services, social, programmes] = await Promise.all([getSettings(), getServices(), getSocial(), getProgrammes()]);
  const col = "space-y-2.5 text-[0.95rem] text-ivory/70";
  return (
    <footer className="bg-plum-deep text-ivory">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo src={s.logoUrl} light />
          <p className="mt-5 max-w-sm text-ivory/70">{s.tagline}. {s.serviceArea}.</p>
          {social.length > 0 && (
            <ul className="mt-6 flex gap-3">
              {social.map((l) => { const I = icons[l.platform] ?? Instagram; return (
                <li key={l.url}><a href={l.url} target="_blank" rel="noopener noreferrer" aria-label={l.platform} className="grid h-10 w-10 place-items-center rounded-full border border-gold/30 text-gold-light hover:bg-gold/15"><I className="h-4 w-4" /></a></li>
              ); })}
            </ul>
          )}
        </div>
        <nav className="md:col-span-3" aria-label="Services">
          <h2 className="mb-4 font-display text-xl text-gold-light">Services</h2>
          <ul className={col}>{services.slice(0, 7).map((x) => <li key={x.slug}><Link className="hover:text-gold-light" href={`/services/${x.slug}`}>{x.title}</Link></li>)}
            <li><Link className="hover:text-gold-light" href="/services">All services</Link></li></ul>
          <h2 className="mb-4 mt-8 font-display text-xl text-gold-light">Programmes</h2>
          <ul className={col}>{programmes.slice(0, 4).map((x) => <li key={x.slug}><Link className="hover:text-gold-light" href={`/programmes/${x.slug}`}>{x.title}</Link></li>)}</ul>
        </nav>
        <nav className="md:col-span-2" aria-label="Quick links">
          <h2 className="mb-4 font-display text-xl text-gold-light">Explore</h2>
          <ul className={col}>
            {[["About", "/about"], ["Programmes", "/programmes"], ["Testimonials", "/testimonials"], ["Success stories", "/success-stories"], ["Gallery", "/gallery"], ["Videos", "/videos"], ["Knowledge centre", "/blog"], ["FAQ", "/faq"]].map(([l, h]) =>
              <li key={h}><Link className="hover:text-gold-light" href={h}>{l}</Link></li>)}
          </ul>
        </nav>
        <div className="md:col-span-3">
          <h2 className="mb-4 font-display text-xl text-gold-light">Contact</h2>
          <ul className={col}>
            <li><a href={`tel:${env.phone}`} className="flex items-center gap-2 hover:text-gold-light"><Phone className="h-4 w-4 text-gold" />{formatPhone(env.phone)}</a></li>
            {env.email && <li><a href={`mailto:${env.email}`} className="flex items-center gap-2 hover:text-gold-light"><Mail className="h-4 w-4 text-gold" />{env.email}</a></li>}
            <li className="flex gap-2"><MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" />{env.address ? `${env.address}, ` : ""}{env.city}, {env.region} · online</li>
            <li>{s.hours}</li>
          </ul>
          <Link href="/book-consultation" className="btn-gold mt-6">Book consultation</Link>
        </div>
      </div>
      <div className="border-t border-gold/15">
        <div className="container-x flex flex-col gap-4 py-6 text-sm text-ivory/70 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {s.name}. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {[["Privacy", "/privacy-policy"], ["Terms", "/terms-and-conditions"], ["Disclaimer", "/disclaimer"], ["Cookies", "/cookie-policy"], ["Cancellation & refunds", "/cancellation-refund-policy"]].map(([l, h]) =>
              <li key={h}><Link href={h} className="hover:text-gold-light">{l}</Link></li>)}
            <li><CookieSettingsLink /></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
