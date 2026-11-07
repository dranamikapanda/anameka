"use client";
import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/env";
import { track } from "@/lib/analytics";

export function WhatsAppKeyword({
  keyword,
  label,
  light = false,
  context,
}: {
  keyword: string;
  label?: string;
  light?: boolean;
  context: string;
}) {
  return (
    <a
      href={waLink(`${keyword}: Hello Dr. Anameka, I would like to receive this resource.`)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { location: context, keyword })}
      className={
        light
          ? "inline-flex items-center gap-2.5 rounded-full border border-whatsapp/50 bg-whatsapp/20 px-5 py-3 text-sm font-medium text-white shadow-sm backdrop-blur-sm transition-all hover:bg-whatsapp hover:scale-105 active:scale-95"
          : "inline-flex items-center gap-2.5 rounded-full bg-whatsapp px-6 py-3.5 text-sm font-medium text-white shadow-whatsapp-glow transition-all hover:bg-whatsapp-hover hover:scale-105 active:scale-95"
      }
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
      </span>
      <MessageCircle className="h-4 w-4 fill-current" />
      <span>{label ?? `WhatsApp “${keyword}”`}</span>
    </a>
  );
}
