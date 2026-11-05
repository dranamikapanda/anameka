import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FBF6EF",
        cream: "#F4E8DA",
        gold: { DEFAULT: "#C8912F", light: "#F2C766", deep: "#85591A" },
        plum: { DEFAULT: "#441F51", deep: "#2B1234", soft: "#6B3F7A" },
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
      },
    },
  },
  plugins: [],
} satisfies Config;
