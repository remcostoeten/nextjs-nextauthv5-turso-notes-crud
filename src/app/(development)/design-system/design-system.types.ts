import { ReactNode } from 'react'

export type ColorRow = {
    id: number
    color: string
    percentage: number
    adjustment: 'lighter' | 'darker'
    result: string | null
}
export type ActionButton = {
    label: string
    onClick: () => void
}

export type DesignSystemWrapperProps = {
    title?: string
    description: string
    actionButtons?: ActionButton[]
    children?: ReactNode
}

export const inputVariants = [
    {
        name: 'Input Typing',
        props: {
            variant: 'dot',
            size: 'sm',
            color: 'secondary',
            speed: 'normal',
        },
        custom: true,
    },
    {
        name: 'Input Searching',
        props: {
            variant: 'spinner',
            size: 'sm',
            color: 'primary',
            speed: 'fast',
        },
        custom: true,
    },
    {
        name: 'Input Validating',
        props: {
            variant: 'pulse',
            size: 'sm',
            color: 'warning',
            speed: 'normal',
        },
        custom: true,
    },
    {
        name: 'Input Submitting',
        props: { variant: 'bar', size: 'sm', color: 'success', speed: 'fast' },
        custom: true,
    },
    {
        name: 'Animated Placeholder',
        props: {},
        custom: true,
        animatedPlaceholder: true,
    },
]
