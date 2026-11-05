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
import { GraduationCap, Briefcase, Users, School } from "lucide-react";
import { getCategories, getGallery, getPosts, getProgrammes, getServices, getSettings, getStories, getTestimonials } from "@/lib/data";
import { buildMetadata, webPageSchema } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({
    path: "/",
    title: "Dr. Anameka S Panda | Vedic Astrology, Vastu & Graphology Consultant",
    description: "Personalised consultations with Dr. Anameka S Panda in Vedic astrology, Vastu, graphology, graphotherapy and remedial practices. Online and in person. Call +91 79925 12533.",
  });
}

const audiences = [
  { Icon: GraduationCap, title: "Students and parents", body: "Exam confidence, focus and study habits for school and board-exam students.", href: "/programmes/exam-ready-from-the-inside", link: "Exam Ready From the Inside" },
  { Icon: School, title: "Teachers and schools", body: "Handwriting analysis training and one-to-one consultations for educators.", href: "/programmes/child-script-coach", link: "Child Script Coach Program" },
  { Icon: Briefcase, title: "Business owners", body: "Logo analysis, mobile number numerology and Vastu for your premises.", href: "/services/logo-design-guidance", link: "Logo analysis and guidance" },
  { Icon: Users, title: "Individuals and families", body: "Vedic astrology, Astro-Vastu, practical remedies and life coaching.", href: "/services/astro-vastu-integration", link: "Astro-Vastu Integration" },
];

const principles = [
  ["Personalised consultation", "Each session is prepared around your questions, your chart, your space or your handwriting, never a template."],
  ["Individual attention", "Unhurried time with Dr. Anameka herself, with room for your follow-up questions."],
  ["Holistic guidance", "Several disciplines can be brought together when a question touches more than one part of life."],
  ["Practical suggestions", "Recommendations that fit daily life and budget. Nothing you are pressured to buy."],
  ["Professional approach", "Clear about what these traditions can and cannot do, and respectful of your own judgement."],
];

export default async function Home() {
  const [s, services, testimonials, stories, gallery, posts, cats, programmes] = await Promise.all([
    getSettings(), getServices(), getTestimonials(), getStories(), getGallery(), getPosts(), getCategories(), getProgrammes(),
  ]);
  const catName = (slug: string) => cats.find((c) => c.slug === slug)?.name;
  const [lead, ...rest] = posts;

  return (
    <>
      <JsonLd data={webPageSchema("/", "Dr. Anameka S Panda", s.shortBio)} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-plum-deep">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_45%,#6B3F7A_0%,#441F51_38%,#2B1234_75%)]" />
        <div className="container-x grid min-h-[100svh] items-center gap-12 pb-20 pt-32 lg:grid-cols-12 lg:pt-28">
          <div className="lg:col-span-6"><HeroText headline={s.heroHeadline} sub={s.heroSubheading} /></div>
          <div className="relative mx-auto w-full max-w-[560px] lg:col-span-6">
            <HeroVisual />
            <div className="absolute inset-[22%_26%_14%]"><Portrait src={s.portraitUrl} priority className="h-full !aspect-auto shadow-[0_30px_80px_-20px_rgba(0,0,0,.6)]" /></div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section grain bg-cream">
        <div className="container-x grid gap-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-4"><Portrait src={s.portraitUrl} className="mx-auto max-w-xs md:max-w-none" /></div>
          <div className="md:col-span-7 md:col-start-6">
            <h2>Meet Dr. Anameka S Panda</h2>
            <p className="mt-6 font-display text-[1.65rem] leading-snug text-plum/90">{s.shortBio}</p>
            <p className="lede mt-6">Her practice brings together Vedic astrology, Vastu, handwriting analysis and coaching, so that a question about career, home, family or business can be looked at from more than one angle.</p>
            <Link href="/about" className="btn-plum mt-8">More about Dr. Anameka</Link>
          </div>
        </div>
      </section>

      {/* Who she works with */}
      <section className="section">
        <div className="container-x">
          <h2 className="max-w-2xl">Who Anameka works with</h2>
          <ul className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map(({ Icon, title, body, href, link }) => (
              <li key={title} className="relative border-t border-gold/40 pt-6">
                <Icon className="h-8 w-8 text-gold" strokeWidth={1.4} aria-hidden />
                <h3 className="mt-4">{title}</h3>
                <p className="mt-2 text-charcoal/80">{body}</p>
                <Link href={href} className="mt-4 inline-block text-sm font-medium text-plum underline decoration-gold/60 underline-offset-4 hover:decoration-gold">{link}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Programmes */}
      <section className="section relative overflow-hidden bg-plum text-ivory">
        <div className="container-x">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="text-ivory">Programmes</h2>
              <p className="mt-4 max-w-xl text-ivory/75">Structured programmes for students, parents and teachers, created by Anameka.</p>
            </div>
            <Link href="/programmes" className="btn-ghost-light self-start md:self-auto">All programmes</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programmes.slice(0, 3).map((p) => <ProgrammeCard key={p.slug} p={p} dark />)}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="section">
        <div className="container-x">
          <h2 className="mb-12 max-w-2xl">Areas of expertise</h2>
          <DisciplineExplorer />
        </div>
      </section>

      {/* Services */}
      <section className="section bg-ivory pt-0">
        <div className="container-x">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="max-w-xl">Consultations offered</h2>
            <Link href="/services" className="btn-ghost self-start md:self-auto">See all services</Link>
          </div>
          <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((x) => <ServiceCard key={x.slug} s={x} />)}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="section grain bg-cream">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2>How consultations are approached</h2>
            <p className="lede mt-6">What you can expect from every session, whichever service you choose.</p>
          </div>
          <dl className="lg:col-span-7 lg:col-start-6">
            {principles.map(([t, d]) => (
              <div key={t} className="grid gap-2 border-t border-gold/30 py-7 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-8">
                <dt className="font-display text-2xl text-plum">{t}</dt>
                <dd className="text-charcoal/80">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Testimonials – shown only when approved testimonials exist */}
      {testimonials.length > 0 && (
        <section className="section relative overflow-hidden bg-plum">
          <div className="container-x grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="text-ivory">In clients' words</h2>
              <p className="mt-5 text-ivory/65">Shared with permission. Individual experiences vary.</p>
              <Link href="/testimonials" className="btn-ghost-light mt-8">All testimonials</Link>
            </div>
            <div className="lg:col-span-7 lg:col-start-6"><TestimonialCarousel items={testimonials} /></div>
          </div>
        </section>
      )}

      {/* Success stories */}
      {stories.length > 0 && (
        <section className="section">
          <div className="container-x">
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <h2>Client stories</h2>
              <Link href="/success-stories" className="btn-ghost self-start">Read all stories</Link>
            </div>
            <div className="grid gap-10 md:grid-cols-3">
              {stories.slice(0, 3).map((st) => (
                <article key={st.id} className="relative border-t border-gold/40 pt-6">
                  <h3><Link href={`/success-stories#${st.slug}`} className="after:absolute after:inset-0 hover:text-gold-deep">{st.title}</Link></h3>
                  <p className="mt-2 text-sm text-gold-deep">{st.client_label}</p>
                  <p className="mt-4 line-clamp-4 text-charcoal/75">{st.outcome}</p>
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
              <h2>From the practice</h2>
              <Link href="/gallery" className="btn-ghost self-start">Open the gallery</Link>
            </div>
            <GalleryGrid items={gallery} limit={6} />
          </div>
        </section>
      )}

      {/* Latest articles */}
      {lead && (
        <section className="section">
          <div className="container-x">
            <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <h2>From the knowledge centre</h2>
              <Link href="/blog" className="btn-ghost self-start">All articles</Link>
            </div>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7"><BlogCard post={lead} categoryName={catName(lead.category_slug)} large /></div>
              <div className="space-y-12 lg:col-span-4 lg:col-start-9">{rest.slice(0, 2).map((p) => <BlogCard key={p.slug} post={p} categoryName={catName(p.category_slug)} />)}</div>
            </div>
          </div>
        </section>
      )}

      {/* Free resource from the "More tuition" flyer */}
      <section className="grain bg-cream py-16">
        <div className="container-x grid gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <h2 className="text-[2.2rem]">Free five-minute notebook checklist for parents</h2>
            <p className="mt-3 max-w-xl text-charcoal/80">More tuition doesn't always mean better results. This short checklist helps you look at your child's notebook today and notice where they may be getting stuck.</p>
          </div>
          <div className="md:col-span-4 md:col-start-9"><WhatsAppKeyword keyword="CHECKLIST" label="Get the checklist on WhatsApp" context="home_checklist" /></div>
        </div>
      </section>

      <CtaBand />

      {/* Newsletter */}
      <section className="py-20">
        <div className="container-x grid gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-6">
            <h2 className="text-[2.2rem]">Letters from the knowledge centre</h2>
            <p className="mt-3 text-charcoal/75">New articles and occasional notes on astrology, Vastu and handwriting. No spam; unsubscribe any time.</p>
          </div>
          <div className="md:col-span-5 md:col-start-8"><NewsletterForm /></div>
        </div>
      </section>
    </>
  );
}
