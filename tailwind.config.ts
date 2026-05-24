import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0d0d14",
        "dark-2": "#111018",
        "dark-3": "#130d1a",
        "dark-card": "rgba(255,255,255,0.03)",
        cream: "#f0ece0",
        "cream-muted": "#b0a898",
        "amber-accent": "#f08c3c",
        "amber-light": "#f5a55a",
        "amber-dim": "rgba(240,140,60,0.12)",
        "amber-border": "rgba(240,140,60,0.2)",
        "purple-hint": "rgba(140,80,200,0.08)",
        "purple-soft": "#c89ad0",
        "card-border": "rgba(255,255,255,0.07)",
      },
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        lora: ["Lora", "serif"],
        manrope: ["Manrope", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
      },
      borderRadius: {
        "xl": "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        "soft": "0 4px 6px -1px rgba(0,0,0,0.3)",
        "medium": "0 10px 15px -3px rgba(0,0,0,0.4)",
        "large": "0 20px 40px -8px rgba(0,0,0,0.5)",
        "amber-glow": "0 0 20px rgba(240,140,60,0.15)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "amber-pulse": "amberPulse 2.5s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        amberPulse: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
