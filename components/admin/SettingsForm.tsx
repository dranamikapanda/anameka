"use client";
import { useActionState } from "react";
import { MediaInput } from "./MediaInput";
import { saveSettings } from "@/app/admin/actions";
import type { SiteSettings } from "@/lib/types";

const text: [keyof SiteSettings, string, boolean?][] = [
  ["name", "Site name"], ["tagline", "Tagline"], ["heroHeadline", "Hero headline", true], ["heroSubheading", "Hero subheading", true],
  ["shortBio", "Short biography", true], ["serviceArea", "Service area"], ["hours", "Hours"],
];
export function SettingsForm({ s }: { s: SiteSettings }) {
  const [state, run, pending] = useActionState(saveSettings, undefined);
  return (
    <form action={run} className="space-y-6 rounded-2xl border border-plum/10 bg-white p-6 md:p-8">
      {text.map(([k, l, long]) => (
        <div key={k}><label htmlFor={k} className="label">{l}</label>
          {long ? <textarea id={k} name={k} defaultValue={s[k]} rows={3} className="field" /> : <input id={k} name={k} defaultValue={s[k]} className="field" />}</div>
      ))}
      <div><p className="label">Official logo</p><MediaInput name="logoUrl" kind="image" initial={s.logoUrl} /></div>
      <div><p className="label">Portrait of Dr. Anameka</p><MediaInput name="portraitUrl" kind="image" initial={s.portraitUrl} /></div>
      <div><p className="label">Default social sharing image (1200 × 630)</p><MediaInput name="ogImageUrl" kind="image" initial={s.ogImageUrl} /></div>
      <p className="text-sm text-charcoal/75">Phone, WhatsApp, email, address and tracking IDs are set as environment variables so they can be verified before going live. See docs/SETUP.md.</p>
      {state?.error && <p className="err">{state.error}</p>}
      {state?.ok && <p className="text-plum" role="status">Settings saved. The website has been updated.</p>}
      <button className="btn-gold" disabled={pending}>{pending ? "Saving…" : "Save settings"}</button>
    </form>
  );
}
