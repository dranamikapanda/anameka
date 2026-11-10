"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, MessageCircle, Phone, Calendar } from "lucide-react";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";
import { env, waLink } from "@/lib/env";
import { track } from "@/lib/analytics";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/courses", label: "Courses" },
  { href: "/programmes", label: "Programmes" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Knowledge" },
  { href: "/contact", label: "Contact" },
];

export function Navbar({ logoUrl }: { logoUrl?: string }) {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overDark = !scrolled;

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  if (path.startsWith("/admin")) return null;
  const active = (h: string) => (h === "/" ? path === "/" : path.startsWith(h));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-ivory/92 py-2.5 shadow-[0_4px_24px_rgba(43,18,52,0.06)] border-b border-gold/20 backdrop-blur-xl"
          : "bg-transparent py-4 sm:py-5"
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:rounded focus:bg-ivory focus:px-3 focus:py-2 text-plum font-medium"
      >
        Skip to content
      </a>
      <nav className="container-x flex items-center justify-between" aria-label="Main">
        <Link href="/" aria-label="Dr. Anameka S Panda, home" className="transition-transform hover:scale-[1.01]">
          <Logo src={logoUrl} light={overDark} />
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={active(l.href) ? "page" : undefined}
                className={cn(
                  "relative py-1 text-[0.95rem] font-medium tracking-wide transition-colors",
                  overDark ? "text-ivory/85 hover:text-gold-light" : "text-charcoal/80 hover:text-plum",
                  active(l.href) && (overDark ? "text-gold-light" : "text-plum"),
                  "after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:bg-gradient-to-r after:from-gold after:to-gold-light after:transition-all after:duration-300",
                  active(l.href) ? "after:w-full" : "after:w-0 hover:after:w-full"
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions: WhatsApp + Book */}
        <div className="flex items-center gap-3">
          {/* Quick WhatsApp Link in header - visible on tablet landscape & desktop */}
          <a
            href={waLink("Hello Dr. Anameka, I am visiting your website and would like to inquire about a consultation.")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { location: "navbar" })}
            className={cn(
              "hidden md:inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium transition-all duration-300",
              overDark
                ? "border border-whatsapp/50 bg-whatsapp/15 text-white hover:bg-whatsapp/30"
                : "border border-whatsapp/40 bg-whatsapp/10 text-whatsapp-dark hover:bg-whatsapp hover:text-white"
            )}
            aria-label="Direct WhatsApp Chat"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-whatsapp opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-whatsapp"></span>
            </span>
            <MessageCircle className="h-3.5 w-3.5 fill-current" />
            <span>WhatsApp</span>
          </a>

          <Link
            href="/book-consultation"
            className="btn-gold hidden sm:inline-flex !py-2.5 !px-5 text-sm"
          >
            Book consultation
          </Link>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setOpen(true)}
            className={cn(
              "rounded-full p-2.5 transition-colors lg:hidden",
              overDark ? "text-ivory hover:bg-white/10" : "text-plum hover:bg-cream"
            )}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto bg-plum-deep/98 backdrop-blur-2xl lg:hidden animate-[fadein_.25s_ease-out]"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="container-x flex items-center justify-between py-5 border-b border-gold/15">
            <Logo src={logoUrl} light />
            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-2 text-ivory/80 hover:bg-white/10 hover:text-ivory"
              aria-label="Close menu"
            >
              <X className="h-7 w-7" />
            </button>
          </div>

          {/* Links list */}
          <div className="container-x my-auto py-8">
            <ul className="space-y-1">
              {links.map((l, i) => (
                <li
                  key={l.href}
                  style={{ animationDelay: `${i * 35}ms` }}
                  className="animate-[rise_.35s_ease-out_both]"
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-gold/15 py-3.5 font-display text-2xl text-ivory/95 hover:text-gold-light"
                  >
                    <span>{l.label}</span>
                    <span className="text-sm font-sans text-gold-light/60">→</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Quick Action Cards inside mobile menu */}
            <div className="mt-8 space-y-3">
              <a
                href={waLink("Namaste Dr. Anameka, I would like to inquire about a consultation.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  track("whatsapp_click", { location: "mobile_menu" });
                  setOpen(false);
                }}
                className="flex items-center justify-center gap-2.5 w-full rounded-2xl bg-whatsapp p-3.5 text-center font-medium text-white shadow-whatsapp-glow active:scale-[0.98]"
              >
                <MessageCircle className="h-5 w-5 fill-current" />
                <span>Chat Directly on WhatsApp</span>
              </a>

              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  href="/book-consultation"
                  onClick={() => setOpen(false)}
                  className="btn-gold !py-3 text-center !rounded-xl justify-center text-xs sm:text-sm"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Book Session</span>
                </Link>

                <a
                  href={`tel:${env.phone}`}
                  onClick={() => {
                    track("phone_click", { location: "mobile_menu" });
                    setOpen(false);
                  }}
                  className="btn-ghost-light !py-3 text-center !rounded-xl justify-center text-xs sm:text-sm"
                >
                  <Phone className="h-4 w-4 text-gold-light" />
                  <span>Call Office</span>
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Footer */}
          <div className="border-t border-gold/15 bg-plum-darkest/60 py-4 text-center text-xs text-ivory/60">
            Dr. Anameka S Panda • Vedic Astrology, Vastu & Graphology
          </div>
        </div>
      )}
    </header>
  );
}
