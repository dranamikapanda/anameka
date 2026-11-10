"use client";
import { useState } from "react";
import { CheckCircle2, MessageCircle, Send, Sparkles, AlertCircle } from "lucide-react";
import { waLink } from "@/lib/env";
import { track } from "@/lib/analytics";
import type { Course } from "@/lib/types";

export function CourseEnquiryForm({
  courses,
  defaultCourseSlug,
}: {
  courses: Course[];
  defaultCourseSlug?: string;
}) {
  const [selectedCourse, setSelectedCourse] = useState(defaultCourseSlug || courses[0]?.slug || "");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [learningGoal, setLearningGoal] = useState("Personal Growth & Family Guidance");
  const [preferredBatch, setPreferredBatch] = useState("Live Weekend Batch");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName.trim() || !phone.trim() || !selectedCourse) {
      setErrorMsg("Please fill in your name, phone number, and select a course.");
      return;
    }

    setSubmitting(true);
    try {
      const combinedMessage = [
        learningGoal ? `Goal: ${learningGoal}` : null,
        preferredBatch ? `Batch Preference: ${preferredBatch}` : null,
        message ? `Notes: ${message}` : null,
      ]
        .filter(Boolean)
        .join(" | ");

      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "course",
          full_name: fullName.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          service_slug: selectedCourse,
          mode: "online",
          preferred_time: preferredBatch,
          message: combinedMessage,
          consent: true,
          source_page: "/courses",
          started_at: Date.now() - 5000,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Unable to submit course enquiry. Please connect via WhatsApp.");
      }

      setSubmitted(true);
      track("course_enquiry_submit", { course: selectedCourse });
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please connect via WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  const currentCourse = courses.find((c) => c.slug === selectedCourse) || courses[0];

  if (submitted) {
    return (
      <div className="rounded-3xl border border-gold/40 bg-white/95 p-8 sm:p-10 shadow-soft text-center animate-[rise_.4s_ease-out_both]">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-whatsapp/15 text-whatsapp mb-4">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-medium text-plum">
          Course Enquiry Received!
        </h3>
        <p className="mt-3 text-sm sm:text-base text-charcoal/80 max-w-md mx-auto">
          Thank you, <span className="font-semibold text-plum">{fullName}</span>. Dr. Anameka’s academy desk will reach out shortly with the detailed syllabus, schedule, and fee structure for{" "}
          <span className="font-semibold text-gold-deep">{currentCourse?.title}</span>.
        </p>

        <div className="mt-8 border-t border-gold/20 pt-6">
          <p className="text-xs uppercase tracking-wider text-charcoal/60 font-semibold mb-3">
            Need faster assistance on WhatsApp?
          </p>
          <a
            href={waLink(`Namaste Dr. Anameka, I have registered my interest for the "${currentCourse?.title}". Could you please share the syllabus and batch details?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp inline-flex justify-center"
          >
            <MessageCircle className="h-4 w-4 fill-current" />
            <span>Chat Directly on WhatsApp</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-gold/30 bg-white/95 p-6 sm:p-10 shadow-soft space-y-6"
    >
      <div className="border-b border-gold/20 pb-5">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-deep mb-2">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Academy Admission Desk</span>
        </span>
        <h3 className="font-display text-2xl sm:text-3xl text-plum font-medium">
          Register Your Course Interest
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-charcoal/75">
          Select your desired certification to receive upcoming batch schedules, syllabus PDFs, and fee details.
        </p>
      </div>

      {errorMsg && (
        <div className="flex items-center gap-2.5 rounded-xl border border-rose-300 bg-rose-50 p-3.5 text-xs text-rose-800">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Course Selection */}
      <div>
        <label htmlFor="course-select" className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2">
          Select Course / Masterclass *
        </label>
        <select
          id="course-select"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="w-full rounded-xl border border-gold/30 bg-cream/30 px-4 py-3 text-sm text-plum font-medium focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          required
        >
          {courses.map((c) => (
            <option key={c.slug} value={c.slug} className="text-charcoal py-1">
              {c.title} ({c.duration})
            </option>
          ))}
        </select>
      </div>

      {/* Name and Phone */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="full-name" className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2">
            Your Full Name *
          </label>
          <input
            id="full-name"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Priyadarshini Mohanty"
            className="w-full rounded-xl border border-gold/30 bg-cream/30 px-4 py-3 text-sm text-plum placeholder:text-charcoal/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2">
            WhatsApp / Phone Number *
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98765 43210"
            className="w-full rounded-xl border border-gold/30 bg-cream/30 px-4 py-3 text-sm text-plum placeholder:text-charcoal/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>
      </div>

      {/* Email and Batch Preference */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2">
            Email Address (Optional)
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="For syllabus PDF delivery"
            className="w-full rounded-xl border border-gold/30 bg-cream/30 px-4 py-3 text-sm text-plum placeholder:text-charcoal/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>

        <div>
          <label htmlFor="batch-preference" className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2">
            Preferred Batch Timing
          </label>
          <select
            id="batch-preference"
            value={preferredBatch}
            onChange={(e) => setPreferredBatch(e.target.value)}
            className="w-full rounded-xl border border-gold/30 bg-cream/30 px-4 py-3 text-sm text-plum focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          >
            <option value="Live Weekend Batch">Live Weekend Batch (Sat / Sun)</option>
            <option value="Live Weekday Evening">Live Weekday Evening</option>
            <option value="Self-Paced with Mentor Sessions">Self-Paced with Mentor Q&A</option>
          </select>
        </div>
      </div>

      {/* Learning Goal */}
      <div>
        <label htmlFor="learning-goal" className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2">
          Your Primary Learning Goal
        </label>
        <select
          id="learning-goal"
          value={learningGoal}
          onChange={(e) => setLearningGoal(e.target.value)}
          className="w-full rounded-xl border border-gold/30 bg-cream/30 px-4 py-3 text-sm text-plum focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
        >
          <option value="Personal Growth & Family Guidance">Personal Growth & Guiding Family Members</option>
          <option value="Start Professional Consulting Practice">Launch a Professional Consulting Practice</option>
          <option value="Enhance Existing Career (Counselor/HR/Educator)">Enhance Existing Career (Counselor, HR, Educator)</option>
          <option value="Curiosity & Spiritual Knowledge">Curiosity & Esoteric Exploration</option>
        </select>
      </div>

      {/* Message / Prior background */}
      <div>
        <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2">
          Prior Background or Specific Questions (Optional)
        </label>
        <textarea
          id="message"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="e.g. Complete beginner, or previous study in astrology / healing..."
          className="w-full rounded-xl border border-gold/30 bg-cream/30 px-4 py-3 text-sm text-plum placeholder:text-charcoal/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary w-full justify-center !py-3.5 shadow-md disabled:opacity-50"
        >
          {submitting ? (
            <span>Sending Enquiry...</span>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Submit Course Enquiry</span>
            </>
          )}
        </button>
      </div>

      <p className="text-center text-[11px] text-charcoal/60">
        100% confidential. Your details are securely shared with Dr. Anameka’s office only.
      </p>
    </form>
  );
}
