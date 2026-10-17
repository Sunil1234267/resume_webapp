/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        cyber: {
          blue: "#38bdf8",
          cyan: "#06b6d4",
          purple: "#a855f7",
          emerald: "#10b981",
          amber: "#f59e0b",
        },
        apex: {
          papaya: "#FF8000",
          orange: "#FF6600",
          tangerine: "#FF4500",
          amber: "#FFB020",
          cyan: "#00E5FF",
          cobalt: "#0091FF",
          carbon: "#08080C",
          surface: "#0D0E16",
          elevated: "#131422",
          border: "#23263B",
          redline: "#FF2A42",
        },
        racing: {
          papaya: "#FF8000",
          cyan: "#00E5FF",
          lime: "#00ff87",
          chartreuse: "#b8ff00",
          carbon: "#08080C",
          slate: "#0D0E16",
          emerald: "#10b981",
          amber: "#FF8000",
          redline: "#ff2a42",
        },
      },
      boxShadow: {
        'glow-papaya': '0 0 35px -5px rgba(255, 128, 0, 0.55)',
        'glow-cyan': '0 0 35px -5px rgba(0, 229, 255, 0.50)',
        'glow-apex': '0 0 40px -5px rgba(255, 128, 0, 0.4), 0 0 20px -2px rgba(0, 229, 255, 0.3)',
        'glow-lime': '0 0 35px -5px rgba(0, 255, 135, 0.45)',
        'glow-chartreuse': '0 0 35px -5px rgba(184, 255, 0, 0.40)',
        'glow-amber': '0 0 35px -5px rgba(255, 128, 0, 0.45)',
        'glow-orange': '0 0 35px -5px rgba(255, 106, 0, 0.45)',
        'glow-emerald': '0 0 35px -5px rgba(16, 185, 129, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "scanline": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
