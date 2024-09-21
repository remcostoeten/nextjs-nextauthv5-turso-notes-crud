const prefix = '/design-system'

export const designSystemItems = [
    { href: '/color-tool', label: 'Color UI picker', alias: 'Cfg creator' },
    { href: '/mouse-card', label: 'Mouse card hover', alias: 'Hover follower' },
    {
        href: '/color-adjuster',
        label: 'Color Tweaker',
        alias: 'Color adjuster',
    },
    { href: '/tag-input', label: 'Tag input showcase', alias: 'Tag input' },
    { href: '/different-toasts', label: 'Toast variants', alias: 'Toasts' },
    { href: '/edit-action', label: 'Accessible edit form', alias: 'Edit form' },
    { href: '/bubble', label: 'Bubble effect', alias: 'Bubble effect' },
    {
        href: '/tailwind-colors',
        label: 'Theme tailwind colors',
        alias: 'Config Colors',
    },
    { href: '/kbd-variants', label: 'KBD variants', alias: "KBD's" },
    { href: '/authentication', label: 'Authentication', alias: 'Auth' },
    { href: '/bg-grid', label: 'Background Grid', alias: 'BG Grid' },
].map((item) => ({ ...item, href: `${prefix}${item.href}` }))
