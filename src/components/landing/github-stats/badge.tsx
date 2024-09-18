"use client";

import { motion } from "framer-motion";

type BadgeProps = {
  number: string;
  title: string;
};

export default function Badge({ number, title }: BadgeProps) {
  return (
    <motion.div
      className="flex overflow-hidden items-center self-start px-6 py-2 rounded-full border border-solid shadow-2xl bg-white bg-opacity-0 border-white border-opacity-10 max-md:px-5"
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="self-stretch my-auto text-xl leading-8 whitespace-nowrap text-zinc-200 text-opacity-80"
        animate={{ rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        {number}
      </motion.div>
      <div className="flex flex-col items-start self-stretch pl-4 my-auto min-h-[19px] w-[18px]">
        <div className="flex w-px bg-white bg-opacity-20 min-h-[19px]" />
      </div>
      <div className="self-stretch pl-4 my-auto text-lg tracking-tight leading-8 uppercase text-zinc-200 text-opacity-80">
        {title}
      </div>
    </motion.div>
  );
}
