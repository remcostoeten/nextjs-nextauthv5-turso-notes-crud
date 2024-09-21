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
        './src/**/*.{ts,tsx}',
    ],
    prefix: '',
    theme: {
        container: {
            center: true,
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
                // custom colors
                /* Background Colors */
                destructive: 'var(--destructive)',
                body: 'var(--bg-body)',
                card: 'var(--bg-card)',
                brand: 'var(--brand)',
                avatar: 'var(--avatar)',
                section: 'var(--bg-section)',
                'section-lighter': 'var(--bg-section-lighter)',
                input: 'var(--bg-input)',
                dropdown: 'var(--bg-dropdown)',
                modal: 'var(--bg-modal)',
                'modal-hover': 'var(--bg-modal-hover)',

                /* Border & Outline Colors */
                'border-default': 'var(--border-default)',
                'border-outline': 'var(--border-outline)',
                'border-separator': 'var(--border-separator)',

                /* Text Colors */
                title: 'var(--text-title)',
                subtitle: 'var(--text-subtitle)',
                'text-muted': 'var(--text-muted)',
                'text-regular-nav': 'var(--text-regular-nav)',
                'text-button': 'var(--text-button)',
                'text-button-alt': 'var(--text-button-alt)',
                'text-dropdown-item': 'var(--text-dropdown-item)',

                /* Button Colors */
                'button-default': 'var(--button-default)',
                'button-hover': 'var(--button-hover)',

                /* Miscellaneous Colors */
                success: 'var(--color-success)',
                error: 'var(--color-error)',
                'menu-icon': 'var(--color-menu-icon)',
                placeholder: 'var(--color-placeholder)',
                'input-focus': 'var(--color-input-focus)',

                /* Badge Colors */
                'badge-default': 'var(--badge-default)',
                'badge-hover': 'var(--badge-hover)',

                // shadcn colors
                border: 'var(--border-default)',
                ring: 'hsl(var(--ring))',
                background: 'var(--bg-section)',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'var(--text-regular-nav)',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'var(--bg-dropdown)',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'var(--bg-card)',
                    foreground: 'hsl(var(--card-foreground))',
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
