import Link from "next/link";
import { HeroText } from "@/components/HeroText";
import { HeroVisual } from "@/components/HeroVisual";
import { Portrait } from "@/components/Portrait";
import { DisciplineExplorer } from "@/components/DisciplineExplorer";
import { ServiceCard } from "@/components/ServiceCard";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { GalleryGrid } from "@/components/GalleryGrid";
import { BlogCard } from "@/components/BlogCard";
import { CtaBand } from "@/components/CtaBand";
import { NewsletterForm } from "@/components/NewsletterForm";
import { JsonLd } from "@/components/JsonLd";
import { ProgrammeCard } from "@/components/ProgrammeCard";
import { WhatsAppKeyword } from "@/components/WhatsAppKeyword";
import { InteractiveConsultationTools } from "@/components/InteractiveConsultationTools";
import { MasterOverviewPillars } from "@/components/MasterOverviewPillars";
import {
  GraduationCap,
  Briefcase,
  Users,
  School,
  Sparkles,
  Award,
  CheckCircle2,
  Compass,
  Star,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import {
  getCategories,
  getGallery,
  getPosts,
  getProgrammes,
  getServices,
  getSettings,
  getStories,
  getTestimonials,
} from "@/lib/data";
import { buildMetadata, webPageSchema } from "@/lib/seo";
import { waLink } from "@/lib/env";

export async function generateMetadata() {
  return buildMetadata({
    path: "/",
    title: "Dr. Anameka S Panda | Vedic Astrology, Vastu & Graphology Consultant",
    description:
      "Personalised consultations with Dr. Anameka S Panda in Vedic astrology, Vastu, graphology, graphotherapy and remedial practices. Online worldwide and in person. Call +91 79925 12533.",
  });
}

const audiences = [
  {
    Icon: GraduationCap,
    title: "Students & Parents",
    badge: "Academics & Focus",
    body: "Exam confidence, concentration, handwriting therapy, and study alignment for school and competitive exam candidates.",
    href: "/programmes/exam-ready-from-the-inside",
    link: "Exam Ready From the Inside",
  },
  {
    Icon: School,
    title: "Educators & Institutions",
    badge: "Child Development",
    body: "Handwriting diagnostic training, emotional temperament detection, and student coaching for teachers.",
    href: "/programmes/child-script-coach",
    link: "Child Script Coach Programme",
  },
  {
    Icon: Briefcase,
    title: "Entrepreneurs & Business",
    badge: "Corporate Growth",
    body: "Brand logo energy analysis, phone number numerology, and commercial Vastu for offices and retail spaces.",
    href: "/services/logo-design-guidance",
    link: "Logo analysis & guidance",
  },
  {
    Icon: Users,
    title: "Individuals & Families",
    badge: "Life Direction",
    body: "Comprehensive Vedic birth chart readings, non-invasive residential Vastu, remedies, and life mentorship.",
    href: "/services/astro-vastu-integration",
    link: "Astro-Vastu Integration",
  },
];

const principles = [
  {
    title: "Personalised Consultation",
    desc: "Every session is prepared from scratch around your specific birth chart, floor plan, or handwriting samples—never a generic reading.",
  },
  {
    title: "Unhurried Personal Attention",
    desc: "Direct one-to-one time with Dr. Anameka herself, with ample space for follow-up questions and thoughtful clarification.",
  },
  {
    title: "Interdisciplinary Synthesis",
    desc: "Vedic astrology, Vastu, and Graphology work together as complementary lenses for complex life and business transitions.",
  },
  {
    title: "Practical & Non-Invasive Remedies",
    desc: "Grounded guidance that fits your daily life and budget. Zero pressure to purchase costly commercial items or undergo demolition.",
  },
  {
    title: "Clear Boundaries & Professionalism",
    desc: "Honest appraisal of what these ancient sciences can and cannot do, with utmost respect for your own discernment.",
  },
];

const stats = [
  { value: "1,200+", label: "Vedic Charts & Readings", icon: Sparkles },
  { value: "500+", label: "Spaces Harmonized", icon: Compass },
  { value: "15+ Years", label: "Dedicated Practice", icon: Award },
  { value: "12+ Countries", label: "Clients Worldwide", icon: Users },
];

export default async function Home() {
  const [s, services, testimonials, stories, gallery, posts, cats, programmes] =
    await Promise.all([
      getSettings(),
      getServices(),
      getTestimonials(),
      getStories(),
      getGallery(),
      getPosts(),
      getCategories(),
      getProgrammes(),
    ]);

  const catName = (slug: string) => cats.find((c) => c.slug === slug)?.name;
  const [lead, ...rest] = posts;

  return (
    <>
      <JsonLd data={webPageSchema("/", "Dr. Anameka S Panda", s.shortBio)} />

      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-plum-deep">
        {/* Ambient celestial luxury backdrop */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_45%,#6B3F7A_0%,#441F51_38%,#2B1234_75%)]" />
        <div className="absolute top-1/4 left-10 h-72 w-72 rounded-full bg-gold/10 blur-[100px] pointer-events-none" />

        <div className="container-x grid min-h-[92svh] items-center gap-12 pb-16 pt-32 lg:grid-cols-12 lg:pt-36">
          <div className="lg:col-span-6">
            <HeroText headline={s.heroHeadline} sub={s.heroSubheading} />
          </div>

          {/* Majestic Hero Portrait Frame with 3D Yantra Aura - Refined Proportions */}
          <div className="relative mx-auto w-full max-w-[400px] lg:col-span-6 flex flex-col items-center justify-center px-2 sm:px-0">
            {/* 3D Sacred Yantra Background Aura */}
            <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
              <HeroVisual />
            </div>

            {/* Regal Portrait Container */}
            <div className="relative z-10 w-full max-w-[230px] xs:max-w-[250px] sm:max-w-[275px] lg:max-w-[295px]">
              <Portrait
                src={s.portraitUrl}
                priority
                aspect="aspect-[4/5]"
                className="w-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]"
              />

              {/* Desktop-only floating badges - neatly positioned beside the frame */}
              <div className="hidden lg:flex absolute -left-10 top-12 z-20 items-center gap-2.5 rounded-xl border border-gold/40 bg-plum-deep/95 px-3.5 py-2 shadow-xl backdrop-blur-md animate-float">
                <div className="grid h-7 w-7 place-items-center rounded-lg bg-gold/20 text-gold-light shrink-0">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gold-light leading-none">15+ Years</p>
                  <p className="text-[10px] text-ivory/70 mt-0.5">Dedicated Practice</p>
                </div>
              </div>

              <div className="hidden lg:flex absolute -right-10 bottom-12 z-20 items-center gap-2.5 rounded-xl border border-gold/40 bg-plum-deep/95 px-3.5 py-2 shadow-xl backdrop-blur-md animate-float [animation-delay:1.5s]">
                <div className="grid h-7 w-7 place-items-center rounded-full bg-whatsapp/20 text-whatsapp shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-ivory leading-none">Holistic Care</p>
                  <p className="text-[10px] text-gold-light mt-0.5">Vedic · Vastu · Script</p>
                </div>
              </div>
            </div>

            {/* Mobile/Tablet Trust Ribbon - placed cleanly underneath the portrait */}
            <div className="relative z-20 mt-3.5 flex flex-wrap items-center justify-center gap-2 lg:hidden w-full max-w-[300px]">
              <div className="flex items-center gap-1.5 rounded-lg border border-gold/40 bg-plum-deep/95 px-2.5 py-1.5 shadow-md backdrop-blur-md">
                <Sparkles className="h-3 w-3 text-gold-light" />
                <span className="text-[11px] font-semibold text-gold-light">15+ Years Practice</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg border border-gold/40 bg-plum-deep/95 px-2.5 py-1.5 shadow-md backdrop-blur-md">
                <CheckCircle2 className="h-3 w-3 text-whatsapp" />
                <span className="text-[11px] font-semibold text-ivory">Certified Holistic Care</span>
              </div>
            </div>
          </div>
        </div>

        {/* Impact & Trust Stats Ribbon */}
        <div className="border-t border-gold/25 bg-plum-darkest/75 backdrop-blur-md py-5 sm:py-6">
          <div className="container-x">
            <div className="grid grid-cols-2 gap-3.5 sm:gap-6 lg:grid-cols-4">
              {stats.map(({ value, label, icon: StatIcon }) => (
                <div key={label} className="flex items-center gap-2.5 sm:gap-3.5">
                  <div className="grid h-9 w-9 sm:h-11 sm:w-11 shrink-0 place-items-center rounded-xl border border-gold/30 bg-gold/10 text-gold-light">
                    <StatIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-lg sm:text-2xl font-semibold text-gold-light leading-none truncate">
                      {value}
                    </p>
                    <p className="mt-1 text-[11px] sm:text-xs text-ivory/70 font-medium truncate sm:whitespace-normal">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Introduction to Dr. Anameka */}
      <section className="section grain bg-cream">
        <div className="container-x grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5 flex justify-center md:justify-start">
            <div className="relative w-full max-w-[230px] xs:max-w-[250px] sm:max-w-[275px] lg:max-w-[295px]">
              <div className="absolute -inset-2.5 rounded-[2rem] bg-gradient-to-r from-gold/25 to-plum/15 blur-lg opacity-70" />
              <Portrait
                src={s.portraitUrl}
                aspect="aspect-[4/5]"
                className="relative shadow-luxury w-full"
              />
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-gold-deep mb-4">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Certified Practitioner</span>
            </div>

            <h2>Meet Dr. Anameka S Panda</h2>
            <p className="mt-5 font-display text-[1.65rem] leading-snug text-plum">
              {s.shortBio}
            </p>
            <p className="lede mt-5">
              Her practice synthesizes Vedic astrology, Vastu Shastra, handwriting analysis, and subconscious coaching. When a question touches career, family harmony, health, or business, it is examined holistically rather than in isolation.
            </p>

            {/* Disciplines tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Vedic Astrology (Jyotish)",
                "Non-Invasive Vastu Shastra",
                "Graphology & Graphotherapy",
                "Mobile Numerology",
                "Transformation Coaching",
              ].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-gold/30 bg-white/80 px-3 py-1 text-xs font-medium text-plum shadow-sm"
                >
                  ✓ {badge}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/about" className="btn-plum">
                Read full biography
              </Link>
              <a
                href={waLink("Hello Dr. Anameka, I would like to introduce myself and discuss a consultation.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp !py-3 text-sm"
              >
                <MessageCircle className="h-4 w-4 fill-current" />
                <span>Quick WhatsApp intro</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Who she works with */}
      <section className="section bg-ivory">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-semibold text-gold-deep">
              Tailored Guidance
            </span>
            <h2 className="mt-2">Who Anameka works with</h2>
            <p className="mt-3 text-base sm:text-lg text-charcoal/75">
              Structured pathways for different life stages, from students preparing for competitive exams to business owners scaling their enterprises.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map(({ Icon, title, badge, body, href, link }) => (
              <div
                key={title}
                className="group relative flex flex-col justify-between rounded-3xl border border-gold/30 bg-white p-5 sm:p-7 shadow-soft transition-all duration-300 hover:border-gold hover:shadow-gold-glow hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl border border-gold/40 bg-cream text-gold-deep transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <span className="text-[11px] font-medium text-gold-deep rounded-full bg-gold/10 px-2.5 py-0.5 border border-gold/25">
                      {badge}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-xl sm:text-2xl text-plum">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal/75">
                    {body}
                  </p>
                </div>

                <div className="mt-6 border-t border-gold/20 pt-4">
                  <Link
                    href={href}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-plum transition-colors hover:text-gold-deep"
                  >
                    <span>{link}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Programmes */}
      <section className="section relative overflow-hidden bg-gradient-to-br from-plum-deep via-plum to-plum-darkest text-ivory">
        <div className="container-x">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-gold-light">
                Curated Methodologies
              </span>
              <h2 className="mt-2 text-ivory">Signature Programmes</h2>
              <p className="mt-3 max-w-xl text-ivory/80 text-base sm:text-lg">
                Structured multi-session programmes for students, parents, and teachers, formulated by Dr. Anameka.
              </p>
            </div>
            <Link href="/programmes" className="btn-ghost-light self-start md:self-auto">
              View all programmes →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programmes.slice(0, 3).map((p) => (
              <ProgrammeCard key={p.slug} p={p} dark />
            ))}
          </div>
        </div>
      </section>

      {/* Master Overview: The 3 Core Pillars */}
      <MasterOverviewPillars />

      {/* Areas of Expertise */}
      <section className="section bg-ivory">
        <div className="container-x">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-widest font-semibold text-gold-deep">
              Core Disciplines
            </span>
            <h2 className="mt-2">Areas of expertise</h2>
            <p className="mt-3 text-base sm:text-lg text-charcoal/75">
              Select any discipline below to review its philosophy, methodology, and how a consultation is conducted.
            </p>
          </div>
          <DisciplineExplorer />
        </div>
      </section>

      {/* Consultations Offered */}
      <section className="section bg-cream/50 pt-0">
        <div className="container-x">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-gold-deep">
                Consultation Catalog
              </span>
              <h2 className="mt-2 max-w-xl">Consultations offered</h2>
              <p className="mt-3 text-base text-charcoal/75">
                Every consultation is conducted individually with Dr. Anameka, available online or in person.
              </p>
            </div>
            <Link href="/services" className="btn-ghost self-start md:self-auto">
              See all {services.length} services →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((x) => (
              <ServiceCard key={x.slug} s={x} />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Consultation & Energy Tools */}
      <InteractiveConsultationTools />

      {/* How consultations are approached */}
      <section className="section grain bg-cream">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <span className="text-xs uppercase tracking-widest font-semibold text-gold-deep">
              Our Philosophy
            </span>
            <h2 className="mt-2">How consultations are approached</h2>
            <p className="lede mt-4">
              What you can expect from every session, whichever discipline or programme you select.
            </p>

            <div className="mt-8 rounded-2xl border border-gold/30 bg-white/70 p-5 backdrop-blur-sm">
              <p className="text-sm font-semibold text-plum">
                Have specific questions about procedure?
              </p>
              <a
                href={waLink("Namaste Dr. Anameka, I have a few questions about how your consultations work.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-whatsapp-dark hover:underline"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Ask directly on WhatsApp →</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 space-y-4">
            {principles.map(({ title, desc }, index) => (
              <div
                key={title}
                className="group rounded-2xl border border-gold/25 bg-white/90 p-6 shadow-sm transition-all duration-300 hover:border-gold hover:shadow-soft"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-2xl font-semibold text-gold-deep/60 group-hover:text-gold-deep">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-plum">{title}</h3>
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-charcoal/80">
                      {desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="section relative overflow-hidden bg-gradient-to-br from-plum-deep via-plum to-plum-darkest text-ivory">
          <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              {/* 5 Star rating badge */}
              <div className="flex items-center gap-1.5 text-gold-light mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-gold-light text-gold-light" />
                ))}
                <span className="ml-2 text-xs font-medium text-ivory/80 uppercase tracking-widest">
                  Verified Clients
                </span>
              </div>

              <h2 className="text-ivory">In our clients' words</h2>
              <p className="mt-4 text-base text-ivory/80 leading-relaxed">
                Shared with direct client consent. Every individual journey and outcome reflects their unique effort and timing.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/testimonials" className="btn-ghost-light">
                  Read all testimonials
                </Link>
                <Link href="/book-consultation" className="btn-gold">
                  Book your session
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-gold/30 bg-white/5 p-8 backdrop-blur-md">
                <TestimonialCarousel items={testimonials} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Success Stories */}
      {stories.length > 0 && (
        <section className="section bg-ivory">
          <div className="container-x">
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-gold-deep">
                  Real Case Studies
                </span>
                <h2 className="mt-2">Client stories</h2>
              </div>
              <Link href="/success-stories" className="btn-ghost self-start">
                Read all stories →
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {stories.slice(0, 3).map((st) => (
                <article
                  key={st.id}
                  className="rounded-3xl border border-gold/30 bg-white p-7 shadow-soft transition-all duration-300 hover:border-gold hover:shadow-gold-glow hover:-translate-y-1"
                >
                  <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-gold-deep border border-gold/25">
                    {st.client_label}
                  </span>
                  <h3 className="mt-4 font-display text-xl text-plum">
                    <Link href={`/success-stories#${st.slug}`} className="hover:text-gold-deep">
                      {st.title}
                    </Link>
                  </h3>
                  <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-charcoal/75">
                    {st.outcome}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery preview */}
      {gallery.length > 0 && (
        <section className="section bg-cream">
          <div className="container-x">
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-gold-deep">
                  Moments & Workshops
                </span>
                <h2 className="mt-2">From the practice</h2>
              </div>
              <Link href="/gallery" className="btn-ghost self-start">
                Open full gallery →
              </Link>
            </div>
            <GalleryGrid items={gallery} limit={6} />
          </div>
        </section>
      )}

      {/* Knowledge Centre */}
      {lead && (
        <section className="section bg-ivory">
          <div className="container-x">
            <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-gold-deep">
                  Articles & Research
                </span>
                <h2 className="mt-2">From the knowledge centre</h2>
              </div>
              <Link href="/blog" className="btn-ghost self-start">
                All articles →
              </Link>
            </div>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <BlogCard post={lead} categoryName={catName(lead.category_slug)} large />
              </div>
              <div className="space-y-8 lg:col-span-5">
                {rest.slice(0, 2).map((p) => (
                  <BlogCard key={p.slug} post={p} categoryName={catName(p.category_slug)} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Free Parent Resource with instant WhatsApp Keyword */}
      <section className="grain bg-cream py-16 border-y border-gold/25">
        <div className="container-x grid gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <span className="text-xs uppercase tracking-widest font-semibold text-gold-deep">
              Free Parent Resource
            </span>
            <h2 className="mt-2 text-[2.2rem]">Five-minute notebook checklist for parents</h2>
            <p className="mt-3 max-w-xl text-charcoal/80">
              More tuition doesn't always solve performance blocks. This short checklist helps you inspect your child's notebook today to notice emotional pressure, concentration fatigue, or margin spacing habits.
            </p>
          </div>
          <div className="md:col-span-5 md:flex md:justify-end">
            <WhatsAppKeyword
              keyword="CHECKLIST"
              label="Receive Free Checklist on WhatsApp"
              context="home_checklist"
            />
          </div>
        </div>
      </section>

      {/* Main CTA */}
      <CtaBand />

      {/* Newsletter */}
      <section className="py-20 bg-ivory">
        <div className="container-x grid gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-6">
            <h2 className="text-[2.2rem]">Letters from the knowledge centre</h2>
            <p className="mt-3 text-charcoal/75">
              Reflections on planetary transits, seasonal Vastu practices, and graphology insights. Sent respectfully without spam; unsubscribe at any moment.
            </p>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
