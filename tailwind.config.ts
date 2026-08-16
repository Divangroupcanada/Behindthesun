import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        night: "#0E0816",
        midnight: "#15102A",
        velvet: "#2B1B3D",
        gold: "#B8862F",
        "pale-gold": "#E8C77A",
        cream: "#F4E4B8",
        ember: "#C4452B",
        paper: "#FAFAF7",
        "paper-2": "#F2EFE6",
        ink: "#1A1A1A",
        "ink-muted": "#555555",
        border: "#DDD9CE",
      },
      fontFamily: {
        sans: ["Vazirmatn", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
