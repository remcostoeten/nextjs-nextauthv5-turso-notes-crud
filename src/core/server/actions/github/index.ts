"use server";

import { Octokit } from "@octokit/rest";

export async function getGitHubStats(username: string) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const [user, repos] = await Promise.all([
    octokit.rest.users.getByUsername({ username }),
    octokit.rest.repos.listForUser({ username, per_page: 100 }),
  ]);

  const languages = new Set();
  let totalStars = 0;
  let totalCommits = 0;
  for (const repo of repos.data) {
    if (repo.stargazers_count !== undefined)
      totalStars += repo.stargazers_count;
    if (repo.language) languages.add(repo.language);

    const commits = await octokit.request(
      "GET /repos/{owner}/{repo}/stats/participation",
      {
        owner: username,
        repo: repo.name,
      },
    );

    if (commits.data && Array.isArray(commits.data.all)) {
      totalCommits += commits.data.all.reduce((sum, count) => sum + count, 0);
    }
  }

  return {
    stars: totalStars,
    languages: languages.size,
    repositories: user.data.public_repos,
    commits: totalCommits,
    contribution: "10+", // This is a placeholder, as it's difficult to calculate precisely
    merged: "40+", // This is a placeholder, as it's difficult to calculate precisely
  };
}
