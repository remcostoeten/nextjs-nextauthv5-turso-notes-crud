"use client";

import GradientCard from "@/components/effects/gradient-card";
import CodeHighlight from "@/components/ui/CodeHighlight/CodeHighlight";
import { DesignSystemWrapper } from "../_components/DesignSystemWrapper";

const examples = [
  {
    title: "Basic Gradient Card",
    description: "A simple gradient card with default settings",
    code: `<GradientCard>
  <h2 className="text-xl font-semibold text-white mb-2">Basic Card</h2>
  <p className="text-gray-300">Hover to see the gradient effect</p>
</GradientCard>`,
    component: (
      <GradientCard>
        <h2 className="text-xl font-semibold text-white mb-2">Basic Card</h2>
        <p className="text-gray-300">Hover to see the gradient effect</p>
      </GradientCard>
    ),
  },
  {
    title: "Delayed Mouse Follow",
    description: "A gradient card with delayed mouse following",
    code: `<GradientCard
  MOUSE_MOVE_DELAY={200}
  GRADIENT_SIZE="100px"
>
  <h2 className="text-xl font-semibold text-white mb-2">Delayed Follow</h2>
  <p className="text-gray-300">Gradient follows mouse with delay</p>
</GradientCard>`,
    component: (
      <GradientCard MOUSE_MOVE_DELAY={200} GRADIENT_SIZE="100px">
        <h2 className="text-xl font-semibold text-white mb-2">
          Delayed Follow
        </h2>
        <p className="text-gray-300">Gradient follows mouse with delay</p>
      </GradientCard>
    ),
  },
  {
    title: "Minimalist Accent Gradient Card",
    description:
      "A minimalist card with subtle accent gradient, inspired by modern design systems",
    code: `<GradientCard
  BACKGROUND_COLOR="#0F0F0F"
  BORDER_COLOR="#2A2A2A"
  GRADIENT_COLORS={['rgba(99, 102, 241, 0.1)', 'transparent']}
  GRADIENT_SIZE="150px"
  GRADIENT_OPACITY={0.6}
  BORDER_RADIUS="10px"
  HOVER_SCALE={1.02}
  ANIMATION_DURATION={0.25}
  GRADIENT_BLUR="15px"
>
  <h2 className="text-xl font-semibold text-white mb-2">Minimalist Accent</h2>
  <p className="text-gray-300">Subtle accent gradient effect</p>
</GradientCard>`,
    component: (
      <GradientCard
        BACKGROUND_COLOR="#0F0F0F"
        BORDER_COLOR="#2A2A2A"
        GRADIENT_COLORS={["rgba(99, 102, 241, 0.1)", "transparent"]}
        GRADIENT_SIZE="150px"
        GRADIENT_OPACITY={0.6}
        BORDER_RADIUS="10px"
        HOVER_SCALE={1.02}
        ANIMATION_DURATION={0.25}
        GRADIENT_BLUR="15px"
      >
        <h2 className="text-xl font-semibold text-white mb-2">
          Minimalist Accent
        </h2>
        <p className="text-gray-300">Subtle accent gradient effect</p>
      </GradientCard>
    ),
  },
];

export default function GradientCardShowcase() {
  return (
    <DesignSystemWrapper
      title="Gradient Card Component"
      description="Explore various configurations and effects of the GradientCard component, including variants inspired by popular design systems."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {examples.map((example, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-2xl font-bold text-white">{example.title}</h3>
            <p className="text-gray-300">{example.description}</p>
            <div className="my-4">{example.component}</div>
            <CodeHighlight language="tsx" title={`${example.title} Example`}>
              {example.code}
            </CodeHighlight>
          </div>
        ))}
      </div>
    </DesignSystemWrapper>
  );
}
