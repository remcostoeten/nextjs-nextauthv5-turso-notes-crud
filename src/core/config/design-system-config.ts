const prefix = '/design-system'

export const designSystemItems = [
    { href: '/color-tool', label: 'Color UI picker', alias: 'Cfg creator' },
    {
        href: '/card-spotlight',
        label: 'Card spotlight',
        alias: 'Card spotlight',
    },
    {
        href: '/confetti',
        label: 'Confetti',
        alias: 'Confetti',
    },
    {
        href: '/ripple',
        label: 'Ripple',
        alias: 'Ripple',
    },
    { href: '/tag-input', label: 'Tag input showcase', alias: 'Tag input' },
    { href: '/edit-action', label: 'Accessible edit form', alias: 'Edit form' },
    {
        href: '/tailwind-colors',
        label: 'Theme tailwind colors',
        alias: 'Config Colors',
    },
].map((item) => ({ ...item, href: `${prefix}${item.href}` }))
