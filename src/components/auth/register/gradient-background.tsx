import { Stars } from "./stars";

export function GradientBackground() {
    return (
        <div className="hidden lg:block w-1/2 relative overflow-hidden">
            <div
                className="absolute inset-0 bg-gradient-to-t from-blue-400 via-purple-500 to-purple-800"
                style={{
                    maskImage: 'linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))',
                    WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))'
                }}
            />
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px)
          `,
                    backgroundSize: '57px 57px',
                    transform: 'rotate(6deg)',
                    maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0))',
                    WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0))'
                }}
            />
            <Stars />
        </div>
    )
}
