"use client";
import { useState } from "react";
import {
  Sparkles,
  Compass,
  FileSignature,
  MessageCircle,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import { waLink } from "@/lib/env";
import { track } from "@/lib/analytics";

// --- VASTU DIRECTIONS DATA ---
const vastuDirections = [
  {
    code: "NE",
    name: "North-East (Ishanya)",
    deity: "Lord Shiva & Ishanya",
    element: "Jala (Water)",
    color: "Light Blue / Pure White",
    ideal: "Pooja Room, Meditation, Water Body, Open Space",
    avoid: "Toilets, Heavy Storage, Kitchen (Fire vs Water)",
    insight: "The most sacred spiritual zone in Vastu. Dictates clarity of thought, intuition, and divine blessings.",
    remedy: "Keep completely clean, uncluttered, and well-lit. Water fountain or brass bowl of water with fresh petals.",
  },
  {
    code: "N",
    name: "North (Uttara)",
    deity: "Lord Kuber (Treasurer)",
    element: "Jala & Akasha (Space)",
    color: "Green / Emerald",
    ideal: "Treasury / Safe, Financial Office, Living Area",
    avoid: "Heavy overhead storage, Staircases, Clutter",
    insight: "Zone of new income streams, business opportunities, and financial liquidity.",
    remedy: "Place a healthy green plant or a symbolic Kuber Yantra to stimulate cash flow.",
  },
  {
    code: "E",
    name: "East (Poorva)",
    deity: "Lord Indra & Surya Dev",
    element: "Vayu (Air) & Light",
    color: "Gold / Warm White",
    ideal: "Main entrance, Study, Living Room, Sunlit windows",
    avoid: "High boundary walls that block morning sunlight, Garbage",
    insight: "Governs social connections, vitality, health, and government/institutional relationships.",
    remedy: "Allow unobstructed sunrise light into the house or place a copper Surya symbol.",
  },
  {
    code: "SE",
    name: "South-East (Agneya)",
    deity: "Lord Agni (Fire)",
    element: "Agni (Fire)",
    color: "Red / Coral / Warm Orange",
    ideal: "Kitchen (Stove facing East), Electrical meters, Boiler",
    avoid: "Master bedroom, Water tanks, Blue/Black colours",
    insight: "Governs physical energy, digestion, speed of execution, and liquid cash.",
    remedy: "If water or wrong placement exists, use non-invasive elemental color corrections.",
  },
  {
    code: "S",
    name: "South (Dakshina)",
    deity: "Lord Yama",
    element: "Prithvi (Earth) / Agni",
    color: "Maroon / Earthy Red",
    ideal: "Bedroom, Heavy furniture, Elevated boundary walls",
    avoid: "Main open underground water tank, Main borewell",
    insight: "Governs public recognition, restful relaxation, and legal peace.",
    remedy: "Keep this zone heavier and elevated compared to North and East.",
  },
  {
    code: "SW",
    name: "South-West (Nairutya)",
    deity: "Nairuti & Rahu",
    element: "Prithvi (Earth)",
    color: "Deep Yellow / Ochre / Earth Brown",
    ideal: "Master Bedroom, Decision-maker desk, Heavy safe",
    avoid: "Main Entrance, Borewell, Underground water sumps, Balconies",
    insight: "Zone of stability, leadership authority, and family bonding. The anchor of the entire house.",
    remedy: "Place heavy brass or stone decor, lead strips, or grounding earth symbols.",
  },
  {
    code: "W",
    name: "West (Pashchima)",
    deity: "Lord Varuna (Water/Prosperity)",
    element: "Vayu / Space",
    color: "White / Silver / Grey",
    ideal: "Dining Room, Children's study, Overhead water tank",
    avoid: "Main worship pooja room as sole altar",
    insight: "Zone of profit gains, fulfilled desires, and retention of wealth.",
    remedy: "Metallic brass elements or windchimes to activate prosperity returns.",
  },
  {
    code: "NW",
    name: "North-West (Vayavya)",
    deity: "Lord Vayu (Wind)",
    element: "Vayu (Movement)",
    color: "Cream / Pearl White",
    ideal: "Guest room, Finished goods dispatch, Vehicles",
    avoid: "Master bedroom for the primary earner (causes restlessness)",
    insight: "Governs helpful friends, bank loans, commercial movement, and social networking.",
    remedy: "Ensure smooth airflow and neutral soft lighting.",
  },
];

// --- ZODIAC RASHI DATA ---
const rashis = [
  { name: "Aries (Mesha)", planet: "Mars (Mangal)", element: "Fire", trait: "Pioneering, dynamic, assertive", focus: "Channeling intense vitality without burnout; balancing impatience." },
  { name: "Taurus (Vrishabha)", planet: "Venus (Shukra)", element: "Earth", trait: "Steadfast, aesthetic, grounded", focus: "Financial security, family assets, avoiding stubborn inertia." },
  { name: "Gemini (Mithuna)", planet: "Mercury (Budha)", element: "Air", trait: "Intellectual, versatile, communicative", focus: "Focusing divergent energies, decisive commitment to one path." },
  { name: "Cancer (Karka)", planet: "Moon (Chandra)", element: "Water", trait: "Intuitive, nurturing, empathetic", focus: "Emotional boundaries, stability during fluctuating lunar transits." },
  { name: "Leo (Simha)", planet: "Sun (Surya)", element: "Fire", trait: "Regal, creative, charismatic", focus: "Leadership alignment, ego-transcendence, heart vitality." },
  { name: "Virgo (Kanya)", planet: "Mercury (Budha)", element: "Earth", trait: "Analytical, methodical, healing", focus: "Overcoming perfectionist anxiety, daily routine optimization." },
  { name: "Libra (Tula)", planet: "Venus (Shukra)", element: "Air", trait: "Harmonious, diplomatic, aesthetic", focus: "Decisiveness in partnerships, fair life equilibrium." },
  { name: "Scorpio (Vrischika)", planet: "Mars & Ketu", element: "Water", trait: "Transformational, perceptive, intense", focus: "Subconscious transmutation, releasing old resentment, occult depth." },
  { name: "Sagittarius (Dhanu)", planet: "Jupiter (Brihaspati)", element: "Fire", trait: "Philosophical, optimistic, visionary", focus: "Higher learning, dharma pursuit, ethical expansion." },
  { name: "Capricorn (Makara)", planet: "Saturn (Shani)", element: "Earth", trait: "Disciplined, ambitious, structured", focus: "Long-term career legacy, patience through Shani periods." },
  { name: "Aquarius (Kumbha)", planet: "Saturn & Rahu", element: "Air", trait: "Humanitarian, visionary, unconventional", focus: "Innovating for society, deep intellectual purpose." },
  { name: "Pisces (Meena)", planet: "Jupiter (Brihaspati)", element: "Water", trait: "Compassionate, mystic, introspective", focus: "Spiritual grounding, emotional discernment, artistic manifestation." },
];

export function InteractiveConsultationTools() {
  const [activeTab, setActiveTab] = useState<"vastu" | "astrology" | "graphology">("vastu");

  // Vastu state
  const [selectedDirection, setSelectedDirection] = useState(0);
  const currentDir = vastuDirections[selectedDirection];

  // Astrology state
  const [selectedRashi, setSelectedRashi] = useState(0);
  const currentRashi = rashis[selectedRashi];

  // Graphology state
  const [slant, setSlant] = useState<"right" | "upright" | "left">("right");
  const [signature, setSignature] = useState<"underline" | "crossing" | "ascending">("ascending");
  const [pressure, setPressure] = useState<"medium" | "heavy" | "light">("medium");

  const getGraphologyResult = () => {
    let personality = "";
    let remedy = "";

    if (slant === "right") {
      personality += "Emotionally expressive and forward-focused. You seek social connection and respond promptly to external stimuli. ";
    } else if (slant === "upright") {
      personality += "Logical, composed, and objective. You filter decisions through reason and maintain emotional equilibrium under pressure. ";
    } else {
      personality += "Reserved, introspective, and cautious. You prefer to observe before acting and carefully protect your inner emotional circle. ";
    }

    if (signature === "ascending") {
      personality += "Your ascending signature reflects optimism, ambitious drive, and natural vitality. ";
      remedy = "Maintain consistent letter size and keep baseline steady to convert ambition into daily execution.";
    } else if (signature === "underline") {
      personality += "An underline reflects healthy self-reliance, desire for identity acknowledgement, and self-confidence. ";
      remedy = "Ensure the underline never cuts through any letters to keep personal energy completely unobstructed.";
    } else {
      personality += "A line cutting through letters may reveal subconscious self-doubt or self-criticism. ";
      remedy = "Graphotherapy recommendation: Practice writing your signature cleanly without crossing through any character strokes.";
    }

    if (pressure === "heavy") {
      personality += "Deep writing pressure shows intense determination, deep sensory memory, and persistent emotional stamina.";
    } else if (pressure === "light") {
      personality += "Light pressure indicates sensitivity, adaptability, and high mental agility.";
    } else {
      personality += "Balanced pressure indicates steady endurance, adaptable stamina, and emotional resilience.";
    }

    return { personality, remedy };
  };

  const graphologyOutput = getGraphologyResult();

  return (
    <section className="section bg-gradient-to-b from-ivory via-cream/40 to-ivory border-y border-gold/25 overflow-hidden">
      <div className="container-x">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-deep mb-3">
            <Sparkles className="h-3.5 w-3.5 text-gold-deep" />
            <span>Interactive Discovery Tools</span>
          </span>
          <h2 className="text-[2.2rem] sm:text-[2.75rem] text-plum font-display">
            Explore Your Energies & Spaces
          </h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal/75 leading-relaxed">
            Test these interactive diagnostic tools formulated from Dr. Anameka’s disciplines to gain preliminary clarity before your consultation.
          </p>
        </div>

        {/* Tab Switcher - Fully Responsive for Mobile & Tablet */}
        <div className="flex justify-center mb-8 sm:mb-10 w-full px-1">
          <div className="flex flex-wrap sm:inline-flex items-center justify-center gap-1 sm:gap-1.5 p-1.5 rounded-2xl sm:rounded-full border border-gold/30 bg-white/90 shadow-soft backdrop-blur-md max-w-full">
            <button
              onClick={() => {
                setActiveTab("vastu");
                track("tool_tab_switch", { tab: "vastu" });
              }}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl sm:rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeTab === "vastu"
                  ? "bg-gradient-to-r from-plum to-plum-deep text-ivory shadow-sm"
                  : "text-plum/75 hover:text-plum hover:bg-gold/10"
              }`}
            >
              <Compass className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              <span>Vastu Compass</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("astrology");
                track("tool_tab_switch", { tab: "astrology" });
              }}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl sm:rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeTab === "astrology"
                  ? "bg-gradient-to-r from-plum to-plum-deep text-ivory shadow-sm"
                  : "text-plum/75 hover:text-plum hover:bg-gold/10"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              <span>Rashi & Cosmic Lens</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("graphology");
                track("tool_tab_switch", { tab: "graphology" });
              }}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl sm:rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeTab === "graphology"
                  ? "bg-gradient-to-r from-plum to-plum-deep text-ivory shadow-sm"
                  : "text-plum/75 hover:text-plum hover:bg-gold/10"
              }`}
            >
              <FileSignature className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              <span>Handwriting Diagnostic</span>
            </button>
          </div>
        </div>

        {/* TAB 1: VASTU COMPASS */}
        {activeTab === "vastu" && (
          <div className="grid gap-8 lg:grid-cols-12 items-start animate-[fadein_.35s_ease-out]">
            {/* 8 Directions Selector */}
            <div className="lg:col-span-5 space-y-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold-deep mb-3">
                Select a Zone to Analyze (Click Any Direction)
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {vastuDirections.map((dir, idx) => (
                  <button
                    key={dir.code}
                    onClick={() => {
                      setSelectedDirection(idx);
                      track("vastu_direction_select", { direction: dir.code });
                    }}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all duration-300 ${
                      selectedDirection === idx
                        ? "border-gold bg-plum text-ivory shadow-soft font-semibold scale-[1.02]"
                        : "border-gold/25 bg-white/80 text-plum hover:border-gold/50 hover:bg-cream"
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold font-mono tracking-wider text-gold-light">
                        {dir.code}
                      </span>
                      <p className="text-xs sm:text-sm font-display truncate">{dir.name.split(" ")[0]}</p>
                    </div>
                    <span className="text-xs opacity-60">→</span>
                  </button>
                ))}
              </div>

              <div className="rounded-2xl border border-gold/30 bg-cream/70 p-4 text-xs text-charcoal/80 leading-relaxed mt-4">
                💡 <strong>Non-Invasive Vastu Principle:</strong> We evaluate homes and workplaces without requiring demolition. Simple furniture shifts, elemental balance, and color adjustments harmonize energy flow.
              </div>
            </div>

            {/* Direction Deep-Dive Card */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border-2 border-gold/40 bg-gradient-to-br from-plum-deep via-plum to-plum-darkest p-5 sm:p-7 lg:p-9 text-ivory shadow-luxury">
                <div className="flex items-center justify-between border-b border-gold/20 pb-5">
                  <div>
                    <span className="text-xs font-mono font-semibold uppercase tracking-widest text-gold-light">
                      {currentDir.code} Zone
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl text-ivory mt-1">
                      {currentDir.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs rounded-full border border-gold/40 bg-gold/15 px-3 py-1 text-gold-light">
                      {currentDir.element}
                    </span>
                    <p className="text-[11px] text-ivory/60 mt-1">{currentDir.deity}</p>
                  </div>
                </div>

                <p className="mt-5 text-sm sm:text-base leading-relaxed text-ivory/90 italic">
                  “{currentDir.insight}”
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-gold/20 bg-white/5 p-4">
                    <div className="flex items-center gap-2 text-gold-light font-semibold text-xs uppercase tracking-wider mb-2">
                      <CheckCircle2 className="h-4 w-4 text-whatsapp" />
                      <span>Recommended Usage</span>
                    </div>
                    <p className="text-xs sm:text-sm text-ivory/85 leading-relaxed">
                      {currentDir.ideal}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gold/20 bg-white/5 p-4">
                    <div className="flex items-center gap-2 text-gold-light font-semibold text-xs uppercase tracking-wider mb-2">
                      <AlertTriangle className="h-4 w-4 text-[#F59E0B]" />
                      <span>What to Avoid</span>
                    </div>
                    <p className="text-xs sm:text-sm text-ivory/85 leading-relaxed">
                      {currentDir.avoid}
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-gold/30 bg-gold/10 p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gold-light mb-1">
                    <Lightbulb className="h-4 w-4" />
                    <span>Non-Invasive Remedy Tip</span>
                  </div>
                  <p className="text-xs sm:text-sm text-ivory/90 leading-relaxed">
                    {currentDir.remedy}
                  </p>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gold/20 pt-5">
                  <span className="text-xs text-ivory/70">
                    Want an exact floor plan review for your space?
                  </span>
                  <a
                    href={waLink(`Namaste Dr. Anameka, I want a Vastu analysis for my ${currentDir.name} zone.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp !py-2.5 !px-5 text-xs sm:text-sm w-full sm:w-auto text-center justify-center"
                  >
                    <MessageCircle className="h-4 w-4 fill-current" />
                    <span>Consult on {currentDir.code} Zone</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ASTROLOGY & RASHI */}
        {activeTab === "astrology" && (
          <div className="grid gap-8 lg:grid-cols-12 items-start animate-[fadein_.35s_ease-out]">
            {/* Rashi Selector */}
            <div className="lg:col-span-5 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold-deep mb-3">
                Select Your Moon Sign / Ascendant (Rashi)
              </p>
              <div className="grid grid-cols-2 gap-2">
                {rashis.map((r, idx) => (
                  <button
                    key={r.name}
                    onClick={() => {
                      setSelectedRashi(idx);
                      track("rashi_select", { rashi: r.name });
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all duration-300 text-xs sm:text-sm ${
                      selectedRashi === idx
                        ? "border-gold bg-plum text-ivory shadow-soft font-semibold scale-[1.02]"
                        : "border-gold/25 bg-white/80 text-plum hover:border-gold hover:bg-cream"
                    }`}
                  >
                    <span className="font-display block truncate">{r.name}</span>
                    <span className="text-[11px] opacity-70 block">{r.planet}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Rashi Output */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border-2 border-gold/40 bg-gradient-to-br from-plum-deep via-plum to-plum-darkest p-5 sm:p-7 lg:p-9 text-ivory shadow-luxury">
                <div className="flex items-center justify-between border-b border-gold/20 pb-5">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-gold-light">
                      Vedic Sign Blueprint
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl text-ivory mt-1">
                      {currentRashi.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs rounded-full border border-gold/40 bg-gold/15 px-3 py-1 text-gold-light">
                      {currentRashi.element} Element
                    </span>
                    <p className="text-xs text-gold-light/90 mt-1">Lord: {currentRashi.planet}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl border border-gold/20 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-wider text-gold-light font-semibold mb-1">
                      Innate Archetype
                    </p>
                    <p className="text-sm sm:text-base text-ivory/90 leading-relaxed font-normal">
                      {currentRashi.trait}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gold/20 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-wider text-gold-light font-semibold mb-1">
                      Current Life Growth Area
                    </p>
                    <p className="text-sm sm:text-base text-ivory/90 leading-relaxed font-normal">
                      {currentRashi.focus}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gold/20 pt-5">
                  <span className="text-xs text-ivory/70">
                    A personalized Kundli reading examines your exact Dasha & transits.
                  </span>
                  <a
                    href={waLink(`Namaste Dr. Anameka, I would like to book a Vedic Astrology consultation for ${currentRashi.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp !py-2.5 !px-5 text-xs sm:text-sm w-full sm:w-auto text-center justify-center"
                  >
                    <MessageCircle className="h-4 w-4 fill-current" />
                    <span>Consult on My Kundli</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: GRAPHOLOGY / SIGNATURE */}
        {activeTab === "graphology" && (
          <div className="grid gap-8 lg:grid-cols-12 items-start animate-[fadein_.35s_ease-out]">
            {/* Diagnostic Form */}
            <div className="lg:col-span-5 space-y-5 bg-white/80 p-6 rounded-3xl border border-gold/30 shadow-soft">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-plum mb-2">
                  1. How does your handwriting slant?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      ["right", "Slanted Right /"],
                      ["upright", "Straight |"],
                      ["left", "Slanted Left \\"],
                    ] as const
                  ).map(([k, label]) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setSlant(k)}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all ${
                        slant === k
                          ? "border-gold bg-plum text-ivory font-semibold shadow-sm"
                          : "border-gold/30 bg-white text-plum hover:bg-cream"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-plum mb-2">
                  2. What does your signature baseline look like?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      ["ascending", "Ascends Up ↗"],
                      ["underline", "Clean Underline ─"],
                      ["crossing", "Line Through ̶"],
                    ] as const
                  ).map(([k, label]) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setSignature(k)}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all ${
                        signature === k
                          ? "border-gold bg-plum text-ivory font-semibold shadow-sm"
                          : "border-gold/30 bg-white text-plum hover:bg-cream"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-plum mb-2">
                  3. Pen pressure on paper:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      ["heavy", "Heavy (Deep impressions)"],
                      ["medium", "Balanced / Medium"],
                      ["light", "Light & Gentle"],
                    ] as const
                  ).map(([k, label]) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setPressure(k)}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all ${
                        pressure === k
                          ? "border-gold bg-plum text-ivory font-semibold shadow-sm"
                          : "border-gold/30 bg-white text-plum hover:bg-cream"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Diagnostic Output */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border-2 border-gold/40 bg-gradient-to-br from-plum-deep via-plum to-plum-darkest p-5 sm:p-7 lg:p-9 text-ivory shadow-luxury">
                <div className="flex items-center justify-between border-b border-gold/20 pb-5">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-gold-light">
                      Subconscious Mind Diagnosis
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl text-ivory mt-1">
                      Your Handwriting Profile
                    </h3>
                  </div>
                  <span className="text-xs rounded-full border border-gold/40 bg-gold/15 px-3 py-1 text-gold-light">
                    Graphotherapy
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl border border-gold/20 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-wider text-gold-light font-semibold mb-1">
                      Observed Subconscious Temperament
                    </p>
                    <p className="text-sm sm:text-base text-ivory/90 leading-relaxed font-normal">
                      {graphologyOutput.personality}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gold/30 bg-gold/10 p-4">
                    <p className="text-xs uppercase tracking-wider text-gold-light font-semibold mb-1 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Graphotherapy Corrective Recommendation</span>
                    </p>
                    <p className="text-xs sm:text-sm text-ivory/90 leading-relaxed font-normal">
                      {graphologyOutput.remedy}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gold/20 pt-5">
                  <span className="text-xs text-ivory/70">
                    Send your handwriting or signature image directly for an in-depth reading.
                  </span>
                  <a
                    href={waLink(`Namaste Dr. Anameka, I did the online handwriting test (${slant} slant, ${signature} signature) and would like to send my sample for consultation.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp !py-2.5 !px-5 text-xs sm:text-sm w-full sm:w-auto text-center justify-center"
                  >
                    <MessageCircle className="h-4 w-4 fill-current" />
                    <span>Send Sample on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

