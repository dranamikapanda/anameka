"use client";
import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/env";
import { track } from "@/lib/analytics";

export function WhatsAppKeyword({ keyword, label, light = false, context }: { keyword: string; label?: string; light?: boolean; context: string }) {
  return (
    <a href={waLink(`${keyword}: Hello, I'd like to know more.`)} target="_blank" rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { location: context, keyword })} className={light ? "btn-ghost-light" : "btn-ghost"}>
      <MessageCircle className="h-4 w-4" />{label ?? `WhatsApp “${keyword}”`}
    </a>
  );
}
