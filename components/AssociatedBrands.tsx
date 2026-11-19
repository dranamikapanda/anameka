import { Compass, Sparkles, Building2, Smartphone, Flame, ArrowUpRight } from "lucide-react";

export interface AssociatedBrand {
  name: string;
  tagline: string;
  category: string;
  description: string;
  icon: typeof Compass;
  badge: string;
  logoUrl?: string;
  href?: string;
}

export const associatedBrands: AssociatedBrand[] = [
  {
    name: "VastuJust4U",
    tagline: "Tailored Spatial Harmonization",
    category: "Vastu Shastra Platform",
    badge: "Official Association",
    description: "Specialized residential and commercial Vastu consultancy platform delivering non-invasive energy corrections for peace, prosperity, and harmony.",
    icon: Building2,
  },
  {
    name: "Aroma Vastu",
    tagline: "Aromatic & Elemental Healing",
    category: "Sensory Energy Therapy",
    badge: "Co-Developed Modality",
    description: "Synergistic science uniting therapeutic botanical fragrances and pure essential oils with spatial directional zones to dissolve energetic stagnation.",
    icon: Flame,
  },
  {
    name: "Vastu Sarovar",
    tagline: "Vedic Research & Wisdom Repository",
    category: "Vedic Research Centre",
    badge: "Research Partner",
    description: "A premier institutional forum and archive dedicated to authentic classical Vastu Shastra literature, ancient remedies, and architectural alignments.",
    icon: Compass,
  },
  {
    name: "Consultant App",
    tagline: "Seamless Digital Consultations",
    category: "Mobile Platform",
    badge: "Digital Ecosystem",
    description: "Direct client interface app providing seamless appointment bookings, horoscope and floor plan uploads, and live interactive video consultations.",
    icon: Smartphone,
  },
  {
    name: "Puja Path App",
    tagline: "Sacred Rituals & Remedial Mantras",
    category: "Devotional Tech",
    badge: "Spiritual App",
    description: "Digital devotional companion guiding seekers through authentic Vedic chanting, astrological remedial mantras, and personalized auspicious rituals.",
    icon: Sparkles,
  },
];

export function AssociatedBrands() {
  return (
    <section className="section bg-gradient-to-b from-cream/60 via-ivory to-cream/40 border-y border-gold/25 overflow-hidden">
      <div className="container-x">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 max-w-3xl">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/35 bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-deep">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Ecosystem &amp; Affiliations</span>
            </span>
            <h2 className="mt-3 text-plum">Associated Brands &amp; Digital Ventures</h2>
          </div>
          <p className="text-sm sm:text-base text-charcoal/75 max-w-md">
            Collaborative initiatives, specialized digital apps, and research bodies working in synergy with Dr. Anameka S Panda.
          </p>
        </div>

        {/* Brand Showcase Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 items-stretch">
          {associatedBrands.map((b) => {
            const Icon = b.icon;
            return (
              <article
                key={b.name}
                className="group relative flex flex-col justify-between rounded-3xl border border-gold/30 bg-white/95 p-6 shadow-soft transition-all duration-300 hover:border-gold hover:shadow-gold-glow hover:-translate-y-1.5"
              >
                <div>
                  {/* Top Emblem & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl border border-gold/35 bg-cream/70 text-gold-deep transition-transform duration-300 group-hover:scale-110 shadow-xs">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-gold-deep bg-gold/15 border border-gold/30 rounded-full px-2.5 py-0.5">
                      {b.badge}
                    </span>
                  </div>

                  {/* Brand Title & Tagline */}
                  <h3 className="font-display text-xl font-semibold text-plum group-hover:text-gold-deep transition-colors leading-tight">
                    {b.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gold-deep">
                    {b.tagline}
                  </p>

                  {/* Description */}
                  <p className="mt-3 text-xs sm:text-sm text-charcoal/75 leading-relaxed">
                    {b.description}
                  </p>
                </div>

                {/* Footer category tag */}
                <div className="mt-5 pt-4 border-t border-gold/20 flex items-center justify-between text-xs text-charcoal/60">
                  <span className="font-medium text-plum/80">{b.category}</span>
                  <span className="inline-flex items-center text-gold-deep font-semibold group-hover:translate-x-0.5 transition-transform">
                    <span>Active</span>
                    <ArrowUpRight className="h-3.5 w-3.5 ml-0.5" />
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

