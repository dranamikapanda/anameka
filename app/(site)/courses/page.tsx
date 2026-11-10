import { PageHero } from "@/components/PageHero";
import { CourseBrowser } from "@/components/CourseBrowser";
import { CourseEnquiryForm } from "@/components/CourseEnquiryForm";
import { JsonLd } from "@/components/JsonLd";
import { getCourses } from "@/lib/data";
import { buildMetadata, webPageSchema } from "@/lib/seo";
import { Award, BookOpen, Clock, HeartHandshake, MessageCircle, ShieldCheck, Sparkles, Users } from "lucide-react";
import { waLink } from "@/lib/env";

export async function generateMetadata() {
  return buildMetadata({
    path: "/courses",
    title: "Courses & Academy | Learn Astrology, Vastu & Graphology | Dr. Anameka S Panda",
    description:
      "Comprehensive certification courses in Vedic Astrology, Non-Invasive Vastu, Graphology, and Energy Healing taught directly by Dr. Anameka S Panda. Register your interest for upcoming batches.",
  });
}

const reasons = [
  {
    icon: Award,
    title: "Direct Practitioner Mentorship",
    desc: "Taught personally by Dr. Anameka S Panda with 15+ years of real client consultations and practical case studies.",
  },
  {
    icon: ShieldCheck,
    title: "Non-Fear Based, Ethical Science",
    desc: "Learn pure classical principles without superstition, fear-mongering, or commercial dependencies.",
  },
  {
    icon: Users,
    title: "Intimate Cohorts & Live Q&A",
    desc: "Small batch sizes ensuring personal attention, doubt-clearing sessions, and interactive chart/sample reviews.",
  },
  {
    icon: BookOpen,
    title: "Lifetime Notes & Recordings",
    desc: "Full access to high-definition session recordings, study worksheets, reference calculators, and certification.",
  },
];

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <>
      <JsonLd
        data={webPageSchema(
          "/courses",
          "Courses & Academy",
          "Comprehensive certification courses in Vedic Astrology, Vastu, Graphology, and Energy Healing by Dr. Anameka S Panda."
        )}
      />

      <PageHero
        badge="Sacred Occult Academy"
        title="Courses & Masterclasses"
        crumbs={[{ name: "Courses", path: "/courses" }]}
        intro="Step into authentic esoteric mastery. Learn Vedic Astrology, Non-Invasive Vastu, Graphology, and Bio-Energy Healing through structured live practitioner certifications."
        ctaHref="#course-enquiry-section"
        ctaText="Register Course Interest"
        showWhatsAppCta
      />

      {/* Academy Overview Banner */}
      <section className="bg-cream/40 py-12 border-b border-gold/20">
        <div className="container-x">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {reasons.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-gold/25 bg-white/90 p-5 shadow-sm"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gold/15 text-gold-deep mb-3">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-medium text-plum">{title}</h3>
                <p className="mt-1.5 text-xs text-charcoal/75 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Catalog & Browser */}
      <section className="section bg-ivory">
        <div className="container-x">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="text-xs uppercase tracking-widest font-semibold text-gold-deep">
              Curated Curriculum
            </span>
            <h2 className="mt-2">Upcoming Certifications</h2>
            <p className="mt-3 text-base text-charcoal/75">
              Select any certification below to review its modules, format, and schedule. Direct WhatsApp inquiries are welcome.
            </p>
          </div>

          <CourseBrowser courses={courses} />
        </div>
      </section>

      {/* Course Enquiry Form Section */}
      <section id="course-enquiry-section" className="section bg-cream scroll-mt-24">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Academy Guidance & WhatsApp direct desk */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-whatsapp/40 bg-whatsapp/10 p-6 sm:p-8 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-whatsapp-dark">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-whatsapp opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-whatsapp" />
                </span>
                <span>Direct Academy WhatsApp Desk</span>
              </div>
              <h3 className="mt-3 text-2xl font-display text-plum font-medium">
                Want Instant Syllabus & Fees?
              </h3>
              <p className="mt-2 text-sm text-charcoal/80 leading-relaxed">
                Connect directly with Dr. Anameka’s academy coordinator on WhatsApp to request fee schedules, installment options, and reserve your seat.
              </p>
              <a
                href={waLink("Namaste Dr. Anameka, I am interested in your academy courses. Could you please share the upcoming batch schedule and admission details?")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp mt-5 w-full text-center justify-center text-sm shadow-sm"
              >
                <MessageCircle className="h-4 w-4 fill-current" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            <div className="rounded-3xl border border-gold/30 bg-white/80 p-6 sm:p-8 shadow-sm">
              <h4 className="font-display text-xl text-plum font-medium">
                Who Are These Courses For?
              </h4>
              <ul className="mt-4 space-y-3 text-xs sm:text-sm text-charcoal/80">
                <li className="flex items-start gap-2.5">
                  <Sparkles className="h-4 w-4 text-gold-deep shrink-0 mt-0.5" />
                  <span><strong>Aspiring Practitioners:</strong> Build a high-credibility practice with professional diagnostic toolkits.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Sparkles className="h-4 w-4 text-gold-deep shrink-0 mt-0.5" />
                  <span><strong>Educators & Parents:</strong> Use child script coaching to identify student emotional blocks and study resistance.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Sparkles className="h-4 w-4 text-gold-deep shrink-0 mt-0.5" />
                  <span><strong>Counselors & HR Professionals:</strong> Integrate handwriting and personality analysis into team hiring and therapy.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Sparkles className="h-4 w-4 text-gold-deep shrink-0 mt-0.5" />
                  <span><strong>Spiritual Seekers:</strong> Understand your own birth chart, home vibrations, and aura for lifelong peace.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Admission & Registration Form */}
          <div className="lg:col-span-7">
            <CourseEnquiryForm courses={courses} />
          </div>
        </div>
      </section>
    </>
  );
}

