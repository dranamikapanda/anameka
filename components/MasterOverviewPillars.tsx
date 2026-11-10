import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle, Sparkles } from "lucide-react";
import { waLink } from "@/lib/env";

const pillars = [
  {
    id: "astrology-vastu",
    icon: "🔮",
    title: "Astrology & Vastu",
    tagline: "The Stars Align. Your Space Aligns. You Align.",
    badge: "⭐ No structural changes needed",
    items: [
      "Vedic Birth Chart & Destiny Reading (Jyotish)",
      "Practical Planetary Remedies (Gems & Mantras)",
      "Non-Invasive Residential & Commercial Vastu",
      "Astro-Vastu Living Space Alignment",
    ],
    reassurance: "For health, career, relationships, and peace of mind.",
    ctaText: "Explore Astrology & Vastu",
    ctaHref: "/services",
    waMsg: "Namaste Dr. Anameka, I am interested in an Astrology & Vastu consultation.",
  },
  {
    id: "healing",
    icon: "💫",
    title: "Healing Modalities",
    tagline: "Heal. Clear. Recharge.",
    badge: "✨ Distant healing available worldwide",
    items: [
      "Reiki Healing (Distance & Hands-on restoration)",
      "Crystal Healing Therapy (Programmed gemstones)",
      "Aura Scanning & Cleansing (Energetic reset)",
      "Chakra Balancing (7 Energy vortexes)",
      "Total Energy Alignment (Health, Wealth & Harmony)",
    ],
    reassurance: "Feel lighter, think clearer, attract more.",
    ctaText: "Explore Healing Modalities",
    ctaHref: "/services",
    waMsg: "Namaste Dr. Anameka, I would like to book an Energy Healing session.",
  },
  {
    id: "consultation",
    icon: "📜",
    title: "Consultation & Analysis",
    tagline: "Science Meets the Soul",
    badge: "🏆 Trusted by 5,000+ clients",
    items: [
      "Handwriting & Signature Analysis & Therapy",
      "Wristwatch Analysis (Destiny & Decisions)",
      "Scientific Brand Logo Design & Energetic Audit",
      "Mobile Number Numerology Analysis",
      "Subconscious Life & Executive Mentorship",
    ],
    reassurance: "Your energy leaves a signature — let us read it.",
    ctaText: "Explore Analytical Services",
    ctaHref: "/services",
    waMsg: "Namaste Dr. Anameka, I would like to consult on Handwriting, Logo, or Watch analysis.",
  },
];

export function MasterOverviewPillars() {
  return (
    <section className="section relative overflow-hidden bg-gradient-to-b from-cream/70 via-ivory to-cream">
      <div className="container-x">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-deep mb-4 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Master Overview • Integrated Spiritual Science</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-plum leading-tight">
            Align Your Inner Cosmos — <br className="hidden sm:block" />
            Transform Your Outer World
          </h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal/80 leading-relaxed max-w-2xl mx-auto">
            Dr. Anameka S Panda synthesizes occult sciences and vibrational energy healing across three dedicated pathways for complete transformation.
          </p>
        </div>

        {/* 3 Pillars Cards Grid */}
        <div className="grid gap-8 md:grid-cols-3 items-stretch">
          {pillars.map((p) => (
            <div
              key={p.id}
              className="group relative flex flex-col justify-between rounded-3xl border border-gold/30 bg-white/95 p-6 sm:p-8 shadow-soft transition-all duration-300 hover:border-gold hover:shadow-gold-glow hover:-translate-y-1.5"
            >
              <div>
                {/* Pillar Header */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="text-3xl" role="img" aria-label={p.title}>
                    {p.icon}
                  </span>
                  <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[11px] font-semibold text-gold-deep">
                    {p.badge}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-medium text-plum">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm font-display italic text-gold-deep font-medium">
                  &ldquo;{p.tagline}&rdquo;
                </p>

                {/* Offerings list */}
                <ul className="mt-6 space-y-2.5 border-t border-gold/20 pt-5">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-charcoal/85">
                      <CheckCircle2 className="h-4 w-4 text-gold-deep shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Reassurance & Action Block */}
              <div className="mt-8 border-t border-gold/20 pt-5 space-y-4">
                <p className="text-xs text-charcoal/70 italic text-center">
                  {p.reassurance}
                </p>

                <div className="flex flex-col gap-2.5">
                  <Link
                    href={p.ctaHref}
                    className="btn-gold !py-2.5 !text-xs justify-center text-center w-full shadow-sm"
                  >
                    <span>{p.ctaText}</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <a
                    href={waLink(p.waMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp !py-2.5 !text-xs justify-center text-center w-full"
                  >
                    <MessageCircle className="h-3.5 w-3.5 fill-current" />
                    <span>Inquire on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Footer Reassurance CTA */}
        <div className="mt-12 text-center">
          <p className="font-display text-lg sm:text-xl italic text-plum">
            &ldquo;One session can shift everything.&rdquo; 🔮
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
            <Link href="/book-consultation" className="btn-primary">
              Book a Consultation
            </Link>
            <a
              href={waLink("Namaste Dr. Anameka, I am reaching out to book my consultation.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <MessageCircle className="h-4 w-4 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
