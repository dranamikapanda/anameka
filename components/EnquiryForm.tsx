"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { track } from "@/lib/analytics";
import { waLink } from "@/lib/env";
import { cn } from "@/lib/utils";

type Errors = Record<string, string>;
const times = ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

function Field({ id, label, children, optional, e }: { id: string; label: string; children: React.ReactNode; optional?: boolean; e: Errors }) {
  return (
    <div>
      <label htmlFor={`f-${id}`} className="label">{label}{optional && <span className="font-normal text-charcoal/75"> (optional)</span>}</label>
      {children}
      {e[id] && <p id={`e-${id}`} className="err">{e[id]}</p>}
    </div>
  );
}

type Opt = { slug: string; title: string };
export function EnquiryForm({ kind, services, programmes = [], defaultService }: { kind: "contact" | "consultation"; services: Opt[]; programmes?: Opt[]; defaultService?: string }) {
  const path = usePathname();
  const all = [...services, ...programmes];
  const preselect = defaultService && all.some((s) => s.slug === defaultService) ? defaultService : undefined;
  const startedAt = useRef(0);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [serverMsg, setServerMsg] = useState("");
  const [summary, setSummary] = useState("");
  useEffect(() => { startedAt.current = Date.now(); }, []);
  const consult = kind === "consultation";
  const today = new Date().toISOString().slice(0, 10);

  function validate(d: Record<string, unknown>): Errors {
    const e: Errors = {};
    if (!d.full_name || String(d.full_name).trim().length < 2) e.full_name = "Enter your full name";
    if (!/^\+?[0-9\s-]{8,16}$/.test(String(d.phone || "").trim())) e.phone = "Enter a valid phone number, for example +91 98765 43210";
    if (d.email && !/^\S+@\S+\.\S+$/.test(String(d.email))) e.email = "Enter a valid email address";
    if (consult) {
      if (!d.service_slug) e.service_slug = "Choose a service";
      if (!d.mode) e.mode = "Choose online or offline";
      if (!d.preferred_date) e.preferred_date = "Choose a preferred date";
    }
    if (!d.consent) e.consent = "Please agree so we can contact you about your enquiry";
    return e;
  }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    const d: Record<string, unknown> = Object.fromEntries(fd.entries());
    d.consent = fd.get("consent") === "on";
    d.kind = kind; d.source_page = path; d.started_at = startedAt.current;
    if (!consult) delete d.mode;
    const e = validate(d);
    setErrors(e);
    if (Object.keys(e).length) { document.getElementById(`f-${Object.keys(e)[0]}`)?.focus(); return; }
    setState("sending");
    const res = await fetch("/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) }).catch(() => null);
    const j = await res?.json().catch(() => ({}));
    if (res?.ok) {
      setState("done");
      const svc = all.find((s) => s.slug === d.service_slug)?.title;
      setSummary(`Hello, I have just sent a ${consult ? "consultation request" : "message"} on the website. Name: ${d.full_name}${svc ? `. Service: ${svc}` : ""}${d.preferred_date ? `. Preferred date: ${d.preferred_date} ${d.preferred_time || ""}` : ""}.`);
      track("generate_lead", { form: kind, service: String(d.service_slug || "") });
      track(consult ? "consultation_request" : "contact_form_submit", { service: String(d.service_slug || "") });
    } else {
      setState("error");
      if (j?.fieldErrors) setErrors(j.fieldErrors);
      setServerMsg(j?.error || "Your request didn't send. Check your connection and try again, or reach us on WhatsApp.");
    }
  }

  if (state === "done") return (
    <div role="status" className="rounded-3xl border border-gold/30 bg-white p-8 md:p-10">
      <CheckCircle2 className="h-10 w-10 text-gold" strokeWidth={1.4} />
      <h2 className="mt-4 text-3xl">{consult ? "Request received" : "Message sent"}</h2>
      <p className="mt-3 text-charcoal/80">Thank you. The team will contact you shortly to confirm{consult ? " your consultation time" : ""}. If you'd like a quicker reply, send the details on WhatsApp too.</p>
      <a href={waLink(summary)} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { location: "form_success" })} className="btn-plum mt-6"><MessageCircle className="h-4 w-4" />Send on WhatsApp</a>
    </div>
  );

  const a = (id: string) => ({ id: `f-${id}`, name: id, "aria-invalid": !!errors[id] || undefined, "aria-describedby": errors[id] ? `e-${id}` : undefined, className: cn("field", errors[id] && "border-[#A1321F]") });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 rounded-3xl border border-gold/25 bg-white p-5 sm:p-7 md:p-10 shadow-soft md:grid-cols-2">
      <Field e={errors} id="full_name" label="Full name"><input {...a("full_name")} autoComplete="name" /></Field>
      <Field e={errors} id="phone" label="Phone number"><input {...a("phone")} type="tel" autoComplete="tel" inputMode="tel" placeholder="+91" /></Field>
      <Field e={errors} id="email" label="Email address" optional={!consult}><input {...a("email")} type="email" autoComplete="email" /></Field>
      <Field e={errors} id="service_slug" label="Service or programme" optional={!consult}>
        <select {...a("service_slug")} key={preselect} defaultValue={preselect ?? ""}>
          <option value="">Select a service</option>
          {programmes.length ? <><optgroup label="Consultations">{services.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}</optgroup>
            <optgroup label="Programmes">{programmes.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}</optgroup></>
            : services.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
        </select>
      </Field>
      {consult && (
        <>
          <fieldset className="md:col-span-2">
            <legend className="label">Consultation mode</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[["online", "Online", "Video or phone call"], ["offline", "In person", "By appointment"]].map(([v, l, d]) => (
                <label key={v} className="flex cursor-pointer items-start gap-3 rounded-xl border border-plum/15 p-3.5 sm:p-4 has-[:checked]:border-gold has-[:checked]:bg-cream">
                  <input type="radio" name="mode" value={v} id={v === "online" ? "f-mode" : undefined} className="mt-1 accent-[#C8912F]" />
                  <span><span className="block font-medium text-plum">{l}</span><span className="text-xs sm:text-sm text-charcoal/75">{d}</span></span>
                </label>
              ))}
            </div>
            {errors.mode && <p className="err">{errors.mode}</p>}
          </fieldset>
          <Field e={errors} id="preferred_date" label="Preferred date"><input {...a("preferred_date")} type="date" min={today} /></Field>
          <Field e={errors} id="preferred_time" label="Preferred time" optional>
            <select {...a("preferred_time")} defaultValue=""><option value="">Any time</option>{times.map((t) => <option key={t}>{t}</option>)}</select>
          </Field>
        </>
      )}
      <div className="md:col-span-2">
        <Field e={errors} id="message" label={consult ? "What would you like guidance on?" : "Message"} optional={consult}>
          <textarea {...a("message")} rows={5} maxLength={2000} />
        </Field>
      </div>
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="md:col-span-2">
        <label className="flex items-start gap-3 text-sm text-charcoal/80">
          <input id="f-consent" type="checkbox" name="consent" className="mt-1 h-4 w-4 accent-[#C8912F]" aria-invalid={!!errors.consent || undefined} />
          <span>I agree to be contacted about this enquiry and have read the <a href="/privacy-policy" className="text-plum underline decoration-gold underline-offset-2">privacy policy</a>.</span>
        </label>
        {errors.consent && <p className="err">{errors.consent}</p>}
      </div>
      {state === "error" && <p className="err md:col-span-2" role="alert">{serverMsg}</p>}
      <div className="md:col-span-2">
        <button className="btn-gold w-full sm:w-auto" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : consult ? "Request consultation" : "Send message"}
        </button>
      </div>
    </form>
  );
}
