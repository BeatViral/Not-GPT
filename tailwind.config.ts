import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#121316",
        paper: "#fbfaf7",
        line: "#dedbd2",
        moss: "#446457",
        rust: "#9a4f2e",
        signal: "#265d91",
        caution: "#a36b00"
      },
      boxShadow: {
        "soft-line": "0 1px 0 rgba(18, 19, 22, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
