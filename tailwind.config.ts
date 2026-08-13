import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Minimal warm-cream editorial palette.
        ink: "#242019", // warm near-black
        paper: "#f5f0e6", // cream
        muted: "#7c756a", // warm grey
        line: "#e5ddce", // soft cream border
        accent: "#8a6d43", // restrained bronze, used sparingly
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        // Headings use an elegant serif; keep mono aliased to sans so any
        // stray font-mono renders cleanly.
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.03em",
        tighter2: "-0.02em",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      maxWidth: {
        shell: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
