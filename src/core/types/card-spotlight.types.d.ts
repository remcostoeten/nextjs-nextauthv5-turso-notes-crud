import { CSSProperties, ReactNode } from 'react'

export type CardVariant = 'default' | 'header-footer' | 'design'

export type CardSpotlightProps = {
    children?: ReactNode
    variant?: CardVariant
    delay?: number
    randomness?: number
}

export type MousePosition = {
    x: number
    y: number
}

export type FollowerStyle = CSSProperties
