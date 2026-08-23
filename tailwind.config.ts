import type { Config } from "tailwindcss"

const config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
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
        "intel-gold": "#D4AF37",
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
        "sovereign-gold": "#D4AF37",
        "white-smoke": "#F5F5F5",
      },
      boxShadow: {
        soft: '0 4px 12px rgba(0, 0, 0, 0.08)',
        medium: '0 8px 24px rgba(0, 0, 0, 0.12)',
        hard: '0 12px 36px rgba(0, 0, 0, 0.16)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-sm': '0 4px 16px 0 rgba(0, 0, 0, 0.25)',
      },
      backgroundImage: {
        'grid': "radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)",
        'pattern-carbon': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='6' viewBox='0 0 6 6'%3E%3Cg fill='%23ffffff' fill-opacity='0.06'%3E%3Cpath d='M0 0h3v3H0zM3 3h3v3H3z'/%3E%3C/g%3E%3C/svg%3E\")",
        'pattern-cubes': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpolygon points='8,0 16,4 8,8 0,4'/%3E%3Cpolygon points='0,4 8,8 8,16 0,12' fill-opacity='0.03'/%3E%3Cpolygon points='8,8 16,4 16,12 8,16' fill-opacity='0.08'/%3E%3C/g%3E%3C/svg%3E\")",
        'pattern-noise': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      backgroundSize: {
        'grid': "40px 40px",
      },
      borderRadius: {
        xs: "var(--radius-xs, 0.25rem)",
        sm: "var(--radius-sm, 0.375rem)",
        md: "var(--radius-md, 0.5rem)",
        DEFAULT: "var(--radius, 0.75rem)",
        lg: "var(--radius-lg, 0.75rem)",
        xl: "var(--radius-xl, 1rem)",
        '2xl': "var(--radius-2xl, 1.5rem)",
        full: "9999px",
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
