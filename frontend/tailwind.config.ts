import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        spotlight: "spotlight 2s ease .75s 1 forwards",
      },
      keyframes: {
        spotlight: {
          "0%": {
            opacity: "0",
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
      },

      colors: {
        night: {
          50: "#F6F6F8",
          100: "#ECEDF2",
          200: "#D5D7E0",
          300: "#B3B6C5",
          400: "#8F94A9",
          500: "#6B7090",
          600: "#4E5272",
          700: "#393B54",
          800: "#252837",
          900: "#14161F",
          950: "#070810",
        },
        frost: {
          50: "#FFFFFF",
          100: "#F7F2FF",
          200: "#EDE5FF",
          300: "#E2D8F5",
          400: "#D8CCEB",
          500: "#CCC0E0",
          600: "#BFB3D6",
          700: "#B3A6CC",
          800: "#A699C2",
          900: "#998CB8",
        },
        graphite: {
          50: "#F4F4F7",
          100: "#E9E9EF",
          200: "#D3D4DF",
          300: "#BCBECF",
          400: "#8B8EAB",
          500: "#5A5F87",
          600: "#464A6E",
          700: "#353956",
          800: "#2E3149",
          900: "#23253B",
        },
        coral: {
          50: "#FFF1EE",
          100: "#FFE4DE",
          200: "#FFD0C4",
          300: "#FFB3A1",
          400: "#FF917A",
          500: "#FF6B4A",
          600: "#FF4F2A",
          700: "#FF3A0F",
          800: "#E62D00",
          900: "#CC2800",
        },
      },
      fontFamily: {
        serif: ["var(--font-neue-retrograde)", "serif"],
        sans: [
          "var(--font-bt-beau-sans)",
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica Neue",
          "Noto Sans",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "coral-gradient":
          "linear-gradient(135deg, rgb(255, 107, 74) 0%, rgb(255, 58, 15) 100%)",
        "night-gradient":
          "linear-gradient(135deg, rgb(37, 40, 55) 0%, rgb(20, 22, 31) 100%)",
        "frost-gradient":
          "linear-gradient(135deg, rgb(247, 242, 255) 0%, rgb(237, 229, 255) 100%)",
      },
      boxShadow: {
        soft: "0 4px 24px rgba(0, 0, 0, 0.1)",
        glow: "0 4px 32px rgba(255, 107, 74, 0.2)",
        coral: "0 4px 24px rgba(255, 107, 74, 0.2)",
        "inner-sm": "inset 0 3px 5px rgba(46, 54, 80, 0.125)",
        btn: "rgba(255, 255, 255, 0.15) 0 1px 0 inset,rgba(46, 54, 80, 0.075) 0 1px 1px",
      },
    },
  },
  plugins: [],
} satisfies Config;
