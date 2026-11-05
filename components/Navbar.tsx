"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "/about", label: "About" }, { href: "/services", label: "Services" }, { href: "/programmes", label: "Programmes" },
  { href: "/testimonials", label: "Testimonials" }, { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" }, { href: "/contact", label: "Contact" },
];

export function Navbar({ logoUrl }: { logoUrl?: string }) {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overDark = !scrolled && (path === "/" || path.startsWith("/services/") || path.startsWith("/programmes/"));

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  if (path.startsWith("/admin")) return null;
  const active = (h: string) => (h === "/" ? path === "/" : path.startsWith(h));

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,padding] duration-500",
      scrolled ? "bg-ivory/90 py-3 shadow-[0_1px_0_rgba(200,145,47,.25)] backdrop-blur-md" : "bg-transparent py-5")}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:rounded focus:bg-ivory focus:px-3 focus:py-2">Skip to content</a>
      <nav className="container-x flex items-center justify-between" aria-label="Main">
        <Link href="/" aria-label="Dr. Anameka S Panda, home"><Logo src={logoUrl} light={overDark} /></Link>
        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={active(l.href) ? "page" : undefined}
                className={cn("relative py-1 text-[0.95rem] transition-colors", overDark ? "text-ivory/85 hover:text-gold-light" : "text-charcoal/80 hover:text-plum",
                  active(l.href) && (overDark ? "text-gold-light" : "text-plum"),
                  "after:absolute after:-bottom-0.5 after:left-0 after:h-px after:bg-gold after:transition-all", active(l.href) ? "after:w-full" : "after:w-0 hover:after:w-full")}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <Link href="/book-consultation" className="btn-gold hidden sm:inline-flex">Book consultation</Link>
          <button onClick={() => setOpen(true)} className={cn("rounded-full p-2 lg:hidden", overDark ? "text-ivory" : "text-plum")} aria-label="Open menu" aria-expanded={open}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>
      {open && (
          <div className="fixed inset-0 z-50 animate-[fadein_.25s_ease-out] bg-plum-deep/97 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
            <div className="container-x flex items-center justify-between py-5">
              <Logo src={logoUrl} light />
              <button onClick={() => setOpen(false)} className="p-2 text-ivory" aria-label="Close menu"><X className="h-7 w-7" /></button>
            </div>
            <ul className="container-x mt-6 space-y-1">
              {links.map((l, i) => (
                <li key={l.href} style={{ animationDelay: `${i * 40}ms` }} className="animate-[rise_.4s_ease-out_both]">
                  <Link href={l.href} className="block border-b border-gold/20 py-4 font-display text-3xl text-ivory">{l.label}</Link>
                </li>
              ))}
            </ul>
            <div className="container-x mt-10"><Link href="/book-consultation" className="btn-gold w-full">Book consultation</Link></div>
          </div>
      )}
    </header>
  );
}
