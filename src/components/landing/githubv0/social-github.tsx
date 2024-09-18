"use client";

import { fetchGitHubStats } from "@/core/server/actions/github";
import { motion } from "framer-motion";
import React from "react";
import Badge from "../github-stats/badge";

type GitHubSocialProps = {
  number: string;
  title: string;
  imageSrc: string;
};

export default function GitHubSocial({
  number,
  title,
  imageSrc,
}: GitHubSocialProps) {
  const [stats, setStats] = React.useState<any>(null);

  React.useEffect(() => {
    const getStats = async () => {
      const data = await fetchGitHubStats("remcostoeten");
      setStats(data);
    };
    getStats();
  }, []);

  return (
    <section className="flex flex-col px-11 max-md:px-5">
      <div className="flex flex-col items-center px-16 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col w-full max-w-[1408px] max-md:max-w-full">
          <Badge number={number} title={title} />
          <img
            src={imageSrc}
            alt="GitHub Social visualization"
            className="object-contain mt-8 w-full aspect-[3.6] max-md:max-w-full"
          />
          {stats && (
            <div className="mt-8 grid grid-cols-3 gap-4">
              {Object.entries(stats).map(([key, value]) => (
                <motion.div
                  key={key}
                  className="p-4 bg-white bg-opacity-10 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="text-2xl font-bold mb-2"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    {value}
                  </motion.div>
                  <div className="text-sm text-zinc-200">{key}</div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
