'use client'

import { Icons } from '@/components/base/icons'
import Banner from '@/components/effects/card-spotlight/banner'
import Spotlight, {
    SpotlightCard,
} from '@/components/effects/card-spotlight/card-spotlight'
import Ripple from '@/components/effects/ripple'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import Image from 'next/image'
import { useState } from 'react'
import { DesignSystemWrapper } from '../_components/DesignSystemWrapper'
import Card01 from '/public/card-01.png'
import Card02 from '/public/card-02.png'
import Card03 from '/public/card-03.png'

const themes = {
    light: {
        name: 'Light',
        bgMain: 'bg-gray-100',
        bgCard: 'bg-white',
        textPrimary: 'text-gray-900',
        textSecondary: 'text-gray-600',
        buttonBg: 'bg-blue-500',
        buttonText: 'text-white',
        buttonHover: 'hover:bg-blue-600',
        borderColor: 'border-gray-200',
        blurColor: 'bg-gray-200',
    },
    dark: {
        name: 'Dark',
        bgMain: 'bg-slate-900',
        bgCard: 'bg-slate-800',
        textPrimary: 'text-slate-200',
        textSecondary: 'text-slate-400',
        buttonBg: 'bg-slate-700',
        buttonText: 'text-slate-200',
        buttonHover: 'hover:bg-slate-600',
        borderColor: 'border-slate-700',
        blurColor: 'bg-slate-700',
    },
    techDark: {
        name: 'Tech Dark',
        bgMain: 'bg-[#0a0a0a]',
        bgCard: 'bg-[#111110]',
        textPrimary: 'text-[#fefeff]',
        textSecondary: 'text-[#a2a3a2]',
        buttonBg: 'bg-[#1e1e1f]',
        buttonText: 'text-[#e5e5e5]',
        buttonHover: 'hover:bg-[#272627]',
        borderColor: 'border-[#404141]',
        blurColor: 'bg-[#272627]',
    },
    matrixGreen: {
        name: 'Matrix Green',
        bgMain: 'bg-black',
        bgCard: 'bg-[#001100]',
        textPrimary: 'text-[#00ff00]',
        textSecondary: 'text-[#008800]',
        buttonBg: 'bg-[#003300]',
        buttonText: 'text-[#00ff00]',
        buttonHover: 'hover:bg-[#004400]',
        borderColor: 'border-[#00ff00]',
        blurColor: 'bg-[#002200]',
    },
    cyberNeon: {
        name: 'Cyber Neon',
        bgMain: 'bg-[#0c0c1d]',
        bgCard: 'bg-[#1a1a2e]',
        textPrimary: 'text-[#f0e68c]',
        textSecondary: 'text-[#add8e6]',
        buttonBg: 'bg-[#ff00ff]',
        buttonText: 'text-[#000000]',
        buttonHover: 'hover:bg-[#ff69b4]',
        borderColor: 'border-[#00ffff]',
        blurColor: 'bg-[#800080]',
    },
    deepSpace: {
        name: 'Deep Space',
        bgMain: 'bg-[#0f0f23]',
        bgCard: 'bg-[#1c1c31]',
        textPrimary: 'text-[#e6e6fa]',
        textSecondary: 'text-[#b0c4de]',
        buttonBg: 'bg-[#4b0082]',
        buttonText: 'text-[#e6e6fa]',
        buttonHover: 'hover:bg-[#8a2be2]',
        borderColor: 'border-[#483d8b]',
        blurColor: 'bg-[#191970]',
    },
    // New dark variants based on Tailwind config
    midnightOil: {
        name: 'Midnight Oil',
        bgMain: 'bg-[#171616]',
        bgCard: 'bg-[#1a1b1a]',
        textPrimary: 'text-[#d5d4d5]',
        textSecondary: 'text-[#727273]',
        buttonBg: 'bg-[#272627]',
        buttonText: 'text-[#e5e5e5]',
        buttonHover: 'hover:bg-[#404141]',
        borderColor: 'border-[#404141]',
        blurColor: 'bg-[#272627]',
    },
    carbonFiber: {
        name: 'Carbon Fiber',
        bgMain: 'bg-[#161616]',
        bgCard: 'bg-[#1e1e1f]',
        textPrimary: 'text-[#fefeff]',
        textSecondary: 'text-[#a2a3a2]',
        buttonBg: 'bg-[#272627]',
        buttonText: 'text-[#e5e5e5]',
        buttonHover: 'hover:bg-[#404141]',
        borderColor: 'border-[#404141]',
        blurColor: 'bg-[#272627]',
    },
    // New techy themes
    quantumFlux: {
        name: 'Quantum Flux',
        bgMain: 'bg-[#05080f]',
        bgCard: 'bg-[#0a0f1d]',
        textPrimary: 'text-[#5ce1e6]',
        textSecondary: 'text-[#2c8c91]',
        buttonBg: 'bg-[#1e3a5f]',
        buttonText: 'text-[#5ce1e6]',
        buttonHover: 'hover:bg-[#2a5286]',
        borderColor: 'border-[#5ce1e6]',
        blurColor: 'bg-[#0f2447]',
    },
    nanoCircuit: {
        name: 'Nano Circuit',
        bgMain: 'bg-[#001a23]',
        bgCard: 'bg-[#00384d]',
        textPrimary: 'text-[#00ff9f]',
        textSecondary: 'text-[#00ccff]',
        buttonBg: 'bg-[#005a7d]',
        buttonText: 'text-[#00ff9f]',
        buttonHover: 'hover:bg-[#007aa8]',
        borderColor: 'border-[#00ccff]',
        blurColor: 'bg-[#004d66]',
    },
    // Corporate theme
    executiveSuite: {
        name: 'Executive Suite',
        bgMain: 'bg-[#f0f0f0]',
        bgCard: 'bg-white',
        textPrimary: 'text-[#333333]',
        textSecondary: 'text-[#666666]',
        buttonBg: 'bg-[#0056b3]',
        buttonText: 'text-white',
        buttonHover: 'hover:bg-[#003d82]',
        borderColor: 'border-[#cccccc]',
        blurColor: 'bg-[#e6e6e6]',
    },
}

const SpotlightCardContent = ({
    image,
    title,
    description,
    ripple,
    theme,
}: {
    image: string
    title: string
    description: string
    ripple: boolean
    theme: any
}) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className={`relative z-20 h-full overflow-hidden rounded-[inherit] ${theme.bgCard} p-6 pb-8`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className="pointer-events-none absolute bottom-0 left-1/2 -z-10 aspect-square w-1/2 -translate-x-1/2 translate-y-1/2"
                aria-hidden="true"
            >
                <div
                    className={`translate-z-0 absolute inset-0 rounded-full ${theme.blurColor} blur-[80px]`}
                ></div>
            </div>

            {ripple && (
                <Ripple
                    mainCircleSize={152}
                    numCircles={8}
                    className={`-translate-y-[115px] transition-opacity ease-in-out duration-500 ${isHovered ? 'opacity-70 -z-10' : 'opacity-0'}`}
                />
            )}

            <div className="flex h-full flex-col items-center text-center">
                <div className="relative inline-flex">
                    <Image
                        className="inline-flex"
                        src={image}
                        width={200}
                        height={200}
                        alt={title}
                    />
                </div>
                <div className="mb-5 grow">
                    <h2
                        className={`mb-1 text-xl font-bold ${theme.textPrimary}`}
                    >
                        {title}
                    </h2>
                    <p className={`text-sm ${theme.textSecondary}`}>
                        {description}
                    </p>
                </div>
                <a
                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg border ${theme.borderColor} ${theme.buttonBg} ${theme.buttonText} px-3 py-1.5 text-sm font-medium transition-colors duration-150 ${theme.buttonHover} focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600`}
                    href="#0"
                >
                    <Icons.connect />
                    <span>Connect</span>
                </a>
            </div>
        </div>
    )
}

export default function SpotlightPage() {
    const [currentTheme, setCurrentTheme] = useState<string>('techDark')
    const theme = themes[currentTheme as keyof typeof themes]

    return (
        <DesignSystemWrapper
            title="Spotlight Page"
            description="Explore our spotlight features."
            actionButtons={[]}
        >
            <main
                className={`relative flex min-h-screen flex-col  overflow-hidden ${theme.bgMain}`}
            >
                <div className="mx-auto w-full max-w-6xl px-4 py-24 md:px-6">
                    <div className="mb-8 flex justify-end">
                        <Select
                            value={currentTheme}
                            onValueChange={setCurrentTheme}
                        >
                            <SelectTrigger
                                className={`w-[200px] ${theme.bgCard} ${theme.textPrimary} ${theme.borderColor}`}
                            >
                                <SelectValue placeholder="Select a theme" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(themes).map(([key, value]) => (
                                    <SelectItem key={key} value={key}>
                                        {value.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Spotlight className="group mx-auto grid max-w-sm items-start gap-6 lg:max-w-none lg:grid-cols-3">
                        <SpotlightCard>
                            <SpotlightCardContent
                                image={Card01}
                                title="Amazing Integration"
                                description="Quickly apply filters to refine your issues lists and create custom views."
                                ripple={true}
                                theme={theme}
                            />
                        </SpotlightCard>
                        <SpotlightCard>
                            <SpotlightCardContent
                                image={Card02}
                                title="Powerful Automation"
                                description="Automate your workflow and increase productivity with our advanced features."
                                ripple={false}
                                theme={theme}
                            />
                        </SpotlightCard>
                        <SpotlightCard>
                            <SpotlightCardContent
                                image={Card03}
                                title="Seamless Collaboration"
                                description="Work together effortlessly with your team using our collaboration tools."
                                ripple={true}
                                theme={theme}
                            />
                        </SpotlightCard>
                    </Spotlight>
                </div>
            </main>

            <Banner
                tutorialUrl="https://cruip.com/how-to-create-a-spotlight-card-hover-effect-with-tailwind-css/"
                downloadUrl="https://github.com/cruip/cruip-tutorials-next/blob/main/components/spotlight.tsx"
            />
        </DesignSystemWrapper>
    )
}
