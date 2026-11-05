"use client";
import { useEffect } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";
export function TrackView({ event, params }: { event: AnalyticsEvent; params: Record<string, string> }) {
  useEffect(() => { track(event, params); }, [event, params]);
  return null;
}
