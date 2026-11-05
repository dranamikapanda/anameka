"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarHeart, MessageCircle, Phone } from "lucide-react";
import { env, waLink } from "@/lib/env";
import { track } from "@/lib/analytics";

export function FloatingActions() {
  const path = usePathname();
  if (path.startsWith("/admin")) return null;
  const item = "grid h-12 w-12 place-items-center rounded-full shadow-soft transition hover:-translate-y-0.5";
  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-3 sm:right-6">
      <a href={waLink("Hello, I would like to know more about a consultation with Dr. Anameka S Panda.")} target="_blank" rel="noopener noreferrer"
        onClick={() => track("whatsapp_click", { location: "floating" })} className={`${item} bg-[#1F8F4E] text-white`} aria-label="Chat on WhatsApp">
        <MessageCircle className="h-5 w-5" />
      </a>
      <a href={`tel:${env.phone}`} onClick={() => track("phone_click", { location: "floating" })} className={`${item} bg-plum text-ivory`} aria-label={`Call ${env.phone}`}>
        <Phone className="h-5 w-5" />
      </a>
      {path !== "/book-consultation" && (
        <Link href="/book-consultation" className={`${item} bg-gold text-plum-deep`} aria-label="Book a consultation">
          <CalendarHeart className="h-5 w-5" />
        </Link>
      )}
    </div>
  );
}
