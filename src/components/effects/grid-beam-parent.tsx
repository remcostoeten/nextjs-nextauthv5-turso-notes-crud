'use client';

import { DesignSystemWrapper } from "@/app/(marketing)/design-system/_components/DesignSystemWrapper";
import CodeHighlight from "../ui/CodeHighlight/CodeHighlight";
import AnimatedBlobGradientCard from "./animated-hover-card";



const examples = [
  // ... (previous examples)

  {
    title: "Animated Blob Gradient Card",
    description: "A minimal, dark card with an animated blob-like gradient",
    code: `<AnimatedBlobGradientCard
  BACKGROUND_COLOR="#0A0A0A"
  BORDER_COLOR="#2A2A2A"
  BORDER_RADIUS="16px"
  GRADIENT_COLORS={['rgba(75, 0, 130, 0.7)', 'rgba(0, 0, 139, 0.7)']}
  ANIMATION_DURATION={20}
  RANDOMNESS={0.2}
>
  <h2 className="text-xl font-semibold text-white mb-2">Animated Blob Gradient</h2>
  <p className="text-gray-300">Morphing gradient with subtle randomness</p>
</AnimatedBlobGradientCard>`,
    component: (
      <AnimatedBlobGradientCard
        BACKGROUND_COLOR="#0A0A0A"
        BORDER_COLOR="#2A2A2A"
        BORDER_RADIUS="16px"
        GRADIENT_COLORS={['rgba(75, 0, 130, 0.7)', 'rgba(0, 0, 139, 0.7)']}
        ANIMATION_DURATION={20}
        RANDOMNESS={0.2}
      >
        <h2 className="text-xl font-semibold text-white mb-2">Animated Blob Gradient</h2>
        <p className="text-gray-300">Morphing gradient with subtle randomness</p>
      </AnimatedBlobGradientCard>
    )
  }
];

export default function GradientCardShowcase() {
  return (
    <DesignSystemWrapper
      title="Gradient Card Component"
      description="Explore various configurations and effects of the GradientCard component, including an animated blob gradient variant."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {examples.map((example, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-2xl font-bold text-white">{example.title}</h3>
            <p className="text-gray-300">{example.description}</p>
            <div className="my-4">
              {example.component}
            </div>
            <CodeHighlight language="tsx" title={`${example.title} Example`}>
              {example.code}
            </CodeHighlight>
          </div>
        ))}
      </div>
    </DesignSystemWrapper>
  );
}
