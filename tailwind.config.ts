import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
      colors: {
        // custom colors
        /* Background Colors */
        "bg-body": "var(--bg-body)",
        "bg-card": "var(--bg-card)",

        "bg-section": "var(--bg-section)",
        "section-lighter": "var(--bg-section-lighter)",
        "bg-input": "var(--bg-input)",
        "bg-dropdown": "var(--bg-dropdown)",
        "bg-modal": "var(--bg-modal)",
        "bg-modal-hover": "var(--bg-modal-hover)",

        /* Border & Outline Colors */
        "border-default": "var(--border-default)",
        "border-outline": "var(--border-outline)",
        "border-separator": "var(--border-separator)",

        /* Text Colors */
        "text-title": "var(--text-title)",
        "text-subtitle": "var(--text-subtitle)",
        "text-muted": "var(--text-muted)",
        "text-regular-nav": "var(--text-regular-nav)",
        "text-button": "var(--text-button)",
        "text-button-alt": "var(--text-button-alt)",
        "text-dropdown-item": "var(--text-dropdown-item)",

        /* Button Colors */
        "button-default": "var(--button-default)",
        "button-hover": "var(--button-hover)",

        /* Miscellaneous Colors */
        success: "var(--color-success)",
        error: "var(--color-error)",
        "menu-icon": "var(--color-menu-icon)",
        placeholder: "var(--color-placeholder)",
        "input-focus": "var(--color-input-focus)",

        /* Badge Colors */
        "badge-default": "var(--badge-default)",
        "badge-hover": "var(--badge-hover)",

        // shadcn colors
        border: "var(--border-default)",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "var(--bg-section)",
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
          DEFAULT: "var(--text-regular-nav)",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "var(--bg-dropdown)",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "var(--bg-card)",
          foreground: "hsl(var(--card-foreground))",
        },
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
        // banner variants
        slideInFromTop: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInFromBottom: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInFromLeft: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInFromRight: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // banner variants   'slide-in-from-top': 'slideInFromTop 0.5s ease-out',
        "slide-in-from-bottom": "slideInFromBottom 0.5s ease-out",
        "slide-in-from-left": "slideInFromLeft 0.5s ease-out",
        "slide-in-from-right": "slideInFromRight 0.5s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
