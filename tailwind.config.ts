import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FBF6EF",
        cream: "#F4E8DA",
        gold: {
          DEFAULT: "#C8912F",
          light: "#F2C766",
          deep: "#85591A",
          metallic: "#D4AF37",
          glow: "#FFE49E",
        },
        plum: {
          DEFAULT: "#441F51",
          deep: "#2B1234",
          soft: "#6B3F7A",
          darkest: "#1A0B20",
        },
        whatsapp: {
          DEFAULT: "#25D366",
          dark: "#128C7E",
          hover: "#20BA56",
          light: "#DCF8C6",
        },
        charcoal: "#2E2E2E",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: { prose: "68ch" },
      boxShadow: {
        soft: "0 18px 50px -24px rgba(68,31,81,0.28)",
        gold: "0 10px 30px -12px rgba(200,145,47,0.45)",
        "gold-glow": "0 0 35px -5px rgba(242,199,102,0.35)",
        "whatsapp-glow": "0 8px 25px -4px rgba(37,211,102,0.45)",
        luxury: "0 20px 60px -15px rgba(43,18,52,0.5)",
      },
      animation: {
        "spin-slow": "spin 35s linear infinite",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
        "float": "float 5s ease-in-out infinite",
        "shimmer": "shimmer 2.5s infinite linear",
      },
      keyframes: {
        pulseSubtle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.03)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
