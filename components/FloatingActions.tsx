"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  CalendarHeart,
  MessageCircle,
  Phone,
  X,
  Send,
  Sparkles,
  Compass,
  FileSignature,
  GraduationCap,
  Briefcase,
  Calendar,
} from "lucide-react";
import { env, waLink } from "@/lib/env";
import { track } from "@/lib/analytics";

const topics = [
  {
    icon: Sparkles,
    label: "Vedic Astrology & Kundli",
    msg: "Namaste Dr. Anameka, I would like to consult regarding my Vedic Astrology chart / Kundli reading.",
  },
  {
    icon: Compass,
    label: "Vastu Shastra Consultation",
    msg: "Namaste Dr. Anameka, I am looking for a Vastu Shastra consultation for my home / workplace.",
  },
  {
    icon: FileSignature,
    label: "Handwriting & Signature Analysis",
    msg: "Namaste Dr. Anameka, I would like to get my handwriting / signature analysed.",
  },
  {
    icon: GraduationCap,
    label: "Student 'Exam Ready' Programme",
    msg: "Namaste Dr. Anameka, I want to know more about the Exam Ready From The Inside programme.",
  },
  {
    icon: Briefcase,
    label: "Business Numerology & Logo",
    msg: "Namaste Dr. Anameka, I would like guidance for business growth / mobile number & logo analysis.",
  },
  {
    icon: Calendar,
    label: "Book a 1-on-1 Consultation",
    msg: "Namaste Dr. Anameka, I would like to check availability and book a personal consultation.",
  },
];

export function FloatingActions() {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [customMsg, setCustomMsg] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  // Close tooltip after 10s
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  // Close popup if clicked outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (path.startsWith("/admin")) return null;

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    track("whatsapp_click", { location: "concierge_custom", message: customMsg });
    window.open(waLink(customMsg.trim()), "_blank", "noopener,noreferrer");
    setIsOpen(false);
    setCustomMsg("");
  };

  const handleTopicClick = (msg: string, label: string) => {
    track("whatsapp_click", { location: "concierge_topic", topic: label });
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <>
      {/* WhatsApp Concierge Card Modal / Popover */}
      {isOpen && (
        <div
          ref={panelRef}
          className="fixed bottom-20 sm:bottom-24 right-3 sm:right-6 z-50 w-[calc(100vw-24px)] max-w-sm overflow-hidden rounded-3xl border border-gold/40 bg-plum-deep text-ivory shadow-2xl backdrop-blur-xl animate-[rise_.3s_cubic-bezier(.2,.8,.2,1)_both]"
          role="dialog"
          aria-label="WhatsApp Quick Concierge"
        >
          {/* Header */}
          <div className="relative border-b border-gold/20 bg-gradient-to-r from-plum to-plum-deep p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="grid h-11 w-11 place-items-center rounded-full border border-gold/60 bg-cream text-plum font-display font-semibold text-lg shadow-sm">
                    A
                  </div>
                  {/* Glowing online beacon */}
                  <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-plum-deep bg-whatsapp">
                    <span className="absolute inset-0 animate-ping rounded-full bg-whatsapp opacity-75" />
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-base font-medium text-ivory flex items-center gap-1.5">
                    Dr. Anameka S Panda
                    <span className="text-[10px] rounded-full bg-gold/20 px-2 py-0.5 text-gold-light border border-gold/40">
                      Official
                    </span>
                  </h3>
                  <p className="flex items-center gap-1.5 text-xs text-gold-light/90">
                    <span className="h-1.5 w-1.5 rounded-full bg-whatsapp inline-block" />
                    Online • Replies within minutes
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1.5 text-ivory/70 hover:bg-white/10 hover:text-ivory transition-colors"
                aria-label="Close concierge"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 space-y-4">
            {/* Greeting Speech Bubble */}
            <div className="rounded-2xl rounded-tl-sm bg-plum/70 border border-gold/20 p-3.5 text-sm leading-relaxed text-ivory/90">
              <p className="font-medium text-gold-light mb-1">Namaste! 🙏</p>
              <p>
                Welcome to Dr. Anameka’s desk. How can we guide you today? Choose an area or type your question below:
              </p>
            </div>

            {/* Quick Topic Chips */}
            <div className="space-y-2">
              <p className="text-[11px] font-medium uppercase tracking-wider text-gold-light/75">
                Popular consultation topics
              </p>
              <div className="grid gap-2">
                {topics.map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.label}
                      type="button"
                      onClick={() => handleTopicClick(t.msg, t.label)}
                      className="group flex items-center gap-3 w-full rounded-xl border border-gold/20 bg-white/5 p-2.5 text-left text-xs sm:text-sm text-ivory/90 transition-all hover:border-gold/60 hover:bg-gold/15 active:scale-[0.99]"
                    >
                      <Icon className="h-4 w-4 text-gold-light shrink-0 transition-transform group-hover:scale-110" />
                      <span className="flex-1 font-medium">{t.label}</span>
                      <span className="text-gold-light opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-xs">
                        →
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Direct Message Form */}
            <form onSubmit={handleSendCustom} className="pt-2">
              <label htmlFor="custom-wa-msg" className="block text-[11px] font-medium uppercase tracking-wider text-gold-light/75 mb-1.5">
                Or send a custom question
              </label>
              <div className="relative">
                <input
                  id="custom-wa-msg"
                  type="text"
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  placeholder="e.g. Fees, dates, online booking..."
                  className="w-full rounded-xl border border-gold/30 bg-plum/80 px-3.5 py-2.5 pr-10 text-xs sm:text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
                <button
                  type="submit"
                  disabled={!customMsg.trim()}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg bg-whatsapp p-1.5 text-white disabled:opacity-40 hover:bg-whatsapp-hover transition-colors"
                  aria-label="Send WhatsApp message"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          </div>

          {/* Footer note */}
          <div className="border-t border-gold/15 bg-plum-darkest/70 px-4 py-2.5 text-center text-[11px] text-ivory/60">
            Secure 1-to-1 WhatsApp consultation desk • Powered by Dr. Anameka S Panda
          </div>
        </div>
      )}

      {/* Floating Bottom Action Dock */}
      <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-6 z-40 flex items-center gap-2 sm:gap-2.5">
        {/* Tooltip bubble positioned cleanly above the dock */}
        {showTooltip && !isOpen && (
          <div className="hidden sm:flex absolute bottom-14 sm:bottom-16 right-0 items-center gap-2 rounded-full border border-gold/40 bg-plum-deep/95 py-1.5 px-3.5 text-xs font-medium text-ivory shadow-xl backdrop-blur-md animate-[rise_.4s_ease-out_both] whitespace-nowrap">
            <span className="h-2 w-2 rounded-full bg-whatsapp animate-ping shrink-0" />
            <span>Chat on WhatsApp 🙏</span>
            <button
              onClick={() => setShowTooltip(false)}
              className="ml-1 text-ivory/60 hover:text-ivory"
              aria-label="Dismiss message"
            >
              ×
            </button>
          </div>
        )}

        {/* Quick Call */}
        <a
          href={`tel:${env.phone}`}
          onClick={() => track("phone_click", { location: "floating" })}
          className="group relative grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-full border border-gold/30 bg-plum-deep text-ivory shadow-soft transition-all duration-300 hover:border-gold hover:bg-plum hover:scale-105 active:scale-95"
          aria-label={`Call ${env.phone}`}
          title="Direct Call"
        >
          <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-gold-light" />
          <span className="sr-only">Call</span>
        </a>

        {/* Quick Booking */}
        {path !== "/book-consultation" && (
          <Link
            href="/book-consultation"
            className="group relative grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-full border border-gold/40 bg-gradient-to-r from-gold via-gold-light to-gold text-plum-deep shadow-gold transition-all duration-300 hover:shadow-gold-glow hover:scale-105 active:scale-95"
            aria-label="Book a consultation"
            title="Book Consultation"
          >
            <CalendarHeart className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="sr-only">Book consultation</span>
          </Link>
        )}

        {/* Main WhatsApp Trigger Button */}
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
            track("whatsapp_click", { location: "floating_trigger" });
          }}
          className="group relative flex items-center gap-2 rounded-full bg-whatsapp px-3.5 py-2.5 sm:px-4 sm:py-3 text-white shadow-whatsapp-glow transition-all duration-300 hover:bg-whatsapp-hover hover:scale-105 active:scale-95"
          aria-label="Chat on WhatsApp"
          aria-expanded={isOpen}
        >
          <div className="relative">
            <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 fill-current" />
            {/* Live Green Pulsing Dot */}
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-white"></span>
            </span>
          </div>
          <span className="hidden sm:inline font-medium text-xs sm:text-sm tracking-wide">
            {isOpen ? "Close" : "WhatsApp"}
          </span>
        </button>
      </div>
    </>
  );
}
