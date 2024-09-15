/**
 * This code was generated by Builder.io.
 */
import React from "react";
import Image from "next/image";

const BACKGROUND_COLOR = "bg-white";
const SHADOW = "shadow-2xl";
const BORDER_RADIUS = "rounded-[64px]";

type NoResultsProps = {
  title: string;
  description: string;
  imageSrc: string;
};

export default function NoResults({
  title,
  description,
  imageSrc,
}: NoResultsProps) {
  return (
    <section
      className={`flex overflow-hidden flex-col items-center px-20 pt-4 pb-28 text-center ${BACKGROUND_COLOR} ${SHADOW} max-w-[800px] ${BORDER_RADIUS} max-md:px-5 max-md:pb-24`}
    >
      <div className="flex flex-col items-center w-full max-w-[560px] max-md:max-w-full">
        <Image
          src={imageSrc}
          alt=""
          width={560}
          height={560}
          className="object-contain self-stretch w-full aspect-square max-md:max-w-full"
        />
        <h2 className="mt-2 text-4xl font-medium text-neutral-900">{title}</h2>
        <p className="mt-6 text-2xl text-zinc-500">{description}</p>
      </div>
    </section>
  );
}
