"use client";
import { useSearchParams } from "next/navigation";
import { EnquiryForm } from "./EnquiryForm";

/** Booking form that preselects ?service=slug. Reading the URL here keeps the page itself static. */
export function BookingForm({ services, programmes }: { services: { slug: string; title: string }[]; programmes: { slug: string; title: string }[] }) {
  const service = useSearchParams().get("service") ?? undefined;
  return <EnquiryForm kind="consultation" services={services} programmes={programmes} defaultService={service} />;
}
