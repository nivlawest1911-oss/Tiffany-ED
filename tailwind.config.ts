import type { Config } from "tailwindcss"

const config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Do not add node_modules here unless absolutely necessary
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
        sans: ["Inter", "var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1', // Main Blue
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          dark: "hsl(var(--primary-dark))",
          light: "hsl(var(--primary-light))",
        },
        secondary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6', // Main Purple
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2d1869',
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          green: '#10b981', // For success/positive
          red: '#ef4444', // For errors/warnings
          yellow: '#f59e0b', // For highlights
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
        brand: {
          light: '#eff6ff',
          DEFAULT: '#2563eb',
          dark: '#1e40af',
        },
        "intel-gold": "#C5A47E",
        "sovereign-black": "#050505",
        "noble-navy": "#0A0E1A",
        "glass-border": "rgba(255, 255, 255, 0.1)",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        noble: {
          gold: "#D4AF37",
          crimson: "#8B0000",
          emerald: "#006400",
          black: "#0A0A0B",
          indigo: "#1A1A2E",
          navy: "#0A0E1A",
        },
        kente: {
          yellow: "#F9D71C",
          red: "#C41E3A",
          green: "#228B22",
          black: "#000000",
          orange: "#FF8C00",
        },
        "electric-cyan": "#00B0FF",
        "sovereign-gold": "#FFB300",
        "white-smoke": "#F5F5F5",
      },
      boxShadow: {
        soft: '0 4px 12px rgba(0, 0, 0, 0.08)',
        medium: '0 8px 24px rgba(0, 0, 0, 0.12)',
        hard: '0 12px 36px rgba(0, 0, 0, 0.16)',
      },
      backgroundImage: {
        'grid': "radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)",
      },
      backgroundSize: {
        'grid': "40px 40px",
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
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        scan: {
          "0%": { top: "0%" },
          "100%": { top: "100%" },
        },
        "pulse-gold": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 20px rgba(197,164,126,0.3)" },
          "50%": { opacity: "0.5", boxShadow: "0 0 40px rgba(197,164,126,0.6)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4", filter: "blur(6px)", transform: "scale(1)" },
          "50%": { opacity: "0.6", filter: "blur(8px)", transform: "scale(1.05)" },
        },
        "sovereign-pulse": {
          "0%, 100%": {
            boxShadow: '0 0 15px 2px rgba(255, 179, 0, 0.4)',
            transform: 'scale(1)'
          },
          "50%": {
            boxShadow: '0 0 25px 8px rgba(255, 179, 0, 0.7)',
            transform: 'scale(1.02)'
          },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        scan: "scan 3s linear infinite",
        "pulse-gold": "pulse-gold 4s ease-in-out infinite",
        shimmer: "shimmer 5s linear infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "gold-glow": "sovereign-pulse 3s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
