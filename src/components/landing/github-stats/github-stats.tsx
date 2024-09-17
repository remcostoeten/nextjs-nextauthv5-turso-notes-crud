'use client'

import { getGitHubStats } from '@/core/server/actions/github';
import { useEffect, useState } from 'react';
import GitHubStatCard from './github-stats-card';
import SocialBadge from './social-badge';

type GitHubStatsType = {
    stars: number;
    languages: number;
    repositories: number;
    commits: number;
    contribution: string;
    merged: string;
};

export default function GitHubStats() {
    const [stats, setStats] = useState<GitHubStatsType | null>(null);

    useEffect(() => {
        async function loadStats() {
            const data = await getGitHubStats('remcostoeten');
            setStats(data);
        }
        loadStats();
    }, []);

    if (!stats) return <div>Loading...</div>;

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <GitHubStatCard title="Stars" value={stats.stars} type="stars" />
            <GitHubStatCard title="Languages" value={stats.languages} type="languages" />
            <GitHubStatCard title="Repositories" value={stats.repositories} type="repositories" />
            <GitHubStatCard title="Commits" value={stats.commits} type="commits" />
            <GitHubStatCard title="OSS Contribution" value={stats.contribution} type="contribution" />
            <GitHubStatCard title="Merged" value={stats.merged} type="merged" />
           
        </div>
    );
}
