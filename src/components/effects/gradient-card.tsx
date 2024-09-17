'use client';



import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

type GradientCardProps = {
    children: React.ReactNode
    // Card appearance
    BACKGROUND_COLOR?: string
    BORDER_COLOR?: string
    BORDER_RADIUS?: string
    WIDTH?: string
    HEIGHT?: string
    PADDING?: string

    // Gradient effect
    GRADIENT_COLORS?: string[]
    GRADIENT_TYPE?: 'radial' | 'linear' | 'conic'
    GRADIENT_SIZE?: string
    GRADIENT_OPACITY?: number
    GRADIENT_BLUR?: string

    // Mouse interaction
    MOUSE_MOVE_DELAY?: number
    FOLLOW_CURSOR?: boolean

    // Animation
    HOVER_SCALE?: number
    ANIMATION_DURATION?: number

    // Special effects
    RANDOMNESS?: number
    SPOOKY_MODE?: boolean
    GLITCH_INTENSITY?: number

    // Accessibility
    ARIA_LABEL?: string
}

const GradientCard: React.FC<GradientCardProps> = ({
    children,
    BACKGROUND_COLOR = '#111',
    BORDER_COLOR = '#333',
    BORDER_RADIUS = '8px',
    WIDTH = '100%',
    HEIGHT = 'auto',
    PADDING = '24px',
    GRADIENT_COLORS = ['rgba(99, 102, 241, 0.15)', 'transparent'],
    GRADIENT_TYPE = 'radial',
    GRADIENT_SIZE = '200px',
    GRADIENT_OPACITY = 0.3,
    GRADIENT_BLUR = '0px',
    MOUSE_MOVE_DELAY = 0,
    FOLLOW_CURSOR = true,
    HOVER_SCALE = 1.02,
    ANIMATION_DURATION = 0.3,
    RANDOMNESS = 0,
    SPOOKY_MODE = false,
    GLITCH_INTENSITY = 0,
    ARIA_LABEL,
}) => {
    const [isHovered, setIsHovered] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const cardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let timeoutId: NodeJS.Timeout

        const handleMouseMove = (event: MouseEvent) => {
            if (cardRef.current && FOLLOW_CURSOR) {
                const rect = cardRef.current.getBoundingClientRect()
                const x = event.clientX - rect.left
                const y = event.clientY - rect.top

                clearTimeout(timeoutId)
                timeoutId = setTimeout(() => {
                    setMousePosition({ x, y })
                }, MOUSE_MOVE_DELAY)
            }
        }

        if (isHovered) {
            window.addEventListener('mousemove', handleMouseMove)
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            clearTimeout(timeoutId)
        }
    }, [isHovered, FOLLOW_CURSOR, MOUSE_MOVE_DELAY])

    const gradientStyle = {
        background: GRADIENT_TYPE === 'radial'
            ? `radial-gradient(circle ${GRADIENT_SIZE} at ${mousePosition.x}px ${mousePosition.y}px, ${GRADIENT_COLORS.join(', ')})`
            : GRADIENT_TYPE === 'linear'
                ? `linear-gradient(to right, ${GRADIENT_COLORS.join(', ')})`
                : `conic-gradient(from ${mousePosition.x}deg at ${mousePosition.x}px ${mousePosition.y}px, ${GRADIENT_COLORS.join(', ')})`,
        opacity: GRADIENT_OPACITY,
        filter: `blur(${GRADIENT_BLUR})`,
    }

    const applyRandomness = (value: number) => {
        return value + (Math.random() - 0.5) * 2 * RANDOMNESS
    }

    const spookyFilter = SPOOKY_MODE
        ? 'sepia(50%) hue-rotate(220deg) saturate(150%)'
        : 'none'

    const glitchAnimation = GLITCH_INTENSITY > 0
        ? `glitch ${10 / GLITCH_INTENSITY}s infinite`
        : 'none'

    return (
        <motion.div
            ref={cardRef}
            className="relative overflow-hidden"
            style={{
                backgroundColor: BACKGROUND_COLOR,
                borderColor: BORDER_COLOR,
                borderRadius: BORDER_RADIUS,
                width: WIDTH,
                height: HEIGHT,
                padding: PADDING,
                filter: spookyFilter,
            }}
            whileHover={{
                scale: applyRandomness(HOVER_SCALE),
                transition: { duration: ANIMATION_DURATION },
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label={ARIA_LABEL}
        >
            <div className="relative z-10">{children}</div>
            {isHovered && (
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        ...gradientStyle,
                        animation: glitchAnimation,
                    }}
                />
            )}
            <style jsx>{`
        @keyframes glitch {
          0% { transform: translate(0) }
          20% { transform: translate(-${GLITCH_INTENSITY}px, ${GLITCH_INTENSITY}px) }
          40% { transform: translate(-${GLITCH_INTENSITY}px, -${GLITCH_INTENSITY}px) }
          60% { transform: translate(${GLITCH_INTENSITY}px, ${GLITCH_INTENSITY}px) }
          80% { transform: translate(${GLITCH_INTENSITY}px, -${GLITCH_INTENSITY}px) }
          100% { transform: translate(0) }
        }
      `}</style>
        </motion.div>
    )
}

export default GradientCard
