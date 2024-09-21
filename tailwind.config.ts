import type { Config } from 'tailwindcss'
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
const {
    default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette')

const config: Config = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    prefix: '',
    theme: {
        container: {
            center: 'true',
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            height: {
                search: '40px',
                header: '77px',
            },
            maxWidth: {
                search: 'var(--search-width)',
            },
            colors: {
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                body: 'var(--bg-body)',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                brand: 'var(--brand)',
                avatar: 'var(--avatar)',
                section: 'var(--bg-section)',
                'section-lighter': 'var(--bg-section-lighter)',
                input: 'hsl(var(--input))',
                dropdown: 'var(--bg-dropdown)',
                modal: 'var(--bg-modal)',
                'modal-hover': 'var(--bg-modal-hover)',
                'border-default': 'var(--border-default)',
                'border-outline': 'var(--border-outline)',
                'border-separator': 'var(--border-separator)',
                title: 'var(--text-title)',
                subtitle: 'var(--text-subtitle)',
                'text-muted': 'var(--text-muted)',
                'text-regular-nav': 'var(--text-regular-nav)',
                'text-button': 'var(--text-button)',
                'text-button-alt': 'var(--text-button-alt)',
                'text-dropdown-item': 'var(--text-dropdown-item)',
                'button-default': 'var(--button-default)',
                'button-hover': 'var(--button-hover)',
                success: 'var(--color-success)',
                error: 'var(--color-error)',
                'menu-icon': 'var(--color-menu-icon)',
                placeholder: 'var(--color-placeholder)',
                'input-focus': 'var(--color-input-focus)',
                'badge-default': 'var(--badge-default)',
                'badge-hover': 'var(--badge-hover)',
                border: 'hsl(var(--border))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                ripple: {
                    '0%, 100%': {
                        transform: 'translate(-50%, -50%) scale(1)',
                    },
                    '50%': {
                        transform: 'translate(-50%, -50%) scale(0.9)',
                    },
                },
            },
            animation: {
                ripple: 'ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite',
            },
        },
    },
    plugins: [
        function ({ matchUtilities, theme }: any) {
            matchUtilities(
                {
                    'bg-grid': (value: string) => ({
                        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='${value}'><path d='M0 .5H31.5V32'/></svg>")`,
                    }),
                },
                {
                    values: flattenColorPalette(theme('backgroundColor')),
                    type: 'color',
                },
            )
        },
        addVariablesForColors,
        require('tailwindcss-animate'),
    ],
}

function addVariablesForColors({ addBase, theme }: any) {
    let allColors = flattenColorPalette(theme('colors'))
    let newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
    )
    addBase({
        ':root': newVars,
    })
}

export default config
