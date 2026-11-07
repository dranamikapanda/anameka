import Link from "next/link";
import {
  Sparkles,
  CheckCircle2,
  Phone,
  MessageCircle,
  Calendar,
  Globe,
  Award,
  ArrowRight,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Portrait } from "@/components/Portrait";
import { CtaBand } from "@/components/CtaBand";
import { GalleryGrid } from "@/components/GalleryGrid";
import { JsonLd } from "@/components/JsonLd";
import { getGallery, getProfile, getServices, getSettings } from "@/lib/data";
import { buildMetadata, webPageSchema } from "@/lib/seo";
import { cleanHtml } from "@/lib/sanitize";
import { env, formatPhone, waLink } from "@/lib/env";

export async function generateMetadata() {
  return buildMetadata({
    path: "/about",
    title: "About Dr. Anameka S Panda | Vedic Astrology, Vastu & Graphology",
    description:
      "Professional profile of Dr. Anameka S Panda: her 15+ years experience synthesizing Vedic astrology, non-invasive Vastu, graphology, graphotherapy and transformational coaching.",
  });
}

export default async function About() {
  const [s, { sections, timeline }, services, gallery] = await Promise.all([
    getSettings(),
    getProfile(),
    getServices(),
    getGallery(),
  ]);
  const intro = sections.find((x) => x.slug === "introduction");
  const others = sections.filter((x) => x.slug !== "introduction");
  const photos = gallery.filter((g) => g.category === "professional" || g.category === "events");

  return (
    <>
      <JsonLd data={webPageSchema("/about", "About Dr. Anameka S Panda", s.shortBio)} />

      <PageHero
        title="Meet Dr. Anameka S Panda"
        badge="Practitioner Profile"
        crumbs={[{ name: "About", path: "/about" }]}
        intro="Vedic Astrologer, Vastu Consultant, Graphologist, Graphotherapist and Life Transformation Coach dedicated to offering unhurried, non-invasive, and practical guidance."
      />

      {/* Main Profile Section */}
      <section className="section bg-ivory">
        <div className="container-x grid gap-12 lg:grid-cols-12 items-start">
          {/* Left Column: Fixed Executive Profile Card */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-6">
              {/* Portrait Container */}
              <div className="mx-auto max-w-[240px] sm:max-w-[270px]">
                <Portrait src={s.portraitUrl} aspect="aspect-[4/5]" />
              </div>

              {/* Verified Practitioner Card */}
              <div className="rounded-3xl border border-gold/30 bg-white/90 p-6 shadow-soft backdrop-blur-sm">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-whatsapp-dark mb-3">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-whatsapp opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-whatsapp"></span>
                  </span>
                  <span>Verified Consultant Desk</span>
                </div>

                <h3 className="font-display text-2xl font-medium text-plum">
                  Dr. Anameka S Panda
                </h3>
                <p className="mt-1 text-xs text-charcoal/70">
                  Ph.D. Hon. • Certified Occult Practitioner
                </p>

                <div className="mt-5 space-y-3 border-t border-gold/20 pt-4 text-xs sm:text-sm text-charcoal/80">
                  <div className="flex items-start gap-2.5">
                    <Award className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-plum">15+ Years Experience</p>
                      <p className="text-xs text-charcoal/60">Astrology, Vastu, Graphology</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Globe className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-plum">{s.serviceArea}</p>
                      <p className="text-xs text-charcoal/60">In person & Online worldwide</p>
                    </div>
                  </div>
                </div>

                {/* Quick 1-tap Actions */}
                <div className="mt-6 space-y-2.5 border-t border-gold/20 pt-4">
                  <a
                    href={waLink("Hello Dr. Anameka, I am visiting your About page and would like to connect.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp w-full justify-center text-xs sm:text-sm text-center !py-2.5"
                  >
                    <MessageCircle className="h-4 w-4 fill-current" />
                    <span>Direct WhatsApp Chat</span>
                  </a>

                  <Link
                    href="/book-consultation"
                    className="btn-gold w-full justify-center text-xs sm:text-sm text-center !py-2.5"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Book a Session</span>
                  </Link>

                  <a
                    href={`tel:${env.phone}`}
                    className="btn-ghost w-full justify-center text-xs text-center !py-2"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>Call {formatPhone(env.phone)}</span>
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Column: Bio Narrative, Timeline & Expertise */}
          <div className="lg:col-span-8 space-y-12">
            {/* Lead Narrative */}
            {intro && (
              <div className="rounded-3xl border border-gold/30 bg-white p-7 sm:p-9 shadow-soft">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold-deep mb-4">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>The Synthesis Philosophy</span>
                </span>
                <div
                  className="font-display text-[1.45rem] sm:text-[1.75rem] leading-snug text-plum [&_p]:mb-4"
                  dangerouslySetInnerHTML={{ __html: cleanHtml(intro.body) }}
                />
              </div>
            )}

            {/* Impact Highlights Ribbon */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                ["15+", "Years Dedicated Practice"],
                ["100%", "Non-Invasive Remedies"],
                ["12+", "Countries Guided Online"],
                ["13", "Holistic Disciplines"],
              ].map(([val, desc]) => (
                <div
                  key={desc}
                  className="rounded-2xl border border-gold/25 bg-white/80 p-4 text-center shadow-soft"
                >
                  <p className="font-display text-2xl sm:text-3xl font-semibold text-gold-deep">
                    {val}
                  </p>
                  <p className="mt-1 text-xs text-charcoal/75 leading-tight">{desc}</p>
                </div>
              ))}
            </div>

            {/* Other Story Sections */}
            {others.map((sec) => (
              <section
                key={sec.slug}
                id={sec.slug}
                className="rounded-3xl border border-gold/25 bg-white/80 p-7 sm:p-9 shadow-soft"
              >
                <h2 className="font-display text-2xl sm:text-3xl text-plum">{sec.title}</h2>
                <div
                  className="prose-rich mt-5"
                  dangerouslySetInnerHTML={{ __html: cleanHtml(sec.body) }}
                />
              </section>
            ))}

            {/* Areas of Expertise Grid */}
            <section className="rounded-3xl border border-gold/30 bg-gradient-to-br from-plum-deep via-plum to-plum-darkest p-7 sm:p-9 text-ivory shadow-luxury">
              <span className="text-xs uppercase tracking-widest font-semibold text-gold-light">
                Consultation Disciplines
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-display text-ivory">
                Areas of Expertise
              </h2>
              <p className="mt-2 text-sm text-ivory/75 max-w-xl">
                Dr. Anameka offers private one-on-one sessions spanning these dedicated fields:
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {services.map((x) => (
                  <Link
                    key={x.slug}
                    href={`/services/${x.slug}`}
                    className="flex items-center justify-between rounded-xl border border-gold/20 bg-white/5 p-3.5 text-sm font-medium text-ivory transition-all hover:border-gold hover:bg-gold/15 hover:text-gold-light group"
                  >
                    <span>{x.title}</span>
                    <ArrowRight className="h-4 w-4 text-gold-light/60 transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </section>

            {/* Career Timeline */}
            {timeline.length > 0 && (
              <section className="rounded-3xl border border-gold/25 bg-white p-7 sm:p-9 shadow-soft">
                <span className="text-xs uppercase tracking-widest font-semibold text-gold-deep">
                  Milestones
                </span>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl text-plum">
                  Practice Journey & Timeline
                </h2>

                <ol className="relative mt-8 border-l border-gold/40 pl-8 space-y-8">
                  {timeline.map((t) => (
                    <li key={t.period + t.title} className="relative">
                      <span
                        className="absolute -left-[2.35rem] top-1.5 h-3.5 w-3.5 rotate-45 border-2 border-gold bg-ivory shadow-sm"
                        aria-hidden
                      />
                      <p className="font-display text-lg font-semibold italic text-gold-deep">
                        {t.period}
                      </p>
                      <h3 className="mt-0.5 text-xl font-medium text-plum">{t.title}</h3>
                      {t.description && (
                        <p className="mt-1.5 text-sm text-charcoal/75 leading-relaxed">
                          {t.description}
                        </p>
                      )}
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </div>
        </div>
      </section>

      {/* Gallery Section if any photographs exist */}
      {photos.length > 0 && (
        <section className="section bg-cream pt-16">
          <div className="container-x">
            <h2 className="mb-10">Photographs</h2>
            <GalleryGrid items={photos} limit={6} />
          </div>
        </section>
      )}

      <CtaBand
        title="Schedule an Unhurried Session with Dr. Anameka"
        body="Whether you are navigating a crucial career transition, resolving spatial discord in your home, or seeking emotional clarity, guidance is just a conversation away."
      />
    </>
  );
}
