'use client';

import GridBeamParent from "@/components/effects/grid-beam-parent";
import { DesignSystemWrapper } from "../_components/DesignSystemWrapper";

export default function GridBeamPage() {
  return (
    <DesignSystemWrapper title="Grid Beam" description='A grid with animated bemas across the page'>
      <div className="w-full h-[400px] dark:bg-grid-white/[0.05] bg-grid-black/[0.07]">
        <GridBeamParent className="sm:pl-16 pt-28 pl-4 flex items-start justify-start">
          <div className="grid gap-2">
            <h1 className="sm:text-5xl text-4xl font-bold max-w-sm">
              Hero Section That Converts.
            </h1>
            <p className="text-neutral-500 max-w-lg">
              Beautiful beam which I btw reverse engineered from Aceternity
            </p>
          </div>
        </GridBeamParent>
      </div>
    </DesignSystemWrapper>
  )
}
