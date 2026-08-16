import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
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
      keyframes: {
        twinkle: {
          "0%,100%": { opacity: "0.15", transform: "scale(.85)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
        },
        spinSlow: { to: { transform: "rotate(360deg)" } },
        spinRev: { to: { transform: "rotate(-360deg)" } },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        glow: {
          "0%,100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.08)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        draw: { to: { strokeDashoffset: "0" } },
        shootingStar: {
          "0%": { transform: "translate(0,0) rotate(35deg)", opacity: "0" },
          "8%": { opacity: "1" },
          "100%": { transform: "translate(-420px,300px) rotate(35deg)", opacity: "0" },
        },
      },
      animation: {
        twinkle: "twinkle 4s ease-in-out infinite",
        "spin-slow": "spinSlow 90s linear infinite",
        "spin-med": "spinSlow 50s linear infinite",
        "spin-rev": "spinRev 70s linear infinite",
        float: "float 6s ease-in-out infinite",
        "fade-up": "fadeUp .7s cubic-bezier(.22,1,.36,1) both",
        "fade-in": "fadeIn .9s ease both",
        glow: "glow 5s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        draw: "draw 2.4s ease-out both",
        shooting: "shootingStar 7s ease-in infinite",
      },
    },
  },
  plugins: [],
};
export default config;
