import Bubble from "@/components/effects/bubble";
import CodeHighlight from "@/components/ui/CodeHighlight/CodeHighlight";
import { DesignSystemWrapper } from "../_components/DesignSystemWrapper";

export default function BubbleVariants() {
  return (
    <div className="space-y-12">
      {/* Variant 1: Default Bubble */}
      <DesignSystemWrapper
        title="Default Bubble"
        description="The default bubble with no customization."
      >
        <div className="h-64 bg-gray-900 relative">
          <Bubble />
        </div>
        <CodeHighlight language="tsx" title="Default Bubble Usage">
          {`<Bubble />`}
        </CodeHighlight>
      </DesignSystemWrapper>

      {/* Variant 2: Custom Size and Color */}
      <DesignSystemWrapper
        title="Custom Size and Color Bubble"
        description="A bubble with custom size and background color."
      >
        <div className="h-64 bg-gray-900 relative">
          <Bubble size={150} backgroundColor="rgb(100, 0, 100)" />
        </div>
        <CodeHighlight language="tsx" title="Custom Size and Color Bubble Usage">
          {`<Bubble size={150} backgroundColor="rgb(100, 0, 100)" />`}
        </CodeHighlight>
      </DesignSystemWrapper>

      {/* Variant 3: Positioned Bubble */}
      <DesignSystemWrapper
        title="Positioned Bubble"
        description="A bubble positioned absolutely in the top-right corner."
      >
        <div className="h-64 bg-gray-900 relative">
          <Bubble size={100} position="absolute" top={10} right={10} />
        </div>
        <CodeHighlight language="tsx" title="Positioned Bubble Usage">
          {`<Bubble size={100} position="absolute" top={10} right={10} />`}
        </CodeHighlight>
      </DesignSystemWrapper>

      {/* Variant 4: Custom Float Animation */}
      <DesignSystemWrapper
        title="Custom Float Animation"
        description="A bubble with custom float distance and speed."
      >
        <div className="h-64 bg-gray-900 relative">
          <Bubble floatDistance={-50} floatSpeed={2000} />
        </div>
        <CodeHighlight language="tsx" title="Custom Float Animation Usage">
          {`<Bubble floatDistance={-50} floatSpeed={2000} />`}
        </CodeHighlight>
      </DesignSystemWrapper>

      {/* Variant 5: Multiple Bubbles */}
      <DesignSystemWrapper
        title="Multiple Bubbles"
        description="Multiple bubbles with different properties."
      >
        <div className="h-64 bg-gray-900 relative">
          <Bubble size={100} position="absolute" top={10} left={10} backgroundColor="rgb(255, 0, 0)" />
          <Bubble size={75} position="absolute" bottom={10} right={10} backgroundColor="rgb(0, 255, 0)" />
          <Bubble size={50} position="absolute" top="50%" left="50%" backgroundColor="rgb(0, 0, 255)" />
        </div>
        <CodeHighlight language="tsx" title="Multiple Bubbles Usage">
          {`<Bubble size={100} position="absolute" top={10} left={10} backgroundColor="rgb(255, 0, 0)" />
<Bubble size={75} position="absolute" bottom={10} right={10} backgroundColor="rgb(0, 255, 0)" />
<Bubble size={50} position="absolute" top="50%" left="50%" backgroundColor="rgb(0, 0, 255)" />`}
        </CodeHighlight>
      </DesignSystemWrapper>

      {/* Variant 6: Background Bubble */}
      <DesignSystemWrapper
        title="Background Bubble"
        description="A large bubble used as a background element."
      >
        <div className="h-64 bg-gray-900 relative overflow-hidden">
          <Bubble
            size={400}
            position="absolute"
            top="50%"
            left="50%"
            backgroundColor="rgb(30, 30, 30)"
            floatDistance={-10}
            floatSpeed={5000}
            zIndex={-1}
          />
          <div className="relative z-10 text-white p-4">
            Content overlaying the background bubble
          </div>
        </div>
        <CodeHighlight language="tsx" title="Background Bubble Usage">
          {`<Bubble 
  size={400} 
  position="absolute" 
  top="50%" 
  left="50%" 
  backgroundColor="rgb(30, 30, 30)" 
  floatDistance={-10}
  floatSpeed={5000}
  zIndex={-1}
/>`}
        </CodeHighlight>
      </DesignSystemWrapper>
    </div>
  )
}
