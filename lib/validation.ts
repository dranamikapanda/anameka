import { z } from "zod";

const PHONE = /^\+?[0-9\s-]{8,16}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Base types are loose so that every semantic rule runs in one pass in superRefine:
 * the visitor sees all problems at once instead of fixing them in rounds.
 */
export const enquirySchema = z.object({
  kind: z.enum(["contact", "consultation", "course"]),
  full_name: z.string().trim().max(100),
  phone: z.string().trim().max(20),
  email: z.string().trim().max(160).optional(),
  service_slug: z.string().max(80).optional(),
  mode: z.string().max(10).optional(),
  preferred_date: z.string().max(10).optional(),
  preferred_time: z.string().max(40).optional(),
  message: z.string().trim().max(2000).optional(),
  consent: z.boolean().optional(),
  source_page: z.string().max(200).optional(),
  website: z.string().max(500).optional(),  // honeypot – checked in the route so bots get a fake success
  started_at: z.number().optional(),        // form render timestamp
}).superRefine((v, ctx) => {
  const err = (path: string, message: string) => ctx.addIssue({ code: "custom", path: [path], message });
  if (v.full_name.length < 2) err("full_name", "Enter your full name");
  if (!PHONE.test(v.phone)) err("phone", "Enter a valid phone number, for example +91 98765 43210");
  if (v.email && !EMAIL.test(v.email)) err("email", "Enter a valid email address");
  if (v.consent !== true) err("consent", "Please agree so we can contact you about your enquiry");
  if (v.mode && !["online", "offline"].includes(v.mode)) err("mode", "Choose online or offline");
  if (v.preferred_date && !/^\d{4}-\d{2}-\d{2}$/.test(v.preferred_date)) err("preferred_date", "Choose a valid date");
  if (v.kind === "consultation") {
    if (!v.service_slug) err("service_slug", "Choose a service");
    if (!v.mode) err("mode", "Choose online or offline");
    if (!v.preferred_date) err("preferred_date", "Choose a preferred date");
    else if (v.preferred_date < new Date().toISOString().slice(0, 10)) err("preferred_date", "Choose a date from today onwards");
  } else if (v.kind === "course") {
    if (!v.service_slug) err("service_slug", "Select a course to inquire about");
  }
}).transform((v) => ({ ...v, mode: v.mode as "online" | "offline" | undefined, consent: true as const }));
export type EnquiryInput = z.infer<typeof enquirySchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address").max(160),
  website: z.string().max(500).optional(),
});
