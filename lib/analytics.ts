"use client";
export type AnalyticsEvent =
  | "generate_lead"
  | "contact_form_submit"
  | "whatsapp_click"
  | "phone_click"
  | "consultation_request"
  | "newsletter_signup"
  | "service_view"
  | "blog_view"
  | "gallery_interaction"
  | "video_play"
  | "tool_tab_switch"
  | "vastu_direction_select"
  | "rashi_select"
  | (string & {});

declare global { interface Window { dataLayer?: unknown[] } }

/** Pushes to the GTM dataLayer. GTM forwards to GA4; nothing is sent until consent is granted. */
export function track(event: AnalyticsEvent, params: Record<string, string | number | undefined> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
