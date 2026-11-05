"use client";
import { useActionState, useState } from "react";
import type { Field } from "@/lib/admin/collections";
import { RichText } from "./RichText";
import { MediaInput } from "./MediaInput";
import { ListInput } from "./ListInput";
import type { ActionState } from "@/app/admin/actions";
import { slugify } from "@/lib/utils";

type Opts = Record<string, { value: string; label: string }[]>;

export function RecordForm({ fields, initial, action, dynamicOptions, statusOptions }: {
  fields: Field[]; initial: Record<string, unknown>; action: (s: ActionState, fd: FormData) => Promise<ActionState>; dynamicOptions: Opts; statusOptions: { value: string; label: string }[];
}) {
  const [state, run, pending] = useActionState(action, undefined);
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.filter((f) => f.type === "text" || f.type === "slug").map((f) => [f.name, String(initial[f.name] ?? "")])));
  const [slugTouched, setSlugTouched] = useState(Boolean(initial.id || initial.slug));
  const err = (n: string) => state?.fieldErrors?.[n];

  const input = (f: Field) => {
    const v = initial[f.name];
    const common = { id: f.name, name: f.name, "aria-invalid": !!err(f.name) || undefined, className: "field" };
    switch (f.type) {
      case "textarea": return <textarea {...common} rows={f.name.includes("seo") ? 2 : 4} defaultValue={String(v ?? "")} />;
      case "richtext": return <RichText name={f.name} initial={String(v ?? "")} />;
      case "boolean": return <label className="flex items-start gap-3"><input type="checkbox" name={f.name} defaultChecked={Boolean(v)} className="mt-1 h-4 w-4 accent-[#C8912F]" /><span className="text-charcoal/85">{f.label}</span></label>;
      case "number": return <input {...common} type="number" defaultValue={v == null ? "" : String(v)} />;
      case "date": return <input {...common} type="date" defaultValue={String(v ?? "")} />;
      case "datetime": return <input {...common} type="datetime-local" defaultValue={v ? new Date(String(v)).toLocaleString("sv-SE").slice(0, 16).replace(" ", "T") : ""} />;
      case "image": case "video": return <MediaInput name={f.name} kind={f.type} initial={String(v ?? "")} />;
      case "tags": return <input {...common} defaultValue={Array.isArray(v) ? v.join(", ") : ""} />;
      case "list": return <ListInput name={f.name} initial={(v as never[]) ?? []} sub={f.sub} />;
      case "status": return <select {...common} defaultValue={String(v ?? "draft")}>{(f.options ?? statusOptions).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select>;
      case "select": {
        const opts = f.from ? dynamicOptions[f.from] ?? [] : f.options ?? [];
        return <select {...common} defaultValue={String(v ?? "")}><option value="">Select…</option>{opts.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select>;
      }
      case "slug": return <input {...common} value={values[f.name]} onChange={(e) => { setSlugTouched(true); setValues((x) => ({ ...x, [f.name]: e.target.value })); }} />;
      default: return <input {...common} value={values[f.name]} onChange={(e) => {
        const val = e.target.value;
        setValues((x) => {
          const next = { ...x, [f.name]: val };
          const slugField = fields.find((s) => s.type === "slug" && s.from === f.name);
          if (slugField && !slugTouched) next[slugField.name] = slugify(val);
          return next;
        });
      }} />;
    }
  };

  return (
    <form action={run} className="space-y-8">
      <div className="grid gap-6 rounded-2xl border border-plum/10 bg-white p-6 md:grid-cols-2 md:p-8">
        {fields.map((f) => (
          <div key={f.name} className={f.half ? "" : "md:col-span-2"}>
            {f.type !== "boolean" && <label htmlFor={f.name} className="label">{f.label}{f.required && <span className="text-gold"> *</span>}</label>}
            {input(f)}
            {f.help && <p className="mt-1 text-sm text-charcoal/75">{f.help}</p>}
            {err(f.name) && <p className="err">{err(f.name)}</p>}
          </div>
        ))}
      </div>
      {state?.error && <p className="err" role="alert">{state.error}</p>}
      <div className="sticky bottom-0 -mx-2 flex gap-3 border-t border-plum/10 bg-ivory/95 px-2 py-4 backdrop-blur">
        <button className="btn-gold" disabled={pending}>{pending ? "Saving…" : "Save changes"}</button>
      </div>
    </form>
  );
}
