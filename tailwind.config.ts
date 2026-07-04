import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./store/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#11100e",
        silk: "#fbf7ef",
        champagne: "#d8b878",
        pearl: "#f5ead8",
        smoke: "#8f887b",
        noir: "#060606",
        rosewood: "#6f3342",
        moss: "#56624a"
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        luxe: "0 28px 80px rgba(17, 16, 14, 0.16)",
        glow: "0 0 70px rgba(216, 184, 120, 0.25)"
      },
      backgroundImage: {
        "luxe-radial":
          "radial-gradient(circle at 18% 18%, rgba(216,184,120,.26), transparent 28%), radial-gradient(circle at 82% 10%, rgba(111,51,66,.24), transparent 25%)"
      }
    }
  },
  plugins: []
};

export default config;
