"use client";
import { useState, useMemo } from "react";
import { ArrowRight, BookOpen, CheckCircle2, Clock, MessageCircle, Sparkles, Award } from "lucide-react";
import { ServiceIcon } from "./ServiceIcon";
import { waLink } from "@/lib/env";
import { track } from "@/lib/analytics";
import type { Course } from "@/lib/types";

const categories = [
  { id: "all", label: "All Certifications" },
  { id: "astrology", label: "Vedic Astrology" },
  { id: "vastu", label: "Vastu Shastra" },
  { id: "graphology", label: "Graphology & Mind" },
  { id: "energy", label: "Energy & Healing" },
];

export function CourseBrowser({
  courses,
  onSelectCourse,
}: {
  courses: Course[];
  onSelectCourse?: (slug: string) => void;
}) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      return activeCategory === "all" || c.category === activeCategory;
    });
  }, [courses, activeCategory]);

  const toggleExpand = (slug: string) => {
    setExpandedCourse((prev) => (prev === slug ? null : slug));
  };

  const handleEnrollClick = (slug: string) => {
    track("course_inquiry_click", { course: slug });
    if (onSelectCourse) {
      onSelectCourse(slug);
    }
    const formElem = document.getElementById("course-enquiry-section");
    if (formElem) {
      formElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-10">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-gold/20 pb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`rounded-full px-5 py-2 text-xs sm:text-sm font-medium transition-all duration-300 ${
              activeCategory === cat.id
                ? "border border-gold bg-gradient-to-r from-plum to-plum-deep text-ivory shadow-soft"
                : "border border-gold/30 bg-white/80 text-plum hover:border-gold hover:bg-cream"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
        {filtered.map((c) => {
          const isExpanded = expandedCourse === c.slug;
          return (
            <article
              key={c.slug}
              className="group relative flex flex-col justify-between rounded-3xl border border-gold/30 bg-white/95 p-6 sm:p-8 shadow-soft transition-all duration-300 hover:border-gold hover:shadow-gold-glow hover:-translate-y-1"
            >
              <div>
                {/* Header Icon & Duration Pill */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-gold/30 bg-gold/10 text-gold-deep">
                    <ServiceIcon name={c.icon} className="h-6 w-6" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[11px] font-semibold text-gold-deep">
                    <Clock className="h-3 w-3" />
                    <span>{c.duration}</span>
                  </span>
                </div>

                {/* Course Title */}
                <h3 className="font-display text-2xl font-medium leading-snug text-plum group-hover:text-gold-deep transition-colors">
                  {c.title}
                </h3>
                <p className="mt-2 text-xs font-display italic text-gold-deep font-medium">
                  &ldquo;{c.tagline}&rdquo;
                </p>

                {/* Format and Level Badges */}
                <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                  <span className="rounded-lg bg-cream px-2.5 py-1 text-charcoal/80 border border-gold/20">
                    {c.format}
                  </span>
                  <span className="rounded-lg bg-cream px-2.5 py-1 text-charcoal/80 border border-gold/20">
                    {c.level}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-4 text-xs sm:text-sm text-charcoal/75 leading-relaxed">
                  {c.description}
                </p>

                {/* Modules Curriculum Accordion */}
                <div className="mt-6 border-t border-gold/20 pt-4">
                  <button
                    type="button"
                    onClick={() => toggleExpand(c.slug)}
                    className="flex items-center justify-between w-full text-xs font-semibold uppercase tracking-wider text-plum hover:text-gold-deep"
                  >
                    <span>Curriculum Highlights ({c.modules.length} Modules)</span>
                    <span className="text-gold-deep">{isExpanded ? "− Less" : "+ View"}</span>
                  </button>

                  {isExpanded && (
                    <ul className="mt-3 space-y-2 text-xs text-charcoal/80 animate-[rise_.2s_ease-out_both]">
                      {c.modules.map((m, idx) => (
                        <li key={m} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-gold-deep shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-plum">Module {idx + 1}:</strong> {m}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Certification Note */}
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-gold/10 p-2.5 border border-gold/25">
                  <Award className="h-4 w-4 text-gold-deep shrink-0" />
                  <span className="text-[11px] font-medium text-plum leading-tight">
                    {c.certification}
                  </span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-8 border-t border-gold/20 pt-5 space-y-2.5">
                <button
                  type="button"
                  onClick={() => handleEnrollClick(c.slug)}
                  className="btn-gold !py-2.5 !text-xs justify-center text-center w-full shadow-sm"
                >
                  <BookOpen className="h-3.5 w-3.5 mr-1" />
                  <span>Enquire / Register Interest</span>
                </button>

                <a
                  href={waLink(`Namaste Dr. Anameka, I am interested in joining your "${c.title}". Could you please share the syllabus and next batch timings?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp !py-2 !text-xs justify-center text-center w-full"
                >
                  <MessageCircle className="h-3.5 w-3.5 fill-current" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

