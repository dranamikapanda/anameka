import { School, GraduationCap, Building, Award, CheckCircle2 } from "lucide-react";

export interface ClientEngagement {
  name: string;
  role: string;
  category: "Institution" | "School" | "Corporate" | "Consultancy";
  workDone: string;
  impact: string;
  icon: typeof School;
}

export const clientEngagements: ClientEngagement[] = [
  {
    name: "Indo Science Academy",
    role: "Student Counsellor & Graphotherapist",
    category: "Institution",
    workDone: "Conducted diagnostic handwriting analysis and targeted graphotherapy for students. Helped board and competitive aspirants overcome exam anxiety, mental fatigue, and focus resistance.",
    impact: "Enhanced student concentration, calmer exam temperament & noticeable handwriting speed improvement.",
    icon: GraduationCap,
  },
  {
    name: "Ruchika Public School",
    role: "Student Counselor & Handwriting Specialist",
    category: "School",
    workDone: "Student emotional assessment, graphological diagnostic camps, and faculty training workshops to decode classroom behavioral signals through student penmanship.",
    impact: "Equipped educators with non-punitive diagnostic tools to identify early emotional blocks in young minds.",
    icon: School,
  },
  {
    name: "Corporate & Enterprise Leaders",
    role: "Scientific Logo & Vastu Consultant",
    category: "Corporate",
    workDone: "Scientific logo designing, brand geometry audit, founder astrological resonance, and non-invasive commercial Vastu for corporate offices, retail spaces, and startups.",
    impact: "Harmonized premises energy flow, improved executive decision clarity, and brand vibration alignment.",
    icon: Building,
  },
  {
    name: "Educators & School Teachers",
    role: "Master Trainer — Child Script Coach™",
    category: "Institution",
    workDone: "Structured certified training for teachers across regional schools to identify dysgraphia, ADHD traits, and emotional stress in everyday classroom notebooks.",
    impact: "Trained 100+ teachers in ethical, practical handwriting science and classroom management.",
    icon: Award,
  },
];

export function InstitutionalClients() {
  return (
    <section className="section bg-ivory border-b border-gold/25 overflow-hidden">
      <div className="container-x">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/35 bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-deep">
            <Award className="h-3.5 w-3.5" />
            <span>Institutional Trust &amp; Track Record</span>
          </span>
          <h2 className="mt-3 text-plum">Clients &amp; Notable Engagements</h2>
          <p className="mt-3 text-base sm:text-lg text-charcoal/75 leading-relaxed">
            From premier educational academies to corporate enterprises, Dr. Anameka S Panda provides specialized student counseling, graphotherapy, and energetic consultancy.
          </p>
        </div>

        {/* Client Cards Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {clientEngagements.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.name}
                className="group relative flex flex-col justify-between rounded-3xl border border-gold/30 bg-white p-6 shadow-soft transition-all duration-300 hover:border-gold hover:shadow-gold-glow hover:-translate-y-1.5"
              >
                <div>
                  {/* Top Icon & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl border border-gold/30 bg-cream/70 text-gold-deep transition-transform duration-300 group-hover:scale-110 shadow-xs">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-gold-deep bg-gold/15 border border-gold/30 rounded-full px-2.5 py-0.5">
                      {c.category}
                    </span>
                  </div>

                  {/* Title & Role */}
                  <h3 className="font-display text-xl font-semibold text-plum group-hover:text-gold-deep transition-colors leading-tight">
                    {c.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gold-deep">
                    {c.role}
                  </p>

                  {/* Work Done */}
                  <div className="mt-4 border-t border-gold/20 pt-3 text-xs sm:text-sm text-charcoal/80 leading-relaxed space-y-2">
                    <p>
                      <strong className="text-plum font-semibold">Work Done: </strong>
                      {c.workDone}
                    </p>
                  </div>
                </div>

                {/* Key Impact Ribbon */}
                <div className="mt-5 pt-4 border-t border-gold/20">
                  <div className="flex items-start gap-1.5 text-xs text-charcoal/70 bg-cream/40 rounded-xl p-2.5 border border-gold/20">
                    <CheckCircle2 className="h-3.5 w-3.5 text-whatsapp-dark shrink-0 mt-0.5" />
                    <span className="leading-snug">{c.impact}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
