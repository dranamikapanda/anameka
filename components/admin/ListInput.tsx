"use client";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

type Sub = { name: string; label: string; multiline?: boolean };
type Item = string | Record<string, string>;

export function ListInput({ name, initial, sub }: { name: string; initial: Item[]; sub?: Sub[] }) {
  const [items, setItems] = useState<Item[]>(initial ?? []);
  const blank = (): Item => (sub ? Object.fromEntries(sub.map((s) => [s.name, ""])) : "");
  const set = (i: number, v: Item) => setItems((xs) => xs.map((x, j) => (j === i ? v : x)));
  const move = (i: number, d: number) => setItems((xs) => { const n = [...xs]; const [x] = n.splice(i, 1); n.splice(i + d, 0, x); return n; });
  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <div key={i} className="flex gap-2 rounded-xl border border-plum/10 bg-ivory p-3">
          <div className="flex-1 space-y-2">
            {sub ? sub.map((s) => {
              const v = (it as Record<string, string>)[s.name] ?? "";
              const on = (val: string) => set(i, { ...(it as Record<string, string>), [s.name]: val });
              return s.multiline ? <textarea key={s.name} aria-label={s.label} placeholder={s.label} value={v} onChange={(e) => on(e.target.value)} rows={2} className="field" />
                : <input key={s.name} aria-label={s.label} placeholder={s.label} value={v} onChange={(e) => on(e.target.value)} className="field" />;
            }) : <input aria-label={`Item ${i + 1}`} value={it as string} onChange={(e) => set(i, e.target.value)} className="field" />}
          </div>
          <div className="flex flex-col gap-1">
            <button type="button" disabled={i === 0} onClick={() => move(i, -1)} className="rounded p-1.5 text-plum hover:bg-cream disabled:opacity-30" aria-label="Move up"><ArrowUp className="h-4 w-4" /></button>
            <button type="button" disabled={i === items.length - 1} onClick={() => move(i, 1)} className="rounded p-1.5 text-plum hover:bg-cream disabled:opacity-30" aria-label="Move down"><ArrowDown className="h-4 w-4" /></button>
            <button type="button" onClick={() => setItems((xs) => xs.filter((_, j) => j !== i))} className="rounded p-1.5 text-[#A1321F] hover:bg-cream" aria-label="Remove"><Trash2 className="h-4 w-4" /></button>
          </div>
        </div>
      ))}
      <button type="button" onClick={() => setItems((xs) => [...xs, blank()])} className="btn-ghost !py-2 text-sm"><Plus className="h-4 w-4" />Add item</button>
      <input type="hidden" name={name} value={JSON.stringify(items)} />
    </div>
  );
}
