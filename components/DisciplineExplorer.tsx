"use client";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

const disciplines = [
  { key: "jyotish", name: "Vedic astrology", sanskrit: "Jyotish", body: "Reading the birth chart as a framework for reflecting on timing, tendencies and the choices in front of you.", href: "/services/vedic-astrology", links: ["Remedial measures", "Watch correction"] },
  { key: "vastu", name: "Vastu", sanskrit: "Vastu Shastra", body: "Looking at how homes and workplaces are oriented and used, from planning new spaces to non-invasive adjustments in existing ones.", href: "/services/vastu-consultation", links: ["Non-invasive Vastu", "Business premises"] },
  { key: "graph", name: "Handwriting", sanskrit: "Graphology and graphotherapy", body: "Reading handwriting and signatures as prompts for self-reflection, and practising guided writing exercises as a mindful routine.", href: "/services/graphology", links: ["Signature analysis", "Graphotherapy"] },
  { key: "names", name: "Numbers and marks", sanskrit: "Numerology and brand guidance", body: "Reviewing mobile numbers, logos and the marks you carry into the world, alongside your designer and your own judgement.", href: "/services/mobile-number-analysis", links: ["Logo design guidance", "Mobile number analysis"] },
  { key: "coach", name: "Coaching", sanskrit: "Life and business guidance", body: "Structured conversations that turn reflection into goals and steps you choose, for your life or your business.", href: "/services/life-transformation-coaching", links: ["Life transformation", "Business growth"] },
];

export function DisciplineExplorer() {
  const [active, setActive] = useState(0);
  const d = disciplines[active];
  return (
    <div className="grid gap-10 md:grid-cols-12">
      <ul className="md:col-span-6" role="tablist" aria-label="Areas of expertise" aria-orientation="vertical">
        {disciplines.map((x, i) => (
          <li key={x.key} role="presentation" className="border-b border-gold/25">
            <button role="tab" id={`tab-${x.key}`} aria-selected={i === active} aria-controls="discipline-panel" onClick={() => setActive(i)} onMouseEnter={() => setActive(i)}
              className={cn("group flex w-full items-baseline justify-between gap-6 py-5 text-left transition-colors", i === active ? "text-plum" : "text-plum/75 hover:text-plum")}>
              <span className="font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-none">{x.name}</span>
              <span className={cn("hidden text-sm transition-opacity sm:block", i === active ? "text-gold-deep opacity-100" : "opacity-0")}>{x.sanskrit}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="md:col-span-5 md:col-start-8" id="discipline-panel" role="tabpanel" aria-labelledby={`tab-${d.key}`}>
          <div key={d.key}
            className="animate-[rise_.4s_ease-out_both] rounded-[2rem] bg-plum p-8 text-ivory shadow-soft md:sticky md:top-32 md:p-10">
            <p className="font-display text-xl italic text-gold-light">{d.sanskrit}</p>
            <p className="mt-5 text-lg leading-relaxed text-ivory/85">{d.body}</p>
            <p className="mt-6 text-sm text-ivory/70">Includes {d.links.join(" and ").toLowerCase()}</p>
            <Link href={d.href} className="btn-gold mt-8">Read about {d.name.toLowerCase()}</Link>
          </div>
      </div>
    </div>
  );
}
