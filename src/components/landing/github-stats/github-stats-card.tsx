import { Code, GitCommit, GitFork, GitMerge, GitPullRequest, LucideIcon, Star } from 'lucide-react';
import React from 'react';

type StatType = 'stars' | 'languages' | 'repositories' | 'commits' | 'contribution' | 'merged';

interface GitHubStatCardProps {
    title: string;
    value: string | number;
    type: StatType;
}

const iconMap: Record<StatType, LucideIcon> = {
    stars: Star,
    languages: Code,
    repositories: GitFork,
    commits: GitCommit,
    contribution: GitPullRequest,
    merged: GitMerge,
};

function GitHubStatCard({ title, value, type }: GitHubStatCardProps) {
    const Icon = iconMap[type];

    return (
        <div className="text-white bg-[rgba(10,10,10,0.8)] border border-slate-700 shadow-[rgba(134,134,240,0.12)_0px_-20px_80px_-20px_inset] flex h-full w-full flex-col justify-between gap-2 overflow-hidden leading-none box-border p-4 rounded-2xl border-solid">
            <span className="inline-flex items-center gap-2 text-neutral-400 text-sm">
                <span className="uppercase tracking-wider">{title}</span>
            </span>
            <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{value}</span>
                <Icon className="h-8 w-8 opacity-20" />
            </div>
        </div>
    );
};

export default GitHubStatCard;
